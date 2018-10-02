module.exports = {

    arrayOfArguments:[],
    myAsyncFunction:[],
    setUp(myAsyncFunction,arrayOfArguments) {
        module.exports.myAsyncFunction=myAsyncFunction;
        module.exports.arrayOfArguments=arrayOfArguments;
        return this;
    },
    generatorFunction() {
        if (module.exports.arrayOfArguments.length===0) {return null;}
        return module.exports.myAsyncFunction(module.exports.arrayOfArguments.shift())
    },

    lpp(max,generatorFunction) {
        if (max===undefined) {
            max=10;
        }
        if (generatorFunction===undefined) {
            generatorFunction=module.exports.generatorFunction;
        }
        return new Promise((resolve, reject) => {
            var runningCount = 0;

            var resolvedValues=[];

            var nextP=function(generatorFunction) {            
                var maybePromise = generatorFunction();
                if (maybePromise) {
                    runningCount++;
                    maybePromise.then((res) => {
                        resolvedValues.push(res);
                        runningCount--;
                        nextP(generatorFunction);
                    })
                } else {
                    if (runningCount==0) {
                        resolve(resolvedValues);
                    }
                }    
            }

            while (runningCount<max) {
                nextP(generatorFunction);
            }
            
        });
    }

}
