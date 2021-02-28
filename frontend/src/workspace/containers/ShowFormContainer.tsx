import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Card, Form, Input, message, Space, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import LoadingSpin from '../../common/components/LoadingSpin';
import { CREATE_FORM, GET_FORM_BY_ID } from '../../config/queries';
import QuestionTypeDropdown from '../components/QuestionTypeDropdown';
import QShowOptions from '../components/QuestionTypes/QShowOptions';
import QTextType from '../components/QuestionTypes/QTextType';

export default function ShowFormContainer({ formId, groupId }) {
    const [form, setForm] = useState({
        title: '',
    });
    const [questions, setQuestions]: any = useState([]);
    const [createForm] = useMutation(CREATE_FORM);
    const { data: formData, error: formError, loading: formLoading } = useQuery(GET_FORM_BY_ID, {
        variables: {
            id: parseInt(formId),
        },
    });
    useEffect(() => {
        if (formData) {
            const data = formData.getFormById;
            setForm({
                title: data.title,
            });
            setQuestions(JSON.parse(data.content));
        }
    }, [formData]);
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
            groupId: parseInt(groupId),
            title: form.title,
            content: JSON.stringify(questions),
        };
        createForm({
            variables: {
                form: newForm,
            },
        })
            .then(() => {
                window.location.href = '/workspace';
            })
            .catch((err) => {
                message.error(`폼을 생성하는 중 에러가 발생했습니다. [${err}]`);
            });
    };

    return (
        <div>
            {formLoading && <LoadingSpin />}
            {!formLoading && form && questions && (
                <Form name="form" onFinish={onFinish} size="large">
                    <Input
                        autoFocus
                        value={form.title}
                        name="title"
                        onChange={handleTitleChange}
                        placeholder="폼의 이름을 입력하세요."
                    />

                    {questions.map((q) => (
                        <Card
                            key={q.seq}
                            title={
                                <Input
                                    name={`title-${q.seq}`}
                                    placeholder="질문의 제목을 입력하세요."
                                    value={q.title}
                                    bordered={false}
                                    onChange={(e) => handleQuestionTitleChange(e, q.seq)}
                                />
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
                                <QShowOptions
                                    seq={q.seq}
                                    onChange={handleQuestionOptionsChange}
                                    data={q.options}
                                />
                            )}
                        </Card>
                    ))}

                    <Form.Item>
                        <Button
                            type="dashed"
                            onClick={() => addItem()}
                            block
                            icon={<PlusOutlined />}
                        >
                            질문 추가
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ marginTop: 10, float: 'right' }}>
                        <Space>
                            <Button>미리보기</Button>
                            <Button type="primary" htmlType="submit">
                                폼 수정
                            </Button>
                            <Button type="primary">폼 게시 시작</Button>
                        </Space>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
}
