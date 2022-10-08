<template>
    <div >
      <!-- <div :key="index" v-for="(entry, index) in entries">
          {{entry}}
      </div> -->
      <input type="text" placeholder="Search by title..." v-model="searchQuery" />
      <!-- <font-awesome-icon icon="fa-solid fa-magnifying-glass" /> -->
      <button v-on:click="filterFnt"  style="margin-left:10px">
        Filter
        <font-awesome-icon icon="fa-solid fa-angle-up" v-if="! filterCateg"/>
        <font-awesome-icon icon="fa-solid fa-angle-down" v-if="filterCateg"/>
      </button>
  
      <div style="margin-top:10px" v-if="filterCateg">
        <CRow >
    <CCol  :key="index" v-for="(category, index) in categories">
       
          <input 
              type="checkbox"  
              v-on:change="filterCategories()"
              v-bind:id="category"
              v-bind:value="category"
              v-model="checkedCategories"  
              style="margin-left:10px" />
          <label  v-bind:for="category"> {{category}}</label>
        
    </CCol>
  </CRow>

      </div>
      <table 
          class="table table-bordered table-striped" 
          v-if="filteredEntries?.length >0" 
          style="margin-top:10px">
<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Category</th>
      <th scope="col">Link</th>
    </tr>
  </thead>
  <tbody>
 
   <tr :key="index" v-for="(entry, index) in filteredEntries">
      <td scope="row">{{index+1}}</td>
      <td><a href="#" class="detailsLink"> {{entry['API']}}</a></td>
      <td>{{entry['Category']}}</td>
      <td>{{entry['Link']}}</td>
  
</tr>
</tbody>
      </table>
      <div  v-if="filteredEntries?.length == 0" class ="bg-danger rounded-2 px-3">
      no entry found
      </div>
      <div  v-if="filteredEntries == null " style="margin-top:10px" >
        <font-awesome-icon icon="fa-solid fa-rotate" size="lg"/>
      </div>
    </div>
  </template>
  <style>
  @media (min-width: 100%) {
   /* .search {
    float: right;
    padding: 6px;
    border: none;
    margin-top: 8px;
    margin-right: 16px;
    margin-bottom: 50px;
    font-size: 17px;
   } */

 
  }
  
  </style>
  <script>
    import axios from 'axios'

// function filteredList() {
//   return fruits.filter((fruit) =>
//     fruit.toLowerCase().includes(input.value.toLowerCase())
//   );
// }
    export default {
    
      data(){
        return  {
            entries: null,
            searchQuery: "",
            filterCateg: false,
            categories: null,
            checkedCategories:[]
            // searchQuery = ref(""),
        }
      },
      computed : {
        filteredEntries(){
          return this.entries?.filter(entry => 
          this.checkedCategories.length != 0 ? 
          new RegExp(this.checkedCategories.join('|')).test(entry['Category'])
           : entry['API'].toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
      },   
      methods: {
        filterFnt : function (event){
          this.filterCateg= ! this.filterCateg;
          axios
          .get('https://api.publicapis.org/categories')
          .then((response) => {
            this.categories=response.data.categories
            console.log(this.categories);
          });
          // alert('Hello !')
          // if (event) {
          //   alert(event.target)
          //   console.log("event::"+event.target);
          // }
        },
        filterCategories: function(){
          console.log("filterCategories::" +this.checkedCategories);

        }
      },
      mounted(){
        axios
        .get('https://api.publicapis.org/entries')
        .then((response) => {
         // response.setHeader("Access-Control-Allow-Origin", "*");
          this.entries=response.data.entries;
          // console.log(this.entries);
        })
        .catch((reason)=>{
          this.entries=reason.message
          // console.log(this.entries);
        })
       }
    }
  
  </script>
  