import { useQuery } from '@apollo/client';
import { Card } from 'antd';
import { useEffect, useState } from 'react';
import LoadingSpin from '../../common/components/LoadingSpin';
import Result404 from '../../common/components/Result404';
import { GET_ANSWERS_BY_FORM_ID, GET_FORM_BY_ID } from '../../config/queries';

export default function AnalysisContainer({ formId, setContentAction }) {
    const [form, setForm]: any = useState({});
    const [questions, setQuestions]: any = useState([]);
    const [answers, setAnswers] = useState([]);
    const [analyzed, setAnalyzed] = useState([]);
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

    if (formError) {
        return <Result404 />;
    }

    const initDataToAnalysis = () => {
        const data = {};
        for (let q of questions) {
            data[q.seq] = {
                id: q.seq,
                title: q.title,
                type: q.type,
                result: {
                    texts: q.type === 'text' ? [] : null,
                    options:
                        q.type === 'text'
                            ? null
                            : {
                                  ...q.options.map((o) => {
                                      return {
                                          ...o,
                                          count: 0,
                                      };
                                  }),
                              },
                },
            };
        }
        return data;
    };

    /*
    const analysisData = async () => {
        const data = await initDataToAnalysis();
        for (let answer of answers){
            for (let question of questions){
                switch(question.type){
                    case "selectOne":
                        data[question.seq].result.options[??].count += 1;
                        break;
                    case "selectAll":
                    default:
                }
            }
        }
    };

    console.log(analysisData());
    */

    console.log(answers);
    console.log(questions);

    return (
        <>
            {(formLoading || answerLoading) && <LoadingSpin />}
            {form && answers && (
                <>
                    <h3>{form.title}</h3>
                    {questions.map((q) => (
                        <Card key={q.seq} title={q.title} style={{ marginBottom: 10 }}></Card>
                    ))}
                </>
            )}
        </>
    );
}
