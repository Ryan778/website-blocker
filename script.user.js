// ==UserScript==
// @name         Website Blocker
// @namespace    http://tampermonkey.net/
// @version      0.43
// @description  Blocks non-hw related sites (For Personal Use)
// @author       Ryan
// @match        http*://*/*
// @grant        none
// @run-at       document-start
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
    function genSecCode(){
        var d = new Date();
        var a = Math.pow((d.getDate()*4),Math.abs((d.getDay()-14))+1);
        a *= (d.getHours()+5);
        a += d.getYear();

        var a1 = Math.round(a/(d.getDay()+1));
        while (a1.toString().length <= 12){
            a1 *= (Math.abs(Math.round((d.getDate()-14)/2))+4);
            a1 += d.getFullYear();
        }
        a1 = btoa(a1.toString() + a1.toString()).substr(0,24);
        return a1;
    }

    'use strict';
    if(!!location.href.match(/http.*:\/\//)){
        var allowed = ['www.chesskid.com', 'live.chesskid.com', 'app.readingeggs.com', 'new.readingeggspress.com', 'student.mathseeds.com', 'sso.readingeggs.com', 'kidsa-z.com', 'learnersdictionary.com', 'www.learnersdictionary.com', '10.10.1.140', '67.173.228.237', 'www.kidsa-z.com', 'www.google.com', 'zac.psdschools.org', 'www.psdschools.org', 'kin.psdschools.org', 'ryan778.herokuapp.com', 'www.typingtest.com', 'hosted124.renlearn.com', 'www.adaptedmind.com', 'adaptedmind.com', 'www.spellingcity.com', 'www.khanacademy.org', 'cdn.kastatic.org', 'code.org', 'studio.code.org', 'g.co', 'codecademy.com', 'scratch.mit.edu', 'web.mit.edu', 'app.vidcode.io', 'csfirst.withgoogle.com', 'santatracker.google.com', 'www.typingclub.com', 'zachfc.typingclub.com', 'typeracer.com', 'play.typeracer.com', 'www.beestar.org', 'xtramath.org', 'ryan778.azurewebsites.net', 'www.nitrotype.com', 'fs.psdschools.org', 'k12integrations.pearsoncmg.com'];
        var exception = false;
        var title = (document.getElementsByTagName('title').length>0?document.getElementsByTagName('title')[0].innerHTML:'');
        if(location.pathname === '/guides/z3c6tfr' && location.hostname === 'www.bbc.co.uk' || location.hostname === 'play.bbc.co.uk' && title.indexOf('Dance Mat Typing') !== -1){exception = true}
        var blacklisted = false;
        var containsProfanity = false;
        var lh = location.href.toLowerCase();
        var profanity = ['f\x75ck', 'sh\x69t', 'b\x69tch', 'd\x69ck', 'n\x69gg\x65r', 'p\x6frn', 'poop', 'pee ', 'pee%20']; //Includes profanity as well as some other words
        for(var i = 0; i < profanity.length; i++){
            if(lh.indexOf(profanity[i]) !== -1){
                containsProfanity = true;
            }
        }
        if(location.hostname === '67.173.228.237:8081'){
            if(location.pathname === '/riley/games/'){blacklisted = true}
            else if(location.pathname === '/riley/yt/player.html'){blacklisted = true}
            else if(location.pathname === '/riley/ata/'){blacklisted = true}
            else if(location.pathname === '/riley/spinner/'){blacklisted = true}
        }
        if(location.host === '67.173.228.237:8081'){
            if(location.pathname.indexOf('riley') !== -1 && !blacklisted){
                exception = true
            }
        }
        if(location.host === 'ryan778.github.io' && location.pathname === '/flop/' || location.host === 'ryan778.github.io' && location.pathname === '/ad-blocked/' || location.host === 'ryan778.github.io' && location.pathname === '/kevinspin/'){
            exception = true
        }
        if(containsProfanity){
            window.open('http://67.173.228.237:8081/riley/page-blocked/?goback=1&reason=profanity&targetsite='+location.href,'_self');
        }
        if(location.hostname === 'www.google.com'){
            if(location.pathname.indexOf('recaptcha') !== -1 && location.href.indexOf('search?') === -1){
                exception = true;
            }
            else if(location.href.indexOf('search?') !== -1 || location.href.indexOf('newtab') === -1){
                blacklisted = true;
            }
        }
        if(location.hostname === 'www.chesskid.com'){
            let blocked_videos = ['an-introduction-to-chess', 'the-magic-of-chess', 'check2', 'checkmate3', 'stalemate', 'help-needed', 'king-and-queen-mate', 'rook-roller2', 'castling', 'special-pawn-moves2', 'back-rank-mate', 'first-moves---part-1', 'first-moves---part-2', 'first-steps---part-2'];
            for(let i = 0; i < blocked_videos.length; i++){
                if(location.pathname === '/video/player/'+blocked_videos[i] || location.pathname === '/lessons/video/'+blocked_videos[i]){
                    blacklisted = true;
                }
            }
            if(location.pathname.indexOf('making-chess-fun-with-chesskid-gifs') !== -1){
                blacklisted = true;
            }
            if(document.getElementsByClassName('puzzles-try-again').length > 0){
                if(document.getElementsByClassName('puzzles-try-again')[0].offsetHeight !== 0){
                    document.getElementsByClassName('puzzles-next')[0].style.display = 'none';
                    document.getElementsByClassName('puzzles-solution')[0].style.display = 'none';
                }
            }
        }
        if(location.host === '10.10.1.140:8092' && location.pathname.indexOf('movies') !== -1 && location.pathname.indexOf('watch') !== -1){
            exception = true;
        }
        if(allowed.indexOf(location.hostname) === -1 && !exception || blacklisted){
            if(location.hash.slice(1) === genSecCode()){
                location.hash = '#sp:unblock';
                alert('This website has been temporarily unblocked.\nDuration: One session (max 1 hour)');
                sessionStorage.wb_secCodeSingleUse = Date.now();
                return true;
            }
            if(sessionStorage.wb_secCodeSingleUse){
                let d = parseInt(sessionStorage.wb_secCodeSingleUse);
                if(Date.now() < d + 3600000){
                    return true; //Temporary authorization
                }
            }
            window.open('http://67.173.228.237:8081/riley/page-blocked/?goback=1&targetsite='+location.href,'_self');
        }
        var restrictedSites = ['10.10.1.140:8092','10.10.1.140:8097','10.10.1.140:8091', 'ryan:8092', 'ryan:8097', 'ryan:8091', '67.173.228.237:8081', 'ryan778.github.io', 'www.nitrotype.com'];
        if(restrictedSites.indexOf(location.host) !== -1 && location.pathname.indexOf('api') === -1 && !exception || location.host === 'ryan778.github.io' && location.pathname === '/flop/'){
            var hash = location.hash.slice(1);
            if(sessionStorage.wb_tempCode === genCode()){
                //OK
                return;
            }
            else if(hash === ''){
                let p = window.prompt('It appears that no access code was provided, but you\'ll need one in order to access this page. \n\nIf you have one, enter it here and press OK.');
                if(p === genCode()){
                    alert('Access code validated. You will not need to enter the code again for the rest of this current session.');
                    sessionStorage.wb_tempCode = genCode();
                }
                else if (!p){
                    document.write('');
                    window.open('http://67.173.228.237:8081/riley/page-blocked/?reason=accessCode&goback=1','_self');
                }
                else{
                    document.write('');
                    alert('Invalid Access Code entered.\nIf you believe this is an error, please contact Ryan.');
                    window.open('http://67.173.228.237:8081/riley/page-blocked/?reason=accessCode&goback=1','_self');
                }
            }
            else if(hash !== genCode()){
                document.write('');
                alert('Invalid Access Code.\nIf you believe this is an error, please contact Ryan.');
                window.open('http://67.173.228.237:8081/riley/page-blocked/?reason=accessCode&goback=1','_self');
            }
        }
        if(document.getElementsByTagName('iframe')){
            let iframes = document.getElementsByTagName('iframe');
            for(let i = 0; i < iframes.length; i++){
                let blacklsitedIframes = ['https://www.youtube.com/embed/Ut22hTc0Qdw'];
                if(blacklsitedIframes.indexOf(iframes[i].src) !== -1){
                    iframes[i].src = ''
                }
            }
        }
    }
})();
