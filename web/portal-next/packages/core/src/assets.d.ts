// Static assets resolved by Vite (the apps compile core from source).
declare module '*.svg' {
  const url: string;
  export default url;
}

declare module '*.svg?raw' {
  const markup: string;
  export default markup;
}
