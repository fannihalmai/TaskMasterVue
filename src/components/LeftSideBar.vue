<template>
  <div style="height: 100vh;" >
    <v-card class="drawercard" >
      <v-navigation-drawer
        permanent
        mini-variant-width="50"
        height="100%"
      >
        <v-list>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6" @click="createNewList()">
                Create new list
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <div v-if="!taskLists || taskLists.length === 0" class="empty-message">
          No current task lists available..
        </div>
        <v-list
          nav
        >
        <v-list>
        <v-list-item
          v-for="taskList in taskLists"
          :key="taskList.name"
          link
          @click="selectTaskList(taskList.id)"
        >
          <v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-star</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ taskList.name }}</v-list-item-title>
            <v-list-item-action><v-btn icon @click="deleteTaskList(taskList.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn></v-list-item-action>  
            <v-list-item-action><v-btn icon @click="addTask(taskList.id)">
              <v-icon>mdi-plus</v-icon>
            </v-btn></v-list-item-action>  
            
          </v-list-item-content>
        </v-list-item>
      </v-list>
      </v-list>

      </v-navigation-drawer>
    </v-card>
  </div>
</template>
   
  <script>
  import { mapState } from 'vuex'
  export default {
    name: 'sideBar',
    data () {
      return {
        drawer: true,
        mini: false,
        showNewListDialog: false,
      }
    },
    computed: {
      ...mapState({
        taskLists: 'taskLists',
      })
    },
    methods: {
      selectTaskList(taskListId) {
        console.log(taskListId)
        this.$store.commit('setSelectedTaskList', taskListId);
        this.$store.dispatch('fetchTasksForTaskList');
      },
      createNewList(){
        console.log('Create new list')
        this.$emit('openNewListDialog');
      },
      closeNewListDialog() {
        this.showNewListDialog = false;
      },
      deleteTaskList(taskListId){
        console.log('Delete task list with id:', taskListId)
        this.$store.dispatch('deleteTaskList', taskListId);
      },
      addTask(taskListId){
        console.log('Add task to task list with id:', taskListId)
        this.$store.commit('setSelectedTaskList', taskListId);
        this.$emit('openNewTaskDialog');
      },
      handleCreateList(newListData) {
        console.log('Creating new list with data:', newListData);
        this.closeNewListDialog();
      },
    },
  };
  </script>
  <style scoped>
  .v-navigation-drawer {
    background-color: #f5f5f5;

  }
  .v-navigation-drawer_content {
    background-color: #f5f5f5;
  }
  .drawercard {
    background-color: #f5f5f5;
    height: 100%;
  }
  .empty-message {
    text-align: center;
    font-style: italic;
    margin-top: 20px; /* Adjust margin as needed */
  }
  </style>
  

  