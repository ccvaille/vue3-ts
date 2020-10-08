"use strict";
var arr = [1, 2, 3];
var arr1 = ['1', 2];
var p = {
    id: 1,
    name: 'c'
};
var add = function (x, y, z) {
    if (z === void 0) { z = 0; }
    return x + y + z;
};
add(1, 2, 3);
// add(1, '2', 3) // error
// 联合类型(union types)
var numberOrString;
numberOrString = 1;
numberOrString = '2';
// 类型断言(type assertion)
function getLength(input) {
    var str = input;
    if (str.length) {
        return str.length;
    }
    else {
        var number = input;
        return number.toString().length;
    }
}
// 类型守卫(type guard)
function getLength2(input) {
    if (typeof input === 'string') {
        return input.length;
    }
    else {
        return input.toString().length;
    }
}
