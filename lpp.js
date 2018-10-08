module.exports = {

    setUp(myAsyncFunction,arrayOfArguments) {

        var setmeup = function(myAsyncFunction,arrayOfArguments) {
            this.pos=0;
            this.myAsyncFunction=myAsyncFunction;
            this.arrayOfArguments=arrayOfArguments;    

            var that=this;

            this.generatorFunction = function () {
                if (that.pos<that.arrayOfArguments.length) {
                    return that.myAsyncFunction(that.arrayOfArguments[that.pos++]);
                }
                return null;
            };
        
            this.lpp=function(max,generatorFunction) {
                this.pos=0;
                if (max===undefined) {
                    max=10;
                }
                if (generatorFunction===undefined) {
                    generatorFunction=this.generatorFunction;
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


        return new setmeup(myAsyncFunction,arrayOfArguments);
    },

}
