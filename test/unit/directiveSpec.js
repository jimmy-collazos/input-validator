'use strict';
describe('directives', function() {
    var $scope;
    var $compile;

    //método para compilar nuestra directiva
    var compileDirective = function (markup, scope) {
        var el = $compile(markup)(scope);
        scope.$digest();
        return el;
    };

    //arrancamos el modulo
    beforeEach(module('input-validator'));

    //guardamos la referencia al $rootScope y $compile de nuestra aplicación
    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $scope = _$rootScope_;
        $compile = _$compile_;
    }));
    describe ('add function validator by directive', function() {
        it('add simple object validator', function() {
            $scope.name = 'jimmy';
            $scope.myValidator = {
                id:'mitest',
                test:function(inputValue){
                    return (inputValue.length > 1);
                }
            };
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
});
