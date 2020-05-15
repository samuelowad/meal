import React from 'react'
import { FlatList, StyleSheet, View, Button } from 'react-native'
import MealItems from '../components/MealItems'


const MealList = props => {
    const render = itemData => {
        return (<MealItems title={itemData.item.title} duration={itemData.item.duration} image={itemData.item.imageUrl} complexity={itemData.item.complexity} affordability={itemData.item.affordability} onSelectMeal={() => {
            props.navigation.navigate({
                routeName: 'MealDetail', params: {
                    mealId: itemData.item.id
                }
            })
        }} />)
    }

    return (<View style={styles.screen}>
        <FlatList data={props.listData} keyExtractor={(item, index) => item.id} renderItem={render} style={{ width: '100%' }} />
        <Button title='Back' onPress={() => {
            props.navigation.pop()
        }} />
    </View>)
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MealList