import { CheckOutlined, EditOutlined, StopOutlined } from '@ant-design/icons';
import { Alert } from 'antd';

export function FormAlertModify() {
    return (
        <Alert
            message="수정 중인 폼"
            description="이 폼은 수정 중인 상태입니다. 최종 검토가 완료되면 폼 게시를 시작하세요."
            type="warning"
            icon={<EditOutlined />}
            showIcon
            closable
            style={{ marginBottom: 20 }}
        />
    );
}

export function FormAlertOpen() {
    return (
        <Alert
            message="게시된 폼"
            description="이 폼은 게시되었으며 답변을 처리할 수 있습니다."
            type="info"
            icon={<CheckOutlined />}
            showIcon
            closable
            style={{ marginBottom: 20 }}
        />
    );
}

export function FormAlertClosed() {
    return (
        <Alert
            message="종료된 폼"
            description="이 폼은 종료된 상태입니다. 모든 답변을 처리할 수 있습니다."
            type="error"
            icon={<StopOutlined />}
            showIcon
            closable
            style={{ marginBottom: 20 }}
        />
    );
}
