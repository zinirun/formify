import { useEffect } from 'react';
import { Button } from 'antd';
import { isMobile } from 'react-device-detect';
import { CheckOutlined } from '@ant-design/icons';
import { ANIMATE_DELAY, ALPHA_TO_KEY } from '../doConfig';
import { AnswerCheckbox, AnswerRadio, AnswerTextInput } from '../components/AnswerComponents';

export default function QuestionContainer({ item, etcValue, inputHandler, etcValueHandler, done }) {
    useEffect(() => {
        document.getElementById('1-0')?.focus();
    }, []);

    const clickHandler = (link, i) => {
        window.location.href = `#${link}`;
        setTimeout(() => {
            document.getElementById(`${i}-0`)?.focus();
        }, ANIMATE_DELAY);
    };

    const setFocusToEtcInput = (i) => {
        setTimeout(() => {
            document.getElementById(`etc-${i}`)?.focus();
        }, 0);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        inputHandler(name, value);
        if (value !== 99) {
            etcValueHandler(name, '');
            return;
        }
        setFocusToEtcInput(name);
    };

    const handleEtcInputChange = (e) => {
        const { name, value } = e.target;
        etcValueHandler(name, value);
    };

    const handleCheckboxChange = (name, values) => {
        inputHandler(name, values);
    };

    const handleKeyPress = (e, link, i, isHotkey?, isEtcInput?) => {
        if (e.key === 'Enter') {
            clickHandler(link, i);
        }
        if (e.code === 'Enter' && e.ctrlKey) {
            document.getElementById('submit-btn')?.click();
        }
        if (!isEtcInput && isHotkey && ALPHA_TO_KEY.hasOwnProperty(e.key.toLowerCase())) {
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
                    <AnswerTextInput
                        item={item}
                        handleInputChange={handleInputChange}
                        handleKeyPress={handleKeyPress}
                    />
                )}
                {item.type === 'selectOne' && (
                    <AnswerRadio
                        item={item}
                        etcValue={etcValue}
                        handleEtcInputChange={handleEtcInputChange}
                        handleInputChange={handleInputChange}
                        handleKeyPress={handleKeyPress}
                    />
                )}
                {item.type === 'selectAll' && (
                    <AnswerCheckbox
                        item={item}
                        handleInputChange={handleCheckboxChange}
                        handleKeyPress={handleKeyPress}
                    />
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
                                backgroundColor: done.percent === 100 ? '#2dafff' : 'grey',
                                borderColor: done.percent === 100 ? '#2dafff' : 'grey',
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
