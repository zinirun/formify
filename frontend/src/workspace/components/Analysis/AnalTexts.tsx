import { List } from 'antd';

export default function AnalTexts({ texts }) {
    return (
        <List
            pagination={{
                pageSize: 5,
            }}
            size="small"
            dataSource={texts}
            renderItem={(item: any) => <List.Item>{item}</List.Item>}
        />
    );
}
