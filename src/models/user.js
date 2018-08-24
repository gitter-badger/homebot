import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum : ['user', 'admin'],
    default: 'user'
  },
  devices : [{
    type: Schema.Types.ObjectId,
    ref: 'Device'
  }]
});

UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, 10, function(err, hash) {
    if (err) return next(err);

    this.password = hash;
    next();
  }.bind(this));
});

UserSchema.methods.getTokenData = function() {
  return {
    id: this.id,
    email: this.email
  }
};

UserSchema.methods.verifyPassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

UserSchema.methods.equals = function(user) {
  if (!user) return false;
  if (!user._id) return false;

  return user._id.toString()  == this._id.toString();
};

UserSchema.methods.canRead = function(object) {
  return this.equals(object) ||
    (this.devices.findIndex(x=> x.toString() === object._id.toString()) !== -1) 
    || this.role == "admin";
};

UserSchema.methods.canEdit = function(object) {
  return this.canRead(object);
};

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
