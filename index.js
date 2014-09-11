'use strict';

var DEFAULT_LENGTH, map;

/**
 * Define the minimum length of Soundex keys.
 */

DEFAULT_LENGTH = 4;

/**
 * Define the Soundex values belonging to characters.
 *
 * This map also includes vowels (with a value of 0) to easily distinguish
 * between an unknown value or a vowel.
 */

map = {};

map.a = map.e = map.i = map.o = map.u = map.y = 0;
map.b = map.f = map.p = map.v = 1;
map.c = map.g = map.j = map.k = map.q = map.s = map.x = map.z = 2;
map.d = map.t = 3;
map.l = 4;
map.m = map.n = 5;
map.r = 6;

/**
 * Pad a given value with zero characters. The function only pads four
 * characters.
 *
 * @param {string} value
 * @return {string}
 */

function pad(value) {
    var length = value.length;

    if (length >= DEFAULT_LENGTH) {
        return value;
    }

    if (length === 3) {
        return value + '0';
    }

    if (length === 2) {
        return value + '00';
    }

    return value + '000';
}

/**
 * Get the soundex key from a given value.
 *
 * @param {string} value
 * @param {number} maxLength
 * @return {string}
 */

function soundexPhonetics(value, maxLength) {
    var length, iterator, character, results, prev, phonetics;

    value = String(value).toLowerCase();

    length = value.length;
    iterator = -1;
    results = [];

    while (++iterator < length) {
        character = value.charAt(iterator);
        phonetics = map[character];

        /* Initial letter */
        if (iterator === 0) {
            results.push(character.toUpperCase());
        /* Phonetics value */
        } else if (phonetics && phonetics !== prev) {
            results.push(phonetics);
        /* Vowel */
        } else if (phonetics === 0) {
            phonetics = null;
        /* Unknown character (including H and W) */
        } else {
            phonetics = prev;
        }

        prev = phonetics;
    }

    return pad(results.join('')).substr(0, maxLength || DEFAULT_LENGTH);
}

/**
 * Export `soundexPhonetics`.
 */

module.exports = soundexPhonetics;
