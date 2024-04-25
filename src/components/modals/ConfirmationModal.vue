<!-- DeleteConfirmationModal.vue -->
<template>
    <div class="modal">
      <div class="modal-content">
        <p>Are you sure you want to delete this?</p>
        <div class="modal-buttons">
          <v-btn class="red-button" @click="confirm">Yes, Delete</v-btn>
          <v-btn @click="cancel">Cancel</v-btn>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      confirm() {
        // Emit event to confirm deletion
        this.$emit('confirm');
      },
      cancel() {
        // Emit event to cancel deletion
        this.$emit('cancel');
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:10;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
  }
  
  .modal-buttons {
    margin-top: 10px;
    text-align: right;
  }
  
  .red-button {
    background-color: #ff4d4f;
    border: 1px solid #ff4d4f;
    color: #ff4d4f;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button {
    margin-left: 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  