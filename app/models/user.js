module.exports = function (app) {
    // Mongo
    var Mongoose = app.Mongoose;
    var MongooseValidators = app.MongooseValidators;

    // Utils
    var i18n = app.utils.i18n;

    var UserSchema = new Mongoose.Schema({
        email: {
            type: String,
            required: i18n.validation.required,
            unique: true,
            validate: MongooseValidators.isEmail({message: i18n.validation.email})
        },
        password: {
            type: String,
            required: i18n.validation.required
        }
    });

    return Mongoose.model('User', UserSchema);
};