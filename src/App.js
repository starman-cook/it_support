import { Route, Switch } from 'react-router';
import ErrorWindow from './Components/ApplicationPageComponents/ErrorWindow/ErrorWindow';
import FullApplicationInfo from './Components/SearchResultsComponents/FullApplicationInfo/FullApplicationInfo';
import ApplicationPage from './Containers/ApplicationPage/ApplicationPage';
import SearchResultsPage from './Containers/SearchResultsPage/SearchResultsPage';
import UserLoginPage from './Containers/UserLoginPage/UserLoginPage';
import WithLoader from './hoc/WithLoader/WithLoader';
import axios from "./axiosApi";
function App() {
  return (
  <>
  <Switch>
    {/*<Route path="/:id" exact component={UserLoginPage} />*/}
    <Route path="/login/:id" exact component={UserLoginPage} />
    <Route path="/application" exact component={ApplicationPage} />
    <Route path="/application/:id" component={ApplicationPage} />
    <Route path="/error" component={ErrorWindow} />
    <Route path="/search" component={SearchResultsPage} />
    {/*<Route path="/fullinfo" component={FullApplicationInfo} />*/}
  </Switch>
  </>
  );
}

export default WithLoader(App, axios);
