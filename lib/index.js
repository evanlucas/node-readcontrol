/**
 * Module depends
 */
var pkg     = require('../package')
  , fs      = require('fs')
  , control = exports

/**
 * Exposes the module version
 *
 * Version:  `@@MODULE_VERSION@@`
 */
control.version = pkg.version

control.arrayFields = [
    'pre-depends'
  , 'depends'
  , 'recommends'
  , 'suggests'
  , 'breaks'
  , 'conflicts'
  , 'provides'
  , 'replaces'
  , 'enhances'
]

control.properFields = {
    'package': 'Package'
  , 'source': 'Source'
  , 'version': 'Version'
  , 'priority': 'Priority'
  , 'section': 'Section'
  , 'essential': 'Essential'
  , 'maintainer': 'Maintainer'
  , 'pre-depends': 'Pre-Depends'
  , 'depends': 'Depends'
  , 'recommends': 'Recommends'
  , 'suggests': 'Suggests'
  , 'conflicts': 'Conflicts'
  , 'provides': 'Provides'
  , 'replaces': 'Replaces'
  , 'enhances': 'Enhances'
  , 'architecture': 'Architecture'
  , 'filename': 'Filename'
  , 'size': 'Size'
  , 'installed-size': 'Installed-Size'
  , 'md5sum': 'MD5sum'
  , 'description': 'Description'
  , 'origin': 'Origin'
  , 'bugs': 'Bugs'
  , 'name': 'Name'
  , 'author': 'Author'
  , 'homepage': 'Homepage'
  , 'website': 'Website'
  , 'depiction': 'Depiction'
  , 'icon': 'Icon'
}

/**
 * Parses the file at the given _fp_
 *
 * Example
 *
 *    control.read('./control', function(err, out) {
 *      if (err) throw err
 *      console.log(out)
 *      // => {
 *      // =>   package: 'com.curapps.test',
 *      // =>   name: 'Test',
 *      // =>   depends: ['mobilesubstrate', 'preferenceloader'],
 *      // =>   version: '2.0.0',
 *      // =>   architecture: 'iphoneos-arm',
 *      // =>   description: 'This is a test',
 *      // =>   maintainer: 'Evan Lucas',
 *      // =>   author: 'Evan Lucas',
 *      // =>   homepage: 'http://example.com',
 *      // =>   section: 'Tweaks'
 *      // => }
 *    })
 *
 * @param {String} fp The file path
 * @param {Function} cb function(err, obj)
 * @api public
 */
control.read = function(fp, cb) {
  fs.readFile(fp, 'utf8', function(err, contents) {
    if (err) return cb && cb(err)
    var out = control.parse(contents)
    return cb && cb(null, out)
  })
}

/**
 * Parses the file at the given _fp_
 *
 * Example
 *
 *    var out = control.readSync('./control')
 *    console.log(out)
 *    // => {
 *    // =>   package: 'com.curapps.test',
 *    // =>   name: 'Test',
 *    // =>   depends: ['mobilesubstrate', 'preferenceloader'],
 *    // =>   version: '2.0.0',
 *    // =>   architecture: 'iphoneos-arm',
 *    // =>   description: 'This is a test',
 *    // =>   maintainer: 'Evan Lucas',
 *    // =>   author: 'Evan Lucas',
 *    // =>   homepage: 'http://example.com',
 *    // =>   section: 'Tweaks'
 *    // => }
 *
 * @param {String} fp The file path
 * @api public
 * @returns object
 */
control.readSync = function(fp) {
  var contents = fs.readFileSync(fp, 'utf8')
  return control.parse(contents)
}

/**
 * Parses the contents of a given _str_
 *
 * Example
 *
 *    var out = control.parse(fs.readFileSync('./control', 'utf8'))
 *    console.log(out)
 *    // => {
 *    // =>   package: 'com.curapps.test',
 *    // =>   name: 'Test',
 *    // =>   depends: ['mobilesubstrate', 'preferenceloader'],
 *    // =>   version: '2.0.0',
 *    // =>   architecture: 'iphoneos-arm',
 *    // =>   description: 'This is a test',
 *    // =>   maintainer: 'Evan Lucas',
 *    // =>   author: 'Evan Lucas',
 *    // =>   homepage: 'http://example.com',
 *    // =>   section: 'Tweaks'
 *    // => }
 *
 * @param {String} str contents of the file to parse
 * @api public
 * @returns object
 */
control.parse = function(str) {
  var contents = str
  var out = {}
  while (matches = contents.match(/^\n*(\S+):[ \t]*(.*(\n[ \t].*)*)\n/)) {
    var key = matches[1]
      , val = matches[2]
    if (val)
      val = val.replace(/\s+$/, '')
    contents = contents.replace(matches[0], '')
    if (key)
      key = key.toLowerCase()
    if (~control.arrayFields.indexOf(key)) val = val.split(', ')
    out[key] = val
  }
  return out
}
