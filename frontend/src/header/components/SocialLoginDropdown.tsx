import React from 'react';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import OAuthMenu from './OAuthMenu';

export default function SocialLoginDropdown() {
    return (
        <Dropdown overlay={OAuthMenu}>
            <a className="ant-dropdown-link" href="/" onClick={(e) => e.preventDefault()}>
                소셜 로그인 <DownOutlined />
            </a>
        </Dropdown>
    );
}
