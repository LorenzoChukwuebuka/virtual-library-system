<template>
  <div>
    <nav class="row">
      <div class="nav-wrapper ">
        <a class="brand-logo" @click="home"> IFT Virtual library </a>
        <ul class="right hide-on-med-and-down">
          <li class="active"><a @click="home"> Home </a></li>

          <li>
            <router-link
              :to="{
                name: 'archive',
              }"
            >
              Archive
            </router-link>
          </li>

          <li>
            <router-link
              :to="{
                name: 'setting',
              }"
            >
              Setting
            </router-link>
          </li>
          <div class="input-field col s5">
            <li>
              <i class="small material-icons prefix">search</i>
              <input type="text" v-model="search" @change="onChange" />
            </li>
          </div>
          <li>
            <a @click="logOut"> <i class="material-icons"> exit_to_app </i></a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.crossDomain = true;
import M from "materialize-css";
export default {
  name: "Nav",
  props: ["category"],

  data() {
    return {
      search: "",
    };
  },
  mounted() {
    M.AutoInit();
  },
  methods: {
    home() {
      this.$router.push("/Userhome");
    },
    logOut() {
      this.$router.push("/");
      localStorage.removeItem("Id");
    },
    onChange() {
      const search = this.category.find((cat) => cat.category === this.search);
      this.$emit("search", search);
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #00365f;
}
.nav-wrapper {
  padding-left: 2vw;
}
</style>
