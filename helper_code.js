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

        if (players && players.length) {
            if (!players[0].replaced) {
                document.getElementById('memriseMp3').value = helperObject.getFileName(players[0].href);
                document.getElementById('btnAdd').removeAttribute('disabled');
                console.log('** Replacing player content...');
                players[0].replaced = true;
            }
            else {
                console.log('** Player content replaced.');
            }
        }
    }

    helperObject.getFileName = function(path) {
        return path.substr(path.lastIndexOf('/') + 1);
    }
})();
