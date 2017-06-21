'use strict';



var mongoose = require('mongoose');



var EjemploSchema = mongoose.Schema({
  ejemploParam: {
    type: String
  }
}, {collection: "ejemplos"});

EjemploSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

EjemploSchema.statics.loadAll = function(cb) {
  this.find({}).exec(cb);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Ejemplo', EjemploSchema);
