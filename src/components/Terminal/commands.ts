import React from "react";
import { profile } from "@/lib/profile";
import {
  NAME_BANNER_SMALL,
  PORTRAIT,
  SEGFAULT,
  COFFEE_FRAME_A,
  HACK_THE_PLANET,
  projectCard,
} from "@/lib/ascii";
import type { CommandFn, Theme } from "./types";

const COMMAND_DESCRIPTIONS: Record<string, string> = {
  help: "list all commands",
  whoami: "who you're talking to",
  about: "read about Gautam",
  ls: "list things — try `ls projects`",
  cd: "change directory (cosmetic)",
  cat: "print a file or project — `cat about.txt`, `cat 001`",
  open: "open a project by id",
  skills: "list technical skills",
  experience: "work history (alias: work)",
  publications: "papers & preprints",
  contact: "social + email links",
  resume: "download resume.pdf",
  theme: "switch theme — `theme green|amber|blue`",
  comfort: "toggle eye-strain mode — `comfort on|off`",
  clear: "clear the screen",
  cls: "alias for clear",
  history: "show command history",
  date: "current date/time",
  echo: "print arguments",
  banner: "re-print the name banner",
  sound: "toggle key ticks — `sound on|off`",
  run: "launch a program — `run snake`",
  play: "alias for run — `play snake`",
  matrix: "rain go brrr",
  secrets: "find the hidden things",
  exit: "shut it down",
  logout: "alias for exit",
  vim: "the editor",
  emacs: "the operating system",
};

export function commandDescriptions() {
  return COMMAND_DESCRIPTIONS;
}

const HIDDEN_COMMANDS = new Set([
  "play",
  "logout",
  "cls",
]);

function projectByIdOrSlug(q: string) {
  return profile.projects.find((p) => p.id === q || p.slug === q || p.name === q);
}

