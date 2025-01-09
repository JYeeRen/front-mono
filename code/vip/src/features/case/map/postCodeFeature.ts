import { Loader } from '@googlemaps/js-api-loader';

export class PostcodeFeature {
  loader: Loader;

  featureLayer?: google.maps.FeatureLayer;
  selectedFeatureIdSet = new Set<string>();

  constructor(loader: Loader) {
    this.loader = loader;
  }

  async load(map: google.maps.Map) {
    const maps = await this.loader.importLibrary('maps');

    this.featureLayer = map.getFeatureLayer(maps.FeatureType.POSTAL_CODE);

    this.applyStyle();
    
    this.featureLayer.addListener('click', this.handleClick.bind(this));
  }

  handleClick(event: google.maps.FeatureMouseEvent) {
    event.features.map((f) => {
      const { placeId } = f as unknown as { placeId: string };
      if (this.selectedFeatureIdSet.has(placeId)) {
        this.selectedFeatureIdSet.delete(placeId);
      } else {
        this.selectedFeatureIdSet.add(placeId);
      }
    });

    this.applyStyle();
  }

  applyStyle() {
    this.featureLayer!.style = this.featureStyleFn.bind(this);
  }

  featureStyleFn(options: google.maps.FeatureStyleFunctionOptions) {
    const { placeId } = options.feature as unknown as { placeId: string };

    if (this.selectedFeatureIdSet.has(placeId)) {
      return this.styleClicked;
    }
    // if (this.lastInteractedFeatureIds.includes(placeId)) {
    //   return this.styleMouseMove;
    // }
    return this.styleDefault;
  }


  styleDefault = {
    strokeColor: '#810FCB',
    strokeOpacity: 1.0,
    strokeWeight: 2.0,
    fillColor: 'white',
    fillOpacity: 0.1, // Polygons must be visible to receive events.
  };

  styleClicked = {
    ...this.styleDefault,
    fillColor: '#810FCB',
    fillOpacity: 0.5,
  };

  styleMouseMove = {
    ...this.styleDefault,
    strokeWeight: 4.0,
  };

}
