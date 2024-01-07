import{H as e,ap as w,a as W,ar as de,K as g,a0 as P,a1 as J,as as M,at as L,a2 as T,aq as _,a3 as ue,au as he,a4 as me,av as pe,aw as Z,Y as Q,ax as X,_ as ee,$ as se,F as q}from"./chakra-oz4Mm5GU.js";import{l as j,r as x,o as xe}from"./react-CVMQYbqF.js";import{b as E,u as C,L as ge,i as je,j as fe,k as Ce,l as G,m as H,n as ye,o as Se,p as be,q as ve,t as ke,v as Le,w as we,x as Ee,y as Re,z as Ne,A as Oe,B as Me,C as De,D as Pe,F as Te,G as Ae,H as Ie,I as Ue,J as Fe,K as ze,N as z,O as te,P as Be,Q as B,S as Je,T as k,r as y,U as D,V as ne,g as _e,h as Ge,E as He}from"./index-DWcuudcV.js";import{u as R,R as V,M as Ve,a as ae,b as Ke,c as $e,d as qe}from"./pantone-input-YOiCqH3F.js";import{M as oe,L as Ye}from"./line-detail-card-kLxw8fwq.js";import{P as We}from"./pantone-checker-4jfFm2vi.js";function Ze(){const{t:i,i18n:o}=j(),a=R(),t=E(),{countryList:u}=C(s=>s.app),{country:r,newCountry:c,countryName:h,newCountryLang:d}=C(s=>s.ticket),l={...u.map(s=>[s.id,a(s.name)]).sort((s,n)=>s[1].localeCompare(n[1],o.languages[0])).reduce((s,n)=>n[0]==="UN"?s:{...s,[n[0]]:n[1]},{"":i("Please select...")}),new:i("Add a country/region...")},p=Object.entries(ge).reduce((s,n)=>({...s,[n[0]]:a(n[1])}),{}),m=[{type:"select",label:i("Country/Region"),value:r,options:l,disabledOptions:[""],onChange:s=>t(je(s))},{type:"input",label:i("Country/region code"),placeholder:"e.g. CN, HK, JP (ISO 3166-1 alpha-2)",value:c,validator:s=>s!==""&&!!s.match(/^[A-Z]{2}$|^GB[A-Z]{3}$/),onChange:s=>t(fe(s)),hidden:r!=="new"},{type:"select",label:i("Official language"),value:d,options:p,onChange:s=>t(Ce(s||void 0)),hidden:r!=="new"}];return e.jsxs(G,{children:[e.jsx(H,{children:e.jsx(w,{as:"h5",size:"sm",children:i("Country/Region")})}),e.jsxs(W.div,{px:1,children:[e.jsx(V,{fields:m}),r==="new"&&e.jsx(oe,{entries:h,onUpdate:(s,n)=>t(ye({lang:s,name:n})),onLangSwitch:(s,n)=>t(Se({prevLang:s,nextLang:n})),onRemove:s=>t(be(s))})]})]})}function Qe(){const{t:i,i18n:o}=j(),a=E(),t=R(),{cityList:u}=C(s=>s.app),{country:r,city:c,newCity:h,cityName:d}=C(s=>s.ticket),l={...u.filter(s=>s.country===r).map(s=>[s.id,t(s.name)]).sort((s,n)=>s[1].localeCompare(n[1],o.languages[0])).reduce((s,n)=>({...s,[n[0]]:n[1]}),{"":i("Please select...")}),new:i("Add a city")+"..."},p=async s=>{if(s==="new"){a(Ee("new"));return}const n=await Re(s,u);a(n?Ne(n):Oe())},m=[{type:"select",label:i("City"),value:c,options:l,disabledOptions:[""],onChange:s=>p(s)},{type:"input",label:i("City code"),placeholder:"e.g. hongkong, guangzhou, shanghai",value:h,onChange:s=>a(ve(s)),validator:s=>s!==""&&!s.match(/[^a-z]/),hidden:c!=="new"}];return e.jsxs(G,{children:[e.jsx(H,{children:e.jsx(w,{as:"h5",size:"sm",children:i("City")})}),e.jsxs(W.div,{px:1,children:[e.jsx(V,{fields:m}),c==="new"&&e.jsx(oe,{entries:d,onUpdate:(s,n)=>a(ke({lang:s,name:n})),onLangSwitch:(s,n)=>a(Le({prevLang:s,nextLang:n})),onRemove:s=>a(we(s))})]})]})}function Xe(){const{t:i}=j(),o=E(),a=C(t=>t.ticket.lines);return e.jsxs(G,{children:[e.jsxs(H,{children:[e.jsx(w,{as:"h5",size:"sm",mr:"auto",children:i("Lines")}),e.jsx(We,{})]}),e.jsxs(de,{spacing:1,px:1,children:[Object.entries(a).map(([t,u])=>e.jsx(Ye,{lineDetail:u,editable:!0,onUpdate:r=>o(Me({entryId:t,updates:r})),onMoveUp:()=>o(De(t)),onMoveDown:()=>o(Pe(t)),onCopy:()=>o(Te(t)),onRemove:()=>o(Ae(t)),onNameUpdate:(r,c)=>o(Ie({entryId:t,lang:r,name:c})),onLangSwitch:(r,c)=>o(Ue({entryId:t,prevLang:r,nextLang:c})),onNameRemove:r=>o(Fe({entryId:t,lang:r}))},t)),e.jsx(g,{size:"xs",variant:"ghost",leftIcon:e.jsx(Ve,{}),ml:"auto !important",onClick:()=>o(ze()),children:i("Add a line")})]})]})}function es(i){const{countryErrors:o,cityErrors:a,lineErrors:t,onIgnore:u,onClose:r}=i,{t:c}=j(),h=R();return e.jsxs(e.Fragment,{children:[e.jsxs(P,{children:[e.jsx(J,{children:c("Your inputs contain the following errors. Please consider fixing it before submitting.")}),o.length>0&&e.jsxs(e.Fragment,{children:[e.jsx(w,{as:"h5",size:"sm",my:2,children:c("Country/Region")}),e.jsx(M,{"aria-label":"List of country errors",children:o.map((d,l)=>e.jsx(L,{children:h(z[d])},l))})]}),a.length>0&&e.jsxs(e.Fragment,{children:[e.jsx(w,{as:"h5",size:"sm",my:2,children:c("City")}),e.jsx(M,{"aria-label":"List of city errors",children:a.map((d,l)=>e.jsx(L,{children:h(z[d])},l))})]}),Object.values(t).flat().length>0&&e.jsxs(e.Fragment,{children:[e.jsx(w,{as:"h5",size:"sm",my:2,children:c("Lines")}),e.jsx(M,{"aria-label":"List of line errors",children:Object.entries(t).map(([d,l])=>e.jsxs(L,{children:[d,e.jsx(M,{children:l.map((p,m)=>e.jsx(L,{children:h(z[p])},m))})]},d))})]})]}),e.jsx(T,{children:e.jsxs(_,{children:[e.jsx(g,{onClick:u,children:c("Submit anyway")}),e.jsx(g,{colorScheme:"primary",onClick:r,children:c("Go back")})]})})]})}const Y=i=>{var o;return!!((o=i.match(/^https?:\/\//))!=null&&o[0])};function ss(i){const{dataSource:o,onDataSourceChange:a,refLink:t,onRefLinkChange:u,justification:r,onJustificationChange:c,onPrev:h,onNext:d}=i,{t:l}=j(),p=R(),m=Object.fromEntries([["",l("Please select...")],...Object.entries(te).map(([f,S])=>[f,p(S)])]),s=[{type:"select",label:l("Data source"),options:m,disabledOptions:[""],value:o,onChange:f=>a(f)},{type:"input",value:t,label:l("Reference link"),placeholder:l("Enter a valid URL, e.g.")+" https://en.wikipedia.org",onChange:u,validator:Y},{type:"textarea",value:r,label:l("Justification"),placeholder:l("Briefly describe your changes and provide justification"),onChange:c}],n=!o||!t||!r||!Y(t);return e.jsxs(e.Fragment,{children:[e.jsxs(P,{children:[e.jsx(J,{children:l("Please provide suitable source and justification.")}),e.jsx(V,{fields:s,minW:"full"})]}),e.jsxs(T,{children:[h&&e.jsx(g,{variant:"ghost",onClick:h,mr:"auto",leftIcon:e.jsx(ae,{}),children:l("Previous")}),e.jsx(g,{colorScheme:"primary",onClick:d,rightIcon:e.jsx(Ke,{}),isDisabled:n,children:l("Next")})]})]})}function ts(i){var N,b;const{countryEntry:o,cityEntry:a,paletteList:t,dataSource:u,refLink:r,justification:c,onPrev:h}=i,{t:d}=j(),l=R(),p=ue("primary.500","primary.300"),m=x.useRef(null),s=["**Data source:** ".concat(u?l(te[u]):"(REPLACE ME)"),"**Reference link:** ".concat(r||"(REPLACE ME)"),"**Justification:** ".concat(c||"(REPLACE ME)"),Be,B("country",o),B("city",a),B("lines",t)].join("\n\n"),n=new URLSearchParams({template:"new-palettes-request.md",labels:"resources",title:"Resources: New palettes of "+((N=a==null?void 0:a.name)==null?void 0:N.en),body:s}),f=new URLSearchParams({template:"new-palettes-request.md",labels:"resources",title:"Resources: New palettes of "+((b=a==null?void 0:a.name)==null?void 0:b.en)}),S=async()=>{m!=null&&m.current&&(m.current.select(),await navigator.clipboard.writeText(s))};return e.jsxs(e.Fragment,{children:[e.jsxs(P,{children:[e.jsx(J,{children:d("If the button below doesn't work for you, please follow the instructions below:")}),e.jsxs(he,{children:[e.jsxs(L,{children:[d("Open")," ",e.jsxs(me,{color:p,href:"https://github.com/railmapgen/rmg-palette/issues/new?"+f.toString(),isExternal:!0,children:["Issue: New Palettes Request ",e.jsx(pe,{as:$e})]})]}),e.jsxs(L,{children:[d("Paste following text to the issue body")," ",e.jsx(g,{size:"xs",leftIcon:e.jsx(qe,{}),onClick:S,children:d("Copy")}),e.jsx(Je,{ref:m,isReadOnly:!0,defaultValue:s,onClick:({target:A})=>A.select()})]})]})]}),e.jsxs(T,{children:[e.jsx(g,{variant:"ghost",onClick:h,mr:"auto",leftIcon:e.jsx(ae,{}),children:d("Previous")}),e.jsx(g,{colorScheme:"primary",onClick:()=>window.open("https://github.com/railmapgen/rmg-palette/issues/new?"+n.toString(),"_blank"),children:d("1-click open issue")})]})]})}function ns(i){const{isOpen:o,onClose:a}=i,{t}=j(),[u,r]=x.useState([]),[c,h]=x.useState([]),[d,l]=x.useState({}),[p,m]=x.useState(""),[s,n]=x.useState(""),[f,S]=x.useState(""),[N,b]=x.useState(!1),[A,I]=x.useState(!1),{countryList:K}=C(F=>F.app),v=C(F=>F.ticket),ie=k.getCountryEntry(v),re=k.getCityEntry(v),ce=k.getPalettes(v);x.useEffect(()=>{o?(r(k.getCountryErrors(v)),h(k.getCityErrors(v,K)),l(k.getLineErrors(v,K))):(b(!1),m(""),n(""),S(""),I(!1))},[o]);const $=u.length>0||c.length>0||Object.values(d).flat().length>0,O=$&&!N,U=!O&&!A,le=()=>{!O&&!U&&y.storage.remove(D),a()};return e.jsxs(Z,{blockScrollOnMount:!1,isOpen:o,onClose:a,scrollBehavior:"inside",children:[e.jsx(Q,{}),e.jsxs(X,{children:[e.jsx(ee,{children:t("Submit palettes")}),e.jsx(se,{onClick:le}),O&&e.jsx(es,{countryErrors:u,cityErrors:c,lineErrors:d,onIgnore:()=>b(!0),onClose:a}),U&&e.jsx(ss,{dataSource:p,onDataSourceChange:m,refLink:s,onRefLinkChange:n,justification:f,onJustificationChange:S,onPrev:$?()=>b(!1):void 0,onNext:()=>I(!0)}),!O&&!U&&e.jsx(ts,{countryEntry:ie,cityEntry:re,paletteList:ce,dataSource:p,refLink:s,justification:f,onPrev:()=>I(!1)})]})]})}function as(i){const{isOpen:o,onClose:a,incomingState:t}=i,{t:u}=j(),r=E(),c=()=>{y.storage.remove(D),a()},h=()=>{t&&r(ne(t)),a()};return e.jsxs(Z,{isOpen:o,onClose:a,children:[e.jsx(Q,{}),e.jsxs(X,{children:[e.jsx(ee,{children:u("Unsaved draft")}),e.jsx(se,{}),e.jsx(P,{children:u("Do you want to continue with your last unsaved ticket?")}),e.jsx(T,{children:e.jsxs(_,{children:[e.jsx(g,{onClick:c,children:u("Discard")}),e.jsx(g,{colorScheme:"primary",onClick:h,children:u("Continue")})]})})]})]})}function us(){const{t:i}=j(),o=E(),a=xe(),{isDataLoading:t}=C(s=>s.app),[u,r]=x.useState(),[c,h]=x.useState(!1),[d,l]=x.useState(!1);x.useEffect(()=>{const s=y.storage.get(D);if(s)try{const n=JSON.parse(s);Object.keys(n.lines).length>0&&Object.values(n.lines)[0].id&&(r(n),h(!0))}catch(n){console.error("TicketView:: unable to restore draft ticket",s)}},[]);const p=()=>{y.isStandaloneWindow()?a("/"):y.openApp("rmg-palette")},m=()=>{o(ne()),y.storage.remove(D),y.event(He.RESET_TICKET,{})};return e.jsxs(_e,{alignSelf:"center",sx:{width:{base:"100%",md:520}},children:[t&&e.jsx(Ge,{isIndeterminate:!0}),e.jsxs(q,{direction:"column",flex:1,overflowY:"auto",bg:"inherit",children:[e.jsx(Ze,{}),e.jsx(Qe,{}),e.jsx(Xe,{})]}),e.jsxs(q,{my:2,children:[e.jsx(g,{size:"sm",onClick:p,children:i("Go back")}),e.jsxs(_,{ml:"auto",children:[e.jsx(g,{size:"sm",variant:"outline",onClick:m,children:i("Reset")}),e.jsx(g,{size:"sm",colorScheme:"primary",onClick:()=>l(!0),children:i("Submit")})]})]}),e.jsx(as,{isOpen:c,onClose:()=>h(!1),incomingState:u}),e.jsx(ns,{isOpen:d,onClose:()=>l(!1)})]})}export{us as default};
