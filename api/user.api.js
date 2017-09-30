module.exports = function (app, db) {

    app.get('/api/user', function (req, res) {
        db.collection('user').find().toArray(function (err, result) {
            res.send(result);
        });

        app.get('/api/user/:user&:password', function (req, res) {
            console.log("Params " + req.params.user + " " + req.params.password);
            var user = req.params.user;
            var password = req.params.password;
            db.collection('user').find({
                user: user,
                password: password
            }).toArray(function (err, result) {
                if (result.length > 0) {
                    res.send({
                        'loggedin': result[0].role
                    });
                } else {
                    res.send({
                        'loggedin': 'false'
                    });
                }
            });
        });

        app.get('/api/user/get/:user', function (req, res) {
            console.log("Params " + req.params);
            var user = req.params.user;
            db.collection('user').find({
                user: user
            }).toArray(function (err, result) {
                res.send(result);
            });
        });
    });
}