/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ts{}function rt(i,e){const t=/\{([^}]+)\}/g;return i.replace(t,(n,r)=>{if(Object.prototype.hasOwnProperty.call(e,r)){const s=e[r];return s!=null?String(s):""}else throw new Error(`Key '${r}' not found in valueMap.`)})}function c(i,e,t){for(let s=0;s<e.length-1;s++){const o=e[s];if(o.endsWith("[]")){const a=o.slice(0,-2);if(!(a in i))if(Array.isArray(t))i[a]=Array.from({length:t.length},()=>({}));else throw new Error(`Value must be a list given an array path ${o}`);if(Array.isArray(i[a])){const l=i[a];if(Array.isArray(t))for(let d=0;d<l.length;d++){const f=l[d];c(f,e.slice(s+1),t[d])}else for(const d of l)c(d,e.slice(s+1),t)}return}else if(o.endsWith("[0]")){const a=o.slice(0,-3);a in i||(i[a]=[{}]);const l=i[a];c(l[0],e.slice(s+1),t);return}(!i[o]||typeof i[o]!="object")&&(i[o]={}),i=i[o]}const n=e[e.length-1],r=i[n];if(r!==void 0){if(!t||typeof t=="object"&&Object.keys(t).length===0||t===r)return;if(typeof r=="object"&&typeof t=="object"&&r!==null&&t!==null)Object.assign(r,t);else throw new Error(`Cannot set value for an existing key. Key: ${n}`)}else i[n]=t}function u(i,e){try{if(e.length===1&&e[0]==="_self")return i;for(let t=0;t<e.length;t++){if(typeof i!="object"||i===null)return;const n=e[t];if(n.endsWith("[]")){const r=n.slice(0,-2);if(r in i){const s=i[r];return Array.isArray(s)?s.map(o=>u(o,e.slice(t+1))):void 0}else return}else i=i[n]}return i}catch(t){if(t instanceof TypeError)return;throw t}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function bt(i,e){if(!e||typeof e!="string")throw new Error("model is required and must be a string");if(i.isVertexAI()){if(e.startsWith("publishers/")||e.startsWith("projects/")||e.startsWith("models/"))return e;if(e.indexOf("/")>=0){const t=e.split("/",2);return`publishers/${t[0]}/models/${t[1]}`}else return`publishers/google/models/${e}`}else return e.startsWith("models/")||e.startsWith("tunedModels/")?e:`models/${e}`}function Fc(i,e){const t=bt(i,e);return t?t.startsWith("publishers/")&&i.isVertexAI()?`projects/${i.getProject()}/locations/${i.getLocation()}/${t}`:t.startsWith("models/")&&i.isVertexAI()?`projects/${i.getProject()}/locations/${i.getLocation()}/publishers/google/${t}`:t:""}function Pa(i,e){if(e==null)throw new Error("PartUnion is required");if(typeof e=="object")return e;if(typeof e=="string")return{text:e};throw new Error(`Unsupported part type: ${typeof e}`)}function Oc(i,e){if(e==null||Array.isArray(e)&&e.length===0)throw new Error("PartListUnion is required");return Array.isArray(e)?e.map(t=>Pa(i,t)):[Pa(i,e)]}function po(i){return i!=null&&typeof i=="object"&&"parts"in i&&Array.isArray(i.parts)}function Ia(i){return i!=null&&typeof i=="object"&&"functionCall"in i}function Da(i){return i!=null&&typeof i=="object"&&"functionResponse"in i}function kt(i,e){if(e==null)throw new Error("ContentUnion is required");return po(e)?e:{role:"user",parts:Oc(i,e)}}function Bc(i,e){if(!e)return[];if(i.isVertexAI()&&Array.isArray(e))return e.flatMap(t=>{const n=kt(i,t);return n.parts&&n.parts.length>0&&n.parts[0].text!==void 0?[n.parts[0].text]:[]});if(i.isVertexAI()){const t=kt(i,e);return t.parts&&t.parts.length>0&&t.parts[0].text!==void 0?[t.parts[0].text]:[]}return Array.isArray(e)?e.map(t=>kt(i,t)):[kt(i,e)]}function vt(i,e){if(e==null||Array.isArray(e)&&e.length===0)throw new Error("contents are required");if(!Array.isArray(e)){if(Ia(e)||Da(e))throw new Error("To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them");return[kt(i,e)]}const t=[],n=[],r=po(e[0]);for(const s of e){const o=po(s);if(o!=r)throw new Error("Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them");if(o)t.push(s);else{if(Ia(s)||Da(s))throw new Error("To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them");n.push(s)}}return r||t.push({role:"user",parts:Oc(i,n)}),t}function ts(i,e){if(!i.isVertexAI()&&"default"in e)throw new Error("Default value is not supported in the response schema for the Gemini API.");if("anyOf"in e&&e.anyOf!==void 0)for(const t of e.anyOf)ts(i,t);if("items"in e&&e.items!==void 0&&ts(i,e.items),"properties"in e&&e.properties!==void 0)for(const t of Object.values(e.properties))ts(i,t)}function zc(i,e){return ts(i,e),e}function Vc(i,e){if(typeof e=="object"&&"voiceConfig"in e)return e;if(typeof e=="string")return{voiceConfig:{prebuiltVoiceConfig:{voiceName:e}}};throw new Error(`Unsupported speechConfig type: ${typeof e}`)}function As(i,e){return e}function tn(i,e){if(!Array.isArray(e))throw new Error("tool is required and must be an array of Tools");return e}function Ou(i,e,t,n=1){const r=!e.startsWith(`${t}/`)&&e.split("/").length===n;return i.isVertexAI()?e.startsWith("projects/")?e:e.startsWith("locations/")?`projects/${i.getProject()}/${e}`:e.startsWith(`${t}/`)?`projects/${i.getProject()}/locations/${i.getLocation()}/${e}`:r?`projects/${i.getProject()}/locations/${i.getLocation()}/${t}/${e}`:e:r?`${t}/${e}`:e}function Kn(i,e){if(typeof e!="string")throw new Error("name must be a string");return Ou(i,e,"cachedContents")}function Zn(i,e){if(typeof e!="string")throw new Error("fromImageBytes must be a string");return e}function kc(i,e){if(typeof e!="string")throw new Error("fromName must be a string");return e.startsWith("files/")?e.split("files/")[1]:e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Bu(i,e){const t={};if(u(e,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=u(e,["thought"]);n!=null&&c(t,["thought"],n);const r=u(e,["codeExecutionResult"]);r!=null&&c(t,["codeExecutionResult"],r);const s=u(e,["executableCode"]);s!=null&&c(t,["executableCode"],s);const o=u(e,["fileData"]);o!=null&&c(t,["fileData"],o);const a=u(e,["functionCall"]);a!=null&&c(t,["functionCall"],a);const l=u(e,["functionResponse"]);l!=null&&c(t,["functionResponse"],l);const d=u(e,["inlineData"]);d!=null&&c(t,["inlineData"],d);const f=u(e,["text"]);return f!=null&&c(t,["text"],f),t}function Ua(i,e){const t={},n=u(e,["parts"]);n!=null&&(Array.isArray(n)?c(t,["parts"],n.map(s=>Bu(i,s))):c(t,["parts"],n));const r=u(e,["role"]);return r!=null&&c(t,["role"],r),t}function zu(i,e){const t={};if(u(e,["response"])!==void 0)throw new Error("response parameter is not supported in Gemini API.");const n=u(e,["description"]);n!=null&&c(t,["description"],n);const r=u(e,["name"]);r!=null&&c(t,["name"],r);const s=u(e,["parameters"]);return s!=null&&c(t,["parameters"],s),t}function Vu(){return{}}function ku(i,e){const t={},n=u(e,["mode"]);n!=null&&c(t,["mode"],n);const r=u(e,["dynamicThreshold"]);return r!=null&&c(t,["dynamicThreshold"],r),t}function Hu(i,e){const t={},n=u(e,["dynamicRetrievalConfig"]);return n!=null&&c(t,["dynamicRetrievalConfig"],ku(i,n)),t}function Gu(i,e){const t={},n=u(e,["functionDeclarations"]);if(n!=null&&(Array.isArray(n)?c(t,["functionDeclarations"],n.map(a=>zu(i,a))):c(t,["functionDeclarations"],n)),u(e,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");u(e,["googleSearch"])!=null&&c(t,["googleSearch"],Vu());const s=u(e,["googleSearchRetrieval"]);s!=null&&c(t,["googleSearchRetrieval"],Hu(i,s));const o=u(e,["codeExecution"]);return o!=null&&c(t,["codeExecution"],o),t}function Wu(i,e){const t={},n=u(e,["mode"]);n!=null&&c(t,["mode"],n);const r=u(e,["allowedFunctionNames"]);return r!=null&&c(t,["allowedFunctionNames"],r),t}function $u(i,e){const t={},n=u(e,["functionCallingConfig"]);return n!=null&&c(t,["functionCallingConfig"],Wu(i,n)),t}function Xu(i,e,t){const n={},r=u(e,["ttl"]);t!==void 0&&r!=null&&c(t,["ttl"],r);const s=u(e,["expireTime"]);t!==void 0&&s!=null&&c(t,["expireTime"],s);const o=u(e,["displayName"]);t!==void 0&&o!=null&&c(t,["displayName"],o);const a=u(e,["contents"]);t!==void 0&&a!=null&&(Array.isArray(a)?c(t,["contents"],vt(i,vt(i,a).map(h=>Ua(i,h)))):c(t,["contents"],vt(i,a)));const l=u(e,["systemInstruction"]);t!==void 0&&l!=null&&c(t,["systemInstruction"],Ua(i,kt(i,l)));const d=u(e,["tools"]);t!==void 0&&d!=null&&(Array.isArray(d)?c(t,["tools"],d.map(h=>Gu(i,h))):c(t,["tools"],d));const f=u(e,["toolConfig"]);return t!==void 0&&f!=null&&c(t,["toolConfig"],$u(i,f)),n}function qu(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["model"],Fc(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],Xu(i,r,t)),t}function Yu(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["_url","name"],Kn(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],r),t}function Ku(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["_url","name"],Kn(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],r),t}function Zu(i,e,t){const n={},r=u(e,["ttl"]);t!==void 0&&r!=null&&c(t,["ttl"],r);const s=u(e,["expireTime"]);return t!==void 0&&s!=null&&c(t,["expireTime"],s),n}function Ju(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["_url","name"],Kn(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],Zu(i,r,t)),t}function Qu(i,e,t){const n={},r=u(e,["pageSize"]);t!==void 0&&r!=null&&c(t,["_query","pageSize"],r);const s=u(e,["pageToken"]);return t!==void 0&&s!=null&&c(t,["_query","pageToken"],s),n}function ju(i,e){const t={},n=u(e,["config"]);return n!=null&&c(t,["config"],Qu(i,n,t)),t}function ed(i,e){const t={},n=u(e,["videoMetadata"]);n!=null&&c(t,["videoMetadata"],n);const r=u(e,["thought"]);r!=null&&c(t,["thought"],r);const s=u(e,["codeExecutionResult"]);s!=null&&c(t,["codeExecutionResult"],s);const o=u(e,["executableCode"]);o!=null&&c(t,["executableCode"],o);const a=u(e,["fileData"]);a!=null&&c(t,["fileData"],a);const l=u(e,["functionCall"]);l!=null&&c(t,["functionCall"],l);const d=u(e,["functionResponse"]);d!=null&&c(t,["functionResponse"],d);const f=u(e,["inlineData"]);f!=null&&c(t,["inlineData"],f);const h=u(e,["text"]);return h!=null&&c(t,["text"],h),t}function La(i,e){const t={},n=u(e,["parts"]);n!=null&&(Array.isArray(n)?c(t,["parts"],n.map(s=>ed(i,s))):c(t,["parts"],n));const r=u(e,["role"]);return r!=null&&c(t,["role"],r),t}function td(i,e){const t={},n=u(e,["example"]);n!=null&&c(t,["example"],n);const r=u(e,["pattern"]);r!=null&&c(t,["pattern"],r);const s=u(e,["default"]);s!=null&&c(t,["default"],s);const o=u(e,["maxLength"]);o!=null&&c(t,["maxLength"],o);const a=u(e,["minLength"]);a!=null&&c(t,["minLength"],a);const l=u(e,["minProperties"]);l!=null&&c(t,["minProperties"],l);const d=u(e,["maxProperties"]);d!=null&&c(t,["maxProperties"],d);const f=u(e,["anyOf"]);f!=null&&c(t,["anyOf"],f);const h=u(e,["description"]);h!=null&&c(t,["description"],h);const p=u(e,["enum"]);p!=null&&c(t,["enum"],p);const g=u(e,["format"]);g!=null&&c(t,["format"],g);const S=u(e,["items"]);S!=null&&c(t,["items"],S);const E=u(e,["maxItems"]);E!=null&&c(t,["maxItems"],E);const x=u(e,["maximum"]);x!=null&&c(t,["maximum"],x);const m=u(e,["minItems"]);m!=null&&c(t,["minItems"],m);const P=u(e,["minimum"]);P!=null&&c(t,["minimum"],P);const w=u(e,["nullable"]);w!=null&&c(t,["nullable"],w);const T=u(e,["properties"]);T!=null&&c(t,["properties"],T);const z=u(e,["propertyOrdering"]);z!=null&&c(t,["propertyOrdering"],z);const F=u(e,["required"]);F!=null&&c(t,["required"],F);const N=u(e,["title"]);N!=null&&c(t,["title"],N);const V=u(e,["type"]);return V!=null&&c(t,["type"],V),t}function nd(i,e){const t={},n=u(e,["response"]);n!=null&&c(t,["response"],td(i,n));const r=u(e,["description"]);r!=null&&c(t,["description"],r);const s=u(e,["name"]);s!=null&&c(t,["name"],s);const o=u(e,["parameters"]);return o!=null&&c(t,["parameters"],o),t}function id(){return{}}function rd(i,e){const t={},n=u(e,["mode"]);n!=null&&c(t,["mode"],n);const r=u(e,["dynamicThreshold"]);return r!=null&&c(t,["dynamicThreshold"],r),t}function sd(i,e){const t={},n=u(e,["dynamicRetrievalConfig"]);return n!=null&&c(t,["dynamicRetrievalConfig"],rd(i,n)),t}function od(i,e){const t={},n=u(e,["functionDeclarations"]);n!=null&&(Array.isArray(n)?c(t,["functionDeclarations"],n.map(l=>nd(i,l))):c(t,["functionDeclarations"],n));const r=u(e,["retrieval"]);r!=null&&c(t,["retrieval"],r),u(e,["googleSearch"])!=null&&c(t,["googleSearch"],id());const o=u(e,["googleSearchRetrieval"]);o!=null&&c(t,["googleSearchRetrieval"],sd(i,o));const a=u(e,["codeExecution"]);return a!=null&&c(t,["codeExecution"],a),t}function ad(i,e){const t={},n=u(e,["mode"]);n!=null&&c(t,["mode"],n);const r=u(e,["allowedFunctionNames"]);return r!=null&&c(t,["allowedFunctionNames"],r),t}function ld(i,e){const t={},n=u(e,["functionCallingConfig"]);return n!=null&&c(t,["functionCallingConfig"],ad(i,n)),t}function cd(i,e,t){const n={},r=u(e,["ttl"]);t!==void 0&&r!=null&&c(t,["ttl"],r);const s=u(e,["expireTime"]);t!==void 0&&s!=null&&c(t,["expireTime"],s);const o=u(e,["displayName"]);t!==void 0&&o!=null&&c(t,["displayName"],o);const a=u(e,["contents"]);t!==void 0&&a!=null&&(Array.isArray(a)?c(t,["contents"],vt(i,vt(i,a).map(h=>La(i,h)))):c(t,["contents"],vt(i,a)));const l=u(e,["systemInstruction"]);t!==void 0&&l!=null&&c(t,["systemInstruction"],La(i,kt(i,l)));const d=u(e,["tools"]);t!==void 0&&d!=null&&(Array.isArray(d)?c(t,["tools"],d.map(h=>od(i,h))):c(t,["tools"],d));const f=u(e,["toolConfig"]);return t!==void 0&&f!=null&&c(t,["toolConfig"],ld(i,f)),n}function ud(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["model"],Fc(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],cd(i,r,t)),t}function dd(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["_url","name"],Kn(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],r),t}function fd(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["_url","name"],Kn(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],r),t}function hd(i,e,t){const n={},r=u(e,["ttl"]);t!==void 0&&r!=null&&c(t,["ttl"],r);const s=u(e,["expireTime"]);return t!==void 0&&s!=null&&c(t,["expireTime"],s),n}function pd(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["_url","name"],Kn(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],hd(i,r,t)),t}function md(i,e,t){const n={},r=u(e,["pageSize"]);t!==void 0&&r!=null&&c(t,["_query","pageSize"],r);const s=u(e,["pageToken"]);return t!==void 0&&s!=null&&c(t,["_query","pageToken"],s),n}function gd(i,e){const t={},n=u(e,["config"]);return n!=null&&c(t,["config"],md(i,n,t)),t}function ns(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["name"],n);const r=u(e,["displayName"]);r!=null&&c(t,["displayName"],r);const s=u(e,["model"]);s!=null&&c(t,["model"],s);const o=u(e,["createTime"]);o!=null&&c(t,["createTime"],o);const a=u(e,["updateTime"]);a!=null&&c(t,["updateTime"],a);const l=u(e,["expireTime"]);l!=null&&c(t,["expireTime"],l);const d=u(e,["usageMetadata"]);return d!=null&&c(t,["usageMetadata"],d),t}function _d(){return{}}function vd(i,e){const t={},n=u(e,["nextPageToken"]);n!=null&&c(t,["nextPageToken"],n);const r=u(e,["cachedContents"]);return r!=null&&(Array.isArray(r)?c(t,["cachedContents"],r.map(s=>ns(i,s))):c(t,["cachedContents"],r)),t}function is(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["name"],n);const r=u(e,["displayName"]);r!=null&&c(t,["displayName"],r);const s=u(e,["model"]);s!=null&&c(t,["model"],s);const o=u(e,["createTime"]);o!=null&&c(t,["createTime"],o);const a=u(e,["updateTime"]);a!=null&&c(t,["updateTime"],a);const l=u(e,["expireTime"]);l!=null&&c(t,["expireTime"],l);const d=u(e,["usageMetadata"]);return d!=null&&c(t,["usageMetadata"],d),t}function xd(){return{}}function Sd(i,e){const t={},n=u(e,["nextPageToken"]);n!=null&&c(t,["nextPageToken"],n);const r=u(e,["cachedContents"]);return r!=null&&(Array.isArray(r)?c(t,["cachedContents"],r.map(s=>is(i,s))):c(t,["cachedContents"],r)),t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var hs;(function(i){i.PAGED_ITEM_BATCH_JOBS="batchJobs",i.PAGED_ITEM_MODELS="models",i.PAGED_ITEM_TUNING_JOBS="tuningJobs",i.PAGED_ITEM_FILES="files",i.PAGED_ITEM_CACHED_CONTENTS="cachedContents"})(hs||(hs={}));class Hc{constructor(e,t,n,r){this.pageInternal=[],this.paramsInternal={},this.requestInternal=t,this.init(e,n,r)}init(e,t,n){var r,s;this.nameInternal=e,this.pageInternal=t[this.nameInternal]||[],this.idxInternal=0;let o={config:{}};n?typeof n=="object"?o=Object.assign({},n):o=n:o={config:{}},o.config&&(o.config.pageToken=t.nextPageToken),this.paramsInternal=o,this.pageInternalSize=(s=(r=o.config)===null||r===void 0?void 0:r.pageSize)!==null&&s!==void 0?s:this.pageInternal.length}initNextPage(e){this.init(this.nameInternal,e,this.paramsInternal)}get page(){return this.pageInternal}get name(){return this.nameInternal}get pageSize(){return this.pageInternalSize}get params(){return this.paramsInternal}get pageLength(){return this.pageInternal.length}getItem(e){return this.pageInternal[e]}[Symbol.asyncIterator](){return{next:async()=>{if(this.idxInternal>=this.pageLength)if(this.hasNextPage())await this.nextPage();else return{value:void 0,done:!0};const e=this.getItem(this.idxInternal);return this.idxInternal+=1,{value:e,done:!1}},return:async()=>({value:void 0,done:!0})}}async nextPage(){if(!this.hasNextPage())throw new Error("No more pages to fetch.");const e=await this.requestInternal(this.params);return this.initNextPage(e),this.page}hasNextPage(){var e;return((e=this.params.config)===null||e===void 0?void 0:e.pageToken)!==void 0}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var Na;(function(i){i.OUTCOME_UNSPECIFIED="OUTCOME_UNSPECIFIED",i.OUTCOME_OK="OUTCOME_OK",i.OUTCOME_FAILED="OUTCOME_FAILED",i.OUTCOME_DEADLINE_EXCEEDED="OUTCOME_DEADLINE_EXCEEDED"})(Na||(Na={}));var Fa;(function(i){i.LANGUAGE_UNSPECIFIED="LANGUAGE_UNSPECIFIED",i.PYTHON="PYTHON"})(Fa||(Fa={}));var Oa;(function(i){i.TYPE_UNSPECIFIED="TYPE_UNSPECIFIED",i.STRING="STRING",i.NUMBER="NUMBER",i.INTEGER="INTEGER",i.BOOLEAN="BOOLEAN",i.ARRAY="ARRAY",i.OBJECT="OBJECT"})(Oa||(Oa={}));var Ba;(function(i){i.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",i.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",i.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",i.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",i.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",i.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(Ba||(Ba={}));var za;(function(i){i.HARM_BLOCK_METHOD_UNSPECIFIED="HARM_BLOCK_METHOD_UNSPECIFIED",i.SEVERITY="SEVERITY",i.PROBABILITY="PROBABILITY"})(za||(za={}));var Va;(function(i){i.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",i.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",i.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",i.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",i.BLOCK_NONE="BLOCK_NONE",i.OFF="OFF"})(Va||(Va={}));var ka;(function(i){i.MODE_UNSPECIFIED="MODE_UNSPECIFIED",i.MODE_DYNAMIC="MODE_DYNAMIC"})(ka||(ka={}));var Ha;(function(i){i.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",i.STOP="STOP",i.MAX_TOKENS="MAX_TOKENS",i.SAFETY="SAFETY",i.RECITATION="RECITATION",i.OTHER="OTHER",i.BLOCKLIST="BLOCKLIST",i.PROHIBITED_CONTENT="PROHIBITED_CONTENT",i.SPII="SPII",i.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",i.IMAGE_SAFETY="IMAGE_SAFETY"})(Ha||(Ha={}));var Ga;(function(i){i.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",i.NEGLIGIBLE="NEGLIGIBLE",i.LOW="LOW",i.MEDIUM="MEDIUM",i.HIGH="HIGH"})(Ga||(Ga={}));var Wa;(function(i){i.HARM_SEVERITY_UNSPECIFIED="HARM_SEVERITY_UNSPECIFIED",i.HARM_SEVERITY_NEGLIGIBLE="HARM_SEVERITY_NEGLIGIBLE",i.HARM_SEVERITY_LOW="HARM_SEVERITY_LOW",i.HARM_SEVERITY_MEDIUM="HARM_SEVERITY_MEDIUM",i.HARM_SEVERITY_HIGH="HARM_SEVERITY_HIGH"})(Wa||(Wa={}));var $a;(function(i){i.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",i.SAFETY="SAFETY",i.OTHER="OTHER",i.BLOCKLIST="BLOCKLIST",i.PROHIBITED_CONTENT="PROHIBITED_CONTENT"})($a||($a={}));var Xa;(function(i){i.TRAFFIC_TYPE_UNSPECIFIED="TRAFFIC_TYPE_UNSPECIFIED",i.ON_DEMAND="ON_DEMAND",i.PROVISIONED_THROUGHPUT="PROVISIONED_THROUGHPUT"})(Xa||(Xa={}));var ar;(function(i){i.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",i.TEXT="TEXT",i.IMAGE="IMAGE",i.AUDIO="AUDIO"})(ar||(ar={}));var qa;(function(i){i.MEDIA_RESOLUTION_UNSPECIFIED="MEDIA_RESOLUTION_UNSPECIFIED",i.MEDIA_RESOLUTION_LOW="MEDIA_RESOLUTION_LOW",i.MEDIA_RESOLUTION_MEDIUM="MEDIA_RESOLUTION_MEDIUM",i.MEDIA_RESOLUTION_HIGH="MEDIA_RESOLUTION_HIGH"})(qa||(qa={}));var Ya;(function(i){i.FEATURE_SELECTION_PREFERENCE_UNSPECIFIED="FEATURE_SELECTION_PREFERENCE_UNSPECIFIED",i.PRIORITIZE_QUALITY="PRIORITIZE_QUALITY",i.BALANCED="BALANCED",i.PRIORITIZE_COST="PRIORITIZE_COST"})(Ya||(Ya={}));var Ka;(function(i){i.MODE_UNSPECIFIED="MODE_UNSPECIFIED",i.MODE_DYNAMIC="MODE_DYNAMIC"})(Ka||(Ka={}));var Za;(function(i){i.MODE_UNSPECIFIED="MODE_UNSPECIFIED",i.AUTO="AUTO",i.ANY="ANY",i.NONE="NONE"})(Za||(Za={}));var Ja;(function(i){i.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",i.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",i.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",i.BLOCK_NONE="BLOCK_NONE"})(Ja||(Ja={}));var Qa;(function(i){i.DONT_ALLOW="DONT_ALLOW",i.ALLOW_ADULT="ALLOW_ADULT",i.ALLOW_ALL="ALLOW_ALL"})(Qa||(Qa={}));var ja;(function(i){i.auto="auto",i.en="en",i.ja="ja",i.ko="ko",i.hi="hi"})(ja||(ja={}));var el;(function(i){i.STATE_UNSPECIFIED="STATE_UNSPECIFIED",i.PROCESSING="PROCESSING",i.ACTIVE="ACTIVE",i.FAILED="FAILED"})(el||(el={}));var tl;(function(i){i.SOURCE_UNSPECIFIED="SOURCE_UNSPECIFIED",i.UPLOADED="UPLOADED",i.GENERATED="GENERATED"})(tl||(tl={}));var nl;(function(i){i.MASK_MODE_DEFAULT="MASK_MODE_DEFAULT",i.MASK_MODE_USER_PROVIDED="MASK_MODE_USER_PROVIDED",i.MASK_MODE_BACKGROUND="MASK_MODE_BACKGROUND",i.MASK_MODE_FOREGROUND="MASK_MODE_FOREGROUND",i.MASK_MODE_SEMANTIC="MASK_MODE_SEMANTIC"})(nl||(nl={}));var il;(function(i){i.CONTROL_TYPE_DEFAULT="CONTROL_TYPE_DEFAULT",i.CONTROL_TYPE_CANNY="CONTROL_TYPE_CANNY",i.CONTROL_TYPE_SCRIBBLE="CONTROL_TYPE_SCRIBBLE",i.CONTROL_TYPE_FACE_MESH="CONTROL_TYPE_FACE_MESH"})(il||(il={}));var rl;(function(i){i.SUBJECT_TYPE_DEFAULT="SUBJECT_TYPE_DEFAULT",i.SUBJECT_TYPE_PERSON="SUBJECT_TYPE_PERSON",i.SUBJECT_TYPE_ANIMAL="SUBJECT_TYPE_ANIMAL",i.SUBJECT_TYPE_PRODUCT="SUBJECT_TYPE_PRODUCT"})(rl||(rl={}));var sl;(function(i){i.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",i.TEXT="TEXT",i.IMAGE="IMAGE",i.VIDEO="VIDEO",i.AUDIO="AUDIO",i.DOCUMENT="DOCUMENT"})(sl||(sl={}));var ol;(function(i){i.START_SENSITIVITY_UNSPECIFIED="START_SENSITIVITY_UNSPECIFIED",i.START_SENSITIVITY_HIGH="START_SENSITIVITY_HIGH",i.START_SENSITIVITY_LOW="START_SENSITIVITY_LOW"})(ol||(ol={}));var al;(function(i){i.END_SENSITIVITY_UNSPECIFIED="END_SENSITIVITY_UNSPECIFIED",i.END_SENSITIVITY_HIGH="END_SENSITIVITY_HIGH",i.END_SENSITIVITY_LOW="END_SENSITIVITY_LOW"})(al||(al={}));var ll;(function(i){i.ACTIVITY_HANDLING_UNSPECIFIED="ACTIVITY_HANDLING_UNSPECIFIED",i.START_OF_ACTIVITY_INTERRUPTS="START_OF_ACTIVITY_INTERRUPTS",i.NO_INTERRUPTION="NO_INTERRUPTION"})(ll||(ll={}));var cl;(function(i){i.TURN_COVERAGE_UNSPECIFIED="TURN_COVERAGE_UNSPECIFIED",i.TURN_INCLUDES_ONLY_ACTIVITY="TURN_INCLUDES_ONLY_ACTIVITY",i.TURN_INCLUDES_ALL_INPUT="TURN_INCLUDES_ALL_INPUT"})(cl||(cl={}));class br{get text(){var e,t,n,r,s,o,a,l;if(((r=(n=(t=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||t===void 0?void 0:t.content)===null||n===void 0?void 0:n.parts)===null||r===void 0?void 0:r.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning text from the first one.");let d="",f=!1;const h=[];for(const p of(l=(a=(o=(s=this.candidates)===null||s===void 0?void 0:s[0])===null||o===void 0?void 0:o.content)===null||a===void 0?void 0:a.parts)!==null&&l!==void 0?l:[]){for(const[g,S]of Object.entries(p))g!=="text"&&g!=="thought"&&(S!==null||S!==void 0)&&h.push(g);if(typeof p.text=="string"){if(typeof p.thought=="boolean"&&p.thought)continue;f=!0,d+=p.text}}return h.length>0&&console.warn(`there are non-text parts ${h} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`),f?d:void 0}get functionCalls(){var e,t,n,r,s,o,a,l;if(((r=(n=(t=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||t===void 0?void 0:t.content)===null||n===void 0?void 0:n.parts)===null||r===void 0?void 0:r.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning function calls from the first one.");const d=(l=(a=(o=(s=this.candidates)===null||s===void 0?void 0:s[0])===null||o===void 0?void 0:o.content)===null||a===void 0?void 0:a.parts)===null||l===void 0?void 0:l.filter(f=>f.functionCall).map(f=>f.functionCall).filter(f=>f!==void 0);if(d?.length!==0)return d}get executableCode(){var e,t,n,r,s,o,a,l,d;if(((r=(n=(t=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||t===void 0?void 0:t.content)===null||n===void 0?void 0:n.parts)===null||r===void 0?void 0:r.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning executable code from the first one.");const f=(l=(a=(o=(s=this.candidates)===null||s===void 0?void 0:s[0])===null||o===void 0?void 0:o.content)===null||a===void 0?void 0:a.parts)===null||l===void 0?void 0:l.filter(h=>h.executableCode).map(h=>h.executableCode).filter(h=>h!==void 0);if(f?.length!==0)return(d=f?.[0])===null||d===void 0?void 0:d.code}get codeExecutionResult(){var e,t,n,r,s,o,a,l,d;if(((r=(n=(t=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||t===void 0?void 0:t.content)===null||n===void 0?void 0:n.parts)===null||r===void 0?void 0:r.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning code execution result from the first one.");const f=(l=(a=(o=(s=this.candidates)===null||s===void 0?void 0:s[0])===null||o===void 0?void 0:o.content)===null||a===void 0?void 0:a.parts)===null||l===void 0?void 0:l.filter(h=>h.codeExecutionResult).map(h=>h.codeExecutionResult).filter(h=>h!==void 0);if(f?.length!==0)return(d=f?.[0])===null||d===void 0?void 0:d.output}}class ul{}class dl{}class fl{}class yd{}class hl{}class pl{}class Ed{}class mo{constructor(e){const t={};for(const n of e.headers.entries())t[n[0]]=n[1];this.headers=t,this.responseInternal=e}json(){return this.responseInternal.json()}}class Md{}class Td{}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ad extends Ts{constructor(e){super(),this.apiClient=e,this.list=async(t={})=>new Hc(hs.PAGED_ITEM_CACHED_CONTENTS,n=>this.listInternal(n),await this.listInternal(t),t)}async create(e){var t,n;let r,s="",o={};if(this.apiClient.isVertexAI()){const a=ud(this.apiClient,e);return s=rt("cachedContents",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(l=>l.json()),r.then(l=>is(this.apiClient,l))}else{const a=qu(this.apiClient,e);return s=rt("cachedContents",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"POST",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(l=>l.json()),r.then(l=>ns(this.apiClient,l))}}async get(e){var t,n;let r,s="",o={};if(this.apiClient.isVertexAI()){const a=dd(this.apiClient,e);return s=rt("{name}",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(l=>l.json()),r.then(l=>is(this.apiClient,l))}else{const a=Yu(this.apiClient,e);return s=rt("{name}",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"GET",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(l=>l.json()),r.then(l=>ns(this.apiClient,l))}}async delete(e){var t,n;let r,s="",o={};if(this.apiClient.isVertexAI()){const a=fd(this.apiClient,e);return s=rt("{name}",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"DELETE",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(l=>l.json()),r.then(()=>{const l=xd(),d=new hl;return Object.assign(d,l),d})}else{const a=Ku(this.apiClient,e);return s=rt("{name}",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"DELETE",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(l=>l.json()),r.then(()=>{const l=_d(),d=new hl;return Object.assign(d,l),d})}}async update(e){var t,n;let r,s="",o={};if(this.apiClient.isVertexAI()){const a=pd(this.apiClient,e);return s=rt("{name}",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"PATCH",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(l=>l.json()),r.then(l=>is(this.apiClient,l))}else{const a=Ju(this.apiClient,e);return s=rt("{name}",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"PATCH",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(l=>l.json()),r.then(l=>ns(this.apiClient,l))}}async listInternal(e){var t,n;let r,s="",o={};if(this.apiClient.isVertexAI()){const a=gd(this.apiClient,e);return s=rt("cachedContents",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(l=>l.json()),r.then(l=>{const d=Sd(this.apiClient,l),f=new pl;return Object.assign(f,d),f})}else{const a=ju(this.apiClient,e);return s=rt("cachedContents",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"GET",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(l=>l.json()),r.then(l=>{const d=vd(this.apiClient,l),f=new pl;return Object.assign(f,d),f})}}}function ml(i){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&i[e],n=0;if(t)return t.call(i);if(i&&typeof i.length=="number")return{next:function(){return i&&n>=i.length&&(i=void 0),{value:i&&i[n++],done:!i}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function Dt(i){return this instanceof Dt?(this.v=i,this):new Dt(i)}function ps(i,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t.apply(i,e||[]),r,s=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),a("next"),a("throw"),a("return",o),r[Symbol.asyncIterator]=function(){return this},r;function o(g){return function(S){return Promise.resolve(S).then(g,h)}}function a(g,S){n[g]&&(r[g]=function(E){return new Promise(function(x,m){s.push([g,E,x,m])>1||l(g,E)})},S&&(r[g]=S(r[g])))}function l(g,S){try{d(n[g](S))}catch(E){p(s[0][3],E)}}function d(g){g.value instanceof Dt?Promise.resolve(g.value.v).then(f,h):p(s[0][2],g)}function f(g){l("next",g)}function h(g){l("throw",g)}function p(g,S){g(S),s.shift(),s.length&&l(s[0][0],s[0][1])}}function go(i){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=i[Symbol.asyncIterator],t;return e?e.call(i):(i=typeof ml=="function"?ml(i):i[Symbol.iterator](),t={},n("next"),n("throw"),n("return"),t[Symbol.asyncIterator]=function(){return this},t);function n(s){t[s]=i[s]&&function(o){return new Promise(function(a,l){o=i[s](o),r(a,l,o.done,o.value)})}}function r(s,o,a,l){Promise.resolve(l).then(function(d){s({value:d,done:a})},o)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Cd(i){var e;if(i.candidates==null||i.candidates.length===0)return!1;const t=(e=i.candidates[0])===null||e===void 0?void 0:e.content;return t===void 0?!1:Gc(t)}function Gc(i){if(i.parts===void 0||i.parts.length===0)return!1;for(const e of i.parts)if(e===void 0||Object.keys(e).length===0||e.text!==void 0&&e.text==="")return!1;return!0}function wd(i){if(i.length!==0){if(i[0].role!=="user")throw new Error("History must start with a user turn.");for(const e of i)if(e.role!=="user"&&e.role!=="model")throw new Error(`Role must be user or model, but got ${e.role}.`)}}function Rd(i){if(i===void 0||i.length===0)return[];const e=[],t=i.length;let n=0,r=i[0];for(;n<t;)if(i[n].role==="user")r=i[n],n++;else{const s=[];let o=!0;for(;n<t&&i[n].role==="model";)s.push(i[n]),o&&!Gc(i[n])&&(o=!1),n++;o&&(e.push(r),e.push(...s))}return e}class bd{constructor(e,t){this.modelsModule=e,this.apiClient=t}create(e){return new Pd(this.apiClient,this.modelsModule,e.model,e.config,e.history)}}class Pd{constructor(e,t,n,r={},s=[]){this.apiClient=e,this.modelsModule=t,this.model=n,this.config=r,this.history=s,this.sendPromise=Promise.resolve(),wd(s)}async sendMessage(e){var t;await this.sendPromise;const n=kt(this.apiClient,e.message),r=this.modelsModule.generateContent({model:this.model,contents:this.getHistory(!0).concat(n),config:(t=e.config)!==null&&t!==void 0?t:this.config});return this.sendPromise=(async()=>{var s,o;const l=(o=(s=(await r).candidates)===null||s===void 0?void 0:s[0])===null||o===void 0?void 0:o.content,d=l?[l]:[];this.recordHistory(n,d)})(),await this.sendPromise,r}async sendMessageStream(e){var t;await this.sendPromise;const n=kt(this.apiClient,e.message),r=this.modelsModule.generateContentStream({model:this.model,contents:this.getHistory(!0).concat(n),config:(t=e.config)!==null&&t!==void 0?t:this.config});this.sendPromise=r.then(()=>{});const s=await r;return this.processStreamResponse(s,n)}getHistory(e=!1){return e?Rd(this.history):this.history}processStreamResponse(e,t){var n,r;return ps(this,arguments,function*(){var o,a,l,d;const f=[];try{for(var h=!0,p=go(e),g;g=yield Dt(p.next()),o=g.done,!o;h=!0){d=g.value,h=!1;const S=d;if(Cd(S)){const E=(r=(n=S.candidates)===null||n===void 0?void 0:n[0])===null||r===void 0?void 0:r.content;E!==void 0&&f.push(E)}yield yield Dt(S)}}catch(S){a={error:S}}finally{try{!h&&!o&&(l=p.return)&&(yield Dt(l.call(p)))}finally{if(a)throw a.error}}this.recordHistory(t,f)})}recordHistory(e,t){let n=[];t.length>0&&t.every(r=>r.role==="model")?n=t:n.push({role:"model",parts:[]}),this.history.push(e),this.history.push(...n)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Id(i,e,t){const n={},r=u(e,["pageSize"]);t!==void 0&&r!=null&&c(t,["_query","pageSize"],r);const s=u(e,["pageToken"]);return t!==void 0&&s!=null&&c(t,["_query","pageToken"],s),n}function Dd(i,e){const t={},n=u(e,["config"]);return n!=null&&c(t,["config"],Id(i,n,t)),t}function Ud(i,e){const t={},n=u(e,["details"]);n!=null&&c(t,["details"],n);const r=u(e,["message"]);r!=null&&c(t,["message"],r);const s=u(e,["code"]);return s!=null&&c(t,["code"],s),t}function Ld(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["name"],n);const r=u(e,["displayName"]);r!=null&&c(t,["displayName"],r);const s=u(e,["mimeType"]);s!=null&&c(t,["mimeType"],s);const o=u(e,["sizeBytes"]);o!=null&&c(t,["sizeBytes"],o);const a=u(e,["createTime"]);a!=null&&c(t,["createTime"],a);const l=u(e,["expirationTime"]);l!=null&&c(t,["expirationTime"],l);const d=u(e,["updateTime"]);d!=null&&c(t,["updateTime"],d);const f=u(e,["sha256Hash"]);f!=null&&c(t,["sha256Hash"],f);const h=u(e,["uri"]);h!=null&&c(t,["uri"],h);const p=u(e,["downloadUri"]);p!=null&&c(t,["downloadUri"],p);const g=u(e,["state"]);g!=null&&c(t,["state"],g);const S=u(e,["source"]);S!=null&&c(t,["source"],S);const E=u(e,["videoMetadata"]);E!=null&&c(t,["videoMetadata"],E);const x=u(e,["error"]);return x!=null&&c(t,["error"],Ud(i,x)),t}function Nd(i,e){const t={},n=u(e,["file"]);n!=null&&c(t,["file"],Ld(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],r),t}function Fd(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["_url","file"],kc(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],r),t}function Od(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["_url","file"],kc(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],r),t}function Bd(i,e){const t={},n=u(e,["details"]);n!=null&&c(t,["details"],n);const r=u(e,["message"]);r!=null&&c(t,["message"],r);const s=u(e,["code"]);return s!=null&&c(t,["code"],s),t}function _o(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["name"],n);const r=u(e,["displayName"]);r!=null&&c(t,["displayName"],r);const s=u(e,["mimeType"]);s!=null&&c(t,["mimeType"],s);const o=u(e,["sizeBytes"]);o!=null&&c(t,["sizeBytes"],o);const a=u(e,["createTime"]);a!=null&&c(t,["createTime"],a);const l=u(e,["expirationTime"]);l!=null&&c(t,["expirationTime"],l);const d=u(e,["updateTime"]);d!=null&&c(t,["updateTime"],d);const f=u(e,["sha256Hash"]);f!=null&&c(t,["sha256Hash"],f);const h=u(e,["uri"]);h!=null&&c(t,["uri"],h);const p=u(e,["downloadUri"]);p!=null&&c(t,["downloadUri"],p);const g=u(e,["state"]);g!=null&&c(t,["state"],g);const S=u(e,["source"]);S!=null&&c(t,["source"],S);const E=u(e,["videoMetadata"]);E!=null&&c(t,["videoMetadata"],E);const x=u(e,["error"]);return x!=null&&c(t,["error"],Bd(i,x)),t}function zd(i,e){const t={},n=u(e,["nextPageToken"]);n!=null&&c(t,["nextPageToken"],n);const r=u(e,["files"]);return r!=null&&(Array.isArray(r)?c(t,["files"],r.map(s=>_o(i,s))):c(t,["files"],r)),t}function Vd(){return{}}function kd(){return{}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Hd extends Ts{constructor(e){super(),this.apiClient=e,this.list=async(t={})=>new Hc(hs.PAGED_ITEM_FILES,n=>this.listInternal(n),await this.listInternal(t),t)}async upload(e){if(this.apiClient.isVertexAI())throw new Error("Vertex AI does not support uploading files. You can share files through a GCS bucket.");return this.apiClient.uploadFile(e.file,e.config).then(t=>_o(this.apiClient,t))}async listInternal(e){var t;let n,r="",s={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const o=Dd(this.apiClient,e);return r=rt("files",o._url),s=o._query,delete o.config,delete o._url,delete o._query,n=this.apiClient.request({path:r,queryParams:s,body:JSON.stringify(o),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(a=>a.json()),n.then(a=>{const l=zd(this.apiClient,a),d=new Ed;return Object.assign(d,l),d})}}async createInternal(e){var t;let n,r="",s={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const o=Nd(this.apiClient,e);return r=rt("upload/v1beta/files",o._url),s=o._query,delete o.config,delete o._url,delete o._query,n=this.apiClient.request({path:r,queryParams:s,body:JSON.stringify(o),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(a=>a.json()),n.then(()=>{const a=Vd(),l=new Md;return Object.assign(l,a),l})}}async get(e){var t;let n,r="",s={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const o=Fd(this.apiClient,e);return r=rt("files/{file}",o._url),s=o._query,delete o.config,delete o._url,delete o._query,n=this.apiClient.request({path:r,queryParams:s,body:JSON.stringify(o),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(a=>a.json()),n.then(a=>_o(this.apiClient,a))}}async delete(e){var t;let n,r="",s={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const o=Od(this.apiClient,e);return r=rt("files/{file}",o._url),s=o._query,delete o.config,delete o._url,delete o._query,n=this.apiClient.request({path:r,queryParams:s,body:JSON.stringify(o),httpMethod:"DELETE",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(a=>a.json()),n.then(()=>{const a=kd(),l=new Td;return Object.assign(l,a),l})}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Gd(i,e){const t={};if(u(e,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=u(e,["thought"]);n!=null&&c(t,["thought"],n);const r=u(e,["codeExecutionResult"]);r!=null&&c(t,["codeExecutionResult"],r);const s=u(e,["executableCode"]);s!=null&&c(t,["executableCode"],s);const o=u(e,["fileData"]);o!=null&&c(t,["fileData"],o);const a=u(e,["functionCall"]);a!=null&&c(t,["functionCall"],a);const l=u(e,["functionResponse"]);l!=null&&c(t,["functionResponse"],l);const d=u(e,["inlineData"]);d!=null&&c(t,["inlineData"],d);const f=u(e,["text"]);return f!=null&&c(t,["text"],f),t}function Wd(i,e){const t={},n=u(e,["videoMetadata"]);n!=null&&c(t,["videoMetadata"],n);const r=u(e,["thought"]);r!=null&&c(t,["thought"],r);const s=u(e,["codeExecutionResult"]);s!=null&&c(t,["codeExecutionResult"],s);const o=u(e,["executableCode"]);o!=null&&c(t,["executableCode"],o);const a=u(e,["fileData"]);a!=null&&c(t,["fileData"],a);const l=u(e,["functionCall"]);l!=null&&c(t,["functionCall"],l);const d=u(e,["functionResponse"]);d!=null&&c(t,["functionResponse"],d);const f=u(e,["inlineData"]);f!=null&&c(t,["inlineData"],f);const h=u(e,["text"]);return h!=null&&c(t,["text"],h),t}function $d(i,e){const t={},n=u(e,["parts"]);n!=null&&(Array.isArray(n)?c(t,["parts"],n.map(s=>Gd(i,s))):c(t,["parts"],n));const r=u(e,["role"]);return r!=null&&c(t,["role"],r),t}function Xd(i,e){const t={},n=u(e,["parts"]);n!=null&&(Array.isArray(n)?c(t,["parts"],n.map(s=>Wd(i,s))):c(t,["parts"],n));const r=u(e,["role"]);return r!=null&&c(t,["role"],r),t}function qd(i,e){const t={},n=u(e,["example"]);n!=null&&c(t,["example"],n);const r=u(e,["pattern"]);r!=null&&c(t,["pattern"],r);const s=u(e,["default"]);s!=null&&c(t,["default"],s);const o=u(e,["maxLength"]);o!=null&&c(t,["maxLength"],o);const a=u(e,["minLength"]);a!=null&&c(t,["minLength"],a);const l=u(e,["minProperties"]);l!=null&&c(t,["minProperties"],l);const d=u(e,["maxProperties"]);d!=null&&c(t,["maxProperties"],d);const f=u(e,["anyOf"]);f!=null&&c(t,["anyOf"],f);const h=u(e,["description"]);h!=null&&c(t,["description"],h);const p=u(e,["enum"]);p!=null&&c(t,["enum"],p);const g=u(e,["format"]);g!=null&&c(t,["format"],g);const S=u(e,["items"]);S!=null&&c(t,["items"],S);const E=u(e,["maxItems"]);E!=null&&c(t,["maxItems"],E);const x=u(e,["maximum"]);x!=null&&c(t,["maximum"],x);const m=u(e,["minItems"]);m!=null&&c(t,["minItems"],m);const P=u(e,["minimum"]);P!=null&&c(t,["minimum"],P);const w=u(e,["nullable"]);w!=null&&c(t,["nullable"],w);const T=u(e,["properties"]);T!=null&&c(t,["properties"],T);const z=u(e,["propertyOrdering"]);z!=null&&c(t,["propertyOrdering"],z);const F=u(e,["required"]);F!=null&&c(t,["required"],F);const N=u(e,["title"]);N!=null&&c(t,["title"],N);const V=u(e,["type"]);return V!=null&&c(t,["type"],V),t}function Yd(i,e){const t={};if(u(e,["response"])!==void 0)throw new Error("response parameter is not supported in Gemini API.");const n=u(e,["description"]);n!=null&&c(t,["description"],n);const r=u(e,["name"]);r!=null&&c(t,["name"],r);const s=u(e,["parameters"]);return s!=null&&c(t,["parameters"],s),t}function Kd(i,e){const t={},n=u(e,["response"]);n!=null&&c(t,["response"],qd(i,n));const r=u(e,["description"]);r!=null&&c(t,["description"],r);const s=u(e,["name"]);s!=null&&c(t,["name"],s);const o=u(e,["parameters"]);return o!=null&&c(t,["parameters"],o),t}function Zd(){return{}}function Jd(){return{}}function Qd(i,e){const t={},n=u(e,["mode"]);n!=null&&c(t,["mode"],n);const r=u(e,["dynamicThreshold"]);return r!=null&&c(t,["dynamicThreshold"],r),t}function jd(i,e){const t={},n=u(e,["mode"]);n!=null&&c(t,["mode"],n);const r=u(e,["dynamicThreshold"]);return r!=null&&c(t,["dynamicThreshold"],r),t}function ef(i,e){const t={},n=u(e,["dynamicRetrievalConfig"]);return n!=null&&c(t,["dynamicRetrievalConfig"],Qd(i,n)),t}function tf(i,e){const t={},n=u(e,["dynamicRetrievalConfig"]);return n!=null&&c(t,["dynamicRetrievalConfig"],jd(i,n)),t}function nf(i,e){const t={},n=u(e,["functionDeclarations"]);if(n!=null&&(Array.isArray(n)?c(t,["functionDeclarations"],n.map(a=>Yd(i,a))):c(t,["functionDeclarations"],n)),u(e,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");u(e,["googleSearch"])!=null&&c(t,["googleSearch"],Zd());const s=u(e,["googleSearchRetrieval"]);s!=null&&c(t,["googleSearchRetrieval"],ef(i,s));const o=u(e,["codeExecution"]);return o!=null&&c(t,["codeExecution"],o),t}function rf(i,e){const t={},n=u(e,["functionDeclarations"]);n!=null&&(Array.isArray(n)?c(t,["functionDeclarations"],n.map(l=>Kd(i,l))):c(t,["functionDeclarations"],n));const r=u(e,["retrieval"]);r!=null&&c(t,["retrieval"],r),u(e,["googleSearch"])!=null&&c(t,["googleSearch"],Jd());const o=u(e,["googleSearchRetrieval"]);o!=null&&c(t,["googleSearchRetrieval"],tf(i,o));const a=u(e,["codeExecution"]);return a!=null&&c(t,["codeExecution"],a),t}function sf(i,e){const t={},n=u(e,["handle"]);if(n!=null&&c(t,["handle"],n),u(e,["transparent"])!==void 0)throw new Error("transparent parameter is not supported in Gemini API.");return t}function of(i,e){const t={},n=u(e,["handle"]);n!=null&&c(t,["handle"],n);const r=u(e,["transparent"]);return r!=null&&c(t,["transparent"],r),t}function af(){return{}}function gl(){return{}}function lf(i,e){const t={},n=u(e,["disabled"]);n!=null&&c(t,["disabled"],n);const r=u(e,["startOfSpeechSensitivity"]);r!=null&&c(t,["startOfSpeechSensitivity"],r);const s=u(e,["endOfSpeechSensitivity"]);s!=null&&c(t,["endOfSpeechSensitivity"],s);const o=u(e,["prefixPaddingMs"]);o!=null&&c(t,["prefixPaddingMs"],o);const a=u(e,["silenceDurationMs"]);return a!=null&&c(t,["silenceDurationMs"],a),t}function cf(i,e){const t={},n=u(e,["disabled"]);n!=null&&c(t,["disabled"],n);const r=u(e,["startOfSpeechSensitivity"]);r!=null&&c(t,["startOfSpeechSensitivity"],r);const s=u(e,["endOfSpeechSensitivity"]);s!=null&&c(t,["endOfSpeechSensitivity"],s);const o=u(e,["prefixPaddingMs"]);o!=null&&c(t,["prefixPaddingMs"],o);const a=u(e,["silenceDurationMs"]);return a!=null&&c(t,["silenceDurationMs"],a),t}function uf(i,e){const t={},n=u(e,["automaticActivityDetection"]);n!=null&&c(t,["automaticActivityDetection"],lf(i,n));const r=u(e,["activityHandling"]);r!=null&&c(t,["activityHandling"],r);const s=u(e,["turnCoverage"]);return s!=null&&c(t,["turnCoverage"],s),t}function df(i,e){const t={},n=u(e,["automaticActivityDetection"]);n!=null&&c(t,["automaticActivityDetection"],cf(i,n));const r=u(e,["activityHandling"]);r!=null&&c(t,["activityHandling"],r);const s=u(e,["turnCoverage"]);return s!=null&&c(t,["turnCoverage"],s),t}function ff(i,e){const t={},n=u(e,["targetTokens"]);return n!=null&&c(t,["targetTokens"],n),t}function hf(i,e){const t={},n=u(e,["targetTokens"]);return n!=null&&c(t,["targetTokens"],n),t}function pf(i,e){const t={},n=u(e,["triggerTokens"]);n!=null&&c(t,["triggerTokens"],n);const r=u(e,["slidingWindow"]);return r!=null&&c(t,["slidingWindow"],ff(i,r)),t}function mf(i,e){const t={},n=u(e,["triggerTokens"]);n!=null&&c(t,["triggerTokens"],n);const r=u(e,["slidingWindow"]);return r!=null&&c(t,["slidingWindow"],hf(i,r)),t}function gf(i,e,t){const n={},r=u(e,["generationConfig"]);t!==void 0&&r!=null&&c(t,["setup","generationConfig"],r);const s=u(e,["responseModalities"]);t!==void 0&&s!=null&&c(t,["setup","generationConfig","responseModalities"],s);const o=u(e,["temperature"]);t!==void 0&&o!=null&&c(t,["setup","generationConfig","temperature"],o);const a=u(e,["topP"]);t!==void 0&&a!=null&&c(t,["setup","generationConfig","topP"],a);const l=u(e,["topK"]);t!==void 0&&l!=null&&c(t,["setup","generationConfig","topK"],l);const d=u(e,["maxOutputTokens"]);t!==void 0&&d!=null&&c(t,["setup","generationConfig","maxOutputTokens"],d);const f=u(e,["mediaResolution"]);t!==void 0&&f!=null&&c(t,["setup","generationConfig","mediaResolution"],f);const h=u(e,["seed"]);t!==void 0&&h!=null&&c(t,["setup","generationConfig","seed"],h);const p=u(e,["speechConfig"]);t!==void 0&&p!=null&&c(t,["setup","generationConfig","speechConfig"],p);const g=u(e,["systemInstruction"]);t!==void 0&&g!=null&&c(t,["setup","systemInstruction"],$d(i,kt(i,g)));const S=u(e,["tools"]);t!==void 0&&S!=null&&(Array.isArray(S)?c(t,["setup","tools"],tn(i,tn(i,S).map(w=>nf(i,As(i,w))))):c(t,["setup","tools"],tn(i,S)));const E=u(e,["sessionResumption"]);if(t!==void 0&&E!=null&&c(t,["setup","sessionResumption"],sf(i,E)),u(e,["inputAudioTranscription"])!==void 0)throw new Error("inputAudioTranscription parameter is not supported in Gemini API.");const x=u(e,["outputAudioTranscription"]);t!==void 0&&x!=null&&c(t,["setup","outputAudioTranscription"],af());const m=u(e,["realtimeInputConfig"]);t!==void 0&&m!=null&&c(t,["setup","realtimeInputConfig"],uf(i,m));const P=u(e,["contextWindowCompression"]);return t!==void 0&&P!=null&&c(t,["setup","contextWindowCompression"],pf(i,P)),n}function _f(i,e,t){const n={},r=u(e,["generationConfig"]);t!==void 0&&r!=null&&c(t,["setup","generationConfig"],r);const s=u(e,["responseModalities"]);t!==void 0&&s!=null&&c(t,["setup","generationConfig","responseModalities"],s);const o=u(e,["temperature"]);t!==void 0&&o!=null&&c(t,["setup","generationConfig","temperature"],o);const a=u(e,["topP"]);t!==void 0&&a!=null&&c(t,["setup","generationConfig","topP"],a);const l=u(e,["topK"]);t!==void 0&&l!=null&&c(t,["setup","generationConfig","topK"],l);const d=u(e,["maxOutputTokens"]);t!==void 0&&d!=null&&c(t,["setup","generationConfig","maxOutputTokens"],d);const f=u(e,["mediaResolution"]);t!==void 0&&f!=null&&c(t,["setup","generationConfig","mediaResolution"],f);const h=u(e,["seed"]);t!==void 0&&h!=null&&c(t,["setup","generationConfig","seed"],h);const p=u(e,["speechConfig"]);t!==void 0&&p!=null&&c(t,["setup","generationConfig","speechConfig"],p);const g=u(e,["systemInstruction"]);t!==void 0&&g!=null&&c(t,["setup","systemInstruction"],Xd(i,kt(i,g)));const S=u(e,["tools"]);t!==void 0&&S!=null&&(Array.isArray(S)?c(t,["setup","tools"],tn(i,tn(i,S).map(T=>rf(i,As(i,T))))):c(t,["setup","tools"],tn(i,S)));const E=u(e,["sessionResumption"]);t!==void 0&&E!=null&&c(t,["setup","sessionResumption"],of(i,E));const x=u(e,["inputAudioTranscription"]);t!==void 0&&x!=null&&c(t,["setup","inputAudioTranscription"],gl());const m=u(e,["outputAudioTranscription"]);t!==void 0&&m!=null&&c(t,["setup","outputAudioTranscription"],gl());const P=u(e,["realtimeInputConfig"]);t!==void 0&&P!=null&&c(t,["setup","realtimeInputConfig"],df(i,P));const w=u(e,["contextWindowCompression"]);return t!==void 0&&w!=null&&c(t,["setup","contextWindowCompression"],mf(i,w)),n}function vf(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["setup","model"],bt(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],gf(i,r,t)),t}function xf(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["setup","model"],bt(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],_f(i,r,t)),t}function Sf(){return{}}function yf(){return{}}function Ef(i,e){const t={},n=u(e,["thought"]);n!=null&&c(t,["thought"],n);const r=u(e,["codeExecutionResult"]);r!=null&&c(t,["codeExecutionResult"],r);const s=u(e,["executableCode"]);s!=null&&c(t,["executableCode"],s);const o=u(e,["fileData"]);o!=null&&c(t,["fileData"],o);const a=u(e,["functionCall"]);a!=null&&c(t,["functionCall"],a);const l=u(e,["functionResponse"]);l!=null&&c(t,["functionResponse"],l);const d=u(e,["inlineData"]);d!=null&&c(t,["inlineData"],d);const f=u(e,["text"]);return f!=null&&c(t,["text"],f),t}function Mf(i,e){const t={},n=u(e,["videoMetadata"]);n!=null&&c(t,["videoMetadata"],n);const r=u(e,["thought"]);r!=null&&c(t,["thought"],r);const s=u(e,["codeExecutionResult"]);s!=null&&c(t,["codeExecutionResult"],s);const o=u(e,["executableCode"]);o!=null&&c(t,["executableCode"],o);const a=u(e,["fileData"]);a!=null&&c(t,["fileData"],a);const l=u(e,["functionCall"]);l!=null&&c(t,["functionCall"],l);const d=u(e,["functionResponse"]);d!=null&&c(t,["functionResponse"],d);const f=u(e,["inlineData"]);f!=null&&c(t,["inlineData"],f);const h=u(e,["text"]);return h!=null&&c(t,["text"],h),t}function Tf(i,e){const t={},n=u(e,["parts"]);n!=null&&(Array.isArray(n)?c(t,["parts"],n.map(s=>Ef(i,s))):c(t,["parts"],n));const r=u(e,["role"]);return r!=null&&c(t,["role"],r),t}function Af(i,e){const t={},n=u(e,["parts"]);n!=null&&(Array.isArray(n)?c(t,["parts"],n.map(s=>Mf(i,s))):c(t,["parts"],n));const r=u(e,["role"]);return r!=null&&c(t,["role"],r),t}function _l(i,e){const t={},n=u(e,["text"]);n!=null&&c(t,["text"],n);const r=u(e,["finished"]);return r!=null&&c(t,["finished"],r),t}function vl(i,e){const t={},n=u(e,["text"]);n!=null&&c(t,["text"],n);const r=u(e,["finished"]);return r!=null&&c(t,["finished"],r),t}function Cf(i,e){const t={},n=u(e,["modelTurn"]);n!=null&&c(t,["modelTurn"],Tf(i,n));const r=u(e,["turnComplete"]);r!=null&&c(t,["turnComplete"],r);const s=u(e,["interrupted"]);s!=null&&c(t,["interrupted"],s);const o=u(e,["generationComplete"]);o!=null&&c(t,["generationComplete"],o);const a=u(e,["inputTranscription"]);a!=null&&c(t,["inputTranscription"],_l(i,a));const l=u(e,["outputTranscription"]);return l!=null&&c(t,["outputTranscription"],_l(i,l)),t}function wf(i,e){const t={},n=u(e,["modelTurn"]);n!=null&&c(t,["modelTurn"],Af(i,n));const r=u(e,["turnComplete"]);r!=null&&c(t,["turnComplete"],r);const s=u(e,["interrupted"]);s!=null&&c(t,["interrupted"],s);const o=u(e,["generationComplete"]);o!=null&&c(t,["generationComplete"],o);const a=u(e,["inputTranscription"]);a!=null&&c(t,["inputTranscription"],vl(i,a));const l=u(e,["outputTranscription"]);return l!=null&&c(t,["outputTranscription"],vl(i,l)),t}function Rf(i,e){const t={},n=u(e,["id"]);n!=null&&c(t,["id"],n);const r=u(e,["args"]);r!=null&&c(t,["args"],r);const s=u(e,["name"]);return s!=null&&c(t,["name"],s),t}function bf(i,e){const t={},n=u(e,["args"]);n!=null&&c(t,["args"],n);const r=u(e,["name"]);return r!=null&&c(t,["name"],r),t}function Pf(i,e){const t={},n=u(e,["functionCalls"]);return n!=null&&(Array.isArray(n)?c(t,["functionCalls"],n.map(r=>Rf(i,r))):c(t,["functionCalls"],n)),t}function If(i,e){const t={},n=u(e,["functionCalls"]);return n!=null&&(Array.isArray(n)?c(t,["functionCalls"],n.map(r=>bf(i,r))):c(t,["functionCalls"],n)),t}function Df(i,e){const t={},n=u(e,["ids"]);return n!=null&&c(t,["ids"],n),t}function Uf(i,e){const t={},n=u(e,["ids"]);return n!=null&&c(t,["ids"],n),t}function Pr(i,e){const t={},n=u(e,["modality"]);n!=null&&c(t,["modality"],n);const r=u(e,["tokenCount"]);return r!=null&&c(t,["tokenCount"],r),t}function Ir(i,e){const t={},n=u(e,["modality"]);n!=null&&c(t,["modality"],n);const r=u(e,["tokenCount"]);return r!=null&&c(t,["tokenCount"],r),t}function Lf(i,e){const t={},n=u(e,["promptTokenCount"]);n!=null&&c(t,["promptTokenCount"],n);const r=u(e,["cachedContentTokenCount"]);r!=null&&c(t,["cachedContentTokenCount"],r);const s=u(e,["responseTokenCount"]);s!=null&&c(t,["responseTokenCount"],s);const o=u(e,["toolUsePromptTokenCount"]);o!=null&&c(t,["toolUsePromptTokenCount"],o);const a=u(e,["thoughtsTokenCount"]);a!=null&&c(t,["thoughtsTokenCount"],a);const l=u(e,["totalTokenCount"]);l!=null&&c(t,["totalTokenCount"],l);const d=u(e,["promptTokensDetails"]);d!=null&&(Array.isArray(d)?c(t,["promptTokensDetails"],d.map(g=>Pr(i,g))):c(t,["promptTokensDetails"],d));const f=u(e,["cacheTokensDetails"]);f!=null&&(Array.isArray(f)?c(t,["cacheTokensDetails"],f.map(g=>Pr(i,g))):c(t,["cacheTokensDetails"],f));const h=u(e,["responseTokensDetails"]);h!=null&&(Array.isArray(h)?c(t,["responseTokensDetails"],h.map(g=>Pr(i,g))):c(t,["responseTokensDetails"],h));const p=u(e,["toolUsePromptTokensDetails"]);return p!=null&&(Array.isArray(p)?c(t,["toolUsePromptTokensDetails"],p.map(g=>Pr(i,g))):c(t,["toolUsePromptTokensDetails"],p)),t}function Nf(i,e){const t={},n=u(e,["promptTokenCount"]);n!=null&&c(t,["promptTokenCount"],n);const r=u(e,["cachedContentTokenCount"]);r!=null&&c(t,["cachedContentTokenCount"],r);const s=u(e,["candidatesTokenCount"]);s!=null&&c(t,["responseTokenCount"],s);const o=u(e,["toolUsePromptTokenCount"]);o!=null&&c(t,["toolUsePromptTokenCount"],o);const a=u(e,["thoughtsTokenCount"]);a!=null&&c(t,["thoughtsTokenCount"],a);const l=u(e,["totalTokenCount"]);l!=null&&c(t,["totalTokenCount"],l);const d=u(e,["promptTokensDetails"]);d!=null&&(Array.isArray(d)?c(t,["promptTokensDetails"],d.map(S=>Ir(i,S))):c(t,["promptTokensDetails"],d));const f=u(e,["cacheTokensDetails"]);f!=null&&(Array.isArray(f)?c(t,["cacheTokensDetails"],f.map(S=>Ir(i,S))):c(t,["cacheTokensDetails"],f));const h=u(e,["candidatesTokensDetails"]);h!=null&&(Array.isArray(h)?c(t,["responseTokensDetails"],h.map(S=>Ir(i,S))):c(t,["responseTokensDetails"],h));const p=u(e,["toolUsePromptTokensDetails"]);p!=null&&(Array.isArray(p)?c(t,["toolUsePromptTokensDetails"],p.map(S=>Ir(i,S))):c(t,["toolUsePromptTokensDetails"],p));const g=u(e,["trafficType"]);return g!=null&&c(t,["trafficType"],g),t}function Ff(i,e){const t={},n=u(e,["timeLeft"]);return n!=null&&c(t,["timeLeft"],n),t}function Of(i,e){const t={},n=u(e,["timeLeft"]);return n!=null&&c(t,["timeLeft"],n),t}function Bf(i,e){const t={},n=u(e,["newHandle"]);n!=null&&c(t,["newHandle"],n);const r=u(e,["resumable"]);r!=null&&c(t,["resumable"],r);const s=u(e,["lastConsumedClientMessageIndex"]);return s!=null&&c(t,["lastConsumedClientMessageIndex"],s),t}function zf(i,e){const t={},n=u(e,["newHandle"]);n!=null&&c(t,["newHandle"],n);const r=u(e,["resumable"]);r!=null&&c(t,["resumable"],r);const s=u(e,["lastConsumedClientMessageIndex"]);return s!=null&&c(t,["lastConsumedClientMessageIndex"],s),t}function Vf(i,e){const t={};u(e,["setupComplete"])!=null&&c(t,["setupComplete"],Sf());const r=u(e,["serverContent"]);r!=null&&c(t,["serverContent"],Cf(i,r));const s=u(e,["toolCall"]);s!=null&&c(t,["toolCall"],Pf(i,s));const o=u(e,["toolCallCancellation"]);o!=null&&c(t,["toolCallCancellation"],Df(i,o));const a=u(e,["usageMetadata"]);a!=null&&c(t,["usageMetadata"],Lf(i,a));const l=u(e,["goAway"]);l!=null&&c(t,["goAway"],Ff(i,l));const d=u(e,["sessionResumptionUpdate"]);return d!=null&&c(t,["sessionResumptionUpdate"],Bf(i,d)),t}function kf(i,e){const t={};u(e,["setupComplete"])!=null&&c(t,["setupComplete"],yf());const r=u(e,["serverContent"]);r!=null&&c(t,["serverContent"],wf(i,r));const s=u(e,["toolCall"]);s!=null&&c(t,["toolCall"],If(i,s));const o=u(e,["toolCallCancellation"]);o!=null&&c(t,["toolCallCancellation"],Uf(i,o));const a=u(e,["usageMetadata"]);a!=null&&c(t,["usageMetadata"],Nf(i,a));const l=u(e,["goAway"]);l!=null&&c(t,["goAway"],Of(i,l));const d=u(e,["sessionResumptionUpdate"]);return d!=null&&c(t,["sessionResumptionUpdate"],zf(i,d)),t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Hf(i,e){const t={};if(u(e,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=u(e,["thought"]);n!=null&&c(t,["thought"],n);const r=u(e,["codeExecutionResult"]);r!=null&&c(t,["codeExecutionResult"],r);const s=u(e,["executableCode"]);s!=null&&c(t,["executableCode"],s);const o=u(e,["fileData"]);o!=null&&c(t,["fileData"],o);const a=u(e,["functionCall"]);a!=null&&c(t,["functionCall"],a);const l=u(e,["functionResponse"]);l!=null&&c(t,["functionResponse"],l);const d=u(e,["inlineData"]);d!=null&&c(t,["inlineData"],d);const f=u(e,["text"]);return f!=null&&c(t,["text"],f),t}function Cs(i,e){const t={},n=u(e,["parts"]);n!=null&&(Array.isArray(n)?c(t,["parts"],n.map(s=>Hf(i,s))):c(t,["parts"],n));const r=u(e,["role"]);return r!=null&&c(t,["role"],r),t}function Gf(i,e){const t={};if(u(e,["example"])!==void 0)throw new Error("example parameter is not supported in Gemini API.");if(u(e,["pattern"])!==void 0)throw new Error("pattern parameter is not supported in Gemini API.");if(u(e,["default"])!==void 0)throw new Error("default parameter is not supported in Gemini API.");if(u(e,["maxLength"])!==void 0)throw new Error("maxLength parameter is not supported in Gemini API.");if(u(e,["minLength"])!==void 0)throw new Error("minLength parameter is not supported in Gemini API.");if(u(e,["minProperties"])!==void 0)throw new Error("minProperties parameter is not supported in Gemini API.");if(u(e,["maxProperties"])!==void 0)throw new Error("maxProperties parameter is not supported in Gemini API.");const n=u(e,["anyOf"]);n!=null&&c(t,["anyOf"],n);const r=u(e,["description"]);r!=null&&c(t,["description"],r);const s=u(e,["enum"]);s!=null&&c(t,["enum"],s);const o=u(e,["format"]);o!=null&&c(t,["format"],o);const a=u(e,["items"]);a!=null&&c(t,["items"],a);const l=u(e,["maxItems"]);l!=null&&c(t,["maxItems"],l);const d=u(e,["maximum"]);d!=null&&c(t,["maximum"],d);const f=u(e,["minItems"]);f!=null&&c(t,["minItems"],f);const h=u(e,["minimum"]);h!=null&&c(t,["minimum"],h);const p=u(e,["nullable"]);p!=null&&c(t,["nullable"],p);const g=u(e,["properties"]);g!=null&&c(t,["properties"],g);const S=u(e,["propertyOrdering"]);S!=null&&c(t,["propertyOrdering"],S);const E=u(e,["required"]);E!=null&&c(t,["required"],E);const x=u(e,["title"]);x!=null&&c(t,["title"],x);const m=u(e,["type"]);return m!=null&&c(t,["type"],m),t}function Wf(i,e){const t={};if(u(e,["method"])!==void 0)throw new Error("method parameter is not supported in Gemini API.");const n=u(e,["category"]);n!=null&&c(t,["category"],n);const r=u(e,["threshold"]);return r!=null&&c(t,["threshold"],r),t}function $f(i,e){const t={};if(u(e,["response"])!==void 0)throw new Error("response parameter is not supported in Gemini API.");const n=u(e,["description"]);n!=null&&c(t,["description"],n);const r=u(e,["name"]);r!=null&&c(t,["name"],r);const s=u(e,["parameters"]);return s!=null&&c(t,["parameters"],s),t}function Xf(){return{}}function qf(i,e){const t={},n=u(e,["mode"]);n!=null&&c(t,["mode"],n);const r=u(e,["dynamicThreshold"]);return r!=null&&c(t,["dynamicThreshold"],r),t}function Yf(i,e){const t={},n=u(e,["dynamicRetrievalConfig"]);return n!=null&&c(t,["dynamicRetrievalConfig"],qf(i,n)),t}function Kf(i,e){const t={},n=u(e,["functionDeclarations"]);if(n!=null&&(Array.isArray(n)?c(t,["functionDeclarations"],n.map(a=>$f(i,a))):c(t,["functionDeclarations"],n)),u(e,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");u(e,["googleSearch"])!=null&&c(t,["googleSearch"],Xf());const s=u(e,["googleSearchRetrieval"]);s!=null&&c(t,["googleSearchRetrieval"],Yf(i,s));const o=u(e,["codeExecution"]);return o!=null&&c(t,["codeExecution"],o),t}function Zf(i,e){const t={},n=u(e,["mode"]);n!=null&&c(t,["mode"],n);const r=u(e,["allowedFunctionNames"]);return r!=null&&c(t,["allowedFunctionNames"],r),t}function Jf(i,e){const t={},n=u(e,["functionCallingConfig"]);return n!=null&&c(t,["functionCallingConfig"],Zf(i,n)),t}function Qf(i,e){const t={},n=u(e,["voiceName"]);return n!=null&&c(t,["voiceName"],n),t}function jf(i,e){const t={},n=u(e,["prebuiltVoiceConfig"]);return n!=null&&c(t,["prebuiltVoiceConfig"],Qf(i,n)),t}function eh(i,e){const t={},n=u(e,["voiceConfig"]);n!=null&&c(t,["voiceConfig"],jf(i,n));const r=u(e,["languageCode"]);return r!=null&&c(t,["languageCode"],r),t}function th(i,e){const t={},n=u(e,["includeThoughts"]);n!=null&&c(t,["includeThoughts"],n);const r=u(e,["thinkingBudget"]);return r!=null&&c(t,["thinkingBudget"],r),t}function nh(i,e,t){const n={},r=u(e,["systemInstruction"]);t!==void 0&&r!=null&&c(t,["systemInstruction"],Cs(i,kt(i,r)));const s=u(e,["temperature"]);s!=null&&c(n,["temperature"],s);const o=u(e,["topP"]);o!=null&&c(n,["topP"],o);const a=u(e,["topK"]);a!=null&&c(n,["topK"],a);const l=u(e,["candidateCount"]);l!=null&&c(n,["candidateCount"],l);const d=u(e,["maxOutputTokens"]);d!=null&&c(n,["maxOutputTokens"],d);const f=u(e,["stopSequences"]);f!=null&&c(n,["stopSequences"],f);const h=u(e,["responseLogprobs"]);h!=null&&c(n,["responseLogprobs"],h);const p=u(e,["logprobs"]);p!=null&&c(n,["logprobs"],p);const g=u(e,["presencePenalty"]);g!=null&&c(n,["presencePenalty"],g);const S=u(e,["frequencyPenalty"]);S!=null&&c(n,["frequencyPenalty"],S);const E=u(e,["seed"]);E!=null&&c(n,["seed"],E);const x=u(e,["responseMimeType"]);x!=null&&c(n,["responseMimeType"],x);const m=u(e,["responseSchema"]);if(m!=null&&c(n,["responseSchema"],Gf(i,zc(i,m))),u(e,["routingConfig"])!==void 0)throw new Error("routingConfig parameter is not supported in Gemini API.");if(u(e,["modelSelectionConfig"])!==void 0)throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");const P=u(e,["safetySettings"]);t!==void 0&&P!=null&&(Array.isArray(P)?c(t,["safetySettings"],P.map(M=>Wf(i,M))):c(t,["safetySettings"],P));const w=u(e,["tools"]);t!==void 0&&w!=null&&(Array.isArray(w)?c(t,["tools"],tn(i,tn(i,w).map(M=>Kf(i,As(i,M))))):c(t,["tools"],tn(i,w)));const T=u(e,["toolConfig"]);if(t!==void 0&&T!=null&&c(t,["toolConfig"],Jf(i,T)),u(e,["labels"])!==void 0)throw new Error("labels parameter is not supported in Gemini API.");const z=u(e,["cachedContent"]);t!==void 0&&z!=null&&c(t,["cachedContent"],Kn(i,z));const F=u(e,["responseModalities"]);F!=null&&c(n,["responseModalities"],F);const N=u(e,["mediaResolution"]);N!=null&&c(n,["mediaResolution"],N);const V=u(e,["speechConfig"]);if(V!=null&&c(n,["speechConfig"],eh(i,Vc(i,V))),u(e,["audioTimestamp"])!==void 0)throw new Error("audioTimestamp parameter is not supported in Gemini API.");const R=u(e,["thinkingConfig"]);return R!=null&&c(n,["thinkingConfig"],th(i,R)),n}function xl(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["_url","model"],bt(i,n));const r=u(e,["contents"]);r!=null&&(Array.isArray(r)?c(t,["contents"],vt(i,vt(i,r).map(o=>Cs(i,o)))):c(t,["contents"],vt(i,r)));const s=u(e,["config"]);return s!=null&&c(t,["generationConfig"],nh(i,s,t)),t}function ih(i,e,t){const n={},r=u(e,["taskType"]);t!==void 0&&r!=null&&c(t,["requests[]","taskType"],r);const s=u(e,["title"]);t!==void 0&&s!=null&&c(t,["requests[]","title"],s);const o=u(e,["outputDimensionality"]);if(t!==void 0&&o!=null&&c(t,["requests[]","outputDimensionality"],o),u(e,["mimeType"])!==void 0)throw new Error("mimeType parameter is not supported in Gemini API.");if(u(e,["autoTruncate"])!==void 0)throw new Error("autoTruncate parameter is not supported in Gemini API.");return n}function rh(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["_url","model"],bt(i,n));const r=u(e,["contents"]);r!=null&&c(t,["requests[]","content"],Bc(i,r));const s=u(e,["config"]);s!=null&&c(t,["config"],ih(i,s,t));const o=u(e,["model"]);return o!==void 0&&c(t,["requests[]","model"],bt(i,o)),t}function sh(i,e,t){const n={};if(u(e,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(u(e,["negativePrompt"])!==void 0)throw new Error("negativePrompt parameter is not supported in Gemini API.");const r=u(e,["numberOfImages"]);t!==void 0&&r!=null&&c(t,["parameters","sampleCount"],r);const s=u(e,["aspectRatio"]);t!==void 0&&s!=null&&c(t,["parameters","aspectRatio"],s);const o=u(e,["guidanceScale"]);if(t!==void 0&&o!=null&&c(t,["parameters","guidanceScale"],o),u(e,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const a=u(e,["safetyFilterLevel"]);t!==void 0&&a!=null&&c(t,["parameters","safetySetting"],a);const l=u(e,["personGeneration"]);t!==void 0&&l!=null&&c(t,["parameters","personGeneration"],l);const d=u(e,["includeSafetyAttributes"]);t!==void 0&&d!=null&&c(t,["parameters","includeSafetyAttributes"],d);const f=u(e,["includeRaiReason"]);t!==void 0&&f!=null&&c(t,["parameters","includeRaiReason"],f);const h=u(e,["language"]);t!==void 0&&h!=null&&c(t,["parameters","language"],h);const p=u(e,["outputMimeType"]);t!==void 0&&p!=null&&c(t,["parameters","outputOptions","mimeType"],p);const g=u(e,["outputCompressionQuality"]);if(t!==void 0&&g!=null&&c(t,["parameters","outputOptions","compressionQuality"],g),u(e,["addWatermark"])!==void 0)throw new Error("addWatermark parameter is not supported in Gemini API.");if(u(e,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return n}function oh(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["_url","model"],bt(i,n));const r=u(e,["prompt"]);r!=null&&c(t,["instances[0]","prompt"],r);const s=u(e,["config"]);return s!=null&&c(t,["config"],sh(i,s,t)),t}function ah(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["_url","name"],bt(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],r),t}function lh(i,e){const t={};if(u(e,["systemInstruction"])!==void 0)throw new Error("systemInstruction parameter is not supported in Gemini API.");if(u(e,["tools"])!==void 0)throw new Error("tools parameter is not supported in Gemini API.");if(u(e,["generationConfig"])!==void 0)throw new Error("generationConfig parameter is not supported in Gemini API.");return t}function ch(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["_url","model"],bt(i,n));const r=u(e,["contents"]);r!=null&&(Array.isArray(r)?c(t,["contents"],vt(i,vt(i,r).map(o=>Cs(i,o)))):c(t,["contents"],vt(i,r)));const s=u(e,["config"]);return s!=null&&c(t,["config"],lh(i,s)),t}function uh(i,e){const t={};if(u(e,["gcsUri"])!==void 0)throw new Error("gcsUri parameter is not supported in Gemini API.");const n=u(e,["imageBytes"]);n!=null&&c(t,["bytesBase64Encoded"],Zn(i,n));const r=u(e,["mimeType"]);return r!=null&&c(t,["mimeType"],r),t}function dh(i,e,t){const n={},r=u(e,["numberOfVideos"]);if(t!==void 0&&r!=null&&c(t,["parameters","sampleCount"],r),u(e,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(u(e,["fps"])!==void 0)throw new Error("fps parameter is not supported in Gemini API.");const s=u(e,["durationSeconds"]);if(t!==void 0&&s!=null&&c(t,["parameters","durationSeconds"],s),u(e,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const o=u(e,["aspectRatio"]);if(t!==void 0&&o!=null&&c(t,["parameters","aspectRatio"],o),u(e,["resolution"])!==void 0)throw new Error("resolution parameter is not supported in Gemini API.");const a=u(e,["personGeneration"]);if(t!==void 0&&a!=null&&c(t,["parameters","personGeneration"],a),u(e,["pubsubTopic"])!==void 0)throw new Error("pubsubTopic parameter is not supported in Gemini API.");const l=u(e,["negativePrompt"]);if(t!==void 0&&l!=null&&c(t,["parameters","negativePrompt"],l),u(e,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return n}function fh(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["_url","model"],bt(i,n));const r=u(e,["prompt"]);r!=null&&c(t,["instances[0]","prompt"],r);const s=u(e,["image"]);s!=null&&c(t,["instances[0]","image"],uh(i,s));const o=u(e,["config"]);return o!=null&&c(t,["config"],dh(i,o,t)),t}function hh(i,e){const t={},n=u(e,["videoMetadata"]);n!=null&&c(t,["videoMetadata"],n);const r=u(e,["thought"]);r!=null&&c(t,["thought"],r);const s=u(e,["codeExecutionResult"]);s!=null&&c(t,["codeExecutionResult"],s);const o=u(e,["executableCode"]);o!=null&&c(t,["executableCode"],o);const a=u(e,["fileData"]);a!=null&&c(t,["fileData"],a);const l=u(e,["functionCall"]);l!=null&&c(t,["functionCall"],l);const d=u(e,["functionResponse"]);d!=null&&c(t,["functionResponse"],d);const f=u(e,["inlineData"]);f!=null&&c(t,["inlineData"],f);const h=u(e,["text"]);return h!=null&&c(t,["text"],h),t}function Hi(i,e){const t={},n=u(e,["parts"]);n!=null&&(Array.isArray(n)?c(t,["parts"],n.map(s=>hh(i,s))):c(t,["parts"],n));const r=u(e,["role"]);return r!=null&&c(t,["role"],r),t}function Wc(i,e){const t={},n=u(e,["example"]);n!=null&&c(t,["example"],n);const r=u(e,["pattern"]);r!=null&&c(t,["pattern"],r);const s=u(e,["default"]);s!=null&&c(t,["default"],s);const o=u(e,["maxLength"]);o!=null&&c(t,["maxLength"],o);const a=u(e,["minLength"]);a!=null&&c(t,["minLength"],a);const l=u(e,["minProperties"]);l!=null&&c(t,["minProperties"],l);const d=u(e,["maxProperties"]);d!=null&&c(t,["maxProperties"],d);const f=u(e,["anyOf"]);f!=null&&c(t,["anyOf"],f);const h=u(e,["description"]);h!=null&&c(t,["description"],h);const p=u(e,["enum"]);p!=null&&c(t,["enum"],p);const g=u(e,["format"]);g!=null&&c(t,["format"],g);const S=u(e,["items"]);S!=null&&c(t,["items"],S);const E=u(e,["maxItems"]);E!=null&&c(t,["maxItems"],E);const x=u(e,["maximum"]);x!=null&&c(t,["maximum"],x);const m=u(e,["minItems"]);m!=null&&c(t,["minItems"],m);const P=u(e,["minimum"]);P!=null&&c(t,["minimum"],P);const w=u(e,["nullable"]);w!=null&&c(t,["nullable"],w);const T=u(e,["properties"]);T!=null&&c(t,["properties"],T);const z=u(e,["propertyOrdering"]);z!=null&&c(t,["propertyOrdering"],z);const F=u(e,["required"]);F!=null&&c(t,["required"],F);const N=u(e,["title"]);N!=null&&c(t,["title"],N);const V=u(e,["type"]);return V!=null&&c(t,["type"],V),t}function ph(i,e){const t={},n=u(e,["featureSelectionPreference"]);return n!=null&&c(t,["featureSelectionPreference"],n),t}function mh(i,e){const t={},n=u(e,["method"]);n!=null&&c(t,["method"],n);const r=u(e,["category"]);r!=null&&c(t,["category"],r);const s=u(e,["threshold"]);return s!=null&&c(t,["threshold"],s),t}function gh(i,e){const t={},n=u(e,["response"]);n!=null&&c(t,["response"],Wc(i,n));const r=u(e,["description"]);r!=null&&c(t,["description"],r);const s=u(e,["name"]);s!=null&&c(t,["name"],s);const o=u(e,["parameters"]);return o!=null&&c(t,["parameters"],o),t}function _h(){return{}}function vh(i,e){const t={},n=u(e,["mode"]);n!=null&&c(t,["mode"],n);const r=u(e,["dynamicThreshold"]);return r!=null&&c(t,["dynamicThreshold"],r),t}function xh(i,e){const t={},n=u(e,["dynamicRetrievalConfig"]);return n!=null&&c(t,["dynamicRetrievalConfig"],vh(i,n)),t}function $c(i,e){const t={},n=u(e,["functionDeclarations"]);n!=null&&(Array.isArray(n)?c(t,["functionDeclarations"],n.map(l=>gh(i,l))):c(t,["functionDeclarations"],n));const r=u(e,["retrieval"]);r!=null&&c(t,["retrieval"],r),u(e,["googleSearch"])!=null&&c(t,["googleSearch"],_h());const o=u(e,["googleSearchRetrieval"]);o!=null&&c(t,["googleSearchRetrieval"],xh(i,o));const a=u(e,["codeExecution"]);return a!=null&&c(t,["codeExecution"],a),t}function Sh(i,e){const t={},n=u(e,["mode"]);n!=null&&c(t,["mode"],n);const r=u(e,["allowedFunctionNames"]);return r!=null&&c(t,["allowedFunctionNames"],r),t}function yh(i,e){const t={},n=u(e,["functionCallingConfig"]);return n!=null&&c(t,["functionCallingConfig"],Sh(i,n)),t}function Eh(i,e){const t={},n=u(e,["voiceName"]);return n!=null&&c(t,["voiceName"],n),t}function Mh(i,e){const t={},n=u(e,["prebuiltVoiceConfig"]);return n!=null&&c(t,["prebuiltVoiceConfig"],Eh(i,n)),t}function Th(i,e){const t={},n=u(e,["voiceConfig"]);n!=null&&c(t,["voiceConfig"],Mh(i,n));const r=u(e,["languageCode"]);return r!=null&&c(t,["languageCode"],r),t}function Ah(i,e){const t={},n=u(e,["includeThoughts"]);n!=null&&c(t,["includeThoughts"],n);const r=u(e,["thinkingBudget"]);return r!=null&&c(t,["thinkingBudget"],r),t}function Ch(i,e,t){const n={},r=u(e,["systemInstruction"]);t!==void 0&&r!=null&&c(t,["systemInstruction"],Hi(i,kt(i,r)));const s=u(e,["temperature"]);s!=null&&c(n,["temperature"],s);const o=u(e,["topP"]);o!=null&&c(n,["topP"],o);const a=u(e,["topK"]);a!=null&&c(n,["topK"],a);const l=u(e,["candidateCount"]);l!=null&&c(n,["candidateCount"],l);const d=u(e,["maxOutputTokens"]);d!=null&&c(n,["maxOutputTokens"],d);const f=u(e,["stopSequences"]);f!=null&&c(n,["stopSequences"],f);const h=u(e,["responseLogprobs"]);h!=null&&c(n,["responseLogprobs"],h);const p=u(e,["logprobs"]);p!=null&&c(n,["logprobs"],p);const g=u(e,["presencePenalty"]);g!=null&&c(n,["presencePenalty"],g);const S=u(e,["frequencyPenalty"]);S!=null&&c(n,["frequencyPenalty"],S);const E=u(e,["seed"]);E!=null&&c(n,["seed"],E);const x=u(e,["responseMimeType"]);x!=null&&c(n,["responseMimeType"],x);const m=u(e,["responseSchema"]);m!=null&&c(n,["responseSchema"],Wc(i,zc(i,m)));const P=u(e,["routingConfig"]);P!=null&&c(n,["routingConfig"],P);const w=u(e,["modelSelectionConfig"]);w!=null&&c(n,["modelConfig"],ph(i,w));const T=u(e,["safetySettings"]);t!==void 0&&T!=null&&(Array.isArray(T)?c(t,["safetySettings"],T.map(ie=>mh(i,ie))):c(t,["safetySettings"],T));const z=u(e,["tools"]);t!==void 0&&z!=null&&(Array.isArray(z)?c(t,["tools"],tn(i,tn(i,z).map(ie=>$c(i,As(i,ie))))):c(t,["tools"],tn(i,z)));const F=u(e,["toolConfig"]);t!==void 0&&F!=null&&c(t,["toolConfig"],yh(i,F));const N=u(e,["labels"]);t!==void 0&&N!=null&&c(t,["labels"],N);const V=u(e,["cachedContent"]);t!==void 0&&V!=null&&c(t,["cachedContent"],Kn(i,V));const R=u(e,["responseModalities"]);R!=null&&c(n,["responseModalities"],R);const M=u(e,["mediaResolution"]);M!=null&&c(n,["mediaResolution"],M);const O=u(e,["speechConfig"]);O!=null&&c(n,["speechConfig"],Th(i,Vc(i,O)));const Z=u(e,["audioTimestamp"]);Z!=null&&c(n,["audioTimestamp"],Z);const Y=u(e,["thinkingConfig"]);return Y!=null&&c(n,["thinkingConfig"],Ah(i,Y)),n}function Sl(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["_url","model"],bt(i,n));const r=u(e,["contents"]);r!=null&&(Array.isArray(r)?c(t,["contents"],vt(i,vt(i,r).map(o=>Hi(i,o)))):c(t,["contents"],vt(i,r)));const s=u(e,["config"]);return s!=null&&c(t,["generationConfig"],Ch(i,s,t)),t}function wh(i,e,t){const n={},r=u(e,["taskType"]);t!==void 0&&r!=null&&c(t,["instances[]","task_type"],r);const s=u(e,["title"]);t!==void 0&&s!=null&&c(t,["instances[]","title"],s);const o=u(e,["outputDimensionality"]);t!==void 0&&o!=null&&c(t,["parameters","outputDimensionality"],o);const a=u(e,["mimeType"]);t!==void 0&&a!=null&&c(t,["instances[]","mimeType"],a);const l=u(e,["autoTruncate"]);return t!==void 0&&l!=null&&c(t,["parameters","autoTruncate"],l),n}function Rh(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["_url","model"],bt(i,n));const r=u(e,["contents"]);r!=null&&c(t,["instances[]","content"],Bc(i,r));const s=u(e,["config"]);return s!=null&&c(t,["config"],wh(i,s,t)),t}function bh(i,e,t){const n={},r=u(e,["outputGcsUri"]);t!==void 0&&r!=null&&c(t,["parameters","storageUri"],r);const s=u(e,["negativePrompt"]);t!==void 0&&s!=null&&c(t,["parameters","negativePrompt"],s);const o=u(e,["numberOfImages"]);t!==void 0&&o!=null&&c(t,["parameters","sampleCount"],o);const a=u(e,["aspectRatio"]);t!==void 0&&a!=null&&c(t,["parameters","aspectRatio"],a);const l=u(e,["guidanceScale"]);t!==void 0&&l!=null&&c(t,["parameters","guidanceScale"],l);const d=u(e,["seed"]);t!==void 0&&d!=null&&c(t,["parameters","seed"],d);const f=u(e,["safetyFilterLevel"]);t!==void 0&&f!=null&&c(t,["parameters","safetySetting"],f);const h=u(e,["personGeneration"]);t!==void 0&&h!=null&&c(t,["parameters","personGeneration"],h);const p=u(e,["includeSafetyAttributes"]);t!==void 0&&p!=null&&c(t,["parameters","includeSafetyAttributes"],p);const g=u(e,["includeRaiReason"]);t!==void 0&&g!=null&&c(t,["parameters","includeRaiReason"],g);const S=u(e,["language"]);t!==void 0&&S!=null&&c(t,["parameters","language"],S);const E=u(e,["outputMimeType"]);t!==void 0&&E!=null&&c(t,["parameters","outputOptions","mimeType"],E);const x=u(e,["outputCompressionQuality"]);t!==void 0&&x!=null&&c(t,["parameters","outputOptions","compressionQuality"],x);const m=u(e,["addWatermark"]);t!==void 0&&m!=null&&c(t,["parameters","addWatermark"],m);const P=u(e,["enhancePrompt"]);return t!==void 0&&P!=null&&c(t,["parameters","enhancePrompt"],P),n}function Ph(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["_url","model"],bt(i,n));const r=u(e,["prompt"]);r!=null&&c(t,["instances[0]","prompt"],r);const s=u(e,["config"]);return s!=null&&c(t,["config"],bh(i,s,t)),t}function Ih(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["_url","name"],bt(i,n));const r=u(e,["config"]);return r!=null&&c(t,["config"],r),t}function Dh(i,e,t){const n={},r=u(e,["systemInstruction"]);t!==void 0&&r!=null&&c(t,["systemInstruction"],Hi(i,kt(i,r)));const s=u(e,["tools"]);t!==void 0&&s!=null&&(Array.isArray(s)?c(t,["tools"],s.map(a=>$c(i,a))):c(t,["tools"],s));const o=u(e,["generationConfig"]);return t!==void 0&&o!=null&&c(t,["generationConfig"],o),n}function Uh(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["_url","model"],bt(i,n));const r=u(e,["contents"]);r!=null&&(Array.isArray(r)?c(t,["contents"],vt(i,vt(i,r).map(o=>Hi(i,o)))):c(t,["contents"],vt(i,r)));const s=u(e,["config"]);return s!=null&&c(t,["config"],Dh(i,s,t)),t}function Lh(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["_url","model"],bt(i,n));const r=u(e,["contents"]);r!=null&&(Array.isArray(r)?c(t,["contents"],vt(i,vt(i,r).map(o=>Hi(i,o)))):c(t,["contents"],vt(i,r)));const s=u(e,["config"]);return s!=null&&c(t,["config"],s),t}function Nh(i,e){const t={},n=u(e,["gcsUri"]);n!=null&&c(t,["gcsUri"],n);const r=u(e,["imageBytes"]);r!=null&&c(t,["bytesBase64Encoded"],Zn(i,r));const s=u(e,["mimeType"]);return s!=null&&c(t,["mimeType"],s),t}function Fh(i,e,t){const n={},r=u(e,["numberOfVideos"]);t!==void 0&&r!=null&&c(t,["parameters","sampleCount"],r);const s=u(e,["outputGcsUri"]);t!==void 0&&s!=null&&c(t,["parameters","storageUri"],s);const o=u(e,["fps"]);t!==void 0&&o!=null&&c(t,["parameters","fps"],o);const a=u(e,["durationSeconds"]);t!==void 0&&a!=null&&c(t,["parameters","durationSeconds"],a);const l=u(e,["seed"]);t!==void 0&&l!=null&&c(t,["parameters","seed"],l);const d=u(e,["aspectRatio"]);t!==void 0&&d!=null&&c(t,["parameters","aspectRatio"],d);const f=u(e,["resolution"]);t!==void 0&&f!=null&&c(t,["parameters","resolution"],f);const h=u(e,["personGeneration"]);t!==void 0&&h!=null&&c(t,["parameters","personGeneration"],h);const p=u(e,["pubsubTopic"]);t!==void 0&&p!=null&&c(t,["parameters","pubsubTopic"],p);const g=u(e,["negativePrompt"]);t!==void 0&&g!=null&&c(t,["parameters","negativePrompt"],g);const S=u(e,["enhancePrompt"]);return t!==void 0&&S!=null&&c(t,["parameters","enhancePrompt"],S),n}function Oh(i,e){const t={},n=u(e,["model"]);n!=null&&c(t,["_url","model"],bt(i,n));const r=u(e,["prompt"]);r!=null&&c(t,["instances[0]","prompt"],r);const s=u(e,["image"]);s!=null&&c(t,["instances[0]","image"],Nh(i,s));const o=u(e,["config"]);return o!=null&&c(t,["config"],Fh(i,o,t)),t}function Bh(i,e){const t={},n=u(e,["thought"]);n!=null&&c(t,["thought"],n);const r=u(e,["codeExecutionResult"]);r!=null&&c(t,["codeExecutionResult"],r);const s=u(e,["executableCode"]);s!=null&&c(t,["executableCode"],s);const o=u(e,["fileData"]);o!=null&&c(t,["fileData"],o);const a=u(e,["functionCall"]);a!=null&&c(t,["functionCall"],a);const l=u(e,["functionResponse"]);l!=null&&c(t,["functionResponse"],l);const d=u(e,["inlineData"]);d!=null&&c(t,["inlineData"],d);const f=u(e,["text"]);return f!=null&&c(t,["text"],f),t}function zh(i,e){const t={},n=u(e,["parts"]);n!=null&&(Array.isArray(n)?c(t,["parts"],n.map(s=>Bh(i,s))):c(t,["parts"],n));const r=u(e,["role"]);return r!=null&&c(t,["role"],r),t}function Vh(i,e){const t={},n=u(e,["citationSources"]);return n!=null&&c(t,["citations"],n),t}function kh(i,e){const t={},n=u(e,["content"]);n!=null&&c(t,["content"],zh(i,n));const r=u(e,["citationMetadata"]);r!=null&&c(t,["citationMetadata"],Vh(i,r));const s=u(e,["tokenCount"]);s!=null&&c(t,["tokenCount"],s);const o=u(e,["finishReason"]);o!=null&&c(t,["finishReason"],o);const a=u(e,["avgLogprobs"]);a!=null&&c(t,["avgLogprobs"],a);const l=u(e,["groundingMetadata"]);l!=null&&c(t,["groundingMetadata"],l);const d=u(e,["index"]);d!=null&&c(t,["index"],d);const f=u(e,["logprobsResult"]);f!=null&&c(t,["logprobsResult"],f);const h=u(e,["safetyRatings"]);return h!=null&&c(t,["safetyRatings"],h),t}function yl(i,e){const t={},n=u(e,["candidates"]);n!=null&&(Array.isArray(n)?c(t,["candidates"],n.map(a=>kh(i,a))):c(t,["candidates"],n));const r=u(e,["modelVersion"]);r!=null&&c(t,["modelVersion"],r);const s=u(e,["promptFeedback"]);s!=null&&c(t,["promptFeedback"],s);const o=u(e,["usageMetadata"]);return o!=null&&c(t,["usageMetadata"],o),t}function Hh(i,e){const t={},n=u(e,["values"]);return n!=null&&c(t,["values"],n),t}function Gh(){return{}}function Wh(i,e){const t={},n=u(e,["embeddings"]);return n!=null&&(Array.isArray(n)?c(t,["embeddings"],n.map(s=>Hh(i,s))):c(t,["embeddings"],n)),u(e,["metadata"])!=null&&c(t,["metadata"],Gh()),t}function $h(i,e){const t={},n=u(e,["bytesBase64Encoded"]);n!=null&&c(t,["imageBytes"],Zn(i,n));const r=u(e,["mimeType"]);return r!=null&&c(t,["mimeType"],r),t}function Xc(i,e){const t={},n=u(e,["safetyAttributes","categories"]);n!=null&&c(t,["categories"],n);const r=u(e,["safetyAttributes","scores"]);r!=null&&c(t,["scores"],r);const s=u(e,["contentType"]);return s!=null&&c(t,["contentType"],s),t}function Xh(i,e){const t={},n=u(e,["_self"]);n!=null&&c(t,["image"],$h(i,n));const r=u(e,["raiFilteredReason"]);r!=null&&c(t,["raiFilteredReason"],r);const s=u(e,["_self"]);return s!=null&&c(t,["safetyAttributes"],Xc(i,s)),t}function qh(i,e){const t={},n=u(e,["predictions"]);n!=null&&(Array.isArray(n)?c(t,["generatedImages"],n.map(s=>Xh(i,s))):c(t,["generatedImages"],n));const r=u(e,["positivePromptSafetyAttributes"]);return r!=null&&c(t,["positivePromptSafetyAttributes"],Xc(i,r)),t}function Yh(i,e){const t={},n=u(e,["baseModel"]);n!=null&&c(t,["baseModel"],n);const r=u(e,["createTime"]);r!=null&&c(t,["createTime"],r);const s=u(e,["updateTime"]);return s!=null&&c(t,["updateTime"],s),t}function Kh(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["name"],n);const r=u(e,["displayName"]);r!=null&&c(t,["displayName"],r);const s=u(e,["description"]);s!=null&&c(t,["description"],s);const o=u(e,["version"]);o!=null&&c(t,["version"],o);const a=u(e,["_self"]);a!=null&&c(t,["tunedModelInfo"],Yh(i,a));const l=u(e,["inputTokenLimit"]);l!=null&&c(t,["inputTokenLimit"],l);const d=u(e,["outputTokenLimit"]);d!=null&&c(t,["outputTokenLimit"],d);const f=u(e,["supportedGenerationMethods"]);return f!=null&&c(t,["supportedActions"],f),t}function Zh(i,e){const t={},n=u(e,["totalTokens"]);n!=null&&c(t,["totalTokens"],n);const r=u(e,["cachedContentTokenCount"]);return r!=null&&c(t,["cachedContentTokenCount"],r),t}function Jh(i,e){const t={},n=u(e,["video","uri"]);n!=null&&c(t,["uri"],n);const r=u(e,["video","encodedVideo"]);r!=null&&c(t,["videoBytes"],Zn(i,r));const s=u(e,["encoding"]);return s!=null&&c(t,["mimeType"],s),t}function Qh(i,e){const t={},n=u(e,["_self"]);return n!=null&&c(t,["video"],Jh(i,n)),t}function jh(i,e){const t={},n=u(e,["generatedSamples"]);n!=null&&(Array.isArray(n)?c(t,["generatedVideos"],n.map(o=>Qh(i,o))):c(t,["generatedVideos"],n));const r=u(e,["raiMediaFilteredCount"]);r!=null&&c(t,["raiMediaFilteredCount"],r);const s=u(e,["raiMediaFilteredReasons"]);return s!=null&&c(t,["raiMediaFilteredReasons"],s),t}function ep(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["name"],n);const r=u(e,["metadata"]);r!=null&&c(t,["metadata"],r);const s=u(e,["done"]);s!=null&&c(t,["done"],s);const o=u(e,["error"]);o!=null&&c(t,["error"],o);const a=u(e,["response","generateVideoResponse"]);return a!=null&&c(t,["response"],jh(i,a)),t}function tp(i,e){const t={},n=u(e,["videoMetadata"]);n!=null&&c(t,["videoMetadata"],n);const r=u(e,["thought"]);r!=null&&c(t,["thought"],r);const s=u(e,["codeExecutionResult"]);s!=null&&c(t,["codeExecutionResult"],s);const o=u(e,["executableCode"]);o!=null&&c(t,["executableCode"],o);const a=u(e,["fileData"]);a!=null&&c(t,["fileData"],a);const l=u(e,["functionCall"]);l!=null&&c(t,["functionCall"],l);const d=u(e,["functionResponse"]);d!=null&&c(t,["functionResponse"],d);const f=u(e,["inlineData"]);f!=null&&c(t,["inlineData"],f);const h=u(e,["text"]);return h!=null&&c(t,["text"],h),t}function np(i,e){const t={},n=u(e,["parts"]);n!=null&&(Array.isArray(n)?c(t,["parts"],n.map(s=>tp(i,s))):c(t,["parts"],n));const r=u(e,["role"]);return r!=null&&c(t,["role"],r),t}function ip(i,e){const t={},n=u(e,["citations"]);return n!=null&&c(t,["citations"],n),t}function rp(i,e){const t={},n=u(e,["content"]);n!=null&&c(t,["content"],np(i,n));const r=u(e,["citationMetadata"]);r!=null&&c(t,["citationMetadata"],ip(i,r));const s=u(e,["finishMessage"]);s!=null&&c(t,["finishMessage"],s);const o=u(e,["finishReason"]);o!=null&&c(t,["finishReason"],o);const a=u(e,["avgLogprobs"]);a!=null&&c(t,["avgLogprobs"],a);const l=u(e,["groundingMetadata"]);l!=null&&c(t,["groundingMetadata"],l);const d=u(e,["index"]);d!=null&&c(t,["index"],d);const f=u(e,["logprobsResult"]);f!=null&&c(t,["logprobsResult"],f);const h=u(e,["safetyRatings"]);return h!=null&&c(t,["safetyRatings"],h),t}function El(i,e){const t={},n=u(e,["candidates"]);n!=null&&(Array.isArray(n)?c(t,["candidates"],n.map(d=>rp(i,d))):c(t,["candidates"],n));const r=u(e,["createTime"]);r!=null&&c(t,["createTime"],r);const s=u(e,["responseId"]);s!=null&&c(t,["responseId"],s);const o=u(e,["modelVersion"]);o!=null&&c(t,["modelVersion"],o);const a=u(e,["promptFeedback"]);a!=null&&c(t,["promptFeedback"],a);const l=u(e,["usageMetadata"]);return l!=null&&c(t,["usageMetadata"],l),t}function sp(i,e){const t={},n=u(e,["truncated"]);n!=null&&c(t,["truncated"],n);const r=u(e,["token_count"]);return r!=null&&c(t,["tokenCount"],r),t}function op(i,e){const t={},n=u(e,["values"]);n!=null&&c(t,["values"],n);const r=u(e,["statistics"]);return r!=null&&c(t,["statistics"],sp(i,r)),t}function ap(i,e){const t={},n=u(e,["billableCharacterCount"]);return n!=null&&c(t,["billableCharacterCount"],n),t}function lp(i,e){const t={},n=u(e,["predictions[]","embeddings"]);n!=null&&(Array.isArray(n)?c(t,["embeddings"],n.map(s=>op(i,s))):c(t,["embeddings"],n));const r=u(e,["metadata"]);return r!=null&&c(t,["metadata"],ap(i,r)),t}function cp(i,e){const t={},n=u(e,["gcsUri"]);n!=null&&c(t,["gcsUri"],n);const r=u(e,["bytesBase64Encoded"]);r!=null&&c(t,["imageBytes"],Zn(i,r));const s=u(e,["mimeType"]);return s!=null&&c(t,["mimeType"],s),t}function qc(i,e){const t={},n=u(e,["safetyAttributes","categories"]);n!=null&&c(t,["categories"],n);const r=u(e,["safetyAttributes","scores"]);r!=null&&c(t,["scores"],r);const s=u(e,["contentType"]);return s!=null&&c(t,["contentType"],s),t}function up(i,e){const t={},n=u(e,["_self"]);n!=null&&c(t,["image"],cp(i,n));const r=u(e,["raiFilteredReason"]);r!=null&&c(t,["raiFilteredReason"],r);const s=u(e,["_self"]);s!=null&&c(t,["safetyAttributes"],qc(i,s));const o=u(e,["prompt"]);return o!=null&&c(t,["enhancedPrompt"],o),t}function dp(i,e){const t={},n=u(e,["predictions"]);n!=null&&(Array.isArray(n)?c(t,["generatedImages"],n.map(s=>up(i,s))):c(t,["generatedImages"],n));const r=u(e,["positivePromptSafetyAttributes"]);return r!=null&&c(t,["positivePromptSafetyAttributes"],qc(i,r)),t}function fp(i,e){const t={},n=u(e,["endpoint"]);n!=null&&c(t,["name"],n);const r=u(e,["deployedModelId"]);return r!=null&&c(t,["deployedModelId"],r),t}function hp(i,e){const t={},n=u(e,["labels","google-vertex-llm-tuning-base-model-id"]);n!=null&&c(t,["baseModel"],n);const r=u(e,["createTime"]);r!=null&&c(t,["createTime"],r);const s=u(e,["updateTime"]);return s!=null&&c(t,["updateTime"],s),t}function pp(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["name"],n);const r=u(e,["displayName"]);r!=null&&c(t,["displayName"],r);const s=u(e,["description"]);s!=null&&c(t,["description"],s);const o=u(e,["versionId"]);o!=null&&c(t,["version"],o);const a=u(e,["deployedModels"]);a!=null&&(Array.isArray(a)?c(t,["endpoints"],a.map(f=>fp(i,f))):c(t,["endpoints"],a));const l=u(e,["labels"]);l!=null&&c(t,["labels"],l);const d=u(e,["_self"]);return d!=null&&c(t,["tunedModelInfo"],hp(i,d)),t}function mp(i,e){const t={},n=u(e,["totalTokens"]);return n!=null&&c(t,["totalTokens"],n),t}function gp(i,e){const t={},n=u(e,["tokensInfo"]);return n!=null&&c(t,["tokensInfo"],n),t}function _p(i,e){const t={},n=u(e,["gcsUri"]);n!=null&&c(t,["uri"],n);const r=u(e,["bytesBase64Encoded"]);r!=null&&c(t,["videoBytes"],Zn(i,r));const s=u(e,["mimeType"]);return s!=null&&c(t,["mimeType"],s),t}function vp(i,e){const t={},n=u(e,["_self"]);return n!=null&&c(t,["video"],_p(i,n)),t}function xp(i,e){const t={},n=u(e,["videos"]);n!=null&&(Array.isArray(n)?c(t,["generatedVideos"],n.map(o=>vp(i,o))):c(t,["generatedVideos"],n));const r=u(e,["raiMediaFilteredCount"]);r!=null&&c(t,["raiMediaFilteredCount"],r);const s=u(e,["raiMediaFilteredReasons"]);return s!=null&&c(t,["raiMediaFilteredReasons"],s),t}function Sp(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["name"],n);const r=u(e,["metadata"]);r!=null&&c(t,["metadata"],r);const s=u(e,["done"]);s!=null&&c(t,["done"],s);const o=u(e,["error"]);o!=null&&c(t,["error"],o);const a=u(e,["response"]);return a!=null&&c(t,["response"],xp(i,a)),t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const yp="FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";async function Ep(i,e,t){let n,r;t.data instanceof Blob?r=JSON.parse(await t.data.text()):r=JSON.parse(t.data),i.isVertexAI()?n=kf(i,r):n=Vf(i,r),e(n)}class Mp{constructor(e,t,n){this.apiClient=e,this.auth=t,this.webSocketFactory=n}async connect(e){var t,n,r,s;const o=this.apiClient.getWebsocketBaseUrl(),a=this.apiClient.getApiVersion();let l;const d=wp(this.apiClient.getDefaultHeaders());if(this.apiClient.isVertexAI())l=`${o}/ws/google.cloud.aiplatform.${a}.LlmBidiService/BidiGenerateContent`,await this.auth.addAuthHeaders(d);else{const T=this.apiClient.getApiKey();l=`${o}/ws/google.ai.generativelanguage.${a}.GenerativeService.BidiGenerateContent?key=${T}`}let f=()=>{};const h=new Promise(T=>{f=T}),p=e.callbacks,g=function(){var T;(T=p?.onopen)===null||T===void 0||T.call(p),f({})},S=this.apiClient,E={onopen:g,onmessage:T=>{Ep(S,p.onmessage,T)},onerror:(t=p?.onerror)!==null&&t!==void 0?t:function(T){},onclose:(n=p?.onclose)!==null&&n!==void 0?n:function(T){}},x=this.webSocketFactory.create(l,Cp(d),E);x.connect(),await h;let m=bt(this.apiClient,e.model);if(this.apiClient.isVertexAI()&&m.startsWith("publishers/")){const T=this.apiClient.getProject(),z=this.apiClient.getLocation();m=`projects/${T}/locations/${z}/`+m}let P={};this.apiClient.isVertexAI()&&((r=e.config)===null||r===void 0?void 0:r.responseModalities)===void 0&&(e.config===void 0?e.config={responseModalities:[ar.AUDIO]}:e.config.responseModalities=[ar.AUDIO]),!((s=e.config)===null||s===void 0)&&s.generationConfig&&console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");const w={model:m,config:e.config,callbacks:e.callbacks};return this.apiClient.isVertexAI()?P=xf(this.apiClient,w):P=vf(this.apiClient,w),delete P.config,x.send(JSON.stringify(P)),new Ap(x,this.apiClient)}}const Tp={turnComplete:!0};class Ap{constructor(e,t){this.conn=e,this.apiClient=t}tLiveClientContent(e,t){if(t.turns!==null&&t.turns!==void 0){let n=[];try{n=vt(e,t.turns),e.isVertexAI()?n=n.map(r=>Hi(e,r)):n=n.map(r=>Cs(e,r))}catch{throw new Error(`Failed to parse client content "turns", type: '${typeof t.turns}'`)}return{clientContent:{turns:n,turnComplete:t.turnComplete}}}return{clientContent:{turnComplete:t.turnComplete}}}tLiveClientRealtimeInput(e,t){let n={};if(!("media"in t)||!t.media)throw new Error(`Failed to convert realtime input "media", type: '${typeof t.media}'`);return n={realtimeInput:{mediaChunks:[t.media],activityStart:t.activityStart,activityEnd:t.activityEnd}},n}tLiveClienttToolResponse(e,t){let n=[];if(t.functionResponses==null)throw new Error("functionResponses is required.");if(Array.isArray(t.functionResponses)?n=t.functionResponses:n=[t.functionResponses],n.length===0)throw new Error("functionResponses is required.");for(const s of n){if(typeof s!="object"||s===null||!("name"in s)||!("response"in s))throw new Error(`Could not parse function response, type '${typeof s}'.`);if(!e.isVertexAI()&&!("id"in s))throw new Error(yp)}return{toolResponse:{functionResponses:n}}}sendClientContent(e){e=Object.assign(Object.assign({},Tp),e);const t=this.tLiveClientContent(this.apiClient,e);this.conn.send(JSON.stringify(t))}sendRealtimeInput(e){if(e.media==null)throw new Error("Media is required.");const t=this.tLiveClientRealtimeInput(this.apiClient,e);this.conn.send(JSON.stringify(t))}sendToolResponse(e){if(e.functionResponses==null)throw new Error("Tool response parameters are required.");const t=this.tLiveClienttToolResponse(this.apiClient,e);this.conn.send(JSON.stringify(t))}close(){this.conn.close()}}function Cp(i){const e={};return i.forEach((t,n)=>{e[n]=t}),e}function wp(i){const e=new Headers;for(const[t,n]of Object.entries(i))e.append(t,n);return e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Rp extends Ts{constructor(e){super(),this.apiClient=e,this.generateContent=async t=>await this.generateContentInternal(t),this.generateContentStream=async t=>await this.generateContentStreamInternal(t),this.generateImages=async t=>await this.generateImagesInternal(t).then(n=>{var r;let s;const o=[];if(n?.generatedImages)for(const l of n.generatedImages)l&&l?.safetyAttributes&&((r=l?.safetyAttributes)===null||r===void 0?void 0:r.contentType)==="Positive Prompt"?s=l?.safetyAttributes:o.push(l);let a;return s?a={generatedImages:o,positivePromptSafetyAttributes:s}:a={generatedImages:o},a})}async generateContentInternal(e){var t,n;let r,s="",o={};if(this.apiClient.isVertexAI()){const a=Sl(this.apiClient,e);return s=rt("{model}:generateContent",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(l=>l.json()),r.then(l=>{const d=El(this.apiClient,l),f=new br;return Object.assign(f,d),f})}else{const a=xl(this.apiClient,e);return s=rt("{model}:generateContent",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"POST",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(l=>l.json()),r.then(l=>{const d=yl(this.apiClient,l),f=new br;return Object.assign(f,d),f})}}async generateContentStreamInternal(e){var t,n;let r,s="",o={};if(this.apiClient.isVertexAI()){const a=Sl(this.apiClient,e);s=rt("{model}:streamGenerateContent?alt=sse",a._url),o=a._query,delete a.config,delete a._url,delete a._query;const l=this.apiClient;return r=l.requestStream({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}),r.then(function(d){return ps(this,arguments,function*(){var f,h,p,g;try{for(var S=!0,E=go(d),x;x=yield Dt(E.next()),f=x.done,!f;S=!0){g=x.value,S=!1;const P=El(l,yield Dt(g.json())),w=new br;Object.assign(w,P),yield yield Dt(w)}}catch(m){h={error:m}}finally{try{!S&&!f&&(p=E.return)&&(yield Dt(p.call(E)))}finally{if(h)throw h.error}}})})}else{const a=xl(this.apiClient,e);s=rt("{model}:streamGenerateContent?alt=sse",a._url),o=a._query,delete a.config,delete a._url,delete a._query;const l=this.apiClient;return r=l.requestStream({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"POST",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}),r.then(function(d){return ps(this,arguments,function*(){var f,h,p,g;try{for(var S=!0,E=go(d),x;x=yield Dt(E.next()),f=x.done,!f;S=!0){g=x.value,S=!1;const P=yl(l,yield Dt(g.json())),w=new br;Object.assign(w,P),yield yield Dt(w)}}catch(m){h={error:m}}finally{try{!S&&!f&&(p=E.return)&&(yield Dt(p.call(E)))}finally{if(h)throw h.error}}})})}}async embedContent(e){var t,n;let r,s="",o={};if(this.apiClient.isVertexAI()){const a=Rh(this.apiClient,e);return s=rt("{model}:predict",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(l=>l.json()),r.then(l=>{const d=lp(this.apiClient,l),f=new ul;return Object.assign(f,d),f})}else{const a=rh(this.apiClient,e);return s=rt("{model}:batchEmbedContents",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"POST",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(l=>l.json()),r.then(l=>{const d=Wh(this.apiClient,l),f=new ul;return Object.assign(f,d),f})}}async generateImagesInternal(e){var t,n;let r,s="",o={};if(this.apiClient.isVertexAI()){const a=Ph(this.apiClient,e);return s=rt("{model}:predict",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(l=>l.json()),r.then(l=>{const d=dp(this.apiClient,l),f=new dl;return Object.assign(f,d),f})}else{const a=oh(this.apiClient,e);return s=rt("{model}:predict",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"POST",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(l=>l.json()),r.then(l=>{const d=qh(this.apiClient,l),f=new dl;return Object.assign(f,d),f})}}async get(e){var t,n;let r,s="",o={};if(this.apiClient.isVertexAI()){const a=Ih(this.apiClient,e);return s=rt("{name}",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(l=>l.json()),r.then(l=>pp(this.apiClient,l))}else{const a=ah(this.apiClient,e);return s=rt("{name}",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"GET",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(l=>l.json()),r.then(l=>Kh(this.apiClient,l))}}async countTokens(e){var t,n;let r,s="",o={};if(this.apiClient.isVertexAI()){const a=Uh(this.apiClient,e);return s=rt("{model}:countTokens",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(l=>l.json()),r.then(l=>{const d=mp(this.apiClient,l),f=new fl;return Object.assign(f,d),f})}else{const a=ch(this.apiClient,e);return s=rt("{model}:countTokens",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"POST",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(l=>l.json()),r.then(l=>{const d=Zh(this.apiClient,l),f=new fl;return Object.assign(f,d),f})}}async computeTokens(e){var t;let n,r="",s={};if(this.apiClient.isVertexAI()){const o=Lh(this.apiClient,e);return r=rt("{model}:computeTokens",o._url),s=o._query,delete o.config,delete o._url,delete o._query,n=this.apiClient.request({path:r,queryParams:s,body:JSON.stringify(o),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(a=>a.json()),n.then(a=>{const l=gp(this.apiClient,a),d=new yd;return Object.assign(d,l),d})}else throw new Error("This method is only supported by the Vertex AI.")}async generateVideos(e){var t,n;let r,s="",o={};if(this.apiClient.isVertexAI()){const a=Oh(this.apiClient,e);return s=rt("{model}:predictLongRunning",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(l=>l.json()),r.then(l=>Sp(this.apiClient,l))}else{const a=fh(this.apiClient,e);return s=rt("{model}:predictLongRunning",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"POST",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(l=>l.json()),r.then(l=>ep(this.apiClient,l))}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function bp(i,e){const t={},n=u(e,["operationName"]);n!=null&&c(t,["_url","operationName"],n);const r=u(e,["config"]);return r!=null&&c(t,["config"],r),t}function Pp(i,e){const t={},n=u(e,["operationName"]);n!=null&&c(t,["_url","operationName"],n);const r=u(e,["config"]);return r!=null&&c(t,["config"],r),t}function Ip(i,e){const t={},n=u(e,["operationName"]);n!=null&&c(t,["operationName"],n);const r=u(e,["resourceName"]);r!=null&&c(t,["_url","resourceName"],r);const s=u(e,["config"]);return s!=null&&c(t,["config"],s),t}function Dp(i,e){const t={},n=u(e,["video","uri"]);n!=null&&c(t,["uri"],n);const r=u(e,["video","encodedVideo"]);r!=null&&c(t,["videoBytes"],Zn(i,r));const s=u(e,["encoding"]);return s!=null&&c(t,["mimeType"],s),t}function Up(i,e){const t={},n=u(e,["_self"]);return n!=null&&c(t,["video"],Dp(i,n)),t}function Lp(i,e){const t={},n=u(e,["generatedSamples"]);n!=null&&(Array.isArray(n)?c(t,["generatedVideos"],n.map(o=>Up(i,o))):c(t,["generatedVideos"],n));const r=u(e,["raiMediaFilteredCount"]);r!=null&&c(t,["raiMediaFilteredCount"],r);const s=u(e,["raiMediaFilteredReasons"]);return s!=null&&c(t,["raiMediaFilteredReasons"],s),t}function Np(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["name"],n);const r=u(e,["metadata"]);r!=null&&c(t,["metadata"],r);const s=u(e,["done"]);s!=null&&c(t,["done"],s);const o=u(e,["error"]);o!=null&&c(t,["error"],o);const a=u(e,["response","generateVideoResponse"]);return a!=null&&c(t,["response"],Lp(i,a)),t}function Fp(i,e){const t={},n=u(e,["gcsUri"]);n!=null&&c(t,["uri"],n);const r=u(e,["bytesBase64Encoded"]);r!=null&&c(t,["videoBytes"],Zn(i,r));const s=u(e,["mimeType"]);return s!=null&&c(t,["mimeType"],s),t}function Op(i,e){const t={},n=u(e,["_self"]);return n!=null&&c(t,["video"],Fp(i,n)),t}function Bp(i,e){const t={},n=u(e,["videos"]);n!=null&&(Array.isArray(n)?c(t,["generatedVideos"],n.map(o=>Op(i,o))):c(t,["generatedVideos"],n));const r=u(e,["raiMediaFilteredCount"]);r!=null&&c(t,["raiMediaFilteredCount"],r);const s=u(e,["raiMediaFilteredReasons"]);return s!=null&&c(t,["raiMediaFilteredReasons"],s),t}function Ml(i,e){const t={},n=u(e,["name"]);n!=null&&c(t,["name"],n);const r=u(e,["metadata"]);r!=null&&c(t,["metadata"],r);const s=u(e,["done"]);s!=null&&c(t,["done"],s);const o=u(e,["error"]);o!=null&&c(t,["error"],o);const a=u(e,["response"]);return a!=null&&c(t,["response"],Bp(i,a)),t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class zp extends Ts{constructor(e){super(),this.apiClient=e}async getVideosOperation(e){const t=e.operation,n=e.config;if(t.name===void 0||t.name==="")throw new Error("Operation name is required.");if(this.apiClient.isVertexAI()){const r=t.name.split("/operations/")[0];let s;return n&&"httpOptions"in n&&(s=n.httpOptions),this.fetchPredictVideosOperationInternal({operationName:t.name,resourceName:r,config:{httpOptions:s}})}else return this.getVideosOperationInternal({operationName:t.name,config:n})}async getVideosOperationInternal(e){var t,n;let r,s="",o={};if(this.apiClient.isVertexAI()){const a=Pp(this.apiClient,e);return s=rt("{operationName}",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(l=>l.json()),r.then(l=>Ml(this.apiClient,l))}else{const a=bp(this.apiClient,e);return s=rt("{operationName}",a._url),o=a._query,delete a.config,delete a._url,delete a._query,r=this.apiClient.request({path:s,queryParams:o,body:JSON.stringify(a),httpMethod:"GET",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(l=>l.json()),r.then(l=>Np(this.apiClient,l))}}async fetchPredictVideosOperationInternal(e){var t;let n,r="",s={};if(this.apiClient.isVertexAI()){const o=Ip(this.apiClient,e);return r=rt("{resourceName}:fetchPredictOperation",o._url),s=o._query,delete o.config,delete o._url,delete o._query,n=this.apiClient.request({path:r,queryParams:s,body:JSON.stringify(o),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(a=>a.json()),n.then(a=>Ml(this.apiClient,a))}else throw new Error("This method is only supported by the Vertex AI.")}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Vp="Content-Type",kp="X-Server-Timeout",Hp="User-Agent",Gp="x-goog-api-client",Wp="0.9.0",$p=`google-genai-sdk/${Wp}`,Xp="v1beta1",qp="v1beta",Tl=/^data: (.*)(?:\n\n|\r\r|\r\n\r\n)/;class Yp extends Error{constructor(e,t){t?super(e,{cause:t}):super(e,{cause:new Error().stack}),this.message=e,this.name="ClientError"}}class Al extends Error{constructor(e,t){t?super(e,{cause:t}):super(e,{cause:new Error().stack}),this.message=e,this.name="ServerError"}}class Kp{constructor(e){var t,n;this.clientOptions=Object.assign(Object.assign({},e),{project:e.project,location:e.location,apiKey:e.apiKey,vertexai:e.vertexai});const r={};this.clientOptions.vertexai?(r.apiVersion=(t=this.clientOptions.apiVersion)!==null&&t!==void 0?t:Xp,this.getProject()||this.getLocation()?(r.baseUrl=`https://${this.clientOptions.location}-aiplatform.googleapis.com/`,this.clientOptions.apiKey=void 0):(r.baseUrl="https://aiplatform.googleapis.com/",this.clientOptions.project=void 0,this.clientOptions.location=void 0)):(r.apiVersion=(n=this.clientOptions.apiVersion)!==null&&n!==void 0?n:qp,r.baseUrl="https://generativelanguage.googleapis.com/"),r.headers=this.getDefaultHeaders(),this.clientOptions.httpOptions=r,e.httpOptions&&(this.clientOptions.httpOptions=this.patchHttpOptions(r,e.httpOptions))}isVertexAI(){var e;return(e=this.clientOptions.vertexai)!==null&&e!==void 0?e:!1}getProject(){return this.clientOptions.project}getLocation(){return this.clientOptions.location}getApiVersion(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.apiVersion!==void 0)return this.clientOptions.httpOptions.apiVersion;throw new Error("API version is not set.")}getBaseUrl(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.baseUrl!==void 0)return this.clientOptions.httpOptions.baseUrl;throw new Error("Base URL is not set.")}getRequestUrl(){return this.getRequestUrlInternal(this.clientOptions.httpOptions)}getHeaders(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.headers!==void 0)return this.clientOptions.httpOptions.headers;throw new Error("Headers are not set.")}getRequestUrlInternal(e){if(!e||e.baseUrl===void 0||e.apiVersion===void 0)throw new Error("HTTP options are not correctly set.");const n=[e.baseUrl.endsWith("/")?e.baseUrl.slice(0,-1):e.baseUrl];return e.apiVersion&&e.apiVersion!==""&&n.push(e.apiVersion),n.join("/")}getBaseResourcePath(){return`projects/${this.clientOptions.project}/locations/${this.clientOptions.location}`}getApiKey(){return this.clientOptions.apiKey}getWebsocketBaseUrl(){const e=this.getBaseUrl(),t=new URL(e);return t.protocol="wss",t.toString()}setBaseUrl(e){if(this.clientOptions.httpOptions)this.clientOptions.httpOptions.baseUrl=e;else throw new Error("HTTP options are not correctly set.")}constructUrl(e,t,n){const r=[this.getRequestUrlInternal(t)];return n&&r.push(this.getBaseResourcePath()),e!==""&&r.push(e),new URL(`${r.join("/")}`)}shouldPrependVertexProjectPath(e){return!(this.clientOptions.apiKey||!this.clientOptions.vertexai||e.path.startsWith("projects/")||e.httpMethod==="GET"&&e.path.startsWith("publishers/google/models"))}async request(e){let t=this.clientOptions.httpOptions;e.httpOptions&&(t=this.patchHttpOptions(this.clientOptions.httpOptions,e.httpOptions));const n=this.shouldPrependVertexProjectPath(e),r=this.constructUrl(e.path,t,n);if(e.queryParams)for(const[o,a]of Object.entries(e.queryParams))r.searchParams.append(o,String(a));let s={};if(e.httpMethod==="GET"){if(e.body&&e.body!=="{}")throw new Error("Request body should be empty for GET request, but got non empty request body")}else s.body=e.body;return s=await this.includeExtraHttpOptionsToRequestInit(s,t),this.unaryApiCall(r,s,e.httpMethod)}patchHttpOptions(e,t){const n=JSON.parse(JSON.stringify(e));for(const[r,s]of Object.entries(t))typeof s=="object"?n[r]=Object.assign(Object.assign({},n[r]),s):s!==void 0&&(n[r]=s);return n}async requestStream(e){let t=this.clientOptions.httpOptions;e.httpOptions&&(t=this.patchHttpOptions(this.clientOptions.httpOptions,e.httpOptions));const n=this.shouldPrependVertexProjectPath(e),r=this.constructUrl(e.path,t,n);(!r.searchParams.has("alt")||r.searchParams.get("alt")!=="sse")&&r.searchParams.set("alt","sse");let s={};return s.body=e.body,s=await this.includeExtraHttpOptionsToRequestInit(s,t),this.streamApiCall(r,s,e.httpMethod)}async includeExtraHttpOptionsToRequestInit(e,t){if(t&&t.timeout&&t.timeout>0){const n=new AbortController,r=n.signal;setTimeout(()=>n.abort(),t.timeout),e.signal=r}return e.headers=await this.getHeadersInternal(t),e}async unaryApiCall(e,t,n){return this.apiCall(e.toString(),Object.assign(Object.assign({},t),{method:n})).then(async r=>(await Cl(r),new mo(r))).catch(r=>{throw r instanceof Error?r:new Error(JSON.stringify(r))})}async streamApiCall(e,t,n){return this.apiCall(e.toString(),Object.assign(Object.assign({},t),{method:n})).then(async r=>(await Cl(r),this.processStreamResponse(r))).catch(r=>{throw r instanceof Error?r:new Error(JSON.stringify(r))})}processStreamResponse(e){var t;return ps(this,arguments,function*(){const r=(t=e?.body)===null||t===void 0?void 0:t.getReader(),s=new TextDecoder("utf-8");if(!r)throw new Error("Response body is empty");try{let o="";for(;;){const{done:a,value:l}=yield Dt(r.read());if(a){if(o.trim().length>0)throw new Error("Incomplete JSON segment at the end");break}const d=s.decode(l);o+=d;let f=o.match(Tl);for(;f;){const h=f[1];try{const p=new Response(h,{headers:e?.headers,status:e?.status,statusText:e?.statusText});yield yield Dt(new mo(p)),o=o.slice(f[0].length),f=o.match(Tl)}catch(p){throw new Error(`exception parsing stream chunk ${h}. ${p}`)}}}}finally{r.releaseLock()}})}async apiCall(e,t){return fetch(e,t).catch(n=>{throw new Error(`exception ${n} sending request`)})}getDefaultHeaders(){const e={},t=$p+" "+this.clientOptions.userAgentExtra;return e[Hp]=t,e[Gp]=t,e[Vp]="application/json",e}async getHeadersInternal(e){const t=new Headers;if(e&&e.headers){for(const[n,r]of Object.entries(e.headers))t.append(n,r);e.timeout&&e.timeout>0&&t.append(kp,String(Math.ceil(e.timeout/1e3)))}return await this.clientOptions.auth.addAuthHeaders(t),t}async uploadFile(e,t){var n;const r={};t!=null&&(r.mimeType=t.mimeType,r.name=t.name,r.displayName=t.displayName),r.name&&!r.name.startsWith("files/")&&(r.name=`files/${r.name}`);const s=this.clientOptions.uploader,o=await s.stat(e);r.sizeBytes=String(o.size);const a=(n=t?.mimeType)!==null&&n!==void 0?n:o.type;if(a===void 0||a==="")throw new Error("Can not determine mimeType. Please provide mimeType in the config.");r.mimeType=a;const l=await this.fetchUploadUrl(r,t);return s.upload(e,l,this)}async fetchUploadUrl(e,t){var n;let r={};t?.httpOptions?r=t.httpOptions:r={apiVersion:"",headers:{"Content-Type":"application/json","X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${e.sizeBytes}`,"X-Goog-Upload-Header-Content-Type":`${e.mimeType}`}};const s={file:e},o=await this.request({path:rt("upload/v1beta/files",s._url),body:JSON.stringify(s),httpMethod:"POST",httpOptions:r});if(!o||!o?.headers)throw new Error("Server did not return an HttpResponse or the returned HttpResponse did not have headers.");const a=(n=o?.headers)===null||n===void 0?void 0:n["x-goog-upload-url"];if(a===void 0)throw new Error("Failed to get upload url. Server did not return the x-google-upload-url in the headers");return a}}async function Cl(i){var e;if(i===void 0)throw new Al("response is undefined");if(!i.ok){const t=i.status,n=i.statusText;let r;!((e=i.headers.get("content-type"))===null||e===void 0)&&e.includes("application/json")?r=await i.json():r={error:{message:"exception parsing response",code:i.status,status:i.statusText}};const s=`got status: ${t} ${n}. ${JSON.stringify(r)}`;throw t>=400&&t<500?new Yp(s):t>=500&&t<600?new Al(s):new Error(s)}}const Zp=1024*1024*8;async function Jp(i,e,t){var n,r;let s=0,o=0,a=new mo(new Response),l="upload";for(s=i.size;o<s;){const f=Math.min(Zp,s-o),h=i.slice(o,o+f);if(o+f>=s&&(l+=", finalize"),a=await t.request({path:"",body:h,httpMethod:"POST",httpOptions:{apiVersion:"",baseUrl:e,headers:{"X-Goog-Upload-Command":l,"X-Goog-Upload-Offset":String(o),"Content-Length":String(f)}}}),o+=f,((n=a?.headers)===null||n===void 0?void 0:n["x-goog-upload-status"])!=="active")break;if(s<=o)throw new Error("All content has been uploaded, but the upload status is not finalized.")}const d=await a?.json();if(((r=a?.headers)===null||r===void 0?void 0:r["x-goog-upload-status"])!=="final")throw new Error("Failed to upload file: Upload status is not finalized.");return d.file}async function Qp(i){return{size:i.size,type:i.type}}class jp{async upload(e,t,n){if(typeof e=="string")throw new Error("File path is not supported in browser uploader.");return await Jp(e,t,n)}async stat(e){if(typeof e=="string")throw new Error("File path is not supported in browser uploader.");return await Qp(e)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class em{create(e,t,n){return new tm(e,t,n)}}class tm{constructor(e,t,n){this.url=e,this.headers=t,this.callbacks=n}connect(){this.ws=new WebSocket(this.url),this.ws.onopen=this.callbacks.onopen,this.ws.onerror=this.callbacks.onerror,this.ws.onclose=this.callbacks.onclose,this.ws.onmessage=this.callbacks.onmessage}send(e){if(this.ws===void 0)throw new Error("WebSocket is not connected");this.ws.send(e)}close(){if(this.ws===void 0)throw new Error("WebSocket is not connected");this.ws.close()}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const wl="x-goog-api-key";class nm{constructor(e){this.apiKey=e}async addAuthHeaders(e){e.get(wl)===null&&e.append(wl,this.apiKey)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const im="gl-node/";class rm{constructor(e){var t;if(e.apiKey==null)throw new Error("An API Key must be set when running in a browser");if(e.project||e.location)throw new Error("Vertex AI project based authentication is not supported on browser runtimes. Please do not provide a project or location.");this.vertexai=(t=e.vertexai)!==null&&t!==void 0?t:!1,this.apiKey=e.apiKey,this.apiVersion=e.apiVersion;const n=new nm(this.apiKey);this.apiClient=new Kp({auth:n,apiVersion:this.apiVersion,apiKey:this.apiKey,vertexai:this.vertexai,httpOptions:e.httpOptions,userAgentExtra:im+"web",uploader:new jp}),this.models=new Rp(this.apiClient),this.live=new Mp(this.apiClient,n,new em),this.chats=new bd(this.models,this.apiClient),this.caches=new Ad(this.apiClient),this.files=new Hd(this.apiClient),this.operations=new zp(this.apiClient)}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rs=globalThis,la=rs.ShadowRoot&&(rs.ShadyCSS===void 0||rs.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ca=Symbol(),Rl=new WeakMap;let Yc=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==ca)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(la&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=Rl.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Rl.set(t,e))}return e}toString(){return this.cssText}};const sm=i=>new Yc(typeof i=="string"?i:i+"",void 0,ca),ua=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((n,r,s)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[s+1],i[0]);return new Yc(t,i,ca)},om=(i,e)=>{if(la)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const n=document.createElement("style"),r=rs.litNonce;r!==void 0&&n.setAttribute("nonce",r),n.textContent=t.cssText,i.appendChild(n)}},bl=la?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return sm(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:am,defineProperty:lm,getOwnPropertyDescriptor:cm,getOwnPropertyNames:um,getOwnPropertySymbols:dm,getPrototypeOf:fm}=Object,$n=globalThis,Pl=$n.trustedTypes,hm=Pl?Pl.emptyScript:"",pm=$n.reactiveElementPolyfillSupport,ir=(i,e)=>i,ms={toAttribute(i,e){switch(e){case Boolean:i=i?hm:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},da=(i,e)=>!am(i,e),Il={attribute:!0,type:String,converter:ms,reflect:!1,useDefault:!1,hasChanged:da};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$n.litPropertyMetadata??($n.litPropertyMetadata=new WeakMap);let bi=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Il){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&lm(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){const{get:r,set:s}=cm(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:r,set(o){const a=r?.call(this);s?.call(this,o),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Il}static _$Ei(){if(this.hasOwnProperty(ir("elementProperties")))return;const e=fm(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ir("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ir("properties"))){const t=this.properties,n=[...um(t),...dm(t)];for(const r of n)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[n,r]of t)this.elementProperties.set(n,r)}this._$Eh=new Map;for(const[t,n]of this.elementProperties){const r=this._$Eu(t,n);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const r of n)t.unshift(bl(r))}else e!==void 0&&t.push(bl(e));return t}static _$Eu(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return om(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&n.reflect===!0){const s=(n.converter?.toAttribute!==void 0?n.converter:ms).toAttribute(t,n.type);this._$Em=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(e,t){const n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const s=n.getPropertyOptions(r),o=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ms;this._$Em=r,this[r]=o.fromAttribute(t,s.type)??this._$Ej?.get(r)??null,this._$Em=null}}requestUpdate(e,t,n){if(e!==void 0){const r=this.constructor,s=this[e];if(n??(n=r.getPropertyOptions(e)),!((n.hasChanged??da)(s,t)||n.useDefault&&n.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:s},o){n&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),s!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[r,s]of n){const{wrapped:o}=s,a=this[r];o!==!0||this._$AL.has(r)||a===void 0||this.C(r,void 0,s,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};bi.elementStyles=[],bi.shadowRootOptions={mode:"open"},bi[ir("elementProperties")]=new Map,bi[ir("finalized")]=new Map,pm?.({ReactiveElement:bi}),($n.reactiveElementVersions??($n.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rr=globalThis,gs=rr.trustedTypes,Dl=gs?gs.createPolicy("lit-html",{createHTML:i=>i}):void 0,Kc="$lit$",Gn=`lit$${Math.random().toFixed(9).slice(2)}$`,Zc="?"+Gn,mm=`<${Zc}>`,di=document,lr=()=>di.createComment(""),cr=i=>i===null||typeof i!="object"&&typeof i!="function",fa=Array.isArray,gm=i=>fa(i)||typeof i?.[Symbol.iterator]=="function",Us=`[ 	
\f\r]`,Zi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ul=/-->/g,Ll=/>/g,Qn=RegExp(`>|${Us}(?:([^\\s"'>=/]+)(${Us}*=${Us}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Nl=/'/g,Fl=/"/g,Jc=/^(?:script|style|textarea|title)$/i,_m=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),Pi=_m(1),Ni=Symbol.for("lit-noChange"),Rt=Symbol.for("lit-nothing"),Ol=new WeakMap,ci=di.createTreeWalker(di,129);function Qc(i,e){if(!fa(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return Dl!==void 0?Dl.createHTML(e):e}const vm=(i,e)=>{const t=i.length-1,n=[];let r,s=e===2?"<svg>":e===3?"<math>":"",o=Zi;for(let a=0;a<t;a++){const l=i[a];let d,f,h=-1,p=0;for(;p<l.length&&(o.lastIndex=p,f=o.exec(l),f!==null);)p=o.lastIndex,o===Zi?f[1]==="!--"?o=Ul:f[1]!==void 0?o=Ll:f[2]!==void 0?(Jc.test(f[2])&&(r=RegExp("</"+f[2],"g")),o=Qn):f[3]!==void 0&&(o=Qn):o===Qn?f[0]===">"?(o=r??Zi,h=-1):f[1]===void 0?h=-2:(h=o.lastIndex-f[2].length,d=f[1],o=f[3]===void 0?Qn:f[3]==='"'?Fl:Nl):o===Fl||o===Nl?o=Qn:o===Ul||o===Ll?o=Zi:(o=Qn,r=void 0);const g=o===Qn&&i[a+1].startsWith("/>")?" ":"";s+=o===Zi?l+mm:h>=0?(n.push(d),l.slice(0,h)+Kc+l.slice(h)+Gn+g):l+Gn+(h===-2?a:g)}return[Qc(i,s+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class ur{constructor({strings:e,_$litType$:t},n){let r;this.parts=[];let s=0,o=0;const a=e.length-1,l=this.parts,[d,f]=vm(e,t);if(this.el=ur.createElement(d,n),ci.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=ci.nextNode())!==null&&l.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(Kc)){const p=f[o++],g=r.getAttribute(h).split(Gn),S=/([.?@])?(.*)/.exec(p);l.push({type:1,index:s,name:S[2],strings:g,ctor:S[1]==="."?Sm:S[1]==="?"?ym:S[1]==="@"?Em:ws}),r.removeAttribute(h)}else h.startsWith(Gn)&&(l.push({type:6,index:s}),r.removeAttribute(h));if(Jc.test(r.tagName)){const h=r.textContent.split(Gn),p=h.length-1;if(p>0){r.textContent=gs?gs.emptyScript:"";for(let g=0;g<p;g++)r.append(h[g],lr()),ci.nextNode(),l.push({type:2,index:++s});r.append(h[p],lr())}}}else if(r.nodeType===8)if(r.data===Zc)l.push({type:2,index:s});else{let h=-1;for(;(h=r.data.indexOf(Gn,h+1))!==-1;)l.push({type:7,index:s}),h+=Gn.length-1}s++}}static createElement(e,t){const n=di.createElement("template");return n.innerHTML=e,n}}function Fi(i,e,t=i,n){if(e===Ni)return e;let r=n!==void 0?t._$Co?.[n]:t._$Cl;const s=cr(e)?void 0:e._$litDirective$;return r?.constructor!==s&&(r?._$AO?.(!1),s===void 0?r=void 0:(r=new s(i),r._$AT(i,t,n)),n!==void 0?(t._$Co??(t._$Co=[]))[n]=r:t._$Cl=r),r!==void 0&&(e=Fi(i,r._$AS(i,e.values),r,n)),e}class xm{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??di).importNode(t,!0);ci.currentNode=r;let s=ci.nextNode(),o=0,a=0,l=n[0];for(;l!==void 0;){if(o===l.index){let d;l.type===2?d=new _r(s,s.nextSibling,this,e):l.type===1?d=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(d=new Mm(s,this,e)),this._$AV.push(d),l=n[++a]}o!==l?.index&&(s=ci.nextNode(),o++)}return ci.currentNode=di,r}p(e){let t=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class _r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=Rt,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Fi(this,e,t),cr(e)?e===Rt||e==null||e===""?(this._$AH!==Rt&&this._$AR(),this._$AH=Rt):e!==this._$AH&&e!==Ni&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):gm(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Rt&&cr(this._$AH)?this._$AA.nextSibling.data=e:this.T(di.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=ur.createElement(Qc(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{const s=new xm(r,this),o=s.u(this.options);s.p(t),this.T(o),this._$AH=s}}_$AC(e){let t=Ol.get(e.strings);return t===void 0&&Ol.set(e.strings,t=new ur(e)),t}k(e){fa(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,r=0;for(const s of e)r===t.length?t.push(n=new _r(this.O(lr()),this.O(lr()),this,this.options)):n=t[r],n._$AI(s),r++;r<t.length&&(this._$AR(n&&n._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class ws{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,s){this.type=1,this._$AH=Rt,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Rt}_$AI(e,t=this,n,r){const s=this.strings;let o=!1;if(s===void 0)e=Fi(this,e,t,0),o=!cr(e)||e!==this._$AH&&e!==Ni,o&&(this._$AH=e);else{const a=e;let l,d;for(e=s[0],l=0;l<s.length-1;l++)d=Fi(this,a[n+l],t,l),d===Ni&&(d=this._$AH[l]),o||(o=!cr(d)||d!==this._$AH[l]),d===Rt?e=Rt:e!==Rt&&(e+=(d??"")+s[l+1]),this._$AH[l]=d}o&&!r&&this.j(e)}j(e){e===Rt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Sm extends ws{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Rt?void 0:e}}class ym extends ws{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Rt)}}class Em extends ws{constructor(e,t,n,r,s){super(e,t,n,r,s),this.type=5}_$AI(e,t=this){if((e=Fi(this,e,t,0)??Rt)===Ni)return;const n=this._$AH,r=e===Rt&&n!==Rt||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==Rt&&(n===Rt||r);r&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Mm{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Fi(this,e)}}const Tm=rr.litHtmlPolyfillSupport;Tm?.(ur,_r),(rr.litHtmlVersions??(rr.litHtmlVersions=[])).push("3.3.0");const Am=(i,e,t)=>{const n=t?.renderBefore??e;let r=n._$litPart$;if(r===void 0){const s=t?.renderBefore??null;n._$litPart$=r=new _r(e.insertBefore(lr(),s),s,void 0,t??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const sr=globalThis;let ui=class extends bi{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Am(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ni}};ui._$litElement$=!0,ui.finalized=!0,sr.litElementHydrateSupport?.({LitElement:ui});const Cm=sr.litElementPolyfillSupport;Cm?.({LitElement:ui});(sr.litElementVersions??(sr.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ha=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wm={attribute:!0,type:String,converter:ms,reflect:!1,hasChanged:da},Rm=(i=wm,e,t)=>{const{kind:n,metadata:r}=t;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),n==="setter"&&((i=Object.create(i)).wrapped=!0),s.set(t.name,i),n==="accessor"){const{name:o}=t;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,l,i)},init(a){return a!==void 0&&this.C(o,void 0,i,a),a}}}if(n==="setter"){const{name:o}=t;return function(a){const l=this[o];e.call(this,a),this.requestUpdate(o,l,i)}}throw Error("Unsupported decorator location: "+n)};function vr(i){return(e,t)=>typeof t=="object"?Rm(i,e,t):((n,r,s)=>{const o=r.hasOwnProperty(s);return r.constructor.createProperty(s,n),o?Object.getOwnPropertyDescriptor(r,s):void 0})(i,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pn(i){return vr({...i,state:!0,attribute:!1})}/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/function bm(i){let e="";const t=i.byteLength;for(let n=0;n<t;n++)e+=String.fromCharCode(i[n]);return btoa(e)}function Pm(i){const e=atob(i),t=e.length,n=new Uint8Array(t);for(let r=0;r<t;r++)n[r]=e.charCodeAt(r);return n}function Im(i){const e=i.length,t=new Int16Array(e);for(let n=0;n<e;n++)t[n]=i[n]*32768;return{data:bm(new Uint8Array(t.buffer)),mimeType:"audio/pcm;rate=16000"}}async function Dm(i,e,t,n){const r=e.createBuffer(n,i.length/2/n,t),s=new Int16Array(i.buffer,i.byteOffset,i.length/2),o=new Float32Array(s.length);for(let a=0;a<s.length;a++)o[a]=s[a]/32768;for(let a=0;a<n;a++){const l=new Float32Array(r.length);for(let d=0;d<r.length;d++)l[d]=o[d*n+a];r.copyToChannel(l,a)}return r}/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/class _s{constructor(e){this.bufferLength=0,this.analyser=e.context.createAnalyser(),this.analyser.fftSize=32,this.bufferLength=this.analyser.frequencyBinCount,this.dataArray=new Uint8Array(this.bufferLength),e.connect(this.analyser)}update(){this.analyser.getByteFrequencyData(this.dataArray)}get data(){return this.dataArray}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const pa="176",Um=0,Bl=1,Lm=2,jc=1,Nm=2,An=3,qn=0,Bt=1,Cn=2,In=0,Ui=1,vo=2,zl=3,Vl=4,Fm=5,ai=100,Om=101,Bm=102,zm=103,Vm=104,km=200,Hm=201,Gm=202,Wm=203,xo=204,So=205,$m=206,Xm=207,qm=208,Ym=209,Km=210,Zm=211,Jm=212,Qm=213,jm=214,yo=0,Eo=1,Mo=2,Oi=3,To=4,Ao=5,Co=6,wo=7,eu=0,eg=1,tg=2,Xn=0,ng=1,ig=2,rg=3,sg=4,og=5,ag=6,lg=7,tu=300,Bi=301,zi=302,vs=303,Ro=304,Rs=306,bo=1e3,bn=1001,Po=1002,Xt=1003,cg=1004,Dr=1005,Ft=1006,Ls=1007,Wn=1008,Un=1009,nu=1010,iu=1011,dr=1012,ma=1013,fi=1014,Qt=1015,$t=1016,ga=1017,_a=1018,fr=1020,ru=35902,su=1021,ou=1022,jt=1023,hr=1026,pr=1027,va=1028,xa=1029,au=1030,Sa=1031,ya=1033,ss=33776,os=33777,as=33778,ls=33779,Io=35840,Do=35841,Uo=35842,Lo=35843,No=36196,Fo=37492,Oo=37496,Bo=37808,zo=37809,Vo=37810,ko=37811,Ho=37812,Go=37813,Wo=37814,$o=37815,Xo=37816,qo=37817,Yo=37818,Ko=37819,Zo=37820,Jo=37821,cs=36492,Qo=36494,jo=36495,lu=36283,ea=36284,ta=36285,na=36286,ug=3200,dg=3201,cu=0,fg=1,wn="",Kt="srgb",Yn="srgb-linear",xs="linear",ut="srgb",mi=7680,kl=519,hg=512,pg=513,mg=514,uu=515,gg=516,_g=517,vg=518,xg=519,Hl=35044,ia="300 es",Pn=2e3,Ss=2001;class Gi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Pt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ns=Math.PI/180,ra=180/Math.PI;function xr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pt[i&255]+Pt[i>>8&255]+Pt[i>>16&255]+Pt[i>>24&255]+"-"+Pt[e&255]+Pt[e>>8&255]+"-"+Pt[e>>16&15|64]+Pt[e>>24&255]+"-"+Pt[t&63|128]+Pt[t>>8&255]+"-"+Pt[t>>16&255]+Pt[t>>24&255]+Pt[n&255]+Pt[n>>8&255]+Pt[n>>16&255]+Pt[n>>24&255]).toLowerCase()}function et(i,e,t){return Math.max(e,Math.min(t,i))}function Sg(i,e){return(i%e+e)%e}function Fs(i,e,t){return(1-t)*i+t*e}function Ji(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Vt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Ge{constructor(e=0,t=0){Ge.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ye{constructor(e,t,n,r,s,o,a,l,d){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,d)}set(e,t,n,r,s,o,a,l,d){const f=this.elements;return f[0]=e,f[1]=r,f[2]=a,f[3]=t,f[4]=s,f[5]=l,f[6]=n,f[7]=o,f[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],d=n[1],f=n[4],h=n[7],p=n[2],g=n[5],S=n[8],E=r[0],x=r[3],m=r[6],P=r[1],w=r[4],T=r[7],z=r[2],F=r[5],N=r[8];return s[0]=o*E+a*P+l*z,s[3]=o*x+a*w+l*F,s[6]=o*m+a*T+l*N,s[1]=d*E+f*P+h*z,s[4]=d*x+f*w+h*F,s[7]=d*m+f*T+h*N,s[2]=p*E+g*P+S*z,s[5]=p*x+g*w+S*F,s[8]=p*m+g*T+S*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],d=e[7],f=e[8];return t*o*f-t*a*d-n*s*f+n*a*l+r*s*d-r*o*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],d=e[7],f=e[8],h=f*o-a*d,p=a*l-f*s,g=d*s-o*l,S=t*h+n*p+r*g;if(S===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/S;return e[0]=h*E,e[1]=(r*d-f*n)*E,e[2]=(a*n-r*o)*E,e[3]=p*E,e[4]=(f*t-r*l)*E,e[5]=(r*s-a*t)*E,e[6]=g*E,e[7]=(n*l-d*t)*E,e[8]=(o*t-n*s)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const l=Math.cos(s),d=Math.sin(s);return this.set(n*l,n*d,-n*(l*o+d*a)+o+e,-r*d,r*l,-r*(-d*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Os.makeScale(e,t)),this}rotate(e){return this.premultiply(Os.makeRotation(-e)),this}translate(e,t){return this.premultiply(Os.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Os=new Ye;function du(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ys(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function yg(){const i=ys("canvas");return i.style.display="block",i}const Gl={};function us(i){i in Gl||(Gl[i]=!0,console.warn(i))}function Eg(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function Mg(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Tg(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Wl=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$l=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ag(){const i={enabled:!0,workingColorSpace:Yn,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ut&&(r.r=Dn(r.r),r.g=Dn(r.g),r.b=Dn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ut&&(r.r=Li(r.r),r.g=Li(r.g),r.b=Li(r.b))),r},fromWorkingColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},toWorkingColorSpace:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===wn?xs:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Yn]:{primaries:e,whitePoint:n,transfer:xs,toXYZ:Wl,fromXYZ:$l,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Kt},outputColorSpaceConfig:{drawingBufferColorSpace:Kt}},[Kt]:{primaries:e,whitePoint:n,transfer:ut,toXYZ:Wl,fromXYZ:$l,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Kt}}}),i}const ot=Ag();function Dn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Li(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let gi;class Cg{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{gi===void 0&&(gi=ys("canvas")),gi.width=e.width,gi.height=e.height;const r=gi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=gi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ys("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Dn(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Dn(t[n]/255)*255):t[n]=Dn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let wg=0;class Ea{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wg++}),this.uuid=xr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Bs(r[o].image)):s.push(Bs(r[o]))}else s=Bs(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Bs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Cg.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Rg=0;class zt extends Gi{constructor(e=zt.DEFAULT_IMAGE,t=zt.DEFAULT_MAPPING,n=bn,r=bn,s=Ft,o=Wn,a=jt,l=Un,d=zt.DEFAULT_ANISOTROPY,f=wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rg++}),this.uuid=xr(),this.name="",this.source=new Ea(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=d,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isTextureArray=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isTextureArray=e.isTextureArray,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==tu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case bo:e.x=e.x-Math.floor(e.x);break;case bn:e.x=e.x<0?0:1;break;case Po:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case bo:e.y=e.y-Math.floor(e.y);break;case bn:e.y=e.y<0?0:1;break;case Po:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=tu;zt.DEFAULT_ANISOTROPY=1;class gt{constructor(e=0,t=0,n=0,r=1){gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,d=l[0],f=l[4],h=l[8],p=l[1],g=l[5],S=l[9],E=l[2],x=l[6],m=l[10];if(Math.abs(f-p)<.01&&Math.abs(h-E)<.01&&Math.abs(S-x)<.01){if(Math.abs(f+p)<.1&&Math.abs(h+E)<.1&&Math.abs(S+x)<.1&&Math.abs(d+g+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(d+1)/2,T=(g+1)/2,z=(m+1)/2,F=(f+p)/4,N=(h+E)/4,V=(S+x)/4;return w>T&&w>z?w<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(w),r=F/n,s=N/n):T>z?T<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(T),n=F/r,s=V/r):z<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(z),n=N/s,r=V/s),this.set(n,r,s,t),this}let P=Math.sqrt((x-S)*(x-S)+(h-E)*(h-E)+(p-f)*(p-f));return Math.abs(P)<.001&&(P=1),this.x=(x-S)/P,this.y=(h-E)/P,this.z=(p-f)/P,this.w=Math.acos((d+g+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bg extends Gi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth?n.depth:1,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);const r={width:e,height:t,depth:this.depth};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ft,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,multiview:!1},n);const s=new zt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Ea(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fn extends bg{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class fu extends zt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Pg extends zt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wi{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],d=n[r+1],f=n[r+2],h=n[r+3];const p=s[o+0],g=s[o+1],S=s[o+2],E=s[o+3];if(a===0){e[t+0]=l,e[t+1]=d,e[t+2]=f,e[t+3]=h;return}if(a===1){e[t+0]=p,e[t+1]=g,e[t+2]=S,e[t+3]=E;return}if(h!==E||l!==p||d!==g||f!==S){let x=1-a;const m=l*p+d*g+f*S+h*E,P=m>=0?1:-1,w=1-m*m;if(w>Number.EPSILON){const z=Math.sqrt(w),F=Math.atan2(z,m*P);x=Math.sin(x*F)/z,a=Math.sin(a*F)/z}const T=a*P;if(l=l*x+p*T,d=d*x+g*T,f=f*x+S*T,h=h*x+E*T,x===1-a){const z=1/Math.sqrt(l*l+d*d+f*f+h*h);l*=z,d*=z,f*=z,h*=z}}e[t]=l,e[t+1]=d,e[t+2]=f,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],l=n[r+1],d=n[r+2],f=n[r+3],h=s[o],p=s[o+1],g=s[o+2],S=s[o+3];return e[t]=a*S+f*h+l*g-d*p,e[t+1]=l*S+f*p+d*h-a*g,e[t+2]=d*S+f*g+a*p-l*h,e[t+3]=f*S-a*h-l*p-d*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,d=a(n/2),f=a(r/2),h=a(s/2),p=l(n/2),g=l(r/2),S=l(s/2);switch(o){case"XYZ":this._x=p*f*h+d*g*S,this._y=d*g*h-p*f*S,this._z=d*f*S+p*g*h,this._w=d*f*h-p*g*S;break;case"YXZ":this._x=p*f*h+d*g*S,this._y=d*g*h-p*f*S,this._z=d*f*S-p*g*h,this._w=d*f*h+p*g*S;break;case"ZXY":this._x=p*f*h-d*g*S,this._y=d*g*h+p*f*S,this._z=d*f*S+p*g*h,this._w=d*f*h-p*g*S;break;case"ZYX":this._x=p*f*h-d*g*S,this._y=d*g*h+p*f*S,this._z=d*f*S-p*g*h,this._w=d*f*h+p*g*S;break;case"YZX":this._x=p*f*h+d*g*S,this._y=d*g*h+p*f*S,this._z=d*f*S-p*g*h,this._w=d*f*h-p*g*S;break;case"XZY":this._x=p*f*h-d*g*S,this._y=d*g*h-p*f*S,this._z=d*f*S+p*g*h,this._w=d*f*h+p*g*S;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],d=t[2],f=t[6],h=t[10],p=n+a+h;if(p>0){const g=.5/Math.sqrt(p+1);this._w=.25/g,this._x=(f-l)*g,this._y=(s-d)*g,this._z=(o-r)*g}else if(n>a&&n>h){const g=2*Math.sqrt(1+n-a-h);this._w=(f-l)/g,this._x=.25*g,this._y=(r+o)/g,this._z=(s+d)/g}else if(a>h){const g=2*Math.sqrt(1+a-n-h);this._w=(s-d)/g,this._x=(r+o)/g,this._y=.25*g,this._z=(l+f)/g}else{const g=2*Math.sqrt(1+h-n-a);this._w=(o-r)/g,this._x=(s+d)/g,this._y=(l+f)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,d=t._z,f=t._w;return this._x=n*f+o*a+r*d-s*l,this._y=r*f+o*l+s*a-n*d,this._z=s*f+o*d+n*l-r*a,this._w=o*f-n*a-r*l-s*d,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const g=1-t;return this._w=g*o+t*this._w,this._x=g*n+t*this._x,this._y=g*r+t*this._y,this._z=g*s+t*this._z,this.normalize(),this}const d=Math.sqrt(l),f=Math.atan2(d,a),h=Math.sin((1-t)*f)/d,p=Math.sin(t*f)/d;return this._w=o*h+this._w*p,this._x=n*h+this._x*p,this._y=r*h+this._y*p,this._z=s*h+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ${constructor(e=0,t=0,n=0){$.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,d=2*(o*r-a*n),f=2*(a*t-s*r),h=2*(s*n-o*t);return this.x=t+l*d+o*h-a*f,this.y=n+l*f+a*d-s*h,this.z=r+l*h+s*f-o*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return zs.copy(this).projectOnVector(e),this.sub(zs)}reflect(e){return this.sub(zs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zs=new $,Xl=new Wi;class Sr{constructor(e=new $(1/0,1/0,1/0),t=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(on.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(on.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=on.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,on):on.fromBufferAttribute(s,o),on.applyMatrix4(e.matrixWorld),this.expandByPoint(on);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ur.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ur.copy(n.boundingBox)),Ur.applyMatrix4(e.matrixWorld),this.union(Ur)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,on),on.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qi),Lr.subVectors(this.max,Qi),_i.subVectors(e.a,Qi),vi.subVectors(e.b,Qi),xi.subVectors(e.c,Qi),Fn.subVectors(vi,_i),On.subVectors(xi,vi),jn.subVectors(_i,xi);let t=[0,-Fn.z,Fn.y,0,-On.z,On.y,0,-jn.z,jn.y,Fn.z,0,-Fn.x,On.z,0,-On.x,jn.z,0,-jn.x,-Fn.y,Fn.x,0,-On.y,On.x,0,-jn.y,jn.x,0];return!Vs(t,_i,vi,xi,Lr)||(t=[1,0,0,0,1,0,0,0,1],!Vs(t,_i,vi,xi,Lr))?!1:(Nr.crossVectors(Fn,On),t=[Nr.x,Nr.y,Nr.z],Vs(t,_i,vi,xi,Lr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,on).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(on).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const xn=[new $,new $,new $,new $,new $,new $,new $,new $],on=new $,Ur=new Sr,_i=new $,vi=new $,xi=new $,Fn=new $,On=new $,jn=new $,Qi=new $,Lr=new $,Nr=new $,ei=new $;function Vs(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){ei.fromArray(i,s);const a=r.x*Math.abs(ei.x)+r.y*Math.abs(ei.y)+r.z*Math.abs(ei.z),l=e.dot(ei),d=t.dot(ei),f=n.dot(ei);if(Math.max(-Math.max(l,d,f),Math.min(l,d,f))>a)return!1}return!0}const Ig=new Sr,ji=new $,ks=new $;class Ma{constructor(e=new $,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ig.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ji.subVectors(e,this.center);const t=ji.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(ji,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ks.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ji.copy(e.center).add(ks)),this.expandByPoint(ji.copy(e.center).sub(ks))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Sn=new $,Hs=new $,Fr=new $,Bn=new $,Gs=new $,Or=new $,Ws=new $;class Dg{constructor(e=new $,t=new $(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sn.copy(this.origin).addScaledVector(this.direction,t),Sn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Hs.copy(e).add(t).multiplyScalar(.5),Fr.copy(t).sub(e).normalize(),Bn.copy(this.origin).sub(Hs);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Fr),a=Bn.dot(this.direction),l=-Bn.dot(Fr),d=Bn.lengthSq(),f=Math.abs(1-o*o);let h,p,g,S;if(f>0)if(h=o*l-a,p=o*a-l,S=s*f,h>=0)if(p>=-S)if(p<=S){const E=1/f;h*=E,p*=E,g=h*(h+o*p+2*a)+p*(o*h+p+2*l)+d}else p=s,h=Math.max(0,-(o*p+a)),g=-h*h+p*(p+2*l)+d;else p=-s,h=Math.max(0,-(o*p+a)),g=-h*h+p*(p+2*l)+d;else p<=-S?(h=Math.max(0,-(-o*s+a)),p=h>0?-s:Math.min(Math.max(-s,-l),s),g=-h*h+p*(p+2*l)+d):p<=S?(h=0,p=Math.min(Math.max(-s,-l),s),g=p*(p+2*l)+d):(h=Math.max(0,-(o*s+a)),p=h>0?s:Math.min(Math.max(-s,-l),s),g=-h*h+p*(p+2*l)+d);else p=o>0?-s:s,h=Math.max(0,-(o*p+a)),g=-h*h+p*(p+2*l)+d;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Hs).addScaledVector(Fr,p),g}intersectSphere(e,t){Sn.subVectors(e.center,this.origin);const n=Sn.dot(this.direction),r=Sn.dot(Sn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l;const d=1/this.direction.x,f=1/this.direction.y,h=1/this.direction.z,p=this.origin;return d>=0?(n=(e.min.x-p.x)*d,r=(e.max.x-p.x)*d):(n=(e.max.x-p.x)*d,r=(e.min.x-p.x)*d),f>=0?(s=(e.min.y-p.y)*f,o=(e.max.y-p.y)*f):(s=(e.max.y-p.y)*f,o=(e.min.y-p.y)*f),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(e.min.z-p.z)*h,l=(e.max.z-p.z)*h):(a=(e.max.z-p.z)*h,l=(e.min.z-p.z)*h),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Sn)!==null}intersectTriangle(e,t,n,r,s){Gs.subVectors(t,e),Or.subVectors(n,e),Ws.crossVectors(Gs,Or);let o=this.direction.dot(Ws),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Bn.subVectors(this.origin,e);const l=a*this.direction.dot(Or.crossVectors(Bn,Or));if(l<0)return null;const d=a*this.direction.dot(Gs.cross(Bn));if(d<0||l+d>o)return null;const f=-a*Bn.dot(Ws);return f<0?null:this.at(f/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class St{constructor(e,t,n,r,s,o,a,l,d,f,h,p,g,S,E,x){St.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,d,f,h,p,g,S,E,x)}set(e,t,n,r,s,o,a,l,d,f,h,p,g,S,E,x){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=d,m[6]=f,m[10]=h,m[14]=p,m[3]=g,m[7]=S,m[11]=E,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new St().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/Si.setFromMatrixColumn(e,0).length(),s=1/Si.setFromMatrixColumn(e,1).length(),o=1/Si.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),d=Math.sin(r),f=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const p=o*f,g=o*h,S=a*f,E=a*h;t[0]=l*f,t[4]=-l*h,t[8]=d,t[1]=g+S*d,t[5]=p-E*d,t[9]=-a*l,t[2]=E-p*d,t[6]=S+g*d,t[10]=o*l}else if(e.order==="YXZ"){const p=l*f,g=l*h,S=d*f,E=d*h;t[0]=p+E*a,t[4]=S*a-g,t[8]=o*d,t[1]=o*h,t[5]=o*f,t[9]=-a,t[2]=g*a-S,t[6]=E+p*a,t[10]=o*l}else if(e.order==="ZXY"){const p=l*f,g=l*h,S=d*f,E=d*h;t[0]=p-E*a,t[4]=-o*h,t[8]=S+g*a,t[1]=g+S*a,t[5]=o*f,t[9]=E-p*a,t[2]=-o*d,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const p=o*f,g=o*h,S=a*f,E=a*h;t[0]=l*f,t[4]=S*d-g,t[8]=p*d+E,t[1]=l*h,t[5]=E*d+p,t[9]=g*d-S,t[2]=-d,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const p=o*l,g=o*d,S=a*l,E=a*d;t[0]=l*f,t[4]=E-p*h,t[8]=S*h+g,t[1]=h,t[5]=o*f,t[9]=-a*f,t[2]=-d*f,t[6]=g*h+S,t[10]=p-E*h}else if(e.order==="XZY"){const p=o*l,g=o*d,S=a*l,E=a*d;t[0]=l*f,t[4]=-h,t[8]=d*f,t[1]=p*h+E,t[5]=o*f,t[9]=g*h-S,t[2]=S*h-g,t[6]=a*f,t[10]=E*h+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ug,e,Lg)}lookAt(e,t,n){const r=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),zn.crossVectors(n,Gt),zn.lengthSq()===0&&(Math.abs(n.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),zn.crossVectors(n,Gt)),zn.normalize(),Br.crossVectors(Gt,zn),r[0]=zn.x,r[4]=Br.x,r[8]=Gt.x,r[1]=zn.y,r[5]=Br.y,r[9]=Gt.y,r[2]=zn.z,r[6]=Br.z,r[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],d=n[12],f=n[1],h=n[5],p=n[9],g=n[13],S=n[2],E=n[6],x=n[10],m=n[14],P=n[3],w=n[7],T=n[11],z=n[15],F=r[0],N=r[4],V=r[8],R=r[12],M=r[1],O=r[5],Z=r[9],Y=r[13],ie=r[2],le=r[6],ee=r[10],ce=r[14],Q=r[3],ge=r[7],ve=r[11],be=r[15];return s[0]=o*F+a*M+l*ie+d*Q,s[4]=o*N+a*O+l*le+d*ge,s[8]=o*V+a*Z+l*ee+d*ve,s[12]=o*R+a*Y+l*ce+d*be,s[1]=f*F+h*M+p*ie+g*Q,s[5]=f*N+h*O+p*le+g*ge,s[9]=f*V+h*Z+p*ee+g*ve,s[13]=f*R+h*Y+p*ce+g*be,s[2]=S*F+E*M+x*ie+m*Q,s[6]=S*N+E*O+x*le+m*ge,s[10]=S*V+E*Z+x*ee+m*ve,s[14]=S*R+E*Y+x*ce+m*be,s[3]=P*F+w*M+T*ie+z*Q,s[7]=P*N+w*O+T*le+z*ge,s[11]=P*V+w*Z+T*ee+z*ve,s[15]=P*R+w*Y+T*ce+z*be,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],d=e[13],f=e[2],h=e[6],p=e[10],g=e[14],S=e[3],E=e[7],x=e[11],m=e[15];return S*(+s*l*h-r*d*h-s*a*p+n*d*p+r*a*g-n*l*g)+E*(+t*l*g-t*d*p+s*o*p-r*o*g+r*d*f-s*l*f)+x*(+t*d*h-t*a*g-s*o*h+n*o*g+s*a*f-n*d*f)+m*(-r*a*f-t*l*h+t*a*p+r*o*h-n*o*p+n*l*f)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],d=e[7],f=e[8],h=e[9],p=e[10],g=e[11],S=e[12],E=e[13],x=e[14],m=e[15],P=h*x*d-E*p*d+E*l*g-a*x*g-h*l*m+a*p*m,w=S*p*d-f*x*d-S*l*g+o*x*g+f*l*m-o*p*m,T=f*E*d-S*h*d+S*a*g-o*E*g-f*a*m+o*h*m,z=S*h*l-f*E*l-S*a*p+o*E*p+f*a*x-o*h*x,F=t*P+n*w+r*T+s*z;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/F;return e[0]=P*N,e[1]=(E*p*s-h*x*s-E*r*g+n*x*g+h*r*m-n*p*m)*N,e[2]=(a*x*s-E*l*s+E*r*d-n*x*d-a*r*m+n*l*m)*N,e[3]=(h*l*s-a*p*s-h*r*d+n*p*d+a*r*g-n*l*g)*N,e[4]=w*N,e[5]=(f*x*s-S*p*s+S*r*g-t*x*g-f*r*m+t*p*m)*N,e[6]=(S*l*s-o*x*s-S*r*d+t*x*d+o*r*m-t*l*m)*N,e[7]=(o*p*s-f*l*s+f*r*d-t*p*d-o*r*g+t*l*g)*N,e[8]=T*N,e[9]=(S*h*s-f*E*s-S*n*g+t*E*g+f*n*m-t*h*m)*N,e[10]=(o*E*s-S*a*s+S*n*d-t*E*d-o*n*m+t*a*m)*N,e[11]=(f*a*s-o*h*s-f*n*d+t*h*d+o*n*g-t*a*g)*N,e[12]=z*N,e[13]=(f*E*r-S*h*r+S*n*p-t*E*p-f*n*x+t*h*x)*N,e[14]=(S*a*r-o*E*r-S*n*l+t*E*l+o*n*x-t*a*x)*N,e[15]=(o*h*r-f*a*r+f*n*l-t*h*l-o*n*p+t*a*p)*N,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,d=s*o,f=s*a;return this.set(d*o+n,d*a-r*l,d*l+r*a,0,d*a+r*l,f*a+n,f*l-r*o,0,d*l-r*a,f*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,d=s+s,f=o+o,h=a+a,p=s*d,g=s*f,S=s*h,E=o*f,x=o*h,m=a*h,P=l*d,w=l*f,T=l*h,z=n.x,F=n.y,N=n.z;return r[0]=(1-(E+m))*z,r[1]=(g+T)*z,r[2]=(S-w)*z,r[3]=0,r[4]=(g-T)*F,r[5]=(1-(p+m))*F,r[6]=(x+P)*F,r[7]=0,r[8]=(S+w)*N,r[9]=(x-P)*N,r[10]=(1-(p+E))*N,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=Si.set(r[0],r[1],r[2]).length();const o=Si.set(r[4],r[5],r[6]).length(),a=Si.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],an.copy(this);const d=1/s,f=1/o,h=1/a;return an.elements[0]*=d,an.elements[1]*=d,an.elements[2]*=d,an.elements[4]*=f,an.elements[5]*=f,an.elements[6]*=f,an.elements[8]*=h,an.elements[9]*=h,an.elements[10]*=h,t.setFromRotationMatrix(an),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,r,s,o,a=Pn){const l=this.elements,d=2*s/(t-e),f=2*s/(n-r),h=(t+e)/(t-e),p=(n+r)/(n-r);let g,S;if(a===Pn)g=-(o+s)/(o-s),S=-2*o*s/(o-s);else if(a===Ss)g=-o/(o-s),S=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=d,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=Pn){const l=this.elements,d=1/(t-e),f=1/(n-r),h=1/(o-s),p=(t+e)*d,g=(n+r)*f;let S,E;if(a===Pn)S=(o+s)*h,E=-2*h;else if(a===Ss)S=s*h,E=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*d,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*f,l[9]=0,l[13]=-g,l[2]=0,l[6]=0,l[10]=E,l[14]=-S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Si=new $,an=new St,Ug=new $(0,0,0),Lg=new $(1,1,1),zn=new $,Br=new $,Gt=new $,ql=new St,Yl=new Wi;class hn{constructor(e=0,t=0,n=0,r=hn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],d=r[5],f=r[9],h=r[2],p=r[6],g=r[10];switch(t){case"XYZ":this._y=Math.asin(et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,g),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(p,d),this._z=0);break;case"YXZ":this._x=Math.asin(-et(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,g),this._z=Math.atan2(l,d)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(et(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-h,g),this._z=Math.atan2(-o,d)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-et(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(p,g),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,d));break;case"YZX":this._z=Math.asin(et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,d),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,g));break;case"XZY":this._z=Math.asin(-et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,d),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-f,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ql.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ql,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Yl.setFromEuler(this),this.setFromQuaternion(Yl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hn.DEFAULT_ORDER="XYZ";class hu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ng=0;const Kl=new $,yi=new Wi,yn=new St,zr=new $,er=new $,Fg=new $,Og=new Wi,Zl=new $(1,0,0),Jl=new $(0,1,0),Ql=new $(0,0,1),jl={type:"added"},Bg={type:"removed"},Ei={type:"childadded",child:null},$s={type:"childremoved",child:null};class qt extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ng++}),this.uuid=xr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=qt.DEFAULT_UP.clone();const e=new $,t=new hn,n=new Wi,r=new $(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new St},normalMatrix:{value:new Ye}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=qt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.multiply(yi),this}rotateOnWorldAxis(e,t){return yi.setFromAxisAngle(e,t),this.quaternion.premultiply(yi),this}rotateX(e){return this.rotateOnAxis(Zl,e)}rotateY(e){return this.rotateOnAxis(Jl,e)}rotateZ(e){return this.rotateOnAxis(Ql,e)}translateOnAxis(e,t){return Kl.copy(e).applyQuaternion(this.quaternion),this.position.add(Kl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Zl,e)}translateY(e){return this.translateOnAxis(Jl,e)}translateZ(e){return this.translateOnAxis(Ql,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zr.copy(e):zr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),er.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(er,zr,this.up):yn.lookAt(zr,er,this.up),this.quaternion.setFromRotationMatrix(yn),r&&(yn.extractRotation(r.matrixWorld),yi.setFromRotationMatrix(yn),this.quaternion.premultiply(yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jl),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bg),$s.child=e,this.dispatchEvent($s),$s.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jl),Ei.child=e,this.dispatchEvent(Ei),Ei.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,e,Fg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(er,Og,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?{min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}:void 0,boundingSphere:a.boundingSphere?{radius:a.boundingSphere.radius,center:a.boundingSphere.center.toArray()}:void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:this.boundingSphere.center.toArray(),radius:this.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:this.boundingBox.min.toArray(),max:this.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let d=0,f=l.length;d<f;d++){const h=l[d];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,d=this.material.length;l<d;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),d=o(e.textures),f=o(e.images),h=o(e.shapes),p=o(e.skeletons),g=o(e.animations),S=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),d.length>0&&(n.textures=d),f.length>0&&(n.images=f),h.length>0&&(n.shapes=h),p.length>0&&(n.skeletons=p),g.length>0&&(n.animations=g),S.length>0&&(n.nodes=S)}return n.object=r,n;function o(a){const l=[];for(const d in a){const f=a[d];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}qt.DEFAULT_UP=new $(0,1,0);qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ln=new $,En=new $,Xs=new $,Mn=new $,Mi=new $,Ti=new $,ec=new $,qs=new $,Ys=new $,Ks=new $,Zs=new gt,Js=new gt,Qs=new gt;class dn{constructor(e=new $,t=new $,n=new $){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),ln.subVectors(e,t),r.cross(ln);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){ln.subVectors(r,t),En.subVectors(n,t),Xs.subVectors(e,t);const o=ln.dot(ln),a=ln.dot(En),l=ln.dot(Xs),d=En.dot(En),f=En.dot(Xs),h=o*d-a*a;if(h===0)return s.set(0,0,0),null;const p=1/h,g=(d*l-a*f)*p,S=(o*f-a*l)*p;return s.set(1-g-S,S,g)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,Mn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Mn.x),l.addScaledVector(o,Mn.y),l.addScaledVector(a,Mn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,o){return Zs.setScalar(0),Js.setScalar(0),Qs.setScalar(0),Zs.fromBufferAttribute(e,t),Js.fromBufferAttribute(e,n),Qs.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Zs,s.x),o.addScaledVector(Js,s.y),o.addScaledVector(Qs,s.z),o}static isFrontFacing(e,t,n,r){return ln.subVectors(n,t),En.subVectors(e,t),ln.cross(En).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ln.subVectors(this.c,this.b),En.subVectors(this.a,this.b),ln.cross(En).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return dn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return dn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;Mi.subVectors(r,n),Ti.subVectors(s,n),qs.subVectors(e,n);const l=Mi.dot(qs),d=Ti.dot(qs);if(l<=0&&d<=0)return t.copy(n);Ys.subVectors(e,r);const f=Mi.dot(Ys),h=Ti.dot(Ys);if(f>=0&&h<=f)return t.copy(r);const p=l*h-f*d;if(p<=0&&l>=0&&f<=0)return o=l/(l-f),t.copy(n).addScaledVector(Mi,o);Ks.subVectors(e,s);const g=Mi.dot(Ks),S=Ti.dot(Ks);if(S>=0&&g<=S)return t.copy(s);const E=g*d-l*S;if(E<=0&&d>=0&&S<=0)return a=d/(d-S),t.copy(n).addScaledVector(Ti,a);const x=f*S-g*h;if(x<=0&&h-f>=0&&g-S>=0)return ec.subVectors(s,r),a=(h-f)/(h-f+(g-S)),t.copy(r).addScaledVector(ec,a);const m=1/(x+E+p);return o=E*m,a=p*m,t.copy(n).addScaledVector(Mi,o).addScaledVector(Ti,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const pu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vn={h:0,s:0,l:0},Vr={h:0,s:0,l:0};function js(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class it{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,ot.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=ot.workingColorSpace){if(e=Sg(e,1),t=et(t,0,1),n=et(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=js(o,s,e+1/3),this.g=js(o,s,e),this.b=js(o,s,e-1/3)}return ot.toWorkingColorSpace(this,r),this}setStyle(e,t=Kt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Kt){const n=pu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Dn(e.r),this.g=Dn(e.g),this.b=Dn(e.b),this}copyLinearToSRGB(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Kt){return ot.fromWorkingColorSpace(It.copy(this),e),Math.round(et(It.r*255,0,255))*65536+Math.round(et(It.g*255,0,255))*256+Math.round(et(It.b*255,0,255))}getHexString(e=Kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.fromWorkingColorSpace(It.copy(this),t);const n=It.r,r=It.g,s=It.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,d;const f=(a+o)/2;if(a===o)l=0,d=0;else{const h=o-a;switch(d=f<=.5?h/(o+a):h/(2-o-a),o){case n:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-n)/h+2;break;case s:l=(n-r)/h+4;break}l/=6}return e.h=l,e.s=d,e.l=f,e}getRGB(e,t=ot.workingColorSpace){return ot.fromWorkingColorSpace(It.copy(this),t),e.r=It.r,e.g=It.g,e.b=It.b,e}getStyle(e=Kt){ot.fromWorkingColorSpace(It.copy(this),e);const t=It.r,n=It.g,r=It.b;return e!==Kt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Vn),this.setHSL(Vn.h+e,Vn.s+t,Vn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Vn),e.getHSL(Vr);const n=Fs(Vn.h,Vr.h,t),r=Fs(Vn.s,Vr.s,t),s=Fs(Vn.l,Vr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const It=new it;it.NAMES=pu;let zg=0;class yr extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zg++}),this.uuid=xr(),this.name="",this.type="Material",this.blending=Ui,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xo,this.blendDst=So,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mi,this.stencilZFail=mi,this.stencilZPass=mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ui&&(n.blending=this.blending),this.side!==qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xo&&(n.blendSrc=this.blendSrc),this.blendDst!==So&&(n.blendDst=this.blendDst),this.blendEquation!==ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==kl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ta extends yr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.combine=eu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rn=Vg();function Vg(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let l=0;l<256;++l){const d=l-127;d<-27?(n[l]=0,n[l|256]=32768,r[l]=24,r[l|256]=24):d<-14?(n[l]=1024>>-d-14,n[l|256]=1024>>-d-14|32768,r[l]=-d-1,r[l|256]=-d-1):d<=15?(n[l]=d+15<<10,n[l|256]=d+15<<10|32768,r[l]=13,r[l|256]=13):d<128?(n[l]=31744,n[l|256]=64512,r[l]=24,r[l|256]=24):(n[l]=31744,n[l|256]=64512,r[l]=13,r[l|256]=13)}const s=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let d=l<<13,f=0;for(;(d&8388608)===0;)d<<=1,f-=8388608;d&=-8388609,f+=947912704,s[l]=d|f}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:s,exponentTable:o,offsetTable:a}}function kg(i){Math.abs(i)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),i=et(i,-65504,65504),Rn.floatView[0]=i;const e=Rn.uint32View[0],t=e>>23&511;return Rn.baseTable[t]+((e&8388607)>>Rn.shiftTable[t])}function Hg(i){const e=i>>10;return Rn.uint32View[0]=Rn.mantissaTable[Rn.offsetTable[e]+(i&1023)]+Rn.exponentTable[e],Rn.floatView[0]}class tc{static toHalfFloat(e){return kg(e)}static fromHalfFloat(e){return Hg(e)}}const xt=new $,kr=new Ge;let Gg=0;class gn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Gg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Hl,this.updateRanges=[],this.gpuType=Qt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)kr.fromBufferAttribute(this,t),kr.applyMatrix3(e),this.setXY(t,kr.x,kr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ji(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Vt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ji(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ji(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ji(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ji(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),r=Vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),r=Vt(r,this.array),s=Vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Hl&&(e.usage=this.usage),e}}class mu extends gn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class gu extends gn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class nn extends gn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Wg=0;const Yt=new St,eo=new qt,Ai=new $,Wt=new Sr,tr=new Sr,wt=new $;class Ln extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wg++}),this.uuid=xr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(du(e)?gu:mu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ye().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yt.makeRotationFromQuaternion(e),this.applyMatrix4(Yt),this}rotateX(e){return Yt.makeRotationX(e),this.applyMatrix4(Yt),this}rotateY(e){return Yt.makeRotationY(e),this.applyMatrix4(Yt),this}rotateZ(e){return Yt.makeRotationZ(e),this.applyMatrix4(Yt),this}translate(e,t,n){return Yt.makeTranslation(e,t,n),this.applyMatrix4(Yt),this}scale(e,t,n){return Yt.makeScale(e,t,n),this.applyMatrix4(Yt),this}lookAt(e){return eo.lookAt(e),eo.updateMatrix(),this.applyMatrix4(eo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ai).negate(),this.translate(Ai.x,Ai.y,Ai.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new nn(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];Wt.setFromBufferAttribute(s),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ma);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new $,1/0);return}if(e){const n=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];tr.setFromBufferAttribute(a),this.morphTargetsRelative?(wt.addVectors(Wt.min,tr.min),Wt.expandByPoint(wt),wt.addVectors(Wt.max,tr.max),Wt.expandByPoint(wt)):(Wt.expandByPoint(tr.min),Wt.expandByPoint(tr.max))}Wt.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)wt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(wt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let d=0,f=a.count;d<f;d++)wt.fromBufferAttribute(a,d),l&&(Ai.fromBufferAttribute(e,d),wt.add(Ai)),r=Math.max(r,n.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new gn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let V=0;V<n.count;V++)a[V]=new $,l[V]=new $;const d=new $,f=new $,h=new $,p=new Ge,g=new Ge,S=new Ge,E=new $,x=new $;function m(V,R,M){d.fromBufferAttribute(n,V),f.fromBufferAttribute(n,R),h.fromBufferAttribute(n,M),p.fromBufferAttribute(s,V),g.fromBufferAttribute(s,R),S.fromBufferAttribute(s,M),f.sub(d),h.sub(d),g.sub(p),S.sub(p);const O=1/(g.x*S.y-S.x*g.y);isFinite(O)&&(E.copy(f).multiplyScalar(S.y).addScaledVector(h,-g.y).multiplyScalar(O),x.copy(h).multiplyScalar(g.x).addScaledVector(f,-S.x).multiplyScalar(O),a[V].add(E),a[R].add(E),a[M].add(E),l[V].add(x),l[R].add(x),l[M].add(x))}let P=this.groups;P.length===0&&(P=[{start:0,count:e.count}]);for(let V=0,R=P.length;V<R;++V){const M=P[V],O=M.start,Z=M.count;for(let Y=O,ie=O+Z;Y<ie;Y+=3)m(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const w=new $,T=new $,z=new $,F=new $;function N(V){z.fromBufferAttribute(r,V),F.copy(z);const R=a[V];w.copy(R),w.sub(z.multiplyScalar(z.dot(R))).normalize(),T.crossVectors(F,R);const O=T.dot(l[V])<0?-1:1;o.setXYZW(V,w.x,w.y,w.z,O)}for(let V=0,R=P.length;V<R;++V){const M=P[V],O=M.start,Z=M.count;for(let Y=O,ie=O+Z;Y<ie;Y+=3)N(e.getX(Y+0)),N(e.getX(Y+1)),N(e.getX(Y+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new gn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,g=n.count;p<g;p++)n.setXYZ(p,0,0,0);const r=new $,s=new $,o=new $,a=new $,l=new $,d=new $,f=new $,h=new $;if(e)for(let p=0,g=e.count;p<g;p+=3){const S=e.getX(p+0),E=e.getX(p+1),x=e.getX(p+2);r.fromBufferAttribute(t,S),s.fromBufferAttribute(t,E),o.fromBufferAttribute(t,x),f.subVectors(o,s),h.subVectors(r,s),f.cross(h),a.fromBufferAttribute(n,S),l.fromBufferAttribute(n,E),d.fromBufferAttribute(n,x),a.add(f),l.add(f),d.add(f),n.setXYZ(S,a.x,a.y,a.z),n.setXYZ(E,l.x,l.y,l.z),n.setXYZ(x,d.x,d.y,d.z)}else for(let p=0,g=t.count;p<g;p+=3)r.fromBufferAttribute(t,p+0),s.fromBufferAttribute(t,p+1),o.fromBufferAttribute(t,p+2),f.subVectors(o,s),h.subVectors(r,s),f.cross(h),n.setXYZ(p+0,f.x,f.y,f.z),n.setXYZ(p+1,f.x,f.y,f.z),n.setXYZ(p+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(a,l){const d=a.array,f=a.itemSize,h=a.normalized,p=new d.constructor(l.length*f);let g=0,S=0;for(let E=0,x=l.length;E<x;E++){a.isInterleavedBufferAttribute?g=l[E]*a.data.stride+a.offset:g=l[E]*f;for(let m=0;m<f;m++)p[S++]=d[g++]}return new gn(p,f,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ln,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],d=e(l,n);t.setAttribute(a,d)}const s=this.morphAttributes;for(const a in s){const l=[],d=s[a];for(let f=0,h=d.length;f<h;f++){const p=d[f],g=e(p,n);l.push(g)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const d=o[a];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const d in l)l[d]!==void 0&&(e[d]=l[d]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const d=n[l];e.data.attributes[l]=d.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const d=this.morphAttributes[l],f=[];for(let h=0,p=d.length;h<p;h++){const g=d[h];f.push(g.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const d in r){const f=r[d];this.setAttribute(d,f.clone(t))}const s=e.morphAttributes;for(const d in s){const f=[],h=s[d];for(let p=0,g=h.length;p<g;p++)f.push(h[p].clone(t));this.morphAttributes[d]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let d=0,f=o.length;d<f;d++){const h=o[d];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nc=new St,ti=new Dg,Hr=new Ma,ic=new $,Gr=new $,Wr=new $,$r=new $,to=new $,Xr=new $,rc=new $,qr=new $;class en extends qt{constructor(e=new Ln,t=new Ta){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Xr.set(0,0,0);for(let l=0,d=s.length;l<d;l++){const f=a[l],h=s[l];f!==0&&(to.fromBufferAttribute(h,e),o?Xr.addScaledVector(to,f):Xr.addScaledVector(to.sub(t),f))}t.add(Xr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(s),ti.copy(e.ray).recast(e.near),!(Hr.containsPoint(ti.origin)===!1&&(ti.intersectSphere(Hr,ic)===null||ti.origin.distanceToSquared(ic)>(e.far-e.near)**2))&&(nc.copy(s).invert(),ti.copy(e.ray).applyMatrix4(nc),!(n.boundingBox!==null&&ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ti)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,d=s.attributes.uv,f=s.attributes.uv1,h=s.attributes.normal,p=s.groups,g=s.drawRange;if(a!==null)if(Array.isArray(o))for(let S=0,E=p.length;S<E;S++){const x=p[S],m=o[x.materialIndex],P=Math.max(x.start,g.start),w=Math.min(a.count,Math.min(x.start+x.count,g.start+g.count));for(let T=P,z=w;T<z;T+=3){const F=a.getX(T),N=a.getX(T+1),V=a.getX(T+2);r=Yr(this,m,e,n,d,f,h,F,N,V),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const S=Math.max(0,g.start),E=Math.min(a.count,g.start+g.count);for(let x=S,m=E;x<m;x+=3){const P=a.getX(x),w=a.getX(x+1),T=a.getX(x+2);r=Yr(this,o,e,n,d,f,h,P,w,T),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let S=0,E=p.length;S<E;S++){const x=p[S],m=o[x.materialIndex],P=Math.max(x.start,g.start),w=Math.min(l.count,Math.min(x.start+x.count,g.start+g.count));for(let T=P,z=w;T<z;T+=3){const F=T,N=T+1,V=T+2;r=Yr(this,m,e,n,d,f,h,F,N,V),r&&(r.faceIndex=Math.floor(T/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const S=Math.max(0,g.start),E=Math.min(l.count,g.start+g.count);for(let x=S,m=E;x<m;x+=3){const P=x,w=x+1,T=x+2;r=Yr(this,o,e,n,d,f,h,P,w,T),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}}}function $g(i,e,t,n,r,s,o,a){let l;if(e.side===Bt?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===qn,a),l===null)return null;qr.copy(a),qr.applyMatrix4(i.matrixWorld);const d=t.ray.origin.distanceTo(qr);return d<t.near||d>t.far?null:{distance:d,point:qr.clone(),object:i}}function Yr(i,e,t,n,r,s,o,a,l,d){i.getVertexPosition(a,Gr),i.getVertexPosition(l,Wr),i.getVertexPosition(d,$r);const f=$g(i,e,t,n,Gr,Wr,$r,rc);if(f){const h=new $;dn.getBarycoord(rc,Gr,Wr,$r,h),r&&(f.uv=dn.getInterpolatedAttribute(r,a,l,d,h,new Ge)),s&&(f.uv1=dn.getInterpolatedAttribute(s,a,l,d,h,new Ge)),o&&(f.normal=dn.getInterpolatedAttribute(o,a,l,d,h,new $),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const p={a,b:l,c:d,normal:new $,materialIndex:0};dn.getNormal(Gr,Wr,$r,p.normal),f.face=p,f.barycoord=h}return f}class Er extends Ln{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],d=[],f=[],h=[];let p=0,g=0;S("z","y","x",-1,-1,n,t,e,o,s,0),S("z","y","x",1,-1,n,t,-e,o,s,1),S("x","z","y",1,1,e,n,t,r,o,2),S("x","z","y",1,-1,e,n,-t,r,o,3),S("x","y","z",1,-1,e,t,n,r,s,4),S("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new nn(d,3)),this.setAttribute("normal",new nn(f,3)),this.setAttribute("uv",new nn(h,2));function S(E,x,m,P,w,T,z,F,N,V,R){const M=T/N,O=z/V,Z=T/2,Y=z/2,ie=F/2,le=N+1,ee=V+1;let ce=0,Q=0;const ge=new $;for(let ve=0;ve<ee;ve++){const be=ve*O-Y;for(let Ve=0;Ve<le;Ve++){const Je=Ve*M-Z;ge[E]=Je*P,ge[x]=be*w,ge[m]=ie,d.push(ge.x,ge.y,ge.z),ge[E]=0,ge[x]=0,ge[m]=F>0?1:-1,f.push(ge.x,ge.y,ge.z),h.push(Ve/N),h.push(1-ve/V),ce+=1}}for(let ve=0;ve<V;ve++)for(let be=0;be<N;be++){const Ve=p+be+le*ve,Je=p+be+le*(ve+1),j=p+(be+1)+le*(ve+1),pe=p+(be+1)+le*ve;l.push(Ve,Je,pe),l.push(Je,j,pe),Q+=6}a.addGroup(g,Q,R),g+=Q,p+=ce}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Er(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Nt(i){const e={};for(let t=0;t<i.length;t++){const n=Vi(i[t]);for(const r in n)e[r]=n[r]}return e}function Xg(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function _u(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}const Es={clone:Vi,merge:Nt};var qg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ot extends yr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qg,this.fragmentShader=Yg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vi(e.uniforms),this.uniformsGroups=Xg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class vu extends qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=Pn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const kn=new $,sc=new Ge,oc=new Ge;class Zt extends vu{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ra*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ns*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ra*2*Math.atan(Math.tan(Ns*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(kn.x,kn.y).multiplyScalar(-e/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-e/kn.z)}getViewSize(e,t){return this.getViewBounds(e,sc,oc),t.subVectors(oc,sc)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ns*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,d=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/d,r*=o.width/l,n*=o.height/d}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ci=-90,wi=1;class Kg extends qt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Zt(Ci,wi,e,t);r.layers=this.layers,this.add(r);const s=new Zt(Ci,wi,e,t);s.layers=this.layers,this.add(s);const o=new Zt(Ci,wi,e,t);o.layers=this.layers,this.add(o);const a=new Zt(Ci,wi,e,t);a.layers=this.layers,this.add(a);const l=new Zt(Ci,wi,e,t);l.layers=this.layers,this.add(l);const d=new Zt(Ci,wi,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(const d of t)this.remove(d);if(e===Pn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ss)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,d,f]=this.children,h=e.getRenderTarget(),p=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),S=e.xr.enabled;e.xr.enabled=!1;const E=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,a),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,d),n.texture.generateMipmaps=E,e.setRenderTarget(n,5,r),e.render(t,f),e.setRenderTarget(h,p,g),e.xr.enabled=S,n.texture.needsPMREMUpdate=!0}}class xu extends zt{constructor(e=[],t=Bi,n,r,s,o,a,l,d,f){super(e,t,n,r,s,o,a,l,d,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Zg extends fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new xu(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ft}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Er(5,5,5),s=new Ot({name:"CubemapFromEquirect",uniforms:Vi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Bt,blending:In});s.uniforms.tEquirect.value=t;const o=new en(r,s),a=t.minFilter;return t.minFilter===Wn&&(t.minFilter=Ft),new Kg(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}class Kr extends qt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jg={type:"move"};class no{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Kr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Kr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Kr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){o=!0;for(const E of e.hand.values()){const x=t.getJointPose(E,n),m=this._getHandJoint(d,E);x!==null&&(m.matrix.fromArray(x.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=x.radius),m.visible=x!==null}const f=d.joints["index-finger-tip"],h=d.joints["thumb-tip"],p=f.position.distanceTo(h.position),g=.02,S=.005;d.inputState.pinching&&p>g+S?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&p<=g-S&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Jg)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),d!==null&&(d.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Kr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Qg extends qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hn,this.environmentIntensity=1,this.environmentRotation=new hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class jg extends zt{constructor(e=null,t=1,n=1,r,s,o,a,l,d=Xt,f=Xt,h,p){super(null,o,a,l,d,f,r,s,h,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const io=new $,e_=new $,t_=new Ye;class si{constructor(e=new $(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=io.subVectors(n,t).cross(e_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(io),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||t_.getNormalMatrix(e),r=this.coplanarPoint(io).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ni=new Ma,Zr=new $;class Su{constructor(e=new si,t=new si,n=new si,r=new si,s=new si,o=new si){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Pn){const n=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],d=r[4],f=r[5],h=r[6],p=r[7],g=r[8],S=r[9],E=r[10],x=r[11],m=r[12],P=r[13],w=r[14],T=r[15];if(n[0].setComponents(l-s,p-d,x-g,T-m).normalize(),n[1].setComponents(l+s,p+d,x+g,T+m).normalize(),n[2].setComponents(l+o,p+f,x+S,T+P).normalize(),n[3].setComponents(l-o,p-f,x-S,T-P).normalize(),n[4].setComponents(l-a,p-h,x-E,T-w).normalize(),t===Pn)n[5].setComponents(l+a,p+h,x+E,T+w).normalize();else if(t===Ss)n[5].setComponents(a,h,E,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(e){return ni.center.set(0,0,0),ni.radius=.7071067811865476,ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Zr.x=r.normal.x>0?e.max.x:e.min.x,Zr.y=r.normal.y>0?e.max.y:e.min.y,Zr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Zr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class yu extends zt{constructor(e,t,n=fi,r,s,o,a=Xt,l=Xt,d,f=hr){if(f!==hr&&f!==pr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super(null,r,s,o,a,l,f,n,d),this.isDepthTexture=!0,this.image={width:e,height:t},this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ea(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Aa extends Ln{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const s=[],o=[];a(r),d(n),f(),this.setAttribute("position",new nn(s,3)),this.setAttribute("normal",new nn(s.slice(),3)),this.setAttribute("uv",new nn(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(P){const w=new $,T=new $,z=new $;for(let F=0;F<t.length;F+=3)g(t[F+0],w),g(t[F+1],T),g(t[F+2],z),l(w,T,z,P)}function l(P,w,T,z){const F=z+1,N=[];for(let V=0;V<=F;V++){N[V]=[];const R=P.clone().lerp(T,V/F),M=w.clone().lerp(T,V/F),O=F-V;for(let Z=0;Z<=O;Z++)Z===0&&V===F?N[V][Z]=R:N[V][Z]=R.clone().lerp(M,Z/O)}for(let V=0;V<F;V++)for(let R=0;R<2*(F-V)-1;R++){const M=Math.floor(R/2);R%2===0?(p(N[V][M+1]),p(N[V+1][M]),p(N[V][M])):(p(N[V][M+1]),p(N[V+1][M+1]),p(N[V+1][M]))}}function d(P){const w=new $;for(let T=0;T<s.length;T+=3)w.x=s[T+0],w.y=s[T+1],w.z=s[T+2],w.normalize().multiplyScalar(P),s[T+0]=w.x,s[T+1]=w.y,s[T+2]=w.z}function f(){const P=new $;for(let w=0;w<s.length;w+=3){P.x=s[w+0],P.y=s[w+1],P.z=s[w+2];const T=x(P)/2/Math.PI+.5,z=m(P)/Math.PI+.5;o.push(T,1-z)}S(),h()}function h(){for(let P=0;P<o.length;P+=6){const w=o[P+0],T=o[P+2],z=o[P+4],F=Math.max(w,T,z),N=Math.min(w,T,z);F>.9&&N<.1&&(w<.2&&(o[P+0]+=1),T<.2&&(o[P+2]+=1),z<.2&&(o[P+4]+=1))}}function p(P){s.push(P.x,P.y,P.z)}function g(P,w){const T=P*3;w.x=e[T+0],w.y=e[T+1],w.z=e[T+2]}function S(){const P=new $,w=new $,T=new $,z=new $,F=new Ge,N=new Ge,V=new Ge;for(let R=0,M=0;R<s.length;R+=9,M+=6){P.set(s[R+0],s[R+1],s[R+2]),w.set(s[R+3],s[R+4],s[R+5]),T.set(s[R+6],s[R+7],s[R+8]),F.set(o[M+0],o[M+1]),N.set(o[M+2],o[M+3]),V.set(o[M+4],o[M+5]),z.copy(P).add(w).add(T).divideScalar(3);const O=x(z);E(F,M+0,P,O),E(N,M+2,w,O),E(V,M+4,T,O)}}function E(P,w,T,z){z<0&&P.x===1&&(o[w]=P.x-1),T.x===0&&T.z===0&&(o[w]=z/2/Math.PI+.5)}function x(P){return Math.atan2(P.z,-P.x)}function m(P){return Math.atan2(-P.y,Math.sqrt(P.x*P.x+P.z*P.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Aa(e.vertices,e.indices,e.radius,e.details)}}class Ms extends Aa{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ms(e.radius,e.detail)}}class bs extends Ln{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),d=a+1,f=l+1,h=e/a,p=t/l,g=[],S=[],E=[],x=[];for(let m=0;m<f;m++){const P=m*p-o;for(let w=0;w<d;w++){const T=w*h-s;S.push(T,-P,0),E.push(0,0,1),x.push(w/a),x.push(1-m/l)}}for(let m=0;m<l;m++)for(let P=0;P<a;P++){const w=P+d*m,T=P+d*(m+1),z=P+1+d*(m+1),F=P+1+d*m;g.push(w,T,F),g.push(T,z,F)}this.setIndex(g),this.setAttribute("position",new nn(S,3)),this.setAttribute("normal",new nn(E,3)),this.setAttribute("uv",new nn(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.width,e.height,e.widthSegments,e.heightSegments)}}class n_ extends Ot{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class i_ extends yr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new it(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new it(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=cu,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class r_ extends yr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ug,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class s_ extends yr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ac={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class o_{constructor(e,t,n){const r=this;let s=!1,o=0,a=0,l;const d=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(f){a++,s===!1&&r.onStart!==void 0&&r.onStart(f,o,a),s=!0},this.itemEnd=function(f){o++,r.onProgress!==void 0&&r.onProgress(f,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(f){r.onError!==void 0&&r.onError(f)},this.resolveURL=function(f){return l?l(f):f},this.setURLModifier=function(f){return l=f,this},this.addHandler=function(f,h){return d.push(f,h),this},this.removeHandler=function(f){const h=d.indexOf(f);return h!==-1&&d.splice(h,2),this},this.getHandler=function(f){for(let h=0,p=d.length;h<p;h+=2){const g=d[h],S=d[h+1];if(g.global&&(g.lastIndex=0),g.test(f))return S}return null}}}const a_=new o_;class Ca{constructor(e){this.manager=e!==void 0?e:a_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ca.DEFAULT_MATERIAL_NAME="__DEFAULT";const Tn={};class l_ extends Error{constructor(e,t){super(e),this.response=t}}class c_ extends Ca{constructor(e){super(e),this.mimeType="",this.responseType=""}load(e,t,n,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ac.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Tn[e]!==void 0){Tn[e].push({onLoad:t,onProgress:n,onError:r});return}Tn[e]=[],Tn[e].push({onLoad:t,onProgress:n,onError:r});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(d=>{if(d.status===200||d.status===0){if(d.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||d.body===void 0||d.body.getReader===void 0)return d;const f=Tn[e],h=d.body.getReader(),p=d.headers.get("X-File-Size")||d.headers.get("Content-Length"),g=p?parseInt(p):0,S=g!==0;let E=0;const x=new ReadableStream({start(m){P();function P(){h.read().then(({done:w,value:T})=>{if(w)m.close();else{E+=T.byteLength;const z=new ProgressEvent("progress",{lengthComputable:S,loaded:E,total:g});for(let F=0,N=f.length;F<N;F++){const V=f[F];V.onProgress&&V.onProgress(z)}m.enqueue(T),P()}},w=>{m.error(w)})}}});return new Response(x)}else throw new l_(`fetch for "${d.url}" responded with ${d.status}: ${d.statusText}`,d)}).then(d=>{switch(l){case"arraybuffer":return d.arrayBuffer();case"blob":return d.blob();case"document":return d.text().then(f=>new DOMParser().parseFromString(f,a));case"json":return d.json();default:if(a==="")return d.text();{const h=/charset="?([^;"\s]*)"?/i.exec(a),p=h&&h[1]?h[1].toLowerCase():void 0,g=new TextDecoder(p);return d.arrayBuffer().then(S=>g.decode(S))}}}).then(d=>{ac.add(e,d);const f=Tn[e];delete Tn[e];for(let h=0,p=f.length;h<p;h++){const g=f[h];g.onLoad&&g.onLoad(d)}}).catch(d=>{const f=Tn[e];if(f===void 0)throw this.manager.itemError(e),d;delete Tn[e];for(let h=0,p=f.length;h<p;h++){const g=f[h];g.onError&&g.onError(d)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class u_ extends Ca{constructor(e){super(e)}load(e,t,n,r){const s=this,o=new jg,a=new c_(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(e,function(l){let d;try{d=s.parse(l)}catch(f){if(r!==void 0)r(f);else{console.error(f);return}}d.image!==void 0?o.image=d.image:d.data!==void 0&&(o.image.width=d.width,o.image.height=d.height,o.image.data=d.data),o.wrapS=d.wrapS!==void 0?d.wrapS:bn,o.wrapT=d.wrapT!==void 0?d.wrapT:bn,o.magFilter=d.magFilter!==void 0?d.magFilter:Ft,o.minFilter=d.minFilter!==void 0?d.minFilter:Ft,o.anisotropy=d.anisotropy!==void 0?d.anisotropy:1,d.colorSpace!==void 0&&(o.colorSpace=d.colorSpace),d.flipY!==void 0&&(o.flipY=d.flipY),d.format!==void 0&&(o.format=d.format),d.type!==void 0&&(o.type=d.type),d.mipmaps!==void 0&&(o.mipmaps=d.mipmaps,o.minFilter=Wn),d.mipmapCount===1&&(o.minFilter=Ft),d.generateMipmaps!==void 0&&(o.generateMipmaps=d.generateMipmaps),o.needsUpdate=!0,t&&t(o,d)},n,r),o}}class Eu extends vu{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=d*this.view.offsetX,o=s+d*this.view.width,a-=f*this.view.offsetY,l=a-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class d_ extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class f_{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=lc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=lc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function lc(){return performance.now()}function cc(i,e,t,n){const r=h_(n);switch(t){case su:return i*e;case va:return i*e/r.components*r.byteLength;case xa:return i*e/r.components*r.byteLength;case au:return i*e*2/r.components*r.byteLength;case Sa:return i*e*2/r.components*r.byteLength;case ou:return i*e*3/r.components*r.byteLength;case jt:return i*e*4/r.components*r.byteLength;case ya:return i*e*4/r.components*r.byteLength;case ss:case os:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case as:case ls:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Do:case Lo:return Math.max(i,16)*Math.max(e,8)/4;case Io:case Uo:return Math.max(i,8)*Math.max(e,8)/2;case No:case Fo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Oo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Bo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case zo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Vo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ko:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Go:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Wo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case $o:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Xo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case qo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Yo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ko:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Zo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Jo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case cs:case Qo:case jo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case lu:case ea:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ta:case na:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function h_(i){switch(i){case Un:case nu:return{byteLength:1,components:1};case dr:case iu:case $t:return{byteLength:2,components:1};case ga:case _a:return{byteLength:2,components:4};case fi:case ma:case Qt:return{byteLength:4,components:1};case ru:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pa);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Mu(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function p_(i){const e=new WeakMap;function t(a,l){const d=a.array,f=a.usage,h=d.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,d,f),a.onUploadCallback();let g;if(d instanceof Float32Array)g=i.FLOAT;else if(d instanceof Uint16Array)a.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)g=i.SHORT;else if(d instanceof Uint32Array)g=i.UNSIGNED_INT;else if(d instanceof Int32Array)g=i.INT;else if(d instanceof Int8Array)g=i.BYTE;else if(d instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:p,type:g,bytesPerElement:d.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,d){const f=l.array,h=l.updateRanges;if(i.bindBuffer(d,a),h.length===0)i.bufferSubData(d,0,f);else{h.sort((g,S)=>g.start-S.start);let p=0;for(let g=1;g<h.length;g++){const S=h[p],E=h[g];E.start<=S.start+S.count+1?S.count=Math.max(S.count,E.start+E.count-S.start):(++p,h[p]=E)}h.length=p+1;for(let g=0,S=h.length;g<S;g++){const E=h[g];i.bufferSubData(d,E.start*f.BYTES_PER_ELEMENT,f,E.start,E.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const f=e.get(a);(!f||f.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const d=e.get(a);if(d===void 0)e.set(a,t(a,l));else if(d.version<a.version){if(d.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(d.buffer,a,l),d.version=a.version}}return{get:r,remove:s,update:o}}var m_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,g_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,__=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,v_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,x_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,S_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,y_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,E_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,M_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,T_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,A_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,C_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,w_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,R_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,b_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,P_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,I_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,D_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,U_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,L_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,N_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,F_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,O_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,B_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,z_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,V_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,k_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,H_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,G_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,W_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$_="gl_FragColor = linearToOutputTexel( gl_FragColor );",X_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,q_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Y_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,K_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Z_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,J_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Q_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,j_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ev=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,iv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ov=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,av=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,lv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,hv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,pv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,mv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,gv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_v=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ev=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Tv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Av=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Rv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Iv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Uv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Lv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ov=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Bv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,kv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Gv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Wv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$v=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Kv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Jv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Qv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,jv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,e0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,t0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,n0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,i0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,r0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,s0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,o0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,a0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,l0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,c0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,u0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,d0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,f0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,h0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const p0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,m0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,v0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,x0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,y0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,E0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,M0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,T0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,A0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,C0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,w0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,R0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,b0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,U0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,N0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,F0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,O0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,z0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,V0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,k0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,H0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,G0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,W0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,X0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,q0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:m_,alphahash_pars_fragment:g_,alphamap_fragment:__,alphamap_pars_fragment:v_,alphatest_fragment:x_,alphatest_pars_fragment:S_,aomap_fragment:y_,aomap_pars_fragment:E_,batching_pars_vertex:M_,batching_vertex:T_,begin_vertex:A_,beginnormal_vertex:C_,bsdfs:w_,iridescence_fragment:R_,bumpmap_pars_fragment:b_,clipping_planes_fragment:P_,clipping_planes_pars_fragment:I_,clipping_planes_pars_vertex:D_,clipping_planes_vertex:U_,color_fragment:L_,color_pars_fragment:N_,color_pars_vertex:F_,color_vertex:O_,common:B_,cube_uv_reflection_fragment:z_,defaultnormal_vertex:V_,displacementmap_pars_vertex:k_,displacementmap_vertex:H_,emissivemap_fragment:G_,emissivemap_pars_fragment:W_,colorspace_fragment:$_,colorspace_pars_fragment:X_,envmap_fragment:q_,envmap_common_pars_fragment:Y_,envmap_pars_fragment:K_,envmap_pars_vertex:Z_,envmap_physical_pars_fragment:av,envmap_vertex:J_,fog_vertex:Q_,fog_pars_vertex:j_,fog_fragment:ev,fog_pars_fragment:tv,gradientmap_pars_fragment:nv,lightmap_pars_fragment:iv,lights_lambert_fragment:rv,lights_lambert_pars_fragment:sv,lights_pars_begin:ov,lights_toon_fragment:lv,lights_toon_pars_fragment:cv,lights_phong_fragment:uv,lights_phong_pars_fragment:dv,lights_physical_fragment:fv,lights_physical_pars_fragment:hv,lights_fragment_begin:pv,lights_fragment_maps:mv,lights_fragment_end:gv,logdepthbuf_fragment:_v,logdepthbuf_pars_fragment:vv,logdepthbuf_pars_vertex:xv,logdepthbuf_vertex:Sv,map_fragment:yv,map_pars_fragment:Ev,map_particle_fragment:Mv,map_particle_pars_fragment:Tv,metalnessmap_fragment:Av,metalnessmap_pars_fragment:Cv,morphinstance_vertex:wv,morphcolor_vertex:Rv,morphnormal_vertex:bv,morphtarget_pars_vertex:Pv,morphtarget_vertex:Iv,normal_fragment_begin:Dv,normal_fragment_maps:Uv,normal_pars_fragment:Lv,normal_pars_vertex:Nv,normal_vertex:Fv,normalmap_pars_fragment:Ov,clearcoat_normal_fragment_begin:Bv,clearcoat_normal_fragment_maps:zv,clearcoat_pars_fragment:Vv,iridescence_pars_fragment:kv,opaque_fragment:Hv,packing:Gv,premultiplied_alpha_fragment:Wv,project_vertex:$v,dithering_fragment:Xv,dithering_pars_fragment:qv,roughnessmap_fragment:Yv,roughnessmap_pars_fragment:Kv,shadowmap_pars_fragment:Zv,shadowmap_pars_vertex:Jv,shadowmap_vertex:Qv,shadowmask_pars_fragment:jv,skinbase_vertex:e0,skinning_pars_vertex:t0,skinning_vertex:n0,skinnormal_vertex:i0,specularmap_fragment:r0,specularmap_pars_fragment:s0,tonemapping_fragment:o0,tonemapping_pars_fragment:a0,transmission_fragment:l0,transmission_pars_fragment:c0,uv_pars_fragment:u0,uv_pars_vertex:d0,uv_vertex:f0,worldpos_vertex:h0,background_vert:p0,background_frag:m0,backgroundCube_vert:g0,backgroundCube_frag:_0,cube_vert:v0,cube_frag:x0,depth_vert:S0,depth_frag:y0,distanceRGBA_vert:E0,distanceRGBA_frag:M0,equirect_vert:T0,equirect_frag:A0,linedashed_vert:C0,linedashed_frag:w0,meshbasic_vert:R0,meshbasic_frag:b0,meshlambert_vert:P0,meshlambert_frag:I0,meshmatcap_vert:D0,meshmatcap_frag:U0,meshnormal_vert:L0,meshnormal_frag:N0,meshphong_vert:F0,meshphong_frag:O0,meshphysical_vert:B0,meshphysical_frag:z0,meshtoon_vert:V0,meshtoon_frag:k0,points_vert:H0,points_frag:G0,shadow_vert:W0,shadow_frag:$0,sprite_vert:X0,sprite_frag:q0},xe={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},mn={basic:{uniforms:Nt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Nt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new it(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Nt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Nt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Nt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new it(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Nt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Nt([xe.points,xe.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Nt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Nt([xe.common,xe.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Nt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Nt([xe.sprite,xe.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Nt([xe.common,xe.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Nt([xe.lights,xe.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};mn.physical={uniforms:Nt([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Jr={r:0,b:0,g:0},ii=new hn,Y0=new St;function K0(i,e,t,n,r,s,o){const a=new it(0);let l=s===!0?0:1,d,f,h=null,p=0,g=null;function S(w){let T=w.isScene===!0?w.background:null;return T&&T.isTexture&&(T=(w.backgroundBlurriness>0?t:e).get(T)),T}function E(w){let T=!1;const z=S(w);z===null?m(a,l):z&&z.isColor&&(m(z,1),T=!0);const F=i.xr.getEnvironmentBlendMode();F==="additive"?n.buffers.color.setClear(0,0,0,1,o):F==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||T)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(w,T){const z=S(T);z&&(z.isCubeTexture||z.mapping===Rs)?(f===void 0&&(f=new en(new Er(1,1,1),new Ot({name:"BackgroundCubeMaterial",uniforms:Vi(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Bt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(F,N,V){this.matrixWorld.copyPosition(V.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),ii.copy(T.backgroundRotation),ii.x*=-1,ii.y*=-1,ii.z*=-1,z.isCubeTexture&&z.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),f.material.uniforms.envMap.value=z,f.material.uniforms.flipEnvMap.value=z.isCubeTexture&&z.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(Y0.makeRotationFromEuler(ii)),f.material.toneMapped=ot.getTransfer(z.colorSpace)!==ut,(h!==z||p!==z.version||g!==i.toneMapping)&&(f.material.needsUpdate=!0,h=z,p=z.version,g=i.toneMapping),f.layers.enableAll(),w.unshift(f,f.geometry,f.material,0,0,null)):z&&z.isTexture&&(d===void 0&&(d=new en(new bs(2,2),new Ot({name:"BackgroundMaterial",uniforms:Vi(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(d)),d.material.uniforms.t2D.value=z,d.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,d.material.toneMapped=ot.getTransfer(z.colorSpace)!==ut,z.matrixAutoUpdate===!0&&z.updateMatrix(),d.material.uniforms.uvTransform.value.copy(z.matrix),(h!==z||p!==z.version||g!==i.toneMapping)&&(d.material.needsUpdate=!0,h=z,p=z.version,g=i.toneMapping),d.layers.enableAll(),w.unshift(d,d.geometry,d.material,0,0,null))}function m(w,T){w.getRGB(Jr,_u(i)),n.buffers.color.setClear(Jr.r,Jr.g,Jr.b,T,o)}function P(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,T=1){a.set(w),l=T,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,m(a,l)},render:E,addToRenderList:x,dispose:P}}function Z0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=p(null);let s=r,o=!1;function a(M,O,Z,Y,ie){let le=!1;const ee=h(Y,Z,O);s!==ee&&(s=ee,d(s.object)),le=g(M,Y,Z,ie),le&&S(M,Y,Z,ie),ie!==null&&e.update(ie,i.ELEMENT_ARRAY_BUFFER),(le||o)&&(o=!1,T(M,O,Z,Y),ie!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(ie).buffer))}function l(){return i.createVertexArray()}function d(M){return i.bindVertexArray(M)}function f(M){return i.deleteVertexArray(M)}function h(M,O,Z){const Y=Z.wireframe===!0;let ie=n[M.id];ie===void 0&&(ie={},n[M.id]=ie);let le=ie[O.id];le===void 0&&(le={},ie[O.id]=le);let ee=le[Y];return ee===void 0&&(ee=p(l()),le[Y]=ee),ee}function p(M){const O=[],Z=[],Y=[];for(let ie=0;ie<t;ie++)O[ie]=0,Z[ie]=0,Y[ie]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:Z,attributeDivisors:Y,object:M,attributes:{},index:null}}function g(M,O,Z,Y){const ie=s.attributes,le=O.attributes;let ee=0;const ce=Z.getAttributes();for(const Q in ce)if(ce[Q].location>=0){const ve=ie[Q];let be=le[Q];if(be===void 0&&(Q==="instanceMatrix"&&M.instanceMatrix&&(be=M.instanceMatrix),Q==="instanceColor"&&M.instanceColor&&(be=M.instanceColor)),ve===void 0||ve.attribute!==be||be&&ve.data!==be.data)return!0;ee++}return s.attributesNum!==ee||s.index!==Y}function S(M,O,Z,Y){const ie={},le=O.attributes;let ee=0;const ce=Z.getAttributes();for(const Q in ce)if(ce[Q].location>=0){let ve=le[Q];ve===void 0&&(Q==="instanceMatrix"&&M.instanceMatrix&&(ve=M.instanceMatrix),Q==="instanceColor"&&M.instanceColor&&(ve=M.instanceColor));const be={};be.attribute=ve,ve&&ve.data&&(be.data=ve.data),ie[Q]=be,ee++}s.attributes=ie,s.attributesNum=ee,s.index=Y}function E(){const M=s.newAttributes;for(let O=0,Z=M.length;O<Z;O++)M[O]=0}function x(M){m(M,0)}function m(M,O){const Z=s.newAttributes,Y=s.enabledAttributes,ie=s.attributeDivisors;Z[M]=1,Y[M]===0&&(i.enableVertexAttribArray(M),Y[M]=1),ie[M]!==O&&(i.vertexAttribDivisor(M,O),ie[M]=O)}function P(){const M=s.newAttributes,O=s.enabledAttributes;for(let Z=0,Y=O.length;Z<Y;Z++)O[Z]!==M[Z]&&(i.disableVertexAttribArray(Z),O[Z]=0)}function w(M,O,Z,Y,ie,le,ee){ee===!0?i.vertexAttribIPointer(M,O,Z,ie,le):i.vertexAttribPointer(M,O,Z,Y,ie,le)}function T(M,O,Z,Y){E();const ie=Y.attributes,le=Z.getAttributes(),ee=O.defaultAttributeValues;for(const ce in le){const Q=le[ce];if(Q.location>=0){let ge=ie[ce];if(ge===void 0&&(ce==="instanceMatrix"&&M.instanceMatrix&&(ge=M.instanceMatrix),ce==="instanceColor"&&M.instanceColor&&(ge=M.instanceColor)),ge!==void 0){const ve=ge.normalized,be=ge.itemSize,Ve=e.get(ge);if(Ve===void 0)continue;const Je=Ve.buffer,j=Ve.type,pe=Ve.bytesPerElement,me=j===i.INT||j===i.UNSIGNED_INT||ge.gpuType===ma;if(ge.isInterleavedBufferAttribute){const _e=ge.data,Pe=_e.stride,Qe=ge.offset;if(_e.isInstancedInterleavedBuffer){for(let ke=0;ke<Q.locationSize;ke++)m(Q.location+ke,_e.meshPerAttribute);M.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let ke=0;ke<Q.locationSize;ke++)x(Q.location+ke);i.bindBuffer(i.ARRAY_BUFFER,Je);for(let ke=0;ke<Q.locationSize;ke++)w(Q.location+ke,be/Q.locationSize,j,ve,Pe*pe,(Qe+be/Q.locationSize*ke)*pe,me)}else{if(ge.isInstancedBufferAttribute){for(let _e=0;_e<Q.locationSize;_e++)m(Q.location+_e,ge.meshPerAttribute);M.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let _e=0;_e<Q.locationSize;_e++)x(Q.location+_e);i.bindBuffer(i.ARRAY_BUFFER,Je);for(let _e=0;_e<Q.locationSize;_e++)w(Q.location+_e,be/Q.locationSize,j,ve,be*pe,be/Q.locationSize*_e*pe,me)}}else if(ee!==void 0){const ve=ee[ce];if(ve!==void 0)switch(ve.length){case 2:i.vertexAttrib2fv(Q.location,ve);break;case 3:i.vertexAttrib3fv(Q.location,ve);break;case 4:i.vertexAttrib4fv(Q.location,ve);break;default:i.vertexAttrib1fv(Q.location,ve)}}}}P()}function z(){V();for(const M in n){const O=n[M];for(const Z in O){const Y=O[Z];for(const ie in Y)f(Y[ie].object),delete Y[ie];delete O[Z]}delete n[M]}}function F(M){if(n[M.id]===void 0)return;const O=n[M.id];for(const Z in O){const Y=O[Z];for(const ie in Y)f(Y[ie].object),delete Y[ie];delete O[Z]}delete n[M.id]}function N(M){for(const O in n){const Z=n[O];if(Z[M.id]===void 0)continue;const Y=Z[M.id];for(const ie in Y)f(Y[ie].object),delete Y[ie];delete Z[M.id]}}function V(){R(),o=!0,s!==r&&(s=r,d(s.object))}function R(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:V,resetDefaultState:R,dispose:z,releaseStatesOfGeometry:F,releaseStatesOfProgram:N,initAttributes:E,enableAttribute:x,disableUnusedAttributes:P}}function J0(i,e,t){let n;function r(d){n=d}function s(d,f){i.drawArrays(n,d,f),t.update(f,n,1)}function o(d,f,h){h!==0&&(i.drawArraysInstanced(n,d,f,h),t.update(f,n,h))}function a(d,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,d,0,f,0,h);let g=0;for(let S=0;S<h;S++)g+=f[S];t.update(g,n,1)}function l(d,f,h,p){if(h===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let S=0;S<d.length;S++)o(d[S],f[S],p[S]);else{g.multiDrawArraysInstancedWEBGL(n,d,0,f,0,p,0,h);let S=0;for(let E=0;E<h;E++)S+=f[E]*p[E];t.update(S,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Q0(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const N=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(N){return!(N!==jt&&n.convert(N)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(N){const V=N===$t&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(N!==Un&&n.convert(N)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==Qt&&!V)}function l(N){if(N==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=t.precision!==void 0?t.precision:"highp";const f=l(d);f!==d&&(console.warn("THREE.WebGLRenderer:",d,"not supported, using",f,"instead."),d=f);const h=t.logarithmicDepthBuffer===!0,p=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),S=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),P=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),z=S>0,F=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:d,logarithmicDepthBuffer:h,reverseDepthBuffer:p,maxTextures:g,maxVertexTextures:S,maxTextureSize:E,maxCubemapSize:x,maxAttributes:m,maxVertexUniforms:P,maxVaryings:w,maxFragmentUniforms:T,vertexTextures:z,maxSamples:F}}function j0(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new si,a=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,p){const g=h.length!==0||p||n!==0||r;return r=p,n=h.length,g},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,p){t=f(h,p,0)},this.setState=function(h,p,g){const S=h.clippingPlanes,E=h.clipIntersection,x=h.clipShadows,m=i.get(h);if(!r||S===null||S.length===0||s&&!x)s?f(null):d();else{const P=s?0:n,w=P*4;let T=m.clippingState||null;l.value=T,T=f(S,p,w,g);for(let z=0;z!==w;++z)T[z]=t[z];m.clippingState=T,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=P}};function d(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function f(h,p,g,S){const E=h!==null?h.length:0;let x=null;if(E!==0){if(x=l.value,S!==!0||x===null){const m=g+E*4,P=p.matrixWorldInverse;a.getNormalMatrix(P),(x===null||x.length<m)&&(x=new Float32Array(m));for(let w=0,T=g;w!==E;++w,T+=4)o.copy(h[w]).applyMatrix4(P,a),o.normal.toArray(x,T),x[T+3]=o.constant}l.value=x,l.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,x}}function ex(i){let e=new WeakMap;function t(o,a){return a===vs?o.mapping=Bi:a===Ro&&(o.mapping=zi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===vs||a===Ro)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const d=new Zg(l.height);return d.fromEquirectangularTexture(i,o),e.set(o,d),o.addEventListener("dispose",r),t(d.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Ii=4,uc=[.125,.215,.35,.446,.526,.582],li=20,ro=new Eu,dc=new it;let so=null,oo=0,ao=0,lo=!1;const oi=(1+Math.sqrt(5))/2,Ri=1/oi,fc=[new $(-oi,Ri,0),new $(oi,Ri,0),new $(-Ri,0,oi),new $(Ri,0,oi),new $(0,oi,-Ri),new $(0,oi,Ri),new $(-1,1,-1),new $(1,1,-1),new $(-1,1,1),new $(1,1,1)],tx=new $;class sa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100,s={}){const{size:o=256,position:a=tx}=s;so=this._renderer.getRenderTarget(),oo=this._renderer.getActiveCubeFace(),ao=this._renderer.getActiveMipmapLevel(),lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(so,oo,ao),this._renderer.xr.enabled=lo,e.scissorTest=!1,Qr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bi||e.mapping===zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),so=this._renderer.getRenderTarget(),oo=this._renderer.getActiveCubeFace(),ao=this._renderer.getActiveMipmapLevel(),lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ft,minFilter:Ft,generateMipmaps:!1,type:$t,format:jt,colorSpace:Yn,depthBuffer:!1},r=hc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hc(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=nx(s)),this._blurMaterial=ix(s,e,t)}return r}_compileMaterial(e){const t=new en(this._lodPlanes[0],e);this._renderer.compile(t,ro)}_sceneToCubeUV(e,t,n,r,s){const l=new Zt(90,1,t,n),d=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],h=this._renderer,p=h.autoClear,g=h.toneMapping;h.getClearColor(dc),h.toneMapping=Xn,h.autoClear=!1;const S=new Ta({name:"PMREM.Background",side:Bt,depthWrite:!1,depthTest:!1}),E=new en(new Er,S);let x=!1;const m=e.background;m?m.isColor&&(S.color.copy(m),e.background=null,x=!0):(S.color.copy(dc),x=!0);for(let P=0;P<6;P++){const w=P%3;w===0?(l.up.set(0,d[P],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[P],s.y,s.z)):w===1?(l.up.set(0,0,d[P]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[P],s.z)):(l.up.set(0,d[P],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[P]));const T=this._cubeSize;Qr(r,w*T,P>2?T:0,T,T),h.setRenderTarget(r),x&&h.render(E,l),h.render(e,l)}E.geometry.dispose(),E.material.dispose(),h.toneMapping=g,h.autoClear=p,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Bi||e.mapping===zi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pc());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new en(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Qr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,ro)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=fc[(r-s-1)%fc.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const l=this._renderer,d=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,h=new en(this._lodPlanes[r],d),p=d.uniforms,g=this._sizeLods[n]-1,S=isFinite(s)?Math.PI/(2*g):2*Math.PI/(2*li-1),E=s/S,x=isFinite(s)?1+Math.floor(f*E):li;x>li&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${li}`);const m=[];let P=0;for(let N=0;N<li;++N){const V=N/E,R=Math.exp(-V*V/2);m.push(R),N===0?P+=R:N<x&&(P+=2*R)}for(let N=0;N<m.length;N++)m[N]=m[N]/P;p.envMap.value=e.texture,p.samples.value=x,p.weights.value=m,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:w}=this;p.dTheta.value=S,p.mipInt.value=w-n;const T=this._sizeLods[r],z=3*T*(r>w-Ii?r-w+Ii:0),F=4*(this._cubeSize-T);Qr(t,z,F,3*T,2*T),l.setRenderTarget(t),l.render(h,ro)}}function nx(i){const e=[],t=[],n=[];let r=i;const s=i-Ii+1+uc.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>i-Ii?l=uc[o-i+Ii-1]:o===0&&(l=0),n.push(l);const d=1/(a-2),f=-d,h=1+d,p=[f,f,h,f,h,h,f,f,h,h,f,h],g=6,S=6,E=3,x=2,m=1,P=new Float32Array(E*S*g),w=new Float32Array(x*S*g),T=new Float32Array(m*S*g);for(let F=0;F<g;F++){const N=F%3*2/3-1,V=F>2?0:-1,R=[N,V,0,N+2/3,V,0,N+2/3,V+1,0,N,V,0,N+2/3,V+1,0,N,V+1,0];P.set(R,E*S*F),w.set(p,x*S*F);const M=[F,F,F,F,F,F];T.set(M,m*S*F)}const z=new Ln;z.setAttribute("position",new gn(P,E)),z.setAttribute("uv",new gn(w,x)),z.setAttribute("faceIndex",new gn(T,m)),e.push(z),r>Ii&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function hc(i,e,t){const n=new fn(i,e,t);return n.texture.mapping=Rs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function ix(i,e,t){const n=new Float32Array(li),r=new $(0,1,0);return new Ot({name:"SphericalGaussianBlur",defines:{n:li,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function pc(){return new Ot({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function mc(){return new Ot({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:In,depthTest:!1,depthWrite:!1})}function wa(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function rx(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,d=l===vs||l===Ro,f=l===Bi||l===zi;if(d||f){let h=e.get(a);const p=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return t===null&&(t=new sa(i)),h=d?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const g=a.image;return d&&g&&g.height>0||f&&g&&r(g)?(t===null&&(t=new sa(i)),h=d?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let l=0;const d=6;for(let f=0;f<d;f++)a[f]!==void 0&&l++;return l===d}function s(a){const l=a.target;l.removeEventListener("dispose",s);const d=e.get(l);d!==void 0&&(e.delete(l),d.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function sx(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&us("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function ox(i,e,t,n){const r={},s=new WeakMap;function o(h){const p=h.target;p.index!==null&&e.remove(p.index);for(const S in p.attributes)e.remove(p.attributes[S]);p.removeEventListener("dispose",o),delete r[p.id];const g=s.get(p);g&&(e.remove(g),s.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function a(h,p){return r[p.id]===!0||(p.addEventListener("dispose",o),r[p.id]=!0,t.memory.geometries++),p}function l(h){const p=h.attributes;for(const g in p)e.update(p[g],i.ARRAY_BUFFER)}function d(h){const p=[],g=h.index,S=h.attributes.position;let E=0;if(g!==null){const P=g.array;E=g.version;for(let w=0,T=P.length;w<T;w+=3){const z=P[w+0],F=P[w+1],N=P[w+2];p.push(z,F,F,N,N,z)}}else if(S!==void 0){const P=S.array;E=S.version;for(let w=0,T=P.length/3-1;w<T;w+=3){const z=w+0,F=w+1,N=w+2;p.push(z,F,F,N,N,z)}}else return;const x=new(du(p)?gu:mu)(p,1);x.version=E;const m=s.get(h);m&&e.remove(m),s.set(h,x)}function f(h){const p=s.get(h);if(p){const g=h.index;g!==null&&p.version<g.version&&d(h)}else d(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:f}}function ax(i,e,t){let n;function r(p){n=p}let s,o;function a(p){s=p.type,o=p.bytesPerElement}function l(p,g){i.drawElements(n,g,s,p*o),t.update(g,n,1)}function d(p,g,S){S!==0&&(i.drawElementsInstanced(n,g,s,p*o,S),t.update(g,n,S))}function f(p,g,S){if(S===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,g,0,s,p,0,S);let x=0;for(let m=0;m<S;m++)x+=g[m];t.update(x,n,1)}function h(p,g,S,E){if(S===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let m=0;m<p.length;m++)d(p[m]/o,g[m],E[m]);else{x.multiDrawElementsInstancedWEBGL(n,g,0,s,p,0,E,0,S);let m=0;for(let P=0;P<S;P++)m+=g[P]*E[P];t.update(m,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=d,this.renderMultiDraw=f,this.renderMultiDrawInstances=h}function lx(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function cx(i,e,t){const n=new WeakMap,r=new gt;function s(o,a,l){const d=o.morphTargetInfluences,f=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=f!==void 0?f.length:0;let p=n.get(a);if(p===void 0||p.count!==h){let M=function(){V.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var g=M;p!==void 0&&p.texture.dispose();const S=a.morphAttributes.position!==void 0,E=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],P=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let T=0;S===!0&&(T=1),E===!0&&(T=2),x===!0&&(T=3);let z=a.attributes.position.count*T,F=1;z>e.maxTextureSize&&(F=Math.ceil(z/e.maxTextureSize),z=e.maxTextureSize);const N=new Float32Array(z*F*4*h),V=new fu(N,z,F,h);V.type=Qt,V.needsUpdate=!0;const R=T*4;for(let O=0;O<h;O++){const Z=m[O],Y=P[O],ie=w[O],le=z*F*4*O;for(let ee=0;ee<Z.count;ee++){const ce=ee*R;S===!0&&(r.fromBufferAttribute(Z,ee),N[le+ce+0]=r.x,N[le+ce+1]=r.y,N[le+ce+2]=r.z,N[le+ce+3]=0),E===!0&&(r.fromBufferAttribute(Y,ee),N[le+ce+4]=r.x,N[le+ce+5]=r.y,N[le+ce+6]=r.z,N[le+ce+7]=0),x===!0&&(r.fromBufferAttribute(ie,ee),N[le+ce+8]=r.x,N[le+ce+9]=r.y,N[le+ce+10]=r.z,N[le+ce+11]=ie.itemSize===4?r.w:1)}}p={count:h,texture:V,size:new Ge(z,F)},n.set(a,p),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let S=0;for(let x=0;x<d.length;x++)S+=d[x];const E=a.morphTargetsRelative?1:1-S;l.getUniforms().setValue(i,"morphTargetBaseInfluence",E),l.getUniforms().setValue(i,"morphTargetInfluences",d)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:s}}function ux(i,e,t,n){let r=new WeakMap;function s(l){const d=n.render.frame,f=l.geometry,h=e.get(l,f);if(r.get(h)!==d&&(e.update(h),r.set(h,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==d&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==d&&(p.update(),r.set(p,d))}return h}function o(){r=new WeakMap}function a(l){const d=l.target;d.removeEventListener("dispose",a),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:s,dispose:o}}const Tu=new zt,gc=new yu(1,1),Au=new fu,Cu=new Pg,wu=new xu,_c=[],vc=[],xc=new Float32Array(16),Sc=new Float32Array(9),yc=new Float32Array(4);function $i(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=_c[r];if(s===void 0&&(s=new Float32Array(r),_c[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function Mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Tt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ps(i,e){let t=vc[e];t===void 0&&(t=new Int32Array(e),vc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function dx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function fx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2fv(this.addr,e),Tt(t,e)}}function hx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;i.uniform3fv(this.addr,e),Tt(t,e)}}function px(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4fv(this.addr,e),Tt(t,e)}}function mx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Mt(t,n))return;yc.set(n),i.uniformMatrix2fv(this.addr,!1,yc),Tt(t,n)}}function gx(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Mt(t,n))return;Sc.set(n),i.uniformMatrix3fv(this.addr,!1,Sc),Tt(t,n)}}function _x(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Mt(t,n))return;xc.set(n),i.uniformMatrix4fv(this.addr,!1,xc),Tt(t,n)}}function vx(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function xx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2iv(this.addr,e),Tt(t,e)}}function Sx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3iv(this.addr,e),Tt(t,e)}}function yx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4iv(this.addr,e),Tt(t,e)}}function Ex(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Mx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2uiv(this.addr,e),Tt(t,e)}}function Tx(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3uiv(this.addr,e),Tt(t,e)}}function Ax(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4uiv(this.addr,e),Tt(t,e)}}function Cx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(gc.compareFunction=uu,s=gc):s=Tu,t.setTexture2D(e||s,r)}function wx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Cu,r)}function Rx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||wu,r)}function bx(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Au,r)}function Px(i){switch(i){case 5126:return dx;case 35664:return fx;case 35665:return hx;case 35666:return px;case 35674:return mx;case 35675:return gx;case 35676:return _x;case 5124:case 35670:return vx;case 35667:case 35671:return xx;case 35668:case 35672:return Sx;case 35669:case 35673:return yx;case 5125:return Ex;case 36294:return Mx;case 36295:return Tx;case 36296:return Ax;case 35678:case 36198:case 36298:case 36306:case 35682:return Cx;case 35679:case 36299:case 36307:return wx;case 35680:case 36300:case 36308:case 36293:return Rx;case 36289:case 36303:case 36311:case 36292:return bx}}function Ix(i,e){i.uniform1fv(this.addr,e)}function Dx(i,e){const t=$i(e,this.size,2);i.uniform2fv(this.addr,t)}function Ux(i,e){const t=$i(e,this.size,3);i.uniform3fv(this.addr,t)}function Lx(i,e){const t=$i(e,this.size,4);i.uniform4fv(this.addr,t)}function Nx(i,e){const t=$i(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Fx(i,e){const t=$i(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Ox(i,e){const t=$i(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Bx(i,e){i.uniform1iv(this.addr,e)}function zx(i,e){i.uniform2iv(this.addr,e)}function Vx(i,e){i.uniform3iv(this.addr,e)}function kx(i,e){i.uniform4iv(this.addr,e)}function Hx(i,e){i.uniform1uiv(this.addr,e)}function Gx(i,e){i.uniform2uiv(this.addr,e)}function Wx(i,e){i.uniform3uiv(this.addr,e)}function $x(i,e){i.uniform4uiv(this.addr,e)}function Xx(i,e,t){const n=this.cache,r=e.length,s=Ps(t,r);Mt(n,s)||(i.uniform1iv(this.addr,s),Tt(n,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Tu,s[o])}function qx(i,e,t){const n=this.cache,r=e.length,s=Ps(t,r);Mt(n,s)||(i.uniform1iv(this.addr,s),Tt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Cu,s[o])}function Yx(i,e,t){const n=this.cache,r=e.length,s=Ps(t,r);Mt(n,s)||(i.uniform1iv(this.addr,s),Tt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||wu,s[o])}function Kx(i,e,t){const n=this.cache,r=e.length,s=Ps(t,r);Mt(n,s)||(i.uniform1iv(this.addr,s),Tt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Au,s[o])}function Zx(i){switch(i){case 5126:return Ix;case 35664:return Dx;case 35665:return Ux;case 35666:return Lx;case 35674:return Nx;case 35675:return Fx;case 35676:return Ox;case 5124:case 35670:return Bx;case 35667:case 35671:return zx;case 35668:case 35672:return Vx;case 35669:case 35673:return kx;case 5125:return Hx;case 36294:return Gx;case 36295:return Wx;case 36296:return $x;case 35678:case 36198:case 36298:case 36306:case 35682:return Xx;case 35679:case 36299:case 36307:return qx;case 35680:case 36300:case 36308:case 36293:return Yx;case 36289:case 36303:case 36311:case 36292:return Kx}}class Jx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Px(t.type)}}class Qx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Zx(t.type)}}class jx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const co=/(\w+)(\])?(\[|\.)?/g;function Ec(i,e){i.seq.push(e),i.map[e.id]=e}function eS(i,e,t){const n=i.name,r=n.length;for(co.lastIndex=0;;){const s=co.exec(n),o=co.lastIndex;let a=s[1];const l=s[2]==="]",d=s[3];if(l&&(a=a|0),d===void 0||d==="["&&o+2===r){Ec(t,d===void 0?new Jx(a,i,e):new Qx(a,i,e));break}else{let h=t.map[a];h===void 0&&(h=new jx(a),Ec(t,h)),t=h}}}class ds{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);eS(s,o,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function Mc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const tS=37297;let nS=0;function iS(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Tc=new Ye;function rS(i){ot._getMatrix(Tc,ot.workingColorSpace,i);const e=`mat3( ${Tc.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(i)){case xs:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ac(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+iS(i.getShaderSource(e),o)}else return r}function sS(i,e){const t=rS(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function oS(i,e){let t;switch(e){case ng:t="Linear";break;case ig:t="Reinhard";break;case rg:t="Cineon";break;case sg:t="ACESFilmic";break;case ag:t="AgX";break;case lg:t="Neutral";break;case og:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const jr=new $;function aS(){ot.getLuminanceCoefficients(jr);const i=jr.x.toFixed(4),e=jr.y.toFixed(4),t=jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lS(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nr).join(`
`)}function cS(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function uS(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function nr(i){return i!==""}function Cc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const dS=/^[ \t]*#include +<([\w\d./]+)>/gm;function oa(i){return i.replace(dS,hS)}const fS=new Map;function hS(i,e){let t=Ze[e];if(t===void 0){const n=fS.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return oa(t)}const pS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rc(i){return i.replace(pS,mS)}function mS(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function bc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function gS(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===jc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Nm?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===An&&(e="SHADOWMAP_TYPE_VSM"),e}function _S(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Bi:case zi:e="ENVMAP_TYPE_CUBE";break;case Rs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function vS(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case zi:e="ENVMAP_MODE_REFRACTION";break}return e}function xS(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case eu:e="ENVMAP_BLENDING_MULTIPLY";break;case eg:e="ENVMAP_BLENDING_MIX";break;case tg:e="ENVMAP_BLENDING_ADD";break}return e}function SS(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function yS(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=gS(t),d=_S(t),f=vS(t),h=xS(t),p=SS(t),g=lS(t),S=cS(s),E=r.createProgram();let x,m,P=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S].filter(nr).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S].filter(nr).join(`
`),m.length>0&&(m+=`
`)):(x=[bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nr).join(`
`),m=[bc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,S,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",t.envMap?"#define "+h:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?Ze.tonemapping_pars_fragment:"",t.toneMapping!==Xn?oS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,sS("linearToOutputTexel",t.outputColorSpace),aS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(nr).join(`
`)),o=oa(o),o=Cc(o,t),o=wc(o,t),a=oa(a),a=Cc(a,t),a=wc(a,t),o=Rc(o),a=Rc(a),t.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,x=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",t.glslVersion===ia?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ia?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const w=P+x+o,T=P+m+a,z=Mc(r,r.VERTEX_SHADER,w),F=Mc(r,r.FRAGMENT_SHADER,T);r.attachShader(E,z),r.attachShader(E,F),t.index0AttributeName!==void 0?r.bindAttribLocation(E,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(E,0,"position"),r.linkProgram(E);function N(O){if(i.debug.checkShaderErrors){const Z=r.getProgramInfoLog(E).trim(),Y=r.getShaderInfoLog(z).trim(),ie=r.getShaderInfoLog(F).trim();let le=!0,ee=!0;if(r.getProgramParameter(E,r.LINK_STATUS)===!1)if(le=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,E,z,F);else{const ce=Ac(r,z,"vertex"),Q=Ac(r,F,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(E,r.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+Z+`
`+ce+`
`+Q)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(Y===""||ie==="")&&(ee=!1);ee&&(O.diagnostics={runnable:le,programLog:Z,vertexShader:{log:Y,prefix:x},fragmentShader:{log:ie,prefix:m}})}r.deleteShader(z),r.deleteShader(F),V=new ds(r,E),R=uS(r,E)}let V;this.getUniforms=function(){return V===void 0&&N(this),V};let R;this.getAttributes=function(){return R===void 0&&N(this),R};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(E,tS)),M},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(E),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=nS++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=z,this.fragmentShader=F,this}let ES=0;class MS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new TS(e),t.set(e,n)),n}}class TS{constructor(e){this.id=ES++,this.code=e,this.usedTimes=0}}function AS(i,e,t,n,r,s,o){const a=new hu,l=new MS,d=new Set,f=[],h=r.logarithmicDepthBuffer,p=r.vertexTextures;let g=r.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(R){return d.add(R),R===0?"uv":`uv${R}`}function x(R,M,O,Z,Y){const ie=Z.fog,le=Y.geometry,ee=R.isMeshStandardMaterial?Z.environment:null,ce=(R.isMeshStandardMaterial?t:e).get(R.envMap||ee),Q=ce&&ce.mapping===Rs?ce.image.height:null,ge=S[R.type];R.precision!==null&&(g=r.getMaxPrecision(R.precision),g!==R.precision&&console.warn("THREE.WebGLProgram.getParameters:",R.precision,"not supported, using",g,"instead."));const ve=le.morphAttributes.position||le.morphAttributes.normal||le.morphAttributes.color,be=ve!==void 0?ve.length:0;let Ve=0;le.morphAttributes.position!==void 0&&(Ve=1),le.morphAttributes.normal!==void 0&&(Ve=2),le.morphAttributes.color!==void 0&&(Ve=3);let Je,j,pe,me;if(ge){const at=mn[ge];Je=at.vertexShader,j=at.fragmentShader}else Je=R.vertexShader,j=R.fragmentShader,l.update(R),pe=l.getVertexShaderID(R),me=l.getFragmentShaderID(R);const _e=i.getRenderTarget(),Pe=i.state.buffers.depth.getReversed(),Qe=Y.isInstancedMesh===!0,ke=Y.isBatchedMesh===!0,dt=!!R.map,ct=!!R.matcap,Ke=!!ce,B=!!R.aoMap,Lt=!!R.lightMap,tt=!!R.bumpMap,je=!!R.normalMap,Ne=!!R.displacementMap,ft=!!R.emissiveMap,Ue=!!R.metalnessMap,I=!!R.roughnessMap,y=R.anisotropy>0,X=R.clearcoat>0,re=R.dispersion>0,ue=R.iridescence>0,te=R.sheen>0,Ie=R.transmission>0,Se=y&&!!R.anisotropyMap,Fe=X&&!!R.clearcoatMap,He=X&&!!R.clearcoatNormalMap,fe=X&&!!R.clearcoatRoughnessMap,Te=ue&&!!R.iridescenceMap,Re=ue&&!!R.iridescenceThicknessMap,De=te&&!!R.sheenColorMap,Me=te&&!!R.sheenRoughnessMap,We=!!R.specularMap,Oe=!!R.specularColorMap,$e=!!R.specularIntensityMap,H=Ie&&!!R.transmissionMap,q=Ie&&!!R.thicknessMap,J=!!R.gradientMap,oe=!!R.alphaMap,Ee=R.alphaTest>0,ye=!!R.alphaHash,Xe=!!R.extensions;let mt=Xn;R.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(mt=i.toneMapping);const At={shaderID:ge,shaderType:R.type,shaderName:R.name,vertexShader:Je,fragmentShader:j,defines:R.defines,customVertexShaderID:pe,customFragmentShaderID:me,isRawShaderMaterial:R.isRawShaderMaterial===!0,glslVersion:R.glslVersion,precision:g,batching:ke,batchingColor:ke&&Y._colorsTexture!==null,instancing:Qe,instancingColor:Qe&&Y.instanceColor!==null,instancingMorph:Qe&&Y.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:_e===null?i.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:Yn,alphaToCoverage:!!R.alphaToCoverage,map:dt,matcap:ct,envMap:Ke,envMapMode:Ke&&ce.mapping,envMapCubeUVHeight:Q,aoMap:B,lightMap:Lt,bumpMap:tt,normalMap:je,displacementMap:p&&Ne,emissiveMap:ft,normalMapObjectSpace:je&&R.normalMapType===fg,normalMapTangentSpace:je&&R.normalMapType===cu,metalnessMap:Ue,roughnessMap:I,anisotropy:y,anisotropyMap:Se,clearcoat:X,clearcoatMap:Fe,clearcoatNormalMap:He,clearcoatRoughnessMap:fe,dispersion:re,iridescence:ue,iridescenceMap:Te,iridescenceThicknessMap:Re,sheen:te,sheenColorMap:De,sheenRoughnessMap:Me,specularMap:We,specularColorMap:Oe,specularIntensityMap:$e,transmission:Ie,transmissionMap:H,thicknessMap:q,gradientMap:J,opaque:R.transparent===!1&&R.blending===Ui&&R.alphaToCoverage===!1,alphaMap:oe,alphaTest:Ee,alphaHash:ye,combine:R.combine,mapUv:dt&&E(R.map.channel),aoMapUv:B&&E(R.aoMap.channel),lightMapUv:Lt&&E(R.lightMap.channel),bumpMapUv:tt&&E(R.bumpMap.channel),normalMapUv:je&&E(R.normalMap.channel),displacementMapUv:Ne&&E(R.displacementMap.channel),emissiveMapUv:ft&&E(R.emissiveMap.channel),metalnessMapUv:Ue&&E(R.metalnessMap.channel),roughnessMapUv:I&&E(R.roughnessMap.channel),anisotropyMapUv:Se&&E(R.anisotropyMap.channel),clearcoatMapUv:Fe&&E(R.clearcoatMap.channel),clearcoatNormalMapUv:He&&E(R.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:fe&&E(R.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&E(R.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&E(R.iridescenceThicknessMap.channel),sheenColorMapUv:De&&E(R.sheenColorMap.channel),sheenRoughnessMapUv:Me&&E(R.sheenRoughnessMap.channel),specularMapUv:We&&E(R.specularMap.channel),specularColorMapUv:Oe&&E(R.specularColorMap.channel),specularIntensityMapUv:$e&&E(R.specularIntensityMap.channel),transmissionMapUv:H&&E(R.transmissionMap.channel),thicknessMapUv:q&&E(R.thicknessMap.channel),alphaMapUv:oe&&E(R.alphaMap.channel),vertexTangents:!!le.attributes.tangent&&(je||y),vertexColors:R.vertexColors,vertexAlphas:R.vertexColors===!0&&!!le.attributes.color&&le.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!le.attributes.uv&&(dt||oe),fog:!!ie,useFog:R.fog===!0,fogExp2:!!ie&&ie.isFogExp2,flatShading:R.flatShading===!0,sizeAttenuation:R.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Pe,skinning:Y.isSkinnedMesh===!0,morphTargets:le.morphAttributes.position!==void 0,morphNormals:le.morphAttributes.normal!==void 0,morphColors:le.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:Ve,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:R.dithering,shadowMapEnabled:i.shadowMap.enabled&&O.length>0,shadowMapType:i.shadowMap.type,toneMapping:mt,decodeVideoTexture:dt&&R.map.isVideoTexture===!0&&ot.getTransfer(R.map.colorSpace)===ut,decodeVideoTextureEmissive:ft&&R.emissiveMap.isVideoTexture===!0&&ot.getTransfer(R.emissiveMap.colorSpace)===ut,premultipliedAlpha:R.premultipliedAlpha,doubleSided:R.side===Cn,flipSided:R.side===Bt,useDepthPacking:R.depthPacking>=0,depthPacking:R.depthPacking||0,index0AttributeName:R.index0AttributeName,extensionClipCullDistance:Xe&&R.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xe&&R.extensions.multiDraw===!0||ke)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:R.customProgramCacheKey()};return At.vertexUv1s=d.has(1),At.vertexUv2s=d.has(2),At.vertexUv3s=d.has(3),d.clear(),At}function m(R){const M=[];if(R.shaderID?M.push(R.shaderID):(M.push(R.customVertexShaderID),M.push(R.customFragmentShaderID)),R.defines!==void 0)for(const O in R.defines)M.push(O),M.push(R.defines[O]);return R.isRawShaderMaterial===!1&&(P(M,R),w(M,R),M.push(i.outputColorSpace)),M.push(R.customProgramCacheKey),M.join()}function P(R,M){R.push(M.precision),R.push(M.outputColorSpace),R.push(M.envMapMode),R.push(M.envMapCubeUVHeight),R.push(M.mapUv),R.push(M.alphaMapUv),R.push(M.lightMapUv),R.push(M.aoMapUv),R.push(M.bumpMapUv),R.push(M.normalMapUv),R.push(M.displacementMapUv),R.push(M.emissiveMapUv),R.push(M.metalnessMapUv),R.push(M.roughnessMapUv),R.push(M.anisotropyMapUv),R.push(M.clearcoatMapUv),R.push(M.clearcoatNormalMapUv),R.push(M.clearcoatRoughnessMapUv),R.push(M.iridescenceMapUv),R.push(M.iridescenceThicknessMapUv),R.push(M.sheenColorMapUv),R.push(M.sheenRoughnessMapUv),R.push(M.specularMapUv),R.push(M.specularColorMapUv),R.push(M.specularIntensityMapUv),R.push(M.transmissionMapUv),R.push(M.thicknessMapUv),R.push(M.combine),R.push(M.fogExp2),R.push(M.sizeAttenuation),R.push(M.morphTargetsCount),R.push(M.morphAttributeCount),R.push(M.numDirLights),R.push(M.numPointLights),R.push(M.numSpotLights),R.push(M.numSpotLightMaps),R.push(M.numHemiLights),R.push(M.numRectAreaLights),R.push(M.numDirLightShadows),R.push(M.numPointLightShadows),R.push(M.numSpotLightShadows),R.push(M.numSpotLightShadowsWithMaps),R.push(M.numLightProbes),R.push(M.shadowMapType),R.push(M.toneMapping),R.push(M.numClippingPlanes),R.push(M.numClipIntersection),R.push(M.depthPacking)}function w(R,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),R.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),R.push(a.mask)}function T(R){const M=S[R.type];let O;if(M){const Z=mn[M];O=Es.clone(Z.uniforms)}else O=R.uniforms;return O}function z(R,M){let O;for(let Z=0,Y=f.length;Z<Y;Z++){const ie=f[Z];if(ie.cacheKey===M){O=ie,++O.usedTimes;break}}return O===void 0&&(O=new yS(i,M,R,s),f.push(O)),O}function F(R){if(--R.usedTimes===0){const M=f.indexOf(R);f[M]=f[f.length-1],f.pop(),R.destroy()}}function N(R){l.remove(R)}function V(){l.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:T,acquireProgram:z,releaseProgram:F,releaseShaderCache:N,programs:f,dispose:V}}function CS(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function wS(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Pc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ic(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(h,p,g,S,E,x){let m=i[e];return m===void 0?(m={id:h.id,object:h,geometry:p,material:g,groupOrder:S,renderOrder:h.renderOrder,z:E,group:x},i[e]=m):(m.id=h.id,m.object=h,m.geometry=p,m.material=g,m.groupOrder=S,m.renderOrder=h.renderOrder,m.z=E,m.group=x),e++,m}function a(h,p,g,S,E,x){const m=o(h,p,g,S,E,x);g.transmission>0?n.push(m):g.transparent===!0?r.push(m):t.push(m)}function l(h,p,g,S,E,x){const m=o(h,p,g,S,E,x);g.transmission>0?n.unshift(m):g.transparent===!0?r.unshift(m):t.unshift(m)}function d(h,p){t.length>1&&t.sort(h||wS),n.length>1&&n.sort(p||Pc),r.length>1&&r.sort(p||Pc)}function f(){for(let h=e,p=i.length;h<p;h++){const g=i[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:a,unshift:l,finish:f,sort:d}}function RS(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new Ic,i.set(n,[o])):r>=s.length?(o=new Ic,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function bS(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new $,color:new it};break;case"SpotLight":t={position:new $,direction:new $,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new $,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new $,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new $,halfWidth:new $,halfHeight:new $};break}return i[e.id]=t,t}}}function PS(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let IS=0;function DS(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function US(i){const e=new bS,t=PS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)n.probe.push(new $);const r=new $,s=new St,o=new St;function a(d){let f=0,h=0,p=0;for(let R=0;R<9;R++)n.probe[R].set(0,0,0);let g=0,S=0,E=0,x=0,m=0,P=0,w=0,T=0,z=0,F=0,N=0;d.sort(DS);for(let R=0,M=d.length;R<M;R++){const O=d[R],Z=O.color,Y=O.intensity,ie=O.distance,le=O.shadow&&O.shadow.map?O.shadow.map.texture:null;if(O.isAmbientLight)f+=Z.r*Y,h+=Z.g*Y,p+=Z.b*Y;else if(O.isLightProbe){for(let ee=0;ee<9;ee++)n.probe[ee].addScaledVector(O.sh.coefficients[ee],Y);N++}else if(O.isDirectionalLight){const ee=e.get(O);if(ee.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const ce=O.shadow,Q=t.get(O);Q.shadowIntensity=ce.intensity,Q.shadowBias=ce.bias,Q.shadowNormalBias=ce.normalBias,Q.shadowRadius=ce.radius,Q.shadowMapSize=ce.mapSize,n.directionalShadow[g]=Q,n.directionalShadowMap[g]=le,n.directionalShadowMatrix[g]=O.shadow.matrix,P++}n.directional[g]=ee,g++}else if(O.isSpotLight){const ee=e.get(O);ee.position.setFromMatrixPosition(O.matrixWorld),ee.color.copy(Z).multiplyScalar(Y),ee.distance=ie,ee.coneCos=Math.cos(O.angle),ee.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),ee.decay=O.decay,n.spot[E]=ee;const ce=O.shadow;if(O.map&&(n.spotLightMap[z]=O.map,z++,ce.updateMatrices(O),O.castShadow&&F++),n.spotLightMatrix[E]=ce.matrix,O.castShadow){const Q=t.get(O);Q.shadowIntensity=ce.intensity,Q.shadowBias=ce.bias,Q.shadowNormalBias=ce.normalBias,Q.shadowRadius=ce.radius,Q.shadowMapSize=ce.mapSize,n.spotShadow[E]=Q,n.spotShadowMap[E]=le,T++}E++}else if(O.isRectAreaLight){const ee=e.get(O);ee.color.copy(Z).multiplyScalar(Y),ee.halfWidth.set(O.width*.5,0,0),ee.halfHeight.set(0,O.height*.5,0),n.rectArea[x]=ee,x++}else if(O.isPointLight){const ee=e.get(O);if(ee.color.copy(O.color).multiplyScalar(O.intensity),ee.distance=O.distance,ee.decay=O.decay,O.castShadow){const ce=O.shadow,Q=t.get(O);Q.shadowIntensity=ce.intensity,Q.shadowBias=ce.bias,Q.shadowNormalBias=ce.normalBias,Q.shadowRadius=ce.radius,Q.shadowMapSize=ce.mapSize,Q.shadowCameraNear=ce.camera.near,Q.shadowCameraFar=ce.camera.far,n.pointShadow[S]=Q,n.pointShadowMap[S]=le,n.pointShadowMatrix[S]=O.shadow.matrix,w++}n.point[S]=ee,S++}else if(O.isHemisphereLight){const ee=e.get(O);ee.skyColor.copy(O.color).multiplyScalar(Y),ee.groundColor.copy(O.groundColor).multiplyScalar(Y),n.hemi[m]=ee,m++}}x>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=h,n.ambient[2]=p;const V=n.hash;(V.directionalLength!==g||V.pointLength!==S||V.spotLength!==E||V.rectAreaLength!==x||V.hemiLength!==m||V.numDirectionalShadows!==P||V.numPointShadows!==w||V.numSpotShadows!==T||V.numSpotMaps!==z||V.numLightProbes!==N)&&(n.directional.length=g,n.spot.length=E,n.rectArea.length=x,n.point.length=S,n.hemi.length=m,n.directionalShadow.length=P,n.directionalShadowMap.length=P,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=P,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=T+z-F,n.spotLightMap.length=z,n.numSpotLightShadowsWithMaps=F,n.numLightProbes=N,V.directionalLength=g,V.pointLength=S,V.spotLength=E,V.rectAreaLength=x,V.hemiLength=m,V.numDirectionalShadows=P,V.numPointShadows=w,V.numSpotShadows=T,V.numSpotMaps=z,V.numLightProbes=N,n.version=IS++)}function l(d,f){let h=0,p=0,g=0,S=0,E=0;const x=f.matrixWorldInverse;for(let m=0,P=d.length;m<P;m++){const w=d[m];if(w.isDirectionalLight){const T=n.directional[h];T.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(x),h++}else if(w.isSpotLight){const T=n.spot[g];T.position.setFromMatrixPosition(w.matrixWorld),T.position.applyMatrix4(x),T.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(x),g++}else if(w.isRectAreaLight){const T=n.rectArea[S];T.position.setFromMatrixPosition(w.matrixWorld),T.position.applyMatrix4(x),o.identity(),s.copy(w.matrixWorld),s.premultiply(x),o.extractRotation(s),T.halfWidth.set(w.width*.5,0,0),T.halfHeight.set(0,w.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),S++}else if(w.isPointLight){const T=n.point[p];T.position.setFromMatrixPosition(w.matrixWorld),T.position.applyMatrix4(x),p++}else if(w.isHemisphereLight){const T=n.hemi[E];T.direction.setFromMatrixPosition(w.matrixWorld),T.direction.transformDirection(x),E++}}}return{setup:a,setupView:l,state:n}}function Dc(i){const e=new US(i),t=[],n=[];function r(f){d.camera=f,t.length=0,n.length=0}function s(f){t.push(f)}function o(f){n.push(f)}function a(){e.setup(t)}function l(f){e.setupView(t,f)}const d={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:d,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function LS(i){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Dc(i),e.set(r,[a])):s>=o.length?(a=new Dc(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const NS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,FS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function OS(i,e,t){let n=new Su;const r=new Ge,s=new Ge,o=new gt,a=new r_({depthPacking:dg}),l=new s_,d={},f=t.maxTextureSize,h={[qn]:Bt,[Bt]:qn,[Cn]:Cn},p=new Ot({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:NS,fragmentShader:FS}),g=p.clone();g.defines.HORIZONTAL_PASS=1;const S=new Ln;S.setAttribute("position",new gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new en(S,p),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jc;let m=this.type;this.render=function(F,N,V){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||F.length===0)return;const R=i.getRenderTarget(),M=i.getActiveCubeFace(),O=i.getActiveMipmapLevel(),Z=i.state;Z.setBlending(In),Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);const Y=m!==An&&this.type===An,ie=m===An&&this.type!==An;for(let le=0,ee=F.length;le<ee;le++){const ce=F[le],Q=ce.shadow;if(Q===void 0){console.warn("THREE.WebGLShadowMap:",ce,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;r.copy(Q.mapSize);const ge=Q.getFrameExtents();if(r.multiply(ge),s.copy(Q.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/ge.x),r.x=s.x*ge.x,Q.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/ge.y),r.y=s.y*ge.y,Q.mapSize.y=s.y)),Q.map===null||Y===!0||ie===!0){const be=this.type!==An?{minFilter:Xt,magFilter:Xt}:{};Q.map!==null&&Q.map.dispose(),Q.map=new fn(r.x,r.y,be),Q.map.texture.name=ce.name+".shadowMap",Q.camera.updateProjectionMatrix()}i.setRenderTarget(Q.map),i.clear();const ve=Q.getViewportCount();for(let be=0;be<ve;be++){const Ve=Q.getViewport(be);o.set(s.x*Ve.x,s.y*Ve.y,s.x*Ve.z,s.y*Ve.w),Z.viewport(o),Q.updateMatrices(ce,be),n=Q.getFrustum(),T(N,V,Q.camera,ce,this.type)}Q.isPointLightShadow!==!0&&this.type===An&&P(Q,V),Q.needsUpdate=!1}m=this.type,x.needsUpdate=!1,i.setRenderTarget(R,M,O)};function P(F,N){const V=e.update(E);p.defines.VSM_SAMPLES!==F.blurSamples&&(p.defines.VSM_SAMPLES=F.blurSamples,g.defines.VSM_SAMPLES=F.blurSamples,p.needsUpdate=!0,g.needsUpdate=!0),F.mapPass===null&&(F.mapPass=new fn(r.x,r.y)),p.uniforms.shadow_pass.value=F.map.texture,p.uniforms.resolution.value=F.mapSize,p.uniforms.radius.value=F.radius,i.setRenderTarget(F.mapPass),i.clear(),i.renderBufferDirect(N,null,V,p,E,null),g.uniforms.shadow_pass.value=F.mapPass.texture,g.uniforms.resolution.value=F.mapSize,g.uniforms.radius.value=F.radius,i.setRenderTarget(F.map),i.clear(),i.renderBufferDirect(N,null,V,g,E,null)}function w(F,N,V,R){let M=null;const O=V.isPointLight===!0?F.customDistanceMaterial:F.customDepthMaterial;if(O!==void 0)M=O;else if(M=V.isPointLight===!0?l:a,i.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0||N.alphaToCoverage===!0){const Z=M.uuid,Y=N.uuid;let ie=d[Z];ie===void 0&&(ie={},d[Z]=ie);let le=ie[Y];le===void 0&&(le=M.clone(),ie[Y]=le,N.addEventListener("dispose",z)),M=le}if(M.visible=N.visible,M.wireframe=N.wireframe,R===An?M.side=N.shadowSide!==null?N.shadowSide:N.side:M.side=N.shadowSide!==null?N.shadowSide:h[N.side],M.alphaMap=N.alphaMap,M.alphaTest=N.alphaToCoverage===!0?.5:N.alphaTest,M.map=N.map,M.clipShadows=N.clipShadows,M.clippingPlanes=N.clippingPlanes,M.clipIntersection=N.clipIntersection,M.displacementMap=N.displacementMap,M.displacementScale=N.displacementScale,M.displacementBias=N.displacementBias,M.wireframeLinewidth=N.wireframeLinewidth,M.linewidth=N.linewidth,V.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const Z=i.properties.get(M);Z.light=V}return M}function T(F,N,V,R,M){if(F.visible===!1)return;if(F.layers.test(N.layers)&&(F.isMesh||F.isLine||F.isPoints)&&(F.castShadow||F.receiveShadow&&M===An)&&(!F.frustumCulled||n.intersectsObject(F))){F.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,F.matrixWorld);const Y=e.update(F),ie=F.material;if(Array.isArray(ie)){const le=Y.groups;for(let ee=0,ce=le.length;ee<ce;ee++){const Q=le[ee],ge=ie[Q.materialIndex];if(ge&&ge.visible){const ve=w(F,ge,R,M);F.onBeforeShadow(i,F,N,V,Y,ve,Q),i.renderBufferDirect(V,null,Y,ve,F,Q),F.onAfterShadow(i,F,N,V,Y,ve,Q)}}}else if(ie.visible){const le=w(F,ie,R,M);F.onBeforeShadow(i,F,N,V,Y,le,null),i.renderBufferDirect(V,null,Y,le,F,null),F.onAfterShadow(i,F,N,V,Y,le,null)}}const Z=F.children;for(let Y=0,ie=Z.length;Y<ie;Y++)T(Z[Y],N,V,R,M)}function z(F){F.target.removeEventListener("dispose",z);for(const V in d){const R=d[V],M=F.target.uuid;M in R&&(R[M].dispose(),delete R[M])}}}const BS={[yo]:Eo,[Mo]:Co,[To]:wo,[Oi]:Ao,[Eo]:yo,[Co]:Mo,[wo]:To,[Ao]:Oi};function zS(i,e){function t(){let H=!1;const q=new gt;let J=null;const oe=new gt(0,0,0,0);return{setMask:function(Ee){J!==Ee&&!H&&(i.colorMask(Ee,Ee,Ee,Ee),J=Ee)},setLocked:function(Ee){H=Ee},setClear:function(Ee,ye,Xe,mt,At){At===!0&&(Ee*=mt,ye*=mt,Xe*=mt),q.set(Ee,ye,Xe,mt),oe.equals(q)===!1&&(i.clearColor(Ee,ye,Xe,mt),oe.copy(q))},reset:function(){H=!1,J=null,oe.set(-1,0,0,0)}}}function n(){let H=!1,q=!1,J=null,oe=null,Ee=null;return{setReversed:function(ye){if(q!==ye){const Xe=e.get("EXT_clip_control");ye?Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.ZERO_TO_ONE_EXT):Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.NEGATIVE_ONE_TO_ONE_EXT),q=ye;const mt=Ee;Ee=null,this.setClear(mt)}},getReversed:function(){return q},setTest:function(ye){ye?_e(i.DEPTH_TEST):Pe(i.DEPTH_TEST)},setMask:function(ye){J!==ye&&!H&&(i.depthMask(ye),J=ye)},setFunc:function(ye){if(q&&(ye=BS[ye]),oe!==ye){switch(ye){case yo:i.depthFunc(i.NEVER);break;case Eo:i.depthFunc(i.ALWAYS);break;case Mo:i.depthFunc(i.LESS);break;case Oi:i.depthFunc(i.LEQUAL);break;case To:i.depthFunc(i.EQUAL);break;case Ao:i.depthFunc(i.GEQUAL);break;case Co:i.depthFunc(i.GREATER);break;case wo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}oe=ye}},setLocked:function(ye){H=ye},setClear:function(ye){Ee!==ye&&(q&&(ye=1-ye),i.clearDepth(ye),Ee=ye)},reset:function(){H=!1,J=null,oe=null,Ee=null,q=!1}}}function r(){let H=!1,q=null,J=null,oe=null,Ee=null,ye=null,Xe=null,mt=null,At=null;return{setTest:function(at){H||(at?_e(i.STENCIL_TEST):Pe(i.STENCIL_TEST))},setMask:function(at){q!==at&&!H&&(i.stencilMask(at),q=at)},setFunc:function(at,Ht,sn){(J!==at||oe!==Ht||Ee!==sn)&&(i.stencilFunc(at,Ht,sn),J=at,oe=Ht,Ee=sn)},setOp:function(at,Ht,sn){(ye!==at||Xe!==Ht||mt!==sn)&&(i.stencilOp(at,Ht,sn),ye=at,Xe=Ht,mt=sn)},setLocked:function(at){H=at},setClear:function(at){At!==at&&(i.clearStencil(at),At=at)},reset:function(){H=!1,q=null,J=null,oe=null,Ee=null,ye=null,Xe=null,mt=null,At=null}}}const s=new t,o=new n,a=new r,l=new WeakMap,d=new WeakMap;let f={},h={},p=new WeakMap,g=[],S=null,E=!1,x=null,m=null,P=null,w=null,T=null,z=null,F=null,N=new it(0,0,0),V=0,R=!1,M=null,O=null,Z=null,Y=null,ie=null;const le=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ee=!1,ce=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(ce=parseFloat(/^WebGL (\d)/.exec(Q)[1]),ee=ce>=1):Q.indexOf("OpenGL ES")!==-1&&(ce=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),ee=ce>=2);let ge=null,ve={};const be=i.getParameter(i.SCISSOR_BOX),Ve=i.getParameter(i.VIEWPORT),Je=new gt().fromArray(be),j=new gt().fromArray(Ve);function pe(H,q,J,oe){const Ee=new Uint8Array(4),ye=i.createTexture();i.bindTexture(H,ye),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Xe=0;Xe<J;Xe++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(q,0,i.RGBA,1,1,oe,0,i.RGBA,i.UNSIGNED_BYTE,Ee):i.texImage2D(q+Xe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ee);return ye}const me={};me[i.TEXTURE_2D]=pe(i.TEXTURE_2D,i.TEXTURE_2D,1),me[i.TEXTURE_CUBE_MAP]=pe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[i.TEXTURE_2D_ARRAY]=pe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),me[i.TEXTURE_3D]=pe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),_e(i.DEPTH_TEST),o.setFunc(Oi),tt(!1),je(Bl),_e(i.CULL_FACE),B(In);function _e(H){f[H]!==!0&&(i.enable(H),f[H]=!0)}function Pe(H){f[H]!==!1&&(i.disable(H),f[H]=!1)}function Qe(H,q){return h[H]!==q?(i.bindFramebuffer(H,q),h[H]=q,H===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=q),H===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=q),!0):!1}function ke(H,q){let J=g,oe=!1;if(H){J=p.get(q),J===void 0&&(J=[],p.set(q,J));const Ee=H.textures;if(J.length!==Ee.length||J[0]!==i.COLOR_ATTACHMENT0){for(let ye=0,Xe=Ee.length;ye<Xe;ye++)J[ye]=i.COLOR_ATTACHMENT0+ye;J.length=Ee.length,oe=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,oe=!0);oe&&i.drawBuffers(J)}function dt(H){return S!==H?(i.useProgram(H),S=H,!0):!1}const ct={[ai]:i.FUNC_ADD,[Om]:i.FUNC_SUBTRACT,[Bm]:i.FUNC_REVERSE_SUBTRACT};ct[zm]=i.MIN,ct[Vm]=i.MAX;const Ke={[km]:i.ZERO,[Hm]:i.ONE,[Gm]:i.SRC_COLOR,[xo]:i.SRC_ALPHA,[Km]:i.SRC_ALPHA_SATURATE,[qm]:i.DST_COLOR,[$m]:i.DST_ALPHA,[Wm]:i.ONE_MINUS_SRC_COLOR,[So]:i.ONE_MINUS_SRC_ALPHA,[Ym]:i.ONE_MINUS_DST_COLOR,[Xm]:i.ONE_MINUS_DST_ALPHA,[Zm]:i.CONSTANT_COLOR,[Jm]:i.ONE_MINUS_CONSTANT_COLOR,[Qm]:i.CONSTANT_ALPHA,[jm]:i.ONE_MINUS_CONSTANT_ALPHA};function B(H,q,J,oe,Ee,ye,Xe,mt,At,at){if(H===In){E===!0&&(Pe(i.BLEND),E=!1);return}if(E===!1&&(_e(i.BLEND),E=!0),H!==Fm){if(H!==x||at!==R){if((m!==ai||T!==ai)&&(i.blendEquation(i.FUNC_ADD),m=ai,T=ai),at)switch(H){case Ui:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vo:i.blendFunc(i.ONE,i.ONE);break;case zl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Vl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case Ui:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case vo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case zl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Vl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}P=null,w=null,z=null,F=null,N.set(0,0,0),V=0,x=H,R=at}return}Ee=Ee||q,ye=ye||J,Xe=Xe||oe,(q!==m||Ee!==T)&&(i.blendEquationSeparate(ct[q],ct[Ee]),m=q,T=Ee),(J!==P||oe!==w||ye!==z||Xe!==F)&&(i.blendFuncSeparate(Ke[J],Ke[oe],Ke[ye],Ke[Xe]),P=J,w=oe,z=ye,F=Xe),(mt.equals(N)===!1||At!==V)&&(i.blendColor(mt.r,mt.g,mt.b,At),N.copy(mt),V=At),x=H,R=!1}function Lt(H,q){H.side===Cn?Pe(i.CULL_FACE):_e(i.CULL_FACE);let J=H.side===Bt;q&&(J=!J),tt(J),H.blending===Ui&&H.transparent===!1?B(In):B(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),s.setMask(H.colorWrite);const oe=H.stencilWrite;a.setTest(oe),oe&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),ft(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?_e(i.SAMPLE_ALPHA_TO_COVERAGE):Pe(i.SAMPLE_ALPHA_TO_COVERAGE)}function tt(H){M!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),M=H)}function je(H){H!==Um?(_e(i.CULL_FACE),H!==O&&(H===Bl?i.cullFace(i.BACK):H===Lm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Pe(i.CULL_FACE),O=H}function Ne(H){H!==Z&&(ee&&i.lineWidth(H),Z=H)}function ft(H,q,J){H?(_e(i.POLYGON_OFFSET_FILL),(Y!==q||ie!==J)&&(i.polygonOffset(q,J),Y=q,ie=J)):Pe(i.POLYGON_OFFSET_FILL)}function Ue(H){H?_e(i.SCISSOR_TEST):Pe(i.SCISSOR_TEST)}function I(H){H===void 0&&(H=i.TEXTURE0+le-1),ge!==H&&(i.activeTexture(H),ge=H)}function y(H,q,J){J===void 0&&(ge===null?J=i.TEXTURE0+le-1:J=ge);let oe=ve[J];oe===void 0&&(oe={type:void 0,texture:void 0},ve[J]=oe),(oe.type!==H||oe.texture!==q)&&(ge!==J&&(i.activeTexture(J),ge=J),i.bindTexture(H,q||me[H]),oe.type=H,oe.texture=q)}function X(){const H=ve[ge];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function re(){try{i.compressedTexImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ue(){try{i.compressedTexImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function te(){try{i.texSubImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Ie(){try{i.texSubImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Se(){try{i.compressedTexSubImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Fe(){try{i.compressedTexSubImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function He(){try{i.texStorage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function fe(){try{i.texStorage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Te(){try{i.texImage2D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Re(){try{i.texImage3D(...arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function De(H){Je.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),Je.copy(H))}function Me(H){j.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),j.copy(H))}function We(H,q){let J=d.get(q);J===void 0&&(J=new WeakMap,d.set(q,J));let oe=J.get(H);oe===void 0&&(oe=i.getUniformBlockIndex(q,H.name),J.set(H,oe))}function Oe(H,q){const oe=d.get(q).get(H);l.get(q)!==oe&&(i.uniformBlockBinding(q,oe,H.__bindingPointIndex),l.set(q,oe))}function $e(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},ge=null,ve={},h={},p=new WeakMap,g=[],S=null,E=!1,x=null,m=null,P=null,w=null,T=null,z=null,F=null,N=new it(0,0,0),V=0,R=!1,M=null,O=null,Z=null,Y=null,ie=null,Je.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:_e,disable:Pe,bindFramebuffer:Qe,drawBuffers:ke,useProgram:dt,setBlending:B,setMaterial:Lt,setFlipSided:tt,setCullFace:je,setLineWidth:Ne,setPolygonOffset:ft,setScissorTest:Ue,activeTexture:I,bindTexture:y,unbindTexture:X,compressedTexImage2D:re,compressedTexImage3D:ue,texImage2D:Te,texImage3D:Re,updateUBOMapping:We,uniformBlockBinding:Oe,texStorage2D:He,texStorage3D:fe,texSubImage2D:te,texSubImage3D:Ie,compressedTexSubImage2D:Se,compressedTexSubImage3D:Fe,scissor:De,viewport:Me,reset:$e}}function VS(i,e,t,n,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new Ge,f=new WeakMap;let h;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(I,y){return g?new OffscreenCanvas(I,y):ys("canvas")}function E(I,y,X){let re=1;const ue=Ue(I);if((ue.width>X||ue.height>X)&&(re=X/Math.max(ue.width,ue.height)),re<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const te=Math.floor(re*ue.width),Ie=Math.floor(re*ue.height);h===void 0&&(h=S(te,Ie));const Se=y?S(te,Ie):h;return Se.width=te,Se.height=Ie,Se.getContext("2d").drawImage(I,0,0,te,Ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ue.width+"x"+ue.height+") to ("+te+"x"+Ie+")."),Se}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ue.width+"x"+ue.height+")."),I;return I}function x(I){return I.generateMipmaps}function m(I){i.generateMipmap(I)}function P(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(I,y,X,re,ue=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let te=y;if(y===i.RED&&(X===i.FLOAT&&(te=i.R32F),X===i.HALF_FLOAT&&(te=i.R16F),X===i.UNSIGNED_BYTE&&(te=i.R8)),y===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.R8UI),X===i.UNSIGNED_SHORT&&(te=i.R16UI),X===i.UNSIGNED_INT&&(te=i.R32UI),X===i.BYTE&&(te=i.R8I),X===i.SHORT&&(te=i.R16I),X===i.INT&&(te=i.R32I)),y===i.RG&&(X===i.FLOAT&&(te=i.RG32F),X===i.HALF_FLOAT&&(te=i.RG16F),X===i.UNSIGNED_BYTE&&(te=i.RG8)),y===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.RG8UI),X===i.UNSIGNED_SHORT&&(te=i.RG16UI),X===i.UNSIGNED_INT&&(te=i.RG32UI),X===i.BYTE&&(te=i.RG8I),X===i.SHORT&&(te=i.RG16I),X===i.INT&&(te=i.RG32I)),y===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.RGB8UI),X===i.UNSIGNED_SHORT&&(te=i.RGB16UI),X===i.UNSIGNED_INT&&(te=i.RGB32UI),X===i.BYTE&&(te=i.RGB8I),X===i.SHORT&&(te=i.RGB16I),X===i.INT&&(te=i.RGB32I)),y===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(te=i.RGBA16UI),X===i.UNSIGNED_INT&&(te=i.RGBA32UI),X===i.BYTE&&(te=i.RGBA8I),X===i.SHORT&&(te=i.RGBA16I),X===i.INT&&(te=i.RGBA32I)),y===i.RGB&&X===i.UNSIGNED_INT_5_9_9_9_REV&&(te=i.RGB9_E5),y===i.RGBA){const Ie=ue?xs:ot.getTransfer(re);X===i.FLOAT&&(te=i.RGBA32F),X===i.HALF_FLOAT&&(te=i.RGBA16F),X===i.UNSIGNED_BYTE&&(te=Ie===ut?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function T(I,y){let X;return I?y===null||y===fi||y===fr?X=i.DEPTH24_STENCIL8:y===Qt?X=i.DEPTH32F_STENCIL8:y===dr&&(X=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===fi||y===fr?X=i.DEPTH_COMPONENT24:y===Qt?X=i.DEPTH_COMPONENT32F:y===dr&&(X=i.DEPTH_COMPONENT16),X}function z(I,y){return x(I)===!0||I.isFramebufferTexture&&I.minFilter!==Xt&&I.minFilter!==Ft?Math.log2(Math.max(y.width,y.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?y.mipmaps.length:1}function F(I){const y=I.target;y.removeEventListener("dispose",F),V(y),y.isVideoTexture&&f.delete(y)}function N(I){const y=I.target;y.removeEventListener("dispose",N),M(y)}function V(I){const y=n.get(I);if(y.__webglInit===void 0)return;const X=I.source,re=p.get(X);if(re){const ue=re[y.__cacheKey];ue.usedTimes--,ue.usedTimes===0&&R(I),Object.keys(re).length===0&&p.delete(X)}n.remove(I)}function R(I){const y=n.get(I);i.deleteTexture(y.__webglTexture);const X=I.source,re=p.get(X);delete re[y.__cacheKey],o.memory.textures--}function M(I){const y=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(y.__webglFramebuffer[re]))for(let ue=0;ue<y.__webglFramebuffer[re].length;ue++)i.deleteFramebuffer(y.__webglFramebuffer[re][ue]);else i.deleteFramebuffer(y.__webglFramebuffer[re]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[re])}else{if(Array.isArray(y.__webglFramebuffer))for(let re=0;re<y.__webglFramebuffer.length;re++)i.deleteFramebuffer(y.__webglFramebuffer[re]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let re=0;re<y.__webglColorRenderbuffer.length;re++)y.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[re]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const X=I.textures;for(let re=0,ue=X.length;re<ue;re++){const te=n.get(X[re]);te.__webglTexture&&(i.deleteTexture(te.__webglTexture),o.memory.textures--),n.remove(X[re])}n.remove(I)}let O=0;function Z(){O=0}function Y(){const I=O;return I>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+r.maxTextures),O+=1,I}function ie(I){const y=[];return y.push(I.wrapS),y.push(I.wrapT),y.push(I.wrapR||0),y.push(I.magFilter),y.push(I.minFilter),y.push(I.anisotropy),y.push(I.internalFormat),y.push(I.format),y.push(I.type),y.push(I.generateMipmaps),y.push(I.premultiplyAlpha),y.push(I.flipY),y.push(I.unpackAlignment),y.push(I.colorSpace),y.join()}function le(I,y){const X=n.get(I);if(I.isVideoTexture&&Ne(I),I.isRenderTargetTexture===!1&&I.version>0&&X.__version!==I.version){const re=I.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(X,I,y);return}}t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+y)}function ee(I,y){const X=n.get(I);if(I.version>0&&X.__version!==I.version){j(X,I,y);return}t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+y)}function ce(I,y){const X=n.get(I);if(I.version>0&&X.__version!==I.version){j(X,I,y);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+y)}function Q(I,y){const X=n.get(I);if(I.version>0&&X.__version!==I.version){pe(X,I,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+y)}const ge={[bo]:i.REPEAT,[bn]:i.CLAMP_TO_EDGE,[Po]:i.MIRRORED_REPEAT},ve={[Xt]:i.NEAREST,[cg]:i.NEAREST_MIPMAP_NEAREST,[Dr]:i.NEAREST_MIPMAP_LINEAR,[Ft]:i.LINEAR,[Ls]:i.LINEAR_MIPMAP_NEAREST,[Wn]:i.LINEAR_MIPMAP_LINEAR},be={[hg]:i.NEVER,[xg]:i.ALWAYS,[pg]:i.LESS,[uu]:i.LEQUAL,[mg]:i.EQUAL,[vg]:i.GEQUAL,[gg]:i.GREATER,[_g]:i.NOTEQUAL};function Ve(I,y){if(y.type===Qt&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Ft||y.magFilter===Ls||y.magFilter===Dr||y.magFilter===Wn||y.minFilter===Ft||y.minFilter===Ls||y.minFilter===Dr||y.minFilter===Wn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,ge[y.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,ge[y.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,ge[y.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,ve[y.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,ve[y.minFilter]),y.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,be[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Xt||y.minFilter!==Dr&&y.minFilter!==Wn||y.type===Qt&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Je(I,y){let X=!1;I.__webglInit===void 0&&(I.__webglInit=!0,y.addEventListener("dispose",F));const re=y.source;let ue=p.get(re);ue===void 0&&(ue={},p.set(re,ue));const te=ie(y);if(te!==I.__cacheKey){ue[te]===void 0&&(ue[te]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,X=!0),ue[te].usedTimes++;const Ie=ue[I.__cacheKey];Ie!==void 0&&(ue[I.__cacheKey].usedTimes--,Ie.usedTimes===0&&R(y)),I.__cacheKey=te,I.__webglTexture=ue[te].texture}return X}function j(I,y,X){let re=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(re=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(re=i.TEXTURE_3D);const ue=Je(I,y),te=y.source;t.bindTexture(re,I.__webglTexture,i.TEXTURE0+X);const Ie=n.get(te);if(te.version!==Ie.__version||ue===!0){t.activeTexture(i.TEXTURE0+X);const Se=ot.getPrimaries(ot.workingColorSpace),Fe=y.colorSpace===wn?null:ot.getPrimaries(y.colorSpace),He=y.colorSpace===wn||Se===Fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,He);let fe=E(y.image,!1,r.maxTextureSize);fe=ft(y,fe);const Te=s.convert(y.format,y.colorSpace),Re=s.convert(y.type);let De=w(y.internalFormat,Te,Re,y.colorSpace,y.isVideoTexture);Ve(re,y);let Me;const We=y.mipmaps,Oe=y.isVideoTexture!==!0,$e=Ie.__version===void 0||ue===!0,H=te.dataReady,q=z(y,fe);if(y.isDepthTexture)De=T(y.format===pr,y.type),$e&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,De,fe.width,fe.height):t.texImage2D(i.TEXTURE_2D,0,De,fe.width,fe.height,0,Te,Re,null));else if(y.isDataTexture)if(We.length>0){Oe&&$e&&t.texStorage2D(i.TEXTURE_2D,q,De,We[0].width,We[0].height);for(let J=0,oe=We.length;J<oe;J++)Me=We[J],Oe?H&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Me.width,Me.height,Te,Re,Me.data):t.texImage2D(i.TEXTURE_2D,J,De,Me.width,Me.height,0,Te,Re,Me.data);y.generateMipmaps=!1}else Oe?($e&&t.texStorage2D(i.TEXTURE_2D,q,De,fe.width,fe.height),H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe.width,fe.height,Te,Re,fe.data)):t.texImage2D(i.TEXTURE_2D,0,De,fe.width,fe.height,0,Te,Re,fe.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Oe&&$e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,q,De,We[0].width,We[0].height,fe.depth);for(let J=0,oe=We.length;J<oe;J++)if(Me=We[J],y.format!==jt)if(Te!==null)if(Oe){if(H)if(y.layerUpdates.size>0){const Ee=cc(Me.width,Me.height,y.format,y.type);for(const ye of y.layerUpdates){const Xe=Me.data.subarray(ye*Ee/Me.data.BYTES_PER_ELEMENT,(ye+1)*Ee/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,ye,Me.width,Me.height,1,Te,Xe)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,Me.width,Me.height,fe.depth,Te,Me.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,De,Me.width,Me.height,fe.depth,0,Me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Oe?H&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,Me.width,Me.height,fe.depth,Te,Re,Me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,De,Me.width,Me.height,fe.depth,0,Te,Re,Me.data)}else{Oe&&$e&&t.texStorage2D(i.TEXTURE_2D,q,De,We[0].width,We[0].height);for(let J=0,oe=We.length;J<oe;J++)Me=We[J],y.format!==jt?Te!==null?Oe?H&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,Me.width,Me.height,Te,Me.data):t.compressedTexImage2D(i.TEXTURE_2D,J,De,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?H&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Me.width,Me.height,Te,Re,Me.data):t.texImage2D(i.TEXTURE_2D,J,De,Me.width,Me.height,0,Te,Re,Me.data)}else if(y.isDataArrayTexture)if(Oe){if($e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,q,De,fe.width,fe.height,fe.depth),H)if(y.layerUpdates.size>0){const J=cc(fe.width,fe.height,y.format,y.type);for(const oe of y.layerUpdates){const Ee=fe.data.subarray(oe*J/fe.data.BYTES_PER_ELEMENT,(oe+1)*J/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,oe,fe.width,fe.height,1,Te,Re,Ee)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Te,Re,fe.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,De,fe.width,fe.height,fe.depth,0,Te,Re,fe.data);else if(y.isData3DTexture)Oe?($e&&t.texStorage3D(i.TEXTURE_3D,q,De,fe.width,fe.height,fe.depth),H&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Te,Re,fe.data)):t.texImage3D(i.TEXTURE_3D,0,De,fe.width,fe.height,fe.depth,0,Te,Re,fe.data);else if(y.isFramebufferTexture){if($e)if(Oe)t.texStorage2D(i.TEXTURE_2D,q,De,fe.width,fe.height);else{let J=fe.width,oe=fe.height;for(let Ee=0;Ee<q;Ee++)t.texImage2D(i.TEXTURE_2D,Ee,De,J,oe,0,Te,Re,null),J>>=1,oe>>=1}}else if(We.length>0){if(Oe&&$e){const J=Ue(We[0]);t.texStorage2D(i.TEXTURE_2D,q,De,J.width,J.height)}for(let J=0,oe=We.length;J<oe;J++)Me=We[J],Oe?H&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Te,Re,Me):t.texImage2D(i.TEXTURE_2D,J,De,Te,Re,Me);y.generateMipmaps=!1}else if(Oe){if($e){const J=Ue(fe);t.texStorage2D(i.TEXTURE_2D,q,De,J.width,J.height)}H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Te,Re,fe)}else t.texImage2D(i.TEXTURE_2D,0,De,Te,Re,fe);x(y)&&m(re),Ie.__version=te.version,y.onUpdate&&y.onUpdate(y)}I.__version=y.version}function pe(I,y,X){if(y.image.length!==6)return;const re=Je(I,y),ue=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+X);const te=n.get(ue);if(ue.version!==te.__version||re===!0){t.activeTexture(i.TEXTURE0+X);const Ie=ot.getPrimaries(ot.workingColorSpace),Se=y.colorSpace===wn?null:ot.getPrimaries(y.colorSpace),Fe=y.colorSpace===wn||Ie===Se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);const He=y.isCompressedTexture||y.image[0].isCompressedTexture,fe=y.image[0]&&y.image[0].isDataTexture,Te=[];for(let oe=0;oe<6;oe++)!He&&!fe?Te[oe]=E(y.image[oe],!0,r.maxCubemapSize):Te[oe]=fe?y.image[oe].image:y.image[oe],Te[oe]=ft(y,Te[oe]);const Re=Te[0],De=s.convert(y.format,y.colorSpace),Me=s.convert(y.type),We=w(y.internalFormat,De,Me,y.colorSpace),Oe=y.isVideoTexture!==!0,$e=te.__version===void 0||re===!0,H=ue.dataReady;let q=z(y,Re);Ve(i.TEXTURE_CUBE_MAP,y);let J;if(He){Oe&&$e&&t.texStorage2D(i.TEXTURE_CUBE_MAP,q,We,Re.width,Re.height);for(let oe=0;oe<6;oe++){J=Te[oe].mipmaps;for(let Ee=0;Ee<J.length;Ee++){const ye=J[Ee];y.format!==jt?De!==null?Oe?H&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ee,0,0,ye.width,ye.height,De,ye.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ee,We,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ee,0,0,ye.width,ye.height,De,Me,ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ee,We,ye.width,ye.height,0,De,Me,ye.data)}}}else{if(J=y.mipmaps,Oe&&$e){J.length>0&&q++;const oe=Ue(Te[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,q,We,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(fe){Oe?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Te[oe].width,Te[oe].height,De,Me,Te[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,We,Te[oe].width,Te[oe].height,0,De,Me,Te[oe].data);for(let Ee=0;Ee<J.length;Ee++){const Xe=J[Ee].image[oe].image;Oe?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ee+1,0,0,Xe.width,Xe.height,De,Me,Xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ee+1,We,Xe.width,Xe.height,0,De,Me,Xe.data)}}else{Oe?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,De,Me,Te[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,We,De,Me,Te[oe]);for(let Ee=0;Ee<J.length;Ee++){const ye=J[Ee];Oe?H&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ee+1,0,0,De,Me,ye.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ee+1,We,De,Me,ye.image[oe])}}}x(y)&&m(i.TEXTURE_CUBE_MAP),te.__version=ue.version,y.onUpdate&&y.onUpdate(y)}I.__version=y.version}function me(I,y,X,re,ue,te){const Ie=s.convert(X.format,X.colorSpace),Se=s.convert(X.type),Fe=w(X.internalFormat,Ie,Se,X.colorSpace),He=n.get(y),fe=n.get(X);if(fe.__renderTarget=y,!He.__hasExternalTextures){const Te=Math.max(1,y.width>>te),Re=Math.max(1,y.height>>te);ue===i.TEXTURE_3D||ue===i.TEXTURE_2D_ARRAY?t.texImage3D(ue,te,Fe,Te,Re,y.depth,0,Ie,Se,null):t.texImage2D(ue,te,Fe,Te,Re,0,Ie,Se,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),je(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,re,ue,fe.__webglTexture,0,tt(y)):(ue===i.TEXTURE_2D||ue>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ue<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,re,ue,fe.__webglTexture,te),t.bindFramebuffer(i.FRAMEBUFFER,null)}function _e(I,y,X){if(i.bindRenderbuffer(i.RENDERBUFFER,I),y.depthBuffer){const re=y.depthTexture,ue=re&&re.isDepthTexture?re.type:null,te=T(y.stencilBuffer,ue),Ie=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Se=tt(y);je(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Se,te,y.width,y.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,Se,te,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,te,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ie,i.RENDERBUFFER,I)}else{const re=y.textures;for(let ue=0;ue<re.length;ue++){const te=re[ue],Ie=s.convert(te.format,te.colorSpace),Se=s.convert(te.type),Fe=w(te.internalFormat,Ie,Se,te.colorSpace),He=tt(y);X&&je(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,He,Fe,y.width,y.height):je(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,He,Fe,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,Fe,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Pe(I,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const re=n.get(y.depthTexture);re.__renderTarget=y,(!re.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),le(y.depthTexture,0);const ue=re.__webglTexture,te=tt(y);if(y.depthTexture.format===hr)je(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ue,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ue,0);else if(y.depthTexture.format===pr)je(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ue,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ue,0);else throw new Error("Unknown depthTexture format")}function Qe(I){const y=n.get(I),X=I.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==I.depthTexture){const re=I.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),re){const ue=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,re.removeEventListener("dispose",ue)};re.addEventListener("dispose",ue),y.__depthDisposeCallback=ue}y.__boundDepthTexture=re}if(I.depthTexture&&!y.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");const re=I.texture.mipmaps;re&&re.length>0?Pe(y.__webglFramebuffer[0],I):Pe(y.__webglFramebuffer,I)}else if(X){y.__webglDepthbuffer=[];for(let re=0;re<6;re++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[re]),y.__webglDepthbuffer[re]===void 0)y.__webglDepthbuffer[re]=i.createRenderbuffer(),_e(y.__webglDepthbuffer[re],I,!1);else{const ue=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=y.__webglDepthbuffer[re];i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,ue,i.RENDERBUFFER,te)}}else{const re=I.texture.mipmaps;if(re&&re.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),_e(y.__webglDepthbuffer,I,!1);else{const ue=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,ue,i.RENDERBUFFER,te)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ke(I,y,X){const re=n.get(I);y!==void 0&&me(re.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&Qe(I)}function dt(I){const y=I.texture,X=n.get(I),re=n.get(y);I.addEventListener("dispose",N);const ue=I.textures,te=I.isWebGLCubeRenderTarget===!0,Ie=ue.length>1;if(Ie||(re.__webglTexture===void 0&&(re.__webglTexture=i.createTexture()),re.__version=y.version,o.memory.textures++),te){X.__webglFramebuffer=[];for(let Se=0;Se<6;Se++)if(y.mipmaps&&y.mipmaps.length>0){X.__webglFramebuffer[Se]=[];for(let Fe=0;Fe<y.mipmaps.length;Fe++)X.__webglFramebuffer[Se][Fe]=i.createFramebuffer()}else X.__webglFramebuffer[Se]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){X.__webglFramebuffer=[];for(let Se=0;Se<y.mipmaps.length;Se++)X.__webglFramebuffer[Se]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(Ie)for(let Se=0,Fe=ue.length;Se<Fe;Se++){const He=n.get(ue[Se]);He.__webglTexture===void 0&&(He.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&je(I)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let Se=0;Se<ue.length;Se++){const Fe=ue[Se];X.__webglColorRenderbuffer[Se]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[Se]);const He=s.convert(Fe.format,Fe.colorSpace),fe=s.convert(Fe.type),Te=w(Fe.internalFormat,He,fe,Fe.colorSpace,I.isXRRenderTarget===!0),Re=tt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Re,Te,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,X.__webglColorRenderbuffer[Se])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),_e(X.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(te){t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,y);for(let Se=0;Se<6;Se++)if(y.mipmaps&&y.mipmaps.length>0)for(let Fe=0;Fe<y.mipmaps.length;Fe++)me(X.__webglFramebuffer[Se][Fe],I,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Fe);else me(X.__webglFramebuffer[Se],I,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0);x(y)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ie){for(let Se=0,Fe=ue.length;Se<Fe;Se++){const He=ue[Se],fe=n.get(He);t.bindTexture(i.TEXTURE_2D,fe.__webglTexture),Ve(i.TEXTURE_2D,He),me(X.__webglFramebuffer,I,He,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,0),x(He)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let Se=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Se=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Se,re.__webglTexture),Ve(Se,y),y.mipmaps&&y.mipmaps.length>0)for(let Fe=0;Fe<y.mipmaps.length;Fe++)me(X.__webglFramebuffer[Fe],I,y,i.COLOR_ATTACHMENT0,Se,Fe);else me(X.__webglFramebuffer,I,y,i.COLOR_ATTACHMENT0,Se,0);x(y)&&m(Se),t.unbindTexture()}I.depthBuffer&&Qe(I)}function ct(I){const y=I.textures;for(let X=0,re=y.length;X<re;X++){const ue=y[X];if(x(ue)){const te=P(I),Ie=n.get(ue).__webglTexture;t.bindTexture(te,Ie),m(te),t.unbindTexture()}}}const Ke=[],B=[];function Lt(I){if(I.samples>0){if(je(I)===!1){const y=I.textures,X=I.width,re=I.height;let ue=i.COLOR_BUFFER_BIT;const te=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ie=n.get(I),Se=y.length>1;if(Se)for(let He=0;He<y.length;He++)t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+He,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+He,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer);const Fe=I.texture.mipmaps;Fe&&Fe.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglFramebuffer);for(let He=0;He<y.length;He++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ue|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ue|=i.STENCIL_BUFFER_BIT)),Se){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ie.__webglColorRenderbuffer[He]);const fe=n.get(y[He]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,fe,0)}i.blitFramebuffer(0,0,X,re,0,0,X,re,ue,i.NEAREST),l===!0&&(Ke.length=0,B.length=0,Ke.push(i.COLOR_ATTACHMENT0+He),I.depthBuffer&&I.resolveDepthBuffer===!1&&(Ke.push(te),B.push(te),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,B)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ke))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Se)for(let He=0;He<y.length;He++){t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+He,i.RENDERBUFFER,Ie.__webglColorRenderbuffer[He]);const fe=n.get(y[He]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ie.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+He,i.TEXTURE_2D,fe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ie.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const y=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function tt(I){return Math.min(r.maxSamples,I.samples)}function je(I){const y=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Ne(I){const y=o.render.frame;f.get(I)!==y&&(f.set(I,y),I.update())}function ft(I,y){const X=I.colorSpace,re=I.format,ue=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||X!==Yn&&X!==wn&&(ot.getTransfer(X)===ut?(re!==jt||ue!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),y}function Ue(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(d.width=I.naturalWidth||I.width,d.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(d.width=I.displayWidth,d.height=I.displayHeight):(d.width=I.width,d.height=I.height),d}this.allocateTextureUnit=Y,this.resetTextureUnits=Z,this.setTexture2D=le,this.setTexture2DArray=ee,this.setTexture3D=ce,this.setTextureCube=Q,this.rebindTextures=ke,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=Qe,this.setupFrameBufferTexture=me,this.useMultisampledRTT=je}function kS(i,e){function t(n,r=wn){let s;const o=ot.getTransfer(r);if(n===Un)return i.UNSIGNED_BYTE;if(n===ga)return i.UNSIGNED_SHORT_4_4_4_4;if(n===_a)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ru)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===nu)return i.BYTE;if(n===iu)return i.SHORT;if(n===dr)return i.UNSIGNED_SHORT;if(n===ma)return i.INT;if(n===fi)return i.UNSIGNED_INT;if(n===Qt)return i.FLOAT;if(n===$t)return i.HALF_FLOAT;if(n===su)return i.ALPHA;if(n===ou)return i.RGB;if(n===jt)return i.RGBA;if(n===hr)return i.DEPTH_COMPONENT;if(n===pr)return i.DEPTH_STENCIL;if(n===va)return i.RED;if(n===xa)return i.RED_INTEGER;if(n===au)return i.RG;if(n===Sa)return i.RG_INTEGER;if(n===ya)return i.RGBA_INTEGER;if(n===ss||n===os||n===as||n===ls)if(o===ut)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===ss)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===os)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===as)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ls)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===ss)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===os)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===as)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ls)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Io||n===Do||n===Uo||n===Lo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Io)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Do)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Uo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Lo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===No||n===Fo||n===Oo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===No||n===Fo)return o===ut?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Oo)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Bo||n===zo||n===Vo||n===ko||n===Ho||n===Go||n===Wo||n===$o||n===Xo||n===qo||n===Yo||n===Ko||n===Zo||n===Jo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Bo)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===zo)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Vo)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ko)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ho)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Go)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wo)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===$o)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xo)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qo)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Yo)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ko)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Zo)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Jo)return o===ut?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===cs||n===Qo||n===jo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===cs)return o===ut?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===jo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===lu||n===ea||n===ta||n===na)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===cs)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ea)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ta)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===na)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===fr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const HS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,GS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class WS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new zt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ot({vertexShader:HS,fragmentShader:GS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new en(new bs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $S extends Gi{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,d=null,f=null,h=null,p=null,g=null,S=null;const E=new WS,x=t.getContextAttributes();let m=null,P=null;const w=[],T=[],z=new Ge;let F=null;const N=new Zt;N.viewport=new gt;const V=new Zt;V.viewport=new gt;const R=[N,V],M=new d_;let O=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let pe=w[j];return pe===void 0&&(pe=new no,w[j]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(j){let pe=w[j];return pe===void 0&&(pe=new no,w[j]=pe),pe.getGripSpace()},this.getHand=function(j){let pe=w[j];return pe===void 0&&(pe=new no,w[j]=pe),pe.getHandSpace()};function Y(j){const pe=T.indexOf(j.inputSource);if(pe===-1)return;const me=w[pe];me!==void 0&&(me.update(j.inputSource,j.frame,d||o),me.dispatchEvent({type:j.type,data:j.inputSource}))}function ie(){r.removeEventListener("select",Y),r.removeEventListener("selectstart",Y),r.removeEventListener("selectend",Y),r.removeEventListener("squeeze",Y),r.removeEventListener("squeezestart",Y),r.removeEventListener("squeezeend",Y),r.removeEventListener("end",ie),r.removeEventListener("inputsourceschange",le);for(let j=0;j<w.length;j++){const pe=T[j];pe!==null&&(T[j]=null,w[j].disconnect(pe))}O=null,Z=null,E.reset(),e.setRenderTarget(m),g=null,p=null,h=null,r=null,P=null,Je.stop(),n.isPresenting=!1,e.setPixelRatio(F),e.setSize(z.width,z.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||o},this.setReferenceSpace=function(j){d=j},this.getBaseLayer=function(){return p!==null?p:g},this.getBinding=function(){return h},this.getFrame=function(){return S},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",Y),r.addEventListener("selectstart",Y),r.addEventListener("selectend",Y),r.addEventListener("squeeze",Y),r.addEventListener("squeezestart",Y),r.addEventListener("squeezeend",Y),r.addEventListener("end",ie),r.addEventListener("inputsourceschange",le),x.xrCompatible!==!0&&await t.makeXRCompatible(),F=e.getPixelRatio(),e.getSize(z),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,_e=null,Pe=null;x.depth&&(Pe=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=x.stencil?pr:hr,_e=x.stencil?fr:fi);const Qe={colorFormat:t.RGBA8,depthFormat:Pe,scaleFactor:s};h=new XRWebGLBinding(r,t),p=h.createProjectionLayer(Qe),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),P=new fn(p.textureWidth,p.textureHeight,{format:jt,type:Un,depthTexture:new yu(p.textureWidth,p.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const me={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};g=new XRWebGLLayer(r,t,me),r.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),P=new fn(g.framebufferWidth,g.framebufferHeight,{format:jt,type:Un,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}P.isXRRenderTarget=!0,this.setFoveation(l),d=null,o=await r.requestReferenceSpace(a),Je.setContext(r),Je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return E.getDepthTexture()};function le(j){for(let pe=0;pe<j.removed.length;pe++){const me=j.removed[pe],_e=T.indexOf(me);_e>=0&&(T[_e]=null,w[_e].disconnect(me))}for(let pe=0;pe<j.added.length;pe++){const me=j.added[pe];let _e=T.indexOf(me);if(_e===-1){for(let Qe=0;Qe<w.length;Qe++)if(Qe>=T.length){T.push(me),_e=Qe;break}else if(T[Qe]===null){T[Qe]=me,_e=Qe;break}if(_e===-1)break}const Pe=w[_e];Pe&&Pe.connect(me)}}const ee=new $,ce=new $;function Q(j,pe,me){ee.setFromMatrixPosition(pe.matrixWorld),ce.setFromMatrixPosition(me.matrixWorld);const _e=ee.distanceTo(ce),Pe=pe.projectionMatrix.elements,Qe=me.projectionMatrix.elements,ke=Pe[14]/(Pe[10]-1),dt=Pe[14]/(Pe[10]+1),ct=(Pe[9]+1)/Pe[5],Ke=(Pe[9]-1)/Pe[5],B=(Pe[8]-1)/Pe[0],Lt=(Qe[8]+1)/Qe[0],tt=ke*B,je=ke*Lt,Ne=_e/(-B+Lt),ft=Ne*-B;if(pe.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(ft),j.translateZ(Ne),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Pe[10]===-1)j.projectionMatrix.copy(pe.projectionMatrix),j.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const Ue=ke+Ne,I=dt+Ne,y=tt-ft,X=je+(_e-ft),re=ct*dt/I*Ue,ue=Ke*dt/I*Ue;j.projectionMatrix.makePerspective(y,X,re,ue,Ue,I),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ge(j,pe){pe===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(pe.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let pe=j.near,me=j.far;E.texture!==null&&(E.depthNear>0&&(pe=E.depthNear),E.depthFar>0&&(me=E.depthFar)),M.near=V.near=N.near=pe,M.far=V.far=N.far=me,(O!==M.near||Z!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),O=M.near,Z=M.far),N.layers.mask=j.layers.mask|2,V.layers.mask=j.layers.mask|4,M.layers.mask=N.layers.mask|V.layers.mask;const _e=j.parent,Pe=M.cameras;ge(M,_e);for(let Qe=0;Qe<Pe.length;Qe++)ge(Pe[Qe],_e);Pe.length===2?Q(M,N,V):M.projectionMatrix.copy(N.projectionMatrix),ve(j,M,_e)};function ve(j,pe,me){me===null?j.matrix.copy(pe.matrixWorld):(j.matrix.copy(me.matrixWorld),j.matrix.invert(),j.matrix.multiply(pe.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(pe.projectionMatrix),j.projectionMatrixInverse.copy(pe.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ra*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(p===null&&g===null))return l},this.setFoveation=function(j){l=j,p!==null&&(p.fixedFoveation=j),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=j)},this.hasDepthSensing=function(){return E.texture!==null},this.getDepthSensingMesh=function(){return E.getMesh(M)};let be=null;function Ve(j,pe){if(f=pe.getViewerPose(d||o),S=pe,f!==null){const me=f.views;g!==null&&(e.setRenderTargetFramebuffer(P,g.framebuffer),e.setRenderTarget(P));let _e=!1;me.length!==M.cameras.length&&(M.cameras.length=0,_e=!0);for(let ke=0;ke<me.length;ke++){const dt=me[ke];let ct=null;if(g!==null)ct=g.getViewport(dt);else{const B=h.getViewSubImage(p,dt);ct=B.viewport,ke===0&&(e.setRenderTargetTextures(P,B.colorTexture,B.depthStencilTexture),e.setRenderTarget(P))}let Ke=R[ke];Ke===void 0&&(Ke=new Zt,Ke.layers.enable(ke),Ke.viewport=new gt,R[ke]=Ke),Ke.matrix.fromArray(dt.transform.matrix),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),Ke.projectionMatrix.fromArray(dt.projectionMatrix),Ke.projectionMatrixInverse.copy(Ke.projectionMatrix).invert(),Ke.viewport.set(ct.x,ct.y,ct.width,ct.height),ke===0&&(M.matrix.copy(Ke.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),_e===!0&&M.cameras.push(Ke)}const Pe=r.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&h){const ke=h.getDepthInformation(me[0]);ke&&ke.isValid&&ke.texture&&E.init(e,ke,r.renderState)}}for(let me=0;me<w.length;me++){const _e=T[me],Pe=w[me];_e!==null&&Pe!==void 0&&Pe.update(_e,pe,d||o)}be&&be(j,pe),pe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pe}),S=null}const Je=new Mu;Je.setAnimationLoop(Ve),this.setAnimationLoop=function(j){be=j},this.dispose=function(){}}}const ri=new hn,XS=new St;function qS(i,e){function t(x,m){x.matrixAutoUpdate===!0&&x.updateMatrix(),m.value.copy(x.matrix)}function n(x,m){m.color.getRGB(x.fogColor.value,_u(i)),m.isFog?(x.fogNear.value=m.near,x.fogFar.value=m.far):m.isFogExp2&&(x.fogDensity.value=m.density)}function r(x,m,P,w,T){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(x,m):m.isMeshToonMaterial?(s(x,m),h(x,m)):m.isMeshPhongMaterial?(s(x,m),f(x,m)):m.isMeshStandardMaterial?(s(x,m),p(x,m),m.isMeshPhysicalMaterial&&g(x,m,T)):m.isMeshMatcapMaterial?(s(x,m),S(x,m)):m.isMeshDepthMaterial?s(x,m):m.isMeshDistanceMaterial?(s(x,m),E(x,m)):m.isMeshNormalMaterial?s(x,m):m.isLineBasicMaterial?(o(x,m),m.isLineDashedMaterial&&a(x,m)):m.isPointsMaterial?l(x,m,P,w):m.isSpriteMaterial?d(x,m):m.isShadowMaterial?(x.color.value.copy(m.color),x.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(x,m){x.opacity.value=m.opacity,m.color&&x.diffuse.value.copy(m.color),m.emissive&&x.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.bumpMap&&(x.bumpMap.value=m.bumpMap,t(m.bumpMap,x.bumpMapTransform),x.bumpScale.value=m.bumpScale,m.side===Bt&&(x.bumpScale.value*=-1)),m.normalMap&&(x.normalMap.value=m.normalMap,t(m.normalMap,x.normalMapTransform),x.normalScale.value.copy(m.normalScale),m.side===Bt&&x.normalScale.value.negate()),m.displacementMap&&(x.displacementMap.value=m.displacementMap,t(m.displacementMap,x.displacementMapTransform),x.displacementScale.value=m.displacementScale,x.displacementBias.value=m.displacementBias),m.emissiveMap&&(x.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,x.emissiveMapTransform)),m.specularMap&&(x.specularMap.value=m.specularMap,t(m.specularMap,x.specularMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest);const P=e.get(m),w=P.envMap,T=P.envMapRotation;w&&(x.envMap.value=w,ri.copy(T),ri.x*=-1,ri.y*=-1,ri.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),x.envMapRotation.value.setFromMatrix4(XS.makeRotationFromEuler(ri)),x.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=m.reflectivity,x.ior.value=m.ior,x.refractionRatio.value=m.refractionRatio),m.lightMap&&(x.lightMap.value=m.lightMap,x.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,x.lightMapTransform)),m.aoMap&&(x.aoMap.value=m.aoMap,x.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,x.aoMapTransform))}function o(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform))}function a(x,m){x.dashSize.value=m.dashSize,x.totalSize.value=m.dashSize+m.gapSize,x.scale.value=m.scale}function l(x,m,P,w){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.size.value=m.size*P,x.scale.value=w*.5,m.map&&(x.map.value=m.map,t(m.map,x.uvTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function d(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.rotation.value=m.rotation,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function f(x,m){x.specular.value.copy(m.specular),x.shininess.value=Math.max(m.shininess,1e-4)}function h(x,m){m.gradientMap&&(x.gradientMap.value=m.gradientMap)}function p(x,m){x.metalness.value=m.metalness,m.metalnessMap&&(x.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,x.metalnessMapTransform)),x.roughness.value=m.roughness,m.roughnessMap&&(x.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,x.roughnessMapTransform)),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)}function g(x,m,P){x.ior.value=m.ior,m.sheen>0&&(x.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),x.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(x.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,x.sheenColorMapTransform)),m.sheenRoughnessMap&&(x.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,x.sheenRoughnessMapTransform))),m.clearcoat>0&&(x.clearcoat.value=m.clearcoat,x.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(x.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,x.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(x.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Bt&&x.clearcoatNormalScale.value.negate())),m.dispersion>0&&(x.dispersion.value=m.dispersion),m.iridescence>0&&(x.iridescence.value=m.iridescence,x.iridescenceIOR.value=m.iridescenceIOR,x.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(x.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,x.iridescenceMapTransform)),m.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),m.transmission>0&&(x.transmission.value=m.transmission,x.transmissionSamplerMap.value=P.texture,x.transmissionSamplerSize.value.set(P.width,P.height),m.transmissionMap&&(x.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,x.transmissionMapTransform)),x.thickness.value=m.thickness,m.thicknessMap&&(x.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=m.attenuationDistance,x.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(x.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(x.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=m.specularIntensity,x.specularColor.value.copy(m.specularColor),m.specularColorMap&&(x.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,x.specularColorMapTransform)),m.specularIntensityMap&&(x.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,x.specularIntensityMapTransform))}function S(x,m){m.matcap&&(x.matcap.value=m.matcap)}function E(x,m){const P=e.get(m).light;x.referencePosition.value.setFromMatrixPosition(P.matrixWorld),x.nearDistance.value=P.shadow.camera.near,x.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function YS(i,e,t,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(P,w){const T=w.program;n.uniformBlockBinding(P,T)}function d(P,w){let T=r[P.id];T===void 0&&(S(P),T=f(P),r[P.id]=T,P.addEventListener("dispose",x));const z=w.program;n.updateUBOMapping(P,z);const F=e.render.frame;s[P.id]!==F&&(p(P),s[P.id]=F)}function f(P){const w=h();P.__bindingPointIndex=w;const T=i.createBuffer(),z=P.__size,F=P.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,z,F),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,T),T}function h(){for(let P=0;P<a;P++)if(o.indexOf(P)===-1)return o.push(P),P;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(P){const w=r[P.id],T=P.uniforms,z=P.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let F=0,N=T.length;F<N;F++){const V=Array.isArray(T[F])?T[F]:[T[F]];for(let R=0,M=V.length;R<M;R++){const O=V[R];if(g(O,F,R,z)===!0){const Z=O.__offset,Y=Array.isArray(O.value)?O.value:[O.value];let ie=0;for(let le=0;le<Y.length;le++){const ee=Y[le],ce=E(ee);typeof ee=="number"||typeof ee=="boolean"?(O.__data[0]=ee,i.bufferSubData(i.UNIFORM_BUFFER,Z+ie,O.__data)):ee.isMatrix3?(O.__data[0]=ee.elements[0],O.__data[1]=ee.elements[1],O.__data[2]=ee.elements[2],O.__data[3]=0,O.__data[4]=ee.elements[3],O.__data[5]=ee.elements[4],O.__data[6]=ee.elements[5],O.__data[7]=0,O.__data[8]=ee.elements[6],O.__data[9]=ee.elements[7],O.__data[10]=ee.elements[8],O.__data[11]=0):(ee.toArray(O.__data,ie),ie+=ce.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,Z,O.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(P,w,T,z){const F=P.value,N=w+"_"+T;if(z[N]===void 0)return typeof F=="number"||typeof F=="boolean"?z[N]=F:z[N]=F.clone(),!0;{const V=z[N];if(typeof F=="number"||typeof F=="boolean"){if(V!==F)return z[N]=F,!0}else if(V.equals(F)===!1)return V.copy(F),!0}return!1}function S(P){const w=P.uniforms;let T=0;const z=16;for(let N=0,V=w.length;N<V;N++){const R=Array.isArray(w[N])?w[N]:[w[N]];for(let M=0,O=R.length;M<O;M++){const Z=R[M],Y=Array.isArray(Z.value)?Z.value:[Z.value];for(let ie=0,le=Y.length;ie<le;ie++){const ee=Y[ie],ce=E(ee),Q=T%z,ge=Q%ce.boundary,ve=Q+ge;T+=ge,ve!==0&&z-ve<ce.storage&&(T+=z-ve),Z.__data=new Float32Array(ce.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=T,T+=ce.storage}}}const F=T%z;return F>0&&(T+=z-F),P.__size=T,P.__cache={},this}function E(P){const w={boundary:0,storage:0};return typeof P=="number"||typeof P=="boolean"?(w.boundary=4,w.storage=4):P.isVector2?(w.boundary=8,w.storage=8):P.isVector3||P.isColor?(w.boundary=16,w.storage=12):P.isVector4?(w.boundary=16,w.storage=16):P.isMatrix3?(w.boundary=48,w.storage=48):P.isMatrix4?(w.boundary=64,w.storage=64):P.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",P),w}function x(P){const w=P.target;w.removeEventListener("dispose",x);const T=o.indexOf(w.__bindingPointIndex);o.splice(T,1),i.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function m(){for(const P in r)i.deleteBuffer(r[P]);o=[],r={},s={}}return{bind:l,update:d,dispose:m}}class KS{constructor(e={}){const{canvas:t=yg(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:d=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;const S=new Uint32Array(4),E=new Int32Array(4);let x=null,m=null;const P=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Xn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const T=this;let z=!1;this._outputColorSpace=Kt;let F=0,N=0,V=null,R=-1,M=null;const O=new gt,Z=new gt;let Y=null;const ie=new it(0);let le=0,ee=t.width,ce=t.height,Q=1,ge=null,ve=null;const be=new gt(0,0,ee,ce),Ve=new gt(0,0,ee,ce);let Je=!1;const j=new Su;let pe=!1,me=!1;const _e=new St,Pe=new St,Qe=new $,ke=new gt,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ct=!1;function Ke(){return V===null?Q:1}let B=n;function Lt(v,C){return t.getContext(v,C)}try{const v={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:d,powerPreference:f,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${pa}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",ye,!1),B===null){const C="webgl2";if(B=Lt(C,v),B===null)throw Lt(C)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let tt,je,Ne,ft,Ue,I,y,X,re,ue,te,Ie,Se,Fe,He,fe,Te,Re,De,Me,We,Oe,$e,H;function q(){tt=new sx(B),tt.init(),Oe=new kS(B,tt),je=new Q0(B,tt,e,Oe),Ne=new zS(B,tt),je.reverseDepthBuffer&&p&&Ne.buffers.depth.setReversed(!0),ft=new lx(B),Ue=new CS,I=new VS(B,tt,Ne,Ue,je,Oe,ft),y=new ex(T),X=new rx(T),re=new p_(B),$e=new Z0(B,re),ue=new ox(B,re,ft,$e),te=new ux(B,ue,re,ft),De=new cx(B,je,I),fe=new j0(Ue),Ie=new AS(T,y,X,tt,je,$e,fe),Se=new qS(T,Ue),Fe=new RS,He=new LS(tt),Re=new K0(T,y,X,Ne,te,g,l),Te=new OS(T,te,je),H=new YS(B,ft,je,Ne),Me=new J0(B,tt,ft),We=new ax(B,tt,ft),ft.programs=Ie.programs,T.capabilities=je,T.extensions=tt,T.properties=Ue,T.renderLists=Fe,T.shadowMap=Te,T.state=Ne,T.info=ft}q();const J=new $S(T,B);this.xr=J,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const v=tt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=tt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(v){v!==void 0&&(Q=v,this.setSize(ee,ce,!1))},this.getSize=function(v){return v.set(ee,ce)},this.setSize=function(v,C,b=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ee=v,ce=C,t.width=Math.floor(v*Q),t.height=Math.floor(C*Q),b===!0&&(t.style.width=v+"px",t.style.height=C+"px"),this.setViewport(0,0,v,C)},this.getDrawingBufferSize=function(v){return v.set(ee*Q,ce*Q).floor()},this.setDrawingBufferSize=function(v,C,b){ee=v,ce=C,Q=b,t.width=Math.floor(v*b),t.height=Math.floor(C*b),this.setViewport(0,0,v,C)},this.getCurrentViewport=function(v){return v.copy(O)},this.getViewport=function(v){return v.copy(be)},this.setViewport=function(v,C,b,L){v.isVector4?be.set(v.x,v.y,v.z,v.w):be.set(v,C,b,L),Ne.viewport(O.copy(be).multiplyScalar(Q).round())},this.getScissor=function(v){return v.copy(Ve)},this.setScissor=function(v,C,b,L){v.isVector4?Ve.set(v.x,v.y,v.z,v.w):Ve.set(v,C,b,L),Ne.scissor(Z.copy(Ve).multiplyScalar(Q).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(v){Ne.setScissorTest(Je=v)},this.setOpaqueSort=function(v){ge=v},this.setTransparentSort=function(v){ve=v},this.getClearColor=function(v){return v.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(v=!0,C=!0,b=!0){let L=0;if(v){let D=!1;if(V!==null){const k=V.texture.format;D=k===ya||k===Sa||k===xa}if(D){const k=V.texture.type,G=k===Un||k===fi||k===dr||k===fr||k===ga||k===_a,W=Re.getClearColor(),K=Re.getClearAlpha(),se=W.r,ne=W.g,ae=W.b;G?(S[0]=se,S[1]=ne,S[2]=ae,S[3]=K,B.clearBufferuiv(B.COLOR,0,S)):(E[0]=se,E[1]=ne,E[2]=ae,E[3]=K,B.clearBufferiv(B.COLOR,0,E))}else L|=B.COLOR_BUFFER_BIT}C&&(L|=B.DEPTH_BUFFER_BIT),b&&(L|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(L)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),Re.dispose(),Fe.dispose(),He.dispose(),Ue.dispose(),y.dispose(),X.dispose(),te.dispose(),$e.dispose(),H.dispose(),Ie.dispose(),J.dispose(),J.removeEventListener("sessionstart",Ar),J.removeEventListener("sessionend",Cr),_n.stop()};function oe(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),z=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),z=!1;const v=ft.autoReset,C=Te.enabled,b=Te.autoUpdate,L=Te.needsUpdate,D=Te.type;q(),ft.autoReset=v,Te.enabled=C,Te.autoUpdate=b,Te.needsUpdate=L,Te.type=D}function ye(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Xe(v){const C=v.target;C.removeEventListener("dispose",Xe),mt(C)}function mt(v){At(v),Ue.remove(v)}function At(v){const C=Ue.get(v).programs;C!==void 0&&(C.forEach(function(b){Ie.releaseProgram(b)}),v.isShaderMaterial&&Ie.releaseShaderCache(v))}this.renderBufferDirect=function(v,C,b,L,D,k){C===null&&(C=dt);const G=D.isMesh&&D.matrixWorld.determinant()<0,W=Is(v,C,b,L,D);Ne.setMaterial(L,G);let K=b.index,se=1;if(L.wireframe===!0){if(K=ue.getWireframeAttribute(b),K===void 0)return;se=2}const ne=b.drawRange,ae=b.attributes.position;let de=ne.start*se,he=(ne.start+ne.count)*se;k!==null&&(de=Math.max(de,k.start*se),he=Math.min(he,(k.start+k.count)*se)),K!==null?(de=Math.max(de,0),he=Math.min(he,K.count)):ae!=null&&(de=Math.max(de,0),he=Math.min(he,ae.count));const Ce=he-de;if(Ce<0||Ce===1/0)return;$e.setup(D,L,W,b,K);let Be,Le=Me;if(K!==null&&(Be=re.get(K),Le=We,Le.setIndex(Be)),D.isMesh)L.wireframe===!0?(Ne.setLineWidth(L.wireframeLinewidth*Ke()),Le.setMode(B.LINES)):Le.setMode(B.TRIANGLES);else if(D.isLine){let Ae=L.linewidth;Ae===void 0&&(Ae=1),Ne.setLineWidth(Ae*Ke()),D.isLineSegments?Le.setMode(B.LINES):D.isLineLoop?Le.setMode(B.LINE_LOOP):Le.setMode(B.LINE_STRIP)}else D.isPoints?Le.setMode(B.POINTS):D.isSprite&&Le.setMode(B.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)us("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Le.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(tt.get("WEBGL_multi_draw"))Le.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const Ae=D._multiDrawStarts,qe=D._multiDrawCounts,we=D._multiDrawCount,lt=K?re.get(K).bytesPerElement:1,yt=Ue.get(L).currentProgram.getUniforms();for(let st=0;st<we;st++)yt.setValue(B,"_gl_DrawID",st),Le.render(Ae[st]/lt,qe[st])}else if(D.isInstancedMesh)Le.renderInstances(de,Ce,D.count);else if(b.isInstancedBufferGeometry){const Ae=b._maxInstanceCount!==void 0?b._maxInstanceCount:1/0,qe=Math.min(b.instanceCount,Ae);Le.renderInstances(de,Ce,qe)}else Le.render(de,Ce)};function at(v,C,b){v.transparent===!0&&v.side===Cn&&v.forceSinglePass===!1?(v.side=Bt,v.needsUpdate=!0,pi(v,C,b),v.side=qn,v.needsUpdate=!0,pi(v,C,b),v.side=Cn):pi(v,C,b)}this.compile=function(v,C,b=null){b===null&&(b=v),m=He.get(b),m.init(C),w.push(m),b.traverseVisible(function(D){D.isLight&&D.layers.test(C.layers)&&(m.pushLight(D),D.castShadow&&m.pushShadow(D))}),v!==b&&v.traverseVisible(function(D){D.isLight&&D.layers.test(C.layers)&&(m.pushLight(D),D.castShadow&&m.pushShadow(D))}),m.setupLights();const L=new Set;return v.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const k=D.material;if(k)if(Array.isArray(k))for(let G=0;G<k.length;G++){const W=k[G];at(W,b,D),L.add(W)}else at(k,b,D),L.add(k)}),m=w.pop(),L},this.compileAsync=function(v,C,b=null){const L=this.compile(v,C,b);return new Promise(D=>{function k(){if(L.forEach(function(G){Ue.get(G).currentProgram.isReady()&&L.delete(G)}),L.size===0){D(v);return}setTimeout(k,10)}tt.get("KHR_parallel_shader_compile")!==null?k():setTimeout(k,10)})};let Ht=null;function sn(v){Ht&&Ht(v)}function Ar(){_n.stop()}function Cr(){_n.start()}const _n=new Mu;_n.setAnimationLoop(sn),typeof self<"u"&&_n.setContext(self),this.setAnimationLoop=function(v){Ht=v,J.setAnimationLoop(v),v===null?_n.stop():_n.start()},J.addEventListener("sessionstart",Ar),J.addEventListener("sessionend",Cr),this.render=function(v,C){if(C!==void 0&&C.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(z===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),C.parent===null&&C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(C),C=J.getCamera()),v.isScene===!0&&v.onBeforeRender(T,v,C,V),m=He.get(v,w.length),m.init(C),w.push(m),Pe.multiplyMatrices(C.projectionMatrix,C.matrixWorldInverse),j.setFromProjectionMatrix(Pe),me=this.localClippingEnabled,pe=fe.init(this.clippingPlanes,me),x=Fe.get(v,P.length),x.init(),P.push(x),J.enabled===!0&&J.isPresenting===!0){const k=T.xr.getDepthSensingMesh();k!==null&&Xi(k,C,-1/0,T.sortObjects)}Xi(v,C,0,T.sortObjects),x.finish(),T.sortObjects===!0&&x.sort(ge,ve),ct=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,ct&&Re.addToRenderList(x,v),this.info.render.frame++,pe===!0&&fe.beginShadows();const b=m.state.shadowsArray;Te.render(b,v,C),pe===!0&&fe.endShadows(),this.info.autoReset===!0&&this.info.reset();const L=x.opaque,D=x.transmissive;if(m.setupLights(),C.isArrayCamera){const k=C.cameras;if(D.length>0)for(let G=0,W=k.length;G<W;G++){const K=k[G];wr(L,D,v,K)}ct&&Re.render(v);for(let G=0,W=k.length;G<W;G++){const K=k[G];qi(x,v,K,K.viewport)}}else D.length>0&&wr(L,D,v,C),ct&&Re.render(v),qi(x,v,C);V!==null&&N===0&&(I.updateMultisampleRenderTarget(V),I.updateRenderTargetMipmap(V)),v.isScene===!0&&v.onAfterRender(T,v,C),$e.resetDefaultState(),R=-1,M=null,w.pop(),w.length>0?(m=w[w.length-1],pe===!0&&fe.setGlobalState(T.clippingPlanes,m.state.camera)):m=null,P.pop(),P.length>0?x=P[P.length-1]:x=null};function Xi(v,C,b,L){if(v.visible===!1)return;if(v.layers.test(C.layers)){if(v.isGroup)b=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(C);else if(v.isLight)m.pushLight(v),v.castShadow&&m.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||j.intersectsSprite(v)){L&&ke.setFromMatrixPosition(v.matrixWorld).applyMatrix4(Pe);const G=te.update(v),W=v.material;W.visible&&x.push(v,G,W,b,ke.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||j.intersectsObject(v))){const G=te.update(v),W=v.material;if(L&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),ke.copy(v.boundingSphere.center)):(G.boundingSphere===null&&G.computeBoundingSphere(),ke.copy(G.boundingSphere.center)),ke.applyMatrix4(v.matrixWorld).applyMatrix4(Pe)),Array.isArray(W)){const K=G.groups;for(let se=0,ne=K.length;se<ne;se++){const ae=K[se],de=W[ae.materialIndex];de&&de.visible&&x.push(v,G,de,b,ke.z,ae)}}else W.visible&&x.push(v,G,W,b,ke.z,null)}}const k=v.children;for(let G=0,W=k.length;G<W;G++)Xi(k[G],C,b,L)}function qi(v,C,b,L){const D=v.opaque,k=v.transmissive,G=v.transparent;m.setupLightsView(b),pe===!0&&fe.setGlobalState(T.clippingPlanes,b),L&&Ne.viewport(O.copy(L)),D.length>0&&hi(D,C,b),k.length>0&&hi(k,C,b),G.length>0&&hi(G,C,b),Ne.buffers.depth.setTest(!0),Ne.buffers.depth.setMask(!0),Ne.buffers.color.setMask(!0),Ne.setPolygonOffset(!1)}function wr(v,C,b,L){if((b.isScene===!0?b.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[L.id]===void 0&&(m.state.transmissionRenderTarget[L.id]=new fn(1,1,{generateMipmaps:!0,type:tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float")?$t:Un,minFilter:Wn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ot.workingColorSpace}));const k=m.state.transmissionRenderTarget[L.id],G=L.viewport||O;k.setSize(G.z*T.transmissionResolutionScale,G.w*T.transmissionResolutionScale);const W=T.getRenderTarget();T.setRenderTarget(k),T.getClearColor(ie),le=T.getClearAlpha(),le<1&&T.setClearColor(16777215,.5),T.clear(),ct&&Re.render(b);const K=T.toneMapping;T.toneMapping=Xn;const se=L.viewport;if(L.viewport!==void 0&&(L.viewport=void 0),m.setupLightsView(L),pe===!0&&fe.setGlobalState(T.clippingPlanes,L),hi(v,b,L),I.updateMultisampleRenderTarget(k),I.updateRenderTargetMipmap(k),tt.has("WEBGL_multisampled_render_to_texture")===!1){let ne=!1;for(let ae=0,de=C.length;ae<de;ae++){const he=C[ae],Ce=he.object,Be=he.geometry,Le=he.material,Ae=he.group;if(Le.side===Cn&&Ce.layers.test(L.layers)){const qe=Le.side;Le.side=Bt,Le.needsUpdate=!0,Rr(Ce,b,L,Be,Le,Ae),Le.side=qe,Le.needsUpdate=!0,ne=!0}}ne===!0&&(I.updateMultisampleRenderTarget(k),I.updateRenderTargetMipmap(k))}T.setRenderTarget(W),T.setClearColor(ie,le),se!==void 0&&(L.viewport=se),T.toneMapping=K}function hi(v,C,b){const L=C.isScene===!0?C.overrideMaterial:null;for(let D=0,k=v.length;D<k;D++){const G=v[D],W=G.object,K=G.geometry,se=G.group;let ne=G.material;ne.allowOverride===!0&&L!==null&&(ne=L),W.layers.test(b.layers)&&Rr(W,C,b,K,ne,se)}}function Rr(v,C,b,L,D,k){v.onBeforeRender(T,C,b,L,D,k),v.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),D.onBeforeRender(T,C,b,L,v,k),D.transparent===!0&&D.side===Cn&&D.forceSinglePass===!1?(D.side=Bt,D.needsUpdate=!0,T.renderBufferDirect(b,C,L,D,v,k),D.side=qn,D.needsUpdate=!0,T.renderBufferDirect(b,C,L,D,v,k),D.side=Cn):T.renderBufferDirect(b,C,L,D,v,k),v.onAfterRender(T,C,b,L,D,k)}function pi(v,C,b){C.isScene!==!0&&(C=dt);const L=Ue.get(v),D=m.state.lights,k=m.state.shadowsArray,G=D.state.version,W=Ie.getParameters(v,D.state,k,C,b),K=Ie.getProgramCacheKey(W);let se=L.programs;L.environment=v.isMeshStandardMaterial?C.environment:null,L.fog=C.fog,L.envMap=(v.isMeshStandardMaterial?X:y).get(v.envMap||L.environment),L.envMapRotation=L.environment!==null&&v.envMap===null?C.environmentRotation:v.envMapRotation,se===void 0&&(v.addEventListener("dispose",Xe),se=new Map,L.programs=se);let ne=se.get(K);if(ne!==void 0){if(L.currentProgram===ne&&L.lightsStateVersion===G)return Ki(v,W),ne}else W.uniforms=Ie.getUniforms(v),v.onBeforeCompile(W,T),ne=Ie.acquireProgram(W,K),se.set(K,ne),L.uniforms=W.uniforms;const ae=L.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(ae.clippingPlanes=fe.uniform),Ki(v,W),L.needsLights=Nn(v),L.lightsStateVersion=G,L.needsLights&&(ae.ambientLightColor.value=D.state.ambient,ae.lightProbe.value=D.state.probe,ae.directionalLights.value=D.state.directional,ae.directionalLightShadows.value=D.state.directionalShadow,ae.spotLights.value=D.state.spot,ae.spotLightShadows.value=D.state.spotShadow,ae.rectAreaLights.value=D.state.rectArea,ae.ltc_1.value=D.state.rectAreaLTC1,ae.ltc_2.value=D.state.rectAreaLTC2,ae.pointLights.value=D.state.point,ae.pointLightShadows.value=D.state.pointShadow,ae.hemisphereLights.value=D.state.hemi,ae.directionalShadowMap.value=D.state.directionalShadowMap,ae.directionalShadowMatrix.value=D.state.directionalShadowMatrix,ae.spotShadowMap.value=D.state.spotShadowMap,ae.spotLightMatrix.value=D.state.spotLightMatrix,ae.spotLightMap.value=D.state.spotLightMap,ae.pointShadowMap.value=D.state.pointShadowMap,ae.pointShadowMatrix.value=D.state.pointShadowMatrix),L.currentProgram=ne,L.uniformsList=null,ne}function Yi(v){if(v.uniformsList===null){const C=v.currentProgram.getUniforms();v.uniformsList=ds.seqWithValue(C.seq,v.uniforms)}return v.uniformsList}function Ki(v,C){const b=Ue.get(v);b.outputColorSpace=C.outputColorSpace,b.batching=C.batching,b.batchingColor=C.batchingColor,b.instancing=C.instancing,b.instancingColor=C.instancingColor,b.instancingMorph=C.instancingMorph,b.skinning=C.skinning,b.morphTargets=C.morphTargets,b.morphNormals=C.morphNormals,b.morphColors=C.morphColors,b.morphTargetsCount=C.morphTargetsCount,b.numClippingPlanes=C.numClippingPlanes,b.numIntersection=C.numClipIntersection,b.vertexAlphas=C.vertexAlphas,b.vertexTangents=C.vertexTangents,b.toneMapping=C.toneMapping}function Is(v,C,b,L,D){C.isScene!==!0&&(C=dt),I.resetTextureUnits();const k=C.fog,G=L.isMeshStandardMaterial?C.environment:null,W=V===null?T.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:Yn,K=(L.isMeshStandardMaterial?X:y).get(L.envMap||G),se=L.vertexColors===!0&&!!b.attributes.color&&b.attributes.color.itemSize===4,ne=!!b.attributes.tangent&&(!!L.normalMap||L.anisotropy>0),ae=!!b.morphAttributes.position,de=!!b.morphAttributes.normal,he=!!b.morphAttributes.color;let Ce=Xn;L.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(Ce=T.toneMapping);const Be=b.morphAttributes.position||b.morphAttributes.normal||b.morphAttributes.color,Le=Be!==void 0?Be.length:0,Ae=Ue.get(L),qe=m.state.lights;if(pe===!0&&(me===!0||v!==M)){const ht=v===M&&L.id===R;fe.setState(L,v,ht)}let we=!1;L.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==qe.state.version||Ae.outputColorSpace!==W||D.isBatchedMesh&&Ae.batching===!1||!D.isBatchedMesh&&Ae.batching===!0||D.isBatchedMesh&&Ae.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&Ae.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&Ae.instancing===!1||!D.isInstancedMesh&&Ae.instancing===!0||D.isSkinnedMesh&&Ae.skinning===!1||!D.isSkinnedMesh&&Ae.skinning===!0||D.isInstancedMesh&&Ae.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&Ae.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&Ae.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&Ae.instancingMorph===!1&&D.morphTexture!==null||Ae.envMap!==K||L.fog===!0&&Ae.fog!==k||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==fe.numPlanes||Ae.numIntersection!==fe.numIntersection)||Ae.vertexAlphas!==se||Ae.vertexTangents!==ne||Ae.morphTargets!==ae||Ae.morphNormals!==de||Ae.morphColors!==he||Ae.toneMapping!==Ce||Ae.morphTargetsCount!==Le)&&(we=!0):(we=!0,Ae.__version=L.version);let lt=Ae.currentProgram;we===!0&&(lt=pi(L,C,D));let yt=!1,st=!1,nt=!1;const ze=lt.getUniforms(),_t=Ae.uniforms;if(Ne.useProgram(lt.program)&&(yt=!0,st=!0,nt=!0),L.id!==R&&(R=L.id,st=!0),yt||M!==v){Ne.buffers.depth.getReversed()?(_e.copy(v.projectionMatrix),Mg(_e),Tg(_e),ze.setValue(B,"projectionMatrix",_e)):ze.setValue(B,"projectionMatrix",v.projectionMatrix),ze.setValue(B,"viewMatrix",v.matrixWorldInverse);const Et=ze.map.cameraPosition;Et!==void 0&&Et.setValue(B,Qe.setFromMatrixPosition(v.matrixWorld)),je.logarithmicDepthBuffer&&ze.setValue(B,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(L.isMeshPhongMaterial||L.isMeshToonMaterial||L.isMeshLambertMaterial||L.isMeshBasicMaterial||L.isMeshStandardMaterial||L.isShaderMaterial)&&ze.setValue(B,"isOrthographic",v.isOrthographicCamera===!0),M!==v&&(M=v,st=!0,nt=!0)}if(D.isSkinnedMesh){ze.setOptional(B,D,"bindMatrix"),ze.setOptional(B,D,"bindMatrixInverse");const ht=D.skeleton;ht&&(ht.boneTexture===null&&ht.computeBoneTexture(),ze.setValue(B,"boneTexture",ht.boneTexture,I))}D.isBatchedMesh&&(ze.setOptional(B,D,"batchingTexture"),ze.setValue(B,"batchingTexture",D._matricesTexture,I),ze.setOptional(B,D,"batchingIdTexture"),ze.setValue(B,"batchingIdTexture",D._indirectTexture,I),ze.setOptional(B,D,"batchingColorTexture"),D._colorsTexture!==null&&ze.setValue(B,"batchingColorTexture",D._colorsTexture,I));const Ct=b.morphAttributes;if((Ct.position!==void 0||Ct.normal!==void 0||Ct.color!==void 0)&&De.update(D,b,lt),(st||Ae.receiveShadow!==D.receiveShadow)&&(Ae.receiveShadow=D.receiveShadow,ze.setValue(B,"receiveShadow",D.receiveShadow)),L.isMeshGouraudMaterial&&L.envMap!==null&&(_t.envMap.value=K,_t.flipEnvMap.value=K.isCubeTexture&&K.isRenderTargetTexture===!1?-1:1),L.isMeshStandardMaterial&&L.envMap===null&&C.environment!==null&&(_t.envMapIntensity.value=C.environmentIntensity),st&&(ze.setValue(B,"toneMappingExposure",T.toneMappingExposure),Ae.needsLights&&vn(_t,nt),k&&L.fog===!0&&Se.refreshFogUniforms(_t,k),Se.refreshMaterialUniforms(_t,L,Q,ce,m.state.transmissionRenderTarget[v.id]),ds.upload(B,Yi(Ae),_t,I)),L.isShaderMaterial&&L.uniformsNeedUpdate===!0&&(ds.upload(B,Yi(Ae),_t,I),L.uniformsNeedUpdate=!1),L.isSpriteMaterial&&ze.setValue(B,"center",D.center),ze.setValue(B,"modelViewMatrix",D.modelViewMatrix),ze.setValue(B,"normalMatrix",D.normalMatrix),ze.setValue(B,"modelMatrix",D.matrixWorld),L.isShaderMaterial||L.isRawShaderMaterial){const ht=L.uniformsGroups;for(let Et=0,Ds=ht.length;Et<Ds;Et++){const Jn=ht[Et];H.update(Jn,lt),H.bind(Jn,lt)}}return lt}function vn(v,C){v.ambientLightColor.needsUpdate=C,v.lightProbe.needsUpdate=C,v.directionalLights.needsUpdate=C,v.directionalLightShadows.needsUpdate=C,v.pointLights.needsUpdate=C,v.pointLightShadows.needsUpdate=C,v.spotLights.needsUpdate=C,v.spotLightShadows.needsUpdate=C,v.rectAreaLights.needsUpdate=C,v.hemisphereLights.needsUpdate=C}function Nn(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(v,C,b){const L=Ue.get(v);L.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,L.__autoAllocateDepthBuffer===!1&&(L.__useRenderToTexture=!1),Ue.get(v.texture).__webglTexture=C,Ue.get(v.depthTexture).__webglTexture=L.__autoAllocateDepthBuffer?void 0:b,L.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,C){const b=Ue.get(v);b.__webglFramebuffer=C,b.__useDefaultFramebuffer=C===void 0};const _=B.createFramebuffer();this.setRenderTarget=function(v,C=0,b=0){V=v,F=C,N=b;let L=!0,D=null,k=!1,G=!1;if(v){const K=Ue.get(v);if(K.__useDefaultFramebuffer!==void 0)Ne.bindFramebuffer(B.FRAMEBUFFER,null),L=!1;else if(K.__webglFramebuffer===void 0)I.setupRenderTarget(v);else if(K.__hasExternalTextures)I.rebindTextures(v,Ue.get(v.texture).__webglTexture,Ue.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const ae=v.depthTexture;if(K.__boundDepthTexture!==ae){if(ae!==null&&Ue.has(ae)&&(v.width!==ae.image.width||v.height!==ae.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(v)}}const se=v.texture;(se.isData3DTexture||se.isDataArrayTexture||se.isCompressedArrayTexture)&&(G=!0);const ne=Ue.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(ne[C])?D=ne[C][b]:D=ne[C],k=!0):v.samples>0&&I.useMultisampledRTT(v)===!1?D=Ue.get(v).__webglMultisampledFramebuffer:Array.isArray(ne)?D=ne[b]:D=ne,O.copy(v.viewport),Z.copy(v.scissor),Y=v.scissorTest}else O.copy(be).multiplyScalar(Q).floor(),Z.copy(Ve).multiplyScalar(Q).floor(),Y=Je;if(b!==0&&(D=_),Ne.bindFramebuffer(B.FRAMEBUFFER,D)&&L&&Ne.drawBuffers(v,D),Ne.viewport(O),Ne.scissor(Z),Ne.setScissorTest(Y),k){const K=Ue.get(v.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+C,K.__webglTexture,b)}else if(G){const K=Ue.get(v.texture),se=C;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,K.__webglTexture,b,se)}else if(v!==null&&b!==0){const K=Ue.get(v.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,K.__webglTexture,b)}R=-1},this.readRenderTargetPixels=function(v,C,b,L,D,k,G){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let W=Ue.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&G!==void 0&&(W=W[G]),W){Ne.bindFramebuffer(B.FRAMEBUFFER,W);try{const K=v.texture,se=K.format,ne=K.type;if(!je.textureFormatReadable(se)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!je.textureTypeReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}C>=0&&C<=v.width-L&&b>=0&&b<=v.height-D&&B.readPixels(C,b,L,D,Oe.convert(se),Oe.convert(ne),k)}finally{const K=V!==null?Ue.get(V).__webglFramebuffer:null;Ne.bindFramebuffer(B.FRAMEBUFFER,K)}}},this.readRenderTargetPixelsAsync=async function(v,C,b,L,D,k,G){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let W=Ue.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&G!==void 0&&(W=W[G]),W)if(C>=0&&C<=v.width-L&&b>=0&&b<=v.height-D){Ne.bindFramebuffer(B.FRAMEBUFFER,W);const K=v.texture,se=K.format,ne=K.type;if(!je.textureFormatReadable(se))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!je.textureTypeReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ae=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,ae),B.bufferData(B.PIXEL_PACK_BUFFER,k.byteLength,B.STREAM_READ),B.readPixels(C,b,L,D,Oe.convert(se),Oe.convert(ne),0);const de=V!==null?Ue.get(V).__webglFramebuffer:null;Ne.bindFramebuffer(B.FRAMEBUFFER,de);const he=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Eg(B,he,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,ae),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,k),B.deleteBuffer(ae),B.deleteSync(he),k}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,C=null,b=0){const L=Math.pow(2,-b),D=Math.floor(v.image.width*L),k=Math.floor(v.image.height*L),G=C!==null?C.x:0,W=C!==null?C.y:0;I.setTexture2D(v,0),B.copyTexSubImage2D(B.TEXTURE_2D,b,0,0,G,W,D,k),Ne.unbindTexture()};const A=B.createFramebuffer(),U=B.createFramebuffer();this.copyTextureToTexture=function(v,C,b=null,L=null,D=0,k=null){k===null&&(D!==0?(us("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),k=D,D=0):k=0);let G,W,K,se,ne,ae,de,he,Ce;const Be=v.isCompressedTexture?v.mipmaps[k]:v.image;if(b!==null)G=b.max.x-b.min.x,W=b.max.y-b.min.y,K=b.isBox3?b.max.z-b.min.z:1,se=b.min.x,ne=b.min.y,ae=b.isBox3?b.min.z:0;else{const Ct=Math.pow(2,-D);G=Math.floor(Be.width*Ct),W=Math.floor(Be.height*Ct),v.isDataArrayTexture?K=Be.depth:v.isData3DTexture?K=Math.floor(Be.depth*Ct):K=1,se=0,ne=0,ae=0}L!==null?(de=L.x,he=L.y,Ce=L.z):(de=0,he=0,Ce=0);const Le=Oe.convert(C.format),Ae=Oe.convert(C.type);let qe;C.isData3DTexture?(I.setTexture3D(C,0),qe=B.TEXTURE_3D):C.isDataArrayTexture||C.isCompressedArrayTexture?(I.setTexture2DArray(C,0),qe=B.TEXTURE_2D_ARRAY):(I.setTexture2D(C,0),qe=B.TEXTURE_2D),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,C.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,C.unpackAlignment);const we=B.getParameter(B.UNPACK_ROW_LENGTH),lt=B.getParameter(B.UNPACK_IMAGE_HEIGHT),yt=B.getParameter(B.UNPACK_SKIP_PIXELS),st=B.getParameter(B.UNPACK_SKIP_ROWS),nt=B.getParameter(B.UNPACK_SKIP_IMAGES);B.pixelStorei(B.UNPACK_ROW_LENGTH,Be.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Be.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,se),B.pixelStorei(B.UNPACK_SKIP_ROWS,ne),B.pixelStorei(B.UNPACK_SKIP_IMAGES,ae);const ze=v.isDataArrayTexture||v.isData3DTexture,_t=C.isDataArrayTexture||C.isData3DTexture;if(v.isDepthTexture){const Ct=Ue.get(v),ht=Ue.get(C),Et=Ue.get(Ct.__renderTarget),Ds=Ue.get(ht.__renderTarget);Ne.bindFramebuffer(B.READ_FRAMEBUFFER,Et.__webglFramebuffer),Ne.bindFramebuffer(B.DRAW_FRAMEBUFFER,Ds.__webglFramebuffer);for(let Jn=0;Jn<K;Jn++)ze&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ue.get(v).__webglTexture,D,ae+Jn),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ue.get(C).__webglTexture,k,Ce+Jn)),B.blitFramebuffer(se,ne,G,W,de,he,G,W,B.DEPTH_BUFFER_BIT,B.NEAREST);Ne.bindFramebuffer(B.READ_FRAMEBUFFER,null),Ne.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(D!==0||v.isRenderTargetTexture||Ue.has(v)){const Ct=Ue.get(v),ht=Ue.get(C);Ne.bindFramebuffer(B.READ_FRAMEBUFFER,A),Ne.bindFramebuffer(B.DRAW_FRAMEBUFFER,U);for(let Et=0;Et<K;Et++)ze?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ct.__webglTexture,D,ae+Et):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ct.__webglTexture,D),_t?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,ht.__webglTexture,k,Ce+Et):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,ht.__webglTexture,k),D!==0?B.blitFramebuffer(se,ne,G,W,de,he,G,W,B.COLOR_BUFFER_BIT,B.NEAREST):_t?B.copyTexSubImage3D(qe,k,de,he,Ce+Et,se,ne,G,W):B.copyTexSubImage2D(qe,k,de,he,se,ne,G,W);Ne.bindFramebuffer(B.READ_FRAMEBUFFER,null),Ne.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else _t?v.isDataTexture||v.isData3DTexture?B.texSubImage3D(qe,k,de,he,Ce,G,W,K,Le,Ae,Be.data):C.isCompressedArrayTexture?B.compressedTexSubImage3D(qe,k,de,he,Ce,G,W,K,Le,Be.data):B.texSubImage3D(qe,k,de,he,Ce,G,W,K,Le,Ae,Be):v.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,k,de,he,G,W,Le,Ae,Be.data):v.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,k,de,he,Be.width,Be.height,Le,Be.data):B.texSubImage2D(B.TEXTURE_2D,k,de,he,G,W,Le,Ae,Be);B.pixelStorei(B.UNPACK_ROW_LENGTH,we),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,lt),B.pixelStorei(B.UNPACK_SKIP_PIXELS,yt),B.pixelStorei(B.UNPACK_SKIP_ROWS,st),B.pixelStorei(B.UNPACK_SKIP_IMAGES,nt),k===0&&C.generateMipmaps&&B.generateMipmap(qe),Ne.unbindTexture()},this.copyTextureToTexture3D=function(v,C,b=null,L=null,D=0){return us('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(v,C,b,L,D)},this.initRenderTarget=function(v){Ue.get(v).__webglFramebuffer===void 0&&I.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?I.setTextureCube(v,0):v.isData3DTexture?I.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?I.setTexture2DArray(v,0):I.setTexture2D(v,0),Ne.unbindTexture()},this.resetState=function(){F=0,N=0,V=null,Ne.reset(),$e.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var Jt=Uint8Array,Di=Uint16Array,ZS=Int32Array,Ru=new Jt([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),bu=new Jt([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),JS=new Jt([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Pu=function(i,e){for(var t=new Di(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var r=new ZS(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)r[s]=s-t[n]<<5|n;return{b:t,r}},Iu=Pu(Ru,2),Du=Iu.b,QS=Iu.r;Du[28]=258,QS[258]=28;var jS=Pu(bu,0),ey=jS.b,aa=new Di(32768);for(var pt=0;pt<32768;++pt){var Hn=(pt&43690)>>1|(pt&21845)<<1;Hn=(Hn&52428)>>2|(Hn&13107)<<2,Hn=(Hn&61680)>>4|(Hn&3855)<<4,aa[pt]=((Hn&65280)>>8|(Hn&255)<<8)>>1}var or=function(i,e,t){for(var n=i.length,r=0,s=new Di(e);r<n;++r)i[r]&&++s[i[r]-1];var o=new Di(e);for(r=1;r<e;++r)o[r]=o[r-1]+s[r-1]<<1;var a;if(t){a=new Di(1<<e);var l=15-e;for(r=0;r<n;++r)if(i[r])for(var d=r<<4|i[r],f=e-i[r],h=o[i[r]-1]++<<f,p=h|(1<<f)-1;h<=p;++h)a[aa[h]>>l]=d}else for(a=new Di(n),r=0;r<n;++r)i[r]&&(a[r]=aa[o[i[r]-1]++]>>15-i[r]);return a},Mr=new Jt(288);for(var pt=0;pt<144;++pt)Mr[pt]=8;for(var pt=144;pt<256;++pt)Mr[pt]=9;for(var pt=256;pt<280;++pt)Mr[pt]=7;for(var pt=280;pt<288;++pt)Mr[pt]=8;var Uu=new Jt(32);for(var pt=0;pt<32;++pt)Uu[pt]=5;var ty=or(Mr,9,1),ny=or(Uu,5,1),uo=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},cn=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},fo=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},iy=function(i){return(i+7)/8|0},ry=function(i,e,t){return(t==null||t>i.length)&&(t=i.length),new Jt(i.subarray(e,t))},sy=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],un=function(i,e,t){var n=new Error(e||sy[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,un),!t)throw n;return n},oy=function(i,e,t,n){var r=i.length,s=0;if(!r||e.f&&!e.l)return t||new Jt(0);var o=!t,a=o||e.i!=2,l=e.i;o&&(t=new Jt(r*3));var d=function(dt){var ct=t.length;if(dt>ct){var Ke=new Jt(Math.max(ct*2,dt));Ke.set(t),t=Ke}},f=e.f||0,h=e.p||0,p=e.b||0,g=e.l,S=e.d,E=e.m,x=e.n,m=r*8;do{if(!g){f=cn(i,h,1);var P=cn(i,h+1,3);if(h+=3,P)if(P==1)g=ty,S=ny,E=9,x=5;else if(P==2){var F=cn(i,h,31)+257,N=cn(i,h+10,15)+4,V=F+cn(i,h+5,31)+1;h+=14;for(var R=new Jt(V),M=new Jt(19),O=0;O<N;++O)M[JS[O]]=cn(i,h+O*3,7);h+=N*3;for(var Z=uo(M),Y=(1<<Z)-1,ie=or(M,Z,1),O=0;O<V;){var le=ie[cn(i,h,Y)];h+=le&15;var w=le>>4;if(w<16)R[O++]=w;else{var ee=0,ce=0;for(w==16?(ce=3+cn(i,h,3),h+=2,ee=R[O-1]):w==17?(ce=3+cn(i,h,7),h+=3):w==18&&(ce=11+cn(i,h,127),h+=7);ce--;)R[O++]=ee}}var Q=R.subarray(0,F),ge=R.subarray(F);E=uo(Q),x=uo(ge),g=or(Q,E,1),S=or(ge,x,1)}else un(1);else{var w=iy(h)+4,T=i[w-4]|i[w-3]<<8,z=w+T;if(z>r){l&&un(0);break}a&&d(p+T),t.set(i.subarray(w,z),p),e.b=p+=T,e.p=h=z*8,e.f=f;continue}if(h>m){l&&un(0);break}}a&&d(p+131072);for(var ve=(1<<E)-1,be=(1<<x)-1,Ve=h;;Ve=h){var ee=g[fo(i,h)&ve],Je=ee>>4;if(h+=ee&15,h>m){l&&un(0);break}if(ee||un(2),Je<256)t[p++]=Je;else if(Je==256){Ve=h,g=null;break}else{var j=Je-254;if(Je>264){var O=Je-257,pe=Ru[O];j=cn(i,h,(1<<pe)-1)+Du[O],h+=pe}var me=S[fo(i,h)&be],_e=me>>4;me||un(3),h+=me&15;var ge=ey[_e];if(_e>3){var pe=bu[_e];ge+=fo(i,h)&(1<<pe)-1,h+=pe}if(h>m){l&&un(0);break}a&&d(p+131072);var Pe=p+j;if(p<ge){var Qe=s-ge,ke=Math.min(ge,Pe);for(Qe+p<0&&un(3);p<ke;++p)t[p]=n[Qe+p]}for(;p<Pe;++p)t[p]=t[p-ge]}}e.l=g,e.p=Ve,e.b=p,e.f=f,g&&(f=1,e.m=E,e.d=S,e.n=x)}while(!f);return p!=t.length&&o?ry(t,0,p):t.subarray(0,p)},ay=new Jt(0),ly=function(i,e){return((i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31)&&un(6,"invalid zlib data"),(i[1]>>5&1)==1&&un(6,"invalid zlib data: "+(i[1]&32?"need":"unexpected")+" dictionary"),(i[1]>>3&4)+2};function es(i,e){return oy(i.subarray(ly(i),-4),{i:2},e,e)}var cy=typeof TextDecoder<"u"&&new TextDecoder,uy=0;try{cy.decode(ay,{stream:!0}),uy=1}catch{}class dy extends u_{constructor(e){super(e),this.type=$t}parse(e){const R=Math.pow(2.7182818,2.2);function M(_,A){let U=0;for(let C=0;C<65536;++C)(C==0||_[C>>3]&1<<(C&7))&&(A[U++]=C);const v=U-1;for(;U<65536;)A[U++]=0;return v}function O(_){for(let A=0;A<16384;A++)_[A]={},_[A].len=0,_[A].lit=0,_[A].p=null}const Z={l:0,c:0,lc:0};function Y(_,A,U,v,C){for(;U<_;)A=A<<8|Me(v,C),U+=8;U-=_,Z.l=A>>U&(1<<_)-1,Z.c=A,Z.lc=U}const ie=new Array(59);function le(_){for(let U=0;U<=58;++U)ie[U]=0;for(let U=0;U<65537;++U)ie[_[U]]+=1;let A=0;for(let U=58;U>0;--U){const v=A+ie[U]>>1;ie[U]=A,A=v}for(let U=0;U<65537;++U){const v=_[U];v>0&&(_[U]=v|ie[v]++<<6)}}function ee(_,A,U,v,C,b){const L=A;let D=0,k=0;for(;v<=C;v++){if(L.value-A.value>U)return!1;Y(6,D,k,_,L);const G=Z.l;if(D=Z.c,k=Z.lc,b[v]=G,G==63){if(L.value-A.value>U)throw new Error("Something wrong with hufUnpackEncTable");Y(8,D,k,_,L);let W=Z.l+6;if(D=Z.c,k=Z.lc,v+W>C+1)throw new Error("Something wrong with hufUnpackEncTable");for(;W--;)b[v++]=0;v--}else if(G>=59){let W=G-59+2;if(v+W>C+1)throw new Error("Something wrong with hufUnpackEncTable");for(;W--;)b[v++]=0;v--}}le(b)}function ce(_){return _&63}function Q(_){return _>>6}function ge(_,A,U,v){for(;A<=U;A++){const C=Q(_[A]),b=ce(_[A]);if(C>>b)throw new Error("Invalid table entry");if(b>14){const L=v[C>>b-14];if(L.len)throw new Error("Invalid table entry");if(L.lit++,L.p){const D=L.p;L.p=new Array(L.lit);for(let k=0;k<L.lit-1;++k)L.p[k]=D[k]}else L.p=new Array(1);L.p[L.lit-1]=A}else if(b){let L=0;for(let D=1<<14-b;D>0;D--){const k=v[(C<<14-b)+L];if(k.len||k.p)throw new Error("Invalid table entry");k.len=b,k.lit=A,L++}}}return!0}const ve={c:0,lc:0};function be(_,A,U,v){_=_<<8|Me(U,v),A+=8,ve.c=_,ve.lc=A}const Ve={c:0,lc:0};function Je(_,A,U,v,C,b,L,D,k){if(_==A){v<8&&(be(U,v,C,b),U=ve.c,v=ve.lc),v-=8;let G=U>>v;if(G=new Uint8Array([G])[0],D.value+G>k)return!1;const W=L[D.value-1];for(;G-- >0;)L[D.value++]=W}else if(D.value<k)L[D.value++]=_;else return!1;Ve.c=U,Ve.lc=v}function j(_){return _&65535}function pe(_){const A=j(_);return A>32767?A-65536:A}const me={a:0,b:0};function _e(_,A){const U=pe(_),C=pe(A),b=U+(C&1)+(C>>1),L=b,D=b-C;me.a=L,me.b=D}function Pe(_,A){const U=j(_),v=j(A),C=U-(v>>1)&65535,b=v+C-32768&65535;me.a=b,me.b=C}function Qe(_,A,U,v,C,b,L){const D=L<16384,k=U>C?C:U;let G=1,W,K;for(;G<=k;)G<<=1;for(G>>=1,W=G,G>>=1;G>=1;){K=0;const se=K+b*(C-W),ne=b*G,ae=b*W,de=v*G,he=v*W;let Ce,Be,Le,Ae;for(;K<=se;K+=ae){let qe=K;const we=K+v*(U-W);for(;qe<=we;qe+=he){const lt=qe+de,yt=qe+ne,st=yt+de;D?(_e(_[qe+A],_[yt+A]),Ce=me.a,Le=me.b,_e(_[lt+A],_[st+A]),Be=me.a,Ae=me.b,_e(Ce,Be),_[qe+A]=me.a,_[lt+A]=me.b,_e(Le,Ae),_[yt+A]=me.a,_[st+A]=me.b):(Pe(_[qe+A],_[yt+A]),Ce=me.a,Le=me.b,Pe(_[lt+A],_[st+A]),Be=me.a,Ae=me.b,Pe(Ce,Be),_[qe+A]=me.a,_[lt+A]=me.b,Pe(Le,Ae),_[yt+A]=me.a,_[st+A]=me.b)}if(U&G){const lt=qe+ne;D?_e(_[qe+A],_[lt+A]):Pe(_[qe+A],_[lt+A]),Ce=me.a,_[lt+A]=me.b,_[qe+A]=Ce}}if(C&G){let qe=K;const we=K+v*(U-W);for(;qe<=we;qe+=he){const lt=qe+de;D?_e(_[qe+A],_[lt+A]):Pe(_[qe+A],_[lt+A]),Ce=me.a,_[lt+A]=me.b,_[qe+A]=Ce}}W=G,G>>=1}return K}function ke(_,A,U,v,C,b,L,D,k){let G=0,W=0;const K=L,se=Math.trunc(v.value+(C+7)/8);for(;v.value<se;)for(be(G,W,U,v),G=ve.c,W=ve.lc;W>=14;){const ae=G>>W-14&16383,de=A[ae];if(de.len)W-=de.len,Je(de.lit,b,G,W,U,v,D,k,K),G=Ve.c,W=Ve.lc;else{if(!de.p)throw new Error("hufDecode issues");let he;for(he=0;he<de.lit;he++){const Ce=ce(_[de.p[he]]);for(;W<Ce&&v.value<se;)be(G,W,U,v),G=ve.c,W=ve.lc;if(W>=Ce&&Q(_[de.p[he]])==(G>>W-Ce&(1<<Ce)-1)){W-=Ce,Je(de.p[he],b,G,W,U,v,D,k,K),G=Ve.c,W=Ve.lc;break}}if(he==de.lit)throw new Error("hufDecode issues")}}const ne=8-C&7;for(G>>=ne,W-=ne;W>0;){const ae=A[G<<14-W&16383];if(ae.len)W-=ae.len,Je(ae.lit,b,G,W,U,v,D,k,K),G=Ve.c,W=Ve.lc;else throw new Error("hufDecode issues")}return!0}function dt(_,A,U,v,C,b){const L={value:0},D=U.value,k=De(A,U),G=De(A,U);U.value+=4;const W=De(A,U);if(U.value+=4,k<0||k>=65537||G<0||G>=65537)throw new Error("Something wrong with HUF_ENCSIZE");const K=new Array(65537),se=new Array(16384);O(se);const ne=v-(U.value-D);if(ee(_,U,ne,k,G,K),W>8*(v-(U.value-D)))throw new Error("Something wrong with hufUncompress");ge(K,k,G,se),ke(K,se,_,U,W,G,b,C,L)}function ct(_,A,U){for(let v=0;v<U;++v)A[v]=_[A[v]]}function Ke(_){for(let A=1;A<_.length;A++){const U=_[A-1]+_[A]-128;_[A]=U}}function B(_,A){let U=0,v=Math.floor((_.length+1)/2),C=0;const b=_.length-1;for(;!(C>b||(A[C++]=_[U++],C>b));)A[C++]=_[v++]}function Lt(_){let A=_.byteLength;const U=new Array;let v=0;const C=new DataView(_);for(;A>0;){const b=C.getInt8(v++);if(b<0){const L=-b;A-=L+1;for(let D=0;D<L;D++)U.push(C.getUint8(v++))}else{const L=b;A-=2;const D=C.getUint8(v++);for(let k=0;k<L+1;k++)U.push(D)}}return U}function tt(_,A,U,v,C,b){let L=new DataView(b.buffer);const D=U[_.idx[0]].width,k=U[_.idx[0]].height,G=3,W=Math.floor(D/8),K=Math.ceil(D/8),se=Math.ceil(k/8),ne=D-(K-1)*8,ae=k-(se-1)*8,de={value:0},he=new Array(G),Ce=new Array(G),Be=new Array(G),Le=new Array(G),Ae=new Array(G);for(let we=0;we<G;++we)Ae[we]=A[_.idx[we]],he[we]=we<1?0:he[we-1]+K*se,Ce[we]=new Float32Array(64),Be[we]=new Uint16Array(64),Le[we]=new Uint16Array(K*64);for(let we=0;we<se;++we){let lt=8;we==se-1&&(lt=ae);let yt=8;for(let nt=0;nt<K;++nt){nt==K-1&&(yt=ne);for(let ze=0;ze<G;++ze)Be[ze].fill(0),Be[ze][0]=C[he[ze]++],je(de,v,Be[ze]),Ne(Be[ze],Ce[ze]),ft(Ce[ze]);Ue(Ce);for(let ze=0;ze<G;++ze)I(Ce[ze],Le[ze],nt*64)}let st=0;for(let nt=0;nt<G;++nt){const ze=U[_.idx[nt]].type;for(let _t=8*we;_t<8*we+lt;++_t){st=Ae[nt][_t];for(let Ct=0;Ct<W;++Ct){const ht=Ct*64+(_t&7)*8;L.setUint16(st+0*2*ze,Le[nt][ht+0],!0),L.setUint16(st+1*2*ze,Le[nt][ht+1],!0),L.setUint16(st+2*2*ze,Le[nt][ht+2],!0),L.setUint16(st+3*2*ze,Le[nt][ht+3],!0),L.setUint16(st+4*2*ze,Le[nt][ht+4],!0),L.setUint16(st+5*2*ze,Le[nt][ht+5],!0),L.setUint16(st+6*2*ze,Le[nt][ht+6],!0),L.setUint16(st+7*2*ze,Le[nt][ht+7],!0),st+=8*2*ze}}if(W!=K)for(let _t=8*we;_t<8*we+lt;++_t){const Ct=Ae[nt][_t]+8*W*2*ze,ht=W*64+(_t&7)*8;for(let Et=0;Et<yt;++Et)L.setUint16(Ct+Et*2*ze,Le[nt][ht+Et],!0)}}}const qe=new Uint16Array(D);L=new DataView(b.buffer);for(let we=0;we<G;++we){U[_.idx[we]].decoded=!0;const lt=U[_.idx[we]].type;if(U[we].type==2)for(let yt=0;yt<k;++yt){const st=Ae[we][yt];for(let nt=0;nt<D;++nt)qe[nt]=L.getUint16(st+nt*2*lt,!0);for(let nt=0;nt<D;++nt)L.setFloat32(st+nt*2*lt,q(qe[nt]),!0)}}}function je(_,A,U){let v,C=1;for(;C<64;)v=A[_.value],v==65280?C=64:v>>8==255?C+=v&255:(U[C]=v,C++),_.value++}function Ne(_,A){A[0]=q(_[0]),A[1]=q(_[1]),A[2]=q(_[5]),A[3]=q(_[6]),A[4]=q(_[14]),A[5]=q(_[15]),A[6]=q(_[27]),A[7]=q(_[28]),A[8]=q(_[2]),A[9]=q(_[4]),A[10]=q(_[7]),A[11]=q(_[13]),A[12]=q(_[16]),A[13]=q(_[26]),A[14]=q(_[29]),A[15]=q(_[42]),A[16]=q(_[3]),A[17]=q(_[8]),A[18]=q(_[12]),A[19]=q(_[17]),A[20]=q(_[25]),A[21]=q(_[30]),A[22]=q(_[41]),A[23]=q(_[43]),A[24]=q(_[9]),A[25]=q(_[11]),A[26]=q(_[18]),A[27]=q(_[24]),A[28]=q(_[31]),A[29]=q(_[40]),A[30]=q(_[44]),A[31]=q(_[53]),A[32]=q(_[10]),A[33]=q(_[19]),A[34]=q(_[23]),A[35]=q(_[32]),A[36]=q(_[39]),A[37]=q(_[45]),A[38]=q(_[52]),A[39]=q(_[54]),A[40]=q(_[20]),A[41]=q(_[22]),A[42]=q(_[33]),A[43]=q(_[38]),A[44]=q(_[46]),A[45]=q(_[51]),A[46]=q(_[55]),A[47]=q(_[60]),A[48]=q(_[21]),A[49]=q(_[34]),A[50]=q(_[37]),A[51]=q(_[47]),A[52]=q(_[50]),A[53]=q(_[56]),A[54]=q(_[59]),A[55]=q(_[61]),A[56]=q(_[35]),A[57]=q(_[36]),A[58]=q(_[48]),A[59]=q(_[49]),A[60]=q(_[57]),A[61]=q(_[58]),A[62]=q(_[62]),A[63]=q(_[63])}function ft(_){const A=.5*Math.cos(.7853975),U=.5*Math.cos(3.14159/16),v=.5*Math.cos(3.14159/8),C=.5*Math.cos(3*3.14159/16),b=.5*Math.cos(5*3.14159/16),L=.5*Math.cos(3*3.14159/8),D=.5*Math.cos(7*3.14159/16),k=new Array(4),G=new Array(4),W=new Array(4),K=new Array(4);for(let se=0;se<8;++se){const ne=se*8;k[0]=v*_[ne+2],k[1]=L*_[ne+2],k[2]=v*_[ne+6],k[3]=L*_[ne+6],G[0]=U*_[ne+1]+C*_[ne+3]+b*_[ne+5]+D*_[ne+7],G[1]=C*_[ne+1]-D*_[ne+3]-U*_[ne+5]-b*_[ne+7],G[2]=b*_[ne+1]-U*_[ne+3]+D*_[ne+5]+C*_[ne+7],G[3]=D*_[ne+1]-b*_[ne+3]+C*_[ne+5]-U*_[ne+7],W[0]=A*(_[ne+0]+_[ne+4]),W[3]=A*(_[ne+0]-_[ne+4]),W[1]=k[0]+k[3],W[2]=k[1]-k[2],K[0]=W[0]+W[1],K[1]=W[3]+W[2],K[2]=W[3]-W[2],K[3]=W[0]-W[1],_[ne+0]=K[0]+G[0],_[ne+1]=K[1]+G[1],_[ne+2]=K[2]+G[2],_[ne+3]=K[3]+G[3],_[ne+4]=K[3]-G[3],_[ne+5]=K[2]-G[2],_[ne+6]=K[1]-G[1],_[ne+7]=K[0]-G[0]}for(let se=0;se<8;++se)k[0]=v*_[16+se],k[1]=L*_[16+se],k[2]=v*_[48+se],k[3]=L*_[48+se],G[0]=U*_[8+se]+C*_[24+se]+b*_[40+se]+D*_[56+se],G[1]=C*_[8+se]-D*_[24+se]-U*_[40+se]-b*_[56+se],G[2]=b*_[8+se]-U*_[24+se]+D*_[40+se]+C*_[56+se],G[3]=D*_[8+se]-b*_[24+se]+C*_[40+se]-U*_[56+se],W[0]=A*(_[se]+_[32+se]),W[3]=A*(_[se]-_[32+se]),W[1]=k[0]+k[3],W[2]=k[1]-k[2],K[0]=W[0]+W[1],K[1]=W[3]+W[2],K[2]=W[3]-W[2],K[3]=W[0]-W[1],_[0+se]=K[0]+G[0],_[8+se]=K[1]+G[1],_[16+se]=K[2]+G[2],_[24+se]=K[3]+G[3],_[32+se]=K[3]-G[3],_[40+se]=K[2]-G[2],_[48+se]=K[1]-G[1],_[56+se]=K[0]-G[0]}function Ue(_){for(let A=0;A<64;++A){const U=_[0][A],v=_[1][A],C=_[2][A];_[0][A]=U+1.5747*C,_[1][A]=U-.1873*v-.4682*C,_[2][A]=U+1.8556*v}}function I(_,A,U){for(let v=0;v<64;++v)A[U+v]=tc.toHalfFloat(y(_[v]))}function y(_){return _<=1?Math.sign(_)*Math.pow(Math.abs(_),2.2):Math.sign(_)*Math.pow(R,Math.abs(_)-1)}function X(_){return new DataView(_.array.buffer,_.offset.value,_.size)}function re(_){const A=_.viewer.buffer.slice(_.offset.value,_.offset.value+_.size),U=new Uint8Array(Lt(A)),v=new Uint8Array(U.length);return Ke(U),B(U,v),new DataView(v.buffer)}function ue(_){const A=_.array.slice(_.offset.value,_.offset.value+_.size),U=es(A),v=new Uint8Array(U.length);return Ke(U),B(U,v),new DataView(v.buffer)}function te(_){const A=_.viewer,U={value:_.offset.value},v=new Uint16Array(_.columns*_.lines*(_.inputChannels.length*_.type)),C=new Uint8Array(8192);let b=0;const L=new Array(_.inputChannels.length);for(let ae=0,de=_.inputChannels.length;ae<de;ae++)L[ae]={},L[ae].start=b,L[ae].end=L[ae].start,L[ae].nx=_.columns,L[ae].ny=_.lines,L[ae].size=_.type,b+=L[ae].nx*L[ae].ny*L[ae].size;const D=J(A,U),k=J(A,U);if(k>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(D<=k)for(let ae=0;ae<k-D+1;ae++)C[ae+D]=We(A,U);const G=new Uint16Array(65536),W=M(C,G),K=De(A,U);dt(_.array,A,U,K,v,b);for(let ae=0;ae<_.inputChannels.length;++ae){const de=L[ae];for(let he=0;he<L[ae].size;++he)Qe(v,de.start+he,de.nx,de.size,de.ny,de.nx*de.size,W)}ct(G,v,b);let se=0;const ne=new Uint8Array(v.buffer.byteLength);for(let ae=0;ae<_.lines;ae++)for(let de=0;de<_.inputChannels.length;de++){const he=L[de],Ce=he.nx*he.size,Be=new Uint8Array(v.buffer,he.end*2,Ce*2);ne.set(Be,se),se+=Ce*2,he.end+=Ce}return new DataView(ne.buffer)}function Ie(_){const A=_.array.slice(_.offset.value,_.offset.value+_.size),U=es(A),v=_.inputChannels.length*_.lines*_.columns*_.totalBytes,C=new ArrayBuffer(v),b=new DataView(C);let L=0,D=0;const k=new Array(4);for(let G=0;G<_.lines;G++)for(let W=0;W<_.inputChannels.length;W++){let K=0;switch(_.inputChannels[W].pixelType){case 1:k[0]=L,k[1]=k[0]+_.columns,L=k[1]+_.columns;for(let ne=0;ne<_.columns;++ne){const ae=U[k[0]++]<<8|U[k[1]++];K+=ae,b.setUint16(D,K,!0),D+=2}break;case 2:k[0]=L,k[1]=k[0]+_.columns,k[2]=k[1]+_.columns,L=k[2]+_.columns;for(let ne=0;ne<_.columns;++ne){const ae=U[k[0]++]<<24|U[k[1]++]<<16|U[k[2]++]<<8;K+=ae,b.setUint32(D,K,!0),D+=4}break}}return b}function Se(_){const A=_.viewer,U={value:_.offset.value},v=new Uint8Array(_.columns*_.lines*(_.inputChannels.length*_.type*2)),C={version:Oe(A,U),unknownUncompressedSize:Oe(A,U),unknownCompressedSize:Oe(A,U),acCompressedSize:Oe(A,U),dcCompressedSize:Oe(A,U),rleCompressedSize:Oe(A,U),rleUncompressedSize:Oe(A,U),rleRawSize:Oe(A,U),totalAcUncompressedCount:Oe(A,U),totalDcUncompressedCount:Oe(A,U),acCompression:Oe(A,U)};if(C.version<2)throw new Error("EXRLoader.parse: "+vn.compression+" version "+C.version+" is unsupported");const b=new Array;let L=J(A,U)-2;for(;L>0;){const de=Fe(A.buffer,U),he=We(A,U),Ce=he>>2&3,Be=(he>>4)-1,Le=new Int8Array([Be])[0],Ae=We(A,U);b.push({name:de,index:Le,type:Ae,compression:Ce}),L-=de.length+3}const D=vn.channels,k=new Array(_.inputChannels.length);for(let de=0;de<_.inputChannels.length;++de){const he=k[de]={},Ce=D[de];he.name=Ce.name,he.compression=0,he.decoded=!1,he.type=Ce.pixelType,he.pLinear=Ce.pLinear,he.width=_.columns,he.height=_.lines}const G={idx:new Array(3)};for(let de=0;de<_.inputChannels.length;++de){const he=k[de];for(let Ce=0;Ce<b.length;++Ce){const Be=b[Ce];he.name==Be.name&&(he.compression=Be.compression,Be.index>=0&&(G.idx[Be.index]=de),he.offset=de)}}let W,K,se;if(C.acCompressedSize>0)switch(C.acCompression){case 0:W=new Uint16Array(C.totalAcUncompressedCount),dt(_.array,A,U,C.acCompressedSize,W,C.totalAcUncompressedCount);break;case 1:const de=_.array.slice(U.value,U.value+C.totalAcUncompressedCount),he=es(de);W=new Uint16Array(he.buffer),U.value+=C.totalAcUncompressedCount;break}if(C.dcCompressedSize>0){const de={array:_.array,offset:U,size:C.dcCompressedSize};K=new Uint16Array(ue(de).buffer),U.value+=C.dcCompressedSize}if(C.rleRawSize>0){const de=_.array.slice(U.value,U.value+C.rleCompressedSize),he=es(de);se=Lt(he.buffer),U.value+=C.rleCompressedSize}let ne=0;const ae=new Array(k.length);for(let de=0;de<ae.length;++de)ae[de]=new Array;for(let de=0;de<_.lines;++de)for(let he=0;he<k.length;++he)ae[he].push(ne),ne+=k[he].width*_.type*2;tt(G,ae,k,W,K,v);for(let de=0;de<k.length;++de){const he=k[de];if(!he.decoded)switch(he.compression){case 2:let Ce=0,Be=0;for(let Le=0;Le<_.lines;++Le){let Ae=ae[de][Ce];for(let qe=0;qe<he.width;++qe){for(let we=0;we<2*he.type;++we)v[Ae++]=se[Be+we*he.width*he.height];Be++}Ce++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(v.buffer)}function Fe(_,A){const U=new Uint8Array(_);let v=0;for(;U[A.value+v]!=0;)v+=1;const C=new TextDecoder().decode(U.slice(A.value,A.value+v));return A.value=A.value+v+1,C}function He(_,A,U){const v=new TextDecoder().decode(new Uint8Array(_).slice(A.value,A.value+U));return A.value=A.value+U,v}function fe(_,A){const U=Re(_,A),v=De(_,A);return[U,v]}function Te(_,A){const U=De(_,A),v=De(_,A);return[U,v]}function Re(_,A){const U=_.getInt32(A.value,!0);return A.value=A.value+4,U}function De(_,A){const U=_.getUint32(A.value,!0);return A.value=A.value+4,U}function Me(_,A){const U=_[A.value];return A.value=A.value+1,U}function We(_,A){const U=_.getUint8(A.value);return A.value=A.value+1,U}const Oe=function(_,A){let U;return"getBigInt64"in DataView.prototype?U=Number(_.getBigInt64(A.value,!0)):U=_.getUint32(A.value+4,!0)+Number(_.getUint32(A.value,!0)<<32),A.value+=8,U};function $e(_,A){const U=_.getFloat32(A.value,!0);return A.value+=4,U}function H(_,A){return tc.toHalfFloat($e(_,A))}function q(_){const A=(_&31744)>>10,U=_&1023;return(_>>15?-1:1)*(A?A===31?U?NaN:1/0:Math.pow(2,A-15)*(1+U/1024):6103515625e-14*(U/1024))}function J(_,A){const U=_.getUint16(A.value,!0);return A.value+=2,U}function oe(_,A){return q(J(_,A))}function Ee(_,A,U,v){const C=U.value,b=[];for(;U.value<C+v-1;){const L=Fe(A,U),D=Re(_,U),k=We(_,U);U.value+=3;const G=Re(_,U),W=Re(_,U);b.push({name:L,pixelType:D,pLinear:k,xSampling:G,ySampling:W})}return U.value+=1,b}function ye(_,A){const U=$e(_,A),v=$e(_,A),C=$e(_,A),b=$e(_,A),L=$e(_,A),D=$e(_,A),k=$e(_,A),G=$e(_,A);return{redX:U,redY:v,greenX:C,greenY:b,blueX:L,blueY:D,whiteX:k,whiteY:G}}function Xe(_,A){const U=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],v=We(_,A);return U[v]}function mt(_,A){const U=Re(_,A),v=Re(_,A),C=Re(_,A),b=Re(_,A);return{xMin:U,yMin:v,xMax:C,yMax:b}}function At(_,A){const U=["INCREASING_Y","DECREASING_Y","RANDOM_Y"],v=We(_,A);return U[v]}function at(_,A){const U=["ENVMAP_LATLONG","ENVMAP_CUBE"],v=We(_,A);return U[v]}function Ht(_,A){const U=["ONE_LEVEL","MIPMAP_LEVELS","RIPMAP_LEVELS"],v=["ROUND_DOWN","ROUND_UP"],C=De(_,A),b=De(_,A),L=We(_,A);return{xSize:C,ySize:b,levelMode:U[L&15],roundingMode:v[L>>4]}}function sn(_,A){const U=$e(_,A),v=$e(_,A);return[U,v]}function Ar(_,A){const U=$e(_,A),v=$e(_,A),C=$e(_,A);return[U,v,C]}function Cr(_,A,U,v,C){if(v==="string"||v==="stringvector"||v==="iccProfile")return He(A,U,C);if(v==="chlist")return Ee(_,A,U,C);if(v==="chromaticities")return ye(_,U);if(v==="compression")return Xe(_,U);if(v==="box2i")return mt(_,U);if(v==="envmap")return at(_,U);if(v==="tiledesc")return Ht(_,U);if(v==="lineOrder")return At(_,U);if(v==="float")return $e(_,U);if(v==="v2f")return sn(_,U);if(v==="v3f")return Ar(_,U);if(v==="int")return Re(_,U);if(v==="rational")return fe(_,U);if(v==="timecode")return Te(_,U);if(v==="preview")return U.value+=C,"skipped";U.value+=C}function _n(_,A){const U=Math.log2(_);return A=="ROUND_DOWN"?Math.floor(U):Math.ceil(U)}function Xi(_,A,U){let v=0;switch(_.levelMode){case"ONE_LEVEL":v=1;break;case"MIPMAP_LEVELS":v=_n(Math.max(A,U),_.roundingMode)+1;break;case"RIPMAP_LEVELS":throw new Error("THREE.EXRLoader: RIPMAP_LEVELS tiles currently unsupported.")}return v}function qi(_,A,U,v){const C=new Array(_);for(let b=0;b<_;b++){const L=1<<b;let D=A/L|0;v=="ROUND_UP"&&D*L<A&&(D+=1);const k=Math.max(D,1);C[b]=(k+U-1)/U|0}return C}function wr(){const _=this,A=_.offset,U={value:0};for(let v=0;v<_.tileCount;v++){const C=Re(_.viewer,A),b=Re(_.viewer,A);A.value+=8,_.size=De(_.viewer,A);const L=C*_.blockWidth,D=b*_.blockHeight;_.columns=L+_.blockWidth>_.width?_.width-L:_.blockWidth,_.lines=D+_.blockHeight>_.height?_.height-D:_.blockHeight;const k=_.columns*_.totalBytes,W=_.size<_.lines*k?_.uncompress(_):X(_);A.value+=_.size;for(let K=0;K<_.lines;K++){const se=K*_.columns*_.totalBytes;for(let ne=0;ne<_.inputChannels.length;ne++){const ae=vn.channels[ne].name,de=_.channelByteOffsets[ae]*_.columns,he=_.decodeChannels[ae];if(he===void 0)continue;U.value=se+de;const Ce=(_.height-(1+D+K))*_.outLineWidth;for(let Be=0;Be<_.columns;Be++){const Le=Ce+(Be+L)*_.outputChannels+he;_.byteArray[Le]=_.getter(W,U)}}}}}function hi(){const _=this,A=_.offset,U={value:0};for(let v=0;v<_.height/_.blockHeight;v++){const C=Re(_.viewer,A)-vn.dataWindow.yMin;_.size=De(_.viewer,A),_.lines=C+_.blockHeight>_.height?_.height-C:_.blockHeight;const b=_.columns*_.totalBytes,D=_.size<_.lines*b?_.uncompress(_):X(_);A.value+=_.size;for(let k=0;k<_.blockHeight;k++){const G=v*_.blockHeight,W=k+_.scanOrder(G);if(W>=_.height)continue;const K=k*b,se=(_.height-1-W)*_.outLineWidth;for(let ne=0;ne<_.inputChannels.length;ne++){const ae=vn.channels[ne].name,de=_.channelByteOffsets[ae]*_.columns,he=_.decodeChannels[ae];if(he!==void 0){U.value=K+de;for(let Ce=0;Ce<_.columns;Ce++){const Be=se+Ce*_.outputChannels+he;_.byteArray[Be]=_.getter(D,U)}}}}}}function Rr(_,A,U){const v={};if(_.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");v.version=_.getUint8(4);const C=_.getUint8(5);v.spec={singleTile:!!(C&2),longName:!!(C&4),deepFormat:!!(C&8),multiPart:!!(C&16)},U.value=8;let b=!0;for(;b;){const L=Fe(A,U);if(L==="")b=!1;else{const D=Fe(A,U),k=De(_,U),G=Cr(_,A,U,D,k);G===void 0?console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${D}'.`):v[L]=G}}if((C&-7)!=0)throw console.error("THREE.EXRHeader:",v),new Error("THREE.EXRLoader: Provided file is currently unsupported.");return v}function pi(_,A,U,v,C){const b={size:0,viewer:A,array:U,offset:v,width:_.dataWindow.xMax-_.dataWindow.xMin+1,height:_.dataWindow.yMax-_.dataWindow.yMin+1,inputChannels:_.channels,channelByteOffsets:{},scanOrder:null,totalBytes:null,columns:null,lines:null,type:null,uncompress:null,getter:null,format:null,colorSpace:Yn};switch(_.compression){case"NO_COMPRESSION":b.blockHeight=1,b.uncompress=X;break;case"RLE_COMPRESSION":b.blockHeight=1,b.uncompress=re;break;case"ZIPS_COMPRESSION":b.blockHeight=1,b.uncompress=ue;break;case"ZIP_COMPRESSION":b.blockHeight=16,b.uncompress=ue;break;case"PIZ_COMPRESSION":b.blockHeight=32,b.uncompress=te;break;case"PXR24_COMPRESSION":b.blockHeight=16,b.uncompress=Ie;break;case"DWAA_COMPRESSION":b.blockHeight=32,b.uncompress=Se;break;case"DWAB_COMPRESSION":b.blockHeight=256,b.uncompress=Se;break;default:throw new Error("EXRLoader.parse: "+_.compression+" is unsupported")}const L={};for(const W of _.channels)switch(W.name){case"Y":case"R":case"G":case"B":case"A":L[W.name]=!0,b.type=W.pixelType}let D=!1;if(L.R&&L.G&&L.B)D=!L.A,b.outputChannels=4,b.decodeChannels={R:0,G:1,B:2,A:3};else if(L.Y)b.outputChannels=1,b.decodeChannels={Y:0};else throw new Error("EXRLoader.parse: file contains unsupported data channels.");if(b.type==1)switch(C){case Qt:b.getter=oe;break;case $t:b.getter=J;break}else if(b.type==2)switch(C){case Qt:b.getter=$e;break;case $t:b.getter=H}else throw new Error("EXRLoader.parse: unsupported pixelType "+b.type+" for "+_.compression+".");b.columns=b.width;const k=b.width*b.height*b.outputChannels;switch(C){case Qt:b.byteArray=new Float32Array(k),D&&b.byteArray.fill(1,0,k);break;case $t:b.byteArray=new Uint16Array(k),D&&b.byteArray.fill(15360,0,k);break;default:console.error("THREE.EXRLoader: unsupported type: ",C);break}let G=0;for(const W of _.channels)b.decodeChannels[W.name]!==void 0&&(b.channelByteOffsets[W.name]=G),G+=W.pixelType*2;if(b.totalBytes=G,b.outLineWidth=b.width*b.outputChannels,_.lineOrder==="INCREASING_Y"?b.scanOrder=W=>W:b.scanOrder=W=>b.height-1-W,b.outputChannels==4?(b.format=jt,b.colorSpace=Yn):(b.format=va,b.colorSpace=wn),_.spec.singleTile){b.blockHeight=_.tiles.ySize,b.blockWidth=_.tiles.xSize;const W=Xi(_.tiles,b.width,b.height),K=qi(W,b.width,_.tiles.xSize,_.tiles.roundingMode),se=qi(W,b.height,_.tiles.ySize,_.tiles.roundingMode);b.tileCount=K[0]*se[0];for(let ne=0;ne<W;ne++)for(let ae=0;ae<se[ne];ae++)for(let de=0;de<K[ne];de++)Oe(A,v);b.decode=wr.bind(b)}else{b.blockWidth=b.width;const W=Math.ceil(b.height/b.blockHeight);for(let K=0;K<W;K++)Oe(A,v);b.decode=hi.bind(b)}return b}const Yi={value:0},Ki=new DataView(e),Is=new Uint8Array(e),vn=Rr(Ki,e,Yi),Nn=pi(vn,Ki,Is,Yi,this.type);return Nn.decode(),{header:vn,width:Nn.width,height:Nn.height,data:Nn.byteArray,format:Nn.format,colorSpace:Nn.colorSpace,type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,r){function s(o,a){o.colorSpace=a.colorSpace,o.minFilter=Ft,o.magFilter=Ft,o.generateMipmaps=!1,o.flipY=!1,t&&t(o,a)}return super.load(e,s,n,r)}}const fs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Tr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const fy=new Eu(-1,1,1,-1,0,1);class hy extends Ln{constructor(){super(),this.setAttribute("position",new nn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new nn([0,2,0,0,2,0],2))}}const py=new hy;class Lu{constructor(e){this._mesh=new en(py,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,fy)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Nu extends Tr{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Ot?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Es.clone(e.uniforms),this.material=new Ot({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Lu(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Uc extends Tr{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class my extends Tr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class gy{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Ge);this._width=n.width,this._height=n.height,t=new fn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:$t}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Nu(fs),this.copyPass.material.blending=In,this.clock=new f_}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let r=0,s=this.passes.length;r<s;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Uc!==void 0&&(o instanceof Uc?n=!0:o instanceof my&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Ge);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class _y extends Tr{constructor(e,t,n=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new it}render(e,t,n){const r=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}}const vy={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new it(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class ki extends Tr{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e!==void 0?new Ge(e.x,e.y):new Ge(256,256),this.clearColor=new it(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new fn(s,o,{type:$t}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const h=new fn(s,o,{type:$t});h.texture.name="UnrealBloomPass.h"+f,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const p=new fn(s,o,{type:$t});p.texture.name="UnrealBloomPass.v"+f,p.texture.generateMipmaps=!1,this.renderTargetsVertical.push(p),s=Math.round(s/2),o=Math.round(o/2)}const a=vy;this.highPassUniforms=Es.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ot({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new Ge(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const d=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=d,this.bloomTintColors=[new $(1,1,1),new $(1,1,1),new $(1,1,1),new $(1,1,1),new $(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Es.clone(fs.uniforms),this.blendMaterial=new Ot({uniforms:this.copyUniforms,vertexShader:fs.vertexShader,fragmentShader:fs.fragmentShader,blending:vo,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new it,this._oldClearAlpha=1,this._basic=new Ta,this._fsQuad=new Lu(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,r),this.renderTargetsVertical[s].setSize(n,r),this.separableBlurMaterials[s].uniforms.invSize.value=new Ge(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(e,t,n,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=ki.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ki.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Ot({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Ge(.5,.5)},direction:{value:new Ge(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new Ot({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}ki.BlurDirectionX=new Ge(1,0);ki.BlurDirectionY=new Ge(0,1);const xy={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new Ge(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec2 resolution;
		varying vec2 vUv;

		#define EDGE_STEP_COUNT 6
		#define EDGE_GUESS 8.0
		#define EDGE_STEPS 1.0, 1.5, 2.0, 2.0, 2.0, 4.0
		const float edgeSteps[EDGE_STEP_COUNT] = float[EDGE_STEP_COUNT]( EDGE_STEPS );

		float _ContrastThreshold = 0.0312;
		float _RelativeThreshold = 0.063;
		float _SubpixelBlending = 1.0;

		vec4 Sample( sampler2D  tex2D, vec2 uv ) {

			return texture( tex2D, uv );

		}

		float SampleLuminance( sampler2D tex2D, vec2 uv ) {

			return dot( Sample( tex2D, uv ).rgb, vec3( 0.3, 0.59, 0.11 ) );

		}

		float SampleLuminance( sampler2D tex2D, vec2 texSize, vec2 uv, float uOffset, float vOffset ) {

			uv += texSize * vec2(uOffset, vOffset);
			return SampleLuminance(tex2D, uv);

		}

		struct LuminanceData {

			float m, n, e, s, w;
			float ne, nw, se, sw;
			float highest, lowest, contrast;

		};

		LuminanceData SampleLuminanceNeighborhood( sampler2D tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData l;
			l.m = SampleLuminance( tex2D, uv );
			l.n = SampleLuminance( tex2D, texSize, uv,  0.0,  1.0 );
			l.e = SampleLuminance( tex2D, texSize, uv,  1.0,  0.0 );
			l.s = SampleLuminance( tex2D, texSize, uv,  0.0, -1.0 );
			l.w = SampleLuminance( tex2D, texSize, uv, -1.0,  0.0 );

			l.ne = SampleLuminance( tex2D, texSize, uv,  1.0,  1.0 );
			l.nw = SampleLuminance( tex2D, texSize, uv, -1.0,  1.0 );
			l.se = SampleLuminance( tex2D, texSize, uv,  1.0, -1.0 );
			l.sw = SampleLuminance( tex2D, texSize, uv, -1.0, -1.0 );

			l.highest = max( max( max( max( l.n, l.e ), l.s ), l.w ), l.m );
			l.lowest = min( min( min( min( l.n, l.e ), l.s ), l.w ), l.m );
			l.contrast = l.highest - l.lowest;
			return l;

		}

		bool ShouldSkipPixel( LuminanceData l ) {

			float threshold = max( _ContrastThreshold, _RelativeThreshold * l.highest );
			return l.contrast < threshold;

		}

		float DeterminePixelBlendFactor( LuminanceData l ) {

			float f = 2.0 * ( l.n + l.e + l.s + l.w );
			f += l.ne + l.nw + l.se + l.sw;
			f *= 1.0 / 12.0;
			f = abs( f - l.m );
			f = clamp( f / l.contrast, 0.0, 1.0 );

			float blendFactor = smoothstep( 0.0, 1.0, f );
			return blendFactor * blendFactor * _SubpixelBlending;

		}

		struct EdgeData {

			bool isHorizontal;
			float pixelStep;
			float oppositeLuminance, gradient;

		};

		EdgeData DetermineEdge( vec2 texSize, LuminanceData l ) {

			EdgeData e;
			float horizontal =
				abs( l.n + l.s - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.se - 2.0 * l.e ) +
				abs( l.nw + l.sw - 2.0 * l.w );
			float vertical =
				abs( l.e + l.w - 2.0 * l.m ) * 2.0 +
				abs( l.ne + l.nw - 2.0 * l.n ) +
				abs( l.se + l.sw - 2.0 * l.s );
			e.isHorizontal = horizontal >= vertical;

			float pLuminance = e.isHorizontal ? l.n : l.e;
			float nLuminance = e.isHorizontal ? l.s : l.w;
			float pGradient = abs( pLuminance - l.m );
			float nGradient = abs( nLuminance - l.m );

			e.pixelStep = e.isHorizontal ? texSize.y : texSize.x;

			if (pGradient < nGradient) {

				e.pixelStep = -e.pixelStep;
				e.oppositeLuminance = nLuminance;
				e.gradient = nGradient;

			} else {

				e.oppositeLuminance = pLuminance;
				e.gradient = pGradient;

			}

			return e;

		}

		float DetermineEdgeBlendFactor( sampler2D  tex2D, vec2 texSize, LuminanceData l, EdgeData e, vec2 uv ) {

			vec2 uvEdge = uv;
			vec2 edgeStep;
			if (e.isHorizontal) {

				uvEdge.y += e.pixelStep * 0.5;
				edgeStep = vec2( texSize.x, 0.0 );

			} else {

				uvEdge.x += e.pixelStep * 0.5;
				edgeStep = vec2( 0.0, texSize.y );

			}

			float edgeLuminance = ( l.m + e.oppositeLuminance ) * 0.5;
			float gradientThreshold = e.gradient * 0.25;

			vec2 puv = uvEdge + edgeStep * edgeSteps[0];
			float pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
			bool pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !pAtEnd; i++ ) {

				puv += edgeStep * edgeSteps[i];
				pLuminanceDelta = SampleLuminance( tex2D, puv ) - edgeLuminance;
				pAtEnd = abs( pLuminanceDelta ) >= gradientThreshold;

			}

			if ( !pAtEnd ) {

				puv += edgeStep * EDGE_GUESS;

			}

			vec2 nuv = uvEdge - edgeStep * edgeSteps[0];
			float nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
			bool nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			for ( int i = 1; i < EDGE_STEP_COUNT && !nAtEnd; i++ ) {

				nuv -= edgeStep * edgeSteps[i];
				nLuminanceDelta = SampleLuminance( tex2D, nuv ) - edgeLuminance;
				nAtEnd = abs( nLuminanceDelta ) >= gradientThreshold;

			}

			if ( !nAtEnd ) {

				nuv -= edgeStep * EDGE_GUESS;

			}

			float pDistance, nDistance;
			if ( e.isHorizontal ) {

				pDistance = puv.x - uv.x;
				nDistance = uv.x - nuv.x;

			} else {

				pDistance = puv.y - uv.y;
				nDistance = uv.y - nuv.y;

			}

			float shortestDistance;
			bool deltaSign;
			if ( pDistance <= nDistance ) {

				shortestDistance = pDistance;
				deltaSign = pLuminanceDelta >= 0.0;

			} else {

				shortestDistance = nDistance;
				deltaSign = nLuminanceDelta >= 0.0;

			}

			if ( deltaSign == ( l.m - edgeLuminance >= 0.0 ) ) {

				return 0.0;

			}

			return 0.5 - shortestDistance / ( pDistance + nDistance );

		}

		vec4 ApplyFXAA( sampler2D  tex2D, vec2 texSize, vec2 uv ) {

			LuminanceData luminance = SampleLuminanceNeighborhood( tex2D, texSize, uv );
			if ( ShouldSkipPixel( luminance ) ) {

				return Sample( tex2D, uv );

			}

			float pixelBlend = DeterminePixelBlendFactor( luminance );
			EdgeData edge = DetermineEdge( texSize, luminance );
			float edgeBlend = DetermineEdgeBlendFactor( tex2D, texSize, luminance, edge, uv );
			float finalBlend = max( pixelBlend, edgeBlend );

			if (edge.isHorizontal) {

				uv.y += edge.pixelStep * finalBlend;

			} else {

				uv.x += edge.pixelStep * finalBlend;

			}

			return Sample( tex2D, uv );

		}

		void main() {

			gl_FragColor = ApplyFXAA( tDiffuse, resolution.xy, vUv );

		}`};/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/const Sy=`precision highp float;

in vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`,yy=`precision highp float;

out vec4 fragmentColor;

uniform vec2 resolution;
uniform float rand;

void main() {
  float aspectRatio = resolution.x / resolution.y; 
  vec2 vUv = gl_FragCoord.xy / resolution;
  float noise = (fract(sin(dot(vUv, vec2(12.9898 + rand,78.233)*2.0)) * 43758.5453));

  vUv -= .5;
  vUv.x *= aspectRatio;

  float factor = 4.;
  float d = factor * length(vUv);
  vec3 from = vec3(3.) / 255.;
  vec3 to = vec3(16., 12., 20.) / 2550.;

  fragmentColor = vec4(mix(from, to, d) + .005 * noise, 1.);
}
`,Lc={fs:yy,vs:Sy};/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/const Ey=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
  varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

uniform float time;

uniform vec4 inputData;
uniform vec4 outputData;

vec3 calc( vec3 pos ) {

  vec3 dir = normalize( pos );
  vec3 p = dir + vec3( time, 0., 0. );
  return pos +
    1. * inputData.x * inputData.y * dir * (.5 + .5 * sin(inputData.z * pos.x + time)) +
    1. * outputData.x * outputData.y * dir * (.5 + .5 * sin(outputData.z * pos.y + time))
  ;
}

vec3 spherical( float r, float theta, float phi ) {
  return r * vec3(
    cos( theta ) * cos( phi ),
    sin( theta ) * cos( phi ),
    sin( phi )
  );
}

void main() {
  #include <uv_vertex>
  #include <color_vertex>
  #include <morphinstance_vertex>
  #include <morphcolor_vertex>
  #include <batching_vertex>
  #include <beginnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <defaultnormal_vertex>
  #include <normal_vertex>
  #include <begin_vertex>

  float inc = 0.001;

  float r = length( position );
  float theta = ( uv.x + 0.5 ) * 2. * PI;
  float phi = -( uv.y + 0.5 ) * PI;

  vec3 np = calc( spherical( r, theta, phi )  );

  vec3 tangent = normalize( calc( spherical( r, theta + inc, phi ) ) - np );
  vec3 bitangent = normalize( calc( spherical( r, theta, phi + inc ) ) - np );
  transformedNormal = -normalMatrix * normalize( cross( tangent, bitangent ) );

  vNormal = normalize( transformedNormal );

  transformed = np;

  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <displacementmap_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  vViewPosition = - mvPosition.xyz;
  #include <worldpos_vertex>
  #include <shadowmap_vertex>
  #include <fog_vertex>
  #ifdef USE_TRANSMISSION
    vWorldPosition = worldPosition.xyz;
  #endif
}`,My=Ey;var Ty=Object.defineProperty,Ay=Object.getOwnPropertyDescriptor,Ra=(i,e,t,n)=>{for(var r=n>1?void 0:n?Ay(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(r=(n?o(e,t,r):o(r))||r);return n&&r&&Ty(e,t,r),r};let mr=class extends ui{constructor(){super(...arguments),this.prevTime=0,this.rotation=new $(0,0,0)}set outputNode(i){this._outputNode=i,this.outputAnalyser=new _s(this._outputNode)}get outputNode(){return this._outputNode}set inputNode(i){this._inputNode=i,this.inputAnalyser=new _s(this._inputNode)}get inputNode(){return this._inputNode}connectedCallback(){super.connectedCallback()}init(){const i=new Qg;i.background=new it(1051668);const e=new en(new Ms(10,5),new n_({uniforms:{resolution:{value:new Ge(1,1)},rand:{value:0}},vertexShader:Lc.vs,fragmentShader:Lc.fs,glslVersion:ia}));e.material.side=Bt,i.add(e),this.backdrop=e;const t=new Zt(75,window.innerWidth/window.innerHeight,.1,1e3);t.position.set(2,-2,5),this.camera=t;const n=new KS({canvas:this.canvas,antialias:!1});n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio/1);const r=new Ms(1,10),s=new sa(n);s.compileEquirectangularShader();const o=new i_({color:16,metalness:.5,roughness:.1,emissive:16,emissiveIntensity:1.5});o.onBeforeCompile=g=>{g.uniforms.time={value:0},g.uniforms.inputData={value:new gt},g.uniforms.outputData={value:new gt},o.userData.shader=g,g.vertexShader=My};const a=new en(r,o);i.add(a),a.visible=!1,this.sphere=a,new dy().load("/piz_compressed.exr",g=>{g.mapping=vs;const S=s.fromEquirectangular(g);o.envMap=S.texture,a.visible=!0},void 0,g=>{console.error("Error loading EXR:",g),a.visible=!0});const l=new _y(i,t),d=new ki(new Ge(window.innerWidth,window.innerHeight),5,.5,0),f=new Nu(xy),h=new gy(n);h.addPass(l),h.addPass(d),this.composer=h;function p(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix();const g=n.getPixelRatio(),S=window.innerWidth,E=window.innerHeight;e.material.uniforms.resolution.value.set(S*g,E*g),n.setSize(S,E),h.setSize(S,E),f.material.uniforms.resolution.value.set(1/(S*g),1/(E*g))}window.addEventListener("resize",p),p(),this.animation()}animation(){requestAnimationFrame(()=>this.animation()),this.inputAnalyser.update(),this.outputAnalyser.update();const i=performance.now(),e=(i-this.prevTime)/(1e3/60);this.prevTime=i;const t=this.backdrop.material,n=this.sphere.material;if(t.uniforms.rand.value=Math.random()*1e4,n.userData.shader){this.sphere.scale.setScalar(1+.2*this.outputAnalyser.data[1]/255);const r=.001;this.rotation.x+=e*r*.5*this.outputAnalyser.data[1]/255,this.rotation.z+=e*r*.5*this.inputAnalyser.data[1]/255,this.rotation.y+=e*r*.25*this.inputAnalyser.data[2]/255,this.rotation.y+=e*r*.25*this.outputAnalyser.data[2]/255;const s=new hn(this.rotation.x,this.rotation.y,this.rotation.z),o=new Wi().setFromEuler(s),a=new $(0,0,5);a.applyQuaternion(o),this.camera.position.copy(a),this.camera.lookAt(this.sphere.position),n.userData.shader.uniforms.time.value+=e*.1*this.outputAnalyser.data[0]/255,n.userData.shader.uniforms.inputData.value.set(1*this.inputAnalyser.data[0]/255,.1*this.inputAnalyser.data[1]/255,10*this.inputAnalyser.data[2]/255,0),n.userData.shader.uniforms.outputData.value.set(2*this.outputAnalyser.data[0]/255,.1*this.outputAnalyser.data[1]/255,10*this.outputAnalyser.data[2]/255,0)}this.composer.render()}firstUpdated(){this.canvas=this.shadowRoot.querySelector("canvas"),this.init()}render(){return Pi`<canvas></canvas>`}};mr.styles=ua`
    canvas {
      width: 100% !important;
      height: 100% !important;
      position: absolute;
      inset: 0;
      image-rendering: pixelated;
    }
  `;Ra([vr()],mr.prototype,"outputNode",1);Ra([vr()],mr.prototype,"inputNode",1);mr=Ra([ha("gdm-live-audio-visuals-3d")],mr);var Cy=Object.defineProperty,wy=Object.getOwnPropertyDescriptor,rn=(i,e,t,n)=>{for(var r=n>1?void 0:n?wy(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(r=(n?o(e,t,r):o(r))||r);return n&&r&&Cy(e,t,r),r};const Nc=window.AudioContext||window.webkitAudioContext,ho=20*1024*1024;let Ut=class extends ui{constructor(){super(),this.isRecording=!1,this.status="Choose instruction method: Upload a file or type manually.",this.error="",this.selectedFile=null,this.systemInstructionFromFile=null,this.isFileProcessing=!1,this.isSessionInitialized=!1,this.instructionMode="file",this.manualSystemInstruction="",this._model="gemini-2.5-flash-preview-native-audio-dialog",this.session=null,this.inputAudioContext=new Nc({sampleRate:16e3}),this.outputAudioContext=new Nc({sampleRate:24e3}),this.inputNode=this.inputAudioContext.createGain(),this.outputNode=this.outputAudioContext.createGain(),this.nextStartTime=0,this.mediaStream=null,this.sourceNode=null,this.scriptProcessorNode=null,this.sources=new Set,this.errorTimeoutId=null,console.log("GdmLiveAudio constructor called"),this.initClientOnly(),this.updateInitialStatus()}get apiKey(){return this._apiKey}set apiKey(i){const e=this._apiKey;this._apiKey=i,this.requestUpdate("apiKey",e),i&&this.initClientOnly()}get model(){return this._model}set model(i){this._model=i}connectedCallback(){super.connectedCallback(),console.log("GdmLiveAudio connectedCallback called")}firstUpdated(){console.log("GdmLiveAudio firstUpdated called")}updateInitialStatus(){this.instructionMode==="file"?this.status='Please select a file (PDF, TXT, RTF, XML, CSV, DOCX), then click "Process File".':this.status='Type your system instructions, then click "Apply Manual Instructions".'}handleInstructionModeChange(i){if(this.instructionMode!==i){if(this.instructionMode=i,this.updateError(""),i==="file")this.manualSystemInstruction="",this.status='Please select a file (PDF, TXT, RTF, XML, CSV, DOCX), then click "Process File".';else{this.selectedFile=null,this.systemInstructionFromFile=null;const e=this.shadowRoot?.getElementById("fileUpload");e&&(e.value=""),this.status='Type your system instructions, then click "Apply Manual Instructions".'}this.isSessionInitialized=!1}}initAudio(){this.nextStartTime=this.outputAudioContext.currentTime}async readFileAsBase64(i){return new Promise((e,t)=>{const n=new FileReader;n.onload=()=>{const s=n.result.split(",")[1];s?e(s):t(new Error("Could not extract base64 data from file."))},n.onerror=r=>t(r),n.readAsDataURL(i)})}async readFileAsText(i){return new Promise((e,t)=>{const n=new FileReader;n.onload=()=>{e(n.result)},n.onerror=r=>t(r),n.readAsText(i)})}async extractTextFromFileContent(i){if(i.size>ho){this.updateError(`File "${i.name}" exceeds the 20MB size limit.`),this.updateStatus(`File "${i.name}" is too large. Please select a smaller file (Max 20MB).`),this.selectedFile=null;const t=this.shadowRoot?.getElementById("fileUpload");return t&&(t.value=""),null}this.isFileProcessing=!0,this.updateError("");const e=i.name.toLowerCase();try{if(e.endsWith(".txt")){this.updateStatus(`Reading ${i.name} directly for system instruction...`);const t=await this.readFileAsText(i);if(t&&t.trim().length>0)return this.updateStatus(`Using content of ${i.name} as system instruction.`),t.trim();throw new Error(`File ${i.name} is empty or contains only whitespace.`)}else return this.updateError("Only .txt files are supported. Please select a text file."),this.updateStatus("File type not supported. Please select a .txt file."),null}catch(t){return console.error(`Error processing file ${i.name}:`,t),this.updateError(`Error processing ${i.name}: ${t.message||t}`),this.updateStatus(`Failed to process ${i.name}.`),null}finally{this.isFileProcessing=!1}}initClientOnly(){if(console.log("GdmLiveAudio initClientOnly called"),this.initAudio(),!this._apiKey){console.log("API key not provided, skipping client initialization");return}if(this.client){console.log("GoogleGenAI client already initialized");return}try{console.log("Attempting to create GoogleGenAI client"),this.updateStatus("Connecting to Google AI client..."),this.client=new rm({apiKey:this._apiKey}),console.log("GoogleGenAI client created successfully"),this.outputNode.connect(this.outputAudioContext.destination),console.log("outputNode connected"),this.updateStatus("Google AI client initialized successfully")}catch(i){console.error("Error during initClientOnly:",i),this.updateError(`Initialization error: ${i.message||i}`),console.log("initClientOnly stopped due to error"),this.client=void 0}}async handleFileChange(i){const e=i.target;if(e.files&&e.files.length>0){const t=e.files[0];if(t.size>ho){this.updateError(`File "${t.name}" exceeds 20MB limit.`),this.updateStatus("File too large (max 20MB). Select another file."),this.selectedFile=null,e.value="";return}if(!t.name.toLowerCase().endsWith(".txt")){this.updateError("Only .txt files are supported."),this.updateStatus("Please select a .txt file."),this.selectedFile=null,e.value="";return}this.selectedFile=t,this.updateStatus(`File '${this.selectedFile.name}' selected. Click "Process File".`),this.isSessionInitialized=!1,this.systemInstructionFromFile=null,this.updateError("")}else this.selectedFile=null,this.updateStatus('Please select a .txt file, then click "Process File".')}handleManualInstructionInput(i){const e=i.target;this.manualSystemInstruction=e.value,this.manualSystemInstruction.trim()===""?this.status='Type your system instructions, then click "Apply Manual Instructions".':this.status='Instructions entered. Click "Apply Manual Instructions".',this.isSessionInitialized=!1,this.updateError("")}async triggerFileProcessing(){if(!this.selectedFile){this.updateError("No file selected to process.");return}if(!this.isFileProcessing){if(this.selectedFile.size>ho){this.updateError(`File "${this.selectedFile.name}" exceeds 20MB limit and cannot be processed.`),this.updateStatus(`File "${this.selectedFile.name}" is too large (Max 20MB).`),this.selectedFile=null;const i=this.shadowRoot?.getElementById("fileUpload");i&&(i.value="");return}this.isSessionInitialized=!1,this.updateError("");try{const i=await this.extractTextFromFileContent(this.selectedFile);i?(this.systemInstructionFromFile=i,await this.initSession(i,`from file "${this.selectedFile?.name}"`)):(this.error||this.updateStatus(`File processing did not yield text from ${this.selectedFile.name}. Using default system instruction.`),await this.initSession(null,"default (file processing failed)"))}catch(i){this.updateError(`Failed to read or process file: ${i.message}`),this.updateStatus(`Error with ${this.selectedFile.name}. Using default system instruction.`),await this.initSession(null,"default (file processing error)")}}}async applyManualInstructions(){if(!(this.isFileProcessing||this.isRecording)){if(!this.manualSystemInstruction.trim()){this.updateError("Manual system instruction cannot be empty."),this.updateStatus("Please enter system instructions before applying.");return}this.isSessionInitialized=!1,this.updateError(""),this.updateStatus("Applying manual system instruction..."),await this.initSession(this.manualSystemInstruction.trim(),"from manual input")}}async initSession(i,e){if(console.log("GdmLiveAudio initSession called"),this.session){try{await this.session.close()}catch(s){console.warn("Could not close previous session cleanly:",s)}this.session=null}if(!this.client){console.error("GoogleGenAI client is not initialized in initSession."),this.updateError("Initialization error: GoogleGenAI client not available."),console.log("initSession stopped: client not available");return}const t=i||"You are an interactive ai with dialogue abilities.",n=e||"default";console.log(`Applying system instruction (${n}): "${t.substring(0,100)}${t.length>100?"...":""}"`);const r={parts:[{text:t}]};this.updateStatus(`Using instruction ${n}. Initializing audio session...`);try{this.session=await this.client.live.connect({model:this._model,callbacks:{onopen:()=>{this.updateStatus(`Instruction ${n} applied. Press 🔴 to start audio session.`),this.isSessionInitialized=!0},onmessage:async s=>{const o=s.serverContent?.modelTurn?.parts?.[0]?.inlineData;if(o&&o.data){this.nextStartTime=Math.max(this.nextStartTime,this.outputAudioContext.currentTime);try{const l=await Dm(Pm(o.data),this.outputAudioContext,24e3,1),d=this.outputAudioContext.createBufferSource();d.buffer=l,d.connect(this.outputNode),d.addEventListener("ended",()=>{this.sources.delete(d)}),d.start(this.nextStartTime),this.nextStartTime=this.nextStartTime+l.duration,this.sources.add(d)}catch(l){console.error("Error processing audio data:",l),this.updateError(`Audio processing error: ${l.message||l}`)}}if(s.serverContent&&s.serverContent.interrupted){for(const l of Array.from(this.sources.values())){try{l.stop()}catch(d){console.error("Error stopping audio source:",d)}this.sources.delete(l)}this.nextStartTime=0}},onerror:s=>{console.error("Session Error:",s),this.updateError(`Session Error: ${s.message||s.error||s}`),this.isSessionInitialized=!1},onclose:s=>{this.updateStatus(`Session Closed: ${s.reason||"Unknown reason"}`),this.isSessionInitialized=!1}},config:{responseModalities:[ar.AUDIO],speechConfig:{voiceConfig:{prebuiltVoiceConfig:{voiceName:"Orus"}}},systemInstruction:r}})}catch(s){console.error("Failed to initialize session:",s),this.updateError(`Failed to initialize session: ${s.message}`),this.updateStatus("Error initializing audio session."),this.isSessionInitialized=!1}}updateStatus(i){this.status=i,console.log("Status:",i)}updateError(i){this.errorTimeoutId&&(clearTimeout(this.errorTimeoutId),this.errorTimeoutId=null),this.error=i,i&&(console.error("Error:",i),this.errorTimeoutId=window.setTimeout(()=>{this.error===i&&(this.error=""),this.errorTimeoutId=null},1e4))}async startRecording(){if(this.isRecording||!this.isSessionInitialized){this.isSessionInitialized||this.updateError("Session not ready. Apply system instructions first.");return}this.inputAudioContext.resume(),this.updateStatus("Requesting microphone access..."),this.updateError("");try{this.mediaStream=await navigator.mediaDevices.getUserMedia({audio:!0,video:!1}),this.updateStatus("Microphone access granted. Starting capture..."),this.sourceNode=this.inputAudioContext.createMediaStreamSource(this.mediaStream),this.sourceNode.connect(this.inputNode);const i=256;this.scriptProcessorNode=this.inputAudioContext.createScriptProcessor(i,1,1),this.scriptProcessorNode.onaudioprocess=e=>{if(!this.isRecording||!this.session)return;const n=e.inputBuffer.getChannelData(0);try{this.session.sendRealtimeInput({media:Im(n)})}catch(r){console.error("Error sending real-time input:",r),this.updateError(`Error sending audio: ${r.message}`)}},this.sourceNode.connect(this.scriptProcessorNode),this.scriptProcessorNode.connect(this.inputAudioContext.destination),this.isRecording=!0,this.updateStatus("🔴 Recording... Speak now. To stop the recording press 🟥")}catch(i){console.error("Error starting recording:",i),this.updateStatus(`Error starting recording: ${i.message}`),this.updateError(`Error starting recording: ${i.message}`),this.stopRecording()}}stopRecording(){const i=this.isRecording;this.isRecording=!1,i&&this.updateStatus("Stopping recording..."),this.scriptProcessorNode&&(this.scriptProcessorNode.disconnect(),this.scriptProcessorNode.onaudioprocess=null,this.scriptProcessorNode=null),this.sourceNode&&(this.sourceNode.disconnect(),this.sourceNode=null),this.mediaStream&&(this.mediaStream.getTracks().forEach(e=>e.stop()),this.mediaStream=null),i?this.isSessionInitialized?this.updateStatus("Recording stopped. Press 🔴 to start again."):this.updateStatus("Recording stopped. Session is not active."):this.isSessionInitialized||this.updateInitialStatus()}async reset(){if(this.updateStatus("Resetting application..."),this.updateError(""),this.stopRecording(),this.session){try{await this.session.close()}catch(t){console.error("Error closing session during reset:",t),this.updateError(`Error closing session: ${t.message}`)}this.session=null}this.selectedFile=null,this.systemInstructionFromFile=null,this.manualSystemInstruction="",this.isFileProcessing=!1,this.isSessionInitialized=!1,this.instructionMode="file";const i=this.shadowRoot?.getElementById("fileUpload");i&&(i.value="");const e=this.shadowRoot?.getElementById("manualInstructionTextarea");e&&(e.value=""),this.updateInitialStatus()}render(){const i=this.isRecording||this.isFileProcessing;return Pi`
      <div>
        <div class="top-controls">
          <button
            class="icon-button"
            id="resetButton"
            @click=${this.reset}
            ?disabled=${this.isRecording}
            title="Reset Session, File selection, and Manual Instructions">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ffffff">
              <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
            </svg>
          </button>
          <button
            class="icon-button"
            id="startButton"
            @click=${this.startRecording}
            ?disabled=${i||!this.isSessionInitialized}
            title="Start Recording">
            <svg viewBox="0 0 100 100" width="32px" height="32px" fill="#c80000" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="50" />
            </svg>
          </button>
          <button
            class="icon-button"
            id="stopButton"
            @click=${this.stopRecording}
            ?disabled=${!this.isRecording}
            title="Stop Recording">
            <svg viewBox="0 0 100 100" width="32px" height="32px" fill="#c80000" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="0" width="100" height="100" rx="15" />
            </svg>
          </button>
        </div>

        <div class="bottom-controls-wrapper">
          <div class="instruction-mode-selector" role="radiogroup" aria-label="System instruction input method">
            <button 
              role="radio" 
              aria-checked=${this.instructionMode==="file"}
              ?active=${this.instructionMode==="file"}
              @click=${()=>this.handleInstructionModeChange("file")}
              ?disabled=${i}
              title="Upload a file for system instructions">
              Upload File
            </button>
            <button 
              role="radio" 
              aria-checked=${this.instructionMode==="manual"}
              ?active=${this.instructionMode==="manual"}
              @click=${()=>this.handleInstructionModeChange("manual")}
              ?disabled=${i}
              title="Type system instructions manually">
              Type Manually
            </button>
          </div>

          ${this.instructionMode==="file"?Pi`
            <div class="file-controls-container">
              <input 
                type="file" 
                id="fileUpload" 
                accept=".txt,text/plain" 
                @change=${this.handleFileChange}
                ?disabled=${i}
                aria-label="Select File for system instructions"
              />
              <button 
                id="processFileButton" 
                @click=${this.triggerFileProcessing} 
                ?disabled=${!this.selectedFile||i}
                title="Process selected file to extract system instructions">
                Process File
              </button>
            </div>
          `:""}

          ${this.instructionMode==="manual"?Pi`
            <div class="manual-input-container">
              <textarea 
                id="manualInstructionTextarea"
                .value=${this.manualSystemInstruction}
                @input=${this.handleManualInstructionInput}
                ?disabled=${i}
                placeholder="Type system instructions here..."
                aria-label="Textarea for manual system instructions"
              ></textarea>
              <button 
                id="applyManualInstructionButton" 
                @click=${this.applyManualInstructions} 
                ?disabled=${!this.manualSystemInstruction.trim()||i}
                title="Apply manually entered system instructions">
                Apply Manual Instructions
              </button>
            </div>
          `:""}
        </div>

        <div id="status" role="status" aria-live="polite">
         ${this.error?Pi`<strong>Error:</strong> ${this.error}`:this.status}
        </div>
        <gdm-live-audio-visuals-3d
          .inputNode=${this.inputNode}
          .outputNode=${this.outputNode}></gdm-live-audio-visuals-3d>
      </div>
    `}};Ut.styles=ua`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }

    #status {
      position: absolute;
      bottom: 2vh; /* Adjusted for potentially taller controls */
      left: 0;
      right: 0;
      z-index: 10;
      text-align: center;
      padding: 0 10px;
      color: #fff;
      font-size: 14px;
    }

    .top-controls {
      z-index: 10;
      position: absolute;
      top: 3vh; 
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row; 
      flex-wrap: wrap; 
      gap: 10px;
      padding: 0 10px; 
    }
    
    .bottom-controls-wrapper {
      position: absolute;
      bottom: calc(2vh + 30px); /* Position above status */
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      z-index: 5;
      padding: 0 10px;
    }

    .instruction-mode-selector {
      display: flex;
      gap: 10px;
      margin-bottom: 5px; /* Space before the input areas */
    }

    .instruction-mode-selector button {
      outline: none;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      padding: 8px 15px;
      cursor: pointer;
      font-size: 14px;
    }

    .instruction-mode-selector button[active] {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.4);
    }
    
    .instruction-mode-selector button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .file-controls-container, .manual-input-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 15px;
      width: 100%; /* Ensure containers take up available width for centering */
    }
    
    .top-controls button, 
    .file-controls-container button,
    .manual-input-container button {
      outline: none;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.1);
      width: auto; 
      min-width: 64px;
      height: 64px;
      cursor: pointer;
      font-size: 16px;
      padding: 0 15px;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      &[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    
    .top-controls .icon-button {
       width: 64px;
       font-size: 24px;
       padding: 0;
    }

    .file-controls-container input[type="file"], 
    .manual-input-container textarea {
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.1);
      padding: 0 15px;
      border-radius: 12px;
      cursor: pointer;
      max-width: 280px; 
      min-width: 200px; 
      font-size: 14px;
      height: 48px;
      line-height: 46px;
      box-sizing: border-box; 
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .manual-input-container textarea {
      height: 70px; /* More height for textarea */
      line-height: 1.4; /* Adjust line-height for multi-line text */
      padding: 10px 15px; /* Adjust padding for textarea */
      white-space: pre-wrap; /* Allow text wrapping */
      resize: none; /* Disable manual resize */
      font-family: inherit; /* Use host font */
    }


    .file-controls-container input[type="file"]::file-selector-button {
      margin-right: 12px;
      border: none;
      background: #007bff;
      padding: 0 15px;
      border-radius: 8px;
      color: white;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      height: 32px;
      font-size: 14px;
    }

    .file-controls-container input[type="file"]::file-selector-button:hover {
      background: #0056b3;
    }

    .file-controls-container button#processFileButton,
    .manual-input-container button#applyManualInstructionButton {
      height: 48px;
      padding: 0 25px;
      font-size: 14px;
      min-width: 140px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }
  `;rn([pn()],Ut.prototype,"isRecording",2);rn([pn()],Ut.prototype,"status",2);rn([pn()],Ut.prototype,"error",2);rn([pn()],Ut.prototype,"selectedFile",2);rn([pn()],Ut.prototype,"systemInstructionFromFile",2);rn([pn()],Ut.prototype,"isFileProcessing",2);rn([pn()],Ut.prototype,"isSessionInitialized",2);rn([pn()],Ut.prototype,"instructionMode",2);rn([pn()],Ut.prototype,"manualSystemInstruction",2);rn([pn()],Ut.prototype,"inputNode",2);rn([pn()],Ut.prototype,"outputNode",2);Ut=rn([ha("gdm-live-audio")],Ut);var Ry=Object.defineProperty,by=Object.getOwnPropertyDescriptor,ba=(i,e,t,n)=>{for(var r=n>1?void 0:n?by(e,t):e,s=i.length-1,o;s>=0;s--)(o=i[s])&&(r=(n?o(e,t,r):o(r))||r);return n&&r&&Ry(e,t,r),r};let gr=class extends ui{set outputNode(i){this._outputNode=i,this.outputAnalyser=new _s(this._outputNode)}get outputNode(){return this._outputNode}set inputNode(i){this._inputNode=i,this.inputAnalyser=new _s(this._inputNode)}get inputNode(){return this._inputNode}connectedCallback(){super.connectedCallback(),this.visualize()}visualize(){if(this.canvas&&this.outputAnalyser){const i=this.canvas,e=this.canvasCtx,t=i.width,n=i.height;e.clearRect(0,0,t,n),e.fillStyle="#1f2937",e.fillRect(0,0,t,n);const r=t/this.outputAnalyser.data.length;let s=0;const o=e.createLinearGradient(0,0,0,n);o.addColorStop(1,"#D16BA5"),o.addColorStop(.5,"#E78686"),o.addColorStop(0,"#FB5F5F"),e.fillStyle=o,this.inputAnalyser.update();for(let l=0;l<this.inputAnalyser.data.length;l++){const d=this.inputAnalyser.data[l]*(n/255);e.fillRect(s,n-d,r,d),s+=r}e.globalCompositeOperation="lighter";const a=e.createLinearGradient(0,0,0,n);a.addColorStop(1,"#3b82f6"),a.addColorStop(.5,"#10b981"),a.addColorStop(0,"#ef4444"),e.fillStyle=a,s=0,this.outputAnalyser.update();for(let l=0;l<this.outputAnalyser.data.length;l++){const d=this.outputAnalyser.data[l]*(n/255);e.fillRect(s,n-d,r,d),s+=r}}requestAnimationFrame(()=>this.visualize())}firstUpdated(){this.canvas=this.shadowRoot.querySelector("canvas"),this.canvas.width=400,this.canvas.height=400,this.canvasCtx=this.canvas.getContext("2d")}render(){return Pi`<canvas></canvas>`}};gr.styles=ua`
    canvas {
      width: 400px;
      aspect-ratio: 1 / 1;
    }
  `;ba([vr()],gr.prototype,"outputNode",1);ba([vr()],gr.prototype,"inputNode",1);gr=ba([ha("gdm-live-audio-visuals")],gr);document.addEventListener("DOMContentLoaded",()=>{const i=new Ut;document.body.appendChild(i)});window.lit={devMode:!1};const Fu=window.CONFIG?.apiKey,Py=window.CONFIG?.model||"gemini-2.5-flash-preview-native-audio-dialog";Fu||console.error("API key not provided in CONFIG object");const Iy=`
  .interactive-document-widget {
    width: 100%;
    height: 100%;
    position: relative;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    display: block;
  }

  .widget-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }

  .widget-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background: #f5f5f5;
    border-bottom: 1px solid #ddd;
    border-radius: 8px 8px 0 0;
  }

  .widget-title {
    margin: 0;
    font-size: 18px;
    color: #333;
  }

  .widget-close {
    background: none;
    border: none;
    font-size: 24px;
    color: #666;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }

  .widget-close:hover {
    color: #333;
  }

  gdm-live-audio {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
  }
`;class Dy{constructor(e={}){this.config={apiKey:e.apiKey||Fu,model:e.model||Py,width:e.width||"800px",height:e.height||"600px",...e},this.init()}async init(){try{this.overlay=document.createElement("div"),this.overlay.className="widget-overlay",this.widgetContainer=document.createElement("div"),this.widgetContainer.className="widget-popup",this.widgetContainer.style.width=this.config.width,this.widgetContainer.style.height=this.config.height;const e=document.createElement("div");e.className="widget-header";const t=document.createElement("h3");t.className="widget-title",t.textContent="Interactive Document Widget";const n=document.createElement("button");n.className="widget-close",n.textContent="×",n.onclick=()=>this.destroy(),e.appendChild(t),e.appendChild(n);const r=document.createElement("div");r.className="interactive-document-widget";const s=document.createElement("style");s.textContent=Iy,document.head.appendChild(s),await this.initializeGdmLiveAudio(r),this.widgetContainer.appendChild(e),this.widgetContainer.appendChild(r),document.body.appendChild(this.overlay),document.body.appendChild(this.widgetContainer),console.log("Widget initialized with API key:",!!this.config.apiKey)}catch(e){console.error("Failed to initialize widget:",e),this.handleError(e)}}async initializeGdmLiveAudio(e){try{if(this.mainElement=new Ut,this.mainElement.apiKey=this.config.apiKey,this.mainElement.model=this.config.model,!this.mainElement.apiKey)throw new Error("Failed to set API key on GdmLiveAudio component");e.appendChild(this.mainElement),console.log("GdmLiveAudio initialized successfully")}catch(t){console.error("Failed to initialize GdmLiveAudio:",t),this.handleError(t)}}async start(){this.mainElement&&typeof this.mainElement.startRecording=="function"&&await this.mainElement.startRecording()}async stop(){this.mainElement&&typeof this.mainElement.stopRecording=="function"&&await this.mainElement.stopRecording()}async reset(){this.mainElement&&typeof this.mainElement.reset=="function"&&await this.mainElement.reset()}handleError(e){if(console.error("Interactive Document Widget Error:",e),this.widgetContainer){const t=document.createElement("div");t.className="error-message",t.textContent=`Widget Error: ${e.message}`,this.widgetContainer.appendChild(t)}}destroy(){this.mainElement&&typeof this.mainElement.stopRecording=="function"&&this.mainElement.stopRecording(),this.overlay&&this.overlay.remove(),this.widgetContainer&&this.widgetContainer.remove()}}typeof window<"u"&&(window.openInteractiveDocumentWidget=function(){new Dy({width:"800px",height:"600px"})});
//# sourceMappingURL=widget.Kr9eLFWR.js.map
