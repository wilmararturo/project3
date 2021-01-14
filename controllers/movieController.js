const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    db.Movie.find(req.query)
      .then((dbMovie) => res.json(dbMovie))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Movie.findById(req.params.id)
      .then((dbMovie) => res.json(dbMovie))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    // // require auth => skipping for now
    // if(!req.user) {
    //   return res.status(401).end("No authentication")
    // }
    const imdbID = req.body.imdbID;
    db.Movie.findOne({ imdbID: imdbID }, (err, result) => {
      if (err) console.log(err);
      if (result) {
        console.log("Movie already saved");
      } else {
        db.Movie.create({ ...req.body })
          .then((dbMovie) => res.json(dbMovie))
          .catch((err) => res.status(401).json(err));
      }
    });
  },
  addUser: function (req, res) {
    // // require auth => skipping for now
    // if(!req.user) {
    //   return res.status(401).end("No authentication")
    // }
    db.Movie.updateOne({ _id: req.params.id }, { $push: { userIds: req.body } })
      .then((dbMovie) => res.json(dbMovie))
      .catch((err) => res.status(500).json(err));
  },
  addComment: function (req, res) {
    db.Movie.updateOne(
      { _id: req.params.id },
      { $push: { comments: req.body } }
    )
      .then((dbMovie) => res.json(dbMovie))
      .catch((err) => res.status(500).json(err));
  },
};
