// import m94103 from './94103.json';
import { useEffect, useRef } from 'react';
import { Modal } from 'antd';
import * as Gmap from './gmap';


// async function findBoundary(postCode: string) {
//   const request = {
//     textQuery: postCode,
//     // fields: ['id', 'location'],
//     fields: ['id', 'displayName', 'location', 'businessStatus'],
//     includedType: 'restaurant',
//     locationBias: { lat: 37.4161493, lng: -122.0812166 },
//     isOpenNow: true,
//     language: 'en-US',
//     maxResultCount: 8,
//     minRating: 3.2,
//     region: 'us',
//     useStrictTypeFiltering: false,
//   };

//   const { Place } = (await google.maps.importLibrary(
//     'places',
//   )) as google.maps.PlacesLibrary;
//   const { places } = await Place.searchByText(request);

//   const place = places[0];
//   console.log('place', place);
//   return place;
//   // if (places.length) {
//   //     const place = places[0];
//   //     // styleBoundary(place.id);
//   //     // map.setCenter(place.location!);
//   //     return place;
//   // } else {
//   //     console.log('No results');
//   //     return null;
//   // }
// }

async function renderMap(mapRef: React.RefObject<HTMLDivElement>) {
  if (!mapRef.current) {
    return;
  }
  const map = await Gmap.renderMap(mapRef);
  await Gmap.postcodeFeature.load(map);
  await Gmap.selection.load(map);
  return;
  // const { DrawingManager, OverlayType } = await loader.importLibrary('drawing');
  // const drawingManager = new DrawingManager({
  //   drawingMode: OverlayType.RECTANGLE,
  //   drawingControl: true,
  //   drawingControlOptions: {
  //     position: google.maps.ControlPosition.TOP_CENTER,
  //     drawingModes: [
  //       OverlayType.MARKER,
  //       OverlayType.CIRCLE,
  //       OverlayType.POLYGON,
  //       OverlayType.POLYLINE,
  //       OverlayType.RECTANGLE,
  //     ],
  //   },
  //   markerOptions: {
  //     icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  //   },
  //   circleOptions: {
  //     fillColor: "#ffff00",
  //     fillOpacity: 1,
  //     strokeWeight: 5,
  //     clickable: false,
  //     editable: true,
  //     zIndex: 1,
  //   },
  // });

  // drawingManager.setMap(map);

  // google.maps.event.addListener(drawingManager, 'rectanglecomplete', (rectangle) => {
  //   const bounds = rectangle.getBounds();
  //   if (bounds) {
  //     console.log('North-East:', bounds.getNorthEast().toString());
  //     console.log('South-West:', bounds.getSouthWest().toString());
  //   }

  //   rectangle.setMap(null);
  // });

  // const marker = new AdvancedMarkerElement({
  //   map,
  //   position: { lat: 37.419, lng: -122.02 },
  //   content: pin.element,
  // });




// Apply styles using a feature style function.


  return map;
}

const GoogleMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    renderMap(mapRef);
  }, []);

  return <div ref={mapRef} style={{ height: '80vh', width: '100%' }}></div>;
};

export function Map() {
  return (
    <>
      <Modal width={800} open={true}>
        <GoogleMap />
      </Modal>
      <div>Hello "/case/map"!</div>
    </>
  );
}
