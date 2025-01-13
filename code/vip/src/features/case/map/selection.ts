import { Loader } from '@googlemaps/js-api-loader';
import placeStore from './place.store';

export class Selection {
  loader: Loader;

  map!: google.maps.Map;

  drawing!: google.maps.DrawingLibrary;
  geocoding!: google.maps.GeocodingLibrary;
  places!: google.maps.PlacesLibrary;

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
      // drawingMode: OverlayType.RECTANGLE,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        // drawingModes: [OverlayType.RECTANGLE],
        drawingModes: [
          OverlayType.RECTANGLE,
          OverlayType.CIRCLE
        ],
      },
      rectangleOptions: {
        editable: true,
        draggable: true,
        strokeWeight: 1
      },
      circleOptions: {
        strokeWeight: 1
      },
    });

    google.maps.event.addListener(
      drawingManager,
      'rectanglecomplete',
      this.rectanglecomplete.bind(this),
    );

    google.maps.event.addListener(
      drawingManager,
      'circlecomplete',
      this.circlecomplete.bind(this),
    );

    drawingManager.setMap(map);
  }

  async circlecomplete(circle: google.maps.Circle) {
    console.log('>>>>>>.', circle);
    const center = circle.getCenter();
    const radius = circle.getRadius();
    console.log(center, radius);

    circle.setMap(null);

    const request: google.maps.places.SearchNearbyRequest = {
      // required parameters
      fields: ['id', 'location'],
      locationRestriction: {
        center: center!,
        radius: radius,
      },
      includedTypes: ['postal_code'],
      // optional parameters
      // includedPrimaryTypes: ['restaurant'],
      maxResultCount: 5,
      // rankPreference: SearchNearbyRankPreference.POPULARITY,
      // language: 'en-US',
      region: 'us',
    };

    const { places } = await this.places.Place.searchNearby(request);
    console.log(places);

    places.forEach((place) => {
      console.log(place.location?.lat(), place.location?.lng());
    //   place.location
    //   placeStore.getState().setPlaceColor(place.id);
    });
  }

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  private calculateDistance(point1: google.maps.LatLng, point2: google.maps.LatLng): number {
    const earthRadiusKm = 6371 * 1000;
  
    const dLat = this.degreesToRadians(point2.lat() - point1.lat());
    const dLon = this.degreesToRadians(point2.lng() - point1.lng());
  
    const lat1 = this.degreesToRadians(point1.lat());
    const lat2 = this.degreesToRadians(point2.lat());
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return earthRadiusKm * c;
  }

  rectangleToCircles(
    southWest: google.maps.LatLng,
    northEast: google.maps.LatLng,
    radius: number
  ): google.maps.Circle[] {
    const circles = [];
  
    const latDistance = this.calculateDistance(
      southWest,
      northEast
    );
  
    const lngDistance = this.calculateDistance(
      southWest,
      northEast
    );
  
    const latStep = radius * Math.sqrt(2);
    const lngStep = radius * Math.sqrt(2);
  
    for (let lat = southWest.lat(); lat <= northEast.lat(); lat += latStep) {
      for (let lng = southWest.lng(); lng <= northEast.lng(); lng += lngStep) {
        circles.push(new google.maps.Circle({ center: new google.maps.LatLng({ lat, lng }), radius }));
      }
    }
  
    return circles;
  }

  async rectanglecomplete(rectangle: google.maps.Rectangle) {
    const bounds = rectangle.getBounds()!;
    if (bounds) {
      console.log('North-East:', bounds.getNorthEast().toString());
      console.log('South-West:', bounds.getSouthWest().toString());
    }
    // 不保留矩形选取
    rectangle.setMap(null);

    const center = bounds.getCenter();
    const radius = this.calculateDistance(bounds.getSouthWest(), bounds.getNorthEast()) / 2;
    console.log(bounds, '>>>>>>>', center, radius);

    console.log(bounds);

    // this.rectangleToCircles(bounds.getSouthWest(), bounds.getNorthEast(), radius).forEach((circle) => {
    //   circle.setMap(this.map);
    // });

    // const circle = new google.maps.Circle({
    //   center: bounds.getCenter(),
    //   radius: radius * 1000
    // });

    // circle.setMap(this.map);
    const request: google.maps.places.SearchNearbyRequest = {
      // required parameters
      fields: ['id', 'location'],
      locationRestriction: {
        center: center,
        radius: radius,
      },
      includedTypes: ['postal_code'],
      // optional parameters
      // includedPrimaryTypes: ['restaurant'],
      maxResultCount: 5,
      // rankPreference: SearchNearbyRankPreference.POPULARITY,
      // language: 'en-US',
      region: 'us',
    };

    const { places } = await this.places.Place.searchNearby(request);
    console.log(places);

    places.forEach((place) => {
      // console.log(place.location);
      console.log(place.id, bounds.contains(place.location!));
      if (bounds.contains(place.location!)) {
        placeStore.getState().setPlaceColor(place.id);
      }
    //   place.location
    });
  }
}
