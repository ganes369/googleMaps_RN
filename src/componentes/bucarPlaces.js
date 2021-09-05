import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import keyApi from '../../config/keyGoogle.json'

export default function App(props) {

  const {onLocationSelected } = props
  return (
    <GooglePlacesAutocomplete
      placeholder='Buscar lugares'
      onPress={onLocationSelected}
      query={{
        key: keyApi.geocodeApi,
        language: 'pt',
      }}
      textInputProps={{
          autoCapitalize: 'none',
          autoCorrect: false
      }}
      //Busca informações adicionais
      fetchDetails
      placeholderTextColor="#333"
      enablePoweredByContainer={false}
      styles={{
          container:{
              position:'absolute',
              top:30,
              width:'90%'
          },
          textInput:{
              height:54
          },
          description:{}
      }}
    />
  );
}
