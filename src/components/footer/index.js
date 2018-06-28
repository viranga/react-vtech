import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { getBookingReq, hideAndRedirectBookingReq, hideBookingReq } from '../../actions/shopActions';
// import { Alert } from '@sketchpixy/rubix';

class Footer extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { shopData } = this.props;
    if(shopData != null){    
        let data = {
            "shopId" : shopData.id,
            "isNotified" : 0
        }
        
        setInterval(function() { this.props.getBookingReq(data); }.bind(this), 100000);
    }

  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isBookingReqVisible){
      setTimeout(function() { this.props.hideBookingReq(); }.bind(this), 5000);
    }
  }

  handleAlertClick() {
    const { shopData } = this.props;

    let data = {
        "shopId" : shopData.id,
        "isNotified" : 1
    }

    this.props.hideAndRedirectBookingReq();
  }

  render() {
    let {isBookingReqVisible, numberOfAppointments} = this.props;

    return (
      <footer>
        {
          // (isBookingReqVisible)?
          // <Alert info style={{width : 270, bottom : 0 , right : 30, position : "fixed", zIndex : 2, cursor : "pointer"}} onClick={() => this.handleAlertClick()}>
          //     <strong>You have {numberOfAppointments} new appointments.</strong>
          // </Alert>
          // :
          // null
        }
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.shop.is_loading,
  shopListData: state.shop.shop_list_data,
  shopData: state.shop.shop_data,
  isBookingReqVisible: state.shop.isBookingReqVisible,
  numberOfAppointments: state.shop.numberOfAppointments,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  // getBookingReq,
  // hideAndRedirectBookingReq,
  // hideBookingReq,
}, dispatch)

export default withRouter(connect(
  mapStateToProps, 
  mapDispatchToProps
)(Footer))
