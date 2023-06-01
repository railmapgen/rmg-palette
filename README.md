# RMG Palette

This repository contains

- `city-config.json`, a list of cities sorted by their English name in alphabetical order; and
- `[city].json`, a list of colours used in the city's public transportation system.

Please follow the rules below to

- Add colour standards for more cities;
- Update colours; or
- Add translations for cities or lines.

A typical example of an entry of `city-config.json`:

```JSON
{
  "id": "sanfrancisco",
  // Same as the filename of colour list file
  "country": "US",
  // ISO 3166-1 alpha-2 code (for cities in Britain, append BS 6879 code)
  "name": {
    "en": "San Francisco",
    "zh-Hans": "旧金山",
    "zh-Hant": "三藩市"
    // Merge country variants if applicable
  }
}
```

A typical example of an entry of `guangzhou.json`:

```JSON
{
  "id": "gz3",
  "name": {
    "en": "Line 3",
    "zh-Hans": "3号线",
    "zh-Hant": "3號線"
  },
  "colour": "#ECA154",
  "fg": "#000"
  // Optional if foreground colour is white
}
```

### Reference

| City             | Reference                                                                                                                                                                                                                                                                                                                                                                  |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Baku             | [Wikipedia](https://en.wikipedia.org/wiki/Baku_Metro), [Official website](http://www.metro.gov.az/en/about/downloads)                                                                                                                                                                                                                                                      |
| Barcelona        | [All colours](https://www.tmb.cat/en/barcelona-transport/map), [except R8](https://www.fgc.cat/en/fgc-network/)                                                                                                                                                                                                                                                            |
| Budapest         | [Wikipedia](https://en.wikipedia.org/wiki/Budapest_Metro), [Official website](https://bkk.hu/)                                                                                                                                                                                                                                                                             |
| Bucharest        | [Wikipedia](http://en.wikipedia.org/wiki/Bucharest_Metro), [Official website](http://www.metrorex.ro/prima_pagina_p1352-1)                                                                                                                                                                                                                                                 |
| Cairo            | [Wikipedia](https://en.wikipedia.org/wiki/Cairo_Metro), [Official website](https://cairometro.gov.eg/ar)                                                                                                                                                                                                                                                                   |
| Changsha         | [【持续更新】【小玩具】铁路线路图生成器综合讨论帖-站前广场-地铁族](http://www.ditiezu.com/forum.php?mod=redirect&goto=findpost&ptid=659763&pid=11416737)                                                                                                                                                                                                                                                  |
| Chengdu          | [2018.01.05 《成都市城市轨道交通线网导向系统设计导则》(报批稿) - 百度文库](https://wenku.baidu.com/view/a745419d64ce0508763231126edb6f1aff007137.html)                                                                                                                                                                                                                                                 |
| Daegu            | [Wikipedia](http://en.wikipedia.org/wiki/Daegu_Metropolitan_Subway), [Official website](https://dtro.or.kr/)                                                                                                                                                                                                                                                               |
| Dalian           | [Wikipedia](https://en.wikipedia.org/wiki/Dalian_Metro), [Official website](http://www.dlmetro.com/portal/indexShow.do)                                                                                                                                                                                                                                                    |
| Delhi            | [Wikipedia](https://en.wikipedia.org/wiki/Delhi_Metro), [Official website](http://www.delhimetrorail.com/)                                                                                                                                                                                                                                                                 |
| Dortmund         | [Wikipedia](https://de.wikipedia.org/wiki/Stadtbahn_Dortmund), [Official website](https://www.bus-und-bahn.de/download-center)                                                                                                                                                                                                                                             |
| Edinburgh        | [Lothian City Buses - Lothian Buses](https://www.lothianbuses.com/our-services/lothian-city-buses/)                                                                                                                                                                                                                                                                        |
| Eskişehir        | [Wikipedia](http://en.wikipedia.org/wiki/EsTram), [Official website](http://www.estram.com.tr/Anasayfa)                                                                                                                                                                                                                                                                    |
| Foshan           | [Template:佛山地铁颜色 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Template:佛山地铁颜色)                                                                                                                                                                                                                                                                                            |
| Guangzhou        | [不知道有没有火星。。-广 州 区-地铁族](http://www.ditiezu.com/forum.php?mod=viewthread&tid=523725), [Wikipedia](https://zh.wikipedia.org/wiki/Template:%E5%B9%BF%E5%B7%9E%E5%9C%B0%E9%93%81%E9%A2%9C%E8%89%B2)                                                                                                                                                                             |
| Hangzhou         | [【持续更新】【小玩具】铁路线路图生成器综合讨论帖-站前广场-地铁族](http://www.ditiezu.com/forum.php?mod=redirect&goto=findpost&ptid=659763&pid=11441466)                                                                                                                                                                                                                                                  |
| Harbin           | [Wikipedia](https://en.wikipedia.org/wiki/Harbin_Metro), [Official website](http://www.harbin-metro.com/index.html), [Data Source](http://bxt.harbin.gov.cn/hrb_bxt/disshow.php?id=772792)                                                                                                                                                                                 |
| Istanbul         | [Wikipedia](https://en.wikipedia.org/wiki/Istanbul_Metro), [Official website](https://www.metro.istanbul/)                                                                                                                                                                                                                                                                 |
| Kansai           | [JR West (Kansai area)](https://www.westjr.co.jp/global/tc/timetable/#routemaps)                                                                                                                                                                                                                                                                                           |
| Klang Valley     | [Wikipedia](https://en.wikipedia.org/wiki/Klang_Valley_Integrated_Transit_System), [Official website](https://myrapid.com.my/ms/)                                                                                                                                                                                                                                          |
| Lisbon           | [Wikipedia](https://pt.wikipedia.org/wiki/Metropolitano_de_Lisboa), [Official website](https://www.metrolisboa.pt/)                                                                                                                                                                                                                                                        |
| London           | [Colour standards - Transport for London](http://content.tfl.gov.uk/tfl-colour-standards-issue04.pdf)                                                                                                                                                                                                                                                                      |
| Madrid           | [Metro and Light Rail except ML4](https://www.metromadrid.es/es/viaja-en-metro/plano-de-metro-de-madrid), [Cercanías and ML4](https://www.crtm.es/atencion-al-cliente/area-de-descargas/planos.aspx)                                                                                                                                                                       |
| Nanjing          | [Template:南京地铁颜色 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Template:南京地铁颜色)                                                                                                                                                                                                                                                                                            |
| Osaka            | [Osaka Metro](https://www.osakametro.co.jp/index.php)                                                                                                                                                                                                                                                                                                                      |
| Oslo             | [Ruter](https://ruter.no/en/journey/route-maps/)                                                                                                                                                                                                                                                                                                                           |
| Paris            | [Map of the metro, RER, bus and tramway lines RATP](https://www.ratp.fr/en/plans)                                                                                                                                                                                                                                                                                          |
| Qingdao          | [青岛地铁 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/青岛地铁#识别色)                                                                                                                                                                                                                                                                                                              |
| Saint Petersburg | [Wikipedia](http://en.wikipedia.org/wiki/Saint_Petersburg_Metro), [Official website](http://www.metro.spb.ru/)                                                                                                                                                                                                                                                             |
| Santiago         | [Wikipedia](https://en.wikipedia.org/wiki/Santiago_Metro), [Official website](https://www.metro.cl/)                                                                                                                                                                                                                                                                       |
| SaoPaulo         | [申请提交圣保罗颜色](https://github.com/wongchito/RailMapGenerator/issues/142), [圣保罗地铁官方网址](www.metro.sp.gov.br), [圣保罗都市圈铁道官方网址](https://www.cptm.sp.gov.br), [圣保罗地铁6号线（工程官方网址）](https://www.linhauni.com.br/)                                                                                                                                                                      |
| Shanghai         | [《上海轨道交通网络近期规划建设线路标志色方案》征求市民意见公告 - 上海地铁](http://www.shmetro.com/node49/201109/con109210.htm), [模块:RailSystems/SHMetro - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/模块:RailSystems/SHMetro)                                                                                                                                                                                |
| Shenzhen         | [道路交通管理设施设置技术标准 第 5 部分: 交通枢纽客运服务标志（征求意见稿）](http://www.sz.gov.cn/cn/xxgk/zfxxgj/tzgg/201104/P020110425642051308137.pdf) <br> [Template:深圳地铁颜色 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Template:深圳地铁颜色)                                                                                                                                                                |
| Singapore        | [LTA](https://www.lta.gov.sg/content/ltagov/en/getting_around/public_transport/rail_network.html)                                                                                                                                                                                                                                                                          |
| Stockholm        | [SL](https://sl.se/en/getting-around/)                                                                                                                                                                                                                                                                                                                                     |
| Suzhou           | [Wikipedia](https://en.wikipedia.org/wiki/Suzhou_Subway), [Official website](http://www.sz-mtr.com/)                                                                                                                                                                                                                                                                       |
| Tehran           | [Wikipedia](https://en.wikipedia.org/wiki/Tehran_Metro), [Official website](https://metro.tehran.ir/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%A8%D9%87%D8%B1%D9%87-%D8%A8%D8%B1%D8%AF%D8%A7%D8%B1%DB%8C/%D8%B2%D9%85%D8%A7%D9%86%D8%A8%D9%86%D8%AF%DB%8C-%D8%AD%D8%B1%DA%A9%D8%AA-%D9%88-%D9%86%D9%82%D8%B4%D9%87-%D9%87%D8%A7/%D9%86%D9%82%D8%B4%D9%87-%D9%85%D8%AA%D8%B1%D9%88) |
| Tianjin          | [Template:天津轨道交通颜色 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Template:天津轨道交通颜色)                                                                                                                                                                                                                                                                                        |
| Toronto          | [Signage Manual and Standards - Toronto Transit Commission](https://joeclark.org/design/signage/TTC/2015/TTCWayfindingStandardsManual_201409.pdf)                                                                                                                                                                                                                          |
| Tyne and Wear    | [Nexus](https://www.nexus.org.uk/metro)                                                                                                                                                                                                                                                                                                                                    |
| Vienna           | [Wikipedia](https://de.wikipedia.org/wiki/U-Bahn_Wien), [Official website](https://www.wienerlinien.at/)                                                                                                                                                                                                                                                                   |
| Wuxi             | [Wikipedia](https://en.wikipedia.org/wiki/Wuxi_Metro), [Official website](http://www.wxmetro.net/)                                                                                                                                                                                                                                                                         |
| Xiamen           | [Wikipedia](https://en.wikipedia.org/wiki/Xiamen_Metro), [Official website](https://www.xmgdjt.com.cn/Modules/ControlHtml/MetroOperation.aspx?SelectedTitle=%E7%AB%99%E7%82%B9%E7%BA%BF%E8%B7%AF)                                                                                                                                                                          |
| Xian             | [Line 1-6, 9](http://www.ditiezu.com/thread-668313-1-1.html), [Line 14](http://www.ditiezu.com/thread-668349-1-1.html), [Line 8, 11](https://zh.wikipedia.org/wiki/Template:西安地铁颜色)                                                                                                                                                                                   |
| Zhengzhou        | [Wikipedia](https://en.wikipedia.org/wiki/Zhengzhou_Metro), [Official website](https://www.zzmetro.com/)                                                                                                                                                                                                                                                                   |
| Shenyang         | [Wikipedia](https://en.wikipedia.org/wiki/Shenyang_Metro), [Official website](http://www.symtc.com/)                                                                                                                                                                                                                                                                       |

#### Notes

- Hexachrome Green C for Line 4 of Chengdu not found.
- 267C for Line 3 of Changsha is incorrect.
