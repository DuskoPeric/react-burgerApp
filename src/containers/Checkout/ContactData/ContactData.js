import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders.js";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";

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
          required: true
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
          minLenght: 3
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
    isFormValid: false,
    loading: false
  };

  componentDidMount() {
    console.log("mount");
  }
  componentDidUpdate() {
    console.log(this.state.isFormValid);
    console.log("update");
  }
  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const orderDetail = {};
    for (let item in this.state.orderForm) {
      orderDetail[item] = this.state.orderForm[item].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.costs,
      orderDetail: orderDetail
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() != "" && isValid;
    }

    if (rules.minLenght) {
      isValid = value.length >= rules.minLenght && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, id) => {
    const orderFormCopy = { ...this.state.orderForm };
    orderFormCopy[id].value = event.target.value;
    orderFormCopy[id].touched = true;
    orderFormCopy[id].valid = this.checkValidity(
      orderFormCopy[id].value,
      orderFormCopy[id].validation
    );
    let isValidForm = true;
    for (let item in orderFormCopy) {
      //console.log(item + ": " + orderFormCopy[item].valid + " " + isValidForm);
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
    console.log(inputArr);
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
    let form = (
      <form onSubmit={this.orderHandler}>
        {formtoShow}

        <Button btnType="Success" disabled={!this.state.isFormValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.costs
  };
};

export default connect(mapStateToProps)(ContactData);
