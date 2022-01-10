type Difficulty = {
  easy?: string[];
  midium?: string[];
  hard?: string[];
};

export class Position {
  theory: Difficulty;
  realGame: Difficulty;
}
