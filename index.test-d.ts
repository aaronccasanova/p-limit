import {expectType} from 'tsd';
import pLimit from './index.js';

const limit = pLimit(1);

const input = [
	limit(async () => 'foo'),
	limit(async () => 'bar'),
	limit(async () => undefined),
];

expectType<Promise<Array<string | undefined>>>(Promise.all(input));

expectType<Promise<string>>(limit((_a: string) => '', 'test'));
expectType<Promise<string>>(limit(async (_a: string, _b: number) => '', 'test', 1));

expectType<number>(limit.activeCount);
expectType<number>(limit.pendingCount);

expectType<void>(limit.clearQueue());

expectType<Promise<string>>(limit.with((input: number) => String(input))(1));

expectType<Promise<string[]>>(
	Promise.all([1, 2, 3].map(limit.with((input: number) => String(input)))),
);
