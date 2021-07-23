<template>

 <div>
      <NavBar/>

      
	 
	 <div class="row">
		<div class="col s6 offset-s3">
			<div class="card lilac z-depth-5">
					<div class="card-content black-text">
					<span class="card-title">Sign Up</span>
						<form>
				<div class="row">
					<div class="input-field col s6">
					<i class="material-icons">perm_identity</i>
					<input  id="name" type="text" placeholder="Name" v-model="form.name" required>
					 
					</div>
					<div class="input-field col s6">
					  <i class="material-icons">email</i>
					<input id="email" placeholder="Enter your registration Number here" type="number" v-model="form.regNum" required >
					 
					</div>
				</div>

			 
				
				<div class="row">
					<div class="input-field col s6">
						 <i class="material-icons">lock</i>
					<input id="password" type="password" placeholder="please enter your password" v-model="form.password" required>
				 
					</div>
				
					<div class="input-field col s6">
						<i class="material-icons">lock</i>
					<input id="confirmPassword" type="password" placeholder="confirm your password" v-model="form.confirmPassword" required>
					 
					</div>
				</div>
 

					<div class="row">
						<div class="input-field col s6">
					<button class="btn waves-effect waves-light" @click="createUser" v-bind:disabled="disablebtn">Submit <i class="material-icons right">send</i> </button>
						</div>

						<div class="input-field col s6">
							
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
 import axios from 'axios';
  axios.defaults.crossDomain = true;
  import M from 'materialize-css';
import NavBar from '../components/navbar.vue'
export default {
  name:'register',
  components:{
      NavBar
  },
  data(){
	  return{
		  form:{
			  name:"",
			  regNum:"",
			  password:"",
			  confirmPassword:""
		  }
	  }

  },

  mounted(){
    M.AutoInit()
  },
 
    computed:{
	  	disablebtn:function(){
			if(this.form.name.length >= 5 && this.form.password.length >= 4 && this.form.regNum >= 10  ){
				return false
			}else{
				return true
			}
		}
  },

  methods:{
	  createUser(e){
		  e.preventDefault()
            if(this.form.password !== this.form.confirmPassword){
				M.toast({html:"Passwords do not match"})
			}else{

				 
				 axios.post('http://localhost:5000/api/login/register',this.form)
				 .then(res=>{
					 if(res.data == 200){
						 M.toast({html:'User created successfully'})
						 this.$router.push('Userhome')
					 }else if(res.data == 401){
						 M.toast({html:"User already exists"})
						 
					 }
				 })
				 .catch(err=>{
					 console.log(err)
				 })
			}
	  }
  }
 
}
</script>

<style scoped>
.card{
	box-shadow:20px;
	
}
</style>