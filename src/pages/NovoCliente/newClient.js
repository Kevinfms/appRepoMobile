import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../services/api/api';

export default function NovoCliente() {
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [cpf, setCpf] = useState('');
    const [tipo, setTipo] = useState('');
    const [datanasc, setDataNasc] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [buttonScale] = useState(new Animated.Value(1));

    const exibeAlert = () => {
        setShowAlert(true);
    }

    const ocultAlert = () => {
        setShowAlert(false);
    }

    useEffect(() => {

        if (showAlert) {

            Alert.alert(
                'Atenção',
                alertMessage,
                [{ text: 'OK', onPress: () => ocultAlert(false) }]
            )
        }

    }, [showAlert])



    const salvarCliente = async () => {

        try {
            if (nome == '' || nome == null) {
                setAlertMessage('Preencha corretamente o Nome')
                exibeAlert();
                return;
            }
            if (numero.length !== 11 || numero.length !== 10) {
                setAlertMessage('O valor digitado para telefone está incorreto')
                exibeAlert();
                return;
            }
            if (cpf.length <= 11 ) {
                setAlertMessage('O valor digitado para CPF está incorreto')
                exibeAlert();
                return;
            }
            if(datanasc == null || datanasc == ''){
                setAlertMessage('Preencha corretamente a data de nascimento')
                exibeAlert();
                return;
            }


            const responseC = await api.post('/tbl_cliente', { nome: nome, data_nasc: datanasc, cpf: cpf })
                .catch(function (error) {
                    if (error.response) {
                        console.error(error.responseC.data);
                        console.error(error.responseC.status);
                        console.error(error.responseC.headers);
                    } else if (error.resquest) {
                        if ((error.resquest._responseT).include('Failed')) {
                            console.log('Erro ao conectar com API');
                        }
                    } else {
                        console.log(error.message);
                    }
                    console.log(error.config);
                });

            if (responseC != undefined) {
                if (responseC.data[0].affectedRows == 1) {

                    setNome('');
                    setDataNasc('');
                    setCpf('');
                    setAlertMessage('Cliente cadastrado com Sucesso!');
                    exibeAlert();

                } else {
                    console.log('O registro não foi inserido, verifique e tente novamente');
                }
            }


            const responseT = await api.post('/telefone', { id_cliente: id_cliente, tipo: tipo, numero: numero })
                .catch(function (error) {
                    if (error.responseT) {
                        console.error(error.responseT.data);
                        console.error(error.responseT.status);
                        console.error(error.responseT.headers);
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
                if (responseT.data[0].affectedRows == 1) {
                    
                    setTipo('');
                    setNumero('');
                    setAlertMessage('Telefone cadastrado com Sucesso!');
                    exibeAlert();
    
                } else {
                    console.log('O registro não foi inserido, verifique e tente novamente');
                }
            }

        } catch (error) {
            console.error(error);
        }

    }

    const handleButtonPress = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start(() => salvarCliente());
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={[styles.card, { opacity: 1, transform: [{ scale: buttonScale }] }]}>
                <View style={styles.cardTitle}>
                    <Text style={styles.title}>Preencha os campos abaixo:</Text>
                </View>

                <Text>Nome do Cliente</Text>
                <TextInput
                    style={styles.caixaDeTexto}
                    value={nome}
                    onChangeText={setNome}
                />

                <Text>Telefone do Cliente</Text>
                <TextInput
                    style={styles.caixaDeTexto}
                    value={numero}
                    onChangeText={setNumero}
                />

                <Text>CPF do Cliente</Text>
                <TextInput
                    style={styles.caixaDeTexto}
                    value={cpf}
                    onChangeText={setCpf}
                />

                <TouchableOpacity
                    onPress={handleButtonPress}
                    style={styles.alignVH}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Cadastrar</Text>
                </TouchableOpacity>
            </Animated.View>


            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 300
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    alignVH: {
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        width: 110,
        height: 35,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 75
    },
    caixaDeTexto: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        marginVertical: 5,
    },
    cardTitle: {
        paddingBottom: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});