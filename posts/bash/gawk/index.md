[TOC]

# gawk

## 变量

### 内建变量

FS

输入分隔符,用于将输入文本行分割为多个字段.默认值为空格.

```bash
gawk 'BEGIN{FS=":"} {print $1,$7}' /etc/passwd
# root /bin/bash
# bin /sbin/nologin
```

OFS

用于设置「print」命令的输出分隔符,默认值为空格.

```bash
gawk 'BEGIN{OFS="------";FS=":"} {print $1,$7}' /etc/passwd
# root------/bin/bash
# bin------/sbin/nologin
```

FIELDWIDTHS

定义每个字段的索引位置,从而提取出字段.使用后`FS`将失效

```bash
cat testfile2
# aaaaaaaaaaaaaaaaa
# aaaaaaaaaaaaaaaaa
# aaaaaaaaaaaaaaaaa
gawk 'BEGIN{FIELDWIDTHS="1 3 5";OFS="-";}{print $1,$2,$3}' testfile2
# a-aaa-aaaaa
# a-aaa-aaaaa
# a-aaa-aaaaa
```

RS (记录分割符)

用于分割记录的标记,默认值为`\n`,也就是说默认一行就是一条记录.

```bash
cat testfile3
# Hello World;
# Bonjour Monde;Ohayo 世界
gawk 'BEGIN{RS=";";FS=" ";}{print $1,"-",$2}' testfile3
# Hello - World
# Bonjour - Monde
# Ohayo - 世界
```

var|desc
---|---
ARGC|当前命令行参数个数
ARGIND|当前文件在ARGV中的位置

ARGC\ARGV (脚本参数)

```bash

gawk '{print ARGC,ARGV[0]}' testfile
# 2 gawk
```

ENVIRON (系统环境变量)

```bash

# ENVIRON 环境变量
echo '' | gawk '{print ENVIRON["HOME"],ENVIRON["USER"]}'
# /home/light light
```

NF\FNR (当前记录字段总数\当前记录序号)

```bash
cat testfile5
# aa bb cc dd ee ff gg
# aa bb cc
# aa bb cc dd ee
gawk '{print NF,FNR}' testfile5
# 7 1
# 3 2
# 5 3
```

### 自定义变量

```bash
gawk '
BEGIN{
    name="Bob"
    age=5
    print name,"is",18-age,"years from audlthood"
}'
# Bob is 13 years from audlthood
```

### 传递gawk脚本参数脚本

```bash
gawk '{print fuck}' fuck=123 <<< ''
# 123

# 把gawk脚本放进文件也是可以的
gawk -f gawk_script fuck="123" <<< ''
# 123
```

### 数组

数组、Map

```bash
gawk '
{
    arr[0]=11
    arr[1]=22
    print arr[0],arr[1]
}' <<< ''

gawk '
{
    arr[0]=11
    arr["fuck"]="shit"
    print arr[0],arr["fuck"]
}' <<< ''
```

删除元素

```bash
delete arr[key]
```

遍历数组

```bash
gawk '
{
    arr[0]="a"
    arr[1]="b"
    arr[2]="c"
    for(k in arr)
    {
        print "key:",k,"value:",arr[k]
    }
}' <<< ''
# key: 0 value: a
# key: 1 value: b
# key: 2 value: c
```

## 匹配表达式

### 正则匹配

匹配记录的任意字段. 记录中任何一个字段匹配即可.

```bash
cat testfile
# 23	玄黄	13089928378	NULL    zxc
# 25	盈昃	15589928378	NULL	abcd
# 29	abcd    13289928377	NULL	1234
# 27	周发	13189928378	NULL	abcd

gawk '/abcd/{print $0}' testfile
# 25	盈昃	15589928378	NULL	abcd
# 29	abcd    13289928377	NULL	1234
# 27	周发	13189928378	NULL	abcd
```

匹配记录的指定的字段

```bash
# 匹配第二个字段
gawk '$2 ~ /^abcd/{print $0}' testfile
# 29	abcd  13289928377	NULL	1234

# 匹配最后一个字段
gawk '$NF ~ /^abcd/{print $0}' testfile
# 25	盈昃	15589928378	NULL	abcd
# 27	周发	13189928378	NULL	abcd
```

取反匹配

```bash
gawk '$NF !~ /^abcd/{print $0}' testfile
# 23	玄黄	13089928378	NULL    zxc
# 29	abcd    13289928377	NULL	1234
```

### 逻辑运算符匹配

支持`>,<,>=,<=,==`等.

```bash
gawk '$2=="abcd"{print $0}' testfile
# 29	abcd  13289928377	NULL	1234

gawk '$1>25 {print $0}' testfile
# 29	abcd    13289928377	NULL	1234
# 27	周发	13189928378	NULL	abcd
```

## 流程控制

if

```bash
gawk '{
    if($0==0){
        print "男"
    }else if($0==1){
        print "女"
    }else{
        print "未知"
    }
}' <<< ''
```

while 

```bash
gawk '{
    factorial=1
    i=2
    while(i<=3){
        factorial=factorial*i
        i++
    }
    print factorial
}' <<< ''
```

do-while

```bash
gawk '{
    factorial=1
    i=2
    do{
        factorial=i*factorial;
        i++
    }while(i<=3)
    print factorial
}' <<< ''
```

for

