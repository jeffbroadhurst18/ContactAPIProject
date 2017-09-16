var dbLogger = function (req, res, next) {
    if (req.method === 'GET') {
        console.log('GET');
        
    }
    if (req.method === 'POST') {
        console.log('POST');
        console.log(req.body);
    }

    if (req.method === 'OPTIONS') {
        next();
    }
    // if (req.headers.token === "testToken") {
    //     console.log('valid request');
    //     next();
    // } else {
    //     console.log('invalid request');
    //     res.status(401).send('Invalid Request');
    // }
next();
}
module.exports = dbLogger;