export const ANIMATE_DELAY = 700;

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

export const sampleData = [
    {
        title: 'lets start with your first name? *',
        id: 'first_name',
        link: 'last_name',
        i: 1,
    },
    {
        title: 'and your last name? *',
        id: 'last_name',
        link: 'city',
        i: 2,
    },
    {
        title: 'what city and state are you from? (or put a zipcode) *',
        id: 'city',
        link: 'occupation',
        i: 3,
    },
    {
        title: 'got a job? or are you a student? *',
        id: 'occupation',
        link: '',
        i: 4,
    },
];
