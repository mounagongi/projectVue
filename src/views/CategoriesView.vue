<template>
  <div >
    <div :key="index" v-for="(category, index) in categories">
        <p  style="width: fit-content;">
          {{category }} 
        </p>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'
 
 export default {
   data(){
     return  {
       categories: null,
     }
   },
    mounted(){
     axios
     .get('https://api.publicapis.org/categories')
     .then((response) => {
       this.categories=response.data.categories
       console.log(this.categories);
     });
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
