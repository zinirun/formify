import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Layout, Menu, Popover } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { GET_GROUPS, CREATE_GROUP } from '../../config/queries';
import LoadingSpin from '../../common/components/LoadingSpin';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const { Search } = Input;

export default function WorkSpacePage() {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState({
        key: null,
    });
    const [groups, setGroups]: any = useState([]);
    const {
        data: groupsData,
        error: groupsError,
        loading: groupsLoading,
        refetch: groupsRefetch,
    } = useQuery(GET_GROUPS);
    const [createGroup] = useMutation(CREATE_GROUP);

    useEffect(() => {
        if (groupsData) {
            const groups = groupsData.getGroups;
            setGroups(groups);
        }
    }, [groupsData]);

    const handleSelectMenu = useCallback(
        ({ key }) => {
            console.log(key);
            setSelected({
                key,
            });
            console.log(selected);
        },
        [setSelected, selected],
    );
    const handleAddGroup = (name) => {
        setVisible(false);
        createGroup({
            variables: {
                group: {
                    name,
                },
            },
        })
            .then(() => groupsRefetch())
            .catch((err) => console.log(err));
    };
    const handleVisibleChange = (value) => {
        setVisible(value);
    };
    return (
        <Layout className="site-layout-background">
            <Sider className="site-layout-background" width={300}>
                <Popover
                    content={
                        <Search
                            placeholder="그룹 이름"
                            enterButton="추가"
                            onSearch={handleAddGroup}
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
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['new-group']}
                    style={{ height: '100%' }}
                    onSelect={handleSelectMenu}
                >
                    {groupsLoading && <LoadingSpin />}
                    {groups &&
                        groups.map((g) => (
                            <SubMenu key={`g-${g.id}`} title={g.name}>
                                <Menu.Item icon={<PlusCircleOutlined />}>새로운 폼</Menu.Item>
                            </SubMenu>
                        ))}
                    {/* <SubMenu key="sub1" title="그룹 1">
                        <Menu.Item icon={<PlusCircleOutlined />}>새로운 폼</Menu.Item>
                        <Menu.Item key="1">설문조사 1</Menu.Item>
                        <Menu.Item key="2">설문조사 2</Menu.Item>
                        <Menu.Item key="3">설문조사 3</Menu.Item>
                        <Menu.Item key="4">설문조사 4</Menu.Item>
                    </SubMenu> */}
                </Menu>
            </Sider>
            <Content style={{ padding: '24px', minHeight: 400 }}>Content</Content>
        </Layout>
    );
}
