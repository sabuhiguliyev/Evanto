import { format, parseISO, isValid } from 'date-fns';

export const formatEventRange = (start?: string | Date, end?: string | Date) => {
    if (!start || !end) return '';

    const parse = (d: string | Date) => (typeof d === 'string' ? parseISO(d) : d);

    const startDate = parse(start);
    const endDate = parse(end);

    if (!isValid(startDate) || !isValid(endDate)) return '';

    return `${format(startDate, 'dd')} - ${format(endDate, 'dd MMM yyyy')}`;
};
