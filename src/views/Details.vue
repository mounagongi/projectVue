<template>
  <div>
    <div class="d-flex align-items-center mb-5">
    <a @click="previousState()" class="btn btn-icon btn-light btn-sm me-4" >
                <span class="svg-icon svg-icon-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11.2657 11.4343L15.45 7.25C15.8642 6.83579 15.8642 6.16421 15.45 5.75C15.0358 5.33579 14.3642 5.33579 13.95 5.75L8.40712 11.2929C8.01659 11.6834 8.01659 12.3166 8.40712 12.7071L13.95 18.25C14.3642 18.6642 15.0358 18.6642 15.45 18.25C15.8642 17.8358 15.8642 17.1642 15.45 16.75L11.2657 12.5657C10.9533 12.2533 10.9533 11.7467 11.2657 11.4343Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </a>
    <label style="font-size:large" class="fw-bold">API Details</label>
    </div>
  <table v-if="entry"> 
    <tr>
      <td style="font-weight:bold; padding-right: 10px;">Title:</td>
      <td>{{entry['API']}}</td>
    </tr>
    <tr>
      <td style="font-weight:bold; padding-right: 10px;">Category:</td>
      <td>{{entry['Category']}}</td>
    </tr>
    <tr>
      <td style="font-weight:bold; padding-right: 10px;">Link:</td>
      <td>{{entry['Link']}}</td>
    </tr>
    <tr>
      <td style="font-weight:bold; padding-right: 10px;">Auth:</td>
      <td>{{entry['Auth']}}</td>
    </tr>
    <tr>
      <td style="font-weight:bold; padding-right: 10px;">Cors:</td>
      <td>{{entry['Cors']}}</td>
    </tr>
    <tr>
      <td style="font-weight:bold; padding-right: 10px;">Description:</td>
      <td>{{entry['Description']}}</td>
    </tr>
    <tr>
      <td style="font-weight:bold; padding-right: 10px;">HTTPS:</td>
      <td >{{entry['HTTPS']}}</td>
    </tr>
    
  </table>
</div>
</template>

<script>
    import {useStore} from '@/stores/counter'

    const store =useStore();
   export default {
    data(){
     return {
      entry: null,
     }
    },
    mounted(){
      this.entry= store.entry
    },
    methods: {
      previousState: function(){
        this.$router.go(-1)
      },
    }
   }
</script>