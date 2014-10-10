angular.module('input-validator').directive('validator', [ '$validator', function($validator) {
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