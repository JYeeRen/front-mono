import { Loader } from '@googlemaps/js-api-loader';

export class Selection {
  loader: Loader;

  drawing?: google.maps.DrawingLibrary;
  geocoding?: google.maps.GeocodingLibrary;

  constructor(loader: Loader) {
    this.loader = loader;
  }

  async load(map: google.maps.Map) {
    this.drawing = await this.loader.importLibrary('drawing');
    this.geocoding = await this.loader.importLibrary('geocoding');

    const { DrawingManager, OverlayType } = this.drawing;

    const drawingManager = new DrawingManager({
      drawingMode: OverlayType.RECTANGLE,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [OverlayType.RECTANGLE],
      },
      rectangleOptions: {
        editable: true,
        draggable: true,
      },
    });

    google.maps.event.addListener(
      drawingManager,
      'rectanglecomplete',
      this.rectanglecomplete.bind(this),
    );

    drawingManager.setMap(map);
  }

  async rectanglecomplete(rectangle: google.maps.Rectangle) {
    const bounds = rectangle.getBounds();
    if (bounds) {
      console.log('North-East:', bounds.getNorthEast().toString());
      console.log('South-West:', bounds.getSouthWest().toString());
    }
    // 不保留矩形选取
    rectangle.setMap(null);

    const geocoder = new this.geocoding!.Geocoder();

    const res = await geocoder.geocode({
      bounds,
      componentRestrictions: { country: 'US' },
    });
    console.log(res);
  }
}
