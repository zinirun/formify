import { Button, Descriptions, PageHeader } from 'antd';
import { dateFormater } from '../../../do/tools/formater';

export default function AnalHeader({ setContentAction, form, answerCount }) {
    const handleGoBack = () => {
        setContentAction({
            action: 'showForm',
            formId: form.id,
            groupId: -1,
        });
    };
    return (
        <PageHeader
            onBack={handleGoBack}
            title={form.title}
            subTitle="결과 분석"
            extra={<Button type="primary">EXCEL 다운로드</Button>}
        >
            <Descriptions size="small" column={3}>
                <Descriptions.Item label="생성일">{dateFormater(form.createdAt)}</Descriptions.Item>
                <Descriptions.Item label="상태">
                    {form.status === 'open' && <span>게시됨</span>}
                    {form.status === 'closed' && <span>종료됨</span>}
                </Descriptions.Item>
                <Descriptions.Item label="답변">{answerCount}개</Descriptions.Item>
            </Descriptions>
        </PageHeader>
    );
}
