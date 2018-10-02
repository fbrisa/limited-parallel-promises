var lpp=require("./lpp")



var  numbersToGenerate = 20;
var listOfArguments=[];
while ((numbersToGenerate--)>0) {
    listOfArguments.push(1+parseInt(Math.random()*20,10));
}



var myAsyncFunction = function(delay) {
    return new Promise((resolve, reject) => {
        console.log(`start delay: ${delay}`)
        setTimeout(()=> {
            console.log(delay);
            resolve(delay);
        },delay)
    });
};

// giving the generator function to the library
lpp.setUp(myAsyncFunction,listOfArguments).lpp(5).then(res => {
    console.log("end");
    console.log(res.join(","));
});

// or you can run it like this
// lpp.lpp(3,() => {
//     if (listOfArguments.length===0) {return null;}
//     return myAsyncFunction(listOfArguments.shift());
// }).then(res => {
//     console.log("end");
//     console.log(res.join(","));
// });
