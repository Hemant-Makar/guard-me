const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
// Schema for Geolocation
const GeolocationSchema = new Schema({
    latitude: { type: Number, require: true, default: 0.0 },
    longitude: { type: Number, require: true, default: 0.0 }
});

// Schema for participants
const VictimSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users', require: true },
    location: { _id: false, type: GeolocationSchema, require: true },
    state: { type: Number, required: true, default: 0 },
    message: { type: String, trim: true, default: null },
});

const alarmSchema = new Schema({
    name: { type: String, trim: true, require: true },
    location: { _id: false, type: GeolocationSchema, require: true },
    createdBy: { _id: false, type: Schema.Types.ObjectId, require: true, ref: 'Users' },
    isClosed: { type: Boolean, require: true, default: false },
    createdOn: { type: Number, require: true, default: Date.now() },
    participants: [{ _id: false, type: VictimSchema }],
});

alarmSchema.virtual('id').get(() => { return this._id.toHexString() });

alarmSchema.set('toJSON', { virtual: true });

const Alarm = mongoose.model('Alarms', alarmSchema);

// Raise incident/alarm
exports.createAlarm = (alarmData) => {
    const alarm = new Alarm(alarmData);
    return alarm.save();
};

// Get all alarms
exports.findAllAlarms = () => {
    return Alarm.find().exec();
};

// Get Alarm By Id
exports.findAlarmById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const alarm = await Alarm.findOne({ _id: id }).populate('createdBy').populate('participants.user').exec();
            if (alarm) {
                resolve(alarm);
            } else {
                reject('Record not found');
            }
        } catch (error) {
            reject(error);
        }
    });
};

// Find and update alarm 
exports.updateAlarm = (alarmId, userId, updates) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Alarm.findOneAndUpdate({ _id: alarmId }, updates, { new: true }).exec();
            if (result) {
                resolve(result);
            } else {
                reject('Record not found');
            }
        } catch (error) {
            reject(error);
        }
    });
};
// Find and delete alarm 
exports.deleteAlarm = (alarmId, userId, updates) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Alarm.findOneAndDelete({ _id: alarmId }).exec();
            if (result) {
                resolve('Record deleted successfully');
            } else {
                reject('Record not found');
            }
        } catch (error) {
            reject(error);
        }
    });
};

// update user state in current alarms
exports.updateUserState = (alarmId, userId, updates) => {
    return new Promise(async (resolve, reject) => {
        try {
            const alarm = await Alarm.findOne({ _id: alarmId, 'participants.user': userId }).exec();
            if (alarm) {
                const index = alarm.participants.findIndex(p => p.user.toString() === userId);
                if (index !== -1) {
                    const userInfo = alarm.participants[index].toJSON();
                    alarm.participants[index] = {
                        ...userInfo,
                        ...updates
                    };
                    await alarm.save();
                }
                resolve(alarm);
            } else {
                reject('Record not found');
            }
        } catch (error) {
            reject(error);
        }
    });
};

// Join user in current alarm
exports.joinAlarm = (alarmId, userId, updates) => {
    return new Promise(async (resolve, reject) => {
        try {
            let alarm = await Alarm.findOne({ _id: alarmId, isClosed: false }).exec();
            if (alarm) {
                const index = alarm.participants.findIndex(p => p.user.toString() === userId);
                if (index !== -1) {
                    // User is already participated in alarm. Update the user state
                    const userInfo = alarm.participants[index].toJSON();
                    alarm.participants[index] = {
                        ...userInfo,
                        ...updates
                    };
                } else {
                    // Join new user
                    const victim = {
                        ...updates,
                        user: userId
                    };
                    alarm.participants.push(victim);
                }
                await alarm.save();

                // Fetch updated participants
                alarm = await Alarm.findOne({ _id: alarmId }).populate('participants.user').exec();
                resolve(alarm);
            } else {
                reject(`No open alarm found with name ${alarm.name}`)
            }
        } catch (error) {
            reject(error);
        }
    });
}

// Leave Alarm
exports.leaveAlarm = (alarmId, userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const alarm = await Alarm.findOne({ _id: alarmId, 'participants.user': userId }).exec();
            if (alarm) {
                alarm.participants = alarm.participants.filter(p => p.user.toString() !== userId);
                await alarm.save();
                resolve(`User leave from ${alarm.name} successfully`);
            } else {
                reject(`Alarm not found or you are not participated in selected alarm`);
            }
        } catch (error) {
            reject(error);
        }

    });
};