import { useQuery } from '@apollo/client';
import { Card, Collapse, message } from 'antd';
import { useEffect, useState } from 'react';
import LoadingSpin from '../../common/components/LoadingSpin';
import Result404 from '../../common/components/Result404';
import { GET_ANSWERS_BY_FORM_ID, GET_FORM_BY_ID } from '../../config/queries';
import { analysisAnswerData } from '../tools/analyzer';
import AnalSelects from '../components/Analysis/AnalSelects';
import AnalTexts from '../components/Analysis/AnalTexts';
import AnalHeader from '../components/Analysis/AnalHeader';
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
                id: data.id,
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

    if (formError) {
        return <Result404 />;
    }

    if (answerError) {
        message.error('답변 데이터를 가져오는 중 문제가 발생했습니다.');
    }

    console.log(questions);
    console.log(answers);

    return (
        <>
            {(formLoading || answerLoading) && <LoadingSpin />}
            {form && answers && (
                <AnalHeader
                    setContentAction={setContentAction}
                    form={form}
                    answerCount={answers.length}
                />
            )}
            {answers && (
                <>
                    {analyzed && (
                        <Collapse style={{ marginBottom: 20, borderRadius: 5 }}>
                            <Panel key="personal-panel" header="개인별 답변"></Panel>
                        </Collapse>
                    )}
                    {analyzed &&
                        questions.map((q) => (
                            <Card
                                key={q.seq}
                                title={<span style={{ fontWeight: 'bold' }}>{q.title}</span>}
                                style={{ marginBottom: 20, borderRadius: 5 }}
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
