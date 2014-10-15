'use strict';

/**
 * Dependencies.
 */

var soundexCode,
    assert;

soundexCode = require('./');
assert = require('assert');

/**
 * Tests.
 */

describe('soundexCode()', function () {
    it('should be of type `function`', function () {
        assert(typeof soundexCode === 'function');
    });

    it('should be case insensitive', function () {
        var result;

        result = soundexCode('phonetics');

        assert(soundexCode('PHONETICS') === result);
        assert(soundexCode('PhoNeTicS') === result);
    });

    it('should pad', function () {
        assert(soundexCode('p') === 'P000');
        assert(soundexCode('pc') === 'P200');
        assert(soundexCode('pcd') === 'P230');
        assert(soundexCode('pcdl') === 'P234');
        assert(soundexCode('pcdlm') === 'P234');
        assert(soundexCode('pcdlmr') === 'P234');
    });

    it('should accept a max-length argument', function () {
        assert(soundexCode('b', 2) === 'B0');
        assert(soundexCode('bc', 2) === 'B2');
        assert(soundexCode('bcd', 2) === 'B2');
        assert(soundexCode('bcdl', 2) === 'B2');
        assert(soundexCode('bcdlm', 2) === 'B2');
        assert(soundexCode('bcdlmr', 2) === 'B2');

        assert(soundexCode('b', 6) === 'B000');
        assert(soundexCode('bc', 6) === 'B200');
        assert(soundexCode('bcd', 6) === 'B230');
        assert(soundexCode('bcdl', 6) === 'B234');
        assert(soundexCode('bcdlm', 6) === 'B2345');
        assert(soundexCode('bcdlmr', 6) === 'B23456');
        assert(soundexCode('bcdlmrf', 6) === 'B23456');
    });

    /**
     * Natural provides several unit tests. See:
     *   https://github.com/NaturalNode/natural
     */

    it('should be compatible with (Node) Natural', function () {
        var attribute,
            tests;

        tests = {
            'blackberry' : 'B421',
            'calculate' : 'C424',
            'fox' : 'F200',
            'jump' : 'J510',
            'phonetics' : 'P532'
        };

        for (attribute in tests) {
            assert(soundexCode(attribute) === tests[attribute]);
        }
    });

    /**
     * The PHP implementation, based on Knuths, gives several examples. See:
     *   http://php.net/manual/en/function.soundex.php
     */

    it('should be compatible with (PHP) soundex', function () {
        var attribute,
            tests;

        tests = {
            'Euler' : 'E460',
            'Gauss' : 'G200',
            'Hilbert' : 'H416',
            'Knuth' : 'K530',
            'Lloyd' : 'L300',
            'Lukasiewicz' : 'L222',
            'Ellery' : 'E460',
            'Ghosh' : 'G200',
            'Heilbronn' : 'H416',
            'Kant' : 'K530',
            'Ladd' : 'L300',
            'Lissajous' : 'L222'
        };

        for (attribute in tests) {
            assert(soundexCode(attribute) === tests[attribute]);
        }
    });

    /**
     * The original implementation gives several examples. See:
     *   http://www.archives.gov/research/census/soundex.html
     */

    it('should be compatible with National Archives', function () {
        var attribute,
            tests;

        tests = {
            'Washington' : 'W252',
            'Lee' : 'L000',
            'Gutierrez' : 'G362',
            'Pfister' : 'P236',
            'Jackson' : 'J250',
            'Tymczak' : 'T522',
            'VanDeusen' : 'V532',
            'Deusen' : 'D250',
            'Ashcraft' : 'A261'
        };

        for (attribute in tests) {
            assert(soundexCode(attribute) === tests[attribute]);
        }
    });
});
