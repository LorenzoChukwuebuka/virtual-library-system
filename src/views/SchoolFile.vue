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
                    <iframe src="http://localhost:5000/uploads/pdfs/pdf1.pdf" frameborder="0" style="width: 100%; height: 100%; border: none;"></iframe>
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
import Nav from "../components/userComponent/navbar.vue";
export default {
  name: "School File",
  components: {
    Nav,
  },
  data() {
    return {
        file: [],
    }
  },
  created() {
      
  },
  methods: {
    // Fetch the book here
    // SAMPLE
    // let book_uri = `/api/books/${this.$route.params.bookname}`;
  },
}
</script>