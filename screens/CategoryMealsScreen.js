import React from 'react'
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import { CATEGORIES, MEALS } from '../data/dummy-data'
import Colors from '../constants/Colors'
import MealItems from '../components/MealItems'
import MealList from '../components/MealList'

let selected
const CategoryMealScreen = props => {

  const catId = props.navigation.getParam('categoryId');

  const displayedMeals = MEALS.filter(meal => meal.categoryIds.indexOf(catId) >= 0)
  return <MealList listData={displayedMeals} navigation={props.navigation} />
}

// CategoryMealScreen.navigationOptions = {
//   headerTitle: selected,
//   headerStyle: {
//     backgroundColor: Colors.primaryColor
//   },
//   headerTintColor: 'white'
// };

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId')
  const selectedItem = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: selectedItem.title,
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: 'white'
  };
}



const styles = StyleSheet.create({

})

export default CategoryMealScreen
