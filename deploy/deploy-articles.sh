#!/bin/bash

if [ -z $TRAVIS_BUILD_DIR ] ;then
    app_base_path=/Users/light/Desktop/my-workbench/blog/ # 没有通用的办法
else
    app_base_path=$TRAVIS_BUILD_DIR
fi

$app_base_path/deploy/ci-shell/src/index.sh 
--mode=remote \
--skip-pull \
--skip-compile \
--app-name=blog \
--local-path=$app_base_path/blog-articles \
--remote-ip=47.244.152.125 \
--remote-user=light \
--remote-path=/home/light/app/blog-articles \
--ssh-key=/Users/light/.ssh/id_rsa_light \
-y
