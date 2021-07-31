<template>
  <div class="row">
    <div class="navbar-fixed">
      <Nav />
    </div>

    <div class="container">
      <div class="header">
        <div class="row">
          <div class="col s12">
            <div class="card blue">
              <div class="card-content white-text">
                <span class="card-title">
                  <h4>
                    Welcome to Information Technology virtual library
                    <p>Today's research is tomorrow's innovation</p>
                  </h4>
                </span>
                <p></p>
                <h6>
                  Dr. Seus said:
                  <blockquote>
                    You can find MAGIC whereever you go, whereever you look, Sit
                    Back and relax. All you need is a book
                  </blockquote>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="header">
        <div class="row">
          <div class="col s12">
            <div class="card blue">
              <div class="card-content black-text">
                <span class="card-title"> <h4>Archive</h4> </span>

                <ul class="collapsible popout">
                  <li v-for="cat in category" :key="cat.Id">
                    <div class="collapsible-header" @click="getArchive(cat.Id)">
                      <i class="material-icons"> add </i> {{ cat.category }}
                    </div>

                    <div class="collapsible-body">
                      <ul
                        class="collection"
                        v-for="arc in archive"
                        :key="arc.Id"
                      >
                        <li class="collection-item">
                          <router-link
                            :to="{
                              name: 'archiveId',
                              query: {
                                title: arc.Title,
                                post: arc.post,
                                file: arc.file,
                              },
                            }"
                          >
                            {{ arc.Title }} || {{ arc.type }}
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.crossDomain = true;
import M from "materialize-css";
import Nav from "../../components/userComponent/navbar.vue";
export default {
  name: "archive",
  components: {
    Nav,
  },
  data() {
    return {
      archive: [],
      category: [],
    };
  },

  mounted() {
    M.AutoInit();
    this.getCategory();
  },

  methods: {
    getCategory() {
      axios.get("http://localhost:5000/api/admin/category").then((res) => {
        this.category = res.data;
      });
    },

    getArchive(Id) {
      axios.get(`http://localhost:5000/api/user/archive/${Id}`).then((res) => {
        this.archive = res.data;
      });
    },
  },
};
</script>

<style scoped>
.card-content {
  text-align: center;
}
</style>
