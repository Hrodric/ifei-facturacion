<template>
  <b-container>
      <div id="page-container">
        <div id="content-wrap">
          <div id="app" style="text-align:left;padding:25px">
            <header/>
            <b-row>
              <b-col style="padding-bottom: 30px">
                <a href="/"><img src="../static/logo.png" width="70px" /></a>
              </b-col>
              <b-col style="padding-top: 20px;text-align: right;">Inscripciones IFEI</b-col>
            </b-row>


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
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

export default {
  name: "App",
  components:{
    Header,
    Footer
  },
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
.form-control {
  margin-bottom: 10px;  /* espacio debajo de cada input form */
}
.list-group {
margin-bottom: 10px;
}
</style>
