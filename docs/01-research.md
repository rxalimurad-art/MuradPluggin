# Research: Smart Document Converter & EPUB Builder (iOS)

**Pipeline stage:** 1 — Research
**Date:** 2026-10-27
**Input idea:** An iOS app that converts documents (PDF, DOCX, TXT, Markdown, HTML) into clean, reflowable EPUB ebooks, with reading-focused features (typography control, chapter detection, table-of-contents generation, TTS-friendly structure).

> Note: `docs/00-vision.md` does not exist. This document is the first and only research artifact; later stages should treat it as the source of truth for market context.

---

## 1. Problem statement (restated idea)

People accumulate documents that are miserable to read on a phone: fixed-layout PDFs designed "for the PC era," Word manuscripts, web-saved HTML, plain text. EPUB is the reflowable format every serious reading surface (Apple Books natively; Kindle via Amazon's conversion; Kobo; most third-party readers) accepts. Getting a *clean* EPUB out of an arbitrary document today requires either a desktop machine, a privacy-risky upload to a cloud converter, or a free tool with no quality control.

**Who has this problem, and how they cope today:**

- **Students** converting lecture PDFs and textbook excerpts so they can read them reflowed on iPhone instead of pinch-zooming. Wondershare's guide frames the exact motivation: PDF "is designed for the PC era," EPUB "allows content to reflow to fit the screen" ([pdf.wondershare.com](https://pdf.wondershare.com/mobile-app/convert-pdf-to-epub-on-iphone-ipad.html)).
- **Kindle ecosystem readers** who own EPUBs and must route them through Amazon's Send to Kindle, which converts server-side. Kindle devices do not open EPUB natively ([automateed.com](https://www.automateed.com/does-epub-work-on-kindle); [The Verge](https://www.theverge.com/23842102/kindle-amazon-import-files-epub)).
- **Accessibility users** (blind, low-vision, dyslexic) who need well-structured, TTS-friendly ebooks. A real App Store review of the leading converter names this explicitly: *"Those of us with eye issues, dyslexia or blindness are desperate… a main form of entertainment"* ([mwm.ai listing for The Ebook Converter](https://mwm.ai/apps/the-ebook-converter/890503038)).
- **Self-publishers and indie authors** producing EPUBs from Word/Markdown manuscripts for KDP, Draft2Digital, or direct sale. Output keeps growing: 3.5M self-published ISBN titles in 2025, up 38.7% YoY ([Best Writing, citing Bowker](https://bestwriting.com/self-publishing-statistics)); U.S. self-publishing market valued at $3.6B in 2025, projected to $5.7B by 2033 ([Grand View Research](https://www.grandviewresearch.com/industry-analysis/us-self-publishing-market-report)). (Assumption: most of this EPUB prep today happens on desktop — Calibre, Vellum, Scrivener — so mobile is under-served.)
- **Researchers / heavy readers** moving papers and long reports into e-readers for annotation and typography control. (Inference — no hard source; treat as secondary segment.)

**Cost of the workarounds:** desktop Calibre (free but no iOS app, dated UI, requires a computer — see §2); cloud converters (upload privacy concerns, subscription nags, inconsistent quality); Amazon Send to Kindle (opaque conversion, strips custom CSS, offers "no user control over reflow logic," and has file-size limits — 50 MB by email, 200 MB by web upload) ([lifetips.alibaba.com](https://lifetips.alibaba.com/tech-efficiency/how-to-convert-ebooks-to-work-with-your-kindle-for-free); [thebookspot.net citing Amazon's spec](https://thebookspot.net/blog/kindle-epub-sync-error/)).

---

## 2. Competition

### Direct iOS competitors

| App | Publisher / Category | Pricing model | Scale & rating | Known weak points (from recent user reviews) |
|---|---|---|---|---|
| **The Ebook Converter** | Float Tech, LLC / Utilities | Free + "Premium Pass" auto-renewable subscription | ~4.4★, 9.3–11K ratings, 250K+ downloads since 2014 | EPUB/MOBI locked behind paywall with no meaningful free test; "gibberish" output on complex PDFs; uploads files to a cloud server (privacy objection); refund complaints | 
| **PDF to Epub Converter** (various publishers) | e.g., zHoo / Utilities | Free, ad-supported | Low; niche | Requires internet; ad spam ("unrelated apps may be installed"); reviewers cite poor conversion quality | 
| **PDF Converter: Reader & Tools** / **PDF Converter and Editor** | Various / Utilities | Freemium (features paywalled) | Mid | Slow on large files; output formats paywalled; general-purpose, not reading-focused | 
| **Wondershare PDFelement for iOS** | Wondershare / Productivity | Subscription: $11.99/quarter or $79.99/yr (cross-platform tier $89.99) | Large (PDF brand) | EPUB is a side feature inside a PDF editor; subscription fatigue; not purpose-built for ebook structure/TOC/typography | 

Sources: [mwm.ai — The Ebook Converter](https://mwm.ai/apps/the-ebook-converter/890503038) (reviews, downloads, pricing structure); [Wondershare — 4 Best PDF to ePub Converters for iPhone/iPad](https://pdf.wondershare.com/mobile-app/convert-pdf-to-epub-on-iphone-ipad.html) (app-by-app pros/cons); [AI Productivity — PDFelement pricing](https://aiproductivity.ai/pricing/wondershare-pdfelement/).

**Takeaway from direct tier:** the category leader is 12 years old, has only ~250K downloads, converts on a *cloud server*, and its most-cited complaints are (1) paywall before you can test EPUB output, (2) garbled PDF conversions, (3) server-upload privacy. All three are addressable by a well-built native app.

### The incumbent workflow (indirect but dominant)

- **Calibre** — free, open-source, desktop-only; the undisputed conversion champion with deep customization ([howtoconvert.co](https://howtoconvert.co/blog/best-ebook-converter-apps)). 3M+ active installs per its official stats ([calibre-ebook.com/about](https://calibre-ebook.com/about/)). Weaknesses: no iOS app at all, cluttered/aging UI, requires a computer, and the workflow (transfer → convert → sideload) is multi-step. Adjacent iOS apps like Pageo sync a Calibre library to iOS rather than convert ([mwm.ai — Pageo](https://mwm.ai/apps/pageo-calibre-epub-reader/6759336810)) — confirming nobody has shipped Calibre-class conversion natively on iOS.
- **Amazon Send to Kindle** — free, zero install, accepts EPUB/PDF/DOCX and converts in the cloud; but opaque, strips CSS, no reflow control, size-capped ([The Verge](https://www.theverge.com/23842102/kindle-amazon-import-files-epub); [lifetips.alibaba.com](https://lifetips.alibaba.com/tech-efficiency/how-to-convert-ebooks-to-work-with-your-kindle-for-free)). Solves "get it onto my Kindle," not "make a clean ebook."
- **Online converters** (CloudConvert, Zamzar, onlineconverter.com, Convertio) — free tiers with size/file-count limits; upload privacy concerns; no quality control ([onlineconverter.com example](https://www.onlineconverter.com/iphone-ebook)).
- **Apple Pages** — preinstalled, free, exports to EPUB from iPhone ([Apple Support](https://support.apple.com/en-us/118122)). A real substitute for Pages/DOCX files, but users call it "pretty much an immutable Apple black box" with minimal control over structure/typography ([Apple Support Community](https://discussions.apple.com/thread/255471426)). Not marketed as a converter; doesn't handle PDF or Markdown.

### Adjacent / emerging

- **AI ebook makers** (e.g., Inkfluence AI eBook Maker, launched on iOS 2025, Productivity category) — generate ebooks from prompts, not convert user documents; validates willingness to pay for mobile ebook tooling ([Inkfluence](https://www.inkfluenceai.com/blog/inkfluence-ios-app-launch-2025); [mwm.ai — Inkfluence](https://mwm.ai/apps/inkfluence-ebook-maker/6756296159)).
- **TTS readers** (Speechify from ~$79/yr, Voice Dream Reader) — monetize the *listen-to-documents* job; they are destinations for the EPUBs our app would produce, more than substitutes ([Speechify blog](https://speechify.com/blog/best-text-speech-app-iphone/); [Tech Boosted on Speechify pricing](https://techboosted.co.uk/speechify-cost/)).
- **Reader apps** (Apple Books, Marvin 3, MapleRead, KyBook 3) — destinations, not competitors ([pdfgear.com](https://www.pdfgear.com/pdf-editor-reader/epub-reader-iphone.htm)).

**Competitive gap (evidence-based):** no iOS app today combines (a) on-device conversion (privacy), (b) reading-quality output (chapter/TOC detection, typography cleanup), and (c) a quality-first free tier. The existing leader's own reviews enumerate these gaps verbatim.

---

## 3. App Store category dynamics

### Category fit

The incumbents split between **Utilities** (The Ebook Converter) and **Productivity** (PDFelement, Inkfluence). For this app, Utilities or Productivity both work; category choice matters less for search ranking than title/subtitle keywords. **Recommendation: Utilities** (matches the problem-solving intent of the audience; aligns with the benchmark data below), with Books-category *placement of the reading features* avoided — don't compete as a reader.

### Category size signals

- Global ebook market revenue estimates vary widely by definition: $14.92B in 2025 ([Statista via G2](https://learn.g2.com/what-is-an-ebook)) vs $18.0B ([Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/e-book-market)) vs $50.6B ([Fortune Business Insights](https://www.fortunebusinessinsights.com/ebook-market-111315)). Treat absolute size as soft; the reliable signal is *growth in self-publishing output* (§1) and the durable installed base of EPUB-format destinations (Apple Books preinstalled; Kindle Send-to-Kindle accepting EPUB since 2022–23).
- Direct-category scale is **small**: the leading iOS converter has ~250K downloads in 12 years ([mwm.ai](https://mwm.ai/apps/the-ebook-converter/890503038)). This is a niche-utility market, not a scale play.

### Monetization patterns for utility/productivity apps

Hard benchmarks from Adapty's State of In-App Subscriptions (SOIS) 2026, Utilities category ([adapty.io](https://adapty.io/blog/utilities-app-subscription-benchmarks/)):

| Benchmark | Value |
|---|---|
| 12-month subscriber LTV (all plans) | $46.30 (2nd of all categories) |
| 12-month LTV for *trial* subscribers | $68.90 (highest of any category) |
| Install LTV (12-mo global median) | $1.09 |
| First-renewal retention | 58.1% (category leader) |
| One-year retention on annual plans | 22.1% (category leader) |
| Apps offering free trials | 84.7% (up from 78.0% in one year) |
| Apps using discount pricing | only 1.2% (lowest of any category) |
| Global funnel medians | 13.8% install→trial; 26.2% trial→paid; 90% of trial starts on Day 0 |
| One-time purchases share of market revenue | grew 6.4% (2023) → 10.3% (2025) |

Cross-checks: one-time purchases are now "the exception" in the App Store ([funnelfox.com](https://blog.funnelfox.com/how-app-pricing-models-impact-user-acquisition-and-retention/)); subscriptions generate the majority of app revenue, but lifetime/one-time models are quietly growing for tool-type apps.

**Implication for this app:** a free download with a **free trial → subscription** is the category-standard play, and Utilities buyers tolerate full pricing (little discounting). But a **one-time unlock** ($9.99–$19.99) is defensible here because conversion is an *episodic* task — users may not perceive ongoing value, which Apple's 3.1.2(a) subscription rule implicitly demands (see §6). Both models are viable; the choice is a one-way door (§5).

### ASO keyword landscape

- **Assumption (no reliable public data):** exact search volumes for "epub converter," "pdf to epub," "ebook converter" are only available in paid ASO tools (AppTweak, Sensor Tower, etc.). What is verifiable: "pdf converter" is an extremely contested head term dominated by established apps with 250+ related competing apps ([ASOTools data](https://asotools.io/app-analytics/pdf-converter-keyword-monitoring)); "ebook converter" is far less contested (the 12-year-old leader is beatable in title/subtitle).
- Practical ASO plan: own the long tail — "epub converter," "pdf to epub," "docx to epub," "ebook maker," "make epub," "send to kindle converter." Action for later stages: run one paid ASO query before launch; do not trust invented volume numbers.

---

## 4. Positioning — the differentiated wedge

**Sharpest wedge: "On-device, reading-quality EPUB builder — your files never leave your phone."**

Three claims, each mapping to a documented incumbent failure:

1. **On-device / private.** The category leader uploads documents to a cloud server — its own listing admits "your files will be sent over… to the conversion server," and reviews call this out ([mwm.ai](https://mwm.ai/apps/the-ebook-converter/890503038)). On-device conversion converts the #1 privacy objection into the headline.
2. **Built for reading, not just format-shuffling.** Chapter detection, generated TOC, typography cleanup, TTS-friendly semantic structure — none of the existing iOS converters mention any of this; they are dumb format pipes. This is also where Calibre (desktop) beats them: Calibre offers "extensive control over the output" ([howtoconvert.co](https://howtoconvert.co/blog/best-ebook-converter-apps)); our app packages a Calibre-class *intent* into a phone-native flow ending in Apple Books.
3. **Honest free tier.** The leader's most damaging reviews are "you can't even test EPUB conversion without paying" ([mwm.ai reviews](https://mwm.ai/apps/the-ebook-converter/890503038)). Let users convert small/simple documents free, pay once or subscribe for batch, PDF, and pro typography.

**Why someone pays instead of "free Calibre + email-to-Kindle":** that workflow requires a desktop, tolerates Amazon's opaque reflow, and yields no control over the result. The paying moment is: a student/researcher/author on a phone or iPad, now, with no computer, who wants the book *in Apple Books* with chapters and clean type. (Inference from the workaround costs in §1; treat as hypothesis to validate in stage 2.)

---

## 5. One-way vs two-way doors (early, hard-to-reverse decisions)

| Decision | Reversibility | Why it matters |
|---|---|---|
| **On-device vs server-side conversion engine** | Mostly one-way (architecture + privacy claims) | On-device: matches privacy wedge, zero server cost, works offline; but heavy PDF→EPUB reflow (layout analysis, OCR-adjacent heuristics) is hard to do well within mobile CPU/memory and bloats the app. Server-side: higher quality ceiling, but reintroduces the privacy complaint, adds hosting cost, and complicates App Review (5.1.1 data disclosures). Hybrid (local for DOCX/TXT/MD/HTML, server option for PDF) is what the incumbent moved to — decide before building the pipeline. |
| **One-time unlock vs subscription** | Effectively one-way | Apple Guideline 3.1.2(a): when switching an existing app to subscriptions, "you should not take away the primary functionality existing users have already paid for" — grandfathering is expected; switching pricing models later is painful and review-visible. Choose at launch. Given episodic usage, a **one-time unlock with optional "Pro" lifetime tier** is lower-risk for reviewers and users; a subscription needs a genuinely ongoing-value story (e.g., continued format packs, cloud sync). |
| **Scope of input formats at v1** | Two-way but costly | DOCX/TXT/Markdown/HTML→EPUB is tractable on-device. PDF→EPUB with good reflow is the hard 20% that produces 80% of complaints (garbled output). Shipping PDF badly is worse than not shipping it; shipping it late kills the student segment. Sequence deliberately. |
| **Converter-only vs converter + reader** | Mostly two-way | Adding an in-app reader later is fine; it is *not* needed for v1 and drags the app into competition with Apple Books. Keep the handoff (share sheet → Apple Books) as the loop. |
| **Target Apple Books first vs Kindle-compat** | Two-way | EPUB is the output either way. Kindle users can already push EPUB via Send to Kindle; do not build Amazon integration v1. |

---

## 6. App Review risks (Apple)

Sourced from the current [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) (sections verified 2026-10-27):

1. **3.1.1 In-App Purchase (highest-likelihood touchpoint).** Any unlock of app functionality (export to EPUB, batch conversion, pro typography) must use IAP; "license keys" and external unlock mechanisms are prohibited. A web checkout that unlocks the iOS app will be rejected ([guideline text](https://developer.apple.com/app-store/review/guidelines/); [common rejection pattern](https://www.revenuecat.com/blog/growth/the-ultimate-guide-to-app-store-rejections)). US storefront may link out per 3.1.1(a), but design for IAP-first.
2. **3.1.2(a) Subscription justification.** Auto-renewable subscriptions must deliver "ongoing value." A one-shot converter on a weekly plan is exactly the pattern reviewers (and users) push back on; if subscribing, anchor on continuous value (format packs, sync) and follow the trial-disclosure rules. Also note the grandfathering expectation when changing business models later (see §5).
3. **2.5.15 Files access.** File-viewing/selection apps "should include items from the Files app and the user's iCloud documents" — use the system document picker properly; no custom sandboxes that hide user files.
4. **5.2.3 / 5.2 Intellectual Property.** Guideline 5.2.3 bars apps that "facilitate illegal file sharing or include the ability to save, convert, or download media from third-party sources without explicit authorization" ([text via Apple Developer forums](https://developer.apple.com/forums/tags/ios)). It is aimed at audio/video rippers, but a converter app must stay visibly DRM-clean: do **not** accept or market around DRM removal (no "unlock your Kindle books" positioning). Users *will* ask for it (the Calibre DeDRM plugin ecosystem exists — [dvdfab.cn](https://www.dvdfab.cn/bookfab/remove-drm-from-epub.htm)); refuse. App Store metadata must not imply Apple Books/Kindle endorsement.
5. **4.2 Minimum functionality.** A thin wrapper around a website converter is rejectable. The native, on-device engine is also our App-Review story: lean on it.
6. **5.1.1 Data/Privacy.** If *any* server-side conversion exists, disclose collection in the privacy label and have a deletion policy; on-device-only is the cleanest posture.
7. **Metadata/claims.** Don't claim "the only EPUB converter" or use competitors' trademarks in keywords; Apple flags unverifiable claims (2.3.x metadata rules).

---

## 7. Other risks (honest flags)

- **Regulatory/legal:** In the U.S., DMCA §1201 anti-circumvention makes DRM removal legally radioactive regardless of Apple's rules — keep the app strictly DRM-free-in/DRM-free-out. Piracy facilitation is a reputational and platform risk; positioning should emphasize *your own documents* (students' notes, authors' manuscripts, purchased DRM-free books).
- **Platform/technical:** PDF→EPUB reflow quality is the industry's unsolved hard problem — the incumbent's "gibberish output" reviews prove it ([mwm.ai](https://mwm.ai/apps/the-ebook-converter/890503038)). EPUB output must validate against the spec (EPUBCheck) or Apple Books silently misbehaves. On-device parsing of DOCX/PDF on phones is CPU/battery-sensitive; conversion must be chunked and cancellable.
- **Monetization realism:** top-of-funnel is small (leader: 250K downloads/12 years). Even healthy conversion yields modest revenue; this is a niche-utility business best run lean, possibly as one app in a portfolio. Episodic usage pressures subscription renewal (Adapty's 22.1% one-year annual retention is a *category-leading* number, i.e., most users still leave within a year — [adapty.io](https://adapty.io/blog/utilities-app-subscription-benchmarks/)). A one-time unlock caps LTV near the unlock price; plan for either high unlock price ($14.99–$29.99, defensible per Utilities LTV data) or an honest ongoing-value subscription.
- **Free-substitute creep:** Apple could improve Pages' EPUB export at any time; Amazon could open Kindle EPUB natively. Neither is rumored today (assumption — re-check at each stage).

---

## 8. Recommendation: **BUILD — with a narrowed wedge**

**Build.** The idea is workable and the gap is real, but only as a *niche utility*, not a broad converter suite.

**Reasons for:**
1. The direct iOS incumbent is weak where it matters: cloud-upload privacy, paywall-before-test, garbled PDF output — all documented in its own reviews ([mwm.ai](https://mwm.ai/apps/the-ebook-converter/890503038)).
2. The desktop incumbent (Calibre) has no iOS presence at all; the mobile workflow is genuinely broken for phone-only users (students, accessibility users — the latter explicitly underserved per the review evidence).
3. Demand tailwinds are verifiable: self-published titles +38.7% YoY in 2025 ([Bowker via Best Writing](https://bestwriting.com/self-publishing-statistics)); Amazon formalized EPUB ingestion via Send to Kindle ([The Verge](https://www.theverge.com/23842102/kindle-amazon-import-files-epub)).
4. Utilities is a commercially proven category with the highest trial-LTV of any segment ([Adapty SOIS 2026](https://adapty.io/blog/utilities-app-subscription-benchmarks/)).

**Conditions (decide before stage 2):**
- Wedge = *on-device, reading-quality EPUB builder*, Apple Books handoff. Not "another file converter."
- v1 formats: DOCX/TXT/Markdown/HTML → EPUB on-device; PDF→EPUB only if quality clears an internal bar, else hold for v2. (Biggest technical risk.)
- Monetization: free tier (small/simple docs) + **one-time unlock** ($14.99–$19.99) preferred for review-safety and episodic usage; subscription only with a real ongoing-value story.
- Category: Utilities. ASO long tail: "epub converter / pdf to epub / ebook maker."

**Kill/pivot criteria for later gates:** if stage-2 prototyping cannot produce clean EPUB from real-world DOCX/PDF test corpus within on-device resource budgets, pivot to "EPUB finisher/editor + Send-to-Kindle companion" rather than converter; if ASO check shows the keyword cluster is commercially empty (< ~tens of searches/day), treat as portfolio filler, not a flagship.
