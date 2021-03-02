import { Layout } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import { useLocation } from 'react-router-dom';
import SiteHeader from '../../header/SiteHeader';

import '../styles/layout.css';

export default function Root(props) {
    const { pathname } = useLocation();
    const isDoPage = pathname.split('/')[1] === 'do';
    return <>{isDoPage ? props.children : <LayoutWithHeader {...props} />}</>;
}

function LayoutWithHeader(props) {
    return (
        <>
            <Layout>
                <SiteHeader />
                <Content style={{ background: 'white' }}>{props.children}</Content>
            </Layout>
            <Footer style={{ textAlign: 'center', background: 'white' }}>
                Formify © 2021 Created by zini
            </Footer>
        </>
    );
}
