angular.module('input-validator').directive('validator', function($validator) {
    var controller; //, validators;
    var nexvalidate = function(arrValidators){
        arrValidators = angular.isArray(arrValidators) ? arrValidators : [arrValidators];
        return function(value){
            var currentValue = angular.isDefined(value) ? value : '';
            var errors = $validator.validate(value, arrValidators);
            angular.forEach(errors, function(resultOfTest, key){
                var isValid = controller.$isEmpty(currentValue) || resultOfTest;
                controller.$setValidity(key, isValid);
            });
        }
    };

    return {
        require: "ngModel",
        scope: { validator: '=validator' },
        link: function(scope, elm, attrs, ctrl) {
            validators = scope.validator;
            controller = ctrl;

            ctrl.$formatters.push( nexvalidate(scope.validator) );
            ctrl.$parsers.push( nexvalidate(scope.validator) );
        }
    };

});