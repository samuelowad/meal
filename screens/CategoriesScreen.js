import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableNativeFeedback, Platform, TouchableOpacity } from 'react-native';


import Colors from '../constants/Colors'
import { CATEGORIES } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'




const CategoriesScreen = props => {
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const renderGridItem = (itemData) => {
    return (
      <View style={styles.grid}>
        <TouchableCmp onPress={() => {
          props.navigation.navigate({
            routeName: 'CategoryMeals', params: {
              categoryId: itemData.item.id
            }
          })
        }} style={{ flex: 1 }}>
          <View style={{ ...styles.container, ...{ backgroundColor: itemData.item.color } }}>
            <Text style={styles.title} numberOfLines={2} >{itemData.item.title}</Text>
          </View>
        </TouchableCmp>
      </View>
    )
  }

  return (
    <FlatList keyExtractor={(item, index) => item.id} data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
};

CategoriesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="menu" iconName="ios-menu" iconSize={25} onPress={() => {
          navData.navigation.toggleDrawer()
        }} />
      </HeaderButtons>
    )
  }
};



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  grid: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 15,
    textAlign: "right"
  }
});

export default CategoriesScreen;
