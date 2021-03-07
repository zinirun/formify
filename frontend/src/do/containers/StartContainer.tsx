import { CheckOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';
import { Button } from 'antd';

export default function StartContainer({ handleStartClick, form }) {
    return (
        <header className="App-header Description">
            <p
                style={{
                    fontSize: isMobile ? 'large' : 'x-large',
                    maxWidth: '100%',
                    whiteSpace: 'normal',
                    wordBreak: 'break-all',
                    fontWeight: 'bold',
                    marginBottom: 5,
                }}
            >
                {form.title}
            </p>
            {form.subtitle && (
                <p
                    style={{
                        fontSize: isMobile ? '0.9rem' : 'medium',
                        maxWidth: '100%',
                        whiteSpace: 'normal',
                        wordBreak: 'break-all',
                        color: '#777',
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                >
                    {form.subtitle.split('<br />').map((line, idx) => (
                        <span key={`subtitle-${idx}`}>
                            {line}
                            <br />
                        </span>
                    ))}
                </p>
            )}
            <div>
                <Button
                    size="large"
                    id="start-btn"
                    icon={<CheckOutlined />}
                    onClick={handleStartClick}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleStartClick();
                        }
                    }}
                    autoFocus
                    style={{ marginTop: 10 }}
                >
                    시작하기
                </Button>
                <span className="press-enter">
                    press <span className="bold">ENTER</span>
                </span>
            </div>
        </header>
    );
}
