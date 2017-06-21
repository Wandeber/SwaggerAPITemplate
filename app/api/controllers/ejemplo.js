'use strict';



/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	q = require('q'),
	Promise = q.Promise,
	config = require('../../config/config'),
	Ejemplo = require("../models/ejemplo");



var EjemploController =  {
	/* Properties */

	/* Methods */
	
	/**
	 * Lista de solicitudes
	 */
	list: function(req, res) {
		// FILTRO PARA QUE LOS INTEGRADORES SOLO VEAN SUS SOLICITUDES
		var query = {};
		Ejemplo.loadAll(function (err, ejemplos) {
			if (err) {
				res.status(500).jsonp({error: true, message: err.message});
			}
			else {
				// console.log(requests);
				res.status(200).jsonp(ejemplos);
			}
		});
	}
};

module.exports = EjemploController;
