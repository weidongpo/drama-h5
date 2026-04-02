<template>
  <div class="player-page">
    <!-- 视频播放器 -->
    <div class="video-container">
      <video
        ref="videoRef"
        class="video-player"
        :src="currentVideo.url"
        :poster="currentVideo.poster"
        playsinline
        webkit-playsinline
        @timeupdate="handleTimeUpdate"
        @ended="handleEnded"
        @loadedmetadata="handleLoadedMetadata"
      ></video>
      
      <!-- 播放控制层 -->
      <div class="video-overlay" @click="togglePlay">
        <!-- 返回按钮 -->
        <div class="back-btn" @click.stop="goBack">
          <van-icon name="arrow-left" size="24" color="#fff" />
        </div>
        
        <!-- 播放/暂停按钮 -->
        <div class="play-btn" v-if="!isPlaying">
          <van-icon name="play" size="40" color="#fff" />
        </div>
        
        <!-- 右侧操作栏 -->
        <div class="side-actions">
          <div class="action-item" @click.stop="handleLike">
            <van-icon :name="isLiked ? 'like' : 'like-o'" :color="isLiked ? '#ff4757' : '#fff'" size="28" />
            <span>{{ formatNumber(drama.likes) }}</span>
          </div>
          <div class="action-item" @click.stop="handleComment">
            <van-icon name="comment-o" size="28" color="#fff" />
            <span>{{ formatNumber(drama.comments) }}</span>
          </div>
          <div class="action-item" @click.stop="handleShare">
            <van-icon name="share-o" size="28" color="#fff" />
            <span>分享</span>
          </div>
          <div class="action-item" @click.stop="handleFavorite">
            <van-icon :name="isFavorite ? 'star' : 'star-o'" :color="isFavorite ? '#ffd700' : '#fff'" size="28" />
            <span>{{ isFavorite ? '已收藏' : '收藏' }}</span>
          </div>
        </div>
        
        <!-- 底部信息 -->
        <div class="video-info">
          <div class="drama-title">@{{ drama.author }}</div>
          <h2 class="drama-name">{{ drama.title }}</h2>
          <p class="drama-desc">{{ drama.description }}</p>
          <div class="episode-info">
            <van-tag type="danger" round>第 {{ currentEpisode }} 集</van-tag>
            <span class="episode-total">共 {{ drama.episodes }} 集</span>
          </div>
        </div>
      </div>
      
      <!-- 进度条 -->
      <div class="progress-bar">
        <div class="progress-info">
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
        <div class="progress-track" @click="handleSeek">
          <div class="progress-played" :style="{ width: progressPercent + '%' }"></div>
          <div class="progress-buffered" :style="{ width: bufferedPercent + '%' }"></div>
          <div class="progress-thumb" :style="{ left: progressPercent + '%' }"></div>
        </div>
      </div>
      
      <!-- 剧集选择面板 -->
      <transition name="slide-up">
        <div class="episode-panel" v-if="showEpisodes">
          <div class="panel-header">
            <h3>选集 (共{{ drama.episodes }}集)</h3>
            <van-icon name="cross" size="24" @click="showEpisodes = false" />
          </div>
          <div class="episode-list">
            <div 
              class="episode-item" 
              :class="{ 
                active: ep === currentEpisode,
                free: ep <= freeEpisodes,
                vip: ep > freeEpisodes && ep <= vipEpisodes,
                locked: ep > vipEpisodes 
              }"
              v-for="ep in drama.episodes" 
              :key="ep"
              @click="selectEpisode(ep)"
            >
              <span v-if="ep > vipEpisodes">🔒</span>
              <span v-else>{{ ep }}</span>
            </div>
          </div>
        </div>
      </transition>
      
      <!-- 评论面板 -->
      <transition name="slide-up">
        <div class="comment-panel" v-if="showComments">
          <div class="panel-header">
            <h3>评论 ({{ comments.length }})</h3>
            <van-icon name="cross" size="24" @click="showComments = false" />
          </div>
          <div class="comment-list">
            <div class="comment-item" v-for="item in comments" :key="item.id">
              <van-image :src="item.avatar" round width="40" height="40" fit="cover" />
              <div class="comment-content">
                <div class="comment-user">{{ item.user }}</div>
                <div class="comment-text">{{ item.content }}</div>
                <div class="comment-meta">
                  <span>{{ item.time }}</span>
                  <span class="like-count">
                    <van-icon name="like-o" size="14" />
                    {{ item.likes }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="comment-input">
            <input 
              type="text" 
              v-model="commentText" 
              placeholder="说点什么..." 
              @keyup.enter="submitComment"
            />
            <van-button type="danger" size="small" round @click="submitComment">发送</van-button>
          </div>
        </div>
      </transition>
      
      <!-- 解锁提示 -->
      <transition name="fade">
        <div class="unlock-modal" v-if="showUnlock">
          <div class="modal-content">
            <h3>🔒 解锁观看</h3>
            <p>该集需要 VIP 或单独解锁</p>
            <div class="unlock-options">
              <div class="option-item" @click="unlockEpisode">
                <div class="option-price">¥3</div>
                <div class="option-desc">解锁本集</div>
              </div>
              <div class="option-item vip" @click="openVip">
                <div class="option-price">¥9.9<span>/月</span></div>
                <div class="option-desc">开通VIP全站畅看</div>
              </div>
            </div>
            <van-button block round @click="showUnlock = false">取消</van-button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'

const route = useRoute()
const router = useRouter()

// 视频引用
const videoRef = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const bufferedPercent = ref(0)

// 状态
const isLiked = ref(false)
const isFavorite = ref(false)
const showEpisodes = ref(false)
const showComments = ref(false)
const showUnlock = ref(false)
const commentText = ref('')
const currentEpisode = ref(1)

// 免费剧集和VIP剧集范围
const freeEpisodes = 10
const vipEpisodes = 50

// 短剧数据
const drama = ref({
  id: 1,
  title: '豪门千金的逆袭人生',
  author: '追剧官方',
  description: '豪门千金苏晚晴被继母陷害，流落街头。五年后，她华丽归来，誓要让那些伤害过她的人付出代价...',
  episodes: 86,
  likes: 128000,
  comments: 8600,
  views: 230000000
})

// 视频数据（使用 Pexels 免费商用视频）
const videos = ref([
  {
    episode: 1,
    url: 'https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_25fps.mp4',
    poster: 'https://images.pexels.com/videos/4763824/pexels-photo-4763824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    episode: 2,
    url: 'https://videos.pexels.com/video-files/4434242/4434242-uhd_2560_1440_30fps.mp4',
    poster: 'https://images.pexels.com/videos/4434242/pexels-photo-4434242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    episode: 3,
    url: 'https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_25fps.mp4',
    poster: 'https://images.pexels.com/videos/5752729/pexels-photo-5752729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
])

// 当前视频
const currentVideo = computed(() => {
  return videos.value.find(v => v.episode === currentEpisode.value) || videos.value[0]
})

// 进度百分比
const progressPercent = computed(() => {
  return duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0
})

// 评论数据
const comments = ref([
  { id: 1, user: '追剧小能手', avatar: 'https://i.pravatar.cc/100?img=1', content: '太好看了！女主太飒了！', time: '2小时前', likes: 1280 },
  { id: 2, user: '甜剧爱好者', avatar: 'https://i.pravatar.cc/100?img=2', content: '男主什么时候出现？等不及了', time: '3小时前', likes: 856 },
  { id: 3, user: '短剧达人', avatar: 'https://i.pravatar.cc/100?img=3', content: '这剧情太上头了，一口气看了10集', time: '5小时前', likes: 2341 },
  { id: 4, user: '追剧小达人', avatar: 'https://i.pravatar.cc/100?img=4', content: '女主的演技真的很好，眼神戏绝了', time: '昨天', likes: 567 },
  { id: 5, user: '剧荒患者', avatar: 'https://i.pravatar.cc/100?img=5', content: '终于找到好看的短剧了！', time: '昨天', likes: 234 }
])

onMounted(() => {
  const episode = parseInt(route.query.episode) || 1
  currentEpisode.value = episode
  
  // 自动播放
  if (videoRef.value) {
    videoRef.value.play().catch(() => {
      // 自动播放可能被阻止
    })
  }
})

onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.pause()
  }
})

