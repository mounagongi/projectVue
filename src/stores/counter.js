import { defineStore,acceptHMRUpdate  } from 'pinia'

export const useStore = defineStore({
  id:'store',
  state: () => ({
    entry: null,
   }),
 })
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}