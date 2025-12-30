const openImageTab = (canvas: HTMLCanvasElement) => {
	const dataUrl = canvas.toDataURL('image/png');
	const w = window.open();
	if (!w) return;
	w.document.write(`<img src="${dataUrl}" style="width:100%">`);
};

const downloadAsLink = (canvas: HTMLCanvasElement, filename: string) => {
	const a = document.createElement('a');
	a.download = filename;
	a.href = canvas.toDataURL('image/png');
	a.click();
	return;
};

const canvasToFile = (canvas: HTMLCanvasElement, filename: string): Promise<File | null> =>
	new Promise((resolve) => {
		canvas.toBlob((blob) => {
			if (!blob) {
				resolve(null);
				return;
			}
			resolve(new File([blob], filename, { type: 'image/png' }));
		}, 'image/png');
	});

export const downloadCanvasImage = async (canvas: HTMLCanvasElement, filename = 'qrcode') => {
	filename = filename.endsWith('.png') ? filename : filename + '.png';

	if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
		openImageTab(canvas);
		return;
	}

	// modern yolo try catch controll flow
	try {
		const file = await canvasToFile(canvas, filename);
		await navigator.share({ files: [file!] });
		return; // success
	} catch {
		downloadAsLink(canvas, filename);
	}
};
