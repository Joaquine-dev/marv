const K = /* @__PURE__ */ Object.create(null);
K.open = "0";
K.close = "1";
K.ping = "2";
K.pong = "3";
K.message = "4";
K.upgrade = "5";
K.noop = "6";
const ce = /* @__PURE__ */ Object.create(null);
Object.keys(K).forEach((t) => {
  ce[K[t]] = t;
});
const Ae = { type: "error", data: "parser error" }, at = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]", ct = typeof ArrayBuffer == "function", ut = (t) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t && t.buffer instanceof ArrayBuffer, Ie = ({ type: t, data: e }, n, r) => at && e instanceof Blob ? n ? r(e) : Ze(e, r) : ct && (e instanceof ArrayBuffer || ut(e)) ? n ? r(e) : Ze(new Blob([e]), r) : r(K[t] + (e || "")), Ze = (t, e) => {
  const n = new FileReader();
  return n.onload = function() {
    const r = n.result.split(",")[1];
    e("b" + (r || ""));
  }, n.readAsDataURL(t);
};
function $e(t) {
  return t instanceof Uint8Array ? t : t instanceof ArrayBuffer ? new Uint8Array(t) : new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
}
let we;
function Ut(t, e) {
  if (at && t.data instanceof Blob)
    return t.data.arrayBuffer().then($e).then(e);
  if (ct && (t.data instanceof ArrayBuffer || ut(t.data)))
    return e($e(t.data));
  Ie(t, !1, (n) => {
    we || (we = new TextEncoder()), e(we.encode(n));
  });
}
const Ge = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", ie = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let t = 0; t < Ge.length; t++)
  ie[Ge.charCodeAt(t)] = t;
const Vt = (t) => {
  let e = t.length * 0.75, n = t.length, r, i = 0, o, a, h, s;
  t[t.length - 1] === "=" && (e--, t[t.length - 2] === "=" && e--);
  const d = new ArrayBuffer(e), u = new Uint8Array(d);
  for (r = 0; r < n; r += 4)
    o = ie[t.charCodeAt(r)], a = ie[t.charCodeAt(r + 1)], h = ie[t.charCodeAt(r + 2)], s = ie[t.charCodeAt(r + 3)], u[i++] = o << 2 | a >> 4, u[i++] = (a & 15) << 4 | h >> 2, u[i++] = (h & 3) << 6 | s & 63;
  return d;
}, jt = typeof ArrayBuffer == "function", Ne = (t, e) => {
  if (typeof t != "string")
    return {
      type: "message",
      data: ft(t, e)
    };
  const n = t.charAt(0);
  return n === "b" ? {
    type: "message",
    data: Ht(t.substring(1), e)
  } : ce[n] ? t.length > 1 ? {
    type: ce[n],
    data: t.substring(1)
  } : {
    type: ce[n]
  } : Ae;
}, Ht = (t, e) => {
  if (jt) {
    const n = Vt(t);
    return ft(n, e);
  } else
    return { base64: !0, data: t };
}, ft = (t, e) => {
  switch (e) {
    case "blob":
      return t instanceof Blob ? t : new Blob([t]);
    case "arraybuffer":
    default:
      return t instanceof ArrayBuffer ? t : t.buffer;
  }
}, ht = "", zt = (t, e) => {
  const n = t.length, r = new Array(n);
  let i = 0;
  t.forEach((o, a) => {
    Ie(o, !1, (h) => {
      r[a] = h, ++i === n && e(r.join(ht));
    });
  });
}, Wt = (t, e) => {
  const n = t.split(ht), r = [];
  for (let i = 0; i < n.length; i++) {
    const o = Ne(n[i], e);
    if (r.push(o), o.type === "error")
      break;
  }
  return r;
};
function Qt() {
  return new TransformStream({
    transform(t, e) {
      Ut(t, (n) => {
        const r = n.length;
        let i;
        if (r < 126)
          i = new Uint8Array(1), new DataView(i.buffer).setUint8(0, r);
        else if (r < 65536) {
          i = new Uint8Array(3);
          const o = new DataView(i.buffer);
          o.setUint8(0, 126), o.setUint16(1, r);
        } else {
          i = new Uint8Array(9);
          const o = new DataView(i.buffer);
          o.setUint8(0, 127), o.setBigUint64(1, BigInt(r));
        }
        t.data && typeof t.data != "string" && (i[0] |= 128), e.enqueue(i), e.enqueue(n);
      });
    }
  });
}
let be;
function oe(t) {
  return t.reduce((e, n) => e + n.length, 0);
}
function ae(t, e) {
  if (t[0].length === e)
    return t.shift();
  const n = new Uint8Array(e);
  let r = 0;
  for (let i = 0; i < e; i++)
    n[i] = t[0][r++], r === t[0].length && (t.shift(), r = 0);
  return t.length && r < t[0].length && (t[0] = t[0].slice(r)), n;
}
function Kt(t, e) {
  be || (be = new TextDecoder());
  const n = [];
  let r = 0, i = -1, o = !1;
  return new TransformStream({
    transform(a, h) {
      for (n.push(a); ; ) {
        if (r === 0) {
          if (oe(n) < 1)
            break;
          const s = ae(n, 1);
          o = (s[0] & 128) === 128, i = s[0] & 127, i < 126 ? r = 3 : i === 126 ? r = 1 : r = 2;
        } else if (r === 1) {
          if (oe(n) < 2)
            break;
          const s = ae(n, 2);
          i = new DataView(s.buffer, s.byteOffset, s.length).getUint16(0), r = 3;
        } else if (r === 2) {
          if (oe(n) < 8)
            break;
          const s = ae(n, 8), d = new DataView(s.buffer, s.byteOffset, s.length), u = d.getUint32(0);
          if (u > Math.pow(2, 21) - 1) {
            h.enqueue(Ae);
            break;
          }
          i = u * Math.pow(2, 32) + d.getUint32(4), r = 3;
        } else {
          if (oe(n) < i)
            break;
          const s = ae(n, i);
          h.enqueue(Ne(o ? s : be.decode(s), e)), r = 0;
        }
        if (i === 0 || i > t) {
          h.enqueue(Ae);
          break;
        }
      }
    }
  });
}
const lt = 4;
function I(t) {
  if (t) return Yt(t);
}
function Yt(t) {
  for (var e in I.prototype)
    t[e] = I.prototype[e];
  return t;
}
I.prototype.on = I.prototype.addEventListener = function(t, e) {
  return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
};
I.prototype.once = function(t, e) {
  function n() {
    this.off(t, n), e.apply(this, arguments);
  }
  return n.fn = e, this.on(t, n), this;
};
I.prototype.off = I.prototype.removeListener = I.prototype.removeAllListeners = I.prototype.removeEventListener = function(t, e) {
  if (this._callbacks = this._callbacks || {}, arguments.length == 0)
    return this._callbacks = {}, this;
  var n = this._callbacks["$" + t];
  if (!n) return this;
  if (arguments.length == 1)
    return delete this._callbacks["$" + t], this;
  for (var r, i = 0; i < n.length; i++)
    if (r = n[i], r === e || r.fn === e) {
      n.splice(i, 1);
      break;
    }
  return n.length === 0 && delete this._callbacks["$" + t], this;
};
I.prototype.emit = function(t) {
  this._callbacks = this._callbacks || {};
  for (var e = new Array(arguments.length - 1), n = this._callbacks["$" + t], r = 1; r < arguments.length; r++)
    e[r - 1] = arguments[r];
  if (n) {
    n = n.slice(0);
    for (var r = 0, i = n.length; r < i; ++r)
      n[r].apply(this, e);
  }
  return this;
};
I.prototype.emitReserved = I.prototype.emit;
I.prototype.listeners = function(t) {
  return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
};
I.prototype.hasListeners = function(t) {
  return !!this.listeners(t).length;
};
const de = typeof Promise == "function" && typeof Promise.resolve == "function" ? (e) => Promise.resolve().then(e) : (e, n) => n(e, 0), M = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(), Jt = "arraybuffer";
function dt(t, ...e) {
  return e.reduce((n, r) => (t.hasOwnProperty(r) && (n[r] = t[r]), n), {});
}
const Xt = M.setTimeout, Zt = M.clearTimeout;
function pe(t, e) {
  e.useNativeTimers ? (t.setTimeoutFn = Xt.bind(M), t.clearTimeoutFn = Zt.bind(M)) : (t.setTimeoutFn = M.setTimeout.bind(M), t.clearTimeoutFn = M.clearTimeout.bind(M));
}
const $t = 1.33;
function Gt(t) {
  return typeof t == "string" ? en(t) : Math.ceil((t.byteLength || t.size) * $t);
}
function en(t) {
  let e = 0, n = 0;
  for (let r = 0, i = t.length; r < i; r++)
    e = t.charCodeAt(r), e < 128 ? n += 1 : e < 2048 ? n += 2 : e < 55296 || e >= 57344 ? n += 3 : (r++, n += 4);
  return n;
}
function pt() {
  return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}
