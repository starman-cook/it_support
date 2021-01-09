import { Route, Switch } from 'react-router';
import ApplicationPage from './Containers/ApplicationPage/ApplicationPage';
function App() {
  return (
  <>
  <Switch>
    <Route path="/" exact component={ApplicationPage} />
    <Route path="/application" exact component={ApplicationPage} />
  </Switch>
  </>
  );
}

export default App;
