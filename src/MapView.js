import React, { useEffect, useRef } from 'react';

function MapView() {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapContainerRef = useRef(null);

  // Dynamically load the Google Maps script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);

    window.initMap = () => {
      const map = new window.google.maps.Map(mapContainerRef.current, {
        zoom: 5,
        center: { lat: 24.886, lng: -70.268 },
        mapTypeId: "terrain",
      });

      const triangleCoords = [
        { lat: 25.774, lng: -80.19 },
        { lat: 18.466, lng: -66.118 },
        { lat: 32.321, lng: -64.757 },
        { lat: 25.774, lng: -80.19 },
      ];

      const bermudaTriangle = new window.google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      });

      bermudaTriangle.setMap(map);
    };

    // Cleanup the script when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [googleMapsApiKey]);

  return <div id="map" ref={mapContainerRef} style={{ width: '400px', height: '400px' }} />;
}

export default MapView;
