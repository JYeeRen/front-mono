import React from 'react';
import { Antd, SubmitButton, modal } from '@gkd/components';
import { config, init, reason } from './questionnaire.conf';
import styles from './questionnaire.module.less';
import axios from 'axios';

async function submit(questionnaire_info: string) {
  await axios.post(
    '/api/questionnaires/insertQuestionnaire',
    { questionnaire_info },
    { baseURL: 'http://yesen.cutepapertrick.cn:1556' },
  );
}

export function Questionnaire() {
  const [form] = Antd.Form.useForm();

  const [value, setValue] = React.useState({});
  const [showReason, setShowReason] = React.useState(false);

  return (
    <section className={styles.container}>
      <Antd.Typography>
        <Antd.Typography.Title style={{ textAlign: 'center' }}>
          《美术鉴赏》自测问卷
        </Antd.Typography.Title>
        <Antd.Typography.Paragraph>
          亲爱的同学们，本问卷旨在帮助你们自我评估对美术鉴赏的理解与认识。请根据自己的学习情况，选择最符合你所理解的答案。祝你测试顺利！
        </Antd.Typography.Paragraph>
        <Antd.Typography.Paragraph>
          <section className={styles.questions}>
            <Antd.Form
              disabled={showReason}
              form={form}
              // initialValues={init}
              layout="vertical"
              className={styles.form}
              scrollToFirstError={{
                behavior: 'instant',
                block: 'end',
                focus: true,
              }}
              onFinish={async (values) => {
                if (showReason) {
                  form.resetFields();
                  setShowReason(false);
                  return;
                }
                setValue(values);

                await submit(JSON.stringify(values));

                modal.success({
                  title: '提交成功',
                  okText: '查看解析',
                  onOk: () => {
                    setShowReason(true);
                  },
                });
              }}
            >
              {config.map(({ question, type, options }, index) => (
                <div key={index}>
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
                              <Antd.Radio
                                style={{ width: '100%' }}
                                value={answer}
                              >
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
                              <Antd.Checkbox
                                style={{ width: '100%' }}
                                value={answer}
                              >
                                {answer}
                              </Antd.Checkbox>
                            </Antd.Col>
                          ))}
                        </Antd.Row>
                      </Antd.Checkbox.Group>
                    )}
                  </Antd.Form.Item>
                  {showReason && (
                    <div className={styles.reason}>{reason[index]}</div>
                  )}
                </div>
              ))}
              <Antd.Form.Item shouldUpdate>
                <SubmitButton
                  style={{ width: '100%' }}
                  type="primary"
                  form={form}
                  disabled={false}
                >
                  {showReason ? '重新填写' : '提交'}
                </SubmitButton>
              </Antd.Form.Item>
            </Antd.Form>
          </section>
        </Antd.Typography.Paragraph>
      </Antd.Typography>
    </section>
  );
}
