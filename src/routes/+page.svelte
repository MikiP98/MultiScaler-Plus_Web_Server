<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';

	let formData = {
    	// your form data properties
		scale: 2,
		scaleX: 2,
		scaleY: 2,
		isScaleXYConnected: true,
		algorithm: "none"
	};

	function handleSubmit(event) {		
		// // Your form submission logic goes here

		// // For example, you can send the form data to an API
		// // or perform any other asynchronous operation.
		console.log("Form submitted!", formData);
	}

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
					<option value="pixel-art">Pixel Art</option>
					<option value="de-jpeg">De JPEG</option>
				</select>
			</div>

			<div id="scale-box">
				<label for="scale">Scale:</label>
				<input type="number" id="scale" name="scale" min="0" bind:value={formData.scale} required />

				<div id="scale-split">
					<label for="scale-x">X:</label>
					<input type="number" id="scale-x" name="scale-x" min="0" bind:value={formData.scaleX} on:change={handleScaleXYChange} required />

					<input type="checkbox" id="scale-x-y-connect" name="scale-x-y-connect" bind:checked={formData.isScaleXYConnected} />

					<label for="scale-y">Y:</label>
					<input type="number" id="scale-y" name="scale-y" min="0" bind:value={formData.scaleY} on:change={handleScaleXYChange} required />
				</div>
			</div>

			<label for="algorithm">Algorithm:</label>
			<select id="algorithm" name="algorithm">
				<option value="none">None</option>
				<option value="nearest-neighbor">Nearest Neighbor</option>
				<option value="bilinear">Bilinear</option>
				<option value="bicubic">Bicubic</option>
				<option value="lanczos">Lanczos</option>
			</select>

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

		height: calc(var(--j) * 9);
	}
	@media only screen and (max-height: 1000px) {
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
		display: grid;
		width: 50%;
		grid-template-columns: repeat(2, 1fr);
		/* grid-template-rows: repeat(3, auto); */
		gap: 1em;

		color: var(--font-color-1);
	}
	form div {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	form input, form textarea {
		background-color: rgb(79, 79, 89);
		border: none;
		/* border-radius: calc(var(--j) / 32); */
		border-radius: 2px;

		padding: calc(var(--j) / 24 + 2px);

		color: var(--font-color-1);
	}

	#scale-split {
		visibility: hidden;
	}
	#scale-box:hover #scale-split {
		visibility: visible;
	}
	#scale-box:hover #scale {
		visibility: hidden;
	}
</style>
