import { Loader } from '@googlemaps/js-api-loader';
// import m94103 from './94103.json';
import { useEffect, useRef } from 'react';
import { Modal } from 'antd';

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
  const loader = new Loader({
    apiKey: '',
    version: 'weekly', // 或指定其他版本
  });

  const google = await loader.importLibrary('maps');
  if (!mapRef.current) {
    return;
  }

  // const center = { lat: 20.773, lng: -156.01 };
  const center = { lat: 37.419, lng: -122.02 };
  // 创建地图实例
  const map = new google.Map(mapRef.current, {
    center,
    zoom: 12,
    mapId: '6968edad074122cb',
  });

  const { AdvancedMarkerElement, PinElement } =
    await loader.importLibrary('marker');

  const pinTextGlyph = new PinElement({
    glyph: '74',
    glyphColor: 'white',
    background: '#FBBC04',
    borderColor: '#137333',
    scale: 1,
  });

  const pinTextGlyph2 = new PinElement({
    glyph: '93',
    glyphColor: 'white',
    background: '#FBBC04',
    borderColor: '#137333',
    scale: 1,
  });

  const markerViewGlyphText = new AdvancedMarkerElement({
    map,
    position: { lat: 37.419, lng: -122.03 },
    content: pinTextGlyph.element,
  });

  new AdvancedMarkerElement({
    map,
    position: { lat: 37.409, lng: -122.04 },
    content: pinTextGlyph2.element,
  });

  console.log(markerViewGlyphText);
  // const marker = new AdvancedMarkerElement({
  //   map,
  //   position: { lat: 37.419, lng: -122.02 },
  //   content: pin.element,
  // });
  // const featureLayer = map.getFeatureLayer(google.FeatureType.LOCALITY);

  // const featureStyleOptions: google.maps.FeatureStyleOptions = {
  //   strokeColor: '#810FCB',
  //   strokeOpacity: 1.0,
  //   strokeWeight: 3.0,
  //   fillColor: '#810FCB',
  //   fillOpacity: 0.5
  // };

  // const styleFn: google.maps.FeatureStyleFunction = options => {
  //   if (options.feature.placeId == 'ChIJ0zQtYiWsVHkRk8lRoB1RNPo') { // Hana, HI
  //     return featureStyleOptions;
  //   }
  // };
  // featureLayer.style = styleFn;

  // const place = await findBoundary('94103');
  // console.log(place);

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
