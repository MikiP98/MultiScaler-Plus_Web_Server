<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import ImageContainer from './ImageContainer.svelte';

	import cog from '$lib/images/cog.png';
	import loading from '$lib/images/loading.png';

	// import page_scaling from './+page.svelte';
	// import { getContext } from 'svelte';
	import { onMount } from 'svelte';
	import { handleSubmitStore, fileStore, imageOutputUrlStore, imageOutputFileStore, imageIsChangingStore } from './store';
	import Page from './+page.svelte'
	// let image = "https://www.w3schools.com/w3images/lights.jpg";

    function handleFileSelect(evt) {
        const files = evt.target.files;
        const file = files[0];
		fileStore.set(file);

        const reader = new FileReader();

        reader.onload = (function (theFile) {
        return function (e) {
            imageUrl = e.target?.result;
			// console.log(imageUrl);

			getImageSize();
        };
        })(file);

        reader.readAsDataURL(file);
    }

    let imageUrl;
	export let imageFile;

	export let imageOutputUrl;
	$: imageOutputUrl = $imageOutputUrlStore;

	export let imageOutputFile;
	$: imageOutputFile = $imageOutputFileStore;

	export let imageIsChanging;
	$: imageIsChanging = $imageIsChangingStore;
	imageIsChangingStore.set(false);

    function onFileInputChange(event) {
		console.log("File input changed");
        handleFileSelect(event);
    }

	let handleSubmit;
	onMount(() => {
		const unsubscribe = handleSubmitStore.subscribe((value) => {
			handleSubmit = value;
		});

		// Cleanup the subscription when the component is destroyed
		return () => {
			unsubscribe();
		};
	});
	function handleScaling(event) {
		console.log("Scaling");
		// console.log(imageFile)
		
		// Run function from +page.svelte
		if (handleSubmit) {
			handleSubmit(event);
		} else {
			console.error("No handleSubmit function found");
		}
	}

	function handleOutputToInput(event) {
		console.log("Output to input");
	}
	
	function handleImageDownload(event) {
		console.log("Image download");
		// Download imageOutputFile
		// const url = URL.createObjectURL(imageOutputFile);
	}

	let inputImageWidth = 200;
	let inputImageHeight = 200;
	let inputImageDisplayWidth = 200;
	let inputImageDisplayHeight = 200;
	let inputImageAspectRatio = 1;
	let inputImageScale = 100;

	function getImageSize() {
		const img = new Image();
		img.src = imageUrl;

		img.onload = function() {
			inputImageWidth = img.width;
			inputImageHeight = img.height;
			inputImageDisplayWidth = img.width;
			inputImageDisplayHeight = img.height;
			inputImageAspectRatio = img.width / img.height;

			console.log("Input image width: " + inputImageWidth);
			console.log("Input image height: " + inputImageHeight);

			hendleInputImageSizing();

			// Temporal, delete after proper implementation!
			outputImageWidth = inputImageWidth;
			outputImageHeight = inputImageHeight;
			outputImageDisplayWidth = inputImageDisplayWidth;
			outputImageDisplayHeight = inputImageDisplayHeight;
		};
	}

	function hendleInputImageSizing() {
		let conteinerWidth = document.querySelector(".image-container-input")?.clientWidth;
		let conteinerHeight = document.querySelector(".image-container-input")?.clientHeight;

		if (inputImageDisplayHeight <= conteinerHeight && inputImageDisplayWidth <= conteinerWidth) {
			if (inputImageWidth < 0.5 * conteinerWidth && inputImageHeight < 0.5 * conteinerHeight) {
				if (inputImageAspectRatio > 1) {
					inputImageDisplayWidth = conteinerWidth / 3 * 2;
					inputImageDisplayHeight = inputImageHeight * (inputImageDisplayWidth / inputImageWidth);
					
					inputImageScale = Math.round(inputImageDisplayWidth / inputImageWidth * 100);
				} else {
					inputImageDisplayHeight = conteinerHeight / 3 * 2;
					inputImageDisplayWidth = inputImageWidth * (inputImageDisplayHeight / inputImageHeight);

					inputImageScale = Math.round(inputImageDisplayHeight / inputImageHeight * 100);
				}
			} else {
				// Image fits and isn't too small, keep it as is
			}
		}
		else {
			if (inputImageAspectRatio > 1) {
				inputImageDisplayWidth = conteinerWidth / 3 * 2;
				inputImageDisplayHeight = inputImageHeight * (inputImageDisplayWidth / inputImageWidth);
				
				inputImageScale = Math.round(inputImageDisplayWidth / inputImageWidth * 100);
			} else {
				inputImageDisplayHeight = conteinerHeight / 3 * 2;
				inputImageDisplayWidth = inputImageWidth * (inputImageDisplayHeight / inputImageHeight);

				inputImageScale = Math.round(inputImageDisplayHeight / inputImageHeight * 100);
			}
		}
	}

	function handleInputImageUpSizing() {
		inputImageDisplayWidth = inputImageDisplayWidth * 1.1;
		inputImageDisplayHeight = inputImageDisplayHeight * 1.1;
		inputImageScale = Math.round(inputImageDisplayWidth / inputImageWidth * 100);
	}

	function handleInputImageDownSizing() {
		inputImageDisplayWidth = inputImageDisplayWidth * 0.9;
		inputImageDisplayHeight = inputImageDisplayHeight * 0.9;
		inputImageScale = Math.round(inputImageDisplayWidth / inputImageWidth * 100);
	}


	let outputImageWidth = 200;
	let outputImageHeight = 200;
	let outputImageDisplayWidth = 200;
	let outputImageDisplayHeight = 200;
	let outputImageAspectRatio = 1;
	let outputImageScale = 100;
	
	function getOutputImageSize() {
		const img = new Image();
		img.src = imageOutputUrl;

		img.onload = function() {
			outputImageWidth = img.width;
			outputImageHeight = img.height;
			outputImageDisplayWidth = img.width;
			outputImageDisplayHeight = img.height;
			outputImageAspectRatio = img.width / img.height;

			console.log("Output image width: " + outputImageWidth);
			console.log("Output image height: " + outputImageWidth);

			hendleOutputImageSizing();
		};
	}

	function hendleOutputImageSizing() {
		let conteinerWidth = document.querySelector(".image-container-output")?.clientWidth;
		let conteinerHeight = document.querySelector(".image-container-output")?.clientHeight;

		if (outputImageDisplayHeight <= conteinerHeight && outputImageDisplayWidth <= conteinerWidth) {
			if (outputImageWidth < 0.5 * conteinerWidth && outputImageHeight < 0.5 * conteinerHeight) {
				if (outputImageAspectRatio > 1) {
					outputImageDisplayWidth = conteinerWidth / 3 * 2;
					outputImageDisplayHeight = outputImageHeight * (outputImageDisplayWidth / outputImageWidth);
					
					outputImageScale = Math.round(outputImageDisplayWidth / outputImageWidth * 100);
				} else {
					outputImageDisplayHeight = conteinerHeight / 3 * 2;
					outputImageDisplayWidth = outputImageWidth * (outputImageDisplayHeight / outputImageHeight);

					outputImageScale = Math.round(outputImageDisplayHeight / outputImageHeight * 100);
				}
			} else {
				// Image fits and isn't too small, keep it as is
			}
		}
		else {
			if (outputImageAspectRatio > 1) {
				outputImageDisplayWidth = conteinerWidth / 3 * 2;
				outputImageDisplayHeight = outputImageHeight * (outputImageDisplayWidth / outputImageWidth);
				
				outputImageScale = Math.round(outputImageDisplayWidth / outputImageWidth * 100);
			} else {
				outputImageDisplayHeight = conteinerHeight / 3 * 2;
				outputImageDisplayWidth = outputImageWidth * (outputImageDisplayHeight / outputImageHeight);

				outputImageScale = Math.round(outputImageDisplayHeight / outputImageHeight * 100);
			}
		}
	}

	function handleOutputImageUpSizing() {
		outputImageDisplayWidth = outputImageDisplayWidth * 1.1;
		outputImageDisplayHeight = outputImageDisplayHeight * 1.1;
		outputImageScale = Math.round(outputImageDisplayWidth / outputImageWidth * 100);
	}

	function handleOutputImageDownSizing() {
		outputImageDisplayWidth = outputImageDisplayWidth * 0.9;
		outputImageDisplayHeight = outputImageDisplayHeight * 0.9;
		outputImageScale = Math.round(outputImageDisplayWidth / outputImageWidth * 100);
	}
