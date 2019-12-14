<template>
  <b-container>
      <div id="page-container">
        <div id="content-wrap">
          <div id="app" style="text-align:left;padding:25px">
            <img src="../static/logo.png" width="70px" />
            <div style="margin-bottom:25px;">Preinscripciones 2020 IFEI</div>
            <div style="clear:both"></div>

            <router-view />

            <div id="footer">
              <div class="text-center">
                IFEI - Instituto Fueguino de Enseñanza Inglesa
              </div>
            </div>
        </div>
        </div>
      </div>
  </b-container>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#page-container {
  position: relative;
  min-height: 100vh;
}
#content-wrap {
  padding-bottom: 2.5rem;    /* Footer height */
}
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;            /* Footer height */
}
</style>
