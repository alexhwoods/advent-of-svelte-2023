import type { PageLoad } from './$types';
import { ChildStatus } from './types';

export async function load({ fetch }) {
	const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
	const data: { name: string; tally: number }[] = await response.json();

	return {
		props: {
			children: data.map((value) => ({
				...value,
				status: value.tally > 0 ? ChildStatus.NICE : ChildStatus.NAUGHTY
			}))
		}
	};
}
// If I disable SSR, the fetch endpoint will be called on the client side.
// Like a typical SPA.
// export const ssr = false;
