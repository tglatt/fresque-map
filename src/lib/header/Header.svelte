<script>
import { goto } from '$app/navigation';

	import { session } from '$app/stores';
import { post } from '$lib/utils/post';
	import {
		Button,
		Collapse,
		Dropdown,
		DropdownItem,
		DropdownMenu,
		DropdownToggle,
		Nav,
		Navbar,
		NavbarBrand,
		NavbarToggler,
		NavItem,
		NavLink,
	} from 'sveltestrap';

	let isOpen = false;

	function handleUpdate(event) {
		isOpen = event.detail.isOpen;
	}

	async function logout() {
		await post(`/auth/logout`, {});
		$session.user = null;
		goto('/');
	}
</script>

<Navbar color="light" light expand="md">
	<NavbarBrand href="/">Fresque Maps</NavbarBrand>
	<NavbarToggler on:click={() => (isOpen = !isOpen)} />
	<Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
		<Nav class="ms-auto" navbar>
			<!--
			<NavItem>
				<NavLink href="/">Statistiques</NavLink>
			</NavItem>
			-->
			{#if $session.user}
			<Dropdown nav inNavbar>
				<DropdownToggle nav caret>Statistiques</DropdownToggle>
				<DropdownMenu end>
					<DropdownItem><NavLink href="/statsData">Données brutes</NavLink></DropdownItem>
					<DropdownItem divider />
					<DropdownToggle nav caret>Graphiques</DropdownToggle>
					<DropdownItem
						><NavLink href="/graphsGlobal">Vues annuelles globales</NavLink></DropdownItem
					>
					<DropdownItem
						><NavLink href="/graphsActivites">Vues annuelles VTT, VTC, VR</NavLink></DropdownItem
					>
					<DropdownItem><NavLink href="/graphs">Répartition FR, EN, DE</NavLink></DropdownItem>
				</DropdownMenu>
			</Dropdown>

			<Dropdown nav inNavbar>
				<DropdownToggle nav caret>Compta</DropdownToggle>
				<DropdownMenu end>
					<DropdownItem><NavLink href="/comptaExports">Export marges</NavLink></DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<NavItem><Button class="btn-info" title="Déconnecter&hellip;" on:click={logout}><i class="bi bi-box-arrow-right"></i>&nbsp; Exit&hellip;</Button></NavItem>
			{/if}
		</Nav>
	</Collapse>
</Navbar>
