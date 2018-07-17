

//块集作用域

let demo = 12
// {
//     let demo = 12
// }
console.log(demo)


//函数默认值

const cm = (name = 'chenming')=>{
    return `this is ${name}` 
}

console.log(cm())
console.log(cm('chmi'))


//展开符
console.log(...['chenming','|','chmi'])


//数组

const obj = {name:"immoc",course:"demo"}

console.log(Object.keys(obj))
console.log(Object.values(obj))
console.log(Object.entries(obj))



class demoObj {
    constructor(){
        this.name = 'chmi'
    }
    sayName(){
        console.log(`this is obj ${this.name}`)
    }
}


const chmiObj = new demoObj()

chmiObj.sayName()