```bash
gawk '{
    num1=1
    num2=1
    for(i=0;i<10;i++){
        tmp=num1+num2
        print tmp
        num1=num2
        num2=tmp
    }
}' <<< ''
```

> 支持 breaK/continue

## printf(格式化打印)

`+` `-` 用于左右对齐, 数字用于设置宽度

```bash
gawk '{
    printf "%20s %30-s %-30s\n",$1,$2,$3
}' testfile
```

四舍五入

```bash
gawk '{
    printf "%50.2f %s\n",$0,"嘿嘿嘿"
}' <<< 123.456789
```

## 函数

### 内建函数

function|desc
---|--
int()|取整数
rand()| 随机浮点小数
srand(seed)|设置随机种子
asort/asorti|排序key/value,很鸡肋的玩意
length(str/arr)|字符串/数组长度
index(arr,item)|获得item在数组中的索引
split(str,outputArray,split_char)|分割字符串为数组
sprintf(format,variables)|类似printf,对于String.format
substr(str,index,len)|类似substring
sub(regex/string,replaceStr,str)|正则匹配然后替换,类似replace()
gsub(regex/string,replaceStr,str) | 同上,类似replaceAll
tolower(s)/toupper(s)|大小写
matched(str,regex,matched_arr)|正则匹配,返回索引,匹配部分放入matched_arr

使用asort给value排序

```bash
gawk '{
    arr["a"]=8
    arr["b"]=5
    arr["c"]=9
    arr["d"]=4
    # asort将把按排序顺序(数字,从1开始)作为key来表示value的顺序
    # 由于是hash表 所以迭代结果无序
    len=asort(arr,arr2)
    for(j in arr2){
        print j,arr2[j]
    }
    # 4 8
    # 1 1
    # 2 2
    # 3 4
}' <<< ''
```

使用split分割字符串为数组

```bash
gawk '{
    str="a,b,c"
    split(str,arr,",")
    for(i=1;i<=length(arr);i++){
        print arr[i]
    }
}' <<< ''
```

正则替换(sub)

```bash
gawk '{
    str="aba"
    sub("a","b",str)
    print str

}' <<< ''
```

正则匹配(matched)

```bash
gawk '{
    print match("fuck,bullshit",/(uc).*(it)/,matched_str)
    print matched_str[0]  //原字符
    print matched_str[1]    //uc
    print matched_str[2]    //it
}' <<< ''

```

日期函数

function|desc
---|---
mktime|字符串=>时间戳
strftime|时间戳=>字符串
systime|当前时间戳

```bash
gawk '{
    date1="2019 07 25 23 44 00+8"
    date1_time = mktime(date1) 
    print date1_time  
    print strftime("%Y-%m-%d %H:%M:%S %z",date1_time) 
    print strftime("%Y-%m-%d %H:%M:%S %z",systime()) 
}' <<< ''
# 1564069440
# 2019-07-25 23:44:00 +0800
# 2019-07-26 00:41:30 +0800
```

自定义函数

```bash
gawk '
function  greet(){
    print "Hello "$0
}
function my_rand(limit){
    return int((rand()*limit))
}
{
    greet()
    result=my_rand(10)
    print result
}' <<< 'Bach'
```

将函数定义在单独的文件

```bash
cat gawk_lib
# function  greet(){
#     print "Hello "$0
# }
# function my_rand(limit){
#     return int((rand()*limit))
# }
cat gawk_script
# {
#     greet()
#     result=my_rand(10)
#     print result
# }
gawk -f gawk_lib -f gawk_script <<< 'Mozart'
```

## 执行Shell

```bash
gawk '{
    cmd="date"
    cmd | getline d; 
    close(cmd);
    print d
}' <<< ''
```

---

## 练习

### 统计总分并排序

```bash
cat fuck
# Mozart 100
# Bach	55
# Chopin 64
# Bach 99

gawk '
BEGIN {
}
{
    score=arr[$1]
    if(!score){
        arr[$1]=$2
    }else{
        arr[$1]=score+$2
    }
}
END {
    for(k in arr){
        print k,arr[k]
    }
}  
' fuck | sort -t " " -nr -k 2
```

### 将ps日期格式改为ISO

```bash
# 使用date
ps  -p 1,31900 -o etimes,etime,%cpu,rss,%mem,user,cmd --sort=-start_time | gawk '
function format_iso(date_timestamp){
    format="\"+%Y-%m-%d %H:%M:%S %z\""
    cmd="date -d @"date_timestamp" "format
    cmd | getline date_iso
    return date_iso
}
FNR!=1{
    printf "$s:00",format_iso(systime()-$1)
}'

# 使用内置函数
ps  -p 1,31900 -o etimes,etime,%cpu,rss,%mem,user,cmd --sort=-start_time | gawk '
FNR==1{
    printf "%30-s%s\n","start_time",$0
}
FNR!=1{
    iso_format="%Y-%m-%d %H:%M:%S %z"

    printf "%30-s%s\n",strftime(iso_format,systime()-$1),$0
}
'
```

### 查看最近启动的十个进程

```bash
ps  -e -o etimes,%cpu:30,rss,%mem,user,cmd --sort=-start_time | head -n 10 | gawk '
{
    sub($1,"",$0)
    if(FNR==1){
        printf "%30+s\v%s\n","START_TIME",$0
    }else{
        iso_format="%Y-%m-%d %H:%M:%S %z"
        printf "%30+s\v%s\n",strftime(iso_format,systime()-$1),$0
    }
}
' 
```

