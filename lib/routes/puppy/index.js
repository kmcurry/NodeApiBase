var mongodb = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID;

function getPuppy(req, res, next) {
    console.log("Get puppy");

    mongodb.connect('mongodb://127.0.0.1:27017/demo', function (err, db) {
        if (err) {
            res.send(500);
            return;
        }

        var collection = db.collection('puppy');
        collection.find().toArray(function (findErr, puppies) {
            if (findErr) {
                res.send(500);
                return;
            }

            res.send(puppies);
        });

    });
}

function getPuppyWithId(req, res, next) {
    console.log("Get puppy with Idf");

    mongodb.connect('mongodb://127.0.0.1:27017/demo', function (err, db) {
        if (err) {
            res.send(500);
            return;
        }

        var parsedId;
        try {
            parsedId = new ObjectID(req.params.id);
        } catch (parseErr) {
            res.send(400, "Bad id!");
            return;
        }

        var collection = db.collection('puppy');
        collection.findOne({
            _id: parsedId
        }, function (findErr, puppy) {
            if (findErr) {
                res.send(500);
                return;
            }
            if (puppy) {
                res.send(puppy);
                return;
            }

            res.send(404);
        });

    });
}

function postPuppy(req, res, next) {
    console.log("Post puppy");
    mongodb.connect('mongodb://127.0.0.1:27017/demo', function (err, db) {
        if (err) {
            res.send(500);
            return;
        }

        var collection = db.collection('puppy');
        collection.insert(req.body, function (insertErr, docs) {
            if (insertErr) {
                res.send(500);
                console.log(insertErr);
                return;
            }
            res.location("/puppy/" + docs[0]._id);
            res.send(docs);
        });

    });
}

function putPuppy(req, res, next) {
    console.log("Put puppy");
    mongodb.connect('mongodb://127.0.0.1:27017/demo', function (err, db) {
        if (err) {
            res.send(500);
            
            return;
        }

        var parsedId;
        try {
            parsedId = new ObjectID(req.params.id);
        } catch (parseErr) {
            res.send(400, "Bad id!");
            return;
        }

        var collection = db.collection('puppy');
        console.log(req.body);
        collection.update({
                _id: parsedId
            }, req.body, {
                multi: false,
                upsert: false
            },
            function (updateErr, numberUpdated) {
                if (updateErr) {
                    res.send(500);
                    console.log(insertErr);
                    return;
                }
                console.log(docs);
                res.send(200);
            });
    });
}

function deletePuppy(req, res, next) {
    console.log("Delete puppy");
    res.send(200);
}

module.exports = {
    registerRoutes: function (app) {
        app.get("/puppy", getPuppy);
        app.get("/puppy/:id", getPuppyWithId);
        app.post("/puppy", postPuppy);
        app.put("/puppy/:id", putPuppy);
        app.delete("/puppy/:id", deletePuppy);
    }
};