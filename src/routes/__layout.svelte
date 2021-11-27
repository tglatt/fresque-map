<script context="module">
	export async function load({ context, page, session }) {
		const redirect = redirectUrl(page, session);
		if (redirect) {
			return {
				status: 302,
				redirect,
			};
		}

		return {
			context,
		};
	}
</script>

<script>
	import Header from '$lib/header/Header.svelte';
	import redirectUrl from '$lib/utils/redirectUrl';
	import { Styles } from 'sveltestrap';
</script>

<Styles />

<Header />

<main>
	<slot />
</main>

<footer>
	<hr />
	<p class="text-center"><a href="https://fresqueduclimat.org/">La fresque du climat</a></p>
</footer>
