import { IFileSaver } from '../types/iquest';
import { Quest }      from '../types/quest';

/*
* FileSaver.js
* A saveAs() FileSaver implementation.
*
* By Eli Grey, http://eligrey.com
*
* License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
* source  : http://purl.eligrey.com/github/FileSaver.js
*/

function bom(blob: any, opts: any) {
  if (typeof opts === 'undefined') opts = { autoBom: false };
  else if (typeof opts !== 'object') {
    warn('Deprecated: Expected third argument to be a object');
    opts = { autoBom: !opts };
  }

  // prepend BOM for UTF-8 XML and text/* types (including HTML)
  // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
  if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
    return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
  }
  return blob;
}

function download(url: any, name: any, opts: any) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload       = function () {
    saveAs(xhr.response, name, opts);
  };
  xhr.onerror      = function () {
    error('could not download file');
  };
  xhr.send();
}

function corsEnabled(url: any) {
  const xhr = new XMLHttpRequest();
  // use sync to avoid popup blocker
  xhr.open('HEAD', url, false);
  try {
    xhr.send();
  } catch (e) { }
  return xhr.status >= 200 && xhr.status <= 299;
}

// `a.click()` doesn't work for all browsers (#465)
function click(node: any) {
  try {
    node.dispatchEvent(new MouseEvent('click'));
  } catch (e) {
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent(
      'click',
      true,
      true,
      window,
      0,
      0,
      0,
      80,
      20,
      false,
      false,
      false,
      false,
      0,
      null,
    );
    node.dispatchEvent(evt);
  }
}

// Detect WebView inside a native macOS app by ruling out all browsers
// We just need to check for 'Safari' because all other browsers (besides Firefox) include that too
// https://www.whatismybrowser.com/guides/the-latest-user-agent/macos
const isMacOSWebView = globalThis.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent);

export const saveAs = (
  // probably in some web worker
  (typeof window !== 'object' || window !== globalThis)
    ? function saveAs() { /* noop */ }

    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView
    : ('download' in HTMLAnchorElement.prototype && !isMacOSWebView)
      ? function saveAs(blob: any, name: any, opts: any) {
        const URL = globalThis.URL || globalThis.webkitURL;
        const a   = document.createElement('a');
        name      = name || blob.name || 'download';

        a.download = name;
        a.rel      = 'noopener'; // tabnabbing

        // TODO: detect chrome extensions & packaged apps
        // a.target = '_blank'

        if (typeof blob === 'string') {
          // Support regular links
          a.href = blob;
          if (a.origin !== location.origin) {
            corsEnabled(a.href)
              ? download(blob, name, opts)
              // ts-error-fixed ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
              : click(a, a.target = '_blank');
          } else {
            click(a);
          }
        } else {
          // Support blobs
          a.href = URL.createObjectURL(blob);
          setTimeout(() => {
            URL.revokeObjectURL(a.href);
          }, 4E4); // 40s
          setTimeout(() => {
            click(a);
          }, 0);
        }
      }

      // Use msSaveOrOpenBlob as a second approach
      : 'msSaveOrOpenBlob' in navigator
        ? function saveAs(blob: any, name: any, opts: any) {
          name = name || blob.name || 'download';

          if (typeof blob === 'string') {
            if (corsEnabled(blob)) {
              download(blob, name, opts);
            } else {
              const a  = document.createElement('a');
              a.href   = blob;
              a.target = '_blank';
              setTimeout(() => {
                click(a);
              });
            }
          } else {
            navigator.msSaveOrOpenBlob(bom(blob, opts), name);
          }
        }

        // Fallback to using FileReader and a popup
        : function saveAs(blob: any, name: any, opts: any, popup: any) {
          // Open a popup immediately do go around popup blocker
          // Mostly only available on user interaction and the fileReader is async so...
          popup = popup || open('', '_blank');
          if (popup) {
            popup.document.title = popup.document.body.innerText = 'downloading...';
          }

          if (typeof blob === 'string') return download(blob, name, opts);

          const force       = blob.type === 'application/octet-stream';
          const isSafari    = /constructor/i.test(globalThis.HTMLElement) || globalThis.safari;
          const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

          if ((isChromeIOS || (force && isSafari) || isMacOSWebView) && typeof FileReader !== 'undefined') {
            // Safari doesn't allow downloading of blob URLs
            const reader     = new FileReader();
            reader.onloadend = function () {
              let url = reader.result;
              // ts-error-fixed ts-migrate(2531) FIXME: Object is possibly 'null'.
              url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
              if (popup) popup.location.href = url;
              // ts-error-fixed ts-migrate(2322) FIXME: Type 'string | ArrayBuffer | null' is not assignab... Remove this comment to see the full error message
              else location = url;
              popup = null; // reverse-tabnabbing #460
            };
            reader.readAsDataURL(blob);
          } else {
            const URL = globalThis.URL || globalThis.webkitURL;
            const url = URL.createObjectURL(blob);
            if (popup) popup.location = url;
            else location.href  = url;
            popup = null; // reverse-tabnabbing #460
            setTimeout(() => {
              URL.revokeObjectURL(url);
            }, 4E4); // 40s
          }
        }
);

export const FileSaver: IFileSaver = {
  bom,
  click,
  corsEnabled,
  download,
  isMacOSWebView,
  saveAs,
};

Quest.FileSaver = FileSaver;
