'use strict';
describe('directives', function() {
    var $scope;
    var $compile;
    var $validator;
    var $validatorProvider;

    //método para compilar nuestra directiva
    var compileDirective = function (markup, scope) {
        var el = $compile(markup)(scope);
        scope.$digest();
        return el;
    };

    //arrancamos el modulo
    beforeEach(module('input-validator', function(_$validatorProvider_){
        $validatorProvider = _$validatorProvider_;
    }));

    //guardamos la referencia al $rootScope y $compile de nuestra aplicación
    beforeEach(inject(function (_$rootScope_, _$compile_, _$validator_) {
        $scope = _$rootScope_;
        $compile = _$compile_;
        $validator = _$validator_;
    }));
    describe ('add validator in $validatorProvider', function() {
        it('test', function() {
            $validatorProvider.$add('mitest', function(inputValue){
                 return (inputValue.length > 1);
            });
           $scope.name = 'jimmy';
           $scope.myValidator = 'mitest';
           var element = compileDirective('<input name="test" validator="myValidator" ng-model="name"/>', $scope);
           expect(element).toBeValid();
           expect(element).toBePristine();
           expect(element.hasClass('ng-valid-mitest')).toBe(true);
           expect(element.hasClass('ng-invalid-mitest')).toBe(false);
        });
    });

    describe ('add Object validator by directive', function() {
        it('add simple object validator', function() {
            $scope.name = 'jimmy';
            $scope.myValidator = $validator.create('mitest', function(inputValue){
                    return (inputValue.length > 1);
            });
            var element = compileDirective('<input name="test" validator="myValidator" ng-model="name"/>', $scope);
            expect(element).toBeValid();
            expect(element).toBePristine();
            expect(element.hasClass('ng-valid-'+$scope.myValidator.id)).toBe(true);
            expect(element.hasClass('ng-invalid-'+$scope.myValidator.id)).toBe(false);

            $scope.$apply(function() {
                $scope.name = '-';
            });
            expect(element).toBeInvalid();
            expect(element).toBePristine();

            expect(element.hasClass('ng-valid-'+$scope.myValidator.id)).toBe(false);
            expect(element.hasClass('ng-invalid-'+$scope.myValidator.id)).toBe(true);
        });
    });

    describe ('add function validator by directive', function() {
        it('add simple object validator', function() {
            $scope.name = 'jimmy';
            $scope.myValidator = function(inputValue){
                return (inputValue.length > 1);
            };
            var element = compileDirective('<input name="test" data-validator="myValidator" ng-model="name"/>', $scope);
            expect(element).toBeValid();
            expect(element).toBePristine();
        });
    });

});
