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
    --remote-ip=47.244.152.125 \
    --remote-user=light \
    --remote-path=/home/light/app/blog \
    --ssh-key=/Users/light/.ssh/id_rsa_light \
    <<< "sudo /usr/sbin/service nginx reload"
# fi
