import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Color from '../constant/Color'
import WeatherListItem from '../components/WeatherListItem'
import { useRoute } from '@react-navigation/native'

const MoreScreen = () => {

  const route = useRoute()
  const weatherData = route.params

  return (
    <SafeAreaView style={styles.container}>

      <FlatList data={weatherData} renderItem={({item}) => <WeatherListItem item={item} />} keyExtractor={(item , index) => index.toString()} />
      
      {/* <ScrollView>
        <WeatherListItem />
        <WeatherListItem />
        <WeatherListItem />
        <WeatherListItem />
        <WeatherListItem />
        <WeatherListItem />
      </ScrollView> */}
    </SafeAreaView>
  )
}

export default MoreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background
  }
})