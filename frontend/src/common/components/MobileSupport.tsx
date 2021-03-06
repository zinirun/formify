import { MobileOutlined } from '@ant-design/icons';
import { Layout, Result } from 'antd';
import { FixedLogo } from '../../header/components/Logo';

export default function MobileSupport() {
    return (
        <Layout style={{ backgroundColor: 'white' }}>
            <FixedLogo />
            <Result
                title={<p style={{ fontSize: 'large', fontWeight: 'bold' }}>죄송합니다</p>}
                subTitle={
                    <p>
                        현재 모바일 버전은 지원하지 않습니다.
                        <br />
                        PC 환경에서 모든 기능을 사용하세요.
                    </p>
                }
                icon={<MobileOutlined />}
                style={{ marginTop: 70 }}
            />
        </Layout>
    );
}
