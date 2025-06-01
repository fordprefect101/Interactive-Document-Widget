import "https://esm.sh/lit@^3.3.0";
import { property as ft, customElement as pt, state as L } from "https://esm.sh/lit@^3.3.0/decorators.js";
import "https://esm.sh/@google/genai@0.9.0";
import "https://esm.sh/three@^0.176.0";
import { css as mt, LitElement as ht, html as H } from "lit";
import * as _ from "three";
import { EXRLoader as Pt } from "https://esm.sh/three@^0.176.0/examples/jsm/loaders/EXRLoader.js";
import { EffectComposer as Rt } from "https://esm.sh/three@^0.176.0/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass as Dt } from "https://esm.sh/three@^0.176.0/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass as Nt } from "https://esm.sh/three@^0.176.0/examples/jsm/postprocessing/ShaderPass.js";
import { UnrealBloomPass as Ft } from "https://esm.sh/three@^0.176.0/examples/jsm/postprocessing/UnrealBloomPass.js";
import { FXAAShader as Vt } from "https://esm.sh/three@^0.176.0/examples/jsm/shaders/FXAAShader.js";
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class j {
}
function E(o, t) {
  const e = /\{([^}]+)\}/g;
  return o.replace(e, (n, r) => {
    if (Object.prototype.hasOwnProperty.call(t, r)) {
      const l = t[r];
      return l != null ? String(l) : "";
    } else
      throw new Error(`Key '${r}' not found in valueMap.`);
  });
}
function i(o, t, e) {
  for (let l = 0; l < t.length - 1; l++) {
    const u = t[l];
    if (u.endsWith("[]")) {
      const a = u.slice(0, -2);
      if (!(a in o))
        if (Array.isArray(e))
          o[a] = Array.from({ length: e.length }, () => ({}));
        else
          throw new Error(`Value must be a list given an array path ${u}`);
      if (Array.isArray(o[a])) {
        const c = o[a];
        if (Array.isArray(e))
          for (let d = 0; d < c.length; d++) {
            const f = c[d];
            i(f, t.slice(l + 1), e[d]);
          }
        else
          for (const d of c)
            i(d, t.slice(l + 1), e);
      }
      return;
    } else if (u.endsWith("[0]")) {
      const a = u.slice(0, -3);
      a in o || (o[a] = [{}]);
      const c = o[a];
      i(c[0], t.slice(l + 1), e);
      return;
    }
    (!o[u] || typeof o[u] != "object") && (o[u] = {}), o = o[u];
  }
  const n = t[t.length - 1], r = o[n];
  if (r !== void 0) {
    if (!e || typeof e == "object" && Object.keys(e).length === 0 || e === r)
      return;
    if (typeof r == "object" && typeof e == "object" && r !== null && e !== null)
      Object.assign(r, e);
    else
      throw new Error(`Cannot set value for an existing key. Key: ${n}`);
  } else
    o[n] = e;
}
function s(o, t) {
  try {
    if (t.length === 1 && t[0] === "_self")
      return o;
    for (let e = 0; e < t.length; e++) {
      if (typeof o != "object" || o === null)
        return;
      const n = t[e];
      if (n.endsWith("[]")) {
        const r = n.slice(0, -2);
        if (r in o) {
          const l = o[r];
          return Array.isArray(l) ? l.map((u) => s(u, t.slice(e + 1))) : void 0;
        } else
          return;
      } else
        o = o[n];
    }
    return o;
  } catch (e) {
    if (e instanceof TypeError)
      return;
    throw e;
  }
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function w(o, t) {
  if (!t || typeof t != "string")
    throw new Error("model is required and must be a string");
  if (o.isVertexAI()) {
    if (t.startsWith("publishers/") || t.startsWith("projects/") || t.startsWith("models/"))
      return t;
    if (t.indexOf("/") >= 0) {
      const e = t.split("/", 2);
      return `publishers/${e[0]}/models/${e[1]}`;
    } else
      return `publishers/google/models/${t}`;
  } else
    return t.startsWith("models/") || t.startsWith("tunedModels/") ? t : `models/${t}`;
}
function gt(o, t) {
  const e = w(o, t);
  return e ? e.startsWith("publishers/") && o.isVertexAI() ? `projects/${o.getProject()}/locations/${o.getLocation()}/${e}` : e.startsWith("models/") && o.isVertexAI() ? `projects/${o.getProject()}/locations/${o.getLocation()}/publishers/google/${e}` : e : "";
}
function fe(o, t) {
  if (t == null)
    throw new Error("PartUnion is required");
  if (typeof t == "object")
    return t;
  if (typeof t == "string")
    return { text: t };
  throw new Error(`Unsupported part type: ${typeof t}`);
}
function yt(o, t) {
  if (t == null || Array.isArray(t) && t.length === 0)
    throw new Error("PartListUnion is required");
  return Array.isArray(t) ? t.map((e) => fe(o, e)) : [fe(o, t)];
}
function ie(o) {
  return o != null && typeof o == "object" && "parts" in o && Array.isArray(o.parts);
}
function pe(o) {
  return o != null && typeof o == "object" && "functionCall" in o;
}
function me(o) {
  return o != null && typeof o == "object" && "functionResponse" in o;
}
function F(o, t) {
  if (t == null)
    throw new Error("ContentUnion is required");
  return ie(t) ? t : {
    role: "user",
    parts: yt(o, t)
  };
}
function Ct(o, t) {
  if (!t)
    return [];
  if (o.isVertexAI() && Array.isArray(t))
    return t.flatMap((e) => {
      const n = F(o, e);
      return n.parts && n.parts.length > 0 && n.parts[0].text !== void 0 ? [n.parts[0].text] : [];
    });
  if (o.isVertexAI()) {
    const e = F(o, t);
    return e.parts && e.parts.length > 0 && e.parts[0].text !== void 0 ? [e.parts[0].text] : [];
  }
  return Array.isArray(t) ? t.map((e) => F(o, e)) : [F(o, t)];
}
function S(o, t) {
  if (t == null || Array.isArray(t) && t.length === 0)
    throw new Error("contents are required");
  if (!Array.isArray(t)) {
    if (pe(t) || me(t))
      throw new Error("To specify functionCall or functionResponse parts, please wrap them in a Content object, specifying the role for them");
    return [F(o, t)];
  }
  const e = [], n = [], r = ie(t[0]);
  for (const l of t) {
    const u = ie(l);
    if (u != r)
      throw new Error("Mixing Content and Parts is not supported, please group the parts into a the appropriate Content objects and specify the roles for them");
    if (u)
      e.push(l);
    else {
      if (pe(l) || me(l))
        throw new Error("To specify functionCall or functionResponse parts, please wrap them, and any other parts, in Content objects as appropriate, specifying the role for them");
      n.push(l);
    }
  }
  return r || e.push({ role: "user", parts: yt(o, n) }), e;
}
function X(o, t) {
  if (!o.isVertexAI() && "default" in t)
    throw new Error("Default value is not supported in the response schema for the Gemini API.");
  if ("anyOf" in t && t.anyOf !== void 0)
    for (const e of t.anyOf)
      X(o, e);
  if ("items" in t && t.items !== void 0 && X(o, t.items), "properties" in t && t.properties !== void 0)
    for (const e of Object.values(t.properties))
      X(o, e);
}
function Tt(o, t) {
  return X(o, t), t;
}
function vt(o, t) {
  if (typeof t == "object" && "voiceConfig" in t)
    return t;
  if (typeof t == "string")
    return {
      voiceConfig: {
        prebuiltVoiceConfig: {
          voiceName: t
        }
      }
    };
  throw new Error(`Unsupported speechConfig type: ${typeof t}`);
}
function ee(o, t) {
  return t;
}
function V(o, t) {
  if (!Array.isArray(t))
    throw new Error("tool is required and must be an array of Tools");
  return t;
}
function Ut(o, t, e, n = 1) {
  const r = !t.startsWith(`${e}/`) && t.split("/").length === n;
  return o.isVertexAI() ? t.startsWith("projects/") ? t : t.startsWith("locations/") ? `projects/${o.getProject()}/${t}` : t.startsWith(`${e}/`) ? `projects/${o.getProject()}/locations/${o.getLocation()}/${t}` : r ? `projects/${o.getProject()}/locations/${o.getLocation()}/${e}/${t}` : t : r ? `${e}/${t}` : t;
}
function k(o, t) {
  if (typeof t != "string")
    throw new Error("name must be a string");
  return Ut(o, t, "cachedContents");
}
function G(o, t) {
  if (typeof t != "string")
    throw new Error("fromImageBytes must be a string");
  return t;
}
function Et(o, t) {
  if (typeof t != "string")
    throw new Error("fromName must be a string");
  return t.startsWith("files/") ? t.split("files/")[1] : t;
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function Lt(o, t) {
  const e = {};
  if (s(t, ["videoMetadata"]) !== void 0)
    throw new Error("videoMetadata parameter is not supported in Gemini API.");
  const n = s(t, ["thought"]);
  n != null && i(e, ["thought"], n);
  const r = s(t, [
    "codeExecutionResult"
  ]);
  r != null && i(e, ["codeExecutionResult"], r);
  const l = s(t, [
    "executableCode"
  ]);
  l != null && i(e, ["executableCode"], l);
  const u = s(t, ["fileData"]);
  u != null && i(e, ["fileData"], u);
  const a = s(t, ["functionCall"]);
  a != null && i(e, ["functionCall"], a);
  const c = s(t, [
    "functionResponse"
  ]);
  c != null && i(e, ["functionResponse"], c);
  const d = s(t, ["inlineData"]);
  d != null && i(e, ["inlineData"], d);
  const f = s(t, ["text"]);
  return f != null && i(e, ["text"], f), e;
}
function he(o, t) {
  const e = {}, n = s(t, ["parts"]);
  n != null && (Array.isArray(n) ? i(e, ["parts"], n.map((l) => Lt(o, l))) : i(e, ["parts"], n));
  const r = s(t, ["role"]);
  return r != null && i(e, ["role"], r), e;
}
function kt(o, t) {
  const e = {};
  if (s(t, ["response"]) !== void 0)
    throw new Error("response parameter is not supported in Gemini API.");
  const n = s(t, ["description"]);
  n != null && i(e, ["description"], n);
  const r = s(t, ["name"]);
  r != null && i(e, ["name"], r);
  const l = s(t, ["parameters"]);
  return l != null && i(e, ["parameters"], l), e;
}
function Gt() {
  return {};
}
function qt(o, t) {
  const e = {}, n = s(t, ["mode"]);
  n != null && i(e, ["mode"], n);
  const r = s(t, [
    "dynamicThreshold"
  ]);
  return r != null && i(e, ["dynamicThreshold"], r), e;
}
function Bt(o, t) {
  const e = {}, n = s(t, [
    "dynamicRetrievalConfig"
  ]);
  return n != null && i(e, ["dynamicRetrievalConfig"], qt(o, n)), e;
}
function $t(o, t) {
  const e = {}, n = s(t, [
    "functionDeclarations"
  ]);
  if (n != null && (Array.isArray(n) ? i(e, ["functionDeclarations"], n.map((a) => kt(o, a))) : i(e, ["functionDeclarations"], n)), s(t, ["retrieval"]) !== void 0)
    throw new Error("retrieval parameter is not supported in Gemini API.");
  s(t, ["googleSearch"]) != null && i(e, ["googleSearch"], Gt());
  const l = s(t, [
    "googleSearchRetrieval"
  ]);
  l != null && i(e, ["googleSearchRetrieval"], Bt(o, l));
  const u = s(t, [
    "codeExecution"
  ]);
  return u != null && i(e, ["codeExecution"], u), e;
}
function Ht(o, t) {
  const e = {}, n = s(t, ["mode"]);
  n != null && i(e, ["mode"], n);
  const r = s(t, [
    "allowedFunctionNames"
  ]);
  return r != null && i(e, ["allowedFunctionNames"], r), e;
}
function Yt(o, t) {
  const e = {}, n = s(t, [
    "functionCallingConfig"
  ]);
  return n != null && i(e, ["functionCallingConfig"], Ht(o, n)), e;
}
function zt(o, t, e) {
  const n = {}, r = s(t, ["ttl"]);
  e !== void 0 && r != null && i(e, ["ttl"], r);
  const l = s(t, ["expireTime"]);
  e !== void 0 && l != null && i(e, ["expireTime"], l);
  const u = s(t, ["displayName"]);
  e !== void 0 && u != null && i(e, ["displayName"], u);
  const a = s(t, ["contents"]);
  e !== void 0 && a != null && (Array.isArray(a) ? i(e, ["contents"], S(o, S(o, a).map((p) => he(o, p)))) : i(e, ["contents"], S(o, a)));
  const c = s(t, [
    "systemInstruction"
  ]);
  e !== void 0 && c != null && i(e, ["systemInstruction"], he(o, F(o, c)));
  const d = s(t, ["tools"]);
  e !== void 0 && d != null && (Array.isArray(d) ? i(e, ["tools"], d.map((p) => $t(o, p))) : i(e, ["tools"], d));
  const f = s(t, ["toolConfig"]);
  return e !== void 0 && f != null && i(e, ["toolConfig"], Yt(o, f)), n;
}
function Kt(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["model"], gt(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], zt(o, r, e)), e;
}
function Wt(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["_url", "name"], k(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], r), e;
}
function Jt(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["_url", "name"], k(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], r), e;
}
function Xt(o, t, e) {
  const n = {}, r = s(t, ["ttl"]);
  e !== void 0 && r != null && i(e, ["ttl"], r);
  const l = s(t, ["expireTime"]);
  return e !== void 0 && l != null && i(e, ["expireTime"], l), n;
}
function Qt(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["_url", "name"], k(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], Xt(o, r, e)), e;
}
function Zt(o, t, e) {
  const n = {}, r = s(t, ["pageSize"]);
  e !== void 0 && r != null && i(e, ["_query", "pageSize"], r);
  const l = s(t, ["pageToken"]);
  return e !== void 0 && l != null && i(e, ["_query", "pageToken"], l), n;
}
function Ot(o, t) {
  const e = {}, n = s(t, ["config"]);
  return n != null && i(e, ["config"], Zt(o, n, e)), e;
}
function bt(o, t) {
  const e = {}, n = s(t, [
    "videoMetadata"
  ]);
  n != null && i(e, ["videoMetadata"], n);
  const r = s(t, ["thought"]);
  r != null && i(e, ["thought"], r);
  const l = s(t, [
    "codeExecutionResult"
  ]);
  l != null && i(e, ["codeExecutionResult"], l);
  const u = s(t, [
    "executableCode"
  ]);
  u != null && i(e, ["executableCode"], u);
  const a = s(t, ["fileData"]);
  a != null && i(e, ["fileData"], a);
  const c = s(t, ["functionCall"]);
  c != null && i(e, ["functionCall"], c);
  const d = s(t, [
    "functionResponse"
  ]);
  d != null && i(e, ["functionResponse"], d);
  const f = s(t, ["inlineData"]);
  f != null && i(e, ["inlineData"], f);
  const p = s(t, ["text"]);
  return p != null && i(e, ["text"], p), e;
}
function ge(o, t) {
  const e = {}, n = s(t, ["parts"]);
  n != null && (Array.isArray(n) ? i(e, ["parts"], n.map((l) => bt(o, l))) : i(e, ["parts"], n));
  const r = s(t, ["role"]);
  return r != null && i(e, ["role"], r), e;
}
function jt(o, t) {
  const e = {}, n = s(t, ["example"]);
  n != null && i(e, ["example"], n);
  const r = s(t, ["pattern"]);
  r != null && i(e, ["pattern"], r);
  const l = s(t, ["default"]);
  l != null && i(e, ["default"], l);
  const u = s(t, ["maxLength"]);
  u != null && i(e, ["maxLength"], u);
  const a = s(t, ["minLength"]);
  a != null && i(e, ["minLength"], a);
  const c = s(t, [
    "minProperties"
  ]);
  c != null && i(e, ["minProperties"], c);
  const d = s(t, [
    "maxProperties"
  ]);
  d != null && i(e, ["maxProperties"], d);
  const f = s(t, ["anyOf"]);
  f != null && i(e, ["anyOf"], f);
  const p = s(t, ["description"]);
  p != null && i(e, ["description"], p);
  const h = s(t, ["enum"]);
  h != null && i(e, ["enum"], h);
  const m = s(t, ["format"]);
  m != null && i(e, ["format"], m);
  const g = s(t, ["items"]);
  g != null && i(e, ["items"], g);
  const y = s(t, ["maxItems"]);
  y != null && i(e, ["maxItems"], y);
  const C = s(t, ["maximum"]);
  C != null && i(e, ["maximum"], C);
  const T = s(t, ["minItems"]);
  T != null && i(e, ["minItems"], T);
  const v = s(t, ["minimum"]);
  v != null && i(e, ["minimum"], v);
  const x = s(t, ["nullable"]);
  x != null && i(e, ["nullable"], x);
  const I = s(t, ["properties"]);
  I != null && i(e, ["properties"], I);
  const A = s(t, [
    "propertyOrdering"
  ]);
  A != null && i(e, ["propertyOrdering"], A);
  const R = s(t, ["required"]);
  R != null && i(e, ["required"], R);
  const D = s(t, ["title"]);
  D != null && i(e, ["title"], D);
  const N = s(t, ["type"]);
  return N != null && i(e, ["type"], N), e;
}
function en(o, t) {
  const e = {}, n = s(t, ["response"]);
  n != null && i(e, ["response"], jt(o, n));
  const r = s(t, ["description"]);
  r != null && i(e, ["description"], r);
  const l = s(t, ["name"]);
  l != null && i(e, ["name"], l);
  const u = s(t, ["parameters"]);
  return u != null && i(e, ["parameters"], u), e;
}
function tn() {
  return {};
}
function nn(o, t) {
  const e = {}, n = s(t, ["mode"]);
  n != null && i(e, ["mode"], n);
  const r = s(t, [
    "dynamicThreshold"
  ]);
  return r != null && i(e, ["dynamicThreshold"], r), e;
}
function on(o, t) {
  const e = {}, n = s(t, [
    "dynamicRetrievalConfig"
  ]);
  return n != null && i(e, ["dynamicRetrievalConfig"], nn(o, n)), e;
}
function sn(o, t) {
  const e = {}, n = s(t, [
    "functionDeclarations"
  ]);
  n != null && (Array.isArray(n) ? i(e, ["functionDeclarations"], n.map((c) => en(o, c))) : i(e, ["functionDeclarations"], n));
  const r = s(t, ["retrieval"]);
  r != null && i(e, ["retrieval"], r), s(t, ["googleSearch"]) != null && i(e, ["googleSearch"], tn());
  const u = s(t, [
    "googleSearchRetrieval"
  ]);
  u != null && i(e, ["googleSearchRetrieval"], on(o, u));
  const a = s(t, [
    "codeExecution"
  ]);
  return a != null && i(e, ["codeExecution"], a), e;
}
function rn(o, t) {
  const e = {}, n = s(t, ["mode"]);
  n != null && i(e, ["mode"], n);
  const r = s(t, [
    "allowedFunctionNames"
  ]);
  return r != null && i(e, ["allowedFunctionNames"], r), e;
}
function ln(o, t) {
  const e = {}, n = s(t, [
    "functionCallingConfig"
  ]);
  return n != null && i(e, ["functionCallingConfig"], rn(o, n)), e;
}
function an(o, t, e) {
  const n = {}, r = s(t, ["ttl"]);
  e !== void 0 && r != null && i(e, ["ttl"], r);
  const l = s(t, ["expireTime"]);
  e !== void 0 && l != null && i(e, ["expireTime"], l);
  const u = s(t, ["displayName"]);
  e !== void 0 && u != null && i(e, ["displayName"], u);
  const a = s(t, ["contents"]);
  e !== void 0 && a != null && (Array.isArray(a) ? i(e, ["contents"], S(o, S(o, a).map((p) => ge(o, p)))) : i(e, ["contents"], S(o, a)));
  const c = s(t, [
    "systemInstruction"
  ]);
  e !== void 0 && c != null && i(e, ["systemInstruction"], ge(o, F(o, c)));
  const d = s(t, ["tools"]);
  e !== void 0 && d != null && (Array.isArray(d) ? i(e, ["tools"], d.map((p) => sn(o, p))) : i(e, ["tools"], d));
  const f = s(t, ["toolConfig"]);
  return e !== void 0 && f != null && i(e, ["toolConfig"], ln(o, f)), n;
}
function un(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["model"], gt(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], an(o, r, e)), e;
}
function cn(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["_url", "name"], k(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], r), e;
}
function dn(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["_url", "name"], k(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], r), e;
}
function fn(o, t, e) {
  const n = {}, r = s(t, ["ttl"]);
  e !== void 0 && r != null && i(e, ["ttl"], r);
  const l = s(t, ["expireTime"]);
  return e !== void 0 && l != null && i(e, ["expireTime"], l), n;
}
function pn(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["_url", "name"], k(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], fn(o, r, e)), e;
}
function mn(o, t, e) {
  const n = {}, r = s(t, ["pageSize"]);
  e !== void 0 && r != null && i(e, ["_query", "pageSize"], r);
  const l = s(t, ["pageToken"]);
  return e !== void 0 && l != null && i(e, ["_query", "pageToken"], l), n;
}
function hn(o, t) {
  const e = {}, n = s(t, ["config"]);
  return n != null && i(e, ["config"], mn(o, n, e)), e;
}
function Q(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["name"], n);
  const r = s(t, ["displayName"]);
  r != null && i(e, ["displayName"], r);
  const l = s(t, ["model"]);
  l != null && i(e, ["model"], l);
  const u = s(t, ["createTime"]);
  u != null && i(e, ["createTime"], u);
  const a = s(t, ["updateTime"]);
  a != null && i(e, ["updateTime"], a);
  const c = s(t, ["expireTime"]);
  c != null && i(e, ["expireTime"], c);
  const d = s(t, [
    "usageMetadata"
  ]);
  return d != null && i(e, ["usageMetadata"], d), e;
}
function gn() {
  return {};
}
function yn(o, t) {
  const e = {}, n = s(t, [
    "nextPageToken"
  ]);
  n != null && i(e, ["nextPageToken"], n);
  const r = s(t, [
    "cachedContents"
  ]);
  return r != null && (Array.isArray(r) ? i(e, ["cachedContents"], r.map((l) => Q(o, l))) : i(e, ["cachedContents"], r)), e;
}
function Z(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["name"], n);
  const r = s(t, ["displayName"]);
  r != null && i(e, ["displayName"], r);
  const l = s(t, ["model"]);
  l != null && i(e, ["model"], l);
  const u = s(t, ["createTime"]);
  u != null && i(e, ["createTime"], u);
  const a = s(t, ["updateTime"]);
  a != null && i(e, ["updateTime"], a);
  const c = s(t, ["expireTime"]);
  c != null && i(e, ["expireTime"], c);
  const d = s(t, [
    "usageMetadata"
  ]);
  return d != null && i(e, ["usageMetadata"], d), e;
}
function Cn() {
  return {};
}
function Tn(o, t) {
  const e = {}, n = s(t, [
    "nextPageToken"
  ]);
  n != null && i(e, ["nextPageToken"], n);
  const r = s(t, [
    "cachedContents"
  ]);
  return r != null && (Array.isArray(r) ? i(e, ["cachedContents"], r.map((l) => Z(o, l))) : i(e, ["cachedContents"], r)), e;
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var O;
(function(o) {
  o.PAGED_ITEM_BATCH_JOBS = "batchJobs", o.PAGED_ITEM_MODELS = "models", o.PAGED_ITEM_TUNING_JOBS = "tuningJobs", o.PAGED_ITEM_FILES = "files", o.PAGED_ITEM_CACHED_CONTENTS = "cachedContents";
})(O || (O = {}));
class It {
  constructor(t, e, n, r) {
    this.pageInternal = [], this.paramsInternal = {}, this.requestInternal = e, this.init(t, n, r);
  }
  init(t, e, n) {
    var r, l;
    this.nameInternal = t, this.pageInternal = e[this.nameInternal] || [], this.idxInternal = 0;
    let u = { config: {} };
    n ? typeof n == "object" ? u = Object.assign({}, n) : u = n : u = { config: {} }, u.config && (u.config.pageToken = e.nextPageToken), this.paramsInternal = u, this.pageInternalSize = (l = (r = u.config) === null || r === void 0 ? void 0 : r.pageSize) !== null && l !== void 0 ? l : this.pageInternal.length;
  }
  initNextPage(t) {
    this.init(this.nameInternal, t, this.paramsInternal);
  }
  /**
   * Returns the current page, which is a list of items.
   *
   * @remarks
   * The first page is retrieved when the pager is created. The returned list of
   * items could be a subset of the entire list.
   */
  get page() {
    return this.pageInternal;
  }
  /**
   * Returns the type of paged item (for example, ``batch_jobs``).
   */
  get name() {
    return this.nameInternal;
  }
  /**
   * Returns the length of the page fetched each time by this pager.
   *
   * @remarks
   * The number of items in the page is less than or equal to the page length.
   */
  get pageSize() {
    return this.pageInternalSize;
  }
  /**
   * Returns the parameters when making the API request for the next page.
   *
   * @remarks
   * Parameters contain a set of optional configs that can be
   * used to customize the API request. For example, the `pageToken` parameter
   * contains the token to request the next page.
   */
  get params() {
    return this.paramsInternal;
  }
  /**
   * Returns the total number of items in the current page.
   */
  get pageLength() {
    return this.pageInternal.length;
  }
  /**
   * Returns the item at the given index.
   */
  getItem(t) {
    return this.pageInternal[t];
  }
  /**
   * Returns an async iterator that support iterating through all items
   * retrieved from the API.
   *
   * @remarks
   * The iterator will automatically fetch the next page if there are more items
   * to fetch from the API.
   *
   * @example
   *
   * ```ts
   * const pager = await ai.files.list({config: {pageSize: 10}});
   * for await (const file of pager) {
   *   console.log(file.name);
   * }
   * ```
   */
  [Symbol.asyncIterator]() {
    return {
      next: async () => {
        if (this.idxInternal >= this.pageLength)
          if (this.hasNextPage())
            await this.nextPage();
          else
            return { value: void 0, done: !0 };
        const t = this.getItem(this.idxInternal);
        return this.idxInternal += 1, { value: t, done: !1 };
      },
      return: async () => ({ value: void 0, done: !0 })
    };
  }
  /**
   * Fetches the next page of items. This makes a new API request.
   *
   * @throws {Error} If there are no more pages to fetch.
   *
   * @example
   *
   * ```ts
   * const pager = await ai.files.list({config: {pageSize: 10}});
   * let page = pager.page;
   * while (true) {
   *   for (const file of page) {
   *     console.log(file.name);
   *   }
   *   if (!pager.hasNextPage()) {
   *     break;
   *   }
   *   page = await pager.nextPage();
   * }
   * ```
   */
  async nextPage() {
    if (!this.hasNextPage())
      throw new Error("No more pages to fetch.");
    const t = await this.requestInternal(this.params);
    return this.initNextPage(t), this.page;
  }
  /**
   * Returns true if there are more pages to fetch from the API.
   */
  hasNextPage() {
    var t;
    return ((t = this.params.config) === null || t === void 0 ? void 0 : t.pageToken) !== void 0;
  }
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
var ye;
(function(o) {
  o.OUTCOME_UNSPECIFIED = "OUTCOME_UNSPECIFIED", o.OUTCOME_OK = "OUTCOME_OK", o.OUTCOME_FAILED = "OUTCOME_FAILED", o.OUTCOME_DEADLINE_EXCEEDED = "OUTCOME_DEADLINE_EXCEEDED";
})(ye || (ye = {}));
var Ce;
(function(o) {
  o.LANGUAGE_UNSPECIFIED = "LANGUAGE_UNSPECIFIED", o.PYTHON = "PYTHON";
})(Ce || (Ce = {}));
var Te;
(function(o) {
  o.TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED", o.STRING = "STRING", o.NUMBER = "NUMBER", o.INTEGER = "INTEGER", o.BOOLEAN = "BOOLEAN", o.ARRAY = "ARRAY", o.OBJECT = "OBJECT";
})(Te || (Te = {}));
var ve;
(function(o) {
  o.HARM_CATEGORY_UNSPECIFIED = "HARM_CATEGORY_UNSPECIFIED", o.HARM_CATEGORY_HATE_SPEECH = "HARM_CATEGORY_HATE_SPEECH", o.HARM_CATEGORY_DANGEROUS_CONTENT = "HARM_CATEGORY_DANGEROUS_CONTENT", o.HARM_CATEGORY_HARASSMENT = "HARM_CATEGORY_HARASSMENT", o.HARM_CATEGORY_SEXUALLY_EXPLICIT = "HARM_CATEGORY_SEXUALLY_EXPLICIT", o.HARM_CATEGORY_CIVIC_INTEGRITY = "HARM_CATEGORY_CIVIC_INTEGRITY";
})(ve || (ve = {}));
var Ee;
(function(o) {
  o.HARM_BLOCK_METHOD_UNSPECIFIED = "HARM_BLOCK_METHOD_UNSPECIFIED", o.SEVERITY = "SEVERITY", o.PROBABILITY = "PROBABILITY";
})(Ee || (Ee = {}));
var Ie;
(function(o) {
  o.HARM_BLOCK_THRESHOLD_UNSPECIFIED = "HARM_BLOCK_THRESHOLD_UNSPECIFIED", o.BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE", o.BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE", o.BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH", o.BLOCK_NONE = "BLOCK_NONE", o.OFF = "OFF";
})(Ie || (Ie = {}));
var xe;
(function(o) {
  o.MODE_UNSPECIFIED = "MODE_UNSPECIFIED", o.MODE_DYNAMIC = "MODE_DYNAMIC";
})(xe || (xe = {}));
var _e;
(function(o) {
  o.FINISH_REASON_UNSPECIFIED = "FINISH_REASON_UNSPECIFIED", o.STOP = "STOP", o.MAX_TOKENS = "MAX_TOKENS", o.SAFETY = "SAFETY", o.RECITATION = "RECITATION", o.OTHER = "OTHER", o.BLOCKLIST = "BLOCKLIST", o.PROHIBITED_CONTENT = "PROHIBITED_CONTENT", o.SPII = "SPII", o.MALFORMED_FUNCTION_CALL = "MALFORMED_FUNCTION_CALL", o.IMAGE_SAFETY = "IMAGE_SAFETY";
})(_e || (_e = {}));
var Se;
(function(o) {
  o.HARM_PROBABILITY_UNSPECIFIED = "HARM_PROBABILITY_UNSPECIFIED", o.NEGLIGIBLE = "NEGLIGIBLE", o.LOW = "LOW", o.MEDIUM = "MEDIUM", o.HIGH = "HIGH";
})(Se || (Se = {}));
var Ae;
(function(o) {
  o.HARM_SEVERITY_UNSPECIFIED = "HARM_SEVERITY_UNSPECIFIED", o.HARM_SEVERITY_NEGLIGIBLE = "HARM_SEVERITY_NEGLIGIBLE", o.HARM_SEVERITY_LOW = "HARM_SEVERITY_LOW", o.HARM_SEVERITY_MEDIUM = "HARM_SEVERITY_MEDIUM", o.HARM_SEVERITY_HIGH = "HARM_SEVERITY_HIGH";
})(Ae || (Ae = {}));
var we;
(function(o) {
  o.BLOCKED_REASON_UNSPECIFIED = "BLOCKED_REASON_UNSPECIFIED", o.SAFETY = "SAFETY", o.OTHER = "OTHER", o.BLOCKLIST = "BLOCKLIST", o.PROHIBITED_CONTENT = "PROHIBITED_CONTENT";
})(we || (we = {}));
var Me;
(function(o) {
  o.TRAFFIC_TYPE_UNSPECIFIED = "TRAFFIC_TYPE_UNSPECIFIED", o.ON_DEMAND = "ON_DEMAND", o.PROVISIONED_THROUGHPUT = "PROVISIONED_THROUGHPUT";
})(Me || (Me = {}));
var Y;
(function(o) {
  o.MODALITY_UNSPECIFIED = "MODALITY_UNSPECIFIED", o.TEXT = "TEXT", o.IMAGE = "IMAGE", o.AUDIO = "AUDIO";
})(Y || (Y = {}));
var Pe;
(function(o) {
  o.MEDIA_RESOLUTION_UNSPECIFIED = "MEDIA_RESOLUTION_UNSPECIFIED", o.MEDIA_RESOLUTION_LOW = "MEDIA_RESOLUTION_LOW", o.MEDIA_RESOLUTION_MEDIUM = "MEDIA_RESOLUTION_MEDIUM", o.MEDIA_RESOLUTION_HIGH = "MEDIA_RESOLUTION_HIGH";
})(Pe || (Pe = {}));
var Re;
(function(o) {
  o.FEATURE_SELECTION_PREFERENCE_UNSPECIFIED = "FEATURE_SELECTION_PREFERENCE_UNSPECIFIED", o.PRIORITIZE_QUALITY = "PRIORITIZE_QUALITY", o.BALANCED = "BALANCED", o.PRIORITIZE_COST = "PRIORITIZE_COST";
})(Re || (Re = {}));
var De;
(function(o) {
  o.MODE_UNSPECIFIED = "MODE_UNSPECIFIED", o.MODE_DYNAMIC = "MODE_DYNAMIC";
})(De || (De = {}));
var Ne;
(function(o) {
  o.MODE_UNSPECIFIED = "MODE_UNSPECIFIED", o.AUTO = "AUTO", o.ANY = "ANY", o.NONE = "NONE";
})(Ne || (Ne = {}));
var Fe;
(function(o) {
  o.BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE", o.BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE", o.BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH", o.BLOCK_NONE = "BLOCK_NONE";
})(Fe || (Fe = {}));
var Ve;
(function(o) {
  o.DONT_ALLOW = "DONT_ALLOW", o.ALLOW_ADULT = "ALLOW_ADULT", o.ALLOW_ALL = "ALLOW_ALL";
})(Ve || (Ve = {}));
var Ue;
(function(o) {
  o.auto = "auto", o.en = "en", o.ja = "ja", o.ko = "ko", o.hi = "hi";
})(Ue || (Ue = {}));
var Le;
(function(o) {
  o.STATE_UNSPECIFIED = "STATE_UNSPECIFIED", o.PROCESSING = "PROCESSING", o.ACTIVE = "ACTIVE", o.FAILED = "FAILED";
})(Le || (Le = {}));
var ke;
(function(o) {
  o.SOURCE_UNSPECIFIED = "SOURCE_UNSPECIFIED", o.UPLOADED = "UPLOADED", o.GENERATED = "GENERATED";
})(ke || (ke = {}));
var Ge;
(function(o) {
  o.MASK_MODE_DEFAULT = "MASK_MODE_DEFAULT", o.MASK_MODE_USER_PROVIDED = "MASK_MODE_USER_PROVIDED", o.MASK_MODE_BACKGROUND = "MASK_MODE_BACKGROUND", o.MASK_MODE_FOREGROUND = "MASK_MODE_FOREGROUND", o.MASK_MODE_SEMANTIC = "MASK_MODE_SEMANTIC";
})(Ge || (Ge = {}));
var qe;
(function(o) {
  o.CONTROL_TYPE_DEFAULT = "CONTROL_TYPE_DEFAULT", o.CONTROL_TYPE_CANNY = "CONTROL_TYPE_CANNY", o.CONTROL_TYPE_SCRIBBLE = "CONTROL_TYPE_SCRIBBLE", o.CONTROL_TYPE_FACE_MESH = "CONTROL_TYPE_FACE_MESH";
})(qe || (qe = {}));
var Be;
(function(o) {
  o.SUBJECT_TYPE_DEFAULT = "SUBJECT_TYPE_DEFAULT", o.SUBJECT_TYPE_PERSON = "SUBJECT_TYPE_PERSON", o.SUBJECT_TYPE_ANIMAL = "SUBJECT_TYPE_ANIMAL", o.SUBJECT_TYPE_PRODUCT = "SUBJECT_TYPE_PRODUCT";
})(Be || (Be = {}));
var $e;
(function(o) {
  o.MODALITY_UNSPECIFIED = "MODALITY_UNSPECIFIED", o.TEXT = "TEXT", o.IMAGE = "IMAGE", o.VIDEO = "VIDEO", o.AUDIO = "AUDIO", o.DOCUMENT = "DOCUMENT";
})($e || ($e = {}));
var He;
(function(o) {
  o.START_SENSITIVITY_UNSPECIFIED = "START_SENSITIVITY_UNSPECIFIED", o.START_SENSITIVITY_HIGH = "START_SENSITIVITY_HIGH", o.START_SENSITIVITY_LOW = "START_SENSITIVITY_LOW";
})(He || (He = {}));
var Ye;
(function(o) {
  o.END_SENSITIVITY_UNSPECIFIED = "END_SENSITIVITY_UNSPECIFIED", o.END_SENSITIVITY_HIGH = "END_SENSITIVITY_HIGH", o.END_SENSITIVITY_LOW = "END_SENSITIVITY_LOW";
})(Ye || (Ye = {}));
var ze;
(function(o) {
  o.ACTIVITY_HANDLING_UNSPECIFIED = "ACTIVITY_HANDLING_UNSPECIFIED", o.START_OF_ACTIVITY_INTERRUPTS = "START_OF_ACTIVITY_INTERRUPTS", o.NO_INTERRUPTION = "NO_INTERRUPTION";
})(ze || (ze = {}));
var Ke;
(function(o) {
  o.TURN_COVERAGE_UNSPECIFIED = "TURN_COVERAGE_UNSPECIFIED", o.TURN_INCLUDES_ONLY_ACTIVITY = "TURN_INCLUDES_ONLY_ACTIVITY", o.TURN_INCLUDES_ALL_INPUT = "TURN_INCLUDES_ALL_INPUT";
})(Ke || (Ke = {}));
class K {
  /**
   * Returns the concatenation of all text parts from the first candidate in the response.
   *
   * @remarks
   * If there are multiple candidates in the response, the text from the first
   * one will be returned.
   * If there are non-text parts in the response, the concatenation of all text
   * parts will be returned, and a warning will be logged.
   * If there are thought parts in the response, the concatenation of all text
   * parts excluding the thought parts will be returned.
   *
   * @example
   * ```ts
   * const response = await ai.models.generateContent({
   *   model: 'gemini-2.0-flash',
   *   contents:
   *     'Why is the sky blue?',
   * });
   *
   * console.debug(response.text);
   * ```
   */
  get text() {
    var t, e, n, r, l, u, a, c;
    if (((r = (n = (e = (t = this.candidates) === null || t === void 0 ? void 0 : t[0]) === null || e === void 0 ? void 0 : e.content) === null || n === void 0 ? void 0 : n.parts) === null || r === void 0 ? void 0 : r.length) === 0)
      return;
    this.candidates && this.candidates.length > 1 && console.warn("there are multiple candidates in the response, returning text from the first one.");
    let d = "", f = !1;
    const p = [];
    for (const h of (c = (a = (u = (l = this.candidates) === null || l === void 0 ? void 0 : l[0]) === null || u === void 0 ? void 0 : u.content) === null || a === void 0 ? void 0 : a.parts) !== null && c !== void 0 ? c : []) {
      for (const [m, g] of Object.entries(h))
        m !== "text" && m !== "thought" && (g !== null || g !== void 0) && p.push(m);
      if (typeof h.text == "string") {
        if (typeof h.thought == "boolean" && h.thought)
          continue;
        f = !0, d += h.text;
      }
    }
    return p.length > 0 && console.warn(`there are non-text parts ${p} in the response, returning concatenation of all text parts. Please refer to the non text parts for a full response from model.`), f ? d : void 0;
  }
  /**
   * Returns the function calls from the first candidate in the response.
   *
   * @remarks
   * If there are multiple candidates in the response, the function calls from
   * the first one will be returned.
   * If there are no function calls in the response, undefined will be returned.
   *
   * @example
   * ```ts
   * const controlLightFunctionDeclaration: FunctionDeclaration = {
   *   name: 'controlLight',
   *   parameters: {
   *   type: Type.OBJECT,
   *   description: 'Set the brightness and color temperature of a room light.',
   *   properties: {
   *     brightness: {
   *       type: Type.NUMBER,
   *       description:
   *         'Light level from 0 to 100. Zero is off and 100 is full brightness.',
   *     },
   *     colorTemperature: {
   *       type: Type.STRING,
   *       description:
   *         'Color temperature of the light fixture which can be `daylight`, `cool` or `warm`.',
   *     },
   *   },
   *   required: ['brightness', 'colorTemperature'],
   *  };
   *  const response = await ai.models.generateContent({
   *     model: 'gemini-2.0-flash',
   *     contents: 'Dim the lights so the room feels cozy and warm.',
   *     config: {
   *       tools: [{functionDeclarations: [controlLightFunctionDeclaration]}],
   *       toolConfig: {
   *         functionCallingConfig: {
   *           mode: FunctionCallingConfigMode.ANY,
   *           allowedFunctionNames: ['controlLight'],
   *         },
   *       },
   *     },
   *   });
   *  console.debug(JSON.stringify(response.functionCalls));
   * ```
   */
  get functionCalls() {
    var t, e, n, r, l, u, a, c;
    if (((r = (n = (e = (t = this.candidates) === null || t === void 0 ? void 0 : t[0]) === null || e === void 0 ? void 0 : e.content) === null || n === void 0 ? void 0 : n.parts) === null || r === void 0 ? void 0 : r.length) === 0)
      return;
    this.candidates && this.candidates.length > 1 && console.warn("there are multiple candidates in the response, returning function calls from the first one.");
    const d = (c = (a = (u = (l = this.candidates) === null || l === void 0 ? void 0 : l[0]) === null || u === void 0 ? void 0 : u.content) === null || a === void 0 ? void 0 : a.parts) === null || c === void 0 ? void 0 : c.filter((f) => f.functionCall).map((f) => f.functionCall).filter((f) => f !== void 0);
    if (d?.length !== 0)
      return d;
  }
  /**
   * Returns the first executable code from the first candidate in the response.
   *
   * @remarks
   * If there are multiple candidates in the response, the executable code from
   * the first one will be returned.
   * If there are no executable code in the response, undefined will be
   * returned.
   *
   * @example
   * ```ts
   * const response = await ai.models.generateContent({
   *   model: 'gemini-2.0-flash',
   *   contents:
   *     'What is the sum of the first 50 prime numbers? Generate and run code for the calculation, and make sure you get all 50.'
   *   config: {
   *     tools: [{codeExecution: {}}],
   *   },
   * });
   *
   * console.debug(response.executableCode);
   * ```
   */
  get executableCode() {
    var t, e, n, r, l, u, a, c, d;
    if (((r = (n = (e = (t = this.candidates) === null || t === void 0 ? void 0 : t[0]) === null || e === void 0 ? void 0 : e.content) === null || n === void 0 ? void 0 : n.parts) === null || r === void 0 ? void 0 : r.length) === 0)
      return;
    this.candidates && this.candidates.length > 1 && console.warn("there are multiple candidates in the response, returning executable code from the first one.");
    const f = (c = (a = (u = (l = this.candidates) === null || l === void 0 ? void 0 : l[0]) === null || u === void 0 ? void 0 : u.content) === null || a === void 0 ? void 0 : a.parts) === null || c === void 0 ? void 0 : c.filter((p) => p.executableCode).map((p) => p.executableCode).filter((p) => p !== void 0);
    if (f?.length !== 0)
      return (d = f?.[0]) === null || d === void 0 ? void 0 : d.code;
  }
  /**
   * Returns the first code execution result from the first candidate in the response.
   *
   * @remarks
   * If there are multiple candidates in the response, the code execution result from
   * the first one will be returned.
   * If there are no code execution result in the response, undefined will be returned.
   *
   * @example
   * ```ts
   * const response = await ai.models.generateContent({
   *   model: 'gemini-2.0-flash',
   *   contents:
   *     'What is the sum of the first 50 prime numbers? Generate and run code for the calculation, and make sure you get all 50.'
   *   config: {
   *     tools: [{codeExecution: {}}],
   *   },
   * });
   *
   * console.debug(response.codeExecutionResult);
   * ```
   */
  get codeExecutionResult() {
    var t, e, n, r, l, u, a, c, d;
    if (((r = (n = (e = (t = this.candidates) === null || t === void 0 ? void 0 : t[0]) === null || e === void 0 ? void 0 : e.content) === null || n === void 0 ? void 0 : n.parts) === null || r === void 0 ? void 0 : r.length) === 0)
      return;
    this.candidates && this.candidates.length > 1 && console.warn("there are multiple candidates in the response, returning code execution result from the first one.");
    const f = (c = (a = (u = (l = this.candidates) === null || l === void 0 ? void 0 : l[0]) === null || u === void 0 ? void 0 : u.content) === null || a === void 0 ? void 0 : a.parts) === null || c === void 0 ? void 0 : c.filter((p) => p.codeExecutionResult).map((p) => p.codeExecutionResult).filter((p) => p !== void 0);
    if (f?.length !== 0)
      return (d = f?.[0]) === null || d === void 0 ? void 0 : d.output;
  }
}
class We {
}
class Je {
}
class Xe {
}
class vn {
}
class Qe {
}
class Ze {
}
class En {
}
class se {
  constructor(t) {
    const e = {};
    for (const n of t.headers.entries())
      e[n[0]] = n[1];
    this.headers = e, this.responseInternal = t;
  }
  json() {
    return this.responseInternal.json();
  }
}
class In {
}
class xn {
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class _n extends j {
  constructor(t) {
    super(), this.apiClient = t, this.list = async (e = {}) => new It(O.PAGED_ITEM_CACHED_CONTENTS, (n) => this.listInternal(n), await this.listInternal(e), e);
  }
  /**
   * Creates a cached contents resource.
   *
   * @remarks
   * Context caching is only supported for specific models. See [Gemini
   * Developer API reference](https://ai.google.dev/gemini-api/docs/caching?lang=node/context-cac)
   * and [Vertex AI reference](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-overview#supported_models)
   * for more information.
   *
   * @param params - The parameters for the create request.
   * @return The created cached content.
   *
   * @example
   * ```ts
   * const contents = ...; // Initialize the content to cache.
   * const response = await ai.caches.create({
   *   model: 'gemini-1.5-flash',
   *   config: {
   *    'contents': contents,
   *    'displayName': 'test cache',
   *    'systemInstruction': 'What is the sum of the two pdfs?',
   *    'ttl': '86400s',
   *  }
   * });
   * ```
   */
  async create(t) {
    var e, n;
    let r, l = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const a = un(this.apiClient, t);
      return l = E("cachedContents", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((c) => c.json()), r.then((c) => Z(this.apiClient, c));
    } else {
      const a = Kt(this.apiClient, t);
      return l = E("cachedContents", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (n = t.config) === null || n === void 0 ? void 0 : n.httpOptions
      }).then((c) => c.json()), r.then((c) => Q(this.apiClient, c));
    }
  }
  /**
   * Gets cached content configurations.
   *
   * @param params - The parameters for the get request.
   * @return The cached content.
   *
   * @example
   * ```ts
   * await ai.caches.get({name: 'gemini-1.5-flash'});
   * ```
   */
  async get(t) {
    var e, n;
    let r, l = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const a = cn(this.apiClient, t);
      return l = E("{name}", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "GET",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((c) => c.json()), r.then((c) => Z(this.apiClient, c));
    } else {
      const a = Wt(this.apiClient, t);
      return l = E("{name}", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "GET",
        httpOptions: (n = t.config) === null || n === void 0 ? void 0 : n.httpOptions
      }).then((c) => c.json()), r.then((c) => Q(this.apiClient, c));
    }
  }
  /**
   * Deletes cached content.
   *
   * @param params - The parameters for the delete request.
   * @return The empty response returned by the API.
   *
   * @example
   * ```ts
   * await ai.caches.delete({name: 'gemini-1.5-flash'});
   * ```
   */
  async delete(t) {
    var e, n;
    let r, l = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const a = dn(this.apiClient, t);
      return l = E("{name}", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "DELETE",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((c) => c.json()), r.then(() => {
        const c = Cn(), d = new Qe();
        return Object.assign(d, c), d;
      });
    } else {
      const a = Jt(this.apiClient, t);
      return l = E("{name}", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "DELETE",
        httpOptions: (n = t.config) === null || n === void 0 ? void 0 : n.httpOptions
      }).then((c) => c.json()), r.then(() => {
        const c = gn(), d = new Qe();
        return Object.assign(d, c), d;
      });
    }
  }
  /**
   * Updates cached content configurations.
   *
   * @param params - The parameters for the update request.
   * @return The updated cached content.
   *
   * @example
   * ```ts
   * const response = await ai.caches.update({
   *   name: 'gemini-1.5-flash',
   *   config: {'ttl': '7600s'}
   * });
   * ```
   */
  async update(t) {
    var e, n;
    let r, l = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const a = pn(this.apiClient, t);
      return l = E("{name}", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "PATCH",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((c) => c.json()), r.then((c) => Z(this.apiClient, c));
    } else {
      const a = Qt(this.apiClient, t);
      return l = E("{name}", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "PATCH",
        httpOptions: (n = t.config) === null || n === void 0 ? void 0 : n.httpOptions
      }).then((c) => c.json()), r.then((c) => Q(this.apiClient, c));
    }
  }
  async listInternal(t) {
    var e, n;
    let r, l = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const a = hn(this.apiClient, t);
      return l = E("cachedContents", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "GET",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((c) => c.json()), r.then((c) => {
        const d = Tn(this.apiClient, c), f = new Ze();
        return Object.assign(f, d), f;
      });
    } else {
      const a = Ot(this.apiClient, t);
      return l = E("cachedContents", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "GET",
        httpOptions: (n = t.config) === null || n === void 0 ? void 0 : n.httpOptions
      }).then((c) => c.json()), r.then((c) => {
        const d = yn(this.apiClient, c), f = new Ze();
        return Object.assign(f, d), f;
      });
    }
  }
}
function Oe(o) {
  var t = typeof Symbol == "function" && Symbol.iterator, e = t && o[t], n = 0;
  if (e) return e.call(o);
  if (o && typeof o.length == "number") return {
    next: function() {
      return o && n >= o.length && (o = void 0), { value: o && o[n++], done: !o };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function M(o) {
  return this instanceof M ? (this.v = o, this) : new M(o);
}
function b(o, t, e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = e.apply(o, t || []), r, l = [];
  return r = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), a("next"), a("throw"), a("return", u), r[Symbol.asyncIterator] = function() {
    return this;
  }, r;
  function u(m) {
    return function(g) {
      return Promise.resolve(g).then(m, p);
    };
  }
  function a(m, g) {
    n[m] && (r[m] = function(y) {
      return new Promise(function(C, T) {
        l.push([m, y, C, T]) > 1 || c(m, y);
      });
    }, g && (r[m] = g(r[m])));
  }
  function c(m, g) {
    try {
      d(n[m](g));
    } catch (y) {
      h(l[0][3], y);
    }
  }
  function d(m) {
    m.value instanceof M ? Promise.resolve(m.value.v).then(f, p) : h(l[0][2], m);
  }
  function f(m) {
    c("next", m);
  }
  function p(m) {
    c("throw", m);
  }
  function h(m, g) {
    m(g), l.shift(), l.length && c(l[0][0], l[0][1]);
  }
}
function re(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = o[Symbol.asyncIterator], e;
  return t ? t.call(o) : (o = typeof Oe == "function" ? Oe(o) : o[Symbol.iterator](), e = {}, n("next"), n("throw"), n("return"), e[Symbol.asyncIterator] = function() {
    return this;
  }, e);
  function n(l) {
    e[l] = o[l] && function(u) {
      return new Promise(function(a, c) {
        u = o[l](u), r(a, c, u.done, u.value);
      });
    };
  }
  function r(l, u, a, c) {
    Promise.resolve(c).then(function(d) {
      l({ value: d, done: a });
    }, u);
  }
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function Sn(o) {
  var t;
  if (o.candidates == null || o.candidates.length === 0)
    return !1;
  const e = (t = o.candidates[0]) === null || t === void 0 ? void 0 : t.content;
  return e === void 0 ? !1 : xt(e);
}
function xt(o) {
  if (o.parts === void 0 || o.parts.length === 0)
    return !1;
  for (const t of o.parts)
    if (t === void 0 || Object.keys(t).length === 0 || t.text !== void 0 && t.text === "")
      return !1;
  return !0;
}
function An(o) {
  if (o.length !== 0) {
    if (o[0].role !== "user")
      throw new Error("History must start with a user turn.");
    for (const t of o)
      if (t.role !== "user" && t.role !== "model")
        throw new Error(`Role must be user or model, but got ${t.role}.`);
  }
}
function wn(o) {
  if (o === void 0 || o.length === 0)
    return [];
  const t = [], e = o.length;
  let n = 0, r = o[0];
  for (; n < e; )
    if (o[n].role === "user")
      r = o[n], n++;
    else {
      const l = [];
      let u = !0;
      for (; n < e && o[n].role === "model"; )
        l.push(o[n]), u && !xt(o[n]) && (u = !1), n++;
      u && (t.push(r), t.push(...l));
    }
  return t;
}
class Mn {
  constructor(t, e) {
    this.modelsModule = t, this.apiClient = e;
  }
  /**
   * Creates a new chat session.
   *
   * @remarks
   * The config in the params will be used for all requests within the chat
   * session unless overridden by a per-request `config` in
   * @see {@link types.SendMessageParameters#config}.
   *
   * @param params - Parameters for creating a chat session.
   * @returns A new chat session.
   *
   * @example
   * ```ts
   * const chat = ai.chats.create({
   *   model: 'gemini-2.0-flash'
   *   config: {
   *     temperature: 0.5,
   *     maxOutputTokens: 1024,
   *   }
   * });
   * ```
   */
  create(t) {
    return new Pn(this.apiClient, this.modelsModule, t.model, t.config, t.history);
  }
}
class Pn {
  constructor(t, e, n, r = {}, l = []) {
    this.apiClient = t, this.modelsModule = e, this.model = n, this.config = r, this.history = l, this.sendPromise = Promise.resolve(), An(l);
  }
  /**
   * Sends a message to the model and returns the response.
   *
   * @remarks
   * This method will wait for the previous message to be processed before
   * sending the next message.
   *
   * @see {@link Chat#sendMessageStream} for streaming method.
   * @param params - parameters for sending messages within a chat session.
   * @returns The model's response.
   *
   * @example
   * ```ts
   * const chat = ai.chats.create({model: 'gemini-2.0-flash'});
   * const response = await chat.sendMessage({
   *   message: 'Why is the sky blue?'
   * });
   * console.log(response.text);
   * ```
   */
  async sendMessage(t) {
    var e;
    await this.sendPromise;
    const n = F(this.apiClient, t.message), r = this.modelsModule.generateContent({
      model: this.model,
      contents: this.getHistory(!0).concat(n),
      config: (e = t.config) !== null && e !== void 0 ? e : this.config
    });
    return this.sendPromise = (async () => {
      var l, u;
      const c = (u = (l = (await r).candidates) === null || l === void 0 ? void 0 : l[0]) === null || u === void 0 ? void 0 : u.content, d = c ? [c] : [];
      this.recordHistory(n, d);
    })(), await this.sendPromise, r;
  }
  /**
   * Sends a message to the model and returns the response in chunks.
   *
   * @remarks
   * This method will wait for the previous message to be processed before
   * sending the next message.
   *
   * @see {@link Chat#sendMessage} for non-streaming method.
   * @param params - parameters for sending the message.
   * @return The model's response.
   *
   * @example
   * ```ts
   * const chat = ai.chats.create({model: 'gemini-2.0-flash'});
   * const response = await chat.sendMessageStream({
   *   message: 'Why is the sky blue?'
   * });
   * for await (const chunk of response) {
   *   console.log(chunk.text);
   * }
   * ```
   */
  async sendMessageStream(t) {
    var e;
    await this.sendPromise;
    const n = F(this.apiClient, t.message), r = this.modelsModule.generateContentStream({
      model: this.model,
      contents: this.getHistory(!0).concat(n),
      config: (e = t.config) !== null && e !== void 0 ? e : this.config
    });
    this.sendPromise = r.then(() => {
    });
    const l = await r;
    return this.processStreamResponse(l, n);
  }
  /**
   * Returns the chat history.
   *
   * @remarks
   * The history is a list of contents alternating between user and model.
   *
   * There are two types of history:
   * - The `curated history` contains only the valid turns between user and
   * model, which will be included in the subsequent requests sent to the model.
   * - The `comprehensive history` contains all turns, including invalid or
   *   empty model outputs, providing a complete record of the history.
   *
   * The history is updated after receiving the response from the model,
   * for streaming response, it means receiving the last chunk of the response.
   *
   * The `comprehensive history` is returned by default. To get the `curated
   * history`, set the `curated` parameter to `true`.
   *
   * @param curated - whether to return the curated history or the comprehensive
   *     history.
   * @return History contents alternating between user and model for the entire
   *     chat session.
   */
  getHistory(t = !1) {
    return t ? wn(this.history) : this.history;
  }
  processStreamResponse(t, e) {
    var n, r;
    return b(this, arguments, function* () {
      var u, a, c, d;
      const f = [];
      try {
        for (var p = !0, h = re(t), m; m = yield M(h.next()), u = m.done, !u; p = !0) {
          d = m.value, p = !1;
          const g = d;
          if (Sn(g)) {
            const y = (r = (n = g.candidates) === null || n === void 0 ? void 0 : n[0]) === null || r === void 0 ? void 0 : r.content;
            y !== void 0 && f.push(y);
          }
          yield yield M(g);
        }
      } catch (g) {
        a = { error: g };
      } finally {
        try {
          !p && !u && (c = h.return) && (yield M(c.call(h)));
        } finally {
          if (a) throw a.error;
        }
      }
      this.recordHistory(e, f);
    });
  }
  recordHistory(t, e) {
    let n = [];
    e.length > 0 && e.every((r) => r.role === "model") ? n = e : n.push({
      role: "model",
      parts: []
    }), this.history.push(t), this.history.push(...n);
  }
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function Rn(o, t, e) {
  const n = {}, r = s(t, ["pageSize"]);
  e !== void 0 && r != null && i(e, ["_query", "pageSize"], r);
  const l = s(t, ["pageToken"]);
  return e !== void 0 && l != null && i(e, ["_query", "pageToken"], l), n;
}
function Dn(o, t) {
  const e = {}, n = s(t, ["config"]);
  return n != null && i(e, ["config"], Rn(o, n, e)), e;
}
function Nn(o, t) {
  const e = {}, n = s(t, ["details"]);
  n != null && i(e, ["details"], n);
  const r = s(t, ["message"]);
  r != null && i(e, ["message"], r);
  const l = s(t, ["code"]);
  return l != null && i(e, ["code"], l), e;
}
function Fn(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["name"], n);
  const r = s(t, ["displayName"]);
  r != null && i(e, ["displayName"], r);
  const l = s(t, ["mimeType"]);
  l != null && i(e, ["mimeType"], l);
  const u = s(t, ["sizeBytes"]);
  u != null && i(e, ["sizeBytes"], u);
  const a = s(t, ["createTime"]);
  a != null && i(e, ["createTime"], a);
  const c = s(t, [
    "expirationTime"
  ]);
  c != null && i(e, ["expirationTime"], c);
  const d = s(t, ["updateTime"]);
  d != null && i(e, ["updateTime"], d);
  const f = s(t, ["sha256Hash"]);
  f != null && i(e, ["sha256Hash"], f);
  const p = s(t, ["uri"]);
  p != null && i(e, ["uri"], p);
  const h = s(t, ["downloadUri"]);
  h != null && i(e, ["downloadUri"], h);
  const m = s(t, ["state"]);
  m != null && i(e, ["state"], m);
  const g = s(t, ["source"]);
  g != null && i(e, ["source"], g);
  const y = s(t, [
    "videoMetadata"
  ]);
  y != null && i(e, ["videoMetadata"], y);
  const C = s(t, ["error"]);
  return C != null && i(e, ["error"], Nn(o, C)), e;
}
function Vn(o, t) {
  const e = {}, n = s(t, ["file"]);
  n != null && i(e, ["file"], Fn(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], r), e;
}
function Un(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["_url", "file"], Et(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], r), e;
}
function Ln(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["_url", "file"], Et(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], r), e;
}
function kn(o, t) {
  const e = {}, n = s(t, ["details"]);
  n != null && i(e, ["details"], n);
  const r = s(t, ["message"]);
  r != null && i(e, ["message"], r);
  const l = s(t, ["code"]);
  return l != null && i(e, ["code"], l), e;
}
function le(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["name"], n);
  const r = s(t, ["displayName"]);
  r != null && i(e, ["displayName"], r);
  const l = s(t, ["mimeType"]);
  l != null && i(e, ["mimeType"], l);
  const u = s(t, ["sizeBytes"]);
  u != null && i(e, ["sizeBytes"], u);
  const a = s(t, ["createTime"]);
  a != null && i(e, ["createTime"], a);
  const c = s(t, [
    "expirationTime"
  ]);
  c != null && i(e, ["expirationTime"], c);
  const d = s(t, ["updateTime"]);
  d != null && i(e, ["updateTime"], d);
  const f = s(t, ["sha256Hash"]);
  f != null && i(e, ["sha256Hash"], f);
  const p = s(t, ["uri"]);
  p != null && i(e, ["uri"], p);
  const h = s(t, ["downloadUri"]);
  h != null && i(e, ["downloadUri"], h);
  const m = s(t, ["state"]);
  m != null && i(e, ["state"], m);
  const g = s(t, ["source"]);
  g != null && i(e, ["source"], g);
  const y = s(t, [
    "videoMetadata"
  ]);
  y != null && i(e, ["videoMetadata"], y);
  const C = s(t, ["error"]);
  return C != null && i(e, ["error"], kn(o, C)), e;
}
function Gn(o, t) {
  const e = {}, n = s(t, [
    "nextPageToken"
  ]);
  n != null && i(e, ["nextPageToken"], n);
  const r = s(t, ["files"]);
  return r != null && (Array.isArray(r) ? i(e, ["files"], r.map((l) => le(o, l))) : i(e, ["files"], r)), e;
}
function qn() {
  return {};
}
function Bn() {
  return {};
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class $n extends j {
  constructor(t) {
    super(), this.apiClient = t, this.list = async (e = {}) => new It(O.PAGED_ITEM_FILES, (n) => this.listInternal(n), await this.listInternal(e), e);
  }
  /**
   * Uploads a file asynchronously to the Gemini API.
   * This method is not available in Vertex AI.
   * Supported upload sources:
   * - Node.js: File path (string) or Blob object.
   * - Browser: Blob object (e.g., File).
   *
   * @remarks
   * The `mimeType` can be specified in the `config` parameter. If omitted:
   *  - For file path (string) inputs, the `mimeType` will be inferred from the
   *     file extension.
   *  - For Blob object inputs, the `mimeType` will be set to the Blob's `type`
   *     property.
   * Somex eamples for file extension to mimeType mapping:
   * .txt -> text/plain
   * .json -> application/json
   * .jpg  -> image/jpeg
   * .png -> image/png
   * .mp3 -> audio/mpeg
   * .mp4 -> video/mp4
   *
   * This section can contain multiple paragraphs and code examples.
   *
   * @param params - Optional parameters specified in the
   *        `types.UploadFileParameters` interface.
   *         @see {@link types.UploadFileParameters#config} for the optional
   *         config in the parameters.
   * @return A promise that resolves to a `types.File` object.
   * @throws An error if called on a Vertex AI client.
   * @throws An error if the `mimeType` is not provided and can not be inferred,
   * the `mimeType` can be provided in the `params.config` parameter.
   * @throws An error occurs if a suitable upload location cannot be established.
   *
   * @example
   * The following code uploads a file to Gemini API.
   *
   * ```ts
   * const file = await ai.files.upload({file: 'file.txt', config: {
   *   mimeType: 'text/plain',
   * }});
   * console.log(file.name);
   * ```
   */
  async upload(t) {
    if (this.apiClient.isVertexAI())
      throw new Error("Vertex AI does not support uploading files. You can share files through a GCS bucket.");
    return this.apiClient.uploadFile(t.file, t.config).then((e) => le(this.apiClient, e));
  }
  async listInternal(t) {
    var e;
    let n, r = "", l = {};
    if (this.apiClient.isVertexAI())
      throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const u = Dn(this.apiClient, t);
      return r = E("files", u._url), l = u._query, delete u.config, delete u._url, delete u._query, n = this.apiClient.request({
        path: r,
        queryParams: l,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((a) => a.json()), n.then((a) => {
        const c = Gn(this.apiClient, a), d = new En();
        return Object.assign(d, c), d;
      });
    }
  }
  async createInternal(t) {
    var e;
    let n, r = "", l = {};
    if (this.apiClient.isVertexAI())
      throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const u = Vn(this.apiClient, t);
      return r = E("upload/v1beta/files", u._url), l = u._query, delete u.config, delete u._url, delete u._query, n = this.apiClient.request({
        path: r,
        queryParams: l,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((a) => a.json()), n.then(() => {
        const a = qn(), c = new In();
        return Object.assign(c, a), c;
      });
    }
  }
  /**
   * Retrieves the file information from the service.
   *
   * @param params - The parameters for the get request
   * @return The Promise that resolves to the types.File object requested.
   *
   * @example
   * ```ts
   * const config: GetFileParameters = {
   *   name: fileName,
   * };
   * file = await ai.files.get(config);
   * console.log(file.name);
   * ```
   */
  async get(t) {
    var e;
    let n, r = "", l = {};
    if (this.apiClient.isVertexAI())
      throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const u = Un(this.apiClient, t);
      return r = E("files/{file}", u._url), l = u._query, delete u.config, delete u._url, delete u._query, n = this.apiClient.request({
        path: r,
        queryParams: l,
        body: JSON.stringify(u),
        httpMethod: "GET",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((a) => a.json()), n.then((a) => le(this.apiClient, a));
    }
  }
  /**
   * Deletes a remotely stored file.
   *
   * @param params - The parameters for the delete request.
   * @return The DeleteFileResponse, the response for the delete method.
   *
   * @example
   * The following code deletes an example file named "files/mehozpxf877d".
   *
   * ```ts
   * await ai.files.delete({name: file.name});
   * ```
   */
  async delete(t) {
    var e;
    let n, r = "", l = {};
    if (this.apiClient.isVertexAI())
      throw new Error("This method is only supported by the Gemini Developer API.");
    {
      const u = Ln(this.apiClient, t);
      return r = E("files/{file}", u._url), l = u._query, delete u.config, delete u._url, delete u._query, n = this.apiClient.request({
        path: r,
        queryParams: l,
        body: JSON.stringify(u),
        httpMethod: "DELETE",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((a) => a.json()), n.then(() => {
        const a = Bn(), c = new xn();
        return Object.assign(c, a), c;
      });
    }
  }
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function Hn(o, t) {
  const e = {};
  if (s(t, ["videoMetadata"]) !== void 0)
    throw new Error("videoMetadata parameter is not supported in Gemini API.");
  const n = s(t, ["thought"]);
  n != null && i(e, ["thought"], n);
  const r = s(t, [
    "codeExecutionResult"
  ]);
  r != null && i(e, ["codeExecutionResult"], r);
  const l = s(t, [
    "executableCode"
  ]);
  l != null && i(e, ["executableCode"], l);
  const u = s(t, ["fileData"]);
  u != null && i(e, ["fileData"], u);
  const a = s(t, ["functionCall"]);
  a != null && i(e, ["functionCall"], a);
  const c = s(t, [
    "functionResponse"
  ]);
  c != null && i(e, ["functionResponse"], c);
  const d = s(t, ["inlineData"]);
  d != null && i(e, ["inlineData"], d);
  const f = s(t, ["text"]);
  return f != null && i(e, ["text"], f), e;
}
function Yn(o, t) {
  const e = {}, n = s(t, [
    "videoMetadata"
  ]);
  n != null && i(e, ["videoMetadata"], n);
  const r = s(t, ["thought"]);
  r != null && i(e, ["thought"], r);
  const l = s(t, [
    "codeExecutionResult"
  ]);
  l != null && i(e, ["codeExecutionResult"], l);
  const u = s(t, [
    "executableCode"
  ]);
  u != null && i(e, ["executableCode"], u);
  const a = s(t, ["fileData"]);
  a != null && i(e, ["fileData"], a);
  const c = s(t, ["functionCall"]);
  c != null && i(e, ["functionCall"], c);
  const d = s(t, [
    "functionResponse"
  ]);
  d != null && i(e, ["functionResponse"], d);
  const f = s(t, ["inlineData"]);
  f != null && i(e, ["inlineData"], f);
  const p = s(t, ["text"]);
  return p != null && i(e, ["text"], p), e;
}
function zn(o, t) {
  const e = {}, n = s(t, ["parts"]);
  n != null && (Array.isArray(n) ? i(e, ["parts"], n.map((l) => Hn(o, l))) : i(e, ["parts"], n));
  const r = s(t, ["role"]);
  return r != null && i(e, ["role"], r), e;
}
function Kn(o, t) {
  const e = {}, n = s(t, ["parts"]);
  n != null && (Array.isArray(n) ? i(e, ["parts"], n.map((l) => Yn(o, l))) : i(e, ["parts"], n));
  const r = s(t, ["role"]);
  return r != null && i(e, ["role"], r), e;
}
function Wn(o, t) {
  const e = {}, n = s(t, ["example"]);
  n != null && i(e, ["example"], n);
  const r = s(t, ["pattern"]);
  r != null && i(e, ["pattern"], r);
  const l = s(t, ["default"]);
  l != null && i(e, ["default"], l);
  const u = s(t, ["maxLength"]);
  u != null && i(e, ["maxLength"], u);
  const a = s(t, ["minLength"]);
  a != null && i(e, ["minLength"], a);
  const c = s(t, [
    "minProperties"
  ]);
  c != null && i(e, ["minProperties"], c);
  const d = s(t, [
    "maxProperties"
  ]);
  d != null && i(e, ["maxProperties"], d);
  const f = s(t, ["anyOf"]);
  f != null && i(e, ["anyOf"], f);
  const p = s(t, ["description"]);
  p != null && i(e, ["description"], p);
  const h = s(t, ["enum"]);
  h != null && i(e, ["enum"], h);
  const m = s(t, ["format"]);
  m != null && i(e, ["format"], m);
  const g = s(t, ["items"]);
  g != null && i(e, ["items"], g);
  const y = s(t, ["maxItems"]);
  y != null && i(e, ["maxItems"], y);
  const C = s(t, ["maximum"]);
  C != null && i(e, ["maximum"], C);
  const T = s(t, ["minItems"]);
  T != null && i(e, ["minItems"], T);
  const v = s(t, ["minimum"]);
  v != null && i(e, ["minimum"], v);
  const x = s(t, ["nullable"]);
  x != null && i(e, ["nullable"], x);
  const I = s(t, ["properties"]);
  I != null && i(e, ["properties"], I);
  const A = s(t, [
    "propertyOrdering"
  ]);
  A != null && i(e, ["propertyOrdering"], A);
  const R = s(t, ["required"]);
  R != null && i(e, ["required"], R);
  const D = s(t, ["title"]);
  D != null && i(e, ["title"], D);
  const N = s(t, ["type"]);
  return N != null && i(e, ["type"], N), e;
}
function Jn(o, t) {
  const e = {};
  if (s(t, ["response"]) !== void 0)
    throw new Error("response parameter is not supported in Gemini API.");
  const n = s(t, ["description"]);
  n != null && i(e, ["description"], n);
  const r = s(t, ["name"]);
  r != null && i(e, ["name"], r);
  const l = s(t, ["parameters"]);
  return l != null && i(e, ["parameters"], l), e;
}
function Xn(o, t) {
  const e = {}, n = s(t, ["response"]);
  n != null && i(e, ["response"], Wn(o, n));
  const r = s(t, ["description"]);
  r != null && i(e, ["description"], r);
  const l = s(t, ["name"]);
  l != null && i(e, ["name"], l);
  const u = s(t, ["parameters"]);
  return u != null && i(e, ["parameters"], u), e;
}
function Qn() {
  return {};
}
function Zn() {
  return {};
}
function On(o, t) {
  const e = {}, n = s(t, ["mode"]);
  n != null && i(e, ["mode"], n);
  const r = s(t, [
    "dynamicThreshold"
  ]);
  return r != null && i(e, ["dynamicThreshold"], r), e;
}
function bn(o, t) {
  const e = {}, n = s(t, ["mode"]);
  n != null && i(e, ["mode"], n);
  const r = s(t, [
    "dynamicThreshold"
  ]);
  return r != null && i(e, ["dynamicThreshold"], r), e;
}
function jn(o, t) {
  const e = {}, n = s(t, [
    "dynamicRetrievalConfig"
  ]);
  return n != null && i(e, ["dynamicRetrievalConfig"], On(o, n)), e;
}
function eo(o, t) {
  const e = {}, n = s(t, [
    "dynamicRetrievalConfig"
  ]);
  return n != null && i(e, ["dynamicRetrievalConfig"], bn(o, n)), e;
}
function to(o, t) {
  const e = {}, n = s(t, [
    "functionDeclarations"
  ]);
  if (n != null && (Array.isArray(n) ? i(e, ["functionDeclarations"], n.map((a) => Jn(o, a))) : i(e, ["functionDeclarations"], n)), s(t, ["retrieval"]) !== void 0)
    throw new Error("retrieval parameter is not supported in Gemini API.");
  s(t, ["googleSearch"]) != null && i(e, ["googleSearch"], Qn());
  const l = s(t, [
    "googleSearchRetrieval"
  ]);
  l != null && i(e, ["googleSearchRetrieval"], jn(o, l));
  const u = s(t, [
    "codeExecution"
  ]);
  return u != null && i(e, ["codeExecution"], u), e;
}
function no(o, t) {
  const e = {}, n = s(t, [
    "functionDeclarations"
  ]);
  n != null && (Array.isArray(n) ? i(e, ["functionDeclarations"], n.map((c) => Xn(o, c))) : i(e, ["functionDeclarations"], n));
  const r = s(t, ["retrieval"]);
  r != null && i(e, ["retrieval"], r), s(t, ["googleSearch"]) != null && i(e, ["googleSearch"], Zn());
  const u = s(t, [
    "googleSearchRetrieval"
  ]);
  u != null && i(e, ["googleSearchRetrieval"], eo(o, u));
  const a = s(t, [
    "codeExecution"
  ]);
  return a != null && i(e, ["codeExecution"], a), e;
}
function oo(o, t) {
  const e = {}, n = s(t, ["handle"]);
  if (n != null && i(e, ["handle"], n), s(t, ["transparent"]) !== void 0)
    throw new Error("transparent parameter is not supported in Gemini API.");
  return e;
}
function io(o, t) {
  const e = {}, n = s(t, ["handle"]);
  n != null && i(e, ["handle"], n);
  const r = s(t, ["transparent"]);
  return r != null && i(e, ["transparent"], r), e;
}
function so() {
  return {};
}
function be() {
  return {};
}
function ro(o, t) {
  const e = {}, n = s(t, ["disabled"]);
  n != null && i(e, ["disabled"], n);
  const r = s(t, [
    "startOfSpeechSensitivity"
  ]);
  r != null && i(e, ["startOfSpeechSensitivity"], r);
  const l = s(t, [
    "endOfSpeechSensitivity"
  ]);
  l != null && i(e, ["endOfSpeechSensitivity"], l);
  const u = s(t, [
    "prefixPaddingMs"
  ]);
  u != null && i(e, ["prefixPaddingMs"], u);
  const a = s(t, [
    "silenceDurationMs"
  ]);
  return a != null && i(e, ["silenceDurationMs"], a), e;
}
function lo(o, t) {
  const e = {}, n = s(t, ["disabled"]);
  n != null && i(e, ["disabled"], n);
  const r = s(t, [
    "startOfSpeechSensitivity"
  ]);
  r != null && i(e, ["startOfSpeechSensitivity"], r);
  const l = s(t, [
    "endOfSpeechSensitivity"
  ]);
  l != null && i(e, ["endOfSpeechSensitivity"], l);
  const u = s(t, [
    "prefixPaddingMs"
  ]);
  u != null && i(e, ["prefixPaddingMs"], u);
  const a = s(t, [
    "silenceDurationMs"
  ]);
  return a != null && i(e, ["silenceDurationMs"], a), e;
}
function ao(o, t) {
  const e = {}, n = s(t, [
    "automaticActivityDetection"
  ]);
  n != null && i(e, ["automaticActivityDetection"], ro(o, n));
  const r = s(t, [
    "activityHandling"
  ]);
  r != null && i(e, ["activityHandling"], r);
  const l = s(t, ["turnCoverage"]);
  return l != null && i(e, ["turnCoverage"], l), e;
}
function uo(o, t) {
  const e = {}, n = s(t, [
    "automaticActivityDetection"
  ]);
  n != null && i(e, ["automaticActivityDetection"], lo(o, n));
  const r = s(t, [
    "activityHandling"
  ]);
  r != null && i(e, ["activityHandling"], r);
  const l = s(t, ["turnCoverage"]);
  return l != null && i(e, ["turnCoverage"], l), e;
}
function co(o, t) {
  const e = {}, n = s(t, ["targetTokens"]);
  return n != null && i(e, ["targetTokens"], n), e;
}
function fo(o, t) {
  const e = {}, n = s(t, ["targetTokens"]);
  return n != null && i(e, ["targetTokens"], n), e;
}
function po(o, t) {
  const e = {}, n = s(t, [
    "triggerTokens"
  ]);
  n != null && i(e, ["triggerTokens"], n);
  const r = s(t, [
    "slidingWindow"
  ]);
  return r != null && i(e, ["slidingWindow"], co(o, r)), e;
}
function mo(o, t) {
  const e = {}, n = s(t, [
    "triggerTokens"
  ]);
  n != null && i(e, ["triggerTokens"], n);
  const r = s(t, [
    "slidingWindow"
  ]);
  return r != null && i(e, ["slidingWindow"], fo(o, r)), e;
}
function ho(o, t, e) {
  const n = {}, r = s(t, [
    "generationConfig"
  ]);
  e !== void 0 && r != null && i(e, ["setup", "generationConfig"], r);
  const l = s(t, [
    "responseModalities"
  ]);
  e !== void 0 && l != null && i(e, ["setup", "generationConfig", "responseModalities"], l);
  const u = s(t, ["temperature"]);
  e !== void 0 && u != null && i(e, ["setup", "generationConfig", "temperature"], u);
  const a = s(t, ["topP"]);
  e !== void 0 && a != null && i(e, ["setup", "generationConfig", "topP"], a);
  const c = s(t, ["topK"]);
  e !== void 0 && c != null && i(e, ["setup", "generationConfig", "topK"], c);
  const d = s(t, [
    "maxOutputTokens"
  ]);
  e !== void 0 && d != null && i(e, ["setup", "generationConfig", "maxOutputTokens"], d);
  const f = s(t, [
    "mediaResolution"
  ]);
  e !== void 0 && f != null && i(e, ["setup", "generationConfig", "mediaResolution"], f);
  const p = s(t, ["seed"]);
  e !== void 0 && p != null && i(e, ["setup", "generationConfig", "seed"], p);
  const h = s(t, ["speechConfig"]);
  e !== void 0 && h != null && i(e, ["setup", "generationConfig", "speechConfig"], h);
  const m = s(t, [
    "systemInstruction"
  ]);
  e !== void 0 && m != null && i(e, ["setup", "systemInstruction"], zn(o, F(o, m)));
  const g = s(t, ["tools"]);
  e !== void 0 && g != null && (Array.isArray(g) ? i(e, ["setup", "tools"], V(o, V(o, g).map((x) => to(o, ee(o, x))))) : i(e, ["setup", "tools"], V(o, g)));
  const y = s(t, [
    "sessionResumption"
  ]);
  if (e !== void 0 && y != null && i(e, ["setup", "sessionResumption"], oo(o, y)), s(t, ["inputAudioTranscription"]) !== void 0)
    throw new Error("inputAudioTranscription parameter is not supported in Gemini API.");
  const C = s(t, [
    "outputAudioTranscription"
  ]);
  e !== void 0 && C != null && i(e, ["setup", "outputAudioTranscription"], so());
  const T = s(t, [
    "realtimeInputConfig"
  ]);
  e !== void 0 && T != null && i(e, ["setup", "realtimeInputConfig"], ao(o, T));
  const v = s(t, [
    "contextWindowCompression"
  ]);
  return e !== void 0 && v != null && i(e, ["setup", "contextWindowCompression"], po(o, v)), n;
}
function go(o, t, e) {
  const n = {}, r = s(t, [
    "generationConfig"
  ]);
  e !== void 0 && r != null && i(e, ["setup", "generationConfig"], r);
  const l = s(t, [
    "responseModalities"
  ]);
  e !== void 0 && l != null && i(e, ["setup", "generationConfig", "responseModalities"], l);
  const u = s(t, ["temperature"]);
  e !== void 0 && u != null && i(e, ["setup", "generationConfig", "temperature"], u);
  const a = s(t, ["topP"]);
  e !== void 0 && a != null && i(e, ["setup", "generationConfig", "topP"], a);
  const c = s(t, ["topK"]);
  e !== void 0 && c != null && i(e, ["setup", "generationConfig", "topK"], c);
  const d = s(t, [
    "maxOutputTokens"
  ]);
  e !== void 0 && d != null && i(e, ["setup", "generationConfig", "maxOutputTokens"], d);
  const f = s(t, [
    "mediaResolution"
  ]);
  e !== void 0 && f != null && i(e, ["setup", "generationConfig", "mediaResolution"], f);
  const p = s(t, ["seed"]);
  e !== void 0 && p != null && i(e, ["setup", "generationConfig", "seed"], p);
  const h = s(t, ["speechConfig"]);
  e !== void 0 && h != null && i(e, ["setup", "generationConfig", "speechConfig"], h);
  const m = s(t, [
    "systemInstruction"
  ]);
  e !== void 0 && m != null && i(e, ["setup", "systemInstruction"], Kn(o, F(o, m)));
  const g = s(t, ["tools"]);
  e !== void 0 && g != null && (Array.isArray(g) ? i(e, ["setup", "tools"], V(o, V(o, g).map((I) => no(o, ee(o, I))))) : i(e, ["setup", "tools"], V(o, g)));
  const y = s(t, [
    "sessionResumption"
  ]);
  e !== void 0 && y != null && i(e, ["setup", "sessionResumption"], io(o, y));
  const C = s(t, [
    "inputAudioTranscription"
  ]);
  e !== void 0 && C != null && i(e, ["setup", "inputAudioTranscription"], be());
  const T = s(t, [
    "outputAudioTranscription"
  ]);
  e !== void 0 && T != null && i(e, ["setup", "outputAudioTranscription"], be());
  const v = s(t, [
    "realtimeInputConfig"
  ]);
  e !== void 0 && v != null && i(e, ["setup", "realtimeInputConfig"], uo(o, v));
  const x = s(t, [
    "contextWindowCompression"
  ]);
  return e !== void 0 && x != null && i(e, ["setup", "contextWindowCompression"], mo(o, x)), n;
}
function yo(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["setup", "model"], w(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], ho(o, r, e)), e;
}
function Co(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["setup", "model"], w(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], go(o, r, e)), e;
}
function To() {
  return {};
}
function vo() {
  return {};
}
function Eo(o, t) {
  const e = {}, n = s(t, ["thought"]);
  n != null && i(e, ["thought"], n);
  const r = s(t, [
    "codeExecutionResult"
  ]);
  r != null && i(e, ["codeExecutionResult"], r);
  const l = s(t, [
    "executableCode"
  ]);
  l != null && i(e, ["executableCode"], l);
  const u = s(t, ["fileData"]);
  u != null && i(e, ["fileData"], u);
  const a = s(t, ["functionCall"]);
  a != null && i(e, ["functionCall"], a);
  const c = s(t, [
    "functionResponse"
  ]);
  c != null && i(e, ["functionResponse"], c);
  const d = s(t, ["inlineData"]);
  d != null && i(e, ["inlineData"], d);
  const f = s(t, ["text"]);
  return f != null && i(e, ["text"], f), e;
}
function Io(o, t) {
  const e = {}, n = s(t, [
    "videoMetadata"
  ]);
  n != null && i(e, ["videoMetadata"], n);
  const r = s(t, ["thought"]);
  r != null && i(e, ["thought"], r);
  const l = s(t, [
    "codeExecutionResult"
  ]);
  l != null && i(e, ["codeExecutionResult"], l);
  const u = s(t, [
    "executableCode"
  ]);
  u != null && i(e, ["executableCode"], u);
  const a = s(t, ["fileData"]);
  a != null && i(e, ["fileData"], a);
  const c = s(t, ["functionCall"]);
  c != null && i(e, ["functionCall"], c);
  const d = s(t, [
    "functionResponse"
  ]);
  d != null && i(e, ["functionResponse"], d);
  const f = s(t, ["inlineData"]);
  f != null && i(e, ["inlineData"], f);
  const p = s(t, ["text"]);
  return p != null && i(e, ["text"], p), e;
}
function xo(o, t) {
  const e = {}, n = s(t, ["parts"]);
  n != null && (Array.isArray(n) ? i(e, ["parts"], n.map((l) => Eo(o, l))) : i(e, ["parts"], n));
  const r = s(t, ["role"]);
  return r != null && i(e, ["role"], r), e;
}
function _o(o, t) {
  const e = {}, n = s(t, ["parts"]);
  n != null && (Array.isArray(n) ? i(e, ["parts"], n.map((l) => Io(o, l))) : i(e, ["parts"], n));
  const r = s(t, ["role"]);
  return r != null && i(e, ["role"], r), e;
}
function je(o, t) {
  const e = {}, n = s(t, ["text"]);
  n != null && i(e, ["text"], n);
  const r = s(t, ["finished"]);
  return r != null && i(e, ["finished"], r), e;
}
function et(o, t) {
  const e = {}, n = s(t, ["text"]);
  n != null && i(e, ["text"], n);
  const r = s(t, ["finished"]);
  return r != null && i(e, ["finished"], r), e;
}
function So(o, t) {
  const e = {}, n = s(t, ["modelTurn"]);
  n != null && i(e, ["modelTurn"], xo(o, n));
  const r = s(t, ["turnComplete"]);
  r != null && i(e, ["turnComplete"], r);
  const l = s(t, ["interrupted"]);
  l != null && i(e, ["interrupted"], l);
  const u = s(t, [
    "generationComplete"
  ]);
  u != null && i(e, ["generationComplete"], u);
  const a = s(t, [
    "inputTranscription"
  ]);
  a != null && i(e, ["inputTranscription"], je(o, a));
  const c = s(t, [
    "outputTranscription"
  ]);
  return c != null && i(e, ["outputTranscription"], je(o, c)), e;
}
function Ao(o, t) {
  const e = {}, n = s(t, ["modelTurn"]);
  n != null && i(e, ["modelTurn"], _o(o, n));
  const r = s(t, ["turnComplete"]);
  r != null && i(e, ["turnComplete"], r);
  const l = s(t, ["interrupted"]);
  l != null && i(e, ["interrupted"], l);
  const u = s(t, [
    "generationComplete"
  ]);
  u != null && i(e, ["generationComplete"], u);
  const a = s(t, [
    "inputTranscription"
  ]);
  a != null && i(e, ["inputTranscription"], et(o, a));
  const c = s(t, [
    "outputTranscription"
  ]);
  return c != null && i(e, ["outputTranscription"], et(o, c)), e;
}
function wo(o, t) {
  const e = {}, n = s(t, ["id"]);
  n != null && i(e, ["id"], n);
  const r = s(t, ["args"]);
  r != null && i(e, ["args"], r);
  const l = s(t, ["name"]);
  return l != null && i(e, ["name"], l), e;
}
function Mo(o, t) {
  const e = {}, n = s(t, ["args"]);
  n != null && i(e, ["args"], n);
  const r = s(t, ["name"]);
  return r != null && i(e, ["name"], r), e;
}
function Po(o, t) {
  const e = {}, n = s(t, [
    "functionCalls"
  ]);
  return n != null && (Array.isArray(n) ? i(e, ["functionCalls"], n.map((r) => wo(o, r))) : i(e, ["functionCalls"], n)), e;
}
function Ro(o, t) {
  const e = {}, n = s(t, [
    "functionCalls"
  ]);
  return n != null && (Array.isArray(n) ? i(e, ["functionCalls"], n.map((r) => Mo(o, r))) : i(e, ["functionCalls"], n)), e;
}
function Do(o, t) {
  const e = {}, n = s(t, ["ids"]);
  return n != null && i(e, ["ids"], n), e;
}
function No(o, t) {
  const e = {}, n = s(t, ["ids"]);
  return n != null && i(e, ["ids"], n), e;
}
function W(o, t) {
  const e = {}, n = s(t, ["modality"]);
  n != null && i(e, ["modality"], n);
  const r = s(t, ["tokenCount"]);
  return r != null && i(e, ["tokenCount"], r), e;
}
function J(o, t) {
  const e = {}, n = s(t, ["modality"]);
  n != null && i(e, ["modality"], n);
  const r = s(t, ["tokenCount"]);
  return r != null && i(e, ["tokenCount"], r), e;
}
function Fo(o, t) {
  const e = {}, n = s(t, [
    "promptTokenCount"
  ]);
  n != null && i(e, ["promptTokenCount"], n);
  const r = s(t, [
    "cachedContentTokenCount"
  ]);
  r != null && i(e, ["cachedContentTokenCount"], r);
  const l = s(t, [
    "responseTokenCount"
  ]);
  l != null && i(e, ["responseTokenCount"], l);
  const u = s(t, [
    "toolUsePromptTokenCount"
  ]);
  u != null && i(e, ["toolUsePromptTokenCount"], u);
  const a = s(t, [
    "thoughtsTokenCount"
  ]);
  a != null && i(e, ["thoughtsTokenCount"], a);
  const c = s(t, [
    "totalTokenCount"
  ]);
  c != null && i(e, ["totalTokenCount"], c);
  const d = s(t, [
    "promptTokensDetails"
  ]);
  d != null && (Array.isArray(d) ? i(e, ["promptTokensDetails"], d.map((m) => W(o, m))) : i(e, ["promptTokensDetails"], d));
  const f = s(t, [
    "cacheTokensDetails"
  ]);
  f != null && (Array.isArray(f) ? i(e, ["cacheTokensDetails"], f.map((m) => W(o, m))) : i(e, ["cacheTokensDetails"], f));
  const p = s(t, [
    "responseTokensDetails"
  ]);
  p != null && (Array.isArray(p) ? i(e, ["responseTokensDetails"], p.map((m) => W(o, m))) : i(e, ["responseTokensDetails"], p));
  const h = s(t, [
    "toolUsePromptTokensDetails"
  ]);
  return h != null && (Array.isArray(h) ? i(e, ["toolUsePromptTokensDetails"], h.map((m) => W(o, m))) : i(e, ["toolUsePromptTokensDetails"], h)), e;
}
function Vo(o, t) {
  const e = {}, n = s(t, [
    "promptTokenCount"
  ]);
  n != null && i(e, ["promptTokenCount"], n);
  const r = s(t, [
    "cachedContentTokenCount"
  ]);
  r != null && i(e, ["cachedContentTokenCount"], r);
  const l = s(t, [
    "candidatesTokenCount"
  ]);
  l != null && i(e, ["responseTokenCount"], l);
  const u = s(t, [
    "toolUsePromptTokenCount"
  ]);
  u != null && i(e, ["toolUsePromptTokenCount"], u);
  const a = s(t, [
    "thoughtsTokenCount"
  ]);
  a != null && i(e, ["thoughtsTokenCount"], a);
  const c = s(t, [
    "totalTokenCount"
  ]);
  c != null && i(e, ["totalTokenCount"], c);
  const d = s(t, [
    "promptTokensDetails"
  ]);
  d != null && (Array.isArray(d) ? i(e, ["promptTokensDetails"], d.map((g) => J(o, g))) : i(e, ["promptTokensDetails"], d));
  const f = s(t, [
    "cacheTokensDetails"
  ]);
  f != null && (Array.isArray(f) ? i(e, ["cacheTokensDetails"], f.map((g) => J(o, g))) : i(e, ["cacheTokensDetails"], f));
  const p = s(t, [
    "candidatesTokensDetails"
  ]);
  p != null && (Array.isArray(p) ? i(e, ["responseTokensDetails"], p.map((g) => J(o, g))) : i(e, ["responseTokensDetails"], p));
  const h = s(t, [
    "toolUsePromptTokensDetails"
  ]);
  h != null && (Array.isArray(h) ? i(e, ["toolUsePromptTokensDetails"], h.map((g) => J(o, g))) : i(e, ["toolUsePromptTokensDetails"], h));
  const m = s(t, ["trafficType"]);
  return m != null && i(e, ["trafficType"], m), e;
}
function Uo(o, t) {
  const e = {}, n = s(t, ["timeLeft"]);
  return n != null && i(e, ["timeLeft"], n), e;
}
function Lo(o, t) {
  const e = {}, n = s(t, ["timeLeft"]);
  return n != null && i(e, ["timeLeft"], n), e;
}
function ko(o, t) {
  const e = {}, n = s(t, ["newHandle"]);
  n != null && i(e, ["newHandle"], n);
  const r = s(t, ["resumable"]);
  r != null && i(e, ["resumable"], r);
  const l = s(t, [
    "lastConsumedClientMessageIndex"
  ]);
  return l != null && i(e, ["lastConsumedClientMessageIndex"], l), e;
}
function Go(o, t) {
  const e = {}, n = s(t, ["newHandle"]);
  n != null && i(e, ["newHandle"], n);
  const r = s(t, ["resumable"]);
  r != null && i(e, ["resumable"], r);
  const l = s(t, [
    "lastConsumedClientMessageIndex"
  ]);
  return l != null && i(e, ["lastConsumedClientMessageIndex"], l), e;
}
function qo(o, t) {
  const e = {};
  s(t, [
    "setupComplete"
  ]) != null && i(e, ["setupComplete"], To());
  const r = s(t, [
    "serverContent"
  ]);
  r != null && i(e, ["serverContent"], So(o, r));
  const l = s(t, ["toolCall"]);
  l != null && i(e, ["toolCall"], Po(o, l));
  const u = s(t, [
    "toolCallCancellation"
  ]);
  u != null && i(e, ["toolCallCancellation"], Do(o, u));
  const a = s(t, [
    "usageMetadata"
  ]);
  a != null && i(e, ["usageMetadata"], Fo(o, a));
  const c = s(t, ["goAway"]);
  c != null && i(e, ["goAway"], Uo(o, c));
  const d = s(t, [
    "sessionResumptionUpdate"
  ]);
  return d != null && i(e, ["sessionResumptionUpdate"], ko(o, d)), e;
}
function Bo(o, t) {
  const e = {};
  s(t, [
    "setupComplete"
  ]) != null && i(e, ["setupComplete"], vo());
  const r = s(t, [
    "serverContent"
  ]);
  r != null && i(e, ["serverContent"], Ao(o, r));
  const l = s(t, ["toolCall"]);
  l != null && i(e, ["toolCall"], Ro(o, l));
  const u = s(t, [
    "toolCallCancellation"
  ]);
  u != null && i(e, ["toolCallCancellation"], No(o, u));
  const a = s(t, [
    "usageMetadata"
  ]);
  a != null && i(e, ["usageMetadata"], Vo(o, a));
  const c = s(t, ["goAway"]);
  c != null && i(e, ["goAway"], Lo(o, c));
  const d = s(t, [
    "sessionResumptionUpdate"
  ]);
  return d != null && i(e, ["sessionResumptionUpdate"], Go(o, d)), e;
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function $o(o, t) {
  const e = {};
  if (s(t, ["videoMetadata"]) !== void 0)
    throw new Error("videoMetadata parameter is not supported in Gemini API.");
  const n = s(t, ["thought"]);
  n != null && i(e, ["thought"], n);
  const r = s(t, [
    "codeExecutionResult"
  ]);
  r != null && i(e, ["codeExecutionResult"], r);
  const l = s(t, [
    "executableCode"
  ]);
  l != null && i(e, ["executableCode"], l);
  const u = s(t, ["fileData"]);
  u != null && i(e, ["fileData"], u);
  const a = s(t, ["functionCall"]);
  a != null && i(e, ["functionCall"], a);
  const c = s(t, [
    "functionResponse"
  ]);
  c != null && i(e, ["functionResponse"], c);
  const d = s(t, ["inlineData"]);
  d != null && i(e, ["inlineData"], d);
  const f = s(t, ["text"]);
  return f != null && i(e, ["text"], f), e;
}
function te(o, t) {
  const e = {}, n = s(t, ["parts"]);
  n != null && (Array.isArray(n) ? i(e, ["parts"], n.map((l) => $o(o, l))) : i(e, ["parts"], n));
  const r = s(t, ["role"]);
  return r != null && i(e, ["role"], r), e;
}
function Ho(o, t) {
  const e = {};
  if (s(t, ["example"]) !== void 0)
    throw new Error("example parameter is not supported in Gemini API.");
  if (s(t, ["pattern"]) !== void 0)
    throw new Error("pattern parameter is not supported in Gemini API.");
  if (s(t, ["default"]) !== void 0)
    throw new Error("default parameter is not supported in Gemini API.");
  if (s(t, ["maxLength"]) !== void 0)
    throw new Error("maxLength parameter is not supported in Gemini API.");
  if (s(t, ["minLength"]) !== void 0)
    throw new Error("minLength parameter is not supported in Gemini API.");
  if (s(t, ["minProperties"]) !== void 0)
    throw new Error("minProperties parameter is not supported in Gemini API.");
  if (s(t, ["maxProperties"]) !== void 0)
    throw new Error("maxProperties parameter is not supported in Gemini API.");
  const n = s(t, ["anyOf"]);
  n != null && i(e, ["anyOf"], n);
  const r = s(t, ["description"]);
  r != null && i(e, ["description"], r);
  const l = s(t, ["enum"]);
  l != null && i(e, ["enum"], l);
  const u = s(t, ["format"]);
  u != null && i(e, ["format"], u);
  const a = s(t, ["items"]);
  a != null && i(e, ["items"], a);
  const c = s(t, ["maxItems"]);
  c != null && i(e, ["maxItems"], c);
  const d = s(t, ["maximum"]);
  d != null && i(e, ["maximum"], d);
  const f = s(t, ["minItems"]);
  f != null && i(e, ["minItems"], f);
  const p = s(t, ["minimum"]);
  p != null && i(e, ["minimum"], p);
  const h = s(t, ["nullable"]);
  h != null && i(e, ["nullable"], h);
  const m = s(t, ["properties"]);
  m != null && i(e, ["properties"], m);
  const g = s(t, [
    "propertyOrdering"
  ]);
  g != null && i(e, ["propertyOrdering"], g);
  const y = s(t, ["required"]);
  y != null && i(e, ["required"], y);
  const C = s(t, ["title"]);
  C != null && i(e, ["title"], C);
  const T = s(t, ["type"]);
  return T != null && i(e, ["type"], T), e;
}
function Yo(o, t) {
  const e = {};
  if (s(t, ["method"]) !== void 0)
    throw new Error("method parameter is not supported in Gemini API.");
  const n = s(t, ["category"]);
  n != null && i(e, ["category"], n);
  const r = s(t, ["threshold"]);
  return r != null && i(e, ["threshold"], r), e;
}
function zo(o, t) {
  const e = {};
  if (s(t, ["response"]) !== void 0)
    throw new Error("response parameter is not supported in Gemini API.");
  const n = s(t, ["description"]);
  n != null && i(e, ["description"], n);
  const r = s(t, ["name"]);
  r != null && i(e, ["name"], r);
  const l = s(t, ["parameters"]);
  return l != null && i(e, ["parameters"], l), e;
}
function Ko() {
  return {};
}
function Wo(o, t) {
  const e = {}, n = s(t, ["mode"]);
  n != null && i(e, ["mode"], n);
  const r = s(t, [
    "dynamicThreshold"
  ]);
  return r != null && i(e, ["dynamicThreshold"], r), e;
}
function Jo(o, t) {
  const e = {}, n = s(t, [
    "dynamicRetrievalConfig"
  ]);
  return n != null && i(e, ["dynamicRetrievalConfig"], Wo(o, n)), e;
}
function Xo(o, t) {
  const e = {}, n = s(t, [
    "functionDeclarations"
  ]);
  if (n != null && (Array.isArray(n) ? i(e, ["functionDeclarations"], n.map((a) => zo(o, a))) : i(e, ["functionDeclarations"], n)), s(t, ["retrieval"]) !== void 0)
    throw new Error("retrieval parameter is not supported in Gemini API.");
  s(t, ["googleSearch"]) != null && i(e, ["googleSearch"], Ko());
  const l = s(t, [
    "googleSearchRetrieval"
  ]);
  l != null && i(e, ["googleSearchRetrieval"], Jo(o, l));
  const u = s(t, [
    "codeExecution"
  ]);
  return u != null && i(e, ["codeExecution"], u), e;
}
function Qo(o, t) {
  const e = {}, n = s(t, ["mode"]);
  n != null && i(e, ["mode"], n);
  const r = s(t, [
    "allowedFunctionNames"
  ]);
  return r != null && i(e, ["allowedFunctionNames"], r), e;
}
function Zo(o, t) {
  const e = {}, n = s(t, [
    "functionCallingConfig"
  ]);
  return n != null && i(e, ["functionCallingConfig"], Qo(o, n)), e;
}
function Oo(o, t) {
  const e = {}, n = s(t, ["voiceName"]);
  return n != null && i(e, ["voiceName"], n), e;
}
function bo(o, t) {
  const e = {}, n = s(t, [
    "prebuiltVoiceConfig"
  ]);
  return n != null && i(e, ["prebuiltVoiceConfig"], Oo(o, n)), e;
}
function jo(o, t) {
  const e = {}, n = s(t, ["voiceConfig"]);
  n != null && i(e, ["voiceConfig"], bo(o, n));
  const r = s(t, ["languageCode"]);
  return r != null && i(e, ["languageCode"], r), e;
}
function ei(o, t) {
  const e = {}, n = s(t, [
    "includeThoughts"
  ]);
  n != null && i(e, ["includeThoughts"], n);
  const r = s(t, [
    "thinkingBudget"
  ]);
  return r != null && i(e, ["thinkingBudget"], r), e;
}
function ti(o, t, e) {
  const n = {}, r = s(t, [
    "systemInstruction"
  ]);
  e !== void 0 && r != null && i(e, ["systemInstruction"], te(o, F(o, r)));
  const l = s(t, ["temperature"]);
  l != null && i(n, ["temperature"], l);
  const u = s(t, ["topP"]);
  u != null && i(n, ["topP"], u);
  const a = s(t, ["topK"]);
  a != null && i(n, ["topK"], a);
  const c = s(t, [
    "candidateCount"
  ]);
  c != null && i(n, ["candidateCount"], c);
  const d = s(t, [
    "maxOutputTokens"
  ]);
  d != null && i(n, ["maxOutputTokens"], d);
  const f = s(t, [
    "stopSequences"
  ]);
  f != null && i(n, ["stopSequences"], f);
  const p = s(t, [
    "responseLogprobs"
  ]);
  p != null && i(n, ["responseLogprobs"], p);
  const h = s(t, ["logprobs"]);
  h != null && i(n, ["logprobs"], h);
  const m = s(t, [
    "presencePenalty"
  ]);
  m != null && i(n, ["presencePenalty"], m);
  const g = s(t, [
    "frequencyPenalty"
  ]);
  g != null && i(n, ["frequencyPenalty"], g);
  const y = s(t, ["seed"]);
  y != null && i(n, ["seed"], y);
  const C = s(t, [
    "responseMimeType"
  ]);
  C != null && i(n, ["responseMimeType"], C);
  const T = s(t, [
    "responseSchema"
  ]);
  if (T != null && i(n, ["responseSchema"], Ho(o, Tt(o, T))), s(t, ["routingConfig"]) !== void 0)
    throw new Error("routingConfig parameter is not supported in Gemini API.");
  if (s(t, ["modelSelectionConfig"]) !== void 0)
    throw new Error("modelSelectionConfig parameter is not supported in Gemini API.");
  const v = s(t, [
    "safetySettings"
  ]);
  e !== void 0 && v != null && (Array.isArray(v) ? i(e, ["safetySettings"], v.map((q) => Yo(o, q))) : i(e, ["safetySettings"], v));
  const x = s(t, ["tools"]);
  e !== void 0 && x != null && (Array.isArray(x) ? i(e, ["tools"], V(o, V(o, x).map((q) => Xo(o, ee(o, q))))) : i(e, ["tools"], V(o, x)));
  const I = s(t, ["toolConfig"]);
  if (e !== void 0 && I != null && i(e, ["toolConfig"], Zo(o, I)), s(t, ["labels"]) !== void 0)
    throw new Error("labels parameter is not supported in Gemini API.");
  const A = s(t, [
    "cachedContent"
  ]);
  e !== void 0 && A != null && i(e, ["cachedContent"], k(o, A));
  const R = s(t, [
    "responseModalities"
  ]);
  R != null && i(n, ["responseModalities"], R);
  const D = s(t, [
    "mediaResolution"
  ]);
  D != null && i(n, ["mediaResolution"], D);
  const N = s(t, ["speechConfig"]);
  if (N != null && i(n, ["speechConfig"], jo(o, vt(o, N))), s(t, ["audioTimestamp"]) !== void 0)
    throw new Error("audioTimestamp parameter is not supported in Gemini API.");
  const $ = s(t, [
    "thinkingConfig"
  ]);
  return $ != null && i(n, ["thinkingConfig"], ei(o, $)), n;
}
function tt(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["_url", "model"], w(o, n));
  const r = s(t, ["contents"]);
  r != null && (Array.isArray(r) ? i(e, ["contents"], S(o, S(o, r).map((u) => te(o, u)))) : i(e, ["contents"], S(o, r)));
  const l = s(t, ["config"]);
  return l != null && i(e, ["generationConfig"], ti(o, l, e)), e;
}
function ni(o, t, e) {
  const n = {}, r = s(t, ["taskType"]);
  e !== void 0 && r != null && i(e, ["requests[]", "taskType"], r);
  const l = s(t, ["title"]);
  e !== void 0 && l != null && i(e, ["requests[]", "title"], l);
  const u = s(t, [
    "outputDimensionality"
  ]);
  if (e !== void 0 && u != null && i(e, ["requests[]", "outputDimensionality"], u), s(t, ["mimeType"]) !== void 0)
    throw new Error("mimeType parameter is not supported in Gemini API.");
  if (s(t, ["autoTruncate"]) !== void 0)
    throw new Error("autoTruncate parameter is not supported in Gemini API.");
  return n;
}
function oi(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["_url", "model"], w(o, n));
  const r = s(t, ["contents"]);
  r != null && i(e, ["requests[]", "content"], Ct(o, r));
  const l = s(t, ["config"]);
  l != null && i(e, ["config"], ni(o, l, e));
  const u = s(t, ["model"]);
  return u !== void 0 && i(e, ["requests[]", "model"], w(o, u)), e;
}
function ii(o, t, e) {
  const n = {};
  if (s(t, ["outputGcsUri"]) !== void 0)
    throw new Error("outputGcsUri parameter is not supported in Gemini API.");
  if (s(t, ["negativePrompt"]) !== void 0)
    throw new Error("negativePrompt parameter is not supported in Gemini API.");
  const r = s(t, [
    "numberOfImages"
  ]);
  e !== void 0 && r != null && i(e, ["parameters", "sampleCount"], r);
  const l = s(t, ["aspectRatio"]);
  e !== void 0 && l != null && i(e, ["parameters", "aspectRatio"], l);
  const u = s(t, [
    "guidanceScale"
  ]);
  if (e !== void 0 && u != null && i(e, ["parameters", "guidanceScale"], u), s(t, ["seed"]) !== void 0)
    throw new Error("seed parameter is not supported in Gemini API.");
  const a = s(t, [
    "safetyFilterLevel"
  ]);
  e !== void 0 && a != null && i(e, ["parameters", "safetySetting"], a);
  const c = s(t, [
    "personGeneration"
  ]);
  e !== void 0 && c != null && i(e, ["parameters", "personGeneration"], c);
  const d = s(t, [
    "includeSafetyAttributes"
  ]);
  e !== void 0 && d != null && i(e, ["parameters", "includeSafetyAttributes"], d);
  const f = s(t, [
    "includeRaiReason"
  ]);
  e !== void 0 && f != null && i(e, ["parameters", "includeRaiReason"], f);
  const p = s(t, ["language"]);
  e !== void 0 && p != null && i(e, ["parameters", "language"], p);
  const h = s(t, [
    "outputMimeType"
  ]);
  e !== void 0 && h != null && i(e, ["parameters", "outputOptions", "mimeType"], h);
  const m = s(t, [
    "outputCompressionQuality"
  ]);
  if (e !== void 0 && m != null && i(e, ["parameters", "outputOptions", "compressionQuality"], m), s(t, ["addWatermark"]) !== void 0)
    throw new Error("addWatermark parameter is not supported in Gemini API.");
  if (s(t, ["enhancePrompt"]) !== void 0)
    throw new Error("enhancePrompt parameter is not supported in Gemini API.");
  return n;
}
function si(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["_url", "model"], w(o, n));
  const r = s(t, ["prompt"]);
  r != null && i(e, ["instances[0]", "prompt"], r);
  const l = s(t, ["config"]);
  return l != null && i(e, ["config"], ii(o, l, e)), e;
}
function ri(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["_url", "name"], w(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], r), e;
}
function li(o, t) {
  const e = {};
  if (s(t, ["systemInstruction"]) !== void 0)
    throw new Error("systemInstruction parameter is not supported in Gemini API.");
  if (s(t, ["tools"]) !== void 0)
    throw new Error("tools parameter is not supported in Gemini API.");
  if (s(t, ["generationConfig"]) !== void 0)
    throw new Error("generationConfig parameter is not supported in Gemini API.");
  return e;
}
function ai(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["_url", "model"], w(o, n));
  const r = s(t, ["contents"]);
  r != null && (Array.isArray(r) ? i(e, ["contents"], S(o, S(o, r).map((u) => te(o, u)))) : i(e, ["contents"], S(o, r)));
  const l = s(t, ["config"]);
  return l != null && i(e, ["config"], li(o, l)), e;
}
function ui(o, t) {
  const e = {};
  if (s(t, ["gcsUri"]) !== void 0)
    throw new Error("gcsUri parameter is not supported in Gemini API.");
  const n = s(t, ["imageBytes"]);
  n != null && i(e, ["bytesBase64Encoded"], G(o, n));
  const r = s(t, ["mimeType"]);
  return r != null && i(e, ["mimeType"], r), e;
}
function ci(o, t, e) {
  const n = {}, r = s(t, [
    "numberOfVideos"
  ]);
  if (e !== void 0 && r != null && i(e, ["parameters", "sampleCount"], r), s(t, ["outputGcsUri"]) !== void 0)
    throw new Error("outputGcsUri parameter is not supported in Gemini API.");
  if (s(t, ["fps"]) !== void 0)
    throw new Error("fps parameter is not supported in Gemini API.");
  const l = s(t, [
    "durationSeconds"
  ]);
  if (e !== void 0 && l != null && i(e, ["parameters", "durationSeconds"], l), s(t, ["seed"]) !== void 0)
    throw new Error("seed parameter is not supported in Gemini API.");
  const u = s(t, ["aspectRatio"]);
  if (e !== void 0 && u != null && i(e, ["parameters", "aspectRatio"], u), s(t, ["resolution"]) !== void 0)
    throw new Error("resolution parameter is not supported in Gemini API.");
  const a = s(t, [
    "personGeneration"
  ]);
  if (e !== void 0 && a != null && i(e, ["parameters", "personGeneration"], a), s(t, ["pubsubTopic"]) !== void 0)
    throw new Error("pubsubTopic parameter is not supported in Gemini API.");
  const c = s(t, [
    "negativePrompt"
  ]);
  if (e !== void 0 && c != null && i(e, ["parameters", "negativePrompt"], c), s(t, ["enhancePrompt"]) !== void 0)
    throw new Error("enhancePrompt parameter is not supported in Gemini API.");
  return n;
}
function di(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["_url", "model"], w(o, n));
  const r = s(t, ["prompt"]);
  r != null && i(e, ["instances[0]", "prompt"], r);
  const l = s(t, ["image"]);
  l != null && i(e, ["instances[0]", "image"], ui(o, l));
  const u = s(t, ["config"]);
  return u != null && i(e, ["config"], ci(o, u, e)), e;
}
function fi(o, t) {
  const e = {}, n = s(t, [
    "videoMetadata"
  ]);
  n != null && i(e, ["videoMetadata"], n);
  const r = s(t, ["thought"]);
  r != null && i(e, ["thought"], r);
  const l = s(t, [
    "codeExecutionResult"
  ]);
  l != null && i(e, ["codeExecutionResult"], l);
  const u = s(t, [
    "executableCode"
  ]);
  u != null && i(e, ["executableCode"], u);
  const a = s(t, ["fileData"]);
  a != null && i(e, ["fileData"], a);
  const c = s(t, ["functionCall"]);
  c != null && i(e, ["functionCall"], c);
  const d = s(t, [
    "functionResponse"
  ]);
  d != null && i(e, ["functionResponse"], d);
  const f = s(t, ["inlineData"]);
  f != null && i(e, ["inlineData"], f);
  const p = s(t, ["text"]);
  return p != null && i(e, ["text"], p), e;
}
function B(o, t) {
  const e = {}, n = s(t, ["parts"]);
  n != null && (Array.isArray(n) ? i(e, ["parts"], n.map((l) => fi(o, l))) : i(e, ["parts"], n));
  const r = s(t, ["role"]);
  return r != null && i(e, ["role"], r), e;
}
function _t(o, t) {
  const e = {}, n = s(t, ["example"]);
  n != null && i(e, ["example"], n);
  const r = s(t, ["pattern"]);
  r != null && i(e, ["pattern"], r);
  const l = s(t, ["default"]);
  l != null && i(e, ["default"], l);
  const u = s(t, ["maxLength"]);
  u != null && i(e, ["maxLength"], u);
  const a = s(t, ["minLength"]);
  a != null && i(e, ["minLength"], a);
  const c = s(t, [
    "minProperties"
  ]);
  c != null && i(e, ["minProperties"], c);
  const d = s(t, [
    "maxProperties"
  ]);
  d != null && i(e, ["maxProperties"], d);
  const f = s(t, ["anyOf"]);
  f != null && i(e, ["anyOf"], f);
  const p = s(t, ["description"]);
  p != null && i(e, ["description"], p);
  const h = s(t, ["enum"]);
  h != null && i(e, ["enum"], h);
  const m = s(t, ["format"]);
  m != null && i(e, ["format"], m);
  const g = s(t, ["items"]);
  g != null && i(e, ["items"], g);
  const y = s(t, ["maxItems"]);
  y != null && i(e, ["maxItems"], y);
  const C = s(t, ["maximum"]);
  C != null && i(e, ["maximum"], C);
  const T = s(t, ["minItems"]);
  T != null && i(e, ["minItems"], T);
  const v = s(t, ["minimum"]);
  v != null && i(e, ["minimum"], v);
  const x = s(t, ["nullable"]);
  x != null && i(e, ["nullable"], x);
  const I = s(t, ["properties"]);
  I != null && i(e, ["properties"], I);
  const A = s(t, [
    "propertyOrdering"
  ]);
  A != null && i(e, ["propertyOrdering"], A);
  const R = s(t, ["required"]);
  R != null && i(e, ["required"], R);
  const D = s(t, ["title"]);
  D != null && i(e, ["title"], D);
  const N = s(t, ["type"]);
  return N != null && i(e, ["type"], N), e;
}
function pi(o, t) {
  const e = {}, n = s(t, [
    "featureSelectionPreference"
  ]);
  return n != null && i(e, ["featureSelectionPreference"], n), e;
}
function mi(o, t) {
  const e = {}, n = s(t, ["method"]);
  n != null && i(e, ["method"], n);
  const r = s(t, ["category"]);
  r != null && i(e, ["category"], r);
  const l = s(t, ["threshold"]);
  return l != null && i(e, ["threshold"], l), e;
}
function hi(o, t) {
  const e = {}, n = s(t, ["response"]);
  n != null && i(e, ["response"], _t(o, n));
  const r = s(t, ["description"]);
  r != null && i(e, ["description"], r);
  const l = s(t, ["name"]);
  l != null && i(e, ["name"], l);
  const u = s(t, ["parameters"]);
  return u != null && i(e, ["parameters"], u), e;
}
function gi() {
  return {};
}
function yi(o, t) {
  const e = {}, n = s(t, ["mode"]);
  n != null && i(e, ["mode"], n);
  const r = s(t, [
    "dynamicThreshold"
  ]);
  return r != null && i(e, ["dynamicThreshold"], r), e;
}
function Ci(o, t) {
  const e = {}, n = s(t, [
    "dynamicRetrievalConfig"
  ]);
  return n != null && i(e, ["dynamicRetrievalConfig"], yi(o, n)), e;
}
function St(o, t) {
  const e = {}, n = s(t, [
    "functionDeclarations"
  ]);
  n != null && (Array.isArray(n) ? i(e, ["functionDeclarations"], n.map((c) => hi(o, c))) : i(e, ["functionDeclarations"], n));
  const r = s(t, ["retrieval"]);
  r != null && i(e, ["retrieval"], r), s(t, ["googleSearch"]) != null && i(e, ["googleSearch"], gi());
  const u = s(t, [
    "googleSearchRetrieval"
  ]);
  u != null && i(e, ["googleSearchRetrieval"], Ci(o, u));
  const a = s(t, [
    "codeExecution"
  ]);
  return a != null && i(e, ["codeExecution"], a), e;
}
function Ti(o, t) {
  const e = {}, n = s(t, ["mode"]);
  n != null && i(e, ["mode"], n);
  const r = s(t, [
    "allowedFunctionNames"
  ]);
  return r != null && i(e, ["allowedFunctionNames"], r), e;
}
function vi(o, t) {
  const e = {}, n = s(t, [
    "functionCallingConfig"
  ]);
  return n != null && i(e, ["functionCallingConfig"], Ti(o, n)), e;
}
function Ei(o, t) {
  const e = {}, n = s(t, ["voiceName"]);
  return n != null && i(e, ["voiceName"], n), e;
}
function Ii(o, t) {
  const e = {}, n = s(t, [
    "prebuiltVoiceConfig"
  ]);
  return n != null && i(e, ["prebuiltVoiceConfig"], Ei(o, n)), e;
}
function xi(o, t) {
  const e = {}, n = s(t, ["voiceConfig"]);
  n != null && i(e, ["voiceConfig"], Ii(o, n));
  const r = s(t, ["languageCode"]);
  return r != null && i(e, ["languageCode"], r), e;
}
function _i(o, t) {
  const e = {}, n = s(t, [
    "includeThoughts"
  ]);
  n != null && i(e, ["includeThoughts"], n);
  const r = s(t, [
    "thinkingBudget"
  ]);
  return r != null && i(e, ["thinkingBudget"], r), e;
}
function Si(o, t, e) {
  const n = {}, r = s(t, [
    "systemInstruction"
  ]);
  e !== void 0 && r != null && i(e, ["systemInstruction"], B(o, F(o, r)));
  const l = s(t, ["temperature"]);
  l != null && i(n, ["temperature"], l);
  const u = s(t, ["topP"]);
  u != null && i(n, ["topP"], u);
  const a = s(t, ["topK"]);
  a != null && i(n, ["topK"], a);
  const c = s(t, [
    "candidateCount"
  ]);
  c != null && i(n, ["candidateCount"], c);
  const d = s(t, [
    "maxOutputTokens"
  ]);
  d != null && i(n, ["maxOutputTokens"], d);
  const f = s(t, [
    "stopSequences"
  ]);
  f != null && i(n, ["stopSequences"], f);
  const p = s(t, [
    "responseLogprobs"
  ]);
  p != null && i(n, ["responseLogprobs"], p);
  const h = s(t, ["logprobs"]);
  h != null && i(n, ["logprobs"], h);
  const m = s(t, [
    "presencePenalty"
  ]);
  m != null && i(n, ["presencePenalty"], m);
  const g = s(t, [
    "frequencyPenalty"
  ]);
  g != null && i(n, ["frequencyPenalty"], g);
  const y = s(t, ["seed"]);
  y != null && i(n, ["seed"], y);
  const C = s(t, [
    "responseMimeType"
  ]);
  C != null && i(n, ["responseMimeType"], C);
  const T = s(t, [
    "responseSchema"
  ]);
  T != null && i(n, ["responseSchema"], _t(o, Tt(o, T)));
  const v = s(t, [
    "routingConfig"
  ]);
  v != null && i(n, ["routingConfig"], v);
  const x = s(t, [
    "modelSelectionConfig"
  ]);
  x != null && i(n, ["modelConfig"], pi(o, x));
  const I = s(t, [
    "safetySettings"
  ]);
  e !== void 0 && I != null && (Array.isArray(I) ? i(e, ["safetySettings"], I.map((ne) => mi(o, ne))) : i(e, ["safetySettings"], I));
  const A = s(t, ["tools"]);
  e !== void 0 && A != null && (Array.isArray(A) ? i(e, ["tools"], V(o, V(o, A).map((ne) => St(o, ee(o, ne))))) : i(e, ["tools"], V(o, A)));
  const R = s(t, ["toolConfig"]);
  e !== void 0 && R != null && i(e, ["toolConfig"], vi(o, R));
  const D = s(t, ["labels"]);
  e !== void 0 && D != null && i(e, ["labels"], D);
  const N = s(t, [
    "cachedContent"
  ]);
  e !== void 0 && N != null && i(e, ["cachedContent"], k(o, N));
  const $ = s(t, [
    "responseModalities"
  ]);
  $ != null && i(n, ["responseModalities"], $);
  const q = s(t, [
    "mediaResolution"
  ]);
  q != null && i(n, ["mediaResolution"], q);
  const ue = s(t, ["speechConfig"]);
  ue != null && i(n, ["speechConfig"], xi(o, vt(o, ue)));
  const ce = s(t, [
    "audioTimestamp"
  ]);
  ce != null && i(n, ["audioTimestamp"], ce);
  const de = s(t, [
    "thinkingConfig"
  ]);
  return de != null && i(n, ["thinkingConfig"], _i(o, de)), n;
}
function nt(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["_url", "model"], w(o, n));
  const r = s(t, ["contents"]);
  r != null && (Array.isArray(r) ? i(e, ["contents"], S(o, S(o, r).map((u) => B(o, u)))) : i(e, ["contents"], S(o, r)));
  const l = s(t, ["config"]);
  return l != null && i(e, ["generationConfig"], Si(o, l, e)), e;
}
function Ai(o, t, e) {
  const n = {}, r = s(t, ["taskType"]);
  e !== void 0 && r != null && i(e, ["instances[]", "task_type"], r);
  const l = s(t, ["title"]);
  e !== void 0 && l != null && i(e, ["instances[]", "title"], l);
  const u = s(t, [
    "outputDimensionality"
  ]);
  e !== void 0 && u != null && i(e, ["parameters", "outputDimensionality"], u);
  const a = s(t, ["mimeType"]);
  e !== void 0 && a != null && i(e, ["instances[]", "mimeType"], a);
  const c = s(t, ["autoTruncate"]);
  return e !== void 0 && c != null && i(e, ["parameters", "autoTruncate"], c), n;
}
function wi(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["_url", "model"], w(o, n));
  const r = s(t, ["contents"]);
  r != null && i(e, ["instances[]", "content"], Ct(o, r));
  const l = s(t, ["config"]);
  return l != null && i(e, ["config"], Ai(o, l, e)), e;
}
function Mi(o, t, e) {
  const n = {}, r = s(t, ["outputGcsUri"]);
  e !== void 0 && r != null && i(e, ["parameters", "storageUri"], r);
  const l = s(t, [
    "negativePrompt"
  ]);
  e !== void 0 && l != null && i(e, ["parameters", "negativePrompt"], l);
  const u = s(t, [
    "numberOfImages"
  ]);
  e !== void 0 && u != null && i(e, ["parameters", "sampleCount"], u);
  const a = s(t, ["aspectRatio"]);
  e !== void 0 && a != null && i(e, ["parameters", "aspectRatio"], a);
  const c = s(t, [
    "guidanceScale"
  ]);
  e !== void 0 && c != null && i(e, ["parameters", "guidanceScale"], c);
  const d = s(t, ["seed"]);
  e !== void 0 && d != null && i(e, ["parameters", "seed"], d);
  const f = s(t, [
    "safetyFilterLevel"
  ]);
  e !== void 0 && f != null && i(e, ["parameters", "safetySetting"], f);
  const p = s(t, [
    "personGeneration"
  ]);
  e !== void 0 && p != null && i(e, ["parameters", "personGeneration"], p);
  const h = s(t, [
    "includeSafetyAttributes"
  ]);
  e !== void 0 && h != null && i(e, ["parameters", "includeSafetyAttributes"], h);
  const m = s(t, [
    "includeRaiReason"
  ]);
  e !== void 0 && m != null && i(e, ["parameters", "includeRaiReason"], m);
  const g = s(t, ["language"]);
  e !== void 0 && g != null && i(e, ["parameters", "language"], g);
  const y = s(t, [
    "outputMimeType"
  ]);
  e !== void 0 && y != null && i(e, ["parameters", "outputOptions", "mimeType"], y);
  const C = s(t, [
    "outputCompressionQuality"
  ]);
  e !== void 0 && C != null && i(e, ["parameters", "outputOptions", "compressionQuality"], C);
  const T = s(t, ["addWatermark"]);
  e !== void 0 && T != null && i(e, ["parameters", "addWatermark"], T);
  const v = s(t, [
    "enhancePrompt"
  ]);
  return e !== void 0 && v != null && i(e, ["parameters", "enhancePrompt"], v), n;
}
function Pi(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["_url", "model"], w(o, n));
  const r = s(t, ["prompt"]);
  r != null && i(e, ["instances[0]", "prompt"], r);
  const l = s(t, ["config"]);
  return l != null && i(e, ["config"], Mi(o, l, e)), e;
}
function Ri(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["_url", "name"], w(o, n));
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], r), e;
}
function Di(o, t, e) {
  const n = {}, r = s(t, [
    "systemInstruction"
  ]);
  e !== void 0 && r != null && i(e, ["systemInstruction"], B(o, F(o, r)));
  const l = s(t, ["tools"]);
  e !== void 0 && l != null && (Array.isArray(l) ? i(e, ["tools"], l.map((a) => St(o, a))) : i(e, ["tools"], l));
  const u = s(t, [
    "generationConfig"
  ]);
  return e !== void 0 && u != null && i(e, ["generationConfig"], u), n;
}
function Ni(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["_url", "model"], w(o, n));
  const r = s(t, ["contents"]);
  r != null && (Array.isArray(r) ? i(e, ["contents"], S(o, S(o, r).map((u) => B(o, u)))) : i(e, ["contents"], S(o, r)));
  const l = s(t, ["config"]);
  return l != null && i(e, ["config"], Di(o, l, e)), e;
}
function Fi(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["_url", "model"], w(o, n));
  const r = s(t, ["contents"]);
  r != null && (Array.isArray(r) ? i(e, ["contents"], S(o, S(o, r).map((u) => B(o, u)))) : i(e, ["contents"], S(o, r)));
  const l = s(t, ["config"]);
  return l != null && i(e, ["config"], l), e;
}
function Vi(o, t) {
  const e = {}, n = s(t, ["gcsUri"]);
  n != null && i(e, ["gcsUri"], n);
  const r = s(t, ["imageBytes"]);
  r != null && i(e, ["bytesBase64Encoded"], G(o, r));
  const l = s(t, ["mimeType"]);
  return l != null && i(e, ["mimeType"], l), e;
}
function Ui(o, t, e) {
  const n = {}, r = s(t, [
    "numberOfVideos"
  ]);
  e !== void 0 && r != null && i(e, ["parameters", "sampleCount"], r);
  const l = s(t, ["outputGcsUri"]);
  e !== void 0 && l != null && i(e, ["parameters", "storageUri"], l);
  const u = s(t, ["fps"]);
  e !== void 0 && u != null && i(e, ["parameters", "fps"], u);
  const a = s(t, [
    "durationSeconds"
  ]);
  e !== void 0 && a != null && i(e, ["parameters", "durationSeconds"], a);
  const c = s(t, ["seed"]);
  e !== void 0 && c != null && i(e, ["parameters", "seed"], c);
  const d = s(t, ["aspectRatio"]);
  e !== void 0 && d != null && i(e, ["parameters", "aspectRatio"], d);
  const f = s(t, ["resolution"]);
  e !== void 0 && f != null && i(e, ["parameters", "resolution"], f);
  const p = s(t, [
    "personGeneration"
  ]);
  e !== void 0 && p != null && i(e, ["parameters", "personGeneration"], p);
  const h = s(t, ["pubsubTopic"]);
  e !== void 0 && h != null && i(e, ["parameters", "pubsubTopic"], h);
  const m = s(t, [
    "negativePrompt"
  ]);
  e !== void 0 && m != null && i(e, ["parameters", "negativePrompt"], m);
  const g = s(t, [
    "enhancePrompt"
  ]);
  return e !== void 0 && g != null && i(e, ["parameters", "enhancePrompt"], g), n;
}
function Li(o, t) {
  const e = {}, n = s(t, ["model"]);
  n != null && i(e, ["_url", "model"], w(o, n));
  const r = s(t, ["prompt"]);
  r != null && i(e, ["instances[0]", "prompt"], r);
  const l = s(t, ["image"]);
  l != null && i(e, ["instances[0]", "image"], Vi(o, l));
  const u = s(t, ["config"]);
  return u != null && i(e, ["config"], Ui(o, u, e)), e;
}
function ki(o, t) {
  const e = {}, n = s(t, ["thought"]);
  n != null && i(e, ["thought"], n);
  const r = s(t, [
    "codeExecutionResult"
  ]);
  r != null && i(e, ["codeExecutionResult"], r);
  const l = s(t, [
    "executableCode"
  ]);
  l != null && i(e, ["executableCode"], l);
  const u = s(t, ["fileData"]);
  u != null && i(e, ["fileData"], u);
  const a = s(t, ["functionCall"]);
  a != null && i(e, ["functionCall"], a);
  const c = s(t, [
    "functionResponse"
  ]);
  c != null && i(e, ["functionResponse"], c);
  const d = s(t, ["inlineData"]);
  d != null && i(e, ["inlineData"], d);
  const f = s(t, ["text"]);
  return f != null && i(e, ["text"], f), e;
}
function Gi(o, t) {
  const e = {}, n = s(t, ["parts"]);
  n != null && (Array.isArray(n) ? i(e, ["parts"], n.map((l) => ki(o, l))) : i(e, ["parts"], n));
  const r = s(t, ["role"]);
  return r != null && i(e, ["role"], r), e;
}
function qi(o, t) {
  const e = {}, n = s(t, ["citationSources"]);
  return n != null && i(e, ["citations"], n), e;
}
function Bi(o, t) {
  const e = {}, n = s(t, ["content"]);
  n != null && i(e, ["content"], Gi(o, n));
  const r = s(t, [
    "citationMetadata"
  ]);
  r != null && i(e, ["citationMetadata"], qi(o, r));
  const l = s(t, ["tokenCount"]);
  l != null && i(e, ["tokenCount"], l);
  const u = s(t, ["finishReason"]);
  u != null && i(e, ["finishReason"], u);
  const a = s(t, ["avgLogprobs"]);
  a != null && i(e, ["avgLogprobs"], a);
  const c = s(t, [
    "groundingMetadata"
  ]);
  c != null && i(e, ["groundingMetadata"], c);
  const d = s(t, ["index"]);
  d != null && i(e, ["index"], d);
  const f = s(t, [
    "logprobsResult"
  ]);
  f != null && i(e, ["logprobsResult"], f);
  const p = s(t, [
    "safetyRatings"
  ]);
  return p != null && i(e, ["safetyRatings"], p), e;
}
function ot(o, t) {
  const e = {}, n = s(t, ["candidates"]);
  n != null && (Array.isArray(n) ? i(e, ["candidates"], n.map((a) => Bi(o, a))) : i(e, ["candidates"], n));
  const r = s(t, ["modelVersion"]);
  r != null && i(e, ["modelVersion"], r);
  const l = s(t, [
    "promptFeedback"
  ]);
  l != null && i(e, ["promptFeedback"], l);
  const u = s(t, [
    "usageMetadata"
  ]);
  return u != null && i(e, ["usageMetadata"], u), e;
}
function $i(o, t) {
  const e = {}, n = s(t, ["values"]);
  return n != null && i(e, ["values"], n), e;
}
function Hi() {
  return {};
}
function Yi(o, t) {
  const e = {}, n = s(t, ["embeddings"]);
  return n != null && (Array.isArray(n) ? i(e, ["embeddings"], n.map((l) => $i(o, l))) : i(e, ["embeddings"], n)), s(t, ["metadata"]) != null && i(e, ["metadata"], Hi()), e;
}
function zi(o, t) {
  const e = {}, n = s(t, [
    "bytesBase64Encoded"
  ]);
  n != null && i(e, ["imageBytes"], G(o, n));
  const r = s(t, ["mimeType"]);
  return r != null && i(e, ["mimeType"], r), e;
}
function At(o, t) {
  const e = {}, n = s(t, [
    "safetyAttributes",
    "categories"
  ]);
  n != null && i(e, ["categories"], n);
  const r = s(t, [
    "safetyAttributes",
    "scores"
  ]);
  r != null && i(e, ["scores"], r);
  const l = s(t, ["contentType"]);
  return l != null && i(e, ["contentType"], l), e;
}
function Ki(o, t) {
  const e = {}, n = s(t, ["_self"]);
  n != null && i(e, ["image"], zi(o, n));
  const r = s(t, [
    "raiFilteredReason"
  ]);
  r != null && i(e, ["raiFilteredReason"], r);
  const l = s(t, ["_self"]);
  return l != null && i(e, ["safetyAttributes"], At(o, l)), e;
}
function Wi(o, t) {
  const e = {}, n = s(t, [
    "predictions"
  ]);
  n != null && (Array.isArray(n) ? i(e, ["generatedImages"], n.map((l) => Ki(o, l))) : i(e, ["generatedImages"], n));
  const r = s(t, [
    "positivePromptSafetyAttributes"
  ]);
  return r != null && i(e, ["positivePromptSafetyAttributes"], At(o, r)), e;
}
function Ji(o, t) {
  const e = {}, n = s(t, ["baseModel"]);
  n != null && i(e, ["baseModel"], n);
  const r = s(t, ["createTime"]);
  r != null && i(e, ["createTime"], r);
  const l = s(t, ["updateTime"]);
  return l != null && i(e, ["updateTime"], l), e;
}
function Xi(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["name"], n);
  const r = s(t, ["displayName"]);
  r != null && i(e, ["displayName"], r);
  const l = s(t, ["description"]);
  l != null && i(e, ["description"], l);
  const u = s(t, ["version"]);
  u != null && i(e, ["version"], u);
  const a = s(t, ["_self"]);
  a != null && i(e, ["tunedModelInfo"], Ji(o, a));
  const c = s(t, [
    "inputTokenLimit"
  ]);
  c != null && i(e, ["inputTokenLimit"], c);
  const d = s(t, [
    "outputTokenLimit"
  ]);
  d != null && i(e, ["outputTokenLimit"], d);
  const f = s(t, [
    "supportedGenerationMethods"
  ]);
  return f != null && i(e, ["supportedActions"], f), e;
}
function Qi(o, t) {
  const e = {}, n = s(t, ["totalTokens"]);
  n != null && i(e, ["totalTokens"], n);
  const r = s(t, [
    "cachedContentTokenCount"
  ]);
  return r != null && i(e, ["cachedContentTokenCount"], r), e;
}
function Zi(o, t) {
  const e = {}, n = s(t, ["video", "uri"]);
  n != null && i(e, ["uri"], n);
  const r = s(t, [
    "video",
    "encodedVideo"
  ]);
  r != null && i(e, ["videoBytes"], G(o, r));
  const l = s(t, ["encoding"]);
  return l != null && i(e, ["mimeType"], l), e;
}
function Oi(o, t) {
  const e = {}, n = s(t, ["_self"]);
  return n != null && i(e, ["video"], Zi(o, n)), e;
}
function bi(o, t) {
  const e = {}, n = s(t, [
    "generatedSamples"
  ]);
  n != null && (Array.isArray(n) ? i(e, ["generatedVideos"], n.map((u) => Oi(o, u))) : i(e, ["generatedVideos"], n));
  const r = s(t, [
    "raiMediaFilteredCount"
  ]);
  r != null && i(e, ["raiMediaFilteredCount"], r);
  const l = s(t, [
    "raiMediaFilteredReasons"
  ]);
  return l != null && i(e, ["raiMediaFilteredReasons"], l), e;
}
function ji(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["name"], n);
  const r = s(t, ["metadata"]);
  r != null && i(e, ["metadata"], r);
  const l = s(t, ["done"]);
  l != null && i(e, ["done"], l);
  const u = s(t, ["error"]);
  u != null && i(e, ["error"], u);
  const a = s(t, [
    "response",
    "generateVideoResponse"
  ]);
  return a != null && i(e, ["response"], bi(o, a)), e;
}
function es(o, t) {
  const e = {}, n = s(t, [
    "videoMetadata"
  ]);
  n != null && i(e, ["videoMetadata"], n);
  const r = s(t, ["thought"]);
  r != null && i(e, ["thought"], r);
  const l = s(t, [
    "codeExecutionResult"
  ]);
  l != null && i(e, ["codeExecutionResult"], l);
  const u = s(t, [
    "executableCode"
  ]);
  u != null && i(e, ["executableCode"], u);
  const a = s(t, ["fileData"]);
  a != null && i(e, ["fileData"], a);
  const c = s(t, ["functionCall"]);
  c != null && i(e, ["functionCall"], c);
  const d = s(t, [
    "functionResponse"
  ]);
  d != null && i(e, ["functionResponse"], d);
  const f = s(t, ["inlineData"]);
  f != null && i(e, ["inlineData"], f);
  const p = s(t, ["text"]);
  return p != null && i(e, ["text"], p), e;
}
function ts(o, t) {
  const e = {}, n = s(t, ["parts"]);
  n != null && (Array.isArray(n) ? i(e, ["parts"], n.map((l) => es(o, l))) : i(e, ["parts"], n));
  const r = s(t, ["role"]);
  return r != null && i(e, ["role"], r), e;
}
function ns(o, t) {
  const e = {}, n = s(t, ["citations"]);
  return n != null && i(e, ["citations"], n), e;
}
function os(o, t) {
  const e = {}, n = s(t, ["content"]);
  n != null && i(e, ["content"], ts(o, n));
  const r = s(t, [
    "citationMetadata"
  ]);
  r != null && i(e, ["citationMetadata"], ns(o, r));
  const l = s(t, [
    "finishMessage"
  ]);
  l != null && i(e, ["finishMessage"], l);
  const u = s(t, ["finishReason"]);
  u != null && i(e, ["finishReason"], u);
  const a = s(t, ["avgLogprobs"]);
  a != null && i(e, ["avgLogprobs"], a);
  const c = s(t, [
    "groundingMetadata"
  ]);
  c != null && i(e, ["groundingMetadata"], c);
  const d = s(t, ["index"]);
  d != null && i(e, ["index"], d);
  const f = s(t, [
    "logprobsResult"
  ]);
  f != null && i(e, ["logprobsResult"], f);
  const p = s(t, [
    "safetyRatings"
  ]);
  return p != null && i(e, ["safetyRatings"], p), e;
}
function it(o, t) {
  const e = {}, n = s(t, ["candidates"]);
  n != null && (Array.isArray(n) ? i(e, ["candidates"], n.map((d) => os(o, d))) : i(e, ["candidates"], n));
  const r = s(t, ["createTime"]);
  r != null && i(e, ["createTime"], r);
  const l = s(t, ["responseId"]);
  l != null && i(e, ["responseId"], l);
  const u = s(t, ["modelVersion"]);
  u != null && i(e, ["modelVersion"], u);
  const a = s(t, [
    "promptFeedback"
  ]);
  a != null && i(e, ["promptFeedback"], a);
  const c = s(t, [
    "usageMetadata"
  ]);
  return c != null && i(e, ["usageMetadata"], c), e;
}
function is(o, t) {
  const e = {}, n = s(t, ["truncated"]);
  n != null && i(e, ["truncated"], n);
  const r = s(t, ["token_count"]);
  return r != null && i(e, ["tokenCount"], r), e;
}
function ss(o, t) {
  const e = {}, n = s(t, ["values"]);
  n != null && i(e, ["values"], n);
  const r = s(t, ["statistics"]);
  return r != null && i(e, ["statistics"], is(o, r)), e;
}
function rs(o, t) {
  const e = {}, n = s(t, [
    "billableCharacterCount"
  ]);
  return n != null && i(e, ["billableCharacterCount"], n), e;
}
function ls(o, t) {
  const e = {}, n = s(t, [
    "predictions[]",
    "embeddings"
  ]);
  n != null && (Array.isArray(n) ? i(e, ["embeddings"], n.map((l) => ss(o, l))) : i(e, ["embeddings"], n));
  const r = s(t, ["metadata"]);
  return r != null && i(e, ["metadata"], rs(o, r)), e;
}
function as(o, t) {
  const e = {}, n = s(t, ["gcsUri"]);
  n != null && i(e, ["gcsUri"], n);
  const r = s(t, [
    "bytesBase64Encoded"
  ]);
  r != null && i(e, ["imageBytes"], G(o, r));
  const l = s(t, ["mimeType"]);
  return l != null && i(e, ["mimeType"], l), e;
}
function wt(o, t) {
  const e = {}, n = s(t, [
    "safetyAttributes",
    "categories"
  ]);
  n != null && i(e, ["categories"], n);
  const r = s(t, [
    "safetyAttributes",
    "scores"
  ]);
  r != null && i(e, ["scores"], r);
  const l = s(t, ["contentType"]);
  return l != null && i(e, ["contentType"], l), e;
}
function us(o, t) {
  const e = {}, n = s(t, ["_self"]);
  n != null && i(e, ["image"], as(o, n));
  const r = s(t, [
    "raiFilteredReason"
  ]);
  r != null && i(e, ["raiFilteredReason"], r);
  const l = s(t, ["_self"]);
  l != null && i(e, ["safetyAttributes"], wt(o, l));
  const u = s(t, ["prompt"]);
  return u != null && i(e, ["enhancedPrompt"], u), e;
}
function cs(o, t) {
  const e = {}, n = s(t, [
    "predictions"
  ]);
  n != null && (Array.isArray(n) ? i(e, ["generatedImages"], n.map((l) => us(o, l))) : i(e, ["generatedImages"], n));
  const r = s(t, [
    "positivePromptSafetyAttributes"
  ]);
  return r != null && i(e, ["positivePromptSafetyAttributes"], wt(o, r)), e;
}
function ds(o, t) {
  const e = {}, n = s(t, ["endpoint"]);
  n != null && i(e, ["name"], n);
  const r = s(t, [
    "deployedModelId"
  ]);
  return r != null && i(e, ["deployedModelId"], r), e;
}
function fs(o, t) {
  const e = {}, n = s(t, [
    "labels",
    "google-vertex-llm-tuning-base-model-id"
  ]);
  n != null && i(e, ["baseModel"], n);
  const r = s(t, ["createTime"]);
  r != null && i(e, ["createTime"], r);
  const l = s(t, ["updateTime"]);
  return l != null && i(e, ["updateTime"], l), e;
}
function ps(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["name"], n);
  const r = s(t, ["displayName"]);
  r != null && i(e, ["displayName"], r);
  const l = s(t, ["description"]);
  l != null && i(e, ["description"], l);
  const u = s(t, ["versionId"]);
  u != null && i(e, ["version"], u);
  const a = s(t, ["deployedModels"]);
  a != null && (Array.isArray(a) ? i(e, ["endpoints"], a.map((f) => ds(o, f))) : i(e, ["endpoints"], a));
  const c = s(t, ["labels"]);
  c != null && i(e, ["labels"], c);
  const d = s(t, ["_self"]);
  return d != null && i(e, ["tunedModelInfo"], fs(o, d)), e;
}
function ms(o, t) {
  const e = {}, n = s(t, ["totalTokens"]);
  return n != null && i(e, ["totalTokens"], n), e;
}
function hs(o, t) {
  const e = {}, n = s(t, ["tokensInfo"]);
  return n != null && i(e, ["tokensInfo"], n), e;
}
function gs(o, t) {
  const e = {}, n = s(t, ["gcsUri"]);
  n != null && i(e, ["uri"], n);
  const r = s(t, [
    "bytesBase64Encoded"
  ]);
  r != null && i(e, ["videoBytes"], G(o, r));
  const l = s(t, ["mimeType"]);
  return l != null && i(e, ["mimeType"], l), e;
}
function ys(o, t) {
  const e = {}, n = s(t, ["_self"]);
  return n != null && i(e, ["video"], gs(o, n)), e;
}
function Cs(o, t) {
  const e = {}, n = s(t, ["videos"]);
  n != null && (Array.isArray(n) ? i(e, ["generatedVideos"], n.map((u) => ys(o, u))) : i(e, ["generatedVideos"], n));
  const r = s(t, [
    "raiMediaFilteredCount"
  ]);
  r != null && i(e, ["raiMediaFilteredCount"], r);
  const l = s(t, [
    "raiMediaFilteredReasons"
  ]);
  return l != null && i(e, ["raiMediaFilteredReasons"], l), e;
}
function Ts(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["name"], n);
  const r = s(t, ["metadata"]);
  r != null && i(e, ["metadata"], r);
  const l = s(t, ["done"]);
  l != null && i(e, ["done"], l);
  const u = s(t, ["error"]);
  u != null && i(e, ["error"], u);
  const a = s(t, ["response"]);
  return a != null && i(e, ["response"], Cs(o, a)), e;
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const vs = "FunctionResponse request must have an `id` field from the response of a ToolCall.FunctionalCalls in Google AI.";
async function Es(o, t, e) {
  let n, r;
  e.data instanceof Blob ? r = JSON.parse(await e.data.text()) : r = JSON.parse(e.data), o.isVertexAI() ? n = Bo(o, r) : n = qo(o, r), t(n);
}
class Is {
  constructor(t, e, n) {
    this.apiClient = t, this.auth = e, this.webSocketFactory = n;
  }
  /**
       Establishes a connection to the specified model with the given
       configuration and returns a Session object representing that connection.
  
       @experimental
  
       @remarks
  
       @param params - The parameters for establishing a connection to the model.
       @return A live session.
  
       @example
       ```ts
       let model: string;
       if (GOOGLE_GENAI_USE_VERTEXAI) {
         model = 'gemini-2.0-flash-live-preview-04-09';
       } else {
         model = 'gemini-2.0-flash-live-001';
       }
       const session = await ai.live.connect({
         model: model,
         config: {
           responseModalities: [Modality.AUDIO],
         },
         callbacks: {
           onopen: () => {
             console.log('Connected to the socket.');
           },
           onmessage: (e: MessageEvent) => {
             console.log('Received message from the server: %s\n', debug(e.data));
           },
           onerror: (e: ErrorEvent) => {
             console.log('Error occurred: %s\n', debug(e.error));
           },
           onclose: (e: CloseEvent) => {
             console.log('Connection closed.');
           },
         },
       });
       ```
      */
  async connect(t) {
    var e, n, r, l;
    const u = this.apiClient.getWebsocketBaseUrl(), a = this.apiClient.getApiVersion();
    let c;
    const d = As(this.apiClient.getDefaultHeaders());
    if (this.apiClient.isVertexAI())
      c = `${u}/ws/google.cloud.aiplatform.${a}.LlmBidiService/BidiGenerateContent`, await this.auth.addAuthHeaders(d);
    else {
      const I = this.apiClient.getApiKey();
      c = `${u}/ws/google.ai.generativelanguage.${a}.GenerativeService.BidiGenerateContent?key=${I}`;
    }
    let f = () => {
    };
    const p = new Promise((I) => {
      f = I;
    }), h = t.callbacks, m = function() {
      var I;
      (I = h?.onopen) === null || I === void 0 || I.call(h), f({});
    }, g = this.apiClient, y = {
      onopen: m,
      onmessage: (I) => {
        Es(g, h.onmessage, I);
      },
      onerror: (e = h?.onerror) !== null && e !== void 0 ? e : function(I) {
      },
      onclose: (n = h?.onclose) !== null && n !== void 0 ? n : function(I) {
      }
    }, C = this.webSocketFactory.create(c, Ss(d), y);
    C.connect(), await p;
    let T = w(this.apiClient, t.model);
    if (this.apiClient.isVertexAI() && T.startsWith("publishers/")) {
      const I = this.apiClient.getProject(), A = this.apiClient.getLocation();
      T = `projects/${I}/locations/${A}/` + T;
    }
    let v = {};
    this.apiClient.isVertexAI() && ((r = t.config) === null || r === void 0 ? void 0 : r.responseModalities) === void 0 && (t.config === void 0 ? t.config = { responseModalities: [Y.AUDIO] } : t.config.responseModalities = [Y.AUDIO]), !((l = t.config) === null || l === void 0) && l.generationConfig && console.warn("Setting `LiveConnectConfig.generation_config` is deprecated, please set the fields on `LiveConnectConfig` directly. This will become an error in a future version (not before Q3 2025).");
    const x = {
      model: T,
      config: t.config,
      callbacks: t.callbacks
    };
    return this.apiClient.isVertexAI() ? v = Co(this.apiClient, x) : v = yo(this.apiClient, x), delete v.config, C.send(JSON.stringify(v)), new _s(C, this.apiClient);
  }
}
const xs = {
  turnComplete: !0
};
class _s {
  constructor(t, e) {
    this.conn = t, this.apiClient = e;
  }
  tLiveClientContent(t, e) {
    if (e.turns !== null && e.turns !== void 0) {
      let n = [];
      try {
        n = S(t, e.turns), t.isVertexAI() ? n = n.map((r) => B(t, r)) : n = n.map((r) => te(t, r));
      } catch {
        throw new Error(`Failed to parse client content "turns", type: '${typeof e.turns}'`);
      }
      return {
        clientContent: { turns: n, turnComplete: e.turnComplete }
      };
    }
    return {
      clientContent: { turnComplete: e.turnComplete }
    };
  }
  tLiveClientRealtimeInput(t, e) {
    let n = {};
    if (!("media" in e) || !e.media)
      throw new Error(`Failed to convert realtime input "media", type: '${typeof e.media}'`);
    return n = {
      realtimeInput: {
        mediaChunks: [e.media],
        activityStart: e.activityStart,
        activityEnd: e.activityEnd
      }
    }, n;
  }
  tLiveClienttToolResponse(t, e) {
    let n = [];
    if (e.functionResponses == null)
      throw new Error("functionResponses is required.");
    if (Array.isArray(e.functionResponses) ? n = e.functionResponses : n = [e.functionResponses], n.length === 0)
      throw new Error("functionResponses is required.");
    for (const l of n) {
      if (typeof l != "object" || l === null || !("name" in l) || !("response" in l))
        throw new Error(`Could not parse function response, type '${typeof l}'.`);
      if (!t.isVertexAI() && !("id" in l))
        throw new Error(vs);
    }
    return {
      toolResponse: { functionResponses: n }
    };
  }
  /**
      Send a message over the established connection.
  
      @param params - Contains two **optional** properties, `turns` and
          `turnComplete`.
  
        - `turns` will be converted to a `Content[]`
        - `turnComplete: true` [default] indicates that you are done sending
          content and expect a response. If `turnComplete: false`, the server
          will wait for additional messages before starting generation.
  
      @experimental
  
      @remarks
      There are two ways to send messages to the live API:
      `sendClientContent` and `sendRealtimeInput`.
  
      `sendClientContent` messages are added to the model context **in order**.
      Having a conversation using `sendClientContent` messages is roughly
      equivalent to using the `Chat.sendMessageStream`, except that the state of
      the `chat` history is stored on the API server instead of locally.
  
      Because of `sendClientContent`'s order guarantee, the model cannot respons
      as quickly to `sendClientContent` messages as to `sendRealtimeInput`
      messages. This makes the biggest difference when sending objects that have
      significant preprocessing time (typically images).
  
      The `sendClientContent` message sends a `Content[]`
      which has more options than the `Blob` sent by `sendRealtimeInput`.
  
      So the main use-cases for `sendClientContent` over `sendRealtimeInput` are:
  
      - Sending anything that can't be represented as a `Blob` (text,
      `sendClientContent({turns="Hello?"}`)).
      - Managing turns when not using audio input and voice activity detection.
        (`sendClientContent({turnComplete:true})` or the short form
      `sendClientContent()`)
      - Prefilling a conversation context
        ```
        sendClientContent({
            turns: [
              Content({role:user, parts:...}),
              Content({role:user, parts:...}),
              ...
            ]
        })
        ```
      @experimental
     */
  sendClientContent(t) {
    t = Object.assign(Object.assign({}, xs), t);
    const e = this.tLiveClientContent(this.apiClient, t);
    this.conn.send(JSON.stringify(e));
  }
  /**
      Send a realtime message over the established connection.
  
      @param params - Contains one property, `media`.
  
        - `media` will be converted to a `Blob`
  
      @experimental
  
      @remarks
      Use `sendRealtimeInput` for realtime audio chunks and video frames (images).
  
      With `sendRealtimeInput` the api will respond to audio automatically
      based on voice activity detection (VAD).
  
      `sendRealtimeInput` is optimized for responsivness at the expense of
      deterministic ordering guarantees. Audio and video tokens are to the
      context when they become available.
  
      Note: The Call signature expects a `Blob` object, but only a subset
      of audio and image mimetypes are allowed.
     */
  sendRealtimeInput(t) {
    if (t.media == null)
      throw new Error("Media is required.");
    const e = this.tLiveClientRealtimeInput(this.apiClient, t);
    this.conn.send(JSON.stringify(e));
  }
  /**
      Send a function response message over the established connection.
  
      @param params - Contains property `functionResponses`.
  
        - `functionResponses` will be converted to a `functionResponses[]`
  
      @remarks
      Use `sendFunctionResponse` to reply to `LiveServerToolCall` from the server.
  
      Use {@link types.LiveConnectConfig#tools} to configure the callable functions.
  
      @experimental
     */
  sendToolResponse(t) {
    if (t.functionResponses == null)
      throw new Error("Tool response parameters are required.");
    const e = this.tLiveClienttToolResponse(this.apiClient, t);
    this.conn.send(JSON.stringify(e));
  }
  /**
       Terminates the WebSocket connection.
  
       @experimental
  
       @example
       ```ts
       let model: string;
       if (GOOGLE_GENAI_USE_VERTEXAI) {
         model = 'gemini-2.0-flash-live-preview-04-09';
       } else {
         model = 'gemini-2.0-flash-live-001';
       }
       const session = await ai.live.connect({
         model: model,
         config: {
           responseModalities: [Modality.AUDIO],
         }
       });
  
       session.close();
       ```
     */
  close() {
    this.conn.close();
  }
}
function Ss(o) {
  const t = {};
  return o.forEach((e, n) => {
    t[n] = e;
  }), t;
}
function As(o) {
  const t = new Headers();
  for (const [e, n] of Object.entries(o))
    t.append(e, n);
  return t;
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class ws extends j {
  constructor(t) {
    super(), this.apiClient = t, this.generateContent = async (e) => await this.generateContentInternal(e), this.generateContentStream = async (e) => await this.generateContentStreamInternal(e), this.generateImages = async (e) => await this.generateImagesInternal(e).then((n) => {
      var r;
      let l;
      const u = [];
      if (n?.generatedImages)
        for (const c of n.generatedImages)
          c && c?.safetyAttributes && ((r = c?.safetyAttributes) === null || r === void 0 ? void 0 : r.contentType) === "Positive Prompt" ? l = c?.safetyAttributes : u.push(c);
      let a;
      return l ? a = {
        generatedImages: u,
        positivePromptSafetyAttributes: l
      } : a = {
        generatedImages: u
      }, a;
    });
  }
  async generateContentInternal(t) {
    var e, n;
    let r, l = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const a = nt(this.apiClient, t);
      return l = E("{model}:generateContent", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((c) => c.json()), r.then((c) => {
        const d = it(this.apiClient, c), f = new K();
        return Object.assign(f, d), f;
      });
    } else {
      const a = tt(this.apiClient, t);
      return l = E("{model}:generateContent", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (n = t.config) === null || n === void 0 ? void 0 : n.httpOptions
      }).then((c) => c.json()), r.then((c) => {
        const d = ot(this.apiClient, c), f = new K();
        return Object.assign(f, d), f;
      });
    }
  }
  async generateContentStreamInternal(t) {
    var e, n;
    let r, l = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const a = nt(this.apiClient, t);
      l = E("{model}:streamGenerateContent?alt=sse", a._url), u = a._query, delete a.config, delete a._url, delete a._query;
      const c = this.apiClient;
      return r = c.requestStream({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }), r.then(function(d) {
        return b(this, arguments, function* () {
          var f, p, h, m;
          try {
            for (var g = !0, y = re(d), C; C = yield M(y.next()), f = C.done, !f; g = !0) {
              m = C.value, g = !1;
              const v = it(c, yield M(m.json())), x = new K();
              Object.assign(x, v), yield yield M(x);
            }
          } catch (T) {
            p = { error: T };
          } finally {
            try {
              !g && !f && (h = y.return) && (yield M(h.call(y)));
            } finally {
              if (p) throw p.error;
            }
          }
        });
      });
    } else {
      const a = tt(this.apiClient, t);
      l = E("{model}:streamGenerateContent?alt=sse", a._url), u = a._query, delete a.config, delete a._url, delete a._query;
      const c = this.apiClient;
      return r = c.requestStream({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (n = t.config) === null || n === void 0 ? void 0 : n.httpOptions
      }), r.then(function(d) {
        return b(this, arguments, function* () {
          var f, p, h, m;
          try {
            for (var g = !0, y = re(d), C; C = yield M(y.next()), f = C.done, !f; g = !0) {
              m = C.value, g = !1;
              const v = ot(c, yield M(m.json())), x = new K();
              Object.assign(x, v), yield yield M(x);
            }
          } catch (T) {
            p = { error: T };
          } finally {
            try {
              !g && !f && (h = y.return) && (yield M(h.call(y)));
            } finally {
              if (p) throw p.error;
            }
          }
        });
      });
    }
  }
  /**
   * Calculates embeddings for the given contents. Only text is supported.
   *
   * @param params - The parameters for embedding contents.
   * @return The response from the API.
   *
   * @example
   * ```ts
   * const response = await ai.models.embedContent({
   *  model: 'text-embedding-004',
   *  contents: [
   *    'What is your name?',
   *    'What is your favorite color?',
   *  ],
   *  config: {
   *    outputDimensionality: 64,
   *  },
   * });
   * console.log(response);
   * ```
   */
  async embedContent(t) {
    var e, n;
    let r, l = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const a = wi(this.apiClient, t);
      return l = E("{model}:predict", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((c) => c.json()), r.then((c) => {
        const d = ls(this.apiClient, c), f = new We();
        return Object.assign(f, d), f;
      });
    } else {
      const a = oi(this.apiClient, t);
      return l = E("{model}:batchEmbedContents", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (n = t.config) === null || n === void 0 ? void 0 : n.httpOptions
      }).then((c) => c.json()), r.then((c) => {
        const d = Yi(this.apiClient, c), f = new We();
        return Object.assign(f, d), f;
      });
    }
  }
  /**
   * Generates an image based on a text description and configuration.
   *
   * @param params - The parameters for generating images.
   * @return The response from the API.
   *
   * @example
   * ```ts
   * const response = await ai.models.generateImages({
   *  model: 'imagen-3.0-generate-002',
   *  prompt: 'Robot holding a red skateboard',
   *  config: {
   *    numberOfImages: 1,
   *    includeRaiReason: true,
   *  },
   * });
   * console.log(response?.generatedImages?.[0]?.image?.imageBytes);
   * ```
   */
  async generateImagesInternal(t) {
    var e, n;
    let r, l = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const a = Pi(this.apiClient, t);
      return l = E("{model}:predict", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((c) => c.json()), r.then((c) => {
        const d = cs(this.apiClient, c), f = new Je();
        return Object.assign(f, d), f;
      });
    } else {
      const a = si(this.apiClient, t);
      return l = E("{model}:predict", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (n = t.config) === null || n === void 0 ? void 0 : n.httpOptions
      }).then((c) => c.json()), r.then((c) => {
        const d = Wi(this.apiClient, c), f = new Je();
        return Object.assign(f, d), f;
      });
    }
  }
  /**
   * Fetches information about a model by name.
   *
   * @example
   * ```ts
   * const modelInfo = await ai.models.get({model: 'gemini-2.0-flash'});
   * ```
   */
  async get(t) {
    var e, n;
    let r, l = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const a = Ri(this.apiClient, t);
      return l = E("{name}", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "GET",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((c) => c.json()), r.then((c) => ps(this.apiClient, c));
    } else {
      const a = ri(this.apiClient, t);
      return l = E("{name}", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "GET",
        httpOptions: (n = t.config) === null || n === void 0 ? void 0 : n.httpOptions
      }).then((c) => c.json()), r.then((c) => Xi(this.apiClient, c));
    }
  }
  /**
   * Counts the number of tokens in the given contents. Multimodal input is
   * supported for Gemini models.
   *
   * @param params - The parameters for counting tokens.
   * @return The response from the API.
   *
   * @example
   * ```ts
   * const response = await ai.models.countTokens({
   *  model: 'gemini-2.0-flash',
   *  contents: 'The quick brown fox jumps over the lazy dog.'
   * });
   * console.log(response);
   * ```
   */
  async countTokens(t) {
    var e, n;
    let r, l = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const a = Ni(this.apiClient, t);
      return l = E("{model}:countTokens", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((c) => c.json()), r.then((c) => {
        const d = ms(this.apiClient, c), f = new Xe();
        return Object.assign(f, d), f;
      });
    } else {
      const a = ai(this.apiClient, t);
      return l = E("{model}:countTokens", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (n = t.config) === null || n === void 0 ? void 0 : n.httpOptions
      }).then((c) => c.json()), r.then((c) => {
        const d = Qi(this.apiClient, c), f = new Xe();
        return Object.assign(f, d), f;
      });
    }
  }
  /**
   * Given a list of contents, returns a corresponding TokensInfo containing
   * the list of tokens and list of token ids.
   *
   * This method is not supported by the Gemini Developer API.
   *
   * @param params - The parameters for computing tokens.
   * @return The response from the API.
   *
   * @example
   * ```ts
   * const response = await ai.models.computeTokens({
   *  model: 'gemini-2.0-flash',
   *  contents: 'What is your name?'
   * });
   * console.log(response);
   * ```
   */
  async computeTokens(t) {
    var e;
    let n, r = "", l = {};
    if (this.apiClient.isVertexAI()) {
      const u = Fi(this.apiClient, t);
      return r = E("{model}:computeTokens", u._url), l = u._query, delete u.config, delete u._url, delete u._query, n = this.apiClient.request({
        path: r,
        queryParams: l,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((a) => a.json()), n.then((a) => {
        const c = hs(this.apiClient, a), d = new vn();
        return Object.assign(d, c), d;
      });
    } else
      throw new Error("This method is only supported by the Vertex AI.");
  }
  /**
   *  Generates videos based on a text description and configuration.
   *
   * @param params - The parameters for generating videos.
   * @return A Promise<GenerateVideosOperation> which allows you to track the progress and eventually retrieve the generated videos using the operations.get method.
   *
   * @example
   * ```ts
   * const operation = await ai.models.generateVideos({
   *  model: 'veo-2.0-generate-001',
   *  prompt: 'A neon hologram of a cat driving at top speed',
   *  config: {
   *    numberOfVideos: 1
   * });
   *
   * while (!operation.done) {
   *   await new Promise(resolve => setTimeout(resolve, 10000));
   *   operation = await ai.operations.getVideosOperation({operation: operation});
   * }
   *
   * console.log(operation.response?.generatedVideos?.[0]?.video?.uri);
   * ```
   */
  async generateVideos(t) {
    var e, n;
    let r, l = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const a = Li(this.apiClient, t);
      return l = E("{model}:predictLongRunning", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((c) => c.json()), r.then((c) => Ts(this.apiClient, c));
    } else {
      const a = di(this.apiClient, t);
      return l = E("{model}:predictLongRunning", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "POST",
        httpOptions: (n = t.config) === null || n === void 0 ? void 0 : n.httpOptions
      }).then((c) => c.json()), r.then((c) => ji(this.apiClient, c));
    }
  }
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function Ms(o, t) {
  const e = {}, n = s(t, [
    "operationName"
  ]);
  n != null && i(e, ["_url", "operationName"], n);
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], r), e;
}
function Ps(o, t) {
  const e = {}, n = s(t, [
    "operationName"
  ]);
  n != null && i(e, ["_url", "operationName"], n);
  const r = s(t, ["config"]);
  return r != null && i(e, ["config"], r), e;
}
function Rs(o, t) {
  const e = {}, n = s(t, [
    "operationName"
  ]);
  n != null && i(e, ["operationName"], n);
  const r = s(t, ["resourceName"]);
  r != null && i(e, ["_url", "resourceName"], r);
  const l = s(t, ["config"]);
  return l != null && i(e, ["config"], l), e;
}
function Ds(o, t) {
  const e = {}, n = s(t, ["video", "uri"]);
  n != null && i(e, ["uri"], n);
  const r = s(t, [
    "video",
    "encodedVideo"
  ]);
  r != null && i(e, ["videoBytes"], G(o, r));
  const l = s(t, ["encoding"]);
  return l != null && i(e, ["mimeType"], l), e;
}
function Ns(o, t) {
  const e = {}, n = s(t, ["_self"]);
  return n != null && i(e, ["video"], Ds(o, n)), e;
}
function Fs(o, t) {
  const e = {}, n = s(t, [
    "generatedSamples"
  ]);
  n != null && (Array.isArray(n) ? i(e, ["generatedVideos"], n.map((u) => Ns(o, u))) : i(e, ["generatedVideos"], n));
  const r = s(t, [
    "raiMediaFilteredCount"
  ]);
  r != null && i(e, ["raiMediaFilteredCount"], r);
  const l = s(t, [
    "raiMediaFilteredReasons"
  ]);
  return l != null && i(e, ["raiMediaFilteredReasons"], l), e;
}
function Vs(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["name"], n);
  const r = s(t, ["metadata"]);
  r != null && i(e, ["metadata"], r);
  const l = s(t, ["done"]);
  l != null && i(e, ["done"], l);
  const u = s(t, ["error"]);
  u != null && i(e, ["error"], u);
  const a = s(t, [
    "response",
    "generateVideoResponse"
  ]);
  return a != null && i(e, ["response"], Fs(o, a)), e;
}
function Us(o, t) {
  const e = {}, n = s(t, ["gcsUri"]);
  n != null && i(e, ["uri"], n);
  const r = s(t, [
    "bytesBase64Encoded"
  ]);
  r != null && i(e, ["videoBytes"], G(o, r));
  const l = s(t, ["mimeType"]);
  return l != null && i(e, ["mimeType"], l), e;
}
function Ls(o, t) {
  const e = {}, n = s(t, ["_self"]);
  return n != null && i(e, ["video"], Us(o, n)), e;
}
function ks(o, t) {
  const e = {}, n = s(t, ["videos"]);
  n != null && (Array.isArray(n) ? i(e, ["generatedVideos"], n.map((u) => Ls(o, u))) : i(e, ["generatedVideos"], n));
  const r = s(t, [
    "raiMediaFilteredCount"
  ]);
  r != null && i(e, ["raiMediaFilteredCount"], r);
  const l = s(t, [
    "raiMediaFilteredReasons"
  ]);
  return l != null && i(e, ["raiMediaFilteredReasons"], l), e;
}
function st(o, t) {
  const e = {}, n = s(t, ["name"]);
  n != null && i(e, ["name"], n);
  const r = s(t, ["metadata"]);
  r != null && i(e, ["metadata"], r);
  const l = s(t, ["done"]);
  l != null && i(e, ["done"], l);
  const u = s(t, ["error"]);
  u != null && i(e, ["error"], u);
  const a = s(t, ["response"]);
  return a != null && i(e, ["response"], ks(o, a)), e;
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Gs extends j {
  constructor(t) {
    super(), this.apiClient = t;
  }
  /**
   * Gets the status of a long-running operation.
   *
   * @param parameters The parameters for the get operation request.
   * @return The updated Operation object, with the latest status or result.
   */
  async getVideosOperation(t) {
    const e = t.operation, n = t.config;
    if (e.name === void 0 || e.name === "")
      throw new Error("Operation name is required.");
    if (this.apiClient.isVertexAI()) {
      const r = e.name.split("/operations/")[0];
      let l;
      return n && "httpOptions" in n && (l = n.httpOptions), this.fetchPredictVideosOperationInternal({
        operationName: e.name,
        resourceName: r,
        config: { httpOptions: l }
      });
    } else
      return this.getVideosOperationInternal({
        operationName: e.name,
        config: n
      });
  }
  async getVideosOperationInternal(t) {
    var e, n;
    let r, l = "", u = {};
    if (this.apiClient.isVertexAI()) {
      const a = Ps(this.apiClient, t);
      return l = E("{operationName}", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "GET",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((c) => c.json()), r.then((c) => st(this.apiClient, c));
    } else {
      const a = Ms(this.apiClient, t);
      return l = E("{operationName}", a._url), u = a._query, delete a.config, delete a._url, delete a._query, r = this.apiClient.request({
        path: l,
        queryParams: u,
        body: JSON.stringify(a),
        httpMethod: "GET",
        httpOptions: (n = t.config) === null || n === void 0 ? void 0 : n.httpOptions
      }).then((c) => c.json()), r.then((c) => Vs(this.apiClient, c));
    }
  }
  async fetchPredictVideosOperationInternal(t) {
    var e;
    let n, r = "", l = {};
    if (this.apiClient.isVertexAI()) {
      const u = Rs(this.apiClient, t);
      return r = E("{resourceName}:fetchPredictOperation", u._url), l = u._query, delete u.config, delete u._url, delete u._query, n = this.apiClient.request({
        path: r,
        queryParams: l,
        body: JSON.stringify(u),
        httpMethod: "POST",
        httpOptions: (e = t.config) === null || e === void 0 ? void 0 : e.httpOptions
      }).then((a) => a.json()), n.then((a) => st(this.apiClient, a));
    } else
      throw new Error("This method is only supported by the Vertex AI.");
  }
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const qs = "Content-Type", Bs = "X-Server-Timeout", $s = "User-Agent", Hs = "x-goog-api-client", Ys = "0.9.0", zs = `google-genai-sdk/${Ys}`, Ks = "v1beta1", Ws = "v1beta", rt = /^data: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
class Js extends Error {
  constructor(t, e) {
    e ? super(t, { cause: e }) : super(t, { cause: new Error().stack }), this.message = t, this.name = "ClientError";
  }
}
class lt extends Error {
  constructor(t, e) {
    e ? super(t, { cause: e }) : super(t, { cause: new Error().stack }), this.message = t, this.name = "ServerError";
  }
}
class Xs {
  constructor(t) {
    var e, n;
    this.clientOptions = Object.assign(Object.assign({}, t), { project: t.project, location: t.location, apiKey: t.apiKey, vertexai: t.vertexai });
    const r = {};
    this.clientOptions.vertexai ? (r.apiVersion = (e = this.clientOptions.apiVersion) !== null && e !== void 0 ? e : Ks, this.getProject() || this.getLocation() ? (r.baseUrl = `https://${this.clientOptions.location}-aiplatform.googleapis.com/`, this.clientOptions.apiKey = void 0) : (r.baseUrl = "https://aiplatform.googleapis.com/", this.clientOptions.project = void 0, this.clientOptions.location = void 0)) : (r.apiVersion = (n = this.clientOptions.apiVersion) !== null && n !== void 0 ? n : Ws, r.baseUrl = "https://generativelanguage.googleapis.com/"), r.headers = this.getDefaultHeaders(), this.clientOptions.httpOptions = r, t.httpOptions && (this.clientOptions.httpOptions = this.patchHttpOptions(r, t.httpOptions));
  }
  isVertexAI() {
    var t;
    return (t = this.clientOptions.vertexai) !== null && t !== void 0 ? t : !1;
  }
  getProject() {
    return this.clientOptions.project;
  }
  getLocation() {
    return this.clientOptions.location;
  }
  getApiVersion() {
    if (this.clientOptions.httpOptions && this.clientOptions.httpOptions.apiVersion !== void 0)
      return this.clientOptions.httpOptions.apiVersion;
    throw new Error("API version is not set.");
  }
  getBaseUrl() {
    if (this.clientOptions.httpOptions && this.clientOptions.httpOptions.baseUrl !== void 0)
      return this.clientOptions.httpOptions.baseUrl;
    throw new Error("Base URL is not set.");
  }
  getRequestUrl() {
    return this.getRequestUrlInternal(this.clientOptions.httpOptions);
  }
  getHeaders() {
    if (this.clientOptions.httpOptions && this.clientOptions.httpOptions.headers !== void 0)
      return this.clientOptions.httpOptions.headers;
    throw new Error("Headers are not set.");
  }
  getRequestUrlInternal(t) {
    if (!t || t.baseUrl === void 0 || t.apiVersion === void 0)
      throw new Error("HTTP options are not correctly set.");
    const n = [t.baseUrl.endsWith("/") ? t.baseUrl.slice(0, -1) : t.baseUrl];
    return t.apiVersion && t.apiVersion !== "" && n.push(t.apiVersion), n.join("/");
  }
  getBaseResourcePath() {
    return `projects/${this.clientOptions.project}/locations/${this.clientOptions.location}`;
  }
  getApiKey() {
    return this.clientOptions.apiKey;
  }
  getWebsocketBaseUrl() {
    const t = this.getBaseUrl(), e = new URL(t);
    return e.protocol = "wss", e.toString();
  }
  setBaseUrl(t) {
    if (this.clientOptions.httpOptions)
      this.clientOptions.httpOptions.baseUrl = t;
    else
      throw new Error("HTTP options are not correctly set.");
  }
  constructUrl(t, e, n) {
    const r = [this.getRequestUrlInternal(e)];
    return n && r.push(this.getBaseResourcePath()), t !== "" && r.push(t), new URL(`${r.join("/")}`);
  }
  shouldPrependVertexProjectPath(t) {
    return !(this.clientOptions.apiKey || !this.clientOptions.vertexai || t.path.startsWith("projects/") || t.httpMethod === "GET" && t.path.startsWith("publishers/google/models"));
  }
  async request(t) {
    let e = this.clientOptions.httpOptions;
    t.httpOptions && (e = this.patchHttpOptions(this.clientOptions.httpOptions, t.httpOptions));
    const n = this.shouldPrependVertexProjectPath(t), r = this.constructUrl(t.path, e, n);
    if (t.queryParams)
      for (const [u, a] of Object.entries(t.queryParams))
        r.searchParams.append(u, String(a));
    let l = {};
    if (t.httpMethod === "GET") {
      if (t.body && t.body !== "{}")
        throw new Error("Request body should be empty for GET request, but got non empty request body");
    } else
      l.body = t.body;
    return l = await this.includeExtraHttpOptionsToRequestInit(l, e), this.unaryApiCall(r, l, t.httpMethod);
  }
  patchHttpOptions(t, e) {
    const n = JSON.parse(JSON.stringify(t));
    for (const [r, l] of Object.entries(e))
      typeof l == "object" ? n[r] = Object.assign(Object.assign({}, n[r]), l) : l !== void 0 && (n[r] = l);
    return n;
  }
  async requestStream(t) {
    let e = this.clientOptions.httpOptions;
    t.httpOptions && (e = this.patchHttpOptions(this.clientOptions.httpOptions, t.httpOptions));
    const n = this.shouldPrependVertexProjectPath(t), r = this.constructUrl(t.path, e, n);
    (!r.searchParams.has("alt") || r.searchParams.get("alt") !== "sse") && r.searchParams.set("alt", "sse");
    let l = {};
    return l.body = t.body, l = await this.includeExtraHttpOptionsToRequestInit(l, e), this.streamApiCall(r, l, t.httpMethod);
  }
  async includeExtraHttpOptionsToRequestInit(t, e) {
    if (e && e.timeout && e.timeout > 0) {
      const n = new AbortController(), r = n.signal;
      setTimeout(() => n.abort(), e.timeout), t.signal = r;
    }
    return t.headers = await this.getHeadersInternal(e), t;
  }
  async unaryApiCall(t, e, n) {
    return this.apiCall(t.toString(), Object.assign(Object.assign({}, e), { method: n })).then(async (r) => (await at(r), new se(r))).catch((r) => {
      throw r instanceof Error ? r : new Error(JSON.stringify(r));
    });
  }
  async streamApiCall(t, e, n) {
    return this.apiCall(t.toString(), Object.assign(Object.assign({}, e), { method: n })).then(async (r) => (await at(r), this.processStreamResponse(r))).catch((r) => {
      throw r instanceof Error ? r : new Error(JSON.stringify(r));
    });
  }
  processStreamResponse(t) {
    var e;
    return b(this, arguments, function* () {
      const r = (e = t?.body) === null || e === void 0 ? void 0 : e.getReader(), l = new TextDecoder("utf-8");
      if (!r)
        throw new Error("Response body is empty");
      try {
        let u = "";
        for (; ; ) {
          const { done: a, value: c } = yield M(r.read());
          if (a) {
            if (u.trim().length > 0)
              throw new Error("Incomplete JSON segment at the end");
            break;
          }
          const d = l.decode(c);
          u += d;
          let f = u.match(rt);
          for (; f; ) {
            const p = f[1];
            try {
              const h = new Response(p, {
                headers: t?.headers,
                status: t?.status,
                statusText: t?.statusText
              });
              yield yield M(new se(h)), u = u.slice(f[0].length), f = u.match(rt);
            } catch (h) {
              throw new Error(`exception parsing stream chunk ${p}. ${h}`);
            }
          }
        }
      } finally {
        r.releaseLock();
      }
    });
  }
  async apiCall(t, e) {
    return fetch(t, e).catch((n) => {
      throw new Error(`exception ${n} sending request`);
    });
  }
  getDefaultHeaders() {
    const t = {}, e = zs + " " + this.clientOptions.userAgentExtra;
    return t[$s] = e, t[Hs] = e, t[qs] = "application/json", t;
  }
  async getHeadersInternal(t) {
    const e = new Headers();
    if (t && t.headers) {
      for (const [n, r] of Object.entries(t.headers))
        e.append(n, r);
      t.timeout && t.timeout > 0 && e.append(Bs, String(Math.ceil(t.timeout / 1e3)));
    }
    return await this.clientOptions.auth.addAuthHeaders(e), e;
  }
  /**
   * Uploads a file asynchronously using Gemini API only, this is not supported
   * in Vertex AI.
   *
   * @param file The string path to the file to be uploaded or a Blob object.
   * @param config Optional parameters specified in the `UploadFileConfig`
   *     interface. @see {@link UploadFileConfig}
   * @return A promise that resolves to a `File` object.
   * @throws An error if called on a Vertex AI client.
   * @throws An error if the `mimeType` is not provided and can not be inferred,
   */
  async uploadFile(t, e) {
    var n;
    const r = {};
    e != null && (r.mimeType = e.mimeType, r.name = e.name, r.displayName = e.displayName), r.name && !r.name.startsWith("files/") && (r.name = `files/${r.name}`);
    const l = this.clientOptions.uploader, u = await l.stat(t);
    r.sizeBytes = String(u.size);
    const a = (n = e?.mimeType) !== null && n !== void 0 ? n : u.type;
    if (a === void 0 || a === "")
      throw new Error("Can not determine mimeType. Please provide mimeType in the config.");
    r.mimeType = a;
    const c = await this.fetchUploadUrl(r, e);
    return l.upload(t, c, this);
  }
  async fetchUploadUrl(t, e) {
    var n;
    let r = {};
    e?.httpOptions ? r = e.httpOptions : r = {
      apiVersion: "",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Upload-Protocol": "resumable",
        "X-Goog-Upload-Command": "start",
        "X-Goog-Upload-Header-Content-Length": `${t.sizeBytes}`,
        "X-Goog-Upload-Header-Content-Type": `${t.mimeType}`
      }
    };
    const l = {
      file: t
    }, u = await this.request({
      path: E("upload/v1beta/files", l._url),
      body: JSON.stringify(l),
      httpMethod: "POST",
      httpOptions: r
    });
    if (!u || !u?.headers)
      throw new Error("Server did not return an HttpResponse or the returned HttpResponse did not have headers.");
    const a = (n = u?.headers) === null || n === void 0 ? void 0 : n["x-goog-upload-url"];
    if (a === void 0)
      throw new Error("Failed to get upload url. Server did not return the x-google-upload-url in the headers");
    return a;
  }
}
async function at(o) {
  var t;
  if (o === void 0)
    throw new lt("response is undefined");
  if (!o.ok) {
    const e = o.status, n = o.statusText;
    let r;
    !((t = o.headers.get("content-type")) === null || t === void 0) && t.includes("application/json") ? r = await o.json() : r = {
      error: {
        message: "exception parsing response",
        code: o.status,
        status: o.statusText
      }
    };
    const l = `got status: ${e} ${n}. ${JSON.stringify(r)}`;
    throw e >= 400 && e < 500 ? new Js(l) : e >= 500 && e < 600 ? new lt(l) : new Error(l);
  }
}
const Qs = 1024 * 1024 * 8;
async function Zs(o, t, e) {
  var n, r;
  let l = 0, u = 0, a = new se(new Response()), c = "upload";
  for (l = o.size; u < l; ) {
    const f = Math.min(Qs, l - u), p = o.slice(u, u + f);
    if (u + f >= l && (c += ", finalize"), a = await e.request({
      path: "",
      body: p,
      httpMethod: "POST",
      httpOptions: {
        apiVersion: "",
        baseUrl: t,
        headers: {
          "X-Goog-Upload-Command": c,
          "X-Goog-Upload-Offset": String(u),
          "Content-Length": String(f)
        }
      }
    }), u += f, ((n = a?.headers) === null || n === void 0 ? void 0 : n["x-goog-upload-status"]) !== "active")
      break;
    if (l <= u)
      throw new Error("All content has been uploaded, but the upload status is not finalized.");
  }
  const d = await a?.json();
  if (((r = a?.headers) === null || r === void 0 ? void 0 : r["x-goog-upload-status"]) !== "final")
    throw new Error("Failed to upload file: Upload status is not finalized.");
  return d.file;
}
async function Os(o) {
  return { size: o.size, type: o.type };
}
class bs {
  async upload(t, e, n) {
    if (typeof t == "string")
      throw new Error("File path is not supported in browser uploader.");
    return await Zs(t, e, n);
  }
  async stat(t) {
    if (typeof t == "string")
      throw new Error("File path is not supported in browser uploader.");
    return await Os(t);
  }
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class js {
  create(t, e, n) {
    return new er(t, e, n);
  }
}
class er {
  constructor(t, e, n) {
    this.url = t, this.headers = e, this.callbacks = n;
  }
  connect() {
    this.ws = new WebSocket(this.url), this.ws.onopen = this.callbacks.onopen, this.ws.onerror = this.callbacks.onerror, this.ws.onclose = this.callbacks.onclose, this.ws.onmessage = this.callbacks.onmessage;
  }
  send(t) {
    if (this.ws === void 0)
      throw new Error("WebSocket is not connected");
    this.ws.send(t);
  }
  close() {
    if (this.ws === void 0)
      throw new Error("WebSocket is not connected");
    this.ws.close();
  }
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const ut = "x-goog-api-key";
class tr {
  constructor(t) {
    this.apiKey = t;
  }
  async addAuthHeaders(t) {
    t.get(ut) === null && t.append(ut, this.apiKey);
  }
}
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const nr = "gl-node/";
class or {
  constructor(t) {
    var e;
    if (t.apiKey == null)
      throw new Error("An API Key must be set when running in a browser");
    if (t.project || t.location)
      throw new Error("Vertex AI project based authentication is not supported on browser runtimes. Please do not provide a project or location.");
    this.vertexai = (e = t.vertexai) !== null && e !== void 0 ? e : !1, this.apiKey = t.apiKey, this.apiVersion = t.apiVersion;
    const n = new tr(this.apiKey);
    this.apiClient = new Xs({
      auth: n,
      apiVersion: this.apiVersion,
      apiKey: this.apiKey,
      vertexai: this.vertexai,
      httpOptions: t.httpOptions,
      userAgentExtra: nr + "web",
      uploader: new bs()
    }), this.models = new ws(this.apiClient), this.live = new Is(this.apiClient, n, new js()), this.chats = new Mn(this.models, this.apiClient), this.caches = new _n(this.apiClient), this.files = new $n(this.apiClient), this.operations = new Gs(this.apiClient);
  }
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
function ir(o) {
  let t = "";
  const e = o.byteLength;
  for (let n = 0; n < e; n++)
    t += String.fromCharCode(o[n]);
  return btoa(t);
}
function sr(o) {
  const t = atob(o), e = t.length, n = new Uint8Array(e);
  for (let r = 0; r < e; r++)
    n[r] = t.charCodeAt(r);
  return n;
}
function rr(o) {
  const t = o.length, e = new Int16Array(t);
  for (let n = 0; n < t; n++)
    e[n] = o[n] * 32768;
  return {
    data: ir(new Uint8Array(e.buffer)),
    mimeType: "audio/pcm;rate=16000"
  };
}
async function lr(o, t, e, n) {
  const r = t.createBuffer(
    n,
    o.length / 2 / n,
    // This is frames per channel; data.length is byte length of PCM S16LE
    e
  ), l = new Int16Array(o.buffer, o.byteOffset, o.length / 2), u = new Float32Array(l.length);
  for (let a = 0; a < l.length; a++)
    u[a] = l[a] / 32768;
  for (let a = 0; a < n; a++) {
    const c = new Float32Array(r.length);
    for (let d = 0; d < r.length; d++)
      c[d] = u[d * n + a];
    r.copyToChannel(c, a);
  }
  return r;
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
class ct {
  constructor(t) {
    this.bufferLength = 0, this.analyser = t.context.createAnalyser(), this.analyser.fftSize = 32, this.bufferLength = this.analyser.frequencyBinCount, this.dataArray = new Uint8Array(this.bufferLength), t.connect(this.analyser);
  }
  update() {
    this.analyser.getByteFrequencyData(this.dataArray);
  }
  get data() {
    return this.dataArray;
  }
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
const ar = `precision highp float;

in vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`, ur = `precision highp float;

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
`;
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
const cr = `#define STANDARD
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
}`;
var dr = Object.defineProperty, fr = Object.getOwnPropertyDescriptor, ae = (o, t, e, n) => {
  for (var r = n > 1 ? void 0 : n ? fr(t, e) : t, l = o.length - 1, u; l >= 0; l--)
    (u = o[l]) && (r = (n ? u(t, e, r) : u(r)) || r);
  return n && r && dr(t, e, r), r;
};
let z = class extends ht {
  constructor() {
    super(...arguments), this.prevTime = 0, this.rotation = new _.Vector3(0, 0, 0);
  }
  set outputNode(o) {
    this._outputNode = o, this.outputAnalyser = new ct(this._outputNode);
  }
  get outputNode() {
    return this._outputNode;
  }
  set inputNode(o) {
    this._inputNode = o, this.inputAnalyser = new ct(this._inputNode);
  }
  get inputNode() {
    return this._inputNode;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  init() {
    const o = new _.Scene();
    o.background = new _.Color(1051668);
    const t = new _.Mesh(
      new _.IcosahedronGeometry(10, 5),
      new _.RawShaderMaterial({
        uniforms: {
          resolution: { value: new _.Vector2(1, 1) },
          rand: { value: 0 }
        },
        vertexShader: ar,
        fragmentShader: ur,
        glslVersion: _.GLSL3
      })
    );
    t.material.side = _.BackSide, o.add(t), this.backdrop = t;
    const e = new _.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1e3
    );
    e.position.set(2, -2, 5), this.camera = e;
    const n = new _.WebGLRenderer({
      canvas: this.canvas,
      antialias: !1
    });
    n.setSize(window.innerWidth, window.innerHeight), n.setPixelRatio(window.devicePixelRatio / 1);
    const r = new _.IcosahedronGeometry(1, 10), l = new _.PMREMGenerator(n);
    l.compileEquirectangularShader();
    const u = new _.MeshStandardMaterial({
      color: 16,
      metalness: 0.5,
      roughness: 0.1,
      emissive: 16,
      emissiveIntensity: 1.5
    });
    u.onBeforeCompile = (m) => {
      m.uniforms.time = { value: 0 }, m.uniforms.inputData = { value: new _.Vector4() }, m.uniforms.outputData = { value: new _.Vector4() }, u.userData.shader = m, m.vertexShader = cr;
    };
    const a = new _.Mesh(r, u);
    o.add(a), a.visible = !1, this.sphere = a, new Pt().load(
      "/piz_compressed.exr",
      (m) => {
        m.mapping = _.EquirectangularReflectionMapping;
        const g = l.fromEquirectangular(m);
        u.envMap = g.texture, a.visible = !0;
      },
      void 0,
      (m) => {
        console.error("Error loading EXR:", m), a.visible = !0;
      }
    );
    const c = new Dt(o, e), d = new Ft(
      new _.Vector2(window.innerWidth, window.innerHeight),
      5,
      0.5,
      0
    ), f = new Nt(Vt), p = new Rt(n);
    p.addPass(c), p.addPass(d), this.composer = p;
    function h() {
      e.aspect = window.innerWidth / window.innerHeight, e.updateProjectionMatrix();
      const m = n.getPixelRatio(), g = window.innerWidth, y = window.innerHeight;
      t.material.uniforms.resolution.value.set(g * m, y * m), n.setSize(g, y), p.setSize(g, y), f.material.uniforms.resolution.value.set(
        1 / (g * m),
        1 / (y * m)
      );
    }
    window.addEventListener("resize", h), h(), this.animation();
  }
  animation() {
    requestAnimationFrame(() => this.animation()), this.inputAnalyser.update(), this.outputAnalyser.update();
    const o = performance.now(), t = (o - this.prevTime) / (1e3 / 60);
    this.prevTime = o;
    const e = this.backdrop.material, n = this.sphere.material;
    if (e.uniforms.rand.value = Math.random() * 1e4, n.userData.shader) {
      this.sphere.scale.setScalar(
        1 + 0.2 * this.outputAnalyser.data[1] / 255
      );
      const r = 1e-3;
      this.rotation.x += t * r * 0.5 * this.outputAnalyser.data[1] / 255, this.rotation.z += t * r * 0.5 * this.inputAnalyser.data[1] / 255, this.rotation.y += t * r * 0.25 * this.inputAnalyser.data[2] / 255, this.rotation.y += t * r * 0.25 * this.outputAnalyser.data[2] / 255;
      const l = new _.Euler(
        this.rotation.x,
        this.rotation.y,
        this.rotation.z
      ), u = new _.Quaternion().setFromEuler(l), a = new _.Vector3(0, 0, 5);
      a.applyQuaternion(u), this.camera.position.copy(a), this.camera.lookAt(this.sphere.position), n.userData.shader.uniforms.time.value += t * 0.1 * this.outputAnalyser.data[0] / 255, n.userData.shader.uniforms.inputData.value.set(
        1 * this.inputAnalyser.data[0] / 255,
        0.1 * this.inputAnalyser.data[1] / 255,
        10 * this.inputAnalyser.data[2] / 255,
        0
      ), n.userData.shader.uniforms.outputData.value.set(
        2 * this.outputAnalyser.data[0] / 255,
        0.1 * this.outputAnalyser.data[1] / 255,
        10 * this.outputAnalyser.data[2] / 255,
        0
      );
    }
    this.composer.render();
  }
  firstUpdated() {
    this.canvas = this.shadowRoot.querySelector("canvas"), this.init();
  }
  render() {
    return H`<canvas></canvas>`;
  }
};
z.styles = mt`
    canvas {
      width: 100% !important;
      height: 100% !important;
      position: absolute;
      inset: 0;
      image-rendering: pixelated;
    }
  `;
ae([
  ft()
], z.prototype, "outputNode", 1);
ae([
  ft()
], z.prototype, "inputNode", 1);
z = ae([
  pt("gdm-live-audio-visuals-3d")
], z);
var pr = Object.defineProperty, mr = Object.getOwnPropertyDescriptor, U = (o, t, e, n) => {
  for (var r = n > 1 ? void 0 : n ? mr(t, e) : t, l = o.length - 1, u; l >= 0; l--)
    (u = o[l]) && (r = (n ? u(t, e, r) : u(r)) || r);
  return n && r && pr(t, e, r), r;
};
const dt = window.AudioContext || window.webkitAudioContext, oe = 20 * 1024 * 1024;
let P = class extends ht {
  constructor() {
    super(), this.isRecording = !1, this.status = "Choose instruction method: Upload a file or type manually.", this.error = "", this.selectedFile = null, this.systemInstructionFromFile = null, this.isFileProcessing = !1, this.isSessionInitialized = !1, this.instructionMode = "file", this.manualSystemInstruction = "", this._model = "gemini-2.5-flash-preview-native-audio-dialog", this.session = null, this.inputAudioContext = new dt({ sampleRate: 16e3 }), this.outputAudioContext = new dt({ sampleRate: 24e3 }), this.inputNode = this.inputAudioContext.createGain(), this.outputNode = this.outputAudioContext.createGain(), this.nextStartTime = 0, this.mediaStream = null, this.sourceNode = null, this.scriptProcessorNode = null, this.sources = /* @__PURE__ */ new Set(), this.errorTimeoutId = null, console.log("GdmLiveAudio constructor called"), this.initClientOnly(), this.updateInitialStatus();
  }
  get apiKey() {
    return this._apiKey;
  }
  set apiKey(o) {
    const t = this._apiKey;
    this._apiKey = o, this.requestUpdate("apiKey", t), o && this.initClientOnly();
  }
  get model() {
    return this._model;
  }
  set model(o) {
    this._model = o;
  }
  connectedCallback() {
    super.connectedCallback(), console.log("GdmLiveAudio connectedCallback called");
  }
  firstUpdated() {
    console.log("GdmLiveAudio firstUpdated called");
  }
  updateInitialStatus() {
    this.instructionMode === "file" ? this.status = 'Please select a file (PDF, TXT, RTF, XML, CSV, DOCX), then click "Process File".' : this.status = 'Type your system instructions, then click "Apply Manual Instructions".';
  }
  handleInstructionModeChange(o) {
    if (this.instructionMode !== o) {
      if (this.instructionMode = o, this.updateError(""), o === "file")
        this.manualSystemInstruction = "", this.status = 'Please select a file (PDF, TXT, RTF, XML, CSV, DOCX), then click "Process File".';
      else {
        this.selectedFile = null, this.systemInstructionFromFile = null;
        const t = this.shadowRoot?.getElementById("fileUpload");
        t && (t.value = ""), this.status = 'Type your system instructions, then click "Apply Manual Instructions".';
      }
      this.isSessionInitialized = !1;
    }
  }
  initAudio() {
    this.nextStartTime = this.outputAudioContext.currentTime;
  }
  async readFileAsBase64(o) {
    return new Promise((t, e) => {
      const n = new FileReader();
      n.onload = () => {
        const l = n.result.split(",")[1];
        l ? t(l) : e(new Error("Could not extract base64 data from file."));
      }, n.onerror = (r) => e(r), n.readAsDataURL(o);
    });
  }
  async readFileAsText(o) {
    return new Promise((t, e) => {
      const n = new FileReader();
      n.onload = () => {
        t(n.result);
      }, n.onerror = (r) => e(r), n.readAsText(o);
    });
  }
  async extractTextFromFileContent(o) {
    if (o.size > oe) {
      this.updateError(`File "${o.name}" exceeds the 20MB size limit.`), this.updateStatus(`File "${o.name}" is too large. Please select a smaller file (Max 20MB).`), this.selectedFile = null;
      const e = this.shadowRoot?.getElementById("fileUpload");
      return e && (e.value = ""), null;
    }
    this.isFileProcessing = !0, this.updateError("");
    const t = o.name.toLowerCase();
    try {
      if (t.endsWith(".txt")) {
        this.updateStatus(`Reading ${o.name} directly for system instruction...`);
        const e = await this.readFileAsText(o);
        if (e && e.trim().length > 0)
          return this.updateStatus(`Using content of ${o.name} as system instruction.`), e.trim();
        throw new Error(`File ${o.name} is empty or contains only whitespace.`);
      } else
        return this.updateError("Only .txt files are supported. Please select a text file."), this.updateStatus("File type not supported. Please select a .txt file."), null;
    } catch (e) {
      return console.error(`Error processing file ${o.name}:`, e), this.updateError(`Error processing ${o.name}: ${e.message || e}`), this.updateStatus(`Failed to process ${o.name}.`), null;
    } finally {
      this.isFileProcessing = !1;
    }
  }
  initClientOnly() {
    if (console.log("GdmLiveAudio initClientOnly called"), this.initAudio(), !this._apiKey) {
      console.log("API key not provided, skipping client initialization");
      return;
    }
    if (this.client) {
      console.log("GoogleGenAI client already initialized");
      return;
    }
    try {
      console.log("Attempting to create GoogleGenAI client"), this.updateStatus("Connecting to Google AI client..."), this.client = new or({
        apiKey: this._apiKey
      }), console.log("GoogleGenAI client created successfully"), this.outputNode.connect(this.outputAudioContext.destination), console.log("outputNode connected"), this.updateStatus("Google AI client initialized successfully");
    } catch (o) {
      console.error("Error during initClientOnly:", o), this.updateError(`Initialization error: ${o.message || o}`), console.log("initClientOnly stopped due to error"), this.client = void 0;
    }
  }
  async handleFileChange(o) {
    const t = o.target;
    if (t.files && t.files.length > 0) {
      const e = t.files[0];
      if (e.size > oe) {
        this.updateError(`File "${e.name}" exceeds 20MB limit.`), this.updateStatus("File too large (max 20MB). Select another file."), this.selectedFile = null, t.value = "";
        return;
      }
      if (!e.name.toLowerCase().endsWith(".txt")) {
        this.updateError("Only .txt files are supported."), this.updateStatus("Please select a .txt file."), this.selectedFile = null, t.value = "";
        return;
      }
      this.selectedFile = e, this.updateStatus(`File '${this.selectedFile.name}' selected. Click "Process File".`), this.isSessionInitialized = !1, this.systemInstructionFromFile = null, this.updateError("");
    } else
      this.selectedFile = null, this.updateStatus('Please select a .txt file, then click "Process File".');
  }
  handleManualInstructionInput(o) {
    const t = o.target;
    this.manualSystemInstruction = t.value, this.manualSystemInstruction.trim() === "" ? this.status = 'Type your system instructions, then click "Apply Manual Instructions".' : this.status = 'Instructions entered. Click "Apply Manual Instructions".', this.isSessionInitialized = !1, this.updateError("");
  }
  async triggerFileProcessing() {
    if (!this.selectedFile) {
      this.updateError("No file selected to process.");
      return;
    }
    if (!this.isFileProcessing) {
      if (this.selectedFile.size > oe) {
        this.updateError(`File "${this.selectedFile.name}" exceeds 20MB limit and cannot be processed.`), this.updateStatus(`File "${this.selectedFile.name}" is too large (Max 20MB).`), this.selectedFile = null;
        const o = this.shadowRoot?.getElementById("fileUpload");
        o && (o.value = "");
        return;
      }
      this.isSessionInitialized = !1, this.updateError("");
      try {
        const o = await this.extractTextFromFileContent(this.selectedFile);
        o ? (this.systemInstructionFromFile = o, await this.initSession(o, `from file "${this.selectedFile?.name}"`)) : (this.error || this.updateStatus(`File processing did not yield text from ${this.selectedFile.name}. Using default system instruction.`), await this.initSession(null, "default (file processing failed)"));
      } catch (o) {
        this.updateError(`Failed to read or process file: ${o.message}`), this.updateStatus(`Error with ${this.selectedFile.name}. Using default system instruction.`), await this.initSession(null, "default (file processing error)");
      }
    }
  }
  async applyManualInstructions() {
    if (!(this.isFileProcessing || this.isRecording)) {
      if (!this.manualSystemInstruction.trim()) {
        this.updateError("Manual system instruction cannot be empty."), this.updateStatus("Please enter system instructions before applying.");
        return;
      }
      this.isSessionInitialized = !1, this.updateError(""), this.updateStatus("Applying manual system instruction..."), await this.initSession(this.manualSystemInstruction.trim(), "from manual input");
    }
  }
  async initSession(o, t) {
    if (console.log("GdmLiveAudio initSession called"), this.session) {
      try {
        await this.session.close();
      } catch (l) {
        console.warn("Could not close previous session cleanly:", l);
      }
      this.session = null;
    }
    if (!this.client) {
      console.error("GoogleGenAI client is not initialized in initSession."), this.updateError("Initialization error: GoogleGenAI client not available."), console.log("initSession stopped: client not available");
      return;
    }
    const e = o || "You are an interactive ai with dialogue abilities.", n = t || "default";
    console.log(`Applying system instruction (${n}): "${e.substring(0, 100)}${e.length > 100 ? "..." : ""}"`);
    const r = {
      parts: [{ text: e }]
    };
    this.updateStatus(`Using instruction ${n}. Initializing audio session...`);
    try {
      this.session = await this.client.live.connect({
        model: this._model,
        callbacks: {
          onopen: () => {
            this.updateStatus(`Instruction ${n} applied. Press 🔴 to start audio session.`), this.isSessionInitialized = !0;
          },
          onmessage: async (l) => {
            const u = l.serverContent?.modelTurn?.parts?.[0]?.inlineData;
            if (u && u.data) {
              this.nextStartTime = Math.max(
                this.nextStartTime,
                this.outputAudioContext.currentTime
              );
              try {
                const c = await lr(
                  sr(u.data),
                  this.outputAudioContext,
                  24e3,
                  1
                ), d = this.outputAudioContext.createBufferSource();
                d.buffer = c, d.connect(this.outputNode), d.addEventListener("ended", () => {
                  this.sources.delete(d);
                }), d.start(this.nextStartTime), this.nextStartTime = this.nextStartTime + c.duration, this.sources.add(d);
              } catch (c) {
                console.error("Error processing audio data:", c), this.updateError(`Audio processing error: ${c.message || c}`);
              }
            }
            if (l.serverContent && l.serverContent.interrupted) {
              for (const c of Array.from(this.sources.values())) {
                try {
                  c.stop();
                } catch (d) {
                  console.error("Error stopping audio source:", d);
                }
                this.sources.delete(c);
              }
              this.nextStartTime = 0;
            }
          },
          onerror: (l) => {
            console.error("Session Error:", l), this.updateError(`Session Error: ${l.message || l.error || l}`), this.isSessionInitialized = !1;
          },
          onclose: (l) => {
            this.updateStatus(`Session Closed: ${l.reason || "Unknown reason"}`), this.isSessionInitialized = !1;
          }
        },
        config: {
          responseModalities: [Y.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Orus" } }
          },
          systemInstruction: r
        }
      });
    } catch (l) {
      console.error("Failed to initialize session:", l), this.updateError(`Failed to initialize session: ${l.message}`), this.updateStatus("Error initializing audio session."), this.isSessionInitialized = !1;
    }
  }
  updateStatus(o) {
    this.status = o, console.log("Status:", o);
  }
  updateError(o) {
    this.errorTimeoutId && (clearTimeout(this.errorTimeoutId), this.errorTimeoutId = null), this.error = o, o && (console.error("Error:", o), this.errorTimeoutId = window.setTimeout(() => {
      this.error === o && (this.error = ""), this.errorTimeoutId = null;
    }, 1e4));
  }
  async startRecording() {
    if (this.isRecording || !this.isSessionInitialized) {
      this.isSessionInitialized || this.updateError("Session not ready. Apply system instructions first.");
      return;
    }
    this.inputAudioContext.resume(), this.updateStatus("Requesting microphone access..."), this.updateError("");
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: !0,
        video: !1
      }), this.updateStatus("Microphone access granted. Starting capture..."), this.sourceNode = this.inputAudioContext.createMediaStreamSource(
        this.mediaStream
      ), this.sourceNode.connect(this.inputNode);
      const o = 256;
      this.scriptProcessorNode = this.inputAudioContext.createScriptProcessor(
        o,
        1,
        1
      ), this.scriptProcessorNode.onaudioprocess = (t) => {
        if (!this.isRecording || !this.session) return;
        const n = t.inputBuffer.getChannelData(0);
        try {
          this.session.sendRealtimeInput({ media: rr(n) });
        } catch (r) {
          console.error("Error sending real-time input:", r), this.updateError(`Error sending audio: ${r.message}`);
        }
      }, this.sourceNode.connect(this.scriptProcessorNode), this.scriptProcessorNode.connect(this.inputAudioContext.destination), this.isRecording = !0, this.updateStatus("🔴 Recording... Speak now. To stop the recording press 🟥");
    } catch (o) {
      console.error("Error starting recording:", o), this.updateStatus(`Error starting recording: ${o.message}`), this.updateError(`Error starting recording: ${o.message}`), this.stopRecording();
    }
  }
  stopRecording() {
    const o = this.isRecording;
    this.isRecording = !1, o && this.updateStatus("Stopping recording..."), this.scriptProcessorNode && (this.scriptProcessorNode.disconnect(), this.scriptProcessorNode.onaudioprocess = null, this.scriptProcessorNode = null), this.sourceNode && (this.sourceNode.disconnect(), this.sourceNode = null), this.mediaStream && (this.mediaStream.getTracks().forEach((t) => t.stop()), this.mediaStream = null), o ? this.isSessionInitialized ? this.updateStatus("Recording stopped. Press 🔴 to start again.") : this.updateStatus("Recording stopped. Session is not active.") : this.isSessionInitialized || this.updateInitialStatus();
  }
  async reset() {
    if (this.updateStatus("Resetting application..."), this.updateError(""), this.stopRecording(), this.session) {
      try {
        await this.session.close();
      } catch (e) {
        console.error("Error closing session during reset:", e), this.updateError(`Error closing session: ${e.message}`);
      }
      this.session = null;
    }
    this.selectedFile = null, this.systemInstructionFromFile = null, this.manualSystemInstruction = "", this.isFileProcessing = !1, this.isSessionInitialized = !1, this.instructionMode = "file";
    const o = this.shadowRoot?.getElementById("fileUpload");
    o && (o.value = "");
    const t = this.shadowRoot?.getElementById("manualInstructionTextarea");
    t && (t.value = ""), this.updateInitialStatus();
  }
  render() {
    const o = this.isRecording || this.isFileProcessing;
    return H`
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
            ?disabled=${o || !this.isSessionInitialized}
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
              aria-checked=${this.instructionMode === "file"}
              ?active=${this.instructionMode === "file"}
              @click=${() => this.handleInstructionModeChange("file")}
              ?disabled=${o}
              title="Upload a file for system instructions">
              Upload File
            </button>
            <button 
              role="radio" 
              aria-checked=${this.instructionMode === "manual"}
              ?active=${this.instructionMode === "manual"}
              @click=${() => this.handleInstructionModeChange("manual")}
              ?disabled=${o}
              title="Type system instructions manually">
              Type Manually
            </button>
          </div>

          ${this.instructionMode === "file" ? H`
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
                ?disabled=${!this.selectedFile || o}
                title="Process selected file to extract system instructions">
                Process File
              </button>
            </div>
          ` : ""}

          ${this.instructionMode === "manual" ? H`
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
                ?disabled=${!this.manualSystemInstruction.trim() || o}
                title="Apply manually entered system instructions">
                Apply Manual Instructions
              </button>
            </div>
          ` : ""}
        </div>

        <div id="status" role="status" aria-live="polite">
         ${this.error ? H`<strong>Error:</strong> ${this.error}` : this.status}
        </div>
        <gdm-live-audio-visuals-3d
          .inputNode=${this.inputNode}
          .outputNode=${this.outputNode}></gdm-live-audio-visuals-3d>
      </div>
    `;
  }
};
P.styles = mt`
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
  `;
U([
  L()
], P.prototype, "isRecording", 2);
U([
  L()
], P.prototype, "status", 2);
U([
  L()
], P.prototype, "error", 2);
U([
  L()
], P.prototype, "selectedFile", 2);
U([
  L()
], P.prototype, "systemInstructionFromFile", 2);
U([
  L()
], P.prototype, "isFileProcessing", 2);
U([
  L()
], P.prototype, "isSessionInitialized", 2);
U([
  L()
], P.prototype, "instructionMode", 2);
U([
  L()
], P.prototype, "manualSystemInstruction", 2);
U([
  L()
], P.prototype, "inputNode", 2);
U([
  L()
], P.prototype, "outputNode", 2);
P = U([
  pt("gdm-live-audio")
], P);
const Mt = window.CONFIG?.apiKey, hr = window.CONFIG?.model || "gemini-2.5-flash-preview-native-audio-dialog";
Mt || console.error("API key not provided in CONFIG object");
window.lit = { devMode: !1 };
const gr = `
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
`;
class yr {
  constructor(t = {}) {
    this.config = {
      apiKey: t.apiKey || Mt,
      model: t.model || hr,
      width: t.width || "800px",
      height: t.height || "600px",
      ...t
    }, this.init();
  }
  async init() {
    try {
      this.overlay = document.createElement("div"), this.overlay.className = "widget-overlay", this.widgetContainer = document.createElement("div"), this.widgetContainer.className = "widget-popup", this.widgetContainer.style.width = this.config.width, this.widgetContainer.style.height = this.config.height;
      const t = document.createElement("div");
      t.className = "widget-header";
      const e = document.createElement("h3");
      e.className = "widget-title", e.textContent = "Interactive Document Widget";
      const n = document.createElement("button");
      n.className = "widget-close", n.textContent = "×", n.onclick = () => this.destroy(), t.appendChild(e), t.appendChild(n);
      const r = document.createElement("div");
      r.className = "interactive-document-widget";
      const l = document.createElement("style");
      l.textContent = gr, document.head.appendChild(l), await this.initializeGdmLiveAudio(r), this.widgetContainer.appendChild(t), this.widgetContainer.appendChild(r), document.body.appendChild(this.overlay), document.body.appendChild(this.widgetContainer), console.log("Widget initialized with API key:", !!this.config.apiKey);
    } catch (t) {
      console.error("Failed to initialize widget:", t), this.handleError(t);
    }
  }
  async initializeGdmLiveAudio(t) {
    try {
      if (this.mainElement = new P(), this.mainElement.apiKey = this.config.apiKey, this.mainElement.model = this.config.model, !this.mainElement.apiKey)
        throw new Error("Failed to set API key on GdmLiveAudio component");
      t.appendChild(this.mainElement), console.log("GdmLiveAudio initialized successfully");
    } catch (e) {
      console.error("Failed to initialize GdmLiveAudio:", e), this.handleError(e);
    }
  }
  // Public methods for widget control
  async start() {
    this.mainElement && typeof this.mainElement.startRecording == "function" && await this.mainElement.startRecording();
  }
  async stop() {
    this.mainElement && typeof this.mainElement.stopRecording == "function" && await this.mainElement.stopRecording();
  }
  async reset() {
    this.mainElement && typeof this.mainElement.reset == "function" && await this.mainElement.reset();
  }
  // Error handling
  handleError(t) {
    if (console.error("Interactive Document Widget Error:", t), this.widgetContainer) {
      const e = document.createElement("div");
      e.className = "error-message", e.textContent = `Widget Error: ${t.message}`, this.widgetContainer.appendChild(e);
    }
  }
  // Cleanup method
  destroy() {
    this.mainElement && typeof this.mainElement.stopRecording == "function" && this.mainElement.stopRecording(), this.overlay && this.overlay.remove(), this.widgetContainer && this.widgetContainer.remove();
  }
}
typeof window < "u" && (window.openInteractiveDocumentWidget = function() {
  new yr({
    width: "800px",
    height: "600px"
  });
});
export {
  yr as InteractiveDocumentWidget
};
//# sourceMappingURL=widget.js.map
