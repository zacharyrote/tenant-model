'use strict';
const debug = require('debug')('tenant-model');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('config');
const Promise = require('promise');
const DB = config.db.name;
const HOST = config.db.host;

const URL = `mongodb://${HOST}/${DB}`;
mongoose.connect(URL);

const tenantSchema = new Schema({
  id: String,
  name:  String,
  services: [{ name: String }],
  timestamp: Date,
  status: String,
  apikey: String,
  apiSecret: String
});

const Tenant = mongoose.model('Tenant', tenantSchema);

const saveTenant = (tenant) => {
  tenant.timestamp = new Date();
  return tenant.save(function(err) {
    if (err) throw err;
    console.log('Tenant created!');
  });
  return p;
}

const findTenant = (id) => {
  return Tenant.findById(id);
}

// When successfully connected
mongoose.connection.on('connected', () => {
  debug('Mongoose default connection open to');
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

exports.Tenant = Tenant;
exports.connect = connect;
exports.saveTenant = saveTenant;
exports.findTenant = findTenant;
