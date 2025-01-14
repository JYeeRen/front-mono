import { Loader } from '@googlemaps/js-api-loader';
import { PostcodeFeature } from './postCodeFeature';
import { Selection } from './selection';
import postalPloygons from './postal_ploygons.json';

const mapId = '6968edad074122cb';

const loader = new Loader({
  apiKey: '',
  version: 'weekly',
});

export async function renderMap(mapRef: React.RefObject<HTMLDivElement>) {
  const maps = await loader.importLibrary('maps');
  const map = new maps.Map(mapRef.current!, {
    mapId,
    center: { lat: 33.789835, lng: -118.144209 },
    zoom: 11.36,
    mapTypeControl: false,
  });

  postalPloygons.features.map((feature) => {
    const paths = feature.geometry.coordinates.map((area) => {
      return area.map((point) => {
        return { lat: point[1], lng: point[0] };
      });
    });

    const place = new maps.Polygon({
      paths,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: "#c9c9c9",
      fillOpacity: 0.35,
    });
  
    place.getPaths();

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
