<template>
 
     <nav>
		   <div class="nav-wrapper black ">
			   <a class="brand-logo" @click="home"> IFT virtual library  </a>
               <ul class="right hide-on-med-and-down">
                   <li > <a @click="redirect"> register panel </a> </li>
               </ul>
			   </div>
		 </nav>
      
  
</template>

<script>
export default {
 name:'navBar',
 methods:{
     redirect(){
         this.$router.push('/register')
     },
     home(){
         this.$router.push('/')
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