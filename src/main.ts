import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setupStore } from "./stores";

// UnoCSS
import "virtual:uno.css";

// 通用字体
import "vfonts/Inter.css";
import "vfonts/FiraCode.css";

const app = createApp(App);

// 配置 Store
setupStore(app);

// 配置路由
app.use(router);

app.mount("#app");
