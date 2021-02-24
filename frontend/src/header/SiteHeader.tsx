import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Dropdown, Layout, Menu } from 'antd';
import { SITE_MENU } from './headerConfig';
import { DownOutlined, FacebookOutlined, GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { SERVER_ADDR } from '../config/uri.config';

const { Header } = Layout;

function OAuthMenu() {
    const handleOAuthLogin = (authSource: string) => {
        window.location.href = `${SERVER_ADDR}/auth/${authSource}`;
    };
    return (
        <Menu>
            <Menu.Item onClick={() => handleOAuthLogin('google')}>
                <GoogleOutlined /> Google
            </Menu.Item>
            <Menu.Item onClick={() => handleOAuthLogin('facebook')}>
                <FacebookOutlined /> Facebook
            </Menu.Item>
            <Menu.Item onClick={() => handleOAuthLogin('github')}>
                <GithubOutlined /> Github
            </Menu.Item>
        </Menu>
    );
}

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
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" selectedKeys={currentMenu}>
                {SITE_MENU.map((m) => (
                    <Menu.Item key={m.id}>
                        <Link to={m.uri}>{m.name}</Link>
                    </Menu.Item>
                ))}
                <div style={{ float: 'right' }}>
                    <Dropdown overlay={OAuthMenu}>
                        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                            소셜 로그인 <DownOutlined />
                        </a>
                    </Dropdown>
                </div>
            </Menu>
        </Header>
    );
}
