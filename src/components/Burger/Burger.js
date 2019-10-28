import React, { Component } from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

class Burger extends Component {
  render() {
    let ingredients = [];

    // My way
    var convertIngredients = () => {
      let empty = true;
      for (var key in this.props.ingredients) {
        if (this.props.ingredients.hasOwnProperty(key)) {
          if (this.props.ingredients[key] > 0) {
            empty = false;
          }
          for (let i = 0; i < this.props.ingredients[key]; i++) {
            ingredients.push(<BurgerIngredient type={key} key={key + i} />);
          }
        }
      }
      if (empty) {
        ingredients = <p>Please start adding ingredients!</p>;
      }
    };
    convertIngredients();
    // ingredients = ingredients.map(item => {
    //   return [...Array(this.props.ingredients[item])].map((_, i) => {
    //     return <BurgerIngredient type={item} key={item + i} />;
    //   });
    // });
    return (
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {ingredients}
        <BurgerIngredient type="bread-bottom" />
      </div>
    );
  }
}

export default Burger;
