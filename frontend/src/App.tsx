import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import SiteHeader from './header/SiteHeader';
import './common/styles/layout.css';
import HomePage from './common/pages/HomePage';
import WorkSpacePage from './workspace/pages/WorkSpacePage';
import GuidePage from './common/pages/GuidePage';
import { useQuery } from '@apollo/client';
import { VERIFY_USER } from './config/queries';
import Result404 from './common/components/Result404';

const { Content, Footer } = Layout;

function App() {
    const [user, setUser] = useState(null);
    const { data: userData } = useQuery(VERIFY_USER);
    useEffect(() => {
        if (userData) {
            setUser(userData.verifyUser);
        }
    }, [userData]);
    return (
        <Router>
            <Layout>
                <SiteHeader user={user} />
                <Content style={{ background: 'white' }}>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/workspace" component={WorkSpacePage} />
                        <Route path="/guide" component={GuidePage} />

                        <Route component={Result404} />
                    </Switch>
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center', background: 'white' }}>
                Formify © 2021 Created by zini
            </Footer>
        </Router>
    );
}

export default App;
