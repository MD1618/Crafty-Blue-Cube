const mix = require('laravel-mix');
const tailwindcss = require("tailwindcss");




mix.js('src/app.js', 'web/assets/js')
    .sass('src/app.scss', 'web/assets/css')
    .options({
        processCssUrls: false,
        postCss: [tailwindcss("./tailwind.config.js")]
    });



mix.copy('src/img', 'web/assets/img');
mix.copy('web', 'docs');

mix.disableNotifications();