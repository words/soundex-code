import assert from 'node:assert'
import util from 'node:util'
import cp from 'node:child_process'
import fs from 'node:fs'
import {URL} from 'node:url'
import {PassThrough} from 'node:stream'
import test from 'node:test'
import {soundex} from './index.js'

const exec = util.promisify(cp.exec)

/** @type {import('type-fest').PackageJson} */
const pack = JSON.parse(
  String(fs.readFileSync(new URL('package.json', import.meta.url)))
)

const own = {}.hasOwnProperty

test('api', async function (t) {
  assert.equal(soundex('PHONETICS'), soundex('phonetics'), 'case insensitive')
  assert.equal(
    soundex('PhoNeTicS'),
    soundex('phonetics'),
    'case insensitive (2)'
  )

  assert.equal(soundex('p'), 'P000', 'pad')
  assert.equal(soundex('pc'), 'P200', 'pad (2)')
  assert.equal(soundex('pcd'), 'P230', 'pad (3)')
  assert.equal(soundex('pcdl'), 'P234', 'pad (4)')
  assert.equal(soundex('pcdlm'), 'P234', 'pad (5)')
  assert.equal(soundex('pcdlmr'), 'P234', 'pad (6)')

  assert.equal(soundex('b', 2), 'B0', 'max-length argument (1)')
  assert.equal(soundex('bc', 2), 'B2', 'max-length argument (2)')
  assert.equal(soundex('bcd', 2), 'B2', 'max-length argument (3)')
  assert.equal(soundex('bcdl', 2), 'B2', 'max-length argument (4)')
  assert.equal(soundex('bcdlm', 2), 'B2', 'max-length argument (5)')
  assert.equal(soundex('bcdlmr', 2), 'B2', 'max-length argument (6)')

  assert.equal(soundex('b', 6), 'B000', 'max-length argument (7)')
  assert.equal(soundex('bc', 6), 'B200', 'max-length argument (8)')
  assert.equal(soundex('bcd', 6), 'B230', 'max-length argument (9)')
  assert.equal(soundex('bcdl', 6), 'B234', 'max-length argument (10)')
  assert.equal(soundex('bcdlm', 6), 'B2345', 'max-length argument (11)')
  assert.equal(soundex('bcdlmr', 6), 'B23456', 'max-length argument (12)')
  assert.equal(soundex('bcdlmrf', 6), 'B23456', 'max-length argument (13)')

  // Natural provides several unit tests. See:
  // <https://github.com/NaturalNode/natural>
  await t.test('compatible with (Node) Natural', function () {
    run({
      blackberry: 'B421',
      calculate: 'C424',
      fox: 'F200',
      jump: 'J510',
      phonetics: 'P532'
    })
  })

  // The PHP implementation, based on Knuths, gives several examples. See:
  // <https://php.net/manual/en/function.soundex.php>
  await t.test('compatible with (Node) Natural', function () {
    run({
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
  })

  // The original implementation gives several examples. See:
  // <https://www.archives.gov/research/census/soundex.html>
  await t.test('compatible with (Node) Natural', function () {
    run({
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
  })
})

test('cli', async function () {
  assert.deepEqual(
    await exec('./cli.js considerations'),
    {stdout: 'C523\n', stderr: ''},
    'one'
  )

  assert.deepEqual(
    await exec('./cli.js detestable vileness'),
    {stdout: 'D323 V452\n', stderr: ''},
    'two'
  )

  await new Promise(function (resolve) {
    const input = new PassThrough()
    const subprocess = cp.exec('./cli.js', function (error, stdout, stderr) {
      assert.deepEqual(
        [error, stdout, stderr],
        [null, 'D323 V452\n', ''],
        'stdin'
      )
    })
    assert(subprocess.stdin, 'expected stdin on `subprocess`')
    input.pipe(subprocess.stdin)
    input.write('detestable')
    setImmediate(function () {
      input.end(' vileness')
      setImmediate(resolve)
    })
  })

  const h = await exec('./cli.js -h')

  assert.ok(/\sUsage: soundex-code/.test(h.stdout), '-h')

  const help = await exec('./cli.js --help')

  assert.ok(/\sUsage: soundex-code/.test(help.stdout), '-h')

  assert.deepEqual(
    await exec('./cli.js -v'),
    {stdout: pack.version + '\n', stderr: ''},
    '-v'
  )

  assert.deepEqual(
    await exec('./cli.js --version'),
    {stdout: pack.version + '\n', stderr: ''},
    '--version'
  )
})

/**
 * @param {Record<string, string>} tests
 */
function run(tests) {
  let index = 0
  /** @type {string} */
  let key

  for (key in tests) {
    if (own.call(tests, key)) {
      assert.equal(soundex(key), tests[key], String(++index))
    }
  }
}
