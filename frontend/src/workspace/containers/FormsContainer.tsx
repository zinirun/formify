import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { GET_FORMS_BY_GROUP_ID } from '../../config/queries';
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

    useEffect(() => {
        if (formsData) {
            setForms(formsData.getFormsByGroupId);
        }
    }, [formsData]);

    if (formsError) {
        return <span>데이터를 불러오는 중 문제가 발생했습니다.</span>;
    }

    return (
        <SubMenu key={`group-${props.group.id}`} title={props.group.name} {...props}>
            <Menu.Item key={`newform-${props.group.id}`} icon={<PlusCircleOutlined />}>
                새로운 폼
            </Menu.Item>
            {formsLoading && <LoadingSpin />}
            {forms &&
                forms.map((form) => (
                    <Menu.Item key={`form-${props.group.id}-${form.id}`}> {form.title}</Menu.Item>
                ))}
        </SubMenu>
    );
}
