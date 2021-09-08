import SideBar from "components/SideBar/SideBar";
import PageNotFound from "containers/shared/PageNotFound/PageNotFound";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import adminRoutes from "routes/adminRoutes";

import "./App.css";
function App() {
  const renderRoutes = (routes) => {
    return routes.map((route) => {
      const { path, component, exact } = route;
      return <Route path={path} component={component} exact={exact} />;
    });
  };
  return (
    <div className="App">
      <Router>
        <SideBar />
        <Switch>
          {renderRoutes(adminRoutes)}
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
