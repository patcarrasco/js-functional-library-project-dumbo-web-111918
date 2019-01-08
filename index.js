fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      if (Array.isArray(collection)) {
        for (let i=0; i < collection.length; i++) {
          callback(collection[i], i, collection)
        }
      } else {
        for (let i=0; i < Object.keys(collection).length; i++) {
          callback(collection[Object.keys(collection)[i]], Object.keys(collection)[i], collection)
        }
      }
      return collection
    },

    map: function(collection, callback) {
      const newArray = []
      if (Array.isArray(collection)) {
        for (let i=0; i < collection.length; i++) {
          newArray.push(callback(collection[i], i, collection))
        }
      } else {
        for (let i=0; i < Object.keys(collection).length; i++) {
          newArray.push(callback(collection[Object.keys(collection)[i]], Object.keys(collection)[i], collection))
        }
      }
      return newArray
    },

    reduce: function(collection, callback, acc) {
      acc = acc || 0
      for (let i=0; i < collection.length; i++) {
        acc = callback(acc, collection[i], collection) // takes in NEW accumulator at every run, therefore no need to +=
      }
      return acc
    },

    find: function(collection, predicate) {
      if (!Array.isArray(collection))
        collection = Object.keys(collection)

      for (let i = 0; i < collection.length; i++)
        if (predicate(collection[i]))
          return collection[i]
      return undefined
    },

    filter: function (collection, predicate) {
      if (!Array.isArray(collection))
        collection = Object.keys(collection)

      let newArray = []
      for (let i = 0; i < collection.length; i++)
        if (predicate(collection[i]))
          newArray.push(collection[i])
      return newArray

    },

    size: function(collection) {
      if (!Array.isArray(collection))
        collection = Object.keys(collection)
      sum = 0
      for (let i = 0; i < collection.length; i++)
        sum+= 1
      return sum
    },

    first: function(array, n) {
      return (!!n) ? array.slice(0, n) : array[0]
    },

    last: function(array, n) {
      return (!!n) ? array.slice(array[array.length - 1 - n], array[array.length]) : array[array.length - 1];
    },

    compact: function(array) {
      const newArray = [];
      for (let i = 0; i < array.length; i++)
        if (!!array[i])
          newArray.push(array[i])
      return newArray
    },

    sortBy: function(array, callback) {
      const newArray = array.slice();
      newArray.sort( function(a,b) {return callback(a) - callback(b)})
      return newArray
    },

    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(array, shallow) {

      if (shallow) {
        newArr = [];
        for (let element of array) {
          Array.isArray(element) ? this.unpack(newArr, element) : newArr.push(element)
        }
        return newArr
      }

      if (Array.isArray(array)) {
        const usedArrays = new Set();
        usedArrays.add(array);
        const newArr = [];
        (function flatten(array) {
          for (const element of array) {
            if (Array.isArray(element)) {
              if (!usedArrays.has(element) ) {
                usedArrays.add(element)
                flatten(element)
                    }
            } else {
              newArr.push(element)
            }
          }
        })(array)
        return newArr;
        }

      return array;
    },

    uniqSort: function(collection, callback) {
    const sorted = [collection[0]]
    for (let i = 1; i < collection.length; i++) {
      if (sorted[i-1] !== collection[i])
        sorted.push(collection[i])
    }
    return sorted
    },

  uniq: function(collection, sorted=false, callback=false) {
    if (sorted) {
      return fi.uniqSort(collection, callback)
    } else if (!callback) {
      return Array.from(new Set(collection))
    } else {
      const modifiedVals = new Set()
      const uniqVals = new Set()
      for (let val of collection) {
        const moddedVal = callback(val)
        if (!modifiedVals.has(moddedVal)) {
          modifiedVals.add(moddedVal)
          uniqVals.add(val)
        }
      }
      return Array.from(uniqVals)
    }
    },

    keys: function(object) {
      // Using for loop
      const keys = []
      for (let k in object){
        keys.push(k)
      }
      return keys
    },

    values: function(object) {
      // Using for loop
      const values = []
      for (let k in object){
        values.push(object[k])
      }
      return values

      // Using the custom 'map' method from above
      // return this.map(obj, (value) => value)

    },

    functions: function(object) {
     const functionNames = []
     for (let k in object) {
       if (typeof object[k] === "function"){
         functionNames.push(k)
       }
     }
     return functionNames.sort()
   },

   giveMeMore: function() {
     return "come get more things to do from an instructor"
   },


  }
})()

fi.libraryMethod()
