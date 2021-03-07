import { useCallback, useState } from 'react';
import { Modal, Form, Input, Button, Card, Space, Tooltip, message, Alert } from 'antd';
import QuestionTypeDropdown from '../components/QuestionTypeDropdown';
import QTextType from '../components/QuestionTypes/QTextType';
import QOptions from '../components/QuestionTypes/QOptions';
import {
    EditOutlined,
    EyeOutlined,
    FileAddOutlined,
    MinusCircleOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { CREATE_FORM } from '../../config/queries';

const { TextArea } = Input;
const { confirm } = Modal;

export default function AddFormContainer(props) {
    const [form, setForm] = useState({
        title: '',
        subtitle: '',
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
    const triggerCreateForm = () => {
        const newForm = {
            groupId: parseInt(props.groupId),
            title: form.title,
            subtitle: form.subtitle.replaceAll('\n', '<br />'),
            content: JSON.stringify(questions),
        };
        createForm({
            variables: {
                form: newForm,
            },
        })
            .then((res) => {
                const { id } = res.data.createForm;
                window.location.href = `/workspace?f=${id}&g=${props.groupId}`;
            })
            .catch((err) => {
                message.error(`폼을 생성하는 중 에러가 발생했습니다. [${err}]`);
            });
    };
    const onFinish = () => {
        confirm({
            title: '폼을 생성합니다.',
            icon: <FileAddOutlined style={{ color: 'dodgerblue' }} />,
            content: '저장된 폼은 수정할 수 있습니다. 최종 검토 후 폼을 게시하세요.',
            okText: '폼 생성',
            cancelText: '취소',
            onOk() {
                triggerCreateForm();
            },
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
                    style={{ borderRadius: 5, border: 'none' }}
                />
            </Form.Item>

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
                    style={{ marginBottom: 20, borderRadius: 5, border: 'none' }}
                >
                    {q.type === 'text' ? (
                        <QTextType />
                    ) : (
                        <QOptions seq={q.seq} onChange={handleQuestionOptionsChange} />
                    )}
                </Card>
            ))}

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

            <Form.Item style={{ marginTop: 10, float: 'right' }}>
                <Space>
                    <Button icon={<EyeOutlined />}>미리보기</Button>
                    <Button type="primary" htmlType="submit">
                        폼 생성
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
}
