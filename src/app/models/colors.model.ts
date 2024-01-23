export enum Color {
  RED_1 = 'red-1',
  RED_2 = 'red-2',
  ORANGE_1 = 'orange-1',
  ORANGE_2 = 'orange-2',
  YELLOW_1 = 'yellow-1',
  YELLOW_2 = 'yellow-2',
  GREEN_1 = 'green-1',
  GREEN_2 = 'green-2',
  AQUA_1 = 'aqua-1',
  AQUA_2 = 'aqua-2',
  BLUE_1 = 'blue-1',
  BLUE_2 = 'blue-2',
  INDIGO_1 = 'indigo-1',
  INDIGO_2 = 'indigo-2',
  PURPLE_1 = 'purple-1',
  PURPLE_2 = 'purple-2',
  VOID = 'void'
}

export class ColorMatcher {
  private setColor: Color = Color.VOID;

  constructor(color?: Color) {
    if (color) {
      this.setColor = color;
    }
  }

  get color(): Color {
    return this.setColor;
  }

  set color(color: Color) {
    this.setColor = color;
  }

  get isRed1(): boolean {
    return this.color === Color.RED_1;
  }

  get isRed2(): boolean {
    return this.color === Color.RED_2;
  }

  get isOrange1(): boolean {
    return this.color === Color.ORANGE_1;
  }

  get isOrange2(): boolean {
    return this.color === Color.ORANGE_2;
  }

  get isYellow1(): boolean {
    return this.color === Color.YELLOW_1;
  }

  get isYellow2(): boolean {
    return this.color === Color.YELLOW_2;
  }

  get isGreen1(): boolean {
    return this.color === Color.GREEN_1;
  }

  get isGreen2(): boolean {
    return this.color === Color.GREEN_2;
  }

  get isAqua1(): boolean {
    return this.color === Color.AQUA_1;
  }

  get isAqua2(): boolean {
    return this.color === Color.AQUA_2;
  }

  get isBlue1(): boolean {
    return this.color === Color.BLUE_1;
  }

  get isBlue2(): boolean {
    return this.color === Color.BLUE_2;
  }

  get isIndigo1(): boolean {
    return this.color === Color.INDIGO_1;
  }

  get isIndigo2(): boolean {
    return this.color === Color.INDIGO_2;
  }

  get isPurple1(): boolean {
    return this.color === Color.PURPLE_1;
  }

  get isPurple2(): boolean {
    return this.color === Color.PURPLE_2;
  }
};
