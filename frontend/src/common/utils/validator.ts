export const emptyValidator = (value) => {
    const v = JSON.stringify(value);
    if (v.includes('""')) {
        throw new Error('Has Empty Value');
    }
};
