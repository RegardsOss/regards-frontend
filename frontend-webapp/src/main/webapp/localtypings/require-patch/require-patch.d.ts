interface NodeRequire {
   ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}
