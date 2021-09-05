import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import keyApi from '../../config/keyGoogle.json'
export default function App({origin,destination,onReady}) {
    return(
        <MapViewDirections
            origin={origin}
            destination={destination}
            onReady={onReady}
            lineDashPattern={[0]}
            mode='DRIVING'
            apikey={keyApi.geocodeApi}
            strokeColor="#80bfff"
            strokeWidth={4}
        >

        </MapViewDirections>
    )
}