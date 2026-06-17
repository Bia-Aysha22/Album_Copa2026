export type StickerStatus = "unset" | "owned" | "missing";

export type StickerKind = "badge" | "player" | "team-photo" | "coca";

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

type CountrySeed = {
  code: string;
  namePtBr: string;
  flag: string;
};

type GroupSeed = {
  id: string;
  countries: CountrySeed[];
};

const TEAM_SLOT_LABELS = [
  "Escudo",
  "Jogador 1",
  "Jogador 2",
  "Jogador 3",
  "Jogador 4",
  "Jogador 5",
  "Jogador 6",
  "Jogador 7",
  "Jogador 8",
  "Jogador 9",
  "Jogador 10",
  "Jogador 11",
  "Foto do time",
  "Jogador 12",
  "Jogador 13",
  "Jogador 14",
  "Jogador 15",
  "Jogador 16",
  "Jogador 17",
  "Jogador 18",
] as const;

const GROUP_SEEDS: GroupSeed[] = [
  {
    id: "A",
    countries: [
      { code: "MEX", namePtBr: "México", flag: "🇲🇽" },
      { code: "RSA", namePtBr: "África do Sul", flag: "🇿🇦" },
      { code: "KOR", namePtBr: "República da Coreia", flag: "🇰🇷" },
      { code: "CZE", namePtBr: "Tchéquia", flag: "🇨🇿" },
    ],
  },
  {
    id: "B",
    countries: [
      { code: "CAN", namePtBr: "Canadá", flag: "🇨🇦" },
      { code: "BIH", namePtBr: "Bósnia e Herzegovina", flag: "🇧🇦" },
      { code: "QAT", namePtBr: "Catar", flag: "🇶🇦" },
      { code: "SUI", namePtBr: "Suíça", flag: "🇨🇭" },
    ],
  },
  {
    id: "C",
    countries: [
      { code: "BRA", namePtBr: "Brasil", flag: "🇧🇷" },
      { code: "MAR", namePtBr: "Marrocos", flag: "🇲🇦" },
      { code: "HAI", namePtBr: "Haiti", flag: "🇭🇹" },
      { code: "SCO", namePtBr: "Escócia", flag: "🏴" },
    ],
  },
  {
    id: "D",
    countries: [
      { code: "USA", namePtBr: "Estados Unidos", flag: "🇺🇸" },
      { code: "PAR", namePtBr: "Paraguai", flag: "🇵🇾" },
      { code: "AUS", namePtBr: "Austrália", flag: "🇦🇺" },
      { code: "TUR", namePtBr: "Turquia", flag: "🇹🇷" },
    ],
  },
  {
    id: "E",
    countries: [
      { code: "GER", namePtBr: "Alemanha", flag: "🇩🇪" },
      { code: "CUW", namePtBr: "Curaçau", flag: "🇨🇼" },
      { code: "CIV", namePtBr: "Costa do Marfim", flag: "🇨🇮" },
      { code: "ECU", namePtBr: "Equador", flag: "🇪🇨" },
    ],
  },
  {
    id: "F",
    countries: [
      { code: "NED", namePtBr: "Países Baixos", flag: "🇳🇱" },
      { code: "JPN", namePtBr: "Japão", flag: "🇯🇵" },
      { code: "SWE", namePtBr: "Suécia", flag: "🇸🇪" },
      { code: "TUN", namePtBr: "Tunísia", flag: "🇹🇳" },
    ],
  },
  {
    id: "G",
    countries: [
      { code: "BEL", namePtBr: "Bélgica", flag: "🇧🇪" },
      { code: "EGY", namePtBr: "Egito", flag: "🇪🇬" },
      { code: "IRN", namePtBr: "Irã", flag: "🇮🇷" },
      { code: "NZL", namePtBr: "Nova Zelândia", flag: "🇳🇿" },
    ],
  },
  {
    id: "H",
    countries: [
      { code: "ESP", namePtBr: "Espanha", flag: "🇪🇸" },
      { code: "CPV", namePtBr: "Cabo Verde", flag: "🇨🇻" },
      { code: "KSA", namePtBr: "Arábia Saudita", flag: "🇸🇦" },
      { code: "URU", namePtBr: "Uruguai", flag: "🇺🇾" },
    ],
  },
  {
    id: "I",
    countries: [
      { code: "FRA", namePtBr: "França", flag: "🇫🇷" },
      { code: "SEN", namePtBr: "Senegal", flag: "🇸🇳" },
      { code: "IRQ", namePtBr: "Iraque", flag: "🇮🇶" },
      { code: "NOR", namePtBr: "Noruega", flag: "🇳🇴" },
    ],
  },
  {
    id: "J",
    countries: [
      { code: "ARG", namePtBr: "Argentina", flag: "🇦🇷" },
      { code: "ALG", namePtBr: "Argélia", flag: "🇩🇿" },
      { code: "AUT", namePtBr: "Áustria", flag: "🇦🇹" },
      { code: "JOR", namePtBr: "Jordânia", flag: "🇯🇴" },
    ],
  },
  {
    id: "K",
    countries: [
      { code: "POR", namePtBr: "Portugal", flag: "🇵🇹" },
      { code: "COD", namePtBr: "República Democrática do Congo", flag: "🇨🇩" },
      { code: "UZB", namePtBr: "Uzbequistão", flag: "🇺🇿" },
      { code: "COL", namePtBr: "Colômbia", flag: "🇨🇴" },
    ],
  },
  {
    id: "L",
    countries: [
      { code: "ENG", namePtBr: "Inglaterra", flag: "🏴" },
      { code: "CRO", namePtBr: "Croácia", flag: "🇭🇷" },
      { code: "GHA", namePtBr: "Gana", flag: "🇬🇭" },
      { code: "PAN", namePtBr: "Panamá", flag: "🇵🇦" },
    ],
  },
];

