const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, require: true, trim: true, unique: true },
    gender: { type: String, trim: true, require: true },
    age: { type: Number, require: true },
    permissionLevel: { type: Number, require: true, default: 0 },
    password: { type: String, require: true }
});

// Hide the private properties
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.__v;

    return userObject;
}

userSchema.findById = (callback) => {
    return this.model('Users').find({ id: this.id }, callback);
}

const User = mongoose.model('Users', userSchema);

// find user by email address
exports.findByEmail = (email) => {
    return User.find({ email: email.trim() });
};

// find by user id
exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        User.findOne({ _id: id.trim() })
            .then(result => {
                // result will be null if record not exist
                if (result) {
                    resolve(result);
                } else {
                    reject('Record not found');
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// Get all users
exports.findAllUser = () => {
    return User.find().exec();
};

// Create user
exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

// Update user
exports.updateUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id: id }, userData, { new: true })
            .then(result => {
                // result will be null if record not exist
                if (result) {
                    resolve(result);
                } else {
                    reject('Record not found');
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

// delete user by id
exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({ _id: id })
            .then(result => {
                if (result.deletedCount === 0) {
                    reject(`Record not found`);
                } else {
                    resolve(`Record deleted successfully`);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};