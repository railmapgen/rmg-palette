import{j as e,ac as w,c as W,ae as de,p as j,H as I,J,af as P,ag as L,K as A,ad as _,L as ue,ah as he,N as me,ai as pe,aj as Z,M as Q,ak as X,E as ee,G as se,F as $}from"./chakra-msXNt8OT.js";import{n as g,a as x}from"./react-gETzansC.js";import{b as R,u as C,L as xe,i as je,j as ge,k as fe,l as G,m as H,n as Ce,o as ye,p as Se,q as be,t as ke,v as Le,w as ve,x as we,y as Ee,z as Re,A as Ne,B as Oe,C as Me,D as De,F as Pe,G as Te,H as Ie,I as Ae,J as Ue,K as Fe,N as z,O as te,P as ze,Q as B,S as Be,T as k,r as v,U as T,V as ne,W as Je,g as _e,h as Ge,E as He}from"./index-bxdi3UkM.js";import{u as N,R as V,M as Ve,a as ae,b as Ke,c as Ye,d as $e}from"./pantone-input-DTdVeEw5.js";import{M as oe,L as qe}from"./line-detail-card-DKgBeiQR.js";import{P as We}from"./pantone-checker-BtB4AgCA.js";function Ze(){const{t:o,i18n:a}=g(),n=N(),t=R(),{countryList:u}=C(s=>s.app),{country:c,newCountry:r,countryName:m,newCountryLang:l}=C(s=>s.ticket),d={...u.map(s=>[s.id,n(s.name)]).sort((s,i)=>s[1].localeCompare(i[1],a.languages[0])).reduce((s,i)=>i[0]==="UN"?s:{...s,[i[0]]:i[1]},{"":o("Please select...")}),new:o("Add a country/region...")},p=Object.entries(xe).reduce((s,i)=>({...s,[i[0]]:n(i[1])}),{}),h=[{type:"select",label:o("Country/Region"),value:c,options:d,disabledOptions:[""],onChange:s=>t(je(s))},{type:"input",label:o("Country/region code"),placeholder:"e.g. CN, HK, JP (ISO 3166-1 alpha-2)",value:r,validator:s=>s!==""&&!!s.match(/^[A-Z]{2}$|^GB[A-Z]{3}$/),onChange:s=>t(ge(s)),hidden:c!=="new"},{type:"select",label:o("Official language"),value:l,options:p,onChange:s=>t(fe(s||void 0)),hidden:c!=="new"}];return e.jsxs(G,{children:[e.jsx(H,{children:e.jsx(w,{as:"h5",size:"sm",children:o("Country/Region")})}),e.jsxs(W.div,{px:1,children:[e.jsx(V,{fields:h}),c==="new"&&e.jsx(oe,{entries:m,onUpdate:(s,i)=>t(Ce({lang:s,name:i})),onLangSwitch:(s,i)=>t(ye({prevLang:s,nextLang:i})),onRemove:s=>t(Se(s))})]})]})}function Qe(){const{t:o,i18n:a}=g(),n=R(),t=N(),{cityList:u}=C(s=>s.app),{country:c,city:r,newCity:m,cityName:l}=C(s=>s.ticket),d={...u.filter(s=>s.country===c).map(s=>[s.id,t(s.name)]).sort((s,i)=>s[1].localeCompare(i[1],a.languages[0])).reduce((s,i)=>({...s,[i[0]]:i[1]}),{"":o("Please select...")}),new:o("Add a city")+"..."},p=async s=>{if(s==="new"){n(we("new"));return}const i=await Ee(s,u);n(i?Re(i):Ne())},h=[{type:"select",label:o("City"),value:r,options:d,disabledOptions:[""],onChange:s=>p(s)},{type:"input",label:o("City code"),placeholder:"e.g. hongkong, guangzhou, shanghai",value:m,onChange:s=>n(be(s)),validator:s=>s!==""&&!s.match(/[^a-z]/),hidden:r!=="new"}];return e.jsxs(G,{children:[e.jsx(H,{children:e.jsx(w,{as:"h5",size:"sm",children:o("City")})}),e.jsxs(W.div,{px:1,children:[e.jsx(V,{fields:h}),r==="new"&&e.jsx(oe,{entries:l,onUpdate:(s,i)=>n(ke({lang:s,name:i})),onLangSwitch:(s,i)=>n(Le({prevLang:s,nextLang:i})),onRemove:s=>n(ve(s))})]})]})}function Xe(){const{t:o}=g(),a=R(),n=C(t=>t.ticket.lines);return e.jsxs(G,{children:[e.jsxs(H,{children:[e.jsx(w,{as:"h5",size:"sm",mr:"auto",children:o("Lines")}),e.jsx(We,{})]}),e.jsxs(de,{spacing:1,px:1,children:[Object.entries(n).map(([t,u])=>e.jsx(qe,{lineDetail:u,editable:!0,onUpdate:c=>a(Oe({entryId:t,updates:c})),onMoveUp:()=>a(Me(t)),onMoveDown:()=>a(De(t)),onCopy:()=>a(Pe(t)),onRemove:()=>a(Te(t)),onNameUpdate:(c,r)=>a(Ie({entryId:t,lang:c,name:r})),onLangSwitch:(c,r)=>a(Ae({entryId:t,prevLang:c,nextLang:r})),onNameRemove:c=>a(Ue({entryId:t,lang:c}))},t)),e.jsx(j,{size:"xs",variant:"ghost",leftIcon:e.jsx(Ve,{}),ml:"auto !important",onClick:()=>a(Fe()),children:o("Add a line")})]})]})}function es(o){const{countryErrors:a,cityErrors:n,lineErrors:t,onIgnore:u,onClose:c}=o,{t:r}=g(),m=N();return e.jsxs(e.Fragment,{children:[e.jsxs(I,{children:[e.jsx(J,{children:r("Your inputs contain the following errors. Please consider fixing it before submitting.")}),a.length>0&&e.jsxs(e.Fragment,{children:[e.jsx(w,{as:"h5",size:"sm",my:2,children:r("Country/Region")}),e.jsx(P,{"aria-label":"List of country errors",children:a.map((l,d)=>e.jsx(L,{children:m(z[l])},d))})]}),n.length>0&&e.jsxs(e.Fragment,{children:[e.jsx(w,{as:"h5",size:"sm",my:2,children:r("City")}),e.jsx(P,{"aria-label":"List of city errors",children:n.map((l,d)=>e.jsx(L,{children:m(z[l])},d))})]}),Object.values(t).flat().length>0&&e.jsxs(e.Fragment,{children:[e.jsx(w,{as:"h5",size:"sm",my:2,children:r("Lines")}),e.jsx(P,{"aria-label":"List of line errors",children:Object.entries(t).map(([l,d])=>e.jsxs(L,{children:[l,e.jsx(P,{children:d.map((p,h)=>e.jsx(L,{children:m(z[p])},h))})]},l))})]})]}),e.jsx(A,{children:e.jsxs(_,{children:[e.jsx(j,{onClick:u,children:r("Submit anyway")}),e.jsx(j,{colorScheme:"primary",onClick:c,children:r("Go back")})]})})]})}const q=o=>{var a;return!!((a=o.match(/^https?:\/\//))!=null&&a[0])};function ss(o){const{dataSource:a,onDataSourceChange:n,refLink:t,onRefLinkChange:u,justification:c,onJustificationChange:r,onPrev:m,onNext:l}=o,{t:d}=g(),p=N(),h=Object.fromEntries([["",d("Please select...")],...Object.entries(te).map(([f,y])=>[f,p(y)])]),s=[{type:"select",label:d("Data source"),options:h,disabledOptions:[""],value:a,onChange:f=>n(f)},{type:"input",value:t,label:d("Reference link"),placeholder:d("Enter a valid URL, e.g.")+" https://en.wikipedia.org",onChange:u,validator:q},{type:"textarea",value:c,label:d("Justification"),placeholder:d("Briefly describe your changes and provide justification"),onChange:r}],i=!a||!t||!c||!q(t);return e.jsxs(e.Fragment,{children:[e.jsxs(I,{children:[e.jsx(J,{children:d("Please provide suitable source and justification.")}),e.jsx(V,{fields:s,minW:"full"})]}),e.jsxs(A,{children:[m&&e.jsx(j,{variant:"ghost",onClick:m,mr:"auto",leftIcon:e.jsx(ae,{}),children:d("Previous")}),e.jsx(j,{colorScheme:"primary",onClick:l,rightIcon:e.jsx(Ke,{}),isDisabled:i,children:d("Next")})]})]})}function ts(o){var O,S,M;const{countryEntry:a,cityEntry:n,paletteList:t,dataSource:u,refLink:c,justification:r,onPrev:m}=o,{t:l}=g(),d=N(),p=ue("primary.500","primary.300"),h=x.useRef(null),s=["**Data source:** ".concat(u?d(te[u]):"(REPLACE ME)"),"**Reference link:** ".concat(c||"(REPLACE ME)"),"**Justification:** ".concat(r||"(REPLACE ME)"),ze,B("country",a),B("city",n),B("lines",t)].join("\n\n"),i=new URLSearchParams({template:"new-palettes-request.md",labels:"resources",title:(S=(O=n==null?void 0:n.name)==null?void 0:O.en)!=null?S:"[CITY]",body:s}),f=new URLSearchParams({template:"new-palettes-request.md",labels:"resources",title:"Resources: New palettes of "+((M=n==null?void 0:n.name)==null?void 0:M.en)}),y=async()=>{h!=null&&h.current&&(h.current.select(),await navigator.clipboard.writeText(s))};return e.jsxs(e.Fragment,{children:[e.jsxs(I,{children:[e.jsx(J,{children:l("If the button below doesn't work for you, please follow the instructions below:")}),e.jsxs(he,{children:[e.jsxs(L,{children:[l("Open")," ",e.jsxs(me,{color:p,href:"https://github.com/railmapgen/rmg-palette/issues/new?"+f.toString(),isExternal:!0,children:["Issue: New Palettes Request ",e.jsx(pe,{as:Ye})]})]}),e.jsxs(L,{children:[l("Paste following text to the issue body")," ",e.jsx(j,{size:"xs",leftIcon:e.jsx($e,{}),onClick:y,children:l("Copy")}),e.jsx(Be,{ref:h,isReadOnly:!0,defaultValue:s,onClick:({target:E})=>E.select()})]})]})]}),e.jsxs(A,{children:[e.jsx(j,{variant:"ghost",onClick:m,mr:"auto",leftIcon:e.jsx(ae,{}),children:l("Previous")}),e.jsx(j,{colorScheme:"primary",onClick:()=>window.open("https://github.com/railmapgen/rmg-palette/issues/new?"+i.toString(),"_blank"),children:l("1-click open issue")})]})]})}function ns(o){const{isOpen:a,onClose:n}=o,{t}=g(),[u,c]=x.useState([]),[r,m]=x.useState([]),[l,d]=x.useState({}),[p,h]=x.useState(""),[s,i]=x.useState(""),[f,y]=x.useState(""),[O,S]=x.useState(!1),[M,E]=x.useState(!1),{countryList:K}=C(F=>F.app),b=C(F=>F.ticket),ie=k.getCountryEntry(b),re=k.getCityEntry(b),ce=k.getPalettes(b);x.useEffect(()=>{a?(c(k.getCountryErrors(b)),m(k.getCityErrors(b,K)),d(k.getLineErrors(b,K))):(S(!1),h(""),i(""),y(""),E(!1))},[a]);const Y=u.length>0||r.length>0||Object.values(l).flat().length>0,D=Y&&!O,U=!D&&!M,le=()=>{!D&&!U&&v.storage.remove(T),n()};return e.jsxs(Z,{blockScrollOnMount:!1,isOpen:a,onClose:n,scrollBehavior:"inside",children:[e.jsx(Q,{}),e.jsxs(X,{children:[e.jsx(ee,{children:t("Submit palettes")}),e.jsx(se,{onClick:le}),D&&e.jsx(es,{countryErrors:u,cityErrors:r,lineErrors:l,onIgnore:()=>S(!0),onClose:n}),U&&e.jsx(ss,{dataSource:p,onDataSourceChange:h,refLink:s,onRefLinkChange:i,justification:f,onJustificationChange:y,onPrev:Y?()=>S(!1):void 0,onNext:()=>E(!0)}),!D&&!U&&e.jsx(ts,{countryEntry:ie,cityEntry:re,paletteList:ce,dataSource:p,refLink:s,justification:f,onPrev:()=>E(!1)})]})]})}function as(o){const{isOpen:a,onClose:n,incomingState:t}=o,{t:u}=g(),c=R(),r=()=>{v.storage.remove(T),n()},m=()=>{t&&c(ne(t)),n()};return e.jsxs(Z,{isOpen:a,onClose:n,children:[e.jsx(Q,{}),e.jsxs(X,{children:[e.jsx(ee,{children:u("Unsaved draft")}),e.jsx(se,{}),e.jsx(I,{children:u("Do you want to continue with your last unsaved ticket?")}),e.jsx(A,{children:e.jsxs(_,{children:[e.jsx(j,{onClick:r,children:u("Discard")}),e.jsx(j,{colorScheme:"primary",onClick:m,children:u("Continue")})]})})]})]})}function us(){const{t:o}=g(),a=R(),{isDataLoading:n}=C(h=>h.app),[t,u]=x.useState(),[c,r]=x.useState(!1),[m,l]=x.useState(!1);x.useEffect(()=>{const h=v.storage.get(T);if(h)try{const s=JSON.parse(h);Object.keys(s.lines).length>0&&Object.values(s.lines)[0].id&&(u(s),r(!0))}catch(s){Je.error("<TicketView/>, unable to restore draft ticket",h)}},[]);const d=()=>{v.openApp({appId:"rmg-palette"})},p=()=>{a(ne()),v.storage.remove(T),v.event(He.RESET_TICKET,{})};return e.jsxs(_e,{alignSelf:"center",sx:{width:{base:"100%",md:520}},children:[n&&e.jsx(Ge,{isIndeterminate:!0}),e.jsxs($,{direction:"column",flex:1,overflowY:"auto",bg:"inherit",children:[e.jsx(Ze,{}),e.jsx(Qe,{}),e.jsx(Xe,{})]}),e.jsxs($,{my:2,children:[e.jsx(j,{size:"sm",onClick:d,children:o("Go back")}),e.jsxs(_,{ml:"auto",children:[e.jsx(j,{size:"sm",variant:"outline",onClick:p,children:o("Reset")}),e.jsx(j,{size:"sm",colorScheme:"primary",onClick:()=>l(!0),children:o("Submit")})]})]}),e.jsx(as,{isOpen:c,onClose:()=>r(!1),incomingState:t}),e.jsx(ns,{isOpen:m,onClose:()=>l(!1)})]})}export{us as default};
