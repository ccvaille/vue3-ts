// 封装、继承、多态

// 封装
class Animal {
    readonly name: string;
    constructor(name: string) {
        this.name = name;
    }
    run() {
        return `${this.name} is running`;
    }
}

const snake = new Animal("lily");
// snake.name = '111' // error
console.log(snake.run());

// 继承
class Dog extends Animal {
    bark() {
        return `${this.name} is barking`;
    }
}

const yanYan = new Dog("yanYan");
console.log(yanYan.run());
console.log(yanYan.bark());

// 多态
class Cat extends Animal {
    static categories = ["mammal"];
    constructor(name: string) {
        super(name);
        console.log(this.name);
    }
    run() {
        return "Meow," + super.run();
    }
}
const maoMao = new Cat("maoMao");
console.log(maoMao.run());
console.log(Cat.categories);

// implements
interface Radio {
    // 切换收音机
    switchRadio(trigger: boolean): void;
}
interface RadioWithBattery extends Radio {
    checkBatteryStatus(): void;
}
interface Battery {
    checkBatteryStatus(): void;
}

class Car implements Radio {
    switchRadio() { }
}
// class CellPhone implements Radio,Battery {
class CellPhone implements RadioWithBattery {
    switchRadio() { }
    checkBatteryStatus() { }
}

// enum
const enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}

const value = "UP";
if (value === Direction.Up) {
    console.log("go up！");
}

// generic
// 输入什么类型，输出就是什么类型
function echo<T>(arg: T): T {
    return arg;
}
const result = echo(true);
const result2 = echo("1");

function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}
const result3 = swap(["string", 123]);
// 交换后可以使用各自的方法
console.log(result3[0].toFixed(), result3[1].length); // 123 6

// 约束泛型
// 泛型函数
function echoWithArr<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
}
echoWithArr([1, 2, 3]) // 3

interface IWithLength {
    length: number;
}

function echoWithLength<T extends IWithLength>(arg: T): T {
    console.log(arg.length)
    return arg
}
echoWithLength('str') // 3
echoWithLength({ length: 10 }) // 10
echoWithLength([1, 2, 3]) // 3
// echoWithLength(123) // error

// 泛型类
class Queue<T>{
    private data: Array<T> = [];
    push(item: T) {
        return this.data.push(item)
    }
    pop(): T | undefined {
        // 因为没值的时候 shift 以后是 undefined 所以加上了 undefined
        return this.data.shift();
    }
}
const queue = new Queue<number>();
queue.push(1)
// queue.push('ddd') // error

// 泛型接口
interface KeyPair<T, U> {
    key: T,
    value: U
}
let kp1: KeyPair<number, string> = {
    key: 1,
    value: 'string'
}

let kp2: KeyPair<string, number> = {
    key: 'str',
    value: 2
}


// type 别名
let sum: (x: number, y: number) => number = (x, y) => { return x + y }
const res = sum(1, 2)
type PlusType = (x: number, y: number) => number
let sum2: PlusType = (x, y) => { return x + y }
const res2 = sum2(2, 3)

interface IName {
    name: string;
}
type IPerson = IName & { age: number }
let person: IPerson = {
    name: '123',
    age: 23
}

// declaration files 声明文件
// 一般把声明抽离到 jQuery.d.ts 文件
// declare var jQuery: (selector: string) => any
jQuery('#foo')

// utility types 内置类型
interface IPerson1 {
    name: string;
    age: number;
}
let cc: IPerson = {
    name: 'cc',
    age: 20
}
// 把属性设置成可选
type IPartial = Partial<IPerson1>
let cc1: IPartial = { name: 'cc1' }

type IOmit = Omit<IPerson, 'name'>
let cc2: IOmit = { age: 20 }