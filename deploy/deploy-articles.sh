#!/bin/bash
ci-shell \
--mode=remote \
--skip-pull \
--skip-compile \
--app-name=blog \
--local-path=$TRAVIS_BUILD_DIR \
--compile-output-path=blog-articles \
--remote-ip=47.244.152.125 \
--remote-user=light \
--remote-path=/home/light/app/blog-articles
