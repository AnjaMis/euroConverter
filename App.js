import React, { useState, useEffect } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Picker,
} from 'react-native'

import { Button } from 'react-native-elements'

export default function App() {
  const [euroValue, setEuroValue] = useState(0)
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('')

  const [object, setObject] = useState({})

  useEffect(() => {
    fetch(
      'http://api.exchangeratesapi.io/latest?access_key=64e464a5f3ab1fa7ae57da547feb0908',
    )
      .then((response) => response.json())
      .then((data) => setObject(data.rates))
      .catch((error) => {
        Alert.alert('Error', error)
      })
  }, [])

  console.log(object)
  //setRateArray(Object.keys(object))
  console.log(Object.keys(object))

  const convert = () => {
    const rate = object[currency]
    setEuroValue((amount / rate).toFixed(5))
  }

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 200, width: 300, marginTop: 80, marginBottom: 50 }}
        source={{
          uri: 'https://picsum.photos/id/403/200/300',
        }}
      />

      <Text style={{ fontSize: 20, marginBottom: 20 }}>{euroValue}€</Text>

      <View>
        <TextInput
          style={{
            fontSize: 18,
            width: 200,
            marginTop: 0,
            //marginBottom: 20,
            borderWidth: 1,
          }}
          onChangeText={(text) => setAmount(text)}
          keyboardType="numeric"
        />
        <Picker
          selectedValue={currency}
          onValueChange={(value) => setCurrency(value)}
        >
          {Object.keys(object).map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>
      <Button
        title="CONVERT"
        onPress={convert}
        buttonStyle={{ marginTop: 100, marginBottom: 100 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {},
})
