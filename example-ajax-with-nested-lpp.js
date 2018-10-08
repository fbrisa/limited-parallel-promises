var lpp = require("./lpp")
const axios = require('axios');


var numbersToGenerate = 20;
var listOfArguments = [];
while ((numbersToGenerate--) > 0) {
    listOfArguments.push(1 + parseInt(Math.random() * 20, 10));
}



var myAsyncFunction = function (id) {
    return new Promise((resolve, reject) => {
        console.log(`start id: ${id}`)

        axios.get('https://jsonplaceholder.typicode.com/todos/' + id).then(response => {
            var todo = response.data;
            lpp.setUp((userId) => {
                return new Promise((resolve, reject) => {
                    axios.get('https://jsonplaceholder.typicode.com/users/' + userId).then(response => {
                        console.log(`res for ${userId}`);
                        resolve(response.data)
                    }).catch(err => reject(err));
                });
            }, [todo.userId,todo.userId+1,todo.userId+2,todo.userId+3]).lpp(2).then(res => {
                resolve(res);
            }).catch(err => reject(err));
        });
    });
}

// giving the generator function to the library
lpp.setUp(myAsyncFunction, listOfArguments).lpp(1).then(res => {
    console.log("end");
    console.log(res.map(JSON.stringify).join(","));
}).catch(err => console.log(err))

// or you can run it like this
// lpp.lpp(3,() => {
//     if (listOfArguments.length===0) {return null;}
//     return myAsyncFunction(listOfArguments.shift());
// }).then(res => {
//     console.log("end");
//     console.log(res.join(","));
// });
