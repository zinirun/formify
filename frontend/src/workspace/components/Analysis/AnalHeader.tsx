import { Button, Descriptions, message, PageHeader } from 'antd';
import { dateFormater } from '../../../do/tools/formater';
import { createPersonalsToXLSX } from '../../tools/xlsx';

export default function AnalHeader({ setContentAction, form, answerCount, personals }) {
    const handleGoBack = () => {
        setContentAction({
            action: 'showForm',
            formId: form.id,
            groupId: -1,
        });
    };

    const handleDownloadXLSX = () => {
        createPersonalsToXLSX(form.title, personals).catch((err) => {
            message.error('처리할 데이터가 없습니다.');
        });
    };

    return (
        <PageHeader
            onBack={handleGoBack}
            title={form.title}
            subTitle="결과 분석"
            extra={[
                <Button key="download-csv" type="primary" onClick={handleDownloadXLSX}>
                    XLSX로 내보내기
                </Button>,
            ]}
            style={{ borderRadius: 5, backgroundColor: 'white', marginBottom: 20 }}
        >
            <Descriptions size="small" column={4}>
                <Descriptions.Item label="생성">{dateFormater(form.createdAt)}</Descriptions.Item>
                <Descriptions.Item label="최종 수정">
                    {dateFormater(form.updatedAt)}
                </Descriptions.Item>
                <Descriptions.Item label="상태">
                    {form.status === 'open' && <span>게시됨</span>}
                    {form.status === 'closed' && <span>종료됨</span>}
                </Descriptions.Item>
                <Descriptions.Item label="받은 답변">
                    {answerCount === 0 ? <>없음</> : <>{answerCount}개</>}
                </Descriptions.Item>
            </Descriptions>
        </PageHeader>
    );
}
