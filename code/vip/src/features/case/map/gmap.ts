import { Loader } from '@googlemaps/js-api-loader';
import { PostcodeFeature } from './postCodeFeature';
import { Selection } from './selection';
import postalPloygons from './geo.json';
import { Polygon, MultiPolygon } from './type';
const mapId = '6968edad074122cb';

const loader = new Loader({
  apiKey: '',
  version: 'weekly',
});


function multiPolygonToLatLng(coordinates: MultiPolygon) {
  // console.log('multiPolygonToLatLng', coordinates);
  const res = coordinates.map((polygon) => polygonToLatLng(polygon)[0]);
  // console.log('multiPolygonToLatLng => res', res);
  return res;
}

function polygonToLatLng(coordinates: Polygon) {
  // console.log('polygonToLatLng', coordinates);
  return coordinates.map((polygon) => {
    return polygon.map((point) => ({ lat: point[1], lng: point[0] }));
  });
}

export async function renderMap(mapRef: React.RefObject<HTMLDivElement>) {
  const maps = await loader.importLibrary('maps');
  const map = new maps.Map(mapRef.current!, {
    mapId,
    center: { lat: 48.369631, lng: -120.85399 },
    zoom: 11.36,
    mapTypeControl: false,
  });

  console.log(postalPloygons.zipCodes.length);
  postalPloygons.zipCodes.map((feature) => {
    // console.log(feature);
    const geoJson = JSON.parse(feature.geoJson);
    // const geoJson = feature.geometry;
    // console.log('geoJson.coordinates', geoJson.coordinates);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let paths: any = [];
    if (geoJson.type !== 'MultiPolygon') {
      paths = multiPolygonToLatLng(geoJson.coordinates as MultiPolygon);
    }
    if (geoJson.type === 'Polygon') {
      paths = polygonToLatLng(geoJson.coordinates as Polygon);
    }
    
    // paths = multiPolygonToLatLng(geoJson.coordinates as Polygon);
    // console.log('>>>>> paths', paths);
    // const paths = feature.geometry.coordinates.map((area) => {
    //   return area.map((point) => {
    //     return { lat: point[1], lng: point[0] };
    //   });
    // });


    // console.log(paths);
    const place = new maps.Polygon({
      paths,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: "#c9c9c9",
      fillOpacity: 0.35,
    });
  
    // place.getPaths();

    place.addListener('click', () => {
      place.setOptions({
        fillColor: "#FF0000",
      });

      place.setMap(map);
    });
    

    place.setMap(map);
  });
  return map;
}

export async function pin(map: google.maps.Map) {
  const marker = await loader.importLibrary('marker');
  const pinTextGlyph = new marker.PinElement({
    glyph: '🍔',
    glyphColor: 'blue',
    background: '#fbbc04',
    borderColor: '#137333',
    scale: 1,
  });

  new marker.AdvancedMarkerElement({
    map,
    position: { lat: 37.7749, lng: -122.4194 },
    content: pinTextGlyph.element,
  });
}

export const postcodeFeature = new PostcodeFeature(loader);
export const selection = new Selection(loader);
