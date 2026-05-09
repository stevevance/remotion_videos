# remotion_videos

Remotion video compositions for social media clips and explainers. Built with [Remotion](https://www.remotion.dev/) — videos are defined as React components and rendered to MP4.

## Setup

```bash
npm install
npm start        # open Remotion Studio in browser
```

## Compositions

### AduClip

A 47-second vertical (1080×1920) social clip excerpted from the *Straight Up Chicago Investor* podcast, episode featuring Alderman Bennett Lawson of Chicago's 44th Ward.

Lawson discusses ADUs (accessory dwelling units) in Lakeview — making the case for gentle density, noting that coach houses and basement units are common in the neighborhood ("some are not so legal"), and pointing out that the new citywide ADU ordinance saw nearly 188 applications in its first two days. He closes by explaining how the new ordinance removed parking requirements that previously blocked legalization of many units.

Audio is played at 1.1× speed. Captions are synced from the diarized transcript.

**Render:**
```bash
npx remotion render src/index.jsx AduClip out/adu-clip.mp4
```

---

### PeopleOverParking

An 18-second landscape (1080×720, 3:2) explainer about the Illinois People Over Parking Act (Public Act 104-0457), which takes effect June 1, 2026.

The video covers:
- What the law does: Illinois municipalities can no longer require parking in areas near transit
- When it takes effect and where it applies (statewide — Chicago metro, Metro East, Champaign-Urbana, and more)
- Which properties are eligible: within ½ mile of a public transportation hub (rail station or high-frequency bus intersection), or within ⅛ mile of a public transportation corridor (frequent bus route)
- Why it matters: more housing near transit, lower construction costs, walkable streets, less land paved for parking

**Render:**
```bash
npx remotion render src/index.jsx PeopleOverParking out/people-over-parking.mp4
```
