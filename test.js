'use strict'

var exec = require('child_process').exec
var PassThrough = require('stream').PassThrough
var test = require('tape')
var version = require('./package').version
var soundex = require('.')

test('api', function(t) {
  t.equal(soundex('PHONETICS'), soundex('phonetics'), 'case insensitive')
  t.equal(soundex('PhoNeTicS'), soundex('phonetics'), 'case insensitive (2)')

  t.equal(soundex('p'), 'P000', 'pad')
  t.equal(soundex('pc'), 'P200', 'pad (2)')
  t.equal(soundex('pcd'), 'P230', 'pad (3)')
  t.equal(soundex('pcdl'), 'P234', 'pad (4)')
  t.equal(soundex('pcdlm'), 'P234', 'pad (5)')
  t.equal(soundex('pcdlmr'), 'P234', 'pad (6)')

  t.equal(soundex('b', 2), 'B0', 'max-length argument (1)')
  t.equal(soundex('bc', 2), 'B2', 'max-length argument (2)')
  t.equal(soundex('bcd', 2), 'B2', 'max-length argument (3)')
  t.equal(soundex('bcdl', 2), 'B2', 'max-length argument (4)')
  t.equal(soundex('bcdlm', 2), 'B2', 'max-length argument (5)')
  t.equal(soundex('bcdlmr', 2), 'B2', 'max-length argument (6)')

  t.equal(soundex('b', 6), 'B000', 'max-length argument (7)')
  t.equal(soundex('bc', 6), 'B200', 'max-length argument (8)')
  t.equal(soundex('bcd', 6), 'B230', 'max-length argument (9)')
  t.equal(soundex('bcdl', 6), 'B234', 'max-length argument (10)')
  t.equal(soundex('bcdlm', 6), 'B2345', 'max-length argument (11)')
  t.equal(soundex('bcdlmr', 6), 'B23456', 'max-length argument (12)')
  t.equal(soundex('bcdlmrf', 6), 'B23456', 'max-length argument (13)')

  // Natural provides several unit tests. See:
  // <https://github.com/NaturalNode/natural>
  t.test('compatible with (Node) Natural', function(st) {
    run(st, {
      blackberry: 'B421',
      calculate: 'C424',
      fox: 'F200',
      jump: 'J510',
      phonetics: 'P532'
    })

    st.end()
  })

  // The PHP implementation, based on Knuths, gives several examples. See:
  // <https://php.net/manual/en/function.soundex.php>
  t.test('compatible with (Node) Natural', function(st) {
    run(st, {
      Euler: 'E460',
      Gauss: 'G200',
      Hilbert: 'H416',
      Knuth: 'K530',
      Lloyd: 'L300',
      Lukasiewicz: 'L222',
      Ellery: 'E460',
      Ghosh: 'G200',
      Heilbronn: 'H416',
      Kant: 'K530',
      Ladd: 'L300',
      Lissajous: 'L222'
    })

    st.end()
  })

  // The original implementation gives several examples. See:
  // <https://www.archives.gov/research/census/soundex.html>
  t.test('compatible with (Node) Natural', function(st) {
    run(st, {
      Washington: 'W252',
      Lee: 'L000',
      Gutierrez: 'G362',
      Pfister: 'P236',
      Jackson: 'J250',
      Tymczak: 'T522',
      VanDeusen: 'V532',
      Deusen: 'D250',
      Ashcraft: 'A261'
    })

    st.end()
  })

  t.end()
})

test('cli', function(t) {
  var input = new PassThrough()
  var helps = ['-h', '--help']
  var versions = ['-v', '--version']

  t.plan(7)

  exec('./cli.js considerations', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, 'C523\n', ''], 'one')
  })

  exec('./cli.js detestable vileness', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, 'D323 V452\n', ''], 'two')
  })

  var subprocess = exec('./cli.js', function(err, stdout, stderr) {
    t.deepEqual([err, stdout, stderr], [null, 'D323 V452\n', ''], 'stdin')
  })

  input.pipe(subprocess.stdin)
  input.write('detestable')
  setImmediate(function() {
    input.end(' vileness')
  })

  helps.forEach(function(flag) {
    exec('./cli.js ' + flag, function(err, stdout, stderr) {
      t.deepEqual(
        [err, /\sUsage: soundex-code/.test(stdout), stderr],
        [null, true, ''],
        flag
      )
    })
  })

  versions.forEach(function(flag) {
    exec('./cli.js ' + flag, function(err, stdout, stderr) {
      t.deepEqual([err, stdout, stderr], [null, version + '\n', ''], flag)
    })
  })
})

function run(t, tests) {
  Object.keys(tests).forEach(function(name, i) {
    t.equal(soundex(name), tests[name], i + 1)
  })
}
