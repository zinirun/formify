const ERROR_HAS_EMPTY = new Error(`has empty value on required field`);

const emptyValidatorInOptions = (options) => {
    for (const option of options) {
        if (!option.value) {
            throw ERROR_HAS_EMPTY;
        }
    }
};

const emptyValidatorInQuestion = (question) => {
    if (!question.title) {
        throw ERROR_HAS_EMPTY;
    }
    emptyValidatorInOptions(question.options);
};

export const emptyValidatorOnUpdateForm = (form) => {
    if (!form.title) {
        throw ERROR_HAS_EMPTY;
    }
    const questions = JSON.parse(form.content);
    for (const question of questions) {
        emptyValidatorInQuestion(question);
    }
};
