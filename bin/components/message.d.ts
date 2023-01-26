/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
export declare enum MessageType {
    Info = "info",
    Success = "success",
    Warning = "warning",
    Casual = "casual"
}
export declare const createErrorMessage: (message: string, err?: NodeJS.ErrnoException | null | unknown) => void;
export declare const createMesssage: (message: string, type: MessageType) => void;
