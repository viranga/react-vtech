import React from 'react';
import { push } from 'react-router-redux'
import { withRouter, NavLink } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Alert, Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';    
import {emailValidate} from '../../helpers/validation';
import { userLogin } from '../../actions/userLoginAction';

class Login extends React.Component{
    constructor(props){
        super(props);

        this.state={
            user:{
                email: "",
                pass: "",
            },
            isEmailValid: true,
            isPassValid: true,
        }
    }

    handleEmail(value){
        let {user} = this.state;

        user.email = value;

        this.setState({user});
    }
    
    handlePassword(value){
        let {user} = this.state;

        user.pass = value;

        this.setState({user});
    }

    onSubmit(e){
        e.preventDefault();
        let {userLogin} = this.props;
        let {user, isEmailValid, isPassValid} = this.state;

        isEmailValid = emailValidate(user.email)? true : false;

        if(user.pass.length > 0){
            isPassValid = true;
        }else{
            isPassValid = false;
        }

        this.setState({isEmailValid, isPassValid}, function(){
            if(isEmailValid && user.pass.length > 0){
                let data={
                    "userType": 1,
                    "sysEmail": user.email,
                    "password": user.pass
                };
    
                userLogin(data);
            }
        });

    }

    render(){
        let {userLogin, isLoading, userData, isLoginFail} = this.props;
        let {user, isEmailValid, isPassValid} = this.state;

        return(
            <Col md="8">
              <CardGroup>                
                  <Card className="p-4">
                    <CardBody>
                    <form onSubmit={(e) => this.onSubmit(e)} noValidate>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>                      
                        <input type="email" placeholder="Your Email" className="form-control" value={user.email} onChange={(e) => this.handleEmail(e.target.value)} noValidate />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>                      
                        <input type="password" placeholder="Your Password" className="form-control" value={user.pass} onChange={(e) => this.handlePassword(e.target.value)} noValidate />
                      </InputGroup>
                      {
                          (isLoginFail)?
                          <Alert danger={true}>
                              <strong>Invalid username or password</strong>
                          </Alert>                          
                          :
                          null
                      }
                      {
                          (!isEmailValid)?
                          <Alert danger={true}>
                              <strong>Invalid Email</strong>
                          </Alert>
                          :
                          null
                      }
                      {
                          (!isPassValid)?
                          <Alert danger={true}>
                              <strong>Password is empty</strong>
                          </Alert>                          
                          :
                          null
                      }
                      <Row>
                        <Col xs="6">
                        {
                          (isLoading)?
                            <Button color="primary" className="px-4">Loading..</Button>
                              :
                            <Button color="primary" className="px-4">Login</Button>
                        }
                        </Col>
                        <Col xs="6" className="text-right">        
                          <NavLink to="/reset-password"><span className="px-0">Forgot password?</span></NavLink>
                        </Col>
                      </Row>
                      </form>
                    </CardBody>
                  </Card>
                
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>or need an account</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>          
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.user.is_loading,
    isLoginFail: state.user.login_fail,
    userData: state.user.user_data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    userLogin
  }, dispatch)
  
export default withRouter(connect(
    mapStateToProps, 
    mapDispatchToProps
)(Login))