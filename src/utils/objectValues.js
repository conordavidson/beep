/* @flow */
export default (object: Object): Array<any> => Object.keys(object).map(key => object[key])
