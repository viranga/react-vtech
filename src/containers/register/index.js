import React from 'react';
import { push } from 'react-router-redux';
import { withRouter, NavLink } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Register extends React.Component{
    constructor(props){
        super(props);

        this.state={
            user:{
                firstName: "",
                lastName: "",
                email: "",
                pass: "",
            },
            submitted: false

            // isEmailValid: true,
            // isPassValid: true,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleEmail(value){
    //     let {user} = this.state;
    //
    //     user.email = value;
    //
    //     this.setState({user});
    // }
    //
    // handlePassword(value){
    //     let {user} = this.state;
    //
    //     user.pass = value;
    //
    //     this.setState({user});
    // }
    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    render(){
        const { registering  } = this.props;
        const { user, submitted } = this.state;

        return(
        <Col md="6">
            <Card className="mx-4">
                <CardBody className="p-4">
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="icon-user"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" />
                        <input type="text" className="form-control" name="firstName" placeholder="First Name" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName &&
                        <div className="help-block">First Name is required</div>
                        }
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="icon-lock"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" />
                    </InputGroup>
                    <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="icon-lock"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Repeat password" />
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                </CardBody>
                {/*<CardFooter className="p-4">*/}
                    {/*<Row>*/}
                        {/*<Col xs="12" sm="6">*/}
                            {/*<Button className="btn-facebook" block><span>facebook</span></Button>*/}
                        {/*</Col>*/}
                        {/*<Col xs="12" sm="6">*/}
                            {/*<Button className="btn-twitter" block><span>twitter</span></Button>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*</CardFooter>*/}
            </Card>
        </Col>
        )
    }

}

// function mapStateToProps(state) {
//     const { registering } = state.registration;
//     return {
//         registering
//     };
// }

// const connectedRegister = connect(mapStateToProps)(Register);
// export { connectedRegister as Register };

const mapStateToProps = state => ({
    // isLoading: state.user.is_loading,
    // isLoginFail: state.user.login_fail,
    // userData: state.user.user_data,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    // userLogin
  }, dispatch)
  
export default withRouter(connect(
    // mapStateToProps, 
    // mapDispatchToProps
)(Register))