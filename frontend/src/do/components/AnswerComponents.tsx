import { Checkbox, Radio, Space } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { isMobile } from 'react-device-detect';
import { ALPHA_HOTKEY, optionsStyle } from '../doConfig';

function AnswerRadio({ item, handleInputChange, handleKeyPress }) {
    return (
        <Radio.Group name={item.i}>
            {item.options.map((option) => (
                <Space
                    key={`${item.id}-${option.key}`}
                    style={{
                        display: 'flex',
                    }}
                >
                    {!isMobile && (
                        <div className="alpha-hotkey">{ALPHA_HOTKEY[option.key].toUpperCase()}</div>
                    )}
                    <Radio
                        onChange={handleInputChange}
                        key={`${item.i}-${option.key}`}
                        id={`${item.i}-${option.key}`}
                        style={optionsStyle}
                        value={option.key}
                        onKeyPress={(e) => handleKeyPress(e, item.link, item.i + 1, true)}
                    >
                        {option.value}
                    </Radio>
                </Space>
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
