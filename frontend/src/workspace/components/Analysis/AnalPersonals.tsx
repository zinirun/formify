import { Collapse, Tabs } from 'antd';
const { Panel } = Collapse;
const { TabPane } = Tabs;

export default function AnalPersonals({ personals }) {
    return (
        <Collapse bordered={false} style={{ marginBottom: 20, borderRadius: 5 }}>
            <Panel style={{ border: 'none' }} key="personal-panel" header="개인별 답변">
                <Tabs tabPosition="left" style={{ height: 300 }}>
                    {personals.map((p, idx) => (
                        <TabPane
                            key={`p-${p.id}`}
                            tab={`${idx + 1}`}
                            style={{ height: 300, overflow: 'auto' }}
                        >
                            {p.data.map((d, idx) => (
                                <div key={`p-answer-${idx}`}>
                                    <p
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: '0.975rem',
                                            marginTop: 15,
                                            marginBottom: 10,
                                        }}
                                    >
                                        {d.title}
                                    </p>
                                    {d.answer.map((a, idx) => (
                                        <p
                                            key={`p-answer-text-${idx}`}
                                            style={{
                                                fontSize: '0.95rem',
                                                marginBottom: 5,
                                            }}
                                        >
                                            {a}
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </TabPane>
                    ))}
                </Tabs>
            </Panel>
        </Collapse>
    );
}
