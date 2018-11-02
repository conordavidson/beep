/* @flow */
export default (object: Object): Array => Object.keys(object).map(key => object[key])
