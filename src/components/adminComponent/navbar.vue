<template>
<div>
  <nav>
		   <div class="nav-wrapper  black ">
			   <a class="brand-logo"> Admin Dashboard </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a >Admin</a></li>
            <li><a @click="logOut"> <i class="material-icons"> exit_to_app </i> </a></li>
            
         </ul>
			   </div>
		 </nav>

	 
	<ul id="slide-out" class="sidenav grey">
			<li>
					<div class="user-view">
				<div class="background">
					<img src="">
				</div>
                   <a><span class="white-text name"></span></a>
				    <a><span class="white-text name">{{username}}</span></a>
					</div>
			
			</li>
			    <li><div class="divider"></div></li>
				<li><a @click="addschool" ><i class="material-icons">add</i> Add School </a></li>
				<li><a @click="adddept"><i class="material-icons" >add</i> Add Department </a></li>
					<li><a @click="addCat"><i class="material-icons" >add</i> Add category </a></li>
				<li><a @click="upload"><i class="material-icons" >add</i> upload files </a></li>
                
				<li><a ><i class="material-icons">visibility</i> view all </a></li>
				 
				 
	</ul>
     	<a href="" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
				

</div>
</template>

<script>

export default {
name:"Nav",
data(){
  return{
      username:"",
     
  }
},
mounted(){
  this.getusername()
},
methods:{
    logOut(){
        this.$router.push('/')
        localStorage.removeItem('Id')
        localStorage.removeItem('username')
    },
	addschool(){
     this.$router.push('/adminDash')
	},
	adddept(){
       this.$router.push('/addDept')
	},
    getusername(){
       let local = localStorage.getItem('username')
       this.username = local

    },
	upload(){
		this.$router.push('/uploads')
	},
	addCat(){
		this.$router.push('/category')
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