var COMPILED = true, goog = goog || {};
goog.global = this;
goog.DEBUG = true;
goog.LOCALE = "en";
goog.evalWorksForGlobals_ = null;
goog.provide = function(a) {
    if (!COMPILED) {
        if (goog.getObjectByName(a)&&!goog.implicitNamespaces_[a])
            throw Error('Namespace "' + a + '" already declaBLACK.');
        for (var b = a; b = b.substring(0, b.lastIndexOf("."));)
            goog.implicitNamespaces_[b] = true
    }
    goog.exportPath_(a)
};
if (!COMPILED)
    goog.implicitNamespaces_ = {};
goog.exportPath_ = function(a, b, c) {
    a = a.split(".");
    c = c || goog.global;
    !(a[0]in c) && c.execScript && c.execScript("var " + a[0]);
    for (var d; a.length && (d = a.shift());)
        if (!a.length && goog.isDef(b))
            c[d] = b;
        else 
            c = c[d] ? c[d] : (c[d] = {})
};
goog.getObjectByName = function(a, b) {
    for (var c = a.split("."), d = b || goog.global, e; e = c.shift();)
        if (d[e])
            d = d[e];
        else 
            return null;
    return d
};
goog.globalize = function(a, b) {
    var c = b || goog.global;
    for (var d in a)
        c[d] = a[d]
};
goog.addDependency = function(a, b, c) {
    if (!COMPILED) {
        var d;
        a = a.replace(/\\/g, "/");
        for (var e = goog.dependencies_, f = 0; d = b[f]; f++) {
            e.nameToPath[d] = a;
            a in e.pathToNames || (e.pathToNames[a] = {});
            e.pathToNames[a][d] = true
        }
        for (d = 0; b = c[d]; d++) {
            a in e.requires || (e.requires[a] = {});
            e.requires[a][b] = true
        }
    }
};
goog.require = function(a) {
    if (!COMPILED)
        if (!goog.getObjectByName(a)) {
            var b = goog.getPathFromDeps_(a);
            if (b) {
                goog.included_[b] = true;
                goog.writeScripts_()
            } else {
                a = "goog.require could not find: " + a;
                goog.global.console && goog.global.console.error(a);
                throw Error(a);
            }
        }
    };
goog.basePath = "";
goog.nullFunction = function() {};
goog.identityFunction = function(a) {
    return a
};
goog.abstractMethod = function() {
    throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
    a.getInstance = function() {
        return a.instance_ || (a.instance_ = new a)
    }
};
if (!COMPILED) {
    goog.included_ = {};
    goog.dependencies_ = {
        pathToNames: {},
        nameToPath: {},
        requires: {},
        visited: {},
        written: {}
    };
    goog.inHtmlDocument_ = function() {
        var a = goog.global.document;
        return typeof a != "undefined" && "write"in a
    };
    goog.findBasePath_ = function() {
        if (goog.inHtmlDocument_()) {
            var a = goog.global.document;
            if (goog.global.CLOSURE_BASE_PATH)
                goog.basePath = goog.global.CLOSURE_BASE_PATH;
            else {
                a = a.getElementsByTagName("script");
                for (var b = a.length-1; b >= 0; --b) {
                    var c = a[b].src, d = c.length;
                    if (c.substr(d-7) == "base.js") {
                        goog.basePath =
                        c.substr(0, d-7);
                        return 
                    }
                }
            }
        }
    };
    goog.writeScriptTag_ = function(a) {
        if (goog.inHtmlDocument_()&&!goog.dependencies_.written[a]) {
            goog.dependencies_.written[a] = true;
            goog.global.document.write('<script type="text/javascript" src="' + a + '"><\/script>')
        }
    };
    goog.writeScripts_ = function() {
        function a(f) {
            if (!(f in d.written)) {
                if (!(f in d.visited)) {
                    d.visited[f] = true;
                    if (f in d.requires)
                        for (var g in d.requires[f])
                            if (g in d.nameToPath)
                                a(d.nameToPath[g]);
                            else if (!goog.getObjectByName(g))
                                throw Error("Undefined nameToPath for " +
                                g);
                }
                if (!(f in c)) {
                    c[f] = true;
                    b.push(f)
                }
            }
        }
        var b = [], c = {}, d = goog.dependencies_;
        for (var e in goog.included_)
            d.written[e] || a(e);
        for (e = 0; e < b.length; e++)
            if (b[e])
                goog.writeScriptTag_(goog.basePath + b[e]);
            else 
                throw Error("Undefined script input");
    };
    goog.getPathFromDeps_ = function(a) {
        return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
    };
    goog.findBasePath_();
    goog.global.CLOSURE_NO_DEPS || goog.writeScriptTag_(goog.basePath + "deps.js")
}
goog.typeOf = function(a) {
    var b = typeof a;
    if (b == "object")
        if (a) {
            if (a instanceof Array ||!(a instanceof Object) && Object.prototype.toString.call(a) == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined"&&!a.propertyIsEnumerable("splice"))
                return "array";
                if (!(a instanceof Object) && (Object.prototype.toString.call(a) == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined"&&!a.propertyIsEnumerable("call")))
                    return "function"
        } else 
            return "null";
            else if (b == "function" && typeof a.call == "undefined")
                return "object";
    return b
};
goog.propertyIsEnumerableCustom_ = function(a, b) {
    if (b in a)
        for (var c in a)
            if (c == b && Object.prototype.hasOwnProperty.call(a, b))
                return true;
    return false
};
goog.propertyIsEnumerable_ = function(a, b) {
    return a instanceof Object ? Object.prototype.propertyIsEnumerable.call(a, b) : goog.propertyIsEnumerableCustom_(a, b)
};
goog.isDef = function(a) {
    return a !== undefined
};
goog.isNull = function(a) {
    return a === null
};
goog.isDefAndNotNull = function(a) {
    return a != null
};
goog.isArray = function(a) {
    return goog.typeOf(a) == "array"
};
goog.isArrayLike = function(a) {
    var b = goog.typeOf(a);
    return b == "array" || b == "object" && typeof a.length == "number"
};
goog.isDateLike = function(a) {
    return goog.isObject(a) && typeof a.getFullYear == "function"
};
goog.isString = function(a) {
    return typeof a == "string"
};
goog.isBoolean = function(a) {
    return typeof a == "boolean"
};
goog.isNumber = function(a) {
    return typeof a == "number"
};
goog.isFunction = function(a) {
    return goog.typeOf(a) == "function"
};
goog.isObject = function(a) {
    a = goog.typeOf(a);
    return a == "object" || a == "array" || a == "function"
};
goog.getUid = function(a) {
    if (a.hasOwnProperty && a.hasOwnProperty(goog.UID_PROPERTY_))
        return a[goog.UID_PROPERTY_];
    a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_]=++goog.uidCounter_);
    return a[goog.UID_PROPERTY_]
};
goog.removeUid = function(a) {
    "removeAttribute"in a && a.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete a[goog.UID_PROPERTY_]
    } catch (b) {}
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
    var b = goog.typeOf(a);
    if (b == "object" || b == "array") {
        if (a.clone)
            return a.clone();
        b = b == "array" ? [] : {};
        for (var c in a)
            b[c] = goog.cloneObject(a[c]);
        return b
    }
    return a
};
goog.bind = function(a, b) {
    var c = b || goog.global;
    if (arguments.length > 2) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
            var e = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(e, d);
            return a.apply(c, e)
        }
    } else 
        return function() {
            return a.apply(c, arguments)
        }
};
goog.partial = function(a) {
    var b = Array.prototype.slice.call(arguments, 1);
    return function() {
        var c = Array.prototype.slice.call(arguments);
        c.unshift.apply(c, b);
        return a.apply(this, c)
    }
};
goog.mixin = function(a, b) {
    for (var c in b)
        a[c] = b[c]
};
goog.now = Date.now || function() {
    return + new Date
};
goog.globalEval = function(a) {
    if (goog.global.execScript)
        goog.global.execScript(a, "JavaScript");
    else if (goog.global.eval) {
        if (goog.evalWorksForGlobals_ == null) {
            goog.global.eval("var _et_ = 1;");
            if (typeof goog.global._et_ != "undefined") {
                delete goog.global._et_;
                goog.evalWorksForGlobals_ = true
            } else 
                goog.evalWorksForGlobals_ = false
        }
        if (goog.evalWorksForGlobals_)
            goog.global.eval(a);
        else {
            var b = goog.global.document, c = b.createElement("script");
            c.type = "text/javascript";
            c.defer = false;
            c.appendChild(b.createTextNode(a));
            b.body.appendChild(c);
            b.body.removeChild(c)
        }
    } else 
        throw Error("goog.globalEval not available");
};
goog.typedef = true;
goog.getCssName = function(a, b) {
    var c = a + (b ? "-" + b : "");
    return goog.cssNameMapping_ && c in goog.cssNameMapping_ ? goog.cssNameMapping_[c] : c
};
goog.setCssNameMapping = function(a) {
    goog.cssNameMapping_ = a
};
goog.getMsg = function(a, b) {
    var c = b || {};
    for (var d in c)
        a = a.replace(new RegExp("\\{\\$" + d + "\\}", "gi"), c[d]);
    return a
};
goog.exportSymbol = function(a, b, c) {
    goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
    a[b] = c
};
goog.inherits = function(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.superClass_ = b.prototype;
    a.prototype = new c;
    a.prototype.constructor = a
};
goog.base = function(a, b) {
    var c = arguments.callee.caller;
    if (c.superClass_)
        return c.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1));
    for (var d = Array.prototype.slice.call(arguments, 2), e = false, f = a.constructor; f; f = f.superClass_ && f.superClass_.constructor)
        if (f.prototype[b] === c)
            e = true;
        else if (e)
            return f.prototype[b].apply(a, d);
    if (a[b] === c)
        return a.constructor.prototype[b].apply(a, d);
    else 
        throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
    a.call(goog.global)
};
goog.debug = {};
goog.debug.Error = function(a) {
    this.stack = (new Error).stack || "";
    if (a)
        this.message = String(a)
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.string = {};
goog.string.Unicode = {
    NBSP: "\u00a0"
};
goog.string.startsWith = function(a, b) {
    return a.lastIndexOf(b, 0) == 0
};
goog.string.endsWith = function(a, b) {
    var c = a.length - b.length;
    return c >= 0 && a.indexOf(b, c) == c
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
    return goog.string.caseInsensitiveCompare(b, a.substr(0, b.length)) == 0
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
    return goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length)) == 0
};
goog.string.subs = function(a) {
    for (var b = 1; b < arguments.length; b++) {
        var c = String(arguments[b]).replace(/\$/g, "$$$$");
        a = a.replace(/\%s/, c)
    }
    return a
};
goog.string.collapseWhitespace = function(a) {
    return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(a) {
    return /^[\s\xa0]*$/.test(a)
};
goog.string.isEmptySafe = function(a) {
    return goog.string.isEmpty(goog.string.makeSafe(a))
};
goog.string.isBreakingWhitespace = function(a) {
    return !/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
    return !/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
    return !/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
    return !/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
    return a == " "
};
goog.string.isUnicodeChar = function(a) {
    return a.length == 1 && a >= " " && a <= "~" || a >= "\u0080" && a <= "\ufffd"
};
goog.string.stripNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
    return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
    return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
    return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.trim = function(a) {
    return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
    return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
    return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, b) {
    var c = String(a).toLowerCase(), d = String(b).toLowerCase();
    return c < d?-1 : c == d ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(a, b) {
    if (a == b)
        return 0;
    if (!a)
        return -1;
    if (!b)
        return 1;
    for (var c = a.toLowerCase().match(goog.string.numerateCompareRegExp_), d = b.toLowerCase().match(goog.string.numerateCompareRegExp_), e = Math.min(c.length, d.length), f = 0; f < e; f++) {
        var g = c[f], h = d[f];
        if (g != h) {
            c = parseInt(g, 10);
            if (!isNaN(c)) {
                d = parseInt(h, 10);
                if (!isNaN(d) && c - d)
                    return c - d
            }
            return g < h?-1 : 1
        }
    }
    if (c.length != d.length)
        return c.length - d.length;
    return a < b?-1 : 1
};
goog.string.encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
goog.string.urlEncode = function(a) {
    a = String(a);
    if (!goog.string.encodeUriRegExp_.test(a))
        return encodeURIComponent(a);
    return a
};
goog.string.urlDecode = function(a) {
    return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, b) {
    return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(a, b) {
    if (b)
        return a.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;");
    else {
        if (!goog.string.allRe_.test(a))
            return a;
        if (a.indexOf("&")!=-1)
            a = a.replace(goog.string.amperRe_, "&amp;");
        if (a.indexOf("<")!=-1)
            a = a.replace(goog.string.ltRe_, "&lt;");
        if (a.indexOf(">")!=-1)
            a = a.replace(goog.string.gtRe_, "&gt;");
        if (a.indexOf('"')!=-1)
            a = a.replace(goog.string.quotRe_, "&quot;");
        return a
    }
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(a) {
    if (goog.string.contains(a, "&"))
        return "document"in goog.global&&!goog.string.contains(a, "<") ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a);
    return a
};
goog.string.unescapeEntitiesUsingDom_ = function(a) {
    var b = goog.global.document.createElement("a");
    b.innerHTML = a;
    b[goog.string.NORMALIZE_FN_] && b[goog.string.NORMALIZE_FN_]();
    a = b.firstChild.nodeValue;
    b.innerHTML = "";
    return a
};
goog.string.unescapePureXmlEntities_ = function(a) {
    return a.replace(/&([^;]+);/g, function(b, c) {
        switch (c) {
        case "amp":
            return "&";
        case "lt":
            return "<";
        case "gt":
            return ">";
        case "quot":
            return '"';
        default:
            if (c.charAt(0) == "#") {
                var d = Number("0" + c.substr(1));
                if (!isNaN(d))
                    return String.fromCharCode(d)
                }
            return b
        }
    })
};
goog.string.NORMALIZE_FN_ = "normalize";
goog.string.whitespaceEscape = function(a, b) {
    return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.stripQuotes = function(a, b) {
    for (var c = b.length, d = 0; d < c; d++) {
        var e = c == 1 ? b: b.charAt(d);
        if (a.charAt(0) == e && a.charAt(a.length-1) == e)
            return a.substring(1, a.length-1)
    }
    return a
};
goog.string.truncate = function(a, b, c) {
    if (c)
        a = goog.string.unescapeEntities(a);
    if (a.length > b)
        a = a.substring(0, b-3) + "...";
    if (c)
        a = goog.string.htmlEscape(a);
    return a
};
goog.string.truncateMiddle = function(a, b, c) {
    if (c)
        a = goog.string.unescapeEntities(a);
    if (a.length > b) {
        var d = Math.floor(b / 2), e = a.length - d;
        d += b%2;
        a = a.substring(0, d) + "..." + a.substring(e)
    }
    if (c)
        a = goog.string.htmlEscape(a);
    return a
};
goog.string.jsEscapeCache_ = {
    "\u0008": "\\b",
    "\u000c": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\u000b": "\\x0B",
    '"': '\\"',
    "'": "\\'",
    "\\": "\\\\"
};
goog.string.quote = function(a) {
    a = String(a);
    if (a.quote)
        return a.quote();
    else {
        for (var b = ['"'], c = 0; c < a.length; c++)
            b[c + 1] = goog.string.escapeChar(a.charAt(c));
        b.push('"');
        return b.join("")
    }
};
goog.string.escapeChar = function(a) {
    if (a in goog.string.jsEscapeCache_)
        return goog.string.jsEscapeCache_[a];
    var b = a, c = a.charCodeAt(0);
    if (c > 31 && c < 127)
        b = a;
    else {
        if (c < 256) {
            b = "\\x";
            if (c < 16 || c > 256)
                b += "0"
        } else {
            b = "\\u";
            if (c < 4096)
                b += "0"
        }
        b += c.toString(16).toUpperCase()
    }
    return goog.string.jsEscapeCache_[a] = b
};
goog.string.toMap = function(a) {
    for (var b = {}, c = 0; c < a.length; c++)
        b[a.charAt(c)] = true;
    return b
};
goog.string.contains = function(a, b) {
    return a.indexOf(b)!=-1
};
goog.string.removeAt = function(a, b, c) {
    var d = a;
    if (b >= 0 && b < a.length && c > 0)
        d = a.substr(0, b) + a.substr(b + c, a.length - b - c);
    return d
};
goog.string.remove = function(a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "");
    return a.replace(c, "")
};
goog.string.removeAll = function(a, b) {
    var c = new RegExp(goog.string.regExpEscape(b), "g");
    return a.replace(c, "")
};
goog.string.regExpEscape = function(a) {
    return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(a, b) {
    return (new Array(b + 1)).join(a)
};
goog.string.padNumber = function(a, b, c) {
    a = goog.isDef(c) ? a.toFixed(c) : String(a);
    c = a.indexOf(".");
    if (c==-1)
        c = a.length;
    return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function(a) {
    return a == null ? "" : String(a)
};
goog.string.buildString = function() {
    return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
    return Math.floor(Math.random() * 2147483648).toString(36) + (Math.floor(Math.random() * 2147483648)^goog.now()).toString(36)
};
goog.string.compareVersions = function(a, b) {
    for (var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; c == 0 && g < f; g++) {
        var h = d[g] || "", i = e[g] || "", k = new RegExp("(\\d*)(\\D*)", "g"), l = new RegExp("(\\d*)(\\D*)", "g");
        do {
            var m = k.exec(h) || ["", "", ""], j = l.exec(i) || ["", "", ""];
            if (m[0].length == 0 && j[0].length == 0)
                break;
            c = m[1].length == 0 ? 0 : parseInt(m[1], 10);
            var n = j[1].length == 0 ? 0: parseInt(j[1], 10);
            c = goog.string.compareElements_(c, n) || goog.string.compareElements_(m[2].length ==
            0, j[2].length == 0) || goog.string.compareElements_(m[2], j[2])
        }
        while (c == 0)
        }
    return c
};
goog.string.compareElements_ = function(a, b) {
    if (a < b)
        return -1;
    else if (a > b)
        return 1;
    return 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(a) {
    for (var b = 0, c = 0; c < a.length; ++c) {
        b = 31 * b + a.charCodeAt(c);
        b%=goog.string.HASHCODE_MAX_
    }
    return b
};
goog.string.uniqueStringCounter_ = Math.random() * 2147483648 | 0;
goog.string.createUniqueString = function() {
    return "goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
    var b = Number(a);
    if (b == 0 && goog.string.isEmpty(a))
        return NaN;
    return b
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
    b.unshift(a);
    goog.debug.Error.call(this, goog.string.subs.apply(null, b));
    b.shift();
    this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
    var e = "Assertion failed";
    if (c) {
        e += ": " + c;
        var f = d
    } else if (a) {
        e += ": " + a;
        f = b
    }
    throw new goog.asserts.AssertionError("" + e, f || []);
};
goog.asserts.assert = function(a, b) {
    goog.asserts.ENABLE_ASSERTS&&!a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2))
};
goog.asserts.fail = function(a) {
    if (goog.asserts.ENABLE_ASSERTS)
        throw new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
};
goog.asserts.assertNumber = function(a, b) {
    goog.asserts.ENABLE_ASSERTS&&!goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s.", [a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertString = function(a, b) {
    goog.asserts.ENABLE_ASSERTS&&!goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s.", [a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertFunction = function(a, b) {
    goog.asserts.ENABLE_ASSERTS&&!goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s.", [a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertObject = function(a, b) {
    goog.asserts.ENABLE_ASSERTS&&!goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s.", [a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertArray = function(a, b) {
    goog.asserts.ENABLE_ASSERTS&&!goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s.", [a], b, Array.prototype.slice.call(arguments, 2));
    return a
};
goog.asserts.assertInstanceof = function(a, b, c) {
    goog.asserts.ENABLE_ASSERTS&&!(a instanceof b) && goog.asserts.doAssertFailure_("instanceof check failed.", null, c, Array.prototype.slice.call(arguments, 3))
};
goog.array = {};
goog.array.ArrayLike = goog.typedef;
goog.array.peek = function(a) {
    return a[a.length-1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.array.ARRAY_PROTOTYPE_.indexOf ? function(a, b, c) {
    goog.asserts.assert(a || goog.isString(a));
    goog.asserts.assertNumber(a.length);
    return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a, b, c)
} : function(a, b, c) {
    c = c == null ? 0 : c < 0 ? Math.max(0, a.length + c) : c;
    if (goog.isString(a)) {
        if (!goog.isString(b) || b.length != 1)
            return -1;
        return a.indexOf(b, c)
    }
    for (c = c; c < a.length; c++)
        if (c in a && a[c] === b)
            return c;
    return -1
};
goog.array.lastIndexOf = goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(a, b, c) {
    goog.asserts.assert(a || goog.isString(a));
    goog.asserts.assertNumber(a.length);
    return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a, b, c == null ? a.length-1 : c)
} : function(a, b, c) {
    c = c == null ? a.length-1 : c;
    if (c < 0)
        c = Math.max(0, a.length + c);
    if (goog.isString(a)) {
        if (!goog.isString(b) || b.length != 1)
            return -1;
        return a.lastIndexOf(b, c)
    }
    for (c = c; c >= 0; c--)
        if (c in a && a[c] === b)
            return c;
    return -1
};
goog.array.forEach = goog.array.ARRAY_PROTOTYPE_.forEach ? function(a, b, c) {
    goog.asserts.assert(a || goog.isString(a));
    goog.asserts.assertNumber(a.length);
    goog.array.ARRAY_PROTOTYPE_.forEach.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        f in e && b.call(c, e[f], f, a)
};
goog.array.forEachRight = function(a, b, c) {
    var d = a.length, e = goog.isString(a) ? a.split(""): a;
    for (d = d-1; d >= 0; --d)
        d in e && b.call(c, e[d], d, a)
};
goog.array.filter = goog.array.ARRAY_PROTOTYPE_.filter ? function(a, b, c) {
    goog.asserts.assert(a || goog.isString(a));
    goog.asserts.assertNumber(a.length);
    return goog.array.ARRAY_PROTOTYPE_.filter.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0; h < d; h++)
        if (h in g) {
            var i = g[h];
            if (b.call(c, i, h, a))
                e[f++] = i
        }
    return e
};
goog.array.map = goog.array.ARRAY_PROTOTYPE_.map ? function(a, b, c) {
    goog.asserts.assert(a || goog.isString(a));
    goog.asserts.assertNumber(a.length);
    return goog.array.ARRAY_PROTOTYPE_.map.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = new Array(d), f = goog.isString(a) ? a.split("") : a, g = 0; g < d; g++)
        if (g in f)
            e[g] = b.call(c, f[g], g, a);
    return e
};
goog.array.BLACKuce = function(a, b, c, d) {
    if (a.BLACKuce)
        return d ? a.BLACKuce(goog.bind(b, d), c) : a.BLACKuce(b, c);
    var e = c;
    goog.array.forEach(a, function(f, g) {
        e = b.call(d, e, f, g, a)
    });
    return e
};
goog.array.BLACKuceRight = function(a, b, c, d) {
    if (a.BLACKuceRight)
        return d ? a.BLACKuceRight(goog.bind(b, d), c) : a.BLACKuceRight(b, c);
    var e = c;
    goog.array.forEachRight(a, function(f, g) {
        e = b.call(d, e, f, g, a)
    });
    return e
};
goog.array.some = goog.array.ARRAY_PROTOTYPE_.some ? function(a, b, c) {
    goog.asserts.assert(a || goog.isString(a));
    goog.asserts.assertNumber(a.length);
    return goog.array.ARRAY_PROTOTYPE_.some.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a))
            return true;
    return false
};
goog.array.every = goog.array.ARRAY_PROTOTYPE_.every ? function(a, b, c) {
    goog.asserts.assert(a || goog.isString(a));
    goog.asserts.assertNumber(a.length);
    return goog.array.ARRAY_PROTOTYPE_.every.call(a, b, c)
} : function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e&&!b.call(c, e[f], f, a))
            return false;
    return true
};
goog.array.find = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    return b < 0 ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, c) {
    for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++)
        if (f in e && b.call(c, e[f], f, a))
            return f;
    return -1
};
goog.array.findRight = function(a, b, c) {
    b = goog.array.findIndexRight(a, b, c);
    return b < 0 ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, c) {
    var d = a.length, e = goog.isString(a) ? a.split(""): a;
    for (d = d-1; d >= 0; d--)
        if (d in e && b.call(c, e[d], d, a))
            return d;
    return -1
};
goog.array.contains = function(a, b) {
    return goog.array.indexOf(a, b) >= 0
};
goog.array.isEmpty = function(a) {
    return a.length == 0
};
goog.array.clear = function(a) {
    if (!goog.isArray(a))
        for (var b = a.length-1; b >= 0; b--)
            delete a[b];
    a.length = 0
};
goog.array.insert = function(a, b) {
    goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, c) {
    goog.array.splice(a, c, 0, b)
};
goog.array.insertArrayAt = function(a, b, c) {
    goog.partial(goog.array.splice, a, c, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, c) {
    var d;
    arguments.length == 2 || (d = goog.array.indexOf(a, c)) < 0 ? a.push(b) : goog.array.insertAt(a, b, d)
};
goog.array.remove = function(a, b) {
    var c = goog.array.indexOf(a, b), d;
    if (d = c >= 0)
        goog.array.removeAt(a, c);
    return d
};
goog.array.removeAt = function(a, b) {
    goog.asserts.assert(a || goog.isString(a));
    goog.asserts.assertNumber(a.length);
    return goog.array.ARRAY_PROTOTYPE_.splice.call(a, b, 1).length == 1
};
goog.array.removeIf = function(a, b, c) {
    b = goog.array.findIndex(a, b, c);
    if (b >= 0) {
        goog.array.removeAt(a, b);
        return true
    }
    return false
};
goog.array.concat = function() {
    return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.clone = function(a) {
    if (goog.isArray(a))
        return goog.array.concat(a);
    else {
        for (var b = [], c = 0, d = a.length; c < d; c++)
            b[c] = a[c];
        return b
    }
};
goog.array.toArray = function(a) {
    if (goog.isArray(a))
        return goog.array.concat(a);
    return goog.array.clone(a)
};
goog.array.extend = function(a) {
    for (var b = 1; b < arguments.length; b++) {
        var c = arguments[b], d;
        if (goog.isArray(c) || (d = goog.isArrayLike(c)) && c.hasOwnProperty("callee"))
            a.push.apply(a, c);
        else if (d)
            for (var e = a.length, f = c.length, g = 0; g < f; g++)
                a[e + g] = c[g];
        else 
            a.push(c)
    }
};
goog.array.splice = function(a) {
    goog.asserts.assert(a || goog.isString(a));
    goog.asserts.assertNumber(a.length);
    return goog.array.ARRAY_PROTOTYPE_.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, c) {
    goog.asserts.assert(a || goog.isString(a));
    goog.asserts.assertNumber(a.length);
    return arguments.length <= 2 ? goog.array.ARRAY_PROTOTYPE_.slice.call(a, b) : goog.array.ARRAY_PROTOTYPE_.slice.call(a, b, c)
};
goog.array.removeDuplicates = function(a, b) {
    for (var c = b || a, d = {}, e = 0, f = 0; f < a.length;) {
        var g = a[f++], h = goog.isObject(g) ? goog.getUid(g): g;
        if (!Object.prototype.hasOwnProperty.call(d, h)) {
            d[h] = true;
            c[e++] = g
        }
    }
    c.length = e
};
goog.array.binarySearch = function(a, b, c) {
    return goog.array.binarySelect(a, goog.partial(c || goog.array.defaultCompare, b))
};
goog.array.binarySelect = function(a, b, c) {
    for (var d = 0, e = a.length, f; d < e;) {
        var g = d + e>>1, h = b.call(c, a[g], g, a);
        if (h > 0)
            d = g + 1;
        else {
            e = g;
            f=!h
        }
    }
    return f ? d : ~d
};
goog.array.sort = function(a, b) {
    goog.asserts.assert(a || goog.isString(a));
    goog.asserts.assertNumber(a.length);
    goog.array.ARRAY_PROTOTYPE_.sort.call(a, b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
    for (var c = 0; c < a.length; c++)
        a[c] = {
            index: c,
            value: a[c]
        };
    var d = b || goog.array.defaultCompare;
    goog.array.sort(a, function(e, f) {
        return d(e.value, f.value) || e.index - f.index
    });
    for (c = 0; c < a.length; c++)
        a[c] = a[c].value
};
goog.array.sortObjectsByKey = function(a, b, c) {
    var d = c || goog.array.defaultCompare;
    goog.array.sort(a, function(e, f) {
        return d(e[b], f[b])
    })
};
goog.array.equals = function(a, b, c) {
    if (!goog.isArrayLike(a) ||!goog.isArrayLike(b) || a.length != b.length)
        return false;
    var d = a.length;
    c = c || goog.array.defaultCompareEquality;
    for (var e = 0; e < d; e++)
        if (!c(a[e], b[e]))
            return false;
    return true
};
goog.array.compare = function(a, b, c) {
    return goog.array.equals(a, b, c)
};
goog.array.defaultCompare = function(a, b) {
    return a > b ? 1 : a < b?-1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
    return a === b
};
goog.array.binaryInsert = function(a, b, c) {
    c = goog.array.binarySearch(a, b, c);
    if (c < 0) {
        goog.array.insertAt(a, b, - (c + 1));
        return true
    }
    return false
};
goog.array.binaryRemove = function(a, b, c) {
    b = goog.array.binarySearch(a, b, c);
    return b >= 0 ? goog.array.removeAt(a, b) : false
};
goog.array.bucket = function(a, b) {
    for (var c = {}, d = 0; d < a.length; d++) {
        var e = a[d], f = b(e, d, a);
        if (goog.isDef(f))(c[f] || (c[f] = [])).push(e)
        }
    return c
};
goog.array.repeat = function(a, b) {
    for (var c = [], d = 0; d < b; d++)
        c[d] = a;
    return c
};
goog.array.flatten = function() {
    for (var a = [], b = 0; b < arguments.length; b++) {
        var c = arguments[b];
        goog.isArray(c) ? a.push.apply(a, goog.array.flatten.apply(null, c)) : a.push(c)
    }
    return a
};
goog.array.rotate = function(a, b) {
    goog.asserts.assert(a || goog.isString(a));
    goog.asserts.assertNumber(a.length);
    if (a.length) {
        b%=a.length;
        if (b > 0)
            goog.array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice( - b, b));
        else 
            b < 0 && goog.array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, - b))
    }
    return a
};
goog.dom = {};
goog.dom.TagName = {
    A: "A",
    ABBR: "ABBR",
    ACRONYM: "ACRONYM",
    ADDRESS: "ADDRESS",
    APPLET: "APPLET",
    AREA: "AREA",
    B: "B",
    BASE: "BASE",
    BASEFONT: "BASEFONT",
    BDO: "BDO",
    BIG: "BIG",
    BLOCKQUOTE: "BLOCKQUOTE",
    BODY: "BODY",
    BR: "BR",
    BUTTON: "BUTTON",
    CAPTION: "CAPTION",
    CENTER: "CENTER",
    CITE: "CITE",
    CODE: "CODE",
    COL: "COL",
    COLGROUP: "COLGROUP",
    DD: "DD",
    DEL: "DEL",
    DFN: "DFN",
    DIR: "DIR",
    DIV: "DIV",
    DL: "DL",
    DT: "DT",
    EM: "EM",
    FIELDSET: "FIELDSET",
    FONT: "FONT",
    FORM: "FORM",
    FRAME: "FRAME",
    FRAMESET: "FRAMESET",
    H1: "H1",
    H2: "H2",
    H3: "H3",
    H4: "H4",
    H5: "H5",
    H6: "H6",
    HEAD: "HEAD",
    HR: "HR",
    HTML: "HTML",
    I: "I",
    IFRAME: "IFRAME",
    IMG: "IMG",
    INPUT: "INPUT",
    INS: "INS",
    ISINDEX: "ISINDEX",
    KBD: "KBD",
    LABEL: "LABEL",
    LEGEND: "LEGEND",
    LI: "LI",
    LINK: "LINK",
    MAP: "MAP",
    MENU: "MENU",
    META: "META",
    NOFRAMES: "NOFRAMES",
    NOSCRIPT: "NOSCRIPT",
    OBJECT: "OBJECT",
    OL: "OL",
    OPTGROUP: "OPTGROUP",
    OPTION: "OPTION",
    P: "P",
    PARAM: "PARAM",
    PRE: "PRE",
    Q: "Q",
    S: "S",
    SAMP: "SAMP",
    SCRIPT: "SCRIPT",
    SELECT: "SELECT",
    SMALL: "SMALL",
    SPAN: "SPAN",
    STRIKE: "STRIKE",
    STRONG: "STRONG",
    STYLE: "STYLE",
    SUB: "SUB",
    SUP: "SUP",
    TABLE: "TABLE",
    TBODY: "TBODY",
    TD: "TD",
    TEXTAREA: "TEXTAREA",
    TFOOT: "TFOOT",
    TH: "TH",
    THEAD: "THEAD",
    TITLE: "TITLE",
    TR: "TR",
    TT: "TT",
    U: "U",
    UL: "UL",
    VAR: "VAR"
};
goog.dom.classes = {};
goog.dom.classes.set = function(a, b) {
    a.className = b
};
goog.dom.classes.get = function(a) {
    return (a = a.className) && typeof a.split == "function" ? a.split(/\s+/) : []
};
goog.dom.classes.add = function(a) {
    var b = goog.dom.classes.get(a), c = goog.array.slice(arguments, 1);
    c = goog.dom.classes.add_(b, c);
    a.className = b.join(" ");
    return c
};
goog.dom.classes.remove = function(a) {
    var b = goog.dom.classes.get(a), c = goog.array.slice(arguments, 1);
    c = goog.dom.classes.remove_(b, c);
    a.className = b.join(" ");
    return c
};
goog.dom.classes.add_ = function(a, b) {
    for (var c = 0, d = 0; d < b.length; d++)
        if (!goog.array.contains(a, b[d])) {
            a.push(b[d]);
            c++
        }
    return c == b.length
};
goog.dom.classes.remove_ = function(a, b) {
    for (var c = 0, d = 0; d < a.length; d++)
        if (goog.array.contains(b, a[d])) {
            goog.array.splice(a, d--, 1);
            c++
        }
    return c == b.length
};
goog.dom.classes.swap = function(a, b, c) {
    for (var d = goog.dom.classes.get(a), e = false, f = 0; f < d.length; f++)
        if (d[f] == b) {
            goog.array.splice(d, f--, 1);
            e = true
        }
    if (e) {
        d.push(c);
        a.className = d.join(" ")
    }
    return e
};
goog.dom.classes.addRemove = function(a, b, c) {
    var d = goog.dom.classes.get(a);
    if (goog.isString(b))
        goog.array.remove(d, b);
    else 
        goog.isArray(b) && goog.dom.classes.remove_(d, b);
    if (goog.isString(c)&&!goog.array.contains(d, c))
        d.push(c);
    else 
        goog.isArray(c) && goog.dom.classes.add_(d, c);
    a.className = d.join(" ")
};
goog.dom.classes.has = function(a, b) {
    return goog.array.contains(goog.dom.classes.get(a), b)
};
goog.dom.classes.enable = function(a, b, c) {
    c ? goog.dom.classes.add(a, b) : goog.dom.classes.remove(a, b)
};
goog.dom.classes.toggle = function(a, b) {
    var c=!goog.dom.classes.has(a, b);
    goog.dom.classes.enable(a, b, c);
    return c
};
goog.math = {};
goog.math.Coordinate = function(a, b) {
    this.x = goog.isDef(a) ? a : 0;
    this.y = goog.isDef(b) ? b : 0
};
goog.math.Coordinate.prototype.clone = function() {
    return new goog.math.Coordinate(this.x, this.y)
};
if (goog.DEBUG)
    goog.math.Coordinate.prototype.toString = function() {
        return "(" + this.x + ", " + this.y + ")"
    };
