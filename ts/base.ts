let arr: number[] = [1, 2, 3]
let arr1: [string, number] = ['1', 2]

// 对象 interface
interface Person {
    readonly id: number;
    name: string;
    age?: number;
}
let p: Person = {
    id: 1,
    name: 'c'
}
// p.id = 2  // error

// 函数 interface
interface ISum {
    (x: number, y: number, z?: number): number;
}
let add: ISum = (x, y, z = 0) => {
    return x + y + z
}
add(1, 2, 3)
// add(1, '2', 3) // error

// 联合类型(union types)
let numberOrString: number | string
numberOrString = 1
numberOrString = '2'

// 类型断言(type assertion)
function getLength(input: string | number): number {
    const str = input as string
    if (str.length) {
        return str.length
    } else {
        const number = input as number
        return number.toString().length
    }
}

// 类型守卫(type guard)
function getLength2(input: string | number): number {
    if (typeof input === 'string') {
        return input.length
    } else {
        return input.toString().length
    }
}

