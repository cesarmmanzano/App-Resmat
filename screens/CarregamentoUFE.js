import React, { useState } from 'react';
import { Block, Text, Button } from 'expo-ui-kit';
import { Image, 
        TextInput, 
        StyleSheet, 
        Picker, 
        TouchableWithoutFeedback, 
        Keyboard,
        ActionSheetIOS, 
        View, 
        Platform, 
        TouchableOpacity,
        KeyboardAvoidingView, 
    } from 'react-native';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const round = (num, places) => {
    return +(parseFloat(num).toFixed(places));
}

const styles = StyleSheet.create({

    pickerInput: {

        padding: 8,
        margin: 20,
        width: 100,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2
    },

    iosInput: {

        padding: 5,
        margin: 20,
        width: 100,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2

    },

    buttonStyle: {

        display: 'flex',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#F194FF',
        elevation: 2,
    },

    text: {
        fontSize: 16,
        color: '#FFFFFF',
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 8,
        margin: 20,
        width: 100,
        backgroundColor: 'white',
    },
});

const CarregamentoUFE = () => {

    function tensaoAxial(){
        if(parseFloat(area) == 0){
            return 0;
        }else{
            return round((parseFloat(forca) / parseFloat(area)), 5);
        }
    }

    function deformacao(){
        if((parseFloat(area) * parseFloat(material)) == 0){
            return 0;
        }else{
            return round((((parseFloat(forca) * parseFloat(tamanho)) / (parseFloat(area) * parseFloat(material))) * 1000000000), 5);
        }
    }

    const [forca, setForca] = useState(0)
    const [tamanho, setTamanho] = useState(0)
    const [area, setArea] = useState(0)
    const [material, setMaterial] = useState(0)

    const ForIOS = () =>
        ActionSheetIOS.showActionSheetWithOptions({
            options: ["Cancel", "Aço (200GPa)", "Alumínio (70GPa)", "Cobre (124GPa)", "Ferro (196GPa)", "Ferro Fundido (170GPa)", "Madeira (13GPa)"],
            cancelButtonIndex: 0
        },
            buttonIndex => {
                if (buttonIndex === 0) {
                    // cancel action
                } else if (buttonIndex === 1) {
                    setMaterial('200000000000'); //Aço
                } else if (buttonIndex === 2) {
                    setMaterial('70000000000'); //Aluminio
                } else if (buttonIndex === 3) {
                    setMaterial('124000000000'); //Cobre
                } else if (buttonIndex === 4) {
                    setMaterial('196000000000'); //Ferro
                } else if (buttonIndex === 5) {
                    setMaterial('170000000000'); //Ferro Fundido
                } else if (buttonIndex === 6) {
                    setMaterial('13000000000'); //Madeira
                }
            }
        );

    return (
        
        
            <DismissKeyboard>
                <Block color='#E6E6FA'>

                    <Block margin={50} Top center middle>
                        <Image source={require('../assets/UFE.png')}
                            style={{
                                borderRadius: 0,
                                height: 150,
                                width: 350
                            }} />

                        {Platform.OS === 'ios' ?
                            <View style={styles.iosInput}>
                                <TouchableOpacity onPress={ForIOS} style={styles.buttonStyle}>
                                    <Text style={styles.text}>Material</Text>
                                </TouchableOpacity>
                            </View> :

                            <Picker
                                style={styles.pickerInput}
                                selectedValue={material}
                                onValueChange={
                                    (val) => setMaterial(val)
                                }
                                mode='dropdown'
                            >
                                <Picker.Item label='Material' value='0' />
                                <Picker.Item label='Aço (200GPa)' value='200000000000' />
                                <Picker.Item label='Alumínio (70GPa)' value='70000000000' />
                                <Picker.Item label='Cobre (124GPa)' value='124000000000' />
                                <Picker.Item label='Ferro (196GPa)' value='196000000000' />
                                <Picker.Item label='Ferro Fundido (170GPa)' value='170000000000' />
                                <Picker.Item label='Madeira (13GPa)' value='13000000000' />

                            </Picker>
                        }


                        <TextInput
                            keyboardType='numeric'
                            style={styles.textInput}
                            placeholder='Força (N)'
                            onChangeText={(val) => setForca(val)}
                        >
                        </TextInput>


                        <TextInput
                            keyboardType='numeric'
                            style={styles.textInput}
                            placeholder='Tamanho (m)'
                            onChangeText={(val) => setTamanho(val)}
                        >
                        </TextInput>

                        <TextInput
                            keyboardType='numeric'
                            style={styles.textInput}
                            placeholder='Area (m²)'
                            onChangeText={(val) => setArea(val)}
                        >
                        </TextInput>

                        <Text center middle>Reação de apoio: {parseFloat(forca)} N</Text>
                        <Text center middle>𝛿: {deformacao()} nm</Text>
                        <Text center middle>σ: {tensaoAxial()} Pa</Text>

                    </Block>

                </Block>
            </DismissKeyboard>
       

    );
};

export default CarregamentoUFE;