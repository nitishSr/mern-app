import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodosList";

function App() {
  return (
    <Router>
      <Header heading="Todos List" />
      <br />
      <Route path="/" exact component={TodoList} />
      <Route path="/todos-list/add" component={CreateTodo} />
    </Router>
  );
}

export default App;
