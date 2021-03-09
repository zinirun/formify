import { MehTwoTone } from '@ant-design/icons';
import { Result } from 'antd';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

export default function NonExistContainer() {
    return (
        <header className="App-header Description">
            <Result
                icon={<MehTwoTone twoToneColor="orange" />}
                title={
                    <p
                        style={{
                            fontSize: isMobile ? 'large' : 'x-large',
                            fontWeight: 'bold',
                        }}
                    >
                        폼이 존재하지 않습니다.
                    </p>
                }
                extra={
                    <p style={{ color: '#888' }}>
                        <Link to="/">Formify</Link>로 이동
                    </p>
                }
            />
        </header>
    );
}
