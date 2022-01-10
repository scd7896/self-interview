export type Difficulty = {
  easy?: string[];
  midium?: string[];
  hard?: string[];
};

export type DiffcultyKeys = Array<"easy" | "midium" | "hard">;
export class Position {
  theory: Difficulty;
  realGame: Difficulty;
}