// 播放/暂停
function togglePlay() {
  if (!videoRef.value) return
  
  if (isPlaying.value) {
    videoRef.value.pause()
  } else {
    videoRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

// 时间更新
function handleTimeUpdate() {
  if (videoRef.value) {
    currentTime.value = videoRef.value.currentTime
  }
}

// 视频加载完成
function handleLoadedMetadata() {
  if (videoRef.value) {
    duration.value = videoRef.value.duration
  }
}

// 视频结束
function handleEnded() {
  isPlaying.value = false
  // 自动播放下一集
  if (currentEpisode.value < drama.value.episodes) {
    if (currentEpisode.value >= freeEpisodes) {
      showUnlock.value = true
    } else {
      currentEpisode.value++
      setTimeout(() => {
        if (videoRef.value) {
          videoRef.value.play()
          isPlaying.value = true
        }
      }, 500)
    }
  }
}

// 跳转进度
function handleSeek(e) {
  if (!videoRef.value) return
  const rect = e.currentTarget.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  videoRef.value.currentTime = percent * duration.value
}

// 选择剧集
function selectEpisode(ep) {
  if (ep > vipEpisodes) {
    showUnlock.value = true
    return
  }
  
  if (ep > freeEpisodes) {
    showUnlock.value = true
    return
  }
  
  currentEpisode.value = ep
  showEpisodes.value = false
  
  setTimeout(() => {
    if (videoRef.value) {
      videoRef.value.load()
      videoRef.value.play()
      isPlaying.value = true
    }
  }, 100)
}

// 点赞
function handleLike() {
  isLiked.value = !isLiked.value
  if (isLiked.value) {
    drama.value.likes++
    showToast('已点赞')
  } else {
    drama.value.likes--
  }
}

// 评论
function handleComment() {
  showComments.value = true
}

// 提交评论
function submitComment() {
  if (!commentText.value.trim()) {
    showToast('请输入评论内容')
    return
  }
  
  comments.value.unshift({
    id: Date.now(),
    user: '我',
    avatar: 'https://i.pravatar.cc/100?img=10',
    content: commentText.value,
    time: '刚刚',
    likes: 0
  })
  
  commentText.value = ''
  drama.value.comments++
  showToast('评论成功')
}

// 分享
function handleShare() {
  showToast('分享功能开发中')
}

// 收藏
function handleFavorite() {
  isFavorite.value = !isFavorite.value
  showToast(isFavorite.value ? '已收藏' : '已取消收藏')
}

// 解锁剧集
function unlockEpisode() {
  router.push({
    path: '/pay',
    query: {
      type: 'drama',
      id: drama.value.id,
      title: drama.value.title,
      episodes: drama.value.episodes,
      price: 19.9
    }
  })
  showUnlock.value = false
}

// 开通VIP
function openVip() {
  router.push('/pay?type=vip')
  showUnlock.value = false
}

// 返回
function goBack() {
  router.back()
}

// 格式化时间
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 格式化数字
function formatNumber(num) {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '亿'
  } else if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toString()
}
</script>

<style lang="scss" scoped>
.player-page {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
}

.video-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn {
  position: absolute;
  top: 20px;
  left: 16px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.play-btn {
  width: 70px;
  height: 70px;
  background: rgba(255, 71, 87, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .van-icon {
    margin-left: 4px;
  }
}

.side-actions {
  position: absolute;
  right: 16px;
  bottom: 120px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  
  span {
    font-size: 12px;
    color: #fff;
  }
}

.video-info {
  position: absolute;
  left: 16px;
  right: 70px;
  bottom: 100px;
}

.drama-title {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
}

.drama-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.drama-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
}

.episode-info {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .episode-total {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
}

.progress-track {
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  position: relative;
  cursor: pointer;
}

.progress-played {
  height: 100%;
  background: #ff4757;
  border-radius: 2px;
  position: absolute;
  top: 0;
  left: 0;
}

.progress-buffered {
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 2px;
  position: absolute;
  top: 0;
  left: 0;
}

.progress-thumb {
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

// 剧集面板
.episode-panel, .comment-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 60vh;
  background: #1a1a1a;
  border-radius: 16px 16px 0 0;
  z-index: 20;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #333;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
  }
}

.episode-list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  padding: 16px;
  max-height: 40vh;
  overflow-y: auto;
}

.episode-item {
  aspect-ratio: 1;
  background: #2a2a2a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  
  &.active {
    background: #ff4757;
  }
  
  &.vip {
    color: #ffd700;
  }
  
  &.locked {
    color: #666;
  }
}

// 评论面板
.comment-panel {
  display: flex;
  flex-direction: column;
}

.comment-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  max-height: 40vh;
}

.comment-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.comment-content {
  flex: 1;
}

.comment-user {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.comment-text {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 4px;
}

.comment-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #666;
  
  .like-count {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

.comment-input {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  border-top: 1px solid #333;
  
  input {
    flex: 1;
    background: #2a2a2a;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    color: #fff;
    font-size: 14px;
    
    &::placeholder {
      color: #666;
    }
  }
}

// 解锁弹窗
.unlock-modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
}

.modal-content {
  width: 80%;
  background: #1a1a1a;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  
  h3 {
    font-size: 18px;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 14px;
    color: #999;
    margin-bottom: 20px;
  }
}

.unlock-options {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.option-item {
  flex: 1;
  background: #2a2a2a;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  
  &.vip {
    background: linear-gradient(135deg, #ffd700 0%, #ffaa00 100%);
    color: #000;
  }
}

.option-price {
  font-size: 24px;
  font-weight: 700;
  
  span {
    font-size: 12px;
    font-weight: 400;
  }
}

.option-desc {
  font-size: 12px;
  margin-top: 4px;
  opacity: 0.8;
}

// 动画
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
