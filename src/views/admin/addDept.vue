<template>
<div>
    <Nav/>

    	 <!-- Modal Trigger -->
  <a class="waves-effect waves-light blue darken-2 btn modal-trigger sht" href="#modal2">Add department </a>

  

  <!-- Modal Structure -->
  <div id="modal2" class="modal">
    <div class="modal-content">
      <h4>Add new school</h4>
        <form >
                 <div class="row col s12">
				<div class="input-field col s10">
               <i class="material-icons">store</i>
				<input id="email" type="text" placeholder="Enter your department" class="validate" v-model="form.dept" required>
			 
			   </div>

                <div class="input-field col s12">
				<i class="material-icons">people</i>
						<select class="browser-default" v-model="form.Id" required>
							<option value="" disabled selected> Choose School  </option>
							<option v-for="sch in schools" :key="sch.Id" v-bind:value="sch.Id" >{{sch.school}} </option>
						</select>
							
						
					</div>
                 </div>

                  <div class='row '>
				   <div class="input-field col s6">
				  <button class="btn waves-effect blue waves-light" v-bind:disabled="disablebtn" @click="submit"> Add <i class="material-icons right">send</i> </button>
				   </div>
                       
				 
           
                  </div>

             </form>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close blue darken-2 waves-effect waves-green btn-flat">Done</a>
    </div>
  </div>
            


    
         <table class="container">
        <thead>
          <tr>
              <th>Departments</th>
			  <th> School </th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>

        <tbody v-for="de in dept" :key="de.Id" >
          <tr>
            <td> {{de.dept}} </td>
			<td> {{de.school}}  </td>
            <td>  <a class="waves-effect waves-light btn green modal-trigger" href="#modal1" @click="startEdit(de)"> <i class="material-icons"> edit </i> </a> </td>
            <td> <button class="btn waves-effect red waves-light" @click="deleteDept(de.Id)"><i class="material-icons"> delete </i> </button></td>
          </tr>
          
        </tbody>
      </table>

	  <!-- ******************************************************************* -->

	      <div id="modal1" class="modal">
              <div class="modal-content">
              <h4>Edit department </h4>

      <div class="row">
        <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <input  id="company" type="text" v-model="edit.dept"  class="validate"  >
                </div>
                  <div class="input-field col s12">
						<select class="browser-default" v-model="edit.schId" required>
							<option value="" disabled selected> Choose School  </option>
							<option v-for="sch in schools" :key="sch.Id" v-bind:value="sch.Id" >{{sch.school}} </option>
						</select>
                        	</div>
						 </div>

               <input hidden disabled v-model="edit.Id" />
			   <div class="row">
				   <div class="input-field ">
					       <button class=" waves-effect blue waves-green btn-flat" @click="update"> <i class=" material-icons ">send</i> </button>
					   
				   </div>
			   </div>
		</form>
	</div>

	       <div class="modal-footer">
             <button class="modal-close waves-effect blue waves-green btn-flat" > <i class=" material-icons ">close</i> </button>
          </div>
	  </div>
	</div>



    

</div>
    
</template>

<script>
import axios from 'axios';
axios.defaults.crossDomain = true;
import M from 'materialize-css';
import Nav from '../../components/adminComponent/navbar.vue'
export default {
    name:'addDept',
    components:{
        Nav
    },
    data(){
      return{
          schools:[],
          dept:[],
          form:{
              Id:"",
              dept:""
          },
		  edited:null,
		  edit:{
			  Id:"",
			  dept:"",
			  schId:""
		  }
      }
    },
    mounted(){
        M.AutoInit()
        this.fetchDept()
        this.fetchSch()
    },
    computed:{
	  	disablebtn:function(){
			if(this.form.dept.length >=5){
				return false
			}else{
				return true
			}
		}
  },
    methods:{
        submit(e){
          e.preventDefault()
          axios.post('http://localhost:5000/api/admin/AddDept',this.form)
          .then(res=>{
               if(res.data === 201){
                 M.toast({html:"Department added successfully"})
                 setTimeout(() => {
                   location.reload()
                 }, 1000);
               }else{
				   M.toast({html:"Department already exists"})
			   }
          })
          .catch(err=>{
              console.log(err)
          })
        },
        fetchSch(){
            axios.get('http://localhost:5000/api/admin')
            .then(res=>{
                this.schools = res.data
            })
        },
        fetchDept(){
            axios.get('http://localhost:5000/api/admin/dept')
            .then(res=>{
                this.dept = res.data
            })
        },
		deleteDept(Id){
			axios.delete(`http://localhost:5000/api/admin/dept/${Id}`)
			.then(res=>{
				if(res.data === 200){
					M.toast({html:"Deleted successfully"})
					  setTimeout(() => {
                   location.reload()
                 }, 1000);
				}
			})
		},
		startEdit(de){
          this.edited = de
		  this.edit.Id = this.edited.Id
		  this.edit.dept = this.edited.dept
		  this.edit.schId = this.edited.schId
    
		},

		update(e){
           e.preventDefault()
		   let Id = this.edit.Id
		   axios.put(`http://localhost:5000/api/admin/dept/${Id}`,this.edit)
		   .then(res=>{
			   if(res.data === 200){
				   M.toast({html:"updated successfully"})
				     setTimeout(() => {
                   location.reload()
                 }, 1000);
			   }
		   })
		}

	 
		
    }
}
</script>