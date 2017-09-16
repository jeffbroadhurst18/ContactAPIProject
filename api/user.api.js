module.exports = function (app, db) {

    app.get('/api/user', function (req, res) {
        db.collection('user').find().toArray(function (err, result) {
            res.send(result);
        });

    app.get('/api/user/:user&:password', function (req, res) {
        console.log("Params " + req.params);
        var user = req.params.user;
        var password = req.params.password;
        db.collection('user').find({
            user: user,
            password: password
        }).toArray(function (err, result) {
            if (result.length > 0) {res.send({ 'loggedin':'true'});}
            else {
                res.send({ 'loggedin':'false'});
            }
            // console.log(result);
            // res.send(result);
        });
    });

    });
}