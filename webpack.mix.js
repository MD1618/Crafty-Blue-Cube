const mix = require('laravel-mix');
const tailwindcss = require("tailwindcss");



mix.setPublicPath('web/assets');

mix.js('src/app.js', 'js')
    .sass('src/app.scss', 'css')
    .options({
        processCssUrls: false,
        postCss: [tailwindcss("./tailwind.config.js")]
    });

mix.copy('src/img', 'web/assets/img');

mix.disableNotifications();