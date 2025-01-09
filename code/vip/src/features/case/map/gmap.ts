import { Loader } from '@googlemaps/js-api-loader';
import { PostcodeFeature } from './postCodeFeature';
import { Selection } from './selection';

const mapId = '6968edad074122cb';

const loader = new Loader({
  apiKey: '',
  version: 'weekly',
});

export async function renderMap(mapRef: React.RefObject<HTMLDivElement>) {
  const maps = await loader.importLibrary('maps');
  const map = new maps.Map(mapRef.current!, {
    mapId,
    center: { lat: 39.73682768582692, lng: -105.0317479798737 },
    zoom: 11.36,
    mapTypeControl: false,
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
