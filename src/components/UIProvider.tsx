"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { SiteContent } from "@/content";
import {
  accentKinds,
  beyondCardKinds,
  gamesKinds,
  pickerKinds,
  gimmickKinds,
  heroKinds,
  navKinds,
  siteConfig,
  textureKinds,
  type AccentKind,
  type BeyondCardKind,
  type GamesKind,
  type PickerKind,
  type GimmickKind,
  type HeroKind,
  type NavKind,
  type TextureKind,
} from "@/lib/site";

export type Theme = "dark" | "light";

interface UIState {
  content: SiteContent;
  theme: Theme;
  toggleTheme: () => void;
  reducedMotion: boolean;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  resumeOpen: boolean;
  setResumeOpen: (open: boolean) => void;
  party: boolean;
  toggleParty: () => void;
  toast: string | null;
  showToast: (message: string) => void;
  copyEmail: () => Promise<boolean>;
  accent: AccentKind;
  setAccent: (accent: AccentKind) => void;
  nav: NavKind;
  setNav: (nav: NavKind) => void;
  hero: HeroKind;
  setHero: (hero: HeroKind) => void;
  texture: TextureKind;
  setTexture: (texture: TextureKind) => void;
  gimmick: GimmickKind;
  setGimmick: (gimmick: GimmickKind) => void;
  games: GamesKind;
  setGames: (games: GamesKind) => void;
  picker: PickerKind;
  setPicker: (picker: PickerKind) => void;
  beyondCard: BeyondCardKind;
  setBeyondCard: (kind: BeyondCardKind) => void;
}

const UIContext = createContext<UIState | null>(null);

export function useUI(): UIState {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}

const isDev = process.env.NODE_ENV === "development";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function setUrlParam(key: string, value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState(null, "", url);
}

export function UIProvider({ content, children }: { content: SiteContent; children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [party, setParty] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [accent, setAccentState] = useState<AccentKind>(siteConfig.accent);
  const [nav, setNavState] = useState<NavKind>(siteConfig.nav);
  const [hero, setHeroState] = useState<HeroKind>(siteConfig.hero);
  const [texture, setTextureState] = useState<TextureKind>(siteConfig.texture);
  const [gimmick, setGimmickState] = useState<GimmickKind>(siteConfig.gimmick);
  const [games, setGamesState] = useState<GamesKind>(siteConfig.games);
  const [picker, setPickerState] = useState<PickerKind>(siteConfig.picker);
  const [beyondCard, setBeyondCardState] = useState<BeyondCardKind>(siteConfig.beyondCard);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  // Sync with the theme the inline script applied before paint, and (dev only) URL overrides.
  useEffect(() => {
    const applied = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync with pre-paint DOM state
    if (applied === "light") setTheme("light");
    if (!isDev) return;
    const params = new URLSearchParams(window.location.search);
    const a = params.get("accent");
    const n = params.get("nav");
    if (n && (navKinds as readonly string[]).includes(n)) setNavState(n as NavKind);
    const h = params.get("hero");
    if (h && (heroKinds as readonly string[]).includes(h)) setHeroState(h as HeroKind);
    const t = params.get("texture");
    if (t && (textureKinds as readonly string[]).includes(t)) setTextureState(t as TextureKind);
    const g = params.get("gimmick");
    if (g && (gimmickKinds as readonly string[]).includes(g)) setGimmickState(g as GimmickKind);
    const gc = params.get("games");
    if (gc && (gamesKinds as readonly string[]).includes(gc)) setGamesState(gc as GamesKind);
    const pk = params.get("picker");
    if (pk && (pickerKinds as readonly string[]).includes(pk)) setPickerState(pk as PickerKind);
    const bc = params.get("beyondCard");
    if (bc && (beyondCardKinds as readonly string[]).includes(bc)) setBeyondCardState(bc as BeyondCardKind);
    if (a && (accentKinds as readonly string[]).includes(a)) {
      setAccentState(a as AccentKind);
      document.documentElement.setAttribute("data-accent", a);
    }
  }, []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* storage unavailable — theme still applies for this visit */
      }
      return next;
    });
  }, []);

  const toggleParty = useCallback(() => {
    setParty((prev) => {
      showToast(prev ? content.ui.palette.partyOff : content.ui.palette.partyOn);
      return !prev;
    });
  }, [content.ui.palette.partyOff, content.ui.palette.partyOn, showToast]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content.owner.email);
      showToast(`${content.ui.contact.copied} ${content.owner.email}`);
      return true;
    } catch {
      window.location.href = `mailto:${content.owner.email}`;
      return false;
    }
  }, [content.owner.email, content.ui.contact.copied, showToast]);

  const setAccent = useCallback((next: AccentKind) => {
    setAccentState(next);
    document.documentElement.setAttribute("data-accent", next);
    setUrlParam("accent", next);
  }, []);

  const setNav = useCallback((next: NavKind) => {
    setNavState(next);
    setUrlParam("nav", next);
  }, []);

  const setHero = useCallback((next: HeroKind) => {
    setHeroState(next);
    setUrlParam("hero", next);
  }, []);

  const setTexture = useCallback((next: TextureKind) => {
    setTextureState(next);
    setUrlParam("texture", next);
  }, []);

  const setGimmick = useCallback((next: GimmickKind) => {
    setGimmickState(next);
    setUrlParam("gimmick", next);
  }, []);

  const setGames = useCallback((next: GamesKind) => {
    setGamesState(next);
    setUrlParam("games", next);
  }, []);

  const setPicker = useCallback((next: PickerKind) => {
    setPickerState(next);
    setUrlParam("picker", next);
  }, []);

  const setBeyondCard = useCallback((next: BeyondCardKind) => {
    setBeyondCardState(next);
    setUrlParam("beyondCard", next);
  }, []);

  // Back/forward cache can restore a page while its Locale-switch curtain is still closed.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) document.documentElement.removeAttribute("data-curtain");
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  // ⌘K / Ctrl+K opens the command palette from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<UIState>(
    () => ({
      content,
      theme,
      toggleTheme,
      reducedMotion,
      paletteOpen,
      setPaletteOpen,
      resumeOpen,
      setResumeOpen,
      party,
      toggleParty,
      toast,
      showToast,
      copyEmail,
      accent,
      setAccent,
      nav,
      setNav,
      hero,
      setHero,
      texture,
      setTexture,
      gimmick,
      setGimmick,
      games,
      setGames,
      picker,
      setPicker,
      beyondCard,
      setBeyondCard,
    }),
    [content, theme, toggleTheme, reducedMotion, paletteOpen, resumeOpen, party, toggleParty, toast, showToast, copyEmail, accent, setAccent, nav, setNav, hero, setHero, texture, setTexture, gimmick, setGimmick, games, setGames, picker, setPicker, beyondCard, setBeyondCard],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
