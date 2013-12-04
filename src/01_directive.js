angular.module('input-validator').directive('validator', function() {
    var controller, validators;
    var validate = function(value){
        var currentValue = angular.isDefined(value) ? value : '';
        var isValid = controller.$isEmpty(value) || validators.test(currentValue);
        controller.$setValidity(validators.id, isValid);
        return value;
    };

    return {
        require: "ngModel",
        scope: { validator: '=validator' },
        link: function(scope, elm, attrs, ctrl) {
            validators = scope.validator;
            controller = ctrl;
            ctrl.$formatters.push(validate);
            ctrl.$parsers.push(validate);
        }
    };

});