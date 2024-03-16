<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';

	// import Header from './Header.svelte';
	// import { setContext } from 'svelte';
	// import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { handleSubmitStore } from './store';
	export let imgUrl;
	let Result = null
	let algorithm = '-- SELECT --'
	let formData = {
    	// your form data properties
		scale: 2,
		scaleX: 2,
		scaleY: 2,
		isScaleXYConnected: true,
		algorithm: "none"
	};

	// export function handleSubmit(event) {
	export let handleSubmit = (event) => {
		// // Your form submission logic goes here

		// // For example, you can send the form data to an API
		// // or perform any other asynchronous operation.
		console.log("Form submitted!", formData);

		Post();
	}
	onMount(() => {
		handleSubmitStore.set(handleSubmit);
	});

	function handleScaleXYChange(event) {
		console.log("Scale changed!", event.target.value);

		if (formData.isScaleXYConnected) {
			formData.scaleX = event.target.value;
			formData.scaleY = event.target.value;
		}

		if (formData.scaleX === formData.scaleY) {
			console.log("Same scale");
			formData.scale = formData.scaleX;
		}
	}
	async function Post(){
		const res = await fetch('do wstawienia',{
			method: 'POST',
			body: JSON.stringify({
				// {imgUrl},
				algorithm
			})
		})
		const json = await res.json()
		console.log(JSON.stringify(json))
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div class="center-on-site">
		<form on:submit|preventDefault={handleSubmit}>
			<!-- 
				- preset
				- scale
					- Combined (if same)
				    - X
				    - Y
				- algorithm
					- box with filters and to choose list of algorithms
				- scale button
			-->
			<div id="preset">
				<label for="preset">Preset:</label>
				<select id="preset" name="preset">
					<option value="none">None</option>
					<option value="photo-realism">Photo Realism</option>
					<option value="de-jpeg">De JPEG</option>
					<option value="pixel-art">Pixel Art</option>
				</select>
			</div>

			<div id="scale-box">
				<label for="scale">Scale:</label>

				<input type="number" id="scale" name="scale" min="0" bind:value={formData.scale} required />

				<div id="scale-split">
					<span>
						<label for="scale-x">X:</label>
						<input type="number" id="scale-x" name="scale-x" min="0" bind:value={formData.scaleX} on:change={handleScaleXYChange} required />
					</span>

					<input type="checkbox" id="scale-x-y-connect" name="scale-x-y-connect" bind:checked={formData.isScaleXYConnected} />

					<span>
						<label for="scale-y">Y:</label>
						<input type="number" id="scale-y" name="scale-y" min="0" bind:value={formData.scaleY} on:change={handleScaleXYChange} required />
					</span>
				</div>
			</div>

			<label for="algorithm">Algorithm:</label>
			<!-- <select id="algorithm" name="algorithm" bind:value={algorithm}>
				<option value="none">None</option>
				<option value="nearest-neighbor">Nearest Neighbor</option>
				<option value="bilinear">Bilinear</option>
				<option value="bicubic">Bicubic</option>
				<option value="lanczos">Lanczos</option>
			</select> -->
			<select id="algorithm" name="algorithm" bind:value={algorithm}></select>

			<button type="submit">Scale</button>

			<!-- <label for="name">Name:</label>
			<input type="text" id="name" name="name" required />

			<label for="email">Email:</label>
			<input type="email" id="email" name="email" required />

			<label for="message">Message:</label>
			<textarea id="message" name="message" required></textarea> -->
		</form>
	</div>
</section>

<style>
	section {
		display: flex;
		align-items: center;
		justify-content: center;

		height: calc(var(--j) * 8);
	}
	@media only screen and (max-height: 1440px) {
		section {
			height: calc(var(--j) * 8.6666);
		}
	}
	@media only screen and (max-height: 1080px) {
		section {
			height: calc(var(--j) * 3.3333);
		}
	}

	.center-on-site {
		width: calc(var(--j) * 14);

		display: flex;
		flex-direction: column;
	}

	form {
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		/* justify-content: space-around; */
		
		/* grid-template-columns: repeat(2, 1fr); */
		/* grid-template-rows: repeat(3, auto); */
		/* gap: 1em; */

		color: var(--font-color-1);
	}
	form div {
		display: flex;
		flex-direction: row;
		/* justify-content: space-between; */
	}

	form input, form textarea {
		background-color: rgb(79, 79, 89);
		border: none;
		/* border-radius: calc(var(--j) / 32); */
		border-radius: 2px;

		padding: calc(var(--j) / 24 + 2px);

		color: var(--font-color-1);
	}

	#scale-box {
		width: fit-content;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		border: 1px solid var(--font-color-1);

		transition: all 0.2s;
	}
	#scale-box input {
		width: calc(var(--j) / 1.5);
	}
	#scale-split {
		display: none;
		/* visibility: hidden; */
	}
	#scale-box:hover #scale-split {
		display: flex;
		flex-direction: column;
	}
	#scale-box:hover #scale {
		display: none;
		/* visibility: hidden; */
	}
</style>
