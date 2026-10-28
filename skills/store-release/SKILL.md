---
name: store-release
description: Release engineering for the studio — fastlane setup, code signing, App Store Connect metadata, privacy manifest, screenshots, TestFlight, and the App Review pre-flight checklist the release manager follows
type: prompt
when_to_use: During /murad-ios-studio:app-ship, when preparing a release candidate, or when anything touches signing, provisioning, ASC metadata, or submission
whenToUse: During /murad-ios-studio:app-ship, when preparing a release candidate, or when anything touches signing, provisioning, ASC metadata, or submission
---

# Store release playbook

The release manager owns everything from "tests are green" to "submitted". Uploads to App Store
Connect happen only after GATE 2 (explicit user confirmation).

## Tooling

- fastlane: `match` (signing/certs in a private git repo), `gym` (archive/export),
  `snapshot` (screenshots across devices/locales), `pilot` (TestFlight upload), `deliver`
  (metadata + submission).
- App Store Connect API key (`.p8`): fastlane reads it from `APP_STORE_CONNECT_API_KEY_KEY_ID`,
  `APP_STORE_CONNECT_API_KEY_ISSUER_ID`, and `APP_STORE_CONNECT_API_KEY_KEY_FILEPATH`; `match` from
  `MATCH_GIT_URL` and `MATCH_PASSWORD`. These are the names the plugin README tells the user to
  set. Check they exist (never print their values) before any fastlane step; if one is missing,
  name it as a blocker and point the user to the README's "What you need to do" section. Secrets
  never go in the repo, `fastlane/Appfile`, or chat output.
- Bundle/version: `CFBundleVersion` auto-increments per build; marketing version comes from
  `docs/60-release.md`.

## Required artifacts before GATE 2

- [ ] Release build archived and exported (ad-hoc signed export smoke-tested locally).
- [ ] Unit + UI tests green on the release configuration.
- [ ] `fastlane snapshot` screenshots for the devices/locales in `docs/60-release.md`.
- [ ] Metadata complete per locale: name, subtitle, description, keywords, review notes,
      demo account if login exists.
- [ ] Privacy manifest (`PrivacyInfo.xcprivacy`) with the app's declared data collection, and
      matching answers staged in App Store Connect.
- [ ] `docs/70-security-review.md` with no open high/critical findings.
- [ ] Release notes drafted.
- [ ] The user's manual App Store Connect steps, listed in `docs/60-release.md` with what to enter
      for each: the app record (bundle ID, SKU), privacy policy and support URLs, the App
      Privacy answers (every data type the app collects and why), price and availability, each
      in-app purchase's product ID and price, and the demo account if the app has a login.
      Mark each done only once the user confirms it.
- [ ] App icon: the built app's `AppIcon` has a 1024×1024 primary with no alpha channel (check
      `sips -g hasAlpha`), and the archive builds with no asset-catalog warnings.

## App Review pre-flight

- No placeholder content, broken links, or unfinished UI anywhere a reviewer can tap.
- IAP/store products (if any) purchasable in the review build, with a demo path in review notes.
- Permissions (notifications, etc.) requested only with `usageDescription` strings present.
- Account deletion offered wherever account creation exists.

## TestFlight flow

1. `match` → `gym` → `pilot` uploads the build; check processing status.
2. Add internal testers, watch crash reports for the first 24h.
3. Triage tester feedback into `docs/51-bugs.md`; only "no known blockers" proceeds to GATE 2.

## Submission

After the user confirms at GATE 2: `deliver --submit_for_review` (or manual submission if the
user prefers). Record the ASC submission ID and status in `docs/60-release.md`.
