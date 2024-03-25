<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';

	// import Header from './Header.svelte';
	// import { setContext } from 'svelte';
	// import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { handleSubmitStore } from './store';
	import { imageUrlStore } from './store';

	export let imgUrl;
	// export let imageFile;
	let imageUrl;

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
		console.log(imageUrl)
		sendImageToAPI(imageUrl, formData);
		// Post1();
	}
	onMount(() => {
		handleSubmitStore.set(handleSubmit);

		const unsubscribe = imageUrlStore.subscribe((value) => {
			imageUrl = value;
		});

		// Cleanup the subscription when the component is destroyed
		return () => {
			unsubscribe();
		};
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

	// function sendImageToAPI(imageFile, formDataObject) {
	// 	const formData = new FormData();
	// 	formData.append('content', imageFile);
	// 	formData.append('algorithm', formDataObject.algorithm);
	// 	formData.append('factor', formDataObject.scale);

	// 	const url = `http://127.0.0.1:8000/scale`;

	// 	fetch(url, {
	// 		method: 'POST',
	// 		body: formData
	// 	})
	// 	.then(response => {
	// 		if (!response.ok) {
	// 			throw new Error('Failed to upload image');
	// 		}
	// 		return response.blob(); // Expecting image as response, so using blob()
	// 	})
	// 	.then(imageBlob => {
	// 		// Convert blob to URL
	// 		const imageUrl = URL.createObjectURL(imageBlob);
	// 		console.log('Scaled image URL:', imageUrl);

	// 		// Display the scaled image or handle it as needed
	// 		// Example: displayScaledImage(imageUrl);
	// 	})
	// 	.catch(error => {
	// 		console.error('Error uploading image:', error);
	// 		// Handle errors
	// 	});
	// }
	function sendImageToAPI(imageFile, formDataObject) {
		const formData = new FormData();
		formData.append('content', imageFile);

		const url = `http://127.0.0.1:8000/scale?factor=${formDataObject.scale}&algorithm=${formDataObject.algorithm}`;
		// const url = `http://172.31.111.107:1111/scale?factor=${formDataObject.scale}&algorithm=${formDataObject.algorithm}`;

		fetch(url, {
			method: 'POST',
			body: formData
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to upload image');
			}
			return response.blob(); // Expecting image as response, so using blob()
		})
		.then(imageBlob => {
			// Convert blob to URL
			const imageUrl = URL.createObjectURL(imageBlob);
			console.log('Scaled image URL:', imageUrl);

			// Display the scaled image or handle it as needed
			// Example: displayScaledImage(imageUrl);
		})
		.catch(error => {
			console.error('Error uploading image:', error);
			// Handle errors
		});
	}

	// /**
	//  * @constructor Generates a constructor for a given data structure
	//  * @param {string} keys separated by a comma + whitespace. struct('id, name, age')
	//  * @returns {constructor} Constructor for the new struct
	// */
	// function makeStruct(keys) {
	// 	if (!keys) return null;
	// 	const k = keys.split(', ');
	// 	const count = k.length;

	// 	/** @constructor */
	// 	function constructor() {
	// 		for (let i = 0; i < count; i++) this[k[i]] = arguments[i];
	// 	}
	// 	return constructor;
	// }

	function optionStructConstructior(name, tags, value=name) {
		this.name = name;
		this.tags = tags;
		this.value = value;
	}
	const oSC = optionStructConstructior;
	
	const classicOptions = [
		new oSC("Bilinear", [], "CV2_Bilinear"), 
		new oSC("Bicubic", [], "CV2_Bicubic"), 
		new oSC("Lanczos", [], "CV2_Lanczos"), 
		new oSC("Nearest-neighbor", [], "CV2_Nearest")
	];
	const classicGroup = {
		name: "Classic",
		options: classicOptions
	};

	const edgeDetectionOptions = [
		new oSC("xBRZ", [])
	];
	const edgeDetectionGroup = {
		name: "Edge detection",
		options: edgeDetectionOptions
	};

	const smartOptions = [
		new oSC("FSR", ["GPU"]),
		new oSC("CAS", ["GPU"])
	];
	const smartGroup = {
		name: "Smart",
		options: smartOptions
	};

	const AIOptions = [
		new oSC("RealESRGAN", []),
		new oSC("SUPIR", [])
	];
	const AIGroup = {
		name: "AI",
		options: AIOptions
	};

	const optionGroups = [
		classicGroup,
		edgeDetectionGroup,
		smartGroup,
		AIGroup
	];

	function selectOption(option) {
		formData.algorithm = option;
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Scaling App" />
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
			
				<div class="filters">Filters</div>
				<div class="custom-dropdown">
					<div class="dropdown-options">
						{#each optionGroups as optionGroup}
							<div class="option-group">
								<span class="group-heading">-- {optionGroup.name} --</span>
								{#each optionGroup.options as option}
									<button class="option" on:click={() => selectOption(option.value)}>
										{option.name}
										<sup>
											{#each option.tags as tag}
												({tag})
											{/each}
										</sup>
									</button>
								{/each}
							</div>
						{/each}
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
			height: calc(var(--j) * 3.6666);
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
	form sup {
		/* margin-top: calc(var(--j) / 3); */
		/* padding-top: calc(var(--j) / 3); */
		font-size: calc(var(--j) / 7);
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
		background-color: rgba(79, 79, 89, 0.9);
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
		/* height: 100%; */
		
		overflow: scroll;
	}
	#algorithm:hover .custom-dropdown{
		display: initial;
		/* display: inline-block; */
	}

	.dropdown-options {
		/* height: 100%; */

		background-color: #fff;

		box-sizing: border-box;
		/* border: 1px solid #ccc;
		border-top: none; */

		/* width: auto; */
		width: 100%;

		display: flex;
		flex-direction: column;
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

	.filters {
		/* position: relative; */
		display: none;
		/* height: 100%; */
		
		overflow: scroll;
	}
	#algorithm:hover .filters{
		display: initial;
		/* display: inline-block; */
	}
</style>
