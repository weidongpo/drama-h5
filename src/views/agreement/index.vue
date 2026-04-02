<template>
  <div class="agreement-page">
    <!-- 头部 -->
    <header class="header">
      <div class="back-btn" @click="goBack">
        <van-icon name="arrow-left" size="20" color="#fff" />
      </div>
      <div class="header-title">用户协议</div>
    </header>

    <!-- 内容 -->
    <div class="content">
      <h3>追剧达人用户协议</h3>
      <p class="update-time">更新日期：2026年1月1日</p>
      
      <section>
        <h4>一、服务条款的确认和接纳</h4>
        <p>1.1 追剧达人的各项服务的所有权和运营权归追剧科技有限公司所有。</p>
        <p>1.2 用户在使用追剧达人提供的各项服务之前，应仔细阅读本服务协议。</p>
        <p>1.3 用户一旦注册使用追剧达人的服务，即视为用户已了解并完全同意本服务协议各项内容。</p>
      </section>
      
      <section>
        <h4>二、用户注册</h4>
        <p>2.1 用户注册成功后，追剧达人将给予每个用户一个用户账号及相应的密码，该用户账号和密码由用户负责保管。</p>
        <p>2.2 用户对以其用户账号进行的所有活动和事件负法律责任。</p>
        <p>2.3 用户须对在追剧达人的注册信息的真实性、合法性、有效性承担全部责任。</p>
      </section>
      
      <section>
        <h4>三、使用规则</h4>
        <p>3.1 用户在使用追剧达人服务过程中，必须遵循以下原则：</p>
        <p>（1）遵守中国有关的法律和法规；</p>
        <p>（2）不得为任何非法目的而使用网络服务系统；</p>
        <p>（3）遵守所有与网络服务有关的网络协议、规定和程序；</p>
        <p>（4）不得利用追剧达人服务进行任何可能对互联网正常运转造成不利影响的行为；</p>
        <p>（5）不得利用追剧达人服务传输任何骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料。</p>
      </section>
      
      <section>
        <h4>四、内容所有权</h4>
        <p>4.1 追剧达人提供的所有短剧、视频、图片、文字等内容均受版权保护。</p>
        <p>4.2 未经追剧达人或相关权利人书面许可，用户不得以任何形式复制、传播、展示、修改这些内容。</p>
        <p>4.3 用户在追剧达人平台上发布的内容，用户授予追剧达人及其关联公司、继承公司一项全球范围内、免费、非独家、可再许可的权利。</p>
      </section>
      
      <section>
        <h4>五、VIP会员服务</h4>
        <p>5.1 VIP会员服务是追剧达人提供的付费增值服务。</p>
        <p>5.2 VIP会员可享受专属权益，包括但不限于：无广告观看、VIP专属内容、高清画质等。</p>
        <p>5.3 VIP会员服务一经开通，不支持退款。</p>
        <p>5.4 VIP会员服务有效期内，用户可随时取消续费，取消后服务将持续至当前计费周期结束。</p>
      </section>
      
      <section>
        <h4>六、免责声明</h4>
        <p>6.1 用户明确同意其使用追剧达人网络服务所存在的风险将完全由其自己承担。</p>
        <p>6.2 追剧达人不担保服务一定能满足用户的要求，也不担保服务不会中断，对服务的及时性、安全性、准确性也都不作担保。</p>
        <p>6.3 追剧达人不保证为向用户提供便利而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由追剧达人实际控制的任何网页上的内容，追剧达人不承担任何责任。</p>
      </section>
      
      <section>
        <h4>七、协议修改</h4>
        <p>7.1 追剧达人有权在必要时修改本服务协议条款，协议条款一旦发生变动，将会在相关页面上提示修改内容。</p>
        <p>7.2 如果不同意追剧达人对本服务协议相关条款所做的修改，用户有权停止使用网络服务。</p>
        <p>7.3 如果用户继续使用网络服务，则视为用户接受追剧达人对本服务协议相关条款所做的修改。</p>
      </section>
      
      <section>
        <h4>八、联系我们</h4>
        <p>如果您对本协议有任何疑问，请通过以下方式联系我们：</p>
        <p>客服电话：400-888-8888</p>
        <p>客服邮箱：service@drama.com</p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
.agreement-page {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: 20px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: $bg-color;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  border-bottom: 1px solid $border-light;
}

.back-btn {
  position: absolute;
  left: 16px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-title {
  font-size: 17px;
  font-weight: 600;
}

.content {
  padding: 60px 16px 20px;
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .update-time {
    font-size: 12px;
    color: $text-tertiary;
    margin-bottom: 24px;
  }
}

section {
  margin-bottom: 24px;
  
  h4 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 12px;
    color: $text-primary;
  }
  
  p {
    font-size: 14px;
    color: $text-secondary;
    line-height: 1.8;
    margin-bottom: 8px;
  }
}
</style>
