var	End = require('../../Command/End'),
	chai = require('chai'),
    sinon = require('sinon'),
    fs = require('fs');

describe("End", function(){
	

	describe("execute", function() {

		it('Should execute command and return files and its version', function(){

			//Given
			var logStrip = function() {
				return false;
			}

			var object = {
				model: require('../../model.js')()
			};

			var testEnd = new End(logStrip, object);

			// When
			object.model.file('file');

			// Then
			result = testEnd.execute();
			chai.assert.equal( '0.0.0',result.version );
			chai.assert.deepEqual( ['file'], result.files );

		});
	});
});