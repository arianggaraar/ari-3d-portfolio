"use client";

import { Bounds, Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ReactNode, useEffect, useRef, useState } from "react";
import * as THREE from "three";

type HeadTrackedAvatarProps = {
  modelUrl: string;
};

type ModelState = "checking" | "ready" | "fallback";

function prepareModel(root: THREE.Object3D) {
  root.traverse((child) => {
    const mesh = child as THREE.Mesh;

    if (!mesh.isMesh) return;

    mesh.castShadow = false;
    mesh.receiveShadow = false;
    mesh.frustumCulled = false;

    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : [mesh.material];

    materials.forEach((mat) => {
      if (!mat) return;

      mat.side = THREE.DoubleSide;

      if ("envMapIntensity" in mat) {
        mat.envMapIntensity = 2.75;
      }

      if ("roughness" in mat) {
        mat.roughness = Math.min(Number(mat.roughness ?? 0.5), 0.42);
      }

      if ("metalness" in mat) {
        mat.metalness = Math.max(Number(mat.metalness ?? 0.2), 0.18);
      }

      if ("color" in mat && mat.color instanceof THREE.Color) {
        mat.color.multiplyScalar(1.28);
      }

      mat.needsUpdate = true;
    });
  });
}

function PointerYawGroup({ children }: { children: ReactNode }) {
  const rootRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rootRef.current) return;

    // Hanya putar kiri-kanan 360 derajat.
    const targetYaw = state.pointer.x * Math.PI;

    rootRef.current.rotation.y = THREE.MathUtils.lerp(
      rootRef.current.rotation.y,
      targetYaw,
      0.075
    );

    // Kunci gerakan atas/bawah, miring, dan geser.
    rootRef.current.rotation.x = THREE.MathUtils.lerp(
      rootRef.current.rotation.x,
      0,
      0.12
    );

    rootRef.current.rotation.z = THREE.MathUtils.lerp(
      rootRef.current.rotation.z,
      0,
      0.12
    );

    rootRef.current.position.x = THREE.MathUtils.lerp(
      rootRef.current.position.x,
      0,
      0.12
    );

    rootRef.current.position.y = THREE.MathUtils.lerp(
      rootRef.current.position.y,
      0,
      0.12
    );
  });

  return (
    <group ref={rootRef} dispose={null}>
      {children}
    </group>
  );
}

function LoadedModel({ modelUrl }: HeadTrackedAvatarProps) {
  const gltf = useGLTF(modelUrl);

  useEffect(() => {
    prepareModel(gltf.scene);
  }, [gltf.scene]);

  return (
    <PointerYawGroup>
      <primitive object={gltf.scene} />
    </PointerYawGroup>
  );
}

function FallbackModel() {
  return (
    <PointerYawGroup>
      <group position={[0, -0.2, 0]}>
        <mesh position={[0, 1.15, 0]}>
          <capsuleGeometry args={[0.38, 0.78, 10, 24]} />
          <meshStandardMaterial
            color="#e0f2fe"
            metalness={0.42}
            roughness={0.28}
          />
        </mesh>

        <mesh position={[0, 1.95, 0]}>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshStandardMaterial
            color="#f8fafc"
            metalness={0.35}
            roughness={0.24}
          />
        </mesh>

        <mesh position={[0, 1.95, 0.28]}>
          <boxGeometry args={[0.42, 0.16, 0.06]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0891b2"
            emissiveIntensity={0.65}
            metalness={0.2}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[-0.62, 1.12, 0]}>
          <capsuleGeometry args={[0.12, 0.82, 8, 18]} />
          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.38}
            roughness={0.3}
          />
        </mesh>

        <mesh position={[0.62, 1.12, 0]}>
          <capsuleGeometry args={[0.12, 0.82, 8, 18]} />
          <meshStandardMaterial
            color="#cbd5e1"
            metalness={0.38}
            roughness={0.3}
          />
        </mesh>

        <mesh position={[-0.23, 0.1, 0]}>
          <capsuleGeometry args={[0.13, 0.96, 8, 18]} />
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.34}
            roughness={0.32}
          />
        </mesh>

        <mesh position={[0.23, 0.1, 0]}>
          <capsuleGeometry args={[0.13, 0.96, 8, 18]} />
          <meshStandardMaterial
            color="#94a3b8"
            metalness={0.34}
            roughness={0.32}
          />
        </mesh>
      </group>
    </PointerYawGroup>
  );
}

function LoadingModel() {
  return (
    <PointerYawGroup>
      <mesh>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color="#67e8f9"
          wireframe
          metalness={0.3}
          roughness={0.25}
        />
      </mesh>
    </PointerYawGroup>
  );
}

function useSafeModelState(modelUrl: string) {
  const [state, setState] = useState<ModelState>("checking");

  useEffect(() => {
    let active = true;

    async function checkModel() {
      try {
        const response = await fetch(modelUrl, {
          cache: "no-store",
          headers: {
            Range: "bytes=0-120"
          }
        });

        const buffer = await response.arrayBuffer();
        const firstBytes = new TextDecoder("utf-8", {
          fatal: false
        }).decode(buffer.slice(0, 120));

        if (!active) return;

        // Kalau file berisi pointer Git LFS, jangan load ke useGLTF.
        if (
          firstBytes.includes("version https://git-lfs.github.com/spec") ||
          firstBytes.includes("git-lfs")
        ) {
          setState("fallback");
          return;
        }

        // GLB asli biasanya diawali magic header "glTF".
        setState("ready");
      } catch {
        if (!active) return;
        setState("fallback");
      }
    }

    setState("checking");
    checkModel();

    return () => {
      active = false;
    };
  }, [modelUrl]);

  return state;
}

export function HeadTrackedAvatar({ modelUrl }: HeadTrackedAvatarProps) {
  const modelState = useSafeModelState(modelUrl);

  return (
    <Bounds fit clip observe margin={1.45}>
      <Center position={[0, -0.48, 0]}>
        {modelState === "checking" && <LoadingModel />}
        {modelState === "fallback" && <FallbackModel />}
        {modelState === "ready" && <LoadedModel modelUrl={modelUrl} />}
      </Center>
    </Bounds>
  );
}