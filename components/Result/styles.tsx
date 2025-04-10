import { StyleSheet } from "react-native";
const styles = StyleSheet.create(
    {
        Container:
        {
            flex: 1,
            flexDirection: "column",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            alignContent: "center",
            justifyContent:"center",
            maxHeight: "15%",
            padding: 20,
            borderRadius: 10,
            width:"85%",
        },
        Text:
        {
            fontSize: 18,
            fontWeight: "medium",
            textAlign: "center",
        },
        input:
        {
            backgroundColor: "rgba(177, 170, 170, 0.64)",
            margin: 5,            
        },
        btn:
        {
            backgroundColor: "rgb(23, 216, 250)",        
            padding: 5,
            borderRadius: 5,
        }
    }
)

export default styles;