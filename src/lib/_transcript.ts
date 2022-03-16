// This file is used only for the new tab in which a transcript is displayed.

// @ts-expect-error ts-migrate(2551) FIXME: Property 'download' does not exist on type 'Docume... Remove this comment to see the full error message
document.download = function () {
  // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
  const data     = document.querySelector('#main').innerHTML;
  const filename = 'transcript.html';
  const file     = new Blob([data], { type: 'text/html' });
  const a        = document.createElement('a');
  const url      = URL.createObjectURL(file);
  a.href         = url;
  a.download     = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 0);
};
