import Resemble, { ResembleComparisonResult } from "resemblejs";

declare function compareImages(image1: string | ImageData | Buffer, image2: string | ImageData | Buffer, options?: Resemble.Options): Promise<ResembleComparisonResult>;

export = compareImages;
