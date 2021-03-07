import { HeartTwoTone } from '@ant-design/icons';
import { Result } from 'antd';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

export default function PreviewSubmittedContainer() {
    return (
        <header className="App-header Description">
            <Result
                icon={<HeartTwoTone twoToneColor="#eb2f96" />}
                title={
                    <p
                        style={{
                            fontSize: isMobile ? 'large' : 'x-large',
                            fontWeight: 'bold',
                        }}
                    >
                        응답해주셔서 감사합니다!
                    </p>
                }
                extra={
                    <p style={{ color: '#888' }}>
                        이 문서는 <Link to="/">Formify</Link>로 작성되었습니다.
                        <br />
                        <i>미리보기 - 실제 답변이 적용되지 않음</i>
                    </p>
                }
            />
        </header>
    );
}
