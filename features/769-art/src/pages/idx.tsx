import React from 'react';
import {
  RiFilePaperLine,
  RiFileVideoLine,
  RiFileDownloadLine,
} from 'react-icons/ri';
import styles from './index.module.less';

interface Props {
  navigate: (option: { to: string }) => void;
}

export function Index({ navigate }: Props) {
  return (
    <div style={{ width: '100%' }}>
      <section className={styles.container}>
        <div
          className={styles.wrapper}
          onClick={() => navigate({ to: '/769/video' })}
        >
          <RiFileVideoLine className={styles.icon} />
          <span>视频观看</span>
        </div>
        <div
          className={styles.wrapper}
          onClick={() => navigate({ to: '/769/courseware' })}
        >
          <RiFileDownloadLine className={styles.icon} />
          <span>课件下载</span>
        </div>
        <div
          className={styles.wrapper}
          onClick={() => navigate({ to: '/769/questionnaire' })}
        >
          <RiFilePaperLine className={styles.icon} />
          <span>自测问卷</span>
        </div>
      </section>
    </div>
  );
}
