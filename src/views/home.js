import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Dimensions,SafeAreaView,StatusBar, View,Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import Bucarplaces from '../componentes/bucarPlaces'
import Direction from '../componentes/directions'
import Dark from '../mapstyle/indexDark.json'
import Light from '../mapstyle/indexLight.json'
import { Feather } from '@expo/vector-icons';

export default function App() {

  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [destino,setDestino] = React.useState(null)
  const [mode,setMode] = React.useState(false)
  const map = React.useRef()

  //executa automaticamente quando o componentes são renderizados em tela
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        alert('Permission to access location was denied');
        return;
      }

      try {

         // let isLocationServicesEnabled = await Location.hasServicesEnabledAsync();
          var user_position = await Location.getCurrentPositionAsync();
          
          setLocation(user_position)
         // console.log(user_position)
      } catch (error) {
        let location = await Location.getLastKnownPositionAsync();
        setLocation(location)
       // console.log(location)
        alert('não conseguimos pegar a localização')
      }
    })();
  }, []);

   handleLocationSelected = (data, details) =>{
     // console.log(data)
      setDestino({
        latitude:details.geometry.location.lat,
        longitude:details.geometry.location.lng,
        title:data.structured_formatting.main_text,
      })
   //   console.log('destino')
   //   console.log(destino)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#ffffff' barStyle='dark-content'></StatusBar>
      
      {
        //necessaria verificação por causa dos re-render do react
        //pois o componente contém estado
        location &&(
          <>
          
          <MapView 
          ref={map}
          customMapStyle={mode ? Dark : Light}
          region={{
            latitude:location.coords.latitude,
            longitude:location.coords.longitude,
            latitudeDelta:0.0143,
            longitudeDelta:0.0134
          }}
          style={styles.map}>
            <MapView.Circle
                center={{latitude: location.coords.latitude,longitude: location.coords.longitude }}
                radius={30}
                strokeWidth={7}
                fillColor="#80bfff"
                strokeColor="#fed42855" />
           
          {
            destino &&(
              <>
              <Direction 
              origin={{latitude:location.coords.latitude,longitude:location.coords.longitude}}
              destination={destino}
              onReady={(result) =>{
              //  console.log(result.distance)
                map.current.fitToCoordinates(result.coordinates,{
                  edgePadding:{
                    right:100,
                    left:100,
                    top:130,
                    bottom:300
                  }
                })
              }}
              ></Direction>
              <MapView.Circle
                center={destino}
                radius={30}
                strokeWidth={7}
                fillColor="#fed42855"
                strokeColor="#80bfff" />
                
                </>
            )
          }  
          </MapView>
          <TouchableOpacity 
          style={styles.buttonMode}
          onPress={()=>setMode(!mode)}
          >
          { mode ? 
          <Feather name="moon" size={24} color="white" />:
          <Feather name="sun" size={24} color="white" />
          }
          </TouchableOpacity>
          <Bucarplaces onLocationSelected={handleLocationSelected}></Bucarplaces>
          {
            destino &&(
              <View style={styles.footer}>
                <Text style={{color:mode ? "#746855": "black"}}>{destino.title}</Text>
                
              </View>
            )
          }
          </>
        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
   // flex:1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  footer: {
    width:'100%',
    height:150,
    position:'absolute',
    bottom:0,
    backgroundColor:'#ffff',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonMode:{
    position:'absolute',
    width:50,
    top:100,
    right:20,
    borderRadius:10,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:"#746855"
  }
});