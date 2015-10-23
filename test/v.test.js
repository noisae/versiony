var	versiony = require('../v'),
	chai = require('chai'),
    fs = require('fs');

describe("Versiony", function(){
	

	describe("end", function() {
		
		describe("end with major, minor and patch fields", function() {
			var file = "./test/version.json";

			beforeEach(function() {
			
				var originalVersion = {
				    "major": 1,
				    "minor": 1,
				    "patch": 1
				};

				fs.writeFileSync(file, JSON.stringify(originalVersion));
			});

			afterEach(function() {
				fs.unlinkSync(file);
			});
			
			it('Increse minor from version.json', function(){

				//Given

				// When
				var changedFile = versiony.from(file).minor(2).to().end();
				
				// Then
				var result = fs.readFileSync(file).toString();

				var resultJson = JSON.parse(result);

				chai.assert.equal( resultJson.minor , 2 );

			});


			it('Increse major from version.json', function(){

				//Given

				// When
				var changedFile = versiony.from(file).major(2).to().end();
				
				// Then
				var result = fs.readFileSync(file).toString();

				var resultJson = JSON.parse(result);

				chai.assert.equal( resultJson.major , 2 );

			});

			it('Increse patch from version.json', function(){

				//Given

				// When
				var changedFile = versiony.from(file).patch(2).to().end();
				
				// Then
				var result = fs.readFileSync(file).toString();

				var resultJson = JSON.parse(result);

				chai.assert.equal( resultJson.patch , 2 );

			});

			
		});

		describe("end with only version field", function() {
			var file = "./test/version.json";

			beforeEach(function() {
			
				var originalVersion = {
				    "version": "1.1.1",
				};

				fs.writeFileSync(file, JSON.stringify(originalVersion));
			});

			afterEach(function() {
				fs.unlinkSync(file);
			});
			
			it('Increse minor from version.json', function(){

				//Given

				// When
				var changedFile = versiony.from(file).minor(2).to().end();
				
				// Then
				var result = fs.readFileSync(file).toString();

				var resultJson = JSON.parse(result);

				chai.assert.equal( resultJson.version , "1.2.1" );

			});


			it('Increse major from version.json', function(){

				//Given

				// When
				var changedFile = versiony.from(file).major(2).to().end();
				
				// Then
				var result = fs.readFileSync(file).toString();

				var resultJson = JSON.parse(result);

				chai.assert.equal( resultJson.version , "2.1.1" );

			});

			it('Increse patch from version.json', function(){

				//Given

				// When
				var changedFile = versiony.from(file).patch(2).to().end();
				
				// Then
				var result = fs.readFileSync(file).toString();

				var resultJson = JSON.parse(result);

				chai.assert.equal( resultJson.version , "1.1.2" );

			});
		});

	});

});