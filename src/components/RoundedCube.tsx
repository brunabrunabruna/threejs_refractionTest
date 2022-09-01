export const roundedCubeMesh = (size: number) => {
  const vertices = new Array<number>();
  const normals = new Array<number>();
  const indices = new Array<number>();

  const halfSize = size / 2;

  // Front
  vertices.push(-halfSize, -halfSize, halfSize);
  vertices.push(-halfSize, halfSize, halfSize);
  vertices.push(halfSize, halfSize, halfSize);
  vertices.push(halfSize, -halfSize, halfSize);

  // Face 2
  vertices.push(-halfSize, -halfSize, halfSize);
  vertices.push(-halfSize, halfSize, halfSize);
  vertices.push(halfSize, halfSize, halfSize);
  vertices.push(halfSize, -halfSize, halfSize);
};
