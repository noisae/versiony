var From = require('../../Command/From'),
    chai = require('chai'),
    sinon = require('sinon'),
    fs = require('fs');

describe("From", function(){
    
    describe("execute", function() {

        it('Should read file, get its version and save to a model', function() {
            
            //Given
            var version = "0.0.0";
            
            var model = require('../../model.js')();

            var modelMock = sinon.mock(model);
                modelMock.expects("set").once().withArgs(version);

            var initial = "";
            var s = "package.json";
            var spyFile2json = sinon.spy();
            var spyGetVersion = sinon.spy(function(){
                return "0.0.0";
            });

            var versiony = {
                "model": modelMock.object,
                "initial": initial
            };

            var testFrom = new From(s, spyFile2json, spyGetVersion, versiony);

            // When
            testFrom.execute();

            // Then
            chai.assert.isTrue(spyFile2json.calledWith(s), 'assert spyFile2json');
            chai.assert.isTrue(modelMock.verify());

        });
    });
});