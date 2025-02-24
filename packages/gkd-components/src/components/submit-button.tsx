import React from 'react';
import { Button, ButtonProps, Form, FormInstance } from 'antd';
import { useEffect, useState } from 'react';

interface SubmitButtonProps extends Omit<ButtonProps, 'form'> {
  form?: FormInstance;
}
export function SubmitButton(props: SubmitButtonProps) {
  const [submittable, setSubmittable] = useState<boolean>(false);

  const { form, disabled, ...buttonProps } = props;

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    if (!form) {
      return;
    }
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch((err) => {
        setSubmittable(err.errorFields.length === 0);
      });
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={disabled ?? !submittable}
      {...buttonProps}
    />
  );
}
