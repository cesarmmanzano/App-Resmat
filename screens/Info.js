import React from 'react';
import { Block, Text } from 'expo-ui-kit';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem  } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { Linking } from "react-native";

const Devs = () => {
    return (
       <Block>

            <Block
                color='#E6E6FA'
                style = {{
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text>Desenvolvedores</Text>
                <Text></Text>
                
                <DrawerItem
                    label="Cesar Marrote Manzano"
                    labelStyle={{ color: 'black', marginLeft: -16 }}
                    style={{ alignItems: 'center', marginVertical: 0 }}
                    onPress={() => Linking.openURL("https://github.com/cesarmmanzano")}
                    icon={() => <AntDesign name="github" color="black" size={20} />}
                />

                <DrawerItem
                    label="Fabricio Silva Cardoso"
                    labelStyle={{ color: 'black', marginLeft: -16 }}
                    style={{ alignItems: 'center', marginVertical: 0 }}
                    onPress={() => Linking.openURL("https://github.com/Unknowgamer1")}
                    icon={() => <AntDesign name="github" color="black" size={20} />}
                />

                <DrawerItem
                    label="Luis Marcelo Stein Davila"
                    labelStyle={{ color: 'black', marginLeft: -16 }}
                    style={{ alignItems: 'center', marginVertical: 0 }}
                    onPress={() => Linking.openURL("https://github.com/Rayden479")}
                    icon={() => <AntDesign name="github" color="black" size={20} />}
                />

                <DrawerItem
                    label="Pedro Ignacio Trevisan"
                    labelStyle={{ color: 'black', marginLeft: -16 }}
                    style={{ alignItems: 'center', marginVertical: 0 }}
                    onPress={() => Linking.openURL("https://github.com/pedro-it-Rep")}
                    icon={() => <AntDesign name="github" color="black" size={20} />}
                />

                <DrawerItem
                    label="Rafael Alves de Oliveira Perroni"
                    labelStyle={{ color: 'black', marginLeft: -16 }}
                    style={{ alignItems: 'center', marginVertical: 0 }}
                    onPress={() => Linking.openURL("https://github.com/rafa-perroni00")}
                    icon={() => <AntDesign name="github" color="black" size={20} />}
                />
                
            </Block>
        </Block>
    );
};

export default Devs;