import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const tutorInfo = {
    img: require("../../assets/img/Anya.jpg"),
    name: "Anya",
    subject: "Math",
    cost: 200,
    rating: 4.5,
}

const ReviewCard = () => {
    return (
        <View>
            <View style={{flexDirection: "column"}}>
                <View style={[styles.textSpace , {paddingTop: 20}]}>
                    <Image style={styles.reviewImg} source={tutorInfo.img}></Image>
                </View>
                <View style={styles.textSpace}>
                    <Text style={{paddingLeft: 20, paddingBottom: 10}}>{tutorInfo.name}</Text>
                </View>
            </View>
            <View style={[styles.textSpace, {flexDirection: "column", gap: 10}]}>
                <Text>ความคุ้มค่า 5/10</Text>
                <Text>เนื้อหาที่สอน 7/10</Text>
                <Text>เทคนิคในการสอน 5/10</Text>
            </View>
            <View style={{width: "80%", paddingTop: 10, paddingBottom: 10, flexDirection: "row", flexWrap: "wrap"}}>
            <Text style={styles.textSpace}>อาจารย์แบบว่า Lorem ipsum dolor sit amet consectetur.</Text>
            </View>
            <View style={styles.reviewBorder}>
            </View>
        </View>
    )
}

export default ReviewCard

const styles = StyleSheet.create({
    img: {
        width: 150,
        height: 150,
        borderRadius: 90,
    },
    reviewImg: {
        width: 70,
        height: 70,
        borderRadius: 90
    },
    imgPosition: {
        alignItems: "center",
        paddingVertical: 40
    },
    rating: {
        width: 70,
        height: 30,
        marginTop: 10,
        backgroundColor: "#000",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#000",
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        fontWeight: "800",
        fontSize: 18,
    },
    textSpace: {
        paddingLeft: 30
    },
    contactPosition: {
        paddingLeft: 30,
        marginTop: 5,
        gap: 10,
        flexDirection: "row",
    },
    iconImg: {
        width: 30,
        height: 30
    },
    button: {
        width: "40%",
        justifyContent: "center",
        padding: 10,
        marginRight: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "black"
    },
    infoSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 20,
        marginRight: 20
    },
    reviewBorder: {
        width: "80%", 
        marginLeft: 20, 
        marginRight: 30,
        marginBottom: 20, 
        borderBottomWidth: 2, 
        borderBlockColor: "black"
    }

})