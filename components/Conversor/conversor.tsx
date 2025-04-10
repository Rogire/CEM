import React, {useState, useEffect} from "react";
import { View,Text, Button, TouchableOpacity } from "react-native";
import styles from "./style";
import { Picker } from '@react-native-picker/picker';
import { TextInput } from "react-native";

export default function Conversor(props : any)
{
    const [currencyIn, setCurrencyIn] = useState("");
    const [currencyOut, setCurrencyOut] = useState("");
    const [Keys, setKeys] = useState<string[]>([]);

    const [Values, setValues] = useState<number[] | unknown[]>([]);
    
    const templateUrl = `https://v6.exchangerate-api.com/v6/8211c46df263b2f9e0b56e63/latest/USD`;
    const ConversionURL = `https://v6.exchangerate-api.com/v6/8211c46df263b2f9e0b56e63/latest/${currencyOut}`;

    async function getKeysValues(url : string): Promise<[string[], number[]] | [unknown[],unknown[]]>
    {
        try {
            if(!url) throw new Error("Moeda de entrada não selecionada.");

            const response = await fetch(url);
            let keys, values;

            if(!response.ok)
                throw new Error("Erro de conexão com a API");
            else
            {
                const Data = await response.json();
                if (!Data || !Data.conversion_rates)    throw new Error("Resposta inválida da API: Dados ausentes.");
                if (typeof Data.conversion_rates !== "object")    throw new Error("Dados de conversão inválidos.");
                if (Data.result === "error")    throw new Error("Erro de conexão 002");

                keys = Object.keys(Data.conversion_rates);
                values = Object.values(Data.conversion_rates);
            }      
            return [keys,values];
        }   
        catch(error : any){
            throw new Error(`Erro inesperado ao acessar ${url}: ${error.message || error}`);
        }
    }

    const setOptions = () => {
        getKeysValues(templateUrl).then((result) => setKeys(result[0] as string[])).catch((error) => console.error(error));
    }

    const convert = () => {
    if (!currencyIn || !currencyOut || !props.ConversionValue) {
        console.error("Por favor, preencha todos os campos antes de converter.");
        return;
    }

    getKeysValues(ConversionURL)
        .then((result) => {
            setKeys(result[0] as string[]);
            setValues(result[1]);

            const [keys, values] = result;
            let finalValue : [string, number];

            keys.forEach((value, index) => {
                if (value === currencyIn)
                {
                    finalValue = [currencyOut, props.ConversionValue ? props.ConversionValue[1] / (values[index] as number) : 0];
                    props.setResultValue([...props.resultValue,finalValue]);
                }
            });
            props.setShowResult(true);
        })
        .catch((error) => console.error(error));
};

    useEffect(() => {
        setOptions();
    }, []);

    return (
        <View>
            <View style={styles.Container}>
                <Text style={styles.Text}>Selecione a moeda a ser convertida:</Text>
                <Picker selectedValue={""} onValueChange={(itemValue) => setCurrencyIn(itemValue)}>
                    <Picker.Item label="Selecione..." value="" />
                    {
                        Keys.map((key, index) => (
                        <Picker.Item key={index} label={key} value={key}/>
                        ))
                    }
                </Picker>
                <Text style={styles.Text}>Selecione a moeda de conversão:</Text>
                <Picker selectedValue={""} onValueChange={(itemValue) => setCurrencyOut(itemValue)}>
                    <Picker.Item label="Selecione..." value="" />
                    {
                        Keys.map((key, index) => (
                        <Picker.Item key={index} label={key} value={key}/>
                        ))
                    }
                </Picker>
                <TextInput style={styles.input} keyboardType="numeric" placeholder="Coloque o valor a ser convertido"
                    onChangeText={value => props.setConversionValue([currencyIn, Number(value)])} />
                
                <TouchableOpacity onPress={() => convert()} style={styles.btn}><Text style={styles.Text}>Converter</Text></TouchableOpacity>
            </View>
        </View>
    );
}