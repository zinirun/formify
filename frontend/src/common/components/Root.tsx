import { Layout } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import { useLocation } from 'react-router-dom';
import SiteHeader from '../../header/SiteHeader';
import { isMobile } from 'react-device-detect';
import MobileSupport from './MobileSupport';

import '../styles/layout.css';
export default function Root(props) {
    const { pathname } = useLocation();
    const isDoPage = pathname.split('/')[1] === 'do' || pathname.split('/')[1] === 'preview';
    return (
        <>
            {isDoPage ? (
                props.children
            ) : isMobile ? (
                <MobileSupport />
            ) : (
                <LayoutWithHeader {...props} />
            )}
        </>
    );
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
