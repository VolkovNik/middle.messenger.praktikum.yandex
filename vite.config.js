import { resolve } from 'path';
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                chats: resolve(__dirname, 'src/pages/chats/chats.html'),
                404: resolve(__dirname, 'src/pages/errors/404/404.html'),
                error: resolve(__dirname, 'src/pages/errors/error/error.html'),
                login: resolve(__dirname, 'src/pages/authorization/login/login.html'),
                settings: resolve(__dirname, 'src/pages/settings/settings.html'),
                signup: resolve(__dirname, 'src/pages/authorization/signup/signup.html'),
            }
        }
    },
    plugins: [handlebars({
        partialDirectory: [
            resolve(__dirname, 'src/components'),
            resolve(__dirname, 'src/layouts')
        ],
    })],
    server: {
        port: 3000,
    }
});
