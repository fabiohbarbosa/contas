module.exports = function (app) {
    var Mongoose = app.Mongoose;
    var i18n = app.utils.i18n;

    var CategorySchema = new Mongoose.Schema({
        name: {
            type: String,
            required: i18n.validation.required,
            unique: false
        },
        category: {
            type: Array,
            ref: 'Category'
        }
    });
    return Mongoose.model('Category', CategorySchema);
};