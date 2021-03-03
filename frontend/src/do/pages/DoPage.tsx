import { useQuery } from '@apollo/client';
import { Button, Form, message, Progress } from 'antd';
import { isMobile } from 'react-device-detect';
import React, { useState, useEffect, useCallback } from 'react';
import { SectionsContainer, Section, ScrollToTopOnMount } from 'react-fullpage';
import LoadingSpin from '../../common/components/LoadingSpin';
import { GET_FORM_BY_PUB_URL } from '../../config/queries';
import QuestionContainer from '../containers/QuestionContainer';
import { answerInitMapper, generateSectionOptions, questionMapper } from '../doConfig';
import '../static/style.css';
import { checkAnswerHandler } from '../tools/handler';
import { CheckOutlined } from '@ant-design/icons';
import FixedLogo from '../../header/components/FixedLogo';

export default function DoPage(props) {
    const { pubUrl } = props.match.params;
    const [answer, setAnswer] = useState({});
    const [done, setDone]: any = useState({
        percent: 0,
        notDone: [],
    });
    const [form, setForm]: any = useState({});
    const [questions, setQuestions] = useState([]);
    const [isStart, setIsStart] = useState(false);

    const { data, error, loading } = useQuery(GET_FORM_BY_PUB_URL, {
        variables: {
            pubUrl,
        },
    });

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
            window.location.href = `#q${done.notDone[0]}`;
        }
        console.log(answer);
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
                        {/* <Section key="main">
                        <header className="App-header">
                            <h2>{form.title}</h2>
                        </header>
                    </Section> */}
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
            ) : (
                <header className="App-header Description">
                    <FixedLogo />
                    <p
                        style={{
                            fontSize: isMobile ? 'large' : 'x-large',
                            maxWidth: '100%',
                            whiteSpace: 'normal',
                            wordBreak: 'break-all',
                            fontWeight: 'bold',
                        }}
                    >
                        {form.title}
                    </p>
                    <div>
                        <Button
                            size="large"
                            id="start-btn"
                            icon={<CheckOutlined />}
                            onClick={handleStartClick}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleStartClick();
                                }
                            }}
                            autoFocus
                        >
                            시작하기
                        </Button>
                        <span className="press-enter">
                            press <span className="bold">ENTER</span>
                        </span>
                    </div>
                </header>
            )}
            <FixedLogo />
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
