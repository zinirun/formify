import { Typography, Layout } from 'antd';
const { Content } = Layout;

const { Title } = Typography;

export default function HomePage() {
    return (
        <Layout className="site-layout-background top-wrapper">
            <Content style={{ padding: '0 24px' }}>
                <Title level={2}>Formify 홈</Title>
            </Content>
        </Layout>
    );
}
