# 拉取ci子模块
# git submodule update --remote ci-shell

# 得到运行时根路径
base_path=`dirname $(readlink "$0")`
if [ -z $base_path ] ;then
    base_path=`dirname $0`
fi

base_path=$TRAVIS_BUILD_DIR

$base_path/deploy/ci-shell/src/index.sh \
--mode=remote \
--skip-pull \
--skip-compile \
--app-name=blog \
--local-path=$base_path \
--compile-output-path=dist \
--remote-ip=47.244.152.125 \
--remote-user=light \
--remote-path=/home/light/app/blog \
--ssh-key=$base_path/id_rsa_light \
-y

