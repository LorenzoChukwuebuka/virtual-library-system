<template>
  <div>
    <Nav />

    <div class="row">
      <div class="col s12">
        <ul class="tabs">
          <li class="tab col s3">
            <a class="active" href="#upload">upload files</a>
          </li>
          <li class="tab col s3">
            <a href="#article">Articles and Journals </a>
          </li>
          <li class="tab col s3"><a href="#archive"> Archive </a></li>
        </ul>
      </div>

      <div id="upload" class="col s12">
        <br />

        <!-- Modal Trigger -->

        <a
          class="waves-effect waves-light blue darken-2 btn modal-trigger sht"
          href="#modal2"
        >
          Upload <i class="material-icons"> add </i>
        </a>

		<!--- end of modal trigger --->

        <table class="container responsive-table highlight">
          <thead>
            <tr>
              <th>Title</th>
              <th>filename</th>
              <th>file type</th>
              <th>category</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody v-for="file in files" :key="file.Id">
            <tr>
              <td>{{ file.Title }}</td>
              <td>{{ file.fileName }}</td>
              <td>{{ file.fileType }}</td>
              <td>{{ file.category }}</td>
              <td>
                <button
                  class="btn waves-effect red waves-light"
                  @click="delFile(file.Id)"
                >
                  <i class="material-icons"> delete </i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="article" class="col s12">
        <br />

        <!-- modal trigger -->

        <a
          class="waves-effect waves-light blue darken-2 btn modal-trigger sht"
          href="#modal3"
        >
          articles &amp; Journals
        </a>

        <table class="container responsive-table highlight">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>post</th>
              <th>category</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody v-for="art in articles" :key="art.Aid">
            <tr>
              <td>{{ art.Title }}</td>
              <td>{{ art.type }}</td>
              <td>{{ art.post }}</td>
              <td>{{ art.category }}</td>
              <td>
                <button
                  class="btn waves-effect red waves-light"
                  @click="delArticle(art.Aid)"
                >
                  <i class="material-icons"> delete </i>
                </button>
              </td>
              <td>
                <a
                  class="btn waves-effect green waves-light modal-trigger"
                  href="#modal4"
                  @click.prevent="beginEdit(art)"
                  ><i class="material-icons"> edit </i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="archive" class="col s12">
        <br />

        <!-- modal trigger -->
        <a
          class="waves-effect waves-light blue darken-2 btn modal-trigger sht"
          href="#modal5"
        >
          Archive
        </a>

        <table class="container responsive-table highlight">
          <thead>
            <tr>
              <th>Title</th>
              <th>post</th>
              <th>file</th>
              <th>Type</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody v-for="arc in archive" :key="arc.Id">
            <tr>
              <td>{{ arc.Title }}</td>
              <td>{{ arc.post }}</td>
              <td>{{ arc.file }}</td>
              <td>{{ arc.type }}</td>
              <td>
                <button
                  class="btn waves-effect red waves-light"
                  @click="delArchive(arc.Id)"
                >
                  <i class="material-icons"> delete </i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ************************************************************************************************************************* -->

    <!-- Modal Structure -->
    <div id="modal2" class="modal">
      <div class="modal-content">
        <h4>Add new file</h4>
        <form enctype="multipart/form-data">
          <div class="row col s12">
            <div class="input-field col s10">
              <i class="material-icons">store</i>
              <input
                id="email"
                type="text"
                placeholder="title"
                v-model="form.title"
                class="validate"
                required
              />
            </div>

            <div class="input-field col s12">
              <i class="material-icons">people</i>
              <select class="browser-default" v-model="form.catId" required>
                <option value="" disabled selected> Choose category </option>
                <option
                  v-for="cat in category"
                  :key="cat.Id"
                  v-bind:value="cat.Id"
                  >{{ cat.category }}
                </option>
              </select>
            </div>

            <div class="file-field input-field col s10">
              <div class="btn blue darken-2">
                <span>Pick File</span>
                <input
                  type="file"
                  ref="file"
                  v-on:change="handleFileUpload()"
                  name="fileToUpload"
                />
                <br />
                <progress max="100" :value.prop="uploadPercentage"></progress>
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" />
              </div>
            </div>
          </div>

          <div class="row ">
            <div class="input-field col s6">
              <button class="btn waves-effect blue waves-light" @click="upload">
                Add <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat"
          >Done</a
        >
      </div>
    </div>

    <!-- Modal structure for the second modal -->

    <div id="modal3" class="modal">
      <div class="modal-content">
        <h4>Add new Journals/article</h4>
        <form enctype="multipart/form-data">
          <div class="row col s12">
            <div class="input-field col s10">
              <i class="material-icons">store</i>
              <input
                id="email"
                type="text"
                placeholder="title"
                v-model="article.title"
                class="validate"
                required
              />
            </div>

            <div class="input-field col s12">
              <i class="material-icons">people</i>
              <select class="browser-default" v-model="article.catId" required>
                <option value="" disabled selected> Choose category </option>
                <option
                  v-for="cat in category"
                  :key="cat.Id"
                  v-bind:value="cat.Id"
                  >{{ cat.category }}
                </option>
              </select>
            </div>

            <div class="input-field col s12">
              <select class="browser-default" v-model="article.type" required>
                <option value="" disabled selected> Choose type </option>
                <option value="Journal"> Journal </option>
                <option value="article"> article </option>
              </select>
            </div>

            <div class="input-field col s12">
              <textarea
                class="materialize-textarea"
                placeholder="write article"
                v-model="article.article"
                data-length="10000"
                required
              ></textarea>
            </div>
          </div>

          <div class="row ">
            <div class="input-field col s6">
              <button
                class="btn waves-effect blue waves-light"
                @click="submitArticle"
              >
                Add <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat"
          >Done</a
        >
      </div>
    </div>

    <!-- Edit Modal for articles and journals -->

    <div id="modal4" class="modal">
      <div class="modal-content">
        <h4>Edit Journals/article</h4>
        <form enctype="multipart/form-data">
          <div class="row col s12">
            <div class="input-field col s10">
              <i class="material-icons">store</i>
              <input
                id="email"
                type="text"
                placeholder="title"
                v-model="edit.title"
                class="validate"
                required
              />
            </div>

            <div class="input-field col s12">
              <i class="material-icons">people</i>
              <select class="browser-default" v-model="edit.catId" required>
                <option value="" disabled selected> Choose category </option>
                <option
                  v-for="cat in category"
                  :key="cat.Id"
                  v-bind:value="cat.Id"
                  >{{ cat.category }}
                </option>
              </select>
            </div>

            <div class="input-field col s12">
              <select class="browser-default" v-model="edit.type" required>
                <option value="" disabled selected> Choose type </option>
                <option value="Journal"> Journal </option>
                <option value="article"> article </option>
              </select>
            </div>

            <div class="input-field col s12">
              <textarea
                class="materialize-textarea"
                placeholder="write article"
                v-model="edit.article"
                data-length="10000"
                required
              ></textarea>
            </div>
          </div>

          <div class="row ">
            <div class="input-field col s6">
              <button
                class="btn waves-effect blue waves-light"
                @click="editArticle"
              >
                submit <i class="material-icons right">send</i>
              </button>
            </div>
          </div>

          <input v-model="edit.Aid" hidden disabled />
        </form>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat"
          >Done</a
        >
      </div>
    </div>

    <!-- Modal structure for archive -->

    <div id="modal5" class="modal">
      <div class="modal-content">
        <h4>Add new file</h4>
        <form enctype="multipart/form-data">
          <div class="row col s12">
            <div class="input-field col s10">
              <i class="material-icons">store</i>
              <input
                id="email"
                type="text"
                placeholder="title"
                v-model="archive.title"
                class="validate"
                required
              />
            </div>

            <div class="input-field col s12">
              <i class="material-icons">people</i>
              <select
                class="browser-default"
                v-model="archive.category"
                required
              >
                <option value="" disabled selected> Choose category </option>
                <option
                  v-for="cats in category"
                  :key="cats.Id"
                  v-bind:value="cats.Id"
                  >{{ cats.category }}
                </option>
              </select>
            </div>

            <div class="input-field col s12">
              <select class="browser-default" v-model="archive.type" required>
                <option value="" disabled selected> Choose type </option>
                <option value="Journal"> Journal </option>
                <option value="article"> article </option>
                <option value="mp4"> mp4 </option>
                <option value="pdf"> PDF </option>
              </select>
            </div>

            <div class="input-field col s12">
              <textarea
                class="materialize-textarea"
                v-model="archive.post"
                placeholder="write article"
                data-length="10000"
                required
              ></textarea>
            </div>

            <div class="file-field input-field col s10">
              <div class="btn blue darken-2">
                <span>Pick File</span>
                <input
                  type="file"
                  ref="file"
                  v-on:change="handleUpload()"
                  name="fileToUpload"
                />
                <br />
                <progress max="100" :value.prop="uploadPercent"></progress>
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" />
              </div>
            </div>
          </div>

          <div class="row ">
            <div class="input-field col s6">
              <button
                class="btn waves-effect blue waves-light"
                @click="postArchive"
              >
                Add <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat"
          >Done</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.crossDomain = true;
