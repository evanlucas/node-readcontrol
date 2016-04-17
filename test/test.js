var crw = require('../lib/index')
  , path = require('path')
  , should = require('should')
  , fs = require('fs')

describe('controlrw', function() {
  describe('read()', function() {
    describe('valid control file', function() {
      it('should return null, object', function(done) {
        var controlFile = path.join(__dirname, 'control')
        crw.read(controlFile, function(err, out) {
          should.ifError(err)
          out.should.be.type('object')
          out.should.haveOwnProperty('package')
            .eql('com.ia.iconbounce')
          out.should.haveOwnProperty('name')
            .eql('IconBounce')
          out.should.haveOwnProperty('depends')
            .eql(['mobilesubstrate'])
          out.should.haveOwnProperty('version')
            .eql('2.0.0')
          done()
        })
      })
    })

    describe('non existent file', function() {
      it('should return an error', function(done) {
        crw.read('./con', function(err, out) {
          should.exist(err)
          err.code.should.eql('ENOENT')
          done()
        })
      })
    })

    describe('invalid control file', function() {
      it('should return null, object', function(done) {
        var controlFile = path.join(__dirname, 'control_invalid')
        crw.read(controlFile, function(err, out) {
          should.ifError(err)
          out.should.be.type('object')
          out.should.eql({})
          done()
        })
      })
    })
  })

  describe('parse()', function() {
    describe('valid control file', function() {
      it('should return an object', function() {
        var controlFile = path.join(__dirname, 'control')
        var contents = fs.readFileSync(controlFile, 'utf8')
        var out = crw.parse(contents)
        out.should.be.type('object')
        out.should.haveOwnProperty('package')
          .eql('com.ia.iconbounce')
        out.should.haveOwnProperty('name')
          .eql('IconBounce')
        out.should.haveOwnProperty('depends')
          .eql(['mobilesubstrate'])
        out.should.haveOwnProperty('version')
          .eql('2.0.0')
      })
    })
    describe('empty control file', function() {
      it('should return object', function() {
        var controlFile = path.join(__dirname, 'control_invalid')
        var contents = fs.readFileSync(controlFile, 'utf8')
        var out = crw.parse(contents)
        out.should.be.type('object')
        out.should.eql({})
      })
    })
  })

  describe('readSync()', function() {
    describe('valid control file', function() {
      it('should return an object', function() {
        var controlFile = path.join(__dirname, 'control')
        var out = crw.readSync(controlFile)
        out.should.be.type('object')
        out.should.haveOwnProperty('package')
          .eql('com.ia.iconbounce')
        out.should.haveOwnProperty('name')
          .eql('IconBounce')
        out.should.haveOwnProperty('depends')
          .eql(['mobilesubstrate'])
        out.should.haveOwnProperty('version')
          .eql('2.0.0')
      })
    })

    describe('non existent file', function() {
      it('should throw', function() {
        (function() {
          var contents = crw.readSync('./con')
        }).should.throw()
      })
    })

    describe('invalid control file', function() {
      it('should return object', function() {
        var controlFile = path.join(__dirname, 'control_invalid')
        var out = crw.readSync(controlFile)
        out.should.be.type('object')
        out.should.eql({})
      })
    })
  })
})
