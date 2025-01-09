import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CloudIcon from "../../assets/icons/Cloudy.svg"
import Color from '../constant/Color'
import { IconMap } from '../hooks/IconMap'

const RoundedWeatherItem = ({item}) => {
  
  const IconComponent = IconMap[item.icon]
  
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{item.datetime.slice(0,5)}</Text>

      {
        IconComponent ? 
        <IconComponent height={50} width={70} />
        :
      <CloudIcon height={50} width={70} />
      }
      <Text style={styles.tempText}>{item.temp}°</Text>
    </View>
  )
}

export default RoundedWeatherItem

const styles = StyleSheet.create({
    container:{
        backgroundColor:"rgba(255,255,255,0.2)",
        marginHorizontal:10,
        alignItems:"center",
        borderRadius:999,
        paddingVertical:16
    },
    labelText:{
        fontSize:12,
        color:Color.primaryText
    },
    tempText:{
        color:Color.primaryText,
        fontWeight:"600"
    }
})