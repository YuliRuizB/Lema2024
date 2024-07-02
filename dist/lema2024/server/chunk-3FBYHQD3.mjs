import './polyfills.server.mjs';
import{b as L,c as j,d as R}from"./chunk-2VTNENYZ.mjs";import{B as y,C as h,D as x,K as v,m as w,o as K,q as B,x as P,y as b}from"./chunk-BWSPIEYH.mjs";import{j as c}from"./chunk-H6KHSOBK.mjs";var H="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",Y="https://fcmregistrations.googleapis.com/v1",$="FCM_MSG",z="google.c.a.c_id",X=3,Z=1,T=function(e){return e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION",e}(T||{});var I=function(e){return e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked",e}(I||{});function p(e){let t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function ee(e){let t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),o=atob(n),i=new Uint8Array(o.length);for(let r=0;r<o.length;++r)i[r]=o.charCodeAt(r);return i}var k="fcm_token_details_db",te=5,F="fcm_token_object_Store";function ne(e){return c(this,null,function*(){if("databases"in indexedDB&&!(yield indexedDB.databases()).map(r=>r.name).includes(k))return null;let t=null;return(yield y(k,te,{upgrade:(o,i,r,a)=>c(this,null,function*(){var u;if(i<2||!o.objectStoreNames.contains(F))return;let f=a.objectStore(F),g=yield f.index("fcmSenderId").get(e);if(yield f.clear(),!!g){if(i===2){let s=g;if(!s.auth||!s.p256dh||!s.endpoint)return;t={token:s.fcmToken,createTime:(u=s.createTime)!==null&&u!==void 0?u:Date.now(),subscriptionOptions:{auth:s.auth,p256dh:s.p256dh,endpoint:s.endpoint,swScope:s.swScope,vapidKey:typeof s.vapidKey=="string"?s.vapidKey:p(s.vapidKey)}}}else if(i===3){let s=g;t={token:s.fcmToken,createTime:s.createTime,subscriptionOptions:{auth:p(s.auth),p256dh:p(s.p256dh),endpoint:s.endpoint,swScope:s.swScope,vapidKey:p(s.vapidKey)}}}else if(i===4){let s=g;t={token:s.fcmToken,createTime:s.createTime,subscriptionOptions:{auth:p(s.auth),p256dh:p(s.p256dh),endpoint:s.endpoint,swScope:s.swScope,vapidKey:p(s.vapidKey)}}}}})})).close(),yield h(k),yield h("fcm_vapid_details_db"),yield h("undefined"),oe(t)?t:null})}function oe(e){if(!e||!e.subscriptionOptions)return!1;let{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}var ie="firebase-messaging-database",re=1,l="firebase-messaging-store",_=null;function A(){return _||(_=y(ie,re,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(l)}}})),_}function M(e){return c(this,null,function*(){let t=O(e),o=yield(yield A()).transaction(l).objectStore(l).get(t);if(o)return o;{let i=yield ne(e.appConfig.senderId);if(i)return yield D(e,i),i}})}function D(e,t){return c(this,null,function*(){let n=O(e),i=(yield A()).transaction(l,"readwrite");return yield i.objectStore(l).put(t,n),yield i.done,t})}function se(e){return c(this,null,function*(){let t=O(e),o=(yield A()).transaction(l,"readwrite");yield o.objectStore(l).delete(t),yield o.done})}function O({appConfig:e}){return e.appId}var ae={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},d=new B("messaging","Messaging",ae);function ce(e,t){return c(this,null,function*(){let n=yield N(e),o=V(t),i={method:"POST",headers:n,body:JSON.stringify(o)},r;try{r=yield(yield fetch(C(e.appConfig),i)).json()}catch(a){throw d.create("token-subscribe-failed",{errorInfo:a?.toString()})}if(r.error){let a=r.error.message;throw d.create("token-subscribe-failed",{errorInfo:a})}if(!r.token)throw d.create("token-subscribe-no-token");return r.token})}function ue(e,t){return c(this,null,function*(){let n=yield N(e),o=V(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(o)},r;try{r=yield(yield fetch(`${C(e.appConfig)}/${t.token}`,i)).json()}catch(a){throw d.create("token-update-failed",{errorInfo:a?.toString()})}if(r.error){let a=r.error.message;throw d.create("token-update-failed",{errorInfo:a})}if(!r.token)throw d.create("token-update-no-token");return r.token})}function G(e,t){return c(this,null,function*(){let o={method:"DELETE",headers:yield N(e)};try{let r=yield(yield fetch(`${C(e.appConfig)}/${t}`,o)).json();if(r.error){let a=r.error.message;throw d.create("token-unsubscribe-failed",{errorInfo:a})}}catch(i){throw d.create("token-unsubscribe-failed",{errorInfo:i?.toString()})}})}function C({projectId:e}){return`${Y}/projects/${e}/registrations`}function N(n){return c(this,arguments,function*({appConfig:e,installations:t}){let o=yield t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${o}`})})}function V({p256dh:e,auth:t,endpoint:n,vapidKey:o}){let i={web:{endpoint:n,auth:t,p256dh:e}};return o!==H&&(i.web.applicationPubKey=o),i}var de=7*24*60*60*1e3;function pe(e){return c(this,null,function*(){let t=yield fe(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:p(t.getKey("auth")),p256dh:p(t.getKey("p256dh"))},o=yield M(e.firebaseDependencies);if(o){if(ge(o.subscriptionOptions,n))return Date.now()>=o.createTime+de?le(e,{token:o.token,createTime:Date.now(),subscriptionOptions:n}):o.token;try{yield G(e.firebaseDependencies,o.token)}catch(i){console.warn(i)}return U(e.firebaseDependencies,n)}else return U(e.firebaseDependencies,n)})}function W(e){return c(this,null,function*(){let t=yield M(e.firebaseDependencies);t&&(yield G(e.firebaseDependencies,t.token),yield se(e.firebaseDependencies));let n=yield e.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0})}function le(e,t){return c(this,null,function*(){try{let n=yield ue(e.firebaseDependencies,t),o=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return yield D(e.firebaseDependencies,o),n}catch(n){throw n}})}function U(e,t){return c(this,null,function*(){let o={token:yield ce(e,t),createTime:Date.now(),subscriptionOptions:t};return yield D(e,o),o.token})}function fe(e,t){return c(this,null,function*(){let n=yield e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:ee(t)})})}function ge(e,t){let n=t.vapidKey===e.vapidKey,o=t.endpoint===e.endpoint,i=t.auth===e.auth,r=t.p256dh===e.p256dh;return n&&o&&i&&r}function we(e){let t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return be(t,e),he(t,e),me(t,e),t}function be(e,t){if(!t.notification)return;e.notification={};let n=t.notification.title;n&&(e.notification.title=n);let o=t.notification.body;o&&(e.notification.body=o);let i=t.notification.image;i&&(e.notification.image=i);let r=t.notification.icon;r&&(e.notification.icon=r)}function he(e,t){t.data&&(e.data=t.data)}function me(e,t){var n,o,i,r,a;if(!t.fcmOptions&&!(!((n=t.notification)===null||n===void 0)&&n.click_action))return;e.fcmOptions={};let u=(i=(o=t.fcmOptions)===null||o===void 0?void 0:o.link)!==null&&i!==void 0?i:(r=t.notification)===null||r===void 0?void 0:r.click_action;u&&(e.fcmOptions.link=u);let f=(a=t.fcmOptions)===null||a===void 0?void 0:a.analytics_label;f&&(e.fcmOptions.analyticsLabel=f)}function ye(e){return typeof e=="object"&&!!e&&z in e}function ve(e){return new Promise(t=>{setTimeout(t,e)})}q("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o");q("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");function ke(e,t){return c(this,null,function*(){let n=_e(t,yield e.firebaseDependencies.installations.getId());Se(e,n,t.productId)})}function _e(e,t){var n,o;let i={};return e.from&&(i.project_number=e.from),e.fcmMessageId&&(i.message_id=e.fcmMessageId),i.instance_id=t,e.notification?i.message_type=T.DISPLAY_NOTIFICATION.toString():i.message_type=T.DATA_MESSAGE.toString(),i.sdk_platform=X.toString(),i.package_name=self.origin.replace(/(^\w+:|^)\/\//,""),e.collapse_key&&(i.collapse_key=e.collapse_key),i.event=Z.toString(),!((n=e.fcmOptions)===null||n===void 0)&&n.analytics_label&&(i.analytics_label=(o=e.fcmOptions)===null||o===void 0?void 0:o.analytics_label),i}function Se(e,t,n){let o={};o.event_time_ms=Math.floor(Date.now()).toString(),o.source_extension_json_proto3=JSON.stringify(t),n&&(o.compliance_data=Te(n)),e.logEvents.push(o)}function Te(e){return{privacy_context:{prequest:{origin_associated_product_id:e}}}}function q(e,t){let n=[];for(let o=0;o<e.length;o++)n.push(e.charAt(o)),o<t.length&&n.push(t.charAt(o));return n.join("")}function Ee(e,t){return c(this,null,function*(){var n,o;let{newSubscription:i}=e;if(!i){yield W(t);return}let r=yield M(t.firebaseDependencies);yield W(t),t.vapidKey=(o=(n=r?.subscriptionOptions)===null||n===void 0?void 0:n.vapidKey)!==null&&o!==void 0?o:H,yield pe(t)})}function Ie(e,t){return c(this,null,function*(){let n=De(e);if(!n)return;t.deliveryMetricsExportedToBigQueryEnabled&&(yield ke(t,n));let o=yield J();if(Ce(o))return Ne(o,n);if(n.notification&&(yield Ke(Me(n))),!!t&&t.onBackgroundMessageHandler){let i=we(n);typeof t.onBackgroundMessageHandler=="function"?yield t.onBackgroundMessageHandler(i):t.onBackgroundMessageHandler.next(i)}})}function Ae(e){return c(this,null,function*(){var t,n;let o=(n=(t=e.notification)===null||t===void 0?void 0:t.data)===null||n===void 0?void 0:n[$];if(o){if(e.action)return}else return;e.stopImmediatePropagation(),e.notification.close();let i=Be(o);if(!i)return;let r=new URL(i,self.location.href),a=new URL(self.location.origin);if(r.host!==a.host)return;let u=yield Oe(r);if(u?u=yield u.focus():(u=yield self.clients.openWindow(i),yield ve(3e3)),!!u)return o.messageType=I.NOTIFICATION_CLICKED,o.isFirebaseMessaging=!0,u.postMessage(o)})}function Me(e){let t=Object.assign({},e.notification);return t.data={[$]:e},t}function De({data:e}){if(!e)return null;try{return e.json()}catch{return null}}function Oe(e){return c(this,null,function*(){let t=yield J();for(let n of t){let o=new URL(n.url,self.location.href);if(e.host===o.host)return n}return null})}function Ce(e){return e.some(t=>t.visibilityState==="visible"&&!t.url.startsWith("chrome-extension://"))}function Ne(e,t){t.isFirebaseMessaging=!0,t.messageType=I.PUSH_RECEIVED;for(let n of e)n.postMessage(t)}function J(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function Ke(e){var t;let{actions:n}=e,{maxActions:o}=Notification;return n&&o&&n.length>o&&console.warn(`This browser only supports ${o} actions. The remaining actions will not be displayed.`),self.registration.showNotification((t=e.title)!==null&&t!==void 0?t:"",e)}function Be(e){var t,n,o;let i=(n=(t=e.fcmOptions)===null||t===void 0?void 0:t.link)!==null&&n!==void 0?n:(o=e.notification)===null||o===void 0?void 0:o.click_action;return i||(ye(e.data)?self.location.origin:null)}function Pe(e){if(!e||!e.options)throw S("App Configuration Object");if(!e.name)throw S("App Name");let t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(let o of t)if(!n[o])throw S(o);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function S(e){return d.create("missing-app-config-values",{valueName:e})}var E=class{constructor(t,n,o){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;let i=Pe(t);this.firebaseDependencies={app:t,appConfig:i,installations:n,analyticsProvider:o}}_delete(){return Promise.resolve()}};var xe=e=>{let t=new E(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return self.addEventListener("push",n=>{n.waitUntil(Ie(n,t))}),self.addEventListener("pushsubscriptionchange",n=>{n.waitUntil(Ee(n,t))}),self.addEventListener("notificationclick",n=>{n.waitUntil(Ae(n))}),t};function Le(){x(new b("messaging-sw",xe,"PUBLIC"))}function je(e,t){if(self.document!==void 0)throw d.create("only-available-in-sw");return e.onBackgroundMessageHandler=t,()=>{e.onBackgroundMessageHandler=null}}function Q(e,t){return e=P(e),je(e,t)}Le();var Re="@firebase/messaging-compat",Fe="0.2.9";function We(){return self&&"ServiceWorkerGlobalScope"in self?He():Ue()}function Ue(){return typeof window<"u"&&w()&&K()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}function He(){return w()&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}var m=class{constructor(t,n){this.app=t,this._delegate=n,this.app=t,this._delegate=n}getToken(t){return c(this,null,function*(){return L(this._delegate,t)})}deleteToken(){return c(this,null,function*(){return j(this._delegate)})}onMessage(t){return R(this._delegate,t)}onBackgroundMessage(t){return Q(this._delegate,t)}};var $e=e=>self&&"ServiceWorkerGlobalScope"in self?new m(e.getProvider("app-compat").getImmediate(),e.getProvider("messaging-sw").getImmediate()):new m(e.getProvider("app-compat").getImmediate(),e.getProvider("messaging").getImmediate()),Ge={isSupported:We};function Ve(){v.INTERNAL.registerComponent(new b("messaging-compat",$e,"PUBLIC").setServiceProps(Ge))}Ve();v.registerVersion(Re,Fe);
