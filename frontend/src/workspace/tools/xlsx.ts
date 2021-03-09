import XLSX from 'xlsx';

const personalsToExcelMapper = (personals: any[]) => {
    const header = personals[0].data.map((d) => d.title);
    const body = personals.map((p) => {
        const answer: any[] = [];
        p.data.forEach((d) => {
            answer.push(d.answer.join(', '));
        });
        return answer;
    });
    return [header, ...body];
};

export const createPersonalsToXLSX = async (personals) => {
    try {
        if (personals.length === 0) {
            throw new Error('NO DATA: PERSONALS');
        }
        const data = await personalsToExcelMapper(personals);
        console.log(data);
        const wb = XLSX.utils.book_new();
        const newWorksheet = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, newWorksheet, '폼 결과');
        XLSX.writeFile(wb, 'Formify-Result.xlsx');
    } catch (err) {
        throw new Error(err);
    }
};
