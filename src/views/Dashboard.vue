<template>
    <div class="task-dashboard">
      <div class="sidebar">
        <!-- Sidebar component to display task lists -->
        <leftSideBar :taskLists="taskLists" @selectTaskList="selectTaskList" @openNewTaskDialog="openNewTaskDialog" @openNewListDialog="openNewListDialog"/>
      </div>
      <div class="main">
        <!-- Main component to display tasks -->
        <MainView :tasks="selectedTaskListTasks" @selectTask="selectTask" @openNewTaskDialog="openNewTaskDialog" />
      </div>
      <div class="details">
        <!-- Details component to display details of selected task -->
        <TaskDetails :selectedTask="selectedTask" />
      </div>
      <!-- CreateListModal component to create a new task list -->
      <v-app>
        <CreateListModal :dialog-visible="showNewListDialog" @create="handleCreateList" @close="closeNewListDialog" />
      </v-app>
      <v-app>
        <CreateTaskModal :dialog-visible="showNewTaskDialog" @create="handleCreateTask" @close="closeNewTaskDialog" />
      </v-app>
    </div>
  </template>
  
  <script>
  import MainView from '../components/Main.vue';
  import TaskDetails from '../components/Details.vue';
  import LeftSideBar from '../components/LeftSideBar.vue';
  import CreateListModal from '../components/modals/CreateListModal.vue';
  import CreateTaskModal from '../components/modals/CreateTaskModal.vue';
  export default {
    name: 'task-dashboard',
    components: {
      LeftSideBar,
      MainView,
      TaskDetails,
      CreateListModal,
      CreateTaskModal,
    },
    mounted() {
      this.$store.dispatch('getUser');
    },
    data() {
      return {
        taskLists: [], // Array to store user's task lists
        selectedTaskListTasks: [], // Array to store tasks of selected task list
        selectedTask: null, // Currently selected task
        showNewListDialog: false,
        showNewTaskDialog:false,
      };
    },
    methods: {
      openNewTaskDialog(){
        console.log('Opening new list dialog');
        this.showNewTaskDialog = true;
      },
      openNewListDialog() {
        console.log('Opening new list dialog')
        this.showNewListDialog = true;
        console.log(this.showNewListDialog)
      },
      closeNewListDialog() {
        this.showNewListDialog = false;
      },
      closeNewTaskDialog() {
        this.showNewTaskDialog = false;
      },
      handleCreateTask(taskToCreate) {
        console.log('Creating new task with data:', taskToCreate);
        this.$store.dispatch('createTask', taskToCreate);
      },
      handleCreateList(taskToCreate) {
        console.log('Creating new list with data:', taskToCreate);
        this.$store.dispatch('createTaskList', taskToCreate);
      },
      selectTaskList(taskList) {
        console.log(taskList)
        // Method to handle task list selection
        // Fetch tasks for selected task list and update selectedTaskListTasks
      },
      selectTask(task) {
        // Method to handle task selection
        this.selectedTask = task; // Update selectedTask
      },
    },
  };
  </script>
  
  <style scoped>

.task-dashboard{
  display: flex;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #f0f0f0;
}
.sidebar {
  position:relative;
  vertical-align: middle;  margin-right: 30px;
  max-width: 20%;
  min-width: 125px;  
  background-color: #f0f0f0;
  height: 100vh;
}

.main {
  flex-grow: 0.9;
  margin: 20px;
  margin: 0 auto; /* Horizontally center the main content */
}
.details {
  flex-shrink: 0;
  margin: 20px;
  overflow-y: auto;
  background-color: #f0f0f0;
}
  </style>
  