<script lang="ts">
	import { boolean } from 'drizzle-orm/gel-core';
	import { toCanvas } from 'qrcode';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement | undefined = $state();

	const defaultData = 'https://mallsoft.dev/';
	const defaultColor = {
		dark: '#663399',
		light: '#ffffff00'
	};

	let data = $state('');
	let errMsg = $state('');
	let color = $state(defaultColor);

	$effect(() => {
		toCanvas(
			canvas,
			data || defaultData,
			{
				errorCorrectionLevel: 'H',
				scale: 20,
				margin: 4,
				color
			},
			(err) => {
				errMsg = err?.message ?? '';
			}
		);
	});

	onMount(() => {
		color = defaultColor;
	});

	const downloadTheThing = () => {
		if (!canvas) return;
		const link = document.createElement('a');
		link.download = 'canvas.png';
		link.href = canvas.toDataURL('image/png');
		link.click();
	};
</script>

<div class="container">
	{#if errMsg}
		<pre>{errMsg}</pre>
	{:else}
		<div class="qr">
			<canvas
				aria-label={data
					? `showing input data as a qrcode, length ${data.length}`
					: `showing default qrcode ${defaultData}`}
				bind:this={canvas}
			></canvas>
		</div>
	{/if}

	<div class="data">
		<input type="text" aria-label="qr code data" placeholder={defaultData} bind:value={data} />
		<button
			aria-label="reset"
			type="reset"
			onclick={() => {
				data = '';
			}}>🗑</button
		>
	</div>
	<div class="color">
		<label style:--color={color.dark} aria-label="background color">
			<input type="color" bind:value={color.dark} />
		</label>

		<label style:--color={color.light} aria-label="foreground color">
			<input type="color" bind:value={color.light} />
		</label>

		<button
			aria-label="reset"
			type="reset"
			onclick={() => {
				color = defaultColor;
			}}>🗑</button
		>
	</div>

	<button disabled={!!errMsg} onclick={downloadTheThing}>Download</button>
</div>

<style>
	canvas {
		display: block;
		background: repeating-conic-gradient(
				rgba(128, 128, 128, 0.125) 0 25%,
				rgba(128, 128, 128, 0) 0 50%
			)
			50% / 10px 10px;

		box-shadow:
			0 0 10px 0 #0000001f,
			10px 10px 15px -10px #0000004f;

		border-radius: 10px;

		max-width: 100cqw;
		max-height: 100cqw;
	}

	.qr {
		container-type: inline-size;
		position: relative;
		width: 100%;
	}

	.container {
		display: flex;
		gap: 1rem;
		flex-direction: column;
		max-width: max-content;
		margin: 1em 0;
	}

	input[type='text'] {
		margin-right: auto;
		width: 100%;
	}

	input[type='color'] {
		opacity: 0;
	}

	.data {
		display: flex;
		gap: 0.25em;
		align-items: center;
	}

	.color {
		margin-right: auto;
		display: flex;
		flex-wrap: wrap;
		gap: 0.25em;
	}

	.color label {
		position: relative;

		display: block;
		border: 4px solid color-mix(in srgb, var(--color), black 30%);
		border-radius: 1000px;
		overflow: hidden;

		width: 3em;
		height: 3em;

		background-color: var(--color);
	}

	.color label:is(:hover, :focus-visible) {
		border: 4px solid color-mix(in srgb, var(--color), black 10%);
	}

	.color label::after {
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;

		background: repeating-conic-gradient(
				rgba(128, 128, 128, 0.125) 0 25%,
				rgba(128, 128, 128, 0) 0 50%
			)
			50% / 10px 10px;
	}

	.scale label {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}
</style>
