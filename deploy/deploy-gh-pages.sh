#!/bin/bash

# 部署到github page

function helpInfo(){
    echo "-s,--skip-compile"
    echo "-m    git commit message"
    echo "-a,-add    git add pattern"
    echo "-y    answer yes"
}


set -o errexit -o pipefail -o nounset

# Transform long options to short ones 为了支持长参数,将其转为短参数
for arg in "$@"; do
  shift
  case "$arg" in
    "--skip-compile") 
        set -- "$@" "-s" ;;
    "--help") 
        set -- "$@" "-h" ;;
    "-add")
        set -- "$@" "-a" ;;
    "--*")        
        echo "unknown option $arg"
        exit 0;;
    *)
        set -- "$@" "$arg";;
  esac
done

commit_msg="auto deploy"
skip_compile=false
yes=false
add_pattern="."

while getopts a:m:syh opt
do
    case "$opt" in
        m)
            commit_msg=$OPTARG;;
        s)
            skip_compile=true;;
        y)
            yes=true;;
        a)
            add_pattern=$OPTARG;;
        h)
            helpInfo
            exit 0;;
        *)
            echo "unknown option: $opt"
            exit 1;;
    esac
done

# 编译
if ! $skip_compile ;then
    npm run prod
fi

if [ "$?" -ne 0 ] ;then
    exit 1;
fi

# 拷贝&部署
del_dir=`pwd`"/docs/"
if  ! $yes ; then
    read -p "The old directory will be deleted: $del_dir (y/n)" del
    if ! [[ "$del" =~ [yY] ]] ; then
        echo "Stop the deployment!" 
        exit 1
    fi
fi

rm -r "$del_dir" && cp -r dist/ docs/ && git add $add_pattern && git commit -m "$commit_msg" && git push