export const commands: Record<string, CommandFn> = {
  help: ({ print }) => {
    const entries = Object.entries(COMMAND_DESCRIPTIONS).filter(
      ([k]) => !HIDDEN_COMMANDS.has(k),
    );
    const maxName = Math.max(...entries.map(([k]) => k.length));
    const lines = entries.map(
      ([name, desc]) => `  ${name.padEnd(maxName + 2)} ${desc}`,
    );
    print("available commands:");
    print(lines.join("\n"));
    print("");
    print("hint: ↑/↓ for history, Tab to complete.");
  },

  whoami: ({ print }) => {
    print(`${profile.name} (${profile.handle})`);
    print(`role:     ${profile.role}`);
    print(`location: ${profile.location}`);
    print(`tagline:  ${profile.tagline}`);
    print("");
    print("// you, on the other hand, are a mystery 👀");
  },

  about: ({ print, printAscii }) => {
    printAscii(PORTRAIT);
    print("");
    print(profile.bio);
  },

  "cat about.txt": ({ print }) => {
    print(profile.bio);
  },

  ls: ({ args, print }) => {
    const target = args[0];
    if (!target || target === "projects") {
      print("projects/");
      profile.projects.forEach((p) => {
        const star = p.featured ? " ★" : "  ";
        print(`  [${p.id}]${star} ${p.name.padEnd(28)} ${p.tagline}`);
      });
      return;
    }
    if (target === "experience" || target === "work") {
      profile.experience.forEach((x) => {
        print(`  [${x.period}]  ${x.role} @ ${x.company}`);
      });
      return;
    }
    print(`ls: cannot access '${target}': No such file or directory`);
  },

  cd: ({ args, setCwd, print }) => {
    const target = args[0] ?? "~";
    if (target === "~" || target === "/") {
      setCwd("~");
      return;
    }
    if (target === "projects" || target === "work") {
      setCwd("~/projects");
      return;
    }
    if (target === "..") {
      setCwd("~");
      return;
    }
    print(`cd: ${target}: No such file or directory`);
  },

  cat: ({ args, print, printAscii }) => {
    const target = args.join(" ");
    if (!target) {
      print("usage: cat <file|project-id|project-slug>");
      return;
    }
    if (target === "about.txt" || target === "about") {
      print(profile.bio);
      return;
    }
    const project = projectByIdOrSlug(target);
    if (project) {
      printAscii(
        projectCard(
          project.id,
          project.name,
          project.desc,
          project.stack.join(" · "),
          project.url ?? project.repo ?? "",
        ),
      );
      return;
    }
    print(`cat: ${target}: No such file or directory`);
  },

  open: (ctx) => commands.cat?.(ctx),

  skills: ({ print }) => {
    const sections: [string, readonly string[]][] = [
      ["languages   ", profile.skills.languages],
      ["ml          ", profile.skills.ml],
      ["tools       ", profile.skills.tools],
      ["interests   ", profile.skills.interests],
    ];
    sections.forEach(([label, list]) => {
      print(`  ${label}  ${list.map((s) => `[ ${s} ]`).join(" ")}`);
    });
  },

  experience: ({ print }) => {
    profile.experience.forEach((x) => {
      print(`[${x.period}]  ${x.role} @ ${x.company}`);
      x.bullets.forEach((b) => print(`  ├─ ${b}`));
      print("");
    });
  },

  work: (ctx) => commands.experience?.(ctx),

  publications: ({ print }) => {
    profile.publications.forEach((p) => {
      print(`• ${p.title}`);
      print(`  ${p.venue}`);
      print(`  ${p.desc}`);
      print("");
    });
  },

  contact: ({ print, printHtml }) => {
    print("contact:");
    printHtml(
      React.createElement(
        "div",
        null,
        [
          ["✉", "email", `mailto:${profile.socials.email}`, profile.socials.email],
          ["⌥", "github", profile.socials.github, profile.socials.github],
          ["⌬", "linkedin", profile.socials.linkedin, profile.socials.linkedin],
          ["✕", "twitter", profile.socials.twitter, profile.socials.twitter],
        ].map(([icon, label, href, text], i) =>
          React.createElement(
            "div",
            { key: i },
            `  ${icon}  ${label.padEnd(10)} `,
            React.createElement(
              "a",
              { href, target: "_blank", rel: "noreferrer noopener" },
              text,
            ),
          ),
        ),
      ),
    );
  },

  resume: ({ print, printHtml }) => {
    printHtml(
      React.createElement(
        "div",
        null,
        "resume.pdf — ",
        React.createElement(
          "a",
          { href: profile.resumeUrl, target: "_blank", rel: "noreferrer noopener" },
          "[ download ]",
        ),
      ),
    );
  },

  theme: ({ args, setTheme, print }) => {
    const t = (args[0] ?? "").toLowerCase() as Theme;
    if (t !== "green" && t !== "amber" && t !== "blue") {
      print("usage: theme <green|amber|blue>");
      return;
    }
    setTheme(t);
    print(`theme set to ${t}.`);
  },

  comfort: ({ args, print, setComfort, comfort }) => {
    const v = (args[0] ?? "").toLowerCase();
    if (!v) {
      print(`comfort mode is ${comfort ? "on" : "off"} — usage: comfort <on|off>`);
      return;
    }
    if (v === "on") {
      setComfort(true);
      print("comfort mode on. scanlines, flicker, and glow disabled.");
      return;
    }
    if (v === "off") {
      setComfort(false);
      print("comfort mode off. CRT mode engaged.");
      return;
    }
    print("usage: comfort <on|off>");
  },

  clear: ({ clear }) => clear(),
  cls: ({ clear }) => clear(),

  history: ({ history, print }) => {
    if (history.length === 0) {
      print("(no history yet)");
      return;
    }
    history.forEach((h, i) =>
      print(`  ${String(i + 1).padStart(3)}  ${h}`),
    );
  },

  date: ({ print }) => {
    print(new Date().toString());
    print("(uptime: pretending to know what I'm doing since 2018)");
  },

  echo: ({ args, print }) => {
    print(args.join(" "));
  },

  banner: ({ printAscii }) => {
    printAscii(NAME_BANNER_SMALL);
  },

  sound: ({ args, setSound, print, soundOn }) => {
    const v = (args[0] ?? "").toLowerCase();
    if (!v) {
      print(`sound is ${soundOn ? "on" : "off"} — usage: sound <on|off>`);
      return;
    }
    if (v === "on") {
      setSound(true);
      print("sound on. tap tap tap.");
      return;
    }
    if (v === "off") {
      setSound(false);
      print("sound off.");
      return;
    }
    print("usage: sound <on|off>");
  },

  run: ({ args, startSnake, print }) => {
    const target = args[0];
    if (target === "snake") {
      startSnake();
      print("launching snake...");
      return;
    }
    print(`run: unknown program '${target ?? ""}'`);
  },

  play: (ctx) => commands.run?.(ctx),

  matrix: ({ startMatrix, print }) => {
    startMatrix();
    print("the matrix has you...");
  },

  secrets: ({ print, secrets }) => {
    const found = secrets.filter((s) => s.unlocked).length;
    print(`secrets: ${found}/${secrets.length} found.`);
    print("");
    secrets.forEach((s, i) => {
      const idx = String(i + 1).padStart(2, " ");
      if (s.unlocked) {
        print(`  ${idx}. ✓  ${s.name}`);
      } else {
        print(`  ${idx}. ?   ${s.hint}`);
      }
    });
    print("");
    print("(type `reset secrets` to clear progress)");
  },

  "reset secrets": ({ print, resetSecrets }) => {
    resetSecrets();
    print("secrets reset.");
  },

  sudo: ({ args, print }) => {
    const rest = args.join(" ").trim();
    if (rest === "make me a sandwich") {
      print("Okay. 🥪");
      return;
    }
    if (rest.startsWith("rm -rf")) {
      print("nice try.");
      return;
    }
    print("Permission denied: nice try.");
  },

  "rm -rf /": async ({ print }) => {
    const steps = ["3...", "2...", "1...", "wait, NO —"];
    for (const s of steps) {
      print(s);
      await new Promise((r) => setTimeout(r, 350));
    }
    print("Just kidding. ❤️");
  },

  exit: ({ reboot }) => reboot(),
  logout: ({ reboot }) => reboot(),

  vim: ({ print }) => {
    print(":q! :q! :q!  — escape from vim is a learned skill.");
    print("(use emacs)");
  },

  emacs: ({ print }) => {
    print("M-x butterfly  — emacs is a great OS, lacks a good editor.");
    print("(use vim)");
  },

  // hidden / easter eggs
  coffee: ({ printAscii, print, unlockSecret }) => {
    printAscii(COFFEE_FRAME_A);
    print("☕ stay caffeinated.");
    unlockSecret("coffee");
  },

  "make me a sandwich": ({ print }) => {
    print("What? Make it yourself.");
  },

  "hack the planet": ({ printAscii }) => {
    printAscii(HACK_THE_PLANET);
  },
};

