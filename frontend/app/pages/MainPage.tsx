// app/pages/MainPage.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');

type Props = {
    navigation: any;
};

const MainPage: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Going Outside Today?</Text>
            
            <View style={styles.buttonColumn}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
                    <Text style={styles.buttonText}>Yes!{'\n'}Click here to take a picture and upload</Text>
                    <Image source={require('../../assets/cameraScaledDown.png')} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
                    <Text style={styles.buttonText}>I want to check out my profile!</Text>
                    <Image source={require('../../assets/profile.png')} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Feed')}>
                    <Text style={styles.buttonText}>I’ll browse my feed for now!</Text>
                    <Image source={require('../../assets/galleryScaledDown.png')} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#b4b4b4',
        flex: 1,
        width: width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#262627',
        marginBottom: 30,
        fontSize: 30,
        fontWeight:'bold',
        marginRight: 20,
        lineHeight: 40,
    },
    buttonColumn: {
        flexDirection: 'column',
        gap: 10, 
    },
    button: {
        flexDirection:'row',
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 23,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: -4, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 1,
    },
    icon: {
        alignSelf: 'center',
        width: 100,
        height: 100,
    },
    buttonText: {
        color: '#171717',
        width: '60%',
        fontSize: 20,
        fontWeight: '600',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
});

export default MainPage;
