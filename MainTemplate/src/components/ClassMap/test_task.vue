<template>
    <div> 
        <compo-nent :is="ClassMapModal"></compo-nent>
        <v-btn @click="save"></v-btn>

        <template v-for="(task, i) in modal_List">
          <v-divider
            v-if="i !== 0"
            :key="`${i}-divider`"
          ></v-divider>

          <v-list-item :key="`${i}-${task.text}`">
            <v-list-item-action>
             
             <ClassMap-Modal></ClassMap-Modal>
           
            </v-list-item-action>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>
              <v-icon
                v-if="task.done"
                color="success"
              >
                mdi-check
              </v-icon>
            </v-scroll-x-transition>
          </v-list-item>
        </template>
    </div>    
</template>

<!--script-->
<script>
import ClassMapModal from './ClassMapModal.vue'

export default {

    data() {
        return {
            modal_List:[],
        }
    },
    components: {
    ClassMapModal,
},

    computed: { 

       completedTasks () {
        return this.tasks.filter(task => task.done).length
      },
      progress () {
        return this.completedTasks / this.tasks.length * 100
      },
      remainingTasks () {
        return this.tasks.length - this.completedTasks
      },

    },

    methods: {

        save()
        {
            this.modal_List.push({
                com : ClassMapModal
            })

            console.log(this.modal_List)
 
        },   
    },
}
</script>