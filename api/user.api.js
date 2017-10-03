module.exports = function (app, db) {

    app.get('/api/user', function (req, res) {
        db.collection('user').find().toArray(function (err, result) {
            res.send(result);
        });
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
        console.log("Get User: Params " + req.params);
        var user = req.params.user;
        db.collection('user').find({
            user: user
        }).toArray(function (err, result) {
            res.send(result);
        });
    });

    app.put('/api/user', function (req, res) {
        console.log(req.body);
        var user = req.body.user;
        console.log('Put user: Name is ' + user);
        db.collection('user').updateOne({
            user: user
        }, {
            $set: {
                password: req.body.password,
                role: req.body.role
            }
        }).then(function (result) {
            console.log("Put User: Name=" + result);
            res.send(result);
        })
    });

    app.post('/api/user', function (req, res) {
        console.log('POST User: Name: ' + req.body.user);
        db.collection('user').insertOne(req.body).then(function (result) {
            console.log("Post User: " + result);
            res.send(result);
        });
    });

    app.delete('/api/user/:user', function (req, res) {
        console.log('DELETE User: Name: ' + req.params.user);
        var user = req.params.user;
        db.collection('user').remove({
            user: user
        }).then(function (result) {
            console.log("Delete User: " + result);
            res.send(result);
        });
    })
}