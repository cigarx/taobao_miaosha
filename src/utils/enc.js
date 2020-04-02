//r.token + "&" + u + "&" + a + "&" + n.data
//token u a data

const getSign = (token, time, appKey, data) => function (e) {
    function t(e, t) {
        return e << t | e >>> 32 - t
    }
    function n(e, t) {
        var n, r, o, i, a;
        return o = 2147483648 & e,
            i = 2147483648 & t,
            a = (1073741823 & e) + (1073741823 & t),
            (n = 1073741824 & e) & (r = 1073741824 & t) ? 2147483648 ^ a ^ o ^ i : n | r ? 1073741824 & a ? 3221225472 ^ a ^ o ^ i : 1073741824 ^ a ^ o ^ i : a ^ o ^ i
    }
    function r(e, r, o, i, a, u, s) {
        return e = n(e, n(n(function (e, t, n) {
            return e & t | ~e & n
        }(r, o, i), a), s)),
            n(t(e, u), r)
    }
    function o(e, r, o, i, a, u, s) {
        return e = n(e, n(n(function (e, t, n) {
            return e & n | t & ~n
        }(r, o, i), a), s)),
            n(t(e, u), r)
    }
    function i(e, r, o, i, a, u, s) {
        return e = n(e, n(n(function (e, t, n) {
            return e ^ t ^ n
        }(r, o, i), a), s)),
            n(t(e, u), r)
    }
    function a(e, r, o, i, a, u, s) {
        return e = n(e, n(n(function (e, t, n) {
            return t ^ (e | ~n)
        }(r, o, i), a), s)),
            n(t(e, u), r)
    }
    function u(e) {
        var t, n = "", r = "";
        for (t = 0; 3 >= t; t++)
            n += (r = "0" + (e >>> 8 * t & 255).toString(16)).substr(r.length - 2, 2);
        return n
    }
    var s, c, l, f, d, p, h, v, m, y;
    for (y = function (e) {
        for (var t, n = e.length, r = n + 8, o = 16 * ((r - r % 64) / 64 + 1), i = new Array(o - 1), a = 0, u = 0; n > u;)
            a = u % 4 * 8,
                i[t = (u - u % 4) / 4] = i[t] | e.charCodeAt(u) << a,
                u++;
        return a = u % 4 * 8,
            i[t = (u - u % 4) / 4] = i[t] | 128 << a,
            i[o - 2] = n << 3,
            i[o - 1] = n >>> 29,
            i
    }(e = function (e) {
        e = e.replace(/\r\n/g, "\n");
        for (var t = "", n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            128 > r ? t += String.fromCharCode(r) : r > 127 && 2048 > r ? (t += String.fromCharCode(r >> 6 | 192),
                t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224),
                    t += String.fromCharCode(r >> 6 & 63 | 128),
                    t += String.fromCharCode(63 & r | 128))
        }
        return t
    }(e)),
        p = 1732584193,
        h = 4023233417,
        v = 2562383102,
        m = 271733878,
        s = 0; s < y.length; s += 16)
        c = p,
            l = h,
            f = v,
            d = m,
            p = r(p, h, v, m, y[s + 0], 7, 3614090360),
            m = r(m, p, h, v, y[s + 1], 12, 3905402710),
            v = r(v, m, p, h, y[s + 2], 17, 606105819),
            h = r(h, v, m, p, y[s + 3], 22, 3250441966),
            p = r(p, h, v, m, y[s + 4], 7, 4118548399),
            m = r(m, p, h, v, y[s + 5], 12, 1200080426),
            v = r(v, m, p, h, y[s + 6], 17, 2821735955),
            h = r(h, v, m, p, y[s + 7], 22, 4249261313),
            p = r(p, h, v, m, y[s + 8], 7, 1770035416),
            m = r(m, p, h, v, y[s + 9], 12, 2336552879),
            v = r(v, m, p, h, y[s + 10], 17, 4294925233),
            h = r(h, v, m, p, y[s + 11], 22, 2304563134),
            p = r(p, h, v, m, y[s + 12], 7, 1804603682),
            m = r(m, p, h, v, y[s + 13], 12, 4254626195),
            v = r(v, m, p, h, y[s + 14], 17, 2792965006),
            p = o(p, h = r(h, v, m, p, y[s + 15], 22, 1236535329), v, m, y[s + 1], 5, 4129170786),
            m = o(m, p, h, v, y[s + 6], 9, 3225465664),
            v = o(v, m, p, h, y[s + 11], 14, 643717713),
            h = o(h, v, m, p, y[s + 0], 20, 3921069994),
            p = o(p, h, v, m, y[s + 5], 5, 3593408605),
            m = o(m, p, h, v, y[s + 10], 9, 38016083),
            v = o(v, m, p, h, y[s + 15], 14, 3634488961),
            h = o(h, v, m, p, y[s + 4], 20, 3889429448),
            p = o(p, h, v, m, y[s + 9], 5, 568446438),
            m = o(m, p, h, v, y[s + 14], 9, 3275163606),
            v = o(v, m, p, h, y[s + 3], 14, 4107603335),
            h = o(h, v, m, p, y[s + 8], 20, 1163531501),
            p = o(p, h, v, m, y[s + 13], 5, 2850285829),
            m = o(m, p, h, v, y[s + 2], 9, 4243563512),
            v = o(v, m, p, h, y[s + 7], 14, 1735328473),
            p = i(p, h = o(h, v, m, p, y[s + 12], 20, 2368359562), v, m, y[s + 5], 4, 4294588738),
            m = i(m, p, h, v, y[s + 8], 11, 2272392833),
            v = i(v, m, p, h, y[s + 11], 16, 1839030562),
            h = i(h, v, m, p, y[s + 14], 23, 4259657740),
            p = i(p, h, v, m, y[s + 1], 4, 2763975236),
            m = i(m, p, h, v, y[s + 4], 11, 1272893353),
            v = i(v, m, p, h, y[s + 7], 16, 4139469664),
            h = i(h, v, m, p, y[s + 10], 23, 3200236656),
            p = i(p, h, v, m, y[s + 13], 4, 681279174),
            m = i(m, p, h, v, y[s + 0], 11, 3936430074),
            v = i(v, m, p, h, y[s + 3], 16, 3572445317),
            h = i(h, v, m, p, y[s + 6], 23, 76029189),
            p = i(p, h, v, m, y[s + 9], 4, 3654602809),
            m = i(m, p, h, v, y[s + 12], 11, 3873151461),
            v = i(v, m, p, h, y[s + 15], 16, 530742520),
            p = a(p, h = i(h, v, m, p, y[s + 2], 23, 3299628645), v, m, y[s + 0], 6, 4096336452),
            m = a(m, p, h, v, y[s + 7], 10, 1126891415),
            v = a(v, m, p, h, y[s + 14], 15, 2878612391),
            h = a(h, v, m, p, y[s + 5], 21, 4237533241),
            p = a(p, h, v, m, y[s + 12], 6, 1700485571),
            m = a(m, p, h, v, y[s + 3], 10, 2399980690),
            v = a(v, m, p, h, y[s + 10], 15, 4293915773),
            h = a(h, v, m, p, y[s + 1], 21, 2240044497),
            p = a(p, h, v, m, y[s + 8], 6, 1873313359),
            m = a(m, p, h, v, y[s + 15], 10, 4264355552),
            v = a(v, m, p, h, y[s + 6], 15, 2734768916),
            h = a(h, v, m, p, y[s + 13], 21, 1309151649),
            p = a(p, h, v, m, y[s + 4], 6, 4149444226),
            m = a(m, p, h, v, y[s + 11], 10, 3174756917),
            v = a(v, m, p, h, y[s + 2], 15, 718787259),
            h = a(h, v, m, p, y[s + 9], 21, 3951481745),
            p = n(p, c),
            h = n(h, l),
            v = n(v, f),
            m = n(m, d);
    return (u(p) + u(h) + u(v) + u(m)).toLowerCase()
}(token + "&" + time + "&" + appKey + "&" + data)



export {
    getSign
}