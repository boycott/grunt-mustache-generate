'use strict';
/**
 * Deep merges two Objects.
 *
 * @param target {Object} Object to merge.
 * @param src {Object} Object to be merged in.
 * @param alwaysPush {Boolean} Push array items rather than merge.
 *
 * @return dst {Object} Merged Object.
*/
module.exports = function (target, src, alwaysPush) {
  var array = Array.isArray(src),
    dst = array && [] || {};

  if (array) {
    target = target || [];
    dst = dst.concat(target);

    src.forEach(function (e, i) {
      if (typeof dst[i] === 'undefined' && !alwaysPush) {
        dst[i] = e;
      } else if (typeof e === 'object' && !alwaysPush) {
        dst[i] = merge(target[i], e, options);
      } else if (target.indexOf(e) === -1) {
        dst.push(e);
      }
    });

  } else {
    if (target && typeof target === 'object') {
      Object.keys(target).forEach(function (key) {
        dst[key] = target[key];
      });
    }

    Object.keys(src).forEach(function (key) {
      if (typeof src[key] !== 'object' || !src[key]) {
        dst[key] = src[key];
      }
      else {
        if (!target[key]) {
          dst[key] = src[key];
        } else {
          dst[key] = merge(target[key], src[key], alwaysPush);
        }
      }
    });
  }
  return dst;
}
