module.exports = {

    pos:0,
    arrayOfArguments:[],
    myAsyncFunction:[],
    setUp(myAsyncFunction,arrayOfArguments) {
        module.exports.myAsyncFunction=myAsyncFunction;
        module.exports.arrayOfArguments=arrayOfArguments;
        return this;
    },
    generatorFunction() {
        if (module.exports.pos<module.exports.arrayOfArguments.length) {
            return module.exports.myAsyncFunction(module.exports.arrayOfArguments[module.exports.pos++]);
        }
        return null;
    },

    lpp(max,generatorFunction) {
        module.exports.pos=0;
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
                    }).catch(err => reject(err))
                } else {
                    if (runningCount==0) {
                        resolve(resolvedValues);
                    }
                }
                
                return maybePromise;
            }

            var goon=true;
            while (runningCount<max && goon) {
                goon=(nextP(generatorFunction)!==null);
            }
            
        });
    }

}
