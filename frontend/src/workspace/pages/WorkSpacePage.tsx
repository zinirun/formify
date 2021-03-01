import React, { useCallback, useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_GROUPS } from '../../config/queries';
import LoadingSpin from '../../common/components/LoadingSpin';
import AddGroupContainer from '../containers/AddGroupContainer';
import FormsContainer from '../containers/FormsContainer';
import AddFormContainer from '../containers/AddFormContainer';
import ShowFormContainer from '../containers/ShowFormContainer';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
const { Content, Sider } = Layout;

export default function WorkSpacePage() {
    let { search } = useLocation();
    let query = queryString.parse(search);

    const [selectedAfterQuery, setSelectedAfterQuery] = useState(false);
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
            if (!selectedAfterQuery) {
                setSelectedAfterQuery(true);
            }
            const [type, groupId, formId] = key.split('-');
            if (type === 'newform') {
                setContentAction({
                    ...contentAction,
                    action: 'createForm',
                    groupId,
                });
            } else {
                setContentAction({
                    ...contentAction,
                    action: 'showForm',
                    groupId,
                    formId,
                });
            }
        },
        [setContentAction, contentAction, selectedAfterQuery],
    );

    return (
        <Layout className="site-layout-background">
            <Sider className="site-layout-background" width={300}>
                <AddGroupContainer refetch={groupsRefetch} />
                {groupsLoading && <LoadingSpin />}
                {!groupsLoading && groups && (
                    <Menu
                        mode="inline"
                        defaultOpenKeys={query.f && query.g ? [`group-${query.g}`] : ['']}
                        defaultSelectedKeys={
                            query.f && query.g ? [`form-${query.g}-${query.f}`] : ['']
                        }
                        style={{ height: '100%' }}
                        onSelect={handleSelectForm}
                    >
                        {groups.map((group) => (
                            <FormsContainer {...group} key={`group-${group.id}`} group={group} />
                        ))}
                    </Menu>
                )}
            </Sider>
            <Content style={{ padding: '24px', minHeight: 400 }}>
                {(!search || selectedAfterQuery) && contentAction.action === 'createForm' && (
                    <AddFormContainer groupId={contentAction.groupId} />
                )}
                {(!search || selectedAfterQuery) && contentAction.action === 'showForm' && (
                    <ShowFormContainer formId={contentAction.formId} />
                )}
                {!selectedAfterQuery && query.f && query.g && (
                    <ShowFormContainer formId={query.f} />
                )}
            </Content>
        </Layout>
    );
}
