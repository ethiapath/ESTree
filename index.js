const { generate } = require( 'astring')
const { parseScript, parseModule, parse } = require( 'seafox');
const fs = require('fs');

const l = (x) => console.log(x)

const jsFile = fs.readFileSync('test.js', { encoding: 'utf8'});

l`========jsFile`
console.log(jsFile)
l`========`

l(typeof jsFile)
l`========ESTree`


l(parseScript('({x: [y] = 0} = 1)'))
const ESTree = parseScript(jsFile);
console.log(ESTree)
l`========`

const js = generate(ESTree);

l`========js`
console.log(js)
l`========`

const wfs = fs.writeFileSync('output.js', js, { encoding: 'utf8'})

l`========wfs`
console.log('end')
l`========`