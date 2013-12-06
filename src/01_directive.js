angular.module('input-validator').directive('validator', function($validator) {
    var ERROR_REGEXP  = /0/;
    var controller;
    var nexvalidate = function(arrValidators){
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
            validators = scope.validator;
            controller = ctrl;

            ctrl.$formatters.push( nexvalidate(scope.validator) );
            ctrl.$parsers.push( nexvalidate(scope.validator) );
        }
    };

});