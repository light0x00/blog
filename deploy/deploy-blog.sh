#!/bin/bash
# npm run prod
# if [ $?==0 ] ; then
    ci-shell \
    --mode=remote \
    --skip-pull \
    --skip-compile \
    --app-name=blog \
    --local-path=$TRAVIS_BUILD_DIR \
    --compile-target-path=dist \
    --remote-ip=47.244.152.125 \
    --remote-user=light \
    --remote-path=/home/light/app/blog 
# fi
