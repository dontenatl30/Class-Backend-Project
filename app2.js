const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// https://www.youtube.com/watch?v=AzA_LTDoFqY

// https://www.md5hashgenerator.com/

// https://www.cleancss.com/sha1-hash-generator/



bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});
