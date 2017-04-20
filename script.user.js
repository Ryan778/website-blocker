// ==UserScript==
// @name         Website Blocker
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Blocks non-hw related sites (For Personal Use)
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
    function genCode(){
        var d = new Date();
        var a = Math.pow((d.getDate()*3),Math.abs((d.getDay()*2-12)));
        a *= (d.getMonth()+3);
        a += d.getYear();

        var a1 = Math.round(a/(d.getDay()+1));
        while (a1.toString().length <= 6){
            a1 *= (Math.abs(Math.round((d.getDate()-14)/2))+4);
            a1 += d.getFullYear();
        }
        a1 = a1.toString().substr(0,6);
        return a1;
    }
    
    'use strict';
    if(!!location.href.match(/http.*:\/\//)){
        var allowed = ['www.chesskid.com', 'live.chesskid.com', 'app.readingeggs.com', 'student.mathseeds.com', 'kidsa-z.com', 'learnersdictionary.com', 'www.learnersdictionary.com', '10.10.1.140', '50.155.208.17', 'www.kidsa-z.com', 'www.google.com', 'zac.psdschools.org', 'www.psdschools.org', 'kin.psdschools.org'];
        var exception = false;
        var title = (document.getElementsByTagName('title').length>0?document.getElementsByTagName('title')[0].innerHTML:'');
        if(location.pathname === '/guides/z3c6tfr' && location.hostname === 'www.bbc.co.uk' || location.hostname === 'play.bbc.co.uk' && title.indexOf('Dance Mat Typing') !== -1){exception = true}
        var blacklisted = false;
        var containsProfanity = false; 
        var lh = location.hostname.toLowerCase(); 
        var profanity = ['f\x75ck', 'sh\x69t', 'b\x69tch', 'd\x69ck', 'n\x69gg\x65r'];
        for(var i = 0; i < profanity.length; i++){
            if(lh.indexOf(profanity[i]) !== -1){
                containsProfanity = true;
            }
        }
        if(location.hostname === '50.155.208.17:8081'){
            if(location.pathname === '/riley/games/'){blacklisted = true}
            else if(location.pathname === '/riley/yt/player.html'){blacklisted = true}
        }
        if(containsProfanity){
            window.open('http://50.155.208.17:8081/riley/page-blocked/?goback=1&reason=profanity&targetsite='+location.href,'_self');
        }
        if(allowed.indexOf(location.hostname) === -1 && !exception || location.hostname === 'www.google.com' && location.href.indexOf('q=') !== -1 || blacklisted){
            window.open('http://50.155.208.17:8081/riley/page-blocked/?goback=1&targetsite='+location.href,'_self');
        }
        var restrictedSites = ['10.10.1.140:8092','10.10.1.140:8097','10.10.1.140:8091'];
        if(restrictedSites.indexOf(location.host) !== -1 && location.pathname.indexOf('api') === -1){
            var hash = location.hash.slice(1);
            if(hash !== genCode()){
                alert('Invalid Access Code.\nIf you believe this is an error, please contact Ryan.');
                window.open('http://50.155.208.17:8081/riley/page-blocked/?goback=1','_self');
            }
        }
    }
})();
