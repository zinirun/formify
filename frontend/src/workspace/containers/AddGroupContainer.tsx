import { PlusCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Popover, Input, Button, message } from 'antd';
import { useState } from 'react';
import { CREATE_GROUP } from '../../config/queries';
const { Search } = Input;

export default function AddGroupContainer({ refetch }) {
    const [visible, setVisible] = useState(false);
    const [createGroup] = useMutation(CREATE_GROUP);
    const handleAddGroup = (name) => {
        setVisible(false);
        if (name) {
            createGroup({
                variables: {
                    group: {
                        name,
                    },
                },
            })
                .then(() => refetch())
                .catch(() => message.error('그룹의 이름을 10자 이하로 설정하세요.'));
        }
    };
    const handleVisibleChange = (value) => {
        setVisible(value);
    };
    return (
        <Popover
            content={
                <Search
                    placeholder="그룹 이름"
                    enterButton="추가"
                    onSearch={handleAddGroup}
                    autoFocus
                />
            }
            title="새 그룹을 생성합니다."
            trigger="click"
            onVisibleChange={handleVisibleChange}
            visible={visible}
        >
            <Button
                block
                icon={<PlusCircleOutlined />}
                style={{ height: '48px', borderColor: '#f0f0f0' }}
            >
                새로운 그룹
            </Button>
        </Popover>
    );
}
