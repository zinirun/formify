import { Layout } from 'antd';
import HomeContainer from '../containers/Home/HomeContainer';
const { Content } = Layout;

const homeContents = [
    {
        src: '/assets/Home/Home1.png',
        title: '사용자에게 초점을 맞춘 폼',
        content:
            '한 화면에 한 질문을 하세요. 사용자에게 질문에 집중할 수 있는 환경을 부여하여 더 정확하고 성의있는 답변을 유도할 수 있습니다.',
        direction: 'right',
    },
    {
        src: '/assets/Home/Home2.png',
        title: '완벽한 모바일, 다크모드 지원',
        content:
            '어떤 플랫폼에서도 Formify 폼을 작성할 수 있습니다. 모바일 플랫폼 지원은 물론 다크모드 설정도 사용자에게 맡기세요. PC 환경에서는 키보드만으로 폼을 작성하고 제출할 수 있습니다.',
        direction: 'left',
    },

    {
        src: '/assets/Home/Home3.png',
        title: '강력한 워크스페이스',
        content:
            '답변의 유형에 따라 한 눈에 들어오는 데이터 차트를 제공합니다. 또한 개인 별 답변을 확인할 수 있고, XLSX 다운로드까지 지원합니다.',
        direction: 'right',
    },
    {
        src: '/assets/Home/Home4.png',
        title: '그룹 별 폼 관리',
        content:
            '폼을 그룹 단위로 분류하여 관리의 효율을 높이세요. 개인용 그룹, 업무용 그룹 등 나에게 필요한 그룹을 만들고 그룹 안에서 폼을 만드세요.',
        direction: 'left',
    },
];

export default function HomePage() {
    return (
        <Layout className="site-layout-background top-wrapper">
            <p
                style={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: '50px',
                }}
            >
                누구나 쉽게 만들고, 쉽게 답변할 수 있는 폼
                <p
                    style={{
                        fontSize: '1.05rem',
                        fontWeight: 'normal',
                        marginTop: '15px',
                        color: '#999',
                    }}
                >
                    Formify의 모든 서비스는 무료로 제공됩니다.
                </p>
            </p>
            <Content style={{ padding: '24px 0 72px' }}>
                {homeContents.map((contents, idx) => (
                    <HomeContainer key={idx} contents={contents} />
                ))}
            </Content>
        </Layout>
    );
}