goog.math.Coordinate.equals = function(a, b) {
    if (a == b)
        return true;
    if (!a ||!b)
        return false;
    return a.x == b.x && a.y == b.y
};
goog.math.Coordinate.distance = function(a, b) {
    var c = a.x - b.x, d = a.y - b.y;
    return Math.sqrt(c * c + d * d)
};
goog.math.Coordinate.squaBLACKDistance = function(a, b) {
    var c = a.x - b.x, d = a.y - b.y;
    return c * c + d * d
};
goog.math.Coordinate.difference = function(a, b) {
    return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
};
goog.math.Coordinate.sum = function(a, b) {
    return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
};
goog.math.Size = function(a, b) {
    this.width = a;
    this.height = b
};
goog.math.Size.equals = function(a, b) {
    if (a == b)
        return true;
    if (!a ||!b)
        return false;
    return a.width == b.width && a.height == b.height
};
goog.math.Size.prototype.clone = function() {
    return new goog.math.Size(this.width, this.height)
};
if (goog.DEBUG)
    goog.math.Size.prototype.toString = function() {
        return "(" + this.width + " x " + this.height + ")"
    };
goog.math.Size.prototype.getLongest = function() {
    return Math.max(this.width, this.height)
};
goog.math.Size.prototype.getShortest = function() {
    return Math.min(this.width, this.height)
};
goog.math.Size.prototype.area = function() {
    return this.width * this.height
};
goog.math.Size.prototype.aspectRatio = function() {
    return this.width / this.height
};
goog.math.Size.prototype.isEmpty = function() {
    return !this.area()
};
goog.math.Size.prototype.ceil = function() {
    this.width = Math.ceil(this.width);
    this.height = Math.ceil(this.height);
    return this
};
goog.math.Size.prototype.fitsInside = function(a) {
    return this.width <= a.width && this.height <= a.height
};
goog.math.Size.prototype.floor = function() {
    this.width = Math.floor(this.width);
    this.height = Math.floor(this.height);
    return this
};
goog.math.Size.prototype.round = function() {
    this.width = Math.round(this.width);
    this.height = Math.round(this.height);
    return this
};
goog.math.Size.prototype.scale = function(a) {
    this.width*=a;
    this.height*=a;
    return this
};
goog.math.Size.prototype.scaleToFit = function(a) {
    return this.scale(this.aspectRatio() > a.aspectRatio() ? a.width / this.width : a.height / this.height)
};
goog.object = {};
goog.object.forEach = function(a, b, c) {
    for (var d in a)
        b.call(c, a[d], d, a)
};
goog.object.filter = function(a, b, c) {
    var d = {};
    for (var e in a)
        if (b.call(c, a[e], e, a))
            d[e] = a[e];
    return d
};
goog.object.map = function(a, b, c) {
    var d = {};
    for (var e in a)
        d[e] = b.call(c, a[e], e, a);
    return d
};
goog.object.some = function(a, b, c) {
    for (var d in a)
        if (b.call(c, a[d], d, a))
            return true;
    return false
};
goog.object.every = function(a, b, c) {
    for (var d in a)
        if (!b.call(c, a[d], d, a))
            return false;
    return true
};
goog.object.getCount = function(a) {
    var b = 0;
    for (var c in a)
        b++;
    return b
};
goog.object.getAnyKey = function(a) {
    for (var b in a)
        return b
};
goog.object.getAnyValue = function(a) {
    for (var b in a)
        return a[b]
};
goog.object.contains = function(a, b) {
    return goog.object.containsValue(a, b)
};
goog.object.getValues = function(a) {
    var b = [], c = 0;
    for (var d in a)
        b[c++] = a[d];
    return b
};
goog.object.getKeys = function(a) {
    var b = [], c = 0;
    for (var d in a)
        b[c++] = d;
    return b
};
goog.object.containsKey = function(a, b) {
    return b in a
};
goog.object.containsValue = function(a, b) {
    for (var c in a)
        if (a[c] == b)
            return true;
    return false
};
goog.object.findKey = function(a, b, c) {
    for (var d in a)
        if (b.call(c, a[d], d, a))
            return d
};
goog.object.findValue = function(a, b, c) {
    return (b = goog.object.findKey(a, b, c)) && a[b]
};
goog.object.isEmpty = function(a) {
    for (var b in a)
        return false;
    return true
};
goog.object.clear = function(a) {
    for (var b = goog.object.getKeys(a), c = b.length-1; c >= 0; c--)
        goog.object.remove(a, b[c])
};
goog.object.remove = function(a, b) {
    var c;
    if (c = b in a)
        delete a[b];
    return c
};
goog.object.add = function(a, b, c) {
    if (b in a)
        throw Error('The object already contains the key "' + b + '"');
    goog.object.set(a, b, c)
};
goog.object.get = function(a, b, c) {
    if (b in a)
        return a[b];
    return c
};
goog.object.set = function(a, b, c) {
    a[b] = c
};
goog.object.setIfUndefined = function(a, b, c) {
    return b in a ? a[b] : (a[b] = c)
};
goog.object.clone = function(a) {
    var b = {};
    for (var c in a)
        b[c] = a[c];
    return b
};
goog.object.transpose = function(a) {
    var b = {};
    for (var c in a)
        b[a[c]] = c;
    return b
};
goog.object.PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
goog.object.extend = function(a) {
    for (var b, c, d = 1; d < arguments.length; d++) {
        c = arguments[d];
        for (b in c)
            a[b] = c[b];
        for (var e = 0; e < goog.object.PROTOTYPE_FIELDS_.length; e++) {
            b = goog.object.PROTOTYPE_FIELDS_[e];
            if (Object.prototype.hasOwnProperty.call(c, b))
                a[b] = c[b]
        }
    }
};
goog.object.create = function() {
    var a = arguments.length;
    if (a == 1 && goog.isArray(arguments[0]))
        return goog.object.create.apply(null, arguments[0]);
    if (a%2)
        throw Error("Uneven number of arguments");
    for (var b = {}, c = 0; c < a; c += 2)
        b[arguments[c]] = arguments[c + 1];
    return b
};
goog.object.createSet = function() {
    var a = arguments.length;
    if (a == 1 && goog.isArray(arguments[0]))
        return goog.object.createSet.apply(null, arguments[0]);
    for (var b = {}, c = 0; c < a; c++)
        b[arguments[c]] = true;
    return b
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = false;
goog.userAgent.ASSUME_GECKO = false;
goog.userAgent.ASSUME_WEBKIT = false;
goog.userAgent.ASSUME_MOBILE_WEBKIT = false;
goog.userAgent.ASSUME_OPERA = false;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
    return goog.global.navigator ? goog.global.navigator.userAgent : null
};
goog.userAgent.getNavigator = function() {
    return goog.global.navigator
};
goog.userAgent.init_ = function() {
    goog.userAgent.detectedOpera_ = false;
    goog.userAgent.detectedIe_ = false;
    goog.userAgent.detectedWebkit_ = false;
    goog.userAgent.detectedMobile_ = false;
    goog.userAgent.detectedGecko_ = false;
    var a;
    if (!goog.userAgent.BROWSER_KNOWN_ && (a = goog.userAgent.getUserAgentString())) {
        var b = goog.userAgent.getNavigator();
        goog.userAgent.detectedOpera_ = a.indexOf("Opera") == 0;
        goog.userAgent.detectedIe_=!goog.userAgent.detectedOpera_ && a.indexOf("MSIE")!=-1;
        goog.userAgent.detectedWebkit_=!goog.userAgent.detectedOpera_ &&
        a.indexOf("WebKit")!=-1;
        goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && a.indexOf("Mobile")!=-1;
        goog.userAgent.detectedGecko_=!goog.userAgent.detectedOpera_&&!goog.userAgent.detectedWebkit_ && b.product == "Gecko"
    }
};
goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
    var a = goog.userAgent.getNavigator();
    return a && a.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = false;
