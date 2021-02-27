import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function QuestionTypeDropdown() {
    return (
        <Select defaultValue="text" style={{ width: '200px' }}>
            <Option
                value=""
                disabled
                style={{ cursor: 'default', fontSize: '0.75rem', color: 'crimson' }}
            >
                변경시 입력 내용이 초기화됨
            </Option>
            <Option value="text">텍스트 타입</Option>
            <Option value="selectOne">단일 선택 타입</Option>
            <Option value="selectAll">다중 선택 타입</Option>
            <Option value="dropdown">드롭다운 타입</Option>
        </Select>
    );
}
