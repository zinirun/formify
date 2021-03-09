import { Select } from 'antd';

const { Option } = Select;

export default function QuestionTypeDropdown({ seq, value, onChange }) {
    return (
        <Select value={value} onChange={(value) => onChange(value, seq)} style={{ width: '200px' }}>
            <Option value="text">텍스트 타입</Option>
            <Option value="selectOne">단일 선택 타입</Option>
            <Option value="selectAll">다중 선택 타입</Option>
        </Select>
    );
}
