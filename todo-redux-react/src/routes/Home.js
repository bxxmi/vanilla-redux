import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import Todo from "../components/Todo";

function Home({ todos, addTodo }) {
  const [text, setText] = useState("");

  function onChange(e) {
    setText(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    addTodo(text);
    setText("");
  }

  return (
    <>
      <h1>Todo</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="write to do"
          value={text}
          onChange={onChange}
        />
        <button>Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo {...todo} key={todo.id} />
        ))}
      </ul>
    </>
  );
}

// store로부터 state를 가져오는 함수
function mapStateToProps(state) {
  return { todos: state };
}

// 컴포넌트에서 dispatch를 수행할 수 있게 하는 함수
// 즉, store에서 받아온 state가 props로 저장되어 있는 현재 컴포넌트에서
// props를 변경할 수 있게 된다. (store 입장에서 reducer로 dispatch를 연결해서 state 값을 변경하는 것과 같다.)
function mapDispatchToProps(dispatch) {
  return {
    // Home 컴포넌트에서 쓰일 dispatch 명: (사용할 값) => dispatch(store에서 선언된 dispatch 호출)
    addTodo: (text) => dispatch(actionCreators.addTodo(text)),
  };
}

// connect function은 react-redux에서 가져온 함수이다.
// 말 그대로 컴포넌트들을 store에 연결시켜준다.
// connect(함수)(컴포넌트명): state를 가져와서 해당 컴포넌트 prop으로 전달한다.
export default connect(mapStateToProps, mapDispatchToProps)(Home);

// 두 가지의 인자 중 하나를 안쓰고 싶다면 아래와 같이 null을 입력해서 사용한다.
// export default connect(null, mapDispatchToProps)(Home);
