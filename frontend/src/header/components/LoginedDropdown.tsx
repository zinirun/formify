import React from 'react';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import LoginedMenu from './LoginedMenu';

export default function LoginedDropdown({ username }) {
    return (
        <Dropdown overlay={LoginedMenu}>
            <a className="ant-dropdown-link" href="/" onClick={(e) => e.preventDefault()}>
                {username} <DownOutlined />
            </a>
        </Dropdown>
    );
}
