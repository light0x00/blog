# 拉取ci子模块
git submodule update --remote ci-shell

./ci-shell/src/index.sh \
--mode=remote \
--skip-pull \
--skip-compile \
--app-name=blog \
--local-path=$TRAVIS_BUILD_DIR \
--compile-output-path=dist \
--remote-ip=47.244.152.125 \
--remote-user=light \
--remote-path=/home/light/app/blog 