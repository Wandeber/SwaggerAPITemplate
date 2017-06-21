"use strict";



var SwaggerExpress 	= require("swagger-express-mw"),
	express 		= require("express"),
	resolve 		= require("json-refs").resolveRefs,
	YAML 			= require("js-yaml"),
	fs 				= require("fs"),
	config 			= require("./config/config"),
	bodyParser 		= require("body-parser"),
	app 			= require("express")();



// Database connection
var mongoose = require("mongoose");
mongoose.connect(config.mongodb);

// json body parser
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

var root = YAML.load(fs.readFileSync("./index.yaml").toString());
var options = {
	filter        : ["relative", "remote"],
	loaderOptions : {
		processContent : function (res, callback) {
			callback(null, YAML.load(res.text));
		}
	}
};

resolve(root, options).then(function (results) {
	var config_swagger = {
		swagger: results.resolved,
		appRoot: __dirname // required config
	};

	SwaggerExpress.create(config_swagger, function (err, swaggerExpress) {
		if (err) {throw err;}

		// Enable SwaggerUI
		app.use(swaggerExpress.runner.swaggerTools.swaggerUi());
		app.use("/swagger-ui", express.static(__dirname + "/swagger-ui"));

		// Redirect / to swagger-ui
		app.get("/", function (req, res) {
			res.redirect("/swagger-ui");
		});

		// Install middleware
		swaggerExpress.register(app);

		var port = process.env.PORT || 10011;
		app.listen(port);
	});
});



module.exports = app;
