(function helperObjectData() {
    if (typeof helperObject == 'undefined' || helperObject == null) {
        console.log('** helperObjectData(): creating object.');
        helperObject = {};
    }
    else {
        console.log('** helperObjectData(): helperObject already exists.');
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
})();