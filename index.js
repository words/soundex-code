'use strict';

/* Expose. */
module.exports = soundex;

/* Minimum length of Soundex keys. */
var DEFAULT = 4;

/* Soundex values belonging to characters.
 * This map also includes vowels (with a value of 0)
 * to easily distinguish between an unknown value or
 * a vowel. */
var map = {};

map.a = map.e = map.i = map.o = map.u = map.y = 0;
map.b = map.f = map.p = map.v = 1;
map.c = map.g = map.j = map.k = map.q = map.s = map.x = map.z = 2;
map.d = map.t = 3;
map.l = 4;
map.m = map.n = 5;
map.r = 6;

/* Get the soundex key from a given value. */
function soundex(value, maxLength) {
  var results = [];
  var index = -1;
  var length;
  var character;
  var prev;
  var phonetics;

  value = String(value).toLowerCase();
  length = value.length;

  while (++index < length) {
    character = value.charAt(index);
    phonetics = map[character];

    /* Initial letter */
    if (index === 0) {
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

  return pad(results.join('')).substr(0, maxLength || DEFAULT);
}

/* Pad a given value with zero characters. The function only pads four
 * characters. */
function pad(value) {
  var length = value.length;

  if (length >= DEFAULT) {
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
