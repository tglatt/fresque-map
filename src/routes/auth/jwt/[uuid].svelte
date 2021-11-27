<script context="module">
	export async function load({ page }) {
		const accessKey = page.params.uuid;
		return {
			props: {
				accessKey,
			},
		};
	}
</script>

<script>
	import { goto } from '$app/navigation';

	import { onMount } from 'svelte';
	import jwtDecode from 'jwt-decode';
	import { session } from '$app/stores';
	import { post } from '$lib/utils/post';

	export let accessKey;

	let displayError;

	onMount(async () => {
		const response = await post(`/auth/jwt`, { accessKey });

		if (response.ok) {
			const { jwt } = await response.json();
			const user = jwtDecode(jwt);
			$session.user = user;
			$session.token = jwt;
			goto('/');
		} else {
			displayError = response.error;
		}
	});
</script>

<svelte:head>
	<title>validation du token de connexion - Fresque Maps</title>
</svelte:head>

{#if displayError}
	<div>
		<div>Désolé, ce lien n'est plus valide...</div>
		<a href="/auth/login"> accéder à la page de connexion </a>
	</div>
{/if}
