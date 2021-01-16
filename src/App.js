import { Route, Switch } from 'react-router';
import ErrorWindow from './Components/ApplicationPageComponents/ErrorWindow/ErrorWindow';
import ApplicationPage from './Containers/ApplicationPage/ApplicationPage';
function App() {
  return (
  <>
  <Switch>
    <Route path="/" exact component={ApplicationPage} />
    <Route path="/application" exact component={ApplicationPage} />
    <Route path="/application/:id" component={ApplicationPage} />
    <Route path="/error" component={ErrorWindow} />
  </Switch>
  </>
  );
}

export default App;
