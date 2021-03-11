import { Layout } from 'antd';
import GuideContainer from '../containers/Guide/GuideContainer';
const { Content } = Layout;

const guideContents = [
    {
        src: '/assets/Guide/1-make-group.gif',
        title: '그룹 만들기',
        content:
            '폼을 구분지을 그룹을 만드세요. 그룹은 폴더의 개념과 비슷합니다. 개인, 업무 별 공간 등으로 구분해 보세요.',
    },
    {
        src: '/assets/Guide/2-make-form.gif',
        title: '폼 만들기',
        content:
            '워크스페이스 그룹에서 새로운 폼을 생성합니다. 텍스트 타입, 단일 선택 타입, 다중 선택 타입으로 답변의 유형을 설정할 수 있습니다. (다중 선택 타입은 기타[직접 입력] 옵션을 지원하지 않습니다)',
    },

    {
        src: '/assets/Guide/3-modify-form.gif',
        title: '폼 수정하기',
        content: '원하는 폼을 선택하여 폼을 수정할 수 있습니다.',
    },
    {
        src: '/assets/Guide/4-publish-form.gif',
        title: '폼 게시하기',
        content:
            '폼의 최종 검토가 완료되면 공개적으로 폼을 게시하세요. 폼이 게시되면 수정할 수 없습니다. 게시가 완료되면 사용자에게 주소를 공유하세요.',
    },
    {
        src: '/assets/Guide/5-view-published.gif',
        title: '폼 확인하기',
        content:
            '폼 워크스페이스 내 미리보기나 게시된 폼 열기를 통하여 사용자에게 보여질 폼의 화면을 확인해보세요.',
    },
];

export default function GuidePage() {
    return (
        <Layout className="site-layout-background top-wrapper">
            <div
                style={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: '50px',
                }}
            >
                Formify 사용자 가이드
                <p
                    style={{
                        fontSize: '1.05rem',
                        fontWeight: 'normal',
                        marginTop: '15px',
                        color: '#999',
                    }}
                >
                    별도의 회원가입 과정이 없습니다. 소셜 계정으로 로그인 후 바로 서비스를
                    이용하세요.
                </p>
            </div>
            <Content style={{ padding: '24px 0 72px' }}>
                {guideContents.map((contents, idx) => (
                    <GuideContainer key={idx} contents={contents} />
                ))}
            </Content>
        </Layout>
    );
}
