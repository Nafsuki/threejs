import { useRef, useState, Suspense } from 'react';
import './App.css';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Mesh } from 'three';
import { useSpring, animated } from '@react-spring/three';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

const Box = (props: any) => {
	const ref = useRef<Mesh>(null!);
	const [clicked, setClicked] = useState(false);
	const [hovered, setHovered] = useState(false);

	useFrame(() => (ref.current.rotation.x += 0.01));

	const { scale } = useSpring({ scale: clicked ? 2 : 1 });
	return (
		<animated.mesh
			{...props}
			ref={ref}
			onClick={() => setClicked(!clicked)}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			scale={scale}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? 'yellow' : 'green'} />
		</animated.mesh>
	);
};

const Ball = (props: any) => {
	const colorMap = useLoader(TextureLoader, 'doraemon.png');

	return (
		<>
			<mesh>
				<sphereGeometry args={[1, 100, 100]} />
				<meshStandardMaterial map={colorMap} displacementScale={1} />
				{/* <meshPhongMaterial color='blue' /> */}
			</mesh>
		</>
	);
};

function App() {
	return (
		<div id='canvas-container'>
			<Canvas>
				<Suspense fallback={null}>
					<Ball position={[1.6, 10, 10]} />
					<Box position={[-1.6, 0, 0]} />
					<Box position={[1.6, 0, 0]} />
					<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1.5} />
					<pointLight position={[-10, -10, -10]} />
					<OrbitControls autoRotate />
				</Suspense>
			</Canvas>
			<h1>Threejs Fiber</h1>
		</div>
	);
}

export default App;
