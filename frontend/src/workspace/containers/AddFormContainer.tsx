import React from 'react';
import { Form, Input, Button, Card, Space } from 'antd';
import QuestionTypeDropdown from '../components/QuestionTypeDropdown';
import QTextType from '../components/QuestionTypes/QTextType';

export default function AddFormContainer(props) {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Form name="newform" onFinish={onFinish} onFinishFailed={onFinishFailed} size="large">
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: '폼의 이름을 입력하세요.' }]}
                >
                    <Input placeholder="새로운 폼의 이름을 입력하세요." />
                </Form.Item>

                <Card
                    title={
                        <Form.Item
                            name="title"
                            rules={[{ required: true, message: '질문의 제목을 입력하세요.' }]}
                            style={{ margin: 0 }}
                        >
                            <Input placeholder="질문의 제목을 입력하세요." bordered={false} />
                        </Form.Item>
                    }
                    extra={<QuestionTypeDropdown />}
                >
                    <QTextType />
                </Card>

                <Form.Item style={{ marginTop: 20, float: 'right' }}>
                    <Space>
                        <Button>미리보기</Button>
                        <Button type="primary" htmlType="submit">
                            폼 생성
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
}
