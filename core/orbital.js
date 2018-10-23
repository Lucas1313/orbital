import scriptLoader from './loaders/script';

/**
 * Orbital global definition
 * @version 0.1.0
 * @namespace orbital
 */
const orbital = {
  loaders: new Map([
    ['application/javascript', scriptLoader]
  ]),
  /**
   * @param {string} contentType - Content Type based on https://www.ietf.org/rfc/rfc4329.txt
   * @param {function} handle - Loader function that registers module to orbital
  */
  registerLoader: (contentType, handle) => {
    /** @todo: Throw if a loader is already registered */
    orbital.loaders.set(contentType, handle);
  },

  import: (path) => {
    /** @todo: Module definition */
    /** @todo: Fetch request and fallbacks */
    /** @todo: Content Type detection */
  },
};

window.orbital = orbital;
