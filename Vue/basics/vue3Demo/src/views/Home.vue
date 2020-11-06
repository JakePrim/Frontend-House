<template>
  <div class="home">
    <section class="todoapp">
      <header class="header">
        <h1>{{title}}</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          autofocus
          autocomplete="off"
          @blur="addNewTodo"
          v-model="newTodo"
          @keydown.enter="addNewTodo"
        />
      </header>
      <section class="main">
        <input type="checkbox" class="toggle-all" id="toggle-all" v-model="allDone"/>
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li class="todo" v-for="todo of filterTodos" :key="todo.id" :class="{completed:todo.completed}">
            <div class="view">
              <input type="checkbox" class="toggle" v-model="todo.completed"/>
              <label>{{todo.title}}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input type="text" class="edit"/>
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todos.length">
				<span class="todo-count">
					<!-- <strong v-text="remaining"></strong> {{pluralize('item', remaining)}} left -->
				</span>
				<ul class="filters">
					<li><a @click="changeState('all')" :class="{selected: visibility == 'all'}">All</a></li>
					<li><a @click="changeState('active')" :class="{selected: visibility == 'active'}">Active</a></li>
					<li><a @click="changeState('completed')" :class="{selected: visibility == 'completed'}">Completed</a></li>
				</ul>
				<button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
					Clear completed
				</button>
			</footer>
    </section>
  </div>
</template>

<script>
import {
  //定义对象
  reactive,
  //定义简单值数据 因为简单值数据没有proxy，proxy只能监视对象
  ref,
  //可以用来为一个reactive对象的属性创建一个ref
  toRefs,
  toRef,
} from "vue";

import useTodoList from '@/use/TodoList'

export default {
  name: "Home",
  setup() {
    let data = useTodoList();
    return {
      title: "ToDoList",
      ...toRefs(data),
    };
  },
};
</script>
