import{c as L,a as J,n as H,b as Y,u as $,d as X,R as q,i as y,e as Q,r as N,L as m,f as C,j as S,g as nn,h as u,H as an,k as en,l as tn,M as sn,m as rn,I as on,o as hn,p as ln,q as v,s as k,B as un,t as gn,v as cn,w as _,x as b,y as R,z as mn,P as En,C as zn,A as dn,D as Hn}from"./vendor-7efc7042.js";function ga(){import.meta.url,import("_").catch(()=>1);async function*n(){}}(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))h(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const g of o.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&h(g)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function h(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const Nn={selectedCountry:""},O=L({name:"app",initialState:Nn,reducers:{setSelectedCountry:(n,i)=>{n.selectedCountry=i.payload}}}),{setSelectedCountry:ma}=O.actions,fn=O.reducer;var t;(function(n){n.Azerbaijani="az",n.Arabic="ar",n.Catalan="ca",n.Chinese="zh",n.ChineseCN="zh-CN",n.ChineseSimp="zh-Hans",n.ChineseTrad="zh-Hant",n.ChineseHK="zh-HK",n.ChineseTW="zh-TW",n.Danish="da",n.English="en",n.French="fr",n.Gaelic="ga",n.German="de",n.Greek="el",n.Hindi="hi",n.Hungarian="hu",n.Indonesian="id",n.Italian="it",n.Japanese="ja",n.Korean="ko",n.Malay="ms",n.Norwegian="no",n.Persian="fa",n.Polish="pl",n.Portuguese="pt",n.Romanian="ro",n.Russian="ru",n.Spanish="es",n.Swedish="sv",n.Thai="th",n.Turkish="tr",n.Uzbek="uz",n.Vietnamese="vn"})(t||(t={}));var D;(function(n){n.black="#000",n.white="#fff"})(D||(D={}));var e;(function(n){n.Ankara="ankara",n.Athens="athens",n.Baku="baku",n.Bangkok="bangkok",n.Barcelona="barcelona",n.Beijing="beijing",n.Berlin="berlin",n.Bonn="bonn",n.Boston="boston",n.Brussels="brussels",n.Bucharest="bucharest",n.Budapest="budapest",n.Busan="busan",n.Cairo="cairo",n.Caracas="caracas",n.Changchun="changchun",n.Changsha="changsha",n.Chengdu="chengdu",n.Chongqing="chongqing",n.Cochabamba="cochabamba",n.Cologne="cologne",n.Copenhagen="copenhagen",n.Daegu="daegu",n.Dalian="dalian",n.Delhi="delhi",n.Dongguan="dongguan",n.Dortmund="dortmund",n.Edinburgh="edinburgh",n.Eskisehir="eskisehir",n.Foshan="foshan",n.Frankfurt="frankfurt",n.Glasgow="glasgow",n.Gothenburg="gothenburg",n.Guadalajara="guadalajara",n.Guangzhou="guangzhou",n.Hamburg="hamburg",n.Hangzhou="hangzhou",n.Hanoi="hanoi",n.Harbin="harbin",n.Hefei="hefei",n.Hiroshima="hiroshima",n.Hochiminh="hochiminh",n.Hongkong="hongkong",n.Iashi="iashi",n.Istanbul="istanbul",n.Jakarta="jakarta",n.Jinan="jinan",n.Kansai="kansai",n.Kaohsiung="kaohsiung",n.Kharkiv="kharkiv",n.Klangvalley="klangvalley",n.Kunming="kunming",n.Lima="lima",n.Lisbon="lisbon",n.London="london",n.Luoyang="luoyang",n.Macao="macao",n.Madrid="madrid",n.Manchester="manchester",n.Milan="milan",n.Monterrey="monterrey",n.Montreal="montreal",n.Munich="munich",n.Nanjing="nanjing",n.Nanning="nanning",n.Naples="naples",n.Neworleans="neworleans",n.Newtaipei="newtaipei",n.Newyork="newyork",n.Ningbo="ningbo",n.Osaka="osaka",n.Oslo="oslo",n.Other="other",n.Ottawa="ottawa",n.Paris="paris",n.Qingdao="qingdao",n.Rheinruhr="rheinruhr",n.Rio="rio",n.Riyadh="riyadh",n.Sanfrancisco="sanfrancisco",n.Sanktpeterburg="sanktpeterburg",n.Santiago="santiago",n.Saopaulo="saopaulo",n.Seoul="seoul",n.Sevilla="sevilla",n.Shanghai="shanghai",n.Shaoxing="shaoxing",n.Shenyang="shenyang",n.Shenzhen="shenzhen",n.Singapore="singapore",n.Stockholm="stockholm",n.Suzhou="suzhou",n.Taichung="taichung",n.Taipei="taipei",n.Taiyuan="taiyuan",n.Taoyuan="taoyuan",n.Tashkent="tashkent",n.Tehran="tehran",n.Tianjin="tianjin",n.Tokyo="tokyo",n.Toronto="toronto",n.Tyneandwear="tyneandwear",n.Vienna="vienna",n.Warsaw="warsaw",n.Wuhan="wuhan",n.Wuxi="wuxi",n.Xiamen="xiamen",n.Xian="xian",n.Yevpatoria="yevpatoria",n.Yokohama="yokohama",n.Zhengzhou="zhengzhou"})(e||(e={}));var a;(function(n){n.AT="AT",n.AZ="AZ",n.BE="BE",n.BO="BO",n.BR="BR",n.CA="CA",n.CL="CL",n.CN="CN",n.DE="DE",n.DK="DK",n.EG="EG",n.ES="ES",n.FR="FR",n.GBENG="GBENG",n.GBSCT="GBSCT",n.GR="GR",n.HK="HK",n.HU="HU",n.ID="ID",n.IN="IN",n.IR="IR",n.IT="IT",n.JP="JP",n.KR="KR",n.MO="MO",n.MX="MX",n.MY="MY",n.NO="NO",n.PE="PE",n.PL="PL",n.PT="PT",n.RO="RO",n.RU="RU",n.SA="SA",n.SE="SE",n.SG="SG",n.TH="TH",n.TR="TR",n.TW="TW",n.UA="UA",n.UN="UN",n.US="US",n.UZ="UZ",n.VE="VE",n.VN="VN"})(a||(a={}));const Ea=[{id:e.Ankara,country:a.TR,name:{en:"Ankara",tr:"Ankara",zh:"安卡拉"}},{id:e.Athens,country:a.GR,name:{el:"Αθήνα",en:"Athens",zh:"雅典"}},{id:e.Baku,country:a.AZ,name:{en:"Baku",az:"Bakı","zh-Hans":"巴库","zh-Hant":"巴庫"}},{id:e.Bangkok,country:a.TH,name:{en:"Bangkok","zh-Hans":"曼谷","zh-Hant":"曼谷"}},{id:e.Barcelona,country:a.ES,name:{en:"Barcelona",es:"Barcelona","zh-Hans":"巴塞罗那","zh-HK":"巴塞隆拿","zh-TW":"巴塞隆納"}},{id:e.Beijing,country:a.CN,name:{en:"Beijing",zh:"北京"}},{id:e.Berlin,country:a.DE,name:{de:"Berlin",en:"Berlin",zh:"柏林"}},{id:e.Bonn,country:a.DE,name:{en:"Bonn",de:"Bonn",zh:"波恩"}},{id:e.Boston,country:a.US,name:{en:"Boston","zh-Hans":"波士顿","zh-Hant":"波士頓"}},{id:e.Brussels,country:a.BE,name:{en:"Brussels",fr:"Bruxelles","zh-Hans":"布鲁塞尔","zh-Hant":"布魯塞爾"}},{id:e.Bucharest,country:a.RO,name:{en:"Bucharest",ro:"București",zh:"布加勒斯特"}},{id:e.Budapest,country:a.HU,name:{en:"Budapest",hu:"Budapest","zh-Hans":"布达佩斯","zh-Hant":"布達佩斯"}},{id:e.Busan,country:a.KR,name:{en:"Busan",ko:"부산",zh:"釜山"}},{id:e.Cairo,country:a.EG,name:{en:"Cairo (Greater Cairo Area)",ar:"القاهرة (منطقة القاهرة الكبرى)","zh-Hans":"开罗（大开罗地区）","zh-Hant":"開羅（大開羅地區）"}},{id:e.Caracas,country:a.VE,name:{en:"Caracas",es:"Caracas",zh:"加拉加斯"}},{id:e.Changchun,country:a.CN,name:{en:"Changchun","zh-Hans":"长春","zh-Hant":"長春"}},{id:e.Changsha,country:a.CN,name:{en:"Changsha","zh-Hans":"长沙","zh-Hant":"長沙"}},{id:e.Chengdu,country:a.CN,name:{en:"Chengdu",zh:"成都"}},{id:e.Chongqing,country:a.CN,name:{en:"Chongqing","zh-Hans":"重庆","zh-Hant":"重慶"}},{id:e.Cochabamba,country:a.BO,name:{es:"Cochabamba",zh:"科恰班巴",en:"Cochabamba"}},{id:e.Cologne,country:a.DE,name:{en:"Cologne",de:"Köln",zh:"科隆"}},{id:e.Copenhagen,country:a.DK,name:{en:"Copenhagen",zh:"哥本哈根"}},{id:e.Daegu,country:a.KR,name:{en:"Daegu",ko:"대구",zh:"大邱"}},{id:e.Dalian,country:a.CN,name:{en:"Dalian","zh-Hans":"大连","zh-Hant":"大連"}},{id:e.Delhi,country:a.IN,name:{en:"Delhi",hi:"दिल्ली",zh:"德里"}},{id:e.Dongguan,country:a.CN,name:{en:"Dongguan","zh-Hans":"东莞","zh-Hant":"東莞"}},{id:e.Dortmund,country:a.DE,name:{en:"Dortmund",de:"Dortmund",zh:"多特蒙德"}},{id:e.Edinburgh,country:a.GBSCT,name:{en:"Edinburgh",ga:"Dùn Èideann","zh-Hans":"爱丁堡","zh-Hant":"愛丁堡"}},{id:e.Eskisehir,country:a.TR,name:{en:"Eskişehir",tr:"Eskişehir","zh-Hans":"埃斯基谢希尔","zh-Hant":"埃斯基謝希爾"}},{id:e.Foshan,country:a.CN,name:{en:"Foshan",zh:"佛山"}},{id:e.Frankfurt,country:a.DE,name:{de:"Frankfurt am Main",en:"Frankfurt am Main","zh-Hans":"美茵河畔法兰克福","zh-Hant":"美茵河畔法蘭克福"}},{id:e.Glasgow,country:a.GBSCT,name:{en:"Glasgow",ga:"Glaschu",zh:"格拉斯哥"}},{id:e.Gothenburg,country:a.SE,name:{en:"Gothenburg",es:"Göteborg",zh:"哥德堡"}},{id:e.Guadalajara,country:a.MX,name:{en:"Guadalajara",es:"Guadalajara","zh-Hans":"瓜达拉哈拉","zh-Hant":"瓜達拉哈拉"}},{id:e.Guangzhou,country:a.CN,name:{en:"Guangzhou","zh-Hans":"广州","zh-Hant":"廣州"}},{id:e.Hamburg,country:a.DE,name:{en:"Hamburg",de:"Hamburg","zh-Hans":"汉堡","zh-Hant":"漢堡"}},{id:e.Hangzhou,country:a.CN,name:{en:"Hangzhou",zh:"杭州"}},{id:e.Hanoi,country:a.VN,name:{en:"Hanoi",vn:"Hà Nội","zh-Hans":"河内","zh-Hant":"河內"}},{id:e.Harbin,country:a.CN,name:{en:"Harbin","zh-Hans":"哈尔滨","zh-Hant":"哈爾濱"}},{id:e.Hefei,country:a.CN,name:{zh:"合肥",en:"Hefei"}},{id:e.Hiroshima,country:a.JP,name:{en:"Hiroshima","zh-Hans":"广岛","zh-Hant":"廣島",ja:"広島"}},{id:e.Hochiminh,country:a.VN,name:{en:"Ho Chi Minh City",vn:"Thành phố Hồ Chí Minh",zh:"胡志明市"}},{id:e.Hongkong,country:a.HK,name:{en:"Hong Kong",zh:"香港"}},{id:e.Iashi,country:a.RO,name:{en:"Iași",ro:"Iași",zh:"雅西"}},{id:e.Istanbul,country:a.TR,name:{en:"Istanbul",tr:"İstanbul","zh-Hans":"伊斯坦布尔","zh-Hant":"伊斯坦堡"}},{id:e.Jakarta,country:a.ID,name:{en:"Jakarta",id:"Jakarta","zh-Hans":"雅加达","zh-Hant":"雅加達"}},{id:e.Jinan,country:a.CN,name:{en:"Jinan","zh-Hans":"济南","zh-Hant":"濟南"}},{id:e.Kansai,country:a.JP,name:{en:"Kansai Area",ja:"近畿地方","zh-Hans":"近畿地方（关西地方）","zh-Hant":"近畿地方（關西地方）"}},{id:e.Kaohsiung,country:a.TW,name:{en:"Kaohsiung",zh:"高雄"}},{id:e.Kharkiv,country:a.UA,name:{en:"Kharkiv","zh-Hans":"哈尔科夫","zh-Hant":"哈爾科夫"}},{id:e.Klangvalley,country:a.MY,name:{en:"Greater KL/Klang Valley",ms:"Kuala Lumpur Raya/Lembah Klang",zh:"大吉隆坡/巴生谷"}},{id:e.Kunming,country:a.CN,name:{en:"Kunming",zh:"昆明"}},{id:e.Lima,country:a.PE,name:{en:"Lima",es:"Lima","zh-Hans":"利马","zh-Hant":"利馬"}},{id:e.Lisbon,country:a.PT,name:{en:"Lisbon",pt:"Lisboa",zh:"里斯本"}},{id:e.London,country:a.GBENG,name:{en:"London","zh-Hans":"伦敦","zh-Hant":"倫敦"}},{id:e.Luoyang,country:a.CN,name:{en:"Luoyang","zh-Hans":"洛阳","zh-Hant":"洛陽"}},{id:e.Macao,country:a.MO,name:{en:"Macao",pt:"Macau","zh-Hans":"澳门","zh-Hant":"澳門"}},{id:e.Madrid,country:a.ES,name:{en:"Madrid","zh-Hans":"马德里","zh-Hant":"馬德里"}},{id:e.Manchester,country:a.GBENG,name:{en:"Manchester","zh-Hans":"曼彻斯特","zh-Hant":"曼徹斯特"}},{id:e.Milan,country:a.IT,name:{en:"Milan",it:"Milano","zh-Hans":"米兰","zh-Hant":"米蘭"}},{id:e.Monterrey,country:a.MX,name:{es:"Monterrey",zh:"蒙特雷",en:"Monterrey"}},{id:e.Montreal,country:a.CA,name:{en:"Montreal",fr:"Montréal","zh-Hans":"蒙特利尔","zh-HK":"滿地可","zh-TW":"蒙特婁"}},{id:e.Munich,country:a.DE,name:{de:"München",en:"Munich",zh:"慕尼黑"}},{id:e.Nanjing,country:a.CN,name:{en:"Nanjing",zh:"南京"}},{id:e.Nanning,country:a.CN,name:{en:"Nanning","zh-Hans":"南宁","zh-Hant":"南寧"}},{id:e.Naples,country:a.IT,name:{en:"Naples",it:"Napoli","zh-Hans":"那不勒斯","zh-HK":"拿坡利","zh-TW":"拿坡里"}},{id:e.Neworleans,country:a.US,name:{en:"New Orleans","zh-Hans":"新奥尔良","zh-Hant":"新奧爾良"}},{id:e.Newtaipei,country:a.TW,name:{en:"New Taipei",zh:"新北"}},{id:e.Newyork,country:a.US,name:{en:"New York","zh-Hans":"纽约","zh-Hant":"紐約"}},{id:e.Ningbo,country:a.CN,name:{en:"Ningbo","zh-Hans":"宁波","zh-Hant":"寧波"}},{id:e.Osaka,country:a.JP,name:{en:"Osaka",ja:"大阪",zh:"大阪"}},{id:e.Oslo,country:a.NO,name:{en:"Oslo","zh-Hans":"奥斯陆","zh-Hant":"奧斯陸"}},{id:e.Other,country:a.UN,name:{en:"Customise","zh-Hans":"自定义","zh-Hant":"自訂"}},{id:e.Ottawa,country:a.CA,name:{en:"Ottawa",fr:"Ottawa","zh-Hans":"渥太华","zh-Hant":"渥太華"}},{id:e.Paris,country:a.FR,name:{en:"Paris",zh:"巴黎"}},{id:e.Qingdao,country:a.CN,name:{en:"Qingdao","zh-Hans":"青岛","zh-Hant":"青島"}},{id:e.Rheinruhr,country:a.DE,name:{de:"Metropolregion Rhein-Ruhr",en:"Rhein-Ruhr Metropolitan Region","zh-Hans":"莱茵-鲁尔都会区","zh-Hant":"萊茵-魯爾都會區"}},{id:e.Rio,country:a.BR,name:{en:"Rio de Janeiro",pt:"Rio de Janeiro","zh-Hans":"里约热内卢","zh-Hant":"里約熱內盧"}},{id:e.Riyadh,country:a.SA,name:{en:"Riyadh",ar:"الرياض","zh-Hans":"利雅得","zh-Hant":"利雅德"}},{id:e.Sanfrancisco,country:a.US,name:{en:"San Francisco","zh-Hans":"旧金山","zh-HK":"三藩市","zh-TW":"舊金山"}},{id:e.Sanktpeterburg,country:a.RU,name:{en:"Sankt Peterburg",ru:"Санкт-Петербург","zh-Hans":"圣彼得堡","zh-Hant":"聖彼得堡"}},{id:e.Santiago,country:a.CL,name:{en:"Santiago",es:"Santiago","zh-Hans":"圣地亚哥","zh-Hant":"聖地亞哥 "}},{id:e.Saopaulo,country:a.BR,name:{en:"Sao Paulo",pt:"São Paulo","zh-Hans":"圣保罗","zh-Hant":"聖保羅"}},{id:e.Seoul,country:a.KR,name:{en:"Seoul (Metropolitan Area)",ko:"서울(수도권)","zh-Hans":"首尔（首都圈）","zh-Hant":"首爾（首都圈）"}},{id:e.Sevilla,country:a.ES,name:{es:"Sevilla",en:"Seville"}},{id:e.Shanghai,country:a.CN,name:{en:"Shanghai",zh:"上海"}},{id:e.Shaoxing,country:a.CN,name:{en:"Shaoxing","zh-Hans":"绍兴","zh-Hant":"紹興"}},{id:e.Shenyang,country:a.CN,name:{en:"Shenyang","zh-Hans":"沈阳","zh-Hant":"瀋陽"}},{id:e.Shenzhen,country:a.CN,name:{en:"Shenzhen",zh:"深圳"}},{id:e.Singapore,country:a.SG,name:{en:"Singapore",zh:"新加坡"}},{id:e.Stockholm,country:a.SE,name:{en:"Stockholm","zh-Hans":"斯德哥尔摩","zh-Hant":"斯德哥爾摩"}},{id:e.Suzhou,country:a.CN,name:{en:"Suzhou","zh-Hans":"苏州","zh-Hant":"蘇州"}},{id:e.Taichung,country:a.TW,name:{en:"Taichung",zh:"台中"}},{id:e.Taipei,country:a.TW,name:{en:"Taipei",zh:"台北"}},{id:e.Taiyuan,country:a.CN,name:{en:"Taiyuan","zh-Hans":"太原"}},{id:e.Taoyuan,country:a.TW,name:{en:"Taoyuan","zh-TW":"桃園","zh-CN":"桃园","zh-HK":"桃園"}},{id:e.Tashkent,country:a.UZ,name:{en:"Tashkent",zh:"塔什干"}},{id:e.Tehran,country:a.IR,name:{en:"Tehran",fa:"تهران‎","zh-Hans":"德黑兰","zh-Hant":"德黑蘭"}},{id:e.Tianjin,country:a.CN,name:{en:"Tianjin",zh:"天津"}},{id:e.Tokyo,country:a.JP,name:{en:"Tokyo (Greater Tokyo Area)",ja:"東京（首都圏）","zh-Hans":"东京（首都圈）","zh-Hant":"東京（首都圈）"}},{id:e.Toronto,country:a.CA,name:{en:"Toronto (Greater Toronto and Hamilton Area)",fr:"Toronto (Région du Grand Toronto et de Hamilton)","zh-Hans":"多伦多（大多伦多及汉密尔顿地区）","zh-HK":"多倫多（大多倫多暨咸美頓地區）","zh-TW":"多倫多（大多倫多暨哈密爾頓地區）"}},{id:e.Tyneandwear,country:a.GBENG,name:{en:"Tyne and Wear","zh-Hans":"泰恩-威尔","zh-HK":"泰威","zh-TW":"泰恩-威爾"}},{id:e.Vienna,country:a.AT,name:{en:"Vienna",de:"Wien","zh-Hans":"维也纳","zh-Hant":"維也納"}},{id:e.Warsaw,country:a.PL,name:{en:"Warsaw",pl:"Warszawa","zh-Hans":"华沙","zh-Hant":"華沙"}},{id:e.Wuhan,country:a.CN,name:{en:"Wuhan","zh-Hans":"武汉","zh-Hant":"武漢"}},{id:e.Wuxi,country:a.CN,name:{en:"Wuxi","zh-Hans":"无锡","zh-Hant":"無錫"}},{id:e.Xiamen,country:a.CN,name:{en:"Xiamen","zh-Hans":"厦门","zh-Hant":"廈門"}},{id:e.Xian,country:a.CN,name:{en:"Xi'an",zh:"西安"}},{id:e.Yevpatoria,country:a.UA,name:{en:"Yevpatoria","zh-Hans":"叶夫帕托里亚","zh-Hant":"葉夫帕托里亞"}},{id:e.Yokohama,country:a.JP,name:{en:"Yokohama",ja:"横浜","zh-Hans":"横滨","zh-Hant":"橫濱"}},{id:e.Zhengzhou,country:a.CN,name:{en:"Zhengzhou","zh-Hans":"郑州","zh-Hant":"鄭州"}}],P=[{id:a.AT,name:{en:"Austria",de:"Österreich","zh-Hans":"奥地利","zh-Hant":"奧地利"},language:t.German,flagEmoji:"🇦🇹",flagSvg:"1F1E6-1F1F9.svg"},{id:a.AZ,name:{en:"Azerbaijan",az:"Azərbaycan","zh-Hans":"阿塞拜疆","zh-HK":"阿塞拜疆","zh-TW":"亞塞拜然"},language:t.Azerbaijani,flagEmoji:"🇦🇿",flagSvg:"1F1E6-1F1FF.svg"},{id:a.BE,name:{en:"Belgium",fr:"Belgique","zh-Hans":"比利时","zh-Hant":"比利時"},language:t.French,flagEmoji:"🇧🇪",flagSvg:"1F1E7-1F1EA.svg"},{id:a.BO,name:{en:"Bolivia","zh-Hans":"玻利维亚","zh-Hant":"玻利維亞",es:"Bolivia"},language:t.Spanish,flagEmoji:"🇧🇴",flagSvg:"1F1E7-1F1F4.svg"},{id:a.BR,name:{en:"Brazil",pt:"Brasil",zh:"巴西"},language:t.Portuguese,flagEmoji:"🇧🇷",flagSvg:"1F1E7-1F1F7.svg"},{id:a.CA,name:{en:"Canada",fr:"Canada",zh:"加拿大"},language:t.English,flagEmoji:"🇨🇦",flagSvg:"1F1E8-1F1E6.svg"},{id:a.CL,name:{en:"Chile",es:"Chile",zh:"智利"},language:t.Spanish,flagEmoji:"🇨🇱",flagSvg:"1F1E8-1F1F1.svg"},{id:a.CN,name:{en:"China","zh-Hans":"中国","zh-Hant":"中國"},language:t.ChineseSimp,flagEmoji:"🇨🇳",flagSvg:"1F1E8-1F1F3.svg"},{id:a.DE,name:{en:"Germany",de:"Deutsche","zh-Hans":"德国","zh-Hant":"德國"},language:t.German,flagEmoji:"🇩🇪",flagSvg:"1F1E9-1F1EA.svg"},{id:a.DK,name:{en:"Denmark",da:"Danmark","zh-Hans":"丹麦","zh-Hant":"丹麥"},language:t.Danish,flagEmoji:"🇩🇰",flagSvg:"1F1E9-1F1F0.svg"},{id:a.EG,name:{en:"Egypt",ar:"مِصر",zh:"埃及"},language:t.Arabic,flagEmoji:"🇪🇬",flagSvg:"1F1EA-1F1EC.svg"},{id:a.ES,name:{en:"Spain",es:"España",zh:"西班牙"},language:t.Spanish,flagEmoji:"🇪🇸",flagSvg:"1F1EA-1F1F8.svg"},{id:a.FR,name:{en:"France",fr:"France","zh-Hans":"法国","zh-Hant":"法國"},language:t.French,flagEmoji:"🇫🇷",flagSvg:"1F1EB-1F1F7.svg"},{id:a.GBENG,name:{en:"England","zh-Hans":"英格兰","zh-Hant":"英格蘭"},language:t.English,flagEmoji:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",flagSvg:"1F3F4-E0067-E0062-E0065-E006E-E0067-E007F.svg"},{id:a.GBSCT,name:{en:"Scotland",ga:"Alba","zh-Hans":"苏格兰","zh-Hant":"蘇格蘭"},language:t.English,flagEmoji:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",flagSvg:"1F3F4-E0067-E0062-E0073-E0063-E0074-E007F.svg"},{id:a.GR,name:{en:"Greece",el:"Ελλάδα","zh-Hans":"希腊","zh-Hant":"希臘"},language:t.Greek,flagEmoji:"🇬🇷",flagSvg:"1F1EC-1F1F7.svg"},{id:a.HK,name:{en:"Hong Kong",zh:"香港"},language:t.ChineseHK,flagEmoji:"🇭🇰",flagSvg:"1F1ED-1F1F0.svg"},{id:a.HU,name:{en:"Hungary",hu:"Magyarország",zh:"匈牙利"},language:t.Hungarian,flagEmoji:"🇭🇺",flagSvg:"1F1ED-1F1FA.svg"},{id:a.ID,name:{en:"Indonesia",id:"Indonesia","zh-Hans":"印度尼西亚","zh-Hant":"印度尼西亞"},language:t.Indonesian,flagEmoji:"🇮🇩",flagSvg:"1F1EE-1F1E9.svg"},{id:a.IN,name:{en:"India",hi:"भारत",zh:"印度"},language:t.Hindi,flagEmoji:"🇮🇳",flagSvg:"1F1EE-1F1F3.svg"},{id:a.IR,name:{en:"Iran",fa:"ایران",zh:"伊朗"},language:t.Persian,flagEmoji:"🇮🇷",flagSvg:"1F1EE-1F1F7.svg"},{id:a.IT,name:{en:"Italy",it:"Italia","zh-Hans":"意大利","zh-HK":"意大利","zh-TW":"義大利"},language:t.Italian,flagEmoji:"🇮🇹",flagSvg:"1F1EE-1F1F9.svg"},{id:a.JP,name:{en:"Japan",ja:"日本",zh:"日本"},language:t.Japanese,flagEmoji:"🇯🇵",flagSvg:"1F1EF-1F1F5.svg"},{id:a.KR,name:{en:"South Korea",ko:"대한민국","zh-Hans":"韩国","zh-Hant":"南韓"},language:t.Korean,flagEmoji:"🇰🇷",flagSvg:"1F1F0-1F1F7.svg"},{id:a.MO,name:{en:"Macao",pt:"Macau","zh-Hans":"澳门","zh-Hant":"澳門"},language:t.ChineseHK,flagEmoji:"🇲🇴",flagSvg:"1F1F2-1F1F4.svg"},{id:a.MX,name:{en:"Mexico",es:"México",zh:"墨西哥"},language:t.Spanish,flagEmoji:"🇲🇽",flagSvg:"1F1F2-1F1FD.svg"},{id:a.MY,name:{en:"Malaysia",ms:"Malaysia","zh-Hans":"马来西亚","zh-Hant":"馬來西亞"},language:t.Malay,flagEmoji:"🇲🇾",flagSvg:"1F1F2-1F1FE.svg"},{id:a.NO,name:{en:"Norway",no:"Norge",zh:"挪威"},language:t.Norwegian,flagEmoji:"🇳🇴",flagSvg:"1F1F3-1F1F4.svg"},{id:a.PE,name:{en:"Peru",es:"Perú","zh-Hans":"秘鲁","zh-Hant":"秘魯"},language:t.Spanish,flagEmoji:"🇵🇪",flagSvg:"1F1F5-1F1EA.svg"},{id:a.PL,name:{en:"Poland",pl:"Polska","zh-Hans":"波兰","zh-Hant":"波蘭"},language:t.Polish,flagEmoji:"🇵🇱",flagSvg:"1F1F5-1F1F1.svg"},{id:a.PT,name:{en:"Portugal",pt:"Portugal",zh:"葡萄牙"},language:t.Portuguese,flagEmoji:"🇵🇹",flagSvg:"1F1F5-1F1F9.svg"},{id:a.RO,name:{en:"Romania",ro:"România","zh-Hans":"罗马尼亚","zh-Hant":"羅馬尼亞"},language:t.Romanian,flagEmoji:"🇷🇴",flagSvg:"1F1F7-1F1F4.svg"},{id:a.RU,name:{en:"Russia",ru:"Россия","zh-Hans":"俄罗斯","zh-Hant":"俄羅斯"},language:t.Russian,flagEmoji:"🇷🇺",flagSvg:"1F1F7-1F1FA.svg"},{id:a.SA,name:{en:"Saudi Arabia",ar:"المملكة العربية السعودية","zh-Hans":"沙特阿拉伯","zh-HK":"沙地阿拉伯","zh-TW":"沙烏地阿拉伯"},language:t.Arabic,flagEmoji:"🇸🇦",flagSvg:"1F1F8-1F1E6.svg"},{id:a.SE,name:{en:"Sweden",sv:"Sverige",zh:"瑞典"},language:t.Swedish,flagEmoji:"🇸🇪",flagSvg:"1F1F8-1F1EA.svg"},{id:a.SG,name:{en:"Singapore",ms:"Singapura",zh:"新加坡"},language:t.English,flagEmoji:"🇸🇬",flagSvg:"1F1F8-1F1EC.svg"},{id:a.TH,name:{en:"Thailand",th:"ราชอาณาจักรไทย","zh-Hans":"泰国","zh-Hant":"泰國"},language:t.Thai,flagEmoji:"🇹🇭",flagSvg:"1F1F9-1F1ED.svg"},{id:a.TR,name:{en:"Turkey",tr:"Türkiye",zh:"土耳其"},language:t.Turkish,flagEmoji:"🇹🇷",flagSvg:"1F1F9-1F1F7.svg"},{id:a.TW,name:{en:"Taiwan","zh-Hans":"台湾","zh-Hant":"台灣"},language:t.ChineseTW,flagEmoji:"🇹🇼",flagSvg:"1F1F9-1F1FC.svg"},{id:a.UA,name:{en:"Ukraine","zh-Hans":"乌克兰","zh-Hant":"烏克蘭"},language:t.English,flagEmoji:"🇺🇦",flagSvg:"1F1FA-1F1E6.svg"},{id:a.UN,name:{en:"Customise","zh-Hans":"自定义","zh-Hant":"自訂"},flagEmoji:"🇺🇳",flagSvg:"1F1FA-1F1F3.svg",language:void 0},{id:a.US,name:{en:"United States","zh-Hans":"美国","zh-Hant":"美國"},language:t.English,flagEmoji:"🇺🇸",flagSvg:"1F1FA-1F1F8.svg"},{id:a.UZ,name:{en:"Uzbekistan",uz:"O'zbekiston","zh-Hans":"乌兹别克斯坦","zh-Hant":"烏茲別克斯坦"},language:t.Uzbek,flagEmoji:"🇺🇿",flagSvg:"1F1FA-1F1FF.svg"},{id:a.VE,name:{en:"Venezuela",zh:"委内瑞拉"},flagEmoji:"🇻🇪",flagSvg:"1F1FB-1F1EA.svg",language:void 0},{id:a.VN,name:{en:"Vietnam",vn:"Việt Nam",zh:"越南"},language:t.Vietnamese,flagEmoji:"🇻🇳",flagSvg:"1F1FB-1F1F3.svg"}],za="**Do not edit lines below, they are meant for bots only!!!**",da=(n,i)=>{if(i!==null){const s=document.createElement("details");return s.setAttribute("repo","rmg-palette"),s.setAttribute("type",n),s.textContent=JSON.stringify(i,null,4),s.outerHTML}else return""};var p=(n=>(n.COUNTRY_CODE_UNDEFINED="COUNTRY_CODE_UNDEFINED",n.CITY_CODE_UNDEFINED="CITY_CODE_UNDEFINED",n.LINE_CODE_UNDEFINED="LINE_CODE_UNDEFINED",n.LINE_CODE_DUPLICATED="LINE_CODE_DUPLICATED",n))(p||{}),d=(n=>(n.EN_UNDEFINED="EN_UNDEFINED",n.ZH_UNDEFINED="ZH_UNDEFINED",n.ZH_HANS_UNDEFINED="ZH_HANS_UNDEFINED",n.ZH_HANT_UNDEFINED="ZH_HANT_UNDEFINED",n.ZH_HK_UNDEFINED="ZH_HK_UNDEFINED",n.ZH_TW_UNDEFINED="ZH_TW_UNDEFINED",n.ZH_VARIANTS_REDEFINED="ZH_VARIANTS_REDEFINED",n.LANGUAGE_DUPLICATED="LANGUAGE_DUPLICATED",n.OFFICAL_LANGUAGE_UNDEFINED="OFFICAL_LANGUAGE_UNDEFINED",n))(d||{});const Ha={COUNTRY_CODE_UNDEFINED:{en:"Country/region code is missing","zh-Hans":"缺少国家/地区代码","zh-Hant":"缺少國家/地區代碼"},CITY_CODE_UNDEFINED:{en:"City code is missing","zh-Hans":"缺少城市代码","zh-Hant":"缺少城市代碼"},LINE_CODE_UNDEFINED:{en:"At least one line code is missing","zh-Hans":"至少1条线路的代码缺失","zh-Hant":"至少1條路綫的代碼缺失"},LINE_CODE_DUPLICATED:{en:"Duplicated line code found","zh-Hans":"包含重复的线路代码","zh-Hant":"包含重複的路綫代碼"},EN_UNDEFINED:{en:"English name is missing","zh-Hans":"缺少英文名称","zh-Hant":"缺少英文名稱"},ZH_UNDEFINED:{en:"Chinese name is missing","zh-Hans":"缺少中文名称","zh-Hant":"缺少中文名稱"},ZH_HANS_UNDEFINED:{en:"Simplified Chinese name is missing","zh-Hans":"缺少简体中文名称","zh-Hant":"缺少簡體中文名稱"},ZH_HANT_UNDEFINED:{en:"Traditional Chinese name is missing","zh-Hans":"缺少繁体中文名称","zh-Hant":"缺少繁體中文名稱"},ZH_HK_UNDEFINED:{en:"Traditional Chinese (Hong Kong variant) name is missing","zh-Hans":"缺少繁体中文（香港变体）名称","zh-Hant":"缺少繁體中文（香港變體）名稱"},ZH_TW_UNDEFINED:{en:"Traditional Chinese (Taiwan variant) name is missing","zh-Hans":"缺少繁体中文（台湾变体）名称","zh-Hant":"缺少繁體中文（台灣變體）名稱"},ZH_VARIANTS_REDEFINED:{en:"Chinese variants are redefined","zh-Hans":"包含重复的中文变体","zh-Hant":"包含重複的中文變體"},LANGUAGE_DUPLICATED:{en:"Duplicated language found","zh-Hans":"包含重复的语言","zh-Hant":"包含重複的語言"},OFFICAL_LANGUAGE_UNDEFINED:{en:"Name in offcial language is missing","zh-Hans":"缺少官方语言名称","zh-Hant":"缺少官方語言名稱"}};var j=(n=>(n.APP_LOAD="APP_LOAD",n.ADD_CITY="ADD_CITY",n.EDIT_CITY="EDIT_CITY",n.RESET_TICKET="RESET_TICKET",n))(j||{});const E=J(),G=E.getSelectors(),Fn=n=>E.upsertMany(E.getInitialState(),n),T=n=>G.selectAll(n).reduce((i,s)=>({...i,[s.lang]:s.name}),{}),I=(n,i)=>{const s=[],h=G.selectAll(n);h.some(l=>l.lang===t.English&&l.name)||s.push(d.EN_UNDEFINED);const r=h.some(l=>l.lang===t.ChineseSimp&&l.name),o=h.some(l=>l.lang===t.ChineseTrad&&l.name),g=h.some(l=>l.lang===t.ChineseCN&&l.name),c=h.some(l=>l.lang===t.ChineseHK&&l.name),z=h.some(l=>l.lang===t.ChineseTW&&l.name);return h.some(l=>l.lang===t.Chinese&&l.name)?(r||o||g||c||z)&&s.push(d.ZH_VARIANTS_REDEFINED):!r&&!o&&!g&&!c&&!z?s.push(d.ZH_UNDEFINED):(r?g&&s.push(d.ZH_VARIANTS_REDEFINED):g||s.push(d.ZH_HANS_UNDEFINED),o?(c||z)&&s.push(d.ZH_VARIANTS_REDEFINED):!c&&!z?s.push(d.ZH_HANT_UNDEFINED):c?z||s.push(d.ZH_TW_UNDEFINED):s.push(d.ZH_HK_UNDEFINED)),new Set(h.map(l=>l.lang)).size!==h.length&&s.push(d.LANGUAGE_DUPLICATED),i&&h.every(l=>l.lang!==i)&&s.push(d.OFFICAL_LANGUAGE_UNDEFINED),s},A=E.upsertOne(E.getInitialState(),{id:H(),lang:t.English,name:""}),M={id:"",nameEntity:A,colour:"#aaaaaa",fg:D.white,pantone:void 0},U=()=>({country:void 0,newCountry:"",newCountryLang:void 0,countryName:A,city:"",cityName:A,lines:{[H()]:M}}),K=L({name:"ticket",initialState:U(),reducers:{setCountry:(n,i)=>{n.country=i.payload},setNewCountry:(n,i)=>{n.newCountry=i.payload},setNewCountryLang:(n,i)=>{n.newCountryLang=i.payload},updateCountryName:(n,i)=>{E.updateOne(n.countryName,i.payload)},addCountryName:(n,i)=>{E.addOne(n.countryName,{id:H(),lang:i.payload,name:""})},removeCountryName:(n,i)=>{E.removeOne(n.countryName,i.payload)},setCity:(n,i)=>{n.city=i.payload},updateCityName:(n,i)=>{E.updateOne(n.cityName,i.payload)},addCityName:(n,i)=>{E.addOne(n.cityName,{id:H(),lang:i.payload,name:""})},removeCityName:(n,i)=>{E.removeOne(n.cityName,i.payload)},updateLineId:(n,i)=>{n.lines[i.payload.entryId].id=i.payload.lineId},updateLineBgColour:(n,i)=>{const{entryId:s,bgColour:h}=i.payload;n.lines[s].colour=h,n.lines[s].pantone=void 0},updateLinePantone:(n,i)=>{const{entryId:s,pantone:h,hex:r}=i.payload;n.lines[s].colour=r,n.lines[s].pantone=h},updateLineFgColour:(n,i)=>{n.lines[i.payload.entryId].fg=i.payload.fgColour},updateLineName:(n,i)=>{const{entryId:s,...h}=i.payload;E.updateOne(n.lines[s].nameEntity,h)},addLineName:(n,i)=>{E.addOne(n.lines[i.payload.entryId].nameEntity,{id:H(),lang:i.payload.lang,name:""})},removeLineName:(n,i)=>{E.removeOne(n.lines[i.payload.entryId].nameEntity,i.payload.id)},addLine:n=>{n.lines[H()]=M},copyLine:(n,i)=>{n.lines[H()]=JSON.parse(JSON.stringify(n.lines[i.payload]))},removeLine:(n,i)=>{delete n.lines[i.payload]},resetTicket:()=>U(),populateTicket:(n,i)=>{const{city:s,palettes:h}=i.payload;n.country=s.country,n.city=s.id,E.setAll(n.cityName,Object.entries(s.name).map(([r,o])=>({id:H(),lang:r,name:o}))),n.lines=h.reduce((r,o)=>{const{id:g,colour:c,fg:z,pantone:l}=o,f=Fn(Object.entries(o.name).map(([F,V])=>({id:H(),lang:F,name:V})));return{...r,[H()]:{id:g,nameEntity:f,colour:c,fg:z!=null?z:D.white,pantone:l}}},{})}}}),Na={getCountryEntry:n=>n.country!=="new"?null:{id:n.newCountry,name:T(n.countryName),language:n.newCountryLang},getCityEntry:n=>{var i;return{id:n.city,country:n.country==="new"?n.newCountry:(i=n.country)!=null?i:"",name:T(n.cityName)}},getPalettes:n=>Object.values(n.lines).map(i=>{const{nameEntity:s,...h}=i;return{...h,name:T(s)}}),getCountryErrors:n=>{const i=[],{country:s,newCountry:h,newCountryLang:r,countryName:o}=n;return(!s||s==="new"&&!h)&&i.push(p.COUNTRY_CODE_UNDEFINED),s==="new"&&i.push(...I(o,r)),i},getCityErrors:n=>{var c;const i=[],{country:s,newCountryLang:h,city:r,cityName:o}=n;r||i.push(p.CITY_CODE_UNDEFINED);const g=s==="new"?h:(c=P.find(z=>z.id===s))==null?void 0:c.language;return i.push(...I(o,g)),i},getLineErrors:n=>{var g;const i={Overall:[]},{country:s,newCountryLang:h,lines:r}=n;Object.values(r).some(c=>c.id==="")&&i.Overall.push(p.LINE_CODE_UNDEFINED),new Set(Object.values(r).map(c=>c.id)).size!==Object.keys(r).length&&i.Overall.push(p.LINE_CODE_DUPLICATED);const o=s==="new"?h:(g=P.find(c=>c.id===s))==null?void 0:g.language;return Object.values(r).forEach(c=>{i["Line "+c.id]=I(c.nameEntity,o)}),i}},{setCountry:fa,setNewCountry:Fa,setNewCountryLang:pa,updateCountryName:Sa,addCountryName:ya,removeCountryName:Da,setCity:va,updateCityName:Ta,addCityName:Ia,removeCityName:Aa,updateLineId:ka,updateLineBgColour:_a,updateLinePantone:ba,updateLineFgColour:Ra,updateLineName:Pa,addLineName:Ua,removeLineName:wa,addLine:Ba,copyLine:La,removeLine:Oa,resetTicket:ja,populateTicket:Ga}=K.actions,pn=K.reducer,W=Y({reducer:{app:fn,ticket:pn}}),Ma=()=>$(),Ka=X;window.xyStore=W;const Sn={},yn="操作",Dn="黑",vn="城市",Tn="复制",In="编辑",An="理由",kn="语言",_n="线路",bn="名称",Rn="下一步",Pn="打开",Un="潘通",wn="上一步",Bn="删除",Ln="重置",On="白",jn={"1-click open issue":"一键开启Issue",Action:yn,"Add a city":"添加城市","Add a country/region...":"添加国家/地区...","Add a line":"添加线路","Add a name in another language":"添加另一语言的名称","Background colour":"背景色",Black:Dn,"Briefly describe your changes and provide justification":"简洁地描述您的改动并提供理由","Checking Pantone service availability...":"正在检查潘通服务可用性...",City:vn,"City code":"城市代码","Colour mode":"颜色模式",Copy:Tn,"Country / Region":"国家/地区","Country/region code":"国家/地区代码",Edit:In,"Edit city":"编辑城市","Enter a valid URL":"输入有效的URL","Foreground colour":"前景色","Go back":"返回","If the button below doesn't work for you, please follow the instructions below:":"如果您无法使用下面的按钮，请按下方的指引开启 Issue：",Justification:An,Language:kn,"Line code":"线路代码",Lines:_n,Name:bn,Next:Rn,"Offical language":"官方语言",Open:Pn,Pantone:Un,"Pantone code":"潘通代码","Pantone service is not available":"潘通服务不可用","Pantone service is ready":"潘通服务已准备就绪","Paste following text to the issue body":"将下面的文字粘贴到 Issue 正文","Please provide suitable source and justification.":"请您提供适当的来源和理由。","Please select...":"请选择...",Previous:wn,"Reference link":"参考链接",Remove:Bn,"Remove this name":"删除此名称",Reset:Ln,"Submit anyway":"继续提交","Submit palettes":"提交调色板",White:On,"Your inputs contain the following errors. Please consider fixing it before submitting.":"您的输入存在以下问题，请考虑在提交前修正他們。"},Gn="動作",Mn="黑",Kn="城市",Wn="複製",xn="編輯",Zn="理由",Vn="語言",Jn="路綫",Yn="名稱",$n="下一步",Xn="開啟",qn="Pantone",Qn="上一步",Cn="移除",na="重設",aa="白",ea={"1-click open issue":"一鍵開啟Issue",Action:Gn,"Add a city":"新增城市","Add a country/region...":"新增國家/地區...","Add a line":"新增路綫","Add a name in another language":"新增另一語言的名稱","Background colour":"背景色",Black:Mn,"Briefly describe your changes and provide justification":"簡短地描述你的變更並提供理由","Checking Pantone service availability...":"正在檢查 Pantone 服務可用性...",City:Kn,"City code":"城市代碼","Colour mode":"顏色模式",Copy:Wn,"Country / Region":"國家/地區","Country/region code":"國家/地區代碼",Edit:xn,"Edit city":"編輯城市","Enter a valid URL":"輸入有效的URL","Foreground colour":"前景色","Go back":"返回","If the button below doesn't work for you, please follow the instructions below:":"若你無法使用下面的按鈕，請按下方的指引開啟 Issue：",Justification:Zn,Language:Vn,"Line code":"路綫代碼",Lines:Jn,Name:Yn,Next:$n,Open:Xn,"Offical language":"官方語言",Pantone:qn,"Pantone code":"Pantone 代碼","Pantone service is not available":"Pantone 服務不可用","Pantone service is ready":"Pantone 服務已準備妥當","Paste following text to the issue body":"將下面的文字於 Issue 正文內貼上","Please provide suitable source and justification.":"請你提供適當的來源及理由。","Please select...":"請選擇...",Previous:Qn,"Reference link":"参考連結",Remove:Cn,"Remove this name":"移除此名稱",Reset:na,"Submit anyway":"繼續提交","Submit palettes":"提交調色盤",White:aa,"Your inputs contain the following errors. Please consider fixing it before submitting.":"你的輸入存在以下問題，請考慮於提交前修正他們。"},ia=new q.Builder().withResource("en",Sn).withResource("zh-Hans",jn).withResource("zh-Hant",ea).build();y.use(Q).init({lng:N.getLanguage(),fallbackLng:{[m.ChineseCN]:[m.ChineseSimp,m.English],[m.ChineseHK]:[m.ChineseTrad,m.English],[m.ChineseTW]:[m.ChineseTrad,m.English],[m.ChineseTrad]:[m.ChineseHK,m.ChineseTW,m.English],default:[m.English]},resources:ia}).then(n=>{document.title=n("Palette"),document.documentElement.lang=y.language});const x=n=>{y.changeLanguage(n).then(),document.title=y.t("Palette"),document.documentElement.lang=n};N.onLanguageChange(x);const ta="modulepreload",sa=function(n){return"/rmg-palette/"+n},w={},Z=function(i,s,h){if(!s||s.length===0)return i();const r=document.getElementsByTagName("link");return Promise.all(s.map(o=>{if(o=sa(o),o in w)return;w[o]=!0;const g=o.endsWith(".css"),c=g?'[rel="stylesheet"]':"";if(!!h)for(let f=r.length-1;f>=0;f--){const F=r[f];if(F.href===o&&(!g||F.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${c}`))return;const l=document.createElement("link");if(l.rel=g?"stylesheet":ta,g||(l.as="script",l.crossOrigin=""),l.href=o,document.head.appendChild(l),g)return new Promise((f,F)=>{l.addEventListener("load",f),l.addEventListener("error",()=>F(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>i())};function ra(){const{t:n}=C(),i=N.getEnv(),s=N.getAppVersion(),h=r=>{N.setLanguage(r),x(r)};return S(nn,{children:[u(an,{as:"h4",size:"md",children:n("Palette")}),u(en,{environment:i,version:s}),u(tn,{ml:"auto",children:S(sn,{children:[u(rn,{as:on,icon:u(hn,{}),variant:"ghost",size:"sm"}),S(ln,{children:[u(v,{onClick:()=>h(m.English),children:"English"}),u(v,{onClick:()=>h(m.ChineseSimp),children:"简体中文"}),u(v,{onClick:()=>h(m.ChineseTrad),children:"繁體中文"})]})]})})]})}const oa=k.lazy(()=>Z(()=>import("./palette-view-c664231b.js"),["assets/palette-view-c664231b.js","assets/vendor-7efc7042.js","assets/use-translated-name-09b04bfe.js"])),ha=k.lazy(()=>Z(()=>import("./ticket-view-5c85f6c0.js"),["assets/ticket-view-5c85f6c0.js","assets/vendor-7efc7042.js","assets/use-translated-name-09b04bfe.js"]));function la(){return u(un,{basename:"/rmg-palette/",children:S(gn,{children:[u(ra,{}),S(cn,{children:[u(_,{path:"/new",element:u(b,{suspenseFallback:u(R,{isIndeterminate:!0}),children:u(ha,{})})}),u(_,{path:"/",element:u(b,{suspenseFallback:u(R,{isIndeterminate:!0}),children:u(oa,{})})})]})]})})}let B;const ua=()=>{B=mn(document.getElementById("root")),B.render(u(k.StrictMode,{children:u(En,{store:W,children:u(zn,{theme:dn,children:u(Hn,{i18n:y,children:u(la,{})})})})}))};N.ready().then(()=>{ua(),N.injectCss(),N.event(j.APP_LOAD,{isStandaloneWindow:N.isStandaloneWindow()})});export{Ua as A,wa as B,a as C,da as D,j as E,Na as F,za as G,ja as H,Ha as I,t as L,D as M,Z as _,ga as __vite_legacy_guard,Ma as a,Ea as b,P as c,G as d,fa as e,Fa as f,pa as g,Sa as h,ya as i,va as j,Ta as k,Ia as l,Aa as m,ka as n,_a as o,Ga as p,Ra as q,Da as r,ma as s,E as t,Ka as u,ba as v,La as w,Oa as x,Ba as y,Pa as z};
