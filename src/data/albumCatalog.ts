import rosterRaw from "../../jogadores.txt?raw";

export type StickerStatus = "unset" | "owned" | "missing";

export type StickerKind = "player" | "team" | "coca" | "fwc";

export type StickerState = {
  status: StickerStatus;
  quantity: number;
};

export type StickerDefinition = {
  id: string;
  code: string;
  label: string;
  kind: StickerKind;
  order: number;
  countryCode?: string;
  countryName?: string;
  countryFlag?: string;
  groupId: string;
  sectionId: string;
};

export type CountrySection = {
  code: string;
  namePtBr: string;
  flag: string;
  groupId: string;
  stickers: StickerDefinition[];
};

export type GroupSection = {
  id: string;
  name: string;
  countries: CountrySection[];
};

type TeamMeta = {
  code: string;
  namePtBr: string;
  flag: string;
};

type GroupMeta = {
  id: string;
  teams: TeamMeta[];
};

// Grupos A–L do álbum (códigos iguais aos do jogadores.txt).
const GROUPS: GroupMeta[] = [
  {
    id: "A",
    teams: [
      { code: "MEX", namePtBr: "México", flag: "🇲🇽" },
      { code: "RSA", namePtBr: "África do Sul", flag: "🇿🇦" },
      { code: "KOR", namePtBr: "Coreia do Sul", flag: "🇰🇷" },
      { code: "CZE", namePtBr: "Tchéquia", flag: "🇨🇿" },
    ],
  },
  {
    id: "B",
    teams: [
      { code: "CAN", namePtBr: "Canadá", flag: "🇨🇦" },
      { code: "BIH", namePtBr: "Bósnia e Herzegovina", flag: "🇧🇦" },
      { code: "QAT", namePtBr: "Catar", flag: "🇶🇦" },
      { code: "SUI", namePtBr: "Suíça", flag: "🇨🇭" },
    ],
  },
  {
    id: "C",
    teams: [
      { code: "BRA", namePtBr: "Brasil", flag: "🇧🇷" },
      { code: "MAR", namePtBr: "Marrocos", flag: "🇲🇦" },
      { code: "HTI", namePtBr: "Haiti", flag: "🇭🇹" },
      { code: "SCO", namePtBr: "Escócia", flag: "🏴" },
    ],
  },
  {
    id: "D",
    teams: [
      { code: "USA", namePtBr: "Estados Unidos", flag: "🇺🇸" },
      { code: "PAR", namePtBr: "Paraguai", flag: "🇵🇾" },
      { code: "AUS", namePtBr: "Austrália", flag: "🇦🇺" },
      { code: "TUR", namePtBr: "Turquia", flag: "🇹🇷" },
    ],
  },
  {
    id: "E",
    teams: [
      { code: "GER", namePtBr: "Alemanha", flag: "🇩🇪" },
      { code: "CUW", namePtBr: "Curaçau", flag: "🇨🇼" },
      { code: "CIV", namePtBr: "Costa do Marfim", flag: "🇨🇮" },
      { code: "ECU", namePtBr: "Equador", flag: "🇪🇨" },
    ],
  },
  {
    id: "F",
    teams: [
      { code: "NED", namePtBr: "Países Baixos", flag: "🇳🇱" },
      { code: "JPN", namePtBr: "Japão", flag: "🇯🇵" },
      { code: "SWE", namePtBr: "Suécia", flag: "🇸🇪" },
      { code: "TUN", namePtBr: "Tunísia", flag: "🇹🇳" },
    ],
  },
  {
    id: "G",
    teams: [
      { code: "BEL", namePtBr: "Bélgica", flag: "🇧🇪" },
      { code: "EGY", namePtBr: "Egito", flag: "🇪🇬" },
      { code: "IRI", namePtBr: "Irã", flag: "🇮🇷" },
      { code: "NZL", namePtBr: "Nova Zelândia", flag: "🇳🇿" },
    ],
  },
  {
    id: "H",
    teams: [
      { code: "ESP", namePtBr: "Espanha", flag: "🇪🇸" },
      { code: "CPV", namePtBr: "Cabo Verde", flag: "🇨🇻" },
      { code: "KSA", namePtBr: "Arábia Saudita", flag: "🇸🇦" },
      { code: "URU", namePtBr: "Uruguai", flag: "🇺🇾" },
    ],
  },
  {
    id: "I",
    teams: [
      { code: "FRA", namePtBr: "França", flag: "🇫🇷" },
      { code: "SEN", namePtBr: "Senegal", flag: "🇸🇳" },
      { code: "IRQ", namePtBr: "Iraque", flag: "🇮🇶" },
      { code: "NOR", namePtBr: "Noruega", flag: "🇳🇴" },
    ],
  },
  {
    id: "J",
    teams: [
      { code: "ARG", namePtBr: "Argentina", flag: "🇦🇷" },
      { code: "DZA", namePtBr: "Argélia", flag: "🇩🇿" },
      { code: "AUT", namePtBr: "Áustria", flag: "🇦🇹" },
      { code: "JOR", namePtBr: "Jordânia", flag: "🇯🇴" },
    ],
  },
  {
    id: "K",
    teams: [
      { code: "POR", namePtBr: "Portugal", flag: "🇵🇹" },
      { code: "COD", namePtBr: "República Democrática do Congo", flag: "🇨🇩" },
      { code: "UZB", namePtBr: "Uzbequistão", flag: "🇺🇿" },
      { code: "COL", namePtBr: "Colômbia", flag: "🇨🇴" },
    ],
  },
  {
    id: "L",
    teams: [
      { code: "ENG", namePtBr: "Inglaterra", flag: "🏴" },
      { code: "CRO", namePtBr: "Croácia", flag: "🇭🇷" },
      { code: "GHA", namePtBr: "Gana", flag: "🇬🇭" },
      { code: "PAN", namePtBr: "Panamá", flag: "🇵🇦" },
    ],
  },
];

