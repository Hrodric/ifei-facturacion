const Container = require("typedi").Container;

const OdooService = require("./OdooService");
const NeptunoService = require("./NeptunoService");

Container.set('OdooService', new OdooService())
Container.set('NeptunoService', new NeptunoService())