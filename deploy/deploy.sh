git submodule update --init --recursive --remote
npm run build:prod
rsync -vrp dist/ light@light0x00.com:~/containers/www/blog-ui/