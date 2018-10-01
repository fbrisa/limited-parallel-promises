var lpp=require("./lpp")

var  numbersToGenerate = 20;
var examples=[];
while ((numbersToGenerate--)>0) {
    examples.push(parseInt(Math.random()*2000,10));
}

// generator function
var generatorFunction = function() {
    if (examples.length===0) {return null;}

    return new Promise((resolve, reject) => {
        var delay=examples.shift();
        console.log(`start delay: ${delay}`)
        setTimeout(()=> {
            console.log(delay);
            resolve(delay);
        },delay*2)
    });
}

// giving the generator function to the library
lpp(generatorFunction).then(res => {
    console.log("end");
    console.log(res.join(","));
});
// lpp(generatorFunction,3,(meanwhile => {
//     console.log(`meanwhile: ${meanwhile}`)
// })).then(res => {
//     console.log("end");
//     console.log(res.join(","));
// })