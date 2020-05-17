import React, { useCallback, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import DefaultText from "../components/DefaultText";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";
import { toggleFavorite } from "../store/action/meals";

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam("mealId");
  const currentMealIsFavorite = useSelector(state =>
    state.meal.favMeals.some(meal => meal.id === mealId)
  );

  const mealDetail = useSelector(state => state.meal.meals);

  const selectedMeal = mealDetail.find(meal => meal.id === mealId);
  const dispatch = useDispatch();

  const togglefavHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [dispatch, mealId]);
  useEffect(() => {
    // props.navigation.setParams({mealTitle:selectedMeal.title})
    props.navigation.setParams({ toggleFav: togglefavHandler });
  }, [togglefavHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);
  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration}m</DefaultText>
        <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.ingredient}>Ingredients</Text>
      {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.ingredient}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  // const mealId = navigationData.navigation.getParam("mealId");

  const mealTitle = navigationData.navigation.getParam("mealTitle");

  const toggleFav = navigationData.navigation.getParam("toggleFav");
  const isFavorite = navigationData.navigation.getParam("isFav");
  console.log(isFavorite);
  // const selectedMeal = MEALS.find(meal => meal.id === mealId);
  return {
    headerTitle: mealTitle,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFav}
        />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: "white"
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  ingredient: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center"
  },
  image: {
    width: "100%",
    height: 200
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around"
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10
  }
});

export default MealDetailScreen;
