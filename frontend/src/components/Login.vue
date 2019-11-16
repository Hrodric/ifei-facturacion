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
  name: "login",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      user: "",
      pass: ""
    };
  },
  created: () => {}
};
</script>
