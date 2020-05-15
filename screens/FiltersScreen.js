import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/Colors";

const FilterSwitch = props => {
  return (
    <View style={styles.container}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primaryColor }}
        thumbColor={Colors.primaryColor}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = props => {
  //distructing
  const { navigation } = props;
  //state
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsvegetarian] = useState(false);

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    };
    console.log(appliedFilters);
  }, [isVegetarian, isGlutenFree, isLactoseFree, isVegan]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>The Filters Screen!</Text>
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={newValue => setIsGlutenFree(newValue)}
      />
      <FilterSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={newValue => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={newValue => setIsVegan(newValue)}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={newValue => setIsvegetarian(newValue)}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Filtered Meals",
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
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="save"
          iconName="ios-save"
          iconSize={25}
          onPress={navData.navigation.getParam("save")}
        />
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: Colors.primaryColor
    }
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15
  },
  title: {
    fontSize: 22,
    fontFamily: "open-sans-bold",
    margin: 20,
    textAlign: "center"
  }
});

export default FiltersScreen;
