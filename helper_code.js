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

    helperObject.getCreationTime = function (str) {
        log('** getCreationTime()');
        var re = /<TEXTAREA class=\"textarea.*?100(?:.|\r\n)*?<\/TEXTAREA>.*\r\n.*\r\n.*\r\n.*\r\n.*\r\n.*/g;
        var reCreation = /<br>(.*)<br>\r\n.*?<br>(.*)/g;
        var result = null;

        var resultTmp = re.exec(str);
        log(resultTmp);
        if (resultTmp != null) {
          var tmp1 = reCreation.exec(resultTmp[0]);
          log(tmp1);
          result = 'Last edition:\t' + tmp1[1] + '\t' + tmp1[2] + '\n';
          log(result);
        }

        log('while');
        var tmp2;
        while ((tmp2 = re.exec(str)) != null) {
          resultTmp = tmp2;
        }
        log('while passed.');

        log(resultTmp);
        if (resultTmp != null) {
          reCreation.lastIndex = 0;
          resultTmp = reCreation.exec(resultTmp[0]);
          log(resultTmp);
          result += '    Creation:\t' + resultTmp[1] + '\t' + resultTmp[2] + '\n';
        }

        log('** getCreationTime() finished');

        // result += str;

        return result;
    }

    helperObject.add = function() {
        if (helperObject.vocabulary === undefined) {
            helperObject.vocabulary = {};
        }

        var idEl = document.getElementById('memriseMp3');
        var newMp3_1El = document.getElementById('newMp3-1');
        var newMp3_2El = document.getElementById('newMp3-2');

        helperObject.vocabulary[idEl.value.toString()] = {
            mp31: newMp3_1El.value,
            mp32: newMp3_2El.value
        }

        idEl.value = '';
        newMp3_1El.value = '';
        newMp3_2El.value = '';

        console.log('** Entry added/updated.');
    }
})();
