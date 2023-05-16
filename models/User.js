const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const qualificationSchema = require("./qualificationSchema");
const experienceSchema = require("./experienceSchema");
const skillsSchema = require("./skillsSchema");

const userSchema = new mongoose.Schema(
  {
    //User is === Job Seeker
    image: String,

    firstName: {
      type: String,
      required: [true, "Please provide your first name."],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Please provide your last name."],
      trim: true,
    },

    nid: {
      type: String,
      required: [true, "Please provide the national ID card number."],
      trim: true,
      // match: [/A\d\d\d\d\d\d/i, "Provide a valid national ID card number."],
      length: [7, "Provide a valid national ID card number."],
    },

    email: {
      type: String,
      required: [true, "Please provide your email address"],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
      lowercase: true,
      unique: true,
    },

    accountType: {
      required: [true, "Select an account type."],
      type: String,
      enum: {
        values: ["Job Seeker"],
        message: "Select an account type.",
      },
      default: "Job Seeker",
    },

    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password must be minimum 8 characters long."],
      maxlength: [20, "Password cannot be more than 20 characters."],
      match: [
        /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
        "Password must have atleast 1 uppercase letter, 1 special character, and 1 number.",
      ],
      select: false,
    },

    following: { type: [mongoose.SchemaTypes.ObjectId], ref: "Employer" },

    ratings: { type: [mongoose.SchemaTypes.Map] },

    resetPasswordToken: String,

    resetPasswordExpiry: Date,

    // resume

    contact: Number,
    gender: String,
    dob: Date,
    maritalStatus: String,
    qualifications: [qualificationSchema],
    experiences: [experienceSchema],
    about: String,
    skills: [skillsSchema],

    jobsApplied: { type: Number, default: 0 },
    applicationsAccepted: { type: Number, default: 0 },
    applicationsRejected: { type: Number, default: 0 },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      firstName: this.firstName,
      accountType: this.accountType,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );
};

userSchema.methods.setResetPasswordFields = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpiry = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

module.exports = new mongoose.model("User", userSchema);
