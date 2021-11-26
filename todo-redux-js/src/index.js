import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD = "ADD";
const DELETE = "DELETE";

// dispatch로 액션 전달 시 다음과 같이 최적화 하기도 한다.
// 이때, 주로 reducer 위로 위치시킨다.
// action creator라고도 불림
const addTodo = (text) => {
  return {
    type: ADD,
    text,
    id: Date.now(),
  };
};

const deleteTodo = (id) => {
  return {
    type: DELETE,
    id,
  };
};

const todoList = (list = [], action) => {
  switch (action.type) {
    case ADD:
      const newTodoObj = { text: action.text, id: action.id };
      return [newTodoObj, ...list];
    case DELETE:
      const clearTodo = list.filter((todo) => todo.id !== action.id);
      return clearTodo;
    default:
      return list;
  }
};

const todoStore = createStore(todoList);

const dispatchAddTodo = (todo) => {
  todoStore.dispatch(addTodo(todo));
};

const dispatchDeleteTodo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  todoStore.dispatch(deleteTodo(id));
};

const showTodos = () => {
  const todos = todoStore.getState();
  // 목록이 그려질 때 계속해서 ul 전체가 호출되므로 초기화 시켜주는 것
  ul.innerText = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.addEventListener("click", dispatchDeleteTodo);

    btn.innerText = "delete";
    li.id = todo.id;
    li.innerText = todo.text;

    li.appendChild(btn);
    ul.appendChild(li);
  });
};

todoStore.subscribe(showTodos);

const onSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  dispatchAddTodo(todo);
};

form.addEventListener("submit", onSubmit);
