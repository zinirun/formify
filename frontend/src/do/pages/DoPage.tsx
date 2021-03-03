import { useQuery } from '@apollo/client';
import { Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { SectionsContainer, Section, ScrollToTopOnMount } from 'react-fullpage';
import LoadingSpin from '../../common/components/LoadingSpin';
import { GET_FORM_BY_PUB_URL } from '../../config/queries';
import QuestionContainer from '../containers/QuestionContainer';
import { generateSectionOptions, questionMapper } from '../doConfig';
import '../static/style.css';

export default function DoPage(props) {
    const { pubUrl } = props.match.params;
    const [obj, setObj] = useState({});

    const [form, setForm]: any = useState({});
    const [questions, setQuestions] = useState([]);

    const { data, error, loading } = useQuery(GET_FORM_BY_PUB_URL, {
        variables: {
            pubUrl,
        },
    });

    useEffect(() => {
        if (data) {
            const { title, createdAt, content } = data.getFormByPubUrl;
            setForm({
                title,
                createdAt,
            });
            setQuestions(questionMapper(JSON.parse(content)));
        }
    }, [data]);

    const inputHandler = (name, value) => {
        console.log(name, value);
        console.log(obj);
        setObj({
            ...obj,
            [name]: value,
        });
    };

    const onSubmit = (e) => {
        console.log(e);
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
                    name="form"
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
        </div>
    );
}
