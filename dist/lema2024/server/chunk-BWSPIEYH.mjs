import './polyfills.server.mjs';
import{a as me,b as be,g as Ve,j as u}from"./chunk-H6KHSOBK.mjs";var We={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};var _e=function(t){let e=[],n=0;for(let i=0;i<t.length;i++){let r=t.charCodeAt(i);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},Je=function(t){let e=[],n=0,i=0;for(;n<t.length;){let r=t[n++];if(r<128)e[i++]=String.fromCharCode(r);else if(r>191&&r<224){let s=t[n++];e[i++]=String.fromCharCode((r&31)<<6|s&63)}else if(r>239&&r<365){let s=t[n++],o=t[n++],l=t[n++],a=((r&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[i++]=String.fromCharCode(55296+(a>>10)),e[i++]=String.fromCharCode(56320+(a&1023))}else{let s=t[n++],o=t[n++];e[i++]=String.fromCharCode((r&15)<<12|(s&63)<<6|o&63)}}return e.join("")},Ee={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<t.length;r+=3){let s=t[r],o=r+1<t.length,l=o?t[r+1]:0,a=r+2<t.length,c=a?t[r+2]:0,h=s>>2,d=(s&3)<<4|l>>4,b=(l&15)<<2|c>>6,_=c&63;a||(_=64,o||(b=64)),i.push(n[h],n[d],n[b],n[_])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(_e(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Je(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();let n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<t.length;){let s=n[t.charAt(r++)],l=r<t.length?n[t.charAt(r)]:0;++r;let c=r<t.length?n[t.charAt(r)]:64;++r;let d=r<t.length?n[t.charAt(r)]:64;if(++r,s==null||l==null||c==null||d==null)throw new V;let b=s<<2|l>>4;if(i.push(b),c!==64){let _=l<<4&240|c>>2;if(i.push(_),d!==64){let pe=c<<6&192|d;i.push(pe)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},V=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Ge=function(t){let e=_e(t);return Ee.encodeByteArray(e,!0)},B=function(t){return Ge(t).replace(/\./g,"")},Ke=function(t){try{return Ee.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function T(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:let n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(let n in e)!e.hasOwnProperty(n)||!Ye(n)||(t[n]=T(t[n],e[n]));return t}function Ye(t){return t!=="__proto__"}function Xe(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var qe=()=>Xe().__FIREBASE_DEFAULTS__,Qe=()=>{if(typeof process>"u"||typeof process.env>"u")return;let t=process.env.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Ze=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=t&&Ke(t[1]);return e&&JSON.parse(e)},J=()=>{try{return qe()||Qe()||Ze()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},pn=t=>{var e,n;return(n=(e=J())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]};var G=()=>{var t;return(t=J())===null||t===void 0?void 0:t.config};var M=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}};function mn(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let n={alg:"none",type:"JWT"},i=e||"demo-project",r=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[B(JSON.stringify(n)),B(JSON.stringify(o)),""].join(".")}function ye(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function bn(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ye())}function et(){var t;let e=(t=J())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function P(){return typeof self=="object"&&self.self===self}function gn(){let t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function _n(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function En(){let t=ye();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function yn(){return!et()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ve(){try{return typeof indexedDB=="object"}catch{return!1}}function we(){return new Promise((t,e)=>{try{let n=!0,i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var s;e(((s=r.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}function vn(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}var tt="FirebaseError",v=class t extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=tt,Object.setPrototypeOf(this,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,w.prototype.create)}},w=class{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){let i=n[0]||{},r=`${this.service}/${e}`,s=this.errors[e],o=s?nt(s,i):"Error",l=`${this.serviceName}: ${o} (${r}).`;return new v(r,l,i)}};function nt(t,e){return t.replace(rt,(n,i)=>{let r=e[i];return r!=null?String(r):`<${i}?>`})}var rt=/\{\$([^}]+)}/g;function K(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function wn(t){for(let e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function F(t,e){if(t===e)return!0;let n=Object.keys(t),i=Object.keys(e);for(let r of n){if(!i.includes(r))return!1;let s=t[r],o=e[r];if(ge(s)&&ge(o)){if(!F(s,o))return!1}else if(s!==o)return!1}for(let r of i)if(!n.includes(r))return!1;return!0}function ge(t){return t!==null&&typeof t=="object"}function Dn(t){let e=[];for(let[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function In(t){let e={};return t.replace(/^\?/,"").split("&").forEach(i=>{if(i){let[r,s]=i.split("=");e[decodeURIComponent(r)]=decodeURIComponent(s)}}),e}function Cn(t){let e=t.indexOf("?");if(!e)return"";let n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function De(t,e){let n=new W(t,e);return n.subscribe.bind(n)}var W=class{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let r;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");it(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:i},r.next===void 0&&(r.next=U),r.error===void 0&&(r.error=U),r.complete===void 0&&(r.complete=U);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function it(t,e){if(typeof t!="object"||t===null)return!1;for(let n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function U(){}var An=4*60*60*1e3;function Sn(t){return t&&t._delegate?t._delegate:t}We.NODE_CLIENT=!0;var E=class{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var I="[DEFAULT]";var Y=class{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){let i=new M;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{let r=this.getOrInitializeService({instanceIdentifier:n});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;let i=this.normalizeInstanceIdentifier(e?.identifier),r=(n=e?.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ot(e))try{this.getOrInitializeService({instanceIdentifier:I})}catch{}for(let[n,i]of this.instancesDeferred.entries()){let r=this.normalizeInstanceIdentifier(n);try{let s=this.getOrInitializeService({instanceIdentifier:r});i.resolve(s)}catch{}}}}clearInstance(e=I){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}delete(){return u(this,null,function*(){let e=Array.from(this.instances.values());yield Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])})}isComponentSet(){return this.component!=null}isInitialized(e=I){return this.instances.has(e)}getOptions(e=I){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:i,options:n});for(let[s,o]of this.instancesDeferred.entries()){let l=this.normalizeInstanceIdentifier(s);i===l&&o.resolve(r)}return r}onInit(e,n){var i;let r=this.normalizeInstanceIdentifier(n),s=(i=this.onInitCallbacks.get(r))!==null&&i!==void 0?i:new Set;s.add(e),this.onInitCallbacks.set(r,s);let o=this.instances.get(r);return o&&e(o,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){let i=this.onInitCallbacks.get(n);if(i)for(let r of i)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:st(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=I){return this.component?this.component.multipleInstances?e:I:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function st(t){return t===I?void 0:t}function ot(t){return t.instantiationMode==="EAGER"}var R=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let n=new Y(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}};var ue={};Ve(ue,{FirebaseError:()=>v,SDK_VERSION:()=>le,_DEFAULT_ENTRY_NAME:()=>g,_addComponent:()=>x,_addOrOverwriteComponent:()=>ce,_apps:()=>D,_clearComponents:()=>Yt,_components:()=>O,_getProvider:()=>Fe,_isFirebaseApp:()=>$e,_isFirebaseServerApp:()=>Kt,_registerComponent:()=>N,_removeServiceInstance:()=>Gt,_serverApps:()=>S,deleteApp:()=>z,getApp:()=>Qt,getApps:()=>Zt,initializeApp:()=>H,initializeServerApp:()=>qt,onLog:()=>fe,registerVersion:()=>y,setLogLevel:()=>de});var X=[],f=function(t){return t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT",t}(f||{}),Ie={debug:f.DEBUG,verbose:f.VERBOSE,info:f.INFO,warn:f.WARN,error:f.ERROR,silent:f.SILENT},at=f.INFO,ct={[f.DEBUG]:"log",[f.VERBOSE]:"log",[f.INFO]:"info",[f.WARN]:"warn",[f.ERROR]:"error"},lt=(t,e,...n)=>{if(e<t.logLevel)return;let i=new Date().toISOString(),r=ct[e];if(r)console[r](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},A=class{constructor(e){this.name=e,this._logLevel=at,this._logHandler=lt,this._userLogHandler=null,X.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in f))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ie[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,f.DEBUG,...e),this._logHandler(this,f.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,f.VERBOSE,...e),this._logHandler(this,f.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,f.INFO,...e),this._logHandler(this,f.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,f.WARN,...e),this._logHandler(this,f.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,f.ERROR,...e),this._logHandler(this,f.ERROR,...e)}};function Ce(t){X.forEach(e=>{e.setLogLevel(t)})}function Ae(t,e){for(let n of X){let i=null;e&&e.level&&(i=Ie[e.level]),t===null?n.userLogHandler=null:n.userLogHandler=(r,s,...o)=>{let l=o.map(a=>{if(a==null)return null;if(typeof a=="string")return a;if(typeof a=="number"||typeof a=="boolean")return a.toString();if(a instanceof Error)return a.message;try{return JSON.stringify(a)}catch{return null}}).filter(a=>a).join(" ");s>=(i??r.logLevel)&&t({level:f[s].toLowerCase(),message:l,args:o,type:r.name})}}}var ft=(t,e)=>e.some(n=>t instanceof n),Se,Oe;function dt(){return Se||(Se=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ut(){return Oe||(Oe=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var xe=new WeakMap,Q=new WeakMap,Ne=new WeakMap,q=new WeakMap,ee=new WeakMap;function ht(t){let e=new Promise((n,i)=>{let r=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(m(t.result)),r()},o=()=>{i(t.error),r()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&xe.set(n,t)}).catch(()=>{}),ee.set(e,t),e}function pt(t){if(Q.has(t))return;let e=new Promise((n,i)=>{let r=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),r()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Q.set(t,e)}var Z={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Q.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Ne.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return m(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Be(t){Z=t(Z)}function mt(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){let i=t.call($(this),e,...n);return Ne.set(i,e.sort?e.sort():[e]),m(i)}:ut().includes(t)?function(...e){return t.apply($(this),e),m(xe.get(this))}:function(...e){return m(t.apply($(this),e))}}function bt(t){return typeof t=="function"?mt(t):(t instanceof IDBTransaction&&pt(t),ft(t,dt())?new Proxy(t,Z):t)}function m(t){if(t instanceof IDBRequest)return ht(t);if(q.has(t))return q.get(t);let e=bt(t);return e!==t&&(q.set(t,e),ee.set(e,t)),e}var $=t=>ee.get(t);function Re(t,e,{blocked:n,upgrade:i,blocking:r,terminated:s}={}){let o=indexedDB.open(t,e),l=m(o);return i&&o.addEventListener("upgradeneeded",a=>{i(m(o.result),a.oldVersion,a.newVersion,m(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),l.then(a=>{s&&a.addEventListener("close",()=>s()),r&&a.addEventListener("versionchange",c=>r(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}function Mn(t,{blocked:e}={}){let n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",i=>e(i.oldVersion,i)),m(n).then(()=>{})}var gt=["get","getKey","getAll","getAllKeys","count"],_t=["put","add","delete","clear"],te=new Map;function Te(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(te.get(e))return te.get(e);let n=e.replace(/FromIndex$/,""),i=e!==n,r=_t.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(r||gt.includes(n)))return;let s=function(o,...l){return u(this,null,function*(){let a=this.transaction(o,r?"readwrite":"readonly"),c=a.store;return i&&(c=c.index(l.shift())),(yield Promise.all([c[n](...l),r&&a.done]))[0]})};return te.set(e,s),s}Be(t=>be(me({},t),{get:(e,n,i)=>Te(e,n)||t.get(e,n,i),has:(e,n)=>!!Te(e,n)||t.has(e,n)}));var re=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Et(n)){let i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}};function Et(t){let e=t.getComponent();return e?.type==="VERSION"}var k="@firebase/app",ie="0.10.5";var C=new A("@firebase/app"),yt="@firebase/app-compat",vt="@firebase/analytics-compat",wt="@firebase/analytics",Dt="@firebase/app-check-compat",It="@firebase/app-check",Ct="@firebase/auth",At="@firebase/auth-compat",St="@firebase/database",Ot="@firebase/database-compat",xt="@firebase/functions",Nt="@firebase/functions-compat",Bt="@firebase/installations",Tt="@firebase/installations-compat",Rt="@firebase/messaging",Lt="@firebase/messaging-compat",Mt="@firebase/performance",Pt="@firebase/performance-compat",Ft="@firebase/remote-config",$t="@firebase/remote-config-compat",kt="@firebase/storage",jt="@firebase/storage-compat",Ht="@firebase/firestore",zt="@firebase/vertexai-preview",Ut="@firebase/firestore-compat",Vt="firebase",Wt="10.12.2";var g="[DEFAULT]",Jt={[k]:"fire-core",[yt]:"fire-core-compat",[wt]:"fire-analytics",[vt]:"fire-analytics-compat",[It]:"fire-app-check",[Dt]:"fire-app-check-compat",[Ct]:"fire-auth",[At]:"fire-auth-compat",[St]:"fire-rtdb",[Ot]:"fire-rtdb-compat",[xt]:"fire-fn",[Nt]:"fire-fn-compat",[Bt]:"fire-iid",[Tt]:"fire-iid-compat",[Rt]:"fire-fcm",[Lt]:"fire-fcm-compat",[Mt]:"fire-perf",[Pt]:"fire-perf-compat",[Ft]:"fire-rc",[$t]:"fire-rc-compat",[kt]:"fire-gcs",[jt]:"fire-gcs-compat",[Ht]:"fire-fst",[Ut]:"fire-fst-compat",[zt]:"fire-vertex","fire-js":"fire-js",[Vt]:"fire-js-all"};var D=new Map,S=new Map,O=new Map;function x(t,e){try{t.container.addComponent(e)}catch(n){C.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function ce(t,e){t.container.addOrOverwriteComponent(e)}function N(t){let e=t.name;if(O.has(e))return C.debug(`There were multiple attempts to register component ${e}.`),!1;O.set(e,t);for(let n of D.values())x(n,t);for(let n of S.values())x(n,t);return!0}function Fe(t,e){let n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Gt(t,e,n=g){Fe(t,e).clearInstance(n)}function $e(t){return t.options!==void 0}function Kt(t){return t.settings!==void 0}function Yt(){O.clear()}var Xt={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},p=new w("app","Firebase",Xt);var j=class{constructor(e,n,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new E("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw p.create("app-deleted",{appName:this._name})}};var se=class extends j{constructor(e,n,i,r){let s=n.automaticDataCollectionEnabled!==void 0?n.automaticDataCollectionEnabled:!1,o={name:i,automaticDataCollectionEnabled:s};if(e.apiKey!==void 0)super(e,o,r);else{let l=e;super(l.options,o,r)}this._serverConfig=Object.assign({automaticDataCollectionEnabled:s},n),this._finalizationRegistry=new FinalizationRegistry(()=>{this.automaticCleanup()}),this._refCount=0,this.incRefCount(this._serverConfig.releaseOnDeref),this._serverConfig.releaseOnDeref=void 0,n.releaseOnDeref=void 0,y(k,ie,"serverapp")}toJSON(){}get refCount(){return this._refCount}incRefCount(e){this.isDeleted||(this._refCount++,e!==void 0&&this._finalizationRegistry.register(e,this))}decRefCount(){return this.isDeleted?0:--this._refCount}automaticCleanup(){z(this)}get settings(){return this.checkDestroyed(),this._serverConfig}checkDestroyed(){if(this.isDeleted)throw p.create("server-app-deleted")}};var le=Wt;function H(t,e={}){let n=t;typeof e!="object"&&(e={name:e});let i=Object.assign({name:g,automaticDataCollectionEnabled:!1},e),r=i.name;if(typeof r!="string"||!r)throw p.create("bad-app-name",{appName:String(r)});if(n||(n=G()),!n)throw p.create("no-options");let s=D.get(r);if(s){if(F(n,s.options)&&F(i,s.config))return s;throw p.create("duplicate-app",{appName:r})}let o=new R(r);for(let a of O.values())o.addComponent(a);let l=new j(n,i,o);return D.set(r,l),l}function qt(t,e){if(P())throw p.create("invalid-server-app-environment");e.automaticDataCollectionEnabled===void 0&&(e.automaticDataCollectionEnabled=!1);let n;$e(t)?n=t.options:n=t;let i=Object.assign(Object.assign({},e),n);i.releaseOnDeref!==void 0&&delete i.releaseOnDeref;let r=c=>[...c].reduce((h,d)=>Math.imul(31,h)+d.charCodeAt(0)|0,0);if(e.releaseOnDeref!==void 0&&typeof FinalizationRegistry>"u")throw p.create("finalization-registry-not-supported",{});let s=""+r(JSON.stringify(i)),o=S.get(s);if(o)return o.incRefCount(e.releaseOnDeref),o;let l=new R(s);for(let c of O.values())l.addComponent(c);let a=new se(n,e,s,l);return S.set(s,a),a}function Qt(t=g){let e=D.get(t);if(!e&&t===g&&G())return H();if(!e)throw p.create("no-app",{appName:t});return e}function Zt(){return Array.from(D.values())}function z(t){return u(this,null,function*(){let e=!1,n=t.name;D.has(n)?(e=!0,D.delete(n)):S.has(n)&&t.decRefCount()<=0&&(S.delete(n),e=!0),e&&(yield Promise.all(t.container.getProviders().map(i=>i.delete())),t.isDeleted=!0)})}function y(t,e,n){var i;let r=(i=Jt[t])!==null&&i!==void 0?i:t;n&&(r+=`-${n}`);let s=r.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let l=[`Unable to register library "${r}" with version "${e}":`];s&&l.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),C.warn(l.join(" "));return}N(new E(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}function fe(t,e){if(t!==null&&typeof t!="function")throw p.create("invalid-log-argument");Ae(t,e)}function de(t){Ce(t)}var en="firebase-heartbeat-database",tn=1,L="firebase-heartbeat-store",ne=null;function ke(){return ne||(ne=Re(en,tn,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(L)}catch(n){console.warn(n)}}}}).catch(t=>{throw p.create("idb-open",{originalErrorMessage:t.message})})),ne}function nn(t){return u(this,null,function*(){try{let n=(yield ke()).transaction(L),i=yield n.objectStore(L).get(je(t));return yield n.done,i}catch(e){if(e instanceof v)C.warn(e.message);else{let n=p.create("idb-get",{originalErrorMessage:e?.message});C.warn(n.message)}}})}function Le(t,e){return u(this,null,function*(){try{let i=(yield ke()).transaction(L,"readwrite");yield i.objectStore(L).put(e,je(t)),yield i.done}catch(n){if(n instanceof v)C.warn(n.message);else{let i=p.create("idb-set",{originalErrorMessage:n?.message});C.warn(i.message)}}})}function je(t){return`${t.name}!${t.options.appId}`}var rn=1024,sn=30*24*60*60*1e3,oe=class{constructor(e){this.container=e,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new ae(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}triggerHeartbeat(){return u(this,null,function*(){var e,n;let r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Me();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=yield this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{let l=new Date(o.date).valueOf();return Date.now()-l<=sn}),this._storage.overwrite(this._heartbeatsCache)})}getHeartbeatsHeader(){return u(this,null,function*(){var e;if(this._heartbeatsCache===null&&(yield this._heartbeatsCachePromise),((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let n=Me(),{heartbeatsToSend:i,unsentEntries:r}=on(this._heartbeatsCache.heartbeats),s=B(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,yield this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s})}};function Me(){return new Date().toISOString().substring(0,10)}function on(t,e=rn){let n=[],i=t.slice();for(let r of t){let s=n.find(o=>o.agent===r.agent);if(s){if(s.dates.push(r.date),Pe(n)>e){s.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Pe(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}var ae=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}runIndexedDBEnvironmentCheck(){return u(this,null,function*(){return ve()?we().then(()=>!0).catch(()=>!1):!1})}read(){return u(this,null,function*(){if(yield this._canUseIndexedDBPromise){let n=yield nn(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}})}overwrite(e){return u(this,null,function*(){var n;if(yield this._canUseIndexedDBPromise){let r=yield this.read();return Le(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return})}add(e){return u(this,null,function*(){var n;if(yield this._canUseIndexedDBPromise){let r=yield this.read();return Le(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return})}};function Pe(t){return B(JSON.stringify({version:2,heartbeats:t})).length}function an(t){N(new E("platform-logger",e=>new re(e),"PRIVATE")),N(new E("heartbeat",e=>new oe(e),"PRIVATE")),y(k,ie,t),y(k,ie,"esm2017"),y("fire-js","")}an("");var he=class{constructor(e,n){this._delegate=e,this.firebase=n,x(e,new E("app-compat",()=>this,"PUBLIC")),this.container=e.container}get automaticDataCollectionEnabled(){return this._delegate.automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this._delegate.automaticDataCollectionEnabled=e}get name(){return this._delegate.name}get options(){return this._delegate.options}delete(){return new Promise(e=>{this._delegate.checkDestroyed(),e()}).then(()=>(this.firebase.INTERNAL.removeApp(this.name),z(this._delegate)))}_getService(e,n=g){var i;this._delegate.checkDestroyed();let r=this._delegate.container.getProvider(e);return!r.isInitialized()&&((i=r.getComponent())===null||i===void 0?void 0:i.instantiationMode)==="EXPLICIT"&&r.initialize(),r.getImmediate({identifier:n})}_removeServiceInstance(e,n=g){this._delegate.container.getProvider(e).clearInstance(n)}_addComponent(e){x(this._delegate,e)}_addOrOverwriteComponent(e){ce(this._delegate,e)}toJSON(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}}};var cn={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance."},He=new w("app-compat","Firebase",cn);function ln(t){let e={},n={__esModule:!0,initializeApp:s,app:r,registerVersion:y,setLogLevel:de,onLog:fe,apps:null,SDK_VERSION:le,INTERNAL:{registerComponent:l,removeApp:i,useAsService:a,modularAPIs:ue}};n.default=n,Object.defineProperty(n,"apps",{get:o});function i(c){delete e[c]}function r(c){if(c=c||g,!K(e,c))throw He.create("no-app",{appName:c});return e[c]}r.App=t;function s(c,h={}){let d=H(c,h);if(K(e,d.name))return e[d.name];let b=new t(d,n);return e[d.name]=b,b}function o(){return Object.keys(e).map(c=>e[c])}function l(c){let h=c.name,d=h.replace("-compat","");if(N(c)&&c.type==="PUBLIC"){let b=(_=r())=>{if(typeof _[d]!="function")throw He.create("invalid-app-argument",{appName:h});return _[d]()};c.serviceProps!==void 0&&T(b,c.serviceProps),n[d]=b,t.prototype[d]=function(..._){return this._getService.bind(this,h).apply(this,c.multipleInstances?_:[])}}return c.type==="PUBLIC"?n[d]:null}function a(c,h){return h==="serverAuth"?null:h}return n}function Ue(){let t=ln(he);t.INTERNAL=Object.assign(Object.assign({},t.INTERNAL),{createFirebaseNamespace:Ue,extendNamespace:e,createSubscribe:De,ErrorFactory:w,deepExtend:T});function e(n){T(t,n)}return t}var fn=Ue();var ze=new A("@firebase/app-compat"),dn="@firebase/app-compat",un="0.2.35";function hn(t){y(dn,un,t)}if(P()&&self.firebase!==void 0){ze.warn(`
    Warning: Firebase is already defined in the global scope. Please make sure
    Firebase library is only loaded once.
  `);let t=self.firebase.SDK_VERSION;t&&t.indexOf("LITE")>=0&&ze.warn(`
    Warning: You are trying to load Firebase while using Firebase Performance standalone script.
    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.
    `)}var Yn=fn;hn();export{Ee as a,Ke as b,pn as c,M as d,mn as e,ye as f,bn as g,et as h,gn as i,_n as j,En as k,yn as l,ve as m,we as n,vn as o,v as p,w as q,wn as r,F as s,Dn as t,In as u,Cn as v,De as w,Sn as x,E as y,f as z,A,Re as B,Mn as C,N as D,Fe as E,Kt as F,le as G,Qt as H,Zt as I,y as J,Yn as K};