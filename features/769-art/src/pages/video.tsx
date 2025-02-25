import React, { useEffect, useRef } from 'react';
import {
  Player,
  BigPlayButton,
  ControlBar,
  LoadingSpinner,
  PlayerReference,
} from 'video-react';
import 'video-react/dist/video-react.css';
import styles from './video.module.less';
import { Antd } from '@gkd/components';
import { config } from './video.conf';

// const VIDEO_HOST = 'http://teacher-tmp.oss-cn-hongkong.aliyuncs.com';
const VIDEO_HOST = 'https://class.dutp.cn/769/';

export function Video() {
  const playerRef = useRef<PlayerReference>(null);

  const [videoKey, setVideoKey] = React.useState<string>('1');

  useEffect(() => {}, [videoKey]);

  return (
    <>
      <section className={styles.container}>
        <section className={styles.player}>
          <Player
            ref={playerRef}
            fluid
            playsInline
            poster="/assets/poster.png"
            src={`${VIDEO_HOST}/${videoKey}.mp4`}
          >
            <BigPlayButton position="center" />
            <LoadingSpinner />
            <ControlBar autoHide={false} />
          </Player>
        </section>
        <section className={styles.list}>
          <Antd.Row>
            {config.map((item, idx) => (
              <Antd.Col key={item}>
                <Antd.Button
                  type={
                    videoKey === (idx + 1).toString() ? 'primary' : 'default'
                  }
                  key={item}
                  onClick={() => {
                    setVideoKey((idx + 1).toString());
                  }}
                  className={styles.btn}
                >
                  {item}
                </Antd.Button>
              </Antd.Col>
            ))}
          </Antd.Row>
        </section>
      </section>
    </>
  );
}
