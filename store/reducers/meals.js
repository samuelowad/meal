import { MEALS } from "../../data/dummy-data";
import { SET_FILTERS, TOGGLE_FAVORITE } from "../action/meals";

const initState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favMeals: []
};

const mealsReducer = (state = initState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const existingIndex = state.favMeals.findIndex(
        meal => meal.id === action.mealId
      );
      if (existingIndex >= 0) {
        const updatedFav = [...state.favMeals];
        updatedFav.splice(existingIndex, 1);
        return { ...state, favMeals: updatedFav };
      } else {
        const meal = state.meals.find(meal => meal.id === action.mealId);
        return { ...state, favMeals: state.favMeals.concat(meal) };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const updatedFilteredMeals = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false;
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false;
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false;
        }
        if (appliedFilters.vegetarian && !meal.isVegetarin) {
          return false;
        }
        return true;
      });
      return { ...state, filteredMeals: updatedFilteredMeals };
    default:
      return state;
  }
};

export default mealsReducer;
