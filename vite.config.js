import {defineConfig} from "vite";
import {ViteEjsPlugin} from "vite-plugin-ejs";

export default defineConfig({
  plugins: [
    // Without Data
    ViteEjsPlugin(),
    
    // With Data
    ViteEjsPlugin({
      domain: "localhost",
      title: "Pete's Shelf"
    }),
    
    // Or With Vite Config
    ViteEjsPlugin((viteConfig) => {
      // viteConfig is the current viteResolved config.
      return {
        root: viteConfig.root,
        domain: "localhost",
        title: "Pete's Shelf"
      }
    }),
  ],
});