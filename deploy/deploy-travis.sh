# 拉取ci子模块
# git submodule update --remote ci-shell

# 得到运行时根路径
base_path=`dirname $(readlink "$0")`
if [ -z $base_path ] ;then
    base_path=`dirname $0`
fi

$base_path/ci-shell/src/index.sh \
--mode=remote \
--skip-pull \
--skip-compile \
--app-name=blog \
--local-path=$TRAVIS_BUILD_DIR \
--compile-output-path=dist \
--remote-ip=$server_ip \
--remote-user=light \
--remote-path=/home/light/app/blog 