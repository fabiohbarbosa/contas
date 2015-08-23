module.exports = function () {
    return {
        callbackErr: function (err, res, payload) {
            if (err) {
                var errors = [];
                var error = [];

                for (var field in err.errors) {
                    var message = err.errors[field].message;
                    error.push({field: field, message: message.charAt(0).toUpperCase() + message.slice(1)});
                }

                if (err && err.name) {
                    errors.push({name: err.name});
                }
                if (error) {
                    errors.push(error.reverse());
                }

                var defaultMessage;
                if (err && err.message) {
                    defaultMessage = err.message;
                }

                res.status(400).json({
                    payload: payload,
                    message: defaultMessage,
                    errors: errors
                });
            }
        }
    };
};