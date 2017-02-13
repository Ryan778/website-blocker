// ==UserScript==
// @name         Website Blocker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Blocks non-hw related sites
// @author       Ryan
// @match        http*://*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Ryan778/website-blocker/master/userscript.js
// @downloadURL  https://raw.githubusercontent.com/Ryan778/website-blocker/master/userscript.js
// @include http://*/*
// @include https://*/*
// @grant unsafeWindow
// ==/UserScript==

(function() {
    'use strict';
    if(!!location.href.match(/http.*:\/\//)){
        var allowed = ['app.readingeggs.com', 'kidsa-z.com', 'learnersdictionary.com', 'www.learnersdictionary.com', '10.10.1.140', '50.155.208.17', 'www.kidsa-z.com', 'www.google.com'];
        if(allowed.indexOf(location.hostname) === -1 || location.hostname === 'www.google.com' && location.href.indexOf('q=') !== -1){
            window.open('http://50.155.208.17:8081/riley/page-blocked/?goback=1','_self');
        }
    }
})();
