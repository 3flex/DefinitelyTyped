// Type definitions for Resemble.js v1.3.0
// Project: https://github.com/rsmbl/Resemble.js
// Definitions by: Tim Perry <https://github.com/pimterry>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export = Resemble;
export as namespace resemble;

/**
 * Retrieve basic analysis for a single image (add compareTo to compare with another).
 */
declare function Resemble(image: string | ImageData): Resemble.ResembleAnalysis;

declare namespace Resemble {
  /**
   * Set the resemblance image output style
   */
  function outputSettings(settings: OutputSettings): typeof Resemble;

  function compare(image1: string | ImageData | Buffer, image2: string | ImageData | Buffer, options: Resemble.Options, callback: (data: any, result: ResembleComparisonResult) => void): void
  function compare(image1: string | ImageData | Buffer, image2: string | ImageData | Buffer, callback: (data: any, result: ResembleComparisonResult) => void): void

  interface OutputSettings {
    errorColor?: {
      red: number;
      green: number;
      blue: number;
    };
    errorType?: string;
    transparency?: number;
    largeImageThreshold?: number;
    useCrossOrigin?: boolean;
    outputDiff?: boolean;
    boundingBox?: Box;
    boundingBoxes?: Box[];
    ignoredBox?: Box;
    ignoredBoxes?: Box[];
    ignoreAreasColoredWith?: Color;
  }

  interface Options {
    returnEarlyThreshold?: number;
    scaleToSameSize?: boolean;
    ignore?: string | string[]
  }

  interface Box {
    left: number;
    top: number;
    right: number;
    bottom: number;
  }

  interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
  }

  interface ResembleAnalysis {
    /**
     * Run the analysis on this image and get the result
     */
    onComplete(callback: (result: ResembleAnalysisResult) => void): void;

    /**
     * Compare this image to another image, to get resemblance data
     */
    compareTo(fileData: string | ImageData): ResembleComparison;
  }

  interface ResembleAnalysisResult {
    red: number;
    green: number;
    blue: number;
    brightness: number;
  }

  interface ResembleComparison {
    /**
     * Run the analysis and get the comparison result
     */
    onComplete(callback: (result: ResembleComparisonResult) => void): ResembleComparison;

    setReturnEarlyThreshold(threshold: number): ResembleComparison;
    scaleToSameSize(): ResembleComparison;
    useOriginalSize(): ResembleComparison;
    ignoreNothing(): ResembleComparison;
    ignoreLess(): ResembleComparison;
    ignoreAntialiasing(): ResembleComparison;
    ignoreColors(): ResembleComparison;
    ignoreAlpha(): ResembleComparison;
    repaint(): ResembleComparison;
    outputSettings(outputSettings: Resemble.OutputSettings): ResembleComparison;

  }

  interface ResembleComparisonResult {
    /**
     * Do the two images have the same dimensions?
     */
    isSameDimensions: boolean;

    /**
     * The difference in width and height between the dimensions of the two compared images
     */
    dimensionDifference: {
      width: number;
      height: number;
    };

    /**
     * Get a data URL for the comparison image
     */
    getImageDataUrl(): string;

    /**
     * Get a node Buffer for the comparison
     */
    getBuffer(): Buffer;

    /**
     * The percentage of pixels which do not match between the images
     */
    misMatchPercentage: number;

    diffBounds: {
      top: number;
      left: number;
      bottom: number;
      right: number;
    };

    analysisTime: number;
  }
}
