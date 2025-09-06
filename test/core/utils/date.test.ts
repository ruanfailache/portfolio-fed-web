import { createDate, formatDate } from '@core/utils/date';

describe('Date Utils', () => {
  describe('createDate', () => {
    describe('Given different date inputs', () => {
      it.each([
        {
          description: 'valid ISO date string',
          input: '2024-01-15T10:30:00Z',
          expected: 'valid Date object with correct time'
        },
        {
          description: 'valid date string without time',
          input: '2024-12-25',
          expected: 'valid Date object'
        },
        {
          description: 'valid date string with timezone',
          input: '2024-06-15T14:30:00-03:00',
          expected: 'valid Date object with timezone'
        },
        {
          description: 'valid date string in different format',
          input: '2024/03/20',
          expected: 'valid Date object'
        },
        {
          description: 'empty string',
          input: '',
          expected: 'current date'
        },
        {
          description: 'invalid date string',
          input: 'invalid-date',
          expected: 'invalid Date object'
        },
        {
          description: 'null input',
          input: null,
          expected: 'current date'
        },
        {
          description: 'undefined input',
          input: undefined,
          expected: 'current date'
        }
      ])('Then should handle $description correctly', ({ input, expected }) => {
        const result = createDate(input as any);
        
        expect(result).toBeInstanceOf(Date);
        
        if (expected === 'current date') {
          const now = new Date();
          expect(result.getTime()).toBeGreaterThanOrEqual(now.getTime() - 1000);
          expect(result.getTime()).toBeLessThanOrEqual(now.getTime() + 1000);
        } else if (expected.includes('invalid')) {
          expect(isNaN(result.getTime())).toBe(true);
        } else {
          expect(result.getTime()).not.toBeNaN();
          if (input && typeof input === 'string' && input !== '') {
            expect(result.getTime()).toBe(new Date(input).getTime());
          }
        }
      });
    });

    describe('Given no input parameter', () => {
      it('Then should return current date', () => {
        const before = new Date();
        const result = createDate();
        const after = new Date();
        
        expect(result).toBeInstanceOf(Date);
        expect(result.getTime()).toBeGreaterThanOrEqual(before.getTime());
        expect(result.getTime()).toBeLessThanOrEqual(after.getTime());
      });
    });
  });

  describe('formatDate', () => {
    describe('Given different dates to format', () => {
      it.each([
        {
          description: 'January date',
          date: new Date('2024-01-15T10:30:00Z'),
          expectedMonth: 'janeiro',
          expectedYear: '2024',
          expectedDay: '15'
        },
        {
          description: 'February date',
          date: new Date('2024-02-14T12:00:00Z'),
          expectedMonth: 'fevereiro',
          expectedYear: '2024',
          expectedDay: '14'
        },
        {
          description: 'March date',
          date: new Date('2024-03-20T12:00:00Z'),
          expectedMonth: 'março',
          expectedYear: '2024',
          expectedDay: '20'
        },
        {
          description: 'April date',
          date: new Date('2024-04-01T08:15:00Z'),
          expectedMonth: 'abril',
          expectedYear: '2024',
          expectedDay: '1'
        },
        {
          description: 'May date',
          date: new Date('2024-05-25T16:45:00Z'),
          expectedMonth: 'maio',
          expectedYear: '2024',
          expectedDay: '25'
        },
        {
          description: 'June date',
          date: new Date('2024-06-10T20:30:00Z'),
          expectedMonth: 'junho',
          expectedYear: '2024',
          expectedDay: '10'
        },
        {
          description: 'July date',
          date: new Date('2024-07-04T14:20:00Z'),
          expectedMonth: 'julho',
          expectedYear: '2024',
          expectedDay: '4'
        },
        {
          description: 'August date',
          date: new Date('2024-08-15T09:10:00Z'),
          expectedMonth: 'agosto',
          expectedYear: '2024',
          expectedDay: '15'
        },
        {
          description: 'September date',
          date: new Date('2024-09-22T11:55:00Z'),
          expectedMonth: 'setembro',
          expectedYear: '2024',
          expectedDay: '22'
        },
        {
          description: 'October date',
          date: new Date('2024-10-31T18:00:00Z'),
          expectedMonth: 'outubro',
          expectedYear: '2024',
          expectedDay: '31'
        },
        {
          description: 'November date',
          date: new Date('2024-11-11T13:25:00Z'),
          expectedMonth: 'novembro',
          expectedYear: '2024',
          expectedDay: '11'
        },
        {
          description: 'December date',
          date: new Date('2024-12-25T12:00:00Z'),
          expectedMonth: 'dezembro',
          expectedYear: '2024',
          expectedDay: '25'
        }
      ])('Then should format $description correctly', ({ date, expectedMonth, expectedYear, expectedDay }) => {
        const result = formatDate(date);
        
        expect(result).toContain(expectedMonth);
        expect(result).toContain(expectedYear);
        expect(result).toContain(expectedDay);
        
        const expectedPattern = /^\d{1,2} de [a-záêçõ]+ de \d{4}$/;
        expect(result).toMatch(expectedPattern);
      });
    });

    describe('Given edge case dates', () => {
      it.each([
        {
          description: 'leap year date',
          date: new Date('2024-02-29T12:00:00Z'),
          expectedMonth: 'fevereiro',
          expectedYear: '2024',
          expectedDay: '29'
        },
        {
          description: 'first day of year',
          date: new Date('2024-01-01T12:00:00Z'),
          expectedMonth: 'janeiro',
          expectedYear: '2024',
          expectedDay: '1'
        },
        {
          description: 'last day of year',
          date: new Date('2024-12-31T23:59:59Z'),
          expectedMonth: 'dezembro',
          expectedYear: '2024',
          expectedDay: '31'
        },
        {
          description: 'different year',
          date: new Date('2023-06-15T10:30:00Z'),
          expectedMonth: 'junho',
          expectedYear: '2023',
          expectedDay: '15'
        }
      ])('Then should handle $description correctly', ({ date, expectedMonth, expectedYear, expectedDay }) => {
        const result = formatDate(date);
        
        expect(result).toContain(expectedMonth);
        expect(result).toContain(expectedYear);
        expect(result).toContain(expectedDay);
      });
    });
  });
});
