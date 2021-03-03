import { useMutation, useQuery } from '@apollo/client';
import { Form, message } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { SectionsContainer, Section, ScrollToTopOnMount } from 'react-fullpage';
import LoadingSpin from '../../common/components/LoadingSpin';
import { CREATE_ANSWER, GET_FORM_BY_PUB_URL } from '../../config/queries';
import QuestionContainer from '../containers/QuestionContainer';
import { answerInitMapper, generateSectionOptions, questionMapper } from '../doConfig';
import { checkAnswerHandler } from '../tools/handler';
import FixedLogo from '../../header/components/FixedLogo';
import StartContainer from '../containers/StartContainer';
import FixedPercentView from '../components/FixedPercentView';
import SubmittedContainer from '../containers/SubmittedContainer';
import '../static/style.css';

export default function DoPage(props) {
    const { pubUrl } = props.match.params;
    const [answer, setAnswer] = useState({});
    const [done, setDone]: any = useState({
        percent: 0,
        notDone: [],
    });
    const [submitted, setSubmitted] = useState(true);
    const [form, setForm]: any = useState({});
    const [questions, setQuestions] = useState([]);
    const [isStart, setIsStart] = useState(false);

    const { data, error, loading } = useQuery(GET_FORM_BY_PUB_URL, {
        variables: {
            pubUrl,
        },
    });

    const [createAnswer] = useMutation(CREATE_ANSWER);

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

    const inputHandler = useCallback(
        (name, value) => {
            setAnswer({
                ...answer,
                [name]: value,
            });
        },
        [answer],
    );

    const onSubmit = () => {
        if (done.percent !== 100) {
            message.error(`질문 ${done.notDone.map((d) => ` ${d}번`)}에 답변하지 않았습니다.`);
            return (window.location.href = `#q${done.notDone[0]}`);
        }
        createAnswer({
            variables: {
                answer: {
                    formId: form.id,
                    content: JSON.stringify(answer),
                },
            },
        })
            .then(() => {
                setSubmitted(true);
            })
            .catch((err) => console.log(err));
    };

    const handleStartClick = useCallback(() => {
        setIsStart(true);
    }, []);

    if (error) {
        props.history.push('/?404form');
    }

    return (
        <div style={{ backgroundColor: 'white', overflow: 'hidden' }}>
            <ScrollToTopOnMount />
            <FixedLogo />
            {loading && <LoadingSpin />}
            {isStart ? (
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
                                                done={done}
                                            />
                                        </header>
                                    </Section>
                                ))}
                            </>
                        )}
                    </Form>
                </SectionsContainer>
            ) : submitted ? (
                <SubmittedContainer />
            ) : (
                <StartContainer handleStartClick={handleStartClick} form={form} />
            )}
            {!submitted && <FixedPercentView done={done} />}
        </div>
    );
}
