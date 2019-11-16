<template>
  <div>
    <label>Usuario</label>
    <input type="text" name="x" :v-bind="user" />
    <label>Password</label>
    <input type="text" :v-bind="pass" />
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      user: '',
      pass: '',
    };
  },
  created: () => {
    this.odooSrv = new OdooService();
    var inParams = [];
    inParams.push([
      ['is_company', '=', true],
      ['customer', '=', true],
    ]);
    var params = [];
    params.push(inParams);
    odooSrv.execKw('res.partner', 'search_count', params, function(err, value) {
      if (err) {
        return console.log(err);
      }
      console.log('Result: ', value);
    });
  },
};
</script>
