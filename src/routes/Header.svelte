<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import ImageContainer from './ImageContainer.svelte';

	import cog from '$lib/images/cog.png';
	import loading from '$lib/images/loading.png';

	let image = "https://www.w3schools.com/w3images/lights.jpg";

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

    let imageUrl = "";

    function onFileInputChange(event) {
		console.log("File input changed");
        handleFileSelect(event);
    }

	function handleScaling(event) {
		console.log("Scaling");
	}

	function handleOutputToIntput(event) {
		console.log("Output to input");
	}
</script>

<header>
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
							<p>Controls</p>
						</div>
					</div>
				</div>
			</div>

			<h1 id="output-info-text">Output</h1>
			<div class="image-container-output" style="--css-image: url({imageUrl});">
				<div class="background-image-bloom">
					<div class="blur">
						<div class="visible-image">
							{#if !imageUrl}
								<img src={loading} alt="loading circle" id="loading-circle">
							{/if}
							{#if imageUrl}
								<img src={imageUrl} alt="Selected Image" width="200px" />
							{/if}
						</div>
						
						<div id="controls">
							<p>Controls</p>
						</div>
					</div>
				</div>
			</div>

			<div id="arrows">
				<button class="interactable" on:click={handleScaling}>→</button>
				<button class="interactable" on:click={handleOutputToIntput}>←</button>
			</div>

			<div id="settings">
				<img src={cog} alt="Setting cog" class="interactable" />
			</div>

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

		--font-color-1: rgb(176, 176, 208);

		--j: calc(100vh / 18);
	}
	@media only screen and (max-height: 1000px) {
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

	/* .interactable {
		cursor: pointer;

		filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.666));
	}
	.interactable:hover {
		filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.5)) saturate(1.1) brightness(1.1);

		transition: all 0.333s ease-in-out;
		transform: scale(1.05);
	} */


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

		filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.666));
	}
	.image-container-input, .image-container-output {
		width: 100%;
		height: 100%;
        /* width: calc(var(--j) * 5);
		height: calc(var(--j) * 5); */

		background-color: rgba(255, 255, 255, 0.1);

        box-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.25);
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

        width: calc(var(--j) * 5);
		height: var(--j);

		/* background-color: rgba(255, 255, 255, 0.25); */
		background: linear-gradient(0deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.25) 90%, rgba(255,255,255,0.2) 95%, rgba(255,255,255,0) 100%);
		/* z-index: 1; */
    }

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

		color: var(--font-color-1);
		text-decoration: none;
	}
	.selected {
		background-color: rgba(10, 20, 30, 0.5);
	}
	/* #JM-RSmall {
		right: 0;

		width: var(--nav-height);
	} */
</style>
