
[TOC]

# sed

1. `sed [options] [匹配命令][flag] file`

    例:

    ```bash
    sed -n '/.*/{p;n}' testfile3    # 打印奇数行
    ```

2. `sed [options] [操作命令][flag] file`

    例:

    ```bash
    sed -n 'p;n' testfile3  # 打印奇数行
    ```

3. `sed [options] [匹配命令][操作命令][flag] file`

    例:

    ```bash
    sed -n '/.*/{p;n}' testfile` # 打印奇数行
    ```

4. `sed [options] [操作命令][匹配命令][操作命令][flag] file`

    例:

    ```bash
    sed -n 'p;/.*/{n;}' testfile # 打印奇数行
    ```

5. 多行

    ```bash


    ```

> 注意「操作命令」与「匹配命令」的顺序不同所带来的区别,如果操作命令在前,无论是否匹配都会执行;如果操作命令在后,则只有(模式空间)匹配成功时才会执行.

## 模式空间、保持空间

模式空间
    : 每当处理一个行(或多行)时,都会将这些行存在模式空间,等到处理下一个行(或多行)时再将模式空间替换为新的行,如此循环.默认情况下,sed每处理一个行都会将模式空间输出到STD_OUT.

保持空间
    : 用于暂存(模式空间的)行,

可以这么看待,模式空间的生命周期是「一次处理行(或多行)的过程」,保持空间的生命周期是「整个处理任务过程」.可使用一系列命令,让这两个空间的数据进行交换、替换、追加.

~|~
---|---
h|模式空间覆盖保持空间
H|模式空间追加到保持空间
g|保持空间覆盖模式空间
G|保持空间追加到模式空间
x|交换模式空间和保持空间

这些命令与其他「操作命令」一样,页可以配「匹配命令」,来确定作用行范围.

```bash
# 将第一行保存到「保持空间」,等到最后一行的时候再追加到「模式空间」,使得第一行被输出两次.
sed '1h;$G;' testfile3
# this is first line
# this is second line
# this is third line
# this is fourth line
# this is fifth line
# this is first line

sed '/first/h;$G;' testfile3
sed '/first/,/second/H;' testfile3  
```

需要注意「保持空间」的空行问题,下面的例子证明,初始状态下「保持空间」默认有一个空行,使用覆盖性的操作(h、g)可以解决这个问题.

```bash
sed -n '1H;$G;$p' testfile3
# 输出:
# this is fifth line

# this is first line
```


例: 实现倒序打印

```bash
cat testfile3
# this is first line
# this is second line
# this is third line
# this is fourth line
# this is fifth line

sed -n '1h;1!x;1!H;$g;$p' testfile3
this is fifth line
this is fourth line
this is third line
this is second line
this is first line

# 第一行的时候
```

## options

opts|desc
---|---
-n|不输出STD_OUT
-f|指定script文件,即`行范围`+`操作命令`+`flag`

## 匹配命令

```bash
#  ======== 通过行号指定 ========
# 指定行
'1p'        # 例如: sed -n '1p' testfile3
# 1~3行范围
'1,3'       # 例如: sed -n '1,3p' testfile3
# 2~最后一行范围
'2,$'       # 例如: sed -n '3,$p' testfile3

# ======== 通过正则指定 ========
# regex匹配的行
'/regex/p'  # 例如: sed -n '/first/p' testfile3
# 匹配多行间
'/regex1/,/regex2/p'    # 例: sed -n '/first/,/third/p' testfile3

# ⚠️ 范围处理时
# 1. 如果前一个匹配条件没有匹配的行,那么都不会被匹配!
# 2. 如果后一个匹配条件没有匹配的行,那么会从第一个条件的匹配行开始至结尾都会被匹配!!!!
```

### sed版正则

#### &

在sed的正则中,可以使用「&」来获得「匹配到的内容」.

例: 以下例子演示将每行的最后一个单词加上双影号.

```bash
cat testfile4
# cxk can play basketball
# cxk can rap
# cxk can jump

sed 's/[a-z]*$/"&"/' testfile4
# cxk can play "basketball"
# cxk can "rap"
# cxk can "jump
```

#### 分组

可以用括号`()`来对匹配内容分组,通过`\组序号`来提取分组的匹配内容.

要注意的是,`()`需要转义.

```bash
sed '
s/\([a-z]*\)\(.* \)\([a-z]*\)/\3\2\1/
' testfile4
# basketball can play cxk
# rap can cxk
# jump can cxk
```

## flag

flag|desc
---|---
数字|处理行的第几个匹配项
g|替换行的所有匹配项(默认情况下,sed只替换匹配到的第一项)
p|输出文本处理过的行(通常需要配合`-n`使用,如`sed -n 's/old/new/p'`)
w [file]|处理结果写到文件

```bash
#  ====== w ======
# 将1~3行保存到新的文件
sed '1,3w testfile2' testfile
# 将与「Jack」匹配的行保存到新文件
sed '/Jack/w testfile2' testfile
# 将修改的行(不包括未修改的)保存到新的文件
sed 's/Hello/Bonjour/w testfile2' testfile

