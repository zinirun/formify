import React from 'react';
import { Menu } from 'antd';
import { FacebookOutlined, GithubOutlined, GoogleOutlined } from '@ant-design/icons';
import { SERVER_ADDR } from '../../config/uri.config';

export default function OAuthMenu() {
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
