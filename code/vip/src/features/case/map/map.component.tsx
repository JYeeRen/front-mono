// import m94103 from './94103.json';
import { useEffect, useRef } from 'react';
import { Modal, ColorPicker } from 'antd';
import * as Gmap from './gmap';
import { PlusSquareOutlined } from '@ant-design/icons';
// import routeStyles from './route.module.less';
import { vanillaStore } from './map.store';
import { useStore } from 'zustand';
import placeStore from './place.store';

async function renderMap(mapRef: React.RefObject<HTMLDivElement>) {
  if (!mapRef.current) {
    return;
  }
  const map = await Gmap.renderMap(mapRef);
  await Gmap.postcodeFeature.load(map);
  // await Gmap.selection.load(map);

  // Gmap.postcodeFeature.addListener((event) => {
  //   event.features.map((f) => {
  //     const { placeId } = f as unknown as { placeId: string };
  //     console.log(placeId);
  //     // if (this.selectedFeatureIdSet.has(placeId)) {
  //     //   this.selectedFeatureIdSet.delete(placeId);
  //     // } else {
  //     //   this.selectedFeatureIdSet.add(placeId);
  //     // }
  //   });
  // });
}

const GoogleMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    renderMap(mapRef);
  }, []);

  return <div ref={mapRef} style={{ height: '80vh', width: '100%' }}></div>;
};

export function MapComponent() {
  const { warehouseRoutes, addRoute } = useStore(vanillaStore);
  const setActivceColor = useStore(placeStore, (store) => store.setActivceColor);

  return (
    <>
      <Modal width={800} open={true}>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <GoogleMap />
          <div style={{ height: '80vh', width: '100%' }}></div>
          <div
            style={{
              position: 'absolute',
              right: 50,
              top: 50,
              // width: '200px',
              padding: '10px',
              // height: '100px',
              backgroundColor: '#c9c9c9',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <PlusSquareOutlined
              onClick={addRoute}
              style={{ fontSize: '30px', marginBottom: '5px' }}
            />
            {warehouseRoutes.map((route) => (
              <div key={route.key} onClick={() => setActivceColor(route.color.hex())}>
                <ColorPicker
                  key={route.key}
                  value={route.color.hex()}
                  disabledAlpha
                  // onChange={route.setColor.bind(route)}
                  style={{ marginBottom: '5px' }}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>
      <div>Hello "/case/map"!</div>
    </>
  );
}
