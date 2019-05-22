import React, {Component} from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet,TextInput,Alert,ActivityIndicator} from 'react-native'
import api from '../services/api'

export default class Main extends Component
{
    static navigationOptions={
        title: "Pagina Principal"
    };


    state=
    {
        objFull:[],
        cepInput:"24220045"
    };

    

    buscarNaApi = async (cep) =>
    {
        try{ //conexão ==true
           const retorno = await api.get(cep+"/json")
           const  objFull  = retorno.data;
           console.log(objFull);
           console.log(objFull.bairro);
           this.setState({objFull});
        }
        catch(e){ //catch para caso esteja sem internet
            console.log("Erro na requisião da API");
            console.log(e);
        }
    }

    setaCep = (texto) =>
    {
        this.setState({ cepInput: texto });
    }

    ValidaCep = (cepRecebido) =>
    {
        var cep = cepRecebido.replace(/\D/g, ''); //variavel cep somente com digitos
        if(cep!=""){ //testa se  cep ta vazio
            var validacep = /^[0-9]{8}$/;//Expressão regular para validar o CEP.

            if(validacep.test(cep)){
                this.buscarNaApi(cep); //buscar dentro da api
            }


        }
        else{//cep em branco
            Alert.alert(
                'Não foi possivel concluir',
                'Campo do Cep está em branco',
                [
                  {text: 'Ok', onPress: () => console.log('Botao ok pressionado')},
                ],
                {cancelable: false},
              );
        }
    }

    gerarTabelas()
    {
        if(this.state.objFull==null)
        {
            return <Text>Vazio</Text>;
        }
        return <Text>Nao ta vazio</Text>;
    }

    render()
    {
        return(
            <View>
            <Text>Consulta CEP</Text>
            <Text>Busque endereços de forma simples digitando apenas o  CEP</Text>
            <TextInput
                placeholder="242200-045"
                style={estilos.inputDoCep}
                onChangeText={this.setaCep}
                value={this.state.cepInput}>
            </TextInput>
            <TouchableOpacity
                style={estilos.botaoConfirmar}
                onPress={
                    ()=>this.ValidaCep(this.state.cepInput)
                    }>
                <Text>
                    Confirmar
                </Text>
            </TouchableOpacity>
            {this.gerarTabelas()}
            </View>
            );
    }
}


/* CSS*/

const estilos=StyleSheet.create(
    {
        inputDoCep:
        {
            margin:15,
            height:40,
            borderColor:"#7a42f4",
            borderWidth: 1,
        },
        botaoConfirmar:
        {
            fontSize:20
        },
        loading:{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
        }
    });
