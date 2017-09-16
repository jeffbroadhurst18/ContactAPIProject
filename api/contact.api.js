module.exports = function (app, db) {

    app.get('/api/contact', function (req, res) {
        db.collection('contact').find().toArray(function (err, result) {
            res.send(result);
        });

    });

    app.get('/api/contact/:id', function (req, res) {
        console.log(req.params);
        var id = parseInt(req.params.id);
        db.collection('contact').find({
            id: id
        }).toArray(function (err, result) {
            console.log(result);
            res.send(result);
        });
    });

    app.put('/api/contact', function (req, res) {
        console.log(req.body);
        var id = req.body.id; //parseInt(req.body.id);
        console.log('Id is ' + id);
        db.collection('contact').updateOne({
            id: id
        }, {
            $set: {
                name: req.body.name,
                dob: req.body.dob,
                telephone: req.body.telephone,
                city: req.body.city
            }
        }).then(function (result) {
            // console.log(result);
            res.send(result);
        })
    });

    app.post('/api/contact', function (req, res) {
        console.log('POST');
        products.push(req.body);
        db.collection('contact').insertOne(req.body).then(function (result) {
            res.send(result);
        });
    });

    app.delete('/api/contact/:id', function (req, res) {
        console.log('DELETE');
        var id = parseInt(req.params.id);
        db.collection('contact').remove({ id: id}).then(function (result) {
            res.send(result);
        });
    });


    
}