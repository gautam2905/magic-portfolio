// All ASCII art lives here. ANSI Shadow style for the name banner.

export const NAME_BANNER = String.raw`
 ██████╗  █████╗ ██╗   ██╗████████╗ █████╗ ███╗   ███╗
██╔════╝ ██╔══██╗██║   ██║╚══██╔══╝██╔══██╗████╗ ████║
██║  ███╗███████║██║   ██║   ██║   ███████║██╔████╔██║
██║   ██║██╔══██║██║   ██║   ██║   ██╔══██║██║╚██╔╝██║
╚██████╔╝██║  ██║╚██████╔╝   ██║   ██║  ██║██║ ╚═╝ ██║
 ╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝     ╚═╝
 ██████╗ ██╗   ██╗██████╗ ████████╗ █████╗
██╔════╝ ██║   ██║██╔══██╗╚══██╔══╝██╔══██╗
██║  ███╗██║   ██║██████╔╝   ██║   ███████║
██║   ██║██║   ██║██╔═══╝    ██║   ██╔══██║
╚██████╔╝╚██████╔╝██║        ██║   ██║  ██║
 ╚═════╝  ╚═════╝ ╚═╝        ╚═╝   ╚═╝  ╚═╝
`;

export const NAME_BANNER_SMALL = String.raw`
 ___   __    _   _ _____  __  __  __
/ __| /__\  | | | |_   _|/__\/  \/  \
\__ \/ \//  | |_| | | | / \//\/\/\  /
|___/\_/\_\  \___/  |_| \_/\_/\__/\_/
`;

// TODO: replace with custom ASCII portrait
export const PORTRAIT = String.raw`
        ▄▄▄▄▄▄▄▄▄
      ▄█████████████▄
    ▄███████████████████▄
   ████  ▀▀▀▀▀▀▀▀▀▀▀ ████
   ████   ●       ●  ████
   ████                ████
   ████      ___       ████
   ████   '       '    ████
    ▀████  \_______/  ████▀
      ▀█████████████████▀
        ▀█████▄▄▄▄▄█████▀
            ▀▀▀ ▀▀▀
          [user_avatar]
`;

export const SEGFAULT = String.raw`
  ____  _____ ____ _____  _    _   _ _   _____
 / ___|| ____/ ___|  ___|/ \  | | | | | |_   _|
 \___ \|  _|| |  _| |_  / _ \ | | | | |   | |
  ___) | |__| |_| |  _|/ ___ \| |_| | |___| |
 |____/|_____\____|_| /_/   \_\\___/|_____|_|
            core dumped (it was a small core)
`;

export const COFFEE_FRAME_A = String.raw`
       )  (
        (   ) )
         ) ( (
       _______)_
    .-'---------|
   ( C|/\/\/\/\/|
    '-./\/\/\/\/|
      '_________'
       '-------'
`;

export const COFFEE_FRAME_B = String.raw`
        ( )  )
       ) (  ( )
        ) ) (
       _______)_
    .-'---------|
   ( C|/\/\/\/\/|
    '-./\/\/\/\/|
      '_________'
       '-------'
`;

export const HACK_THE_PLANET = String.raw`
██╗  ██╗ █████╗  ██████╗██╗  ██╗    ████████╗██╗  ██╗███████╗
██║  ██║██╔══██╗██╔════╝██║ ██╔╝    ╚══██╔══╝██║  ██║██╔════╝
███████║███████║██║     █████╔╝        ██║   ███████║█████╗
██╔══██║██╔══██║██║     ██╔═██╗        ██║   ██╔══██║██╔══╝
██║  ██║██║  ██║╚██████╗██║  ██╗       ██║   ██║  ██║███████╗
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝       ╚═╝   ╚═╝  ╚═╝╚══════╝
            ██████╗ ██╗      █████╗ ███╗   ██╗███████╗████████╗
            ██╔══██╗██║     ██╔══██╗████╗  ██║██╔════╝╚══██╔══╝
            ██████╔╝██║     ███████║██╔██╗ ██║█████╗     ██║
            ██╔═══╝ ██║     ██╔══██║██║╚██╗██║██╔══╝     ██║
            ██║     ███████╗██║  ██║██║ ╚████║███████╗   ██║
            ╚═╝     ╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝   ╚═╝
`;

// 38-char inner width, leaves 2 char border on each side
export function projectCard(
  id: string,
  name: string,
  desc: string,
  stack: string,
  url: string,
): string {
  const W = 56;
  const pad = (s: string) => {
    const truncated = s.length > W ? s.slice(0, W - 1) + "…" : s;
    return truncated + " ".repeat(Math.max(0, W - truncated.length));
  };
  const top = "╔" + "═".repeat(W + 2) + "╗";
  const bot = "╚" + "═".repeat(W + 2) + "╝";
  const sep = "║ " + "─".repeat(W) + " ║";
  return [
    top,
    `║ ${pad(`[${id}] ${name}`)} ║`,
    sep,
    `║ ${pad(desc)} ║`,
    `║ ${pad(`stack: ${stack}`)} ║`,
    `║ ${pad(`→ ${url}`)} ║`,
    bot,
  ].join("\n");
}

export const SNAKE_HELP = "WASD/Arrows to move · q or ESC to quit";

export const BSOD = String.raw`
   ▄█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█▄
   █  KERNEL PANIC                                                █
   █  An error has occurred. To continue:                         █
   █  Press any key to return to GAUTAM-OS.                       █
   █                                                              █
   █  *  Press CTRL+ALT+DEL again to restart your computer.       █
   █     You will lose any unsaved information in all open apps.  █
   █                                                              █
   █  Error: 0xDEADBEEF                                           █
   ▀█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█▀
`;