# ====== g\数字 ======
# 替换行的所有Hello
sed 's/Hello/Bonjour/g' testfile
# 只替换行的第二个「Hello」
sed 's/Hello/Bonjour/2' testfile

# ====== p ======
# 请看「控制输出结果」部分
# 只输出1~3行
sed -n '1,3p' testfile

# 替换(每一行的)第二个「Hello」,并将结果保存到「testfile2」
sed 's/Hello/Bonjour/2w testfile2' testfile
```

## 操作命令

### 删除行(d)

```bash
# 删除所有
sed d testfile
# 删除第三行
sed 3d testfile
# 删除1~9行
sed '1,9d' testfile
# 删除3~最后一行
sed '3,$d' testfile
# 删除包含「fuck」的行(支持正则)
sed '/fuck/d' testfile
# 删除范围,范围是从第一个包含「fuck」的行到最后一个包含「shit」的行(支持正则)
sed '/fuck/,/shit/d' testfile
```

准确的说,`d`命令会清空「模式空间」,这也是其与`D`的区别,D只删除「模式空间」的第一行

```bash
cat testfile2
# i love my little
# airport!!
# he loves my little airport2
sed 'N;/little\nairport/d' testfile2
# he loves my little airport2!
```

### 跨行删除(D)

有如下文本,要求删除含有跨行的「my little airport」的行

```txt
i love my little
airport!!
he loves my little airport!
```

```bash

sed '
/my little airport/d
' testfile2

# 直觉上,你会尝试下面这样
sed '
N
/my little\nairport/d
' testfile2

# 输出: he loves my little airport!

# 上面的结果比较科学,但是如果想要「只删除含有跨行my little airport的多行中的首行」呢? 使用「D」命令可以实现.
sed '
N
/my little\nairport/D
' testfile2

airport!!
he loves my little airport!
```

### 插入行(i/a)

```bash
# 第2行处插入(原第2行后移)
sed '2i\new_line' testfile
# 第2行后追加
sed '2a\new_line' testfile
# 最后一行后追加
sed '$a\new_line' testfile
# 追加多行
sed '$a\
first line\
second line\
third line' testfile
# 在匹配「jack」的行后追加「Jack&Rose」
sed '/Jack/a\Jack&Rose' testfile
```

### 替换行(c)

```bash
# 修改第3行
sed '3c\new_line' testfile
# 将匹配「Jack」的行替换
sed '/Jack/c\Jack&Rose' testfile
# 替换2~7行
sed '2,7c\
the new line to replace 3~7 line' testfile
```

### 替换关键字(s)

需要注意的是,不会修改原始输入流(文件),而是将修改结果输出.

`sed 's/old_text/new_text/flags' file`

例:

```bash
# 将替换结果保存到新的文件
sed 's/Hello/Bonjour/w testfile2' testfile
# 替换所有
sed 's/Hello/Bonjour/g' testfile
# 只替换(每一行的)第二个「Hello」
sed 's/Hello/Bonjour/2' testfile
# 替换(每一行的)第二个「Hello」,并将结果保存到「testfile2」
sed 's/Hello/Bonjour/2w testfile2' testfile
# 替换1~3行里的所有「Hello」为「Bonjour」
sed '1,3s/Hello/Bonjour/g' testfile
```

### 字符修改(y)

```bash
# 一一对应的方式将abc替换为xyc, a-
sed 'y/abc/xyc/' testfile
# 替换1~3行范围内的匹配项
sed '1,3y/abc/xyc/' testfile
```

### 读取文件(r)

```bash
# 每输出file1的一行就输出一次file2
sed 'r file2' file1
# 输出file1到第3行后,转而输出file2,之后再输出file1剩余部分
sed '3r file2' file1
```

```bash
# 模版
$ cat users_template
============ Computer User =============
LIST
================== End =================
cat users_data
root /bin/bash
bin /sbin/nologin
# 将模版替换为数据
$ sed '/LIST/{
> r users_data
> d
> }' users_template
============ Computer User =============
root /bin/bash
bin /sbin/nologin
================== End =================
```

### 排除命令(!)

用于设置「命令」对指定行不生效.

```bash
# 「p」对第一行不生效
sed -n '1!p' testfile3
# 「p」对最后一行不生效
sed -n '$!p' testfile3
```

### = (输出当前行号)

获得行号

```bash
sed '=' testfile3
# 1
# this is first line
# 2
# this is second line
# 3
# this is third line
# 4
# this is fourth line
# 5
# this is fifth line
```

### $ (尾行行号)

用于表示最后一行的行号.

```bash
sed -n '$p' testfile3 # 打印最后一行
sed -n '$!p' testfile3 # 打印除最后一行外的行
```

### n (下一行)

「n」可以把下一行放入「模式空间」,而模式空间的原本的行会被覆盖

```bash
while((dialog_space=iterator.next())!=null){
    dialog_space=next()  # n相当于迭代到下一行,注意新行替换了原本的行
}
```

```bash
cat testfile3
# the first line
# the second line
# the third line
# the fourth line
# the fifth line

