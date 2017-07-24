const hasOwnProp = Object.prototype.hasOwnProperty

// easy type check
export const is = (type) => (what) => typeof what === type
export const isArray = ( what ) => what && ( what.constructor === Array )
export const isObject = is('object')

// list
const contains = ( arr ) => ( elm ) => arr.indexOf( elm ) != -1
const notContains = ( arr ) => ( elm ) => arr.indexOf( elm ) == -1

// combine scoped function
export const combine = (fn1) => (fn2) => function () {
  const newArgs = fn1.apply(fn1, arguments)
  return isArray(newArgs)?
    fn2.apply(fn2, newArgs) :
    fn2(newArgs)
}

// chain multiple functions
export const compose = ( ...funcs ) =>
  funcs.reduce((a, b) => (...args) => a(b(...args)))

// deep set value to object by given path
export const deepset = ( obj, path ) => ( value ) => {
  const top = obj
  const keys = path.split('.');
  for (var i = 0; i < keys.length - 1; i++) {
    var key = keys[i];
    if (!hasOwnProp.call(obj, key)) obj[key] = {};
    obj = obj[key];
  }
  obj[keys[i]] = value;
  return top;
}

// indentity function
export const identity = ( it ) => it

// use given operator to transform values in object
export const transform = ( operator ) => ( object ) =>
  Object.keys( object || {} ).reduce( ( res, key ) => {
    res[key] = operator( key, object[key] )
    return res
  }, {})

// Objects
// remove keys from null values
export const removeNull = (obj) => Object.keys(obj).reduce((res, cur) =>
  obj[cur] != null ?
    Object.assign(res, { [cur]: obj[cur] }) :
    res
  , {})

export const unless = ( fields ) => ( obj ) =>
  Object.keys(obj).filter( notContains( fields ) ).reduce((res, cur) => {
    res[cur] =  obj[cur]
    return res
  }, {})

// Lists
export const first = ( results ) => ( results || [] )[0]
