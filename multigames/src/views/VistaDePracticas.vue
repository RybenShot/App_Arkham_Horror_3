<template>
  <div>
    <p>Practicas</p>
    -->

    <!-- ToDoList -->
    <div>
      <p>ToDo List</p>
      <input v-model="newTodo" v-on:keyup.enter="addTodo" />

      <ul>
        <li v-for="todo in todos">
          <span> {{ todo.text }}</span>
          <button v-on:click="removeTodo($index)">X</button>
        </li>
      </ul>
    </div>

    <hr />
    <!-- Full Name Computadas -->
    <div id="demo">FullName : {{ fullName }}</div>

    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // ToDoList
      newTodo: "",
      todos: [{ text: "Add some todos" }],

      // FullName Computadas
      firstName: "Foo",
      lastName: "Bar",
    };
  },
  methods: {
    //ToDoList
    addTodo: function () {
      let text = this.newTodo.trim();
      if (text) {
        this.todos.push({ text: text });
        this.newTodo = "";
      }
    },
    removetodo: function (index) {
      this.todos.splice(index, 1);
    },
  },
  computed: {
    fullName: function () {
      return this.firstName + " " + this.lastName;
    },
  },
};
</script>

<style>
</style>