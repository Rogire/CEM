import React,{useMemo} from "react";
import { View, Text, Button } from "react-native";

export default function Result(props: any) {

    let AllLocales = [
        ["USD", "en-US"], ["AED", "ar-AE"], ["AFN", "fa-AF"], ["ALL", "sq-AL"], ["AMD", "hy-AM"], ["ANG", "nl-CW"], ["AOA", "pt-AO"], ["ARS", "es-AR"], ["AUD", "en-AU"], ["AWG", "nl-AW"], ["AZN", "az-AZ"], ["BAM", "bs-BA"], ["BBD", "en-BB"], ["BDT", "bn-BD"], ["BGN", "bg-BG"], ["BHD", "ar-BH"], ["BIF", "fr-BI"], ["BMD", "en-BM"], ["BND", "ms-BN"], ["BOB", "es-BO"], ["BRL", "pt-BR"], ["BSD", "en-BS"], ["BTN", "dz-BT"], ["BWP", "en-BW"], ["BYN", "be-BY"], ["BZD", "en-BZ"], ["CAD", "en-CA"], ["CDF", "fr-CD"], ["CHF", "de-CH"], ["CLP", "es-CL"], ["CNY", "zh-CN"], ["COP", "es-CO"], ["CRC", "es-CR"], ["CUP", "es-CU"], ["CVE", "pt-CV"], ["CZK", "cs-CZ"], ["DJF", "fr-DJ"], ["DKK", "da-DK"], ["DOP", "es-DO"], ["DZD", "ar-DZ"], ["EGP", "ar-EG"], ["ERN", "ti-ER"], ["ETB", "am-ET"], ["EUR", "de-DE"], ["FJD", "en-FJ"], ["FKP", "en-FK"], ["FOK", "fo-FO"], ["GBP", "en-GB"], ["GEL", "ka-GE"], ["GGP", "en-GG"], ["GHS", "en-GH"], ["GIP", "en-GI"], ["GMD", "en-GM"], ["GNF", "fr-GN"], ["GTQ", "es-GT"], ["GYD", "en-GY"], ["HKD", "zh-HK"], ["HNL", "es-HN"], ["HRK", "hr-HR"], ["HTG", "fr-HT"], ["HUF", "hu-HU"], ["IDR", "id-ID"], ["ILS", "he-IL"], ["IMP", "en-IM"], ["INR", "hi-IN"], ["IQD", "ar-IQ"], ["IRR", "fa-IR"], ["ISK", "is-IS"], ["JEP", "en-JE"], ["JMD", "en-JM"], ["JOD", "ar-JO"], ["JPY", "ja-JP"], ["KES", "en-KE"], ["KGS", "ky-KG"], ["KHR", "km-KH"], ["KID", "en-KI"], ["KMF", "fr-KM"], ["KRW", "ko-KR"], ["KWD", "ar-KW"], ["KYD", "en-KY"], ["KZT", "kk-KZ"], ["LAK", "lo-LA"], ["LBP", "ar-LB"], ["LKR", "si-LK"], ["LRD", "en-LR"], ["LSL", "st-LS"], ["LYD", "ar-LY"], ["MAD", "ar-MA"], ["MDL", "ro-MD"], ["MGA", "mg-MG"], ["MKD", "mk-MK"], ["MMK", "my-MM"], ["MNT", "mn-MN"], ["MOP", "zh-MO"], ["MRU", "ar-MR"], ["MUR", "en-MU"], ["MVR", "dv-MV"], ["MWK", "en-MW"], ["MXN", "es-MX"], ["MYR", "ms-MY"], ["MZN", "pt-MZ"], ["NAD", "en-NA"], ["NGN", "en-NG"], ["NIO", "es-NI"], ["NOK", "no-NO"], ["NPR", "ne-NP"], ["NZD", "en-NZ"], ["OMR", "ar-OM"], ["PAB", "es-PA"], ["PEN", "es-PE"], ["PGK", "en-PG"], ["PHP", "en-PH"], ["PKR", "ur-PK"], ["PLN", "pl-PL"], ["PYG", "es-PY"], ["QAR", "ar-QA"], ["RON", "ro-RO"], ["RSD", "sr-RS"], ["RUB", "ru-RU"], ["RWF", "rw-RW"], ["SAR", "ar-SA"], ["SBD", "en-SB"], ["SCR", "en-SC"], ["SDG", "ar-SD"], ["SEK", "sv-SE"], ["SGD", "en-SG"], ["SHP", "en-SH"], ["SLE", "en-SL"], ["SLL", "en-SL"], ["SOS", "so-SO"], ["SRD", "nl-SR"], ["SSP", "en-SS"], ["STN", "pt-ST"], ["SYP", "ar-SY"], ["SZL", "en-SZ"], ["THB", "th-TH"], ["TJS", "tg-TJ"], ["TMT", "tk-TM"], ["TND", "ar-TN"], ["TOP", "to-TO"], ["TRY", "tr-TR"], ["TTD", "en-TT"], ["TVD", "en-TV"], ["TWD", "zh-TW"], ["TZS", "sw-TZ"], ["UAH", "uk-UA"], ["UGX", "en-UG"], ["UYU", "es-UY"], ["UZS", "uz-UZ"], ["VES", "es-VE"], ["VND", "vi-VN"], ["VUV", "bi-VU"], ["WST", "sm-WS"], ["XAF", "fr-CM"], ["XCD", "en-AG"], ["XCG", "en-AG"], ["XDR", "en-AG"], ["XOF", "fr-SN"], ["XPF", "fr-PF"], ["YER", "ar-YE"], ["ZAR", "en-ZA"], ["ZMW", "en-ZM"], ["ZWL", "en-ZW"]
    ];

    const localeHash = AllLocales.reduce((acc: Record<string, string>, [currency, locale]) => {
        acc[currency] = locale;
        return acc;
    }, {} as Record<string, string>);

    const formatCurrency = (value: number, currency: string = "USD", locale: string = "en-US") => {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
        }).format(value);
    };
    const newConvertedValues = useMemo(() => {
        return props.resultValue.map((res: [string, number]) => {
            return formatCurrency(props.ConversionValue[1], props.ConversionValue[0], localeHash[props.ConversionValue[0]]).toString() + " = " + formatCurrency(res[1], res[0], localeHash[res[0]]).toString();
        })
    },[props.ResultValue, props.ConversionValue]);

    return (
        <View>
            {
                Array.isArray(props.resultValue) && props.resultValue.length !== 0
                    ?
                    <Text>{newConvertedValues}</Text>
                    :
                <>
                </>
            }
            <Button onPress={() => props.setShowResult(false)} title="Voltar" />
        </View>
    );
}