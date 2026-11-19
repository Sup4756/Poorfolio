"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Euler, FrontSide, Matrix4, Sphere, Vector3, type Mesh, type MeshStandardMaterial } from "three";
import type { GLTF } from "three-stdlib";

export const MODEL_PATH = "/3Dassets/Avatar.glb";
export const MODEL_RADIUS = 1.65;

type AvatarGLTF = GLTF & {
  nodes: { xuantra_1: Mesh; xuantra_2: Mesh };
  materials: { Handle1Mtl: MeshStandardMaterial; Xuantra1Mtl: MeshStandardMaterial };
};

export function Model() {
  const { nodes, materials } = useGLTF(MODEL_PATH) as unknown as AvatarGLTF;
  const { offset, scale } = useMemo(() => {
    // Center both meshes together after applying the asset's original orientation.
    const box = new Box3();
    for (const node of [nodes.xuantra_1, nodes.xuantra_2]) {
      node.geometry.computeBoundingBox();
      box.union(node.geometry.boundingBox!);
    }
    box.applyMatrix4(new Matrix4().makeRotationFromEuler(new Euler(Math.PI / 2, 0, Math.PI)));
    const radius = box.getBoundingSphere(new Sphere()).radius;
    return {
      offset: box.getCenter(new Vector3()).negate(),
      scale: MODEL_RADIUS / Math.max(radius, 0.001),
    };
  }, [nodes]);

  return (
    <group scale={scale} dispose={null}>
      <group position={offset}>
        <group rotation={[Math.PI / 2, 0, Math.PI]}>
          {/* The GLB uses BLEND and doubleSided. Keep the original opaque,
              front-face rendering so rear faces do not show through the avatar. */}
          <mesh geometry={nodes.xuantra_1.geometry}>
            <meshStandardMaterial
              {...materials.Handle1Mtl}
              transparent={false}
              depthWrite={true}
              depthTest={true}
              side={FrontSide}
            />
          </mesh>
          <mesh geometry={nodes.xuantra_2.geometry}>
            <meshStandardMaterial
              {...materials.Xuantra1Mtl}
              transparent={false}
              depthWrite={true}
              depthTest={true}
              side={FrontSide}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
