import { NextRequest, NextResponse } from "next/server"
import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { generateText } from "ai"
import { z } from "zod"
import { formatAtlantisContext, type AtlantisParams } from "@/lib/atlantis"

// MINIMALISTYCZNY SCHEMA dla MVP - tylko essentials
const ScenarioSchema = z.object({
  scenarios: z
    .array(
      z.object({
        type: z.enum(["positive", "negative"]),
        timeframe: z.enum(["12", "36"]),
        title: z.string(),
        description: z.string(),
        probability: z.string(),
        impact_on_atlantis: z.object({
          economy: z.number().min(-10).max(10),
          security: z.number().min(-10).max(10),
          energy: z.number().min(-10).max(10),
          technology: z.number().min(-10).max(10),
        }),
        keyFactors: z.array(z.string()).min(2).max(4),
        reasoning: z.array(z.string()).default([]), // Tylko stringi dla prostoty
      })
    )
    .length(4),
  context: z.object({
    currentSituation: z.string(),
    geopoliticalFactors: z.array(z.string()).min(2).max(4),
    recentNews: z.array(z.string()).min(2).max(4),
  }),
  sources: z.array(z.any()).default([]), // Opcjonalne, dowolny format
  reasoning_summary: z.string().default("Analiza dla Atlantis"),
  recommendations: z
    .object({
      avoid_negative: z.array(z.string()).min(2).max(4),
      achieve_positive: z.array(z.string()).min(2).max(4),
      priority_actions: z
        .array(
          z.object({
            action: z.string(),
            timeframe: z.string(),
            impact: z.enum(["high", "medium", "low"]),
          })
        )
        .min(1)
        .max(7)
        .describe("Priorytetowe działania dla Atlantis z timeframe"),
    })
    .describe("Rekomendacje strategiczne dla MSZ Atlantis"),
})

export async function POST(req: NextRequest) {
  try {
    const { country, atlantisParams } = await req.json()

    if (!country) {
      return NextResponse.json(
        { error: "Country name is required" },
        { status: 400 }
      )
    }

    if (!atlantisParams) {
      return NextResponse.json(
        { error: "Atlantis parameters are required" },
        { status: 400 }
      )
    }

    // Sprawdź API key
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      )
    }

    // Initialize OpenRouter provider
    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
    })

    // Generuj scenariusze przez DeepSeek Chat (szybki model)
    const { text } = await generateText({
      model: openrouter("deepseek/deepseek-chat"),
      messages: [
        {
          role: "system",
          content: `Jesteś analitykiem MSZ państwa ATLANTIS. Analizujesz TYLKO wpływ na interesy Atlantis.

Oceniaj wpływ w 4 obszarach (skala -10 do +10):
- Economy: gospodarka (ICT, przemysł, handel)
- Security: bezpieczeństwo (NATO, zagrożenia)
- Energy: bezpieczeństwo energetyczne
- Technology: sektor tech (AI, procesory)

ZAWSZE zwracaj TYLKO czysty JSON bez markdown.`,
        },
        {
          role: "user",
          content: `Wpływ ${country} na Atlantis (państwo bałtyckie, NATO/UE, 28M).

JSON z 4 scenariuszami (po polsku, KRÓTKO!):
[
  {"type":"positive","timeframe":"12","title":"...","description":"max 2 zdania","probability":"60%","impact_on_atlantis":{"economy":5,"security":3,"energy":2,"technology":4},"keyFactors":["czynnik1","czynnik2"],"reasoning":[]},
  {"type":"negative","timeframe":"12","title":"...","description":"max 2 zdania","probability":"40%","impact_on_atlantis":{"economy":-3,"security":-2,"energy":0,"technology":-1},"keyFactors":["czynnik1","czynnik2"],"reasoning":[]},
  {"type":"positive","timeframe":"36","title":"...","description":"max 2 zdania","probability":"50%","impact_on_atlantis":{"economy":6,"security":4,"energy":3,"technology":5},"keyFactors":["czynnik1","czynnik2"],"reasoning":[]},
  {"type":"negative","timeframe":"36","title":"...","description":"max 2 zdania","probability":"50%","impact_on_atlantis":{"economy":-4,"security":-3,"energy":-2,"technology":-2},"keyFactors":["czynnik1","czynnik2"],"reasoning":[]}
]

Odpowiedź: {"scenarios":[...4 powyższe...], "context":{"currentSituation":"1 zdanie","geopoliticalFactors":["f1","f2"],"recentNews":["n1","n2"]}, "sources":[], "reasoning_summary":"krótko", "recommendations":{"avoid_negative":["r1","r2"],"achieve_positive":["r1","r2"],"priority_actions":[{"action":"a1","timeframe":"Q1","impact":"high"}]}}`,
        },
      ],
      temperature: 0.5,
    })

    // Parse JSON response (usuń markdown jeśli model zwróci)
    let cleanedText = text.trim()
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText
        .replace(/^```json\n?/, "")
        .replace(/\n?```$/, "")
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```\n?/, "").replace(/\n?```$/, "")
    }

    console.log(
      "🔍 Raw LLM output (first 500 chars):",
      cleanedText.substring(0, 500)
    )

    let parsedResponse = JSON.parse(cleanedText)
    console.log(
      "📦 Parsed response type:",
      typeof parsedResponse,
      "Is array:",
      Array.isArray(parsedResponse)
    )

    // Fallback: jeśli model zwrócił tylko tablicę scenariuszy, owinięcie w obiekt
    if (Array.isArray(parsedResponse)) {
      console.log("⚠️ Model zwrócił tablicę zamiast obiektu - tworzę otoczkę")
      parsedResponse = {
        scenarios: parsedResponse,
        context: {
          currentSituation: `Analiza wpływu ${country} na Atlantis`,
          geopoliticalFactors: ["Brak szczegółów"],
          recentNews: ["Brak szczegółów"],
        },
        sources: [],
        reasoning_summary: "Model nie zwrócił pełnej struktury",
        recommendations: {
          avoid_negative: ["Skonsultuj z ekspertami MSZ"],
          achieve_positive: ["Pogłęb analizę"],
          priority_actions: [
            {
              action: "Dodatkowa analiza wymagana",
              timeframe: "natychmiast",
              impact: "high",
            },
          ],
        },
      }
    }

    // Walidacja Zod
    const validatedData = ScenarioSchema.parse(parsedResponse)

    return NextResponse.json(validatedData)
  } catch (error: any) {
    console.error("Error generating scenarios:", error)

    // Lepszy error handling
    if (error?.message?.includes("API key")) {
      return NextResponse.json(
        { error: "Invalid OpenRouter API key configuration" },
        { status: 500 }
      )
    }

    if (error?.name === "ZodError") {
      return NextResponse.json(
        {
          error: "Schema validation failed",
          details: error.errors,
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        error: "Failed to generate scenarios",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    )
  }
}
