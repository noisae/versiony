var To = require('../../Command/To'),
    chai = require('chai'),
    sinon = require('sinon'),
    fs = require('fs');

describe("To", function(){
    
    describe("execute", function() {

        it('Should read JSON and write it to file', function() {

            //Given
            var model = require('../../model.js')();

            var initial = 'initialVar';

            var source = '';

            var spyFile2json = sinon.spy();
            var spyJson2file = sinon.spy();
            var spyVersion2json = sinon.spy();
            var indent = '  ';
            var testTo = new To(model, initial, spyFile2json, spyJson2file, spyVersion2json, source, indent);

            // When
            testTo.execute('file');

            // Then
            chai.assert.isTrue(spyFile2json.calledWith('file'));
            chai.assert.isTrue(spyJson2file.calledWith('file'));
            // chai.assert.isTrue(spyVersion2json.calledWith('file'));

        });
    });
});