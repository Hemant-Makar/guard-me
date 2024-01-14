const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const GeolocationSchema = new Schema({
    _id: false,
    latitude: { type: Number, require: true, default: 0.0 },
    longitude: { type: Number, require: true, default: 0.0 }
});
const alarmSchema = new Schema({
    name: { type: String, require: true },
    location: { type: GeolocationSchema, require: true },
    createdBy: { type: Schema.Types.ObjectId, require: true, ref: 'Users' },
    isClosed: { type: Boolean, require: true, default: false },
    createdOn: { type: Number, require: true, default: Date.now() },
    participants: [{ type: Schema.Types.ObjectId, ref: "Users", require: true }]
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
    return Alarm.find().populate('participants').exec();
};

// Get Alarm By Id
exports.findAlarmById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const alarm = await Alarm.findOne({ _id: id }).populate('participants').exec();
            if (alarm) {
                resolve(alarm);
            } else {
                reject('Alarm not found');
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
                reject('Alarm not found');
            }
        } catch (error) {
            reject(error);
        }
    });
};