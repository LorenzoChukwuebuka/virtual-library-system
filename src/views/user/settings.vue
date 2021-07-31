<template>
  <div>
    <div class="navbar-fixed">
      <Nav />
    </div>

    <div class="row">
      <div class="col s4 offset-s1">
        <div class="card white">
          <div class="card-content black-text">
            <span class="card-title"> Add phone number </span>

            <form>
              <div class="row col s12">
                <div class="input-field col s10">
                  <i class="material-icons">phone</i>
                  <input
                    id="ema"
                    type="number"
                    placeholder="Enter your phone number"
                    maxlength="11"
                    v-model="phone.phoneNumber"
                    class="validate"
                    required
                  />
                </div>
              </div>

              <div class="row ">
                <div class="input-field col s6">
                  <button
                    class="btn waves-effect blue waves-light"
                    @click="addPhone"
                    v-bind:disabled="disablePhone"
                  >
                    Add <i class="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col s4 offset-s1">
        <div class="card white">
          <div class="card-content black-text">
            <span class="card-title"> Department </span>

            <form>
              <div class="row col s12">
                <div class="input-field col s12">
                  <i class="material-icons">people</i>
                  <select
                    class="browser-default"
                    v-model="deptId.deptId"
                    required
                  >
                    <option value="" disabled selected> Choose School </option>
                    <option
                      v-for="sch in dept"
                      :key="sch.Id"
                      v-bind:value="sch.Id"
                      >{{ sch.dept }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row ">
                <div class="input-field col s6">
                  <button
                    class="btn waves-effect blue waves-light"
                    @click="updateDept"
                  >
                    Add <i class="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col s4 offset-s1">
        <div class="card white">
          <div class="card-content black-text">
            <span class="card-title"> Change Password </span>

            <form>
              <div class="row col s12">
                <div class="input-field col s10">
                  <i class="material-icons">lock</i>
                  <input
                    type="password"
                    placeholder="Enter password"
                    v-model="pass.password"
                    class="validate"
                    required
                  />
                </div>

                <div class="input-field col s10">
                  <i class="material-icons">lock</i>
                  <input
                    id="email"
                    type="password"
                    placeholder="confirm password"
                    v-model="pass.confirmpass"
                    class="validate"
                    required
                  />
                </div>
              </div>

              <div class="row ">
                <div class="input-field col s6">
                  <button
                    class="btn waves-effect blue waves-light"
                    v-bind:disabled="disablePass"
                    @click="updatePass"
                  >
                    Change <i class="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
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
  name: "setting",
  components: {
    Nav,
  },

  data() {
    return {
      pass: {
        password: "",
        confirmpass: "",
      },
      phone: {
        phoneNumber: "",
      },
      Id: localStorage.getItem("Id"),
      dept: [],
      deptId: {
        deptId: "",
      },
    };
  },

  mounted() {
    M.AutoInit();
    this.getDept();
  },
  computed: {
    disablePhone() {
      if (
        this.phone.phoneNumber.length >= 11 &&
        this.phone.phoneNumber.length <= 11
      ) {
        return false;
      } else {
        return true;
      }
    },
    disablePass() {
      if (
        this.pass.password.length >= 5 &&
        this.pass.confirmpass.length >= 5 &&
        this.pass.password === this.pass.confirmpass
      ) {
        return false;
      } else {
        return true;
      }
    },
  },

  methods: {
    addPhone(e) {
      e.preventDefault();
      let Id = this.Id;
      axios
        .put(`http://localhost:5000/api/user/phone/${Id}`, this.phone)
        .then((res) => {
          if (res.data === 200) {
            M.toast({ html: "Successfully added Phone Number" });
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        });
    },

    updatePass(e) {
      e.preventDefault();
      let Id = this.Id;
      axios
        .put(`http://localhost:5000/api/user/pass/${Id}`, this.pass)
        .then((res) => {
          if (res.data === 200) {
            M.toast({ html: "Updated password successfully" });
          }
        });
    },
    getDept() {
      axios.get("http://localhost:5000/api/admin/dept").then((res) => {
        this.dept = res.data;
      });
    },
    updateDept(e) {
      e.preventDefault();
      let Id = this.Id;

      axios
        .put(`http://localhost:5000/api/user/dept/${Id}`, this.deptId)
        .then((res) => {
          if (res.data === 200) {
            M.toast({ html: "Successfully added Department " });
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        });
    },
  },
};
</script>

<style></style>
