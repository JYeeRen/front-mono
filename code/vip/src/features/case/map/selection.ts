import { Loader } from '@googlemaps/js-api-loader';

export class Selection {
  loader: Loader;

  map!: google.maps.Map;

  drawing!: google.maps.DrawingLibrary;
  geocoding!: google.maps.GeocodingLibrary;
  places!: google.maps.PlacesLibrary

  constructor(loader: Loader) {
    this.loader = loader;
  }

  async load(map: google.maps.Map) {
    this.map = map;
    this.drawing = await this.loader.importLibrary('drawing');
    this.geocoding = await this.loader.importLibrary('geocoding');
    this.places = await this.loader.importLibrary('places');

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

    // const placeService =  new this.places!.PlacesService(this.map);

    // placeService.nearbySearch({
    //   bounds: bounds as google.maps.LatLngBounds,
    //   type: ''
    // }, (res) => console.log(res));
    // const request: google.maps.places.SearchNearbyRequest = {
    //   fields: ["name", "geometry"],
    //   region: "us",
    //   locationRestriction: new Circle
    // };

    const request: google.maps.places.SearchByTextRequest = {
      includedType: 'postal_code',
      textQuery: '*',
      locationBias: bounds as google.maps.LatLngBounds,
      region: "us",
      fields: ["displayName", "location", "businessStatus"]
    };

    const places = await this.places.Place.searchByText(request);
    console.log(places);
    // const geocoder = new this.geocoding!.Geocoder();

    // const res = await geocoder.geocode({
    //   bounds,
    //   componentRestrictions: { country: 'US' },
    // });
    // console.log(res);
  }
}
