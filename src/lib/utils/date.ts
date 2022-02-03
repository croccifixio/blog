import { Temporal } from '@js-temporal/polyfill';

const ORDINALS = {
	one: 'st' as const,
	two: 'nd' as const,
	few: 'rd' as const,
	many: 'th' as const,
	zero: 'th' as const,
	other: 'th' as const,
};

const destructureDate = (
	date: Temporal.PlainDate,
): {
	date: Temporal.PlainDate;
	day: number;
	month: string;
	ordinal: typeof ORDINALS[keyof typeof ORDINALS];
	year: number;
} => {
	const pluralFormatter = new Intl.PluralRules('en-gb', { type: 'ordinal' });

	return {
		day: date.day,
		date,
		month: date.toLocaleString('en-gb', { month: 'long' }),
		ordinal: ORDINALS[pluralFormatter.select(date.day)],
		year: date.year,
	};
};

const formatDate = (date: string): string => {
	const { day, ordinal, month, year } = destructureDate(Temporal.PlainDate.from(date));

	return `${day}${ordinal} ${month} ${year}`;
};

export { formatDate };
