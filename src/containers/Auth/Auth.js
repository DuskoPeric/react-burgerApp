import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import { checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  inputChangedHandler = (event, id) => {
    const orderFormCopy = { ...this.state.controls };
    orderFormCopy[id].value = event.target.value;
    orderFormCopy[id].touched = true;
    orderFormCopy[id].valid = checkValidity(
      orderFormCopy[id].value,
      orderFormCopy[id].validation
    );
    // let isValidForm = true;
    // for (let item in orderFormCopy) {
    //   isValidForm = orderFormCopy[item].valid && isValidForm;
    // }
    //this.setState({ controls: orderFormCopy, isFormValid: isValidForm });
    this.setState({ controls: orderFormCopy });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const inputArr = [];
    for (let key in this.state.controls) {
      inputArr.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    let form = inputArr.map(element => (
      <Input
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        invalid={!element.config.valid}
        shouldValid={element.config.validation}
        changed={event => this.inputChangedHandler(event, element.id)}
        touched={element.config.touched}
      />
    ));
    if (this.props.loading) {
      form = <Spinner />;
    }
    let errormsg = this.props.error ? <p>{this.props.error}</p> : null;
    let isAuth = null;
    if (this.props.isAuth) {
      isAuth = <Redirect to="/" />;
    }
    return (
      <div className={classes.Auth}>
        {isAuth}
        {errormsg}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">
            {this.state.isSignup ? "SIGN IN" : "SIGN UP"}
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.switchHandler}>
          SWITCH TO {this.state.isSignup ? "SIGN UP" : "SIGN IN"}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
