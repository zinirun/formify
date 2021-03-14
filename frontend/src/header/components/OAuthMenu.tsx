import React from 'react';
import { Menu } from 'antd';
import { FacebookOutlined, GithubOutlined, GoogleOutlined } from '@ant-design/icons';

type AuthSource = 'google' | 'facebook' | 'github';

export default function OAuthMenu() {
    const handleOAuthLogin = (authSource: AuthSource) => {
        window.location.href = `/auth/${authSource}`;
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
