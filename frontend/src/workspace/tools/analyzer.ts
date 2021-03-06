export const initDataToAnalysis = (questions) => {
    const data = {};
    for (const question of questions) {
        data[question.seq] = {
            id: question.seq,
            title: question.title,
            type: question.type,
            result: {
                texts: question.type === 'text' ? [] : null,
                options:
                    question.type === 'text'
                        ? null
                        : {
                              ...question.options.map((o) => {
                                  return {
                                      ...o,
                                      count: 0,
                                  };
                              }),
                          },
            },
        };
    }
    return data;
};

const chartDataMapper = (data: any) => {
    try {
        const configs = {};
        for (const key in data) {
            const d = data[key];
            if (d.type !== 'text') {
                const { options } = d.result;
                const configData: any = [];
                for (const oKey in options) {
                    const oValue = options[oKey];
                    configData.push({
                        title: oValue.value,
                        count: oValue.count,
                    });
                }
                configs[key] = {
                    data: configData,
                    xField: 'count',
                    yField: 'title',
                    legend: false,
                    seriesField: 'title',
                    meta: {
                        title: { alias: '답변' },
                        count: { alias: '응답 수' },
                    },
                };
            }
        }
        return configs;
    } catch (err) {
        console.log(err);
        throw new Error('CHART_DATA_MAPPER: ERROR');
    }
};

const personalAnswerMapper = (initData, answers) => {
    return answers.map((answer) => {
        const { id, answer: data } = answer;
        const newData: any[] = [];
        for (const seq in data) {
            const newAnswerBySeq: string[] = [];
            const userAnswerBySeq = data[seq];
            const { title, type, result } = initData[seq];
            const { options } = result;
            switch (type) {
                case 'selectOne':
                    newAnswerBySeq.push(options[userAnswerBySeq].value);
                    break;
                case 'selectAll':
                    userAnswerBySeq.forEach((key) => {
                        newAnswerBySeq.push(options[key].value);
                    });
                    break;
                default:
                    newAnswerBySeq.push(userAnswerBySeq);
            }
            newData.push({
                title,
                type,
                answer: newAnswerBySeq,
            });
        }
        return {
            id,
            data: newData,
        };
    });
};

export const analysisAnswerData = async (questions: any, answers: any) => {
    try {
        const data = await initDataToAnalysis(questions);
        const ans = answers.map((a) => a.answer);
        for (const key in ans) {
            const value = ans[key];
            for (const vKey in value) {
                const vValue = value[vKey];
                const { type, result } = data[vKey];
                switch (type) {
                    case 'selectOne':
                        result.options[vValue].count += 1;
                        break;
                    case 'selectAll':
                        vValue.forEach((v) => (result.options[v].count += 1));
                        break;
                    default:
                        result.texts.push(vValue);
                }
            }
        }
        return {
            data,
            configs: chartDataMapper(data),
            personal: personalAnswerMapper(data, answers),
        };
    } catch (err) {
        throw new Error('ANALYSIS_ANSWER_DATA: ERROR');
    }
};
