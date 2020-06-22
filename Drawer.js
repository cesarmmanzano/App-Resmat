//Importação das bibliotecas
import React from 'react';
import { Image, StyleSheet, BackHandler, Alert, } from 'react-native';
import { Block, Text, Button, } from 'expo-ui-kit';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { createStackNavigator, } from '@react-navigation/stack';
import { Feather, AntDesign, } from '@expo/vector-icons';
import { LinearGradient, } from 'expo-linear-gradient';
import Animated from "react-native-reanimated"

//Modal para n esquecer

//Importação das telas
import Home from './screens/Home';
import CarregamentoUFE from './screens/CarregamentoUFE';
import CarregamentoVFE from './screens/CarregamentoVFE';
import Info from './screens/Info';

//Contantes responsaveis por receber algum recurso
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Screens = ({ navigation, style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: null,
          headerLeft: () => (
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={20} color="black" style={{ paddingHorizontal: 10 }} />
            </Button>
          ),
        }}>

        <Stack.Screen name="Home">{props => <Home {...props} />}</Stack.Screen>
        <Stack.Screen name="Uma força externa">{props => <CarregamentoUFE {...props} />}</Stack.Screen>
        <Stack.Screen name="Varias forças externas">{props => <CarregamentoVFE {...props} />}</Stack.Screen>
        <Stack.Screen name="Devs">{props => <Info {...props} />}</Stack.Screen>

      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerContent = props => {
  return (
    <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
      <Block>
        <Block flex={0.4} margin={20} bottom>
          <Image source={require('./assets/Carregamento_axial.png')}
            resizeMode="center"
            style={{
              borderRadius: 80,
              height: 100,
              width: 100
            }}
          />
          <Text black title>
            App Resmat
                </Text>
          <Text black size={9}>
            Carregamento axial
                </Text>
        </Block>
        <Block>

          <DrawerItem
            label="Início"
            labelStyle={{ color: 'black', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate('Home')}
            icon={() => <AntDesign name="home" color="black" size={16} />}
          />

          <DrawerItem
            label="Calculo 1"
            labelStyle={{ color: 'black', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate('Uma força externa')}
            icon={() => <AntDesign name="calculator" color="black" size={16} />}
          />

          <DrawerItem
            label="Calculo 2"
            labelStyle={{ color: 'black', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate('Varias forças externas')}
            icon={() => <AntDesign name="calculator" color="black" size={16} />}
          />

          <DrawerItem
            label="Devs"
            labelStyle={{ color: 'black', marginLeft: -16 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate('Devs')}
            icon={() => <AntDesign name="infocirlceo" color="black" size={16} />}
          />

        </Block>
      </Block>

      <Block flex={false}>
        <DrawerItem
          label="Sair"
          labelStyle={{ color: 'white' }}
          icon={() => <AntDesign name="logout" color="white" size={16} />}
          onPress={
            () => Alert.alert(
              '',
              'Sair do App?',
              [
                { text: 'No', onPress: () => console.log(''), style: 'cancel' },
                { text: 'Yes', onPress: () => BackHandler.exitApp() },
              ],
            )
          }
        />
      </Block>
    </DrawerContentScrollView>
  );
};

export default () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#FFFFFF', '#00008B']}>
      <Drawer.Navigator
        // hideStatusBar
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={props => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen name="Screens">
          {props => <Screens {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,

  },
  drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'white', marginLeft: -16 },
});