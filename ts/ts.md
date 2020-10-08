### 动态类型与静态类型语言

- 动态类型语言
  - 运行期间才会做数据类型检查
  - 例如 `python` `js` `ruby`
- 静态类型语言
  - `C` `C#` `C++`

### TS 的优缺点

- 优点
  - 程序更容易理解
    - 可以直观看到入参类型、返回值类型
  - 效率更高
    - 代码自动补全
    - 代码块和定义中可以跳转
  - 更少的错误
    - 编译期间发现大部分问题
  - 兼容 js，是 js 的超集
- 缺点
  - 开发成本
  - 学习成本

### 数组与元组 tuple

```ts
let arr: number[] = [1, 2, 3];
let arr1: [string, number] = ["1", 2];
```

### interface 接口

```ts
// 对象 interface
interface Person {
  readonly id: number;
  name: string;
  age?: number;
}
let p: Person = {
  id: 1,
  name: "c",
};
// p.id = 2  // error
```

```ts
// 函数 interface
interface ISum {
  (x: number, y: number, z?: number): number;
}
let add: ISum = (x, y, z = 0) => {
  return x + y + z;
};
add(1, 2, 3);
// add(1, '2', 3) // error
```

### 函数是一等公民

- 函数可以作为参数， 可以存入数组，可以被另一个函数返回，可以被赋值给另一个变量

### union types 联合类型

```ts
let numberOrString: number | string;
numberOrString = 1;
numberOrString = "2";
```

### type assertion 类型断言

```ts
function getLength(input: string | number): number {
  const str = input as string;
  if (str.length) {
    return str.length;
  } else {
    const number = input as number;
    return number.toString().length;
  }
}
```

### type guard 类型守卫

```ts
function getLength2(input: string | number): number {
  if (typeof input === "string") {
    return input.length;
  } else {
    return input.toString().length;
  }
}
```

### class 类

- 类：定义了一切事物的抽象特点
- 对象：类的实例
- 面向对象(OOP)三大特性： 封装、继承、多态
- TS 中的类
  - 修饰符
    - `public` - 修饰的属性或方法是共有的
    - `private` - 修饰的属性或方法是私有的
    - `protected` - 修饰的属性或方法是受保护的

### implements 约束类需要实现接口

```ts
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
  switchRadio() {}
}
// class CellPhone implements Radio,Battery {
class CellPhone implements RadioWithBattery {
  switchRadio() {}
  checkBatteryStatus() {}
}
```

### enum 枚举

    - 常量枚举
    - 计算枚举

```ts
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
```

### generic 泛型

```ts
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
// A
function echoWithArr<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}
echoWithArr([1, 2, 3]); // 3

// B
interface IWithLength {
  length: number;
}

function echoWithLength<T extends IWithLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}
echoWithLength("str"); // 3
echoWithLength({ length: 10 }); // 10
echoWithLength([1, 2, 3]); // 3
// echoWithLength(123) // error

// 泛型类
class Queue<T> {
  private data: Array<T> = [];
  push(item: T) {
    return this.data.push(item);
  }
  pop(): T | undefined {
    // 因为没值的时候 shift 以后是 undefined 所以加上了 undefined
    return this.data.shift();
  }
}
const queue = new Queue<number>();
queue.push(1);
// queue.push('ddd') // error

// 泛型接口
interface KeyPair<T, U> {
  key: T;
  value: U;
}
let kp1: KeyPair<number, string> = {
  key: 1,
  value: "string",
};

let kp2: KeyPair<string, number> = {
  key: "str",
  value: 2,
};
```

### alias 类型别名

```ts
// type 别名
let sum: (x: number, y: number) => number = (x, y) => {
  return x + y;
};
const res = sum(1, 2);
type PlusType = (x: number, y: number) => number;
let sum2: PlusType = (x, y) => {
  return x + y;
};
const res2 = sum2(2, 3);

interface IName {
  name: string;
}
type IPerson = IName & { age: number };
let person: IPerson = {
  name: "123",
  age: 23,
};
```

### type 和 interface 的区别

- 使用交叉或者组合类型的时候，一般用 type
- interface 是独特类型，当你需要实现 extends 或者 实现 implements 的时候，一般用 interface
- 其他时候自由使用

### declaration files 声明文件

- 引用第三方库的时候，防止报错
  - 自己写 jQuery.d.ts 文件
  - 或者自己下载 https://www.typescriptlang.org/dt/search?search=

```ts
declare var jQuery: (selector: string) => any;
jQuery("#foo");
```

### utility types 内置类型

```ts
// utility types 内置类型
interface IPerson1 {
  name: string;
  age: number;
}
let cc: IPerson = {
  name: "cc",
  age: 20,
};
// 把属性设置成可选
type IPartial = Partial<IPerson1>;
let cc1: IPartial = { name: "cc1" };

type IOmit = Omit<IPerson, "name">;
let cc2: IOmit = { age: 20 };
```
