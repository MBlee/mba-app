export declare enum fileType {
    NOTEXIST = 0,
    ISFILE = 1,
    ISDIR = 2
}
declare const mMkdir: (dir: string) => Promise<void>;
declare const isFile: (file: string) => Promise<any>;
declare const mkFile: (file: string, content?: string) => Promise<void>;
declare const rdFile: (file: string) => Promise<any>;
declare const rewriteFile: (file: string, content?: string) => Promise<void>;
export { mMkdir, mkFile, rdFile, isFile, rewriteFile };
