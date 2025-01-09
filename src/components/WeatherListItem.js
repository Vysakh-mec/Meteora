import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CloudIcon from "../../assets/icons/Cloudy.svg"
import Color from '../constant/Color'
import RainFallIcon from "../../assets/icons/Rain.svg"
import WindIcon from "../../assets/icons/Wind.svg"
import HumidityIcon from "../../assets/icons/Humidity.svg"
import { IconMap } from '../hooks/IconMap'


const WeatherListItem = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(item.datetime)
    const day = daysOfWeek[date.getDay()]
    console.log(item.icon)
    const IconComponent = IconMap[item.icon]

    return (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} activeOpacity={0.7} style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.labelText}>{day}</Text>
                <View style={styles.miniContainer}>
                    <Text style={styles.tempText}>{item.temp}°</Text>
                    {
                        IconComponent ?
                            <IconComponent height={50} width={50} />
                            :
                            <CloudIcon height={50} width={50} />
                    }
                </View>
            </View>
            {
                isExpanded &&
                <View style={styles.expandContainer}>
                    <View style={styles.iconContainer}>
                        <View style={styles.iconMiniContainer}>
                            <RainFallIcon />
                        </View>
                        <Text style={styles.iconLabel}>{item.precip} cm</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <View style={styles.iconMiniContainer}>

                            <WindIcon />
                        </View>
                        <Text style={styles.iconLabel}>{item.windspeed} km/h</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <View style={styles.iconMiniContainer}>

                            <HumidityIcon />
                        </View>
                        <Text style={styles.iconLabel}>{item.humidity} %</Text>
                    </View>
                </View>
            }
        </TouchableOpacity>
    )
}

export default WeatherListItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(255,255,255,0.15)",
        marginHorizontal: 20,
        marginVertical: 16,
        padding: 20,
        borderRadius: 20
    },
    subContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 1
    },
    labelText: {
        fontSize: 16,
        fontWeight: "600",
        color: Color.primaryText
    },
    miniContainer: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 20
    },
    tempText: {
        fontSize: 16,
        color: Color.primaryText,
        fontWeight: "bold"
    },
    expandContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 1,
        columnGap: 30,
        marginVertical: 20
    },
    iconContainer: {
        alignItems: "center",
        rowGap: 10
    },
    iconLabel: {
        color: Color.primaryText
    },
    iconMiniContainer: {
        backgroundColor: Color.background,
        padding: 5,
        borderRadius: 20
    }
})