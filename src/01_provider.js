angular.module('input-validator').provider('$validator', function() {
    var AUTO_ID_PREFIX = 'validator';
    var validators = this.$$validators = {};
    this.$get = function(){
        return {
            register: function(id, fnTest){
                if(validators.hasOwnProperty(id)) throw new Error('Validator ID is already exist');
                if( ! angular.isFunction(fnTest) ) throw new Error('Validator test funcion not is defined!');
                validators[id] = fnTest;
            },
            get:function(id){
                return validators[id];
            },
            validate: function(value, arrValidatorIdOrFnTest){
                var result = {};
                angular.forEach(arrValidatorIdOrFnTest, function(idOrFunction, index){
                    var id, fnTest;
                    if( angular.isString(idOrFunction) ){
                        id = idOrFunction;
                        fnTest = validators[id];
                    } else if( angular.isFunction(idOrFunction) ){
                        id = AUTO_ID_PREFIX+index;
                        fnTest = idOrFunction;
                    }else if( angular.isObject(idOrFunction) && idOrFunction.id && angular.isFunction( idOrFunction.test) ){
                        id = idOrFunction.id;
                        fnTest = idOrFunction.test;
                    }
                    if(id){
                        this[id] = fnTest(value);
                    }
                }, result);
                return result;
            }
        }
    };
});