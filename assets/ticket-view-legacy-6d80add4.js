!function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,a,c=[],u=!0,l=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=i.call(n)).done)&&(c.push(r.value),c.length!==t);u=!0);}catch(s){l=!0,o=s}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return c}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function r(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */r=function(){return t};var t={},n=Object.prototype,o=n.hasOwnProperty,i=Object.defineProperty||function(e,t,n){e[t]=n.value},a="function"==typeof Symbol?Symbol:{},c=a.iterator||"@@iterator",u=a.asyncIterator||"@@asyncIterator",l=a.toStringTag||"@@toStringTag";function s(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(R){s=function(e,t,n){return e[t]=n}}function f(e,t,n,r){var o=t&&t.prototype instanceof p?t:p,a=Object.create(o.prototype),c=new S(r||[]);return i(a,"_invoke",{value:k(e,n,c)}),a}function h(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(R){return{type:"throw",arg:R}}}t.wrap=f;var d={};function p(){}function y(){}function v(){}var g={};s(g,c,(function(){return this}));var m=Object.getPrototypeOf,b=m&&m(m(L([])));b&&b!==n&&o.call(b,c)&&(g=b);var w=v.prototype=p.prototype=Object.create(g);function C(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function x(t,n){function r(i,a,c,u){var l=h(t[i],t,a);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==e(f)&&o.call(f,"__await")?n.resolve(f.__await).then((function(e){r("next",e,c,u)}),(function(e){r("throw",e,c,u)})):n.resolve(f).then((function(e){s.value=e,c(s)}),(function(e){return r("throw",e,c,u)}))}u(l.arg)}var a;i(this,"_invoke",{value:function(e,t){function o(){return new n((function(n,o){r(e,t,n,o)}))}return a=a?a.then(o,o):o()}})}function k(e,t,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return P()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=E(a,n);if(c){if(c===d)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=h(e,t,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===d)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}function E(e,t){var n=t.method,r=e.iterator[n];if(void 0===r)return t.delegate=null,"throw"===n&&e.iterator.return&&(t.method="return",t.arg=void 0,E(e,t),"throw"===t.method)||"return"!==n&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+n+"' method")),d;var o=h(r,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,d;var i=o.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,d):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,d)}function j(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function O(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function S(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(j,this),this.reset(!0)}function L(e){if(e){var t=e[c];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,r=function t(){for(;++n<e.length;)if(o.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return r.next=r}}return{next:P}}function P(){return{value:void 0,done:!0}}return y.prototype=v,i(w,"constructor",{value:v,configurable:!0}),i(v,"constructor",{value:y,configurable:!0}),y.displayName=s(v,l,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===y||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,v):(e.__proto__=v,s(e,l,"GeneratorFunction")),e.prototype=Object.create(w),e},t.awrap=function(e){return{__await:e}},C(x.prototype),s(x.prototype,u,(function(){return this})),t.AsyncIterator=x,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new x(f(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},C(w),s(w,l,"Generator"),s(w,c,(function(){return this})),s(w,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),n=[];for(var r in t)n.push(r);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=L,S.prototype={constructor:S,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!e)for(var t in this)"t"===t.charAt(0)&&o.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(n,r){return a.type="throw",a.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),u=o.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),O(n),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;O(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:L(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),d}},t}function o(e,t,n,r,o,i,a){try{var c=e[i](a),u=c.value}catch(l){return void n(l)}c.done?t(u):Promise.resolve(u).then(r,o)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var a=e.apply(t,n);function c(e){o(a,r,i,c,u,"next",e)}function u(e){o(a,r,i,c,u,"throw",e)}c(void 0)}))}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(t,n,r){return(n=function(t){var n=function(t,n){if("object"!==e(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,n||"default");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(t)}(t,"string");return"symbol"===e(n)?n:String(n)}(n))in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}System.register(["./vendor-legacy-4f2f5b7f.js","./index.esm-legacy-30cf8529.js","./index-legacy-bc343687.js"],(function(e,n){"use strict";var o,a,l,s,f,h,d,p,y,v,g,m,b,w,C,x,k,E,j,O,S,L,P,R,I,z,A,N,_,T,G,U,q,B,D,F,J,M,W,Y,K,H,V,$,X,Z,Q,ee,te,ne,re,oe,ie,ae,ce,ue,le,se,fe,he,de,pe,ye,ve,ge,me,be,we,Ce,xe,ke,Ee,je,Oe,Se,Le;return{setters:[function(e){o=e.h,a=e.l,l=e.W,s=e.j,f=e.E,h=e.D,d=e.S,p=e.X,y=e.L,v=e.b,g=e.z,m=e.H,b=e.o,w=e.Y,C=e.Z,x=e.M,k=e.K,E=e._,j=e.O,O=e.$,S=e.F,L=e.a0,P=e.a1,R=e.a2,I=e.a3,z=e.a4,A=e.a5,N=e.a6,_=e.a7,T=e.a8,G=e.a9,U=e.aa,q=e.ab,B=e.ac,D=e.ad,F=e.y,J=e.U,M=e.r},function(e){W=e.a,Y=e.b,K=e.u,H=e.M,V=e.c,$=e.d,X=e.e,Z=e.f},function(e){Q=e.t,ee=e.b,te=e.a,ne=e.u,re=e.c,oe=e.d,ie=e.e,ae=e.f,ce=e.g,ue=e.r,le=e.h,se=e.i,fe=e.j,he=e.k,de=e.l,pe=e.m,ye=e.n,ve=e.o,ge=e.q,me=e.v,be=e.w,we=e.x,Ce=e.y,xe=e.z,ke=e.I,Ee=e.G,je=e.A,Oe=e.B,Se=e.C,Le=e.E}],execute:function(){function n(e){var t,n=e.onUpdate,r=e.onAdd,i=e.onRemove,v=null!==(t=e.entries)&&void 0!==t?t:Q.getInitialState(),g=o().t,m=function(e){var t=ee.selectById(v,e);if(!t)return[];var r=t.lang,o=t.name,i=Object.entries(y).reduce((function(e,t){return t[1]!==r&&t[1]in v?e:c(c({},e),{},u({},t[1],t[0]))}),{});return[{type:"select",label:g("Language"),value:r,options:i,onChange:function(t){return n(e,{lang:t})}},{type:"input",label:g("Name"),value:o,onChange:function(t){return n(e,{name:t})},validator:function(e){return""!==e}}]},b=function(){var e=Object.values(y).filter((function(e){return!Object.values(v.entities).find((function(t){return(null==t?void 0:t.lang)===e}))}))[0];r(e)};return a(l,{direction:"column",children:ee.selectIds(v).map((function(e,t){return s(f,{sx:{"& > div:first-of-type":{flex:1}},"data-testid":"entry-card-stack-"+e,children:[a(h,{fields:m(e),noLabel:t>0}),t===v.ids.length-1?a(d,{size:"sm",variant:"ghost","aria-label":g("Add a name in another language"),title:g("Add a name in another language"),onClick:b,icon:a(W,{})}):a(p,{minW:8}),a(d,{size:"sm",variant:"ghost","aria-label":g("Remove this name"),title:g("Remove this name"),onClick:function(){return i(e)},icon:a(Y,{})})]},e)}))})}function Pe(){var e=o(),t=e.t,r=e.i18n,i=K(),l=te(),f=ne((function(e){return e.ticket})),d=f.country,b=f.newCountry,w=f.countryName,C=f.newCountryLang,x=c(c({},v.map((function(e){return[e.id,i(e.name)]})).sort((function(e,t){return e[1].localeCompare(t[1],r.languages[0])})).reduce((function(e,t){return t[0]===g.UN?e:c(c({},e),{},u({},t[0],t[1]))}),{})),{},{new:t("Add a country/region...")}),k=Object.entries(y).reduce((function(e,t){return c(c({},e),{},u({},t[1],t[0]))}),{"":t("Please select...")}),E=[{type:"select",label:t("Country / Region"),value:d,options:x,onChange:function(e){return l(re(e))}},{type:"input",label:t("Country/region code"),placeholder:"e.g. CN, HK, JP (ISO 3166-1 alpha-2)",value:b,onChange:function(e){return l(oe(e))},hidden:"new"!==d},{type:"select",label:t("Offical language"),value:C,options:k,onChange:function(e){return l(ie(e||void 0))},hidden:"new"!==d}];return s(p,{as:"section",children:[a(m,{as:"h5",size:"sm",mb:2,children:t("Country / Region")}),a(h,{fields:E}),"new"===d&&a(n,{entries:w,onUpdate:function(e,t){return l(ae({id:e,changes:t}))},onAdd:function(e){return l(ce(e))},onRemove:function(e){return l(ue(e))}})]})}function Re(){var e=o().t,t=te(),r=ne((function(e){return e.ticket})),i=r.city,c=r.cityName,u=[{type:"input",label:e("City code"),placeholder:"e.g. hongkong, guangzhou, shanghai",value:i,onChange:function(e){return t(le(e))},validator:function(e){return""!==e&&!e.match(/[^a-z]/)}}];return s(p,{as:"section",children:[a(m,{as:"h5",size:"sm",mt:3,mb:2,children:e("City")}),a(h,{fields:u}),a(n,{entries:c,onUpdate:function(e,n){return t(se({id:e,changes:n}))},onAdd:function(e){return t(fe(e))},onRemove:function(e){return t(he(e))}})]})}e("default",(function(){var e=o().t,n=te(),r=F(),i=t(b.useState(!1),2),c=i[0],u=i[1];return s(J,{px:2,pt:2,sx:{width:{base:"100%",md:520}},children:[s(E,{direction:"column",flex:1,overflowY:"auto",children:[a(Pe,{}),a(Re,{}),a(_e,{})]}),s(E,{my:2,children:[a(S,{size:"sm",onClick:function(){return r("/")},children:e("Go back")}),s(f,{ml:"auto",children:[a(S,{size:"sm",variant:"outline",onClick:function(){n(Se()),M.event(Le.RESET_TICKET,{})},children:e("Reset")}),a(S,{size:"sm",colorScheme:"primary",onClick:function(){return u(!0)},children:e("Submit")})]})]}),a(Be,{isOpen:c,onClose:function(){return u(!1)}})]})}));var Ie=function(e){return'{ getColor(code:"'.concat(e,'") { code, rgb { r g b }, hex, cmyk { c m y k } } }')},ze=function(){var e=i(r().mark((function e(t,n){var o,i;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://4n6dg5ccsfct3lzfssu34boemq.appsync-api.us-east-1.amazonaws.com/graphql",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":"da2-sa3lsp2tkzhj3c2ysxbdprl73e"},body:JSON.stringify({query:Ie(t)}),signal:n});case 2:return o=e.sent,e.next=5,o.json();case 5:return i=e.sent,e.abrupt("return","#"+i.data.getColor.hex);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();function Ae(e){var t=e.ready,n=e.onReady,r=o().t;return b.useEffect((function(){var e=new AbortController;return ze("130 C",e.signal).then((function(e){return n(!!e)})).catch((function(){return n(!1)})),function(){e.abort()}}),[]),a(w,{as:"i",fontSize:"xs",children:void 0===t?r("Checking Pantone service availability..."):t?r("Pantone service is ready")+" ✅":r("Pantone service is not available")+" ⚠️"})}function Ne(e){var n,c=e.entryId,l=e.pantoneReady,s=o().t,f=te(),d=ne((function(e){return e.ticket.lines})),p=d[c],y=t(b.useState("hex"),2),v=y[0],g=y[1],m=t(b.useState(""),2),w=m[0],E=m[1],j=b.useRef(new AbortController);b.useEffect((function(){j.current.abort();var e=d[c];null!=e&&e.pantone?(E(e.pantone),g("pantone")):(E(""),g("hex"))}),[c]);var O=function(){var e=i(r().mark((function e(t){var n,o;return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(j.current.abort(),p&&l){e.next=3;break}return e.abrupt("return");case 3:return j.current=new AbortController,e.prev=4,e.next=7,ze(t,j.current.signal);case 7:n=e.sent,f(ve({entryId:c,pantone:t,hex:n})),E(t),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(4),k.flushSync((function(){E(t)})),E(null!==(o=p.pantone)&&void 0!==o?o:"");case 16:case"end":return e.stop()}}),e,null,[[4,12]])})));return function(t){return e.apply(this,arguments)}}(),S=[{label:"RGB",value:"hex"},{label:s("Pantone"),value:"pantone"}],L=[{type:"input",label:s("Line code"),placeholder:"e.g. twl, gz1, sh1",value:p.id,onChange:function(e){return f(de({entryId:c,lineId:e}))},validator:function(e){return""!==e&&!e.match(/[^a-z0-9]/)}},{type:"custom",label:s("Colour mode"),component:a(C,{selections:S,defaultValue:v,onChange:function(e){return g(e)}}),hidden:!l},{type:"input",label:s("Background colour"),variant:"color",value:p.colour,onChange:function(e){return f(pe({entryId:c,bgColour:e}))},hidden:l&&"pantone"===v},{type:"input",label:s("Pantone code"),value:w,onChange:O,debouncedDelay:1500,hidden:!l||"pantone"!==v},{type:"select",label:s("Foreground colour"),value:p.fg,options:(n={},u(n,x.white,s("White")),u(n,x.black,s("Black")),n),onChange:function(e){return f(ye({entryId:c,fgColour:e}))}}];return a(h,{fields:L})}function _e(){var e,r=o().t,i=K(),l=te(),h=ne((function(e){return e.ticket.lines})),y=t(b.useState(Object.keys(h)[0]),2),v=y[0],g=y[1],w=t(b.useState(),2),C=w[0],x=w[1];return s(p,{as:"section",children:[s(E,{mt:3,mb:2,alignItems:"center",children:[a(m,{as:"h5",size:"sm",mr:"auto",children:r("Lines")}),a(Ae,{ready:C,onReady:x})]}),s(f,{flexWrap:"wrap",sx:{"& .chakra-badge":{mb:1}},children:[Object.entries(h).map((function(e){var n=t(e,2),o=n[0],f=n[1],h=ee.selectAll(f.nameEntity).reduce((function(e,t){return c(c({},e),{},u({},t.lang,t.name))}),{}),p=i(h);return a(j,{name:p,bg:f.colour,fg:f.fg,actions:s(O,{children:[a(d,{size:"xs",variant:"ghost",color:f.fg,"aria-label":r("Edit")+" "+p,title:r("Edit")+" "+p,icon:a(H,{}),onClick:function(){return g(o)}}),a(d,{size:"xs",variant:"ghost",color:f.fg,"aria-label":r("Copy")+" "+p,title:r("Copy")+" "+p,icon:a(V,{}),onClick:function(){return l(ge(o))}}),a(d,{size:"xs",variant:"ghost",color:f.fg,"aria-label":r("Remove")+" "+p,title:r("Remove")+" "+p,icon:a(Y,{}),onClick:function(){return l(me(o))}})]})},o)})),a(S,{size:"xs",variant:"ghost",leftIcon:a(W,{}),ml:"auto !important",onClick:function(){return l(be())},children:r("Add a line")})]}),h[v]&&a(Ne,{entryId:v,pantoneReady:C}),a(n,{entries:null===(e=h[v])||void 0===e?void 0:e.nameEntity,onUpdate:function(e,t){return l(we({entryId:v,id:e,changes:t}))},onAdd:function(e){return l(Ce({entryId:v,lang:e}))},onRemove:function(e){return l(xe({entryId:v,id:e}))}})]})}function Te(e){var n=e.countryErrors,r=e.cityErrors,i=e.lineErrors,c=e.onIgnore,u=e.onClose,l=o().t,h=K();return s(O,{children:[s(L,{children:[a(w,{children:l("Your inputs contain the following errors. Please consider fixing it before submitting.")}),n.length>0&&s(O,{children:[a(m,{as:"h5",size:"sm",my:2,children:l("Country / Region")}),a(P,{"aria-label":"List of country errors",children:n.map((function(e,t){return a(R,{children:h(ke[e])},t)}))})]}),r.length>0&&s(O,{children:[a(m,{as:"h5",size:"sm",my:2,children:l("City")}),a(P,{"aria-label":"List of city errors",children:r.map((function(e,t){return a(R,{children:h(ke[e])},t)}))})]}),Object.values(i).flat().length>0&&s(O,{children:[a(m,{as:"h5",size:"sm",my:2,children:l("Lines")}),a(P,{"aria-label":"List of line errors",children:Object.entries(i).map((function(e){var n=t(e,2),r=n[0],o=n[1];return s(R,{children:[r,a(P,{children:o.map((function(e,t){return a(R,{children:h(ke[e])},t)}))})]},r)}))})]})]}),a(I,{children:s(f,{children:[a(S,{onClick:c,children:l("Submit anyway")}),a(S,{colorScheme:"primary",onClick:u,children:l("Go back")})]})})]})}var Ge=function(e){var t;return!(null===(t=e.match(/^https?:\/\//))||void 0===t||!t[0])};function Ue(e){var t=e.refLink,n=e.onRefLinkChange,r=e.justification,i=e.onJustificationChange,c=e.onPrev,u=e.onNext,l=o().t,f=[{type:"input",value:t,label:l("Reference link"),placeholder:l("Enter a valid URL"),onChange:n,validator:Ge},{type:"textarea",value:r,label:l("Justification"),placeholder:l("Briefly describe your changes and provide justification"),onChange:i}],d=!t||!r||!Ge(t);return s(O,{children:[s(L,{children:[a(w,{children:l("Please provide suitable source and justification.")}),a(h,{fields:f,minW:"full"})]}),s(I,{children:[c&&a(S,{variant:"ghost",onClick:c,mr:"auto",leftIcon:a($,{}),children:l("Previous")}),a(S,{colorScheme:"primary",onClick:u,rightIcon:a(X,{}),isDisabled:d,children:l("Next")})]})]})}function qe(e){var t,n,c=e.countryEntry,u=e.cityEntry,l=e.paletteList,f=e.refLink,h=e.justification,d=e.onPrev,p=o().t,y=z("primary.500","primary.300"),v=b.useRef(null),g=["**Reference link:** ".concat(f||"(REPLACE ME)"),"**Justification:** ".concat(h||"(REPLACE ME)"),Ee,je("country",c),je("city",u),je("lines",l)].join("\n\n"),m=new URLSearchParams({template:"new-palettes-request.md",labels:"resources",title:"Resources: New palettes of "+(null==u||null===(t=u.name)||void 0===t?void 0:t.en),body:g}),C=new URLSearchParams({template:"new-palettes-request.md",labels:"resources",title:"Resources: New palettes of "+(null==u||null===(n=u.name)||void 0===n?void 0:n.en)}),x=function(){var e=i(r().mark((function e(){return r().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null==v||!v.current){e.next=4;break}return v.current.select(),e.next=4,navigator.clipboard.writeText(g);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return s(O,{children:[s(L,{children:[a(w,{children:p("If the button below doesn't work for you, please follow the instructions below:")}),s(A,{children:[s(R,{children:[p("Open")," ",s(N,{color:y,href:"https://github.com/railmapgen/rmg-palette/issues/new?"+C.toString(),isExternal:!0,children:["Issue: New Palettes Request ",a(_,{as:Z})]})]}),s(R,{children:[p("Paste following text to the issue body")," ",a(S,{size:"xs",leftIcon:a(V,{}),onClick:x,children:p("Copy")}),a(T,{ref:v,isReadOnly:!0,defaultValue:g,onClick:function(e){return e.target.select()}})]})]})]}),s(I,{children:[a(S,{variant:"ghost",onClick:d,mr:"auto",leftIcon:a($,{}),children:p("Previous")}),a(S,{colorScheme:"primary",onClick:function(){return window.open("https://github.com/railmapgen/rmg-palette/issues/new?"+m.toString(),"_blank")},children:p("1-click open issue")})]})]})}function Be(e){var n=e.isOpen,r=e.onClose,i=o().t,c=t(b.useState([]),2),u=c[0],l=c[1],f=t(b.useState([]),2),h=f[0],d=f[1],p=t(b.useState({}),2),y=p[0],v=p[1],g=t(b.useState(""),2),m=g[0],w=g[1],C=t(b.useState(""),2),x=C[0],k=C[1],E=t(b.useState(!1),2),j=E[0],O=E[1],S=t(b.useState(!1),2),L=S[0],P=S[1],R=ne((function(e){return e.ticket})),I=Oe.getCountryEntry(R),z=Oe.getCityEntry(R),A=Oe.getPalettes(R);b.useEffect((function(){n?(l(Oe.getCountryErrors(R)),d(Oe.getCityErrors(R)),v(Oe.getLineErrors(R))):(O(!1),w(""),k(""),P(!1))}),[n]);var N=u.length>0||h.length>0||Object.values(y).flat().length>0,_=N&&!j,T=!_&&!L;return s(G,{blockScrollOnMount:!1,isOpen:n,onClose:r,scrollBehavior:"inside",children:[a(U,{}),s(q,{children:[a(B,{children:i("Submit palettes")}),a(D,{}),_&&a(Te,{countryErrors:u,cityErrors:h,lineErrors:y,onIgnore:function(){return O(!0)},onClose:r}),T&&a(Ue,{refLink:m,onRefLinkChange:w,justification:x,onJustificationChange:k,onPrev:N?function(){return O(!1)}:void 0,onNext:function(){return P(!0)}}),!_&&!T&&a(qe,{countryEntry:I,cityEntry:z,paletteList:A,refLink:m,justification:x,onPrev:function(){return P(!1)}})]})]})}}}}))}();