# 获得2的倍数行
sed -n '/.*/n;P' testfile3
# the second line
# the fourth line

# 获得3的倍数行
sed -n '/.*/n;n;p' testfile3
# the third line
```

### N (追加下一行)

「N」命令把下一行追加到「模式空间」. 如下例子证明,每执行一次N,下一行的数据就会被追加到「模式空间」

```bash
sed -n '=;p;N;=;p;N;=;p;N;=;p' testfile3
# ------- 这是第一次迭代
# 1
# this is first line
# 2
# this is first line
# this is second line
# 3
# this is first line
# this is second line
# this is third line
# 4
# this is first line
# this is second line
# this is third line
# this is fourth line
# ------- 这是第二次迭代
# 5
# this is fifth line
```

有时要匹配的文本会跨越多行,可以通过「N」来做跨行匹配.

```bash
cat testfile2
# i love my little
# airport!!
# he loves my little airport2!
sed -n 'N;/little\nairport/p' testfile2
i love my little
airport!!
```

#### N 跨行操作的陷阱

假如现在有如下文本,需求是将跨行的「my little airport」替换为MLA

```txt
he loves my little airport!
i love my little
airport!!
he loves my little airport!
```

根据之前的经验,你会尝试下面这样

```bash
sed 'N; s/my little\nairport/MLA/;' testfile2
# 输出结果:
# he loves my little airport!
# i love my little
# airport!!
# he loves my little airport!
```

输出结果并不如人意,这是因为「N」把下一行追加到「模式空间」了,也就是说文本会被划分为如下片段:

```txt
--------- 第一次处理的行 ---------
he loves my little airport!
i love my little
--------- 第二次处理的行 ---------
airport!!
he loves my little airport!
```

对于上面例子,可以通过「匹配命令」限制N的作用行,使其只对第2行生效,只有第二行的时候,追加下一行到模式空间.

```bash
sed '2N; s/my little\nairport/MLA/;' testfile2
# he loves my little airport2!
# i love MLA!!
# he loves my little airport2!
```

### p(打印)

p会答应「模式空间」的所有行.

### P(打印)

与`p`不同的是,`P`只打印「模式空间」中的第一行

```txt
i love my little
airport!!
he loves my little airport!
```

```bash
sed -n 'N;/little\nairport/p' testfile2
# 输出:
# i love my little
# airport!!
sed -n 'N;/little\nairport/P' testfile2
# 输出:
# i love my little
```

### b(while/do-while)

上面的例子中,全部都是一套命令针对所有的行单元. 假如我们希望不同的行执行不同的命令呢?

「分支」就是用来实现这种需求的.

```bash

sed '{
    [匹配条件]b [条件名称]  

    [默认执行的命令]  

    :[条件名称]
        [满足条件时执行的命令]
}'
# 匹配条件支持正则(非纯正的正则)、行号)
# 不可省略「默认执行的命令」(如果省略,sed将把之后的命令当作默认命令)
# 可以声明多个条件(分支)
```

例:

```bash
cat testfile3
# 输出
# this is first line
# this is second line
# this is third line
# this is fourth line
# this is fifth line

sed '{
    /first/b condition1
    2,3b condition2

    s/line/(modified by default)/
    :condition1
        s/line/(modified by condition1)/
    :condition2
        s/line/(modified by condition2)/
}' testfile3
# 输出:
# this is first (modified by condition1)
# this is second (modified by condition2)
# this is third (modified by condition2)
# this is fourth (modified by default)
# this is fifth (modified by default)
```

除此以外,还有一种比较「奇怪」的用法,这种用法类似`do-while`

```bash
sed '
    :[条件名称]
        [满足条件时执行的命令]
    [匹配条件]b [条件名称]
