//lichen, http://leechan.me/, 2012/12/15, MIT
;(function(w) {
    var is_supports = (function() {
            return 'onhashchange' in window && (document.documentMode === undefined || document.documentMode > 7);
        })(),

        hashChange = function(hashVal) {
            applyMatchMethod(hashVal);
            catchMethod[hashVal] && catchMethod[hashVal].call(this, hashVal);
        },
    //æ ¹æ®hashå€¼åŒ¹é…*å·é€šé…ç¬¦ï¼Œè°ƒç”¨åŒ¹é…ä¸Šçš„å¯¹åº”çš„æ–¹æ³•
        applyMatchMethod = function(hashVal) {
            for(var i = 0, len = catchAdaptation.length; i < len; i++) {
                if(hashVal.indexOf(catchAdaptation[i]) !== -1 && catchAdaptation[i].length + 1 <= hashVal.length) {
                    catchMethod[catchAdaptation[i] + '*'] && catchMethod[catchAdaptation[i] + '*'].call(this, hashVal);
                }
            }
        },
    //ie6,7ä¸æ”¯æŒhashchangeï¼Œç”¨iframeæ¥æ¨¡æ‹Ÿå¹¶äº§ç”Ÿæµè§ˆå™¨åŽ†å²è®°å½•
        initIframe = function() {
            iframe = document.createElement('iframe');
            iframe.style.display = "none";
            iframe.setAttribute('tabindex', '-1');
            iframe.setAttribute('title', 'empty');
            document.body.appendChild(iframe);

            iframe_content = iframe.contentWindow;
            iframe.onload = function() {
                this.onload = null;
                loopTimeId || loopListen();
            }

            iframe.src = "javascript:false;";
        },

        get_hash = function(url) {
            url = url || location.href;
            /*return '#' + url.replace(/^[^#]*#?(.*)$/, '$1');*/
            return '#' + url.replace(/^[^#!]*#?\/(.*)$/, '$1');
        },

        set_history = function(hash, history_hash) {
            var doc = iframe_content.document;
            if (hash !== history_hash) {
                doc.title = document.title;
                doc.open();
                doc.close();
                iframe_content.location.hash = hash;
            }
        },

        fixHashChange = function() {
            initIframe();
        },

        loopListen = function() {
            var hash = get_hash(),
                history_hash = get_hash(iframe_content.location.href);
            if (hash != last_hash) {
                last_hash = hash;
                set_history(hash, history_hash);
                hashChange(hash.replace('#', ''));
            } else if (history_hash != last_hash) {
                location.href = location.href.replace(/#.*/, '') + history_hash;
            }

            loopTimeId = setTimeout(loopListen, loopTimer);
        };

    var catchMethod = {}, catchAdaptation  = [], //ä¿å­˜å¸¦æœ‰*å·é€šé…ç¬¦çš„åŒ¹é…hash
        iframe, iframe_content, loopTimeId = null, loopTimer = 100, last_hash = get_hash();

    w.hashRouter = function(opt) {
        for(var name in opt) {
            var methods = name.replace(/\s/g, '').split(',');
            for(var i = 0, len = methods.length; i < len; i++) {
                if(!catchMethod[methods[i]]) {
                    catchMethod[methods[i]] = opt[name];
                } else {
                    catchMethod[methods[i]] = (function(preMd, nowMd) {
                        return function() {
                            nowMd.apply(this, arguments);
                            preMd.apply(this, arguments);
                        }
                    })(catchMethod[methods[i]], opt[name]);
                }
                if(methods[i].indexOf('*') !== -1) {
                    catchAdaptation.push(methods[i].replace('*', ''));
                }
            }
        }
        if(is_supports) {
            hashChange(location.hash.replace('#!/',''));
            w.onhashchange = function() {
                hashChange(location.hash.replace('#!/',''));
            }
        } else {
            fixHashChange();
        }
    }

    w.hashRouter.stop = function() {
        loopTimeId && clearTimeout(loopTimeId);
    }
})(window)