</script>

<header>
	<!-- <Page imgUrl= {imageUrl}/> -->
	<div class="center-on-site">
		<div id="image-processing-window">

			<h1 id="input-info-text">Input</h1>
			<div class="image-container-input" style="--css-image: url({imageUrl});">
				<div class="background-image-bloom">
					<div class="blur">
						<div class="visible-image">
							{#if !imageUrl}
								<input type="file" id="file" accept="image/*" on:change="{onFileInputChange}" />
							{/if}
							{#if imageUrl}
								<img src="{imageUrl}" alt="Selected Image" width="{ inputImageDisplayWidth }px" height="{inputImageDisplayHeight}px" />
							{/if}
						</div>
						
						<div id="controls">
							<span>
								{inputImageScale}% {inputImageWidth}x{inputImageHeight}
							</span>
							<span>
								<button on:click={handleInputImageUpSizing}>+</button>
								<button on:click={handleInputImageDownSizing}>-</button>
							</span>
							<span>
								<input id="preview-mode" name="preview-mode" type="checkbox">
								<label for="preview-mode">preview mode</label>
							</span>
							<span>
								<button>
									X
									<!-- <img src={trash-can} /> -->
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>

			<h1 id="output-info-text">Output</h1>
			<div class="image-container-output" style="--css-image: url({imageOutputUrl});">
				<div class="background-image-bloom">
					<div class="blur">
						<div class="visible-image">
							{#if imageIsChanging}
								<img src={loading} alt="loading circle" id="loading-circle">
							{/if}
							{#if imageOutputUrl}
								<img src={imageOutputUrl} alt="Selected Image" width="{ outputImageDisplayWidth }px" height="{ outputImageDisplayHeight }px" />
							{/if}
						</div>
						
						<div id="controls">
							<span>
								{outputImageScale}% {outputImageWidth}x{outputImageHeight}
							</span>
							<span>
								<button on:click={handleOutputImageUpSizing}>+</button>
								<button on:click={handleOutputImageDownSizing}>-</button>
							</span>
							<span>
								<a on:click={handleImageDownload} href={imageOutputUrl} target="_blank">↓</a>
							</span>
						</div>
					</div>
				</div>
			</div>

			<div id="arrows">
				<button class="interactable" on:click={handleScaling}>→</button>
				<button class="interactable" on:click={handleOutputToInput}>←</button>
			</div>

			<button id="settings">
				<img src={cog} alt="Setting cog" class="interactable" />
			</button>

		</div>
		<nav>
			<ul>
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined} class="selected">
					<a href="/">Scale</a>
				</li>
				<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
					<a href="/about">Filter</a>
				</li>
				<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
					<a href="/sverdle">HDR</a>
				</li>
				<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
					<a href="/sverdle">Edit</a>
				</li>
			</ul>
			<span id="JM-RSmall">
				<a href="https://google.com" target="_blank">AI</a>
			</span>
		</nav>
	</div>
</header>

<style>
	*, :global(*), header, :global(header) {
		margin: 0;
		padding: 0;
		min-width: 0;
		min-height: 0;

		--j: calc(100vh / 17);

		/* border-radius: 1px; */
	}
	@media only screen and (max-height: 1080px) {
		*, :global(*), header, :global(header) {
			--j: calc(100vh / 12);
		}
	}

	header, :global(header) {
		display: flex;
		justify-content: center;
		/* align-content: center; */
	}

	.center-on-site {
		/* width: calc(var(--j) * 14); */
		width: calc(var(--j) * 18);
		/* margin: 0 auto; */
	}


	#image-processing-window {
		/* padding: var(--j);

		display: flex;
		justify-content: space-between;
		align-content: center; */

		width: 100%;
		/* height: calc(var(--j) * 9); */
		aspect-ratio: 2 / 1;
		height: auto;

		display: grid;
		grid-template-columns: var(--j) auto calc(var(--j) * 2) auto var(--j);
		grid-template-rows: var(--j) auto var(--j);

		box-shadow: inset 0 0 16px 16px rgba(0, 0, 0, 0.333);

		/* box-sizing: border-box;
		border: 1px solid rgba(0, 0, 0, 0.2); */
	}

	#input-info-text, #output-info-text {
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;

		color: var(--font-color-1);
		letter-spacing: 0.5em;
		font-size: calc(var(--j) / 2);
		text-align: center;

		padding-left: calc(var(--j) / 16);

		filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.666));
	}
	.image-container-input, .image-container-output {
		width: 100%;
		height: 100%;
        /* width: calc(var(--j) * 5);
		height: calc(var(--j) * 5); */

		background-color: rgba(255, 255, 255, 0.1);

		--shadow-size: calc(var(--j) / 10);
        box-shadow: 0 0 var(--shadow-size) var(--shadow-size) rgba(0, 0, 0, 0.25);
		/* filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.25)); */

		/* box-sizing: border-box;
		border: 1px solid rgba(0, 0, 0, 0.5); */

		/* border-radius: calc(var(--j) / 32); */
		border-radius: 2px;
    }
	.image-container-input *, .image-container-output * {
		/* border-radius: calc(var(--j) / 32); */
		border-radius: 2px;
	}

	#input-info-text {
		grid-area: 1 / 2;
	}
	.image-container-input {
		grid-area: 2 / 2;
	}

    .background-image-bloom {
        width: 100%;
		height: 100%;
		/* height: calc(var(--j) * 4); */

        background-image: var(--css-image);
		/* filter: saturate(1.5); */
        
        /* --gradient-radial: radial-gradient(circle, rgba(0,0,0,0.333) 0%, rgba(0,0,0,0) 133%);
        -webkit-mask-image: var(--gradient-radial);
        mask-image: var(--gradient-radial); */

        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        /* background-repeat: no-repeat; */
    }
    .blur {
		width: 100%;
		height: 100%;
        /* width: calc(var(--j) * 5);
		height: calc(var(--j) * 5); */
		/* height: calc(var(--j) * 4); */

        backdrop-filter: blur(calc(var(--j) / 1.5)) saturate(1.333) brightness(1.333);
        background: rgb(0,0,0);
        background: radial-gradient(circle, rgba(0,20,40,0.5) 0%, rgba(0,20,40,1) 100%);

        /* display: flex;
        justify-content: center;
        align-items: center; */
		display: grid;
		grid-template-rows: auto var(--j);
    }
	@media only screen and (max-height: 1440px) {
		.blur {
			grid-template-rows: auto calc(var(--j) * 0.6666);
		}
	}
	.visible-image {
		position: relative;
		/* top: calc(var(--j) * -5); */

		display: flex;
		justify-content: center;
		align-items: center;

		width: 100%;
		height: 100%;

		overflow: scroll;

		filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.666));
		image-rendering: pixelated;
	}
	.visible-image > * {
		position: absolute;
	}
	#loading-circle {
		z-index: 1;
		image-rendering: auto;
		image-rendering: high-quality;
		/* box-shadow: 0 0 32 32 rgba(0, 0, 0, 0.333); */
	}
    /* .blur img {
        --gradient-um: linear-gradient(black, black);
        -webkit-mask-image: var(--gradient-um); 
        mask-image: var(--gradient-um);
    } */
    #controls {
		/* position: relative;
		top: calc(var(--j) * -1); */

        /* width: calc(var(--j) * 5);
		height: var(--j); */
		width: 100%;
		height: 100%;

		/* background-color: rgba(255, 255, 255, 0.25); */
		background: linear-gradient(0deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.25) 90%, rgba(255,255,255,0.2) 95%, rgba(255,255,255,0) 100%);
		/* z-index: 1; */

		display: flex;
		justify-content: space-evenly;
		align-items: center;

		font-size: calc(var(--j) / 4);
    }
	/* @media only screen and (max-height: 1000px) {
		#controls {
			height: calc(var(--j) * 0.6666);
		}
	} */

	#output-info-text {
		grid-area: 1 / 4;
	}
	.image-container-output {
		grid-area: 2 / 4;
    }
	#loading-circle {
		height: 30%;
		width: auto;

		filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.1));
		/* filter: opacity(0.5); */

		animation: spin 6s ease-in-out infinite;
	}
	@keyframes spin {
		0% { 
			transform: rotate(0deg); 
			filter: hue-rotate(0deg);
		}
		100% { 
			transform: rotate(1080deg); 
			filter: hue-rotate(360deg);
		}
	}
	/* .temp-in-out {
		grid-area: 2 / 4;

		width: 100%;
		height: 100%;
		/* width: calc(var(--j) * 5);
		height: calc(var(--j) * 5); 

		background-color: green;
	} */


	#arrows {
		grid-area: 2 / 3;
		height: 100%;
		width: 100%;

		display: flex;

		flex-direction: column;

		justify-content: center;
		align-items: center;
	}
	#arrows button {
		font-size: calc(var(--j) / 1.05);
		text-align: center;
		color: var(--font-color-1);

		transform: scaleX(1.25);

		background-color: rgba(0, 0, 0, 0);
		border: none;

		filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.666));
	}
	#arrows button:hover {
		filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.5)) saturate(1.1) brightness(1.1);

		transition: all 0.166s ease-in-out;
		transform: scale(1.1) scaleX(1.3);
	}

	#settings {
		grid-area: 1 / 5;
		height: 100%;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;

		background-color: transparent;
		border: none;
	}
	#settings img {
		width: 80%;
		height: 80%;

		filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.666));
	}
	#settings img:hover {
		filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.5)) saturate(1.1) brightness(1.1);

		transition: all 0.3s ease-in-out;
		transform: rotate(60deg) scale(1.05);
	}


	nav, :global(nav) {
		height: var(--j);

		display: grid;
		grid-template-columns: auto var(--j);

		--font-color-1: var(--font-color-1);
	}
	@media only screen and (max-height: 1440px) {
		nav, :global(nav) {
			height: calc(var(--j) * 0.6666);

			grid-template-columns: auto calc(var(--j) * 0.6666);
		}
	}
	ul, :global(ul) {
		height: 100%;
		max-width: calc(var(--j) * 13);

		text-decoration: none;
		list-style: none;

		display: flex;
		justify-content: space-evenly;
	}
	nav li, :global(nav li), nav span, :global(nav span) {
		width: 100%;

		box-sizing: border-box;
		border: 1px solid whitesmoke; /* temp */

		display: flex;
		justify-content: center;
		align-items: center;

		--font-color-1: rgb(176, 176, 208);
		font-family: 'Courier New', Courier, monospace;
		/* font-weight: 600; */
		/* color: var(--font-color-1); */
		text-decoration: none;
		text-shadow: 0.5px 0 var(--font-color-1), 0 0.5px var(--font-color-1), 0.5px 0.5px var(--font-color-1);
		font-size: calc(var(--j)/1.666);

		/* filter: drop-shadow(0 0 30px var(--font-color-1)); */
	}
	nav li a, :global(nav li a), nav span a, :global(nav span a) {
		/* filter: drop-shadow(0 0 6px rgba(0, 0, 0, 1)); */
		/* text-shadow: 1px 0 black, 0 1px black, 1px 1px black; */
		/* text-shadow: 5px 0 var(--font-color-1), 0 5px var(--font-color-1), 5px 5px var(--font-color-1); */
	}
	/* a:link {
		color: var(--font-color-1);
		background-color: transparent;
		text-decoration: none;
	} */
	@media only screen and (max-height: 1440px) {
		nav li, :global(nav li), nav span, :global(nav span) {
			font-size: calc(var(--j)/2.22);
		}
	}
	.selected {
		/* background-color: rgba(10, 20, 30, 0.5); */
		background-color: rgb(52, 52, 60, 0.566);
		border-bottom: 0;
		border-left: 0;
		/* border-left: 1px solid rgba(245, 245, 245, 0.1) */
	}
	/* #JM-RSmall {
		right: 0;

		width: var(--nav-height);
	} */
</style>
