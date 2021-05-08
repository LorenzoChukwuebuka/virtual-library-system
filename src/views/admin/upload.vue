<template>
<div>
    <Nav/>

      
	 <!-- Modal Trigger -->
  <a class="waves-effect waves-light blue darken-2 btn modal-trigger sht" href="#modal2"> Upload books and Videos </a>

  

  <!-- Modal Structure -->
  <div id="modal2" class="modal">
    <div class="modal-content">
      <h4>Add new file </h4>
        <form enctype="multipart/form-data">
                 <div class="row col s12">
				<div class="input-field col s10">
               <i class="material-icons">store</i>
				<input id="email" type="text" placeholder="title" v-model="form.title" class="validate"  required>
			 
			   </div>

                   <div class="input-field col s12">
			       	<i class="material-icons">people</i>
						<select class="browser-default" v-model="form.catId" required>
							<option value="" disabled selected> Choose category  </option>
							<option v-for="cat in category" :key="cat.Id" v-bind:value="cat.Id" >{{cat.category}} </option>
						</select>
                   </div>

                    <div class="file-field input-field col s10">
                                <div class="btn blue darken-2">
                                    <span>Pick File</span>
                                    <input  type="file" ref="file"  v-on:change="handleFileUpload()" name="fileToUpload" >
									<br>
									<progress max="100" :value.prop="uploadPercentage"></progress>
							     </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                </div>
                            </div> 
							

							
                 </div>

                  <div class='row '>
				   <div class="input-field col s6">
				  <button class="btn waves-effect blue waves-light"  @click="upload"> Add <i class="material-icons right">send</i> </button>
				   </div>
                       
				 
           
                  </div>

             </form>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Done</a>
    </div>
  </div>
<!-- ******************************************************************************************************* -->

        <table class="container">
        <thead>
          <tr>
              <th>Title</th>
              <th>filename</th>
              <th>file type </th>
			  <th> category </th>
			  <th> Delete </th>
          </tr>
        </thead>

        <tbody v-for="file in files" :key="file.Id" >
          <tr>
            <td> {{file.Title}} </td>
			<td> {{file.fileName}} </td>
			<td> {{file.fileType}} </td>
			<td> {{file.category}} </td>
            <td> <button class="btn waves-effect red waves-light" @click="delFile(file.Id)"><i class="material-icons"> delete </i> </button></td>
          </tr>
          
        </tbody>
      </table>

   

</div>
  
</template>

<script>
import axios from 'axios';
axios.defaults.crossDomain = true;
import M from 'materialize-css';
import Nav from '../../components/adminComponent/navbar.vue'
export default {
name:"uploads",
components:{
    Nav
},
data(){
 return{
     category:[],
     form:{
         title:"",
         catId:""
     },
     file:"",
	 uploadPercentage:0,
	 fileType:null,
	 files:[], 

 }
},
mounted(){
    M.AutoInit()
    this.fetchCat()
	this.getFiles()
},
    computed:{
	  	disablebtn:function(){
			if(this.form.title.length >=4){
				return false
			}else{
				return true
			}
		}
  },
 methods:{
       fetchCat(){
          axios.get('http://localhost:5000/api/admin/category')
          .then(res=>{
              this.category = res.data
			  
          })
          .catch(err=>{
              throw err
          }) 
        },
      handleFileUpload(){
       this.file = this.$refs.file.files[0];
      },
      upload(e){
        e.preventDefault()
        let data = new FormData()
        data.append('title',this.form.title)
        data.append('category',this.form.catId)
        data.append('file',this.file)

        axios.post('http://localhost:5000/api/admin/upload',data,
		{
		     onUploadProgress:function(progressEvent){
				 this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) *100 ))
			 }.bind(this)
		})
        .then(res=>{
            if(res.data === 201){
				M.toast({html:"File uploaded successfully", classes:"success"})
				  setTimeout(() => {
                   location.reload()
                 }, 2000);
			}else{
				M.toast({html:"File upload failed only mp4 and PDFs allowed",classes:"error"})
				  
			}
        }) 

     
        
      },
	  getFiles(){
         axios.get('http://localhost:5000/api/admin/upload')
		 .then(res=>{
			 this.files = res.data
			  
		 })
	  },
	  delFile(Id){
		  axios.delete(`http://localhost:5000/api/admin/upload/${Id}`)
		  .then(res=>{
			 console.log(res.data)
		  })
	  }
 }
}
</script>

<style scoped>

</style>