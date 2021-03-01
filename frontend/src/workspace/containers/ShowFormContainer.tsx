import {
    CheckOutlined,
    EditOutlined,
    FormOutlined,
    MinusCircleOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Modal, Button, Card, Form, Input, message, Space, Tooltip, Alert } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import LoadingSpin from '../../common/components/LoadingSpin';
import { emptyValidator } from '../../common/utils/validator';
import { GET_FORM_BY_ID, PUBLISH_FORM, UPDATE_FORM } from '../../config/queries';
import QuestionTypeDropdown from '../components/QuestionTypeDropdown';
import QShowOptions from '../components/QuestionTypes/QShowOptions';
import QTextType from '../components/QuestionTypes/QTextType';

const { confirm } = Modal;

export default function ShowFormContainer({ formId, groupId }) {
    const [form, setForm] = useState({
        title: '',
        pubUrl: null,
    });
    const [questions, setQuestions]: any = useState([]);
    const [updateForm] = useMutation(UPDATE_FORM);
    const [publishForm] = useMutation(PUBLISH_FORM);
    const {
        data: formData,
        error: formError,
        loading: formLoading,
        refetch: formRefetch,
    } = useQuery(GET_FORM_BY_ID, {
        variables: {
            id: parseInt(formId),
        },
    });
    useEffect(() => {
        if (formData) {
            const data = formData.getFormById;
            setForm({
                title: data.title,
                pubUrl: data.pubUrl,
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
            if (form.pubUrl) return;
            setForm({ ...form, title: e.target.value });
        },
        [form],
    );
    const handleQuestionTitleChange = useCallback(
        (e, seq) => {
            if (form.pubUrl) return;
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
        [questions, form.pubUrl],
    );
    const handleQuestionTypeChange = useCallback(
        (value, seq) => {
            if (form.pubUrl) return;
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
        [questions, form.pubUrl],
    );
    const handleQuestionOptionsChange = useCallback(
        (seq, options) => {
            if (form.pubUrl) return;
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
        [questions, form.pubUrl],
    );

    const onFinish = async () => {
        try {
            const updatedForm = {
                title: form.title,
                content: JSON.stringify(questions),
            };
            await emptyValidator(updatedForm);

            updateForm({
                variables: {
                    id: parseInt(formId),
                    form: updatedForm,
                },
            })
                .then(() => {
                    formRefetch();
                    message.success('폼이 수정되었습니다.');
                })
                .catch((err) => {
                    message.error(`폼을 수정하는 중 오류가 발생했습니다. [${err}]`);
                });
        } catch (err) {
            message.error('입력값 중 빈 칸이 존재합니다. 입력값을 다시 확인하세요.');
        }
    };

    const onPublishConfirm = () => {
        confirm({
            title: '폼을 공개적으로 게시합니다.',
            icon: <FormOutlined />,
            content: '게시된 폼은 수정할 수 없습니다.',
            okText: '폼 게시 시작',
            cancelText: '취소',
            onOk() {
                triggerPublishForm();
            },
        });
    };

    const triggerPublishForm = () => {
        publishForm({
            variables: {
                id: parseInt(formId),
            },
        })
            .then((res) => {
                formRefetch();
                const { pubUrl } = res.data.publishForm;
                message.success(`폼이 게시되었습니다. [${pubUrl}]`);
            })
            .catch((err) => {
                console.info(err);
                message.error(`폼을 게시하는 중 오류가 발생했습니다. [${err}]`);
            });
    };

    const onOpenForm = (pubUrl: string | null) => {
        pubUrl && window.open(`/do/${pubUrl}`);
    };

    return (
        <>
            {formLoading && <LoadingSpin />}
            {!formLoading && form && form.pubUrl ? (
                <Alert
                    message="게시된 폼"
                    description="이 폼은 게시되었으며 답변을 처리할 수 있습니다."
                    type="info"
                    icon={<CheckOutlined />}
                    showIcon
                    closable
                    style={{ marginBottom: 20 }}
                />
            ) : (
                <Alert
                    message="수정 중인 폼"
                    description="이 폼은 수정 중인 상태입니다. 게시 준비가 완료되면 폼 게시를 시작하세요."
                    type="warning"
                    icon={<EditOutlined />}
                    showIcon
                    closable
                    style={{ marginBottom: 20 }}
                />
            )}
            {!formLoading && form && questions && (
                <Form onFinish={onFinish} size="large">
                    <Input
                        autoFocus
                        value={form.title}
                        name="title"
                        onChange={handleTitleChange}
                        placeholder="폼의 이름을 입력하세요."
                        style={{ marginBottom: 20 }}
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
                                    {q.seq !== 1 && !form.pubUrl && (
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
                                    isPublished={form.pubUrl ? true : false}
                                />
                            )}
                        </Card>
                    ))}

                    {!form.pubUrl && (
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
                    )}

                    <Form.Item style={{ marginTop: 10, float: 'right' }}>
                        <Space>
                            <Button>미리보기</Button>
                            {form.pubUrl ? (
                                <Button type="primary" onClick={() => onOpenForm(form.pubUrl)}>
                                    게시된 폼 열기
                                </Button>
                            ) : (
                                <>
                                    <Button type="primary" htmlType="submit">
                                        폼 수정
                                    </Button>
                                    <Button type="primary" onClick={onPublishConfirm}>
                                        폼 게시 시작
                                    </Button>
                                </>
                            )}
                        </Space>
                    </Form.Item>
                </Form>
            )}
        </>
    );
}
