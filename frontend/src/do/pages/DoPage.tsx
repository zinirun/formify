import { useQuery } from '@apollo/client';
import { Form, message, Progress } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { SectionsContainer, Section, ScrollToTopOnMount } from 'react-fullpage';
import LoadingSpin from '../../common/components/LoadingSpin';
import { GET_FORM_BY_PUB_URL } from '../../config/queries';
import QuestionContainer from '../containers/QuestionContainer';
import { generateSectionOptions, questionMapper } from '../doConfig';
import '../static/style.css';
import { checkAnswerHandler } from '../tools/handler';

export default function DoPage(props) {
    const { pubUrl } = props.match.params;
    const [answer, setAnswer] = useState({});
    const [done, setDone]: any = useState({
        percent: 0,
        notDone: [],
    });

    const [form, setForm]: any = useState({});
    const [questions, setQuestions] = useState([]);

    const { data, error, loading } = useQuery(GET_FORM_BY_PUB_URL, {
        variables: {
            pubUrl,
        },
    });

    const answerInitMapper = (data) => {
        const answer = {};
        for (let d of data) {
            answer[d.seq] = '';
        }
        return answer;
    };

    useEffect(() => {
        if (data) {
            const { id, title, createdAt, content } = data.getFormByPubUrl;
            const questionsParsed = JSON.parse(content);
            setForm({
                id,
                title,
                createdAt,
            });
            setQuestions(questionMapper(questionsParsed));
            setAnswer(answerInitMapper(questionsParsed));
        }
    }, [data]);

    const handleAnswerDone = useCallback(checkAnswerHandler, []);

    useEffect(() => {
        const { notDone, percent } = handleAnswerDone(answer);
        setDone({
            notDone,
            percent,
        });
    }, [answer, handleAnswerDone]);

    const inputHandler = (name, value) => {
        setAnswer({
            ...answer,
            [name]: value,
        });
    };

    const onSubmit = () => {
        if (done.percent !== 100) {
            message.error(`질문 ${done.notDone.map((d) => ` ${d}번`)}에 답변하지 않았습니다.`);
            window.location.href = `#q${done.notDone[0]}`;
        }
        console.log(answer);
    };

    if (error) {
        props.history.push('/?404form');
    }

    return (
        <div style={{ backgroundColor: '#f1ece2' }}>
            <ScrollToTopOnMount />
            {loading && <LoadingSpin />}
            <SectionsContainer {...generateSectionOptions(questions)}>
                <Form
                    name={`form-${form.id}`}
                    onFinish={onSubmit}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') e.preventDefault();
                    }}
                >
                    {questions && (
                        <>
                            {questions.map((item, i) => (
                                <Section key={i}>
                                    <header className="App-header">
                                        <QuestionContainer
                                            item={item}
                                            inputHandler={inputHandler}
                                        />
                                    </header>
                                </Section>
                            ))}
                        </>
                    )}
                </Form>
            </SectionsContainer>
            <div
                style={{
                    width: 100,
                    position: 'fixed',
                    zIndex: 10,
                    top: '20px',
                    right: '20px',
                }}
            >
                <Progress percent={done.percent} size="small" />
            </div>
        </div>
    );
}
