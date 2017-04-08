const assert = require('assert');
const crypto = require('crypto');
const digits = '0123456789';
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charset = [digits, letters, letters.toLowerCase()].join('');
assert.equal(charset.length, 62);
const length = parseInt(process.env.length || '16');
const string = crypto.randomBytes(length).map(
    value => charset.charCodeAt(
        Math.floor(value*charset.length/256)
    )
).toString();
console.log(string);
