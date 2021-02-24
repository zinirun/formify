import { Typography, Layout } from 'antd';
const { Content } = Layout;

const { Title } = Typography;

export default function GuidePage() {
    return (
        <Layout className="site-layout-background top-wrapper">
            <Content style={{ padding: '0 24px' }}>
                <Title level={2}>Formify 가이드</Title>
            </Content>
        </Layout>
    );
}
