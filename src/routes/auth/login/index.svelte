<script>
	import { post } from '$lib/utils/post';
	import { Button, Input, Label } from 'sveltestrap';

	let requestStep = 'start';
	let email;

	let magicLink = '';

	async function handleSubmit() {
		const response = await post('/auth/login', { email });
		if (response.status === 401) {
			requestStep = 'error';
		}
		if (response.status === 200) {
			const { accessUrl } = await response.json();
			magicLink = accessUrl;
			requestStep = 'success';
		} else {
			magicLink = '';
		}
	}
</script>

<svelte:head>
	<title>Connexion</title>
</svelte:head>
<div class="container">
{#if requestStep !== 'success'}
	<form on:submit|preventDefault={handleSubmit}>

		<Label class="form-label">Veuillez saisir votre email pour recevoir votre lien de connexion.</Label>

		<div class="input-group mb-3">
			<span class="input-group-text">@</span>
			<Input type="text" class="form-control" placeholder="email@fresqueduclimat.org" bind:value={email} />
		</div>

		<div class="form-group">
			<Button type="submit">Go !</Button>
		</div>

	</form>
{:else}
	<div>
		<div>Un lien vous a été envoyé pour vous connecter à Fresque Maps.</div>
		{#if magicLink}
			<div><a href={magicLink}>Ouvrir Fresque Maps</a></div>
		{/if}
	</div>
{/if}
{#if requestStep === 'error'}
	<p><br />Cet email n'est pas autorisé à se connecter.</p>
	{/if}
</div>
