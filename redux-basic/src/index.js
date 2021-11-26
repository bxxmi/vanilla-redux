import { createStore } from "redux";

const plus = document.querySelector(".add");
const minus = document.querySelector(".minus");
const number = document.querySelector("span");

number.innerText = 0;

// string 오타로 인한 오류를 줄이기 위해 조건을 변수로 담음
const ADD = "ADD";
const MINUS = "MINUS";

// reducer
// return 값이 곧 state data
// action 파라미터는 state를 수정하는 함수가 담겨있다.
// 해당 함수는 store.dispatch로 받아온 것이다.
const countModifier = (count = 0, action) => {
  // 코드 개선 전 💩
  // if (action.type === "ADD") {
  //   return count + 1;
  // } else if (action.type === "MINUS") {
  //   return count - 1;
  // } else {
  //   return count;
  // }
  // 코드 개선 후 😍
  // redux에서는 switch를 사용한다.
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

// createStore 사용 시 data를 수정하는 함수(=reducer)가 꼭 필요하다.
// countStore는 데이터가 저장되는 공간(=store)이다.
const countStore = createStore(countModifier);

// store.subscribe(함수): state의 변화가 있을 때마다 감지해서 불린다.
// 이를 활용해서 변화된 state 값을 화면에 보여지게 한다.
countStore.subscribe(() => {
  // .getStore(): store에 저장된 state값 출력
  number.innerText = countStore.getState();
});

plus.addEventListener("click", () => {
  // dispatch를 통해 reducer에게 action을 보낼 수 있다.
  // store.dispatch({ key: value })
  // 이때, key 값은 type으로 작성해야한다.
  countStore.dispatch({ type: ADD });
});

minus.addEventListener("click", () => {
  countStore.dispatch({ type: MINUS });
});
