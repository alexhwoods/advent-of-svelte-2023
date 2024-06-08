<script lang="ts">
	import type { PageData } from './$types';
	import { ChildStatus } from './types';

	let { data } = $props();

	let child = $state('');
	let status = $state<ChildStatus | ''>('');

	function onChange(event: Event) {
		status = (event.target as HTMLInputElement).value as ChildStatus | '';
	}

	const filtered = $derived(
		data.props.children
			.filter((value) => value.name.toLowerCase().includes(child.toLowerCase()))
			.filter((value) => status == value.status || status == '')
	);
</script>

<h2>Search</h2>
<div>
	<input bind:value={child} placeholder="Search for a child" />
	<div>
		<label>
			<input checked={status == ''} onchange={onChange} type="radio" name="status" value={''} />
			All
		</label>
		<label>
			<input
				checked={status == ChildStatus.NICE}
				onchange={onChange}
				type="radio"
				name="status"
				value={ChildStatus.NICE}
			/> Nice
		</label>
		<label>
			<input
				checked={status == ChildStatus.NAUGHTY}
				onchange={onChange}
				type="radio"
				name="status"
				value={ChildStatus.NAUGHTY}
			/>
			Naughty
		</label>
	</div>
</div>

{#if filtered.length === 0}
	<p>No results found</p>
{:else}
	{#each filtered as { name, tally }, i}
		<div>
			<p>{name} | {tally}</p>
		</div>
	{/each}
{/if}
