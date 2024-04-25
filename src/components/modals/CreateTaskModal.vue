<template>
    <v-dialog v-model="internalDialogVisible" max-width="500"  @click:outside="closeDialog">
      <v-card>
        <v-card-title class="modal-title">Create New List</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit.prevent="handleCreateList">
          <v-text-field
            v-model="shortDescription"
            label="Short Description"
            required
            :maxlength="30"
            counter
          ></v-text-field>
          <v-textarea
            v-model="longDescription"
            label="Long Description"
            hint="Optional"
            :maxlength="150"
            counter
          ></v-textarea>
          <v-menu
            v-model="dueDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="dueDate"
                label="Due Date"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker class="date-picker" v-model="dueDate" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="cancelDate">Cancel</v-btn>
              <v-btn text color="primary" @click="confirmDate">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="create-btn" :disabled="!shortDescription || !dueDate" @click="handleCreateTask">Create</v-btn>
          <v-btn color="cancel-btn"  @click="closeDialog">Cancel</v-btn>
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
      shortDescription: '',
      longDescription: '',
      dueDate: '',
      dueDateMenu: false,
    };
  },
  watch: {
    dialogVisible(newValue) {
      console.log("New task value : ", newValue)
      this.internalDialogVisible = newValue;
    },
  },
  methods: {
    handleCreateTask() {
      const taskToCreate = {
        shortDescription: this.shortDescription,
        longDescription: this.longDescription,
        dueDate: this.dueDate,
        isDone: false,
      };
      this.$emit('create', taskToCreate);
      this.$emit('close');
      this.internalDialogVisible = false;
    },
    closeDialog() {
      this.internalDialogVisible = false;
      this.$emit('close');
    },
    cancelDate() {
      this.dueDate = '';
      this.dueDateMenu = false;
    },
    confirmDate() {
      this.dueDateMenu = false;
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
