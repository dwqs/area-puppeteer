# area-puppeteer
基于 puppeteer 的中国行政区域抓取爬虫

## 数据来源
* 国家统计局：[统计用区划代码和城乡划分代码](http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2016/index.html)
* 国家民政部：[中华人民共和国行政区划代码](http://www.mca.gov.cn/article/sj/tjbz/a/)

## 数据更新

```
git clone git@github.com:dwqs/area-puppeteer.git
npm i
npm start
npm run format // 格式化数据
```

格式化后会生成两份数据：`pca-code.js` 和 `pcaa-code.js`，前者仅省市数据，后者包含省市区数据

## License
This repo is released under the [WTFPL](http://www.wtfpl.net/) – Do What the Fuck You Want to Public License.