<template>
  <div>
    <Nav />

    <!-- Modal Trigger -->
    <a
      class="waves-effect waves-light blue darken-2 btn modal-trigger sht"
      href="#modal2"
      >Add School
    </a>

    <!-- Modal Structure -->
    <div id="modal2" class="modal">
      <div class="modal-content">
        <h4>Add new school</h4>
        <form>
          <div class="row col s12">
            <div class="input-field col s10">
              <i class="material-icons">store</i>
              <input
                id="email"
                type="text"
                placeholder="Enter your School"
                class="validate"
                v-model="form.school"
                required
              />
            </div>
          </div>

          <div class="row ">
            <div class="input-field col s6">
              <button
                class="btn waves-effect blue waves-light"
                v-bind:disabled="disablebtn"
                @click="addschool"
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

    <table class="container">
      <thead>
        <tr>
          <th>schools</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody v-for="schools in fetchsch" :key="schools.Id">
        <tr>
          <td>{{ schools.school }}</td>
          <td>
            <a
              class="waves-effect waves-light btn green modal-trigger"
              href="#modal1"
              @click="startEdit(schools, schools.Id)"
            >
              <i class="material-icons"> edit </i>
            </a>
          </td>
          <td>
            <button
              class="btn waves-effect red waves-light"
              @click="deleteschool(schools.Id)"
            >
              <i class="material-icons"> delete </i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ************************************************************* -->

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
                  v-model="edit.school"
                  class="validate"
                />
              </div>
              <input v-model="edit.Id" hidden disabled />
            </div>
            <div class="row">
              <div class="input-field">
                <button
                  class=" waves-effect waves-green btn-flat"
                  @click="editSchool"
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
import Nav from "../../components/adminComponent/navbar";
import M from "materialize-css";
export default {
  name: "adminDash",
  components: {
    Nav,
  },
  data() {
    return {
      form: {
        school: "",
      },
      fetchsch: [],
      editedSch: "",
      edit: {
        school: "",
        Id: "",
      },
    };
  },
  mounted() {
    M.AutoInit();
    this.fetchSchools();
  },
  computed: {
    disablebtn: function() {
      if (this.form.school.length >= 10) {
        return false;
      } else {
        return true;
      }
    },
  },

  methods: {
    addschool(e) {
      e.preventDefault();
      axios.post("http://localhost:5000/api/admin", this.form).then((res) => {
        if (res.data == 401) {
          M.toast({ html: "school already exists" });
        } else if (res.data == 201) {
          M.toast({ html: "school added successfully" });
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      });
    },
    fetchSchools() {
      axios.get("http://localhost:5000/api/admin").then((res) => {
        this.fetchsch = res.data;
      });
    },
    deleteschool(Id) {
      axios.delete(`http://localhost:5000/api/admin/${Id}`).then((res) => {
        if (res.data === 200) {
          M.toast({ html: "Deleted successfully" });
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      });
    },
    startEdit(schools) {
      this.editedSch = schools;
      this.edit.school = this.editedSch.school;
      this.edit.Id = this.editedSch.Id;
    },
    editSchool(e) {
      e.preventDefault();
      let Id = this.edit.Id;
      axios
        .put(`http://localhost:5000/api/admin/${Id}`, this.edit)
        .then((res) => {
          if (res.data === 200) {
            M.toast({ html: "Updated successfully" });
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        });
    },
  },
};
</script>

<style scoped>
.sht {
  margin-left: 200px;
}
</style>
