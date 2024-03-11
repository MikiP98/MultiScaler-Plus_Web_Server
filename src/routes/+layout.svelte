<script>
	// import { PageData } from './../../.svelte-kit/types/src/routes/sverdle/how-to-play/$types.d.ts';
	import Header from './Header.svelte';
	import './styles.css';
	// import '../../static/styles.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<span class="center-on-site">
			<p class="left">Designed & Programmed by: <i>Mikołaj Pokora</i></p>
			<a class="right" href="https://www.flaticon.com/free-icons/loading" title="loading icons">Loading icons created by See Icons - Flaticon</a>
			<p class="long">Copyright © 2024 Mikołaj Pokora. All rights reserved. No part of this website may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the copyright owner, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law. For permission requests, contact Mikołaj Pokora through the website.</p>
		</span>
	</footer>
</div>

<style>
	footer, :global(footer) {
		height: var(--j);

		display: flex;
		justify-content: center;
		align-items: center;

		color: var(--font-color-1);
	}

	.center-on-site {
		width: calc(var(--j) * 14);

		/* display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center; */

		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.left {
		text-align: left;
		/* font-size: small; */
		font-size: calc(var(--j) / 5);
	}

	.right {
		text-align: right;
		/* font-size: small; */
		font-size: calc(var(--j) / 5);
	}

	.long {
		grid-column: 1 / -1;

		text-align: left;
		/* font-size: xx-small; */
		font-size: calc(var(--j) / 10);
	}
</style>
