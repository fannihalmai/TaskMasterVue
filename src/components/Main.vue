
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
        <tr @click="selectTask(item)">
          <td>{{ item.shortDescription }}</td>
          <td>{{ item.dueDate }}</td>
          <td>{{ item.priority }}</td>
          <td>{{ item.isDone }}</td>
        </tr>
        
      </template>
    </v-data-table>
  </div>
  <div v-else>
      <h2 class="no-task-text"> No tasks available, please select or create a new task list</h2>
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
          { text: 'Priority', value: 'priority' },
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
            }
        },
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
</style>
  