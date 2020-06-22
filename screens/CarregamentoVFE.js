import React, { useState } from 'react';
import { Block, Text } from 'expo-ui-kit';
import {
  Image,
  TextInput,
  Modal,
  StyleSheet,
  TouchableHighlight,
  View,
  Picker,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActionSheetIOS,
  KeyboardAvoidingView,
} from 'react-native';

import { LineChart } from "react-native-chart-kit";

import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

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
    marginLeft: 280,
    padding: 0,
    margin: 10,
    width: 80,
    backgroundColor: 'white',
    marginBottom: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2
  },

  textInput: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    margin: 20,
    width: 100,
    backgroundColor: 'white',
    color: 'black',
  },

  textInputOutsideForca: {
    marginRight: 280,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 20,
    marginBottom: -70,
    width: 80,
    backgroundColor: 'white',
  },

  textInputOutsideTamanho: {
    marginLeft: 105,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 20,
    marginBottom: -70,
    width: 80,
    backgroundColor: 'white',
  },

  textInputOutsideArea: {
    marginLeft: 190,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 20,
    marginBottom: -60,
    width: 80,
    backgroundColor: 'white',
  },

  centeredView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -150,
  },

  centeredView2: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -9,
  },

  modalView: {
    margin: 120,
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 45,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },

  closeButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 12,
    elevation: 2,
  },

  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 12,
    elevation: 2,
    marginBottom: 15,
  },

  CloseIOS: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 12,
    elevation: 2,
    marginBottom: 15,
    marginRight: 120,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  buttonStyle: {

    display: 'flex',
    marginHorizontal: -15,
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#F194FF',
    elevation: 2,
  },

  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  iosInput: {
    marginLeft: 165,
    margin: 10,
    width: 65,
    backgroundColor: 'white',
    marginBottom: -15,
    marginTop: -20,
    borderRadius: 20,
  },

  textInputOutsideForcaIOS: {
    marginRight: 200,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 20,
    marginBottom: -59,
    width: 80,
    backgroundColor: 'white',
  },

  textInputOutsideTamanhoIOS: {
    marginLeft: 105,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 20,
    marginBottom: -59,
    width: 80,
    backgroundColor: 'white',
  },

  textInputOutsideAreaIOS: {
    marginLeft: 190,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    margin: 20,
    marginBottom: 60,
    width: 80,
    backgroundColor: 'white',
  },

});

