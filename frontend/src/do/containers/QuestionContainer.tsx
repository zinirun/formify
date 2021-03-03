import React, { useEffect } from 'react';
import { Input, Button, Radio, Checkbox, Select } from 'antd';
import { isMobile } from 'react-device-detect';
import { CheckOutlined } from '@ant-design/icons';
import { ANIMATE_DELAY, optionsStyle, dropdownStyle } from '../doConfig';

const { TextArea } = Input;
const { Option } = Select;

export default function QuestionContainer({ item, inputHandler, done }) {
    useEffect(() => {
        document.getElementById('1')?.focus();
    }, []);

    const clickHandler = (link, i) => {
        window.location.href = `#${link}`;
        setTimeout(() => {
            document.getElementById(i.toString())?.focus();
        }, ANIMATE_DELAY);
    };

    const handleInputChange = (e) => {
        inputHandler(e.target.name, e.target.value);
    };

    const handleCheckboxChange = (name, values) => {
        inputHandler(name, values);
    };

    const handleDropdownChange = (name, value) => {
        inputHandler(name, value);
    };

    return (
        <div className="section">
            <div className="title">
                <p>
                    <span className="count bold">{item.i}.</span>
                    <span
                        className="title bold"
                        style={{ marginLeft: 5, fontSize: isMobile ? 'large' : 'x-large' }}
                    >
                        {item.title}
                    </span>
                </p>
            </div>
            <div style={{ marginBottom: '5%' }}>
                {item.type === 'text' && (
                    <TextArea
                        name={item.i}
                        onChange={handleInputChange}
                        autoComplete="off"
                        placeholder="여기에 입력하세요"
                        id={item.i}
                        className="form-text-input"
                        style={{
                            fontSize: isMobile ? 'large' : 'x-large',
                        }}
                        onPressEnter={() => clickHandler(item.link, item.i + 1)}
                        autoSize={{
                            maxRows: 6,
                        }}
                    />
                )}
                {item.type === 'selectOne' && (
                    <Radio.Group name={item.i}>
                        {item.options.map((option, idx) => (
                            <Radio
                                onChange={handleInputChange}
                                id={idx === 0 ? item.i : null}
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
                    <Checkbox.Group name={item.i} onChange={(v) => handleCheckboxChange(item.i, v)}>
                        {item.options.map((option, idx) => (
                            <Checkbox
                                id={idx === 0 ? item.i : null}
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
                        id={item.i}
                        size="large"
                        onChange={(v) => handleDropdownChange(item.i, v)}
                        placeholder="하나를 선택하세요"
                        style={{ width: '100%', fontSize: isMobile ? 'medium' : 'large' }}
                    >
                        {item.options.map((option) => (
                            <Option
                                id={item.i}
                                key={`${item.id}-${option.key}`}
                                value={option.key}
                                style={{
                                    ...dropdownStyle,
                                    fontSize: isMobile ? 'medium' : 'large',
                                }}
                            >
                                {option.value}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <div>
                {item.link === '' ? (
                    <Button
                        icon={<CheckOutlined />}
                        id="submit-btn"
                        htmlType="submit"
                        style={{
                            backgroundColor: done.percent === 100 ? 'rgb(77, 94, 255)' : 'grey',
                        }}
                    >
                        제출
                    </Button>
                ) : (
                    <div>
                        <Button
                            icon={<CheckOutlined />}
                            className="enter-btn"
                            onClick={() => clickHandler(item.link, item.i + 1)}
                        >
                            OK
                        </Button>
                        {!isMobile && (
                            <span className="press-enter">
                                press <span className="bold">ENTER</span>
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
