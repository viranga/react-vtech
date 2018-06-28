import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { Router, Route, Link, Match, Redirect, Switch, push, NavLink } from 'react-router-dom'
import { history } from '../../store';
import Session from '../../helpers/session';

// import {
//   Sidebar, SidebarNav, SidebarNavItem,
//   SidebarControls, SidebarControlBtn,
//   LoremIpsum, Grid, Row, Col, FormControl,
//   Label, Progress, Icon, Button,
//   SidebarDivider, Image, Nav, NavItem
// } from '@sketchpixy/rubix';

class SidebarContainer extends React.Component {
  render() {
    let {shopData, isMultipleShops} = this.props;

    return (
      <div id='sidebar' className="sidebar-holder">
        <div id='avatar' onClick={() => history.push('/profile')}>
          {
            (shopData)?
            // <Grid>
            //   <Row className='fg-white'>
            //     <Col xs={4} collapseRight>
            //       <Image src={shopData.logo} circle width="40"  />
            //     </Col>
            //     <Col xs={8} collapseLeft id='avatar-col'>
            //       <div style={{top: 26, fontSize: 20, lineHeight: 1, position: 'relative', fontWeight: 700}}>{shopData.businessName}</div>
            //     </Col>
            //   </Row>
            // </Grid>
            ''
            :
              (isMultipleShops)?
              // <Grid>
              //   <Row className='fg-white'>
              //     <Col xs={1} collapseRight/>
              //     <Col xs={8} collapseLeft id='avatar-col'>
              //       <p style={{top: 32, fontSize: 20, lineHeight: 1, position: 'relative', fontWeight: 700}}>Select shop</p>
              //     </Col>
              //   </Row>
              // </Grid>
              ''
              :
              null
          }
        </div>
        <div id='sidebar-container'>
          <NavLink to="/dashboard" className="navItem" activeClassName="active-link">Dashboard</NavLink>
          {
            (isMultipleShops)?
            <NavLink to="/shop-select" className="navItem" activeClassName="active-link">Shops</NavLink>
            :
            null
          }
          <NavLink to="/customers" className="navItem" activeClassName="active-link">Customers</NavLink>
            {/* <NavLink to="/vehicles" className="navItem" activeClassName="active-link">Vehicles</NavLink> */}
          {/* <NavLink to="/reviews" className="navItem" activeClassName="active-link">Reviews</NavLink> */}
          <NavLink to="/notifications" className="navItem" activeClassName="active-link">Notifications</NavLink>
          <NavLink to="/appointments" className="navItem" activeClassName="active-link">Appointments</NavLink>
          <NavLink to="/sync-tool-keys" className="navItem" activeClassName="active-link">Sync Tool Keys</NavLink>
          {
            (shopData != null)?
            <NavLink to="/change-password" className="navItem" activeClassName="active-link">Change Password</NavLink>
            :
            null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.shop.is_loading,
  isMultipleShops: state.shop.is_multiple_shops,
  shopData: state.shop.shop_data,
})

// const mapDispatchToProps = dispatch => bindActionCreators({
//   loadShop,
//   changePage: () => push('/login')
// }, dispatch)

export default withRouter(connect(
  mapStateToProps, 
  null
)(SidebarContainer))
