/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uniqueValidator = require('mongoose-unique-validator');

const config = require('../../common/config/config');
const roles = require('../../common/enum/roles');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      required: [true, 'Please add an email'],
      type: String,
      index: true,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please add a valid Mail'
      ]
    },
    phoneNumber: {
      required: [true, 'Please add phoneNumber'],
      type: String,
      index: true,
      unique: true,
      sparse: true
    },
    name: {
      required: [true, 'Please add a name'],
      type: String
    },
    userName: {
      required: [true, 'Please add user name'],
      type: String,
      index: true,
      unique: true,
      sparse: true
    },
    password: {
      type: String,
      minlength: [8, 'Password length should be more than 8 characters'],
      maxlength: [40, 'Password length should be less than 40 characters'],
      required: true,
      select: false
    },
    roles: {
      type: [String],
      required: true,
      enum: Object.values(roles)
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(+config.salt);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign jwt
UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    config.jwt.key,
    {
      algorithm: 'HS256',
      expiresIn: config.jwt.expire
    }
  );
};

UserSchema.methods.toAuthJSON = function () {
  const data = {
    _id: this._id,
    name: this.name,
    email: this.email,
    roles: this.roles,
    token: `Bearer ${this.generateJWT()}`
  };
  if (this.roles.includes(roles.BUSINESS_ADMIN)) {
    data.businessId = this.businessId;
  }
  return data;
};

// Match user hashed password with entered password
UserSchema.methods.validatePassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  return isMatch;
};

UserSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
});

const User = mongoose.model('User', UserSchema);

User.syncIndexes();
module.exports = User;
