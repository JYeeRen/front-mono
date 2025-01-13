import { Loader } from '@googlemaps/js-api-loader';
import placeStore from './place.store';

import { fromEventPattern } from 'rxjs';


export class PostcodeFeature {
  loader: Loader;

  featureLayer!: google.maps.FeatureLayer;
  selectedFeatureIdSet = new Set<string>();

  constructor(loader: Loader) {
    this.loader = loader;
  }

  async load(map: google.maps.Map) {
    const maps = await this.loader.importLibrary('maps');

    this.featureLayer = map.getFeatureLayer(maps.FeatureType.POSTAL_CODE);

    this.applyStyle();
    
    // this.featureLayer.addListener('click', this.handleClick.bind(this));

    const clickObservable = fromEventPattern(
      (handler) => this.featureLayer.addListener('click', handler),
      (handler, listener) => listener.remove() // Google Maps 事件监听通常返回一个移除函数
    );

    clickObservable.subscribe(event => {
      console.log('FeatureLayer was clicked:', event);
      // 可以在这里定义处理点击事件的逻辑，例如调用某个处理函数
      // this.handleClick(event);
    });
  }

  addListener(handler: (event: google.maps.FeatureMouseEvent) => void) {
    this.featureLayer?.addListener('click', handler);
  }

  handleClick(event: google.maps.FeatureMouseEvent) {
    event.features.map((f) => {
      const { placeId } = f as unknown as { placeId: string };
      placeStore.getState().setPlaceColor(placeId);
      // if (this.selectedFeatureIdSet.has(placeId)) {
      //   this.selectedFeatureIdSet.delete(placeId);
      // } else {
      //   this.selectedFeatureIdSet.add(placeId);
      // }
    });

    this.applyStyle();
  }

  applyStyle() {
    this.featureLayer!.style = this.featureStyleFn.bind(this);
  }

  featureStyleFn(options: google.maps.FeatureStyleFunctionOptions) {
    const { placeId } = options.feature as unknown as { placeId: string };
    const placeColor = placeStore.getState().placeColor;

  //   const availablePlace = new Map([
  //     [
  //         "ChIJO6qxWyGHa4cR6UE7I7DK_jg",
  //         "#810FCB"
  //     ],
  //     [
  //         "ChIJM7QnJ2iGa4cRz-0IAjMGYyM",
  //         "#379939"
  //     ],
  //     [
  //         "ChIJAZ-WZQKEa4cR4axbIMZYnjc",
  //         "#379939"
  //     ]
  // ])

    if (placeColor.has(placeId)) {
      return { ...this.styleClicked, fillColor: placeColor.get(placeId) };
    }
    // if (this.lastInteractedFeatureIds.includes(placeId)) {
    //   return this.styleMouseMove;
    // }
    // return availablePlace.has(placeId) ? this.styleDefault : null;
    return this.styleDefault;
  }


  styleDefault = {
    strokeColor: '#810FCB',
    strokeOpacity: 1.0,
    strokeWeight: 1.0,
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
