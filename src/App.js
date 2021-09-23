import "./App.css";
import Login from "containers/shared/Auth/Login/Login";
import PageNotFound from "containers/shared/PageNotFound/PageNotFound";
import AdminLayout from "layouts/AdminLayout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { adminRoutes, clientRoutes } from "routes/index";
import ClientLayout from "layouts/ClientLayout";
//
function App() {
  const renderLayout = (routes, Layout) => {
    return routes.map((route) => {
      const { path, component, exact, isPrivate } = route;
      return (
        <Layout
        key={component}
          path={path}
          component={component}
          exact={exact}
          isPrivate={isPrivate}
        />
      );
    });
  };
  return (
    <div className="App">
      <Router>
        <Switch>
          {renderLayout(clientRoutes, ClientLayout)}
          {renderLayout(adminRoutes, AdminLayout)}
          <Route path="/login" component={Login} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
