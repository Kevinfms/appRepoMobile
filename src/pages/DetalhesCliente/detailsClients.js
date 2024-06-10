import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api/api';

export default function App() {
  const [cliente, setCliente] = useState([]);
  const [nomeCli, setNomeCli] = useState('');
  const [telefone, setTelefone] = useState([]);
  const [telCli, setTelCli] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (showAlert) {
      Alert.alert(
        'Atenção!',
        alertMessage,
        [
          {
            text: 'OK',
            onPress: () => {
              setShowAlert(false);
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [showAlert]);

  const getCliente = async () => {
    try {
      if (!nomeCli.trim()) {
        setAlertMessage('Por favor, informe o nome do cliente.');
        setShowAlert(true);
        return;
      }

      const responseC = await api.get(`/tbl_cliente/${nomeCli.trim()}`);

      if (responseC.data.length === 0) {
        setAlertMessage('Registro não encontrado na base de dados. Por favor, verifique e tente novamente.');
        setShowAlert(true);
      } else {
        setCliente(responseC.data);
      }

    } catch (error) {
      console.error('Erro:', error.message);
      setAlertMessage('Ocorreu um erro ao buscar os dados. Por favor, tente novamente mais tarde.');
      setShowAlert(true);
    }
  };

  const getTelefone = async () => {
    try {
      if(!telCli.trim()){
        setAlertMessage('Por favor, informe o telefone do cliente!');
        setShowAlert(true);
        return;
      }

      
      const responseT = await api.get(`/telefone/${telCli.trim()}`);

      if (responseT.data.length === 0) {
        setAlertMessage('Registro não encontrado na base de dados. Por favor, verifique e tente novamente.');
        setShowAlert(true);
      } else {
        setTelefone(responseT.data);
      }
    } catch (error) {
      console.error('Erro:', error.message);
      setAlertMessage('Ocorreu um erro ao buscar os dados. Por favor, tente novamente mais tarde.');
      setShowAlert(true);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder='Nome do Cliente'
        value={nomeCli}
        onChangeText={setNomeCli}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Nome do Cliente'
        value={nomeCli}
        onChangeText={setTelCli}
      />

      <TouchableOpacity
        onPress={getCliente}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Pesquisar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={getTelefone}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Pesquisar</Text>
      </TouchableOpacity>

      {cliente.length > 0 && (
        <View style={styles.clientInfo}>
          <Text style={styles.clientInfoTitle}>Informações do Cliente</Text>
          <Text>ID: {cliente[0]?.id}</Text>
          <Text>Nome: {cliente[0]?.nome}</Text>
          <Text>Data de Nascimento: {cliente[0]?.data_nasc}</Text>
          <Text>CPF do cliente: {cliente[0]?.cpf}</Text>
          <Text>Data de Cadastro: {cliente[0]?.data_cad}</Text>
        </View>
      )}

      {telefone.length > 0 && (
        <View style={styles.clientInfo}>
          <Text style={styles.clientInfoTitle}>Informações do Telefone do Cliente</Text>
          <Text>ID: {telefone[0]?.id}</Text>
          <Text>ID da tabela Cliente: {telefone[0]?.id_cliente}</Text>
          <Text>Tipo de Telefone do Cliente: {telefone[0]?.tipo}</Text>
          <Text>Número do Cliente: {telefone[0]?.numero}</Text>
          <Text>Data de Cadastro: {telefone[0]?.data_cad}</Text>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    width: '80%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
    height: 30,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  clientInfo: {
    marginTop: 20,
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '80%',
  },
  clientInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    fontFamily: 'monospace'
  },
});