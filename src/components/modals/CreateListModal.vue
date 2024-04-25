<template>
<v-dialog v-model="internalDialogVisible" max-width="500"  @click:outside="closeDialog">
  <v-card>
    <v-card-title>Create new task list</v-card-title>
    <v-card-text>
      <v-form ref="form" @submit.prevent="handleCreateTask">
        <v-text-field
          v-model="name"
          label="Name"
          ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="create-btn" :disabled="!name" @click="handleCreateTaskList">Create</v-btn>
      <v-btn color="cancel-btn" @click="closeDialog">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
  },
  data() {
    return {
      internalDialogVisible: false,
      name: '',
    };
  },
  watch: {
    dialogVisible(newValue) {
      console.log("new list value : ", newValue)
      this.internalDialogVisible = newValue;
    },
  },
  methods: {
    handleCreateTaskList() {
      const taskListToCreate = {
        name: this.name,
      };
      this.$store.dispatch('createTaskList', taskListToCreate);
      this.$emit('close');
      this.internalDialogVisible = false;
    },
    closeDialog() {
      this.internalDialogVisible = false;
      this.$emit('close');
    },
  },
};
</script>
<style scoped>
.custom-modal {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
}
.create-btn {
  color: #4caf50;
  background-color: #ffffff; /* White background */
  border: 1px solid #4caf50; /* Green border */
}

.create-btn:hover {
  background-color: #4caf50; /* Green background on hover */
  color: #ffffff; /* White text on hover */
}

.cancel-btn {
  color: #070707;
  border: 1px solid
}
.v-menu__content {
  min-width: 280px !important; /* Override min-width */
}

</style>
