const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    // The second argument to the Schema constructor is an 'options' object.
    // 'timestamps: true' tells Mongoose to automatically add two fields to each document:
    // - createdAt: A timestamp representing when the document was created.
    // - updatedAt: A timestamp representing when the document was last updated.
    // This is incredibly useful for auditing and tracking changes.
    timestamps: true,
  },
);

// Export the Mongoose model.
// mongoose.model() compiles the schema into a model.
// The first argument is the singular name of the model, 'User'.
// Mongoose will automatically look for the plural, lowercased version of your model name for the collection.
// Thus, the 'User' model will be for the 'users' collection in the database.
// This exported model can now be used in other parts of our application (like our route controllers) to interact with the 'users' collection.

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

module.exports = new mongoose.model("User", userSchema);
