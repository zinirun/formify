import React from 'react';
import { Form, Input, Button, Card } from 'antd';
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
                            <Input
                                style={{ width: '90%' }}
                                placeholder="질문의 제목을 입력하세요."
                                bordered={false}
                            />
                        </Form.Item>
                    }
                    extra={<QuestionTypeDropdown />}
                >
                    <QTextType />
                </Card>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        폼 생성
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
