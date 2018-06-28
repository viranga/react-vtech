import React, { Component } from 'react';
import { Router, HashRouter, Route, Link, Match, Redirect, Switch, push } from 'react-router-dom'
import Session from '../../helpers/session';

import HomeLayout from '../../components/layouts/home';
import DashboardLayout from '../../components/layouts/dashboard';
import Login from '../login';
import Register from '../register';
// import './App.css';

// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../../scss/style.css'

// Containers
// import { DefaultLayout } from './containers';
// Pages
//import { Login, Page404, Page500, Register } from './views/Pages';

// import ResetPassword from '../resetPassword';
import Dashboard from '../dashboard';
// import ShopSelect from '../shopSelect';
// import CarOwners from '../carOwners';
// import Profile from '../profile';
// import NotificationHistory from '../notifications';
// import Notifications from '../notifications/sendNotifications';
// import Vehicles from '../vehicles';
// import SyncToolKeys from '../syncToolKeys';
// import VehicleHistory from '../vehicleHistory';
// import VehicleRecommendations from '../vehicleRecommendations';
// import ChangePasswordForm from '../changePassword';
// import Appointments from '../appointments';

//import '../../assets/styles/styles';
// import { getVehicleHistory } from './../../actions/vehicleActions';

const DashboardRoute = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={matchProps => (
        <DashboardLayout>
            <Component {...matchProps} />
        </DashboardLayout>
      )} />
    )
  };
  
const HomeLayoutRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
        <HomeLayout>
            <Component {...matchProps} />
        </HomeLayout>
        )} />
    )
};
 
class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loggedUser: Session.getSession('vtech'),
        };
    
    }

    componentDidMount() {
        const { loggedUser } = this.state;
        const loggedUserId = loggedUser.id;

        if (loggedUserId != undefined && loggedUserId) {
            if(this.props.history.location.pathname == "/login"){
                this.props.history.push("/dashboard");
            }else{
                this.props.history.push(this.props.history.location.pathname);
            }
        } else {
            this.props.history.push("/login");
        }
        
    }

    render() {
        return (
            <Router history={this.props.history}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                    <HomeLayoutRoute path="/login" component={Login} />
                    <HomeLayoutRoute path="/register" component={Register} />
                    {/*<HomeLayoutRoute path="/reset-password" component={ResetPassword} />*/}
                    <DashboardRoute path="/dashboard" component={Dashboard} />
                    {/*<DashboardRoute path="/shop-select" component={ShopSelect} />
                    <DashboardRoute path="/customers" component={CarOwners} />
                    <DashboardRoute path="/profile" component={Profile} />
                    <DashboardRoute path="/notifications" component={NotificationHistory} />
                    <DashboardRoute exact path="/send-notifications" component={Notifications} />
                    <DashboardRoute path="/vehicles/:userId" component={Vehicles} />
                    <DashboardRoute path="/sync-tool-keys" component={SyncToolKeys} />
                    <DashboardRoute path="/vehicle-history/:vehicleId" component={VehicleHistory} />
                    <DashboardRoute path="/vehicle-recommendations/:vehicleId" component={VehicleRecommendations} />
                    <DashboardRoute path="/change-password" component={ChangePasswordForm} />
                    <DashboardRoute path="/appointments" component={Appointments} /> */}
                </Switch>
            </Router>
        );
    }
}

export default App;