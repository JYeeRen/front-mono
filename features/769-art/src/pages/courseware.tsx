import React from 'react';
import { Antd } from '@gkd/components';
import { config } from './courseware.conf';
import styles from './courseware.module.less';

const OSS_HOST = 'http://teacher-tmp.oss-cn-hongkong.aliyuncs.com';

export function CourseWare() {
  return (
    <>
      <section className={styles.container}>
        <Antd.Typography>
          <Antd.Typography.Title style={{ textAlign: 'center' }}>
            《美术鉴赏》课件下载
          </Antd.Typography.Title>
        </Antd.Typography>
        <Antd.List
          itemLayout="horizontal"
          dataSource={config}
          style={{ width: '600px' }}
          renderItem={(item) => (
            <Antd.List.Item
              actions={[
                <Antd.Button type="link" href={`${OSS_HOST}/课件/${item}`}>
                  下载
                </Antd.Button>,
              ]}
            >
              <Antd.List.Item.Meta title={item} />
            </Antd.List.Item>
          )}
        />
      </section>
    </>
  );
}
