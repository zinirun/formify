import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import SiteHeader from './header/SiteHeader';
import './common/styles/layout.css';
import HomePage from './common/pages/HomePage';
import WorkSpacePage from './workspace/pages/WorkSpacePage';
import GuidePage from './common/pages/GuidePage';

const { Content, Footer } = Layout;

function App() {
    return (
        <Router>
            <Layout>
                <SiteHeader />
                <Content style={{ padding: '0 50px' }}>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/workspace" component={WorkSpacePage} />
                    <Route path="/guide" component={GuidePage} />
                </Content>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>Formify © 2021 Created by zini</Footer>
        </Router>
    );
}

export default App;
