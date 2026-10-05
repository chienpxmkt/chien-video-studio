# Chiến Video Studio

`chien-video-studio` là **video production system dùng chung** cho các dự án của Chiến: faceless explainer, social promo, fashion/affiliate, product showcase và B2B product video.

Mục tiêu của repo không phải xây một framework video khổng lồ. Mục tiêu là biến brief/content đã được chốt thành video có thể kiểm tra, render, tái sử dụng và cải tiến dần từ production thật.

## Core principle

```text
REQUEST
   ↓
Video Router
   ↓
Workflow
   ↓
BRIEF
   ↓
SCRIPT / STORYBOARD / TIMELINE
   ↓
Registry lookup
   ↓
Composition
   ↓
CHECK
   ↓
PREVIEW
   ↓
RENDER
   ↓
VIDEO QA
   ↓
DONE
```

Ba luật chính:

1. **Route once** — khi workflow/brief đã khóa thì resume từ state hiện tại, không tự nghĩ lại toàn bộ concept.
2. **Reuse before create** — ưu tiên block/scene/template đã có trước khi hand-build mới.
3. **Renderer replaceable** — workflow/storyboard/timeline nằm trên renderer; renderer hiện tại có thể được thay hoặc bổ sung sau này mà không viết lại production intent.

## Repo-first execution model

```text
GitHub repository
= source of truth cho production intent + implementation

Local machine
= execution environment cho check + preview + render + QA
```

Local không cần giữ một source video riêng ngoài repo. Một fresh clone phải đủ để tái tạo video nếu máy có runtime/dependency được ghi rõ.

## First runnable project

`videos/seo-vs-paid-ads/`

- workflow: `faceless-explainer`
- renderer: `native-html`
- target: `1080 × 1920`, `30 fps`, `38s`
- visual direction: `explainer-clean`

### Local setup

Yêu cầu:

- Node.js 22+
- FFmpeg có trên `PATH`

```bash
git clone https://github.com/chienpxmkt/chien-video-studio.git
cd chien-video-studio
npm install
npm run setup:browser
```

### Check

```bash
npm run check:seo-vs-paid-ads
```

### Preview

```bash
npm run preview:seo-vs-paid-ads
```

### Render MP4

```bash
npm run render:seo-vs-paid-ads
```

Output mặc định:

```text
renders/seo-vs-paid-ads.mp4
```

`renders/` không commit vào Git mặc định.

## Current renderer

V0 dùng renderer native nhỏ:

```text
HTML/CSS/JS composition
      ↓
Playwright / Chromium
      ↓
deterministic frame capture
      ↓
FFmpeg
      ↓
MP4
```

Renderer này là implementation đầu tiên, không phải kiến trúc bắt buộc lâu dài. Production spec nằm phía trên renderer để sau này có thể thêm HyperFrames/Remotion adapter nếu production thật chứng minh có lợi.

## Repo boundary

`chien-video-studio` sở hữu:

- video routing;
- workflow;
- script/storyboard/timeline implementation;
- reusable video blocks/scenes/transitions;
- media placement/treatment cho video;
- technical/video QA;
- preview/render/export workflow.

Repo này **không** sở hữu source of truth về:

- character canon của Daisy;
- fact/claim/publication authority của VNP/VNMW;
- campaign/business strategy của client;
- personal priorities từ `chien-life-os`.

Các repo nguồn gửi sang một production handoff nhỏ gồm brief, approved inputs, constraints và acceptance criteria.

## Initial workflows

```text
workflows/
├── faceless-explainer/
├── fashion-lookbook/
├── product-showcase/
├── b2b-product-video/
└── general-video/
```

Chỉ phát triển workflow khi có video thật cần dùng.

## Registry

```text
registry/
├── blocks/
├── scenes/
├── transitions/
└── templates/
```

Registry chỉ chứa primitive đã dùng hoặc có use case rõ. Không tạo block chỉ để repo trông đầy.

## Production states

```text
IDEA
→ BRIEF_LOCKED
→ SCRIPT_LOCKED
→ STORYBOARD_LOCKED
→ IMPLEMENTATION_READY
→ LOCAL_PREVIEW
→ DRAFT_RENDER
→ QA
→ FINAL_RENDER
→ DONE
```

`BLOCKED` phải ghi rõ blocker và next action tối thiểu. Không tự mở thêm việc thay thế.

## Current priority

1. Chạy local preview/render đầu tiên cho `SEO vs Paid Ads` từ fresh clone.
2. Ghi lỗi/QA thật nếu có.
3. Chỉ fix lỗi có bằng chứng.
4. Sau render đầu tiên mới cân nhắc extract scene/block reusable.
5. Sau đó mới qua Daisy / product showcase / B2B video.

Chi tiết: `docs/ARCHITECTURE.md` và `docs/LOCAL-EXECUTION-CONTRACT.md`.
