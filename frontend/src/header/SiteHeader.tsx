import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { SITE_MENU } from './headerConfig';
import SocialLoginDropdown from './components/SocialLoginDropdown';
import Logo from './components/Logo';

const { Header } = Layout;

export default function SiteHeader() {
    const [currentMenu, setCurrentMenu] = useState(['0']);
    const { pathname } = useLocation();
    useEffect(() => {
        const target = SITE_MENU.filter((m) => m.uri === pathname)[0];
        if (target) {
            setCurrentMenu([SITE_MENU.filter((m) => m.uri === pathname)[0].id.toString()]);
        }
    }, [pathname]);
    return (
        <Header className="header">
            <Logo />
            <div className="formify-user-section">
                <SocialLoginDropdown />
            </div>
            <Menu theme="dark" mode="horizontal" selectedKeys={currentMenu}>
                {SITE_MENU.map((m) => (
                    <Menu.Item key={m.id}>
                        <Link to={m.uri}>{m.name}</Link>
                    </Menu.Item>
                ))}
            </Menu>
        </Header>
    );
}
