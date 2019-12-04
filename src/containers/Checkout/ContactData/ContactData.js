import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as OrderActions from "../../../store/actions/";
import { checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 3
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "cheapest", displayValue: "Cheapest" },
            { value: "fastest", displayValue: "Fastest" }
          ]
        },
        value: "fastest",
        validation: {},
        valid: true
      }
    },
    isFormValid: false
  };

  componentDidMount() {}
  componentDidUpdate() {}
  orderHandler = event => {
    this.props.onStartLoader();
    event.preventDefault();
    const orderDetail = {};
    for (let item in this.state.orderForm) {
      orderDetail[item] = this.state.orderForm[item].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderDetail: orderDetail,
      userId: this.props.userId
    };
    this.props.onSubmitedForm(order, this.props.token);
  };

  inputChangedHandler = (event, id) => {
    const orderFormCopy = { ...this.state.orderForm };
    orderFormCopy[id].value = event.target.value;
    orderFormCopy[id].touched = true;
    orderFormCopy[id].valid = checkValidity(
      orderFormCopy[id].value,
      orderFormCopy[id].validation
    );
    let isValidForm = true;
    for (let item in orderFormCopy) {
      isValidForm = orderFormCopy[item].valid && isValidForm;
    }
    this.setState({ orderForm: orderFormCopy, isFormValid: isValidForm });
  };

  render() {
    const inputArr = [];
    for (let key in this.state.orderForm) {
      inputArr.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    const formtoShow = inputArr.map(item => {
      return (
        <Input
          key={item.id}
          elementType={item.config.elementType}
          elementConfig={item.config.elementConfig}
          value={item.config.value}
          invalid={!item.config.valid}
          shouldValid={item.config.validation}
          changed={event => this.inputChangedHandler(event, item.id)}
          touched={item.config.touched}
        />
      );
    });
    let redirect = null;
    if (this.props.isRedirect) {
      redirect = <Redirect to="/" />;
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formtoShow}

        <Button btnType="Success" disabled={!this.state.isFormValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        {redirect}
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.costs,
    loading: state.order.loading,
    isRedirect: state.order.redirect,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitedForm: (order, token) => {
      return dispatch(OrderActions.purchaseBurgerOrder(order, token));
    },
    onEndLoader: () => {
      dispatch(OrderActions.purchaseBurgerEnd());
    },
    onStartLoader: () => {
      dispatch(OrderActions.purchaseBurgerStart());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactData);