goog.userAgent.ASSUME_WINDOWS = false;
goog.userAgent.ASSUME_LINUX = false;
goog.userAgent.ASSUME_X11 = false;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_ = function() {
    goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
    goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
    goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
    goog.userAgent.detectedX11_=!!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11")
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_ = function() {
    var a = "", b;
    if (goog.userAgent.OPERA && goog.global.opera) {
        a = goog.global.opera.version;
        a = typeof a == "function" ? a() : a
    } else {
        if (goog.userAgent.GECKO)
            b = /rv\:([^\);]+)(\)|;)/;
        else if (goog.userAgent.IE)
            b = /MSIE\s+([^\);]+)(\)|;)/;
        else if (goog.userAgent.WEBKIT)
            b = /WebKit\/(\S+)/;
        if (b)
            a = (a = b.exec(goog.userAgent.getUserAgentString())) ? a[1] : ""
    }
    return a
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
    return goog.string.compareVersions(a, b)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function(a) {
    return goog.userAgent.isVersionCache_[a] || (goog.userAgent.isVersionCache_[a] = goog.string.compareVersions(goog.userAgent.VERSION, a) >= 0)
};
goog.dom.ASSUME_QUIRKS_MODE = false;
goog.dom.ASSUME_STANDARDS_MODE = false;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.NodeType = {
    ELEMENT: 1,
    ATTRIBUTE: 2,
    TEXT: 3,
    CDATA_SECTION: 4,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    PROCESSING_INSTRUCTION: 7,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    NOTATION: 12
};
goog.dom.getDomHelper = function(a) {
    return a ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.getDocument = function() {
    return document
};
goog.dom.getElement = function(a) {
    return goog.isString(a) ? document.getElementById(a) : a
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementsByTagNameAndClass_(document, a, b, c)
};
goog.dom.getElementsByTagNameAndClass_ = function(a, b, c, d) {
    d = d || a;
    b = b && b != "*" ? b.toUpperCase() : "";
    if (d.querySelectorAll && (b || c) && (!goog.userAgent.WEBKIT || goog.dom.isCss1CompatMode_(a) || goog.userAgent.isVersion("528")))
        return d.querySelectorAll(b + (c ? "." + c : ""));
    if (c && d.getElementsByClassName) {
        a = d.getElementsByClassName(c);
        if (b) {
            d = {};
            for (var e = 0, f = 0, g; g = a[f]; f++)
                if (b == g.nodeName)
                    d[e++] = g;
            d.length = e;
            return d
        } else 
            return a
    }
    a = d.getElementsByTagName(b || "*");
    if (c) {
        d = {};
        for (f = e = 0; g = a[f]; f++) {
            b = g.className;
            if (typeof b.split ==
            "function" && goog.array.contains(b.split(/\s+/), c))
                d[e++] = g
        }
        d.length = e;
        return d
    } else 
        return a
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(a, b) {
    goog.object.forEach(b, function(c, d) {
        if (d == "style")
            a.style.cssText = c;
        else if (d == "class")
            a.className = c;
        else if (d == "for")
            a.htmlFor = c;
        else if (d in goog.dom.DIRECT_ATTRIBUTE_MAP_)
            a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], c);
        else 
            a[d] = c
    })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    rowspan: "rowSpan",
    valign: "vAlign",
    height: "height",
    width: "width",
    usemap: "useMap",
    frameborder: "frameBorder",
    type: "type"
};
goog.dom.getViewportSize = function(a) {
    return goog.dom.getViewportSize_(a || window)
};
goog.dom.getViewportSize_ = function(a) {
    var b = a.document;
    if (goog.userAgent.WEBKIT&&!goog.userAgent.isVersion("500")&&!goog.userAgent.MOBILE) {
        if (typeof a.innerHeight == "undefined")
            a = window;
        b = a.innerHeight;
        var c = a.document.documentElement.scrollHeight;
        if (a == a.top)
            if (c < b)
                b -= 15;
        return new goog.math.Size(a.innerWidth, b)
    }
    a = goog.dom.isCss1CompatMode_(b) && (!goog.userAgent.OPERA || goog.userAgent.OPERA && goog.userAgent.isVersion("9.50")) ? b.documentElement : b.body;
    return new goog.math.Size(a.clientWidth, a.clientHeight)
};
goog.dom.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeight_ = function(a) {
    var b = a.document, c = 0;
    if (b) {
        a = goog.dom.getViewportSize_(a).height;
        c = b.body;
        var d = b.documentElement;
        if (goog.dom.isCss1CompatMode_(b) && d.scrollHeight)
            c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight;
        else {
            b = d.scrollHeight;
            var e = d.offsetHeight;
            if (d.clientHeight != e) {
                b = c.scrollHeight;
                e = c.offsetHeight
            }
            c = b > a ? b > e ? b : e : b < e ? b : e
        }
    }
    return c
};
goog.dom.getPageScroll = function(a) {
    return goog.dom.getDomHelper((a || goog.global || window).document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function(a) {
    a = goog.dom.getDocumentScrollElement_(a);
    return new goog.math.Coordinate(a.scrollLeft, a.scrollTop)
};
goog.dom.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function(a) {
    return !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body
};
goog.dom.getWindow = function(a) {
    return a ? goog.dom.getWindow_(a) : window
};
goog.dom.getWindow_ = function(a) {
    return a.parentWindow || a.defaultView
};
goog.dom.createDom = function() {
    return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(a, b) {
    var c = b[0], d = b[1];
    if (goog.userAgent.IE && d && (d.name || d.type)) {
        c = ["<", c];
        d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
        if (d.type) {
            c.push(' type="', goog.string.htmlEscape(d.type), '"');
            var e = {};
            goog.object.extend(e, d);
            d = e;
            delete d.type
        }
        c.push(">");
        c = c.join("")
    }
    var f = a.createElement(c);
    if (d)
        if (goog.isString(d))
            f.className = d;
        else 
            goog.dom.setProperties(f, d);
    if (b.length > 2) {
        d = function(g) {
            if (g)
                f.appendChild(goog.isString(g) ? a.createTextNode(g) : g)
        };
        for (c = 2; c <
        b.length; c++) {
            e = b[c];
            goog.isArrayLike(e)&&!goog.dom.isNodeLike(e) ? goog.array.forEach(goog.dom.isNodeList(e) ? goog.array.clone(e) : e, d) : d(e)
        }
    }
    return f
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(a) {
    return document.createElement(a)
};
goog.dom.createTextNode = function(a) {
    return document.createTextNode(a)
};
goog.dom.createTable = function(a, b, c) {
    return goog.dom.createTable_(document, a, b, !!c)
};
goog.dom.createTable_ = function(a, b, c, d) {
    for (var e = ["<tr>"], f = 0; f < c; f++)
        e.push(d ? "<td>&nbsp;</td>" : "<td></td>");
    e.push("</tr>");
    e = e.join("");
    c = ["<table>"];
    for (f = 0; f < b; f++)
        c.push(e);
    c.push("</table>");
    a = a.createElement(goog.dom.TagName.DIV);
    a.innerHTML = c.join("");
    return a.removeChild(a.firstChild)
};
goog.dom.htmlToDocumentFragment = function(a) {
    return goog.dom.htmlToDocumentFragment_(document, a)
};
goog.dom.htmlToDocumentFragment_ = function(a, b) {
    var c = a.createElement("div");
    c.innerHTML = b;
    if (c.childNodes.length == 1)
        return c.removeChild(c.firstChild);
    else {
        for (var d = a.createDocumentFragment(); c.firstChild;)
            d.appendChild(c.firstChild);
        return d
    }
};
goog.dom.getCompatMode = function() {
    return goog.dom.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function(a) {
    if (goog.dom.COMPAT_MODE_KNOWN_)
        return goog.dom.ASSUME_STANDARDS_MODE;
    return a.compatMode == "CSS1Compat"
};
goog.dom.canHaveChildren = function(a) {
    if (a.nodeType != goog.dom.NodeType.ELEMENT)
        return false;
    if ("canHaveChildren"in a)
        return a.canHaveChildren;
    switch (a.tagName) {
    case goog.dom.TagName.APPLET:
    case goog.dom.TagName.AREA:
    case goog.dom.TagName.BASE:
    case goog.dom.TagName.BR:
    case goog.dom.TagName.COL:
    case goog.dom.TagName.FRAME:
    case goog.dom.TagName.HR:
    case goog.dom.TagName.IMG:
    case goog.dom.TagName.INPUT:
    case goog.dom.TagName.IFRAME:
    case goog.dom.TagName.ISINDEX:
    case goog.dom.TagName.LINK:
    case goog.dom.TagName.NOFRAMES:
    case goog.dom.TagName.NOSCRIPT:
    case goog.dom.TagName.META:
    case goog.dom.TagName.OBJECT:
    case goog.dom.TagName.PARAM:
    case goog.dom.TagName.SCRIPT:
    case goog.dom.TagName.STYLE:
        return false
    }
    return true
};
goog.dom.appendChild = function(a, b) {
    a.appendChild(b)
};
goog.dom.removeChildren = function(a) {
    for (var b; b = a.firstChild;)
        a.removeChild(b)
};
goog.dom.insertSiblingBefore = function(a, b) {
    b.parentNode && b.parentNode.insertBefore(a, b)
};
goog.dom.insertSiblingAfter = function(a, b) {
    b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
};
goog.dom.removeNode = function(a) {
    return a && a.parentNode ? a.parentNode.removeChild(a) : null
};
goog.dom.replaceNode = function(a, b) {
    var c = b.parentNode;
    c && c.replaceChild(a, b)
};
goog.dom.flattenElement = function(a) {
    var b, c = a.parentNode;
    if (c && c.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT)
        if (a.removeNode)
            return a.removeNode(false);
        else {
            for (; b = a.firstChild;)
                c.insertBefore(b, a);
                return goog.dom.removeNode(a)
        }
};
goog.dom.getFirstElementChild = function(a) {
    return goog.dom.getNextElementNode_(a.firstChild, true)
};
goog.dom.getLastElementChild = function(a) {
    return goog.dom.getNextElementNode_(a.lastChild, false)
};
goog.dom.getNextElementSibling = function(a) {
    return goog.dom.getNextElementNode_(a.nextSibling, true)
};
goog.dom.getPreviousElementSibling = function(a) {
    return goog.dom.getNextElementNode_(a.previousSibling, false)
};
goog.dom.getNextElementNode_ = function(a, b) {
    for (; a && a.nodeType != goog.dom.NodeType.ELEMENT;)
        a = b ? a.nextSibling : a.previousSibling;
    return a
};
goog.dom.getNextNode = function(a) {
    if (!a)
        return null;
    if (a.firstChild)
        return a.firstChild;
    for (; a&&!a.nextSibling;)
        a = a.parentNode;
    return a ? a.nextSibling : null
};
goog.dom.getPreviousNode = function(a) {
    if (!a)
        return null;
    if (!a.previousSibling)
        return a.parentNode;
    for (a = a.previousSibling; a && a.lastChild;)
        a = a.lastChild;
    return a
};
goog.dom.isNodeLike = function(a) {
    return goog.isObject(a) && a.nodeType > 0
};
goog.dom.contains = function(a, b) {
    if (a.contains && b.nodeType == goog.dom.NodeType.ELEMENT)
        return a == b || a.contains(b);
    if (typeof a.compaBLACKocumentPosition != "undefined")
        return a == b || Boolean(a.compaBLACKocumentPosition(b) & 16);
    for (; b && a != b;)
        b = b.parentNode;
    return b == a
};
goog.dom.compareNodeOrder = function(a, b) {
    if (a == b)
        return 0;
    if (a.compaBLACKocumentPosition)
        return a.compaBLACKocumentPosition(b) & 2 ? 1 : -1;
    if ("sourceIndex"in a || a.parentNode && "sourceIndex"in a.parentNode) {
        var c = a.nodeType == goog.dom.NodeType.ELEMENT, d = b.nodeType == goog.dom.NodeType.ELEMENT;
        if (c && d)
            return a.sourceIndex - b.sourceIndex;
        else {
            var e = a.parentNode, f = b.parentNode;
            if (e == f)
                return goog.dom.compareSiblingOrder_(a, b);
            if (!c && goog.dom.contains(e, b))
                return -1 * goog.dom.compareParentsDescendantNodeIe_(a, b);
            if (!d &&
            goog.dom.contains(f, a))
                return goog.dom.compareParentsDescendantNodeIe_(b, a);
            return (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex)
        }
    }
    d = goog.dom.getOwnerDocument(a);
    c = d.createRange();
    c.selectNode(a);
    c.collapse(true);
    d = d.createRange();
    d.selectNode(b);
    d.collapse(true);
    return c.compareBoundaryPoints(goog.global.Range.START_TO_END, d)
};
goog.dom.compareParentsDescendantNodeIe_ = function(a, b) {
    var c = a.parentNode;
    if (c == b)
        return -1;
    for (var d = b; d.parentNode != c;)
        d = d.parentNode;
    return goog.dom.compareSiblingOrder_(d, a)
};
goog.dom.compareSiblingOrder_ = function(a, b) {
    for (var c = b; c = c.previousSibling;)
        if (c == a)
            return -1;
    return 1
};
goog.dom.findCommonAncestor = function() {
    var a, b = arguments.length;
    if (b) {
        if (b == 1)
            return arguments[0]
    } else 
        return null;
    var c = [], d = Infinity;
    for (a = 0; a < b; a++) {
        for (var e = [], f = arguments[a]; f;) {
            e.unshift(f);
            f = f.parentNode
        }
        c.push(e);
        d = Math.min(d, e.length)
    }
    e = null;
    for (a = 0; a < d; a++) {
        f = c[0][a];
        for (var g = 1; g < b; g++)
            if (f != c[g][a])
                return e;
        e = f
    }
    return e
};
goog.dom.getOwnerDocument = function(a) {
    return a.nodeType == goog.dom.NodeType.DOCUMENT ? a : a.ownerDocument || a.document
};
goog.dom.getFrameContentDocument = function(a) {
    return goog.userAgent.WEBKIT ? a.document || a.contentWindow.document : a.contentDocument || a.contentWindow.document
};
goog.dom.getFrameContentWindow = function(a) {
    return a.contentWindow || goog.dom.getWindow_(goog.dom.getFrameContentDocument(a))
};
goog.dom.setTextContent = function(a, b) {
    if ("textContent"in a)
        a.textContent = b;
    else if (a.firstChild && a.firstChild.nodeType == goog.dom.NodeType.TEXT) {
        for (; a.lastChild != a.firstChild;)
            a.removeChild(a.lastChild);
            a.firstChild.data = b
    } else {
        goog.dom.removeChildren(a);
        var c = goog.dom.getOwnerDocument(a);
        a.appendChild(c.createTextNode(b))
    }
};
goog.dom.getOuterHtml = function(a) {
    if ("outerHTML"in a)
        return a.outerHTML;
    else {
        var b = goog.dom.getOwnerDocument(a).createElement("div");
        b.appendChild(a.cloneNode(true));
        return b.innerHTML
    }
};
goog.dom.findNode = function(a, b) {
    var c = [];
    return goog.dom.findNodes_(a, b, c, true) ? c[0] : undefined
};
goog.dom.findNodes = function(a, b) {
    var c = [];
    goog.dom.findNodes_(a, b, c, false);
    return c
};
goog.dom.findNodes_ = function(a, b, c, d) {
    if (a != null)
        for (var e = 0, f; f = a.childNodes[e]; e++) {
            if (b(f)) {
                c.push(f);
                if (d)
                    return true
            }
            if (goog.dom.findNodes_(f, b, c, d))
                return true
        }
    return false
};
goog.dom.TAGS_TO_IGNORE_ = {
    SCRIPT: 1,
    STYLE: 1,
    HEAD: 1,
    IFRAME: 1,
    OBJECT: 1
};
goog.dom.PBLACKEFINED_TAG_VALUES_ = {
    IMG: " ",
    BR: "\n"
};
goog.dom.isFocusableTabIndex = function(a) {
    var b = a.getAttributeNode("tabindex");
    if (b && b.specified) {
        a = a.tabIndex;
        return goog.isNumber(a) && a >= 0
    }
    return false
};
goog.dom.setFocusableTabIndex = function(a, b) {
    if (b)
        a.tabIndex = 0;
    else 
        a.removeAttribute("tabIndex")
};
goog.dom.getTextContent = function(a) {
    if (goog.userAgent.IE && "innerText"in a)
        a = goog.string.canonicalizeNewlines(a.innerText);
    else {
        var b = [];
        goog.dom.getTextContent_(a, b, true);
        a = b.join("")
    }
    a = a.replace(/\xAD/g, "");
    a = a.replace(/ +/g, " ");
    if (a != " ")
        a = a.replace(/^\s*/, "");
    return a
};
goog.dom.getRawTextContent = function(a) {
    var b = [];
    goog.dom.getTextContent_(a, b, false);
    return b.join("")
};
goog.dom.getTextContent_ = function(a, b, c) {
    if (!(a.nodeName in goog.dom.TAGS_TO_IGNORE_))
        if (a.nodeType == goog.dom.NodeType.TEXT)
            c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
        else if (a.nodeName in goog.dom.PBLACKEFINED_TAG_VALUES_)
            b.push(goog.dom.PBLACKEFINED_TAG_VALUES_[a.nodeName]);
        else 
            for (a = a.firstChild; a;) {
                goog.dom.getTextContent_(a, b, c);
                a = a.nextSibling
            }
};
goog.dom.getNodeTextLength = function(a) {
    return goog.dom.getTextContent(a).length
};
goog.dom.getNodeTextOffset = function(a, b) {
    for (var c = b || goog.dom.getOwnerDocument(a).body, d = []; a && a != c;) {
        for (var e = a; e = e.previousSibling;)
            d.unshift(goog.dom.getTextContent(e));
        a = a.parentNode
    }
    return goog.string.trimLeft(d.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function(a, b, c) {
    a = [a];
    for (var d = 0, e; a.length > 0 && d < b;) {
        e = a.pop();
        if (!(e.nodeName in goog.dom.TAGS_TO_IGNORE_))
            if (e.nodeType == goog.dom.NodeType.TEXT) {
                var f = e.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " ");
                d += f.length
            } else if (e.nodeName in goog.dom.PBLACKEFINED_TAG_VALUES_)
                d += goog.dom.PBLACKEFINED_TAG_VALUES_[e.nodeName].length;
            else 
                for (f = e.childNodes.length-1; f >= 0; f--)
                    a.push(e.childNodes[f])
    }
    if (goog.isObject(c)) {
        c.remainder = e ? e.nodeValue.length + b - d-1 : 0;
        c.node = e
    }
    return e
};
goog.dom.isNodeList = function(a) {
    if (a && typeof a.length == "number")
        if (goog.isObject(a))
            return typeof a.item == "function" || typeof a.item == "string";
        else if (goog.isFunction(a))
            return typeof a.item == "function";
    return false
};
goog.dom.getAncestorByTagNameAndClass = function(a, b, c) {
    var d = b ? b.toUpperCase(): null;
    return goog.dom.getAncestor(a, function(e) {
        return (!d || e.nodeName == d) && (!c || goog.dom.classes.has(e, c))
    }, true)
};
goog.dom.getAncestor = function(a, b, c, d) {
    if (!c)
        a = a.parentNode;
    for (c = 0; a && (d == null || c <= d);) {
        if (b(a))
            return a;
        a = a.parentNode;
        c++
    }
    return null
};
goog.dom.DomHelper = function(a) {
    this.document_ = a || goog.global.document || document
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(a) {
    this.document_ = a
};
goog.dom.DomHelper.prototype.getDocument = function() {
    return this.document_
};
goog.dom.DomHelper.prototype.getElement = function(a) {
    return goog.isString(a) ? this.document_.getElementById(a) : a
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(a, b, c) {
    return goog.dom.getElementsByTagNameAndClass_(this.document_, a, b, c)
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(a) {
    return goog.dom.getViewportSize(a || this.getWindow())
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
    return goog.dom.getDocumentHeight_(this.getWindow())
};
goog.dom.DomHelper.prototype.createDom = function() {
    return goog.dom.createDom_(this.document_, arguments)
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(a) {
    return this.document_.createElement(a)
};
goog.dom.DomHelper.prototype.createTextNode = function(a) {
    return this.document_.createTextNode(a)
};
goog.dom.DomHelper.prototype.createTable = function(a, b, c) {
    return goog.dom.createTable_(this.document_, a, b, !!c)
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function(a) {
    return goog.dom.htmlToDocumentFragment_(this.document_, a)
};
goog.dom.DomHelper.prototype.getCompatMode = function() {
    return this.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
    return goog.dom.isCss1CompatMode_(this.document_)
};
goog.dom.DomHelper.prototype.getWindow = function() {
    return goog.dom.getWindow_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
    return goog.dom.getDocumentScrollElement_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
    return goog.dom.getDocumentScroll_(this.document_)
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.Disposable = function() {};
goog.Disposable.prototype.disposed_ = false;
goog.Disposable.prototype.isDisposed = function() {
    return this.disposed_
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
    if (!this.disposed_) {
        this.disposed_ = true;
        this.disposeInternal()
    }
};
goog.Disposable.prototype.disposeInternal = function() {};
goog.dispose = function(a) {
    a && typeof a.dispose == "function" && a.dispose()
};
goog.events = {};
goog.events.Event = function(a, b) {
    goog.Disposable.call(this);
    this.type = a;
    this.currentTarget = this.target = b
};
goog.inherits(goog.events.Event, goog.Disposable);
goog.events.Event.prototype.disposeInternal = function() {
    delete this.type;
    delete this.target;
    delete this.currentTarget
};
goog.events.Event.prototype.propagationStopped_ = false;
goog.events.Event.prototype.returnValue_ = true;
goog.events.Event.prototype.stopPropagation = function() {
    this.propagationStopped_ = true
};
goog.events.Event.prototype.preventDefault = function() {
    this.returnValue_ = false
};
goog.events.Event.stopPropagation = function(a) {
    a.stopPropagation()
};
goog.events.Event.preventDefault = function(a) {
    a.preventDefault()
};
goog.events.BrowserEvent = function(a, b) {
    a && this.init(a, b)
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
};
goog.events.BrowserEvent.IEButtonMap_ = [1, 4, 2];
goog.events.BrowserEvent.prototype.target = null;
goog.events.BrowserEvent.prototype.relatedTarget = null;
goog.events.BrowserEvent.prototype.offsetX = 0;
goog.events.BrowserEvent.prototype.offsetY = 0;
goog.events.BrowserEvent.prototype.clientX = 0;
goog.events.BrowserEvent.prototype.clientY = 0;
goog.events.BrowserEvent.prototype.screenX = 0;
goog.events.BrowserEvent.prototype.screenY = 0;
goog.events.BrowserEvent.prototype.button = 0;
goog.events.BrowserEvent.prototype.keyCode = 0;
goog.events.BrowserEvent.prototype.charCode = 0;
goog.events.BrowserEvent.prototype.ctrlKey = false;
goog.events.BrowserEvent.prototype.altKey = false;
goog.events.BrowserEvent.prototype.shiftKey = false;
goog.events.BrowserEvent.prototype.metaKey = false;
goog.events.BrowserEvent.prototype.platformModifierKey = false;
goog.events.BrowserEvent.prototype.event_ = null;
goog.events.BrowserEvent.prototype.init = function(a, b) {
    var c = this.type = a.type;
    this.target = a.target || a.srcElement;
    this.currentTarget = b;
    var d = a.relatedTarget;
    if (d) {
        if (goog.userAgent.GECKO)
            try {
                d = d.nodeName && d
        } catch (e) {
            d = null
        }
    } else if (c == "mouseover")
        d = a.fromElement;
    else if (c == "mouseout")
        d = a.toElement;
    this.relatedTarget = d;
    this.offsetX = a.offsetX !== undefined ? a.offsetX : a.layerX;
    this.offsetY = a.offsetY !== undefined ? a.offsetY : a.layerY;
    this.clientX = a.clientX !== undefined ? a.clientX : a.pageX;
    this.clientY = a.clientY !==
    undefined ? a.clientY : a.pageY;
    this.screenX = a.screenX || 0;
    this.screenY = a.screenY || 0;
    this.button = a.button;
    this.keyCode = a.keyCode || 0;
    this.charCode = a.charCode || (c == "keypress" ? a.keyCode : 0);
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.platformModifierKey = goog.userAgent.MAC ? a.metaKey : a.ctrlKey;
    this.event_ = a;
    delete this.returnValue_;
    delete this.propagationStopped_
};
goog.events.BrowserEvent.prototype.isButton = function(a) {
    return goog.userAgent.IE ? this.type == "click" ? a == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap_[a]) : this.event_.button == a
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
    this.propagationStopped_ = true;
    if (this.event_.stopPropagation)
        this.event_.stopPropagation();
    else 
        this.event_.cancelBubble = true
};
goog.events.BrowserEvent.IE7_SET_KEY_CODE_TO_PREVENT_DEFAULT_ = goog.userAgent.IE&&!goog.userAgent.isVersion("8");
goog.events.BrowserEvent.prototype.preventDefault = function() {
    this.returnValue_ = false;
    var a = this.event_;
    if (a.preventDefault)
        a.preventDefault();
    else {
        a.returnValue = false;
        if (goog.events.BrowserEvent.IE7_SET_KEY_CODE_TO_PREVENT_DEFAULT_)
            try {
                if (a.ctrlKey || a.keyCode >= 112 && a.keyCode <= 123)
                    a.keyCode =- 1
        } catch (b) {}
    }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
    return this.event_
};
goog.events.BrowserEvent.prototype.disposeInternal = function() {
    goog.events.BrowserEvent.superClass_.disposeInternal.call(this);
    this.relatedTarget = this.currentTarget = this.target = this.event_ = null
};
goog.debug.errorHandlerWeakDep = {
    protectEntryPoint: function(a) {
        return a
    }
};
goog.events.EventWrapper = function() {};
goog.events.EventWrapper.prototype.listen = function() {};
goog.events.EventWrapper.prototype.unlisten = function() {};
goog.events.Listener = function() {};
goog.events.Listener.counter_ = 0;
goog.events.Listener.prototype.key = 0;
goog.events.Listener.prototype.removed = false;
goog.events.Listener.prototype.callOnce = false;
goog.events.Listener.prototype.init = function(a, b, c, d, e, f) {
    if (goog.isFunction(a))
        this.isFunctionListener_ = true;
    else if (a && a.handleEvent && goog.isFunction(a.handleEvent))
        this.isFunctionListener_ = false;
    else 
        throw Error("Invalid listener argument");
    this.listener = a;
    this.proxy = b;
    this.src = c;
    this.type = d;
    this.capture=!!e;
    this.handler = f;
    this.callOnce = false;
    this.key=++goog.events.Listener.counter_;
    this.removed = false
};
goog.events.Listener.prototype.handleEvent = function(a) {
    if (this.isFunctionListener_)
        return this.listener.call(this.handler || this.src, a);
    return this.listener.handleEvent.call(this.listener, a)
};
goog.structs = {};
goog.structs.SimplePool = function(a, b) {
    goog.Disposable.call(this);
    this.maxCount_ = b;
    this.freeQueue_ = [];
    this.createInitial_(a)
};
goog.inherits(goog.structs.SimplePool, goog.Disposable);
goog.structs.SimplePool.prototype.createObjectFn_ = null;
goog.structs.SimplePool.prototype.disposeObjectFn_ = null;
goog.structs.SimplePool.prototype.setCreateObjectFn = function(a) {
    this.createObjectFn_ = a
};
goog.structs.SimplePool.prototype.setDisposeObjectFn = function(a) {
    this.disposeObjectFn_ = a
};
goog.structs.SimplePool.prototype.getObject = function() {
    if (this.freeQueue_.length)
        return this.freeQueue_.pop();
    return this.createObject()
};
goog.structs.SimplePool.prototype.releaseObject = function(a) {
    this.freeQueue_.length < this.maxCount_ ? this.freeQueue_.push(a) : this.disposeObject(a)
};
goog.structs.SimplePool.prototype.createInitial_ = function(a) {
    if (a > this.maxCount_)
        throw Error("[goog.structs.SimplePool] Initial cannot be greater than max");
    for (var b = 0; b < a; b++)
        this.freeQueue_.push(this.createObject())
};
goog.structs.SimplePool.prototype.createObject = function() {
    return this.createObjectFn_ ? this.createObjectFn_() : {}
};
goog.structs.SimplePool.prototype.disposeObject = function(a) {
    if (this.disposeObjectFn_)
        this.disposeObjectFn_(a);
    else if (goog.isFunction(a.dispose))
        a.dispose();
    else 
        for (var b in a)
            delete a[b]
};
goog.structs.SimplePool.prototype.disposeInternal = function() {
    goog.structs.SimplePool.superClass_.disposeInternal.call(this);
    for (var a = this.freeQueue_; a.length;)
        this.disposeObject(a.pop());
    delete this.freeQueue_
};
goog.userAgent.jscript = {};
goog.userAgent.jscript.ASSUME_NO_JSCRIPT = false;
goog.userAgent.jscript.init_ = function() {
    goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ = "ScriptEngine"in goog.global && goog.global.ScriptEngine() == "JScript";
    goog.userAgent.jscript.DETECTED_VERSION_ = goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ ? goog.global.ScriptEngineMajorVersion() + "." + goog.global.ScriptEngineMinorVersion() + "." + goog.global.ScriptEngineBuildVersion() : "0"
};
goog.userAgent.jscript.ASSUME_NO_JSCRIPT || goog.userAgent.jscript.init_();
goog.userAgent.jscript.HAS_JSCRIPT = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? false : goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_;
goog.userAgent.jscript.VERSION = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? "0" : goog.userAgent.jscript.DETECTED_VERSION_;
goog.userAgent.jscript.isVersion = function(a) {
    return goog.string.compareVersions(goog.userAgent.jscript.VERSION, a) >= 0
};
goog.events.pools = {};
(function() {
    function a() {
        return {
            count_: 0,
            remaining_: 0
        }
    }
    function b() {
        return []
    }
    function c() {
        var j = function(n) {
            return g.call(j.src, j.key, n)
        };
        return j
    }
    function d() {
        return new goog.events.Listener
    }
    function e() {
        return new goog.events.BrowserEvent
    }
    var f = goog.userAgent.jscript.HAS_JSCRIPT&&!goog.userAgent.jscript.isVersion("5.7"), g;
    goog.events.pools.setProxyCallbackFunction = function(j) {
        g = j
    };
    if (f) {
        goog.events.pools.getObject = function() {
            return h.getObject()
        };
        goog.events.pools.releaseObject = function(j) {
            h.releaseObject(j)
        };
        goog.events.pools.getArray = function() {
            return i.getObject()
        };
        goog.events.pools.releaseArray = function(j) {
            i.releaseObject(j)
        };
        goog.events.pools.getProxy = function() {
            return k.getObject()
        };
        goog.events.pools.releaseProxy = function() {
            k.releaseObject(c())
        };
        goog.events.pools.getListener = function() {
            return l.getObject()
        };
        goog.events.pools.releaseListener = function(j) {
            l.releaseObject(j)
        };
        goog.events.pools.getEvent = function() {
            return m.getObject()
        };
        goog.events.pools.releaseEvent = function(j) {
            m.releaseObject(j)
        };
        var h =
        new goog.structs.SimplePool(0, 600);
        h.setCreateObjectFn(a);
        var i = new goog.structs.SimplePool(0, 600);
        i.setCreateObjectFn(b);
        var k = new goog.structs.SimplePool(0, 600);
        k.setCreateObjectFn(c);
        var l = new goog.structs.SimplePool(0, 600);
        l.setCreateObjectFn(d);
        var m = new goog.structs.SimplePool(0, 600);
        m.setCreateObjectFn(e)
    } else {
        goog.events.pools.getObject = a;
        goog.events.pools.releaseObject = goog.nullFunction;
        goog.events.pools.getArray = b;
        goog.events.pools.releaseArray = goog.nullFunction;
        goog.events.pools.getProxy =
        c;
        goog.events.pools.releaseProxy = goog.nullFunction;
        goog.events.pools.getListener = d;
        goog.events.pools.releaseListener = goog.nullFunction;
        goog.events.pools.getEvent = e;
        goog.events.pools.releaseEvent = goog.nullFunction
    }
})();
goog.events.listeners_ = {};
goog.events.listenerTree_ = {};
goog.events.sources_ = {};
goog.events.onString_ = "on";
goog.events.onStringMap_ = {};
goog.events.keySeparator_ = "_";
goog.events.listen = function(a, b, c, d, e) {
    if (b)
        if (goog.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                goog.events.listen(a, b[f], c, d, e);
                return null
        } else {
            d=!!d;
            var g = goog.events.listenerTree_;
            b in g || (g[b] = goog.events.pools.getObject());
            g = g[b];
            if (!(d in g)) {
                g[d] = goog.events.pools.getObject();
                g.count_++
            }
            g = g[d];
            var h = goog.getUid(a), i;
            g.remaining_++;
            if (g[h]) {
                i = g[h];
                for (f = 0; f < i.length; f++) {
                    g = i[f];
                    if (g.listener == c && g.handler == e) {
                        if (g.removed)
                            break;
                            return i[f].key
                    }
                }
            } else {
                i = g[h] = goog.events.pools.getArray();
                g.count_++
            }
            f =
            goog.events.pools.getProxy();
            f.src = a;
            g = goog.events.pools.getListener();
            g.init(c, f, a, b, d, e);
            c = g.key;
            f.key = c;
            i.push(g);
            goog.events.listeners_[c] = g;
            goog.events.sources_[h] || (goog.events.sources_[h] = goog.events.pools.getArray());
            goog.events.sources_[h].push(g);
            if (a.addEventListener) {
                if (a == goog.global ||!a.customEvent_)
                    a.addEventListener(b, f, d)
                } else 
                    a.attachEvent(goog.events.getOnString_(b), f);
                    return c
        } else 
            throw Error("Invalid event type");
    };
goog.events.listenOnce = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++)
            goog.events.listenOnce(a, b[f], c, d, e);
        return null
    }
    a = goog.events.listen(a, b, c, d, e);
    goog.events.listeners_[a].callOnce = true;
    return a
};
goog.events.listenWithWrapper = function(a, b, c, d, e) {
    b.listen(a, c, d, e)
};
goog.events.unlisten = function(a, b, c, d, e) {
    if (goog.isArray(b)) {
        for (var f = 0; f < b.length; f++)
            goog.events.unlisten(a, b[f], c, d, e);
        return null
    }
    d=!!d;
    a = goog.events.getListeners_(a, b, d);
    if (!a)
        return false;
    for (f = 0; f < a.length; f++)
        if (a[f].listener == c && a[f].capture == d && a[f].handler == e)
            return goog.events.unlistenByKey(a[f].key);
    return false
};
goog.events.unlistenByKey = function(a) {
    if (!goog.events.listeners_[a])
        return false;
    var b = goog.events.listeners_[a];
    if (b.removed)
        return false;
    var c = b.src, d = b.type, e = b.proxy, f = b.capture;
    if (c.removeEventListener) {
        if (c == goog.global ||!c.customEvent_)
            c.removeEventListener(d, e, f)
    } else 
        c.detachEvent && c.detachEvent(goog.events.getOnString_(d), e);
    c = goog.getUid(c);
    e = goog.events.listenerTree_[d][f][c];
    if (goog.events.sources_[c]) {
        var g = goog.events.sources_[c];
        goog.array.remove(g, b);
        g.length == 0 && delete goog.events.sources_[c]
    }
    b.removed =
    true;
    e.needsCleanup_ = true;
    goog.events.cleanUp_(d, f, c, e);
    delete goog.events.listeners_[a];
    return true
};
goog.events.unlistenWithWrapper = function(a, b, c, d, e) {
    b.unlisten(a, c, d, e)
};
goog.events.cleanUp_ = function(a, b, c, d) {
    if (!d.locked_)
        if (d.needsCleanup_) {
            for (var e = 0, f = 0; e < d.length; e++)
                if (d[e].removed) {
                    var g = d[e].proxy;
                    g.src = null;
                    goog.events.pools.releaseProxy(g);
                    goog.events.pools.releaseListener(d[e])
                } else {
                    if (e != f)
                        d[f] = d[e];
                        f++
                }
                d.length = f;
                d.needsCleanup_ = false;
                if (f == 0) {
                    goog.events.pools.releaseArray(d);
                    delete goog.events.listenerTree_[a][b][c];
                    goog.events.listenerTree_[a][b].count_--;
                    if (goog.events.listenerTree_[a][b].count_ == 0) {
                        goog.events.pools.releaseObject(goog.events.listenerTree_[a][b]);
                        delete goog.events.listenerTree_[a][b];
                        goog.events.listenerTree_[a].count_--
                    }
                    if (goog.events.listenerTree_[a].count_ == 0) {
                        goog.events.pools.releaseObject(goog.events.listenerTree_[a]);
                        delete goog.events.listenerTree_[a]
                    }
                }
        }
};
goog.events.removeAll = function(a, b, c) {
    var d = 0, e = b == null, f = c == null;
    c=!!c;
    if (a == null)
        goog.object.forEach(goog.events.sources_, function(i) {
            for (var k = i.length-1; k >= 0; k--) {
                var l = i[k];
                if ((e || b == l.type) && (f || c == l.capture)) {
                    goog.events.unlistenByKey(l.key);
                    d++
                }
            }
        });
    else {
        a = goog.getUid(a);
        if (goog.events.sources_[a]) {
            a = goog.events.sources_[a];
            for (var g = a.length-1; g >= 0; g--) {
                var h = a[g];
                if ((e || b == h.type) && (f || c == h.capture)) {
                    goog.events.unlistenByKey(h.key);
                    d++
                }
            }
        }
    }
    return d
};
goog.events.getListeners = function(a, b, c) {
    return goog.events.getListeners_(a, b, c) || []
};
goog.events.getListeners_ = function(a, b, c) {
    var d = goog.events.listenerTree_;
    if (b in d) {
        d = d[b];
        if (c in d) {
            d = d[c];
            a = goog.getUid(a);
            if (d[a])
                return d[a]
        }
    }
    return null
};
goog.events.getListener = function(a, b, c, d, e) {
    d=!!d;
    if (a = goog.events.getListeners_(a, b, d))
        for (b = 0; b < a.length; b++)
            if (a[b].listener == c && a[b].capture == d && a[b].handler == e)
                return a[b];
    return null
};
goog.events.hasListener = function(a, b, c) {
    a = goog.getUid(a);
    var d = goog.events.sources_[a];
    if (d) {
        var e = goog.isDef(b), f = goog.isDef(c);
        if (e && f) {
            d = goog.events.listenerTree_[b];
            return !!d&&!!d[c] && a in d[c]
        } else 
            return e || f ? goog.array.some(d, function(g) {
                return e && g.type == b || f && g.capture == c
            }) : true
    }
    return false
};
goog.events.expose = function(a) {
    var b = [];
    for (var c in a)
        a[c] && a[c].id ? b.push(c + " = " + a[c] + " (" + a[c].id + ")") : b.push(c + " = " + a[c]);
    return b.join("\n")
};
goog.events.EventType = {
    CLICK: "click",
    DBLCLICK: "dblclick",
    MOUSEDOWN: "mousedown",
    MOUSEUP: "mouseup",
    MOUSEOVER: "mouseover",
    MOUSEOUT: "mouseout",
    MOUSEMOVE: "mousemove",
    SELECTSTART: "selectstart",
    KEYPRESS: "keypress",
    KEYDOWN: "keydown",
    KEYUP: "keyup",
    BLUR: "blur",
    FOCUS: "focus",
    DEACTIVATE: "deactivate",
    FOCUSIN: goog.userAgent.IE ? "focusin": "DOMFocusIn",
    FOCUSOUT: goog.userAgent.IE ? "focusout": "DOMFocusOut",
    CHANGE: "change",
    SELECT: "select",
    SUBMIT: "submit",
    DRAGSTART: "dragstart",
    DRAGENTER: "dragenter",
    DRAGOVER: "dragover",
    DRAGLEAVE: "dragleave",
    DROP: "drop",
    CONTEXTMENU: "contextmenu",
    ERROR: "error",
    HASHCHANGE: "hashchange",
    HELP: "help",
    LOAD: "load",
    LOSECAPTURE: "losecapture",
    READYSTATECHANGE: "readystatechange",
    RESIZE: "resize",
    SCROLL: "scroll",
    UNLOAD: "unload"
};
goog.events.getOnString_ = function(a) {
    if (a in goog.events.onStringMap_)
        return goog.events.onStringMap_[a];
    return goog.events.onStringMap_[a] = goog.events.onString_ + a
};
goog.events.fireListeners = function(a, b, c, d) {
    var e = goog.events.listenerTree_;
    if (b in e) {
        e = e[b];
        if (c in e)
            return goog.events.fireListeners_(e[c], a, b, c, d)
    }
    return true
};
goog.events.fireListeners_ = function(a, b, c, d, e) {
    var f = 1;
    b = goog.getUid(b);
    if (a[b]) {
        a.remaining_--;
        a = a[b];
        if (a.locked_)
            a.locked_++;
        else 
            a.locked_ = 1;
        try {
            for (var g = a.length, h = 0; h < g; h++) {
                var i = a[h];
                if (i&&!i.removed)
                    f&=goog.events.fireListener(i, e) !== false
            }
        } finally {
            a.locked_--;
            goog.events.cleanUp_(c, d, b, a)
        }
    }
    return Boolean(f)
};
goog.events.fireListener = function(a, b) {
    var c = a.handleEvent(b);
    a.callOnce && goog.events.unlistenByKey(a.key);
    return c
};
goog.events.getTotalListenerCount = function() {
    return goog.object.getCount(goog.events.listeners_)
};
goog.events.dispatchEvent = function(a, b) {
    if (goog.isString(b))
        b = new goog.events.Event(b, a);
    else if (b instanceof goog.events.Event)
        b.target = b.target || a;
    else {
        var c = b;
        b = new goog.events.Event(b.type, a);
        goog.object.extend(b, c)
    }
    c = 1;
    var d, e = b.type, f = goog.events.listenerTree_;
    if (!(e in f))
        return true;
    f = f[e];
    e = true in f;
    var g;
    if (e) {
        d = [];
        for (g = a; g; g = g.getParentEventTarget()
            )d.push(g);
        g = f[true];
        g.remaining_ = g.count_;
        for (var h = d.length-1; !b.propagationStopped_ && h >= 0 && g.remaining_; h--) {
            b.currentTarget = d[h];
            c&=goog.events.fireListeners_(g,
            d[h], b.type, true, b) && b.returnValue_ != false
        }
    }
    if (false in f) {
        g = f[false];
        g.remaining_ = g.count_;
        if (e)
            for (h = 0; !b.propagationStopped_ && h < d.length && g.remaining_; h++) {
                b.currentTarget = d[h];
                c&=goog.events.fireListeners_(g, d[h], b.type, false, b) && b.returnValue_ != false
            } else 
                for (d = a; !b.propagationStopped_ && d && g.remaining_; d = d.getParentEventTarget()
                    ) {
            b.currentTarget = d;
            c&=goog.events.fireListeners_(g, d, b.type, false, b) && b.returnValue_ != false
        }
    }
    return Boolean(c)
};
goog.events.protectBrowserEventEntryPoint = function(a, b) {
    goog.events.handleBrowserEvent_ = a.protectEntryPoint(goog.events.handleBrowserEvent_, b);
    goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_)
};
goog.events.handleBrowserEvent_ = function(a, b) {
    if (!goog.events.listeners_[a])
        return true;
    var c = goog.events.listeners_[a], d = c.type, e = goog.events.listenerTree_;
    if (!(d in e))
        return true;
    e = e[d];
    var f, g;
    if (goog.events.synthesizeEventPropagation_()) {
        f = b || goog.getObjectByName("window.event");
        var h = true in e, i = false in e;
        if (h) {
            if (goog.events.isMarkedIeEvent_(f))
                return true;
            goog.events.markIeEvent_(f)
        }
        var k = goog.events.pools.getEvent();
        k.init(f, this);
        f = true;
        try {
            if (h) {
                for (var l = goog.events.pools.getArray(),
                m = k.currentTarget; m; m = m.parentNode)
                    l.push(m);
                g = e[true];
                g.remaining_ = g.count_;
                for (var j = l.length-1; !k.propagationStopped_ && j >= 0 && g.remaining_; j--) {
                    k.currentTarget = l[j];
                    f&=goog.events.fireListeners_(g, l[j], d, true, k)
                }
                if (i) {
                    g = e[false];
                    g.remaining_ = g.count_;
                    for (j = 0; !k.propagationStopped_ && j < l.length && g.remaining_; j++) {
                        k.currentTarget = l[j];
                        f&=goog.events.fireListeners_(g, l[j], d, false, k)
                    }
                }
            } else 
                f = goog.events.fireListener(c, k)
            } finally {
            if (l) {
                l.length = 0;
                goog.events.pools.releaseArray(l)
            }
            k.dispose();
            goog.events.pools.releaseEvent(k)
        }
        return f
    }
    d =
    new goog.events.BrowserEvent(b, this);
    try {
        f = goog.events.fireListener(c, d)
    } finally {
        d.dispose()
    }
    return f
};
goog.events.pools.setProxyCallbackFunction(goog.events.handleBrowserEvent_);
goog.events.markIeEvent_ = function(a) {
    var b = false;
    if (a.keyCode == 0)
        try {
            a.keyCode =- 1;
            return 
    } catch (c) {
        b = true
    }
    if (b || a.returnValue == undefined)
        a.returnValue = true
};
goog.events.isMarkedIeEvent_ = function(a) {
    return a.keyCode < 0 || a.returnValue != undefined
};
goog.events.uniqueIdCounter_ = 0;
goog.events.getUniqueId = function(a) {
    return a + "_" + goog.events.uniqueIdCounter_++
};
goog.events.synthesizeEventPropagation_ = function() {
    if (goog.events.requiresSyntheticEventPropagation_ === undefined)
        goog.events.requiresSyntheticEventPropagation_ = goog.userAgent.IE&&!goog.global.addEventListener;
    return goog.events.requiresSyntheticEventPropagation_
};
goog.events.KeyCodes = {
    MAC_ENTER: 3,
    BACKSPACE: 8,
    TAB: 9,
    NUM_CENTER: 12,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    PRINT_SCREEN: 44,
    INSERT: 45,
    DELETE: 46,
    ZERO: 48,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    SIX: 54,
    SEVEN: 55,
    EIGHT: 56,
    NINE: 57,
    QUESTION_MARK: 63,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    META: 91,
    CONTEXT_MENU: 93,
    NUM_ZERO: 96,
    NUM_ONE: 97,
    NUM_TWO: 98,
    NUM_THREE: 99,
    NUM_FOUR: 100,
    NUM_FIVE: 101,
    NUM_SIX: 102,
    NUM_SEVEN: 103,
    NUM_EIGHT: 104,
    NUM_NINE: 105,
    NUM_MULTIPLY: 106,
    NUM_PLUS: 107,
    NUM_MINUS: 109,
    NUM_PERIOD: 110,
    NUM_DIVISION: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUMLOCK: 144,
    SEMICOLON: 186,
    DASH: 189,
    EQUALS: 187,
    COMMA: 188,
    PERIOD: 190,
    SLASH: 191,
    APOSTROPHE: 192,
    SINGLE_QUOTE: 222,
    OPEN_SQUARE_BRACKET: 219,
    BACKSLASH: 220,
    CLOSE_SQUARE_BRACKET: 221,
    WIN_KEY: 224,
    MAC_FF_META: 224,
    WIN_IME: 229
};
goog.events.KeyCodes.isTextModifyingKeyEvent = function(a) {
    if (a.altKey&&!a.ctrlKey || a.metaKey || a.keyCode >= goog.events.KeyCodes.F1 && a.keyCode <= goog.events.KeyCodes.F12)
        return false;
    switch (a.keyCode) {
    case goog.events.KeyCodes.ALT:
    case goog.events.KeyCodes.SHIFT:
    case goog.events.KeyCodes.CTRL:
    case goog.events.KeyCodes.PAUSE:
    case goog.events.KeyCodes.CAPS_LOCK:
    case goog.events.KeyCodes.ESC:
    case goog.events.KeyCodes.PAGE_UP:
    case goog.events.KeyCodes.PAGE_DOWN:
    case goog.events.KeyCodes.HOME:
    case goog.events.KeyCodes.END:
    case goog.events.KeyCodes.LEFT:
    case goog.events.KeyCodes.RIGHT:
    case goog.events.KeyCodes.UP:
    case goog.events.KeyCodes.DOWN:
    case goog.events.KeyCodes.INSERT:
    case goog.events.KeyCodes.NUMLOCK:
    case goog.events.KeyCodes.CONTEXT_MENU:
    case goog.events.KeyCodes.PRINT_SCREEN:
        return false;
    default:
        return true
    }
};
goog.events.KeyCodes.firesKeyPressEvent = function(a, b, c, d, e) {
    if (!goog.userAgent.IE&&!(goog.userAgent.WEBKIT && goog.userAgent.isVersion("525")))
        return true;
    if (goog.userAgent.MAC && e)
        return goog.events.KeyCodes.isCharacterKey(a);
    if (e&&!d)
        return false;
    if (goog.userAgent.IE&&!c && (b == goog.events.KeyCodes.CTRL || b == goog.events.KeyCodes.ALT))
        return false;
    if (goog.userAgent.IE && d && b == a)
        return false;
    switch (a) {
    case goog.events.KeyCodes.ENTER:
        return true;
    case goog.events.KeyCodes.ESC:
        return !goog.userAgent.WEBKIT
    }
    return goog.events.KeyCodes.isCharacterKey(a)
};
goog.events.KeyCodes.isCharacterKey = function(a) {
    if (a >= goog.events.KeyCodes.ZERO && a <= goog.events.KeyCodes.NINE)
        return true;
    if (a >= goog.events.KeyCodes.NUM_ZERO && a <= goog.events.KeyCodes.NUM_MULTIPLY)
        return true;
    if (a >= goog.events.KeyCodes.A && a <= goog.events.KeyCodes.Z)
        return true;
    switch (a) {
    case goog.events.KeyCodes.SPACE:
    case goog.events.KeyCodes.QUESTION_MARK:
    case goog.events.KeyCodes.NUM_PLUS:
    case goog.events.KeyCodes.NUM_MINUS:
    case goog.events.KeyCodes.NUM_PERIOD:
    case goog.events.KeyCodes.NUM_DIVISION:
    case goog.events.KeyCodes.SEMICOLON:
    case goog.events.KeyCodes.DASH:
    case goog.events.KeyCodes.EQUALS:
    case goog.events.KeyCodes.COMMA:
    case goog.events.KeyCodes.PERIOD:
    case goog.events.KeyCodes.SLASH:
    case goog.events.KeyCodes.APOSTROPHE:
    case goog.events.KeyCodes.SINGLE_QUOTE:
    case goog.events.KeyCodes.OPEN_SQUARE_BRACKET:
    case goog.events.KeyCodes.BACKSLASH:
    case goog.events.KeyCodes.CLOSE_SQUARE_BRACKET:
        return true;
    default:
        return false
    }
};
goog.events.EventTarget = function() {
    goog.Disposable.call(this)
};
goog.inherits(goog.events.EventTarget, goog.Disposable);
goog.events.EventTarget.prototype.customEvent_ = true;
goog.events.EventTarget.prototype.parentEventTarget_ = null;
goog.events.EventTarget.prototype.getParentEventTarget = function() {
    return this.parentEventTarget_
};
goog.events.EventTarget.prototype.setParentEventTarget = function(a) {
    this.parentEventTarget_ = a
};
goog.events.EventTarget.prototype.addEventListener = function(a, b, c, d) {
    goog.events.listen(this, a, b, c, d)
};
goog.events.EventTarget.prototype.removeEventListener = function(a, b, c, d) {
    goog.events.unlisten(this, a, b, c, d)
};
goog.events.EventTarget.prototype.dispatchEvent = function(a) {
    return goog.events.dispatchEvent(this, a)
};
goog.events.EventTarget.prototype.disposeInternal = function() {
    goog.events.EventTarget.superClass_.disposeInternal.call(this);
    goog.events.removeAll(this);
    this.parentEventTarget_ = null
};
goog.events.KeyHandler = function(a) {
    goog.events.EventTarget.call(this);
    a && this.attach(a)
};
goog.inherits(goog.events.KeyHandler, goog.events.EventTarget);
goog.events.KeyHandler.prototype.element_ = null;
goog.events.KeyHandler.prototype.keyPressKey_ = null;
goog.events.KeyHandler.prototype.keyDownKey_ = null;
goog.events.KeyHandler.prototype.keyUpKey_ = null;
goog.events.KeyHandler.prototype.lastKey_ =- 1;
goog.events.KeyHandler.prototype.keyCode_ =- 1;
goog.events.KeyHandler.EventType = {
    KEY: "key"
};
goog.events.KeyHandler.safariKey_ = {
    "3": goog.events.KeyCodes.ENTER,
    "12": goog.events.KeyCodes.NUMLOCK,
    "63232": goog.events.KeyCodes.UP,
    "63233": goog.events.KeyCodes.DOWN,
    "63234": goog.events.KeyCodes.LEFT,
    "63235": goog.events.KeyCodes.RIGHT,
    "63236": goog.events.KeyCodes.F1,
    "63237": goog.events.KeyCodes.F2,
    "63238": goog.events.KeyCodes.F3,
    "63239": goog.events.KeyCodes.F4,
    "63240": goog.events.KeyCodes.F5,
    "63241": goog.events.KeyCodes.F6,
    "63242": goog.events.KeyCodes.F7,
    "63243": goog.events.KeyCodes.F8,
    "63244": goog.events.KeyCodes.F9,
    "63245": goog.events.KeyCodes.F10,
    "63246": goog.events.KeyCodes.F11,
    "63247": goog.events.KeyCodes.F12,
    "63248": goog.events.KeyCodes.PRINT_SCREEN,
    "63272": goog.events.KeyCodes.DELETE,
    "63273": goog.events.KeyCodes.HOME,
    "63275": goog.events.KeyCodes.END,
    "63276": goog.events.KeyCodes.PAGE_UP,
    "63277": goog.events.KeyCodes.PAGE_DOWN,
    "63289": goog.events.KeyCodes.NUMLOCK,
    "63302": goog.events.KeyCodes.INSERT
};
goog.events.KeyHandler.keyIdentifier_ = {
    Up: goog.events.KeyCodes.UP,
    Down: goog.events.KeyCodes.DOWN,
    Left: goog.events.KeyCodes.LEFT,
    Right: goog.events.KeyCodes.RIGHT,
    Enter: goog.events.KeyCodes.ENTER,
    F1: goog.events.KeyCodes.F1,
    F2: goog.events.KeyCodes.F2,
    F3: goog.events.KeyCodes.F3,
    F4: goog.events.KeyCodes.F4,
    F5: goog.events.KeyCodes.F5,
    F6: goog.events.KeyCodes.F6,
    F7: goog.events.KeyCodes.F7,
    F8: goog.events.KeyCodes.F8,
    F9: goog.events.KeyCodes.F9,
    F10: goog.events.KeyCodes.F10,
    F11: goog.events.KeyCodes.F11,
    F12: goog.events.KeyCodes.F12,
    "U+007F": goog.events.KeyCodes.DELETE,
    Home: goog.events.KeyCodes.HOME,
    End: goog.events.KeyCodes.END,
    PageUp: goog.events.KeyCodes.PAGE_UP,
    PageDown: goog.events.KeyCodes.PAGE_DOWN,
    Insert: goog.events.KeyCodes.INSERT
};
goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_ = {
    61: 187,
    59: 186
};
goog.events.KeyHandler.USES_KEYDOWN_ = goog.userAgent.IE || goog.userAgent.WEBKIT && goog.userAgent.isVersion("525");
goog.events.KeyHandler.prototype.handleKeyDown_ = function(a) {
    if (goog.events.KeyHandler.USES_KEYDOWN_&&!goog.events.KeyCodes.firesKeyPressEvent(a.keyCode, this.lastKey_, a.shiftKey, a.ctrlKey, a.altKey))
        this.handleEvent(a);
    else 
        this.keyCode_ = goog.userAgent.GECKO && a.keyCode in goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_ ? goog.events.KeyHandler.mozKeyCodeToKeyCodeMap_[a.keyCode] : a.keyCode
};
goog.events.KeyHandler.prototype.handleKeyup_ = function() {
    this.keyCode_ = this.lastKey_ =- 1
};
goog.events.KeyHandler.prototype.handleEvent = function(a) {
    var b = a.getBrowserEvent(), c, d;
    if (goog.userAgent.IE && a.type == goog.events.EventType.KEYPRESS) {
        c = this.keyCode_;
        d = c != goog.events.KeyCodes.ENTER && c != goog.events.KeyCodes.ESC ? b.keyCode : 0
    } else if (goog.userAgent.WEBKIT && a.type == goog.events.EventType.KEYPRESS) {
        c = this.keyCode_;
        d = b.charCode >= 0 && b.charCode < 63232 && goog.events.KeyCodes.isCharacterKey(c) ? b.charCode : 0
    } else if (goog.userAgent.OPERA) {
        c = this.keyCode_;
        d = goog.events.KeyCodes.isCharacterKey(c) ? b.keyCode :
        0
    } else {
        c = b.keyCode || this.keyCode_;
        d = b.charCode || 0;
        if (goog.userAgent.MAC && d == goog.events.KeyCodes.QUESTION_MARK&&!c)
            c = goog.events.KeyCodes.SLASH
    }
    var e = c, f = b.keyIdentifier;
    if (c)
        if (c >= 63232 && c in goog.events.KeyHandler.safariKey_)
            e = goog.events.KeyHandler.safariKey_[c];
        else {
            if (c == 25 && a.shiftKey)
                e = 9
        } else if (f && f in goog.events.KeyHandler.keyIdentifier_)
            e = goog.events.KeyHandler.keyIdentifier_[f];
    a = e == this.lastKey_;
    this.lastKey_ = e;
    b = new goog.events.KeyEvent(e, d, a, b);
    try {
        this.dispatchEvent(b)
    } finally {
        b.dispose()
    }
};
goog.events.KeyHandler.prototype.getElement = function() {
    return this.element_
};
goog.events.KeyHandler.prototype.attach = function(a) {
    this.keyUpKey_ && this.detach();
    this.element_ = a;
    this.keyPressKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYPRESS, this);
    this.keyDownKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYDOWN, this.handleKeyDown_, false, this);
    this.keyUpKey_ = goog.events.listen(this.element_, goog.events.EventType.KEYUP, this.handleKeyup_, false, this)
};
goog.events.KeyHandler.prototype.detach = function() {
    if (this.keyPressKey_) {
        goog.events.unlistenByKey(this.keyPressKey_);
        goog.events.unlistenByKey(this.keyDownKey_);
        goog.events.unlistenByKey(this.keyUpKey_);
        this.keyUpKey_ = this.keyDownKey_ = this.keyPressKey_ = null
    }
    this.element_ = null;
    this.keyCode_ = this.lastKey_ =- 1
};
goog.events.KeyHandler.prototype.disposeInternal = function() {
    goog.events.KeyHandler.superClass_.disposeInternal.call(this);
    this.detach()
};
goog.events.KeyEvent = function(a, b, c, d) {
    goog.events.BrowserEvent.call(this, d);
    this.type = goog.events.KeyHandler.EventType.KEY;
    this.keyCode = a;
    this.charCode = b;
    this.repeat = c
};
goog.inherits(goog.events.KeyEvent, goog.events.BrowserEvent);
goog.events.EventHandler = function(a) {
    this.handler_ = a
};
goog.inherits(goog.events.EventHandler, goog.Disposable);
goog.events.EventHandler.KEY_POOL_INITIAL_COUNT = 0;
goog.events.EventHandler.KEY_POOL_MAX_COUNT = 100;
goog.events.EventHandler.keyPool_ = new goog.structs.SimplePool(goog.events.EventHandler.KEY_POOL_INITIAL_COUNT, goog.events.EventHandler.KEY_POOL_MAX_COUNT);
goog.events.EventHandler.keys_ = null;
goog.events.EventHandler.key_ = null;
goog.events.EventHandler.prototype.listen = function(a, b, c, d, e) {
    if (goog.isArray(b))
        for (var f = 0; f < b.length; f++)
            this.listen(a, b[f], c, d, e);
    else 
        this.recordListenerKey_(goog.events.listen(a, b, c || this, d || false, e || this.handler_ || this));
    return this
};
goog.events.EventHandler.prototype.listenOnce = function(a, b, c, d, e) {
    if (goog.isArray(b))
        for (var f = 0; f < b.length; f++)
            this.listenOnce(a, b[f], c, d, e);
    else 
        this.recordListenerKey_(goog.events.listenOnce(a, b, c || this, d || false, e || this.handler_ || this));
    return this
};
goog.events.EventHandler.prototype.listenWithWrapper = function(a, b, c, d, e) {
    b.listen(a, c, d, e || this.handler_, this);
    return this
};
goog.events.EventHandler.prototype.recordListenerKey_ = function(a) {
    if (this.keys_)
        this.keys_[a] = true;
    else if (this.key_) {
        this.keys_ = goog.events.EventHandler.keyPool_.getObject();
        this.keys_[this.key_] = true;
        this.key_ = null;
        this.keys_[a] = true
    } else 
        this.key_ = a
};
goog.events.EventHandler.prototype.unlisten = function(a, b, c, d, e) {
    if (this.key_ || this.keys_)
        if (goog.isArray(b))
            for (var f = 0; f < b.length; f++)
                this.unlisten(a, b[f], c, d, e);
        else if (a = goog.events.getListener(a, b, c || this, d || false, e || this.handler_ || this)) {
            a = a.key;
            goog.events.unlistenByKey(a);
            if (this.keys_)
                goog.object.remove(this.keys_, a);
            else if (this.key_ == a)
                this.key_ = null
        }
    return this
};
goog.events.EventHandler.prototype.unlistenWithWrapper = function(a, b, c, d, e) {
    b.unlisten(a, c, d, e || this.handler_, this);
    return this
};
goog.events.EventHandler.prototype.removeAll = function() {
    if (this.keys_) {
        for (var a in this.keys_) {
            goog.events.unlistenByKey(a);
            delete this.keys_[a]
        }
        goog.events.EventHandler.keyPool_.releaseObject(this.keys_);
        this.keys_ = null
    } else 
        this.key_ && goog.events.unlistenByKey(this.key_)
};
goog.events.EventHandler.prototype.disposeInternal = function() {
    goog.events.EventHandler.superClass_.disposeInternal.call(this);
    this.removeAll()
};
goog.events.EventHandler.prototype.handleEvent = function() {
    throw Error("EventHandler.handleEvent not implemented");
};
goog.math.Box = function(a, b, c, d) {
    this.top = a;
    this.right = b;
    this.bottom = c;
    this.left = d
};
goog.math.Box.boundingBox = function() {
    for (var a = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), b = 1; b < arguments.length; b++) {
        var c = arguments[b];
        a.top = Math.min(a.top, c.y);
        a.right = Math.max(a.right, c.x);
        a.bottom = Math.max(a.bottom, c.y);
        a.left = Math.min(a.left, c.x)
    }
    return a
};
goog.math.Box.prototype.clone = function() {
    return new goog.math.Box(this.top, this.right, this.bottom, this.left)
};
if (goog.DEBUG)
    goog.math.Box.prototype.toString = function() {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
    };
goog.math.Box.prototype.contains = function(a) {
    return goog.math.Box.contains(this, a)
};
goog.math.Box.prototype.expand = function(a, b, c, d) {
    if (goog.isObject(a)) {
        this.top -= a.top;
        this.right += a.right;
        this.bottom += a.bottom;
        this.left -= a.left
    } else {
        this.top -= a;
        this.right += b;
        this.bottom += c;
        this.left -= d
    }
    return this
};
goog.math.Box.prototype.expandToInclude = function(a) {
    this.left = Math.min(this.left, a.left);
    this.top = Math.min(this.top, a.top);
    this.right = Math.max(this.right, a.right);
    this.bottom = Math.max(this.bottom, a.bottom)
};
goog.math.Box.equals = function(a, b) {
    if (a == b)
        return true;
    if (!a ||!b)
        return false;
    return a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left
};
goog.math.Box.contains = function(a, b) {
    if (!a ||!b)
        return false;
    if (b instanceof goog.math.Box)
        return b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom;
    return b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom
};
goog.math.Box.distance = function(a, b) {
    if (b.x >= a.left && b.x <= a.right) {
        if (b.y >= a.top && b.y <= a.bottom)
            return 0;
        return b.y < a.top ? a.top - b.y : b.y - a.bottom
    }
    if (b.y >= a.top && b.y <= a.bottom)
        return b.x < a.left ? a.left - b.x : b.x - a.right;
    return goog.math.Coordinate.distance(b, new goog.math.Coordinate(b.x < a.left ? a.left : a.right, b.y < a.top ? a.top : a.bottom))
};
goog.math.Box.intersects = function(a, b) {
    return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom
};
goog.math.Rect = function(a, b, c, d) {
    this.left = a;
    this.top = b;
    this.width = c;
    this.height = d
};
goog.math.Rect.prototype.clone = function() {
    return new goog.math.Rect(this.left, this.top, this.width, this.height)
};
goog.math.Rect.prototype.toBox = function() {
    return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left)
};
goog.math.Rect.createFromBox = function(a) {
    return new goog.math.Rect(a.left, a.top, a.right - a.left, a.bottom - a.top)
};
if (goog.DEBUG)
    goog.math.Rect.prototype.toString = function() {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
    };
goog.math.Rect.equals = function(a, b) {
    if (a == b)
        return true;
    if (!a ||!b)
        return false;
    return a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height
};
goog.math.Rect.prototype.intersection = function(a) {
    var b = Math.max(this.left, a.left), c = Math.min(this.left + this.width, a.left + a.width);
    if (b <= c) {
        var d = Math.max(this.top, a.top);
        a = Math.min(this.top + this.height, a.top + a.height);
        if (d <= a) {
            this.left = b;
            this.top = d;
            this.width = c - b;
            this.height = a - d;
            return true
        }
    }
    return false
};
goog.math.Rect.intersection = function(a, b) {
    var c = Math.max(a.left, b.left), d = Math.min(a.left + a.width, b.left + b.width);
    if (c <= d) {
        var e = Math.max(a.top, b.top), f = Math.min(a.top + a.height, b.top + b.height);
        if (e <= f)
            return new goog.math.Rect(c, e, d - c, f - e)
    }
    return null
};
goog.math.Rect.intersects = function(a, b) {
    return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height
};
goog.math.Rect.prototype.intersects = function(a) {
    return goog.math.Rect.intersects(this, a)
};
goog.math.Rect.difference = function(a, b) {
    var c = goog.math.Rect.intersection(a, b);
    if (!c ||!c.height ||!c.width)
        return [a.clone()];
    c = [];
    var d = a.top, e = a.height, f = a.left + a.width, g = a.top + a.height, h = b.left + b.width, i = b.top + b.height;
    if (b.top > a.top) {
        c.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top));
        d = b.top;
        e -= b.top - a.top
    }
    if (i < g) {
        c.push(new goog.math.Rect(a.left, i, a.width, g - i));
        e = i - d
    }
    b.left > a.left && c.push(new goog.math.Rect(a.left, d, b.left - a.left, e));
    h < f && c.push(new goog.math.Rect(h, d, f - h, e));
    return c
};
goog.math.Rect.prototype.difference = function(a) {
    return goog.math.Rect.difference(this, a)
};
goog.math.Rect.prototype.boundingRect = function(a) {
    var b = Math.max(this.left + this.width, a.left + a.width), c = Math.max(this.top + this.height, a.top + a.height);
    this.left = Math.min(this.left, a.left);
    this.top = Math.min(this.top, a.top);
    this.width = b - this.left;
    this.height = c - this.top
};
goog.math.Rect.boundingRect = function(a, b) {
    if (!a ||!b)
        return null;
    var c = a.clone();
    c.boundingRect(b);
    return c
};
goog.math.Rect.prototype.contains = function(a) {
    return a instanceof goog.math.Rect ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
};
goog.math.Rect.prototype.getSize = function() {
    return new goog.math.Size(this.width, this.height)
};
goog.style = {};
goog.style.setStyle = function(a, b, c) {
    goog.isString(b) ? goog.style.setStyle_(a, c, b) : goog.object.forEach(b, goog.partial(goog.style.setStyle_, a))
};
goog.style.setStyle_ = function(a, b, c) {
    a.style[goog.style.toCamelCase(c)] = b
};
goog.style.getStyle = function(a, b) {
    return a.style[goog.style.toCamelCase(b)]
};
goog.style.getComputedStyle = function(a, b) {
    var c = goog.dom.getOwnerDocument(a);
    if (c.defaultView && c.defaultView.getComputedStyle)
        if (c = c.defaultView.getComputedStyle(a, ""))
            return c[b];
    return null
};
goog.style.getCascadedStyle = function(a, b) {
    return a.currentStyle ? a.currentStyle[b] : null
};
goog.style.getStyle_ = function(a, b) {
    return goog.style.getComputedStyle(a, b) || goog.style.getCascadedStyle(a, b) || a.style[b]
};
goog.style.getComputedPosition = function(a) {
    return goog.style.getStyle_(a, "position")
};
goog.style.getBackgroundColor = function(a) {
    return goog.style.getStyle_(a, "backgroundColor")
};
goog.style.getComputedOverflowX = function(a) {
    return goog.style.getStyle_(a, "overflowX")
};
goog.style.getComputedOverflowY = function(a) {
    return goog.style.getStyle_(a, "overflowY")
};
goog.style.getComputedZIndex = function(a) {
    return goog.style.getStyle_(a, "zIndex")
};
goog.style.getComputedTextAlign = function(a) {
    return goog.style.getStyle_(a, "textAlign")
};
goog.style.getComputedCursor = function(a) {
    return goog.style.getStyle_(a, "cursor")
};
goog.style.setPosition = function(a, b, c) {
    var d, e = goog.userAgent.GECKO && (goog.userAgent.MAC || goog.userAgent.X11) && goog.userAgent.isVersion("1.9");
    if (b instanceof goog.math.Coordinate) {
        d = b.x;
        b = b.y
    } else {
        d = b;
        b = c
    }
    goog.style.setPixelStyleProperty_("left", e, a, d);
    goog.style.setPixelStyleProperty_("top", e, a, b)
};
goog.style.getPosition = function(a) {
    return new goog.math.Coordinate(a.offsetLeft, a.offsetTop)
};
goog.style.getClientViewportElement = function(a) {
    a = a ? a.nodeType == goog.dom.NodeType.DOCUMENT ? a : goog.dom.getOwnerDocument(a) : goog.dom.getDocument();
    if (goog.userAgent.IE&&!goog.dom.getDomHelper(a).isCss1CompatMode())
        return a.body;
    return a.documentElement
};
goog.style.getBoundingClientRect_ = function(a) {
    var b = a.getBoundingClientRect();
    if (goog.userAgent.IE) {
        a = a.ownerDocument;
        b.left -= a.documentElement.clientLeft + a.body.clientLeft;
        b.top -= a.documentElement.clientTop + a.body.clientTop
    }
    return b
};
goog.style.getOffsetParent = function(a) {
    if (goog.userAgent.IE)
        return a.offsetParent;
    var b = goog.dom.getOwnerDocument(a), c = goog.style.getStyle_(a, "position"), d = c == "fixed" || c == "absolute";
    for (a = a.parentNode; a && a != b; a = a.parentNode) {
        c = goog.style.getStyle_(a, "position");
        d = d && c == "static" && a != b.documentElement && a != b.body;
        if (!d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || c == "fixed" || c == "absolute"))
            return a
    }
    return null
};
goog.style.getVisibleRectForElement = function(a) {
    var b = new goog.math.Box(0, Infinity, Infinity, 0), c = goog.dom.getDomHelper(a), d = c.getDocument().body, e = c.getDocumentScrollElement(), f;
    for (a = a; a = goog.style.getOffsetParent(a);)
        if ((!goog.userAgent.IE || a.clientWidth != 0) && (!goog.userAgent.WEBKIT || a.clientHeight != 0 || a != d) && (a.scrollWidth != a.clientWidth || a.scrollHeight != a.clientHeight) && goog.style.getStyle_(a, "overflow") != "visible") {
            var g = goog.style.getPageOffset(a), h = goog.style.getClientLeftTop(a);
            g.x += h.x;
            g.y +=
            h.y;
            b.top = Math.max(b.top, g.y);
            b.right = Math.min(b.right, g.x + a.clientWidth);
            b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
            b.left = Math.max(b.left, g.x);
            f = f || a != e
        }
    d = e.scrollLeft;
    e = e.scrollTop;
    if (goog.userAgent.WEBKIT) {
        b.left += d;
        b.top += e
    } else {
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, e)
    }
    if (!f || goog.userAgent.WEBKIT) {
        b.right += d;
        b.bottom += e
    }
    c = c.getViewportSize();
    b.right = Math.min(b.right, d + c.width);
    b.bottom = Math.min(b.bottom, e + c.height);
    return b.top >= 0 && b.left >= 0 && b.bottom > b.top && b.right > b.left ? b : null
};
goog.style.scrollIntoContainerView = function(a, b, c) {
    var d = goog.style.getPageOffset(a), e = goog.style.getPageOffset(b), f = goog.style.getBorderBox(b), g = d.x - e.x - f.left;
    d = d.y - e.y - f.top;
    e = b.clientWidth - a.offsetWidth;
    a = b.clientHeight - a.offsetHeight;
    if (c) {
        b.scrollLeft += g - e / 2;
        b.scrollTop += d - a / 2
    } else {
        b.scrollLeft += Math.min(g, Math.max(g - e, 0));
        b.scrollTop += Math.min(d, Math.max(d - a, 0))
    }
};
goog.style.getClientLeftTop = function(a) {
    if (goog.userAgent.GECKO&&!goog.userAgent.isVersion("1.9")) {
        var b = parseFloat(goog.style.getComputedStyle(a, "borderLeftWidth"));
        if (goog.style.isRightToLeft(a)) {
            var c = a.offsetWidth - a.clientWidth - b - parseFloat(goog.style.getComputedStyle(a, "borderRightWidth"));
            b += c
        }
        return new goog.math.Coordinate(b, parseFloat(goog.style.getComputedStyle(a, "borderTopWidth")))
    }
    return new goog.math.Coordinate(a.clientLeft, a.clientTop)
};
goog.style.getPageOffset = function(a) {
    var b, c = goog.dom.getOwnerDocument(a), d = goog.style.getStyle_(a, "position"), e = goog.userAgent.GECKO && c.getBoxObjectFor&&!a.getBoundingClientRect && d == "absolute" && (b = c.getBoxObjectFor(a)) && (b.screenX < 0 || b.screenY < 0), f = new goog.math.Coordinate(0, 0), g = goog.style.getClientViewportElement(c);
    if (a == g)
        return f;
    if (a.getBoundingClientRect) {
        b = goog.style.getBoundingClientRect_(a);
        a = goog.dom.getDomHelper(c).getDocumentScroll();
        f.x = b.left + a.x;
        f.y = b.top + a.y
    } else if (c.getBoxObjectFor &&
    !e) {
        b = c.getBoxObjectFor(a);
        a = c.getBoxObjectFor(g);
        f.x = b.screenX - a.screenX;
        f.y = b.screenY - a.screenY
    } else {
        b = a;
        do {
            f.x += b.offsetLeft;
            f.y += b.offsetTop;
            if (b != a) {
                f.x += b.clientLeft || 0;
                f.y += b.clientTop || 0
            }
            if (goog.userAgent.WEBKIT && goog.style.getComputedPosition(b) == "fixed") {
                f.x += c.body.scrollLeft;
                f.y += c.body.scrollTop;
                break
            }
            b = b.offsetParent
        }
        while (b && b != a);
        if (goog.userAgent.OPERA || goog.userAgent.WEBKIT && d == "absolute")
            f.y -= c.body.offsetTop;
            for (b = a; (b = goog.style.getOffsetParent(b)) && b != c.body && b != g;) {
                f.x -= b.scrollLeft;
                if (!goog.userAgent.OPERA || b.tagName != "TR")
                    f.y -= b.scrollTop
            }
    }
    return f
};
goog.style.getPageOffsetLeft = function(a) {
    return goog.style.getPageOffset(a).x
};
goog.style.getPageOffsetTop = function(a) {
    return goog.style.getPageOffset(a).y
};
goog.style.getFramedPageOffset = function(a, b) {
    var c = new goog.math.Coordinate(0, 0), d = goog.dom.getWindow(goog.dom.getOwnerDocument(a)), e = a;
    do {
        var f = d == b ? goog.style.getPageOffset(e): goog.style.getClientPosition(e);
        c.x += f.x;
        c.y += f.y
    }
    while (d && d != b && (e = d.frameElement) && (d = d.parent));
    return c
};
goog.style.translateRectForAnotherFrame = function(a, b, c) {
    if (b.getDocument() != c.getDocument()) {
        var d = b.getDocument().body;
        c = goog.style.getFramedPageOffset(d, c.getWindow());
        c = goog.math.Coordinate.difference(c, goog.style.getPageOffset(d));
        if (goog.userAgent.IE&&!b.isCss1CompatMode())
            c = goog.math.Coordinate.difference(c, b.getDocumentScroll());
        a.left += c.x;
        a.top += c.y
    }
};
goog.style.getRelativePosition = function(a, b) {
    var c = goog.style.getClientPosition(a), d = goog.style.getClientPosition(b);
    return new goog.math.Coordinate(c.x - d.x, c.y - d.y)
};
goog.style.getClientPosition = function(a) {
    var b = new goog.math.Coordinate;
    if (a.nodeType == goog.dom.NodeType.ELEMENT)
        if (a.getBoundingClientRect) {
            var c = goog.style.getBoundingClientRect_(a);
            b.x = c.left;
            b.y = c.top
        } else {
            c = goog.dom.getDomHelper(a).getDocumentScroll();
            a = goog.style.getPageOffset(a);
            b.x = a.x - c.x;
            b.y = a.y - c.y
        } else {
        b.x = a.clientX;
        b.y = a.clientY
    }
    return b
};
goog.style.setPageOffset = function(a, b, c) {
    var d = goog.style.getPageOffset(a);
    if (b instanceof goog.math.Coordinate) {
        c = b.y;
        b = b.x
    }
    goog.style.setPosition(a, a.offsetLeft + (b - d.x), a.offsetTop + (c - d.y))
};
goog.style.setSize = function(a, b, c) {
    if (b instanceof goog.math.Size) {
        c = b.height;
        b = b.width
    } else {
        if (c == undefined)
            throw Error("missing height argument");
        c = c
    }
    goog.style.setWidth(a, b);
    goog.style.setHeight(a, c)
};
goog.style.setPixelStyleProperty_ = function(a, b, c, d) {
    if (typeof d == "number")
        d = (b ? Math.round(d) : d) + "px";
    c.style[a] = d
};
goog.style.setHeight = goog.partial(goog.style.setPixelStyleProperty_, "height", true);
goog.style.setWidth = goog.partial(goog.style.setPixelStyleProperty_, "width", true);
goog.style.getSize = function(a) {
    var b = goog.userAgent.OPERA&&!goog.userAgent.isVersion("10");
    if (goog.style.getStyle_(a, "display") != "none")
        return b ? new goog.math.Size(a.offsetWidth || a.clientWidth, a.offsetHeight || a.clientHeight) : new goog.math.Size(a.offsetWidth, a.offsetHeight);
    var c = a.style, d = c.display, e = c.visibility, f = c.position;
    c.visibility = "hidden";
    c.position = "absolute";
    c.display = "inline";
    if (b) {
        b = a.offsetWidth || a.clientWidth;
        a = a.offsetHeight || a.clientHeight
    } else {
        b = a.offsetWidth;
        a = a.offsetHeight
    }
    c.display =
    d;
    c.position = f;
    c.visibility = e;
    return new goog.math.Size(b, a)
};
goog.style.getBounds = function(a) {
    var b = goog.style.getPageOffset(a);
    a = goog.style.getSize(a);
    return new goog.math.Rect(b.x, b.y, a.width, a.height)
};
goog.style.toCamelCaseCache_ = {};
goog.style.toCamelCase = function(a) {
    return goog.style.toCamelCaseCache_[a] || (goog.style.toCamelCaseCache_[a] = String(a).replace(/\-([a-z])/g, function(b, c) {
        return c.toUpperCase()
    }))
};
goog.style.toSelectorCaseCache_ = {};
goog.style.toSelectorCase = function(a) {
    return goog.style.toSelectorCaseCache_[a] || (goog.style.toSelectorCaseCache_[a] = a.replace(/([A-Z])/g, "-$1").toLowerCase())
};
goog.style.getOpacity = function(a) {
    var b = a.style;
    a = "";
    if ("opacity"in b)
        a = b.opacity;
    else if ("MozOpacity"in b)
        a = b.MozOpacity;
    else if ("filter"in b)
        if (b = b.filter.match(/alpha\(opacity=([\d.]+)\)/))
            a = String(b[1] / 100);
    return a == "" ? a : Number(a)
};
goog.style.setOpacity = function(a, b) {
    var c = a.style;
    if ("opacity"in c)
        c.opacity = b;
    else if ("MozOpacity"in c)
        c.MozOpacity = b;
    else if ("filter"in c)
        c.filter = b === "" ? "" : "alpha(opacity=" + b * 100 + ")"
};
goog.style.setTransparentBackgroundImage = function(a, b) {
    var c = a.style;
    if (goog.userAgent.IE&&!goog.userAgent.isVersion("8"))
        c.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '", sizingMethod="crop")';
    else {
        c.backgroundImage = "url(" + b + ")";
        c.backgroundPosition = "top left";
        c.backgroundRepeat = "no-repeat"
    }
};
goog.style.clearTransparentBackgroundImage = function(a) {
    a = a.style;
    if ("filter"in a)
        a.filter = "";
    else 
        a.backgroundImage = "none"
};
goog.style.showElement = function(a, b) {
    a.style.display = b ? "" : "none"
};
goog.style.isElementShown = function(a) {
    return a.style.display != "none"
};
goog.style.installStyles = function(a, b) {
    var c = goog.dom.getDomHelper(b), d = null;
    if (goog.userAgent.IE) {
        d = c.getDocument().createStyleSheet();
        goog.style.setStyles(d, a)
    } else {
        var e = c.getElementsByTagNameAndClass("head")[0];
        if (!e) {
            d = c.getElementsByTagNameAndClass("body")[0];
            e = c.createDom("head");
            d.parentNode.insertBefore(e, d)
        }
        d = c.createDom("style");
        goog.style.setStyles(d, a);
        c.appendChild(e, d)
    }
    return d
};
goog.style.uninstallStyles = function(a) {
    goog.dom.removeNode(a.ownerNode || a.owningElement || a)
};
goog.style.setStyles = function(a, b) {
    if (goog.userAgent.IE)
        a.cssText = b;
    else 
        a[goog.userAgent.WEBKIT ? "innerText": "innerHTML"] = b
};
goog.style.setPreWrap = function(a) {
    a = a.style;
    if (goog.userAgent.IE&&!goog.userAgent.isVersion("8")) {
        a.whiteSpace = "pre";
        a.wordWrap = "break-word"
    } else 
        a.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : goog.userAgent.OPERA ? "-o-pre-wrap" : "pre-wrap"
};
goog.style.setInlineBlock = function(a) {
    a = a.style;
    a.position = "relative";
    if (goog.userAgent.IE&&!goog.userAgent.isVersion("8")) {
        a.zoom = "1";
        a.display = "inline"
    } else 
        a.display = goog.userAgent.GECKO ? goog.userAgent.isVersion("1.9a") ? "inline-block" : "-moz-inline-box" : "inline-block"
};
goog.style.isRightToLeft = function(a) {
    return "rtl" == goog.style.getStyle_(a, "direction")
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function(a) {
    if (goog.style.unselectableStyle_)
        return a.style[goog.style.unselectableStyle_].toLowerCase() == "none";
    else if (goog.userAgent.IE || goog.userAgent.OPERA)
        return a.getAttribute("unselectable") == "on";
    return false
};
goog.style.setUnselectable = function(a, b, c) {
    c=!c ? a.getElementsByTagName("*") : null;
    var d = goog.style.unselectableStyle_;
    if (d) {
        b = b ? "none" : "";
        a.style[d] = b;
        if (c) {
            a = 0;
            for (var e; e = c[a]; a++)
                e.style[d] = b
        }
    } else if (goog.userAgent.IE || goog.userAgent.OPERA) {
        b = b ? "on" : "";
        a.setAttribute("unselectable", b);
        if (c)
            for (a = 0; e = c[a]; a++)
                e.setAttribute("unselectable", b)
    }
};
goog.style.getBorderBoxSize = function(a) {
    return new goog.math.Size(a.offsetWidth, a.offsetHeight)
};
goog.style.setBorderBoxSize = function(a, b) {
    var c = goog.dom.getOwnerDocument(a), d = goog.dom.getDomHelper(c).isCss1CompatMode();
    if (goog.userAgent.IE && (!d ||!goog.userAgent.isVersion("8"))) {
        c = a.style;
        if (d) {
            d = goog.style.getPaddingBox(a);
            var e = goog.style.getBorderBox(a);
            c.pixelWidth = b.width - e.left - d.left - d.right - e.right;
            c.pixelHeight = b.height - e.top - d.top - d.bottom - e.bottom
        } else {
            c.pixelWidth = b.width;
            c.pixelHeight = b.height
        }
    } else 
        goog.style.setBoxSizingSize_(a, b, "border-box")
};
goog.style.getContentBoxSize = function(a) {
    var b = goog.dom.getOwnerDocument(a), c = goog.userAgent.IE && a.currentStyle;
    if (c && goog.dom.getDomHelper(b).isCss1CompatMode() && c.width != "auto" && c.height != "auto"&&!c.boxSizing) {
        b = goog.style.getIePixelValue_(a, c.width, "width", "pixelWidth");
        a = goog.style.getIePixelValue_(a, c.height, "height", "pixelHeight");
        return new goog.math.Size(b, a)
    } else {
        c = goog.style.getBorderBoxSize(a);
        b = goog.style.getPaddingBox(a);
        a = goog.style.getBorderBox(a);
        return new goog.math.Size(c.width -
        a.left - b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom)
    }
};
goog.style.setContentBoxSize = function(a, b) {
    var c = goog.dom.getOwnerDocument(a), d = goog.dom.getDomHelper(c).isCss1CompatMode();
    if (goog.userAgent.IE && (!d ||!goog.userAgent.isVersion("8"))) {
        c = a.style;
        if (d) {
            c.pixelWidth = b.width;
            c.pixelHeight = b.height
        } else {
            d = goog.style.getPaddingBox(a);
            var e = goog.style.getBorderBox(a);
            c.pixelWidth = b.width + e.left + d.left + d.right + e.right;
            c.pixelHeight = b.height + e.top + d.top + d.bottom + e.bottom
        }
    } else 
        goog.style.setBoxSizingSize_(a, b, "content-box")
};
goog.style.setBoxSizingSize_ = function(a, b, c) {
    a = a.style;
    if (goog.userAgent.GECKO)
        a.MozBoxSizing = c;
    else if (goog.userAgent.WEBKIT)
        a.WebkitBoxSizing = c;
    else if (goog.userAgent.OPERA&&!goog.userAgent.isVersion("9.50"))
        c ? a.setProperty("box-sizing", c) : a.removeProperty("box-sizing");
    else 
        a.boxSizing = c;
    a.width = b.width + "px";
    a.height = b.height + "px"
};
goog.style.getIePixelValue_ = function(a, b, c, d) {
    if (/^\d+px?$/.test(b))
        return parseInt(b, 10);
    else {
        var e = a.style[c], f = a.runtimeStyle[c];
        a.runtimeStyle[c] = a.currentStyle[c];
        a.style[c] = b;
        b = a.style[d];
        a.style[c] = e;
        a.runtimeStyle[c] = f;
        return b
    }
};
goog.style.getIePixelDistance_ = function(a, b) {
    return goog.style.getIePixelValue_(a, goog.style.getCascadedStyle(a, b), "left", "pixelLeft")
};
goog.style.getBox_ = function(a, b) {
    if (goog.userAgent.IE) {
        var c = goog.style.getIePixelDistance_(a, b + "Left"), d = goog.style.getIePixelDistance_(a, b + "Right"), e = goog.style.getIePixelDistance_(a, b + "Top"), f = goog.style.getIePixelDistance_(a, b + "Bottom");
        return new goog.math.Box(e, d, f, c)
    } else {
        c = goog.style.getComputedStyle(a, b + "Left");
        d = goog.style.getComputedStyle(a, b + "Right");
        e = goog.style.getComputedStyle(a, b + "Top");
        f = goog.style.getComputedStyle(a, b + "Bottom");
        return new goog.math.Box(parseFloat(e), parseFloat(d),
        parseFloat(f), parseFloat(c))
    }
};
goog.style.getPaddingBox = function(a) {
    return goog.style.getBox_(a, "padding")
};
goog.style.getMarginBox = function(a) {
    return goog.style.getBox_(a, "margin")
};
goog.style.ieBorderWidthKeywords_ = {
    thin: 2,
    medium: 4,
    thick: 6
};
goog.style.getIePixelBorder_ = function(a, b) {
    if (goog.style.getCascadedStyle(a, b + "Style") == "none")
        return 0;
    var c = goog.style.getCascadedStyle(a, b + "Width");
    if (c in goog.style.ieBorderWidthKeywords_)
        return goog.style.ieBorderWidthKeywords_[c];
    return goog.style.getIePixelValue_(a, c, "left", "pixelLeft")
};
goog.style.getBorderBox = function(a) {
    if (goog.userAgent.IE) {
        var b = goog.style.getIePixelBorder_(a, "borderLeft"), c = goog.style.getIePixelBorder_(a, "borderRight"), d = goog.style.getIePixelBorder_(a, "borderTop");
        a = goog.style.getIePixelBorder_(a, "borderBottom");
        return new goog.math.Box(d, c, a, b)
    } else {
        b = goog.style.getComputedStyle(a, "borderLeftWidth");
        c = goog.style.getComputedStyle(a, "borderRightWidth");
        d = goog.style.getComputedStyle(a, "borderTopWidth");
        a = goog.style.getComputedStyle(a, "borderBottomWidth");
        return new goog.math.Box(parseFloat(d),
        parseFloat(c), parseFloat(a), parseFloat(b))
    }
};
goog.style.getFontFamily = function(a) {
    var b = goog.dom.getOwnerDocument(a), c = "";
    if (b.createTextRange) {
        c = b.body.createTextRange();
        c.moveToElementText(a);
        c = c.queryCommandValue("FontName")
    }
    if (!c) {
        c = goog.style.getStyle_(a, "fontFamily");
        if (goog.userAgent.OPERA && goog.userAgent.LINUX)
            c = c.replace(/ \[[^\]]*\]/, "")
    }
    a = c.split(",");
    if (a.length > 1)
        c = a[0];
    return goog.string.stripQuotes(c, "\"'")
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function(a) {
    return (a = a.match(goog.style.lengthUnitRegex_)) && a[0] || null
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {
    cm: 1,
    "in": 1,
    mm: 1,
    pc: 1,
    pt: 1
};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {
    em: 1,
    ex: 1
};
goog.style.getFontSize = function(a) {
    var b = goog.style.getStyle_(a, "fontSize"), c = goog.style.getLengthUnits(b);
    if (b && "px" == c)
        return parseInt(b, 10);
    if (goog.userAgent.IE)
        if (c in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_)
            return goog.style.getIePixelValue_(a, b, "left", "pixelLeft");
        else if (a.parentNode && a.parentNode.nodeType == goog.dom.NodeType.ELEMENT && c in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) {
            a = a.parentNode;
            c = goog.style.getStyle_(a, "fontSize");
            return goog.style.getIePixelValue_(a, b == c ? "1em" : b, "left", "pixelLeft")
        }
    c =
    goog.dom.createDom("span", {
        style: "visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"
    });
    goog.dom.appendChild(a, c);
    b = c.offsetHeight;
    goog.dom.removeNode(c);
    return b
};
goog.style.parseStyleAttribute = function(a) {
    var b = {};
    goog.array.forEach(a.split(/\s*;\s*/), function(c) {
        c = c.split(/\s*:\s*/);
        if (c.length == 2)
            b[goog.style.toCamelCase(c[0].toLowerCase())] = c[1]
    });
    return b
};
goog.style.toStyleAttribute = function(a) {
    var b = [];
    goog.object.forEach(a, function(c, d) {
        b.push(goog.style.toSelectorCase(d), ":", c, ";")
    });
    return b.join("")
};
goog.style.setFloat = function(a, b) {
    a.style[goog.userAgent.IE ? "styleFloat": "cssFloat"] = b
};
goog.style.getFloat = function(a) {
    return a.style[goog.userAgent.IE ? "styleFloat": "cssFloat"] || ""
};
goog.style.getScrollbarWidth = function() {
    var a = goog.dom.createElement("div");
    a.style.cssText = "visibility:hidden;overflow:scroll;position:absolute;top:0;width:100px;height:100px";
    goog.dom.appendChild(goog.dom.getDocument().body, a);
    var b = a.offsetWidth - a.clientWidth;
    goog.dom.removeNode(a);
    return b
};
goog.ui = {};
goog.ui.IdGenerator = function() {};
goog.addSingletonGetter(goog.ui.IdGenerator);
goog.ui.IdGenerator.prototype.nextId_ = 0;
goog.ui.IdGenerator.prototype.getNextUniqueId = function() {
    return ":" + (this.nextId_++).toString(36)
};
goog.ui.IdGenerator.instance = goog.ui.IdGenerator.getInstance();
goog.ui.Component = function(a) {
    goog.events.EventTarget.call(this);
    this.dom_ = a || goog.dom.getDomHelper();
    this.rightToLeft_ = goog.ui.Component.defaultRightToLeft_
};
goog.inherits(goog.ui.Component, goog.events.EventTarget);
goog.ui.Component.prototype.idGenerator_ = goog.ui.IdGenerator.getInstance();
goog.ui.Component.defaultRightToLeft_ = null;
goog.ui.Component.EventType = {
    BEFORE_SHOW: "beforeshow",
    SHOW: "show",
    HIDE: "hide",
    DISABLE: "disable",
    ENABLE: "enable",
    HIGHLIGHT: "highlight",
    UNHIGHLIGHT: "unhighlight",
    ACTIVATE: "activate",
    DEACTIVATE: "deactivate",
    SELECT: "select",
    UNSELECT: "unselect",
    CHECK: "check",
    UNCHECK: "uncheck",
    FOCUS: "focus",
    BLUR: "blur",
    OPEN: "open",
    CLOSE: "close",
    ENTER: "enter",
    LEAVE: "leave",
    ACTION: "action",
    CHANGE: "change"
};
goog.ui.Component.Error = {
    NOT_SUPPORTED: "Method not supported",
    DECORATE_INVALID: "Invalid element to decorate",
    ALREADY_RENDEBLACK: "Component already rendeBLACK",
    PARENT_UNABLE_TO_BE_SET: "Unable to set parent component",
    CHILD_INDEX_OUT_OF_BOUNDS: "Child component index out of bounds",
    NOT_OUR_CHILD: "Child is not in parent component",
    NOT_IN_DOCUMENT: "Operation not supported while component is not in document",
    STATE_INVALID: "Invalid component state"
};
goog.ui.Component.State = {
    ALL: 255,
    DISABLED: 1,
    HOVER: 2,
    ACTIVE: 4,
    SELECTED: 8,
    CHECKED: 16,
    FOCUSED: 32,
    OPENED: 64
};
goog.ui.Component.getStateTransitionEvent = function(a, b) {
    switch (a) {
    case goog.ui.Component.State.DISABLED:
        return b ? goog.ui.Component.EventType.DISABLE : goog.ui.Component.EventType.ENABLE;
    case goog.ui.Component.State.HOVER:
        return b ? goog.ui.Component.EventType.HIGHLIGHT : goog.ui.Component.EventType.UNHIGHLIGHT;
    case goog.ui.Component.State.ACTIVE:
        return b ? goog.ui.Component.EventType.ACTIVATE : goog.ui.Component.EventType.DEACTIVATE;
    case goog.ui.Component.State.SELECTED:
        return b ? goog.ui.Component.EventType.SELECT :
        goog.ui.Component.EventType.UNSELECT;
    case goog.ui.Component.State.CHECKED:
        return b ? goog.ui.Component.EventType.CHECK : goog.ui.Component.EventType.UNCHECK;
    case goog.ui.Component.State.FOCUSED:
        return b ? goog.ui.Component.EventType.FOCUS : goog.ui.Component.EventType.BLUR;
    case goog.ui.Component.State.OPENED:
        return b ? goog.ui.Component.EventType.OPEN : goog.ui.Component.EventType.CLOSE;
    default:
    }
    throw Error(goog.ui.Component.Error.STATE_INVALID);
};
goog.ui.Component.setDefaultRightToLeft = function(a) {
    goog.ui.Component.defaultRightToLeft_ = a
};
goog.ui.Component.prototype.id_ = null;
goog.ui.Component.prototype.dom_ = null;
goog.ui.Component.prototype.inDocument_ = false;
goog.ui.Component.prototype.element_ = null;
goog.ui.Component.prototype.rightToLeft_ = null;
goog.ui.Component.prototype.model_ = null;
goog.ui.Component.prototype.parent_ = null;
goog.ui.Component.prototype.children_ = null;
goog.ui.Component.prototype.childIndex_ = null;
goog.ui.Component.prototype.wasDecorated_ = false;
goog.ui.Component.prototype.getId = function() {
    return this.id_ || (this.id_ = this.idGenerator_.getNextUniqueId())
};
goog.ui.Component.prototype.setId = function(a) {
    if (this.parent_ && this.parent_.childIndex_) {
        goog.object.remove(this.parent_.childIndex_, this.id_);
        goog.object.add(this.parent_.childIndex_, a, this)
    }
    this.id_ = a
};
goog.ui.Component.prototype.getElement = function() {
    return this.element_
};
goog.ui.Component.prototype.setElementInternal = function(a) {
    this.element_ = a
};
goog.ui.Component.prototype.getHandler = function() {
    return this.googUiComponentHandler_ || (this.googUiComponentHandler_ = new goog.events.EventHandler(this))
};
goog.ui.Component.prototype.setParent = function(a) {
    if (this == a)
        throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
    if (a && this.parent_ && this.id_ && this.parent_.getChild(this.id_) && this.parent_ != a)
        throw Error(goog.ui.Component.Error.PARENT_UNABLE_TO_BE_SET);
    this.parent_ = a;
    goog.ui.Component.superClass_.setParentEventTarget.call(this, a)
};
goog.ui.Component.prototype.getParent = function() {
    return this.parent_
};
goog.ui.Component.prototype.setParentEventTarget = function(a) {
    if (this.parent_ && this.parent_ != a)
        throw Error(goog.ui.Component.Error.NOT_SUPPORTED);
    goog.ui.Component.superClass_.setParentEventTarget.call(this, a)
};
goog.ui.Component.prototype.getDomHelper = function() {
    return this.dom_
};
goog.ui.Component.prototype.isInDocument = function() {
    return this.inDocument_
};
goog.ui.Component.prototype.createDom = function() {
    this.element_ = this.dom_.createElement("div")
};
goog.ui.Component.prototype.render = function(a) {
    this.render_(a)
};
goog.ui.Component.prototype.renderBefore = function(a) {
    this.render_(a.parentNode, a)
};
goog.ui.Component.prototype.render_ = function(a, b) {
    if (this.inDocument_)
        throw Error(goog.ui.Component.Error.ALREADY_RENDEBLACK);
    this.element_ || this.createDom();
    a ? a.insertBefore(this.element_, b || null) : this.dom_.getDocument().body.appendChild(this.element_);
    if (!this.parent_ || this.parent_.isInDocument())
        this.enterDocument()
};
goog.ui.Component.prototype.decorate = function(a) {
    if (this.inDocument_)
        throw Error(goog.ui.Component.Error.ALREADY_RENDEBLACK);
    else if (a && this.canDecorate(a)) {
        this.wasDecorated_ = true;
        if (!this.dom_ || this.dom_.getDocument() != goog.dom.getOwnerDocument(a))
            this.dom_ = goog.dom.getDomHelper(a);
            this.decorateInternal(a);
            this.enterDocument()
    } else 
        throw Error(goog.ui.Component.Error.DECORATE_INVALID);
};
goog.ui.Component.prototype.canDecorate = function() {
    return true
};
goog.ui.Component.prototype.wasDecorated = function() {
    return this.wasDecorated_
};
goog.ui.Component.prototype.decorateInternal = function(a) {
    this.element_ = a
};
goog.ui.Component.prototype.enterDocument = function() {
    this.inDocument_ = true;
    this.forEachChild(function(a) {
        !a.isInDocument() && a.getElement() && a.enterDocument()
    })
};
goog.ui.Component.prototype.exitDocument = function() {
    this.forEachChild(function(a) {
        a.isInDocument() && a.exitDocument()
    });
    this.googUiComponentHandler_ && this.googUiComponentHandler_.removeAll();
    this.inDocument_ = false
};
goog.ui.Component.prototype.disposeInternal = function() {
    goog.ui.Component.superClass_.disposeInternal.call(this);
    this.inDocument_ && this.exitDocument();
    if (this.googUiComponentHandler_) {
        this.googUiComponentHandler_.dispose();
        delete this.googUiComponentHandler_
    }
    this.forEachChild(function(a) {
        a.dispose()
    });
    !this.wasDecorated_ && this.element_ && goog.dom.removeNode(this.element_);
    this.parent_ = this.model_ = this.element_ = this.childIndex_ = this.children_ = null
};
goog.ui.Component.prototype.makeId = function(a) {
    return this.getId() + "." + a
};
goog.ui.Component.prototype.getModel = function() {
    return this.model_
};
goog.ui.Component.prototype.setModel = function(a) {
    this.model_ = a
};
goog.ui.Component.prototype.getFragmentFromId = function(a) {
    return a.substring(this.getId().length + 1)
};
goog.ui.Component.prototype.getElementByFragment = function(a) {
    if (!this.inDocument_)
        throw Error(goog.ui.Component.Error.NOT_IN_DOCUMENT);
    return this.dom_.getElement(this.makeId(a))
};
goog.ui.Component.prototype.addChild = function(a, b) {
    this.addChildAt(a, this.getChildCount(), b)
};
goog.ui.Component.prototype.addChildAt = function(a, b, c) {
    if (a.inDocument_ && (c ||!this.inDocument_))
        throw Error(goog.ui.Component.Error.ALREADY_RENDEBLACK);
    if (b < 0 || b > this.getChildCount())
        throw Error(goog.ui.Component.Error.CHILD_INDEX_OUT_OF_BOUNDS);
    if (!this.childIndex_ ||!this.children_) {
        this.childIndex_ = {};
        this.children_ = []
    }
    if (a.getParent() == this) {
        goog.object.set(this.childIndex_, a.getId(), a);
        goog.array.remove(this.children_, a)
    } else 
        goog.object.add(this.childIndex_, a.getId(), a);
    a.setParent(this);
    goog.array.insertAt(this.children_,
    a, b);
    if (a.inDocument_ && this.inDocument_ && a.getParent() == this) {
        c = this.getContentElement();
        c.insertBefore(a.getElement(), c.childNodes[b] || null)
    } else if (c) {
        this.element_ || this.createDom();
        b = this.getChildAt(b + 1);
        a.render_(this.getContentElement(), b ? b.element_ : null)
    } else 
        this.inDocument_&&!a.inDocument_ && a.element_ && a.enterDocument()
};
goog.ui.Component.prototype.getContentElement = function() {
    return this.element_
};
goog.ui.Component.prototype.isRightToLeft = function() {
    if (this.rightToLeft_ == null)
        this.rightToLeft_ = goog.style.isRightToLeft(this.inDocument_ ? this.element_ : this.dom_.getDocument().body);
    return this.rightToLeft_
};
goog.ui.Component.prototype.setRightToLeft = function(a) {
    if (this.inDocument_)
        throw Error(goog.ui.Component.Error.ALREADY_RENDEBLACK);
    this.rightToLeft_ = a
};
goog.ui.Component.prototype.hasChildren = function() {
    return !!this.children_ && this.children_.length != 0
};
goog.ui.Component.prototype.getChildCount = function() {
    return this.children_ ? this.children_.length : 0
};
goog.ui.Component.prototype.getChildIds = function() {
    var a = [];
    this.forEachChild(function(b) {
        a.push(b.getId())
    });
    return a
};
goog.ui.Component.prototype.getChild = function(a) {
    return this.childIndex_ && a ? goog.object.get(this.childIndex_, a) || null : null
};
goog.ui.Component.prototype.getChildAt = function(a) {
    return this.children_ ? this.children_[a] || null : null
};
goog.ui.Component.prototype.forEachChild = function(a, b) {
    this.children_ && goog.array.forEach(this.children_, a, b)
};
goog.ui.Component.prototype.indexOfChild = function(a) {
    return this.children_ && a ? goog.array.indexOf(this.children_, a) : -1
};
goog.ui.Component.prototype.removeChild = function(a, b) {
    if (a) {
        var c = goog.isString(a) ? a: a.getId();
        a = this.getChild(c);
        if (c && a) {
            goog.object.remove(this.childIndex_, c);
            goog.array.remove(this.children_, a);
            if (b) {
                a.exitDocument();
                a.element_ && goog.dom.removeNode(a.element_)
            }
            a.setParent(null)
        }
    }
    if (!a)
        throw Error(goog.ui.Component.Error.NOT_OUR_CHILD);
    return a
};
goog.ui.Component.prototype.removeChildAt = function(a, b) {
    return this.removeChild(this.getChildAt(a), b)
};
goog.ui.Component.prototype.removeChildren = function(a) {
    for (; this.hasChildren();)
        this.removeChildAt(0, a)
};
goog.ui.ControlContent = goog.typedef;
goog.dom.a11y = {};
goog.dom.a11y.State = {
    ACTIVEDESCENDANT: "activedescendant",
    AUTOCOMPLETE: "autocomplete",
    CHECKED: "checked",
    DISABLED: "disabled",
    EXPANDED: "expanded",
    HASPOPUP: "haspopup",
    LABELLEDBY: "labelledby",
    LEVEL: "level",
    PRESSED: "pressed",
    SELECTED: "selected",
    VALUEMAX: "valuemax",
    VALUEMIN: "valuemin",
    VALUENOW: "valuenow",
    VALUETEXT: "valuetext"
};
goog.dom.a11y.Role = {
    BUTTON: "button",
    CHECKBOX: "checkbox",
    COMBOBOX: "combobox",
    DIALOG: "dialog",
    LINK: "link",
    LISTBOX: "listbox",
    MAIN: "main",
    MENU: "menu",
    MENUBAR: "menubar",
    MENU_ITEM: "menuitem",
    MENU_ITEM_CHECKBOX: "menuitemcheckbox",
    MENU_ITEM_RADIO: "menuitemradio",
    NAVIGATION: "navigation",
    OPTION: "option",
    GROUP: "group",
    SLIDER: "slider",
    TAB: "tab",
    TAB_LIST: "tablist",
    TAB_PANEL: "tabpanel",
    TOOLBAR: "toolbar"
};
goog.dom.a11y.setRole = function(a, b) {
    if (goog.userAgent.GECKO || goog.dom.a11y.noBrowserCheck_) {
        a.setAttribute("role", b);
        a.roleName = b
    }
};
goog.dom.a11y.getRole = function(a) {
    return a.roleName || ""
};
goog.dom.a11y.setState = function(a, b, c) {
    if (goog.userAgent.GECKO || goog.dom.a11y.noBrowserCheck_)
        a.setAttribute("aria-" + b, c)
};
goog.dom.a11y.getState = function(a, b) {
    return a.getAttribute("aria-" + b) || ""
};
goog.dom.a11y.getNoBrowserCheck = function() {
    return !!goog.dom.a11y.noBrowserCheck_
};
goog.dom.a11y.setNoBrowserCheck = function(a) {
    goog.dom.a11y.noBrowserCheck_ = a
};
goog.dom.a11y.getActiveDescendant = function(a) {
    var b = goog.dom.a11y.getState(a, goog.dom.a11y.State.ACTIVEDESCENDANT);
    return goog.dom.getOwnerDocument(a).getElementById(b)
};
goog.dom.a11y.setActiveDescendant = function(a, b) {
    goog.dom.a11y.setState(a, goog.dom.a11y.State.ACTIVEDESCENDANT, b ? b.id : "")
};
goog.ui.ControlRenderer = function() {};
goog.addSingletonGetter(goog.ui.ControlRenderer);
goog.ui.ControlRenderer.getCustomRenderer = function(a, b) {
    var c = new a;
    c.getCssClass = function() {
        return b
    };
    return c
};
goog.ui.ControlRenderer.CSS_CLASS = "goog-control";
goog.ui.ControlRenderer.IE6_CLASS_COMBINATIONS = [];
goog.ui.ControlRenderer.prototype.getAriaRole = function() {};
goog.ui.ControlRenderer.prototype.createDom = function(a) {
    return a.getDomHelper().createDom("div", this.getClassNames(a).join(" "), a.getContent())
};
goog.ui.ControlRenderer.prototype.getContentElement = function(a) {
    return a
};
goog.ui.ControlRenderer.prototype.enableClassName = function(a, b, c) {
    if (a = a.getElement ? a.getElement() : a)
        if (goog.userAgent.IE&&!goog.userAgent.isVersion("7")) {
            var d = this.getAppliedCombinedClassNames_(goog.dom.classes.get(a), b);
            d.push(b);
            goog.partial(c ? goog.dom.classes.add : goog.dom.classes.remove, a).apply(null, d)
        } else 
            goog.dom.classes.enable(a, b, c)
};
goog.ui.ControlRenderer.prototype.enableExtraClassName = function(a, b, c) {
    this.enableClassName(a, b, c)
};
goog.ui.ControlRenderer.prototype.canDecorate = function() {
    return true
};
goog.ui.ControlRenderer.prototype.decorate = function(a, b) {
    b.id && a.setId(b.id);
    var c = this.getContentElement(b);
    c && c.firstChild ? a.setContentInternal(c.firstChild.nextSibling ? goog.array.clone(c.childNodes) : c.firstChild) : a.setContentInternal(null);
    var d = 0, e = this.getCssClass(), f = this.getStructuralCssClass(), g = false, h = false;
    c = false;
    var i = goog.dom.classes.get(b);
    goog.array.forEach(i, function(m) {
        if (!g && m == e) {
            g = true;
            if (f == e)
                h = true
        } else if (!h && m == f)
            h = true;
        else 
            d|=this.getStateFromClass(m)
    }, this);
    a.setStateInternal(d);
    if (!g) {
        i.push(e);
        if (f == e)
            h = true
    }
    h || i.push(f);
    var k = a.getExtraClassNames();
    k && i.push.apply(i, k);
    if (goog.userAgent.IE&&!goog.userAgent.isVersion("7")) {
        var l = this.getAppliedCombinedClassNames_(i);
        if (l.length > 0) {
            i.push.apply(i, l);
            c = true
        }
    }
    if (!g ||!h || k || c)
        goog.dom.classes.set(b, i.join(" "));
    return b
};
goog.ui.ControlRenderer.prototype.initializeDom = function(a) {
    a.isRightToLeft() && this.setRightToLeft(a.getElement(), true);
    a.isEnabled() && this.setFocusable(a, a.isVisible())
};
goog.ui.ControlRenderer.prototype.setAriaRole = function(a) {
    if (goog.userAgent.GECKO) {
        var b = this.getAriaRole();
        b && goog.dom.a11y.setRole(a, b)
    }
};
goog.ui.ControlRenderer.prototype.setAllowTextSelection = function(a, b) {
    goog.style.setUnselectable(a, !b, !goog.userAgent.IE&&!goog.userAgent.OPERA)
};
goog.ui.ControlRenderer.prototype.setRightToLeft = function(a, b) {
    this.enableClassName(a, this.getStructuralCssClass() + "-rtl", b)
};
goog.ui.ControlRenderer.prototype.isFocusable = function(a) {
    var b;
    if (a.isSupportedState(goog.ui.Component.State.FOCUSED) && (b = a.getKeyEventTarget()))
        return goog.dom.isFocusableTabIndex(b);
    return false
};
goog.ui.ControlRenderer.prototype.setFocusable = function(a, b) {
    var c;
    if (a.isSupportedState(goog.ui.Component.State.FOCUSED) && (c = a.getKeyEventTarget())) {
        if (!b && a.isFocused()) {
            try {
                c.blur()
            } catch (d) {}
            a.isFocused() && a.handleBlur(null)
        }
        goog.dom.isFocusableTabIndex(c) != b && goog.dom.setFocusableTabIndex(c, b)
    }
};
goog.ui.ControlRenderer.prototype.setVisible = function(a, b) {
    goog.style.showElement(a, b)
};
goog.ui.ControlRenderer.prototype.setState = function(a, b, c) {
    var d = a.getElement();
    if (d) {
        var e = this.getClassForState(b);
        e && this.enableClassName(a, e, c);
        this.updateAriaState(d, b, c)
    }
};
goog.ui.ControlRenderer.prototype.updateAriaState = function(a, b, c) {
    if (goog.userAgent.GECKO) {
        if (!goog.ui.ControlRenderer.ARIA_STATE_MAP_)
            goog.ui.ControlRenderer.ARIA_STATE_MAP_ = goog.object.create(goog.ui.Component.State.DISABLED, goog.dom.a11y.State.DISABLED, goog.ui.Component.State.ACTIVE, goog.dom.a11y.State.PRESSED, goog.ui.Component.State.SELECTED, goog.dom.a11y.State.SELECTED, goog.ui.Component.State.CHECKED, goog.dom.a11y.State.CHECKED, goog.ui.Component.State.OPENED, goog.dom.a11y.State.EXPANDED);
        (b =
        goog.ui.ControlRenderer.ARIA_STATE_MAP_[b]) && goog.dom.a11y.setState(a, b, c)
    }
};
goog.ui.ControlRenderer.prototype.setContent = function(a, b) {
    var c = this.getContentElement(a);
    if (c) {
        goog.dom.removeChildren(c);
        if (b)
            if (goog.isString(b))
                goog.dom.setTextContent(c, b);
            else {
                var d = function(e) {
                    if (e) {
                        var f = goog.dom.getOwnerDocument(c);
                        c.appendChild(goog.isString(e) ? f.createTextNode(e) : e)
                    }
                };
                if (goog.isArray(b))
                    goog.array.forEach(b, d);
                else 
                    goog.isArrayLike(b)&&!("nodeType"in b) ? goog.array.forEach(goog.array.clone(b), d) : d(b)
                }
        }
};
goog.ui.ControlRenderer.prototype.getKeyEventTarget = function(a) {
    return a.getElement()
};
goog.ui.ControlRenderer.prototype.getCssClass = function() {
    return goog.ui.ControlRenderer.CSS_CLASS
};
goog.ui.ControlRenderer.prototype.getIe6ClassCombinations = function() {
    return []
};
goog.ui.ControlRenderer.prototype.getStructuralCssClass = function() {
    return this.getCssClass()
};
goog.ui.ControlRenderer.prototype.getClassNames = function(a) {
    var b = this.getCssClass(), c = [b], d = this.getStructuralCssClass();
    d != b && c.push(d);
    b = this.getClassNamesForState(a.getState());
    c.push.apply(c, b);
    (a = a.getExtraClassNames()) && c.push.apply(c, a);
    goog.userAgent.IE&&!goog.userAgent.isVersion("7") && c.push.apply(c, this.getAppliedCombinedClassNames_(c));
    return c
};
goog.ui.ControlRenderer.prototype.getAppliedCombinedClassNames_ = function(a, b) {
    var c = [];
    if (b)
        a = a.concat([b]);
    goog.array.forEach(this.getIe6ClassCombinations(), function(d) {
        if (goog.array.every(d, goog.partial(goog.array.contains, a)) && (!b || goog.array.contains(d, b)))
            c.push(d.join("_"))
    });
    return c
};
goog.ui.ControlRenderer.prototype.getClassNamesForState = function(a) {
    for (var b = []; a;) {
        var c = a&-a;
        b.push(this.getClassForState(c));
        a&=~c
    }
    return b
};
goog.ui.ControlRenderer.prototype.getClassForState = function(a) {
    this.classByState_ || this.createClassByStateMap_();
    return this.classByState_[a]
};
goog.ui.ControlRenderer.prototype.getStateFromClass = function(a) {
    this.stateByClass_ || this.createStateByClassMap_();
    a = parseInt(this.stateByClass_[a], 10);
    return isNaN(a) ? 0 : a
};
goog.ui.ControlRenderer.prototype.createClassByStateMap_ = function() {
    var a = this.getStructuralCssClass();
    this.classByState_ = goog.object.create(goog.ui.Component.State.DISABLED, a + "-disabled", goog.ui.Component.State.HOVER, a + "-hover", goog.ui.Component.State.ACTIVE, a + "-active", goog.ui.Component.State.SELECTED, a + "-selected", goog.ui.Component.State.CHECKED, a + "-checked", goog.ui.Component.State.FOCUSED, a + "-focused", goog.ui.Component.State.OPENED, a + "-open")
};
goog.ui.ControlRenderer.prototype.createStateByClassMap_ = function() {
    this.classByState_ || this.createClassByStateMap_();
    this.stateByClass_ = goog.object.transpose(this.classByState_)
};
goog.ui.registry = {};
goog.ui.registry.getDefaultRenderer = function(a) {
    for (var b; a;) {
        b = goog.getUid(a);
        if (b = goog.ui.registry.defaultRenderers_[b])
            break;
        a = a.superClass_ ? a.superClass_.constructor : null
    }
    if (b)
        return goog.isFunction(b.getInstance) ? b.getInstance() : new b;
    return null
};
goog.ui.registry.setDefaultRenderer = function(a, b) {
    if (!goog.isFunction(a))
        throw Error("Invalid component class " + a);
    if (!goog.isFunction(b))
        throw Error("Invalid renderer class " + b);
    var c = goog.getUid(a);
    goog.ui.registry.defaultRenderers_[c] = b
};
goog.ui.registry.getDecoratorByClassName = function(a) {
    return a in goog.ui.registry.decoratorFunctions_ ? goog.ui.registry.decoratorFunctions_[a]() : null
};
goog.ui.registry.setDecoratorByClassName = function(a, b) {
    if (!a)
        throw Error("Invalid class name " + a);
    if (!goog.isFunction(b))
        throw Error("Invalid decorator function " + b);
    goog.ui.registry.decoratorFunctions_[a] = b
};
goog.ui.registry.getDecorator = function(a) {
    for (var b = goog.dom.classes.get(a), c = 0, d = b.length; c < d; c++)
        if (a = goog.ui.registry.getDecoratorByClassName(b[c]))
            return a;
    return null
};
goog.ui.registry.reset = function() {
    goog.ui.registry.defaultRenderers_ = {};
    goog.ui.registry.decoratorFunctions_ = {}
};
goog.ui.registry.defaultRenderers_ = {};
goog.ui.registry.decoratorFunctions_ = {};
goog.ui.decorate = function(a) {
    var b = goog.ui.registry.getDecorator(a);
    b && b.decorate(a);
    return b
};
goog.ui.Control = function(a, b, c) {
    goog.ui.Component.call(this, c);
    this.renderer_ = b || goog.ui.registry.getDefaultRenderer(this.constructor);
    this.setContentInternal(a)
};
goog.inherits(goog.ui.Control, goog.ui.Component);
goog.ui.Control.registerDecorator = goog.ui.registry.setDecoratorByClassName;
goog.ui.Control.getDecorator = goog.ui.registry.getDecorator;
goog.ui.Control.decorate = goog.ui.decorate;
goog.ui.Control.prototype.content_ = null;
goog.ui.Control.prototype.state_ = 0;
goog.ui.Control.prototype.supportedStates_ = goog.ui.Component.State.DISABLED | goog.ui.Component.State.HOVER | goog.ui.Component.State.ACTIVE | goog.ui.Component.State.FOCUSED;
goog.ui.Control.prototype.autoStates_ = goog.ui.Component.State.ALL;
goog.ui.Control.prototype.statesWithTransitionEvents_ = 0;
goog.ui.Control.prototype.visible_ = true;
goog.ui.Control.prototype.extraClassNames_ = null;
goog.ui.Control.prototype.handleMouseEvents_ = true;
goog.ui.Control.prototype.allowTextSelection_ = false;
goog.ui.Control.prototype.isHandleMouseEvents = function() {
    return this.handleMouseEvents_
};
goog.ui.Control.prototype.setHandleMouseEvents = function(a) {
    this.isInDocument() && a != this.handleMouseEvents_ && this.enableMouseEventHandling_(a);
    this.handleMouseEvents_ = a
};
goog.ui.Control.prototype.getKeyEventTarget = function() {
    return this.renderer_.getKeyEventTarget(this)
};
goog.ui.Control.prototype.getKeyHandler = function() {
    return this.keyHandler_ || (this.keyHandler_ = new goog.events.KeyHandler)
};
goog.ui.Control.prototype.getRenderer = function() {
    return this.renderer_
};
goog.ui.Control.prototype.setRenderer = function(a) {
    if (this.isInDocument())
        throw Error(goog.ui.Component.Error.ALREADY_RENDEBLACK);
    this.getElement() && this.setElementInternal(null);
    this.renderer_ = a
};
goog.ui.Control.prototype.getExtraClassNames = function() {
    return this.extraClassNames_
};
goog.ui.Control.prototype.addClassName = function(a) {
    if (a) {
        if (this.extraClassNames_)
            goog.array.contains(this.extraClassNames_, a) || this.extraClassNames_.push(a);
        else 
            this.extraClassNames_ = [a];
        this.renderer_.enableExtraClassName(this, a, true)
    }
};
goog.ui.Control.prototype.removeClassName = function(a) {
    if (a && this.extraClassNames_) {
        goog.array.remove(this.extraClassNames_, a);
        if (this.extraClassNames_.length == 0)
            this.extraClassNames_ = null;
        this.renderer_.enableExtraClassName(this, a, false)
    }
};
goog.ui.Control.prototype.enableClassName = function(a, b) {
    b ? this.addClassName(a) : this.removeClassName(a)
};
goog.ui.Control.prototype.createDom = function() {
    var a = this.renderer_.createDom(this);
    this.setElementInternal(a);
    this.renderer_.setAriaRole(a);
    this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(a, false);
    this.isVisible() || this.renderer_.setVisible(a, false)
};
goog.ui.Control.prototype.getContentElement = function() {
    return this.renderer_.getContentElement(this.getElement())
};
goog.ui.Control.prototype.canDecorate = function(a) {
    return this.renderer_.canDecorate(a)
};
goog.ui.Control.prototype.decorateInternal = function(a) {
    a = this.renderer_.decorate(this, a);
    this.setElementInternal(a);
    this.renderer_.setAriaRole(a);
    this.isAllowTextSelection() || this.renderer_.setAllowTextSelection(a, false);
    this.visible_ = a.style.display != "none"
};
goog.ui.Control.prototype.enterDocument = function() {
    goog.ui.Control.superClass_.enterDocument.call(this);
    this.renderer_.initializeDom(this);
    if (this.supportedStates_&~goog.ui.Component.State.DISABLED) {
        this.isHandleMouseEvents() && this.enableMouseEventHandling_(true);
        if (this.isSupportedState(goog.ui.Component.State.FOCUSED)) {
            var a = this.getKeyEventTarget();
            if (a) {
                var b = this.getKeyHandler();
                b.attach(a);
                this.getHandler().listen(b, goog.events.KeyHandler.EventType.KEY, this.handleKeyEvent).listen(a, goog.events.EventType.FOCUS,
                this.handleFocus).listen(a, goog.events.EventType.BLUR, this.handleBlur)
            }
        }
    }
};
goog.ui.Control.prototype.enableMouseEventHandling_ = function(a) {
    var b = this.getHandler(), c = this.getElement();
    if (a) {
        b.listen(c, goog.events.EventType.MOUSEOVER, this.handleMouseOver).listen(c, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).listen(c, goog.events.EventType.MOUSEUP, this.handleMouseUp).listen(c, goog.events.EventType.MOUSEOUT, this.handleMouseOut);
        goog.userAgent.IE && b.listen(c, goog.events.EventType.DBLCLICK, this.handleDblClick)
    } else {
        b.unlisten(c, goog.events.EventType.MOUSEOVER, this.handleMouseOver).unlisten(c,
        goog.events.EventType.MOUSEDOWN, this.handleMouseDown).unlisten(c, goog.events.EventType.MOUSEUP, this.handleMouseUp).unlisten(c, goog.events.EventType.MOUSEOUT, this.handleMouseOut);
        goog.userAgent.IE && b.unlisten(c, goog.events.EventType.DBLCLICK, this.handleDblClick)
    }
};
goog.ui.Control.prototype.exitDocument = function() {
    goog.ui.Control.superClass_.exitDocument.call(this);
    this.keyHandler_ && this.keyHandler_.detach();
    this.isVisible() && this.isEnabled() && this.renderer_.setFocusable(this, false)
};
goog.ui.Control.prototype.disposeInternal = function() {
    goog.ui.Control.superClass_.disposeInternal.call(this);
    if (this.keyHandler_) {
        this.keyHandler_.dispose();
        delete this.keyHandler_
    }
    delete this.renderer_;
    this.extraClassNames_ = this.content_ = null
};
goog.ui.Control.prototype.getContent = function() {
    return this.content_
};
goog.ui.Control.prototype.setContent = function(a) {
    this.renderer_.setContent(this.getElement(), a);
    this.setContentInternal(a)
};
goog.ui.Control.prototype.setContentInternal = function(a) {
    this.content_ = a
};
goog.ui.Control.prototype.getCaption = function() {
    var a = this.getContent();
    if (!a || goog.isString(a))
        return a;
    return (a = goog.isArray(a) ? goog.array.map(a, goog.dom.getTextContent).join("") : goog.dom.getTextContent(a)) && goog.string.trim(a)
};
goog.ui.Control.prototype.setCaption = function(a) {
    this.setContent(a)
};
goog.ui.Control.prototype.setRightToLeft = function(a) {
    goog.ui.Control.superClass_.setRightToLeft.call(this, a);
    var b = this.getElement();
    b && this.renderer_.setRightToLeft(b, a)
};
goog.ui.Control.prototype.isAllowTextSelection = function() {
    return this.allowTextSelection_
};
goog.ui.Control.prototype.setAllowTextSelection = function(a) {
    this.allowTextSelection_ = a;
    var b = this.getElement();
    b && this.renderer_.setAllowTextSelection(b, a)
};
goog.ui.Control.prototype.isVisible = function() {
    return this.visible_
};
goog.ui.Control.prototype.setVisible = function(a, b) {
    if (b || this.visible_ != a && this.dispatchEvent(a ? goog.ui.Component.EventType.SHOW : goog.ui.Component.EventType.HIDE)) {
        var c = this.getElement();
        c && this.renderer_.setVisible(c, a);
        this.isEnabled() && this.renderer_.setFocusable(this, a);
        this.visible_ = a;
        return true
    }
    return false
};
goog.ui.Control.prototype.isEnabled = function() {
    return !this.hasState(goog.ui.Component.State.DISABLED)
};
goog.ui.Control.prototype.isParentDisabled_ = function() {
    var a = this.getParent();
    return !!a && typeof a.isEnabled == "function"&&!a.isEnabled()
};
goog.ui.Control.prototype.setEnabled = function(a) {
    if (!this.isParentDisabled_() && this.isTransitionAllowed(goog.ui.Component.State.DISABLED, !a)) {
        if (!a) {
            this.setActive(false);
            this.setHighlighted(false)
        }
        this.isVisible() && this.renderer_.setFocusable(this, a);
        this.setState(goog.ui.Component.State.DISABLED, !a)
    }
};
goog.ui.Control.prototype.isHighlighted = function() {
    return this.hasState(goog.ui.Component.State.HOVER)
};
goog.ui.Control.prototype.setHighlighted = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.HOVER, a) && this.setState(goog.ui.Component.State.HOVER, a)
};
goog.ui.Control.prototype.isActive = function() {
    return this.hasState(goog.ui.Component.State.ACTIVE)
};
goog.ui.Control.prototype.setActive = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.ACTIVE, a) && this.setState(goog.ui.Component.State.ACTIVE, a)
};
goog.ui.Control.prototype.isSelected = function() {
    return this.hasState(goog.ui.Component.State.SELECTED)
};
goog.ui.Control.prototype.setSelected = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.SELECTED, a) && this.setState(goog.ui.Component.State.SELECTED, a)
};
goog.ui.Control.prototype.isChecked = function() {
    return this.hasState(goog.ui.Component.State.CHECKED)
};
goog.ui.Control.prototype.setChecked = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.CHECKED, a) && this.setState(goog.ui.Component.State.CHECKED, a)
};
goog.ui.Control.prototype.isFocused = function() {
    return this.hasState(goog.ui.Component.State.FOCUSED)
};
goog.ui.Control.prototype.setFocused = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.FOCUSED, a) && this.setState(goog.ui.Component.State.FOCUSED, a)
};
goog.ui.Control.prototype.isOpen = function() {
    return this.hasState(goog.ui.Component.State.OPENED)
};
goog.ui.Control.prototype.setOpen = function(a) {
    this.isTransitionAllowed(goog.ui.Component.State.OPENED, a) && this.setState(goog.ui.Component.State.OPENED, a)
};
goog.ui.Control.prototype.getState = function() {
    return this.state_
};
goog.ui.Control.prototype.hasState = function(a) {
    return !!(this.state_ & a)
};
goog.ui.Control.prototype.setState = function(a, b) {
    if (this.isSupportedState(a) && b != this.hasState(a)) {
        this.renderer_.setState(this, a, b);
        this.state_ = b ? this.state_ | a : this.state_&~a
    }
};
goog.ui.Control.prototype.setStateInternal = function(a) {
    this.state_ = a
};
goog.ui.Control.prototype.isSupportedState = function(a) {
    return !!(this.supportedStates_ & a)
};
goog.ui.Control.prototype.setSupportedState = function(a, b) {
    if (this.isInDocument() && this.hasState(a)&&!b)
        throw Error(goog.ui.Component.Error.ALREADY_RENDEBLACK);
    !b && this.hasState(a) && this.setState(a, false);
    this.supportedStates_ = b ? this.supportedStates_ | a : this.supportedStates_&~a
};
goog.ui.Control.prototype.isAutoState = function(a) {
    return !!(this.autoStates_ & a) && this.isSupportedState(a)
};
goog.ui.Control.prototype.setAutoStates = function(a, b) {
    this.autoStates_ = b ? this.autoStates_ | a : this.autoStates_&~a
};
goog.ui.Control.prototype.isDispatchTransitionEvents = function(a) {
    return !!(this.statesWithTransitionEvents_ & a) && this.isSupportedState(a)
};
goog.ui.Control.prototype.setDispatchTransitionEvents = function(a, b) {
    this.statesWithTransitionEvents_ = b ? this.statesWithTransitionEvents_ | a : this.statesWithTransitionEvents_&~a
};
goog.ui.Control.prototype.isTransitionAllowed = function(a, b) {
    return this.isSupportedState(a) && this.hasState(a) != b && (!(this.statesWithTransitionEvents_ & a) || this.dispatchEvent(goog.ui.Component.getStateTransitionEvent(a, b)))&&!this.isDisposed()
};
goog.ui.Control.prototype.handleMouseOver = function(a) {
    !goog.ui.Control.isMouseEventWithinElement_(a, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.ENTER) && this.isEnabled() && this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(true)
};
goog.ui.Control.prototype.handleMouseOut = function(a) {
    if (!goog.ui.Control.isMouseEventWithinElement_(a, this.getElement()) && this.dispatchEvent(goog.ui.Component.EventType.LEAVE)) {
        this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(false);
        this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(false)
    }
};
goog.ui.Control.isMouseEventWithinElement_ = function(a, b) {
    return !!a.relatedTarget && goog.dom.contains(b, a.relatedTarget)
};
goog.ui.Control.prototype.handleMouseDown = function(a) {
    if (this.isEnabled()) {
        this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(true);
        if (a.isButton(goog.events.BrowserEvent.MouseButton.LEFT)) {
            this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(true);
            this.renderer_.isFocusable(this) && this.getKeyEventTarget().focus()
        }
    }
    !this.isAllowTextSelection() && a.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && a.preventDefault()
};
goog.ui.Control.prototype.handleMouseUp = function(a) {
    if (this.isEnabled()) {
        this.isAutoState(goog.ui.Component.State.HOVER) && this.setHighlighted(true);
        this.isActive() && this.performActionInternal(a) && this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(false)
    }
};
goog.ui.Control.prototype.handleDblClick = function(a) {
    this.isEnabled() && this.performActionInternal(a)
};
goog.ui.Control.prototype.performActionInternal = function(a) {
    this.isAutoState(goog.ui.Component.State.CHECKED) && this.setChecked(!this.isChecked());
    this.isAutoState(goog.ui.Component.State.SELECTED) && this.setSelected(true);
    this.isAutoState(goog.ui.Component.State.OPENED) && this.setOpen(!this.isOpen());
    var b = new goog.events.Event(goog.ui.Component.EventType.ACTION, this);
    if (a)
        for (var c = ["altKey", "ctrlKey", "metaKey", "shiftKey", "platformModifierKey"], d, e = 0; d = c[e]; e++)
            b[d] = a[d];
    return this.dispatchEvent(b)
};
goog.ui.Control.prototype.handleFocus = function() {
    this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(true)
};
goog.ui.Control.prototype.handleBlur = function() {
    this.isAutoState(goog.ui.Component.State.ACTIVE) && this.setActive(false);
    this.isAutoState(goog.ui.Component.State.FOCUSED) && this.setFocused(false)
};
goog.ui.Control.prototype.handleKeyEvent = function(a) {
    if (this.isVisible() && this.isEnabled() && this.handleKeyEventInternal(a)) {
        a.preventDefault();
        a.stopPropagation();
        return true
    }
    return false
};
goog.ui.Control.prototype.handleKeyEventInternal = function(a) {
    return a.keyCode == goog.events.KeyCodes.ENTER && this.performActionInternal(a)
};
goog.ui.registry.setDefaultRenderer(goog.ui.Control, goog.ui.ControlRenderer);
goog.ui.registry.setDecoratorByClassName(goog.ui.ControlRenderer.CSS_CLASS, function() {
    return new goog.ui.Control(null)
});
var bq = {};
bq.ChessboardRenderer = function() {
    goog.ui.ControlRenderer.call(this)
};
goog.inherits(bq.ChessboardRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(bq.ChessboardRenderer);
bq.ChessboardRenderer.X = 31;
bq.ChessboardRenderer.Y = 31;
bq.ChessboardRenderer.Step = 51;
bq.ChessboardRenderer.Width = 468;
bq.ChessboardRenderer.CSS_CLASS = "bq-chessboard";
bq.ChessboardRenderer.prototype.getCssClass = function() {
    return bq.ChessboardRenderer.CSS_CLASS
};
bq.ChesspieceRenderer = function() {
    goog.ui.ControlRenderer.call(this)
};
goog.inherits(bq.ChesspieceRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(bq.ChesspieceRenderer);
bq.ChesspieceRenderer.CSS_CLASS = "bq-chesspiece";
bq.ChesspieceRenderer.Width = 45;
bq.ChesspieceRenderer.prototype.getCssClass = function() {
    return bq.ChesspieceRenderer.CSS_CLASS
};
bq.ChesspieceRenderer.prototype.initializeDom = function(a) {
    bq.ChesspieceRenderer.superClass_.initializeDom.call(this, a);
    var b = a.getElement();
    goog.style.setStyle(b, "background", 'url("images/pieces.gif") -' + a.getFace() * 50 + "px -" + a.getColor() * 50 + "px");
    goog.dom.classes.add(b, "goog-inline-block")
};
bq.ChesspieceRenderer.prototype.setColor = function() {};
bq.ChesspieceRenderer.prototype.setFace = function() {};
bq.ChesspieceRenderer.prototype.setPosition = function(a, b, c) {
    goog.style.setStyle(a, "left", b + "px");
    goog.style.setStyle(a, "top", c + "px")
};
bq.Chesspiece = function(a, b, c, d) {
    goog.ui.Control.call(this, undefined, c || bq.ChesspieceRenderer.getInstance(), d);
    this.setFace(a);
    this.setColor(b);
    this.setSupportedState(goog.ui.Component.State.SELECTED, true)
};
goog.inherits(bq.Chesspiece, goog.ui.Control);
bq.Chesspiece.Color = {
    RED: 0,
    BLACK: 1
};
bq.Chesspiece.Face = {
    CHE: 0,
    MA: 1,
    XIANG: 2,
    SHI: 3,
    JIANG: 4,
    PAO: 5,
    BING: 6
};
bq.Chesspiece.prototype.color_ = undefined;
bq.Chesspiece.prototype.face_ = undefined;
bq.Chesspiece.prototype.setColor = function(a) {
    this.isInDocument() && this.getRenderer().setColor(a);
    this.color_ = a
};
bq.Chesspiece.prototype.getColor = function() {
    return this.color_
};
bq.Chesspiece.prototype.setFace = function(a) {
    this.isInDocument() && this.getRenderer().setFace(a);
    this.face_ = a
};
bq.Chesspiece.prototype.getFace = function() {
    return this.face_
};
bq.Chesspiece.prototype.getWidth = function() {
    return bq.ChesspieceRenderer.Width
};
bq.Chesspiece.prototype.setPosition = function(a, b) {
    this.isInDocument() && this.getRenderer().setPosition(this.getElement(), a, b)
};
bq.Chessboard = function(a, b, c) {
    goog.ui.Control.call(this, a, b || bq.ChessboardRenderer.getInstance(), c);
    this.grid_ = [
    [new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.XIANG, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.SHI, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.JIANG, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.SHI, bq.Chesspiece.Color.RED),
    new bq.Chesspiece(bq.Chesspiece.Face.XIANG, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.RED)], 
    [new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.RED), null, null, new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.SHI, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.RED), null, null, new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.RED)], 
    [new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.RED), null, new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.RED), null, new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.RED), null, new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.RED)], 
    [new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.RED),
    new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.RED)], 
    [new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.RED), null, new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.RED), null, new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.RED),
    null, new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.RED), new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.RED)], 
 
    [new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.BLACK), null, new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.BLACK), null, new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.BLACK),
    null, new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.BLACK)], 
    [new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.BLACK),
    new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.BING, bq.Chesspiece.Color.BLACK)], 
    [new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.BLACK), null, new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.BLACK), null, new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.BLACK), null, new bq.Chesspiece(bq.Chesspiece.Face.PAO, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.BLACK)], 
    [new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.BLACK), null, null, new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.SHI, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.BLACK), null, null, new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.BLACK)], 
    [new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.XIANG, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.SHI, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.JIANG, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.SHI, bq.Chesspiece.Color.BLACK),
    new bq.Chesspiece(bq.Chesspiece.Face.XIANG, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.MA, bq.Chesspiece.Color.BLACK), new bq.Chesspiece(bq.Chesspiece.Face.CHE, bq.Chesspiece.Color.BLACK)], 

]
};
goog.inherits(bq.Chessboard, goog.ui.Control);
bq.Chessboard.prototype.grid_ = undefined;
bq.Chessboard.prototype.x_ =- 1;
bq.Chessboard.prototype.y_ =- 1;
bq.Chessboard.prototype.newGame = function() {
    if (!this.isInDocument())
        throw new Error("Call Chessboard.render() first.");
    for (var a = this.getElement(), b = 0; b < this.grid_.length; b++)
        for (var c = this.grid_[b], d = 0; d < c.length; d++) {
            var e = c[d];
            if (e) {
                e.render(a);
                this.addChild(e);
                this.movePiece(d, b, d, b)
            }
        }
    };
