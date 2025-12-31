import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";

const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig(async () => ({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    VueRouter({
      routesFolder: 'src/pages',
      extensions: ['.vue'],
      // 排除掉页面目录下的非页面资源，防止它们变成路由
      exclude: ['**/components/**', '**/composables/**', '**/assets/**'],
    }),
    vue(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      // 自动扫描全局 composables 和 页面级 composables
      dirs: ['src/composables', 'src/pages/**/composables', 'src/utils/sys', 'src/utils/http', 'src/hooks'],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      // 自动扫描全局 components 和 页面级 components
      dirs: ['src/components', 'src/pages/**/components'],
    }),
  ],
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell Vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
