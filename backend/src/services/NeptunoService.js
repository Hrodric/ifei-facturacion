const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Moment = require('moment');


class NeptunoService {

    constructor() {
        this.sequelize = new Sequelize(process.env.NPT_DB, process.env.NPT_USER, process.env.NPT_PASSWORD, {
            host: process.env.NPT_HOST,
            dialect: 'mysql'
        });

        this.gruposFamiliares = [];

        const gruposFamiliares = this.sequelize.define('grupos_familiares', {

            // attributes

            apellido: {
                type: Sequelize.STRING
            },
            dni: {
                field: 'direccion_trabajo_madre',
                type: Sequelize.STRING
            },
            padre: {
                type: Sequelize.STRING
            },
            email_padre: {
                type: Sequelize.STRING
            },
            direccion_trabajo_madre: {
                type: Sequelize.STRING
            }
        }, {
            timestamps: false
        })

        const students = this.sequelize.define('students', {
            createdAt: {
                field: 'created',
                type: Sequelize.DATE
            },
            updatedAt: {
                field: 'modified',
                type: Sequelize.DATE

            },
            gruposFamiliareId: {
                field: 'grupos_familiare_id',
                type: Sequelize.INTEGER
            },

            first_name: {
                type: Sequelize.STRING
                // allowNull defaults to true
            },
            last_name: {
                type: Sequelize.STRING
                // allowNull defaults to true
            }
        }, {
            // options
        });
        //Inicio Sequelize Class_Names Model -> getClases
        const clases = this.sequelize.define('class_names', {
            id: {
                field: 'id',
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            short: {
                type: Sequelize.STRING
            },
        });
        //Fin Sequelize Class_Names Model
        const LnCuentas = this.sequelize.define('ln_cuentas', {

            // attributes
            id: {
                primaryKey: true,
                type: Sequelize.STRING,
                allowNull: false
            },
            gruposFamiliareId: {
                field: 'grupos_familiare_id',
                type: Sequelize.INTEGER
            },
        }, {
            timestamps: false
        });
        LnCuentas.belongsTo(gruposFamiliares);

        const LnCuentasMovs = this.sequelize.define('ln_cuentasmovs', {
            createdAt: {
                field: 'created',
                type: Sequelize.DATE
            },
            updatedAt: {
                field: 'created',
                type: Sequelize.DATE

            },
            lnCuentaId: {
                field: 'ln_cuenta_id',
                type: Sequelize.INTEGER
            },
            // attributes
            id: {
                primaryKey: true,
                type: Sequelize.STRING,
                allowNull: false
            },

            egreso: {
                type: Sequelize.BOOLEAN
                // allowNull defaults to true
            },
            descripcion: {
                type: Sequelize.STRING
                // allowNull defaults to true
            },
            pesos: {
                type: Sequelize.FLOAT
                // allowNull defaults to true
            },
            user: {
                type: Sequelize.STRING
                // allowNull defaults to true
            },
            auto: {
                type: Sequelize.STRING
                // allowNull defaults to true
            },
            student_id: {
                type: Sequelize.STRING
                // allowNull defaults to true
            },
            clase_id: {
                type: Sequelize.STRING
                // allowNull defaults to true
            },
            pago_id: {
                type: Sequelize.STRING
                // allowNull defaults to true
            },
            odoo_id: {
                type: Sequelize.INTEGER
            }
        });
        LnCuentasMovs.belongsTo(LnCuentas);

        this.sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        this.crearGrupoFamilar = (grupoFamiliar, cb) => {
            gruposFamiliares.create({
                apellido: grupoFamiliar.name,
                padre: grupoFamiliar.contact_name,
                email_padre: grupoFamiliar.email
            }).then(function (gf) {
                cb(null, gf)
            });
        }
        this.registrarFactura = (datos, cb) => {
            console.log('linea 172', datos);
            this.sequelize.query("UPDATE `ln_cuentasmovs` SET `odoo_id`=" + datos.invoice_id + " WHERE `id` =" + datos.pago_id)
            cb(null, datos)
        }

        this.crearStudent = (student, cb) => {
            students.create(
                student
            ).then(function (gf) {
                cb(null, gf)
            });
        }



        this.getPagosMes = (mes, cb) => {
            LnCuentasMovs.findAll({
                    where: {
                        createdAt: {
                            [Op.gte]: Moment('01/03/2020', 'DD/MM/AAAA').toDate()
                        },
                        odoo_id: null,
                        egreso: false
                    }
                })
                .then(function (items) {
                    var movimientos = []
                    console.log(items)
                    let ret = []
                    items.map(function (x) {
                        ret.push(
                            x.dataValues
                        )
                    });
                    cb(null, ret)

                })

        }

        this.getPago = (id, cb) => {
            LnCuentasMovs.findAll({
                    where: {
                        pago_id: id.id
                    }
                })
                .then(function (items) {
                    console.log(items)
                    var movimientos = []
                    var pago = {}
                    items.map(function (x) {
                        console.log(x)
                        if (x.dataValues.egreso) {
                            movimientos.push(x.dataValues)
                        } else {
                            pago = x.dataValues
                        }
                    });
                    LnCuentas.findAll({
                            include: [{
                                model: gruposFamiliares
                            }],
                            where: {
                                id: items[0].dataValues.lnCuentaId
                            }
                        })
                        .then(function (cuenta) {

                            var gf = cuenta[0].dataValues.grupos_familiare.dataValues;
                            let ret = {
                                grupo: gf,
                                pago: pago,
                                movs: movimientos
                            }

                            cb(null, ret)
                        })

                })


        }
    }

}

module.exports = NeptunoService;