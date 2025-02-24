import React from 'react';
import { Antd, SubmitButton } from '@gkd/components';
import { config } from './questionnaire.conf';
import styles from './questionnaire.module.less';

export function Questionnaire() {
  const [form] = Antd.Form.useForm();

  return (
    <section className={styles.container}>
      <Antd.Typography>
        <Antd.Typography.Title style={{ textAlign: 'center' }}>《美术鉴赏》自测问卷</Antd.Typography.Title>
        <Antd.Typography.Paragraph>
          亲爱的同学们，本问卷旨在帮助你们自我评估对美术鉴赏的理解与认识。请根据自己的学习情况，选择最符合你所理解的答案。祝你测试顺利！
        </Antd.Typography.Paragraph>
        <Antd.Typography.Paragraph>
      <section className={styles.questions}>
        <Antd.Form
          form={form}
          layout="vertical"
          className={styles.form}
          scrollToFirstError={{
            behavior: 'instant',
            block: 'end',
            focus: true,
          }}
          onFinish={(values) => console.log(values)}
        >
          {config.map(({ question, type, options }, index) => (
            <Antd.Form.Item
              label={question}
              key={index}
              name={question}
              rules={[{ required: true, message: '请选择' }]}
            >
              {type === 'single' && (
                <Antd.Radio.Group>
                  <Antd.Row gutter={[6, 12]}>
                    {options.map((answer, idx) => (
                      <Antd.Col key={idx} span={24}>
                        <Antd.Radio style={{ width: '100%' }} value={answer}>
                          {answer}
                        </Antd.Radio>
                      </Antd.Col>
                    ))}
                  </Antd.Row>
                </Antd.Radio.Group>
              )}
              {type === 'multiple' && (
                <Antd.Checkbox.Group>
                  <Antd.Row gutter={[6, 12]}>
                    {options.map((answer, idx) => (
                      <Antd.Col key={idx} span={24}>
                        <Antd.Checkbox style={{ width: '100%' }} value={answer}>
                          {answer}
                        </Antd.Checkbox>
                      </Antd.Col>
                    ))}
                  </Antd.Row>
                </Antd.Checkbox.Group>
              )}
            </Antd.Form.Item>
          ))}
          <Antd.Form.Item shouldUpdate>
            <SubmitButton
              style={{ width: '100%' }}
              type="primary"
              form={form}
              disabled={false}
            >
              提交
            </SubmitButton>
          </Antd.Form.Item>
        </Antd.Form>
      </section>
        </Antd.Typography.Paragraph>
      </Antd.Typography>
    </section>
  );
}
