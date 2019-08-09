
# meta 标签

title  

搜索引擎了解网页内容的主要因素,搜索结果的标题

> 据说,将重要的关键字放在前面会对排名有提升.

description

将显示在搜索结果页,desctiption标签不是必须的 ,不设置时搜索引擎会找页面中匹配的部分来代替

```
 <meta name ="description" content ="这是元描述的一个示例。这通常会显示在搜索结果中。">
```


# robots.txt

用于告诉搜索引擎,站点下路径的可访问性.

有如下四种语法,通俗得讲,就是规定,「谁家的爬虫」「可以做」「不可以做」.

- User-agent  爬虫的名字,各家搜索引擎自己起的
- Disallow    规定不能访问的路径
- Allow       规定可以访问的路径(优先级高于Disallow),默认情况下允许全站被访问
- Sitemap   指定当前站点下的sitemap路径

禁止谷歌访问全站路径

```txt
User-agent: Googlebot
Disallow: /
```

禁止谷歌访问全站路径,除了`/foo`

```txt
User-agent: Googlebot
Disallow: /
Allow: /foo
```

> 要注意爬虫对大小写敏感,`/foo`与`/Foo`是不一样的.

有时候,需要对不同爬虫区别对待,可以多组规则:

```txt
User-agent: Baiduspider
Disallow: /onlygoogle

User-agent: Googlebot
Disallow: /onlybaidu
```

> 如果爬虫宝宝多组规则都匹配了,那么它会找最接近的那一个.

通配符


```
/	    匹配根目录以及任何下级网址
/*	    等同于 /结尾的「*」通配符会被忽略。
/foo    以/foo开头即可,比如
    /foo
    /foolish
    /foo/**     
    /foo.xxx
/foo*   等同于 /foo
/foo/  匹配以`/foo/`开头的所有路径
/*.asp  匹配所有包含`.asp`的路径
/*.asp$  匹配所有以`.asp`结尾的路径
```

> [doc](https://developers.google.com/search/reference/robots_txt)


# robot meta tags

告诉搜索引擎页面中的内容的可访问性,有如下两种等效的使用方式:

用在响应头中

```txt
X-robots-tag=[PARAMETER]
```

html中

```txt
<meta name="robots" content="[PARAMETER]">
```

robots可以有多个值,可选值如下:

```txt
Noindex: Tells a search engine not to index a page.

Index: Tells a search engine to index a page. Note that you don’t need to add this meta tag; it’s the default.

Follow: Even if the page isn’t indexed, the crawler should follow all the links on a page and pass equity to the linked pages.

Nofollow: Tells a crawler not to follow any links on a page or pass along any link equity.

Noimageindex: Tells a crawler not to index any images on a page.

None: Equivalent to using both the noindex and nofollow tags simultaneously.

Noarchive: Search engines should not show a cached link to this page on a SERP.

Nocache: Same as noarchive, but only used by Internet Explorer and Firefox.

Nosnippet: Tells a search engine not to show a snippet of this page (i.e. meta description) of this page on a SERP.

Noodyp/noydir [OBSOLETE]: Prevents search engines from using a page’s DMOZ description as the SERP snippet for this page. However, DMOZ was retired in early 2017, making this tag obsolete.

Unavailable_after: Search engines should no longer index this page after a particular date.
```

例如:

```txt
<meta name="robots" content="noimageindex," "nofollow," "nosnippet">
```

以上设置,将告诉搜索引擎不要索引页面内的图片、不要跟踪和传递页面内的链接、不要显示页面内的片段在搜索结果页中

# Open Graph协议

一般用于社交网站,比如在知乎对链接有转「卡片」功能. 知乎会尝试访问这个链接,拿到html中的特定meta字段,从而得到这个链接的一些特征信息,比如 图片、内容标题等.

[Open Graph文档](https://ogp.me/)