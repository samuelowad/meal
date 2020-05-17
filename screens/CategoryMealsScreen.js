import React from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import Colors from "../constants/Colors";
import MealItems from "../components/MealItems";
import MealList from "../components/MealList";
import { useSelector } from "react-redux";

let selected;
const CategoryMealScreen = props => {
  const catId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector(state => state.meal.filteredMeals);

  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );
  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

// CategoryMealScreen.navigationOptions = {
//   headerTitle: selected,
//   headerStyle: {
//     backgroundColor: Colors.primaryColor
//   },
//   headerTintColor: 'white'
// };

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedItem = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: selectedItem.title,
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: "white"
  };
};

const styles = StyleSheet.create({});

export default CategoryMealScreen;