export function runCommand(
  rawInput: string,
  ctx: Omit<Parameters<CommandFn>[0], "args" | "raw">,
): { ran: boolean; isInvalid: boolean } {
  const trimmed = rawInput.trim();
  if (!trimmed) return { ran: false, isInvalid: false };

  const lower = trimmed.toLowerCase();

  if (lower === "rm -rf /") {
    void commands["rm -rf /"]?.({ ...ctx, args: [], raw: trimmed });
    return { ran: true, isInvalid: false };
  }
  if (lower === "cat about.txt") {
    commands["cat about.txt"]?.({ ...ctx, args: [], raw: trimmed });
    return { ran: true, isInvalid: false };
  }
  if (lower === "make me a sandwich") {
    commands["make me a sandwich"]?.({ ...ctx, args: [], raw: trimmed });
    return { ran: true, isInvalid: false };
  }
  if (lower === "hack the planet") {
    commands["hack the planet"]?.({ ...ctx, args: [], raw: trimmed });
    return { ran: true, isInvalid: false };
  }
  if (lower === "reset secrets") {
    commands["reset secrets"]?.({ ...ctx, args: [], raw: trimmed });
    return { ran: true, isInvalid: false };
  }

  const tokens = trimmed.split(/\s+/);
  const name = tokens[0].toLowerCase();
  const args = tokens.slice(1);

  const fn = commands[name];
  if (!fn) {
    return { ran: false, isInvalid: true };
  }
  void fn({ ...ctx, args, raw: trimmed });
  return { ran: true, isInvalid: false };
}

export function tabComplete(input: string): string | null {
  const trimmed = input.trimStart();
  if (!trimmed) return null;

  const tokens = trimmed.split(/\s+/);
  if (tokens.length === 1) {
    const prefix = tokens[0].toLowerCase();
    const matches = Object.keys(COMMAND_DESCRIPTIONS).filter((c) =>
      c.startsWith(prefix),
    );
    if (matches.length === 1) return matches[0] + " ";
    return null;
  }

  const cmd = tokens[0].toLowerCase();
  const argPrefix = tokens[tokens.length - 1].toLowerCase();
  let candidates: string[] = [];

  if (cmd === "theme") candidates = ["green", "amber", "blue"];
  else if (cmd === "sound" || cmd === "comfort") candidates = ["on", "off"];
  else if (cmd === "run" || cmd === "play") candidates = ["snake"];
  else if (cmd === "cat" || cmd === "open") {
    candidates = profile.projects
      .map((p) => p.id)
      .concat(profile.projects.map((p) => p.slug))
      .concat(["about.txt"]);
  } else if (cmd === "ls" || cmd === "cd")
    candidates = ["projects", "experience"];

  const matches = candidates.filter((c) => c.startsWith(argPrefix));
  if (matches.length !== 1) return null;
  tokens[tokens.length - 1] = matches[0];
  return tokens.join(" ") + " ";
}
