// GoogleMapWithAutocomplete.tsx
import React, { useRef, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete
} from '@react-google-maps/api';

//const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your Google Maps API key
const API_KEY = 'AIzaSyDL9J82iDhcUWdQiuIvBYa0t5asrtz3Swk';
//https://maps.googleapis.com/maps/api/js?key=AIzaSyAzo9Xzk5QwuAixqF8Kxdxp1zgMfL2DtKA&v=3.exp&libraries=geometry,drawing,places}`

const containerStyle = {
  width: '50%',//size map
  height: '400px',
};

const center = {
  lat: 40.7128,
  lng: -74.0060,
};

const GoogleMapWithAutocomplete: React.FC = () => {
  const [mapCenter, setMapCenter] = useState(center);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        setMapCenter({
          lat: location.lat(),
          lng: location.lng(),
        });
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={['places']}>
      {/* <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Search for a city"
          ref={inputRef}
          style={{ width: '100%', padding: '8px' }}
        />
      </div> */}

      <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={12}>
        <Marker position={mapCenter} />

        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search city"
            ref={inputRef}
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px"
            }}
          />
        </Autocomplete>
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapWithAutocomplete;

















// import React, { useState } from 'react';
// import { useLoadScript } from '@react-google-maps/api';
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from 'use-places-autocomplete';
// import {
//   GoogleMap,
//   Marker,
//   StandaloneSearchBox,
// } from '@react-google-maps/api';

// const libraries = ['places'];

// // Replace with your own Google Maps API Key
// const API_KEY = 'AIzaSyDL9J82iDhcUWdQiuIvBYa0t5asrtz3Swk';

// const GoogleMapWithAutocomplete: React.FC = () => {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: API_KEY,
//   });

//   const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

//   const {
//     ready,
//     value,
//     suggestions: { status, data },
//     setValue,
//     clearSuggestions,
//   } = usePlacesAutocomplete();

//   const handleSelect = async (address: string) => {
//     setValue(address, false);
//     clearSuggestions();

//     try {
//       const results = await getGeocode({ address });
//       const { lat, lng } = await getLatLng(results[0]);
//       setSelectedLocation({ lat, lng });
//     } catch (error) {
//       console.error('Error fetching location:', error);
//     }
//   };

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded) return <div>Loading Maps...</div>;

//   return (
//     <div>
//       <h1>Location Search</h1>
//       <input
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         disabled={!ready}
//         placeholder="Search a location"
//       />
//       <div>
//         {status === 'OK' && 
//           data.map(({ place_id, description }) => (
//             <div key={place_id} onClick={() => handleSelect(description)}>
//               {description}
//             </div>
//           ))}
//       </div>
//       <GoogleMap
//         zoom={10}
//         center={selectedLocation || { lat: 0, lng: 0 }}
//         mapContainerStyle={{ height: '400px', width: '800px' }}
//       >
//         {selectedLocation && (
//           <Marker position={selectedLocation} />
//         )}
//       </GoogleMap>
//     </div>
//   );
// };

// export default GoogleMapWithAutocomplete;
