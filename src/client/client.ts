import Maze from './maze';

function calculateDimensions(hash: number): number[] {
  const [min, max] = GetModelDimensions(hash);
  const x = max[0] - min[0];
  const y = max[1] - min[1];
  const z = max[2] - min[2];

  return [x, y, z];
}

export function calculateLongestDimension(hash: number): number {
  const dimensions = calculateDimensions(hash);
  return Math.max(...dimensions);
}

export function getEntityHeight(hash: number): number {
  const [x, y, z] = calculateDimensions(hash);
  return z;
}

export async function spawnEntity(hash: number, x: number, y: number, z: number, heading = 0) {
  // console.log(`Spawning: ${x}, ${y}, ${z}`);
  const obj = CreateObject(hash, x, y, z - 1, true, false, false);
  await SetEntityAsMissionEntity(obj, true, true);
  await SetEntityCollision(obj, true, true);
  await SetEntityHeading(obj, heading);
}

class EntityMaze extends Maze {
  public async renderEntities(entityHash: number, x: number, y: number, z: number, layers = 1) {
    if (layers < 1) {
      console.warn(`Minimum maze layers is 1 - found ${layers}. Setting maze level to 1.`);
      layers = 1;
    }

    const entityDimension = calculateLongestDimension(entityHash);
    const entityHeight = getEntityHeight(entityHash);

    this.verticals = [new Array(this.y).fill(false), ...this.verticals];

    new Array(layers).fill(1).forEach(async (_, layer) => {
      this.verticals.forEach((line, i) => {
        line.forEach(async (isOpen, j) => {
          if (!isOpen) {
            await spawnEntity(
              entityHash,
              x + j * entityDimension + entityDimension / 2,
              y - i * entityDimension,
              z + layer * entityHeight,
              0,
            );
          }
        });
      });

      for (let j = 0; j < this.x * 2 + 1; j++) {
        for (let k = 0; k < this.y * 4 + 1; k++) {
          if (!(0 == j % 2) && 0 == k % 4) {
            if (k > 0 && this.horizontals[(j - 1) / 2][k / 4 - 1]) {
              continue;
            } else {
              const dX = (entityDimension * k) / 4;
              const dY = (entityDimension * j) / 2;
              await spawnEntity(entityHash, x + dX, y - dY, z + layer * entityHeight, 90);
            }
          }
        }
      }
    });
  }
}

async function drawMaze() {
  const entityHash = -1116116298;

  const player = GetPlayerPed(-1);
  const [x, y, z] = GetEntityCoords(player, true);

  const maze = new EntityMaze(5, 7);
  console.log(maze);
  await maze.renderEntities(entityHash, x - 8, y - 8, z, 4);
}

RegisterCommand('maze', drawMaze, false);
