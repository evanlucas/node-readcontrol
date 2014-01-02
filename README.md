# readcontrol

A way to read Debian control files

## Installation
```sh
npm install --save readcontrol
```

## Unit Tests

To run tests:

```bash
$ npm test
```

## API

### control.version

  Exposes the module version
  
  Version:  `0.0.2`

***

### control.read()

  Parses the file at the given _fp_
  
  Example
  
```javascript
 control.read('./control', function(err, out) {
   if (err) throw err
   console.log(out)
   // => {
   // =>   package: 'com.curapps.test',
   // =>   name: 'Test',
   // =>   depends: ['mobilesubstrate', 'preferenceloader'],
   // =>   version: '2.0.0',
   // =>   architecture: 'iphoneos-arm',
   // =>   description: 'This is a test',
   // =>   maintainer: 'Evan Lucas',
   // =>   author: 'Evan Lucas',
   // =>   homepage: 'http://example.com',
   // =>   section: 'Tweaks'
   // => }
 })
```

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| fp | String | The file path |
| cb | Function | function(err, obj) |


***

### control.readSync()

  Parses the file at the given _fp_
  
  Example
  
```javascript
 var out = control.readSync('./control')
 console.log(out)
 // => {
 // =>   package: 'com.curapps.test',
 // =>   name: 'Test',
 // =>   depends: ['mobilesubstrate', 'preferenceloader'],
 // =>   version: '2.0.0',
 // =>   architecture: 'iphoneos-arm',
 // =>   description: 'This is a test',
 // =>   maintainer: 'Evan Lucas',
 // =>   author: 'Evan Lucas',
 // =>   homepage: 'http://example.com',
 // =>   section: 'Tweaks'
 // => }
```

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| fp | String | The file path |


***
