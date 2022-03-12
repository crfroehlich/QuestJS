// This file is used only for the new tab in which a transcript is displayed.

"use strict"


// @ts-expect-error ts-migrate(2551) FIXME: Property 'download' does not exist on type 'Docume... Remove this comment to see the full error message
document.download = function() {
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const data = document.querySelector('#main').innerHTML
    const filename = 'transcript.html'
    var file = new Blob([data], {type: 'text/html'});
    var a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
}


