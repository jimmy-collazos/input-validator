angular.module('input-validator', []).provider('$validator', function() {
    var AUTO_ID_PREFIX = 'validator';
    var validators = this.$$validators = {};
    var addValidator = this.$add = function(id, fnTest){
        if(validators.hasOwnProperty(id)) throw new Error('Validator ID is already exist');
        if( ! angular.isFunction(fnTest) ) throw new Error('Validator test funcion not is defined!');
        validators[id] = fnTest;
    }
    this.$get = function(){
        return {
            create: function(id, fnTest){
                return {
                    id: id,
                    test: fnTest
                };
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
}).directive('validator', [ '$validator', function($validator) {
    var ERROR_REGEXP  = /0/;
    var nexvalidate = function(arrValidators, controller){
        arrValidators = angular.isArray(arrValidators) ? arrValidators : [arrValidators];
        return function(value){
            var currentValue = angular.isDefined(value) ? value : '';
            var errors = $validator.validate(currentValue, arrValidators);
            var isEmpty = controller.$isEmpty(value);
            var result = '';
            angular.forEach(errors, function(resultOfTest, key){
                var isValid = isEmpty || resultOfTest;
                result += isValid ? '1' : '0';
                controller.$setValidity(key, isValid);
            });
            return ERROR_REGEXP.test(result) ? undefined : value;
        }
    };

    return {
        require: 'ngModel',
        scope: { validator: '=validator' },
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$formatters.push( nexvalidate(scope.validator, ctrl) );
            ctrl.$parsers.push( nexvalidate(scope.validator, ctrl) );
        }
    };

}]);