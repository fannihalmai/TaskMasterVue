
<template>
 <div >

  <div v-if="tasks.length">
    
      <v-btn-toggle  v-model="isDoneToggle">
          <v-btn>
            Completed
          </v-btn>
          <v-btn> 
            To Do
          </v-btn>
    </v-btn-toggle>

    <v-btn
        fab
        dark
        absolute
        right
        bottom
        @click="createNewTask()"
      >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-data-table
      position: relative
      max-width="500"
      :headers="headers"
      :items="filteredDataTasks"
      :items-per-page="5"
      class="elevation-1"
    >
    
      <template v-slot:item="{ item }">
        <transition name="fade">
        <tr @click="selectTask(item)">
          <td>{{ item.shortDescription }}</td>
          <td>{{ formatDate(item.dueDate) }}</td>
          
          <td style="position: relative; vertical-align: middle;">
            <v-btn small @click="toggleTaskDone(item)" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
              <v-icon>mdi-check</v-icon> {{ item.isDone ? "Mark In Progress" : "Mark Done"}}
            </v-btn>
          </td>

          <td>{{ item.isDone ? "Successfully completed" : "In progress" }}</td>
        </tr>
      </transition>
        
      </template>
    </v-data-table>
  </div>
  <div v-else>
      <h2 class="no-task-text"> No tasks available, please select or create a new task list</h2>
      <img src="../assets/sadghost.png">
  </div>
    
  </div>
   
  </template>

  <script>
  import { mapState } from 'vuex'
    export default {
    name: 'MainView',
    data () {
      return {
        headers: [
          {
            text: 'Task Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Due Date', value: 'dueDate' },
          { text: 'Is done?', value: 'priority' },
          { text: 'Status', value: 'status' },
        ],
        isDoneToggle: 0,
        dataTasks: [],
        }
      },
      computed: {
        ...mapState({
          tasks: 'tasks',
        }),
        filteredDataTasks() {
          const bool = this.isDoneToggle === 0;
          return this.dataTasks.filter((task) => task.isDone == bool);
        },
      },
      watch: {
        tasks(newValue) {
          this.dataTasks = newValue;
        },
      },
        methods: {
            selectTask(task) {
                this.$store.commit('setSelectedTask', task);
            },
            createNewTask(){
              this.$emit('openNewTaskDialog');
            },
            formatDate(date){
              return new Date(date).toLocaleDateString();
            },
            toggleTaskDone(task) {
              this.dataTasks.filter((t) => {
                if(t.id === task.id){
                  t.isDone = !t.isDone;
                }
              });          
              this.$store.dispatch('toggleTaskDone', task);
            },
        }
    };
  </script>
  
<style scoped>
  .table{
    margin: 50px;
    display: flex;
    align-content: center;
    justify-content: center;
    backdrop-filter: blur(10px);
    background-color: #f0f0f0;
  }
  .v-btn {
    margin: 0 50px 100px 0;
  }
  .no-task-text{
    text-align: center;
    margin-top: 200px;
  }
  .sad-ghost {
      width: 100px; /* Adjust image width as needed */
      height: auto; /* Maintain aspect ratio */
    }
  .theme--light.v-btn-toggle:not(.v-btn-toggle--group){
       background-color: #f0f0f0;
  }
</style>
  