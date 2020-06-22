import React from 'react';
import { Block, Text } from 'expo-ui-kit';
import { Image } from 'react-native';

const Home = () => {
    return (
        <Block center middle color = "#E6E6FA">
            <Block center middle margin={250} top>
                <Image source={require('../assets/Carregamento_axial.png')}
                resizeMode="center"
                style={{ 
                    borderRadius: 100,
                    height: 150,
                    width: 150
                }}
                />
               
            </Block>
            
        </Block>
    );
};

export default Home;