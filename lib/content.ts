/**
 * HACKATHON CONTENT CONFIGURATION
 *
 * Edytuj te wartości w dniu hackathonu, aby dostosować aplikację do wybranego zadania.
 * Wszystkie placeholdery zaczynają się od "[" i kończą na "]" - łatwo je znaleźć przez Ctrl+F
 */

export const CONTENT = {
  // ========================================
  // PROJEKT - Podstawowe informacje
  // ========================================
  project: {
    name: "Scenariusze Jutra",
    tagline: "Przewidywanie przyszłości geopolitycznej z AI",
    description:
      "Świat zmienia się szybciej, niż potrafimy go analizować. Dzięki nowoczesnym technologiom możemy nie tylko obserwować rzeczywistość, ale też przewidywać jej przyszłe scenariusze.",
    hackathon: "HackNation 2025",
    team: "Michał Zeprzałka",
  },

  // ========================================
  // HERO SECTION - Główny nagłówek
  // ========================================
  hero: {
    title: "Przewiduj Przyszłość Świata",
    subtitle:
      "Analiza geopolityczna przygotowana przez model AI na bazie aktualnych informacji ze świata",

    ctaPrimary: "Uruchom Mapę",
    ctaSecondary: "Zobacz Dokumentację",
  },

  // ========================================
  // PROBLEMS - 3 główne problemy
  // ========================================
  problems: [
    {
      title: "Chaos informacyjny",
      description:
        "Tysiące newsów dziennie z każdego zakątka świata - niemożliwe do przeanalizowania ręcznie przez analityków",
    },
    {
      title: "Brak przewidywalności",
      description:
        "Trudno ocenić jak sytuacja w kraju rozwinie się w najbliższych miesiącach bez kompleksowej analizy",
    },
    {
      title: "Fragmentaryczna wiedza",
      description:
        "Brak holistycznego spojrzenia na sytuację geopolityczną - informacje rozproszone w wielu źródłach",
    },
  ],

  // ========================================
  // SOLUTION - Bento Grid (4 główne funkcje)
  // ========================================
  features: [
    {
      title: "Interaktywna Mapa Świata",
      description:
        "Kliknij w dowolny kraj na mapie aby rozpocząć analizę geopolityczną w czasie rzeczywistym",
      span: "col-span-2", // Większy kafelek
    },
    {
      title: "AI-Powered Scenariusze",
      description:
        "3 scenariusze przyszłości: pozytywny, neutralny i negatywny z oceną prawdopodobieństwa",
      span: "col-span-1",
    },
    {
      title: "Real-time News Analysis",
      description:
        "Automatyczna analiza aktualnych newsów z ostatnich 7 dni dla każdego kraju",
      span: "col-span-1",
    },
    {
      title: "Kontekst Geopolityczny",
      description:
        "Szczegółowe wyjaśnienie przyczyn, trendów i kluczowych czynników wpływających na przyszłość",
      span: "col-span-2",
    },
  ],

  // ========================================
  // IMPACT METRICS - Liczby pokazujące wartość
  // ========================================
  metrics: [
    {
      value: "195",
      label: "Krajów dostępnych do analizy",
      trend: "Pełne pokrycie",
    },
    {
      value: "3",
      label: "Scenariusze na kraj",
      trend: "Multi-perspektywa",
    },
    {
      value: "<30s",
      label: "Średni czas generacji analizy",
      trend: "Błyskawiczne wyniki",
    },
  ],

  // ========================================
  // TECH STACK - Użyte technologie
  // ========================================
  tech: [
    "Next.js 15",
    "TypeScript",
    "Tailwind CSS",
    "Shadcn/UI",
    "OpenAI GPT-4",
    "React Simple Maps",
    "Vercel AI SDK",
    "Framer Motion",
  ],

  // ========================================
  // DASHBOARD - Mock data dla KPI cards
  // ========================================
  dashboard: {
    stats: [
      {
        title: "Analiz wygenerowanych",
        value: "2,847",
        unit: "krajów",
        trend: "+24%",
        trendUp: true,
      },
      {
        title: "Średni czas analizy",
        value: "24",
        unit: "sekundy",
        trend: "-12%",
        trendUp: true,
      },
      {
        title: "Dokładność prognoz",
        value: "89.3",
        unit: "%",
        trend: "+5%",
        trendUp: true,
      },
      {
        title: "Dostępność systemu",
        value: "99.9",
        unit: "%",
        trend: "100%",
        trendUp: true,
      },
    ],
  },
}

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Sprawdza, czy wszystkie placeholdery zostały wypełnione
 */
export function checkPlaceholders(): string[] {
  const json = JSON.stringify(CONTENT)
  const matches = json.match(/\[.*?\]/g)
  return matches || []
}

/**
 * Zwraca liczbę niewypełnionych placeholderów
 */
export function getPlaceholderCount(): number {
  return checkPlaceholders().length
}
