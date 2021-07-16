import { Route, Switch } from 'react-router';
import ErrorWindow from './Components/ApplicationPageComponents/ErrorWindow/ErrorWindow';
import ApplicationPage from './Containers/ApplicationPage/ApplicationPage';
import SearchResultsPage from './Containers/SearchResultsPage/SearchResultsPage';
import UserLoginPage from './Containers/UserLoginPage/UserLoginPage';
import {useSelector} from "react-redux";
function App() {
  const forgetMe = useSelector(state => state.applications.forgetMe)
  // Это событие на кнопке "Запомнить Меня"
  if (forgetMe) {
    window.addEventListener("beforeunload", function (e) {
      localStorage.clear()
      return undefined;
    });
  }


  return (
  <>
  <Switch>
    <Route path="/" exact component={SearchResultsPage} />
    <Route path="/search" exact component={SearchResultsPage} />
    <Route path="/login" exact component={UserLoginPage} />
    <Route path="/login/:id" exact component={UserLoginPage} />
    <Route path="/application/:id/:hash" component={ApplicationPage} />
    <Route path="/error" component={ErrorWindow} />
  </Switch>
  </>
  );
}

export default App;
