/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class os{}function At(o,e){const t=/\{([^}]+)\}/g;return o.replace(t,(n,i)=>{if(Object.prototype.hasOwnProperty.call(e,i)){const s=e[i];return s!=null?String(s):""}else throw new Error(`Key '${i}' not found in valueMap.`)})}function h(o,e,t){for(let s=0;s<e.length-1;s++){const l=e[s];if(l.endsWith("[]")){const u=l.slice(0,-2);if(!(u in o))if(Array.isArray(t))o[u]=Array.from({length:t.length},()=>({}));else throw new Error(`Value must be a list given an array path ${l}`);if(Array.isArray(o[u])){const c=o[u];if(Array.isArray(t))for(let m=0;m<c.length;m++){const _=c[m];h(_,e.slice(s+1),t[m])}else for(const m of c)h(m,e.slice(s+1),t)}return}else if(l.endsWith("[0]")){const u=l.slice(0,-3);u in o||(o[u]=[{}]);const c=o[u];h(c[0],e.slice(s+1),t);return}(!o[l]||typeof o[l]!="object")&&(o[l]={}),o=o[l]}const n=e[e.length-1],i=o[n];if(i!==void 0){if(!t||typeof t=="object"&&Object.keys(t).length===0||t===i)return;if(typeof i=="object"&&typeof t=="object"&&i!==null&&t!==null)Object.assign(i,t);else throw new Error(`Cannot set value for an existing key. Key: ${n}`)}else o[n]=t}function p(o,e){try{if(e.length===1&&e[0]==="_self")return o;for(let t=0;t<e.length;t++){if(typeof o!="object"||o===null)return;const n=e[t];if(n.endsWith("[]")){const i=n.slice(0,-2);if(i in o){const s=o[i];return Array.isArray(s)?s.map(l=>p(l,e.slice(t+1))):void 0}else return}else o=o[n]}return o}catch(t){if(t instanceof TypeError)return;throw t}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Qt(o,e){if(!e||typeof e!="string")throw new Error("model is required and must be a string");if(o.isVertexAI()){if(e.startsWith("publishers/")||e.startsWith("projects/")||e.startsWith("models/"))return e;if(e.indexOf("/")>=0){const t=e.split("/",2);return`publishers/${t[0]}/models/${t[1]}`}else return`publishers/google/models/${e}`}else return e.startsWith("models/")||e.startsWith("tunedModels/")?e:`models/${e}`}function Bc(o,e){const t=Qt(o,e);return t?t.startsWith("publishers/")&&o.isVertexAI()?`projects/${o.getProject()}/locations/${o.getLocation()}/${t}`:t.startsWith("models/")&&o.isVertexAI()?`projects/${o.getProject()}/locations/${o.getLocation()}/publishers/google/${t}`:t:""}function Pl(o,e){if(e==null)throw new Error("PartUnion is required");if(typeof e=="object")return e;if(typeof e=="string")return{text:e};throw new Error(`Unsupported part type: ${typeof e}`)}function Vc(o,e){if(e==null||Array.isArray(e)&&e.length===0)throw new Error("PartListUnion is required");return Array.isArray(e)?e.map(t=>Pl(o,t)):[Pl(o,e)]}function Xs(o){return o!=null&&typeof o=="object"&&"parts"in o&&Array.isArray(o.parts)}function Dl(o){return o!=null&&typeof o=="object"&&"functionCall"in o}function bl(o){return o!=null&&typeof o=="object"&&"functionResponse"in o}function _n(o,e){if(e==null)throw new Error("ContentUnion is required");return Xs(e)?e:{role:"user",parts:Vc(o,e)}}function Oc(o,e){if(!e)return[];if(o.isVertexAI()&&Array.isArray(e))return e.flatMap(t=>{const n=_n(o,t);return n.parts&&n.parts.length>0&&n.parts[0].text!==void 0?[n.parts[0].text]:[]});if(o.isVertexAI()){const t=_n(o,e);return t.parts&&t.parts.length>0&&t.parts[0].text!==void 0?[t.parts[0].text]:[]}return Array.isArray(e)?e.map(t=>_n(o,t)):[_n(o,e)]}function Gt(o,e){if(e==null||Array.isArray(e)&&e.length===0)throw new Error("contents are required");if(!Array.isArray(e)){if(Dl(e)||bl(e))throw new Error("To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them");return[_n(o,e)]}const t=[],n=[],i=Xs(e[0]);for(const s of e){const l=Xs(s);if(l!=i)throw new Error("Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them");if(l)t.push(s);else{if(Dl(s)||bl(s))throw new Error("To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them");n.push(s)}}return i||t.push({role:"user",parts:Vc(o,n)}),t}function Lr(o,e){if(!o.isVertexAI()&&"default"in e)throw new Error("Default value is not supported in the response schema for the Gemini API.");if("anyOf"in e&&e.anyOf!==void 0)for(const t of e.anyOf)Lr(o,t);if("items"in e&&e.items!==void 0&&Lr(o,e.items),"properties"in e&&e.properties!==void 0)for(const t of Object.values(e.properties))Lr(o,t)}function kc(o,e){return Lr(o,e),e}function Gc(o,e){if(typeof e=="object"&&"voiceConfig"in e)return e;if(typeof e=="string")return{voiceConfig:{prebuiltVoiceConfig:{voiceName:e}}};throw new Error(`Unsupported speechConfig type: ${typeof e}`)}function rs(o,e){return e}function Dn(o,e){if(!Array.isArray(e))throw new Error("tool is required and must be an array of Tools");return e}function Fp(o,e,t,n=1){const i=!e.startsWith(`${t}/`)&&e.split("/").length===n;return o.isVertexAI()?e.startsWith("projects/")?e:e.startsWith("locations/")?`projects/${o.getProject()}/${e}`:e.startsWith(`${t}/`)?`projects/${o.getProject()}/locations/${o.getLocation()}/${e}`:i?`projects/${o.getProject()}/locations/${o.getLocation()}/${t}/${e}`:e:i?`${t}/${e}`:e}function Ii(o,e){if(typeof e!="string")throw new Error("name must be a string");return Fp(o,e,"cachedContents")}function Pi(o,e){if(typeof e!="string")throw new Error("fromImageBytes must be a string");return e}function Hc(o,e){if(typeof e!="string")throw new Error("fromName must be a string");return e.startsWith("files/")?e.split("files/")[1]:e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Bp(o,e){const t={};if(p(e,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=p(e,["thought"]);n!=null&&h(t,["thought"],n);const i=p(e,["codeExecutionResult"]);i!=null&&h(t,["codeExecutionResult"],i);const s=p(e,["executableCode"]);s!=null&&h(t,["executableCode"],s);const l=p(e,["fileData"]);l!=null&&h(t,["fileData"],l);const u=p(e,["functionCall"]);u!=null&&h(t,["functionCall"],u);const c=p(e,["functionResponse"]);c!=null&&h(t,["functionResponse"],c);const m=p(e,["inlineData"]);m!=null&&h(t,["inlineData"],m);const _=p(e,["text"]);return _!=null&&h(t,["text"],_),t}function Ul(o,e){const t={},n=p(e,["parts"]);n!=null&&(Array.isArray(n)?h(t,["parts"],n.map(s=>Bp(o,s))):h(t,["parts"],n));const i=p(e,["role"]);return i!=null&&h(t,["role"],i),t}function Vp(o,e){const t={};if(p(e,["response"])!==void 0)throw new Error("response parameter is not supported in Gemini API.");const n=p(e,["description"]);n!=null&&h(t,["description"],n);const i=p(e,["name"]);i!=null&&h(t,["name"],i);const s=p(e,["parameters"]);return s!=null&&h(t,["parameters"],s),t}function Op(){return{}}function kp(o,e){const t={},n=p(e,["mode"]);n!=null&&h(t,["mode"],n);const i=p(e,["dynamicThreshold"]);return i!=null&&h(t,["dynamicThreshold"],i),t}function Gp(o,e){const t={},n=p(e,["dynamicRetrievalConfig"]);return n!=null&&h(t,["dynamicRetrievalConfig"],kp(o,n)),t}function Hp(o,e){const t={},n=p(e,["functionDeclarations"]);if(n!=null&&(Array.isArray(n)?h(t,["functionDeclarations"],n.map(u=>Vp(o,u))):h(t,["functionDeclarations"],n)),p(e,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");p(e,["googleSearch"])!=null&&h(t,["googleSearch"],Op());const s=p(e,["googleSearchRetrieval"]);s!=null&&h(t,["googleSearchRetrieval"],Gp(o,s));const l=p(e,["codeExecution"]);return l!=null&&h(t,["codeExecution"],l),t}function zp(o,e){const t={},n=p(e,["mode"]);n!=null&&h(t,["mode"],n);const i=p(e,["allowedFunctionNames"]);return i!=null&&h(t,["allowedFunctionNames"],i),t}function Wp(o,e){const t={},n=p(e,["functionCallingConfig"]);return n!=null&&h(t,["functionCallingConfig"],zp(o,n)),t}function qp(o,e,t){const n={},i=p(e,["ttl"]);t!==void 0&&i!=null&&h(t,["ttl"],i);const s=p(e,["expireTime"]);t!==void 0&&s!=null&&h(t,["expireTime"],s);const l=p(e,["displayName"]);t!==void 0&&l!=null&&h(t,["displayName"],l);const u=p(e,["contents"]);t!==void 0&&u!=null&&(Array.isArray(u)?h(t,["contents"],Gt(o,Gt(o,u).map(v=>Ul(o,v)))):h(t,["contents"],Gt(o,u)));const c=p(e,["systemInstruction"]);t!==void 0&&c!=null&&h(t,["systemInstruction"],Ul(o,_n(o,c)));const m=p(e,["tools"]);t!==void 0&&m!=null&&(Array.isArray(m)?h(t,["tools"],m.map(v=>Hp(o,v))):h(t,["tools"],m));const _=p(e,["toolConfig"]);return t!==void 0&&_!=null&&h(t,["toolConfig"],Wp(o,_)),n}function $p(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["model"],Bc(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],qp(o,i,t)),t}function Xp(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["_url","name"],Ii(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],i),t}function Yp(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["_url","name"],Ii(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],i),t}function Kp(o,e,t){const n={},i=p(e,["ttl"]);t!==void 0&&i!=null&&h(t,["ttl"],i);const s=p(e,["expireTime"]);return t!==void 0&&s!=null&&h(t,["expireTime"],s),n}function Zp(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["_url","name"],Ii(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],Kp(o,i,t)),t}function Jp(o,e,t){const n={},i=p(e,["pageSize"]);t!==void 0&&i!=null&&h(t,["_query","pageSize"],i);const s=p(e,["pageToken"]);return t!==void 0&&s!=null&&h(t,["_query","pageToken"],s),n}function Qp(o,e){const t={},n=p(e,["config"]);return n!=null&&h(t,["config"],Jp(o,n,t)),t}function jp(o,e){const t={},n=p(e,["videoMetadata"]);n!=null&&h(t,["videoMetadata"],n);const i=p(e,["thought"]);i!=null&&h(t,["thought"],i);const s=p(e,["codeExecutionResult"]);s!=null&&h(t,["codeExecutionResult"],s);const l=p(e,["executableCode"]);l!=null&&h(t,["executableCode"],l);const u=p(e,["fileData"]);u!=null&&h(t,["fileData"],u);const c=p(e,["functionCall"]);c!=null&&h(t,["functionCall"],c);const m=p(e,["functionResponse"]);m!=null&&h(t,["functionResponse"],m);const _=p(e,["inlineData"]);_!=null&&h(t,["inlineData"],_);const v=p(e,["text"]);return v!=null&&h(t,["text"],v),t}function Nl(o,e){const t={},n=p(e,["parts"]);n!=null&&(Array.isArray(n)?h(t,["parts"],n.map(s=>jp(o,s))):h(t,["parts"],n));const i=p(e,["role"]);return i!=null&&h(t,["role"],i),t}function em(o,e){const t={},n=p(e,["example"]);n!=null&&h(t,["example"],n);const i=p(e,["pattern"]);i!=null&&h(t,["pattern"],i);const s=p(e,["default"]);s!=null&&h(t,["default"],s);const l=p(e,["maxLength"]);l!=null&&h(t,["maxLength"],l);const u=p(e,["minLength"]);u!=null&&h(t,["minLength"],u);const c=p(e,["minProperties"]);c!=null&&h(t,["minProperties"],c);const m=p(e,["maxProperties"]);m!=null&&h(t,["maxProperties"],m);const _=p(e,["anyOf"]);_!=null&&h(t,["anyOf"],_);const v=p(e,["description"]);v!=null&&h(t,["description"],v);const y=p(e,["enum"]);y!=null&&h(t,["enum"],y);const T=p(e,["format"]);T!=null&&h(t,["format"],T);const w=p(e,["items"]);w!=null&&h(t,["items"],w);const P=p(e,["maxItems"]);P!=null&&h(t,["maxItems"],P);const C=p(e,["maximum"]);C!=null&&h(t,["maximum"],C);const E=p(e,["minItems"]);E!=null&&h(t,["minItems"],E);const O=p(e,["minimum"]);O!=null&&h(t,["minimum"],O);const N=p(e,["nullable"]);N!=null&&h(t,["nullable"],N);const b=p(e,["properties"]);b!=null&&h(t,["properties"],b);const X=p(e,["propertyOrdering"]);X!=null&&h(t,["propertyOrdering"],X);const q=p(e,["required"]);q!=null&&h(t,["required"],q);const W=p(e,["title"]);W!=null&&h(t,["title"],W);const K=p(e,["type"]);return K!=null&&h(t,["type"],K),t}function tm(o,e){const t={},n=p(e,["response"]);n!=null&&h(t,["response"],em(o,n));const i=p(e,["description"]);i!=null&&h(t,["description"],i);const s=p(e,["name"]);s!=null&&h(t,["name"],s);const l=p(e,["parameters"]);return l!=null&&h(t,["parameters"],l),t}function nm(){return{}}function im(o,e){const t={},n=p(e,["mode"]);n!=null&&h(t,["mode"],n);const i=p(e,["dynamicThreshold"]);return i!=null&&h(t,["dynamicThreshold"],i),t}function om(o,e){const t={},n=p(e,["dynamicRetrievalConfig"]);return n!=null&&h(t,["dynamicRetrievalConfig"],im(o,n)),t}function rm(o,e){const t={},n=p(e,["functionDeclarations"]);n!=null&&(Array.isArray(n)?h(t,["functionDeclarations"],n.map(c=>tm(o,c))):h(t,["functionDeclarations"],n));const i=p(e,["retrieval"]);i!=null&&h(t,["retrieval"],i),p(e,["googleSearch"])!=null&&h(t,["googleSearch"],nm());const l=p(e,["googleSearchRetrieval"]);l!=null&&h(t,["googleSearchRetrieval"],om(o,l));const u=p(e,["codeExecution"]);return u!=null&&h(t,["codeExecution"],u),t}function sm(o,e){const t={},n=p(e,["mode"]);n!=null&&h(t,["mode"],n);const i=p(e,["allowedFunctionNames"]);return i!=null&&h(t,["allowedFunctionNames"],i),t}function am(o,e){const t={},n=p(e,["functionCallingConfig"]);return n!=null&&h(t,["functionCallingConfig"],sm(o,n)),t}function lm(o,e,t){const n={},i=p(e,["ttl"]);t!==void 0&&i!=null&&h(t,["ttl"],i);const s=p(e,["expireTime"]);t!==void 0&&s!=null&&h(t,["expireTime"],s);const l=p(e,["displayName"]);t!==void 0&&l!=null&&h(t,["displayName"],l);const u=p(e,["contents"]);t!==void 0&&u!=null&&(Array.isArray(u)?h(t,["contents"],Gt(o,Gt(o,u).map(v=>Nl(o,v)))):h(t,["contents"],Gt(o,u)));const c=p(e,["systemInstruction"]);t!==void 0&&c!=null&&h(t,["systemInstruction"],Nl(o,_n(o,c)));const m=p(e,["tools"]);t!==void 0&&m!=null&&(Array.isArray(m)?h(t,["tools"],m.map(v=>rm(o,v))):h(t,["tools"],m));const _=p(e,["toolConfig"]);return t!==void 0&&_!=null&&h(t,["toolConfig"],am(o,_)),n}function um(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["model"],Bc(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],lm(o,i,t)),t}function cm(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["_url","name"],Ii(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],i),t}function fm(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["_url","name"],Ii(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],i),t}function dm(o,e,t){const n={},i=p(e,["ttl"]);t!==void 0&&i!=null&&h(t,["ttl"],i);const s=p(e,["expireTime"]);return t!==void 0&&s!=null&&h(t,["expireTime"],s),n}function hm(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["_url","name"],Ii(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],dm(o,i,t)),t}function pm(o,e,t){const n={},i=p(e,["pageSize"]);t!==void 0&&i!=null&&h(t,["_query","pageSize"],i);const s=p(e,["pageToken"]);return t!==void 0&&s!=null&&h(t,["_query","pageToken"],s),n}function mm(o,e){const t={},n=p(e,["config"]);return n!=null&&h(t,["config"],pm(o,n,t)),t}function Fr(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["name"],n);const i=p(e,["displayName"]);i!=null&&h(t,["displayName"],i);const s=p(e,["model"]);s!=null&&h(t,["model"],s);const l=p(e,["createTime"]);l!=null&&h(t,["createTime"],l);const u=p(e,["updateTime"]);u!=null&&h(t,["updateTime"],u);const c=p(e,["expireTime"]);c!=null&&h(t,["expireTime"],c);const m=p(e,["usageMetadata"]);return m!=null&&h(t,["usageMetadata"],m),t}function gm(){return{}}function _m(o,e){const t={},n=p(e,["nextPageToken"]);n!=null&&h(t,["nextPageToken"],n);const i=p(e,["cachedContents"]);return i!=null&&(Array.isArray(i)?h(t,["cachedContents"],i.map(s=>Fr(o,s))):h(t,["cachedContents"],i)),t}function Br(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["name"],n);const i=p(e,["displayName"]);i!=null&&h(t,["displayName"],i);const s=p(e,["model"]);s!=null&&h(t,["model"],s);const l=p(e,["createTime"]);l!=null&&h(t,["createTime"],l);const u=p(e,["updateTime"]);u!=null&&h(t,["updateTime"],u);const c=p(e,["expireTime"]);c!=null&&h(t,["expireTime"],c);const m=p(e,["usageMetadata"]);return m!=null&&h(t,["usageMetadata"],m),t}function vm(){return{}}function ym(o,e){const t={},n=p(e,["nextPageToken"]);n!=null&&h(t,["nextPageToken"],n);const i=p(e,["cachedContents"]);return i!=null&&(Array.isArray(i)?h(t,["cachedContents"],i.map(s=>Br(o,s))):h(t,["cachedContents"],i)),t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var Xr;(function(o){o.PAGED_ITEM_BATCH_JOBS="batchJobs",o.PAGED_ITEM_MODELS="models",o.PAGED_ITEM_TUNING_JOBS="tuningJobs",o.PAGED_ITEM_FILES="files",o.PAGED_ITEM_CACHED_CONTENTS="cachedContents"})(Xr||(Xr={}));class zc{constructor(e,t,n,i){this.pageInternal=[],this.paramsInternal={},this.requestInternal=t,this.init(e,n,i)}init(e,t,n){var i,s;this.nameInternal=e,this.pageInternal=t[this.nameInternal]||[],this.idxInternal=0;let l={config:{}};n?typeof n=="object"?l=Object.assign({},n):l=n:l={config:{}},l.config&&(l.config.pageToken=t.nextPageToken),this.paramsInternal=l,this.pageInternalSize=(s=(i=l.config)===null||i===void 0?void 0:i.pageSize)!==null&&s!==void 0?s:this.pageInternal.length}initNextPage(e){this.init(this.nameInternal,e,this.paramsInternal)}get page(){return this.pageInternal}get name(){return this.nameInternal}get pageSize(){return this.pageInternalSize}get params(){return this.paramsInternal}get pageLength(){return this.pageInternal.length}getItem(e){return this.pageInternal[e]}[Symbol.asyncIterator](){return{next:async()=>{if(this.idxInternal>=this.pageLength)if(this.hasNextPage())await this.nextPage();else return{value:void 0,done:!0};const e=this.getItem(this.idxInternal);return this.idxInternal+=1,{value:e,done:!1}},return:async()=>({value:void 0,done:!0})}}async nextPage(){if(!this.hasNextPage())throw new Error("No more pages to fetch.");const e=await this.requestInternal(this.params);return this.initNextPage(e),this.page}hasNextPage(){var e;return((e=this.params.config)===null||e===void 0?void 0:e.pageToken)!==void 0}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */var Ll;(function(o){o.OUTCOME_UNSPECIFIED="OUTCOME_UNSPECIFIED",o.OUTCOME_OK="OUTCOME_OK",o.OUTCOME_FAILED="OUTCOME_FAILED",o.OUTCOME_DEADLINE_EXCEEDED="OUTCOME_DEADLINE_EXCEEDED"})(Ll||(Ll={}));var Fl;(function(o){o.LANGUAGE_UNSPECIFIED="LANGUAGE_UNSPECIFIED",o.PYTHON="PYTHON"})(Fl||(Fl={}));var Bl;(function(o){o.TYPE_UNSPECIFIED="TYPE_UNSPECIFIED",o.STRING="STRING",o.NUMBER="NUMBER",o.INTEGER="INTEGER",o.BOOLEAN="BOOLEAN",o.ARRAY="ARRAY",o.OBJECT="OBJECT"})(Bl||(Bl={}));var Vl;(function(o){o.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",o.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",o.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",o.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",o.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",o.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(Vl||(Vl={}));var Ol;(function(o){o.HARM_BLOCK_METHOD_UNSPECIFIED="HARM_BLOCK_METHOD_UNSPECIFIED",o.SEVERITY="SEVERITY",o.PROBABILITY="PROBABILITY"})(Ol||(Ol={}));var kl;(function(o){o.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",o.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",o.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",o.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",o.BLOCK_NONE="BLOCK_NONE",o.OFF="OFF"})(kl||(kl={}));var Gl;(function(o){o.MODE_UNSPECIFIED="MODE_UNSPECIFIED",o.MODE_DYNAMIC="MODE_DYNAMIC"})(Gl||(Gl={}));var Hl;(function(o){o.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",o.STOP="STOP",o.MAX_TOKENS="MAX_TOKENS",o.SAFETY="SAFETY",o.RECITATION="RECITATION",o.OTHER="OTHER",o.BLOCKLIST="BLOCKLIST",o.PROHIBITED_CONTENT="PROHIBITED_CONTENT",o.SPII="SPII",o.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",o.IMAGE_SAFETY="IMAGE_SAFETY"})(Hl||(Hl={}));var zl;(function(o){o.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",o.NEGLIGIBLE="NEGLIGIBLE",o.LOW="LOW",o.MEDIUM="MEDIUM",o.HIGH="HIGH"})(zl||(zl={}));var Wl;(function(o){o.HARM_SEVERITY_UNSPECIFIED="HARM_SEVERITY_UNSPECIFIED",o.HARM_SEVERITY_NEGLIGIBLE="HARM_SEVERITY_NEGLIGIBLE",o.HARM_SEVERITY_LOW="HARM_SEVERITY_LOW",o.HARM_SEVERITY_MEDIUM="HARM_SEVERITY_MEDIUM",o.HARM_SEVERITY_HIGH="HARM_SEVERITY_HIGH"})(Wl||(Wl={}));var ql;(function(o){o.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",o.SAFETY="SAFETY",o.OTHER="OTHER",o.BLOCKLIST="BLOCKLIST",o.PROHIBITED_CONTENT="PROHIBITED_CONTENT"})(ql||(ql={}));var $l;(function(o){o.TRAFFIC_TYPE_UNSPECIFIED="TRAFFIC_TYPE_UNSPECIFIED",o.ON_DEMAND="ON_DEMAND",o.PROVISIONED_THROUGHPUT="PROVISIONED_THROUGHPUT"})($l||($l={}));var Ho;(function(o){o.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",o.TEXT="TEXT",o.IMAGE="IMAGE",o.AUDIO="AUDIO"})(Ho||(Ho={}));var Xl;(function(o){o.MEDIA_RESOLUTION_UNSPECIFIED="MEDIA_RESOLUTION_UNSPECIFIED",o.MEDIA_RESOLUTION_LOW="MEDIA_RESOLUTION_LOW",o.MEDIA_RESOLUTION_MEDIUM="MEDIA_RESOLUTION_MEDIUM",o.MEDIA_RESOLUTION_HIGH="MEDIA_RESOLUTION_HIGH"})(Xl||(Xl={}));var Yl;(function(o){o.FEATURE_SELECTION_PREFERENCE_UNSPECIFIED="FEATURE_SELECTION_PREFERENCE_UNSPECIFIED",o.PRIORITIZE_QUALITY="PRIORITIZE_QUALITY",o.BALANCED="BALANCED",o.PRIORITIZE_COST="PRIORITIZE_COST"})(Yl||(Yl={}));var Kl;(function(o){o.MODE_UNSPECIFIED="MODE_UNSPECIFIED",o.MODE_DYNAMIC="MODE_DYNAMIC"})(Kl||(Kl={}));var Zl;(function(o){o.MODE_UNSPECIFIED="MODE_UNSPECIFIED",o.AUTO="AUTO",o.ANY="ANY",o.NONE="NONE"})(Zl||(Zl={}));var Jl;(function(o){o.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",o.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",o.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",o.BLOCK_NONE="BLOCK_NONE"})(Jl||(Jl={}));var Ql;(function(o){o.DONT_ALLOW="DONT_ALLOW",o.ALLOW_ADULT="ALLOW_ADULT",o.ALLOW_ALL="ALLOW_ALL"})(Ql||(Ql={}));var jl;(function(o){o.auto="auto",o.en="en",o.ja="ja",o.ko="ko",o.hi="hi"})(jl||(jl={}));var eu;(function(o){o.STATE_UNSPECIFIED="STATE_UNSPECIFIED",o.PROCESSING="PROCESSING",o.ACTIVE="ACTIVE",o.FAILED="FAILED"})(eu||(eu={}));var tu;(function(o){o.SOURCE_UNSPECIFIED="SOURCE_UNSPECIFIED",o.UPLOADED="UPLOADED",o.GENERATED="GENERATED"})(tu||(tu={}));var nu;(function(o){o.MASK_MODE_DEFAULT="MASK_MODE_DEFAULT",o.MASK_MODE_USER_PROVIDED="MASK_MODE_USER_PROVIDED",o.MASK_MODE_BACKGROUND="MASK_MODE_BACKGROUND",o.MASK_MODE_FOREGROUND="MASK_MODE_FOREGROUND",o.MASK_MODE_SEMANTIC="MASK_MODE_SEMANTIC"})(nu||(nu={}));var iu;(function(o){o.CONTROL_TYPE_DEFAULT="CONTROL_TYPE_DEFAULT",o.CONTROL_TYPE_CANNY="CONTROL_TYPE_CANNY",o.CONTROL_TYPE_SCRIBBLE="CONTROL_TYPE_SCRIBBLE",o.CONTROL_TYPE_FACE_MESH="CONTROL_TYPE_FACE_MESH"})(iu||(iu={}));var ou;(function(o){o.SUBJECT_TYPE_DEFAULT="SUBJECT_TYPE_DEFAULT",o.SUBJECT_TYPE_PERSON="SUBJECT_TYPE_PERSON",o.SUBJECT_TYPE_ANIMAL="SUBJECT_TYPE_ANIMAL",o.SUBJECT_TYPE_PRODUCT="SUBJECT_TYPE_PRODUCT"})(ou||(ou={}));var ru;(function(o){o.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",o.TEXT="TEXT",o.IMAGE="IMAGE",o.VIDEO="VIDEO",o.AUDIO="AUDIO",o.DOCUMENT="DOCUMENT"})(ru||(ru={}));var su;(function(o){o.START_SENSITIVITY_UNSPECIFIED="START_SENSITIVITY_UNSPECIFIED",o.START_SENSITIVITY_HIGH="START_SENSITIVITY_HIGH",o.START_SENSITIVITY_LOW="START_SENSITIVITY_LOW"})(su||(su={}));var au;(function(o){o.END_SENSITIVITY_UNSPECIFIED="END_SENSITIVITY_UNSPECIFIED",o.END_SENSITIVITY_HIGH="END_SENSITIVITY_HIGH",o.END_SENSITIVITY_LOW="END_SENSITIVITY_LOW"})(au||(au={}));var lu;(function(o){o.ACTIVITY_HANDLING_UNSPECIFIED="ACTIVITY_HANDLING_UNSPECIFIED",o.START_OF_ACTIVITY_INTERRUPTS="START_OF_ACTIVITY_INTERRUPTS",o.NO_INTERRUPTION="NO_INTERRUPTION"})(lu||(lu={}));var uu;(function(o){o.TURN_COVERAGE_UNSPECIFIED="TURN_COVERAGE_UNSPECIFIED",o.TURN_INCLUDES_ONLY_ACTIVITY="TURN_INCLUDES_ONLY_ACTIVITY",o.TURN_INCLUDES_ALL_INPUT="TURN_INCLUDES_ALL_INPUT"})(uu||(uu={}));class ur{get text(){var e,t,n,i,s,l,u,c;if(((i=(n=(t=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||t===void 0?void 0:t.content)===null||n===void 0?void 0:n.parts)===null||i===void 0?void 0:i.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning text from the first one.");let m="",_=!1;const v=[];for(const y of(c=(u=(l=(s=this.candidates)===null||s===void 0?void 0:s[0])===null||l===void 0?void 0:l.content)===null||u===void 0?void 0:u.parts)!==null&&c!==void 0?c:[]){for(const[T,w]of Object.entries(y))T!=="text"&&T!=="thought"&&(w!==null||w!==void 0)&&v.push(T);if(typeof y.text=="string"){if(typeof y.thought=="boolean"&&y.thought)continue;_=!0,m+=y.text}}return v.length>0&&console.warn(`there are non-text parts ${v} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`),_?m:void 0}get functionCalls(){var e,t,n,i,s,l,u,c;if(((i=(n=(t=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||t===void 0?void 0:t.content)===null||n===void 0?void 0:n.parts)===null||i===void 0?void 0:i.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning function calls from the first one.");const m=(c=(u=(l=(s=this.candidates)===null||s===void 0?void 0:s[0])===null||l===void 0?void 0:l.content)===null||u===void 0?void 0:u.parts)===null||c===void 0?void 0:c.filter(_=>_.functionCall).map(_=>_.functionCall).filter(_=>_!==void 0);if(m?.length!==0)return m}get executableCode(){var e,t,n,i,s,l,u,c,m;if(((i=(n=(t=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||t===void 0?void 0:t.content)===null||n===void 0?void 0:n.parts)===null||i===void 0?void 0:i.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning executable code from the first one.");const _=(c=(u=(l=(s=this.candidates)===null||s===void 0?void 0:s[0])===null||l===void 0?void 0:l.content)===null||u===void 0?void 0:u.parts)===null||c===void 0?void 0:c.filter(v=>v.executableCode).map(v=>v.executableCode).filter(v=>v!==void 0);if(_?.length!==0)return(m=_?.[0])===null||m===void 0?void 0:m.code}get codeExecutionResult(){var e,t,n,i,s,l,u,c,m;if(((i=(n=(t=(e=this.candidates)===null||e===void 0?void 0:e[0])===null||t===void 0?void 0:t.content)===null||n===void 0?void 0:n.parts)===null||i===void 0?void 0:i.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning code execution result from the first one.");const _=(c=(u=(l=(s=this.candidates)===null||s===void 0?void 0:s[0])===null||l===void 0?void 0:l.content)===null||u===void 0?void 0:u.parts)===null||c===void 0?void 0:c.filter(v=>v.codeExecutionResult).map(v=>v.codeExecutionResult).filter(v=>v!==void 0);if(_?.length!==0)return(m=_?.[0])===null||m===void 0?void 0:m.output}}class cu{}class fu{}class du{}class xm{}class hu{}class pu{}class Em{}class Ys{constructor(e){const t={};for(const n of e.headers.entries())t[n[0]]=n[1];this.headers=t,this.responseInternal=e}json(){return this.responseInternal.json()}}class Tm{}class Sm{}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Mm extends os{constructor(e){super(),this.apiClient=e,this.list=async(t={})=>new zc(Xr.PAGED_ITEM_CACHED_CONTENTS,n=>this.listInternal(n),await this.listInternal(t),t)}async create(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const u=um(this.apiClient,e);return s=At("cachedContents",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(c=>c.json()),i.then(c=>Br(this.apiClient,c))}else{const u=$p(this.apiClient,e);return s=At("cachedContents",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(c=>c.json()),i.then(c=>Fr(this.apiClient,c))}}async get(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const u=cm(this.apiClient,e);return s=At("{name}",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(c=>c.json()),i.then(c=>Br(this.apiClient,c))}else{const u=Xp(this.apiClient,e);return s=At("{name}",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"GET",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(c=>c.json()),i.then(c=>Fr(this.apiClient,c))}}async delete(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const u=fm(this.apiClient,e);return s=At("{name}",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"DELETE",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(c=>c.json()),i.then(()=>{const c=vm(),m=new hu;return Object.assign(m,c),m})}else{const u=Yp(this.apiClient,e);return s=At("{name}",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"DELETE",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(c=>c.json()),i.then(()=>{const c=gm(),m=new hu;return Object.assign(m,c),m})}}async update(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const u=hm(this.apiClient,e);return s=At("{name}",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"PATCH",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(c=>c.json()),i.then(c=>Br(this.apiClient,c))}else{const u=Zp(this.apiClient,e);return s=At("{name}",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"PATCH",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(c=>c.json()),i.then(c=>Fr(this.apiClient,c))}}async listInternal(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const u=mm(this.apiClient,e);return s=At("cachedContents",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(c=>c.json()),i.then(c=>{const m=ym(this.apiClient,c),_=new pu;return Object.assign(_,m),_})}else{const u=Qp(this.apiClient,e);return s=At("cachedContents",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"GET",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(c=>c.json()),i.then(c=>{const m=_m(this.apiClient,c),_=new pu;return Object.assign(_,m),_})}}}function mu(o){var e=typeof Symbol=="function"&&Symbol.iterator,t=e&&o[e],n=0;if(t)return t.call(o);if(o&&typeof o.length=="number")return{next:function(){return o&&n>=o.length&&(o=void 0),{value:o&&o[n++],done:!o}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function nn(o){return this instanceof nn?(this.v=o,this):new nn(o)}function Yr(o,e,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=t.apply(o,e||[]),i,s=[];return i=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),u("next"),u("throw"),u("return",l),i[Symbol.asyncIterator]=function(){return this},i;function l(T){return function(w){return Promise.resolve(w).then(T,v)}}function u(T,w){n[T]&&(i[T]=function(P){return new Promise(function(C,E){s.push([T,P,C,E])>1||c(T,P)})},w&&(i[T]=w(i[T])))}function c(T,w){try{m(n[T](w))}catch(P){y(s[0][3],P)}}function m(T){T.value instanceof nn?Promise.resolve(T.value.v).then(_,v):y(s[0][2],T)}function _(T){c("next",T)}function v(T){c("throw",T)}function y(T,w){T(w),s.shift(),s.length&&c(s[0][0],s[0][1])}}function Ks(o){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e=o[Symbol.asyncIterator],t;return e?e.call(o):(o=typeof mu=="function"?mu(o):o[Symbol.iterator](),t={},n("next"),n("throw"),n("return"),t[Symbol.asyncIterator]=function(){return this},t);function n(s){t[s]=o[s]&&function(l){return new Promise(function(u,c){l=o[s](l),i(u,c,l.done,l.value)})}}function i(s,l,u,c){Promise.resolve(c).then(function(m){s({value:m,done:u})},l)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Cm(o){var e;if(o.candidates==null||o.candidates.length===0)return!1;const t=(e=o.candidates[0])===null||e===void 0?void 0:e.content;return t===void 0?!1:Wc(t)}function Wc(o){if(o.parts===void 0||o.parts.length===0)return!1;for(const e of o.parts)if(e===void 0||Object.keys(e).length===0||e.text!==void 0&&e.text==="")return!1;return!0}function Am(o){if(o.length!==0){if(o[0].role!=="user")throw new Error("History must start with a user turn.");for(const e of o)if(e.role!=="user"&&e.role!=="model")throw new Error(`Role must be user or model, but got ${e.role}.`)}}function wm(o){if(o===void 0||o.length===0)return[];const e=[],t=o.length;let n=0,i=o[0];for(;n<t;)if(o[n].role==="user")i=o[n],n++;else{const s=[];let l=!0;for(;n<t&&o[n].role==="model";)s.push(o[n]),l&&!Wc(o[n])&&(l=!1),n++;l&&(e.push(i),e.push(...s))}return e}class Rm{constructor(e,t){this.modelsModule=e,this.apiClient=t}create(e){return new Im(this.apiClient,this.modelsModule,e.model,e.config,e.history)}}class Im{constructor(e,t,n,i={},s=[]){this.apiClient=e,this.modelsModule=t,this.model=n,this.config=i,this.history=s,this.sendPromise=Promise.resolve(),Am(s)}async sendMessage(e){var t;await this.sendPromise;const n=_n(this.apiClient,e.message),i=this.modelsModule.generateContent({model:this.model,contents:this.getHistory(!0).concat(n),config:(t=e.config)!==null&&t!==void 0?t:this.config});return this.sendPromise=(async()=>{var s,l;const c=(l=(s=(await i).candidates)===null||s===void 0?void 0:s[0])===null||l===void 0?void 0:l.content,m=c?[c]:[];this.recordHistory(n,m)})(),await this.sendPromise,i}async sendMessageStream(e){var t;await this.sendPromise;const n=_n(this.apiClient,e.message),i=this.modelsModule.generateContentStream({model:this.model,contents:this.getHistory(!0).concat(n),config:(t=e.config)!==null&&t!==void 0?t:this.config});this.sendPromise=i.then(()=>{});const s=await i;return this.processStreamResponse(s,n)}getHistory(e=!1){return e?wm(this.history):this.history}processStreamResponse(e,t){var n,i;return Yr(this,arguments,function*(){var l,u,c,m;const _=[];try{for(var v=!0,y=Ks(e),T;T=yield nn(y.next()),l=T.done,!l;v=!0){m=T.value,v=!1;const w=m;if(Cm(w)){const P=(i=(n=w.candidates)===null||n===void 0?void 0:n[0])===null||i===void 0?void 0:i.content;P!==void 0&&_.push(P)}yield yield nn(w)}}catch(w){u={error:w}}finally{try{!v&&!l&&(c=y.return)&&(yield nn(c.call(y)))}finally{if(u)throw u.error}}this.recordHistory(t,_)})}recordHistory(e,t){let n=[];t.length>0&&t.every(i=>i.role==="model")?n=t:n.push({role:"model",parts:[]}),this.history.push(e),this.history.push(...n)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Pm(o,e,t){const n={},i=p(e,["pageSize"]);t!==void 0&&i!=null&&h(t,["_query","pageSize"],i);const s=p(e,["pageToken"]);return t!==void 0&&s!=null&&h(t,["_query","pageToken"],s),n}function Dm(o,e){const t={},n=p(e,["config"]);return n!=null&&h(t,["config"],Pm(o,n,t)),t}function bm(o,e){const t={},n=p(e,["details"]);n!=null&&h(t,["details"],n);const i=p(e,["message"]);i!=null&&h(t,["message"],i);const s=p(e,["code"]);return s!=null&&h(t,["code"],s),t}function Um(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["name"],n);const i=p(e,["displayName"]);i!=null&&h(t,["displayName"],i);const s=p(e,["mimeType"]);s!=null&&h(t,["mimeType"],s);const l=p(e,["sizeBytes"]);l!=null&&h(t,["sizeBytes"],l);const u=p(e,["createTime"]);u!=null&&h(t,["createTime"],u);const c=p(e,["expirationTime"]);c!=null&&h(t,["expirationTime"],c);const m=p(e,["updateTime"]);m!=null&&h(t,["updateTime"],m);const _=p(e,["sha256Hash"]);_!=null&&h(t,["sha256Hash"],_);const v=p(e,["uri"]);v!=null&&h(t,["uri"],v);const y=p(e,["downloadUri"]);y!=null&&h(t,["downloadUri"],y);const T=p(e,["state"]);T!=null&&h(t,["state"],T);const w=p(e,["source"]);w!=null&&h(t,["source"],w);const P=p(e,["videoMetadata"]);P!=null&&h(t,["videoMetadata"],P);const C=p(e,["error"]);return C!=null&&h(t,["error"],bm(o,C)),t}function Nm(o,e){const t={},n=p(e,["file"]);n!=null&&h(t,["file"],Um(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],i),t}function Lm(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["_url","file"],Hc(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],i),t}function Fm(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["_url","file"],Hc(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],i),t}function Bm(o,e){const t={},n=p(e,["details"]);n!=null&&h(t,["details"],n);const i=p(e,["message"]);i!=null&&h(t,["message"],i);const s=p(e,["code"]);return s!=null&&h(t,["code"],s),t}function Zs(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["name"],n);const i=p(e,["displayName"]);i!=null&&h(t,["displayName"],i);const s=p(e,["mimeType"]);s!=null&&h(t,["mimeType"],s);const l=p(e,["sizeBytes"]);l!=null&&h(t,["sizeBytes"],l);const u=p(e,["createTime"]);u!=null&&h(t,["createTime"],u);const c=p(e,["expirationTime"]);c!=null&&h(t,["expirationTime"],c);const m=p(e,["updateTime"]);m!=null&&h(t,["updateTime"],m);const _=p(e,["sha256Hash"]);_!=null&&h(t,["sha256Hash"],_);const v=p(e,["uri"]);v!=null&&h(t,["uri"],v);const y=p(e,["downloadUri"]);y!=null&&h(t,["downloadUri"],y);const T=p(e,["state"]);T!=null&&h(t,["state"],T);const w=p(e,["source"]);w!=null&&h(t,["source"],w);const P=p(e,["videoMetadata"]);P!=null&&h(t,["videoMetadata"],P);const C=p(e,["error"]);return C!=null&&h(t,["error"],Bm(o,C)),t}function Vm(o,e){const t={},n=p(e,["nextPageToken"]);n!=null&&h(t,["nextPageToken"],n);const i=p(e,["files"]);return i!=null&&(Array.isArray(i)?h(t,["files"],i.map(s=>Zs(o,s))):h(t,["files"],i)),t}function Om(){return{}}function km(){return{}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Gm extends os{constructor(e){super(),this.apiClient=e,this.list=async(t={})=>new zc(Xr.PAGED_ITEM_FILES,n=>this.listInternal(n),await this.listInternal(t),t)}async upload(e){if(this.apiClient.isVertexAI())throw new Error("Vertex AI does not support uploading files. You can share files through a GCS bucket.");return this.apiClient.uploadFile(e.file,e.config).then(t=>Zs(this.apiClient,t))}async listInternal(e){var t;let n,i="",s={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const l=Dm(this.apiClient,e);return i=At("files",l._url),s=l._query,delete l.config,delete l._url,delete l._query,n=this.apiClient.request({path:i,queryParams:s,body:JSON.stringify(l),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(u=>u.json()),n.then(u=>{const c=Vm(this.apiClient,u),m=new Em;return Object.assign(m,c),m})}}async createInternal(e){var t;let n,i="",s={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const l=Nm(this.apiClient,e);return i=At("upload/v1beta/files",l._url),s=l._query,delete l.config,delete l._url,delete l._query,n=this.apiClient.request({path:i,queryParams:s,body:JSON.stringify(l),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(u=>u.json()),n.then(()=>{const u=Om(),c=new Tm;return Object.assign(c,u),c})}}async get(e){var t;let n,i="",s={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const l=Lm(this.apiClient,e);return i=At("files/{file}",l._url),s=l._query,delete l.config,delete l._url,delete l._query,n=this.apiClient.request({path:i,queryParams:s,body:JSON.stringify(l),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(u=>u.json()),n.then(u=>Zs(this.apiClient,u))}}async delete(e){var t;let n,i="",s={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const l=Fm(this.apiClient,e);return i=At("files/{file}",l._url),s=l._query,delete l.config,delete l._url,delete l._query,n=this.apiClient.request({path:i,queryParams:s,body:JSON.stringify(l),httpMethod:"DELETE",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(u=>u.json()),n.then(()=>{const u=km(),c=new Sm;return Object.assign(c,u),c})}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Hm(o,e){const t={};if(p(e,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=p(e,["thought"]);n!=null&&h(t,["thought"],n);const i=p(e,["codeExecutionResult"]);i!=null&&h(t,["codeExecutionResult"],i);const s=p(e,["executableCode"]);s!=null&&h(t,["executableCode"],s);const l=p(e,["fileData"]);l!=null&&h(t,["fileData"],l);const u=p(e,["functionCall"]);u!=null&&h(t,["functionCall"],u);const c=p(e,["functionResponse"]);c!=null&&h(t,["functionResponse"],c);const m=p(e,["inlineData"]);m!=null&&h(t,["inlineData"],m);const _=p(e,["text"]);return _!=null&&h(t,["text"],_),t}function zm(o,e){const t={},n=p(e,["videoMetadata"]);n!=null&&h(t,["videoMetadata"],n);const i=p(e,["thought"]);i!=null&&h(t,["thought"],i);const s=p(e,["codeExecutionResult"]);s!=null&&h(t,["codeExecutionResult"],s);const l=p(e,["executableCode"]);l!=null&&h(t,["executableCode"],l);const u=p(e,["fileData"]);u!=null&&h(t,["fileData"],u);const c=p(e,["functionCall"]);c!=null&&h(t,["functionCall"],c);const m=p(e,["functionResponse"]);m!=null&&h(t,["functionResponse"],m);const _=p(e,["inlineData"]);_!=null&&h(t,["inlineData"],_);const v=p(e,["text"]);return v!=null&&h(t,["text"],v),t}function Wm(o,e){const t={},n=p(e,["parts"]);n!=null&&(Array.isArray(n)?h(t,["parts"],n.map(s=>Hm(o,s))):h(t,["parts"],n));const i=p(e,["role"]);return i!=null&&h(t,["role"],i),t}function qm(o,e){const t={},n=p(e,["parts"]);n!=null&&(Array.isArray(n)?h(t,["parts"],n.map(s=>zm(o,s))):h(t,["parts"],n));const i=p(e,["role"]);return i!=null&&h(t,["role"],i),t}function $m(o,e){const t={},n=p(e,["example"]);n!=null&&h(t,["example"],n);const i=p(e,["pattern"]);i!=null&&h(t,["pattern"],i);const s=p(e,["default"]);s!=null&&h(t,["default"],s);const l=p(e,["maxLength"]);l!=null&&h(t,["maxLength"],l);const u=p(e,["minLength"]);u!=null&&h(t,["minLength"],u);const c=p(e,["minProperties"]);c!=null&&h(t,["minProperties"],c);const m=p(e,["maxProperties"]);m!=null&&h(t,["maxProperties"],m);const _=p(e,["anyOf"]);_!=null&&h(t,["anyOf"],_);const v=p(e,["description"]);v!=null&&h(t,["description"],v);const y=p(e,["enum"]);y!=null&&h(t,["enum"],y);const T=p(e,["format"]);T!=null&&h(t,["format"],T);const w=p(e,["items"]);w!=null&&h(t,["items"],w);const P=p(e,["maxItems"]);P!=null&&h(t,["maxItems"],P);const C=p(e,["maximum"]);C!=null&&h(t,["maximum"],C);const E=p(e,["minItems"]);E!=null&&h(t,["minItems"],E);const O=p(e,["minimum"]);O!=null&&h(t,["minimum"],O);const N=p(e,["nullable"]);N!=null&&h(t,["nullable"],N);const b=p(e,["properties"]);b!=null&&h(t,["properties"],b);const X=p(e,["propertyOrdering"]);X!=null&&h(t,["propertyOrdering"],X);const q=p(e,["required"]);q!=null&&h(t,["required"],q);const W=p(e,["title"]);W!=null&&h(t,["title"],W);const K=p(e,["type"]);return K!=null&&h(t,["type"],K),t}function Xm(o,e){const t={};if(p(e,["response"])!==void 0)throw new Error("response parameter is not supported in Gemini API.");const n=p(e,["description"]);n!=null&&h(t,["description"],n);const i=p(e,["name"]);i!=null&&h(t,["name"],i);const s=p(e,["parameters"]);return s!=null&&h(t,["parameters"],s),t}function Ym(o,e){const t={},n=p(e,["response"]);n!=null&&h(t,["response"],$m(o,n));const i=p(e,["description"]);i!=null&&h(t,["description"],i);const s=p(e,["name"]);s!=null&&h(t,["name"],s);const l=p(e,["parameters"]);return l!=null&&h(t,["parameters"],l),t}function Km(){return{}}function Zm(){return{}}function Jm(o,e){const t={},n=p(e,["mode"]);n!=null&&h(t,["mode"],n);const i=p(e,["dynamicThreshold"]);return i!=null&&h(t,["dynamicThreshold"],i),t}function Qm(o,e){const t={},n=p(e,["mode"]);n!=null&&h(t,["mode"],n);const i=p(e,["dynamicThreshold"]);return i!=null&&h(t,["dynamicThreshold"],i),t}function jm(o,e){const t={},n=p(e,["dynamicRetrievalConfig"]);return n!=null&&h(t,["dynamicRetrievalConfig"],Jm(o,n)),t}function eg(o,e){const t={},n=p(e,["dynamicRetrievalConfig"]);return n!=null&&h(t,["dynamicRetrievalConfig"],Qm(o,n)),t}function tg(o,e){const t={},n=p(e,["functionDeclarations"]);if(n!=null&&(Array.isArray(n)?h(t,["functionDeclarations"],n.map(u=>Xm(o,u))):h(t,["functionDeclarations"],n)),p(e,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");p(e,["googleSearch"])!=null&&h(t,["googleSearch"],Km());const s=p(e,["googleSearchRetrieval"]);s!=null&&h(t,["googleSearchRetrieval"],jm(o,s));const l=p(e,["codeExecution"]);return l!=null&&h(t,["codeExecution"],l),t}function ng(o,e){const t={},n=p(e,["functionDeclarations"]);n!=null&&(Array.isArray(n)?h(t,["functionDeclarations"],n.map(c=>Ym(o,c))):h(t,["functionDeclarations"],n));const i=p(e,["retrieval"]);i!=null&&h(t,["retrieval"],i),p(e,["googleSearch"])!=null&&h(t,["googleSearch"],Zm());const l=p(e,["googleSearchRetrieval"]);l!=null&&h(t,["googleSearchRetrieval"],eg(o,l));const u=p(e,["codeExecution"]);return u!=null&&h(t,["codeExecution"],u),t}function ig(o,e){const t={},n=p(e,["handle"]);if(n!=null&&h(t,["handle"],n),p(e,["transparent"])!==void 0)throw new Error("transparent parameter is not supported in Gemini API.");return t}function og(o,e){const t={},n=p(e,["handle"]);n!=null&&h(t,["handle"],n);const i=p(e,["transparent"]);return i!=null&&h(t,["transparent"],i),t}function rg(){return{}}function gu(){return{}}function sg(o,e){const t={},n=p(e,["disabled"]);n!=null&&h(t,["disabled"],n);const i=p(e,["startOfSpeechSensitivity"]);i!=null&&h(t,["startOfSpeechSensitivity"],i);const s=p(e,["endOfSpeechSensitivity"]);s!=null&&h(t,["endOfSpeechSensitivity"],s);const l=p(e,["prefixPaddingMs"]);l!=null&&h(t,["prefixPaddingMs"],l);const u=p(e,["silenceDurationMs"]);return u!=null&&h(t,["silenceDurationMs"],u),t}function ag(o,e){const t={},n=p(e,["disabled"]);n!=null&&h(t,["disabled"],n);const i=p(e,["startOfSpeechSensitivity"]);i!=null&&h(t,["startOfSpeechSensitivity"],i);const s=p(e,["endOfSpeechSensitivity"]);s!=null&&h(t,["endOfSpeechSensitivity"],s);const l=p(e,["prefixPaddingMs"]);l!=null&&h(t,["prefixPaddingMs"],l);const u=p(e,["silenceDurationMs"]);return u!=null&&h(t,["silenceDurationMs"],u),t}function lg(o,e){const t={},n=p(e,["automaticActivityDetection"]);n!=null&&h(t,["automaticActivityDetection"],sg(o,n));const i=p(e,["activityHandling"]);i!=null&&h(t,["activityHandling"],i);const s=p(e,["turnCoverage"]);return s!=null&&h(t,["turnCoverage"],s),t}function ug(o,e){const t={},n=p(e,["automaticActivityDetection"]);n!=null&&h(t,["automaticActivityDetection"],ag(o,n));const i=p(e,["activityHandling"]);i!=null&&h(t,["activityHandling"],i);const s=p(e,["turnCoverage"]);return s!=null&&h(t,["turnCoverage"],s),t}function cg(o,e){const t={},n=p(e,["targetTokens"]);return n!=null&&h(t,["targetTokens"],n),t}function fg(o,e){const t={},n=p(e,["targetTokens"]);return n!=null&&h(t,["targetTokens"],n),t}function dg(o,e){const t={},n=p(e,["triggerTokens"]);n!=null&&h(t,["triggerTokens"],n);const i=p(e,["slidingWindow"]);return i!=null&&h(t,["slidingWindow"],cg(o,i)),t}function hg(o,e){const t={},n=p(e,["triggerTokens"]);n!=null&&h(t,["triggerTokens"],n);const i=p(e,["slidingWindow"]);return i!=null&&h(t,["slidingWindow"],fg(o,i)),t}function pg(o,e,t){const n={},i=p(e,["generationConfig"]);t!==void 0&&i!=null&&h(t,["setup","generationConfig"],i);const s=p(e,["responseModalities"]);t!==void 0&&s!=null&&h(t,["setup","generationConfig","responseModalities"],s);const l=p(e,["temperature"]);t!==void 0&&l!=null&&h(t,["setup","generationConfig","temperature"],l);const u=p(e,["topP"]);t!==void 0&&u!=null&&h(t,["setup","generationConfig","topP"],u);const c=p(e,["topK"]);t!==void 0&&c!=null&&h(t,["setup","generationConfig","topK"],c);const m=p(e,["maxOutputTokens"]);t!==void 0&&m!=null&&h(t,["setup","generationConfig","maxOutputTokens"],m);const _=p(e,["mediaResolution"]);t!==void 0&&_!=null&&h(t,["setup","generationConfig","mediaResolution"],_);const v=p(e,["seed"]);t!==void 0&&v!=null&&h(t,["setup","generationConfig","seed"],v);const y=p(e,["speechConfig"]);t!==void 0&&y!=null&&h(t,["setup","generationConfig","speechConfig"],y);const T=p(e,["systemInstruction"]);t!==void 0&&T!=null&&h(t,["setup","systemInstruction"],Wm(o,_n(o,T)));const w=p(e,["tools"]);t!==void 0&&w!=null&&(Array.isArray(w)?h(t,["setup","tools"],Dn(o,Dn(o,w).map(N=>tg(o,rs(o,N))))):h(t,["setup","tools"],Dn(o,w)));const P=p(e,["sessionResumption"]);if(t!==void 0&&P!=null&&h(t,["setup","sessionResumption"],ig(o,P)),p(e,["inputAudioTranscription"])!==void 0)throw new Error("inputAudioTranscription parameter is not supported in Gemini API.");const C=p(e,["outputAudioTranscription"]);t!==void 0&&C!=null&&h(t,["setup","outputAudioTranscription"],rg());const E=p(e,["realtimeInputConfig"]);t!==void 0&&E!=null&&h(t,["setup","realtimeInputConfig"],lg(o,E));const O=p(e,["contextWindowCompression"]);return t!==void 0&&O!=null&&h(t,["setup","contextWindowCompression"],dg(o,O)),n}function mg(o,e,t){const n={},i=p(e,["generationConfig"]);t!==void 0&&i!=null&&h(t,["setup","generationConfig"],i);const s=p(e,["responseModalities"]);t!==void 0&&s!=null&&h(t,["setup","generationConfig","responseModalities"],s);const l=p(e,["temperature"]);t!==void 0&&l!=null&&h(t,["setup","generationConfig","temperature"],l);const u=p(e,["topP"]);t!==void 0&&u!=null&&h(t,["setup","generationConfig","topP"],u);const c=p(e,["topK"]);t!==void 0&&c!=null&&h(t,["setup","generationConfig","topK"],c);const m=p(e,["maxOutputTokens"]);t!==void 0&&m!=null&&h(t,["setup","generationConfig","maxOutputTokens"],m);const _=p(e,["mediaResolution"]);t!==void 0&&_!=null&&h(t,["setup","generationConfig","mediaResolution"],_);const v=p(e,["seed"]);t!==void 0&&v!=null&&h(t,["setup","generationConfig","seed"],v);const y=p(e,["speechConfig"]);t!==void 0&&y!=null&&h(t,["setup","generationConfig","speechConfig"],y);const T=p(e,["systemInstruction"]);t!==void 0&&T!=null&&h(t,["setup","systemInstruction"],qm(o,_n(o,T)));const w=p(e,["tools"]);t!==void 0&&w!=null&&(Array.isArray(w)?h(t,["setup","tools"],Dn(o,Dn(o,w).map(b=>ng(o,rs(o,b))))):h(t,["setup","tools"],Dn(o,w)));const P=p(e,["sessionResumption"]);t!==void 0&&P!=null&&h(t,["setup","sessionResumption"],og(o,P));const C=p(e,["inputAudioTranscription"]);t!==void 0&&C!=null&&h(t,["setup","inputAudioTranscription"],gu());const E=p(e,["outputAudioTranscription"]);t!==void 0&&E!=null&&h(t,["setup","outputAudioTranscription"],gu());const O=p(e,["realtimeInputConfig"]);t!==void 0&&O!=null&&h(t,["setup","realtimeInputConfig"],ug(o,O));const N=p(e,["contextWindowCompression"]);return t!==void 0&&N!=null&&h(t,["setup","contextWindowCompression"],hg(o,N)),n}function gg(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["setup","model"],Qt(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],pg(o,i,t)),t}function _g(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["setup","model"],Qt(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],mg(o,i,t)),t}function vg(){return{}}function yg(){return{}}function xg(o,e){const t={},n=p(e,["thought"]);n!=null&&h(t,["thought"],n);const i=p(e,["codeExecutionResult"]);i!=null&&h(t,["codeExecutionResult"],i);const s=p(e,["executableCode"]);s!=null&&h(t,["executableCode"],s);const l=p(e,["fileData"]);l!=null&&h(t,["fileData"],l);const u=p(e,["functionCall"]);u!=null&&h(t,["functionCall"],u);const c=p(e,["functionResponse"]);c!=null&&h(t,["functionResponse"],c);const m=p(e,["inlineData"]);m!=null&&h(t,["inlineData"],m);const _=p(e,["text"]);return _!=null&&h(t,["text"],_),t}function Eg(o,e){const t={},n=p(e,["videoMetadata"]);n!=null&&h(t,["videoMetadata"],n);const i=p(e,["thought"]);i!=null&&h(t,["thought"],i);const s=p(e,["codeExecutionResult"]);s!=null&&h(t,["codeExecutionResult"],s);const l=p(e,["executableCode"]);l!=null&&h(t,["executableCode"],l);const u=p(e,["fileData"]);u!=null&&h(t,["fileData"],u);const c=p(e,["functionCall"]);c!=null&&h(t,["functionCall"],c);const m=p(e,["functionResponse"]);m!=null&&h(t,["functionResponse"],m);const _=p(e,["inlineData"]);_!=null&&h(t,["inlineData"],_);const v=p(e,["text"]);return v!=null&&h(t,["text"],v),t}function Tg(o,e){const t={},n=p(e,["parts"]);n!=null&&(Array.isArray(n)?h(t,["parts"],n.map(s=>xg(o,s))):h(t,["parts"],n));const i=p(e,["role"]);return i!=null&&h(t,["role"],i),t}function Sg(o,e){const t={},n=p(e,["parts"]);n!=null&&(Array.isArray(n)?h(t,["parts"],n.map(s=>Eg(o,s))):h(t,["parts"],n));const i=p(e,["role"]);return i!=null&&h(t,["role"],i),t}function _u(o,e){const t={},n=p(e,["text"]);n!=null&&h(t,["text"],n);const i=p(e,["finished"]);return i!=null&&h(t,["finished"],i),t}function vu(o,e){const t={},n=p(e,["text"]);n!=null&&h(t,["text"],n);const i=p(e,["finished"]);return i!=null&&h(t,["finished"],i),t}function Mg(o,e){const t={},n=p(e,["modelTurn"]);n!=null&&h(t,["modelTurn"],Tg(o,n));const i=p(e,["turnComplete"]);i!=null&&h(t,["turnComplete"],i);const s=p(e,["interrupted"]);s!=null&&h(t,["interrupted"],s);const l=p(e,["generationComplete"]);l!=null&&h(t,["generationComplete"],l);const u=p(e,["inputTranscription"]);u!=null&&h(t,["inputTranscription"],_u(o,u));const c=p(e,["outputTranscription"]);return c!=null&&h(t,["outputTranscription"],_u(o,c)),t}function Cg(o,e){const t={},n=p(e,["modelTurn"]);n!=null&&h(t,["modelTurn"],Sg(o,n));const i=p(e,["turnComplete"]);i!=null&&h(t,["turnComplete"],i);const s=p(e,["interrupted"]);s!=null&&h(t,["interrupted"],s);const l=p(e,["generationComplete"]);l!=null&&h(t,["generationComplete"],l);const u=p(e,["inputTranscription"]);u!=null&&h(t,["inputTranscription"],vu(o,u));const c=p(e,["outputTranscription"]);return c!=null&&h(t,["outputTranscription"],vu(o,c)),t}function Ag(o,e){const t={},n=p(e,["id"]);n!=null&&h(t,["id"],n);const i=p(e,["args"]);i!=null&&h(t,["args"],i);const s=p(e,["name"]);return s!=null&&h(t,["name"],s),t}function wg(o,e){const t={},n=p(e,["args"]);n!=null&&h(t,["args"],n);const i=p(e,["name"]);return i!=null&&h(t,["name"],i),t}function Rg(o,e){const t={},n=p(e,["functionCalls"]);return n!=null&&(Array.isArray(n)?h(t,["functionCalls"],n.map(i=>Ag(o,i))):h(t,["functionCalls"],n)),t}function Ig(o,e){const t={},n=p(e,["functionCalls"]);return n!=null&&(Array.isArray(n)?h(t,["functionCalls"],n.map(i=>wg(o,i))):h(t,["functionCalls"],n)),t}function Pg(o,e){const t={},n=p(e,["ids"]);return n!=null&&h(t,["ids"],n),t}function Dg(o,e){const t={},n=p(e,["ids"]);return n!=null&&h(t,["ids"],n),t}function cr(o,e){const t={},n=p(e,["modality"]);n!=null&&h(t,["modality"],n);const i=p(e,["tokenCount"]);return i!=null&&h(t,["tokenCount"],i),t}function fr(o,e){const t={},n=p(e,["modality"]);n!=null&&h(t,["modality"],n);const i=p(e,["tokenCount"]);return i!=null&&h(t,["tokenCount"],i),t}function bg(o,e){const t={},n=p(e,["promptTokenCount"]);n!=null&&h(t,["promptTokenCount"],n);const i=p(e,["cachedContentTokenCount"]);i!=null&&h(t,["cachedContentTokenCount"],i);const s=p(e,["responseTokenCount"]);s!=null&&h(t,["responseTokenCount"],s);const l=p(e,["toolUsePromptTokenCount"]);l!=null&&h(t,["toolUsePromptTokenCount"],l);const u=p(e,["thoughtsTokenCount"]);u!=null&&h(t,["thoughtsTokenCount"],u);const c=p(e,["totalTokenCount"]);c!=null&&h(t,["totalTokenCount"],c);const m=p(e,["promptTokensDetails"]);m!=null&&(Array.isArray(m)?h(t,["promptTokensDetails"],m.map(T=>cr(o,T))):h(t,["promptTokensDetails"],m));const _=p(e,["cacheTokensDetails"]);_!=null&&(Array.isArray(_)?h(t,["cacheTokensDetails"],_.map(T=>cr(o,T))):h(t,["cacheTokensDetails"],_));const v=p(e,["responseTokensDetails"]);v!=null&&(Array.isArray(v)?h(t,["responseTokensDetails"],v.map(T=>cr(o,T))):h(t,["responseTokensDetails"],v));const y=p(e,["toolUsePromptTokensDetails"]);return y!=null&&(Array.isArray(y)?h(t,["toolUsePromptTokensDetails"],y.map(T=>cr(o,T))):h(t,["toolUsePromptTokensDetails"],y)),t}function Ug(o,e){const t={},n=p(e,["promptTokenCount"]);n!=null&&h(t,["promptTokenCount"],n);const i=p(e,["cachedContentTokenCount"]);i!=null&&h(t,["cachedContentTokenCount"],i);const s=p(e,["candidatesTokenCount"]);s!=null&&h(t,["responseTokenCount"],s);const l=p(e,["toolUsePromptTokenCount"]);l!=null&&h(t,["toolUsePromptTokenCount"],l);const u=p(e,["thoughtsTokenCount"]);u!=null&&h(t,["thoughtsTokenCount"],u);const c=p(e,["totalTokenCount"]);c!=null&&h(t,["totalTokenCount"],c);const m=p(e,["promptTokensDetails"]);m!=null&&(Array.isArray(m)?h(t,["promptTokensDetails"],m.map(w=>fr(o,w))):h(t,["promptTokensDetails"],m));const _=p(e,["cacheTokensDetails"]);_!=null&&(Array.isArray(_)?h(t,["cacheTokensDetails"],_.map(w=>fr(o,w))):h(t,["cacheTokensDetails"],_));const v=p(e,["candidatesTokensDetails"]);v!=null&&(Array.isArray(v)?h(t,["responseTokensDetails"],v.map(w=>fr(o,w))):h(t,["responseTokensDetails"],v));const y=p(e,["toolUsePromptTokensDetails"]);y!=null&&(Array.isArray(y)?h(t,["toolUsePromptTokensDetails"],y.map(w=>fr(o,w))):h(t,["toolUsePromptTokensDetails"],y));const T=p(e,["trafficType"]);return T!=null&&h(t,["trafficType"],T),t}function Ng(o,e){const t={},n=p(e,["timeLeft"]);return n!=null&&h(t,["timeLeft"],n),t}function Lg(o,e){const t={},n=p(e,["timeLeft"]);return n!=null&&h(t,["timeLeft"],n),t}function Fg(o,e){const t={},n=p(e,["newHandle"]);n!=null&&h(t,["newHandle"],n);const i=p(e,["resumable"]);i!=null&&h(t,["resumable"],i);const s=p(e,["lastConsumedClientMessageIndex"]);return s!=null&&h(t,["lastConsumedClientMessageIndex"],s),t}function Bg(o,e){const t={},n=p(e,["newHandle"]);n!=null&&h(t,["newHandle"],n);const i=p(e,["resumable"]);i!=null&&h(t,["resumable"],i);const s=p(e,["lastConsumedClientMessageIndex"]);return s!=null&&h(t,["lastConsumedClientMessageIndex"],s),t}function Vg(o,e){const t={};p(e,["setupComplete"])!=null&&h(t,["setupComplete"],vg());const i=p(e,["serverContent"]);i!=null&&h(t,["serverContent"],Mg(o,i));const s=p(e,["toolCall"]);s!=null&&h(t,["toolCall"],Rg(o,s));const l=p(e,["toolCallCancellation"]);l!=null&&h(t,["toolCallCancellation"],Pg(o,l));const u=p(e,["usageMetadata"]);u!=null&&h(t,["usageMetadata"],bg(o,u));const c=p(e,["goAway"]);c!=null&&h(t,["goAway"],Ng(o,c));const m=p(e,["sessionResumptionUpdate"]);return m!=null&&h(t,["sessionResumptionUpdate"],Fg(o,m)),t}function Og(o,e){const t={};p(e,["setupComplete"])!=null&&h(t,["setupComplete"],yg());const i=p(e,["serverContent"]);i!=null&&h(t,["serverContent"],Cg(o,i));const s=p(e,["toolCall"]);s!=null&&h(t,["toolCall"],Ig(o,s));const l=p(e,["toolCallCancellation"]);l!=null&&h(t,["toolCallCancellation"],Dg(o,l));const u=p(e,["usageMetadata"]);u!=null&&h(t,["usageMetadata"],Ug(o,u));const c=p(e,["goAway"]);c!=null&&h(t,["goAway"],Lg(o,c));const m=p(e,["sessionResumptionUpdate"]);return m!=null&&h(t,["sessionResumptionUpdate"],Bg(o,m)),t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function kg(o,e){const t={};if(p(e,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const n=p(e,["thought"]);n!=null&&h(t,["thought"],n);const i=p(e,["codeExecutionResult"]);i!=null&&h(t,["codeExecutionResult"],i);const s=p(e,["executableCode"]);s!=null&&h(t,["executableCode"],s);const l=p(e,["fileData"]);l!=null&&h(t,["fileData"],l);const u=p(e,["functionCall"]);u!=null&&h(t,["functionCall"],u);const c=p(e,["functionResponse"]);c!=null&&h(t,["functionResponse"],c);const m=p(e,["inlineData"]);m!=null&&h(t,["inlineData"],m);const _=p(e,["text"]);return _!=null&&h(t,["text"],_),t}function ss(o,e){const t={},n=p(e,["parts"]);n!=null&&(Array.isArray(n)?h(t,["parts"],n.map(s=>kg(o,s))):h(t,["parts"],n));const i=p(e,["role"]);return i!=null&&h(t,["role"],i),t}function Gg(o,e){const t={};if(p(e,["example"])!==void 0)throw new Error("example parameter is not supported in Gemini API.");if(p(e,["pattern"])!==void 0)throw new Error("pattern parameter is not supported in Gemini API.");if(p(e,["default"])!==void 0)throw new Error("default parameter is not supported in Gemini API.");if(p(e,["maxLength"])!==void 0)throw new Error("maxLength parameter is not supported in Gemini API.");if(p(e,["minLength"])!==void 0)throw new Error("minLength parameter is not supported in Gemini API.");if(p(e,["minProperties"])!==void 0)throw new Error("minProperties parameter is not supported in Gemini API.");if(p(e,["maxProperties"])!==void 0)throw new Error("maxProperties parameter is not supported in Gemini API.");const n=p(e,["anyOf"]);n!=null&&h(t,["anyOf"],n);const i=p(e,["description"]);i!=null&&h(t,["description"],i);const s=p(e,["enum"]);s!=null&&h(t,["enum"],s);const l=p(e,["format"]);l!=null&&h(t,["format"],l);const u=p(e,["items"]);u!=null&&h(t,["items"],u);const c=p(e,["maxItems"]);c!=null&&h(t,["maxItems"],c);const m=p(e,["maximum"]);m!=null&&h(t,["maximum"],m);const _=p(e,["minItems"]);_!=null&&h(t,["minItems"],_);const v=p(e,["minimum"]);v!=null&&h(t,["minimum"],v);const y=p(e,["nullable"]);y!=null&&h(t,["nullable"],y);const T=p(e,["properties"]);T!=null&&h(t,["properties"],T);const w=p(e,["propertyOrdering"]);w!=null&&h(t,["propertyOrdering"],w);const P=p(e,["required"]);P!=null&&h(t,["required"],P);const C=p(e,["title"]);C!=null&&h(t,["title"],C);const E=p(e,["type"]);return E!=null&&h(t,["type"],E),t}function Hg(o,e){const t={};if(p(e,["method"])!==void 0)throw new Error("method parameter is not supported in Gemini API.");const n=p(e,["category"]);n!=null&&h(t,["category"],n);const i=p(e,["threshold"]);return i!=null&&h(t,["threshold"],i),t}function zg(o,e){const t={};if(p(e,["response"])!==void 0)throw new Error("response parameter is not supported in Gemini API.");const n=p(e,["description"]);n!=null&&h(t,["description"],n);const i=p(e,["name"]);i!=null&&h(t,["name"],i);const s=p(e,["parameters"]);return s!=null&&h(t,["parameters"],s),t}function Wg(){return{}}function qg(o,e){const t={},n=p(e,["mode"]);n!=null&&h(t,["mode"],n);const i=p(e,["dynamicThreshold"]);return i!=null&&h(t,["dynamicThreshold"],i),t}function $g(o,e){const t={},n=p(e,["dynamicRetrievalConfig"]);return n!=null&&h(t,["dynamicRetrievalConfig"],qg(o,n)),t}function Xg(o,e){const t={},n=p(e,["functionDeclarations"]);if(n!=null&&(Array.isArray(n)?h(t,["functionDeclarations"],n.map(u=>zg(o,u))):h(t,["functionDeclarations"],n)),p(e,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");p(e,["googleSearch"])!=null&&h(t,["googleSearch"],Wg());const s=p(e,["googleSearchRetrieval"]);s!=null&&h(t,["googleSearchRetrieval"],$g(o,s));const l=p(e,["codeExecution"]);return l!=null&&h(t,["codeExecution"],l),t}function Yg(o,e){const t={},n=p(e,["mode"]);n!=null&&h(t,["mode"],n);const i=p(e,["allowedFunctionNames"]);return i!=null&&h(t,["allowedFunctionNames"],i),t}function Kg(o,e){const t={},n=p(e,["functionCallingConfig"]);return n!=null&&h(t,["functionCallingConfig"],Yg(o,n)),t}function Zg(o,e){const t={},n=p(e,["voiceName"]);return n!=null&&h(t,["voiceName"],n),t}function Jg(o,e){const t={},n=p(e,["prebuiltVoiceConfig"]);return n!=null&&h(t,["prebuiltVoiceConfig"],Zg(o,n)),t}function Qg(o,e){const t={},n=p(e,["voiceConfig"]);n!=null&&h(t,["voiceConfig"],Jg(o,n));const i=p(e,["languageCode"]);return i!=null&&h(t,["languageCode"],i),t}function jg(o,e){const t={},n=p(e,["includeThoughts"]);n!=null&&h(t,["includeThoughts"],n);const i=p(e,["thinkingBudget"]);return i!=null&&h(t,["thinkingBudget"],i),t}function e_(o,e,t){const n={},i=p(e,["systemInstruction"]);t!==void 0&&i!=null&&h(t,["systemInstruction"],ss(o,_n(o,i)));const s=p(e,["temperature"]);s!=null&&h(n,["temperature"],s);const l=p(e,["topP"]);l!=null&&h(n,["topP"],l);const u=p(e,["topK"]);u!=null&&h(n,["topK"],u);const c=p(e,["candidateCount"]);c!=null&&h(n,["candidateCount"],c);const m=p(e,["maxOutputTokens"]);m!=null&&h(n,["maxOutputTokens"],m);const _=p(e,["stopSequences"]);_!=null&&h(n,["stopSequences"],_);const v=p(e,["responseLogprobs"]);v!=null&&h(n,["responseLogprobs"],v);const y=p(e,["logprobs"]);y!=null&&h(n,["logprobs"],y);const T=p(e,["presencePenalty"]);T!=null&&h(n,["presencePenalty"],T);const w=p(e,["frequencyPenalty"]);w!=null&&h(n,["frequencyPenalty"],w);const P=p(e,["seed"]);P!=null&&h(n,["seed"],P);const C=p(e,["responseMimeType"]);C!=null&&h(n,["responseMimeType"],C);const E=p(e,["responseSchema"]);if(E!=null&&h(n,["responseSchema"],Gg(o,kc(o,E))),p(e,["routingConfig"])!==void 0)throw new Error("routingConfig parameter is not supported in Gemini API.");if(p(e,["modelSelectionConfig"])!==void 0)throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");const O=p(e,["safetySettings"]);t!==void 0&&O!=null&&(Array.isArray(O)?h(t,["safetySettings"],O.map(D=>Hg(o,D))):h(t,["safetySettings"],O));const N=p(e,["tools"]);t!==void 0&&N!=null&&(Array.isArray(N)?h(t,["tools"],Dn(o,Dn(o,N).map(D=>Xg(o,rs(o,D))))):h(t,["tools"],Dn(o,N)));const b=p(e,["toolConfig"]);if(t!==void 0&&b!=null&&h(t,["toolConfig"],Kg(o,b)),p(e,["labels"])!==void 0)throw new Error("labels parameter is not supported in Gemini API.");const X=p(e,["cachedContent"]);t!==void 0&&X!=null&&h(t,["cachedContent"],Ii(o,X));const q=p(e,["responseModalities"]);q!=null&&h(n,["responseModalities"],q);const W=p(e,["mediaResolution"]);W!=null&&h(n,["mediaResolution"],W);const K=p(e,["speechConfig"]);if(K!=null&&h(n,["speechConfig"],Qg(o,Gc(o,K))),p(e,["audioTimestamp"])!==void 0)throw new Error("audioTimestamp parameter is not supported in Gemini API.");const B=p(e,["thinkingConfig"]);return B!=null&&h(n,["thinkingConfig"],jg(o,B)),n}function yu(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["_url","model"],Qt(o,n));const i=p(e,["contents"]);i!=null&&(Array.isArray(i)?h(t,["contents"],Gt(o,Gt(o,i).map(l=>ss(o,l)))):h(t,["contents"],Gt(o,i)));const s=p(e,["config"]);return s!=null&&h(t,["generationConfig"],e_(o,s,t)),t}function t_(o,e,t){const n={},i=p(e,["taskType"]);t!==void 0&&i!=null&&h(t,["requests[]","taskType"],i);const s=p(e,["title"]);t!==void 0&&s!=null&&h(t,["requests[]","title"],s);const l=p(e,["outputDimensionality"]);if(t!==void 0&&l!=null&&h(t,["requests[]","outputDimensionality"],l),p(e,["mimeType"])!==void 0)throw new Error("mimeType parameter is not supported in Gemini API.");if(p(e,["autoTruncate"])!==void 0)throw new Error("autoTruncate parameter is not supported in Gemini API.");return n}function n_(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["_url","model"],Qt(o,n));const i=p(e,["contents"]);i!=null&&h(t,["requests[]","content"],Oc(o,i));const s=p(e,["config"]);s!=null&&h(t,["config"],t_(o,s,t));const l=p(e,["model"]);return l!==void 0&&h(t,["requests[]","model"],Qt(o,l)),t}function i_(o,e,t){const n={};if(p(e,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(p(e,["negativePrompt"])!==void 0)throw new Error("negativePrompt parameter is not supported in Gemini API.");const i=p(e,["numberOfImages"]);t!==void 0&&i!=null&&h(t,["parameters","sampleCount"],i);const s=p(e,["aspectRatio"]);t!==void 0&&s!=null&&h(t,["parameters","aspectRatio"],s);const l=p(e,["guidanceScale"]);if(t!==void 0&&l!=null&&h(t,["parameters","guidanceScale"],l),p(e,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const u=p(e,["safetyFilterLevel"]);t!==void 0&&u!=null&&h(t,["parameters","safetySetting"],u);const c=p(e,["personGeneration"]);t!==void 0&&c!=null&&h(t,["parameters","personGeneration"],c);const m=p(e,["includeSafetyAttributes"]);t!==void 0&&m!=null&&h(t,["parameters","includeSafetyAttributes"],m);const _=p(e,["includeRaiReason"]);t!==void 0&&_!=null&&h(t,["parameters","includeRaiReason"],_);const v=p(e,["language"]);t!==void 0&&v!=null&&h(t,["parameters","language"],v);const y=p(e,["outputMimeType"]);t!==void 0&&y!=null&&h(t,["parameters","outputOptions","mimeType"],y);const T=p(e,["outputCompressionQuality"]);if(t!==void 0&&T!=null&&h(t,["parameters","outputOptions","compressionQuality"],T),p(e,["addWatermark"])!==void 0)throw new Error("addWatermark parameter is not supported in Gemini API.");if(p(e,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return n}function o_(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["_url","model"],Qt(o,n));const i=p(e,["prompt"]);i!=null&&h(t,["instances[0]","prompt"],i);const s=p(e,["config"]);return s!=null&&h(t,["config"],i_(o,s,t)),t}function r_(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["_url","name"],Qt(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],i),t}function s_(o,e){const t={};if(p(e,["systemInstruction"])!==void 0)throw new Error("systemInstruction parameter is not supported in Gemini API.");if(p(e,["tools"])!==void 0)throw new Error("tools parameter is not supported in Gemini API.");if(p(e,["generationConfig"])!==void 0)throw new Error("generationConfig parameter is not supported in Gemini API.");return t}function a_(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["_url","model"],Qt(o,n));const i=p(e,["contents"]);i!=null&&(Array.isArray(i)?h(t,["contents"],Gt(o,Gt(o,i).map(l=>ss(o,l)))):h(t,["contents"],Gt(o,i)));const s=p(e,["config"]);return s!=null&&h(t,["config"],s_(o,s)),t}function l_(o,e){const t={};if(p(e,["gcsUri"])!==void 0)throw new Error("gcsUri parameter is not supported in Gemini API.");const n=p(e,["imageBytes"]);n!=null&&h(t,["bytesBase64Encoded"],Pi(o,n));const i=p(e,["mimeType"]);return i!=null&&h(t,["mimeType"],i),t}function u_(o,e,t){const n={},i=p(e,["numberOfVideos"]);if(t!==void 0&&i!=null&&h(t,["parameters","sampleCount"],i),p(e,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(p(e,["fps"])!==void 0)throw new Error("fps parameter is not supported in Gemini API.");const s=p(e,["durationSeconds"]);if(t!==void 0&&s!=null&&h(t,["parameters","durationSeconds"],s),p(e,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const l=p(e,["aspectRatio"]);if(t!==void 0&&l!=null&&h(t,["parameters","aspectRatio"],l),p(e,["resolution"])!==void 0)throw new Error("resolution parameter is not supported in Gemini API.");const u=p(e,["personGeneration"]);if(t!==void 0&&u!=null&&h(t,["parameters","personGeneration"],u),p(e,["pubsubTopic"])!==void 0)throw new Error("pubsubTopic parameter is not supported in Gemini API.");const c=p(e,["negativePrompt"]);if(t!==void 0&&c!=null&&h(t,["parameters","negativePrompt"],c),p(e,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return n}function c_(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["_url","model"],Qt(o,n));const i=p(e,["prompt"]);i!=null&&h(t,["instances[0]","prompt"],i);const s=p(e,["image"]);s!=null&&h(t,["instances[0]","image"],l_(o,s));const l=p(e,["config"]);return l!=null&&h(t,["config"],u_(o,l,t)),t}function f_(o,e){const t={},n=p(e,["videoMetadata"]);n!=null&&h(t,["videoMetadata"],n);const i=p(e,["thought"]);i!=null&&h(t,["thought"],i);const s=p(e,["codeExecutionResult"]);s!=null&&h(t,["codeExecutionResult"],s);const l=p(e,["executableCode"]);l!=null&&h(t,["executableCode"],l);const u=p(e,["fileData"]);u!=null&&h(t,["fileData"],u);const c=p(e,["functionCall"]);c!=null&&h(t,["functionCall"],c);const m=p(e,["functionResponse"]);m!=null&&h(t,["functionResponse"],m);const _=p(e,["inlineData"]);_!=null&&h(t,["inlineData"],_);const v=p(e,["text"]);return v!=null&&h(t,["text"],v),t}function Ao(o,e){const t={},n=p(e,["parts"]);n!=null&&(Array.isArray(n)?h(t,["parts"],n.map(s=>f_(o,s))):h(t,["parts"],n));const i=p(e,["role"]);return i!=null&&h(t,["role"],i),t}function qc(o,e){const t={},n=p(e,["example"]);n!=null&&h(t,["example"],n);const i=p(e,["pattern"]);i!=null&&h(t,["pattern"],i);const s=p(e,["default"]);s!=null&&h(t,["default"],s);const l=p(e,["maxLength"]);l!=null&&h(t,["maxLength"],l);const u=p(e,["minLength"]);u!=null&&h(t,["minLength"],u);const c=p(e,["minProperties"]);c!=null&&h(t,["minProperties"],c);const m=p(e,["maxProperties"]);m!=null&&h(t,["maxProperties"],m);const _=p(e,["anyOf"]);_!=null&&h(t,["anyOf"],_);const v=p(e,["description"]);v!=null&&h(t,["description"],v);const y=p(e,["enum"]);y!=null&&h(t,["enum"],y);const T=p(e,["format"]);T!=null&&h(t,["format"],T);const w=p(e,["items"]);w!=null&&h(t,["items"],w);const P=p(e,["maxItems"]);P!=null&&h(t,["maxItems"],P);const C=p(e,["maximum"]);C!=null&&h(t,["maximum"],C);const E=p(e,["minItems"]);E!=null&&h(t,["minItems"],E);const O=p(e,["minimum"]);O!=null&&h(t,["minimum"],O);const N=p(e,["nullable"]);N!=null&&h(t,["nullable"],N);const b=p(e,["properties"]);b!=null&&h(t,["properties"],b);const X=p(e,["propertyOrdering"]);X!=null&&h(t,["propertyOrdering"],X);const q=p(e,["required"]);q!=null&&h(t,["required"],q);const W=p(e,["title"]);W!=null&&h(t,["title"],W);const K=p(e,["type"]);return K!=null&&h(t,["type"],K),t}function d_(o,e){const t={},n=p(e,["featureSelectionPreference"]);return n!=null&&h(t,["featureSelectionPreference"],n),t}function h_(o,e){const t={},n=p(e,["method"]);n!=null&&h(t,["method"],n);const i=p(e,["category"]);i!=null&&h(t,["category"],i);const s=p(e,["threshold"]);return s!=null&&h(t,["threshold"],s),t}function p_(o,e){const t={},n=p(e,["response"]);n!=null&&h(t,["response"],qc(o,n));const i=p(e,["description"]);i!=null&&h(t,["description"],i);const s=p(e,["name"]);s!=null&&h(t,["name"],s);const l=p(e,["parameters"]);return l!=null&&h(t,["parameters"],l),t}function m_(){return{}}function g_(o,e){const t={},n=p(e,["mode"]);n!=null&&h(t,["mode"],n);const i=p(e,["dynamicThreshold"]);return i!=null&&h(t,["dynamicThreshold"],i),t}function __(o,e){const t={},n=p(e,["dynamicRetrievalConfig"]);return n!=null&&h(t,["dynamicRetrievalConfig"],g_(o,n)),t}function $c(o,e){const t={},n=p(e,["functionDeclarations"]);n!=null&&(Array.isArray(n)?h(t,["functionDeclarations"],n.map(c=>p_(o,c))):h(t,["functionDeclarations"],n));const i=p(e,["retrieval"]);i!=null&&h(t,["retrieval"],i),p(e,["googleSearch"])!=null&&h(t,["googleSearch"],m_());const l=p(e,["googleSearchRetrieval"]);l!=null&&h(t,["googleSearchRetrieval"],__(o,l));const u=p(e,["codeExecution"]);return u!=null&&h(t,["codeExecution"],u),t}function v_(o,e){const t={},n=p(e,["mode"]);n!=null&&h(t,["mode"],n);const i=p(e,["allowedFunctionNames"]);return i!=null&&h(t,["allowedFunctionNames"],i),t}function y_(o,e){const t={},n=p(e,["functionCallingConfig"]);return n!=null&&h(t,["functionCallingConfig"],v_(o,n)),t}function x_(o,e){const t={},n=p(e,["voiceName"]);return n!=null&&h(t,["voiceName"],n),t}function E_(o,e){const t={},n=p(e,["prebuiltVoiceConfig"]);return n!=null&&h(t,["prebuiltVoiceConfig"],x_(o,n)),t}function T_(o,e){const t={},n=p(e,["voiceConfig"]);n!=null&&h(t,["voiceConfig"],E_(o,n));const i=p(e,["languageCode"]);return i!=null&&h(t,["languageCode"],i),t}function S_(o,e){const t={},n=p(e,["includeThoughts"]);n!=null&&h(t,["includeThoughts"],n);const i=p(e,["thinkingBudget"]);return i!=null&&h(t,["thinkingBudget"],i),t}function M_(o,e,t){const n={},i=p(e,["systemInstruction"]);t!==void 0&&i!=null&&h(t,["systemInstruction"],Ao(o,_n(o,i)));const s=p(e,["temperature"]);s!=null&&h(n,["temperature"],s);const l=p(e,["topP"]);l!=null&&h(n,["topP"],l);const u=p(e,["topK"]);u!=null&&h(n,["topK"],u);const c=p(e,["candidateCount"]);c!=null&&h(n,["candidateCount"],c);const m=p(e,["maxOutputTokens"]);m!=null&&h(n,["maxOutputTokens"],m);const _=p(e,["stopSequences"]);_!=null&&h(n,["stopSequences"],_);const v=p(e,["responseLogprobs"]);v!=null&&h(n,["responseLogprobs"],v);const y=p(e,["logprobs"]);y!=null&&h(n,["logprobs"],y);const T=p(e,["presencePenalty"]);T!=null&&h(n,["presencePenalty"],T);const w=p(e,["frequencyPenalty"]);w!=null&&h(n,["frequencyPenalty"],w);const P=p(e,["seed"]);P!=null&&h(n,["seed"],P);const C=p(e,["responseMimeType"]);C!=null&&h(n,["responseMimeType"],C);const E=p(e,["responseSchema"]);E!=null&&h(n,["responseSchema"],qc(o,kc(o,E)));const O=p(e,["routingConfig"]);O!=null&&h(n,["routingConfig"],O);const N=p(e,["modelSelectionConfig"]);N!=null&&h(n,["modelConfig"],d_(o,N));const b=p(e,["safetySettings"]);t!==void 0&&b!=null&&(Array.isArray(b)?h(t,["safetySettings"],b.map(pe=>h_(o,pe))):h(t,["safetySettings"],b));const X=p(e,["tools"]);t!==void 0&&X!=null&&(Array.isArray(X)?h(t,["tools"],Dn(o,Dn(o,X).map(pe=>$c(o,rs(o,pe))))):h(t,["tools"],Dn(o,X)));const q=p(e,["toolConfig"]);t!==void 0&&q!=null&&h(t,["toolConfig"],y_(o,q));const W=p(e,["labels"]);t!==void 0&&W!=null&&h(t,["labels"],W);const K=p(e,["cachedContent"]);t!==void 0&&K!=null&&h(t,["cachedContent"],Ii(o,K));const B=p(e,["responseModalities"]);B!=null&&h(n,["responseModalities"],B);const D=p(e,["mediaResolution"]);D!=null&&h(n,["mediaResolution"],D);const $=p(e,["speechConfig"]);$!=null&&h(n,["speechConfig"],T_(o,Gc(o,$)));const ae=p(e,["audioTimestamp"]);ae!=null&&h(n,["audioTimestamp"],ae);const re=p(e,["thinkingConfig"]);return re!=null&&h(n,["thinkingConfig"],S_(o,re)),n}function xu(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["_url","model"],Qt(o,n));const i=p(e,["contents"]);i!=null&&(Array.isArray(i)?h(t,["contents"],Gt(o,Gt(o,i).map(l=>Ao(o,l)))):h(t,["contents"],Gt(o,i)));const s=p(e,["config"]);return s!=null&&h(t,["generationConfig"],M_(o,s,t)),t}function C_(o,e,t){const n={},i=p(e,["taskType"]);t!==void 0&&i!=null&&h(t,["instances[]","task_type"],i);const s=p(e,["title"]);t!==void 0&&s!=null&&h(t,["instances[]","title"],s);const l=p(e,["outputDimensionality"]);t!==void 0&&l!=null&&h(t,["parameters","outputDimensionality"],l);const u=p(e,["mimeType"]);t!==void 0&&u!=null&&h(t,["instances[]","mimeType"],u);const c=p(e,["autoTruncate"]);return t!==void 0&&c!=null&&h(t,["parameters","autoTruncate"],c),n}function A_(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["_url","model"],Qt(o,n));const i=p(e,["contents"]);i!=null&&h(t,["instances[]","content"],Oc(o,i));const s=p(e,["config"]);return s!=null&&h(t,["config"],C_(o,s,t)),t}function w_(o,e,t){const n={},i=p(e,["outputGcsUri"]);t!==void 0&&i!=null&&h(t,["parameters","storageUri"],i);const s=p(e,["negativePrompt"]);t!==void 0&&s!=null&&h(t,["parameters","negativePrompt"],s);const l=p(e,["numberOfImages"]);t!==void 0&&l!=null&&h(t,["parameters","sampleCount"],l);const u=p(e,["aspectRatio"]);t!==void 0&&u!=null&&h(t,["parameters","aspectRatio"],u);const c=p(e,["guidanceScale"]);t!==void 0&&c!=null&&h(t,["parameters","guidanceScale"],c);const m=p(e,["seed"]);t!==void 0&&m!=null&&h(t,["parameters","seed"],m);const _=p(e,["safetyFilterLevel"]);t!==void 0&&_!=null&&h(t,["parameters","safetySetting"],_);const v=p(e,["personGeneration"]);t!==void 0&&v!=null&&h(t,["parameters","personGeneration"],v);const y=p(e,["includeSafetyAttributes"]);t!==void 0&&y!=null&&h(t,["parameters","includeSafetyAttributes"],y);const T=p(e,["includeRaiReason"]);t!==void 0&&T!=null&&h(t,["parameters","includeRaiReason"],T);const w=p(e,["language"]);t!==void 0&&w!=null&&h(t,["parameters","language"],w);const P=p(e,["outputMimeType"]);t!==void 0&&P!=null&&h(t,["parameters","outputOptions","mimeType"],P);const C=p(e,["outputCompressionQuality"]);t!==void 0&&C!=null&&h(t,["parameters","outputOptions","compressionQuality"],C);const E=p(e,["addWatermark"]);t!==void 0&&E!=null&&h(t,["parameters","addWatermark"],E);const O=p(e,["enhancePrompt"]);return t!==void 0&&O!=null&&h(t,["parameters","enhancePrompt"],O),n}function R_(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["_url","model"],Qt(o,n));const i=p(e,["prompt"]);i!=null&&h(t,["instances[0]","prompt"],i);const s=p(e,["config"]);return s!=null&&h(t,["config"],w_(o,s,t)),t}function I_(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["_url","name"],Qt(o,n));const i=p(e,["config"]);return i!=null&&h(t,["config"],i),t}function P_(o,e,t){const n={},i=p(e,["systemInstruction"]);t!==void 0&&i!=null&&h(t,["systemInstruction"],Ao(o,_n(o,i)));const s=p(e,["tools"]);t!==void 0&&s!=null&&(Array.isArray(s)?h(t,["tools"],s.map(u=>$c(o,u))):h(t,["tools"],s));const l=p(e,["generationConfig"]);return t!==void 0&&l!=null&&h(t,["generationConfig"],l),n}function D_(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["_url","model"],Qt(o,n));const i=p(e,["contents"]);i!=null&&(Array.isArray(i)?h(t,["contents"],Gt(o,Gt(o,i).map(l=>Ao(o,l)))):h(t,["contents"],Gt(o,i)));const s=p(e,["config"]);return s!=null&&h(t,["config"],P_(o,s,t)),t}function b_(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["_url","model"],Qt(o,n));const i=p(e,["contents"]);i!=null&&(Array.isArray(i)?h(t,["contents"],Gt(o,Gt(o,i).map(l=>Ao(o,l)))):h(t,["contents"],Gt(o,i)));const s=p(e,["config"]);return s!=null&&h(t,["config"],s),t}function U_(o,e){const t={},n=p(e,["gcsUri"]);n!=null&&h(t,["gcsUri"],n);const i=p(e,["imageBytes"]);i!=null&&h(t,["bytesBase64Encoded"],Pi(o,i));const s=p(e,["mimeType"]);return s!=null&&h(t,["mimeType"],s),t}function N_(o,e,t){const n={},i=p(e,["numberOfVideos"]);t!==void 0&&i!=null&&h(t,["parameters","sampleCount"],i);const s=p(e,["outputGcsUri"]);t!==void 0&&s!=null&&h(t,["parameters","storageUri"],s);const l=p(e,["fps"]);t!==void 0&&l!=null&&h(t,["parameters","fps"],l);const u=p(e,["durationSeconds"]);t!==void 0&&u!=null&&h(t,["parameters","durationSeconds"],u);const c=p(e,["seed"]);t!==void 0&&c!=null&&h(t,["parameters","seed"],c);const m=p(e,["aspectRatio"]);t!==void 0&&m!=null&&h(t,["parameters","aspectRatio"],m);const _=p(e,["resolution"]);t!==void 0&&_!=null&&h(t,["parameters","resolution"],_);const v=p(e,["personGeneration"]);t!==void 0&&v!=null&&h(t,["parameters","personGeneration"],v);const y=p(e,["pubsubTopic"]);t!==void 0&&y!=null&&h(t,["parameters","pubsubTopic"],y);const T=p(e,["negativePrompt"]);t!==void 0&&T!=null&&h(t,["parameters","negativePrompt"],T);const w=p(e,["enhancePrompt"]);return t!==void 0&&w!=null&&h(t,["parameters","enhancePrompt"],w),n}function L_(o,e){const t={},n=p(e,["model"]);n!=null&&h(t,["_url","model"],Qt(o,n));const i=p(e,["prompt"]);i!=null&&h(t,["instances[0]","prompt"],i);const s=p(e,["image"]);s!=null&&h(t,["instances[0]","image"],U_(o,s));const l=p(e,["config"]);return l!=null&&h(t,["config"],N_(o,l,t)),t}function F_(o,e){const t={},n=p(e,["thought"]);n!=null&&h(t,["thought"],n);const i=p(e,["codeExecutionResult"]);i!=null&&h(t,["codeExecutionResult"],i);const s=p(e,["executableCode"]);s!=null&&h(t,["executableCode"],s);const l=p(e,["fileData"]);l!=null&&h(t,["fileData"],l);const u=p(e,["functionCall"]);u!=null&&h(t,["functionCall"],u);const c=p(e,["functionResponse"]);c!=null&&h(t,["functionResponse"],c);const m=p(e,["inlineData"]);m!=null&&h(t,["inlineData"],m);const _=p(e,["text"]);return _!=null&&h(t,["text"],_),t}function B_(o,e){const t={},n=p(e,["parts"]);n!=null&&(Array.isArray(n)?h(t,["parts"],n.map(s=>F_(o,s))):h(t,["parts"],n));const i=p(e,["role"]);return i!=null&&h(t,["role"],i),t}function V_(o,e){const t={},n=p(e,["citationSources"]);return n!=null&&h(t,["citations"],n),t}function O_(o,e){const t={},n=p(e,["content"]);n!=null&&h(t,["content"],B_(o,n));const i=p(e,["citationMetadata"]);i!=null&&h(t,["citationMetadata"],V_(o,i));const s=p(e,["tokenCount"]);s!=null&&h(t,["tokenCount"],s);const l=p(e,["finishReason"]);l!=null&&h(t,["finishReason"],l);const u=p(e,["avgLogprobs"]);u!=null&&h(t,["avgLogprobs"],u);const c=p(e,["groundingMetadata"]);c!=null&&h(t,["groundingMetadata"],c);const m=p(e,["index"]);m!=null&&h(t,["index"],m);const _=p(e,["logprobsResult"]);_!=null&&h(t,["logprobsResult"],_);const v=p(e,["safetyRatings"]);return v!=null&&h(t,["safetyRatings"],v),t}function Eu(o,e){const t={},n=p(e,["candidates"]);n!=null&&(Array.isArray(n)?h(t,["candidates"],n.map(u=>O_(o,u))):h(t,["candidates"],n));const i=p(e,["modelVersion"]);i!=null&&h(t,["modelVersion"],i);const s=p(e,["promptFeedback"]);s!=null&&h(t,["promptFeedback"],s);const l=p(e,["usageMetadata"]);return l!=null&&h(t,["usageMetadata"],l),t}function k_(o,e){const t={},n=p(e,["values"]);return n!=null&&h(t,["values"],n),t}function G_(){return{}}function H_(o,e){const t={},n=p(e,["embeddings"]);return n!=null&&(Array.isArray(n)?h(t,["embeddings"],n.map(s=>k_(o,s))):h(t,["embeddings"],n)),p(e,["metadata"])!=null&&h(t,["metadata"],G_()),t}function z_(o,e){const t={},n=p(e,["bytesBase64Encoded"]);n!=null&&h(t,["imageBytes"],Pi(o,n));const i=p(e,["mimeType"]);return i!=null&&h(t,["mimeType"],i),t}function Xc(o,e){const t={},n=p(e,["safetyAttributes","categories"]);n!=null&&h(t,["categories"],n);const i=p(e,["safetyAttributes","scores"]);i!=null&&h(t,["scores"],i);const s=p(e,["contentType"]);return s!=null&&h(t,["contentType"],s),t}function W_(o,e){const t={},n=p(e,["_self"]);n!=null&&h(t,["image"],z_(o,n));const i=p(e,["raiFilteredReason"]);i!=null&&h(t,["raiFilteredReason"],i);const s=p(e,["_self"]);return s!=null&&h(t,["safetyAttributes"],Xc(o,s)),t}function q_(o,e){const t={},n=p(e,["predictions"]);n!=null&&(Array.isArray(n)?h(t,["generatedImages"],n.map(s=>W_(o,s))):h(t,["generatedImages"],n));const i=p(e,["positivePromptSafetyAttributes"]);return i!=null&&h(t,["positivePromptSafetyAttributes"],Xc(o,i)),t}function $_(o,e){const t={},n=p(e,["baseModel"]);n!=null&&h(t,["baseModel"],n);const i=p(e,["createTime"]);i!=null&&h(t,["createTime"],i);const s=p(e,["updateTime"]);return s!=null&&h(t,["updateTime"],s),t}function X_(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["name"],n);const i=p(e,["displayName"]);i!=null&&h(t,["displayName"],i);const s=p(e,["description"]);s!=null&&h(t,["description"],s);const l=p(e,["version"]);l!=null&&h(t,["version"],l);const u=p(e,["_self"]);u!=null&&h(t,["tunedModelInfo"],$_(o,u));const c=p(e,["inputTokenLimit"]);c!=null&&h(t,["inputTokenLimit"],c);const m=p(e,["outputTokenLimit"]);m!=null&&h(t,["outputTokenLimit"],m);const _=p(e,["supportedGenerationMethods"]);return _!=null&&h(t,["supportedActions"],_),t}function Y_(o,e){const t={},n=p(e,["totalTokens"]);n!=null&&h(t,["totalTokens"],n);const i=p(e,["cachedContentTokenCount"]);return i!=null&&h(t,["cachedContentTokenCount"],i),t}function K_(o,e){const t={},n=p(e,["video","uri"]);n!=null&&h(t,["uri"],n);const i=p(e,["video","encodedVideo"]);i!=null&&h(t,["videoBytes"],Pi(o,i));const s=p(e,["encoding"]);return s!=null&&h(t,["mimeType"],s),t}function Z_(o,e){const t={},n=p(e,["_self"]);return n!=null&&h(t,["video"],K_(o,n)),t}function J_(o,e){const t={},n=p(e,["generatedSamples"]);n!=null&&(Array.isArray(n)?h(t,["generatedVideos"],n.map(l=>Z_(o,l))):h(t,["generatedVideos"],n));const i=p(e,["raiMediaFilteredCount"]);i!=null&&h(t,["raiMediaFilteredCount"],i);const s=p(e,["raiMediaFilteredReasons"]);return s!=null&&h(t,["raiMediaFilteredReasons"],s),t}function Q_(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["name"],n);const i=p(e,["metadata"]);i!=null&&h(t,["metadata"],i);const s=p(e,["done"]);s!=null&&h(t,["done"],s);const l=p(e,["error"]);l!=null&&h(t,["error"],l);const u=p(e,["response","generateVideoResponse"]);return u!=null&&h(t,["response"],J_(o,u)),t}function j_(o,e){const t={},n=p(e,["videoMetadata"]);n!=null&&h(t,["videoMetadata"],n);const i=p(e,["thought"]);i!=null&&h(t,["thought"],i);const s=p(e,["codeExecutionResult"]);s!=null&&h(t,["codeExecutionResult"],s);const l=p(e,["executableCode"]);l!=null&&h(t,["executableCode"],l);const u=p(e,["fileData"]);u!=null&&h(t,["fileData"],u);const c=p(e,["functionCall"]);c!=null&&h(t,["functionCall"],c);const m=p(e,["functionResponse"]);m!=null&&h(t,["functionResponse"],m);const _=p(e,["inlineData"]);_!=null&&h(t,["inlineData"],_);const v=p(e,["text"]);return v!=null&&h(t,["text"],v),t}function ev(o,e){const t={},n=p(e,["parts"]);n!=null&&(Array.isArray(n)?h(t,["parts"],n.map(s=>j_(o,s))):h(t,["parts"],n));const i=p(e,["role"]);return i!=null&&h(t,["role"],i),t}function tv(o,e){const t={},n=p(e,["citations"]);return n!=null&&h(t,["citations"],n),t}function nv(o,e){const t={},n=p(e,["content"]);n!=null&&h(t,["content"],ev(o,n));const i=p(e,["citationMetadata"]);i!=null&&h(t,["citationMetadata"],tv(o,i));const s=p(e,["finishMessage"]);s!=null&&h(t,["finishMessage"],s);const l=p(e,["finishReason"]);l!=null&&h(t,["finishReason"],l);const u=p(e,["avgLogprobs"]);u!=null&&h(t,["avgLogprobs"],u);const c=p(e,["groundingMetadata"]);c!=null&&h(t,["groundingMetadata"],c);const m=p(e,["index"]);m!=null&&h(t,["index"],m);const _=p(e,["logprobsResult"]);_!=null&&h(t,["logprobsResult"],_);const v=p(e,["safetyRatings"]);return v!=null&&h(t,["safetyRatings"],v),t}function Tu(o,e){const t={},n=p(e,["candidates"]);n!=null&&(Array.isArray(n)?h(t,["candidates"],n.map(m=>nv(o,m))):h(t,["candidates"],n));const i=p(e,["createTime"]);i!=null&&h(t,["createTime"],i);const s=p(e,["responseId"]);s!=null&&h(t,["responseId"],s);const l=p(e,["modelVersion"]);l!=null&&h(t,["modelVersion"],l);const u=p(e,["promptFeedback"]);u!=null&&h(t,["promptFeedback"],u);const c=p(e,["usageMetadata"]);return c!=null&&h(t,["usageMetadata"],c),t}function iv(o,e){const t={},n=p(e,["truncated"]);n!=null&&h(t,["truncated"],n);const i=p(e,["token_count"]);return i!=null&&h(t,["tokenCount"],i),t}function ov(o,e){const t={},n=p(e,["values"]);n!=null&&h(t,["values"],n);const i=p(e,["statistics"]);return i!=null&&h(t,["statistics"],iv(o,i)),t}function rv(o,e){const t={},n=p(e,["billableCharacterCount"]);return n!=null&&h(t,["billableCharacterCount"],n),t}function sv(o,e){const t={},n=p(e,["predictions[]","embeddings"]);n!=null&&(Array.isArray(n)?h(t,["embeddings"],n.map(s=>ov(o,s))):h(t,["embeddings"],n));const i=p(e,["metadata"]);return i!=null&&h(t,["metadata"],rv(o,i)),t}function av(o,e){const t={},n=p(e,["gcsUri"]);n!=null&&h(t,["gcsUri"],n);const i=p(e,["bytesBase64Encoded"]);i!=null&&h(t,["imageBytes"],Pi(o,i));const s=p(e,["mimeType"]);return s!=null&&h(t,["mimeType"],s),t}function Yc(o,e){const t={},n=p(e,["safetyAttributes","categories"]);n!=null&&h(t,["categories"],n);const i=p(e,["safetyAttributes","scores"]);i!=null&&h(t,["scores"],i);const s=p(e,["contentType"]);return s!=null&&h(t,["contentType"],s),t}function lv(o,e){const t={},n=p(e,["_self"]);n!=null&&h(t,["image"],av(o,n));const i=p(e,["raiFilteredReason"]);i!=null&&h(t,["raiFilteredReason"],i);const s=p(e,["_self"]);s!=null&&h(t,["safetyAttributes"],Yc(o,s));const l=p(e,["prompt"]);return l!=null&&h(t,["enhancedPrompt"],l),t}function uv(o,e){const t={},n=p(e,["predictions"]);n!=null&&(Array.isArray(n)?h(t,["generatedImages"],n.map(s=>lv(o,s))):h(t,["generatedImages"],n));const i=p(e,["positivePromptSafetyAttributes"]);return i!=null&&h(t,["positivePromptSafetyAttributes"],Yc(o,i)),t}function cv(o,e){const t={},n=p(e,["endpoint"]);n!=null&&h(t,["name"],n);const i=p(e,["deployedModelId"]);return i!=null&&h(t,["deployedModelId"],i),t}function fv(o,e){const t={},n=p(e,["labels","google-vertex-llm-tuning-base-model-id"]);n!=null&&h(t,["baseModel"],n);const i=p(e,["createTime"]);i!=null&&h(t,["createTime"],i);const s=p(e,["updateTime"]);return s!=null&&h(t,["updateTime"],s),t}function dv(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["name"],n);const i=p(e,["displayName"]);i!=null&&h(t,["displayName"],i);const s=p(e,["description"]);s!=null&&h(t,["description"],s);const l=p(e,["versionId"]);l!=null&&h(t,["version"],l);const u=p(e,["deployedModels"]);u!=null&&(Array.isArray(u)?h(t,["endpoints"],u.map(_=>cv(o,_))):h(t,["endpoints"],u));const c=p(e,["labels"]);c!=null&&h(t,["labels"],c);const m=p(e,["_self"]);return m!=null&&h(t,["tunedModelInfo"],fv(o,m)),t}function hv(o,e){const t={},n=p(e,["totalTokens"]);return n!=null&&h(t,["totalTokens"],n),t}function pv(o,e){const t={},n=p(e,["tokensInfo"]);return n!=null&&h(t,["tokensInfo"],n),t}function mv(o,e){const t={},n=p(e,["gcsUri"]);n!=null&&h(t,["uri"],n);const i=p(e,["bytesBase64Encoded"]);i!=null&&h(t,["videoBytes"],Pi(o,i));const s=p(e,["mimeType"]);return s!=null&&h(t,["mimeType"],s),t}function gv(o,e){const t={},n=p(e,["_self"]);return n!=null&&h(t,["video"],mv(o,n)),t}function _v(o,e){const t={},n=p(e,["videos"]);n!=null&&(Array.isArray(n)?h(t,["generatedVideos"],n.map(l=>gv(o,l))):h(t,["generatedVideos"],n));const i=p(e,["raiMediaFilteredCount"]);i!=null&&h(t,["raiMediaFilteredCount"],i);const s=p(e,["raiMediaFilteredReasons"]);return s!=null&&h(t,["raiMediaFilteredReasons"],s),t}function vv(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["name"],n);const i=p(e,["metadata"]);i!=null&&h(t,["metadata"],i);const s=p(e,["done"]);s!=null&&h(t,["done"],s);const l=p(e,["error"]);l!=null&&h(t,["error"],l);const u=p(e,["response"]);return u!=null&&h(t,["response"],_v(o,u)),t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const yv="FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";async function xv(o,e,t){let n,i;t.data instanceof Blob?i=JSON.parse(await t.data.text()):i=JSON.parse(t.data),o.isVertexAI()?n=Og(o,i):n=Vg(o,i),e(n)}class Ev{constructor(e,t,n){this.apiClient=e,this.auth=t,this.webSocketFactory=n}async connect(e){var t,n,i,s;const l=this.apiClient.getWebsocketBaseUrl(),u=this.apiClient.getApiVersion();let c;const m=Cv(this.apiClient.getDefaultHeaders());if(this.apiClient.isVertexAI())c=`${l}/ws/google.cloud.aiplatform.${u}.LlmBidiService/BidiGenerateContent`,await this.auth.addAuthHeaders(m);else{const b=this.apiClient.getApiKey();c=`${l}/ws/google.ai.generativelanguage.${u}.GenerativeService.BidiGenerateContent?key=${b}`}let _=()=>{};const v=new Promise(b=>{_=b}),y=e.callbacks,T=function(){var b;(b=y?.onopen)===null||b===void 0||b.call(y),_({})},w=this.apiClient,P={onopen:T,onmessage:b=>{xv(w,y.onmessage,b)},onerror:(t=y?.onerror)!==null&&t!==void 0?t:function(b){},onclose:(n=y?.onclose)!==null&&n!==void 0?n:function(b){}},C=this.webSocketFactory.create(c,Mv(m),P);C.connect(),await v;let E=Qt(this.apiClient,e.model);if(this.apiClient.isVertexAI()&&E.startsWith("publishers/")){const b=this.apiClient.getProject(),X=this.apiClient.getLocation();E=`projects/${b}/locations/${X}/`+E}let O={};this.apiClient.isVertexAI()&&((i=e.config)===null||i===void 0?void 0:i.responseModalities)===void 0&&(e.config===void 0?e.config={responseModalities:[Ho.AUDIO]}:e.config.responseModalities=[Ho.AUDIO]),!((s=e.config)===null||s===void 0)&&s.generationConfig&&console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");const N={model:E,config:e.config,callbacks:e.callbacks};return this.apiClient.isVertexAI()?O=_g(this.apiClient,N):O=gg(this.apiClient,N),delete O.config,C.send(JSON.stringify(O)),new Sv(C,this.apiClient)}}const Tv={turnComplete:!0};class Sv{constructor(e,t){this.conn=e,this.apiClient=t}tLiveClientContent(e,t){if(t.turns!==null&&t.turns!==void 0){let n=[];try{n=Gt(e,t.turns),e.isVertexAI()?n=n.map(i=>Ao(e,i)):n=n.map(i=>ss(e,i))}catch{throw new Error(`Failed to parse client content "turns", type: '${typeof t.turns}'`)}return{clientContent:{turns:n,turnComplete:t.turnComplete}}}return{clientContent:{turnComplete:t.turnComplete}}}tLiveClientRealtimeInput(e,t){let n={};if(!("media"in t)||!t.media)throw new Error(`Failed to convert realtime input "media", type: '${typeof t.media}'`);return n={realtimeInput:{mediaChunks:[t.media],activityStart:t.activityStart,activityEnd:t.activityEnd}},n}tLiveClienttToolResponse(e,t){let n=[];if(t.functionResponses==null)throw new Error("functionResponses is required.");if(Array.isArray(t.functionResponses)?n=t.functionResponses:n=[t.functionResponses],n.length===0)throw new Error("functionResponses is required.");for(const s of n){if(typeof s!="object"||s===null||!("name"in s)||!("response"in s))throw new Error(`Could not parse function response, type '${typeof s}'.`);if(!e.isVertexAI()&&!("id"in s))throw new Error(yv)}return{toolResponse:{functionResponses:n}}}sendClientContent(e){e=Object.assign(Object.assign({},Tv),e);const t=this.tLiveClientContent(this.apiClient,e);this.conn.send(JSON.stringify(t))}sendRealtimeInput(e){if(e.media==null)throw new Error("Media is required.");const t=this.tLiveClientRealtimeInput(this.apiClient,e);this.conn.send(JSON.stringify(t))}sendToolResponse(e){if(e.functionResponses==null)throw new Error("Tool response parameters are required.");const t=this.tLiveClienttToolResponse(this.apiClient,e);this.conn.send(JSON.stringify(t))}close(){this.conn.close()}}function Mv(o){const e={};return o.forEach((t,n)=>{e[n]=t}),e}function Cv(o){const e=new Headers;for(const[t,n]of Object.entries(o))e.append(t,n);return e}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Av extends os{constructor(e){super(),this.apiClient=e,this.generateContent=async t=>await this.generateContentInternal(t),this.generateContentStream=async t=>await this.generateContentStreamInternal(t),this.generateImages=async t=>await this.generateImagesInternal(t).then(n=>{var i;let s;const l=[];if(n?.generatedImages)for(const c of n.generatedImages)c&&c?.safetyAttributes&&((i=c?.safetyAttributes)===null||i===void 0?void 0:i.contentType)==="Positive Prompt"?s=c?.safetyAttributes:l.push(c);let u;return s?u={generatedImages:l,positivePromptSafetyAttributes:s}:u={generatedImages:l},u})}async generateContentInternal(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const u=xu(this.apiClient,e);return s=At("{model}:generateContent",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(c=>c.json()),i.then(c=>{const m=Tu(this.apiClient,c),_=new ur;return Object.assign(_,m),_})}else{const u=yu(this.apiClient,e);return s=At("{model}:generateContent",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(c=>c.json()),i.then(c=>{const m=Eu(this.apiClient,c),_=new ur;return Object.assign(_,m),_})}}async generateContentStreamInternal(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const u=xu(this.apiClient,e);s=At("{model}:streamGenerateContent?alt=sse",u._url),l=u._query,delete u.config,delete u._url,delete u._query;const c=this.apiClient;return i=c.requestStream({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}),i.then(function(m){return Yr(this,arguments,function*(){var _,v,y,T;try{for(var w=!0,P=Ks(m),C;C=yield nn(P.next()),_=C.done,!_;w=!0){T=C.value,w=!1;const O=Tu(c,yield nn(T.json())),N=new ur;Object.assign(N,O),yield yield nn(N)}}catch(E){v={error:E}}finally{try{!w&&!_&&(y=P.return)&&(yield nn(y.call(P)))}finally{if(v)throw v.error}}})})}else{const u=yu(this.apiClient,e);s=At("{model}:streamGenerateContent?alt=sse",u._url),l=u._query,delete u.config,delete u._url,delete u._query;const c=this.apiClient;return i=c.requestStream({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}),i.then(function(m){return Yr(this,arguments,function*(){var _,v,y,T;try{for(var w=!0,P=Ks(m),C;C=yield nn(P.next()),_=C.done,!_;w=!0){T=C.value,w=!1;const O=Eu(c,yield nn(T.json())),N=new ur;Object.assign(N,O),yield yield nn(N)}}catch(E){v={error:E}}finally{try{!w&&!_&&(y=P.return)&&(yield nn(y.call(P)))}finally{if(v)throw v.error}}})})}}async embedContent(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const u=A_(this.apiClient,e);return s=At("{model}:predict",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(c=>c.json()),i.then(c=>{const m=sv(this.apiClient,c),_=new cu;return Object.assign(_,m),_})}else{const u=n_(this.apiClient,e);return s=At("{model}:batchEmbedContents",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(c=>c.json()),i.then(c=>{const m=H_(this.apiClient,c),_=new cu;return Object.assign(_,m),_})}}async generateImagesInternal(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const u=R_(this.apiClient,e);return s=At("{model}:predict",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(c=>c.json()),i.then(c=>{const m=uv(this.apiClient,c),_=new fu;return Object.assign(_,m),_})}else{const u=o_(this.apiClient,e);return s=At("{model}:predict",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(c=>c.json()),i.then(c=>{const m=q_(this.apiClient,c),_=new fu;return Object.assign(_,m),_})}}async get(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const u=I_(this.apiClient,e);return s=At("{name}",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(c=>c.json()),i.then(c=>dv(this.apiClient,c))}else{const u=r_(this.apiClient,e);return s=At("{name}",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"GET",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(c=>c.json()),i.then(c=>X_(this.apiClient,c))}}async countTokens(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const u=D_(this.apiClient,e);return s=At("{model}:countTokens",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(c=>c.json()),i.then(c=>{const m=hv(this.apiClient,c),_=new du;return Object.assign(_,m),_})}else{const u=a_(this.apiClient,e);return s=At("{model}:countTokens",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(c=>c.json()),i.then(c=>{const m=Y_(this.apiClient,c),_=new du;return Object.assign(_,m),_})}}async computeTokens(e){var t;let n,i="",s={};if(this.apiClient.isVertexAI()){const l=b_(this.apiClient,e);return i=At("{model}:computeTokens",l._url),s=l._query,delete l.config,delete l._url,delete l._query,n=this.apiClient.request({path:i,queryParams:s,body:JSON.stringify(l),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(u=>u.json()),n.then(u=>{const c=pv(this.apiClient,u),m=new xm;return Object.assign(m,c),m})}else throw new Error("This method is only supported by the Vertex AI.")}async generateVideos(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const u=L_(this.apiClient,e);return s=At("{model}:predictLongRunning",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(c=>c.json()),i.then(c=>vv(this.apiClient,c))}else{const u=c_(this.apiClient,e);return s=At("{model}:predictLongRunning",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"POST",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(c=>c.json()),i.then(c=>Q_(this.apiClient,c))}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function wv(o,e){const t={},n=p(e,["operationName"]);n!=null&&h(t,["_url","operationName"],n);const i=p(e,["config"]);return i!=null&&h(t,["config"],i),t}function Rv(o,e){const t={},n=p(e,["operationName"]);n!=null&&h(t,["_url","operationName"],n);const i=p(e,["config"]);return i!=null&&h(t,["config"],i),t}function Iv(o,e){const t={},n=p(e,["operationName"]);n!=null&&h(t,["operationName"],n);const i=p(e,["resourceName"]);i!=null&&h(t,["_url","resourceName"],i);const s=p(e,["config"]);return s!=null&&h(t,["config"],s),t}function Pv(o,e){const t={},n=p(e,["video","uri"]);n!=null&&h(t,["uri"],n);const i=p(e,["video","encodedVideo"]);i!=null&&h(t,["videoBytes"],Pi(o,i));const s=p(e,["encoding"]);return s!=null&&h(t,["mimeType"],s),t}function Dv(o,e){const t={},n=p(e,["_self"]);return n!=null&&h(t,["video"],Pv(o,n)),t}function bv(o,e){const t={},n=p(e,["generatedSamples"]);n!=null&&(Array.isArray(n)?h(t,["generatedVideos"],n.map(l=>Dv(o,l))):h(t,["generatedVideos"],n));const i=p(e,["raiMediaFilteredCount"]);i!=null&&h(t,["raiMediaFilteredCount"],i);const s=p(e,["raiMediaFilteredReasons"]);return s!=null&&h(t,["raiMediaFilteredReasons"],s),t}function Uv(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["name"],n);const i=p(e,["metadata"]);i!=null&&h(t,["metadata"],i);const s=p(e,["done"]);s!=null&&h(t,["done"],s);const l=p(e,["error"]);l!=null&&h(t,["error"],l);const u=p(e,["response","generateVideoResponse"]);return u!=null&&h(t,["response"],bv(o,u)),t}function Nv(o,e){const t={},n=p(e,["gcsUri"]);n!=null&&h(t,["uri"],n);const i=p(e,["bytesBase64Encoded"]);i!=null&&h(t,["videoBytes"],Pi(o,i));const s=p(e,["mimeType"]);return s!=null&&h(t,["mimeType"],s),t}function Lv(o,e){const t={},n=p(e,["_self"]);return n!=null&&h(t,["video"],Nv(o,n)),t}function Fv(o,e){const t={},n=p(e,["videos"]);n!=null&&(Array.isArray(n)?h(t,["generatedVideos"],n.map(l=>Lv(o,l))):h(t,["generatedVideos"],n));const i=p(e,["raiMediaFilteredCount"]);i!=null&&h(t,["raiMediaFilteredCount"],i);const s=p(e,["raiMediaFilteredReasons"]);return s!=null&&h(t,["raiMediaFilteredReasons"],s),t}function Su(o,e){const t={},n=p(e,["name"]);n!=null&&h(t,["name"],n);const i=p(e,["metadata"]);i!=null&&h(t,["metadata"],i);const s=p(e,["done"]);s!=null&&h(t,["done"],s);const l=p(e,["error"]);l!=null&&h(t,["error"],l);const u=p(e,["response"]);return u!=null&&h(t,["response"],Fv(o,u)),t}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Bv extends os{constructor(e){super(),this.apiClient=e}async getVideosOperation(e){const t=e.operation,n=e.config;if(t.name===void 0||t.name==="")throw new Error("Operation name is required.");if(this.apiClient.isVertexAI()){const i=t.name.split("/operations/")[0];let s;return n&&"httpOptions"in n&&(s=n.httpOptions),this.fetchPredictVideosOperationInternal({operationName:t.name,resourceName:i,config:{httpOptions:s}})}else return this.getVideosOperationInternal({operationName:t.name,config:n})}async getVideosOperationInternal(e){var t,n;let i,s="",l={};if(this.apiClient.isVertexAI()){const u=Rv(this.apiClient,e);return s=At("{operationName}",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"GET",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(c=>c.json()),i.then(c=>Su(this.apiClient,c))}else{const u=wv(this.apiClient,e);return s=At("{operationName}",u._url),l=u._query,delete u.config,delete u._url,delete u._query,i=this.apiClient.request({path:s,queryParams:l,body:JSON.stringify(u),httpMethod:"GET",httpOptions:(n=e.config)===null||n===void 0?void 0:n.httpOptions}).then(c=>c.json()),i.then(c=>Uv(this.apiClient,c))}}async fetchPredictVideosOperationInternal(e){var t;let n,i="",s={};if(this.apiClient.isVertexAI()){const l=Iv(this.apiClient,e);return i=At("{resourceName}:fetchPredictOperation",l._url),s=l._query,delete l.config,delete l._url,delete l._query,n=this.apiClient.request({path:i,queryParams:s,body:JSON.stringify(l),httpMethod:"POST",httpOptions:(t=e.config)===null||t===void 0?void 0:t.httpOptions}).then(u=>u.json()),n.then(u=>Su(this.apiClient,u))}else throw new Error("This method is only supported by the Vertex AI.")}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Vv="Content-Type",Ov="X-Server-Timeout",kv="User-Agent",Gv="x-goog-api-client",Hv="0.9.0",zv=`google-genai-sdk/${Hv}`,Wv="v1beta1",qv="v1beta",Mu=/^data: (.*)(?:\n\n|\r\r|\r\n\r\n)/;class $v extends Error{constructor(e,t){t?super(e,{cause:t}):super(e,{cause:new Error().stack}),this.message=e,this.name="ClientError"}}class Cu extends Error{constructor(e,t){t?super(e,{cause:t}):super(e,{cause:new Error().stack}),this.message=e,this.name="ServerError"}}class Xv{constructor(e){var t,n;this.clientOptions=Object.assign(Object.assign({},e),{project:e.project,location:e.location,apiKey:e.apiKey,vertexai:e.vertexai});const i={};this.clientOptions.vertexai?(i.apiVersion=(t=this.clientOptions.apiVersion)!==null&&t!==void 0?t:Wv,this.getProject()||this.getLocation()?(i.baseUrl=`https://${this.clientOptions.location}-aiplatform.googleapis.com/`,this.clientOptions.apiKey=void 0):(i.baseUrl="https://aiplatform.googleapis.com/",this.clientOptions.project=void 0,this.clientOptions.location=void 0)):(i.apiVersion=(n=this.clientOptions.apiVersion)!==null&&n!==void 0?n:qv,i.baseUrl="https://generativelanguage.googleapis.com/"),i.headers=this.getDefaultHeaders(),this.clientOptions.httpOptions=i,e.httpOptions&&(this.clientOptions.httpOptions=this.patchHttpOptions(i,e.httpOptions))}isVertexAI(){var e;return(e=this.clientOptions.vertexai)!==null&&e!==void 0?e:!1}getProject(){return this.clientOptions.project}getLocation(){return this.clientOptions.location}getApiVersion(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.apiVersion!==void 0)return this.clientOptions.httpOptions.apiVersion;throw new Error("API version is not set.")}getBaseUrl(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.baseUrl!==void 0)return this.clientOptions.httpOptions.baseUrl;throw new Error("Base URL is not set.")}getRequestUrl(){return this.getRequestUrlInternal(this.clientOptions.httpOptions)}getHeaders(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.headers!==void 0)return this.clientOptions.httpOptions.headers;throw new Error("Headers are not set.")}getRequestUrlInternal(e){if(!e||e.baseUrl===void 0||e.apiVersion===void 0)throw new Error("HTTP options are not correctly set.");const n=[e.baseUrl.endsWith("/")?e.baseUrl.slice(0,-1):e.baseUrl];return e.apiVersion&&e.apiVersion!==""&&n.push(e.apiVersion),n.join("/")}getBaseResourcePath(){return`projects/${this.clientOptions.project}/locations/${this.clientOptions.location}`}getApiKey(){return this.clientOptions.apiKey}getWebsocketBaseUrl(){const e=this.getBaseUrl(),t=new URL(e);return t.protocol="wss",t.toString()}setBaseUrl(e){if(this.clientOptions.httpOptions)this.clientOptions.httpOptions.baseUrl=e;else throw new Error("HTTP options are not correctly set.")}constructUrl(e,t,n){const i=[this.getRequestUrlInternal(t)];return n&&i.push(this.getBaseResourcePath()),e!==""&&i.push(e),new URL(`${i.join("/")}`)}shouldPrependVertexProjectPath(e){return!(this.clientOptions.apiKey||!this.clientOptions.vertexai||e.path.startsWith("projects/")||e.httpMethod==="GET"&&e.path.startsWith("publishers/google/models"))}async request(e){let t=this.clientOptions.httpOptions;e.httpOptions&&(t=this.patchHttpOptions(this.clientOptions.httpOptions,e.httpOptions));const n=this.shouldPrependVertexProjectPath(e),i=this.constructUrl(e.path,t,n);if(e.queryParams)for(const[l,u]of Object.entries(e.queryParams))i.searchParams.append(l,String(u));let s={};if(e.httpMethod==="GET"){if(e.body&&e.body!=="{}")throw new Error("Request body should be empty for GET request, but got non empty request body")}else s.body=e.body;return s=await this.includeExtraHttpOptionsToRequestInit(s,t),this.unaryApiCall(i,s,e.httpMethod)}patchHttpOptions(e,t){const n=JSON.parse(JSON.stringify(e));for(const[i,s]of Object.entries(t))typeof s=="object"?n[i]=Object.assign(Object.assign({},n[i]),s):s!==void 0&&(n[i]=s);return n}async requestStream(e){let t=this.clientOptions.httpOptions;e.httpOptions&&(t=this.patchHttpOptions(this.clientOptions.httpOptions,e.httpOptions));const n=this.shouldPrependVertexProjectPath(e),i=this.constructUrl(e.path,t,n);(!i.searchParams.has("alt")||i.searchParams.get("alt")!=="sse")&&i.searchParams.set("alt","sse");let s={};return s.body=e.body,s=await this.includeExtraHttpOptionsToRequestInit(s,t),this.streamApiCall(i,s,e.httpMethod)}async includeExtraHttpOptionsToRequestInit(e,t){if(t&&t.timeout&&t.timeout>0){const n=new AbortController,i=n.signal;setTimeout(()=>n.abort(),t.timeout),e.signal=i}return e.headers=await this.getHeadersInternal(t),e}async unaryApiCall(e,t,n){return this.apiCall(e.toString(),Object.assign(Object.assign({},t),{method:n})).then(async i=>(await Au(i),new Ys(i))).catch(i=>{throw i instanceof Error?i:new Error(JSON.stringify(i))})}async streamApiCall(e,t,n){return this.apiCall(e.toString(),Object.assign(Object.assign({},t),{method:n})).then(async i=>(await Au(i),this.processStreamResponse(i))).catch(i=>{throw i instanceof Error?i:new Error(JSON.stringify(i))})}processStreamResponse(e){var t;return Yr(this,arguments,function*(){const i=(t=e?.body)===null||t===void 0?void 0:t.getReader(),s=new TextDecoder("utf-8");if(!i)throw new Error("Response body is empty");try{let l="";for(;;){const{done:u,value:c}=yield nn(i.read());if(u){if(l.trim().length>0)throw new Error("Incomplete JSON segment at the end");break}const m=s.decode(c);l+=m;let _=l.match(Mu);for(;_;){const v=_[1];try{const y=new Response(v,{headers:e?.headers,status:e?.status,statusText:e?.statusText});yield yield nn(new Ys(y)),l=l.slice(_[0].length),_=l.match(Mu)}catch(y){throw new Error(`exception parsing stream chunk ${v}. ${y}`)}}}}finally{i.releaseLock()}})}async apiCall(e,t){return fetch(e,t).catch(n=>{throw new Error(`exception ${n} sending request`)})}getDefaultHeaders(){const e={},t=zv+" "+this.clientOptions.userAgentExtra;return e[kv]=t,e[Gv]=t,e[Vv]="application/json",e}async getHeadersInternal(e){const t=new Headers;if(e&&e.headers){for(const[n,i]of Object.entries(e.headers))t.append(n,i);e.timeout&&e.timeout>0&&t.append(Ov,String(Math.ceil(e.timeout/1e3)))}return await this.clientOptions.auth.addAuthHeaders(t),t}async uploadFile(e,t){var n;const i={};t!=null&&(i.mimeType=t.mimeType,i.name=t.name,i.displayName=t.displayName),i.name&&!i.name.startsWith("files/")&&(i.name=`files/${i.name}`);const s=this.clientOptions.uploader,l=await s.stat(e);i.sizeBytes=String(l.size);const u=(n=t?.mimeType)!==null&&n!==void 0?n:l.type;if(u===void 0||u==="")throw new Error("Can not determine mimeType. Please provide mimeType in the config.");i.mimeType=u;const c=await this.fetchUploadUrl(i,t);return s.upload(e,c,this)}async fetchUploadUrl(e,t){var n;let i={};t?.httpOptions?i=t.httpOptions:i={apiVersion:"",headers:{"Content-Type":"application/json","X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${e.sizeBytes}`,"X-Goog-Upload-Header-Content-Type":`${e.mimeType}`}};const s={file:e},l=await this.request({path:At("upload/v1beta/files",s._url),body:JSON.stringify(s),httpMethod:"POST",httpOptions:i});if(!l||!l?.headers)throw new Error("Server did not return an HttpResponse or the returned HttpResponse did not have headers.");const u=(n=l?.headers)===null||n===void 0?void 0:n["x-goog-upload-url"];if(u===void 0)throw new Error("Failed to get upload url. Server did not return the x-google-upload-url in the headers");return u}}async function Au(o){var e;if(o===void 0)throw new Cu("response is undefined");if(!o.ok){const t=o.status,n=o.statusText;let i;!((e=o.headers.get("content-type"))===null||e===void 0)&&e.includes("application/json")?i=await o.json():i={error:{message:"exception parsing response",code:o.status,status:o.statusText}};const s=`got status: ${t} ${n}. ${JSON.stringify(i)}`;throw t>=400&&t<500?new $v(s):t>=500&&t<600?new Cu(s):new Error(s)}}const Yv=1024*1024*8;async function Kv(o,e,t){var n,i;let s=0,l=0,u=new Ys(new Response),c="upload";for(s=o.size;l<s;){const _=Math.min(Yv,s-l),v=o.slice(l,l+_);if(l+_>=s&&(c+=", finalize"),u=await t.request({path:"",body:v,httpMethod:"POST",httpOptions:{apiVersion:"",baseUrl:e,headers:{"X-Goog-Upload-Command":c,"X-Goog-Upload-Offset":String(l),"Content-Length":String(_)}}}),l+=_,((n=u?.headers)===null||n===void 0?void 0:n["x-goog-upload-status"])!=="active")break;if(s<=l)throw new Error("All content has been uploaded, but the upload status is not finalized.")}const m=await u?.json();if(((i=u?.headers)===null||i===void 0?void 0:i["x-goog-upload-status"])!=="final")throw new Error("Failed to upload file: Upload status is not finalized.");return m.file}async function Zv(o){return{size:o.size,type:o.type}}class Jv{async upload(e,t,n){if(typeof e=="string")throw new Error("File path is not supported in browser uploader.");return await Kv(e,t,n)}async stat(e){if(typeof e=="string")throw new Error("File path is not supported in browser uploader.");return await Zv(e)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Qv{create(e,t,n){return new jv(e,t,n)}}class jv{constructor(e,t,n){this.url=e,this.headers=t,this.callbacks=n}connect(){this.ws=new WebSocket(this.url),this.ws.onopen=this.callbacks.onopen,this.ws.onerror=this.callbacks.onerror,this.ws.onclose=this.callbacks.onclose,this.ws.onmessage=this.callbacks.onmessage}send(e){if(this.ws===void 0)throw new Error("WebSocket is not connected");this.ws.send(e)}close(){if(this.ws===void 0)throw new Error("WebSocket is not connected");this.ws.close()}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const wu="x-goog-api-key";class ey{constructor(e){this.apiKey=e}async addAuthHeaders(e){e.get(wu)===null&&e.append(wu,this.apiKey)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ty="gl-node/";class ny{constructor(e){var t;if(e.apiKey==null)throw new Error("An API Key must be set when running in a browser");if(e.project||e.location)throw new Error("Vertex AI project based authentication is not supported on browser runtimes. Please do not provide a project or location.");this.vertexai=(t=e.vertexai)!==null&&t!==void 0?t:!1,this.apiKey=e.apiKey,this.apiVersion=e.apiVersion;const n=new ey(this.apiKey);this.apiClient=new Xv({auth:n,apiVersion:this.apiVersion,apiKey:this.apiKey,vertexai:this.vertexai,httpOptions:e.httpOptions,userAgentExtra:ty+"web",uploader:new Jv}),this.models=new Av(this.apiClient),this.live=new Ev(this.apiClient,n,new Qv),this.chats=new Rm(this.models,this.apiClient),this.caches=new Mm(this.apiClient),this.files=new Gm(this.apiClient),this.operations=new Bv(this.apiClient)}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vr=globalThis,Ga=Vr.ShadowRoot&&(Vr.ShadyCSS===void 0||Vr.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ha=Symbol(),Ru=new WeakMap;let Kc=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==Ha)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Ga&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=Ru.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Ru.set(t,e))}return e}toString(){return this.cssText}};const iy=o=>new Kc(typeof o=="string"?o:o+"",void 0,Ha),za=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((n,i,s)=>n+(l=>{if(l._$cssResult$===!0)return l.cssText;if(typeof l=="number")return l;throw Error("Value passed to 'css' function must be a 'css' function result: "+l+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[s+1],o[0]);return new Kc(t,o,Ha)},oy=(o,e)=>{if(Ga)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const n=document.createElement("style"),i=Vr.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=t.cssText,o.appendChild(n)}},Iu=Ga?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return iy(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ry,defineProperty:sy,getOwnPropertyDescriptor:ay,getOwnPropertyNames:ly,getOwnPropertySymbols:uy,getPrototypeOf:cy}=Object,Ci=globalThis,Pu=Ci.trustedTypes,fy=Pu?Pu.emptyScript:"",dy=Ci.reactiveElementPolyfillSupport,Vo=(o,e)=>o,Kr={toAttribute(o,e){switch(e){case Boolean:o=o?fy:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},Wa=(o,e)=>!ry(o,e),Du={attribute:!0,type:String,converter:Kr,reflect:!1,useDefault:!1,hasChanged:Wa};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Ci.litPropertyMetadata??(Ci.litPropertyMetadata=new WeakMap);let ho=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Du){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),i=this.getPropertyDescriptor(e,n,t);i!==void 0&&sy(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){const{get:i,set:s}=ay(this.prototype,e)??{get(){return this[t]},set(l){this[t]=l}};return{get:i,set(l){const u=i?.call(this);s?.call(this,l),this.requestUpdate(e,u,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Du}static _$Ei(){if(this.hasOwnProperty(Vo("elementProperties")))return;const e=cy(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Vo("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Vo("properties"))){const t=this.properties,n=[...ly(t),...uy(t)];for(const i of n)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[n,i]of t)this.elementProperties.set(n,i)}this._$Eh=new Map;for(const[t,n]of this.elementProperties){const i=this._$Eu(t,n);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)t.unshift(Iu(i))}else e!==void 0&&t.push(Iu(e));return t}static _$Eu(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return oy(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){const s=(n.converter?.toAttribute!==void 0?n.converter:Kr).toAttribute(t,n.type);this._$Em=e,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){const n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const s=n.getPropertyOptions(i),l=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Kr;this._$Em=i,this[i]=l.fromAttribute(t,s.type)??this._$Ej?.get(i)??null,this._$Em=null}}requestUpdate(e,t,n){if(e!==void 0){const i=this.constructor,s=this[e];if(n??(n=i.getPropertyOptions(e)),!((n.hasChanged??Wa)(s,t)||n.useDefault&&n.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:s},l){n&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,l??t??this[e]),s!==!0||l!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}const n=this.constructor.elementProperties;if(n.size>0)for(const[i,s]of n){const{wrapped:l}=s,u=this[i];l!==!0||this._$AL.has(i)||u===void 0||this.C(i,void 0,s,u)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};ho.elementStyles=[],ho.shadowRootOptions={mode:"open"},ho[Vo("elementProperties")]=new Map,ho[Vo("finalized")]=new Map,dy?.({ReactiveElement:ho}),(Ci.reactiveElementVersions??(Ci.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Oo=globalThis,Zr=Oo.trustedTypes,bu=Zr?Zr.createPolicy("lit-html",{createHTML:o=>o}):void 0,Zc="$lit$",Si=`lit$${Math.random().toFixed(9).slice(2)}$`,Jc="?"+Si,hy=`<${Jc}>`,$i=document,zo=()=>$i.createComment(""),Wo=o=>o===null||typeof o!="object"&&typeof o!="function",qa=Array.isArray,py=o=>qa(o)||typeof o?.[Symbol.iterator]=="function",ds=`[ 	
\f\r]`,Do=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Uu=/-->/g,Nu=/>/g,Ui=RegExp(`>|${ds}(?:([^\\s"'>=/]+)(${ds}*=${ds}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Lu=/'/g,Fu=/"/g,Qc=/^(?:script|style|textarea|title)$/i,my=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),po=my(1),yo=Symbol.for("lit-noChange"),Jt=Symbol.for("lit-nothing"),Bu=new WeakMap,Wi=$i.createTreeWalker($i,129);function jc(o,e){if(!qa(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return bu!==void 0?bu.createHTML(e):e}const gy=(o,e)=>{const t=o.length-1,n=[];let i,s=e===2?"<svg>":e===3?"<math>":"",l=Do;for(let u=0;u<t;u++){const c=o[u];let m,_,v=-1,y=0;for(;y<c.length&&(l.lastIndex=y,_=l.exec(c),_!==null);)y=l.lastIndex,l===Do?_[1]==="!--"?l=Uu:_[1]!==void 0?l=Nu:_[2]!==void 0?(Qc.test(_[2])&&(i=RegExp("</"+_[2],"g")),l=Ui):_[3]!==void 0&&(l=Ui):l===Ui?_[0]===">"?(l=i??Do,v=-1):_[1]===void 0?v=-2:(v=l.lastIndex-_[2].length,m=_[1],l=_[3]===void 0?Ui:_[3]==='"'?Fu:Lu):l===Fu||l===Lu?l=Ui:l===Uu||l===Nu?l=Do:(l=Ui,i=void 0);const T=l===Ui&&o[u+1].startsWith("/>")?" ":"";s+=l===Do?c+hy:v>=0?(n.push(m),c.slice(0,v)+Zc+c.slice(v)+Si+T):c+Si+(v===-2?u:T)}return[jc(o,s+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class qo{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let s=0,l=0;const u=e.length-1,c=this.parts,[m,_]=gy(e,t);if(this.el=qo.createElement(m,n),Wi.currentNode=this.el.content,t===2||t===3){const v=this.el.content.firstChild;v.replaceWith(...v.childNodes)}for(;(i=Wi.nextNode())!==null&&c.length<u;){if(i.nodeType===1){if(i.hasAttributes())for(const v of i.getAttributeNames())if(v.endsWith(Zc)){const y=_[l++],T=i.getAttribute(v).split(Si),w=/([.?@])?(.*)/.exec(y);c.push({type:1,index:s,name:w[2],strings:T,ctor:w[1]==="."?vy:w[1]==="?"?yy:w[1]==="@"?xy:as}),i.removeAttribute(v)}else v.startsWith(Si)&&(c.push({type:6,index:s}),i.removeAttribute(v));if(Qc.test(i.tagName)){const v=i.textContent.split(Si),y=v.length-1;if(y>0){i.textContent=Zr?Zr.emptyScript:"";for(let T=0;T<y;T++)i.append(v[T],zo()),Wi.nextNode(),c.push({type:2,index:++s});i.append(v[y],zo())}}}else if(i.nodeType===8)if(i.data===Jc)c.push({type:2,index:s});else{let v=-1;for(;(v=i.data.indexOf(Si,v+1))!==-1;)c.push({type:7,index:s}),v+=Si.length-1}s++}}static createElement(e,t){const n=$i.createElement("template");return n.innerHTML=e,n}}function xo(o,e,t=o,n){if(e===yo)return e;let i=n!==void 0?t._$Co?.[n]:t._$Cl;const s=Wo(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(o),i._$AT(o,t,n)),n!==void 0?(t._$Co??(t._$Co=[]))[n]=i:t._$Cl=i),i!==void 0&&(e=xo(o,i._$AS(o,e.values),i,n)),e}class _y{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??$i).importNode(t,!0);Wi.currentNode=i;let s=Wi.nextNode(),l=0,u=0,c=n[0];for(;c!==void 0;){if(l===c.index){let m;c.type===2?m=new Qo(s,s.nextSibling,this,e):c.type===1?m=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(m=new Ey(s,this,e)),this._$AV.push(m),c=n[++u]}l!==c?.index&&(s=Wi.nextNode(),l++)}return Wi.currentNode=$i,i}p(e){let t=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class Qo{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=Jt,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=xo(this,e,t),Wo(e)?e===Jt||e==null||e===""?(this._$AH!==Jt&&this._$AR(),this._$AH=Jt):e!==this._$AH&&e!==yo&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):py(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Jt&&Wo(this._$AH)?this._$AA.nextSibling.data=e:this.T($i.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=qo.createElement(jc(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{const s=new _y(i,this),l=s.u(this.options);s.p(t),this.T(l),this._$AH=s}}_$AC(e){let t=Bu.get(e.strings);return t===void 0&&Bu.set(e.strings,t=new qo(e)),t}k(e){qa(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const s of e)i===t.length?t.push(n=new Qo(this.O(zo()),this.O(zo()),this,this.options)):n=t[i],n._$AI(s),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class as{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,s){this.type=1,this._$AH=Jt,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Jt}_$AI(e,t=this,n,i){const s=this.strings;let l=!1;if(s===void 0)e=xo(this,e,t,0),l=!Wo(e)||e!==this._$AH&&e!==yo,l&&(this._$AH=e);else{const u=e;let c,m;for(e=s[0],c=0;c<s.length-1;c++)m=xo(this,u[n+c],t,c),m===yo&&(m=this._$AH[c]),l||(l=!Wo(m)||m!==this._$AH[c]),m===Jt?e=Jt:e!==Jt&&(e+=(m??"")+s[c+1]),this._$AH[c]=m}l&&!i&&this.j(e)}j(e){e===Jt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class vy extends as{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Jt?void 0:e}}class yy extends as{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Jt)}}class xy extends as{constructor(e,t,n,i,s){super(e,t,n,i,s),this.type=5}_$AI(e,t=this){if((e=xo(this,e,t,0)??Jt)===yo)return;const n=this._$AH,i=e===Jt&&n!==Jt||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==Jt&&(n===Jt||i);i&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Ey{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){xo(this,e)}}const Ty=Oo.litHtmlPolyfillSupport;Ty?.(qo,Qo),(Oo.litHtmlVersions??(Oo.litHtmlVersions=[])).push("3.3.0");const Sy=(o,e,t)=>{const n=t?.renderBefore??e;let i=n._$litPart$;if(i===void 0){const s=t?.renderBefore??null;n._$litPart$=i=new Qo(e.insertBefore(zo(),s),s,void 0,t??{})}return i._$AI(o),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ko=globalThis;let qi=class extends ho{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Sy(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return yo}};qi._$litElement$=!0,qi.finalized=!0,ko.litElementHydrateSupport?.({LitElement:qi});const My=ko.litElementPolyfillSupport;My?.({LitElement:qi});(ko.litElementVersions??(ko.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $a=o=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Cy={attribute:!0,type:String,converter:Kr,reflect:!1,hasChanged:Wa},Ay=(o=Cy,e,t)=>{const{kind:n,metadata:i}=t;let s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),n==="setter"&&((o=Object.create(o)).wrapped=!0),s.set(t.name,o),n==="accessor"){const{name:l}=t;return{set(u){const c=e.get.call(this);e.set.call(this,u),this.requestUpdate(l,c,o)},init(u){return u!==void 0&&this.C(l,void 0,o,u),u}}}if(n==="setter"){const{name:l}=t;return function(u){const c=this[l];e.call(this,u),this.requestUpdate(l,c,o)}}throw Error("Unsupported decorator location: "+n)};function jo(o){return(e,t)=>typeof t=="object"?Ay(o,e,t):((n,i,s)=>{const l=i.hasOwnProperty(s);return i.constructor.createProperty(s,n),l?Object.getOwnPropertyDescriptor(i,s):void 0})(o,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Hn(o){return jo({...o,state:!0,attribute:!1})}/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/function wy(o){let e="";const t=o.byteLength;for(let n=0;n<t;n++)e+=String.fromCharCode(o[n]);return btoa(e)}function Ry(o){const e=atob(o),t=e.length,n=new Uint8Array(t);for(let i=0;i<t;i++)n[i]=e.charCodeAt(i);return n}function Iy(o){const e=o.length,t=new Int16Array(e);for(let n=0;n<e;n++)t[n]=o[n]*32768;return{data:wy(new Uint8Array(t.buffer)),mimeType:"audio/pcm;rate=16000"}}async function Py(o,e,t,n){const i=e.createBuffer(n,o.length/2/n,t),s=new Int16Array(o.buffer,o.byteOffset,o.length/2),l=new Float32Array(s.length);for(let u=0;u<s.length;u++)l[u]=s[u]/32768;for(let u=0;u<n;u++){const c=new Float32Array(i.length);for(let m=0;m<i.length;m++)c[m]=l[m*n+u];i.copyToChannel(c,u)}return i}/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/class Jr{constructor(e){this.bufferLength=0,this.analyser=e.context.createAnalyser(),this.analyser.fftSize=32,this.bufferLength=this.analyser.frequencyBinCount,this.dataArray=new Uint8Array(this.bufferLength),e.connect(this.analyser)}update(){this.analyser.getByteFrequencyData(this.dataArray)}get data(){return this.dataArray}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xa="176",Dy=0,Vu=1,by=2,ef=1,Uy=2,ei=3,wi=0,cn=1,ti=2,si=0,_o=1,Js=2,Ou=3,ku=4,Ny=5,Hi=100,Ly=101,Fy=102,By=103,Vy=104,Oy=200,ky=201,Gy=202,Hy=203,Qs=204,js=205,zy=206,Wy=207,qy=208,$y=209,Xy=210,Yy=211,Ky=212,Zy=213,Jy=214,ea=0,ta=1,na=2,Eo=3,ia=4,oa=5,ra=6,sa=7,tf=0,Qy=1,jy=2,Ai=0,e0=1,t0=2,n0=3,i0=4,o0=5,r0=6,s0=7,nf=300,To=301,So=302,Qr=303,aa=304,ls=306,la=1e3,oi=1001,ua=1002,Tn=1003,a0=1004,dr=1005,ln=1006,hs=1007,Mi=1008,li=1009,of=1010,rf=1011,$o=1012,Ya=1013,Xi=1014,Rn=1015,En=1016,Ka=1017,Za=1018,Xo=1020,sf=35902,af=1021,lf=1022,In=1023,Yo=1026,Ko=1027,Ja=1028,Qa=1029,uf=1030,ja=1031,el=1033,Or=33776,kr=33777,Gr=33778,Hr=33779,ca=35840,fa=35841,da=35842,ha=35843,pa=36196,ma=37492,ga=37496,_a=37808,va=37809,ya=37810,xa=37811,Ea=37812,Ta=37813,Sa=37814,Ma=37815,Ca=37816,Aa=37817,wa=37818,Ra=37819,Ia=37820,Pa=37821,zr=36492,Da=36494,ba=36495,cf=36283,Ua=36284,Na=36285,La=36286,l0=3200,u0=3201,ff=0,c0=1,ni="",Cn="srgb",Ri="srgb-linear",jr="linear",Lt="srgb",Qi=7680,Gu=519,f0=512,d0=513,h0=514,df=515,p0=516,m0=517,g0=518,_0=519,Hu=35044,Fa="300 es",ri=2e3,es=2001;class wo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,l=i.length;s<l;s++)i[s].call(this,e);e.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ps=Math.PI/180,Ba=180/Math.PI;function er(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[o&255]+en[o>>8&255]+en[o>>16&255]+en[o>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function xt(o,e,t){return Math.max(e,Math.min(t,o))}function v0(o,e){return(o%e+e)%e}function ms(o,e,t){return(1-t)*o+t*e}function bo(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function gn(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}class ct{constructor(e=0,t=0){ct.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,l=this.y-e.y;return this.x=s*n-l*i+e.x,this.y=s*i+l*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class dt{constructor(e,t,n,i,s,l,u,c,m){dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,l,u,c,m)}set(e,t,n,i,s,l,u,c,m){const _=this.elements;return _[0]=e,_[1]=i,_[2]=u,_[3]=t,_[4]=s,_[5]=c,_[6]=n,_[7]=l,_[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,l=n[0],u=n[3],c=n[6],m=n[1],_=n[4],v=n[7],y=n[2],T=n[5],w=n[8],P=i[0],C=i[3],E=i[6],O=i[1],N=i[4],b=i[7],X=i[2],q=i[5],W=i[8];return s[0]=l*P+u*O+c*X,s[3]=l*C+u*N+c*q,s[6]=l*E+u*b+c*W,s[1]=m*P+_*O+v*X,s[4]=m*C+_*N+v*q,s[7]=m*E+_*b+v*W,s[2]=y*P+T*O+w*X,s[5]=y*C+T*N+w*q,s[8]=y*E+T*b+w*W,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],l=e[4],u=e[5],c=e[6],m=e[7],_=e[8];return t*l*_-t*u*m-n*s*_+n*u*c+i*s*m-i*l*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],l=e[4],u=e[5],c=e[6],m=e[7],_=e[8],v=_*l-u*m,y=u*c-_*s,T=m*s-l*c,w=t*v+n*y+i*T;if(w===0)return this.set(0,0,0,0,0,0,0,0,0);const P=1/w;return e[0]=v*P,e[1]=(i*m-_*n)*P,e[2]=(u*n-i*l)*P,e[3]=y*P,e[4]=(_*t-i*c)*P,e[5]=(i*s-u*t)*P,e[6]=T*P,e[7]=(n*c-m*t)*P,e[8]=(l*t-n*s)*P,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,l,u){const c=Math.cos(s),m=Math.sin(s);return this.set(n*c,n*m,-n*(c*l+m*u)+l+e,-i*m,i*c,-i*(-m*l+c*u)+u+t,0,0,1),this}scale(e,t){return this.premultiply(gs.makeScale(e,t)),this}rotate(e){return this.premultiply(gs.makeRotation(-e)),this}translate(e,t){return this.premultiply(gs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const gs=new dt;function hf(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function ts(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function y0(){const o=ts("canvas");return o.style.display="block",o}const zu={};function Wr(o){o in zu||(zu[o]=!0,console.warn(o))}function x0(o,e,t){return new Promise(function(n,i){function s(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:i();break;case o.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function E0(o){const e=o.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function T0(o){const e=o.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Wu=new dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qu=new dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function S0(){const o={enabled:!0,workingColorSpace:Ri,spaces:{},convert:function(i,s,l){return this.enabled===!1||s===l||!s||!l||(this.spaces[s].transfer===Lt&&(i.r=ai(i.r),i.g=ai(i.g),i.b=ai(i.b)),this.spaces[s].primaries!==this.spaces[l].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[l].fromXYZ)),this.spaces[l].transfer===Lt&&(i.r=vo(i.r),i.g=vo(i.g),i.b=vo(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ni?jr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,l){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[l].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return o.define({[Ri]:{primaries:e,whitePoint:n,transfer:jr,toXYZ:Wu,fromXYZ:qu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Cn},outputColorSpaceConfig:{drawingBufferColorSpace:Cn}},[Cn]:{primaries:e,whitePoint:n,transfer:Lt,toXYZ:Wu,fromXYZ:qu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Cn}}}),o}const Rt=S0();function ai(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function vo(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let ji;class M0{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ji===void 0&&(ji=ts("canvas")),ji.width=e.width,ji.height=e.height;const i=ji.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ji}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ts("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let l=0;l<s.length;l++)s[l]=ai(s[l]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ai(t[n]/255)*255):t[n]=ai(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let C0=0;class tl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:C0++}),this.uuid=er(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let l=0,u=i.length;l<u;l++)i[l].isDataTexture?s.push(_s(i[l].image)):s.push(_s(i[l]))}else s=_s(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function _s(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?M0.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let A0=0;class fn extends wo{constructor(e=fn.DEFAULT_IMAGE,t=fn.DEFAULT_MAPPING,n=oi,i=oi,s=ln,l=Mi,u=In,c=li,m=fn.DEFAULT_ANISOTROPY,_=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:A0++}),this.uuid=er(),this.name="",this.source=new tl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=l,this.anisotropy=m,this.format=u,this.internalFormat=null,this.type=c,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isTextureArray=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isTextureArray=e.isTextureArray,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case la:e.x=e.x-Math.floor(e.x);break;case oi:e.x=e.x<0?0:1;break;case ua:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case la:e.y=e.y-Math.floor(e.y);break;case oi:e.y=e.y<0?0:1;break;case ua:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=nf;fn.DEFAULT_ANISOTROPY=1;class Vt{constructor(e=0,t=0,n=0,i=1){Vt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,l=e.elements;return this.x=l[0]*t+l[4]*n+l[8]*i+l[12]*s,this.y=l[1]*t+l[5]*n+l[9]*i+l[13]*s,this.z=l[2]*t+l[6]*n+l[10]*i+l[14]*s,this.w=l[3]*t+l[7]*n+l[11]*i+l[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const c=e.elements,m=c[0],_=c[4],v=c[8],y=c[1],T=c[5],w=c[9],P=c[2],C=c[6],E=c[10];if(Math.abs(_-y)<.01&&Math.abs(v-P)<.01&&Math.abs(w-C)<.01){if(Math.abs(_+y)<.1&&Math.abs(v+P)<.1&&Math.abs(w+C)<.1&&Math.abs(m+T+E-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const N=(m+1)/2,b=(T+1)/2,X=(E+1)/2,q=(_+y)/4,W=(v+P)/4,K=(w+C)/4;return N>b&&N>X?N<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(N),i=q/n,s=W/n):b>X?b<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(b),n=q/i,s=K/i):X<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(X),n=W/s,i=K/s),this.set(n,i,s,t),this}let O=Math.sqrt((C-w)*(C-w)+(v-P)*(v-P)+(y-_)*(y-_));return Math.abs(O)<.001&&(O=1),this.x=(C-w)/O,this.y=(v-P)/O,this.z=(y-_)/O,this.w=Math.acos((m+T+E-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this.w=xt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this.w=xt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class w0 extends wo{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth?n.depth:1,this.scissor=new Vt(0,0,e,t),this.scissorTest=!1,this.viewport=new Vt(0,0,e,t);const i={width:e,height:t,depth:this.depth};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,multiview:!1},n);const s=new fn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const l=n.count;for(let u=0;u<l;u++)this.textures[u]=s.clone(),this.textures[u].isRenderTargetTexture=!0,this.textures[u].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new tl(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class kn extends w0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class pf extends fn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class R0 extends fn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Tn,this.minFilter=Tn,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ro{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,l,u){let c=n[i+0],m=n[i+1],_=n[i+2],v=n[i+3];const y=s[l+0],T=s[l+1],w=s[l+2],P=s[l+3];if(u===0){e[t+0]=c,e[t+1]=m,e[t+2]=_,e[t+3]=v;return}if(u===1){e[t+0]=y,e[t+1]=T,e[t+2]=w,e[t+3]=P;return}if(v!==P||c!==y||m!==T||_!==w){let C=1-u;const E=c*y+m*T+_*w+v*P,O=E>=0?1:-1,N=1-E*E;if(N>Number.EPSILON){const X=Math.sqrt(N),q=Math.atan2(X,E*O);C=Math.sin(C*q)/X,u=Math.sin(u*q)/X}const b=u*O;if(c=c*C+y*b,m=m*C+T*b,_=_*C+w*b,v=v*C+P*b,C===1-u){const X=1/Math.sqrt(c*c+m*m+_*_+v*v);c*=X,m*=X,_*=X,v*=X}}e[t]=c,e[t+1]=m,e[t+2]=_,e[t+3]=v}static multiplyQuaternionsFlat(e,t,n,i,s,l){const u=n[i],c=n[i+1],m=n[i+2],_=n[i+3],v=s[l],y=s[l+1],T=s[l+2],w=s[l+3];return e[t]=u*w+_*v+c*T-m*y,e[t+1]=c*w+_*y+m*v-u*T,e[t+2]=m*w+_*T+u*y-c*v,e[t+3]=_*w-u*v-c*y-m*T,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,l=e._order,u=Math.cos,c=Math.sin,m=u(n/2),_=u(i/2),v=u(s/2),y=c(n/2),T=c(i/2),w=c(s/2);switch(l){case"XYZ":this._x=y*_*v+m*T*w,this._y=m*T*v-y*_*w,this._z=m*_*w+y*T*v,this._w=m*_*v-y*T*w;break;case"YXZ":this._x=y*_*v+m*T*w,this._y=m*T*v-y*_*w,this._z=m*_*w-y*T*v,this._w=m*_*v+y*T*w;break;case"ZXY":this._x=y*_*v-m*T*w,this._y=m*T*v+y*_*w,this._z=m*_*w+y*T*v,this._w=m*_*v-y*T*w;break;case"ZYX":this._x=y*_*v-m*T*w,this._y=m*T*v+y*_*w,this._z=m*_*w-y*T*v,this._w=m*_*v+y*T*w;break;case"YZX":this._x=y*_*v+m*T*w,this._y=m*T*v+y*_*w,this._z=m*_*w-y*T*v,this._w=m*_*v-y*T*w;break;case"XZY":this._x=y*_*v-m*T*w,this._y=m*T*v-y*_*w,this._z=m*_*w+y*T*v,this._w=m*_*v+y*T*w;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],l=t[1],u=t[5],c=t[9],m=t[2],_=t[6],v=t[10],y=n+u+v;if(y>0){const T=.5/Math.sqrt(y+1);this._w=.25/T,this._x=(_-c)*T,this._y=(s-m)*T,this._z=(l-i)*T}else if(n>u&&n>v){const T=2*Math.sqrt(1+n-u-v);this._w=(_-c)/T,this._x=.25*T,this._y=(i+l)/T,this._z=(s+m)/T}else if(u>v){const T=2*Math.sqrt(1+u-n-v);this._w=(s-m)/T,this._x=(i+l)/T,this._y=.25*T,this._z=(c+_)/T}else{const T=2*Math.sqrt(1+v-n-u);this._w=(l-i)/T,this._x=(s+m)/T,this._y=(c+_)/T,this._z=.25*T}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,l=e._w,u=t._x,c=t._y,m=t._z,_=t._w;return this._x=n*_+l*u+i*m-s*c,this._y=i*_+l*c+s*u-n*m,this._z=s*_+l*m+n*c-i*u,this._w=l*_-n*u-i*c-s*m,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,l=this._w;let u=l*e._w+n*e._x+i*e._y+s*e._z;if(u<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,u=-u):this.copy(e),u>=1)return this._w=l,this._x=n,this._y=i,this._z=s,this;const c=1-u*u;if(c<=Number.EPSILON){const T=1-t;return this._w=T*l+t*this._w,this._x=T*n+t*this._x,this._y=T*i+t*this._y,this._z=T*s+t*this._z,this.normalize(),this}const m=Math.sqrt(c),_=Math.atan2(m,u),v=Math.sin((1-t)*_)/m,y=Math.sin(t*_)/m;return this._w=l*v+this._w*y,this._x=n*v+this._x*y,this._y=i*v+this._y*y,this._z=s*v+this._z*y,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ie{constructor(e=0,t=0,n=0){ie.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion($u.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion($u.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,l=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*l,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*l,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*l,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,l=e.y,u=e.z,c=e.w,m=2*(l*i-u*n),_=2*(u*t-s*i),v=2*(s*n-l*t);return this.x=t+c*m+l*v-u*_,this.y=n+c*_+u*m-s*v,this.z=i+c*v+s*_-l*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,l=t.x,u=t.y,c=t.z;return this.x=i*c-s*u,this.y=s*l-n*c,this.z=n*u-i*l,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return vs.copy(this).projectOnVector(e),this.sub(vs)}reflect(e){return this.sub(vs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const vs=new ie,$u=new Ro;class tr{constructor(e=new ie(1/0,1/0,1/0),t=new ie(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let l=0,u=s.count;l<u;l++)e.isMesh===!0?e.getVertexPosition(l,Nn):Nn.fromBufferAttribute(s,l),Nn.applyMatrix4(e.matrixWorld),this.expandByPoint(Nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),hr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),hr.copy(n.boundingBox)),hr.applyMatrix4(e.matrixWorld),this.union(hr)}const i=e.children;for(let s=0,l=i.length;s<l;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Nn),Nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Uo),pr.subVectors(this.max,Uo),eo.subVectors(e.a,Uo),to.subVectors(e.b,Uo),no.subVectors(e.c,Uo),gi.subVectors(to,eo),_i.subVectors(no,to),Ni.subVectors(eo,no);let t=[0,-gi.z,gi.y,0,-_i.z,_i.y,0,-Ni.z,Ni.y,gi.z,0,-gi.x,_i.z,0,-_i.x,Ni.z,0,-Ni.x,-gi.y,gi.x,0,-_i.y,_i.x,0,-Ni.y,Ni.x,0];return!ys(t,eo,to,no,pr)||(t=[1,0,0,0,1,0,0,0,1],!ys(t,eo,to,no,pr))?!1:(mr.crossVectors(gi,_i),t=[mr.x,mr.y,mr.z],ys(t,eo,to,no,pr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Yn=[new ie,new ie,new ie,new ie,new ie,new ie,new ie,new ie],Nn=new ie,hr=new tr,eo=new ie,to=new ie,no=new ie,gi=new ie,_i=new ie,Ni=new ie,Uo=new ie,pr=new ie,mr=new ie,Li=new ie;function ys(o,e,t,n,i){for(let s=0,l=o.length-3;s<=l;s+=3){Li.fromArray(o,s);const u=i.x*Math.abs(Li.x)+i.y*Math.abs(Li.y)+i.z*Math.abs(Li.z),c=e.dot(Li),m=t.dot(Li),_=n.dot(Li);if(Math.max(-Math.max(c,m,_),Math.min(c,m,_))>u)return!1}return!0}const I0=new tr,No=new ie,xs=new ie;class nl{constructor(e=new ie,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):I0.setFromPoints(e).getCenter(n);let i=0;for(let s=0,l=e.length;s<l;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;No.subVectors(e,this.center);const t=No.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(No,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(No.copy(e.center).add(xs)),this.expandByPoint(No.copy(e.center).sub(xs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Kn=new ie,Es=new ie,gr=new ie,vi=new ie,Ts=new ie,_r=new ie,Ss=new ie;class P0{constructor(e=new ie,t=new ie(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Kn.copy(this.origin).addScaledVector(this.direction,t),Kn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Es.copy(e).add(t).multiplyScalar(.5),gr.copy(t).sub(e).normalize(),vi.copy(this.origin).sub(Es);const s=e.distanceTo(t)*.5,l=-this.direction.dot(gr),u=vi.dot(this.direction),c=-vi.dot(gr),m=vi.lengthSq(),_=Math.abs(1-l*l);let v,y,T,w;if(_>0)if(v=l*c-u,y=l*u-c,w=s*_,v>=0)if(y>=-w)if(y<=w){const P=1/_;v*=P,y*=P,T=v*(v+l*y+2*u)+y*(l*v+y+2*c)+m}else y=s,v=Math.max(0,-(l*y+u)),T=-v*v+y*(y+2*c)+m;else y=-s,v=Math.max(0,-(l*y+u)),T=-v*v+y*(y+2*c)+m;else y<=-w?(v=Math.max(0,-(-l*s+u)),y=v>0?-s:Math.min(Math.max(-s,-c),s),T=-v*v+y*(y+2*c)+m):y<=w?(v=0,y=Math.min(Math.max(-s,-c),s),T=y*(y+2*c)+m):(v=Math.max(0,-(l*s+u)),y=v>0?s:Math.min(Math.max(-s,-c),s),T=-v*v+y*(y+2*c)+m);else y=l>0?-s:s,v=Math.max(0,-(l*y+u)),T=-v*v+y*(y+2*c)+m;return n&&n.copy(this.origin).addScaledVector(this.direction,v),i&&i.copy(Es).addScaledVector(gr,y),T}intersectSphere(e,t){Kn.subVectors(e.center,this.origin);const n=Kn.dot(this.direction),i=Kn.dot(Kn)-n*n,s=e.radius*e.radius;if(i>s)return null;const l=Math.sqrt(s-i),u=n-l,c=n+l;return c<0?null:u<0?this.at(c,t):this.at(u,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,l,u,c;const m=1/this.direction.x,_=1/this.direction.y,v=1/this.direction.z,y=this.origin;return m>=0?(n=(e.min.x-y.x)*m,i=(e.max.x-y.x)*m):(n=(e.max.x-y.x)*m,i=(e.min.x-y.x)*m),_>=0?(s=(e.min.y-y.y)*_,l=(e.max.y-y.y)*_):(s=(e.max.y-y.y)*_,l=(e.min.y-y.y)*_),n>l||s>i||((s>n||isNaN(n))&&(n=s),(l<i||isNaN(i))&&(i=l),v>=0?(u=(e.min.z-y.z)*v,c=(e.max.z-y.z)*v):(u=(e.max.z-y.z)*v,c=(e.min.z-y.z)*v),n>c||u>i)||((u>n||n!==n)&&(n=u),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Kn)!==null}intersectTriangle(e,t,n,i,s){Ts.subVectors(t,e),_r.subVectors(n,e),Ss.crossVectors(Ts,_r);let l=this.direction.dot(Ss),u;if(l>0){if(i)return null;u=1}else if(l<0)u=-1,l=-l;else return null;vi.subVectors(this.origin,e);const c=u*this.direction.dot(_r.crossVectors(vi,_r));if(c<0)return null;const m=u*this.direction.dot(Ts.cross(vi));if(m<0||c+m>l)return null;const _=-u*vi.dot(Ss);return _<0?null:this.at(_/l,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $t{constructor(e,t,n,i,s,l,u,c,m,_,v,y,T,w,P,C){$t.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,l,u,c,m,_,v,y,T,w,P,C)}set(e,t,n,i,s,l,u,c,m,_,v,y,T,w,P,C){const E=this.elements;return E[0]=e,E[4]=t,E[8]=n,E[12]=i,E[1]=s,E[5]=l,E[9]=u,E[13]=c,E[2]=m,E[6]=_,E[10]=v,E[14]=y,E[3]=T,E[7]=w,E[11]=P,E[15]=C,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $t().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/io.setFromMatrixColumn(e,0).length(),s=1/io.setFromMatrixColumn(e,1).length(),l=1/io.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*l,t[9]=n[9]*l,t[10]=n[10]*l,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,l=Math.cos(n),u=Math.sin(n),c=Math.cos(i),m=Math.sin(i),_=Math.cos(s),v=Math.sin(s);if(e.order==="XYZ"){const y=l*_,T=l*v,w=u*_,P=u*v;t[0]=c*_,t[4]=-c*v,t[8]=m,t[1]=T+w*m,t[5]=y-P*m,t[9]=-u*c,t[2]=P-y*m,t[6]=w+T*m,t[10]=l*c}else if(e.order==="YXZ"){const y=c*_,T=c*v,w=m*_,P=m*v;t[0]=y+P*u,t[4]=w*u-T,t[8]=l*m,t[1]=l*v,t[5]=l*_,t[9]=-u,t[2]=T*u-w,t[6]=P+y*u,t[10]=l*c}else if(e.order==="ZXY"){const y=c*_,T=c*v,w=m*_,P=m*v;t[0]=y-P*u,t[4]=-l*v,t[8]=w+T*u,t[1]=T+w*u,t[5]=l*_,t[9]=P-y*u,t[2]=-l*m,t[6]=u,t[10]=l*c}else if(e.order==="ZYX"){const y=l*_,T=l*v,w=u*_,P=u*v;t[0]=c*_,t[4]=w*m-T,t[8]=y*m+P,t[1]=c*v,t[5]=P*m+y,t[9]=T*m-w,t[2]=-m,t[6]=u*c,t[10]=l*c}else if(e.order==="YZX"){const y=l*c,T=l*m,w=u*c,P=u*m;t[0]=c*_,t[4]=P-y*v,t[8]=w*v+T,t[1]=v,t[5]=l*_,t[9]=-u*_,t[2]=-m*_,t[6]=T*v+w,t[10]=y-P*v}else if(e.order==="XZY"){const y=l*c,T=l*m,w=u*c,P=u*m;t[0]=c*_,t[4]=-v,t[8]=m*_,t[1]=y*v+P,t[5]=l*_,t[9]=T*v-w,t[2]=w*v-T,t[6]=u*_,t[10]=P*v+y}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(D0,e,b0)}lookAt(e,t,n){const i=this.elements;return yn.subVectors(e,t),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),yi.crossVectors(n,yn),yi.lengthSq()===0&&(Math.abs(n.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),yi.crossVectors(n,yn)),yi.normalize(),vr.crossVectors(yn,yi),i[0]=yi.x,i[4]=vr.x,i[8]=yn.x,i[1]=yi.y,i[5]=vr.y,i[9]=yn.y,i[2]=yi.z,i[6]=vr.z,i[10]=yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,l=n[0],u=n[4],c=n[8],m=n[12],_=n[1],v=n[5],y=n[9],T=n[13],w=n[2],P=n[6],C=n[10],E=n[14],O=n[3],N=n[7],b=n[11],X=n[15],q=i[0],W=i[4],K=i[8],B=i[12],D=i[1],$=i[5],ae=i[9],re=i[13],pe=i[2],xe=i[6],de=i[10],Ee=i[14],ue=i[3],Ie=i[7],Ue=i[11],We=i[15];return s[0]=l*q+u*D+c*pe+m*ue,s[4]=l*W+u*$+c*xe+m*Ie,s[8]=l*K+u*ae+c*de+m*Ue,s[12]=l*B+u*re+c*Ee+m*We,s[1]=_*q+v*D+y*pe+T*ue,s[5]=_*W+v*$+y*xe+T*Ie,s[9]=_*K+v*ae+y*de+T*Ue,s[13]=_*B+v*re+y*Ee+T*We,s[2]=w*q+P*D+C*pe+E*ue,s[6]=w*W+P*$+C*xe+E*Ie,s[10]=w*K+P*ae+C*de+E*Ue,s[14]=w*B+P*re+C*Ee+E*We,s[3]=O*q+N*D+b*pe+X*ue,s[7]=O*W+N*$+b*xe+X*Ie,s[11]=O*K+N*ae+b*de+X*Ue,s[15]=O*B+N*re+b*Ee+X*We,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],l=e[1],u=e[5],c=e[9],m=e[13],_=e[2],v=e[6],y=e[10],T=e[14],w=e[3],P=e[7],C=e[11],E=e[15];return w*(+s*c*v-i*m*v-s*u*y+n*m*y+i*u*T-n*c*T)+P*(+t*c*T-t*m*y+s*l*y-i*l*T+i*m*_-s*c*_)+C*(+t*m*v-t*u*T-s*l*v+n*l*T+s*u*_-n*m*_)+E*(-i*u*_-t*c*v+t*u*y+i*l*v-n*l*y+n*c*_)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],l=e[4],u=e[5],c=e[6],m=e[7],_=e[8],v=e[9],y=e[10],T=e[11],w=e[12],P=e[13],C=e[14],E=e[15],O=v*C*m-P*y*m+P*c*T-u*C*T-v*c*E+u*y*E,N=w*y*m-_*C*m-w*c*T+l*C*T+_*c*E-l*y*E,b=_*P*m-w*v*m+w*u*T-l*P*T-_*u*E+l*v*E,X=w*v*c-_*P*c-w*u*y+l*P*y+_*u*C-l*v*C,q=t*O+n*N+i*b+s*X;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const W=1/q;return e[0]=O*W,e[1]=(P*y*s-v*C*s-P*i*T+n*C*T+v*i*E-n*y*E)*W,e[2]=(u*C*s-P*c*s+P*i*m-n*C*m-u*i*E+n*c*E)*W,e[3]=(v*c*s-u*y*s-v*i*m+n*y*m+u*i*T-n*c*T)*W,e[4]=N*W,e[5]=(_*C*s-w*y*s+w*i*T-t*C*T-_*i*E+t*y*E)*W,e[6]=(w*c*s-l*C*s-w*i*m+t*C*m+l*i*E-t*c*E)*W,e[7]=(l*y*s-_*c*s+_*i*m-t*y*m-l*i*T+t*c*T)*W,e[8]=b*W,e[9]=(w*v*s-_*P*s-w*n*T+t*P*T+_*n*E-t*v*E)*W,e[10]=(l*P*s-w*u*s+w*n*m-t*P*m-l*n*E+t*u*E)*W,e[11]=(_*u*s-l*v*s-_*n*m+t*v*m+l*n*T-t*u*T)*W,e[12]=X*W,e[13]=(_*P*i-w*v*i+w*n*y-t*P*y-_*n*C+t*v*C)*W,e[14]=(w*u*i-l*P*i-w*n*c+t*P*c+l*n*C-t*u*C)*W,e[15]=(l*v*i-_*u*i+_*n*c-t*v*c-l*n*y+t*u*y)*W,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,l=e.x,u=e.y,c=e.z,m=s*l,_=s*u;return this.set(m*l+n,m*u-i*c,m*c+i*u,0,m*u+i*c,_*u+n,_*c-i*l,0,m*c-i*u,_*c+i*l,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,l){return this.set(1,n,s,0,e,1,l,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,l=t._y,u=t._z,c=t._w,m=s+s,_=l+l,v=u+u,y=s*m,T=s*_,w=s*v,P=l*_,C=l*v,E=u*v,O=c*m,N=c*_,b=c*v,X=n.x,q=n.y,W=n.z;return i[0]=(1-(P+E))*X,i[1]=(T+b)*X,i[2]=(w-N)*X,i[3]=0,i[4]=(T-b)*q,i[5]=(1-(y+E))*q,i[6]=(C+O)*q,i[7]=0,i[8]=(w+N)*W,i[9]=(C-O)*W,i[10]=(1-(y+P))*W,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=io.set(i[0],i[1],i[2]).length();const l=io.set(i[4],i[5],i[6]).length(),u=io.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Ln.copy(this);const m=1/s,_=1/l,v=1/u;return Ln.elements[0]*=m,Ln.elements[1]*=m,Ln.elements[2]*=m,Ln.elements[4]*=_,Ln.elements[5]*=_,Ln.elements[6]*=_,Ln.elements[8]*=v,Ln.elements[9]*=v,Ln.elements[10]*=v,t.setFromRotationMatrix(Ln),n.x=s,n.y=l,n.z=u,this}makePerspective(e,t,n,i,s,l,u=ri){const c=this.elements,m=2*s/(t-e),_=2*s/(n-i),v=(t+e)/(t-e),y=(n+i)/(n-i);let T,w;if(u===ri)T=-(l+s)/(l-s),w=-2*l*s/(l-s);else if(u===es)T=-l/(l-s),w=-l*s/(l-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+u);return c[0]=m,c[4]=0,c[8]=v,c[12]=0,c[1]=0,c[5]=_,c[9]=y,c[13]=0,c[2]=0,c[6]=0,c[10]=T,c[14]=w,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,l,u=ri){const c=this.elements,m=1/(t-e),_=1/(n-i),v=1/(l-s),y=(t+e)*m,T=(n+i)*_;let w,P;if(u===ri)w=(l+s)*v,P=-2*v;else if(u===es)w=s*v,P=-1*v;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+u);return c[0]=2*m,c[4]=0,c[8]=0,c[12]=-y,c[1]=0,c[5]=2*_,c[9]=0,c[13]=-T,c[2]=0,c[6]=0,c[10]=P,c[14]=-w,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const io=new ie,Ln=new $t,D0=new ie(0,0,0),b0=new ie(1,1,1),yi=new ie,vr=new ie,yn=new ie,Xu=new $t,Yu=new Ro;class Gn{constructor(e=0,t=0,n=0,i=Gn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],l=i[4],u=i[8],c=i[1],m=i[5],_=i[9],v=i[2],y=i[6],T=i[10];switch(t){case"XYZ":this._y=Math.asin(xt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-_,T),this._z=Math.atan2(-l,s)):(this._x=Math.atan2(y,m),this._z=0);break;case"YXZ":this._x=Math.asin(-xt(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(u,T),this._z=Math.atan2(c,m)):(this._y=Math.atan2(-v,s),this._z=0);break;case"ZXY":this._x=Math.asin(xt(y,-1,1)),Math.abs(y)<.9999999?(this._y=Math.atan2(-v,T),this._z=Math.atan2(-l,m)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-xt(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(y,T),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-l,m));break;case"YZX":this._z=Math.asin(xt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-_,m),this._y=Math.atan2(-v,s)):(this._x=0,this._y=Math.atan2(u,T));break;case"XZY":this._z=Math.asin(-xt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(y,m),this._y=Math.atan2(u,s)):(this._x=Math.atan2(-_,T),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Xu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Xu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Yu.setFromEuler(this),this.setFromQuaternion(Yu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Gn.DEFAULT_ORDER="XYZ";class mf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let U0=0;const Ku=new ie,oo=new Ro,Zn=new $t,yr=new ie,Lo=new ie,N0=new ie,L0=new Ro,Zu=new ie(1,0,0),Ju=new ie(0,1,0),Qu=new ie(0,0,1),ju={type:"added"},F0={type:"removed"},ro={type:"childadded",child:null},Ms={type:"childremoved",child:null};class Sn extends wo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:U0++}),this.uuid=er(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Sn.DEFAULT_UP.clone();const e=new ie,t=new Gn,n=new Ro,i=new ie(1,1,1);function s(){n.setFromEuler(t,!1)}function l(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new $t},normalMatrix:{value:new dt}}),this.matrix=new $t,this.matrixWorld=new $t,this.matrixAutoUpdate=Sn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return oo.setFromAxisAngle(e,t),this.quaternion.multiply(oo),this}rotateOnWorldAxis(e,t){return oo.setFromAxisAngle(e,t),this.quaternion.premultiply(oo),this}rotateX(e){return this.rotateOnAxis(Zu,e)}rotateY(e){return this.rotateOnAxis(Ju,e)}rotateZ(e){return this.rotateOnAxis(Qu,e)}translateOnAxis(e,t){return Ku.copy(e).applyQuaternion(this.quaternion),this.position.add(Ku.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Zu,e)}translateY(e){return this.translateOnAxis(Ju,e)}translateZ(e){return this.translateOnAxis(Qu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yr.copy(e):yr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Lo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(Lo,yr,this.up):Zn.lookAt(yr,Lo,this.up),this.quaternion.setFromRotationMatrix(Zn),i&&(Zn.extractRotation(i.matrixWorld),oo.setFromRotationMatrix(Zn),this.quaternion.premultiply(oo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ju),ro.child=e,this.dispatchEvent(ro),ro.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(F0),Ms.child=e,this.dispatchEvent(Ms),Ms.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ju),ro.child=e,this.dispatchEvent(ro),ro.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const l=this.children[n].getObjectByProperty(e,t);if(l!==void 0)return l}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Lo,e,N0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Lo,L0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(u=>({...u,boundingBox:u.boundingBox?{min:u.boundingBox.min.toArray(),max:u.boundingBox.max.toArray()}:void 0,boundingSphere:u.boundingSphere?{radius:u.boundingSphere.radius,center:u.boundingSphere.center.toArray()}:void 0})),i.instanceInfo=this._instanceInfo.map(u=>({...u})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:this.boundingSphere.center.toArray(),radius:this.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:this.boundingBox.min.toArray(),max:this.boundingBox.max.toArray()}));function s(u,c){return u[c.uuid]===void 0&&(u[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const u=this.geometry.parameters;if(u!==void 0&&u.shapes!==void 0){const c=u.shapes;if(Array.isArray(c))for(let m=0,_=c.length;m<_;m++){const v=c[m];s(e.shapes,v)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const u=[];for(let c=0,m=this.material.length;c<m;c++)u.push(s(e.materials,this.material[c]));i.material=u}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let u=0;u<this.children.length;u++)i.children.push(this.children[u].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let u=0;u<this.animations.length;u++){const c=this.animations[u];i.animations.push(s(e.animations,c))}}if(t){const u=l(e.geometries),c=l(e.materials),m=l(e.textures),_=l(e.images),v=l(e.shapes),y=l(e.skeletons),T=l(e.animations),w=l(e.nodes);u.length>0&&(n.geometries=u),c.length>0&&(n.materials=c),m.length>0&&(n.textures=m),_.length>0&&(n.images=_),v.length>0&&(n.shapes=v),y.length>0&&(n.skeletons=y),T.length>0&&(n.animations=T),w.length>0&&(n.nodes=w)}return n.object=i,n;function l(u){const c=[];for(const m in u){const _=u[m];delete _.metadata,c.push(_)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Sn.DEFAULT_UP=new ie(0,1,0);Sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Fn=new ie,Jn=new ie,Cs=new ie,Qn=new ie,so=new ie,ao=new ie,ec=new ie,As=new ie,ws=new ie,Rs=new ie,Is=new Vt,Ps=new Vt,Ds=new Vt;class On{constructor(e=new ie,t=new ie,n=new ie){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Fn.subVectors(e,t),i.cross(Fn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Fn.subVectors(i,t),Jn.subVectors(n,t),Cs.subVectors(e,t);const l=Fn.dot(Fn),u=Fn.dot(Jn),c=Fn.dot(Cs),m=Jn.dot(Jn),_=Jn.dot(Cs),v=l*m-u*u;if(v===0)return s.set(0,0,0),null;const y=1/v,T=(m*c-u*_)*y,w=(l*_-u*c)*y;return s.set(1-T-w,w,T)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Qn)===null?!1:Qn.x>=0&&Qn.y>=0&&Qn.x+Qn.y<=1}static getInterpolation(e,t,n,i,s,l,u,c){return this.getBarycoord(e,t,n,i,Qn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Qn.x),c.addScaledVector(l,Qn.y),c.addScaledVector(u,Qn.z),c)}static getInterpolatedAttribute(e,t,n,i,s,l){return Is.setScalar(0),Ps.setScalar(0),Ds.setScalar(0),Is.fromBufferAttribute(e,t),Ps.fromBufferAttribute(e,n),Ds.fromBufferAttribute(e,i),l.setScalar(0),l.addScaledVector(Is,s.x),l.addScaledVector(Ps,s.y),l.addScaledVector(Ds,s.z),l}static isFrontFacing(e,t,n,i){return Fn.subVectors(n,t),Jn.subVectors(e,t),Fn.cross(Jn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Fn.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),Fn.cross(Jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return On.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return On.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return On.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return On.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return On.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let l,u;so.subVectors(i,n),ao.subVectors(s,n),As.subVectors(e,n);const c=so.dot(As),m=ao.dot(As);if(c<=0&&m<=0)return t.copy(n);ws.subVectors(e,i);const _=so.dot(ws),v=ao.dot(ws);if(_>=0&&v<=_)return t.copy(i);const y=c*v-_*m;if(y<=0&&c>=0&&_<=0)return l=c/(c-_),t.copy(n).addScaledVector(so,l);Rs.subVectors(e,s);const T=so.dot(Rs),w=ao.dot(Rs);if(w>=0&&T<=w)return t.copy(s);const P=T*m-c*w;if(P<=0&&m>=0&&w<=0)return u=m/(m-w),t.copy(n).addScaledVector(ao,u);const C=_*w-T*v;if(C<=0&&v-_>=0&&T-w>=0)return ec.subVectors(s,i),u=(v-_)/(v-_+(T-w)),t.copy(i).addScaledVector(ec,u);const E=1/(C+P+y);return l=P*E,u=y*E,t.copy(n).addScaledVector(so,l).addScaledVector(ao,u)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const gf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},xr={h:0,s:0,l:0};function bs(o,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?o+(e-o)*6*t:t<1/2?e:t<2/3?o+(e-o)*6*(2/3-t):o}class Et{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Rt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Rt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Rt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Rt.workingColorSpace){if(e=v0(e,1),t=xt(t,0,1),n=xt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,l=2*n-s;this.r=bs(l,s,e+1/3),this.g=bs(l,s,e),this.b=bs(l,s,e-1/3)}return Rt.toWorkingColorSpace(this,i),this}setStyle(e,t=Cn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const l=i[1],u=i[2];switch(l){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],l=s.length;if(l===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(l===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Cn){const n=gf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ai(e.r),this.g=ai(e.g),this.b=ai(e.b),this}copyLinearToSRGB(e){return this.r=vo(e.r),this.g=vo(e.g),this.b=vo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Cn){return Rt.fromWorkingColorSpace(tn.copy(this),e),Math.round(xt(tn.r*255,0,255))*65536+Math.round(xt(tn.g*255,0,255))*256+Math.round(xt(tn.b*255,0,255))}getHexString(e=Cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Rt.workingColorSpace){Rt.fromWorkingColorSpace(tn.copy(this),t);const n=tn.r,i=tn.g,s=tn.b,l=Math.max(n,i,s),u=Math.min(n,i,s);let c,m;const _=(u+l)/2;if(u===l)c=0,m=0;else{const v=l-u;switch(m=_<=.5?v/(l+u):v/(2-l-u),l){case n:c=(i-s)/v+(i<s?6:0);break;case i:c=(s-n)/v+2;break;case s:c=(n-i)/v+4;break}c/=6}return e.h=c,e.s=m,e.l=_,e}getRGB(e,t=Rt.workingColorSpace){return Rt.fromWorkingColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=Cn){Rt.fromWorkingColorSpace(tn.copy(this),e);const t=tn.r,n=tn.g,i=tn.b;return e!==Cn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(xi),this.setHSL(xi.h+e,xi.s+t,xi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(xi),e.getHSL(xr);const n=ms(xi.h,xr.h,t),i=ms(xi.s,xr.s,t),s=ms(xi.l,xr.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new Et;Et.NAMES=gf;let B0=0;class nr extends wo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:B0++}),this.uuid=er(),this.name="",this.type="Material",this.blending=_o,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qs,this.blendDst=js,this.blendEquation=Hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Et(0,0,0),this.blendAlpha=0,this.depthFunc=Eo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qi,this.stencilZFail=Qi,this.stencilZPass=Qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==_o&&(n.blending=this.blending),this.side!==wi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Qs&&(n.blendSrc=this.blendSrc),this.blendDst!==js&&(n.blendDst=this.blendDst),this.blendEquation!==Hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Eo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const l=[];for(const u in s){const c=s[u];delete c.metadata,l.push(c)}return l}if(t){const s=i(e.textures),l=i(e.images);s.length>0&&(n.textures=s),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class il extends nr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=tf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ii=V0();function V0(){const o=new ArrayBuffer(4),e=new Float32Array(o),t=new Uint32Array(o),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){const m=c-127;m<-27?(n[c]=0,n[c|256]=32768,i[c]=24,i[c|256]=24):m<-14?(n[c]=1024>>-m-14,n[c|256]=1024>>-m-14|32768,i[c]=-m-1,i[c|256]=-m-1):m<=15?(n[c]=m+15<<10,n[c|256]=m+15<<10|32768,i[c]=13,i[c|256]=13):m<128?(n[c]=31744,n[c|256]=64512,i[c]=24,i[c|256]=24):(n[c]=31744,n[c|256]=64512,i[c]=13,i[c|256]=13)}const s=new Uint32Array(2048),l=new Uint32Array(64),u=new Uint32Array(64);for(let c=1;c<1024;++c){let m=c<<13,_=0;for(;(m&8388608)===0;)m<<=1,_-=8388608;m&=-8388609,_+=947912704,s[c]=m|_}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)l[c]=c<<23;l[31]=1199570944,l[32]=2147483648;for(let c=33;c<63;++c)l[c]=2147483648+(c-32<<23);l[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(u[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:l,offsetTable:u}}function O0(o){Math.abs(o)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),o=xt(o,-65504,65504),ii.floatView[0]=o;const e=ii.uint32View[0],t=e>>23&511;return ii.baseTable[t]+((e&8388607)>>ii.shiftTable[t])}function k0(o){const e=o>>10;return ii.uint32View[0]=ii.mantissaTable[ii.offsetTable[e]+(o&1023)]+ii.exponentTable[e],ii.floatView[0]}class tc{static toHalfFloat(e){return O0(e)}static fromHalfFloat(e){return k0(e)}}const qt=new ie,Er=new ct;let G0=0;class qn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:G0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Hu,this.updateRanges=[],this.gpuType=Rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Er.fromBufferAttribute(this,t),Er.applyMatrix3(e),this.setXY(t,Er.x,Er.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix3(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=bo(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=gn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bo(t,this.array)),t}setX(e,t){return this.normalized&&(t=gn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bo(t,this.array)),t}setY(e,t){return this.normalized&&(t=gn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=gn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bo(t,this.array)),t}setW(e,t){return this.normalized&&(t=gn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=gn(t,this.array),n=gn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=gn(t,this.array),n=gn(n,this.array),i=gn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=gn(t,this.array),n=gn(n,this.array),i=gn(i,this.array),s=gn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Hu&&(e.usage=this.usage),e}}class _f extends qn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class vf extends qn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class bn extends qn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let H0=0;const Mn=new $t,Us=new Sn,lo=new ie,xn=new tr,Fo=new tr,Zt=new ie;class ui extends wo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:H0++}),this.uuid=er(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hf(e)?vf:_f)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new dt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Mn.makeRotationFromQuaternion(e),this.applyMatrix4(Mn),this}rotateX(e){return Mn.makeRotationX(e),this.applyMatrix4(Mn),this}rotateY(e){return Mn.makeRotationY(e),this.applyMatrix4(Mn),this}rotateZ(e){return Mn.makeRotationZ(e),this.applyMatrix4(Mn),this}translate(e,t,n){return Mn.makeTranslation(e,t,n),this.applyMatrix4(Mn),this}scale(e,t,n){return Mn.makeScale(e,t,n),this.applyMatrix4(Mn),this}lookAt(e){return Us.lookAt(e),Us.updateMatrix(),this.applyMatrix4(Us.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(lo).negate(),this.translate(lo.x,lo.y,lo.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const l=e[i];n.push(l.x,l.y,l.z||0)}this.setAttribute("position",new bn(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new ie(-1/0,-1/0,-1/0),new ie(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];xn.setFromBufferAttribute(s),this.morphTargetsRelative?(Zt.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(Zt),Zt.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(Zt)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new ie,1/0);return}if(e){const n=this.boundingSphere.center;if(xn.setFromBufferAttribute(e),t)for(let s=0,l=t.length;s<l;s++){const u=t[s];Fo.setFromBufferAttribute(u),this.morphTargetsRelative?(Zt.addVectors(xn.min,Fo.min),xn.expandByPoint(Zt),Zt.addVectors(xn.max,Fo.max),xn.expandByPoint(Zt)):(xn.expandByPoint(Fo.min),xn.expandByPoint(Fo.max))}xn.getCenter(n);let i=0;for(let s=0,l=e.count;s<l;s++)Zt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Zt));if(t)for(let s=0,l=t.length;s<l;s++){const u=t[s],c=this.morphTargetsRelative;for(let m=0,_=u.count;m<_;m++)Zt.fromBufferAttribute(u,m),c&&(lo.fromBufferAttribute(e,m),Zt.add(lo)),i=Math.max(i,n.distanceToSquared(Zt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new qn(new Float32Array(4*n.count),4));const l=this.getAttribute("tangent"),u=[],c=[];for(let K=0;K<n.count;K++)u[K]=new ie,c[K]=new ie;const m=new ie,_=new ie,v=new ie,y=new ct,T=new ct,w=new ct,P=new ie,C=new ie;function E(K,B,D){m.fromBufferAttribute(n,K),_.fromBufferAttribute(n,B),v.fromBufferAttribute(n,D),y.fromBufferAttribute(s,K),T.fromBufferAttribute(s,B),w.fromBufferAttribute(s,D),_.sub(m),v.sub(m),T.sub(y),w.sub(y);const $=1/(T.x*w.y-w.x*T.y);isFinite($)&&(P.copy(_).multiplyScalar(w.y).addScaledVector(v,-T.y).multiplyScalar($),C.copy(v).multiplyScalar(T.x).addScaledVector(_,-w.x).multiplyScalar($),u[K].add(P),u[B].add(P),u[D].add(P),c[K].add(C),c[B].add(C),c[D].add(C))}let O=this.groups;O.length===0&&(O=[{start:0,count:e.count}]);for(let K=0,B=O.length;K<B;++K){const D=O[K],$=D.start,ae=D.count;for(let re=$,pe=$+ae;re<pe;re+=3)E(e.getX(re+0),e.getX(re+1),e.getX(re+2))}const N=new ie,b=new ie,X=new ie,q=new ie;function W(K){X.fromBufferAttribute(i,K),q.copy(X);const B=u[K];N.copy(B),N.sub(X.multiplyScalar(X.dot(B))).normalize(),b.crossVectors(q,B);const $=b.dot(c[K])<0?-1:1;l.setXYZW(K,N.x,N.y,N.z,$)}for(let K=0,B=O.length;K<B;++K){const D=O[K],$=D.start,ae=D.count;for(let re=$,pe=$+ae;re<pe;re+=3)W(e.getX(re+0)),W(e.getX(re+1)),W(e.getX(re+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new qn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let y=0,T=n.count;y<T;y++)n.setXYZ(y,0,0,0);const i=new ie,s=new ie,l=new ie,u=new ie,c=new ie,m=new ie,_=new ie,v=new ie;if(e)for(let y=0,T=e.count;y<T;y+=3){const w=e.getX(y+0),P=e.getX(y+1),C=e.getX(y+2);i.fromBufferAttribute(t,w),s.fromBufferAttribute(t,P),l.fromBufferAttribute(t,C),_.subVectors(l,s),v.subVectors(i,s),_.cross(v),u.fromBufferAttribute(n,w),c.fromBufferAttribute(n,P),m.fromBufferAttribute(n,C),u.add(_),c.add(_),m.add(_),n.setXYZ(w,u.x,u.y,u.z),n.setXYZ(P,c.x,c.y,c.z),n.setXYZ(C,m.x,m.y,m.z)}else for(let y=0,T=t.count;y<T;y+=3)i.fromBufferAttribute(t,y+0),s.fromBufferAttribute(t,y+1),l.fromBufferAttribute(t,y+2),_.subVectors(l,s),v.subVectors(i,s),_.cross(v),n.setXYZ(y+0,_.x,_.y,_.z),n.setXYZ(y+1,_.x,_.y,_.z),n.setXYZ(y+2,_.x,_.y,_.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Zt.fromBufferAttribute(e,t),Zt.normalize(),e.setXYZ(t,Zt.x,Zt.y,Zt.z)}toNonIndexed(){function e(u,c){const m=u.array,_=u.itemSize,v=u.normalized,y=new m.constructor(c.length*_);let T=0,w=0;for(let P=0,C=c.length;P<C;P++){u.isInterleavedBufferAttribute?T=c[P]*u.data.stride+u.offset:T=c[P]*_;for(let E=0;E<_;E++)y[w++]=m[T++]}return new qn(y,_,v)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ui,n=this.index.array,i=this.attributes;for(const u in i){const c=i[u],m=e(c,n);t.setAttribute(u,m)}const s=this.morphAttributes;for(const u in s){const c=[],m=s[u];for(let _=0,v=m.length;_<v;_++){const y=m[_],T=e(y,n);c.push(T)}t.morphAttributes[u]=c}t.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let u=0,c=l.length;u<c;u++){const m=l[u];t.addGroup(m.start,m.count,m.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const m in c)c[m]!==void 0&&(e[m]=c[m]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const m=n[c];e.data.attributes[c]=m.toJSON(e.data)}const i={};let s=!1;for(const c in this.morphAttributes){const m=this.morphAttributes[c],_=[];for(let v=0,y=m.length;v<y;v++){const T=m[v];_.push(T.toJSON(e.data))}_.length>0&&(i[c]=_,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(e.data.groups=JSON.parse(JSON.stringify(l)));const u=this.boundingSphere;return u!==null&&(e.data.boundingSphere={center:u.center.toArray(),radius:u.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const m in i){const _=i[m];this.setAttribute(m,_.clone(t))}const s=e.morphAttributes;for(const m in s){const _=[],v=s[m];for(let y=0,T=v.length;y<T;y++)_.push(v[y].clone(t));this.morphAttributes[m]=_}this.morphTargetsRelative=e.morphTargetsRelative;const l=e.groups;for(let m=0,_=l.length;m<_;m++){const v=l[m];this.addGroup(v.start,v.count,v.materialIndex)}const u=e.boundingBox;u!==null&&(this.boundingBox=u.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nc=new $t,Fi=new P0,Tr=new nl,ic=new ie,Sr=new ie,Mr=new ie,Cr=new ie,Ns=new ie,Ar=new ie,oc=new ie,wr=new ie;class Pn extends Sn{constructor(e=new ui,t=new il){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,l=i.length;s<l;s++){const u=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,l=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const u=this.morphTargetInfluences;if(s&&u){Ar.set(0,0,0);for(let c=0,m=s.length;c<m;c++){const _=u[c],v=s[c];_!==0&&(Ns.fromBufferAttribute(v,e),l?Ar.addScaledVector(Ns,_):Ar.addScaledVector(Ns.sub(t),_))}t.add(Ar)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Tr.copy(n.boundingSphere),Tr.applyMatrix4(s),Fi.copy(e.ray).recast(e.near),!(Tr.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(Tr,ic)===null||Fi.origin.distanceToSquared(ic)>(e.far-e.near)**2))&&(nc.copy(s).invert(),Fi.copy(e.ray).applyMatrix4(nc),!(n.boundingBox!==null&&Fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,l=this.material,u=s.index,c=s.attributes.position,m=s.attributes.uv,_=s.attributes.uv1,v=s.attributes.normal,y=s.groups,T=s.drawRange;if(u!==null)if(Array.isArray(l))for(let w=0,P=y.length;w<P;w++){const C=y[w],E=l[C.materialIndex],O=Math.max(C.start,T.start),N=Math.min(u.count,Math.min(C.start+C.count,T.start+T.count));for(let b=O,X=N;b<X;b+=3){const q=u.getX(b),W=u.getX(b+1),K=u.getX(b+2);i=Rr(this,E,e,n,m,_,v,q,W,K),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=C.materialIndex,t.push(i))}}else{const w=Math.max(0,T.start),P=Math.min(u.count,T.start+T.count);for(let C=w,E=P;C<E;C+=3){const O=u.getX(C),N=u.getX(C+1),b=u.getX(C+2);i=Rr(this,l,e,n,m,_,v,O,N,b),i&&(i.faceIndex=Math.floor(C/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(l))for(let w=0,P=y.length;w<P;w++){const C=y[w],E=l[C.materialIndex],O=Math.max(C.start,T.start),N=Math.min(c.count,Math.min(C.start+C.count,T.start+T.count));for(let b=O,X=N;b<X;b+=3){const q=b,W=b+1,K=b+2;i=Rr(this,E,e,n,m,_,v,q,W,K),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=C.materialIndex,t.push(i))}}else{const w=Math.max(0,T.start),P=Math.min(c.count,T.start+T.count);for(let C=w,E=P;C<E;C+=3){const O=C,N=C+1,b=C+2;i=Rr(this,l,e,n,m,_,v,O,N,b),i&&(i.faceIndex=Math.floor(C/3),t.push(i))}}}}function z0(o,e,t,n,i,s,l,u){let c;if(e.side===cn?c=n.intersectTriangle(l,s,i,!0,u):c=n.intersectTriangle(i,s,l,e.side===wi,u),c===null)return null;wr.copy(u),wr.applyMatrix4(o.matrixWorld);const m=t.ray.origin.distanceTo(wr);return m<t.near||m>t.far?null:{distance:m,point:wr.clone(),object:o}}function Rr(o,e,t,n,i,s,l,u,c,m){o.getVertexPosition(u,Sr),o.getVertexPosition(c,Mr),o.getVertexPosition(m,Cr);const _=z0(o,e,t,n,Sr,Mr,Cr,oc);if(_){const v=new ie;On.getBarycoord(oc,Sr,Mr,Cr,v),i&&(_.uv=On.getInterpolatedAttribute(i,u,c,m,v,new ct)),s&&(_.uv1=On.getInterpolatedAttribute(s,u,c,m,v,new ct)),l&&(_.normal=On.getInterpolatedAttribute(l,u,c,m,v,new ie),_.normal.dot(n.direction)>0&&_.normal.multiplyScalar(-1));const y={a:u,b:c,c:m,normal:new ie,materialIndex:0};On.getNormal(Sr,Mr,Cr,y.normal),_.face=y,_.barycoord=v}return _}class ir extends ui{constructor(e=1,t=1,n=1,i=1,s=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:l};const u=this;i=Math.floor(i),s=Math.floor(s),l=Math.floor(l);const c=[],m=[],_=[],v=[];let y=0,T=0;w("z","y","x",-1,-1,n,t,e,l,s,0),w("z","y","x",1,-1,n,t,-e,l,s,1),w("x","z","y",1,1,e,n,t,i,l,2),w("x","z","y",1,-1,e,n,-t,i,l,3),w("x","y","z",1,-1,e,t,n,i,s,4),w("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new bn(m,3)),this.setAttribute("normal",new bn(_,3)),this.setAttribute("uv",new bn(v,2));function w(P,C,E,O,N,b,X,q,W,K,B){const D=b/W,$=X/K,ae=b/2,re=X/2,pe=q/2,xe=W+1,de=K+1;let Ee=0,ue=0;const Ie=new ie;for(let Ue=0;Ue<de;Ue++){const We=Ue*$-re;for(let tt=0;tt<xe;tt++){const ht=tt*D-ae;Ie[P]=ht*O,Ie[C]=We*N,Ie[E]=pe,m.push(Ie.x,Ie.y,Ie.z),Ie[P]=0,Ie[C]=0,Ie[E]=q>0?1:-1,_.push(Ie.x,Ie.y,Ie.z),v.push(tt/W),v.push(1-Ue/K),Ee+=1}}for(let Ue=0;Ue<K;Ue++)for(let We=0;We<W;We++){const tt=y+We+xe*Ue,ht=y+We+xe*(Ue+1),fe=y+(We+1)+xe*(Ue+1),we=y+(We+1)+xe*Ue;c.push(tt,ht,we),c.push(ht,fe,we),ue+=6}u.addGroup(T,ue,B),T+=ue,y+=Ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ir(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Mo(o){const e={};for(const t in o){e[t]={};for(const n in o[t]){const i=o[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function an(o){const e={};for(let t=0;t<o.length;t++){const n=Mo(o[t]);for(const i in n)e[i]=n[i]}return e}function W0(o){const e=[];for(let t=0;t<o.length;t++)e.push(o[t].clone());return e}function yf(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Rt.workingColorSpace}const ns={clone:Mo,merge:an};var q0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class un extends nr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=q0,this.fragmentShader=$0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Mo(e.uniforms),this.uniformsGroups=W0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const l=this.uniforms[i].value;l&&l.isTexture?t.uniforms[i]={type:"t",value:l.toJSON(e).uuid}:l&&l.isColor?t.uniforms[i]={type:"c",value:l.getHex()}:l&&l.isVector2?t.uniforms[i]={type:"v2",value:l.toArray()}:l&&l.isVector3?t.uniforms[i]={type:"v3",value:l.toArray()}:l&&l.isVector4?t.uniforms[i]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?t.uniforms[i]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?t.uniforms[i]={type:"m4",value:l.toArray()}:t.uniforms[i]={value:l}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class xf extends Sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $t,this.projectionMatrix=new $t,this.projectionMatrixInverse=new $t,this.coordinateSystem=ri}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ei=new ie,rc=new ct,sc=new ct;class An extends xf{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ba*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ba*2*Math.atan(Math.tan(ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ei.x,Ei.y).multiplyScalar(-e/Ei.z),Ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ei.x,Ei.y).multiplyScalar(-e/Ei.z)}getViewSize(e,t){return this.getViewBounds(e,rc,sc),t.subVectors(sc,rc)}setViewOffset(e,t,n,i,s,l){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ps*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const l=this.view;if(this.view!==null&&this.view.enabled){const c=l.fullWidth,m=l.fullHeight;s+=l.offsetX*i/c,t-=l.offsetY*n/m,i*=l.width/c,n*=l.height/m}const u=this.filmOffset;u!==0&&(s+=e*u/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const uo=-90,co=1;class X0 extends Sn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new An(uo,co,e,t);i.layers=this.layers,this.add(i);const s=new An(uo,co,e,t);s.layers=this.layers,this.add(s);const l=new An(uo,co,e,t);l.layers=this.layers,this.add(l);const u=new An(uo,co,e,t);u.layers=this.layers,this.add(u);const c=new An(uo,co,e,t);c.layers=this.layers,this.add(c);const m=new An(uo,co,e,t);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,l,u,c]=t;for(const m of t)this.remove(m);if(e===ri)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),u.up.set(0,1,0),u.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===es)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),u.up.set(0,-1,0),u.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of t)this.add(m),m.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,l,u,c,m,_]=this.children,v=e.getRenderTarget(),y=e.getActiveCubeFace(),T=e.getActiveMipmapLevel(),w=e.xr.enabled;e.xr.enabled=!1;const P=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,l),e.setRenderTarget(n,2,i),e.render(t,u),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,m),n.texture.generateMipmaps=P,e.setRenderTarget(n,5,i),e.render(t,_),e.setRenderTarget(v,y,T),e.xr.enabled=w,n.texture.needsPMREMUpdate=!0}}class Ef extends fn{constructor(e=[],t=To,n,i,s,l,u,c,m,_){super(e,t,n,i,s,l,u,c,m,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Y0 extends kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ef(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ln}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ir(5,5,5),s=new un({name:"CubemapFromEquirect",uniforms:Mo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:cn,blending:si});s.uniforms.tEquirect.value=t;const l=new Pn(i,s),u=t.minFilter;return t.minFilter===Mi&&(t.minFilter=ln),new X0(1,10,this).update(e,l),t.minFilter=u,l.geometry.dispose(),l.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let l=0;l<6;l++)e.setRenderTarget(this,l),e.clear(t,n,i);e.setRenderTarget(s)}}class Ir extends Sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const K0={type:"move"};class Ls{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ir,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ir,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ie,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ie),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ir,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ie,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ie),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,l=null;const u=this._targetRay,c=this._grip,m=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(m&&e.hand){l=!0;for(const P of e.hand.values()){const C=t.getJointPose(P,n),E=this._getHandJoint(m,P);C!==null&&(E.matrix.fromArray(C.transform.matrix),E.matrix.decompose(E.position,E.rotation,E.scale),E.matrixWorldNeedsUpdate=!0,E.jointRadius=C.radius),E.visible=C!==null}const _=m.joints["index-finger-tip"],v=m.joints["thumb-tip"],y=_.position.distanceTo(v.position),T=.02,w=.005;m.inputState.pinching&&y>T+w?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&y<=T-w&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));u!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(u.matrix.fromArray(i.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,i.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(i.linearVelocity)):u.hasLinearVelocity=!1,i.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(i.angularVelocity)):u.hasAngularVelocity=!1,this.dispatchEvent(K0)))}return u!==null&&(u.visible=i!==null),c!==null&&(c.visible=s!==null),m!==null&&(m.visible=l!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ir;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Z0 extends Sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gn,this.environmentIntensity=1,this.environmentRotation=new Gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class J0 extends fn{constructor(e=null,t=1,n=1,i,s,l,u,c,m=Tn,_=Tn,v,y){super(null,l,u,c,m,_,i,s,v,y),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Fs=new ie,Q0=new ie,j0=new dt;class ki{constructor(e=new ie(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Fs.subVectors(n,t).cross(Q0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Fs),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||j0.getNormalMatrix(e),i=this.coplanarPoint(Fs).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Bi=new nl,Pr=new ie;class Tf{constructor(e=new ki,t=new ki,n=new ki,i=new ki,s=new ki,l=new ki){this.planes=[e,t,n,i,s,l]}set(e,t,n,i,s,l){const u=this.planes;return u[0].copy(e),u[1].copy(t),u[2].copy(n),u[3].copy(i),u[4].copy(s),u[5].copy(l),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ri){const n=this.planes,i=e.elements,s=i[0],l=i[1],u=i[2],c=i[3],m=i[4],_=i[5],v=i[6],y=i[7],T=i[8],w=i[9],P=i[10],C=i[11],E=i[12],O=i[13],N=i[14],b=i[15];if(n[0].setComponents(c-s,y-m,C-T,b-E).normalize(),n[1].setComponents(c+s,y+m,C+T,b+E).normalize(),n[2].setComponents(c+l,y+_,C+w,b+O).normalize(),n[3].setComponents(c-l,y-_,C-w,b-O).normalize(),n[4].setComponents(c-u,y-v,C-P,b-N).normalize(),t===ri)n[5].setComponents(c+u,y+v,C+P,b+N).normalize();else if(t===es)n[5].setComponents(u,v,P,N).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){return Bi.center.set(0,0,0),Bi.radius=.7071067811865476,Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Pr.x=i.normal.x>0?e.max.x:e.min.x,Pr.y=i.normal.y>0?e.max.y:e.min.y,Pr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Pr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Sf extends fn{constructor(e,t,n=Xi,i,s,l,u=Tn,c=Tn,m,_=Yo){if(_!==Yo&&_!==Ko)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super(null,i,s,l,u,c,_,n,m),this.isDepthTexture=!0,this.image={width:e,height:t},this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new tl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class ol extends ui{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],l=[];u(i),m(n),_(),this.setAttribute("position",new bn(s,3)),this.setAttribute("normal",new bn(s.slice(),3)),this.setAttribute("uv",new bn(l,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function u(O){const N=new ie,b=new ie,X=new ie;for(let q=0;q<t.length;q+=3)T(t[q+0],N),T(t[q+1],b),T(t[q+2],X),c(N,b,X,O)}function c(O,N,b,X){const q=X+1,W=[];for(let K=0;K<=q;K++){W[K]=[];const B=O.clone().lerp(b,K/q),D=N.clone().lerp(b,K/q),$=q-K;for(let ae=0;ae<=$;ae++)ae===0&&K===q?W[K][ae]=B:W[K][ae]=B.clone().lerp(D,ae/$)}for(let K=0;K<q;K++)for(let B=0;B<2*(q-K)-1;B++){const D=Math.floor(B/2);B%2===0?(y(W[K][D+1]),y(W[K+1][D]),y(W[K][D])):(y(W[K][D+1]),y(W[K+1][D+1]),y(W[K+1][D]))}}function m(O){const N=new ie;for(let b=0;b<s.length;b+=3)N.x=s[b+0],N.y=s[b+1],N.z=s[b+2],N.normalize().multiplyScalar(O),s[b+0]=N.x,s[b+1]=N.y,s[b+2]=N.z}function _(){const O=new ie;for(let N=0;N<s.length;N+=3){O.x=s[N+0],O.y=s[N+1],O.z=s[N+2];const b=C(O)/2/Math.PI+.5,X=E(O)/Math.PI+.5;l.push(b,1-X)}w(),v()}function v(){for(let O=0;O<l.length;O+=6){const N=l[O+0],b=l[O+2],X=l[O+4],q=Math.max(N,b,X),W=Math.min(N,b,X);q>.9&&W<.1&&(N<.2&&(l[O+0]+=1),b<.2&&(l[O+2]+=1),X<.2&&(l[O+4]+=1))}}function y(O){s.push(O.x,O.y,O.z)}function T(O,N){const b=O*3;N.x=e[b+0],N.y=e[b+1],N.z=e[b+2]}function w(){const O=new ie,N=new ie,b=new ie,X=new ie,q=new ct,W=new ct,K=new ct;for(let B=0,D=0;B<s.length;B+=9,D+=6){O.set(s[B+0],s[B+1],s[B+2]),N.set(s[B+3],s[B+4],s[B+5]),b.set(s[B+6],s[B+7],s[B+8]),q.set(l[D+0],l[D+1]),W.set(l[D+2],l[D+3]),K.set(l[D+4],l[D+5]),X.copy(O).add(N).add(b).divideScalar(3);const $=C(X);P(q,D+0,O,$),P(W,D+2,N,$),P(K,D+4,b,$)}}function P(O,N,b,X){X<0&&O.x===1&&(l[N]=O.x-1),b.x===0&&b.z===0&&(l[N]=X/2/Math.PI+.5)}function C(O){return Math.atan2(O.z,-O.x)}function E(O){return Math.atan2(-O.y,Math.sqrt(O.x*O.x+O.z*O.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ol(e.vertices,e.indices,e.radius,e.details)}}class is extends ol{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new is(e.radius,e.detail)}}class us extends ui{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,l=t/2,u=Math.floor(n),c=Math.floor(i),m=u+1,_=c+1,v=e/u,y=t/c,T=[],w=[],P=[],C=[];for(let E=0;E<_;E++){const O=E*y-l;for(let N=0;N<m;N++){const b=N*v-s;w.push(b,-O,0),P.push(0,0,1),C.push(N/u),C.push(1-E/c)}}for(let E=0;E<c;E++)for(let O=0;O<u;O++){const N=O+m*E,b=O+m*(E+1),X=O+1+m*(E+1),q=O+1+m*E;T.push(N,b,q),T.push(b,X,q)}this.setIndex(T),this.setAttribute("position",new bn(w,3)),this.setAttribute("normal",new bn(P,3)),this.setAttribute("uv",new bn(C,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.width,e.height,e.widthSegments,e.heightSegments)}}class ex extends un{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class tx extends nr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Et(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Et(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ff,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class nx extends nr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=l0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ix extends nr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ac={enabled:!1,files:{},add:function(o,e){this.enabled!==!1&&(this.files[o]=e)},get:function(o){if(this.enabled!==!1)return this.files[o]},remove:function(o){delete this.files[o]},clear:function(){this.files={}}};class ox{constructor(e,t,n){const i=this;let s=!1,l=0,u=0,c;const m=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(_){u++,s===!1&&i.onStart!==void 0&&i.onStart(_,l,u),s=!0},this.itemEnd=function(_){l++,i.onProgress!==void 0&&i.onProgress(_,l,u),l===u&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(_){i.onError!==void 0&&i.onError(_)},this.resolveURL=function(_){return c?c(_):_},this.setURLModifier=function(_){return c=_,this},this.addHandler=function(_,v){return m.push(_,v),this},this.removeHandler=function(_){const v=m.indexOf(_);return v!==-1&&m.splice(v,2),this},this.getHandler=function(_){for(let v=0,y=m.length;v<y;v+=2){const T=m[v],w=m[v+1];if(T.global&&(T.lastIndex=0),T.test(_))return w}return null}}}const rx=new ox;class rl{constructor(e){this.manager=e!==void 0?e:rx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}rl.DEFAULT_MATERIAL_NAME="__DEFAULT";const jn={};class sx extends Error{constructor(e,t){super(e),this.response=t}}class ax extends rl{constructor(e){super(e),this.mimeType="",this.responseType=""}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ac.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(jn[e]!==void 0){jn[e].push({onLoad:t,onProgress:n,onError:i});return}jn[e]=[],jn[e].push({onLoad:t,onProgress:n,onError:i});const l=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),u=this.mimeType,c=this.responseType;fetch(l).then(m=>{if(m.status===200||m.status===0){if(m.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||m.body===void 0||m.body.getReader===void 0)return m;const _=jn[e],v=m.body.getReader(),y=m.headers.get("X-File-Size")||m.headers.get("Content-Length"),T=y?parseInt(y):0,w=T!==0;let P=0;const C=new ReadableStream({start(E){O();function O(){v.read().then(({done:N,value:b})=>{if(N)E.close();else{P+=b.byteLength;const X=new ProgressEvent("progress",{lengthComputable:w,loaded:P,total:T});for(let q=0,W=_.length;q<W;q++){const K=_[q];K.onProgress&&K.onProgress(X)}E.enqueue(b),O()}},N=>{E.error(N)})}}});return new Response(C)}else throw new sx(`fetch for "${m.url}" responded with ${m.status}: ${m.statusText}`,m)}).then(m=>{switch(c){case"arraybuffer":return m.arrayBuffer();case"blob":return m.blob();case"document":return m.text().then(_=>new DOMParser().parseFromString(_,u));case"json":return m.json();default:if(u==="")return m.text();{const v=/charset="?([^;"\s]*)"?/i.exec(u),y=v&&v[1]?v[1].toLowerCase():void 0,T=new TextDecoder(y);return m.arrayBuffer().then(w=>T.decode(w))}}}).then(m=>{ac.add(e,m);const _=jn[e];delete jn[e];for(let v=0,y=_.length;v<y;v++){const T=_[v];T.onLoad&&T.onLoad(m)}}).catch(m=>{const _=jn[e];if(_===void 0)throw this.manager.itemError(e),m;delete jn[e];for(let v=0,y=_.length;v<y;v++){const T=_[v];T.onError&&T.onError(m)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class lx extends rl{constructor(e){super(e)}load(e,t,n,i){const s=this,l=new J0,u=new ax(this.manager);return u.setResponseType("arraybuffer"),u.setRequestHeader(this.requestHeader),u.setPath(this.path),u.setWithCredentials(s.withCredentials),u.load(e,function(c){let m;try{m=s.parse(c)}catch(_){if(i!==void 0)i(_);else{console.error(_);return}}m.image!==void 0?l.image=m.image:m.data!==void 0&&(l.image.width=m.width,l.image.height=m.height,l.image.data=m.data),l.wrapS=m.wrapS!==void 0?m.wrapS:oi,l.wrapT=m.wrapT!==void 0?m.wrapT:oi,l.magFilter=m.magFilter!==void 0?m.magFilter:ln,l.minFilter=m.minFilter!==void 0?m.minFilter:ln,l.anisotropy=m.anisotropy!==void 0?m.anisotropy:1,m.colorSpace!==void 0&&(l.colorSpace=m.colorSpace),m.flipY!==void 0&&(l.flipY=m.flipY),m.format!==void 0&&(l.format=m.format),m.type!==void 0&&(l.type=m.type),m.mipmaps!==void 0&&(l.mipmaps=m.mipmaps,l.minFilter=Mi),m.mipmapCount===1&&(l.minFilter=ln),m.generateMipmaps!==void 0&&(l.generateMipmaps=m.generateMipmaps),l.needsUpdate=!0,t&&t(l,m)},n,i),l}}class Mf extends xf{constructor(e=-1,t=1,n=1,i=-1,s=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=l,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,l=n+e,u=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=m*this.view.offsetX,l=s+m*this.view.width,u-=_*this.view.offsetY,c=u-_*this.view.height}this.projectionMatrix.makeOrthographic(s,l,u,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class ux extends An{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class cx{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=lc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=lc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function lc(){return performance.now()}function uc(o,e,t,n){const i=fx(n);switch(t){case af:return o*e;case Ja:return o*e/i.components*i.byteLength;case Qa:return o*e/i.components*i.byteLength;case uf:return o*e*2/i.components*i.byteLength;case ja:return o*e*2/i.components*i.byteLength;case lf:return o*e*3/i.components*i.byteLength;case In:return o*e*4/i.components*i.byteLength;case el:return o*e*4/i.components*i.byteLength;case Or:case kr:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case Gr:case Hr:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case fa:case ha:return Math.max(o,16)*Math.max(e,8)/4;case ca:case da:return Math.max(o,8)*Math.max(e,8)/2;case pa:case ma:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case ga:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case _a:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case va:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case ya:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case xa:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case Ea:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case Ta:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case Sa:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case Ma:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case Ca:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case Aa:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case wa:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case Ra:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Ia:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case Pa:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case zr:case Da:case ba:return Math.ceil(o/4)*Math.ceil(e/4)*16;case cf:case Ua:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Na:case La:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function fx(o){switch(o){case li:case of:return{byteLength:1,components:1};case $o:case rf:case En:return{byteLength:2,components:1};case Ka:case Za:return{byteLength:2,components:4};case Xi:case Ya:case Rn:return{byteLength:4,components:1};case sf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xa);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Cf(){let o=null,e=!1,t=null,n=null;function i(s,l){t(s,l),n=o.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=o.requestAnimationFrame(i),e=!0)},stop:function(){o.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){o=s}}}function dx(o){const e=new WeakMap;function t(u,c){const m=u.array,_=u.usage,v=m.byteLength,y=o.createBuffer();o.bindBuffer(c,y),o.bufferData(c,m,_),u.onUploadCallback();let T;if(m instanceof Float32Array)T=o.FLOAT;else if(m instanceof Uint16Array)u.isFloat16BufferAttribute?T=o.HALF_FLOAT:T=o.UNSIGNED_SHORT;else if(m instanceof Int16Array)T=o.SHORT;else if(m instanceof Uint32Array)T=o.UNSIGNED_INT;else if(m instanceof Int32Array)T=o.INT;else if(m instanceof Int8Array)T=o.BYTE;else if(m instanceof Uint8Array)T=o.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)T=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:y,type:T,bytesPerElement:m.BYTES_PER_ELEMENT,version:u.version,size:v}}function n(u,c,m){const _=c.array,v=c.updateRanges;if(o.bindBuffer(m,u),v.length===0)o.bufferSubData(m,0,_);else{v.sort((T,w)=>T.start-w.start);let y=0;for(let T=1;T<v.length;T++){const w=v[y],P=v[T];P.start<=w.start+w.count+1?w.count=Math.max(w.count,P.start+P.count-w.start):(++y,v[y]=P)}v.length=y+1;for(let T=0,w=v.length;T<w;T++){const P=v[T];o.bufferSubData(m,P.start*_.BYTES_PER_ELEMENT,_,P.start,P.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(u){return u.isInterleavedBufferAttribute&&(u=u.data),e.get(u)}function s(u){u.isInterleavedBufferAttribute&&(u=u.data);const c=e.get(u);c&&(o.deleteBuffer(c.buffer),e.delete(u))}function l(u,c){if(u.isInterleavedBufferAttribute&&(u=u.data),u.isGLBufferAttribute){const _=e.get(u);(!_||_.version<u.version)&&e.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}const m=e.get(u);if(m===void 0)e.set(u,t(u,c));else if(m.version<u.version){if(m.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(m.buffer,u,c),m.version=u.version}}return{get:i,remove:s,update:l}}var hx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,px=`#ifdef USE_ALPHAHASH
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
#endif`,mx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_x=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yx=`#ifdef USE_AOMAP
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
#endif`,xx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ex=`#ifdef USE_BATCHING
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
#endif`,Tx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ax=`#ifdef USE_IRIDESCENCE
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
#endif`,wx=`#ifdef USE_BUMPMAP
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
#endif`,Rx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ix=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Px=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ux=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Nx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Lx=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Fx=`#define PI 3.141592653589793
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
} // validated`,Bx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Vx=`vec3 transformedNormal = objectNormal;
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
#endif`,Ox=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qx=`#ifdef USE_ENVMAP
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
#endif`,$x=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xx=`#ifdef USE_ENVMAP
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
#endif`,Yx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kx=`#ifdef USE_ENVMAP
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
#endif`,Zx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,eE=`#ifdef USE_GRADIENTMAP
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
}`,tE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,iE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,oE=`uniform bool receiveShadow;
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
#endif`,rE=`#ifdef USE_ENVMAP
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
#endif`,sE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,aE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,uE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cE=`PhysicalMaterial material;
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
#endif`,fE=`struct PhysicalMaterial {
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
}`,dE=`
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
#endif`,hE=`#if defined( RE_IndirectDiffuse )
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
#endif`,pE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_E=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,EE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,TE=`#if defined( USE_POINTS_UV )
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
#endif`,SE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ME=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,CE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,AE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,RE=`#ifdef USE_MORPHTARGETS
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
#endif`,IE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,PE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,DE=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,bE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,UE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,NE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,LE=`#ifdef USE_NORMALMAP
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
#endif`,FE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,BE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,VE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,OE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,GE=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,HE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,WE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$E=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,XE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,YE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,KE=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ZE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,JE=`float getShadowMask() {
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
}`,QE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jE=`#ifdef USE_SKINNING
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
#endif`,eT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tT=`#ifdef USE_SKINNING
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
#endif`,nT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,iT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,oT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,sT=`#ifdef USE_TRANSMISSION
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
#endif`,aT=`#ifdef USE_TRANSMISSION
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
#endif`,lT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hT=`uniform sampler2D t2D;
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
}`,pT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,gT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_T=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vT=`#include <common>
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
}`,yT=`#if DEPTH_PACKING == 3200
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
}`,xT=`#define DISTANCE
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
}`,ET=`#define DISTANCE
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
}`,TT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ST=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,MT=`uniform float scale;
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
}`,CT=`uniform vec3 diffuse;
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
}`,AT=`#include <common>
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
}`,wT=`uniform vec3 diffuse;
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
}`,RT=`#define LAMBERT
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
}`,IT=`#define LAMBERT
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
}`,PT=`#define MATCAP
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
}`,DT=`#define MATCAP
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
}`,bT=`#define NORMAL
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
}`,UT=`#define NORMAL
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
}`,NT=`#define PHONG
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
}`,LT=`#define PHONG
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
}`,FT=`#define STANDARD
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
}`,BT=`#define STANDARD
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
}`,VT=`#define TOON
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
}`,OT=`#define TOON
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
}`,kT=`uniform float size;
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
}`,GT=`uniform vec3 diffuse;
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
}`,HT=`#include <common>
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
}`,zT=`uniform vec3 color;
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
}`,WT=`uniform float rotation;
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
}`,qT=`uniform vec3 diffuse;
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
}`,pt={alphahash_fragment:hx,alphahash_pars_fragment:px,alphamap_fragment:mx,alphamap_pars_fragment:gx,alphatest_fragment:_x,alphatest_pars_fragment:vx,aomap_fragment:yx,aomap_pars_fragment:xx,batching_pars_vertex:Ex,batching_vertex:Tx,begin_vertex:Sx,beginnormal_vertex:Mx,bsdfs:Cx,iridescence_fragment:Ax,bumpmap_pars_fragment:wx,clipping_planes_fragment:Rx,clipping_planes_pars_fragment:Ix,clipping_planes_pars_vertex:Px,clipping_planes_vertex:Dx,color_fragment:bx,color_pars_fragment:Ux,color_pars_vertex:Nx,color_vertex:Lx,common:Fx,cube_uv_reflection_fragment:Bx,defaultnormal_vertex:Vx,displacementmap_pars_vertex:Ox,displacementmap_vertex:kx,emissivemap_fragment:Gx,emissivemap_pars_fragment:Hx,colorspace_fragment:zx,colorspace_pars_fragment:Wx,envmap_fragment:qx,envmap_common_pars_fragment:$x,envmap_pars_fragment:Xx,envmap_pars_vertex:Yx,envmap_physical_pars_fragment:rE,envmap_vertex:Kx,fog_vertex:Zx,fog_pars_vertex:Jx,fog_fragment:Qx,fog_pars_fragment:jx,gradientmap_pars_fragment:eE,lightmap_pars_fragment:tE,lights_lambert_fragment:nE,lights_lambert_pars_fragment:iE,lights_pars_begin:oE,lights_toon_fragment:sE,lights_toon_pars_fragment:aE,lights_phong_fragment:lE,lights_phong_pars_fragment:uE,lights_physical_fragment:cE,lights_physical_pars_fragment:fE,lights_fragment_begin:dE,lights_fragment_maps:hE,lights_fragment_end:pE,logdepthbuf_fragment:mE,logdepthbuf_pars_fragment:gE,logdepthbuf_pars_vertex:_E,logdepthbuf_vertex:vE,map_fragment:yE,map_pars_fragment:xE,map_particle_fragment:EE,map_particle_pars_fragment:TE,metalnessmap_fragment:SE,metalnessmap_pars_fragment:ME,morphinstance_vertex:CE,morphcolor_vertex:AE,morphnormal_vertex:wE,morphtarget_pars_vertex:RE,morphtarget_vertex:IE,normal_fragment_begin:PE,normal_fragment_maps:DE,normal_pars_fragment:bE,normal_pars_vertex:UE,normal_vertex:NE,normalmap_pars_fragment:LE,clearcoat_normal_fragment_begin:FE,clearcoat_normal_fragment_maps:BE,clearcoat_pars_fragment:VE,iridescence_pars_fragment:OE,opaque_fragment:kE,packing:GE,premultiplied_alpha_fragment:HE,project_vertex:zE,dithering_fragment:WE,dithering_pars_fragment:qE,roughnessmap_fragment:$E,roughnessmap_pars_fragment:XE,shadowmap_pars_fragment:YE,shadowmap_pars_vertex:KE,shadowmap_vertex:ZE,shadowmask_pars_fragment:JE,skinbase_vertex:QE,skinning_pars_vertex:jE,skinning_vertex:eT,skinnormal_vertex:tT,specularmap_fragment:nT,specularmap_pars_fragment:iT,tonemapping_fragment:oT,tonemapping_pars_fragment:rT,transmission_fragment:sT,transmission_pars_fragment:aT,uv_pars_fragment:lT,uv_pars_vertex:uT,uv_vertex:cT,worldpos_vertex:fT,background_vert:dT,background_frag:hT,backgroundCube_vert:pT,backgroundCube_frag:mT,cube_vert:gT,cube_frag:_T,depth_vert:vT,depth_frag:yT,distanceRGBA_vert:xT,distanceRGBA_frag:ET,equirect_vert:TT,equirect_frag:ST,linedashed_vert:MT,linedashed_frag:CT,meshbasic_vert:AT,meshbasic_frag:wT,meshlambert_vert:RT,meshlambert_frag:IT,meshmatcap_vert:PT,meshmatcap_frag:DT,meshnormal_vert:bT,meshnormal_frag:UT,meshphong_vert:NT,meshphong_frag:LT,meshphysical_vert:FT,meshphysical_frag:BT,meshtoon_vert:VT,meshtoon_frag:OT,points_vert:kT,points_frag:GT,shadow_vert:HT,shadow_frag:zT,sprite_vert:WT,sprite_frag:qT},Fe={common:{diffuse:{value:new Et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new Et(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},Wn={basic:{uniforms:an([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.fog]),vertexShader:pt.meshbasic_vert,fragmentShader:pt.meshbasic_frag},lambert:{uniforms:an([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,Fe.lights,{emissive:{value:new Et(0)}}]),vertexShader:pt.meshlambert_vert,fragmentShader:pt.meshlambert_frag},phong:{uniforms:an([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,Fe.lights,{emissive:{value:new Et(0)},specular:{value:new Et(1118481)},shininess:{value:30}}]),vertexShader:pt.meshphong_vert,fragmentShader:pt.meshphong_frag},standard:{uniforms:an([Fe.common,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.roughnessmap,Fe.metalnessmap,Fe.fog,Fe.lights,{emissive:{value:new Et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag},toon:{uniforms:an([Fe.common,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.gradientmap,Fe.fog,Fe.lights,{emissive:{value:new Et(0)}}]),vertexShader:pt.meshtoon_vert,fragmentShader:pt.meshtoon_frag},matcap:{uniforms:an([Fe.common,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,{matcap:{value:null}}]),vertexShader:pt.meshmatcap_vert,fragmentShader:pt.meshmatcap_frag},points:{uniforms:an([Fe.points,Fe.fog]),vertexShader:pt.points_vert,fragmentShader:pt.points_frag},dashed:{uniforms:an([Fe.common,Fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pt.linedashed_vert,fragmentShader:pt.linedashed_frag},depth:{uniforms:an([Fe.common,Fe.displacementmap]),vertexShader:pt.depth_vert,fragmentShader:pt.depth_frag},normal:{uniforms:an([Fe.common,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,{opacity:{value:1}}]),vertexShader:pt.meshnormal_vert,fragmentShader:pt.meshnormal_frag},sprite:{uniforms:an([Fe.sprite,Fe.fog]),vertexShader:pt.sprite_vert,fragmentShader:pt.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pt.background_vert,fragmentShader:pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:pt.backgroundCube_vert,fragmentShader:pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pt.cube_vert,fragmentShader:pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pt.equirect_vert,fragmentShader:pt.equirect_frag},distanceRGBA:{uniforms:an([Fe.common,Fe.displacementmap,{referencePosition:{value:new ie},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pt.distanceRGBA_vert,fragmentShader:pt.distanceRGBA_frag},shadow:{uniforms:an([Fe.lights,Fe.fog,{color:{value:new Et(0)},opacity:{value:1}}]),vertexShader:pt.shadow_vert,fragmentShader:pt.shadow_frag}};Wn.physical={uniforms:an([Wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new Et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new Et(0)},specularColor:{value:new Et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:pt.meshphysical_vert,fragmentShader:pt.meshphysical_frag};const Dr={r:0,b:0,g:0},Vi=new Gn,$T=new $t;function XT(o,e,t,n,i,s,l){const u=new Et(0);let c=s===!0?0:1,m,_,v=null,y=0,T=null;function w(N){let b=N.isScene===!0?N.background:null;return b&&b.isTexture&&(b=(N.backgroundBlurriness>0?t:e).get(b)),b}function P(N){let b=!1;const X=w(N);X===null?E(u,c):X&&X.isColor&&(E(X,1),b=!0);const q=o.xr.getEnvironmentBlendMode();q==="additive"?n.buffers.color.setClear(0,0,0,1,l):q==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,l),(o.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function C(N,b){const X=w(b);X&&(X.isCubeTexture||X.mapping===ls)?(_===void 0&&(_=new Pn(new ir(1,1,1),new un({name:"BackgroundCubeMaterial",uniforms:Mo(Wn.backgroundCube.uniforms),vertexShader:Wn.backgroundCube.vertexShader,fragmentShader:Wn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),_.geometry.deleteAttribute("normal"),_.geometry.deleteAttribute("uv"),_.onBeforeRender=function(q,W,K){this.matrixWorld.copyPosition(K.matrixWorld)},Object.defineProperty(_.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(_)),Vi.copy(b.backgroundRotation),Vi.x*=-1,Vi.y*=-1,Vi.z*=-1,X.isCubeTexture&&X.isRenderTargetTexture===!1&&(Vi.y*=-1,Vi.z*=-1),_.material.uniforms.envMap.value=X,_.material.uniforms.flipEnvMap.value=X.isCubeTexture&&X.isRenderTargetTexture===!1?-1:1,_.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,_.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,_.material.uniforms.backgroundRotation.value.setFromMatrix4($T.makeRotationFromEuler(Vi)),_.material.toneMapped=Rt.getTransfer(X.colorSpace)!==Lt,(v!==X||y!==X.version||T!==o.toneMapping)&&(_.material.needsUpdate=!0,v=X,y=X.version,T=o.toneMapping),_.layers.enableAll(),N.unshift(_,_.geometry,_.material,0,0,null)):X&&X.isTexture&&(m===void 0&&(m=new Pn(new us(2,2),new un({name:"BackgroundMaterial",uniforms:Mo(Wn.background.uniforms),vertexShader:Wn.background.vertexShader,fragmentShader:Wn.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(m)),m.material.uniforms.t2D.value=X,m.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,m.material.toneMapped=Rt.getTransfer(X.colorSpace)!==Lt,X.matrixAutoUpdate===!0&&X.updateMatrix(),m.material.uniforms.uvTransform.value.copy(X.matrix),(v!==X||y!==X.version||T!==o.toneMapping)&&(m.material.needsUpdate=!0,v=X,y=X.version,T=o.toneMapping),m.layers.enableAll(),N.unshift(m,m.geometry,m.material,0,0,null))}function E(N,b){N.getRGB(Dr,yf(o)),n.buffers.color.setClear(Dr.r,Dr.g,Dr.b,b,l)}function O(){_!==void 0&&(_.geometry.dispose(),_.material.dispose(),_=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return u},setClearColor:function(N,b=1){u.set(N),c=b,E(u,c)},getClearAlpha:function(){return c},setClearAlpha:function(N){c=N,E(u,c)},render:P,addToRenderList:C,dispose:O}}function YT(o,e){const t=o.getParameter(o.MAX_VERTEX_ATTRIBS),n={},i=y(null);let s=i,l=!1;function u(D,$,ae,re,pe){let xe=!1;const de=v(re,ae,$);s!==de&&(s=de,m(s.object)),xe=T(D,re,ae,pe),xe&&w(D,re,ae,pe),pe!==null&&e.update(pe,o.ELEMENT_ARRAY_BUFFER),(xe||l)&&(l=!1,b(D,$,ae,re),pe!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(pe).buffer))}function c(){return o.createVertexArray()}function m(D){return o.bindVertexArray(D)}function _(D){return o.deleteVertexArray(D)}function v(D,$,ae){const re=ae.wireframe===!0;let pe=n[D.id];pe===void 0&&(pe={},n[D.id]=pe);let xe=pe[$.id];xe===void 0&&(xe={},pe[$.id]=xe);let de=xe[re];return de===void 0&&(de=y(c()),xe[re]=de),de}function y(D){const $=[],ae=[],re=[];for(let pe=0;pe<t;pe++)$[pe]=0,ae[pe]=0,re[pe]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:$,enabledAttributes:ae,attributeDivisors:re,object:D,attributes:{},index:null}}function T(D,$,ae,re){const pe=s.attributes,xe=$.attributes;let de=0;const Ee=ae.getAttributes();for(const ue in Ee)if(Ee[ue].location>=0){const Ue=pe[ue];let We=xe[ue];if(We===void 0&&(ue==="instanceMatrix"&&D.instanceMatrix&&(We=D.instanceMatrix),ue==="instanceColor"&&D.instanceColor&&(We=D.instanceColor)),Ue===void 0||Ue.attribute!==We||We&&Ue.data!==We.data)return!0;de++}return s.attributesNum!==de||s.index!==re}function w(D,$,ae,re){const pe={},xe=$.attributes;let de=0;const Ee=ae.getAttributes();for(const ue in Ee)if(Ee[ue].location>=0){let Ue=xe[ue];Ue===void 0&&(ue==="instanceMatrix"&&D.instanceMatrix&&(Ue=D.instanceMatrix),ue==="instanceColor"&&D.instanceColor&&(Ue=D.instanceColor));const We={};We.attribute=Ue,Ue&&Ue.data&&(We.data=Ue.data),pe[ue]=We,de++}s.attributes=pe,s.attributesNum=de,s.index=re}function P(){const D=s.newAttributes;for(let $=0,ae=D.length;$<ae;$++)D[$]=0}function C(D){E(D,0)}function E(D,$){const ae=s.newAttributes,re=s.enabledAttributes,pe=s.attributeDivisors;ae[D]=1,re[D]===0&&(o.enableVertexAttribArray(D),re[D]=1),pe[D]!==$&&(o.vertexAttribDivisor(D,$),pe[D]=$)}function O(){const D=s.newAttributes,$=s.enabledAttributes;for(let ae=0,re=$.length;ae<re;ae++)$[ae]!==D[ae]&&(o.disableVertexAttribArray(ae),$[ae]=0)}function N(D,$,ae,re,pe,xe,de){de===!0?o.vertexAttribIPointer(D,$,ae,pe,xe):o.vertexAttribPointer(D,$,ae,re,pe,xe)}function b(D,$,ae,re){P();const pe=re.attributes,xe=ae.getAttributes(),de=$.defaultAttributeValues;for(const Ee in xe){const ue=xe[Ee];if(ue.location>=0){let Ie=pe[Ee];if(Ie===void 0&&(Ee==="instanceMatrix"&&D.instanceMatrix&&(Ie=D.instanceMatrix),Ee==="instanceColor"&&D.instanceColor&&(Ie=D.instanceColor)),Ie!==void 0){const Ue=Ie.normalized,We=Ie.itemSize,tt=e.get(Ie);if(tt===void 0)continue;const ht=tt.buffer,fe=tt.type,we=tt.bytesPerElement,Ae=fe===o.INT||fe===o.UNSIGNED_INT||Ie.gpuType===Ya;if(Ie.isInterleavedBufferAttribute){const Pe=Ie.data,qe=Pe.stride,mt=Ie.offset;if(Pe.isInstancedInterleavedBuffer){for(let nt=0;nt<ue.locationSize;nt++)E(ue.location+nt,Pe.meshPerAttribute);D.isInstancedMesh!==!0&&re._maxInstanceCount===void 0&&(re._maxInstanceCount=Pe.meshPerAttribute*Pe.count)}else for(let nt=0;nt<ue.locationSize;nt++)C(ue.location+nt);o.bindBuffer(o.ARRAY_BUFFER,ht);for(let nt=0;nt<ue.locationSize;nt++)N(ue.location+nt,We/ue.locationSize,fe,Ue,qe*we,(mt+We/ue.locationSize*nt)*we,Ae)}else{if(Ie.isInstancedBufferAttribute){for(let Pe=0;Pe<ue.locationSize;Pe++)E(ue.location+Pe,Ie.meshPerAttribute);D.isInstancedMesh!==!0&&re._maxInstanceCount===void 0&&(re._maxInstanceCount=Ie.meshPerAttribute*Ie.count)}else for(let Pe=0;Pe<ue.locationSize;Pe++)C(ue.location+Pe);o.bindBuffer(o.ARRAY_BUFFER,ht);for(let Pe=0;Pe<ue.locationSize;Pe++)N(ue.location+Pe,We/ue.locationSize,fe,Ue,We*we,We/ue.locationSize*Pe*we,Ae)}}else if(de!==void 0){const Ue=de[Ee];if(Ue!==void 0)switch(Ue.length){case 2:o.vertexAttrib2fv(ue.location,Ue);break;case 3:o.vertexAttrib3fv(ue.location,Ue);break;case 4:o.vertexAttrib4fv(ue.location,Ue);break;default:o.vertexAttrib1fv(ue.location,Ue)}}}}O()}function X(){K();for(const D in n){const $=n[D];for(const ae in $){const re=$[ae];for(const pe in re)_(re[pe].object),delete re[pe];delete $[ae]}delete n[D]}}function q(D){if(n[D.id]===void 0)return;const $=n[D.id];for(const ae in $){const re=$[ae];for(const pe in re)_(re[pe].object),delete re[pe];delete $[ae]}delete n[D.id]}function W(D){for(const $ in n){const ae=n[$];if(ae[D.id]===void 0)continue;const re=ae[D.id];for(const pe in re)_(re[pe].object),delete re[pe];delete ae[D.id]}}function K(){B(),l=!0,s!==i&&(s=i,m(s.object))}function B(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:u,reset:K,resetDefaultState:B,dispose:X,releaseStatesOfGeometry:q,releaseStatesOfProgram:W,initAttributes:P,enableAttribute:C,disableUnusedAttributes:O}}function KT(o,e,t){let n;function i(m){n=m}function s(m,_){o.drawArrays(n,m,_),t.update(_,n,1)}function l(m,_,v){v!==0&&(o.drawArraysInstanced(n,m,_,v),t.update(_,n,v))}function u(m,_,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,m,0,_,0,v);let T=0;for(let w=0;w<v;w++)T+=_[w];t.update(T,n,1)}function c(m,_,v,y){if(v===0)return;const T=e.get("WEBGL_multi_draw");if(T===null)for(let w=0;w<m.length;w++)l(m[w],_[w],y[w]);else{T.multiDrawArraysInstancedWEBGL(n,m,0,_,0,y,0,v);let w=0;for(let P=0;P<v;P++)w+=_[P]*y[P];t.update(w,n,1)}}this.setMode=i,this.render=s,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=c}function ZT(o,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const W=e.get("EXT_texture_filter_anisotropic");i=o.getParameter(W.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function l(W){return!(W!==In&&n.convert(W)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function u(W){const K=W===En&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(W!==li&&n.convert(W)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&W!==Rn&&!K)}function c(W){if(W==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";W="mediump"}return W==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=t.precision!==void 0?t.precision:"highp";const _=c(m);_!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",_,"instead."),m=_);const v=t.logarithmicDepthBuffer===!0,y=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),T=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),w=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),P=o.getParameter(o.MAX_TEXTURE_SIZE),C=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),E=o.getParameter(o.MAX_VERTEX_ATTRIBS),O=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),N=o.getParameter(o.MAX_VARYING_VECTORS),b=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),X=w>0,q=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:l,textureTypeReadable:u,precision:m,logarithmicDepthBuffer:v,reverseDepthBuffer:y,maxTextures:T,maxVertexTextures:w,maxTextureSize:P,maxCubemapSize:C,maxAttributes:E,maxVertexUniforms:O,maxVaryings:N,maxFragmentUniforms:b,vertexTextures:X,maxSamples:q}}function JT(o){const e=this;let t=null,n=0,i=!1,s=!1;const l=new ki,u=new dt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(v,y){const T=v.length!==0||y||n!==0||i;return i=y,n=v.length,T},this.beginShadows=function(){s=!0,_(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(v,y){t=_(v,y,0)},this.setState=function(v,y,T){const w=v.clippingPlanes,P=v.clipIntersection,C=v.clipShadows,E=o.get(v);if(!i||w===null||w.length===0||s&&!C)s?_(null):m();else{const O=s?0:n,N=O*4;let b=E.clippingState||null;c.value=b,b=_(w,y,N,T);for(let X=0;X!==N;++X)b[X]=t[X];E.clippingState=b,this.numIntersection=P?this.numPlanes:0,this.numPlanes+=O}};function m(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function _(v,y,T,w){const P=v!==null?v.length:0;let C=null;if(P!==0){if(C=c.value,w!==!0||C===null){const E=T+P*4,O=y.matrixWorldInverse;u.getNormalMatrix(O),(C===null||C.length<E)&&(C=new Float32Array(E));for(let N=0,b=T;N!==P;++N,b+=4)l.copy(v[N]).applyMatrix4(O,u),l.normal.toArray(C,b),C[b+3]=l.constant}c.value=C,c.needsUpdate=!0}return e.numPlanes=P,e.numIntersection=0,C}}function QT(o){let e=new WeakMap;function t(l,u){return u===Qr?l.mapping=To:u===aa&&(l.mapping=So),l}function n(l){if(l&&l.isTexture){const u=l.mapping;if(u===Qr||u===aa)if(e.has(l)){const c=e.get(l).texture;return t(c,l.mapping)}else{const c=l.image;if(c&&c.height>0){const m=new Y0(c.height);return m.fromEquirectangularTexture(o,l),e.set(l,m),l.addEventListener("dispose",i),t(m.texture,l.mapping)}else return null}}return l}function i(l){const u=l.target;u.removeEventListener("dispose",i);const c=e.get(u);c!==void 0&&(e.delete(u),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const mo=4,cc=[.125,.215,.35,.446,.526,.582],zi=20,Bs=new Mf,fc=new Et;let Vs=null,Os=0,ks=0,Gs=!1;const Gi=(1+Math.sqrt(5))/2,fo=1/Gi,dc=[new ie(-Gi,fo,0),new ie(Gi,fo,0),new ie(-fo,0,Gi),new ie(fo,0,Gi),new ie(0,Gi,-fo),new ie(0,Gi,fo),new ie(-1,1,-1),new ie(1,1,-1),new ie(-1,1,1),new ie(1,1,1)],jT=new ie;class Va{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){const{size:l=256,position:u=jT}=s;Vs=this._renderer.getRenderTarget(),Os=this._renderer.getActiveCubeFace(),ks=this._renderer.getActiveMipmapLevel(),Gs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(l);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,u),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Vs,Os,ks),this._renderer.xr.enabled=Gs,e.scissorTest=!1,br(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===To||e.mapping===So?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vs=this._renderer.getRenderTarget(),Os=this._renderer.getActiveCubeFace(),ks=this._renderer.getActiveMipmapLevel(),Gs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:En,format:In,colorSpace:Ri,depthBuffer:!1},i=hc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hc(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=eS(s)),this._blurMaterial=tS(s,e,t)}return i}_compileMaterial(e){const t=new Pn(this._lodPlanes[0],e);this._renderer.compile(t,Bs)}_sceneToCubeUV(e,t,n,i,s){const c=new An(90,1,t,n),m=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],v=this._renderer,y=v.autoClear,T=v.toneMapping;v.getClearColor(fc),v.toneMapping=Ai,v.autoClear=!1;const w=new il({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),P=new Pn(new ir,w);let C=!1;const E=e.background;E?E.isColor&&(w.color.copy(E),e.background=null,C=!0):(w.color.copy(fc),C=!0);for(let O=0;O<6;O++){const N=O%3;N===0?(c.up.set(0,m[O],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+_[O],s.y,s.z)):N===1?(c.up.set(0,0,m[O]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+_[O],s.z)):(c.up.set(0,m[O],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+_[O]));const b=this._cubeSize;br(i,N*b,O>2?b:0,b,b),v.setRenderTarget(i),C&&v.render(P,c),v.render(e,c)}P.geometry.dispose(),P.material.dispose(),v.toneMapping=T,v.autoClear=y,e.background=E}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===To||e.mapping===So;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pc());const s=i?this._cubemapMaterial:this._equirectMaterial,l=new Pn(this._lodPlanes[0],s),u=s.uniforms;u.envMap.value=e;const c=this._cubeSize;br(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(l,Bs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const l=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),u=dc[(i-s-1)%dc.length];this._blur(e,s-1,s,l,u)}t.autoClear=n}_blur(e,t,n,i,s){const l=this._pingPongRenderTarget;this._halfBlur(e,l,t,n,i,"latitudinal",s),this._halfBlur(l,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,l,u){const c=this._renderer,m=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const _=3,v=new Pn(this._lodPlanes[i],m),y=m.uniforms,T=this._sizeLods[n]-1,w=isFinite(s)?Math.PI/(2*T):2*Math.PI/(2*zi-1),P=s/w,C=isFinite(s)?1+Math.floor(_*P):zi;C>zi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${C} samples when the maximum is set to ${zi}`);const E=[];let O=0;for(let W=0;W<zi;++W){const K=W/P,B=Math.exp(-K*K/2);E.push(B),W===0?O+=B:W<C&&(O+=2*B)}for(let W=0;W<E.length;W++)E[W]=E[W]/O;y.envMap.value=e.texture,y.samples.value=C,y.weights.value=E,y.latitudinal.value=l==="latitudinal",u&&(y.poleAxis.value=u);const{_lodMax:N}=this;y.dTheta.value=w,y.mipInt.value=N-n;const b=this._sizeLods[i],X=3*b*(i>N-mo?i-N+mo:0),q=4*(this._cubeSize-b);br(t,X,q,3*b,2*b),c.setRenderTarget(t),c.render(v,Bs)}}function eS(o){const e=[],t=[],n=[];let i=o;const s=o-mo+1+cc.length;for(let l=0;l<s;l++){const u=Math.pow(2,i);t.push(u);let c=1/u;l>o-mo?c=cc[l-o+mo-1]:l===0&&(c=0),n.push(c);const m=1/(u-2),_=-m,v=1+m,y=[_,_,v,_,v,v,_,_,v,v,_,v],T=6,w=6,P=3,C=2,E=1,O=new Float32Array(P*w*T),N=new Float32Array(C*w*T),b=new Float32Array(E*w*T);for(let q=0;q<T;q++){const W=q%3*2/3-1,K=q>2?0:-1,B=[W,K,0,W+2/3,K,0,W+2/3,K+1,0,W,K,0,W+2/3,K+1,0,W,K+1,0];O.set(B,P*w*q),N.set(y,C*w*q);const D=[q,q,q,q,q,q];b.set(D,E*w*q)}const X=new ui;X.setAttribute("position",new qn(O,P)),X.setAttribute("uv",new qn(N,C)),X.setAttribute("faceIndex",new qn(b,E)),e.push(X),i>mo&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function hc(o,e,t){const n=new kn(o,e,t);return n.texture.mapping=ls,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function br(o,e,t,n,i){o.viewport.set(e,t,n,i),o.scissor.set(e,t,n,i)}function tS(o,e,t){const n=new Float32Array(zi),i=new ie(0,1,0);return new un({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:sl(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function pc(){return new un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sl(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function mc(){return new un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function sl(){return`

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
	`}function nS(o){let e=new WeakMap,t=null;function n(u){if(u&&u.isTexture){const c=u.mapping,m=c===Qr||c===aa,_=c===To||c===So;if(m||_){let v=e.get(u);const y=v!==void 0?v.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==y)return t===null&&(t=new Va(o)),v=m?t.fromEquirectangular(u,v):t.fromCubemap(u,v),v.texture.pmremVersion=u.pmremVersion,e.set(u,v),v.texture;if(v!==void 0)return v.texture;{const T=u.image;return m&&T&&T.height>0||_&&T&&i(T)?(t===null&&(t=new Va(o)),v=m?t.fromEquirectangular(u):t.fromCubemap(u),v.texture.pmremVersion=u.pmremVersion,e.set(u,v),u.addEventListener("dispose",s),v.texture):null}}}return u}function i(u){let c=0;const m=6;for(let _=0;_<m;_++)u[_]!==void 0&&c++;return c===m}function s(u){const c=u.target;c.removeEventListener("dispose",s);const m=e.get(c);m!==void 0&&(e.delete(c),m.dispose())}function l(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:l}}function iS(o){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=o.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Wr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function oS(o,e,t,n){const i={},s=new WeakMap;function l(v){const y=v.target;y.index!==null&&e.remove(y.index);for(const w in y.attributes)e.remove(y.attributes[w]);y.removeEventListener("dispose",l),delete i[y.id];const T=s.get(y);T&&(e.remove(T),s.delete(y)),n.releaseStatesOfGeometry(y),y.isInstancedBufferGeometry===!0&&delete y._maxInstanceCount,t.memory.geometries--}function u(v,y){return i[y.id]===!0||(y.addEventListener("dispose",l),i[y.id]=!0,t.memory.geometries++),y}function c(v){const y=v.attributes;for(const T in y)e.update(y[T],o.ARRAY_BUFFER)}function m(v){const y=[],T=v.index,w=v.attributes.position;let P=0;if(T!==null){const O=T.array;P=T.version;for(let N=0,b=O.length;N<b;N+=3){const X=O[N+0],q=O[N+1],W=O[N+2];y.push(X,q,q,W,W,X)}}else if(w!==void 0){const O=w.array;P=w.version;for(let N=0,b=O.length/3-1;N<b;N+=3){const X=N+0,q=N+1,W=N+2;y.push(X,q,q,W,W,X)}}else return;const C=new(hf(y)?vf:_f)(y,1);C.version=P;const E=s.get(v);E&&e.remove(E),s.set(v,C)}function _(v){const y=s.get(v);if(y){const T=v.index;T!==null&&y.version<T.version&&m(v)}else m(v);return s.get(v)}return{get:u,update:c,getWireframeAttribute:_}}function rS(o,e,t){let n;function i(y){n=y}let s,l;function u(y){s=y.type,l=y.bytesPerElement}function c(y,T){o.drawElements(n,T,s,y*l),t.update(T,n,1)}function m(y,T,w){w!==0&&(o.drawElementsInstanced(n,T,s,y*l,w),t.update(T,n,w))}function _(y,T,w){if(w===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,T,0,s,y,0,w);let C=0;for(let E=0;E<w;E++)C+=T[E];t.update(C,n,1)}function v(y,T,w,P){if(w===0)return;const C=e.get("WEBGL_multi_draw");if(C===null)for(let E=0;E<y.length;E++)m(y[E]/l,T[E],P[E]);else{C.multiDrawElementsInstancedWEBGL(n,T,0,s,y,0,P,0,w);let E=0;for(let O=0;O<w;O++)E+=T[O]*P[O];t.update(E,n,1)}}this.setMode=i,this.setIndex=u,this.render=c,this.renderInstances=m,this.renderMultiDraw=_,this.renderMultiDrawInstances=v}function sS(o){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,l,u){switch(t.calls++,l){case o.TRIANGLES:t.triangles+=u*(s/3);break;case o.LINES:t.lines+=u*(s/2);break;case o.LINE_STRIP:t.lines+=u*(s-1);break;case o.LINE_LOOP:t.lines+=u*s;break;case o.POINTS:t.points+=u*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function aS(o,e,t){const n=new WeakMap,i=new Vt;function s(l,u,c){const m=l.morphTargetInfluences,_=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,v=_!==void 0?_.length:0;let y=n.get(u);if(y===void 0||y.count!==v){let D=function(){K.dispose(),n.delete(u),u.removeEventListener("dispose",D)};var T=D;y!==void 0&&y.texture.dispose();const w=u.morphAttributes.position!==void 0,P=u.morphAttributes.normal!==void 0,C=u.morphAttributes.color!==void 0,E=u.morphAttributes.position||[],O=u.morphAttributes.normal||[],N=u.morphAttributes.color||[];let b=0;w===!0&&(b=1),P===!0&&(b=2),C===!0&&(b=3);let X=u.attributes.position.count*b,q=1;X>e.maxTextureSize&&(q=Math.ceil(X/e.maxTextureSize),X=e.maxTextureSize);const W=new Float32Array(X*q*4*v),K=new pf(W,X,q,v);K.type=Rn,K.needsUpdate=!0;const B=b*4;for(let $=0;$<v;$++){const ae=E[$],re=O[$],pe=N[$],xe=X*q*4*$;for(let de=0;de<ae.count;de++){const Ee=de*B;w===!0&&(i.fromBufferAttribute(ae,de),W[xe+Ee+0]=i.x,W[xe+Ee+1]=i.y,W[xe+Ee+2]=i.z,W[xe+Ee+3]=0),P===!0&&(i.fromBufferAttribute(re,de),W[xe+Ee+4]=i.x,W[xe+Ee+5]=i.y,W[xe+Ee+6]=i.z,W[xe+Ee+7]=0),C===!0&&(i.fromBufferAttribute(pe,de),W[xe+Ee+8]=i.x,W[xe+Ee+9]=i.y,W[xe+Ee+10]=i.z,W[xe+Ee+11]=pe.itemSize===4?i.w:1)}}y={count:v,texture:K,size:new ct(X,q)},n.set(u,y),u.addEventListener("dispose",D)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)c.getUniforms().setValue(o,"morphTexture",l.morphTexture,t);else{let w=0;for(let C=0;C<m.length;C++)w+=m[C];const P=u.morphTargetsRelative?1:1-w;c.getUniforms().setValue(o,"morphTargetBaseInfluence",P),c.getUniforms().setValue(o,"morphTargetInfluences",m)}c.getUniforms().setValue(o,"morphTargetsTexture",y.texture,t),c.getUniforms().setValue(o,"morphTargetsTextureSize",y.size)}return{update:s}}function lS(o,e,t,n){let i=new WeakMap;function s(c){const m=n.render.frame,_=c.geometry,v=e.get(c,_);if(i.get(v)!==m&&(e.update(v),i.set(v,m)),c.isInstancedMesh&&(c.hasEventListener("dispose",u)===!1&&c.addEventListener("dispose",u),i.get(c)!==m&&(t.update(c.instanceMatrix,o.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,o.ARRAY_BUFFER),i.set(c,m))),c.isSkinnedMesh){const y=c.skeleton;i.get(y)!==m&&(y.update(),i.set(y,m))}return v}function l(){i=new WeakMap}function u(c){const m=c.target;m.removeEventListener("dispose",u),t.remove(m.instanceMatrix),m.instanceColor!==null&&t.remove(m.instanceColor)}return{update:s,dispose:l}}const Af=new fn,gc=new Sf(1,1),wf=new pf,Rf=new R0,If=new Ef,_c=[],vc=[],yc=new Float32Array(16),xc=new Float32Array(9),Ec=new Float32Array(4);function Io(o,e,t){const n=o[0];if(n<=0||n>0)return o;const i=e*t;let s=_c[i];if(s===void 0&&(s=new Float32Array(i),_c[i]=s),e!==0){n.toArray(s,0);for(let l=1,u=0;l!==e;++l)u+=t,o[l].toArray(s,u)}return s}function Xt(o,e){if(o.length!==e.length)return!1;for(let t=0,n=o.length;t<n;t++)if(o[t]!==e[t])return!1;return!0}function Yt(o,e){for(let t=0,n=e.length;t<n;t++)o[t]=e[t]}function cs(o,e){let t=vc[e];t===void 0&&(t=new Int32Array(e),vc[e]=t);for(let n=0;n!==e;++n)t[n]=o.allocateTextureUnit();return t}function uS(o,e){const t=this.cache;t[0]!==e&&(o.uniform1f(this.addr,e),t[0]=e)}function cS(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;o.uniform2fv(this.addr,e),Yt(t,e)}}function fS(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;o.uniform3fv(this.addr,e),Yt(t,e)}}function dS(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;o.uniform4fv(this.addr,e),Yt(t,e)}}function hS(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;o.uniformMatrix2fv(this.addr,!1,e),Yt(t,e)}else{if(Xt(t,n))return;Ec.set(n),o.uniformMatrix2fv(this.addr,!1,Ec),Yt(t,n)}}function pS(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;o.uniformMatrix3fv(this.addr,!1,e),Yt(t,e)}else{if(Xt(t,n))return;xc.set(n),o.uniformMatrix3fv(this.addr,!1,xc),Yt(t,n)}}function mS(o,e){const t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;o.uniformMatrix4fv(this.addr,!1,e),Yt(t,e)}else{if(Xt(t,n))return;yc.set(n),o.uniformMatrix4fv(this.addr,!1,yc),Yt(t,n)}}function gS(o,e){const t=this.cache;t[0]!==e&&(o.uniform1i(this.addr,e),t[0]=e)}function _S(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;o.uniform2iv(this.addr,e),Yt(t,e)}}function vS(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;o.uniform3iv(this.addr,e),Yt(t,e)}}function yS(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;o.uniform4iv(this.addr,e),Yt(t,e)}}function xS(o,e){const t=this.cache;t[0]!==e&&(o.uniform1ui(this.addr,e),t[0]=e)}function ES(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;o.uniform2uiv(this.addr,e),Yt(t,e)}}function TS(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;o.uniform3uiv(this.addr,e),Yt(t,e)}}function SS(o,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;o.uniform4uiv(this.addr,e),Yt(t,e)}}function MS(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i);let s;this.type===o.SAMPLER_2D_SHADOW?(gc.compareFunction=df,s=gc):s=Af,t.setTexture2D(e||s,i)}function CS(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Rf,i)}function AS(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||If,i)}function wS(o,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(o.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||wf,i)}function RS(o){switch(o){case 5126:return uS;case 35664:return cS;case 35665:return fS;case 35666:return dS;case 35674:return hS;case 35675:return pS;case 35676:return mS;case 5124:case 35670:return gS;case 35667:case 35671:return _S;case 35668:case 35672:return vS;case 35669:case 35673:return yS;case 5125:return xS;case 36294:return ES;case 36295:return TS;case 36296:return SS;case 35678:case 36198:case 36298:case 36306:case 35682:return MS;case 35679:case 36299:case 36307:return CS;case 35680:case 36300:case 36308:case 36293:return AS;case 36289:case 36303:case 36311:case 36292:return wS}}function IS(o,e){o.uniform1fv(this.addr,e)}function PS(o,e){const t=Io(e,this.size,2);o.uniform2fv(this.addr,t)}function DS(o,e){const t=Io(e,this.size,3);o.uniform3fv(this.addr,t)}function bS(o,e){const t=Io(e,this.size,4);o.uniform4fv(this.addr,t)}function US(o,e){const t=Io(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,t)}function NS(o,e){const t=Io(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,t)}function LS(o,e){const t=Io(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,t)}function FS(o,e){o.uniform1iv(this.addr,e)}function BS(o,e){o.uniform2iv(this.addr,e)}function VS(o,e){o.uniform3iv(this.addr,e)}function OS(o,e){o.uniform4iv(this.addr,e)}function kS(o,e){o.uniform1uiv(this.addr,e)}function GS(o,e){o.uniform2uiv(this.addr,e)}function HS(o,e){o.uniform3uiv(this.addr,e)}function zS(o,e){o.uniform4uiv(this.addr,e)}function WS(o,e,t){const n=this.cache,i=e.length,s=cs(t,i);Xt(n,s)||(o.uniform1iv(this.addr,s),Yt(n,s));for(let l=0;l!==i;++l)t.setTexture2D(e[l]||Af,s[l])}function qS(o,e,t){const n=this.cache,i=e.length,s=cs(t,i);Xt(n,s)||(o.uniform1iv(this.addr,s),Yt(n,s));for(let l=0;l!==i;++l)t.setTexture3D(e[l]||Rf,s[l])}function $S(o,e,t){const n=this.cache,i=e.length,s=cs(t,i);Xt(n,s)||(o.uniform1iv(this.addr,s),Yt(n,s));for(let l=0;l!==i;++l)t.setTextureCube(e[l]||If,s[l])}function XS(o,e,t){const n=this.cache,i=e.length,s=cs(t,i);Xt(n,s)||(o.uniform1iv(this.addr,s),Yt(n,s));for(let l=0;l!==i;++l)t.setTexture2DArray(e[l]||wf,s[l])}function YS(o){switch(o){case 5126:return IS;case 35664:return PS;case 35665:return DS;case 35666:return bS;case 35674:return US;case 35675:return NS;case 35676:return LS;case 5124:case 35670:return FS;case 35667:case 35671:return BS;case 35668:case 35672:return VS;case 35669:case 35673:return OS;case 5125:return kS;case 36294:return GS;case 36295:return HS;case 36296:return zS;case 35678:case 36198:case 36298:case 36306:case 35682:return WS;case 35679:case 36299:case 36307:return qS;case 35680:case 36300:case 36308:case 36293:return $S;case 36289:case 36303:case 36311:case 36292:return XS}}class KS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=RS(t.type)}}class ZS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=YS(t.type)}}class JS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,l=i.length;s!==l;++s){const u=i[s];u.setValue(e,t[u.id],n)}}}const Hs=/(\w+)(\])?(\[|\.)?/g;function Tc(o,e){o.seq.push(e),o.map[e.id]=e}function QS(o,e,t){const n=o.name,i=n.length;for(Hs.lastIndex=0;;){const s=Hs.exec(n),l=Hs.lastIndex;let u=s[1];const c=s[2]==="]",m=s[3];if(c&&(u=u|0),m===void 0||m==="["&&l+2===i){Tc(t,m===void 0?new KS(u,o,e):new ZS(u,o,e));break}else{let v=t.map[u];v===void 0&&(v=new JS(u),Tc(t,v)),t=v}}}class qr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),l=e.getUniformLocation(t,s.name);QS(s,l,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,l=t.length;s!==l;++s){const u=t[s],c=n[u.id];c.needsUpdate!==!1&&u.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const l=e[i];l.id in t&&n.push(l)}return n}}function Sc(o,e,t){const n=o.createShader(e);return o.shaderSource(n,t),o.compileShader(n),n}const jS=37297;let eM=0;function tM(o,e){const t=o.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let l=i;l<s;l++){const u=l+1;n.push(`${u===e?">":" "} ${u}: ${t[l]}`)}return n.join(`
`)}const Mc=new dt;function nM(o){Rt._getMatrix(Mc,Rt.workingColorSpace,o);const e=`mat3( ${Mc.elements.map(t=>t.toFixed(4))} )`;switch(Rt.getTransfer(o)){case jr:return[e,"LinearTransferOETF"];case Lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function Cc(o,e,t){const n=o.getShaderParameter(e,o.COMPILE_STATUS),i=o.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const l=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+tM(o.getShaderSource(e),l)}else return i}function iM(o,e){const t=nM(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function oM(o,e){let t;switch(e){case e0:t="Linear";break;case t0:t="Reinhard";break;case n0:t="Cineon";break;case i0:t="ACESFilmic";break;case r0:t="AgX";break;case s0:t="Neutral";break;case o0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+o+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ur=new ie;function rM(){Rt.getLuminanceCoefficients(Ur);const o=Ur.x.toFixed(4),e=Ur.y.toFixed(4),t=Ur.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sM(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bo).join(`
`)}function aM(o){const e=[];for(const t in o){const n=o[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function lM(o,e){const t={},n=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=o.getActiveAttrib(e,i),l=s.name;let u=1;s.type===o.FLOAT_MAT2&&(u=2),s.type===o.FLOAT_MAT3&&(u=3),s.type===o.FLOAT_MAT4&&(u=4),t[l]={type:s.type,location:o.getAttribLocation(e,l),locationSize:u}}return t}function Bo(o){return o!==""}function Ac(o,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wc(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const uM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oa(o){return o.replace(uM,fM)}const cM=new Map;function fM(o,e){let t=pt[e];if(t===void 0){const n=cM.get(e);if(n!==void 0)t=pt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Oa(t)}const dM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rc(o){return o.replace(dM,hM)}function hM(o,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Ic(o){let e=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function pM(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===ef?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===Uy?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===ei&&(e="SHADOWMAP_TYPE_VSM"),e}function mM(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case To:case So:e="ENVMAP_TYPE_CUBE";break;case ls:e="ENVMAP_TYPE_CUBE_UV";break}return e}function gM(o){let e="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case So:e="ENVMAP_MODE_REFRACTION";break}return e}function _M(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case tf:e="ENVMAP_BLENDING_MULTIPLY";break;case Qy:e="ENVMAP_BLENDING_MIX";break;case jy:e="ENVMAP_BLENDING_ADD";break}return e}function vM(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function yM(o,e,t,n){const i=o.getContext(),s=t.defines;let l=t.vertexShader,u=t.fragmentShader;const c=pM(t),m=mM(t),_=gM(t),v=_M(t),y=vM(t),T=sM(t),w=aM(s),P=i.createProgram();let C,E,O=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(C=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,w].filter(Bo).join(`
`),C.length>0&&(C+=`
`),E=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,w].filter(Bo).join(`
`),E.length>0&&(E+=`
`)):(C=[Ic(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,w,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+_:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bo).join(`
`),E=[Ic(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,w,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.envMap?"#define "+_:"",t.envMap?"#define "+v:"",y?"#define CUBEUV_TEXEL_WIDTH "+y.texelWidth:"",y?"#define CUBEUV_TEXEL_HEIGHT "+y.texelHeight:"",y?"#define CUBEUV_MAX_MIP "+y.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ai?"#define TONE_MAPPING":"",t.toneMapping!==Ai?pt.tonemapping_pars_fragment:"",t.toneMapping!==Ai?oM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",pt.colorspace_pars_fragment,iM("linearToOutputTexel",t.outputColorSpace),rM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Bo).join(`
`)),l=Oa(l),l=Ac(l,t),l=wc(l,t),u=Oa(u),u=Ac(u,t),u=wc(u,t),l=Rc(l),u=Rc(u),t.isRawShaderMaterial!==!0&&(O=`#version 300 es
`,C=[T,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+C,E=["#define varying in",t.glslVersion===Fa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+E);const N=O+C+l,b=O+E+u,X=Sc(i,i.VERTEX_SHADER,N),q=Sc(i,i.FRAGMENT_SHADER,b);i.attachShader(P,X),i.attachShader(P,q),t.index0AttributeName!==void 0?i.bindAttribLocation(P,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(P,0,"position"),i.linkProgram(P);function W($){if(o.debug.checkShaderErrors){const ae=i.getProgramInfoLog(P).trim(),re=i.getShaderInfoLog(X).trim(),pe=i.getShaderInfoLog(q).trim();let xe=!0,de=!0;if(i.getProgramParameter(P,i.LINK_STATUS)===!1)if(xe=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(i,P,X,q);else{const Ee=Cc(i,X,"vertex"),ue=Cc(i,q,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(P,i.VALIDATE_STATUS)+`

Material Name: `+$.name+`
Material Type: `+$.type+`

Program Info Log: `+ae+`
`+Ee+`
`+ue)}else ae!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ae):(re===""||pe==="")&&(de=!1);de&&($.diagnostics={runnable:xe,programLog:ae,vertexShader:{log:re,prefix:C},fragmentShader:{log:pe,prefix:E}})}i.deleteShader(X),i.deleteShader(q),K=new qr(i,P),B=lM(i,P)}let K;this.getUniforms=function(){return K===void 0&&W(this),K};let B;this.getAttributes=function(){return B===void 0&&W(this),B};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=i.getProgramParameter(P,jS)),D},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(P),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=eM++,this.cacheKey=e,this.usedTimes=1,this.program=P,this.vertexShader=X,this.fragmentShader=q,this}let xM=0;class EM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),l=this._getShaderCacheForMaterial(e);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(s)===!1&&(l.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new TM(e),t.set(e,n)),n}}class TM{constructor(e){this.id=xM++,this.code=e,this.usedTimes=0}}function SM(o,e,t,n,i,s,l){const u=new mf,c=new EM,m=new Set,_=[],v=i.logarithmicDepthBuffer,y=i.vertexTextures;let T=i.precision;const w={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function P(B){return m.add(B),B===0?"uv":`uv${B}`}function C(B,D,$,ae,re){const pe=ae.fog,xe=re.geometry,de=B.isMeshStandardMaterial?ae.environment:null,Ee=(B.isMeshStandardMaterial?t:e).get(B.envMap||de),ue=Ee&&Ee.mapping===ls?Ee.image.height:null,Ie=w[B.type];B.precision!==null&&(T=i.getMaxPrecision(B.precision),T!==B.precision&&console.warn("THREE.WebGLProgram.getParameters:",B.precision,"not supported, using",T,"instead."));const Ue=xe.morphAttributes.position||xe.morphAttributes.normal||xe.morphAttributes.color,We=Ue!==void 0?Ue.length:0;let tt=0;xe.morphAttributes.position!==void 0&&(tt=1),xe.morphAttributes.normal!==void 0&&(tt=2),xe.morphAttributes.color!==void 0&&(tt=3);let ht,fe,we,Ae;if(Ie){const Tt=Wn[Ie];ht=Tt.vertexShader,fe=Tt.fragmentShader}else ht=B.vertexShader,fe=B.fragmentShader,c.update(B),we=c.getVertexShaderID(B),Ae=c.getFragmentShaderID(B);const Pe=o.getRenderTarget(),qe=o.state.buffers.depth.getReversed(),mt=re.isInstancedMesh===!0,nt=re.isBatchedMesh===!0,Dt=!!B.map,It=!!B.matcap,ft=!!Ee,Y=!!B.aoMap,jt=!!B.lightMap,vt=!!B.bumpMap,gt=!!B.normalMap,Je=!!B.displacementMap,bt=!!B.emissiveMap,Ye=!!B.metalnessMap,k=!!B.roughnessMap,I=B.anisotropy>0,ne=B.clearcoat>0,ge=B.dispersion>0,Se=B.iridescence>0,ce=B.sheen>0,$e=B.transmission>0,Ne=I&&!!B.anisotropyMap,Ke=ne&&!!B.clearcoatMap,it=ne&&!!B.clearcoatNormalMap,Me=ne&&!!B.clearcoatRoughnessMap,Ve=Se&&!!B.iridescenceMap,ze=Se&&!!B.iridescenceThicknessMap,Xe=ce&&!!B.sheenColorMap,Oe=ce&&!!B.sheenRoughnessMap,at=!!B.specularMap,Qe=!!B.specularColorMap,st=!!B.specularIntensityMap,Q=$e&&!!B.transmissionMap,oe=$e&&!!B.thicknessMap,le=!!B.gradientMap,ve=!!B.alphaMap,Be=B.alphaTest>0,be=!!B.alphaHash,rt=!!B.extensions;let Ut=Ai;B.toneMapped&&(Pe===null||Pe.isXRRenderTarget===!0)&&(Ut=o.toneMapping);const Ot={shaderID:Ie,shaderType:B.type,shaderName:B.name,vertexShader:ht,fragmentShader:fe,defines:B.defines,customVertexShaderID:we,customFragmentShaderID:Ae,isRawShaderMaterial:B.isRawShaderMaterial===!0,glslVersion:B.glslVersion,precision:T,batching:nt,batchingColor:nt&&re._colorsTexture!==null,instancing:mt,instancingColor:mt&&re.instanceColor!==null,instancingMorph:mt&&re.morphTexture!==null,supportsVertexTextures:y,outputColorSpace:Pe===null?o.outputColorSpace:Pe.isXRRenderTarget===!0?Pe.texture.colorSpace:Ri,alphaToCoverage:!!B.alphaToCoverage,map:Dt,matcap:It,envMap:ft,envMapMode:ft&&Ee.mapping,envMapCubeUVHeight:ue,aoMap:Y,lightMap:jt,bumpMap:vt,normalMap:gt,displacementMap:y&&Je,emissiveMap:bt,normalMapObjectSpace:gt&&B.normalMapType===c0,normalMapTangentSpace:gt&&B.normalMapType===ff,metalnessMap:Ye,roughnessMap:k,anisotropy:I,anisotropyMap:Ne,clearcoat:ne,clearcoatMap:Ke,clearcoatNormalMap:it,clearcoatRoughnessMap:Me,dispersion:ge,iridescence:Se,iridescenceMap:Ve,iridescenceThicknessMap:ze,sheen:ce,sheenColorMap:Xe,sheenRoughnessMap:Oe,specularMap:at,specularColorMap:Qe,specularIntensityMap:st,transmission:$e,transmissionMap:Q,thicknessMap:oe,gradientMap:le,opaque:B.transparent===!1&&B.blending===_o&&B.alphaToCoverage===!1,alphaMap:ve,alphaTest:Be,alphaHash:be,combine:B.combine,mapUv:Dt&&P(B.map.channel),aoMapUv:Y&&P(B.aoMap.channel),lightMapUv:jt&&P(B.lightMap.channel),bumpMapUv:vt&&P(B.bumpMap.channel),normalMapUv:gt&&P(B.normalMap.channel),displacementMapUv:Je&&P(B.displacementMap.channel),emissiveMapUv:bt&&P(B.emissiveMap.channel),metalnessMapUv:Ye&&P(B.metalnessMap.channel),roughnessMapUv:k&&P(B.roughnessMap.channel),anisotropyMapUv:Ne&&P(B.anisotropyMap.channel),clearcoatMapUv:Ke&&P(B.clearcoatMap.channel),clearcoatNormalMapUv:it&&P(B.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&P(B.clearcoatRoughnessMap.channel),iridescenceMapUv:Ve&&P(B.iridescenceMap.channel),iridescenceThicknessMapUv:ze&&P(B.iridescenceThicknessMap.channel),sheenColorMapUv:Xe&&P(B.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&P(B.sheenRoughnessMap.channel),specularMapUv:at&&P(B.specularMap.channel),specularColorMapUv:Qe&&P(B.specularColorMap.channel),specularIntensityMapUv:st&&P(B.specularIntensityMap.channel),transmissionMapUv:Q&&P(B.transmissionMap.channel),thicknessMapUv:oe&&P(B.thicknessMap.channel),alphaMapUv:ve&&P(B.alphaMap.channel),vertexTangents:!!xe.attributes.tangent&&(gt||I),vertexColors:B.vertexColors,vertexAlphas:B.vertexColors===!0&&!!xe.attributes.color&&xe.attributes.color.itemSize===4,pointsUvs:re.isPoints===!0&&!!xe.attributes.uv&&(Dt||ve),fog:!!pe,useFog:B.fog===!0,fogExp2:!!pe&&pe.isFogExp2,flatShading:B.flatShading===!0,sizeAttenuation:B.sizeAttenuation===!0,logarithmicDepthBuffer:v,reverseDepthBuffer:qe,skinning:re.isSkinnedMesh===!0,morphTargets:xe.morphAttributes.position!==void 0,morphNormals:xe.morphAttributes.normal!==void 0,morphColors:xe.morphAttributes.color!==void 0,morphTargetsCount:We,morphTextureStride:tt,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:B.dithering,shadowMapEnabled:o.shadowMap.enabled&&$.length>0,shadowMapType:o.shadowMap.type,toneMapping:Ut,decodeVideoTexture:Dt&&B.map.isVideoTexture===!0&&Rt.getTransfer(B.map.colorSpace)===Lt,decodeVideoTextureEmissive:bt&&B.emissiveMap.isVideoTexture===!0&&Rt.getTransfer(B.emissiveMap.colorSpace)===Lt,premultipliedAlpha:B.premultipliedAlpha,doubleSided:B.side===ti,flipSided:B.side===cn,useDepthPacking:B.depthPacking>=0,depthPacking:B.depthPacking||0,index0AttributeName:B.index0AttributeName,extensionClipCullDistance:rt&&B.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&B.extensions.multiDraw===!0||nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:B.customProgramCacheKey()};return Ot.vertexUv1s=m.has(1),Ot.vertexUv2s=m.has(2),Ot.vertexUv3s=m.has(3),m.clear(),Ot}function E(B){const D=[];if(B.shaderID?D.push(B.shaderID):(D.push(B.customVertexShaderID),D.push(B.customFragmentShaderID)),B.defines!==void 0)for(const $ in B.defines)D.push($),D.push(B.defines[$]);return B.isRawShaderMaterial===!1&&(O(D,B),N(D,B),D.push(o.outputColorSpace)),D.push(B.customProgramCacheKey),D.join()}function O(B,D){B.push(D.precision),B.push(D.outputColorSpace),B.push(D.envMapMode),B.push(D.envMapCubeUVHeight),B.push(D.mapUv),B.push(D.alphaMapUv),B.push(D.lightMapUv),B.push(D.aoMapUv),B.push(D.bumpMapUv),B.push(D.normalMapUv),B.push(D.displacementMapUv),B.push(D.emissiveMapUv),B.push(D.metalnessMapUv),B.push(D.roughnessMapUv),B.push(D.anisotropyMapUv),B.push(D.clearcoatMapUv),B.push(D.clearcoatNormalMapUv),B.push(D.clearcoatRoughnessMapUv),B.push(D.iridescenceMapUv),B.push(D.iridescenceThicknessMapUv),B.push(D.sheenColorMapUv),B.push(D.sheenRoughnessMapUv),B.push(D.specularMapUv),B.push(D.specularColorMapUv),B.push(D.specularIntensityMapUv),B.push(D.transmissionMapUv),B.push(D.thicknessMapUv),B.push(D.combine),B.push(D.fogExp2),B.push(D.sizeAttenuation),B.push(D.morphTargetsCount),B.push(D.morphAttributeCount),B.push(D.numDirLights),B.push(D.numPointLights),B.push(D.numSpotLights),B.push(D.numSpotLightMaps),B.push(D.numHemiLights),B.push(D.numRectAreaLights),B.push(D.numDirLightShadows),B.push(D.numPointLightShadows),B.push(D.numSpotLightShadows),B.push(D.numSpotLightShadowsWithMaps),B.push(D.numLightProbes),B.push(D.shadowMapType),B.push(D.toneMapping),B.push(D.numClippingPlanes),B.push(D.numClipIntersection),B.push(D.depthPacking)}function N(B,D){u.disableAll(),D.supportsVertexTextures&&u.enable(0),D.instancing&&u.enable(1),D.instancingColor&&u.enable(2),D.instancingMorph&&u.enable(3),D.matcap&&u.enable(4),D.envMap&&u.enable(5),D.normalMapObjectSpace&&u.enable(6),D.normalMapTangentSpace&&u.enable(7),D.clearcoat&&u.enable(8),D.iridescence&&u.enable(9),D.alphaTest&&u.enable(10),D.vertexColors&&u.enable(11),D.vertexAlphas&&u.enable(12),D.vertexUv1s&&u.enable(13),D.vertexUv2s&&u.enable(14),D.vertexUv3s&&u.enable(15),D.vertexTangents&&u.enable(16),D.anisotropy&&u.enable(17),D.alphaHash&&u.enable(18),D.batching&&u.enable(19),D.dispersion&&u.enable(20),D.batchingColor&&u.enable(21),B.push(u.mask),u.disableAll(),D.fog&&u.enable(0),D.useFog&&u.enable(1),D.flatShading&&u.enable(2),D.logarithmicDepthBuffer&&u.enable(3),D.reverseDepthBuffer&&u.enable(4),D.skinning&&u.enable(5),D.morphTargets&&u.enable(6),D.morphNormals&&u.enable(7),D.morphColors&&u.enable(8),D.premultipliedAlpha&&u.enable(9),D.shadowMapEnabled&&u.enable(10),D.doubleSided&&u.enable(11),D.flipSided&&u.enable(12),D.useDepthPacking&&u.enable(13),D.dithering&&u.enable(14),D.transmission&&u.enable(15),D.sheen&&u.enable(16),D.opaque&&u.enable(17),D.pointsUvs&&u.enable(18),D.decodeVideoTexture&&u.enable(19),D.decodeVideoTextureEmissive&&u.enable(20),D.alphaToCoverage&&u.enable(21),B.push(u.mask)}function b(B){const D=w[B.type];let $;if(D){const ae=Wn[D];$=ns.clone(ae.uniforms)}else $=B.uniforms;return $}function X(B,D){let $;for(let ae=0,re=_.length;ae<re;ae++){const pe=_[ae];if(pe.cacheKey===D){$=pe,++$.usedTimes;break}}return $===void 0&&($=new yM(o,D,B,s),_.push($)),$}function q(B){if(--B.usedTimes===0){const D=_.indexOf(B);_[D]=_[_.length-1],_.pop(),B.destroy()}}function W(B){c.remove(B)}function K(){c.dispose()}return{getParameters:C,getProgramCacheKey:E,getUniforms:b,acquireProgram:X,releaseProgram:q,releaseShaderCache:W,programs:_,dispose:K}}function MM(){let o=new WeakMap;function e(l){return o.has(l)}function t(l){let u=o.get(l);return u===void 0&&(u={},o.set(l,u)),u}function n(l){o.delete(l)}function i(l,u,c){o.get(l)[u]=c}function s(){o=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function CM(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function Pc(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function Dc(){const o=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function l(v,y,T,w,P,C){let E=o[e];return E===void 0?(E={id:v.id,object:v,geometry:y,material:T,groupOrder:w,renderOrder:v.renderOrder,z:P,group:C},o[e]=E):(E.id=v.id,E.object=v,E.geometry=y,E.material=T,E.groupOrder=w,E.renderOrder=v.renderOrder,E.z=P,E.group=C),e++,E}function u(v,y,T,w,P,C){const E=l(v,y,T,w,P,C);T.transmission>0?n.push(E):T.transparent===!0?i.push(E):t.push(E)}function c(v,y,T,w,P,C){const E=l(v,y,T,w,P,C);T.transmission>0?n.unshift(E):T.transparent===!0?i.unshift(E):t.unshift(E)}function m(v,y){t.length>1&&t.sort(v||CM),n.length>1&&n.sort(y||Pc),i.length>1&&i.sort(y||Pc)}function _(){for(let v=e,y=o.length;v<y;v++){const T=o[v];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:u,unshift:c,finish:_,sort:m}}function AM(){let o=new WeakMap;function e(n,i){const s=o.get(n);let l;return s===void 0?(l=new Dc,o.set(n,[l])):i>=s.length?(l=new Dc,s.push(l)):l=s[i],l}function t(){o=new WeakMap}return{get:e,dispose:t}}function wM(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new ie,color:new Et};break;case"SpotLight":t={position:new ie,direction:new ie,color:new Et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new ie,color:new Et,distance:0,decay:0};break;case"HemisphereLight":t={direction:new ie,skyColor:new Et,groundColor:new Et};break;case"RectAreaLight":t={color:new Et,position:new ie,halfWidth:new ie,halfHeight:new ie};break}return o[e.id]=t,t}}}function RM(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=t,t}}}let IM=0;function PM(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function DM(o){const e=new wM,t=RM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)n.probe.push(new ie);const i=new ie,s=new $t,l=new $t;function u(m){let _=0,v=0,y=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let T=0,w=0,P=0,C=0,E=0,O=0,N=0,b=0,X=0,q=0,W=0;m.sort(PM);for(let B=0,D=m.length;B<D;B++){const $=m[B],ae=$.color,re=$.intensity,pe=$.distance,xe=$.shadow&&$.shadow.map?$.shadow.map.texture:null;if($.isAmbientLight)_+=ae.r*re,v+=ae.g*re,y+=ae.b*re;else if($.isLightProbe){for(let de=0;de<9;de++)n.probe[de].addScaledVector($.sh.coefficients[de],re);W++}else if($.isDirectionalLight){const de=e.get($);if(de.color.copy($.color).multiplyScalar($.intensity),$.castShadow){const Ee=$.shadow,ue=t.get($);ue.shadowIntensity=Ee.intensity,ue.shadowBias=Ee.bias,ue.shadowNormalBias=Ee.normalBias,ue.shadowRadius=Ee.radius,ue.shadowMapSize=Ee.mapSize,n.directionalShadow[T]=ue,n.directionalShadowMap[T]=xe,n.directionalShadowMatrix[T]=$.shadow.matrix,O++}n.directional[T]=de,T++}else if($.isSpotLight){const de=e.get($);de.position.setFromMatrixPosition($.matrixWorld),de.color.copy(ae).multiplyScalar(re),de.distance=pe,de.coneCos=Math.cos($.angle),de.penumbraCos=Math.cos($.angle*(1-$.penumbra)),de.decay=$.decay,n.spot[P]=de;const Ee=$.shadow;if($.map&&(n.spotLightMap[X]=$.map,X++,Ee.updateMatrices($),$.castShadow&&q++),n.spotLightMatrix[P]=Ee.matrix,$.castShadow){const ue=t.get($);ue.shadowIntensity=Ee.intensity,ue.shadowBias=Ee.bias,ue.shadowNormalBias=Ee.normalBias,ue.shadowRadius=Ee.radius,ue.shadowMapSize=Ee.mapSize,n.spotShadow[P]=ue,n.spotShadowMap[P]=xe,b++}P++}else if($.isRectAreaLight){const de=e.get($);de.color.copy(ae).multiplyScalar(re),de.halfWidth.set($.width*.5,0,0),de.halfHeight.set(0,$.height*.5,0),n.rectArea[C]=de,C++}else if($.isPointLight){const de=e.get($);if(de.color.copy($.color).multiplyScalar($.intensity),de.distance=$.distance,de.decay=$.decay,$.castShadow){const Ee=$.shadow,ue=t.get($);ue.shadowIntensity=Ee.intensity,ue.shadowBias=Ee.bias,ue.shadowNormalBias=Ee.normalBias,ue.shadowRadius=Ee.radius,ue.shadowMapSize=Ee.mapSize,ue.shadowCameraNear=Ee.camera.near,ue.shadowCameraFar=Ee.camera.far,n.pointShadow[w]=ue,n.pointShadowMap[w]=xe,n.pointShadowMatrix[w]=$.shadow.matrix,N++}n.point[w]=de,w++}else if($.isHemisphereLight){const de=e.get($);de.skyColor.copy($.color).multiplyScalar(re),de.groundColor.copy($.groundColor).multiplyScalar(re),n.hemi[E]=de,E++}}C>0&&(o.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Fe.LTC_FLOAT_1,n.rectAreaLTC2=Fe.LTC_FLOAT_2):(n.rectAreaLTC1=Fe.LTC_HALF_1,n.rectAreaLTC2=Fe.LTC_HALF_2)),n.ambient[0]=_,n.ambient[1]=v,n.ambient[2]=y;const K=n.hash;(K.directionalLength!==T||K.pointLength!==w||K.spotLength!==P||K.rectAreaLength!==C||K.hemiLength!==E||K.numDirectionalShadows!==O||K.numPointShadows!==N||K.numSpotShadows!==b||K.numSpotMaps!==X||K.numLightProbes!==W)&&(n.directional.length=T,n.spot.length=P,n.rectArea.length=C,n.point.length=w,n.hemi.length=E,n.directionalShadow.length=O,n.directionalShadowMap.length=O,n.pointShadow.length=N,n.pointShadowMap.length=N,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=O,n.pointShadowMatrix.length=N,n.spotLightMatrix.length=b+X-q,n.spotLightMap.length=X,n.numSpotLightShadowsWithMaps=q,n.numLightProbes=W,K.directionalLength=T,K.pointLength=w,K.spotLength=P,K.rectAreaLength=C,K.hemiLength=E,K.numDirectionalShadows=O,K.numPointShadows=N,K.numSpotShadows=b,K.numSpotMaps=X,K.numLightProbes=W,n.version=IM++)}function c(m,_){let v=0,y=0,T=0,w=0,P=0;const C=_.matrixWorldInverse;for(let E=0,O=m.length;E<O;E++){const N=m[E];if(N.isDirectionalLight){const b=n.directional[v];b.direction.setFromMatrixPosition(N.matrixWorld),i.setFromMatrixPosition(N.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(C),v++}else if(N.isSpotLight){const b=n.spot[T];b.position.setFromMatrixPosition(N.matrixWorld),b.position.applyMatrix4(C),b.direction.setFromMatrixPosition(N.matrixWorld),i.setFromMatrixPosition(N.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(C),T++}else if(N.isRectAreaLight){const b=n.rectArea[w];b.position.setFromMatrixPosition(N.matrixWorld),b.position.applyMatrix4(C),l.identity(),s.copy(N.matrixWorld),s.premultiply(C),l.extractRotation(s),b.halfWidth.set(N.width*.5,0,0),b.halfHeight.set(0,N.height*.5,0),b.halfWidth.applyMatrix4(l),b.halfHeight.applyMatrix4(l),w++}else if(N.isPointLight){const b=n.point[y];b.position.setFromMatrixPosition(N.matrixWorld),b.position.applyMatrix4(C),y++}else if(N.isHemisphereLight){const b=n.hemi[P];b.direction.setFromMatrixPosition(N.matrixWorld),b.direction.transformDirection(C),P++}}}return{setup:u,setupView:c,state:n}}function bc(o){const e=new DM(o),t=[],n=[];function i(_){m.camera=_,t.length=0,n.length=0}function s(_){t.push(_)}function l(_){n.push(_)}function u(){e.setup(t)}function c(_){e.setupView(t,_)}const m={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:m,setupLights:u,setupLightsView:c,pushLight:s,pushShadow:l}}function bM(o){let e=new WeakMap;function t(i,s=0){const l=e.get(i);let u;return l===void 0?(u=new bc(o),e.set(i,[u])):s>=l.length?(u=new bc(o),l.push(u)):u=l[s],u}function n(){e=new WeakMap}return{get:t,dispose:n}}const UM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,NM=`uniform sampler2D shadow_pass;
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
}`;function LM(o,e,t){let n=new Tf;const i=new ct,s=new ct,l=new Vt,u=new nx({depthPacking:u0}),c=new ix,m={},_=t.maxTextureSize,v={[wi]:cn,[cn]:wi,[ti]:ti},y=new un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:UM,fragmentShader:NM}),T=y.clone();T.defines.HORIZONTAL_PASS=1;const w=new ui;w.setAttribute("position",new qn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const P=new Pn(w,y),C=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ef;let E=this.type;this.render=function(q,W,K){if(C.enabled===!1||C.autoUpdate===!1&&C.needsUpdate===!1||q.length===0)return;const B=o.getRenderTarget(),D=o.getActiveCubeFace(),$=o.getActiveMipmapLevel(),ae=o.state;ae.setBlending(si),ae.buffers.color.setClear(1,1,1,1),ae.buffers.depth.setTest(!0),ae.setScissorTest(!1);const re=E!==ei&&this.type===ei,pe=E===ei&&this.type!==ei;for(let xe=0,de=q.length;xe<de;xe++){const Ee=q[xe],ue=Ee.shadow;if(ue===void 0){console.warn("THREE.WebGLShadowMap:",Ee,"has no shadow.");continue}if(ue.autoUpdate===!1&&ue.needsUpdate===!1)continue;i.copy(ue.mapSize);const Ie=ue.getFrameExtents();if(i.multiply(Ie),s.copy(ue.mapSize),(i.x>_||i.y>_)&&(i.x>_&&(s.x=Math.floor(_/Ie.x),i.x=s.x*Ie.x,ue.mapSize.x=s.x),i.y>_&&(s.y=Math.floor(_/Ie.y),i.y=s.y*Ie.y,ue.mapSize.y=s.y)),ue.map===null||re===!0||pe===!0){const We=this.type!==ei?{minFilter:Tn,magFilter:Tn}:{};ue.map!==null&&ue.map.dispose(),ue.map=new kn(i.x,i.y,We),ue.map.texture.name=Ee.name+".shadowMap",ue.camera.updateProjectionMatrix()}o.setRenderTarget(ue.map),o.clear();const Ue=ue.getViewportCount();for(let We=0;We<Ue;We++){const tt=ue.getViewport(We);l.set(s.x*tt.x,s.y*tt.y,s.x*tt.z,s.y*tt.w),ae.viewport(l),ue.updateMatrices(Ee,We),n=ue.getFrustum(),b(W,K,ue.camera,Ee,this.type)}ue.isPointLightShadow!==!0&&this.type===ei&&O(ue,K),ue.needsUpdate=!1}E=this.type,C.needsUpdate=!1,o.setRenderTarget(B,D,$)};function O(q,W){const K=e.update(P);y.defines.VSM_SAMPLES!==q.blurSamples&&(y.defines.VSM_SAMPLES=q.blurSamples,T.defines.VSM_SAMPLES=q.blurSamples,y.needsUpdate=!0,T.needsUpdate=!0),q.mapPass===null&&(q.mapPass=new kn(i.x,i.y)),y.uniforms.shadow_pass.value=q.map.texture,y.uniforms.resolution.value=q.mapSize,y.uniforms.radius.value=q.radius,o.setRenderTarget(q.mapPass),o.clear(),o.renderBufferDirect(W,null,K,y,P,null),T.uniforms.shadow_pass.value=q.mapPass.texture,T.uniforms.resolution.value=q.mapSize,T.uniforms.radius.value=q.radius,o.setRenderTarget(q.map),o.clear(),o.renderBufferDirect(W,null,K,T,P,null)}function N(q,W,K,B){let D=null;const $=K.isPointLight===!0?q.customDistanceMaterial:q.customDepthMaterial;if($!==void 0)D=$;else if(D=K.isPointLight===!0?c:u,o.localClippingEnabled&&W.clipShadows===!0&&Array.isArray(W.clippingPlanes)&&W.clippingPlanes.length!==0||W.displacementMap&&W.displacementScale!==0||W.alphaMap&&W.alphaTest>0||W.map&&W.alphaTest>0||W.alphaToCoverage===!0){const ae=D.uuid,re=W.uuid;let pe=m[ae];pe===void 0&&(pe={},m[ae]=pe);let xe=pe[re];xe===void 0&&(xe=D.clone(),pe[re]=xe,W.addEventListener("dispose",X)),D=xe}if(D.visible=W.visible,D.wireframe=W.wireframe,B===ei?D.side=W.shadowSide!==null?W.shadowSide:W.side:D.side=W.shadowSide!==null?W.shadowSide:v[W.side],D.alphaMap=W.alphaMap,D.alphaTest=W.alphaToCoverage===!0?.5:W.alphaTest,D.map=W.map,D.clipShadows=W.clipShadows,D.clippingPlanes=W.clippingPlanes,D.clipIntersection=W.clipIntersection,D.displacementMap=W.displacementMap,D.displacementScale=W.displacementScale,D.displacementBias=W.displacementBias,D.wireframeLinewidth=W.wireframeLinewidth,D.linewidth=W.linewidth,K.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const ae=o.properties.get(D);ae.light=K}return D}function b(q,W,K,B,D){if(q.visible===!1)return;if(q.layers.test(W.layers)&&(q.isMesh||q.isLine||q.isPoints)&&(q.castShadow||q.receiveShadow&&D===ei)&&(!q.frustumCulled||n.intersectsObject(q))){q.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,q.matrixWorld);const re=e.update(q),pe=q.material;if(Array.isArray(pe)){const xe=re.groups;for(let de=0,Ee=xe.length;de<Ee;de++){const ue=xe[de],Ie=pe[ue.materialIndex];if(Ie&&Ie.visible){const Ue=N(q,Ie,B,D);q.onBeforeShadow(o,q,W,K,re,Ue,ue),o.renderBufferDirect(K,null,re,Ue,q,ue),q.onAfterShadow(o,q,W,K,re,Ue,ue)}}}else if(pe.visible){const xe=N(q,pe,B,D);q.onBeforeShadow(o,q,W,K,re,xe,null),o.renderBufferDirect(K,null,re,xe,q,null),q.onAfterShadow(o,q,W,K,re,xe,null)}}const ae=q.children;for(let re=0,pe=ae.length;re<pe;re++)b(ae[re],W,K,B,D)}function X(q){q.target.removeEventListener("dispose",X);for(const K in m){const B=m[K],D=q.target.uuid;D in B&&(B[D].dispose(),delete B[D])}}}const FM={[ea]:ta,[na]:ra,[ia]:sa,[Eo]:oa,[ta]:ea,[ra]:na,[sa]:ia,[oa]:Eo};function BM(o,e){function t(){let Q=!1;const oe=new Vt;let le=null;const ve=new Vt(0,0,0,0);return{setMask:function(Be){le!==Be&&!Q&&(o.colorMask(Be,Be,Be,Be),le=Be)},setLocked:function(Be){Q=Be},setClear:function(Be,be,rt,Ut,Ot){Ot===!0&&(Be*=Ut,be*=Ut,rt*=Ut),oe.set(Be,be,rt,Ut),ve.equals(oe)===!1&&(o.clearColor(Be,be,rt,Ut),ve.copy(oe))},reset:function(){Q=!1,le=null,ve.set(-1,0,0,0)}}}function n(){let Q=!1,oe=!1,le=null,ve=null,Be=null;return{setReversed:function(be){if(oe!==be){const rt=e.get("EXT_clip_control");be?rt.clipControlEXT(rt.LOWER_LEFT_EXT,rt.ZERO_TO_ONE_EXT):rt.clipControlEXT(rt.LOWER_LEFT_EXT,rt.NEGATIVE_ONE_TO_ONE_EXT),oe=be;const Ut=Be;Be=null,this.setClear(Ut)}},getReversed:function(){return oe},setTest:function(be){be?Pe(o.DEPTH_TEST):qe(o.DEPTH_TEST)},setMask:function(be){le!==be&&!Q&&(o.depthMask(be),le=be)},setFunc:function(be){if(oe&&(be=FM[be]),ve!==be){switch(be){case ea:o.depthFunc(o.NEVER);break;case ta:o.depthFunc(o.ALWAYS);break;case na:o.depthFunc(o.LESS);break;case Eo:o.depthFunc(o.LEQUAL);break;case ia:o.depthFunc(o.EQUAL);break;case oa:o.depthFunc(o.GEQUAL);break;case ra:o.depthFunc(o.GREATER);break;case sa:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}ve=be}},setLocked:function(be){Q=be},setClear:function(be){Be!==be&&(oe&&(be=1-be),o.clearDepth(be),Be=be)},reset:function(){Q=!1,le=null,ve=null,Be=null,oe=!1}}}function i(){let Q=!1,oe=null,le=null,ve=null,Be=null,be=null,rt=null,Ut=null,Ot=null;return{setTest:function(Tt){Q||(Tt?Pe(o.STENCIL_TEST):qe(o.STENCIL_TEST))},setMask:function(Tt){oe!==Tt&&!Q&&(o.stencilMask(Tt),oe=Tt)},setFunc:function(Tt,rn,sn){(le!==Tt||ve!==rn||Be!==sn)&&(o.stencilFunc(Tt,rn,sn),le=Tt,ve=rn,Be=sn)},setOp:function(Tt,rn,sn){(be!==Tt||rt!==rn||Ut!==sn)&&(o.stencilOp(Tt,rn,sn),be=Tt,rt=rn,Ut=sn)},setLocked:function(Tt){Q=Tt},setClear:function(Tt){Ot!==Tt&&(o.clearStencil(Tt),Ot=Tt)},reset:function(){Q=!1,oe=null,le=null,ve=null,Be=null,be=null,rt=null,Ut=null,Ot=null}}}const s=new t,l=new n,u=new i,c=new WeakMap,m=new WeakMap;let _={},v={},y=new WeakMap,T=[],w=null,P=!1,C=null,E=null,O=null,N=null,b=null,X=null,q=null,W=new Et(0,0,0),K=0,B=!1,D=null,$=null,ae=null,re=null,pe=null;const xe=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let de=!1,Ee=0;const ue=o.getParameter(o.VERSION);ue.indexOf("WebGL")!==-1?(Ee=parseFloat(/^WebGL (\d)/.exec(ue)[1]),de=Ee>=1):ue.indexOf("OpenGL ES")!==-1&&(Ee=parseFloat(/^OpenGL ES (\d)/.exec(ue)[1]),de=Ee>=2);let Ie=null,Ue={};const We=o.getParameter(o.SCISSOR_BOX),tt=o.getParameter(o.VIEWPORT),ht=new Vt().fromArray(We),fe=new Vt().fromArray(tt);function we(Q,oe,le,ve){const Be=new Uint8Array(4),be=o.createTexture();o.bindTexture(Q,be),o.texParameteri(Q,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(Q,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let rt=0;rt<le;rt++)Q===o.TEXTURE_3D||Q===o.TEXTURE_2D_ARRAY?o.texImage3D(oe,0,o.RGBA,1,1,ve,0,o.RGBA,o.UNSIGNED_BYTE,Be):o.texImage2D(oe+rt,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,Be);return be}const Ae={};Ae[o.TEXTURE_2D]=we(o.TEXTURE_2D,o.TEXTURE_2D,1),Ae[o.TEXTURE_CUBE_MAP]=we(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ae[o.TEXTURE_2D_ARRAY]=we(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),Ae[o.TEXTURE_3D]=we(o.TEXTURE_3D,o.TEXTURE_3D,1,1),s.setClear(0,0,0,1),l.setClear(1),u.setClear(0),Pe(o.DEPTH_TEST),l.setFunc(Eo),vt(!1),gt(Vu),Pe(o.CULL_FACE),Y(si);function Pe(Q){_[Q]!==!0&&(o.enable(Q),_[Q]=!0)}function qe(Q){_[Q]!==!1&&(o.disable(Q),_[Q]=!1)}function mt(Q,oe){return v[Q]!==oe?(o.bindFramebuffer(Q,oe),v[Q]=oe,Q===o.DRAW_FRAMEBUFFER&&(v[o.FRAMEBUFFER]=oe),Q===o.FRAMEBUFFER&&(v[o.DRAW_FRAMEBUFFER]=oe),!0):!1}function nt(Q,oe){let le=T,ve=!1;if(Q){le=y.get(oe),le===void 0&&(le=[],y.set(oe,le));const Be=Q.textures;if(le.length!==Be.length||le[0]!==o.COLOR_ATTACHMENT0){for(let be=0,rt=Be.length;be<rt;be++)le[be]=o.COLOR_ATTACHMENT0+be;le.length=Be.length,ve=!0}}else le[0]!==o.BACK&&(le[0]=o.BACK,ve=!0);ve&&o.drawBuffers(le)}function Dt(Q){return w!==Q?(o.useProgram(Q),w=Q,!0):!1}const It={[Hi]:o.FUNC_ADD,[Ly]:o.FUNC_SUBTRACT,[Fy]:o.FUNC_REVERSE_SUBTRACT};It[By]=o.MIN,It[Vy]=o.MAX;const ft={[Oy]:o.ZERO,[ky]:o.ONE,[Gy]:o.SRC_COLOR,[Qs]:o.SRC_ALPHA,[Xy]:o.SRC_ALPHA_SATURATE,[qy]:o.DST_COLOR,[zy]:o.DST_ALPHA,[Hy]:o.ONE_MINUS_SRC_COLOR,[js]:o.ONE_MINUS_SRC_ALPHA,[$y]:o.ONE_MINUS_DST_COLOR,[Wy]:o.ONE_MINUS_DST_ALPHA,[Yy]:o.CONSTANT_COLOR,[Ky]:o.ONE_MINUS_CONSTANT_COLOR,[Zy]:o.CONSTANT_ALPHA,[Jy]:o.ONE_MINUS_CONSTANT_ALPHA};function Y(Q,oe,le,ve,Be,be,rt,Ut,Ot,Tt){if(Q===si){P===!0&&(qe(o.BLEND),P=!1);return}if(P===!1&&(Pe(o.BLEND),P=!0),Q!==Ny){if(Q!==C||Tt!==B){if((E!==Hi||b!==Hi)&&(o.blendEquation(o.FUNC_ADD),E=Hi,b=Hi),Tt)switch(Q){case _o:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Js:o.blendFunc(o.ONE,o.ONE);break;case Ou:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case ku:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",Q);break}else switch(Q){case _o:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Js:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case Ou:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case ku:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",Q);break}O=null,N=null,X=null,q=null,W.set(0,0,0),K=0,C=Q,B=Tt}return}Be=Be||oe,be=be||le,rt=rt||ve,(oe!==E||Be!==b)&&(o.blendEquationSeparate(It[oe],It[Be]),E=oe,b=Be),(le!==O||ve!==N||be!==X||rt!==q)&&(o.blendFuncSeparate(ft[le],ft[ve],ft[be],ft[rt]),O=le,N=ve,X=be,q=rt),(Ut.equals(W)===!1||Ot!==K)&&(o.blendColor(Ut.r,Ut.g,Ut.b,Ot),W.copy(Ut),K=Ot),C=Q,B=!1}function jt(Q,oe){Q.side===ti?qe(o.CULL_FACE):Pe(o.CULL_FACE);let le=Q.side===cn;oe&&(le=!le),vt(le),Q.blending===_o&&Q.transparent===!1?Y(si):Y(Q.blending,Q.blendEquation,Q.blendSrc,Q.blendDst,Q.blendEquationAlpha,Q.blendSrcAlpha,Q.blendDstAlpha,Q.blendColor,Q.blendAlpha,Q.premultipliedAlpha),l.setFunc(Q.depthFunc),l.setTest(Q.depthTest),l.setMask(Q.depthWrite),s.setMask(Q.colorWrite);const ve=Q.stencilWrite;u.setTest(ve),ve&&(u.setMask(Q.stencilWriteMask),u.setFunc(Q.stencilFunc,Q.stencilRef,Q.stencilFuncMask),u.setOp(Q.stencilFail,Q.stencilZFail,Q.stencilZPass)),bt(Q.polygonOffset,Q.polygonOffsetFactor,Q.polygonOffsetUnits),Q.alphaToCoverage===!0?Pe(o.SAMPLE_ALPHA_TO_COVERAGE):qe(o.SAMPLE_ALPHA_TO_COVERAGE)}function vt(Q){D!==Q&&(Q?o.frontFace(o.CW):o.frontFace(o.CCW),D=Q)}function gt(Q){Q!==Dy?(Pe(o.CULL_FACE),Q!==$&&(Q===Vu?o.cullFace(o.BACK):Q===by?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):qe(o.CULL_FACE),$=Q}function Je(Q){Q!==ae&&(de&&o.lineWidth(Q),ae=Q)}function bt(Q,oe,le){Q?(Pe(o.POLYGON_OFFSET_FILL),(re!==oe||pe!==le)&&(o.polygonOffset(oe,le),re=oe,pe=le)):qe(o.POLYGON_OFFSET_FILL)}function Ye(Q){Q?Pe(o.SCISSOR_TEST):qe(o.SCISSOR_TEST)}function k(Q){Q===void 0&&(Q=o.TEXTURE0+xe-1),Ie!==Q&&(o.activeTexture(Q),Ie=Q)}function I(Q,oe,le){le===void 0&&(Ie===null?le=o.TEXTURE0+xe-1:le=Ie);let ve=Ue[le];ve===void 0&&(ve={type:void 0,texture:void 0},Ue[le]=ve),(ve.type!==Q||ve.texture!==oe)&&(Ie!==le&&(o.activeTexture(le),Ie=le),o.bindTexture(Q,oe||Ae[Q]),ve.type=Q,ve.texture=oe)}function ne(){const Q=Ue[Ie];Q!==void 0&&Q.type!==void 0&&(o.bindTexture(Q.type,null),Q.type=void 0,Q.texture=void 0)}function ge(){try{o.compressedTexImage2D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Se(){try{o.compressedTexImage3D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function ce(){try{o.texSubImage2D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function $e(){try{o.texSubImage3D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Ne(){try{o.compressedTexSubImage2D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Ke(){try{o.compressedTexSubImage3D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function it(){try{o.texStorage2D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Me(){try{o.texStorage3D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Ve(){try{o.texImage2D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function ze(){try{o.texImage3D(...arguments)}catch(Q){console.error("THREE.WebGLState:",Q)}}function Xe(Q){ht.equals(Q)===!1&&(o.scissor(Q.x,Q.y,Q.z,Q.w),ht.copy(Q))}function Oe(Q){fe.equals(Q)===!1&&(o.viewport(Q.x,Q.y,Q.z,Q.w),fe.copy(Q))}function at(Q,oe){let le=m.get(oe);le===void 0&&(le=new WeakMap,m.set(oe,le));let ve=le.get(Q);ve===void 0&&(ve=o.getUniformBlockIndex(oe,Q.name),le.set(Q,ve))}function Qe(Q,oe){const ve=m.get(oe).get(Q);c.get(oe)!==ve&&(o.uniformBlockBinding(oe,ve,Q.__bindingPointIndex),c.set(oe,ve))}function st(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),l.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),_={},Ie=null,Ue={},v={},y=new WeakMap,T=[],w=null,P=!1,C=null,E=null,O=null,N=null,b=null,X=null,q=null,W=new Et(0,0,0),K=0,B=!1,D=null,$=null,ae=null,re=null,pe=null,ht.set(0,0,o.canvas.width,o.canvas.height),fe.set(0,0,o.canvas.width,o.canvas.height),s.reset(),l.reset(),u.reset()}return{buffers:{color:s,depth:l,stencil:u},enable:Pe,disable:qe,bindFramebuffer:mt,drawBuffers:nt,useProgram:Dt,setBlending:Y,setMaterial:jt,setFlipSided:vt,setCullFace:gt,setLineWidth:Je,setPolygonOffset:bt,setScissorTest:Ye,activeTexture:k,bindTexture:I,unbindTexture:ne,compressedTexImage2D:ge,compressedTexImage3D:Se,texImage2D:Ve,texImage3D:ze,updateUBOMapping:at,uniformBlockBinding:Qe,texStorage2D:it,texStorage3D:Me,texSubImage2D:ce,texSubImage3D:$e,compressedTexSubImage2D:Ne,compressedTexSubImage3D:Ke,scissor:Xe,viewport:Oe,reset:st}}function VM(o,e,t,n,i,s,l){const u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new ct,_=new WeakMap;let v;const y=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function w(k,I){return T?new OffscreenCanvas(k,I):ts("canvas")}function P(k,I,ne){let ge=1;const Se=Ye(k);if((Se.width>ne||Se.height>ne)&&(ge=ne/Math.max(Se.width,Se.height)),ge<1)if(typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&k instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&k instanceof ImageBitmap||typeof VideoFrame<"u"&&k instanceof VideoFrame){const ce=Math.floor(ge*Se.width),$e=Math.floor(ge*Se.height);v===void 0&&(v=w(ce,$e));const Ne=I?w(ce,$e):v;return Ne.width=ce,Ne.height=$e,Ne.getContext("2d").drawImage(k,0,0,ce,$e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Se.width+"x"+Se.height+") to ("+ce+"x"+$e+")."),Ne}else return"data"in k&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Se.width+"x"+Se.height+")."),k;return k}function C(k){return k.generateMipmaps}function E(k){o.generateMipmap(k)}function O(k){return k.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:k.isWebGL3DRenderTarget?o.TEXTURE_3D:k.isWebGLArrayRenderTarget||k.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function N(k,I,ne,ge,Se=!1){if(k!==null){if(o[k]!==void 0)return o[k];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+k+"'")}let ce=I;if(I===o.RED&&(ne===o.FLOAT&&(ce=o.R32F),ne===o.HALF_FLOAT&&(ce=o.R16F),ne===o.UNSIGNED_BYTE&&(ce=o.R8)),I===o.RED_INTEGER&&(ne===o.UNSIGNED_BYTE&&(ce=o.R8UI),ne===o.UNSIGNED_SHORT&&(ce=o.R16UI),ne===o.UNSIGNED_INT&&(ce=o.R32UI),ne===o.BYTE&&(ce=o.R8I),ne===o.SHORT&&(ce=o.R16I),ne===o.INT&&(ce=o.R32I)),I===o.RG&&(ne===o.FLOAT&&(ce=o.RG32F),ne===o.HALF_FLOAT&&(ce=o.RG16F),ne===o.UNSIGNED_BYTE&&(ce=o.RG8)),I===o.RG_INTEGER&&(ne===o.UNSIGNED_BYTE&&(ce=o.RG8UI),ne===o.UNSIGNED_SHORT&&(ce=o.RG16UI),ne===o.UNSIGNED_INT&&(ce=o.RG32UI),ne===o.BYTE&&(ce=o.RG8I),ne===o.SHORT&&(ce=o.RG16I),ne===o.INT&&(ce=o.RG32I)),I===o.RGB_INTEGER&&(ne===o.UNSIGNED_BYTE&&(ce=o.RGB8UI),ne===o.UNSIGNED_SHORT&&(ce=o.RGB16UI),ne===o.UNSIGNED_INT&&(ce=o.RGB32UI),ne===o.BYTE&&(ce=o.RGB8I),ne===o.SHORT&&(ce=o.RGB16I),ne===o.INT&&(ce=o.RGB32I)),I===o.RGBA_INTEGER&&(ne===o.UNSIGNED_BYTE&&(ce=o.RGBA8UI),ne===o.UNSIGNED_SHORT&&(ce=o.RGBA16UI),ne===o.UNSIGNED_INT&&(ce=o.RGBA32UI),ne===o.BYTE&&(ce=o.RGBA8I),ne===o.SHORT&&(ce=o.RGBA16I),ne===o.INT&&(ce=o.RGBA32I)),I===o.RGB&&ne===o.UNSIGNED_INT_5_9_9_9_REV&&(ce=o.RGB9_E5),I===o.RGBA){const $e=Se?jr:Rt.getTransfer(ge);ne===o.FLOAT&&(ce=o.RGBA32F),ne===o.HALF_FLOAT&&(ce=o.RGBA16F),ne===o.UNSIGNED_BYTE&&(ce=$e===Lt?o.SRGB8_ALPHA8:o.RGBA8),ne===o.UNSIGNED_SHORT_4_4_4_4&&(ce=o.RGBA4),ne===o.UNSIGNED_SHORT_5_5_5_1&&(ce=o.RGB5_A1)}return(ce===o.R16F||ce===o.R32F||ce===o.RG16F||ce===o.RG32F||ce===o.RGBA16F||ce===o.RGBA32F)&&e.get("EXT_color_buffer_float"),ce}function b(k,I){let ne;return k?I===null||I===Xi||I===Xo?ne=o.DEPTH24_STENCIL8:I===Rn?ne=o.DEPTH32F_STENCIL8:I===$o&&(ne=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):I===null||I===Xi||I===Xo?ne=o.DEPTH_COMPONENT24:I===Rn?ne=o.DEPTH_COMPONENT32F:I===$o&&(ne=o.DEPTH_COMPONENT16),ne}function X(k,I){return C(k)===!0||k.isFramebufferTexture&&k.minFilter!==Tn&&k.minFilter!==ln?Math.log2(Math.max(I.width,I.height))+1:k.mipmaps!==void 0&&k.mipmaps.length>0?k.mipmaps.length:k.isCompressedTexture&&Array.isArray(k.image)?I.mipmaps.length:1}function q(k){const I=k.target;I.removeEventListener("dispose",q),K(I),I.isVideoTexture&&_.delete(I)}function W(k){const I=k.target;I.removeEventListener("dispose",W),D(I)}function K(k){const I=n.get(k);if(I.__webglInit===void 0)return;const ne=k.source,ge=y.get(ne);if(ge){const Se=ge[I.__cacheKey];Se.usedTimes--,Se.usedTimes===0&&B(k),Object.keys(ge).length===0&&y.delete(ne)}n.remove(k)}function B(k){const I=n.get(k);o.deleteTexture(I.__webglTexture);const ne=k.source,ge=y.get(ne);delete ge[I.__cacheKey],l.memory.textures--}function D(k){const I=n.get(k);if(k.depthTexture&&(k.depthTexture.dispose(),n.remove(k.depthTexture)),k.isWebGLCubeRenderTarget)for(let ge=0;ge<6;ge++){if(Array.isArray(I.__webglFramebuffer[ge]))for(let Se=0;Se<I.__webglFramebuffer[ge].length;Se++)o.deleteFramebuffer(I.__webglFramebuffer[ge][Se]);else o.deleteFramebuffer(I.__webglFramebuffer[ge]);I.__webglDepthbuffer&&o.deleteRenderbuffer(I.__webglDepthbuffer[ge])}else{if(Array.isArray(I.__webglFramebuffer))for(let ge=0;ge<I.__webglFramebuffer.length;ge++)o.deleteFramebuffer(I.__webglFramebuffer[ge]);else o.deleteFramebuffer(I.__webglFramebuffer);if(I.__webglDepthbuffer&&o.deleteRenderbuffer(I.__webglDepthbuffer),I.__webglMultisampledFramebuffer&&o.deleteFramebuffer(I.__webglMultisampledFramebuffer),I.__webglColorRenderbuffer)for(let ge=0;ge<I.__webglColorRenderbuffer.length;ge++)I.__webglColorRenderbuffer[ge]&&o.deleteRenderbuffer(I.__webglColorRenderbuffer[ge]);I.__webglDepthRenderbuffer&&o.deleteRenderbuffer(I.__webglDepthRenderbuffer)}const ne=k.textures;for(let ge=0,Se=ne.length;ge<Se;ge++){const ce=n.get(ne[ge]);ce.__webglTexture&&(o.deleteTexture(ce.__webglTexture),l.memory.textures--),n.remove(ne[ge])}n.remove(k)}let $=0;function ae(){$=0}function re(){const k=$;return k>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+k+" texture units while this GPU supports only "+i.maxTextures),$+=1,k}function pe(k){const I=[];return I.push(k.wrapS),I.push(k.wrapT),I.push(k.wrapR||0),I.push(k.magFilter),I.push(k.minFilter),I.push(k.anisotropy),I.push(k.internalFormat),I.push(k.format),I.push(k.type),I.push(k.generateMipmaps),I.push(k.premultiplyAlpha),I.push(k.flipY),I.push(k.unpackAlignment),I.push(k.colorSpace),I.join()}function xe(k,I){const ne=n.get(k);if(k.isVideoTexture&&Je(k),k.isRenderTargetTexture===!1&&k.version>0&&ne.__version!==k.version){const ge=k.image;if(ge===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ge.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{fe(ne,k,I);return}}t.bindTexture(o.TEXTURE_2D,ne.__webglTexture,o.TEXTURE0+I)}function de(k,I){const ne=n.get(k);if(k.version>0&&ne.__version!==k.version){fe(ne,k,I);return}t.bindTexture(o.TEXTURE_2D_ARRAY,ne.__webglTexture,o.TEXTURE0+I)}function Ee(k,I){const ne=n.get(k);if(k.version>0&&ne.__version!==k.version){fe(ne,k,I);return}t.bindTexture(o.TEXTURE_3D,ne.__webglTexture,o.TEXTURE0+I)}function ue(k,I){const ne=n.get(k);if(k.version>0&&ne.__version!==k.version){we(ne,k,I);return}t.bindTexture(o.TEXTURE_CUBE_MAP,ne.__webglTexture,o.TEXTURE0+I)}const Ie={[la]:o.REPEAT,[oi]:o.CLAMP_TO_EDGE,[ua]:o.MIRRORED_REPEAT},Ue={[Tn]:o.NEAREST,[a0]:o.NEAREST_MIPMAP_NEAREST,[dr]:o.NEAREST_MIPMAP_LINEAR,[ln]:o.LINEAR,[hs]:o.LINEAR_MIPMAP_NEAREST,[Mi]:o.LINEAR_MIPMAP_LINEAR},We={[f0]:o.NEVER,[_0]:o.ALWAYS,[d0]:o.LESS,[df]:o.LEQUAL,[h0]:o.EQUAL,[g0]:o.GEQUAL,[p0]:o.GREATER,[m0]:o.NOTEQUAL};function tt(k,I){if(I.type===Rn&&e.has("OES_texture_float_linear")===!1&&(I.magFilter===ln||I.magFilter===hs||I.magFilter===dr||I.magFilter===Mi||I.minFilter===ln||I.minFilter===hs||I.minFilter===dr||I.minFilter===Mi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(k,o.TEXTURE_WRAP_S,Ie[I.wrapS]),o.texParameteri(k,o.TEXTURE_WRAP_T,Ie[I.wrapT]),(k===o.TEXTURE_3D||k===o.TEXTURE_2D_ARRAY)&&o.texParameteri(k,o.TEXTURE_WRAP_R,Ie[I.wrapR]),o.texParameteri(k,o.TEXTURE_MAG_FILTER,Ue[I.magFilter]),o.texParameteri(k,o.TEXTURE_MIN_FILTER,Ue[I.minFilter]),I.compareFunction&&(o.texParameteri(k,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(k,o.TEXTURE_COMPARE_FUNC,We[I.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(I.magFilter===Tn||I.minFilter!==dr&&I.minFilter!==Mi||I.type===Rn&&e.has("OES_texture_float_linear")===!1)return;if(I.anisotropy>1||n.get(I).__currentAnisotropy){const ne=e.get("EXT_texture_filter_anisotropic");o.texParameterf(k,ne.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(I.anisotropy,i.getMaxAnisotropy())),n.get(I).__currentAnisotropy=I.anisotropy}}}function ht(k,I){let ne=!1;k.__webglInit===void 0&&(k.__webglInit=!0,I.addEventListener("dispose",q));const ge=I.source;let Se=y.get(ge);Se===void 0&&(Se={},y.set(ge,Se));const ce=pe(I);if(ce!==k.__cacheKey){Se[ce]===void 0&&(Se[ce]={texture:o.createTexture(),usedTimes:0},l.memory.textures++,ne=!0),Se[ce].usedTimes++;const $e=Se[k.__cacheKey];$e!==void 0&&(Se[k.__cacheKey].usedTimes--,$e.usedTimes===0&&B(I)),k.__cacheKey=ce,k.__webglTexture=Se[ce].texture}return ne}function fe(k,I,ne){let ge=o.TEXTURE_2D;(I.isDataArrayTexture||I.isCompressedArrayTexture)&&(ge=o.TEXTURE_2D_ARRAY),I.isData3DTexture&&(ge=o.TEXTURE_3D);const Se=ht(k,I),ce=I.source;t.bindTexture(ge,k.__webglTexture,o.TEXTURE0+ne);const $e=n.get(ce);if(ce.version!==$e.__version||Se===!0){t.activeTexture(o.TEXTURE0+ne);const Ne=Rt.getPrimaries(Rt.workingColorSpace),Ke=I.colorSpace===ni?null:Rt.getPrimaries(I.colorSpace),it=I.colorSpace===ni||Ne===Ke?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,I.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,I.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,it);let Me=P(I.image,!1,i.maxTextureSize);Me=bt(I,Me);const Ve=s.convert(I.format,I.colorSpace),ze=s.convert(I.type);let Xe=N(I.internalFormat,Ve,ze,I.colorSpace,I.isVideoTexture);tt(ge,I);let Oe;const at=I.mipmaps,Qe=I.isVideoTexture!==!0,st=$e.__version===void 0||Se===!0,Q=ce.dataReady,oe=X(I,Me);if(I.isDepthTexture)Xe=b(I.format===Ko,I.type),st&&(Qe?t.texStorage2D(o.TEXTURE_2D,1,Xe,Me.width,Me.height):t.texImage2D(o.TEXTURE_2D,0,Xe,Me.width,Me.height,0,Ve,ze,null));else if(I.isDataTexture)if(at.length>0){Qe&&st&&t.texStorage2D(o.TEXTURE_2D,oe,Xe,at[0].width,at[0].height);for(let le=0,ve=at.length;le<ve;le++)Oe=at[le],Qe?Q&&t.texSubImage2D(o.TEXTURE_2D,le,0,0,Oe.width,Oe.height,Ve,ze,Oe.data):t.texImage2D(o.TEXTURE_2D,le,Xe,Oe.width,Oe.height,0,Ve,ze,Oe.data);I.generateMipmaps=!1}else Qe?(st&&t.texStorage2D(o.TEXTURE_2D,oe,Xe,Me.width,Me.height),Q&&t.texSubImage2D(o.TEXTURE_2D,0,0,0,Me.width,Me.height,Ve,ze,Me.data)):t.texImage2D(o.TEXTURE_2D,0,Xe,Me.width,Me.height,0,Ve,ze,Me.data);else if(I.isCompressedTexture)if(I.isCompressedArrayTexture){Qe&&st&&t.texStorage3D(o.TEXTURE_2D_ARRAY,oe,Xe,at[0].width,at[0].height,Me.depth);for(let le=0,ve=at.length;le<ve;le++)if(Oe=at[le],I.format!==In)if(Ve!==null)if(Qe){if(Q)if(I.layerUpdates.size>0){const Be=uc(Oe.width,Oe.height,I.format,I.type);for(const be of I.layerUpdates){const rt=Oe.data.subarray(be*Be/Oe.data.BYTES_PER_ELEMENT,(be+1)*Be/Oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,le,0,0,be,Oe.width,Oe.height,1,Ve,rt)}I.clearLayerUpdates()}else t.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,le,0,0,0,Oe.width,Oe.height,Me.depth,Ve,Oe.data)}else t.compressedTexImage3D(o.TEXTURE_2D_ARRAY,le,Xe,Oe.width,Oe.height,Me.depth,0,Oe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Qe?Q&&t.texSubImage3D(o.TEXTURE_2D_ARRAY,le,0,0,0,Oe.width,Oe.height,Me.depth,Ve,ze,Oe.data):t.texImage3D(o.TEXTURE_2D_ARRAY,le,Xe,Oe.width,Oe.height,Me.depth,0,Ve,ze,Oe.data)}else{Qe&&st&&t.texStorage2D(o.TEXTURE_2D,oe,Xe,at[0].width,at[0].height);for(let le=0,ve=at.length;le<ve;le++)Oe=at[le],I.format!==In?Ve!==null?Qe?Q&&t.compressedTexSubImage2D(o.TEXTURE_2D,le,0,0,Oe.width,Oe.height,Ve,Oe.data):t.compressedTexImage2D(o.TEXTURE_2D,le,Xe,Oe.width,Oe.height,0,Oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qe?Q&&t.texSubImage2D(o.TEXTURE_2D,le,0,0,Oe.width,Oe.height,Ve,ze,Oe.data):t.texImage2D(o.TEXTURE_2D,le,Xe,Oe.width,Oe.height,0,Ve,ze,Oe.data)}else if(I.isDataArrayTexture)if(Qe){if(st&&t.texStorage3D(o.TEXTURE_2D_ARRAY,oe,Xe,Me.width,Me.height,Me.depth),Q)if(I.layerUpdates.size>0){const le=uc(Me.width,Me.height,I.format,I.type);for(const ve of I.layerUpdates){const Be=Me.data.subarray(ve*le/Me.data.BYTES_PER_ELEMENT,(ve+1)*le/Me.data.BYTES_PER_ELEMENT);t.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,ve,Me.width,Me.height,1,Ve,ze,Be)}I.clearLayerUpdates()}else t.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,Me.width,Me.height,Me.depth,Ve,ze,Me.data)}else t.texImage3D(o.TEXTURE_2D_ARRAY,0,Xe,Me.width,Me.height,Me.depth,0,Ve,ze,Me.data);else if(I.isData3DTexture)Qe?(st&&t.texStorage3D(o.TEXTURE_3D,oe,Xe,Me.width,Me.height,Me.depth),Q&&t.texSubImage3D(o.TEXTURE_3D,0,0,0,0,Me.width,Me.height,Me.depth,Ve,ze,Me.data)):t.texImage3D(o.TEXTURE_3D,0,Xe,Me.width,Me.height,Me.depth,0,Ve,ze,Me.data);else if(I.isFramebufferTexture){if(st)if(Qe)t.texStorage2D(o.TEXTURE_2D,oe,Xe,Me.width,Me.height);else{let le=Me.width,ve=Me.height;for(let Be=0;Be<oe;Be++)t.texImage2D(o.TEXTURE_2D,Be,Xe,le,ve,0,Ve,ze,null),le>>=1,ve>>=1}}else if(at.length>0){if(Qe&&st){const le=Ye(at[0]);t.texStorage2D(o.TEXTURE_2D,oe,Xe,le.width,le.height)}for(let le=0,ve=at.length;le<ve;le++)Oe=at[le],Qe?Q&&t.texSubImage2D(o.TEXTURE_2D,le,0,0,Ve,ze,Oe):t.texImage2D(o.TEXTURE_2D,le,Xe,Ve,ze,Oe);I.generateMipmaps=!1}else if(Qe){if(st){const le=Ye(Me);t.texStorage2D(o.TEXTURE_2D,oe,Xe,le.width,le.height)}Q&&t.texSubImage2D(o.TEXTURE_2D,0,0,0,Ve,ze,Me)}else t.texImage2D(o.TEXTURE_2D,0,Xe,Ve,ze,Me);C(I)&&E(ge),$e.__version=ce.version,I.onUpdate&&I.onUpdate(I)}k.__version=I.version}function we(k,I,ne){if(I.image.length!==6)return;const ge=ht(k,I),Se=I.source;t.bindTexture(o.TEXTURE_CUBE_MAP,k.__webglTexture,o.TEXTURE0+ne);const ce=n.get(Se);if(Se.version!==ce.__version||ge===!0){t.activeTexture(o.TEXTURE0+ne);const $e=Rt.getPrimaries(Rt.workingColorSpace),Ne=I.colorSpace===ni?null:Rt.getPrimaries(I.colorSpace),Ke=I.colorSpace===ni||$e===Ne?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,I.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,I.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);const it=I.isCompressedTexture||I.image[0].isCompressedTexture,Me=I.image[0]&&I.image[0].isDataTexture,Ve=[];for(let ve=0;ve<6;ve++)!it&&!Me?Ve[ve]=P(I.image[ve],!0,i.maxCubemapSize):Ve[ve]=Me?I.image[ve].image:I.image[ve],Ve[ve]=bt(I,Ve[ve]);const ze=Ve[0],Xe=s.convert(I.format,I.colorSpace),Oe=s.convert(I.type),at=N(I.internalFormat,Xe,Oe,I.colorSpace),Qe=I.isVideoTexture!==!0,st=ce.__version===void 0||ge===!0,Q=Se.dataReady;let oe=X(I,ze);tt(o.TEXTURE_CUBE_MAP,I);let le;if(it){Qe&&st&&t.texStorage2D(o.TEXTURE_CUBE_MAP,oe,at,ze.width,ze.height);for(let ve=0;ve<6;ve++){le=Ve[ve].mipmaps;for(let Be=0;Be<le.length;Be++){const be=le[Be];I.format!==In?Xe!==null?Qe?Q&&t.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Be,0,0,be.width,be.height,Xe,be.data):t.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Be,at,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Qe?Q&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Be,0,0,be.width,be.height,Xe,Oe,be.data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Be,at,be.width,be.height,0,Xe,Oe,be.data)}}}else{if(le=I.mipmaps,Qe&&st){le.length>0&&oe++;const ve=Ye(Ve[0]);t.texStorage2D(o.TEXTURE_CUBE_MAP,oe,at,ve.width,ve.height)}for(let ve=0;ve<6;ve++)if(Me){Qe?Q&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,Ve[ve].width,Ve[ve].height,Xe,Oe,Ve[ve].data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,at,Ve[ve].width,Ve[ve].height,0,Xe,Oe,Ve[ve].data);for(let Be=0;Be<le.length;Be++){const rt=le[Be].image[ve].image;Qe?Q&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Be+1,0,0,rt.width,rt.height,Xe,Oe,rt.data):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Be+1,at,rt.width,rt.height,0,Xe,Oe,rt.data)}}else{Qe?Q&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,0,0,Xe,Oe,Ve[ve]):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,at,Xe,Oe,Ve[ve]);for(let Be=0;Be<le.length;Be++){const be=le[Be];Qe?Q&&t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Be+1,0,0,Xe,Oe,be.image[ve]):t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Be+1,at,Xe,Oe,be.image[ve])}}}C(I)&&E(o.TEXTURE_CUBE_MAP),ce.__version=Se.version,I.onUpdate&&I.onUpdate(I)}k.__version=I.version}function Ae(k,I,ne,ge,Se,ce){const $e=s.convert(ne.format,ne.colorSpace),Ne=s.convert(ne.type),Ke=N(ne.internalFormat,$e,Ne,ne.colorSpace),it=n.get(I),Me=n.get(ne);if(Me.__renderTarget=I,!it.__hasExternalTextures){const Ve=Math.max(1,I.width>>ce),ze=Math.max(1,I.height>>ce);Se===o.TEXTURE_3D||Se===o.TEXTURE_2D_ARRAY?t.texImage3D(Se,ce,Ke,Ve,ze,I.depth,0,$e,Ne,null):t.texImage2D(Se,ce,Ke,Ve,ze,0,$e,Ne,null)}t.bindFramebuffer(o.FRAMEBUFFER,k),gt(I)?u.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,ge,Se,Me.__webglTexture,0,vt(I)):(Se===o.TEXTURE_2D||Se>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&Se<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,ge,Se,Me.__webglTexture,ce),t.bindFramebuffer(o.FRAMEBUFFER,null)}function Pe(k,I,ne){if(o.bindRenderbuffer(o.RENDERBUFFER,k),I.depthBuffer){const ge=I.depthTexture,Se=ge&&ge.isDepthTexture?ge.type:null,ce=b(I.stencilBuffer,Se),$e=I.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ne=vt(I);gt(I)?u.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Ne,ce,I.width,I.height):ne?o.renderbufferStorageMultisample(o.RENDERBUFFER,Ne,ce,I.width,I.height):o.renderbufferStorage(o.RENDERBUFFER,ce,I.width,I.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,$e,o.RENDERBUFFER,k)}else{const ge=I.textures;for(let Se=0;Se<ge.length;Se++){const ce=ge[Se],$e=s.convert(ce.format,ce.colorSpace),Ne=s.convert(ce.type),Ke=N(ce.internalFormat,$e,Ne,ce.colorSpace),it=vt(I);ne&&gt(I)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,it,Ke,I.width,I.height):gt(I)?u.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,it,Ke,I.width,I.height):o.renderbufferStorage(o.RENDERBUFFER,Ke,I.width,I.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function qe(k,I){if(I&&I.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(o.FRAMEBUFFER,k),!(I.depthTexture&&I.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ge=n.get(I.depthTexture);ge.__renderTarget=I,(!ge.__webglTexture||I.depthTexture.image.width!==I.width||I.depthTexture.image.height!==I.height)&&(I.depthTexture.image.width=I.width,I.depthTexture.image.height=I.height,I.depthTexture.needsUpdate=!0),xe(I.depthTexture,0);const Se=ge.__webglTexture,ce=vt(I);if(I.depthTexture.format===Yo)gt(I)?u.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,Se,0,ce):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,Se,0);else if(I.depthTexture.format===Ko)gt(I)?u.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,Se,0,ce):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,Se,0);else throw new Error("Unknown depthTexture format")}function mt(k){const I=n.get(k),ne=k.isWebGLCubeRenderTarget===!0;if(I.__boundDepthTexture!==k.depthTexture){const ge=k.depthTexture;if(I.__depthDisposeCallback&&I.__depthDisposeCallback(),ge){const Se=()=>{delete I.__boundDepthTexture,delete I.__depthDisposeCallback,ge.removeEventListener("dispose",Se)};ge.addEventListener("dispose",Se),I.__depthDisposeCallback=Se}I.__boundDepthTexture=ge}if(k.depthTexture&&!I.__autoAllocateDepthBuffer){if(ne)throw new Error("target.depthTexture not supported in Cube render targets");const ge=k.texture.mipmaps;ge&&ge.length>0?qe(I.__webglFramebuffer[0],k):qe(I.__webglFramebuffer,k)}else if(ne){I.__webglDepthbuffer=[];for(let ge=0;ge<6;ge++)if(t.bindFramebuffer(o.FRAMEBUFFER,I.__webglFramebuffer[ge]),I.__webglDepthbuffer[ge]===void 0)I.__webglDepthbuffer[ge]=o.createRenderbuffer(),Pe(I.__webglDepthbuffer[ge],k,!1);else{const Se=k.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ce=I.__webglDepthbuffer[ge];o.bindRenderbuffer(o.RENDERBUFFER,ce),o.framebufferRenderbuffer(o.FRAMEBUFFER,Se,o.RENDERBUFFER,ce)}}else{const ge=k.texture.mipmaps;if(ge&&ge.length>0?t.bindFramebuffer(o.FRAMEBUFFER,I.__webglFramebuffer[0]):t.bindFramebuffer(o.FRAMEBUFFER,I.__webglFramebuffer),I.__webglDepthbuffer===void 0)I.__webglDepthbuffer=o.createRenderbuffer(),Pe(I.__webglDepthbuffer,k,!1);else{const Se=k.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,ce=I.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,ce),o.framebufferRenderbuffer(o.FRAMEBUFFER,Se,o.RENDERBUFFER,ce)}}t.bindFramebuffer(o.FRAMEBUFFER,null)}function nt(k,I,ne){const ge=n.get(k);I!==void 0&&Ae(ge.__webglFramebuffer,k,k.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),ne!==void 0&&mt(k)}function Dt(k){const I=k.texture,ne=n.get(k),ge=n.get(I);k.addEventListener("dispose",W);const Se=k.textures,ce=k.isWebGLCubeRenderTarget===!0,$e=Se.length>1;if($e||(ge.__webglTexture===void 0&&(ge.__webglTexture=o.createTexture()),ge.__version=I.version,l.memory.textures++),ce){ne.__webglFramebuffer=[];for(let Ne=0;Ne<6;Ne++)if(I.mipmaps&&I.mipmaps.length>0){ne.__webglFramebuffer[Ne]=[];for(let Ke=0;Ke<I.mipmaps.length;Ke++)ne.__webglFramebuffer[Ne][Ke]=o.createFramebuffer()}else ne.__webglFramebuffer[Ne]=o.createFramebuffer()}else{if(I.mipmaps&&I.mipmaps.length>0){ne.__webglFramebuffer=[];for(let Ne=0;Ne<I.mipmaps.length;Ne++)ne.__webglFramebuffer[Ne]=o.createFramebuffer()}else ne.__webglFramebuffer=o.createFramebuffer();if($e)for(let Ne=0,Ke=Se.length;Ne<Ke;Ne++){const it=n.get(Se[Ne]);it.__webglTexture===void 0&&(it.__webglTexture=o.createTexture(),l.memory.textures++)}if(k.samples>0&&gt(k)===!1){ne.__webglMultisampledFramebuffer=o.createFramebuffer(),ne.__webglColorRenderbuffer=[],t.bindFramebuffer(o.FRAMEBUFFER,ne.__webglMultisampledFramebuffer);for(let Ne=0;Ne<Se.length;Ne++){const Ke=Se[Ne];ne.__webglColorRenderbuffer[Ne]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,ne.__webglColorRenderbuffer[Ne]);const it=s.convert(Ke.format,Ke.colorSpace),Me=s.convert(Ke.type),Ve=N(Ke.internalFormat,it,Me,Ke.colorSpace,k.isXRRenderTarget===!0),ze=vt(k);o.renderbufferStorageMultisample(o.RENDERBUFFER,ze,Ve,k.width,k.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ne,o.RENDERBUFFER,ne.__webglColorRenderbuffer[Ne])}o.bindRenderbuffer(o.RENDERBUFFER,null),k.depthBuffer&&(ne.__webglDepthRenderbuffer=o.createRenderbuffer(),Pe(ne.__webglDepthRenderbuffer,k,!0)),t.bindFramebuffer(o.FRAMEBUFFER,null)}}if(ce){t.bindTexture(o.TEXTURE_CUBE_MAP,ge.__webglTexture),tt(o.TEXTURE_CUBE_MAP,I);for(let Ne=0;Ne<6;Ne++)if(I.mipmaps&&I.mipmaps.length>0)for(let Ke=0;Ke<I.mipmaps.length;Ke++)Ae(ne.__webglFramebuffer[Ne][Ke],k,I,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,Ke);else Ae(ne.__webglFramebuffer[Ne],k,I,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Ne,0);C(I)&&E(o.TEXTURE_CUBE_MAP),t.unbindTexture()}else if($e){for(let Ne=0,Ke=Se.length;Ne<Ke;Ne++){const it=Se[Ne],Me=n.get(it);t.bindTexture(o.TEXTURE_2D,Me.__webglTexture),tt(o.TEXTURE_2D,it),Ae(ne.__webglFramebuffer,k,it,o.COLOR_ATTACHMENT0+Ne,o.TEXTURE_2D,0),C(it)&&E(o.TEXTURE_2D)}t.unbindTexture()}else{let Ne=o.TEXTURE_2D;if((k.isWebGL3DRenderTarget||k.isWebGLArrayRenderTarget)&&(Ne=k.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),t.bindTexture(Ne,ge.__webglTexture),tt(Ne,I),I.mipmaps&&I.mipmaps.length>0)for(let Ke=0;Ke<I.mipmaps.length;Ke++)Ae(ne.__webglFramebuffer[Ke],k,I,o.COLOR_ATTACHMENT0,Ne,Ke);else Ae(ne.__webglFramebuffer,k,I,o.COLOR_ATTACHMENT0,Ne,0);C(I)&&E(Ne),t.unbindTexture()}k.depthBuffer&&mt(k)}function It(k){const I=k.textures;for(let ne=0,ge=I.length;ne<ge;ne++){const Se=I[ne];if(C(Se)){const ce=O(k),$e=n.get(Se).__webglTexture;t.bindTexture(ce,$e),E(ce),t.unbindTexture()}}}const ft=[],Y=[];function jt(k){if(k.samples>0){if(gt(k)===!1){const I=k.textures,ne=k.width,ge=k.height;let Se=o.COLOR_BUFFER_BIT;const ce=k.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,$e=n.get(k),Ne=I.length>1;if(Ne)for(let it=0;it<I.length;it++)t.bindFramebuffer(o.FRAMEBUFFER,$e.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+it,o.RENDERBUFFER,null),t.bindFramebuffer(o.FRAMEBUFFER,$e.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+it,o.TEXTURE_2D,null,0);t.bindFramebuffer(o.READ_FRAMEBUFFER,$e.__webglMultisampledFramebuffer);const Ke=k.texture.mipmaps;Ke&&Ke.length>0?t.bindFramebuffer(o.DRAW_FRAMEBUFFER,$e.__webglFramebuffer[0]):t.bindFramebuffer(o.DRAW_FRAMEBUFFER,$e.__webglFramebuffer);for(let it=0;it<I.length;it++){if(k.resolveDepthBuffer&&(k.depthBuffer&&(Se|=o.DEPTH_BUFFER_BIT),k.stencilBuffer&&k.resolveStencilBuffer&&(Se|=o.STENCIL_BUFFER_BIT)),Ne){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,$e.__webglColorRenderbuffer[it]);const Me=n.get(I[it]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,Me,0)}o.blitFramebuffer(0,0,ne,ge,0,0,ne,ge,Se,o.NEAREST),c===!0&&(ft.length=0,Y.length=0,ft.push(o.COLOR_ATTACHMENT0+it),k.depthBuffer&&k.resolveDepthBuffer===!1&&(ft.push(ce),Y.push(ce),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,Y)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,ft))}if(t.bindFramebuffer(o.READ_FRAMEBUFFER,null),t.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),Ne)for(let it=0;it<I.length;it++){t.bindFramebuffer(o.FRAMEBUFFER,$e.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+it,o.RENDERBUFFER,$e.__webglColorRenderbuffer[it]);const Me=n.get(I[it]).__webglTexture;t.bindFramebuffer(o.FRAMEBUFFER,$e.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+it,o.TEXTURE_2D,Me,0)}t.bindFramebuffer(o.DRAW_FRAMEBUFFER,$e.__webglMultisampledFramebuffer)}else if(k.depthBuffer&&k.resolveDepthBuffer===!1&&c){const I=k.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[I])}}}function vt(k){return Math.min(i.maxSamples,k.samples)}function gt(k){const I=n.get(k);return k.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&I.__useRenderToTexture!==!1}function Je(k){const I=l.render.frame;_.get(k)!==I&&(_.set(k,I),k.update())}function bt(k,I){const ne=k.colorSpace,ge=k.format,Se=k.type;return k.isCompressedTexture===!0||k.isVideoTexture===!0||ne!==Ri&&ne!==ni&&(Rt.getTransfer(ne)===Lt?(ge!==In||Se!==li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",ne)),I}function Ye(k){return typeof HTMLImageElement<"u"&&k instanceof HTMLImageElement?(m.width=k.naturalWidth||k.width,m.height=k.naturalHeight||k.height):typeof VideoFrame<"u"&&k instanceof VideoFrame?(m.width=k.displayWidth,m.height=k.displayHeight):(m.width=k.width,m.height=k.height),m}this.allocateTextureUnit=re,this.resetTextureUnits=ae,this.setTexture2D=xe,this.setTexture2DArray=de,this.setTexture3D=Ee,this.setTextureCube=ue,this.rebindTextures=nt,this.setupRenderTarget=Dt,this.updateRenderTargetMipmap=It,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=mt,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=gt}function OM(o,e){function t(n,i=ni){let s;const l=Rt.getTransfer(i);if(n===li)return o.UNSIGNED_BYTE;if(n===Ka)return o.UNSIGNED_SHORT_4_4_4_4;if(n===Za)return o.UNSIGNED_SHORT_5_5_5_1;if(n===sf)return o.UNSIGNED_INT_5_9_9_9_REV;if(n===of)return o.BYTE;if(n===rf)return o.SHORT;if(n===$o)return o.UNSIGNED_SHORT;if(n===Ya)return o.INT;if(n===Xi)return o.UNSIGNED_INT;if(n===Rn)return o.FLOAT;if(n===En)return o.HALF_FLOAT;if(n===af)return o.ALPHA;if(n===lf)return o.RGB;if(n===In)return o.RGBA;if(n===Yo)return o.DEPTH_COMPONENT;if(n===Ko)return o.DEPTH_STENCIL;if(n===Ja)return o.RED;if(n===Qa)return o.RED_INTEGER;if(n===uf)return o.RG;if(n===ja)return o.RG_INTEGER;if(n===el)return o.RGBA_INTEGER;if(n===Or||n===kr||n===Gr||n===Hr)if(l===Lt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Or)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===kr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Gr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Hr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Or)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===kr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Gr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Hr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ca||n===fa||n===da||n===ha)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ca)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===da)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ha)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===pa||n===ma||n===ga)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===pa||n===ma)return l===Lt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ga)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===_a||n===va||n===ya||n===xa||n===Ea||n===Ta||n===Sa||n===Ma||n===Ca||n===Aa||n===wa||n===Ra||n===Ia||n===Pa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===_a)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===va)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ya)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===xa)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ea)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ta)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sa)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ma)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ca)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Aa)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wa)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ra)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ia)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Pa)return l===Lt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===zr||n===Da||n===ba)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===zr)return l===Lt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Da)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ba)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===cf||n===Ua||n===Na||n===La)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===zr)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Ua)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Na)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===La)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xo?o.UNSIGNED_INT_24_8:o[n]!==void 0?o[n]:null}return{convert:t}}const kM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,GM=`
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

}`;class HM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new fn,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new un({vertexShader:kM,fragmentShader:GM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pn(new us(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class zM extends wo{constructor(e,t){super();const n=this;let i=null,s=1,l=null,u="local-floor",c=1,m=null,_=null,v=null,y=null,T=null,w=null;const P=new HM,C=t.getContextAttributes();let E=null,O=null;const N=[],b=[],X=new ct;let q=null;const W=new An;W.viewport=new Vt;const K=new An;K.viewport=new Vt;const B=[W,K],D=new ux;let $=null,ae=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(fe){let we=N[fe];return we===void 0&&(we=new Ls,N[fe]=we),we.getTargetRaySpace()},this.getControllerGrip=function(fe){let we=N[fe];return we===void 0&&(we=new Ls,N[fe]=we),we.getGripSpace()},this.getHand=function(fe){let we=N[fe];return we===void 0&&(we=new Ls,N[fe]=we),we.getHandSpace()};function re(fe){const we=b.indexOf(fe.inputSource);if(we===-1)return;const Ae=N[we];Ae!==void 0&&(Ae.update(fe.inputSource,fe.frame,m||l),Ae.dispatchEvent({type:fe.type,data:fe.inputSource}))}function pe(){i.removeEventListener("select",re),i.removeEventListener("selectstart",re),i.removeEventListener("selectend",re),i.removeEventListener("squeeze",re),i.removeEventListener("squeezestart",re),i.removeEventListener("squeezeend",re),i.removeEventListener("end",pe),i.removeEventListener("inputsourceschange",xe);for(let fe=0;fe<N.length;fe++){const we=b[fe];we!==null&&(b[fe]=null,N[fe].disconnect(we))}$=null,ae=null,P.reset(),e.setRenderTarget(E),T=null,y=null,v=null,i=null,O=null,ht.stop(),n.isPresenting=!1,e.setPixelRatio(q),e.setSize(X.width,X.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(fe){s=fe,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(fe){u=fe,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||l},this.setReferenceSpace=function(fe){m=fe},this.getBaseLayer=function(){return y!==null?y:T},this.getBinding=function(){return v},this.getFrame=function(){return w},this.getSession=function(){return i},this.setSession=async function(fe){if(i=fe,i!==null){if(E=e.getRenderTarget(),i.addEventListener("select",re),i.addEventListener("selectstart",re),i.addEventListener("selectend",re),i.addEventListener("squeeze",re),i.addEventListener("squeezestart",re),i.addEventListener("squeezeend",re),i.addEventListener("end",pe),i.addEventListener("inputsourceschange",xe),C.xrCompatible!==!0&&await t.makeXRCompatible(),q=e.getPixelRatio(),e.getSize(X),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ae=null,Pe=null,qe=null;C.depth&&(qe=C.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ae=C.stencil?Ko:Yo,Pe=C.stencil?Xo:Xi);const mt={colorFormat:t.RGBA8,depthFormat:qe,scaleFactor:s};v=new XRWebGLBinding(i,t),y=v.createProjectionLayer(mt),i.updateRenderState({layers:[y]}),e.setPixelRatio(1),e.setSize(y.textureWidth,y.textureHeight,!1),O=new kn(y.textureWidth,y.textureHeight,{format:In,type:li,depthTexture:new Sf(y.textureWidth,y.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,Ae),stencilBuffer:C.stencil,colorSpace:e.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}else{const Ae={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:s};T=new XRWebGLLayer(i,t,Ae),i.updateRenderState({baseLayer:T}),e.setPixelRatio(1),e.setSize(T.framebufferWidth,T.framebufferHeight,!1),O=new kn(T.framebufferWidth,T.framebufferHeight,{format:In,type:li,colorSpace:e.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:T.ignoreDepthValues===!1,resolveStencilBuffer:T.ignoreDepthValues===!1})}O.isXRRenderTarget=!0,this.setFoveation(c),m=null,l=await i.requestReferenceSpace(u),ht.setContext(i),ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return P.getDepthTexture()};function xe(fe){for(let we=0;we<fe.removed.length;we++){const Ae=fe.removed[we],Pe=b.indexOf(Ae);Pe>=0&&(b[Pe]=null,N[Pe].disconnect(Ae))}for(let we=0;we<fe.added.length;we++){const Ae=fe.added[we];let Pe=b.indexOf(Ae);if(Pe===-1){for(let mt=0;mt<N.length;mt++)if(mt>=b.length){b.push(Ae),Pe=mt;break}else if(b[mt]===null){b[mt]=Ae,Pe=mt;break}if(Pe===-1)break}const qe=N[Pe];qe&&qe.connect(Ae)}}const de=new ie,Ee=new ie;function ue(fe,we,Ae){de.setFromMatrixPosition(we.matrixWorld),Ee.setFromMatrixPosition(Ae.matrixWorld);const Pe=de.distanceTo(Ee),qe=we.projectionMatrix.elements,mt=Ae.projectionMatrix.elements,nt=qe[14]/(qe[10]-1),Dt=qe[14]/(qe[10]+1),It=(qe[9]+1)/qe[5],ft=(qe[9]-1)/qe[5],Y=(qe[8]-1)/qe[0],jt=(mt[8]+1)/mt[0],vt=nt*Y,gt=nt*jt,Je=Pe/(-Y+jt),bt=Je*-Y;if(we.matrixWorld.decompose(fe.position,fe.quaternion,fe.scale),fe.translateX(bt),fe.translateZ(Je),fe.matrixWorld.compose(fe.position,fe.quaternion,fe.scale),fe.matrixWorldInverse.copy(fe.matrixWorld).invert(),qe[10]===-1)fe.projectionMatrix.copy(we.projectionMatrix),fe.projectionMatrixInverse.copy(we.projectionMatrixInverse);else{const Ye=nt+Je,k=Dt+Je,I=vt-bt,ne=gt+(Pe-bt),ge=It*Dt/k*Ye,Se=ft*Dt/k*Ye;fe.projectionMatrix.makePerspective(I,ne,ge,Se,Ye,k),fe.projectionMatrixInverse.copy(fe.projectionMatrix).invert()}}function Ie(fe,we){we===null?fe.matrixWorld.copy(fe.matrix):fe.matrixWorld.multiplyMatrices(we.matrixWorld,fe.matrix),fe.matrixWorldInverse.copy(fe.matrixWorld).invert()}this.updateCamera=function(fe){if(i===null)return;let we=fe.near,Ae=fe.far;P.texture!==null&&(P.depthNear>0&&(we=P.depthNear),P.depthFar>0&&(Ae=P.depthFar)),D.near=K.near=W.near=we,D.far=K.far=W.far=Ae,($!==D.near||ae!==D.far)&&(i.updateRenderState({depthNear:D.near,depthFar:D.far}),$=D.near,ae=D.far),W.layers.mask=fe.layers.mask|2,K.layers.mask=fe.layers.mask|4,D.layers.mask=W.layers.mask|K.layers.mask;const Pe=fe.parent,qe=D.cameras;Ie(D,Pe);for(let mt=0;mt<qe.length;mt++)Ie(qe[mt],Pe);qe.length===2?ue(D,W,K):D.projectionMatrix.copy(W.projectionMatrix),Ue(fe,D,Pe)};function Ue(fe,we,Ae){Ae===null?fe.matrix.copy(we.matrixWorld):(fe.matrix.copy(Ae.matrixWorld),fe.matrix.invert(),fe.matrix.multiply(we.matrixWorld)),fe.matrix.decompose(fe.position,fe.quaternion,fe.scale),fe.updateMatrixWorld(!0),fe.projectionMatrix.copy(we.projectionMatrix),fe.projectionMatrixInverse.copy(we.projectionMatrixInverse),fe.isPerspectiveCamera&&(fe.fov=Ba*2*Math.atan(1/fe.projectionMatrix.elements[5]),fe.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(y===null&&T===null))return c},this.setFoveation=function(fe){c=fe,y!==null&&(y.fixedFoveation=fe),T!==null&&T.fixedFoveation!==void 0&&(T.fixedFoveation=fe)},this.hasDepthSensing=function(){return P.texture!==null},this.getDepthSensingMesh=function(){return P.getMesh(D)};let We=null;function tt(fe,we){if(_=we.getViewerPose(m||l),w=we,_!==null){const Ae=_.views;T!==null&&(e.setRenderTargetFramebuffer(O,T.framebuffer),e.setRenderTarget(O));let Pe=!1;Ae.length!==D.cameras.length&&(D.cameras.length=0,Pe=!0);for(let nt=0;nt<Ae.length;nt++){const Dt=Ae[nt];let It=null;if(T!==null)It=T.getViewport(Dt);else{const Y=v.getViewSubImage(y,Dt);It=Y.viewport,nt===0&&(e.setRenderTargetTextures(O,Y.colorTexture,Y.depthStencilTexture),e.setRenderTarget(O))}let ft=B[nt];ft===void 0&&(ft=new An,ft.layers.enable(nt),ft.viewport=new Vt,B[nt]=ft),ft.matrix.fromArray(Dt.transform.matrix),ft.matrix.decompose(ft.position,ft.quaternion,ft.scale),ft.projectionMatrix.fromArray(Dt.projectionMatrix),ft.projectionMatrixInverse.copy(ft.projectionMatrix).invert(),ft.viewport.set(It.x,It.y,It.width,It.height),nt===0&&(D.matrix.copy(ft.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),Pe===!0&&D.cameras.push(ft)}const qe=i.enabledFeatures;if(qe&&qe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){const nt=v.getDepthInformation(Ae[0]);nt&&nt.isValid&&nt.texture&&P.init(e,nt,i.renderState)}}for(let Ae=0;Ae<N.length;Ae++){const Pe=b[Ae],qe=N[Ae];Pe!==null&&qe!==void 0&&qe.update(Pe,we,m||l)}We&&We(fe,we),we.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:we}),w=null}const ht=new Cf;ht.setAnimationLoop(tt),this.setAnimationLoop=function(fe){We=fe},this.dispose=function(){}}}const Oi=new Gn,WM=new $t;function qM(o,e){function t(C,E){C.matrixAutoUpdate===!0&&C.updateMatrix(),E.value.copy(C.matrix)}function n(C,E){E.color.getRGB(C.fogColor.value,yf(o)),E.isFog?(C.fogNear.value=E.near,C.fogFar.value=E.far):E.isFogExp2&&(C.fogDensity.value=E.density)}function i(C,E,O,N,b){E.isMeshBasicMaterial||E.isMeshLambertMaterial?s(C,E):E.isMeshToonMaterial?(s(C,E),v(C,E)):E.isMeshPhongMaterial?(s(C,E),_(C,E)):E.isMeshStandardMaterial?(s(C,E),y(C,E),E.isMeshPhysicalMaterial&&T(C,E,b)):E.isMeshMatcapMaterial?(s(C,E),w(C,E)):E.isMeshDepthMaterial?s(C,E):E.isMeshDistanceMaterial?(s(C,E),P(C,E)):E.isMeshNormalMaterial?s(C,E):E.isLineBasicMaterial?(l(C,E),E.isLineDashedMaterial&&u(C,E)):E.isPointsMaterial?c(C,E,O,N):E.isSpriteMaterial?m(C,E):E.isShadowMaterial?(C.color.value.copy(E.color),C.opacity.value=E.opacity):E.isShaderMaterial&&(E.uniformsNeedUpdate=!1)}function s(C,E){C.opacity.value=E.opacity,E.color&&C.diffuse.value.copy(E.color),E.emissive&&C.emissive.value.copy(E.emissive).multiplyScalar(E.emissiveIntensity),E.map&&(C.map.value=E.map,t(E.map,C.mapTransform)),E.alphaMap&&(C.alphaMap.value=E.alphaMap,t(E.alphaMap,C.alphaMapTransform)),E.bumpMap&&(C.bumpMap.value=E.bumpMap,t(E.bumpMap,C.bumpMapTransform),C.bumpScale.value=E.bumpScale,E.side===cn&&(C.bumpScale.value*=-1)),E.normalMap&&(C.normalMap.value=E.normalMap,t(E.normalMap,C.normalMapTransform),C.normalScale.value.copy(E.normalScale),E.side===cn&&C.normalScale.value.negate()),E.displacementMap&&(C.displacementMap.value=E.displacementMap,t(E.displacementMap,C.displacementMapTransform),C.displacementScale.value=E.displacementScale,C.displacementBias.value=E.displacementBias),E.emissiveMap&&(C.emissiveMap.value=E.emissiveMap,t(E.emissiveMap,C.emissiveMapTransform)),E.specularMap&&(C.specularMap.value=E.specularMap,t(E.specularMap,C.specularMapTransform)),E.alphaTest>0&&(C.alphaTest.value=E.alphaTest);const O=e.get(E),N=O.envMap,b=O.envMapRotation;N&&(C.envMap.value=N,Oi.copy(b),Oi.x*=-1,Oi.y*=-1,Oi.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(Oi.y*=-1,Oi.z*=-1),C.envMapRotation.value.setFromMatrix4(WM.makeRotationFromEuler(Oi)),C.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,C.reflectivity.value=E.reflectivity,C.ior.value=E.ior,C.refractionRatio.value=E.refractionRatio),E.lightMap&&(C.lightMap.value=E.lightMap,C.lightMapIntensity.value=E.lightMapIntensity,t(E.lightMap,C.lightMapTransform)),E.aoMap&&(C.aoMap.value=E.aoMap,C.aoMapIntensity.value=E.aoMapIntensity,t(E.aoMap,C.aoMapTransform))}function l(C,E){C.diffuse.value.copy(E.color),C.opacity.value=E.opacity,E.map&&(C.map.value=E.map,t(E.map,C.mapTransform))}function u(C,E){C.dashSize.value=E.dashSize,C.totalSize.value=E.dashSize+E.gapSize,C.scale.value=E.scale}function c(C,E,O,N){C.diffuse.value.copy(E.color),C.opacity.value=E.opacity,C.size.value=E.size*O,C.scale.value=N*.5,E.map&&(C.map.value=E.map,t(E.map,C.uvTransform)),E.alphaMap&&(C.alphaMap.value=E.alphaMap,t(E.alphaMap,C.alphaMapTransform)),E.alphaTest>0&&(C.alphaTest.value=E.alphaTest)}function m(C,E){C.diffuse.value.copy(E.color),C.opacity.value=E.opacity,C.rotation.value=E.rotation,E.map&&(C.map.value=E.map,t(E.map,C.mapTransform)),E.alphaMap&&(C.alphaMap.value=E.alphaMap,t(E.alphaMap,C.alphaMapTransform)),E.alphaTest>0&&(C.alphaTest.value=E.alphaTest)}function _(C,E){C.specular.value.copy(E.specular),C.shininess.value=Math.max(E.shininess,1e-4)}function v(C,E){E.gradientMap&&(C.gradientMap.value=E.gradientMap)}function y(C,E){C.metalness.value=E.metalness,E.metalnessMap&&(C.metalnessMap.value=E.metalnessMap,t(E.metalnessMap,C.metalnessMapTransform)),C.roughness.value=E.roughness,E.roughnessMap&&(C.roughnessMap.value=E.roughnessMap,t(E.roughnessMap,C.roughnessMapTransform)),E.envMap&&(C.envMapIntensity.value=E.envMapIntensity)}function T(C,E,O){C.ior.value=E.ior,E.sheen>0&&(C.sheenColor.value.copy(E.sheenColor).multiplyScalar(E.sheen),C.sheenRoughness.value=E.sheenRoughness,E.sheenColorMap&&(C.sheenColorMap.value=E.sheenColorMap,t(E.sheenColorMap,C.sheenColorMapTransform)),E.sheenRoughnessMap&&(C.sheenRoughnessMap.value=E.sheenRoughnessMap,t(E.sheenRoughnessMap,C.sheenRoughnessMapTransform))),E.clearcoat>0&&(C.clearcoat.value=E.clearcoat,C.clearcoatRoughness.value=E.clearcoatRoughness,E.clearcoatMap&&(C.clearcoatMap.value=E.clearcoatMap,t(E.clearcoatMap,C.clearcoatMapTransform)),E.clearcoatRoughnessMap&&(C.clearcoatRoughnessMap.value=E.clearcoatRoughnessMap,t(E.clearcoatRoughnessMap,C.clearcoatRoughnessMapTransform)),E.clearcoatNormalMap&&(C.clearcoatNormalMap.value=E.clearcoatNormalMap,t(E.clearcoatNormalMap,C.clearcoatNormalMapTransform),C.clearcoatNormalScale.value.copy(E.clearcoatNormalScale),E.side===cn&&C.clearcoatNormalScale.value.negate())),E.dispersion>0&&(C.dispersion.value=E.dispersion),E.iridescence>0&&(C.iridescence.value=E.iridescence,C.iridescenceIOR.value=E.iridescenceIOR,C.iridescenceThicknessMinimum.value=E.iridescenceThicknessRange[0],C.iridescenceThicknessMaximum.value=E.iridescenceThicknessRange[1],E.iridescenceMap&&(C.iridescenceMap.value=E.iridescenceMap,t(E.iridescenceMap,C.iridescenceMapTransform)),E.iridescenceThicknessMap&&(C.iridescenceThicknessMap.value=E.iridescenceThicknessMap,t(E.iridescenceThicknessMap,C.iridescenceThicknessMapTransform))),E.transmission>0&&(C.transmission.value=E.transmission,C.transmissionSamplerMap.value=O.texture,C.transmissionSamplerSize.value.set(O.width,O.height),E.transmissionMap&&(C.transmissionMap.value=E.transmissionMap,t(E.transmissionMap,C.transmissionMapTransform)),C.thickness.value=E.thickness,E.thicknessMap&&(C.thicknessMap.value=E.thicknessMap,t(E.thicknessMap,C.thicknessMapTransform)),C.attenuationDistance.value=E.attenuationDistance,C.attenuationColor.value.copy(E.attenuationColor)),E.anisotropy>0&&(C.anisotropyVector.value.set(E.anisotropy*Math.cos(E.anisotropyRotation),E.anisotropy*Math.sin(E.anisotropyRotation)),E.anisotropyMap&&(C.anisotropyMap.value=E.anisotropyMap,t(E.anisotropyMap,C.anisotropyMapTransform))),C.specularIntensity.value=E.specularIntensity,C.specularColor.value.copy(E.specularColor),E.specularColorMap&&(C.specularColorMap.value=E.specularColorMap,t(E.specularColorMap,C.specularColorMapTransform)),E.specularIntensityMap&&(C.specularIntensityMap.value=E.specularIntensityMap,t(E.specularIntensityMap,C.specularIntensityMapTransform))}function w(C,E){E.matcap&&(C.matcap.value=E.matcap)}function P(C,E){const O=e.get(E).light;C.referencePosition.value.setFromMatrixPosition(O.matrixWorld),C.nearDistance.value=O.shadow.camera.near,C.farDistance.value=O.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function $M(o,e,t,n){let i={},s={},l=[];const u=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function c(O,N){const b=N.program;n.uniformBlockBinding(O,b)}function m(O,N){let b=i[O.id];b===void 0&&(w(O),b=_(O),i[O.id]=b,O.addEventListener("dispose",C));const X=N.program;n.updateUBOMapping(O,X);const q=e.render.frame;s[O.id]!==q&&(y(O),s[O.id]=q)}function _(O){const N=v();O.__bindingPointIndex=N;const b=o.createBuffer(),X=O.__size,q=O.usage;return o.bindBuffer(o.UNIFORM_BUFFER,b),o.bufferData(o.UNIFORM_BUFFER,X,q),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,N,b),b}function v(){for(let O=0;O<u;O++)if(l.indexOf(O)===-1)return l.push(O),O;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function y(O){const N=i[O.id],b=O.uniforms,X=O.__cache;o.bindBuffer(o.UNIFORM_BUFFER,N);for(let q=0,W=b.length;q<W;q++){const K=Array.isArray(b[q])?b[q]:[b[q]];for(let B=0,D=K.length;B<D;B++){const $=K[B];if(T($,q,B,X)===!0){const ae=$.__offset,re=Array.isArray($.value)?$.value:[$.value];let pe=0;for(let xe=0;xe<re.length;xe++){const de=re[xe],Ee=P(de);typeof de=="number"||typeof de=="boolean"?($.__data[0]=de,o.bufferSubData(o.UNIFORM_BUFFER,ae+pe,$.__data)):de.isMatrix3?($.__data[0]=de.elements[0],$.__data[1]=de.elements[1],$.__data[2]=de.elements[2],$.__data[3]=0,$.__data[4]=de.elements[3],$.__data[5]=de.elements[4],$.__data[6]=de.elements[5],$.__data[7]=0,$.__data[8]=de.elements[6],$.__data[9]=de.elements[7],$.__data[10]=de.elements[8],$.__data[11]=0):(de.toArray($.__data,pe),pe+=Ee.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,ae,$.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function T(O,N,b,X){const q=O.value,W=N+"_"+b;if(X[W]===void 0)return typeof q=="number"||typeof q=="boolean"?X[W]=q:X[W]=q.clone(),!0;{const K=X[W];if(typeof q=="number"||typeof q=="boolean"){if(K!==q)return X[W]=q,!0}else if(K.equals(q)===!1)return K.copy(q),!0}return!1}function w(O){const N=O.uniforms;let b=0;const X=16;for(let W=0,K=N.length;W<K;W++){const B=Array.isArray(N[W])?N[W]:[N[W]];for(let D=0,$=B.length;D<$;D++){const ae=B[D],re=Array.isArray(ae.value)?ae.value:[ae.value];for(let pe=0,xe=re.length;pe<xe;pe++){const de=re[pe],Ee=P(de),ue=b%X,Ie=ue%Ee.boundary,Ue=ue+Ie;b+=Ie,Ue!==0&&X-Ue<Ee.storage&&(b+=X-Ue),ae.__data=new Float32Array(Ee.storage/Float32Array.BYTES_PER_ELEMENT),ae.__offset=b,b+=Ee.storage}}}const q=b%X;return q>0&&(b+=X-q),O.__size=b,O.__cache={},this}function P(O){const N={boundary:0,storage:0};return typeof O=="number"||typeof O=="boolean"?(N.boundary=4,N.storage=4):O.isVector2?(N.boundary=8,N.storage=8):O.isVector3||O.isColor?(N.boundary=16,N.storage=12):O.isVector4?(N.boundary=16,N.storage=16):O.isMatrix3?(N.boundary=48,N.storage=48):O.isMatrix4?(N.boundary=64,N.storage=64):O.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",O),N}function C(O){const N=O.target;N.removeEventListener("dispose",C);const b=l.indexOf(N.__bindingPointIndex);l.splice(b,1),o.deleteBuffer(i[N.id]),delete i[N.id],delete s[N.id]}function E(){for(const O in i)o.deleteBuffer(i[O]);l=[],i={},s={}}return{bind:c,update:m,dispose:E}}class XM{constructor(e={}){const{canvas:t=y0(),context:n=null,depth:i=!0,stencil:s=!1,alpha:l=!1,antialias:u=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:m=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:v=!1,reverseDepthBuffer:y=!1}=e;this.isWebGLRenderer=!0;let T;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=n.getContextAttributes().alpha}else T=l;const w=new Uint32Array(4),P=new Int32Array(4);let C=null,E=null;const O=[],N=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let X=!1;this._outputColorSpace=Cn;let q=0,W=0,K=null,B=-1,D=null;const $=new Vt,ae=new Vt;let re=null;const pe=new Et(0);let xe=0,de=t.width,Ee=t.height,ue=1,Ie=null,Ue=null;const We=new Vt(0,0,de,Ee),tt=new Vt(0,0,de,Ee);let ht=!1;const fe=new Tf;let we=!1,Ae=!1;const Pe=new $t,qe=new $t,mt=new ie,nt=new Vt,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let It=!1;function ft(){return K===null?ue:1}let Y=n;function jt(M,L){return t.getContext(M,L)}try{const M={alpha:!0,depth:i,stencil:s,antialias:u,premultipliedAlpha:c,preserveDrawingBuffer:m,powerPreference:_,failIfMajorPerformanceCaveat:v};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Xa}`),t.addEventListener("webglcontextlost",ve,!1),t.addEventListener("webglcontextrestored",Be,!1),t.addEventListener("webglcontextcreationerror",be,!1),Y===null){const L="webgl2";if(Y=jt(L,M),Y===null)throw jt(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let vt,gt,Je,bt,Ye,k,I,ne,ge,Se,ce,$e,Ne,Ke,it,Me,Ve,ze,Xe,Oe,at,Qe,st,Q;function oe(){vt=new iS(Y),vt.init(),Qe=new OM(Y,vt),gt=new ZT(Y,vt,e,Qe),Je=new BM(Y,vt),gt.reverseDepthBuffer&&y&&Je.buffers.depth.setReversed(!0),bt=new sS(Y),Ye=new MM,k=new VM(Y,vt,Je,Ye,gt,Qe,bt),I=new QT(b),ne=new nS(b),ge=new dx(Y),st=new YT(Y,ge),Se=new oS(Y,ge,bt,st),ce=new lS(Y,Se,ge,bt),Xe=new aS(Y,gt,k),Me=new JT(Ye),$e=new SM(b,I,ne,vt,gt,st,Me),Ne=new qM(b,Ye),Ke=new AM,it=new bM(vt),ze=new XT(b,I,ne,Je,ce,T,c),Ve=new LM(b,ce,gt),Q=new $M(Y,bt,gt,Je),Oe=new KT(Y,vt,bt),at=new rS(Y,vt,bt),bt.programs=$e.programs,b.capabilities=gt,b.extensions=vt,b.properties=Ye,b.renderLists=Ke,b.shadowMap=Ve,b.state=Je,b.info=bt}oe();const le=new zM(b,Y);this.xr=le,this.getContext=function(){return Y},this.getContextAttributes=function(){return Y.getContextAttributes()},this.forceContextLoss=function(){const M=vt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=vt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(M){M!==void 0&&(ue=M,this.setSize(de,Ee,!1))},this.getSize=function(M){return M.set(de,Ee)},this.setSize=function(M,L,V=!0){if(le.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}de=M,Ee=L,t.width=Math.floor(M*ue),t.height=Math.floor(L*ue),V===!0&&(t.style.width=M+"px",t.style.height=L+"px"),this.setViewport(0,0,M,L)},this.getDrawingBufferSize=function(M){return M.set(de*ue,Ee*ue).floor()},this.setDrawingBufferSize=function(M,L,V){de=M,Ee=L,ue=V,t.width=Math.floor(M*V),t.height=Math.floor(L*V),this.setViewport(0,0,M,L)},this.getCurrentViewport=function(M){return M.copy($)},this.getViewport=function(M){return M.copy(We)},this.setViewport=function(M,L,V,z){M.isVector4?We.set(M.x,M.y,M.z,M.w):We.set(M,L,V,z),Je.viewport($.copy(We).multiplyScalar(ue).round())},this.getScissor=function(M){return M.copy(tt)},this.setScissor=function(M,L,V,z){M.isVector4?tt.set(M.x,M.y,M.z,M.w):tt.set(M,L,V,z),Je.scissor(ae.copy(tt).multiplyScalar(ue).round())},this.getScissorTest=function(){return ht},this.setScissorTest=function(M){Je.setScissorTest(ht=M)},this.setOpaqueSort=function(M){Ie=M},this.setTransparentSort=function(M){Ue=M},this.getClearColor=function(M){return M.copy(ze.getClearColor())},this.setClearColor=function(){ze.setClearColor(...arguments)},this.getClearAlpha=function(){return ze.getClearAlpha()},this.setClearAlpha=function(){ze.setClearAlpha(...arguments)},this.clear=function(M=!0,L=!0,V=!0){let z=0;if(M){let G=!1;if(K!==null){const J=K.texture.format;G=J===el||J===ja||J===Qa}if(G){const J=K.texture.type,j=J===li||J===Xi||J===$o||J===Xo||J===Ka||J===Za,te=ze.getClearColor(),se=ze.getClearAlpha(),_e=te.r,he=te.g,ye=te.b;j?(w[0]=_e,w[1]=he,w[2]=ye,w[3]=se,Y.clearBufferuiv(Y.COLOR,0,w)):(P[0]=_e,P[1]=he,P[2]=ye,P[3]=se,Y.clearBufferiv(Y.COLOR,0,P))}else z|=Y.COLOR_BUFFER_BIT}L&&(z|=Y.DEPTH_BUFFER_BIT),V&&(z|=Y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ve,!1),t.removeEventListener("webglcontextrestored",Be,!1),t.removeEventListener("webglcontextcreationerror",be,!1),ze.dispose(),Ke.dispose(),it.dispose(),Ye.dispose(),I.dispose(),ne.dispose(),ce.dispose(),st.dispose(),Q.dispose(),$e.dispose(),le.dispose(),le.removeEventListener("sessionstart",ci),le.removeEventListener("sessionend",Di),dn.stop()};function ve(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),X=!0}function Be(){console.log("THREE.WebGLRenderer: Context Restored."),X=!1;const M=bt.autoReset,L=Ve.enabled,V=Ve.autoUpdate,z=Ve.needsUpdate,G=Ve.type;oe(),bt.autoReset=M,Ve.enabled=L,Ve.autoUpdate=V,Ve.needsUpdate=z,Ve.type=G}function be(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function rt(M){const L=M.target;L.removeEventListener("dispose",rt),Ut(L)}function Ut(M){Ot(M),Ye.remove(M)}function Ot(M){const L=Ye.get(M).programs;L!==void 0&&(L.forEach(function(V){$e.releaseProgram(V)}),M.isShaderMaterial&&$e.releaseShaderCache(M))}this.renderBufferDirect=function(M,L,V,z,G,J){L===null&&(L=Dt);const j=G.isMesh&&G.matrixWorld.determinant()<0,te=mi(M,L,V,z,G);Je.setMaterial(z,j);let se=V.index,_e=1;if(z.wireframe===!0){if(se=Se.getWireframeAttribute(V),se===void 0)return;_e=2}const he=V.drawRange,ye=V.attributes.position;let Te=he.start*_e,Ce=(he.start+he.count)*_e;J!==null&&(Te=Math.max(Te,J.start*_e),Ce=Math.min(Ce,(J.start+J.count)*_e)),se!==null?(Te=Math.max(Te,0),Ce=Math.min(Ce,se.count)):ye!=null&&(Te=Math.max(Te,0),Ce=Math.min(Ce,ye.count));const ke=Ce-Te;if(ke<0||ke===1/0)return;st.setup(G,z,te,V,se);let je,Ze=Oe;if(se!==null&&(je=ge.get(se),Ze=at,Ze.setIndex(je)),G.isMesh)z.wireframe===!0?(Je.setLineWidth(z.wireframeLinewidth*ft()),Ze.setMode(Y.LINES)):Ze.setMode(Y.TRIANGLES);else if(G.isLine){let Ge=z.linewidth;Ge===void 0&&(Ge=1),Je.setLineWidth(Ge*ft()),G.isLineSegments?Ze.setMode(Y.LINES):G.isLineLoop?Ze.setMode(Y.LINE_LOOP):Ze.setMode(Y.LINE_STRIP)}else G.isPoints?Ze.setMode(Y.POINTS):G.isSprite&&Ze.setMode(Y.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Wr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Ze.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(vt.get("WEBGL_multi_draw"))Ze.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Ge=G._multiDrawStarts,lt=G._multiDrawCounts,He=G._multiDrawCount,Ct=se?ge.get(se).bytesPerElement:1,Ht=Ye.get(z).currentProgram.getUniforms();for(let St=0;St<He;St++)Ht.setValue(Y,"_gl_DrawID",St),Ze.render(Ge[St]/Ct,lt[St])}else if(G.isInstancedMesh)Ze.renderInstances(Te,ke,G.count);else if(V.isInstancedBufferGeometry){const Ge=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,lt=Math.min(V.instanceCount,Ge);Ze.renderInstances(Te,ke,lt)}else Ze.render(Te,ke)};function Tt(M,L,V){M.transparent===!0&&M.side===ti&&M.forceSinglePass===!1?(M.side=cn,M.needsUpdate=!0,$n(M,L,V),M.side=wi,M.needsUpdate=!0,$n(M,L,V),M.side=ti):$n(M,L,V)}this.compile=function(M,L,V=null){V===null&&(V=M),E=it.get(V),E.init(L),N.push(E),V.traverseVisible(function(G){G.isLight&&G.layers.test(L.layers)&&(E.pushLight(G),G.castShadow&&E.pushShadow(G))}),M!==V&&M.traverseVisible(function(G){G.isLight&&G.layers.test(L.layers)&&(E.pushLight(G),G.castShadow&&E.pushShadow(G))}),E.setupLights();const z=new Set;return M.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const J=G.material;if(J)if(Array.isArray(J))for(let j=0;j<J.length;j++){const te=J[j];Tt(te,V,G),z.add(te)}else Tt(J,V,G),z.add(J)}),E=N.pop(),z},this.compileAsync=function(M,L,V=null){const z=this.compile(M,L,V);return new Promise(G=>{function J(){if(z.forEach(function(j){Ye.get(j).currentProgram.isReady()&&z.delete(j)}),z.size===0){G(M);return}setTimeout(J,10)}vt.get("KHR_parallel_shader_compile")!==null?J():setTimeout(J,10)})};let rn=null;function sn(M){rn&&rn(M)}function ci(){dn.stop()}function Di(){dn.start()}const dn=new Cf;dn.setAnimationLoop(sn),typeof self<"u"&&dn.setContext(self),this.setAnimationLoop=function(M){rn=M,le.setAnimationLoop(M),M===null?dn.stop():dn.start()},le.addEventListener("sessionstart",ci),le.addEventListener("sessionend",Di),this.render=function(M,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(X===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(le.cameraAutoUpdate===!0&&le.updateCamera(L),L=le.getCamera()),M.isScene===!0&&M.onBeforeRender(b,M,L,K),E=it.get(M,N.length),E.init(L),N.push(E),qe.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),fe.setFromProjectionMatrix(qe),Ae=this.localClippingEnabled,we=Me.init(this.clippingPlanes,Ae),C=Ke.get(M,O.length),C.init(),O.push(C),le.enabled===!0&&le.isPresenting===!0){const J=b.xr.getDepthSensingMesh();J!==null&&fi(J,L,-1/0,b.sortObjects)}fi(M,L,0,b.sortObjects),C.finish(),b.sortObjects===!0&&C.sort(Ie,Ue),It=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,It&&ze.addToRenderList(C,M),this.info.render.frame++,we===!0&&Me.beginShadows();const V=E.state.shadowsArray;Ve.render(V,M,L),we===!0&&Me.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=C.opaque,G=C.transmissive;if(E.setupLights(),L.isArrayCamera){const J=L.cameras;if(G.length>0)for(let j=0,te=J.length;j<te;j++){const se=J[j];Yi(z,G,M,se)}It&&ze.render(M);for(let j=0,te=J.length;j<te;j++){const se=J[j];di(C,M,se,se.viewport)}}else G.length>0&&Yi(z,G,M,L),It&&ze.render(M),di(C,M,L);K!==null&&W===0&&(k.updateMultisampleRenderTarget(K),k.updateRenderTargetMipmap(K)),M.isScene===!0&&M.onAfterRender(b,M,L),st.resetDefaultState(),B=-1,D=null,N.pop(),N.length>0?(E=N[N.length-1],we===!0&&Me.setGlobalState(b.clippingPlanes,E.state.camera)):E=null,O.pop(),O.length>0?C=O[O.length-1]:C=null};function fi(M,L,V,z){if(M.visible===!1)return;if(M.layers.test(L.layers)){if(M.isGroup)V=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(L);else if(M.isLight)E.pushLight(M),M.castShadow&&E.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||fe.intersectsSprite(M)){z&&nt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(qe);const j=ce.update(M),te=M.material;te.visible&&C.push(M,j,te,V,nt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||fe.intersectsObject(M))){const j=ce.update(M),te=M.material;if(z&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),nt.copy(M.boundingSphere.center)):(j.boundingSphere===null&&j.computeBoundingSphere(),nt.copy(j.boundingSphere.center)),nt.applyMatrix4(M.matrixWorld).applyMatrix4(qe)),Array.isArray(te)){const se=j.groups;for(let _e=0,he=se.length;_e<he;_e++){const ye=se[_e],Te=te[ye.materialIndex];Te&&Te.visible&&C.push(M,j,Te,V,nt.z,ye)}}else te.visible&&C.push(M,j,te,V,nt.z,null)}}const J=M.children;for(let j=0,te=J.length;j<te;j++)fi(J[j],L,V,z)}function di(M,L,V,z){const G=M.opaque,J=M.transmissive,j=M.transparent;E.setupLightsView(V),we===!0&&Me.setGlobalState(b.clippingPlanes,V),z&&Je.viewport($.copy(z)),G.length>0&&hi(G,L,V),J.length>0&&hi(J,L,V),j.length>0&&hi(j,L,V),Je.buffers.depth.setTest(!0),Je.buffers.depth.setMask(!0),Je.buffers.color.setMask(!0),Je.setPolygonOffset(!1)}function Yi(M,L,V,z){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;E.state.transmissionRenderTarget[z.id]===void 0&&(E.state.transmissionRenderTarget[z.id]=new kn(1,1,{generateMipmaps:!0,type:vt.has("EXT_color_buffer_half_float")||vt.has("EXT_color_buffer_float")?En:li,minFilter:Mi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Rt.workingColorSpace}));const J=E.state.transmissionRenderTarget[z.id],j=z.viewport||$;J.setSize(j.z*b.transmissionResolutionScale,j.w*b.transmissionResolutionScale);const te=b.getRenderTarget();b.setRenderTarget(J),b.getClearColor(pe),xe=b.getClearAlpha(),xe<1&&b.setClearColor(16777215,.5),b.clear(),It&&ze.render(V);const se=b.toneMapping;b.toneMapping=Ai;const _e=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),E.setupLightsView(z),we===!0&&Me.setGlobalState(b.clippingPlanes,z),hi(M,V,z),k.updateMultisampleRenderTarget(J),k.updateRenderTargetMipmap(J),vt.has("WEBGL_multisampled_render_to_texture")===!1){let he=!1;for(let ye=0,Te=L.length;ye<Te;ye++){const Ce=L[ye],ke=Ce.object,je=Ce.geometry,Ze=Ce.material,Ge=Ce.group;if(Ze.side===ti&&ke.layers.test(z.layers)){const lt=Ze.side;Ze.side=cn,Ze.needsUpdate=!0,Ki(ke,V,z,je,Ze,Ge),Ze.side=lt,Ze.needsUpdate=!0,he=!0}}he===!0&&(k.updateMultisampleRenderTarget(J),k.updateRenderTargetMipmap(J))}b.setRenderTarget(te),b.setClearColor(pe,xe),_e!==void 0&&(z.viewport=_e),b.toneMapping=se}function hi(M,L,V){const z=L.isScene===!0?L.overrideMaterial:null;for(let G=0,J=M.length;G<J;G++){const j=M[G],te=j.object,se=j.geometry,_e=j.group;let he=j.material;he.allowOverride===!0&&z!==null&&(he=z),te.layers.test(V.layers)&&Ki(te,L,V,se,he,_e)}}function Ki(M,L,V,z,G,J){M.onBeforeRender(b,L,V,z,G,J),M.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),G.onBeforeRender(b,L,V,z,M,J),G.transparent===!0&&G.side===ti&&G.forceSinglePass===!1?(G.side=cn,G.needsUpdate=!0,b.renderBufferDirect(V,L,z,G,M,J),G.side=wi,G.needsUpdate=!0,b.renderBufferDirect(V,L,z,G,M,J),G.side=ti):b.renderBufferDirect(V,L,z,G,M,J),M.onAfterRender(b,L,V,z,G,J)}function $n(M,L,V){L.isScene!==!0&&(L=Dt);const z=Ye.get(M),G=E.state.lights,J=E.state.shadowsArray,j=G.state.version,te=$e.getParameters(M,G.state,J,L,V),se=$e.getProgramCacheKey(te);let _e=z.programs;z.environment=M.isMeshStandardMaterial?L.environment:null,z.fog=L.fog,z.envMap=(M.isMeshStandardMaterial?ne:I).get(M.envMap||z.environment),z.envMapRotation=z.environment!==null&&M.envMap===null?L.environmentRotation:M.envMapRotation,_e===void 0&&(M.addEventListener("dispose",rt),_e=new Map,z.programs=_e);let he=_e.get(se);if(he!==void 0){if(z.currentProgram===he&&z.lightsStateVersion===j)return kt(M,te),he}else te.uniforms=$e.getUniforms(M),M.onBeforeCompile(te,b),he=$e.acquireProgram(te,se),_e.set(se,he),z.uniforms=te.uniforms;const ye=z.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(ye.clippingPlanes=Me.uniform),kt(M,te),z.needsLights=zn(M),z.lightsStateVersion=j,z.needsLights&&(ye.ambientLightColor.value=G.state.ambient,ye.lightProbe.value=G.state.probe,ye.directionalLights.value=G.state.directional,ye.directionalLightShadows.value=G.state.directionalShadow,ye.spotLights.value=G.state.spot,ye.spotLightShadows.value=G.state.spotShadow,ye.rectAreaLights.value=G.state.rectArea,ye.ltc_1.value=G.state.rectAreaLTC1,ye.ltc_2.value=G.state.rectAreaLTC2,ye.pointLights.value=G.state.point,ye.pointLightShadows.value=G.state.pointShadow,ye.hemisphereLights.value=G.state.hemi,ye.directionalShadowMap.value=G.state.directionalShadowMap,ye.directionalShadowMatrix.value=G.state.directionalShadowMatrix,ye.spotShadowMap.value=G.state.spotShadowMap,ye.spotLightMatrix.value=G.state.spotLightMatrix,ye.spotLightMap.value=G.state.spotLightMap,ye.pointShadowMap.value=G.state.pointShadowMap,ye.pointShadowMatrix.value=G.state.pointShadowMatrix),z.currentProgram=he,z.uniformsList=null,he}function pi(M){if(M.uniformsList===null){const L=M.currentProgram.getUniforms();M.uniformsList=qr.seqWithValue(L.seq,M.uniforms)}return M.uniformsList}function kt(M,L){const V=Ye.get(M);V.outputColorSpace=L.outputColorSpace,V.batching=L.batching,V.batchingColor=L.batchingColor,V.instancing=L.instancing,V.instancingColor=L.instancingColor,V.instancingMorph=L.instancingMorph,V.skinning=L.skinning,V.morphTargets=L.morphTargets,V.morphNormals=L.morphNormals,V.morphColors=L.morphColors,V.morphTargetsCount=L.morphTargetsCount,V.numClippingPlanes=L.numClippingPlanes,V.numIntersection=L.numClipIntersection,V.vertexAlphas=L.vertexAlphas,V.vertexTangents=L.vertexTangents,V.toneMapping=L.toneMapping}function mi(M,L,V,z,G){L.isScene!==!0&&(L=Dt),k.resetTextureUnits();const J=L.fog,j=z.isMeshStandardMaterial?L.environment:null,te=K===null?b.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Ri,se=(z.isMeshStandardMaterial?ne:I).get(z.envMap||j),_e=z.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,he=!!V.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),ye=!!V.morphAttributes.position,Te=!!V.morphAttributes.normal,Ce=!!V.morphAttributes.color;let ke=Ai;z.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(ke=b.toneMapping);const je=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Ze=je!==void 0?je.length:0,Ge=Ye.get(z),lt=E.state.lights;if(we===!0&&(Ae===!0||M!==D)){const Nt=M===D&&z.id===B;Me.setState(z,M,Nt)}let He=!1;z.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==lt.state.version||Ge.outputColorSpace!==te||G.isBatchedMesh&&Ge.batching===!1||!G.isBatchedMesh&&Ge.batching===!0||G.isBatchedMesh&&Ge.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Ge.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Ge.instancing===!1||!G.isInstancedMesh&&Ge.instancing===!0||G.isSkinnedMesh&&Ge.skinning===!1||!G.isSkinnedMesh&&Ge.skinning===!0||G.isInstancedMesh&&Ge.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ge.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ge.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ge.instancingMorph===!1&&G.morphTexture!==null||Ge.envMap!==se||z.fog===!0&&Ge.fog!==J||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==Me.numPlanes||Ge.numIntersection!==Me.numIntersection)||Ge.vertexAlphas!==_e||Ge.vertexTangents!==he||Ge.morphTargets!==ye||Ge.morphNormals!==Te||Ge.morphColors!==Ce||Ge.toneMapping!==ke||Ge.morphTargetsCount!==Ze)&&(He=!0):(He=!0,Ge.__version=z.version);let Ct=Ge.currentProgram;He===!0&&(Ct=$n(z,L,G));let Ht=!1,St=!1,yt=!1;const et=Ct.getUniforms(),Bt=Ge.uniforms;if(Je.useProgram(Ct.program)&&(Ht=!0,St=!0,yt=!0),z.id!==B&&(B=z.id,St=!0),Ht||D!==M){Je.buffers.depth.getReversed()?(Pe.copy(M.projectionMatrix),E0(Pe),T0(Pe),et.setValue(Y,"projectionMatrix",Pe)):et.setValue(Y,"projectionMatrix",M.projectionMatrix),et.setValue(Y,"viewMatrix",M.matrixWorldInverse);const zt=et.map.cameraPosition;zt!==void 0&&zt.setValue(Y,mt.setFromMatrixPosition(M.matrixWorld)),gt.logarithmicDepthBuffer&&et.setValue(Y,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&et.setValue(Y,"isOrthographic",M.isOrthographicCamera===!0),D!==M&&(D=M,St=!0,yt=!0)}if(G.isSkinnedMesh){et.setOptional(Y,G,"bindMatrix"),et.setOptional(Y,G,"bindMatrixInverse");const Nt=G.skeleton;Nt&&(Nt.boneTexture===null&&Nt.computeBoneTexture(),et.setValue(Y,"boneTexture",Nt.boneTexture,k))}G.isBatchedMesh&&(et.setOptional(Y,G,"batchingTexture"),et.setValue(Y,"batchingTexture",G._matricesTexture,k),et.setOptional(Y,G,"batchingIdTexture"),et.setValue(Y,"batchingIdTexture",G._indirectTexture,k),et.setOptional(Y,G,"batchingColorTexture"),G._colorsTexture!==null&&et.setValue(Y,"batchingColorTexture",G._colorsTexture,k));const Wt=V.morphAttributes;if((Wt.position!==void 0||Wt.normal!==void 0||Wt.color!==void 0)&&Xe.update(G,V,Ct),(St||Ge.receiveShadow!==G.receiveShadow)&&(Ge.receiveShadow=G.receiveShadow,et.setValue(Y,"receiveShadow",G.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Bt.envMap.value=se,Bt.flipEnvMap.value=se.isCubeTexture&&se.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&L.environment!==null&&(Bt.envMapIntensity.value=L.environmentIntensity),St&&(et.setValue(Y,"toneMappingExposure",b.toneMappingExposure),Ge.needsLights&&vn(Bt,yt),J&&z.fog===!0&&Ne.refreshFogUniforms(Bt,J),Ne.refreshMaterialUniforms(Bt,z,ue,Ee,E.state.transmissionRenderTarget[M.id]),qr.upload(Y,pi(Ge),Bt,k)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(qr.upload(Y,pi(Ge),Bt,k),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&et.setValue(Y,"center",G.center),et.setValue(Y,"modelViewMatrix",G.modelViewMatrix),et.setValue(Y,"normalMatrix",G.normalMatrix),et.setValue(Y,"modelMatrix",G.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Nt=z.uniformsGroups;for(let zt=0,bi=Nt.length;zt<bi;zt++){const Xn=Nt[zt];Q.update(Xn,Ct),Q.bind(Xn,Ct)}}return Ct}function vn(M,L){M.ambientLightColor.needsUpdate=L,M.lightProbe.needsUpdate=L,M.directionalLights.needsUpdate=L,M.directionalLightShadows.needsUpdate=L,M.pointLights.needsUpdate=L,M.pointLightShadows.needsUpdate=L,M.spotLights.needsUpdate=L,M.spotLightShadows.needsUpdate=L,M.rectAreaLights.needsUpdate=L,M.hemisphereLights.needsUpdate=L}function zn(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return K},this.setRenderTargetTextures=function(M,L,V){const z=Ye.get(M);z.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),Ye.get(M.texture).__webglTexture=L,Ye.get(M.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:V,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,L){const V=Ye.get(M);V.__webglFramebuffer=L,V.__useDefaultFramebuffer=L===void 0};const S=Y.createFramebuffer();this.setRenderTarget=function(M,L=0,V=0){K=M,q=L,W=V;let z=!0,G=null,J=!1,j=!1;if(M){const se=Ye.get(M);if(se.__useDefaultFramebuffer!==void 0)Je.bindFramebuffer(Y.FRAMEBUFFER,null),z=!1;else if(se.__webglFramebuffer===void 0)k.setupRenderTarget(M);else if(se.__hasExternalTextures)k.rebindTextures(M,Ye.get(M.texture).__webglTexture,Ye.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const ye=M.depthTexture;if(se.__boundDepthTexture!==ye){if(ye!==null&&Ye.has(ye)&&(M.width!==ye.image.width||M.height!==ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(M)}}const _e=M.texture;(_e.isData3DTexture||_e.isDataArrayTexture||_e.isCompressedArrayTexture)&&(j=!0);const he=Ye.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(he[L])?G=he[L][V]:G=he[L],J=!0):M.samples>0&&k.useMultisampledRTT(M)===!1?G=Ye.get(M).__webglMultisampledFramebuffer:Array.isArray(he)?G=he[V]:G=he,$.copy(M.viewport),ae.copy(M.scissor),re=M.scissorTest}else $.copy(We).multiplyScalar(ue).floor(),ae.copy(tt).multiplyScalar(ue).floor(),re=ht;if(V!==0&&(G=S),Je.bindFramebuffer(Y.FRAMEBUFFER,G)&&z&&Je.drawBuffers(M,G),Je.viewport($),Je.scissor(ae),Je.setScissorTest(re),J){const se=Ye.get(M.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_CUBE_MAP_POSITIVE_X+L,se.__webglTexture,V)}else if(j){const se=Ye.get(M.texture),_e=L;Y.framebufferTextureLayer(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,se.__webglTexture,V,_e)}else if(M!==null&&V!==0){const se=Ye.get(M.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,se.__webglTexture,V)}B=-1},this.readRenderTargetPixels=function(M,L,V,z,G,J,j){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let te=Ye.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&j!==void 0&&(te=te[j]),te){Je.bindFramebuffer(Y.FRAMEBUFFER,te);try{const se=M.texture,_e=se.format,he=se.type;if(!gt.textureFormatReadable(_e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!gt.textureTypeReadable(he)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=M.width-z&&V>=0&&V<=M.height-G&&Y.readPixels(L,V,z,G,Qe.convert(_e),Qe.convert(he),J)}finally{const se=K!==null?Ye.get(K).__webglFramebuffer:null;Je.bindFramebuffer(Y.FRAMEBUFFER,se)}}},this.readRenderTargetPixelsAsync=async function(M,L,V,z,G,J,j){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let te=Ye.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&j!==void 0&&(te=te[j]),te)if(L>=0&&L<=M.width-z&&V>=0&&V<=M.height-G){Je.bindFramebuffer(Y.FRAMEBUFFER,te);const se=M.texture,_e=se.format,he=se.type;if(!gt.textureFormatReadable(_e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!gt.textureTypeReadable(he))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ye=Y.createBuffer();Y.bindBuffer(Y.PIXEL_PACK_BUFFER,ye),Y.bufferData(Y.PIXEL_PACK_BUFFER,J.byteLength,Y.STREAM_READ),Y.readPixels(L,V,z,G,Qe.convert(_e),Qe.convert(he),0);const Te=K!==null?Ye.get(K).__webglFramebuffer:null;Je.bindFramebuffer(Y.FRAMEBUFFER,Te);const Ce=Y.fenceSync(Y.SYNC_GPU_COMMANDS_COMPLETE,0);return Y.flush(),await x0(Y,Ce,4),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,ye),Y.getBufferSubData(Y.PIXEL_PACK_BUFFER,0,J),Y.deleteBuffer(ye),Y.deleteSync(Ce),J}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,L=null,V=0){const z=Math.pow(2,-V),G=Math.floor(M.image.width*z),J=Math.floor(M.image.height*z),j=L!==null?L.x:0,te=L!==null?L.y:0;k.setTexture2D(M,0),Y.copyTexSubImage2D(Y.TEXTURE_2D,V,0,0,j,te,G,J),Je.unbindTexture()};const U=Y.createFramebuffer(),H=Y.createFramebuffer();this.copyTextureToTexture=function(M,L,V=null,z=null,G=0,J=null){J===null&&(G!==0?(Wr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),J=G,G=0):J=0);let j,te,se,_e,he,ye,Te,Ce,ke;const je=M.isCompressedTexture?M.mipmaps[J]:M.image;if(V!==null)j=V.max.x-V.min.x,te=V.max.y-V.min.y,se=V.isBox3?V.max.z-V.min.z:1,_e=V.min.x,he=V.min.y,ye=V.isBox3?V.min.z:0;else{const Wt=Math.pow(2,-G);j=Math.floor(je.width*Wt),te=Math.floor(je.height*Wt),M.isDataArrayTexture?se=je.depth:M.isData3DTexture?se=Math.floor(je.depth*Wt):se=1,_e=0,he=0,ye=0}z!==null?(Te=z.x,Ce=z.y,ke=z.z):(Te=0,Ce=0,ke=0);const Ze=Qe.convert(L.format),Ge=Qe.convert(L.type);let lt;L.isData3DTexture?(k.setTexture3D(L,0),lt=Y.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(k.setTexture2DArray(L,0),lt=Y.TEXTURE_2D_ARRAY):(k.setTexture2D(L,0),lt=Y.TEXTURE_2D),Y.pixelStorei(Y.UNPACK_FLIP_Y_WEBGL,L.flipY),Y.pixelStorei(Y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),Y.pixelStorei(Y.UNPACK_ALIGNMENT,L.unpackAlignment);const He=Y.getParameter(Y.UNPACK_ROW_LENGTH),Ct=Y.getParameter(Y.UNPACK_IMAGE_HEIGHT),Ht=Y.getParameter(Y.UNPACK_SKIP_PIXELS),St=Y.getParameter(Y.UNPACK_SKIP_ROWS),yt=Y.getParameter(Y.UNPACK_SKIP_IMAGES);Y.pixelStorei(Y.UNPACK_ROW_LENGTH,je.width),Y.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,je.height),Y.pixelStorei(Y.UNPACK_SKIP_PIXELS,_e),Y.pixelStorei(Y.UNPACK_SKIP_ROWS,he),Y.pixelStorei(Y.UNPACK_SKIP_IMAGES,ye);const et=M.isDataArrayTexture||M.isData3DTexture,Bt=L.isDataArrayTexture||L.isData3DTexture;if(M.isDepthTexture){const Wt=Ye.get(M),Nt=Ye.get(L),zt=Ye.get(Wt.__renderTarget),bi=Ye.get(Nt.__renderTarget);Je.bindFramebuffer(Y.READ_FRAMEBUFFER,zt.__webglFramebuffer),Je.bindFramebuffer(Y.DRAW_FRAMEBUFFER,bi.__webglFramebuffer);for(let Xn=0;Xn<se;Xn++)et&&(Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Ye.get(M).__webglTexture,G,ye+Xn),Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Ye.get(L).__webglTexture,J,ke+Xn)),Y.blitFramebuffer(_e,he,j,te,Te,Ce,j,te,Y.DEPTH_BUFFER_BIT,Y.NEAREST);Je.bindFramebuffer(Y.READ_FRAMEBUFFER,null),Je.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else if(G!==0||M.isRenderTargetTexture||Ye.has(M)){const Wt=Ye.get(M),Nt=Ye.get(L);Je.bindFramebuffer(Y.READ_FRAMEBUFFER,U),Je.bindFramebuffer(Y.DRAW_FRAMEBUFFER,H);for(let zt=0;zt<se;zt++)et?Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Wt.__webglTexture,G,ye+zt):Y.framebufferTexture2D(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Wt.__webglTexture,G),Bt?Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Nt.__webglTexture,J,ke+zt):Y.framebufferTexture2D(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_2D,Nt.__webglTexture,J),G!==0?Y.blitFramebuffer(_e,he,j,te,Te,Ce,j,te,Y.COLOR_BUFFER_BIT,Y.NEAREST):Bt?Y.copyTexSubImage3D(lt,J,Te,Ce,ke+zt,_e,he,j,te):Y.copyTexSubImage2D(lt,J,Te,Ce,_e,he,j,te);Je.bindFramebuffer(Y.READ_FRAMEBUFFER,null),Je.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else Bt?M.isDataTexture||M.isData3DTexture?Y.texSubImage3D(lt,J,Te,Ce,ke,j,te,se,Ze,Ge,je.data):L.isCompressedArrayTexture?Y.compressedTexSubImage3D(lt,J,Te,Ce,ke,j,te,se,Ze,je.data):Y.texSubImage3D(lt,J,Te,Ce,ke,j,te,se,Ze,Ge,je):M.isDataTexture?Y.texSubImage2D(Y.TEXTURE_2D,J,Te,Ce,j,te,Ze,Ge,je.data):M.isCompressedTexture?Y.compressedTexSubImage2D(Y.TEXTURE_2D,J,Te,Ce,je.width,je.height,Ze,je.data):Y.texSubImage2D(Y.TEXTURE_2D,J,Te,Ce,j,te,Ze,Ge,je);Y.pixelStorei(Y.UNPACK_ROW_LENGTH,He),Y.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,Ct),Y.pixelStorei(Y.UNPACK_SKIP_PIXELS,Ht),Y.pixelStorei(Y.UNPACK_SKIP_ROWS,St),Y.pixelStorei(Y.UNPACK_SKIP_IMAGES,yt),J===0&&L.generateMipmaps&&Y.generateMipmap(lt),Je.unbindTexture()},this.copyTextureToTexture3D=function(M,L,V=null,z=null,G=0){return Wr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(M,L,V,z,G)},this.initRenderTarget=function(M){Ye.get(M).__webglFramebuffer===void 0&&k.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?k.setTextureCube(M,0):M.isData3DTexture?k.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?k.setTexture2DArray(M,0):k.setTexture2D(M,0),Je.unbindTexture()},this.resetState=function(){q=0,W=0,K=null,Je.reset(),st.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Rt._getUnpackColorSpace()}}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/var wn=Uint8Array,go=Uint16Array,YM=Int32Array,Pf=new wn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Df=new wn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),KM=new wn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),bf=function(o,e){for(var t=new go(31),n=0;n<31;++n)t[n]=e+=1<<o[n-1];for(var i=new YM(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)i[s]=s-t[n]<<5|n;return{b:t,r:i}},Uf=bf(Pf,2),Nf=Uf.b,ZM=Uf.r;Nf[28]=258,ZM[258]=28;var JM=bf(Df,0),QM=JM.b,ka=new go(32768);for(var Ft=0;Ft<32768;++Ft){var Ti=(Ft&43690)>>1|(Ft&21845)<<1;Ti=(Ti&52428)>>2|(Ti&13107)<<2,Ti=(Ti&61680)>>4|(Ti&3855)<<4,ka[Ft]=((Ti&65280)>>8|(Ti&255)<<8)>>1}var Go=function(o,e,t){for(var n=o.length,i=0,s=new go(e);i<n;++i)o[i]&&++s[o[i]-1];var l=new go(e);for(i=1;i<e;++i)l[i]=l[i-1]+s[i-1]<<1;var u;if(t){u=new go(1<<e);var c=15-e;for(i=0;i<n;++i)if(o[i])for(var m=i<<4|o[i],_=e-o[i],v=l[o[i]-1]++<<_,y=v|(1<<_)-1;v<=y;++v)u[ka[v]>>c]=m}else for(u=new go(n),i=0;i<n;++i)o[i]&&(u[i]=ka[l[o[i]-1]++]>>15-o[i]);return u},or=new wn(288);for(var Ft=0;Ft<144;++Ft)or[Ft]=8;for(var Ft=144;Ft<256;++Ft)or[Ft]=9;for(var Ft=256;Ft<280;++Ft)or[Ft]=7;for(var Ft=280;Ft<288;++Ft)or[Ft]=8;var Lf=new wn(32);for(var Ft=0;Ft<32;++Ft)Lf[Ft]=5;var jM=Go(or,9,1),eC=Go(Lf,5,1),zs=function(o){for(var e=o[0],t=1;t<o.length;++t)o[t]>e&&(e=o[t]);return e},Bn=function(o,e,t){var n=e/8|0;return(o[n]|o[n+1]<<8)>>(e&7)&t},Ws=function(o,e){var t=e/8|0;return(o[t]|o[t+1]<<8|o[t+2]<<16)>>(e&7)},tC=function(o){return(o+7)/8|0},nC=function(o,e,t){return(t==null||t>o.length)&&(t=o.length),new wn(o.subarray(e,t))},iC=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Vn=function(o,e,t){var n=new Error(e||iC[o]);if(n.code=o,Error.captureStackTrace&&Error.captureStackTrace(n,Vn),!t)throw n;return n},oC=function(o,e,t,n){var i=o.length,s=0;if(!i||e.f&&!e.l)return t||new wn(0);var l=!t,u=l||e.i!=2,c=e.i;l&&(t=new wn(i*3));var m=function(Dt){var It=t.length;if(Dt>It){var ft=new wn(Math.max(It*2,Dt));ft.set(t),t=ft}},_=e.f||0,v=e.p||0,y=e.b||0,T=e.l,w=e.d,P=e.m,C=e.n,E=i*8;do{if(!T){_=Bn(o,v,1);var O=Bn(o,v+1,3);if(v+=3,O)if(O==1)T=jM,w=eC,P=9,C=5;else if(O==2){var q=Bn(o,v,31)+257,W=Bn(o,v+10,15)+4,K=q+Bn(o,v+5,31)+1;v+=14;for(var B=new wn(K),D=new wn(19),$=0;$<W;++$)D[KM[$]]=Bn(o,v+$*3,7);v+=W*3;for(var ae=zs(D),re=(1<<ae)-1,pe=Go(D,ae,1),$=0;$<K;){var xe=pe[Bn(o,v,re)];v+=xe&15;var N=xe>>4;if(N<16)B[$++]=N;else{var de=0,Ee=0;for(N==16?(Ee=3+Bn(o,v,3),v+=2,de=B[$-1]):N==17?(Ee=3+Bn(o,v,7),v+=3):N==18&&(Ee=11+Bn(o,v,127),v+=7);Ee--;)B[$++]=de}}var ue=B.subarray(0,q),Ie=B.subarray(q);P=zs(ue),C=zs(Ie),T=Go(ue,P,1),w=Go(Ie,C,1)}else Vn(1);else{var N=tC(v)+4,b=o[N-4]|o[N-3]<<8,X=N+b;if(X>i){c&&Vn(0);break}u&&m(y+b),t.set(o.subarray(N,X),y),e.b=y+=b,e.p=v=X*8,e.f=_;continue}if(v>E){c&&Vn(0);break}}u&&m(y+131072);for(var Ue=(1<<P)-1,We=(1<<C)-1,tt=v;;tt=v){var de=T[Ws(o,v)&Ue],ht=de>>4;if(v+=de&15,v>E){c&&Vn(0);break}if(de||Vn(2),ht<256)t[y++]=ht;else if(ht==256){tt=v,T=null;break}else{var fe=ht-254;if(ht>264){var $=ht-257,we=Pf[$];fe=Bn(o,v,(1<<we)-1)+Nf[$],v+=we}var Ae=w[Ws(o,v)&We],Pe=Ae>>4;Ae||Vn(3),v+=Ae&15;var Ie=QM[Pe];if(Pe>3){var we=Df[Pe];Ie+=Ws(o,v)&(1<<we)-1,v+=we}if(v>E){c&&Vn(0);break}u&&m(y+131072);var qe=y+fe;if(y<Ie){var mt=s-Ie,nt=Math.min(Ie,qe);for(mt+y<0&&Vn(3);y<nt;++y)t[y]=n[mt+y]}for(;y<qe;++y)t[y]=t[y-Ie]}}e.l=T,e.p=tt,e.b=y,e.f=_,T&&(_=1,e.m=P,e.d=w,e.n=C)}while(!_);return y!=t.length&&l?nC(t,0,y):t.subarray(0,y)},rC=new wn(0),sC=function(o,e){return((o[0]&15)!=8||o[0]>>4>7||(o[0]<<8|o[1])%31)&&Vn(6,"invalid zlib data"),(o[1]>>5&1)==1&&Vn(6,"invalid zlib data: "+(o[1]&32?"need":"unexpected")+" dictionary"),(o[1]>>3&4)+2};function Nr(o,e){return oC(o.subarray(sC(o),-4),{i:2},e,e)}var aC=typeof TextDecoder<"u"&&new TextDecoder,lC=0;try{aC.decode(rC,{stream:!0}),lC=1}catch{}class uC extends lx{constructor(e){super(e),this.type=En}parse(e){const B=Math.pow(2.7182818,2.2);function D(S,U){let H=0;for(let L=0;L<65536;++L)(L==0||S[L>>3]&1<<(L&7))&&(U[H++]=L);const M=H-1;for(;H<65536;)U[H++]=0;return M}function $(S){for(let U=0;U<16384;U++)S[U]={},S[U].len=0,S[U].lit=0,S[U].p=null}const ae={l:0,c:0,lc:0};function re(S,U,H,M,L){for(;H<S;)U=U<<8|Oe(M,L),H+=8;H-=S,ae.l=U>>H&(1<<S)-1,ae.c=U,ae.lc=H}const pe=new Array(59);function xe(S){for(let H=0;H<=58;++H)pe[H]=0;for(let H=0;H<65537;++H)pe[S[H]]+=1;let U=0;for(let H=58;H>0;--H){const M=U+pe[H]>>1;pe[H]=U,U=M}for(let H=0;H<65537;++H){const M=S[H];M>0&&(S[H]=M|pe[M]++<<6)}}function de(S,U,H,M,L,V){const z=U;let G=0,J=0;for(;M<=L;M++){if(z.value-U.value>H)return!1;re(6,G,J,S,z);const j=ae.l;if(G=ae.c,J=ae.lc,V[M]=j,j==63){if(z.value-U.value>H)throw new Error("Something wrong with hufUnpackEncTable");re(8,G,J,S,z);let te=ae.l+6;if(G=ae.c,J=ae.lc,M+te>L+1)throw new Error("Something wrong with hufUnpackEncTable");for(;te--;)V[M++]=0;M--}else if(j>=59){let te=j-59+2;if(M+te>L+1)throw new Error("Something wrong with hufUnpackEncTable");for(;te--;)V[M++]=0;M--}}xe(V)}function Ee(S){return S&63}function ue(S){return S>>6}function Ie(S,U,H,M){for(;U<=H;U++){const L=ue(S[U]),V=Ee(S[U]);if(L>>V)throw new Error("Invalid table entry");if(V>14){const z=M[L>>V-14];if(z.len)throw new Error("Invalid table entry");if(z.lit++,z.p){const G=z.p;z.p=new Array(z.lit);for(let J=0;J<z.lit-1;++J)z.p[J]=G[J]}else z.p=new Array(1);z.p[z.lit-1]=U}else if(V){let z=0;for(let G=1<<14-V;G>0;G--){const J=M[(L<<14-V)+z];if(J.len||J.p)throw new Error("Invalid table entry");J.len=V,J.lit=U,z++}}}return!0}const Ue={c:0,lc:0};function We(S,U,H,M){S=S<<8|Oe(H,M),U+=8,Ue.c=S,Ue.lc=U}const tt={c:0,lc:0};function ht(S,U,H,M,L,V,z,G,J){if(S==U){M<8&&(We(H,M,L,V),H=Ue.c,M=Ue.lc),M-=8;let j=H>>M;if(j=new Uint8Array([j])[0],G.value+j>J)return!1;const te=z[G.value-1];for(;j-- >0;)z[G.value++]=te}else if(G.value<J)z[G.value++]=S;else return!1;tt.c=H,tt.lc=M}function fe(S){return S&65535}function we(S){const U=fe(S);return U>32767?U-65536:U}const Ae={a:0,b:0};function Pe(S,U){const H=we(S),L=we(U),V=H+(L&1)+(L>>1),z=V,G=V-L;Ae.a=z,Ae.b=G}function qe(S,U){const H=fe(S),M=fe(U),L=H-(M>>1)&65535,V=M+L-32768&65535;Ae.a=V,Ae.b=L}function mt(S,U,H,M,L,V,z){const G=z<16384,J=H>L?L:H;let j=1,te,se;for(;j<=J;)j<<=1;for(j>>=1,te=j,j>>=1;j>=1;){se=0;const _e=se+V*(L-te),he=V*j,ye=V*te,Te=M*j,Ce=M*te;let ke,je,Ze,Ge;for(;se<=_e;se+=ye){let lt=se;const He=se+M*(H-te);for(;lt<=He;lt+=Ce){const Ct=lt+Te,Ht=lt+he,St=Ht+Te;G?(Pe(S[lt+U],S[Ht+U]),ke=Ae.a,Ze=Ae.b,Pe(S[Ct+U],S[St+U]),je=Ae.a,Ge=Ae.b,Pe(ke,je),S[lt+U]=Ae.a,S[Ct+U]=Ae.b,Pe(Ze,Ge),S[Ht+U]=Ae.a,S[St+U]=Ae.b):(qe(S[lt+U],S[Ht+U]),ke=Ae.a,Ze=Ae.b,qe(S[Ct+U],S[St+U]),je=Ae.a,Ge=Ae.b,qe(ke,je),S[lt+U]=Ae.a,S[Ct+U]=Ae.b,qe(Ze,Ge),S[Ht+U]=Ae.a,S[St+U]=Ae.b)}if(H&j){const Ct=lt+he;G?Pe(S[lt+U],S[Ct+U]):qe(S[lt+U],S[Ct+U]),ke=Ae.a,S[Ct+U]=Ae.b,S[lt+U]=ke}}if(L&j){let lt=se;const He=se+M*(H-te);for(;lt<=He;lt+=Ce){const Ct=lt+Te;G?Pe(S[lt+U],S[Ct+U]):qe(S[lt+U],S[Ct+U]),ke=Ae.a,S[Ct+U]=Ae.b,S[lt+U]=ke}}te=j,j>>=1}return se}function nt(S,U,H,M,L,V,z,G,J){let j=0,te=0;const se=z,_e=Math.trunc(M.value+(L+7)/8);for(;M.value<_e;)for(We(j,te,H,M),j=Ue.c,te=Ue.lc;te>=14;){const ye=j>>te-14&16383,Te=U[ye];if(Te.len)te-=Te.len,ht(Te.lit,V,j,te,H,M,G,J,se),j=tt.c,te=tt.lc;else{if(!Te.p)throw new Error("hufDecode issues");let Ce;for(Ce=0;Ce<Te.lit;Ce++){const ke=Ee(S[Te.p[Ce]]);for(;te<ke&&M.value<_e;)We(j,te,H,M),j=Ue.c,te=Ue.lc;if(te>=ke&&ue(S[Te.p[Ce]])==(j>>te-ke&(1<<ke)-1)){te-=ke,ht(Te.p[Ce],V,j,te,H,M,G,J,se),j=tt.c,te=tt.lc;break}}if(Ce==Te.lit)throw new Error("hufDecode issues")}}const he=8-L&7;for(j>>=he,te-=he;te>0;){const ye=U[j<<14-te&16383];if(ye.len)te-=ye.len,ht(ye.lit,V,j,te,H,M,G,J,se),j=tt.c,te=tt.lc;else throw new Error("hufDecode issues")}return!0}function Dt(S,U,H,M,L,V){const z={value:0},G=H.value,J=Xe(U,H),j=Xe(U,H);H.value+=4;const te=Xe(U,H);if(H.value+=4,J<0||J>=65537||j<0||j>=65537)throw new Error("Something wrong with HUF_ENCSIZE");const se=new Array(65537),_e=new Array(16384);$(_e);const he=M-(H.value-G);if(de(S,H,he,J,j,se),te>8*(M-(H.value-G)))throw new Error("Something wrong with hufUncompress");Ie(se,J,j,_e),nt(se,_e,S,H,te,j,V,L,z)}function It(S,U,H){for(let M=0;M<H;++M)U[M]=S[U[M]]}function ft(S){for(let U=1;U<S.length;U++){const H=S[U-1]+S[U]-128;S[U]=H}}function Y(S,U){let H=0,M=Math.floor((S.length+1)/2),L=0;const V=S.length-1;for(;!(L>V||(U[L++]=S[H++],L>V));)U[L++]=S[M++]}function jt(S){let U=S.byteLength;const H=new Array;let M=0;const L=new DataView(S);for(;U>0;){const V=L.getInt8(M++);if(V<0){const z=-V;U-=z+1;for(let G=0;G<z;G++)H.push(L.getUint8(M++))}else{const z=V;U-=2;const G=L.getUint8(M++);for(let J=0;J<z+1;J++)H.push(G)}}return H}function vt(S,U,H,M,L,V){let z=new DataView(V.buffer);const G=H[S.idx[0]].width,J=H[S.idx[0]].height,j=3,te=Math.floor(G/8),se=Math.ceil(G/8),_e=Math.ceil(J/8),he=G-(se-1)*8,ye=J-(_e-1)*8,Te={value:0},Ce=new Array(j),ke=new Array(j),je=new Array(j),Ze=new Array(j),Ge=new Array(j);for(let He=0;He<j;++He)Ge[He]=U[S.idx[He]],Ce[He]=He<1?0:Ce[He-1]+se*_e,ke[He]=new Float32Array(64),je[He]=new Uint16Array(64),Ze[He]=new Uint16Array(se*64);for(let He=0;He<_e;++He){let Ct=8;He==_e-1&&(Ct=ye);let Ht=8;for(let yt=0;yt<se;++yt){yt==se-1&&(Ht=he);for(let et=0;et<j;++et)je[et].fill(0),je[et][0]=L[Ce[et]++],gt(Te,M,je[et]),Je(je[et],ke[et]),bt(ke[et]);Ye(ke);for(let et=0;et<j;++et)k(ke[et],Ze[et],yt*64)}let St=0;for(let yt=0;yt<j;++yt){const et=H[S.idx[yt]].type;for(let Bt=8*He;Bt<8*He+Ct;++Bt){St=Ge[yt][Bt];for(let Wt=0;Wt<te;++Wt){const Nt=Wt*64+(Bt&7)*8;z.setUint16(St+0*2*et,Ze[yt][Nt+0],!0),z.setUint16(St+1*2*et,Ze[yt][Nt+1],!0),z.setUint16(St+2*2*et,Ze[yt][Nt+2],!0),z.setUint16(St+3*2*et,Ze[yt][Nt+3],!0),z.setUint16(St+4*2*et,Ze[yt][Nt+4],!0),z.setUint16(St+5*2*et,Ze[yt][Nt+5],!0),z.setUint16(St+6*2*et,Ze[yt][Nt+6],!0),z.setUint16(St+7*2*et,Ze[yt][Nt+7],!0),St+=8*2*et}}if(te!=se)for(let Bt=8*He;Bt<8*He+Ct;++Bt){const Wt=Ge[yt][Bt]+8*te*2*et,Nt=te*64+(Bt&7)*8;for(let zt=0;zt<Ht;++zt)z.setUint16(Wt+zt*2*et,Ze[yt][Nt+zt],!0)}}}const lt=new Uint16Array(G);z=new DataView(V.buffer);for(let He=0;He<j;++He){H[S.idx[He]].decoded=!0;const Ct=H[S.idx[He]].type;if(H[He].type==2)for(let Ht=0;Ht<J;++Ht){const St=Ge[He][Ht];for(let yt=0;yt<G;++yt)lt[yt]=z.getUint16(St+yt*2*Ct,!0);for(let yt=0;yt<G;++yt)z.setFloat32(St+yt*2*Ct,oe(lt[yt]),!0)}}}function gt(S,U,H){let M,L=1;for(;L<64;)M=U[S.value],M==65280?L=64:M>>8==255?L+=M&255:(H[L]=M,L++),S.value++}function Je(S,U){U[0]=oe(S[0]),U[1]=oe(S[1]),U[2]=oe(S[5]),U[3]=oe(S[6]),U[4]=oe(S[14]),U[5]=oe(S[15]),U[6]=oe(S[27]),U[7]=oe(S[28]),U[8]=oe(S[2]),U[9]=oe(S[4]),U[10]=oe(S[7]),U[11]=oe(S[13]),U[12]=oe(S[16]),U[13]=oe(S[26]),U[14]=oe(S[29]),U[15]=oe(S[42]),U[16]=oe(S[3]),U[17]=oe(S[8]),U[18]=oe(S[12]),U[19]=oe(S[17]),U[20]=oe(S[25]),U[21]=oe(S[30]),U[22]=oe(S[41]),U[23]=oe(S[43]),U[24]=oe(S[9]),U[25]=oe(S[11]),U[26]=oe(S[18]),U[27]=oe(S[24]),U[28]=oe(S[31]),U[29]=oe(S[40]),U[30]=oe(S[44]),U[31]=oe(S[53]),U[32]=oe(S[10]),U[33]=oe(S[19]),U[34]=oe(S[23]),U[35]=oe(S[32]),U[36]=oe(S[39]),U[37]=oe(S[45]),U[38]=oe(S[52]),U[39]=oe(S[54]),U[40]=oe(S[20]),U[41]=oe(S[22]),U[42]=oe(S[33]),U[43]=oe(S[38]),U[44]=oe(S[46]),U[45]=oe(S[51]),U[46]=oe(S[55]),U[47]=oe(S[60]),U[48]=oe(S[21]),U[49]=oe(S[34]),U[50]=oe(S[37]),U[51]=oe(S[47]),U[52]=oe(S[50]),U[53]=oe(S[56]),U[54]=oe(S[59]),U[55]=oe(S[61]),U[56]=oe(S[35]),U[57]=oe(S[36]),U[58]=oe(S[48]),U[59]=oe(S[49]),U[60]=oe(S[57]),U[61]=oe(S[58]),U[62]=oe(S[62]),U[63]=oe(S[63])}function bt(S){const U=.5*Math.cos(.7853975),H=.5*Math.cos(3.14159/16),M=.5*Math.cos(3.14159/8),L=.5*Math.cos(3*3.14159/16),V=.5*Math.cos(5*3.14159/16),z=.5*Math.cos(3*3.14159/8),G=.5*Math.cos(7*3.14159/16),J=new Array(4),j=new Array(4),te=new Array(4),se=new Array(4);for(let _e=0;_e<8;++_e){const he=_e*8;J[0]=M*S[he+2],J[1]=z*S[he+2],J[2]=M*S[he+6],J[3]=z*S[he+6],j[0]=H*S[he+1]+L*S[he+3]+V*S[he+5]+G*S[he+7],j[1]=L*S[he+1]-G*S[he+3]-H*S[he+5]-V*S[he+7],j[2]=V*S[he+1]-H*S[he+3]+G*S[he+5]+L*S[he+7],j[3]=G*S[he+1]-V*S[he+3]+L*S[he+5]-H*S[he+7],te[0]=U*(S[he+0]+S[he+4]),te[3]=U*(S[he+0]-S[he+4]),te[1]=J[0]+J[3],te[2]=J[1]-J[2],se[0]=te[0]+te[1],se[1]=te[3]+te[2],se[2]=te[3]-te[2],se[3]=te[0]-te[1],S[he+0]=se[0]+j[0],S[he+1]=se[1]+j[1],S[he+2]=se[2]+j[2],S[he+3]=se[3]+j[3],S[he+4]=se[3]-j[3],S[he+5]=se[2]-j[2],S[he+6]=se[1]-j[1],S[he+7]=se[0]-j[0]}for(let _e=0;_e<8;++_e)J[0]=M*S[16+_e],J[1]=z*S[16+_e],J[2]=M*S[48+_e],J[3]=z*S[48+_e],j[0]=H*S[8+_e]+L*S[24+_e]+V*S[40+_e]+G*S[56+_e],j[1]=L*S[8+_e]-G*S[24+_e]-H*S[40+_e]-V*S[56+_e],j[2]=V*S[8+_e]-H*S[24+_e]+G*S[40+_e]+L*S[56+_e],j[3]=G*S[8+_e]-V*S[24+_e]+L*S[40+_e]-H*S[56+_e],te[0]=U*(S[_e]+S[32+_e]),te[3]=U*(S[_e]-S[32+_e]),te[1]=J[0]+J[3],te[2]=J[1]-J[2],se[0]=te[0]+te[1],se[1]=te[3]+te[2],se[2]=te[3]-te[2],se[3]=te[0]-te[1],S[0+_e]=se[0]+j[0],S[8+_e]=se[1]+j[1],S[16+_e]=se[2]+j[2],S[24+_e]=se[3]+j[3],S[32+_e]=se[3]-j[3],S[40+_e]=se[2]-j[2],S[48+_e]=se[1]-j[1],S[56+_e]=se[0]-j[0]}function Ye(S){for(let U=0;U<64;++U){const H=S[0][U],M=S[1][U],L=S[2][U];S[0][U]=H+1.5747*L,S[1][U]=H-.1873*M-.4682*L,S[2][U]=H+1.8556*M}}function k(S,U,H){for(let M=0;M<64;++M)U[H+M]=tc.toHalfFloat(I(S[M]))}function I(S){return S<=1?Math.sign(S)*Math.pow(Math.abs(S),2.2):Math.sign(S)*Math.pow(B,Math.abs(S)-1)}function ne(S){return new DataView(S.array.buffer,S.offset.value,S.size)}function ge(S){const U=S.viewer.buffer.slice(S.offset.value,S.offset.value+S.size),H=new Uint8Array(jt(U)),M=new Uint8Array(H.length);return ft(H),Y(H,M),new DataView(M.buffer)}function Se(S){const U=S.array.slice(S.offset.value,S.offset.value+S.size),H=Nr(U),M=new Uint8Array(H.length);return ft(H),Y(H,M),new DataView(M.buffer)}function ce(S){const U=S.viewer,H={value:S.offset.value},M=new Uint16Array(S.columns*S.lines*(S.inputChannels.length*S.type)),L=new Uint8Array(8192);let V=0;const z=new Array(S.inputChannels.length);for(let ye=0,Te=S.inputChannels.length;ye<Te;ye++)z[ye]={},z[ye].start=V,z[ye].end=z[ye].start,z[ye].nx=S.columns,z[ye].ny=S.lines,z[ye].size=S.type,V+=z[ye].nx*z[ye].ny*z[ye].size;const G=le(U,H),J=le(U,H);if(J>=8192)throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");if(G<=J)for(let ye=0;ye<J-G+1;ye++)L[ye+G]=at(U,H);const j=new Uint16Array(65536),te=D(L,j),se=Xe(U,H);Dt(S.array,U,H,se,M,V);for(let ye=0;ye<S.inputChannels.length;++ye){const Te=z[ye];for(let Ce=0;Ce<z[ye].size;++Ce)mt(M,Te.start+Ce,Te.nx,Te.size,Te.ny,Te.nx*Te.size,te)}It(j,M,V);let _e=0;const he=new Uint8Array(M.buffer.byteLength);for(let ye=0;ye<S.lines;ye++)for(let Te=0;Te<S.inputChannels.length;Te++){const Ce=z[Te],ke=Ce.nx*Ce.size,je=new Uint8Array(M.buffer,Ce.end*2,ke*2);he.set(je,_e),_e+=ke*2,Ce.end+=ke}return new DataView(he.buffer)}function $e(S){const U=S.array.slice(S.offset.value,S.offset.value+S.size),H=Nr(U),M=S.inputChannels.length*S.lines*S.columns*S.totalBytes,L=new ArrayBuffer(M),V=new DataView(L);let z=0,G=0;const J=new Array(4);for(let j=0;j<S.lines;j++)for(let te=0;te<S.inputChannels.length;te++){let se=0;switch(S.inputChannels[te].pixelType){case 1:J[0]=z,J[1]=J[0]+S.columns,z=J[1]+S.columns;for(let he=0;he<S.columns;++he){const ye=H[J[0]++]<<8|H[J[1]++];se+=ye,V.setUint16(G,se,!0),G+=2}break;case 2:J[0]=z,J[1]=J[0]+S.columns,J[2]=J[1]+S.columns,z=J[2]+S.columns;for(let he=0;he<S.columns;++he){const ye=H[J[0]++]<<24|H[J[1]++]<<16|H[J[2]++]<<8;se+=ye,V.setUint32(G,se,!0),G+=4}break}}return V}function Ne(S){const U=S.viewer,H={value:S.offset.value},M=new Uint8Array(S.columns*S.lines*(S.inputChannels.length*S.type*2)),L={version:Qe(U,H),unknownUncompressedSize:Qe(U,H),unknownCompressedSize:Qe(U,H),acCompressedSize:Qe(U,H),dcCompressedSize:Qe(U,H),rleCompressedSize:Qe(U,H),rleUncompressedSize:Qe(U,H),rleRawSize:Qe(U,H),totalAcUncompressedCount:Qe(U,H),totalDcUncompressedCount:Qe(U,H),acCompression:Qe(U,H)};if(L.version<2)throw new Error("EXRLoader.parse: "+vn.compression+" version "+L.version+" is unsupported");const V=new Array;let z=le(U,H)-2;for(;z>0;){const Te=Ke(U.buffer,H),Ce=at(U,H),ke=Ce>>2&3,je=(Ce>>4)-1,Ze=new Int8Array([je])[0],Ge=at(U,H);V.push({name:Te,index:Ze,type:Ge,compression:ke}),z-=Te.length+3}const G=vn.channels,J=new Array(S.inputChannels.length);for(let Te=0;Te<S.inputChannels.length;++Te){const Ce=J[Te]={},ke=G[Te];Ce.name=ke.name,Ce.compression=0,Ce.decoded=!1,Ce.type=ke.pixelType,Ce.pLinear=ke.pLinear,Ce.width=S.columns,Ce.height=S.lines}const j={idx:new Array(3)};for(let Te=0;Te<S.inputChannels.length;++Te){const Ce=J[Te];for(let ke=0;ke<V.length;++ke){const je=V[ke];Ce.name==je.name&&(Ce.compression=je.compression,je.index>=0&&(j.idx[je.index]=Te),Ce.offset=Te)}}let te,se,_e;if(L.acCompressedSize>0)switch(L.acCompression){case 0:te=new Uint16Array(L.totalAcUncompressedCount),Dt(S.array,U,H,L.acCompressedSize,te,L.totalAcUncompressedCount);break;case 1:const Te=S.array.slice(H.value,H.value+L.totalAcUncompressedCount),Ce=Nr(Te);te=new Uint16Array(Ce.buffer),H.value+=L.totalAcUncompressedCount;break}if(L.dcCompressedSize>0){const Te={array:S.array,offset:H,size:L.dcCompressedSize};se=new Uint16Array(Se(Te).buffer),H.value+=L.dcCompressedSize}if(L.rleRawSize>0){const Te=S.array.slice(H.value,H.value+L.rleCompressedSize),Ce=Nr(Te);_e=jt(Ce.buffer),H.value+=L.rleCompressedSize}let he=0;const ye=new Array(J.length);for(let Te=0;Te<ye.length;++Te)ye[Te]=new Array;for(let Te=0;Te<S.lines;++Te)for(let Ce=0;Ce<J.length;++Ce)ye[Ce].push(he),he+=J[Ce].width*S.type*2;vt(j,ye,J,te,se,M);for(let Te=0;Te<J.length;++Te){const Ce=J[Te];if(!Ce.decoded)switch(Ce.compression){case 2:let ke=0,je=0;for(let Ze=0;Ze<S.lines;++Ze){let Ge=ye[Te][ke];for(let lt=0;lt<Ce.width;++lt){for(let He=0;He<2*Ce.type;++He)M[Ge++]=_e[je+He*Ce.width*Ce.height];je++}ke++}break;case 1:default:throw new Error("EXRLoader.parse: unsupported channel compression")}}return new DataView(M.buffer)}function Ke(S,U){const H=new Uint8Array(S);let M=0;for(;H[U.value+M]!=0;)M+=1;const L=new TextDecoder().decode(H.slice(U.value,U.value+M));return U.value=U.value+M+1,L}function it(S,U,H){const M=new TextDecoder().decode(new Uint8Array(S).slice(U.value,U.value+H));return U.value=U.value+H,M}function Me(S,U){const H=ze(S,U),M=Xe(S,U);return[H,M]}function Ve(S,U){const H=Xe(S,U),M=Xe(S,U);return[H,M]}function ze(S,U){const H=S.getInt32(U.value,!0);return U.value=U.value+4,H}function Xe(S,U){const H=S.getUint32(U.value,!0);return U.value=U.value+4,H}function Oe(S,U){const H=S[U.value];return U.value=U.value+1,H}function at(S,U){const H=S.getUint8(U.value);return U.value=U.value+1,H}const Qe=function(S,U){let H;return"getBigInt64"in DataView.prototype?H=Number(S.getBigInt64(U.value,!0)):H=S.getUint32(U.value+4,!0)+Number(S.getUint32(U.value,!0)<<32),U.value+=8,H};function st(S,U){const H=S.getFloat32(U.value,!0);return U.value+=4,H}function Q(S,U){return tc.toHalfFloat(st(S,U))}function oe(S){const U=(S&31744)>>10,H=S&1023;return(S>>15?-1:1)*(U?U===31?H?NaN:1/0:Math.pow(2,U-15)*(1+H/1024):6103515625e-14*(H/1024))}function le(S,U){const H=S.getUint16(U.value,!0);return U.value+=2,H}function ve(S,U){return oe(le(S,U))}function Be(S,U,H,M){const L=H.value,V=[];for(;H.value<L+M-1;){const z=Ke(U,H),G=ze(S,H),J=at(S,H);H.value+=3;const j=ze(S,H),te=ze(S,H);V.push({name:z,pixelType:G,pLinear:J,xSampling:j,ySampling:te})}return H.value+=1,V}function be(S,U){const H=st(S,U),M=st(S,U),L=st(S,U),V=st(S,U),z=st(S,U),G=st(S,U),J=st(S,U),j=st(S,U);return{redX:H,redY:M,greenX:L,greenY:V,blueX:z,blueY:G,whiteX:J,whiteY:j}}function rt(S,U){const H=["NO_COMPRESSION","RLE_COMPRESSION","ZIPS_COMPRESSION","ZIP_COMPRESSION","PIZ_COMPRESSION","PXR24_COMPRESSION","B44_COMPRESSION","B44A_COMPRESSION","DWAA_COMPRESSION","DWAB_COMPRESSION"],M=at(S,U);return H[M]}function Ut(S,U){const H=ze(S,U),M=ze(S,U),L=ze(S,U),V=ze(S,U);return{xMin:H,yMin:M,xMax:L,yMax:V}}function Ot(S,U){const H=["INCREASING_Y","DECREASING_Y","RANDOM_Y"],M=at(S,U);return H[M]}function Tt(S,U){const H=["ENVMAP_LATLONG","ENVMAP_CUBE"],M=at(S,U);return H[M]}function rn(S,U){const H=["ONE_LEVEL","MIPMAP_LEVELS","RIPMAP_LEVELS"],M=["ROUND_DOWN","ROUND_UP"],L=Xe(S,U),V=Xe(S,U),z=at(S,U);return{xSize:L,ySize:V,levelMode:H[z&15],roundingMode:M[z>>4]}}function sn(S,U){const H=st(S,U),M=st(S,U);return[H,M]}function ci(S,U){const H=st(S,U),M=st(S,U),L=st(S,U);return[H,M,L]}function Di(S,U,H,M,L){if(M==="string"||M==="stringvector"||M==="iccProfile")return it(U,H,L);if(M==="chlist")return Be(S,U,H,L);if(M==="chromaticities")return be(S,H);if(M==="compression")return rt(S,H);if(M==="box2i")return Ut(S,H);if(M==="envmap")return Tt(S,H);if(M==="tiledesc")return rn(S,H);if(M==="lineOrder")return Ot(S,H);if(M==="float")return st(S,H);if(M==="v2f")return sn(S,H);if(M==="v3f")return ci(S,H);if(M==="int")return ze(S,H);if(M==="rational")return Me(S,H);if(M==="timecode")return Ve(S,H);if(M==="preview")return H.value+=L,"skipped";H.value+=L}function dn(S,U){const H=Math.log2(S);return U=="ROUND_DOWN"?Math.floor(H):Math.ceil(H)}function fi(S,U,H){let M=0;switch(S.levelMode){case"ONE_LEVEL":M=1;break;case"MIPMAP_LEVELS":M=dn(Math.max(U,H),S.roundingMode)+1;break;case"RIPMAP_LEVELS":throw new Error("THREE.EXRLoader: RIPMAP_LEVELS tiles currently unsupported.")}return M}function di(S,U,H,M){const L=new Array(S);for(let V=0;V<S;V++){const z=1<<V;let G=U/z|0;M=="ROUND_UP"&&G*z<U&&(G+=1);const J=Math.max(G,1);L[V]=(J+H-1)/H|0}return L}function Yi(){const S=this,U=S.offset,H={value:0};for(let M=0;M<S.tileCount;M++){const L=ze(S.viewer,U),V=ze(S.viewer,U);U.value+=8,S.size=Xe(S.viewer,U);const z=L*S.blockWidth,G=V*S.blockHeight;S.columns=z+S.blockWidth>S.width?S.width-z:S.blockWidth,S.lines=G+S.blockHeight>S.height?S.height-G:S.blockHeight;const J=S.columns*S.totalBytes,te=S.size<S.lines*J?S.uncompress(S):ne(S);U.value+=S.size;for(let se=0;se<S.lines;se++){const _e=se*S.columns*S.totalBytes;for(let he=0;he<S.inputChannels.length;he++){const ye=vn.channels[he].name,Te=S.channelByteOffsets[ye]*S.columns,Ce=S.decodeChannels[ye];if(Ce===void 0)continue;H.value=_e+Te;const ke=(S.height-(1+G+se))*S.outLineWidth;for(let je=0;je<S.columns;je++){const Ze=ke+(je+z)*S.outputChannels+Ce;S.byteArray[Ze]=S.getter(te,H)}}}}}function hi(){const S=this,U=S.offset,H={value:0};for(let M=0;M<S.height/S.blockHeight;M++){const L=ze(S.viewer,U)-vn.dataWindow.yMin;S.size=Xe(S.viewer,U),S.lines=L+S.blockHeight>S.height?S.height-L:S.blockHeight;const V=S.columns*S.totalBytes,G=S.size<S.lines*V?S.uncompress(S):ne(S);U.value+=S.size;for(let J=0;J<S.blockHeight;J++){const j=M*S.blockHeight,te=J+S.scanOrder(j);if(te>=S.height)continue;const se=J*V,_e=(S.height-1-te)*S.outLineWidth;for(let he=0;he<S.inputChannels.length;he++){const ye=vn.channels[he].name,Te=S.channelByteOffsets[ye]*S.columns,Ce=S.decodeChannels[ye];if(Ce!==void 0){H.value=se+Te;for(let ke=0;ke<S.columns;ke++){const je=_e+ke*S.outputChannels+Ce;S.byteArray[je]=S.getter(G,H)}}}}}}function Ki(S,U,H){const M={};if(S.getUint32(0,!0)!=20000630)throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");M.version=S.getUint8(4);const L=S.getUint8(5);M.spec={singleTile:!!(L&2),longName:!!(L&4),deepFormat:!!(L&8),multiPart:!!(L&16)},H.value=8;let V=!0;for(;V;){const z=Ke(U,H);if(z==="")V=!1;else{const G=Ke(U,H),J=Xe(S,H),j=Di(S,U,H,G,J);j===void 0?console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${G}'.`):M[z]=j}}if((L&-7)!=0)throw console.error("THREE.EXRHeader:",M),new Error("THREE.EXRLoader: Provided file is currently unsupported.");return M}function $n(S,U,H,M,L){const V={size:0,viewer:U,array:H,offset:M,width:S.dataWindow.xMax-S.dataWindow.xMin+1,height:S.dataWindow.yMax-S.dataWindow.yMin+1,inputChannels:S.channels,channelByteOffsets:{},scanOrder:null,totalBytes:null,columns:null,lines:null,type:null,uncompress:null,getter:null,format:null,colorSpace:Ri};switch(S.compression){case"NO_COMPRESSION":V.blockHeight=1,V.uncompress=ne;break;case"RLE_COMPRESSION":V.blockHeight=1,V.uncompress=ge;break;case"ZIPS_COMPRESSION":V.blockHeight=1,V.uncompress=Se;break;case"ZIP_COMPRESSION":V.blockHeight=16,V.uncompress=Se;break;case"PIZ_COMPRESSION":V.blockHeight=32,V.uncompress=ce;break;case"PXR24_COMPRESSION":V.blockHeight=16,V.uncompress=$e;break;case"DWAA_COMPRESSION":V.blockHeight=32,V.uncompress=Ne;break;case"DWAB_COMPRESSION":V.blockHeight=256,V.uncompress=Ne;break;default:throw new Error("EXRLoader.parse: "+S.compression+" is unsupported")}const z={};for(const te of S.channels)switch(te.name){case"Y":case"R":case"G":case"B":case"A":z[te.name]=!0,V.type=te.pixelType}let G=!1;if(z.R&&z.G&&z.B)G=!z.A,V.outputChannels=4,V.decodeChannels={R:0,G:1,B:2,A:3};else if(z.Y)V.outputChannels=1,V.decodeChannels={Y:0};else throw new Error("EXRLoader.parse: file contains unsupported data channels.");if(V.type==1)switch(L){case Rn:V.getter=ve;break;case En:V.getter=le;break}else if(V.type==2)switch(L){case Rn:V.getter=st;break;case En:V.getter=Q}else throw new Error("EXRLoader.parse: unsupported pixelType "+V.type+" for "+S.compression+".");V.columns=V.width;const J=V.width*V.height*V.outputChannels;switch(L){case Rn:V.byteArray=new Float32Array(J),G&&V.byteArray.fill(1,0,J);break;case En:V.byteArray=new Uint16Array(J),G&&V.byteArray.fill(15360,0,J);break;default:console.error("THREE.EXRLoader: unsupported type: ",L);break}let j=0;for(const te of S.channels)V.decodeChannels[te.name]!==void 0&&(V.channelByteOffsets[te.name]=j),j+=te.pixelType*2;if(V.totalBytes=j,V.outLineWidth=V.width*V.outputChannels,S.lineOrder==="INCREASING_Y"?V.scanOrder=te=>te:V.scanOrder=te=>V.height-1-te,V.outputChannels==4?(V.format=In,V.colorSpace=Ri):(V.format=Ja,V.colorSpace=ni),S.spec.singleTile){V.blockHeight=S.tiles.ySize,V.blockWidth=S.tiles.xSize;const te=fi(S.tiles,V.width,V.height),se=di(te,V.width,S.tiles.xSize,S.tiles.roundingMode),_e=di(te,V.height,S.tiles.ySize,S.tiles.roundingMode);V.tileCount=se[0]*_e[0];for(let he=0;he<te;he++)for(let ye=0;ye<_e[he];ye++)for(let Te=0;Te<se[he];Te++)Qe(U,M);V.decode=Yi.bind(V)}else{V.blockWidth=V.width;const te=Math.ceil(V.height/V.blockHeight);for(let se=0;se<te;se++)Qe(U,M);V.decode=hi.bind(V)}return V}const pi={value:0},kt=new DataView(e),mi=new Uint8Array(e),vn=Ki(kt,e,pi),zn=$n(vn,kt,mi,pi,this.type);return zn.decode(),{header:vn,width:zn.width,height:zn.height,data:zn.byteArray,format:zn.format,colorSpace:zn.colorSpace,type:this.type}}setDataType(e){return this.type=e,this}load(e,t,n,i){function s(l,u){l.colorSpace=u.colorSpace,l.minFilter=ln,l.magFilter=ln,l.generateMipmaps=!1,l.flipY=!1,t&&t(l,u)}return super.load(e,s,n,i)}}const $r={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class rr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const cC=new Mf(-1,1,1,-1,0,1);class fC extends ui{constructor(){super(),this.setAttribute("position",new bn([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new bn([0,2,0,0,2,0],2))}}const dC=new fC;class Ff{constructor(e){this._mesh=new Pn(dC,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,cC)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Bf extends rr{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof un?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ns.clone(e.uniforms),this.material=new un({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ff(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Uc extends rr{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let l,u;this.inverse?(l=0,u=1):(l=1,u=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,l,4294967295),s.buffers.stencil.setClear(u),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class hC extends rr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class pC{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ct);this._width=n.width,this._height=n.height,t=new kn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:En}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Bf($r),this.copyPass.material.blending=si,this.clock=new cx}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const l=this.passes[i];if(l.enabled!==!1){if(l.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),l.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),l.needsSwap){if(n){const u=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(u.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(u.EQUAL,1,4294967295)}this.swapBuffers()}Uc!==void 0&&(l instanceof Uc?n=!0:l instanceof hC&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ct);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class mC extends rr{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Et}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,l;this.overrideMaterial!==null&&(l=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=l),e.autoClear=i}}const gC={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Et(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Co extends rr{constructor(e,t=1,n,i){super(),this.strength=t,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ct(e.x,e.y):new ct(256,256),this.clearColor=new Et(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),l=Math.round(this.resolution.y/2);this.renderTargetBright=new kn(s,l,{type:En}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let _=0;_<this.nMips;_++){const v=new kn(s,l,{type:En});v.texture.name="UnrealBloomPass.h"+_,v.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(v);const y=new kn(s,l,{type:En});y.texture.name="UnrealBloomPass.v"+_,y.texture.generateMipmaps=!1,this.renderTargetsVertical.push(y),s=Math.round(s/2),l=Math.round(l/2)}const u=gC;this.highPassUniforms=ns.clone(u.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new un({uniforms:this.highPassUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];s=Math.round(this.resolution.x/2),l=Math.round(this.resolution.y/2);for(let _=0;_<this.nMips;_++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[_])),this.separableBlurMaterials[_].uniforms.invSize.value=new ct(1/s,1/l),s=Math.round(s/2),l=Math.round(l/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const m=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=m,this.bloomTintColors=[new ie(1,1,1),new ie(1,1,1),new ie(1,1,1),new ie(1,1,1),new ie(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ns.clone($r.uniforms),this.blendMaterial=new un({uniforms:this.copyUniforms,vertexShader:$r.vertexShader,fragmentShader:$r.fragmentShader,blending:Js,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Et,this._oldClearAlpha=1,this._basic=new il,this._fsQuad=new Ff(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new ct(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const l=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let u=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=u.texture,this.separableBlurMaterials[c].uniforms.direction.value=Co.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Co.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),u=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=l}_getSeparableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new un({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ct(.5,.5)},direction:{value:new ct(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}_getCompositeMaterial(e){return new un({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Co.BlurDirectionX=new ct(1,0);Co.BlurDirectionY=new ct(0,1);const _C={name:"FXAAShader",uniforms:{tDiffuse:{value:null},resolution:{value:new ct(1/1024,1/512)}},vertexShader:`

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
*/const vC=`precision highp float;

in vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`,yC=`precision highp float;

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
`,Nc={fs:yC,vs:vC};/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/const xC=`#define STANDARD
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
}`,EC=xC;var TC=Object.defineProperty,SC=Object.getOwnPropertyDescriptor,al=(o,e,t,n)=>{for(var i=n>1?void 0:n?SC(e,t):e,s=o.length-1,l;s>=0;s--)(l=o[s])&&(i=(n?l(e,t,i):l(i))||i);return n&&i&&TC(e,t,i),i};let Zo=class extends qi{constructor(){super(...arguments),this.prevTime=0,this.rotation=new ie(0,0,0)}set outputNode(o){this._outputNode=o,this.outputAnalyser=new Jr(this._outputNode)}get outputNode(){return this._outputNode}set inputNode(o){this._inputNode=o,this.inputAnalyser=new Jr(this._inputNode)}get inputNode(){return this._inputNode}connectedCallback(){super.connectedCallback()}init(){const o=new Z0;o.background=new Et(1051668);const e=new Pn(new is(10,5),new ex({uniforms:{resolution:{value:new ct(1,1)},rand:{value:0}},vertexShader:Nc.vs,fragmentShader:Nc.fs,glslVersion:Fa}));e.material.side=cn,o.add(e),this.backdrop=e;const t=new An(75,window.innerWidth/window.innerHeight,.1,1e3);t.position.set(2,-2,5),this.camera=t;const n=new XM({canvas:this.canvas,antialias:!1});n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio/1);const i=new is(1,10),s=new Va(n);s.compileEquirectangularShader();const l=new tx({color:16,metalness:.5,roughness:.1,emissive:16,emissiveIntensity:1.5});l.onBeforeCompile=T=>{T.uniforms.time={value:0},T.uniforms.inputData={value:new Vt},T.uniforms.outputData={value:new Vt},l.userData.shader=T,T.vertexShader=EC};const u=new Pn(i,l);o.add(u),u.visible=!1,this.sphere=u,new uC().load("/piz_compressed.exr",T=>{T.mapping=Qr;const w=s.fromEquirectangular(T);l.envMap=w.texture,u.visible=!0},void 0,T=>{console.error("Error loading EXR:",T),u.visible=!0});const c=new mC(o,t),m=new Co(new ct(window.innerWidth,window.innerHeight),5,.5,0),_=new Bf(_C),v=new pC(n);v.addPass(c),v.addPass(m),this.composer=v;function y(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix();const T=n.getPixelRatio(),w=window.innerWidth,P=window.innerHeight;e.material.uniforms.resolution.value.set(w*T,P*T),n.setSize(w,P),v.setSize(w,P),_.material.uniforms.resolution.value.set(1/(w*T),1/(P*T))}window.addEventListener("resize",y),y(),this.animation()}animation(){requestAnimationFrame(()=>this.animation()),this.inputAnalyser.update(),this.outputAnalyser.update();const o=performance.now(),e=(o-this.prevTime)/(1e3/60);this.prevTime=o;const t=this.backdrop.material,n=this.sphere.material;if(t.uniforms.rand.value=Math.random()*1e4,n.userData.shader){this.sphere.scale.setScalar(1+.2*this.outputAnalyser.data[1]/255);const i=.001;this.rotation.x+=e*i*.5*this.outputAnalyser.data[1]/255,this.rotation.z+=e*i*.5*this.inputAnalyser.data[1]/255,this.rotation.y+=e*i*.25*this.inputAnalyser.data[2]/255,this.rotation.y+=e*i*.25*this.outputAnalyser.data[2]/255;const s=new Gn(this.rotation.x,this.rotation.y,this.rotation.z),l=new Ro().setFromEuler(s),u=new ie(0,0,5);u.applyQuaternion(l),this.camera.position.copy(u),this.camera.lookAt(this.sphere.position),n.userData.shader.uniforms.time.value+=e*.1*this.outputAnalyser.data[0]/255,n.userData.shader.uniforms.inputData.value.set(1*this.inputAnalyser.data[0]/255,.1*this.inputAnalyser.data[1]/255,10*this.inputAnalyser.data[2]/255,0),n.userData.shader.uniforms.outputData.value.set(2*this.outputAnalyser.data[0]/255,.1*this.outputAnalyser.data[1]/255,10*this.outputAnalyser.data[2]/255,0)}this.composer.render()}firstUpdated(){this.canvas=this.shadowRoot.querySelector("canvas"),this.init()}render(){return po`<canvas></canvas>`}};Zo.styles=za`
    canvas {
      width: 100% !important;
      height: 100% !important;
      position: absolute;
      inset: 0;
      image-rendering: pixelated;
    }
  `;al([jo()],Zo.prototype,"outputNode",1);al([jo()],Zo.prototype,"inputNode",1);Zo=al([$a("gdm-live-audio-visuals-3d")],Zo);var MC=Object.defineProperty,CC=Object.getOwnPropertyDescriptor,Un=(o,e,t,n)=>{for(var i=n>1?void 0:n?CC(e,t):e,s=o.length-1,l;s>=0;s--)(l=o[s])&&(i=(n?l(e,t,i):l(i))||i);return n&&i&&MC(e,t,i),i};const Lc=window.AudioContext||window.webkitAudioContext,qs=20*1024*1024;let on=class extends qi{constructor(){super(),this.isRecording=!1,this.status="Choose instruction method: Upload a file or type manually.",this.error="",this.selectedFile=null,this.systemInstructionFromFile=null,this.isFileProcessing=!1,this.isSessionInitialized=!1,this.instructionMode="file",this.manualSystemInstruction="",this._model="gemini-2.5-flash-preview-native-audio-dialog",this.session=null,this.inputAudioContext=new Lc({sampleRate:16e3}),this.outputAudioContext=new Lc({sampleRate:24e3}),this.inputNode=this.inputAudioContext.createGain(),this.outputNode=this.outputAudioContext.createGain(),this.nextStartTime=0,this.mediaStream=null,this.sourceNode=null,this.scriptProcessorNode=null,this.sources=new Set,this.errorTimeoutId=null,console.log("GdmLiveAudio constructor called"),this.initClientOnly(),this.updateInitialStatus()}get apiKey(){return this._apiKey}set apiKey(o){const e=this._apiKey;this._apiKey=o,this.requestUpdate("apiKey",e),o&&this.initClientOnly()}get model(){return this._model}set model(o){this._model=o}connectedCallback(){super.connectedCallback(),console.log("GdmLiveAudio connectedCallback called")}firstUpdated(){console.log("GdmLiveAudio firstUpdated called")}updateInitialStatus(){this.instructionMode==="file"?this.status='Please select a file (PDF, TXT, RTF, XML, CSV, DOCX), then click "Process File".':this.status='Type your system instructions, then click "Apply Manual Instructions".'}handleInstructionModeChange(o){if(this.instructionMode!==o){if(this.instructionMode=o,this.updateError(""),o==="file")this.manualSystemInstruction="",this.status='Please select a file (PDF, TXT, RTF, XML, CSV, DOCX), then click "Process File".';else{this.selectedFile=null,this.systemInstructionFromFile=null;const e=this.shadowRoot?.getElementById("fileUpload");e&&(e.value=""),this.status='Type your system instructions, then click "Apply Manual Instructions".'}this.isSessionInitialized=!1}}initAudio(){this.nextStartTime=this.outputAudioContext.currentTime}async readFileAsBase64(o){return new Promise((e,t)=>{const n=new FileReader;n.onload=()=>{const s=n.result.split(",")[1];s?e(s):t(new Error("Could not extract base64 data from file."))},n.onerror=i=>t(i),n.readAsDataURL(o)})}async readFileAsText(o){return new Promise((e,t)=>{const n=new FileReader;n.onload=()=>{e(n.result)},n.onerror=i=>t(i),n.readAsText(o)})}async extractTextFromFileContent(o){if(o.size>qs){this.updateError(`File "${o.name}" exceeds the 20MB size limit.`),this.updateStatus(`File "${o.name}" is too large. Please select a smaller file (Max 20MB).`),this.selectedFile=null;const t=this.shadowRoot?.getElementById("fileUpload");return t&&(t.value=""),null}this.isFileProcessing=!0,this.updateError("");const e=o.name.toLowerCase();try{if(e.endsWith(".txt")){this.updateStatus(`Reading ${o.name} directly for system instruction...`);const t=await this.readFileAsText(o);if(t&&t.trim().length>0)return this.updateStatus(`Using content of ${o.name} as system instruction.`),t.trim();throw new Error(`File ${o.name} is empty or contains only whitespace.`)}else return this.updateError("Only .txt files are supported. Please select a text file."),this.updateStatus("File type not supported. Please select a .txt file."),null}catch(t){return console.error(`Error processing file ${o.name}:`,t),this.updateError(`Error processing ${o.name}: ${t.message||t}`),this.updateStatus(`Failed to process ${o.name}.`),null}finally{this.isFileProcessing=!1}}initClientOnly(){if(console.log("GdmLiveAudio initClientOnly called"),this.initAudio(),!this._apiKey){console.log("API key not provided, skipping client initialization");return}if(this.client){console.log("GoogleGenAI client already initialized");return}try{console.log("Attempting to create GoogleGenAI client"),this.updateStatus("Connecting to Google AI client..."),this.client=new ny({apiKey:this._apiKey}),console.log("GoogleGenAI client created successfully"),this.outputNode.connect(this.outputAudioContext.destination),console.log("outputNode connected"),this.updateStatus("Google AI client initialized successfully")}catch(o){console.error("Error during initClientOnly:",o),this.updateError(`Initialization error: ${o.message||o}`),console.log("initClientOnly stopped due to error"),this.client=void 0}}async handleFileChange(o){const e=o.target;if(e.files&&e.files.length>0){const t=e.files[0];if(t.size>qs){this.updateError(`File "${t.name}" exceeds 20MB limit.`),this.updateStatus("File too large (max 20MB). Select another file."),this.selectedFile=null,e.value="";return}if(!t.name.toLowerCase().endsWith(".txt")){this.updateError("Only .txt files are supported."),this.updateStatus("Please select a .txt file."),this.selectedFile=null,e.value="";return}this.selectedFile=t,this.updateStatus(`File '${this.selectedFile.name}' selected. Click "Process File".`),this.isSessionInitialized=!1,this.systemInstructionFromFile=null,this.updateError("")}else this.selectedFile=null,this.updateStatus('Please select a .txt file, then click "Process File".')}handleManualInstructionInput(o){const e=o.target;this.manualSystemInstruction=e.value,this.manualSystemInstruction.trim()===""?this.status='Type your system instructions, then click "Apply Manual Instructions".':this.status='Instructions entered. Click "Apply Manual Instructions".',this.isSessionInitialized=!1,this.updateError("")}async triggerFileProcessing(){if(!this.selectedFile){this.updateError("No file selected to process.");return}if(!this.isFileProcessing){if(this.selectedFile.size>qs){this.updateError(`File "${this.selectedFile.name}" exceeds 20MB limit and cannot be processed.`),this.updateStatus(`File "${this.selectedFile.name}" is too large (Max 20MB).`),this.selectedFile=null;const o=this.shadowRoot?.getElementById("fileUpload");o&&(o.value="");return}this.isSessionInitialized=!1,this.updateError("");try{const o=await this.extractTextFromFileContent(this.selectedFile);o?(this.systemInstructionFromFile=o,await this.initSession(o,`from file "${this.selectedFile?.name}"`)):(this.error||this.updateStatus(`File processing did not yield text from ${this.selectedFile.name}. Using default system instruction.`),await this.initSession(null,"default (file processing failed)"))}catch(o){this.updateError(`Failed to read or process file: ${o.message}`),this.updateStatus(`Error with ${this.selectedFile.name}. Using default system instruction.`),await this.initSession(null,"default (file processing error)")}}}async applyManualInstructions(){if(!(this.isFileProcessing||this.isRecording)){if(!this.manualSystemInstruction.trim()){this.updateError("Manual system instruction cannot be empty."),this.updateStatus("Please enter system instructions before applying.");return}this.isSessionInitialized=!1,this.updateError(""),this.updateStatus("Applying manual system instruction..."),await this.initSession(this.manualSystemInstruction.trim(),"from manual input")}}async initSession(o,e){if(console.log("GdmLiveAudio initSession called"),this.session){try{await this.session.close()}catch(s){console.warn("Could not close previous session cleanly:",s)}this.session=null}if(!this.client){console.error("GoogleGenAI client is not initialized in initSession."),this.updateError("Initialization error: GoogleGenAI client not available."),console.log("initSession stopped: client not available");return}const t=o||"You are an interactive ai with dialogue abilities.",n=e||"default";console.log(`Applying system instruction (${n}): "${t.substring(0,100)}${t.length>100?"...":""}"`);const i={parts:[{text:t}]};this.updateStatus(`Using instruction ${n}. Initializing audio session...`);try{this.session=await this.client.live.connect({model:this._model,callbacks:{onopen:()=>{this.updateStatus(`Instruction ${n} applied. Press 🔴 to start audio session.`),this.isSessionInitialized=!0},onmessage:async s=>{const l=s.serverContent?.modelTurn?.parts?.[0]?.inlineData;if(l&&l.data){this.nextStartTime=Math.max(this.nextStartTime,this.outputAudioContext.currentTime);try{const c=await Py(Ry(l.data),this.outputAudioContext,24e3,1),m=this.outputAudioContext.createBufferSource();m.buffer=c,m.connect(this.outputNode),m.addEventListener("ended",()=>{this.sources.delete(m)}),m.start(this.nextStartTime),this.nextStartTime=this.nextStartTime+c.duration,this.sources.add(m)}catch(c){console.error("Error processing audio data:",c),this.updateError(`Audio processing error: ${c.message||c}`)}}if(s.serverContent&&s.serverContent.interrupted){for(const c of Array.from(this.sources.values())){try{c.stop()}catch(m){console.error("Error stopping audio source:",m)}this.sources.delete(c)}this.nextStartTime=0}},onerror:s=>{console.error("Session Error:",s),this.updateError(`Session Error: ${s.message||s.error||s}`),this.isSessionInitialized=!1},onclose:s=>{this.updateStatus(`Session Closed: ${s.reason||"Unknown reason"}`),this.isSessionInitialized=!1}},config:{responseModalities:[Ho.AUDIO],speechConfig:{voiceConfig:{prebuiltVoiceConfig:{voiceName:"Orus"}}},systemInstruction:i}})}catch(s){console.error("Failed to initialize session:",s),this.updateError(`Failed to initialize session: ${s.message}`),this.updateStatus("Error initializing audio session."),this.isSessionInitialized=!1}}updateStatus(o){this.status=o,console.log("Status:",o)}updateError(o){this.errorTimeoutId&&(clearTimeout(this.errorTimeoutId),this.errorTimeoutId=null),this.error=o,o&&(console.error("Error:",o),this.errorTimeoutId=window.setTimeout(()=>{this.error===o&&(this.error=""),this.errorTimeoutId=null},1e4))}async startRecording(){if(this.isRecording||!this.isSessionInitialized){this.isSessionInitialized||this.updateError("Session not ready. Apply system instructions first.");return}this.inputAudioContext.resume(),this.updateStatus("Requesting microphone access..."),this.updateError("");try{this.mediaStream=await navigator.mediaDevices.getUserMedia({audio:!0,video:!1}),this.updateStatus("Microphone access granted. Starting capture..."),this.sourceNode=this.inputAudioContext.createMediaStreamSource(this.mediaStream),this.sourceNode.connect(this.inputNode);const o=256;this.scriptProcessorNode=this.inputAudioContext.createScriptProcessor(o,1,1),this.scriptProcessorNode.onaudioprocess=e=>{if(!this.isRecording||!this.session)return;const n=e.inputBuffer.getChannelData(0);try{this.session.sendRealtimeInput({media:Iy(n)})}catch(i){console.error("Error sending real-time input:",i),this.updateError(`Error sending audio: ${i.message}`)}},this.sourceNode.connect(this.scriptProcessorNode),this.scriptProcessorNode.connect(this.inputAudioContext.destination),this.isRecording=!0,this.updateStatus("🔴 Recording... Speak now. To stop the recording press 🟥")}catch(o){console.error("Error starting recording:",o),this.updateStatus(`Error starting recording: ${o.message}`),this.updateError(`Error starting recording: ${o.message}`),this.stopRecording()}}stopRecording(){const o=this.isRecording;this.isRecording=!1,o&&this.updateStatus("Stopping recording..."),this.scriptProcessorNode&&(this.scriptProcessorNode.disconnect(),this.scriptProcessorNode.onaudioprocess=null,this.scriptProcessorNode=null),this.sourceNode&&(this.sourceNode.disconnect(),this.sourceNode=null),this.mediaStream&&(this.mediaStream.getTracks().forEach(e=>e.stop()),this.mediaStream=null),o?this.isSessionInitialized?this.updateStatus("Recording stopped. Press 🔴 to start again."):this.updateStatus("Recording stopped. Session is not active."):this.isSessionInitialized||this.updateInitialStatus()}async reset(){if(this.updateStatus("Resetting application..."),this.updateError(""),this.stopRecording(),this.session){try{await this.session.close()}catch(t){console.error("Error closing session during reset:",t),this.updateError(`Error closing session: ${t.message}`)}this.session=null}this.selectedFile=null,this.systemInstructionFromFile=null,this.manualSystemInstruction="",this.isFileProcessing=!1,this.isSessionInitialized=!1,this.instructionMode="file";const o=this.shadowRoot?.getElementById("fileUpload");o&&(o.value="");const e=this.shadowRoot?.getElementById("manualInstructionTextarea");e&&(e.value=""),this.updateInitialStatus()}render(){const o=this.isRecording||this.isFileProcessing;return po`
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
            ?disabled=${o||!this.isSessionInitialized}
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
              ?disabled=${o}
              title="Upload a file for system instructions">
              Upload File
            </button>
            <button 
              role="radio" 
              aria-checked=${this.instructionMode==="manual"}
              ?active=${this.instructionMode==="manual"}
              @click=${()=>this.handleInstructionModeChange("manual")}
              ?disabled=${o}
              title="Type system instructions manually">
              Type Manually
            </button>
          </div>

          ${this.instructionMode==="file"?po`
            <div class="file-controls-container">
              <input 
                type="file" 
                id="fileUpload" 
                accept=".txt,text/plain" 
                @change=${this.handleFileChange}
                ?disabled=${o}
                aria-label="Select File for system instructions"
              />
              <button 
                id="processFileButton" 
                @click=${this.triggerFileProcessing} 
                ?disabled=${!this.selectedFile||o}
                title="Process selected file to extract system instructions">
                Process File
              </button>
            </div>
          `:""}

          ${this.instructionMode==="manual"?po`
            <div class="manual-input-container">
              <textarea 
                id="manualInstructionTextarea"
                .value=${this.manualSystemInstruction}
                @input=${this.handleManualInstructionInput}
                ?disabled=${o}
                placeholder="Type system instructions here..."
                aria-label="Textarea for manual system instructions"
              ></textarea>
              <button 
                id="applyManualInstructionButton" 
                @click=${this.applyManualInstructions} 
                ?disabled=${!this.manualSystemInstruction.trim()||o}
                title="Apply manually entered system instructions">
                Apply Manual Instructions
              </button>
            </div>
          `:""}
        </div>

        <div id="status" role="status" aria-live="polite">
         ${this.error?po`<strong>Error:</strong> ${this.error}`:this.status}
        </div>
        <gdm-live-audio-visuals-3d
          .inputNode=${this.inputNode}
          .outputNode=${this.outputNode}></gdm-live-audio-visuals-3d>
      </div>
    `}};on.styles=za`
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
  `;Un([Hn()],on.prototype,"isRecording",2);Un([Hn()],on.prototype,"status",2);Un([Hn()],on.prototype,"error",2);Un([Hn()],on.prototype,"selectedFile",2);Un([Hn()],on.prototype,"systemInstructionFromFile",2);Un([Hn()],on.prototype,"isFileProcessing",2);Un([Hn()],on.prototype,"isSessionInitialized",2);Un([Hn()],on.prototype,"instructionMode",2);Un([Hn()],on.prototype,"manualSystemInstruction",2);Un([Hn()],on.prototype,"inputNode",2);Un([Hn()],on.prototype,"outputNode",2);on=Un([$a("gdm-live-audio")],on);var AC=Object.defineProperty,wC=Object.getOwnPropertyDescriptor,ll=(o,e,t,n)=>{for(var i=n>1?void 0:n?wC(e,t):e,s=o.length-1,l;s>=0;s--)(l=o[s])&&(i=(n?l(e,t,i):l(i))||i);return n&&i&&AC(e,t,i),i};let Jo=class extends qi{set outputNode(o){this._outputNode=o,this.outputAnalyser=new Jr(this._outputNode)}get outputNode(){return this._outputNode}set inputNode(o){this._inputNode=o,this.inputAnalyser=new Jr(this._inputNode)}get inputNode(){return this._inputNode}connectedCallback(){super.connectedCallback(),this.visualize()}visualize(){if(this.canvas&&this.outputAnalyser){const o=this.canvas,e=this.canvasCtx,t=o.width,n=o.height;e.clearRect(0,0,t,n),e.fillStyle="#1f2937",e.fillRect(0,0,t,n);const i=t/this.outputAnalyser.data.length;let s=0;const l=e.createLinearGradient(0,0,0,n);l.addColorStop(1,"#D16BA5"),l.addColorStop(.5,"#E78686"),l.addColorStop(0,"#FB5F5F"),e.fillStyle=l,this.inputAnalyser.update();for(let c=0;c<this.inputAnalyser.data.length;c++){const m=this.inputAnalyser.data[c]*(n/255);e.fillRect(s,n-m,i,m),s+=i}e.globalCompositeOperation="lighter";const u=e.createLinearGradient(0,0,0,n);u.addColorStop(1,"#3b82f6"),u.addColorStop(.5,"#10b981"),u.addColorStop(0,"#ef4444"),e.fillStyle=u,s=0,this.outputAnalyser.update();for(let c=0;c<this.outputAnalyser.data.length;c++){const m=this.outputAnalyser.data[c]*(n/255);e.fillRect(s,n-m,i,m),s+=i}}requestAnimationFrame(()=>this.visualize())}firstUpdated(){this.canvas=this.shadowRoot.querySelector("canvas"),this.canvas.width=400,this.canvas.height=400,this.canvasCtx=this.canvas.getContext("2d")}render(){return po`<canvas></canvas>`}};Jo.styles=za`
    canvas {
      width: 400px;
      aspect-ratio: 1 / 1;
    }
  `;ll([jo()],Jo.prototype,"outputNode",1);ll([jo()],Jo.prototype,"inputNode",1);Jo=ll([$a("gdm-live-audio-visuals")],Jo);document.addEventListener("DOMContentLoaded",()=>{const o=new on;document.body.appendChild(o)});var $s={},Fc;function RC(){return Fc||(Fc=1,function(o){/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class e{}function t(d,a){const r=/\{([^}]+)\}/g;return d.replace(r,(f,g)=>{if(Object.prototype.hasOwnProperty.call(a,g)){const x=a[g];return x!=null?String(x):""}else throw new Error(`Key '${g}' not found in valueMap.`)})}function n(d,a,r){for(let x=0;x<a.length-1;x++){const R=a[x];if(R.endsWith("[]")){const A=R.slice(0,-2);if(!(A in d))if(Array.isArray(r))d[A]=Array.from({length:r.length},()=>({}));else throw new Error(`Value must be a list given an array path ${R}`);if(Array.isArray(d[A])){const F=d[A];if(Array.isArray(r))for(let Z=0;Z<F.length;Z++){const ee=F[Z];n(ee,a.slice(x+1),r[Z])}else for(const Z of F)n(Z,a.slice(x+1),r)}return}else if(R.endsWith("[0]")){const A=R.slice(0,-3);A in d||(d[A]=[{}]);const F=d[A];n(F[0],a.slice(x+1),r);return}(!d[R]||typeof d[R]!="object")&&(d[R]={}),d=d[R]}const f=a[a.length-1],g=d[f];if(g!==void 0){if(!r||typeof r=="object"&&Object.keys(r).length===0||r===g)return;if(typeof g=="object"&&typeof r=="object"&&g!==null&&r!==null)Object.assign(g,r);else throw new Error(`Cannot set value for an existing key. Key: ${f}`)}else d[f]=r}function i(d,a){try{if(a.length===1&&a[0]==="_self")return d;for(let r=0;r<a.length;r++){if(typeof d!="object"||d===null)return;const f=a[r];if(f.endsWith("[]")){const g=f.slice(0,-2);if(g in d){const x=d[g];return Array.isArray(x)?x.map(R=>i(R,a.slice(r+1))):void 0}else return}else d=d[f]}return d}catch(r){if(r instanceof TypeError)return;throw r}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function s(d,a){if(!a||typeof a!="string")throw new Error("model is required and must be a string");if(d.isVertexAI()){if(a.startsWith("publishers/")||a.startsWith("projects/")||a.startsWith("models/"))return a;if(a.indexOf("/")>=0){const r=a.split("/",2);return`publishers/${r[0]}/models/${r[1]}`}else return`publishers/google/models/${a}`}else return a.startsWith("models/")||a.startsWith("tunedModels/")?a:`models/${a}`}function l(d,a){const r=s(d,a);return r?r.startsWith("publishers/")&&d.isVertexAI()?`projects/${d.getProject()}/locations/${d.getLocation()}/${r}`:r.startsWith("models/")&&d.isVertexAI()?`projects/${d.getProject()}/locations/${d.getLocation()}/publishers/google/${r}`:r:""}function u(d,a){if(a==null)throw new Error("PartUnion is required");if(typeof a=="object")return a;if(typeof a=="string")return{text:a};throw new Error(`Unsupported part type: ${typeof a}`)}function c(d,a){if(a==null||Array.isArray(a)&&a.length===0)throw new Error("PartListUnion is required");return Array.isArray(a)?a.map(r=>u(d,r)):[u(d,a)]}function m(d){return d!=null&&typeof d=="object"&&"parts"in d&&Array.isArray(d.parts)}function _(d){return d!=null&&typeof d=="object"&&"functionCall"in d}function v(d){return d!=null&&typeof d=="object"&&"functionResponse"in d}function y(d,a){if(a==null)throw new Error("ContentUnion is required");return m(a)?a:{role:"user",parts:c(d,a)}}function T(d,a){if(!a)return[];if(d.isVertexAI()&&Array.isArray(a))return a.flatMap(r=>{const f=y(d,r);return f.parts&&f.parts.length>0&&f.parts[0].text!==void 0?[f.parts[0].text]:[]});if(d.isVertexAI()){const r=y(d,a);return r.parts&&r.parts.length>0&&r.parts[0].text!==void 0?[r.parts[0].text]:[]}return Array.isArray(a)?a.map(r=>y(d,r)):[y(d,a)]}function w(d,a){if(a==null||Array.isArray(a)&&a.length===0)throw new Error("contents are required");if(!Array.isArray(a)){if(_(a)||v(a))throw new Error("To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them");return[y(d,a)]}const r=[],f=[],g=m(a[0]);for(const x of a){const R=m(x);if(R!=g)throw new Error("Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them");if(R)r.push(x);else{if(_(x)||v(x))throw new Error("To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them");f.push(x)}}return g||r.push({role:"user",parts:c(d,f)}),r}function P(d,a){if(!d.isVertexAI()&&"default"in a)throw new Error("Default value is not supported in the response schema for the Gemini API.");if("anyOf"in a&&a.anyOf!==void 0)for(const r of a.anyOf)P(d,r);if("items"in a&&a.items!==void 0&&P(d,a.items),"properties"in a&&a.properties!==void 0)for(const r of Object.values(a.properties))P(d,r)}function C(d,a){return P(d,a),a}function E(d,a){if(typeof a=="object"&&"voiceConfig"in a)return a;if(typeof a=="string")return{voiceConfig:{prebuiltVoiceConfig:{voiceName:a}}};throw new Error(`Unsupported speechConfig type: ${typeof a}`)}function O(d,a){return a}function N(d,a){if(!Array.isArray(a))throw new Error("tool is required and must be an array of Tools");return a}function b(d,a,r,f=1){const g=!a.startsWith(`${r}/`)&&a.split("/").length===f;return d.isVertexAI()?a.startsWith("projects/")?a:a.startsWith("locations/")?`projects/${d.getProject()}/${a}`:a.startsWith(`${r}/`)?`projects/${d.getProject()}/locations/${d.getLocation()}/${a}`:g?`projects/${d.getProject()}/locations/${d.getLocation()}/${r}/${a}`:a:g?`${r}/${a}`:a}function X(d,a){if(typeof a!="string")throw new Error("name must be a string");return b(d,a,"cachedContents")}function q(d,a){if(typeof a!="string")throw new Error("fromImageBytes must be a string");return a}function W(d,a){if(typeof a!="string")throw new Error("fromName must be a string");return a.startsWith("files/")?a.split("files/")[1]:a}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function K(d,a){const r={};if(i(a,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const f=i(a,["thought"]);f!=null&&n(r,["thought"],f);const g=i(a,["codeExecutionResult"]);g!=null&&n(r,["codeExecutionResult"],g);const x=i(a,["executableCode"]);x!=null&&n(r,["executableCode"],x);const R=i(a,["fileData"]);R!=null&&n(r,["fileData"],R);const A=i(a,["functionCall"]);A!=null&&n(r,["functionCall"],A);const F=i(a,["functionResponse"]);F!=null&&n(r,["functionResponse"],F);const Z=i(a,["inlineData"]);Z!=null&&n(r,["inlineData"],Z);const ee=i(a,["text"]);return ee!=null&&n(r,["text"],ee),r}function B(d,a){const r={},f=i(a,["parts"]);f!=null&&(Array.isArray(f)?n(r,["parts"],f.map(x=>K(d,x))):n(r,["parts"],f));const g=i(a,["role"]);return g!=null&&n(r,["role"],g),r}function D(d,a){const r={};if(i(a,["response"])!==void 0)throw new Error("response parameter is not supported in Gemini API.");const f=i(a,["description"]);f!=null&&n(r,["description"],f);const g=i(a,["name"]);g!=null&&n(r,["name"],g);const x=i(a,["parameters"]);return x!=null&&n(r,["parameters"],x),r}function $(){return{}}function ae(d,a){const r={},f=i(a,["mode"]);f!=null&&n(r,["mode"],f);const g=i(a,["dynamicThreshold"]);return g!=null&&n(r,["dynamicThreshold"],g),r}function re(d,a){const r={},f=i(a,["dynamicRetrievalConfig"]);return f!=null&&n(r,["dynamicRetrievalConfig"],ae(d,f)),r}function pe(d,a){const r={},f=i(a,["functionDeclarations"]);if(f!=null&&(Array.isArray(f)?n(r,["functionDeclarations"],f.map(A=>D(d,A))):n(r,["functionDeclarations"],f)),i(a,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");i(a,["googleSearch"])!=null&&n(r,["googleSearch"],$());const x=i(a,["googleSearchRetrieval"]);x!=null&&n(r,["googleSearchRetrieval"],re(d,x));const R=i(a,["codeExecution"]);return R!=null&&n(r,["codeExecution"],R),r}function xe(d,a){const r={},f=i(a,["mode"]);f!=null&&n(r,["mode"],f);const g=i(a,["allowedFunctionNames"]);return g!=null&&n(r,["allowedFunctionNames"],g),r}function de(d,a){const r={},f=i(a,["functionCallingConfig"]);return f!=null&&n(r,["functionCallingConfig"],xe(d,f)),r}function Ee(d,a,r){const f={},g=i(a,["ttl"]);r!==void 0&&g!=null&&n(r,["ttl"],g);const x=i(a,["expireTime"]);r!==void 0&&x!=null&&n(r,["expireTime"],x);const R=i(a,["displayName"]);r!==void 0&&R!=null&&n(r,["displayName"],R);const A=i(a,["contents"]);r!==void 0&&A!=null&&(Array.isArray(A)?n(r,["contents"],w(d,w(d,A).map(me=>B(d,me)))):n(r,["contents"],w(d,A)));const F=i(a,["systemInstruction"]);r!==void 0&&F!=null&&n(r,["systemInstruction"],B(d,y(d,F)));const Z=i(a,["tools"]);r!==void 0&&Z!=null&&(Array.isArray(Z)?n(r,["tools"],Z.map(me=>pe(d,me))):n(r,["tools"],Z));const ee=i(a,["toolConfig"]);return r!==void 0&&ee!=null&&n(r,["toolConfig"],de(d,ee)),f}function ue(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["model"],l(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],Ee(d,g,r)),r}function Ie(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["_url","name"],X(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],g),r}function Ue(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["_url","name"],X(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],g),r}function We(d,a,r){const f={},g=i(a,["ttl"]);r!==void 0&&g!=null&&n(r,["ttl"],g);const x=i(a,["expireTime"]);return r!==void 0&&x!=null&&n(r,["expireTime"],x),f}function tt(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["_url","name"],X(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],We(d,g,r)),r}function ht(d,a,r){const f={},g=i(a,["pageSize"]);r!==void 0&&g!=null&&n(r,["_query","pageSize"],g);const x=i(a,["pageToken"]);return r!==void 0&&x!=null&&n(r,["_query","pageToken"],x),f}function fe(d,a){const r={},f=i(a,["config"]);return f!=null&&n(r,["config"],ht(d,f,r)),r}function we(d,a){const r={},f=i(a,["videoMetadata"]);f!=null&&n(r,["videoMetadata"],f);const g=i(a,["thought"]);g!=null&&n(r,["thought"],g);const x=i(a,["codeExecutionResult"]);x!=null&&n(r,["codeExecutionResult"],x);const R=i(a,["executableCode"]);R!=null&&n(r,["executableCode"],R);const A=i(a,["fileData"]);A!=null&&n(r,["fileData"],A);const F=i(a,["functionCall"]);F!=null&&n(r,["functionCall"],F);const Z=i(a,["functionResponse"]);Z!=null&&n(r,["functionResponse"],Z);const ee=i(a,["inlineData"]);ee!=null&&n(r,["inlineData"],ee);const me=i(a,["text"]);return me!=null&&n(r,["text"],me),r}function Ae(d,a){const r={},f=i(a,["parts"]);f!=null&&(Array.isArray(f)?n(r,["parts"],f.map(x=>we(d,x))):n(r,["parts"],f));const g=i(a,["role"]);return g!=null&&n(r,["role"],g),r}function Pe(d,a){const r={},f=i(a,["example"]);f!=null&&n(r,["example"],f);const g=i(a,["pattern"]);g!=null&&n(r,["pattern"],g);const x=i(a,["default"]);x!=null&&n(r,["default"],x);const R=i(a,["maxLength"]);R!=null&&n(r,["maxLength"],R);const A=i(a,["minLength"]);A!=null&&n(r,["minLength"],A);const F=i(a,["minProperties"]);F!=null&&n(r,["minProperties"],F);const Z=i(a,["maxProperties"]);Z!=null&&n(r,["maxProperties"],Z);const ee=i(a,["anyOf"]);ee!=null&&n(r,["anyOf"],ee);const me=i(a,["description"]);me!=null&&n(r,["description"],me);const De=i(a,["enum"]);De!=null&&n(r,["enum"],De);const Re=i(a,["format"]);Re!=null&&n(r,["format"],Re);const Le=i(a,["items"]);Le!=null&&n(r,["items"],Le);const ot=i(a,["maxItems"]);ot!=null&&n(r,["maxItems"],ot);const ut=i(a,["maximum"]);ut!=null&&n(r,["maximum"],ut);const _t=i(a,["minItems"]);_t!=null&&n(r,["minItems"],_t);const Mt=i(a,["minimum"]);Mt!=null&&n(r,["minimum"],Mt);const Pt=i(a,["nullable"]);Pt!=null&&n(r,["nullable"],Pt);const wt=i(a,["properties"]);wt!=null&&n(r,["properties"],wt);const Kt=i(a,["propertyOrdering"]);Kt!=null&&n(r,["propertyOrdering"],Kt);const hn=i(a,["required"]);hn!=null&&n(r,["required"],hn);const pn=i(a,["title"]);pn!=null&&n(r,["title"],pn);const mn=i(a,["type"]);return mn!=null&&n(r,["type"],mn),r}function qe(d,a){const r={},f=i(a,["response"]);f!=null&&n(r,["response"],Pe(d,f));const g=i(a,["description"]);g!=null&&n(r,["description"],g);const x=i(a,["name"]);x!=null&&n(r,["name"],x);const R=i(a,["parameters"]);return R!=null&&n(r,["parameters"],R),r}function mt(){return{}}function nt(d,a){const r={},f=i(a,["mode"]);f!=null&&n(r,["mode"],f);const g=i(a,["dynamicThreshold"]);return g!=null&&n(r,["dynamicThreshold"],g),r}function Dt(d,a){const r={},f=i(a,["dynamicRetrievalConfig"]);return f!=null&&n(r,["dynamicRetrievalConfig"],nt(d,f)),r}function It(d,a){const r={},f=i(a,["functionDeclarations"]);f!=null&&(Array.isArray(f)?n(r,["functionDeclarations"],f.map(F=>qe(d,F))):n(r,["functionDeclarations"],f));const g=i(a,["retrieval"]);g!=null&&n(r,["retrieval"],g),i(a,["googleSearch"])!=null&&n(r,["googleSearch"],mt());const R=i(a,["googleSearchRetrieval"]);R!=null&&n(r,["googleSearchRetrieval"],Dt(d,R));const A=i(a,["codeExecution"]);return A!=null&&n(r,["codeExecution"],A),r}function ft(d,a){const r={},f=i(a,["mode"]);f!=null&&n(r,["mode"],f);const g=i(a,["allowedFunctionNames"]);return g!=null&&n(r,["allowedFunctionNames"],g),r}function Y(d,a){const r={},f=i(a,["functionCallingConfig"]);return f!=null&&n(r,["functionCallingConfig"],ft(d,f)),r}function jt(d,a,r){const f={},g=i(a,["ttl"]);r!==void 0&&g!=null&&n(r,["ttl"],g);const x=i(a,["expireTime"]);r!==void 0&&x!=null&&n(r,["expireTime"],x);const R=i(a,["displayName"]);r!==void 0&&R!=null&&n(r,["displayName"],R);const A=i(a,["contents"]);r!==void 0&&A!=null&&(Array.isArray(A)?n(r,["contents"],w(d,w(d,A).map(me=>Ae(d,me)))):n(r,["contents"],w(d,A)));const F=i(a,["systemInstruction"]);r!==void 0&&F!=null&&n(r,["systemInstruction"],Ae(d,y(d,F)));const Z=i(a,["tools"]);r!==void 0&&Z!=null&&(Array.isArray(Z)?n(r,["tools"],Z.map(me=>It(d,me))):n(r,["tools"],Z));const ee=i(a,["toolConfig"]);return r!==void 0&&ee!=null&&n(r,["toolConfig"],Y(d,ee)),f}function vt(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["model"],l(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],jt(d,g,r)),r}function gt(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["_url","name"],X(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],g),r}function Je(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["_url","name"],X(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],g),r}function bt(d,a,r){const f={},g=i(a,["ttl"]);r!==void 0&&g!=null&&n(r,["ttl"],g);const x=i(a,["expireTime"]);return r!==void 0&&x!=null&&n(r,["expireTime"],x),f}function Ye(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["_url","name"],X(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],bt(d,g,r)),r}function k(d,a,r){const f={},g=i(a,["pageSize"]);r!==void 0&&g!=null&&n(r,["_query","pageSize"],g);const x=i(a,["pageToken"]);return r!==void 0&&x!=null&&n(r,["_query","pageToken"],x),f}function I(d,a){const r={},f=i(a,["config"]);return f!=null&&n(r,["config"],k(d,f,r)),r}function ne(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["name"],f);const g=i(a,["displayName"]);g!=null&&n(r,["displayName"],g);const x=i(a,["model"]);x!=null&&n(r,["model"],x);const R=i(a,["createTime"]);R!=null&&n(r,["createTime"],R);const A=i(a,["updateTime"]);A!=null&&n(r,["updateTime"],A);const F=i(a,["expireTime"]);F!=null&&n(r,["expireTime"],F);const Z=i(a,["usageMetadata"]);return Z!=null&&n(r,["usageMetadata"],Z),r}function ge(){return{}}function Se(d,a){const r={},f=i(a,["nextPageToken"]);f!=null&&n(r,["nextPageToken"],f);const g=i(a,["cachedContents"]);return g!=null&&(Array.isArray(g)?n(r,["cachedContents"],g.map(x=>ne(d,x))):n(r,["cachedContents"],g)),r}function ce(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["name"],f);const g=i(a,["displayName"]);g!=null&&n(r,["displayName"],g);const x=i(a,["model"]);x!=null&&n(r,["model"],x);const R=i(a,["createTime"]);R!=null&&n(r,["createTime"],R);const A=i(a,["updateTime"]);A!=null&&n(r,["updateTime"],A);const F=i(a,["expireTime"]);F!=null&&n(r,["expireTime"],F);const Z=i(a,["usageMetadata"]);return Z!=null&&n(r,["usageMetadata"],Z),r}function $e(){return{}}function Ne(d,a){const r={},f=i(a,["nextPageToken"]);f!=null&&n(r,["nextPageToken"],f);const g=i(a,["cachedContents"]);return g!=null&&(Array.isArray(g)?n(r,["cachedContents"],g.map(x=>ce(d,x))):n(r,["cachedContents"],g)),r}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */o.PagedItem=void 0,function(d){d.PAGED_ITEM_BATCH_JOBS="batchJobs",d.PAGED_ITEM_MODELS="models",d.PAGED_ITEM_TUNING_JOBS="tuningJobs",d.PAGED_ITEM_FILES="files",d.PAGED_ITEM_CACHED_CONTENTS="cachedContents"}(o.PagedItem||(o.PagedItem={}));class Ke{constructor(a,r,f,g){this.pageInternal=[],this.paramsInternal={},this.requestInternal=r,this.init(a,f,g)}init(a,r,f){var g,x;this.nameInternal=a,this.pageInternal=r[this.nameInternal]||[],this.idxInternal=0;let R={config:{}};f?typeof f=="object"?R=Object.assign({},f):R=f:R={config:{}},R.config&&(R.config.pageToken=r.nextPageToken),this.paramsInternal=R,this.pageInternalSize=(x=(g=R.config)===null||g===void 0?void 0:g.pageSize)!==null&&x!==void 0?x:this.pageInternal.length}initNextPage(a){this.init(this.nameInternal,a,this.paramsInternal)}get page(){return this.pageInternal}get name(){return this.nameInternal}get pageSize(){return this.pageInternalSize}get params(){return this.paramsInternal}get pageLength(){return this.pageInternal.length}getItem(a){return this.pageInternal[a]}[Symbol.asyncIterator](){return{next:async()=>{if(this.idxInternal>=this.pageLength)if(this.hasNextPage())await this.nextPage();else return{value:void 0,done:!0};const a=this.getItem(this.idxInternal);return this.idxInternal+=1,{value:a,done:!1}},return:async()=>({value:void 0,done:!0})}}async nextPage(){if(!this.hasNextPage())throw new Error("No more pages to fetch.");const a=await this.requestInternal(this.params);return this.initNextPage(a),this.page}hasNextPage(){var a;return((a=this.params.config)===null||a===void 0?void 0:a.pageToken)!==void 0}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */o.Outcome=void 0,function(d){d.OUTCOME_UNSPECIFIED="OUTCOME_UNSPECIFIED",d.OUTCOME_OK="OUTCOME_OK",d.OUTCOME_FAILED="OUTCOME_FAILED",d.OUTCOME_DEADLINE_EXCEEDED="OUTCOME_DEADLINE_EXCEEDED"}(o.Outcome||(o.Outcome={})),o.Language=void 0,function(d){d.LANGUAGE_UNSPECIFIED="LANGUAGE_UNSPECIFIED",d.PYTHON="PYTHON"}(o.Language||(o.Language={})),o.Type=void 0,function(d){d.TYPE_UNSPECIFIED="TYPE_UNSPECIFIED",d.STRING="STRING",d.NUMBER="NUMBER",d.INTEGER="INTEGER",d.BOOLEAN="BOOLEAN",d.ARRAY="ARRAY",d.OBJECT="OBJECT"}(o.Type||(o.Type={})),o.HarmCategory=void 0,function(d){d.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",d.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",d.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",d.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",d.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",d.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"}(o.HarmCategory||(o.HarmCategory={})),o.HarmBlockMethod=void 0,function(d){d.HARM_BLOCK_METHOD_UNSPECIFIED="HARM_BLOCK_METHOD_UNSPECIFIED",d.SEVERITY="SEVERITY",d.PROBABILITY="PROBABILITY"}(o.HarmBlockMethod||(o.HarmBlockMethod={})),o.HarmBlockThreshold=void 0,function(d){d.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",d.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",d.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",d.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",d.BLOCK_NONE="BLOCK_NONE",d.OFF="OFF"}(o.HarmBlockThreshold||(o.HarmBlockThreshold={})),o.Mode=void 0,function(d){d.MODE_UNSPECIFIED="MODE_UNSPECIFIED",d.MODE_DYNAMIC="MODE_DYNAMIC"}(o.Mode||(o.Mode={})),o.FinishReason=void 0,function(d){d.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",d.STOP="STOP",d.MAX_TOKENS="MAX_TOKENS",d.SAFETY="SAFETY",d.RECITATION="RECITATION",d.OTHER="OTHER",d.BLOCKLIST="BLOCKLIST",d.PROHIBITED_CONTENT="PROHIBITED_CONTENT",d.SPII="SPII",d.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",d.IMAGE_SAFETY="IMAGE_SAFETY"}(o.FinishReason||(o.FinishReason={})),o.HarmProbability=void 0,function(d){d.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",d.NEGLIGIBLE="NEGLIGIBLE",d.LOW="LOW",d.MEDIUM="MEDIUM",d.HIGH="HIGH"}(o.HarmProbability||(o.HarmProbability={})),o.HarmSeverity=void 0,function(d){d.HARM_SEVERITY_UNSPECIFIED="HARM_SEVERITY_UNSPECIFIED",d.HARM_SEVERITY_NEGLIGIBLE="HARM_SEVERITY_NEGLIGIBLE",d.HARM_SEVERITY_LOW="HARM_SEVERITY_LOW",d.HARM_SEVERITY_MEDIUM="HARM_SEVERITY_MEDIUM",d.HARM_SEVERITY_HIGH="HARM_SEVERITY_HIGH"}(o.HarmSeverity||(o.HarmSeverity={})),o.BlockedReason=void 0,function(d){d.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",d.SAFETY="SAFETY",d.OTHER="OTHER",d.BLOCKLIST="BLOCKLIST",d.PROHIBITED_CONTENT="PROHIBITED_CONTENT"}(o.BlockedReason||(o.BlockedReason={})),o.TrafficType=void 0,function(d){d.TRAFFIC_TYPE_UNSPECIFIED="TRAFFIC_TYPE_UNSPECIFIED",d.ON_DEMAND="ON_DEMAND",d.PROVISIONED_THROUGHPUT="PROVISIONED_THROUGHPUT"}(o.TrafficType||(o.TrafficType={})),o.Modality=void 0,function(d){d.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",d.TEXT="TEXT",d.IMAGE="IMAGE",d.AUDIO="AUDIO"}(o.Modality||(o.Modality={})),o.MediaResolution=void 0,function(d){d.MEDIA_RESOLUTION_UNSPECIFIED="MEDIA_RESOLUTION_UNSPECIFIED",d.MEDIA_RESOLUTION_LOW="MEDIA_RESOLUTION_LOW",d.MEDIA_RESOLUTION_MEDIUM="MEDIA_RESOLUTION_MEDIUM",d.MEDIA_RESOLUTION_HIGH="MEDIA_RESOLUTION_HIGH"}(o.MediaResolution||(o.MediaResolution={})),o.FeatureSelectionPreference=void 0,function(d){d.FEATURE_SELECTION_PREFERENCE_UNSPECIFIED="FEATURE_SELECTION_PREFERENCE_UNSPECIFIED",d.PRIORITIZE_QUALITY="PRIORITIZE_QUALITY",d.BALANCED="BALANCED",d.PRIORITIZE_COST="PRIORITIZE_COST"}(o.FeatureSelectionPreference||(o.FeatureSelectionPreference={})),o.DynamicRetrievalConfigMode=void 0,function(d){d.MODE_UNSPECIFIED="MODE_UNSPECIFIED",d.MODE_DYNAMIC="MODE_DYNAMIC"}(o.DynamicRetrievalConfigMode||(o.DynamicRetrievalConfigMode={})),o.FunctionCallingConfigMode=void 0,function(d){d.MODE_UNSPECIFIED="MODE_UNSPECIFIED",d.AUTO="AUTO",d.ANY="ANY",d.NONE="NONE"}(o.FunctionCallingConfigMode||(o.FunctionCallingConfigMode={})),o.SafetyFilterLevel=void 0,function(d){d.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",d.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",d.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",d.BLOCK_NONE="BLOCK_NONE"}(o.SafetyFilterLevel||(o.SafetyFilterLevel={})),o.PersonGeneration=void 0,function(d){d.DONT_ALLOW="DONT_ALLOW",d.ALLOW_ADULT="ALLOW_ADULT",d.ALLOW_ALL="ALLOW_ALL"}(o.PersonGeneration||(o.PersonGeneration={})),o.ImagePromptLanguage=void 0,function(d){d.auto="auto",d.en="en",d.ja="ja",d.ko="ko",d.hi="hi"}(o.ImagePromptLanguage||(o.ImagePromptLanguage={})),o.FileState=void 0,function(d){d.STATE_UNSPECIFIED="STATE_UNSPECIFIED",d.PROCESSING="PROCESSING",d.ACTIVE="ACTIVE",d.FAILED="FAILED"}(o.FileState||(o.FileState={})),o.FileSource=void 0,function(d){d.SOURCE_UNSPECIFIED="SOURCE_UNSPECIFIED",d.UPLOADED="UPLOADED",d.GENERATED="GENERATED"}(o.FileSource||(o.FileSource={})),o.MaskReferenceMode=void 0,function(d){d.MASK_MODE_DEFAULT="MASK_MODE_DEFAULT",d.MASK_MODE_USER_PROVIDED="MASK_MODE_USER_PROVIDED",d.MASK_MODE_BACKGROUND="MASK_MODE_BACKGROUND",d.MASK_MODE_FOREGROUND="MASK_MODE_FOREGROUND",d.MASK_MODE_SEMANTIC="MASK_MODE_SEMANTIC"}(o.MaskReferenceMode||(o.MaskReferenceMode={})),o.ControlReferenceType=void 0,function(d){d.CONTROL_TYPE_DEFAULT="CONTROL_TYPE_DEFAULT",d.CONTROL_TYPE_CANNY="CONTROL_TYPE_CANNY",d.CONTROL_TYPE_SCRIBBLE="CONTROL_TYPE_SCRIBBLE",d.CONTROL_TYPE_FACE_MESH="CONTROL_TYPE_FACE_MESH"}(o.ControlReferenceType||(o.ControlReferenceType={})),o.SubjectReferenceType=void 0,function(d){d.SUBJECT_TYPE_DEFAULT="SUBJECT_TYPE_DEFAULT",d.SUBJECT_TYPE_PERSON="SUBJECT_TYPE_PERSON",d.SUBJECT_TYPE_ANIMAL="SUBJECT_TYPE_ANIMAL",d.SUBJECT_TYPE_PRODUCT="SUBJECT_TYPE_PRODUCT"}(o.SubjectReferenceType||(o.SubjectReferenceType={})),o.MediaModality=void 0,function(d){d.MODALITY_UNSPECIFIED="MODALITY_UNSPECIFIED",d.TEXT="TEXT",d.IMAGE="IMAGE",d.VIDEO="VIDEO",d.AUDIO="AUDIO",d.DOCUMENT="DOCUMENT"}(o.MediaModality||(o.MediaModality={})),o.StartSensitivity=void 0,function(d){d.START_SENSITIVITY_UNSPECIFIED="START_SENSITIVITY_UNSPECIFIED",d.START_SENSITIVITY_HIGH="START_SENSITIVITY_HIGH",d.START_SENSITIVITY_LOW="START_SENSITIVITY_LOW"}(o.StartSensitivity||(o.StartSensitivity={})),o.EndSensitivity=void 0,function(d){d.END_SENSITIVITY_UNSPECIFIED="END_SENSITIVITY_UNSPECIFIED",d.END_SENSITIVITY_HIGH="END_SENSITIVITY_HIGH",d.END_SENSITIVITY_LOW="END_SENSITIVITY_LOW"}(o.EndSensitivity||(o.EndSensitivity={})),o.ActivityHandling=void 0,function(d){d.ACTIVITY_HANDLING_UNSPECIFIED="ACTIVITY_HANDLING_UNSPECIFIED",d.START_OF_ACTIVITY_INTERRUPTS="START_OF_ACTIVITY_INTERRUPTS",d.NO_INTERRUPTION="NO_INTERRUPTION"}(o.ActivityHandling||(o.ActivityHandling={})),o.TurnCoverage=void 0,function(d){d.TURN_COVERAGE_UNSPECIFIED="TURN_COVERAGE_UNSPECIFIED",d.TURN_INCLUDES_ONLY_ACTIVITY="TURN_INCLUDES_ONLY_ACTIVITY",d.TURN_INCLUDES_ALL_INPUT="TURN_INCLUDES_ALL_INPUT"}(o.TurnCoverage||(o.TurnCoverage={}));class it{}function Me(d,a){return{fileData:{fileUri:d,mimeType:a}}}function Ve(d){return{text:d}}function ze(d,a){return{functionCall:{name:d,args:a}}}function Xe(d,a,r){return{functionResponse:{id:d,name:a,response:r}}}function Oe(d,a){return{inlineData:{data:d,mimeType:a}}}function at(d,a){return{codeExecutionResult:{outcome:d,output:a}}}function Qe(d,a){return{executableCode:{code:d,language:a}}}function st(d){return typeof d=="object"&&d!==null?"fileData"in d||"text"in d||"functionCall"in d||"functionResponse"in d||"inlineData"in d||"videoMetadata"in d||"codeExecutionResult"in d||"executableCode"in d:!1}function Q(d){const a=[];if(typeof d=="string")a.push(Ve(d));else if(st(d))a.push(d);else if(Array.isArray(d)){if(d.length===0)throw new Error("partOrString cannot be an empty array");for(const r of d)if(typeof r=="string")a.push(Ve(r));else if(st(r))a.push(r);else throw new Error("element in PartUnion must be a Part object or string")}else throw new Error("partOrString must be a Part object, string, or array");return a}function oe(d){return{role:"user",parts:Q(d)}}function le(d){return{role:"model",parts:Q(d)}}class ve{}class Be{}class be{get text(){var a,r,f,g,x,R,A,F;if(((g=(f=(r=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||r===void 0?void 0:r.content)===null||f===void 0?void 0:f.parts)===null||g===void 0?void 0:g.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning text from the first one.");let Z="",ee=!1;const me=[];for(const De of(F=(A=(R=(x=this.candidates)===null||x===void 0?void 0:x[0])===null||R===void 0?void 0:R.content)===null||A===void 0?void 0:A.parts)!==null&&F!==void 0?F:[]){for(const[Re,Le]of Object.entries(De))Re!=="text"&&Re!=="thought"&&(Le!==null||Le!==void 0)&&me.push(Re);if(typeof De.text=="string"){if(typeof De.thought=="boolean"&&De.thought)continue;ee=!0,Z+=De.text}}return me.length>0&&console.warn(`there are non-text parts ${me} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`),ee?Z:void 0}get functionCalls(){var a,r,f,g,x,R,A,F;if(((g=(f=(r=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||r===void 0?void 0:r.content)===null||f===void 0?void 0:f.parts)===null||g===void 0?void 0:g.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning function calls from the first one.");const Z=(F=(A=(R=(x=this.candidates)===null||x===void 0?void 0:x[0])===null||R===void 0?void 0:R.content)===null||A===void 0?void 0:A.parts)===null||F===void 0?void 0:F.filter(ee=>ee.functionCall).map(ee=>ee.functionCall).filter(ee=>ee!==void 0);if(Z?.length!==0)return Z}get executableCode(){var a,r,f,g,x,R,A,F,Z;if(((g=(f=(r=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||r===void 0?void 0:r.content)===null||f===void 0?void 0:f.parts)===null||g===void 0?void 0:g.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning executable code from the first one.");const ee=(F=(A=(R=(x=this.candidates)===null||x===void 0?void 0:x[0])===null||R===void 0?void 0:R.content)===null||A===void 0?void 0:A.parts)===null||F===void 0?void 0:F.filter(me=>me.executableCode).map(me=>me.executableCode).filter(me=>me!==void 0);if(ee?.length!==0)return(Z=ee?.[0])===null||Z===void 0?void 0:Z.code}get codeExecutionResult(){var a,r,f,g,x,R,A,F,Z;if(((g=(f=(r=(a=this.candidates)===null||a===void 0?void 0:a[0])===null||r===void 0?void 0:r.content)===null||f===void 0?void 0:f.parts)===null||g===void 0?void 0:g.length)===0)return;this.candidates&&this.candidates.length>1&&console.warn("there are multiple candidates in the response, returning code execution result from the first one.");const ee=(F=(A=(R=(x=this.candidates)===null||x===void 0?void 0:x[0])===null||R===void 0?void 0:R.content)===null||A===void 0?void 0:A.parts)===null||F===void 0?void 0:F.filter(me=>me.codeExecutionResult).map(me=>me.codeExecutionResult).filter(me=>me!==void 0);if(ee?.length!==0)return(Z=ee?.[0])===null||Z===void 0?void 0:Z.output}}class rt{}class Ut{}class Ot{}class Tt{}class rn{}class sn{}class ci{}class Di{}class dn{constructor(a){const r={};for(const f of a.headers.entries())r[f[0]]=f[1];this.headers=r,this.responseInternal=a}json(){return this.responseInternal.json()}}class fi{}class di{}class Yi{}class hi{}class Ki{constructor(){this.functionResponses=[]}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class $n extends e{constructor(a){super(),this.apiClient=a,this.list=async(r={})=>new Ke(o.PagedItem.PAGED_ITEM_CACHED_CONTENTS,f=>this.listInternal(f),await this.listInternal(r),r)}async create(a){var r,f;let g,x="",R={};if(this.apiClient.isVertexAI()){const A=vt(this.apiClient,a);return x=t("cachedContents",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"POST",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(F=>F.json()),g.then(F=>ce(this.apiClient,F))}else{const A=ue(this.apiClient,a);return x=t("cachedContents",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"POST",httpOptions:(f=a.config)===null||f===void 0?void 0:f.httpOptions}).then(F=>F.json()),g.then(F=>ne(this.apiClient,F))}}async get(a){var r,f;let g,x="",R={};if(this.apiClient.isVertexAI()){const A=gt(this.apiClient,a);return x=t("{name}",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"GET",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(F=>F.json()),g.then(F=>ce(this.apiClient,F))}else{const A=Ie(this.apiClient,a);return x=t("{name}",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"GET",httpOptions:(f=a.config)===null||f===void 0?void 0:f.httpOptions}).then(F=>F.json()),g.then(F=>ne(this.apiClient,F))}}async delete(a){var r,f;let g,x="",R={};if(this.apiClient.isVertexAI()){const A=Je(this.apiClient,a);return x=t("{name}",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"DELETE",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(F=>F.json()),g.then(()=>{const F=$e(),Z=new sn;return Object.assign(Z,F),Z})}else{const A=Ue(this.apiClient,a);return x=t("{name}",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"DELETE",httpOptions:(f=a.config)===null||f===void 0?void 0:f.httpOptions}).then(F=>F.json()),g.then(()=>{const F=ge(),Z=new sn;return Object.assign(Z,F),Z})}}async update(a){var r,f;let g,x="",R={};if(this.apiClient.isVertexAI()){const A=Ye(this.apiClient,a);return x=t("{name}",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"PATCH",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(F=>F.json()),g.then(F=>ce(this.apiClient,F))}else{const A=tt(this.apiClient,a);return x=t("{name}",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"PATCH",httpOptions:(f=a.config)===null||f===void 0?void 0:f.httpOptions}).then(F=>F.json()),g.then(F=>ne(this.apiClient,F))}}async listInternal(a){var r,f;let g,x="",R={};if(this.apiClient.isVertexAI()){const A=I(this.apiClient,a);return x=t("cachedContents",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"GET",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(F=>F.json()),g.then(F=>{const Z=Ne(this.apiClient,F),ee=new ci;return Object.assign(ee,Z),ee})}else{const A=fe(this.apiClient,a);return x=t("cachedContents",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"GET",httpOptions:(f=a.config)===null||f===void 0?void 0:f.httpOptions}).then(F=>F.json()),g.then(F=>{const Z=Se(this.apiClient,F),ee=new ci;return Object.assign(ee,Z),ee})}}}function pi(d){var a=typeof Symbol=="function"&&Symbol.iterator,r=a&&d[a],f=0;if(r)return r.call(d);if(d&&typeof d.length=="number")return{next:function(){return d&&f>=d.length&&(d=void 0),{value:d&&d[f++],done:!d}}};throw new TypeError(a?"Object is not iterable.":"Symbol.iterator is not defined.")}function kt(d){return this instanceof kt?(this.v=d,this):new kt(d)}function mi(d,a,r){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var f=r.apply(d,a||[]),g,x=[];return g=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),A("next"),A("throw"),A("return",R),g[Symbol.asyncIterator]=function(){return this},g;function R(Re){return function(Le){return Promise.resolve(Le).then(Re,me)}}function A(Re,Le){f[Re]&&(g[Re]=function(ot){return new Promise(function(ut,_t){x.push([Re,ot,ut,_t])>1||F(Re,ot)})},Le&&(g[Re]=Le(g[Re])))}function F(Re,Le){try{Z(f[Re](Le))}catch(ot){De(x[0][3],ot)}}function Z(Re){Re.value instanceof kt?Promise.resolve(Re.value.v).then(ee,me):De(x[0][2],Re)}function ee(Re){F("next",Re)}function me(Re){F("throw",Re)}function De(Re,Le){Re(Le),x.shift(),x.length&&F(x[0][0],x[0][1])}}function vn(d){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var a=d[Symbol.asyncIterator],r;return a?a.call(d):(d=typeof pi=="function"?pi(d):d[Symbol.iterator](),r={},f("next"),f("throw"),f("return"),r[Symbol.asyncIterator]=function(){return this},r);function f(x){r[x]=d[x]&&function(R){return new Promise(function(A,F){R=d[x](R),g(A,F,R.done,R.value)})}}function g(x,R,A,F){Promise.resolve(F).then(function(Z){x({value:Z,done:A})},R)}}typeof SuppressedError=="function"&&SuppressedError;/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function zn(d){var a;if(d.candidates==null||d.candidates.length===0)return!1;const r=(a=d.candidates[0])===null||a===void 0?void 0:a.content;return r===void 0?!1:S(r)}function S(d){if(d.parts===void 0||d.parts.length===0)return!1;for(const a of d.parts)if(a===void 0||Object.keys(a).length===0||a.text!==void 0&&a.text==="")return!1;return!0}function U(d){if(d.length!==0){if(d[0].role!=="user")throw new Error("History must start with a user turn.");for(const a of d)if(a.role!=="user"&&a.role!=="model")throw new Error(`Role must be user or model, but got ${a.role}.`)}}function H(d){if(d===void 0||d.length===0)return[];const a=[],r=d.length;let f=0,g=d[0];for(;f<r;)if(d[f].role==="user")g=d[f],f++;else{const x=[];let R=!0;for(;f<r&&d[f].role==="model";)x.push(d[f]),R&&!S(d[f])&&(R=!1),f++;R&&(a.push(g),a.push(...x))}return a}class M{constructor(a,r){this.modelsModule=a,this.apiClient=r}create(a){return new L(this.apiClient,this.modelsModule,a.model,a.config,a.history)}}class L{constructor(a,r,f,g={},x=[]){this.apiClient=a,this.modelsModule=r,this.model=f,this.config=g,this.history=x,this.sendPromise=Promise.resolve(),U(x)}async sendMessage(a){var r;await this.sendPromise;const f=y(this.apiClient,a.message),g=this.modelsModule.generateContent({model:this.model,contents:this.getHistory(!0).concat(f),config:(r=a.config)!==null&&r!==void 0?r:this.config});return this.sendPromise=(async()=>{var x,R;const F=(R=(x=(await g).candidates)===null||x===void 0?void 0:x[0])===null||R===void 0?void 0:R.content,Z=F?[F]:[];this.recordHistory(f,Z)})(),await this.sendPromise,g}async sendMessageStream(a){var r;await this.sendPromise;const f=y(this.apiClient,a.message),g=this.modelsModule.generateContentStream({model:this.model,contents:this.getHistory(!0).concat(f),config:(r=a.config)!==null&&r!==void 0?r:this.config});this.sendPromise=g.then(()=>{});const x=await g;return this.processStreamResponse(x,f)}getHistory(a=!1){return a?H(this.history):this.history}processStreamResponse(a,r){var f,g;return mi(this,arguments,function*(){var R,A,F,Z;const ee=[];try{for(var me=!0,De=vn(a),Re;Re=yield kt(De.next()),R=Re.done,!R;me=!0){Z=Re.value,me=!1;const Le=Z;if(zn(Le)){const ot=(g=(f=Le.candidates)===null||f===void 0?void 0:f[0])===null||g===void 0?void 0:g.content;ot!==void 0&&ee.push(ot)}yield yield kt(Le)}}catch(Le){A={error:Le}}finally{try{!me&&!R&&(F=De.return)&&(yield kt(F.call(De)))}finally{if(A)throw A.error}}this.recordHistory(r,ee)})}recordHistory(a,r){let f=[];r.length>0&&r.every(g=>g.role==="model")?f=r:f.push({role:"model",parts:[]}),this.history.push(a),this.history.push(...f)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const V="Content-Type",z="X-Server-Timeout",G="User-Agent",J="x-goog-api-client",te="google-genai-sdk/0.9.0",se="v1beta1",_e="v1beta",he=/^data: (.*)(?:\n\n|\r\r|\r\n\r\n)/;class ye extends Error{constructor(a,r){r?super(a,{cause:r}):super(a,{cause:new Error().stack}),this.message=a,this.name="ClientError"}}class Te extends Error{constructor(a,r){r?super(a,{cause:r}):super(a,{cause:new Error().stack}),this.message=a,this.name="ServerError"}}class Ce{constructor(a){var r,f;this.clientOptions=Object.assign(Object.assign({},a),{project:a.project,location:a.location,apiKey:a.apiKey,vertexai:a.vertexai});const g={};this.clientOptions.vertexai?(g.apiVersion=(r=this.clientOptions.apiVersion)!==null&&r!==void 0?r:se,this.getProject()||this.getLocation()?(g.baseUrl=`https://${this.clientOptions.location}-aiplatform.googleapis.com/`,this.clientOptions.apiKey=void 0):(g.baseUrl="https://aiplatform.googleapis.com/",this.clientOptions.project=void 0,this.clientOptions.location=void 0)):(g.apiVersion=(f=this.clientOptions.apiVersion)!==null&&f!==void 0?f:_e,g.baseUrl="https://generativelanguage.googleapis.com/"),g.headers=this.getDefaultHeaders(),this.clientOptions.httpOptions=g,a.httpOptions&&(this.clientOptions.httpOptions=this.patchHttpOptions(g,a.httpOptions))}isVertexAI(){var a;return(a=this.clientOptions.vertexai)!==null&&a!==void 0?a:!1}getProject(){return this.clientOptions.project}getLocation(){return this.clientOptions.location}getApiVersion(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.apiVersion!==void 0)return this.clientOptions.httpOptions.apiVersion;throw new Error("API version is not set.")}getBaseUrl(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.baseUrl!==void 0)return this.clientOptions.httpOptions.baseUrl;throw new Error("Base URL is not set.")}getRequestUrl(){return this.getRequestUrlInternal(this.clientOptions.httpOptions)}getHeaders(){if(this.clientOptions.httpOptions&&this.clientOptions.httpOptions.headers!==void 0)return this.clientOptions.httpOptions.headers;throw new Error("Headers are not set.")}getRequestUrlInternal(a){if(!a||a.baseUrl===void 0||a.apiVersion===void 0)throw new Error("HTTP options are not correctly set.");const f=[a.baseUrl.endsWith("/")?a.baseUrl.slice(0,-1):a.baseUrl];return a.apiVersion&&a.apiVersion!==""&&f.push(a.apiVersion),f.join("/")}getBaseResourcePath(){return`projects/${this.clientOptions.project}/locations/${this.clientOptions.location}`}getApiKey(){return this.clientOptions.apiKey}getWebsocketBaseUrl(){const a=this.getBaseUrl(),r=new URL(a);return r.protocol="wss",r.toString()}setBaseUrl(a){if(this.clientOptions.httpOptions)this.clientOptions.httpOptions.baseUrl=a;else throw new Error("HTTP options are not correctly set.")}constructUrl(a,r,f){const g=[this.getRequestUrlInternal(r)];return f&&g.push(this.getBaseResourcePath()),a!==""&&g.push(a),new URL(`${g.join("/")}`)}shouldPrependVertexProjectPath(a){return!(this.clientOptions.apiKey||!this.clientOptions.vertexai||a.path.startsWith("projects/")||a.httpMethod==="GET"&&a.path.startsWith("publishers/google/models"))}async request(a){let r=this.clientOptions.httpOptions;a.httpOptions&&(r=this.patchHttpOptions(this.clientOptions.httpOptions,a.httpOptions));const f=this.shouldPrependVertexProjectPath(a),g=this.constructUrl(a.path,r,f);if(a.queryParams)for(const[R,A]of Object.entries(a.queryParams))g.searchParams.append(R,String(A));let x={};if(a.httpMethod==="GET"){if(a.body&&a.body!=="{}")throw new Error("Request body should be empty for GET request, but got non empty request body")}else x.body=a.body;return x=await this.includeExtraHttpOptionsToRequestInit(x,r),this.unaryApiCall(g,x,a.httpMethod)}patchHttpOptions(a,r){const f=JSON.parse(JSON.stringify(a));for(const[g,x]of Object.entries(r))typeof x=="object"?f[g]=Object.assign(Object.assign({},f[g]),x):x!==void 0&&(f[g]=x);return f}async requestStream(a){let r=this.clientOptions.httpOptions;a.httpOptions&&(r=this.patchHttpOptions(this.clientOptions.httpOptions,a.httpOptions));const f=this.shouldPrependVertexProjectPath(a),g=this.constructUrl(a.path,r,f);(!g.searchParams.has("alt")||g.searchParams.get("alt")!=="sse")&&g.searchParams.set("alt","sse");let x={};return x.body=a.body,x=await this.includeExtraHttpOptionsToRequestInit(x,r),this.streamApiCall(g,x,a.httpMethod)}async includeExtraHttpOptionsToRequestInit(a,r){if(r&&r.timeout&&r.timeout>0){const f=new AbortController,g=f.signal;setTimeout(()=>f.abort(),r.timeout),a.signal=g}return a.headers=await this.getHeadersInternal(r),a}async unaryApiCall(a,r,f){return this.apiCall(a.toString(),Object.assign(Object.assign({},r),{method:f})).then(async g=>(await ke(g),new dn(g))).catch(g=>{throw g instanceof Error?g:new Error(JSON.stringify(g))})}async streamApiCall(a,r,f){return this.apiCall(a.toString(),Object.assign(Object.assign({},r),{method:f})).then(async g=>(await ke(g),this.processStreamResponse(g))).catch(g=>{throw g instanceof Error?g:new Error(JSON.stringify(g))})}processStreamResponse(a){var r;return mi(this,arguments,function*(){const g=(r=a?.body)===null||r===void 0?void 0:r.getReader(),x=new TextDecoder("utf-8");if(!g)throw new Error("Response body is empty");try{let R="";for(;;){const{done:A,value:F}=yield kt(g.read());if(A){if(R.trim().length>0)throw new Error("Incomplete JSON segment at the end");break}const Z=x.decode(F);R+=Z;let ee=R.match(he);for(;ee;){const me=ee[1];try{const De=new Response(me,{headers:a?.headers,status:a?.status,statusText:a?.statusText});yield yield kt(new dn(De)),R=R.slice(ee[0].length),ee=R.match(he)}catch(De){throw new Error(`exception parsing stream chunk ${me}. ${De}`)}}}}finally{g.releaseLock()}})}async apiCall(a,r){return fetch(a,r).catch(f=>{throw new Error(`exception ${f} sending request`)})}getDefaultHeaders(){const a={},r=te+" "+this.clientOptions.userAgentExtra;return a[G]=r,a[J]=r,a[V]="application/json",a}async getHeadersInternal(a){const r=new Headers;if(a&&a.headers){for(const[f,g]of Object.entries(a.headers))r.append(f,g);a.timeout&&a.timeout>0&&r.append(z,String(Math.ceil(a.timeout/1e3)))}return await this.clientOptions.auth.addAuthHeaders(r),r}async uploadFile(a,r){var f;const g={};r!=null&&(g.mimeType=r.mimeType,g.name=r.name,g.displayName=r.displayName),g.name&&!g.name.startsWith("files/")&&(g.name=`files/${g.name}`);const x=this.clientOptions.uploader,R=await x.stat(a);g.sizeBytes=String(R.size);const A=(f=r?.mimeType)!==null&&f!==void 0?f:R.type;if(A===void 0||A==="")throw new Error("Can not determine mimeType. Please provide mimeType in the config.");g.mimeType=A;const F=await this.fetchUploadUrl(g,r);return x.upload(a,F,this)}async fetchUploadUrl(a,r){var f;let g={};r?.httpOptions?g=r.httpOptions:g={apiVersion:"",headers:{"Content-Type":"application/json","X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":`${a.sizeBytes}`,"X-Goog-Upload-Header-Content-Type":`${a.mimeType}`}};const x={file:a},R=await this.request({path:t("upload/v1beta/files",x._url),body:JSON.stringify(x),httpMethod:"POST",httpOptions:g});if(!R||!R?.headers)throw new Error("Server did not return an HttpResponse or the returned HttpResponse did not have headers.");const A=(f=R?.headers)===null||f===void 0?void 0:f["x-goog-upload-url"];if(A===void 0)throw new Error("Failed to get upload url. Server did not return the x-google-upload-url in the headers");return A}}async function ke(d){var a;if(d===void 0)throw new Te("response is undefined");if(!d.ok){const r=d.status,f=d.statusText;let g;!((a=d.headers.get("content-type"))===null||a===void 0)&&a.includes("application/json")?g=await d.json():g={error:{message:"exception parsing response",code:d.status,status:d.statusText}};const x=`got status: ${r} ${f}. ${JSON.stringify(g)}`;throw r>=400&&r<500?new ye(x):r>=500&&r<600?new Te(x):new Error(x)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function je(){return new Error(`This feature requires the web or Node specific @google/genai implementation, you can fix this by either:

*Enabling conditional exports for your project [recommended]*

*Using a platform specific import* - Make sure your code imports either '@google/genai/web' or '@google/genai/node' instead of '@google/genai'.
`)}const Ze=1024*1024*8;class Ge{async upload(a,r,f){if(typeof a=="string")throw je();return lt(a,r,f)}async stat(a){if(typeof a=="string")throw je();return He(a)}}async function lt(d,a,r){var f,g;let x=0,R=0,A=new dn(new Response),F="upload";for(x=d.size;R<x;){const ee=Math.min(Ze,x-R),me=d.slice(R,R+ee);if(R+ee>=x&&(F+=", finalize"),A=await r.request({path:"",body:me,httpMethod:"POST",httpOptions:{apiVersion:"",baseUrl:a,headers:{"X-Goog-Upload-Command":F,"X-Goog-Upload-Offset":String(R),"Content-Length":String(ee)}}}),R+=ee,((f=A?.headers)===null||f===void 0?void 0:f["x-goog-upload-status"])!=="active")break;if(x<=R)throw new Error("All content has been uploaded, but the upload status is not finalized.")}const Z=await A?.json();if(((g=A?.headers)===null||g===void 0?void 0:g["x-goog-upload-status"])!=="final")throw new Error("Failed to upload file: Upload status is not finalized.");return Z.file}async function He(d){return{size:d.size,type:d.type}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ct{create(a,r,f){throw je()}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Ht(d,a,r){const f={},g=i(a,["pageSize"]);r!==void 0&&g!=null&&n(r,["_query","pageSize"],g);const x=i(a,["pageToken"]);return r!==void 0&&x!=null&&n(r,["_query","pageToken"],x),f}function St(d,a){const r={},f=i(a,["config"]);return f!=null&&n(r,["config"],Ht(d,f,r)),r}function yt(d,a){const r={},f=i(a,["details"]);f!=null&&n(r,["details"],f);const g=i(a,["message"]);g!=null&&n(r,["message"],g);const x=i(a,["code"]);return x!=null&&n(r,["code"],x),r}function et(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["name"],f);const g=i(a,["displayName"]);g!=null&&n(r,["displayName"],g);const x=i(a,["mimeType"]);x!=null&&n(r,["mimeType"],x);const R=i(a,["sizeBytes"]);R!=null&&n(r,["sizeBytes"],R);const A=i(a,["createTime"]);A!=null&&n(r,["createTime"],A);const F=i(a,["expirationTime"]);F!=null&&n(r,["expirationTime"],F);const Z=i(a,["updateTime"]);Z!=null&&n(r,["updateTime"],Z);const ee=i(a,["sha256Hash"]);ee!=null&&n(r,["sha256Hash"],ee);const me=i(a,["uri"]);me!=null&&n(r,["uri"],me);const De=i(a,["downloadUri"]);De!=null&&n(r,["downloadUri"],De);const Re=i(a,["state"]);Re!=null&&n(r,["state"],Re);const Le=i(a,["source"]);Le!=null&&n(r,["source"],Le);const ot=i(a,["videoMetadata"]);ot!=null&&n(r,["videoMetadata"],ot);const ut=i(a,["error"]);return ut!=null&&n(r,["error"],yt(d,ut)),r}function Bt(d,a){const r={},f=i(a,["file"]);f!=null&&n(r,["file"],et(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],g),r}function Wt(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["_url","file"],W(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],g),r}function Nt(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["_url","file"],W(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],g),r}function zt(d,a){const r={},f=i(a,["details"]);f!=null&&n(r,["details"],f);const g=i(a,["message"]);g!=null&&n(r,["message"],g);const x=i(a,["code"]);return x!=null&&n(r,["code"],x),r}function bi(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["name"],f);const g=i(a,["displayName"]);g!=null&&n(r,["displayName"],g);const x=i(a,["mimeType"]);x!=null&&n(r,["mimeType"],x);const R=i(a,["sizeBytes"]);R!=null&&n(r,["sizeBytes"],R);const A=i(a,["createTime"]);A!=null&&n(r,["createTime"],A);const F=i(a,["expirationTime"]);F!=null&&n(r,["expirationTime"],F);const Z=i(a,["updateTime"]);Z!=null&&n(r,["updateTime"],Z);const ee=i(a,["sha256Hash"]);ee!=null&&n(r,["sha256Hash"],ee);const me=i(a,["uri"]);me!=null&&n(r,["uri"],me);const De=i(a,["downloadUri"]);De!=null&&n(r,["downloadUri"],De);const Re=i(a,["state"]);Re!=null&&n(r,["state"],Re);const Le=i(a,["source"]);Le!=null&&n(r,["source"],Le);const ot=i(a,["videoMetadata"]);ot!=null&&n(r,["videoMetadata"],ot);const ut=i(a,["error"]);return ut!=null&&n(r,["error"],zt(d,ut)),r}function Xn(d,a){const r={},f=i(a,["nextPageToken"]);f!=null&&n(r,["nextPageToken"],f);const g=i(a,["files"]);return g!=null&&(Array.isArray(g)?n(r,["files"],g.map(x=>bi(d,x))):n(r,["files"],g)),r}function Of(){return{}}function kf(){return{}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ul extends e{constructor(a){super(),this.apiClient=a,this.list=async(r={})=>new Ke(o.PagedItem.PAGED_ITEM_FILES,f=>this.listInternal(f),await this.listInternal(r),r)}async upload(a){if(this.apiClient.isVertexAI())throw new Error("Vertex AI does not support uploading files. You can share files through a GCS bucket.");return this.apiClient.uploadFile(a.file,a.config).then(r=>bi(this.apiClient,r))}async listInternal(a){var r;let f,g="",x={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const R=St(this.apiClient,a);return g=t("files",R._url),x=R._query,delete R.config,delete R._url,delete R._query,f=this.apiClient.request({path:g,queryParams:x,body:JSON.stringify(R),httpMethod:"GET",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(A=>A.json()),f.then(A=>{const F=Xn(this.apiClient,A),Z=new Di;return Object.assign(Z,F),Z})}}async createInternal(a){var r;let f,g="",x={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const R=Bt(this.apiClient,a);return g=t("upload/v1beta/files",R._url),x=R._query,delete R.config,delete R._url,delete R._query,f=this.apiClient.request({path:g,queryParams:x,body:JSON.stringify(R),httpMethod:"POST",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(A=>A.json()),f.then(()=>{const A=Of(),F=new fi;return Object.assign(F,A),F})}}async get(a){var r;let f,g="",x={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const R=Wt(this.apiClient,a);return g=t("files/{file}",R._url),x=R._query,delete R.config,delete R._url,delete R._query,f=this.apiClient.request({path:g,queryParams:x,body:JSON.stringify(R),httpMethod:"GET",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(A=>A.json()),f.then(A=>bi(this.apiClient,A))}}async delete(a){var r;let f,g="",x={};if(this.apiClient.isVertexAI())throw new Error("This method is only supported by the Gemini Developer API.");{const R=Nt(this.apiClient,a);return g=t("files/{file}",R._url),x=R._query,delete R.config,delete R._url,delete R._query,f=this.apiClient.request({path:g,queryParams:x,body:JSON.stringify(R),httpMethod:"DELETE",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(A=>A.json()),f.then(()=>{const A=kf(),F=new di;return Object.assign(F,A),F})}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Gf(d,a){const r={};if(i(a,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const f=i(a,["thought"]);f!=null&&n(r,["thought"],f);const g=i(a,["codeExecutionResult"]);g!=null&&n(r,["codeExecutionResult"],g);const x=i(a,["executableCode"]);x!=null&&n(r,["executableCode"],x);const R=i(a,["fileData"]);R!=null&&n(r,["fileData"],R);const A=i(a,["functionCall"]);A!=null&&n(r,["functionCall"],A);const F=i(a,["functionResponse"]);F!=null&&n(r,["functionResponse"],F);const Z=i(a,["inlineData"]);Z!=null&&n(r,["inlineData"],Z);const ee=i(a,["text"]);return ee!=null&&n(r,["text"],ee),r}function Hf(d,a){const r={},f=i(a,["videoMetadata"]);f!=null&&n(r,["videoMetadata"],f);const g=i(a,["thought"]);g!=null&&n(r,["thought"],g);const x=i(a,["codeExecutionResult"]);x!=null&&n(r,["codeExecutionResult"],x);const R=i(a,["executableCode"]);R!=null&&n(r,["executableCode"],R);const A=i(a,["fileData"]);A!=null&&n(r,["fileData"],A);const F=i(a,["functionCall"]);F!=null&&n(r,["functionCall"],F);const Z=i(a,["functionResponse"]);Z!=null&&n(r,["functionResponse"],Z);const ee=i(a,["inlineData"]);ee!=null&&n(r,["inlineData"],ee);const me=i(a,["text"]);return me!=null&&n(r,["text"],me),r}function zf(d,a){const r={},f=i(a,["parts"]);f!=null&&(Array.isArray(f)?n(r,["parts"],f.map(x=>Gf(d,x))):n(r,["parts"],f));const g=i(a,["role"]);return g!=null&&n(r,["role"],g),r}function Wf(d,a){const r={},f=i(a,["parts"]);f!=null&&(Array.isArray(f)?n(r,["parts"],f.map(x=>Hf(d,x))):n(r,["parts"],f));const g=i(a,["role"]);return g!=null&&n(r,["role"],g),r}function qf(d,a){const r={},f=i(a,["example"]);f!=null&&n(r,["example"],f);const g=i(a,["pattern"]);g!=null&&n(r,["pattern"],g);const x=i(a,["default"]);x!=null&&n(r,["default"],x);const R=i(a,["maxLength"]);R!=null&&n(r,["maxLength"],R);const A=i(a,["minLength"]);A!=null&&n(r,["minLength"],A);const F=i(a,["minProperties"]);F!=null&&n(r,["minProperties"],F);const Z=i(a,["maxProperties"]);Z!=null&&n(r,["maxProperties"],Z);const ee=i(a,["anyOf"]);ee!=null&&n(r,["anyOf"],ee);const me=i(a,["description"]);me!=null&&n(r,["description"],me);const De=i(a,["enum"]);De!=null&&n(r,["enum"],De);const Re=i(a,["format"]);Re!=null&&n(r,["format"],Re);const Le=i(a,["items"]);Le!=null&&n(r,["items"],Le);const ot=i(a,["maxItems"]);ot!=null&&n(r,["maxItems"],ot);const ut=i(a,["maximum"]);ut!=null&&n(r,["maximum"],ut);const _t=i(a,["minItems"]);_t!=null&&n(r,["minItems"],_t);const Mt=i(a,["minimum"]);Mt!=null&&n(r,["minimum"],Mt);const Pt=i(a,["nullable"]);Pt!=null&&n(r,["nullable"],Pt);const wt=i(a,["properties"]);wt!=null&&n(r,["properties"],wt);const Kt=i(a,["propertyOrdering"]);Kt!=null&&n(r,["propertyOrdering"],Kt);const hn=i(a,["required"]);hn!=null&&n(r,["required"],hn);const pn=i(a,["title"]);pn!=null&&n(r,["title"],pn);const mn=i(a,["type"]);return mn!=null&&n(r,["type"],mn),r}function $f(d,a){const r={};if(i(a,["response"])!==void 0)throw new Error("response parameter is not supported in Gemini API.");const f=i(a,["description"]);f!=null&&n(r,["description"],f);const g=i(a,["name"]);g!=null&&n(r,["name"],g);const x=i(a,["parameters"]);return x!=null&&n(r,["parameters"],x),r}function Xf(d,a){const r={},f=i(a,["response"]);f!=null&&n(r,["response"],qf(d,f));const g=i(a,["description"]);g!=null&&n(r,["description"],g);const x=i(a,["name"]);x!=null&&n(r,["name"],x);const R=i(a,["parameters"]);return R!=null&&n(r,["parameters"],R),r}function Yf(){return{}}function Kf(){return{}}function Zf(d,a){const r={},f=i(a,["mode"]);f!=null&&n(r,["mode"],f);const g=i(a,["dynamicThreshold"]);return g!=null&&n(r,["dynamicThreshold"],g),r}function Jf(d,a){const r={},f=i(a,["mode"]);f!=null&&n(r,["mode"],f);const g=i(a,["dynamicThreshold"]);return g!=null&&n(r,["dynamicThreshold"],g),r}function Qf(d,a){const r={},f=i(a,["dynamicRetrievalConfig"]);return f!=null&&n(r,["dynamicRetrievalConfig"],Zf(d,f)),r}function jf(d,a){const r={},f=i(a,["dynamicRetrievalConfig"]);return f!=null&&n(r,["dynamicRetrievalConfig"],Jf(d,f)),r}function ed(d,a){const r={},f=i(a,["functionDeclarations"]);if(f!=null&&(Array.isArray(f)?n(r,["functionDeclarations"],f.map(A=>$f(d,A))):n(r,["functionDeclarations"],f)),i(a,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");i(a,["googleSearch"])!=null&&n(r,["googleSearch"],Yf());const x=i(a,["googleSearchRetrieval"]);x!=null&&n(r,["googleSearchRetrieval"],Qf(d,x));const R=i(a,["codeExecution"]);return R!=null&&n(r,["codeExecution"],R),r}function td(d,a){const r={},f=i(a,["functionDeclarations"]);f!=null&&(Array.isArray(f)?n(r,["functionDeclarations"],f.map(F=>Xf(d,F))):n(r,["functionDeclarations"],f));const g=i(a,["retrieval"]);g!=null&&n(r,["retrieval"],g),i(a,["googleSearch"])!=null&&n(r,["googleSearch"],Kf());const R=i(a,["googleSearchRetrieval"]);R!=null&&n(r,["googleSearchRetrieval"],jf(d,R));const A=i(a,["codeExecution"]);return A!=null&&n(r,["codeExecution"],A),r}function nd(d,a){const r={},f=i(a,["handle"]);if(f!=null&&n(r,["handle"],f),i(a,["transparent"])!==void 0)throw new Error("transparent parameter is not supported in Gemini API.");return r}function id(d,a){const r={},f=i(a,["handle"]);f!=null&&n(r,["handle"],f);const g=i(a,["transparent"]);return g!=null&&n(r,["transparent"],g),r}function od(){return{}}function cl(){return{}}function rd(d,a){const r={},f=i(a,["disabled"]);f!=null&&n(r,["disabled"],f);const g=i(a,["startOfSpeechSensitivity"]);g!=null&&n(r,["startOfSpeechSensitivity"],g);const x=i(a,["endOfSpeechSensitivity"]);x!=null&&n(r,["endOfSpeechSensitivity"],x);const R=i(a,["prefixPaddingMs"]);R!=null&&n(r,["prefixPaddingMs"],R);const A=i(a,["silenceDurationMs"]);return A!=null&&n(r,["silenceDurationMs"],A),r}function sd(d,a){const r={},f=i(a,["disabled"]);f!=null&&n(r,["disabled"],f);const g=i(a,["startOfSpeechSensitivity"]);g!=null&&n(r,["startOfSpeechSensitivity"],g);const x=i(a,["endOfSpeechSensitivity"]);x!=null&&n(r,["endOfSpeechSensitivity"],x);const R=i(a,["prefixPaddingMs"]);R!=null&&n(r,["prefixPaddingMs"],R);const A=i(a,["silenceDurationMs"]);return A!=null&&n(r,["silenceDurationMs"],A),r}function ad(d,a){const r={},f=i(a,["automaticActivityDetection"]);f!=null&&n(r,["automaticActivityDetection"],rd(d,f));const g=i(a,["activityHandling"]);g!=null&&n(r,["activityHandling"],g);const x=i(a,["turnCoverage"]);return x!=null&&n(r,["turnCoverage"],x),r}function ld(d,a){const r={},f=i(a,["automaticActivityDetection"]);f!=null&&n(r,["automaticActivityDetection"],sd(d,f));const g=i(a,["activityHandling"]);g!=null&&n(r,["activityHandling"],g);const x=i(a,["turnCoverage"]);return x!=null&&n(r,["turnCoverage"],x),r}function ud(d,a){const r={},f=i(a,["targetTokens"]);return f!=null&&n(r,["targetTokens"],f),r}function cd(d,a){const r={},f=i(a,["targetTokens"]);return f!=null&&n(r,["targetTokens"],f),r}function fd(d,a){const r={},f=i(a,["triggerTokens"]);f!=null&&n(r,["triggerTokens"],f);const g=i(a,["slidingWindow"]);return g!=null&&n(r,["slidingWindow"],ud(d,g)),r}function dd(d,a){const r={},f=i(a,["triggerTokens"]);f!=null&&n(r,["triggerTokens"],f);const g=i(a,["slidingWindow"]);return g!=null&&n(r,["slidingWindow"],cd(d,g)),r}function hd(d,a,r){const f={},g=i(a,["generationConfig"]);r!==void 0&&g!=null&&n(r,["setup","generationConfig"],g);const x=i(a,["responseModalities"]);r!==void 0&&x!=null&&n(r,["setup","generationConfig","responseModalities"],x);const R=i(a,["temperature"]);r!==void 0&&R!=null&&n(r,["setup","generationConfig","temperature"],R);const A=i(a,["topP"]);r!==void 0&&A!=null&&n(r,["setup","generationConfig","topP"],A);const F=i(a,["topK"]);r!==void 0&&F!=null&&n(r,["setup","generationConfig","topK"],F);const Z=i(a,["maxOutputTokens"]);r!==void 0&&Z!=null&&n(r,["setup","generationConfig","maxOutputTokens"],Z);const ee=i(a,["mediaResolution"]);r!==void 0&&ee!=null&&n(r,["setup","generationConfig","mediaResolution"],ee);const me=i(a,["seed"]);r!==void 0&&me!=null&&n(r,["setup","generationConfig","seed"],me);const De=i(a,["speechConfig"]);r!==void 0&&De!=null&&n(r,["setup","generationConfig","speechConfig"],De);const Re=i(a,["systemInstruction"]);r!==void 0&&Re!=null&&n(r,["setup","systemInstruction"],zf(d,y(d,Re)));const Le=i(a,["tools"]);r!==void 0&&Le!=null&&(Array.isArray(Le)?n(r,["setup","tools"],N(d,N(d,Le).map(Pt=>ed(d,O(d,Pt))))):n(r,["setup","tools"],N(d,Le)));const ot=i(a,["sessionResumption"]);if(r!==void 0&&ot!=null&&n(r,["setup","sessionResumption"],nd(d,ot)),i(a,["inputAudioTranscription"])!==void 0)throw new Error("inputAudioTranscription parameter is not supported in Gemini API.");const ut=i(a,["outputAudioTranscription"]);r!==void 0&&ut!=null&&n(r,["setup","outputAudioTranscription"],od());const _t=i(a,["realtimeInputConfig"]);r!==void 0&&_t!=null&&n(r,["setup","realtimeInputConfig"],ad(d,_t));const Mt=i(a,["contextWindowCompression"]);return r!==void 0&&Mt!=null&&n(r,["setup","contextWindowCompression"],fd(d,Mt)),f}function pd(d,a,r){const f={},g=i(a,["generationConfig"]);r!==void 0&&g!=null&&n(r,["setup","generationConfig"],g);const x=i(a,["responseModalities"]);r!==void 0&&x!=null&&n(r,["setup","generationConfig","responseModalities"],x);const R=i(a,["temperature"]);r!==void 0&&R!=null&&n(r,["setup","generationConfig","temperature"],R);const A=i(a,["topP"]);r!==void 0&&A!=null&&n(r,["setup","generationConfig","topP"],A);const F=i(a,["topK"]);r!==void 0&&F!=null&&n(r,["setup","generationConfig","topK"],F);const Z=i(a,["maxOutputTokens"]);r!==void 0&&Z!=null&&n(r,["setup","generationConfig","maxOutputTokens"],Z);const ee=i(a,["mediaResolution"]);r!==void 0&&ee!=null&&n(r,["setup","generationConfig","mediaResolution"],ee);const me=i(a,["seed"]);r!==void 0&&me!=null&&n(r,["setup","generationConfig","seed"],me);const De=i(a,["speechConfig"]);r!==void 0&&De!=null&&n(r,["setup","generationConfig","speechConfig"],De);const Re=i(a,["systemInstruction"]);r!==void 0&&Re!=null&&n(r,["setup","systemInstruction"],Wf(d,y(d,Re)));const Le=i(a,["tools"]);r!==void 0&&Le!=null&&(Array.isArray(Le)?n(r,["setup","tools"],N(d,N(d,Le).map(wt=>td(d,O(d,wt))))):n(r,["setup","tools"],N(d,Le)));const ot=i(a,["sessionResumption"]);r!==void 0&&ot!=null&&n(r,["setup","sessionResumption"],id(d,ot));const ut=i(a,["inputAudioTranscription"]);r!==void 0&&ut!=null&&n(r,["setup","inputAudioTranscription"],cl());const _t=i(a,["outputAudioTranscription"]);r!==void 0&&_t!=null&&n(r,["setup","outputAudioTranscription"],cl());const Mt=i(a,["realtimeInputConfig"]);r!==void 0&&Mt!=null&&n(r,["setup","realtimeInputConfig"],ld(d,Mt));const Pt=i(a,["contextWindowCompression"]);return r!==void 0&&Pt!=null&&n(r,["setup","contextWindowCompression"],dd(d,Pt)),f}function md(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["setup","model"],s(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],hd(d,g,r)),r}function gd(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["setup","model"],s(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],pd(d,g,r)),r}function _d(){return{}}function vd(){return{}}function yd(d,a){const r={},f=i(a,["thought"]);f!=null&&n(r,["thought"],f);const g=i(a,["codeExecutionResult"]);g!=null&&n(r,["codeExecutionResult"],g);const x=i(a,["executableCode"]);x!=null&&n(r,["executableCode"],x);const R=i(a,["fileData"]);R!=null&&n(r,["fileData"],R);const A=i(a,["functionCall"]);A!=null&&n(r,["functionCall"],A);const F=i(a,["functionResponse"]);F!=null&&n(r,["functionResponse"],F);const Z=i(a,["inlineData"]);Z!=null&&n(r,["inlineData"],Z);const ee=i(a,["text"]);return ee!=null&&n(r,["text"],ee),r}function xd(d,a){const r={},f=i(a,["videoMetadata"]);f!=null&&n(r,["videoMetadata"],f);const g=i(a,["thought"]);g!=null&&n(r,["thought"],g);const x=i(a,["codeExecutionResult"]);x!=null&&n(r,["codeExecutionResult"],x);const R=i(a,["executableCode"]);R!=null&&n(r,["executableCode"],R);const A=i(a,["fileData"]);A!=null&&n(r,["fileData"],A);const F=i(a,["functionCall"]);F!=null&&n(r,["functionCall"],F);const Z=i(a,["functionResponse"]);Z!=null&&n(r,["functionResponse"],Z);const ee=i(a,["inlineData"]);ee!=null&&n(r,["inlineData"],ee);const me=i(a,["text"]);return me!=null&&n(r,["text"],me),r}function Ed(d,a){const r={},f=i(a,["parts"]);f!=null&&(Array.isArray(f)?n(r,["parts"],f.map(x=>yd(d,x))):n(r,["parts"],f));const g=i(a,["role"]);return g!=null&&n(r,["role"],g),r}function Td(d,a){const r={},f=i(a,["parts"]);f!=null&&(Array.isArray(f)?n(r,["parts"],f.map(x=>xd(d,x))):n(r,["parts"],f));const g=i(a,["role"]);return g!=null&&n(r,["role"],g),r}function fl(d,a){const r={},f=i(a,["text"]);f!=null&&n(r,["text"],f);const g=i(a,["finished"]);return g!=null&&n(r,["finished"],g),r}function dl(d,a){const r={},f=i(a,["text"]);f!=null&&n(r,["text"],f);const g=i(a,["finished"]);return g!=null&&n(r,["finished"],g),r}function Sd(d,a){const r={},f=i(a,["modelTurn"]);f!=null&&n(r,["modelTurn"],Ed(d,f));const g=i(a,["turnComplete"]);g!=null&&n(r,["turnComplete"],g);const x=i(a,["interrupted"]);x!=null&&n(r,["interrupted"],x);const R=i(a,["generationComplete"]);R!=null&&n(r,["generationComplete"],R);const A=i(a,["inputTranscription"]);A!=null&&n(r,["inputTranscription"],fl(d,A));const F=i(a,["outputTranscription"]);return F!=null&&n(r,["outputTranscription"],fl(d,F)),r}function Md(d,a){const r={},f=i(a,["modelTurn"]);f!=null&&n(r,["modelTurn"],Td(d,f));const g=i(a,["turnComplete"]);g!=null&&n(r,["turnComplete"],g);const x=i(a,["interrupted"]);x!=null&&n(r,["interrupted"],x);const R=i(a,["generationComplete"]);R!=null&&n(r,["generationComplete"],R);const A=i(a,["inputTranscription"]);A!=null&&n(r,["inputTranscription"],dl(d,A));const F=i(a,["outputTranscription"]);return F!=null&&n(r,["outputTranscription"],dl(d,F)),r}function Cd(d,a){const r={},f=i(a,["id"]);f!=null&&n(r,["id"],f);const g=i(a,["args"]);g!=null&&n(r,["args"],g);const x=i(a,["name"]);return x!=null&&n(r,["name"],x),r}function Ad(d,a){const r={},f=i(a,["args"]);f!=null&&n(r,["args"],f);const g=i(a,["name"]);return g!=null&&n(r,["name"],g),r}function wd(d,a){const r={},f=i(a,["functionCalls"]);return f!=null&&(Array.isArray(f)?n(r,["functionCalls"],f.map(g=>Cd(d,g))):n(r,["functionCalls"],f)),r}function Rd(d,a){const r={},f=i(a,["functionCalls"]);return f!=null&&(Array.isArray(f)?n(r,["functionCalls"],f.map(g=>Ad(d,g))):n(r,["functionCalls"],f)),r}function Id(d,a){const r={},f=i(a,["ids"]);return f!=null&&n(r,["ids"],f),r}function Pd(d,a){const r={},f=i(a,["ids"]);return f!=null&&n(r,["ids"],f),r}function sr(d,a){const r={},f=i(a,["modality"]);f!=null&&n(r,["modality"],f);const g=i(a,["tokenCount"]);return g!=null&&n(r,["tokenCount"],g),r}function ar(d,a){const r={},f=i(a,["modality"]);f!=null&&n(r,["modality"],f);const g=i(a,["tokenCount"]);return g!=null&&n(r,["tokenCount"],g),r}function Dd(d,a){const r={},f=i(a,["promptTokenCount"]);f!=null&&n(r,["promptTokenCount"],f);const g=i(a,["cachedContentTokenCount"]);g!=null&&n(r,["cachedContentTokenCount"],g);const x=i(a,["responseTokenCount"]);x!=null&&n(r,["responseTokenCount"],x);const R=i(a,["toolUsePromptTokenCount"]);R!=null&&n(r,["toolUsePromptTokenCount"],R);const A=i(a,["thoughtsTokenCount"]);A!=null&&n(r,["thoughtsTokenCount"],A);const F=i(a,["totalTokenCount"]);F!=null&&n(r,["totalTokenCount"],F);const Z=i(a,["promptTokensDetails"]);Z!=null&&(Array.isArray(Z)?n(r,["promptTokensDetails"],Z.map(Re=>sr(d,Re))):n(r,["promptTokensDetails"],Z));const ee=i(a,["cacheTokensDetails"]);ee!=null&&(Array.isArray(ee)?n(r,["cacheTokensDetails"],ee.map(Re=>sr(d,Re))):n(r,["cacheTokensDetails"],ee));const me=i(a,["responseTokensDetails"]);me!=null&&(Array.isArray(me)?n(r,["responseTokensDetails"],me.map(Re=>sr(d,Re))):n(r,["responseTokensDetails"],me));const De=i(a,["toolUsePromptTokensDetails"]);return De!=null&&(Array.isArray(De)?n(r,["toolUsePromptTokensDetails"],De.map(Re=>sr(d,Re))):n(r,["toolUsePromptTokensDetails"],De)),r}function bd(d,a){const r={},f=i(a,["promptTokenCount"]);f!=null&&n(r,["promptTokenCount"],f);const g=i(a,["cachedContentTokenCount"]);g!=null&&n(r,["cachedContentTokenCount"],g);const x=i(a,["candidatesTokenCount"]);x!=null&&n(r,["responseTokenCount"],x);const R=i(a,["toolUsePromptTokenCount"]);R!=null&&n(r,["toolUsePromptTokenCount"],R);const A=i(a,["thoughtsTokenCount"]);A!=null&&n(r,["thoughtsTokenCount"],A);const F=i(a,["totalTokenCount"]);F!=null&&n(r,["totalTokenCount"],F);const Z=i(a,["promptTokensDetails"]);Z!=null&&(Array.isArray(Z)?n(r,["promptTokensDetails"],Z.map(Le=>ar(d,Le))):n(r,["promptTokensDetails"],Z));const ee=i(a,["cacheTokensDetails"]);ee!=null&&(Array.isArray(ee)?n(r,["cacheTokensDetails"],ee.map(Le=>ar(d,Le))):n(r,["cacheTokensDetails"],ee));const me=i(a,["candidatesTokensDetails"]);me!=null&&(Array.isArray(me)?n(r,["responseTokensDetails"],me.map(Le=>ar(d,Le))):n(r,["responseTokensDetails"],me));const De=i(a,["toolUsePromptTokensDetails"]);De!=null&&(Array.isArray(De)?n(r,["toolUsePromptTokensDetails"],De.map(Le=>ar(d,Le))):n(r,["toolUsePromptTokensDetails"],De));const Re=i(a,["trafficType"]);return Re!=null&&n(r,["trafficType"],Re),r}function Ud(d,a){const r={},f=i(a,["timeLeft"]);return f!=null&&n(r,["timeLeft"],f),r}function Nd(d,a){const r={},f=i(a,["timeLeft"]);return f!=null&&n(r,["timeLeft"],f),r}function Ld(d,a){const r={},f=i(a,["newHandle"]);f!=null&&n(r,["newHandle"],f);const g=i(a,["resumable"]);g!=null&&n(r,["resumable"],g);const x=i(a,["lastConsumedClientMessageIndex"]);return x!=null&&n(r,["lastConsumedClientMessageIndex"],x),r}function Fd(d,a){const r={},f=i(a,["newHandle"]);f!=null&&n(r,["newHandle"],f);const g=i(a,["resumable"]);g!=null&&n(r,["resumable"],g);const x=i(a,["lastConsumedClientMessageIndex"]);return x!=null&&n(r,["lastConsumedClientMessageIndex"],x),r}function Bd(d,a){const r={};i(a,["setupComplete"])!=null&&n(r,["setupComplete"],_d());const g=i(a,["serverContent"]);g!=null&&n(r,["serverContent"],Sd(d,g));const x=i(a,["toolCall"]);x!=null&&n(r,["toolCall"],wd(d,x));const R=i(a,["toolCallCancellation"]);R!=null&&n(r,["toolCallCancellation"],Id(d,R));const A=i(a,["usageMetadata"]);A!=null&&n(r,["usageMetadata"],Dd(d,A));const F=i(a,["goAway"]);F!=null&&n(r,["goAway"],Ud(d,F));const Z=i(a,["sessionResumptionUpdate"]);return Z!=null&&n(r,["sessionResumptionUpdate"],Ld(d,Z)),r}function Vd(d,a){const r={};i(a,["setupComplete"])!=null&&n(r,["setupComplete"],vd());const g=i(a,["serverContent"]);g!=null&&n(r,["serverContent"],Md(d,g));const x=i(a,["toolCall"]);x!=null&&n(r,["toolCall"],Rd(d,x));const R=i(a,["toolCallCancellation"]);R!=null&&n(r,["toolCallCancellation"],Pd(d,R));const A=i(a,["usageMetadata"]);A!=null&&n(r,["usageMetadata"],bd(d,A));const F=i(a,["goAway"]);F!=null&&n(r,["goAway"],Nd(d,F));const Z=i(a,["sessionResumptionUpdate"]);return Z!=null&&n(r,["sessionResumptionUpdate"],Fd(d,Z)),r}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Od(d,a){const r={};if(i(a,["videoMetadata"])!==void 0)throw new Error("videoMetadata parameter is not supported in Gemini API.");const f=i(a,["thought"]);f!=null&&n(r,["thought"],f);const g=i(a,["codeExecutionResult"]);g!=null&&n(r,["codeExecutionResult"],g);const x=i(a,["executableCode"]);x!=null&&n(r,["executableCode"],x);const R=i(a,["fileData"]);R!=null&&n(r,["fileData"],R);const A=i(a,["functionCall"]);A!=null&&n(r,["functionCall"],A);const F=i(a,["functionResponse"]);F!=null&&n(r,["functionResponse"],F);const Z=i(a,["inlineData"]);Z!=null&&n(r,["inlineData"],Z);const ee=i(a,["text"]);return ee!=null&&n(r,["text"],ee),r}function lr(d,a){const r={},f=i(a,["parts"]);f!=null&&(Array.isArray(f)?n(r,["parts"],f.map(x=>Od(d,x))):n(r,["parts"],f));const g=i(a,["role"]);return g!=null&&n(r,["role"],g),r}function kd(d,a){const r={};if(i(a,["example"])!==void 0)throw new Error("example parameter is not supported in Gemini API.");if(i(a,["pattern"])!==void 0)throw new Error("pattern parameter is not supported in Gemini API.");if(i(a,["default"])!==void 0)throw new Error("default parameter is not supported in Gemini API.");if(i(a,["maxLength"])!==void 0)throw new Error("maxLength parameter is not supported in Gemini API.");if(i(a,["minLength"])!==void 0)throw new Error("minLength parameter is not supported in Gemini API.");if(i(a,["minProperties"])!==void 0)throw new Error("minProperties parameter is not supported in Gemini API.");if(i(a,["maxProperties"])!==void 0)throw new Error("maxProperties parameter is not supported in Gemini API.");const f=i(a,["anyOf"]);f!=null&&n(r,["anyOf"],f);const g=i(a,["description"]);g!=null&&n(r,["description"],g);const x=i(a,["enum"]);x!=null&&n(r,["enum"],x);const R=i(a,["format"]);R!=null&&n(r,["format"],R);const A=i(a,["items"]);A!=null&&n(r,["items"],A);const F=i(a,["maxItems"]);F!=null&&n(r,["maxItems"],F);const Z=i(a,["maximum"]);Z!=null&&n(r,["maximum"],Z);const ee=i(a,["minItems"]);ee!=null&&n(r,["minItems"],ee);const me=i(a,["minimum"]);me!=null&&n(r,["minimum"],me);const De=i(a,["nullable"]);De!=null&&n(r,["nullable"],De);const Re=i(a,["properties"]);Re!=null&&n(r,["properties"],Re);const Le=i(a,["propertyOrdering"]);Le!=null&&n(r,["propertyOrdering"],Le);const ot=i(a,["required"]);ot!=null&&n(r,["required"],ot);const ut=i(a,["title"]);ut!=null&&n(r,["title"],ut);const _t=i(a,["type"]);return _t!=null&&n(r,["type"],_t),r}function Gd(d,a){const r={};if(i(a,["method"])!==void 0)throw new Error("method parameter is not supported in Gemini API.");const f=i(a,["category"]);f!=null&&n(r,["category"],f);const g=i(a,["threshold"]);return g!=null&&n(r,["threshold"],g),r}function Hd(d,a){const r={};if(i(a,["response"])!==void 0)throw new Error("response parameter is not supported in Gemini API.");const f=i(a,["description"]);f!=null&&n(r,["description"],f);const g=i(a,["name"]);g!=null&&n(r,["name"],g);const x=i(a,["parameters"]);return x!=null&&n(r,["parameters"],x),r}function zd(){return{}}function Wd(d,a){const r={},f=i(a,["mode"]);f!=null&&n(r,["mode"],f);const g=i(a,["dynamicThreshold"]);return g!=null&&n(r,["dynamicThreshold"],g),r}function qd(d,a){const r={},f=i(a,["dynamicRetrievalConfig"]);return f!=null&&n(r,["dynamicRetrievalConfig"],Wd(d,f)),r}function $d(d,a){const r={},f=i(a,["functionDeclarations"]);if(f!=null&&(Array.isArray(f)?n(r,["functionDeclarations"],f.map(A=>Hd(d,A))):n(r,["functionDeclarations"],f)),i(a,["retrieval"])!==void 0)throw new Error("retrieval parameter is not supported in Gemini API.");i(a,["googleSearch"])!=null&&n(r,["googleSearch"],zd());const x=i(a,["googleSearchRetrieval"]);x!=null&&n(r,["googleSearchRetrieval"],qd(d,x));const R=i(a,["codeExecution"]);return R!=null&&n(r,["codeExecution"],R),r}function Xd(d,a){const r={},f=i(a,["mode"]);f!=null&&n(r,["mode"],f);const g=i(a,["allowedFunctionNames"]);return g!=null&&n(r,["allowedFunctionNames"],g),r}function Yd(d,a){const r={},f=i(a,["functionCallingConfig"]);return f!=null&&n(r,["functionCallingConfig"],Xd(d,f)),r}function Kd(d,a){const r={},f=i(a,["voiceName"]);return f!=null&&n(r,["voiceName"],f),r}function Zd(d,a){const r={},f=i(a,["prebuiltVoiceConfig"]);return f!=null&&n(r,["prebuiltVoiceConfig"],Kd(d,f)),r}function Jd(d,a){const r={},f=i(a,["voiceConfig"]);f!=null&&n(r,["voiceConfig"],Zd(d,f));const g=i(a,["languageCode"]);return g!=null&&n(r,["languageCode"],g),r}function Qd(d,a){const r={},f=i(a,["includeThoughts"]);f!=null&&n(r,["includeThoughts"],f);const g=i(a,["thinkingBudget"]);return g!=null&&n(r,["thinkingBudget"],g),r}function jd(d,a,r){const f={},g=i(a,["systemInstruction"]);r!==void 0&&g!=null&&n(r,["systemInstruction"],lr(d,y(d,g)));const x=i(a,["temperature"]);x!=null&&n(f,["temperature"],x);const R=i(a,["topP"]);R!=null&&n(f,["topP"],R);const A=i(a,["topK"]);A!=null&&n(f,["topK"],A);const F=i(a,["candidateCount"]);F!=null&&n(f,["candidateCount"],F);const Z=i(a,["maxOutputTokens"]);Z!=null&&n(f,["maxOutputTokens"],Z);const ee=i(a,["stopSequences"]);ee!=null&&n(f,["stopSequences"],ee);const me=i(a,["responseLogprobs"]);me!=null&&n(f,["responseLogprobs"],me);const De=i(a,["logprobs"]);De!=null&&n(f,["logprobs"],De);const Re=i(a,["presencePenalty"]);Re!=null&&n(f,["presencePenalty"],Re);const Le=i(a,["frequencyPenalty"]);Le!=null&&n(f,["frequencyPenalty"],Le);const ot=i(a,["seed"]);ot!=null&&n(f,["seed"],ot);const ut=i(a,["responseMimeType"]);ut!=null&&n(f,["responseMimeType"],ut);const _t=i(a,["responseSchema"]);if(_t!=null&&n(f,["responseSchema"],kd(d,C(d,_t))),i(a,["routingConfig"])!==void 0)throw new Error("routingConfig parameter is not supported in Gemini API.");if(i(a,["modelSelectionConfig"])!==void 0)throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");const Mt=i(a,["safetySettings"]);r!==void 0&&Mt!=null&&(Array.isArray(Mt)?n(r,["safetySettings"],Mt.map(Ji=>Gd(d,Ji))):n(r,["safetySettings"],Mt));const Pt=i(a,["tools"]);r!==void 0&&Pt!=null&&(Array.isArray(Pt)?n(r,["tools"],N(d,N(d,Pt).map(Ji=>$d(d,O(d,Ji))))):n(r,["tools"],N(d,Pt)));const wt=i(a,["toolConfig"]);if(r!==void 0&&wt!=null&&n(r,["toolConfig"],Yd(d,wt)),i(a,["labels"])!==void 0)throw new Error("labels parameter is not supported in Gemini API.");const Kt=i(a,["cachedContent"]);r!==void 0&&Kt!=null&&n(r,["cachedContent"],X(d,Kt));const hn=i(a,["responseModalities"]);hn!=null&&n(f,["responseModalities"],hn);const pn=i(a,["mediaResolution"]);pn!=null&&n(f,["mediaResolution"],pn);const mn=i(a,["speechConfig"]);if(mn!=null&&n(f,["speechConfig"],Jd(d,E(d,mn))),i(a,["audioTimestamp"])!==void 0)throw new Error("audioTimestamp parameter is not supported in Gemini API.");const Po=i(a,["thinkingConfig"]);return Po!=null&&n(f,["thinkingConfig"],Qd(d,Po)),f}function hl(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["_url","model"],s(d,f));const g=i(a,["contents"]);g!=null&&(Array.isArray(g)?n(r,["contents"],w(d,w(d,g).map(R=>lr(d,R)))):n(r,["contents"],w(d,g)));const x=i(a,["config"]);return x!=null&&n(r,["generationConfig"],jd(d,x,r)),r}function eh(d,a,r){const f={},g=i(a,["taskType"]);r!==void 0&&g!=null&&n(r,["requests[]","taskType"],g);const x=i(a,["title"]);r!==void 0&&x!=null&&n(r,["requests[]","title"],x);const R=i(a,["outputDimensionality"]);if(r!==void 0&&R!=null&&n(r,["requests[]","outputDimensionality"],R),i(a,["mimeType"])!==void 0)throw new Error("mimeType parameter is not supported in Gemini API.");if(i(a,["autoTruncate"])!==void 0)throw new Error("autoTruncate parameter is not supported in Gemini API.");return f}function th(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["_url","model"],s(d,f));const g=i(a,["contents"]);g!=null&&n(r,["requests[]","content"],T(d,g));const x=i(a,["config"]);x!=null&&n(r,["config"],eh(d,x,r));const R=i(a,["model"]);return R!==void 0&&n(r,["requests[]","model"],s(d,R)),r}function nh(d,a,r){const f={};if(i(a,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(i(a,["negativePrompt"])!==void 0)throw new Error("negativePrompt parameter is not supported in Gemini API.");const g=i(a,["numberOfImages"]);r!==void 0&&g!=null&&n(r,["parameters","sampleCount"],g);const x=i(a,["aspectRatio"]);r!==void 0&&x!=null&&n(r,["parameters","aspectRatio"],x);const R=i(a,["guidanceScale"]);if(r!==void 0&&R!=null&&n(r,["parameters","guidanceScale"],R),i(a,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const A=i(a,["safetyFilterLevel"]);r!==void 0&&A!=null&&n(r,["parameters","safetySetting"],A);const F=i(a,["personGeneration"]);r!==void 0&&F!=null&&n(r,["parameters","personGeneration"],F);const Z=i(a,["includeSafetyAttributes"]);r!==void 0&&Z!=null&&n(r,["parameters","includeSafetyAttributes"],Z);const ee=i(a,["includeRaiReason"]);r!==void 0&&ee!=null&&n(r,["parameters","includeRaiReason"],ee);const me=i(a,["language"]);r!==void 0&&me!=null&&n(r,["parameters","language"],me);const De=i(a,["outputMimeType"]);r!==void 0&&De!=null&&n(r,["parameters","outputOptions","mimeType"],De);const Re=i(a,["outputCompressionQuality"]);if(r!==void 0&&Re!=null&&n(r,["parameters","outputOptions","compressionQuality"],Re),i(a,["addWatermark"])!==void 0)throw new Error("addWatermark parameter is not supported in Gemini API.");if(i(a,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return f}function ih(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["_url","model"],s(d,f));const g=i(a,["prompt"]);g!=null&&n(r,["instances[0]","prompt"],g);const x=i(a,["config"]);return x!=null&&n(r,["config"],nh(d,x,r)),r}function oh(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["_url","name"],s(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],g),r}function rh(d,a){const r={};if(i(a,["systemInstruction"])!==void 0)throw new Error("systemInstruction parameter is not supported in Gemini API.");if(i(a,["tools"])!==void 0)throw new Error("tools parameter is not supported in Gemini API.");if(i(a,["generationConfig"])!==void 0)throw new Error("generationConfig parameter is not supported in Gemini API.");return r}function sh(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["_url","model"],s(d,f));const g=i(a,["contents"]);g!=null&&(Array.isArray(g)?n(r,["contents"],w(d,w(d,g).map(R=>lr(d,R)))):n(r,["contents"],w(d,g)));const x=i(a,["config"]);return x!=null&&n(r,["config"],rh(d,x)),r}function ah(d,a){const r={};if(i(a,["gcsUri"])!==void 0)throw new Error("gcsUri parameter is not supported in Gemini API.");const f=i(a,["imageBytes"]);f!=null&&n(r,["bytesBase64Encoded"],q(d,f));const g=i(a,["mimeType"]);return g!=null&&n(r,["mimeType"],g),r}function lh(d,a,r){const f={},g=i(a,["numberOfVideos"]);if(r!==void 0&&g!=null&&n(r,["parameters","sampleCount"],g),i(a,["outputGcsUri"])!==void 0)throw new Error("outputGcsUri parameter is not supported in Gemini API.");if(i(a,["fps"])!==void 0)throw new Error("fps parameter is not supported in Gemini API.");const x=i(a,["durationSeconds"]);if(r!==void 0&&x!=null&&n(r,["parameters","durationSeconds"],x),i(a,["seed"])!==void 0)throw new Error("seed parameter is not supported in Gemini API.");const R=i(a,["aspectRatio"]);if(r!==void 0&&R!=null&&n(r,["parameters","aspectRatio"],R),i(a,["resolution"])!==void 0)throw new Error("resolution parameter is not supported in Gemini API.");const A=i(a,["personGeneration"]);if(r!==void 0&&A!=null&&n(r,["parameters","personGeneration"],A),i(a,["pubsubTopic"])!==void 0)throw new Error("pubsubTopic parameter is not supported in Gemini API.");const F=i(a,["negativePrompt"]);if(r!==void 0&&F!=null&&n(r,["parameters","negativePrompt"],F),i(a,["enhancePrompt"])!==void 0)throw new Error("enhancePrompt parameter is not supported in Gemini API.");return f}function uh(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["_url","model"],s(d,f));const g=i(a,["prompt"]);g!=null&&n(r,["instances[0]","prompt"],g);const x=i(a,["image"]);x!=null&&n(r,["instances[0]","image"],ah(d,x));const R=i(a,["config"]);return R!=null&&n(r,["config"],lh(d,R,r)),r}function ch(d,a){const r={},f=i(a,["videoMetadata"]);f!=null&&n(r,["videoMetadata"],f);const g=i(a,["thought"]);g!=null&&n(r,["thought"],g);const x=i(a,["codeExecutionResult"]);x!=null&&n(r,["codeExecutionResult"],x);const R=i(a,["executableCode"]);R!=null&&n(r,["executableCode"],R);const A=i(a,["fileData"]);A!=null&&n(r,["fileData"],A);const F=i(a,["functionCall"]);F!=null&&n(r,["functionCall"],F);const Z=i(a,["functionResponse"]);Z!=null&&n(r,["functionResponse"],Z);const ee=i(a,["inlineData"]);ee!=null&&n(r,["inlineData"],ee);const me=i(a,["text"]);return me!=null&&n(r,["text"],me),r}function Zi(d,a){const r={},f=i(a,["parts"]);f!=null&&(Array.isArray(f)?n(r,["parts"],f.map(x=>ch(d,x))):n(r,["parts"],f));const g=i(a,["role"]);return g!=null&&n(r,["role"],g),r}function pl(d,a){const r={},f=i(a,["example"]);f!=null&&n(r,["example"],f);const g=i(a,["pattern"]);g!=null&&n(r,["pattern"],g);const x=i(a,["default"]);x!=null&&n(r,["default"],x);const R=i(a,["maxLength"]);R!=null&&n(r,["maxLength"],R);const A=i(a,["minLength"]);A!=null&&n(r,["minLength"],A);const F=i(a,["minProperties"]);F!=null&&n(r,["minProperties"],F);const Z=i(a,["maxProperties"]);Z!=null&&n(r,["maxProperties"],Z);const ee=i(a,["anyOf"]);ee!=null&&n(r,["anyOf"],ee);const me=i(a,["description"]);me!=null&&n(r,["description"],me);const De=i(a,["enum"]);De!=null&&n(r,["enum"],De);const Re=i(a,["format"]);Re!=null&&n(r,["format"],Re);const Le=i(a,["items"]);Le!=null&&n(r,["items"],Le);const ot=i(a,["maxItems"]);ot!=null&&n(r,["maxItems"],ot);const ut=i(a,["maximum"]);ut!=null&&n(r,["maximum"],ut);const _t=i(a,["minItems"]);_t!=null&&n(r,["minItems"],_t);const Mt=i(a,["minimum"]);Mt!=null&&n(r,["minimum"],Mt);const Pt=i(a,["nullable"]);Pt!=null&&n(r,["nullable"],Pt);const wt=i(a,["properties"]);wt!=null&&n(r,["properties"],wt);const Kt=i(a,["propertyOrdering"]);Kt!=null&&n(r,["propertyOrdering"],Kt);const hn=i(a,["required"]);hn!=null&&n(r,["required"],hn);const pn=i(a,["title"]);pn!=null&&n(r,["title"],pn);const mn=i(a,["type"]);return mn!=null&&n(r,["type"],mn),r}function fh(d,a){const r={},f=i(a,["featureSelectionPreference"]);return f!=null&&n(r,["featureSelectionPreference"],f),r}function dh(d,a){const r={},f=i(a,["method"]);f!=null&&n(r,["method"],f);const g=i(a,["category"]);g!=null&&n(r,["category"],g);const x=i(a,["threshold"]);return x!=null&&n(r,["threshold"],x),r}function hh(d,a){const r={},f=i(a,["response"]);f!=null&&n(r,["response"],pl(d,f));const g=i(a,["description"]);g!=null&&n(r,["description"],g);const x=i(a,["name"]);x!=null&&n(r,["name"],x);const R=i(a,["parameters"]);return R!=null&&n(r,["parameters"],R),r}function ph(){return{}}function mh(d,a){const r={},f=i(a,["mode"]);f!=null&&n(r,["mode"],f);const g=i(a,["dynamicThreshold"]);return g!=null&&n(r,["dynamicThreshold"],g),r}function gh(d,a){const r={},f=i(a,["dynamicRetrievalConfig"]);return f!=null&&n(r,["dynamicRetrievalConfig"],mh(d,f)),r}function ml(d,a){const r={},f=i(a,["functionDeclarations"]);f!=null&&(Array.isArray(f)?n(r,["functionDeclarations"],f.map(F=>hh(d,F))):n(r,["functionDeclarations"],f));const g=i(a,["retrieval"]);g!=null&&n(r,["retrieval"],g),i(a,["googleSearch"])!=null&&n(r,["googleSearch"],ph());const R=i(a,["googleSearchRetrieval"]);R!=null&&n(r,["googleSearchRetrieval"],gh(d,R));const A=i(a,["codeExecution"]);return A!=null&&n(r,["codeExecution"],A),r}function _h(d,a){const r={},f=i(a,["mode"]);f!=null&&n(r,["mode"],f);const g=i(a,["allowedFunctionNames"]);return g!=null&&n(r,["allowedFunctionNames"],g),r}function vh(d,a){const r={},f=i(a,["functionCallingConfig"]);return f!=null&&n(r,["functionCallingConfig"],_h(d,f)),r}function yh(d,a){const r={},f=i(a,["voiceName"]);return f!=null&&n(r,["voiceName"],f),r}function xh(d,a){const r={},f=i(a,["prebuiltVoiceConfig"]);return f!=null&&n(r,["prebuiltVoiceConfig"],yh(d,f)),r}function Eh(d,a){const r={},f=i(a,["voiceConfig"]);f!=null&&n(r,["voiceConfig"],xh(d,f));const g=i(a,["languageCode"]);return g!=null&&n(r,["languageCode"],g),r}function Th(d,a){const r={},f=i(a,["includeThoughts"]);f!=null&&n(r,["includeThoughts"],f);const g=i(a,["thinkingBudget"]);return g!=null&&n(r,["thinkingBudget"],g),r}function Sh(d,a,r){const f={},g=i(a,["systemInstruction"]);r!==void 0&&g!=null&&n(r,["systemInstruction"],Zi(d,y(d,g)));const x=i(a,["temperature"]);x!=null&&n(f,["temperature"],x);const R=i(a,["topP"]);R!=null&&n(f,["topP"],R);const A=i(a,["topK"]);A!=null&&n(f,["topK"],A);const F=i(a,["candidateCount"]);F!=null&&n(f,["candidateCount"],F);const Z=i(a,["maxOutputTokens"]);Z!=null&&n(f,["maxOutputTokens"],Z);const ee=i(a,["stopSequences"]);ee!=null&&n(f,["stopSequences"],ee);const me=i(a,["responseLogprobs"]);me!=null&&n(f,["responseLogprobs"],me);const De=i(a,["logprobs"]);De!=null&&n(f,["logprobs"],De);const Re=i(a,["presencePenalty"]);Re!=null&&n(f,["presencePenalty"],Re);const Le=i(a,["frequencyPenalty"]);Le!=null&&n(f,["frequencyPenalty"],Le);const ot=i(a,["seed"]);ot!=null&&n(f,["seed"],ot);const ut=i(a,["responseMimeType"]);ut!=null&&n(f,["responseMimeType"],ut);const _t=i(a,["responseSchema"]);_t!=null&&n(f,["responseSchema"],pl(d,C(d,_t)));const Mt=i(a,["routingConfig"]);Mt!=null&&n(f,["routingConfig"],Mt);const Pt=i(a,["modelSelectionConfig"]);Pt!=null&&n(f,["modelConfig"],fh(d,Pt));const wt=i(a,["safetySettings"]);r!==void 0&&wt!=null&&(Array.isArray(wt)?n(r,["safetySettings"],wt.map(fs=>dh(d,fs))):n(r,["safetySettings"],wt));const Kt=i(a,["tools"]);r!==void 0&&Kt!=null&&(Array.isArray(Kt)?n(r,["tools"],N(d,N(d,Kt).map(fs=>ml(d,O(d,fs))))):n(r,["tools"],N(d,Kt)));const hn=i(a,["toolConfig"]);r!==void 0&&hn!=null&&n(r,["toolConfig"],vh(d,hn));const pn=i(a,["labels"]);r!==void 0&&pn!=null&&n(r,["labels"],pn);const mn=i(a,["cachedContent"]);r!==void 0&&mn!=null&&n(r,["cachedContent"],X(d,mn));const Po=i(a,["responseModalities"]);Po!=null&&n(f,["responseModalities"],Po);const Ji=i(a,["mediaResolution"]);Ji!=null&&n(f,["mediaResolution"],Ji);const wl=i(a,["speechConfig"]);wl!=null&&n(f,["speechConfig"],Eh(d,E(d,wl)));const Rl=i(a,["audioTimestamp"]);Rl!=null&&n(f,["audioTimestamp"],Rl);const Il=i(a,["thinkingConfig"]);return Il!=null&&n(f,["thinkingConfig"],Th(d,Il)),f}function gl(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["_url","model"],s(d,f));const g=i(a,["contents"]);g!=null&&(Array.isArray(g)?n(r,["contents"],w(d,w(d,g).map(R=>Zi(d,R)))):n(r,["contents"],w(d,g)));const x=i(a,["config"]);return x!=null&&n(r,["generationConfig"],Sh(d,x,r)),r}function Mh(d,a,r){const f={},g=i(a,["taskType"]);r!==void 0&&g!=null&&n(r,["instances[]","task_type"],g);const x=i(a,["title"]);r!==void 0&&x!=null&&n(r,["instances[]","title"],x);const R=i(a,["outputDimensionality"]);r!==void 0&&R!=null&&n(r,["parameters","outputDimensionality"],R);const A=i(a,["mimeType"]);r!==void 0&&A!=null&&n(r,["instances[]","mimeType"],A);const F=i(a,["autoTruncate"]);return r!==void 0&&F!=null&&n(r,["parameters","autoTruncate"],F),f}function Ch(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["_url","model"],s(d,f));const g=i(a,["contents"]);g!=null&&n(r,["instances[]","content"],T(d,g));const x=i(a,["config"]);return x!=null&&n(r,["config"],Mh(d,x,r)),r}function Ah(d,a,r){const f={},g=i(a,["outputGcsUri"]);r!==void 0&&g!=null&&n(r,["parameters","storageUri"],g);const x=i(a,["negativePrompt"]);r!==void 0&&x!=null&&n(r,["parameters","negativePrompt"],x);const R=i(a,["numberOfImages"]);r!==void 0&&R!=null&&n(r,["parameters","sampleCount"],R);const A=i(a,["aspectRatio"]);r!==void 0&&A!=null&&n(r,["parameters","aspectRatio"],A);const F=i(a,["guidanceScale"]);r!==void 0&&F!=null&&n(r,["parameters","guidanceScale"],F);const Z=i(a,["seed"]);r!==void 0&&Z!=null&&n(r,["parameters","seed"],Z);const ee=i(a,["safetyFilterLevel"]);r!==void 0&&ee!=null&&n(r,["parameters","safetySetting"],ee);const me=i(a,["personGeneration"]);r!==void 0&&me!=null&&n(r,["parameters","personGeneration"],me);const De=i(a,["includeSafetyAttributes"]);r!==void 0&&De!=null&&n(r,["parameters","includeSafetyAttributes"],De);const Re=i(a,["includeRaiReason"]);r!==void 0&&Re!=null&&n(r,["parameters","includeRaiReason"],Re);const Le=i(a,["language"]);r!==void 0&&Le!=null&&n(r,["parameters","language"],Le);const ot=i(a,["outputMimeType"]);r!==void 0&&ot!=null&&n(r,["parameters","outputOptions","mimeType"],ot);const ut=i(a,["outputCompressionQuality"]);r!==void 0&&ut!=null&&n(r,["parameters","outputOptions","compressionQuality"],ut);const _t=i(a,["addWatermark"]);r!==void 0&&_t!=null&&n(r,["parameters","addWatermark"],_t);const Mt=i(a,["enhancePrompt"]);return r!==void 0&&Mt!=null&&n(r,["parameters","enhancePrompt"],Mt),f}function wh(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["_url","model"],s(d,f));const g=i(a,["prompt"]);g!=null&&n(r,["instances[0]","prompt"],g);const x=i(a,["config"]);return x!=null&&n(r,["config"],Ah(d,x,r)),r}function Rh(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["_url","name"],s(d,f));const g=i(a,["config"]);return g!=null&&n(r,["config"],g),r}function Ih(d,a,r){const f={},g=i(a,["systemInstruction"]);r!==void 0&&g!=null&&n(r,["systemInstruction"],Zi(d,y(d,g)));const x=i(a,["tools"]);r!==void 0&&x!=null&&(Array.isArray(x)?n(r,["tools"],x.map(A=>ml(d,A))):n(r,["tools"],x));const R=i(a,["generationConfig"]);return r!==void 0&&R!=null&&n(r,["generationConfig"],R),f}function Ph(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["_url","model"],s(d,f));const g=i(a,["contents"]);g!=null&&(Array.isArray(g)?n(r,["contents"],w(d,w(d,g).map(R=>Zi(d,R)))):n(r,["contents"],w(d,g)));const x=i(a,["config"]);return x!=null&&n(r,["config"],Ih(d,x,r)),r}function Dh(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["_url","model"],s(d,f));const g=i(a,["contents"]);g!=null&&(Array.isArray(g)?n(r,["contents"],w(d,w(d,g).map(R=>Zi(d,R)))):n(r,["contents"],w(d,g)));const x=i(a,["config"]);return x!=null&&n(r,["config"],x),r}function bh(d,a){const r={},f=i(a,["gcsUri"]);f!=null&&n(r,["gcsUri"],f);const g=i(a,["imageBytes"]);g!=null&&n(r,["bytesBase64Encoded"],q(d,g));const x=i(a,["mimeType"]);return x!=null&&n(r,["mimeType"],x),r}function Uh(d,a,r){const f={},g=i(a,["numberOfVideos"]);r!==void 0&&g!=null&&n(r,["parameters","sampleCount"],g);const x=i(a,["outputGcsUri"]);r!==void 0&&x!=null&&n(r,["parameters","storageUri"],x);const R=i(a,["fps"]);r!==void 0&&R!=null&&n(r,["parameters","fps"],R);const A=i(a,["durationSeconds"]);r!==void 0&&A!=null&&n(r,["parameters","durationSeconds"],A);const F=i(a,["seed"]);r!==void 0&&F!=null&&n(r,["parameters","seed"],F);const Z=i(a,["aspectRatio"]);r!==void 0&&Z!=null&&n(r,["parameters","aspectRatio"],Z);const ee=i(a,["resolution"]);r!==void 0&&ee!=null&&n(r,["parameters","resolution"],ee);const me=i(a,["personGeneration"]);r!==void 0&&me!=null&&n(r,["parameters","personGeneration"],me);const De=i(a,["pubsubTopic"]);r!==void 0&&De!=null&&n(r,["parameters","pubsubTopic"],De);const Re=i(a,["negativePrompt"]);r!==void 0&&Re!=null&&n(r,["parameters","negativePrompt"],Re);const Le=i(a,["enhancePrompt"]);return r!==void 0&&Le!=null&&n(r,["parameters","enhancePrompt"],Le),f}function Nh(d,a){const r={},f=i(a,["model"]);f!=null&&n(r,["_url","model"],s(d,f));const g=i(a,["prompt"]);g!=null&&n(r,["instances[0]","prompt"],g);const x=i(a,["image"]);x!=null&&n(r,["instances[0]","image"],bh(d,x));const R=i(a,["config"]);return R!=null&&n(r,["config"],Uh(d,R,r)),r}function Lh(d,a){const r={},f=i(a,["thought"]);f!=null&&n(r,["thought"],f);const g=i(a,["codeExecutionResult"]);g!=null&&n(r,["codeExecutionResult"],g);const x=i(a,["executableCode"]);x!=null&&n(r,["executableCode"],x);const R=i(a,["fileData"]);R!=null&&n(r,["fileData"],R);const A=i(a,["functionCall"]);A!=null&&n(r,["functionCall"],A);const F=i(a,["functionResponse"]);F!=null&&n(r,["functionResponse"],F);const Z=i(a,["inlineData"]);Z!=null&&n(r,["inlineData"],Z);const ee=i(a,["text"]);return ee!=null&&n(r,["text"],ee),r}function Fh(d,a){const r={},f=i(a,["parts"]);f!=null&&(Array.isArray(f)?n(r,["parts"],f.map(x=>Lh(d,x))):n(r,["parts"],f));const g=i(a,["role"]);return g!=null&&n(r,["role"],g),r}function Bh(d,a){const r={},f=i(a,["citationSources"]);return f!=null&&n(r,["citations"],f),r}function Vh(d,a){const r={},f=i(a,["content"]);f!=null&&n(r,["content"],Fh(d,f));const g=i(a,["citationMetadata"]);g!=null&&n(r,["citationMetadata"],Bh(d,g));const x=i(a,["tokenCount"]);x!=null&&n(r,["tokenCount"],x);const R=i(a,["finishReason"]);R!=null&&n(r,["finishReason"],R);const A=i(a,["avgLogprobs"]);A!=null&&n(r,["avgLogprobs"],A);const F=i(a,["groundingMetadata"]);F!=null&&n(r,["groundingMetadata"],F);const Z=i(a,["index"]);Z!=null&&n(r,["index"],Z);const ee=i(a,["logprobsResult"]);ee!=null&&n(r,["logprobsResult"],ee);const me=i(a,["safetyRatings"]);return me!=null&&n(r,["safetyRatings"],me),r}function _l(d,a){const r={},f=i(a,["candidates"]);f!=null&&(Array.isArray(f)?n(r,["candidates"],f.map(A=>Vh(d,A))):n(r,["candidates"],f));const g=i(a,["modelVersion"]);g!=null&&n(r,["modelVersion"],g);const x=i(a,["promptFeedback"]);x!=null&&n(r,["promptFeedback"],x);const R=i(a,["usageMetadata"]);return R!=null&&n(r,["usageMetadata"],R),r}function Oh(d,a){const r={},f=i(a,["values"]);return f!=null&&n(r,["values"],f),r}function kh(){return{}}function Gh(d,a){const r={},f=i(a,["embeddings"]);return f!=null&&(Array.isArray(f)?n(r,["embeddings"],f.map(x=>Oh(d,x))):n(r,["embeddings"],f)),i(a,["metadata"])!=null&&n(r,["metadata"],kh()),r}function Hh(d,a){const r={},f=i(a,["bytesBase64Encoded"]);f!=null&&n(r,["imageBytes"],q(d,f));const g=i(a,["mimeType"]);return g!=null&&n(r,["mimeType"],g),r}function vl(d,a){const r={},f=i(a,["safetyAttributes","categories"]);f!=null&&n(r,["categories"],f);const g=i(a,["safetyAttributes","scores"]);g!=null&&n(r,["scores"],g);const x=i(a,["contentType"]);return x!=null&&n(r,["contentType"],x),r}function zh(d,a){const r={},f=i(a,["_self"]);f!=null&&n(r,["image"],Hh(d,f));const g=i(a,["raiFilteredReason"]);g!=null&&n(r,["raiFilteredReason"],g);const x=i(a,["_self"]);return x!=null&&n(r,["safetyAttributes"],vl(d,x)),r}function Wh(d,a){const r={},f=i(a,["predictions"]);f!=null&&(Array.isArray(f)?n(r,["generatedImages"],f.map(x=>zh(d,x))):n(r,["generatedImages"],f));const g=i(a,["positivePromptSafetyAttributes"]);return g!=null&&n(r,["positivePromptSafetyAttributes"],vl(d,g)),r}function qh(d,a){const r={},f=i(a,["baseModel"]);f!=null&&n(r,["baseModel"],f);const g=i(a,["createTime"]);g!=null&&n(r,["createTime"],g);const x=i(a,["updateTime"]);return x!=null&&n(r,["updateTime"],x),r}function $h(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["name"],f);const g=i(a,["displayName"]);g!=null&&n(r,["displayName"],g);const x=i(a,["description"]);x!=null&&n(r,["description"],x);const R=i(a,["version"]);R!=null&&n(r,["version"],R);const A=i(a,["_self"]);A!=null&&n(r,["tunedModelInfo"],qh(d,A));const F=i(a,["inputTokenLimit"]);F!=null&&n(r,["inputTokenLimit"],F);const Z=i(a,["outputTokenLimit"]);Z!=null&&n(r,["outputTokenLimit"],Z);const ee=i(a,["supportedGenerationMethods"]);return ee!=null&&n(r,["supportedActions"],ee),r}function Xh(d,a){const r={},f=i(a,["totalTokens"]);f!=null&&n(r,["totalTokens"],f);const g=i(a,["cachedContentTokenCount"]);return g!=null&&n(r,["cachedContentTokenCount"],g),r}function Yh(d,a){const r={},f=i(a,["video","uri"]);f!=null&&n(r,["uri"],f);const g=i(a,["video","encodedVideo"]);g!=null&&n(r,["videoBytes"],q(d,g));const x=i(a,["encoding"]);return x!=null&&n(r,["mimeType"],x),r}function Kh(d,a){const r={},f=i(a,["_self"]);return f!=null&&n(r,["video"],Yh(d,f)),r}function Zh(d,a){const r={},f=i(a,["generatedSamples"]);f!=null&&(Array.isArray(f)?n(r,["generatedVideos"],f.map(R=>Kh(d,R))):n(r,["generatedVideos"],f));const g=i(a,["raiMediaFilteredCount"]);g!=null&&n(r,["raiMediaFilteredCount"],g);const x=i(a,["raiMediaFilteredReasons"]);return x!=null&&n(r,["raiMediaFilteredReasons"],x),r}function Jh(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["name"],f);const g=i(a,["metadata"]);g!=null&&n(r,["metadata"],g);const x=i(a,["done"]);x!=null&&n(r,["done"],x);const R=i(a,["error"]);R!=null&&n(r,["error"],R);const A=i(a,["response","generateVideoResponse"]);return A!=null&&n(r,["response"],Zh(d,A)),r}function Qh(d,a){const r={},f=i(a,["videoMetadata"]);f!=null&&n(r,["videoMetadata"],f);const g=i(a,["thought"]);g!=null&&n(r,["thought"],g);const x=i(a,["codeExecutionResult"]);x!=null&&n(r,["codeExecutionResult"],x);const R=i(a,["executableCode"]);R!=null&&n(r,["executableCode"],R);const A=i(a,["fileData"]);A!=null&&n(r,["fileData"],A);const F=i(a,["functionCall"]);F!=null&&n(r,["functionCall"],F);const Z=i(a,["functionResponse"]);Z!=null&&n(r,["functionResponse"],Z);const ee=i(a,["inlineData"]);ee!=null&&n(r,["inlineData"],ee);const me=i(a,["text"]);return me!=null&&n(r,["text"],me),r}function jh(d,a){const r={},f=i(a,["parts"]);f!=null&&(Array.isArray(f)?n(r,["parts"],f.map(x=>Qh(d,x))):n(r,["parts"],f));const g=i(a,["role"]);return g!=null&&n(r,["role"],g),r}function ep(d,a){const r={},f=i(a,["citations"]);return f!=null&&n(r,["citations"],f),r}function tp(d,a){const r={},f=i(a,["content"]);f!=null&&n(r,["content"],jh(d,f));const g=i(a,["citationMetadata"]);g!=null&&n(r,["citationMetadata"],ep(d,g));const x=i(a,["finishMessage"]);x!=null&&n(r,["finishMessage"],x);const R=i(a,["finishReason"]);R!=null&&n(r,["finishReason"],R);const A=i(a,["avgLogprobs"]);A!=null&&n(r,["avgLogprobs"],A);const F=i(a,["groundingMetadata"]);F!=null&&n(r,["groundingMetadata"],F);const Z=i(a,["index"]);Z!=null&&n(r,["index"],Z);const ee=i(a,["logprobsResult"]);ee!=null&&n(r,["logprobsResult"],ee);const me=i(a,["safetyRatings"]);return me!=null&&n(r,["safetyRatings"],me),r}function yl(d,a){const r={},f=i(a,["candidates"]);f!=null&&(Array.isArray(f)?n(r,["candidates"],f.map(Z=>tp(d,Z))):n(r,["candidates"],f));const g=i(a,["createTime"]);g!=null&&n(r,["createTime"],g);const x=i(a,["responseId"]);x!=null&&n(r,["responseId"],x);const R=i(a,["modelVersion"]);R!=null&&n(r,["modelVersion"],R);const A=i(a,["promptFeedback"]);A!=null&&n(r,["promptFeedback"],A);const F=i(a,["usageMetadata"]);return F!=null&&n(r,["usageMetadata"],F),r}function np(d,a){const r={},f=i(a,["truncated"]);f!=null&&n(r,["truncated"],f);const g=i(a,["token_count"]);return g!=null&&n(r,["tokenCount"],g),r}function ip(d,a){const r={},f=i(a,["values"]);f!=null&&n(r,["values"],f);const g=i(a,["statistics"]);return g!=null&&n(r,["statistics"],np(d,g)),r}function op(d,a){const r={},f=i(a,["billableCharacterCount"]);return f!=null&&n(r,["billableCharacterCount"],f),r}function rp(d,a){const r={},f=i(a,["predictions[]","embeddings"]);f!=null&&(Array.isArray(f)?n(r,["embeddings"],f.map(x=>ip(d,x))):n(r,["embeddings"],f));const g=i(a,["metadata"]);return g!=null&&n(r,["metadata"],op(d,g)),r}function sp(d,a){const r={},f=i(a,["gcsUri"]);f!=null&&n(r,["gcsUri"],f);const g=i(a,["bytesBase64Encoded"]);g!=null&&n(r,["imageBytes"],q(d,g));const x=i(a,["mimeType"]);return x!=null&&n(r,["mimeType"],x),r}function xl(d,a){const r={},f=i(a,["safetyAttributes","categories"]);f!=null&&n(r,["categories"],f);const g=i(a,["safetyAttributes","scores"]);g!=null&&n(r,["scores"],g);const x=i(a,["contentType"]);return x!=null&&n(r,["contentType"],x),r}function ap(d,a){const r={},f=i(a,["_self"]);f!=null&&n(r,["image"],sp(d,f));const g=i(a,["raiFilteredReason"]);g!=null&&n(r,["raiFilteredReason"],g);const x=i(a,["_self"]);x!=null&&n(r,["safetyAttributes"],xl(d,x));const R=i(a,["prompt"]);return R!=null&&n(r,["enhancedPrompt"],R),r}function lp(d,a){const r={},f=i(a,["predictions"]);f!=null&&(Array.isArray(f)?n(r,["generatedImages"],f.map(x=>ap(d,x))):n(r,["generatedImages"],f));const g=i(a,["positivePromptSafetyAttributes"]);return g!=null&&n(r,["positivePromptSafetyAttributes"],xl(d,g)),r}function up(d,a){const r={},f=i(a,["endpoint"]);f!=null&&n(r,["name"],f);const g=i(a,["deployedModelId"]);return g!=null&&n(r,["deployedModelId"],g),r}function cp(d,a){const r={},f=i(a,["labels","google-vertex-llm-tuning-base-model-id"]);f!=null&&n(r,["baseModel"],f);const g=i(a,["createTime"]);g!=null&&n(r,["createTime"],g);const x=i(a,["updateTime"]);return x!=null&&n(r,["updateTime"],x),r}function fp(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["name"],f);const g=i(a,["displayName"]);g!=null&&n(r,["displayName"],g);const x=i(a,["description"]);x!=null&&n(r,["description"],x);const R=i(a,["versionId"]);R!=null&&n(r,["version"],R);const A=i(a,["deployedModels"]);A!=null&&(Array.isArray(A)?n(r,["endpoints"],A.map(ee=>up(d,ee))):n(r,["endpoints"],A));const F=i(a,["labels"]);F!=null&&n(r,["labels"],F);const Z=i(a,["_self"]);return Z!=null&&n(r,["tunedModelInfo"],cp(d,Z)),r}function dp(d,a){const r={},f=i(a,["totalTokens"]);return f!=null&&n(r,["totalTokens"],f),r}function hp(d,a){const r={},f=i(a,["tokensInfo"]);return f!=null&&n(r,["tokensInfo"],f),r}function pp(d,a){const r={},f=i(a,["gcsUri"]);f!=null&&n(r,["uri"],f);const g=i(a,["bytesBase64Encoded"]);g!=null&&n(r,["videoBytes"],q(d,g));const x=i(a,["mimeType"]);return x!=null&&n(r,["mimeType"],x),r}function mp(d,a){const r={},f=i(a,["_self"]);return f!=null&&n(r,["video"],pp(d,f)),r}function gp(d,a){const r={},f=i(a,["videos"]);f!=null&&(Array.isArray(f)?n(r,["generatedVideos"],f.map(R=>mp(d,R))):n(r,["generatedVideos"],f));const g=i(a,["raiMediaFilteredCount"]);g!=null&&n(r,["raiMediaFilteredCount"],g);const x=i(a,["raiMediaFilteredReasons"]);return x!=null&&n(r,["raiMediaFilteredReasons"],x),r}function _p(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["name"],f);const g=i(a,["metadata"]);g!=null&&n(r,["metadata"],g);const x=i(a,["done"]);x!=null&&n(r,["done"],x);const R=i(a,["error"]);R!=null&&n(r,["error"],R);const A=i(a,["response"]);return A!=null&&n(r,["response"],gp(d,A)),r}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const vp="FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";async function yp(d,a,r){let f,g;r.data instanceof Blob?g=JSON.parse(await r.data.text()):g=JSON.parse(r.data),d.isVertexAI()?f=Vd(d,g):f=Bd(d,g),a(f)}class El{constructor(a,r,f){this.apiClient=a,this.auth=r,this.webSocketFactory=f}async connect(a){var r,f,g,x;const R=this.apiClient.getWebsocketBaseUrl(),A=this.apiClient.getApiVersion();let F;const Z=Tp(this.apiClient.getDefaultHeaders());if(this.apiClient.isVertexAI())F=`${R}/ws/google.cloud.aiplatform.${A}.LlmBidiService/BidiGenerateContent`,await this.auth.addAuthHeaders(Z);else{const wt=this.apiClient.getApiKey();F=`${R}/ws/google.ai.generativelanguage.${A}.GenerativeService.BidiGenerateContent?key=${wt}`}let ee=()=>{};const me=new Promise(wt=>{ee=wt}),De=a.callbacks,Re=function(){var wt;(wt=De?.onopen)===null||wt===void 0||wt.call(De),ee({})},Le=this.apiClient,ot={onopen:Re,onmessage:wt=>{yp(Le,De.onmessage,wt)},onerror:(r=De?.onerror)!==null&&r!==void 0?r:function(wt){},onclose:(f=De?.onclose)!==null&&f!==void 0?f:function(wt){}},ut=this.webSocketFactory.create(F,Ep(Z),ot);ut.connect(),await me;let _t=s(this.apiClient,a.model);if(this.apiClient.isVertexAI()&&_t.startsWith("publishers/")){const wt=this.apiClient.getProject(),Kt=this.apiClient.getLocation();_t=`projects/${wt}/locations/${Kt}/`+_t}let Mt={};this.apiClient.isVertexAI()&&((g=a.config)===null||g===void 0?void 0:g.responseModalities)===void 0&&(a.config===void 0?a.config={responseModalities:[o.Modality.AUDIO]}:a.config.responseModalities=[o.Modality.AUDIO]),!((x=a.config)===null||x===void 0)&&x.generationConfig&&console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");const Pt={model:_t,config:a.config,callbacks:a.callbacks};return this.apiClient.isVertexAI()?Mt=gd(this.apiClient,Pt):Mt=md(this.apiClient,Pt),delete Mt.config,ut.send(JSON.stringify(Mt)),new Tl(ut,this.apiClient)}}const xp={turnComplete:!0};class Tl{constructor(a,r){this.conn=a,this.apiClient=r}tLiveClientContent(a,r){if(r.turns!==null&&r.turns!==void 0){let f=[];try{f=w(a,r.turns),a.isVertexAI()?f=f.map(g=>Zi(a,g)):f=f.map(g=>lr(a,g))}catch{throw new Error(`Failed to parse client content "turns", type: '${typeof r.turns}'`)}return{clientContent:{turns:f,turnComplete:r.turnComplete}}}return{clientContent:{turnComplete:r.turnComplete}}}tLiveClientRealtimeInput(a,r){let f={};if(!("media"in r)||!r.media)throw new Error(`Failed to convert realtime input "media", type: '${typeof r.media}'`);return f={realtimeInput:{mediaChunks:[r.media],activityStart:r.activityStart,activityEnd:r.activityEnd}},f}tLiveClienttToolResponse(a,r){let f=[];if(r.functionResponses==null)throw new Error("functionResponses is required.");if(Array.isArray(r.functionResponses)?f=r.functionResponses:f=[r.functionResponses],f.length===0)throw new Error("functionResponses is required.");for(const x of f){if(typeof x!="object"||x===null||!("name"in x)||!("response"in x))throw new Error(`Could not parse function response, type '${typeof x}'.`);if(!a.isVertexAI()&&!("id"in x))throw new Error(vp)}return{toolResponse:{functionResponses:f}}}sendClientContent(a){a=Object.assign(Object.assign({},xp),a);const r=this.tLiveClientContent(this.apiClient,a);this.conn.send(JSON.stringify(r))}sendRealtimeInput(a){if(a.media==null)throw new Error("Media is required.");const r=this.tLiveClientRealtimeInput(this.apiClient,a);this.conn.send(JSON.stringify(r))}sendToolResponse(a){if(a.functionResponses==null)throw new Error("Tool response parameters are required.");const r=this.tLiveClienttToolResponse(this.apiClient,a);this.conn.send(JSON.stringify(r))}close(){this.conn.close()}}function Ep(d){const a={};return d.forEach((r,f)=>{a[f]=r}),a}function Tp(d){const a=new Headers;for(const[r,f]of Object.entries(d))a.append(r,f);return a}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Sl extends e{constructor(a){super(),this.apiClient=a,this.generateContent=async r=>await this.generateContentInternal(r),this.generateContentStream=async r=>await this.generateContentStreamInternal(r),this.generateImages=async r=>await this.generateImagesInternal(r).then(f=>{var g;let x;const R=[];if(f?.generatedImages)for(const F of f.generatedImages)F&&F?.safetyAttributes&&((g=F?.safetyAttributes)===null||g===void 0?void 0:g.contentType)==="Positive Prompt"?x=F?.safetyAttributes:R.push(F);let A;return x?A={generatedImages:R,positivePromptSafetyAttributes:x}:A={generatedImages:R},A})}async generateContentInternal(a){var r,f;let g,x="",R={};if(this.apiClient.isVertexAI()){const A=gl(this.apiClient,a);return x=t("{model}:generateContent",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"POST",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(F=>F.json()),g.then(F=>{const Z=yl(this.apiClient,F),ee=new be;return Object.assign(ee,Z),ee})}else{const A=hl(this.apiClient,a);return x=t("{model}:generateContent",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"POST",httpOptions:(f=a.config)===null||f===void 0?void 0:f.httpOptions}).then(F=>F.json()),g.then(F=>{const Z=_l(this.apiClient,F),ee=new be;return Object.assign(ee,Z),ee})}}async generateContentStreamInternal(a){var r,f;let g,x="",R={};if(this.apiClient.isVertexAI()){const A=gl(this.apiClient,a);x=t("{model}:streamGenerateContent?alt=sse",A._url),R=A._query,delete A.config,delete A._url,delete A._query;const F=this.apiClient;return g=F.requestStream({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"POST",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}),g.then(function(Z){return mi(this,arguments,function*(){var ee,me,De,Re;try{for(var Le=!0,ot=vn(Z),ut;ut=yield kt(ot.next()),ee=ut.done,!ee;Le=!0){Re=ut.value,Le=!1;const Mt=yl(F,yield kt(Re.json())),Pt=new be;Object.assign(Pt,Mt),yield yield kt(Pt)}}catch(_t){me={error:_t}}finally{try{!Le&&!ee&&(De=ot.return)&&(yield kt(De.call(ot)))}finally{if(me)throw me.error}}})})}else{const A=hl(this.apiClient,a);x=t("{model}:streamGenerateContent?alt=sse",A._url),R=A._query,delete A.config,delete A._url,delete A._query;const F=this.apiClient;return g=F.requestStream({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"POST",httpOptions:(f=a.config)===null||f===void 0?void 0:f.httpOptions}),g.then(function(Z){return mi(this,arguments,function*(){var ee,me,De,Re;try{for(var Le=!0,ot=vn(Z),ut;ut=yield kt(ot.next()),ee=ut.done,!ee;Le=!0){Re=ut.value,Le=!1;const Mt=_l(F,yield kt(Re.json())),Pt=new be;Object.assign(Pt,Mt),yield yield kt(Pt)}}catch(_t){me={error:_t}}finally{try{!Le&&!ee&&(De=ot.return)&&(yield kt(De.call(ot)))}finally{if(me)throw me.error}}})})}}async embedContent(a){var r,f;let g,x="",R={};if(this.apiClient.isVertexAI()){const A=Ch(this.apiClient,a);return x=t("{model}:predict",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"POST",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(F=>F.json()),g.then(F=>{const Z=rp(this.apiClient,F),ee=new rt;return Object.assign(ee,Z),ee})}else{const A=th(this.apiClient,a);return x=t("{model}:batchEmbedContents",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"POST",httpOptions:(f=a.config)===null||f===void 0?void 0:f.httpOptions}).then(F=>F.json()),g.then(F=>{const Z=Gh(this.apiClient,F),ee=new rt;return Object.assign(ee,Z),ee})}}async generateImagesInternal(a){var r,f;let g,x="",R={};if(this.apiClient.isVertexAI()){const A=wh(this.apiClient,a);return x=t("{model}:predict",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"POST",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(F=>F.json()),g.then(F=>{const Z=lp(this.apiClient,F),ee=new Ut;return Object.assign(ee,Z),ee})}else{const A=ih(this.apiClient,a);return x=t("{model}:predict",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"POST",httpOptions:(f=a.config)===null||f===void 0?void 0:f.httpOptions}).then(F=>F.json()),g.then(F=>{const Z=Wh(this.apiClient,F),ee=new Ut;return Object.assign(ee,Z),ee})}}async get(a){var r,f;let g,x="",R={};if(this.apiClient.isVertexAI()){const A=Rh(this.apiClient,a);return x=t("{name}",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"GET",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(F=>F.json()),g.then(F=>fp(this.apiClient,F))}else{const A=oh(this.apiClient,a);return x=t("{name}",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"GET",httpOptions:(f=a.config)===null||f===void 0?void 0:f.httpOptions}).then(F=>F.json()),g.then(F=>$h(this.apiClient,F))}}async countTokens(a){var r,f;let g,x="",R={};if(this.apiClient.isVertexAI()){const A=Ph(this.apiClient,a);return x=t("{model}:countTokens",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"POST",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(F=>F.json()),g.then(F=>{const Z=dp(this.apiClient,F),ee=new Ot;return Object.assign(ee,Z),ee})}else{const A=sh(this.apiClient,a);return x=t("{model}:countTokens",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"POST",httpOptions:(f=a.config)===null||f===void 0?void 0:f.httpOptions}).then(F=>F.json()),g.then(F=>{const Z=Xh(this.apiClient,F),ee=new Ot;return Object.assign(ee,Z),ee})}}async computeTokens(a){var r;let f,g="",x={};if(this.apiClient.isVertexAI()){const R=Dh(this.apiClient,a);return g=t("{model}:computeTokens",R._url),x=R._query,delete R.config,delete R._url,delete R._query,f=this.apiClient.request({path:g,queryParams:x,body:JSON.stringify(R),httpMethod:"POST",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(A=>A.json()),f.then(A=>{const F=hp(this.apiClient,A),Z=new Tt;return Object.assign(Z,F),Z})}else throw new Error("This method is only supported by the Vertex AI.")}async generateVideos(a){var r,f;let g,x="",R={};if(this.apiClient.isVertexAI()){const A=Nh(this.apiClient,a);return x=t("{model}:predictLongRunning",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"POST",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(F=>F.json()),g.then(F=>_p(this.apiClient,F))}else{const A=uh(this.apiClient,a);return x=t("{model}:predictLongRunning",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"POST",httpOptions:(f=a.config)===null||f===void 0?void 0:f.httpOptions}).then(F=>F.json()),g.then(F=>Jh(this.apiClient,F))}}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */function Sp(d,a){const r={},f=i(a,["operationName"]);f!=null&&n(r,["_url","operationName"],f);const g=i(a,["config"]);return g!=null&&n(r,["config"],g),r}function Mp(d,a){const r={},f=i(a,["operationName"]);f!=null&&n(r,["_url","operationName"],f);const g=i(a,["config"]);return g!=null&&n(r,["config"],g),r}function Cp(d,a){const r={},f=i(a,["operationName"]);f!=null&&n(r,["operationName"],f);const g=i(a,["resourceName"]);g!=null&&n(r,["_url","resourceName"],g);const x=i(a,["config"]);return x!=null&&n(r,["config"],x),r}function Ap(d,a){const r={},f=i(a,["video","uri"]);f!=null&&n(r,["uri"],f);const g=i(a,["video","encodedVideo"]);g!=null&&n(r,["videoBytes"],q(d,g));const x=i(a,["encoding"]);return x!=null&&n(r,["mimeType"],x),r}function wp(d,a){const r={},f=i(a,["_self"]);return f!=null&&n(r,["video"],Ap(d,f)),r}function Rp(d,a){const r={},f=i(a,["generatedSamples"]);f!=null&&(Array.isArray(f)?n(r,["generatedVideos"],f.map(R=>wp(d,R))):n(r,["generatedVideos"],f));const g=i(a,["raiMediaFilteredCount"]);g!=null&&n(r,["raiMediaFilteredCount"],g);const x=i(a,["raiMediaFilteredReasons"]);return x!=null&&n(r,["raiMediaFilteredReasons"],x),r}function Ip(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["name"],f);const g=i(a,["metadata"]);g!=null&&n(r,["metadata"],g);const x=i(a,["done"]);x!=null&&n(r,["done"],x);const R=i(a,["error"]);R!=null&&n(r,["error"],R);const A=i(a,["response","generateVideoResponse"]);return A!=null&&n(r,["response"],Rp(d,A)),r}function Pp(d,a){const r={},f=i(a,["gcsUri"]);f!=null&&n(r,["uri"],f);const g=i(a,["bytesBase64Encoded"]);g!=null&&n(r,["videoBytes"],q(d,g));const x=i(a,["mimeType"]);return x!=null&&n(r,["mimeType"],x),r}function Dp(d,a){const r={},f=i(a,["_self"]);return f!=null&&n(r,["video"],Pp(d,f)),r}function bp(d,a){const r={},f=i(a,["videos"]);f!=null&&(Array.isArray(f)?n(r,["generatedVideos"],f.map(R=>Dp(d,R))):n(r,["generatedVideos"],f));const g=i(a,["raiMediaFilteredCount"]);g!=null&&n(r,["raiMediaFilteredCount"],g);const x=i(a,["raiMediaFilteredReasons"]);return x!=null&&n(r,["raiMediaFilteredReasons"],x),r}function Ml(d,a){const r={},f=i(a,["name"]);f!=null&&n(r,["name"],f);const g=i(a,["metadata"]);g!=null&&n(r,["metadata"],g);const x=i(a,["done"]);x!=null&&n(r,["done"],x);const R=i(a,["error"]);R!=null&&n(r,["error"],R);const A=i(a,["response"]);return A!=null&&n(r,["response"],bp(d,A)),r}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Cl extends e{constructor(a){super(),this.apiClient=a}async getVideosOperation(a){const r=a.operation,f=a.config;if(r.name===void 0||r.name==="")throw new Error("Operation name is required.");if(this.apiClient.isVertexAI()){const g=r.name.split("/operations/")[0];let x;return f&&"httpOptions"in f&&(x=f.httpOptions),this.fetchPredictVideosOperationInternal({operationName:r.name,resourceName:g,config:{httpOptions:x}})}else return this.getVideosOperationInternal({operationName:r.name,config:f})}async getVideosOperationInternal(a){var r,f;let g,x="",R={};if(this.apiClient.isVertexAI()){const A=Mp(this.apiClient,a);return x=t("{operationName}",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"GET",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(F=>F.json()),g.then(F=>Ml(this.apiClient,F))}else{const A=Sp(this.apiClient,a);return x=t("{operationName}",A._url),R=A._query,delete A.config,delete A._url,delete A._query,g=this.apiClient.request({path:x,queryParams:R,body:JSON.stringify(A),httpMethod:"GET",httpOptions:(f=a.config)===null||f===void 0?void 0:f.httpOptions}).then(F=>F.json()),g.then(F=>Ip(this.apiClient,F))}}async fetchPredictVideosOperationInternal(a){var r;let f,g="",x={};if(this.apiClient.isVertexAI()){const R=Cp(this.apiClient,a);return g=t("{resourceName}:fetchPredictOperation",R._url),x=R._query,delete R.config,delete R._url,delete R._query,f=this.apiClient.request({path:g,queryParams:x,body:JSON.stringify(R),httpMethod:"POST",httpOptions:(r=a.config)===null||r===void 0?void 0:r.httpOptions}).then(A=>A.json()),f.then(A=>Ml(this.apiClient,A))}else throw new Error("This method is only supported by the Vertex AI.")}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Al="x-goog-api-key";class Up{constructor(a){this.apiKey=a}async addAuthHeaders(a){a.get(Al)===null&&a.append(Al,this.apiKey)}}/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Np="gl-node/";class Lp{constructor(a){var r;if(a.apiKey==null)throw new Error(`An API Key must be set when running in an unspecified environment.
 + ${je().message}`);this.vertexai=(r=a.vertexai)!==null&&r!==void 0?r:!1,this.apiKey=a.apiKey,this.apiVersion=a.apiVersion;const f=new Up(this.apiKey);this.apiClient=new Ce({auth:f,apiVersion:this.apiVersion,apiKey:this.apiKey,vertexai:this.vertexai,httpOptions:a.httpOptions,userAgentExtra:Np+"cross",uploader:new Ge}),this.models=new Sl(this.apiClient),this.live=new El(this.apiClient,f,new Ct),this.chats=new M(this.models,this.apiClient),this.caches=new $n(this.apiClient),this.files=new ul(this.apiClient),this.operations=new Cl(this.apiClient)}}o.Caches=$n,o.Chat=L,o.Chats=M,o.ComputeTokensResponse=Tt,o.CountTokensResponse=Ot,o.CreateFileResponse=fi,o.DeleteCachedContentResponse=sn,o.DeleteFileResponse=di,o.EmbedContentResponse=rt,o.Files=ul,o.FunctionResponse=it,o.GenerateContentResponse=be,o.GenerateContentResponsePromptFeedback=ve,o.GenerateContentResponseUsageMetadata=Be,o.GenerateImagesResponse=Ut,o.GenerateVideosResponse=rn,o.GoogleGenAI=Lp,o.HttpResponse=dn,o.ListCachedContentsResponse=ci,o.ListFilesResponse=Di,o.Live=El,o.LiveClientToolResponse=hi,o.LiveSendToolResponseParameters=Ki,o.Models=Sl,o.Operations=Cl,o.Pager=Ke,o.ReplayResponse=Yi,o.Session=Tl,o.createModelContent=le,o.createPartFromBase64=Oe,o.createPartFromCodeExecutionResult=at,o.createPartFromExecutableCode=Qe,o.createPartFromFunctionCall=ze,o.createPartFromFunctionResponse=Xe,o.createPartFromText=Ve,o.createPartFromUri=Me,o.createUserContent=oe}($s)),$s}RC();window.lit={devMode:!1};const Vf=window.CONFIG?.apiKey,IC=window.CONFIG?.model||"gemini-2.5-flash-preview-native-audio-dialog";Vf||console.error("API key not provided in CONFIG object");const PC=`
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
`;class DC{constructor(e={}){this.config={apiKey:e.apiKey||Vf,model:e.model||IC,width:e.width||"800px",height:e.height||"600px",...e},this.init()}async init(){try{this.overlay=document.createElement("div"),this.overlay.className="widget-overlay",this.widgetContainer=document.createElement("div"),this.widgetContainer.className="widget-popup",this.widgetContainer.style.width=this.config.width,this.widgetContainer.style.height=this.config.height;const e=document.createElement("div");e.className="widget-header";const t=document.createElement("h3");t.className="widget-title",t.textContent="Interactive Document Widget";const n=document.createElement("button");n.className="widget-close",n.textContent="×",n.onclick=()=>this.destroy(),e.appendChild(t),e.appendChild(n);const i=document.createElement("div");i.className="interactive-document-widget";const s=document.createElement("style");s.textContent=PC,document.head.appendChild(s),await this.initializeGdmLiveAudio(i),this.widgetContainer.appendChild(e),this.widgetContainer.appendChild(i),document.body.appendChild(this.overlay),document.body.appendChild(this.widgetContainer),console.log("Widget initialized with API key:",!!this.config.apiKey)}catch(e){console.error("Failed to initialize widget:",e),this.handleError(e)}}async initializeGdmLiveAudio(e){try{if(this.mainElement=new on,this.mainElement.apiKey=this.config.apiKey,this.mainElement.model=this.config.model,!this.mainElement.apiKey)throw new Error("Failed to set API key on GdmLiveAudio component");e.appendChild(this.mainElement),console.log("GdmLiveAudio initialized successfully")}catch(t){console.error("Failed to initialize GdmLiveAudio:",t),this.handleError(t)}}async start(){this.mainElement&&typeof this.mainElement.startRecording=="function"&&await this.mainElement.startRecording()}async stop(){this.mainElement&&typeof this.mainElement.stopRecording=="function"&&await this.mainElement.stopRecording()}async reset(){this.mainElement&&typeof this.mainElement.reset=="function"&&await this.mainElement.reset()}handleError(e){if(console.error("Interactive Document Widget Error:",e),this.widgetContainer){const t=document.createElement("div");t.className="error-message",t.textContent=`Widget Error: ${e.message}`,this.widgetContainer.appendChild(t)}}destroy(){this.mainElement&&typeof this.mainElement.stopRecording=="function"&&this.mainElement.stopRecording(),this.overlay&&this.overlay.remove(),this.widgetContainer&&this.widgetContainer.remove()}}typeof window<"u"&&(window.openInteractiveDocumentWidget=function(){new DC({width:"800px",height:"600px"})});
//# sourceMappingURL=widget.B74Gwia9.js.map
