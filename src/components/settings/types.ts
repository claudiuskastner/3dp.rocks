export type ImageSettings = {
    positiveImage: boolean;
    mirrorImage: boolean;
    flipImage: boolean;
    manualRefresh: boolean;
    mirrorRepeat: boolean;
    flipRepeat: boolean;
    repeatXCount: number;
    repeatYCount: number;
};

export type ModelSettings = {
    maximumSize: number;
    thickness: number;
    border: number;
    thinnestLayer: number;
    vectorsPerPixel: number;
    baseDepth: number;
    curve: number;
};

export type DownloadSettings = {
    manual: boolean;
    binaryStl: boolean;
};

export const defaultImageSettings = {
    positiveImage: false,
    mirrorImage: false,
    flipImage: false,
    manualRefresh: false,
    mirrorRepeat: false,
    flipRepeat: false,
    repeatXCount: 1,
    repeatYCount: 1,
};

export const defaultModelSettings = {
    maximumSize: 100,
    thickness: 3,
    border: 0,
    thinnestLayer: 0.8,
    vectorsPerPixel: 4,
    baseDepth: 0,
    curve: 0,
};

export const defaultDownloadSettings = {
    manual: false,
    binaryStl: true,
};
