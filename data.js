(function helperObjectDataMethods() {
    if (typeof helperObject == 'undefined' || helperObject == null) {
        console.log('** helperObjectData(): creating object.');
        helperObject = {};
    }
    else {
        console.log('** helperObjectData(): helperObject already exists.');
    }

    if (helperObject.vocabulary === undefined || helperObject.vocabulary === null) {
        helperObject.vocabulary = [];
    }

    helperObject.addOrUpdateData = function(mp3Memrise, mp3New1, mp3New2) {
        helperObject.vocabulary = JSON.parse(window.localStorage.getItem('memriseVocabulary'));

        var index = helperObject.indexOf(mp3Memrise);

        var vocEntry = {
            id: mp3Memrise,
            mp31: mp3New1,
            mp32: mp3New2
        };

        if (index >= 0) {
            helperObject.vocabulary[index] = vocEntry;
        }
        else {
            helperObject.vocabulary.push(vocEntry);
        }

        console.log('** Data loaded from the storage.');
    }

    helperObject.loadData = function() {
        helperObject.vocabulary = JSON.parse(window.localStorage.getItem('memriseVocabulary'));

        console.log('** Data loaded from the storage.');
    }

    helperObject.deleteData = function() {
        helperObject.vocabulary = window.localStorage.removeItem('memriseVocabulary');

        console.log('** Data deleted.');
    }

    helperObject.saveData = function() {
        if (helperObject.vocabulary !== undefined) {
            window.localStorage.setItem('memriseVocabulary', JSON.stringify(helperObject.vocabulary));
            console.log('** Data saved.');
        }
        else {
            console.log('** No data to save.');
        }
    }

    helperObject.uploadData = function() {
        var textarea = document.getElementById('data-details');

        helperObject.vocabulary = JSON.parse(textarea.value);

        console.log('** Data uploaded to the vocabulary object.');
    }

    helperObject.showData = function() {
        var textarea = document.getElementById('data-details');

        if (textarea.style.display == 'none') {
            textarea.style.display = 'inline-block';
            textarea.value = JSON.stringify(helperObject.vocabulary);
        }
        else {
            textarea.style.display = 'none';
            textarea.value = '';
        }
    }

    helperObject.indexOf = function(mp3Memrise) {
        var result = -1;

        for (var i = 0; i < helperObject.vocabulary.length; i++) {
            if (helperObject.vocabulary[i].id == mp3Memrise) {
                result = i;
                break;
            }
        }

        return result;
    }
})();