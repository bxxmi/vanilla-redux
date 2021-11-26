import React from "react";
import { connect } from "react-redux";

function Detail({ todo }) {
  return (
    <>
      <h1>{todo.text}</h1>
      <h5>Created at : {todo.id}</h5>
    </>
  );
}

function mapStateToProps(ownProps) {
  const { id } = ownProps[0];
  return { todo: ownProps.find((todo) => todo.id === id) };
}

export default connect(mapStateToProps, null)(Detail);
