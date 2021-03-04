import React, { useEffect } from 'react';
import { Input, Button, Radio, Checkbox, Space } from 'antd';
import { isMobile } from 'react-device-detect';
import { CheckOutlined } from '@ant-design/icons';
import { ANIMATE_DELAY, optionsStyle } from '../doConfig';

const { TextArea } = Input;

const ALPHA_HOTKEY = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h',
    8: 'i',
    9: 'j',
};

const ALPHA_TO_KEY = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
    i: 8,
    j: 9,
};

export default function QuestionContainer({ item, inputHandler, done }) {
    useEffect(() => {
        document.getElementById('1-0')?.focus();
    }, []);

    const clickHandler = (link, i) => {
        window.location.href = `#${link}`;
        setTimeout(() => {
            document.getElementById(`${i}-0`)?.focus();
        }, ANIMATE_DELAY);
    };

    const handleInputChange = (e) => {
        inputHandler(e.target.name, e.target.value);
    };

    const handleCheckboxChange = (name, values) => {
        inputHandler(name, values);
    };

    const handleKeyPress = (e, link, i, isHotkey?) => {
        if (e.key === 'Enter') {
            clickHandler(link, i);
        }
        if (e.code === 'Enter' && e.ctrlKey) {
            document.getElementById('submit-btn')?.click();
        }
        if (isHotkey && ALPHA_TO_KEY.hasOwnProperty(e.key.toLowerCase())) {
            const key = ALPHA_TO_KEY[e.key.toLowerCase()];
            document.getElementById(`${i - 1}-${key}`)?.click();
        }
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
                        id={`${item.i}-0`}
                        className="form-text-input"
                        style={{
                            fontSize: isMobile ? 'large' : 'x-large',
                        }}
                        onKeyPress={(e) => handleKeyPress(e, item.link, item.i + 1)}
                        autoSize={{
                            maxRows: 6,
                        }}
                    />
                )}
                {item.type === 'selectOne' && (
                    <Radio.Group name={item.i}>
                        {item.options.map((option) => (
                            <Space
                                key={`${item.id}-${option.key}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    verticalAlign: 'baseline',
                                }}
                            >
                                {!isMobile && (
                                    <div className="alpha-hotkey">
                                        {ALPHA_HOTKEY[option.key].toUpperCase()}
                                    </div>
                                )}
                                <Radio
                                    onChange={handleInputChange}
                                    key={`${item.i}-${option.key}`}
                                    id={`${item.i}-${option.key}`}
                                    style={optionsStyle}
                                    value={option.key}
                                    onKeyPress={(e) =>
                                        handleKeyPress(e, item.link, item.i + 1, true)
                                    }
                                >
                                    {option.value}
                                </Radio>
                            </Space>
                        ))}
                    </Radio.Group>
                )}
                {item.type === 'selectAll' && (
                    <Checkbox.Group name={item.i} onChange={(v) => handleCheckboxChange(item.i, v)}>
                        {item.options.map((option) => (
                            <Space key={`${item.id}-${option.key}`} style={{ display: 'flex' }}>
                                {!isMobile && (
                                    <div className="alpha-hotkey">
                                        {ALPHA_HOTKEY[option.key].toUpperCase()}
                                    </div>
                                )}
                                <Checkbox
                                    id={`${item.i}-${option.key}`}
                                    value={option.key}
                                    style={optionsStyle}
                                    onKeyPress={(e) =>
                                        handleKeyPress(e, item.link, item.i + 1, true)
                                    }
                                >
                                    {option.value}
                                </Checkbox>
                            </Space>
                        ))}
                    </Checkbox.Group>
                )}
            </div>
            <div>
                {item.link === '' ? (
                    <div>
                        <Button
                            icon={<CheckOutlined />}
                            id="submit-btn"
                            htmlType="submit"
                            style={{
                                backgroundColor: done.percent === 100 ? 'rgb(77, 94, 255)' : 'grey',
                                borderColor: done.percent === 100 ? 'rgb(77, 94, 255)' : 'grey',
                            }}
                        >
                            제출
                        </Button>
                        {!isMobile && (
                            <span className="press-enter">
                                press <span className="bold">CTRL + ENTER</span>
                            </span>
                        )}
                    </div>
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

/* NOT SENSIBLE - DEPRECATED
const handleDropdownChange = (name, value) => {
    inputHandler(name, value);
};
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
*/
