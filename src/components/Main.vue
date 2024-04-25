
<template>
 <div class="table">
  <div v-if="tasks.length">
    <v-btn
        fab
        absolute
        right
        bottom
        dark
        @click="createNewTask()"
      >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-data-table
      position: relative
      max-width="500"
      :headers="headers"
      :items="tasks"
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
              Mark as done
            </v-btn>
          </td>

          <td>{{ item.isDone }}</td>
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
        }
      },
      computed: {
          tasks() {
              return this.$store.state.tasks;
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
              this.$store.dispatch('toggleTaskDone', task);
              setTimeout(() => {
                alert('Task marked as done');
              }, 1000);
            },
        }
    };
  </script>
  
<style scoped>
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
</style>
  