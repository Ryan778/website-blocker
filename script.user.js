// ==UserScript==
// @name         Website Blocker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Blocks non-hw related sites
// @author       Ryan
// @match        http*://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Ryan778/website-blocker/master/script.user.js
// @downloadURL  https://raw.githubusercontent.com/Ryan778/website-blocker/master/script.user.js
// @include http://*/*
// @include https://*/*
// @grant unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    if(!!location.href.match(/http.*:\/\//)){
        var allowed = ['app.readingeggs.com', 'student.mathseeds.com', 'kidsa-z.com', 'learnersdictionary.com', 'www.learnersdictionary.com', '10.10.1.140', '50.155.208.17', 'www.kidsa-z.com', 'www.google.com'];
        var exception = false;
        var title = (document.getElementsByTagName('title').length>0?document.getElementsByTagName('title')[0].innerHTML:'');
        if(location.pathname === '/guides/z3c6tfr' && location.hostname === 'www.bbc.co.uk' || location.hostname === 'play.bbc.co.uk' && title.indexOf('Dance Mat Typing') !== -1){exception = true}
        if(allowed.indexOf(location.hostname) === -1 && !exception || location.hostname === 'www.google.com' && location.href.indexOf('q=') !== -1){
            window.open('http://50.155.208.17:8081/riley/page-blocked/?goback=1','_self');
        }
    }
})();
