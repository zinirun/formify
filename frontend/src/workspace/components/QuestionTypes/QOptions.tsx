import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Row, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';

export default function QOptions(props) {
    const [options, setOptions] = useState([
        {
            key: 0,
            value: '',
        },
    ]);
    const [hasEtc, setHasEtc] = useState(false);
    useEffect(() => {
        if (props.data) {
            setOptions(props.data);
        }
    }, [props]);
    const handleChange = useCallback(
        (e, key) => {
            const { value } = e.target;
            const updated = options.map((opt) => {
                if (opt.key === key) {
                    return {
                        ...opt,
                        value,
                    };
                } else return opt;
            });
            setOptions(updated);
            props.onChange(
                props.seq,
                updated.map((opt) => {
                    return { key: opt.key, value: opt.value };
                }),
            );
        },
        [props, options],
    );
    const removeItem = useCallback(
        (key) => {
            const updated = options.filter((opt) => opt.key !== key);
            setOptions(updated);
            props.onChange(
                props.seq,
                updated.map((opt) => {
                    return { key: opt.key, value: opt.value };
                }),
            );
        },
        [props, options],
    );
    const addItem = useCallback(() => {
        if (options.length > 10) {
            return message.error('옵션은 10개까지 생성할 수 있습니다.');
        }
        const updated = [
            ...options,
            {
                key: options[options.length - 1].key + 1,
                value: '',
            },
        ];
        setOptions(updated);
        props.onChange(
            props.seq,
            updated.map((opt) => {
                return { key: opt.key, value: opt.value };
            }),
        );
    }, [props, options]);
    const addEtcItem = useCallback(() => {
        const updated = [
            ...options,
            {
                key: 99,
                value: '기타 (직접 입력)',
                etcValue: '',
            },
        ];
        setOptions(updated);
        setHasEtc(true);
        props.onChange(
            props.seq,
            updated.map((opt) => {
                return { key: opt.key, value: opt.value };
            }),
        );
    }, [props, options]);

    return (
        <>
            {options.map((opt) => (
                <div
                    key={`opt-${props.seq}-${opt.key}`}
                    style={{ display: 'flex', marginBottom: 8, alignItems: 'baseline' }}
                >
                    {opt.key !== 99 && (
                        <Form.Item
                            name={`opt-${props.seq}-${opt.key}`}
                            initialValue={opt.value}
                            rules={[{ required: true, message: '보기를 입력하세요.' }]}
                            style={{ margin: 0, width: '100%' }}
                        >
                            <Input
                                autoFocus
                                name={`opt-${props.seq}-${opt.key}`}
                                onChange={(e) => handleChange(e, opt.key)}
                                placeholder="보기를 입력하세요."
                            />
                        </Form.Item>
                    )}
                    {opt.key !== 0 && opt.key !== 99 && (
                        <div style={{ marginLeft: '10px' }}>
                            <Tooltip title="보기 삭제">
                                <MinusCircleOutlined
                                    style={{ color: 'crimson', fontSize: '1.0rem' }}
                                    onClick={() => removeItem(opt.key)}
                                />
                            </Tooltip>
                        </div>
                    )}
                </div>
            ))}
            {hasEtc && (
                <div style={{ display: 'flex', marginBottom: 8, alignItems: 'baseline' }}>
                    <Form.Item
                        name={`opt-${props.seq}-99`}
                        initialValue="기타 (직접 입력)"
                        style={{ margin: 0, width: '100%' }}
                    >
                        <Input
                            autoFocus
                            name={`opt-${props.seq}-99`}
                            disabled
                            style={{ cursor: 'default' }}
                        />
                    </Form.Item>
                    <div style={{ marginLeft: '10px' }}>
                        <Tooltip title="보기 삭제">
                            <MinusCircleOutlined
                                style={{ color: 'crimson', fontSize: '1.0rem' }}
                                onClick={() => {
                                    setHasEtc(false);
                                    removeItem(99);
                                }}
                            />
                        </Tooltip>
                    </div>
                </div>
            )}
            <Row>
                <Col span={hasEtc ? 24 : props.withEtcOption ? 18 : 24}>
                    <Button type="dashed" onClick={addItem} block icon={<PlusOutlined />}>
                        보기 추가
                    </Button>
                </Col>
                {props.withEtcOption && !hasEtc && (
                    <Col span={6} style={{ paddingLeft: 5 }}>
                        <Button type="dashed" onClick={addEtcItem} block icon={<PlusOutlined />}>
                            기타(직접 입력) 추가
                        </Button>
                    </Col>
                )}
            </Row>
        </>
    );
}
