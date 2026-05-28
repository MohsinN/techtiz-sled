# TechTiz SLED — Repositioning Implementation Log

**Implementation date:** May 28, 2026
**Source:** `techtiz-sled-implementation-changelog.md`
**Scope:** Removal of "RFP decoding" positioning, replacement with subcontractor / NDA-first language across the SLED practice surfaces.

---

## What changed in this pass

The codebase was already partially repositioned. This pass closed the remaining gaps from the changelog. Below: ticket → file → outcome.

### Completed in this pass

| Ticket | File(s) | Change |
|---|---|---|
| **CL-012** | `us-sled/capabilities.html` | Added 6th tile to "What we don't do": _"Procurement intelligence / capture-consulting analyst services"_ with explicit reference to Deltek GovWin and Bloomberg Government. Removed `grid-column: span 2` on prior last tile. Updated head copy "five categories" → "six categories." |
| **CL-013** | `us-sled/capabilities.html` | Final CTA reworded to: _"Considering a teaming arrangement? Start an NDA conversation. Engagement structure proposed within 5 business days of NDA."_ |
| **CL-014 / CL-016** | All 6 SLED pages (`index`, `how-we-engage`, `operating-model`, `capabilities`, `case-studies`, `contact`) | Added "Procurement Vehicles" link to the SLED subnav between "Engagement Examples" and "Contact." Links to `index.html#vehicles`. |
| **CL-015** | `index.html` (root) | Removed the "State, county, local agencies?" mega-nav entry. Replaced with a prime-targeted "U.S. SLED prime contractor?" entry, so only one SLED entry point remains in the homepage Industries mega-nav, addressed to U.S. primes. |
| **CL-017** | `us-sled/how-we-engage.html` | Boundary tile copy "catalog of decoded RFPs published as marketing material" → "catalog of anonymized RFP analyses published as marketing material." |
| **CL-017** | `us-sled/_shared.css` | Renamed CSS token `--status-decoded` → `--status-active` and class `.status.decoded` → `.status.active` to eliminate the last code-level occurrences of "decode." No user-facing impact (these badges aren't used on any current public page). |
| **CL-018** (optional) | `us-sled/index.html` | Added quiet "Who we are not" stripe between the trust strip and the two-stages section: _"Techtiz is not a procurement intelligence firm. We are a technical implementation subcontractor for U.S. SLED primes. For RFP intelligence, our partners use Deltek GovWin and Bloomberg Government."_ Renders as a single muted row at desktop. |

### Verified already complete (no action needed this pass)

| Ticket | File | Status |
|---|---|---|
| **CL-001** | `us-sled/case-study-2026-08.html` | Already a stub that 301-redirects to `case-studies.html`. |
| **CL-002** | `us-sled/index.html` hero | H1, subhead, primary + secondary CTAs already match target state. |
| **CL-003** | `us-sled/contact.html` | H1 "Talk to us about a subcontract role," form options, "what happens next" copy already match target state. |
| **CL-004** | `us-sled/case-studies.html` | "Don't see your RFP?" closing block already removed. |
| **CL-005** | `us-sled/index.html` stats bar | Already shows "NDA" / "1 day" / "~10h" / "0 agency-facing" — no "RFPs decoded" counter. |
| **CL-006** | `us-sled/index.html` Phase 01 | Already says "Pre-Award Proposal Support" with NDA framing; no "decode" copy. |
| **CL-007** | `us-sled/index.html` Backbone tile 01 | Already replaced with "Technical Requirements Analysis" framing; six unique tiles. |
| **CL-008** | `us-sled/index.html` recent-engagements section | Removed; replaced upstream by specializations + engagement-examples CTA. |
| **CL-009** | `us-sled/index.html` Why Techtiz pillar 01 | Already reframed to "engineered the deliverables your SOW will name." |
| **CL-010** | `us-sled/index.html` inquiry toggle | Already labeled "Pre-Award Proposal Support" / "Post-Award Delivery." |
| **CL-011** | `us-sled/case-studies.html` | Already restructured to "Delivered engagements" + "What we cannot show publicly" sections. H1 already "Delivered subcontractor engagements." |

### Not done (out of scope or deferred)

- **CL-019** — moving Pre-Award six-card detail into `/how-we-engage.html` as post-NDA detail. Deferred — Mohsin's call. The current Hub Phase 01 detail is already framed under NDA and teaming letter.
- **CL-020** — NDA-gated MMP framework PDF. Asset not produced — leave to a separate content pass.

---

## Final QA grep results

Run against `us-sled/`:

| Forbidden string | Matches |
|---|---|
| `decode` | 0 |
| `decoded` | 0 |
| `Send us an RFP` | 0 |
| `Send us the SOW` | 0 |
| `Send us yours` | 0 |
| `Free 5-business-day` | 0 |
| `RFP Decode` | 0 |
| `RFPs decoded` | 0 |
| `Decoded RFP` | 0 |
| `Read the decode` | 0 |
| `Read the analysis` | 0 |
| `RFP intake` | 0 |

✅ All zero.

> Note: legacy files at project root (`Homepage v1 (dual-track).html`, `Techtiz US Public Sector.html`) still contain "decode" wording. They are **not** linked from any live SLED page, current homepage, or current navigation, and are kept as version history. If they're surfaced publicly later, run the scrub through them too.

---

## Files touched

```
index.html                           (CL-015 mega-nav cleanup)
us-sled/_shared.css                  (CL-017 token rename)
us-sled/index.html                   (CL-014 subnav + CL-018 callout)
us-sled/capabilities.html            (CL-012 6th boundary + CL-013 CTA + CL-014 subnav)
us-sled/case-studies.html            (CL-014 subnav)
us-sled/contact.html                 (CL-014 subnav)
us-sled/how-we-engage.html           (CL-014 subnav + CL-017 copy fix)
us-sled/operating-model.html         (CL-014 subnav)
```

---

## Next-pass candidates

- **Meta descriptions / `<title>` tags** — spot-checked `case-studies.html` and `contact.html`; both already updated. Worth a full sweep before launch.
- **Mobile rendering** — page-level layouts unchanged; the new boundary tile and "Who we are not" stripe should reflow normally but verify on a real device pass.
- **Internal link checker** — run before launch.
- **CL-019 / CL-020** — Mohsin's call on whether to lift pre-award detail to gated and produce the MMP PDF.
