export type LineKind = "prompt" | "output" | "ascii" | "error" | "html";

export type TerminalLine = {
  id: number;
  kind: LineKind;
  text: string;
  html?: React.ReactNode;
  cwdAtTime?: string;
  instant?: boolean;
};

export type Theme = "green" | "amber" | "blue";

export type Secret = {
  id: string;
  name: string;
  hint: string;
  unlocked: boolean;
};

export type CommandContext = {
  args: string[];
  raw: string;
  print: (text: string, kind?: LineKind) => void;
  printAscii: (text: string) => void;
  printError: (text: string) => void;
  printHtml: (node: React.ReactNode) => void;
  clear: () => void;
  history: string[];
  setCwd: (cwd: string) => void;
  cwd: string;
  setTheme: (theme: Theme) => void;
  theme: Theme;
  setSound: (on: boolean) => void;
  soundOn: boolean;
  setComfort: (on: boolean) => void;
  comfort: boolean;
  startMatrix: () => void;
  startSnake: () => void;
  triggerKernelPanic: () => void;
  reboot: () => void;
  secrets: Secret[];
  unlockSecret: (id: string) => void;
  resetSecrets: () => void;
};

export type CommandFn = (ctx: CommandContext) => void | Promise<void>;
