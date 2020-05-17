import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import MealList from "../components/MealList";
import Colors from "../constants/Colors";
import { CATEGORIES } from "../data/dummy-data";

let selected;
const CategoryMealScreen = props => {
  const catId = props.navigation.getParam("categoryId");

  const availableMeals = useSelector(state => state.meal.filteredMeals);

  const displayedMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  );
  if (displayedMeals.length === 0) {
    return (
      <View style={styles.no}>
        <Text>No Meals</Text>
      </View>
    );
  }
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

const styles = StyleSheet.create({
  no: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CategoryMealScreen;
