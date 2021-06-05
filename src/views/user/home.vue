<template>
  <div id="home">
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

      <div class="body">
        <div class="content">
          <div class="header">
            <div class="row">
              <div class="col s12">
                <div class="card blue">
                  <div class="card-content black-text">
                    <span class="card-title"> <h4>Books and Files </h4> </span>
                    <span class="card-title"> <h4>Categories</h4> </span>
					 
					   <ul class="collapsible popout">
                      <li v-for="cat in category" :key="cat.Id">
                        <div
                          class="collapsible-header"
                          @click="showFiles(cat.Id)"
                        >
                          <i class="material-icons"> add </i> {{ cat.category }}
                        </div>
                        <div class="collapsible-body black">
                          <ul v-for="title in files" :key="title.Id">
                            <li>
                              <router-link
                                :to="{
                                  name: 'SchoolFile',
                                  params: {
                                    bookname: title.fileName,
                                  },
                                }"
                              >
                                {{ title.Title }} {{ title.Id }}
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

                 
				 <!-- Journals -->

		<div class="header">
            <div class="row">
              <div class="col s12">
                <div class="card blue">
                  <div class="card-content black-text">
                    <span class="card-title"> <h4>Journals and Articles </h4> </span>

                    <ul class="collapsible popout">
                      <li v-for="cat in category" :key="cat.Id">
                        <div 
                          class="collapsible-header"
                          @click="showArticles(cat.Id)"
                        >
                          <i class="material-icons"> add </i> {{ cat.category }}
                        </div>
                        <div class="collapsible-body">
                          <ul class="collection" v-for="art in articles" :key="art.Id" >
                            <li class="collection-item">
								  <router-link
                                :to="{
                                  name: 'articles',
                                  params: {
                                    post: art.post,
                                    title: art.Title
							
                                  },
                                }"
                              >
                                {{ art.Title }} || {{art.type}}
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
      </div>
    </div>
  
</template>
<script>
import axios from "axios";
axios.defaults.crossDomain = true;
import M from "materialize-css";
import Nav from "../../components/userComponent/navbar.vue";
export default {
  name: "Userhome",
  components: {
    Nav,
  },
  data() {
    return {
      category: [],
      files: [],

	  articles:[]
    };
  },
  mounted() {
    M.AutoInit();
    this.getCat();
  },
  methods: {
    getCat() {
      axios.get("http://localhost:5000/api/admin/category").then((res) => {
        this.category = res.data;
      });
    },
    showFiles(Id) {
      axios.get(`http://localhost:5000/api/user/files/${Id}`).then((res) => {
        this.files = res.data;
      });
    },
	showArticles(Id){
       axios.get(`http://localhost:5000/api/user/articles/${Id}`)
	   .then(res=>{
		   this.articles = res.data
	   })
	},
    getFileDet(id) {},

  },
};
</script>

<style scoped>
.card-content {
  text-align: center;
}

#home {
  background-image: url("~@/assets/img/libray.jpg");
  background-position: center;
  background-size: cover;
  height: 100vh;
}
#home .container .header {
  top: 16vh;
  position: relative;
}
</style>