// Lê o jogadores.txt e monta um mapa: CÓDIGO -> { posição: nome }.
// Aceita linhas no formato "BRA15: Rodrygo" ou "BRA15 = Rodrygo".
function parseRoster(raw: string): Record<string, Record<number, string>> {
  const map: Record<string, Record<number, string>> = {};

  for (const line of raw.split(/\r?\n/)) {
    const match = line.trim().match(/^([A-Za-z]+)\s*(\d+)\s*[:=]\s*(.+)$/);
    if (!match) {
      continue;
    }

    const [, rawCode, posStr, name] = match;
    const code = rawCode.toUpperCase();
    const cleanName = name.trim();

    if (!cleanName) {
      continue;
    }

    if (!map[code]) {
      map[code] = {};
    }
    map[code][Number(posStr)] = cleanName;
  }

  return map;
}

const roster = parseRoster(rosterRaw);

// Cada seleção tem 20 figurinhas: #1 = Escudo, #13 = Time, o resto são jogadores.
const TEAM_STICKER_COUNT = 20;

function createTeamStickers(team: TeamMeta, groupId: string): StickerDefinition[] {
  const players = roster[team.code] ?? {};
  const stickers: StickerDefinition[] = [];

  for (let pos = 1; pos <= TEAM_STICKER_COUNT; pos += 1) {
    let label: string;
    let kind: StickerKind;

    if (pos === 1) {
      label = "Escudo";
      kind = "team";
    } else if (pos === 13) {
      label = "Time";
      kind = "team";
    } else {
      label = players[pos] ?? `#${pos}`;
      kind = "player";
    }

    stickers.push({
      id: `${team.code}${pos}`,
      code: `${team.code}${pos}`,
      label,
      kind,
      order: pos,
      countryCode: team.code,
      countryName: team.namePtBr,
      countryFlag: team.flag,
      groupId,
      sectionId: team.code,
    });
  }

  return stickers;
}

export const albumGroups: GroupSection[] = GROUPS.map((group) => ({
  id: group.id,
  name: `Grupo ${group.id}`,
  countries: group.teams.map((team) => ({
    code: team.code,
    namePtBr: team.namePtBr,
    flag: team.flag,
    groupId: group.id,
    stickers: createTeamStickers(team, group.id),
  })),
}));

// Seção Coca-Cola (CC) — craques, sem escudo/time.
const cocaRoster = roster.CC ?? {};
export const cocaColaSection: StickerDefinition[] = Object.keys(cocaRoster)
  .map(Number)
  .sort((a, b) => a - b)
  .map((pos) => ({
    id: `CC${pos}`,
    code: `CC${pos}`,
    label: cocaRoster[pos],
    kind: "coca",
    order: pos,
    groupId: "COCA",
    sectionId: "COCA",
  }));

// Figurinhas históricas (FWC) — formato horizontal, exibidas após a Coca-Cola.
// Os rótulos abaixo são provisórios; serão substituídos pelos nomes oficiais.
const FWC_COUNT = 19;

export const fwcSection: StickerDefinition[] = Array.from({ length: FWC_COUNT }, (_, index) => ({
  id: `FWC${index + 1}`,
  code: `FWC${index + 1}`,
  label: `Histórica ${index + 1}`,
  kind: "fwc",
  order: index + 1,
  groupId: "FWC",
  sectionId: "FWC",
}));

export const allStickers = [
  ...albumGroups.flatMap((group) => group.countries.flatMap((country) => country.stickers)),
  ...cocaColaSection,
  ...fwcSection,
];
