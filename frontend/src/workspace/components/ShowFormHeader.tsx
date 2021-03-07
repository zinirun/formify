import {
    BarChartOutlined,
    CheckCircleOutlined,
    EditOutlined,
    EyeOutlined,
    FormOutlined,
} from '@ant-design/icons';
import { Button, Space } from 'antd';

export default function ShowFormHeader({ form, onAnalysisForm, onPublishConfirm }) {
    const onOpenForm = (pubUrl: string | null) => {
        pubUrl && window.open(`/do/${pubUrl}`);
    };

    const onOpenPreview = (formId: number | null) => {
        formId && window.open(`/preview/${formId}`);
    };
    return (
        <Space
            style={{
                marginTop: 5,
                marginBottom: 20,
                display: 'flex',
                flexDirection: 'row-reverse',
            }}
        >
            {form.pubUrl ? (
                <Space>
                    <Button onClick={() => onOpenPreview(form.id)} icon={<EyeOutlined />}>
                        미리보기
                    </Button>
                    <Button icon={<BarChartOutlined />} type="primary" onClick={onAnalysisForm}>
                        답변 처리하기
                    </Button>
                    <Button
                        icon={<FormOutlined />}
                        type="primary"
                        onClick={() => onOpenForm(form.pubUrl)}
                    >
                        게시된 폼 열기
                    </Button>
                </Space>
            ) : (
                <Space>
                    <Button onClick={() => onOpenPreview(form.id)} icon={<EyeOutlined />}>
                        미리보기
                    </Button>
                    <Button icon={<EditOutlined />} type="primary" htmlType="submit">
                        폼 수정
                    </Button>
                    <Button
                        icon={<CheckCircleOutlined />}
                        type="primary"
                        onClick={onPublishConfirm}
                    >
                        폼 게시 시작
                    </Button>
                </Space>
            )}
        </Space>
    );
}
