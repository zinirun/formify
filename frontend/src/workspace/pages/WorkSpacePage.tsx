import { useCallback, useEffect, useState } from 'react';
import { Empty, Layout, Menu, message } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_GROUPS } from '../../config/queries';
import LoadingSpin from '../../common/components/LoadingSpin';
import AddGroupContainer from '../containers/AddGroupContainer';
import FormsContainer from '../containers/FormsContainer';
import AddFormContainer from '../containers/AddFormContainer';
import ShowFormContainer from '../containers/ShowFormContainer';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import WelcomeWorkspaceContainer from '../containers/WelcomeWorkspaceContainer';
import AnalysisContainer from '../containers/AnalysisContainer';
const { Content, Sider } = Layout;

export default function WorkSpacePage() {
    const { search } = useLocation();
    const query = queryString.parse(search);

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

    if (groupsError) {
        message.error('그룹 데이터를 가져오는 중 문제가 발생했습니다.');
    }

    return (
        <Layout className="site-layout-background">
            <Sider className="site-layout-background" width={300}>
                <AddGroupContainer refetch={groupsRefetch} />
                {groupsLoading && <LoadingSpin />}
                {!groupsLoading && groups.length > 0 ? (
                    <Menu
                        mode="inline"
                        defaultOpenKeys={query.f && query.g ? [`group-${query.g}`] : ['']}
                        defaultSelectedKeys={
                            query.f && query.g ? [`form-${query.g}-${query.f}`] : ['']
                        }
                        onSelect={handleSelectForm}
                        style={{ height: 'calc(100% - 48px)' }}
                    >
                        {groups.map((group) => (
                            <FormsContainer {...group} key={`group-${group.id}`} group={group} />
                        ))}
                    </Menu>
                ) : (
                    <Empty description="그룹이 없습니다." image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            </Sider>
            <Content
                style={{
                    padding: '24px',
                    minHeight: '85vh',
                    backgroundColor: '#eee',
                }}
            >
                {(!search || selectedAfterQuery) && contentAction.action === 'createForm' && (
                    <AddFormContainer groupId={contentAction.groupId} />
                )}
                {(!search || selectedAfterQuery) && contentAction.action === 'showForm' && (
                    <ShowFormContainer
                        formId={contentAction.formId}
                        setContentAction={setContentAction}
                        setSelectedAfterQuery={setSelectedAfterQuery}
                    />
                )}
                {(!search || selectedAfterQuery) && contentAction.action === 'analysisForm' && (
                    <AnalysisContainer
                        formId={contentAction.formId}
                        setContentAction={setContentAction}
                    />
                )}
                {!selectedAfterQuery && query.f && query.g && (
                    <ShowFormContainer
                        formId={query.f}
                        setContentAction={setContentAction}
                        setSelectedAfterQuery={setSelectedAfterQuery}
                    />
                )}
                {(!search || !(query.f && query.g)) && !contentAction.action && (
                    <WelcomeWorkspaceContainer />
                )}
            </Content>
        </Layout>
    );
}
