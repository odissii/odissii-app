import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import GridContainer from './components/GridContainer/GridContainer';
import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import DashboardView from './components/DashboardView/DashboardView';
import EmployeesView from './components/EmployeesView/EmployeesView';
import IndividualEmployeeSummaryView from './components/EmployeesView/IndividualEmployeeSummaryView/IndividualEmployeeSummaryView';
import FeedbackFormView from './components/FeedbackFormView/FeedbackFormView';
import FeedbackFormConfirmationView from './components/FeedbackFormConfirmationView/FeedbackFormConfirmationView';
import EmployeeFormView from './components/EmployeeFormView/EmployeeFormView';
import SettingsView from './components/SettingsView/SettingsView';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import EditSupervisor from './components/EditPerson/EditSupervisor'; 


import './styles/main.css';

const App = () => (
  <GridContainer>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route 
          path="/dashboard"
          component={DashboardView}
        />
        <Route 
          path="/employees"
          component={EmployeesView}
        />
        <Route
          path="/individualEmployee"
          component={IndividualEmployeeSummaryView}
        />
        <Route 
          path="/feedback/new"
          component={FeedbackFormView}
        />
        <Route 
          path="/feedback/confirmation"
          component={FeedbackFormConfirmationView}
        />
        <Route 
          path="/employee/new"
          component={EmployeeFormView}
        />
        <Route 
          path="/settings"
          component={SettingsView}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
        <Route 
        path="/edit/:personId" 
        component={EditSupervisor}/>
       
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </Router>
  </GridContainer>
);

export default App;
