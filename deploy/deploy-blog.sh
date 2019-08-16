#!/bin/bash
# npm run prod
# if [ $?==0 ] ; then
    ci-shell \
    --mode=remote \
    --skip-pull \
    --skip-compile \
    --app-name=blog \
    --local-path=$TRAVIS_BUILD_DIR \
    --compile-output-path=dist \
    --remote-ip=$server_ip \
    --remote-user=light \
    --remote-path=/home/light/app/blog 
# fi
