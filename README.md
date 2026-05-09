# remotion_videos

Remotion video compositions for social media clips and explainers. Built with [Remotion](https://www.remotion.dev/) — videos are defined as React components and rendered to MP4.

## Setup

```bash
npm install
npm start        # open Remotion Studio in browser
```

## Compositions

### AduClip

▶ [Watch AduClip](https://github.com/stevevance/remotion_videos/blob/main/out/adu-clip3.mp4)

A 47-second vertical (1080×1920) social clip excerpted from the *Straight Up Chicago Investor* podcast, episode featuring Alderman Bennett Lawson of Chicago's 44th Ward.

Lawson discusses ADUs (accessory dwelling units) in Lakeview — making the case for gentle density, noting that coach houses and basement units are common in the neighborhood ("some are not so legal"), and pointing out that the new citywide ADU ordinance saw nearly 188 applications in its first two days. He closes by explaining how the new ordinance removed parking requirements that previously blocked legalization of many units.

Audio is played at 1.1× speed. Captions are synced from the diarized transcript.

**Render:**
```bash
npx remotion render src/index.jsx AduClip out/adu-clip.mp4
```

---

### PeopleOverParking

▶ [Watch PeopleOverParking](https://github.com/stevevance/remotion_videos/blob/main/out/people-over-parking.mp4)

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

---

### BuildPlanTestimony

▶ [Watch BuildPlanTestimony](https://github.com/stevevance/remotion_videos/blob/main/out/build-plan-testimony.mp4)

A 17-second vertical (1080×1920) social reel in support of the Illinois BUILD Plan (HB5626, sponsored by Rep. Buckner), based on Steven Vance's written testimony to the Illinois House executive committee on May 6, 2026.

The video covers:
- Illinois is roughly 142,000 homes short (source: Illinois Economic Policy Institute)
- Verbatim testimony quote about a 3-bedroom Evanston apartment listed at $2,900/month with a 40% move-in fee — and why that fee will keep rising with rent
- Two verbatim quotes on why state action is needed: housing markets are regional while zoning is local, and the legislature's right and responsibility to set a floor when local limitations produce statewide harm
- What the BUILD Plan includes: $250M capital investment, middle housing, ADUs, and single-stair building reform
- Call to action directing viewers to buildforil.org

**Render:**
```bash
npx remotion render BuildPlanTestimony out/build-plan-testimony.mp4
```
