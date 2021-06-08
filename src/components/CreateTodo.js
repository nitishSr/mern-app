import axios from "axios";
import { Component } from "react";
import { backend_url } from "../types/constants";
import Alert from "react-bootstrap/Alert";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      desc: "",
      message: "",
      successMsg: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDesc(e) {
    this.setState({
      desc: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const todo = {
      title: this.state.title,
      desc: this.state.desc,
    };

    axios.post(backend_url + "/todos-list/add", todo).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        this.setState({
          message: "Item added to your todo list !",
          successMsg: true,
        });
      } else {
        this.state({
          message: "An error occued: " + res.data,
          successMsg: false,
        });
      }
    });

    this.setState({
      title: "",
      desc: "",
    });
  }

  render() {
    return (
      <div className="container">
        <h4>Add item to your to-do list</h4>
        <br />
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="desc"
              required
              className="form-control"
              value={this.state.desc}
              onChange={this.onChangeDesc}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Todo" className="btn btn-warning" />
          </div>
          <br />
          {this.state.successMsg ? (
            <Alert variant="success">
              <Alert.Heading>{this.state.message}</Alert.Heading>
              <hr />
              <p>
                View your updated list <a href="/">here</a>
              </p>
            </Alert>
          ) : (
            <p></p>
          )}
        </form>
      </div>
    );
  }
}
