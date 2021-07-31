<template>
  <div>
    <Nav />

    <!-- Modal Trigger -->
    <a
      class="waves-effect waves-light blue darken-2 btn modal-trigger sht"
      href="#modal2"
      >Add category
    </a>

    <!-- Modal Structure -->
    <div id="modal2" class="modal">
      <div class="modal-content">
        <h4>Add new category</h4>
        <form>
          <div class="row col s12">
            <div class="input-field col s10">
              <i class="material-icons">store</i>
              <input
                id="email"
                type="text"
                placeholder="Enter your category"
                class="validate"
                v-model="form.category"
                required
              />
            </div>
          </div>

          <div class="row ">
            <div class="input-field col s6">
              <button
                class="btn waves-effect blue waves-light"
                v-bind:disabled="disablebtn"
                @click="addCat"
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

    <!-- ******************************************************************************** -->

    <table class="container">
      <thead>
        <tr>
          <th>category</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody v-for="cat in cat" :key="cat.Id">
        <tr>
          <td>{{ cat.category }}</td>
          <td>
            <a
              class="waves-effect waves-light btn green modal-trigger"
              href="#modal1"
              @click.prevent="startEdit(cat)"
            >
              <i class="material-icons"> edit </i>
            </a>
          </td>
          <td>
            <button
              class="btn waves-effect red waves-light"
              @click="deleteCat(cat.Id)"
            >
              <i class="material-icons"> delete </i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div id="modal1" class="modal">
      <div class="modal-content">
        <h4>Edit schools</h4>

        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field">
                <input
                  id="company"
                  type="text"
                  v-model="edit.category"
                  class="validate"
                />
              </div>
              <input v-model="edit.Id" hidden disabled />
            </div>
            <div class="row">
              <div class="input-field">
                <button
                  class=" waves-effect waves-green btn-flat"
                  @click="updateCat"
                >
                  <i class=" material-icons ">save</i>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button class="modal-close waves-effect waves-green btn-flat">
            <i class=" material-icons ">close</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.crossDomain = true;
import M from "materialize-css";
import Nav from "../../components/adminComponent/navbar.vue";
export default {
  name: "category",
  components: {
    Nav,
  },
  data() {
    return {
      form: {
        category: "",
      },
      cat: [],
      editedCat: "",
      edit: {
        Id: "",
        category: "",
      },
    };
  },
  mounted() {
    M.AutoInit();
    this.fetchCat();
  },
  computed: {
    disablebtn: function() {
      if (this.form.category.length >= 4) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    addCat(e) {
      e.preventDefault();
      axios
        .post("http://localhost:5000/api/admin/category", this.form)
        .then((res) => {
          M.toast({ html: "Added successfully" });
          setTimeout(() => {
            location.reload();
          }, 2000);
        })
        .catch((err) => {
          throw err;
        });
    },
    fetchCat() {
      axios
        .get("http://localhost:5000/api/admin/category")
        .then((res) => {
          this.cat = res.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    startEdit(cat) {
      this.editedCat = cat;
      this.edit.Id = this.editedCat.Id;
      this.edit.category = this.editedCat.category;
    },
    updateCat(e) {
      e.preventDefault();
      let Id = this.edit.Id;
      axios
        .put(`http://localhost:5000/api/admin/category/${Id}`, this.edit)
        .then((res) => {
          if (res.data === 200) {
            M.toast({ html: "Updated successfully" });
            setTimeout(() => {
              location.reload();
            }, 2000);
          }
        });
    },
    deleteCat(Id) {
      axios
        .delete(`http://localhost:5000/api/admin/category/${Id}`)
        .then((res) => {
          if (res.data === 200) {
            M.toast({ html: "Deleted Successfully" });
            setTimeout(() => {
              location.reload();
            }, 2000);
          }
        });
    },
  },
};
</script>

<style></style>
