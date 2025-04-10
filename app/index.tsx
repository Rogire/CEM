import { Text, View } from "react-native";
import React,{useState} from "react";
import Conversor from "@/components/Conversor/conversor";
import Result from "@/components/Result/Result";

export default function Index() {
  const [ConversionValue, setConversionValue] = useState<[string,number]>();
  const [showResult, setShowResult] = useState(false);
  const [resultValue, setResultValue] = useState<Array<[string, number]>>([]);
  const [ConvertedValues,setConvertedValues] = useState<Array<string>>([]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      {
        (!showResult) ?
          <View>
            <Conversor setConversionValue={setConversionValue} ConversionValue={ConversionValue} resultValue={resultValue} setResultValue={setResultValue} setShowResult={setShowResult} />
          </View>
          :
          <Result resultValue={resultValue} setShowResult={setShowResult} ConversionValue={ConversionValue}
          setConvertedValues={setConvertedValues} ConvertedValues={ConvertedValues} />
      }      
    </View>
  );
}
