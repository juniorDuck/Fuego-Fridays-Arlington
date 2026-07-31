import { useEffect, useRef } from "react";

/**
 * Subtle Three.js background — lazy-loaded so a missing/slow three import
 * never crashes the page. Falls back silently if WebGL is unavailable.
 */
export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let rafId: number;
    let cleanup: (() => void) | undefined;

    import("three")
      .then((THREE) => {
        if (!mountRef.current) return; // unmounted before load finished

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          60,
          mount.clientWidth / mount.clientHeight,
          0.1,
          100
        );
        camera.position.z = 20;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setClearColor(0x000000, 0);
        mount.appendChild(renderer.domElement);

        const geometry = new THREE.IcosahedronGeometry(1, 0);
        const material = new THREE.MeshBasicMaterial({
          color: 0x1b1a18,
          wireframe: true,
          opacity: 0.07,
          transparent: true,
        });

        const meshes: THREE.Mesh[] = [];
        for (let i = 0; i < 18; i++) {
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(
            (Math.random() - 0.5) * 22,
            (Math.random() - 0.5) * 13,
            (Math.random() - 0.5) * 8
          );
          mesh.scale.setScalar(0.4 + Math.random() * 1.4);
          mesh.userData.rx = (Math.random() - 0.5) * 0.003;
          mesh.userData.ry = (Math.random() - 0.5) * 0.003;
          scene.add(mesh);
          meshes.push(mesh);
        }

        function animate() {
          rafId = requestAnimationFrame(animate);
          for (const m of meshes) {
            m.rotation.x += m.userData.rx as number;
            m.rotation.y += m.userData.ry as number;
          }
          renderer.render(scene, camera);
        }
        animate();

        function onResize() {
          if (!mount) return;
          camera.aspect = mount.clientWidth / mount.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(mount.clientWidth, mount.clientHeight);
        }
        window.addEventListener("resize", onResize);

        function onMouseMove(e: MouseEvent) {
          const nx = (e.clientX / window.innerWidth - 0.5) * 2;
          const ny = (e.clientY / window.innerHeight - 0.5) * 2;
          camera.position.x += (nx * 1.5 - camera.position.x) * 0.02;
          camera.position.y += (-ny * 0.8 - camera.position.y) * 0.02;
        }
        window.addEventListener("mousemove", onMouseMove);

        cleanup = () => {
          cancelAnimationFrame(rafId);
          window.removeEventListener("resize", onResize);
          window.removeEventListener("mousemove", onMouseMove);
          renderer.dispose();
          if (mount.contains(renderer.domElement)) {
            mount.removeChild(renderer.domElement);
          }
        };
      })
      .catch(() => {
        // three not available — background simply stays empty
      });

    return () => {
      cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    />
  );
}
