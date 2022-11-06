var fs = require('fs');
var turf = require('@turf/turf');
var regionModel = require('../models/region.model');
var districtModel = require('../models/district.model');
var wardModel = require('../models/ward.model');

async function getLocation(lat, lng) {
	var obj = await JSON.parse(await fs.readFileSync('location_data/tanzania.geojson', 'utf8'));

	result = [];
	for (const feature of obj.features) {
		inside = await this.inside([parseFloat(lng), parseFloat(lat)], feature.geometry.coordinates);

		if (inside) {
			result = feature.properties;
		}
	}

	region = await regionModel.findOne({ code: result.Region_Cod, name: result.Region_Nam });
	district = await districtModel.findOne({ code: result.District_C, name: result.District_N, region: region });
	ward = await wardModel.findOne({ code: result.Ward_Code, name: result.Ward_Name, district: district });

	return {
		region: region,
		district: district,
		ward: ward,
	};
}

async function inside(point, vs) {
	// ray-casting algorithm based on
	// https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

	var pt = turf.point(point);
	var poly = turf.multiPolygon(vs);

	inside = turf.booleanPointInPolygon(pt, poly);
	return inside;
}

module.exports = {
	getLocation: getLocation,
	inside: inside,
};
