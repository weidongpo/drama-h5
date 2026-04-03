import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useThemeStore } from './stores/theme'

// Vant 组件和样式
import { 
  Tabbar, 
  TabbarItem, 
  Tag, 
  Search, 
  Image as VanImage,
  Icon,
  Button,
  Empty,
  Tabs,
  Tab,
  Progress,
  Cell,
  CellGroup,
  Loading,
  Popup,
  Collapse,
  CollapseItem,
  Field,
  ActionSheet,
  DatePicker,
  ShareSheet,
  Switch,
  TimePicker,
  Rate,
  Dialog
} from 'vant'
import 'vant/lib/index.css'

// 全局样式
import '@/styles/index.scss'

const app = createApp(App)

// 注册 Vant 组件
app.use(Tabbar)
app.use(TabbarItem)
app.use(Tag)
app.use(Search)
app.use(VanImage)
app.use(Icon)
app.use(Button)
app.use(Empty)
app.use(Tabs)
app.use(Tab)
app.use(Progress)
app.use(Cell)
app.use(CellGroup)
app.use(Loading)
app.use(Popup)
app.use(Collapse)
app.use(CollapseItem)
app.use(Field)
app.use(ActionSheet)
app.use(DatePicker)
app.use(ShareSheet)
app.use(Switch)
app.use(TimePicker)
app.use(Rate)
app.use(Dialog)

const pinia = createPinia()
app.use(pinia)
app.use(router)

// 初始化主题
const themeStore = useThemeStore()
themeStore.initTheme()

app.mount('#app')
