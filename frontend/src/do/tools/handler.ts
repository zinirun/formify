export const checkAnswerHandler = (answer) => {
    let notDone: string[] = [];
    for (let key in answer) {
        if (answer[key] === '' || (answer[key] instanceof Array && answer[key].length === 0)) {
            notDone.push(key);
        }
    }
    return {
        notDone,
        percent: 100 - Math.round((notDone.length / Object.keys(answer).length) * 100),
    };
};
