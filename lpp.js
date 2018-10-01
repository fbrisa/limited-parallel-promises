
var lpp = function (generatorFunction, max, callback) {
    if (max===undefined) {
        max=10;
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
                    if (callback) {
                        callback(res);
                    }
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

module.exports = lpp;