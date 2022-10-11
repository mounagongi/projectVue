<template>
    <div class="me-0">
      <div class="d-flex justify-content-between">
     <div class="d-flex align-items-center">
      <input 
      type="search" 
      class=" form-control me-2"
      style="width: min-content;"
       placeholder="Search by title..." v-model="searchQuery" />
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" color="gray" />
       </div>
      <button v-on:click="filterFnt"  style="margin-left:10px" class="btn btn-primary btn-sm">
        Filter By Category
        <font-awesome-icon icon="fa-solid fa-angle-up" v-if=" filterCateg"/>
        <font-awesome-icon icon="fa-solid fa-angle-down" v-if="!filterCateg"/>
      </button>
 </div>
      <div class="row"  style="margin-top:10px;" v-if="filterCateg">
       
    <div class="col" style="min-width: fit-content;" :key="index" v-for="(category, index) in categories">
       
          <div class="d-flex align-items-start">
            <input 
            class="mt-1"
              type="checkbox"  
              v-bind:id="category"
              v-bind:value="category"
              v-model="checkedCategories"  
              style="margin-left:10px" />
          <p  class="mb-0" style="font-size:small;width: fit-content; min-width: fit-content;"> {{category}}</p>
          </div>
        
    </div>
 


      </div>
     

      <div  v-if="filteredEntries?.length >0" class="p-0 mx-0">
        
        <!-- <b-table 
        hover 
        class="table-bordered rounded-2 mt-2"
        id="my-table"
        :items="filteredEntries"
        :per-page="perPage"
        :current-page="currentPage"
        :fields="fields"
      ></b-table> -->
       
      <div class="table-responsive rounded-2 mt-3">
      <table 
          class="table align-middle  table-hover mt-0" 
          v-if="filteredEntries?.length >0" 
          >
<thead>
    <tr  style="background-color: #e6e8f2;" >
      <th scope="col" class="py-0 fw-bolder">#</th>
      <th scope="col" class="py-0 fw-bolder" >Title</th>
      <th scope="col" class="py-0 fw-bolder">Category</th>
      <th scope="col" class="py-0 fw-bolder" style="min-width: 100px;">Link</th>
      <th scope="col" class="py-0 fw-bolder" >HTTPS</th>
    </tr>
  </thead>
  <tbody>
 
   <tr :key="index" v-for="(entry, index) in filteredEntries" >
      <td scope="row">{{index+1}}</td>
      <td><div class="d-flex align-items-sm-center" href="#" @click="getDetails(entry)">
        <div class="symbol symbol-50px">
                        <div class="symbol-label bg-light rounded-2 px-3 py-0 me-2">
                          <span class="text-dark" style="word-break: break-word; font-weight: 500; font-size: 1.5rem">
                            {{entry['API'][0].toUpperCase()}}
                          </span>
                        </div>
                      </div>
                      <button type="button" class="btn btn-link" >{{entry['API']}}</button>
      </div></td>
      <td>{{entry['Category']}}</td>
      <td>{{entry['Link']}}</td>
      <td>{{entry['HTTPS']}}</td>
  
</tr>
</tbody>
      </table>
      </div>
      <b-pagination
        
        class="mt-4"
      v-model="currentPage"
      pills :total-rows="rows" align="center"
      :per-page="perPage"
      aria-controls="my-table"
      
    ></b-pagination>
    </div>
      <div  v-if="filteredEntries?.length == 0" class ="bg-danger text-white rounded-2 mt-4 px-3">
      no entry found !!
      </div>
      <br/>
      <div v-if="filteredEntries == null " class="d-flex justify-content-center">
      <div  class="spinner-border text-primary mt-5" style="width: 2rem; height: 2rem;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
      <!-- <div  v-if="filteredEntries == null " style="margin-top:10px" >
        <font-awesome-icon icon="fa-solid fa-rotate" size="lg"/>
      </div> -->
    
    </div>
  </template>
  <style>
  @media (min-width: 100%) {

   .wrapper {
    /* display: flex;
    place-items: flex-start; */
    flex-wrap: wrap;
  }
 
  }
  
  </style>
  <script>
    import axios from 'axios'
    import {useStore} from '../stores/counter'
    const store =useStore();

    export default {
    
      data(){
        return  {
            entries: null,
            searchQuery: "",
            filterCateg: false,
            categories: null,
            checkedCategories:[],
            perPage: 10,
            currentPage: 1,
            fields: ['API','Category','Link', 'HTTPS', 'Cors'],
           
        }
      },
      computed : {
        filteredEntries(){
          return this.entries?.filter(entry => 
          this.checkedCategories.length != 0 ? 
          new RegExp(this.checkedCategories.join('|')).test(entry['Category'])
           : entry['API'].toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        rows() {
        return this.filteredEntries?.length
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
      
        },
        getDetails: function(entry1){
          
          store.$patch({entry : entry1})
          //store.entry=entry1;
          console.log('store.entry: '+store.entry);
          console.log('entry: '+entry1);
          this.$router.push({name: 'entry', params: { title: store.entry['API'] }});
        },
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
  