<template>
  <div style="height: 100vh;" >
    <v-card class="drawercard" >
      <v-navigation-drawer
        expand-on-hover
        rail
        mini-variant-width="130"
        height="100%"

        permanent
        class="custom-drawer"
      >
        <v-list>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6" @click="createNewList()">
                <v-btn><v-icon>mdi-plus</v-icon>Create new list</v-btn> 
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
            <v-list-item-title>{{ taskList.name }}</v-list-item-title>
            <v-list-item-action style="display:flex; ">
              <v-btn icon @click="openConfirmationModal">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn icon @click="addTaskToList(taskList.id)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-list-item-action>  
            
          </v-list-item-content>
        </v-list-item>
      </v-list>
      </v-list>

      </v-navigation-drawer>
    </v-card>
    <DeleteConfirmationModal v-if="showConfirmationModal" @confirm="deleteTaskList" @cancel="closeConfirmationModal" />
  </div>
</template>
   
  <script>
  import { mapState } from 'vuex'
  import DeleteConfirmationModal from './modals/ConfirmationModal.vue';
  export default {
    name: 'sideBar',
    components: {
      DeleteConfirmationModal
    },
    data () {
      return {
        drawer: true,
        mini: false,
        showNewListDialog: false,
        showConfirmationModal: false,
        taskIdToDelete: null,
      }
    },
    computed: {
      ...mapState({
        taskLists: 'taskLists',
        selectedTaskListId: 'selectedTaskListId',
      })
    },
    methods: {
      openConfirmationModal() {
        this.showConfirmationModal = true;
      },
      selectTaskList(taskListId) {
        console.log(taskListId)
        this.$store.commit('setSelectedTaskList', taskListId);
        this.$store.dispatch('fetchTasksForTaskList');
        this.$store.commit('setSelectedTask', null);
      },
      createNewList(){
        console.log('Create new list')
        this.$emit('openNewListDialog');
      },
      closeNewListDialog() {
        this.showNewListDialog = false;
      },
      closeConfirmationModal() {
        this.showConfirmationModal = false;
      },
      deleteTaskList(){
        this.closeConfirmationModal();
        this.$store.dispatch('deleteTaskList', this.selectedTaskListId);
      },
      addTaskToList(taskListId){
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
  .custom-drawer .v-navigation-drawer__rail {
    /* Set rail width */
      width: 100px; /* Adjust the width as needed */
  }
  .v-list-item__action--stack{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  </style>
  

  