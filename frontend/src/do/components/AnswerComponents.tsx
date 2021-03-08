import { useState } from 'react';
import { Checkbox, Radio, Space, Input } from 'antd';
import { isMobile } from 'react-device-detect';
import { ALPHA_HOTKEY, optionsStyle } from '../doConfig';

const { TextArea } = Input;

function AnswerRadio({ item, handleInputChange, handleEtcInputChange, etcValue, handleKeyPress }) {
    const [selectedEtc, setSelectedEtc] = useState(false);
    const handleChange = (e) => {
        const { value } = e.target;
        handleInputChange(e);
        if (value === 99) {
            setSelectedEtc(true);
            return;
        }
        setSelectedEtc(false);
    };
    return (
        <Radio.Group name={item.i}>
            {item.options.map((option) => (
                <div key={`${item.id}-${option.key}`}>
                    {option.key === 99 ? (
                        <Space
                            style={{
                                display: 'flex',
                            }}
                        >
                            {!isMobile && (
                                <div className="alpha-hotkey">
                                    {ALPHA_HOTKEY[option.key].toUpperCase()}
                                </div>
                            )}
                            <Radio
                                onChange={handleChange}
                                key={`${item.i}-${option.key}`}
                                id={`${item.i}-${option.key}`}
                                style={optionsStyle}
                                value={option.key}
                                onKeyPress={(e) => handleKeyPress(e, item.link, item.i + 1, true)}
                            >
                                {selectedEtc ? (
                                    <Input
                                        style={{
                                            borderRadius: 5,
                                            fontSize: '1.05rem',
                                            width: '95%',
                                        }}
                                        id={`etc-${item.i}`}
                                        name={item.i}
                                        value={etcValue[item.i] || ''}
                                        onKeyPress={(e) =>
                                            handleKeyPress(e, item.link, item.i + 1, true, true)
                                        }
                                        onChange={handleEtcInputChange}
                                    />
                                ) : (
                                    <>{option.value}</>
                                )}
                            </Radio>
                        </Space>
                    ) : (
                        <Space
                            style={{
                                display: 'flex',
                            }}
                        >
                            {!isMobile && (
                                <div className="alpha-hotkey">
                                    {ALPHA_HOTKEY[option.key].toUpperCase()}
                                </div>
                            )}
                            <Radio
                                onChange={handleChange}
                                key={`${item.i}-${option.key}`}
                                id={`${item.i}-${option.key}`}
                                style={optionsStyle}
                                value={option.key}
                                onKeyPress={(e) => handleKeyPress(e, item.link, item.i + 1, true)}
                            >
                                {option.value}
                            </Radio>
                        </Space>
                    )}
                </div>
            ))}
        </Radio.Group>
    );
}

function AnswerCheckbox({ item, handleInputChange, handleKeyPress }) {
    return (
        <Checkbox.Group name={item.i} onChange={(v) => handleInputChange(item.i, v)}>
            {item.options.map((option) => (
                <Space key={`${item.id}-${option.key}`} style={{ display: 'flex' }}>
                    {!isMobile && (
                        <div className="alpha-hotkey">{ALPHA_HOTKEY[option.key].toUpperCase()}</div>
                    )}
                    <Checkbox
                        id={`${item.i}-${option.key}`}
                        value={option.key}
                        style={optionsStyle}
                        onKeyPress={(e) => handleKeyPress(e, item.link, item.i + 1, true)}
                    >
                        {option.value}
                    </Checkbox>
                </Space>
            ))}
        </Checkbox.Group>
    );
}

function AnswerTextInput({ item, handleInputChange, handleKeyPress }) {
    return (
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
    );
}

export { AnswerRadio, AnswerCheckbox, AnswerTextInput };
