import { capitalize, ensure, float2int } from "@/utils";
import Randomizer from "@/utils/random";
import Rectangle from "@/utils/rectangle";
import vec2 from "@/utils/vec2";
//import Rectangle from "@/utils/rectangle";
//import Rectangle from "@/utils/rectangle";
import { game } from "..";
import bspGenerator from "./bsp_generator";
//import bspGenerator from "./bsp_generator";

enum TileTypes {
  unused = 0,
  floor = 1,
  wall = 2,
}

class PathNode {
  x: number;
  y: number;
  distance: number
  last: boolean;
  constructor() {
    this.x = 0;
    this.y = 0;
    this.distance = 0;
    this.last = false;
  }
}

class Tile {
  type: TileTypes = TileTypes.unused;
  collide = false;
  color = "#000000";
  character = "?";
}

export const random = new Randomizer();

export default class Level {
  readonly ROOM_MIN_SIZE: number = 4;

  width: number;
  height: number;
  depth = 0;
  levelSeed = 0;

  root: bspGenerator | undefined;
  tiles: Tile[];
  noisemap: number[];
  pathMap: number[];
  nodeTemp: PathNode[];
  nodes: PathNode[];

  startPosition: vec2;
  stairs: vec2;

  dungeonName: string;
  failedCorridos: Rectangle[] = [];


  constructor(width: number, height: number) {

    this.width = width;
    this.height = height;
    this.dungeonName = "Unknow dungeon";

    this.tiles = new Array(this.width * this.height).fill(false);
    this.noisemap = new Array(this.width * this.height).fill(0);
    this.pathMap = new Array(this.width * this.height);
    this.nodeTemp = [];
    this.nodes = [];

    this.startPosition = new vec2(1, 1);
    this.stairs = new vec2(1, 1);

  }

  isWall(x: number, y: number): boolean {
    if (x >= 0 && x <= this.width && y >= 0 && y <= this.height) {
      const index = x + y * this.width;

      return this.tiles[index].collide;
    }

    return false;
  }

  setWall(x: number, y: number) {
    x = float2int(x);
    y = float2int(y);

    this.tiles[x + y * this.width].collide = true;
    this.tiles[x + y * this.width].type = TileTypes.wall;
  }

  setFloor(x: number, y: number) {
    x = float2int(x);
    y = float2int(y);

    this.tiles[x + y * this.width].collide = false;
    this.tiles[x + y * this.width].type = TileTypes.floor;
  }

  dig(x1: number, y1: number, x2: number, y2: number) {
    for (let y = y1; y < y1 + y2; y++) {
      for (let x = x1; x < x1 + x2; x++) {
        this.setFloor(x, y);
      }
    }
  }

  makeWalls(x1: number, y1: number, x2: number, y2: number) {
    const y = y2 - y1;
    const x = x2 - x1;

    this.dig(x1, y1, x, y);


    for (let i = 0; i <= y; i++) {
      this.setWall(x1, y1 + i);
      this.setWall(x2, y1 + i);
    }


    for (let i = 0; i <= x; i++) {
      this.setWall(x1 + i, y1);
      this.setWall(x1 + i, y2);
    }


  }

  fillUnusedTiles() {
    this.tiles.map(tile => {
      if (tile.type === TileTypes.unused) {
        tile.collide = true;
        tile.type = TileTypes.wall;
      }
    });
  }


  makeDoorHole(x: number, y: number, w: number, h: number, wall: number) {
    if (wall == 0) {
      this.setFloor(x - 1, y + (h / 2));
      this.setFloor(x, y + (h / 2));
      this.setFloor(x + 1, y + (h / 2));
    }
    else if (wall == 1) {
      this.setFloor(x + w - 1, y + (h / 2));
      this.setFloor(x + w, y + (h / 2));
      this.setFloor(x + w + 1, y + (h / 2));
    }
    else if (wall == 2) {
      this.setFloor(x + (w / 2), y - 1);
      this.setFloor(x + (w / 2), y);
      this.setFloor(x + (w / 2), y + 1);
    }
    else if (wall == 3) {
      this.setFloor(x + (w / 2), y + h - 1);
      this.setFloor(x + (w / 2), y + h);
      this.setFloor(x + (w / 2), y + h + 1);
    }
  }



  createNaivePath(sx: number, sy: number, ex: number, ey: number) {
    let x = sx;
    let y = sy;

    while (1) {
      if (x < ex)
        x++;
      else if (x > ex)
        x--;
      else if (y < ey)
        y++;
      else if (y > ey)
        y--;

      if (x == ex && y == ey)
        break;

      this.setFloor(x, y);
    }
  }


