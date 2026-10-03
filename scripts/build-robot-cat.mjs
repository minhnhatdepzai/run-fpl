import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const document = await io.read("assets/characters/robot-cat-source/player.gltf");
const root = document.getRoot();

function material(name, color, roughness = 0.92) {
  return document
    .createMaterial(name)
    .setBaseColorFactor([...color, 1])
    .setRoughnessFactor(roughness)
    .setMetallicFactor(0);
}

const blue = material("Robot cat blue clay", [0.025, 0.34, 0.86]);
const white = material("Robot cat white clay", [0.98, 0.97, 0.91]);
const red = material("Robot cat red clay", [0.93, 0.055, 0.035]);
const yellow = material("Robot cat bell clay", [1, 0.63, 0.025], 0.78);
const black = material("Robot cat eye clay", [0.015, 0.02, 0.03]);

function sphereGeometry(name, segments = 20, rings = 14) {
  const positions = [];
  const normals = [];
  const indices = [];

  for (let y = 0; y <= rings; y += 1) {
    const v = y / rings;
    const phi = v * Math.PI;
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);

    for (let x = 0; x <= segments; x += 1) {
      const u = x / segments;
      const theta = u * Math.PI * 2;
      const nx = Math.cos(theta) * sinPhi;
      const ny = cosPhi;
      const nz = Math.sin(theta) * sinPhi;
      positions.push(nx, ny, nz);
      normals.push(nx, ny, nz);
    }
  }

  for (let y = 0; y < rings; y += 1) {
    for (let x = 0; x < segments; x += 1) {
      const a = y * (segments + 1) + x;
      const b = a + segments + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  const position = document
    .createAccessor(`${name} positions`)
    .setType("VEC3")
    .setArray(new Float32Array(positions));
  const normal = document
    .createAccessor(`${name} normals`)
    .setType("VEC3")
    .setArray(new Float32Array(normals));
  const index = document
    .createAccessor(`${name} indices`)
    .setType("SCALAR")
    .setArray(new Uint16Array(indices));

  return { position, normal, index };
}

const sphere = sphereGeometry("Robot cat sphere");

function addSphere(parent, name, translation, scale, clayMaterial) {
  const primitive = document
    .createPrimitive()
    .setAttribute("POSITION", sphere.position)
    .setAttribute("NORMAL", sphere.normal)
    .setIndices(sphere.index)
    .setMaterial(clayMaterial);
  const mesh = document.createMesh(`${name} mesh`).addPrimitive(primitive);
  const node = document
    .createNode(name)
    .setMesh(mesh)
    .setTranslation(translation)
    .setScale(scale);
  parent.addChild(node);
  return node;
}

const head = root.listNodes().find((node) => node.getName() === "Head");
const spine = root.listNodes().find((node) => node.getName() === "Spine01");

if (!head || !spine) throw new Error("Robot Cat source rig is missing Head or Spine01.");

// All values are in armature-local centimetres; the source Armature scales by 0.01.
addSphere(head, "Robot Cat round blue head", [0, 29, 0], [34, 35, 32], blue);
addSphere(head, "Robot Cat white muzzle", [0, 23, 29], [24, 22, 5.5], white);
addSphere(head, "Robot Cat left eye", [-8.5, 39, 29.5], [8.5, 11, 4], white);
addSphere(head, "Robot Cat right eye", [8.5, 39, 29.5], [8.5, 11, 4], white);
addSphere(head, "Robot Cat left pupil", [-7.2, 38, 34], [2.4, 4, 1.6], black);
addSphere(head, "Robot Cat right pupil", [7.2, 38, 34], [2.4, 4, 1.6], black);
addSphere(head, "Robot Cat red nose", [0, 28, 36], [5.5, 5.5, 4.5], red);
addSphere(head, "Robot Cat collar", [0, -1, 0], [24, 4, 23], red);
addSphere(head, "Robot Cat bell", [0, -4, 23], [7, 7, 4], yellow);
addSphere(spine, "Robot Cat white belly", [0, 4, 20], [23, 28, 5.5], white);

await io.write("assets/player.glb", document);
console.log("Built assets/player.glb with animated Robot Cat details.");
