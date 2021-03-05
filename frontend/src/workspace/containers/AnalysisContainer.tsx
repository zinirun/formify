import { useQuery } from '@apollo/client';
import { Button, Card, Collapse, Descriptions, message, PageHeader } from 'antd';
import { useEffect, useState } from 'react';
import LoadingSpin from '../../common/components/LoadingSpin';
import Result404 from '../../common/components/Result404';
import { GET_ANSWERS_BY_FORM_ID, GET_FORM_BY_ID } from '../../config/queries';
import { analysisAnswerData } from '../tools/analyzer';
import AnalSelects from '../components/Analysis/AnalSelects';
import AnalTexts from '../components/Analysis/AnalTexts';
import moment from 'moment';
const { Panel } = Collapse;

export default function AnalysisContainer({ formId, setContentAction }) {
    const [form, setForm]: any = useState({});
    const [questions, setQuestions]: any = useState([]);
    const [answers, setAnswers]: any = useState([]);
    const [analyzed, setAnalyzed]: any = useState([]);
    const [charts, setCharts]: any = useState({});
    const { data: formData, error: formError, loading: formLoading } = useQuery(GET_FORM_BY_ID, {
        variables: {
            id: parseInt(formId),
        },
    });
    const { data: answerData, error: answerError, loading: answerLoading } = useQuery(
        GET_ANSWERS_BY_FORM_ID,
        {
            variables: {
                formId: parseInt(formId),
            },
        },
    );

    useEffect(() => {
        if (formData) {
            const data = formData.getFormById;
            setForm({
                title: data.title,
                pubUrl: data.pubUrl,
                createdAt: data.createdAt,
                status: data.status,
            });
            setQuestions(JSON.parse(data.content));
        }
    }, [formData]);

    useEffect(() => {
        if (answerData) {
            const data = answerData.getAnswersByFormId;
            setAnswers(
                data.map((d) => {
                    return {
                        id: d.id,
                        answer: JSON.parse(d.content),
                    };
                }),
            );
        }
    }, [answerData]);

    useEffect(() => {
        if (questions && answers) {
            analysisAnswerData(questions, answers)
                .then(({ data, configs }) => {
                    setAnalyzed(data);
                    setCharts(configs);
                })
                .catch(() => message.error('답변 데이터를 처리하는 중 문제가 발생했습니다.'));
        }
    }, [questions, answers]);

    const handleGoBack = () => {
        setContentAction({
            action: 'showForm',
            formId,
            groupId: -1,
        });
    };

    const dateMapper = (date) => {
        return moment(date).format('YYYY년 MM월 DD일 hh:mm');
    };

    if (formError) {
        return <Result404 />;
    }

    if (answerError) {
        message.error('답변 데이터를 가져오는 중 문제가 발생했습니다.');
    }

    return (
        <>
            {(formLoading || answerLoading) && <LoadingSpin />}
            {form && (
                <PageHeader
                    onBack={handleGoBack}
                    title={form.title}
                    subTitle="결과 분석"
                    extra={<Button type="primary">EXCEL 다운로드</Button>}
                >
                    <Descriptions size="small" column={3}>
                        <Descriptions.Item label="생성일">
                            {dateMapper(form.createdAt)}
                        </Descriptions.Item>
                        <Descriptions.Item label="상태">
                            {form.status === 'open' && <span>게시됨</span>}
                            {form.status === 'closed' && <span>종료됨</span>}
                        </Descriptions.Item>
                        {answers ? (
                            <Descriptions.Item label="답변">{answers.length}개</Descriptions.Item>
                        ) : (
                            <LoadingSpin />
                        )}
                    </Descriptions>
                </PageHeader>
            )}
            {answers && (
                <>
                    {analyzed && (
                        <Collapse style={{ marginBottom: 20 }}>
                            <Panel key="personal-panel" header="개인별 답변"></Panel>
                        </Collapse>
                    )}
                    {analyzed &&
                        questions.map((q) => (
                            <Card
                                key={q.seq}
                                title={<span style={{ fontWeight: 'bold' }}>{q.title}</span>}
                                style={{ marginBottom: 20 }}
                            >
                                {(q.type === 'selectOne' || q.type === 'selectAll') &&
                                    (charts[q.seq] ? (
                                        <AnalSelects config={charts[q.seq]} />
                                    ) : (
                                        <LoadingSpin />
                                    ))}
                                {q.type === 'text' &&
                                    (analyzed[q.seq] ? (
                                        <AnalTexts texts={analyzed[q.seq].result.texts} />
                                    ) : (
                                        <LoadingSpin />
                                    ))}
                            </Card>
                        ))}
                </>
            )}
        </>
    );
}
