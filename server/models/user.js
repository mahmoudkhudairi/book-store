const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cloudinary = require('../utils/cloudinary');
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *         profilePicture:
 *           type: string
 *           description: The user profilePicture
 *         about:
 *           type: string
 *           description: The user info
 *         favoriteBooks:
 *           type: list
 *           description: Array of all favorite Books Id's
 *         favDict:
 *           type: dict
 *           description: object of all favorite Books Id's
 *         role:
 *           type: string
 *           description: The user info
 *           enum: ['ADMIN', 'USER']
 *           default: 'USER'
 *
 *       example:
 *         name: John Doe
 *         email: john@gmail.com
 *         password: superPassword
 *         confirmPassword: superPassword
 */
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, 'Name must be at least 3 characters long'],
      required: [true, 'Username is required'],
      unique: true,
      validate: [/^[A-Za-z0-9\s]*$/, 'Only characters and numbers allowed'],
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
    about: {
      type: String,
      default: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint, quaerat, obcaecati,
      eveniet illum consectetur animi vitae autem quasi unde dolore minus officiis tenetur quis
      dolorum. Adipisci facere blanditiis accusamus consequuntur.`,
    },
    favoriteBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    favDict: {
      type: Object,
      default: {},
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER',
    },
  },
  { timestamps: true },
);

UserSchema.path('email').validate(async email => {
  const emailCount = await mongoose.models.User.countDocuments({ email });
  return !emailCount;
}, 'user with that email already in Database.');
UserSchema.path('name').validate(async name => {
  const nameCount = await mongoose.models.User.countDocuments({ name });
  return !nameCount;
}, 'name already taken.');

UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set(value => (this._confirmPassword = value));

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
UserSchema.pre('findOneAndUpdate', async function (next) {
  try {
    if (this._update.profilePicture && this._update.profilePicture.length > 120) {
      this.getUpdate().profilePicture = await cloudinary.uploadImage(
        this._update.name,
        this._update.profilePicture,
        process.env.CLOUDINARY_USERS_FOLDER_NAME,
      );
    }
    next();
  } catch (e) {
    next(e.message);
  }
});
const User = mongoose.model('User', UserSchema);

module.exports = User;
