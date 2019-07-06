import bcrypt from 'bcrypt';

const Helper = { hashPasword(password) {
  return bcrypt.hash(password, bcrypt.genSaltSync(12));
},

comparePassword(password, hashPassword) {
  return bcrypt.compare(password, hashPassword);
}, };

export default Helper;
