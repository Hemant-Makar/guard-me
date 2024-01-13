const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    permissionLevel: { type: Number, require: true, default: 0 }
});

userSchema.virtual('id').get(() => {
    return this._id.toHexString();
});

userSchema.set('toJSON', { virtual: true });

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
                    result = result.toJSON();
                    delete result.__v;
                    delete result.password;
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
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.find().exec();
            const records = users.map((record) => {
                record = record.toJSON();
                delete record.password;
                delete record.__v;
                return record;
            });
            resolve(records);
        } catch (error) {
            reject(error);
        }
    });
};

// Create user
exports.createUser = (userData) => {
    return new Promise(async (resolve, reject) => {
        const user = new User(userData);
        try {
            const result = await user.save();
            const record = result.toJSON();
            delete record.password;
            delete record.__v;
            resolve(record)
        } catch (error) {
            reject(error);
        }
    });
};

// Update user
exports.updateUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id: id }, userData, { new: true })
            .then(result => {
                // result will be null if record not exist
                if (result) {
                    result = result.toJSON();
                    delete result.__v;
                    delete result.password;
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