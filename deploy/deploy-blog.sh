#!/bin/bash
# npm run prod
# if [ $?==0 ] ; then
    ci-shell \
    --mode=remote \
    --skip-pull \
    --skip-compile \
    --app-name=blog \
    --local-path=/Users/light/Desktop/my-workbench/blog/ \
    --compile-target-path=dist \
    --remote-ip=47.244.152.125 \
    --remote-user=light \
    --remote-path=/home/light/app/blog 
# fi
