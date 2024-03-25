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
	import { handleSubmitStore, imageUrlStore } from './store';
	import Page from './+page.svelte'
	// let image = "https://www.w3schools.com/w3images/lights.jpg";

    function handleFileSelect(evt) {
        const files = evt.target.files;
        const file = files[0];

        const reader = new FileReader();

        reader.onload = (function (theFile) {
        return function (e) {
            $: imageUrl = e.target.result;
			console.log(imageUrl);
        };
        })(file);

        reader.readAsDataURL(file);
    }

    export let imageUrl = "";
	// export let imageFile;
	let imageOutputUrl = "";

    function onFileInputChange(event) {
		console.log("File input changed");
        handleFileSelect(event);
    }

	let handleSubmit;
	onMount(() => {
		// imageUrlStore.set(imageUrl)

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
	const fetchImage = (async () => {
		const response = await fetch('scaled image url')
    return await response.json()
	})
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
								<img src="{imageUrl}" alt="Selected Image" width="200px" />
							{/if}
						</div>
						
						<div id="controls">
							<span>
								XXX%
							</span>
							<span>
								<button>+</button>
								<button>-</button>
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
							{#if !imageOutputUrl}
								<img src={loading} alt="loading circle" id="loading-circle">
							{/if}
							{#if imageOutputUrl}
								<img src={imageOutputUrl} alt="Selected Image" width="200px" />
							{/if}
						</div>
						
						<div id="controls">
							<span>
								XXX%
							</span>
							<span>
								<button>+</button>
								<button>-</button>
							</span>
							<span>
								<button>↓</button>
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

		border-radius: 1px;
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
		width: calc(var(--j) * 14);
		/* margin: 0 auto; */
	}


	#image-processing-window {
		/* padding: var(--j);

		display: flex;
		justify-content: space-between;
		align-content: center; */

		display: grid;
		grid-template-columns: var(--j) calc(var(--j) * 5) calc(var(--j) * 2) calc(var(--j) * 5) var(--j);
		grid-template-rows: var(--j) calc(var(--j) * 5) var(--j);

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
        width: calc(var(--j) * 5);
		height: calc(var(--j) * 5);
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

        backdrop-filter: blur(48px);
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
		/* position: relative;
		top: calc(var(--j) * -5); */

		display: flex;
		justify-content: center;
		align-items: center;

		width: 100%;
		height: 100%;

		overflow: scroll;

		filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.666));
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