const CarregamentoVFE2 = () => {

  //Para mostrar os botoes
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisibleG, setModalVisibleG] = useState(false);

  //Infos necessárias
  const [forca, setForca] = useState(0)
  const [tamanho, setTamanho] = useState(0)
  const [area, setArea] = useState(0)
  const [material, setMaterial] = useState(0)

  //Corte 1
  const [forcaInt1, setForca1] = useState(0)
  const [tamanhoInt1, setTamanho1] = useState(0)

  //Corte 2
  const [forcaInt2, setForca2] = useState(0)
  const [tamanhoInt2, setTamanho2] = useState(0)

  //Corte 3
  const [forcaInt3, setForca3] = useState(0)
  const [tamanhoInt3, setTamanho3] = useState(0)

  function calcForca(qtddForcas) {
    switch (qtddForcas) {
      case 1:
        return parseFloat(forca)
      case 2:
        return parseFloat(forca) + parseFloat(forcaInt1)
      case 3:
        return parseFloat(forca) + parseFloat(forcaInt1) + parseFloat(forcaInt2)
      case 4:
        return parseFloat(forca) + parseFloat(forcaInt1) + parseFloat(forcaInt2) + parseFloat(forcaInt3)
      default:
        return 0
    }
  }

  function deformacao(ponto) {
    switch (ponto) {

      case 0: //Deformação total
        if (parseFloat(forca) === 0) {
          return 0;
        } else {
          return ((calcForca(1) * (parseFloat(tamanho) - parseFloat(tamanhoInt1))) / (parseFloat(area) * parseFloat(material))) + ((calcForca(2) * (parseFloat(tamanhoInt1) - parseFloat(tamanhoInt2))) / (parseFloat(area) * parseFloat(material))) + ((calcForca(3) * (parseFloat(tamanhoInt2) - parseFloat(tamanhoInt3))) / (parseFloat(area) * parseFloat(material))) + ((calcForca(4) * parseFloat(tamanhoInt3)) / (parseFloat(area) * parseFloat(material)))
        }
      case 1: //No ponto 1
        if (parseFloat(forcaInt1) === 0) {
          return 0;
        }
        else {
          return ((calcForca(2) * (parseFloat(tamanhoInt1) - parseFloat(tamanhoInt2))) / (parseFloat(area) * parseFloat(material))) + ((calcForca(3) * (parseFloat(tamanhoInt2) - parseFloat(tamanhoInt3))) / (parseFloat(area) * parseFloat(material))) + ((calcForca(4) * parseFloat(tamanhoInt3)) / (parseFloat(area) * parseFloat(material)))
        }

      case 2: //No ponto 2
        if (parseFloat(forcaInt2) === 0) {
          return 0;
        } else {
          return ((calcForca(3) * (parseFloat(tamanhoInt2) - parseFloat(tamanhoInt3))) / (parseFloat(area) * parseFloat(material))) + ((calcForca(4) * tamanhoInt3) / (parseFloat(area) * parseFloat(material)))
        }
      case 3: //No ponto 3
        if (parseFloat(forcaInt3) === 0) {
          return 0;
        }
        else {
          return ((calcForca(4) * parseFloat(tamanhoInt3)) / (parseFloat(area) * parseFloat(material)))
        }
      default:
        return 0
    }
  }

  function tensaoAxial(ponto) {

    if (parseFloat(area) === 0) {
      return 0;
    }

    switch (ponto) {
      case 0: //total
        return (calcForca(4) / parseFloat(area))
      case 1: //Primeiro corte
        return (parseFloat(forcaInt1) / parseFloat(area))
      case 2: //Segundo corte
        return (parseFloat(forcaInt2) / parseFloat(area))
      case 3: //Terceiro corte
        return (parseFloat(forcaInt3) / parseFloat(area))
      default:
        return 0
    }

  }
    
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

    <KeyboardAvoidingView enabled = {false} behavior="height" style={{ flex: 1 }}>
      <DismissKeyboard>
        <Block color="#E6E6FA">
          <Block margin={50} Top center middle>
            <Image source={require('../assets/VFE.png')}
              style={{
                borderRadius: 0,
                height: 150,
                width: 350
              }} />



            {Platform.OS === 'ios' ?
              <View>
                <TextInput
                  keyboardType='numeric'
                  style={styles.textInputOutsideForcaIOS}
                  placeholder='Forca (N)'
                  onChangeText={(val) => setForca(val)}
                >
                </TextInput>

                <TextInput
                  keyboardType='numeric'
                  style={styles.textInputOutsideTamanhoIOS}
                  placeholder='Tamanho (m)'
                  onChangeText={(val) => setTamanho(val)}
                >
                </TextInput>

                <TextInput
                  keyboardType='numeric'
                  style={styles.textInputOutsideAreaIOS}
                  placeholder='Area (m²)'
                  onChangeText={(val) => setArea(val)}
                >
                </TextInput>
                <View style={styles.iosInput}>
                  <TouchableOpacity onPress={ForIOS} style={styles.buttonStyle}>
                    <Text style={styles.text}>Material</Text>
                  </TouchableOpacity>
                </View>
              </View>

              :

              <View>
                <TextInput
                  keyboardType='numeric'
                  style={styles.textInputOutsideForca}
                  placeholder='Forca (N)'
                  onChangeText={(val) => setForca(val)}
                >
                </TextInput>

                <TextInput
                  keyboardType='numeric'
                  style={styles.textInputOutsideTamanho}
                  placeholder='Tamanho (m)'
                  onChangeText={(val) => setTamanho(val)}
                >
                </TextInput>

                <TextInput
                  keyboardType='numeric'
                  style={styles.textInputOutsideArea}
                  placeholder='Area (m²)'
                  onChangeText={(val) => setArea(val)}
                >
                </TextInput>

                <Picker
                  style={styles.pickerInput}
                  selectedValue={material}
                  onValueChange={
                    (val) => setMaterial(val)
                  }
                  mode='dropdown'
                >
                  <Picker.Item label='Material' value='' />
                  <Picker.Item label='Aço (200GPa)' value='200000000000' />
                  <Picker.Item label='Alumínio (70GPa)' value='70000000000' />
                  <Picker.Item label='Cobre (124GPa)' value='124000000000' />
                  <Picker.Item label='Ferro (196GPa)' value='196000000000' />
                  <Picker.Item label='Ferro Fundido (170GPa)' value='170000000000' />
                  <Picker.Item label='Madeira (13GPa)' value='13000000000' />

                </Picker>
              </View>
            }

          </Block>

          <Block margin={0} Top center middle>
            <Text></Text>

            <View style={styles.centeredView}>

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
              >

                <View style={styles.centeredView2}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Forças</Text>


                    <View style={styles.centeredView2}>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible1}
                      >
                        <DismissKeyboard>
                          <View style={styles.centeredView2}>
                            <View style={styles.modalView}>
                              <TextInput
                                keyboardType='numeric'
                                style={styles.textInput}
                                placeholder='Forca (N)'
                                onChangeText={
                                  (val) => setForca1(val)

                                }
                              >
                              </TextInput>

                              <Text style={styles.modalText}>Força atual: {parseFloat(forcaInt1)} N</Text>

                              <TextInput
                                keyboardType='numeric'
                                style={styles.textInput}
                                placeholder='Distância (m)'
                                onChangeText={(val) => setTamanho1(val)}
                              >
                              </TextInput>

                              <Text style={styles.modalText}>Distância atual: {parseFloat(tamanhoInt1)} m</Text>

                              <Text center middle>𝛿 primeiro corte: {round((deformacao(1) * 1000000000), 5)} nm</Text><Text></Text>
                              <Text center middle>σ primeiro corte: {round(tensaoAxial(1), 5)} Pa</Text><Text></Text>

                              <TouchableHighlight
                                style={{ ...styles.closeButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                  setModalVisible1(!modalVisible1);
                                }}
                              >
                                <Text style={styles.textStyle}>Close</Text>
                              </TouchableHighlight>
                            </View>
                          </View>
                        </DismissKeyboard>
                      </Modal>

                      <TouchableHighlight
                        style={styles.openButton}
                        onPress={() => {
                          setModalVisible1(true);
                        }}
                      >
                        <Text style={styles.textStyle}>Primeira Força</Text>
                      </TouchableHighlight>


                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible2}
                      >
                        <DismissKeyboard>
                          <View style={styles.centeredView2}>
                            <View style={styles.modalView}>

                              <TextInput
                                keyboardType='numeric'
                                style={styles.textInput}
                                placeholder='Forca (N)'
                                onChangeText={(val) => setForca2(val)}
                              >
                              </TextInput>

                              <Text style={styles.modalText}>Força atual: {parseFloat(forcaInt2)} N</Text>

                              <TextInput
                                keyboardType='numeric'
                                style={styles.textInput}
                                placeholder='Distância (m)'
                                onChangeText={(val) => setTamanho2(val)}
                              >
                              </TextInput>

                              <Text style={styles.modalText}>Distância atual: {parseFloat(tamanhoInt2)} m</Text>

                              <Text center middle>𝛿 segundo corte: {round((deformacao(2) * 1000000000), 5)} nm</Text><Text></Text>
                              <Text center middle>σ segundo corte: {round(tensaoAxial(2), 5)} Pa</Text><Text></Text>

                              <TouchableHighlight
                                style={{ ...styles.closeButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                  setModalVisible2(!modalVisible2);
                                }}
                              >
                                <Text style={styles.textStyle}>Close</Text>
                              </TouchableHighlight>
                            </View>
                          </View>
                        </DismissKeyboard>
                      </Modal>

                      <TouchableHighlight
                        style={styles.openButton}
                        onPress={() => {
                          setModalVisible2(true);
                        }}
                      >
                        <Text style={styles.textStyle}>Segunda Força</Text>
                      </TouchableHighlight>

                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible3}
                      >
                        <DismissKeyboard>
                          <View style={styles.centeredView2}>
                            <View style={styles.modalView}>

                              <TextInput
                                keyboardType='numeric'
                                style={styles.textInput}
                                placeholder='Forca (N)'
                                onChangeText={(val) => setForca3(val)}
                              >
                              </TextInput>

                              <Text style={styles.modalText}>Força atual: {parseFloat(forcaInt3)} N</Text>

                              <TextInput
                                keyboardType='numeric'
                                style={styles.textInput}
                                placeholder='Distância (m)'
                                onChangeText={(val) => setTamanho3(val)}
                              >
                              </TextInput>

                              <Text style={styles.modalText}>Distância atual: {parseFloat(tamanhoInt3)} m</Text>

                              <Text center middle>𝛿 terceiro corte: {round((deformacao(3) * 1000000000), 5)} nm</Text><Text></Text>
                              <Text center middle>σ terceiro corte: {round(tensaoAxial(3), 5)} Pa</Text><Text></Text>

                              <TouchableHighlight
                                style={{ ...styles.closeButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                  setModalVisible3(!modalVisible3);
                                }}
                              >
                                <Text style={styles.textStyle}>Close</Text>
                              </TouchableHighlight>
                            </View>
                          </View>
                        </DismissKeyboard>
                      </Modal>

                      <TouchableHighlight
                        style={styles.openButton}
                        onPress={() => {
                          setModalVisible3(true);
                        }}
                      >
                        <Text style={styles.textStyle}>Terceira Força</Text>
                      </TouchableHighlight>

                    </View>

                    <TouchableHighlight
                      style={{ ...styles.closeButton, backgroundColor: "#2196F3" }}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </TouchableHighlight>
                  </View>
                </View>

              </Modal>
              {Platform.OS === 'ios' ?

                <TouchableHighlight
                  style={styles.CloseIOS}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <Text style={styles.textStyle}>Cortes</Text>
                </TouchableHighlight>
                :
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <Text style={styles.textStyle}>Cortes</Text>
                </TouchableHighlight>
              }

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleG}
              >
                <View style={styles.centeredView2}>
                  <View style={styles.modalView}>

                    <LineChart
                      withInnerLines={false}
                      withOuterLines={false}
                      fromZero={true}
                      withShadow={false}
                      data={{
                        labels: ["σ1", "σ2", "σ3", "σTotal"],
                        datasets: [
                          {
                            data: [
                              tensaoAxial(1),
                              tensaoAxial(2),
                              tensaoAxial(3),
                              tensaoAxial(0),
                            ]
                          }
                        ]
                      }}
                      width={screenWidth / 1.5}
                      height={screenHeight / 2}
                      yLabelsOffset = "0"
                      yAxisLabel=""
                      yAxisSuffix="Pa"
                      chartConfig={{
                        backgroundColor: "#E6E6FA",
                        backgroundGradientFrom: "#E6E6FA",
                        backgroundGradientTo: "#E6E6FA",
                        decimalPlaces: 2,
                        color: (opacity = 1) => '#0000ff',
                        labelColor: (opacity = 1) => '#0000ff',
                        style: {
                          borderRadius: 20
                        },
                        propsForDots: {
                          r: "5",
                          strokeWidth: "2",
                          stroke: "#ffa726"
                        }
                      }}
                      style={{
                        marginVertical: 8,
                        borderRadius: 20
                      }}
                    />
                    <Text></Text>

                    <TouchableHighlight
                      style={{ ...styles.closeButton, backgroundColor: "#2196F3" }}
                      onPress={() => {
                        setModalVisibleG(!modalVisibleG);
                      }}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </TouchableHighlight>

                  </View>
                </View>
              </Modal>

              <TouchableHighlight
                style={styles.openButton}
                onPress={() => {
                  setModalVisibleG(true);
                }}
              >
                <Text style={styles.textStyle}>Gráfico de tensão axial</Text>
              </TouchableHighlight>



              <Text center middle>Reacão de apoio: {calcForca(4)} N</Text><Text></Text>
              <Text center middle>𝛿 Total: {round((deformacao(0) * 1000000000), 5)} nm</Text><Text></Text>
              <Text center middle>σ Total: {round(tensaoAxial(0), 5)} Pa</Text>
            </View>

          </Block>

        </Block>
      </DismissKeyboard>
    </KeyboardAvoidingView>

  );
};


export default CarregamentoVFE2;