function tn(t) {
  let e = "";
  for (let n in t)
    t.hasOwnProperty(n) && (e.length && (e += "&"), e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
  return e;
}
function nn(t) {
  let e = {}, n = t.split("&");
  for (let r = 0, i = n.length; r < i; r++) {
    let o = n[r].split("=");
    e[decodeURIComponent(o[0])] = decodeURIComponent(o[1]);
  }
  return e;
}
class rn extends Error {
  constructor(e, n, r) {
    super(e), this.description = n, this.context = r, this.type = "TransportError";
  }
}
class Pe extends I {
  /**
   * Transport abstract constructor.
   *
   * @param {Object} opts - options
   * @protected
   */
  constructor(e) {
    super(), this.writable = !1, pe(this, e), this.opts = e, this.query = e.query, this.socket = e.socket, this.supportsBinary = !e.forceBase64;
  }
  /**
   * Emits an error.
   *
   * @param {String} reason
   * @param description
   * @param context - the error context
   * @return {Transport} for chaining
   * @protected
   */
  onError(e, n, r) {
    return super.emitReserved("error", new rn(e, n, r)), this;
  }
  /**
   * Opens the transport.
   */
  open() {
    return this.readyState = "opening", this.doOpen(), this;
  }
  /**
   * Closes the transport.
   */
  close() {
    return (this.readyState === "opening" || this.readyState === "open") && (this.doClose(), this.onClose()), this;
  }
  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   */
  send(e) {
    this.readyState === "open" && this.write(e);
  }
  /**
   * Called upon open
   *
   * @protected
   */
  onOpen() {
    this.readyState = "open", this.writable = !0, super.emitReserved("open");
  }
  /**
   * Called with data.
   *
   * @param {String} data
   * @protected
   */
  onData(e) {
    const n = Ne(e, this.socket.binaryType);
    this.onPacket(n);
  }
  /**
   * Called with a decoded packet.
   *
   * @protected
   */
  onPacket(e) {
    super.emitReserved("packet", e);
  }
  /**
   * Called upon close.
   *
   * @protected
   */
  onClose(e) {
    this.readyState = "closed", super.emitReserved("close", e);
  }
  /**
   * Pauses the transport, in order not to lose packets during an upgrade.
   *
   * @param onPause
   */
  pause(e) {
  }
  createUri(e, n = {}) {
    return e + "://" + this._hostname() + this._port() + this.opts.path + this._query(n);
  }
  _hostname() {
    const e = this.opts.hostname;
    return e.indexOf(":") === -1 ? e : "[" + e + "]";
  }
  _port() {
    return this.opts.port && (this.opts.secure && Number(this.opts.port) !== 443 || !this.opts.secure && Number(this.opts.port) !== 80) ? ":" + this.opts.port : "";
  }
  _query(e) {
    const n = tn(e);
    return n.length ? "?" + n : "";
  }
}
class sn extends Pe {
  constructor() {
    super(...arguments), this._polling = !1;
  }
  get name() {
    return "polling";
  }
  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @protected
   */
  doOpen() {
    this._poll();
  }
  /**
   * Pauses polling.
   *
   * @param {Function} onPause - callback upon buffers are flushed and transport is paused
   * @package
   */
  pause(e) {
    this.readyState = "pausing";
    const n = () => {
      this.readyState = "paused", e();
    };
    if (this._polling || !this.writable) {
      let r = 0;
      this._polling && (r++, this.once("pollComplete", function() {
        --r || n();
      })), this.writable || (r++, this.once("drain", function() {
        --r || n();
      }));
    } else
      n();
  }
  /**
   * Starts polling cycle.
   *
   * @private
   */
  _poll() {
    this._polling = !0, this.doPoll(), this.emitReserved("poll");
  }
  /**
   * Overloads onData to detect payloads.
   *
   * @protected
   */
  onData(e) {
    const n = (r) => {
      if (this.readyState === "opening" && r.type === "open" && this.onOpen(), r.type === "close")
        return this.onClose({ description: "transport closed by the server" }), !1;
      this.onPacket(r);
    };
    Wt(e, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll());
  }
  /**
   * For polling, send a close packet.
   *
   * @protected
   */
  doClose() {
    const e = () => {
      this.write([{ type: "close" }]);
    };
    this.readyState === "open" ? e() : this.once("open", e);
  }
  /**
   * Writes a packets payload.
   *
   * @param {Array} packets - data packets
   * @protected
   */
  write(e) {
    this.writable = !1, zt(e, (n) => {
      this.doWrite(n, () => {
        this.writable = !0, this.emitReserved("drain");
      });
    });
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const e = this.opts.secure ? "https" : "http", n = this.query || {};
    return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = pt()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(e, n);
  }
}
let gt = !1;
try {
  gt = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest();
} catch {
}
const on = gt;
function an() {
}
class cn extends sn {
  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @package
   */
  constructor(e) {
    if (super(e), typeof location < "u") {
      const n = location.protocol === "https:";
      let r = location.port;
      r || (r = n ? "443" : "80"), this.xd = typeof location < "u" && e.hostname !== location.hostname || r !== e.port;
    }
  }
  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @private
   */
  doWrite(e, n) {
    const r = this.request({
      method: "POST",
      data: e
    });
    r.on("success", n), r.on("error", (i, o) => {
      this.onError("xhr post error", i, o);
    });
  }
  /**
   * Starts a poll cycle.
   *
   * @private
   */
  doPoll() {
    const e = this.request();
    e.on("data", this.onData.bind(this)), e.on("error", (n, r) => {
      this.onError("xhr poll error", n, r);
    }), this.pollXhr = e;
  }
}
class Q extends I {
  /**
   * Request constructor
   *
   * @param {Object} options
   * @package
   */
  constructor(e, n, r) {
    super(), this.createRequest = e, pe(this, r), this._opts = r, this._method = r.method || "GET", this._uri = n, this._data = r.data !== void 0 ? r.data : null, this._create();
  }
  /**
   * Creates the XHR object and sends the request.
   *
   * @private
   */
  _create() {
    var e;
    const n = dt(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    n.xdomain = !!this._opts.xd;
    const r = this._xhr = this.createRequest(n);
    try {
      r.open(this._method, this._uri, !0);
      try {
        if (this._opts.extraHeaders) {
          r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0);
          for (let i in this._opts.extraHeaders)
            this._opts.extraHeaders.hasOwnProperty(i) && r.setRequestHeader(i, this._opts.extraHeaders[i]);
        }
      } catch {
      }
      if (this._method === "POST")
        try {
          r.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch {
        }
      try {
        r.setRequestHeader("Accept", "*/*");
      } catch {
      }
      (e = this._opts.cookieJar) === null || e === void 0 || e.addCookies(r), "withCredentials" in r && (r.withCredentials = this._opts.withCredentials), this._opts.requestTimeout && (r.timeout = this._opts.requestTimeout), r.onreadystatechange = () => {
        var i;
        r.readyState === 3 && ((i = this._opts.cookieJar) === null || i === void 0 || i.parseCookies(
          // @ts-ignore
          r.getResponseHeader("set-cookie")
        )), r.readyState === 4 && (r.status === 200 || r.status === 1223 ? this._onLoad() : this.setTimeoutFn(() => {
          this._onError(typeof r.status == "number" ? r.status : 0);
        }, 0));
      }, r.send(this._data);
    } catch (i) {
      this.setTimeoutFn(() => {
        this._onError(i);
      }, 0);
      return;
    }
    typeof document < "u" && (this._index = Q.requestsCount++, Q.requests[this._index] = this);
  }
  /**
   * Called upon error.
   *
   * @private
   */
  _onError(e) {
    this.emitReserved("error", e, this._xhr), this._cleanup(!0);
  }
  /**
   * Cleans up house.
   *
   * @private
   */
  _cleanup(e) {
    if (!(typeof this._xhr > "u" || this._xhr === null)) {
      if (this._xhr.onreadystatechange = an, e)
        try {
          this._xhr.abort();
        } catch {
        }
      typeof document < "u" && delete Q.requests[this._index], this._xhr = null;
    }
  }
  /**
   * Called upon load.
   *
   * @private
   */
  _onLoad() {
    const e = this._xhr.responseText;
    e !== null && (this.emitReserved("data", e), this.emitReserved("success"), this._cleanup());
  }
  /**
   * Aborts the request.
   *
   * @package
   */
  abort() {
    this._cleanup();
  }
}
Q.requestsCount = 0;
Q.requests = {};
if (typeof document < "u") {
  if (typeof attachEvent == "function")
    attachEvent("onunload", et);
  else if (typeof addEventListener == "function") {
    const t = "onpagehide" in M ? "pagehide" : "unload";
    addEventListener(t, et, !1);
  }
}
function et() {
  for (let t in Q.requests)
    Q.requests.hasOwnProperty(t) && Q.requests[t].abort();
}
const un = function() {
  const t = mt({
    xdomain: !1
  });
  return t && t.responseType !== null;
}();
class fn extends cn {
  constructor(e) {
    super(e);
    const n = e && e.forceBase64;
    this.supportsBinary = un && !n;
  }
  request(e = {}) {
    return Object.assign(e, { xd: this.xd }, this.opts), new Q(mt, this.uri(), e);
  }
}
function mt(t) {
  const e = t.xdomain;
  try {
    if (typeof XMLHttpRequest < "u" && (!e || on))
      return new XMLHttpRequest();
  } catch {
  }
  if (!e)
    try {
      return new M[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch {
    }
}
const vt = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class hn extends Pe {
  get name() {
    return "websocket";
  }
  doOpen() {
    const e = this.uri(), n = this.opts.protocols, r = vt ? {} : dt(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
    try {
      this.ws = this.createSocket(e, n, r);
    } catch (i) {
      return this.emitReserved("error", i);
    }
    this.ws.binaryType = this.socket.binaryType, this.addEventListeners();
  }
  /**
   * Adds event listeners to the socket
   *
   * @private
   */
  addEventListeners() {
    this.ws.onopen = () => {
      this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
    }, this.ws.onclose = (e) => this.onClose({
      description: "websocket connection closed",
      context: e
    }), this.ws.onmessage = (e) => this.onData(e.data), this.ws.onerror = (e) => this.onError("websocket error", e);
  }
  write(e) {
    this.writable = !1;
    for (let n = 0; n < e.length; n++) {
      const r = e[n], i = n === e.length - 1;
      Ie(r, this.supportsBinary, (o) => {
        try {
          this.doWrite(r, o);
        } catch {
        }
        i && de(() => {
          this.writable = !0, this.emitReserved("drain");
        }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    typeof this.ws < "u" && (this.ws.onerror = () => {
    }, this.ws.close(), this.ws = null);
  }
  /**
   * Generates uri for connection.
   *
   * @private
   */
  uri() {
    const e = this.opts.secure ? "wss" : "ws", n = this.query || {};
    return this.opts.timestampRequests && (n[this.opts.timestampParam] = pt()), this.supportsBinary || (n.b64 = 1), this.createUri(e, n);
  }
}
const Ee = M.WebSocket || M.MozWebSocket;
class ln extends hn {
  createSocket(e, n, r) {
    return vt ? new Ee(e, n, r) : n ? new Ee(e, n) : new Ee(e);
  }
  doWrite(e, n) {
    this.ws.send(n);
  }
}
class dn extends Pe {
  get name() {
    return "webtransport";
  }
  doOpen() {
    try {
      this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
    } catch (e) {
      return this.emitReserved("error", e);
    }
    this._transport.closed.then(() => {
      this.onClose();
    }).catch((e) => {
      this.onError("webtransport error", e);
    }), this._transport.ready.then(() => {
      this._transport.createBidirectionalStream().then((e) => {
        const n = Kt(Number.MAX_SAFE_INTEGER, this.socket.binaryType), r = e.readable.pipeThrough(n).getReader(), i = Qt();
        i.readable.pipeTo(e.writable), this._writer = i.writable.getWriter();
        const o = () => {
          r.read().then(({ done: h, value: s }) => {
            h || (this.onPacket(s), o());
          }).catch((h) => {
          });
        };
        o();
        const a = { type: "open" };
        this.query.sid && (a.data = `{"sid":"${this.query.sid}"}`), this._writer.write(a).then(() => this.onOpen());
      });
    });
  }
  write(e) {
    this.writable = !1;
    for (let n = 0; n < e.length; n++) {
      const r = e[n], i = n === e.length - 1;
      this._writer.write(r).then(() => {
        i && de(() => {
          this.writable = !0, this.emitReserved("drain");
        }, this.setTimeoutFn);
      });
    }
  }
  doClose() {
    var e;
    (e = this._transport) === null || e === void 0 || e.close();
  }
}
const pn = {
  websocket: ln,
  webtransport: dn,
  polling: fn
}, gn = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, mn = [
  "source",
  "protocol",
  "authority",
  "userInfo",
  "user",
  "password",
  "host",
  "port",
  "relative",
  "path",
  "directory",
  "file",
  "query",
  "anchor"
];
function Oe(t) {
  if (t.length > 8e3)
    throw "URI too long";
  const e = t, n = t.indexOf("["), r = t.indexOf("]");
  n != -1 && r != -1 && (t = t.substring(0, n) + t.substring(n, r).replace(/:/g, ";") + t.substring(r, t.length));
  let i = gn.exec(t || ""), o = {}, a = 14;
  for (; a--; )
    o[mn[a]] = i[a] || "";
  return n != -1 && r != -1 && (o.source = e, o.host = o.host.substring(1, o.host.length - 1).replace(/;/g, ":"), o.authority = o.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), o.ipv6uri = !0), o.pathNames = vn(o, o.path), o.queryKey = yn(o, o.query), o;
}
function vn(t, e) {
  const n = /\/{2,9}/g, r = e.replace(n, "/").split("/");
  return (e.slice(0, 1) == "/" || e.length === 0) && r.splice(0, 1), e.slice(-1) == "/" && r.splice(r.length - 1, 1), r;
}
function yn(t, e) {
  const n = {};
  return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(r, i, o) {
    i && (n[i] = o);
  }), n;
}
const Se = typeof addEventListener == "function" && typeof removeEventListener == "function", ue = [];
Se && addEventListener("offline", () => {
  ue.forEach((t) => t());
}, !1);
class X extends I {
  /**
   * Socket constructor.
   *
   * @param {String|Object} uri - uri or options
   * @param {Object} opts - options
   */
  constructor(e, n) {
    if (super(), this.binaryType = Jt, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, e && typeof e == "object" && (n = e, e = null), e) {
      const r = Oe(e);
      n.hostname = r.host, n.secure = r.protocol === "https" || r.protocol === "wss", n.port = r.port, r.query && (n.query = r.query);
    } else n.host && (n.hostname = Oe(n.host).host);
    pe(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach((r) => {
      const i = r.prototype.name;
      this.transports.push(i), this._transportsByName[i] = r;
    }), this.opts = Object.assign({
      path: "/engine.io",
      agent: !1,
      withCredentials: !1,
      upgrade: !0,
      timestampParam: "t",
      rememberUpgrade: !1,
      addTrailingSlash: !0,
      rejectUnauthorized: !0,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: !1
    }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = nn(this.opts.query)), Se && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
      this.transport && (this.transport.removeAllListeners(), this.transport.close());
    }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
      this._onClose("transport close", {
        description: "network connection lost"
      });
    }, ue.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open();
  }
  /**
   * Creates transport of the given type.
   *
   * @param {String} name - transport name
   * @return {Transport}
   * @private
   */
  createTransport(e) {
    const n = Object.assign({}, this.opts.query);
    n.EIO = lt, n.transport = e, this.id && (n.sid = this.id);
    const r = Object.assign({}, this.opts, {
      query: n,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    }, this.opts.transportOptions[e]);
    return new this._transportsByName[e](r);
  }
  /**
   * Initializes transport to use and starts probe.
   *
   * @private
   */
  _open() {
    if (this.transports.length === 0) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    }
    const e = this.opts.rememberUpgrade && X.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
    this.readyState = "opening";
    const n = this.createTransport(e);
    n.open(), this.setTransport(n);
  }
  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @private
   */
  setTransport(e) {
    this.transport && this.transport.removeAllListeners(), this.transport = e, e.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (n) => this._onClose("transport close", n));
  }
  /**
   * Called when connection is deemed open.
   *
   * @private
   */
  onOpen() {
    this.readyState = "open", X.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush();
  }
  /**
   * Handles a packet.
   *
   * @private
   */
  _onPacket(e) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing")
      switch (this.emitReserved("packet", e), this.emitReserved("heartbeat"), e.type) {
        case "open":
          this.onHandshake(JSON.parse(e.data));
          break;
        case "ping":
          this._sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong"), this._resetPingTimeout();
          break;
        case "error":
          const n = new Error("server error");
          n.code = e.data, this._onError(n);
          break;
        case "message":
          this.emitReserved("data", e.data), this.emitReserved("message", e.data);
          break;
      }
  }
  /**
   * Called upon handshake completion.
   *
   * @param {Object} data - handshake obj
   * @private
   */
  onHandshake(e) {
    this.emitReserved("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this._pingInterval = e.pingInterval, this._pingTimeout = e.pingTimeout, this._maxPayload = e.maxPayload, this.onOpen(), this.readyState !== "closed" && this._resetPingTimeout();
  }
  /**
   * Sets and resets ping timeout timer based on server pings.
   *
   * @private
   */
  _resetPingTimeout() {
    this.clearTimeoutFn(this._pingTimeoutTimer);
    const e = this._pingInterval + this._pingTimeout;
    this._pingTimeoutTime = Date.now() + e, this._pingTimeoutTimer = this.setTimeoutFn(() => {
      this._onClose("ping timeout");
    }, e), this.opts.autoUnref && this._pingTimeoutTimer.unref();
  }
  /**
   * Called on `drain` event
   *
   * @private
   */
  _onDrain() {
    this.writeBuffer.splice(0, this._prevBufferLen), this._prevBufferLen = 0, this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush();
  }
  /**
   * Flush write buffers.
   *
   * @private
   */
  flush() {
    if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const e = this._getWritablePackets();
      this.transport.send(e), this._prevBufferLen = e.length, this.emitReserved("flush");
    }
  }
  /**
   * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
   * long-polling)
   *
   * @private
   */
  _getWritablePackets() {
    if (!(this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1))
      return this.writeBuffer;
    let n = 1;
    for (let r = 0; r < this.writeBuffer.length; r++) {
      const i = this.writeBuffer[r].data;
      if (i && (n += Gt(i)), r > 0 && n > this._maxPayload)
        return this.writeBuffer.slice(0, r);
      n += 2;
    }
    return this.writeBuffer;
  }
  /**
   * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
   *
   * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
   * `write()` method then the message would not be buffered by the Socket.IO client.
   *
   * @return {boolean}
   * @private
   */
  /* private */
  _hasPingExpired() {
    if (!this._pingTimeoutTime)
      return !0;
    const e = Date.now() > this._pingTimeoutTime;
    return e && (this._pingTimeoutTime = 0, de(() => {
      this._onClose("ping timeout");
    }, this.setTimeoutFn)), e;
  }
  /**
   * Sends a message.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  write(e, n, r) {
    return this._sendPacket("message", e, n, r), this;
  }
  /**
   * Sends a message. Alias of {@link Socket#write}.
   *
   * @param {String} msg - message.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @return {Socket} for chaining.
   */
  send(e, n, r) {
    return this._sendPacket("message", e, n, r), this;
  }
  /**
   * Sends a packet.
   *
   * @param {String} type: packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} fn - callback function.
   * @private
   */
  _sendPacket(e, n, r, i) {
    if (typeof n == "function" && (i = n, n = void 0), typeof r == "function" && (i = r, r = null), this.readyState === "closing" || this.readyState === "closed")
      return;
    r = r || {}, r.compress = r.compress !== !1;
    const o = {
      type: e,
      data: n,
      options: r
    };
    this.emitReserved("packetCreate", o), this.writeBuffer.push(o), i && this.once("flush", i), this.flush();
  }
  /**
   * Closes the connection.
   */
  close() {
    const e = () => {
      this._onClose("forced close"), this.transport.close();
    }, n = () => {
      this.off("upgrade", n), this.off("upgradeError", n), e();
    }, r = () => {
      this.once("upgrade", n), this.once("upgradeError", n);
    };
    return (this.readyState === "opening" || this.readyState === "open") && (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", () => {
      this.upgrading ? r() : e();
    }) : this.upgrading ? r() : e()), this;
  }
  /**
   * Called upon transport error
   *
   * @private
   */
  _onError(e) {
    if (X.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening")
      return this.transports.shift(), this._open();
    this.emitReserved("error", e), this._onClose("transport error", e);
  }
  /**
   * Called upon transport close.
   *
   * @private
   */
  _onClose(e, n) {
    if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
      if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), Se && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
        const r = ue.indexOf(this._offlineEventListener);
        r !== -1 && ue.splice(r, 1);
      }
      this.readyState = "closed", this.id = null, this.emitReserved("close", e, n), this.writeBuffer = [], this._prevBufferLen = 0;
    }
  }
}
X.protocol = lt;
class _n extends X {
  constructor() {
    super(...arguments), this._upgrades = [];
  }
  onOpen() {
    if (super.onOpen(), this.readyState === "open" && this.opts.upgrade)
      for (let e = 0; e < this._upgrades.length; e++)
        this._probe(this._upgrades[e]);
  }
  /**
   * Probes a transport.
   *
   * @param {String} name - transport name
   * @private
   */
  _probe(e) {
    let n = this.createTransport(e), r = !1;
    X.priorWebsocketSuccess = !1;
    const i = () => {
      r || (n.send([{ type: "ping", data: "probe" }]), n.once("packet", (l) => {
        if (!r)
          if (l.type === "pong" && l.data === "probe") {
            if (this.upgrading = !0, this.emitReserved("upgrading", n), !n)
              return;
            X.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
              r || this.readyState !== "closed" && (u(), this.setTransport(n), n.send([{ type: "upgrade" }]), this.emitReserved("upgrade", n), n = null, this.upgrading = !1, this.flush());
            });
          } else {
            const g = new Error("probe error");
            g.transport = n.name, this.emitReserved("upgradeError", g);
          }
      }));
    };
    function o() {
      r || (r = !0, u(), n.close(), n = null);
    }
    const a = (l) => {
      const g = new Error("probe error: " + l);
      g.transport = n.name, o(), this.emitReserved("upgradeError", g);
    };
    function h() {
      a("transport closed");
    }
    function s() {
      a("socket closed");
    }
    function d(l) {
      n && l.name !== n.name && o();
    }
    const u = () => {
      n.removeListener("open", i), n.removeListener("error", a), n.removeListener("close", h), this.off("close", s), this.off("upgrading", d);
    };
    n.once("open", i), n.once("error", a), n.once("close", h), this.once("close", s), this.once("upgrading", d), this._upgrades.indexOf("webtransport") !== -1 && e !== "webtransport" ? this.setTimeoutFn(() => {
      r || n.open();
    }, 200) : n.open();
  }
  onHandshake(e) {
    this._upgrades = this._filterUpgrades(e.upgrades), super.onHandshake(e);
  }
  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} upgrades - server upgrades
   * @private
   */
  _filterUpgrades(e) {
    const n = [];
    for (let r = 0; r < e.length; r++)
      ~this.transports.indexOf(e[r]) && n.push(e[r]);
    return n;
  }
}
let wn = class extends _n {
  constructor(e, n = {}) {
    const r = typeof e == "object" ? e : n;
    (!r.transports || r.transports && typeof r.transports[0] == "string") && (r.transports = (r.transports || ["polling", "websocket", "webtransport"]).map((i) => pn[i]).filter((i) => !!i)), super(e, r);
  }
};
function bn(t, e = "", n) {
  let r = t;
  n = n || typeof location < "u" && location, t == null && (t = n.protocol + "//" + n.host), typeof t == "string" && (t.charAt(0) === "/" && (t.charAt(1) === "/" ? t = n.protocol + t : t = n.host + t), /^(https?|wss?):\/\//.test(t) || (typeof n < "u" ? t = n.protocol + "//" + t : t = "https://" + t), r = Oe(t)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/";
  const o = r.host.indexOf(":") !== -1 ? "[" + r.host + "]" : r.host;
  return r.id = r.protocol + "://" + o + ":" + r.port + e, r.href = r.protocol + "://" + o + (n && n.port === r.port ? "" : ":" + r.port), r;
}
const En = typeof ArrayBuffer == "function", Tn = (t) => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer, yt = Object.prototype.toString, kn = typeof Blob == "function" || typeof Blob < "u" && yt.call(Blob) === "[object BlobConstructor]", An = typeof File == "function" || typeof File < "u" && yt.call(File) === "[object FileConstructor]";
function De(t) {
  return En && (t instanceof ArrayBuffer || Tn(t)) || kn && t instanceof Blob || An && t instanceof File;
}
function fe(t, e) {
  if (!t || typeof t != "object")
    return !1;
  if (Array.isArray(t)) {
    for (let n = 0, r = t.length; n < r; n++)
      if (fe(t[n]))
        return !0;
    return !1;
  }
  if (De(t))
    return !0;
  if (t.toJSON && typeof t.toJSON == "function" && arguments.length === 1)
    return fe(t.toJSON(), !0);
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n) && fe(t[n]))
      return !0;
  return !1;
}
function On(t) {
  const e = [], n = t.data, r = t;
  return r.data = Ce(n, e), r.attachments = e.length, { packet: r, buffers: e };
}
function Ce(t, e) {
  if (!t)
    return t;
  if (De(t)) {
    const n = { _placeholder: !0, num: e.length };
    return e.push(t), n;
  } else if (Array.isArray(t)) {
    const n = new Array(t.length);
    for (let r = 0; r < t.length; r++)
      n[r] = Ce(t[r], e);
    return n;
  } else if (typeof t == "object" && !(t instanceof Date)) {
    const n = {};
    for (const r in t)
      Object.prototype.hasOwnProperty.call(t, r) && (n[r] = Ce(t[r], e));
    return n;
  }
  return t;
}
function Sn(t, e) {
  return t.data = xe(t.data, e), delete t.attachments, t;
}
function xe(t, e) {
  if (!t)
    return t;
  if (t && t._placeholder === !0) {
    if (typeof t.num == "number" && t.num >= 0 && t.num < e.length)
      return e[t.num];
    throw new Error("illegal attachments");
  } else if (Array.isArray(t))
    for (let n = 0; n < t.length; n++)
      t[n] = xe(t[n], e);
  else if (typeof t == "object")
    for (const n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (t[n] = xe(t[n], e));
  return t;
}
const Cn = [
  "connect",
  // used on the client side
  "connect_error",
  // used on the client side
  "disconnect",
  // used on both sides
  "disconnecting",
  // used on the server side
  "newListener",
  // used by the Node.js EventEmitter
  "removeListener"
  // used by the Node.js EventEmitter
];
var A;
(function(t) {
  t[t.CONNECT = 0] = "CONNECT", t[t.DISCONNECT = 1] = "DISCONNECT", t[t.EVENT = 2] = "EVENT", t[t.ACK = 3] = "ACK", t[t.CONNECT_ERROR = 4] = "CONNECT_ERROR", t[t.BINARY_EVENT = 5] = "BINARY_EVENT", t[t.BINARY_ACK = 6] = "BINARY_ACK";
})(A || (A = {}));
class xn {
  /**
   * Encoder constructor
   *
   * @param {function} replacer - custom replacer to pass down to JSON.parse
   */
  constructor(e) {
    this.replacer = e;
  }
  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   */
  encode(e) {
    return (e.type === A.EVENT || e.type === A.ACK) && fe(e) ? this.encodeAsBinary({
      type: e.type === A.EVENT ? A.BINARY_EVENT : A.BINARY_ACK,
      nsp: e.nsp,
      data: e.data,
      id: e.id
    }) : [this.encodeAsString(e)];
  }
  /**
   * Encode packet as string.
   */
  encodeAsString(e) {
    let n = "" + e.type;
    return (e.type === A.BINARY_EVENT || e.type === A.BINARY_ACK) && (n += e.attachments + "-"), e.nsp && e.nsp !== "/" && (n += e.nsp + ","), e.id != null && (n += e.id), e.data != null && (n += JSON.stringify(e.data, this.replacer)), n;
  }
  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   */
  encodeAsBinary(e) {
    const n = On(e), r = this.encodeAsString(n.packet), i = n.buffers;
    return i.unshift(r), i;
  }
}
class Fe extends I {
  /**
   * Decoder constructor
   *
   * @param {function} reviver - custom reviver to pass down to JSON.stringify
   */
  constructor(e) {
    super(), this.reviver = e;
  }
  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   */
  add(e) {
    let n;
    if (typeof e == "string") {
      if (this.reconstructor)
        throw new Error("got plaintext data when reconstructing a packet");
      n = this.decodeString(e);
      const r = n.type === A.BINARY_EVENT;
      r || n.type === A.BINARY_ACK ? (n.type = r ? A.EVENT : A.ACK, this.reconstructor = new Ln(n), n.attachments === 0 && super.emitReserved("decoded", n)) : super.emitReserved("decoded", n);
    } else if (De(e) || e.base64)
      if (this.reconstructor)
        n = this.reconstructor.takeBinaryData(e), n && (this.reconstructor = null, super.emitReserved("decoded", n));
      else
        throw new Error("got binary data when not reconstructing a packet");
    else
      throw new Error("Unknown type: " + e);
  }
  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   */
  decodeString(e) {
    let n = 0;
    const r = {
      type: Number(e.charAt(0))
    };
    if (A[r.type] === void 0)
      throw new Error("unknown packet type " + r.type);
    if (r.type === A.BINARY_EVENT || r.type === A.BINARY_ACK) {
      const o = n + 1;
      for (; e.charAt(++n) !== "-" && n != e.length; )
        ;
      const a = e.substring(o, n);
      if (a != Number(a) || e.charAt(n) !== "-")
        throw new Error("Illegal attachments");
      r.attachments = Number(a);
    }
    if (e.charAt(n + 1) === "/") {
      const o = n + 1;
      for (; ++n && !(e.charAt(n) === "," || n === e.length); )
        ;
      r.nsp = e.substring(o, n);
    } else
      r.nsp = "/";
    const i = e.charAt(n + 1);
    if (i !== "" && Number(i) == i) {
      const o = n + 1;
      for (; ++n; ) {
        const a = e.charAt(n);
        if (a == null || Number(a) != a) {
          --n;
          break;
        }
        if (n === e.length)
          break;
      }
      r.id = Number(e.substring(o, n + 1));
    }
    if (e.charAt(++n)) {
      const o = this.tryParse(e.substr(n));
      if (Fe.isPayloadValid(r.type, o))
        r.data = o;
      else
        throw new Error("invalid payload");
    }
    return r;
  }
  tryParse(e) {
    try {
      return JSON.parse(e, this.reviver);
    } catch {
      return !1;
    }
  }
  static isPayloadValid(e, n) {
    switch (e) {
      case A.CONNECT:
        return tt(n);
      case A.DISCONNECT:
        return n === void 0;
      case A.CONNECT_ERROR:
        return typeof n == "string" || tt(n);
      case A.EVENT:
      case A.BINARY_EVENT:
        return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && Cn.indexOf(n[0]) === -1);
      case A.ACK:
      case A.BINARY_ACK:
        return Array.isArray(n);
    }
  }
  /**
   * Deallocates a parser's resources
   */
  destroy() {
    this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null);
  }
}
class Ln {
  constructor(e) {
    this.packet = e, this.buffers = [], this.reconPack = e;
  }
  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   */
  takeBinaryData(e) {
    if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {
      const n = Sn(this.reconPack, this.buffers);
      return this.finishedReconstruction(), n;
    }
    return null;
  }
  /**
   * Cleans up binary packet reconstruction variables.
   */
  finishedReconstruction() {
    this.reconPack = null, this.buffers = [];
  }
}
function tt(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
const Rn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Decoder: Fe,
  Encoder: xn,
  get PacketType() {
    return A;
  }
}, Symbol.toStringTag, { value: "Module" }));
function U(t, e, n) {
  return t.on(e, n), function() {
    t.off(e, n);
  };
}
const Bn = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
  newListener: 1,
  removeListener: 1
});
class _t extends I {
  /**
   * `Socket` constructor.
   */
  constructor(e, n, r) {
    super(), this.connected = !1, this.recovered = !1, this.receiveBuffer = [], this.sendBuffer = [], this._queue = [], this._queueSeq = 0, this.ids = 0, this.acks = {}, this.flags = {}, this.io = e, this.nsp = n, r && r.auth && (this.auth = r.auth), this._opts = Object.assign({}, r), this.io._autoConnect && this.open();
  }
  /**
   * Whether the socket is currently disconnected
   *
   * @example
   * const socket = io();
   *
   * socket.on("connect", () => {
   *   console.log(socket.disconnected); // false
   * });
   *
   * socket.on("disconnect", () => {
   *   console.log(socket.disconnected); // true
   * });
   */
  get disconnected() {
    return !this.connected;
  }
  /**
   * Subscribe to open, close and packet events
   *
   * @private
   */
  subEvents() {
    if (this.subs)
      return;
    const e = this.io;
    this.subs = [
      U(e, "open", this.onopen.bind(this)),
      U(e, "packet", this.onpacket.bind(this)),
      U(e, "error", this.onerror.bind(this)),
      U(e, "close", this.onclose.bind(this))
    ];
  }
  /**
   * Whether the Socket will try to reconnect when its Manager connects or reconnects.
   *
   * @example
   * const socket = io();
   *
   * console.log(socket.active); // true
   *
   * socket.on("disconnect", (reason) => {
   *   if (reason === "io server disconnect") {
   *     // the disconnection was initiated by the server, you need to manually reconnect
   *     console.log(socket.active); // false
   *   }
   *   // else the socket will automatically try to reconnect
   *   console.log(socket.active); // true
   * });
   */
  get active() {
    return !!this.subs;
  }
  /**
   * "Opens" the socket.
   *
   * @example
   * const socket = io({
   *   autoConnect: false
   * });
   *
   * socket.connect();
   */
  connect() {
    return this.connected ? this : (this.subEvents(), this.io._reconnecting || this.io.open(), this.io._readyState === "open" && this.onopen(), this);
  }
  /**
   * Alias for {@link connect()}.
   */
  open() {
    return this.connect();
  }
  /**
   * Sends a `message` event.
   *
   * This method mimics the WebSocket.send() method.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
   *
   * @example
   * socket.send("hello");
   *
   * // this is equivalent to
   * socket.emit("message", "hello");
   *
   * @return self
   */
  send(...e) {
    return e.unshift("message"), this.emit.apply(this, e), this;
  }
  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @example
   * socket.emit("hello", "world");
   *
   * // all serializable datastructures are supported (no need to call JSON.stringify)
   * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
   *
   * // with an acknowledgement from the server
   * socket.emit("hello", "world", (val) => {
   *   // ...
   * });
   *
   * @return self
   */
  emit(e, ...n) {
    var r, i, o;
    if (Bn.hasOwnProperty(e))
      throw new Error('"' + e.toString() + '" is a reserved event name');
    if (n.unshift(e), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
      return this._addToQueue(n), this;
    const a = {
      type: A.EVENT,
      data: n
    };
    if (a.options = {}, a.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
      const u = this.ids++, l = n.pop();
      this._registerAckCallback(u, l), a.id = u;
    }
    const h = (i = (r = this.io.engine) === null || r === void 0 ? void 0 : r.transport) === null || i === void 0 ? void 0 : i.writable, s = this.connected && !(!((o = this.io.engine) === null || o === void 0) && o._hasPingExpired());
    return this.flags.volatile && !h || (s ? (this.notifyOutgoingListeners(a), this.packet(a)) : this.sendBuffer.push(a)), this.flags = {}, this;
  }
  /**
   * @private
   */
  _registerAckCallback(e, n) {
    var r;
    const i = (r = this.flags.timeout) !== null && r !== void 0 ? r : this._opts.ackTimeout;
    if (i === void 0) {
      this.acks[e] = n;
      return;
    }
    const o = this.io.setTimeoutFn(() => {
      delete this.acks[e];
      for (let h = 0; h < this.sendBuffer.length; h++)
        this.sendBuffer[h].id === e && this.sendBuffer.splice(h, 1);
      n.call(this, new Error("operation has timed out"));
    }, i), a = (...h) => {
      this.io.clearTimeoutFn(o), n.apply(this, h);
    };
    a.withError = !0, this.acks[e] = a;
  }
  /**
   * Emits an event and waits for an acknowledgement
   *
   * @example
   * // without timeout
   * const response = await socket.emitWithAck("hello", "world");
   *
   * // with a specific timeout
   * try {
   *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
   * } catch (err) {
   *   // the server did not acknowledge the event in the given delay
   * }
   *
   * @return a Promise that will be fulfilled when the server acknowledges the event
   */
  emitWithAck(e, ...n) {
    return new Promise((r, i) => {
      const o = (a, h) => a ? i(a) : r(h);
      o.withError = !0, n.push(o), this.emit(e, ...n);
    });
  }
  /**
   * Add the packet to the queue.
   * @param args
   * @private
   */
  _addToQueue(e) {
    let n;
    typeof e[e.length - 1] == "function" && (n = e.pop());
    const r = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: e,
      flags: Object.assign({ fromQueue: !0 }, this.flags)
    };
    e.push((i, ...o) => (this._queue[0], i !== null ? r.tryCount > this._opts.retries && (this._queue.shift(), n && n(i)) : (this._queue.shift(), n && n(null, ...o)), r.pending = !1, this._drainQueue())), this._queue.push(r), this._drainQueue();
  }
  /**
   * Send the first packet of the queue, and wait for an acknowledgement from the server.
   * @param force - whether to resend a packet that has not been acknowledged yet
   *
   * @private
   */
  _drainQueue(e = !1) {
    if (!this.connected || this._queue.length === 0)
      return;
    const n = this._queue[0];
    n.pending && !e || (n.pending = !0, n.tryCount++, this.flags = n.flags, this.emit.apply(this, n.args));
  }
  /**
   * Sends a packet.
   *
   * @param packet
   * @private
   */
  packet(e) {
    e.nsp = this.nsp, this.io._packet(e);
  }
  /**
   * Called upon engine `open`.
   *
   * @private
   */
  onopen() {
    typeof this.auth == "function" ? this.auth((e) => {
      this._sendConnectPacket(e);
    }) : this._sendConnectPacket(this.auth);
  }
  /**
   * Sends a CONNECT packet to initiate the Socket.IO session.
   *
   * @param data
   * @private
   */
  _sendConnectPacket(e) {
    this.packet({
      type: A.CONNECT,
      data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, e) : e
    });
  }
  /**
   * Called upon engine or manager `error`.
   *
   * @param err
   * @private
   */
  onerror(e) {
    this.connected || this.emitReserved("connect_error", e);
  }
  /**
   * Called upon engine `close`.
   *
   * @param reason
   * @param description
   * @private
   */
  onclose(e, n) {
    this.connected = !1, delete this.id, this.emitReserved("disconnect", e, n), this._clearAcks();
  }
  /**
   * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
   * the server.
   *
   * @private
   */
  _clearAcks() {
    Object.keys(this.acks).forEach((e) => {
      if (!this.sendBuffer.some((r) => String(r.id) === e)) {
        const r = this.acks[e];
        delete this.acks[e], r.withError && r.call(this, new Error("socket has been disconnected"));
      }
    });
  }
  /**
   * Called with socket packet.
   *
   * @param packet
   * @private
   */
  onpacket(e) {
    if (e.nsp === this.nsp)
      switch (e.type) {
        case A.CONNECT:
          e.data && e.data.sid ? this.onconnect(e.data.sid, e.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          break;
        case A.EVENT:
        case A.BINARY_EVENT:
          this.onevent(e);
          break;
        case A.ACK:
        case A.BINARY_ACK:
          this.onack(e);
          break;
        case A.DISCONNECT:
          this.ondisconnect();
          break;
        case A.CONNECT_ERROR:
          this.destroy();
          const r = new Error(e.data.message);
          r.data = e.data.data, this.emitReserved("connect_error", r);
          break;
      }
  }
  /**
   * Called upon a server event.
   *
   * @param packet
   * @private
   */
  onevent(e) {
    const n = e.data || [];
    e.id != null && n.push(this.ack(e.id)), this.connected ? this.emitEvent(n) : this.receiveBuffer.push(Object.freeze(n));
  }
  emitEvent(e) {
    if (this._anyListeners && this._anyListeners.length) {
      const n = this._anyListeners.slice();
      for (const r of n)
        r.apply(this, e);
    }
    super.emit.apply(this, e), this._pid && e.length && typeof e[e.length - 1] == "string" && (this._lastOffset = e[e.length - 1]);
  }
  /**
   * Produces an ack callback to emit with an event.
   *
   * @private
   */
  ack(e) {
    const n = this;
    let r = !1;
    return function(...i) {
      r || (r = !0, n.packet({
        type: A.ACK,
        id: e,
        data: i
      }));
    };
  }
  /**
   * Called upon a server acknowledgement.
   *
   * @param packet
   * @private
   */
  onack(e) {
    const n = this.acks[e.id];
    typeof n == "function" && (delete this.acks[e.id], n.withError && e.data.unshift(null), n.apply(this, e.data));
  }
  /**
   * Called upon server connect.
   *
   * @private
   */
  onconnect(e, n) {
    this.id = e, this.recovered = n && this._pid === n, this._pid = n, this.connected = !0, this.emitBuffered(), this._drainQueue(!0), this.emitReserved("connect");
  }
  /**
   * Emit buffered events (received and emitted).
   *
   * @private
   */
  emitBuffered() {
    this.receiveBuffer.forEach((e) => this.emitEvent(e)), this.receiveBuffer = [], this.sendBuffer.forEach((e) => {
      this.notifyOutgoingListeners(e), this.packet(e);
    }), this.sendBuffer = [];
  }
  /**
   * Called upon server disconnect.
   *
   * @private
   */
  ondisconnect() {
    this.destroy(), this.onclose("io server disconnect");
  }
  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @private
   */
  destroy() {
    this.subs && (this.subs.forEach((e) => e()), this.subs = void 0), this.io._destroy(this);
  }
  /**
   * Disconnects the socket manually. In that case, the socket will not try to reconnect.
   *
   * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
   *
   * @example
   * const socket = io();
   *
   * socket.on("disconnect", (reason) => {
   *   // console.log(reason); prints "io client disconnect"
   * });
   *
   * socket.disconnect();
   *
   * @return self
   */
  disconnect() {
    return this.connected && this.packet({ type: A.DISCONNECT }), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
  }
  /**
   * Alias for {@link disconnect()}.
   *
   * @return self
   */
  close() {
    return this.disconnect();
  }
  /**
   * Sets the compress flag.
   *
   * @example
   * socket.compress(false).emit("hello");
   *
   * @param compress - if `true`, compresses the sending data
   * @return self
   */
  compress(e) {
    return this.flags.compress = e, this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
   * ready to send messages.
   *
   * @example
   * socket.volatile.emit("hello"); // the server may or may not receive it
   *
   * @returns self
   */
  get volatile() {
    return this.flags.volatile = !0, this;
  }
  /**
   * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
   * given number of milliseconds have elapsed without an acknowledgement from the server:
   *
   * @example
   * socket.timeout(5000).emit("my-event", (err) => {
   *   if (err) {
   *     // the server did not acknowledge the event in the given delay
   *   }
   * });
   *
   * @returns self
   */
  timeout(e) {
    return this.flags.timeout = e, this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * @example
   * socket.onAny((event, ...args) => {
   *   console.log(`got ${event}`);
   * });
   *
   * @param listener
   */
  onAny(e) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.push(e), this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * @example
   * socket.prependAny((event, ...args) => {
   *   console.log(`got event ${event}`);
   * });
   *
   * @param listener
   */
  prependAny(e) {
    return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(e), this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`got event ${event}`);
   * }
   *
   * socket.onAny(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAny(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAny();
   *
   * @param listener
   */
  offAny(e) {
    if (!this._anyListeners)
      return this;
    if (e) {
      const n = this._anyListeners;
      for (let r = 0; r < n.length; r++)
        if (e === n[r])
          return n.splice(r, 1), this;
    } else
      this._anyListeners = [];
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAny() {
    return this._anyListeners || [];
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.onAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  onAnyOutgoing(e) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(e), this;
  }
  /**
   * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
   * callback. The listener is added to the beginning of the listeners array.
   *
   * Note: acknowledgements sent to the server are not included.
   *
   * @example
   * socket.prependAnyOutgoing((event, ...args) => {
   *   console.log(`sent event ${event}`);
   * });
   *
   * @param listener
   */
  prependAnyOutgoing(e) {
    return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(e), this;
  }
  /**
   * Removes the listener that will be fired when any event is emitted.
   *
   * @example
   * const catchAllListener = (event, ...args) => {
   *   console.log(`sent event ${event}`);
   * }
   *
   * socket.onAnyOutgoing(catchAllListener);
   *
   * // remove a specific listener
   * socket.offAnyOutgoing(catchAllListener);
   *
   * // or remove all listeners
   * socket.offAnyOutgoing();
   *
   * @param [listener] - the catch-all listener (optional)
   */
  offAnyOutgoing(e) {
    if (!this._anyOutgoingListeners)
      return this;
    if (e) {
      const n = this._anyOutgoingListeners;
      for (let r = 0; r < n.length; r++)
        if (e === n[r])
          return n.splice(r, 1), this;
    } else
      this._anyOutgoingListeners = [];
    return this;
  }
  /**
   * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
   * e.g. to remove listeners.
   */
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  /**
   * Notify the listeners for each packet sent
   *
   * @param packet
   *
   * @private
   */
  notifyOutgoingListeners(e) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const n = this._anyOutgoingListeners.slice();
      for (const r of n)
        r.apply(this, e.data);
    }
  }
}
function ee(t) {
  t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0;
}
ee.prototype.duration = function() {
  var t = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var e = Math.random(), n = Math.floor(e * this.jitter * t);
    t = Math.floor(e * 10) & 1 ? t + n : t - n;
  }
  return Math.min(t, this.max) | 0;
};
ee.prototype.reset = function() {
  this.attempts = 0;
};
ee.prototype.setMin = function(t) {
  this.ms = t;
};
ee.prototype.setMax = function(t) {
  this.max = t;
};
ee.prototype.setJitter = function(t) {
  this.jitter = t;
};
class Le extends I {
  constructor(e, n) {
    var r;
    super(), this.nsps = {}, this.subs = [], e && typeof e == "object" && (n = e, e = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, pe(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((r = n.randomizationFactor) !== null && r !== void 0 ? r : 0.5), this.backoff = new ee({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = e;
    const i = n.parser || Rn;
    this.encoder = new i.Encoder(), this.decoder = new i.Decoder(), this._autoConnect = n.autoConnect !== !1, this._autoConnect && this.open();
  }
  reconnection(e) {
    return arguments.length ? (this._reconnection = !!e, e || (this.skipReconnect = !0), this) : this._reconnection;
  }
  reconnectionAttempts(e) {
    return e === void 0 ? this._reconnectionAttempts : (this._reconnectionAttempts = e, this);
  }
  reconnectionDelay(e) {
    var n;
    return e === void 0 ? this._reconnectionDelay : (this._reconnectionDelay = e, (n = this.backoff) === null || n === void 0 || n.setMin(e), this);
  }
  randomizationFactor(e) {
    var n;
    return e === void 0 ? this._randomizationFactor : (this._randomizationFactor = e, (n = this.backoff) === null || n === void 0 || n.setJitter(e), this);
  }
  reconnectionDelayMax(e) {
    var n;
    return e === void 0 ? this._reconnectionDelayMax : (this._reconnectionDelayMax = e, (n = this.backoff) === null || n === void 0 || n.setMax(e), this);
  }
  timeout(e) {
    return arguments.length ? (this._timeout = e, this) : this._timeout;
  }
  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @private
   */
  maybeReconnectOnOpen() {
    !this._reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect();
  }
  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} fn - optional, callback
   * @return self
   * @public
   */
  open(e) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new wn(this.uri, this.opts);
    const n = this.engine, r = this;
    this._readyState = "opening", this.skipReconnect = !1;
    const i = U(n, "open", function() {
      r.onopen(), e && e();
    }), o = (h) => {
      this.cleanup(), this._readyState = "closed", this.emitReserved("error", h), e ? e(h) : this.maybeReconnectOnOpen();
    }, a = U(n, "error", o);
    if (this._timeout !== !1) {
      const h = this._timeout, s = this.setTimeoutFn(() => {
        i(), o(new Error("timeout")), n.close();
      }, h);
      this.opts.autoUnref && s.unref(), this.subs.push(() => {
        this.clearTimeoutFn(s);
      });
    }
    return this.subs.push(i), this.subs.push(a), this;
  }
  /**
   * Alias for open()
   *
   * @return self
   * @public
   */
  connect(e) {
    return this.open(e);
  }
  /**
   * Called upon transport open.
   *
   * @private
   */
  onopen() {
    this.cleanup(), this._readyState = "open", this.emitReserved("open");
    const e = this.engine;
    this.subs.push(
      U(e, "ping", this.onping.bind(this)),
      U(e, "data", this.ondata.bind(this)),
      U(e, "error", this.onerror.bind(this)),
      U(e, "close", this.onclose.bind(this)),
      // @ts-ignore
      U(this.decoder, "decoded", this.ondecoded.bind(this))
    );
  }
  /**
   * Called upon a ping.
   *
   * @private
   */
  onping() {
    this.emitReserved("ping");
  }
  /**
   * Called with data.
   *
   * @private
   */
  ondata(e) {
    try {
      this.decoder.add(e);
    } catch (n) {
      this.onclose("parse error", n);
    }
  }
  /**
   * Called when parser fully decodes a packet.
   *
   * @private
   */
  ondecoded(e) {
    de(() => {
      this.emitReserved("packet", e);
    }, this.setTimeoutFn);
  }
  /**
   * Called upon socket error.
   *
   * @private
   */
  onerror(e) {
    this.emitReserved("error", e);
  }
  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @public
   */
  socket(e, n) {
    let r = this.nsps[e];
    return r ? this._autoConnect && !r.active && r.connect() : (r = new _t(this, e, n), this.nsps[e] = r), r;
  }
  /**
   * Called upon a socket close.
   *
   * @param socket
   * @private
   */
  _destroy(e) {
    const n = Object.keys(this.nsps);
    for (const r of n)
      if (this.nsps[r].active)
        return;
    this._close();
  }
  /**
   * Writes a packet.
   *
   * @param packet
   * @private
   */
  _packet(e) {
    const n = this.encoder.encode(e);
    for (let r = 0; r < n.length; r++)
      this.engine.write(n[r], e.options);
  }
  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @private
   */
  cleanup() {
    this.subs.forEach((e) => e()), this.subs.length = 0, this.decoder.destroy();
  }
  /**
   * Close the current socket.
   *
   * @private
   */
  _close() {
    this.skipReconnect = !0, this._reconnecting = !1, this.onclose("forced close");
  }
  /**
   * Alias for close()
   *
   * @private
   */
  disconnect() {
    return this._close();
  }
  /**
   * Called when:
   *
   * - the low-level engine is closed
   * - the parser encountered a badly formatted packet
   * - all sockets are disconnected
   *
   * @private
   */
  onclose(e, n) {
    var r;
    this.cleanup(), (r = this.engine) === null || r === void 0 || r.close(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", e, n), this._reconnection && !this.skipReconnect && this.reconnect();
  }
  /**
   * Attempt a reconnection.
   *
   * @private
   */
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const e = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;
    else {
      const n = this.backoff.duration();
      this._reconnecting = !0;
      const r = this.setTimeoutFn(() => {
        e.skipReconnect || (this.emitReserved("reconnect_attempt", e.backoff.attempts), !e.skipReconnect && e.open((i) => {
          i ? (e._reconnecting = !1, e.reconnect(), this.emitReserved("reconnect_error", i)) : e.onreconnect();
        }));
      }, n);
      this.opts.autoUnref && r.unref(), this.subs.push(() => {
        this.clearTimeoutFn(r);
      });
    }
  }
  /**
   * Called upon successful reconnect.
   *
   * @private
   */
  onreconnect() {
    const e = this.backoff.attempts;
    this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", e);
  }
}
const re = {};
function he(t, e) {
  typeof t == "object" && (e = t, t = void 0), e = e || {};
  const n = bn(t, e.path || "/socket.io"), r = n.source, i = n.id, o = n.path, a = re[i] && o in re[i].nsps, h = e.forceNew || e["force new connection"] || e.multiplex === !1 || a;
  let s;
  return h ? s = new Le(r, e) : (re[i] || (re[i] = new Le(r, e)), s = re[i]), n.query && !e.query && (e.query = n.queryKey), s.socket(n.path, e);
}
Object.assign(he, {
  Manager: Le,
  Socket: _t,
  io: he,
  connect: he
});
const In = {
  transports: ["websocket"],
  upgrade: !1
};
function Nn(t = "", e = {}) {
  let n = he(t, { ...In, ...e });
  return {
    socket: n,
    on(...r) {
      if (!n)
        throw new Error("socket.io: Not connected");
      n.on(...r);
    },
    emit(...r) {
      return new Promise((i, o) => {
        if (!n)
          return o(new Error("socket.io: Not connected"));
        n.emit(...r, ({ payload: a, error: h }) => {
          h ? o(h) : i(a);
        });
      });
    }
  };
}
const { on: wt, emit: L } = Nn(), Pn = {
  getState: () => L("twitch.getState"),
  getEvents: () => L("twitch.getEvents"),
  getUser: (t) => L("twitch.getUser", t),
  setEvent: (t) => L("twitch.setEvent", t),
  getRewardList: () => L("twitch.getRewardList"),
  getCommandList: () => L("twitch.getCommandList"),
  getCommandNames: () => L("twitch.getCommandNames"),
  getCommandPrefix: () => L("twitch.getCommandPrefix"),
  getLastFollowers: () => L("twitch.getLastFollowers"),
  addCommand: (t) => L("twitch.addCommand", t),
  updateReward: (t) => L("twitch.updateReward", t),
  updateCommand: (t) => L("twitch.updateCommand", t),
  removeCommand: (t) => L("twitch.removeCommand", t),
  updateState: (t) => L("twitch.updateState", t),
  login: (t = !1) => L("twitch.login", t),
  on: (t, e) => wt(`twitch.${t}`, e),
  setSetting: (t, e) => L("twitch.setSetting", t, e),
  getSettings: () => L("twitch.getSettings")
}, Me = {
  quit: () => L("app.quit"),
  getOS: () => L("app.getOS"),
  getFonts: () => L("app.getFonts"),
  loadFont: (t) => L("app.loadFont", t),
  getUsedFonts: () => L("app.getUsedFonts"),
  getSettings: () => L("app.getSettings"),
  setSetting: (t, e) => L("app.setSetting", t, e),
  on: (t, e) => wt(`app.${t}`, e)
};
async function Dn() {
  return await Me.getFonts();
}
const Te = /* @__PURE__ */ new Map();
async function Fn(t, e = !0) {
  if (Te.has(t))
    return Te.get(t);
  const n = new FontFace(t, `url(${encodeURI(t)})`);
  return Te.set(t, n), await n.load(), e && Me.loadFont(t), document.fonts.add(n), n;
}
async function Mn() {
  return await Me.getUsedFonts();
}
async function kr(t = !0) {
  const e = await Mn(), n = await Dn();
  return e.forEach((r) => Fn(r, t)), n;
}
var bt = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: "normal",
  autoplay: !0,
  timelineOffset: 0
}, qe = {
  duration: 1e3,
  delay: 0,
  endDelay: 0,
  easing: "easeOutElastic(1, .5)",
  round: 0
}, qn = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"], le = {
  CSS: {},
  springs: {}
};
function z(t, e, n) {
  return Math.min(Math.max(t, e), n);
}
function se(t, e) {
  return t.indexOf(e) > -1;
}
function ke(t, e) {
  return t.apply(null, e);
}
var w = {
  arr: function(t) {
    return Array.isArray(t);
  },
  obj: function(t) {
    return se(Object.prototype.toString.call(t), "Object");
  },
  pth: function(t) {
    return w.obj(t) && t.hasOwnProperty("totalLength");
  },
  svg: function(t) {
    return t instanceof SVGElement;
  },
  inp: function(t) {
    return t instanceof HTMLInputElement;
  },
  dom: function(t) {
    return t.nodeType || w.svg(t);
  },
  str: function(t) {
    return typeof t == "string";
  },
  fnc: function(t) {
    return typeof t == "function";
  },
  und: function(t) {
    return typeof t > "u";
  },
  nil: function(t) {
    return w.und(t) || t === null;
  },
  hex: function(t) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t);
  },
  rgb: function(t) {
    return /^rgb/.test(t);
  },
  hsl: function(t) {
    return /^hsl/.test(t);
  },
  col: function(t) {
    return w.hex(t) || w.rgb(t) || w.hsl(t);
  },
  key: function(t) {
    return !bt.hasOwnProperty(t) && !qe.hasOwnProperty(t) && t !== "targets" && t !== "keyframes";
  }
};
function Et(t) {
  var e = /\(([^)]+)\)/.exec(t);
  return e ? e[1].split(",").map(function(n) {
    return parseFloat(n);
  }) : [];
}
function Tt(t, e) {
  var n = Et(t), r = z(w.und(n[0]) ? 1 : n[0], 0.1, 100), i = z(w.und(n[1]) ? 100 : n[1], 0.1, 100), o = z(w.und(n[2]) ? 10 : n[2], 0.1, 100), a = z(w.und(n[3]) ? 0 : n[3], 0.1, 100), h = Math.sqrt(i / r), s = o / (2 * Math.sqrt(i * r)), d = s < 1 ? h * Math.sqrt(1 - s * s) : 0, u = 1, l = s < 1 ? (s * h + -a) / d : -a + h;
  function g(b) {
    var _ = e ? e * b / 1e3 : b;
    return s < 1 ? _ = Math.exp(-_ * s * h) * (u * Math.cos(d * _) + l * Math.sin(d * _)) : _ = (u + l * _) * Math.exp(-_ * h), b === 0 || b === 1 ? b : 1 - _;
  }
  function T() {
    var b = le.springs[t];
    if (b)
      return b;
    for (var _ = 1 / 6, O = 0, k = 0; ; )
      if (O += _, g(O) === 1) {
        if (k++, k >= 16)
          break;
      } else
        k = 0;
    var v = O * _ * 1e3;
    return le.springs[t] = v, v;
  }
  return e ? g : T;
}
function Un(t) {
  return t === void 0 && (t = 10), function(e) {
    return Math.ceil(z(e, 1e-6, 1) * t) * (1 / t);
  };
}
var Vn = function() {
  var t = 11, e = 1 / (t - 1);
  function n(u, l) {
    return 1 - 3 * l + 3 * u;
  }
  function r(u, l) {
    return 3 * l - 6 * u;
  }
  function i(u) {
    return 3 * u;
  }
  function o(u, l, g) {
    return ((n(l, g) * u + r(l, g)) * u + i(l)) * u;
  }
  function a(u, l, g) {
    return 3 * n(l, g) * u * u + 2 * r(l, g) * u + i(l);
  }
  function h(u, l, g, T, b) {
    var _, O, k = 0;
    do
      O = l + (g - l) / 2, _ = o(O, T, b) - u, _ > 0 ? g = O : l = O;
    while (Math.abs(_) > 1e-7 && ++k < 10);
    return O;
  }
  function s(u, l, g, T) {
    for (var b = 0; b < 4; ++b) {
      var _ = a(l, g, T);
      if (_ === 0)
        return l;
      var O = o(l, g, T) - u;
      l -= O / _;
    }
    return l;
  }
  function d(u, l, g, T) {
    if (!(0 <= u && u <= 1 && 0 <= g && g <= 1))
      return;
    var b = new Float32Array(t);
    if (u !== l || g !== T)
      for (var _ = 0; _ < t; ++_)
        b[_] = o(_ * e, u, g);
    function O(k) {
      for (var v = 0, y = 1, C = t - 1; y !== C && b[y] <= k; ++y)
        v += e;
      --y;
      var q = (k - b[y]) / (b[y + 1] - b[y]), R = v + q * e, j = a(R, u, g);
      return j >= 1e-3 ? s(k, R, u, g) : j === 0 ? R : h(k, v, v + e, u, g);
    }
    return function(k) {
      return u === l && g === T || k === 0 || k === 1 ? k : o(O(k), l, T);
    };
  }
  return d;
}(), kt = function() {
  var t = { linear: function() {
    return function(r) {
      return r;
    };
  } }, e = {
    Sine: function() {
      return function(r) {
        return 1 - Math.cos(r * Math.PI / 2);
      };
    },
    Expo: function() {
      return function(r) {
        return r ? Math.pow(2, 10 * r - 10) : 0;
      };
    },
    Circ: function() {
      return function(r) {
        return 1 - Math.sqrt(1 - r * r);
      };
    },
    Back: function() {
      return function(r) {
        return r * r * (3 * r - 2);
      };
    },
    Bounce: function() {
      return function(r) {
        for (var i, o = 4; r < ((i = Math.pow(2, --o)) - 1) / 11; )
          ;
        return 1 / Math.pow(4, 3 - o) - 7.5625 * Math.pow((i * 3 - 2) / 22 - r, 2);
      };
    },
    Elastic: function(r, i) {
      r === void 0 && (r = 1), i === void 0 && (i = 0.5);
      var o = z(r, 1, 10), a = z(i, 0.1, 2);
      return function(h) {
        return h === 0 || h === 1 ? h : -o * Math.pow(2, 10 * (h - 1)) * Math.sin((h - 1 - a / (Math.PI * 2) * Math.asin(1 / o)) * (Math.PI * 2) / a);
      };
    }
  }, n = ["Quad", "Cubic", "Quart", "Quint"];
  return n.forEach(function(r, i) {
    e[r] = function() {
      return function(o) {
        return Math.pow(o, i + 2);
      };
    };
  }), Object.keys(e).forEach(function(r) {
    var i = e[r];
    t["easeIn" + r] = i, t["easeOut" + r] = function(o, a) {
      return function(h) {
        return 1 - i(o, a)(1 - h);
      };
    }, t["easeInOut" + r] = function(o, a) {
      return function(h) {
        return h < 0.5 ? i(o, a)(h * 2) / 2 : 1 - i(o, a)(h * -2 + 2) / 2;
      };
    }, t["easeOutIn" + r] = function(o, a) {
      return function(h) {
        return h < 0.5 ? (1 - i(o, a)(1 - h * 2)) / 2 : (i(o, a)(h * 2 - 1) + 1) / 2;
      };
    };
  }), t;
}();
function Ue(t, e) {
  if (w.fnc(t))
    return t;
  var n = t.split("(")[0], r = kt[n], i = Et(t);
  switch (n) {
    case "spring":
      return Tt(t, e);
    case "cubicBezier":
      return ke(Vn, i);
    case "steps":
      return ke(Un, i);
    default:
      return ke(r, i);
  }
}
function At(t) {
  try {
    var e = document.querySelectorAll(t);
    return e;
  } catch {
    return;
  }
}
function ge(t, e) {
  for (var n = t.length, r = arguments.length >= 2 ? arguments[1] : void 0, i = [], o = 0; o < n; o++)
    if (o in t) {
      var a = t[o];
      e.call(r, a, o, t) && i.push(a);
    }
  return i;
}
function me(t) {
  return t.reduce(function(e, n) {
    return e.concat(w.arr(n) ? me(n) : n);
  }, []);
}
function nt(t) {
  return w.arr(t) ? t : (w.str(t) && (t = At(t) || t), t instanceof NodeList || t instanceof HTMLCollection ? [].slice.call(t) : [t]);
}
function Ve(t, e) {
  return t.some(function(n) {
    return n === e;
  });
}
function je(t) {
  var e = {};
  for (var n in t)
    e[n] = t[n];
  return e;
}
function Re(t, e) {
  var n = je(t);
  for (var r in t)
    n[r] = e.hasOwnProperty(r) ? e[r] : t[r];
  return n;
}
function ve(t, e) {
  var n = je(t);
  for (var r in e)
    n[r] = w.und(t[r]) ? e[r] : t[r];
  return n;
}
function jn(t) {
  var e = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(t);
  return e ? "rgba(" + e[1] + ",1)" : t;
}
function Hn(t) {
  var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, n = t.replace(e, function(h, s, d, u) {
    return s + s + d + d + u + u;
  }), r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n), i = parseInt(r[1], 16), o = parseInt(r[2], 16), a = parseInt(r[3], 16);
  return "rgba(" + i + "," + o + "," + a + ",1)";
}
function zn(t) {
  var e = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(t), n = parseInt(e[1], 10) / 360, r = parseInt(e[2], 10) / 100, i = parseInt(e[3], 10) / 100, o = e[4] || 1;
  function a(g, T, b) {
    return b < 0 && (b += 1), b > 1 && (b -= 1), b < 1 / 6 ? g + (T - g) * 6 * b : b < 1 / 2 ? T : b < 2 / 3 ? g + (T - g) * (2 / 3 - b) * 6 : g;
  }
  var h, s, d;
  if (r == 0)
    h = s = d = i;
  else {
    var u = i < 0.5 ? i * (1 + r) : i + r - i * r, l = 2 * i - u;
    h = a(l, u, n + 1 / 3), s = a(l, u, n), d = a(l, u, n - 1 / 3);
  }
  return "rgba(" + h * 255 + "," + s * 255 + "," + d * 255 + "," + o + ")";
}
function Wn(t) {
  if (w.rgb(t))
    return jn(t);
  if (w.hex(t))
    return Hn(t);
  if (w.hsl(t))
    return zn(t);
}
function Y(t) {
  var e = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(t);
  if (e)
    return e[1];
}
function Qn(t) {
  if (se(t, "translate") || t === "perspective")
    return "px";
  if (se(t, "rotate") || se(t, "skew"))
    return "deg";
}
function Be(t, e) {
  return w.fnc(t) ? t(e.target, e.id, e.total) : t;
}
function W(t, e) {
  return t.getAttribute(e);
}
function He(t, e, n) {
  var r = Y(e);
  if (Ve([n, "deg", "rad", "turn"], r))
    return e;
  var i = le.CSS[e + n];
  if (!w.und(i))
    return i;
  var o = 100, a = document.createElement(t.tagName), h = t.parentNode && t.parentNode !== document ? t.parentNode : document.body;
  h.appendChild(a), a.style.position = "absolute", a.style.width = o + n;
  var s = o / a.offsetWidth;
  h.removeChild(a);
  var d = s * parseFloat(e);
  return le.CSS[e + n] = d, d;
}
function Ot(t, e, n) {
  if (e in t.style) {
    var r = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), i = t.style[e] || getComputedStyle(t).getPropertyValue(r) || "0";
    return n ? He(t, i, n) : i;
  }
}
function ze(t, e) {
  if (w.dom(t) && !w.inp(t) && (!w.nil(W(t, e)) || w.svg(t) && t[e]))
    return "attribute";
  if (w.dom(t) && Ve(qn, e))
    return "transform";
  if (w.dom(t) && e !== "transform" && Ot(t, e))
    return "css";
  if (t[e] != null)
    return "object";
}
function St(t) {
  if (w.dom(t)) {
    for (var e = t.style.transform || "", n = /(\w+)\(([^)]*)\)/g, r = /* @__PURE__ */ new Map(), i; i = n.exec(e); )
      r.set(i[1], i[2]);
    return r;
  }
}
function Kn(t, e, n, r) {
  var i = se(e, "scale") ? 1 : 0 + Qn(e), o = St(t).get(e) || i;
  return n && (n.transforms.list.set(e, o), n.transforms.last = e), r ? He(t, o, r) : o;
}
function We(t, e, n, r) {
  switch (ze(t, e)) {
    case "transform":
      return Kn(t, e, r, n);
    case "css":
      return Ot(t, e, n);
    case "attribute":
      return W(t, e);
    default:
      return t[e] || 0;
  }
}
function Qe(t, e) {
  var n = /^(\*=|\+=|-=)/.exec(t);
  if (!n)
    return t;
  var r = Y(t) || 0, i = parseFloat(e), o = parseFloat(t.replace(n[0], ""));
  switch (n[0][0]) {
    case "+":
      return i + o + r;
    case "-":
      return i - o + r;
    case "*":
      return i * o + r;
  }
}
function Ct(t, e) {
  if (w.col(t))
    return Wn(t);
  if (/\s/g.test(t))
    return t;
  var n = Y(t), r = n ? t.substr(0, t.length - n.length) : t;
  return e ? r + e : r;
}
function Ke(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function Yn(t) {
  return Math.PI * 2 * W(t, "r");
}
function Jn(t) {
  return W(t, "width") * 2 + W(t, "height") * 2;
}
function Xn(t) {
  return Ke(
    { x: W(t, "x1"), y: W(t, "y1") },
    { x: W(t, "x2"), y: W(t, "y2") }
  );
}
function xt(t) {
  for (var e = t.points, n = 0, r, i = 0; i < e.numberOfItems; i++) {
    var o = e.getItem(i);
    i > 0 && (n += Ke(r, o)), r = o;
  }
  return n;
}
function Zn(t) {
  var e = t.points;
  return xt(t) + Ke(e.getItem(e.numberOfItems - 1), e.getItem(0));
}
function Lt(t) {
  if (t.getTotalLength)
    return t.getTotalLength();
  switch (t.tagName.toLowerCase()) {
    case "circle":
      return Yn(t);
    case "rect":
      return Jn(t);
    case "line":
      return Xn(t);
    case "polyline":
      return xt(t);
    case "polygon":
      return Zn(t);
  }
}
function $n(t) {
  var e = Lt(t);
  return t.setAttribute("stroke-dasharray", e), e;
}
function Gn(t) {
  for (var e = t.parentNode; w.svg(e) && w.svg(e.parentNode); )
    e = e.parentNode;
  return e;
}
function Rt(t, e) {
  var n = e || {}, r = n.el || Gn(t), i = r.getBoundingClientRect(), o = W(r, "viewBox"), a = i.width, h = i.height, s = n.viewBox || (o ? o.split(" ") : [0, 0, a, h]);
  return {
    el: r,
    viewBox: s,
    x: s[0] / 1,
    y: s[1] / 1,
    w: a,
    h,
    vW: s[2],
    vH: s[3]
  };
}
function er(t, e) {
  var n = w.str(t) ? At(t)[0] : t, r = e || 100;
  return function(i) {
    return {
      property: i,
      el: n,
      svg: Rt(n),
      totalLength: Lt(n) * (r / 100)
    };
  };
}
function tr(t, e, n) {
  function r(u) {
    u === void 0 && (u = 0);
    var l = e + u >= 1 ? e + u : 0;
    return t.el.getPointAtLength(l);
  }
  var i = Rt(t.el, t.svg), o = r(), a = r(-1), h = r(1), s = n ? 1 : i.w / i.vW, d = n ? 1 : i.h / i.vH;
  switch (t.property) {
    case "x":
      return (o.x - i.x) * s;
    case "y":
      return (o.y - i.y) * d;
    case "angle":
      return Math.atan2(h.y - a.y, h.x - a.x) * 180 / Math.PI;
  }
}
function rt(t, e) {
  var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, r = Ct(w.pth(t) ? t.totalLength : t, e) + "";
  return {
    original: r,
    numbers: r.match(n) ? r.match(n).map(Number) : [0],
    strings: w.str(t) || e ? r.split(n) : []
  };
}
function Ye(t) {
  var e = t ? me(w.arr(t) ? t.map(nt) : nt(t)) : [];
  return ge(e, function(n, r, i) {
    return i.indexOf(n) === r;
  });
}
function Bt(t) {
  var e = Ye(t);
  return e.map(function(n, r) {
    return { target: n, id: r, total: e.length, transforms: { list: St(n) } };
  });
}
function nr(t, e) {
  var n = je(e);
  if (/^spring/.test(n.easing) && (n.duration = Tt(n.easing)), w.arr(t)) {
    var r = t.length, i = r === 2 && !w.obj(t[0]);
    i ? t = { value: t } : w.fnc(e.duration) || (n.duration = e.duration / r);
  }
  var o = w.arr(t) ? t : [t];
  return o.map(function(a, h) {
    var s = w.obj(a) && !w.pth(a) ? a : { value: a };
    return w.und(s.delay) && (s.delay = h ? 0 : e.delay), w.und(s.endDelay) && (s.endDelay = h === o.length - 1 ? e.endDelay : 0), s;
  }).map(function(a) {
    return ve(a, n);
  });
}
function rr(t) {
  for (var e = ge(me(t.map(function(o) {
    return Object.keys(o);
  })), function(o) {
    return w.key(o);
  }).reduce(function(o, a) {
    return o.indexOf(a) < 0 && o.push(a), o;
  }, []), n = {}, r = function(o) {
    var a = e[o];
    n[a] = t.map(function(h) {
      var s = {};
      for (var d in h)
        w.key(d) ? d == a && (s.value = h[d]) : s[d] = h[d];
      return s;
    });
  }, i = 0; i < e.length; i++) r(i);
  return n;
}
function ir(t, e) {
  var n = [], r = e.keyframes;
  r && (e = ve(rr(r), e));
  for (var i in e)
    w.key(i) && n.push({
      name: i,
      tweens: nr(e[i], t)
    });
  return n;
}
function sr(t, e) {
  var n = {};
  for (var r in t) {
    var i = Be(t[r], e);
    w.arr(i) && (i = i.map(function(o) {
      return Be(o, e);
    }), i.length === 1 && (i = i[0])), n[r] = i;
  }
  return n.duration = parseFloat(n.duration), n.delay = parseFloat(n.delay), n;
}
function or(t, e) {
  var n;
  return t.tweens.map(function(r) {
    var i = sr(r, e), o = i.value, a = w.arr(o) ? o[1] : o, h = Y(a), s = We(e.target, t.name, h, e), d = n ? n.to.original : s, u = w.arr(o) ? o[0] : d, l = Y(u) || Y(s), g = h || l;
    return w.und(a) && (a = d), i.from = rt(u, g), i.to = rt(Qe(a, u), g), i.start = n ? n.end : 0, i.end = i.start + i.delay + i.duration + i.endDelay, i.easing = Ue(i.easing, i.duration), i.isPath = w.pth(o), i.isPathTargetInsideSVG = i.isPath && w.svg(e.target), i.isColor = w.col(i.from.original), i.isColor && (i.round = 1), n = i, i;
  });
}
var It = {
  css: function(t, e, n) {
    return t.style[e] = n;
  },
  attribute: function(t, e, n) {
    return t.setAttribute(e, n);
  },
  object: function(t, e, n) {
    return t[e] = n;
  },
  transform: function(t, e, n, r, i) {
    if (r.list.set(e, n), e === r.last || i) {
      var o = "";
      r.list.forEach(function(a, h) {
        o += h + "(" + a + ") ";
      }), t.style.transform = o;
    }
  }
};
function Nt(t, e) {
  var n = Bt(t);
  n.forEach(function(r) {
    for (var i in e) {
      var o = Be(e[i], r), a = r.target, h = Y(o), s = We(a, i, h, r), d = h || Y(s), u = Qe(Ct(o, d), s), l = ze(a, i);
      It[l](a, i, u, r.transforms, !0);
    }
  });
}
function ar(t, e) {
  var n = ze(t.target, e.name);
  if (n) {
    var r = or(e, t), i = r[r.length - 1];
    return {
      type: n,
      property: e.name,
      animatable: t,
      tweens: r,
      duration: i.end,
      delay: r[0].delay,
      endDelay: i.endDelay
    };
  }
}
function cr(t, e) {
  return ge(me(t.map(function(n) {
    return e.map(function(r) {
      return ar(n, r);
    });
  })), function(n) {
    return !w.und(n);
  });
}
function Pt(t, e) {
  var n = t.length, r = function(o) {
    return o.timelineOffset ? o.timelineOffset : 0;
  }, i = {};
  return i.duration = n ? Math.max.apply(Math, t.map(function(o) {
    return r(o) + o.duration;
  })) : e.duration, i.delay = n ? Math.min.apply(Math, t.map(function(o) {
    return r(o) + o.delay;
  })) : e.delay, i.endDelay = n ? i.duration - Math.max.apply(Math, t.map(function(o) {
    return r(o) + o.duration - o.endDelay;
  })) : e.endDelay, i;
}
var it = 0;
function ur(t) {
  var e = Re(bt, t), n = Re(qe, t), r = ir(n, t), i = Bt(t.targets), o = cr(i, r), a = Pt(o, n), h = it;
  return it++, ve(e, {
    id: h,
    children: [],
    animatables: i,
    animations: o,
    duration: a.duration,
    delay: a.delay,
    endDelay: a.endDelay
  });
}
var V = [], Dt = function() {
  var t;
  function e() {
    !t && (!st() || !B.suspendWhenDocumentHidden) && V.length > 0 && (t = requestAnimationFrame(n));
  }
  function n(i) {
    for (var o = V.length, a = 0; a < o; ) {
      var h = V[a];
      h.paused ? (V.splice(a, 1), o--) : (h.tick(i), a++);
    }
    t = a > 0 ? requestAnimationFrame(n) : void 0;
  }
  function r() {
    B.suspendWhenDocumentHidden && (st() ? t = cancelAnimationFrame(t) : (V.forEach(
      function(i) {
        return i._onDocumentVisibility();
      }
    ), Dt()));
  }
  return typeof document < "u" && document.addEventListener("visibilitychange", r), e;
}();
function st() {
  return !!document && document.hidden;
}
function B(t) {
  t === void 0 && (t = {});
  var e = 0, n = 0, r = 0, i, o = 0, a = null;
  function h(v) {
    var y = window.Promise && new Promise(function(C) {
      return a = C;
    });
    return v.finished = y, y;
  }
  var s = ur(t);
  h(s);
  function d() {
    var v = s.direction;
    v !== "alternate" && (s.direction = v !== "normal" ? "normal" : "reverse"), s.reversed = !s.reversed, i.forEach(function(y) {
      return y.reversed = s.reversed;
    });
  }
  function u(v) {
    return s.reversed ? s.duration - v : v;
  }
  function l() {
    e = 0, n = u(s.currentTime) * (1 / B.speed);
  }
  function g(v, y) {
    y && y.seek(v - y.timelineOffset);
  }
  function T(v) {
    if (s.reversePlayback)
      for (var C = o; C--; )
        g(v, i[C]);
    else
      for (var y = 0; y < o; y++)
        g(v, i[y]);
  }
  function b(v) {
    for (var y = 0, C = s.animations, q = C.length; y < q; ) {
      var R = C[y], j = R.animatable, J = R.tweens, x = J.length - 1, f = J[x];
      x && (f = ge(J, function(ye) {
        return v < ye.end;
      })[0] || f);
      for (var m = z(v - f.start - f.delay, 0, f.duration) / f.duration, c = isNaN(m) ? 1 : f.easing(m), p = f.to.strings, E = f.round, S = [], P = f.to.numbers.length, F = void 0, D = 0; D < P; D++) {
        var H = void 0, Z = f.to.numbers[D], $ = f.from.numbers[D] || 0;
        f.isPath ? H = tr(f.value, c * Z, f.isPathTargetInsideSVG) : H = $ + c * (Z - $), E && (f.isColor && D > 2 || (H = Math.round(H * E) / E)), S.push(H);
      }
      var G = p.length;
      if (!G)
        F = S[0];
      else {
        F = p[0];
        for (var N = 0; N < G; N++) {
          p[N];
          var te = p[N + 1], ne = S[N];
          isNaN(ne) || (te ? F += ne + te : F += ne + " ");
        }
      }
      It[R.type](j.target, R.property, F, j.transforms), R.currentValue = F, y++;
    }
  }
  function _(v) {
    s[v] && !s.passThrough && s[v](s);
  }
  function O() {
    s.remaining && s.remaining !== !0 && s.remaining--;
  }
  function k(v) {
    var y = s.duration, C = s.delay, q = y - s.endDelay, R = u(v);
    s.progress = z(R / y * 100, 0, 100), s.reversePlayback = R < s.currentTime, i && T(R), !s.began && s.currentTime > 0 && (s.began = !0, _("begin")), !s.loopBegan && s.currentTime > 0 && (s.loopBegan = !0, _("loopBegin")), R <= C && s.currentTime !== 0 && b(0), (R >= q && s.currentTime !== y || !y) && b(y), R > C && R < q ? (s.changeBegan || (s.changeBegan = !0, s.changeCompleted = !1, _("changeBegin")), _("change"), b(R)) : s.changeBegan && (s.changeCompleted = !0, s.changeBegan = !1, _("changeComplete")), s.currentTime = z(R, 0, y), s.began && _("update"), v >= y && (n = 0, O(), s.remaining ? (e = r, _("loopComplete"), s.loopBegan = !1, s.direction === "alternate" && d()) : (s.paused = !0, s.completed || (s.completed = !0, _("loopComplete"), _("complete"), !s.passThrough && "Promise" in window && (a(), h(s)))));
  }
  return s.reset = function() {
    var v = s.direction;
    s.passThrough = !1, s.currentTime = 0, s.progress = 0, s.paused = !0, s.began = !1, s.loopBegan = !1, s.changeBegan = !1, s.completed = !1, s.changeCompleted = !1, s.reversePlayback = !1, s.reversed = v === "reverse", s.remaining = s.loop, i = s.children, o = i.length;
    for (var y = o; y--; )
      s.children[y].reset();
    (s.reversed && s.loop !== !0 || v === "alternate" && s.loop === 1) && s.remaining++, b(s.reversed ? s.duration : 0);
  }, s._onDocumentVisibility = l, s.set = function(v, y) {
    return Nt(v, y), s;
  }, s.tick = function(v) {
    r = v, e || (e = r), k((r + (n - e)) * B.speed);
  }, s.seek = function(v) {
    k(u(v));
  }, s.pause = function() {
    s.paused = !0, l();
  }, s.play = function() {
    s.paused && (s.completed && s.reset(), s.paused = !1, V.push(s), l(), Dt());
  }, s.reverse = function() {
    d(), s.completed = !s.reversed, l();
  }, s.restart = function() {
    s.reset(), s.play();
  }, s.remove = function(v) {
    var y = Ye(v);
    Ft(y, s);
  }, s.reset(), s.autoplay && s.play(), s;
}
function ot(t, e) {
  for (var n = e.length; n--; )
    Ve(t, e[n].animatable.target) && e.splice(n, 1);
}
function Ft(t, e) {
  var n = e.animations, r = e.children;
  ot(t, n);
  for (var i = r.length; i--; ) {
    var o = r[i], a = o.animations;
    ot(t, a), !a.length && !o.children.length && r.splice(i, 1);
  }
  !n.length && !r.length && e.pause();
}
function fr(t) {
  for (var e = Ye(t), n = V.length; n--; ) {
    var r = V[n];
    Ft(e, r);
  }
}
function hr(t, e) {
  e === void 0 && (e = {});
  var n = e.direction || "normal", r = e.easing ? Ue(e.easing) : null, i = e.grid, o = e.axis, a = e.from || 0, h = a === "first", s = a === "center", d = a === "last", u = w.arr(t), l = parseFloat(u ? t[0] : t), g = u ? parseFloat(t[1]) : 0, T = Y(u ? t[1] : t) || 0, b = e.start || 0 + (u ? l : 0), _ = [], O = 0;
  return function(k, v, y) {
    if (h && (a = 0), s && (a = (y - 1) / 2), d && (a = y - 1), !_.length) {
      for (var C = 0; C < y; C++) {
        if (!i)
          _.push(Math.abs(a - C));
        else {
          var q = s ? (i[0] - 1) / 2 : a % i[0], R = s ? (i[1] - 1) / 2 : Math.floor(a / i[0]), j = C % i[0], J = Math.floor(C / i[0]), x = q - j, f = R - J, m = Math.sqrt(x * x + f * f);
          o === "x" && (m = -x), o === "y" && (m = -f), _.push(m);
        }
        O = Math.max.apply(Math, _);
      }
      r && (_ = _.map(function(p) {
        return r(p / O) * O;
      })), n === "reverse" && (_ = _.map(function(p) {
        return o ? p < 0 ? p * -1 : -p : Math.abs(O - p);
      }));
    }
    var c = u ? (g - l) / O : l;
    return b + c * (Math.round(_[v] * 100) / 100) + T;
  };
}
function lr(t) {
  t === void 0 && (t = {});
  var e = B(t);
  return e.duration = 0, e.add = function(n, r) {
    var i = V.indexOf(e), o = e.children;
    i > -1 && V.splice(i, 1);
    function a(g) {
      g.passThrough = !0;
    }
    for (var h = 0; h < o.length; h++)
      a(o[h]);
    var s = ve(n, Re(qe, t));
    s.targets = s.targets || t.targets;
    var d = e.duration;
    s.autoplay = !1, s.direction = e.direction, s.timelineOffset = w.und(r) ? d : Qe(r, d), a(e), e.seek(s.timelineOffset);
    var u = B(s);
    a(u), o.push(u);
    var l = Pt(o, t);
    return e.delay = l.delay, e.endDelay = l.endDelay, e.duration = l.duration, e.seek(0), e.reset(), e.autoplay && e.play(), e;
  }, e;
}
B.version = "3.2.1";
B.speed = 1;
B.suspendWhenDocumentHidden = !0;
B.running = V;
B.remove = fr;
B.get = We;
B.set = Nt;
B.convertPx = He;
B.path = er;
B.setDashoffset = $n;
B.stagger = hr;
B.timeline = lr;
B.easing = Ue;
B.penner = kt;
B.random = function(t, e) {
  return Math.floor(Math.random() * (e - t + 1)) + t;
};
const Ar = {
  audio: ["volume"],
  video: ["volume"]
}, Or = {
  text: [
    "top",
    "left",
    "width",
    "font-size",
    "font-family",
    "font-weight",
    "text-align",
    "color",
    "opacity",
    "z-index",
    "text-shadow",
    "-webkit-text-stroke-width",
    "-webkit-text-stroke-color"
  ],
  image: ["top", "left", "width", "height", "opacity", "z-index"],
  video: ["top", "left", "width", "height", "opacity", "z-index"]
}, Sr = {
  text: ["rotate", "scale"],
  image: ["rotate", "scale"],
  video: ["rotate", "scale"]
}, Cr = {
  volume: {
    default: 0.8,
    input: { type: "number", min: 0, max: 1, step: 0.1 }
  }
}, Mt = {
  top: {
    default: 0,
    unit: "px",
    input: { type: "number", step: 10 }
  },
  left: {
    default: 0,
    unit: "px",
    input: { type: "number", step: 10 }
  },
  width: {
    default: 800,
    unit: "px",
    input: { type: "number", min: 0, step: 10 }
  },
  height: {
    default: 600,
    unit: "px",
    input: { type: "number", min: 0, step: 10 }
  },
  opacity: {
    default: 1,
    input: { type: "number", min: 0, max: 1, step: 0.1 }
  },
  "z-index": {
    default: 1,
    input: { type: "number", min: 1, step: 1 }
  },
  "font-size": {
    default: 72,
    unit: "px",
    input: { type: "number", min: 0, step: 10 }
  },
  "font-weight": {
    default: 700,
    input: { type: "number", min: 100, max: 900, step: 100 }
  },
  "font-family": {
    type: "string",
    default: "",
    input: { type: "fontpicker" }
  },
  "text-align": {
    default: "center",
    input: { type: "select", items: ["left", "center", "right"] }
  },
  "-webkit-text-stroke-width": {
    default: 1,
    unit: "px",
    input: { type: "number", min: 0, step: 1 }
  },
  "-webkit-text-stroke-color": {
    default: "#111111",
    input: { type: "colorpicker" }
  },
  "text-shadow": {
    default: "2px 2px 0 #111111",
    input: { type: "textshadow" }
  },
  color: {
    default: "#eeeeee",
    input: { type: "colorpicker" }
  }
}, dr = {
  translateX: {
    default: 0,
    unit: "px",
    input: { type: "number", step: 10 }
  },
  translateY: {
    default: 0,
    unit: "px",
    input: { type: "number", step: 10 }
  },
  translateZ: {
    default: 0,
    unit: "px",
    input: { type: "number", step: 10 }
  },
  rotate: {
    default: 0,
    unit: "deg",
    input: { type: "number", step: 5 }
  },
  rotateX: {
    default: 0,
    unit: "deg",
    input: { type: "number", step: 5 }
  },
  rotateY: {
    default: 0,
    unit: "deg",
    input: { type: "number", step: 5 }
  },
  rotateZ: {
    default: 0,
    unit: "deg",
    input: { type: "number", step: 5 }
  },
  scale: {
    default: 1,
    input: { type: "number", step: 0.1 }
  },
  scaleX: {
    default: 1,
    input: { type: "number", step: 0.1 }
  },
  scaleY: {
    default: 1,
    input: { type: "number", step: 0.1 }
  },
  scaleZ: {
    default: 1,
    input: { type: "number", step: 0.1 }
  },
  skew: {
    default: 1,
    unit: "deg",
    input: { type: "number", step: 1 }
  },
  skewX: {
    default: 1,
    unit: "deg",
    input: { type: "number", step: 1 }
  },
  skewY: {
    default: 1,
    unit: "deg",
    input: { type: "number", step: 1 }
  },
  perspective: {
    default: 0,
    unit: "px",
    input: { type: "number", step: 1 }
  }
}, xr = [
  "linear",
  "easeInQuad",
  "easeOutQuad",
  "easeInOutQuad",
  "easeOutInQuad",
  "easeInCubic",
  "easeOutCubic",
  "easeInOutCubic",
  "easeOutInCubic",
  "easeInQuart",
  "easeOutQuart",
  "easeInOutQuart",
  "easeOutInQuart",
  "easeInQuint",
  "easeOutQuint",
  "easeInOutQuint",
  "easeOutInQuint",
  "easeInSine",
  "easeOutSine",
  "easeInOutSine",
  "easeOutInSine",
  "easeInExpo",
  "easeOutExpo",
  "easeInOutExpo",
  "easeOutInExpo",
  "easeInCirc",
  "easeOutCirc",
  "easeInOutCirc",
  "easeOutInCirc",
  "easeInBack",
  "easeOutBack",
  "easeInOutBack",
  "easeOutInBack",
  "easeInBounce",
  "easeOutBounce",
  "easeInOutBounce",
  "easeOutInBounce"
], Je = "/files";
function pr(t) {
  return new Promise((e, n) => {
    const r = new Image();
    r.onerror = () => n(new Error(`Invalid image ${t}`)), r.onload = () => e(r), r.src = `${Je}/${t}`;
  });
}
function qt(t, e) {
  return new Promise((n, r) => {
    const i = document.createElement(t);
    i.onerror = r, i.onloadedmetadata = () => n(i), i.src = `${Je}/${e}`;
  });
}
function gr(t) {
  return qt("audio", t);
}
function mr(t) {
  return qt("video", t);
}
function vr(t) {
  return fetch(`${Je}/${t}`).then((e) => e.text());
}
async function yr(t) {
  const e = document.createElement("div");
  return e.innerText = await vr(t), e;
}
const _r = {
  image: pr,
  audio: gr,
  video: mr,
  text: yr
};
(function(t) {
  if (typeof exports == "object" && typeof module < "u")
    module.exports = t();
  else if (typeof define == "function" && define.amd)
    define([], t);
  else {
    var e;
    typeof window < "u" ? e = window : typeof global < "u" ? e = global : typeof self < "u" ? e = self : e = this, e.ejs = t();
  }
})(function() {
  return (/* @__PURE__ */ function() {
    function t(e, n, r) {
      function i(h, s) {
        if (!n[h]) {
          if (!e[h]) {
            var d = typeof require == "function" && require;
            if (!s && d) return d(h, !0);
            if (o) return o(h, !0);
            var u = new Error("Cannot find module '" + h + "'");
            throw u.code = "MODULE_NOT_FOUND", u;
          }
          var l = n[h] = { exports: {} };
          e[h][0].call(l.exports, function(g) {
            var T = e[h][1][g];
            return i(T || g);
          }, l, l.exports, t, e, n, r);
        }
        return n[h].exports;
      }
      for (var o = typeof require == "function" && require, a = 0; a < r.length; a++) i(r[a]);
      return i;
    }
    return t;
  }())({ 1: [function(t, e, n) {
    /**
     * @file Embedded JavaScript templating engine. {@link http://ejs.co}
     * @author Matthew Eernisse <mde@fleegix.org>
     * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
     * @project EJS
     * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
     */
    var r = t("fs"), i = t("path"), o = t("./utils"), a = !1, h = t("../package.json").version, s = "<", d = ">", u = "%", l = "locals", g = "ejs", T = "(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)", b = [
      "delimiter",
      "scope",
      "context",
      "debug",
      "compileDebug",
      "client",
      "_with",
      "rmWhitespace",
      "strict",
      "filename",
      "async"
    ], _ = b.concat("cache"), O = /^\uFEFF/;
    n.cache = o.cache, n.fileLoader = r.readFileSync, n.localsName = l, n.promiseImpl = new Function("return this;")().Promise, n.resolveInclude = function(f, m, c) {
      var p = i.dirname, E = i.extname, S = i.resolve, P = S(c ? m : p(m), f), F = E(f);
      return F || (P += ".ejs"), P;
    };
    function k(f, m) {
      var c;
      if (m.some(function(p) {
        return c = n.resolveInclude(f, p, !0), r.existsSync(c);
      }))
        return c;
    }
    function v(f, m) {
      var c, p, E = m.views, S = /^[A-Za-z]+:\\|^\//.exec(f);
      if (S && S.length)
        f = f.replace(/^\/*/, ""), Array.isArray(m.root) ? c = k(f, m.root) : c = n.resolveInclude(f, m.root || "/", !0);
      else if (m.filename && (p = n.resolveInclude(f, m.filename), r.existsSync(p) && (c = p)), !c && Array.isArray(E) && (c = k(f, E)), !c && typeof m.includer != "function")
        throw new Error('Could not find the include file "' + m.escapeFunction(f) + '"');
      return c;
    }
    function y(f, m) {
      var c, p = f.filename, E = arguments.length > 1;
      if (f.cache) {
        if (!p)
          throw new Error("cache option requires a filename");
        if (c = n.cache.get(p), c)
          return c;
        E || (m = q(p).toString().replace(O, ""));
      } else if (!E) {
        if (!p)
          throw new Error("Internal EJS error: no file name or template provided");
        m = q(p).toString().replace(O, "");
      }
      return c = n.compile(m, f), f.cache && n.cache.set(p, c), c;
    }
    function C(f, m, c) {
      var p;
      if (c) {
        try {
          p = y(f)(m);
        } catch (E) {
          return c(E);
        }
        c(null, p);
      } else {
        if (typeof n.promiseImpl == "function")
          return new n.promiseImpl(function(E, S) {
            try {
              p = y(f)(m), E(p);
            } catch (P) {
              S(P);
            }
          });
        throw new Error("Please provide a callback function");
      }
    }
    function q(f) {
      return n.fileLoader(f);
    }
    function R(f, m) {
      var c = o.shallowCopy({}, m);
      if (c.filename = v(f, c), typeof m.includer == "function") {
        var p = m.includer(f, c.filename);
        if (p && (p.filename && (c.filename = p.filename), p.template))
          return y(c, p.template);
      }
      return y(c);
    }
    function j(f, m, c, p, E) {
      var S = m.split(`
`), P = Math.max(p - 3, 0), F = Math.min(S.length, p + 3), D = E(c), H = S.slice(P, F).map(function(Z, $) {
        var G = $ + P + 1;
        return (G == p ? " >> " : "    ") + G + "| " + Z;
      }).join(`
`);
      throw f.path = D, f.message = (D || "ejs") + ":" + p + `
` + H + `

` + f.message, f;
    }
    function J(f) {
      return f.replace(/;(\s*$)/, "$1");
    }
    n.compile = function(m, c) {
      var p;
      return c && c.scope && (a || (console.warn("`scope` option is deprecated and will be removed in EJS 3"), a = !0), c.context || (c.context = c.scope), delete c.scope), p = new x(m, c), p.compile();
    }, n.render = function(f, m, c) {
      var p = m || {}, E = c || {};
      return arguments.length == 2 && o.shallowCopyFromList(E, p, b), y(E, f)(p);
    }, n.renderFile = function() {
      var f = Array.prototype.slice.call(arguments), m = f.shift(), c, p = { filename: m }, E, S;
      return typeof arguments[arguments.length - 1] == "function" && (c = f.pop()), f.length ? (E = f.shift(), f.length ? o.shallowCopy(p, f.pop()) : (E.settings && (E.settings.views && (p.views = E.settings.views), E.settings["view cache"] && (p.cache = !0), S = E.settings["view options"], S && o.shallowCopy(p, S)), o.shallowCopyFromList(p, E, _)), p.filename = m) : E = {}, C(p, E, c);
    }, n.Template = x, n.clearCache = function() {
      n.cache.reset();
    };
    function x(f, m) {
      m = m || {};
      var c = {};
      this.templateText = f, this.mode = null, this.truncate = !1, this.currentLine = 1, this.source = "", c.client = m.client || !1, c.escapeFunction = m.escape || m.escapeFunction || o.escapeXML, c.compileDebug = m.compileDebug !== !1, c.debug = !!m.debug, c.filename = m.filename, c.openDelimiter = m.openDelimiter || n.openDelimiter || s, c.closeDelimiter = m.closeDelimiter || n.closeDelimiter || d, c.delimiter = m.delimiter || n.delimiter || u, c.strict = m.strict || !1, c.context = m.context, c.cache = m.cache || !1, c.rmWhitespace = m.rmWhitespace, c.root = m.root, c.includer = m.includer, c.outputFunctionName = m.outputFunctionName, c.localsName = m.localsName || n.localsName || l, c.views = m.views, c.async = m.async, c.destructuredLocals = m.destructuredLocals, c.legacyInclude = typeof m.legacyInclude < "u" ? !!m.legacyInclude : !0, c.strict ? c._with = !1 : c._with = typeof m._with < "u" ? m._with : !0, this.opts = c, this.regex = this.createRegex();
    }
    x.modes = {
      EVAL: "eval",
      ESCAPED: "escaped",
      RAW: "raw",
      COMMENT: "comment",
      LITERAL: "literal"
    }, x.prototype = {
      createRegex: function() {
        var f = T, m = o.escapeRegExpChars(this.opts.delimiter), c = o.escapeRegExpChars(this.opts.openDelimiter), p = o.escapeRegExpChars(this.opts.closeDelimiter);
        return f = f.replace(/%/g, m).replace(/</g, c).replace(/>/g, p), new RegExp(f);
      },
      compile: function() {
        var f, m, c = this.opts, p = "", E = "", S = c.escapeFunction, P;
        if (!this.source) {
          if (this.generateSource(), p += `  var __output = "";
  function __append(s) { if (s !== undefined && s !== null) __output += s }
`, c.outputFunctionName && (p += "  var " + c.outputFunctionName + ` = __append;
`), c.destructuredLocals && c.destructuredLocals.length) {
            for (var F = "  var __locals = (" + c.localsName + ` || {}),
`, D = 0; D < c.destructuredLocals.length; D++) {
              var H = c.destructuredLocals[D];
              D > 0 && (F += `,
  `), F += H + " = __locals." + H;
            }
            p += F + `;
`;
          }
          c._with !== !1 && (p += "  with (" + c.localsName + ` || {}) {
`, E += `  }
`), E += `  return __output;
`, this.source = p + this.source + E;
        }
        c.compileDebug ? f = `var __line = 1
  , __lines = ` + JSON.stringify(this.templateText) + `
  , __filename = ` + (c.filename ? JSON.stringify(c.filename) : "undefined") + `;
try {
` + this.source + `} catch (e) {
  rethrow(e, __lines, __filename, __line, escapeFn);
}
` : f = this.source, c.client && (f = "escapeFn = escapeFn || " + S.toString() + `;
` + f, c.compileDebug && (f = "rethrow = rethrow || " + j.toString() + `;
` + f)), c.strict && (f = `"use strict";
` + f), c.debug && console.log(f), c.compileDebug && c.filename && (f = f + `
//# sourceURL=` + c.filename + `
`);
        try {
          if (c.async)
            try {
              P = new Function("return (async function(){}).constructor;")();
            } catch (N) {
              throw N instanceof SyntaxError ? new Error("This environment does not support async/await") : N;
            }
          else
            P = Function;
          m = new P(c.localsName + ", escapeFn, include, rethrow", f);
        } catch (N) {
          throw N instanceof SyntaxError && (c.filename && (N.message += " in " + c.filename), N.message += ` while compiling ejs

`, N.message += `If the above error is not helpful, you may want to try EJS-Lint:
`, N.message += "https://github.com/RyanZim/EJS-Lint", c.async || (N.message += `
`, N.message += "Or, if you meant to create an async function, pass `async: true` as an option.")), N;
        }
        var Z = c.client ? m : function(te) {
          var ne = function(ye, Xe) {
            var _e = o.shallowCopy({}, te);
            return Xe && (_e = o.shallowCopy(_e, Xe)), R(ye, c)(_e);
          };
          return m.apply(c.context, [te || {}, S, ne, j]);
        };
        if (c.filename && typeof Object.defineProperty == "function") {
          var $ = c.filename, G = i.basename($, i.extname($));
          try {
            Object.defineProperty(Z, "name", {
              value: G,
              writable: !1,
              enumerable: !1,
              configurable: !0
            });
          } catch {
          }
        }
        return Z;
      },
      generateSource: function() {
        var f = this.opts;
        f.rmWhitespace && (this.templateText = this.templateText.replace(/[\r\n]+/g, `
`).replace(/^\s+|\s+$/gm, "")), this.templateText = this.templateText.replace(/[ \t]*<%_/gm, "<%_").replace(/_%>[ \t]*/gm, "_%>");
        var m = this, c = this.parseTemplateText(), p = this.opts.delimiter, E = this.opts.openDelimiter, S = this.opts.closeDelimiter;
        c && c.length && c.forEach(function(P, F) {
          var D;
          if (P.indexOf(E + p) === 0 && P.indexOf(E + p + p) !== 0 && (D = c[F + 2], !(D == p + S || D == "-" + p + S || D == "_" + p + S)))
            throw new Error('Could not find matching close tag for "' + P + '".');
          m.scanLine(P);
        });
      },
      parseTemplateText: function() {
        for (var f = this.templateText, m = this.regex, c = m.exec(f), p = [], E; c; )
          E = c.index, E !== 0 && (p.push(f.substring(0, E)), f = f.slice(E)), p.push(c[0]), f = f.slice(c[0].length), c = m.exec(f);
        return f && p.push(f), p;
      },
      _addOutput: function(f) {
        if (this.truncate && (f = f.replace(/^(?:\r\n|\r|\n)/, ""), this.truncate = !1), !f)
          return f;
        f = f.replace(/\\/g, "\\\\"), f = f.replace(/\n/g, "\\n"), f = f.replace(/\r/g, "\\r"), f = f.replace(/"/g, '\\"'), this.source += '    ; __append("' + f + `")
`;
      },
      scanLine: function(f) {
        var m = this, c = this.opts.delimiter, p = this.opts.openDelimiter, E = this.opts.closeDelimiter, S = 0;
        switch (S = f.split(`
`).length - 1, f) {
          case p + c:
          case p + c + "_":
            this.mode = x.modes.EVAL;
            break;
          case p + c + "=":
            this.mode = x.modes.ESCAPED;
            break;
          case p + c + "-":
            this.mode = x.modes.RAW;
            break;
          case p + c + "#":
            this.mode = x.modes.COMMENT;
            break;
          case p + c + c:
            this.mode = x.modes.LITERAL, this.source += '    ; __append("' + f.replace(p + c + c, p + c) + `")
`;
            break;
          case c + c + E:
            this.mode = x.modes.LITERAL, this.source += '    ; __append("' + f.replace(c + c + E, c + E) + `")
`;
            break;
          case c + E:
          case "-" + c + E:
          case "_" + c + E:
            this.mode == x.modes.LITERAL && this._addOutput(f), this.mode = null, this.truncate = f.indexOf("-") === 0 || f.indexOf("_") === 0;
            break;
          default:
            if (this.mode) {
              switch (this.mode) {
                case x.modes.EVAL:
                case x.modes.ESCAPED:
                case x.modes.RAW:
                  f.lastIndexOf("//") > f.lastIndexOf(`
`) && (f += `
`);
              }
              switch (this.mode) {
                case x.modes.EVAL:
                  this.source += "    ; " + f + `
`;
                  break;
                case x.modes.ESCAPED:
                  this.source += "    ; __append(escapeFn(" + J(f) + `))
`;
                  break;
                case x.modes.RAW:
                  this.source += "    ; __append(" + J(f) + `)
`;
                  break;
                case x.modes.COMMENT:
                  break;
                case x.modes.LITERAL:
                  this._addOutput(f);
                  break;
              }
            } else
              this._addOutput(f);
        }
        m.opts.compileDebug && S && (this.currentLine += S, this.source += "    ; __line = " + this.currentLine + `
`);
      }
    }, n.escapeXML = o.escapeXML, n.__express = n.renderFile, n.VERSION = h, n.name = g, typeof window < "u" && (window.ejs = n);
  }, { "../package.json": 6, "./utils": 2, fs: 3, path: 4 }], 2: [function(t, e, n) {
    var r = /[|\\{}()[\]^$+*?.]/g;
    n.escapeRegExpChars = function(s) {
      return s ? String(s).replace(r, "\\$&") : "";
    };
    var i = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&#34;",
      "'": "&#39;"
    }, o = /[&<>'"]/g;
    function a(s) {
      return i[s] || s;
    }
    var h = `var _ENCODE_HTML_RULES = {
      "&": "&amp;"
    , "<": "&lt;"
    , ">": "&gt;"
    , '"': "&#34;"
    , "'": "&#39;"
    }
  , _MATCH_HTML = /[&<>'"]/g;
function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
};
`;
    n.escapeXML = function(s) {
      return s == null ? "" : String(s).replace(o, a);
    }, n.escapeXML.toString = function() {
      return Function.prototype.toString.call(this) + `;
` + h;
    }, n.shallowCopy = function(s, d) {
      d = d || {};
      for (var u in d)
        s[u] = d[u];
      return s;
    }, n.shallowCopyFromList = function(s, d, u) {
      for (var l = 0; l < u.length; l++) {
        var g = u[l];
        typeof d[g] < "u" && (s[g] = d[g]);
      }
      return s;
    }, n.cache = {
      _data: {},
      set: function(s, d) {
        this._data[s] = d;
      },
      get: function(s) {
        return this._data[s];
      },
      remove: function(s) {
        delete this._data[s];
      },
      reset: function() {
        this._data = {};
      }
    }, n.hyphenToCamel = function(s) {
      return s.replace(/-[a-z]/g, function(d) {
        return d[1].toUpperCase();
      });
    };
  }, {}], 3: [function(t, e, n) {
  }, {}], 4: [function(t, e, n) {
    (function(r) {
      function i(s, d) {
        for (var u = 0, l = s.length - 1; l >= 0; l--) {
          var g = s[l];
          g === "." ? s.splice(l, 1) : g === ".." ? (s.splice(l, 1), u++) : u && (s.splice(l, 1), u--);
        }
        if (d)
          for (; u--; u)
            s.unshift("..");
        return s;
      }
      n.resolve = function() {
        for (var s = "", d = !1, u = arguments.length - 1; u >= -1 && !d; u--) {
          var l = u >= 0 ? arguments[u] : r.cwd();
          if (typeof l != "string")
            throw new TypeError("Arguments to path.resolve must be strings");
          if (!l)
            continue;
          s = l + "/" + s, d = l.charAt(0) === "/";
        }
        return s = i(a(s.split("/"), function(g) {
          return !!g;
        }), !d).join("/"), (d ? "/" : "") + s || ".";
      }, n.normalize = function(s) {
        var d = n.isAbsolute(s), u = h(s, -1) === "/";
        return s = i(a(s.split("/"), function(l) {
          return !!l;
        }), !d).join("/"), !s && !d && (s = "."), s && u && (s += "/"), (d ? "/" : "") + s;
      }, n.isAbsolute = function(s) {
        return s.charAt(0) === "/";
      }, n.join = function() {
        var s = Array.prototype.slice.call(arguments, 0);
        return n.normalize(a(s, function(d, u) {
          if (typeof d != "string")
            throw new TypeError("Arguments to path.join must be strings");
          return d;
        }).join("/"));
      }, n.relative = function(s, d) {
        s = n.resolve(s).substr(1), d = n.resolve(d).substr(1);
        function u(k) {
          for (var v = 0; v < k.length && k[v] === ""; v++)
            ;
          for (var y = k.length - 1; y >= 0 && k[y] === ""; y--)
            ;
          return v > y ? [] : k.slice(v, y - v + 1);
        }
        for (var l = u(s.split("/")), g = u(d.split("/")), T = Math.min(l.length, g.length), b = T, _ = 0; _ < T; _++)
          if (l[_] !== g[_]) {
            b = _;
            break;
          }
        for (var O = [], _ = b; _ < l.length; _++)
          O.push("..");
        return O = O.concat(g.slice(b)), O.join("/");
      }, n.sep = "/", n.delimiter = ":", n.dirname = function(s) {
        if (typeof s != "string" && (s = s + ""), s.length === 0) return ".";
        for (var d = s.charCodeAt(0), u = d === 47, l = -1, g = !0, T = s.length - 1; T >= 1; --T)
          if (d = s.charCodeAt(T), d === 47) {
            if (!g) {
              l = T;
              break;
            }
          } else
            g = !1;
        return l === -1 ? u ? "/" : "." : u && l === 1 ? "/" : s.slice(0, l);
      };
      function o(s) {
        typeof s != "string" && (s = s + "");
        var d = 0, u = -1, l = !0, g;
        for (g = s.length - 1; g >= 0; --g)
          if (s.charCodeAt(g) === 47) {
            if (!l) {
              d = g + 1;
              break;
            }
          } else u === -1 && (l = !1, u = g + 1);
        return u === -1 ? "" : s.slice(d, u);
      }
      n.basename = function(s, d) {
        var u = o(s);
        return d && u.substr(-1 * d.length) === d && (u = u.substr(0, u.length - d.length)), u;
      }, n.extname = function(s) {
        typeof s != "string" && (s = s + "");
        for (var d = -1, u = 0, l = -1, g = !0, T = 0, b = s.length - 1; b >= 0; --b) {
          var _ = s.charCodeAt(b);
          if (_ === 47) {
            if (!g) {
              u = b + 1;
              break;
            }
            continue;
          }
          l === -1 && (g = !1, l = b + 1), _ === 46 ? d === -1 ? d = b : T !== 1 && (T = 1) : d !== -1 && (T = -1);
        }
        return d === -1 || l === -1 || // We saw a non-dot character immediately before the dot
        T === 0 || // The (right-most) trimmed path component is exactly '..'
        T === 1 && d === l - 1 && d === u + 1 ? "" : s.slice(d, l);
      };
      function a(s, d) {
        if (s.filter) return s.filter(d);
        for (var u = [], l = 0; l < s.length; l++)
          d(s[l], l, s) && u.push(s[l]);
        return u;
      }
      var h = "ab".substr(-1) === "b" ? function(s, d, u) {
        return s.substr(d, u);
      } : function(s, d, u) {
        return d < 0 && (d = s.length + d), s.substr(d, u);
      };
    }).call(this, t("_process"));
  }, { _process: 5 }], 5: [function(t, e, n) {
    var r = e.exports = {}, i, o;
    function a() {
      throw new Error("setTimeout has not been defined");
    }
    function h() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        typeof setTimeout == "function" ? i = setTimeout : i = a;
      } catch {
        i = a;
      }
      try {
        typeof clearTimeout == "function" ? o = clearTimeout : o = h;
      } catch {
        o = h;
      }
    })();
    function s(v) {
      if (i === setTimeout)
        return setTimeout(v, 0);
      if ((i === a || !i) && setTimeout)
        return i = setTimeout, setTimeout(v, 0);
      try {
        return i(v, 0);
      } catch {
        try {
          return i.call(null, v, 0);
        } catch {
          return i.call(this, v, 0);
        }
      }
    }
    function d(v) {
      if (o === clearTimeout)
        return clearTimeout(v);
      if ((o === h || !o) && clearTimeout)
        return o = clearTimeout, clearTimeout(v);
      try {
        return o(v);
      } catch {
        try {
          return o.call(null, v);
        } catch {
          return o.call(this, v);
        }
      }
    }
    var u = [], l = !1, g, T = -1;
    function b() {
      !l || !g || (l = !1, g.length ? u = g.concat(u) : T = -1, u.length && _());
    }
    function _() {
      if (!l) {
        var v = s(b);
        l = !0;
        for (var y = u.length; y; ) {
          for (g = u, u = []; ++T < y; )
            g && g[T].run();
          T = -1, y = u.length;
        }
        g = null, l = !1, d(v);
      }
    }
    r.nextTick = function(v) {
      var y = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var C = 1; C < arguments.length; C++)
          y[C - 1] = arguments[C];
      u.push(new O(v, y)), u.length === 1 && !l && s(_);
    };
    function O(v, y) {
      this.fun = v, this.array = y;
    }
    O.prototype.run = function() {
      this.fun.apply(null, this.array);
    }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {};
    function k() {
    }
    r.on = k, r.addListener = k, r.once = k, r.off = k, r.removeListener = k, r.removeAllListeners = k, r.emit = k, r.prependListener = k, r.prependOnceListener = k, r.listeners = function(v) {
      return [];
    }, r.binding = function(v) {
      throw new Error("process.binding is not supported");
    }, r.cwd = function() {
      return "/";
    }, r.chdir = function(v) {
      throw new Error("process.chdir is not supported");
    }, r.umask = function() {
      return 0;
    };
  }, {}], 6: [function(t, e, n) {
    e.exports = {
      name: "ejs",
      description: "Embedded JavaScript templates",
      keywords: [
        "template",
        "engine",
        "ejs"
      ],
      version: "3.1.5",
      author: "Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",
      license: "Apache-2.0",
      bin: {
        ejs: "./bin/cli.js"
      },
      main: "./lib/ejs.js",
      jsdelivr: "ejs.min.js",
      unpkg: "ejs.min.js",
      repository: {
        type: "git",
        url: "git://github.com/mde/ejs.git"
      },
      bugs: "https://github.com/mde/ejs/issues",
      homepage: "https://github.com/mde/ejs",
      dependencies: {
        jake: "^10.6.1"
      },
      devDependencies: {
        browserify: "^16.5.1",
        eslint: "^6.8.0",
        "git-directory-deploy": "^1.5.1",
        jsdoc: "^3.6.4",
        "lru-cache": "^4.0.1",
        mocha: "^7.1.1",
        "uglify-js": "^3.3.16"
      },
      engines: {
        node: ">=0.10.0"
      },
      scripts: {
        test: "mocha"
      }
    };
  }, {}] }, {}, [1])(1);
});
const Lr = window.ejs, Rr = {
  async getUser(t) {
    const { _data: e } = await Pn.getUser(t);
    return e;
  }
};
function wr(t) {
  const e = Mt[t];
  return e && e.unit || "";
}
function br(t, e) {
  const n = Mt[t];
  return n && n.type === "string" ? `'${e}'` : e;
}
function Br(t) {
  const e = ["max-width:none"];
  return Object.entries(t).forEach(([n, r]) => {
    const i = wr(n);
    r = br(n, r), e.push(`${n}:${r}${i}`);
  }), e.join(";");
}
function Er(t) {
  const e = dr[t];
  return e && e.unit || "";
}
function Ir(t) {
  const e = [];
  return Object.entries(t).forEach(([n, r]) => {
    const i = Er(n);
    e.push(`${n}(${r}${i})`);
  }), `transform:${e.length ? e.join(" ") : "none"}`;
}
async function Nr(t) {
  const e = _r[t.type];
  if (!e)
    throw new Error(`Undefined type "${t.type}"`);
  return await e(t.filename);
}
export {
  Pn as a,
  Me as b,
  B as c,
  Cr as d,
  L as e,
  xr as f,
  Dn as g,
  vr as h,
  Br as i,
  Ir as j,
  Rr as k,
  Fn as l,
  Lr as m,
  Nr as n,
  wt as o,
  Or as p,
  Ar as q,
  Sr as r,
  Mt as s,
  dr as t,
  kr as u,
  Nn as v
};
//# sourceMappingURL=createElementFromTarget-DULA1w6t.mjs.map