'
```

例2:

```bash
# 去掉「,」
echo 123,456,789 | sed -n '
    :branch1
        s/,//p
    /,/b branch1
'
```

需要注意的是,如果branch没有退出条件,将会死循环.

```bash
sed '{
    :branch
        =
    b branch
}'
```

`q`命令可以用来实现退出,同其他「操作命令」一样`q`命令也可以和「匹配命令」配合.
如下脚本中,处理完前两行后将退出循环,任务结束. 需要注意以下两点:

1. ⚠️注意是sed进程结束,这对应的是`exit`而不是`break`!!!这意味着后面的代码不会执行.
2. `q`命令在配合「匹配命令」时,需要确保「匹配命令」不会永远为`false`.这一点同其他编程语言一样,即循环的退出条件永远为false,当然永远不会退出循环.

```bash
sed '{
    q
    :branch
        n
        2q
    b branch
    =
}'
# this is first line
# this is second line

sed '{
    :branch
        n
    1,$/b branch
    =
}'
```

与N合作以后,「N」的作用似乎发生了变化,原本N一次 会让数据堆叠在模式空间
此时

```bash
sed -n '{
:start
    =
    N
    p
    $q
b start
}' testfile3
# 1
# this is first line
# this is second line
# 2
# this is first line
# this is second line
# this is third line
# 3
# this is first line
# this is second line
# this is third line
# this is fourth line
# 4
# this is first line
# this is second line
# this is third line
# this is fourth line
# this is fifth line
```

### t (if-elif-else)

「t」命令会根据上一条命令的执行结果来决定是否执行后续的命令, 如果上一条命令生效并执行了,那么就不再执行后续,反之则执行.

```bash
sed {
    [命令1]  
    t   # if
    [命令2]
    t   # elif
    [命令3]  
    # 可以无限添加条件...
}
```

例:

```bash
cat testfile3
# this is first line
# this is second line
# this is third line
# this is fourth line
# this is fifth line
sed '{
    s/first line/首行/
    t
    $s/[a-z]* line$/尾行/
    t
    s/[a-z]* line$/中间行/
}' testfile3
# this is 首行
# this is 中间行
# this is 中间行
# this is 中间行
# this is 尾行
```

## 其他

### 处理特殊字符

```bash
# 使用"\"
gawk -F: '{print $7}' /etc/passwd | sed 's/\/bin\/bash/BASH/'
# 更换分隔符号为「!」(默认是「/」)
gawk -F: '{print $7}' /etc/passwd | sed 's!/bin/bash!BASH!'
```

### 输出结果控制

```bash
# ====== p的用法 =====
# 输出产生修改的行
sed -n 's/old/new/p' testfile
# 输出1~3行
sed -n '1,3p' testfile
# 输出与「Jack」匹配的行
sed -n '/Jack/p' testfile

# 这是一个多条命令script组合,
# 3,5表示处理的行区间
# 第一个「p」表示打印3~5的每一行
# 第二个「p」表示打印3~5中产生修改的行
sed -n '3,5{
p
s/Mozart/Chopin/p
}' testfile

# ====== 「=」打印行号 =====
# 可以打印行号
sed -n '3,5{
=
p
s/Mozart/Chopin/p
}' testfile

# ====== 「l」打印不可见字符(如制表符、换行符) =====
light ~ $ echo "foo\tbar"|sed -n 'l'
foo\\tbar$
```

---

## 练习

加行号

```bash
sed '=' testfile3 | sed 'N;s/\n/ /'
# 1 this is first line
# 2 this is second line
# 3 this is third line
# 4 this is fourth line
# 5 this is fifth line
```

删除连续空行

```bash
sed '/./,/^$/!d' testfile
```

输出最后10行

```bash
# 思路: 借助「N」的特性,每次迭代都往「模式空间」(视作队列)追加新行(追加到队列末尾),追加到11行之后,就开始删除最首行(从队列首部移除),这样就可以保持「模式空间」中使用是最后10行了.
sed '{
:start
    $q
    N
    11,$D
b start
}' testfile3
```

删除头部的空行

```bash
sed '/./,$!d' testfile
```

删除尾部空行

```bash
sed '{
    :fuck
    /^\n*$/{ $d;N;b fuck}
}' testfile
```

提取html的innerText

```bash
curl www.douban.com | sed '{
    s/<[^>]*>//g
}'
```