  async setupPathStart(x: number, y: number) {
    this.nodes = [];

    for (let i = 0; i < this.width * this.height; i++) {
      this.pathMap[i] = this.tiles[i].collide ? -1 : 0;
    }

    const id = this.convertXYtoID(x, y);

    if (id >= 0 && id < this.width * this.height) {
      this.pathMap[id] = 1;
    }
  }

  convertXYtoID(x: number, y: number): number {
    return x + y * this.width;
  }

  getPathmapId(x: number, y: number) {
    return this.pathMap[this.convertXYtoID(x, y)];
  }



  harvestMap(sx: number, sy: number, ex: number, ey: number, maxLen: number) {

    const setPathmapId = (x: number, y: number, id: number) => {
      this.pathMap[this.convertXYtoID(x, y)] = id;
    };

    const trySetPathMap = (x: number, y: number, id: number) => {
      if (this.getPathmapId(x, y) === 0)
        setPathmapId(x, y, id);
    };


    let distance = 0; // counting travelling distance
    for (let i = 0; i < maxLen; i++) {
      for (let x = sx - (i + 1); x < sx + i + 1; x++) { // in every step, increase harvesting area by 2
        for (let y = sy - (i + 1); y < sy + i + 1; y++) {
          if (x < 0 || y < 0 || x >= this.width - 1 || y >= this.height - 1)
            continue; // rajojen ulkopuolella
          if (this.getPathmapId(x, y) === i) { // dismapista löytyi arvo jota haetaan, laitetaan sen ympärille vapaisiin kohtiin sueraavat arvot
            trySetPathMap(x - 1, y, i + 1);
            trySetPathMap(x + 1, y, i + 1);
            trySetPathMap(x, y - 1, i + 1);
            trySetPathMap(x, y + 1, i + 1);

            if (x === ex && y === ey)
              return 0;
            distance++;
          }
        }
      }
    }
    return distance;
  }

  finalizePath(ex: number, ey: number, distance: number) {


    let x = ex;
    let y = ey;

    for (let i = 0; i < distance; i++) {
      const pathmapValue = this.pathMap[this.convertXYtoID(x, y)] - 1;

      const oldX = x;
      const oldY = y;

      if (this.getPathmapId(x - 1, y) === pathmapValue)
        x--;
      else if (this.getPathmapId(x + 1, y) === pathmapValue)
        x++;
      else if (this.getPathmapId(x, y - 1) === pathmapValue)
        y--;
      else if (this.getPathmapId(x, y + 1) === pathmapValue)
        y++;

      if (oldX !== x || oldY !== y) {
        const nd = new PathNode();
        nd.x = x;
        nd.y = y;
        nd.distance = pathmapValue + 1;
        this.nodes.push(nd);
      }
    }
  }

  createPath(sx: number, sy: number, ex: number, ey: number, maxLen: number) {
    this.setupPathStart(sx, sy);

    const distance = this.harvestMap(sx, sy, ex, ey, maxLen);
    if (distance === 0)
      return;

    this.finalizePath(ex, ey, distance);
  }

  setupMap(seed: number, lvl: number) {
    this.depth = lvl;
    this.levelSeed = seed;
    this.nodeTemp = [];
    random.setSeed(this.levelSeed + lvl * 25);
    this.generateName();

    this.tiles = new Array(this.width * this.height).fill(false);
    for (let i = 0; i < this.width * this.height; i++)
      this.tiles[i] = new Tile();

    const splitAmount = random.getInt(4, 8);
    this.root = new bspGenerator(3, 3, this.width - 4, this.height - 4, splitAmount);
  }

  makeRooms() {
    for (let i = 0; i < ensure(this.root).rooms.length; i++) {
      const tempRoom = ensure(this.root).tempRooms[i];

      const room = new Rectangle(tempRoom.x, tempRoom.y, tempRoom.w, tempRoom.h);

      this.makeWalls(room.x, room.y, room.x + room.w, room.y + room.h); 0
      this.makeDoorHole(room.x, room.y, room.w, room.h, random.getInt(0, 4));
    }
  }

  preparingCorridors() {
    this.failedCorridos = [];

    for (let i = 0; i < ensure(this.root).corridos.length; i++) {
      const corridor = ensure(this.root).corridos[i]
      this.nodes = [];
      this.createPath(corridor.x, corridor.y, corridor.w, corridor.h, 128);

      if (this.nodes.length === 0) {
        this.failedCorridos.push(corridor);
      }

      for (let j = 0; j < this.nodes.length; j++) {
        this.nodeTemp.push(this.nodes[j]);
      }
    }
  }

