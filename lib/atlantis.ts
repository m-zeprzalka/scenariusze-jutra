/**
 * ATLANTIS - Profil Państwa dla Analizy Geopolitycznej MSZ
 *
 * Wyimaginowane państwo członkowskie UE i NATO
 * używane do testowania narzędzia prognozowania scenariuszy
 */

export const ATLANTIS_PROFILE = {
  name: "Atlantis",
  population: 28_000_000,

  geography: {
    location: "Europa Środkowo-Wschodnia",
    sea_access: "Morze Bałtyckie",
    rivers: "Kilka dużych żeglownych rzek",
    water_resources: "Ograniczone zasoby wody pitnej",
    climate: "Umiarkowany",
  },

  economy: {
    gdp_rank_global: 25,
    currency: "Własna waluta (nie Euro)",
    strengths: [
      "Przemysł ciężki",
      "Przemysł motoryzacyjny",
      "Przemysł spożywczy",
      "Przemysł chemiczny",
      "Sektor ICT",
      "Ambicje w OZE (energia odnawialna)",
      "Przetwarzanie surowców krytycznych",
      "Infrastruktura AI (big data centers, giga fabryki AI, komputery kwantowe)",
    ],
    fiscal: {
      budget_deficit: "Poziom średniej unijnej",
      public_debt: "Poziom średniej unijnej",
    },
  },

  military: {
    type: "Armia zawodowa",
    active_personnel: 150_000,
    alliances: ["NATO", "EU"],
  },

  society: {
    digitalization: "Powyżej średniej europejskiej",
    democracy: "Demokracja parlamentarna od 130 lat",
    historical_milestones: {
      economic_stagnation_periods: ["1930-1950", "1980-1990"],
      eu_nato_membership: 1997,
    },
  },

  international_relations: {
    key_bilateral_partners: [
      "Niemcy",
      "Francja",
      "Finlandia",
      "Ukraina",
      "USA",
      "Japonia",
    ],
    top_5_trade_partners: ["Niemcy", "Francja", "Włochy", "Holandia", "Belgia"],
  },

  threats: {
    political: [
      "Niestabilność w UE",
      "Rozpad UE na grupy 'różnych prędkości'",
      "Negatywne kampanie wizerunkowe ze strony państw obcych wymierzone przeciw rządowi i społeczeństwu",
    ],
    economic: [
      "Zakłócenia w dostawach paliw węglowodorowych (USA, Skandynawia, Zatoka Perska)",
      "Problemy transportowe (np. ataki Hutich na gazowce na Morzu Czerwonym)",
      "Spowolnienie sektora ICT z powodu embarga na wysokozaawansowane procesory",
      "Zalewanie rynku tanimi samochodami elektrycznymi z Azji Wschodniej",
    ],
    military: [
      "Zagrożenie atakiem zbrojnym ze strony jednego z sąsiadów",
      "Trwające ataki hybrydowe (min. od wielu lat)",
      "Ataki na infrastrukturę krytyczną",
      "Zagrożenia w cyberprzestrzeni",
    ],
  },

  strategic_interests: [
    "Bezpieczeństwo energetyczne",
    "Rozwój sektora ICT i AI",
    "Stabilność w Unii Europejskiej",
    "Współpraca z NATO",
    "Relacje z Ukrainą (bezpieczeństwo wschodniej granicy)",
    "Dostęp do surowców krytycznych",
    "Konkurencyjność przemysłu motoryzacyjnego",
    "Odporność na ataki hybrydowe",
  ],
} as const

/**
 * PARAMETRY GLOBALNE - Sytuacja Międzynarodowa
 *
 * 6 kluczowych czynników wpływających na interesy Atlantis
 * Wagi określone przez MSZ dla celów analizy
 */
