import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'

import api from '../../services/api/api';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



export default function TodosClientes() {
    const navigation = useNavigation();
    const route = useRoute();

    let [flatListClientes, setFlatListClientes] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [status, setStatus] = useState(false);

    const navegaEditar = (pId, pNome, pIdade) => {
        navigation.navigate('EditarCliente', { id: pId, nome: pNome, idade: pIdade })

    }


    const exibeAlert = () => {
        setShowAlert(true);
    }

    const listarClientes = async () => {

        try {
            const responseC = await api.get('/tbl_cliente')
                .catch(function (error) {
                    if (error.responseC) {
                        console.log(error.responseC.data);
                        console.log(error.responseC.status);
                        console.log(error.responseC.headers);
                    } else if (error.resquest) {
                        if ((error.resquest._responseC).include('Failed')) {
                            console.log('Erro ao conectar com API');
                        }
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config);
                });

            if (responseC != undefined) {
                if (responseC.data.length > 0) {

                    let temp = [];
                    for (let i = 0; i < responseC.data.length; i++) {
                        temp.push(responseC.data[i]);
                       
                    }
                    setFlatListClientes(temp);
                    temp = [];

                } else {
                    setAlertMessage('Nenhum registro foi localizado!')
                    exibeAlert();
                    return;
                }
            }


            const responseT = await api.get('/telefone')
                .catch(function (error) {
                    if (error.responseT) {
                        console.log(error.responseT.data);
                        console.log(error.responseT.status);
                        console.log(error.responseT.headers);
                    } else if (error.resquest) {
                        if ((error.resquest._responseT).include('Failed')) {
                            console.log('Erro ao conectar com API');
                        }
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config);
                });

            
            if (responseT != undefined) {
                if (responseT.data.length > 0) {
    
                        let temp = [];
                        for (let i = 0; i < responseT.data.length; i++) {
                            temp.push(responseT.data[i]);
                           
                        }
                        setFlatListClientes(temp);
                        temp = [];
    
                } else {
                        setAlertMessage('Nenhum registro foi localizado!')
                        exibeAlert();
                        return;
                }
            }

        } catch (error) {
            console.error(error);
        }

    }


    const deletarClientes = async (id) => {
        try {
            const responseC = await api.delete(`/tbl_cliente/${id}`)
                .catch(function (error) {
                    if (error.responseCC) {
                        console.log(error.responseC.data);
                        console.log(error.responseC.status);
                        console.log(error.responseC.headers);
                    } else if (error.resquest) {
                        if ((error.resquest._responseC).include('Failed')) {
                            console.log('Erro ao conectar com API');
                        }
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config);
                });

            if (responseC != undefined) {
                if (responseC.data[0].affectedRows > 0 ) {

                    setRefresh(prevState => !prevState);
                    setAlertMessage('Registro excluído com sucesso!')
                    exibeAlert();

                } else {
                    setAlertMessage('Nenhum registro foi localizado!')
                    exibeAlert();
                   
                }
            }


            const responseT = await api.delete(`/telefone/${id}`)
                .catch(function (error) {
                    if (error.responseT) {
                        console.log(error.responseT.data);
                        console.log(error.responseT.status);
                        console.log(error.responseT.headers);
                    } else if (error.resquest) {
                        if ((error.resquest._responseT).include('Failed')) {
                            console.log('Erro ao conectar com API');
                        }
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config);
                });
            
            
                if (responseT != undefined) {
                    if (responseT.data[0].affectedRows > 0 ) {
    
                        setRefresh(prevState => !prevState);
                        setAlertMessage('Registro excluído com sucesso!')
                        exibeAlert();
    
                    } else {
                        setAlertMessage('Nenhum registro foi localizado!')
                        exibeAlert();
                       
                    }
                }
            

        } catch (error) {
            console.error(error);
        }

    }




    useFocusEffect(
        React.useCallback(() => {
            listarClientes();
        }, [refresh])
    )




    let listViewItem = (item) => {
        return (
            <View style={styles.modeloCard}>

                <Text style={styles.textHeader}>ID</Text>
                <Text style={styles.textValue}>{item.id}</Text>

                <Text style={styles.textHeader}>Nome</Text>
                <Text style={styles.textValue}>{item.nome}</Text>

                <Text style={styles.textHeader}>Telefone</Text>
                <Text style={styles.textValue}>{item.numeuro}</Text>


                <Text style={styles.textHeader}>CPF</Text>
                <Text style={styles.textValue}>{item.cpf}</Text>

                <View style={styles.containerButto}>




                    <TouchableOpacity onPress={() => {
                        navegaEditar(item.id, item.nome, item.numero,  item.cpf)
                    }}>
                        <FontAwesome5 name='edit' color='white' size={24} />
                    </TouchableOpacity>




                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            'Atenção!',
                            'Deseja ralmente excluir esse registro!',
                            [
                                {
                                    text: 'Sim',
                                    onPress: () => {deletarClientes(item.id)}
                                },
                                {
                                    text: 'Cancelar',
                                    onPress: () => {return}
                                }
                            ]
                        )
                    }}>
                        <FontAwesome5 name='trash-alt' color='white' size={24} />
                    </TouchableOpacity>

                </View>


            </View>
        )

    }

    return (

        <View style={{ flex: 1 }}>
            <View>
                <FlatList
                    style={{ marginTop: 20 }}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    data={flatListClientes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listViewItem(item)}
                />
            </View>



            {showAlert && (
                Alert.alert(
                    'Atenção',
                    alertMessage,
                    [
                        { text: 'OK', onPress: () => setShowAlert(false) }
                    ]
                )
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    containerButto: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 15
    },
    modeloCard: {

        backgroundColor: 'purple',
        marginBottom: 30,
        padding: 15,
        borderRadius: 10,
        elevation: 8,
    },
    textHeader: {
        color: '#111',
        fontSize: 12,
        fontWeight: 'bold',
    },
    textValue: {
        color: 'white',
        fontSize: 18
    }
})