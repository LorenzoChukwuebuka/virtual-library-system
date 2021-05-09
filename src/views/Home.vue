 <template>

   <div>

	   <NavBar/>

	 
        <div class="row">
    <div class="col s6 offset-s3">
      <div class="card grey ">
        <div class="card-content black-text">
          <span  class="card-title">Login</span>

             <form >
                 <div class="row col s12">
				<div class="input-field col s10">
          <i class="material-icons">perm_identity</i>
				<input id="email" type="text" placeholder="Enter your Username" class="validate" v-model="form.username" required>
			 
			   </div>
                 </div>

                   <div class="row col s12">
				<div class="input-field col s10 ">
					<i class="material-icons">lock</i>
				<input id="password" type="Password" class="validate" placeholder="enter your password" v-model="form.password"  required>
				 
			   </div>
                 </div>

                  <div class='row '>
				   <div class="input-field col s6">
				  <button class="btn waves-effect  waves-light" v-bind:disabled="disablebtn"   @click="login"> Login <i class="material-icons right">send</i> </button>
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
	name: 'Home',
	components:{
       NavBar
	},
	data(){
		return{
			form:{
				username:"",
				password:""
			},
			type:0
		}
	},
	created(){
		M.AutoInit()
	},
 
  computed:{
	  	disablebtn:function(){
			if(this.form.username.length >= 5 && this.form.password.length >= 4){
				return false
			}else{
				return true
			}
		}
  },

  methods:{
	  login(e){
		  e.preventDefault()
		  axios.post('http://localhost:5000/api/login',this.form)
		  .then(res=>{
			  if(res.data[0].type == 0){
				  this.$router.push('/adminDash')
				    localStorage.setItem('Id', res.data[0].Id)
					localStorage.setItem('username',res.data[0].name)

				 
					
			  }else if(res.data[0].type == 1){
				  this.$router.push('/Userhome')
			   		localStorage.setItem('Id', res.data[0].Id)
					localStorage.setItem('username',res.data[0].name)
			  }else{
				  M.toast({html:"Details does not match with our records"})
			  }


		  })
		  .catch(err=>{
			  console.log(err)
		  })

		  
	  }
  }
  
}
</script>
<style scoped>
.card{
		box-shadow:20px; 
	}
</style>