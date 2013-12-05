'use strict';
describe('directives', function() {
    var $validator;

    beforeEach(module('input-validator'));
    beforeEach(inject(function (_$validator_) {
        $validator = _$validator_;
    }));
    describe ('Basic tests', function() {

        it('is defined', function() {
            expect($validator).toBeDefined();
        });

        it('add test by ID & fnTest', function() {
            var fnTest = function(){
                //
            };
            $validator.register('test', fnTest);
            expect($validator.get('test')).toEqual(fnTest);
        });

        it('Catch ValidatorError when rewrite ID', function() {
            var _error = new Error('Validator ID is already exist');
            var runError = function(){
                $validator.register('test', function(){});
            };
            $validator.register('test', function(){});
            expect( runError ).toThrow( _error );
        });

        it('Catch ValidatorError when not set fnTest', function() {
            var _error = new Error('Validator test funcion not is defined!');
            var runError = function(){
                $validator.register('test', []);
            };
            expect( runError ).toThrow( _error );
        });

        it('validate', function() {
            var validators = [
                function(value){ return true },
                function(value){ return false },
                'test1',
                'test2',
                {id:'test3', test:function(value){ return true }},
                {id:'test4', test:function(value){ return false }}
            ];
            $validator.register('test1', function(value){ return true });
            $validator.register('test2', function(value){ return false });

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