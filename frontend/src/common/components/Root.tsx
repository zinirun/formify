import { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/lib/layout/layout';
import { useLocation } from 'react-router-dom';
import SiteHeader from '../../header/SiteHeader';
import MobileSupport from './MobileSupport';

import '../styles/layout.css';

export default function Root(props) {
    const [deviceWidth, setDeviceWidth]: any = useState(null);
    const { pathname } = useLocation();
    const isDoPage = pathname.split('/')[1] === 'do' || pathname.split('/')[1] === 'preview';

    useEffect(() => {
        const handleResize = () => {
            setDeviceWidth(getWindowWidth());
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {isDoPage ? (
                props.children
            ) : deviceWidth < 1024 ? (
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
                Formify © 2021 Created by{' '}
                <a href="https://github.com/zinirun" target="_blank" rel="noreferrer">
                    zini
                </a>
            </Footer>
        </>
    );
}

function getWindowWidth() {
    return window.innerWidth;
}
