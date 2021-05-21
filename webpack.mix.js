const mix = require('laravel-mix');

mix.js('src/app.js', 'web/assets/js')
    .sass('src/app.scss', 'css')
    .setPublicPath('web/assets');

mix.disableNotifications();