import React, { useState, useEffect } from 'react';
import { Input, Button, Radio, Checkbox, Select, Form } from 'antd';
import { isMobile } from 'react-device-detect';
import { ArrowRightOutlined, CheckOutlined } from '@ant-design/icons';
import { ANIMATE_DELAY, optionsStyle, dropdownStyle } from '../doConfig';

const { Option } = Select;

export default function QuestionContainer({ item, inputHandler }) {
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

    const handleChange = (e) => {
        console.log(e.target);
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
        inputHandler(e.target.name, e.target.value);
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
            <div style={{ marginBottom: 15 }}>
                <Form.Item name={item.i}>
                    {item.type === 'text' && (
                        <Input
                            autoComplete="off"
                            placeholder="여기에 입력하세요"
                            id={item.i}
                            className="form-text-input"
                            onPressEnter={() => clickHandler(item.link, item.i + 1)}
                        />
                    )}
                    {item.type === 'selectOne' && (
                        <Radio.Group>
                            {item.options.map((option) => (
                                <Radio
                                    id={item.i}
                                    key={`${item.id}-${option.key}`}
                                    style={optionsStyle}
                                    value={option.key}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            clickHandler(item.link, item.i + 1);
                                        }
                                    }}
                                >
                                    {option.value}
                                </Radio>
                            ))}
                        </Radio.Group>
                    )}
                    {item.type === 'selectAll' && (
                        <Checkbox.Group>
                            {item.options.map((option) => (
                                <Checkbox
                                    id={item.i}
                                    onChange={handleChange}
                                    key={`${item.id}-${option.key}`}
                                    value={option.key}
                                    style={optionsStyle}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            clickHandler(item.link, item.i + 1);
                                        }
                                    }}
                                >
                                    {option.value}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    )}
                    {item.type === 'dropdown' && (
                        <Select
                            size="large"
                            defaultValue={item.options[0].key}
                            style={{ width: '100%', fontSize: 'large' }}
                        >
                            {item.options.map((option) => (
                                <Option
                                    id={item.i}
                                    key={`${item.id}-${option.key}`}
                                    value={option.key}
                                    style={dropdownStyle}
                                >
                                    {option.value}
                                </Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
            </div>
            <div>
                {item.link === '' ? (
                    <Button icon={<CheckOutlined />} id="submit-btn" htmlType="submit">
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
        </div>
    );
}
