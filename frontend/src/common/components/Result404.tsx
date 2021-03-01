import { Button, Result } from 'antd';

export default function Result404() {
    return (
        <Result
            status="404"
            title="404"
            subTitle="존재하지 않거나 잘못된 접근입니다."
            extra={
                <Button type="primary" onClick={() => (window.location.href = '/')}>
                    홈으로 이동
                </Button>
            }
        />
    );
}
