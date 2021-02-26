import React from 'react';
import { Form, Input, Button } from 'antd';

export default function AddFormContainer(props) {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed} size="large">
                <Form.Item
                    label="폼의 이름"
                    name="name"
                    rules={[{ required: true, message: '폼의 이름을 입력하세요.' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        폼 생성
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
