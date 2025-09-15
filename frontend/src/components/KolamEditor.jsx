import { KolamExporter } from '../utils/kolamExporter';
import { KolamGenerator } from '../utils/kolamGenerator';
import { useKolamURLParams, updateURL, speedToDuration, durationToSpeed } from '../utils/urlParams';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KolamDisplay } from './KolamDisplay';
import { KolamParametes } from './KolamParametes';
import KolamGeneratorInputs from './Generator';

export const KolamEditor = () => {

	const [currentPattern, setCurrentPattern] = useState(null);
	// const [isExporting, setIsExporting] = useState(false);
	const [showDownloadMenu, setShowDownloadMenu] = useState(false);
	const [animationState, setAnimationState] = useState('stopped');
	const kolamRef = useRef(null);

	// Get URL parameters
	const urlParams = useKolamURLParams();
	const [size, setSize] = useState("1");
	const [animationSpeed, setAnimationSpeed] = useState(durationToSpeed(urlParams.duration));
	const [animationDuration, setAnimationDuration] = useState(urlParams.duration);
	const [initialAutoAnimate, setInitialAutoAnimate] = useState(urlParams.initialAutoAnimate);

	// Update URL when parameters change
	useEffect(() => {
		updateURL({ size, duration: animationDuration, initialAutoAnimate });
	}, [size, animationDuration, initialAutoAnimate]);

	// Update duration when speed changes
	useEffect(() => {
		const newDuration = speedToDuration(animationSpeed);
		setAnimationDuration(newDuration);
	}, [animationSpeed]);

	// Close download menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (showDownloadMenu && !(event.target).closest('.download-menu')) {
				setShowDownloadMenu(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [showDownloadMenu]);

	// Handle animation end detection
	useEffect(() => {
		if (animationState === 'playing' && currentPattern) {
			const timer = setTimeout(() => {
				setAnimationState('stopped');
			}, animationDuration);

			return () => clearTimeout(timer);
		}
	}, [animationState, currentPattern, animationDuration]);

	// Convert animation speed (1-10) to total animation duration - kept for UI display
	const getAnimationTiming = (speed) => {
		return speedToDuration(speed);
	};

	const generatePattern = useCallback(() => {
		console.log('Generating kolam pattern');

		try {
			console.log('Generating Kolam...');
			const pattern = KolamGenerator.generateKolam1D(size);

			console.log('Pattern generated successfully:', pattern);
			setCurrentPattern(pattern);
			setAnimationState('stopped'); // Reset animation when generating new pattern
			
			// Start animation after a brief delay if auto-animate is enabled
			if (initialAutoAnimate) {
				setTimeout(() => {
					setAnimationState('playing');
				}, 100);
			}
		} catch (error) {
			console.error('Error generating pattern:', error);
			const errorMessage = error instanceof Error ? error.message : String(error);
			alert(`Error generating pattern: ${errorMessage}`);
		}
	}, [size, initialAutoAnimate]);

	// Generate initial pattern on component mount
	useEffect(() => {
		generatePattern();
	}, [generatePattern]);

	// const exportPattern = async (format) => {
	// 	if (!currentPattern || !kolamRef.current) return;

	// 	setIsExporting(true);

	// 	try {
	// 		switch (format) {
	// 			case 'svg':
	// 				await KolamExporter.downloadSVG(currentPattern);
	// 				break;
	// 			case 'png':
	// 				await KolamExporter.downloadPNG(kolamRef.current, currentPattern.name);
	// 				break;
	// 			case 'gif':
	// 				await KolamExporter.downloadAnimatedGIF(
	// 					kolamRef.current,
	// 					currentPattern,
	// 					currentPattern.name,
	// 					{ format: 'gif', frameCount: 30, delay: animationDuration }
	// 				);
	// 				break;
	// 		}
	// 	} catch (error) {
	// 		console.error('Export failed:', error);
	// 		alert('Export failed. Please try again.');
	// 	} finally {
	// 		setIsExporting(false);
	// 	}
	// };

	// const getEmbedCode = async () => {
	// 	if (!currentPattern) return;

	// 	try {
	// 		const embedURL = generateEmbedURL({
	// 			size,
	// 			background: '#7b3306', // Default amber-900 background
	// 			brush: '#ffffff', // Default white brush
	// 		});

	// 		const embedCode = `<img src="${embedURL}" alt="Kolam Pattern" style="max-width: 100%; height: auto;" />`;

	// 		await navigator.clipboard.writeText(embedCode);
	// 		alert('Embed code copied to clipboard! This will display the kolam as an SVG image.');
	// 	} catch (error) {
	// 		console.error('Failed to generate embed code:', error);
	// 		alert('Failed to copy embed code. Please try again.');
	// 	}
	// };

	// const copyRawSVG = async () => {
	// 	if (!currentPattern) return;

	// 	try {
	// 		const svgContent = await KolamExporter.exportAsSVG(currentPattern);
	// 		await navigator.clipboard.writeText(svgContent);
	// 		alert('Raw SVG code copied to clipboard! You can paste this directly into HTML or image editing software.');
	// 	} catch (error) {
	// 		console.error('Failed to copy raw SVG:', error);
	// 		alert('Failed to copy raw SVG. Please try again.');
	// 	}
	// };
	 return (
		<div className="kolam-editor bg-amber-100 text-amber-900 min-h-screen">
			<div className="max-w-6xl mx-auto p-8">
				{/* Display Area */}
				<div className="kolam-display-area">
					{currentPattern ? (
						<div
							ref={kolamRef}
							className="kolam-container relative flex justify-center items-center bg-amber-900 border-4 border-white p-8 rounded-2xl shadow-lg"
						>
							<KolamDisplay
								pattern={currentPattern}
								animate={animationState === 'playing'}
								animationState={animationState}
								animationTiming={getAnimationTiming(animationSpeed)}
								className="kolam-main"
							/>

							{/* Save button overlaid on canvas */}
							{/* {currentPattern && (
								<div className="absolute top-4 right-4">
									<div className="relative download-menu">
										<button
											onClick={() => setShowDownloadMenu(!showDownloadMenu)}
											disabled={isExporting}
											className="p-3 bg-amber-900/90 border-2 text-white rounded-lg hover:bg-amber-800/90 transition-colors disabled:opacity-50 shadow-lg backdrop-blur-sm"
											style={{ borderColor: '#ffffff', backgroundColor: '#f0c75e' }}
											title="Download Options"
										>
											{isExporting ? '⏳' : '💾'}
										</button>

										{showDownloadMenu && (
											<div className="absolute right-0 mt-2 bg-amber-900 border-2 border-white rounded-lg shadow-lg py-1 z-10 min-w-[200px]">
												<button
													onClick={() => { exportPattern('svg'); setShowDownloadMenu(false); }}
													className="w-full text-left px-4 py-2 text-amber-100 hover:bg-amber-800 transition-colors"
												>
													📄 Download SVG
												</button>
												<button
													onClick={() => { exportPattern('png'); setShowDownloadMenu(false); }}
													className="w-full text-left px-4 py-2 text-amber-100 hover:bg-amber-800 transition-colors"
												>
													🖼️ Download PNG
												</button>
												<hr className="my-1 border-white" />
												<button
													onClick={() => { getEmbedCode(); setShowDownloadMenu(false); }}
													className="w-full text-left px-4 py-2 text-amber-100 hover:bg-amber-800 transition-colors"
												>
													📋 Copy Embed Code
												</button>
												<button
													onClick={() => { copyRawSVG(); setShowDownloadMenu(false); }}
													className="w-full text-left px-4 py-2 text-amber-100 hover:bg-amber-800 transition-colors"
												>
													📄 Copy Raw SVG
												</button>
											</div>
										)}
									</div>
								</div>
							)} */}
						</div>
					) : (
						<div className="no-pattern text-center py-12 bg-amber-900 border-2 border-white rounded-2xl">
							<p className="text-amber-100 text-lg">
								Loading your first kolam...
							</p>
						</div>
					)}
				</div>

				<KolamGeneratorInputs 
				props={
					setSize,
					size, 
					setAnimationSpeed, 
					animationSpeed, 
					animationDuration, 
					currentPattern,
					setCurrentPattern,
					animationState,
					setAnimationState,
					generatePattern,
					setInitialAutoAnimate,
					initialAutoAnimate
				}
					// setSize={setSize}
					// size={size}
					// setAnimationSpeed={setAnimationSpeed}
					// animationSpeed={animationSpeed}
					// animationDuration={animationDuration}
					// currentPattern={currentPattern}
					// setCurrentPattern={setCurrentPattern}
					// animationState={animationState}
					// setAnimationState={setAnimationState}
					// generatePattern={generatePattern}
					// setInitialAutoAnimate={setInitialAutoAnimate}
					// initialAutoAnimate={initialAutoAnimate}
				/>
			</div>
		</div>
	);
};
