<script lang="ts">
	import { toCanvas } from 'qrcode';

	let canvas: HTMLCanvasElement | undefined = $state();

	let { text } = $props();

	let errMsg = $state('');

	$effect(() => {
		toCanvas(
			canvas,
			text,
			{
				errorCorrectionLevel: 'H',
				scale: 10,
				margin: 2
			},
			(err) => {
				errMsg = err?.message ?? '';
			}
		);
	});
</script>

{#if text && !errMsg}
	<canvas bind:this={canvas} aria-label="QR code for list"></canvas>
{:else if errMsg}
	{errMsg}
{/if}

<style>
	canvas {
		max-width: 3em;
		max-height: 3em;
	}
</style>
