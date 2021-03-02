import React, { useState, useEffect, useRef } from 'react';
import { Input, Button } from 'antd';
import { isMobile } from 'react-device-detect';
import { ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import { ANIMATE_DELAY } from '../doConfig';

export default function QuestionContainer({ item, isSubmit, inputDataHandler, submitBtnHandler }) {
    const [value, setValue] = useState({});

    useEffect(() => {
        document.getElementById('1')?.focus();
    }, []);

    const clickHandler = (link, i) => {
        window.location.href = `#${link}`;
        setTimeout(() => {
            document.getElementById(i.toString())?.focus();
        }, ANIMATE_DELAY);
    };

    const inputHandler = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
        inputDataHandler(e.target.name, e.target.value);
    };

    const submitHandler = () => {
        submitBtnHandler();
    };

    return (
        <div className="section">
            <div className="title">
                <h2>
                    <span className="count">
                        {item.i}
                        <ArrowRightOutlined style={{ marginLeft: 5 }} />
                    </span>
                    <span className="title" style={{ marginLeft: 5 }}>
                        {item.title}
                    </span>
                </h2>
            </div>
            <Input
                placeholder="여기에 답변을 입력하세요"
                name={item.id}
                id={item.i}
                className="do-form-input"
                onPressEnter={() => clickHandler(item.link, item.i + 1)}
                onChange={inputHandler}
            />
            <br />
            {isSubmit ? (
                <Button icon={<CheckOutlined />} id="submit-btn" onClick={submitHandler}>
                    제출
                </Button>
            ) : (
                <div>
                    <Button
                        hidden={isMobile}
                        icon={<CheckOutlined />}
                        id="enter-btn"
                        onClick={() => clickHandler(item.link, item.i + 1)}
                    >
                        OK
                    </Button>
                    <span className="press-enter">
                        {' '}
                        press <span className="bold">ENTER</span>
                    </span>
                </div>
            )}
        </div>
    );
}
