const { Schema, model } = require('mongoose');

const identitySchema = new Schema({
  number: {
    type: String,
  },
  images: {
    type: [String],
  },
});

const UserSchema = new Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ['customer', 'restaurant', 'admin', 'moderator', 'client'],
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
  },
  lastName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  job: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  birth: {
    type: Date,
  },
  phoneNumber: {
    type: String,
    maxlength: 13,
  },
  identityCard: {
    type: identitySchema,
  },
  dateValidation: {
    type: Date,
  },

  isBanned: {
    type: Boolean,
    default: false,
  },
  lastLoginDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  referral: {
    type: String,
    ref: 'User',
  },
  referralCode: {
    type: String,
  },
  accountStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'certified', 'banned'],
    default: 'pending',
  },
  accountType: {
    type: String,
    enum: ['accepted', 'rejected','pending', 'not_send' ],
    default: 'not_send',
  },
  position: {
    type: [Number],
  },
  certificationStatus: {
    type: String,
    enum: ['accepted', 'rejected','pending', 'not_send' ],
    default: 'not_send',
  }
},
  { timestamps: true },
);

const User = model('users', UserSchema);

module.exports = { User };