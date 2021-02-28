import React, { useCallback, useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_GROUPS } from '../../config/queries';
import LoadingSpin from '../../common/components/LoadingSpin';
import AddGroupContainer from '../containers/AddGroupContainer';
import FormsContainer from '../containers/FormsContainer';
import AddFormContainer from '../containers/AddFormContainer';
const { Content, Sider } = Layout;

export default function WorkSpacePage() {
    const [contentAction, setContentAction] = useState({
        action: '',
        groupId: 0,
        formId: 0,
    });
    const [groups, setGroups]: any = useState([]);
    const {
        data: groupsData,
        error: groupsError,
        loading: groupsLoading,
        refetch: groupsRefetch,
    } = useQuery(GET_GROUPS);

    useEffect(() => {
        if (groupsData) {
            const groups = groupsData.getGroups;
            setGroups(groups);
        }
    }, [groupsData]);

    const handleSelectForm = useCallback(
        ({ key }) => {
            const [type, groupId, formId] = key.split('-');
            if (type === 'newform') {
                setContentAction({
                    action: 'createForm',
                    groupId,
                    formId: 0,
                });
            } else {
                setContentAction({
                    action: 'showForm',
                    groupId,
                    formId,
                });
            }
        },
        [setContentAction],
    );

    return (
        <Layout className="site-layout-background">
            <Sider className="site-layout-background" width={300}>
                <AddGroupContainer refetch={groupsRefetch} />
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['new-group']}
                    style={{ height: '100%' }}
                    onSelect={handleSelectForm}
                >
                    {groupsLoading && <LoadingSpin />}
                    {groups &&
                        groups.map((group) => (
                            <FormsContainer {...group} key={group.id} group={group} />
                        ))}
                </Menu>
            </Sider>
            <Content style={{ padding: '24px', minHeight: 400 }}>
                {contentAction.action === 'createForm' && <AddFormContainer />}
                {contentAction.action === 'showForm' && (
                    <ShowFormContainer
                        formId={contentAction.formId}
                        groupId={contentAction.groupId}
                    />
                )}
            </Content>
        </Layout>
    );
}

function ShowFormContainer({ formId, groupId }) {
    return (
        <div>
            그룹 {groupId}의 폼 {formId} 정보
        </div>
    );
}