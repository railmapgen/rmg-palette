import{j as e,e as E,N as A,B as L,r as x,C as y,f as i,G as T,F as C,g as N,S as w,A as j,h as I,i as S,M,k as H,L as P,m as k}from"./mantine-BKUBcjGe.js";import{l as f,j as B,r as D}from"./react-DXyAvNqt.js";import{u as g,s as G,E as R,M as O}from"./index-Bod-0Tca.js";import{u as v}from"./use-translated-name-OVD1BDsz.js";import{u as z}from"./use-palette-DPnYDHkA.js";import{c as p}from"./palette-card.module-BXpITapC.js";function F(){const{t:s,i18n:o}=f(),{translateName:n}=v(),r=B(),{countryList:d,selectedCountry:l}=g(t=>t.app),c=[{label:s("Please select..."),value:"",disabled:!0},...d.filter(t=>t.id!=="UN").map(t=>[t.id,n(t.name)]).sort((t,m)=>t[1].localeCompare(m[1],o.languages[0])).map(([t,m])=>({label:m,value:t}))],u=()=>{x.openApp({appId:"rmg-palette-upload"}),x.event(R.ADD_CITY,{})};return e.jsxs(E,{children:[e.jsx(A,{label:s("Country/Region"),value:l,onChange:({currentTarget:{value:t}})=>r(G(t)),data:c}),e.jsx(L,{variant:"filled",ml:"auto",onClick:u,children:s("Add a city")})]})}const U="_root_180oh_1",V="_control_180oh_8",b={root:U,control:V,"official-names":"_official-names_180oh_15"},Y=s=>{const[,o,n,r]=s.match(/^#(\w{2})(\w{2})(\w{2})$/)??[];return[+("0x"+o),+("0x"+n),+("0x"+r)]};function $({line:s}){const{t:o}=f(),{translateName:n,otherOfficialNames:r}=v(),{countryList:d,selectedCountry:l}=g(t=>t.app),c=d.find(({id:t})=>t===l),u=s.fg===O.black?"black":"white";return e.jsxs(y,{className:p.card,withBorder:!0,children:[e.jsxs(y.Section,{bg:s.colour,className:p["card-section"],style:{color:u},children:[e.jsx(i,{span:!0,children:n(s.name)}),e.jsx(i,{span:!0,children:r(s.name,c==null?void 0:c.languages)})]}),e.jsxs(T,{gap:"xs",mt:"sm",children:[e.jsxs(C,{className:p.output,children:[e.jsx(i,{c:"dimmed",size:"sm",span:!0,children:o("HEX")}),e.jsx(N,{children:s.colour.toUpperCase()})]}),e.jsxs(C,{className:p.output,children:[e.jsx(i,{c:"dimmed",size:"sm",span:!0,children:o("RGB")}),e.jsx(N,{children:Y(s.colour).join(", ")})]}),s.pantone&&e.jsxs(C,{className:p.output,children:[e.jsx(i,{c:"dimmed",size:"sm",span:!0,children:o("Pantone® code")}),e.jsx(N,{children:s.pantone})]})]})]},s.id)}function X({cityCode:s}){const o=z(s);return e.jsx(w,{cols:{base:1,xs:2,sm:3,md:4,lg:5,xl:6},children:o.map(n=>e.jsx($,{line:n},n.id))})}function q(){const{t:s}=f(),{translateName:o,otherOfficialNames:n}=v(),{cityList:r,countryList:d,selectedCountry:l}=g(a=>a.app),c=d.find(({id:a})=>a===l),u=r.filter(a=>a.country===l),t=D.useRef({}),m=a=>{a&&setTimeout(()=>{var h;(h=t.current[a])==null||h.scrollIntoView({behavior:"smooth"})},200)},_=async a=>{x.closeApp("rmg-palette-upload"),setTimeout(()=>{x.openApp({appId:"rmg-palette-upload",hash:"/new?city="+a})},200),x.event(R.EDIT_CITY,{city:a})};return e.jsx(j,{chevronPosition:"left",classNames:{root:b.root},onChange:m,children:u.map(a=>(t.current={},e.jsxs(j.Item,{ref:h=>{t.current[a.id]=h},value:a.id,children:[e.jsxs(I,{className:b.control,children:[e.jsxs(j.Control,{children:[o(a.name),e.jsx(i,{span:!0,className:b["official-names"],children:n(a.name,c==null?void 0:c.languages)})]}),e.jsx(S,{variant:"default",ml:"xs",mr:"md","aria-label":s("Edit"),title:s("Edit"),onClick:()=>_(a.id),children:e.jsx(M,{})})]}),e.jsx(j.Panel,{children:e.jsx(X,{cityCode:a.id})})]},a.id)))})}function se(){const{t:s}=f(),{isDataLoading:o,selectedCountry:n}=g(r=>r.app);return e.jsxs(H,{children:[e.jsx(P,{visible:o}),e.jsx(F,{}),e.jsxs(k,{children:[e.jsx(P,{visible:!n,loaderProps:{children:s("Select a country or region to begin.")}}),e.jsx(q,{})]})]})}export{se as default};
