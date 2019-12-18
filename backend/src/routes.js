const Container = require('typedi').Container;
const OdooService = Container.get('OdooService');
const NeptunoService = Container.get('NeptunoService');

module.exports = app => {
  app.post('/login', async (req, res) => {
    console.log(req.body);
    var inParams = [];
    inParams.push([['name', '=', req.body.dni]]);
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
    inParams.push([['id', '=', req.query.id]]);
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
    inParams.push([['name', 'ilike', '%' + req.body.searchTerm + '%']]);
    console.log(inParams);
    inParams.push(['name', 'parent_id', 'title', 'title', 'main_id_number']); //fields
    inParams.push(0); //offset
    inParams.push(100); //limit
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
      ['title', '=', 100],
    ]);
    inParams.push([
      'name',
      'country_id',
      'comment',
      'parent_id',
      'title',
      'email',
      'main_id_number',
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
      'main_id_number',
      'sale_order_ids',
      'x_neptuno_id',
    ]); //fields
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw('res.partner', 'read', params, function(
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
      'main_id_number',
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
    await OdooService.execute_kw('sale.order', 'create', params, async function(
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
        function(err, value) {
          if (err) {
            return console.log(err);
          }
          console.log('Result: ', value);
          res.send({
            orderLineId: value,
          });
        },
      );
    });
  });

  app.post('/updateTaskName', async (req, res) => {
    console.log(req.body);
    var inParams = [];
    inParams.push([['sale_line_id', '=', req.body.orderLineId]]);

    inParams.push(['name', 'project_id', 'partner_id', 'stage_id']); //fields
    inParams.push(0); //offset
    inParams.push(100); //limit
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'project.task',
      'search_read',
      params,
      async (err, value) => {
        if (err) {
          return console.log(err);
        }
        console.log('xxxxxxxxxxxxx');
        console.log(value);
        var inParams = [];
        inParams.push(parseInt(value[0].id)); //id to update
        inParams.push({
          name: req.body.alumno.parent_id[1] + ', ' + req.body.alumno.name,
        });
        var params = [];
        params.push(inParams);
        await OdooService.execute_kw(
          'project.task',
          'write',
          params,
          (err, value) => {
            if (err) {
              return console.log(err);
            }
            console.log(value);
            res.send({ result: value });
          },
        );
      },
    );
  });

  app.get('/getSos', async (req, res) => {
    console.log(req.query.studentId);
    var inParams = [];
    inParams.push([
      ['partner_id', '=', parseInt(req.query.studentId)],
      ['invoice_status', '=', 'to invoice'],
    ]);
    inParams.push(0); //offset
    inParams.push(100); //Limit
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw('sale.order', 'search', params, async function(
      err,
      value,
    ) {
      if (err) {
        return console.log(err);
      }
      var inParams = [];
      inParams.push(value); //ids
      var params = [];
      params.push(inParams);
      await OdooService.execute_kw('sale.order', 'read', params, function(
        err2,
        value2,
      ) {
        if (err2) {
          return console.log(err2);
        }
        console.log('Result: ', value2);
        res.send(value2);
      });
    });
  });

  app.get('/getSoTask', async (req, res) => {
    console.log(req.body);
    var inParams = [];
    inParams.push([['id', '=', req.query.id]]);
    console.log(inParams);
    inParams.push(['name', 'order_line']); //fields
    inParams.push(0); //offset
    inParams.push(100); //limit
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'sale.order',
      'search_read',
      params,
      async (err, value) => {
        if (err) {
          return console.log(err);
        }

        //res.send(value);
        console.log(value[0].order_line[0]);
        var inParams = [];
        inParams.push([['sale_line_id', '=', value[0].order_line[0]]]);

        inParams.push(['name', 'project_id', 'partner_id', 'stage_id']); //fields
        inParams.push(0); //offset
        inParams.push(100); //limit
        var params = [];
        params.push(inParams);
        await OdooService.execute_kw(
          'project.task',
          'search_read',
          params,
          async (err, value) => {
            if (err) {
              return console.log(err);
            }
            console.log('xxxxxxxxxxxxx');
            console.log(value);

            res.send(value);
          },
        );
      },
    );
  });

  app.get('/get_task_types', async (req, res) => {
    console.log(req.query);
    var inParams = [];
    inParams.push([['project_ids', '=', parseInt(req.query.id)]]);

    inParams.push(['name']); //fields
    inParams.push(0); //offset
    inParams.push(100); //limit
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'project.task.type',
      'search_read',
      params,
      (err, value) => {
        if (err) {
          return console.log(err);
        }
        console.log('xxxxxxxxxxxxx');
        console.log(value);

        res.send(value);
      },
    );
  });

  app.get('/getOrderLine', async (req, res) => {
    console.log(req.query);
    var inParams = [];
    inParams.push([['id', '=', parseInt(req.query.id)]]);

    inParams.push([
      'id',
      'discount',
      'product_id',
      'product_uom',
      'price_unit',
      'product_uom_qty',
      'order_id',
      'order_partner_id',
    ]); //fields
    inParams.push(0); //offset
    inParams.push(100); //limit
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'sale.order.line',
      'search_read',
      params,
      (err, value) => {
        if (err) {
          return console.log(err);
        }
        console.log('xxxxxxxxxxxxx');
        console.log(value);

        res.send(value);
      },
    );
  });

  app.get('/stage_task_count', async (req, res) => {
    var inParams = [];
    console.log(req.query);
    inParams.push([
      //['stage_id', '=', parseInt(req.query.stage_id)],
      ['project_id', '=', parseInt(req.query.project_id)],
    ]);
    inParams.push(['name', 'project_id', 'partner_id', 'stage_id']); //fields
    inParams.push(0); //offset
    inParams.push(100); //limit
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'project.task',
      'search_read',
      params,
      async (err, value) => {
        if (err) {
          return console.log(err);
        }
        console.log('Result: ', value);
        res.send({ value: value });
      },
    );
  });

  app.post('/updateTask', async (req, res) => {
    console.log(req.body);
    var inParams = [];
    inParams.push([req.body.task.id]); //id to update
    inParams.push({
      id: req.body.task.id,
      stage_id: req.body.task.stage_id,
    });
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'project.task',
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

  app.post('/crear_contacto', async (req, res) => {
    var inParams = [];
    inParams.push({
      name: req.body.contacto,
      company_type: 'person',
      main_id_category_id: 35,
      main_id_number: req.body.dni,
      title: 8,
      parent_id: req.body.grupoFamiliar.id,
    });
    console.log(inParams);
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'res.partner',
      'create',
      params,
      async function(err, value) {
        if (err) {
          return console.log(err);
        }
        res.send('Result ' + value);
      },
    );
  });

  app.post('/crear_factura', async (req, res) => {
    console.log('1');
    console.log(req.body);
    var inParams = [];
    inParams.push({
      partner_id: req.body.grupoFamiliar.id,
      afip_service_start: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-'),
      afip_service_end: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-'),
      //afip_concept: 'Servicios',
      payment_term_id: 1,
      journal_id: 1,
      journal_document_type_id: 19,
    });

    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'account.invoice',
      'create',
      params,
      async function(err, value) {
        if (err) {
          return console.log(err);
        }
        res.send({ Result: value });
      },
    );
  });
  app.post('/crear_linea_factura', async (req, res) => {
    console.log('2');
    console.log(req.body);
    var inParams = [];
    inParams.push({
      invoice_id: req.body.invoiceId,
      price_unit: req.body.linea.price_unit,
      product_id: req.body.linea.product_id[0],
      discount: req.body.linea.discount,
      origin: req.body.linea.order_id[1],
      quantity: 1,
      sale_order_lines: req.body.linea.id,
      account_id: 13,
      invoice_line_tax_ids: [4, 11, 0],
      name:
        req.body.linea.product_id[1] +
        ', ' +
        req.body.linea.order_partner_id[1],
    });
    console.log(inParams);
    var params = [];
    params.push(inParams);
    await OdooService.execute_kw(
      'account.invoice.line',
      'create',
      params,
      async function(err, value) {
        if (err) {
          return console.log(err);
        }
        res.send('Result ' + value);
      },
    );
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
        main_id_number: req.body.gf.id_number,
        main_id_category_id: 35,
        is_company: true, // Corrected company_type:'company' //DONE
        property_account_position_id: (0,0,1), //Corrected property_account_position_id: 1,
        property_payment_term_id: 1,
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
        async function(err, value) {
          if (err) {
            return console.log(err);
          }
          console.log('Result: ', value);
          var inParams = [];
          inParams.push({
            name: req.body.gf.contact_name,
            parent_id: value,
            is_company: false, // Correction: company_type: 'person'
            title: 8,
            afip_responsability_type_id: (0,0,6), //Correction info: consumidor final - update: (1, ID, { values }) or new record: (0,0,id)
            property_account_position_id: (0,0,1), //Correction new record.
          });
          console.log(inParams);
          var params = [];
          params.push(inParams);
          await OdooService.execute_kw(
            'res.partner',
            'create',
            params,
            async function(err, value) {
              if (err) {
                return console.log(err);
              }
            },
          );
          res.send(String(value));
        },
      );
    });
  });

  app.post('/npt_crear_alumno', async (req, res) => {
    console.log(req.body);
    let nptId = '';
    if (req.body.grupoFamiliar.x_neptuno_id !== undefined) {
      nptId = req.body.grupoFamiliar.x_neptuno_id.substring(2);
    }
    await NeptunoService.crearStudent(
      {
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
        console.log(result);
        var inParams = [];
        inParams.push({
          x_neptuno_id: 'st' + result.dataValues.id,
          name: result.dataValues.first_name,
          company_type: 'person',
          main_id_category_id: 35,
          main_id_number: req.body.dni,
          property_payment_term_id: 1,
          title: 10,
          street: req.body.grupoFamiliar.direccion,
          parent_id: req.body.grupoFamiliar.id,
        });
        console.log(inParams);
        var params = [];
        params.push(inParams);
        await OdooService.execute_kw(
          'res.partner',
          'create',
          params,
          async function(err, value) {
            if (err) {
              return console.log(err);
            }
            console.log('Result: ', value);

            res.send('Result: ' + value);
          },
        );
      },
    );
  });
};
