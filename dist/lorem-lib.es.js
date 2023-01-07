/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = window, V = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, rt = Symbol(), K = /* @__PURE__ */ new WeakMap();
let dt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== rt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = K.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && K.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ct = (n) => new dt(typeof n == "string" ? n : n + "", void 0, rt), pt = (n, t) => {
  V ? n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), s = O.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  });
}, Z = V ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return ct(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var L;
const N = window, J = N.trustedTypes, ut = J ? J.emptyScript : "", F = N.reactiveElementPolyfillSupport, W = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? ut : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, ot = (n, t) => t !== n && (t == t || n == n), z = { attribute: !0, type: String, converter: W, reflect: !1, hasChanged: ot };
let f = class extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    this.finalize(), ((e = this.h) !== null && e !== void 0 ? e : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, i) => {
      const s = this._$Ep(i, e);
      s !== void 0 && (this._$Ev.set(s, i), t.push(s));
    }), t;
  }
  static createProperty(t, e = z) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(s) {
      const r = this[t];
      this[e] = s, this.requestUpdate(t, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || z;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const s of i)
        this.createProperty(s, e[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i)
        e.unshift(Z(s));
    } else
      t !== void 0 && e.push(Z(t));
    return e;
  }
  static _$Ep(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) === null || i === void 0 || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return pt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e, i = z) {
    var s;
    const r = this.constructor._$Ep(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const o = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : W).toAttribute(e, i.type);
      this._$El = t, o == null ? this.removeAttribute(r) : this.setAttribute(r, o), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const s = this.constructor, r = s._$Ev.get(t);
    if (r !== void 0 && this._$El !== r) {
      const o = s.getPropertyOptions(r), d = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((i = o.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? o.converter : W;
      this._$El = r, this[r] = d.fromAttribute(e, o.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let s = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || ot)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, r) => this[r] = s), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var r;
        return (r = s.hostUpdate) === null || r === void 0 ? void 0 : r.call(s);
      }), this.update(i)) : this._$Ek();
    } catch (s) {
      throw e = !1, this._$Ek(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) === null || s === void 0 ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, i) => this._$EO(i, this[i], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
f.finalized = !0, f.elementProperties = /* @__PURE__ */ new Map(), f.elementStyles = [], f.shadowRootOptions = { mode: "open" }, F == null || F({ ReactiveElement: f }), ((L = N.reactiveElementVersions) !== null && L !== void 0 ? L : N.reactiveElementVersions = []).push("1.5.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var j;
const k = window, m = k.trustedTypes, G = m ? m.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, v = `lit$${(Math.random() + "").slice(9)}$`, lt = "?" + v, $t = `<${lt}>`, y = document, w = (n = "") => y.createComment(n), x = (n) => n === null || typeof n != "object" && typeof n != "function", ht = Array.isArray, vt = (n) => ht(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", b = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Q = /-->/g, X = />/g, _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Y = /'/g, tt = /"/g, at = /^(?:script|style|textarea|title)$/i, _t = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), et = _t(1), A = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), it = /* @__PURE__ */ new WeakMap(), g = y.createTreeWalker(y, 129, null, !1), ft = (n, t) => {
  const e = n.length - 1, i = [];
  let s, r = t === 2 ? "<svg>" : "", o = b;
  for (let l = 0; l < e; l++) {
    const h = n[l];
    let $, a, c = -1, u = 0;
    for (; u < h.length && (o.lastIndex = u, a = o.exec(h), a !== null); )
      u = o.lastIndex, o === b ? a[1] === "!--" ? o = Q : a[1] !== void 0 ? o = X : a[2] !== void 0 ? (at.test(a[2]) && (s = RegExp("</" + a[2], "g")), o = _) : a[3] !== void 0 && (o = _) : o === _ ? a[0] === ">" ? (o = s ?? b, c = -1) : a[1] === void 0 ? c = -2 : (c = o.lastIndex - a[2].length, $ = a[1], o = a[3] === void 0 ? _ : a[3] === '"' ? tt : Y) : o === tt || o === Y ? o = _ : o === Q || o === X ? o = b : (o = _, s = void 0);
    const U = o === _ && n[l + 1].startsWith("/>") ? " " : "";
    r += o === b ? h + $t : c >= 0 ? (i.push($), h.slice(0, c) + "$lit$" + h.slice(c) + v + U) : h + v + (c === -2 ? (i.push(void 0), l) : U);
  }
  const d = r + (n[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [G !== void 0 ? G.createHTML(d) : d, i];
};
class C {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const d = t.length - 1, l = this.parts, [h, $] = ft(t, e);
    if (this.el = C.createElement(h, i), g.currentNode = this.el.content, e === 2) {
      const a = this.el.content, c = a.firstChild;
      c.remove(), a.append(...c.childNodes);
    }
    for (; (s = g.nextNode()) !== null && l.length < d; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const a = [];
          for (const c of s.getAttributeNames())
            if (c.endsWith("$lit$") || c.startsWith(v)) {
              const u = $[o++];
              if (a.push(c), u !== void 0) {
                const U = s.getAttribute(u.toLowerCase() + "$lit$").split(v), H = /([.?@])?(.*)/.exec(u);
                l.push({ type: 1, index: r, name: H[2], strings: U, ctor: H[1] === "." ? mt : H[1] === "?" ? At : H[1] === "@" ? Et : M });
              } else
                l.push({ type: 6, index: r });
            }
          for (const c of a)
            s.removeAttribute(c);
        }
        if (at.test(s.tagName)) {
          const a = s.textContent.split(v), c = a.length - 1;
          if (c > 0) {
            s.textContent = m ? m.emptyScript : "";
            for (let u = 0; u < c; u++)
              s.append(a[u], w()), g.nextNode(), l.push({ type: 2, index: ++r });
            s.append(a[c], w());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === lt)
          l.push({ type: 2, index: r });
        else {
          let a = -1;
          for (; (a = s.data.indexOf(v, a + 1)) !== -1; )
            l.push({ type: 7, index: r }), a += v.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const i = y.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(n, t, e = n, i) {
  var s, r, o, d;
  if (t === A)
    return t;
  let l = i !== void 0 ? (s = e._$Co) === null || s === void 0 ? void 0 : s[i] : e._$Cl;
  const h = x(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== h && ((r = l == null ? void 0 : l._$AO) === null || r === void 0 || r.call(l, !1), h === void 0 ? l = void 0 : (l = new h(n), l._$AT(n, e, i)), i !== void 0 ? ((o = (d = e)._$Co) !== null && o !== void 0 ? o : d._$Co = [])[i] = l : e._$Cl = l), l !== void 0 && (t = E(n, l._$AS(n, t.values), l, i)), t;
}
class gt {
  constructor(t, e) {
    this.u = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t) {
    var e;
    const { el: { content: i }, parts: s } = this._$AD, r = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : y).importNode(i, !0);
    g.currentNode = r;
    let o = g.nextNode(), d = 0, l = 0, h = s[0];
    for (; h !== void 0; ) {
      if (d === h.index) {
        let $;
        h.type === 2 ? $ = new T(o, o.nextSibling, this, t) : h.type === 1 ? $ = new h.ctor(o, h.name, h.strings, this, t) : h.type === 6 && ($ = new bt(o, this, t)), this.u.push($), h = s[++l];
      }
      d !== (h == null ? void 0 : h.index) && (o = g.nextNode(), d++);
    }
    return r;
  }
  p(t) {
    let e = 0;
    for (const i of this.u)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class T {
  constructor(t, e, i, s) {
    var r;
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$Cm = (r = s == null ? void 0 : s.isConnected) === null || r === void 0 || r;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$Cm;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), x(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== A && this.g(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : vt(t) ? this.k(t) : this.g(t);
  }
  O(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  g(t) {
    this._$AH !== p && x(this._$AH) ? this._$AA.nextSibling.data = t : this.T(y.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var e;
    const { values: i, _$litType$: s } = t, r = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = C.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === r)
      this._$AH.p(i);
    else {
      const o = new gt(r, this), d = o.v(this.options);
      o.p(i), this.T(d), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = it.get(t.strings);
    return e === void 0 && it.set(t.strings, e = new C(t)), e;
  }
  k(t) {
    ht(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const r of t)
      s === e.length ? e.push(i = new T(this.O(w()), this.O(w()), this, this.options)) : i = e[s], i._$AI(r), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cm = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class M {
  constructor(t, e, i, s, r) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = p;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      t = E(this, t, e, 0), o = !x(t) || t !== this._$AH && t !== A, o && (this._$AH = t);
    else {
      const d = t;
      let l, h;
      for (t = r[0], l = 0; l < r.length - 1; l++)
        h = E(this, d[i + l], e, l), h === A && (h = this._$AH[l]), o || (o = !x(h) || h !== this._$AH[l]), h === p ? t = p : t !== p && (t += (h ?? "") + r[l + 1]), this._$AH[l] = h;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class mt extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
const yt = m ? m.emptyScript : "";
class At extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== p ? this.element.setAttribute(this.name, yt) : this.element.removeAttribute(this.name);
  }
}
class Et extends M {
  constructor(t, e, i, s, r) {
    super(t, e, i, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = E(this, t, e, 0)) !== null && i !== void 0 ? i : p) === A)
      return;
    const s = this._$AH, r = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== p && (s === p || r);
    r && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class bt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const st = k.litHtmlPolyfillSupport;
st == null || st(C, T), ((j = k.litHtmlVersions) !== null && j !== void 0 ? j : k.litHtmlVersions = []).push("2.5.0");
const St = (n, t, e) => {
  var i, s;
  const r = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let o = r._$litPart$;
  if (o === void 0) {
    const d = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    r._$litPart$ = o = new T(t.insertBefore(w(), d), d, void 0, e ?? {});
  }
  return o._$AI(n), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var I, D;
class S extends f {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = St(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return A;
  }
}
S.finalized = !0, S._$litElement$ = !0, (I = globalThis.litElementHydrateSupport) === null || I === void 0 || I.call(globalThis, { LitElement: S });
const nt = globalThis.litElementPolyfillSupport;
nt == null || nt({ LitElement: S });
((D = globalThis.litElementVersions) !== null && D !== void 0 ? D : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = (n) => (t) => typeof t == "function" ? ((e, i) => (customElements.define(e, i), i))(n, t) : ((e, i) => {
  const { kind: s, elements: r } = i;
  return { kind: s, elements: r, finisher(o) {
    customElements.define(e, o);
  } };
})(n, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xt = (n, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, n);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, n);
} };
function q(n) {
  return (t, e) => e !== void 0 ? ((i, s, r) => {
    s.constructor.createProperty(r, i);
  })(n, t, e) : xt(n, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var B;
((B = window.HTMLSlotElement) === null || B === void 0 ? void 0 : B.prototype.assignedElements) != null;
const Ct = [
  "This",
  "text",
  "is",
  "an",
  "example",
  "of",
  "a",
  "text",
  "that",
  "can",
  "be",
  "replaced",
  "in",
  "the",
  "same",
  "space.",
  "This",
  "text",
  "was",
  "generated",
  "from",
  "the",
  "English",
  "text",
  "generator,",
  "where",
  "you",
  "can",
  "generate",
  "such",
  "text",
  "or",
  "many",
  "other",
  "texts",
  "in",
  "addition",
  "to",
  "increasing",
  "the",
  "number",
  "of",
  "characters",
  "generated",
  "by",
  "the",
  `application.
If`,
  "you",
  "need",
  "a",
  "larger",
  "number",
  "of",
  "paragraphs,",
  "the",
  "English",
  "text",
  "generator",
  "allows",
  "you",
  "to",
  "increase",
  "the",
  "number",
  "of",
  "paragraphs",
  "as",
  "you",
  "want,",
  "the",
  "text",
  "will",
  "not",
  "appear",
  "divided",
  "and",
  "does",
  "not",
  "contain",
  "language",
  "errors,",
  "the",
  "English",
  "text",
  "generator",
  "is",
  "useful",
  "for",
  "web",
  "designers",
  "in",
  "particular,",
  "where",
  "the",
  "customer",
  "often",
  "needs",
  "to",
  "see",
  "a",
  "real",
  "picture",
  "for",
  "site",
  `design.
Hence,`,
  "the",
  "designer",
  "must",
  "put",
  "temporary",
  "texts",
  "on",
  "the",
  "design",
  "to",
  "show",
  "the",
  "client",
  "the",
  "complete",
  "form.",
  "The",
  "role",
  "of",
  "the",
  "English",
  "text",
  "generator",
  "is",
  "to",
  "save",
  "the",
  "designer",
  "the",
  "trouble",
  "of",
  "searching",
  "for",
  "an",
  "alternative",
  "text",
  "that",
  "has",
  "nothing",
  "to",
  "do",
  "with",
  "the",
  "topic",
  "that",
  "the",
  "design",
  "is",
  "talking",
  "about,",
  "so",
  "it",
  "appears",
  "in",
  "an",
  "inappropriate",
  `manner.
This`,
  "text",
  "can",
  "be",
  "installed",
  "on",
  "any",
  "design",
  "without",
  "a",
  "problem,",
  "it",
  "will",
  "not",
  "look",
  "like",
  "a",
  "copied,",
  "disorganized,",
  "unformatted,",
  "or",
  "even",
  "incomprehensible",
  "text.",
  "Because",
  "it",
  "is",
  "still",
  "an",
  "alternative",
  "and",
  "temporary",
  "text."
], Pt = [
  "هذا",
  "النص",
  "هو",
  "مثال",
  "لنص",
  "يمكن",
  "أن",
  "يستبدل",
  "في",
  "نفس",
  "المساحة،",
  "لقد",
  "تم",
  "توليد",
  "هذا",
  "النص",
  "من",
  "مولد",
  "النص",
  "العربى،",
  "حيث",
  "يمكنك",
  "أن",
  "تولد",
  "مثل",
  "هذا",
  "النص",
  "أو",
  "العديد",
  "من",
  "النصوص",
  "الأخرى",
  "إضافة",
  "إلى",
  "زيادة",
  "عدد",
  "الحروف",
  "التى",
  "يولدها",
  `التطبيق.
إذا`,
  "كنت",
  "تحتاج",
  "إلى",
  "عدد",
  "أكبر",
  "من",
  "الفقرات",
  "يتيح",
  "لك",
  "مولد",
  "النص",
  "العربى",
  "زيادة",
  "عدد",
  "الفقرات",
  "كما",
  "تريد،",
  "النص",
  "لن",
  "يبدو",
  "مقسما",
  "ولا",
  "يحوي",
  "أخطاء",
  "لغوية،",
  "مولد",
  "النص",
  "العربى",
  "مفيد",
  "لمصممي",
  "المواقع",
  "على",
  "وجه",
  "الخصوص،",
  "حيث",
  "يحتاج",
  "العميل",
  "فى",
  "كثير",
  "من",
  "الأحيان",
  "أن",
  "يطلع",
  "على",
  "صورة",
  "حقيقية",
  "لتصميم",
  `الموقع.
ومن`,
  "هنا",
  "وجب",
  "على",
  "المصمم",
  "أن",
  "يضع",
  "نصوصا",
  "مؤقتة",
  "على",
  "التصميم",
  "ليظهر",
  "للعميل",
  "الشكل",
  "كاملاً،دور",
  "مولد",
  "النص",
  "العربى",
  "أن",
  "يوفر",
  "على",
  "المصمم",
  "عناء",
  "البحث",
  "عن",
  "نص",
  "بديل",
  "لا",
  "علاقة",
  "له",
  "بالموضوع",
  "الذى",
  "يتحدث",
  "عنه",
  "التصميم",
  "فيظهر",
  "بشكل",
  "لا",
  `يليق.
هذا`,
  "النص",
  "يمكن",
  "أن",
  "يتم",
  "تركيبه",
  "على",
  "أي",
  "تصميم",
  "دون",
  "مشكلة",
  "فلن",
  "يبدو",
  "وكأنه",
  "نص",
  "منسوخ،",
  "غير",
  "منظم،",
  "غير",
  "منسق،",
  "أو",
  "حتى",
  "غير",
  "مفهوم.",
  "لأنه",
  "مازال",
  "نصاً",
  "بديلاً",
  "ومؤقتاً."
];
var Tt = Object.defineProperty, Ut = Object.getOwnPropertyDescriptor, R = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Ut(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (s = (i ? o(t, e, s) : o(s)) || s);
  return i && s && Tt(t, e, s), s;
};
let P = class extends S {
  constructor() {
    super(...arguments), this.word = 5, this.paragraph = 1, this.language = "en";
  }
  generateLorem() {
    let n = this.language === "en" ? Ct : Pt, t = n[0], e = 0, i = () => (e += 1, e >= n.length && (e = 0), e);
    for (let s = 0; s < this.word - 1; s++)
      t += ` ${n[i()]}`;
    return t + ".";
  }
  render() {
    return et`<div dir="auto">
      ${Array(this.paragraph).fill("").map(() => et`<p>${this.generateLorem()}</p>`)}
    </div>`;
  }
};
R([
  q({ type: Number })
], P.prototype, "word", 2);
R([
  q({ type: Number })
], P.prototype, "paragraph", 2);
R([
  q({ type: String })
], P.prototype, "language", 2);
P = R([
  wt("tokyo-lorem")
], P);
export {
  P as TokyoLorem
};
