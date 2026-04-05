declare module "aos" {
  interface AOSOptions {
    duration?: number;
    once?: boolean;
    offset?: number;
    easing?: string;
    disable?: boolean | string | (() => boolean);
    delay?: number;
    mirror?: boolean;
    anchorPlacement?: string;
  }

  interface AOSStatic {
    init(options?: AOSOptions): void;
    refresh(): void;
    refreshHard(): void;
  }

  const AOS: AOSStatic;

  export default AOS;
}
