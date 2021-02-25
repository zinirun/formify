import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import SiteHeader from './header/SiteHeader';
import './common/styles/layout.css';
import HomePage from './common/pages/HomePage';
import WorkSpacePage from './workspace/pages/WorkSpacePage';
import GuidePage from './common/pages/GuidePage';
import { useMutation } from '@apollo/client';
import { VERIFY_USER } from './config/queries';

const { Content, Footer } = Layout;

function App() {
    const [user, setUser] = useState(null);
    const [verifyUser] = useMutation(VERIFY_USER);
    useEffect(() => {
        verifyUser()
            .then((res) => {
                const user = res.data.verifyUser;
                setUser(user);
            })
            .catch(() => {});
    }, [verifyUser]);
    return (
        <Router>
            <Layout>
                <SiteHeader user={user} />
                <Content style={{ background: 'white' }}>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/workspace" component={WorkSpacePage} />
                    <Route path="/guide" component={GuidePage} />
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center', background: 'white' }}>
                Formify © 2021 Created by zini
            </Footer>
        </Router>
    );
}

export default App;
