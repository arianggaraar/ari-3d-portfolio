"use client";

import { Bounds, Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type HeadTrackedAvatarProps = {
  modelUrl: string;
};

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

function WholeModelYawPreview({ scene }: { scene: THREE.Object3D }) {
  const rootRef = useRef<THREE.Group>(null);

  useEffect(() => {
    prepareModel(scene);
  }, [scene]);

  useFrame((state) => {
    if (!rootRef.current) return;

    /*
      Pointer kiri-kanan saja:
      - pointer.x = -1 berarti -180 derajat
      - pointer.x =  1 berarti +180 derajat
      Total range = 360 derajat.
    */
    const targetYaw = state.pointer.x * Math.PI;

    rootRef.current.rotation.y = THREE.MathUtils.lerp(
      rootRef.current.rotation.y,
      targetYaw,
      0.075
    );

    /*
      Kunci semua gerakan atas/bawah dan miring.
      Model tidak boleh pitch, roll, naik, turun, atau geser.
    */
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
      <primitive object={scene} />
    </group>
  );
}

function HeadTrackingCore({ modelUrl }: HeadTrackedAvatarProps) {
  const gltf = useGLTF(modelUrl);

  useEffect(() => {
    prepareModel(gltf.scene);
  }, [gltf.scene]);

  return (
    <Bounds fit clip observe margin={1.45}>
      <Center position={[0, 0, 0]}>
        <WholeModelYawPreview scene={gltf.scene} />
      </Center>
    </Bounds>
  );
}

export function HeadTrackedAvatar({ modelUrl }: HeadTrackedAvatarProps) {
  return <HeadTrackingCore modelUrl={modelUrl} />;
}

useGLTF.preload("/models/model.glb");