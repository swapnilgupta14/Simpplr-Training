function* genertorFuntion(){
    yield 1;
    yield 2;
    yield 3;
}

const generate = genertorFuntion();
console.log(generate);

// next
// return - returns immediately
// throw

console.log(generate.next());
console.log(generate.next());
console.log(generate.next());
console.log(generate.next());

// const generate2 = genertorFuntion();

// console.log(generate2.next());
// console.log(generate2.next());

function* generatorFunction2(){
    const data = yield 'Hello';
    // console.log(data);
}

// const generate3 = generatorFunction2();
// // console.log(generate3.next());

function* generatorFunction3(){
    const data = yield 'Hello';
    // console.log(data);
    yield 'World';
}



const generate4 = generatorFunction3();
// console.log(generate4.next());
// console.log(generate4.next());
// console.log(generate4.next('Data'));


function* generatorFunction4(){
    let id = 1;
    while(true){
        yield id;
        id++;
    }
}

const generate5 = generatorFunction4();
// console.log(generate5.next());
// console.log(generate5.next());
// console.log(generate5.next());
// console.log(generate5.next());