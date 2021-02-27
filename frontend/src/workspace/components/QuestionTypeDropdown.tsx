import React from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

function QuestionTypeMenu() {
    return (
        <Menu>
            <Menu.Item disabled={true} style={{ cursor: 'default' }}>
                타입 변경시 입력 내용이 초기화됩니다.
            </Menu.Item>
            <Menu.Item>텍스트 타입</Menu.Item>
            <Menu.Item>단일 선택 타입</Menu.Item>
            <Menu.Item>다중 선택 타입</Menu.Item>
            <Menu.Item>드롭다운 타입</Menu.Item>
        </Menu>
    );
}

export default function QuestionTypeDropdown() {
    return (
        <Dropdown overlay={QuestionTypeMenu}>
            <a className="ant-dropdown-link" href="/" onClick={(e) => e.preventDefault()}>
                타입 <DownOutlined />
            </a>
        </Dropdown>
    );
}
