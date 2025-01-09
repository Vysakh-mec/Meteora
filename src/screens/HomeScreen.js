import { ActivityIndicator, Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeHeader from '../components/HomeHeader'
import RainCloud from "../../assets/icons/RainCloud.svg"
import RainFallIcon from "../../assets/icons/Rain.svg"
import WindIcon from "../../assets/icons/Wind.svg"
import HumidityIcon from "../../assets/icons/Humidity.svg"
import Color from '../constant/Color'
import RoundedWeatherItem from '../components/RoundedWeatherItem'
import { useNavigation } from '@react-navigation/native'
import { IconMap } from '../hooks/IconMap'
import * as Location from "expo-location"

const HomeScreen = () => {

  const [selectedDate, setSelectedDate] = useState("today")
  const [weatherData, setWeatherData] = useState([])
  const [todayWeatherData, setTodayWeatherData] = useState({})
  const [todayDate, setTodayDate] = useState()
  const [searchTerm, setSearchTerm] = useState("")
  const [location , setLocation] = useState(null)
  const [useLocation , setUseLocation ] = useState(false)
  const [loading, setLoading] = useState(false)

  const naviagtion = useNavigation()
  const API_KEY = process.env.EXPO_PUBLIC_API_KEY

  const IconComponent = IconMap[todayWeatherData.icon]

  useEffect(() => {

    const fetchWeatherData = (searchTerm) => {
      setLoading(true)
      const query = searchTerm.length ? searchTerm : "newyork"
      fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=metric&include=days,hours&key=${API_KEY}`)
        .then((response) => response.json()).then(data => {
          setWeatherData(data)
          setTodayWeatherData(data.days[0])
          const date = new Date(data.days[0].datetime)
          const options = { weekday: 'short', month: 'short', day: 'numeric' };
          const formattedDate = date.toLocaleDateString('en-US', options);
          setTodayDate(formattedDate)
          setLoading(false)
        }).catch(error => {
          Alert.alert("Something went wrong!", error.message)
          setLoading(false)
        })
    }

    if (location && useLocation) {
      const locationQuery  = `${location.coords.latitude},${location.coords.longitude}`
      console.log(locationQuery)
      fetchWeatherData(locationQuery)
    }else {
      fetchWeatherData(searchTerm)
    }


  }, [searchTerm , location , useLocation])

  const getCurrentLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync()

    if (status !== "granted") {
      Alert.alert('Permission denied', 'We need location permission to fetch weather data.')
      return
    } 
    
    let currentLocation = await Location.getCurrentPositionAsync({})
    setLocation(currentLocation)
    setUseLocation(true)
    
  }



  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader handleUseLocation={setUseLocation} handleTextChange={setSearchTerm} searchTerm={searchTerm} handleLocation={getCurrentLocation} />
      {
        loading ?
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <ActivityIndicator color={Color.primaryText} size={50} />
          </View>
          :
          <ScrollView>


            <View style={styles.bodyContainer}>
              <Text style={styles.headerText}>{weatherData.resolvedAddress}</Text>
              <Text style={styles.secondaryText}>{todayDate}</Text>
              <View style={styles.imageContainer}>
                {
                  IconComponent ?
                    <IconComponent height={150} width={150} />
                    :
                    <RainCloud height={150} width={150} />
                }
                <View style={styles.tempContainer}>
                  <View style={styles.tempRow}>
                    <Text style={styles.tempText}>{todayWeatherData.temp}
                    </Text>
                    <Text style={styles.degreeText}>°C</Text>
                  </View>
                  <Text style={styles.weatherText}>{todayWeatherData.conditions}</Text>
                </View>
              </View>

              <WeatherItem icon={<RainFallIcon />} title={"RainFall"} detail={todayWeatherData.precip / 10 + " cm"} />
              <WeatherItem icon={<WindIcon />} title={"Wind"} detail={todayWeatherData.windspeed + " km/h"} />
              <WeatherItem icon={<HumidityIcon />} title={"Humidity"} detail={todayWeatherData.humidity + " %"} />
            </View>
            <View style={styles.bodyContainer}>
              <View style={styles.menuContainer}>
                <View style={{ flexDirection: "row", alignItems: "center", columnGap: 20 }}>
                  <Text onPress={() => setSelectedDate("today")} style={[styles.menuText, selectedDate == "today" ? styles.menuTextActive : null]}>Today</Text>
                  <Text onPress={() => setSelectedDate("tomorrow")} style={[styles.menuText, selectedDate == "tomorrow" ? styles.menuTextActive : null]}>Tomorrow</Text>
                </View>
                <Text onPress={() => naviagtion.navigate("more", weatherData.days.slice(0, 7))} style={styles.menuText}>Next 7 Days</Text>
              </View>
            </View>
            <FlatList horizontal data={selectedDate == "today" ? todayWeatherData.hours : weatherData.days[1].hours} renderItem={({ item }) => <RoundedWeatherItem item={item} />} keyExtractor={(item, index) => index.toString()} />
          </ScrollView>
      }
    </SafeAreaView>
  )
}

const WeatherItem = ({ icon, title, detail }) => {
  return (
    <View style={weatherStyles.container}>
      {/* {icon} */}

      <View style={weatherStyles.subContainer}>
        <View style={weatherStyles.iconContainer}>
          {icon}
        </View>
        <Text style={weatherStyles.text}>{title}</Text>
      </View>
      <Text style={weatherStyles.text}>{detail}</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.background,
    flex: 1,
  },
  headerText: {
    color: Color.primaryText,
    fontSize: 36,
    fontWeight: "400"
  },
  bodyContainer: {
    padding: 20
  },
  secondaryText: {
    color: Color.secondaryText,
    fontSize: 16,
    marginVertical: 10
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 20,
    marginVertical: 20
  },
  tempText: {
    color: Color.primaryText,
    fontSize: 50
  },
  degreeText: {
    fontWeight: "400",
    color: Color.primaryText,
    fontSize: 15
  },
  tempRow: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  weatherText: {
    fontSize: 28,
    color: Color.primaryText,
    fontWeight: "300"
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "white"
  },
  menuText: {
    color: Color.secondaryText,
    paddingBottom: 20,
  },
  menuTextActive: {
    borderBottomWidth: 3,
    borderColor: "white",
    color: Color.primaryText
  }
})

const weatherStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.12)', // Semi-transparent background
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    marginVertical: 10
  },
  iconContainer: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 2
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20
  },
  text: {
    color: Color.primaryText
  }
})