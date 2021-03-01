import React, { useCallback, useState } from 'react';
import { Form, Input, Button, Card, Space, Tooltip, message, Alert } from 'antd';
import QuestionTypeDropdown from '../components/QuestionTypeDropdown';
import QTextType from '../components/QuestionTypes/QTextType';
import QOptions from '../components/QuestionTypes/QOptions';
import { EditOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { CREATE_FORM } from '../../config/queries';

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
    const [createForm] = useMutation(CREATE_FORM);
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
    const handleQuestionTitleChange = useCallback(
        (e, seq) => {
            const { value } = e.target;
            const updated = questions.map((q) => {
                if (q.seq === seq) {
                    return {
                        ...q,
                        title: value,
                    };
                } else return q;
            });
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
    const onFinish = () => {
        const newForm = {
            groupId: parseInt(props.groupId),
            title: form.title,
            content: JSON.stringify(questions),
        };
        createForm({
            variables: {
                form: newForm,
            },
        })
            .then((res) => {
                const { formId } = res.data.createForm;
                window.location.href = `/workspace?f=${formId}&g=${props.groupId}`;
            })
            .catch((err) => {
                message.error(`폼을 생성하는 중 에러가 발생했습니다. [${err}]`);
            });
    };
    return (
        <Form onFinish={onFinish} size="large">
            <Alert
                message="새로운 폼"
                description="폼을 생성하면 수정중인 폼으로 저장됩니다. 수정 중인 폼에서 최종 검토 후 폼을 게시하세요."
                type="info"
                icon={<EditOutlined />}
                showIcon
                closable
                style={{ marginBottom: 20 }}
            />
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
                                onChange={(e) => handleQuestionTitleChange(e, q.seq)}
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
                    <Button>임시 저장</Button>
                    <Button type="primary" htmlType="submit">
                        폼 생성
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}
