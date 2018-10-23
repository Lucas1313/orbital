/**
 * Heavily inspired by https://github.com/systemjs/systemjs
 * https://github.com/systemjs/systemjs/blob/master/LICENSE
 * 
MIT License
-----------

Copyright (C) 2013-2018 Guy Bedford

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(() => {
  let globalError;
  if (typeof window !== 'undefined') {
    window.addEventListener('error', function (e) {
      globalError = e.error;
    });
  }

  orbital.registerLoader('application/javascript', (src) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.charset = 'utf-8';
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.addEventListener('error', reject);
    script.addEventListener('load', () => {
      document.head.removeChild(script);
      // Note URL normalization issues are going to be a careful concern here
      if (globalError) {
        return reject(globalError);
      } else {
        resolve();
      }
    });
    script.src = url;
    document.head.appendChild(script);
  }));
})();
