<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { GLTF, interactivity } from '@threlte/extras';
	import { spring } from 'svelte/motion';

	interactivity();

	let targetRotation = spring(0, { stiffness: 0.1, damping: 0.3 });
	let isDragging = $state(false);
	let lastMouseX = 0;


	useTask(() => {
		if (!isDragging) {
			targetRotation.update(val => val + 0.005);
		}
	});

	function onPointerDown(event: PointerEvent) {
		isDragging = true;
		lastMouseX = event.clientX;
	}

	function onPointerMove(event: PointerEvent) {
		if (isDragging) {
			const deltaX = event.clientX - lastMouseX;
			targetRotation.update(val => val + deltaX * 0.01);
			lastMouseX = event.clientX;
		}
	}

	function onPointerUp() {
		isDragging = false;
	}
</script>

<svelte:window
	on:pointermove={onPointerMove}
	on:pointerup={onPointerUp}
/>

<T.PerspectiveCamera
	makeDefault
	position={[0, 0, 2]}
	fov={50}
/>


<T.DirectionalLight position={[5, 5, 5]} intensity={1.5} />
<T.DirectionalLight position={[-5, 3, -5]} intensity={0.8} />
<T.AmbientLight intensity={0.6} />

<T.Group 
	rotation.y={$targetRotation}
	on:pointerdown={onPointerDown}
>
	<GLTF url="/assets/projector.glb" />
</T.Group>