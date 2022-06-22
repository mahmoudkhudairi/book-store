const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, 'Name must be at least 3 characters long'],
      required: [true, 'Username is required'],
    },

    email: {
      type: String,
      unique: true,
      required: [true, 'Email address is required'],
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Passwords MUST be at least 6 characters'],
    },
    profilePicture: {
      type: String,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  },
  { timestamps: true },
);

UserSchema.path('email').validate(async (email) => {
  const emailCount = await mongoose.models.User.countDocuments({ email });
  return !emailCount;
}, 'user with that email already in Database.');
UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords must match!!!');
  }
  next();
});

UserSchema.pre('save', async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log('Error in hashing password Pre save', error);
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
