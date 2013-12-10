# Input validator [![Build Status](https://travis-ci.org/acido69/input-validator.png)](https://travis-ci.org/acido69/input-validator)

This is a Angular-Module for add validators in input and textarea elements.
You can add validator method by $injector or directive.

## Add validator via $validatorProvider
```javascript
mainAngularModule.config(['$validatorProvider', function($validatorProvider){
    $validatorProvider.$add('globalValidator', function(inputValue){
        return /\d/.test(inputValue);
    });
}]);
```
```html
<!-- no need controller, use in any $scope -->
<form name="myform">
    Name: <input type="text" name="userName" ng-model="name" required data-validator="'globalValidator'" placeholder="space and 1"/>
</form>
<hr>
<tt>name = {{name}}</tt><br/>
<tt>myform.userName.$error.required = {{myform.userName.$error.required}}</tt><br/>
<tt>myform.userName.$error.myvalidator = {{myform.userName.$error.myvalidator}}</tt><br/>
<tt>myform.$valid = {{myform.$valid}} </tt>
```

## Add validator via directive
```javascript
mainAngularModule.controller('formController', ['$scope', '$validator', function($scope, $validator){
    var validatorWithId = $validator.create('myvalidator', function(inputValue){
        return /\d/.test(inputValue);
    });
    var validatorAnonymous = function(inputValue){
        return /\s/.test(inputValue);
    }

    $scope.name = '';
    $scope.myTestValidator = [validatorWithId, validatorAnonymous];
}]);
```

```html
<div ng-controller="formController">
    <h2>Add validators via directive</h2>
    <form name="myform">
        Name: <input type="text" name="userName" ng-model="name" required data-validator="myTestValidator" placeholder="space and 1"/>
    </form>
    <hr>
    <tt>name = {{name}}</tt><br/>
    <tt>myform.userName.$error.required = {{myform.userName.$error.required}}</tt><br/>
    <tt>myform.userName.$error.myvalidator = {{myform.userName.$error.myvalidator}}</tt><br/>
    <tt>myform.$valid = {{myform.$valid}} </tt>
</div>
```