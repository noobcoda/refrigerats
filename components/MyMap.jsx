import * as React from 'react';
import Map, {NavigationControl, GeolocateControl, Marker} from 'react-map-gl';

export default function MyMap() {

    //when loaded, also needs to fetch lat and long of destination
    //and set marker there

    const geolocateControlRef = React.useCallback((ref) => {
        if (ref) {
            ref.trigger();
        }
    },[])

    return (
        <Map
            initialViewState={{
                longitude: -2.7967,
                latitude: 56.3398,
                zoom: 10
          }}
          style={{width: 1000, height: 500}}
          mapStyle="mapbox://styles/refrigerats/cl0hueo57003114vxmbdeciqa"
          mapboxAccessToken={process.env.mapbox_key}
          className="display:block position:absolute"
        >
            <GeolocateControl ref={geolocateControlRef} trackUserLocation/>
            <Marker longitude="-2.7967" latitude="56.3398" default="#AAF0D1">
            </Marker>
        </Map>
    )
}