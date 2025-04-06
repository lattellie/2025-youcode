// app/pages/MainPage.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';

type Props = {
    navigation: any;
};

const MainPage: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Going{'\n'}Outside{'\n'}Today{'\n'}?</Text>
            {/* <Button
        title="Explore"
        onPress={() => navigation.navigate('Feed')}
      /> */}
            <View style={styles.buttonColumn}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Camera')}>
                    <Text style={styles.buttonText}>Yes!{'\n'}Click here to take a picture and upload</Text>
                    <Image source={require('../../assets/cameraScaledDown.png')} style={styles.icon} />
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
        backgroundColor: '#FFFFFF',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#262627',
        fontSize: 30,
        fontWeight:'bold',
        marginRight: 20,
        maxWidth: '30%',
        lineHeight: 40,
    },
    buttonColumn: {
        flexDirection: 'column',
        gap: 100, 
    },
    button: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 23,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: -4, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 1,
        width: 216,
        height: 224,
    },
    icon: {
        alignSelf: 'center',
        width: 100,
        height: 100,
    },
    buttonText: {
        color: '#171717',
        fontSize: 20,
        fontWeight: '600',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
});

export default MainPage;
