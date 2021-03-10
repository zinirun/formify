import { useEffect, useState } from 'react';
import { Menu, message, Popconfirm, Tooltip } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { GET_FORMS_BY_GROUP_ID, REMOVE_FORM, REMOVE_GROUP } from '../../config/queries';
import LoadingSpin from '../../common/components/LoadingSpin';
const { SubMenu } = Menu;

export default function FormsContainer(props) {
    const [forms, setForms]: any = useState([]);
    const { data: formsData, error: formsError, loading: formsLoading } = useQuery(
        GET_FORMS_BY_GROUP_ID,
        {
            variables: {
                groupId: props.group.id,
            },
        },
    );
    const [removeForm] = useMutation(REMOVE_FORM);
    const [removeGroup] = useMutation(REMOVE_GROUP);

    useEffect(() => {
        if (formsData) {
            setForms(formsData.getFormsByGroupId);
        }
    }, [formsData]);

    const triggerRemoveGroup = () => {
        removeGroup({
            variables: {
                id: parseInt(props.group.id),
            },
        })
            .then(() => (window.location.href = '/workspace?removed=group'))
            .catch((err) => {
                message.error(`그룹을 삭제하는 중 오류가 발생했습니다. [${err}]`);
            });
    };

    const triggerRemoveForm = (formId) => {
        removeForm({
            variables: {
                id: parseInt(formId),
            },
        })
            .then(() => (window.location.href = '/workspace?removed=form'))
            .catch((err) => {
                message.error(`폼을 삭제하는 중 오류가 발생했습니다. [${err}]`);
            });
    };

    if (formsError) {
        return <span>데이터를 불러오는 중 문제가 발생했습니다.</span>;
    }

    return (
        <SubMenu
            key={`group-${props.group.id}`}
            title={
                <div style={{ display: 'flex' }}>
                    <span style={{ flex: 1 }}>{props.group.name}</span>
                    {props.showremove ? (
                        <div>
                            <Popconfirm
                                okText="삭제"
                                cancelText="취소"
                                title="그룹과 그룹 내의 모든 폼을 삭제할까요?"
                                onConfirm={triggerRemoveGroup}
                            >
                                <Tooltip title="그룹 삭제">
                                    <DeleteOutlined style={{ color: '#bbb' }} />
                                </Tooltip>
                            </Popconfirm>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            }
            {...props}
        >
            <Menu.Item key={`newform-${props.group.id}`} icon={<PlusCircleOutlined />}>
                새로운 폼
            </Menu.Item>
            {formsLoading && <LoadingSpin />}
            {forms &&
                forms.map((form) => (
                    <Menu.Item key={`form-${props.group.id}-${form.id}`}>
                        <div style={{ display: 'flex' }}>
                            <span style={{ flex: 1 }}>{form.title}</span>

                            {props.showremove ? (
                                <div>
                                    <Popconfirm
                                        okText="삭제"
                                        cancelText="취소"
                                        title="폼을 삭제할까요?"
                                        onConfirm={() => triggerRemoveForm(form.id)}
                                    >
                                        <Tooltip title="폼 삭제">
                                            <DeleteOutlined style={{ color: '#bbb' }} />
                                        </Tooltip>
                                    </Popconfirm>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </Menu.Item>
                ))}
        </SubMenu>
    );
}
