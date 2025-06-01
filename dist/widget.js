import { css as Zt, LitElement as Wt, html as $e } from "lit";
import "https://esm.sh/@google/genai@0.9.0";
import * as k from "three";
import { DataTextureLoader as zi, HalfFloatType as xe, FloatType as mt, RGBAFormat as Ni, LinearSRGBColorSpace as Rt, RedFormat as Oi, NoColorSpace as Li, LinearFilter as Ft, DataUtils as zt, Mesh as Bi, OrthographicCamera as ki, BufferGeometry as $i, Float32BufferAttribute as Nt, ShaderMaterial as Me, UniformsUtils as St, Vector2 as ae, WebGLRenderTarget as rt, NoBlending as Hi, Clock as Gi, Color as lt, Vector3 as Be, AdditiveBlending as Zi, MeshBasicMaterial as Wi } from "three";
import { GoogleGenAI as Xi, Modality as Ki } from "@google/genai";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xt = (r) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis, yt = ot.ShadowRoot && (ot.ShadyCSS === void 0 || ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Kt = Symbol(), Ot = /* @__PURE__ */ new WeakMap();
let Yi = class {
  constructor(t, n, o) {
    if (this._$cssResult$ = !0, o !== Kt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (yt && t === void 0) {
      const o = n !== void 0 && n.length === 1;
      o && (t = Ot.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), o && Ot.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Vi = (r) => new Yi(typeof r == "string" ? r : r + "", void 0, Kt), qi = (r, t) => {
  if (yt) r.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const o = document.createElement("style"), l = ot.litNonce;
    l !== void 0 && o.setAttribute("nonce", l), o.textContent = n.cssText, r.appendChild(o);
  }
}, Lt = yt ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const o of t.cssRules) n += o.cssText;
  return Vi(n);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Qi, defineProperty: ji, getOwnPropertyDescriptor: Ji, getOwnPropertyNames: en, getOwnPropertySymbols: tn, getPrototypeOf: nn } = Object, ye = globalThis, Bt = ye.trustedTypes, sn = Bt ? Bt.emptyScript : "", rn = ye.reactiveElementPolyfillSupport, He = (r, t) => r, ct = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? sn : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let n = r;
  switch (t) {
    case Boolean:
      n = r !== null;
      break;
    case Number:
      n = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(r);
      } catch {
        n = null;
      }
  }
  return n;
} }, bt = (r, t) => !Qi(r, t), kt = { attribute: !0, type: String, converter: ct, reflect: !1, useDefault: !1, hasChanged: bt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ye.litPropertyMetadata ?? (ye.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class ke extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = kt) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const o = Symbol(), l = this.getPropertyDescriptor(t, o, n);
      l !== void 0 && ji(this.prototype, t, l);
    }
  }
  static getPropertyDescriptor(t, n, o) {
    const { get: l, set: u } = Ji(this.prototype, t) ?? { get() {
      return this[n];
    }, set(g) {
      this[n] = g;
    } };
    return { get: l, set(g) {
      const E = l?.call(this);
      u?.call(this, g), this.requestUpdate(t, E, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? kt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(He("elementProperties"))) return;
    const t = nn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(He("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(He("properties"))) {
      const n = this.properties, o = [...en(n), ...tn(n)];
      for (const l of o) this.createProperty(l, n[l]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const n = litPropertyMetadata.get(t);
      if (n !== void 0) for (const [o, l] of n) this.elementProperties.set(o, l);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [n, o] of this.elementProperties) {
      const l = this._$Eu(n, o);
      l !== void 0 && this._$Eh.set(l, n);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const o = new Set(t.flat(1 / 0).reverse());
      for (const l of o) n.unshift(Lt(l));
    } else t !== void 0 && n.push(Lt(t));
    return n;
  }
  static _$Eu(t, n) {
    const o = n.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), n = this.constructor.elementProperties;
    for (const o of n.keys()) this.hasOwnProperty(o) && (t.set(o, this[o]), delete this[o]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return qi(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, n, o) {
    this._$AK(t, o);
  }
  _$ET(t, n) {
    const o = this.constructor.elementProperties.get(t), l = this.constructor._$Eu(t, o);
    if (l !== void 0 && o.reflect === !0) {
      const u = (o.converter?.toAttribute !== void 0 ? o.converter : ct).toAttribute(n, o.type);
      this._$Em = t, u == null ? this.removeAttribute(l) : this.setAttribute(l, u), this._$Em = null;
    }
  }
  _$AK(t, n) {
    const o = this.constructor, l = o._$Eh.get(t);
    if (l !== void 0 && this._$Em !== l) {
      const u = o.getPropertyOptions(l), g = typeof u.converter == "function" ? { fromAttribute: u.converter } : u.converter?.fromAttribute !== void 0 ? u.converter : ct;
      this._$Em = l, this[l] = g.fromAttribute(n, u.type) ?? this._$Ej?.get(l) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t, n, o) {
    if (t !== void 0) {
      const l = this.constructor, u = this[t];
      if (o ?? (o = l.getPropertyOptions(t)), !((o.hasChanged ?? bt)(u, n) || o.useDefault && o.reflect && u === this._$Ej?.get(t) && !this.hasAttribute(l._$Eu(t, o)))) return;
      this.C(t, n, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: o, reflect: l, wrapped: u }, g) {
    o && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, g ?? n ?? this[t]), u !== !0 || g !== void 0) || (this._$AL.has(t) || (this.hasUpdated || o || (n = void 0), this._$AL.set(t, n)), l === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (n) {
      Promise.reject(n);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [l, u] of this._$Ep) this[l] = u;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [l, u] of o) {
        const { wrapped: g } = u, E = this[l];
        g !== !0 || this._$AL.has(l) || E === void 0 || this.C(l, void 0, u, E);
      }
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), this._$EO?.forEach((o) => o.hostUpdate?.()), this.update(n)) : this._$EM();
    } catch (o) {
      throw t = !1, this._$EM(), o;
    }
    t && this._$AE(n);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((n) => n.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((n) => this._$ET(n, this[n]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
ke.elementStyles = [], ke.shadowRootOptions = { mode: "open" }, ke[He("elementProperties")] = /* @__PURE__ */ new Map(), ke[He("finalized")] = /* @__PURE__ */ new Map(), rn?.({ ReactiveElement: ke }), (ye.reactiveElementVersions ?? (ye.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const on = { attribute: !0, type: String, converter: ct, reflect: !1, hasChanged: bt }, an = (r = on, t, n) => {
  const { kind: o, metadata: l } = n;
  let u = globalThis.litPropertyMetadata.get(l);
  if (u === void 0 && globalThis.litPropertyMetadata.set(l, u = /* @__PURE__ */ new Map()), o === "setter" && ((r = Object.create(r)).wrapped = !0), u.set(n.name, r), o === "accessor") {
    const { name: g } = n;
    return { set(E) {
      const A = t.get.call(this);
      t.set.call(this, E), this.requestUpdate(g, A, r);
    }, init(E) {
      return E !== void 0 && this.C(g, void 0, r, E), E;
    } };
  }
  if (o === "setter") {
    const { name: g } = n;
    return function(E) {
      const A = this[g];
      t.call(this, E), this.requestUpdate(g, A, r);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function Et(r) {
  return (t, n) => typeof n == "object" ? an(r, t, n) : ((o, l, u) => {
    const g = l.hasOwnProperty(u);
    return l.constructor.createProperty(u, o), g ? Object.getOwnPropertyDescriptor(l, u) : void 0;
  })(r, t, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function le(r) {
  return Et({ ...r, state: !0, attribute: !1 });
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
function ln(r) {
  let t = "";
  const n = r.byteLength;
  for (let o = 0; o < n; o++)
    t += String.fromCharCode(r[o]);
  return btoa(t);
}
function cn(r) {
  const t = atob(r), n = t.length, o = new Uint8Array(n);
  for (let l = 0; l < n; l++)
    o[l] = t.charCodeAt(l);
  return o;
}
function un(r) {
  const t = r.length, n = new Int16Array(t);
  for (let o = 0; o < t; o++)
    n[o] = r[o] * 32768;
  return {
    data: ln(new Uint8Array(n.buffer)),
    mimeType: "audio/pcm;rate=16000"
  };
}
async function hn(r, t, n, o) {
  const l = t.createBuffer(
    o,
    r.length / 2 / o,
    // This is frames per channel; data.length is byte length of PCM S16LE
    n
  ), u = new Int16Array(r.buffer, r.byteOffset, r.length / 2), g = new Float32Array(u.length);
  for (let E = 0; E < u.length; E++)
    g[E] = u[E] / 32768;
  for (let E = 0; E < o; E++) {
    const A = new Float32Array(l.length);
    for (let O = 0; O < l.length; O++)
      A[O] = g[O * o + E];
    l.copyToChannel(A, E);
  }
  return l;
}
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
class $t {
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
/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.8.2
*/
var te = Uint8Array, De = Uint16Array, dn = Int32Array, Yt = new te([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), Vt = new te([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), pn = new te([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), qt = function(r, t) {
  for (var n = new De(31), o = 0; o < 31; ++o)
    n[o] = t += 1 << r[o - 1];
  for (var l = new dn(n[30]), o = 1; o < 30; ++o)
    for (var u = n[o]; u < n[o + 1]; ++u)
      l[u] = u - n[o] << 5 | o;
  return { b: n, r: l };
}, Qt = qt(Yt, 2), jt = Qt.b, fn = Qt.r;
jt[28] = 258, fn[258] = 28;
var mn = qt(Vt, 0), gn = mn.b, xt = new De(32768);
for (var N = 0; N < 32768; ++N) {
  var Se = (N & 43690) >> 1 | (N & 21845) << 1;
  Se = (Se & 52428) >> 2 | (Se & 13107) << 2, Se = (Se & 61680) >> 4 | (Se & 3855) << 4, xt[N] = ((Se & 65280) >> 8 | (Se & 255) << 8) >> 1;
}
var Ge = function(r, t, n) {
  for (var o = r.length, l = 0, u = new De(t); l < o; ++l)
    r[l] && ++u[r[l] - 1];
  var g = new De(t);
  for (l = 1; l < t; ++l)
    g[l] = g[l - 1] + u[l - 1] << 1;
  var E;
  if (n) {
    E = new De(1 << t);
    var A = 15 - t;
    for (l = 0; l < o; ++l)
      if (r[l])
        for (var O = l << 4 | r[l], $ = t - r[l], T = g[r[l] - 1]++ << $, D = T | (1 << $) - 1; T <= D; ++T)
          E[xt[T] >> A] = O;
  } else
    for (E = new De(o), l = 0; l < o; ++l)
      r[l] && (E[l] = xt[g[r[l] - 1]++] >> 15 - r[l]);
  return E;
}, We = new te(288);
for (var N = 0; N < 144; ++N)
  We[N] = 8;
for (var N = 144; N < 256; ++N)
  We[N] = 9;
for (var N = 256; N < 280; ++N)
  We[N] = 7;
for (var N = 280; N < 288; ++N)
  We[N] = 8;
var Jt = new te(32);
for (var N = 0; N < 32; ++N)
  Jt[N] = 5;
var vn = /* @__PURE__ */ Ge(We, 9, 1), wn = /* @__PURE__ */ Ge(Jt, 5, 1), gt = function(r) {
  for (var t = r[0], n = 1; n < r.length; ++n)
    r[n] > t && (t = r[n]);
  return t;
}, re = function(r, t, n) {
  var o = t / 8 | 0;
  return (r[o] | r[o + 1] << 8) >> (t & 7) & n;
}, vt = function(r, t) {
  var n = t / 8 | 0;
  return (r[n] | r[n + 1] << 8 | r[n + 2] << 16) >> (t & 7);
}, Sn = function(r) {
  return (r + 7) / 8 | 0;
}, xn = function(r, t, n) {
  return (n == null || n > r.length) && (n = r.length), new te(r.subarray(t, n));
}, yn = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
], oe = function(r, t, n) {
  var o = new Error(t || yn[r]);
  if (o.code = r, Error.captureStackTrace && Error.captureStackTrace(o, oe), !n)
    throw o;
  return o;
}, bn = function(r, t, n, o) {
  var l = r.length, u = 0;
  if (!l || t.f && !t.l)
    return n || new te(0);
  var g = !n, E = g || t.i != 2, A = t.i;
  g && (n = new te(l * 3));
  var O = function(ze) {
    var tt = n.length;
    if (ze > tt) {
      var Ne = new te(Math.max(tt * 2, ze));
      Ne.set(n), n = Ne;
    }
  }, $ = t.f || 0, T = t.p || 0, D = t.b || 0, L = t.l, V = t.d, ne = t.m, Te = t.n, Ke = l * 8;
  do {
    if (!L) {
      $ = re(r, T, 1);
      var Ye = re(r, T + 1, 3);
      if (T += 3, Ye)
        if (Ye == 1)
          L = vn, V = wn, ne = 9, Te = 5;
        else if (Ye == 2) {
          var Qe = re(r, T, 31) + 257, ut = re(r, T + 10, 15) + 4, ht = Qe + re(r, T + 5, 31) + 1;
          T += 14;
          for (var be = new te(ht), Pe = new te(19), X = 0; X < ut; ++X)
            Pe[pn[X]] = re(r, T + X * 3, 7);
          T += ut * 3;
          for (var q = gt(Pe), je = (1 << q) - 1, Ee = Ge(Pe, q, 1), X = 0; X < ht; ) {
            var Je = Ee[re(r, T, je)];
            T += Je & 15;
            var se = Je >> 4;
            if (se < 16)
              be[X++] = se;
            else {
              var ge = 0, _e = 0;
              for (se == 16 ? (_e = 3 + re(r, T, 3), T += 2, ge = be[X - 1]) : se == 17 ? (_e = 3 + re(r, T, 7), T += 3) : se == 18 && (_e = 11 + re(r, T, 127), T += 7); _e--; )
                be[X++] = ge;
            }
          }
          var Re = be.subarray(0, Qe), ce = be.subarray(Qe);
          ne = gt(Re), Te = gt(ce), L = Ge(Re, ne, 1), V = Ge(ce, Te, 1);
        } else
          oe(1);
      else {
        var se = Sn(T) + 4, Ve = r[se - 4] | r[se - 3] << 8, qe = se + Ve;
        if (qe > l) {
          A && oe(0);
          break;
        }
        E && O(D + Ve), n.set(r.subarray(se, qe), D), t.b = D += Ve, t.p = T = qe * 8, t.f = $;
        continue;
      }
      if (T > Ke) {
        A && oe(0);
        break;
      }
    }
    E && O(D + 131072);
    for (var ue = (1 << ne) - 1, Fe = (1 << Te) - 1, Q = T; ; Q = T) {
      var ge = L[vt(r, T) & ue], he = ge >> 4;
      if (T += ge & 15, T > Ke) {
        A && oe(0);
        break;
      }
      if (ge || oe(2), he < 256)
        n[D++] = he;
      else if (he == 256) {
        Q = T, L = null;
        break;
      } else {
        var Ae = he - 254;
        if (he > 264) {
          var X = he - 257, ve = Yt[X];
          Ae = re(r, T, (1 << ve) - 1) + jt[X], T += ve;
        }
        var P = V[vt(r, T) & Fe], de = P >> 4;
        P || oe(3), T += P & 15;
        var ce = gn[de];
        if (de > 3) {
          var ve = Vt[de];
          ce += vt(r, T) & (1 << ve) - 1, T += ve;
        }
        if (T > Ke) {
          A && oe(0);
          break;
        }
        E && O(D + 131072);
        var fe = D + Ae;
        if (D < ce) {
          var et = u - ce, dt = Math.min(ce, fe);
          for (et + D < 0 && oe(3); D < dt; ++D)
            n[D] = o[et + D];
        }
        for (; D < fe; ++D)
          n[D] = n[D - ce];
      }
    }
    t.l = L, t.p = Q, t.b = D, t.f = $, L && ($ = 1, t.m = ne, t.d = V, t.n = Te);
  } while (!$);
  return D != n.length && g ? xn(n, 0, D) : n.subarray(0, D);
}, En = /* @__PURE__ */ new te(0), _n = function(r, t) {
  return ((r[0] & 15) != 8 || r[0] >> 4 > 7 || (r[0] << 8 | r[1]) % 31) && oe(6, "invalid zlib data"), (r[1] >> 5 & 1) == 1 && oe(6, "invalid zlib data: " + (r[1] & 32 ? "need" : "unexpected") + " dictionary"), (r[1] >> 3 & 4) + 2;
};
function st(r, t) {
  return bn(r.subarray(_n(r), -4), { i: 2 }, t, t);
}
var Cn = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), Tn = 0;
try {
  Cn.decode(En, { stream: !0 }), Tn = 1;
} catch {
}
class An extends zi {
  /**
   * Constructs a new EXR loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(t) {
    super(t), this.type = xe;
  }
  /**
   * Parses the given EXR texture data.
   *
   * @param {ArrayBuffer} buffer - The raw texture data.
   * @return {DataTextureLoader~TexData} An object representing the parsed texture data.
   */
  parse(t) {
    const be = Math.pow(2.7182818, 2.2);
    function Pe(e, i) {
      let s = 0;
      for (let h = 0; h < 65536; ++h)
        (h == 0 || e[h >> 3] & 1 << (h & 7)) && (i[s++] = h);
      const a = s - 1;
      for (; s < 65536; ) i[s++] = 0;
      return a;
    }
    function X(e) {
      for (let i = 0; i < 16384; i++)
        e[i] = {}, e[i].len = 0, e[i].lit = 0, e[i].p = null;
    }
    const q = { l: 0, c: 0, lc: 0 };
    function je(e, i, s, a, h) {
      for (; s < e; )
        i = i << 8 | Mt(a, h), s += 8;
      s -= e, q.l = i >> s & (1 << e) - 1, q.c = i, q.lc = s;
    }
    const Ee = new Array(59);
    function Je(e) {
      for (let s = 0; s <= 58; ++s) Ee[s] = 0;
      for (let s = 0; s < 65537; ++s) Ee[e[s]] += 1;
      let i = 0;
      for (let s = 58; s > 0; --s) {
        const a = i + Ee[s] >> 1;
        Ee[s] = i, i = a;
      }
      for (let s = 0; s < 65537; ++s) {
        const a = e[s];
        a > 0 && (e[s] = a | Ee[a]++ << 6);
      }
    }
    function ge(e, i, s, a, h, c) {
      const f = i;
      let v = 0, m = 0;
      for (; a <= h; a++) {
        if (f.value - i.value > s) return !1;
        je(6, v, m, e, f);
        const p = q.l;
        if (v = q.c, m = q.lc, c[a] = p, p == 63) {
          if (f.value - i.value > s)
            throw new Error("Something wrong with hufUnpackEncTable");
          je(8, v, m, e, f);
          let d = q.l + 6;
          if (v = q.c, m = q.lc, a + d > h + 1)
            throw new Error("Something wrong with hufUnpackEncTable");
          for (; d--; ) c[a++] = 0;
          a--;
        } else if (p >= 59) {
          let d = p - 59 + 2;
          if (a + d > h + 1)
            throw new Error("Something wrong with hufUnpackEncTable");
          for (; d--; ) c[a++] = 0;
          a--;
        }
      }
      Je(c);
    }
    function _e(e) {
      return e & 63;
    }
    function Re(e) {
      return e >> 6;
    }
    function ce(e, i, s, a) {
      for (; i <= s; i++) {
        const h = Re(e[i]), c = _e(e[i]);
        if (h >> c)
          throw new Error("Invalid table entry");
        if (c > 14) {
          const f = a[h >> c - 14];
          if (f.len)
            throw new Error("Invalid table entry");
          if (f.lit++, f.p) {
            const v = f.p;
            f.p = new Array(f.lit);
            for (let m = 0; m < f.lit - 1; ++m)
              f.p[m] = v[m];
          } else
            f.p = new Array(1);
          f.p[f.lit - 1] = i;
        } else if (c) {
          let f = 0;
          for (let v = 1 << 14 - c; v > 0; v--) {
            const m = a[(h << 14 - c) + f];
            if (m.len || m.p)
              throw new Error("Invalid table entry");
            m.len = c, m.lit = i, f++;
          }
        }
      }
      return !0;
    }
    const ue = { c: 0, lc: 0 };
    function Fe(e, i, s, a) {
      e = e << 8 | Mt(s, a), i += 8, ue.c = e, ue.lc = i;
    }
    const Q = { c: 0, lc: 0 };
    function he(e, i, s, a, h, c, f, v, m) {
      if (e == i) {
        a < 8 && (Fe(s, a, h, c), s = ue.c, a = ue.lc), a -= 8;
        let p = s >> a;
        if (p = new Uint8Array([p])[0], v.value + p > m)
          return !1;
        const d = f[v.value - 1];
        for (; p-- > 0; )
          f[v.value++] = d;
      } else if (v.value < m)
        f[v.value++] = e;
      else
        return !1;
      Q.c = s, Q.lc = a;
    }
    function Ae(e) {
      return e & 65535;
    }
    function ve(e) {
      const i = Ae(e);
      return i > 32767 ? i - 65536 : i;
    }
    const P = { a: 0, b: 0 };
    function de(e, i) {
      const s = ve(e), h = ve(i), c = s + (h & 1) + (h >> 1), f = c, v = c - h;
      P.a = f, P.b = v;
    }
    function fe(e, i) {
      const s = Ae(e), a = Ae(i), h = s - (a >> 1) & 65535, c = a + h - 32768 & 65535;
      P.a = c, P.b = h;
    }
    function et(e, i, s, a, h, c, f) {
      const v = f < 16384, m = s > h ? h : s;
      let p = 1, d, w;
      for (; p <= m; ) p <<= 1;
      for (p >>= 1, d = p, p >>= 1; p >= 1; ) {
        w = 0;
        const b = w + c * (h - d), S = c * p, C = c * d, x = a * p, _ = a * d;
        let I, R, B, Y;
        for (; w <= b; w += C) {
          let z = w;
          const M = w + a * (s - d);
          for (; z <= M; z += _) {
            const H = z + x, ee = z + S, G = ee + x;
            v ? (de(e[z + i], e[ee + i]), I = P.a, B = P.b, de(e[H + i], e[G + i]), R = P.a, Y = P.b, de(I, R), e[z + i] = P.a, e[H + i] = P.b, de(B, Y), e[ee + i] = P.a, e[G + i] = P.b) : (fe(e[z + i], e[ee + i]), I = P.a, B = P.b, fe(e[H + i], e[G + i]), R = P.a, Y = P.b, fe(I, R), e[z + i] = P.a, e[H + i] = P.b, fe(B, Y), e[ee + i] = P.a, e[G + i] = P.b);
          }
          if (s & p) {
            const H = z + S;
            v ? de(e[z + i], e[H + i]) : fe(e[z + i], e[H + i]), I = P.a, e[H + i] = P.b, e[z + i] = I;
          }
        }
        if (h & p) {
          let z = w;
          const M = w + a * (s - d);
          for (; z <= M; z += _) {
            const H = z + x;
            v ? de(e[z + i], e[H + i]) : fe(e[z + i], e[H + i]), I = P.a, e[H + i] = P.b, e[z + i] = I;
          }
        }
        d = p, p >>= 1;
      }
      return w;
    }
    function dt(e, i, s, a, h, c, f, v, m) {
      let p = 0, d = 0;
      const w = f, b = Math.trunc(a.value + (h + 7) / 8);
      for (; a.value < b; )
        for (Fe(p, d, s, a), p = ue.c, d = ue.lc; d >= 14; ) {
          const C = p >> d - 14 & 16383, x = i[C];
          if (x.len)
            d -= x.len, he(x.lit, c, p, d, s, a, v, m, w), p = Q.c, d = Q.lc;
          else {
            if (!x.p)
              throw new Error("hufDecode issues");
            let _;
            for (_ = 0; _ < x.lit; _++) {
              const I = _e(e[x.p[_]]);
              for (; d < I && a.value < b; )
                Fe(p, d, s, a), p = ue.c, d = ue.lc;
              if (d >= I && Re(e[x.p[_]]) == (p >> d - I & (1 << I) - 1)) {
                d -= I, he(x.p[_], c, p, d, s, a, v, m, w), p = Q.c, d = Q.lc;
                break;
              }
            }
            if (_ == x.lit)
              throw new Error("hufDecode issues");
          }
        }
      const S = 8 - h & 7;
      for (p >>= S, d -= S; d > 0; ) {
        const C = i[p << 14 - d & 16383];
        if (C.len)
          d -= C.len, he(C.lit, c, p, d, s, a, v, m, w), p = Q.c, d = Q.lc;
        else
          throw new Error("hufDecode issues");
      }
      return !0;
    }
    function ze(e, i, s, a, h, c) {
      const f = { value: 0 }, v = s.value, m = J(i, s), p = J(i, s);
      s.value += 4;
      const d = J(i, s);
      if (s.value += 4, m < 0 || m >= 65537 || p < 0 || p >= 65537)
        throw new Error("Something wrong with HUF_ENCSIZE");
      const w = new Array(65537), b = new Array(16384);
      X(b);
      const S = a - (s.value - v);
      if (ge(e, s, S, m, p, w), d > 8 * (a - (s.value - v)))
        throw new Error("Something wrong with hufUncompress");
      ce(w, m, p, b), dt(w, b, e, s, d, p, c, h, f);
    }
    function tt(e, i, s) {
      for (let a = 0; a < s; ++a)
        i[a] = e[i[a]];
    }
    function Ne(e) {
      for (let i = 1; i < e.length; i++) {
        const s = e[i - 1] + e[i] - 128;
        e[i] = s;
      }
    }
    function Tt(e, i) {
      let s = 0, a = Math.floor((e.length + 1) / 2), h = 0;
      const c = e.length - 1;
      for (; !(h > c || (i[h++] = e[s++], h > c)); )
        i[h++] = e[a++];
    }
    function At(e) {
      let i = e.byteLength;
      const s = new Array();
      let a = 0;
      const h = new DataView(e);
      for (; i > 0; ) {
        const c = h.getInt8(a++);
        if (c < 0) {
          const f = -c;
          i -= f + 1;
          for (let v = 0; v < f; v++)
            s.push(h.getUint8(a++));
        } else {
          const f = c;
          i -= 2;
          const v = h.getUint8(a++);
          for (let m = 0; m < f + 1; m++)
            s.push(v);
        }
      }
      return s;
    }
    function ni(e, i, s, a, h, c) {
      let f = new DataView(c.buffer);
      const v = s[e.idx[0]].width, m = s[e.idx[0]].height, p = 3, d = Math.floor(v / 8), w = Math.ceil(v / 8), b = Math.ceil(m / 8), S = v - (w - 1) * 8, C = m - (b - 1) * 8, x = { value: 0 }, _ = new Array(p), I = new Array(p), R = new Array(p), B = new Array(p), Y = new Array(p);
      for (let M = 0; M < p; ++M)
        Y[M] = i[e.idx[M]], _[M] = M < 1 ? 0 : _[M - 1] + w * b, I[M] = new Float32Array(64), R[M] = new Uint16Array(64), B[M] = new Uint16Array(w * 64);
      for (let M = 0; M < b; ++M) {
        let H = 8;
        M == b - 1 && (H = C);
        let ee = 8;
        for (let U = 0; U < w; ++U) {
          U == w - 1 && (ee = S);
          for (let F = 0; F < p; ++F)
            R[F].fill(0), R[F][0] = h[_[F]++], si(x, a, R[F]), ri(R[F], I[F]), oi(I[F]);
          ai(I);
          for (let F = 0; F < p; ++F)
            li(I[F], B[F], U * 64);
        }
        let G = 0;
        for (let U = 0; U < p; ++U) {
          const F = s[e.idx[U]].type;
          for (let me = 8 * M; me < 8 * M + H; ++me) {
            G = Y[U][me];
            for (let Le = 0; Le < d; ++Le) {
              const pe = Le * 64 + (me & 7) * 8;
              f.setUint16(G + 0 * 2 * F, B[U][pe + 0], !0), f.setUint16(G + 1 * 2 * F, B[U][pe + 1], !0), f.setUint16(G + 2 * 2 * F, B[U][pe + 2], !0), f.setUint16(G + 3 * 2 * F, B[U][pe + 3], !0), f.setUint16(G + 4 * 2 * F, B[U][pe + 4], !0), f.setUint16(G + 5 * 2 * F, B[U][pe + 5], !0), f.setUint16(G + 6 * 2 * F, B[U][pe + 6], !0), f.setUint16(G + 7 * 2 * F, B[U][pe + 7], !0), G += 8 * 2 * F;
            }
          }
          if (d != w)
            for (let me = 8 * M; me < 8 * M + H; ++me) {
              const Le = Y[U][me] + 8 * d * 2 * F, pe = d * 64 + (me & 7) * 8;
              for (let nt = 0; nt < ee; ++nt)
                f.setUint16(Le + nt * 2 * F, B[U][pe + nt], !0);
            }
        }
      }
      const z = new Uint16Array(v);
      f = new DataView(c.buffer);
      for (let M = 0; M < p; ++M) {
        s[e.idx[M]].decoded = !0;
        const H = s[e.idx[M]].type;
        if (s[M].type == 2)
          for (let ee = 0; ee < m; ++ee) {
            const G = Y[M][ee];
            for (let U = 0; U < v; ++U)
              z[U] = f.getUint16(G + U * 2 * H, !0);
            for (let U = 0; U < v; ++U)
              f.setFloat32(G + U * 2 * H, y(z[U]), !0);
          }
      }
    }
    function si(e, i, s) {
      let a, h = 1;
      for (; h < 64; )
        a = i[e.value], a == 65280 ? h = 64 : a >> 8 == 255 ? h += a & 255 : (s[h] = a, h++), e.value++;
    }
    function ri(e, i) {
      i[0] = y(e[0]), i[1] = y(e[1]), i[2] = y(e[5]), i[3] = y(e[6]), i[4] = y(e[14]), i[5] = y(e[15]), i[6] = y(e[27]), i[7] = y(e[28]), i[8] = y(e[2]), i[9] = y(e[4]), i[10] = y(e[7]), i[11] = y(e[13]), i[12] = y(e[16]), i[13] = y(e[26]), i[14] = y(e[29]), i[15] = y(e[42]), i[16] = y(e[3]), i[17] = y(e[8]), i[18] = y(e[12]), i[19] = y(e[17]), i[20] = y(e[25]), i[21] = y(e[30]), i[22] = y(e[41]), i[23] = y(e[43]), i[24] = y(e[9]), i[25] = y(e[11]), i[26] = y(e[18]), i[27] = y(e[24]), i[28] = y(e[31]), i[29] = y(e[40]), i[30] = y(e[44]), i[31] = y(e[53]), i[32] = y(e[10]), i[33] = y(e[19]), i[34] = y(e[23]), i[35] = y(e[32]), i[36] = y(e[39]), i[37] = y(e[45]), i[38] = y(e[52]), i[39] = y(e[54]), i[40] = y(e[20]), i[41] = y(e[22]), i[42] = y(e[33]), i[43] = y(e[38]), i[44] = y(e[46]), i[45] = y(e[51]), i[46] = y(e[55]), i[47] = y(e[60]), i[48] = y(e[21]), i[49] = y(e[34]), i[50] = y(e[37]), i[51] = y(e[47]), i[52] = y(e[50]), i[53] = y(e[56]), i[54] = y(e[59]), i[55] = y(e[61]), i[56] = y(e[35]), i[57] = y(e[36]), i[58] = y(e[48]), i[59] = y(e[49]), i[60] = y(e[57]), i[61] = y(e[58]), i[62] = y(e[62]), i[63] = y(e[63]);
    }
    function oi(e) {
      const i = 0.5 * Math.cos(0.7853975), s = 0.5 * Math.cos(3.14159 / 16), a = 0.5 * Math.cos(3.14159 / 8), h = 0.5 * Math.cos(3 * 3.14159 / 16), c = 0.5 * Math.cos(5 * 3.14159 / 16), f = 0.5 * Math.cos(3 * 3.14159 / 8), v = 0.5 * Math.cos(7 * 3.14159 / 16), m = new Array(4), p = new Array(4), d = new Array(4), w = new Array(4);
      for (let b = 0; b < 8; ++b) {
        const S = b * 8;
        m[0] = a * e[S + 2], m[1] = f * e[S + 2], m[2] = a * e[S + 6], m[3] = f * e[S + 6], p[0] = s * e[S + 1] + h * e[S + 3] + c * e[S + 5] + v * e[S + 7], p[1] = h * e[S + 1] - v * e[S + 3] - s * e[S + 5] - c * e[S + 7], p[2] = c * e[S + 1] - s * e[S + 3] + v * e[S + 5] + h * e[S + 7], p[3] = v * e[S + 1] - c * e[S + 3] + h * e[S + 5] - s * e[S + 7], d[0] = i * (e[S + 0] + e[S + 4]), d[3] = i * (e[S + 0] - e[S + 4]), d[1] = m[0] + m[3], d[2] = m[1] - m[2], w[0] = d[0] + d[1], w[1] = d[3] + d[2], w[2] = d[3] - d[2], w[3] = d[0] - d[1], e[S + 0] = w[0] + p[0], e[S + 1] = w[1] + p[1], e[S + 2] = w[2] + p[2], e[S + 3] = w[3] + p[3], e[S + 4] = w[3] - p[3], e[S + 5] = w[2] - p[2], e[S + 6] = w[1] - p[1], e[S + 7] = w[0] - p[0];
      }
      for (let b = 0; b < 8; ++b)
        m[0] = a * e[16 + b], m[1] = f * e[16 + b], m[2] = a * e[48 + b], m[3] = f * e[48 + b], p[0] = s * e[8 + b] + h * e[24 + b] + c * e[40 + b] + v * e[56 + b], p[1] = h * e[8 + b] - v * e[24 + b] - s * e[40 + b] - c * e[56 + b], p[2] = c * e[8 + b] - s * e[24 + b] + v * e[40 + b] + h * e[56 + b], p[3] = v * e[8 + b] - c * e[24 + b] + h * e[40 + b] - s * e[56 + b], d[0] = i * (e[b] + e[32 + b]), d[3] = i * (e[b] - e[32 + b]), d[1] = m[0] + m[3], d[2] = m[1] - m[2], w[0] = d[0] + d[1], w[1] = d[3] + d[2], w[2] = d[3] - d[2], w[3] = d[0] - d[1], e[0 + b] = w[0] + p[0], e[8 + b] = w[1] + p[1], e[16 + b] = w[2] + p[2], e[24 + b] = w[3] + p[3], e[32 + b] = w[3] - p[3], e[40 + b] = w[2] - p[2], e[48 + b] = w[1] - p[1], e[56 + b] = w[0] - p[0];
    }
    function ai(e) {
      for (let i = 0; i < 64; ++i) {
        const s = e[0][i], a = e[1][i], h = e[2][i];
        e[0][i] = s + 1.5747 * h, e[1][i] = s - 0.1873 * a - 0.4682 * h, e[2][i] = s + 1.8556 * a;
      }
    }
    function li(e, i, s) {
      for (let a = 0; a < 64; ++a)
        i[s + a] = zt.toHalfFloat(ci(e[a]));
    }
    function ci(e) {
      return e <= 1 ? Math.sign(e) * Math.pow(Math.abs(e), 2.2) : Math.sign(e) * Math.pow(be, Math.abs(e) - 1);
    }
    function pt(e) {
      return new DataView(e.array.buffer, e.offset.value, e.size);
    }
    function ui(e) {
      const i = e.viewer.buffer.slice(e.offset.value, e.offset.value + e.size), s = new Uint8Array(At(i)), a = new Uint8Array(s.length);
      return Ne(s), Tt(s, a), new DataView(a.buffer);
    }
    function ft(e) {
      const i = e.array.slice(e.offset.value, e.offset.value + e.size), s = st(i), a = new Uint8Array(s.length);
      return Ne(s), Tt(s, a), new DataView(a.buffer);
    }
    function hi(e) {
      const i = e.viewer, s = { value: e.offset.value }, a = new Uint16Array(e.columns * e.lines * (e.inputChannels.length * e.type)), h = new Uint8Array(8192);
      let c = 0;
      const f = new Array(e.inputChannels.length);
      for (let C = 0, x = e.inputChannels.length; C < x; C++)
        f[C] = {}, f[C].start = c, f[C].end = f[C].start, f[C].nx = e.columns, f[C].ny = e.lines, f[C].size = e.type, c += f[C].nx * f[C].ny * f[C].size;
      const v = Oe(i, s), m = Oe(i, s);
      if (m >= 8192)
        throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");
      if (v <= m)
        for (let C = 0; C < m - v + 1; C++)
          h[C + v] = we(i, s);
      const p = new Uint16Array(65536), d = Pe(h, p), w = J(i, s);
      ze(e.array, i, s, w, a, c);
      for (let C = 0; C < e.inputChannels.length; ++C) {
        const x = f[C];
        for (let _ = 0; _ < f[C].size; ++_)
          et(
            a,
            x.start + _,
            x.nx,
            x.size,
            x.ny,
            x.nx * x.size,
            d
          );
      }
      tt(p, a, c);
      let b = 0;
      const S = new Uint8Array(a.buffer.byteLength);
      for (let C = 0; C < e.lines; C++)
        for (let x = 0; x < e.inputChannels.length; x++) {
          const _ = f[x], I = _.nx * _.size, R = new Uint8Array(a.buffer, _.end * 2, I * 2);
          S.set(R, b), b += I * 2, _.end += I;
        }
      return new DataView(S.buffer);
    }
    function di(e) {
      const i = e.array.slice(e.offset.value, e.offset.value + e.size), s = st(i), a = e.inputChannels.length * e.lines * e.columns * e.totalBytes, h = new ArrayBuffer(a), c = new DataView(h);
      let f = 0, v = 0;
      const m = new Array(4);
      for (let p = 0; p < e.lines; p++)
        for (let d = 0; d < e.inputChannels.length; d++) {
          let w = 0;
          switch (e.inputChannels[d].pixelType) {
            case 1:
              m[0] = f, m[1] = m[0] + e.columns, f = m[1] + e.columns;
              for (let S = 0; S < e.columns; ++S) {
                const C = s[m[0]++] << 8 | s[m[1]++];
                w += C, c.setUint16(v, w, !0), v += 2;
              }
              break;
            case 2:
              m[0] = f, m[1] = m[0] + e.columns, m[2] = m[1] + e.columns, f = m[2] + e.columns;
              for (let S = 0; S < e.columns; ++S) {
                const C = s[m[0]++] << 24 | s[m[1]++] << 16 | s[m[2]++] << 8;
                w += C, c.setUint32(v, w, !0), v += 4;
              }
              break;
          }
        }
      return c;
    }
    function It(e) {
      const i = e.viewer, s = { value: e.offset.value }, a = new Uint8Array(e.columns * e.lines * (e.inputChannels.length * e.type * 2)), h = {
        version: K(i, s),
        unknownUncompressedSize: K(i, s),
        unknownCompressedSize: K(i, s),
        acCompressedSize: K(i, s),
        dcCompressedSize: K(i, s),
        rleCompressedSize: K(i, s),
        rleUncompressedSize: K(i, s),
        rleRawSize: K(i, s),
        totalAcUncompressedCount: K(i, s),
        totalDcUncompressedCount: K(i, s),
        acCompression: K(i, s)
      };
      if (h.version < 2)
        throw new Error("EXRLoader.parse: " + Ce.compression + " version " + h.version + " is unsupported");
      const c = new Array();
      let f = Oe(i, s) - 2;
      for (; f > 0; ) {
        const x = it(i.buffer, s), _ = we(i, s), I = _ >> 2 & 3, R = (_ >> 4) - 1, B = new Int8Array([R])[0], Y = we(i, s);
        c.push({
          name: x,
          index: B,
          type: Y,
          compression: I
        }), f -= x.length + 3;
      }
      const v = Ce.channels, m = new Array(e.inputChannels.length);
      for (let x = 0; x < e.inputChannels.length; ++x) {
        const _ = m[x] = {}, I = v[x];
        _.name = I.name, _.compression = 0, _.decoded = !1, _.type = I.pixelType, _.pLinear = I.pLinear, _.width = e.columns, _.height = e.lines;
      }
      const p = {
        idx: new Array(3)
      };
      for (let x = 0; x < e.inputChannels.length; ++x) {
        const _ = m[x];
        for (let I = 0; I < c.length; ++I) {
          const R = c[I];
          _.name == R.name && (_.compression = R.compression, R.index >= 0 && (p.idx[R.index] = x), _.offset = x);
        }
      }
      let d, w, b;
      if (h.acCompressedSize > 0)
        switch (h.acCompression) {
          case 0:
            d = new Uint16Array(h.totalAcUncompressedCount), ze(e.array, i, s, h.acCompressedSize, d, h.totalAcUncompressedCount);
            break;
          case 1:
            const x = e.array.slice(s.value, s.value + h.totalAcUncompressedCount), _ = st(x);
            d = new Uint16Array(_.buffer), s.value += h.totalAcUncompressedCount;
            break;
        }
      if (h.dcCompressedSize > 0) {
        const x = {
          array: e.array,
          offset: s,
          size: h.dcCompressedSize
        };
        w = new Uint16Array(ft(x).buffer), s.value += h.dcCompressedSize;
      }
      if (h.rleRawSize > 0) {
        const x = e.array.slice(s.value, s.value + h.rleCompressedSize), _ = st(x);
        b = At(_.buffer), s.value += h.rleCompressedSize;
      }
      let S = 0;
      const C = new Array(m.length);
      for (let x = 0; x < C.length; ++x)
        C[x] = new Array();
      for (let x = 0; x < e.lines; ++x)
        for (let _ = 0; _ < m.length; ++_)
          C[_].push(S), S += m[_].width * e.type * 2;
      ni(p, C, m, d, w, a);
      for (let x = 0; x < m.length; ++x) {
        const _ = m[x];
        if (!_.decoded)
          switch (_.compression) {
            case 2:
              let I = 0, R = 0;
              for (let B = 0; B < e.lines; ++B) {
                let Y = C[x][I];
                for (let z = 0; z < _.width; ++z) {
                  for (let M = 0; M < 2 * _.type; ++M)
                    a[Y++] = b[R + M * _.width * _.height];
                  R++;
                }
                I++;
              }
              break;
            case 1:
            // skip
            default:
              throw new Error("EXRLoader.parse: unsupported channel compression");
          }
      }
      return new DataView(a.buffer);
    }
    function it(e, i) {
      const s = new Uint8Array(e);
      let a = 0;
      for (; s[i.value + a] != 0; )
        a += 1;
      const h = new TextDecoder().decode(
        s.slice(i.value, i.value + a)
      );
      return i.value = i.value + a + 1, h;
    }
    function pi(e, i, s) {
      const a = new TextDecoder().decode(
        new Uint8Array(e).slice(i.value, i.value + s)
      );
      return i.value = i.value + s, a;
    }
    function fi(e, i) {
      const s = j(e, i), a = J(e, i);
      return [s, a];
    }
    function mi(e, i) {
      const s = J(e, i), a = J(e, i);
      return [s, a];
    }
    function j(e, i) {
      const s = e.getInt32(i.value, !0);
      return i.value = i.value + 4, s;
    }
    function J(e, i) {
      const s = e.getUint32(i.value, !0);
      return i.value = i.value + 4, s;
    }
    function Mt(e, i) {
      const s = e[i.value];
      return i.value = i.value + 1, s;
    }
    function we(e, i) {
      const s = e.getUint8(i.value);
      return i.value = i.value + 1, s;
    }
    const K = function(e, i) {
      let s;
      return "getBigInt64" in DataView.prototype ? s = Number(e.getBigInt64(i.value, !0)) : s = e.getUint32(i.value + 4, !0) + Number(e.getUint32(i.value, !0) << 32), i.value += 8, s;
    };
    function Z(e, i) {
      const s = e.getFloat32(i.value, !0);
      return i.value += 4, s;
    }
    function gi(e, i) {
      return zt.toHalfFloat(Z(e, i));
    }
    function y(e) {
      const i = (e & 31744) >> 10, s = e & 1023;
      return (e >> 15 ? -1 : 1) * (i ? i === 31 ? s ? NaN : 1 / 0 : Math.pow(2, i - 15) * (1 + s / 1024) : 6103515625e-14 * (s / 1024));
    }
    function Oe(e, i) {
      const s = e.getUint16(i.value, !0);
      return i.value += 2, s;
    }
    function vi(e, i) {
      return y(Oe(e, i));
    }
    function wi(e, i, s, a) {
      const h = s.value, c = [];
      for (; s.value < h + a - 1; ) {
        const f = it(i, s), v = j(e, s), m = we(e, s);
        s.value += 3;
        const p = j(e, s), d = j(e, s);
        c.push({
          name: f,
          pixelType: v,
          pLinear: m,
          xSampling: p,
          ySampling: d
        });
      }
      return s.value += 1, c;
    }
    function Si(e, i) {
      const s = Z(e, i), a = Z(e, i), h = Z(e, i), c = Z(e, i), f = Z(e, i), v = Z(e, i), m = Z(e, i), p = Z(e, i);
      return { redX: s, redY: a, greenX: h, greenY: c, blueX: f, blueY: v, whiteX: m, whiteY: p };
    }
    function xi(e, i) {
      const s = [
        "NO_COMPRESSION",
        "RLE_COMPRESSION",
        "ZIPS_COMPRESSION",
        "ZIP_COMPRESSION",
        "PIZ_COMPRESSION",
        "PXR24_COMPRESSION",
        "B44_COMPRESSION",
        "B44A_COMPRESSION",
        "DWAA_COMPRESSION",
        "DWAB_COMPRESSION"
      ], a = we(e, i);
      return s[a];
    }
    function yi(e, i) {
      const s = j(e, i), a = j(e, i), h = j(e, i), c = j(e, i);
      return { xMin: s, yMin: a, xMax: h, yMax: c };
    }
    function bi(e, i) {
      const s = [
        "INCREASING_Y",
        "DECREASING_Y",
        "RANDOM_Y"
      ], a = we(e, i);
      return s[a];
    }
    function Ei(e, i) {
      const s = [
        "ENVMAP_LATLONG",
        "ENVMAP_CUBE"
      ], a = we(e, i);
      return s[a];
    }
    function _i(e, i) {
      const s = [
        "ONE_LEVEL",
        "MIPMAP_LEVELS",
        "RIPMAP_LEVELS"
      ], a = [
        "ROUND_DOWN",
        "ROUND_UP"
      ], h = J(e, i), c = J(e, i), f = we(e, i);
      return {
        xSize: h,
        ySize: c,
        levelMode: s[f & 15],
        roundingMode: a[f >> 4]
      };
    }
    function Ci(e, i) {
      const s = Z(e, i), a = Z(e, i);
      return [s, a];
    }
    function Ti(e, i) {
      const s = Z(e, i), a = Z(e, i), h = Z(e, i);
      return [s, a, h];
    }
    function Ai(e, i, s, a, h) {
      if (a === "string" || a === "stringvector" || a === "iccProfile")
        return pi(i, s, h);
      if (a === "chlist")
        return wi(e, i, s, h);
      if (a === "chromaticities")
        return Si(e, s);
      if (a === "compression")
        return xi(e, s);
      if (a === "box2i")
        return yi(e, s);
      if (a === "envmap")
        return Ei(e, s);
      if (a === "tiledesc")
        return _i(e, s);
      if (a === "lineOrder")
        return bi(e, s);
      if (a === "float")
        return Z(e, s);
      if (a === "v2f")
        return Ci(e, s);
      if (a === "v3f")
        return Ti(e, s);
      if (a === "int")
        return j(e, s);
      if (a === "rational")
        return fi(e, s);
      if (a === "timecode")
        return mi(e, s);
      if (a === "preview")
        return s.value += h, "skipped";
      s.value += h;
    }
    function Ii(e, i) {
      const s = Math.log2(e);
      return i == "ROUND_DOWN" ? Math.floor(s) : Math.ceil(s);
    }
    function Mi(e, i, s) {
      let a = 0;
      switch (e.levelMode) {
        case "ONE_LEVEL":
          a = 1;
          break;
        case "MIPMAP_LEVELS":
          a = Ii(Math.max(i, s), e.roundingMode) + 1;
          break;
        case "RIPMAP_LEVELS":
          throw new Error("THREE.EXRLoader: RIPMAP_LEVELS tiles currently unsupported.");
      }
      return a;
    }
    function Dt(e, i, s, a) {
      const h = new Array(e);
      for (let c = 0; c < e; c++) {
        const f = 1 << c;
        let v = i / f | 0;
        a == "ROUND_UP" && v * f < i && (v += 1);
        const m = Math.max(v, 1);
        h[c] = (m + s - 1) / s | 0;
      }
      return h;
    }
    function Di() {
      const e = this, i = e.offset, s = { value: 0 };
      for (let a = 0; a < e.tileCount; a++) {
        const h = j(e.viewer, i), c = j(e.viewer, i);
        i.value += 8, e.size = J(e.viewer, i);
        const f = h * e.blockWidth, v = c * e.blockHeight;
        e.columns = f + e.blockWidth > e.width ? e.width - f : e.blockWidth, e.lines = v + e.blockHeight > e.height ? e.height - v : e.blockHeight;
        const m = e.columns * e.totalBytes, d = e.size < e.lines * m ? e.uncompress(e) : pt(e);
        i.value += e.size;
        for (let w = 0; w < e.lines; w++) {
          const b = w * e.columns * e.totalBytes;
          for (let S = 0; S < e.inputChannels.length; S++) {
            const C = Ce.channels[S].name, x = e.channelByteOffsets[C] * e.columns, _ = e.decodeChannels[C];
            if (_ === void 0) continue;
            s.value = b + x;
            const I = (e.height - (1 + v + w)) * e.outLineWidth;
            for (let R = 0; R < e.columns; R++) {
              const B = I + (R + f) * e.outputChannels + _;
              e.byteArray[B] = e.getter(d, s);
            }
          }
        }
      }
    }
    function Ui() {
      const e = this, i = e.offset, s = { value: 0 };
      for (let a = 0; a < e.height / e.blockHeight; a++) {
        const h = j(e.viewer, i) - Ce.dataWindow.yMin;
        e.size = J(e.viewer, i), e.lines = h + e.blockHeight > e.height ? e.height - h : e.blockHeight;
        const c = e.columns * e.totalBytes, v = e.size < e.lines * c ? e.uncompress(e) : pt(e);
        i.value += e.size;
        for (let m = 0; m < e.blockHeight; m++) {
          const p = a * e.blockHeight, d = m + e.scanOrder(p);
          if (d >= e.height) continue;
          const w = m * c, b = (e.height - 1 - d) * e.outLineWidth;
          for (let S = 0; S < e.inputChannels.length; S++) {
            const C = Ce.channels[S].name, x = e.channelByteOffsets[C] * e.columns, _ = e.decodeChannels[C];
            if (_ !== void 0) {
              s.value = w + x;
              for (let I = 0; I < e.columns; I++) {
                const R = b + I * e.outputChannels + _;
                e.byteArray[R] = e.getter(v, s);
              }
            }
          }
        }
      }
    }
    function Pi(e, i, s) {
      const a = {};
      if (e.getUint32(0, !0) != 20000630)
        throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");
      a.version = e.getUint8(4);
      const h = e.getUint8(5);
      a.spec = {
        singleTile: !!(h & 2),
        longName: !!(h & 4),
        deepFormat: !!(h & 8),
        multiPart: !!(h & 16)
      }, s.value = 8;
      let c = !0;
      for (; c; ) {
        const f = it(i, s);
        if (f === "")
          c = !1;
        else {
          const v = it(i, s), m = J(e, s), p = Ai(e, i, s, v, m);
          p === void 0 ? console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${v}'.`) : a[f] = p;
        }
      }
      if ((h & -7) != 0)
        throw console.error("THREE.EXRHeader:", a), new Error("THREE.EXRLoader: Provided file is currently unsupported.");
      return a;
    }
    function Ri(e, i, s, a, h) {
      const c = {
        size: 0,
        viewer: i,
        array: s,
        offset: a,
        width: e.dataWindow.xMax - e.dataWindow.xMin + 1,
        height: e.dataWindow.yMax - e.dataWindow.yMin + 1,
        inputChannels: e.channels,
        channelByteOffsets: {},
        scanOrder: null,
        totalBytes: null,
        columns: null,
        lines: null,
        type: null,
        uncompress: null,
        getter: null,
        format: null,
        colorSpace: Rt
      };
      switch (e.compression) {
        case "NO_COMPRESSION":
          c.blockHeight = 1, c.uncompress = pt;
          break;
        case "RLE_COMPRESSION":
          c.blockHeight = 1, c.uncompress = ui;
          break;
        case "ZIPS_COMPRESSION":
          c.blockHeight = 1, c.uncompress = ft;
          break;
        case "ZIP_COMPRESSION":
          c.blockHeight = 16, c.uncompress = ft;
          break;
        case "PIZ_COMPRESSION":
          c.blockHeight = 32, c.uncompress = hi;
          break;
        case "PXR24_COMPRESSION":
          c.blockHeight = 16, c.uncompress = di;
          break;
        case "DWAA_COMPRESSION":
          c.blockHeight = 32, c.uncompress = It;
          break;
        case "DWAB_COMPRESSION":
          c.blockHeight = 256, c.uncompress = It;
          break;
        default:
          throw new Error("EXRLoader.parse: " + e.compression + " is unsupported");
      }
      const f = {};
      for (const d of e.channels)
        switch (d.name) {
          case "Y":
          case "R":
          case "G":
          case "B":
          case "A":
            f[d.name] = !0, c.type = d.pixelType;
        }
      let v = !1;
      if (f.R && f.G && f.B)
        v = !f.A, c.outputChannels = 4, c.decodeChannels = { R: 0, G: 1, B: 2, A: 3 };
      else if (f.Y)
        c.outputChannels = 1, c.decodeChannels = { Y: 0 };
      else
        throw new Error("EXRLoader.parse: file contains unsupported data channels.");
      if (c.type == 1)
        switch (h) {
          case mt:
            c.getter = vi;
            break;
          case xe:
            c.getter = Oe;
            break;
        }
      else if (c.type == 2)
        switch (h) {
          case mt:
            c.getter = Z;
            break;
          case xe:
            c.getter = gi;
        }
      else
        throw new Error("EXRLoader.parse: unsupported pixelType " + c.type + " for " + e.compression + ".");
      c.columns = c.width;
      const m = c.width * c.height * c.outputChannels;
      switch (h) {
        case mt:
          c.byteArray = new Float32Array(m), v && c.byteArray.fill(1, 0, m);
          break;
        case xe:
          c.byteArray = new Uint16Array(m), v && c.byteArray.fill(15360, 0, m);
          break;
        default:
          console.error("THREE.EXRLoader: unsupported type: ", h);
          break;
      }
      let p = 0;
      for (const d of e.channels)
        c.decodeChannels[d.name] !== void 0 && (c.channelByteOffsets[d.name] = p), p += d.pixelType * 2;
      if (c.totalBytes = p, c.outLineWidth = c.width * c.outputChannels, e.lineOrder === "INCREASING_Y" ? c.scanOrder = (d) => d : c.scanOrder = (d) => c.height - 1 - d, c.outputChannels == 4 ? (c.format = Ni, c.colorSpace = Rt) : (c.format = Oi, c.colorSpace = Li), e.spec.singleTile) {
        c.blockHeight = e.tiles.ySize, c.blockWidth = e.tiles.xSize;
        const d = Mi(e.tiles, c.width, c.height), w = Dt(d, c.width, e.tiles.xSize, e.tiles.roundingMode), b = Dt(d, c.height, e.tiles.ySize, e.tiles.roundingMode);
        c.tileCount = w[0] * b[0];
        for (let S = 0; S < d; S++)
          for (let C = 0; C < b[S]; C++)
            for (let x = 0; x < w[S]; x++)
              K(i, a);
        c.decode = Di.bind(c);
      } else {
        c.blockWidth = c.width;
        const d = Math.ceil(c.height / c.blockHeight);
        for (let w = 0; w < d; w++)
          K(i, a);
        c.decode = Ui.bind(c);
      }
      return c;
    }
    const Ut = { value: 0 }, Pt = new DataView(t), Fi = new Uint8Array(t), Ce = Pi(Pt, t, Ut), Ie = Ri(Ce, Pt, Fi, Ut, this.type);
    return Ie.decode(), {
      header: Ce,
      width: Ie.width,
      height: Ie.height,
      data: Ie.byteArray,
      format: Ie.format,
      colorSpace: Ie.colorSpace,
      type: this.type
    };
  }
  /**
   * Sets the texture type.
   *
   * @param {(HalfFloatType|FloatType)} value - The texture type to set.
   * @return {RGBMLoader} A reference to this loader.
   */
  setDataType(t) {
    return this.type = t, this;
  }
  load(t, n, o, l) {
    function u(g, E) {
      g.colorSpace = E.colorSpace, g.minFilter = Ft, g.magFilter = Ft, g.generateMipmaps = !1, g.flipY = !1, n && n(g, E);
    }
    return super.load(t, u, o, l);
  }
}
const at = {
  name: "CopyShader",
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`
  )
};
class Xe {
  /**
   * Constructs a new pass.
   */
  constructor() {
    this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
  }
  /**
   * Sets the size of the pass.
   *
   * @abstract
   * @param {number} width - The width to set.
   * @param {number} height - The width to set.
   */
  setSize() {
  }
  /**
   * This method holds the render logic of a pass. It must be implemented in all derived classes.
   *
   * @abstract
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
   * destination for the pass.
   * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
   * previous pass from this buffer.
   * @param {number} deltaTime - The delta time in seconds.
   * @param {boolean} maskActive - Whether masking is active or not.
   */
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever the pass is no longer used in your app.
   *
   * @abstract
   */
  dispose() {
  }
}
const In = new ki(-1, 1, 1, -1, 0, 1);
class Mn extends $i {
  constructor() {
    super(), this.setAttribute("position", new Nt([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new Nt([0, 2, 0, 0, 2, 0], 2));
  }
}
const Dn = new Mn();
class ei {
  /**
   * Constructs a new full screen quad.
   *
   * @param {?Material} material - The material to render te full screen quad with.
   */
  constructor(t) {
    this._mesh = new Bi(Dn, t);
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever the instance is no longer used in your app.
   */
  dispose() {
    this._mesh.geometry.dispose();
  }
  /**
   * Renders the full screen quad.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   */
  render(t) {
    t.render(this._mesh, In);
  }
  /**
   * The quad's material.
   *
   * @type {?Material}
   */
  get material() {
    return this._mesh.material;
  }
  set material(t) {
    this._mesh.material = t;
  }
}
class ti extends Xe {
  /**
   * Constructs a new shader pass.
   *
   * @param {Object|ShaderMaterial} [shader] - A shader object holding vertex and fragment shader as well as
   * defines and uniforms. It's also valid to pass a custom shader material.
   * @param {string} [textureID='tDiffuse'] - The name of the texture uniform that should sample
   * the read buffer.
   */
  constructor(t, n = "tDiffuse") {
    super(), this.textureID = n, this.uniforms = null, this.material = null, t instanceof Me ? (this.uniforms = t.uniforms, this.material = t) : t && (this.uniforms = St.clone(t.uniforms), this.material = new Me({
      name: t.name !== void 0 ? t.name : "unspecified",
      defines: Object.assign({}, t.defines),
      uniforms: this.uniforms,
      vertexShader: t.vertexShader,
      fragmentShader: t.fragmentShader
    })), this._fsQuad = new ei(this.material);
  }
  /**
   * Performs the shader pass.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
   * destination for the pass.
   * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
   * previous pass from this buffer.
   * @param {number} deltaTime - The delta time in seconds.
   * @param {boolean} maskActive - Whether masking is active or not.
   */
  render(t, n, o) {
    this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = o.texture), this._fsQuad.material = this.material, this.renderToScreen ? (t.setRenderTarget(null), this._fsQuad.render(t)) : (t.setRenderTarget(n), this.clear && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil), this._fsQuad.render(t));
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever the pass is no longer used in your app.
   */
  dispose() {
    this.material.dispose(), this._fsQuad.dispose();
  }
}
class Ht extends Xe {
  /**
   * Constructs a new mask pass.
   *
   * @param {Scene} scene - The 3D objects in this scene will define the mask.
   * @param {Camera} camera - The camera.
   */
  constructor(t, n) {
    super(), this.scene = t, this.camera = n, this.clear = !0, this.needsSwap = !1, this.inverse = !1;
  }
  /**
   * Performs a mask pass with the configured scene and camera.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
   * destination for the pass.
   * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
   * previous pass from this buffer.
   * @param {number} deltaTime - The delta time in seconds.
   * @param {boolean} maskActive - Whether masking is active or not.
   */
  render(t, n, o) {
    const l = t.getContext(), u = t.state;
    u.buffers.color.setMask(!1), u.buffers.depth.setMask(!1), u.buffers.color.setLocked(!0), u.buffers.depth.setLocked(!0);
    let g, E;
    this.inverse ? (g = 0, E = 1) : (g = 1, E = 0), u.buffers.stencil.setTest(!0), u.buffers.stencil.setOp(l.REPLACE, l.REPLACE, l.REPLACE), u.buffers.stencil.setFunc(l.ALWAYS, g, 4294967295), u.buffers.stencil.setClear(E), u.buffers.stencil.setLocked(!0), t.setRenderTarget(o), this.clear && t.clear(), t.render(this.scene, this.camera), t.setRenderTarget(n), this.clear && t.clear(), t.render(this.scene, this.camera), u.buffers.color.setLocked(!1), u.buffers.depth.setLocked(!1), u.buffers.color.setMask(!0), u.buffers.depth.setMask(!0), u.buffers.stencil.setLocked(!1), u.buffers.stencil.setFunc(l.EQUAL, 1, 4294967295), u.buffers.stencil.setOp(l.KEEP, l.KEEP, l.KEEP), u.buffers.stencil.setLocked(!0);
  }
}
class Un extends Xe {
  /**
   * Constructs a new clear mask pass.
   */
  constructor() {
    super(), this.needsSwap = !1;
  }
  /**
   * Performs the clear of the currently defined mask.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
   * destination for the pass.
   * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
   * previous pass from this buffer.
   * @param {number} deltaTime - The delta time in seconds.
   * @param {boolean} maskActive - Whether masking is active or not.
   */
  render(t) {
    t.state.buffers.stencil.setLocked(!1), t.state.buffers.stencil.setTest(!1);
  }
}
class Pn {
  /**
   * Constructs a new effect composer.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} [renderTarget] - This render target and a clone will
   * be used as the internal read and write buffers. If not given, the composer creates
   * the buffers automatically.
   */
  constructor(t, n) {
    if (this.renderer = t, this._pixelRatio = t.getPixelRatio(), n === void 0) {
      const o = t.getSize(new ae());
      this._width = o.width, this._height = o.height, n = new rt(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: xe }), n.texture.name = "EffectComposer.rt1";
    } else
      this._width = n.width, this._height = n.height;
    this.renderTarget1 = n, this.renderTarget2 = n.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new ti(at), this.copyPass.material.blending = Hi, this.clock = new Gi();
  }
  /**
   * Swaps the internal read/write buffers.
   */
  swapBuffers() {
    const t = this.readBuffer;
    this.readBuffer = this.writeBuffer, this.writeBuffer = t;
  }
  /**
   * Adds the given pass to the pass chain.
   *
   * @param {Pass} pass - The pass to add.
   */
  addPass(t) {
    this.passes.push(t), t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  /**
   * Inserts the given pass at a given index.
   *
   * @param {Pass} pass - The pass to insert.
   * @param {number} index - The index into the pass chain.
   */
  insertPass(t, n) {
    this.passes.splice(n, 0, t), t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  /**
   * Removes the given pass from the pass chain.
   *
   * @param {Pass} pass - The pass to remove.
   */
  removePass(t) {
    const n = this.passes.indexOf(t);
    n !== -1 && this.passes.splice(n, 1);
  }
  /**
   * Returns `true` if the pass for the given index is the last enabled pass in the pass chain.
   *
   * @param {number} passIndex - The pass index.
   * @return {boolean} Whether the pass for the given index is the last pass in the pass chain.
   */
  isLastEnabledPass(t) {
    for (let n = t + 1; n < this.passes.length; n++)
      if (this.passes[n].enabled)
        return !1;
    return !0;
  }
  /**
   * Executes all enabled post-processing passes in order to produce the final frame.
   *
   * @param {number} deltaTime - The delta time in seconds. If not given, the composer computes
   * its own time delta value.
   */
  render(t) {
    t === void 0 && (t = this.clock.getDelta());
    const n = this.renderer.getRenderTarget();
    let o = !1;
    for (let l = 0, u = this.passes.length; l < u; l++) {
      const g = this.passes[l];
      if (g.enabled !== !1) {
        if (g.renderToScreen = this.renderToScreen && this.isLastEnabledPass(l), g.render(this.renderer, this.writeBuffer, this.readBuffer, t, o), g.needsSwap) {
          if (o) {
            const E = this.renderer.getContext(), A = this.renderer.state.buffers.stencil;
            A.setFunc(E.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, t), A.setFunc(E.EQUAL, 1, 4294967295);
          }
          this.swapBuffers();
        }
        Ht !== void 0 && (g instanceof Ht ? o = !0 : g instanceof Un && (o = !1));
      }
    }
    this.renderer.setRenderTarget(n);
  }
  /**
   * Resets the internal state of the EffectComposer.
   *
   * @param {WebGLRenderTarget} [renderTarget] - This render target has the same purpose like
   * the one from the constructor. If set, it is used to setup the read and write buffers.
   */
  reset(t) {
    if (t === void 0) {
      const n = this.renderer.getSize(new ae());
      this._pixelRatio = this.renderer.getPixelRatio(), this._width = n.width, this._height = n.height, t = this.renderTarget1.clone(), t.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
  }
  /**
   * Resizes the internal read and write buffers as well as all passes. Similar to {@link WebGLRenderer#setSize},
   * this method honors the current pixel ration.
   *
   * @param {number} width - The width in logical pixels.
   * @param {number} height - The height in logical pixels.
   */
  setSize(t, n) {
    this._width = t, this._height = n;
    const o = this._width * this._pixelRatio, l = this._height * this._pixelRatio;
    this.renderTarget1.setSize(o, l), this.renderTarget2.setSize(o, l);
    for (let u = 0; u < this.passes.length; u++)
      this.passes[u].setSize(o, l);
  }
  /**
   * Sets device pixel ratio. This is usually used for HiDPI device to prevent blurring output.
   * Setting the pixel ratio will automatically resize the composer.
   *
   * @param {number} pixelRatio - The pixel ratio to set.
   */
  setPixelRatio(t) {
    this._pixelRatio = t, this.setSize(this._width, this._height);
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever the composer is no longer used in your app.
   */
  dispose() {
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
  }
}
class Rn extends Xe {
  /**
   * Constructs a new render pass.
   *
   * @param {Scene} scene - The scene to render.
   * @param {Camera} camera - The camera.
   * @param {?Material} [overrideMaterial=null] - The override material. If set, this material is used
   * for all objects in the scene.
   * @param {?(number|Color|string)} [clearColor=null] - The clear color of the render pass.
   * @param {?number} [clearAlpha=null] - The clear alpha of the render pass.
   */
  constructor(t, n, o = null, l = null, u = null) {
    super(), this.scene = t, this.camera = n, this.overrideMaterial = o, this.clearColor = l, this.clearAlpha = u, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this._oldClearColor = new lt();
  }
  /**
   * Performs a beauty pass with the configured scene and camera.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
   * destination for the pass.
   * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
   * previous pass from this buffer.
   * @param {number} deltaTime - The delta time in seconds.
   * @param {boolean} maskActive - Whether masking is active or not.
   */
  render(t, n, o) {
    const l = t.autoClear;
    t.autoClear = !1;
    let u, g;
    this.overrideMaterial !== null && (g = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor !== null && (t.getClearColor(this._oldClearColor), t.setClearColor(this.clearColor, t.getClearAlpha())), this.clearAlpha !== null && (u = t.getClearAlpha(), t.setClearAlpha(this.clearAlpha)), this.clearDepth == !0 && t.clearDepth(), t.setRenderTarget(this.renderToScreen ? null : o), this.clear === !0 && t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil), t.render(this.scene, this.camera), this.clearColor !== null && t.setClearColor(this._oldClearColor), this.clearAlpha !== null && t.setClearAlpha(u), this.overrideMaterial !== null && (this.scene.overrideMaterial = g), t.autoClear = l;
  }
}
const Fn = {
  uniforms: {
    tDiffuse: { value: null },
    luminosityThreshold: { value: 1 },
    smoothWidth: { value: 1 },
    defaultColor: { value: new lt(0) },
    defaultOpacity: { value: 0 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

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

		}`
  )
};
class Ue extends Xe {
  /**
   * Constructs a new Unreal Bloom pass.
   *
   * @param {Vector2} [resolution] - The effect's resolution.
   * @param {number} [strength=1] - The Bloom strength.
   * @param {number} radius - The Bloom radius.
   * @param {number} threshold - The luminance threshold limits which bright areas contribute to the Bloom effect.
   */
  constructor(t, n = 1, o, l) {
    super(), this.strength = n, this.radius = o, this.threshold = l, this.resolution = t !== void 0 ? new ae(t.x, t.y) : new ae(256, 256), this.clearColor = new lt(0, 0, 0), this.needsSwap = !1, this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5;
    let u = Math.round(this.resolution.x / 2), g = Math.round(this.resolution.y / 2);
    this.renderTargetBright = new rt(u, g, { type: xe }), this.renderTargetBright.texture.name = "UnrealBloomPass.bright", this.renderTargetBright.texture.generateMipmaps = !1;
    for (let $ = 0; $ < this.nMips; $++) {
      const T = new rt(u, g, { type: xe });
      T.texture.name = "UnrealBloomPass.h" + $, T.texture.generateMipmaps = !1, this.renderTargetsHorizontal.push(T);
      const D = new rt(u, g, { type: xe });
      D.texture.name = "UnrealBloomPass.v" + $, D.texture.generateMipmaps = !1, this.renderTargetsVertical.push(D), u = Math.round(u / 2), g = Math.round(g / 2);
    }
    const E = Fn;
    this.highPassUniforms = St.clone(E.uniforms), this.highPassUniforms.luminosityThreshold.value = l, this.highPassUniforms.smoothWidth.value = 0.01, this.materialHighPassFilter = new Me({
      uniforms: this.highPassUniforms,
      vertexShader: E.vertexShader,
      fragmentShader: E.fragmentShader
    }), this.separableBlurMaterials = [];
    const A = [3, 5, 7, 9, 11];
    u = Math.round(this.resolution.x / 2), g = Math.round(this.resolution.y / 2);
    for (let $ = 0; $ < this.nMips; $++)
      this.separableBlurMaterials.push(this._getSeparableBlurMaterial(A[$])), this.separableBlurMaterials[$].uniforms.invSize.value = new ae(1 / u, 1 / g), u = Math.round(u / 2), g = Math.round(g / 2);
    this.compositeMaterial = this._getCompositeMaterial(this.nMips), this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture, this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture, this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture, this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture, this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture, this.compositeMaterial.uniforms.bloomStrength.value = n, this.compositeMaterial.uniforms.bloomRadius.value = 0.1;
    const O = [1, 0.8, 0.6, 0.4, 0.2];
    this.compositeMaterial.uniforms.bloomFactors.value = O, this.bloomTintColors = [new Be(1, 1, 1), new Be(1, 1, 1), new Be(1, 1, 1), new Be(1, 1, 1), new Be(1, 1, 1)], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, this.copyUniforms = St.clone(at.uniforms), this.blendMaterial = new Me({
      uniforms: this.copyUniforms,
      vertexShader: at.vertexShader,
      fragmentShader: at.fragmentShader,
      blending: Zi,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0
    }), this._oldClearColor = new lt(), this._oldClearAlpha = 1, this._basic = new Wi(), this._fsQuad = new ei(null);
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever the pass is no longer used in your app.
   */
  dispose() {
    for (let t = 0; t < this.renderTargetsHorizontal.length; t++)
      this.renderTargetsHorizontal[t].dispose();
    for (let t = 0; t < this.renderTargetsVertical.length; t++)
      this.renderTargetsVertical[t].dispose();
    this.renderTargetBright.dispose();
    for (let t = 0; t < this.separableBlurMaterials.length; t++)
      this.separableBlurMaterials[t].dispose();
    this.compositeMaterial.dispose(), this.blendMaterial.dispose(), this._basic.dispose(), this._fsQuad.dispose();
  }
  /**
   * Sets the size of the pass.
   *
   * @param {number} width - The width to set.
   * @param {number} height - The width to set.
   */
  setSize(t, n) {
    let o = Math.round(t / 2), l = Math.round(n / 2);
    this.renderTargetBright.setSize(o, l);
    for (let u = 0; u < this.nMips; u++)
      this.renderTargetsHorizontal[u].setSize(o, l), this.renderTargetsVertical[u].setSize(o, l), this.separableBlurMaterials[u].uniforms.invSize.value = new ae(1 / o, 1 / l), o = Math.round(o / 2), l = Math.round(l / 2);
  }
  /**
   * Performs the Bloom pass.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} writeBuffer - The write buffer. This buffer is intended as the rendering
   * destination for the pass.
   * @param {WebGLRenderTarget} readBuffer - The read buffer. The pass can access the result from the
   * previous pass from this buffer.
   * @param {number} deltaTime - The delta time in seconds.
   * @param {boolean} maskActive - Whether masking is active or not.
   */
  render(t, n, o, l, u) {
    t.getClearColor(this._oldClearColor), this._oldClearAlpha = t.getClearAlpha();
    const g = t.autoClear;
    t.autoClear = !1, t.setClearColor(this.clearColor, 0), u && t.state.buffers.stencil.setTest(!1), this.renderToScreen && (this._fsQuad.material = this._basic, this._basic.map = o.texture, t.setRenderTarget(null), t.clear(), this._fsQuad.render(t)), this.highPassUniforms.tDiffuse.value = o.texture, this.highPassUniforms.luminosityThreshold.value = this.threshold, this._fsQuad.material = this.materialHighPassFilter, t.setRenderTarget(this.renderTargetBright), t.clear(), this._fsQuad.render(t);
    let E = this.renderTargetBright;
    for (let A = 0; A < this.nMips; A++)
      this._fsQuad.material = this.separableBlurMaterials[A], this.separableBlurMaterials[A].uniforms.colorTexture.value = E.texture, this.separableBlurMaterials[A].uniforms.direction.value = Ue.BlurDirectionX, t.setRenderTarget(this.renderTargetsHorizontal[A]), t.clear(), this._fsQuad.render(t), this.separableBlurMaterials[A].uniforms.colorTexture.value = this.renderTargetsHorizontal[A].texture, this.separableBlurMaterials[A].uniforms.direction.value = Ue.BlurDirectionY, t.setRenderTarget(this.renderTargetsVertical[A]), t.clear(), this._fsQuad.render(t), E = this.renderTargetsVertical[A];
    this._fsQuad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, t.setRenderTarget(this.renderTargetsHorizontal[0]), t.clear(), this._fsQuad.render(t), this._fsQuad.material = this.blendMaterial, this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture, u && t.state.buffers.stencil.setTest(!0), this.renderToScreen ? (t.setRenderTarget(null), this._fsQuad.render(t)) : (t.setRenderTarget(o), this._fsQuad.render(t)), t.setClearColor(this._oldClearColor, this._oldClearAlpha), t.autoClear = g;
  }
  // internals
  _getSeparableBlurMaterial(t) {
    const n = [];
    for (let o = 0; o < t; o++)
      n.push(0.39894 * Math.exp(-0.5 * o * o / (t * t)) / t);
    return new Me({
      defines: {
        KERNEL_RADIUS: t
      },
      uniforms: {
        colorTexture: { value: null },
        invSize: { value: new ae(0.5, 0.5) },
        // inverse texture size
        direction: { value: new ae(0.5, 0.5) },
        gaussianCoefficients: { value: n }
        // precomputed Gaussian coefficients
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `#include <common>
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
				}`
    });
  }
  _getCompositeMaterial(t) {
    return new Me({
      defines: {
        NUM_MIPS: t
      },
      uniforms: {
        blurTexture1: { value: null },
        blurTexture2: { value: null },
        blurTexture3: { value: null },
        blurTexture4: { value: null },
        blurTexture5: { value: null },
        bloomStrength: { value: 1 },
        bloomFactors: { value: null },
        bloomTintColors: { value: null },
        bloomRadius: { value: 0 }
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `varying vec2 vUv;
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
				}`
    });
  }
}
Ue.BlurDirectionX = new ae(1, 0);
Ue.BlurDirectionY = new ae(0, 1);
const zn = {
  name: "FXAAShader",
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new ae(1 / 1024, 1 / 512) }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

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

		}`
  )
};
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
const Nn = `precision highp float;

in vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}`, On = `precision highp float;

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
const Ln = `#define STANDARD
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
var Bn = Object.defineProperty, kn = Object.getOwnPropertyDescriptor, _t = (r, t, n, o) => {
  for (var l = o > 1 ? void 0 : o ? kn(t, n) : t, u = r.length - 1, g; u >= 0; u--)
    (g = r[u]) && (l = (o ? g(t, n, l) : g(l)) || l);
  return o && l && Bn(t, n, l), l;
};
let Ze = class extends Wt {
  constructor() {
    super(...arguments), this.prevTime = 0, this.rotation = new k.Vector3(0, 0, 0);
  }
  set outputNode(r) {
    this._outputNode = r, this.outputAnalyser = new $t(this._outputNode);
  }
  get outputNode() {
    return this._outputNode;
  }
  set inputNode(r) {
    this._inputNode = r, this.inputAnalyser = new $t(this._inputNode);
  }
  get inputNode() {
    return this._inputNode;
  }
  connectedCallback() {
    super.connectedCallback();
  }
  init() {
    const r = new k.Scene();
    r.background = new k.Color(1051668);
    const t = new k.Mesh(
      new k.IcosahedronGeometry(10, 5),
      new k.RawShaderMaterial({
        uniforms: {
          resolution: { value: new k.Vector2(1, 1) },
          rand: { value: 0 }
        },
        vertexShader: Nn,
        fragmentShader: On,
        glslVersion: k.GLSL3
      })
    );
    t.material.side = k.BackSide, r.add(t), this.backdrop = t;
    const n = new k.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1e3
    );
    n.position.set(2, -2, 5), this.camera = n;
    const o = new k.WebGLRenderer({
      canvas: this.canvas,
      antialias: !1
    });
    o.setSize(window.innerWidth, window.innerHeight), o.setPixelRatio(window.devicePixelRatio / 1);
    const l = new k.IcosahedronGeometry(1, 10), u = new k.PMREMGenerator(o);
    u.compileEquirectangularShader();
    const g = new k.MeshStandardMaterial({
      color: 16,
      metalness: 0.5,
      roughness: 0.1,
      emissive: 16,
      emissiveIntensity: 1.5
    });
    g.onBeforeCompile = (L) => {
      L.uniforms.time = { value: 0 }, L.uniforms.inputData = { value: new k.Vector4() }, L.uniforms.outputData = { value: new k.Vector4() }, g.userData.shader = L, L.vertexShader = Ln;
    };
    const E = new k.Mesh(l, g);
    r.add(E), E.visible = !1, this.sphere = E, new An().load(
      "/piz_compressed.exr",
      (L) => {
        L.mapping = k.EquirectangularReflectionMapping;
        const V = u.fromEquirectangular(L);
        g.envMap = V.texture, E.visible = !0;
      },
      void 0,
      (L) => {
        console.error("Error loading EXR:", L), E.visible = !0;
      }
    );
    const A = new Rn(r, n), O = new Ue(
      new k.Vector2(window.innerWidth, window.innerHeight),
      5,
      0.5,
      0
    ), $ = new ti(zn), T = new Pn(o);
    T.addPass(A), T.addPass(O), this.composer = T;
    function D() {
      n.aspect = window.innerWidth / window.innerHeight, n.updateProjectionMatrix();
      const L = o.getPixelRatio(), V = window.innerWidth, ne = window.innerHeight;
      t.material.uniforms.resolution.value.set(V * L, ne * L), o.setSize(V, ne), T.setSize(V, ne), $.material.uniforms.resolution.value.set(
        1 / (V * L),
        1 / (ne * L)
      );
    }
    window.addEventListener("resize", D), D(), this.animation();
  }
  animation() {
    requestAnimationFrame(() => this.animation()), this.inputAnalyser.update(), this.outputAnalyser.update();
    const r = performance.now(), t = (r - this.prevTime) / (1e3 / 60);
    this.prevTime = r;
    const n = this.backdrop.material, o = this.sphere.material;
    if (n.uniforms.rand.value = Math.random() * 1e4, o.userData.shader) {
      this.sphere.scale.setScalar(
        1 + 0.2 * this.outputAnalyser.data[1] / 255
      );
      const l = 1e-3;
      this.rotation.x += t * l * 0.5 * this.outputAnalyser.data[1] / 255, this.rotation.z += t * l * 0.5 * this.inputAnalyser.data[1] / 255, this.rotation.y += t * l * 0.25 * this.inputAnalyser.data[2] / 255, this.rotation.y += t * l * 0.25 * this.outputAnalyser.data[2] / 255;
      const u = new k.Euler(
        this.rotation.x,
        this.rotation.y,
        this.rotation.z
      ), g = new k.Quaternion().setFromEuler(u), E = new k.Vector3(0, 0, 5);
      E.applyQuaternion(g), this.camera.position.copy(E), this.camera.lookAt(this.sphere.position), o.userData.shader.uniforms.time.value += t * 0.1 * this.outputAnalyser.data[0] / 255, o.userData.shader.uniforms.inputData.value.set(
        1 * this.inputAnalyser.data[0] / 255,
        0.1 * this.inputAnalyser.data[1] / 255,
        10 * this.inputAnalyser.data[2] / 255,
        0
      ), o.userData.shader.uniforms.outputData.value.set(
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
    return $e`<canvas></canvas>`;
  }
};
Ze.styles = Zt`
    canvas {
      width: 100% !important;
      height: 100% !important;
      position: absolute;
      inset: 0;
      image-rendering: pixelated;
    }
  `;
_t([
  Et()
], Ze.prototype, "outputNode", 1);
_t([
  Et()
], Ze.prototype, "inputNode", 1);
Ze = _t([
  Xt("gdm-live-audio-visuals-3d")
], Ze);
var $n = Object.defineProperty, Hn = Object.getOwnPropertyDescriptor, ie = (r, t, n, o) => {
  for (var l = o > 1 ? void 0 : o ? Hn(t, n) : t, u = r.length - 1, g; u >= 0; u--)
    (g = r[u]) && (l = (o ? g(t, n, l) : g(l)) || l);
  return o && l && $n(t, n, l), l;
};
const Gt = window.AudioContext || window.webkitAudioContext, wt = 20 * 1024 * 1024;
let W = class extends Wt {
  constructor() {
    super(), this.isRecording = !1, this.status = "Choose instruction method: Upload a file or type manually.", this.error = "", this.selectedFile = null, this.systemInstructionFromFile = null, this.isFileProcessing = !1, this.isSessionInitialized = !1, this.instructionMode = "file", this.manualSystemInstruction = "", this._model = "gemini-2.5-flash-preview-native-audio-dialog", this.session = null, this.inputAudioContext = new Gt({ sampleRate: 16e3 }), this.outputAudioContext = new Gt({ sampleRate: 24e3 }), this.inputNode = this.inputAudioContext.createGain(), this.outputNode = this.outputAudioContext.createGain(), this.nextStartTime = 0, this.mediaStream = null, this.sourceNode = null, this.scriptProcessorNode = null, this.sources = /* @__PURE__ */ new Set(), this.errorTimeoutId = null, console.log("GdmLiveAudio constructor called"), this.initClientOnly(), this.updateInitialStatus();
  }
  get apiKey() {
    return this._apiKey;
  }
  set apiKey(r) {
    const t = this._apiKey;
    this._apiKey = r, this.requestUpdate("apiKey", t), r && this.initClientOnly();
  }
  get model() {
    return this._model;
  }
  set model(r) {
    this._model = r;
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
  handleInstructionModeChange(r) {
    if (this.instructionMode !== r) {
      if (this.instructionMode = r, this.updateError(""), r === "file")
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
  async readFileAsBase64(r) {
    return new Promise((t, n) => {
      const o = new FileReader();
      o.onload = () => {
        const u = o.result.split(",")[1];
        u ? t(u) : n(new Error("Could not extract base64 data from file."));
      }, o.onerror = (l) => n(l), o.readAsDataURL(r);
    });
  }
  async readFileAsText(r) {
    return new Promise((t, n) => {
      const o = new FileReader();
      o.onload = () => {
        t(o.result);
      }, o.onerror = (l) => n(l), o.readAsText(r);
    });
  }
  async extractTextFromFileContent(r) {
    if (r.size > wt) {
      this.updateError(`File "${r.name}" exceeds the 20MB size limit.`), this.updateStatus(`File "${r.name}" is too large. Please select a smaller file (Max 20MB).`), this.selectedFile = null;
      const n = this.shadowRoot?.getElementById("fileUpload");
      return n && (n.value = ""), null;
    }
    this.isFileProcessing = !0, this.updateError("");
    const t = r.name.toLowerCase();
    try {
      if (t.endsWith(".txt")) {
        this.updateStatus(`Reading ${r.name} directly for system instruction...`);
        const n = await this.readFileAsText(r);
        if (n && n.trim().length > 0)
          return this.updateStatus(`Using content of ${r.name} as system instruction.`), n.trim();
        throw new Error(`File ${r.name} is empty or contains only whitespace.`);
      } else
        return this.updateError("Only .txt files are supported. Please select a text file."), this.updateStatus("File type not supported. Please select a .txt file."), null;
    } catch (n) {
      return console.error(`Error processing file ${r.name}:`, n), this.updateError(`Error processing ${r.name}: ${n.message || n}`), this.updateStatus(`Failed to process ${r.name}.`), null;
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
      console.log("Attempting to create GoogleGenAI client"), this.updateStatus("Connecting to Google AI client..."), this.client = new Xi({
        apiKey: this._apiKey
      }), console.log("GoogleGenAI client created successfully"), this.outputNode.connect(this.outputAudioContext.destination), console.log("outputNode connected"), this.updateStatus("Google AI client initialized successfully");
    } catch (r) {
      console.error("Error during initClientOnly:", r), this.updateError(`Initialization error: ${r.message || r}`), console.log("initClientOnly stopped due to error"), this.client = void 0;
    }
  }
  async handleFileChange(r) {
    const t = r.target;
    if (t.files && t.files.length > 0) {
      const n = t.files[0];
      if (n.size > wt) {
        this.updateError(`File "${n.name}" exceeds 20MB limit.`), this.updateStatus("File too large (max 20MB). Select another file."), this.selectedFile = null, t.value = "";
        return;
      }
      if (!n.name.toLowerCase().endsWith(".txt")) {
        this.updateError("Only .txt files are supported."), this.updateStatus("Please select a .txt file."), this.selectedFile = null, t.value = "";
        return;
      }
      this.selectedFile = n, this.updateStatus(`File '${this.selectedFile.name}' selected. Click "Process File".`), this.isSessionInitialized = !1, this.systemInstructionFromFile = null, this.updateError("");
    } else
      this.selectedFile = null, this.updateStatus('Please select a .txt file, then click "Process File".');
  }
  handleManualInstructionInput(r) {
    const t = r.target;
    this.manualSystemInstruction = t.value, this.manualSystemInstruction.trim() === "" ? this.status = 'Type your system instructions, then click "Apply Manual Instructions".' : this.status = 'Instructions entered. Click "Apply Manual Instructions".', this.isSessionInitialized = !1, this.updateError("");
  }
  async triggerFileProcessing() {
    if (!this.selectedFile) {
      this.updateError("No file selected to process.");
      return;
    }
    if (!this.isFileProcessing) {
      if (this.selectedFile.size > wt) {
        this.updateError(`File "${this.selectedFile.name}" exceeds 20MB limit and cannot be processed.`), this.updateStatus(`File "${this.selectedFile.name}" is too large (Max 20MB).`), this.selectedFile = null;
        const r = this.shadowRoot?.getElementById("fileUpload");
        r && (r.value = "");
        return;
      }
      this.isSessionInitialized = !1, this.updateError("");
      try {
        const r = await this.extractTextFromFileContent(this.selectedFile);
        r ? (this.systemInstructionFromFile = r, await this.initSession(r, `from file "${this.selectedFile?.name}"`)) : (this.error || this.updateStatus(`File processing did not yield text from ${this.selectedFile.name}. Using default system instruction.`), await this.initSession(null, "default (file processing failed)"));
      } catch (r) {
        this.updateError(`Failed to read or process file: ${r.message}`), this.updateStatus(`Error with ${this.selectedFile.name}. Using default system instruction.`), await this.initSession(null, "default (file processing error)");
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
  async initSession(r, t) {
    if (console.log("GdmLiveAudio initSession called"), this.session) {
      try {
        await this.session.close();
      } catch (u) {
        console.warn("Could not close previous session cleanly:", u);
      }
      this.session = null;
    }
    if (!this.client) {
      console.error("GoogleGenAI client is not initialized in initSession."), this.updateError("Initialization error: GoogleGenAI client not available."), console.log("initSession stopped: client not available");
      return;
    }
    const n = r || "You are an interactive ai with dialogue abilities.", o = t || "default";
    console.log(`Applying system instruction (${o}): "${n.substring(0, 100)}${n.length > 100 ? "..." : ""}"`);
    const l = {
      parts: [{ text: n }]
    };
    this.updateStatus(`Using instruction ${o}. Initializing audio session...`);
    try {
      this.session = await this.client.live.connect({
        model: this._model,
        callbacks: {
          onopen: () => {
            this.updateStatus(`Instruction ${o} applied. Press 🔴 to start audio session.`), this.isSessionInitialized = !0;
          },
          onmessage: async (u) => {
            const g = u.serverContent?.modelTurn?.parts?.[0]?.inlineData;
            if (g && g.data) {
              this.nextStartTime = Math.max(
                this.nextStartTime,
                this.outputAudioContext.currentTime
              );
              try {
                const A = await hn(
                  cn(g.data),
                  this.outputAudioContext,
                  24e3,
                  1
                ), O = this.outputAudioContext.createBufferSource();
                O.buffer = A, O.connect(this.outputNode), O.addEventListener("ended", () => {
                  this.sources.delete(O);
                }), O.start(this.nextStartTime), this.nextStartTime = this.nextStartTime + A.duration, this.sources.add(O);
              } catch (A) {
                console.error("Error processing audio data:", A), this.updateError(`Audio processing error: ${A.message || A}`);
              }
            }
            if (u.serverContent && u.serverContent.interrupted) {
              for (const A of Array.from(this.sources.values())) {
                try {
                  A.stop();
                } catch (O) {
                  console.error("Error stopping audio source:", O);
                }
                this.sources.delete(A);
              }
              this.nextStartTime = 0;
            }
          },
          onerror: (u) => {
            console.error("Session Error:", u), this.updateError(`Session Error: ${u.message || u.error || u}`), this.isSessionInitialized = !1;
          },
          onclose: (u) => {
            this.updateStatus(`Session Closed: ${u.reason || "Unknown reason"}`), this.isSessionInitialized = !1;
          }
        },
        config: {
          responseModalities: [Ki.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Orus" } }
          },
          systemInstruction: l
        }
      });
    } catch (u) {
      console.error("Failed to initialize session:", u), this.updateError(`Failed to initialize session: ${u.message}`), this.updateStatus("Error initializing audio session."), this.isSessionInitialized = !1;
    }
  }
  updateStatus(r) {
    this.status = r, console.log("Status:", r);
  }
  updateError(r) {
    this.errorTimeoutId && (clearTimeout(this.errorTimeoutId), this.errorTimeoutId = null), this.error = r, r && (console.error("Error:", r), this.errorTimeoutId = window.setTimeout(() => {
      this.error === r && (this.error = ""), this.errorTimeoutId = null;
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
      const r = 256;
      this.scriptProcessorNode = this.inputAudioContext.createScriptProcessor(
        r,
        1,
        1
      ), this.scriptProcessorNode.onaudioprocess = (t) => {
        if (!this.isRecording || !this.session) return;
        const o = t.inputBuffer.getChannelData(0);
        try {
          this.session.sendRealtimeInput({ media: un(o) });
        } catch (l) {
          console.error("Error sending real-time input:", l), this.updateError(`Error sending audio: ${l.message}`);
        }
      }, this.sourceNode.connect(this.scriptProcessorNode), this.scriptProcessorNode.connect(this.inputAudioContext.destination), this.isRecording = !0, this.updateStatus("🔴 Recording... Speak now. To stop the recording press 🟥");
    } catch (r) {
      console.error("Error starting recording:", r), this.updateStatus(`Error starting recording: ${r.message}`), this.updateError(`Error starting recording: ${r.message}`), this.stopRecording();
    }
  }
  stopRecording() {
    const r = this.isRecording;
    this.isRecording = !1, r && this.updateStatus("Stopping recording..."), this.scriptProcessorNode && (this.scriptProcessorNode.disconnect(), this.scriptProcessorNode.onaudioprocess = null, this.scriptProcessorNode = null), this.sourceNode && (this.sourceNode.disconnect(), this.sourceNode = null), this.mediaStream && (this.mediaStream.getTracks().forEach((t) => t.stop()), this.mediaStream = null), r ? this.isSessionInitialized ? this.updateStatus("Recording stopped. Press 🔴 to start again.") : this.updateStatus("Recording stopped. Session is not active.") : this.isSessionInitialized || this.updateInitialStatus();
  }
  async reset() {
    if (this.updateStatus("Resetting application..."), this.updateError(""), this.stopRecording(), this.session) {
      try {
        await this.session.close();
      } catch (n) {
        console.error("Error closing session during reset:", n), this.updateError(`Error closing session: ${n.message}`);
      }
      this.session = null;
    }
    this.selectedFile = null, this.systemInstructionFromFile = null, this.manualSystemInstruction = "", this.isFileProcessing = !1, this.isSessionInitialized = !1, this.instructionMode = "file";
    const r = this.shadowRoot?.getElementById("fileUpload");
    r && (r.value = "");
    const t = this.shadowRoot?.getElementById("manualInstructionTextarea");
    t && (t.value = ""), this.updateInitialStatus();
  }
  render() {
    const r = this.isRecording || this.isFileProcessing;
    return $e`
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
            ?disabled=${r || !this.isSessionInitialized}
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
              ?disabled=${r}
              title="Upload a file for system instructions">
              Upload File
            </button>
            <button 
              role="radio" 
              aria-checked=${this.instructionMode === "manual"}
              ?active=${this.instructionMode === "manual"}
              @click=${() => this.handleInstructionModeChange("manual")}
              ?disabled=${r}
              title="Type system instructions manually">
              Type Manually
            </button>
          </div>

          ${this.instructionMode === "file" ? $e`
            <div class="file-controls-container">
              <input 
                type="file" 
                id="fileUpload" 
                accept=".txt,text/plain" 
                @change=${this.handleFileChange}
                ?disabled=${r}
                aria-label="Select File for system instructions"
              />
              <button 
                id="processFileButton" 
                @click=${this.triggerFileProcessing} 
                ?disabled=${!this.selectedFile || r}
                title="Process selected file to extract system instructions">
                Process File
              </button>
            </div>
          ` : ""}

          ${this.instructionMode === "manual" ? $e`
            <div class="manual-input-container">
              <textarea 
                id="manualInstructionTextarea"
                .value=${this.manualSystemInstruction}
                @input=${this.handleManualInstructionInput}
                ?disabled=${r}
                placeholder="Type system instructions here..."
                aria-label="Textarea for manual system instructions"
              ></textarea>
              <button 
                id="applyManualInstructionButton" 
                @click=${this.applyManualInstructions} 
                ?disabled=${!this.manualSystemInstruction.trim() || r}
                title="Apply manually entered system instructions">
                Apply Manual Instructions
              </button>
            </div>
          ` : ""}
        </div>

        <div id="status" role="status" aria-live="polite">
         ${this.error ? $e`<strong>Error:</strong> ${this.error}` : this.status}
        </div>
        <gdm-live-audio-visuals-3d
          .inputNode=${this.inputNode}
          .outputNode=${this.outputNode}></gdm-live-audio-visuals-3d>
      </div>
    `;
  }
};
W.styles = Zt`
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
ie([
  le()
], W.prototype, "isRecording", 2);
ie([
  le()
], W.prototype, "status", 2);
ie([
  le()
], W.prototype, "error", 2);
ie([
  le()
], W.prototype, "selectedFile", 2);
ie([
  le()
], W.prototype, "systemInstructionFromFile", 2);
ie([
  le()
], W.prototype, "isFileProcessing", 2);
ie([
  le()
], W.prototype, "isSessionInitialized", 2);
ie([
  le()
], W.prototype, "instructionMode", 2);
ie([
  le()
], W.prototype, "manualSystemInstruction", 2);
ie([
  le()
], W.prototype, "inputNode", 2);
ie([
  le()
], W.prototype, "outputNode", 2);
W = ie([
  Xt("gdm-live-audio")
], W);
const ii = window.CONFIG?.apiKey, Gn = window.CONFIG?.model || "gemini-2.5-flash-preview-native-audio-dialog";
ii || console.error("API key not provided in CONFIG object");
const Zn = {
  imports: {
    lit: "https://esm.sh/lit@^3.3.0",
    "lit/": "https://esm.sh/lit@^3.3.0/",
    "@lit/context": "https://esm.sh/@lit/context@^1.1.5",
    three: "https://esm.sh/three@^0.176.0",
    "three/": "https://esm.sh/three@^0.176.0/"
  }
}, Ct = document.createElement("script");
Ct.type = "importmap";
Ct.textContent = JSON.stringify(Zn);
document.head.appendChild(Ct);
window.lit = { devMode: !1 };
const Wn = `
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
class Xn {
  constructor(t = {}) {
    this.config = {
      apiKey: t.apiKey || ii,
      model: t.model || Gn,
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
      const n = document.createElement("h3");
      n.className = "widget-title", n.textContent = "Interactive Document Widget";
      const o = document.createElement("button");
      o.className = "widget-close", o.textContent = "×", o.onclick = () => this.destroy(), t.appendChild(n), t.appendChild(o);
      const l = document.createElement("div");
      l.className = "interactive-document-widget";
      const u = document.createElement("style");
      u.textContent = Wn, document.head.appendChild(u), await this.initializeGdmLiveAudio(l), this.widgetContainer.appendChild(t), this.widgetContainer.appendChild(l), document.body.appendChild(this.overlay), document.body.appendChild(this.widgetContainer), console.log("Widget initialized with API key:", !!this.config.apiKey);
    } catch (t) {
      console.error("Failed to initialize widget:", t), this.handleError(t);
    }
  }
  async initializeGdmLiveAudio(t) {
    try {
      if (this.mainElement = new W(), this.mainElement.apiKey = this.config.apiKey, this.mainElement.model = this.config.model, !this.mainElement.apiKey)
        throw new Error("Failed to set API key on GdmLiveAudio component");
      t.appendChild(this.mainElement), console.log("GdmLiveAudio initialized successfully");
    } catch (n) {
      console.error("Failed to initialize GdmLiveAudio:", n), this.handleError(n);
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
      const n = document.createElement("div");
      n.className = "error-message", n.textContent = `Widget Error: ${t.message}`, this.widgetContainer.appendChild(n);
    }
  }
  // Cleanup method
  destroy() {
    this.mainElement && typeof this.mainElement.stopRecording == "function" && this.mainElement.stopRecording(), this.overlay && this.overlay.remove(), this.widgetContainer && this.widgetContainer.remove();
  }
}
typeof window < "u" && (window.openInteractiveDocumentWidget = function() {
  new Xn({
    width: "800px",
    height: "600px"
  });
});
export {
  Xn as InteractiveDocumentWidget
};
//# sourceMappingURL=widget.js.map
