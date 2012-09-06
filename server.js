//var dataApi = require('./dataApi.js');
//require('./visualizer.js');
var nconf = require('nconf');
var argv = require('optimist').argv;
var fs = require('fs');
var path = require('path');
var tests = new Object();
tests.outPath = 'tests\\out\\';
tests.inPath = 'tests\\in\\';
var files;

//
// this function is a preparation.
// 
function _tests()
{	
	console.log('running in test mode...');
	projectRoot = 'tests\\in\\source';
	if (!(tests.functionDetectionOut = fs.openSync(tests.outPath + 'functionDetection.out','w')))
		console.log('failed opening test output file ' + tests.outPath);
}

nconf.argv()
     .env()
     .file({ file: 'config/config.json' });

var projectRoot = nconf.get('projectRoot');
var doNotWatchDirs = nconf.get('doNotWatchDirs');
console.log(JSON.stringify(doNotWatchDirs));
	 
if (argv.test) 
	_tests();
else
	console.log('running in regular mode...');

function changeDetected(event, filename)
{
	console.log('event: ' + event + ' on file ' + (filename || 'unknown. Probably a watched file has been deleted.'));
}
	
function Watch(directory)
{
			var fullPath = directory;
			
			var _type = fs.statSync(directory);
			if (_type.isDirectory())
			{
				if (doNotWatchDirs.indexOf(path.basename(directory)) == -1)
				{
					fs.watch(directory, {persistent: true, interval: 100}, changeDetected);
					console.log('watching directory: ' + directory);						
					
					containedEntities = fs.readdirSync(directory)
					containedEntities.forEach(function(element, index, array) {
						array[index] = path.join(directory, array[index]);
					});					
					
					//
					// as long as relying on fs.watch for watching changes:
					// fs.watch will only watch files in the root dir provided to it, 
					// and subdirectories as a whole. it will not however watch changes 
					// inside files included in subdirectories. 
					// hence we need to recursively add all subdirectories for full watching.
					//
					containedEntities.forEach(Watch);
				}
				else
					console.log('not watching directory: ' + fullPath);	
			}
			else if (_type.isFile())
			{
				/*if (fullPath.substr(-3) == '.js')
				{
					var sourceFile = new Object();
					sourceFile.file = fullPath;
					
					//data = readFile(fullPath);
					if (argv.test)
						fs.writeSync(tests.functionDetectionOut, fullPath + '\n');					
				}
				else
					console.log('info: ' + fullPath + ' contents ignored');*/
			}
			else
			{
				throw "Object not detected as directory nor file";
			}
}

Watch(projectRoot);
//console.log(tokens);