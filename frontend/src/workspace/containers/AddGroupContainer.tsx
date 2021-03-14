import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Popover, Input, Button, message, Tooltip, Switch, Menu, Row, Col } from 'antd';
import { useState } from 'react';
import { CREATE_GROUP } from '../../config/queries';
const { Search } = Input;

export default function AddGroupContainer({ refetch, handleShowRemove }) {
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
                .catch((err) => {
                    console.log(err);
                    message.error('그룹의 이름을 10자 이하로 설정하세요.');
                });
        }
    };
    const handleVisibleChange = (value) => {
        setVisible(value);
    };
    return (
        <Menu.Item disabled style={{ cursor: 'default' }}>
            <Row style={{ height: '52px' }} align="middle" justify="center">
                <Col span={20} style={{ padding: '0 10px 0 5px' }}>
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
                        <Button block icon={<PlusCircleOutlined />} style={{ borderRadius: 40 }}>
                            새로운 그룹
                        </Button>
                    </Popover>
                </Col>
                <Col span={4}>
                    <Tooltip title="삭제 옵션 표시">
                        <Switch
                            style={{ width: '35px' }}
                            checkedChildren={<DeleteOutlined />}
                            unCheckedChildren={<DeleteOutlined />}
                            onChange={handleShowRemove}
                        />
                    </Tooltip>
                </Col>
            </Row>
        </Menu.Item>
    );
}