import M from "materialize-css";
import { ref } from "vue";
import Nav from "../../components/adminComponent/navbar.vue";
export default {
  name: "uploads",
  components: {
    Nav,
  },
  data() {
    return {
      category: [],
      form: {
        title: "",
        catId: "",
      },
      file: "",
      uploadPercentage: 0,
      fileType: null,
      files: [],
      article: {
        Id: "",
        title: "",
        catId: "",
        article: "",
        type: "",
      },
      articles: [],
      edit: {
        title: "",
        article: "",
        catId: "",
        type: "",
        Aid: "",
      },
      editArt: null,
      archive: [],
      uploadPercent: 0,
      files: "",
      archive: {
        title: "",
        category: "",
        type: "",
        post: "",
      },
    };
  },
  mounted() {
    M.AutoInit();
    this.fetchCat();
    this.getFiles();
    this.getArticles();
    this.getArchive();
  },
  computed: {
    disablebtn: function() {
      if (this.form.title.length >= 4) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    fetchCat() {
      axios
        .get("http://localhost:5000/api/admin/category")
        .then((res) => {
          this.category = res.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    upload(e) {
      e.preventDefault();
      let data = new FormData();
      data.append("title", this.form.title);
      data.append("category", this.form.catId);
      data.append("file", this.file);

      
		console.log(this.file)
        console.log(this.form)
 
/*  axios
        .post("http://localhost:5000/api/admin/upload", data, {
          onUploadProgress: function(progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this),
        })
        .then((res) => {
          if (res.data === 201) {
            M.toast({ html: "File uploaded successfully", classes: "success" });
            setTimeout(() => {
              location.reload();
            }, 1000);
          } else {
            M.toast({
              html: "File upload failed only mp4 and PDFs allowed",
              classes: "error",
            });
          }
        });  */

    },
    getFiles() {
      axios.get("http://localhost:5000/api/admin/upload").then((res) => {
        this.files = res.data;
      });
    },
    delFile(Id) {
      axios
        .delete(`http://localhost:5000/api/admin/upload/${Id}`)
        .then((res) => {
          M.toast({ html: "File deleted successfully" });
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
    },
    submitArticle(e) {
      e.preventDefault();
      console.table(this.article);
      axios
        .post("http://localhost:5000/api/admin/articles", this.article)
        .then((res) => {
          M.toast({ html: "Added article/Journal successfully" });
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
    },
    getArticles() {
      axios.get("http://localhost:5000/api/admin/articles").then((res) => {
        this.articles = res.data;
      });
    },
    delArticle(Aid) {
      axios
        .delete(`http://localhost:5000/api/admin/articles/${Aid}`)
        .then((res) => {
          M.toast({ html: "File deleted successfully" });
          setTimeout(() => {
            location.reload();
          }, 1000);
        });
    },
    beginEdit(art) {
      this.editArt = art;
      this.edit.Aid = this.editArt.Aid;
      this.edit.title = this.editArt.Title;
      this.edit.article = this.editArt.post;
      this.edit.catId = this.editArt.cat_Id;
      this.edit.type = this.editArt.type;
    },
    editArticle(e) {
      e.preventDefault();
      let Id = this.edit.Aid;
      axios
        .put(`http://localhost:5000/api/admin/articles/${Id}`, this.edit)
        .then((res) => {
          if (res.data === 200) {
            M.toast({ html: "Updated successfully" });
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getArchive() {
      axios.get("http://localhost:5000/api/admin/archive").then((res) => {
        this.archive = res.data;
      });
    },
    handleUpload() {
      this.files = this.$refs.file.files[0];
    },
    postArchive(e) {
      e.preventDefault();
      let data = new FormData();
      data.append("title", this.archive.title);
      data.append("category", this.archive.category);
      data.append("type", this.archive.type);
      data.append("post", this.archive.post);
      data.append("file", this.files);
      axios
        .post(`http://localhost:5000/api/admin/archive`, data, {
          onUploadProgress: function(progressEvent) {
            this.uploadPercent = parseInt(
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          }.bind(this),
        })
        .then((res) => {
          if (res.data === 200) {
            M.toast({ html: "Added successfully" });
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        });
    },
    delArchive(Id) {
      axios
        .delete(`http://localhost:5000/api/admin/archive/${Id}`)
        .then((res) => {
          if (res.data == 200) {
            M.toast({ html: "Deleted successfully" });
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        });
    },
  },
};
</script>

<style scoped></style>
