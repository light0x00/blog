#!/bin/bash
# npm run prod
# if [ $?==0 ] ; then
    ci-shell \
    --mode=remote \
    --skip-pull \
    --skip-compile \
    --app-name=blog \
    --local-path=./ \
    --compile-output-path=dist \
    --remote-ip=11.22 \
    --remote-user=light \
    --remote-path=/home/light/app/blog 
# fi
