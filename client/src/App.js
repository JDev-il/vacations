import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import reducer from './store/reducers/reducer'
import thunk from 'redux-thunk';


/* MAIN PAGE */
import WelcomePage from "./pages/Welcome";

/* VACATIONS */
import AllVac from "./pages/vacations/AllVac";

/* ADMIN PAGE */
import Admin from "./pages/users/Admin/Admin";
import Reports from "./pages/users/Admin/Reports";
import EditVac from "./pages/vacations/EditVac";
import DeleteVac from "./pages/vacations/DeleterVac";
import ReRender from "./pages/components/ReRender";

/* USERS */
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import confirmAdd from "./pages/vacations/ConfirmAdd";


const store = createStore(reducer, applyMiddleware(thunk));


class App extends Component {
  render() {
    return (
        <Router>
          <Provider store={store}>
          <div>
            <Switch>
              <Route exact path="/" component={WelcomePage} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/admin/reports" component={Reports} />
              <Route exact path="/admin/vaconfirm" component={confirmAdd} />
              <Route exact path="/vacation/:id/edit" component={EditVac} />
              <Route exact path="/vacation/:id/delete" component={DeleteVac} />
          
              <Route exact path="/all" component={AllVac} />
              <Route exact path="/rerender" component={ReRender} />

              <Route path="/:id" component={WelcomePage} />

             </Switch>
          </div>
          </Provider>
        </Router>
    );
  }
}

export default App;
