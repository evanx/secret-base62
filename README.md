# secret-base62

Generate random token using base62 which is alphanumeric with uppercase and lowercase.

This is suitable for secret URLs, whereas base64 includes slash in its charset.

You can test my image on DockerHub:
```
docker run evanxsummers/secret-base62
```
It should output a random base62 string e.g. `r2CKLsQ4HxfFevdl`

It is implemented as follows:
```javascript
const assert = require('assert');
const crypto = require('crypto');
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // exclude I and O since too similar to 0 and 1
const digits = '0123456789'; // omit 0 and 1 to avoid potential confusion with O and I (and perhaps 'l')
const charset = [digits, letters, letters.toLowerCase()].join('');
assert.equal(charset.length, 62);
const length = parseInt(process.env.length || '16');
const string = crypto.randomBytes(length)
.map(value => charset.charCodeAt(Math.floor(value*charset.length/256)))
.toString();
console.log(string);
```
where we generate an array of random bytes (values 0 to 255 inclusive) of the desired `length` and then map each into our charset:
```
0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
```

We can build using its `Dockerfile` as follows:
```
docker build -t secret-base62 https://github.com/evanx/secret-base62.git
```
where we tag the image so we can run by tag name:
```
docker run -t secret-base62
```
which gives random output e.g. `zQPv2WXCuy43nueh`

Use `length` envar to change from default `16`
```
docker run -e length=32 secret-base62
```
which outputs length `32` token e.g. `CMZRUgDU5RxwzhDFh7fV5EKAKz6HmXdb`

You can then use this for a secret URL e.g. for a Telegram Bot webhook, or some other purpose.

## Related

See the following related project which is case-insensitive base32.

https://github.com/evanx/secret-base32

Base32 is better for hand-written backups since some letters have similar shapes in lowercase e.g. c, s, u, v
