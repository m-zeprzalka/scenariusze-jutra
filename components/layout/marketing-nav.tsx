"use client"

import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Link from "next/link"
import { CONTENT } from "@/lib/content"
import { ThemeToggle } from "@/components/theme-toggle"

export function MarketingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {CONTENT.project.name.charAt(1) || "H"}
            </span>
          </div>
          <span className="font-bold text-lg hidden sm:inline">
            {CONTENT.project.name}
          </span>*/}
          <img
            src="/MSZ_logo.png"
            alt={CONTENT.project.name}
            className="h-14 object-contain"
          />
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard">Uruchom Mapę</Link>
          </Button>
          <ThemeToggle />

          <Button asChild variant="outline" size="sm">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </nav>
  )
}