export const GLOBAL_PARAMETERS = {
  a_gpu_disaster: {
    id: "a",
    label: "Katastrofa u producenta GPU",
    description:
      "Wiodący światowy producent procesorów graficznych stracił 60% zdolności produkcyjnych w wyniku katastrofy naturalnej sprzed miesiąca. Odbudowa mocy produkcyjnych poprzez inwestycje w filie na innych obszarach potrwa do końca roku 2028.",
    weight: 30,
    default_intensity: 60, // 60% utraconych zdolności
    impact_areas: ["ICT", "AI Infrastructure", "Critical Materials"],
    timeline: "Odbudowa do końca 2028",
  },

  b_auto_industry: {
    id: "b",
    label: "Kryzys przemysłu motoryzacyjnego EU",
    description:
      "Przemysł motoryzacyjny w Europie (główni partnerzy handlowi Atlantis) bardzo wolno przestawia się na produkcję samochodów elektrycznych. Rynek europejski zalewają tanie samochody elektryczne z Azji Wschodniej. Europejski przemysł motoryzacyjny będzie miał w 2025 roku zyski na poziomie 30% średnich rocznych zysków z lat 2020-2024.",
    weight: 15,
    default_intensity: 70, // Spadek zysków o 70%
    impact_areas: ["Automotive Industry", "Trade with EU", "Manufacturing"],
    timeline: "2025 i dalsze lata",
  },

  c_eurozone_gdp: {
    id: "c",
    label: "Spadek PKB strefy euro",
    description:
      "PKB krajów strefy euro w roku 2025 spadnie średnio o 1,5% w stosunku do roku 2024.",
    weight: 15,
    default_intensity: 1.5, // Spadek o 1.5%
    impact_areas: ["Trade", "Exports", "Economic Growth"],
    timeline: "2025",
  },

  d_ukraine_ceasefire: {
    id: "d",
    label: "Słaby rozejm na Ukrainie",
    description:
      "Na wschodzie Ukrainy trwa słaby rozejm. Rosja kontroluje dwie główne elektrownie ukraińskie, które pracują na potrzeby konsumentów rosyjskich. Gospodarka ukraińska rozwija się w tempie 4% PKB, głównie dzięki inwestycjom w przemysł zbrojeniowy i odbudowę infrastruktury.",
    weight: 10,
    default_intensity: 50, // Słaby rozejm (50% stabilności)
    impact_areas: ["Eastern Security", "Ukraine Relations", "Energy"],
    timeline: "Obecnie i najbliższe lata",
  },

  e_ukraine_investments: {
    id: "e",
    label: "Inwestycje USA/UE w Ukrainie",
    description:
      "Inwestycje amerykańskie w Ukrainie kierowane są do przemysłu wydobywczego (surowce krytyczne). Roczne inwestycje UE w Ukrainie są na poziomie 3% ukraińskiego PKB i utrzymają się na takim poziomie do roku 2029.",
    weight: 5,
    default_intensity: 3, // 3% PKB Ukrainy
    impact_areas: ["Critical Materials", "Ukraine Relations", "Supply Chains"],
    timeline: "Do 2029",
  },

  f_oil_renewables: {
    id: "f",
    label: "OZE + spadek cen ropy",
    description:
      "Gwałtowny wzrost udziału energii z OZE w miksie energetycznym krajów UE oraz Chin od początku roku 2028. W połowie 2023 roku średniej wielkości kraj południowoamerykański odkrył ogromne złoża ropy i gazu (wielkość złóż Arabii Saudyjskiej i Kataru), co przełoży się pod koniec 2027 na nadpodaż paliw na światowe rynki. Wzrost OZE + nadpodaż przekładają się na znaczny spadek cen ropy: 30-35 USD/baryłka. Wpływ na budżet Rosji i innych producentów.",
    weight: 25,
    default_intensity: 75, // Wysoka intensywność zmian
    impact_areas: [
      "Energy Security",
      "Oil Prices",
      "Relations with Russia",
      "Renewables",
    ],
    timeline: "Od 2027-2028",
  },
} as const

/**
 * Helper: Get total weight of all parameters
 */
export function getTotalWeight(): number {
  return Object.values(GLOBAL_PARAMETERS).reduce(
    (sum, param) => sum + param.weight,
    0
  )
}

/**
 * Helper: Validate weights sum to 100
 */
export function validateWeights(): boolean {
  return getTotalWeight() === 100
}

/**
 * TypeScript types for parameter state
 */
export interface AtlantisParams {
  a_gpu_disaster: number
  b_auto_industry: number
  c_eurozone_gdp: number
  d_ukraine_ceasefire: number
  e_ukraine_investments: number
  f_oil_renewables: number
  timeframe: "12" | "36"
}

/**
 * Default parameter values
 */
export const DEFAULT_ATLANTIS_PARAMS: AtlantisParams = {
  a_gpu_disaster: GLOBAL_PARAMETERS.a_gpu_disaster.default_intensity,
  b_auto_industry: GLOBAL_PARAMETERS.b_auto_industry.default_intensity,
  c_eurozone_gdp: GLOBAL_PARAMETERS.c_eurozone_gdp.default_intensity,
  d_ukraine_ceasefire: GLOBAL_PARAMETERS.d_ukraine_ceasefire.default_intensity,
  e_ukraine_investments:
    GLOBAL_PARAMETERS.e_ukraine_investments.default_intensity,
  f_oil_renewables: GLOBAL_PARAMETERS.f_oil_renewables.default_intensity,
  timeframe: "12",
}

/**
 * Generate formatted context for LLM prompt
 */
