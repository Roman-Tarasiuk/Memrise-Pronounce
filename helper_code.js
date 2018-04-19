//
// The function adds properties to the helperObject.
//
(function helperObjectCode() {
    if (typeof helperObject == 'undefined' || helperObject == null) {
        console.log('** helperObjectCode(): creating object.');
        helperObject = {};
    }
    else {
        console.log('** helperObjectCode(): helperObject already exists.');
    }

    //

    helperObject.replacePath = 'http://127.0.0.1:8080/Ogg/';

    helperObject.process = function() {
        console.log('** Processing...');
    }

    helperObject.appendCss = function (css) {
        var cssElement = document.createElement('style');
        cssElement.innerText = css;
        document.head.appendChild(cssElement);
    }

    helperObject.add = function() {
        var idEl = document.getElementById('memriseMp3');
        var newMp3_1El = document.getElementById('newMp3-1');
        var newMp3_2El = document.getElementById('newMp3-2');

        helperObject.addOrUpdateData(idEl.value, newMp3_1El.value, newMp3_2El.value);

        idEl.value = '';
        newMp3_1El.value = '';
        newMp3_2El.value = '';

        console.log('** Entry added/updated.');
    }

    helperObject.startTracking = function() {
        if (helperObject.isTracking) {
            return;
        }

        helperObject.isTracking = true;

        helperObject.trackingInterval = setInterval(function(){
            helperObject.checkPageForChanges();
        }, 1000);
    }

    helperObject.stopTracking = function() {
        if (!helperObject.isTracking) {
            return;
        }

        clearInterval(helperObject.trackingInterval);

        helperObject.isTracking = false;
    }

    var replaceResult = {
        replaced: 0,
        replacedEarlier: 1,
        replacementNotInVocabulary: 2
    };

    var replace = {
        once: 1,
        both: 2
    };

    Object.freeze(replaceResult);
    Object.freeze(replace);

    helperObject.checkPageForChanges = function() {
        var players = document.getElementsByClassName('audio-player');
        if (players == null || !players.length || players.length == 0) {
            console.log('** There is no player.');
            return;
        }

        console.log('** Players count: ' + players.length);

        var result;

        var hidden = document.getElementsByClassName('hidden-audio');
        if (hidden && hidden.length > 0) {
            console.log('** Player is hidden now.');
            result = helperObject.replaceMp3(players[0], replace.once);
        }
        else if (players && players.length > 0) {
            console.log('** Replacing player content...');
            result = helperObject.replaceMp3(players[0], replace.both);
        }

        if (result != replaceResult.replaced
        && result != replaceResult.replacedEarlier) {
            document.getElementById('memriseMp3').value = helperObject.getFileName(players[0].href);
        }
    }

    helperObject.getFileName = function(path) {
        return path.substr(path.lastIndexOf('/') + 1);
    }

    helperObject.replaceMp3 = function(player, replacePlace) {
        var needReplace = true;

        // console.log(player);

        var replaceIndex = player.getAttribute('replaceIndex');
        if (replaceIndex) {
            var mp3 =  helperObject.getFileName(player.href);
            if (helperObject.vocabulary[replaceIndex].mp31 == mp3
            || helperObject.vocabulary[replaceIndex].mp32 == mp3) {
                needReplace = false;
                console.log('** Mp3 already replaced.');
                return replaceResult.replacedEarlier;
            }
        }
        else {
            console.log('** player.replaceIndex is undefined.');
        }

        if (needReplace) {
            var memriseMp3 = helperObject.getFileName(player.href);
            var index = helperObject.indexOf(memriseMp3);

            if (index > -1) {
                player.href = helperObject.replacePath + helperObject.vocabulary[index].mp31;
                player.setAttribute('replaceIndex', index.toString());

                if (replacePlace == replace.both
                && helperObject.vocabulary[index].mp32 !== ''
                && helperObject.vocabulary[index].mp32 !== undefined
                && helperObject.vocabulary[index].mp32 !== null) {
                    var player2 = player.cloneNode(true);
                    player2.href = helperObject.replacePath + helperObject.vocabulary[index].mp32;
                    player.parentElement.appendChild(player2);
                }

                console.log('** Mp3 replaced.');

                return replaceResult.replaced;
            }
            else {
                console.log('** Matching mp3 not found.');

                return replaceResult.replacementNotInVocabulary;
            }
        }

        console.log('** replaceMp3() BUG!');
    }
})();
