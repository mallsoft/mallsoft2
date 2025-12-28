<script lang="ts">
	import { toCanvas } from 'qrcode';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement | undefined = $state();

	const defaultData = 'https://mallsoft.dev/';
	const defaultColor = {
		dark: '#000000',
		light: '#ffffff00'
	};

	let data = $state('');
	let errMsg = $state();
	let color = $state(defaultColor);

	$effect(() => {
		toCanvas(
			canvas,
			data || defaultData,
			{
				errorCorrectionLevel: 'H',
				scale: 10,
				margin: 4,
				color
			},
			(err) => {
				errMsg = err?.message;
			}
		);
	});

	onMount(() => {
		color = defaultColor;
	});
</script>

<article>
	<h1>qrcode generator</h1>
	{#if errMsg}
		<pre>{errMsg}</pre>
	{:else}
		<canvas
			aria-label={data
				? `showing input data as a qrcode, length ${data.length}`
				: `showing default qrcode ${defaultData}`}
			bind:this={canvas}
		></canvas>
	{/if}

	<input type="text" placeholder={defaultData} bind:value={data} />
	<div class="color">
		<div>
			<label style:--color={color.dark}>
				<input type="color" bind:value={color.dark} />
			</label>
		</div>

		<div>
			<label style:--color={color.light}>
				<input type="color" bind:value={color.light} />
			</label>
		</div>

		<button
			type="reset"
			onclick={() => {
				color = defaultColor;
			}}>🗑</button
		>
	</div>
</article>

<style>
	canvas {
		aspect-ratio: 1 / 1;
		display: block;
		max-width: 100cqw;
		max-height: 100cqw;

		box-shadow:
			5px 15px 20px -12px #00000057,
			-5px 5px 20px -12px #00000057;

		border-radius: 5px;

		background: repeating-conic-gradient(
				rgba(128, 128, 128, 0.125) 0 25%,
				rgba(128, 128, 128, 0) 0 50%
			)
			50% / 10px 10px;
	}

	h1 {
		margin: 0;
	}

	article {
		display: flex;
		gap: 1rem;
		flex-direction: column;
		max-width: max-content;
	}

	input[type='text'] {
		margin-right: auto;

		box-sizing: border-box;
		width: 100%;
		padding: 0.5em 1em;
		font-size: 1em;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	input[type='color'] {
		/* visibility: hidden; */
		opacity: 0;
	}

	.color {
		margin-right: auto;
		display: flex;
		flex-wrap: wrap;
		gap: 0.25em;
	}

	.color label {
		box-sizing: border-box;
		display: block;
		width: 3em;
		height: 3em;

		background-color: var(--color);
	}

	.color > div {
		background: repeating-conic-gradient(
				rgba(128, 128, 128, 0.125) 0 25%,
				rgba(128, 128, 128, 0) 0 50%
			)
			50% / 10px 10px;
	}

	.color > button {
		box-sizing: border-box;
		display: block;
		font-size: inherit;
		width: 3em;
		height: 3em;
		background-color: white;
		border: none;
	}

	.color > * {
		border: 1px solid #ccc;
		border-radius: 5px;
		overflow: hidden;
	}
</style>
