const Container = require('typedi').Container;
const OdooService = Container.get('OdooService');
const NeptunoService = Container.get('NeptunoService');

module.exports = app => {
  app.post('/login', async (req, res) => {
    console.log(req.body);
    var inParams = [];
    inParams.push([
      ['name', '=', req.body.dni]
    ]);
    var params = [];
    params.push(inParams);

    OdooService.execute_kw(
      'res.partner.id_number',
      'search_read',
      params,
      (err, results) => {
        console.log(results);
        if (err) {
          res.status(500).send(err);
          return;
        }
        if (results == undefined) {
          res.status(404).send({
            message: 'User not found',
          });
          return;
        }
        console.log(results);
        if (results[0] != undefined) {
          console.log(results[0]);
          let ret = {
            id: results[0].partner_id[0],
            nombre: results[0].partner_id[1],
            token: results[0].partner_id[0],
          };
          res.send(ret);
        }
      },
    );
  });

  app.get('/getPartner', async (req, res) => {
    var inParams = [];
    inParams.push([
      ['id', '=', req.query.id]
    ]);
    inParams.push([
      'name',
      'country_id',
      'comment',
      'parent_id',
      'title',
      'email',
      'street',
      'mobile',
      'fax',
    ]); //fields
    inParams.push(0); //offset
    inParams.push(5); //limit
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'res.partner',
      'search_read',
      params,
      (err, value) => {
        if (err) {
          return console.log(err);
        }
        res.send(value[0]);
      },
    );
  });

  app.post('/updatePartner', async (req, res) => {
    console.log(req.body);
    var inParams = [];
    inParams.push([req.body.partner.id]); //id to update
    inParams.push({
      name: req.body.partner.nombre,
      email: req.body.partner.email,
      mobile: req.body.partner.celular,
      street: req.body.partner.direccion,
    });
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'res.partner',
      'write',
      params,
      (err, value) => {
        if (err) {
          return console.log(err);
        }
        console.log(value);
        res.send(value);
      },
    );
  });

  app.post('/search', async (req, res) => {
    console.log(req.body);
    var inParams = [];
    inParams.push([
      ['name', 'ilike', '%' + req.body.searchTerm + '%']
    ]);
    inParams.push(['name', 'parent_id', 'title']); //fields
    inParams.push(0); //offset
    inParams.push(10); //limit
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'res.partner',
      'search_read',
      params,
      (err, value) => {
        if (err) {
          return console.log(err);
        }
        console.log(value);
        res.send(value);
      },
    );
  });

  app.post('/updateStudent', async (req, res) => {
    console.log(req.body);
    var inParams = [];
    inParams.push([req.body.student.id]); //id to update
    inParams.push({
      name: req.body.student.name,
      email: req.body.student.email,
      fax: req.body.student.fax,
      mobile: req.body.student.mobile,
    });
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'res.partner',
      'write',
      params,
      (err, value) => {
        if (err) {
          return console.log(err);
        }
        console.log(value);
        res.send(value);
      },
    );
  });

  app.get('/getStudents', async (req, res) => {
    console.log(req.query.id);
    var inParams = [];
    inParams.push([
      ['parent_id', '=', Number(req.query.id)],
      ['title', '=', 10],
    ]);
    inParams.push([
      'name',
      'country_id',
      'comment',
      'parent_id',
      'title',
      'email',
      'street',
      'mobile',
      'fax',
    ]); //fields
    inParams.push(0); //offset
    inParams.push(5); //limit
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'res.partner',
      'search_read',
      params,
      (err, value) => {
        if (err) {
          return console.log(err);
        }
        console.log(value);
        res.send(value);
      },
    );
  });

  app.get('/getGrupoFamiliar', async (req, res) => {
    var inParams = [];
    inParams.push(parseInt(req.query.id)); //ids
    inParams.push([
      'name',
      'country_id',
      'comment',
      'child_ids',
      'sale_order_ids',
      'x_neptuno_id',
    ]); //fields
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw('res.partner', 'read', params, function (
      err2,
      value,
    ) {
      if (err2) {
        return console.log(err2);
      }

      res.send(value);
    });
  });

  app.post('/getGrupoFamiliarContactos', async (req, res) => {
    console.log(req.body);
    var inParams = [];
    inParams.push(req.body.ids); //ids
    inParams.push([
      'name',
      'country_id',
      'type',
      'company_type',
      'comment',
      'parent_id',

      'title',
      'email',
      'street',
      'mobile',
      'fax',
    ]); //fields
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'res.partner',
      'read',
      params,
      (err, value) => {
        if (err) {
          return console.log(err);
        }
        console.log(value);
        res.send(value);
      },
    );
  });

  app.get('/getProductos', async (req, res) => {
    var inParams = [];
    inParams.push([]);
    inParams.push(['id', 'name', 'list_price']); //fields
    inParams.push(0); //offset
    inParams.push(10); //limit
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'product.template',
      'search_read',
      params,
      (err, value) => {
        if (err) {
          return console.log(err);
        }
        console.log(value);
        res.send(value);
      },
    );
  });

  app.post('/confirmSo', async (req, res) => {
    console.log(req.body.student.id);

    var inParams = [];
    inParams.push({
      partner_id: req.body.student.id,
    });
    console.log(inParams);
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw('sale.order', 'create', params, async function (
      err,
      value,
    ) {
      if (err) {
        return console.log(err);
      }
      console.log('Result: ', value);
      var inParams = [];
      inParams.push({
        order_id: value,
        product_id: req.body.clase.id,
      });
      console.log(inParams);
      var params = [];
      params.push(inParams);
      await OdooService.execute_kw(
        'sale.order.line',
        'create',
        params,
        function (err, value) {
          if (err) {
            return console.log(err);
          }
          console.log('Result: ', value);
          res.send({
            orderLineId: value
          });
        },
      );
    });
  });

  app.get('/getSos', async (req, res) => {
    console.log(req.query.studentId)
    var inParams = [];
    inParams.push([
      ['partner_id', '=', parseInt(req.query.studentId)],
      ['invoice_status', '=', 'to invoice']
    ]);
    inParams.push(0); //offset
    inParams.push(100); //Limit
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw('sale.order', 'search', params, async function (err, value) {
      if (err) {
        return console.log(err);
      }
      var inParams = [];
      inParams.push(value); //ids
      var params = [];
      params.push(inParams);
      await OdooService.execute_kw('sale.order', 'read', params, function (err2, value2) {
        if (err2) {
          return console.log(err2);
        }
        console.log('Result: ', value2);
        res.send(value2);
      });
    });
  });
  // #########################################################################
  // Neptuno
  // #########################################################################

  app.post('/npt_crear_grupo_familiar', async (req, res) => {
    await NeptunoService.crearGrupoFamilar(req.body.gf, async (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (!result) {
        res.status(404).send({
          message: 'User not found',
        });
      }
      var inParams = [];
      inParams.push({
        x_neptuno_id: 'gf' + result.dataValues.id,
        name: 'Familia ' + req.body.gf.name,
        company_type: 'company',
        email: req.body.gf.email,
        street: req.body.gf.direccion,
      });
      console.log(inParams);
      var params = [];
      params.push(inParams);
      await OdooService.execute_kw(
        'res.partner',
        'create',
        params,
        async function (err, value) {
          if (err) {
            return console.log(err);
          }
          console.log('Result: ', value);
          var inParams = [];
          inParams.push({
            name: req.body.gf.contact_name,
            parent_id: value,
            type: 'invoice',
            company_type: 'person',
            title: 8,
          });
          console.log(inParams);
          var params = [];
          params.push(inParams);
          await OdooService.execute_kw(
            'res.partner',
            'create',
            params,
            function (err, value) {
              if (err) {
                return console.log(err);
              }
              console.log('Result: ', value);
            },
          );
          res.send(String(value));
        },
      );
    });
  });

  app.post('/npt_crear_alumno', async (req, res) => {
    await NeptunoService.crearStudent({
        grupos_familiare_id: req.body.grupoFamiliar.x_neptuno_id.substring(2),
        first_name: req.body.alumno,
      },
      async (err, result) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        if (!result) {
          res.status(404).send({
            message: 'User not found',
          });
        }
        console.log(result)
        var inParams = [];
        inParams.push({
          x_neptuno_id: 'st' + result.dataValues.id,
          name: result.dataValues.first_name,
          company_type: 'person',
          title: 10,
          parent_id: req.body.grupoFamiliar.id,
        });
        console.log(inParams);
        var params = [];
        params.push(inParams);
        await OdooService.execute_kw('res.partner', 'create', params, async function (
          err,
          value,
        ) {
          if (err) {
            return console.log(err);
          }
          console.log('Result: ', value);
          inParams.push([
            ['id', '=', parseInt(value)],
          ]);
          inParams.push([
            'name',
            'country_id',
            'comment',
            'parent_id',
            'title',
            'email',
            'street',
            'mobile',
            'fax',
          ]); //fields
          inParams.push(0); //offset
          inParams.push(1); //limit
          var params = [];
          params.push(inParams);
          await OdooService.execute_kw(
            'res.partner',
            'search_read',
            params,
            (err, value) => {
              if (err) {
                return console.log(err);
              }
              console.log(value);
              res.send(value);
            },
          );
        });
      },
    );
  });
};