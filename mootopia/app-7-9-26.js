var e = Object.defineProperty;
var t = (t, n, i) => n in t ? e(t, n, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: i
}) : t[n] = i;
var n = (e, n, i) => t(e, typeof n != "symbol" ? n + "" : n, i);
(function () {
  "use strict";

  function e(e) {
    if (e.__esModule) {
      return e;
    }
    var t = e.default;
    if (typeof t == "function") {
      var n = function e() {
        if (this instanceof e) {
          return Reflect.construct(t, arguments, this.constructor);
        } else {
          return t.apply(this, arguments);
        }
      };
      n.prototype = t.prototype;
    } else {
      n = {};
    }
    Object.defineProperty(n, "__esModule", {
      value: true
    });
    Object.keys(e).forEach(function (t) {
      var i = Object.getOwnPropertyDescriptor(e, t);
      Object.defineProperty(n, t, i.get ? i : {
        enumerable: true,
        get: function () {
          return e[t];
        }
      });
    });
    return n;
  }
  const t = ["Object", "RegExp", "Date", "Error", "Map", "Set", "WeakMap", "WeakSet", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Promise", "URL", "HTMLElement", "Int8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array"];
  function i(e) {
    if (e === null) {
      return "null";
    }
    if (e === undefined) {
      return "undefined";
    }
    if (e === true || e === false) {
      return "boolean";
    }
    const n = typeof e;
    if (n === "string" || n === "number" || n === "bigint" || n === "symbol") {
      return n;
    }
    if (n === "function") {
      return "Function";
    }
    if (Array.isArray(e)) {
      return "Array";
    }
    if (e instanceof Uint8Array) {
      return "Uint8Array";
    }
    if (e.constructor === Object) {
      return "Object";
    }
    return function (e) {
      const n = Object.prototype.toString.call(e).slice(8, -1);
      if (t.includes(n)) {
        return n;
      }
    }(e) || "Object";
  }
  class r {
    constructor(e, t, n) {
      this.major = e;
      this.majorEncoded = e << 5;
      this.name = t;
      this.terminal = n;
    }
    toString() {
      return "Type[" + this.major + "]." + this.name;
    }
    compare(e) {
      if (this.major < e.major) {
        return -1;
      } else if (this.major > e.major) {
        return 1;
      } else {
        return 0;
      }
    }
    static equals(e, t) {
      return e === t || e.major === t.major && e.name === t.name;
    }
  }
  r.uint = new r(0, "uint", true);
  r.negint = new r(1, "negint", true);
  r.bytes = new r(2, "bytes", true);
  r.string = new r(3, "string", true);
  r.array = new r(4, "array", false);
  r.map = new r(5, "map", false);
  r.tag = new r(6, "tag", false);
  r.float = new r(7, "float", true);
  r.false = new r(7, "false", true);
  r.true = new r(7, "true", true);
  r.null = new r(7, "null", true);
  r.undefined = new r(7, "undefined", true);
  r.break = new r(7, "break", true);
  class a {
    constructor(e, t, n) {
      this.type = e;
      this.value = t;
      this.encodedLength = n;
      this.encodedBytes = undefined;
      this.byteValue = undefined;
    }
    toString() {
      return "Token[" + this.type + "]." + this.value;
    }
  }
  const s = globalThis.process && !globalThis.process.browser && globalThis.Buffer && typeof globalThis.Buffer.isBuffer == "function";
  const o = new TextEncoder();
  function l(e) {
    return s && globalThis.Buffer.isBuffer(e);
  }
  function c(e) {
    if (e instanceof Uint8Array) {
      if (l(e)) {
        return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
      } else {
        return e;
      }
    } else {
      return Uint8Array.from(e);
    }
  }
  const u = s ? e => e.length >= 24 ? globalThis.Buffer.from(e) : f(e) : e => e.length >= 200 ? o.encode(e) : f(e);
  const d = e => Uint8Array.from(e);
  const h = s ? (e, t, n) => l(e) ? new Uint8Array(e.subarray(t, n)) : e.slice(t, n) : (e, t, n) => e.slice(t, n);
  const p = s ? (e, t) => {
    e = e.map(e => e instanceof Uint8Array ? e : globalThis.Buffer.from(e));
    return c(globalThis.Buffer.concat(e, t));
  } : (e, t) => {
    const n = new Uint8Array(t);
    let i = 0;
    for (let t of e) {
      if (i + t.length > n.length) {
        t = t.subarray(0, n.length - i);
      }
      n.set(t, i);
      i += t.length;
    }
    return n;
  };
  const m = s ? e => globalThis.Buffer.allocUnsafe(e) : e => new Uint8Array(e);
  function f(e) {
    const t = [];
    let n = 0;
    for (let i = 0; i < e.length; i++) {
      let r = e.charCodeAt(i);
      if (r < 128) {
        t[n++] = r;
      } else if (r < 2048) {
        t[n++] = r >> 6 | 192;
        t[n++] = r & 63 | 128;
      } else if ((r & 64512) == 55296 && i + 1 < e.length && (e.charCodeAt(i + 1) & 64512) == 56320) {
        r = 65536 + ((r & 1023) << 10) + (e.charCodeAt(++i) & 1023);
        t[n++] = r >> 18 | 240;
        t[n++] = r >> 12 & 63 | 128;
        t[n++] = r >> 6 & 63 | 128;
        t[n++] = r & 63 | 128;
      } else {
        if (r >= 55296 && r <= 57343) {
          r = 65533;
        }
        t[n++] = r >> 12 | 224;
        t[n++] = r >> 6 & 63 | 128;
        t[n++] = r & 63 | 128;
      }
    }
    return t;
  }
  class g {
    constructor(e = 256) {
      this.chunkSize = e;
      this.cursor = 0;
      this.maxCursor = -1;
      this.chunks = [];
      this._initReuseChunk = null;
    }
    reset() {
      this.cursor = 0;
      this.maxCursor = -1;
      if (this.chunks.length) {
        this.chunks = [];
      }
      if (this._initReuseChunk !== null) {
        this.chunks.push(this._initReuseChunk);
        this.maxCursor = this._initReuseChunk.length - 1;
      }
    }
    push(e) {
      let t = this.chunks[this.chunks.length - 1];
      if (this.cursor + e.length <= this.maxCursor + 1) {
        const n = t.length - (this.maxCursor - this.cursor) - 1;
        t.set(e, n);
      } else {
        if (t) {
          const e = t.length - (this.maxCursor - this.cursor) - 1;
          if (e < t.length) {
            this.chunks[this.chunks.length - 1] = t.subarray(0, e);
            this.maxCursor = this.cursor - 1;
          }
        }
        if (e.length < 64 && e.length < this.chunkSize) {
          t = m(this.chunkSize);
          this.chunks.push(t);
          this.maxCursor += t.length;
          if (this._initReuseChunk === null) {
            this._initReuseChunk = t;
          }
          t.set(e, 0);
        } else {
          this.chunks.push(e);
          this.maxCursor += e.length;
        }
      }
      this.cursor += e.length;
    }
    toBytes(e = false) {
      let t;
      if (this.chunks.length === 1) {
        const n = this.chunks[0];
        if (e && this.cursor > n.length / 2) {
          t = this.cursor === n.length ? n : n.subarray(0, this.cursor);
          this._initReuseChunk = null;
          this.chunks = [];
        } else {
          t = h(n, 0, this.cursor);
        }
      } else {
        t = p(this.chunks, this.cursor);
      }
      if (e) {
        this.reset();
      }
      return t;
    }
  }
  class y {
    constructor(e) {
      this.dest = e;
      this.cursor = 0;
      this.chunks = [e];
    }
    reset() {
      this.cursor = 0;
    }
    push(e) {
      if (this.cursor + e.length > this.dest.length) {
        throw new Error("write out of bounds, destination buffer is too small");
      }
      this.dest.set(e, this.cursor);
      this.cursor += e.length;
    }
    toBytes(e = false) {
      const t = this.dest.subarray(0, this.cursor);
      if (e) {
        this.reset();
      }
      return t;
    }
  }
  const v = "CBOR decode error:";
  const b = "CBOR encode error:";
  function w(e, t, n) {
    if (e.length - t < n) {
      throw new Error(v + " not enough data for type");
    }
  }
  const k = [24, 256, 65536, 4294967296, BigInt("18446744073709551616")];
  function S(e, t, n) {
    w(e, t, 1);
    const i = e[t];
    if (n.strict === true && i < k[0]) {
      throw new Error(v + " integer encoded in more bytes than necessary (strict decode)");
    }
    return i;
  }
  function x(e, t, n) {
    w(e, t, 2);
    const i = e[t] << 8 | e[t + 1];
    if (n.strict === true && i < k[1]) {
      throw new Error(v + " integer encoded in more bytes than necessary (strict decode)");
    }
    return i;
  }
  function I(e, t, n) {
    w(e, t, 4);
    const i = e[t] * 16777216 + (e[t + 1] << 16) + (e[t + 2] << 8) + e[t + 3];
    if (n.strict === true && i < k[2]) {
      throw new Error(v + " integer encoded in more bytes than necessary (strict decode)");
    }
    return i;
  }
  function M(e, t, n) {
    w(e, t, 8);
    const i = e[t] * 16777216 + (e[t + 1] << 16) + (e[t + 2] << 8) + e[t + 3];
    const r = e[t + 4] * 16777216 + (e[t + 5] << 16) + (e[t + 6] << 8) + e[t + 7];
    const a = (BigInt(i) << BigInt(32)) + BigInt(r);
    if (n.strict === true && a < k[3]) {
      throw new Error(v + " integer encoded in more bytes than necessary (strict decode)");
    }
    if (a <= Number.MAX_SAFE_INTEGER) {
      return Number(a);
    }
    if (n.allowBigInt === true) {
      return a;
    }
    throw new Error(v + " integers outside of the safe integer range are not supported");
  }
  function E(e, t) {
    return P(e, 0, t.value);
  }
  function P(e, t, n) {
    if (n < k[0]) {
      const i = Number(n);
      e.push([t | i]);
    } else if (n < k[1]) {
      const i = Number(n);
      e.push([t | 24, i]);
    } else if (n < k[2]) {
      const i = Number(n);
      e.push([t | 25, i >>> 8, i & 255]);
    } else if (n < k[3]) {
      const i = Number(n);
      e.push([t | 26, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, i & 255]);
    } else {
      const i = BigInt(n);
      if (!(i < k[4])) {
        throw new Error(v + " encountered BigInt larger than allowable range");
      }
      {
        const n = [t | 27, 0, 0, 0, 0, 0, 0, 0];
        let r = Number(i & BigInt(4294967295));
        let a = Number(i >> BigInt(32) & BigInt(4294967295));
        n[8] = r & 255;
        r >>= 8;
        n[7] = r & 255;
        r >>= 8;
        n[6] = r & 255;
        r >>= 8;
        n[5] = r & 255;
        n[4] = a & 255;
        a >>= 8;
        n[3] = a & 255;
        a >>= 8;
        n[2] = a & 255;
        a >>= 8;
        n[1] = a & 255;
        e.push(n);
      }
    }
  }
  E.encodedSize = function (e) {
    return P.encodedSize(e.value);
  };
  P.encodedSize = function (e) {
    if (e < k[0]) {
      return 1;
    } else if (e < k[1]) {
      return 2;
    } else if (e < k[2]) {
      return 3;
    } else if (e < k[3]) {
      return 5;
    } else {
      return 9;
    }
  };
  E.compareTokens = function (e, t) {
    if (e.value < t.value) {
      return -1;
    } else if (e.value > t.value) {
      return 1;
    } else {
      return 0;
    }
  };
  const T = BigInt(-1);
  const A = BigInt(1);
  function C(e, t) {
    const n = t.value;
    const i = typeof n == "bigint" ? n * T - A : n * -1 - 1;
    P(e, t.type.majorEncoded, i);
  }
  function _(e, t, n, i) {
    w(e, t, n + i);
    const s = e.slice(t + n, t + n + i);
    return new a(r.bytes, s, n + i);
  }
  function R(e, t, n, i) {
    return _(e, t, 1, n);
  }
  function B(e) {
    if (e.encodedBytes === undefined) {
      e.encodedBytes = r.equals(e.type, r.string) ? u(e.value) : e.value;
    }
    return e.encodedBytes;
  }
  function L(e, t) {
    const n = B(t);
    P(e, t.type.majorEncoded, n.length);
    e.push(n);
  }
  C.encodedSize = function (e) {
    const t = e.value;
    const n = typeof t == "bigint" ? t * T - A : t * -1 - 1;
    if (n < k[0]) {
      return 1;
    } else if (n < k[1]) {
      return 2;
    } else if (n < k[2]) {
      return 3;
    } else if (n < k[3]) {
      return 5;
    } else {
      return 9;
    }
  };
  C.compareTokens = function (e, t) {
    if (e.value < t.value) {
      return 1;
    } else if (e.value > t.value) {
      return -1;
    } else {
      return 0;
    }
  };
  L.encodedSize = function (e) {
    const t = B(e);
    return P.encodedSize(t.length) + t.length;
  };
  L.compareTokens = function (e, t) {
    n = B(e);
    i = B(t);
    if (n.length < i.length) {
      return -1;
    } else if (n.length > i.length) {
      return 1;
    } else {
      return function (e, t) {
        if (l(e) && l(t)) {
          return e.compare(t);
        }
        for (let n = 0; n < e.length; n++) {
          if (e[n] !== t[n]) {
            if (e[n] < t[n]) {
              return -1;
            } else {
              return 1;
            }
          }
        }
        return 0;
      }(n, i);
    }
    var n;
    var i;
  };
  const O = new TextDecoder();
  function D(e, t, n, i, s) {
    const o = n + i;
    w(e, t, o);
    const l = new a(r.string, function (e, t, n) {
      if (n - t < 32) {
        let i = "";
        for (let r = t; r < n; r++) {
          const a = e[r];
          if (a & 128) {
            return O.decode(e.subarray(t, n));
          }
          i += String.fromCharCode(a);
        }
        return i;
      }
      return O.decode(e.subarray(t, n));
    }(e, t + n, t + o), o);
    if (s.retainStringBytes === true) {
      l.byteValue = e.slice(t + n, t + o);
    }
    return l;
  }
  function N(e, t, n, i) {
    return D(e, t, 1, n, i);
  }
  const F = L;
  function H(e, t, n, i) {
    return new a(r.array, i, n);
  }
  function j(e, t, n, i) {
    return H(0, 0, 1, n);
  }
  function z(e, t) {
    P(e, r.array.majorEncoded, t.value);
  }
  function V(e, t, n, i) {
    return new a(r.map, i, n);
  }
  function W(e, t, n, i) {
    return V(0, 0, 1, n);
  }
  function U(e, t) {
    P(e, r.map.majorEncoded, t.value);
  }
  function G(e, t, n, i) {
    return new a(r.tag, n, 1);
  }
  function Y(e, t) {
    P(e, r.tag.majorEncoded, t.value);
  }
  function X(e, t, n) {
    if (n) {
      if (n.allowNaN === false && Number.isNaN(e)) {
        throw new Error(v + " NaN values are not supported");
      }
      if (n.allowInfinity === false && (e === Infinity || e === -Infinity)) {
        throw new Error(v + " Infinity values are not supported");
      }
    }
    return new a(r.float, e, t);
  }
  function q(e, t, n) {
    const i = t.value;
    if (i === false) {
      e.push([r.float.majorEncoded | 20]);
    } else if (i === true) {
      e.push([r.float.majorEncoded | 21]);
    } else if (i === null) {
      e.push([r.float.majorEncoded | 22]);
    } else if (i === undefined) {
      e.push([r.float.majorEncoded | 23]);
    } else {
      let t;
      let r = false;
      if (!n || n.float64 !== true) {
        Q(i);
        t = $(Z, 1);
        if (i === t || Number.isNaN(i)) {
          Z[0] = 249;
          e.push(Z.slice(0, 3));
          r = true;
        } else {
          ee(i);
          t = te(Z, 1);
          if (i === t) {
            Z[0] = 250;
            e.push(Z.slice(0, 5));
            r = true;
          }
        }
      }
      if (!r) {
        a = i;
        J.setFloat64(0, a, false);
        t = ne(Z, 1);
        Z[0] = 251;
        e.push(Z.slice(0, 9));
      }
    }
    var a;
  }
  z.compareTokens = E.compareTokens;
  z.encodedSize = function (e) {
    return P.encodedSize(e.value);
  };
  U.compareTokens = E.compareTokens;
  U.encodedSize = function (e) {
    return P.encodedSize(e.value);
  };
  Y.compareTokens = E.compareTokens;
  Y.encodedSize = function (e) {
    return P.encodedSize(e.value);
  };
  q.encodedSize = function (e, t) {
    const n = e.value;
    if (n === false || n === true || n == null) {
      return 1;
    }
    if (!t || t.float64 !== true) {
      Q(n);
      let e = $(Z, 1);
      if (n === e || Number.isNaN(n)) {
        return 3;
      }
      ee(n);
      e = te(Z, 1);
      if (n === e) {
        return 5;
      }
    }
    return 9;
  };
  const K = new ArrayBuffer(9);
  const J = new DataView(K, 1);
  const Z = new Uint8Array(K, 0);
  function Q(e) {
    if (e === Infinity) {
      J.setUint16(0, 31744, false);
    } else if (e === -Infinity) {
      J.setUint16(0, 64512, false);
    } else if (Number.isNaN(e)) {
      J.setUint16(0, 32256, false);
    } else {
      J.setFloat32(0, e);
      const t = J.getUint32(0);
      const n = (t & 2139095040) >> 23;
      const i = t & 8388607;
      if (n === 255) {
        J.setUint16(0, 31744, false);
      } else if (n === 0) {
        J.setUint16(0, (e & -2147483648) >> 16 | i >> 13, false);
      } else {
        const e = n - 127;
        if (e < -24) {
          J.setUint16(0, 0);
        } else if (e < -14) {
          J.setUint16(0, (t & -2147483648) >> 16 | 1 << 24 + e, false);
        } else {
          J.setUint16(0, (t & -2147483648) >> 16 | e + 15 << 10 | i >> 13, false);
        }
      }
    }
  }
  function $(e, t) {
    if (e.length - t < 2) {
      throw new Error(v + " not enough data for float16");
    }
    const n = (e[t] << 8) + e[t + 1];
    if (n === 31744) {
      return Infinity;
    }
    if (n === 64512) {
      return -Infinity;
    }
    if (n === 32256) {
      return NaN;
    }
    const i = n >> 10 & 31;
    const r = n & 1023;
    let a;
    a = i === 0 ? r * 5.960464477539063e-8 : i !== 31 ? (r + 1024) * 2 ** (i - 25) : r === 0 ? Infinity : NaN;
    if (n & 32768) {
      return -a;
    } else {
      return a;
    }
  }
  function ee(e) {
    J.setFloat32(0, e, false);
  }
  function te(e, t) {
    if (e.length - t < 4) {
      throw new Error(v + " not enough data for float32");
    }
    const n = (e.byteOffset || 0) + t;
    return new DataView(e.buffer, n, 4).getFloat32(0, false);
  }
  function ne(e, t) {
    if (e.length - t < 8) {
      throw new Error(v + " not enough data for float64");
    }
    const n = (e.byteOffset || 0) + t;
    return new DataView(e.buffer, n, 8).getFloat64(0, false);
  }
  function ie(e, t, n) {
    throw new Error(v + " encountered invalid minor (" + n + ") for major " + (e[t] >>> 5));
  }
  function re(e) {
    return () => {
      throw new Error(v + " " + e);
    };
  }
  q.compareTokens = E.compareTokens;
  const ae = [];
  for (let e = 0; e <= 23; e++) {
    ae[e] = ie;
  }
  ae[24] = function (e, t, n, i) {
    return new a(r.uint, S(e, t + 1, i), 2);
  };
  ae[25] = function (e, t, n, i) {
    return new a(r.uint, x(e, t + 1, i), 3);
  };
  ae[26] = function (e, t, n, i) {
    return new a(r.uint, I(e, t + 1, i), 5);
  };
  ae[27] = function (e, t, n, i) {
    return new a(r.uint, M(e, t + 1, i), 9);
  };
  ae[28] = ie;
  ae[29] = ie;
  ae[30] = ie;
  ae[31] = ie;
  for (let e = 32; e <= 55; e++) {
    ae[e] = ie;
  }
  ae[56] = function (e, t, n, i) {
    return new a(r.negint, -1 - S(e, t + 1, i), 2);
  };
  ae[57] = function (e, t, n, i) {
    return new a(r.negint, -1 - x(e, t + 1, i), 3);
  };
  ae[58] = function (e, t, n, i) {
    return new a(r.negint, -1 - I(e, t + 1, i), 5);
  };
  ae[59] = function (e, t, n, i) {
    const s = M(e, t + 1, i);
    if (typeof s != "bigint") {
      const e = -1 - s;
      if (e >= Number.MIN_SAFE_INTEGER) {
        return new a(r.negint, e, 9);
      }
    }
    if (i.allowBigInt !== true) {
      throw new Error(v + " integers outside of the safe integer range are not supported");
    }
    return new a(r.negint, T - BigInt(s), 9);
  };
  ae[60] = ie;
  ae[61] = ie;
  ae[62] = ie;
  ae[63] = ie;
  for (let e = 64; e <= 87; e++) {
    ae[e] = R;
  }
  ae[88] = function (e, t, n, i) {
    return _(e, t, 2, S(e, t + 1, i));
  };
  ae[89] = function (e, t, n, i) {
    return _(e, t, 3, x(e, t + 1, i));
  };
  ae[90] = function (e, t, n, i) {
    return _(e, t, 5, I(e, t + 1, i));
  };
  ae[91] = function (e, t, n, i) {
    const r = M(e, t + 1, i);
    if (typeof r == "bigint") {
      throw new Error(v + " 64-bit integer bytes lengths not supported");
    }
    return _(e, t, 9, r);
  };
  ae[92] = ie;
  ae[93] = ie;
  ae[94] = ie;
  ae[95] = re("indefinite length bytes/strings are not supported");
  for (let e = 96; e <= 119; e++) {
    ae[e] = N;
  }
  ae[120] = function (e, t, n, i) {
    return D(e, t, 2, S(e, t + 1, i), i);
  };
  ae[121] = function (e, t, n, i) {
    return D(e, t, 3, x(e, t + 1, i), i);
  };
  ae[122] = function (e, t, n, i) {
    return D(e, t, 5, I(e, t + 1, i), i);
  };
  ae[123] = function (e, t, n, i) {
    const r = M(e, t + 1, i);
    if (typeof r == "bigint") {
      throw new Error(v + " 64-bit integer string lengths not supported");
    }
    return D(e, t, 9, r, i);
  };
  ae[124] = ie;
  ae[125] = ie;
  ae[126] = ie;
  ae[127] = re("indefinite length bytes/strings are not supported");
  for (let e = 128; e <= 151; e++) {
    ae[e] = j;
  }
  ae[152] = function (e, t, n, i) {
    return H(0, 0, 2, S(e, t + 1, i));
  };
  ae[153] = function (e, t, n, i) {
    return H(0, 0, 3, x(e, t + 1, i));
  };
  ae[154] = function (e, t, n, i) {
    return H(0, 0, 5, I(e, t + 1, i));
  };
  ae[155] = function (e, t, n, i) {
    const r = M(e, t + 1, i);
    if (typeof r == "bigint") {
      throw new Error(v + " 64-bit integer array lengths not supported");
    }
    return H(0, 0, 9, r);
  };
  ae[156] = ie;
  ae[157] = ie;
  ae[158] = ie;
  ae[159] = function (e, t, n, i) {
    if (i.allowIndefinite === false) {
      throw new Error(v + " indefinite length items not allowed");
    }
    return H(0, 0, 1, Infinity);
  };
  for (let e = 160; e <= 183; e++) {
    ae[e] = W;
  }
  ae[184] = function (e, t, n, i) {
    return V(0, 0, 2, S(e, t + 1, i));
  };
  ae[185] = function (e, t, n, i) {
    return V(0, 0, 3, x(e, t + 1, i));
  };
  ae[186] = function (e, t, n, i) {
    return V(0, 0, 5, I(e, t + 1, i));
  };
  ae[187] = function (e, t, n, i) {
    const r = M(e, t + 1, i);
    if (typeof r == "bigint") {
      throw new Error(v + " 64-bit integer map lengths not supported");
    }
    return V(0, 0, 9, r);
  };
  ae[188] = ie;
  ae[189] = ie;
  ae[190] = ie;
  ae[191] = function (e, t, n, i) {
    if (i.allowIndefinite === false) {
      throw new Error(v + " indefinite length items not allowed");
    }
    return V(0, 0, 1, Infinity);
  };
  for (let e = 192; e <= 215; e++) {
    ae[e] = G;
  }
  ae[216] = function (e, t, n, i) {
    return new a(r.tag, S(e, t + 1, i), 2);
  };
  ae[217] = function (e, t, n, i) {
    return new a(r.tag, x(e, t + 1, i), 3);
  };
  ae[218] = function (e, t, n, i) {
    return new a(r.tag, I(e, t + 1, i), 5);
  };
  ae[219] = function (e, t, n, i) {
    return new a(r.tag, M(e, t + 1, i), 9);
  };
  ae[220] = ie;
  ae[221] = ie;
  ae[222] = ie;
  ae[223] = ie;
  for (let e = 224; e <= 243; e++) {
    ae[e] = re("simple values are not supported");
  }
  ae[244] = ie;
  ae[245] = ie;
  ae[246] = ie;
  ae[247] = function (e, t, n, i) {
    if (i.allowUndefined === false) {
      throw new Error(v + " undefined values are not supported");
    }
    if (i.coerceUndefinedToNull === true) {
      return new a(r.null, null, 1);
    } else {
      return new a(r.undefined, undefined, 1);
    }
  };
  ae[248] = re("simple values are not supported");
  ae[249] = function (e, t, n, i) {
    return X($(e, t + 1), 3, i);
  };
  ae[250] = function (e, t, n, i) {
    return X(te(e, t + 1), 5, i);
  };
  ae[251] = function (e, t, n, i) {
    return X(ne(e, t + 1), 9, i);
  };
  ae[252] = ie;
  ae[253] = ie;
  ae[254] = ie;
  ae[255] = function (e, t, n, i) {
    if (i.allowIndefinite === false) {
      throw new Error(v + " indefinite length items not allowed");
    }
    return new a(r.break, undefined, 1);
  };
  const se = [];
  for (let e = 0; e < 24; e++) {
    se[e] = new a(r.uint, e, 1);
  }
  for (let e = -1; e >= -24; e--) {
    se[31 - e] = new a(r.negint, e, 1);
  }
  se[64] = new a(r.bytes, new Uint8Array(0), 1);
  se[96] = new a(r.string, "", 1);
  se[128] = new a(r.array, 0, 1);
  se[160] = new a(r.map, 0, 1);
  se[244] = new a(r.false, false, 1);
  se[245] = new a(r.true, true, 1);
  se[246] = new a(r.null, null, 1);
  const oe = {
    float64: false,
    mapSorter: function (e, t) {
      const n = Array.isArray(e[0]) ? e[0][0] : e[0];
      const i = Array.isArray(t[0]) ? t[0][0] : t[0];
      if (n.type !== i.type) {
        return n.type.compare(i.type);
      }
      const r = n.type.major;
      return le[r].compareTokens(n, i);
    },
    quickEncodeToken: function (e) {
      switch (e.type) {
        case r.false:
          return d([244]);
        case r.true:
          return d([245]);
        case r.null:
          return d([246]);
        case r.bytes:
          if (e.value.length) {
            return undefined;
          } else {
            return d([64]);
          }
        case r.string:
          if (e.value === "") {
            return d([96]);
          } else {
            return undefined;
          }
        case r.array:
          if (e.value === 0) {
            return d([128]);
          } else {
            return undefined;
          }
        case r.map:
          if (e.value === 0) {
            return d([160]);
          } else {
            return undefined;
          }
        case r.uint:
          if (e.value < 24) {
            return d([Number(e.value)]);
          } else {
            return undefined;
          }
        case r.negint:
          if (e.value >= -24) {
            return d([31 - Number(e.value)]);
          }
      }
    }
  };
  const le = function () {
    const e = [];
    e[r.uint.major] = E;
    e[r.negint.major] = C;
    e[r.bytes.major] = L;
    e[r.string.major] = F;
    e[r.array.major] = z;
    e[r.map.major] = U;
    e[r.tag.major] = Y;
    e[r.float.major] = q;
    return e;
  }();
  const ce = new g();
  class ue {
    constructor(e, t) {
      this.obj = e;
      this.parent = t;
    }
    includes(e) {
      let t = this;
      do {
        if (t.obj === e) {
          return true;
        }
      } while (t = t.parent);
      return false;
    }
    static createCheck(e, t) {
      if (e && e.includes(t)) {
        throw new Error(b + " object contains circular references");
      }
      return new ue(t, e);
    }
  }
  const de = {
    null: new a(r.null, null),
    undefined: new a(r.undefined, undefined),
    true: new a(r.true, true),
    false: new a(r.false, false),
    emptyArray: new a(r.array, 0),
    emptyMap: new a(r.map, 0)
  };
  const he = {
    number: (e, t, n, i) => Number.isInteger(e) && Number.isSafeInteger(e) ? new a(e >= 0 ? r.uint : r.negint, e) : new a(r.float, e),
    bigint: (e, t, n, i) => e >= BigInt(0) ? new a(r.uint, e) : new a(r.negint, e),
    Uint8Array: (e, t, n, i) => new a(r.bytes, e),
    string: (e, t, n, i) => new a(r.string, e),
    boolean: (e, t, n, i) => e ? de.true : de.false,
    null: (e, t, n, i) => de.null,
    undefined: (e, t, n, i) => de.undefined,
    ArrayBuffer: (e, t, n, i) => new a(r.bytes, new Uint8Array(e)),
    DataView: (e, t, n, i) => new a(r.bytes, new Uint8Array(e.buffer, e.byteOffset, e.byteLength)),
    Array(e, t, n, i) {
      if (!e.length) {
        if (n.addBreakTokens === true) {
          return [de.emptyArray, new a(r.break)];
        } else {
          return de.emptyArray;
        }
      }
      i = ue.createCheck(i, e);
      const s = [];
      let o = 0;
      for (const t of e) {
        s[o++] = pe(t, n, i);
      }
      if (n.addBreakTokens) {
        return [new a(r.array, e.length), s, new a(r.break)];
      } else {
        return [new a(r.array, e.length), s];
      }
    },
    Object(e, t, n, i) {
      const s = t !== "Object";
      const o = s ? e.keys() : Object.keys(e);
      const l = s ? e.size : o.length;
      let c;
      if (l) {
        c = new Array(l);
        i = ue.createCheck(i, e);
        const t = !s && n.ignoreUndefinedProperties;
        let r = 0;
        for (const a of o) {
          const o = s ? e.get(a) : e[a];
          if (!t || o !== undefined) {
            c[r++] = [pe(a, n, i), pe(o, n, i)];
          }
        }
        if (r < l) {
          c.length = r;
        }
      }
      if (c == null ? undefined : c.length) {
        u = c;
        if ((d = n).mapSorter) {
          u.sort(d.mapSorter);
        }
        if (n.addBreakTokens) {
          return [new a(r.map, c.length), c, new a(r.break)];
        } else {
          return [new a(r.map, c.length), c];
        }
      } else if (n.addBreakTokens === true) {
        return [de.emptyMap, new a(r.break)];
      } else {
        return de.emptyMap;
      }
      var u;
      var d;
    }
  };
  he.Map = he.Object;
  he.Buffer = he.Uint8Array;
  for (const e of "Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64".split(" ")) {
    he[e + "Array"] = he.DataView;
  }
  function pe(e, t = {}, n) {
    const r = i(e);
    const a = t && t.typeEncoders && t.typeEncoders[r] || he[r];
    if (typeof a == "function") {
      const i = a(e, r, t, n);
      if (i != null) {
        return i;
      }
    }
    const s = he[r];
    if (!s) {
      throw new Error(b + " unsupported type: " + r);
    }
    return s(e, r, t, n);
  }
  function me(e, t, n, i) {
    if (Array.isArray(t)) {
      for (const r of t) {
        me(e, r, n, i);
      }
    } else {
      n[t.type.major](e, t, i);
    }
  }
  const fe = r.uint.majorEncoded;
  const ge = r.negint.majorEncoded;
  const ye = r.bytes.majorEncoded;
  const ve = r.string.majorEncoded;
  const be = r.array.majorEncoded;
  const we = r.float.majorEncoded | 20;
  const ke = r.float.majorEncoded | 21;
  const Se = r.float.majorEncoded | 22;
  const xe = r.float.majorEncoded | 23;
  const Ie = BigInt(-1);
  const Me = BigInt(1);
  function Ee(e, t, n, s) {
    const o = i(t);
    const l = n.typeEncoders && n.typeEncoders[o];
    if (l) {
      const i = l(t, o, n, s);
      if (i != null) {
        me(e, i, le, n);
        return;
      }
    }
    switch (o) {
      case "null":
        e.push([Se]);
        return;
      case "undefined":
        e.push([xe]);
        return;
      case "boolean":
        e.push([t ? ke : we]);
        return;
      case "number":
        if (Number.isInteger(t) && Number.isSafeInteger(t)) {
          if (t >= 0) {
            P(e, fe, t);
          } else {
            P(e, ge, t * -1 - 1);
          }
        } else {
          q(e, new a(r.float, t), n);
        }
        return;
      case "bigint":
        if (t >= BigInt(0)) {
          P(e, fe, t);
        } else {
          P(e, ge, t * Ie - Me);
        }
        return;
      case "string":
        {
          const n = u(t);
          P(e, ve, n.length);
          e.push(n);
          return;
        }
      case "Uint8Array":
        P(e, ye, t.length);
        e.push(t);
        return;
      case "Array":
        if (!t.length) {
          e.push([be]);
          return;
        }
        s = ue.createCheck(s, t);
        P(e, be, t.length);
        for (const i of t) {
          Ee(e, i, n, s);
        }
        return;
      case "Object":
      case "Map":
        me(e, he.Object(t, o, n, s), le, n);
        return;
      default:
        {
          const i = he[o];
          if (!i) {
            throw new Error(b + " unsupported type: " + o);
          }
          me(e, i(t, o, n, s), le, n);
        }
    }
  }
  function Pe(e, t) {
    if ((t = Object.assign({}, oe, t)).addBreakTokens !== true) {
      ce.reset();
      Ee(ce, e, t, undefined);
      return ce.toBytes(true);
    } else {
      return function (e, t, n, i) {
        const r = i instanceof Uint8Array;
        let a = r ? new y(i) : ce;
        const s = pe(e, n);
        if (!Array.isArray(s) && n.quickEncodeToken) {
          const e = n.quickEncodeToken(s);
          if (e) {
            if (r) {
              a.push(e);
              return a.toBytes();
            } else {
              return e;
            }
          }
          const i = t[s.type.major];
          if (i.encodedSize) {
            const e = i.encodedSize(s, n);
            if (!r) {
              a = new g(e);
            }
            i(a, s, n);
            if (a.chunks.length !== 1) {
              throw new Error("Unexpected error: pre-calculated length for " + s + " was wrong");
            }
            if (r) {
              return a.toBytes();
            } else {
              return c(a.chunks[0]);
            }
          }
        }
        a.reset();
        me(a, s, t, n);
        return a.toBytes(true);
      }(e, le, t);
    }
  }
  const Te = {
    strict: false,
    allowIndefinite: true,
    allowUndefined: true,
    allowBigInt: true
  };
  class Ae {
    constructor(e, t = {}) {
      this._pos = 0;
      this.data = e;
      this.options = t;
    }
    pos() {
      return this._pos;
    }
    done() {
      return this._pos >= this.data.length;
    }
    next() {
      const e = this.data[this._pos];
      let t = se[e];
      if (t === undefined) {
        const n = ae[e];
        if (!n) {
          throw new Error(v + " no decoder for major type " + (e >>> 5) + " (byte 0x" + e.toString(16).padStart(2, "0") + ")");
        }
        const i = e & 31;
        t = n(this.data, this._pos, i, this.options);
      }
      this._pos += t.encodedLength;
      return t;
    }
  }
  const Ce = Symbol.for("DONE");
  const _e = Symbol.for("BREAK");
  function Re(e, t) {
    if (e.done()) {
      return Ce;
    }
    const n = e.next();
    if (r.equals(n.type, r.break)) {
      return _e;
    }
    if (n.type.terminal) {
      return n.value;
    }
    if (r.equals(n.type, r.array)) {
      return function (e, t, n) {
        const i = [];
        for (let r = 0; r < e.value; r++) {
          const a = Re(t, n);
          if (a === _e) {
            if (e.value === Infinity) {
              break;
            }
            throw new Error(v + " got unexpected break to lengthed array");
          }
          if (a === Ce) {
            throw new Error(v + " found array but not enough entries (got " + r + ", expected " + e.value + ")");
          }
          i[r] = a;
        }
        return i;
      }(n, e, t);
    }
    if (r.equals(n.type, r.map)) {
      return function (e, t, n) {
        const i = n.useMaps === true;
        const r = n.rejectDuplicateMapKeys === true;
        const a = i ? undefined : {};
        const s = i ? new Map() : undefined;
        for (let o = 0; o < e.value; o++) {
          const l = Re(t, n);
          if (l === _e) {
            if (e.value === Infinity) {
              break;
            }
            throw new Error(v + " got unexpected break to lengthed map");
          }
          if (l === Ce) {
            throw new Error(v + " found map but not enough entries (got " + o + " [no key], expected " + e.value + ")");
          }
          if (!i && typeof l != "string") {
            throw new Error(v + " non-string keys not supported (got " + typeof l + ")");
          }
          if (r && (i && s.has(l) || !i && Object.hasOwn(a, l))) {
            throw new Error(v + " found repeat map key \"" + l + "\"");
          }
          const c = Re(t, n);
          if (c === Ce) {
            throw new Error(v + " found map but not enough entries (got " + o + " [no value], expected " + e.value + ")");
          }
          if (i) {
            s.set(l, c);
          } else {
            a[l] = c;
          }
        }
        if (i) {
          return s;
        } else {
          return a;
        }
      }(n, e, t);
    }
    if (r.equals(n.type, r.tag)) {
      if (t.tags && typeof t.tags[n.value] == "function") {
        const i = Re(e, t);
        return t.tags[n.value](i);
      }
      throw new Error(v + " tag not supported (" + n.value + ")");
    }
    throw new Error("unsupported");
  }
  function Be(e, t) {
    const [n, i] = function (e, t) {
      if (!(e instanceof Uint8Array)) {
        throw new Error(v + " data to decode must be a Uint8Array");
      }
      t = Object.assign({}, Te, t);
      const n = c(e);
      const i = t.tokenizer || new Ae(n, t);
      const r = Re(i, t);
      if (r === Ce) {
        throw new Error(v + " did not find any content to decode");
      }
      if (r === _e) {
        throw new Error(v + " got unexpected break");
      }
      return [r, e.subarray(i.pos())];
    }(e, t);
    if (i.length > 0) {
      throw new Error(v + " too many terminals, data makes no sense");
    }
    return n;
  }
  const Le = e => Number(e) >>> 0;
  const Oe = 1374858269;
  const De = 399526757;
  const Ne = 2147483647;
  const Fe = Object.freeze({
    INIT_DATA: 0,
    DISCONNECT: 1,
    SETUP_GAME: 2,
    ADD_PLAYER: 3,
    REMOVE_PLAYER: 4,
    UPDATE_PLAYERS: 5,
    UPDATE_LEADERBOARD: 6,
    LOAD_GAME_OBJECT: 7,
    LOAD_ANIMALS: 8,
    ANIMATE_ANIMAL: 9,
    GATHER_ANIMATION: 10,
    WIGGLE_GAME_OBJECT: 11,
    SHOOT_TURRET: 12,
    UPDATE_PLAYER_VALUE: 13,
    UPDATE_HEALTH: 14,
    KILL_PLAYER: 15,
    KILL_OBJECT: 16,
    KILL_OBJECTS: 17,
    UPDATE_ITEM_COUNTS: 18,
    UPDATE_AGE: 19,
    UPDATE_UPGRADES: 20,
    UPDATE_ITEMS: 21,
    ADD_PROJECTILE: 22,
    REMOVE_PROJECTILE: 23,
    SERVER_SHUTDOWN_NOTICE: 24,
    ADD_ALLIANCE: 25,
    DELETE_ALLIANCE: 26,
    ALLIANCE_NOTIFICATION: 27,
    SET_PLAYER_TEAM: 28,
    SET_ALLIANCE_PLAYERS: 29,
    UPDATE_STORE_ITEMS: 30,
    RECEIVE_CHAT: 31,
    UPDATE_MINIMAP: 32,
    SHOW_TEXT: 33,
    PING_MAP: 34,
    PING_SOCKET_RESPONSE: 35,
    ONE_VS_ONE_STATE: 36,
    ONE_VS_ONE_RESULT: 37,
    SPECTATE_INIT: 38,
    SPECTATE_LIST: 39,
    SPECTATE_TARGET: 40,
    SPECTATE_ERROR: 41,
    SPECTATE_WATCHERS: 42,
    SPECTATE_CHAT: 43,
    ADMIN_STATE: 44,
    ADMIN_FEED: 45,
    ADMIN_RESULT: 46
  });
  const He = Object.freeze({
    CLAN_ACTION: 0,
    REQUEST_ALLIANCE_JOIN: 1,
    CREATE_ALLIANCE: 2,
    LEAVE_ALLIANCE: 3,
    STORE_ACTION: 4,
    SEND_CHAT: 5,
    RESET_MOVEMENT: 6,
    ATTACK_STATE: 7,
    MOVE_DIRECTION: 8,
    TOGGLE_ACTION: 9,
    MAP_PING: 10,
    SELECT_BUILD: 11,
    ENTER_GAME: 12,
    REQUEST_UPGRADE: 13,
    AIM: 14,
    PERFORMANCE_STATS: 15,
    HAT_EQUIP_CHECK: 16,
    PING_SOCKET: 17,
    SPECTATE_ROSTER: 18,
    SPECTATE_SET_TARGET: 19,
    SPECTATE_CHAT: 20,
    ADMIN_COMMAND: 21
  });
  const je = e => Object.values(e).reduce((e, t) => Math.max(e, Number(t) || 0), -1) + 1;
  const ze = je(Fe);
  const Ve = je(He);
  const We = e => Number.isInteger(e) && e > 0 && e <= Ne;
  const Ue = (e, t, n) => Le(Le(e) ^ Le(Math.imul(t + 1, 73244475)) ^ Le(n));
  const Ge = (e, t, n) => {
    const i = new Array(e.length);
    for (let r = 0; r < e.length; r += 1) {
      i[r] = Le(Le(e[r]) ^ Ue(t, r, n));
    }
    return i;
  };
  const Ye = (e, t, n, i) => {
    if (!Array.isArray(e) || e.length !== i) {
      return null;
    }
    const r = Ge(e, t, n);
    const a = new Set();
    for (let e = 0; e < r.length; e += 1) {
      const t = r[e];
      if (!We(t) || a.has(t)) {
        return null;
      }
      a.add(t);
    }
    return r;
  };
  function Xe(e) {
    if (!Array.isArray(e) || e.length < 6) {
      return null;
    }
    const [t, n, i, r, a, s] = e;
    if (t !== 0 || n !== 1) {
      return null;
    }
    if (!Number.isInteger(i) || i < 0) {
      return null;
    }
    if (!Number.isInteger(r) || r < 0 || r > 4294967295) {
      return null;
    }
    const o = Ye(a, r, Oe, ze);
    const l = Ye(s, r, De, Ve);
    if (o && l) {
      return {
        socketId: Le(i),
        nonce: Le(r),
        serverPacketIds: o,
        clientPacketIds: l
      };
    } else {
      return null;
    }
  }
  const qe = Object.freeze(Object.defineProperty({
    __proto__: null,
    CLIENT_PACKET_COUNT: Ve,
    CLIENT_PACKET_IDS: He,
    MAX_PACKET_ID: Ne,
    PACKET_BOOTSTRAP_ID: 0,
    PACKET_BOOTSTRAP_VERSION: 1,
    SERVER_PACKET_COUNT: ze,
    SERVER_PACKET_IDS: Fe,
    decodePacketBootstrap: Xe,
    encodePacketBootstrap: function (e, t, n, i) {
      return [0, 1, Le(e), Le(i), Ge(t, i, Oe), Ge(n, i, De)];
    }
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  class Ke {
    constructor() {
      n(this, "socket", null);
      n(this, "connected", false);
      n(this, "closeCode", 0);
      n(this, "packetHandshakeReady", false);
      n(this, "outboundPacketIds", []);
      n(this, "inboundLogicalTypeByPacketId", Object.create(null));
      n(this, "connectionCallback", () => {});
      n(this, "handlers", Object.create(null));
      n(this, "fallbackHandler", null);
      n(this, "suppressCloseNotification", false);
      n(this, "handleOpen", () => {
        this.packetHandshakeReady = false;
        this.outboundPacketIds = [];
        this.inboundLogicalTypeByPacketId = Object.create(null);
      });
      n(this, "handleClose", e => {
        this.connected = false;
        this.closeCode = (e == null ? undefined : e.code) || 0;
        this.packetHandshakeReady = false;
        this.outboundPacketIds = [];
        this.inboundLogicalTypeByPacketId = Object.create(null);
        let t = "disconnected";
        if ((e == null ? undefined : e.code) === 4001) {
          t = "Invalid Connection";
        } else if (e == null ? undefined : e.reason) {
          t = e.reason;
        }
        if (e.code === 4004) {
          localStorage.setItem("4044", "true");
        }
        if (!this.suppressCloseNotification) {
          this.notifyConnection(t);
        }
        this.suppressCloseNotification = false;
        this.detachSocket();
      });
      n(this, "handleError", e => {
        this.suppressCloseNotification = true;
        this.notifyConnection("Socket error");
      });
      n(this, "handleMessage", e => {
        if (typeof e.data == "string") {
          return;
        }
        let t;
        try {
          t = this.toUint8Array(e.data);
        } catch (e) {
          return;
        }
        const n = this.decodeCborPacket(t);
        if (!n) {
          return;
        }
        if (n.type === 0) {
          if (!this.applyPacketBootstrap(n.packet)) {
            this.handleInvalidBootstrap("invalid packet bootstrap");
          }
          return;
        }
        if (!this.packetHandshakeReady) {
          this.handleInvalidBootstrap("received packet before bootstrap");
          return;
        }
        const i = this.inboundLogicalTypeByPacketId[String(n.type)];
        if (!Number.isInteger(i)) {
          return;
        }
        const {
          payload: r
        } = n;
        const a = Array.isArray(r) ? r : [r];
        const s = this.handlers[String(i)];
        if (s) {
          try {
            s.apply(undefined, a);
          } catch (e) {}
        } else if (this.fallbackHandler) {
          try {
            this.fallbackHandler.apply(undefined, [i].concat(a));
          } catch (e) {}
        }
      });
    }
    connect(e, t) {
      if (!e) {
        throw new Error("connect(address) requires a WebSocket address.");
      }
      this.connected = false;
      this.closeCode = 0;
      this.packetHandshakeReady = false;
      this.outboundPacketIds = [];
      this.inboundLogicalTypeByPacketId = Object.create(null);
      this.connectionCallback = typeof t == "function" ? t : () => {};
      this.suppressCloseNotification = false;
      if (this.socket) {
        this.close();
      }
      try {
        this.socket = new WebSocket(e);
      } catch (e) {
        this.notifyConnection("Socket error");
        return;
      }
      this.socket.binaryType = "arraybuffer";
      this.socket.onopen = this.handleOpen;
      this.socket.onclose = this.handleClose;
      this.socket.onerror = this.handleError;
      this.socket.onmessage = this.handleMessage;
    }
    registerHandler(e, t) {
      const n = String(e);
      if (typeof t == "function" && n.length) {
        this.handlers[n] = t;
      }
    }
    removeHandler(e) {
      const t = String(e);
      if (t && this.handlers[t]) {
        delete this.handlers[t];
      }
    }
    onPacket(e) {
      this.fallbackHandler = typeof e == "function" ? e : null;
    }
    sendRaw(e) {
      if (!this.socketReady()) {
        return false;
      }
      let t;
      try {
        t = this.toUint8Array(e);
      } catch (e) {
        return false;
      }
      try {
        this.socket.send(t);
        return true;
      } catch (e) {
        return false;
      }
    }
    sendPacket(e, t = []) {
      if (!Number.isInteger(e) || e < 0) {
        return false;
      }
      const n = this.outboundPacketIds[e];
      if (!Number.isInteger(n)) {
        return false;
      }
      let i;
      try {
        i = Pe([n, ...t]);
      } catch (e) {
        return false;
      }
      return this.sendRaw(i);
    }
    socketReady() {
      return Boolean(this.socket && this.connected);
    }
    close() {
      if (!this.socket) {
        this.connected = false;
        this.closeCode = 0;
        this.packetHandshakeReady = false;
        this.outboundPacketIds = [];
        this.inboundLogicalTypeByPacketId = Object.create(null);
        return;
      }
      this.socket.close();
    }
    notifyConnection(e) {
      try {
        this.connectionCallback(e);
      } catch (e) {}
    }
    detachSocket() {
      if (this.socket) {
        this.socket.onopen = null;
        this.socket.onclose = null;
        this.socket.onerror = null;
        this.socket.onmessage = null;
        this.socket = null;
      }
    }
    toUint8Array(e) {
      if (e instanceof ArrayBuffer) {
        return new Uint8Array(e);
      }
      if (ArrayBuffer.isView(e)) {
        return new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
      }
      if (e instanceof Blob) {
        throw new Error("Blob payloads are not supported");
      }
      throw new Error("Unsupported payload format");
    }
    decodeCborPacket(e) {
      let t;
      try {
        t = Be(e);
      } catch (e) {
        return null;
      }
      if (Array.isArray(t) && Number.isInteger(t[0])) {
        return {
          type: Number(t[0]) >>> 0,
          payload: t.slice(1),
          packet: t
        };
      } else {
        return null;
      }
    }
    applyPacketBootstrap(e) {
      if (this.packetHandshakeReady) {
        return false;
      }
      const t = Xe(e);
      if (!t) {
        this.diagnoseBootstrapFailure(e);
        return false;
      }
      this.outboundPacketIds = t.clientPacketIds.slice();
      this.inboundLogicalTypeByPacketId = Object.create(null);
      for (let e = 0; e < t.serverPacketIds.length; e += 1) {
        const n = t.serverPacketIds[e];
        this.inboundLogicalTypeByPacketId[String(n)] = e;
      }
      this.packetHandshakeReady = true;
      this.connected = true;
      this.notifyConnection();
      return true;
    }
    diagnoseBootstrapFailure(e) {
      if (!Array.isArray(e) || e.length < 6) {
        return;
      }
      const t = e[1];
      const n = e[4];
      const i = e[5];
      if (t === 1) {
        if (Array.isArray(n)) {
          n.length;
        }
        if (Array.isArray(i)) {
          i.length;
        }
      }
    }
    handleInvalidBootstrap(e) {
      if (this.socket) {
        try {
          this.socket.close(4002, e);
          return;
        } catch (e) {
          this.socket.close();
        }
      }
    }
  }
  const Je = new Ke();
  const Ze = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    WebSocketHelper: Ke,
    default: Je
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  function Qe(e) {
    var t = e.documentRef || document;
    this.listEl = t.getElementById("spectateList");
    this.statusEl = t.getElementById("spectateStatus");
    this.countEl = t.getElementById("spectateCount");
    this.refreshButton = t.getElementById("spectateRefresh");
    this.onSelect = typeof e.onSelect == "function" ? e.onSelect : function () {};
    this.onRefresh = typeof e.onRefresh == "function" ? e.onRefresh : null;
    this.players = [];
    this.currentSid = null;
    if (this.refreshButton && this.onRefresh) {
      this.refreshButton.onclick = function () {
        e.onRefresh();
      };
    } else if (this.refreshButton) {
      this.refreshButton.disabled = true;
    }
  }
  Qe.prototype.setStatus = function (e) {
    if (this.statusEl) {
      this.statusEl.textContent = e || "";
    }
  };
  Qe.prototype.setPlayers = function (e) {
    if (Array.isArray(e)) {
      this.players = e.slice();
    } else {
      this.players = [];
    }
    this.render();
  };
  Qe.prototype.setTarget = function (e) {
    this.currentSid = typeof e == "number" ? e : null;
    this.render();
  };
  Qe.prototype.render = function () {
    if (this.listEl) {
      while (this.listEl.firstChild) {
        this.listEl.removeChild(this.listEl.firstChild);
      }
      var e = this.players.slice();
      e.sort(function (e, t) {
        return (t.score || 0) - (e.score || 0);
      });
      if (this.countEl) {
        var t = e.length === 1 ? "1 player" : e.length + " players";
        this.countEl.textContent = t;
      }
      if (!e.length) {
        var n = document.createElement("div");
        n.className = "spectateEmpty";
        n.textContent = "No active players yet.";
        this.listEl.appendChild(n);
        return;
      }
      for (var i = 0; i < e.length; i++) {
        var r = e[i] || {};
        var a = r.sid;
        var s = r.name || "Unnamed";
        var o = r.score || 0;
        var l = r.kills || 0;
        var c = document.createElement("div");
        c.className = "spectateRow" + (a === this.currentSid ? " active" : "");
        var u = document.createElement("div");
        u.className = "spectateInfo";
        var d = document.createElement("div");
        d.className = "spectateName";
        d.textContent = s;
        var h = document.createElement("div");
        h.className = "spectateStats";
        h.textContent = "Score " + o + " · K " + l;
        u.appendChild(d);
        u.appendChild(h);
        var p = document.createElement("button");
        p.type = "button";
        p.className = "spectateButton";
        if (a === this.currentSid) {
          p.textContent = "Watching";
          p.disabled = true;
        } else {
          p.textContent = "Spectate";
          p.onclick = this.onSelect.bind(this, a, s);
        }
        c.appendChild(u);
        c.appendChild(p);
        this.listEl.appendChild(c);
      }
    }
  };
  var $e = Qe;
  const et = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: function (e = Je) {
      const t = (t, n = []) => {
        if (e.socketReady()) {
          try {
            e.sendPacket(t, n);
          } catch (e) {}
        }
      };
      return {
        requestRoster: () => {
          t(He.SPECTATE_ROSTER, []);
        },
        setTarget: e => {
          t(He.SPECTATE_SET_TARGET, e != null ? [Number(e) >>> 0] : [null]);
        },
        sendChat: e => {
          const n = (typeof e == "string" ? e : "").slice(0, 15);
          t(He.SPECTATE_CHAT, [n]);
        }
      };
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  const tt = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: function (e = Je) {
      const t = e => Number.isFinite(e) ? e < 0 ? 0 : e > 255 ? 255 : e | 0 : 0;
      const n = e => Number.isFinite(e) ? e < 0 ? 0 : e > 65535 ? 65535 : e | 0 : 0;
      const i = e => {
        const t = typeof e == "string" ? Number(e) : e;
        if (Number.isFinite(t)) {
          return t >>> 0;
        } else {
          return null;
        }
      };
      const r = (t, n) => {
        if (e.socketReady()) {
          try {
            if (!e.sendPacket(t, n)) {
              return;
            }
            if (typeof window != "undefined" && typeof window.incrementPacketCounter == "function") {
              window.incrementPacketCounter();
            }
          } catch (e) {}
        }
      };
      return Object.freeze({
        respondAllianceRequest: (e, t) => {
          const n = i(e);
          if (n !== null) {
            r(He.CLAN_ACTION, [n, t ? 1 : 0]);
          }
        },
        kickFromClan: e => {
          const t = i(e);
          if (t !== null) {
            r(He.CLAN_ACTION, [t]);
          }
        },
        requestAllianceJoin: e => {
          if (typeof e == "string") {
            r(He.REQUEST_ALLIANCE_JOIN, [e.slice(0, 32)]);
            return;
          }
          const t = Number.isFinite(e) ? Number(e) : 0;
          r(He.REQUEST_ALLIANCE_JOIN, [t >>> 0]);
        },
        createAlliance: e => {
          r(He.CREATE_ALLIANCE, [typeof e == "string" ? e : ""]);
        },
        leaveAlliance: () => {
          r(He.LEAVE_ALLIANCE, []);
        },
        storeEquip: (e, i = 0) => {
          r(He.STORE_ACTION, [0, n(e), t(i)]);
        },
        storeBuy: (e, i = 0) => {
          r(He.STORE_ACTION, [1, n(e), t(i)]);
        },
        sendChat: e => {
          const t = (typeof e == "string" ? e : "").slice(0, 30);
          r(He.SEND_CHAT, [t]);
        },
        resetMovement: () => {
          r(He.RESET_MOVEMENT, []);
        },
        sendAttackState: (e, n, i, a, s) => {
          const o = Number.isFinite(n) ? n : 0;
          const l = [Boolean(e), o, t(i)];
          if (Number.isFinite(a) && Number.isFinite(s)) {
            l.push(a, s);
          }
          r(He.ATTACK_STATE, l);
        },
        sendMoveDirection: e => {
          const t = Number.isFinite(e) ? Number(e) : null;
          r(He.MOVE_DIRECTION, [t]);
        },
        toggleLockDir: () => {
          r(He.TOGGLE_ACTION, [0]);
        },
        sendMapPing: () => {
          r(He.MAP_PING, [1]);
        },
        toggleAutoGather: () => {
          r(He.TOGGLE_ACTION, [1]);
        },
        selectToBuild: (e, t) => {
          r(He.SELECT_BUILD, [n(e), t ? 1 : 0]);
        },
        enterGame: e => {
          const t = {
            name: typeof (e == null ? undefined : e.name) == "string" ? e.name : "",
            moofoll: (e == null ? undefined : e.moofoll) ?? null,
            skin: (e == null ? undefined : e.skin) ?? null,
            token: typeof (e == null ? undefined : e.token) == "string" ? e.token : null,
            fpId: typeof (e == null ? undefined : e.fpId) == "string" ? e.fpId : null
          };
          r(He.ENTER_GAME, [t]);
        },
        requestUpgrade: e => {
          r(He.REQUEST_UPGRADE, [n(e)]);
        },
        sendAim: (e, t, n) => {
          const i = [Number.isFinite(e) ? e : 0];
          if (Number.isFinite(t) && Number.isFinite(n)) {
            i.push(t, n);
          }
          r(He.AIM, i);
        },
        sendPerformanceStats: (e, t) => {
          const n = Math.max(0, Math.round(e));
          const i = Number.isFinite(t) ? Math.round(t) : -1;
          r(He.PERFORMANCE_STATS, [n, i]);
        },
        sendHatEquipCheck: e => {
          const t = Number.isFinite(e) && e >= 0 ? Math.round(e) >>> 0 : 0;
          r(He.HAT_EQUIP_CHECK, [t]);
        },
        pingSocket: () => {
          r(He.PING_SOCKET, []);
        },
        sendAdminCommand: e => {
          const t = (typeof e == "string" ? e : "").trim().slice(0, 240);
          if (t) {
            r(He.ADMIN_COMMAND, [t]);
          }
        }
      });
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  var nt = {
    muted: 1,
    invisible: 2,
    ghost: 4,
    god: 8,
    frozen: 16,
    spectating: 32,
    flying: 64,
    jailed: 128
  };
  function it(e) {
    e = e || {};
    this._send = typeof e.sendCommand == "function" ? e.sendCommand : function () {};
    this.role = "PLAYER";
    this.roleName = "Player";
    this.rank = 0;
    this.badge = null;
    this.feedLevel = 0;
    this.seesHidden = false;
    this.manifest = [];
    this.rows = [];
    this.rowsBySid = Object.create(null);
    this.rowLevel = 0;
    this.history = [];
    this._listeners = {
      state: [],
      feed: [],
      result: []
    };
    this._toastHost = null;
  }
  it.prototype.on = function (e, t) {
    if (this._listeners[e] && typeof t == "function") {
      this._listeners[e].push(t);
    }
  };
  it.prototype._emit = function (e, t) {
    for (var n = this._listeners[e] || [], i = 0; i < n.length; i++) {
      try {
        n[i](t);
      } catch (e) {}
    }
  };
  it.prototype.isStaff = function () {
    return this.rank > 0;
  };
  it.prototype.sendCommand = function (e) {
    var t = (typeof e == "string" ? e : "").trim();
    if (t) {
      if (!t.startsWith("/")) {
        t = "/" + t;
      }
      this.history.push(t);
      if (this.history.length > 25) {
        this.history.shift();
      }
      this._send(t);
    }
  };
  it.prototype.handleState = function (e, t, n, i, r, a, s) {
    this.role = e || "PLAYER";
    this.roleName = t || "Player";
    this.rank = n || 0;
    this.badge = i || null;
    this.feedLevel = r || 0;
    this.seesHidden = Boolean(a);
    this.manifest = Array.isArray(s) ? s : [];
    if (!this.isStaff()) {
      this.rows = [];
      this.rowsBySid = Object.create(null);
    }
    this._emit("state", this);
  };
  it.prototype.handleFeed = function (e, t) {
    this.rowLevel = e || 0;
    this.rows = Array.isArray(t) ? t : [];
    this.rowsBySid = Object.create(null);
    for (var n = 0; n < this.rows.length; n++) {
      var i = this.rows[n];
      if (i && i.length) {
        this.rowsBySid[i[0]] = i;
      }
    }
    this._emit("feed", this);
  };
  it.prototype.handleResult = function (e, t) {
    var n = {
      kind: e | 0,
      text: String(t || ""),
      ts: Date.now()
    };
    this._emit("result", n);
    this._toast(n);
  };
  it.prototype.hudFor = function (e) {
    var t = this.rowsBySid[e];
    if (t) {
      if (this.rowLevel === 1) {
        return {
          ping: t[1],
          cps: t[2],
          flags: t[3]
        };
      } else {
        return {
          ping: t[8],
          cps: t[10],
          flags: t[13],
          suspicion: t[14]
        };
      }
    } else {
      return null;
    }
  };
  it.prototype.stateBitsFor = function (e) {
    if (this.rowLevel !== 2) {
      return 0;
    }
    var t = this.rowsBySid[e];
    if (t) {
      return t[22] | 0;
    } else {
      return 0;
    }
  };
  it.prototype.describeStates = function (e) {
    var t = [];
    for (var n in nt) {
      if (e & nt[n]) {
        t.push(n);
      }
    }
    return t;
  };
  it.prototype._ensureToastHost = function () {
    if (this._toastHost) {
      return this._toastHost;
    }
    var e = document.createElement("div");
    e.id = "adminToastHost";
    e.style.cssText = ["position:fixed", "top:52px", "left:50%", "transform:translateX(-50%)", "z-index:9000", "display:flex", "flex-direction:column", "gap:6px", "align-items:center", "pointer-events:none", "max-width:70vw"].join(";");
    document.body.appendChild(e);
    this._toastHost = e;
    return e;
  };
  it.prototype._toast = function (e) {
    var t = {
      0: "rgba(170,50,50,0.92)",
      1: "rgba(70,140,70,0.92)",
      2: "rgba(50,70,110,0.92)",
      3: "rgba(120,80,160,0.95)"
    };
    var n = this._ensureToastHost();
    var i = document.createElement("div");
    i.textContent = e.text;
    i.style.cssText = ["background:" + (t[e.kind] || t[2]), "color:#fff", "padding:" + (e.kind === 3 ? "12px 26px" : "7px 16px"), "border-radius:6px", "font:" + (e.kind === 3 ? "22px" : "15px") + " GameFont, sans-serif", "text-shadow:0 1px 2px rgba(0,0,0,0.5)", "box-shadow:0 2px 8px rgba(0,0,0,0.35)", "opacity:0", "transition:opacity 0.25s"].join(";");
    n.appendChild(i);
    requestAnimationFrame(function () {
      i.style.opacity = "1";
    });
    var r = e.kind === 3 ? 6000 : 3500;
    setTimeout(function () {
      i.style.opacity = "0";
      setTimeout(function () {
        if (i.parentNode) {
          i.parentNode.removeChild(i);
        }
      }, 300);
    }, r);
  };
  var rt = it;
  var at = {
    id: {
      label: "ID",
      fn: function (e, t) {
        return e[0] - t[0];
      }
    },
    name: {
      label: "Name",
      fn: function (e, t) {
        return String(e[1]).localeCompare(String(t[1]));
      }
    },
    ping: {
      label: "Ping",
      fn: function (e, t) {
        return (t[8] | 0) - (e[8] | 0);
      }
    },
    cps: {
      label: "CPS",
      fn: function (e, t) {
        return (t[10] | 0) - (e[10] | 0);
      }
    },
    flags: {
      label: "Flags",
      fn: function (e, t) {
        return (t[13] | 0) - (e[13] | 0);
      }
    },
    suspicion: {
      label: "Suspicion",
      fn: function (e, t) {
        return (t[14] || 0) - (e[14] || 0);
      }
    }
  };
  var st = "admin_pinned_sids_v1";
  function ot(e) {
    this.admin = e;
    this.visible = false;
    this.search = "";
    this.sort = "suspicion";
    this.expandedSid = null;
    this.pinned = this._loadPins();
    this.root = null;
    this.rowsEl = null;
    this.consoleEl = null;
    this._buildDom();
    this._bind();
  }
  function lt(e) {
    return String(e == null ? "" : e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  ot.prototype._loadPins = function () {
    try {
      var e = localStorage.getItem(st);
      var t = e ? JSON.parse(e) : [];
      if (Array.isArray(t)) {
        return t;
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  };
  ot.prototype._savePins = function () {
    try {
      localStorage.setItem(st, JSON.stringify(this.pinned));
    } catch (e) {}
  };
  ot.prototype._buildDom = function () {
    var e = document.createElement("style");
    e.textContent = ["#staffSidebar{position:fixed;top:0;right:0;height:100vh;width:390px;z-index:8500;", "background:rgba(18,22,28,0.94);color:#e8e8e8;font:13px GameFont,monospace,sans-serif;", "display:none;flex-direction:column;box-shadow:-4px 0 14px rgba(0,0,0,0.5);}", "#staffSidebar.open{display:flex;}", "#staffSidebar .ss-head{padding:10px 12px;background:rgba(0,0,0,0.35);display:flex;justify-content:space-between;align-items:center;}", "#staffSidebar .ss-badge{background:#7a50a0;border-radius:4px;padding:2px 8px;font-size:12px;}", "#staffSidebar .ss-controls{display:flex;gap:6px;padding:8px 12px;}", "#staffSidebar input,#staffSidebar select{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);", "color:#eee;border-radius:4px;padding:4px 8px;font:inherit;flex:1;min-width:0;}", "#staffSidebar .ss-rows{flex:1;overflow-y:auto;padding:4px 8px;}", "#staffSidebar .ss-row{border-bottom:1px solid rgba(255,255,255,0.07);padding:6px 6px;cursor:pointer;border-radius:4px;}", "#staffSidebar .ss-row:hover{background:rgba(255,255,255,0.06);}", "#staffSidebar .ss-row .ss-line1{display:flex;justify-content:space-between;gap:6px;}", "#staffSidebar .ss-row .ss-line2{color:#9ab;font-size:11px;margin-top:2px;display:flex;justify-content:space-between;gap:6px;}", "#staffSidebar .ss-sus{color:#f4b74a;} #staffSidebar .ss-sus.hot{color:#ff5b5b;font-weight:bold;}", "#staffSidebar .ss-states{color:#cf9dff;font-size:11px;}", "#staffSidebar .ss-pin{opacity:0.4;margin-right:4px;} #staffSidebar .ss-pin.on{opacity:1;color:#f4d24a;}", "#staffSidebar .ss-actions{display:flex;flex-wrap:wrap;gap:4px;padding:6px 2px 2px;}", "#staffSidebar .ss-actions button{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);", "color:#eee;border-radius:4px;padding:3px 8px;font:11px GameFont,sans-serif;cursor:pointer;}", "#staffSidebar .ss-actions button:hover{background:rgba(255,255,255,0.22);}", "#staffSidebar .ss-console{max-height:150px;overflow-y:auto;background:rgba(0,0,0,0.4);padding:6px 10px;", "font-size:11px;line-height:1.5;}", "#staffSidebar .ss-console .k0{color:#ff8080;} #staffSidebar .ss-console .k1{color:#93d97b;}", "#staffSidebar .ss-console .k2{color:#9ab8d8;} #staffSidebar .ss-console .k3{color:#cf9dff;}", "#staffSidebar .ss-hint{padding:4px 12px 8px;color:#778;font-size:11px;}"].join("");
    document.head.appendChild(e);
    var t = document.createElement("div");
    t.id = "staffSidebar";
    t.innerHTML = "<div class=\"ss-head\"><div><span class=\"ss-badge\" id=\"ssBadge\">STAFF</span> <span id=\"ssCount\"></span></div><div id=\"ssRole\"></div></div><div class=\"ss-controls\"><input id=\"ssSearch\" placeholder=\"search name / id…\" autocomplete=\"off\"><select id=\"ssSort\"></select></div><div class=\"ss-rows\" id=\"ssRows\"></div><div class=\"ss-console\" id=\"ssConsole\"></div><div class=\"ss-hint\">F2 toggle · click row for actions · ★ pins to top</div>";
    document.body.appendChild(t);
    var n = t.querySelector("#ssSort");
    for (var i in at) {
      var r = document.createElement("option");
      r.value = i;
      r.textContent = "sort: " + at[i].label;
      n.appendChild(r);
    }
    n.value = this.sort;
    this.root = t;
    this.rowsEl = t.querySelector("#ssRows");
    this.consoleEl = t.querySelector("#ssConsole");
  };
  ot.prototype._bind = function () {
    var e = this;
    window.addEventListener("keydown", function (t) {
      if ((t.key === "F2" || t.keyCode === 113) && !!e.admin.isStaff()) {
        t.preventDefault();
        e.toggle();
      }
    });
    this.root.querySelector("#ssSearch").addEventListener("input", function (t) {
      e.search = String(t.target.value || "").toLowerCase();
      e.renderRows();
    });
    this.root.querySelector("#ssSort").addEventListener("change", function (t) {
      e.sort = t.target.value;
      e.renderRows();
    });
    this.root.addEventListener("keydown", function (e) {
      e.stopPropagation();
    }, true);
    this.root.addEventListener("keyup", function (e) {
      e.stopPropagation();
    }, true);
    this.admin.on("feed", function () {
      if (e.visible) {
        e.renderRows();
      }
    });
    this.admin.on("state", function () {
      e.renderHead();
      if (!e.admin.isStaff()) {
        e.hide();
      }
    });
    this.admin.on("result", function (t) {
      e.logResult(t);
    });
  };
  ot.prototype.toggle = function () {
    this.visible = !this.visible;
    this.root.classList.toggle("open", this.visible);
    if (this.visible) {
      this.renderHead();
      this.renderRows();
    }
  };
  ot.prototype.hide = function () {
    this.visible = false;
    this.root.classList.remove("open");
  };
  ot.prototype.renderHead = function () {
    this.root.querySelector("#ssBadge").textContent = this.admin.badge || "STAFF";
    this.root.querySelector("#ssRole").textContent = this.admin.roleName;
  };
  ot.prototype.logResult = function (e) {
    var t = document.createElement("div");
    t.className = "k" + e.kind;
    t.textContent = e.text;
    this.consoleEl.appendChild(t);
    while (this.consoleEl.childNodes.length > 60) {
      this.consoleEl.removeChild(this.consoleEl.firstChild);
    }
    this.consoleEl.scrollTop = this.consoleEl.scrollHeight;
  };
  ot.prototype._matchesSearch = function (e) {
    return !this.search || String(e[0]).indexOf(this.search) !== -1 || String(e[1]).toLowerCase().indexOf(this.search) !== -1 || String(e[3] || "").toLowerCase().indexOf(this.search) !== -1;
  };
  ot.prototype.renderRows = function () {
    var e = this.admin;
    if (e.rowLevel !== 2) {
      this.rowsEl.innerHTML = "<div style=\"padding:12px;color:#889;\">Full dashboard requires the analytics permission.<br>(HUD-level feed active.)</div>";
      this.root.querySelector("#ssCount").textContent = "";
      return;
    }
    var t = e.rows.filter(this._matchesSearch.bind(this));
    var n = (at[this.sort] || at.suspicion).fn;
    var i = this.pinned;
    t.sort(function (e, t) {
      var r = i.indexOf(e[0]) !== -1 ? 0 : 1;
      var a = i.indexOf(t[0]) !== -1 ? 0 : 1;
      if (r !== a) {
        return r - a;
      } else {
        return n(e, t);
      }
    });
    this.root.querySelector("#ssCount").textContent = t.length + " online";
    this.rowsEl.innerHTML = "";
    for (var r = 0; r < t.length; r++) {
      this.rowsEl.appendChild(this._buildRow(t[r]));
    }
  };
  ot.prototype._buildRow = function (e) {
    var t = this;
    var n = e[0];
    var i = e[1];
    var r = e[2];
    var a = e[3];
    var s = e[4];
    var o = e[5];
    var l = e[6];
    var c = e[7];
    var u = e[8];
    var d = e[10];
    var h = e[12];
    var p = e[13];
    var m = e[14];
    var f = e[15];
    var g = e[16];
    var y = e[17];
    var v = e[18];
    var b = this.admin.describeStates(e[22] | 0);
    var w = document.createElement("div");
    w.className = "ss-row";
    var k = this.pinned.indexOf(n) !== -1;
    var S = m >= 20 ? "ss-sus hot" : "ss-sus";
    var x = document.createElement("div");
    x.className = "ss-line1";
    x.innerHTML = "<span><span class=\"ss-pin" + (k ? " on" : "") + "\">★</span>#" + n + " <b>" + lt(i) + "</b>" + (r !== "PLAYER" ? " <span class=\"ss-badge\">" + lt(r) + "</span>" : "") + (a ? " <span style=\"color:#8fc;\">[" + lt(a) + "]</span>" : "") + "</span><span class=\"" + S + "\">" + m + "</span>";
    var I = document.createElement("div");
    I.className = "ss-line2";
    I.innerHTML = "<span>hp " + s + "/" + o + " · " + u + "ms · cps " + d + " (pk " + h + ") · fl " + p + "</span><span>" + lt(v) + " " + l + "," + c + " · k/d " + f + "/" + g + " · age " + y + "</span>";
    w.appendChild(x);
    w.appendChild(I);
    if (b.length) {
      var M = document.createElement("div");
      M.className = "ss-states";
      M.textContent = "⚙ " + b.join(" · ");
      w.appendChild(M);
    }
    x.querySelector(".ss-pin").addEventListener("click", function (e) {
      e.stopPropagation();
      var i = t.pinned.indexOf(n);
      if (i === -1) {
        t.pinned.push(n);
      } else {
        t.pinned.splice(i, 1);
      }
      t._savePins();
      t.renderRows();
    });
    w.addEventListener("click", function () {
      t.expandedSid = t.expandedSid === n ? null : n;
      t.renderRows();
    });
    if (this.expandedSid === n) {
      w.appendChild(this._buildActions(n, i));
    }
    return w;
  };
  ot.prototype._buildActions = function (e, t) {
    var n = this;
    var i = document.createElement("div");
    i.className = "ss-actions";
    [["Whois", function () {
      return "/whois " + e;
    }], ["Flags", function () {
      return "/flags " + e;
    }], ["Stats", function () {
      return "/stats " + e;
    }], ["TP to", function () {
      return "/tp " + e;
    }], ["Bring", function () {
      return "/tphere " + e;
    }], ["Spectate", function () {
      return "/spectate " + e;
    }], ["Freeze", function () {
      return "/freeze " + e;
    }], ["Mute", function () {
      var n = prompt("Mute " + t + " — duration+reason (e.g. 10m spamming):", "10m ");
      if (n === null) {
        return null;
      } else {
        return "/mute " + e + " " + n;
      }
    }], ["Warn", function () {
      var n = prompt("Warn " + t + " — reason:");
      if (n) {
        return "/warn " + e + " " + n;
      } else {
        return null;
      }
    }], ["Kick", function () {
      var n = prompt("Kick " + t + " — reason:", "");
      if (n === null) {
        return null;
      } else {
        return "/kick " + e + " " + n;
      }
    }], ["Ban", function () {
      var n = prompt("BAN " + t + " — reason:");
      if (n) {
        return "/ban " + e + " " + n;
      } else {
        return null;
      }
    }]].forEach(function (e) {
      var t = document.createElement("button");
      t.textContent = e[0];
      t.addEventListener("click", function (t) {
        t.stopPropagation();
        var i = e[1]();
        if (i) {
          n.admin.sendCommand(i);
        }
      });
      i.appendChild(t);
    });
    return i;
  };
  var ct = ot;
  function ut(e, t) {
    this.admin = e;
    this.chatBox = t;
    this.panel = null;
    this.items = [];
    this.selected = 0;
    this.historyCursor = -1;
    this._build();
    this._bind();
  }
  function dt(e) {
    return String(e == null ? "" : e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  ut.prototype._build = function () {
    var e = document.createElement("style");
    e.textContent = ["#smartChatPanel{position:fixed;z-index:8600;background:rgba(14,17,22,0.96);", "border:1px solid rgba(255,255,255,0.18);border-radius:6px;min-width:340px;max-width:520px;", "font:13px GameFont,monospace,sans-serif;color:#dde;display:none;box-shadow:0 4px 14px rgba(0,0,0,0.5);}", "#smartChatPanel .sc-item{padding:5px 10px;cursor:pointer;display:flex;gap:8px;align-items:baseline;}", "#smartChatPanel .sc-item.sel{background:rgba(90,130,200,0.28);}", "#smartChatPanel .sc-name{color:#8fd0ff;white-space:nowrap;}", "#smartChatPanel .sc-usage{color:#cbd;} #smartChatPanel .sc-desc{color:#789;font-size:11px;", "overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;text-align:right;}", "#smartChatPanel .sc-hint{padding:4px 10px;color:#678;font-size:11px;border-top:1px solid rgba(255,255,255,0.1);}"].join("");
    document.head.appendChild(e);
    this.panel = document.createElement("div");
    this.panel.id = "smartChatPanel";
    document.body.appendChild(this.panel);
  };
  ut.prototype._bind = function () {
    var e = this;
    if (this.chatBox) {
      this.chatBox.addEventListener("input", function () {
        e.historyCursor = -1;
        e.refresh();
      });
      this.chatBox.addEventListener("keydown", function (t) {
        if (e.admin.isStaff()) {
          var n = t.key;
          if (e.isOpen()) {
            if (n === "Tab") {
              t.preventDefault();
              t.stopPropagation();
              e.complete();
              return;
            }
            if (n === "ArrowDown" || n === "ArrowUp") {
              t.preventDefault();
              t.stopPropagation();
              var i = n === "ArrowDown" ? 1 : -1;
              e.selected = (e.selected + i + e.items.length) % e.items.length;
              e.render();
              return;
            }
            if (n === "Escape") {
              e.close();
              return;
            }
          } else if (n === "ArrowUp" || n === "ArrowDown") {
            var r = e.admin.history;
            if (!r.length) {
              return;
            }
            var a = e.chatBox.value;
            if (a && !a.startsWith("/")) {
              return;
            }
            t.preventDefault();
            t.stopPropagation();
            if (n === "ArrowUp") {
              e.historyCursor = e.historyCursor === -1 ? r.length - 1 : Math.max(0, e.historyCursor - 1);
            } else {
              if (e.historyCursor === -1) {
                return;
              }
              e.historyCursor = Math.min(r.length - 1, e.historyCursor + 1);
            }
            e.chatBox.value = r[e.historyCursor];
          }
        }
      }, true);
      this.chatBox.addEventListener("blur", function () {
        setTimeout(function () {
          e.close();
        }, 150);
      });
    }
  };
  ut.prototype.isOpen = function () {
    return this.panel.style.display === "block" && this.items.length > 0;
  };
  ut.prototype.close = function () {
    this.panel.style.display = "none";
    this.items = [];
  };
  ut.prototype.refresh = function () {
    var e = this.chatBox.value || "";
    if (this.admin.isStaff() && e.charAt(0) === "/") {
      var t;
      var n = e.slice(1).split(/\s+/);
      var i = (n[0] || "").toLowerCase();
      var r = this.admin.manifest;
      var a = [];
      if (n.length <= 1) {
        for (t = 0; t < r.length; t++) {
          var s = r[t];
          if (!i || s[0].indexOf(i) === 0 || s[1] && s[1].split(",").some(function (e) {
            return e.indexOf(i) === 0;
          })) {
            a.push({
              complete: "/" + s[0] + " ",
              name: "/" + s[0],
              usage: s[2],
              desc: s[3]
            });
          }
        }
      } else {
        var o = n[n.length - 1].toLowerCase();
        var l = null;
        for (t = 0; t < r.length; t++) {
          if (r[t][0] === i || r[t][1] && r[t][1].split(",").indexOf(i) !== -1) {
            l = r[t];
            break;
          }
        }
        var c = this.admin.rows;
        if (l && this.admin.rowLevel === 2) {
          var u = e.slice(0, e.length - n[n.length - 1].length);
          for (t = 0; t < c.length && a.length < 8; t++) {
            var d = c[t];
            var h = String(d[0]);
            var p = String(d[1] || "").toLowerCase();
            if (!o || h.indexOf(o) === 0 || p.indexOf(o) !== -1) {
              a.push({
                complete: u + h + " ",
                name: h,
                usage: String(d[1] || ""),
                desc: (d[2] !== "PLAYER" ? d[2] + " · " : "") + d[8] + "ms"
              });
            }
          }
        }
        if (l && !a.length) {
          a.push({
            complete: e,
            name: l[2],
            usage: "",
            desc: l[3]
          });
        }
      }
      this.items = a.slice(0, 8);
      this.selected = 0;
      this.render();
    } else {
      this.close();
    }
  };
  ut.prototype.render = function () {
    if (this.items.length) {
      var e = "";
      for (var t = 0; t < this.items.length; t++) {
        var n = this.items[t];
        e += "<div class=\"sc-item" + (t === this.selected ? " sel" : "") + "\" data-i=\"" + t + "\"><span class=\"sc-name\">" + dt(n.name) + "</span><span class=\"sc-usage\">" + dt(n.usage || "") + "</span><span class=\"sc-desc\">" + dt(n.desc || "") + "</span></div>";
      }
      e += "<div class=\"sc-hint\">Tab complete · ↑↓ select · Enter send · Esc close</div>";
      this.panel.innerHTML = e;
      var i = this.chatBox.getBoundingClientRect();
      this.panel.style.left = i.left + "px";
      this.panel.style.bottom = window.innerHeight - i.top + 8 + "px";
      this.panel.style.top = "auto";
      this.panel.style.display = "block";
      var r = this;
      for (var a = this.panel.querySelectorAll(".sc-item"), s = 0; s < a.length; s++) {
        a[s].addEventListener("mousedown", function (e) {
          e.preventDefault();
          r.selected = Number(this.getAttribute("data-i")) || 0;
          r.complete();
        });
      }
    } else {
      this.close();
    }
  };
  ut.prototype.complete = function () {
    var e = this.items[this.selected];
    if (e) {
      this.chatBox.value = e.complete;
      this.refresh();
      this.chatBox.focus();
    }
  };
  var ht = ut;
  const pt = Math.abs;
  const mt = Math.pow;
  const ft = Math.sqrt;
  const gt = Math.atan2;
  const yt = Math.PI;
  function vt(e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e;
  }
  function bt(e, t) {
    return Math.random() * (t - e + 1) + e;
  }
  function wt(e, t, n) {
    return e + (t - e) * n;
  }
  function kt(e) {
    if (e < 0) {
      return 0;
    } else if (e > 1) {
      return 1;
    } else {
      return e;
    }
  }
  function St(e, t) {
    const n = typeof t == "number" && t > 0 ? t : 1;
    const i = kt(e);
    if (n === 1) {
      return i;
    } else {
      return 1 - mt(1 - i, n);
    }
  }
  function xt(e, t) {
    const n = typeof t == "number" && t > 0 ? t : 1;
    const i = kt(e);
    if (n === 1) {
      return i;
    } else {
      return mt(i, n);
    }
  }
  function It(e, t) {
    if (e > 0) {
      return Math.max(0, e - t);
    } else if (e < 0) {
      return Math.min(0, e + t);
    } else {
      return e;
    }
  }
  function Mt(e, t, n, i) {
    return ft((n -= e) * n + (i -= t) * i);
  }
  function Et(e, t, n, i) {
    return gt(t - i, e - n);
  }
  function Pt(e, t) {
    const n = pt(t - e) % (yt * 2);
    if (n > yt) {
      return yt * 2 - n;
    } else {
      return n;
    }
  }
  function Tt(e) {
    return typeof e == "number" && !Number.isNaN(e) && Number.isFinite(e);
  }
  function At(e) {
    return typeof e == "string" && e.length > 0;
  }
  function Ct(e) {
    if (!Tt(e)) {
      return "0";
    }
    const t = Math.abs(e);
    const n = e < 0 ? "-" : "";
    let i = "";
    let r = t;
    if (t >= 1000000000) {
      r = Math.round(t / 1000000000);
      i = "b";
    } else if (t >= 1000000) {
      r = Math.round(t / 1000000);
      i = "m";
    } else if (t >= 1000) {
      r = Math.round(t / 1000);
      i = "k";
    } else {
      r = Math.round(t);
    }
    return n + r + i;
  }
  function _t(e) {
    if (!Tt(e)) {
      return "0";
    }
    const t = Math.abs(e);
    const n = e < 0 ? "-" : "";
    const i = (e, t) => {
      const i = e % 1 == 0 ? e.toString() : e.toFixed(1);
      return n + i + t;
    };
    if (t >= 1000000000000) {
      return i(Bt(t / 1000000000000, 2), "t");
    } else if (t >= 1000000000) {
      return i(Bt(t / 1000000000, 2), "b");
    } else if (t >= 1000000) {
      return i(Bt(t / 1000000, 2), "m");
    } else if (t >= 1000) {
      return i(Bt(t / 1000, 2), "k");
    } else {
      return e.toString();
    }
  }
  function Rt(e) {
    if (e) {
      return e.charAt(0).toUpperCase() + e.slice(1);
    } else {
      return "";
    }
  }
  function Bt(e, t) {
    return parseFloat(e.toFixed(t));
  }
  function Lt(e, t) {
    return parseFloat(String(t.points)) - parseFloat(String(e.points));
  }
  function Ot(e, t, n, i, r, a, s, o) {
    let l = r;
    let c = s;
    if (r > s) {
      l = s;
      c = r;
    }
    if (c > n) {
      c = n;
    }
    if (l < e) {
      l = e;
    }
    if (l > c) {
      return false;
    }
    let u = a;
    let d = o;
    const h = s - r;
    if (Math.abs(h) > 1e-7) {
      const e = (o - a) / h;
      const t = a - e * r;
      u = e * l + t;
      d = e * c + t;
    }
    if (u > d) {
      const e = d;
      d = u;
      u = e;
    }
    if (d > i) {
      d = i;
    }
    if (u < t) {
      u = t;
    }
    return !(u > d);
  }
  function Dt(e, t, n) {
    const i = e.getBoundingClientRect();
    const r = i.left + window.scrollX;
    const a = i.top + window.scrollY;
    const s = i.width;
    const o = i.height;
    return t > r && t < r + s && n > a && n < a + o;
  }
  function Nt(e) {
    const t = e.changedTouches[0];
    if (!t) {
      return;
    }
    const n = e;
    n.screenX = t.screenX;
    n.screenY = t.screenY;
    n.clientX = t.clientX;
    n.clientY = t.clientY;
    n.pageX = t.pageX;
    n.pageY = t.pageY;
  }
  function Ft(e, t) {
    const n = !t;
    let i = false;
    const r = false;
    const a = t => {
      Nt(t);
      if (typeof window.setUsingTouch == "function") {
        window.setUsingTouch(true);
      }
      if (n) {
        t.preventDefault();
        t.stopPropagation();
      }
      if (i) {
        if (typeof e.onclick == "function") {
          e.onclick(t);
        }
        if (typeof e.onmouseout == "function") {
          e.onmouseout(t);
        }
        i = false;
      }
    };
    e.addEventListener("touchstart", Vt(t => {
      Nt(t);
      if (typeof window.setUsingTouch == "function") {
        window.setUsingTouch(true);
      }
      if (n) {
        t.preventDefault();
        t.stopPropagation();
      }
      if (typeof e.onmouseover == "function") {
        e.onmouseover(t);
      }
      i = true;
    }), r);
    e.addEventListener("touchmove", Vt(t => {
      Nt(t);
      if (typeof window.setUsingTouch == "function") {
        window.setUsingTouch(true);
      }
      if (n) {
        t.preventDefault();
        t.stopPropagation();
      }
      const r = t;
      if (Dt(e, r.pageX, r.pageY)) {
        if (!i) {
          if (typeof e.onmouseover == "function") {
            e.onmouseover(t);
          }
          i = true;
        }
      } else if (i) {
        if (typeof e.onmouseout == "function") {
          e.onmouseout(t);
        }
        i = false;
      }
    }), r);
    e.addEventListener("touchend", Vt(a), r);
    e.addEventListener("touchcancel", Vt(a), r);
    e.addEventListener("touchleave", Vt(a), r);
  }
  function Ht(e) {
    while (e.lastChild) {
      e.removeChild(e.lastChild);
    }
  }
  function jt(e) {
    const t = e.tag || "div";
    const n = document.createElement(t);
    const i = (e, t) => {
      if (typeof e == "string") {
        n[t] = e;
      }
    };
    i(e.text, "textContent");
    i(e.html, "innerHTML");
    if (e.className) {
      n.className = e.className;
    } else if (e.class) {
      n.className = e.class;
    }
    if (e.classes) {
      const t = Array.isArray(e.classes) ? e.classes : e.classes.split(" ");
      n.classList.add(...t.filter(Boolean));
    }
    if (e.attributes) {
      Object.keys(e.attributes).forEach(t => {
        n.setAttribute(t, e.attributes[t]);
      });
    }
    if (e.dataset) {
      Object.keys(e.dataset).forEach(t => {
        n.dataset[t] = e.dataset[t];
      });
    }
    if (e.style) {
      if (typeof e.style == "string") {
        n.style.cssText = e.style;
      } else {
        Object.keys(e.style).forEach(t => {
          const i = e.style[t];
          if (typeof i == "string") {
            n.style[t] = i;
          }
        });
      }
    }
    (function (e, t) {
      const n = ["onclick", "onmouseover", "onmouseout", "onpointerdown"];
      n.forEach(n => {
        const i = t[n];
        if (typeof i == "function") {
          e[n] = Vt(i);
        }
      });
      if (t.listeners) {
        Object.keys(t.listeners).forEach(n => {
          const i = t.listeners[n];
          if (typeof i == "function") {
            e.addEventListener(n, Vt(i));
          }
        });
      }
      Object.keys(t).filter(e => !["tag", "text", "html", "className", "class", "classes", "style", "attributes", "dataset", "hookTouch", "parent", "children", "listeners"].includes(e)).forEach(i => {
        if (!(n.indexOf(i) >= 0)) {
          e[i] = t[i];
        }
      });
    })(n, e);
    if (e.hookTouch) {
      Ft(n);
    }
    if (e.parent) {
      e.parent.appendChild(n);
    }
    if (e.children) {
      for (let t = 0; t < e.children.length; t++) {
        n.appendChild(e.children[t]);
      }
    }
    return n;
  }
  function zt(e) {
    return !e || typeof e.isTrusted != "boolean" || e.isTrusted;
  }
  function Vt(e) {
    return t => {
      e(t);
    };
  }
  function Wt(e) {
    let t = "";
    for (let n = 0; n < e; n++) {
      t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62));
    }
    return t;
  }
  function Ut() {
    return /Mobi|Android|iPhone|iPad|iPod|IEMobile|Windows Phone/i.test(navigator.userAgent);
  }
  function Gt(e, t) {
    let n = 0;
    for (let i = 0; i < e.length; i++) {
      if (e[i] === t) {
        n++;
      }
    }
    return n;
  }
  const Yt = {
    randInt: vt,
    randFloat: bt,
    lerp: wt,
    clamp01: kt,
    easeOutPower: St,
    easeInPower: xt,
    decel: It,
    getDistance: Mt,
    getDirection: Et,
    getAngleDist: Pt,
    isNumber: Tt,
    isString: At,
    kFormat: Ct,
    formatScore: _t,
    capitalizeFirst: Rt,
    fixTo: Bt,
    sortByPoints: Lt,
    lineInRect: Ot,
    containsPoint: Dt,
    mousifyTouchEvent: Nt,
    hookTouchEvents: Ft,
    removeAllChildren: Ht,
    generateElement: jt,
    eventIsTrusted: zt,
    checkTrusted: Vt,
    randomString: Wt,
    isMobile: Ut,
    countInArray: Gt
  };
  const Xt = Object.freeze(Object.defineProperty({
    __proto__: null,
    UTILS: Yt,
    capitalizeFirst: Rt,
    checkTrusted: Vt,
    clamp01: kt,
    containsPoint: Dt,
    countInArray: Gt,
    decel: It,
    default: Yt,
    easeInPower: xt,
    easeOutPower: St,
    eventIsTrusted: zt,
    fixTo: Bt,
    formatScore: _t,
    generateElement: jt,
    getAngleDist: Pt,
    getDirection: Et,
    getDistance: Mt,
    hookTouchEvents: Ft,
    isMobile: Ut,
    isNumber: Tt,
    isString: At,
    kFormat: Ct,
    lerp: wt,
    lineInRect: Ot,
    mousifyTouchEvent: Nt,
    randFloat: bt,
    randInt: vt,
    randomString: Wt,
    removeAllChildren: Ht,
    sortByPoints: Lt
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  const qt = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class {
      constructor(e) {
        n(this, "container");
        n(this, "getPlayer");
        this.container = e.container;
        this.getPlayer = e.getPlayer;
      }
      show(e, t = {}) {
        if (!this.container) {
          return;
        }
        if (!e) {
          this.container.classList.remove("visible");
          return;
        }
        const {
          isWeapon: n,
          isStoreItem: i
        } = t;
        Yt.removeAllChildren(this.container);
        this.container.classList.add("visible");
        this.appendTitle(e);
        this.appendDescription(e);
        if (i && e.price) {
          this.appendPrice(e.price);
        } else if (n) {
          this.appendWeaponType(e);
        } else {
          this.appendBuildRequirements(e);
          this.appendGroupLimit(e);
        }
      }
      appendTitle(e) {
        if (this.container) {
          Yt.generateElement({
            id: "itemInfoName",
            text: Yt.capitalizeFirst(e.name),
            parent: this.container
          });
        }
      }
      appendDescription(e) {
        if (this.container) {
          Yt.generateElement({
            id: "itemInfoDesc",
            text: e.desc || "",
            parent: this.container
          });
        }
      }
      appendPrice(e) {
        if (this.container) {
          Yt.generateElement({
            class: "itemInfoReq",
            text: "Price: " + e + " coins",
            parent: this.container
          });
        }
      }
      appendWeaponType(e) {
        if (this.container) {
          Yt.generateElement({
            class: "itemInfoReq",
            text: e.type ? "secondary" : "primary",
            parent: this.container
          });
        }
      }
      appendBuildRequirements(e) {
        if (this.container && Array.isArray(e.req)) {
          for (let t = 0; t < e.req.length; t += 2) {
            const n = e.req[t];
            const i = e.req[t + 1];
            Yt.generateElement({
              class: "itemInfoReq",
              html: n + "<span class='itemInfoReqVal'> x" + i + "</span>",
              parent: this.container
            });
          }
        }
      }
      appendGroupLimit(e) {
        if (!this.container) {
          return;
        }
        if (!e.group || !e.group.limit) {
          return;
        }
        const t = this.getPlayer();
        const n = (t == null ? undefined : t.itemCounts) && t.itemCounts[e.group.id] || 0;
        Yt.generateElement({
          class: "itemInfoLmt",
          text: "Limit: " + n + "/" + e.group.limit,
          parent: this.container
        });
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  const Kt = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class {
      constructor(e) {
        n(this, "container");
        n(this, "containerId");
        n(this, "onRespond");
        this.container = e.container ?? null;
        this.containerId = e.containerId ?? null;
        this.onRespond = e.onRespond;
      }
      resolveContainer() {
        if (!this.container) {
          if (this.containerId) {
            this.container = document.getElementById(this.containerId);
          }
        }
        return this.container;
      }
      render(e) {
        const t = this.resolveContainer();
        if (!t) {
          return;
        }
        if (!e.length) {
          t.style.display = "none";
          return;
        }
        const n = e[0];
        Yt.removeAllChildren(t);
        t.style.display = "block";
        Yt.generateElement({
          class: "notificationText",
          text: n.name,
          parent: t
        });
        this.appendButton("&#xE14C;", false);
        this.appendButton("&#xE876;", true);
      }
      appendButton(e, t) {
        const n = this.resolveContainer();
        if (n) {
          Yt.generateElement({
            class: "notifButton",
            html: "<i class='material-icons' style='font-size:28px;color:" + (t ? "#8ecc51" : "#cc5151") + ";'>" + e + "</i>",
            parent: n,
            onclick: () => this.onRespond(t),
            hookTouch: true
          });
        }
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  const Jt = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class {
      constructor(e) {
        n(this, "menu");
        n(this, "holder");
        n(this, "manager");
        n(this, "storeMenu");
        n(this, "closeChat");
        n(this, "getPlayer");
        n(this, "getAlliancePlayers");
        n(this, "getAlliances");
        n(this, "onKick");
        n(this, "onJoin");
        n(this, "onCreate");
        n(this, "onLeave");
        this.menu = e.menu;
        this.holder = e.holder;
        this.manager = e.manager;
        this.storeMenu = e.storeMenu;
        this.closeChat = e.closeChat;
        this.getPlayer = e.getPlayer;
        this.getAlliancePlayers = e.getAlliancePlayers;
        this.getAlliances = e.getAlliances;
        this.onKick = e.onKick;
        this.onJoin = e.onJoin;
        this.onCreate = e.onCreate;
        this.onLeave = e.onLeave;
      }
      show() {
        if (!this.menu) {
          return;
        }
        const e = this.getPlayer();
        if (e && e.alive) {
          this.closeChat();
          if (this.storeMenu) {
            this.storeMenu.style.display = "none";
          }
          this.menu.style.display = "block";
          this.renderHolder(e);
          this.renderManager(e);
          this.focusAllianceInput();
        }
      }
      hide() {
        if (this.menu) {
          this.menu.style.display = "none";
        }
      }
      renderHolder(e) {
        if (!this.holder) {
          return;
        }
        Yt.removeAllChildren(this.holder);
        if (e.team) {
          this.renderCurrentAlliance(e);
          return;
        }
        const t = this.getAlliances();
        if (t.length) {
          t.forEach((t, n) => {
            const i = Yt.generateElement({
              class: "allianceItem",
              style: "color:" + (t.sid === e.team ? "#fff" : "rgba(255,255,255,0.6)"),
              text: String(t.sid),
              parent: this.holder
            });
            Yt.generateElement({
              class: "joinAlBtn",
              text: "Join",
              hookTouch: true,
              parent: i,
              onclick: () => this.onJoin(n)
            });
          });
        } else {
          Yt.generateElement({
            class: "allianceItem",
            text: "No Tribes Yet",
            parent: this.holder
          });
        }
      }
      renderCurrentAlliance(e) {
        if (!this.holder) {
          return;
        }
        const t = this.getAlliancePlayers();
        for (let n = 0; n < t.length; n += 2) {
          const i = t[n];
          const r = t[n + 1];
          const a = Yt.generateElement({
            class: "allianceItem",
            style: "color:" + (i === e.sid ? "#fff" : "rgba(255,255,255,0.6)"),
            text: String(r),
            parent: this.holder
          });
          if (e.isOwner && i !== e.sid) {
            Yt.generateElement({
              class: "joinAlBtn",
              text: "Kick",
              hookTouch: true,
              parent: a,
              onclick: () => this.onKick(i)
            });
          }
        }
      }
      renderManager(e) {
        if (!this.manager) {
          return;
        }
        Yt.removeAllChildren(this.manager);
        if (e.team) {
          Yt.generateElement({
            class: "allianceButtonM",
            style: "width: 360px",
            text: e.isOwner ? "Delete Tribe" : "Leave Tribe",
            hookTouch: true,
            parent: this.manager,
            onclick: () => this.onLeave()
          });
          return;
        }
        const t = Yt.generateElement({
          tag: "input",
          type: "text",
          id: "allianceInput",
          maxLength: 7,
          placeholder: "unique name",
          parent: this.manager,
          ontouchstart: e => {
            e.preventDefault();
            const t = e.currentTarget;
            const n = prompt("unique name", t.value) || "";
            t.value = n.slice(0, 7);
          }
        });
        Yt.generateElement({
          tag: "div",
          class: "allianceButtonM",
          style: "width: 140px;",
          text: "Create",
          hookTouch: true,
          parent: this.manager,
          onclick: () => {
            this.onCreate(t.value);
          }
        });
      }
      focusAllianceInput() {
        if (!this.manager) {
          return;
        }
        const e = this.manager.querySelector("#allianceInput");
        if (e) {
          e.focus();
        }
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  const Zt = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class {
      constructor(e) {
        n(this, "holder");
        n(this, "hats");
        n(this, "utils");
        n(this, "storeBuy");
        n(this, "storeEquip");
        n(this, "registerHatEquipInput");
        n(this, "getPlayer");
        n(this, "showItemInfo");
        n(this, "bindInstantAction");
        this.holder = e.holder;
        this.hats = e.hats;
        this.utils = e.utils;
        this.storeBuy = e.storeBuy;
        this.storeEquip = e.storeEquip;
        this.registerHatEquipInput = e.registerHatEquipInput;
        this.getPlayer = e.getPlayer;
        this.showItemInfo = e.showItemInfo;
        this.bindInstantAction = e.bindInstantAction;
      }
      render(e) {
        const t = this.getPlayer();
        if (t && this.holder) {
          this.utils.removeAllChildren(this.holder);
          this.hats.forEach((e, n) => {
            if (e.dontSell) {
              return;
            }
            const i = this.utils.generateElement({
              id: "storeDisplay" + n,
              class: "storeItem",
              parent: this.holder,
              onmouseout: () => this.showItemInfo(),
              onmouseover: () => this.showItemInfo(e, false, true)
            });
            this.utils.hookTouchEvents(i, true);
            this.utils.generateElement({
              tag: "img",
              class: "hatPreview",
              parent: i,
              src: "../img/hats/hat_" + e.id + (e.topSprite ? "_p" : "") + ".png"
            });
            this.utils.generateElement({
              tag: "span",
              text: e.name,
              parent: i
            });
            this.appendActionButton(i, e, t);
          });
        }
      }
      appendActionButton(e, t, n) {
        const i = n.skins[t.id];
        const r = n.skinIndex === t.id;
        if (!i) {
          const n = this.utils.generateElement({
            class: "joinAlBtn",
            style: "margin-top: 5px",
            text: "Buy",
            hookTouch: true,
            parent: e
          });
          this.bindInstantAction(n, e => {
            this.storeBuy(t.id, 0);
          });
          this.utils.generateElement({
            tag: "span",
            class: "itemPrice",
            text: String(t.price),
            parent: e
          });
          return;
        }
        const a = r ? "Unequip" : "Equip";
        const s = this.utils.generateElement({
          class: "joinAlBtn",
          style: "margin-top: 5px",
          text: a,
          hookTouch: true,
          parent: e
        });
        this.bindInstantAction(s, e => {
          const n = !!(i = e) && !!i.isTrusted && (typeof PointerEvent != "undefined" && i instanceof PointerEvent ? i.pointerType === "mouse" && i.button === 0 : i instanceof MouseEvent && i.button === 0);
          var i;
          if (typeof this.registerHatEquipInput == "function") {
            this.registerHatEquipInput(n);
          }
          const a = r ? 0 : t.id;
          this.storeEquip(a, 0);
        });
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  const Qt = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class {
      constructor(e) {
        n(this, "menu");
        n(this, "storeUI");
        n(this, "allianceMenu");
        n(this, "closeChat");
        n(this, "utils");
        n(this, "getPlayer");
        n(this, "currentIndex", 0);
        n(this, "tabsInitialized", false);
        this.menu = e.menu;
        this.storeUI = e.storeUI;
        this.allianceMenu = e.allianceMenu;
        this.closeChat = e.closeChat;
        this.utils = e.utils;
        this.getPlayer = e.getPlayer;
      }
      initTabs() {
        if (!this.tabsInitialized && this.menu) {
          this.menu.querySelectorAll(".storeTab").forEach(e => {
            const t = Number(e.dataset.storeIndex);
            if (!Number.isFinite(t)) {
              return;
            }
            const n = this.utils.checkTrusted(() => {
              this.changeIndex(t);
            });
            e.addEventListener("click", n);
            this.utils.hookTouchEvents(e);
          });
          this.tabsInitialized = true;
        }
      }
      toggleMenu() {
        if (this.menu) {
          if (this.menu.style.display !== "block") {
            this.menu.style.display = "block";
            if (this.allianceMenu) {
              this.allianceMenu.style.display = "none";
            }
            this.closeChat();
            this.renderStore();
            this.updateTabs();
            return;
          } else {
            this.menu.style.display = "none";
            return;
          }
        }
      }
      updateItems(e, t, n) {
        const i = this.getPlayer();
        if (i) {
          if (!n) {
            if (e) {
              i.skinIndex = t;
            } else {
              i.skins[t] = 1;
            }
            if (this.menu && this.menu.style.display === "block") {
              this.renderStore();
            }
          }
        }
      }
      changeIndex(e) {
        if (this.currentIndex !== e) {
          this.currentIndex = e;
          this.renderStore();
          this.updateTabs();
        }
      }
      renderStore() {
        this.storeUI.render(this.currentIndex);
      }
      updateTabs() {
        if (this.menu) {
          this.menu.querySelectorAll(".storeTab, .overlay-tab").forEach((e, t) => {
            if (t === this.currentIndex) {
              e.classList.add("active");
            } else {
              e.classList.remove("active");
            }
          });
        }
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  const $t = e => Boolean(e && e.disabled);
  let en = class {
    constructor(e) {
      n(this, "deps");
      n(this, "document");
      this.deps = e;
      this.document = e.documentRef || document;
    }
    buildActionBar() {
      const {
        actionBar: e,
        itemsData: t,
        utils: n
      } = this.deps;
      if (!e || !t) {
        return;
      }
      n.removeAllChildren(e);
      const i = t.weapons.length + t.list.length;
      for (let t = 0; t < i; t++) {
        n.generateElement({
          id: "actionBarItem" + t,
          class: "actionBarItem",
          style: "display:none",
          onmouseout: () => {
            this.deps.showItemInfo();
          },
          parent: e
        });
      }
      for (let e = 0; e < i; e++) {
        const n = this.document.getElementById("actionBarItem" + e);
        if (!n) {
          continue;
        }
        const i = this.document.createElement("canvas");
        i.width = 66;
        i.height = 66;
        const r = i.getContext("2d");
        if (!r) {
          continue;
        }
        r.translate(i.width / 2, i.height / 2);
        r.imageSmoothingEnabled = false;
        r.webkitImageSmoothingEnabled = false;
        r.mozImageSmoothingEnabled = false;
        const a = t.weapons[e];
        if (a) {
          if ($t(a)) {
            n.style.display = "none";
            continue;
          }
          this.drawWeaponSlot(e, a, i, r, n);
        } else {
          const a = e - t.weapons.length;
          const s = t.list[a];
          if (s && !$t(s)) {
            this.drawPlaceableSlot(a, s, i, r, n);
          } else {
            n.style.display = "none";
          }
        }
      }
    }
    updatePlayerItems(e) {
      if (!e || !e.weapons || !e.items) {
        return;
      }
      const {
        itemsData: t
      } = this.deps;
      if (!t) {
        return;
      }
      const n = t.weapons.length;
      for (let i = 0; i < t.list.length; i++) {
        const r = n + i;
        const a = this.document.getElementById("actionBarItem" + r);
        if (!a) {
          continue;
        }
        const s = t.list[i];
        if (!s || $t(s)) {
          a.style.display = "none";
          continue;
        }
        const o = e.items.indexOf(s.id) >= 0;
        a.style.display = o ? "inline-block" : "none";
      }
      for (let n = 0; n < t.weapons.length; n++) {
        const i = this.document.getElementById("actionBarItem" + n);
        if (!i) {
          continue;
        }
        const r = t.weapons[n];
        if (!r || $t(r) || r.type === undefined) {
          i.style.display = "none";
          continue;
        }
        const a = Array.isArray(e.weapons) && e.weapons.indexOf(r.id) >= 0;
        i.style.display = a ? "inline-block" : "none";
      }
    }
    drawWeaponSlot(e, t, n, i, r) {
      const a = new Image();
      this.deps.toolSprites[t.src] = a;
      a.onload = () => {
        a.isLoaded = true;
        this.renderImageIcon(a, n, i, r, {
          rotation: Math.PI / 4 + Math.PI,
          multiplier: t.iPad || 1
        });
      };
      a.src = this.getWeaponImagePath(t.src);
      r.onmouseover = this.deps.utils.checkTrusted(() => {
        this.deps.showItemInfo(t, true);
      });
      r.onclick = this.deps.utils.checkTrusted(t => {
        this.deps.selectToBuild(e, true, {
          source: "actionBarWeapon",
          event: t
        });
      });
      this.deps.utils.hookTouchEvents(r);
    }
    drawPlaceableSlot(e, t, n, i, r) {
      const a = this.deps.placeableRenderer;
      r.style.backgroundImage = "url(.././ui/inventorySlot.png)";
      const s = () => {
        this.drawItemSpriteIcon(t, n, i, r);
      };
      let o = false;
      if (a) {
        const e = this.resolveCustomIconPath(t) || a.resolveImagePath(t);
        if (e) {
          this.drawPlaceableImageIcon(e, n, i, r, s);
          o = true;
        }
      }
      if (!o) {
        s();
      }
      r.onmouseover = this.deps.utils.checkTrusted(() => {
        this.deps.showItemInfo(t);
      });
      r.onclick = this.deps.utils.checkTrusted(t => {
        this.deps.selectToBuild(e, undefined, {
          source: "actionBarPlaceable",
          event: t
        });
      });
      this.deps.utils.hookTouchEvents(r);
    }
    renderImageIcon(e, t, n, i, r) {
      if (!e) {
        return;
      }
      const a = r && typeof r.multiplier == "number" && r.multiplier > 0 ? r.multiplier : 1;
      const s = r && typeof r.rotation == "number" ? r.rotation : 0;
      const o = e.height ? e.width / e.height : 1;
      const l = this.captureSmoothingState(n);
      this.setImageSmoothing(n, true);
      n.save();
      if (s) {
        n.rotate(s);
      }
      n.drawImage(e, -t.width * a * this.deps.config.iconPad * o / 2, -t.height * a * this.deps.config.iconPad / 2, t.width * a * o * this.deps.config.iconPad, t.height * a * this.deps.config.iconPad);
      n.restore();
      n.fillStyle = "rgba(0, 0, 70, 0.1)";
      n.globalCompositeOperation = "source-atop";
      n.fillRect(-t.width / 2, -t.height / 2, t.width, t.height);
      n.globalCompositeOperation = "source-over";
      this.restoreImageSmoothing(n, l);
      i.style.backgroundImage = "url(" + t.toDataURL() + "), url(.././ui/inventorySlot.png)";
    }
    drawPlaceableImageIcon(e, t, n, i, r) {
      const a = new Image();
      a.onload = () => {
        a.isLoaded = true;
        this.renderImageIcon(a, t, n, i);
      };
      a.onerror = () => {
        r();
      };
      a.src = e;
    }
    drawItemSpriteIcon(e, t, n, i) {
      const r = this.deps.getItemSprite;
      if (typeof r != "function") {
        i.style.backgroundImage = "url(.././ui/inventorySlot.png)";
        return;
      }
      const a = r(e, true, false);
      if (!a) {
        i.style.backgroundImage = "url(.././ui/inventorySlot.png)";
        return;
      }
      const s = new Image();
      s.onload = () => {
        s.isLoaded = true;
        this.renderImageIcon(s, t, n, i);
      };
      s.onerror = () => {
        i.style.backgroundImage = "url(.././ui/inventorySlot.png)";
      };
      s.src = a.toDataURL();
    }
    resolveCustomIconPath(e) {
      if (!e || typeof e.name != "string") {
        return null;
      }
      const t = e.name.toLowerCase();
      if (t.indexOf("windmill") !== -1 || t.indexOf("power mill") !== -1) {
        return ".././img/items/mill_complete.png";
      } else {
        return null;
      }
    }
    getWeaponImagePath(e) {
      return ".././img/newweapons/" + e + ".png";
    }
    captureSmoothingState(e) {
      if (!e) {
        return null;
      }
      const t = e;
      return {
        standard: typeof e.imageSmoothingEnabled == "boolean" ? e.imageSmoothingEnabled : undefined,
        webkit: typeof t.webkitImageSmoothingEnabled == "boolean" ? t.webkitImageSmoothingEnabled : undefined,
        moz: typeof t.mozImageSmoothingEnabled == "boolean" ? t.mozImageSmoothingEnabled : undefined
      };
    }
    setImageSmoothing(e, t) {
      if (!e) {
        return;
      }
      const n = e;
      if ("imageSmoothingEnabled" in e) {
        e.imageSmoothingEnabled = t;
      }
      if ("webkitImageSmoothingEnabled" in n) {
        n.webkitImageSmoothingEnabled = t;
      }
      if ("mozImageSmoothingEnabled" in n) {
        n.mozImageSmoothingEnabled = t;
      }
    }
    restoreImageSmoothing(e, t) {
      if (!e) {
        return;
      }
      const n = t || {};
      const i = e;
      if ("imageSmoothingEnabled" in e) {
        e.imageSmoothingEnabled = typeof n.standard == "boolean" && n.standard;
      }
      if ("webkitImageSmoothingEnabled" in i) {
        i.webkitImageSmoothingEnabled = typeof n.webkit == "boolean" && n.webkit;
      }
      if ("mozImageSmoothingEnabled" in i) {
        i.mozImageSmoothingEnabled = typeof n.moz == "boolean" && n.moz;
      }
    }
  };
  const tn = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: en
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  const nn = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class {
      constructor(e) {
        n(this, "document");
        n(this, "sendPerformanceStatsFn");
        n(this, "pingSocketFn");
        n(this, "getPlayer");
        n(this, "socketReady");
        n(this, "getEntityCountsFn");
        n(this, "performanceDisplay", null);
        n(this, "pingValueElement", null);
        n(this, "cpsValueElement", null);
        n(this, "fpsValueElement", null);
        n(this, "packetValueElement", null);
        n(this, "showPing", false);
        n(this, "lastPing", -1);
        n(this, "fpsCounter", 0);
        n(this, "lastFpsTime", Date.now());
        n(this, "packetCounter", 0);
        n(this, "packetCounterDisplay", 0);
        n(this, "lastPacketTime", Date.now());
        n(this, "clickTimestamps", []);
        n(this, "clientCps", 0);
        n(this, "statsDirty", true);
        n(this, "lastStatsSent", 0);
        n(this, "statsSendInterval", 200);
        n(this, "fpsHistory", []);
        n(this, "FPS_HISTORY_MAX", 30);
        n(this, "lastFrameTimestamp", 0);
        n(this, "smoothedFrameTimeMs", 0);
        n(this, "worstFrameTimeMs", 0);
        n(this, "frameResetCounter", 0);
        n(this, "currentPingMs", -1);
        n(this, "pingHistory", []);
        n(this, "PING_HISTORY_MAX", 20);
        n(this, "showPerfOverlay", false);
        n(this, "perfOverlayEl", null);
        n(this, "lastOverlayUpdate", 0);
        n(this, "OVERLAY_UPDATE_INTERVAL", 500);
        n(this, "povFpsCur", null);
        n(this, "povFpsAvg", null);
        n(this, "povFpsLow", null);
        n(this, "povFpsP1", null);
        n(this, "povFrameTime", null);
        n(this, "povPing", null);
        n(this, "povPingAvg", null);
        n(this, "povPackets", null);
        n(this, "povPlayers", null);
        n(this, "povAnimals", null);
        n(this, "povObjects", null);
        n(this, "povProjectiles", null);
        n(this, "povMemory", null);
        this.document = e.documentRef;
        this.sendPerformanceStatsFn = e.sendPerformanceStats;
        this.pingSocketFn = e.pingSocket;
        this.getPlayer = e.getPlayer;
        this.socketReady = e.socketReady;
        this.getEntityCountsFn = e.getEntityCounts || null;
      }
      init() {
        this.performanceDisplay = this.document.getElementById("performanceDisplay");
        this.pingValueElement = this.document.getElementById("pingValue");
        this.cpsValueElement = this.document.getElementById("cpsValue");
        this.fpsValueElement = this.document.getElementById("fpsValue");
        this.packetValueElement = this.document.getElementById("packetValue");
        this.perfOverlayEl = this.document.getElementById("perfOverlay");
        this.povFpsCur = this.document.getElementById("povFpsCur");
        this.povFpsAvg = this.document.getElementById("povFpsAvg");
        this.povFpsLow = this.document.getElementById("povFpsLow");
        this.povFpsP1 = this.document.getElementById("povFpsP1");
        this.povFrameTime = this.document.getElementById("povFrameTime");
        this.povPing = this.document.getElementById("povPing");
        this.povPingAvg = this.document.getElementById("povPingAvg");
        this.povPackets = this.document.getElementById("povPackets");
        this.povPlayers = this.document.getElementById("povPlayers");
        this.povAnimals = this.document.getElementById("povAnimals");
        this.povObjects = this.document.getElementById("povObjects");
        this.povProjectiles = this.document.getElementById("povProjectiles");
        this.povMemory = this.document.getElementById("povMemory");
        this.updatePerformancePanelVisibility();
        this.updateOverlayVisibility();
      }
      setShowPing(e) {
        this.showPing = e;
        this.updatePerformancePanelVisibility();
      }
      setShowPerfOverlay(e) {
        this.showPerfOverlay = e;
        this.updateOverlayVisibility();
      }
      resetStats() {
        this.clickTimestamps.length = 0;
        this.clientCps = 0;
        this.statsDirty = true;
        this.fpsHistory.length = 0;
        this.pingHistory.length = 0;
        this.smoothedFrameTimeMs = 0;
        this.worstFrameTimeMs = 0;
        this.frameResetCounter = 0;
        this.updateClientCps(Date.now());
      }
      incrementPacketCounter() {
        this.packetCounter++;
      }
      recordClickEvent() {
        const e = Date.now();
        this.clickTimestamps.push(e);
        this.updateClientCps(e);
        this.statsDirty = true;
        this.trySendPlayerStats(e);
      }
      updateFrame() {
        const e = Date.now();
        if (this.lastFrameTimestamp > 0) {
          const t = e - this.lastFrameTimestamp;
          this.smoothedFrameTimeMs = this.smoothedFrameTimeMs === 0 ? t : this.smoothedFrameTimeMs * 0.95 + t * 0.05;
          if (t > this.worstFrameTimeMs) {
            this.worstFrameTimeMs = t;
          }
        }
        this.lastFrameTimestamp = e;
        if (++this.frameResetCounter > 300) {
          this.worstFrameTimeMs = 0;
          this.frameResetCounter = 0;
        }
        this.fpsCounter++;
        if (e - this.lastFpsTime >= 1000) {
          const t = this.fpsCounter;
          if (this.fpsValueElement) {
            this.fpsValueElement.textContent = String(t);
          }
          this.fpsHistory.push(t);
          if (this.fpsHistory.length > this.FPS_HISTORY_MAX) {
            this.fpsHistory.shift();
          }
          this.fpsCounter = 0;
          this.lastFpsTime = e;
        }
        if (e - this.lastPacketTime >= 1000) {
          this.packetCounterDisplay = this.packetCounter;
          this.packetCounter = 0;
          this.lastPacketTime = e;
          if (this.packetValueElement) {
            this.packetValueElement.textContent = this.packetCounterDisplay + "/s";
          }
        }
        this.updateClientCps(e);
        this.trySendPlayerStats(e);
        if (this.showPerfOverlay && e - this.lastOverlayUpdate >= this.OVERLAY_UPDATE_INTERVAL) {
          this.lastOverlayUpdate = e;
          this.updatePerfOverlay();
        }
      }
      markPingSent() {
        this.lastPing = Date.now();
      }
      handlePingResponse() {
        if (this.lastPing < 0) {
          return;
        }
        const e = Date.now() - this.lastPing;
        this.currentPingMs = e;
        window.pingTime = e;
        if (this.pingValueElement) {
          this.pingValueElement.textContent = e + "ms";
        }
        this.pingHistory.push(e);
        if (this.pingHistory.length > this.PING_HISTORY_MAX) {
          this.pingHistory.shift();
        }
        this.statsDirty = true;
      }
      sendPing() {
        this.markPingSent();
        this.pingSocketFn();
      }
      updatePerformancePanelVisibility() {
        if (this.performanceDisplay) {
          this.performanceDisplay.style.display = this.showPing ? "flex" : "none";
        }
      }
      updateOverlayVisibility() {
        if (this.perfOverlayEl) {
          this.perfOverlayEl.style.display = this.showPerfOverlay ? "block" : "none";
        }
      }
      pruneClickTimestamps(e) {
        const t = e - 1000;
        while (this.clickTimestamps.length && this.clickTimestamps[0] < t) {
          this.clickTimestamps.shift();
        }
      }
      updateClientCps(e) {
        this.pruneClickTimestamps(e);
        this.clientCps = this.clickTimestamps.length;
        if (this.cpsValueElement) {
          this.cpsValueElement.textContent = String(Math.max(0, Math.round(this.clientCps)));
        }
      }
      trySendPlayerStats(e) {
        if (!this.socketReady()) {
          return;
        }
        if (!this.getPlayer() || !this.statsDirty) {
          return;
        }
        if (e - this.lastStatsSent < this.statsSendInterval) {
          return;
        }
        this.updateClientCps(e);
        const t = typeof window.pingTime == "number" && window.pingTime >= 0 ? Math.round(window.pingTime) : -1;
        this.sendPerformanceStatsFn(this.clientCps, t);
        this.statsDirty = false;
        this.lastStatsSent = e;
      }
      updatePerfOverlay() {
        const e = this.fpsHistory;
        const t = e.length > 0 ? e[e.length - 1] : 0;
        const n = e.length > 0 ? Math.round(e.reduce((e, t) => e + t, 0) / e.length) : 0;
        const i = e.length > 0 ? Math.min(...e) : 0;
        const r = e.slice().sort((e, t) => e - t);
        const a = Math.max(1, Math.ceil(r.length * 0.01));
        const s = r.length > 0 ? Math.round(r.slice(0, a).reduce((e, t) => e + t, 0) / a) : 0;
        if (this.povFpsCur) {
          this.povFpsCur.textContent = String(t);
        }
        if (this.povFpsAvg) {
          this.povFpsAvg.textContent = String(n);
        }
        if (this.povFpsLow) {
          this.povFpsLow.textContent = String(i);
        }
        if (this.povFpsP1) {
          this.povFpsP1.textContent = String(s);
        }
        if (this.povFrameTime) {
          this.povFrameTime.textContent = this.smoothedFrameTimeMs > 0 ? this.smoothedFrameTimeMs.toFixed(1) + "ms" : "--ms";
        }
        const o = this.pingHistory;
        if (this.povPing) {
          this.povPing.textContent = this.currentPingMs >= 0 ? this.currentPingMs + "ms" : "--ms";
        }
        if (this.povPingAvg) {
          this.povPingAvg.textContent = o.length > 0 ? Math.round(o.reduce((e, t) => e + t, 0) / o.length) + "ms" : "--ms";
        }
        if (this.povPackets) {
          this.povPackets.textContent = this.packetCounterDisplay + "/s";
        }
        if (this.getEntityCountsFn) {
          const e = this.getEntityCountsFn();
          if (this.povPlayers) {
            this.povPlayers.textContent = String(e.players);
          }
          if (this.povAnimals) {
            this.povAnimals.textContent = String(e.animals);
          }
          if (this.povObjects) {
            this.povObjects.textContent = String(e.gameObjects);
          }
          if (this.povProjectiles) {
            this.povProjectiles.textContent = String(e.projectiles);
          }
        }
        const l = performance.memory;
        if (this.povMemory) {
          if (l) {
            const e = (l.usedJSHeapSize / 1048576).toFixed(1);
            const t = (l.totalJSHeapSize / 1048576).toFixed(1);
            this.povMemory.textContent = e + "/" + t + "MB";
          } else {
            this.povMemory.textContent = "N/A";
          }
        }
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  function rn(e, t) {
    if (e && t) {
      for (var n = Object.keys(e), i = 0; i < n.length; ++i) {
        if (n[i].indexOf(t + "|") === 0) {
          delete e[n[i]];
        }
      }
    }
  }
  var an = {
    canUseCachedImage: function (e) {
      return !!e && !!e.isLoaded && !e.isBroken && e.naturalWidth !== 0;
    },
    clearSpriteCacheByPrefix: rn,
    getOrCreateCachedImage: function (e, t, n) {
      if (typeof t != "string" || !t.length) {
        return null;
      }
      var i = e[t];
      if (i) {
        if (i && i.img) {
          if (i.img.isLoaded === undefined) {
            i.img.isLoaded = !!i.isLoaded;
          }
          if (i.img.isBroken === undefined) {
            i.img.isBroken = !!i.isBroken;
          }
        }
      } else {
        var r = typeof n == "function" ? n() : new Image();
        r.isLoaded = false;
        r.isBroken = false;
        i = {
          img: r,
          isLoaded: false,
          isBroken: false
        };
        r.onload = function () {
          r.isLoaded = true;
          r.isBroken = false;
          i.isLoaded = true;
          i.isBroken = false;
        };
        r.onerror = function () {
          r.isLoaded = false;
          r.isBroken = true;
          i.isLoaded = false;
          i.isBroken = true;
        };
        r.src = t;
        e[t] = i;
      }
      return i.img;
    },
    getOrCreateImageBase: function (e, t, n, i, r, a) {
      if (typeof i != "string" || !i.length) {
        return null;
      }
      var s = e[n];
      if (!s || s.path !== i) {
        var o = typeof r == "function" ? r() : new Image();
        var l = a && a.cacheKeyPrefix ? a.cacheKeyPrefix : n;
        s = {
          img: o,
          path: i,
          cacheKey: l + "|" + i,
          failed: false
        };
        o.onload = function () {
          this.isLoaded = true;
          if (a && a.onLoad) {
            a.onLoad(s);
          }
        };
        o.onerror = function () {
          s.failed = true;
        };
        o.src = i;
        e[n] = s;
        if (a && a.clearOnCreate) {
          rn(t, a.clearKeyPrefix || s.cacheKey);
        }
      }
      return s;
    },
    getOrCreateSpriteCanvas: function (e, t, n, i, r) {
      if (!e || !t || !n || typeof r != "function") {
        return null;
      }
      var a = e[t];
      if (a) {
        return a;
      }
      var s = (i || document).createElement("canvas");
      s.width = s.height = n;
      var o = s.getContext("2d");
      if (o) {
        r(o, s);
      }
      e[t] = s;
      return s;
    }
  };
  const sn = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class {
      constructor(e) {
        n(this, "config");
        n(this, "itemsData");
        n(this, "document");
        n(this, "placeableImageSizeMultiplier");
        n(this, "placeableImageSizeKey");
        n(this, "placeableImageScaleKey");
        n(this, "placeableImageScaleMultiplierKey");
        n(this, "basePath");
        n(this, "imageBases", {});
        n(this, "spriteCache", {});
        this.config = e.config;
        this.itemsData = e.itemsData;
        this.document = e.documentRef || document;
        const t = this.config && typeof this.config.placeableImages == "object" ? this.config.placeableImages : null;
        const i = t && typeof t.basePath == "string" ? t.basePath : ".././img/items/";
        this.basePath = i ? i.slice(-1) === "/" ? i : i + "/" : null;
        this.placeableImageSizeMultiplier = e.sizeMultiplier ?? (t && typeof t.sizeMultiplier == "number" ? t.sizeMultiplier : 1);
        this.placeableImageScaleKey = e.scaleKey || "imgScale";
        this.placeableImageSizeKey = e.sizeKey || "imgSize";
        this.placeableImageScaleMultiplierKey = e.multiplierKey || "imgScaleMult";
      }
      isPlaceableItem(e) {
        return !!e && !!e.group && !!e.group.place;
      }
      resolveImagePath(e) {
        if (!e) {
          return null;
        }
        let t = null;
        if (typeof e.imgPath == "string" && e.imgPath.length) {
          t = e.imgPath;
        } else if (typeof e.id == "number" && this.itemsData && this.itemsData.list[e.id]) {
          const n = this.itemsData.list[e.id];
          if (n && typeof n.imgPath == "string" && n.imgPath.length) {
            t = n.imgPath;
          }
        } else if (typeof e.spritePath == "string" && e.spritePath.length) {
          t = e.spritePath;
        }
        if (!t) {
          return null;
        }
        const n = t.trim();
        if (n.length) {
          if (/^(?:\.\.\/|\.\/|\/|https?:)/i.test(n)) {
            return n;
          } else if (this.basePath) {
            return this.basePath + n;
          } else {
            return n;
          }
        } else {
          return null;
        }
      }
      resolveDrawSize(e, t, n) {
        const i = Math.max(1, e && e.scale ? e.scale : 1);
        const r = this.itemsData.list && typeof e.id == "number" ? this.itemsData.list[e.id] : null;
        const a = r && typeof r[this.placeableImageSizeKey] == "number" ? r[this.placeableImageSizeKey] : null;
        const s = r && typeof r[this.placeableImageScaleKey] == "number" ? r[this.placeableImageScaleKey] : 1;
        const o = e && typeof e.sizeMult == "number" ? e.sizeMult : null;
        const l = e && typeof e[this.placeableImageScaleMultiplierKey] == "number" ? e[this.placeableImageScaleMultiplierKey] : null;
        const c = r && typeof r.sizeMult == "number" ? r.sizeMult : null;
        const u = r && typeof r[this.placeableImageScaleMultiplierKey] == "number" ? r[this.placeableImageScaleMultiplierKey] : null;
        const d = o ?? l ?? c ?? u ?? 1;
        const h = n ? i * 2.5 : i * 2 * this.placeableImageSizeMultiplier;
        const p = t || a || h * s * d;
        return Math.max(1, Math.round(p));
      }
      getSprite(e, t) {
        const n = this.resolveImagePath(e);
        const i = n ? this.getOrCreateImageBase(n) : null;
        const r = this.resolveDrawSize(e, t, false);
        if (!i || i.failed || !i.img || !i.img.isLoaded) {
          return null;
        }
        const a = i.cacheKey + "|" + r;
        return an.getOrCreateSpriteCanvas(this.spriteCache, a, r, this.document, e => {
          e.drawImage(i.img, 0, 0, r, r);
        });
      }
      clearSpriteCache(e) {
        if (!e) {
          for (const e of Object.keys(this.spriteCache)) {
            delete this.spriteCache[e];
          }
          return;
        }
        const t = e + "|";
        for (const e of Object.keys(this.spriteCache)) {
          if (e.indexOf(t) === 0) {
            delete this.spriteCache[e];
          }
        }
      }
      getOrCreateImageBase(e) {
        if (e) {
          return an.getOrCreateImageBase(this.imageBases, this.spriteCache, e, e, () => new Image(), {
            cacheKeyPrefix: "placeable",
            clearOnCreate: true
          });
        } else {
          return null;
        }
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  const on = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class {
      constructor(e) {
        n(this, "config");
        n(this, "biomeHelper");
        n(this, "biomeBands");
        n(this, "colors");
        n(this, "mapScale");
        n(this, "snowRegions");
        this.config = e.config;
        this.biomeHelper = e.biomeHelper;
        this.biomeBands = e.biomeBands || [];
        this.colors = e.colors || {};
        this.mapScale = e.mapScale;
        this.snowRegions = Array.isArray(e.snowRegions) ? e.snowRegions : [];
      }
      renderBackground(e, t, n, i, r) {
        if (!e) {
          return;
        }
        const a = this.colors.winter || (this.biomeBands.length ? this.biomeHelper.colorForBiome(this.biomeBands[0].name) : null) || "#E8E1DE";
        e.fillStyle = a;
        e.fillRect(0, 0, t, n);
        for (const i of this.biomeBands) {
          if (!i) {
            continue;
          }
          const a = i.start - r;
          const s = i.end - r;
          if (s <= 0 || a >= n) {
            continue;
          }
          const o = Math.max(0, a);
          const l = Math.min(n, s);
          e.fillStyle = this.biomeHelper.colorForBiome(i.name);
          e.fillRect(0, o, t, l - o);
        }
      }
      renderMinimapBands(e, t, n, i = 0.32) {
        if (e) {
          e.save();
          for (const r of this.biomeBands) {
            if (!r) {
              continue;
            }
            const a = r.start / this.mapScale * n;
            const s = r.end / this.mapScale * n;
            const o = Math.max(1, s - a);
            e.fillStyle = this.biomeHelper.colorForBiome(r.name);
            e.globalAlpha = i;
            e.fillRect(0, a, t, o);
          }
          e.restore();
        }
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  const ln = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class {
      constructor(e) {
        n(this, "biomeHelper");
        n(this, "riverSettings");
        n(this, "colors");
        n(this, "mapScale");
        this.biomeHelper = e.biomeHelper;
        this.riverSettings = e.riverSettings || {};
        this.colors = e.colors || {};
        this.mapScale = e.mapScale;
      }
      renderMainRiver(e, t, n, i, r) {
        if (!e) {
          return;
        }
        const a = this.colors.beach || "#FFEAAD";
        const s = this.colors.river || "#4A85A5";
        this.strokeRiverChannels(e, t, n, i, a, e => {
          if (!e.beachSize) {
            return 0;
          }
          const t = Math.max(0, Math.min(1, e.width / this.riverSettings.width));
          const n = (e.beachSize * 2 + (this.riverSettings.padding || 0)) * t;
          return e.width + n;
        }, 1, e => (e.beachSize || 0) > 0);
        this.strokeRiverChannels(e, t, n, i, s, e => e.width * r, 1);
      }
      renderMinimapRivers(e, t, n) {
        if (!e) {
          return;
        }
        const i = Math.max(6, Math.floor(t / 18));
        const r = this.biomeHelper.river || {};
        const a = ((r.maxChannelWidth || this.riverSettings.width) + r.beachSize * 2 + (this.riverSettings.padding || 0)) / this.mapScale * n;
        const s = this.colors.beach || "#FFEAAD";
        const o = this.colors.river || "#4A85A5";
        this.strokeMiniChannels(e, t, n, i, a, s, e => {
          if (!e.beachSize) {
            return 0;
          }
          const t = Math.max(0, Math.min(1, e.width / this.riverSettings.width));
          const n = (e.beachSize * 2 + (this.riverSettings.padding || 0)) * t;
          return e.width + n;
        }, 0.45, e => (e.beachSize || 0) > 0);
        this.strokeMiniChannels(e, t, n, i, a, o, e => e.width, 0.5);
      }
      strokeRiverChannels(e, t, n, i, r, a, s = 1, o) {
        const l = this.biomeHelper.river || {};
        const c = (l.maxChannelWidth || this.riverSettings.width) + l.beachSize * 2 + (this.riverSettings.padding || 0);
        const u = Math.max(32, Math.floor(t / 10));
        const d = -c;
        const h = t + c;
        e.save();
        e.strokeStyle = r;
        e.globalAlpha = s;
        e.lineCap = "round";
        e.lineJoin = "round";
        const p = {};
        for (let t = d; t <= h; t += u) {
          const r = t + n;
          const s = this.biomeHelper.getRiverChannels(r);
          const l = {};
          for (const n of s) {
            if (o && !o(n, r)) {
              continue;
            }
            const s = a(n, r);
            if (!s || s <= 0) {
              continue;
            }
            const c = String(n.id);
            l[c] = true;
            const u = p[c] ||= {};
            const d = n.centerY - i;
            if (u.prevX === undefined) {
              u.prevX = t;
              u.prevY = d;
              u.prevWidth = s;
            } else {
              const n = ((u.prevWidth || 0) + s) / 2;
              e.lineWidth = n;
              e.beginPath();
              e.moveTo(u.prevX, u.prevY);
              e.lineTo(t, d);
              e.stroke();
              u.prevX = t;
              u.prevY = d;
              u.prevWidth = s;
            }
          }
          for (const e in p) {
            if (Object.prototype.hasOwnProperty.call(p, e)) {
              if (!l[e]) {
                p[e].prevX = undefined;
              }
            }
          }
        }
        e.restore();
      }
      strokeMiniChannels(e, t, n, i, r, a, s, o, l) {
        if (!a) {
          return;
        }
        e.save();
        e.strokeStyle = a;
        e.globalAlpha = o;
        e.lineCap = "round";
        e.lineJoin = "round";
        const c = -r;
        const u = t + r;
        const d = {};
        const h = Math.max(4, Math.floor(i / 2));
        for (let e = c; e <= u; e += h) {
          const i = e / t * this.mapScale;
          const r = this.biomeHelper.getRiverChannels(i);
          for (const t of r) {
            if (l && !l(t)) {
              continue;
            }
            const r = s(t, i);
            if (!r || r <= 0) {
              continue;
            }
            const a = r / this.mapScale * n;
            if (a <= 0) {
              continue;
            }
            const o = t.centerY / this.mapScale * n;
            const c = String(t.id);
            (d[c] = d[c] || []).push({
              x: e,
              y: o,
              w: a
            });
          }
        }
        const p = t => {
          if (!t || t.length < 2) {
            return;
          }
          const n = t.reduce((e, t) => e + t.w, 0) / t.length;
          e.lineWidth = n;
          e.beginPath();
          e.moveTo(t[0].x, t[0].y);
          for (let n = 1; n < t.length - 1; n++) {
            const i = (t[n].x + t[n + 1].x) / 2;
            const r = (t[n].y + t[n + 1].y) / 2;
            e.quadraticCurveTo(t[n].x, t[n].y, i, r);
          }
          const i = t[t.length - 1];
          e.lineTo(i.x, i.y);
          e.stroke();
        };
        for (const e in d) {
          if (Object.prototype.hasOwnProperty.call(d, e)) {
            const t = d[e];
            t.sort((e, t) => e.x - t.x);
            p(t);
          }
        }
        e.restore();
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  var cn = an;
  function un(e) {
    e = e || {};
    this.decorations = [];
    this.layers = Object.create(null);
    this.spriteCache = Object.create(null);
    this.spriteMap = e.spriteMap || {};
    this.getImage = typeof e.getImage == "function" ? e.getImage : null;
    this.defaultSize = 100;
    if (Array.isArray(e.decorations)) {
      this.setDecorations(e.decorations);
    }
  }
  un.prototype.setDecorations = function (e) {
    this.decorations = [];
    this.layers = Object.create(null);
    if (Array.isArray(e)) {
      for (var t = 0; t < e.length; ++t) {
        var n = e[t];
        if (n && typeof n.x == "number" && typeof n.y == "number") {
          var i = typeof n.imgSrc == "string" && n.imgSrc.length ? n.imgSrc : null;
          if (!i && this.spriteMap && n.id !== undefined && n.id !== null) {
            var r = this.spriteMap[n.id];
            if (typeof r == "string" && r.length) {
              i = r;
            }
          }
          if (i) {
            var a = typeof n.size == "number" && n.size > 0 ? n.size : this.defaultSize;
            var s = typeof n.layer == "number" ? n.layer : 0;
            var o = {
              id: n.id || "decoration_" + t,
              x: n.x,
              y: n.y,
              rotation: typeof n.rotation == "number" ? n.rotation : 0,
              size: a,
              imgSrc: i,
              opacity: typeof n.opacity == "number" ? n.opacity : 1
            };
            this.layers[s] ||= [];
            this.layers[s].push(o);
            this.decorations.push(o);
          }
        }
      }
      this._sortLayers();
    }
  };
  un.prototype._sortLayers = function () {
    this.layerOrder = Object.keys(this.layers).map(function (e) {
      return Number(e);
    }).sort(function (e, t) {
      return e - t;
    });
  };
  un.prototype._getSprite = function (e) {
    if (!e || !this.getImage || !e.imgSrc) {
      return null;
    }
    var t = e.imgSrc + "|" + e.size;
    var n = this.getImage(e.imgSrc);
    if (!cn.canUseCachedImage(n)) {
      return null;
    }
    var i = Math.max(1, Math.round(e.size));
    return cn.getOrCreateSpriteCanvas(this.spriteCache, t, i, null, function (e) {
      e.drawImage(n, 0, 0, i, i);
    });
  };
  un.prototype.render = function (e, t) {
    if (e && t && this.layerOrder && this.layerOrder.length) {
      var n = t.xOffset || 0;
      var i = t.yOffset || 0;
      var r = t.width || 0;
      var a = t.height || 0;
      var s = n;
      var o = i;
      var l = n + r;
      var c = i + a;
      var u = typeof t.maxDistance == "number" ? t.maxDistance : null;
      var d = typeof t.centerX == "number" ? t.centerX : s + r / 2;
      var h = typeof t.centerY == "number" ? t.centerY : o + a / 2;
      for (var p = 0; p < this.layerOrder.length; ++p) {
        var m = this.layerOrder[p];
        var f = this.layers[m];
        if (f && f.length) {
          for (var g = 0; g < f.length; ++g) {
            var y = f[g];
            var v = y.size / 2;
            if (!(y.x + v < s) && !(y.x - v > l) && !(y.y + v < o) && !(y.y - v > c)) {
              if (u !== null) {
                var b = u + v;
                var w = y.x - d;
                var k = y.y - h;
                if (w * w + k * k > b * b) {
                  continue;
                }
              }
              var S = this._getSprite(y);
              if (S) {
                e.save();
                e.globalAlpha = y.opacity;
                e.translate(y.x - n, y.y - i);
                if (y.rotation) {
                  e.rotate(y.rotation);
                }
                e.drawImage(S, -y.size / 2, -y.size / 2, y.size, y.size);
                e.restore();
              }
            }
          }
        }
      }
      e.globalAlpha = 1;
    }
  };
  var dn = un;
  const hn = e => Boolean(e && e.disabled);
  const pn = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class {
      constructor(e) {
        n(this, "utils");
        n(this, "documentRef");
        n(this, "upgradeHolder");
        n(this, "upgradeCounter");
        n(this, "itemsData");
        n(this, "getPlayer");
        n(this, "requestUpgradeFn");
        n(this, "itemInfoPanel");
        n(this, "actionBarPrefix");
        this.utils = e.utils;
        this.documentRef = e.documentRef;
        this.upgradeHolder = e.upgradeHolder;
        this.upgradeCounter = e.upgradeCounter;
        this.itemsData = e.itemsData;
        this.getPlayer = e.getPlayer;
        this.requestUpgradeFn = e.requestUpgrade;
        this.itemInfoPanel = e.itemInfoPanel;
        this.actionBarPrefix = e.actionBarPrefix || "actionBarItem";
      }
      updateUpgrades(e, t) {
        const n = this.getPlayer();
        if (!n) {
          this.hidePanel();
          return;
        }
        n.upgradePoints = e;
        n.upgrAge = t;
        if (!this.upgradeHolder || !this.upgradeCounter) {
          return;
        }
        if (!e || e <= 0) {
          this.hidePanel();
          return;
        }
        const i = this.collectEligibleSlots(n, t);
        this.renderUpgradeChoices(i);
        if (i.length) {
          this.upgradeHolder.style.display = "block";
          this.upgradeCounter.style.display = "block";
          this.upgradeCounter.innerHTML = "Select Items (" + e + ")";
        } else {
          this.hidePanel();
        }
      }
      collectEligibleSlots(e, t) {
        const n = [];
        const i = t => {
          if (!t || !Array.isArray(t.requiresAll) || t.requiresAll.length === 0) {
            return true;
          }
          const n = Array.isArray(e.items) ? e.items : [];
          const i = Array.isArray(e.weapons) ? e.weapons : [];
          return t.requiresAll.every(e => n.indexOf(e) >= 0 || i.indexOf(e) >= 0);
        };
        for (let r = 0; r < this.itemsData.weapons.length; r++) {
          const a = this.itemsData.weapons[r];
          if (!a || hn(a)) {
            continue;
          }
          const s = a.age === t;
          const o = a.pre === undefined || e.weapons.indexOf(a.pre) >= 0;
          if (s && o && i(a)) {
            n.push(r);
          }
        }
        for (let r = 0; r < this.itemsData.list.length; r++) {
          const a = this.itemsData.list[r];
          if (!a || hn(a)) {
            continue;
          }
          const s = a.age === t;
          const o = a.pre === undefined || e.items.indexOf(a.pre) >= 0;
          if (s && o && i(a)) {
            n.push(this.itemsData.weapons.length + r);
          }
        }
        return n;
      }
      renderUpgradeChoices(e) {
        if (this.upgradeHolder) {
          this.utils.removeAllChildren(this.upgradeHolder);
          e.forEach(e => {
            const t = this.utils.generateElement({
              id: "upgradeItem" + e,
              class: "actionBarItem",
              onmouseout: () => {
                this.itemInfoPanel.show();
              },
              parent: this.upgradeHolder
            });
            const n = this.documentRef.getElementById(this.actionBarPrefix + e);
            if (n) {
              t.style.backgroundImage = n.style.backgroundImage;
            }
          });
          e.forEach(e => {
            this.bindUpgradeItem(e);
          });
        }
      }
      bindUpgradeItem(e) {
        const t = this.documentRef.getElementById("upgradeItem" + e);
        if (t) {
          t.onmouseover = () => {
            const t = this.itemsData.weapons[e];
            if (t && !hn(t)) {
              this.itemInfoPanel.show(t, {
                isWeapon: true
              });
              return;
            }
            const n = e - this.itemsData.weapons.length;
            const i = this.itemsData.list[n];
            if (i && !hn(i)) {
              this.itemInfoPanel.show(i);
            }
          };
          t.onclick = this.utils.checkTrusted(() => {
            this.requestUpgradeFn(e);
          });
          this.utils.hookTouchEvents(t);
        }
      }
      hidePanel() {
        if (this.upgradeHolder) {
          this.upgradeHolder.style.display = "none";
        }
        if (this.upgradeCounter) {
          this.upgradeCounter.style.display = "none";
        }
        this.itemInfoPanel.show();
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  const mn = [{
    id: "food",
    name: "Food",
    groupIds: [0],
    defaultKey: 81
  }, {
    id: "walls",
    name: "Walls",
    groupIds: [1]
  }, {
    id: "spikes",
    name: "Spikes",
    groupIds: [2]
  }, {
    id: "windmills",
    name: "Windmills",
    groupIds: [3]
  }, {
    id: "trap_boost",
    name: "Trap / Boost Pad",
    groupIds: [5, 6]
  }];
  const fn = [{
    id: "autoAttack",
    name: "Auto Attack",
    defaultKey: 69
  }, {
    id: "lockDir",
    name: "Lock Direction",
    defaultKey: 88
  }, {
    id: "toggleStore",
    name: "Toggle Store Menu",
    defaultKey: 66
  }];
  const gn = {
    up: 87,
    down: 83,
    left: 65,
    right: 68
  };
  const yn = ["up", "down", "left", "right"];
  class vn {
    constructor(e) {
      n(this, "document");
      n(this, "keybindsListItems");
      n(this, "keybindsListMovement");
      n(this, "keybindsListActions");
      n(this, "saveValue");
      n(this, "getValue");
      n(this, "onMovementHotkeysChanged");
      n(this, "itemGroupHotkeys", {});
      n(this, "movementHotkeys", {
        ...gn
      });
      n(this, "actionHotkeys", {});
      n(this, "keybindButtons", Object.create(null));
      n(this, "activeCapture", null);
      n(this, "groupHotkeyLookup", {});
      n(this, "initialized", false);
      this.document = e.document;
      this.keybindsListItems = e.keybindsListItems;
      this.keybindsListMovement = e.keybindsListMovement;
      this.keybindsListActions = e.keybindsListActions;
      this.saveValue = e.saveValue;
      this.getValue = e.getValue;
      this.onMovementHotkeysChanged = e.onMovementHotkeysChanged;
    }
    initialize() {
      if (!this.initialized) {
        this.itemGroupHotkeys = this.loadItemGroupHotkeys();
        this.actionHotkeys = this.loadActionHotkeys();
        this.movementHotkeys = this.loadMovementHotkeys();
        this.groupHotkeyLookup = this.buildItemHotkeyLookup();
        this.initialized = true;
      }
      this.notifyMovementHotkeys();
      this.renderKeybindSettings();
    }
    handleKeybindCapture(e) {
      if (!this.activeCapture) {
        return false;
      }
      e.preventDefault();
      const t = e.which || e.keyCode || 0;
      const {
        id: n,
        type: i
      } = this.activeCapture;
      if (t === 27) {
        this.clearBinding(i, n);
      } else {
        this.applyBinding(i, n, t);
      }
      if (this.activeCapture.control) {
        this.activeCapture.control.blur();
      }
      this.activeCapture = null;
      return true;
    }
    cancelActiveCapture() {
      if (this.activeCapture) {
        this.updateKeybindButtonLabel(this.activeCapture.id);
        this.activeCapture = null;
      }
    }
    getGroupBindingForKey(e) {
      return this.groupHotkeyLookup[e] || null;
    }
    getItemBinding(e) {
      return mn.find(t => t.id === e);
    }
    getActionKey(e) {
      const t = this.actionHotkeys[e];
      if (typeof t == "number") {
        return t;
      } else {
        return null;
      }
    }
    loadItemGroupHotkeys() {
      const e = this.getValue("item_group_hotkeys");
      let t = {};
      if (e) {
        try {
          t = JSON.parse(e) || {};
        } catch (e) {
          t = {};
        }
      }
      const n = {};
      for (let e = 0; e < mn.length; e++) {
        const i = mn[e];
        n[i.id] = this.getStoredBindingValue(t, i);
      }
      return n;
    }
    getStoredBindingValue(e, t) {
      if (typeof e[t.id] == "number") {
        return e[t.id];
      }
      for (let n = 0; n < t.groupIds.length; n++) {
        const i = e[t.groupIds[n]];
        if (typeof i == "number") {
          return i;
        }
      }
      if (typeof t.defaultKey == "number") {
        return t.defaultKey;
      } else {
        return null;
      }
    }
    loadActionHotkeys() {
      const e = this.getValue("action_hotkeys");
      let t = {};
      if (e) {
        try {
          t = JSON.parse(e) || {};
        } catch (e) {
          t = {};
        }
      }
      const n = {};
      for (let e = 0; e < fn.length; e++) {
        const i = fn[e];
        n[i.id] = typeof t[i.id] == "number" ? t[i.id] : i.defaultKey;
      }
      return n;
    }
    loadMovementHotkeys() {
      const e = this.getValue("movement_hotkeys");
      let t = {};
      if (e) {
        try {
          t = JSON.parse(e) || {};
        } catch (e) {
          t = {};
        }
      }
      return {
        up: typeof t.up == "number" ? t.up : gn.up,
        down: typeof t.down == "number" ? t.down : gn.down,
        left: typeof t.left == "number" ? t.left : gn.left,
        right: typeof t.right == "number" ? t.right : gn.right
      };
    }
    persistItemGroupHotkeys() {
      try {
        this.saveValue("item_group_hotkeys", JSON.stringify(this.itemGroupHotkeys));
      } catch (e) {}
    }
    persistActionHotkeys() {
      try {
        this.saveValue("action_hotkeys", JSON.stringify(this.actionHotkeys));
      } catch (e) {}
    }
    persistMovementHotkeys() {
      try {
        this.saveValue("movement_hotkeys", JSON.stringify(this.movementHotkeys));
      } catch (e) {}
    }
    notifyMovementHotkeys() {
      if (typeof this.onMovementHotkeysChanged == "function") {
        this.onMovementHotkeysChanged({
          up: this.movementHotkeys.up,
          down: this.movementHotkeys.down,
          left: this.movementHotkeys.left,
          right: this.movementHotkeys.right
        });
      }
    }
    renderKeybindSettings() {
      this.keybindButtons = Object.create(null);
      if (this.keybindsListItems) {
        const e = this.keybindsListItems;
        e.innerHTML = "";
        mn.forEach(t => {
          this.appendKeybindRow(e, t.name, t.id, "item");
        });
      }
      if (this.keybindsListMovement) {
        const e = this.keybindsListMovement;
        e.innerHTML = "";
        this.appendKeybindRow(e, "Move Up", "up", "movement");
        this.appendKeybindRow(e, "Move Down", "down", "movement");
        this.appendKeybindRow(e, "Move Left", "left", "movement");
        this.appendKeybindRow(e, "Move Right", "right", "movement");
      }
      if (this.keybindsListActions) {
        const e = this.keybindsListActions;
        e.innerHTML = "";
        fn.forEach(t => {
          this.appendKeybindRow(e, t.name, t.id, "action");
        });
      }
    }
    appendKeybindRow(e, t, n, i) {
      const r = this.document.createElement("div");
      const a = this.document.createElement("label");
      a.className = "inputField inline";
      const s = this.document.createElement("span");
      s.textContent = t.toUpperCase() + ": ";
      a.appendChild(s);
      const o = this.document.createElement("input");
      o.type = "text";
      o.readOnly = true;
      o.value = this.keyCodeToLabel(this.getBindingValue(n));
      o.addEventListener("click", () => {
        this.startKeybindCapture(n, i);
      });
      this.keybindButtons[n] = o;
      a.appendChild(o);
      r.appendChild(a);
      e.appendChild(r);
    }
    startKeybindCapture(e, t) {
      const n = this.keybindButtons[e];
      if (n) {
        this.cancelActiveCapture();
        this.activeCapture = {
          id: e,
          type: t,
          control: n
        };
        n.value = "Press a key...";
      }
    }
    clearBinding(e, t) {
      this.applyBinding(e, t, null);
    }
    applyBinding(e, t, n) {
      if (e === "item") {
        this.setItemHotkey(t, n);
      } else if (e === "movement") {
        this.setMovementHotkey(t, n);
      } else if (e === "action") {
        this.setActionHotkey(t, n);
      }
    }
    setItemHotkey(e, t) {
      const n = typeof t == "number" ? t : null;
      Object.keys(this.itemGroupHotkeys).forEach(t => {
        if (t !== e && this.itemGroupHotkeys[t] === n) {
          this.itemGroupHotkeys[t] = null;
          this.updateKeybindButtonLabel(t);
        }
      });
      this.itemGroupHotkeys[e] = n;
      this.groupHotkeyLookup = this.buildItemHotkeyLookup();
      this.persistItemGroupHotkeys();
      this.updateKeybindButtonLabel(e);
    }
    setMovementHotkey(e, t) {
      this.movementHotkeys[e] = typeof t == "number" ? t : null;
      this.persistMovementHotkeys();
      this.notifyMovementHotkeys();
      this.updateKeybindButtonLabel(e);
    }
    setActionHotkey(e, t) {
      this.actionHotkeys[e] = typeof t == "number" ? t : null;
      this.persistActionHotkeys();
      this.updateKeybindButtonLabel(e);
    }
    updateKeybindButtonLabel(e) {
      const t = this.keybindButtons[e];
      if (t) {
        t.value = this.keyCodeToLabel(this.getBindingValue(e));
      }
    }
    getBindingValue(e) {
      if (Object.prototype.hasOwnProperty.call(this.itemGroupHotkeys, e)) {
        return this.itemGroupHotkeys[e];
      } else {
        t = e;
        if (yn.indexOf(t) !== -1) {
          return this.movementHotkeys[e];
        } else if (Object.prototype.hasOwnProperty.call(this.actionHotkeys, e)) {
          return this.actionHotkeys[e];
        } else {
          return null;
        }
      }
      var t;
    }
    keyCodeToLabel(e) {
      if (typeof e != "number") {
        return "Unbound";
      } else if (e >= 65 && e <= 90 || e >= 48 && e <= 57) {
        return String.fromCharCode(e);
      } else if (e >= 96 && e <= 105) {
        return "Numpad " + (e - 96);
      } else {
        return {
          9: "Tab",
          13: "Enter",
          16: "Shift",
          17: "Ctrl",
          18: "Alt",
          27: "Esc",
          32: "Space",
          186: ";",
          187: "=",
          188: ",",
          189: "-",
          190: ".",
          191: "/",
          192: "`",
          219: "[",
          220: "\\",
          221: "]",
          222: "'"
        }[e] || "Key " + e;
      }
    }
    buildItemHotkeyLookup() {
      const e = {};
      Object.keys(this.itemGroupHotkeys).forEach(t => {
        const n = this.itemGroupHotkeys[t];
        if (typeof n == "number") {
          e[n] = t;
        }
      });
      return e;
    }
  }
  class bn {
    constructor(e) {
      n(this, "shellInitialized", false);
      n(this, "modalControlsBound", false);
      n(this, "documentRef");
      n(this, "guideCard");
      n(this, "settingsModal");
      n(this, "settingsButton");
      n(this, "settingsButtonTitle");
      n(this, "closeSettingsButton");
      n(this, "onModalClosed");
      this.documentRef = e.documentRef;
      this.guideCard = e.guideCard;
      this.settingsModal = e.settingsModal;
      this.settingsButton = e.settingsButton;
      this.settingsButtonTitle = e.settingsButtonTitle;
      this.closeSettingsButton = e.closeSettingsButton;
      this.onModalClosed = e.onModalClosed;
    }
    toggle() {
      if (this.settingsModal) {
        const e = this.settingsModal.classList.contains("active");
        this.setModalState(!e);
        return;
      }
      this.toggleGuideCard();
    }
    setModalState(e) {
      if (this.settingsModal) {
        if (!e && typeof this.onModalClosed == "function") {
          this.onModalClosed();
        }
        this.settingsModal.classList.toggle("active", e);
        this.settingsModal.setAttribute("aria-hidden", e ? "false" : "true");
        if (this.documentRef.body) {
          this.documentRef.body.classList.toggle("modal-open", e);
        }
      } else {
        this.toggleGuideCard();
      }
    }
    initShell(e = {}) {
      if (!this.shellInitialized) {
        this.shellInitialized = true;
        this.initModalControls();
        this.initSettingsTabs();
        this.initRangeDisplays();
        this.initEnterButtonLabel(e.enterGameButton || null, e.nameInput || null);
        this.syncNames(e.nameInput || null);
      }
    }
    bindCheckboxes(e) {
      e.forEach(e => {
        if (e.element) {
          e.element.checked = e.initial;
          e.element.onchange = Yt.checkTrusted(() => {
            e.onToggle(Boolean(e.element && e.element.checked));
          });
        }
      });
    }
    enableTouchNamePrompt(e) {
      if (e) {
        e.ontouchstart = Yt.checkTrusted(e => {
          e.preventDefault();
          const t = e.currentTarget;
          const n = prompt("enter name", t.value) || "";
          t.value = n.slice(0, 15);
        });
      }
    }
    updateGuideState(e) {
      if (this.guideCard) {
        if (e) {
          this.guideCard.classList.add("touch");
        } else {
          this.guideCard.classList.remove("touch");
        }
      }
    }
    toggleGuideCard() {
      if (this.guideCard) {
        if (this.guideCard.classList.contains("showing")) {
          this.guideCard.classList.remove("showing");
          if (this.settingsButtonTitle) {
            this.settingsButtonTitle.innerText = "Settings";
          }
        } else {
          this.guideCard.classList.add("showing");
          if (this.settingsButtonTitle) {
            this.settingsButtonTitle.innerText = "Close";
          }
        }
      }
    }
    initModalControls() {
      if (!this.settingsModal || this.modalControlsBound) {
        return;
      }
      this.modalControlsBound = true;
      const e = this.documentRef.getElementById("openSettings") || this.settingsButton;
      if (e) {
        Yt.hookTouchEvents(e);
        e.addEventListener("click", Yt.checkTrusted(() => {
          this.setModalState(true);
        }));
      }
      if (this.closeSettingsButton) {
        Yt.hookTouchEvents(this.closeSettingsButton);
        this.closeSettingsButton.addEventListener("click", Yt.checkTrusted(() => {
          this.setModalState(false);
        }));
      }
      const t = this.settingsModal.querySelector(".modalBackdrop");
      if (t) {
        t.addEventListener("click", () => {
          this.setModalState(false);
        });
      }
      this.documentRef.addEventListener("keydown", e => {
        if (e.key === "Escape" && this.settingsModal && this.settingsModal.classList.contains("active")) {
          this.setModalState(false);
        }
      });
      this.setModalState(false);
    }
    initSettingsTabs() {
      const e = Array.from(this.documentRef.querySelectorAll(".settingsTab"));
      const t = Array.from(this.documentRef.querySelectorAll(".settingsContent"));
      if (!e.length || !t.length) {
        return;
      }
      const n = n => {
        e.forEach(e => {
          const t = e.dataset.category === n;
          e.classList.toggle("active", t);
          e.setAttribute("aria-selected", t ? "true" : "false");
        });
        t.forEach(e => {
          const t = e.dataset.category === n;
          e.classList.toggle("active", t);
        });
      };
      e.forEach(e => {
        e.addEventListener("click", () => {
          n(e.dataset.category);
        });
      });
      const i = (e.find(e => e.classList.contains("active")) || e[0]).dataset.category;
      n(i);
    }
    initRangeDisplays() {
      this.bindRangeToValue("zoomRange", "zoomValue");
      this.bindRangeToValue("volumeRange", "volumeValue");
    }
    bindRangeToValue(e, t) {
      const n = this.documentRef.getElementById(e);
      const i = this.documentRef.getElementById(t);
      if (!n || !i) {
        return;
      }
      const r = () => {
        i.textContent = n.value + "%";
      };
      n.addEventListener("input", r);
      r();
    }
    initEnterButtonLabel(e, t) {
      if (e && t) {
        e.addEventListener("click", () => {
          const n = e.querySelector("span");
          if (!n) {
            return;
          }
          const i = n.textContent || "";
          const r = (t.value || "Nameless").trim() || "Nameless";
          n.textContent = "Entering as " + r + "...";
          window.setTimeout(() => {
            n.textContent = i;
          }, 1800);
        });
      }
    }
    syncNames(e) {
      const t = this.documentRef.getElementById("settingsName");
      if (e && t) {
        t.value = e.value;
        e.addEventListener("input", () => {
          t.value = e.value;
        });
        t.addEventListener("input", () => {
          e.value = t.value;
        });
      }
    }
  }
  const wn = "player_skin_id";
  class kn {
    constructor(e) {
      n(this, "documentRef");
      n(this, "holder");
      n(this, "uiSettings");
      n(this, "skins");
      n(this, "saveValue");
      n(this, "getValue");
      this.documentRef = e.documentRef;
      this.holder = e.holder;
      this.uiSettings = e.uiSettings;
      this.skins = e.skins;
      this.saveValue = e.saveValue;
      this.getValue = e.getValue;
    }
    initialize() {
      if (!Array.isArray(this.skins) || !this.skins.length) {
        return;
      }
      const e = this.getValue(wn);
      const t = typeof e == "string" ? parseInt(e, 10) : NaN;
      if (!Number.isNaN(t) && this.getSkinById(t)) {
        this.uiSettings.selectedSkinId = t;
      } else if (!this.getSkinById(this.uiSettings.selectedSkinId)) {
        this.uiSettings.selectedSkinId = this.skins[0].id;
      }
      this.applyAccentFromSkin(this.uiSettings.selectedSkinId);
      this.renderSkins();
    }
    selectSkin(e) {
      if (this.getSkinById(e)) {
        this.uiSettings.selectedSkinId = e;
        this.saveValue(wn, e.toString());
        this.applyAccentFromSkin(e);
        this.renderSkins();
      }
    }
    renderSkins() {
      if (!this.holder || !Array.isArray(this.skins)) {
        return;
      }
      const e = this.skins.map(e => {
        const t = e.id === this.uiSettings.selectedSkinId ? " activeSkin" : "";
        const n = this.escapeHtml(e.name || "Skin");
        const i = typeof e.imgPath == "string" ? e.imgPath : "";
        const r = i ? "<img src=\"" + i + "\" alt=\"" + n + " preview\" loading=\"lazy\" />" : "<div class=\"skinOption__placeholder\"></div>";
        return "<button type='button' class='skinOption" + t + "' data-skin-id='" + e.id + "'>" + r + "<span>" + n + "</span></button>";
      }).join("");
      this.holder.innerHTML = e;
      this.holder.querySelectorAll(".skinOption").forEach(e => {
        e.addEventListener("click", () => {
          const t = typeof e.dataset.skinId == "string" ? parseInt(e.dataset.skinId, 10) : NaN;
          if (!Number.isNaN(t)) {
            this.selectSkin(t);
          }
        });
      });
    }
    applyAccentFromSkin(e) {
      const t = this.getSkinById(e);
      const n = t && typeof t.accentColor == "string" && t.accentColor.length ? t.accentColor : "#6D824E";
      this.setAccentFromColor(n);
    }
    getSkinById(e) {
      if (Array.isArray(this.skins)) {
        return this.skins.find(t => t && t.id === e);
      }
    }
    setAccentFromColor(e) {
      if (!e || !this.documentRef.documentElement) {
        return;
      }
      const t = this.documentRef.documentElement.style;
      t.setProperty("--accent", e);
      t.setProperty("--accent-dark", this.shadeColor(e, -12));
    }
    shadeColor(e, t) {
      const n = e.replace("#", "");
      const i = parseInt(n, 16);
      if (Number.isNaN(i)) {
        return e;
      }
      const r = Math.round(t * 2.55);
      return "#" + (16777216 + (Math.min(255, Math.max(0, (i >> 16) + r)) << 16) + (Math.min(255, Math.max(0, (i >> 8 & 255) + r)) << 8) + Math.min(255, Math.max(0, (i & 255) + r))).toString(16).slice(1);
    }
    escapeHtml(e) {
      return e.replace(/[&<>"']/g, e => {
        switch (e) {
          case "&":
            return "&amp;";
          case "<":
            return "&lt;";
          case ">":
            return "&gt;";
          case "\"":
            return "&quot;";
          case "'":
            return "&#39;";
          default:
            return e;
        }
      });
    }
  }
  const Sn = "true";
  const xn = "native_resolution_pref_v2";
  const In = false;
  const Mn = "extreme_performance_mode";
  function En(e, t, n) {
    const i = e(t);
    if (i == null) {
      return n;
    } else {
      return i === Sn;
    }
  }
  const Pn = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    DEFAULT_NATIVE_RESOLUTION: In,
    NATIVE_RESOLUTION_STORAGE_KEY: xn,
    default: function (e) {
      const t = e.documentRef;
      const n = e.windowRef || window;
      const i = new vn({
        document: t,
        keybindsListItems: e.keybindsListItems,
        keybindsListMovement: e.keybindsListMovement,
        keybindsListActions: e.keybindsListActions,
        saveValue: e.saveValue,
        getValue: e.getSavedValue,
        onMovementHotkeysChanged: e.onMovementHotkeysChanged
      });
      const r = new bn({
        documentRef: t,
        guideCard: e.settingsElements.guideCard,
        settingsModal: e.settingsElements.settingsModal,
        settingsButton: e.settingsElements.settingsButton,
        settingsButtonTitle: e.settingsElements.settingsButtonTitle,
        closeSettingsButton: e.settingsElements.closeSettingsButton,
        onModalClosed: () => {
          i.cancelActiveCapture();
        }
      });
      const a = new kn({
        documentRef: t,
        holder: e.skinColorHolder,
        uiSettings: e.uiSettings,
        skins: e.config && e.config.playerSkins,
        saveValue: e.saveValue,
        getValue: e.getSavedValue
      });
      const s = new en({
        actionBar: e.actionBarElement,
        itemsData: e.items,
        config: e.config,
        utils: e.utils,
        showItemInfo: (t, n, i) => {
          e.itemInfoPanel.show(t, {
            isWeapon: Boolean(n),
            isStoreItem: Boolean(i)
          });
        },
        selectToBuild: e.selectToBuild,
        getItemSprite: e.getItemSprite,
        toolSprites: e.toolSprites,
        documentRef: t,
        placeableRenderer: e.placeableRenderer
      });
      var o;
      var l;
      (function (e, t) {
        const n = e.uiSettings;
        const i = e.getSavedValue;
        const r = En(i, xn, In);
        e.setUseNativeResolution(r);
        n.showPing = En(i, "show_ping", false);
        n.showPerfOverlay = En(i, "show_perf_overlay", false);
        n.showGrid = En(i, "show_grid", false);
        n.disableStoreSpaceScroll = En(i, "disable_store_space_scroll", false);
        const a = e.getSavedValue("allow_movement_in_alliance_menu");
        n.allowMovementInAllianceMenu = a === null || a === Sn;
        n.hidePlayerNames = En(i, "hide_player_names", false);
        n.hidePlayerStats = En(i, "hide_player_stats", false);
        n.lowDetailMode = En(i, "low_detail_mode", false);
        n.extremePerformanceMode = En(i, Mn, false);
        if (typeof e.onStoreScrollPreferenceChanged == "function") {
          e.onStoreScrollPreferenceChanged(n.disableStoreSpaceScroll);
        }
        (function (e, t, n) {
          const i = e.checkboxElements;
          const r = e.uiSettings;
          const a = (t, n) => {
            e.saveValue(t, n ? Sn : "false");
          };
          t.bindCheckboxes([{
            element: i.nativeResolution,
            initial: n,
            onToggle: t => {
              e.setUseNativeResolution(t);
            }
          }, {
            element: i.lowDetailMode,
            initial: r.lowDetailMode,
            onToggle: e => {
              r.lowDetailMode = e;
              a("low_detail_mode", e);
            }
          }, {
            element: i.showPing,
            initial: r.showPing,
            onToggle: t => {
              r.showPing = t;
              a("show_ping", t);
              e.updatePerformancePanelVisibility();
            }
          }, {
            element: i.showPerfOverlay,
            initial: r.showPerfOverlay,
            onToggle: t => {
              r.showPerfOverlay = t;
              a("show_perf_overlay", t);
              if (typeof e.updatePerfOverlayVisibility == "function") {
                e.updatePerfOverlayVisibility();
              }
            }
          }, {
            element: i.showGrid,
            initial: r.showGrid,
            onToggle: e => {
              r.showGrid = e;
              a("show_grid", e);
            }
          }, {
            element: i.disableStoreSpaceScroll,
            initial: r.disableStoreSpaceScroll,
            onToggle: t => {
              r.disableStoreSpaceScroll = t;
              a("disable_store_space_scroll", t);
              if (typeof e.onStoreScrollPreferenceChanged == "function") {
                e.onStoreScrollPreferenceChanged(t);
              }
            }
          }, {
            element: i.allowMovementInAllianceMenu,
            initial: r.allowMovementInAllianceMenu,
            onToggle: e => {
              r.allowMovementInAllianceMenu = e;
              a("allow_movement_in_alliance_menu", e);
            }
          }, {
            element: i.hidePlayerNames,
            initial: r.hidePlayerNames,
            onToggle: e => {
              r.hidePlayerNames = e;
              a("hide_player_names", e);
            }
          }, {
            element: i.hidePlayerStats,
            initial: r.hidePlayerStats,
            onToggle: e => {
              r.hidePlayerStats = e;
              a("hide_player_stats", e);
            }
          }, {
            element: i.extremePerformanceMode,
            initial: r.extremePerformanceMode,
            onToggle: e => {
              r.extremePerformanceMode = e;
              a(Mn, e);
            }
          }]);
        })(e, t, r);
      })(e, r);
      e.storeController.initTabs();
      r.initShell({
        enterGameButton: e.settingsElements.enterGameButton,
        nameInput: e.nameInput || null
      });
      r.enableTouchNamePrompt(e.nameInput || null);
      i.initialize();
      a.initialize();
      s.buildActionBar();
      e.updatePerformancePanelVisibility();
      l = t;
      (o = n).setInterval(() => {
        if (o.cordova) {
          const e = l.getElementById("downloadButtonContainer");
          const t = l.getElementById("mobileDownloadButtonContainer");
          if (e) {
            e.classList.add("cordova");
          }
          if (t) {
            t.classList.add("cordova");
          }
        }
      }, 1000);
      return {
        settingsMenu: r,
        hotkeySettings: i,
        actionBarUI: s,
        skinSelector: a
      };
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  const Tn = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class {
      constructor(e) {
        n(this, "documentRef");
        n(this, "windowRef");
        n(this, "nameInput");
        n(this, "saveValue");
        n(this, "modal");
        n(this, "closeButton");
        n(this, "backdrop");
        n(this, "openLoginButton");
        n(this, "openRegisterButton");
        n(this, "logoutButton");
        n(this, "guestActions");
        n(this, "accountSummary");
        n(this, "accountStatusBadge");
        n(this, "accountUsernameDisplay");
        n(this, "accountSummaryMeta");
        n(this, "feedback");
        n(this, "loadRecoveryQuestionButton");
        n(this, "openRecoverFromLoginButton");
        n(this, "recoveryQuestionWrap");
        n(this, "recoveryQuestionText");
        n(this, "loginForm");
        n(this, "registerForm");
        n(this, "recoverForm");
        n(this, "loginUsernameInput");
        n(this, "loginPasswordInput");
        n(this, "registerUsernameInput");
        n(this, "registerPasswordInput");
        n(this, "registerPasswordConfirmInput");
        n(this, "securityQuestionInput");
        n(this, "securityAnswerInput");
        n(this, "recoverUsernameInput");
        n(this, "recoverAnswerInput");
        n(this, "recoverPasswordInput");
        n(this, "recoverPasswordConfirmInput");
        n(this, "tabElements");
        n(this, "panelElements");
        n(this, "actionButtons");
        n(this, "account", null);
        n(this, "activePanel", "login");
        n(this, "currentRecoveryQuestion", "");
        n(this, "busy", false);
        n(this, "initialized", false);
        this.documentRef = e.documentRef;
        this.windowRef = e.windowRef || window;
        this.nameInput = e.nameInput || null;
        this.saveValue = e.saveValue;
        this.modal = this.documentRef.getElementById("accountModal");
        this.closeButton = this.documentRef.getElementById("closeAccountModal");
        this.backdrop = this.modal ? this.modal.querySelector(".modalBackdrop") : null;
        this.openLoginButton = this.documentRef.getElementById("openLoginModal");
        this.openRegisterButton = this.documentRef.getElementById("openRegisterModal");
        this.logoutButton = this.documentRef.getElementById("logoutAccountButton");
        this.guestActions = this.documentRef.getElementById("guestAccountActions");
        this.accountSummary = this.documentRef.getElementById("accountSummary");
        this.accountStatusBadge = this.documentRef.getElementById("accountStatusBadge");
        this.accountUsernameDisplay = this.documentRef.getElementById("accountUsernameDisplay");
        this.accountSummaryMeta = this.documentRef.getElementById("accountSummaryMeta");
        this.feedback = this.documentRef.getElementById("accountModalFeedback");
        this.loadRecoveryQuestionButton = this.documentRef.getElementById("accountLoadRecoveryQuestion");
        this.openRecoverFromLoginButton = this.documentRef.getElementById("openRecoverFromLogin");
        this.recoveryQuestionWrap = this.documentRef.getElementById("accountRecoveryQuestionWrap");
        this.recoveryQuestionText = this.documentRef.getElementById("accountRecoveryQuestion");
        this.loginForm = this.documentRef.getElementById("accountLoginForm");
        this.registerForm = this.documentRef.getElementById("accountRegisterForm");
        this.recoverForm = this.documentRef.getElementById("accountRecoverForm");
        this.loginUsernameInput = this.documentRef.getElementById("accountLoginUsername");
        this.loginPasswordInput = this.documentRef.getElementById("accountLoginPassword");
        this.registerUsernameInput = this.documentRef.getElementById("accountRegisterUsername");
        this.registerPasswordInput = this.documentRef.getElementById("accountRegisterPassword");
        this.registerPasswordConfirmInput = this.documentRef.getElementById("accountRegisterPasswordConfirm");
        this.securityQuestionInput = this.documentRef.getElementById("accountSecurityQuestion");
        this.securityAnswerInput = this.documentRef.getElementById("accountSecurityAnswer");
        this.recoverUsernameInput = this.documentRef.getElementById("accountRecoverUsername");
        this.recoverAnswerInput = this.documentRef.getElementById("accountRecoverAnswer");
        this.recoverPasswordInput = this.documentRef.getElementById("accountRecoverPassword");
        this.recoverPasswordConfirmInput = this.documentRef.getElementById("accountRecoverPasswordConfirm");
        this.tabElements = Array.from(this.documentRef.querySelectorAll("[data-auth-panel-target]"));
        this.panelElements = Array.from(this.documentRef.querySelectorAll("[data-auth-panel]"));
        this.actionButtons = Array.from(this.documentRef.querySelectorAll("[data-account-action]"));
      }
      init() {
        if (!this.initialized && this.modal) {
          this.initialized = true;
          this.bindButtons();
          this.bindForms();
          this.bindTabs();
          this.bindModal();
          this.bindRecoveryFieldReset();
          this.renderAccountState();
          this.restoreSession();
        }
      }
      bindButtons() {
        this.bindButton(this.openLoginButton, () => {
          this.clearFeedback();
          this.open("login");
        });
        this.bindButton(this.openRegisterButton, () => {
          this.clearFeedback();
          this.open("register");
        });
        this.bindButton(this.logoutButton, () => {
          this.handleLogout();
        });
        this.bindButton(this.loadRecoveryQuestionButton, () => {
          this.handleLoadRecoveryQuestion();
        });
        this.bindButton(this.openRecoverFromLoginButton, () => {
          if (this.recoverUsernameInput && this.loginUsernameInput && !this.recoverUsernameInput.value.trim()) {
            this.recoverUsernameInput.value = this.loginUsernameInput.value.trim();
          }
          this.clearFeedback();
          this.open("recover");
        });
      }
      bindForms() {
        if (this.loginForm) {
          this.loginForm.addEventListener("submit", Yt.checkTrusted(e => {
            e.preventDefault();
            this.handleLogin();
          }));
        }
        if (this.registerForm) {
          this.registerForm.addEventListener("submit", Yt.checkTrusted(e => {
            e.preventDefault();
            this.handleRegister();
          }));
        }
        if (this.recoverForm) {
          this.recoverForm.addEventListener("submit", Yt.checkTrusted(e => {
            e.preventDefault();
            this.handleRecover();
          }));
        }
      }
      bindTabs() {
        this.tabElements.forEach(e => {
          this.bindButton(e, () => {
            const t = e.dataset.authPanelTarget;
            if (t) {
              this.clearFeedback();
              this.showPanel(t);
            }
          });
        });
        this.showPanel(this.activePanel);
      }
      bindModal() {
        this.bindButton(this.closeButton, () => {
          this.close();
        });
        if (this.backdrop) {
          this.backdrop.addEventListener("click", () => {
            this.close();
          });
        }
        this.documentRef.addEventListener("keydown", e => {
          if (e.key === "Escape" && this.modal && this.modal.classList.contains("active")) {
            this.close();
          }
        });
      }
      bindRecoveryFieldReset() {
        if (this.recoverUsernameInput) {
          this.recoverUsernameInput.addEventListener("input", () => {
            this.resetRecoveryQuestion();
          });
        }
      }
      bindButton(e, t) {
        if (e) {
          Yt.hookTouchEvents(e);
          e.addEventListener("click", Yt.checkTrusted(() => {
            if (!this.busy) {
              t();
            }
          }));
        }
      }
      open(e) {
        if (this.modal) {
          this.showPanel(e);
          this.modal.classList.add("active");
          this.modal.setAttribute("aria-hidden", "false");
          this.windowRef.setTimeout(() => {
            this.focusFirstField(e);
          }, 0);
        }
      }
      close() {
        if (this.modal) {
          this.modal.classList.remove("active");
          this.modal.setAttribute("aria-hidden", "true");
          this.clearFeedback();
          this.clearSensitiveFields();
        }
      }
      showPanel(e) {
        this.activePanel = e;
        this.tabElements.forEach(t => {
          const n = t.dataset.authPanelTarget === e;
          t.classList.toggle("active", n);
          t.setAttribute("aria-selected", n ? "true" : "false");
        });
        this.panelElements.forEach(t => {
          t.classList.toggle("active", t.dataset.authPanel === e);
        });
        if (e !== "recover") {
          this.resetRecoveryQuestion();
        }
      }
      focusFirstField(e) {
        const t = this.panelElements.find(t => t.dataset.authPanel === e);
        if (!t) {
          return;
        }
        const n = t.querySelector("input, select, textarea");
        if (n && typeof n.focus == "function") {
          n.focus();
        }
      }
      async restoreSession() {
        this.setBusy(true);
        if (this.accountStatusBadge) {
          this.accountStatusBadge.textContent = "Checking";
        }
        try {
          const e = await this.requestJson("/api/account/session", {
            method: "GET"
          });
          this.account = e && e.authenticated && e.account || null;
          this.applyAccountToNameInput();
          this.renderAccountState();
        } catch (e) {
          this.account = null;
          this.renderAccountState();
        } finally {
          this.setBusy(false);
        }
      }
      async handleLogin() {
        const e = this.readValue(this.loginUsernameInput);
        const t = this.readValue(this.loginPasswordInput, false);
        if (e && t) {
          this.setBusy(true);
          this.clearFeedback();
          try {
            const n = await this.requestJson("/api/account/login", {
              method: "POST",
              body: JSON.stringify({
                username: e,
                password: t
              })
            });
            this.account = n.account || null;
            this.applyAccountToNameInput();
            this.renderAccountState();
            this.close();
          } catch (e) {
            this.setFeedback(this.getErrorMessage(e, "Login failed."), "error");
          } finally {
            this.setBusy(false);
          }
        } else {
          this.setFeedback("Enter your username and password.", "error");
        }
      }
      async handleRegister() {
        const e = this.readValue(this.registerUsernameInput);
        const t = this.readValue(this.registerPasswordInput, false);
        const n = this.readValue(this.registerPasswordConfirmInput, false);
        const i = this.readValue(this.securityQuestionInput);
        const r = this.readValue(this.securityAnswerInput);
        if (e && t && n && i && r) {
          if (t === n) {
            this.setBusy(true);
            this.clearFeedback();
            try {
              const n = await this.requestJson("/api/account/register", {
                method: "POST",
                body: JSON.stringify({
                  username: e,
                  password: t,
                  securityQuestion: i,
                  securityAnswer: r
                })
              });
              this.account = n.account || null;
              this.applyAccountToNameInput();
              this.renderAccountState();
              this.close();
            } catch (e) {
              this.setFeedback(this.getErrorMessage(e, "Registration failed."), "error");
            } finally {
              this.setBusy(false);
            }
          } else {
            this.setFeedback("Passwords do not match.", "error");
          }
        } else {
          this.setFeedback("Fill in every field to create an account.", "error");
        }
      }
      async handleLoadRecoveryQuestion() {
        const e = this.readValue(this.recoverUsernameInput);
        if (e) {
          this.setBusy(true);
          this.clearFeedback();
          try {
            const t = await this.requestJson("/api/account/recovery-question?username=" + encodeURIComponent(e), {
              method: "GET"
            });
            this.currentRecoveryQuestion = t.securityQuestion || "";
            if (this.recoveryQuestionText) {
              this.recoveryQuestionText.textContent = this.currentRecoveryQuestion;
            }
            if (this.recoveryQuestionWrap) {
              this.recoveryQuestionWrap.hidden = !this.currentRecoveryQuestion;
            }
            if (this.currentRecoveryQuestion) {
              this.setFeedback("Security question loaded. Answer it to reset your password.", "success");
            } else {
              this.setFeedback("No recovery question was found for that account.", "error");
            }
          } catch (e) {
            this.resetRecoveryQuestion();
            this.setFeedback(this.getErrorMessage(e, "Could not load the recovery question."), "error");
          } finally {
            this.setBusy(false);
          }
        } else {
          this.setFeedback("Enter your username first.", "error");
        }
      }
      async handleRecover() {
        const e = this.readValue(this.recoverUsernameInput);
        const t = this.readValue(this.recoverAnswerInput);
        const n = this.readValue(this.recoverPasswordInput, false);
        const i = this.readValue(this.recoverPasswordConfirmInput, false);
        if (e && t && n && i) {
          if (this.currentRecoveryQuestion) {
            if (n === i) {
              this.setBusy(true);
              this.clearFeedback();
              try {
                const i = await this.requestJson("/api/account/recover", {
                  method: "POST",
                  body: JSON.stringify({
                    username: e,
                    securityAnswer: t,
                    newPassword: n
                  })
                });
                this.account = i.account || null;
                this.applyAccountToNameInput();
                this.renderAccountState();
                this.close();
              } catch (e) {
                this.setFeedback(this.getErrorMessage(e, "Password recovery failed."), "error");
              } finally {
                this.setBusy(false);
              }
            } else {
              this.setFeedback("New passwords do not match.", "error");
            }
          } else {
            this.setFeedback("Load your security question before resetting the password.", "error");
          }
        } else {
          this.setFeedback("Fill in the recovery answer and new password.", "error");
        }
      }
      async handleLogout() {
        this.setBusy(true);
        this.clearFeedback();
        try {
          await this.requestJson("/api/account/logout", {
            method: "POST"
          });
          this.account = null;
          this.renderAccountState();
          this.close();
        } catch (e) {
          this.open("login");
          this.setFeedback(this.getErrorMessage(e, "Logout failed."), "error");
        } finally {
          this.setBusy(false);
        }
      }
      renderAccountState() {
        const e = Boolean(this.account);
        if (this.guestActions) {
          this.guestActions.hidden = e;
        }
        if (this.accountSummary) {
          this.accountSummary.hidden = !e;
        }
        if (this.accountStatusBadge) {
          this.accountStatusBadge.textContent = e ? "Online" : "Guest";
        }
        if (this.accountUsernameDisplay) {
          this.accountUsernameDisplay.textContent = this.account ? this.account.username : "";
        }
        if (this.accountSummaryMeta) {
          this.accountSummaryMeta.textContent = e ? "Recovery enabled" : "Secure sign-in ready";
        }
      }
      applyAccountToNameInput() {
        if (this.account && this.nameInput) {
          if (!this.nameInput.value.trim()) {
            this.nameInput.value = this.account.username;
            if (typeof this.saveValue == "function") {
              this.saveValue("moo_name", this.account.username);
            }
          }
        }
      }
      setBusy(e) {
        this.busy = e;
        [this.openLoginButton, this.openRegisterButton, this.logoutButton, this.closeButton, this.loadRecoveryQuestionButton, this.openRecoverFromLoginButton].forEach(t => {
          if (t && "disabled" in t) {
            t.disabled = e;
          }
        });
        this.actionButtons.forEach(t => {
          t.disabled = e;
        });
        this.tabElements.forEach(t => {
          if ("disabled" in t) {
            t.disabled = e;
          }
        });
      }
      clearSensitiveFields() {
        [this.loginPasswordInput, this.registerPasswordInput, this.registerPasswordConfirmInput, this.securityAnswerInput, this.recoverAnswerInput, this.recoverPasswordInput, this.recoverPasswordConfirmInput].forEach(e => {
          if (e) {
            e.value = "";
          }
        });
      }
      resetRecoveryQuestion() {
        this.currentRecoveryQuestion = "";
        if (this.recoveryQuestionText) {
          this.recoveryQuestionText.textContent = "";
        }
        if (this.recoveryQuestionWrap) {
          this.recoveryQuestionWrap.hidden = true;
        }
        [this.recoverAnswerInput, this.recoverPasswordInput, this.recoverPasswordConfirmInput].forEach(e => {
          if (e) {
            e.value = "";
          }
        });
      }
      setFeedback(e, t) {
        if (this.feedback) {
          this.feedback.textContent = e;
          this.feedback.classList.add("active");
          this.feedback.classList.toggle("isError", t === "error");
          this.feedback.classList.toggle("isSuccess", t === "success");
        }
      }
      clearFeedback() {
        if (this.feedback) {
          this.feedback.textContent = "";
          this.feedback.classList.remove("active", "isError", "isSuccess");
        }
      }
      readValue(e, t = true) {
        if (e) {
          if (t) {
            return e.value.trim();
          } else {
            return e.value;
          }
        } else {
          return "";
        }
      }
      async requestJson(e, t) {
        if (typeof fetch != "function") {
          throw new Error("This browser does not support account requests.");
        }
        const n = Object.assign({
          accept: "application/json"
        }, t.body ? {
          "content-type": "application/json"
        } : {}, t.headers || {});
        const i = await fetch(e, {
          credentials: "same-origin",
          cache: "no-store",
          ...t,
          headers: n
        });
        const r = await i.text();
        let a = {};
        if (r) {
          try {
            a = JSON.parse(r);
          } catch (e) {
            a = {};
          }
        }
        if (!i.ok) {
          throw new Error(a && a.message || "Request failed.");
        }
        return a;
      }
      getErrorMessage(e, t) {
        if (e && typeof e == "object" && "message" in e && typeof e.message == "string") {
          return e.message;
        } else {
          return t;
        }
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  const An = e => Boolean(e && e.disabled);
  const Cn = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    default: class {
      constructor(e) {
        n(this, "windowRef");
        n(this, "utils");
        n(this, "hotkeySettings");
        n(this, "uiSettings");
        n(this, "chatHolder");
        n(this, "storeMenu");
        n(this, "allianceMenu");
        n(this, "isSettingsOpen");
        n(this, "getPlayer");
        n(this, "itemsData");
        n(this, "callbacks");
        n(this, "keys", Object.create(null));
        n(this, "activeHotkeyKeys", Object.create(null));
        n(this, "moveKeys", Object.create(null));
        n(this, "keyDownListener");
        n(this, "keyUpListener");
        this.windowRef = e.windowRef;
        this.utils = e.utils;
        this.hotkeySettings = e.hotkeySettings;
        this.uiSettings = e.uiSettings;
        this.chatHolder = e.chatHolder;
        this.storeMenu = e.storeMenu;
        this.allianceMenu = e.allianceMenu;
        this.isSettingsOpen = e.isSettingsOpen;
        this.getPlayer = e.getPlayer;
        this.itemsData = e.itemsData;
        this.callbacks = e.callbacks;
        this.keyDownListener = this.utils.checkTrusted(e => {
          this.handleKeyDown(e);
        });
        this.keyUpListener = this.utils.checkTrusted(e => {
          this.handleKeyUp(e);
        });
        this.windowRef.addEventListener("keydown", this.keyDownListener);
        this.windowRef.addEventListener("keyup", this.keyUpListener);
      }
      updateMovementHotkeys(e) {
        this.moveKeys = Object.create(null);
        if (e) {
          this.applyMovementHotkey(e.up, [0, -1]);
          this.applyMovementHotkey(e.down, [0, 1]);
          this.applyMovementHotkey(e.left, [-1, 0]);
          this.applyMovementHotkey(e.right, [1, 0]);
        }
        this.applyMovementHotkey(38, [0, -1]);
        this.applyMovementHotkey(40, [0, 1]);
        this.applyMovementHotkey(37, [-1, 0]);
        this.applyMovementHotkey(39, [1, 0]);
      }
      resetMovementState() {
        this.keys = Object.create(null);
        this.activeHotkeyKeys = Object.create(null);
      }
      getKeyboardVector() {
        let e = 0;
        let t = 0;
        Object.keys(this.moveKeys).forEach(n => {
          const i = parseInt(n, 10);
          if (!this.keys[i]) {
            return;
          }
          const r = this.moveKeys[i];
          e += r[0];
          t += r[1];
        });
        return {
          dx: e,
          dy: t
        };
      }
      handleKeyDown(e) {
        const t = e.which || e.keyCode || 0;
        if (this.hotkeySettings.handleKeybindCapture(e)) {
          return;
        }
        if (this.activeHotkeyKeys[t]) {
          e.preventDefault();
          return;
        }
        if (t === 32 && this.preventSpaceScroll()) {
          e.preventDefault();
        }
        if (t === 27) {
          this.callbacks.hideAllWindows();
          return;
        }
        const n = this.getPlayer();
        if (!n || !n.alive || !this.keysActive()) {
          return;
        }
        if (this.shouldHandleGroupHotkey(t, e, n)) {
          this.activeHotkeyKeys[t] = true;
          return;
        }
        if (this.keys[t]) {
          return;
        }
        this.keys[t] = true;
        const i = this.hotkeySettings.getActionKey("autoAttack");
        const r = this.hotkeySettings.getActionKey("lockDir");
        const a = this.hotkeySettings.getActionKey("toggleStore");
        if (i !== null && t === i) {
          this.callbacks.sendAutoGather();
        } else if (t === 67) {
          this.callbacks.updateMapMarker();
        } else if (r !== null && t === r) {
          this.callbacks.sendLockDir();
        } else if (a !== null && t === a) {
          this.callbacks.toggleStoreMenu();
        } else {
          if (this.tryWeaponHotkey(t, e, n)) {
            return;
          }
          if (this.tryItemHotkey(t, e, n)) {
            return;
          }
          if (t === 82) {
            this.callbacks.sendMapPing();
          } else if (this.moveKeys[t]) {
            this.callbacks.sendMoveDir();
          } else if (t === 32) {
            this.callbacks.startAttackFromKey();
          }
        }
      }
      handleKeyUp(e) {
        const t = e.which || e.keyCode || 0;
        const n = this.getPlayer();
        if (n && n.alive) {
          if (this.activeHotkeyKeys[t]) {
            delete this.activeHotkeyKeys[t];
            e.preventDefault();
            return;
          } else {
            if (t !== 13) {
              if (this.keys[t]) {
                delete this.keys[t];
                if (this.moveKeys[t]) {
                  this.callbacks.sendMoveDir();
                } else if (t === 32) {
                  this.callbacks.stopAttackFromKey();
                }
              }
            } else {
              this.callbacks.toggleChat();
            }
            return;
          }
        }
      }
      shouldHandleGroupHotkey(e, t, n) {
        if (this.keys[e] || this.activeHotkeyKeys[e]) {
          return false;
        }
        if (this.isSettingsOpen()) {
          return false;
        }
        const i = this.hotkeySettings.getGroupBindingForKey(e);
        if (!i) {
          return false;
        }
        const r = this.hotkeySettings.getItemBinding(i);
        if (!r) {
          return false;
        }
        const a = this.getLatestItemForBinding(r, n);
        return a != null && (this.callbacks.selectToBuild(a, undefined, {
          source: "groupHotkey:" + i,
          keyCode: e,
          event: t,
          isReal: this.utils.eventIsTrusted(t)
        }), true);
      }
      tryWeaponHotkey(e, t, n) {
        const i = e - 49;
        if (i < 0 || !Array.isArray(n.weapons)) {
          return false;
        }
        const r = n.weapons[i];
        return r !== undefined && (this.callbacks.selectToBuild(r, true, {
          source: "weaponHotkey",
          keyCode: e,
          event: t,
          isReal: this.utils.eventIsTrusted(t)
        }), true);
      }
      tryItemHotkey(e, t, n) {
        const i = e - 49 - (Array.isArray(n.weapons) ? n.weapons.length : 0);
        if (i < 0 || !Array.isArray(n.items)) {
          return false;
        }
        const r = n.items[i];
        return r !== undefined && (this.callbacks.selectToBuild(r, undefined, {
          source: "itemHotkey",
          keyCode: e,
          event: t,
          isReal: this.utils.eventIsTrusted(t)
        }), true);
      }
      getLatestItemForBinding(e, t) {
        if (!e || !Array.isArray(e.groupIds)) {
          return null;
        }
        let n = null;
        for (let i = 0; i < e.groupIds.length; i++) {
          const r = this.getLatestItemForGroup(e.groupIds[i], t);
          if (r != null && (n === null || r > n)) {
            n = r;
          }
        }
        return n;
      }
      getLatestItemForGroup(e, t) {
        if (!Array.isArray(t.items)) {
          return null;
        }
        let n = null;
        for (let i = 0; i < t.items.length; i++) {
          const r = t.items[i];
          const a = this.itemsData.list[r];
          if (a && !An(a) && a.group && a.group.id === e && (n === null || r > n)) {
            n = r;
          }
        }
        return n;
      }
      keysActive() {
        return (!this.chatHolder || this.chatHolder.style.display !== "block") && (!!this.uiSettings.allowMovementInAllianceMenu || !this.allianceMenu || this.allianceMenu.style.display !== "block");
      }
      preventSpaceScroll() {
        return !!this.uiSettings.disableStoreSpaceScroll && !!this.storeMenu && this.storeMenu.style.display === "block";
      }
      applyMovementHotkey(e, t) {
        if (typeof e == "number") {
          this.moveKeys[e] = t;
        }
      }
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  function _n(e, t, n, i) {
    let r = Math.PI / 2 * 3;
    let a = 0;
    let s = 0;
    const o = Math.PI / t;
    e.beginPath();
    if (Math.abs(i - n) < 0.001) {
      e.moveTo(Math.cos(r) * n, Math.sin(r) * n);
      for (let i = 0; i < t * 2; i++) {
        r += o;
        a = Math.cos(r) * n;
        s = Math.sin(r) * n;
        e.lineTo(a, s);
      }
      e.closePath();
    } else {
      e.moveTo(0, -n);
      for (let l = 0; l < t; l++) {
        a = Math.cos(r) * n;
        s = Math.sin(r) * n;
        e.lineTo(a, s);
        r += o;
        a = Math.cos(r) * i;
        s = Math.sin(r) * i;
        e.lineTo(a, s);
        r += o;
      }
      e.lineTo(0, -n);
      e.closePath();
    }
  }
  function Rn(e, t, n, i, r, a) {
    r.fillRect(e - n / 2, t - i / 2, n, i);
    if (!a) {
      r.strokeRect(e - n / 2, t - i / 2, n, i);
    }
  }
  const Bn = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    renderBlob: function (e, t, n, i) {
      let r = Math.PI / 2 * 3;
      const a = Math.PI / t;
      e.beginPath();
      e.moveTo(0, -i);
      for (let s = 0; s < t; s++) {
        const t = vt(n + 0.9, n * 1.2);
        e.quadraticCurveTo(Math.cos(r + a) * t, Math.sin(r + a) * t, Math.cos(r + a * 2) * i, Math.sin(r + a * 2) * i);
        r += a * 2;
      }
      e.lineTo(0, -i);
      e.closePath();
    },
    renderCircle: function (e, t, n, i, r, a) {
      i.beginPath();
      i.arc(e, t, n, 0, Math.PI * 2);
      if (!a) {
        i.fill();
      }
      if (!r) {
        i.stroke();
      }
    },
    renderLeaf: function (e, t, n, i, r) {
      const a = e + n * Math.cos(i);
      const s = t + n * Math.sin(i);
      const o = n * 0.4;
      r.moveTo(e, t);
      r.beginPath();
      r.quadraticCurveTo((e + a) / 2 + o * Math.cos(i + Math.PI / 2), (t + s) / 2 + o * Math.sin(i + Math.PI / 2), a, s);
      r.quadraticCurveTo((e + a) / 2 - o * Math.cos(i + Math.PI / 2), (t + s) / 2 - o * Math.sin(i + Math.PI / 2), e, t);
      r.closePath();
      r.fill();
      r.stroke();
    },
    renderRect: Rn,
    renderRectCircle: function (e, t, n, i, r, a, s) {
      a.save();
      a.translate(e, t);
      const o = Math.ceil(r / 2);
      for (let e = 0; e < o; e++) {
        Rn(0, 0, n * 2, i, a, s);
        a.rotate(Math.PI / o);
      }
      a.restore();
    },
    renderRoundedStar: function (e, t, n, i, r = 0) {
      if (r <= 0) {
        _n(e, t, n, i);
        return;
      }
      let a = -Math.PI / 2;
      const s = Math.PI / t;
      const o = [];
      for (let e = 0; e < t; ++e) {
        o.push({
          x: Math.cos(a) * n,
          y: Math.sin(a) * n
        });
        a += s;
        o.push({
          x: Math.cos(a) * i,
          y: Math.sin(a) * i
        });
        a += s;
      }
      e.beginPath();
      for (let t = 0; t < o.length; ++t) {
        const n = o[t];
        const i = o[(t - 1 + o.length) % o.length];
        const a = o[(t + 1) % o.length];
        const s = n.x - i.x;
        const l = n.y - i.y;
        const c = a.x - n.x;
        const u = a.y - n.y;
        const d = Math.sqrt(s * s + l * l) || 1;
        const h = Math.sqrt(c * c + u * u) || 1;
        const p = Math.min(r, Math.min(d, h) / 2);
        const m = n.x - s / d * p;
        const f = n.y - l / d * p;
        const g = n.x + c / h * p;
        const y = n.y + u / h * p;
        if (t === 0) {
          e.moveTo(m, f);
        } else {
          e.lineTo(m, f);
        }
        e.quadraticCurveTo(n.x, n.y, g, y);
      }
      e.closePath();
    },
    renderStar: _n,
    renderTriangle: function (e, t) {
      const n = e * (Math.sqrt(3) / 2);
      t.beginPath();
      t.moveTo(0, -n / 2);
      t.lineTo(-e / 2, n / 2);
      t.lineTo(e / 2, n / 2);
      t.lineTo(0, -n / 2);
      t.fill();
      t.closePath();
    }
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  const Ln = e(qe);
  const On = e(Xt);
  var Dn;
  var Nn;
  var Fn = {
    exports: {}
  };
  (Dn = Fn).exports.AnimText = function () {
    this.init = function (e, t, n, i, r, a, s) {
      this.x = e;
      this.baseY = t;
      this.y = t;
      this.color = s;
      this.startScale = n;
      this.scale = n;
      this.peakScale = n * 1.7;
      this.speed = i;
      this.popDuration = 150;
      this.minLife = this.popDuration + 500;
      this.life = Math.max(r || 0, this.minLife);
      this.totalLife = this.life || 1;
      this.text = a;
      this.progress = 0;
      this.travel = i * this.totalLife;
      this.elapsed = 0;
    };
    this.update = function (e) {
      if (this.life) {
        this.life -= e;
        if (this.life < 0) {
          this.life = 0;
        }
        this.elapsed = this.totalLife - this.life;
        this.progress = 1 - this.life / this.totalLife;
        if (this.progress < 0) {
          this.progress = 0;
        }
        if (this.progress > 1) {
          this.progress = 1;
        }
        this.y = this.baseY - this.travel * this.progress;
        if (this.elapsed <= this.popDuration) {
          var t = this.elapsed / this.popDuration;
          var n = Math.sin(Math.PI * t);
          this.scale = this.startScale + (this.peakScale - this.startScale) * n;
        } else {
          this.scale = this.startScale;
        }
      }
    };
    this.render = function (e, t, n) {
      e.save();
      e.font = Math.round(this.scale) + "px 'GameFont', sans-serif";
      e.lineJoin = "round";
      e.lineWidth = Math.max(1, this.scale * 0.15);
      e.strokeStyle = "#525252";
      e.fillStyle = this.color;
      var i = this.x - t;
      var r = this.y - n;
      e.strokeText(this.text, i, r);
      e.fillText(this.text, i, r);
      e.restore();
    };
  };
  Dn.exports.TextManager = function () {
    this.texts = [];
    this.update = function (e, t, n, i) {
      t.textBaseline = "middle";
      t.textAlign = "center";
      if (this.texts.length) {
        var r = [];
        for (var a = 0; a < this.texts.length; ++a) {
          var s = this.texts[a];
          if (s && s.life) {
            s.update(e);
            if (s.life > 0) {
              s.render(t, n, i);
              r.push(s);
            }
          }
        }
        this.texts = r;
      }
    };
    this.showText = function (e, t, n, i, r, a, s) {
      var o;
      for (var l = 0; l < this.texts.length; ++l) {
        if (!this.texts[l].life) {
          o = this.texts[l];
          break;
        }
      }
      if (!o) {
        o = new Dn.exports.AnimText();
        this.texts.push(o);
      }
      o.init(e, t, n, i, r, a, s);
    };
  };
  var Hn;
  var jn = Fn.exports;
  var zn = {
    exports: {}
  };
  function Vn() {
    if (!Nn) {
      Nn = 1;
      (function (e) {
        e.exports.groups = [{
          id: 0,
          name: "food",
          layer: 0
        }, {
          id: 1,
          name: "walls",
          place: true,
          limit: 30,
          layer: 0
        }, {
          id: 2,
          name: "spikes",
          place: true,
          limit: 15,
          layer: 0
        }, {
          id: 3,
          name: "mill",
          place: true,
          limit: 7,
          layer: 1
        }, {
          id: 4,
          name: "mine",
          place: true,
          limit: 1,
          layer: 0
        }, {
          id: 5,
          name: "trap",
          place: true,
          limit: 6,
          layer: -1
        }, {
          id: 6,
          name: "booster",
          place: true,
          limit: 20,
          layer: -1
        }, {
          id: 7,
          name: "turret",
          place: true,
          limit: 2,
          layer: 1
        }, {
          id: 8,
          name: "watchtower",
          place: true,
          limit: 12,
          layer: 1
        }, {
          id: 9,
          name: "buff",
          place: true,
          limit: 4,
          layer: -1
        }, {
          id: 10,
          name: "spawn",
          place: true,
          limit: 1,
          layer: -1
        }, {
          id: 11,
          name: "sapling",
          place: true,
          limit: 2,
          layer: 0
        }, {
          id: 12,
          name: "blocker",
          place: true,
          limit: 3,
          layer: -1
        }, {
          id: 13,
          name: "teleporter",
          place: true,
          limit: 2,
          layer: -1
        }];
        e.exports.projectiles = [{
          indx: 0,
          layer: 0,
          src: "arrow_1",
          dmg: 16,
          speed: 1.5,
          scale: 103,
          range: 950
        }, {
          indx: 1,
          layer: 1,
          dmg: 16,
          scale: 20
        }, {
          indx: 0,
          layer: 0,
          src: "arrow_1",
          dmg: 22,
          speed: 2.3,
          scale: 103,
          range: 1150
        }, {
          indx: 0,
          layer: 0,
          src: "arrow_1",
          dmg: 20,
          speed: 2,
          scale: 103,
          range: 1150
        }, {
          indx: 1,
          layer: 1,
          dmg: 10,
          scale: 20
        }, {
          indx: 0,
          layer: 0,
          src: "bullet_1",
          dmg: 34,
          speed: 3.1,
          scale: 160,
          range: 1250
        }];
        const t = e.exports.groups.reduce((e, t) => {
          e[t.name] = t;
          e[t.id] = t;
          return e;
        }, {});
        const n = e => e ? Array.isArray(e) ? e.slice() : Object.entries(e).reduce((e, [t, n]) => {
          if (n !== undefined) {
            e.push(t, n);
          }
          return e;
        }, []) : [];
        e.exports.weapons = [{
          id: 0,
          slot: "primary",
          name: "tool hammer",
          description: "tool for gathering all resources",
          sprite: "hammer_1",
          spriteLength: 140,
          spriteWidth: 140,
          spriteOffsetX: -3,
          spriteOffsetY: 18,
          damage: 24,
          attackRange: 65,
          resourceGain: 1,
          attackCooldownMs: 350,
          cost: {}
        }, {
          id: 1,
          slot: "primary",
          unlockAge: 2,
          name: "hand axe",
          description: "gathers resources at a higher rate",
          sprite: "axe_1",
          spriteLength: 140,
          spriteWidth: 140,
          spriteOffsetX: -5,
          spriteOffsetY: 24,
          damage: 24,
          attackRange: 70,
          resourceGain: 2,
          attackCooldownMs: 380,
          moveSpeedMultiplier: 1,
          cost: {}
        }, {
          id: 2,
          slot: "primary",
          unlockAge: 8,
          requiresWeaponId: 1,
          name: "great axe",
          description: "deal more damage and gather more resources",
          sprite: "great_axe_1",
          spriteLength: 140,
          spriteWidth: 140,
          spriteOffsetX: -8,
          spriteOffsetY: 25,
          damage: 27,
          attackRange: 74,
          resourceGain: 4,
          attackCooldownMs: 410,
          moveSpeedMultiplier: 1,
          cost: {}
        }, {
          id: 3,
          slot: "primary",
          unlockAge: 2,
          name: "short sword",
          description: "increased attack power but slower move speed",
          sprite: "sword_1",
          spriteLength: 130,
          spriteWidth: 210,
          spriteOffsetX: -8,
          spriteOffsetY: 46,
          damage: 27,
          attackRange: 108,
          resourceGain: 1,
          attackCooldownMs: 300,
          moveSpeedMultiplier: 0.84,
          iconScale: 1.3,
          cost: {}
        }, {
          id: 4,
          slot: "primary",
          unlockAge: 8,
          requiresWeaponId: 3,
          name: "katana",
          description: "greater range and damage",
          sprite: "samurai_1",
          spriteLength: 130,
          spriteWidth: 210,
          spriteOffsetX: -8,
          spriteOffsetY: 59,
          damage: 40,
          attackRange: 112,
          resourceGain: 1,
          attackCooldownMs: 400,
          moveSpeedMultiplier: 0.8,
          iconScale: 1.3,
          cost: {}
        }, {
          id: 5,
          slot: "primary",
          unlockAge: 2,
          name: "polearm",
          description: "long range melee weapon",
          sprite: "spear_1",
          spriteLength: 130,
          spriteWidth: 210,
          spriteOffsetX: 2,
          spriteOffsetY: 60,
          damage: 50,
          attackRange: 138,
          resourceGain: 1,
          attackCooldownMs: 900,
          moveSpeedMultiplier: 0.82,
          iconScale: 1.3,
          knockbackBonus: 0.2,
          cost: {}
        }, {
          id: 6,
          slot: "primary",
          unlockAge: 2,
          name: "bat",
          description: "fast long range melee weapon",
          sprite: "bat_1",
          spriteLength: 110,
          spriteWidth: 180,
          spriteOffsetX: -8,
          spriteOffsetY: 53,
          damage: 10,
          attackRange: 105,
          resourceGain: 1,
          attackCooldownMs: 500,
          iconScale: 1.3,
          knockbackBonus: 0.6,
          cost: {}
        }, {
          id: 7,
          slot: "primary",
          unlockAge: 2,
          name: "stick",
          description: "great for gathering but very weak",
          sprite: "stick_1",
          spriteLength: 140,
          spriteWidth: 140,
          spriteOffsetX: 3,
          spriteOffsetY: 24,
          damage: 1,
          attackRange: 70,
          resourceGain: 7,
          attackCooldownMs: 380,
          moveSpeedMultiplier: 1,
          cost: {}
        }, {
          id: 8,
          slot: "secondary",
          unlockAge: 6,
          name: "hunting bow",
          description: "bow used for ranged combat and hunting",
          sprite: "bow_1",
          spriteLength: 120,
          spriteWidth: 120,
          spriteOffsetX: -6,
          spriteOffsetY: 0,
          attackCooldownMs: 500,
          moveSpeedMultiplier: 0.73,
          projectileIndex: 0,
          cost: {
            wood: 4
          }
        }, {
          id: 9,
          slot: "secondary",
          unlockAge: 6,
          name: "great hammer",
          description: "hammer used for destroying structures",
          sprite: "great_hammer_1",
          spriteLength: 140,
          spriteWidth: 140,
          spriteOffsetX: -9,
          spriteOffsetY: 25,
          damage: 10,
          attackRange: 68,
          resourceGain: 1,
          attackCooldownMs: 470,
          moveSpeedMultiplier: 0.9,
          structureDamageMultiplier: 7.5,
          cost: {}
        }, {
          id: 10,
          slot: "secondary",
          unlockAge: 6,
          name: "wooden shield",
          description: "blocks projectiles and reduces melee damage",
          sprite: "shield_1",
          spriteLength: 120,
          spriteWidth: 120,
          spriteOffsetX: 6,
          spriteOffsetY: 0,
          moveSpeedMultiplier: 0.75,
          blockDamageMultiplier: 0.05,
          cost: {}
        }, {
          id: 11,
          slot: "secondary",
          unlockAge: 8,
          requiresWeaponId: 8,
          name: "crossbow",
          description: "deals more damage and has greater range",
          sprite: "crossbow_1",
          spriteLength: 120,
          spriteWidth: 120,
          spriteOffsetX: -4,
          spriteOffsetY: 0,
          attackCooldownMs: 750,
          moveSpeedMultiplier: 0.68,
          projectileIndex: 2,
          renderAboveHand: true,
          armRotationMultiplier: 0.75,
          cost: {
            wood: 5
          }
        }, {
          id: 12,
          slot: "secondary",
          unlockAge: 9,
          requiresWeaponId: 12,
          disabled: true,
          name: "repeater crossbow",
          description: "high firerate crossbow with reduced damage",
          sprite: "crossbow_2",
          spriteLength: 120,
          spriteWidth: 120,
          spriteOffsetX: -4,
          spriteOffsetY: 0,
          attackCooldownMs: 280,
          moveSpeedMultiplier: 0.68,
          projectileIndex: 3,
          renderAboveHand: true,
          armRotationMultiplier: 0.75,
          cost: {
            wood: 10
          }
        }, {
          id: 13,
          slot: "secondary",
          unlockAge: 9,
          requiresWeaponId: 12,
          disabled: true,
          name: "musket",
          description: "slow firerate but high damage and range",
          sprite: "musket_1",
          spriteLength: 205,
          spriteWidth: 205,
          spriteOffsetX: 25,
          spriteOffsetY: 0,
          attackCooldownMs: 1700,
          moveSpeedMultiplier: 0.6,
          projectileIndex: 5,
          hideProjectile: true,
          renderAboveHand: true,
          armRotationMultiplier: 0.6,
          offHandAngleMultiplier: 0.3,
          offHandDistanceMultiplier: 1.6,
          selfRecoil: 0.35,
          cost: {
            stone: 10
          }
        }, {
          id: 16,
          slot: "secondary",
          unlockAge: 6,
          disabled: true,
          name: "magic stick",
          description: "lets you tame animals",
          sprite: "magic_stick_1",
          spriteLength: 140,
          spriteWidth: 140,
          spriteOffsetX: 3,
          spriteOffsetY: 24,
          damage: 1,
          attackRange: 70,
          resourceGain: 7,
          attackCooldownMs: 400,
          moveSpeedMultiplier: 1,
          cost: {}
        }].map((e, t) => {
          const i = e.slot || "primary";
          const r = e.cost || {};
          const a = Object.assign({}, e, {
            id: typeof e.id == "number" ? e.id : t,
            slot: i,
            cost: r
          });
          a.type = i === "secondary" ? 1 : 0;
          if (e.unlockAge !== undefined) {
            a.age = e.unlockAge;
          }
          a.pre = e.requiresWeaponId;
          a.desc = e.description;
          a.src = e.sprite;
          a.length = e.spriteLength;
          a.width = e.spriteWidth;
          a.xOff = e.spriteOffsetX;
          a.yOff = e.spriteOffsetY;
          a.dmg = e.damage;
          a.range = e.attackRange;
          a.gather = e.resourceGain;
          a.speed = e.attackCooldownMs;
          a.spdMult = e.moveSpeedMultiplier;
          a.iPad = e.iconScale;
          a.knock = e.knockbackBonus;
          a.projectile = e.projectileIndex;
          a.hideProjectile = e.hideProjectile;
          a.aboveHand = e.renderAboveHand;
          a.armS = e.armRotationMultiplier;
          a.hndS = e.offHandAngleMultiplier;
          a.hndD = e.offHandDistanceMultiplier;
          a.rec = e.selfRecoil;
          a.sDmg = e.structureDamageMultiplier;
          a.shield = e.blockDamageMultiplier;
          a.req = n(r);
          return a;
        });
        const i = [{
          id: 0,
          group: "food",
          name: "apple",
          description: "restores 20 health when consumed",
          cost: {
            food: 10
          },
          consume: function (e) {
            return e.changeHealth(20, e);
          },
          sprite: "apple.png",
          holdOffset: 15,
          sizeMultiplier: 1.23,
          scale: 22
        }, {
          id: 1,
          unlockAge: 3,
          group: "food",
          name: "cookie",
          description: "restores 40 health when consumed",
          cost: {
            food: 15
          },
          consume: function (e) {
            return e.changeHealth(40, e);
          },
          sprite: "cookie_1.png",
          holdOffset: 40,
          sizeMultiplier: 1.5,
          scale: 27
        }, {
          id: 2,
          unlockAge: 7,
          group: "food",
          disabled: true,
          name: "cheese",
          description: "restores 30 health and another 50 over 5 seconds",
          cost: {
            food: 25
          },
          consume: function (e) {
            return (!!e.changeHealth(30, e) || !!(e.health < 100)) && !(e.dmgOverTime.dmg = -10, e.dmgOverTime.doer = e, e.dmgOverTime.time = 5, 0);
          },
          sprite: "cheese.svg",
          holdOffset: 15,
          sizeMultiplier: 1,
          scale: 27
        }, {
          id: 3,
          group: "walls",
          name: "wood wall",
          description: "provides protection for your village",
          cost: {
            wood: 10
          },
          takesProjectileDamage: true,
          health: 380,
          sprite: "wood_wall.png",
          holdOffset: 13,
          placeOffset: -5,
          sizeMultiplier: 1.05,
          scale: 50
        }, {
          id: 4,
          unlockAge: 3,
          group: "walls",
          name: "stone wall",
          description: "provides improved protection for your village",
          cost: {
            stone: 25
          },
          health: 900,
          sprite: "stone_wall.png",
          holdOffset: 13,
          placeOffset: -5,
          sizeMultiplier: 1.15,
          scale: 50
        }, {
          id: 5,
          unlockAge: 7,
          group: "walls",
          disabled: true,
          name: "castle wall",
          description: "provides powerful protection for your village",
          cost: {
            stone: 35
          },
          health: 1500,
          sprite: "castle_wall.png",
          holdOffset: 20,
          placeOffset: -5,
          sizeMultiplier: 1,
          scale: 52,
          requiresItemId: 4
        }, {
          id: 6,
          group: "spikes",
          name: "spikes",
          description: "damages enemies when they touch them",
          cost: {
            wood: 20,
            stone: 5
          },
          health: 400,
          contactDamage: 20,
          sprite: "spikes.png",
          spritePadding: -23,
          holdOffset: 12,
          placeOffset: -5,
          sizeMultiplier: 1.15,
          scale: 49
        }, {
          id: 7,
          unlockAge: 5,
          group: "spikes",
          name: "greater spikes",
          description: "damages enemies when they touch them",
          cost: {
            wood: 30,
            stone: 10
          },
          health: 500,
          contactDamage: 35,
          sprite: "greater_spikes.png",
          spritePadding: -23,
          holdOffset: 12,
          placeOffset: -5,
          sizeMultiplier: 1.15,
          scale: 52
        }, {
          id: 8,
          unlockAge: 9,
          group: "spikes",
          disabled: true,
          name: "poison spikes",
          description: "poisons enemies when they touch them",
          cost: {
            wood: 35,
            stone: 15
          },
          health: 600,
          contactDamage: 30,
          poisonDamage: 5,
          sprite: "poison_spikes.png",
          spritePadding: -23,
          holdOffset: 12,
          placeOffset: -5,
          sizeMultiplier: 1.15,
          scale: 52,
          requiresItemId: 7
        }, {
          id: 9,
          unlockAge: 9,
          group: "spikes",
          name: "spinning spikes",
          description: "damages enemies when they touch them",
          cost: {
            wood: 30,
            stone: 20
          },
          health: 500,
          contactDamage: 45,
          turretTurnSpeed: 0.003,
          sprite: "spinning_spikes.png",
          spritePadding: -23,
          holdOffset: 12,
          placeOffset: -5,
          sizeMultiplier: 1.15,
          scale: 52,
          requiresItemId: 7,
          requiresItemIds: [16]
        }, {
          id: 10,
          group: "mill",
          name: "windmill",
          description: "generates gold over time",
          cost: {
            wood: 50,
            stone: 10
          },
          health: 400,
          turretTurnSpeed: 0.0016,
          pointsPerSecond: 1,
          sprite: "mill_1.png",
          spriteTop: "mill_2.png",
          spritePadding: 25,
          holdOffset: 52,
          placeOffset: 5,
          sizeMultiplier: 2.25,
          scale: 45,
          iconLineMultiplier: 12
        }, {
          id: 11,
          unlockAge: 5,
          group: "mill",
          name: "faster windmill",
          description: "generates more gold over time",
          cost: {
            wood: 60,
            stone: 20
          },
          health: 500,
          turretTurnSpeed: 0.0025,
          pointsPerSecond: 1.5,
          sprite: "mill_1.png",
          spriteTop: "mill_2.png",
          spritePadding: 25,
          holdOffset: 52,
          placeOffset: 5,
          sizeMultiplier: 2.25,
          scale: 45,
          iconLineMultiplier: 12,
          requiresItemId: 10
        }, {
          id: 12,
          unlockAge: 8,
          group: "mill",
          name: "power mill",
          description: "generates more gold over time",
          cost: {
            wood: 100,
            stone: 50
          },
          health: 800,
          turretTurnSpeed: 0.005,
          pointsPerSecond: 2,
          sprite: "mill_1.png",
          spriteTop: "mill_2.png",
          spritePadding: 25,
          holdOffset: 52,
          placeOffset: 5,
          sizeMultiplier: 2.25,
          scale: 45,
          iconLineMultiplier: 12,
          requiresItemId: 11
        }, {
          id: 13,
          unlockAge: 5,
          group: "mine",
          name: "mine",
          description: "allows you to mine stone",
          cost: {
            wood: 20,
            stone: 100
          },
          sprite: "mine.png",
          holdOffset: 50,
          placeOffset: -15,
          sizeMultiplier: 1,
          scale: 110,
          iconLineMultiplier: 12,
          type: 2
        }, {
          id: 14,
          unlockAge: 5,
          group: "sapling",
          name: "sapling",
          description: "allows you to farm wood",
          cost: {
            wood: 150
          },
          sprite: "sapling.png",
          holdOffset: 50,
          placeOffset: -15,
          sizeMultiplier: 1,
          scale: 110,
          collisionScale: 0.5,
          iconLineMultiplier: 12,
          type: 0
        }, {
          id: 15,
          unlockAge: 4,
          group: "trap",
          name: "pit trap",
          description: "pit that traps enemies if they walk over it",
          cost: {
            wood: 30,
            stone: 30
          },
          health: 500,
          sprite: "trap.png",
          holdOffset: 20,
          placeOffset: -5,
          sizeMultiplier: 1.25,
          scale: 50,
          ignoreCollision: true,
          collisionScale: 0.2,
          hideFromEnemies: true,
          isTrap: true
        }, {
          id: 16,
          unlockAge: 4,
          group: "booster",
          name: "boost pad",
          description: "provides boost when stepped on",
          cost: {
            stone: 20,
            wood: 5
          },
          health: 150,
          speedBoost: 1,
          sprite: "boost_pad.png",
          holdOffset: 11,
          placeOffset: -5,
          sizeMultiplier: 1.12,
          scale: 45,
          ignoreCollision: true,
          collisionScale: 0.7
        }, {
          id: 17,
          unlockAge: 7,
          group: "turret",
          name: "turret",
          description: "defensive structure that shoots at enemies",
          cost: {
            wood: 200,
            stone: 150
          },
          disabled: true,
          health: 800,
          projectileIndex: 1,
          autoAttackRange: 700,
          autoAttackRateMs: 2200,
          sprite: "turret.png",
          holdOffset: 20,
          placeOffset: -5,
          sizeMultiplier: 1,
          scale: 43,
          doUpdate: true
        }, {
          id: 18,
          unlockAge: 7,
          group: "watchtower",
          name: "platform",
          description: "platform to shoot over walls and cross over water",
          cost: {
            wood: 20
          },
          health: 300,
          sprite: "platform.png",
          holdOffset: 15,
          placeOffset: -5,
          sizeMultiplier: 1.24,
          scale: 43,
          ignoreCollision: true,
          zIndex: 1
        }, {
          id: 19,
          unlockAge: 7,
          group: "buff",
          name: "healing pad",
          description: "standing on it will slowly heal you",
          cost: {
            wood: 30,
            food: 10
          },
          health: 400,
          healOnContact: 15,
          sprite: "healing_pad.png",
          holdOffset: 15,
          placeOffset: -5,
          sizeMultiplier: 1.23,
          scale: 45,
          ignoreCollision: true,
          collisionScale: 0.7
        }, {
          id: 20,
          unlockAge: 9,
          group: "spawn",
          name: "spawn pad",
          description: "you will spawn here when you die but it will dissapear",
          cost: {
            wood: 100,
            stone: 100
          },
          health: 400,
          sprite: "spawn_pad.png",
          holdOffset: 20,
          placeOffset: -5,
          sizeMultiplier: 1.25,
          scale: 45,
          ignoreCollision: true,
          spawnPoint: true
        }, {
          id: 21,
          unlockAge: 7,
          group: "blocker",
          name: "blocker",
          description: "blocks building in radius",
          cost: {
            wood: 30,
            stone: 25
          },
          health: 400,
          disabled: true,
          sprite: "blocker.png",
          holdOffset: 20,
          placeOffset: -5,
          sizeMultiplier: 1,
          scale: 45,
          blockerRadius: 300,
          ignoreCollision: true,
          collisionScale: 0.7
        }, {
          id: 22,
          unlockAge: 7,
          group: "teleporter",
          name: "teleporter",
          description: "teleports you to a random point on the map",
          cost: {
            wood: 60,
            stone: 60
          },
          health: 200,
          sprite: "teleporter.png",
          holdOffset: 20,
          placeOffset: -5,
          sizeMultiplier: 1,
          scale: 45,
          ignoreCollision: true,
          collisionScale: 0.7,
          teleport: true
        }, {
          id: 23,
          name: "skull stash",
          description: "stores some resources from a fallen player",
          sprite: ".././img/animals/skull_1.png",
          spriteRotation: -Math.PI / 2,
          health: 100,
          scale: 70,
          ignoreCollision: true,
          collisionScale: 0,
          opacity: 0.8,
          layer: -1,
          cost: {}
        }];
        e.exports.list = i.map((e, i) => {
          const r = e.cost || {};
          const a = Object.assign({}, e, {
            id: typeof e.id == "number" ? e.id : i,
            cost: r
          });
          if (e.unlockAge !== undefined) {
            a.age = e.unlockAge;
          }
          if (e.group !== undefined) {
            a.group = (typeof e.group == "string" || typeof e.group == "number") && t[e.group] || e.group;
          }
          a.pre = e.requiresItemId;
          a.requiresAll = e.requiresItemIds;
          a.req = n(r);
          a.dmg = e.contactDamage;
          a.pDmg = e.poisonDamage;
          a.healCol = e.healOnContact;
          a.projDmg = e.takesProjectileDamage;
          a.boostSpeed = e.speedBoost;
          a.projectile = e.projectileIndex;
          a.shootRange = e.autoAttackRange;
          a.shootRate = e.autoAttackRateMs;
          a.turnSpeed = e.turretTurnSpeed;
          a.pps = e.pointsPerSecond;
          a.trap = e.isTrap;
          a.blocker = e.blockerRadius;
          a.colDiv = e.collisionScale;
          a.iconLineMult = e.iconLineMultiplier;
          a.imgPath = e.sprite;
          a.imgTopPath = e.spriteTop;
          a.hideFromEnemy = e.hideFromEnemies;
          a.sizeMult = e.sizeMultiplier;
          return a;
        });
        e.exports.deathSkullItemId = e.exports.list.findIndex(function (e) {
          return e && e.name === "skull stash";
        });
        e.exports.environment = [{
          type: 0,
          name: "tree",
          desc: "stationary resource node for wood",
          resource: "wood",
          spritePath: ".././img/world/tree_1.png",
          scaleOptions: [165],
          spawn: {
            perArea: 9,
            excludedBiomes: ["river", "beach", "desert", "volcano", "cherry"]
          }
        }, {
          type: 1,
          name: "bush",
          desc: "stationary resource node for food",
          resource: "food",
          spritePath: ".././img/world/bush_1.png",
          scaleOptions: [90],
          spawn: {
            perArea: 3,
            excludedBiomes: ["river", "beach", "desert", "volcano", "cherry"]
          }
        }, {
          type: 2,
          name: "stone",
          desc: "stationary resource node for stone",
          resource: "stone",
          spritePath: ".././img/world/stone_1.png",
          scaleOptions: [95],
          spawn: {
            total: 32,
            excludedBiomes: ["river", "beach", "volcano"],
            ignoreWaterCheck: true
          }
        }, {
          type: 3,
          name: "gold mine",
          desc: "stationary resource node for gold",
          resource: "gold",
          spritePath: ".././img/world/gold_1.png",
          scaleOptions: [120],
          spawn: {
            total: 7,
            excludedBiomes: ["river", "beach"],
            ignoreWaterCheck: true
          }
        }, {
          type: 0,
          id: 1000,
          name: "palm",
          desc: "beach-only tree that yields wood",
          resource: "wood",
          spritePath: ".././img/world/palmtree_1.png",
          scaleOptions: [170],
          randomRotation: true,
          spawn: {
            perArea: 3,
            requiredBiomes: ["beach"]
          }
        }, {
          type: 2,
          id: 1001,
          name: "darkstone",
          desc: "volcano stone deposit",
          resource: "stone",
          spritePath: ".././img/world/darkstone_1.png",
          scaleOptions: [110],
          spawn: {
            total: 12,
            requiredBiomes: ["volcano"],
            ignoreWaterCheck: true
          }
        }, {
          type: 1,
          id: 1002,
          name: "sakura-bush",
          desc: "cherry biome bush for food",
          resource: "food",
          spritePath: ".././img/world/sakurabush_1.png",
          scaleOptions: [90],
          spawn: {
            perArea: 6,
            requiredBiomes: ["cherry"]
          }
        }, {
          type: 0,
          id: 1003,
          name: "sakura-tree",
          desc: "cherry biome tree for wood",
          resource: "wood",
          spritePath: ".././img/world/sakuratree_1.png",
          scaleOptions: [170],
          randomRotation: true,
          spawn: {
            perArea: 6,
            requiredBiomes: ["cherry"]
          }
        }, {
          type: 0,
          id: 1004,
          name: "autumn-tree",
          desc: "desert biome tree for wood",
          resource: "wood",
          spritePath: ".././img/world/automntree_1.png",
          scaleOptions: [170],
          randomRotation: true,
          spawn: {
            perArea: 5,
            requiredBiomes: ["desert"]
          }
        }, {
          type: 0,
          id: 1005,
          name: "winter-tree",
          desc: "snow biome tree for wood",
          resource: "wood",
          spritePath: ".././img/world/wintertree_1.png",
          scaleOptions: [170],
          randomRotation: true,
          spawn: {
            perArea: 6,
            requiredBiomes: ["winter"]
          }
        }];
      })(zn);
    }
    return zn.exports;
  }
  var Wn = {
    exports: {}
  };
  function Un() {
    if (Hn) {
      return Wn.exports;
    }
    Hn = 1;
    var e = {
      plains: "#6D824E",
      winter: "#E8E1DE",
      cherry: "#8EA35B",
      beach: "#FFEAAD",
      river: "#4A85A5",
      desert: "#B69167",
      volcano: "#5E554D"
    };
    var t = [{
      name: "winter",
      startRatio: 0,
      endRatio: 0.22
    }, {
      name: "cherry",
      startRatio: 0.22,
      endRatio: 0.42
    }, {
      name: "plains",
      startRatio: 0.42,
      endRatio: 0.72
    }, {
      name: "desert",
      startRatio: 0.72,
      endRatio: 0.9
    }, {
      name: "volcano",
      startRatio: 0.9,
      endRatio: 1
    }];
    function n(e, t) {
      if (typeof e != "number" || isNaN(e)) {
        return t;
      } else {
        return e;
      }
    }
    function i(e, t, i) {
      var r = n(e, null);
      if (r !== null) {
        return r;
      }
      var a = n(t, null);
      if (a !== null) {
        return a * i;
      } else {
        return null;
      }
    }
    function r(r) {
      var a;
      var s = (a = r) ? typeof a.mapScale == "number" ? a.mapScale : a.map && typeof a.map.mapScale == "number" ? a.map.mapScale : 14400 : 14400;
      var o = function (e, i) {
        for (var r = Array.isArray(e) && e.length ? e : t, a = [], s = 0, o = 0; o < r.length; ++o) {
          var l = r[o] || {};
          var c = l.name || "band_" + o;
          var u = n(l.startRatio, null);
          var d = n(l.endRatio, null);
          var h = n(l.start, null);
          var p = n(l.end, null);
          if (u !== null) {
            h = u * i;
          }
          if (d !== null) {
            p = d * i;
          }
          if (h === null) {
            h = s;
          }
          if (p === null || p <= h) {
            p = Math.max(h, h + i * 0.1);
          }
          h = Math.max(0, Math.min(i, Math.round(h)));
          p = Math.max(h, Math.min(i, Math.round(p)));
          a.push({
            name: c,
            start: h,
            end: p
          });
          s = p;
        }
        if (a.length && a[a.length - 1].end < i) {
          a[a.length - 1].end = i;
        }
        return a;
      }(r && r.biomeBands, s);
      var l = Object.assign({}, e, r && r.biomeColors);
      var c = function (e, t) {
        var r = e && e.riverCurve || {};
        var a = n(e && e.biomeBeachSize, 220);
        var s = n(e && e.riverWidth, n(e && e.world && e.world.riverWidth, 724));
        var o = n(e && e.riverPadding, n(e && e.world && e.world.riverPadding, 114));
        var l = i(r.splitStart, r.splitStartRatio, t);
        var c = i(r.splitEnd, r.splitEndRatio, t);
        if (l !== null && c === null) {
          c = l + t * 0.12;
        }
        if (l !== null && c !== null && c <= l) {
          c = l + Math.max(1, t * 0.02);
        }
        var u = null;
        if (l !== null && c !== null && c > l) {
          var d = i(r.splitMaxSeparation, r.splitSeparationRatio, t);
          if (d === null) {
            d = t * 0.12;
          }
          var h = i(r.splitTopDrift, r.splitTopDriftRatio, t);
          if (h === null) {
            h = t * 0.05;
          }
          var p = i(r.splitBottomDrift, r.splitBottomDriftRatio, t);
          if (p === null) {
            p = t * 0.05;
          }
          var m = n(r.splitBranchWidth, null);
          if (m === null) {
            m = s * n(r.splitWidthRatio, 0.55);
          }
          u = {
            enabled: true,
            start: l,
            end: c,
            maxSeparation: Math.max(0, d),
            topDrift: Math.max(0, h),
            bottomDrift: Math.max(0, p),
            branchWidth: Math.max(0, m),
            branchBeachSize: Math.max(0, n(r.splitBeachSize, 0)),
            easePower: Math.max(0.1, n(r.splitEasePower, 1.1)),
            branchRampPower: Math.max(0.1, n(r.splitBranchRampPower, 0.85)),
            taperPower: Math.max(0.1, n(r.splitTaperPower, 1.2))
          };
        }
        var f = s;
        if (u && u.branchWidth) {
          f = Math.max(f, u.branchWidth);
        }
        return {
          width: s,
          padding: o,
          midlineRatio: n(r.midlineRatio, 0.62),
          amplitude: n(r.amplitude, null),
          amplitudeRatio: n(r.amplitudeRatio, 0.08),
          frequency: n(r.frequency, 1.18),
          beachSize: a,
          wobble: n(r.wobble, 0.12),
          mapScale: t,
          split: u,
          maxChannelWidth: f
        };
      }(r, s);
      function u(e) {
        var t = e / s;
        var n = c.amplitude !== null ? c.amplitude : c.amplitudeRatio * s;
        var i = Math.sin(t * Math.PI * 2) * n * c.wobble;
        return c.midlineRatio * s + Math.sin(t * Math.PI * c.frequency - Math.PI / 2) * n + i;
      }
      function d(e) {
        var t = u(e);
        var n = [];
        var i = c.split;
        var r = c.width;
        if (!i || !i.enabled) {
          n.push({
            id: "main",
            centerY: t,
            width: r,
            beachSize: c.beachSize
          });
          return n;
        }
        var a = function (e) {
          if (!c.split || !c.split.enabled) {
            return 0;
          }
          if (e <= c.split.start) {
            return 0;
          }
          if (e >= c.split.end) {
            return 1;
          }
          var t = c.split.end - c.split.start;
          if (t <= 0) {
            return 1;
          }
          var n = (e - c.split.start) / t;
          return Math.pow(Math.max(0, Math.min(1, n)), c.split.easePower || 1);
        }(e);
        var s = a <= 0 ? 1 : Math.max(0, 1 - Math.pow(a, i.taperPower || 1));
        if (s > 0.02) {
          n.push({
            id: "main",
            centerY: t,
            width: r * s,
            beachSize: c.beachSize
          });
        }
        var o = a <= 0 ? 0 : Math.pow(a, i.branchRampPower || 1);
        var l = i.branchWidth * o;
        if (l > 0.02) {
          var d = i.maxSeparation * a;
          var h = i.topDrift * o;
          var p = i.bottomDrift * o;
          n.push({
            id: "splitTop",
            centerY: t - d - h,
            width: l,
            beachSize: i.branchBeachSize
          });
          n.push({
            id: "splitBottom",
            centerY: t + d + p,
            width: l,
            beachSize: i.branchBeachSize
          });
        }
        if (!n.length) {
          n.push({
            id: "main",
            centerY: t,
            width: r,
            beachSize: c.beachSize
          });
        }
        return n;
      }
      function h(e, t, n) {
        var i = n || 0;
        for (var r = d(e), a = 0; a < r.length; ++a) {
          var s = r[a];
          var o = s.width / 2 + i;
          if (o > 0 && Math.abs(t - s.centerY) <= o) {
            return true;
          }
        }
        return false;
      }
      function p(e, t) {
        for (var n = d(e), i = 0; i < n.length; ++i) {
          var r = n[i];
          if (r.beachSize) {
            var a = r.width / 2;
            var s = Math.abs(t - r.centerY);
            if (s > a && s <= a + r.beachSize) {
              return true;
            }
          }
        }
        return false;
      }
      function m(e) {
        for (var t = 0; t < o.length; ++t) {
          var n = o[t];
          if (e >= n.start && e <= n.end) {
            return n.name;
          }
        }
        if (o.length) {
          return o[o.length - 1].name;
        } else {
          return "plains";
        }
      }
      function f(e, t) {
        var n = d(e);
        if (!n.length) {
          return null;
        }
        if (!t) {
          return n[0];
        }
        for (var i = 0; i < n.length; ++i) {
          if (n[i].id === t) {
            return n[i];
          }
        }
        return n[0];
      }
      function g(e, t) {
        var n = Math.max(1, s * 0.002);
        var i = function (e, t) {
          var n = d(e);
          if (!n.length) {
            return null;
          }
          if (typeof t != "number") {
            for (var i = 0; i < n.length; ++i) {
              if (n[i].id === "main") {
                return n[i];
              }
            }
            return n[0];
          }
          var r = n[0];
          var a = Math.abs(t - r.centerY);
          for (var s = 1; s < n.length; ++s) {
            var o = Math.abs(t - n[s].centerY);
            if (o < a) {
              a = o;
              r = n[s];
            }
          }
          return r;
        }(e, t);
        if (!i) {
          var r = u(e - n);
          var a = u(e + n);
          return Math.atan2(a - r, n * 2);
        }
        var o = f(e - n, i.id);
        var l = f(e + n, i.id);
        if (!o || !l) {
          var c = u(e - n);
          var h = u(e + n);
          return Math.atan2(h - c, n * 2);
        }
        return Math.atan2(l.centerY - o.centerY, n * 2);
      }
      return {
        mapScale: s,
        bands: o,
        colors: l,
        river: c,
        baseBiome: m,
        getBiome: function (e, t) {
          if (h(e, t, 0)) {
            return "river";
          } else if (p(e, t)) {
            return "beach";
          } else {
            return m(t);
          }
        },
        isInRiver: h,
        isOnBeach: p,
        getRiverChannels: d,
        riverCenterY: function (e) {
          var t = d(e);
          if (t.length) {
            return t[0].centerY;
          } else {
            return u(e);
          }
        },
        distanceToRiver: function (e, t) {
          for (var n = d(e), i = null, r = 0; r < n.length; ++r) {
            var a = Math.abs(t - n[r].centerY);
            if (i === null || a < i) {
              i = a;
            }
          }
          if (i === null) {
            return Math.abs(t - u(e));
          } else {
            return i;
          }
        },
        getRiverFlowAngle: g,
        getRiverFlowVector: function (e, t) {
          var n = g(e, t);
          return {
            angle: n,
            x: Math.cos(n),
            y: Math.sin(n)
          };
        },
        colorForBiome: function (t) {
          return l[t] || l.plains || e.plains;
        }
      };
    }
    r.DEFAULT_BIOME_COLORS = e;
    r.DEFAULT_BANDS = t;
    Wn.exports = r;
    Wn.exports.default = r;
    return Wn.exports;
  }
  var Gn = {};
  var Yn = typeof process == "object" && process !== null;
  function Xn(e, t) {
    if (typeof e != "number" || isNaN(e)) {
      return t;
    } else {
      return e;
    }
  }
  function qn(e) {
    if (typeof e != "string") {
      return null;
    }
    var t = e.trim().toLowerCase();
    if (t) {
      if (t === "classic" || t === "normal" || t === "standard") {
        return "normal";
      } else if (t === "sandbox") {
        return "sandbox";
      } else if (t === "dev" || t === "development") {
        return "dev";
      } else if (t === "1vs1" || t === "1v1" || t === "duel" || t === "duels") {
        return "1vs1";
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  function Kn(e) {
    return e === "sandbox" || e === "dev";
  }
  function Jn(e) {
    return {
      normal: Xn(e && e.normal, 0),
      moofoll: Xn(e && e.moofoll, 0)
    };
  }
  function Zn(e) {
    return {
      goldPerPps: Xn(e && e.goldPerPps, 0),
      flatGold: Xn(e && e.flatGold, 0),
      xpPerPps: Xn(e && e.xpPerPps, 0)
    };
  }
  var Qn = Yn && Array.isArray(process.argv) && process.argv.indexOf("--largeserver") !== -1 ? 80 : 50;
  var $n = [{
    id: 0,
    src: "",
    xp: 0,
    val: 1
  }, {
    id: 1,
    src: "_g",
    xp: 3000,
    val: 1.1
  }, {
    id: 2,
    src: "_d",
    xp: 7000,
    val: 1.18
  }];
  var ei = Vn();
  var ti = {
    normal: 100,
    moofoll: 100
  };
  var ni = {
    normal: 100000,
    moofoll: 100000
  };
  var ii = {
    goldPerPps: 1,
    flatGold: 0,
    xpPerPps: 5
  };
  var ri = {
    goldPerPps: 0,
    flatGold: 100,
    xpPerPps: 100
  };
  var ai = Un();
  var si = ai.DEFAULT_BIOME_COLORS;
  var oi = ai.DEFAULT_BANDS;
  var li = Array.isArray(ei && ei.environment) ? ei.environment : [];
  function ci(e, t) {
    if (typeof e != "string" || !e.length) {
      if (Array.isArray(t)) {
        return t.slice();
      } else {
        return t;
      }
    }
    for (var n = 0; n < li.length; ++n) {
      var i = li[n];
      if (i && i.name === e) {
        var r = Array.isArray(i.scaleOptions) ? i.scaleOptions.filter(function (e) {
          return typeof e == "number" && !isNaN(e);
        }) : null;
        if (r && r.length) {
          return r.slice();
        }
        break;
      }
    }
    if (Array.isArray(t)) {
      return t.slice();
    } else {
      return t;
    }
  }
  var ui;
  var di;
  var hi;
  var pi;
  var mi;
  var fi;
  var gi;
  var yi;
  var vi;
  var bi;
  var wi;
  var ki;
  var Si;
  var xi;
  var Ii;
  var Mi;
  var Ei;
  var Pi;
  var Ti;
  var Ai = {
    tree: ci("tree", [165]),
    bush: ci("bush", [90]),
    stone: ci("stone", [110]),
    gold: ci("gold mine", [85]),
    palm: ci("palm", [170]),
    darkstone: ci("darkstone", [110]),
    sakuraBush: ci("sakura-bush", [90]),
    sakuraTree: ci("sakura-tree", [170]),
    autumnTree: ci("autumn-tree", [170]),
    winterTree: ci("winter-tree", [170])
  };
  var Ci = {
    treesPerArea: 9,
    bushesPerArea: 3,
    totalRocks: 32,
    goldOres: 7,
    palmTreesPerArea: 3,
    darkStones: 12,
    sakuraBushesPerArea: 6,
    sakuraTreesPerArea: 6,
    autumnTreesPerArea: 5,
    winterTreesPerArea: 6
  };
  var _i = {
    client: {
      devClient: false
    },
    serverIdentity: {
      type: "dev"
    },
    render: {
      maxScreenWidth: 2048,
      maxScreenHeight: 1152,
      playerImageScale: 1.5,
      placeableImages: {
        basePath: ".././img/items/",
        sizeMultiplier: 1
      }
    },
    decoration: {
      decorationSprites: {
        0: ".././img/world/decors/particle_0.png",
        flower_0: ".././img/world/decors/flower_0.png"
      },
      decorations: [{
        id: 0,
        x: 3000,
        y: 3000,
        rotation: 0,
        size: 110,
        layer: 0
      }, {
        id: "flower_0",
        x: 3120,
        y: 3000,
        rotation: 0.3,
        size: 110,
        layer: 0
      }]
    },
    server: {
      serverUpdateRate: 14,
      maxPlayers: Qn,
      maxPlayersHard: Qn + 10,
      collisionDepth: 6,
      minimapRate: 3000,
      botMode: false
    },
    collisions: {
      colGrid: 10
    },
    networking: {
      clientSendRate: 5
    },
    ui: {
      healthBarWidth: 50,
      healthBarPad: 4.5,
      healthBarImage: {
        path: ".././img/misc/healthbar.png",
        width: 220,
        height: 50,
        scale: 0.5,
        xOffset: 0,
        yOffset: -4,
        fillOffsetX: 0,
        fillOffsetY: 0,
        fillWidthMultiplier: 1,
        fillHeightMultiplier: 1
      },
      iconPadding: 15,
      iconPad: 0.9,
      deathFadeout: 3000,
      crownIconScale: 50,
      crownPad: 35
    },
    chat: {
      chatCountdown: 3000,
      chatCooldown: 500
    },
    sandbox: {
      isSandbox: true,
      millPpsMultiplier: 5,
      sandboxBuildLimits: {
        mill: 20,
        spikes: 200,
        traps: 100,
        turrets: 20,
        general: 100
      }
    },
    oneVsOne: {
      enabled: false,
      arenaColumns: 4,
      arenaRows: 4,
      edgePadding: 1800,
      spawnSeparation: 520,
      leaderboardLimit: 10
    },
    player: {
      maxAge: 100,
      gatherAngle: Math.PI / 2.6,
      gatherWiggle: 10,
      hitReturnRatio: 0.25,
      hitEaseOutPower: 1.6,
      hitEaseInPower: 1.8,
      hitAngle: Math.PI / 2,
      missHitAngle: Math.PI / 1.6,
      baseHealth: 100,
      playerScale: 35,
      playerSpeed: 0.0017,
      playerDecel: 0.993,
      nameY: 34,
      startItems: [0, 3, 6, 10],
      startWeapons: [0],
      startResources: Jn(ti),
      millTickRewards: Zn(ii)
    },
    customization: {
      playerSkins: [{
        id: 0,
        name: "Black",
        imgPath: ".././img/player/player_1.png",
        accentColor: "#1f1f1f"
      }]
    },
    gameplay: {
      tameAnimals: false
    },
    animals: {
      animalCount: 100000,
      aiTurnRandom: 0.06,
      cowNames: ["Sid", "Steph", "Bmoe", "Romn", "Jononthecool", "Fiona", "Vince", "Nathan", "Nick", "Flappy", "Ronald", "Otis", "Pepe", "Mc Donald", "Theo", "Fabz", "Oliver", "Jeff", "Jimmy", "Helena", "Reaper", "Ben", "Alan", "Naomi", "XYZ", "Clever", "Jeremy", "Mike", "Destined", "Stallion", "Allison", "Meaty", "Sophia", "Vaja", "Joey", "Pendy", "Murdoch", "Theo", "Jared", "July", "Sonia", "Mel", "Dexter", "Quinn", "Milky"],
      animalSpawnPlan: [{
        index: 0,
        desired: 0
      }, {
        index: 1,
        desired: 0
      }, {
        index: 5,
        desired: 0
      }, {
        index: 2,
        desired: 0
      }, {
        index: 3,
        desired: 0
      }, {
        index: 12,
        desired: 3
      }, {
        index: 13,
        desired: 1
      }, {
        index: 6,
        desired: 0,
        positions: [{
          xRatio: 0.42,
          yRatio: 0.72
        }]
      }, {
        index: 7,
        desired: 0,
        positions: [{
          xRatio: 0.18,
          yRatio: 0.22
        }]
      }, {
        index: 8,
        desired: 0,
        positions: [{
          xRatio: 0.78,
          yRatio: 0.64
        }]
      }]
    },
    weapons: {
      shieldAngle: Math.PI / 3,
      weaponVariants: $n,
      fetchVariant: function (e) {
        var t = e.weaponXP[e.weaponIndex] || 0;
        for (var n = $n.length - 1; n >= 0; --n) {
          if (t >= $n[n].xp) {
            return $n[n];
          }
        }
        return $n[0];
      },
      list: null
    },
    world: Object.assign({
      resourceTypes: ["wood", "food", "stone", "points"],
      areaCount: 7,
      riverWidth: 724,
      riverPadding: 114,
      waterCurrent: 0.0011,
      waveSpeed: 0.0001,
      waveMax: 1.3,
      treeScales: Ai.tree,
      bushScales: Ai.bush,
      rockScales: Ai.stone,
      goldScales: Ai.gold
    }, Ci, {
      spawnCounts: Ci,
      palmTreeId: 1000,
      palmTreeScales: Ai.palm,
      darkStoneId: 1001,
      darkStoneScales: Ai.darkstone,
      sakuraBushId: 1002,
      sakuraBushScales: Ai.sakuraBush,
      sakuraBushesPerArea: 6,
      sakuraTreeId: 1003,
      sakuraTreeScales: Ai.sakuraTree,
      autumnTreeId: 1004,
      autumnTreeScales: Ai.autumnTree,
      autumnTreesPerArea: 5,
      winterTreeId: 1005,
      winterTreeScales: Ai.winterTree,
      winterTreesPerArea: 6
    }),
    worldMapData: {
      objects: [{
        type: 0,
        x: 680.67,
        y: 2356.18,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 1085.81,
        y: 1465.98,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 2285.56,
        y: 1454.37,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 3326.36,
        y: 1931.78,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 4241.6,
        y: 2193.45,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 4980.89,
        y: 2280.66,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 6319.01,
        y: 2957,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 7502.43,
        y: 2771.39,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 8270.61,
        y: 1997.62,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 8700.86,
        y: 900.89,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 9571.59,
        y: 164.68,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 10878.39,
        y: 518.52,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 11717.19,
        y: 1439.58,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 12157.93,
        y: 2426.15,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 13092.02,
        y: 2498.63,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 13876.44,
        y: 1825.61,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 14016.7,
        y: 812.39,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 13999.08,
        y: 224.99,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 13130.77,
        y: 330.48,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 7465.31,
        y: 348.67,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 6835.18,
        y: 1730.88,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 6899.83,
        y: 2016.38,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 5320.97,
        y: 2539.72,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 2620.02,
        y: 553.82,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 1040.41,
        y: 369.95,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 0,
        x: 1351.79,
        y: 1592.07,
        rotation: 0,
        size: 199,
        id: 1005
      }, {
        type: 3,
        x: 5587.02,
        y: 2591.92,
        rotation: 0,
        size: 151
      }, {
        type: 2,
        x: 12672.18,
        y: 14306.57,
        rotation: 0,
        size: 120,
        id: 1001
      }, {
        type: 2,
        x: 12725.73,
        y: 14085.84,
        rotation: 0,
        size: 120,
        id: 1001
      }, {
        type: 2,
        x: 12825,
        y: 13882.08,
        rotation: 0,
        size: 120,
        id: 1001
      }, {
        type: 2,
        x: 13127.39,
        y: 13610.86,
        rotation: 0,
        size: 120,
        id: 1001
      }, {
        type: 2,
        x: 13299.8,
        y: 13454.12,
        rotation: 0.646,
        size: 120,
        id: 1001
      }, {
        type: 2,
        x: 13477.43,
        y: 13298.69,
        rotation: 1.239,
        size: 120,
        id: 1001
      }, {
        type: 2,
        x: 13679.73,
        y: 13170.94,
        rotation: 1.588,
        size: 120,
        id: 1001
      }, {
        type: 2,
        x: 13890.96,
        y: 13089.73,
        rotation: 1.955,
        size: 120,
        id: 1001
      }, {
        type: 2,
        x: 14115.61,
        y: 13047.94,
        rotation: 2.269,
        size: 120,
        id: 1001
      }]
    },
    biome: {
      snowBiomeTop: 2400,
      snowSpeed: 0.75,
      biomeBands: oi,
      biomeColors: si,
      riverCurve: {
        midlineRatio: 0.6,
        amplitudeRatio: 0.14,
        frequency: 1.58,
        wobble: 0.16,
        splitStartRatio: 0.8,
        splitEndRatio: 0.96,
        splitSeparationRatio: 0.16,
        splitTopDriftRatio: 0.08,
        splitBottomDriftRatio: 0.08,
        splitWidthRatio: 0.55,
        splitBeachSize: 0,
        splitEasePower: 1.15,
        splitBranchRampPower: 0.85,
        splitTaperPower: 1.35
      },
      biomeBeachSize: 220
    },
    meta: {
      maxNameLength: 15
    },
    map: {
      mapScale: 14400,
      mapPingScale: 40,
      mapPingTime: 2200
    },
    experience: {
      initialXP: 300,
      levelMultiplier: 1.2,
      gatheringMultiplier: 4,
      goldBonusResources: 4,
      goldGenerationXP: 0.1
    },
    combat: {
      baseKnockback: 0.2,
      knockbackMultiplier: 0.2,
      maxKnockbackSpeed: 2.25,
      projectileKnockback: 0.2,
      spikeKnockback: 1.2,
      trapKnockbackTicks: 6,
      trapKnockbackMultiplier: 0.2,
      defaultHitSlow: 0.3,
      slowRecoveryRate: 0.0008,
      playerHitScale: 1.8,
      objectDamageMultiplier: 5,
      killScoreMultiplier: 100,
      goldStealPercent: 0.5,
      poisonDamage: 5,
      poisonDuration: 5
    },
    water: {
      normalSpeedMultiplier: 0.33,
      immunitySpeedMultiplier: 0.75,
      normalCurrentEffect: 1,
      immunityCurrentEffect: 0.4
    },
    environment: {
      cactusDamage: 20,
      resourceImages: {
        trees: {
          path: ".././img/world/tree_1.png",
          sizeMultiplier: 1
        },
        bushes: {
          path: ".././img/world/bush_1.png",
          sizeMultiplier: 1
        },
        stones: {
          path: ".././img/world/stone_1.png",
          sizeMultiplier: 1
        },
        gold: {
          path: ".././img/world/gold_1.png",
          sizeMultiplier: 1
        }
      }
    },
    shameSystem: {
      detectionWindow: 120,
      threshold: 8,
      penaltyDuration: 30000,
      countReduction: 2
    },
    animalBehavior: {
      initialWait: 1000,
      updateInterval: 1000,
      chargeDurationMin: 8000,
      chargeDurationMax: 12000,
      wanderDurationMin: 1000,
      wanderDurationMax: 2000,
      movementDurationMin: 4000,
      movementDurationMax: 10000,
      hostileWaitTime: 1500,
      passiveWaitMin: 1500,
      passiveWaitMax: 6000,
      postHitWait: 3000,
      fleeDuration: 2000,
      fleeSpeedMultiplier: 1.42,
      chargeSpeedMultiplier: 1.75,
      hitWindupSlowdown: 0.3,
      waterSlowdown: 0.33,
      leapChance: 0.33,
      playerKnockback: 1.5,
      collisionKnockback: 0.55,
      hitDelay: 600,
      hitDelayAfterDamage: 500,
      animationSpeed: 600,
      attackAngle: 0.8,
      collisionDepthDivisor: 40,
      maxCollisionDepth: 4,
      minCollisionDepth: 1
    },
    physics: {
      velocityStopThreshold: 0.01,
      collisionVelocityRetention: 0.75,
      objectScaleMultiplier: 0.6,
      wiggleDecayRate: 0.998,
      wiggleSpeed: 0.008,
      wiggleMinForce: 0.02,
      wiggleMaxForce: 40,
      buildingSpeedPenalty: 0.5
    },
    turret: {
      gearHatID: 53,
      empHelmetID: 22,
      targetRange: 735,
      projectileSpeed: 1.6,
      fireRate: 2500,
      structureMinCooldown: 250
    },
    leaderboard: {
      leaderboardMaxPlayers: 10,
      allianceNameMaxLength: 7
    },
    specialItems: {
      shameHatID: 1003,
      turretGearID: 53
    },
    spawning: {
      animalSpawnCheckInterval: 1000,
      turretProjectileOffset: 45
    }
  };
  (function (e) {
    var t = e.map.mapScale;
    var n = e.biome && Array.isArray(e.biome.biomeBands) && e.biome.biomeBands.length ? JSON.parse(JSON.stringify(e.biome.biomeBands)) : JSON.parse(JSON.stringify(oi));
    var i = [];
    var r = false;
    for (var a = n.length - 1; a >= 0; --a) {
      var s = n[a];
      if (s) {
        if (s.name === "volcano") {
          if (r) {
            continue;
          }
          r = true;
        }
        i.unshift(s);
      }
    }
    if (!r) {
      i.push({
        name: "volcano",
        startRatio: 0.95,
        endRatio: 1
      });
    }
    n = i;
    e.biome.biomeBands = n;
    var o = {
      mapScale: t,
      riverWidth: e.world.riverWidth,
      riverPadding: e.world.riverPadding,
      biomeBands: n,
      biomeColors: Object.assign({}, si, e.biome.biomeColors),
      riverCurve: e.biome.riverCurve,
      biomeBeachSize: e.biome.biomeBeachSize
    };
    for (var l = ai(o), c = [], u = false, d = 0; d < l.bands.length; ++d) {
      var h = l.bands[d];
      if (h.name === "volcano") {
        if (u) {
          continue;
        }
        u = true;
      }
      c.push(h);
    }
    e.biome.biomeBands = c;
    e.biome.biomeColors = l.colors;
    e.biome.riverCurve = l.river;
    e.biome.biomeBeachSize = l.river.beachSize;
    e.biome.snowRegions = [];
    var p = c.find(function (e) {
      return e.name === "winter";
    });
    if (p) {
      e.biome.snowRegions.push({
        start: p.start,
        end: p.end
      });
      e.biome.snowBiomeTop = p.end;
    } else {
      e.biome.snowBiomeTop = 0;
    }
    e.biome.snowSouthHeight = 0;
    e.biome.snowBiomeBottomStart = null;
    var m = c.find(function (e) {
      return e.name === "desert";
    });
    e.biome.desertStart = m ? m.start : null;
    var f = c.find(function (e) {
      return e.name === "volcano";
    });
    e.biome.volcanoStart = f ? f.start : null;
  })(_i);
  (function (e) {
    if (!e || typeof e != "object") {
      return "normal";
    }
    var t = e.serverIdentity && typeof e.serverIdentity.type == "string" ? e.serverIdentity.type : "normal";
    var n = qn(Yn ? Gn.SERVER_TYPE : null) || qn(t) || "normal";
    if (!e.serverIdentity || typeof e.serverIdentity != "object") {
      e.serverIdentity = {};
    }
    e.serverIdentity.type = n;
    if (!e.sandbox || typeof e.sandbox != "object") {
      e.sandbox = {};
    }
    e.sandbox.isSandbox = Kn(n);
    if (!e.oneVsOne || typeof e.oneVsOne != "object") {
      e.oneVsOne = {};
    }
    e.oneVsOne.enabled = n === "1vs1";
    if (!e.player || typeof e.player != "object") {
      e.player = {};
    }
    e.player.startResources = Jn(Kn(n) ? ni : ti);
    e.player.millTickRewards = Zn(Kn(n) ? ri : ii);
  })(_i);
  di = {
    groups: ui = _i
  };
  Object.keys(ui).forEach(function (e) {
    var t = ui[e];
    Object.keys(t).forEach(function (e) {
      if (di.hasOwnProperty(e)) {
        throw new Error("Duplicate config key detected: " + e);
      }
      di[e] = t[e];
    });
    if (!di.hasOwnProperty(e)) {
      di[e] = t;
    }
  });
  var Ri = di;
  var Bi = {};
  var Li = function () {
    Li = Object.assign || function (e) {
      var t;
      for (var n = 1, i = arguments.length; n < i; n++) {
        for (var r in t = arguments[n]) {
          if (Object.prototype.hasOwnProperty.call(t, r)) {
            e[r] = t[r];
          }
        }
      }
      return e;
    };
    return Li.apply(this, arguments);
  };
  function Oi(e, t, n, i) {
    return new (n ||= Promise)(function (r, a) {
      function s(e) {
        try {
          l(i.next(e));
        } catch (e) {
          a(e);
        }
      }
      function o(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          a(e);
        }
      }
      function l(e) {
        var t;
        if (e.done) {
          r(e.value);
        } else {
          (t = e.value, t instanceof n ? t : new n(function (e) {
            e(t);
          })).then(s, o);
        }
      }
      l((i = i.apply(e, t || [])).next());
    });
  }
  function Di(e, t) {
    var n;
    var i;
    var r;
    var a = {
      label: 0,
      sent: function () {
        if (r[0] & 1) {
          throw r[1];
        }
        return r[1];
      },
      trys: [],
      ops: []
    };
    var s = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
    s.next = o(0);
    s.throw = o(1);
    s.return = o(2);
    if (typeof Symbol == "function") {
      s[Symbol.iterator] = function () {
        return this;
      };
    }
    return s;
    function o(o) {
      return function (l) {
        return function (o) {
          if (n) {
            throw new TypeError("Generator is already executing.");
          }
          while (s && (s = 0, o[0] && (a = 0)), a) {
            try {
              n = 1;
              if (i && (r = o[0] & 2 ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) && !(r = r.call(i, o[1])).done) {
                return r;
              }
              i = 0;
              if (r) {
                o = [o[0] & 2, r.value];
              }
              switch (o[0]) {
                case 0:
                case 1:
                  r = o;
                  break;
                case 4:
                  a.label++;
                  return {
                    value: o[1],
                    done: false
                  };
                case 5:
                  a.label++;
                  i = o[1];
                  o = [0];
                  continue;
                case 7:
                  o = a.ops.pop();
                  a.trys.pop();
                  continue;
                default:
                  if (!(r = (r = a.trys).length > 0 && r[r.length - 1]) && (o[0] === 6 || o[0] === 2)) {
                    a = 0;
                    continue;
                  }
                  if (o[0] === 3 && (!r || o[1] > r[0] && o[1] < r[3])) {
                    a.label = o[1];
                    break;
                  }
                  if (o[0] === 6 && a.label < r[1]) {
                    a.label = r[1];
                    r = o;
                    break;
                  }
                  if (r && a.label < r[2]) {
                    a.label = r[2];
                    a.ops.push(o);
                    break;
                  }
                  if (r[2]) {
                    a.ops.pop();
                  }
                  a.trys.pop();
                  continue;
              }
              o = t.call(e, a);
            } catch (e) {
              o = [6, e];
              i = 0;
            } finally {
              n = r = 0;
            }
          }
          if (o[0] & 5) {
            throw o[1];
          }
          return {
            value: o[0] ? o[1] : undefined,
            done: true
          };
        }([o, l]);
      };
    }
  }
  function Ni(e, t, n) {
    if (n || arguments.length === 2) {
      var i;
      for (var r = 0, a = t.length; r < a; r++) {
        if (!!i || !(r in t)) {
          i ||= Array.prototype.slice.call(t, 0, r);
          i[r] = t[r];
        }
      }
    }
    return e.concat(i || Array.prototype.slice.call(t));
  }
  if (typeof SuppressedError == "function") {
    SuppressedError;
  }
  var Fi;
  var Hi;
  var ji = "3.4.2";
  function zi(e, t) {
    return new Promise(function (n) {
      return setTimeout(n, e, t);
    });
  }
  function Vi(e) {
    return !!e && typeof e.then == "function";
  }
  function Wi(e, t) {
    try {
      var n = e();
      if (Vi(n)) {
        n.then(function (e) {
          return t(true, e);
        }, function (e) {
          return t(false, e);
        });
      } else {
        t(true, n);
      }
    } catch (e) {
      t(false, e);
    }
  }
  function Ui(e, t, n = 16) {
    return Oi(this, undefined, undefined, function () {
      var i;
      var r;
      var a;
      var s;
      return Di(this, function (o) {
        switch (o.label) {
          case 0:
            i = Array(e.length);
            r = Date.now();
            a = 0;
            o.label = 1;
          case 1:
            if (a < e.length) {
              i[a] = t(e[a], a);
              if ((s = Date.now()) >= r + n) {
                r = s;
                return [4, zi(0)];
              } else {
                return [3, 3];
              }
            } else {
              return [3, 4];
            }
          case 2:
            o.sent();
            o.label = 3;
          case 3:
            ++a;
            return [3, 1];
          case 4:
            return [2, i];
        }
      });
    });
  }
  function Gi(e) {
    e.then(undefined, function () {});
  }
  function Yi(e, t) {
    e = [e[0] >>> 16, e[0] & 65535, e[1] >>> 16, e[1] & 65535];
    t = [t[0] >>> 16, t[0] & 65535, t[1] >>> 16, t[1] & 65535];
    var n = [0, 0, 0, 0];
    n[3] += e[3] + t[3];
    n[2] += n[3] >>> 16;
    n[3] &= 65535;
    n[2] += e[2] + t[2];
    n[1] += n[2] >>> 16;
    n[2] &= 65535;
    n[1] += e[1] + t[1];
    n[0] += n[1] >>> 16;
    n[1] &= 65535;
    n[0] += e[0] + t[0];
    n[0] &= 65535;
    return [n[0] << 16 | n[1], n[2] << 16 | n[3]];
  }
  function Xi(e, t) {
    e = [e[0] >>> 16, e[0] & 65535, e[1] >>> 16, e[1] & 65535];
    t = [t[0] >>> 16, t[0] & 65535, t[1] >>> 16, t[1] & 65535];
    var n = [0, 0, 0, 0];
    n[3] += e[3] * t[3];
    n[2] += n[3] >>> 16;
    n[3] &= 65535;
    n[2] += e[2] * t[3];
    n[1] += n[2] >>> 16;
    n[2] &= 65535;
    n[2] += e[3] * t[2];
    n[1] += n[2] >>> 16;
    n[2] &= 65535;
    n[1] += e[1] * t[3];
    n[0] += n[1] >>> 16;
    n[1] &= 65535;
    n[1] += e[2] * t[2];
    n[0] += n[1] >>> 16;
    n[1] &= 65535;
    n[1] += e[3] * t[1];
    n[0] += n[1] >>> 16;
    n[1] &= 65535;
    n[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0];
    n[0] &= 65535;
    return [n[0] << 16 | n[1], n[2] << 16 | n[3]];
  }
  function qi(e, t) {
    if ((t %= 64) == 32) {
      return [e[1], e[0]];
    } else if (t < 32) {
      return [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t];
    } else {
      t -= 32;
      return [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t];
    }
  }
  function Ki(e, t) {
    if ((t %= 64) == 0) {
      return e;
    } else if (t < 32) {
      return [e[0] << t | e[1] >>> 32 - t, e[1] << t];
    } else {
      return [e[1] << t - 32, 0];
    }
  }
  function Ji(e, t) {
    return [e[0] ^ t[0], e[1] ^ t[1]];
  }
  function Zi(e) {
    e = Ji(e, [0, e[0] >>> 1]);
    e = Ji(e = Xi(e, [4283543511, 3981806797]), [0, e[0] >>> 1]);
    return Ji(e = Xi(e, [3301882366, 444984403]), [0, e[0] >>> 1]);
  }
  function Qi(e, t) {
    var n;
    t = t || 0;
    var i = (e = e || "").length % 16;
    var r = e.length - i;
    var a = [0, t];
    var s = [0, t];
    var o = [0, 0];
    var l = [0, 0];
    var c = [2277735313, 289559509];
    var u = [1291169091, 658871167];
    for (n = 0; n < r; n += 16) {
      o = [e.charCodeAt(n + 4) & 255 | (e.charCodeAt(n + 5) & 255) << 8 | (e.charCodeAt(n + 6) & 255) << 16 | (e.charCodeAt(n + 7) & 255) << 24, e.charCodeAt(n) & 255 | (e.charCodeAt(n + 1) & 255) << 8 | (e.charCodeAt(n + 2) & 255) << 16 | (e.charCodeAt(n + 3) & 255) << 24];
      l = [e.charCodeAt(n + 12) & 255 | (e.charCodeAt(n + 13) & 255) << 8 | (e.charCodeAt(n + 14) & 255) << 16 | (e.charCodeAt(n + 15) & 255) << 24, e.charCodeAt(n + 8) & 255 | (e.charCodeAt(n + 9) & 255) << 8 | (e.charCodeAt(n + 10) & 255) << 16 | (e.charCodeAt(n + 11) & 255) << 24];
      o = qi(o = Xi(o, c), 31);
      a = Yi(a = qi(a = Ji(a, o = Xi(o, u)), 27), s);
      a = Yi(Xi(a, [0, 5]), [0, 1390208809]);
      l = qi(l = Xi(l, u), 33);
      s = Yi(s = qi(s = Ji(s, l = Xi(l, c)), 31), a);
      s = Yi(Xi(s, [0, 5]), [0, 944331445]);
    }
    o = [0, 0];
    l = [0, 0];
    switch (i) {
      case 15:
        l = Ji(l, Ki([0, e.charCodeAt(n + 14)], 48));
      case 14:
        l = Ji(l, Ki([0, e.charCodeAt(n + 13)], 40));
      case 13:
        l = Ji(l, Ki([0, e.charCodeAt(n + 12)], 32));
      case 12:
        l = Ji(l, Ki([0, e.charCodeAt(n + 11)], 24));
      case 11:
        l = Ji(l, Ki([0, e.charCodeAt(n + 10)], 16));
      case 10:
        l = Ji(l, Ki([0, e.charCodeAt(n + 9)], 8));
      case 9:
        l = Xi(l = Ji(l, [0, e.charCodeAt(n + 8)]), u);
        s = Ji(s, l = Xi(l = qi(l, 33), c));
      case 8:
        o = Ji(o, Ki([0, e.charCodeAt(n + 7)], 56));
      case 7:
        o = Ji(o, Ki([0, e.charCodeAt(n + 6)], 48));
      case 6:
        o = Ji(o, Ki([0, e.charCodeAt(n + 5)], 40));
      case 5:
        o = Ji(o, Ki([0, e.charCodeAt(n + 4)], 32));
      case 4:
        o = Ji(o, Ki([0, e.charCodeAt(n + 3)], 24));
      case 3:
        o = Ji(o, Ki([0, e.charCodeAt(n + 2)], 16));
      case 2:
        o = Ji(o, Ki([0, e.charCodeAt(n + 1)], 8));
      case 1:
        o = Xi(o = Ji(o, [0, e.charCodeAt(n)]), c);
        a = Ji(a, o = Xi(o = qi(o, 31), u));
    }
    a = Yi(a = Ji(a, [0, e.length]), s = Ji(s, [0, e.length]));
    s = Yi(s, a);
    a = Yi(a = Zi(a), s = Zi(s));
    s = Yi(s, a);
    return ("00000000" + (a[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (a[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (s[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (s[1] >>> 0).toString(16)).slice(-8);
  }
  function $i(e) {
    return parseInt(e);
  }
  function er(e) {
    return parseFloat(e);
  }
  function tr(e, t) {
    if (typeof e == "number" && isNaN(e)) {
      return t;
    } else {
      return e;
    }
  }
  function nr(e) {
    return e.reduce(function (e, t) {
      return e + (t ? 1 : 0);
    }, 0);
  }
  function ir(e, t = 1) {
    if (Math.abs(t) >= 1) {
      return Math.round(e / t) * t;
    }
    var n = 1 / t;
    return Math.round(e * n) / n;
  }
  function rr(e) {
    if (e && typeof e == "object" && "message" in e) {
      return e;
    } else {
      return {
        message: e
      };
    }
  }
  function ar(e) {
    return typeof e != "function";
  }
  function sr(e, t, n) {
    var i = Object.keys(e).filter(function (e) {
      return !function (e, t) {
        for (var n = 0, i = e.length; n < i; ++n) {
          if (e[n] === t) {
            return true;
          }
        }
        return false;
      }(n, e);
    });
    var r = Ui(i, function (n) {
      i = e[n];
      r = t;
      a = new Promise(function (e) {
        var t = Date.now();
        Wi(i.bind(null, r), function () {
          var n = [];
          for (var i = 0; i < arguments.length; i++) {
            n[i] = arguments[i];
          }
          var r = Date.now() - t;
          if (!n[0]) {
            return e(function () {
              return {
                error: rr(n[1]),
                duration: r
              };
            });
          }
          var a = n[1];
          if (ar(a)) {
            return e(function () {
              return {
                value: a,
                duration: r
              };
            });
          }
          e(function () {
            return new Promise(function (e) {
              var t = Date.now();
              Wi(a, function () {
                var n = [];
                for (var i = 0; i < arguments.length; i++) {
                  n[i] = arguments[i];
                }
                var a = r + Date.now() - t;
                if (!n[0]) {
                  return e({
                    error: rr(n[1]),
                    duration: a
                  });
                }
                e({
                  value: n[1],
                  duration: a
                });
              });
            });
          });
        });
      });
      Gi(a);
      return function () {
        return a.then(function (e) {
          return e();
        });
      };
      var i;
      var r;
      var a;
    });
    Gi(r);
    return function () {
      return Oi(this, undefined, undefined, function () {
        var e;
        var t;
        var n;
        var a;
        return Di(this, function (s) {
          switch (s.label) {
            case 0:
              return [4, r];
            case 1:
              return [4, Ui(s.sent(), function (e) {
                var t = e();
                Gi(t);
                return t;
              })];
            case 2:
              e = s.sent();
              return [4, Promise.all(e)];
            case 3:
              t = s.sent();
              n = {};
              a = 0;
              for (; a < i.length; ++a) {
                n[i[a]] = t[a];
              }
              return [2, n];
          }
        });
      });
    };
  }
  function or() {
    var e = window;
    var t = navigator;
    return nr(["MSCSSMatrix" in e, "msSetImmediate" in e, "msIndexedDB" in e, "msMaxTouchPoints" in t, "msPointerEnabled" in t]) >= 4;
  }
  function lr() {
    var e = window;
    var t = navigator;
    return nr(["msWriteProfilerMark" in e, "MSStream" in e, "msLaunchUri" in t, "msSaveBlob" in t]) >= 3 && !or();
  }
  function cr() {
    var e = window;
    var t = navigator;
    return nr(["webkitPersistentStorage" in t, "webkitTemporaryStorage" in t, t.vendor.indexOf("Google") === 0, "webkitResolveLocalFileSystemURL" in e, "BatteryManager" in e, "webkitMediaStream" in e, "webkitSpeechGrammar" in e]) >= 5;
  }
  function ur() {
    var e = window;
    var t = navigator;
    return nr(["ApplePayError" in e, "CSSPrimitiveValue" in e, "Counter" in e, t.vendor.indexOf("Apple") === 0, "getStorageUpdates" in t, "WebKitMediaKeys" in e]) >= 4;
  }
  function dr() {
    var e = window;
    return nr(["safari" in e, !("DeviceMotionEvent" in e), !("ongestureend" in e), !("standalone" in navigator)]) >= 3;
  }
  function hr() {
    var e = window;
    return nr(["buildID" in navigator, "MozAppearance" in (document.documentElement?.style ?? {}), "onmozfullscreenchange" in e, "mozInnerScreenX" in e, "CSSMozDocumentRule" in e, "CanvasCaptureMediaStream" in e]) >= 4;
  }
  function pr() {
    var e = document;
    return e.fullscreenElement || e.msFullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement || null;
  }
  function mr() {
    var e = cr();
    var t = hr();
    if (!e && !t) {
      return false;
    }
    var n = window;
    return nr(["onorientationchange" in n, "orientation" in n, e && !("SharedWorker" in n), t && /android/i.test(navigator.appVersion)]) >= 2;
  }
  function fr(e) {
    var t = new Error(e);
    t.name = e;
    return t;
  }
  function gr(e, t, n) {
    var i;
    if (n === undefined) {
      n = 50;
    }
    return Oi(this, undefined, undefined, function () {
      var r;
      var a;
      return Di(this, function (s) {
        switch (s.label) {
          case 0:
            r = document;
            s.label = 1;
          case 1:
            if (r.body) {
              return [3, 3];
            } else {
              return [4, zi(n)];
            }
          case 2:
            s.sent();
            return [3, 1];
          case 3:
            a = r.createElement("iframe");
            s.label = 4;
          case 4:
            s.trys.push([4,, 10, 11]);
            return [4, new Promise(function (e, n) {
              var i = false;
              var s = function () {
                i = true;
                e();
              };
              a.onload = s;
              a.onerror = function (e) {
                i = true;
                n(e);
              };
              var o = a.style;
              o.setProperty("display", "block", "important");
              o.position = "absolute";
              o.top = "0";
              o.left = "0";
              o.visibility = "hidden";
              if (t && "srcdoc" in a) {
                a.srcdoc = t;
              } else {
                a.src = "about:blank";
              }
              r.body.appendChild(a);
              var l = function () {
                if (!i) {
                  if (a.contentWindow?.document?.readyState === "complete") {
                    s();
                  } else {
                    setTimeout(l, 10);
                  }
                }
              };
              l();
            })];
          case 5:
            s.sent();
            s.label = 6;
          case 6:
            if (a.contentWindow?.document?.body) {
              return [3, 8];
            } else {
              return [4, zi(n)];
            }
          case 7:
            s.sent();
            return [3, 6];
          case 8:
            return [4, e(a, a.contentWindow)];
          case 9:
            return [2, s.sent()];
          case 10:
            if ((i = a.parentNode) !== null && i !== undefined) {
              i.removeChild(a);
            }
            return [7];
          case 11:
            return [2];
        }
      });
    });
  }
  function yr(e) {
    var t = function (e) {
      var t = `Unexpected syntax '${e}'`;
      var n = /^\s*([a-z-]*)(.*)$/i.exec(e);
      var i = n[1] || undefined;
      var r = {};
      var a = /([.:#][\w-]+|\[.+?\])/gi;
      var s = function (e, t) {
        r[e] = r[e] || [];
        r[e].push(t);
      };
      while (true) {
        var o = a.exec(n[2]);
        if (!o) {
          break;
        }
        var l = o[0];
        switch (l[0]) {
          case ".":
            s("class", l.slice(1));
            break;
          case "#":
            s("id", l.slice(1));
            break;
          case "[":
            var c = /^\[([\w-]+)([~|^$*]?=("(.*?)"|([\w-]+)))?(\s+[is])?\]$/.exec(l);
            if (!c) {
              throw new Error(t);
            }
            s(c[1], c[4] ?? c[5] ?? "");
            break;
          default:
            throw new Error(t);
        }
      }
      return [i, r];
    }(e);
    var n = t[0];
    var i = t[1];
    var r = document.createElement(n ?? "div");
    for (var a = 0, s = Object.keys(i); a < s.length; a++) {
      var o = s[a];
      var l = i[o].join(" ");
      if (o === "style") {
        vr(r.style, l);
      } else {
        r.setAttribute(o, l);
      }
    }
    return r;
  }
  function vr(e, t) {
    for (var n = 0, i = t.split(";"); n < i.length; n++) {
      var r = i[n];
      var a = /^\s*([\w-]+)\s*:\s*(.+?)(\s*!([\w-]+))?\s*$/.exec(r);
      if (a) {
        var s = a[1];
        var o = a[2];
        var l = a[4];
        e.setProperty(s, o, l || "");
      }
    }
  }
  var br = ["monospace", "sans-serif", "serif"];
  var wr = ["sans-serif-thin", "ARNO PRO", "Agency FB", "Arabic Typesetting", "Arial Unicode MS", "AvantGarde Bk BT", "BankGothic Md BT", "Batang", "Bitstream Vera Sans Mono", "Calibri", "Century", "Century Gothic", "Clarendon", "EUROSTILE", "Franklin Gothic", "Futura Bk BT", "Futura Md BT", "GOTHAM", "Gill Sans", "HELV", "Haettenschweiler", "Helvetica Neue", "Humanst521 BT", "Leelawadee", "Letter Gothic", "Levenim MT", "Lucida Bright", "Lucida Sans", "Menlo", "MS Mincho", "MS Outlook", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MYRIAD PRO", "Marlett", "Meiryo UI", "Microsoft Uighur", "Minion Pro", "Monotype Corsiva", "PMingLiU", "Pristina", "SCRIPTINA", "Segoe UI Light", "Serifa", "SimHei", "Small Fonts", "Staccato222 BT", "TRAJAN PRO", "Univers CE 55 Medium", "Vrinda", "ZWAdobeF"];
  function kr(e) {
    return e.toDataURL();
  }
  function Sr() {
    var e = this;
    (function () {
      if (Hi === undefined) {
        var e = function () {
          var t = xr();
          if (Ir(t)) {
            Hi = setTimeout(e, 2500);
          } else {
            Fi = t;
            Hi = undefined;
          }
        };
        e();
      }
    })();
    return function () {
      return Oi(e, undefined, undefined, function () {
        var e;
        return Di(this, function (t) {
          switch (t.label) {
            case 0:
              if (Ir(e = xr())) {
                if (Fi) {
                  return [2, Ni([], Fi, true)];
                } else if (pr()) {
                  return [4, (n = document, (n.exitFullscreen || n.msExitFullscreen || n.mozCancelFullScreen || n.webkitExitFullscreen).call(n))];
                } else {
                  return [3, 2];
                }
              } else {
                return [3, 2];
              }
            case 1:
              t.sent();
              e = xr();
              t.label = 2;
            case 2:
              if (!Ir(e)) {
                Fi = e;
              }
              return [2, e];
          }
          var n;
        });
      });
    };
  }
  function xr() {
    var e = screen;
    return [tr(er(e.availTop), null), tr(er(e.width) - er(e.availWidth) - tr(er(e.availLeft), 0), null), tr(er(e.height) - er(e.availHeight) - tr(er(e.availTop), 0), null), tr(er(e.availLeft), null)];
  }
  function Ir(e) {
    for (var t = 0; t < 4; ++t) {
      if (e[t]) {
        return false;
      }
    }
    return true;
  }
  function Mr(e) {
    var t;
    return Oi(this, undefined, undefined, function () {
      var n;
      var i;
      var r;
      var a;
      var s;
      var o;
      var l;
      return Di(this, function (c) {
        switch (c.label) {
          case 0:
            n = document;
            i = n.createElement("div");
            r = new Array(e.length);
            a = {};
            Er(i);
            l = 0;
            for (; l < e.length; ++l) {
              if ((s = yr(e[l])).tagName === "DIALOG") {
                s.show();
              }
              Er(o = n.createElement("div"));
              o.appendChild(s);
              i.appendChild(o);
              r[l] = s;
            }
            c.label = 1;
          case 1:
            if (n.body) {
              return [3, 3];
            } else {
              return [4, zi(50)];
            }
          case 2:
            c.sent();
            return [3, 1];
          case 3:
            n.body.appendChild(i);
            try {
              for (l = 0; l < e.length; ++l) {
                if (!r[l].offsetParent) {
                  a[e[l]] = true;
                }
              }
            } finally {
              if ((t = i.parentNode) !== null && t !== undefined) {
                t.removeChild(i);
              }
            }
            return [2, a];
        }
      });
    });
  }
  function Er(e) {
    e.style.setProperty("display", "block", "important");
  }
  function Pr(e) {
    return matchMedia(`(inverted-colors: ${e})`).matches;
  }
  function Tr(e) {
    return matchMedia(`(forced-colors: ${e})`).matches;
  }
  function Ar(e) {
    return matchMedia(`(prefers-contrast: ${e})`).matches;
  }
  function Cr(e) {
    return matchMedia(`(prefers-reduced-motion: ${e})`).matches;
  }
  function _r(e) {
    return matchMedia(`(dynamic-range: ${e})`).matches;
  }
  var Rr = Math;
  var Br = function () {
    return 0;
  };
  var Lr = {
    default: [],
    apple: [{
      font: "-apple-system-body"
    }],
    serif: [{
      fontFamily: "serif"
    }],
    sans: [{
      fontFamily: "sans-serif"
    }],
    mono: [{
      fontFamily: "monospace"
    }],
    min: [{
      fontSize: "1px"
    }],
    system: [{
      fontFamily: "system-ui"
    }]
  };
  var Or = {
    fonts: function () {
      return gr(function (e, t) {
        var n = t.document;
        var i = n.body;
        i.style.fontSize = "48px";
        var r = n.createElement("div");
        var a = {};
        var s = {};
        var o = function (e) {
          var t = n.createElement("span");
          var i = t.style;
          i.position = "absolute";
          i.top = "0";
          i.left = "0";
          i.fontFamily = e;
          t.textContent = "mmMwWLliI0O&1";
          r.appendChild(t);
          return t;
        };
        var l = br.map(o);
        var c = function () {
          var e = {};
          var t = function (t) {
            e[t] = br.map(function (e) {
              return o(`'${t}',${e}`);
            });
          };
          for (var n = 0, i = wr; n < i.length; n++) {
            t(i[n]);
          }
          return e;
        }();
        i.appendChild(r);
        for (var u = 0; u < br.length; u++) {
          a[br[u]] = l[u].offsetWidth;
          s[br[u]] = l[u].offsetHeight;
        }
        return wr.filter(function (e) {
          t = c[e];
          return br.some(function (e, n) {
            return t[n].offsetWidth !== a[e] || t[n].offsetHeight !== s[e];
          });
          var t;
        });
      });
    },
    domBlockers: function (e) {
      var t = (e === undefined ? {} : e).debug;
      return Oi(this, undefined, undefined, function () {
        var e;
        var n;
        var i;
        var r;
        var a;
        return Di(this, function (s) {
          switch (s.label) {
            case 0:
              if (ur() || mr()) {
                o = atob;
                e = {
                  abpIndo: ["#Iklan-Melayang", "#Kolom-Iklan-728", "#SidebarIklan-wrapper", "[title=\"ALIENBOLA\" i]", o("I0JveC1CYW5uZXItYWRz")],
                  abpvn: [".quangcao", "#mobileCatfish", o("LmNsb3NlLWFkcw=="), "[id^=\"bn_bottom_fixed_\"]", "#pmadv"],
                  adBlockFinland: [".mainostila", o("LnNwb25zb3JpdA=="), ".ylamainos", o("YVtocmVmKj0iL2NsaWNrdGhyZ2guYXNwPyJd"), o("YVtocmVmXj0iaHR0cHM6Ly9hcHAucmVhZHBlYWsuY29tL2FkcyJd")],
                  adBlockPersian: ["#navbar_notice_50", ".kadr", "TABLE[width=\"140px\"]", "#divAgahi", o("YVtocmVmXj0iaHR0cDovL2cxLnYuZndtcm0ubmV0L2FkLyJd")],
                  adBlockWarningRemoval: ["#adblock-honeypot", ".adblocker-root", ".wp_adblock_detect", o("LmhlYWRlci1ibG9ja2VkLWFk"), o("I2FkX2Jsb2NrZXI=")],
                  adGuardAnnoyances: [".hs-sosyal", "#cookieconsentdiv", "div[class^=\"app_gdpr\"]", ".as-oil", "[data-cypress=\"soft-push-notification-modal\"]"],
                  adGuardBase: [".BetterJsPopOverlay", o("I2FkXzMwMFgyNTA="), o("I2Jhbm5lcmZsb2F0MjI="), o("I2NhbXBhaWduLWJhbm5lcg=="), o("I0FkLUNvbnRlbnQ=")],
                  adGuardChinese: [o("LlppX2FkX2FfSA=="), o("YVtocmVmKj0iLmh0aGJldDM0LmNvbSJd"), "#widget-quan", o("YVtocmVmKj0iLzg0OTkyMDIwLnh5eiJd"), o("YVtocmVmKj0iLjE5NTZobC5jb20vIl0=")],
                  adGuardFrench: ["#pavePub", o("LmFkLWRlc2t0b3AtcmVjdGFuZ2xl"), ".mobile_adhesion", ".widgetadv", o("LmFkc19iYW4=")],
                  adGuardGerman: ["aside[data-portal-id=\"leaderboard\"]"],
                  adGuardJapanese: ["#kauli_yad_1", o("YVtocmVmXj0iaHR0cDovL2FkMi50cmFmZmljZ2F0ZS5uZXQvIl0="), o("Ll9wb3BJbl9pbmZpbml0ZV9hZA=="), o("LmFkZ29vZ2xl"), o("Ll9faXNib29zdFJldHVybkFk")],
                  adGuardMobile: [o("YW1wLWF1dG8tYWRz"), o("LmFtcF9hZA=="), "amp-embed[type=\"24smi\"]", "#mgid_iframe1", o("I2FkX2ludmlld19hcmVh")],
                  adGuardRussian: [o("YVtocmVmXj0iaHR0cHM6Ly9hZC5sZXRtZWFkcy5jb20vIl0="), o("LnJlY2xhbWE="), "div[id^=\"smi2adblock\"]", o("ZGl2W2lkXj0iQWRGb3hfYmFubmVyXyJd"), "#psyduckpockeball"],
                  adGuardSocial: [o("YVtocmVmXj0iLy93d3cuc3R1bWJsZXVwb24uY29tL3N1Ym1pdD91cmw9Il0="), o("YVtocmVmXj0iLy90ZWxlZ3JhbS5tZS9zaGFyZS91cmw/Il0="), ".etsy-tweet", "#inlineShare", ".popup-social"],
                  adGuardSpanishPortuguese: ["#barraPublicidade", "#Publicidade", "#publiEspecial", "#queTooltip", ".cnt-publi"],
                  adGuardTrackingProtection: ["#qoo-counter", o("YVtocmVmXj0iaHR0cDovL2NsaWNrLmhvdGxvZy5ydS8iXQ=="), o("YVtocmVmXj0iaHR0cDovL2hpdGNvdW50ZXIucnUvdG9wL3N0YXQucGhwIl0="), o("YVtocmVmXj0iaHR0cDovL3RvcC5tYWlsLnJ1L2p1bXAiXQ=="), "#top100counter"],
                  adGuardTurkish: ["#backkapat", o("I3Jla2xhbWk="), o("YVtocmVmXj0iaHR0cDovL2Fkc2Vydi5vbnRlay5jb20udHIvIl0="), o("YVtocmVmXj0iaHR0cDovL2l6bGVuemkuY29tL2NhbXBhaWduLyJd"), o("YVtocmVmXj0iaHR0cDovL3d3dy5pbnN0YWxsYWRzLm5ldC8iXQ==")],
                  bulgarian: [o("dGQjZnJlZW5ldF90YWJsZV9hZHM="), "#ea_intext_div", ".lapni-pop-over", "#xenium_hot_offers"],
                  easyList: [".yb-floorad", o("LndpZGdldF9wb19hZHNfd2lkZ2V0"), o("LnRyYWZmaWNqdW5reS1hZA=="), ".textad_headline", o("LnNwb25zb3JlZC10ZXh0LWxpbmtz")],
                  easyListChina: [o("LmFwcGd1aWRlLXdyYXBbb25jbGljayo9ImJjZWJvcy5jb20iXQ=="), o("LmZyb250cGFnZUFkdk0="), "#taotaole", "#aafoot.top_box", ".cfa_popup"],
                  easyListCookie: [".ezmob-footer", ".cc-CookieWarning", "[data-cookie-number]", o("LmF3LWNvb2tpZS1iYW5uZXI="), ".sygnal24-gdpr-modal-wrap"],
                  easyListCzechSlovak: ["#onlajny-stickers", o("I3Jla2xhbW5pLWJveA=="), o("LnJla2xhbWEtbWVnYWJvYXJk"), ".sklik", o("W2lkXj0ic2tsaWtSZWtsYW1hIl0=")],
                  easyListDutch: [o("I2FkdmVydGVudGll"), o("I3ZpcEFkbWFya3RCYW5uZXJCbG9jaw=="), ".adstekst", o("YVtocmVmXj0iaHR0cHM6Ly94bHR1YmUubmwvY2xpY2svIl0="), "#semilo-lrectangle"],
                  easyListGermany: ["#SSpotIMPopSlider", o("LnNwb25zb3JsaW5rZ3J1ZW4="), o("I3dlcmJ1bmdza3k="), o("I3Jla2xhbWUtcmVjaHRzLW1pdHRl"), o("YVtocmVmXj0iaHR0cHM6Ly9iZDc0Mi5jb20vIl0=")],
                  easyListItaly: [o("LmJveF9hZHZfYW5udW5jaQ=="), ".sb-box-pubbliredazionale", o("YVtocmVmXj0iaHR0cDovL2FmZmlsaWF6aW9uaWFkcy5zbmFpLml0LyJd"), o("YVtocmVmXj0iaHR0cHM6Ly9hZHNlcnZlci5odG1sLml0LyJd"), o("YVtocmVmXj0iaHR0cHM6Ly9hZmZpbGlhemlvbmlhZHMuc25haS5pdC8iXQ==")],
                  easyListLithuania: [o("LnJla2xhbW9zX3RhcnBhcw=="), o("LnJla2xhbW9zX251b3JvZG9z"), o("aW1nW2FsdD0iUmVrbGFtaW5pcyBza3lkZWxpcyJd"), o("aW1nW2FsdD0iRGVkaWt1b3RpLmx0IHNlcnZlcmlhaSJd"), o("aW1nW2FsdD0iSG9zdGluZ2FzIFNlcnZlcmlhaS5sdCJd")],
                  estonian: [o("QVtocmVmKj0iaHR0cDovL3BheTRyZXN1bHRzMjQuZXUiXQ==")],
                  fanboyAnnoyances: ["#ac-lre-player", ".navigate-to-top", "#subscribe_popup", ".newsletter_holder", "#back-top"],
                  fanboyAntiFacebook: [".util-bar-module-firefly-visible"],
                  fanboyEnhancedTrackers: [".open.pushModal", "#issuem-leaky-paywall-articles-zero-remaining-nag", "#sovrn_container", "div[class$=\"-hide\"][zoompage-fontsize][style=\"display: block;\"]", ".BlockNag__Card"],
                  fanboySocial: ["#FollowUs", "#meteored_share", "#social_follow", ".article-sharer", ".community__social-desc"],
                  frellwitSwedish: [o("YVtocmVmKj0iY2FzaW5vcHJvLnNlIl1bdGFyZ2V0PSJfYmxhbmsiXQ=="), o("YVtocmVmKj0iZG9rdG9yLXNlLm9uZWxpbmsubWUiXQ=="), "article.category-samarbete", o("ZGl2LmhvbGlkQWRz"), "ul.adsmodern"],
                  greekAdBlock: [o("QVtocmVmKj0iYWRtYW4ub3RlbmV0LmdyL2NsaWNrPyJd"), o("QVtocmVmKj0iaHR0cDovL2F4aWFiYW5uZXJzLmV4b2R1cy5nci8iXQ=="), o("QVtocmVmKj0iaHR0cDovL2ludGVyYWN0aXZlLmZvcnRobmV0LmdyL2NsaWNrPyJd"), "DIV.agores300", "TABLE.advright"],
                  hungarian: ["#cemp_doboz", ".optimonk-iframe-container", o("LmFkX19tYWlu"), o("W2NsYXNzKj0iR29vZ2xlQWRzIl0="), "#hirdetesek_box"],
                  iDontCareAboutCookies: [".alert-info[data-block-track*=\"CookieNotice\"]", ".ModuleTemplateCookieIndicator", ".o--cookies--container", "#cookies-policy-sticky", "#stickyCookieBar"],
                  icelandicAbp: [o("QVtocmVmXj0iL2ZyYW1ld29yay9yZXNvdXJjZXMvZm9ybXMvYWRzLmFzcHgiXQ==")],
                  latvian: [o("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMjBweDsgaGVpZ2h0OiA0MHB4OyBvdmVyZmxvdzogaGlkZGVuOyBwb3NpdGlvbjogcmVsYXRpdmU7Il0="), o("YVtocmVmPSJodHRwOi8vd3d3LnNhbGlkemluaS5sdi8iXVtzdHlsZT0iZGlzcGxheTogYmxvY2s7IHdpZHRoOiA4OHB4OyBoZWlnaHQ6IDMxcHg7IG92ZXJmbG93OiBoaWRkZW47IHBvc2l0aW9uOiByZWxhdGl2ZTsiXQ==")],
                  listKr: [o("YVtocmVmKj0iLy9hZC5wbGFuYnBsdXMuY28ua3IvIl0="), o("I2xpdmVyZUFkV3JhcHBlcg=="), o("YVtocmVmKj0iLy9hZHYuaW1hZHJlcC5jby5rci8iXQ=="), o("aW5zLmZhc3R2aWV3LWFk"), ".revenue_unit_item.dable"],
                  listeAr: [o("LmdlbWluaUxCMUFk"), ".right-and-left-sponsers", o("YVtocmVmKj0iLmFmbGFtLmluZm8iXQ=="), o("YVtocmVmKj0iYm9vcmFxLm9yZyJd"), o("YVtocmVmKj0iZHViaXp6bGUuY29tL2FyLz91dG1fc291cmNlPSJd")],
                  listeFr: [o("YVtocmVmXj0iaHR0cDovL3Byb21vLnZhZG9yLmNvbS8iXQ=="), o("I2FkY29udGFpbmVyX3JlY2hlcmNoZQ=="), o("YVtocmVmKj0id2Vib3JhbWEuZnIvZmNnaS1iaW4vIl0="), ".site-pub-interstitiel", "div[id^=\"crt-\"][data-criteo-id]"],
                  officialPolish: ["#ceneo-placeholder-ceneo-12", o("W2hyZWZePSJodHRwczovL2FmZi5zZW5kaHViLnBsLyJd"), o("YVtocmVmXj0iaHR0cDovL2Fkdm1hbmFnZXIudGVjaGZ1bi5wbC9yZWRpcmVjdC8iXQ=="), o("YVtocmVmXj0iaHR0cDovL3d3dy50cml6ZXIucGwvP3V0bV9zb3VyY2UiXQ=="), o("ZGl2I3NrYXBpZWNfYWQ=")],
                  ro: [o("YVtocmVmXj0iLy9hZmZ0cmsuYWx0ZXgucm8vQ291bnRlci9DbGljayJd"), o("YVtocmVmXj0iaHR0cHM6Ly9ibGFja2ZyaWRheXNhbGVzLnJvL3Ryay9zaG9wLyJd"), o("YVtocmVmXj0iaHR0cHM6Ly9ldmVudC4ycGVyZm9ybWFudC5jb20vZXZlbnRzL2NsaWNrIl0="), o("YVtocmVmXj0iaHR0cHM6Ly9sLnByb2ZpdHNoYXJlLnJvLyJd"), "a[href^=\"/url/\"]"],
                  ruAd: [o("YVtocmVmKj0iLy9mZWJyYXJlLnJ1LyJd"), o("YVtocmVmKj0iLy91dGltZy5ydS8iXQ=="), o("YVtocmVmKj0iOi8vY2hpa2lkaWtpLnJ1Il0="), "#pgeldiz", ".yandex-rtb-block"],
                  thaiAds: ["a[href*=macau-uta-popup]", o("I2Fkcy1nb29nbGUtbWlkZGxlX3JlY3RhbmdsZS1ncm91cA=="), o("LmFkczMwMHM="), ".bumq", ".img-kosana"],
                  webAnnoyancesUltralist: ["#mod-social-share-2", "#social-tools", o("LmN0cGwtZnVsbGJhbm5lcg=="), ".zergnet-recommend", ".yt.btn-link.btn-md.btn"]
                };
                n = Object.keys(e);
                return [4, Mr((a = []).concat.apply(a, n.map(function (t) {
                  return e[t];
                })))];
              } else {
                return [2, undefined];
              }
            case 1:
              i = s.sent();
              if (t) {
                (function (e, t) {
                  for (var n = 0, i = Object.keys(e); n < i.length; n++) {
                    var r = i[n];
                    for (var a = 0, s = e[r]; a < s.length; a++) {
                      var o = s[a];
                      t[o];
                    }
                  }
                })(e, i);
              }
              (r = n.filter(function (t) {
                var n = e[t];
                return nr(n.map(function (e) {
                  return i[e];
                })) > n.length * 0.6;
              })).sort();
              return [2, r];
          }
          var o;
        });
      });
    },
    fontPreferences: function () {
      if (e === undefined) {
        e = 4000;
      }
      return gr(function (t, n) {
        var i = n.document;
        var r = i.body;
        var a = r.style;
        a.width = `${e}px`;
        a.webkitTextSizeAdjust = a.textSizeAdjust = "none";
        if (cr()) {
          r.style.zoom = "" + 1 / n.devicePixelRatio;
        } else if (ur()) {
          r.style.zoom = "reset";
        }
        var s = i.createElement("div");
        s.textContent = Ni([], Array(e / 20 | 0), true).map(function () {
          return "word";
        }).join(" ");
        r.appendChild(s);
        return function (e, t) {
          var n = {};
          var i = {};
          for (var r = 0, a = Object.keys(Lr); r < a.length; r++) {
            var s = a[r];
            var o = Lr[s];
            var l = o[0];
            var c = l === undefined ? {} : l;
            var u = o[1];
            var d = u === undefined ? "mmMwWLliI0fiflO&1" : u;
            var h = e.createElement("span");
            h.textContent = d;
            h.style.whiteSpace = "nowrap";
            for (var p = 0, m = Object.keys(c); p < m.length; p++) {
              var f = m[p];
              var g = c[f];
              if (g !== undefined) {
                h.style[f] = g;
              }
            }
            n[s] = h;
            t.appendChild(e.createElement("br"));
            t.appendChild(h);
          }
          for (var y = 0, v = Object.keys(Lr); y < v.length; y++) {
            i[s = v[y]] = n[s].getBoundingClientRect().width;
          }
          return i;
        }(i, r);
      }, "<!doctype html><html><head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
      var e;
    },
    audio: function () {
      var e;
      var t = window;
      var n = t.OfflineAudioContext || t.webkitOfflineAudioContext;
      if (!n) {
        return -2;
      }
      if (ur() && !dr() && !(nr(["DOMRectList" in (e = window), "RTCPeerConnectionIceEvent" in e, "SVGGeometryElement" in e, "ontransitioncancel" in e]) >= 3)) {
        return -1;
      }
      var i = new n(1, 5000, 44100);
      var r = i.createOscillator();
      r.type = "triangle";
      r.frequency.value = 10000;
      var a = i.createDynamicsCompressor();
      a.threshold.value = -50;
      a.knee.value = 40;
      a.ratio.value = 12;
      a.attack.value = 0;
      a.release.value = 0.25;
      r.connect(a);
      a.connect(i.destination);
      r.start(0);
      var s;
      var o;
      s = i;
      o = function () {};
      var l = [new Promise(function (e, t) {
        var n = false;
        var i = 0;
        var r = 0;
        s.oncomplete = function (t) {
          return e(t.renderedBuffer);
        };
        var a = function () {
          setTimeout(function () {
            return t(fr("timeout"));
          }, Math.min(500, r + 5000 - Date.now()));
        };
        var l = function () {
          try {
            var e = s.startRendering();
            if (Vi(e)) {
              Gi(e);
            }
            switch (s.state) {
              case "running":
                r = Date.now();
                if (n) {
                  a();
                }
                break;
              case "suspended":
                if (!document.hidden) {
                  i++;
                }
                if (n && i >= 3) {
                  t(fr("suspended"));
                } else {
                  setTimeout(l, 500);
                }
            }
          } catch (e) {
            t(e);
          }
        };
        l();
        o = function () {
          if (!n) {
            n = true;
            if (r > 0) {
              a();
            }
          }
        };
      }), o];
      var c = l[1];
      var u = l[0].then(function (e) {
        return function (e) {
          var t = 0;
          for (var n = 0; n < e.length; ++n) {
            t += Math.abs(e[n]);
          }
          return t;
        }(e.getChannelData(0).subarray(4500));
      }, function (e) {
        if (e.name === "timeout" || e.name === "suspended") {
          return -3;
        }
        throw e;
      });
      Gi(u);
      return function () {
        c();
        return u;
      };
    },
    screenFrame: function () {
      var e = this;
      var t = Sr();
      return function () {
        return Oi(e, undefined, undefined, function () {
          var e;
          var n;
          return Di(this, function (i) {
            switch (i.label) {
              case 0:
                return [4, t()];
              case 1:
                e = i.sent();
                return [2, [(n = function (e) {
                  if (e === null) {
                    return null;
                  } else {
                    return ir(e, 10);
                  }
                })(e[0]), n(e[1]), n(e[2]), n(e[3])]];
            }
          });
        });
      };
    },
    osCpu: function () {
      return navigator.oscpu;
    },
    languages: function () {
      var e;
      var t = navigator;
      var n = [];
      var i = t.language || t.userLanguage || t.browserLanguage || t.systemLanguage;
      if (i !== undefined) {
        n.push([i]);
      }
      if (Array.isArray(t.languages)) {
        if (!cr() || !(nr([!("MediaSettingsRange" in (e = window)), "RTCEncodedAudioFrame" in e, "" + e.Intl == "[object Intl]", "" + e.Reflect == "[object Reflect]"]) >= 3)) {
          n.push(t.languages);
        }
      } else if (typeof t.languages == "string") {
        var r = t.languages;
        if (r) {
          n.push(r.split(","));
        }
      }
      return n;
    },
    colorDepth: function () {
      return window.screen.colorDepth;
    },
    deviceMemory: function () {
      return tr(er(navigator.deviceMemory), undefined);
    },
    screenResolution: function () {
      var e = screen;
      var t = function (e) {
        return tr($i(e), null);
      };
      var n = [t(e.width), t(e.height)];
      n.sort().reverse();
      return n;
    },
    hardwareConcurrency: function () {
      return tr($i(navigator.hardwareConcurrency), undefined);
    },
    timezone: function () {
      var e;
      var t = window.Intl?.DateTimeFormat;
      if (t) {
        var n = new t().resolvedOptions().timeZone;
        if (n) {
          return n;
        }
      }
      e = new Date().getFullYear();
      var i = -Math.max(er(new Date(e, 0, 1).getTimezoneOffset()), er(new Date(e, 6, 1).getTimezoneOffset()));
      return `UTC${i >= 0 ? "+" : ""}${Math.abs(i)}`;
    },
    sessionStorage: function () {
      try {
        return !!window.sessionStorage;
      } catch (e) {
        return true;
      }
    },
    localStorage: function () {
      try {
        return !!window.localStorage;
      } catch (e) {
        return true;
      }
    },
    indexedDB: function () {
      if (!or() && !lr()) {
        try {
          return !!window.indexedDB;
        } catch (e) {
          return true;
        }
      }
    },
    openDatabase: function () {
      return !!window.openDatabase;
    },
    cpuClass: function () {
      return navigator.cpuClass;
    },
    platform: function () {
      var e = navigator.platform;
      if (e === "MacIntel" && ur() && !dr()) {
        if (function () {
          if (navigator.platform === "iPad") {
            return true;
          }
          var e = screen;
          var t = e.width / e.height;
          return nr(["MediaSource" in window, !!Element.prototype.webkitRequestFullscreen, t > 0.65 && t < 1.53]) >= 2;
        }()) {
          return "iPad";
        } else {
          return "iPhone";
        }
      } else {
        return e;
      }
    },
    plugins: function () {
      var e = navigator.plugins;
      if (e) {
        var t = [];
        for (var n = 0; n < e.length; ++n) {
          var i = e[n];
          if (i) {
            var r = [];
            for (var a = 0; a < i.length; ++a) {
              var s = i[a];
              r.push({
                type: s.type,
                suffixes: s.suffixes
              });
            }
            t.push({
              name: i.name,
              description: i.description,
              mimeTypes: r
            });
          }
        }
        return t;
      }
    },
    canvas: function () {
      var e;
      var t;
      var n;
      var i;
      var r;
      var a = false;
      (n = document.createElement("canvas")).width = 1;
      n.height = 1;
      var s = [n, n.getContext("2d")];
      var o = s[0];
      var l = s[1];
      r = o;
      if (l && r.toDataURL) {
        (i = l).rect(0, 0, 10, 10);
        i.rect(2, 2, 6, 6);
        a = !i.isPointInPath(5, 5, "evenodd");
        (function (e, t) {
          e.width = 240;
          e.height = 60;
          t.textBaseline = "alphabetic";
          t.fillStyle = "#f60";
          t.fillRect(100, 1, 62, 20);
          t.fillStyle = "#069";
          t.font = "11pt \"Times New Roman\"";
          var n = `Cwm fjordbank gly ${String.fromCharCode(55357, 56835)}`;
          t.fillText(n, 2, 15);
          t.fillStyle = "rgba(102, 204, 0, 0.2)";
          t.font = "18pt Arial";
          t.fillText(n, 4, 45);
        })(o, l);
        var c = kr(o);
        if (c !== kr(o)) {
          e = t = "unstable";
        } else {
          t = c;
          (function (e, t) {
            e.width = 122;
            e.height = 110;
            t.globalCompositeOperation = "multiply";
            for (var n = 0, i = [["#f2f", 40, 40], ["#2ff", 80, 40], ["#ff2", 60, 80]]; n < i.length; n++) {
              var r = i[n];
              var a = r[0];
              var s = r[1];
              var o = r[2];
              t.fillStyle = a;
              t.beginPath();
              t.arc(s, o, 40, 0, Math.PI * 2, true);
              t.closePath();
              t.fill();
            }
            t.fillStyle = "#f9c";
            t.arc(60, 60, 60, 0, Math.PI * 2, true);
            t.arc(60, 60, 20, 0, Math.PI * 2, true);
            t.fill("evenodd");
          })(o, l);
          e = kr(o);
        }
      } else {
        e = t = "";
      }
      return {
        winding: a,
        geometry: e,
        text: t
      };
    },
    touchSupport: function () {
      var e;
      var t = navigator;
      var n = 0;
      if (t.maxTouchPoints !== undefined) {
        n = $i(t.maxTouchPoints);
      } else if (t.msMaxTouchPoints !== undefined) {
        n = t.msMaxTouchPoints;
      }
      try {
        document.createEvent("TouchEvent");
        e = true;
      } catch (t) {
        e = false;
      }
      return {
        maxTouchPoints: n,
        touchEvent: e,
        touchStart: "ontouchstart" in window
      };
    },
    vendor: function () {
      return navigator.vendor || "";
    },
    vendorFlavors: function () {
      var e = [];
      for (var t = 0, n = ["chrome", "safari", "__crWeb", "__gCrWeb", "yandex", "__yb", "__ybro", "__firefox__", "__edgeTrackingPreventionStatistics", "webkit", "oprt", "samsungAr", "ucweb", "UCShellJava", "puffinDevice"]; t < n.length; t++) {
        var i = n[t];
        var r = window[i];
        if (r && typeof r == "object") {
          e.push(i);
        }
      }
      return e.sort();
    },
    cookiesEnabled: function () {
      var e = document;
      try {
        e.cookie = "cookietest=1; SameSite=Strict;";
        var t = e.cookie.indexOf("cookietest=") !== -1;
        e.cookie = "cookietest=1; SameSite=Strict; expires=Thu, 01-Jan-1970 00:00:01 GMT";
        return t;
      } catch (e) {
        return false;
      }
    },
    colorGamut: function () {
      for (var e = 0, t = ["rec2020", "p3", "srgb"]; e < t.length; e++) {
        var n = t[e];
        if (matchMedia(`(color-gamut: ${n})`).matches) {
          return n;
        }
      }
    },
    invertedColors: function () {
      return !!Pr("inverted") || !Pr("none") && undefined;
    },
    forcedColors: function () {
      return !!Tr("active") || !Tr("none") && undefined;
    },
    monochrome: function () {
      if (matchMedia("(min-monochrome: 0)").matches) {
        for (var e = 0; e <= 100; ++e) {
          if (matchMedia(`(max-monochrome: ${e})`).matches) {
            return e;
          }
        }
        throw new Error("Too high value");
      }
    },
    contrast: function () {
      if (Ar("no-preference")) {
        return 0;
      } else if (Ar("high") || Ar("more")) {
        return 1;
      } else if (Ar("low") || Ar("less")) {
        return -1;
      } else if (Ar("forced")) {
        return 10;
      } else {
        return undefined;
      }
    },
    reducedMotion: function () {
      return !!Cr("reduce") || !Cr("no-preference") && undefined;
    },
    hdr: function () {
      return !!_r("high") || !_r("standard") && undefined;
    },
    math: function () {
      var e;
      var t = Rr.acos || Br;
      var n = Rr.acosh || Br;
      var i = Rr.asin || Br;
      var r = Rr.asinh || Br;
      var a = Rr.atanh || Br;
      var s = Rr.atan || Br;
      var o = Rr.sin || Br;
      var l = Rr.sinh || Br;
      var c = Rr.cos || Br;
      var u = Rr.cosh || Br;
      var d = Rr.tan || Br;
      var h = Rr.tanh || Br;
      var p = Rr.exp || Br;
      var m = Rr.expm1 || Br;
      var f = Rr.log1p || Br;
      return {
        acos: t(0.12312423423423424),
        acosh: n(1e+308),
        acoshPf: (e = 1e+154, Rr.log(e + Rr.sqrt(e * e - 1))),
        asin: i(0.12312423423423424),
        asinh: r(1),
        asinhPf: Rr.log(1 + Rr.sqrt(2)),
        atanh: a(0.5),
        atanhPf: Rr.log(3) / 2,
        atan: s(0.5),
        sin: o(-1e+300),
        sinh: l(1),
        sinhPf: Rr.exp(1) - 1 / Rr.exp(1) / 2,
        cos: c(10.000000000123),
        cosh: u(1),
        coshPf: (Rr.exp(1) + 1 / Rr.exp(1)) / 2,
        tan: d(-1e+300),
        tanh: h(1),
        tanhPf: (Rr.exp(2) - 1) / (Rr.exp(2) + 1),
        exp: p(1),
        expm1: m(1),
        expm1Pf: Rr.exp(1) - 1,
        log1p: f(10),
        log1pPf: Rr.log(11),
        powPI: Rr.pow(Rr.PI, -100)
      };
    },
    videoCard: function () {
      var e = document.createElement("canvas");
      var t = e.getContext("webgl") ?? e.getContext("experimental-webgl");
      if (t && "getExtension" in t) {
        var n = t.getExtension("WEBGL_debug_renderer_info");
        if (n) {
          return {
            vendor: (t.getParameter(n.UNMASKED_VENDOR_WEBGL) || "").toString(),
            renderer: (t.getParameter(n.UNMASKED_RENDERER_WEBGL) || "").toString()
          };
        }
      }
    },
    pdfViewerEnabled: function () {
      return navigator.pdfViewerEnabled;
    },
    architecture: function () {
      var e = new Float32Array(1);
      var t = new Uint8Array(e.buffer);
      e[0] = Infinity;
      e[0] = e[0] - e[0];
      return t[3];
    }
  };
  function Dr(e) {
    return JSON.stringify(e, function (e, t) {
      if (t instanceof Error) {
        return Li({
          name: (n = t).name,
          message: n.message,
          stack: (i = n.stack) === null || i === undefined ? undefined : i.split("\n")
        }, n);
      } else {
        return t;
      }
      var n;
      var i;
    }, 2);
  }
  function Nr(e) {
    return Qi(function (e) {
      var t = "";
      for (var n = 0, i = Object.keys(e).sort(); n < i.length; n++) {
        var r = i[n];
        var a = e[r];
        var s = a.error ? "error" : JSON.stringify(a.value);
        t += `${t ? "|" : ""}${r.replace(/([:|\\])/g, "\\$1")}:${s}`;
      }
      return t;
    }(e));
  }
  function Fr(e = 50) {
    return function (e, t = Infinity) {
      var n = window.requestIdleCallback;
      if (n) {
        return new Promise(function (e) {
          return n.call(window, function () {
            return e();
          }, {
            timeout: t
          });
        });
      } else {
        return zi(Math.min(e, t));
      }
    }(e, e * 2);
  }
  function Hr(e) {
    var t = e === undefined ? {} : e;
    var n = t.delayFallback;
    var i = t.debug;
    var r = t.monitoring;
    var a = r === undefined || r;
    return Oi(this, undefined, undefined, function () {
      return Di(this, function (e) {
        switch (e.label) {
          case 0:
            if (a) {
              (function () {
                if (!window.__fpjs_d_m && !(Math.random() >= 0.001)) {
                  try {
                    var e = new XMLHttpRequest();
                    e.open("get", `https://m1.openfpcdn.io/fingerprintjs/v${ji}/npm-monitoring`, true);
                    e.send();
                  } catch (e) {}
                }
              })();
            }
            return [4, Fr(n)];
          case 1:
            e.sent();
            return [2, (t = sr(Or, {
              debug: i
            }, []), r = i, Date.now(), {
              get: function (e) {
                return Oi(this, undefined, undefined, function () {
                  var n;
                  var i;
                  return Di(this, function (a) {
                    switch (a.label) {
                      case 0:
                        Date.now();
                        return [4, t()];
                      case 1:
                        n = a.sent();
                        l = function (e) {
                          if (mr()) {
                            return 0.4;
                          }
                          if (ur()) {
                            if (dr()) {
                              return 0.5;
                            } else {
                              return 0.3;
                            }
                          }
                          var t = e.platform.value || "";
                          if (/^Win/.test(t)) {
                            return 0.6;
                          } else if (/^Mac/.test(t)) {
                            return 0.5;
                          } else {
                            return 0.7;
                          }
                        }(s = n);
                        c = ir(0.99 + l * 0.01, 0.0001);
                        u = {
                          score: l,
                          comment: "$ if upgrade to Pro: https://fpjs.dev/pro".replace(/\$/g, `${c}`)
                        };
                        i = {
                          get visitorId() {
                            if (o === undefined) {
                              o = Nr(this.components);
                            }
                            return o;
                          },
                          set visitorId(e) {
                            o = e;
                          },
                          confidence: u,
                          components: s,
                          version: ji
                        };
                        if (!r && e != null) {
                          e.debug;
                        }
                        return [2, i];
                    }
                    var s;
                    var o;
                    var l;
                    var c;
                    var u;
                  });
                });
              }
            })];
        }
        var t;
        var r;
      });
    });
  }
  var jr = {
    load: Hr,
    hashComponents: Nr,
    componentsToDebugString: Dr
  };
  var zr = Qi;
  const Vr = e(Object.freeze(Object.defineProperty({
    __proto__: null,
    componentsToDebugString: Dr,
    default: jr,
    getFullscreenElement: pr,
    getScreenFrame: Sr,
    hashComponents: Nr,
    isAndroid: mr,
    isChromium: cr,
    isDesktopSafari: dr,
    isEdgeHTML: lr,
    isGecko: hr,
    isTrident: or,
    isWebKit: ur,
    load: Hr,
    loadSources: sr,
    murmurX64Hash128: zr,
    prepareForSources: Fr,
    sources: Or,
    transformSource: function (e, t) {
      var n = function (e) {
        if (ar(e)) {
          return t(e);
        } else {
          return function () {
            var n = e();
            if (Vi(n)) {
              return n.then(t);
            } else {
              return t(n);
            }
          };
        }
      };
      return function (t) {
        var i = e(t);
        if (Vi(i)) {
          return i.then(n);
        } else {
          return n(i);
        }
      };
    },
    withIframe: gr
  }, Symbol.toStringTag, {
    value: "Module"
  })));
  var Wr;
  var Ur;
  var Gr;
  var Yr;
  var Xr;
  var qr;
  var Kr;
  var Jr = {
    exports: {}
  };
  if (typeof (Kr = (qr = typeof globalThis != "undefined" ? globalThis : window).process || {}).env != "object" || Kr.env === null) {
    Kr.env = {};
  }
  if (!Array.isArray(Kr.argv)) {
    Kr.argv = [];
  }
  Kr.browser = true;
  Kr.title = "browser";
  if (typeof Kr.nextTick != "function") {
    Kr.nextTick = function (e) {
      return setTimeout(e, 0);
    };
  }
  qr.process = Kr;
  window.loadedScript = true;
  var Zr = typeof window != "undefined" && !!window.SPECTATE_MODE;
  var Qr = Ze.default;
  var $r = $e;
  var ea = et.default;
  var ta = (() => {
    const e = (0, tt.default)(Qr);
    try {
      const e = typeof require.resolve == "function" ? require.resolve("./network/ClientPacketSender") : null;
      if (e && typeof require.cache == "object" && require.cache && require.cache[e]) {
        delete require.cache[e];
      }
    } catch (e) {}
    return e;
  })();
  const {
    respondAllianceRequest: na,
    kickFromClan: ia,
    requestAllianceJoin: ra,
    createAlliance: aa,
    leaveAlliance: sa,
    storeEquip: oa,
    storeBuy: la,
    sendChat: ca,
    resetMovement: ua,
    sendAttackState: da,
    sendMoveDirection: ha,
    toggleLockDir: pa,
    sendMapPing: ma,
    toggleAutoGather: fa,
    selectToBuild: ga,
    enterGame: ya,
    requestUpgrade: va,
    sendAim: ba,
    sendPerformanceStats: wa,
    sendHatEquipCheck: ka,
    pingSocket: Sa,
    sendAdminCommand: xa
  } = ta;
  var Ia = rt;
  var Ma = ct;
  var Ea = ht;
  var Pa = qt.default;
  var Ta = Kt.default;
  var Aa = Jt.default;
  var Ca = Zt.default;
  var _a = Qt.default;
  var Ra = tn.default;
  var Ba = nn.default;
  var La = sn.default;
  var Oa = on.default;
  var Da = ln.default;
  var Na = dn;
  var Fa = an;
  var Ha = pn.default;
  var ja = Pn;
  var za = ja.default;
  var Va = ja.NATIVE_RESOLUTION_STORAGE_KEY || "native_resolution_pref_v2";
  var Wa = Tn.default;
  var Ua = Cn.default;
  var Ga = Bn;
  Ga.renderLeaf;
  var Ya = Ga.renderCircle;
  Ga.renderStar;
  Ga.renderRoundedStar;
  Ga.renderRect;
  Ga.renderRectCircle;
  Ga.renderBlob;
  Ga.renderTriangle;
  var Xa = Ln.SERVER_PACKET_IDS;
  var qa = On;
  var Ka = jn;
  var Ja = Ri;
  var Za = !!Ja.devClient;
  var Qa = {
    active: false,
    expiresAt: 0,
    consumed: false
  };
  setInterval(function () {
    if (Wl && !Zr) {
      ka(Wo.hatEquipPacketsSent);
    }
  }, 10000);
  var $a = Array.isArray(Ja.playerSkins) ? Ja.playerSkins.filter(function (e) {
    return e && typeof e.id == "number";
  }) : [];
  function es(e) {
    if (!$a.length) {
      return null;
    }
    if (typeof e == "number") {
      for (var t = 0; t < $a.length; ++t) {
        var n = $a[t];
        if (n && n.id === e) {
          return n;
        }
      }
    }
    return $a[0] || null;
  }
  function ts(e) {
    var t = es(e);
    if (t && typeof t.id == "number") {
      return t.id;
    } else {
      return 0;
    }
  }
  var ns = Un()(Ja);
  var is = ns.mapScale;
  var rs = ns.colors;
  var as = ns.bands;
  var ss = ns.river;
  var os = typeof Ja.palmTreeId == "number" ? Ja.palmTreeId : 1000;
  var ls = typeof Ja.darkStoneId == "number" ? Ja.darkStoneId : 1001;
  var cs = typeof Ja.sakuraBushId == "number" ? Ja.sakuraBushId : 1002;
  var us = typeof Ja.sakuraTreeId == "number" ? Ja.sakuraTreeId : 1003;
  var ds = typeof Ja.autumnTreeId == "number" ? Ja.autumnTreeId : 1004;
  var hs = typeof Ja.winterTreeId == "number" ? Ja.winterTreeId : 1005;
  var ps = Vn();
  var ms = Array.isArray(ps.environment) ? ps.environment : [];
  var fs = new Map();
  function gs(e) {
    var t = null;
    if (typeof e != "number" || isNaN(e)) {
      if (typeof e == "string" && e.length) {
        t = e.toLowerCase();
      }
    } else {
      t = String(e);
    }
    var n = t ? fs.get(t) : null;
    if (!n) {
      return null;
    }
    var i = Object.assign({}, n);
    i.isItem = false;
    return i;
  }
  ms.forEach(function (e) {
    if (e) {
      var t = e.id !== undefined ? String(e.id) : null;
      var n = typeof e.name == "string" ? e.name.toLowerCase() : null;
      if (t !== null) {
        fs.set(t, e);
      }
      if (n) {
        fs.set(n, e);
      }
    }
  });
  var ys = typeof Ja.playerImageScale == "number" ? Ja.playerImageScale : 1;
  var vs = Ja.resourceImages && typeof Ja.resourceImages == "object" ? Ja.resourceImages : {};
  var bs = ".././img/missing_texture.png";
  zp();
  var ws = Array.isArray(Ja.snowRegions) ? Ja.snowRegions : [];
  function ks(e) {
    var t = new Image();
    t.decoding = "async";
    t.loading = "eager";
    if (e) {
      t.src = e;
    }
    return t;
  }
  if (typeof Ja.desertStart == "number") {
    Ja.desertStart;
  }
  var Ss = function () {
    if (pi) {
      return hi;
    }
    pi = 1;
    var e = Ri.physics || {};
    var t = typeof e.wiggleDecayRate == "number" ? e.wiggleDecayRate : 0.998;
    var n = typeof e.wiggleSpeed == "number" ? e.wiggleSpeed : 0.008;
    var i = typeof e.wiggleMinForce == "number" ? e.wiggleMinForce : 0.02;
    return hi = function (e) {
      this.sid = e;
      this.init = function (e, t, n, i, r, a, s) {
        a = a || {};
        this.sentTo = {};
        this.gridLocations = [];
        this.active = true;
        this.doUpdate = a.doUpdate;
        this.x = e;
        this.y = t;
        this.dir = n;
        this.xWiggle = 0;
        this.yWiggle = 0;
        this.wiggleForceX = 0;
        this.wiggleForceY = 0;
        this.wigglePhase = 0;
        this.scale = i;
        this.type = r;
        this.id = a.id;
        this.owner = s;
        this.name = a.name;
        this.spritePath = a.spritePath;
        this.layer = a.layer;
        this.isItem = a.isItem !== undefined ? a.isItem : this.id != null;
        this.group = a.group;
        this.health = a.health;
        this.decorationPath = a.decorationPath;
        if (this.layer === undefined) {
          this.layer = 2;
          if (this.group != null) {
            this.layer = this.group.layer;
          } else if (this.type == 0) {
            this.layer = 3;
          } else if (this.type == 2) {
            this.layer = 0;
          } else if (this.type == 4) {
            this.layer = -1;
          }
        }
        this.colDiv = a.colDiv || 1;
        this.blocker = a.blocker;
        this.ignoreCollision = a.ignoreCollision;
        this.dontGather = a.dontGather;
        this.hideFromEnemy = a.hideFromEnemy;
        this.dmg = a.dmg;
        this.pDmg = a.pDmg;
        this.pps = a.pps;
        this.zIndex = a.zIndex || 0;
        this.turnSpeed = a.turnSpeed;
        this.req = a.req;
        this.trap = a.trap;
        this.healCol = a.healCol;
        this.teleport = a.teleport;
        this.boostSpeed = a.boostSpeed;
        this.projectile = a.projectile;
        this.shootRange = a.shootRange;
        this.shootRate = a.shootRate;
        this.shootCount = this.shootRate;
        this.spawnPoint = a.spawnPoint;
        this.isDeathSkull = !!a.isDeathSkull;
      };
      this.changeHealth = function (e, t) {
        this.health += e;
        return this.health <= 0;
      };
      this.getScale = function (e, t) {
        e = e || 1;
        return this.scale * (this.isItem || this.type == 2 || this.type == 3 || this.type == 4 ? 1 : e * 0.6) * (t ? 1 : this.colDiv);
      };
      this.visibleToPlayer = function (e) {
        return !this.hideFromEnemy || this.owner && (this.owner == e || this.owner.team && e.team == this.owner.team);
      };
      this.update = function (e) {
        if (this.active) {
          if (this.wiggleForceX || this.wiggleForceY) {
            var r = Math.pow(t, e);
            this.wiggleForceX *= r;
            this.wiggleForceY *= r;
            this.wigglePhase += e * n;
            var a = Math.min(this.wigglePhase, 1);
            var s = a <= 0.5 ? a * 2 : 2 - a * 2;
            this.xWiggle = this.wiggleForceX * s;
            this.yWiggle = this.wiggleForceY * s;
            if (this.wigglePhase >= 1 || Math.abs(this.wiggleForceX) <= i && Math.abs(this.wiggleForceY) <= i) {
              this.wiggleForceX = 0;
              this.wiggleForceY = 0;
              this.xWiggle = 0;
              this.yWiggle = 0;
              this.wigglePhase = 0;
            }
          } else {
            this.xWiggle = 0;
            this.yWiggle = 0;
          }
          if (this.turnSpeed) {
            this.dir += this.turnSpeed * e;
          }
        }
      };
    };
  }();
  var xs = fi ? mi : (fi = 1, mi = Vn());
  var Is = function () {
    if (yi) {
      return gi;
    }
    yi = 1;
    var e = Math.floor;
    var t = Math.abs;
    var n = Math.cos;
    var i = Math.sin;
    var r = Math.sqrt;
    var a = Un();
    return gi = function (s, o, l, c) {
      var u;
      var d;
      this.objects = o;
      this.grids = {};
      var h;
      var p;
      var m = typeof c.cactusDamage == "number" ? c.cactusDamage : 20;
      var f = a(c);
      var g = c.mapScale / c.colGrid;
      this.setObjectGrids = function (e) {
        var t = Math.min(c.mapScale, Math.max(0, e.x));
        var n = Math.min(c.mapScale, Math.max(0, e.y));
        for (var i = 0; i < c.colGrid; ++i) {
          u = i * g;
          for (var r = 0; r < c.colGrid; ++r) {
            d = r * g;
            if (t + e.scale >= u && t - e.scale <= u + g && n + e.scale >= d && n - e.scale <= d + g) {
              var a = i + "_" + r;
              this.grids[a] ||= [];
              this.grids[a].push(e);
              e.gridLocations.push(a);
            }
          }
        }
      };
      this.removeObjGrid = function (e) {
        for (var t = 0; t < e.gridLocations.length; ++t) {
          var n = e.gridLocations[t];
          var i = this.grids[n];
          if (i) {
            var r = i.indexOf(e);
            if (r >= 0) {
              i.splice(r, 1);
            }
          }
        }
        e.gridLocations.length = 0;
      };
      this.disableObj = function (e) {
        e.active = false;
        this.removeObjGrid(e);
      };
      this.hitObj = function (e, t) {};
      var y = [];
      this.getGridArrays = function (t, n, i) {
        u = e(t / g);
        d = e(n / g);
        y.length = 0;
        try {
          if (this.grids[u + "_" + d]) {
            y.push(this.grids[u + "_" + d]);
          }
          if (t + i >= (u + 1) * g) {
            if (h = this.grids[u + 1 + "_" + d]) {
              y.push(h);
            }
            if (d && n - i <= d * g) {
              if (h = this.grids[u + 1 + "_" + (d - 1)]) {
                y.push(h);
              }
            } else if (n + i >= (d + 1) * g && (h = this.grids[u + 1 + "_" + (d + 1)])) {
              y.push(h);
            }
          }
          if (u && t - i <= u * g) {
            if (h = this.grids[u - 1 + "_" + d]) {
              y.push(h);
            }
            if (d && n - i <= d * g) {
              if (h = this.grids[u - 1 + "_" + (d - 1)]) {
                y.push(h);
              }
            } else if (n + i >= (d + 1) * g && (h = this.grids[u - 1 + "_" + (d + 1)])) {
              y.push(h);
            }
          }
          if (n + i >= (d + 1) * g && (h = this.grids[u + "_" + (d + 1)])) {
            y.push(h);
          }
          if (d && n - i <= d * g && (h = this.grids[u + "_" + (d - 1)])) {
            y.push(h);
          }
        } catch (e) {}
        return y;
      };
      this.add = function (e, t, n, i, r, a, l, c, u) {
        if (!l && a === 1) {
          if (f.getBiome(t, n) === "desert") {
            l = {
              name: "cactus",
              dmg: m
            };
          }
        }
        p = null;
        for (var d = 0; d < o.length; ++d) {
          if (o[d].sid == e) {
            p = o[d];
            break;
          }
        }
        if (!p) {
          for (d = 0; d < o.length; ++d) {
            if (!o[d].active) {
              p = o[d];
              break;
            }
          }
        }
        if (!p) {
          p = new s(e);
          o.push(p);
        }
        if (c) {
          p.sid = e;
        }
        p.init(t, n, i, r, a, l, u);
        this.setObjectGrids(p);
      };
      this.disableBySid = function (e) {
        for (var t = 0; t < o.length; ++t) {
          if (o[t].sid == e) {
            this.disableObj(o[t]);
            break;
          }
        }
      };
      this.removeAllItems = function (e, t) {
        for (var n = 0; n < o.length; ++n) {
          if (o[n].active && o[n].owner && o[n].owner.sid == e) {
            this.disableObj(o[n]);
          }
        }
        if (t) {
          t.broadcast("R", e);
        }
      };
      this.checkItemLocation = function (e, t, n, i, r, a, s) {
        for (var c = 0; c < o.length; ++c) {
          var u = o[c].blocker ? o[c].blocker : o[c].getScale(i, o[c].isItem);
          if (o[c].active && l.getDistance(e, t, o[c].x, o[c].y) < n + u) {
            return false;
          }
        }
        return !!a || r == 18 || !f.isInRiver(e, t, 0);
      };
      this.checkCollision = function (e, a, s) {
        s = s || 1;
        var o = e.x - a.x;
        var u = e.y - a.y;
        var d = e.scale + a.scale;
        if (t(o) <= d || t(u) <= d) {
          d = e.scale + (a.getScale ? a.getScale() : a.scale);
          var h = r(o * o + u * u) - d;
          if (h <= 0) {
            if (a.ignoreCollision) {
              if (!a.trap || e.noTrap || a.owner == e || a.owner && a.owner.team && a.owner.team == e.team) {
                if (a.boostSpeed) {
                  e.xVel += s * a.boostSpeed * (a.weightM || 1) * n(a.dir);
                  e.yVel += s * a.boostSpeed * (a.weightM || 1) * i(a.dir);
                } else if (a.healCol) {
                  e.healCol = a.healCol;
                } else if (a.teleport) {
                  e.x = l.randInt(0, c.mapScale);
                  e.y = l.randInt(0, c.mapScale);
                }
              } else {
                e.lockMove = true;
                a.hideFromEnemy = false;
              }
            } else {
              var p = l.getDirection(e.x, e.y, a.x, a.y);
              l.getDistance(e.x, e.y, a.x, a.y);
              if (a.isPlayer) {
                h = h * -1 / 2;
                e.x += h * n(p);
                e.y += h * i(p);
                a.x -= h * n(p);
                a.y -= h * i(p);
              } else {
                e.x = a.x + d * n(p);
                e.y = a.y + d * i(p);
                e.xVel *= 0.75;
                e.yVel *= 0.75;
              }
              if (a.dmg && a.owner != e && (!a.owner || !a.owner.team || a.owner.team != e.team)) {
                e.changeHealth(-a.dmg, a.owner, a);
                var m = (a.weightM || 1) * 1.5;
                if (e.lockMove) {
                  m = 0;
                }
                e.xVel += m * n(p);
                e.yVel += m * i(p);
                if (!!a.pDmg && (!e.skin || !e.skin.poisonRes)) {
                  e.dmgOverTime.dmg = a.pDmg;
                  e.dmgOverTime.time = 5;
                  e.dmgOverTime.doer = a.owner;
                }
                if (e.colDmg && a.health) {
                  if (a.changeHealth(-e.colDmg)) {
                    this.disableObj(a);
                  }
                  this.hitObj(a, l.getDirection(e.x, e.y, a.x, a.y));
                }
              }
            }
            if (a.zIndex > e.zIndex) {
              e.zIndex = a.zIndex;
            }
            return true;
          }
        }
        return false;
      };
    };
  }();
  var Ms = function () {
    if (bi) {
      return vi;
    }
    bi = 1;
    var e = Math.abs;
    var t = Math.cos;
    var n = Math.sin;
    var i = Math.pow;
    var r = Math.sqrt;
    var a = Un();
    function s(e, t) {
      var n = function (e) {
        if (!e) {
          return null;
        }
        var t = e.playerSkins;
        if (Array.isArray(t) && t.length) {
          return t;
        } else {
          return null;
        }
      }(e);
      if (!n) {
        return 0;
      }
      if (typeof t == "number") {
        for (var i = 0; i < n.length; ++i) {
          if (n[i] && n[i].id === t) {
            return t;
          }
        }
      }
      for (var r = 0; r < n.length; ++r) {
        if (n[r] && typeof n[r].id == "number") {
          return n[r].id;
        }
      }
      return 0;
    }
    return vi = function (o, l, c, u, d, h, p, m, f, g, y, v, b) {
      var w = a(c);
      var k = w.mapScale;
      function S(e) {
        if (e && e.skin && typeof e.skin.waterDamageMultiplier == "number") {
          if (e.zIndex) {
            return 1;
          } else if (w.isInRiver(e.x, e.y, 0)) {
            return e.skin.waterDamageMultiplier;
          } else {
            return 1;
          }
        } else {
          return 1;
        }
      }
      var x = c.combat && typeof c.combat.trapKnockbackTicks == "number" ? c.combat.trapKnockbackTicks : 0;
      var I = c.combat && typeof c.combat.trapKnockbackMultiplier == "number" ? c.combat.trapKnockbackMultiplier : 1;
      function M(e) {
        return !!e && !!e.lockMove && x > 0 && ((typeof e.trapKnockbackTicks == "number" ? e.trapKnockbackTicks : 0) < x && (e.trapKnockbackTicks = x), true);
      }
      this.id = o;
      this.sid = l;
      this.team = null;
      this.skinIndex = 0;
      this.tailIndex = 0;
      this.hitTime = 0;
      this.tail = null;
      this.tails = {};
      this.skins = {};
      for (var E = 0; E < g.length; ++E) {
        if (g[E].price <= 0) {
          this.skins[g[E].id] = 1;
        }
      }
      this.points = 0;
      this.dt = 0;
      this.hidden = false;
      this.itemCounts = {};
      this.isPlayer = true;
      this.pps = 0;
      this.sandboxMillCount = 0;
      this.moveDir = undefined;
      this.skinRot = 0;
      this.lastPing = 0;
      this.iconIndex = 0;
      this.bodySkin = s(c);
      this.cps = 0;
      this.ping = -1;
      this.spawn = function (e) {
        this.active = true;
        this.alive = true;
        this.lockMove = false;
        this.trapKnockbackTicks = 0;
        this.lockDir = false;
        this.chatCountdown = 0;
        this.shameCount = 0;
        this.shameTimer = 0;
        this.sentTo = {};
        this.gathering = 0;
        this.autoGather = 0;
        this.animTime = 0;
        this.animSpeed = 0;
        this.mouseState = 0;
        this.buildIndex = -1;
        this.weaponIndex = 0;
        this.dmgOverTime = {};
        this.noMovTimer = 0;
        this.maxXP = c.experience ? c.experience.initialXP : 300;
        this.XP = 0;
        this.age = 1;
        this.kills = 0;
        this.upgrAge = 2;
        this.upgradePoints = 0;
        this.sandboxMillCount = 0;
        this.x = 0;
        this.y = 0;
        this.zIndex = 0;
        this.xVel = 0;
        this.yVel = 0;
        this.slowMult = 1;
        this.dir = 0;
        this.dirPlus = 0;
        this.targetAngle = 0;
        var t = typeof c.baseHealth == "number" ? c.baseHealth : 100;
        this.maxHealth = t;
        this.health = this.maxHealth;
        this.scale = c.playerScale;
        this.speed = c.playerSpeed;
        this.resetMoveDir();
        this.resetResources(e);
        var n = Array.isArray(c.startItems) ? c.startItems.slice() : [0, 3, 6, 10];
        var i = Array.isArray(c.startWeapons) ? c.startWeapons.slice() : [0];
        this.items = n;
        this.weapons = i;
        this.shootCount = 0;
        this.weaponXP = [];
        this.reloads = {};
        this.cps = 0;
        this.ping = -1;
      };
      this.resetMoveDir = function () {
        this.moveDir = undefined;
      };
      this.resetResources = function (e) {
        var t = c.startResources || {};
        var n = e ? t.moofoll : t.normal;
        if (typeof n != "number") {
          n = 100000;
        }
        for (var i = 0; i < c.resourceTypes.length; ++i) {
          this[c.resourceTypes[i]] = n;
        }
      };
      this.setData = function (e) {
        this.id = e[0];
        this.sid = e[1];
        this.name = e[2];
        this.x = e[3];
        this.y = e[4];
        this.dir = e[5];
        this.health = e[6];
        this.maxHealth = e[7];
        this.scale = e[8];
        this.bodySkin = s(c, e[9]);
      };
      var P = 0;
      function T(e) {
        return u && typeof u.isNumber == "function" && u.isNumber(e);
      }
      this.update = function (e) {
        if (this.alive) {
          if (this.shameTimer > 0) {
            this.shameTimer -= e;
            if (this.shameTimer <= 0) {
              this.shameTimer = 0;
              this.shameCount = 0;
            }
          }
          if ((P -= e) <= 0) {
            var a = (this.skin && this.skin.healthRegen ? this.skin.healthRegen : 0) + (this.tail && this.tail.healthRegen ? this.tail.healthRegen : 0);
            if (a) {
              this.changeHealth(a, this);
            }
            if (this.dmgOverTime.dmg) {
              this.changeHealth(-this.dmgOverTime.dmg, this.dmgOverTime.doer);
              this.dmgOverTime.time -= 1;
              if (this.dmgOverTime.time <= 0) {
                this.dmgOverTime.dmg = 0;
              }
            }
            if (this.healCol) {
              this.changeHealth(this.healCol, this);
            }
            P = 1000;
          }
          if (this.alive) {
            if (this.slowMult < 1) {
              this.slowMult += (c.combat ? c.combat.slowRecoveryRate : 0.0008) * e;
              if (this.slowMult > 1) {
                this.slowMult = 1;
              }
            }
            this.noMovTimer += e;
            if (this.xVel || this.yVel) {
              this.noMovTimer = 0;
            }
            if (this.lockMove) {
              if (this.trapKnockbackTicks > 0) {
                this.trapKnockbackTicks -= 1;
              } else {
                this.xVel = 0;
                this.yVel = 0;
              }
            } else {
              this.trapKnockbackTicks = 0;
              var s = (this.buildIndex >= 0 ? c.physics ? c.physics.buildingSpeedPenalty : 0.5 : 1) * (f.weapons[this.weaponIndex].spdMult || 1) * (this.skin && this.skin.spdMult || 1) * (this.tail && this.tail.spdMult || 1) * (N = this.y, F = this.x, w.getBiome(typeof F == "number" ? F : k / 2, N) === "winter" ? this.skin && this.skin.coldM ? 1 : c.snowSpeed : 1) * this.slowMult;
              if (!this.zIndex && w.isInRiver(this.x, this.y, 0)) {
                var o = this.skin && this.skin.watrImm ? c.water ? c.water.immunityCurrentEffect : 0.4 : c.water ? c.water.normalCurrentEffect : 1;
                if (this.skin && typeof this.skin.waterCurrentMultiplier == "number") {
                  o *= this.skin.waterCurrentMultiplier;
                }
                if (this.skin && this.skin.watrImm) {
                  s *= c.water ? c.water.immunitySpeedMultiplier : 0.75;
                } else {
                  s *= c.water ? c.water.normalSpeedMultiplier : 0.33;
                }
                var l = w.getRiverFlowVector(this.x, this.y);
                var m = c.waterCurrent * o * e;
                this.xVel += m * l.x;
                this.yVel += m * l.y;
              }
              var g = this.moveDir != null ? t(this.moveDir) : 0;
              var y = this.moveDir != null ? n(this.moveDir) : 0;
              var v = r(g * g + y * y);
              if (v != 0) {
                g /= v;
                y /= v;
              }
              if (g) {
                this.xVel += g * this.speed * s * e;
              }
              if (y) {
                this.yVel += y * this.speed * s * e;
              }
            }
            var b;
            this.zIndex = 0;
            this.lockMove = false;
            this.healCol = 0;
            var x = u.getDistance(0, 0, this.xVel * e, this.yVel * e);
            for (var I = Math.min(4, Math.max(1, Math.round(x / 40))), M = 1 / I, E = 0; E < I; ++E) {
              if (this.xVel) {
                this.x += this.xVel * e * M;
              }
              if (this.yVel) {
                this.y += this.yVel * e * M;
              }
              b = h.getGridArrays(this.x, this.y, this.scale);
              for (var T = 0; T < b.length; ++T) {
                for (var A = 0; A < b[T].length; ++A) {
                  if (b[T][A].active) {
                    h.checkCollision(this, b[T][A], M);
                  }
                }
              }
            }
            var C = c.physics ? c.physics.velocityStopThreshold : 0.01;
            if (this.xVel) {
              this.xVel *= i(c.playerDecel, e);
              if (this.xVel <= C && this.xVel >= -C) {
                this.xVel = 0;
              }
            }
            if (this.yVel) {
              this.yVel *= i(c.playerDecel, e);
              if (this.yVel <= C && this.yVel >= -C) {
                this.yVel = 0;
              }
            }
            if (this.x - this.scale < 0) {
              this.x = this.scale;
            } else if (this.x + this.scale > c.mapScale) {
              this.x = c.mapScale - this.scale;
            }
            if (this.y - this.scale < 0) {
              this.y = this.scale;
            } else if (this.y + this.scale > c.mapScale) {
              this.y = c.mapScale - this.scale;
            }
            if (this.buildIndex < 0) {
              if (this.reloads[this.weaponIndex] > 0) {
                this.reloads[this.weaponIndex] -= e;
                this.gathering = this.mouseState;
              } else if (this.gathering || this.autoGather) {
                var _ = true;
                if (f.weapons[this.weaponIndex].gather != null) {
                  this.gather(p);
                } else if (f.weapons[this.weaponIndex].projectile != null && this.hasRes(f.weapons[this.weaponIndex], this.skin ? this.skin.projCost : 0)) {
                  this.useRes(f.weapons[this.weaponIndex], this.skin ? this.skin.projCost : 0);
                  this.noMovTimer = 0;
                  var R = f.weapons[this.weaponIndex].projectile;
                  var B = this.scale * 2;
                  var L = this.skin && this.skin.aMlt ? this.skin.aMlt : 1;
                  var O = S(this);
                  var D = f.projectiles[R].dmg * O;
                  if (f.weapons[this.weaponIndex].rec) {
                    this.xVel -= f.weapons[this.weaponIndex].rec * t(this.dir);
                    this.yVel -= f.weapons[this.weaponIndex].rec * n(this.dir);
                  }
                  d.addProjectile(this.x + B * t(this.dir), this.y + B * n(this.dir), this.dir, f.projectiles[R].range * L, f.projectiles[R].speed * L, R, this, null, this.zIndex, D);
                } else {
                  _ = false;
                }
                this.gathering = this.mouseState;
                if (_) {
                  this.reloads[this.weaponIndex] = f.weapons[this.weaponIndex].speed * (this.skin && this.skin.atkSpd || 1);
                }
              }
            }
          }
        }
        var N;
        var F;
      };
      this.addWeaponXP = function (e) {
        this.weaponXP[this.weaponIndex] ||= 0;
        this.weaponXP[this.weaponIndex] += e;
      };
      this.earnXP = function (e) {
        if (this.age < c.maxAge) {
          this.XP += e;
          if (this.XP >= this.maxXP) {
            if (this.age < c.maxAge) {
              this.age++;
              this.XP = 0;
              this.maxXP *= c.experience ? c.experience.levelMultiplier : 1.2;
            } else {
              this.XP = this.maxXP;
            }
            this.upgradePoints++;
            y.send(this.id, "U", this.upgradePoints, this.upgrAge);
            y.send(this.id, "T", this.XP, u.fixTo(this.maxXP, 1), this.age);
          } else {
            y.send(this.id, "T", this.XP);
          }
        }
      };
      this.changeHealth = function (e, t) {
        if (e > 0 && this.health >= this.maxHealth) {
          return false;
        }
        if (e < 0 && this.skin) {
          e *= this.skin.dmgMult || 1;
        }
        if (e < 0 && this.tail) {
          e *= this.tail.dmgMult || 1;
        }
        if (e < 0) {
          this.hitTime = Date.now();
        }
        this.health += e;
        if (this.health > this.maxHealth) {
          e -= this.health - this.maxHealth;
          this.health = this.maxHealth;
        }
        if (this.health <= 0) {
          this.kill(t);
        }
        for (var n = 0; n < p.length; ++n) {
          if (this.sentTo[p[n].id]) {
            y.send(p[n].id, "O", this.sid, Math.round(this.health));
          }
        }
        if (!!t && !!t.canSee(this) && (t != this || !(e < 0))) {
          y.send(t.id, "8", Math.round(this.x), Math.round(this.y), Math.round(-e), 1);
        }
        return true;
      };
      this.kill = function (e) {
        if (e && e.alive) {
          e.kills++;
          var t = c.combat ? c.combat.goldStealPercent : 0.5;
          var n = c.combat ? c.combat.killScoreMultiplier : 100;
          if (e.skin && e.skin.goldSteal) {
            v(e, Math.round(this.points * t));
          } else {
            v(e, Math.round(this.age * n * (e.skin && e.skin.kScrM ? e.skin.kScrM : 1)));
          }
          y.send(e.id, "N", "kills", e.kills, 1);
        }
        this.alive = false;
        y.send(this.id, "P");
        b();
      };
      this.addResource = function (e, t, n) {
        if (c.resourceTypes && !(e < 0) && !(e >= c.resourceTypes.length) && c.resourceTypes[e]) {
          var i = c.resourceTypes[e];
          if (!n && t > 0 && (i === "wood" || i === "food" || i === "stone")) {
            this.addWeaponXP(t);
          }
          if (i === "points") {
            v(this, t, true);
          } else {
            this[i] += t;
            y.send(this.id, "N", i, this[i], 1);
          }
        }
      };
      this.changeItemCount = function (e, t) {
        this.itemCounts[e] = this.itemCounts[e] || 0;
        this.itemCounts[e] += t;
        if (this.itemCounts[e] < 0) {
          this.itemCounts[e] = 0;
        }
        if (c.isSandbox && e === 3) {
          this.sandboxMillCount = this.itemCounts[e];
        }
        y.send(this.id, "S", e, this.itemCounts[e]);
      };
      this.buildItem = function (e) {
        var i = this.scale + e.scale + (e.placeOffset || 0);
        var r = this.x + i * t(this.dir);
        var a = this.y + i * n(this.dir);
        if (this.canBuild(e) && (!e.consume || !this.skin || !this.skin.noEat) && (e.consume || h.checkItemLocation(r, a, e.scale, 0.6, e.id, false, this))) {
          var s = false;
          if (e.consume) {
            if (this.hitTime) {
              var o = Date.now() - this.hitTime;
              this.hitTime = 0;
              var l = c.shameSystem ? c.shameSystem.detectionWindow : 120;
              var u = c.shameSystem ? c.shameSystem.threshold : 8;
              var d = c.shameSystem ? c.shameSystem.penaltyDuration : 30000;
              var p = c.shameSystem ? c.shameSystem.countReduction : 2;
              if (o <= l) {
                this.shameCount++;
                if (this.shameCount >= u) {
                  this.shameTimer = d;
                  this.shameCount = 0;
                }
              } else {
                this.shameCount -= p;
                if (this.shameCount <= 0) {
                  this.shameCount = 0;
                }
              }
            }
            if (this.shameTimer <= 0) {
              s = e.consume(this);
            }
          } else {
            s = true;
            if (e.group && e.group.limit) {
              this.changeItemCount(e.group.id, 1);
            }
            var m = e;
            if (e.pps) {
              var f = c.isSandbox && c.millPpsMultiplier || 1;
              var g = e.pps * f;
              this.pps += g;
              m = Object.assign({}, e, {
                pps: g
              });
            }
            h.add(h.objects.length, r, a, this.dir, e.scale, e.type, m, false, this);
          }
          if (s) {
            this.useRes(e);
            this.buildIndex = -1;
          }
        }
      };
      this.hasRes = function (e, t) {
        for (var n = 0; n < e.req.length;) {
          if (this[e.req[n]] < Math.round(e.req[n + 1] * (t || 1))) {
            return false;
          }
          n += 2;
        }
        return true;
      };
      this.useRes = function (e, t) {
        if (!c.isSandbox) {
          for (var n = 0; n < e.req.length;) {
            this.addResource(c.resourceTypes.indexOf(e.req[n]), -Math.round(e.req[n + 1] * (t || 1)));
            n += 2;
          }
        }
      };
      this.canBuild = function (e) {
        if (c.isSandbox) {
          if (e.group) {
            var t = this.itemCounts[e.group.id] || 0;
            var n = c.sandboxBuildLimits || {};
            var i = typeof n.mill == "number" ? n.mill : 1;
            var r = typeof n.spikes == "number" ? n.spikes : 200;
            var a = typeof n.traps == "number" ? n.traps : 100;
            var s = typeof n.turrets == "number" ? n.turrets : 20;
            var o = typeof n.general == "number" ? n.general : 300;
            if (typeof e.group.limit == "number" && t >= e.group.limit) {
              return false;
            }
            if (e.group.id === 3 && t >= i) {
              return false;
            }
            if (e.group.id === 2 && t >= r) {
              return false;
            }
            if (e.group.id === 5 && t >= a) {
              return false;
            }
            if (e.group.id === 7 && t >= s) {
              return false;
            }
            if (e.group.limit && t >= o) {
              return false;
            }
          }
          return true;
        }
        return (!e.group || !e.group.limit || !(this.itemCounts[e.group.id] >= e.group.limit)) && this.hasRes(e);
      };
      this.gather = function () {
        this.noMovTimer = 0;
        var e;
        var i;
        var r;
        var a = c.combat ? c.combat.defaultHitSlow : 0.3;
        this.slowMult -= f.weapons[this.weaponIndex].hitSlow || a;
        if (this.slowMult < 0) {
          this.slowMult = 0;
        }
        var s = c.fetchVariant(this);
        var o = s.poison;
        var l = s.val;
        var d = {};
        for (var g = h.getGridArrays(this.x, this.y, f.weapons[this.weaponIndex].range), y = 0; y < g.length; ++y) {
          for (var v = 0; v < g[y].length; ++v) {
            if ((i = g[y][v]).active && !i.dontGather && !d[i.sid] && i.visibleToPlayer(this) && u.getDistance(this.x, this.y, i.x, i.y) - i.scale <= f.weapons[this.weaponIndex].range && (e = u.getDirection(i.x, i.y, this.x, this.y), u.getAngleDist(e, this.dir) <= c.gatherAngle)) {
              d[i.sid] = 1;
              if (i.health) {
                var b = S(this);
                if (i.changeHealth(-f.weapons[this.weaponIndex].dmg * l * (f.weapons[this.weaponIndex].sDmg || 1) * (this.skin && this.skin.bDmg ? this.skin.bDmg : 1) * b, this)) {
                  var w = !!i.isDeathSkull || i.name === "skull stash";
                  for (var k = 0; k < i.req.length;) {
                    this.addResource(c.resourceTypes.indexOf(i.req[k]), i.req[k + 1], w);
                    k += 2;
                  }
                  h.disableObj(i);
                }
              } else {
                var x = c.experience ? c.experience.gatheringMultiplier : 4;
                var E = c.experience ? c.experience.goldBonusResources : 4;
                this.earnXP(x * f.weapons[this.weaponIndex].gather);
                var P = f.weapons[this.weaponIndex].gather + (i.type == 3 ? E : 0);
                if (this.skin && this.skin.extraGold) {
                  this.addResource(3, 1);
                }
                this.addResource(i.type, P);
              }
              r = true;
              h.hitObj(i, e);
            }
          }
        }
        for (v = 0; v < p.length + m.length; ++v) {
          if ((i = p[v] || m[v - p.length]) != this && i.alive && (!i.team || i.team != this.team) && u.getDistance(this.x, this.y, i.x, i.y) - i.scale * 1.8 <= f.weapons[this.weaponIndex].range && (e = u.getDirection(i.x, i.y, this.x, this.y), u.getAngleDist(e, this.dir) <= c.gatherAngle)) {
            var T = f.weapons[this.weaponIndex].steal;
            if (T && i.addResource) {
              T = Math.min(i.points || 0, T);
              this.addResource(3, T);
              i.addResource(3, -T);
            }
            var A = l;
            if (i.weaponIndex != null && f.weapons[i.weaponIndex].shield && u.getAngleDist(e + Math.PI, i.dir) <= c.shieldAngle) {
              A = f.weapons[i.weaponIndex].shield;
            }
            b = S(this);
            var C = f.weapons[this.weaponIndex].dmg * (this.skin && this.skin.dmgMultO ? this.skin.dmgMultO : 1) * (this.tail && this.tail.dmgMultO ? this.tail.dmgMultO : 1) * b;
            var _ = 0.3;
            if (c.animalBehavior && typeof c.animalBehavior.playerKnockback == "number") {
              _ = c.animalBehavior.playerKnockback;
            } else if (c.combat && typeof c.combat.baseKnockback == "number") {
              _ = c.combat.baseKnockback;
            }
            var R = 1;
            if (c.combat && typeof c.combat.knockbackMultiplier == "number") {
              R = c.combat.knockbackMultiplier;
            }
            var B = (_ * (i.weightM || 1) + (f.weapons[this.weaponIndex].knock || 0)) * R;
            if (i.lockMove) {
              if (M(i)) {
                B *= I;
              } else {
                B = 0;
                i.trapKnockbackTicks = 0;
              }
            }
            i.xVel += B * t(e);
            i.yVel += B * n(e);
            if (this.skin && this.skin.healD) {
              this.changeHealth(C * A * this.skin.healD, this);
            }
            if (this.tail && this.tail.healD) {
              this.changeHealth(C * A * this.tail.healD, this);
            }
            if (i.skin && i.skin.dmg && A == 1) {
              this.changeHealth(-C * i.skin.dmg, i);
            }
            if (i.tail && i.tail.dmg && A == 1) {
              this.changeHealth(-C * i.tail.dmg, i);
            }
            if (!!i.dmgOverTime && !!this.skin && !!this.skin.poisonDmg && (!i.skin || !i.skin.poisonRes)) {
              i.dmgOverTime.dmg = this.skin.poisonDmg;
              i.dmgOverTime.time = this.skin.poisonTime || 1;
              i.dmgOverTime.doer = this;
            }
            if (i.dmgOverTime && o && (!i.skin || !i.skin.poisonRes)) {
              var L = c.combat ? c.combat.poisonDamage : 5;
              var O = c.combat ? c.combat.poisonDuration : 5;
              i.dmgOverTime.dmg = L;
              i.dmgOverTime.time = O;
              i.dmgOverTime.doer = this;
            }
            if (i.skin && i.skin.dmgK) {
              this.xVel -= i.skin.dmgK * t(e);
              this.yVel -= i.skin.dmgK * n(e);
            }
            i.changeHealth(-C * A, this, this);
          }
        }
        this.sendAnimation(r ? 1 : 0);
      };
      this.sendAnimation = function (e) {
        for (var t = 0; t < p.length; ++t) {
          if (this.sentTo[p[t].id] && this.canSee(p[t])) {
            y.send(p[t].id, "K", this.sid, e ? 1 : 0, this.weaponIndex);
          }
        }
      };
      this.animate = function (e) {
        if (this.animTime <= 0) {
          this.dirPlus = 0;
        } else {
          this.animTime -= e;
          if (this.animTime <= 0 || !this.animSpeed) {
            this.animTime = 0;
            this.dirPlus = 0;
            return;
          }
          var t = this.animSpeed > 0 ? this.animSpeed : 1;
          var n = 1 - this.animTime / t;
          this.dirPlus = this.targetAngle * function (e) {
            var t = typeof c.hitReturnRatio == "number" ? c.hitReturnRatio : 0.5;
            var n = typeof c.hitEaseOutPower == "number" ? c.hitEaseOutPower : 1;
            var i = typeof c.hitEaseInPower == "number" ? c.hitEaseInPower : 1;
            e = Math.max(0, Math.min(1, e));
            if ((t = Math.max(0, Math.min(1, t))) <= 0) {
              return 1 - u.easeInPower(e, i);
            }
            if (t >= 1) {
              return u.easeOutPower(e, n);
            }
            if (e <= t) {
              var r = e / t;
              return u.easeOutPower(r, n);
            }
            var a = (e - t) / (1 - t);
            return 1 - u.easeInPower(a, i);
          }(n);
        }
      };
      this.startAnim = function (e, t) {
        var n;
        this.animTime = this.animSpeed = f.weapons[t].speed;
        var i = T(c.hitAngle);
        var r = i ? Math.max(0, Math.abs(c.hitAngle)) : Math.PI / 2;
        n = T(c.missHitAngle) ? Math.max(0, Math.abs(c.missHitAngle)) : i ? r : Math.PI;
        var a = e ? r : n;
        this.targetAngle = -a;
      };
      this.canSee = function (t) {
        if (!t) {
          return false;
        }
        if (t.skin && t.skin.invisTimer && t.noMovTimer >= t.skin.invisTimer) {
          return false;
        }
        var n = e(t.x - this.x) - t.scale;
        var i = e(t.y - this.y) - t.scale;
        return n <= c.maxScreenWidth / 2 * 1.3 && i <= c.maxScreenHeight / 2 * 1.3;
      };
    };
  }();
  var Es = Si ? ki : (Si = 1, wi || (wi = 1, Bi.hats = [{
    id: 1001,
    name: "Booster Hat",
    description: "increases your movement speed",
    price: 6000,
    spriteScale: 130,
    moveSpeedMultiplier: 1.16
  }, {
    id: 1002,
    name: "Knight Hat",
    description: "Balanced martial helm that trades a little speed for stout defenses and stronger strikes.",
    price: 14000,
    spriteScale: 130,
    moveSpeedMultiplier: 0.92,
    incomingDamageMultiplier: 0.75
  }, {
    id: 1003,
    name: "Clown Hat",
    description: "A humiliating jester cap issued by the server.",
    price: 999999,
    spriteScale: 130,
    dontSell: true,
    serverOnly: true
  }, {
    id: 1004,
    name: "Samurai Gear",
    description: "Refined samurai plating that improves attack cadence and precision damage.",
    price: 17000,
    spriteScale: 130,
    moveSpeedMultiplier: 1.02,
    outgoingDamageMultiplier: 0.8,
    attackCooldownMultiplier: 0.9
  }, {
    id: 1005,
    name: "Mutant Hat",
    description: "Aberrant horned helm similar to the bull helmet: massive power with a health drain.",
    price: 18000,
    spriteScale: 130,
    outgoingDamageMultiplier: 1.25,
    healthRegenRate: -5
  }, {
    id: 1006,
    name: "Tank Gear",
    description: "Advanced siege gear modeled after classic tank armor with brutal structure damage.",
    price: 20000,
    spriteScale: 130,
    moveSpeedMultiplier: 0.28,
    incomingDamageMultiplier: 0.85,
    structureDamageMultiplier: 2
  }, {
    id: 1007,
    name: "Tuff Hat",
    description: "lorem ipsum gives more health",
    price: 20000,
    spriteScale: 140,
    extraHealth: 650
  }, {
    id: 1008,
    name: "Shark Hat",
    description: "Predatory headgear that shrugs off river currents and boosts damage in water.",
    price: 20000,
    spriteScale: 130,
    watrImm: true,
    waterCurrentMultiplier: 0.05,
    waterDamageMultiplier: 1.2
  }, {
    id: 1009,
    name: "Spike Hat",
    description: "Spiked cap that reflects 25% of melee damage back at attackers.",
    price: 20000,
    spriteScale: 130,
    reflectionDamageMultiplier: 0.25
  }].map((e, t) => {
    const n = Object.assign({}, e, {
      id: typeof e.id == "number" ? e.id : t
    });
    n.desc = e.description;
    n.scale = e.spriteScale;
    n.spdMult = e.moveSpeedMultiplier;
    n.dmgMult = e.incomingDamageMultiplier;
    n.dmgMultO = e.outgoingDamageMultiplier;
    n.bDmg = e.structureDamageMultiplier;
    n.healD = e.lifeStealMultiplier;
    n.healthRegen = e.healthRegenRate;
    n.atkSpd = e.attackCooldownMultiplier;
    n.dmg = e.reflectionDamageMultiplier;
    n.dmgK = e.knockbackOnDamage;
    return n;
  }), Bi.accessories = []), ki = Bi);
  var Ps = Ii ? xi : (Ii = 1, xi = function () {
    this.init = function (e, t, n, i, r, a, s, o, l) {
      this.active = true;
      this.indx = e;
      this.x = t;
      this.y = n;
      this.dir = i;
      this.skipMov = true;
      this.speed = r;
      this.dmg = a;
      this.scale = o;
      this.range = s;
      this.owner = l;
    };
    this.update = function (e) {
      if (this.active) {
        var t = this.speed * e;
        if (this.skipMov) {
          this.skipMov = false;
        } else {
          this.x += t * Math.cos(this.dir);
          this.y += t * Math.sin(this.dir);
          this.range -= t;
          if (this.range <= 0) {
            this.x += this.range * Math.cos(this.dir);
            this.y += this.range * Math.sin(this.dir);
            t = 1;
            this.range = 0;
            this.active = false;
          }
        }
      }
    };
  });
  var Ts = Ei ? Mi : (Ei = 1, Mi = function (e, t, n) {
    this.addProjectile = function (i, r, a, s, o, l, c, u, d, h) {
      var p;
      var m = n.projectiles[l];
      var f = typeof h == "number" ? h : m.dmg;
      for (var g = 0; g < t.length; ++g) {
        if (!t[g].active) {
          p = t[g];
          break;
        }
      }
      if (!p) {
        (p = new e()).sid = t.length;
        t.push(p);
      }
      p.init(l, i, r, a, o, f, s, m.scale, c);
      p.ignoreObj = u;
      p.layer = d || m.layer;
      p.src = m.src;
      return p;
    };
  });
  var As = new Ka.TextManager();
  var Cs = new La({
    config: Ja,
    itemsData: xs,
    documentRef: document
  });
  var _s = new Oa({
    config: Ja,
    biomeHelper: ns,
    biomeBands: as,
    colors: rs,
    mapScale: is,
    snowRegions: ws
  });
  var Rs = new Da({
    biomeHelper: ns,
    riverSettings: ss,
    colors: rs,
    mapScale: is
  });
  var Bs = function () {
    if (Ti) {
      return Pi;
    }
    Ti = 1;
    var e = ["/img/accessories/access_1.png", "/img/accessories/access_2.png", "/img/accessories/access_3.png", "/img/accessories/access_4.png", "/img/accessories/access_5.png", "/img/accessories/access_6.png", "/img/accessories/access_7.png", "/img/accessories/access_8.png", "/img/accessories/access_9.png", "/img/accessories/access_10.png", "/img/accessories/access_11.png", "/img/accessories/access_12.png", "/img/accessories/access_13.png", "/img/accessories/access_14.png", "/img/accessories/access_15.png", "/img/accessories/access_16.png", "/img/accessories/access_17.png", "/img/accessories/access_18.png", "/img/accessories/access_19.png", "/img/accessories/access_20.png", "/img/accessories/access_21.png", "/img/animals/arcticfox_1.png", "/img/animals/bull_1.png", "/img/animals/bull_2.png", "/img/animals/chicken_1.png", "/img/animals/cow_1.png", "/img/animals/crate_1.png", "/img/animals/deer.png", "/img/animals/duck_1.png", "/img/animals/enemy.png", "/img/animals/fish_1.png", "/img/animals/fox_1.png", "/img/animals/pig_1.png", "/img/animals/sheep_1.png", "/img/animals/sid.png", "/img/animals/skull_1.png", "/img/animals/vince.png", "/img/animals/wolf_1.png", "/img/animals/wolf_1_old.png", "/img/animals/wolf_2.png", "/img/animals/wolf_3.png", "/img/christmas/default.png", "/img/christmas/particles/particle_1.png", "/img/christmas/particles/particle_2.png", "/img/christmas/particles/particle_3.png", "/img/christmas/particles/particle_4.png", "/img/christmas/present.png", "/img/hats/hat_1.png", "/img/hats/hat_2.png", "/img/hats/hat_4.png", "/img/hats/hat_5.png", "/img/hats/hat_6.png", "/img/hats/hat_7.png", "/img/hats/hat_8.png", "/img/hats/hat_9.png", "/img/hats/hat_10.png", "/img/hats/hat_11.png", "/img/hats/hat_11_p.png", "/img/hats/hat_11_top.png", "/img/hats/hat_12.png", "/img/hats/hat_13.png", "/img/hats/hat_14.png", "/img/hats/hat_14_p.png", "/img/hats/hat_14_top.png", "/img/hats/hat_15.png", "/img/hats/hat_18.png", "/img/hats/hat_20.png", "/img/hats/hat_21.png", "/img/hats/hat_22.png", "/img/hats/hat_23.png", "/img/hats/hat_26.png", "/img/hats/hat_27.png", "/img/hats/hat_28.png", "/img/hats/hat_29.png", "/img/hats/hat_30.png", "/img/hats/hat_31.png", "/img/hats/hat_32.png", "/img/hats/hat_35.png", "/img/hats/hat_36.png", "/img/hats/hat_37.png", "/img/hats/hat_38.png", "/img/hats/hat_40.png", "/img/hats/hat_42.png", "/img/hats/hat_43.png", "/img/hats/hat_44.png", "/img/hats/hat_45.png", "/img/hats/hat_46.png", "/img/hats/hat_48.png", "/img/hats/hat_49.png", "/img/hats/hat_50.png", "/img/hats/hat_51.png", "/img/hats/hat_52.png", "/img/hats/hat_53.png", "/img/hats/hat_53_p.png", "/img/hats/hat_53_top.png", "/img/hats/hat_55.png", "/img/hats/hat_56.png", "/img/hats/hat_57.png", "/img/hats/hat_58.png", "/img/hats/hat_69.png", "/img/hats/hat_1001.png", "/img/hats/hat_1001_shadow.png", "/img/hats/hat_1002.png", "/img/hats/hat_1002_shadow.png", "/img/hats/hat_1003.png", "/img/hats/hat_1003_shadow.png", "/img/hats/hat_1004.png", "/img/hats/hat_1004_shadow.png", "/img/hats/hat_1005.png", "/img/hats/hat_1005_shadow.png", "/img/hats/hat_1006.png", "/img/hats/hat_1006_shadow.png", "/img/hats/hat_1007.png", "/img/hats/hat_1008.png", "/img/hats/hat_1009.png", "/img/icons/crown.png", "/img/icons/skull.png", "/img/icons/skull_1.png", "/img/icons/skull_2.png", "/img/icons/skull_3.png", "/img/icons/skull_4.png", "/img/icons/skull_5.png", "/img/items/apple.png", "/img/items/boost_pad.png", "/img/items/cheese.svg", "/img/items/cookie_1.png", "/img/items/greater_spikes.png", "/img/items/healing_pad.png", "/img/items/mill_1.png", "/img/items/mill_2.png", "/img/items/mill_complete.png", "/img/items/mine.png", "/img/items/platform.png", "/img/items/sapling.png", "/img/items/spawn_pad.png", "/img/items/spikes.png", "/img/items/spinning_spikes.png", "/img/items/stone_wall.png", "/img/items/teleporter.png", "/img/items/trap.png", "/img/items/wood_wall.png", "/img/missing_texture.png", "/img/player/player_1.png", "/img/newweapons/arrow_1.png", "/img/newweapons/axe_1.png", "/img/newweapons/axe_1_d.png", "/img/newweapons/axe_1_g.png", "/img/newweapons/bat_1.png", "/img/newweapons/bat_1_d.png", "/img/newweapons/bat_1_g.png", "/img/newweapons/bow_1.png", "/img/newweapons/bow_1_d.png", "/img/newweapons/bow_1_g.png", "/img/newweapons/crossbow_1.png", "/img/newweapons/crossbow_1_d.png", "/img/newweapons/crossbow_1_g.png", "/img/newweapons/daggers_1_g.png", "/img/newweapons/great_axe_1.png", "/img/newweapons/great_axe_1_d.png", "/img/newweapons/great_hammer_1.png", "/img/newweapons/great_hammer_1_d.png", "/img/newweapons/great_hammer_1_g.png", "/img/newweapons/hammer_1.png", "/img/newweapons/hammer_1_d.png", "/img/newweapons/hammer_1_g.png", "/img/newweapons/mace_1_g.png", "/img/newweapons/samurai_1.png", "/img/newweapons/samurai_1_d.png", "/img/newweapons/samurai_1_g.png", "/img/newweapons/shield_1.png", "/img/newweapons/shield_1_d.png", "/img/newweapons/shield_1_g.png", "/img/newweapons/spear_1.png", "/img/newweapons/spear_1_d.png", "/img/newweapons/spear_1_g.png", "/img/newweapons/stick_1.png", "/img/newweapons/stick_1_g.png", "/img/newweapons/sword_1.png", "/img/newweapons/sword_1_d.png", "/img/newweapons/sword_1_g.png", "/img/resources/food_ico.png", "/img/resources/gold_ico.png", "/img/resources/stone_ico.png", "/img/resources/wood_ico.png", "/img/world/automntree_1.png", "/img/world/automntree_1_d.png", "/img/world/bush_1.png", "/img/world/bush_1_d.png", "/img/world/darkstone_1.png", "/img/world/darkstone_1_d.png", "/img/world/decors/fllower_0.png", "/img/world/decors/flower_0.png", "/img/world/decors/particle_0.png", "/img/world/gold_1.png", "/img/world/gold_1_d.png", "/img/world/palmtree_1.png", "/img/world/palmtree_1_d.png", "/img/world/sakurabush_1.png", "/img/world/sakurabush_1_d.png", "/img/world/sakuratree_1.png", "/img/world/sakuratree_1_d.png", "/img/world/stone_1.png", "/img/world/stone_1_d.png", "/img/world/tree_1.png", "/img/world/tree_1_d.png", "/img/world/wintertree_1.png", "/img/world/wintertree_1_d.png", "/ui/allienceButton.png", "/ui/inventorySlot.png", "/ui/mapBorder.png", "/ui/settingsButton.png", "/ui/storeButton.png"];
    return Pi = function (t) {
      return new Promise(function (n) {
        var i = e.length;
        var r = 0;
        function a() {
          r++;
          if (t) {
            t(r, i);
          }
          if (r >= i) {
            n();
          }
        }
        e.forEach(function (e) {
          var t = new Image();
          t.onload = a;
          t.onerror = a;
          t.src = e;
        });
      });
    };
  }();
  window.onload = function () {
    var e = document.getElementById("preloadFill");
    var t = document.getElementById("preloadBar");
    Bs(function (t, n) {
      if (e) {
        e.style.width = Math.round(t / n * 100) + "%";
      }
    }).then(function () {
      if (t) {
        t.style.display = "none";
      }
      (function () {
        if (!To) {
          var e;
          var t;
          var n;
          To = true;
          if (!Zr && !Ao) {
            Ao = true;
            if (qc) {
              qc.addEventListener("change", function () {
                Tu();
              });
            }
            if (Kc) {
              Kc.addEventListener("change", function () {
                Tu();
              });
            }
            if ($l) {
              qa.hookTouchEvents($l);
              $l.onclick = qa.checkTrusted(function () {
                Bh();
                Xh();
              });
            }
            if (ec) {
              qa.hookTouchEvents(ec);
              ec.onclick = qa.checkTrusted(function () {
                var e;
                window.location.assign(vu(e = _u(bo), e && e.spectatePath ? e.spectatePath : "/spectate", "/spectate"));
              });
            }
            if (tc) {
              if (!ic) {
                tc.onclick = qa.checkTrusted(function () {
                  vd();
                });
              }
              qa.hookTouchEvents(tc);
            }
            if (sc) {
              sc.onclick = qa.checkTrusted(function () {
                vd();
              });
              qa.hookTouchEvents(sc);
            }
            if (ac) {
              ac.onclick = qa.checkTrusted(function () {
                vd();
              });
              qa.hookTouchEvents(ac);
            }
            if (oc) {
              if (Ja.botMode) {
                oc.style.display = "none";
              } else {
                oc.onclick = qa.checkTrusted(function () {
                  if (!Ja.botMode) {
                    if (ru && ru.style.display === "block") {
                      fd.hide();
                    } else {
                      fd.show();
                    }
                  }
                });
                qa.hookTouchEvents(oc);
              }
            }
            if (lc) {
              lc.onclick = qa.checkTrusted(function () {
                gd();
              });
              qa.hookTouchEvents(lc);
            }
            if (qa.isMobile()) {
              if (cc) {
                cc.onclick = qa.checkTrusted(function () {
                  bh();
                });
                qa.hookTouchEvents(cc);
              }
            } else if (cc && cc.parentNode) {
              cc.parentNode.removeChild(cc);
            }
            if (Za) {
              (function () {
                if (id.length && rd.length) {
                  var e = function (e) {
                    jd(e);
                  };
                  id.forEach(function (t) {
                    var n = t.dataset.target;
                    t.onclick = qa.checkTrusted(function () {
                      e(n);
                    });
                    qa.hookTouchEvents(t);
                  });
                  var t = id[0] && id[0].dataset.target || null;
                  if (t) {
                    e(t);
                  }
                }
              })();
              (function () {
                var e = Object.create(null);
                var t = [];
                if (yl && typeof yl == "object") {
                  Object.keys(yl).forEach(function (n) {
                    if (!e[n]) {
                      e[n] = true;
                      t.push({
                        id: isNaN(Number(n)) ? n : Number(n),
                        label: String(n),
                        imgSrc: yl[n]
                      });
                    }
                  });
                }
                for (var n = 0; n < gl.length; ++n) {
                  var i = gl[n];
                  if (i && i.id !== undefined && i.id !== null) {
                    var r = String(i.id);
                    if (!e[r]) {
                      var a = i.imgSrc || yl[i.id];
                      if (a) {
                        e[r] = true;
                        t.push({
                          id: i.id,
                          label: r,
                          imgSrc: a,
                          size: i.size,
                          rotation: i.rotation
                        });
                      }
                    }
                  }
                }
                bl = t;
              })();
              if (Xu) {
                Xu.innerHTML = "";
                bl.forEach(function (e) {
                  var t = document.createElement("option");
                  t.value = String(e.id);
                  t.textContent = e.label;
                  Xu.appendChild(t);
                });
                if (bl.length) {
                  wl = bl[0].id;
                  Xu.value = String(wl);
                }
                Xu.onchange = function (e) {
                  wl = function (e) {
                    if (e == null) {
                      return null;
                    }
                    if (typeof e == "number") {
                      return e;
                    }
                    var t = Number(e);
                    if (!isNaN(t) && e.trim && e.trim() === t.toString()) {
                      return t;
                    } else {
                      return e;
                    }
                  }(e.target.value);
                  Vd();
                };
              }
              if (qu) {
                qu.onchange = function () {
                  Xd(qu.checked);
                };
              }
              if (Ku) {
                Ku.oninput = function () {
                  xl = Gd();
                };
              }
              if (Ju) {
                Ju.oninput = function () {
                  Sl = Yd();
                };
              }
              if (Zu) {
                Zu.onclick = qa.checkTrusted(function () {
                  eh();
                });
                qa.hookTouchEvents(Zu);
              }
              Vd();
              t = [{
                id: "tree",
                label: "Tree",
                type: 0,
                spritePath: ".././img/world/tree_1.png",
                size: (e = Ja.world || {}).treeScales && e.treeScales[0] || 120
              }, {
                id: "bush",
                label: "Bush",
                type: 1,
                spritePath: ".././img/world/bush_1.png",
                size: e.bushScales && e.bushScales[0] || 90
              }, {
                id: "rock",
                label: "Stone",
                type: 2,
                spritePath: ".././img/world/stone_1.png",
                size: e.rockScales && e.rockScales[0] || 95
              }, {
                id: "gold",
                label: "Gold",
                type: 3,
                spritePath: ".././img/world/gold_1.png",
                size: e.goldScales && e.goldScales[0] || 120
              }, {
                id: "palm",
                label: "Palm Tree",
                type: 0,
                spritePath: ".././img/world/palmtree_1.png",
                size: e.palmTreeScales && e.palmTreeScales[0] || 170,
                data: {
                  id: e.palmTreeId || 1000,
                  palm: true,
                  name: "palm",
                  isItem: false,
                  spritePath: ".././img/world/palmtree_1.png",
                  randomRotation: true
                }
              }, {
                id: "darkstone",
                label: "Dark Stone",
                type: 2,
                spritePath: ".././img/world/darkstone_1.png",
                size: e.darkStoneScales && e.darkStoneScales[0] || 110,
                data: {
                  id: e.darkStoneId || 1001,
                  darkStone: true,
                  name: "darkstone",
                  isItem: false,
                  spritePath: ".././img/world/darkstone_1.png"
                }
              }, {
                id: "sakura_bush",
                label: "Sakura Bush",
                type: 1,
                spritePath: ".././img/world/sakurabush_1.png",
                size: e.sakuraBushScales && e.sakuraBushScales[0] || 90,
                data: {
                  id: e.sakuraBushId || 1002,
                  sakura: true,
                  name: "sakura-bush",
                  isItem: false,
                  spritePath: ".././img/world/sakurabush_1.png"
                }
              }, {
                id: "sakura_tree",
                label: "Sakura Tree",
                type: 0,
                spritePath: ".././img/world/sakuratree_1.png",
                size: e.sakuraTreeScales && e.sakuraTreeScales[0] || 170,
                data: {
                  id: e.sakuraTreeId || 1003,
                  sakura: true,
                  name: "sakura-tree",
                  isItem: false,
                  spritePath: ".././img/world/sakuratree_1.png",
                  randomRotation: true
                }
              }, {
                id: "autumn_tree",
                label: "Autumn Tree",
                type: 0,
                spritePath: ".././img/world/automntree_1.png",
                size: e.autumnTreeScales && e.autumnTreeScales[0] || 170,
                data: {
                  id: e.autumnTreeId || 1004,
                  autumn: true,
                  name: "autumn-tree",
                  isItem: false,
                  spritePath: ".././img/world/automntree_1.png",
                  randomRotation: true
                }
              }, {
                id: "winter_tree",
                label: "Winter Tree",
                type: 0,
                spritePath: ".././img/world/wintertree_1.png",
                size: e.winterTreeScales && e.winterTreeScales[0] || 170,
                data: {
                  id: e.winterTreeId || 1005,
                  winter: true,
                  name: "winter-tree",
                  isItem: false,
                  spritePath: ".././img/world/wintertree_1.png",
                  randomRotation: true
                }
              }];
              Il = t.slice();
              if (Qu) {
                Qu.innerHTML = "";
                Il.forEach(function (e) {
                  var t = document.createElement("option");
                  t.value = String(e.id);
                  t.textContent = e.label;
                  Qu.appendChild(t);
                });
                if (Il.length) {
                  Ml = Il[0].id;
                  Qu.value = String(Ml);
                }
                Qu.onchange = function (e) {
                  Ml = e.target.value;
                  Rd();
                };
              }
              if ($u) {
                $u.onchange = function () {
                  Od($u.checked);
                };
              }
              if (ed) {
                ed.oninput = function () {
                  Tl = Bd();
                };
              }
              if (td) {
                td.oninput = function () {
                  Pl = Ld();
                };
              }
              if (nd) {
                nd.onclick = qa.checkTrusted(function () {
                  Hd();
                });
                qa.hookTouchEvents(nd);
              }
              Rd();
              window.addEventListener("keydown", qa.checkTrusted(th));
            }
            if (ou) {
              ou.onclick = qa.checkTrusted(function () {
                Uh();
              });
              qa.hookTouchEvents(ou);
            }
          }
          (function () {
            for (var e = 0; e < op.length; ++e) {
              var t = ks();
              t.onload = function () {
                this.isLoaded = true;
              };
              t.src = ".././img/icons/" + op[e] + ".png";
              sp[op[e]] = t;
            }
          })();
          if (Zr) {
            if (Ac) {
              Ac.style.display = "none";
            }
            $h();
            (function () {
              if (Zr && !Km) {
                var e;
                Km = true;
                var t = (e = no("show_grid")) == null || e === "true";
                jo.showGrid = t;
                if (yc) {
                  yc.checked = t;
                  yc.addEventListener("change", function () {
                    var e = !!yc.checked;
                    jo.showGrid = e;
                    to("show_grid", e ? "true" : "false");
                  });
                }
              }
            })();
            if (Zr) {
              if (gh) {
                gh.maxLength = Mh;
                gh.setAttribute("maxlength", String(Mh));
              }
              if (!Zl) {
                Zl = true;
                window.addEventListener("keydown", qa.checkTrusted(function (e) {
                  if ((e.which || e.keyCode || 0) === 13) {
                    e.preventDefault();
                    bh();
                  }
                }));
              }
              Gl ||= ea(Qr);
              Ul ||= new $r({
                documentRef: document,
                onSelect: Zm,
                onRefresh: Jm
              });
              if (Zr && !el && _c) {
                (el = new Ra({
                  actionBar: _c,
                  itemsData: xs,
                  config: Ja,
                  utils: qa,
                  showItemInfo: function () {},
                  selectToBuild: function () {},
                  getItemSprite: cm,
                  toolSprites: Cp,
                  documentRef: document,
                  placeableRenderer: Cs
                })).buildActionBar();
                el.updatePlayerItems({
                  items: [],
                  weapons: []
                });
              }
              (function () {
                if (Zr) {
                  var e = "Hidden";
                  if (Rc) {
                    Rc.innerText = "0";
                  }
                  if (Bc) {
                    Bc.innerText = e;
                  }
                  if (Lc) {
                    Lc.innerText = e;
                  }
                  if (Oc) {
                    Oc.innerText = e;
                  }
                  if (eu) {
                    eu.innerText = e;
                  }
                  if (tu) {
                    tu.style.width = "0%";
                  }
                }
              })();
              rf(false);
              if (Wc && Rc) {
                Wc.appendChild(Rc);
              }
              if (Uc && Dc) {
                Uc.appendChild(Dc);
              }
              if (zc) {
                zc.onclick = function () {
                  qm(-1);
                };
              }
              if (Vc) {
                Vc.onclick = function () {
                  qm(1);
                };
              }
              if (Gc) {
                Gc.value = String(Math.round(jl * 100));
                Gc.addEventListener("input", function (e) {
                  var t;
                  var n = Number(e && e.target ? e.target.value : Gc.value);
                  if (isFinite(n)) {
                    t = Number(n / 100);
                    if (isFinite(t)) {
                      jl = Math.min(Vl, Math.max(zl, t));
                      Ch();
                    }
                  }
                });
              }
              if (Cc) {
                Cc.style.display = "block";
              }
              Ul.setStatus("Connecting...");
              Xm();
              Jm();
            }
            Hm();
            return;
          }
          if (Ac) {
            Ac.style.display = "none";
          }
          if (Pc) {
            Pc.style.display = "flex";
          }
          if (Jc) {
            Pu("Loading");
            if (Mo) {
              clearInterval(Mo);
              Mo = null;
            }
            if (Jc && !Zr) {
              Mo = setInterval(function () {
                Au();
              }, mo);
            }
          }
          if (Zc) {
            Zc.value = no("moo_name") || "";
          }
          if (!$o) {
            ($o = new Wa({
              documentRef: document,
              windowRef: window,
              nameInput: Zc,
              saveValue: to
            })).init();
          }
          Su();
          var i = za({
            documentRef: document,
            windowRef: window,
            uiSettings: jo,
            config: Ja,
            items: xs,
            actionBarElement: _c,
            toolSprites: Cp,
            placeableRenderer: Cs,
            storeController: ud,
            utils: qa,
            itemInfoPanel: ld,
            selectToBuild: Yh,
            getItemSprite: cm,
            getSavedValue: no,
            saveValue: to,
            setUseNativeResolution: pd,
            updatePerformancePanelVisibility: jm,
            updatePerfOverlayVisibility: zm,
            nameInput: Zc,
            checkboxElements: {
              nativeResolution: hc,
              lowDetailMode: pc,
              showPing: fc,
              showPerfOverlay: gc,
              showGrid: yc,
              disableStoreSpaceScroll: vc,
              allowMovementInAllianceMenu: bc,
              hidePlayerNames: wc,
              hidePlayerStats: kc,
              extremePerformanceMode: mc
            },
            skinColorHolder: cu,
            keybindsListItems: xc,
            keybindsListMovement: Ic,
            keybindsListActions: Mc,
            settingsElements: {
              guideCard: Tc,
              settingsModal: ic,
              settingsButton: tc,
              settingsButtonTitle: nc,
              closeSettingsButton: rc,
              enterGameButton: $l
            },
            onMovementHotkeysChanged: Hh,
            onStoreScrollPreferenceChanged: Wu
          });
          Qo = i.settingsMenu;
          zo = i.hotkeySettings;
          el = i.actionBarUI;
          n = Co(no(ao));
          jo.spectateTextFilter = n;
          if (Sc) {
            Sc.value = n;
            Sc.addEventListener("change", qa.checkTrusted(function () {
              var e = Co(Sc.value);
              Sc.value = e;
              jo.spectateTextFilter = e;
              to(ao, e);
              (function () {
                for (var e = 0; e < sl.length; ++e) {
                  var t = sl[e];
                  if (t && t.spectateChats && t.spectateChats.length) {
                    if (!Th(t)) {
                      t.spectateChats.length = 0;
                    }
                  }
                }
              })();
            }));
          }
          tl = new Ua({
            windowRef: window,
            utils: qa,
            hotkeySettings: zo,
            uiSettings: {
              allowMovementInAllianceMenu: jo.allowMovementInAllianceMenu,
              disableStoreSpaceScroll: jo.disableStoreSpaceScroll
            },
            chatHolder: yh,
            storeMenu: du,
            allianceMenu: ru,
            isSettingsOpen: function () {
              return !!ic && !!ic.classList.contains("active");
            },
            getPlayer: function () {
              return Do || null;
            },
            itemsData: xs,
            callbacks: {
              hideAllWindows: hd,
              selectToBuild: function (e, t, n) {
                Yh(e, t);
              },
              sendAutoGather: Gh,
              updateMapMarker: mh,
              sendLockDir: Wh,
              toggleStoreMenu: gd,
              sendMoveDir: Vh,
              sendMapPing: Uh,
              startAttackFromKey: function () {
                Oo = 0;
                Lo = 1;
                jh();
                Vm();
              },
              stopAttackFromKey: function () {
                Oo = 0;
                Lo = 0;
                jh();
              },
              toggleChat: bh
            }
          });
          if (nl) {
            tl.updateMovementHotkeys(nl);
          }
          Hm();
        }
      })();
      Lu(Ru());
      Du();
      Cd("Connecting to " + wo.name + "...", {
        withReload: false,
        keepMenuVisible: true
      });
      (typeof fetch != "function" ? Promise.resolve(null) : fetch("/serverData?ts=" + Date.now(), {
        cache: "no-store"
      }).then(function (e) {
        if (!e.ok) {
          throw new Error("Failed to load server registry");
        }
        return e.text();
      }).then(function (e) {
        var t = JSON.parse(e);
        return function (e) {
          for (var t = Array.isArray(e) && e.length ? e : go, n = Object.create(null), i = [], r = 0; r < t.length; ++r) {
            var a = Cu(t[r], "server" + (r + 1));
            if (a && !n[a.key]) {
              n[a.key] = true;
              i.push(a);
            }
          }
          if (i.length) {
            return i;
          } else {
            return go.slice();
          }
        }(t && t.servers);
      }).catch(function () {
        return null;
      })).then(function (e) {
        if (e && e.length) {
          yo = e;
        }
        Lu(Ru());
        Du();
        return ju();
      }).finally(function () {
        zu();
        Ys();
      });
    });
  };
  var Ls = false;
  var Os = null;
  var Ds = null;
  var Ns = 0;
  var Fs = false;
  var Hs = null;
  var js = "";
  var zs = 5;
  var Vs = 10000;
  function Ws() {
    if (xo) {
      clearInterval(xo);
      xo = null;
    }
  }
  function Us() {
    if (Ds) {
      clearInterval(Ds);
      Ds = null;
    }
  }
  function Gs() {
    if (Os) {
      clearTimeout(Os);
      Os = null;
    }
    Us();
    Ns = 0;
  }
  function Ys(e) {
    var t;
    var n;
    var i;
    var r;
    if (!So && (!Ls || !!e)) {
      n = _u(bo);
      i = Zr ? n && n.spectatePath ? n.spectatePath : "/spectate" : n && n.websocketPath ? n.websocketPath : "/ws";
      (r = new URL(vu(n, i, Zr ? "/spectate" : "/ws"))).protocol = r.protocol === "https:" ? "wss:" : "ws:";
      t = r.toString();
      So = true;
      Ls = false;
      Du();
      Qr.connect(t, function (e) {
        So = false;
        if (e) {
          Ws();
          Ad(e);
        } else {
          Gs();
          if (Zr && Hs !== null) {
            ql = Hs;
            Xl = js || "";
          }
          Ls = true;
          if (xo) {
            clearInterval(xo);
            xo = null;
          }
          Um();
          xo = setInterval(function () {
            if (Zs()) {
              Um();
            }
          }, 2500);
          if (Ac) {
            Ac.style.display = "none";
          }
          Du();
          if (ko) {
            ko = false;
            Xh();
          }
        }
      });
    }
  }
  var Xs;
  var qs = new Ia({
    sendCommand: function (e) {
      xa(e);
    }
  });
  var Ks = null;
  var Js = null;
  function Zs() {
    return Qr.connected;
  }
  qs.on("state", function () {
    if (qs.isStaff()) {
      Ks ||= new Ma(qs);
      if (!Js && gh) {
        Js = new Ea(qs, gh);
      }
      if (gh) {
        gh.maxLength = 240;
      }
    }
  });
  Qr.onPacket(function (e) {
    var t = Array.prototype.slice.call(arguments, 1);
    switch (e) {
      case Xa.INIT_DATA:
        Id.apply(undefined, t);
        break;
      case Xa.DISCONNECT:
        Ad.apply(undefined, t);
        break;
      case Xa.SETUP_GAME:
        Qh.apply(undefined, t);
        break;
      case Xa.ADD_PLAYER:
        Im.apply(undefined, t);
        break;
      case Xa.REMOVE_PLAYER:
        Mm.apply(undefined, t);
        break;
      case Xa.UPDATE_PLAYERS:
        Am.apply(undefined, t);
        break;
      case Xa.UPDATE_LEADERBOARD:
        up.apply(undefined, t);
        break;
      case Xa.LOAD_GAME_OBJECT:
        dm.apply(undefined, t);
        break;
      case Xa.LOAD_ANIMALS:
        bm.apply(undefined, t);
        break;
      case Xa.ANIMATE_ANIMAL:
        ym.apply(undefined, t);
        break;
      case Xa.GATHER_ANIMATION:
        kp.apply(undefined, t);
        break;
      case Xa.WIGGLE_GAME_OBJECT:
        pm.apply(undefined, t);
        break;
      case Xa.SHOOT_TURRET:
        mm.apply(undefined, t);
        break;
      case Xa.UPDATE_PLAYER_VALUE:
        Pm.apply(undefined, t);
        break;
      case Xa.UPDATE_HEALTH:
        Tm.apply(undefined, t);
        break;
      case Xa.KILL_PLAYER:
        np.apply(undefined, t);
        break;
      case Xa.KILL_OBJECT:
        rp.apply(undefined, t);
        break;
      case Xa.KILL_OBJECTS:
        ip.apply(undefined, t);
        break;
      case Xa.UPDATE_ITEM_COUNTS:
        Em.apply(undefined, t);
        break;
      case Xa.UPDATE_AGE:
        cp.apply(undefined, t);
        break;
      case Xa.UPDATE_UPGRADES:
        lp.apply(undefined, t);
        break;
      case Xa.UPDATE_ITEMS:
        bd.apply(undefined, t);
        break;
      case Xa.ADD_PROJECTILE:
        fm.apply(undefined, t);
        break;
      case Xa.REMOVE_PROJECTILE:
        gm.apply(undefined, t);
        break;
      case Xa.SERVER_SHUTDOWN_NOTICE:
        af.apply(undefined, t);
        break;
      case Xa.ADD_ALLIANCE:
        oh.apply(undefined, t);
        break;
      case Xa.DELETE_ALLIANCE:
        uh.apply(undefined, t);
        break;
      case Xa.ALLIANCE_NOTIFICATION:
        ah.apply(undefined, t);
        break;
      case Xa.SET_PLAYER_TEAM:
        lh.apply(undefined, t);
        break;
      case Xa.SET_ALLIANCE_PLAYERS:
        ch.apply(undefined, t);
        break;
      case Xa.UPDATE_STORE_ITEMS:
        yd.apply(undefined, t);
        break;
      case Xa.RECEIVE_CHAT:
        Sh.apply(undefined, t);
        break;
      case Xa.UPDATE_MINIMAP:
        fh.apply(undefined, t);
        break;
      case Xa.SHOW_TEXT:
        ep.apply(undefined, t);
        break;
      case Xa.PING_MAP:
        ph.apply(undefined, t);
        break;
      case Xa.PING_SOCKET_RESPONSE:
        Wm.apply(undefined, t);
        break;
      case Xa.ONE_VS_ONE_STATE:
        Kh.apply(undefined, t);
        break;
      case Xa.ONE_VS_ONE_RESULT:
        Jh.apply(undefined, t);
        break;
      case Xa.SPECTATE_INIT:
        Qm.apply(undefined, t);
        break;
      case Xa.SPECTATE_LIST:
        $m.apply(undefined, t);
        break;
      case Xa.SPECTATE_TARGET:
        ef.apply(undefined, t);
        break;
      case Xa.SPECTATE_ERROR:
        tf.apply(undefined, t);
        break;
      case Xa.SPECTATE_WATCHERS:
        nf.apply(undefined, t);
        break;
      case Xa.SPECTATE_CHAT:
        Ah.apply(undefined, t);
        break;
      case Xa.ADMIN_STATE:
        qs.handleState.apply(qs, t);
        break;
      case Xa.ADMIN_FEED:
        qs.handleFeed.apply(qs, t);
        break;
      case Xa.ADMIN_RESULT:
        qs.handleResult.apply(qs, t);
    }
  });
  var Qs = Math.PI;
  var $s = Qs * 2;
  function eo(e, t, n) {
    var i = typeof e.dir == "number" && isFinite(e.dir) ? e.dir : t;
    var r = typeof e.d1 == "number" && isFinite(e.d1) ? e.d1 : i;
    var a = typeof e.d2 == "number" && isFinite(e.d2) ? e.d2 : r;
    var s = typeof e.t1 == "number" && isFinite(e.t1) ? e.t1 : null;
    var o = typeof e.t2 == "number" && isFinite(e.t2) ? e.t2 : null;
    if (s === null || o === null || o <= s) {
      return a;
    }
    var l = (n - s) / (o - s);
    if (isFinite(l)) {
      l = Math.max(0, Math.min(1, l));
      return Math.lerpAngle(a, r, l);
    } else {
      return a;
    }
  }
  function to(e, t) {
    if (Xs) {
      localStorage.setItem(e, t);
    }
  }
  function no(e) {
    if (Xs) {
      return localStorage.getItem(e);
    } else {
      return null;
    }
  }
  Math.lerpAngle = function (e, t, n) {
    if (Math.abs(t - e) > Qs) {
      if (e > t) {
        t += $s;
      } else {
        e += $s;
      }
    }
    var i = t + (e - t) * n;
    if (i >= 0 && i <= $s) {
      return i;
    } else {
      return i % $s;
    }
  };
  CanvasRenderingContext2D.prototype.roundRect = function (e, t, n, i, r) {
    let a = this;
    a.beginPath();
    a.moveTo(e + r, t);
    a.lineTo(e + n - r, t);
    a.quadraticCurveTo(e + n, t, e + n, t + r);
    a.lineTo(e + n, t + i - r);
    a.quadraticCurveTo(e + n, t + i, e + n - r, t + i);
    a.lineTo(e + r, t + i);
    a.quadraticCurveTo(e, t + i, e, t + i - r);
    a.lineTo(e, t + r);
    a.quadraticCurveTo(e, t, e + r, t);
    a.closePath();
  };
  if (typeof Storage != "undefined") {
    Xs = true;
  }
  var io = function () {
    var e;
    var t = no("moo_client_token");
    if (typeof t == "string" && t.length >= 16) {
      return t;
    }
    try {
      e = window.crypto.randomUUID().replace(/-/g, "");
    } catch (t) {
      e = Date.now().toString(36) + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    }
    to("moo_client_token", e);
    return e;
  }();
  var ro = null;
  try {
    Vr.load().then(function (e) {
      return e.get();
    }).then(function (e) {
      if (e && e.visitorId) {
        ro = e.visitorId;
      }
    }).catch(function () {});
  } catch (e) {}
  var ao = "spectate_text_filter";
  var so = "all";
  var oo = {
    SHOW_ALL: "all",
    HIDE_ALL: "none",
    HIDE_ENEMY: "enemy",
    HIDE_SELF: "self"
  };
  var lo = "server";
  var co = "mootopia_selected_server";
  var uo = "/api/leaderboard";
  var ho = 5;
  var po = 10;
  var mo = 60000;
  var fo = "sandbox";
  var go = [{
    key: "sandbox",
    name: "Sandbox",
    tag: "Live",
    description: "Current ruleset with sandbox mode enabled on mootopia.io/?server=sandbox.",
    origin: "https://mootopia.io",
    pingPath: "/ping?server=sandbox",
    websocketPath: "/ws?server=sandbox",
    spectatePath: "/spectate?server=sandbox",
    routeBasePath: "/",
    isDefault: true
  }, {
    key: "classic",
    name: "Classic",
    tag: "Classic",
    description: "Current ruleset with sandbox mode disabled on mootopia.io/?server=classic.",
    origin: "https://mootopia.io",
    pingPath: "/ping?server=classic",
    websocketPath: "/ws?server=classic",
    spectatePath: "/spectate?server=classic",
    routeBasePath: "/",
    isDefault: false
  }, {
    key: "dev",
    name: "Dev",
    tag: "Test",
    description: "Testing environment on mootopia.io/?server=dev.",
    origin: "https://mootopia.io",
    pingPath: "/ping?server=dev",
    websocketPath: "/ws?server=dev",
    spectatePath: "/spectate?server=dev",
    routeBasePath: "/",
    isDefault: false
  }, {
    key: "1vs1",
    name: "1v1",
    tag: "Duel",
    description: "Queue into isolated 1v1 matches and climb the win streak leaderboard.",
    origin: "https://mootopia.io",
    pingPath: "/ping?server=1vs1",
    websocketPath: "/ws?server=1vs1",
    spectatePath: "/spectate?server=1vs1",
    routeBasePath: "/",
    isDefault: false
  }];
  var yo = go.slice();
  var vo = Object.create(null);
  var bo = fo;
  var wo = go[0];
  var ko = false;
  var So = false;
  var xo = null;
  var Io = null;
  var Mo = null;
  var Eo = 0;
  var Po = {
    queued: false,
    inMatch: false,
    queueSize: 0,
    currentStreak: 0,
    bestStreak: 0,
    statusText: ""
  };
  var To = false;
  var Ao = false;
  function Co(e) {
    switch (e) {
      case oo.SHOW_ALL:
      case oo.HIDE_ALL:
      case oo.HIDE_ENEMY:
      case oo.HIDE_SELF:
        return e;
      default:
        return so;
    }
  }
  var _o;
  var Ro;
  var Bo;
  var Lo;
  var Oo;
  var Do;
  var No;
  var Fo;
  var Ho = no("moofoll");
  var jo = {
    lowDetailMode: false,
    showPing: false,
    showPerfOverlay: false,
    showGrid: false,
    disableStoreSpaceScroll: false,
    allowMovementInAllianceMenu: true,
    hidePlayerNames: false,
    hidePlayerStats: false,
    extremePerformanceMode: false,
    spectateTextFilter: so,
    selectedSkinId: ts()
  };
  var zo = null;
  var Vo = "hat_equip_packets_sent";
  var Wo = {
    hatEquipPacketsSent: Uo(no(Vo), 0)
  };
  function Uo(e, t) {
    var n = parseInt(e, 10);
    if (isNaN(n)) {
      return t;
    } else {
      return n;
    }
  }
  function Go() {
    to(Vo, String(Wo.hatEquipPacketsSent));
  }
  function Yo() {
    var e = Uo(no(Vo), Wo.hatEquipPacketsSent || 0);
    Wo.hatEquipPacketsSent = e + 1;
    Go();
    md();
  }
  var Xo;
  var qo;
  var Ko;
  var Jo;
  var Zo;
  var Qo = null;
  var $o = null;
  var el = null;
  var tl = null;
  var nl = null;
  var il = 1;
  var rl = Date.now();
  var al = [];
  var sl = [];
  var ol = [];
  var ll = [];
  var cl = [];
  var ul = new Ts(Ps, cl, xs);
  var dl = new (function () {
    if (Xr) {
      return Yr;
    }
    Xr = 1;
    var e = function () {
      if (Wr) {
        return Jr.exports;
      }
      Wr = 1;
      var e = [{
        id: 0,
        src: "cow_1",
        killScore: 150,
        health: 500,
        weightM: 0.8,
        speed: 0.00095,
        turnSpeed: 0.001,
        scale: 72,
        spriteScale: 1,
        drop: ["food", 50]
      }, {
        id: 1,
        src: "pig_1",
        killScore: 200,
        health: 800,
        weightM: 0.6,
        speed: 0.00085,
        turnSpeed: 0.001,
        scale: 72,
        spriteScale: 1,
        drop: ["food", 80]
      }, {
        id: 2,
        name: "Bull",
        src: "bull_2",
        hostile: true,
        dmg: 20,
        killScore: 1000,
        health: 1800,
        weightM: 0.5,
        speed: 0.00094,
        turnSpeed: 0.00074,
        scale: 78,
        spriteScale: 1,
        viewRange: 800,
        chargePlayer: true,
        drop: ["food", 100]
      }, {
        id: 3,
        name: "Bully",
        src: "bull_1",
        hostile: true,
        dmg: 20,
        killScore: 2000,
        health: 2800,
        weightM: 0.45,
        speed: 0.001,
        turnSpeed: 0.0008,
        scale: 50,
        spriteScale: 1.6,
        viewRange: 900,
        chargePlayer: true,
        drop: ["food", 400]
      }, {
        id: 4,
        name: "Wolf",
        src: "wolf_1",
        hostile: true,
        dmg: 8,
        killScore: 500,
        health: 300,
        weightM: 0.45,
        speed: 0.001,
        turnSpeed: 0.002,
        scale: 92,
        spriteScale: 1.2,
        viewRange: 800,
        chargePlayer: true,
        drop: ["food", 200]
      }, {
        id: 5,
        name: "Quack",
        src: "chicken_1",
        dmg: 8,
        killScore: 2000,
        noTrap: true,
        health: 300,
        weightM: 0.2,
        speed: 0.0018,
        turnSpeed: 0.006,
        scale: 70,
        spriteScale: 1,
        drop: ["food", 100]
      }, {
        id: 6,
        name: "MOOSTAFA",
        nameScale: 50,
        src: "enemy",
        hostile: true,
        dontRun: true,
        fixedSpawn: true,
        spawnDelay: 60000,
        noTrap: true,
        colDmg: 100,
        dmg: 40,
        killScore: 8000,
        health: 18000,
        weightM: 0.4,
        speed: 0.0007,
        turnSpeed: 0.01,
        scale: 80,
        spriteScale: 1.8,
        leapForce: 0.9,
        viewRange: 1000,
        hitRange: 210,
        hitDelay: 1000,
        chargePlayer: true,
        drop: ["food", 100]
      }, {
        id: 7,
        name: "Treasure",
        hostile: true,
        nameScale: 35,
        src: "crate_1",
        fixedSpawn: true,
        spawnDelay: 120000,
        colDmg: 200,
        killScore: 5000,
        health: 20000,
        weightM: 0.1,
        speed: 0,
        turnSpeed: 0,
        scale: 70,
        spriteScale: 1
      }, {
        id: 8,
        name: "MOOFIE",
        src: "wolf_2",
        hostile: true,
        fixedSpawn: true,
        dontRun: true,
        hitScare: 4,
        spawnDelay: 30000,
        noTrap: true,
        nameScale: 35,
        dmg: 10,
        colDmg: 100,
        killScore: 3000,
        health: 7000,
        weightM: 0.45,
        speed: 0.0015,
        turnSpeed: 0.002,
        scale: 90,
        spriteScale: 1,
        viewRange: 800,
        chargePlayer: true,
        drop: ["food", 1000]
      }, {
        id: 9,
        name: "Deer",
        src: "deer",
        killScore: 400,
        health: 700,
        weightM: 0.55,
        speed: 0.0012,
        turnSpeed: 0.0014,
        scale: 76,
        spriteScale: 1.3,
        drop: ["food", 150],
        biomeLock: "snow"
      }, {
        id: 10,
        name: "",
        src: "present",
        spritePath: ".././img/missing_texture.png",
        killScore: 250,
        health: 100,
        weightM: 0.1,
        speed: 0,
        turnSpeed: 0,
        scale: 68,
        spriteScale: 1,
        dontRun: true,
        hostile: false,
        noTrap: true,
        biomeLock: "snow",
        hideHealthBar: true,
        hideName: true
      }, {
        id: 11,
        name: "Wolf",
        src: "wolf_3",
        hostile: true,
        dmg: 8,
        killScore: 500,
        health: 300,
        weightM: 0.45,
        speed: 0.001,
        turnSpeed: 0.002,
        scale: 92,
        spriteScale: 1.2,
        viewRange: 800,
        chargePlayer: true,
        drop: ["food", 200],
        biomeLock: "snow"
      }, {
        id: 12,
        name: "Arctic Fox",
        src: "arcticfox_1",
        hostile: false,
        enrageOnHit: true,
        dmg: 8,
        killScore: 800,
        health: 600,
        weightM: 0.35,
        speed: 0.0014,
        turnSpeed: 0.003,
        scale: 70,
        spriteScale: 1.4,
        viewRange: 600,
        chargePlayer: false,
        drop: ["food", 150],
        biomeLock: "snow"
      }, {
        id: 13,
        name: "Fox",
        src: "fox_1",
        hostile: false,
        enrageOnHit: true,
        dmg: 8,
        killScore: 800,
        health: 600,
        weightM: 0.35,
        speed: 0.0014,
        turnSpeed: 0.003,
        scale: 70,
        spriteScale: 1.6,
        viewRange: 600,
        chargePlayer: false,
        drop: ["food", 150],
        biomeLock: "desert"
      }];
      var t = {
        entityTypes: e
      };
      Jr.exports = t;
      Jr.exports.entityTypes = e;
      Jr.exports.default = t;
      return Jr.exports;
    }();
    var t = e && e.entityTypes ? e.entityTypes : [];
    var n = function () {
      if (Gr) {
        return Ur;
      }
      Gr = 1;
      var e = Ri;
      var t = 600;
      var n = typeof e.hitAngle == "number" ? Math.max(0, Math.abs(e.hitAngle)) : Math.PI * 0.8;
      function i(e) {
        if (e < 0) {
          return 0;
        } else if (e > 1) {
          return 1;
        } else {
          return e;
        }
      }
      function r() {
        this.active = false;
        this.visible = false;
        this.forcePos = false;
        this.sid = -1;
        this.index = 0;
        this.dirPlus = 0;
        this.animTime = 0;
        this.animSpeed = t;
        this.targetAngle = n;
        this._animRatio = 0;
        this._animPhase = 0;
      }
      r.prototype.init = function (e, i, r, a, s) {
        this.x = e;
        this.y = i;
        this.dir = r;
        this.index = a;
        this.scale = s && typeof s.scale == "number" ? s.scale : 60;
        this.spriteScale = s && typeof s.spriteScale == "number" ? s.spriteScale : typeof s.spriteMlt == "number" ? s.spriteMlt : 1;
        this.spritePath = s && s.spritePath;
        this.src = s && s.src ? s.src : "cow_1";
        this.name = s && typeof s.name == "string" ? s.name : "";
        this.nameScale = s && s.nameScale;
        var o = s && typeof s.health == "number" ? s.health : 100;
        this.maxHealth = o;
        this.health = o;
        this.hideHealthBar = !!s && !!s.hideHealthBar;
        this.visible = false;
        this.forcePos = false;
        this.active = true;
        this.dirPlus = 0;
        this.animTime = 0;
        this.animSpeed = t;
        this.targetAngle = n;
        this._animRatio = 0;
        this._animPhase = 0;
        this.t1 = 0;
        this.t2 = 0;
        this.dt = 0;
        this.x1 = e;
        this.x2 = e;
        this.y1 = i;
        this.y2 = i;
        this.d1 = r;
        this.d2 = r;
        return this;
      };
      r.prototype.startAnim = function () {
        this.animTime = t;
        this.animSpeed = t;
        this.targetAngle = n;
        this._animRatio = 0;
        this._animPhase = 0;
        this.dirPlus = 0;
      };
      r.prototype.animate = function (n) {
        if (!(this.animTime <= 0)) {
          this.animTime -= n;
          if (this.animTime <= 0) {
            this.animTime = 0;
            this.dirPlus = 0;
            this._animRatio = 0;
            this._animPhase = 0;
            return;
          }
          var r = this.animSpeed > 0 ? this.animSpeed : t;
          var a = i(1 - this.animTime / r);
          this.dirPlus = this.targetAngle * function (t) {
            var n;
            var r = (n = typeof e.hitReturnRatio == "number" ? e.hitReturnRatio : 0.5) < 0 ? 0 : n > 1 ? 1 : n;
            var a = typeof e.hitEaseOutPower == "number" && e.hitEaseOutPower > 0 ? e.hitEaseOutPower : 1;
            var s = typeof e.hitEaseInPower == "number" && e.hitEaseInPower > 0 ? e.hitEaseInPower : 1;
            t = i(t);
            if (r <= 0) {
              return 1 - Math.pow(t, s);
            }
            if (r >= 1) {
              return 1 - Math.pow(1 - t, a);
            }
            if (t <= r) {
              var o = r > 0 ? t / r : 1;
              o = i(o);
              return 1 - Math.pow(1 - o, a);
            }
            var l = (t - r) / (1 - r);
            l = i(l);
            return 1 - Math.pow(l, s);
          }(a);
        }
      };
      return Ur = r;
    }();
    function i(e) {
      this.entityTypes = t;
      this._animals = e;
    }
    i.prototype.spawn = function (e, t, i, r) {
      var a = this.entityTypes[r];
      if (!a) {
        return null;
      }
      var s = null;
      for (var o = 0; o < this._animals.length; ++o) {
        if (!this._animals[o].active) {
          s = this._animals[o];
          break;
        }
      }
      if (!s) {
        s = new n();
        this._animals.push(s);
      }
      s.init(e, t, i, r, a);
      return s;
    };
    return Yr = i;
  }())(al);
  var hl = Object.create(null);
  var pl = Object.create(null);
  var ml = [0, 1, 2, 3];
  [-1, 0, 1, 2, 3].forEach(function (e) {
    hl[e] = [];
    pl[e] = 0;
  });
  var fl = Object.create(null);
  var gl = Array.isArray(Ja.decorations) ? Ja.decorations.slice() : [];
  var yl = Ja.decorationSprites || Object.create(null);
  var vl = [];
  var bl = [];
  var wl = null;
  var kl = false;
  var Sl = 0;
  var xl = 110;
  var Il = [];
  var Ml = null;
  var El = false;
  var Pl = 0;
  var Tl = 120;
  var Al = [];
  var Cl = new Na({
    decorations: gl,
    spriteMap: yl,
    getImage: jp
  });
  var _l = 1;
  var Rl = 0;
  var Bl = 0;
  var Ll = 0;
  var Ol = {
    id: -1,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0
  };
  var Dl = {
    id: -1,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0
  };
  var Nl = Ja.maxScreenWidth;
  var Fl = Ja.maxScreenHeight;
  var Hl = 1;
  var jl = 1;
  var zl = 0.6;
  var Vl = 1.3;
  var Wl = false;
  var Ul = null;
  var Gl = null;
  var Yl = null;
  var Xl = "";
  var ql = null;
  var Kl = {
    items: [],
    weapons: []
  };
  var Jl = [];
  var Zl = false;
  var Ql = document.getElementById("mainMenu");
  var $l = document.getElementById("enterGame");
  var ec = document.getElementById("spectateButton");
  document.getElementById("partyButton");
  var tc = document.getElementById("settingsButton") || document.getElementById("openSettings");
  var nc = tc ? tc.getElementsByTagName("span")[0] : null;
  var ic = document.getElementById("settingsModal");
  var rc = document.getElementById("closeSettings");
  var ac = document.getElementById("nameSettingsButton");
  var sc = document.getElementById("gameSettingsButton");
  var oc = document.getElementById("allianceButton");
  var lc = document.getElementById("storeButton");
  var cc = document.getElementById("chatButton");
  var uc = document.getElementById("gameCanvas");
  var dc = uc.getContext("2d");
  var hc = document.getElementById("nativeResolution");
  var pc = document.getElementById("lowDetailMode");
  var mc = document.getElementById("extremePerformanceMode");
  var fc = document.getElementById("showPing");
  var gc = document.getElementById("showPerfOverlay");
  var yc = document.getElementById("showGrid");
  var vc = document.getElementById("disableStoreSpaceScroll");
  var bc = document.getElementById("allowMovementInAllianceMenu");
  var wc = document.getElementById("hidePlayerNames");
  var kc = document.getElementById("hidePlayerStats");
  var Sc = document.getElementById("spectateTextFilter");
  var xc = document.getElementById("keybindsListItems");
  var Ic = document.getElementById("keybindsListMovement");
  var Mc = document.getElementById("keybindsListActions");
  var Ec = document.getElementById("shutdownDisplay");
  var Pc = document.getElementById("menuCardHolder");
  var Tc = document.getElementById("guideCard");
  var Ac = document.getElementById("loadingText");
  var Cc = document.getElementById("gameUI");
  var _c = document.getElementById("actionBar");
  var Rc = document.getElementById("scoreDisplay");
  var Bc = document.getElementById("foodDisplay");
  var Lc = document.getElementById("woodDisplay");
  var Oc = document.getElementById("stoneDisplay");
  var Dc = document.getElementById("killCounter");
  var Nc = document.getElementById("spectateHud");
  var Fc = document.getElementById("spectateHudCount");
  var Hc = document.getElementById("spectateCycleHud");
  var jc = document.getElementById("spectateCycleName");
  var zc = document.getElementById("spectatePrev");
  var Vc = document.getElementById("spectateNext");
  var Wc = document.getElementById("spectateCycleStatsLeft");
  var Uc = document.getElementById("spectateCycleStatsRight");
  var Gc = document.getElementById("spectateZoomSlider");
  var Yc = document.getElementById("leaderboardData");
  var Xc = document.getElementById("mainMenuLeaderboard");
  var qc = document.getElementById("mainMenuLeaderboardMetric");
  var Kc = document.getElementById("mainMenuLeaderboardInterval");
  var Jc = document.getElementById("mainMenuLeaderboardRows");
  var Zc = document.getElementById("nameInput");
  document.getElementById("serverSelector");
  var Qc = document.getElementById("serverSelectorOptions");
  var $c = document.getElementById("itemInfoHolder");
  var eu = document.getElementById("ageText");
  var tu = document.getElementById("ageBarBody");
  var nu = document.getElementById("upgradeHolder");
  var iu = document.getElementById("upgradeCounter");
  var ru = document.getElementById("allianceMenu");
  var au = document.getElementById("allianceHolder");
  var su = document.getElementById("allianceManager");
  if (Ja.botMode && ru) {
    ru.style.display = "none";
  }
  var ou = document.getElementById("mapDisplay");
  var lu = document.getElementById("diedText");
  var cu = document.getElementById("skinColorHolder");
  var uu = ou.getContext("2d");
  ou.width = 300;
  ou.height = 300;
  var du = document.getElementById("storeMenu");
  var hu = document.getElementById("storeHolder");
  function pu(e, t) {
    var n = typeof e == "string" && e.trim() ? e.trim() : t;
    if (n) {
      if (n.charAt(0) === "/") {
        return n;
      } else {
        return "/" + n;
      }
    } else {
      return t;
    }
  }
  function mu(e, t) {
    var n = typeof e == "string" && e.trim() ? e.trim() : t;
    if (n) {
      if (n.charAt(0) !== "/") {
        n = "/" + n;
      }
      if (n.length > 1) {
        n = n.replace(/\/+$/, "");
      }
      return n || "/";
    } else {
      return "/";
    }
  }
  function fu(e) {
    if (typeof e != "string") {
      return "";
    }
    var t = e.trim();
    if (!t) {
      return "";
    }
    try {
      return new URL(t).origin;
    } catch (e) {
      return "";
    }
  }
  function gu() {
    if (typeof window == "undefined" || !window.location) {
      return "";
    }
    try {
      return new URL(window.location.href).origin;
    } catch (e) {
      return window.location.origin || "";
    }
  }
  function yu(e) {
    var t = gu();
    if (function (e) {
      if (typeof e != "string" || !e.trim()) {
        return false;
      }
      try {
        var t = new URL(e).hostname.toLowerCase();
        return t === "localhost" || t === "::1" || t === "[::1]" || t.indexOf("127.") === 0;
      } catch (e) {
        return false;
      }
    }(t)) {
      return t;
    } else {
      return fu(e && e.origin) || t;
    }
  }
  function vu(e, t, n) {
    var i = pu(t, n || "/");
    var r = yu(e);
    if (r) {
      return new URL(i, r).toString();
    } else {
      return i;
    }
  }
  function bu(e) {
    if (typeof e != "string") {
      return false;
    }
    var t = e.trim().toLowerCase();
    return t === "1vs1" || t === "1v1";
  }
  function wu() {
    return bu((e = vo[bo]) && typeof e.serverType == "string" && e.serverType.length ? e.serverType : wo && typeof wo.key == "string" && wo.key.length ? wo.key : typeof Ja.type == "string" ? Ja.type : "");
    var e;
  }
  function ku() {
    Po = {
      queued: false,
      inMatch: false,
      queueSize: 0,
      currentStreak: 0,
      bestStreak: 0,
      statusText: ""
    };
  }
  function Su() {
    if ($l) {
      $l.disabled = false;
    }
    (function (e) {
      if ($l) {
        var t = $l.querySelector("span");
        if (t) {
          t.textContent = e;
        } else {
          $l.textContent = e;
        }
      }
    })("Play");
  }
  function xu(e) {
    if (e && typeof e == "object") {
      Po = Object.assign({}, Po, e);
    }
    Su();
  }
  function Iu(e, t) {
    var n = Number(t);
    if (!isFinite(n) || n < 0) {
      n = 0;
    }
    if (e === "streak") {
      return Math.round(n).toLocaleString("en-US") + " wins";
    } else {
      return Math.round(n).toLocaleString("en-US");
    }
  }
  function Mu() {
    if (Jc) {
      Jc.innerHTML = "";
    }
  }
  function Eu(e, t) {
    if (Jc) {
      var n = document.createElement("div");
      n.className = "mainMenuLeaderboardRow";
      n.setAttribute("role", "listitem");
      var i = document.createElement("span");
      i.className = "mainMenuLeaderboardName";
      i.textContent = e || "No entries";
      n.appendChild(i);
      if (typeof t == "string" && t) {
        var r = document.createElement("span");
        r.className = "mainMenuLeaderboardSeparator";
        r.textContent = "-";
        n.appendChild(r);
        var a = document.createElement("span");
        a.className = "mainMenuLeaderboardValue";
        a.textContent = t;
        n.appendChild(a);
      }
      Jc.appendChild(n);
    }
  }
  function Pu(e) {
    Mu();
    Eu(e || "No entries", "");
  }
  function Tu() {
    if (Jc && Xc) {
      var e = wu() ? po : ho;
      if (wu() && Io && Array.isArray(Io.rows)) {
        Mu();
        for (var t = 0; t < e; t++) {
          var n = Io.rows[t];
          if (n) {
            Eu(n.name ? n.name : "Unknown", Iu("streak", n.streak || n.value));
          } else {
            Eu("No entry", "");
          }
        }
      } else {
        var i = (qc && qc.value) === "kills" ? "kills" : "score";
        var r = function (e) {
          switch (e) {
            case "daily":
            case "weekly":
            case "all-time":
              return e;
            default:
              return "all-time";
          }
        }(Kc && Kc.value);
        var a = Io && Io.intervals && Io.intervals[r];
        var s = a && Array.isArray(a[i]) ? a[i] : null;
        Mu();
        if (s && s.length) {
          for (var o = 0; o < e; o++) {
            var l = s[o];
            if (l) {
              Eu(l.name ? l.name : "Unknown", Iu(i, l.value));
            } else {
              Eu("No entry", "");
            }
          }
        } else {
          for (var c = 0; c < e; c++) {
            Eu("No entry", "");
          }
        }
      }
    }
  }
  function Au(e) {
    if (!Jc || !Xc || Zr) {
      return Promise.resolve(null);
    }
    var t = e || _u(bo);
    var n = ++Eo;
    Pu("Loading");
    return function (e) {
      if (!e || typeof fetch != "function") {
        return Promise.resolve(null);
      }
      var t;
      var n;
      var i;
      n = vu(t = e, t && t.pingPath ? t.pingPath : uo, uo);
      (i = new URL(n, window.location.href)).pathname = uo;
      var r = i.toString();
      var a = r.indexOf("?") === -1 ? "?" : "&";
      return fetch(r + a + "limit=5&ts=" + Date.now(), {
        cache: "no-store"
      }).then(function (e) {
        if (!e.ok) {
          throw new Error("Failed to load leaderboard");
        }
        return e.json();
      });
    }(t).then(function (e) {
      if (n === Eo) {
        Io = e;
        Tu();
      }
      return e;
    }).catch(function () {
      if (n === Eo) {
        Io = null;
        Pu("Unavailable");
      }
      return null;
    });
  }
  function Cu(e, t) {
    if (!e || typeof e != "object") {
      return null;
    }
    var n = typeof e.key == "string" && e.key.trim() ? e.key.trim().toLowerCase() : t;
    if (!n) {
      return null;
    }
    var i = typeof e.name == "string" && e.name.trim() ? e.name.trim() : n;
    var r = typeof e.pingPath == "string" && e.pingPath.trim() ? e.pingPath.trim() : "/ping";
    var a = typeof e.websocketPath == "string" && e.websocketPath.trim() ? e.websocketPath.trim() : "/ws";
    var s = typeof e.spectatePath == "string" && e.spectatePath.trim() ? e.spectatePath.trim() : "/spectate";
    var o = typeof e.routeBasePath == "string" && e.routeBasePath.trim() ? e.routeBasePath.trim() : "/";
    return {
      key: n,
      name: i,
      tag: typeof e.tag == "string" && e.tag.trim() ? e.tag.trim() : "",
      description: typeof e.description == "string" && e.description.trim() ? e.description.trim() : "",
      origin: fu(e.origin),
      pingPath: pu(r, "/ping"),
      websocketPath: pu(a, "/ws"),
      spectatePath: pu(s, "/spectate"),
      routeBasePath: mu(o, "/"),
      isDefault: Boolean(e.default || e.isDefault)
    };
  }
  function _u(e) {
    var t = typeof e == "string" && e.trim() ? e.trim().toLowerCase() : "";
    for (var n = 0; n < yo.length; ++n) {
      if (yo[n].key === t) {
        return yo[n];
      }
    }
    for (var i = 0; i < yo.length; ++i) {
      if (yo[i].isDefault) {
        return yo[i];
      }
    }
    return yo[0] || go[0];
  }
  function Ru() {
    var e = null;
    var t = function () {
      var e = function () {
        var e = "/";
        try {
          e = new URL(window.location.href).pathname || "/";
        } catch (t) {
          e = window.location && window.location.pathname ? window.location.pathname : "/";
        }
        var t = mu(e, "/");
        if (t === "/classic" || t.indexOf("/classic/") === 0 || t === "/server=classic" || t.indexOf("/server=classic/") === 0) {
          return "classic";
        }
        if (t === "/server=dev" || t.indexOf("/server=dev/") === 0) {
          return "dev";
        }
        if (t === "/server=sandbox" || t.indexOf("/server=sandbox/") === 0) {
          return "sandbox";
        }
        for (var n = yo.length ? yo : go, i = "", r = 0, a = 0; a < n.length; ++a) {
          var s = n[a];
          var o = mu(s && s.routeBasePath, s && s.key === fo ? "/" : "/" + (s && s.key ? s.key : ""));
          if (o !== "/") {
            if (t === o || t.indexOf(o + "/") === 0) {
              if (o.length > r) {
                i = s.key;
                r = o.length;
              }
            }
          }
        }
        return i;
      }();
      if (e) {
        return e;
      }
      var t = gu();
      if (!t) {
        return "";
      }
      for (var n = yo.length ? yo : go, i = 0; i < n.length; ++i) {
        var r = n[i];
        var a = fu(r && r.origin);
        var s = mu(r && r.routeBasePath, r && r.key === fo ? "/" : "/" + (r && r.key ? r.key : ""));
        if (a && a === t && s === "/") {
          return r.key;
        }
      }
      return "";
    }();
    try {
      e = new URL(window.location.href).searchParams.get(lo);
    } catch (t) {
      e = null;
    }
    return e || t || no(co) || fo;
  }
  function Bu(e) {
    var t = _u(e);
    if (!t) {
      return "";
    }
    var n = gu();
    var i = yu(t);
    var r = function () {
      if (Zr) {
        return true;
      }
      var e = "/";
      try {
        e = new URL(window.location.href).pathname || "/";
      } catch (t) {
        e = window.location && window.location.pathname ? window.location.pathname : "/";
      }
      return /\/spectate\/?$/.test(e);
    }() ? "/spectate" : "/";
    var a = i && n && i !== n ? new URL(r, i) : new URL(r, window.location.href);
    a.search = "";
    a.searchParams.set(lo, t.key);
    a.hash = "";
    return a.toString();
  }
  function Lu(e, t) {
    var n = _u(e);
    if (n) {
      bo = n.key;
      wo = n;
      to(co, n.key);
      (function () {
        if (typeof window != "undefined" && window.location) {
          var e = Bu(bo);
          if (e && e !== window.location.href) {
            var t = gu();
            var n = "";
            try {
              n = new URL(e, window.location.href).origin;
            } catch (e) {
              n = "";
            }
            if (n === t && window.history && typeof window.history.replaceState == "function") {
              window.history.replaceState(null, "", e);
            } else {
              window.location.replace(e);
            }
          }
        }
      })();
      if (!bu(n.key)) {
        ku();
      }
      Su();
      return n;
    } else {
      return null;
    }
  }
  function Ou(e) {
    if (!e || !e.server || !e.players) {
      return "";
    }
    var t = Number(e.players.activeCount);
    var n = Number(e.server.maxPlayers);
    if (!isFinite(t)) {
      t = 0;
    }
    if (!isFinite(n) || n <= 0) {
      return String(t);
    } else {
      return t + "/" + n + " players";
    }
  }
  function Du() {
    if (Qc) {
      Qc.innerHTML = "";
      for (var e = 0; e < yo.length; ++e) {
        (function (e) {
          var t = vo[e.key] || null;
          var n = document.createElement("button");
          n.type = "button";
          n.className = "serverOption";
          n.dataset.serverKey = e.key;
          if (e.key === bo) {
            n.classList.add("isActive");
          }
          if (t && t.online === false) {
            n.classList.add("isOffline");
          }
          var i = document.createElement("div");
          i.className = "serverOptionTitle";
          var r = document.createElement("span");
          r.className = "serverOptionName";
          r.textContent = e.name;
          i.appendChild(r);
          var a = document.createElement("div");
          a.className = "serverOptionMeta";
          a.textContent = t && t.metaText ? t.metaText : e.description || "No details available.";
          n.appendChild(i);
          n.appendChild(a);
          n.onclick = qa.checkTrusted(function () {
            if (e.key !== bo) {
              window.location.assign(Bu(e.key));
            } else if (!Ls && !So) {
              Cd("Retrying " + e.name + "...", {
                withReload: false,
                keepMenuVisible: true
              });
              ju().finally(function () {
                Ys();
              });
            }
          });
          qa.hookTouchEvents(n);
          Qc.appendChild(n);
        })(yo[e]);
      }
    }
  }
  function Nu(e) {
    if (!e || typeof fetch != "function") {
      return Promise.resolve(null);
    }
    var t = vu(e, e.pingPath, "/ping");
    return fetch(t + (t.indexOf("?") === -1 ? "?" : "&") + "ts=" + Date.now(), {
      cache: "no-store"
    }).then(function (e) {
      if (!e.ok) {
        throw new Error("Failed to ping server");
      }
      return e.json();
    });
  }
  function Fu(e, t) {
    if (e && t && typeof t == "object") {
      Object.keys(t).forEach(function (n) {
        var i = t[n];
        if (Array.isArray(i)) {
          e[n] = i.slice();
        } else {
          if (i && typeof i == "object") {
            var r = e[n];
            if (!r || typeof r != "object" || !!Array.isArray(r)) {
              r = {};
              e[n] = r;
            }
            Fu(r, i);
            return;
          }
          e[n] = i;
        }
      });
    }
  }
  function Hu(e) {
    if (e && e.clientConfig) {
      Fu(Ja, e.clientConfig);
      Su();
    }
  }
  function ju() {
    var e = _u(bo);
    if (e) {
      wo = e;
      return Nu(e).then(function (t) {
        vo[e.key] = {
          online: true,
          metaText: Ou(t) || e.description || "Online",
          serverType: t && t.server && t.server.type ? t.server.type : e.key
        };
        Hu(t);
        Du();
        if (!wu()) {
          ku();
          Su();
        }
        Au(e);
        return t;
      }).catch(function () {
        vo[e.key] = {
          online: false,
          metaText: "Unavailable right now",
          serverType: e.key
        };
        Du();
        Io = null;
        Pu("Unavailable");
        Su();
        return null;
      });
    } else {
      return Promise.resolve(null);
    }
  }
  function zu() {
    if (yo.length) {
      return Promise.all(yo.map(function (e) {
        return Nu(e).then(function (t) {
          vo[e.key] = {
            online: true,
            metaText: Ou(t) || e.description || "Online",
            serverType: t && t.server && t.server.type ? t.server.type : e.key
          };
          if (e.key === bo) {
            Hu(t);
          }
        }).catch(function () {
          vo[e.key] = {
            online: false,
            metaText: "Unavailable right now",
            serverType: e.key
          };
        });
      })).finally(function () {
        Du();
        Su();
      });
    } else {
      Du();
      return Promise.resolve([]);
    }
  }
  function Vu(e) {
    if (e) {
      e.addEventListener("contextmenu", function (e) {
        e.preventDefault();
      }, {
        passive: false
      });
    }
  }
  function Wu(e) {
    if (hu) {
      hu.classList.remove("storeNoScroll");
      if (e) {
        hu.scrollTop = 0;
      }
    }
  }
  Vu(Cc);
  Vu(du);
  var Uu = document.getElementById("notificationDisplay");
  var Gu = document.getElementById("cornerSettingsHolder");
  var Yu = document.getElementById("cornerStatsHatEquips");
  var Xu = document.getElementById("cornerDecorationSelect");
  var qu = document.getElementById("cornerDecorationEditMode");
  var Ku = document.getElementById("cornerDecorationSize");
  var Ju = document.getElementById("cornerDecorationRotation");
  var Zu = document.getElementById("cornerCopyDecorations");
  var Qu = document.getElementById("cornerWorldSelect");
  var $u = document.getElementById("cornerWorldEditMode");
  var ed = document.getElementById("cornerWorldSize");
  var td = document.getElementById("cornerWorldRotation");
  var nd = document.getElementById("cornerCopyWorld");
  var id = Array.from(document.querySelectorAll(".cornerSettingsTab"));
  var rd = Array.from(document.querySelectorAll(".cornerSettingsContent"));
  if (!Za) {
    if (Gu) {
      Gu.style.display = "none";
    }
    id = [];
    rd = [];
  }
  md();
  var ad = null;
  var sd = Es.hats;
  var od = new Ta({
    container: Uu,
    containerId: "notificationDisplay",
    onRespond: function (e) {
      var t;
      t = e;
      if (ih.length) {
        na(ih[0].sid, t);
        ih.splice(0, 1);
        sh();
      }
    }
  });
  var ld = new Pa({
    container: $c,
    getPlayer: function () {
      return Do;
    }
  });
  var cd = new Ca({
    holder: hu,
    hats: sd,
    utils: qa,
    storeBuy: function (e, t) {
      Yo();
      return la(e, typeof t == "number" ? t : 0);
    },
    storeEquip: function (e, t) {
      var n = Date.now();
      if (Qa.active && !Qa.consumed && n <= Qa.expiresAt) {
        Qa.consumed = true;
        Yo();
      }
      Qa.active = false;
      return oa(e, typeof t == "number" ? t : 0);
    },
    registerHatEquipInput: function (e) {
      if (e) {
        Qa.active = true;
        Qa.consumed = false;
        Qa.expiresAt = Date.now() + 500;
      } else {
        Qa.active = false;
        Qa.consumed = false;
      }
    },
    getPlayer: function () {
      return Do;
    },
    showItemInfo: function (e, t, n) {
      ld.show(e, {
        isWeapon: Boolean(t),
        isStoreItem: Boolean(n)
      });
    },
    bindInstantAction: function (e, t) {
      if (e && typeof t == "function") {
        var n = false;
        var i = qa.checkTrusted(function (e) {
          if (!n) {
            n = true;
            t(e);
            setTimeout(function () {
              n = false;
            }, 0);
          }
        });
        e.onpointerdown = i;
        e.onclick = i;
      }
    }
  });
  var ud = new _a({
    menu: du,
    storeUI: cd,
    allianceMenu: ru,
    closeChat: wh,
    utils: qa,
    getPlayer: function () {
      return Do;
    }
  });
  var dd = new Ha({
    utils: qa,
    documentRef: document,
    upgradeHolder: nu,
    upgradeCounter: iu,
    itemsData: xs,
    getPlayer: function () {
      return Do;
    },
    requestUpgrade: va,
    itemInfoPanel: ld
  });
  function hd() {
    if (du) {
      du.style.display = "none";
    }
    if (ru) {
      ru.style.display = "none";
    }
    wh();
  }
  function pd(e) {
    il = e ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    if (hc) {
      hc.checked = e;
    }
    to(Va, e.toString());
    Rh();
  }
  function md() {
    if (Yu) {
      Yu.textContent = String(Wo.hatEquipPacketsSent || 0);
    }
  }
  var fd = new Aa({
    menu: ru,
    holder: au,
    manager: su,
    storeMenu: du,
    closeChat: wh,
    getPlayer: function () {
      return Do;
    },
    getAlliancePlayers: function () {
      return rh;
    },
    getAlliances: function () {
      return ol;
    },
    onKick: function (e) {
      ia(e);
    },
    onJoin: function (e) {
      var t;
      if (ol[t = e]) {
        ra(ol[t].sid);
      }
    },
    onCreate: function (e) {
      (function (e) {
        var t = typeof e == "string" ? e : "";
        if (!t) {
          var n = document.getElementById("allianceInput");
          t = n ? n.value : "";
        }
        aa(t);
      })(e);
    },
    onLeave: function () {
      ih = [];
      sh();
      sa();
    }
  });
  function gd() {
    ud.toggleMenu();
  }
  function yd(e, t, n) {
    ud.updateItems(e, t, n);
  }
  function vd() {
    if (Qo) {
      Qo.toggle();
    }
  }
  function bd(e, t) {
    if (Zr) {
      if (e) {
        if (t) {
          Kl.weapons = e;
        } else {
          Kl.items = e;
        }
      }
      if (el) {
        el.updatePlayerItems({
          items: Array.isArray(Kl.items) ? Kl.items : [],
          weapons: Array.isArray(Kl.weapons) ? Kl.weapons : []
        });
      }
      return;
    }
    if (e) {
      if (t) {
        Do.weapons = e;
      } else {
        Do.items = e;
      }
    }
    if (Do && el && typeof el.updatePlayerItems == "function") {
      el.updatePlayerItems(Do);
    }
  }
  var wd = new Is(Ss, ll, qa, Ja);
  var kd = "#332F29";
  var Sd = "#272626";
  var xd = 5.5;
  function Id(e) {
    ol = Ja.botMode ? [] : e.teams;
  }
  var Md;
  var Ed;
  var Pd;
  var Td = true;
  function Ad(e) {
    var t = !Zr && Wl;
    var n = Yl !== null ? Yl : ql;
    var i = Xl || "";
    Ls = false;
    So = false;
    ko = false;
    Ws();
    Wl = false;
    if (t) {
      sl.length = 0;
      al.length = 0;
      ll.length = 0;
      cl.length = 0;
      ol = [];
      Do = null;
      No = null;
      Xo = Ja.mapScale / 2;
      qo = Ja.mapScale / 2;
    }
    if (!Zr && wu()) {
      xu({
        queued: false,
        inMatch: false
      });
    }
    if (Zr) {
      ql = null;
      Yl = null;
      Xl = "";
      Gm();
      rf(false);
      if (Ul) {
        Ul.setTarget(null);
      }
      Xm();
    }
    Qr.close();
    Du();
    if (!function (e, t) {
      if (!function (e) {
        var t = typeof Qr.closeCode == "number" ? Qr.closeCode : 0;
        if (t === 1006 || t === 1012) {
          return true;
        }
        if (typeof e == "string") {
          var n = e.toLowerCase();
          return n === "disconnected" || n === "socket error" || n === "server restarting" || n === "service restart";
        }
        return false;
      }(e)) {
        return false;
      }
      if (Ls || So) {
        return false;
      }
      if (Os) {
        return true;
      }
      if (Ns >= zs) {
        return false;
      }
      var n;
      Fs = Boolean(t && t.resumeGame);
      Hs = t && typeof t.spectateTargetSid == "number" ? t.spectateTargetSid : null;
      js = t && typeof t.spectateTargetName == "string" ? t.spectateTargetName : "";
      if (!Zr) {
        ko = Fs;
      }
      n = Ns += 1;
      var i = !isFinite(n) || n <= 1 ? 1000 : Math.min(Vs, Math.pow(2, n - 1) * 1000);
      var r = wo && wo.name ? wo.name : "server";
      var a = Date.now() + i;
      var s = Ns + "/" + zs;
      function o() {
        var e = Math.max(0, Math.ceil((a - Date.now()) / 1000));
        Cd("Connection lost (" + s + "). Reconnecting to " + r + " in " + e + "s...", {
          withReload: false,
          keepMenuVisible: true
        });
      }
      o();
      Us();
      Ds = setInterval(o, 1000);
      Os = setTimeout(function () {
        Us();
        Os = null;
        if (!Ls && !So) {
          if (!Zr) {
            ko = Fs;
          }
          ju().finally(function () {
            Ys(true);
          });
        }
      }, i);
      return true;
    }(e, {
      resumeGame: t,
      spectateTargetSid: n,
      spectateTargetName: i
    })) {
      if (Zr && typeof e == "string" && e.toLowerCase() === "disconnected") {
        Cd("Disconnected.");
      } else {
        Cd(e, {
          keepMenuVisible: !Wl && !Zr
        });
        if (Ns >= zs && Ac) {
          var r = document.createElement("button");
          r.textContent = "Try again";
          r.className = "ctaButton primary";
          r.style.cssText = "display:block;margin:12px auto 0";
          var a = t;
          r.onclick = function () {
            Gs();
            if (!Zr) {
              ko = a;
            }
            ju().finally(function () {
              Ys(true);
            });
          };
          Ac.appendChild(r);
        }
      }
    }
  }
  function Cd(e, t) {
    if (Zr) {
      if (Ul) {
        Ul.setStatus(e || "Connecting...");
      }
      if (Ql) {
        Ql.style.display = "none";
      }
      if (Cc) {
        Cc.style.display = "block";
      }
      return;
    }
    var n = !t || t.withReload !== false;
    var i = Boolean(t && t.keepMenuVisible);
    Ql.style.display = "block";
    Cc.style.display = "none";
    if (Pc) {
      Pc.style.display = i ? "flex" : "none";
    }
    lu.style.display = "none";
    Ac.style.display = "block";
    var r = n ? "<a href='javascript:window.location.href=window.location.href' class='ytLink'>reload</a>" : "";
    Ac.innerHTML = e + r;
  }
  function _d(e) {
    for (var t = 0; t < Il.length; ++t) {
      var n = Il[t];
      if (n && String(n.id) === String(e)) {
        return n;
      }
    }
    return null;
  }
  function Rd() {
    var e = _d(Ml);
    var t = e && typeof e.size == "number" ? e.size : 120;
    var n = e && typeof e.rotation == "number" ? e.rotation : 0;
    Tl = Bd(t);
    Pl = Ld(n);
    if (ed) {
      ed.value = Tl;
    }
    if (td) {
      td.value = Math.round(Pl * 180 / Math.PI * 100) / 100;
    }
    if ($u) {
      $u.checked = El;
    }
  }
  function Bd(e) {
    var t = ed ? Number(ed.value) : NaN;
    if (isNaN(t) || t <= 0) {
      t = typeof e == "number" && e > 0 ? e : 120;
    }
    return Math.min(Math.max(t, 1), 500);
  }
  function Ld(e) {
    var t = td ? Number(td.value) : NaN;
    if (isNaN(t)) {
      t = typeof e == "number" ? e * 180 / Math.PI : 0;
    }
    return t * Math.PI / 180;
  }
  function Od(e, t) {
    El = !!e;
    if ($u) {
      $u.checked = El;
    }
    if (El) {
      if (kl) {
        Xd(false, true);
      }
      if (ad !== "cornerSettingsWorld") {
        jd("cornerSettingsWorld");
      }
    }
    if (!t) {
      zd();
    }
  }
  function Dd(e) {
    var t = _d(e);
    if (t) {
      if (t.spritePath) {
        return t.spritePath;
      } else if (t.data && t.data.spritePath) {
        return t.data.spritePath;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  function Nd(e) {
    if (e) {
      if (e.spritePath) {
        return e.spritePath;
      } else if (e.data && e.data.spritePath) {
        return e.data.spritePath;
      } else if (e.id !== undefined && e.id !== null) {
        return Dd(e.id);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  function Fd(e) {
    var t = e && typeof e.size == "number" && e.size > 0 ? e.size : 120;
    var n = e ? Rp[e.type] : null;
    var i = n ? vs[n] : null;
    var r = i && typeof i.sizeMultiplier == "number" && isFinite(i.sizeMultiplier) ? i.sizeMultiplier : 1;
    return Math.max(1, Math.round(t * 2 * r));
  }
  function Hd() {
    if (Al.length) {
      var e = Al.map(function (e) {
        return function (e) {
          if (!e) {
            return null;
          }
          var t = typeof e.type != "number" || isNaN(e.type) ? Number(e.type) : e.type;
          if (isNaN(t)) {
            t = 0;
          }
          var n = typeof e.size == "number" && e.size > 0 ? e.size : 120;
          var i = {
            type: t,
            x: Math.round((typeof e.x == "number" ? e.x : 0) * 100) / 100,
            y: Math.round((typeof e.y == "number" ? e.y : 0) * 100) / 100,
            rotation: Math.round((typeof e.rotation == "number" ? e.rotation : 0) * 1000) / 1000,
            size: Math.round(n * 100) / 100
          };
          if (typeof e.layer == "number") {
            i.layer = e.layer;
          }
          var r = e.data && e.data.id;
          var a = e.data && e.data.name;
          if (r !== undefined) {
            i.id = r;
          } else if (typeof a == "string" && a.length) {
            i.name = a;
          }
          return i;
        }(e);
      }).filter(Boolean);
      var t = JSON.stringify(e, null, 2);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(t).catch(function () {
          window.prompt("Copy world objects JSON:", t);
        });
      } else {
        window.prompt("Copy world objects JSON:", t);
      }
    }
  }
  function jd(e) {
    if (e) {
      ad = e;
      id.forEach(function (t) {
        t.classList.toggle("active", t.dataset.target === e);
      });
      rd.forEach(function (t) {
        t.classList.toggle("active", t.id === e);
      });
      zd();
    }
  }
  function zd() {
    var e = ad === "cornerSettingsWorld";
    if (ad !== "cornerSettingsDecorations" && kl) {
      Xd(false, true);
    }
    if (!e && El) {
      Od(false, true);
    }
  }
  function Vd() {
    var e = Wd(wl);
    var t = e && typeof e.size == "number" ? e.size : 110;
    var n = e && typeof e.rotation == "number" ? e.rotation : 0;
    xl = Gd(t);
    Sl = Yd(n);
    if (Ku) {
      Ku.value = xl;
    }
    if (Ju) {
      Ju.value = Math.round(Sl * 180 / Math.PI * 100) / 100;
    }
    if (qu) {
      qu.checked = kl;
    }
  }
  function Wd(e) {
    for (var t = 0; t < gl.length; ++t) {
      var n = gl[t];
      if (n && n.id === e) {
        return n;
      }
    }
    return null;
  }
  function Ud(e) {
    if (e == null) {
      return null;
    }
    if (yl && yl[e]) {
      return yl[e];
    }
    var t = Wd(e);
    if (t && t.imgSrc) {
      return t.imgSrc;
    }
    for (var n = 0; n < vl.length; ++n) {
      var i = vl[n];
      if (i && i.id === e && i.imgSrc) {
        return i.imgSrc;
      }
    }
    return null;
  }
  function Gd(e) {
    var t = Ku ? Number(Ku.value) : NaN;
    if (isNaN(t) || t <= 0) {
      t = typeof e == "number" && e > 0 ? e : 110;
    }
    return Math.min(Math.max(t, 1), 500);
  }
  function Yd(e) {
    var t = Ju ? Number(Ju.value) : NaN;
    if (isNaN(t)) {
      t = typeof e == "number" ? e * 180 / Math.PI : 0;
    }
    return t * Math.PI / 180;
  }
  function Xd(e, t) {
    kl = !!e;
    if (qu) {
      qu.checked = kl;
    }
    if (kl) {
      if (El) {
        Od(false, true);
      }
      if (ad !== "cornerSettingsDecorations") {
        jd("cornerSettingsDecorations");
      }
    }
    if (!t) {
      zd();
    }
  }
  function qd(e) {
    var t = e % 360;
    if (t < 0) {
      t += 360;
    }
    return t;
  }
  function Kd(e, t, n, i) {
    var r = Number(e);
    if (isNaN(r)) {
      r = typeof i == "number" ? i : t;
    }
    return Math.max(t, Math.min(n, r));
  }
  function Jd(e) {
    var t = Kd((typeof Tl == "number" ? Tl : Bd()) + e, 1, 500, 120);
    Tl = t;
    if (ed) {
      ed.value = t;
    }
  }
  function Zd(e) {
    var t = Kd((typeof xl == "number" ? xl : Gd()) + e, 1, 500, 110);
    xl = t;
    if (Ku) {
      Ku.value = t;
    }
  }
  function Qd(e) {
    var t;
    t = qd((typeof Pl == "number" ? Pl * 180 / Math.PI : 0) + e);
    Pl = t * Math.PI / 180;
    if (td) {
      td.value = Math.round(t * 100) / 100;
    }
  }
  function $d(e) {
    var t;
    t = qd((typeof Sl == "number" ? Sl * 180 / Math.PI : 0) + e);
    Sl = t * Math.PI / 180;
    if (Ju) {
      Ju.value = Math.round(t * 100) / 100;
    }
  }
  function eh() {
    if (vl.length) {
      var e = vl.map(function (e) {
        var t = {
          id: e.id,
          x: Math.round(e.x * 100) / 100,
          y: Math.round(e.y * 100) / 100,
          rotation: Math.round(e.rotation * 1000) / 1000,
          size: Math.round(e.size * 100) / 100,
          layer: typeof e.layer == "number" ? e.layer : 0
        };
        if (e.imgSrc) {
          t.imgSrc = e.imgSrc;
        }
        return t;
      });
      var t = JSON.stringify(e, null, 2);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(t).catch(function () {
          window.prompt("Copy decorations JSON:", t);
        });
      } else {
        window.prompt("Copy decorations JSON:", t);
      }
    }
  }
  function th(e) {
    if (Wl) {
      var t = ad === "cornerSettingsDecorations" ? "decoration" : ad === "cornerSettingsWorld" ? "world" : null;
      if (t && !function (e) {
        if (!e) {
          return true;
        }
        var t = document.activeElement;
        if (!t) {
          return false;
        }
        if (t.isContentEditable) {
          return true;
        }
        var n = t.tagName;
        return (n === "INPUT" || n === "TEXTAREA") && (!t.id || ["cornerDecorationSize", "cornerDecorationRotation", "cornerWorldSize", "cornerWorldRotation"].indexOf(t.id) === -1);
      }(e)) {
        var n = (e.key || "").toLowerCase();
        var i = false;
        var r = e.shiftKey ? 15 : 5;
        var a = e.shiftKey ? 10 : 5;
        if (n === "e" && e.shiftKey) {
          if (t === "decoration") {
            Xd(!kl);
          } else {
            Od(!El);
          }
          i = true;
        }
        if (t === "decoration" ? kl : El) {
          if (n === "[" || n === "{") {
            if (t === "decoration") {
              $d(-r);
            } else {
              Qd(-r);
            }
            i = true;
          } else if (n === "]" || n === "}") {
            if (t === "decoration") {
              $d(r);
            } else {
              Qd(r);
            }
            i = true;
          } else if (n === "-" || n === "_") {
            if (t === "decoration") {
              Zd(-a);
            } else {
              Jd(-a);
            }
            i = true;
          } else if (n === "=" || n === "+") {
            if (t === "decoration") {
              Zd(a);
            } else {
              Jd(a);
            }
            i = true;
          } else if (n === "c" && e.shiftKey) {
            if (t === "decoration") {
              eh();
            } else {
              Hd();
            }
            i = true;
          }
          if (i) {
            e.preventDefault();
            e.stopPropagation();
          }
        } else if (i) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }
  }
  window.onblur = function () {
    Td = false;
  };
  window.onfocus = function () {
    Td = true;
    if (Do && Do.alive) {
      Fh();
    }
  };
  uc.oncontextmenu = function () {
    return false;
  };
  var nh;
  var ih = [];
  var rh = [];
  function ah(e, t) {
    ih.push({
      sid: e,
      name: t
    });
    sh();
  }
  function sh() {
    od.render(ih);
  }
  function oh(e) {
    ol.push(e);
    if (ru && ru.style.display == "block") {
      fd.show();
    }
  }
  function lh(e, t) {
    if (Do) {
      Do.team = e;
      Do.isOwner = t;
      if (ru && ru.style.display == "block") {
        fd.show();
      }
    }
  }
  function ch(e) {
    rh = e;
    if (ru && ru.style.display == "block") {
      fd.show();
    }
  }
  function uh(e) {
    for (var t = ol.length - 1; t >= 0; t--) {
      if (ol[t].sid == e) {
        ol.splice(t, 1);
      }
    }
    if (ru && ru.style.display == "block") {
      fd.show();
    }
  }
  var dh = [];
  class hh {
    constructor() {
      this.init = function (e, t) {
        this.scale = 0;
        this.x = e;
        this.y = t;
        this.active = true;
      };
      this.update = function (e, t) {
        if (this.active) {
          this.scale += t * 0.05;
          if (this.scale >= Ja.mapPingScale) {
            this.active = false;
          } else {
            e.globalAlpha = 1 - Math.max(0, this.scale / Ja.mapPingScale);
            e.beginPath();
            e.arc(this.x / Ja.mapScale * ou.width, this.y / Ja.mapScale * ou.width, this.scale, 0, Math.PI * 2);
            e.stroke();
          }
        }
      };
    }
  }
  function ph(e, t) {
    for (var n = 0; n < dh.length; ++n) {
      if (!dh[n].active) {
        nh = dh[n];
        break;
      }
    }
    if (!nh) {
      nh = new hh();
      dh.push(nh);
    }
    nh.init(e, t);
  }
  function mh() {
    if (!Zr) {
      Pd ||= {};
      Pd.x = Do.x;
      Pd.y = Do.y;
    }
  }
  function fh(e) {
    Ed = e;
  }
  var gh = document.getElementById("chatBox");
  var yh = document.getElementById("chatHolder");
  function vh(e) {
    if (Zr || typeof e != "string" || e.charAt(0) !== "/") {
      return false;
    }
    if (qs.isStaff()) {
      return true;
    }
    var t = e.slice(1).split(/\s+/)[0].toLowerCase();
    return t === "login" || t === "logout";
  }
  function bh() {
    if (xh) {
      setTimeout(function () {
        var e = prompt("chat message");
        if (e) {
          if (vh(e)) {
            qs.sendCommand(e);
          } else if (Zr) {
            kh(e);
          } else {
            ca(e);
          }
        }
      }, 1);
    } else if (yh.style.display == "block") {
      if (gh.value) {
        if (vh(gh.value)) {
          qs.sendCommand(gh.value);
        } else if (Zr) {
          kh(gh.value);
        } else {
          ca(gh.value);
        }
      }
      wh();
    } else {
      if (Zr && Yl == null) {
        return;
      }
      du.style.display = "none";
      ru.style.display = "none";
      yh.style.display = "block";
      if (gh) {
        setTimeout(function () {
          gh.focus();
          if (typeof gh.select == "function") {
            gh.select();
          }
        }, 0);
      }
      Fh();
      if (Zr && document && document.body) {
        document.body.classList.add("spectate-chat-active");
      }
    }
    gh.value = "";
  }
  function wh() {
    gh.value = "";
    yh.style.display = "none";
    if (Zr && document && document.body) {
      document.body.classList.remove("spectate-chat-active");
    }
  }
  function kh(e) {
    if (Zr && Gl && typeof Gl.sendChat == "function" && Yl != null) {
      var t = (typeof e == "string" ? e : "").trim().slice(0, Mh);
      if (t) {
        Gl.sendChat(t);
      }
    }
  }
  function Sh(e, t) {
    var n = Cm(e);
    if (n) {
      n.chatMessage = t;
      n.chatCountdown = Ja.chatCountdown;
    }
  }
  var xh;
  var Ih;
  var Mh = 15;
  var Eh = 2600;
  var Ph = 6;
  function Th(e) {
    var t = Co(jo.spectateTextFilter);
    if (t === oo.HIDE_ALL) {
      return false;
    }
    if (!Do || !e || typeof Do.sid != "number" || typeof e.sid != "number") {
      return true;
    }
    var n = Do.sid === e.sid;
    var i = !!Do.team && !!e.team && Do.team === e.team;
    var r = !n && !i;
    if (t === oo.HIDE_SELF) {
      return !n;
    } else {
      return t !== oo.HIDE_ENEMY || !r;
    }
  }
  function Ah(e, t) {
    var n = Cm(e);
    if (n && Th(n)) {
      var i = (typeof t == "string" ? t : "").trim().slice(0, Mh);
      if (i) {
        n.spectateChats ||= [];
        var r = Math.random() * Math.PI * 2;
        var a = 110 + Math.random() * 70;
        n.spectateChats.push({
          text: i,
          age: 0,
          lifetime: Eh + Math.random() * 400,
          offsetX: (Math.random() - 0.5) * 18,
          offsetY: (Math.random() - 0.5) * 8,
          velX: Math.cos(r) * a,
          velY: Math.sin(r) * a
        });
        if (n.spectateChats.length > Ph) {
          n.spectateChats.shift();
        }
      }
    }
  }
  function Ch() {
    var e = Zr ? jl : 1;
    var t = Nl / e;
    var n = Fl / e;
    var i = Hl * e;
    dc.setTransform(i, 0, 0, i, (Jo * il - t * i) / 2, (Zo * il - n * i) / 2);
  }
  window.addEventListener("resize", qa.checkTrusted(Rh));
  var _h = qa.isMobile();
  function Rh() {
    var e;
    var t = (e = window.visualViewport) && e.width && e.height ? {
      w: Math.round(e.width),
      h: Math.round(e.height)
    } : {
      w: window.innerWidth,
      h: window.innerHeight
    };
    Jo = t.w;
    Zo = t.h;
    Hl = Math.max(Jo / Nl, Zo / Fl) * il;
    uc.width = Jo * il;
    uc.height = Zo * il;
    uc.style.width = Jo + "px";
    uc.style.height = Zo + "px";
    Ch();
  }
  function Bh() {
    if (_h) {
      try {
        var e = document.documentElement;
        var t = e.requestFullscreen || e.webkitRequestFullscreen || e.msRequestFullscreen;
        if (t && !document.fullscreenElement && !document.webkitFullscreenElement) {
          var n = t.call(e);
          if (n && typeof n.then == "function") {
            n.catch(function () {});
          }
        }
      } catch (e) {}
      try {
        if (screen.orientation && screen.orientation.lock) {
          var i = (screen.orientation.type || "").indexOf("landscape") === 0 ? "landscape" : "portrait";
          var r = screen.orientation.lock(i);
          if (r && typeof r.then == "function") {
            r.catch(function () {});
          }
        }
      } catch (e) {}
      setTimeout(Rh, 100);
    }
  }
  function Lh(e) {
    xh = e;
    if (Qo) {
      Qo.updateGuideState(xh);
    } else if (Tc) {
      if (xh) {
        Tc.classList.add("touch");
      } else {
        Tc.classList.remove("touch");
      }
    }
  }
  function Oh(e) {
    e.preventDefault();
    e.stopPropagation();
    Lh(true);
    Oo = 1;
    for (var t = 0; t < e.changedTouches.length; t++) {
      var n = e.changedTouches[t];
      if (n.identifier == Ol.id) {
        Ol.id = -1;
        Vh();
      } else if (n.identifier == Dl.id) {
        Dl.id = -1;
        if (Do.buildIndex >= 0) {
          Lo = 1;
          jh();
        }
        Lo = 0;
        jh();
      }
    }
  }
  function Dh() {
    var e = Jo || window.innerWidth || Nl;
    var t = Zo || window.innerHeight || Fl;
    var n = Math.max(t / Fl, e / Nl);
    if (!n || !isFinite(n)) {
      n = 1;
    }
    return {
      x: Xo + (Bl - e / 2) / n,
      y: qo + (Ll - t / 2) / n
    };
  }
  function Nh() {
    if (Do) {
      if (Dl.id != -1) {
        Ih = Math.atan2(Dl.currentY - Dl.startY, Dl.currentX - Dl.startX);
      } else if (!Do.lockDir && !xh) {
        Ih = Math.atan2(Ll - Zo / 2, Bl - Jo / 2);
      }
      return qa.fixTo(Ih || 0, 2);
    } else {
      return 0;
    }
  }
  function Fh() {
    if (!Zr) {
      if (tl && typeof tl.resetMovementState == "function") {
        tl.resetMovementState();
      }
      ua();
    }
  }
  function Hh(e) {
    nl = e;
    if (tl && typeof tl.updateMovementHotkeys == "function") {
      tl.updateMovementHotkeys(e);
    }
  }
  function jh() {
    if (!Zr && Do && Do.alive) {
      if (Lo === 1) {
        Vm();
      }
      if (Ja.botMode) {
        var e = Dh();
        da(Lo, Nh(), Oo || 1, e.x, e.y);
      } else {
        da(Lo, Nh(), Oo || 1);
      }
    }
  }
  if (_h) {
    document.documentElement.classList.add("is-mobile");
  }
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", qa.checkTrusted(Rh));
    window.visualViewport.addEventListener("scroll", qa.checkTrusted(Rh));
  }
  window.addEventListener("orientationchange", qa.checkTrusted(function () {
    setTimeout(Rh, 50);
    setTimeout(Rh, 250);
  }));
  window.enterFullscreenAndLock = Bh;
  Rh();
  Lh(false);
  window.setUsingTouch = Lh;
  uc.addEventListener("touchmove", qa.checkTrusted(function (e) {
    e.preventDefault();
    e.stopPropagation();
    Lh(true);
    for (var t = 0; t < e.changedTouches.length; t++) {
      var n = e.changedTouches[t];
      if (n.identifier == Ol.id) {
        Ol.currentX = n.pageX;
        Ol.currentY = n.pageY;
        Vh();
      } else if (n.identifier == Dl.id) {
        Dl.currentX = n.pageX;
        Dl.currentY = n.pageY;
        Lo = 1;
      }
    }
  }), false);
  uc.addEventListener("touchstart", qa.checkTrusted(function (e) {
    e.preventDefault();
    e.stopPropagation();
    Lh(true);
    Oo = 1;
    for (var t = 0; t < e.changedTouches.length; t++) {
      var n = e.changedTouches[t];
      if (n.pageX < document.body.scrollWidth / 2 && Ol.id == -1) {
        Ol.id = n.identifier;
        Ol.startX = Ol.currentX = n.pageX;
        Ol.startY = Ol.currentY = n.pageY;
        Vh();
      } else if (n.pageX > document.body.scrollWidth / 2 && Dl.id == -1) {
        Dl.id = n.identifier;
        Dl.startX = Dl.currentX = n.pageX;
        Dl.startY = Dl.currentY = n.pageY;
        if (Do && Do.alive && Do.buildIndex < 0) {
          Lo = 1;
          jh();
        }
      }
    }
  }), false);
  uc.addEventListener("touchend", qa.checkTrusted(Oh), false);
  uc.addEventListener("touchcancel", qa.checkTrusted(Oh), false);
  uc.addEventListener("touchleave", qa.checkTrusted(Oh), false);
  uc.addEventListener("mousemove", function (e) {
    e.preventDefault();
    e.stopPropagation();
    Lh(false);
    Bl = e.clientX;
    Ll = e.clientY;
  }, false);
  uc.addEventListener("mousedown", function (e) {
    Lh(false);
    if ((!El || Ml == null || Ml === "" || !function () {
      var e = _d(Ml);
      if (!e) {
        return false;
      }
      var t = Dd(e.id);
      if (!t) {
        return false;
      }
      var n = Dh();
      var i = Bd(Tl);
      var r = Ld(Pl);
      Tl = i;
      Pl = r;
      var a = {
        type: e.type,
        x: n.x,
        y: n.y,
        rotation: r,
        size: i,
        spritePath: t
      };
      if (e.data) {
        a.data = Object.assign({}, e.data);
      }
      if (e.layer !== undefined) {
        a.layer = e.layer;
      }
      if (e.id) {
        a.id = e.id;
      }
      Al.push(a);
      return true;
    }()) && (!kl || wl == null || !function () {
      if (wl == null) {
        return false;
      }
      var e = Ud(wl);
      if (!e) {
        return false;
      }
      var t;
      var n = Dh();
      var i = Gd(xl);
      var r = Yd(Sl);
      xl = i;
      Sl = r;
      var a = {
        id: wl,
        x: n.x,
        y: n.y,
        rotation: r,
        size: i,
        layer: 0
      };
      if (!yl[wl]) {
        a.imgSrc = e;
      }
      vl.push(a);
      t = gl.concat(vl);
      Cl.setDecorations(t);
      return true;
    }())) {
      Oo = 1;
      Lo = 1;
      jh();
    }
  }, false);
  uc.addEventListener("mouseup", function (e) {
    Lh(false);
    if ((!El || !Ml) && (!kl || wl == null)) {
      Oo = 1;
      Lo = 0;
      jh();
    }
  }, false);
  var zh = undefined;
  function Vh() {
    if (!Zr) {
      var e = function () {
        var e = 0;
        var t = 0;
        if (Ol.id != -1) {
          e += Ol.currentX - Ol.startX;
          t += Ol.currentY - Ol.startY;
        } else if (tl) {
          var n = tl.getKeyboardVector();
          e += n.dx;
          t += n.dy;
        }
        if (e == 0 && t == 0) {
          return undefined;
        } else {
          return qa.fixTo(Math.atan2(t, e), 2);
        }
      }();
      if (zh == null || e == null || Math.abs(e - zh) > 0.3) {
        ha(e);
        zh = e;
      }
    }
  }
  function Wh() {
    if (!Zr) {
      Do.lockDir = Do.lockDir ? 0 : 1;
      pa();
    }
  }
  function Uh() {
    if (!Zr) {
      ma();
    }
  }
  function Gh() {
    if (!Zr) {
      fa();
    }
  }
  function Yh(e, t, n) {
    if (!Zr) {
      ga(e, t);
    }
  }
  function Xh() {
    if (!Zr) {
      var e = Zc ? Zc.value : "";
      to("moo_name", e);
      if (!Wl) {
        if (!Zs()) {
          ko = true;
          Cd("Connecting to " + wo.name + "...", {
            withReload: false,
            keepMenuVisible: true
          });
          if (!So) {
            ju().finally(function () {
              Ys(true);
            });
          }
          return;
        }
        if (wu()) {
          xu({
            queued: true,
            inMatch: false,
            statusText: "Searching for an opponent..."
          });
          setTimeout(function () {
            Su();
          }, 1850);
          ya({
            name: e,
            moofoll: Ho,
            skin: jo.selectedSkinId,
            token: io,
            fpId: ro
          });
          return;
        }
        Wl = true;
        Cd("Loading...");
        ya({
          name: e,
          moofoll: Ho,
          skin: jo.selectedSkinId,
          token: io,
          fpId: ro
        });
      }
    }
  }
  function qh(e) {
    if (!e || typeof e != "object") {
      return "Duel finished.";
    }
    var t = Number(e.currentStreak);
    if (!isFinite(t) || t < 0) {
      t = 0;
    }
    switch (e.result) {
      case "win":
        if (t > 0) {
          return "Victory. Streak " + t + ".";
        } else {
          return "Victory.";
        }
      case "loss":
        return "Defeat.";
      default:
        return "Duel finished.";
    }
  }
  function Kh(e) {
    if (!Zr && wu() && e && typeof e == "object") {
      xu(e);
      if (!Wl) {
        if (Ac) {
          Ac.style.display = "none";
        }
        if (Pc) {
          Pc.style.display = "flex";
        }
        if (Ql) {
          Ql.style.display = "block";
        }
        if (Cc) {
          Cc.style.display = "none";
        }
        if (lu) {
          lu.style.display = "none";
        }
      }
    }
  }
  function Jh(e) {
    if (!Zr) {
      Wl = false;
      hd();
      sl.length = 0;
      al.length = 0;
      ll.length = 0;
      cl.length = 0;
      ol = [];
      Do = null;
      No = null;
      if (As && Array.isArray(As.texts)) {
        As.texts = [];
      }
      if (el && typeof el.updatePlayerItems == "function") {
        el.updatePlayerItems({
          items: [],
          weapons: []
        });
      }
      Xo = Ja.mapScale / 2;
      qo = Ja.mapScale / 2;
      ap();
      if (Cc) {
        Cc.style.display = "none";
      }
      if (Ac) {
        Ac.style.display = "none";
      }
      if (Pc) {
        Pc.style.display = "flex";
      }
      if (Ql) {
        Ql.style.display = "block";
      }
      if (lu) {
        lu.style.display = "none";
      }
      xu({
        queued: false,
        inMatch: false,
        currentStreak: e && e.currentStreak,
        bestStreak: e && e.bestStreak,
        statusText: qh(e)
      });
      if (e && Array.isArray(e.leaderboardRows)) {
        Io = {
          mode: "1vs1",
          rows: e.leaderboardRows
        };
        Tu();
      } else {
        Au(wo);
      }
      zu();
    }
  }
  var Zh = true;
  function Qh(e) {
    if (Zr) {
      $h();
    } else {
      if (wu()) {
        xu({
          queued: false,
          inMatch: true,
          statusText: "Match found."
        });
      }
      Ac.style.display = "none";
      Pc.style.display = "flex";
      Ql.style.display = "none";
      if (Cc) {
        Cc.style.display = "block";
      }
      if (tl && typeof tl.resetMovementState == "function") {
        tl.resetMovementState();
      }
      No = e;
      Lo = 0;
      Oo = 1;
      Wl = true;
      if (Zh) {
        Zh = false;
        ll.length = 0;
      }
      Wo.hatEquipPacketsSent = 0;
      Go();
      md();
    }
  }
  function $h() {
    if (Ac) {
      Ac.style.display = "none";
    }
    if (Pc) {
      Pc.style.display = "none";
    }
    if (Ql) {
      Ql.style.display = "none";
    }
    if (Cc) {
      Cc.style.display = "block";
    }
    if (tl && typeof tl.resetMovementState == "function") {
      tl.resetMovementState();
    }
    Wl = true;
    if (Zh) {
      Zh = false;
      ll.length = 0;
    }
  }
  function ep(e, t, n, i) {
    As.showText(e, t, 50, 0.18, 750, Math.abs(n), n >= 0 ? "#fff" : "#8ecc51");
  }
  var tp = 99999;
  function np() {
    if (!Zr) {
      if (wu()) {
        Jh({
          result: "loss"
        });
      } else {
        Wl = false;
        try {
          factorem.refreshAds([2], true);
        } catch (e) {}
        Cc.style.display = "none";
        hd();
        Md = {
          x: Do.x,
          y: Do.y
        };
        Ac.style.display = "none";
        lu.style.display = "block";
        lu.style.fontSize = "0px";
        tp = 0;
        setTimeout(function () {
          Pc.style.display = "flex";
          Ql.style.display = "block";
          lu.style.display = "none";
        }, Ja.deathFadeout);
        zu();
      }
    }
  }
  function ip(e) {
    if (Do) {
      wd.removeAllItems(e);
    }
  }
  function rp(e) {
    wd.disableBySid(e);
  }
  function ap() {
    var e = Zr ? Yl !== null ? Cm(Yl) : null : Do;
    var t = function (e) {
      return qa.kFormat(e) || "0";
    };
    if (!e) {
      Rc.innerText = "0";
      Bc.innerText = "0";
      Lc.innerText = "0";
      Oc.innerText = "0";
      Dc.innerText = "0";
      return;
    }
    Rc.innerText = t(e.points);
    Bc.innerText = t(e.food);
    Lc.innerText = t(e.wood);
    Oc.innerText = t(e.stone);
    Dc.innerText = e.kills;
  }
  var sp = {};
  var op = ["crown", "skull_1", "skull_2", "skull_3", "skull_4", "skull_5"];
  function lp(e, t) {
    if (dd) {
      dd.updateUpgrades(e, t);
    }
  }
  function cp(e, t, n) {
    if (Zr) {
      if (eu) {
        eu.innerHTML = "Hidden";
      }
      if (tu) {
        tu.style.width = "0%";
      }
      return;
    }
    if (e != null) {
      Do.XP = e;
    }
    if (t != null) {
      Do.maxXP = t;
    }
    if (n != null) {
      Do.age = n;
    }
    var i = Do.maxXP > 0 ? Do.XP / Do.maxXP * 100 : 0;
    if (i < 0) {
      i = 0;
    }
    if (i > 100) {
      i = 100;
    }
    if (n == Ja.maxAge) {
      eu.innerHTML = "MAX AGE";
      tu.style.width = "100%";
    } else {
      eu.innerHTML = "AGE " + Do.age;
      tu.style.width = i + "%";
    }
  }
  function up(e) {
    qa.removeAllChildren(Yc);
    var t = 1;
    for (var n = 0; n < e.length; n += 3) {
      (function (n) {
        qa.generateElement({
          class: "leaderHolder",
          parent: Yc,
          children: [qa.generateElement({
            class: "leaderboardItem",
            style: "color:" + (e[n] == No ? "#fff" : "rgba(255,255,255,0.6)"),
            text: t + ". " + (e[n + 1] != "" ? e[n + 1] : "unknown")
          }), qa.generateElement({
            class: "leaderScore",
            text: qa.kFormat(e[n + 2]) || "0"
          })]
        });
      })(n);
      t++;
    }
  }
  function dp(e, t, n, i) {
    dc.save();
    dc.setTransform(1, 0, 0, 1, 0, 0);
    dc.scale(il, il);
    var r = 50;
    dc.beginPath();
    dc.arc(e, t, r, 0, Math.PI * 2, false);
    dc.closePath();
    dc.fillStyle = "rgba(255, 255, 255, 0.3)";
    dc.fill();
    r = 50;
    var a = n - e;
    var s = i - t;
    var o = Math.sqrt(a * a + s * s);
    var l = o > r ? o / r : 1;
    a /= l;
    s /= l;
    dc.beginPath();
    dc.arc(e + a, t + s, r * 0.5, 0, Math.PI * 2, false);
    dc.closePath();
    dc.fillStyle = "white";
    dc.fill();
    dc.restore();
  }
  function hp(e, t, n, i) {
    if (!i || !t) {
      return {
        width: 0
      };
    }
    if (!e) {
      return {
        width: i.measureText(t).width
      };
    }
    var r = e._nameMetrics;
    if (!r || r.text !== t || r.fontSize !== n) {
      r = {
        text: t,
        fontSize: n,
        width: i.measureText(t).width
      };
      e._nameMetrics = r;
    }
    return r;
  }
  function pp(e, t, n) {
    if (!n || !t) {
      return {
        width: 0
      };
    }
    if (!e) {
      return {
        width: n.measureText(t).width
      };
    }
    var i = e._chatMetrics;
    if (!i || i.text !== t) {
      i = {
        text: t,
        width: n.measureText(t).width
      };
      e._chatMetrics = i;
    }
    return i;
  }
  function mp(e, t, n) {
    for (var i = 0; i < cl.length; ++i) {
      if ((Fo = cl[i]).active && Fo.layer == e) {
        Fo.update(_o);
        if (Fo.active && Sm(Fo.x, Fo.y, Fo.scale) && xm(Fo.x - t, Fo.y - n, Fo.scale)) {
          dc.save();
          dc.translate(Fo.x - t, Fo.y - n);
          yp(0, 0, Fo, dc, 0, Fo.dir);
          dc.restore();
        }
      }
    }
  }
  var fp;
  var gp = {};
  function yp(e, t, n, i, r, a) {
    if (n.src) {
      var s = xs.projectiles[n.indx].src;
      var o = gp[s];
      if (!o) {
        (o = ks()).onload = function () {
          this.isLoaded = true;
        };
        Ap(o, s);
        gp[s] = o;
      }
      if (o.isLoaded) {
        tm(i, o, a, s + "|projectile", n.scale, n.scale, true);
      }
    } else if (n.indx == 1) {
      i.fillStyle = "#939393";
      Ya(e, t, n.scale, i);
    }
  }
  function vp(e) {
    if (e) {
      return (e.hideFromEnemy ? 0.6 : 1) * (typeof e.opacity == "number" ? e.opacity : typeof e.alpha == "number" ? e.alpha : 1);
    } else {
      return 1;
    }
  }
  function bp(e) {
    var t = hl[e];
    var n = pl[e] || 0;
    if (t && n) {
      for (var i = 0; i < n; ++i) {
        var r = t[i];
        if (r && r.obj && !r.obj.isItem) {
          var a = Xp(r.obj);
          if (a && typeof r.baseX == "number" && typeof r.baseY == "number") {
            dc.globalAlpha = vp(r.obj);
            dc.drawImage(a, r.baseX - a.width / 2, r.baseY - a.height / 2);
          }
        }
      }
      dc.globalAlpha = 1;
    }
  }
  function wp(e, t, n) {
    var i;
    var r = hl[e];
    var a = pl[e] || 0;
    if (r && a) {
      for (var s = 0; s < a; ++s) {
        var o = r[s];
        Fo = o.obj;
        var l = o.x;
        var c = o.y;
        dc.globalAlpha = vp(Fo);
        if (Fo.isItem) {
          if (!(i = cm(Fo))) {
            continue;
          }
          dc.save();
          dc.translate(l, c);
          var u = typeof Fo.dir == "number" ? Fo.dir : 0;
          if (Fo && Fo.name === "boost pad") {
            u += Math.PI / 2;
          }
          var d = u;
          var h = d !== 0;
          var p = null;
          if (sm(Fo)) {
            p = om(Fo, i.width);
          }
          if (p) {
            dc.drawImage(i, -i.width / 2, -i.height / 2);
            tm(dc, p, d, Fo.id + "|top", p.width, p.height, h);
          } else {
            tm(dc, i, d, Fo.id + "|base", i.width, i.height, h);
          }
          if (Fo.blocker) {
            dc.strokeStyle = "#db6e6e";
            dc.globalAlpha = 0.3;
            dc.lineWidth = 6;
            Ya(0, 0, Fo.blocker, dc, false, true);
          }
          dc.restore();
          var m = nm(Fo);
          if (m && im(Fo)) {
            rm(l, c, Fo.scale, m);
          }
        } else {
          if (!(i = Yp(Fo))) {
            continue;
          }
          dc.drawImage(i, l - i.width / 2, c - i.height / 2);
        }
      }
    }
  }
  function kp(e, t, n) {
    if (Fo = Cm(e)) {
      Fo.startAnim(t, n);
    }
  }
  function Sp(e, t, n) {
    dc.globalAlpha = 1;
    for (var i = 0; i < sl.length; ++i) {
      if ((Fo = sl[i]).zIndex == n) {
        if (!Fo.visible) {
          continue;
        }
        if (!Sm(Fo.x, Fo.y, Fo.scale)) {
          continue;
        }
        var r = Fo.x - e;
        var a = Fo.y - t;
        if (!xm(r, a, Fo.scale)) {
          continue;
        }
        Fo.animate(_o);
        Fo.skinRot += _o * 0.002;
        Ko = (Fo == Do ? Nh() : Fo.dir) + Fo.dirPlus;
        dc.save();
        dc.translate(r, a);
        dc.rotate(Ko);
        xp(Fo, dc);
        dc.restore();
      }
    }
  }
  function xp(e, t) {
    var n;
    (t = t || dc).lineWidth = xd;
    t.lineJoin = "miter";
    Math.PI;
    xs.weapons[e.weaponIndex].armS;
    if (e.buildIndex < 0) {
      xs.weapons[e.weaponIndex].hndS;
    }
    if (e.buildIndex < 0) {
      xs.weapons[e.weaponIndex].hndD;
    }
    var i = ts(e ? e.bodySkin : undefined);
    var r = (n = es(i)) && typeof n.accentColor == "string" && n.accentColor.length ? n.accentColor : "#6D824E";
    if (e.buildIndex < 0 && !xs.weapons[e.weaponIndex].aboveHand) {
      _p(xs.weapons[e.weaponIndex], Ja.weaponVariants[e.weaponVariant].src, e.scale, 0, t);
      if (xs.weapons[e.weaponIndex].projectile != null && !xs.weapons[e.weaponIndex].hideProjectile) {
        yp(e.scale, 0, xs.projectiles[xs.weapons[e.weaponIndex].projectile], dc);
      }
    }
    t.save();
    if (e.buildIndex < 0 && xs.weapons[e.weaponIndex].aboveHand) {
      _p(xs.weapons[e.weaponIndex], Ja.weaponVariants[e.weaponVariant].src, e.scale, 0, t);
      if (xs.weapons[e.weaponIndex].projectile != null && !xs.weapons[e.weaponIndex].hideProjectile) {
        yp(e.scale, 0, xs.projectiles[xs.weapons[e.weaponIndex].projectile], dc);
      }
    }
    if (e.buildIndex >= 0) {
      var a = xs.list[e.buildIndex];
      var s = cm(a);
      if (s) {
        var o = e.scale - a.holdOffset;
        var l = -s.width / 2;
        var c = function (e) {
          if (!e || typeof e.name != "string") {
            return 0;
          }
          switch (e.name) {
            case "boost pad":
            case "apple":
              return Math.PI / 2;
            default:
              return 0;
          }
        }(a);
        var u = o + s.width / 2;
        var d = l + s.height / 2;
        t.save();
        t.translate(u, d);
        tm(t, s, c, a.id + "|heldBase", s.width, s.height, c !== 0);
        t.restore();
        if (sm(a)) {
          var h = om(a, s.width);
          if (h) {
            t.save();
            var p = o + h.width / 2;
            var m = l + h.height / 2;
            t.translate(p, m);
            tm(t, h, lm(a), a.id + "|heldTop", h.width, h.height, true);
            t.restore();
          }
        }
      }
    }
    var f = function (e) {
      var t;
      var n = (t = es(e)) && typeof t.imgPath == "string" && t.imgPath.length ? t.imgPath : null;
      if (!n) {
        return null;
      }
      var i = e;
      var r = Ip[i];
      if (!r) {
        (r = ks()).onload = function () {
          this.isLoaded = true;
        };
        r.src = n;
        Ip[i] = r;
      }
      if (r && r.isLoaded) {
        return r;
      } else {
        return null;
      }
    }(i);
    if (f) {
      var g = e.scale * 2 * ys;
      t.drawImage(f, -g / 2, -g / 2, g, g);
    } else {
      t.fillStyle = r;
      Ya(0, 0, e.scale, t);
    }
    t.restore();
    if (e.skinIndex > 0) {
      t.rotate(Math.PI / 2);
      Tp(e.skinIndex, t, null, e);
    }
  }
  var Ip = Object.create(null);
  var Mp = {};
  var Ep = {};
  var Pp = {};
  function Tp(e, t, n, i) {
    if (!(fp = Mp[e])) {
      var r = ks();
      r.onload = function () {
        this.isLoaded = true;
        this.onload = null;
      };
      r.src = ".././img/hats/hat_" + e + ".png";
      Mp[e] = r;
      fp = r;
    }
    var a = n || Pp[e];
    if (!a) {
      for (var s = 0; s < sd.length; ++s) {
        if (sd[s].id == e) {
          a = sd[s];
          break;
        }
      }
      Pp[e] = a;
    }
    if (!n && typeof e == "number") {
      var o = Ep[e];
      if (!o) {
        var l = ks();
        l.onload = function () {
          this.isLoaded = true;
          this.onload = null;
        };
        l.src = ".././img/hats/hat_" + e + "_shadow.png";
        Ep[e] = l;
        o = l;
      }
      if (o && o.isLoaded) {
        t.drawImage(o, -a.scale / 2, -a.scale / 2, a.scale, a.scale);
      }
    }
    if (fp.isLoaded) {
      t.drawImage(fp, -a.scale / 2, -a.scale / 2, a.scale, a.scale);
    }
    if (!n && a.topSprite) {
      t.save();
      t.rotate(i.skinRot);
      Tp(e + "_top", t, a, i);
      t.restore();
    }
  }
  function Ap(e, t) {
    var n = ".././img/newweapons/" + t + ".png";
    e.onerror = function () {
      e.failed = true;
    };
    e.src = n;
  }
  var Cp = {};
  function _p(e, t, n, i, r) {
    var a = e.src + (t || "");
    var s = Cp[a];
    if (!s) {
      (s = ks()).onload = function () {
        this.isLoaded = true;
      };
      Ap(s, a);
      Cp[a] = s;
    }
    if (s.isLoaded) {
      r.drawImage(s, n + e.xOff - e.length / 2, i + e.yOff - e.width / 2, e.length, e.width);
    }
  }
  var Rp = {
    0: "trees",
    1: "bushes",
    2: "stones",
    3: "gold"
  };
  var Bp = {};
  var Lp = {};
  var Op = null;
  var Dp = "missingTexture";
  var Np = {};
  function Fp(e) {
    if (typeof e != "string" || !e.length) {
      return null;
    }
    var t = e.lastIndexOf(".");
    if (t === -1) {
      return e + "_d";
    } else {
      return e.slice(0, t) + "_d" + e.slice(t);
    }
  }
  function Hp(e, t) {
    var n = Rp[e.type];
    if (!n) {
      return null;
    }
    var i = vs[n] || {};
    var r = typeof i.sizeMultiplier == "number" ? i.sizeMultiplier : 1;
    var a = i.path;
    var s = n;
    if (!t || (s += "_decoration", a = i.decorationPath || Fp(a))) {
      return function (e, t, n, i) {
        var r;
        var a;
        var s = null;
        if (typeof i != "number" || !isFinite(i)) {
          i = 1;
        }
        if (typeof n == "string" && n.length) {
          r = t;
          a = n;
          s = Fa.getOrCreateImageBase(Bp, Lp, r, a, ks, {
            cacheKeyPrefix: r,
            clearOnCreate: true,
            clearKeyPrefix: r
          });
        } else {
          if (Bp[t]) {
            delete Bp[t];
          }
          (function (e) {
            for (var t = Object.keys(Lp), n = 0; n < t.length; ++n) {
              if (t[n].indexOf(e + "|") === 0) {
                delete Lp[t[n]];
              }
            }
          })(t);
        }
        if (!s || !!s.failed) {
          s = zp();
        }
        if (!s || !s.img.isLoaded) {
          return null;
        }
        var o = (s.cacheKey || Dp + "|" + bs) + "|" + e.scale + "|" + i;
        var l = Math.max(1, Math.round(e.scale * 2 * i));
        return Fa.getOrCreateSpriteCanvas(Lp, o, l, null, function (e) {
          e.drawImage(s.img, 0, 0, l, l);
        });
      }(e, s, a, r);
    } else {
      return null;
    }
  }
  function jp(e) {
    return Fa.getOrCreateCachedImage(Np, e, ks);
  }
  function zp() {
    if (!Op) {
      var e = ks();
      Op = {
        img: e,
        path: bs,
        cacheKey: Dp
      };
      e.onload = function () {
        this.isLoaded = true;
      };
      e.src = bs;
    }
    return Op;
  }
  function Vp(e) {
    var t = Math.max(1, Math.round(e));
    return Math.ceil(t * Math.SQRT2) + xd;
  }
  var Wp = {};
  var Up = {};
  function Gp(e, t, n, i, r, a, s) {
    o = e;
    if (!Fa.canUseCachedImage(o)) {
      return null;
    }
    var o;
    var l = r;
    if (a) {
      l += "|" + t;
    }
    var c = i[l += "|" + (n ? n.toFixed(4) : "0")];
    if (c) {
      return c;
    }
    var u = typeof s == "number" && s > 0 ? s : Vp(t);
    var d = document.createElement("canvas");
    d.width = d.height = u;
    var h = d.getContext("2d");
    h.translate(d.width / 2, d.height / 2);
    if (n) {
      h.rotate(n);
    }
    h.drawImage(e, -t / 2, -t / 2, t, t);
    i[l] = d;
    return d;
  }
  function Yp(e) {
    if (e && e.spritePath && Up[e.id]) {
      var t = Up[e.id];
      var n = jp(e.spritePath);
      var i = e.scale * 2;
      var r = function (e, t, n) {
        if (!e) {
          return null;
        }
        if (n && typeof e.dir == "number") {
          return e.dir;
        }
        if (!t) {
          return null;
        }
        var i = e[t];
        if (typeof i != "number") {
          i = e[t] = qa.randFloat(0, Math.PI * 2);
        }
        return i;
      }(e, t.rotationProp, t.allowDir);
      var a = t.useOutlinePad ? i + xd : null;
      var s = e.id + "|" + e.scale;
      var o = Gp(n, i, r, Wp, s, false, a);
      if (o) {
        return o;
      }
    }
    return Hp(e, false) || null;
  }
  function Xp(e) {
    if (!e || e.isItem) {
      return null;
    }
    var t;
    var n;
    var i;
    var r = e.decorationPath || e.spritePath;
    if (r) {
      t = e;
      n = e.decorationPath || Fp(r);
      i = function (e) {
        if (!e) {
          return null;
        }
        switch (e.id) {
          case os:
            return "palmRot";
          case ls:
            return "darkRot";
          case us:
            return "sakuraRot";
          case ds:
            return "autRot";
          case hs:
            return "winterRot";
          default:
            return null;
        }
      }(e);
      if (typeof n == "string" && n.length) {
        return Gp(jp(n), t.scale * 2, function (e, t) {
          if (!e) {
            return null;
          }
          if (typeof e.dir == "number") {
            return e.dir;
          }
          if (!t) {
            return null;
          }
          var n = e[t];
          if (typeof n != "number") {
            n = e[t] = qa.randFloat(0, Math.PI * 2);
          }
          return n;
        }(t, i), fl, n, true);
      } else {
        return null;
      }
    } else {
      return Hp(e, true);
    }
  }
  Up[os] = {
    rotationProp: "palmRot",
    allowDir: true
  };
  Up[ls] = {
    rotationProp: "darkRot",
    allowDir: true
  };
  Up[cs] = {
    rotationProp: null,
    allowDir: false,
    useOutlinePad: true
  };
  Up[us] = {
    rotationProp: "sakuraRot",
    allowDir: true
  };
  Up[ds] = {
    rotationProp: "autRot",
    allowDir: true
  };
  Up[hs] = {
    rotationProp: "winterRot",
    allowDir: true
  };
  var qp = [];
  var Kp = Object.create(null);
  var Jp = Object.create(null);
  var Zp = Math.PI / 180;
  var Qp = [];
  var $p = 700;
  function em(e) {
    if (!e || isNaN(e)) {
      return 0;
    }
    var t = e % $s;
    if (t < 0) {
      return t + $s;
    } else {
      return t;
    }
  }
  function tm(e, t, n, i, r, a, s) {
    if (!e || !t) {
      return false;
    }
    var o = typeof r == "number" && r > 0 ? r : t.width;
    var l = typeof a == "number" && a > 0 ? a : t.height;
    if (!o || !l) {
      return false;
    }
    var c = em(n || 0);
    if (!c) {
      e.drawImage(t, -o / 2, -l / 2, o, l);
      return true;
    }
    if (s && i) {
      var u = function (e, t, n, i, r) {
        if (!e || !n) {
          return null;
        }
        var a = typeof i == "number" && i > 0 ? i : e.width;
        var s = typeof r == "number" && r > 0 ? r : e.height;
        if (!a || !s) {
          return null;
        }
        var o = em(t);
        var l = Math.round(o / Zp);
        var c = l * Zp;
        var u = n + "|" + a + "|" + s + "|" + l;
        var d = Jp[u];
        if (d) {
          return d;
        }
        var h = Vp(Math.max(a, s));
        var p = document.createElement("canvas");
        p.width = p.height = h;
        var m = p.getContext("2d");
        m.translate(p.width / 2, p.height / 2);
        if (c) {
          m.rotate(c);
        }
        m.drawImage(e, -a / 2, -s / 2, a, s);
        Jp[u] = p;
        Qp.push(u);
        if (Qp.length > $p) {
          var f = Qp.shift();
          if (f && f !== u) {
            delete Jp[f];
          }
        }
        return p;
      }(t, c, i, o, l);
      if (u) {
        e.drawImage(u, -u.width / 2, -u.height / 2);
        return true;
      }
    }
    e.save();
    e.rotate(c);
    e.drawImage(t, -o / 2, -l / 2, o, l);
    e.restore();
    return true;
  }
  function nm(e) {
    if (!Do || !e || !e.owner || typeof e.owner.sid != "number" || e.owner.sid < 0) {
      return null;
    }
    if (e.owner.sid === Do.sid) {
      return "#A1BF70";
    }
    var t = Cm(e.owner.sid);
    if (Do.team && t && t.team && t.team === Do.team) {
      return "#FECB7A";
    } else {
      return "#C15E63";
    }
  }
  function im(e) {
    if (!e) {
      return false;
    }
    var t = e.name || "";
    if (!t) {
      var n = am(e);
      if (n && n.name) {
        t = n.name;
      }
    }
    return (t = typeof t == "string" ? t.toLowerCase() : "").indexOf("windmill") !== -1 || t.indexOf("power mill") !== -1;
  }
  function rm(e, t, n, i) {
    var r = Math.max(3, Math.min(7, n * 0.18));
    dc.save();
    dc.globalAlpha = 1;
    dc.fillStyle = i;
    dc.strokeStyle = "rgba(0, 0, 0, 0.6)";
    dc.lineWidth = 2;
    dc.beginPath();
    dc.arc(e, t, r, 0, $s);
    dc.fill();
    dc.stroke();
    dc.restore();
  }
  function am(e) {
    if (e) {
      if (typeof e.id == "number" && xs.list[e.id]) {
        return xs.list[e.id];
      } else if (typeof e.imgTopPath == "string") {
        return e;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  function sm(e) {
    var t = am(e);
    return !!t && typeof t.imgTopPath == "string" && !!(t.imgTopPath.length > 0);
  }
  function om(e, t) {
    var n = am(e);
    if (!n || !n.imgTopPath) {
      return null;
    }
    var i;
    var r = typeof t == "number" && t > 0 ? t : Cs.resolveDrawSize(n, null, true);
    var a = n.id + "|" + r;
    var s = (i = n) && i.imgTopPath ? Cs.resolveImagePath(Object.assign({}, i, {
      imgPath: i.imgTopPath
    })) : null;
    if (!s) {
      return null;
    }
    var o = Kp[a];
    if (!o || o.path !== s) {
      var l = ks();
      o = {
        canvas: document.createElement("canvas"),
        img: l,
        size: 0,
        path: s,
        isLoaded: false,
        needsDraw: true
      };
      l.onload = function () {
        o.isLoaded = true;
        o.needsDraw = true;
      };
      l.src = s;
      Kp[a] = o;
    }
    if (o.size !== r) {
      o.canvas.width = o.canvas.height = r;
      o.size = r;
      o.needsDraw = true;
    }
    if (!o.isLoaded) {
      return null;
    }
    if (o.needsDraw) {
      var c = o.canvas.getContext("2d");
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.clearRect(0, 0, r, r);
      c.translate(r / 2, r / 2);
      c.drawImage(o.img, -r / 2, -r / 2, r, r);
      o.needsDraw = false;
    }
    return o.canvas;
  }
  function lm(e) {
    var t = am(e);
    if (!t) {
      return 0;
    }
    var n = typeof t.turnSpeed == "number" ? t.turnSpeed : 0;
    if (n) {
      return n * (typeof performance != "undefined" && performance && typeof performance.now == "function" ? performance.now() : Date.now()) % (Math.PI * 2);
    } else {
      return 0;
    }
  }
  function cm(e, t, n) {
    if (typeof n != "boolean") {
      n = true;
    }
    if (!e) {
      return null;
    }
    var i = am(e);
    if (e && e.spritePath) {
      var r = qp[e.id];
      var a = Cs.resolveDrawSize(e, null, true);
      var s = i && i.spritePadding ? i.spritePadding : 0;
      var o = a + xd + s;
      if (!r) {
        (r = document.createElement("canvas"))._img = ks();
        r._img.onload = function () {
          r._imgLoaded = true;
        };
        r._img.src = e.spritePath;
      }
      if (r.width !== o || r.height !== o) {
        r.width = r.height = o;
        r._lastKey = null;
      }
      if (r._img && r._imgLoaded) {
        var l = r.getContext("2d");
        var c = typeof e.spriteRotation == "number" ? e.spriteRotation : 0;
        var u = e.scale * 2;
        var d = o + "|" + c.toFixed(4) + "|" + u;
        if (r._lastKey !== d) {
          l.setTransform(1, 0, 0, 1, 0, 0);
          l.clearRect(0, 0, r.width, r.height);
          l.translate(r.width / 2, r.height / 2);
          if (c) {
            l.rotate(c);
          }
          l.drawImage(r._img, -u / 2, -u / 2, u, u);
          r._lastKey = d;
        }
      }
      r._usesImage = true;
      qp[e.id] = r;
      return r;
    }
    if (n && Cs) {
      var h = null;
      if (Cs.isPlaceableItem(e)) {
        h = e;
      } else if (i && typeof i.imgPath == "string" && i.imgPath.length) {
        h = Object.assign({}, e, {
          imgPath: i.imgPath
        });
      }
      if (h) {
        var p = Cs.getSprite(h);
        if (p) {
          return p;
        }
      }
    }
    var m = qp[e.id];
    if (!m || t) {
      a = Cs.resolveDrawSize(e, null, true);
      var f = document.createElement("canvas");
      var g = i || null;
      var y = g && g.spritePadding ? g.spritePadding : 0;
      f.width = f.height = a + xd + y;
      var v = f.getContext("2d");
      v.translate(f.width / 2, f.height / 2);
      v.rotate(t ? 0 : Math.PI / 2);
      v.strokeStyle = kd;
      v.lineWidth = xd * (t ? f.width / 81 : 1);
      v.lineJoin = "round";
      v.lineCap = "round";
      m = f;
      if (!t) {
        qp[e.id] = m;
      }
      return m;
    }
  }
  function um(e, t) {
    if (Array.isArray(e) && e.length) {
      for (var n = 0; n < e.length; ++n) {
        if (typeof e[n] == "number" && !isNaN(e[n])) {
          return e[n];
        }
      }
    } else if (typeof e == "number" && !isNaN(e)) {
      return e;
    }
    return t;
  }
  function dm(e) {
    (e || []).slice(0, 16);
    for (var t = 0; t < e.length;) {
      var n;
      var i = e[t + 6];
      n = i === os ? {
        id: os,
        palm: true,
        name: "palm",
        isItem: false,
        spritePath: ".././img/world/palmtree_1.png"
      } : i === ls ? {
        id: ls,
        darkStone: true,
        name: "darkstone",
        isItem: false,
        spritePath: ".././img/world/darkstone_1.png"
      } : i === cs ? {
        id: cs,
        sakura: true,
        name: "sakura-bush",
        isItem: false,
        spritePath: ".././img/world/sakurabush_1.png"
      } : i === us ? {
        id: us,
        sakura: true,
        name: "sakura-tree",
        isItem: false,
        spritePath: ".././img/world/sakuratree_1.png"
      } : i === ds ? {
        id: ds,
        autumn: true,
        name: "autumn-tree",
        isItem: false,
        spritePath: ".././img/world/automntree_1.png"
      } : xs.list[i] || gs(i);
      var r = e[t + 3];
      if (typeof r != "number") {
        r = n && sm(n) ? lm(n) : 0;
      }
      wd.add(e[t], e[t + 1], e[t + 2], r, e[t + 4], e[t + 5], n, true, e[t + 7] >= 0 ? {
        sid: e[t + 7]
      } : null);
      t += 8;
    }
  }
  function hm(e, t, n) {
    if (e) {
      var i = Ja.physics || {};
      var r = typeof i.wiggleMaxForce == "number" ? i.wiggleMaxForce : n * 4;
      var a = n * Math.cos(t);
      var s = n * Math.sin(t);
      if (typeof e.wiggleForceX != "number") {
        e.wiggleForceX = 0;
      }
      if (typeof e.wiggleForceY != "number") {
        e.wiggleForceY = 0;
      }
      e.wiggleForceX = Math.max(-r, Math.min(r, e.wiggleForceX + a));
      e.wiggleForceY = Math.max(-r, Math.min(r, e.wiggleForceY + s));
      e.wigglePhase = 0;
      e.xWiggle = e.wiggleForceX;
      e.yWiggle = e.wiggleForceY;
    }
  }
  function pm(e, t) {
    if (Fo = Rm(t)) {
      hm(Fo, e, Ja.gatherWiggle);
    }
  }
  function mm(e, t) {
    if (Fo = Rm(e)) {
      Fo.dir = t;
      hm(Fo, t + Math.PI, Ja.gatherWiggle);
    }
  }
  function fm(e, t, n, i, r, a, s, o) {
    if (Td) {
      ul.addProjectile(e, t, n, i, r, a, null, null, s).sid = o;
    }
  }
  function gm(e, t) {
    for (var n = 0; n < cl.length; ++n) {
      if (cl[n].sid == e) {
        cl[n].range = t;
      }
    }
  }
  function ym(e) {
    if (Fo = _m(e)) {
      Fo.startAnim();
    }
  }
  function vm(e, t, n) {
    var i = dl.entityTypes[t];
    var r = i && typeof i.health == "number" ? i.health : typeof e.maxHealth == "number" ? e.maxHealth : 100;
    e.maxHealth = r;
    if (typeof n != "number") {
      e.health = r;
    } else {
      if (n > r) {
        n = r;
      }
      if (n < 0) {
        n = 0;
      }
      e.health = n;
    }
  }
  function bm(e) {
    var t = Array.isArray(e);
    for (var n = 0; n < al.length; ++n) {
      al[n].forcePos = true;
      al[n].visible = false;
    }
    if (t && !(e.length < 7)) {
      var i = Date.now();
      for (n = 0; n + 6 < e.length;) {
        var r = e[n];
        var a = e[n + 1];
        var s = e[n + 2];
        var o = e[n + 3];
        var l = e[n + 4];
        var c = e[n + 5];
        var u = e[n + 6];
        if (s != null && o != null) {
          if (Fo = _m(r)) {
            Fo.index = a;
            Fo.t1 = Fo.t2 === undefined ? i : Fo.t2;
            Fo.t2 = i;
            Fo.x1 = Fo.x;
            Fo.y1 = Fo.y;
            Fo.x2 = s;
            Fo.y2 = o;
            Fo.d1 = Fo.d2 === undefined ? l : Fo.d2;
            Fo.d2 = l;
            vm(Fo, Fo.index, c);
            Fo.dt = 0;
            Fo.visible = true;
            Fo.forcePos = false;
          } else {
            (Fo = dl.spawn(s, o, l, a)).x2 = Fo.x;
            Fo.y2 = Fo.y;
            Fo.d2 = Fo.dir;
            vm(Fo, a, c);
            var d = dl.entityTypes[a];
            if (d && d.name != null) {
              Fo.name = d.name;
            } else if (d && d.hideName) {
              Fo.name = "";
            } else {
              Fo.name = Ja.cowNames[u];
            }
            Fo.forcePos = true;
            Fo.sid = r;
            Fo.visible = true;
          }
          n += 7;
        } else {
          n += 7;
        }
      }
    }
  }
  var wm = {};
  function km(e, t, n) {
    var i = e.index;
    var r = wm[i];
    var a = e.spritePath || ".././img/animals/" + e.src + ".png";
    if (!r) {
      var s = ks();
      s.onload = function () {
        this.isLoaded = true;
        this.onload = null;
      };
      s.src = a;
      r = s;
      wm[i] = r;
    }
    if (r.isLoaded) {
      var o = (typeof e.spriteScale == "number" ? e.spriteScale : null) || e.spriteMlt || 1;
      var l = e.scale * 1.2 * o;
      tm(t, r, n, a + "|animal|" + i, l * 2, l * 2, !!n);
    }
  }
  function Sm(e, t, n) {
    if (typeof Xo != "number" || typeof qo != "number") {
      return true;
    }
    var i = Math.max(0, n || 0);
    var r = 2000 / (Zr ? jl : 1) + i;
    var a = e - Xo;
    var s = t - qo;
    return a * a + s * s <= r * r;
  }
  function xm(e, t, n) {
    var i = Math.max(0, n || 0);
    var r = Zr ? jl : 1;
    var a = Nl / r;
    var s = Fl / r;
    return !!Sm(e + (Xo - a / 2), t + (qo - s / 2), i) && e + i >= 0 && e - i <= a && t + i >= 0 && t - i <= s;
  }
  function Im(e, t) {
    var n = function (e) {
      for (var t = 0; t < sl.length; ++t) {
        if (sl[t].id == e) {
          return sl[t];
        }
      }
      return null;
    }(e[0]);
    var i = Date.now();
    if (!n) {
      n = new Ms(e[0], e[1], Ja, qa, ul, wd, sl, al, xs, sd);
      sl.push(n);
    }
    n.spawn(t ? Ho : null);
    n.visible = false;
    n.x2 = undefined;
    n.y2 = undefined;
    n.setData(e);
    n.d1 = n.dir;
    n.d2 = n.dir;
    n.t1 = i;
    n.t2 = i;
    if (t) {
      if (!Zr) {
        Do = n;
        if (Fm) {
          Fm.resetStats();
        }
        Xo = Do.x;
        qo = Do.y;
        bd();
        ap();
        cp();
        lp(0);
        Cc.style.display = "block";
      }
    }
  }
  function Mm(e) {
    for (var t = 0; t < sl.length; t++) {
      if (sl[t].id == e) {
        var n = sl[t].sid;
        sl.splice(t, 1);
        if (Zr && Yl !== null && n === Yl) {
          Yl = null;
          Xl = "";
          Gm();
          rf(false);
          if (Ul) {
            Ul.setTarget(null);
            Ul.setStatus("Player left. Choose someone else.");
          }
          Xm();
        }
        break;
      }
    }
  }
  function Em(e, t) {
    if (!Zr) {
      if (Do) {
        Do.itemCounts[e] = t;
      }
    }
  }
  function Pm(e, t, n) {
    var i = Zr ? Yl !== null ? Cm(Yl) : null : Do;
    if (i) {
      i[e] = t;
      if (n) {
        ap();
      }
    }
  }
  function Tm(e, t, n) {
    if (Fo = Cm(e)) {
      Fo.health = t;
      if (typeof n == "number" && !isNaN(n)) {
        Fo.maxHealth = n;
      }
    }
  }
  function Am(e) {
    var t = Date.now();
    for (var n = 0; n < sl.length; ++n) {
      sl[n].forcePos = !sl[n].visible;
      sl[n].visible = false;
    }
    for (n = 0; n < e.length;) {
      if (Fo = Cm(e[n])) {
        Fo.t1 = Fo.t2 === undefined ? t : Fo.t2;
        Fo.t2 = t;
        Fo.x1 = Fo.x;
        Fo.y1 = Fo.y;
        Fo.x2 = e[n + 1];
        Fo.y2 = e[n + 2];
        Fo.d1 = Fo.d2 === undefined ? e[n + 3] : Fo.d2;
        Fo.d2 = e[n + 3];
        Fo.dt = 0;
        Fo.buildIndex = e[n + 4];
        Fo.weaponIndex = e[n + 5];
        Fo.weaponVariant = e[n + 6];
        var i = e[n + 7];
        var r = typeof i == "number" && i >= 0 && ol[i] ? ol[i].sid : null;
        Fo.team = r;
        Fo.isLeader = e[n + 8];
        Fo.skinIndex = e[n + 9];
        Fo.tailIndex = 0;
        Fo.tail = null;
        Fo.iconIndex = e[n + 11];
        Fo.zIndex = e[n + 12];
        Fo.cps = typeof e[n + 13] == "number" ? Math.max(0, Math.round(e[n + 13])) : 0;
        Fo.ping = typeof e[n + 14] == "number" ? Math.max(-1, Math.round(e[n + 14])) : -1;
        Fo.visible = true;
      }
      n += 15;
    }
    if (Zr) {
      ap();
    }
  }
  function Cm(e) {
    for (var t = 0; t < sl.length; ++t) {
      if (sl[t].sid == e) {
        return sl[t];
      }
    }
    return null;
  }
  function _m(e) {
    for (var t = 0; t < al.length; ++t) {
      if (al[t].sid == e) {
        return al[t];
      }
    }
    return null;
  }
  function Rm(e) {
    for (var t = 0; t < ll.length; ++t) {
      if (ll[t].sid == e) {
        return ll[t];
      }
    }
    return null;
  }
  var Bm;
  var Lm;
  var Om;
  var Dm;
  var Nm;
  var Fm = null;
  function Hm() {
    if (!Fm) {
      if (typeof Ba == "function") {
        (Fm = new Ba({
          documentRef: document,
          sendPerformanceStats: wa,
          pingSocket: Sa,
          getPlayer: function () {
            return Do || null;
          },
          socketReady: function () {
            return !!Ls;
          },
          getEntityCounts: function () {
            return {
              players: sl.length,
              animals: al.filter(function (e) {
                return e.active;
              }).length,
              gameObjects: ll.filter(function (e) {
                return e.active;
              }).length,
              projectiles: cl.filter(function (e) {
                return e.active;
              }).length
            };
          }
        })).init();
        jm();
        zm();
      }
    }
  }
  function jm() {
    if (Fm) {
      Fm.setShowPing(!!jo.showPing);
    }
  }
  function zm() {
    if (Fm) {
      Fm.setShowPerfOverlay(!!jo.showPerfOverlay);
    }
  }
  function Vm() {
    if (Fm) {
      Fm.recordClickEvent();
    }
  }
  function Wm() {
    if (Fm) {
      Fm.handlePingResponse();
    }
  }
  function Um() {
    if (Fm) {
      Fm.sendPing();
    } else {
      Sa();
    }
  }
  function Gm() {
    sl.length = 0;
    al.length = 0;
    ll.length = 0;
    cl.length = 0;
    Do = null;
    Xo = Ja.mapScale / 2;
    qo = Ja.mapScale / 2;
    Kl.items = [];
    Kl.weapons = [];
    if (el) {
      el.updatePlayerItems({
        items: [],
        weapons: []
      });
    }
    if (Rc) {
      Rc.innerText = "0";
    }
    if (Dc) {
      Dc.innerText = "0";
    }
  }
  function Ym(e) {
    if (!Array.isArray(Jl) || !Jl.length) {
      return -1;
    }
    for (var t = 0; t < Jl.length; t++) {
      if (Jl[t] && Jl[t].sid === e) {
        return t;
      }
    }
    return -1;
  }
  function Xm() {
    if (Zr) {
      var e = Array.isArray(Jl) && Jl.length > 0;
      var t = "No players";
      if (Yl !== null) {
        var n = Ym(Yl);
        if (n >= 0 && Jl[n]) {
          t = Jl[n].name || "Player";
        } else if (Xl) {
          t = Xl;
        }
      } else if (e) {
        t = Jl[0].name || "Player";
      }
      if (jc) {
        jc.textContent = t;
      }
      if (zc) {
        zc.disabled = Jl.length < 2;
      }
      if (Vc) {
        Vc.disabled = Jl.length < 2;
      }
      if (Hc) {
        Hc.style.display = "flex";
      }
    }
  }
  function qm(e) {
    if (Zr && Array.isArray(Jl) && Jl.length) {
      var t = Ym(Yl);
      if (t < 0) {
        t = 0;
      }
      var n = (t + e + Jl.length) % Jl.length;
      var i = Jl[n];
      if (i && typeof i.sid == "number") {
        Zm(i.sid, i.name || "");
      }
    }
  }
  var Km = false;
  function Jm() {
    if (Gl && typeof Gl.requestRoster == "function") {
      Gl.requestRoster();
    }
  }
  function Zm(e, t) {
    if (Gl) {
      ql = e;
      Xl = t || "";
      if (Ul) {
        Ul.setStatus("Joining " + (Xl || "player") + "...");
        Ul.setTarget(null);
      }
      Gm();
      rf(false);
      Gl.setTarget(e);
    }
  }
  function Qm(e) {
    if (Zr) {
      if (Ul) {
        Ul.setStatus("Connecting...");
      }
      Jm();
    }
  }
  function $m(e) {
    if (Zr && Ul) {
      Jl = Array.isArray(e) ? e.slice() : [];
      Ul.setPlayers(e);
      if (Yl === null && ql !== null) {
        var t = Ym(ql);
        if (t >= 0 && Jl[t]) {
          Zm(Jl[t].sid, Jl[t].name || Xl || "");
          Xm();
          return;
        }
        ql = null;
      }
      if (Yl === null && ql === null && Jl.length) {
        var n = Jl[0];
        if (n && typeof n.sid == "number") {
          Zm(n.sid, n.name || "");
        }
      }
      Xm();
    }
  }
  function ef(e, t) {
    if (Zr) {
      ql = null;
      Xl = typeof t == "string" ? t : "";
      if ((Yl = typeof e == "number" ? e : null) === null) {
        Gm();
      }
      rf(Yl !== null);
      if (Ul) {
        Ul.setTarget(Yl);
        if (Yl !== null) {
          Ul.setStatus("Watching " + (Xl || "player") + ".");
        } else {
          Ul.setStatus("No active players.");
        }
      }
      Xm();
    }
  }
  function tf(e) {
    if (Zr) {
      ql = null;
      rf(false);
      if (Ul) {
        Ul.setStatus("Unable to spectate player.");
      }
    }
  }
  function nf(e) {
    if (!Zr) {
      var t = typeof e == "number" ? e : parseInt(e, 10);
      if (!isFinite(t) || t < 0) {
        t = 0;
      }
      if (Fc) {
        Fc.textContent = String(t);
      }
      if (Nc) {
        Nc.style.display = "inline-flex";
      }
    }
  }
  function rf(e) {
    if (Zr && document && document.body) {
      document.body.classList.toggle("spectate-idle", !e);
      document.body.classList.toggle("spectate-active", !!e);
    }
  }
  function af(e) {
    if (!(e < 0)) {
      var t = Math.floor(e / 60);
      var n = e % 60;
      n = ("0" + n).slice(-2);
      Ec.innerText = "Server restarting in " + t + ":" + n;
      Ec.hidden = false;
    }
  }
  window.requestAnimationFrame = window.requestAnimationFrame || function (e) {
    window.setTimeout(e, 1000 / 60);
  };
  Bm = Ja.mapScale / 2;
  Lm = um(Ja.treeScales, 165);
  Om = um(Ja.bushScales, 90);
  Dm = um(Ja.rockScales, 110);
  Nm = um(Ja.goldScales, Dm);
  wd.add(0, Bm - 200, Bm + 350, 0, Lm, 0);
  wd.add(1, Bm + 150, Bm - 300, 0, Lm, 0);
  wd.add(2, Bm + 500, Bm + 200, 0, Lm, 0);
  wd.add(3, Bm - 850, Bm - 250, 0, Lm, 0);
  wd.add(4, Bm - 600, Bm - 500, 0, Lm, 0);
  wd.add(5, Bm - 900, Bm + 350, 0, Lm, 0);
  wd.add(6, Bm + 700, Bm - 100, 0, Lm, 0);
  wd.add(7, Bm + 400, Bm + 500, 0, Lm, 0);
  wd.add(8, Bm + 100, Bm + 600, 0, Lm, 0);
  wd.add(9, Bm - 450, Bm - 100, 0, Lm, 0);
  wd.add(10, Bm + 850, Bm + 250, 0, Lm, 0);
  wd.add(11, Bm - 350, Bm + 250, 0, Om, 1);
  wd.add(12, Bm + 650, Bm + 400, 0, Om, 1);
  wd.add(13, Bm - 700, Bm + 150, 0, Om, 1);
  wd.add(14, Bm + 200, Bm - 550, 0, Om, 1);
  wd.add(15, Bm - 100, Bm - 200, 0, Om, 1);
  wd.add(16, Bm + 350, Bm + 100, 0, Om, 1);
  wd.add(17, Bm - 550, Bm + 600, 0, Om, 1);
  wd.add(18, Bm + 900, Bm - 350, 0, Om, 1);
  wd.add(19, Bm - 300, Bm - 350, 0, Dm, 2);
  wd.add(20, Bm + 550, Bm - 450, 0, Dm, 2);
  wd.add(21, Bm - 500, Bm + 500, 0, Dm, 2);
  wd.add(22, Bm + 300, Bm - 150, 0, Dm, 2);
  wd.add(23, Bm - 150, Bm + 550, 0, Dm, 2);
  wd.add(24, Bm + 800, Bm + 100, 0, Dm, 2);
  wd.add(25, Bm - 400, Bm + 100, 0, Nm, 3);
  wd.add(26, Bm + 450, Bm - 300, 0, Nm, 3);
  wd.add(27, Bm - 250, Bm - 600, 0, Nm, 3);
  (function e() {
    Ro = Date.now();
    _o = Ro - rl;
    rl = Ro;
    (function () {
      Ch();
      if (!Zr && Do && (!Bo || Ro - Bo >= 1000 / Ja.clientSendRate)) {
        Bo = Ro;
        if (Ja.botMode) {
          var e = Dh();
          ba(Nh(), e.x, e.y);
        } else {
          ba(Nh());
        }
      }
      if (tp < 120) {
        tp += _o * 0.1;
        lu.style.fontSize = Math.min(Math.round(tp), 120) + "px";
      }
      var t = Zr ? Yl !== null ? Cm(Yl) : null : Do;
      if (t) {
        var n = qa.getDistance(Xo, qo, t.x, t.y);
        var i = qa.getDirection(t.x, t.y, Xo, qo);
        var r = Math.min(n * 0.01 * _o, n);
        if (n > 0.05) {
          Xo += r * Math.cos(i);
          qo += r * Math.sin(i);
        } else {
          Xo = t.x;
          qo = t.y;
        }
      } else {
        Xo = Ja.mapScale / 2;
        qo = Ja.mapScale / 2;
      }
      var a = Ro - 1000 / Ja.serverUpdateRate;
      for (var s = 0; s < sl.length + al.length; ++s) {
        if ((Fo = sl[s] || al[s - sl.length]) && Fo.visible) {
          if (Fo.forcePos) {
            Fo.x = Fo.x2;
            Fo.y = Fo.y2;
            Fo.dir = typeof Fo.d2 == "number" && isFinite(Fo.d2) ? Fo.d2 : typeof Fo.dir == "number" && isFinite(Fo.dir) ? Fo.dir : 0;
          } else {
            Fo.dt += _o;
            var o = Math.min(1.7, Fo.dt / 170);
            var l = Fo.x2 - Fo.x1;
            Fo.x = Fo.x1 + l * o;
            l = Fo.y2 - Fo.y1;
            Fo.y = Fo.y1 + l * o;
            Fo.dir = eo(Fo, 0, a);
          }
        }
      }
      for (var c = 0; c < sl.length; ++c) {
        var u = sl[c];
        if (u && u.alive && u.visible) {
          for (var d = c + 1; d < sl.length; ++d) {
            var h = sl[d];
            if (h && h.alive && h.visible) {
              wd.checkCollision(u, h);
            }
          }
        }
      }
      var p;
      var m;
      var f;
      var g;
      var y;
      var v;
      var b;
      var w = Zr ? jl : 1;
      var k = Nl / w;
      var S = Fl / w;
      var x = Xo - k / 2;
      var I = qo - S / 2;
      (function (e, t, n) {
        for (var i in hl) {
          if (Object.prototype.hasOwnProperty.call(hl, i)) {
            pl[i] = 0;
          }
        }
        for (var r = 0; r < ll.length; ++r) {
          if ((Fo = ll[r]) && Fo.active) {
            var a = Fo.layer;
            if (a !== undefined) {
              if (!hl[a]) {
                hl[a] = [];
                pl[a] = 0;
              }
              var s = Fo.scale + (Fo.blocker || 0);
              if (Sm(Fo.x, Fo.y, s)) {
                Fo.update(n);
                var o = Fo.x + Fo.xWiggle - e;
                var l = Fo.y + Fo.yWiggle - t;
                var c = Fo.x - e;
                var u = Fo.y - t;
                if (xm(o, l, s)) {
                  var d = hl[a];
                  var h = pl[a] || 0;
                  var p = d[h];
                  if (!p) {
                    p = {
                      obj: null,
                      x: 0,
                      y: 0,
                      baseX: 0,
                      baseY: 0
                    };
                    d[h] = p;
                  }
                  p.obj = Fo;
                  p.x = o;
                  p.y = l;
                  p.baseX = c;
                  p.baseY = u;
                  pl[a] = h + 1;
                }
              }
            }
          }
        }
      })(x, I, _o);
      if (jo.extremePerformanceMode) {
        (function (e, t) {
          dc.save();
          dc.setTransform(1, 0, 0, 1, 0, 0);
          dc.fillStyle = "#fff";
          dc.fillRect(0, 0, uc.width, uc.height);
          dc.restore();
          if (uu && ou) {
            uu.save();
            uu.setTransform(1, 0, 0, 1, 0, 0);
            uu.clearRect(0, 0, ou.width, ou.height);
            uu.fillStyle = "#fff";
            uu.fillRect(0, 0, ou.width, ou.height);
            uu.restore();
          }
          dc.save();
          dc.globalAlpha = 1;
          dc.lineWidth = 2.5;
          var n = function (n, i, r, a) {
            var s = Math.max(r || 0, a || 0);
            if (!(s <= 0)) {
              var o = n - e;
              var l = i - t;
              if (xm(o, l, s)) {
                if (a > 0) {
                  dc.strokeStyle = "#000";
                  dc.beginPath();
                  dc.arc(o, l, a, 0, Math.PI * 2);
                  dc.stroke();
                }
                if (r > 0) {
                  dc.strokeStyle = "#6b6b6b";
                  dc.beginPath();
                  dc.arc(o, l, r, 0, Math.PI * 2);
                  dc.stroke();
                }
              }
            }
          };
          var i = function (e) {
            var t = typeof e.getScale == "function" ? e.getScale(1, true) : e.blocker || e.scale || 0;
            return {
              collisionRadius: t,
              hitRadius: e.blocker || e.scale || t
            };
          };
          for (var r = 0; r < ll.length; ++r) {
            var a = ll[r];
            if (a && a.active) {
              var s = i(a);
              n(a.x + (a.xWiggle || 0), a.y + (a.yWiggle || 0), s.hitRadius, s.collisionRadius);
            }
          }
          for (var o = 0; o < sl.length; ++o) {
            var l = sl[o];
            if (l && l.visible) {
              var c = l.scale;
              var u = xs && xs.weapons ? xs.weapons[l.weaponIndex] : null;
              var d = u && typeof u.range == "number" ? u.range : l.scale * 1.8;
              var h = l.x + (l.xWiggle || 0);
              var p = l.y + (l.yWiggle || 0);
              if (typeof l.animate == "function") {
                l.animate(_o);
              }
              var m = (l === Do ? Nh() : l.dir) + (l.dirPlus || 0);
              var f = h - e;
              var g = p - t;
              if (xm(f, g, Math.max(d, c))) {
                var y = d;
                var v = f + y * Math.cos(m);
                var b = g + y * Math.sin(m);
                dc.strokeStyle = "#222";
                dc.beginPath();
                dc.moveTo(f, g);
                dc.lineTo(v, b);
                dc.stroke();
              }
              n(h, p, d, c);
            }
          }
          for (var w = 0; w < al.length; ++w) {
            var k = al[w];
            if (k && k.visible) {
              var S = k.scale;
              var x = k.scale * 1.6;
              n(k.x + (k.xWiggle || 0), k.y + (k.yWiggle || 0), x, S);
            }
          }
          for (var I = 0; I < cl.length; ++I) {
            var M = cl[I];
            if (M && M.active) {
              if (typeof M.update == "function") {
                M.update(_o);
              }
              var E = M.scale || 0;
              n(M.x, M.y, E, E);
            }
          }
          dc.restore();
        })(x, I);
      } else {
        g = x;
        y = I;
        v = k;
        b = S;
        _s.renderBackground(dc, v, b, g, y);
        if (!Zh) {
          if (jo.lowDetailMode) {
            _l = 1;
            Rl = 1;
          } else if ((_l += Rl * Ja.waveSpeed * _o) >= Ja.waveMax) {
            _l = Ja.waveMax;
            Rl = -1;
          } else if (_l <= 1) {
            _l = Rl = 1;
          }
          p = x;
          m = I;
          f = k;
          dc.globalAlpha = 1;
          Rs.renderMainRiver(dc, f, p, m, _l);
        }
        if (jo.showGrid) {
          (function (e, t, n, i) {
            var r = Fl / 18;
            if (r && !(r <= 0)) {
              var a = Math.floor(e / r) * r;
              var s = Math.floor(t / r) * r;
              dc.lineWidth = 4;
              dc.strokeStyle = "#000";
              dc.globalAlpha = 0.06;
              dc.beginPath();
              for (var o = e + n, l = t + i, c = a; c <= o; c += r) {
                var u = c - e;
                dc.moveTo(u, 0);
                dc.lineTo(u, i);
              }
              for (var d = s; d <= l; d += r) {
                var h = d - t;
                dc.moveTo(0, h);
                dc.lineTo(n, h);
              }
              dc.stroke();
            }
          })(x, I, k, S);
        }
        if (!jo.lowDetailMode) {
          Cl.render(dc, {
            xOffset: x,
            yOffset: I,
            width: k,
            height: S,
            centerX: Xo,
            centerY: qo,
            maxDistance: 2000
          });
        }
        dc.globalAlpha = 1;
        dc.strokeStyle = kd;
        bp(-1);
        wp(-1);
        for (var M = 0; M < ml.length; ++M) {
          bp(ml[M]);
        }
        dc.globalAlpha = 1;
        dc.lineWidth = xd;
        mp(0, x, I);
        dc.globalAlpha = 1;
        s = 0;
        for (; s < al.length; ++s) {
          if ((Fo = al[s]).active && Fo.visible) {
            if (!Sm(Fo.x, Fo.y, Fo.scale)) {
              continue;
            }
            var E = Fo.x - x;
            var P = Fo.y - I;
            if (!xm(E, P, Fo.scale)) {
              continue;
            }
            Fo.animate(_o);
            dc.save();
            dc.translate(E, P);
            var T = Fo.dir + Fo.dirPlus - Math.PI / 2;
            km(Fo, dc, T);
            dc.restore();
          }
        }
        Sp(x, I, 0);
        wp(0);
        mp(1, x, I);
        wp(1);
        Sp(x, I, 1);
        wp(2);
        wp(3);
        (function (e, t) {
          if (kl && wl != null) {
            var n = Ud(wl);
            if (n) {
              var i = jp(n);
              if (i && i.isLoaded && i.naturalWidth) {
                var r = Dh();
                var a = Gd(xl);
                if (Sm(r.x, r.y, a / 2)) {
                  var s = Yd(Sl);
                  dc.save();
                  dc.globalAlpha = 0.7;
                  dc.translate(r.x - e, r.y - t);
                  tm(dc, i, s, n + "|decorationGhost", a, a, true);
                  dc.restore();
                }
              }
            }
          }
        })(x, I);
        (function (e, t) {
          if (El && Ml != null && Ml !== "") {
            var n = _d(Ml);
            if (n) {
              var i = Dd(n.id);
              if (i) {
                var r = jp(i);
                if (r && r.isLoaded && r.naturalWidth) {
                  var a = Dh();
                  var s = Bd(Tl);
                  var o = Fd({
                    type: n.type,
                    size: s
                  });
                  if (Sm(a.x, a.y, o / 2)) {
                    var l = Ld(Pl);
                    dc.save();
                    dc.globalAlpha = 0.7;
                    dc.translate(a.x - e, a.y - t);
                    tm(dc, r, l, i + "|worldGhost", o, o, true);
                    dc.restore();
                  }
                }
              }
            }
          }
        })(x, I);
        (function (e, t) {
          if (Al.length) {
            for (var n = 0; n < Al.length; ++n) {
              var i = Al[n];
              var r = Nd(i);
              if (i && r) {
                var a = jp(r);
                if (a && a.isLoaded && a.naturalWidth) {
                  var s = Fd(i);
                  if (Sm(i.x, i.y, s / 2)) {
                    dc.save();
                    dc.globalAlpha = 1;
                    dc.translate(i.x - e, i.y - t);
                    var o = r + "|placed";
                    tm(dc, a, i.rotation, o, s, s, true);
                    dc.restore();
                  }
                }
              }
            }
            dc.globalAlpha = 1;
          }
        })(x, I);
        dc.fillStyle = "#000";
        dc.globalAlpha = 0.09;
        if (x <= 0) {
          dc.fillRect(0, 0, -x, S);
        }
        if (Ja.mapScale - x <= k) {
          var A = Math.max(0, -I);
          dc.fillRect(Ja.mapScale - x, A, k - (Ja.mapScale - x), S - A);
        }
        if (I <= 0) {
          dc.fillRect(-x, 0, k + x, -I);
        }
        if (Ja.mapScale - I <= S) {
          var C = Math.max(0, -x);
          var _ = 0;
          if (Ja.mapScale - x <= k) {
            _ = k - (Ja.mapScale - x);
          }
          dc.fillRect(C, Ja.mapScale - I, k - C - _, S - (Ja.mapScale - I));
        }
        dc.globalAlpha = 1;
        dc.strokeStyle = Sd;
        s = 0;
        for (; s < sl.length + al.length; ++s) {
          if ((Fo = sl[s] || al[s - sl.length]) && Fo.visible && xm(Fo.x - x, Fo.y - I, Fo.scale) && (Fo.skinIndex != 10 || Fo == Do || Do && Fo.team && Fo.team == Do.team)) {
            var R = (!Ja.botMode && Fo.team ? "[" + Fo.team + "] " : "") + (Fo.name || "");
            if (!jo.hidePlayerNames && R != "") {
              var B = Fo.nameScale || 34;
              var L = Fo.y - I - Fo.scale - Ja.nameY;
              var O = B + "px GameFont";
              if (dc.font !== O) {
                dc.font = O;
              }
              dc.fillStyle = "#F0E4E4";
              dc.textBaseline = "middle";
              dc.textAlign = "center";
              dc.lineWidth = Fo.nameScale ? 11 : 8;
              dc.lineJoin = "round";
              var D = hp(Fo, R, B, dc).width;
              dc.strokeText(R, Fo.x - x, L);
              dc.fillText(R, Fo.x - x, L);
              if (Fo.isLeader && sp.crown.isLoaded) {
                var N = Ja.crownIconScale;
                C = Fo.x - x - N / 2 - D / 2 - Ja.crownPad;
                dc.drawImage(sp.crown, C, L - N / 2 - 5, N, N);
              }
              if (Fo.iconIndex > 0) {
                var F = "skull_" + Fo.iconIndex;
                var H = sp[F];
                if (H && H.isLoaded) {
                  N = Ja.crownIconScale;
                  C = Fo.x - x - N / 2 + D / 2 + Ja.crownPad;
                  dc.drawImage(H, C, L - N / 2 - 5, N, N);
                }
              }
              if (Zr) {
                var j = typeof Fo.cps == "number" ? Fo.cps : 0;
                var z = typeof Fo.ping == "number" && Fo.ping >= 0 ? Fo.ping : 0;
                var V = Math.max(12, Math.round(B * 0.45));
                var W = L + Math.max(16, Math.round(B * 0.55));
                dc.font = V + "px GameFont";
                dc.fillStyle = "rgba(240, 228, 228, 0.85)";
                dc.lineWidth = 5;
                dc.strokeText("CPS " + j + " · MS " + z, Fo.x - x, W);
                dc.fillText("CPS " + j + " · MS " + z, Fo.x - x, W);
              }
            }
            if (Fo.health > 0 && !Fo.hideHealthBar) {
              var U = Fo.x - x - Ja.healthBarWidth - Ja.healthBarPad;
              var G = Fo.y - I + Fo.scale + Ja.nameY;
              var Y = Ja.healthBarWidth * 2 + Ja.healthBarPad * 2;
              var X = Fo.x - x - Ja.healthBarWidth;
              var q = Fo.y - I + Fo.scale + Ja.nameY + Ja.healthBarPad;
              var K = Ja.healthBarWidth * 2 * (Fo.health / Fo.maxHealth);
              var J = 17 - Ja.healthBarPad * 2;
              var Z = Math.min(J / 2, K / 2, J / 17 * 8);
              dc.fillStyle = Sd;
              dc.roundRect(U, G, Y, 17, 8);
              dc.fill();
              dc.fillStyle = Fo == Do || Do && Fo.team && Fo.team == Do.team ? "#8ecc51" : "#cc5151";
              dc.roundRect(X, q, K, J, Z);
              dc.fill();
            }
            if (Fo.isPlayer && qs.isStaff()) {
              var Q = qs.hudFor(Fo.sid);
              if (Q) {
                var $ = Fo.y - I + Fo.scale + Ja.nameY + 30;
                var ee = "ID " + Fo.sid + " · " + (Q.ping >= 0 ? Q.ping + "ms" : "–") + " · CPS " + Q.cps + (Q.flags ? " · ⚑" + Q.flags : "");
                dc.font = "13px GameFont";
                dc.textBaseline = "middle";
                dc.textAlign = "center";
                dc.lineWidth = 5;
                dc.lineJoin = "round";
                dc.fillStyle = Q.suspicion >= 20 ? "rgba(255,150,120,0.95)" : "rgba(240,228,228,0.9)";
                dc.strokeText(ee, Fo.x - x, $);
                dc.fillText(ee, Fo.x - x, $);
              }
            }
          }
        }
        As.update(_o, dc, x, I);
        s = 0;
        for (; s < sl.length; ++s) {
          if ((Fo = sl[s]).visible && Fo.chatCountdown > 0) {
            var te = Fo.x - x;
            var ne = Fo.y - I;
            if (!xm(te, ne, Fo.scale + 120)) {
              continue;
            }
            Fo.chatCountdown -= _o;
            if (Fo.chatCountdown <= 0) {
              Fo.chatCountdown = 0;
            }
            dc.font = "32px GameFont";
            var ie = Fo.chatMessage || "";
            var re = pp(Fo, ie, dc);
            dc.textBaseline = "middle";
            dc.textAlign = "center";
            C = te;
            A = ne - Fo.scale - 90;
            var ae = re.width + 17;
            dc.fillStyle = "rgba(0,0,0,0.2)";
            dc.roundRect(C - ae / 2, A - 23.5, ae, 47, 6);
            dc.fill();
            dc.fillStyle = "#fff";
            dc.fillText(ie, C, A);
          }
          if (Fo.visible && Fo.spectateChats && Fo.spectateChats.length) {
            var se = Fo.x - x;
            var oe = Fo.y - I;
            if (!xm(se, oe, Fo.scale + 120)) {
              continue;
            }
            dc.font = "26px GameFont";
            dc.textBaseline = "middle";
            dc.textAlign = "center";
            dc.lineJoin = "round";
            dc.lineWidth = 4;
            for (var le = Fo.spectateChats.length - 1; le >= 0; le--) {
              var ce = Fo.spectateChats[le];
              ce.age += _o;
              if (ce.age >= ce.lifetime) {
                Fo.spectateChats.splice(le, 1);
              } else {
                var ue = ce.age / ce.lifetime;
                var de = 1 - ue;
                var he = Math.sin((ue * 2 + ce.velX * 0.002) * Math.PI) * 10;
                var pe = Math.sin((ue * 1.5 + ce.velY * 0.002) * Math.PI) * 8;
                var me = se + ce.offsetX + ce.velX * ue + he;
                var fe = oe + ce.offsetY + ce.velY * ue + pe;
                dc.strokeStyle = "rgba(0,0,0," + (de * 0.55).toFixed(3) + ")";
                dc.strokeText(ce.text, me, fe);
                dc.fillStyle = "rgba(255,255,255," + de.toFixed(3) + ")";
                dc.fillText(ce.text, me, fe);
              }
            }
          }
        }
        (function (e) {
          if (jo.extremePerformanceMode) {
            if (uu) {
              uu.setTransform(1, 0, 0, 1, 0, 0);
              uu.clearRect(0, 0, ou.width, ou.height);
              uu.fillStyle = "#fff";
              uu.fillRect(0, 0, ou.width, ou.height);
            }
          } else if (uu && ou) {
            uu.setTransform(1, 0, 0, 1, 0, 0);
            uu.globalAlpha = 1;
            uu.globalCompositeOperation = "source-over";
            uu.clearRect(0, 0, ou.width, ou.height);
            _s.renderMinimapBands(uu, ou.width, ou.height);
            Rs.renderMinimapRivers(uu, ou.width, ou.height);
            var t = Zr && Yl !== null ? Cm(Yl) : Do;
            if (t && t.alive) {
              uu.strokeStyle = "#fff";
              uu.lineWidth = 4;
              for (var n = 0; n < dh.length; ++n) {
                (nh = dh[n]).update(uu, e);
              }
              uu.globalAlpha = 1;
              uu.fillStyle = "#fff";
              Ya(t.x / Ja.mapScale * ou.width, t.y / Ja.mapScale * ou.height, 7, uu, true);
              uu.fillStyle = "rgba(255,255,255,0.35)";
              if (t && t.team && Ed) {
                for (n = 0; n < Ed.length;) {
                  Ya(Ed[n] / Ja.mapScale * ou.width, Ed[n + 1] / Ja.mapScale * ou.height, 7, uu, true);
                  n += 2;
                }
              }
              if (Md) {
                uu.fillStyle = "#fc5553";
                uu.font = "34px GameFont";
                uu.textBaseline = "middle";
                uu.textAlign = "center";
                uu.fillText("x", Md.x / Ja.mapScale * ou.width, Md.y / Ja.mapScale * ou.height);
              }
              if (Pd) {
                uu.fillStyle = "#fff";
                uu.font = "34px GameFont";
                uu.textBaseline = "middle";
                uu.textAlign = "center";
                uu.fillText("x", Pd.x / Ja.mapScale * ou.width, Pd.y / Ja.mapScale * ou.height);
              }
            }
          }
        })(_o);
        if (Ol.id !== -1) {
          dp(Ol.startX, Ol.startY, Ol.currentX, Ol.currentY);
        }
        if (Dl.id !== -1) {
          dp(Dl.startX, Dl.startY, Dl.currentX, Dl.currentY);
        }
      }
    })();
    if (Fm) {
      Fm.updateFrame();
    }
    window.requestAnimationFrame(e);
  })();
  window.openLink = function (e) {
    if (typeof e == "string" && e.length) {
      try {
        window.open(e, "_blank", "noopener,noreferrer");
      } catch (t) {
        window.location.assign(e);
      }
    }
  };
  window.follmoo = function () {
    if (!Ho) {
      Ho = true;
      to("moofoll", 1);
    }
  };
  window.config = Ja;
})();