export function formatAtlantisContext(params: AtlantisParams): string {
  return `
PROFIL PAŃSTWA ATLANTIS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PODSTAWOWE DANE:
• Nazwa: ${ATLANTIS_PROFILE.name}
• Populacja: ${(ATLANTIS_PROFILE.population / 1_000_000).toFixed(
    0
  )} mln ludności
• Lokalizacja: ${ATLANTIS_PROFILE.geography.location}
• Dostęp do morza: ${ATLANTIS_PROFILE.geography.sea_access}
• Klimat: ${ATLANTIS_PROFILE.geography.climate}
• Zasoby wodne: ${ATLANTIS_PROFILE.geography.water_resources}

GOSPODARKA:
• Ranking PKB: ${ATLANTIS_PROFILE.economy.gdp_rank_global}. gospodarka świata
• Waluta: ${ATLANTIS_PROFILE.economy.currency}
• Główne sektory: ${ATLANTIS_PROFILE.economy.strengths.join(", ")}
• Deficyt budżetowy: ${ATLANTIS_PROFILE.economy.fiscal.budget_deficit}
• Dług publiczny: ${ATLANTIS_PROFILE.economy.fiscal.public_debt}

BEZPIECZEŃSTWO:
• Armia: ${ATLANTIS_PROFILE.military.active_personnel.toLocaleString()} zawodowych żołnierzy
• Członkostwo: ${ATLANTIS_PROFILE.military.alliances.join(", ")} od ${
    ATLANTIS_PROFILE.society.historical_milestones.eu_nato_membership
  } roku

KLUCZOWI PARTNERZY:
${ATLANTIS_PROFILE.international_relations.key_bilateral_partners
  .map((p) => `• ${p}`)
  .join("\n")}

GŁÓWNI PARTNERZY HANDLOWI (Top 5):
${ATLANTIS_PROFILE.international_relations.top_5_trade_partners
  .map((p, i) => `${i + 1}. ${p}`)
  .join("\n")}

STRATEGICZNE INTERESY ATLANTIS:
${ATLANTIS_PROFILE.strategic_interests.map((i) => `• ${i}`).join("\n")}

ZAGROŻENIA:
Polityczne:
${ATLANTIS_PROFILE.threats.political.map((t) => `  - ${t}`).join("\n")}

Ekonomiczne:
${ATLANTIS_PROFILE.threats.economic.map((t) => `  - ${t}`).join("\n")}

Militarne:
${ATLANTIS_PROFILE.threats.military.map((t) => `  - ${t}`).join("\n")}


AKTUALNA SYTUACJA MIĘDZYNARODOWA (Parametry Globalne):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A) ${GLOBAL_PARAMETERS.a_gpu_disaster.label.toUpperCase()} [WAGA: ${
    GLOBAL_PARAMETERS.a_gpu_disaster.weight
  }]
   ${GLOBAL_PARAMETERS.a_gpu_disaster.description}
   Intensywność: ${params.a_gpu_disaster}%
   Wpływ na: ${GLOBAL_PARAMETERS.a_gpu_disaster.impact_areas.join(", ")}

B) ${GLOBAL_PARAMETERS.b_auto_industry.label.toUpperCase()} [WAGA: ${
    GLOBAL_PARAMETERS.b_auto_industry.weight
  }]
   ${GLOBAL_PARAMETERS.b_auto_industry.description}
   Intensywność: ${params.b_auto_industry}%
   Wpływ na: ${GLOBAL_PARAMETERS.b_auto_industry.impact_areas.join(", ")}

C) ${GLOBAL_PARAMETERS.c_eurozone_gdp.label.toUpperCase()} [WAGA: ${
    GLOBAL_PARAMETERS.c_eurozone_gdp.weight
  }]
   ${GLOBAL_PARAMETERS.c_eurozone_gdp.description}
   Intensywność: ${params.c_eurozone_gdp}%
   Wpływ na: ${GLOBAL_PARAMETERS.c_eurozone_gdp.impact_areas.join(", ")}

D) ${GLOBAL_PARAMETERS.d_ukraine_ceasefire.label.toUpperCase()} [WAGA: ${
    GLOBAL_PARAMETERS.d_ukraine_ceasefire.weight
  }]
   ${GLOBAL_PARAMETERS.d_ukraine_ceasefire.description}
   Intensywność: ${params.d_ukraine_ceasefire}%
   Wpływ na: ${GLOBAL_PARAMETERS.d_ukraine_ceasefire.impact_areas.join(", ")}

E) ${GLOBAL_PARAMETERS.e_ukraine_investments.label.toUpperCase()} [WAGA: ${
    GLOBAL_PARAMETERS.e_ukraine_investments.weight
  }]
   ${GLOBAL_PARAMETERS.e_ukraine_investments.description}
   Intensywność: ${params.e_ukraine_investments}%
   Wpływ na: ${GLOBAL_PARAMETERS.e_ukraine_investments.impact_areas.join(", ")}

F) ${GLOBAL_PARAMETERS.f_oil_renewables.label.toUpperCase()} [WAGA: ${
    GLOBAL_PARAMETERS.f_oil_renewables.weight
  }]
   ${GLOBAL_PARAMETERS.f_oil_renewables.description}
   Intensywność: ${params.f_oil_renewables}%
   Wpływ na: ${GLOBAL_PARAMETERS.f_oil_renewables.impact_areas.join(", ")}

PERSPEKTYWA CZASOWA: ${params.timeframe} miesięcy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`
}
