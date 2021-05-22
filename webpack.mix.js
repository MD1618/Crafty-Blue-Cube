const mix = require('laravel-mix');

mix.setPublicPath('web/assets');

mix.js('src/app.js', 'js')
    .sass('src/app.scss', 'css');

mix.copy('src/img', 'web/assets/img');

mix.disableNotifications();