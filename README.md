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

## Related

- https://github.com/evanx/secret-base26
- https://github.com/evanx/secret-base32
- https://github.com/evanx/secret-base36
- https://github.com/evanx/secret-base56
