# vim

普通模式: 「esc」键进入
命令行模式: 在普通模式下,按「:」进入命令行模式.
输入模式: 「i」,「a」,「A」等进入

### 移动光标

按字符移动光标

cmd|desc
---|--
h/j/k/l|左/下/上/右
b/w|移动到上一个/下一个单词的开头
0/$(shift+4)|行首/行末
F+[字符]/f+[字符]|光标移动到当前行的上一个/下一个指定字符处
T+[字符]/t+[字符]|基本同上,区别是移动到字符之前
( / )|前移一句/后移一句
+ / -|上一行的开头/下一行的开头
[数字] \||移动到指定列

按行移动光标

cmd|desc
---|--
gg/G   |第一行/最后一行
[数字] gg / [数字] G | 指定行

滚屏

cmd|desc
---|--
ctrl+y/ctrl+e|向上/下滚动一行
ctrl+b/ctrl+f | 上下翻页
ctlr-u/ctrl-d |上下翻半页
H|            移动到屏幕顶端的行
M |           移动到屏幕中央的行
L  |          移动到屏幕底端的行
nH|           移动到屏幕顶端往下的第n行
nL |          移动到屏幕顶端往上的第n行

### 删除

cmd|desc
---|--
x |删除光标所在位置的字符
[数字]+x|删除从光标所在位置开始的n个字符
dd |删除光标所在行
dgg/dG|删除光标所在行至首行/尾行
[数字]+dd|删除从光标所在行开始的n行
db/dw|删除光标前/后一个单词
d0/d$|删除光标所在位置至行首/行尾
J|删除光标所在行的换行符(合并下一行到当前行末尾)
:[n1],[n2] delete|删除n1行到n2行



### 插入

cmd|desc
---|--
a|在当前光标后插入字符
A|在当前光标所在行末尾插入
i|在当前光标前插入
O/o|在上一行插入空行



### 多行操作

cmd|desc
---|---
:m,n normal [命令]|对m~n行指定normal命令

#### 同时删除

行

```bash
:m,n normal dd
```

列

```bash
ctrl+v   # 1.进入可是块模式
d   # 2. 进入输入模式,并输入
esc  
```

#### 同时插入

列

```bash
:m,n normal I #
```

行

```bash
ctrl+v   # 1.进入可是块模式
I   # 2. 进入输入模式,并输入
esc  
```

### 选择区域

cmd|desc
---|---
v|可视块模式
V  | 可视行模式
ctrl+v|可视列模式

指定行号选择

1. 进入可视模式
2. [行号] +「G」

### 粘贴

cmd|desc
---|---
p/P|在下/上一行粘贴

### 剪切

cmd|desc
---|---
:n,m move n2,m2|移动n~m行到n2,m2

1. 选择区域
2. 「d」删除选择区域
3.  粘贴


### 复制

cmd|desc
---|--
ggvg|全选
ggyG|全部复制
:n copy n2|复制n到n2
:n,m copy n2,m2|复制n~m行到n2,m2

指定区域复制:

1. 「v」进入可视模式,移动光标来选择要复制的区域
2. 「y」复制选择的区域
3. 「p」粘贴

### 查找

1. 「/」后输入搜索的字符
2. 「N/n」跳到上一处/下一处匹配项

### 替换

```txt
:[查找范围]s/[old_str]/[new_str]/[规则]
```

查找范围

「n,m」 指定行范围
「%s」  整个文件范围

规则

g 范围内所有
c 替换前询问

```bash
# 当前行范围内
:s/old/new/ # 第一个
:s/old/new/g # 所有

# n~m行范围
:n,ms/old/new/  # 替换第一个
:n,ms/old/new/g  # 替换所有

# 文件范围
:%s/old/new/ # 替换第一个
:%s/old/new/g # 替换所有
:%s/old/new/gc # 提前前询问
```

### 分屏

分屏

```bash
vim -o file1 file2 # 水平方式分屏打开文件
vim -O file1 file2  # 垂直方式分屏打开文件
vim -O3  # 垂直方式分3个屏
```

~|~
---|---
ctrl+W+s/:sp|水平分割当前打开的文件
:sp [filename]|水平分割,并打开新文件
ctrl+W+v/:vsp|垂直分割当前文件
:vsp filename|垂直分割,并打开新文件
ctrl+w [h/j/k/l] | 移动光标到左/上/下/右屏
ctrl+w [H/J/K/L] |更改窗口布局,将当前窗口拖到左/上/下/右.
ctrl+W + [H/J/K/L]| 移动窗口位置
ctrl+W +/-| 调整当前窗口高度
ctrl+W >/< |调整当前窗口宽度

### 标签页

```bash
vim -p file1 file2 
vim -p3  # 打开三个空标签页
```

~|~
---|---
ctrl+W+T|将当前屏转为标签页
:tabe [filename]|打开新的标签页
:tabe|打开新的标签页,创建新的文件
:tabnew| 同tabe
:set tabpagemax=15|设置可以打开标签页的最大数量
:tabm [tab_index]|更改当前标签页的次序(不指定参数将移动到最后)
:tabc|关闭当前标签页
:tabo|关闭所有标签页
:tabp/gT|切换到上一个标签页
:tabn/gt|切换到下一个标签页
:tabfirst|切换到第一个标签页
:tablast|切换到最后一个标签页

### vimdiff

```bash
vimdiff file1 file2
```

### 排版

- 对齐

    ```txt
    :m,n left   指定区域左对齐
    :m,n right  指定区域左对齐
    :m,n >  右移
    :m,n <  左移

    ```
    
- 格式化

    ```txt
    全局格式化
    gg=G  

    局部格式化
    1. 选中需要格式化的区域
    2. 「= 」
    ```

### 其他

cmd|desc
---|--
u/ctrl+f|撤销/恢复
:set fileencoding|得到文件编码(vim状态下)
:set number	|显示行号
:ser nonumber|	关闭行号
:q | 退出
:q!|退出并不保存修改
:w filiname|另存为一个文件
:wq|保存并退出
:qa|退出所有窗口,标签页
open [file]|在当前窗口打开新的文件
ggVG|全选
gg=G|格式化
:m,n>|m~n行缩进
</> |当前行(或已选择的块)左右缩进

> "."表示当前行，例如: "1,. delete" 表示删除第一行到当前行

### 配置

```bash
# 分割栏颜色
 hi StatusLine ctermfg=67 ctermbg=234 cterm=bold guifg=#D97316 guibg=#D97316 gui=bold
 hi StatusLineNC ctermfg=188 ctermbg=237 cterm=NONE guifg=#a9b7c6 guibg=#D97316 gui=NONE

hi LineNr ctermfg=60 ctermbg=236 cterm=NONE guifg=#888888 guibg=#323232 gui=NONE

# 当前行颜色
hi CursorLine ctermfg=NONE ctermbg=236 cterm=NONE guifg=NONE guibg=#323232 gui=NONE
hi CursorLineNr ctermfg=NONE ctermbg=24 cterm=NONE guifg=NONE guibg=#214283 gui=NONE

```

