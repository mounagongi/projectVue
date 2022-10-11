<template>
  <ul class="list-group list-group-flush">
  <li class="list-group-item list-group-item-action list-group-item-light 
  d-flex justify-content-between align-items-center" :key="index" v-for="(category, index) in categories">
    {{category }} <span class="text-primary bg-light px-1 rounded-2">
      {{nbrEntriesByCategory(category)? nbrEntriesByCategory(category).length : 0}}</span>
  </li>
    
    </ul>
</template>

<script>
  import axios from 'axios'
 
 export default {
   data(){
     return  {
       categories: null,
       entries: null,
     }
   },
    mounted(){
     axios
     .get('https://api.publicapis.org/categories')
     .then((response) => {
       this.categories=response.data.categories
       console.log(this.categories);
     });
     axios
        .get('https://api.publicapis.org/entries')
        .then((response) => {
          this.entries=response.data.entries;
        })
        .catch((reason)=>{
          this.entries=reason.message
        })
    },
    methods : {
        nbrEntriesByCategory: function(categ){
          return this.entries?.filter(entry => 
          entry['Category'].toLowerCase().includes(categ.toLowerCase())
          );
        },
      }
 }
</script>

<style>
@media (min-width: 1024px) {
  /* #rcorners2 {
  border-radius: 25px;
  border: 1px solid #73AD21;
  padding: 10px;
  margin-right: 2px;
  width: fit-content;
  height: 100px;
} */
}
</style>
