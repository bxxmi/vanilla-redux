import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actionCreators } from "../store";

function Todo({ text, onBtnClick, id }) {
  return (
    <li>
      <Link to={`/${id}`}>
        {text}
        <button onClick={onBtnClick}>DELETE</button>
      </Link>
    </li>
  );
}

// Todo 컴포넌트의 ownProps에서는 사용자가 작성한 값이 그대로 들어있다.
function mapDispatchProps(dispatch, ownProps) {
  return {
    onBtnClick: () => dispatch(actionCreators.deleteTodo(ownProps.id)),
  };
}

export default connect(null, mapDispatchProps)(Todo);
