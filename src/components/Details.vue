<template>
    <div class="details">
    <div v-if="selectedTask">
      <h2>Additional Task Details</h2>
      <p><strong>Title:</strong> {{ selectedTask.shortDescription }}</p>
      <p><strong>Description:</strong> {{ selectedTask.longDescription }}</p>
      <p><strong>Due Date:</strong> {{ selectedTask.dueDate }}</p>
      <p><strong>Created:</strong> {{ selectedTask.createdAt }}</p>
      <v-btn class="red-button" @click="openConfirmationModal">Delete</v-btn>
    </div>
    <div v-else>
      <p>No task selected</p>
    </div>
    <DeleteConfirmationModal v-if="showConfirmationModal" @confirm="deleteTask" @cancel="closeConfirmationModal" />
    
  </div>
  </template>
  
  <script>
  import DeleteConfirmationModal from './modals/ConfirmationModal.vue';
  export default {
    name: 'TaskDetails',
    components: {
      DeleteConfirmationModal
    },
    data() {
      return {
        showConfirmationModal: false,
      };
    },
    computed: {
      selectedTask() {
        return this.$store.state.selectedTask;
      }
    },
    methods: {
      openConfirmationModal() {
        this.showConfirmationModal = true;
      },
      closeConfirmationModal() {
        this.showConfirmationModal = false;
      },
      deleteTask() {
        // Call a method to delete the task
        // You can emit an event to the parent component or make an API call here
        this.closeConfirmationModal();
        this.$store.dispatch('deleteTask', this.selectedTask.id);
      }
    }
};
  </script>
  
  <style scoped>
    .details{
      text-align: end;
      line-height: 45px;   /* within paragraph */
    }
    .red-button {
      height: 50px; /* Button height */
      background-color: #ffe6e6; /* Light red background */
      border: 1px solid #ff6666; /* Border color */
      color: #ff6666; /* Text color */
      padding: 6px 12px; /* Padding */
      border-radius: 3px; /* Rounded corners */
      cursor: pointer; /* Cursor style */
      transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transitions */
    }

    .red-button:hover {
      background-color: #ff6666; /* Red background on hover */
      color: white; /* Text color on hover */
    }
  </style>