import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    selectedTaskListName: null,
    tasks: [],
    selectedTask: null,
    taskLists: [],
    isLoggedIn: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
    },
    setTaskLists(state, taskLists) {
      state.taskLists = taskLists;
    },
    setSelectedTaskList(state, taskListName) {
      state.selectedTaskListName = taskListName;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    setSelectedTask(state, task) {
      state.selectedTask = task;
    },
    toggleTaskDone(state, taskId) {
      const task = state.tasks.find(task => task.id === taskId);
      task.done = !task.done;
    },
    setLoggedIn(state, isLoggedIn){
      state.isLoggedIn = isLoggedIn;
    }
  },   
  actions: {
    async toggleTaskDone({ commit }, task) {
      try {
        await fetch(`${process.env.VUE_APP_BACKEND_API}/tasks/${task.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify({ isDone : !task.done }),
        });
        commit('toggleTaskDone', task.id);
      } catch(error) {
        console.error('Toggle task done error:', error);
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_API}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Login failed');
        }
        const resp = await response.json();
        const access_token = resp.access_token;
        const user= resp.user;
        console.log('User token:', access_token)
        commit('setUser', user);
        commit('setTaskLists', user.taskLists);
        localStorage.setItem('token', resp.access_token);
        commit('setLoggedIn', true);
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    async getUser({ commit }){
      const profile = await fetch(`${process.env.VUE_APP_BACKEND_API}/users/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });

      const prof = await profile.json();

      commit('setTaskLists', prof.taskLists);
      commit('setUser', prof);
    },
    async fetchTasksForTaskList({ commit, state }) {
      try {
        const taskListId = state.taskLists.find(taskList => taskList.name === state.selectedTaskListName).id;
        if (!taskListId) {
          return; // No selected task list, do nothing
        }
        const response = await fetch(`${process.env.VUE_APP_BACKEND_API}/tasks/${taskListId}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasks = await response.json();
        console.log("Got tasks back : ", tasks)
        commit('setTasks', tasks);
      } catch (error) {
        console.error('Fetch tasks error', error);
      }
    },
    async createTaskList({ commit, state }, title) {
      try {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_API}/users/task-lists`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify( title ),
        });
        if (!response.ok) {
          throw new Error('Failed to create task list');
        }
        commit('setTaskLists', [...state.taskLists, title]);
      } catch (error) {
        console.error('Create task list error:', error);
      }
    },
    async createTask({ commit, state },  taskToCreate ) {
      let taskListId = state.selectedTaskListId;
      console.log(JSON.stringify(taskToCreate))
      try {
        const response = await fetch(`${process.env.VUE_APP_BACKEND_API}/tasks/${taskListId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify(taskToCreate),
        });
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to create task');
        }
        const task = await response.json();
        console.log("I got back : ", task)
        commit('setTasks', [...state.tasks, task]);
      } catch (error) {
        console.error('Create task error:', error);
      }
    },
    async deleteTaskList({ commit, state }, taskListName){
      const taskListId = state.taskLists.find(taskList => taskList.name === taskListName).id;
      try {
        await fetch(`${process.env.VUE_APP_BACKEND_API}/users/task-lists/${taskListId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
        });
        commit('setTaskLists', state.taskLists.filter(taskList => taskList.id !== taskListId));
      } catch (error) {
        console.error('Delete task error:', error);
      }
    },
    async deleteTask({ commit, state }, taskId) {
      try {
        await fetch(`${process.env.VUE_APP_BACKEND_API}/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
        });
        commit('setTasks', state.tasks.filter(task => task.id !== taskId));
      } catch (error) {
        console.error('Delete task error:', error);
      }
    },
    async logout({ commit }){
      localStorage.removeItem('token');
      commit('setLoggedIn', false);
    },
  },
  getters: {
    isLoggedIn: state => !!state.user,
  },
});
