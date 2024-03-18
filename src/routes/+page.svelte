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
	let formData = {
    	// your form data properties
		scale: 2,
		scaleX: 2,
		scaleY: 2,
		isScaleXYConnected: true,
		algorithm: '',
		sharpness: 0.5
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
				// formData.algorithm
			})
		})
		const json = await res.json()
		console.log(JSON.stringify(json))
	}

	const classicOptions = ["Bilinear", "Bicubic", "Lanczos", "Nearest Neighbor"];
	const edgeDetectionOptions = ["xBRZ"];
	const smartOptions = ["FSR (GPU)"];
	const AIOptions = ["ESRGAN", "SUPIR"];

	function selectOption(option) {
		formData.algorithm = option;
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

			<div id="algorithm">
				<label for="algorithm">Algorithm:</label>
				<input type="text" placeholder="Select algorithm" bind:value={formData.algorithm} readonly />
			
				<div>Filters</div>
				<div class="custom-dropdown">
					<div class="dropdown-options">
						<div class="option-group">
							<span class="group-heading">-- Classic --</span>
							{#each classicOptions as option}
								<div class="option" on:click={() => selectOption(option)}>{option}</div>
							{/each}
						</div>
						<div class="option-group">
							<span class="group-heading">-- Edge detection --</span>
							{#each edgeDetectionOptions as option}
								<div class="option" on:click={() => selectOption(option)}>{option}</div>
							{/each}
						</div>
						<div class="option-group">
							<span class="group-heading">-- Smart --</span>
							{#each smartOptions as option}
								<div class="option" on:click={() => selectOption(option)}>{option}</div>
							{/each}
						</div>
						<div class="option-group">
							<span class="group-heading">-- AI --</span>
							{#each AIOptions as option}
								<div class="option" on:click={() => selectOption(option)}>{option}</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
			<div>
				<label for="sharpness">Sharpness:</label>
				<input type="number" step="0.01" id="sharpness" name="sharpness" bind:value={formData.sharpness}/>
			</div>

			<button type="submit">Scale</button>
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
		height: 100%;

		display: flex;
		flex-direction: column;
	}

	form {
		width: 100%;
		height: 100%;

		box-sizing: border-box;
		padding: calc(var(--j) / 16 + 2px);

		/* display: flex; */
		/* flex-direction: column;
		flex-wrap: wrap;
		align-items: start; */
		/* justify-content: space-around; */
		
		/* grid-template-columns: repeat(2, 1fr); */
		/* grid-template-rows: repeat(3, auto); */
		/* gap: 1em; */

		color: var(--font-color-1);

		background-color: rgb(52, 52, 60, 0.566);

		overflow: scroll;
	}
	form * {
		border-radius: 1px;

		padding: calc(var(--j) / 32 + 2px);

		font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
		color: var(--font-color-1);
		font-size: calc(var(--j) / 4.5);
	}
	form > * {
		height: calc(var(--j) / 2.333);
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
		/* border-radius: 1px;

		padding: calc(var(--j) / 24 + 2px);

		color: var(--font-color-1); */

		font-size: calc(var(--j) / 5); 
	}

	#scale-box {
		width: fit-content;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		/* box-sizing: border-box; */
		border: 1px solid var(--font-color-1);

		transition: all 0.2s;
	}
	#scale-box:hover {
		height: calc(var(--j) * 1.333);
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
		align-items: center;
	}
	#scale-box:hover #scale {
		display: none;
		/* visibility: hidden; */
	}

	#algorithm {
		width: calc(var(--j) * 6);
		max-height: calc(var(--j) * 4);

		/* display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center; */
		display: grid;
		grid-template-columns: calc(var(--j) * 2.5) auto;
		grid-template-rows: calc(var(--j) / 2.5) auto;

		border: 1px solid var(--font-color-1);

		transition: all 0.2s;
	}
	#algorithm:hover {
		height: calc(var(--j) * 3.333);
	}

	.custom-dropdown {
		/* position: relative; */
		display: none;
	}
	#algorithm:hover .custom-dropdown{
		display: initial;
		/* display: inline-block; */
	}

	.dropdown-options {
		/* position: absolute; */
		/* top: 100%;
		left: 0;
		z-index: 1000; */
		background-color: #fff;

		box-sizing: border-box;
		/* border: 1px solid #ccc;
		border-top: none; */

		/* width: auto; */
		width: 100%;

		display: flex;
		flex-direction: column;

		overflow: scroll;
	}

	.option-group {
		padding: 5px 10px;
		border-bottom: 1px solid #ccc;

		display: flex;
		flex-direction: column;

		overflow: scroll;
	}

	.group-heading {
		font-weight: bold;
	}

	.option {
		padding: 5px 10px;
		cursor: pointer;
	}

	.option:hover {
		background-color: #f0f0f0;
	}
</style>
