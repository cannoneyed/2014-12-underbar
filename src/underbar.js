/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    }
    else if (n > array.length) {
      n = array.length;
    }

    return array.slice(array.length - n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // Test whether passed collection is an array
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
    else {
      for (var k in collection) {
        iterator(collection[k], k, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var results = [];
    _.each(collection, function (item) {
      if (test(item)) {
        results.push(item);
      }
    });

    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection, function (item) {
      return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var results = [];
    for (var i = 0; i < array.length; i++) {
      if (_.indexOf(results, array[i]) === -1) {
        results.push(array[i]);
      }
    }
    return results;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    for (var i = 0; i < collection.length; i++) {
      collection[i] = iterator(collection[i]);
    }
    return collection;
  };
  // !!!!!!!!!!!!!!!!!!!!!
  // This implementation of map modifies the passed array, which might
  // not be the actual way to implement this function. It may need to
  // make a copy of the passed array to ensure that the iterator function
  // can access all of the passed array.

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Calls the method named by functionOrKey on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function (item) {
      return item[functionOrKey] ? item[functionOrKey](args) :
                                   functionOrKey.apply(item, args);
    });
  };


  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!
    // This seems very much like a mistake in implementation - I can't imagine
    // one would want the function to begin with the initial value AND iterate
    // over the initial value of the collection if no initial value is specified
    accumulator = accumulator === undefined ? collection[0] : accumulator;
    // !!!!!!!!!!!!!!!!!!!!!!!!!!
    // This implementation makes a lot more sense, at least for addition
    //accumulator = accumulator === undefined ? 0 : accumulator;

    _.each(collection, function (item) {
      accumulator = iterator(accumulator, item);
    });

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // If an empty collection is passed, return true
    if (collection.length === 0 || Object.keys(collection).length === 0) {
      return true;
    }

    // If no truth test is passed, treat each item as a callback result
    if (!iterator) {
      iterator = _.identity;
    }

    return _.reduce(collection, function (accumulator, item) {
        return (!!iterator(item) && (accumulator === true));
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // If no truth test is passed, treat each item as a callback result
    if (!iterator) {
      iterator = _.identity;
    }

    return !_.every(collection, function (item) {
      return !iterator(item);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var args = Array.prototype.slice.call(arguments);
    var froms = args.slice(1, args.length);

    for (var i=0; i < froms.length; i++) {
      for (var key in froms[i]) {
        obj[key] = froms[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var args = Array.prototype.slice.call(arguments);
    var froms = args.slice(1, args.length);

    for (var i=0; i < froms.length; i++) {
      for (var key in froms[i]) {
        if (obj[key] === undefined) {
          obj[key] = froms[i][key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    var stored = {};
    var result;

    // By using the array-form of the arguments as the key in the key-result
    // pair, this implementation is ensured to work when a function with multiple
    // arguments is memoized
    return function() {
      var key = Array.prototype.slice.call(arguments);

      if (stored[key] === undefined) {
        result = func.apply(this, arguments);
        stored[key] = result;
      } else {
        result = stored[key];
      }

      return result;
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments);
    setTimeout(function () { func.apply(this, args.slice(2, args.length));
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var copy = array.slice();
    for (var i = 0; i < copy.length; i++) {
      var pos = Math.floor(Math.random(copy.length));
      var temp = copy[pos];
      copy[pos] = copy[i];
      copy[i] = temp;
    }
    return copy;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof iterator === 'function') {
      collection.sort(function (left, right) {
        left = iterator(left);
        right = iterator(right);
        if (left > right) return 1;
        if (left < right) return -1;
      });
    } else if (typeof iterator === 'string') {
      collection.sort(function (left, right) {
        left = left[iterator];
        right = right[iterator];
        if (left > right) return 1;
        if (left < right) return -1;
      })
    }
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var results = [];
    var args = Array.prototype.slice.call(arguments);
    var longest = _.map(args, function (arr) { return arr.length;
      }).sort()[args.length - 1];

    for (var item = 0; item < longest; item++) {
      var toAdd = [];
      for (var arr = 0; arr < args.length; arr++) {
        toAdd.push(arguments[arr][item]);
      }
      results.push(toAdd);
    }

    return results;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var flattened = [];
    (function flatten (arr) {
      for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          flatten (arr[i]);
        }
        else {
          flattened.push(arr[i]);
        }
      }
    })(nestedArray);

    return flattened;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments);
    var results = [];
    for (var i = 0; i < args[0].length; i++) {
      var count = 0;
      for (var j = 1; j < args.length; j++) {
        if (_.contains(args[j], args[0][i])) {
          count ++;
          break;
        }
      }
      if (count === args.length - 1) {
        results.push(args[0][i]);
      }
    }
    return results;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments);
    var results = [];
    for (var i = 0; i < args[0].length; i++) {
      var count = 0;
      for (var j = 1; j < args.length; j++) {
        if (_.contains(args[j], args[0][i])) {
          count ++;
          break;
        }
      }
      if (count === 0) {
        results.push(args[0][i]);
      }
    }
    return results;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function (func, wait) {
    var result;
    var previous;
    var timeout = null;
    var init = true;

    return function () {
      var args = arguments;
      var now = new Date();

      if (!previous) {
        previous = now;
      }

      var elapsed = now - previous;

      if (elapsed >= wait || init) {
        init = false;
        result = func.apply(this, args);
        previous = now;
      } else if (!timeout) {
        timeout = setTimeout (function () {
          result = func.apply(this, args);
          previous = new Date();
        }, wait - elapsed);
      }

      return result;
    }
  };

}).call(this);
