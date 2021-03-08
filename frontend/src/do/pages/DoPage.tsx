import { useMutation, useQuery } from '@apollo/client';
import { Form, message } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { SectionsContainer, Section, ScrollToTopOnMount } from 'react-fullpage';
import LoadingSpin from '../../common/components/LoadingSpin';
import { CREATE_ANSWER, GET_FORM_BY_PUB_URL } from '../../config/queries';
import QuestionContainer from '../containers/QuestionContainer';
import { answerInitMapper, generateSectionOptions, questionMapper } from '../doConfig';
import { checkAnswerHandler, etcValueMapper } from '../tools/handler';
import { FixedLogo } from '../../header/components/Logo';
import ClosedContainer from '../containers/ClosedContainer';
import StartContainer from '../containers/StartContainer';
import FixedPercentView from '../components/FixedPercentView';
import SubmittedContainer from '../containers/SubmittedContainer';
import '../static/style.css';
import { isMobile } from 'react-device-detect';
import { useDarkreader } from 'react-darkreader';

export default function DoPage(props) {
    const { pubUrl } = props.match.params;
    const [isDark, { toggle }] = useDarkreader(false);
    const [answer, setAnswer] = useState({});
    const [etcValue, setEtcValue]: any = useState({});
    const [status, setStatus] = useState('start');
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

    const [createAnswer] = useMutation(CREATE_ANSWER);

    useEffect(() => {
        if (data) {
            const { id, title, subtitle, status, createdAt, content } = data.getFormByPubUrl;
            const questionsParsed = JSON.parse(content);
            document.title = `${title} - Formify 폼`;
            setForm({
                id,
                title,
                subtitle,
                createdAt,
                status,
            });
            setQuestions(questionMapper(questionsParsed));
            setAnswer(answerInitMapper(questionsParsed));
            if (!isMobile && status !== 'closed')
                message.info(`키보드만을 이용해서 답변할 수 있습니다.`);
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

    const etcValueHandler = useCallback(
        (key, value) => {
            setEtcValue({
                ...etcValue,
                [key]: value,
            });
        },
        [etcValue],
    );

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
        document.getElementById('submit-btn')?.setAttribute('disabled', 'true');
        createAnswer({
            variables: {
                answer: {
                    formId: form.id,
                    content: JSON.stringify(answer),
                    etcValue: etcValueMapper(etcValue),
                },
            },
        })
            .then(() => {
                setStatus('submitted');
            })
            .catch((err) => console.log(err));
    };

    const handleStartClick = useCallback(() => {
        setStatus('progress');
    }, []);

    if (error) {
        props.history.push('/?404form');
    }

    return (
        <div
            style={{
                backgroundColor: 'white',
                overflow: 'hidden',
            }}
        >
            <ScrollToTopOnMount />
            <FixedLogo />
            {loading && <LoadingSpin />}
            {status === 'start' &&
                form &&
                (form.status === 'open' ? (
                    <StartContainer handleStartClick={handleStartClick} form={form} />
                ) : (
                    form.status === 'closed' && <ClosedContainer />
                ))}
            {status === 'progress' && form && (
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
                                                etcValue={etcValue}
                                                etcValueHandler={etcValueHandler}
                                                done={done}
                                            />
                                        </header>
                                    </Section>
                                ))}
                            </>
                        )}
                    </Form>
                </SectionsContainer>
            )}
            {status === 'submitted' && <SubmittedContainer />}
            <FixedPercentView status={status} isDark={isDark} toggle={toggle} done={done} />
        </div>
    );
}
