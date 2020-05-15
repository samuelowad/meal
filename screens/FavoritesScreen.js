import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MealList from "../components/MealList";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const FavoritesScreen = props => {
  const favMeals = MEALS.filter(meal => meal.id === "m1" || meal.id === "m2");
  return <MealList listData={favMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Fav Meal",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="menu"
          iconName="ios-menu"
          iconSize={25}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default FavoritesScreen;
