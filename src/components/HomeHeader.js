import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SearchIcon from "../../assets/icons/SearchIcon.svg"
import LocationIcon from "../../assets/icons/LocationIcon.svg"
import MeteoraIcon from "../../assets/icons/Meteora.svg"
import LeftArrowIcon from "../../assets/icons/LeftArrow.svg"
import Color from '../constant/Color'

const HomeHeader = ({  handleUseLocation,searchTerm, handleTextChange ,handleLocation }) => {

  const [inputVisible, setInputVisible] = useState(false)
  const [location , setLocation ] = useState(searchTerm)

  const handleSubmit = () => {
    handleUseLocation(false)
    handleTextChange(location)
  }

  return (
    <View style={styles.container}>
      {
        inputVisible ?
          <>
          <TouchableOpacity onPress={() => {
            setInputVisible(false)
            handleTextChange("")
          }}>
            <LeftArrowIcon />
          </TouchableOpacity>
            <TextInput onSubmitEditing={() => handleSubmit()} value={location} onChangeText={(text) => setLocation(text)} placeholder='Choose a Location' style={styles.input} placeholderTextColor={Color.secondaryText} />
          </>
          :
          <>
          <TouchableOpacity onPress={() => handleLocation()}>
            <LocationIcon height={24} width={24} />
          </TouchableOpacity>
            <MeteoraIcon />
          </>
      }
      <TouchableOpacity onPress={() => inputVisible ? handleSubmit() : setInputVisible(true)}>
        <SearchIcon />
      </TouchableOpacity>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  input: {
    flexGrow: 1,
    marginHorizontal: 5,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: Color.primaryText
  }
})