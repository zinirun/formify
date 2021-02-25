import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { LOGOUT } from '../../config/uri.config';

export default function LoginedMenu() {
    const triggerLogout = () => {
        axios
            .post(LOGOUT)
            .then(() => (window.location.href = '/'))
            .catch(() => (window.location.href = '/'));
    };
    return (
        <Menu>
            <Menu.Item>내 계정</Menu.Item>
            <Menu.Item onClick={triggerLogout}>로그아웃</Menu.Item>
        </Menu>
    );
}
