import { MehTwoTone } from '@ant-design/icons';
import { Result } from 'antd';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

export default function ClosedContainer() {
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
                        응답 기간이 종료되었습니다.
                    </p>
                }
                extra={
                    <p style={{ color: '#888' }}>
                        이 문서는 <Link to="/">Formify</Link>로 작성되었습니다.
                    </p>
                }
            />
        </header>
    );
}
