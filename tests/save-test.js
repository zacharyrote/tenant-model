'use strict';

const uuid = require('uuid');
const assert = require('chai').assert;
const model = require('../index.js').model;
const Tenant = model.Tenant;

/**
 * Tenant model
 * Save test
 */
describe('tenant-model:save', () => {
  let id = uuid.v1();
  before((done) => {
    done();
    });

  let tenant = {
    id: id,
    name: 'CCHSConnectedHome',
    timestamp: new Date(),
    apikey : 'newKey',
    apiSecret: 'newSecret',
    status: 'Active',
    services: [{name: 'DiscoveryService'}]
  };

  it('Saving test tenant', (done) => {
    var tenantModel = new Tenant(tenant);
     model.saveTenant(tenantModel).then((result) => {
      assert(result, "Tenant was saved");
      done();
    }).catch((err) => {
      assert(err === null, "Failure did not occur");
      done(err);
    });
  });



  after(() => {

  });
});
