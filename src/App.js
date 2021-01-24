import { Route, Switch } from 'react-router';
import ErrorWindow from './Components/ApplicationPageComponents/ErrorWindow/ErrorWindow';
import ApplicationPage from './Containers/ApplicationPage/ApplicationPage';
import SearchResultsPage from './Containers/SearchResultsPage/SearchResultsPage';
import UserLoginPage from './Containers/UserLoginPage/UserLoginPage';
function App() {
  return (
  <>
  <Switch>
    <Route path="/" exact component={UserLoginPage} />
    <Route path="/login" exact component={UserLoginPage} />
    <Route path="/application" exact component={ApplicationPage} />
    <Route path="/application/:id" component={ApplicationPage} />
    <Route path="/error" component={ErrorWindow} />
    <Route path="/search" component={SearchResultsPage} />
  </Switch>
  </>
  );
}

export default App;
