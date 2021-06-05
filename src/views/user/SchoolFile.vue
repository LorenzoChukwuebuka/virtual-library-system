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
                    <!-- Figure tis out too -->
					  <video v-if="file_Uri" :src="file_Uri" controls="controls" style="width:100%;height:100%; border:none;"> </video>
					  <iframe frameborder="0" v-else :src="pdf_uri" style="width:100%;height:100%; border:none;">  </iframe>
 
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
  name: "School File",
  components: {
    Nav,
  },
  data() {
    return {
    file_Uri:"",
		filename:null,
		pdf_uri:"",
	 
		
    }
  },
  created() {
      if(this.$route.params.bookname === undefined){
		  this.$router.push('/Userhome')
	  }
         this.filename = this.$route.params.bookname
		 
	      
		  if(this.filename && this.filename.match(/\.(mp4|mkv)$/))
		  {
			   this.file_Uri = `http://localhost:5000/videos/${this.filename}`
			   
		  }else if(this.filename && this.filename.match(/\.(pdf)$/)) {

			    this.pdf_uri = `http://localhost:5000/pdfs/${this.filename}`
		 
		  }
		 
  },

   
  
}
</script>