  makeCorridors() {
    for (let i = 0; i < this.nodeTemp.length; i++) {
      const node = this.nodeTemp[i];
      this.setFloor(node.x, node.y);
    }

    for (let i = 0; i < this.failedCorridos.length; i++) {
      const corridor = this.failedCorridos[i];
      this.createNaivePath(corridor.x, corridor.y, corridor.w, corridor.h);
    }

  }

  findFreeRoom(ignoreRoom: number) {
    while (1) {
      const currentRoom = random.getInt(0, ensure(this.root).rooms.length);
      if (currentRoom != ignoreRoom) {
        return currentRoom;
      }
    }
    return 0;
  }

  setupStarsAndStairs() {
    const startRoom = this.findFreeRoom(-1);
    const room = ensure(this.root).rooms[startRoom];
    this.startPosition = room.GetCenter();

    const endRoom = this.findFreeRoom(startRoom);
    const stairsRoom = ensure(this.root).rooms[endRoom];
    this.stairs = stairsRoom.GetCenter();
  }

  async generateMap(seed: number, lvl: number) {
    this.setupMap(seed, lvl);

    this.makeRooms();
    this.preparingCorridors();
    this.makeCorridors();

    this.fillUnusedTiles();

    if (random.getInt(0, 100) > 80) {
      this.smoothMap();
      this.makeCorridors();
    }

    //set start and end
    this.setupStarsAndStairs();
  }


  howManyWalls(x: number, y: number): number {
    if (x > 0 && y > 0 && x < this.width - 1 && y < this.height - 1) {
      let count = 0;
      for (let lx = x - 1; lx <= x + 1; lx++)
        for (let ly = y - 1; ly <= y + 1; ly++)
          if (this.noisemap[lx + ly * this.width] === 1) count++;

      return count;
    }

    return 0;
  }

  placeWallLogic(x: number, y: number): number {
    const numWalls = this.howManyWalls(x, y);
    if (this.isWall(x, y)) {
      if (numWalls >= 4) return 1;
      if (numWalls < 2) return 0;
    } else {
      if (numWalls >= 5) return 1;
    }
    return 0;
  }

  async smoothMap() {
    const itermap = new Array(this.width * this.height).fill(0);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.noisemap[x + y * this.width] = this.isWall(x, y) ? 0 : 1;
      }
    }


    const iterAmount = 3; //random.getInt(1, 6);
    console.log("cavern iters: ", iterAmount);
    for (let l = 0; l < iterAmount; l++) {
      for (let y = 1; y < this.height - 1; y++) {
        for (let x = 1; x < this.width - 1; x++) {
          itermap[x + y * this.width] = this.placeWallLogic(x, y);
        }
      }
      for (let i = 0; i < this.width * this.height; i++) {
        this.noisemap[i] = itermap[i];
      }
    }

    //add to map
    for (let y = 1; y < this.height - 1; y++) {
      for (let x = 1; x < this.width - 1; x++) {
        //if (this.isWall(x, y) )
        {
          const index = x + y * this.width;
          if (this.noisemap[index] !== 0) {
            this.setFloor(x, y);
          } else {
            this.setWall(x, y);
          }
        }
      }
    }

  }


  generateName() {
    const listOfAdjectives = ["Suuren", "Mahtavan", "Tukahduttavan", "Kuristavan", "Muinaisen", "Ikuisen", "Loputtoman", "Armottoman"];
    const listOfFirstParts = ["Pelon", "Kuolon", "Varjojen", "Pimeyden", "Kurjuuden", "Tuskan", "Vihan", "Hulluuden", "Painajaisten", "Epätoivon"];
    const listOfSecondParts: string[] = ["luola", "pesä", "maa", "kehto", "kirkko", "temppeli", "lähde", "koti", "linna", "linnoitus"];

    this.dungeonName = "";
    if (random.getInt(0, 10) >= 8) {
      this.dungeonName = listOfAdjectives[random.getInt(0, listOfAdjectives.length)] + " ";
    }
    this.dungeonName += listOfFirstParts[random.getInt(0, listOfFirstParts.length)] + " " + listOfSecondParts[random.getInt(0, listOfFirstParts.length)];
    this.dungeonName = capitalize(this.dungeonName.toLowerCase());

  }

  render() {
    const camera = ensure(game.camera);

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const px = x - camera.x;
        const py = y - camera.y;

        const fov = game.player?.fov?.isInFov(new vec2(x, y));
        if (fov === 2) {


          if (this.tiles[x + y * this.width].collide == true)
            game.drawChar("#", px, py, '#999');
          else {
            game.drawChar('.', px, py, '#999');
          }
        } else if (fov === 1) {
          if (this.tiles[x + y * this.width].collide == true)
            game.drawChar("*", px, py, '#999');
          else {
            game.drawChar(' ', px, py, '#999');
          }
        }
      }
    }
  }

}
