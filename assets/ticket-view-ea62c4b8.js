import{j as e,$ as b,Q as Y,t as M,a1 as re,f as x,s as O,a3 as R,e as k,v as P,a0 as F,w as ce,a4 as le,x as de,a5 as ue,a6 as $,M as Q,a7 as W,q as X,r as Z,F as _}from"./chakra-7070dc54.js";import{u as f,r as p,n as he}from"./react-af516715.js";import{c as w,a as g,L as me,j as pe,k as xe,l as je,m as B,n as fe,o as ge,p as ye,q as Ce,t as ve,v as Se,w as ke,x as be,y as we,z as Le,A as Ee,B as q,C as Re,D as Ne,F as Me,G as Oe,H as Pe,I as Te,J as De,K as Ie,N as Ue,O as A,P as Ae,Q as z,S as ze,T as S,r as y,U as N,V as ee,h as Fe,i as Be,E as Je}from"./index-06eea9c7.js";import{R as J,M as Ge,a as se,b as He,c as Ve,d as _e}from"./index.esm-98632925.js";import{u as G,M as te,g as qe,L as Ke}from"./line-detail-card-3db6d956.js";function Ye(){const{t:i,i18n:a}=f(),n=G(),t=w(),{countryList:d}=g(s=>s.app),{country:c,newCountry:l,countryName:r,newCountryLang:h}=g(s=>s.ticket),u={...d.map(s=>[s.id,n(s.name)]).sort((s,o)=>s[1].localeCompare(o[1],a.languages[0])).reduce((s,o)=>o[0]==="UN"?s:{...s,[o[0]]:o[1]},{"":i("Please select...")}),new:i("Add a country/region...")},m=Object.entries(me).reduce((s,o)=>({...s,[o[0]]:n(o[1])}),{}),j=[{type:"select",label:i("Country/Region"),value:c,options:u,disabledOptions:[""],onChange:s=>t(pe(s))},{type:"input",label:i("Country/region code"),placeholder:"e.g. CN, HK, JP (ISO 3166-1 alpha-2)",value:l,onChange:s=>t(xe(s)),hidden:c!=="new"},{type:"select",label:i("Official language"),value:h,options:m,onChange:s=>t(je(s||void 0)),hidden:c!=="new"}];return e.jsxs("section",{children:[e.jsx(B,{children:e.jsx(b,{as:"h5",size:"sm",children:i("Country/Region")})}),e.jsxs(Y.div,{px:1,children:[e.jsx(J,{fields:j}),c==="new"&&e.jsx(te,{entries:r,onUpdate:(s,o)=>t(fe({lang:s,name:o})),onLangSwitch:(s,o)=>t(ge({prevLang:s,nextLang:o})),onRemove:s=>t(ye(s))})]})]})}function $e(){const{t:i,i18n:a}=f(),n=w(),t=G(),{cityList:d}=g(s=>s.app),{country:c,city:l,newCity:r,cityName:h}=g(s=>s.ticket),u={...d.filter(s=>s.country===c).map(s=>[s.id,t(s.name)]).sort((s,o)=>s[1].localeCompare(o[1],a.languages[0])).reduce((s,o)=>({...s,[o[0]]:o[1]}),{"":i("Please select...")}),new:i("Add a city")+"..."},m=async s=>{if(s==="new"){n(be("new"));return}const o=await we(s,d);n(o?Le(o):Ee())},j=[{type:"select",label:i("City"),value:l,options:u,disabledOptions:[""],onChange:s=>m(s)},{type:"input",label:i("City code"),placeholder:"e.g. hongkong, guangzhou, shanghai",value:r,onChange:s=>n(Ce(s)),validator:s=>s!==""&&!s.match(/[^a-z]/),hidden:l!=="new"}];return e.jsxs("section",{children:[e.jsx(B,{children:e.jsx(b,{as:"h5",size:"sm",children:i("City")})}),e.jsxs(Y.div,{px:1,children:[e.jsx(J,{fields:j}),l==="new"&&e.jsx(te,{entries:h,onUpdate:(s,o)=>n(ve({lang:s,name:o})),onLangSwitch:(s,o)=>n(Se({prevLang:s,nextLang:o})),onRemove:s=>n(ke(s))})]})]})}function Qe(){const{t:i}=f(),a=w(),{pantoneReady:n}=g(t=>t.app);return p.useEffect(()=>{const t=new AbortController;return qe("130 C",t.signal).then(d=>a(q(!!d))).catch(()=>a(q(!1))),()=>{t.abort()}},[]),e.jsx(M,{as:"i",fontSize:"xs",children:n===void 0?i("Checking Pantone service availability..."):n?i("Pantone service is ready")+" ✅":i("Pantone service is not available")+" ⚠️"})}function We(){const{t:i}=f(),a=w(),n=g(t=>t.ticket.lines);return e.jsxs("section",{children:[e.jsxs(B,{children:[e.jsx(b,{as:"h5",size:"sm",mr:"auto",children:i("Lines")}),e.jsx(Qe,{})]}),e.jsxs(re,{spacing:1,px:1,children:[Object.entries(n).map(([t,d])=>e.jsx(Ke,{lineDetail:d,editable:!0,onUpdate:c=>a(Re({entryId:t,updates:c})),onMoveUp:()=>a(Ne(t)),onMoveDown:()=>a(Me(t)),onCopy:()=>a(Oe(t)),onRemove:()=>a(Pe(t)),onNameUpdate:(c,l)=>a(Te({entryId:t,lang:c,name:l})),onLangSwitch:(c,l)=>a(De({entryId:t,prevLang:c,nextLang:l})),onNameRemove:c=>a(Ie({entryId:t,lang:c}))},t)),e.jsx(x,{size:"xs",variant:"ghost",leftIcon:e.jsx(Ge,{}),ml:"auto !important",onClick:()=>a(Ue()),children:i("Add a line")})]})]})}function Xe(i){const{countryErrors:a,cityErrors:n,lineErrors:t,onIgnore:d,onClose:c}=i,{t:l}=f(),r=G();return e.jsxs(e.Fragment,{children:[e.jsxs(O,{children:[e.jsx(M,{children:l("Your inputs contain the following errors. Please consider fixing it before submitting.")}),a.length>0&&e.jsxs(e.Fragment,{children:[e.jsx(b,{as:"h5",size:"sm",my:2,children:l("Country/Region")}),e.jsx(R,{"aria-label":"List of country errors",children:a.map((h,u)=>e.jsx(k,{children:r(A[h])},u))})]}),n.length>0&&e.jsxs(e.Fragment,{children:[e.jsx(b,{as:"h5",size:"sm",my:2,children:l("City")}),e.jsx(R,{"aria-label":"List of city errors",children:n.map((h,u)=>e.jsx(k,{children:r(A[h])},u))})]}),Object.values(t).flat().length>0&&e.jsxs(e.Fragment,{children:[e.jsx(b,{as:"h5",size:"sm",my:2,children:l("Lines")}),e.jsx(R,{"aria-label":"List of line errors",children:Object.entries(t).map(([h,u])=>e.jsxs(k,{children:[h,e.jsx(R,{children:u.map((m,j)=>e.jsx(k,{children:r(A[m])},j))})]},h))})]})]}),e.jsx(P,{children:e.jsxs(F,{children:[e.jsx(x,{onClick:d,children:l("Submit anyway")}),e.jsx(x,{colorScheme:"primary",onClick:c,children:l("Go back")})]})})]})}const K=i=>{var a;return!!((a=i.match(/^https?:\/\//))!=null&&a[0])};function Ze(i){const{refLink:a,onRefLinkChange:n,justification:t,onJustificationChange:d,onPrev:c,onNext:l}=i,{t:r}=f(),h=[{type:"input",value:a,label:r("Reference link"),placeholder:r("Enter a valid URL, e.g.")+" https://en.wikipedia.org",onChange:n,validator:K},{type:"textarea",value:t,label:r("Justification"),placeholder:r("Briefly describe your changes and provide justification"),onChange:d}],u=!a||!t||!K(a);return e.jsxs(e.Fragment,{children:[e.jsxs(O,{children:[e.jsx(M,{children:r("Please provide suitable source and justification.")}),e.jsx(J,{fields:h,minW:"full"})]}),e.jsxs(P,{children:[c&&e.jsx(x,{variant:"ghost",onClick:c,mr:"auto",leftIcon:e.jsx(se,{}),children:r("Previous")}),e.jsx(x,{colorScheme:"primary",onClick:l,rightIcon:e.jsx(He,{}),isDisabled:u,children:r("Next")})]})]})}function es(i){var L,C;const{countryEntry:a,cityEntry:n,paletteList:t,refLink:d,justification:c,onPrev:l}=i,{t:r}=f(),h=ce("primary.500","primary.300"),u=p.useRef(null),m=[`**Reference link:** ${d||"(REPLACE ME)"}`,`**Justification:** ${c||"(REPLACE ME)"}`,Ae,z("country",a),z("city",n),z("lines",t)].join(`

`),j=new URLSearchParams({template:"new-palettes-request.md",labels:"resources",title:"Resources: New palettes of "+((L=n==null?void 0:n.name)==null?void 0:L.en),body:m}),s=new URLSearchParams({template:"new-palettes-request.md",labels:"resources",title:"Resources: New palettes of "+((C=n==null?void 0:n.name)==null?void 0:C.en)}),o=async()=>{u!=null&&u.current&&(u.current.select(),await navigator.clipboard.writeText(m))};return e.jsxs(e.Fragment,{children:[e.jsxs(O,{children:[e.jsx(M,{children:r("If the button below doesn't work for you, please follow the instructions below:")}),e.jsxs(le,{children:[e.jsxs(k,{children:[r("Open")," ",e.jsxs(de,{color:h,href:"https://github.com/railmapgen/rmg-palette/issues/new?"+s.toString(),isExternal:!0,children:["Issue: New Palettes Request ",e.jsx(ue,{as:Ve})]})]}),e.jsxs(k,{children:[r("Paste following text to the issue body")," ",e.jsx(x,{size:"xs",leftIcon:e.jsx(_e,{}),onClick:o,children:r("Copy")}),e.jsx(ze,{ref:u,isReadOnly:!0,defaultValue:m,onClick:({target:T})=>T.select()})]})]})]}),e.jsxs(P,{children:[e.jsx(x,{variant:"ghost",onClick:l,mr:"auto",leftIcon:e.jsx(se,{}),children:r("Previous")}),e.jsx(x,{colorScheme:"primary",onClick:()=>window.open("https://github.com/railmapgen/rmg-palette/issues/new?"+j.toString(),"_blank"),children:r("1-click open issue")})]})]})}function ss(i){const{isOpen:a,onClose:n}=i,{t}=f(),[d,c]=p.useState([]),[l,r]=p.useState([]),[h,u]=p.useState({}),[m,j]=p.useState(""),[s,o]=p.useState(""),[L,C]=p.useState(!1),[T,D]=p.useState(!1),{countryList:H}=g(U=>U.app),v=g(U=>U.ticket),ne=S.getCountryEntry(v),ae=S.getCityEntry(v),ie=S.getPalettes(v);p.useEffect(()=>{a?(c(S.getCountryErrors(v)),r(S.getCityErrors(v,H)),u(S.getLineErrors(v,H))):(C(!1),j(""),o(""),D(!1))},[a]);const V=d.length>0||l.length>0||Object.values(h).flat().length>0,E=V&&!L,I=!E&&!T,oe=()=>{!E&&!I&&y.storage.remove(N),n()};return e.jsxs($,{blockScrollOnMount:!1,isOpen:a,onClose:n,scrollBehavior:"inside",children:[e.jsx(Q,{}),e.jsxs(W,{children:[e.jsx(X,{children:t("Submit palettes")}),e.jsx(Z,{onClick:oe}),E&&e.jsx(Xe,{countryErrors:d,cityErrors:l,lineErrors:h,onIgnore:()=>C(!0),onClose:n}),I&&e.jsx(Ze,{refLink:m,onRefLinkChange:j,justification:s,onJustificationChange:o,onPrev:V?()=>C(!1):void 0,onNext:()=>D(!0)}),!E&&!I&&e.jsx(es,{countryEntry:ne,cityEntry:ae,paletteList:ie,refLink:m,justification:s,onPrev:()=>D(!1)})]})]})}function ts(i){const{isOpen:a,onClose:n,incomingState:t}=i,{t:d}=f(),c=w(),l=()=>{y.storage.remove(N),n()},r=()=>{t&&c(ee(t)),n()};return e.jsxs($,{isOpen:a,onClose:n,children:[e.jsx(Q,{}),e.jsxs(W,{children:[e.jsx(X,{children:d("Unsaved draft")}),e.jsx(Z,{}),e.jsx(O,{children:d("Do you want to continue with your last unsaved ticket?")}),e.jsx(P,{children:e.jsxs(F,{children:[e.jsx(x,{onClick:l,children:d("Discard")}),e.jsx(x,{colorScheme:"primary",onClick:r,children:d("Continue")})]})})]})]})}function cs(){const{t:i}=f(),a=w(),n=he(),{isDataLoading:t}=g(s=>s.app),[d,c]=p.useState(),[l,r]=p.useState(!1),[h,u]=p.useState(!1);p.useEffect(()=>{const s=y.storage.get(N);if(s)try{const o=JSON.parse(s);Object.keys(o.lines).length>0&&Object.values(o.lines)[0].id&&(c(o),r(!0))}catch(o){console.error("TicketView:: unable to restore draft ticket",s)}},[]);const m=()=>{y.isStandaloneWindow()?n("/"):y.openApp("rmg-palette")},j=()=>{a(ee()),y.storage.remove(N),y.event(Je.RESET_TICKET,{})};return e.jsxs(Fe,{alignSelf:"center",sx:{width:{base:"100%",md:520}},children:[t&&e.jsx(Be,{isIndeterminate:!0}),e.jsxs(_,{direction:"column",flex:1,overflowY:"auto",children:[e.jsx(Ye,{}),e.jsx($e,{}),e.jsx(We,{})]}),e.jsxs(_,{my:2,children:[e.jsx(x,{size:"sm",onClick:m,children:i("Go back")}),e.jsxs(F,{ml:"auto",children:[e.jsx(x,{size:"sm",variant:"outline",onClick:j,children:i("Reset")}),e.jsx(x,{size:"sm",colorScheme:"primary",onClick:()=>u(!0),children:i("Submit")})]})]}),e.jsx(ts,{isOpen:l,onClose:()=>r(!1),incomingState:d}),e.jsx(ss,{isOpen:h,onClose:()=>u(!1)})]})}export{cs as default};
