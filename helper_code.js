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

    helperObject.checkPageForChanges = function() {
        var players = document.getElementsByClassName('audio-player');
        console.log('** Players count: ' + players.length);

        var hidden = document.getElementsByClassName('hidden-audio');
        if (hidden.length > 0) {
            console.log('** Player is hidden now.');
            return;
        }

        if (players && players.length > 0) {
            console.log('** Replacing player content...');
            helperObject.replaceMp3(players[0]);
            document.getElementById('memriseMp3').value = helperObject.getFileName(players[0].href);
        }
    }

    helperObject.getFileName = function(path) {
        return path.substr(path.lastIndexOf('/') + 1);
    }

    helperObject.replaceMp3 = function(player) {
        var needReplace = true;

        if (player.replaceIndex) {
            var mp3 =  helperObject.getFileName(player.href);
            if (helperObject.vocabulary[player.replaceIndex].mp31 == mp3
            || helperObject.vocabulary[player.replaceIndex].mp32 == mp3) {
                needReplace = false;
                console.log('** Mp3 already replaced.');
            }
        }

        if (needReplace) {
            var memriseMp3 = helperObject.getFileName(player.href);
            var index = helperObject.indexOf(memriseMp3);

            if (index > -1) {
                player.href = helperObject.replacePath + helperObject.vocabulary[index].mp31;
                player.replaceIndex = index;

                if (helperObject.vocabulary[index].mp32 !== ''
                && helperObject.vocabulary[index].mp32 !== undefined
                && helperObject.vocabulary[index].mp32 !== null) {
                    var player2 = player.cloneNode(true);
                    player2.href = helperObject.replacePath + helperObject.vocabulary[index].mp32;
                    player2.replaceIndex = index;
                    player.parentElement.appendChild(player2);
                }

                console.log('** Mp3 replaced.');
            }
            else {
                console.log('** Matching mp3 not found.');
            }
        }
    }
})();
