import React, { useCallback, useState } from 'react';
import { Form, Input, Button, Card, Space, Tooltip } from 'antd';
import QuestionTypeDropdown from '../components/QuestionTypeDropdown';
import QTextType from '../components/QuestionTypes/QTextType';
import QOptions from '../components/QuestionTypes/QOptions';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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
    const removeItem = useCallback(
        (key) => {
            const updated = questions.filter((q) => q.seq !== key);
            setQuestions(updated);
        },
        [questions],
    );
    const addItem = useCallback(() => {
        const updated = [
            ...questions,
            {
                title: '',
                seq: questions[questions.length - 1].seq + 1,
                type: 'text',
                options: [''],
            },
        ];
        setQuestions(updated);
    }, [questions]);
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
    const handleQuestionOptionsChange = useCallback(
        (seq, options) => {
            const updated = questions.map((q) => {
                if (q.seq === seq) {
                    return {
                        ...q,
                        options,
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
    return (
        <Form name="newform" onFinish={onFinish} onFinishFailed={onFinishFailed} size="large">
            <Form.Item
                name="title"
                rules={[{ required: true, message: '폼의 이름을 입력하세요.' }]}
            >
                <Input
                    autoFocus
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
                            name={`title-${q.seq}`}
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
                        <>
                            <QuestionTypeDropdown
                                seq={q.seq}
                                value={q.type}
                                onChange={handleQuestionTypeChange}
                            />
                            {q.seq !== 1 && (
                                <Tooltip title="질문 삭제">
                                    <MinusCircleOutlined
                                        style={{
                                            color: 'crimson',
                                            fontSize: '1.0rem',
                                            marginLeft: 10,
                                        }}
                                        onClick={() => removeItem(q.seq)}
                                    />
                                </Tooltip>
                            )}
                        </>
                    }
                    style={{ marginBottom: 10 }}
                >
                    {q.type === 'text' ? (
                        <QTextType />
                    ) : (
                        <QOptions seq={q.seq} onChange={handleQuestionOptionsChange} />
                    )}
                </Card>
            ))}

            <Form.Item>
                <Button type="dashed" onClick={() => addItem()} block icon={<PlusOutlined />}>
                    질문 추가
                </Button>
            </Form.Item>

            <Form.Item style={{ marginTop: 10, float: 'right' }}>
                <Space>
                    <Button>미리보기</Button>
                    <Button type="primary" htmlType="submit">
                        폼 생성
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}
