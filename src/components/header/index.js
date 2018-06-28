import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogout } from '../../actions/userLoginAction';
// import {
//   SidebarBtn,
//   Navbar,
//   Nav,
//   NavItem,
//   Badge,
//   Button,
//   Icon,
//   Grid,
//   Row,
//   Radio,
//   Col } from '@sketchpixy/rubix';

// class Brand extends React.Component {
//   render() {
//     return (
//       <Navbar.Header>
//         <Navbar.Brand tabIndex='-1'>
//           <div className="brand-holder">
//             <img src={require('../../assets/images/dashboard-logo.png')} alt='Shop Flow' />
//           </div>
//         </Navbar.Brand>
//       </Navbar.Header>
//     );
//   }
// }

// class HeaderNavigation extends React.Component {
//   render() {
//     return (
//       <Nav pullRight>
//         <Nav>
//           <NavItem className='logout' onClick={() => this.props.logout()}>
//             <Icon bundle='fontello' glyph='off-1' />
//           </NavItem>
//         </Nav>
//       </Nav>
//     );
//   }
// }

class Header extends React.Component {
  render() {
    return (
      // <Grid id='navbar' className="dashboard-header">
      //   <Row>
      //     <Col xs={12}>
      //       <Navbar fixedTop fluid id='rubix-nav-header'>
      //         <Row>
      //           <Col xs={3} visible='xs'>
      //             <SidebarBtn />
      //           </Col>
      //           <Col xs={6} sm={4}>
      //             <Brand />
      //           </Col>
      //           <Col xs={3} sm={8} collapseRight className='text-right'>
      //             <HeaderNavigation logout={this.props.userLogout}/>
      //           </Col>
      //         </Row>
      //       </Navbar>
      //     </Col>
      //   </Row>
      // </Grid>
      <div></div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.shop.is_loading,
  shopListData: state.shop.shop_list_data,
  shopData: state.shop.shop_data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  userLogout
}, dispatch)

export default withRouter(connect(
  null, 
  mapDispatchToProps
)(Header))
