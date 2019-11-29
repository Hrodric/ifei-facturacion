const Sequelize = require('sequelize');
const Op = Sequelize.Op;


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
            // attributes
            grupos_familiare_id: {
                type: Sequelize.INTEGER,
                allowNull: false
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

        const LnCuentas = this.sequelize.define('ln_cuentas', {

            // attributes
            id: {
                primaryKey: true,
                type: Sequelize.STRING,
                allowNull: false
            },
            grupos_familiare_id: {
                type: Sequelize.STRING
                // allowNull defaults to true
            }
        }, {
            timestamps: false
        });

        const LnCuentasMovs = this.sequelize.define('ln_cuentasmovs', {
            createdAt: {
                field: 'created',
                type: Sequelize.DATE
            },
            updatedAt: {
                field: 'created',
                type: Sequelize.DATE

            },
            // attributes
            id: {
                primaryKey: true,
                type: Sequelize.STRING,
                allowNull: false
            },
            ln_cuenta_id: {
                type: Sequelize.STRING
                // allowNull defaults to true
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
        });

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

        this.crearStudent = (student, cb) => {
            students.create(
                student
            ).then(function (gf) {
                cb(null, gf)
            });
        }
    }

}

module.exports = NeptunoService;