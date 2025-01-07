import { authService } from '@app/services';
import { useLoginStore } from './login.store';
import { Button, Checkbox, Form, Input, Row } from 'antd';
import { Link, useSearch } from '@tanstack/react-router';
import Icon, {
  LockOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import logo from '@assets/zippy-transparent.png';
import { IcDanger } from './assets/danger.icon';
import { LoginForm } from './login.type';
import styles from './login.module.less';

export default function Login() {

  const search = useSearch({ from: '/(auth)/login' });
  console.log(search);

  const store = useLoginStore();

  const [form] = Form.useForm<LoginForm>();

  const handleLogin = async (values: LoginForm) => {
    try {
      store.showLoading();
      await authService.login(values);
    } catch {
      store.showError();
    } finally {
      store.hideLoading();
    }
  };

  return (
    <>
      <div className={styles.content}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.slogan}>
          <p style={{ marginBottom: 0 }}>Order Managerment System</p>
          Welcome!
        </div>
        <Form
          className={styles.form}
          form={form}
          initialValues={{ account: store.account, remember: store.remember }}
          onFinish={handleLogin}
          requiredMark={false}
          onFieldsChange={store.hideError}
          labelCol={{ span: 0 }}
        >
          <Form.Item
            name="account"
            label="UserName"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="UserName"
              prefix={<UserOutlined />}
              disabled={store.loading}
              autoComplete='username'
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password
              placeholder="Password"
              prefix={<LockOutlined />}
              disabled={store.loading}
              autoComplete='password'
            />
          </Form.Item>
          <Row justify="space-between" align="middle">
            <Form.Item
              name="remember"
              valuePropName="checked"
              label={null}
              noStyle
            >
              <Checkbox>
                Remember Me{' '}
                <QuestionCircleOutlined className={styles.rememberIcon} />
              </Checkbox>
            </Form.Item>
            <Button type="link" className={styles.forgotBtn}>
              Forgot your password?
            </Button>
          </Row>
          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              loading={store.loading}
              className={styles.loginBtn}
            >
              Sign In
            </Button>
          </Form.Item>

          {store.error && (
            <>
              <p className={styles.errorTips}>
                <Icon component={IcDanger} style={{ fontSize: '30px' }} />
                <span style={{ wordBreak: 'break-word' }}>
                  Error: You have entered an invalid username or
                  password.Password fields are case sensitive and consecutive
                  unsuccessful log-in attempts may result in being locked out.
                </span>
              </p>
              <p className={styles.errorTips}>
                Try entering your information again or visit.
                <Link className={styles.forgotTip}>Forgot your Password.</Link>
              </p>
            </>
          )}
        </Form>
      </div>
    </>
  );
}
