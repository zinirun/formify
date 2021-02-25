import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default function WorkSpacePage() {
    return (
        <>
            <Layout className="site-layout-background">
                <Sider className="site-layout-background" width={300}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}
                    >
                        <Menu.Item key="0">새로운 그룹 만들기</Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="그룹 1">
                            <Menu.Item>폼 만들기</Menu.Item>
                            <Menu.Item key="1">설문조사 1</Menu.Item>
                            <Menu.Item key="2">설문조사 2</Menu.Item>
                            <Menu.Item key="3">설문조사 3</Menu.Item>
                            <Menu.Item key="4">설문조사 4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="그룹 2">
                            <Menu.Item>폼 만들기</Menu.Item>
                            <Menu.Item key="5">설문조사 5</Menu.Item>
                            <Menu.Item key="6">설문조사 6</Menu.Item>
                            <Menu.Item key="7">설문조사 7</Menu.Item>
                            <Menu.Item key="8">설문조사 8</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Content style={{ padding: '24px', minHeight: 280 }}>Content</Content>
            </Layout>
        </>
    );
}
