import React, { Component } from "react";
import { backend_url } from "../types/constants";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default class TodosList extends Component {
  constructor(props) {
    super(props);

    this.deleteTodo = this.deleteTodo.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);

    this.state = {
      todos: [],
    };
  }

  fetchTodos() {
    var rowData = [];

    for (let i = 0; i < this.state.todos.length; i++) {
      rowData.push(
        <tr key={this.state.todos[i]._id}>
          <td key={this.state.todos[i].title}>{this.state.todos[i].title}</td>
          <td key={this.state.todos[i].desc}>{this.state.todos[i].desc}</td>
          <td>
            <Button variant="outline-dark" aria-label="Edit">
              Edit
            </Button>{" "}
            &nbsp;&nbsp;
            <Button
              variant="outline-danger"
              aria-label="Delete"
              onClick={() => this.deleteTodo(this.state.todos[i]._id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    }
    return rowData;
  }

  componentDidMount() {
    axios
      .get(backend_url + "/todos-list/")
      .then((response) => {
        console.log("data", response.data);
        this.setState({ todos: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteTodo(id) {
    axios.delete(backend_url + "/todos-list/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      todos: this.state.todos.filter((el) => el._id !== id),
    });
  }

  render() {
    return this.state.todos.length > 0 ? (
      <div className="container">
        <h3>Todos List</h3>
        <br />
        <table className="table responsive striped">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.fetchTodos()}</tbody>
        </table>
      </div>
    ) : (
      <div className="container">
        <Card>
          <Card.Header>Your to do list is empty !</Card.Header>
          <Card.Body>
            <Card.Text>Start adding by clicking on the link below.</Card.Text>
            <a href="/todos-list/add">Add Todo</a>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
