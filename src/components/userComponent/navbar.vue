<template>
<div>
    <nav>
		   <div class="nav-wrapper ">
			   <a class="brand-logo" @click="home"> IFT Virtual library  </a>
               <ul class="right hide-on-med-and-down">
                  <li class="active" > <a @click="home"> Home </a> </li>
                  
                  <li> <router-link :to ="{
                      name: 'archive'
                  }">   Archive  </router-link> </li>

                  <li> <router-link :to ="{
                      name: 'setting'
                  }">  Setting </router-link> </li>
                  <li > <a @click="logOut"> <i class="material-icons"> exit_to_app </i></a> </li>
               </ul>
			   </div>
		 </nav>
 

         
</div>   
  
</template>

<script>
import axios from 'axios';
axios.defaults.crossDomain = true;
import M from 'materialize-css';
export default {
 name:"Nav",
 data(){
     return{
   
     }
 },
 mounted(){
     M.AutoInit()
 
 },
 methods:{
     home(){
         this.$router.push('/Userhome')
     },
     logOut(){
         this.$router.push('/')
         localStorage.removeItem('Id')
     }
 }
 

      
 

}
</script>

<style scoped>
   nav {
            background-color: #00365f;
        }
        .nav-wrapper {
            padding-left: 2vw;
        }

</style>