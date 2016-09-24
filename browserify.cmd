browserify src\pyrite.js -o pyritec.js  -t [ babelify --presets [ es2015 ] --plugins [ add-module-exports ] ] -s Pyrite 
