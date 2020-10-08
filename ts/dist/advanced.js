"use strict";
// 封装、继承、多态
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 封装
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.run = function () {
        return this.name + " is running";
    };
    return Animal;
}());
var snake = new Animal("lily");
// snake.name = '111' // error
console.log(snake.run());
// 继承
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        return this.name + " is barking";
    };
    return Dog;
}(Animal));
var yanYan = new Dog("yanYan");
console.log(yanYan.run());
console.log(yanYan.bark());
// 多态
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        var _this = _super.call(this, name) || this;
        console.log(_this.name);
        return _this;
    }
    Cat.prototype.run = function () {
        return "Meow," + _super.prototype.run.call(this);
    };
    Cat.categories = ["mammal"];
    return Cat;
}(Animal));
var maoMao = new Cat("maoMao");
console.log(maoMao.run());
console.log(Cat.categories);
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.switchRadio = function () { };
    return Car;
}());
// class CellPhone implements Radio,Battery {
var CellPhone = /** @class */ (function () {
    function CellPhone() {
    }
    CellPhone.prototype.switchRadio = function () { };
    CellPhone.prototype.checkBatteryStatus = function () { };
    return CellPhone;
}());
var value = "UP";
if (value === "UP" /* Up */) {
    console.log("go up！");
}
// generic
// 输入什么类型，输出就是什么类型
function echo(arg) {
    return arg;
}
var result = echo(true);
var result2 = echo("1");
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
var result3 = swap(["string", 123]);
// 交换后可以使用各自的方法
console.log(result3[0].toFixed(), result3[1].length); // 123 6
// 约束泛型
// 泛型函数
function echoWithArr(arg) {
    console.log(arg.length);
    return arg;
}
echoWithArr([1, 2, 3]); // 3
function echoWithLength(arg) {
    console.log(arg.length);
    return arg;
}
echoWithLength('str'); // 3
echoWithLength({ length: 10 }); // 10
echoWithLength([1, 2, 3]); // 3
// echoWithLength(123) // error
// 泛型类
var Queue = /** @class */ (function () {
    function Queue() {
        this.data = [];
    }
    Queue.prototype.push = function (item) {
        return this.data.push(item);
    };
    Queue.prototype.pop = function () {
        // 因为没值的时候 shift 以后是 undefined 所以加上了 undefined
        return this.data.shift();
    };
    return Queue;
}());
var queue = new Queue();
queue.push(1);
var kp1 = {
    key: 1,
    value: 'string'
};
var kp2 = {
    key: 'str',
    value: 2
};
// type 别名
var sum = function (x, y) { return x + y; };
var res = sum(1, 2);
var sum2 = function (x, y) { return x + y; };
var res2 = sum2(2, 3);
var person = {
    name: '123',
    age: 23
};
// declaration files 声明文件
// 一般把声明抽离到 jQuery.d.ts 文件
// declare var jQuery: (selector: string) => any
jQuery('#foo');
var cc = {
    name: 'cc',
    age: 20
};
var cc1 = { name: 'cc1' };
var cc2 = { age: 20 };
