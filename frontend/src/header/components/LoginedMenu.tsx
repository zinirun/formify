import React from 'react';
import { Menu } from 'antd';

export default function LoginedMenu() {
    return (
        <Menu>
            <Menu.Item>내 계정</Menu.Item>
            <Menu.Item>로그아웃</Menu.Item>
        </Menu>
    );
}
