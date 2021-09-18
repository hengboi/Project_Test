import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './components/Main';
import Question from "./components/Question";
import SubQuestions from "./components/SubQuestions";
import DigitalQuestion from "./components/DigitalQuestion";
import Nav from "./components/Nav";

function Index() {
  return (
    <div>
      <Main />
    </div>
  )
}

function QuestionRoute() {
  return (
    <div>
      <Question />
    </div>
  )
}

function SubQuestionRoute() {
  return (
    <div>
      <SubQuestions />
    </div>
  )
}
function DigitalQuestionRoute() {
  return (
    <div>
      <DigitalQuestion />
    </div>
  )
}
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/question/:number">
          <QuestionRoute />
        </Route>
        <Route path="/subquestions/:number">
          <SubQuestionRoute />
        </Route>
        <Route path="/digitalquestion/:number">
          <DigitalQuestionRoute />
        </Route>
        <Route path="/">
          <Index />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