const COCA_COLA_PLAYERS = [
  { code: "COCA1", player: "Alphonso Davies", countryName: "Canadá", countryFlag: "🇨🇦" },
  { code: "COCA2", player: "Emiliano Martínez", countryName: "Argentina", countryFlag: "🇦🇷" },
  { code: "COCA3", player: "Enner Valencia", countryName: "Equador", countryFlag: "🇪🇨" },
  { code: "COCA4", player: "Federico Valverde", countryName: "Uruguai", countryFlag: "🇺🇾" },
  { code: "COCA5", player: "Gabriel Magalhães", countryName: "Brasil", countryFlag: "🇧🇷" },
  { code: "COCA6", player: "Harry Kane", countryName: "Inglaterra", countryFlag: "🏴" },
  { code: "COCA7", player: "Jefferson Lerma", countryName: "Colômbia", countryFlag: "🇨🇴" },
  { code: "COCA8", player: "Joshua Kimmich", countryName: "Alemanha", countryFlag: "🇩🇪" },
  { code: "COCA9", player: "Josko Gvardiol", countryName: "Croácia", countryFlag: "🇭🇷" },
  { code: "COCA10", player: "Lamine Yamal", countryName: "Espanha", countryFlag: "🇪🇸" },
  { code: "COCA11", player: "Lautaro Martínez", countryName: "Argentina", countryFlag: "🇦🇷" },
  { code: "COCA12", player: "Raúl Jiménez", countryName: "México", countryFlag: "🇲🇽" },
  { code: "COCA13", player: "Santiago Giménez", countryName: "México", countryFlag: "🇲🇽" },
  { code: "COCA14", player: "Virgil van Dijk", countryName: "Países Baixos", countryFlag: "🇳🇱" },
] as const;

function createTeamStickers(country: CountrySeed, groupId: string): StickerDefinition[] {
  return TEAM_SLOT_LABELS.map((label, index) => ({
    id: `${country.code}${index + 1}`,
    code: `${country.code}${index + 1}`,
    label,
    kind: index === 0 ? "badge" : index === 12 ? "team-photo" : "player",
    order: index + 1,
    countryCode: country.code,
    countryName: country.namePtBr,
    countryFlag: country.flag,
    groupId,
    sectionId: country.code,
  }));
}

export const albumGroups: GroupSection[] = GROUP_SEEDS.map((group) => ({
  id: group.id,
  name: `Grupo ${group.id}`,
  countries: group.countries.map((country) => ({
    ...country,
    groupId: group.id,
    stickers: createTeamStickers(country, group.id),
  })),
}));

export const cocaColaSection: StickerDefinition[] = COCA_COLA_PLAYERS.map((item, index) => ({
  id: item.code,
  code: item.code,
  label: item.player,
  kind: "coca",
  order: index + 1,
  countryName: item.countryName,
  countryFlag: item.countryFlag,
  groupId: "COCA",
  sectionId: "COCA",
}));

export const allStickers = [
  ...albumGroups.flatMap((group) => group.countries.flatMap((country) => country.stickers)),
  ...cocaColaSection,
];
