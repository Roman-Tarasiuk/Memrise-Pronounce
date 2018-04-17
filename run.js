function insertBefore(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode);
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

String.prototype.lines = function() { return this.split(/\r*\n/); }
String.prototype.lineCount = function() { return this.lines().length; }

var loggingLevel = '-';

function log(info) {
  if (loggingLevel == 'log') {
    console.log(info);
  }
}

(function init() {
    if (typeof helperObject == 'undefined' || helperObject == null) {
        console.log('** helperObjectCode(): creating object.');
        helperObject = {};
    }
    else {
        console.log('** helperObjectCode(): helperObject already exists.');
    }

    //

    //
    // insertPlace object: {before: element} or {after: element}
    //
    helperObject.run = function(html, insertPlace) {
        console.log('** Adding plugin...');

        var plugin = document.createElement('div');
        plugin.id = 'plugindiv';
        plugin.innerHTML = html;

        if (insertPlace) {
            if (insertPlace.before) {
                insertBefore(plugin, insertPlace.before);
            }
            else if (insertPlace.after) {
                insertAfter(plugin, insertPlace.after);
            }
        }
        else {
            document.body.appendChild(plugin);
        }

        dragElement(plugin);

        console.log('** Plugin added.');

        helperObject.loadData();

        console.log('** Data loaded.');
    }
})();
