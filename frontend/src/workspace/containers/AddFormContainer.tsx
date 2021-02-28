import React, { useCallback, useState } from 'react';
import { Form, Input, Button, Card, Space } from 'antd';
import QuestionTypeDropdown from '../components/QuestionTypeDropdown';
import QTextType from '../components/QuestionTypes/QTextType';
import QSelectOneType from '../components/QuestionTypes/QSelectOneType';
import QSelectAllType from '../components/QuestionTypes/QSelectAllType';
import QDropdownType from '../components/QuestionTypes/QDropdownType';

export default function AddFormContainer(props) {
    const [form, setForm] = useState({
        title: '',
    });
    const [questions, setQuestions] = useState([
        {
            title: '',
            seq: 1,
            type: 'text',
            options: [''],
        },
    ]);
    const handleTitleChange = useCallback(
        (e) => {
            setForm({ ...form, title: e.target.value });
        },
        [form],
    );
    const handleQuestionChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            const [type, seq] = name.split('-');
            let updated;
            switch (type) {
                case 'title':
                    updated = questions.map((q) => {
                        if (q.seq === parseInt(seq)) {
                            return {
                                ...q,
                                title: value,
                            };
                        } else return q;
                    });
            }
            setQuestions(updated);
        },
        [questions],
    );
    const handleQuestionTypeChange = useCallback(
        (value, seq) => {
            const updated = questions.map((q) => {
                if (q.seq === seq) {
                    return {
                        ...q,
                        type: value,
                    };
                } else return q;
            });
            setQuestions(updated);
        },
        [questions],
    );
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    console.log(questions);
    return (
        <div>
            <Form name="newform" onFinish={onFinish} onFinishFailed={onFinishFailed} size="large">
                <Form.Item rules={[{ required: true, message: '폼의 이름을 입력하세요.' }]}>
                    <Input
                        name="title"
                        onChange={handleTitleChange}
                        value={form.title}
                        placeholder="새로운 폼의 이름을 입력하세요."
                    />
                </Form.Item>

                {questions.map((q) => (
                    <Card
                        key={q.seq}
                        title={
                            <Form.Item
                                rules={[{ required: true, message: '질문의 제목을 입력하세요.' }]}
                                style={{ margin: 0 }}
                            >
                                <Input
                                    name={`title-${q.seq}`}
                                    placeholder="질문의 제목을 입력하세요."
                                    bordered={false}
                                    value={q.title}
                                    onChange={handleQuestionChange}
                                />
                            </Form.Item>
                        }
                        extra={
                            <QuestionTypeDropdown
                                seq={q.seq}
                                value={q.type}
                                onChange={handleQuestionTypeChange}
                            />
                        }
                    >
                        {q.type === 'text' && <QTextType />}
                        {q.type === 'selectOne' && <QSelectOneType />}
                        {q.type === 'selectAll' && <QSelectAllType />}
                        {q.type === 'dropdown' && <QDropdownType />}
                    </Card>
                ))}

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
