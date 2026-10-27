# Vision: Smart Document Converter & EPUB Builder

**Pipeline stage:** 2 — Vision
**Date:** 2026-10-27
**Source:** `docs/01-research.md` (stage 1)

---

## What it is

An on-device EPUB builder for iOS. It turns the documents people already have — DOCX, TXT, Markdown, HTML (PDF gated on quality) — into *clean, reflowable EPUB ebooks*: chapter detection, generated table of contents, typography cleanup, TTS-friendly semantic structure. Files never leave the phone. The loop ends with one tap: the finished book opens in Apple Books.

This is not "another file converter." It is a reading-quality tool: Calibre's intent, phone-native, private by architecture.

## Who it's for

- **Primary — phone-first readers and writers:** students and researchers with lecture PDFs and long reports, and indie authors / self-publishers working from Word or Markdown manuscripts who need a valid EPUB *now*, with no computer at hand.
- **Strong secondary — accessibility users:** people with dyslexia, low vision, or blindness who depend on well-structured, TTS-ready ebooks. This community is explicitly underserved today; a real review of the incumbent calls it "a main form of entertainment" for them. Their needs (clean heading structure, logical reading order) are the same features that make the product better for everyone.

## Why now

- The iOS incumbent is 12 years old, converts on a cloud server, locks EPUB behind a paywall with no free test, and produces "gibberish" on complex PDFs — its own reviews enumerate all three failures.
- The desktop incumbent (Calibre) has no iOS app at all; the mobile workflow is broken for phone-only users.
- Demand tailwinds: self-published titles +38.7% YoY (2025), and Amazon's Send to Kindle formalized EPUB ingestion — EPUB is the accepted interchange format for reading.
- Utilities is the strongest monetization category per Adapty SOIS 2026 (highest 12-month trial LTV), and one-time purchases are quietly growing share.

## The wedge (one sentence)

**On-device, reading-quality EPUB builder — your files never leave your phone.**

## What success looks like

1. **Quality first (the make-or-break metric):** every shipped conversion produces EPUBCheck-valid output, and an internal corpus of real-world documents converts cleanly at a defined pass rate. If PDF reflow cannot clear the quality bar, PDF ships in v2 — shipping it badly is worse than not shipping it.
2. **Business:** launch at a one-time unlock ($14.99–$19.99) with an honest free tier (small/simple documents free). Target: 4.5★+ average, refund rate under 2%, and a sustainable niche-utility revenue line within 6 months of launch.
3. **Standing kill/pivot criteria (from research §8):** if clean on-device conversion of the test corpus proves infeasible within resource budgets, pivot to an EPUB finisher/editor rather than a converter. This is a niche utility run lean — it does not need to be a flagship to be a success.

## Explicit non-goals at v1

- No in-app reader (the handoff to Apple Books is the loop).
- No server-side conversion, no Amazon/Kindle integration, no DRM handling of any kind — strictly DRM-free in, DRM-free out.
- No Android.
