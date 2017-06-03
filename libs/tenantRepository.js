'use strict';
const uuid = require('node-uuid');
const jwt = require('jsonwebtoken');

const Promise = require('promise');
const Repository = require('./repository').Repository;
const mongoose = require('mongoose');

// generate the JWT based apiSecret
const generateApiSecret = (apiKey) => {
  var token = jwt.sign({
    auth:  'magic',
    agent: 'x-cdsp-tenant',
    exp:   Math.floor(new Date().getTime()/1000) + 7*24*60*60 // Note: in seconds!
  }, apiKey);  // secret is defined in the environment variable JWT_SECRET
  return token;
}

class TenantRepository extends Repository {
	constructor(model) {
		super();
		this.Tenant = model;
	}

	save(tenant) {
		let _this = this;
		tenant.timestamp = new Date();
  	let apiKey = uuid.v1();
  	tenant.apiKey = apiKey;
  	tenant.apiSecret = generateApiSecret(apiKey);

		let tenantModel = new _this.Tenant(tenant);
		return tenantModel.save();
	}

	update(tenant) {
		let _this = this;
		let p = new Promise((resolve, reject) => {
			_this.Tenant.findByIdAndUpdate(tenant.id, tenant, (err, tenant) => {
				if (err) reject(err);
				else resolve(tenant);
			})
		});
		return p;
	}

	findById(id) {
	  let _this = this;
    return _this.Tenant.findOne({ _id: mongoose.Types.ObjectId(id) }).exec();
	}

	findByName(name) {
		let _this = this;
		return _this.Tenant.findOne({ name: name }).exec();
	}

	findByApiKey(apiKey) {
		let _this = this;
		return _this.Tenant.findOne({ apiKey: apiKey }).exec();
	}

	page(query, limit, offset) {
    let _this = this;
    return _this.Tenant.paginate(query, { offset: offset, limit: limit });
  }
}

module.exports.TenantRepository = TenantRepository;
