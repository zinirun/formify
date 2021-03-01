import { HighlightOutlined } from '@ant-design/icons';
import { Result } from 'antd';

export default function WelcomeWorkspaceContainer() {
    return (
        <Result
            icon={<HighlightOutlined style={{ color: 'dodgerblue' }} />}
            title="Formify 워크스페이스에 오신 것을 환영합니다."
            subTitle="작업할 그룹을 선택하여 폼을 만들거나, 게시하세요."
        />
    );
}