bq.Chessboard.prototype.movePiece = function(a, b, c, d) {
    var e = this.grid_[b][a], f = e.getWidth();
    e.setPosition(bq.ChessboardRenderer.X + c * bq.ChessboardRenderer.Step - f / 2, bq.ChessboardRenderer.Y + d * bq.ChessboardRenderer.Step - f / 2);
    if (a != c || b != d) {
        this.grid_[d][c] = e;
        this.grid_[b][a] = null
    }
};
bq.Chessboard.prototype.enterDocument = function() {
    bq.Chessboard.superClass_.enterDocument.call(this);
    this.getHandler().listen(this.getElement(), goog.events.EventType.CLICK, this.handleClick_)
};
bq.Chessboard.prototype.getSelectedPiece = function() {
    return this.x_==-1 || this.y_==-1 ? null : this.grid_[this.y_][this.x_]
};
bq.Chessboard.prototype.handleClick_ = function(a) {
    var b = this.getSelectedPiece();
    if (a.target == this.element_) {
        if (b) {
            var c = Math.floor((a.offsetX - bq.ChessboardRenderer.X) / bq.ChessboardRenderer.Step + 0.5), d = Math.floor((a.offsetY - bq.ChessboardRenderer.Y) / bq.ChessboardRenderer.Step + 0.5);
            this.movePiece(this.x_, this.y_, c, d);
            this.y_ = this.x_ =- 1;
            b.setSelected(false)
        }
    } else {
        var e;
        for (d = 0; d < 10; d++) {
            var f = false;
            for (c = 0; c < 9; c++)
                if ((e = this.grid_[d][c]) && e.getElement() == a.target) {
                    f = true;
                    break
                }
            if (f)
                break
        }
        if (b)
            if (b == e) {
                e.setSelected(false);
                this.y_ = this.x_ =- 1
            } else {
                if (e.getColor() != b.getColor()) {
                    e.dispose();
                    this.grid_[d][c] = null;
                    this.movePiece(this.x_, this.y_, c, d);
                    this.y_ = this.x_ =- 1
                } else {
                    this.x_ = c;
                    this.y_ = d;
                    e.setSelected(true)
                }
                b.setSelected(false)
            } else {
            this.x_ = c;
            this.y_ = d;
            e.setSelected(true)
        }
    }
};
function main() {
    var a = new bq.Chessboard;
    a.render();
    a.newGame()
};


