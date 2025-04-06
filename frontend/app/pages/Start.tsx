// app/pages/Page2.tsx
import React from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type Props = {
    navigation: any;
};

const Start: React.FC<Props> = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../../assets/background.png')} // 👈 your background image
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>

                <Image
                    source={require('../../assets/mainIconScaledDown.png')}
                    style={styles.logo}
                />


                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#1F1F1F',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 6,
        marginVertical: 20,
        width: 250,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    logo: {
        width: 250,
        height: 270,
        marginBottom: 30,
    },

});

export default Start;
