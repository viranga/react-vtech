import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';
import { Container } from 'reactstrap';
import {
    AppAside,
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav,
} from '@coreui/react';

// sidebar nav config
import navigation from '../_nav';
// routes config
import routes from '../routes';
import DefaultAside from '../DefaultAside';
import DefaultFooter from '../DefaultFooter';
import DefaultHeader from '../DefaultHeader';

// import Header from '../header';
// import SidebarContainer from '../sidebar';
// import Footer from '../footer';

const DashboardLayout = ({children, ...rest}) => {
    console.log(navigation)
    return(
        <div className="app">
          <AppHeader fixed>
            <DefaultHeader />
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              {/*<AppSidebarNav navConfig={navigation} {...this.props} />*/}
                <div className="sidebar">
                    <nav className="sidebar-nav">
                        <ul className="nav">
                            <li className="nav-title">Nav Title</li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="nav-icon cui-speedometer"></i> Nav item
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="nav-icon cui-speedometer"></i> With badge
                                    <span className="badge badge-primary">NEW</span>
                                </a>
                            </li>
                            <li className="nav-item nav-dropdown">
                                <a className="nav-link nav-dropdown-toggle" href="#">
                                    <i className="nav-icon cui-puzzle"></i> Nav dropdown
                                </a>
                                <ul className="nav-dropdown-items">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <i className="nav-icon cui-puzzle"></i> Nav dropdown item
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            <i className="nav-icon cui-puzzle"></i> Nav dropdown item
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item mt-auto">
                                <a className="nav-link nav-link-success" href="https://coreui.io">
                                    <i className="nav-icon cui-cloud-download"></i> Download CoreUI</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link nav-link-danger" href="https://coreui.io/pro/">
                                    <i className="nav-icon cui-layers"></i> Try CoreUI
                                    <strong>PRO</strong>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <button className="sidebar-minimizer brand-minimizer" type="button"></button>
                </div>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
            <main className="main">
              <AppBreadcrumb appRoutes={routes}/>
              <Container fluid>
                <Switch>

                    {routes.map((route, idx) => {
                            return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                                    <route.component {...props} />
                                )} />)
                                : (null);
                        },
                    )}
                    {/* <Redirect from="/" to="/dashboard" /> */}
                </Switch>
              </Container>
            </main>
            <AppAside fixed hidden>
              <DefaultAside />
            </AppAside>
          </div>
          <AppFooter>
            <DefaultFooter />
          </AppFooter>
        </div>
    )
}

export default DashboardLayout;

