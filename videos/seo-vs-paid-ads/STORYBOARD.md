# SEO vs Paid Ads — Storyboard

## State

`STORYBOARD_LOCKED`

## Format

- Vertical `9:16`
- `1080 × 1920`
- `30 fps`
- Target duration: `35–40s`
- Workflow: `faceless-explainer`
- Visual direction: `explainer-clean`

## Scene 01 — Hook / split decision

**Time:** `0.0–4.5s`

**Narration:**

> Muốn có khách nhanh hơn thì chạy Ads. Muốn xây traffic bền hơn thì làm SEO. Nhưng chọn một trong hai mãi mãi thì chưa chắc đúng.

**Visual:**

- Split-screen comparison.
- Left: `PAID ADS` with fast arrow / instant visibility cue.
- Right: `SEO` with rising curve / compounding cue.
- Final beat brings both labels into one frame.

**On-screen copy:**

- `ADS = SPEED`
- `SEO = COMPOUNDING VISIBILITY`

**Motion:**

- Fast entry for Ads.
- Slightly slower build for SEO.
- No decorative particle effects.

## Scene 02 — Paid Ads: speed

**Time:** `4.5–10.5s`

**Narration:**

> Paid Ads cho bạn tốc độ. Bật chiến dịch, trả tiền để mua lượt hiển thị và test nhu cầu nhanh hơn.

**Visual:**

Simple 3-step flow:

```text
Campaign ON → Spend → Visibility / Demand signal
```

**On-screen copy:**

- `Launch fast`
- `Buy visibility`
- `Test demand`

**Motion:**

Sequential reveal, left to right or top to bottom.

## Scene 03 — Paid Ads: dependency on spend

**Time:** `10.5–14.5s`

**Narration:**

> Nhưng khi dừng ngân sách, phần lớn traffic trả phí cũng dừng theo.

**Visual:**

- Spend meter or switch moves from ON → OFF.
- Paid traffic line drops immediately/quickly after spend stops.

**On-screen copy:**

`Spend stops → paid traffic drops`

**Guardrail:**

Do not imply all traffic disappears or that Ads creates no lasting business value.

## Scene 04 — SEO: slower build

**Time:** `14.5–21.5s`

**Narration:**

> SEO chậm hơn. Bạn phải đầu tư vào nội dung, website và độ tin cậy trước khi thấy kết quả rõ.

**Visual:**

Three building blocks stack gradually:

```text
Content
Website
Trust
```

Then a search/visibility indicator begins rising.

**On-screen copy:**

- `Content`
- `Website`
- `Trust`
- `Takes time`

**Motion:**

Deliberate, slower build than Ads scenes.

## Scene 05 — SEO: compounding visibility

**Time:** `21.5–27.5s`

**Narration:**

> Đổi lại, những trang làm tốt có thể tiếp tục mang về lượt tìm kiếm tự nhiên theo thời gian.

**Visual:**

- One content/page card becomes multiple search-entry points or repeated organic visits.
- Organic visibility curve continues beyond the initial build phase.

**On-screen copy:**

`Good pages can keep earning organic visibility`

**Guardrail:**

Use `can`, not guarantee language.

## Scene 06 — Reframe the question

**Time:** `27.5–31.5s`

**Narration:**

> Vì vậy câu hỏi không phải là “SEO hay Ads cái nào tốt hơn?”

**Visual:**

Large central text:

`SEO vs Ads?`

Strike-through / morph into:

`Which job? Which stage?`

**Motion:**

One clean transformation. No extra visual clutter.

## Scene 07 — Conclusion

**Time:** `31.5–38.0s`

**Narration:**

> Ads giúp mua tốc độ. SEO giúp xây tài sản traffic. Doanh nghiệp tốt thường dùng mỗi kênh cho đúng việc và đúng thời điểm.

**Visual:**

Two-column summary converges into one business funnel/system:

| Paid Ads | SEO |
| --- | --- |
| Speed | Compounding visibility |
| Testing | Long-term discovery |

Then final combined line:

`Use each channel for the job it does best.`

**Final frame:**

No hard-sell CTA in V1. End on the takeaway.

## Global visual rules

- Max one primary message per scene.
- Mobile-safe typography.
- High contrast between foreground text and background.
- Keep lower UI-safe area clear for TikTok/Reels overlays.
- Prefer transforms/opacity for motion where possible.
- No fake analytics/dashboard numbers.
- No stock-photo dependency required for V1.

## Local implementation notes

Local implementation may choose HTML/CSS/JS or the current simplest supported renderer, but must preserve:

- scene order;
- narrative meaning;
- approximate scene timing;
- on-screen hierarchy;
- guardrails above.

Any material creative deviation should be proposed back to the repository instead of applied silently.
