


class Api {
    constructor() {
        /** external modules **/
        this.rp = require('request-promise');
        const chai = require('chai');
        chai.use(require('chai-json-schema'));
        this.expect = chai.expect;

        /** internal modules **/
        this.schemas = require('./schemas/schemas');
        this.helper = require('./utils/helper');
        this.dbManager = require('./db-usage/manager');
        this.dbCollections = {books: require('./db-usage/collections/books')};
        this.backendConf = require('../../globalConfig').backend;
        this.baseUrl = `${this.backendConf.url}:${this.backendConf.port}`;
        this.collection = require('./collections/bookCollection');
        this.helper.prepareCollections(this.collection, this.baseUrl);
    }
}

module.exports = Api;