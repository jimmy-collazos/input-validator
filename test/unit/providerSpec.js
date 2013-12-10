'use strict';
describe('directives', function() {
    var $validator;
    var $validatorProvider;

    beforeEach(module('input-validator', function(_$validatorProvider_){
        $validatorProvider = _$validatorProvider_;
    }));
    beforeEach(inject(function (_$validator_) {
        $validator = _$validator_;
    }));
    describe ('add validator via $validatorProvider', function() {
        it('add validator', function() {
            var fnTest = function (inputValidator) {
               return true;
            };
            $validatorProvider.$add('test', fnTest);
            expect($validator.get('test')).toEqual(fnTest);
        });
        it('Catch ValidatorError when rewrite ID', function() {
            var _error = new Error('Validator ID is already exist');
            var runError = function(){
                $validatorProvider.$add('test', function(){});
            };
            $validatorProvider.$add('test', function(){});
            expect( runError ).toThrow( _error );
        });

        it('Catch ValidatorError when not set fnTest', function() {
            var _error = new Error('Validator test funcion not is defined!');
            var runError = function(){
                $validatorProvider.$add('test', []);
            };
            expect( runError ).toThrow( _error );
        });
    });
    describe ('Public methods', function() {
        it('create()', function() {
            var method = function(inputValidator){ return true; };
            var myValidate = $validator.create('myvalidId', method);
            expect(myValidate.id).toEqual('myvalidId');
            expect(myValidate.test).toEqual(method);
        });
        it('validate()', function() {
            var validators = [
                function(value){ return true },
                function(value){ return false },
                'test1',
                'test2',
                {id:'test3', test:function(value){ return true }},
                {id:'test4', test:function(value){ return false }}
            ];
            $validatorProvider.$add('test1', function(value){ return true });
            $validatorProvider.$add('test2', function(value){ return false });
            var result = $validator.validate('test', validators);
            //name auto-generate by index
            expect(result.validator0).toBe(true);
            expect(result.validator1).toBe(false);
            expect(result.test1).toBe(true);
            expect(result.test2).toBe(false);
            expect(result.test3).toBe(true);
            expect(result.test4).toBe(false);
        });
    });
});