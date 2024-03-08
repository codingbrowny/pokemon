declare module "color-thief" {
  export interface RGB {
    0: number; // Red component
    1: number; // Green component
    2: number; // Blue component
  }

  export default class ColorThief {
    getColor(image: HTMLImageElement, quality?: number): RGB;
    getPalette(
      image: HTMLImageElement,
      colorCount?: number,
      quality?: number
    ): RGB[];
  }
}
