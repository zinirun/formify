import React, { useEffect, useState } from 'react';
import { Link, useLocation, withRouter } from 'react-router-dom';
import { Layout, Menu, Space } from 'antd';
import { SITE_MENU } from './headerConfig';
import SocialLoginDropdown from './components/SocialLoginDropdown';
import Logo from './components/Logo';
import LoginedDropdown from './components/LoginedDropdown';
import { useQuery } from '@apollo/client';
import { VERIFY_USER } from '../config/queries';
import { useDarkreader } from 'react-darkreader';
import { Switch } from 'react-darkreader';

const { Header } = Layout;

export default withRouter(function SiteHeader(props: any) {
    const [currentMenu, setCurrentMenu] = useState(['0']);
    const { pathname } = useLocation();
    const [isDark, { toggle }] = useDarkreader(false);
    const [user, setUser]: any = useState(null);
    const { data: userData, error: userError } = useQuery(VERIFY_USER);
    useEffect(() => {
        if (userData) {
            setUser(userData.verifyUser);
        }
        if (pathname === '/workspace' && userError) {
            props.history.push('/');
        }
    }, [userData, props.history, pathname, userError]);
    useEffect(() => {
        const target = SITE_MENU.filter((m) => m.uri === pathname)[0];
        if (target) {
            setCurrentMenu([SITE_MENU.filter((m) => m.uri === pathname)[0].id.toString()]);
        }
    }, [pathname, props]);

    return (
        <Header className="header">
            <Logo />
            <Space className="user-section" style={{ display: 'flex', float: 'right' }}>
                {user ? <LoginedDropdown username={user.username} /> : <SocialLoginDropdown />}
                <Switch checked={isDark} onChange={toggle} styling="github" />
            </Space>
            <Menu theme="dark" mode="horizontal" selectedKeys={currentMenu}>
                {SITE_MENU.map((m) => {
                    if (m.uri === '/workspace' && !user) {
                        return null;
                    }
                    return (
                        <Menu.Item key={m.id}>
                            <Link to={m.uri}>{m.name}</Link>
                        </Menu.Item>
                    );
                })}
            </Menu>
        </Header>
    );
});
