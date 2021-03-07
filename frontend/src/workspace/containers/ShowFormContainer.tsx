import { MinusCircleOutlined, PlusOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Modal, Button, Card, Form, Input, message, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import LoadingSpin from '../../common/components/LoadingSpin';
import Result404 from '../../common/components/Result404';
import { emptyValidatorOnUpdateForm } from '../../common/utils/validator';
import { GET_FORM_BY_ID, PUBLISH_FORM, UPDATE_FORM } from '../../config/queries';
import { FormAlertClosed, FormAlertModify, FormAlertOpen } from '../components/FormAlerts';
import QuestionTypeDropdown from '../components/QuestionTypeDropdown';
import QShowOptions from '../components/QuestionTypes/QShowOptions';
import QTextType from '../components/QuestionTypes/QTextType';
import ShowFormHeader from '../components/ShowFormHeader';

const { TextArea } = Input;
const { confirm } = Modal;

export default function ShowFormContainer({ formId, setContentAction }) {
    const [form, setForm]: any = useState({});
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
                id: data.id,
                title: data.title,
                subtitle: data.subtitle,
                pubUrl: data.pubUrl,
                status: data.status,
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
        if (questions.length >= 10) {
            return message.error('질문은 10개까지 생성할 수 있습니다.');
        }
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
    const handleSubTitleChange = useCallback(
        (e) => {
            setForm({ ...form, subtitle: e.target.value });
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
                subtitle: form.subtitle ? form.subtitle.replaceAll('\n', '<br />') : '',
                content: JSON.stringify(questions),
            };
            await emptyValidatorOnUpdateForm(updatedForm);

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
            console.log(err);
            message.error('입력값 중 빈 칸이 존재합니다. 입력값을 다시 확인하세요.');
        }
    };

    const onPublishConfirm = () => {
        confirm({
            title: '폼을 게시합니다.',
            icon: <ShareAltOutlined style={{ color: 'dodgerblue' }} />,
            content:
                '폼을 공개적으로 접근할 수 있는 주소를 생성합니다. 게시된 폼은 수정할 수 없습니다.',
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

    const onAnalysisForm = () => {
        setContentAction({
            action: 'analysisForm',
            formId,
        });
    };

    if (formError) {
        return <Result404 />;
    }

    return (
        <>
            {formLoading && <LoadingSpin />}
            {form && form.status === 'open' && <FormAlertOpen />}
            {form && form.status === 'modify' && <FormAlertModify />}
            {form && form.status === 'closed' && <FormAlertClosed />}
            {form && questions && (
                <Form onFinish={onFinish} size="large">
                    <ShowFormHeader
                        form={form}
                        onAnalysisForm={onAnalysisForm}
                        onPublishConfirm={onPublishConfirm}
                    />
                    <Input
                        autoFocus
                        name="title"
                        onChange={handleTitleChange}
                        value={form.title}
                        placeholder="새로운 폼의 이름을 입력하세요."
                        style={{ borderRadius: 5, border: 'none', marginBottom: 20 }}
                    />
                    <Form.Item name="subtitle">
                        <TextArea
                            onChange={handleSubTitleChange}
                            autoComplete="off"
                            placeholder="사용자에게 표시할 부가적인 설명을 입력하세요. (선택)"
                            autoSize={{
                                maxRows: 3,
                            }}
                            style={{ borderRadius: 5, border: 'none' }}
                        />
                    </Form.Item>
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
                            style={{ marginBottom: 20, borderRadius: 5, border: 'none' }}
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
                                style={{ borderRadius: 5 }}
                            >
                                질문 추가
                            </Button>
                        </Form.Item>
                    )}
                </Form>
            )}
        </>
    );
}
