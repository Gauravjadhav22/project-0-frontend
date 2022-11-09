<template>
  <Header />
  <router-view v-if="!isLoadig" />

  <div class="page_loader" v-else>
    <Loader />
  </div>
</template>

<script>
import Header from "./Components/Header/index.vue";
import Loader from "@/Utils/loader";
import { mapGetters } from "vuex";
import store from "./Store";

export default {
  name: "App",
  // data(){
  //   return {
  //   }
  // },

  components: {
    Header,
    Loader,
  },
  computed: {
    ...mapGetters({
      toastMsg: "notify/getToastMsg",
      isLoadig: "notify/isLoading",
    }),
  },

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
