const Container = require("typedi").Container;

const OdooService = require("./OdooService");

Container.set('OdooService', new OdooService())