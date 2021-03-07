import { useQuery } from '@apollo/client';
import { Form, message } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import { SectionsContainer, Section, ScrollToTopOnMount } from 'react-fullpage';
import LoadingSpin from '../../common/components/LoadingSpin';
import { GET_FORM_BY_ID } from '../../config/queries';
import QuestionContainer from '../containers/QuestionContainer';
import { answerInitMapper, generateSectionOptions, questionMapper } from '../doConfig';
import { checkAnswerHandler } from '../tools/handler';
import { FixedLogo } from '../../header/components/Logo';
import StartContainer from '../containers/StartContainer';
import FixedPercentView from '../components/FixedPercentView';
import '../static/style.css';
import { isMobile } from 'react-device-detect';
import { useDarkreader } from 'react-darkreader';
import FixedIsPreview from '../components/FixedIsPreview';
import PreviewSubmittedContainer from '../containers/PreviewSubmittedContainer';

export default function DoPreviewPage(props) {
    const { formId } = props.match.params;
    const [isDark, { toggle }] = useDarkreader(false);
    const [answer, setAnswer] = useState({});
    const [status, setStatus] = useState('start');
    const [done, setDone]: any = useState({
        percent: 0,
        notDone: [],
    });
    const [form, setForm]: any = useState({});
    const [questions, setQuestions] = useState([]);

    const { data, error, loading } = useQuery(GET_FORM_BY_ID, {
        variables: {
            id: parseInt(formId),
        },
    });

    useEffect(() => {
        if (data) {
            const { id, title, subtitle, status, createdAt, content } = data.getFormById;
            const questionsParsed = JSON.parse(content);
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
        setStatus('submitted');
    };

    const handleStartClick = useCallback(() => {
        setStatus('progress');
    }, []);

    if (error) {
        console.log(error);
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
            <FixedIsPreview />
            {loading && <LoadingSpin />}
            {status === 'start' && form && (
                <StartContainer handleStartClick={handleStartClick} form={form} />
            )}
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
            {status === 'submitted' && <PreviewSubmittedContainer />}
            <FixedPercentView status={status} isDark={isDark} toggle={toggle} done={done} />
        </div>
    );
}
