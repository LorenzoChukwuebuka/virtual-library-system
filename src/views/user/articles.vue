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
                <div class="card blue darken-3">
                  <div class="card-content white-text">
                    <!-- Figure tis out too -->
                      <h4 style="text-align:center;"> {{title}} </h4>
				               <p>   {{post}}   </p> 
 
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
    name:'articles',
    components:{
        Nav,
    },
    data(){
      return{
        title:"",
        post:""
      }
    },

    created(){
       if(this.$route.params.post === undefined){
		  this.$router.push('/Userhome')
	  }
       this.title = this.$route.params.title
       this.post = this.$route.params.post

	   console.log(this.$route.params.title)
	   console.log(this.$route.params.post)
    }
}
</script>

<style scoped>
#home {
  background-image: url("~@/assets/img/libray.jpg");
  background-position: center;
  background-size: cover;
  height: 70vh;
}
#home .container .header {
  top: 16vh;
  position: relative;
}
</style>