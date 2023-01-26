/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
export declare enum ErrorType {
    OnMove = "onMove",
    ReadDir = "readDir",
    Parameter = "parameter"
}
export declare const displayError: (type: ErrorType, err?: NodeJS.ErrnoException | null | unknown) => void;
