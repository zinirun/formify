export const ANIMATE_DELAY = 650;

const anchorMapper = (anchor_data) => {
    return anchor_data.map((item) => item.id.toString());
};

export const generateSectionOptions = (data) => {
    return {
        sectionClassName: 'section',
        anchors: anchorMapper(data),
        scrollBar: false,
        navigation: true,
        verticalAlign: false,
        sectionPaddingTop: '50px',
        sectionPaddingBottom: '50px',
        arrowNavigation: false,
        delay: ANIMATE_DELAY,
    };
};

export const questionMapper = (data) => {
    return data.map((d, idx) => {
        return {
            title: d.title,
            id: `q${d.seq.toString()}`,
            link: data[idx + 1] ? `q${data[idx + 1].seq.toString()}` : '',
            i: d.seq,
            type: d.type,
            options: d.options,
        };
    });
};

export const answerInitMapper = (data) => {
    const answer = {};
    for (let d of data) {
        answer[d.seq] = '';
    }
    return answer;
};

export const optionsStyle = {
    display: 'block',
    fontSize: 'large',
    height: '30px',
    lineHeight: '30px',
    marginLeft: 5,
};

export const dropdownStyle = {
    fontSize: 'large',
};

export const ALPHA_HOTKEY = {
    0: 'a',
    1: 'b',
    2: 'c',
    3: 'd',
    4: 'e',
    5: 'f',
    6: 'g',
    7: 'h',
    8: 'i',
    9: 'j',
    99: 'z',
};

export const ALPHA_TO_KEY = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
    i: 8,
    j: 9,
    z: 99,
};
