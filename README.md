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
STORYBOARD / TIMELINE
   ↓
Registry lookup
   ↓
Composition
   ↓
CHECK
   ↓
PREVIEW / SNAPSHOT
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
3. **Renderer replaceable** — workflow/storyboard/timeline nằm trên renderer; renderer hiện tại có thể được thay hoặc bổ sung bằng HyperFrames/Remotion sau này mà không viết lại production logic.

## Repo boundary

`chien-video-studio` sở hữu:

- video routing;
- workflow;
- storyboard/timeline implementation;
- reusable video blocks/scenes/transitions;
- media placement/treatment cho video;
- technical/video QA;
- preview/render/export workflow.

Repo này **không** sở hữu source of truth về:

- character canon của Daisy;
- fact/claim/publication authority của VNP/VNMW;
- campaign/business strategy của client;
- personal priorities từ `chien-life-os`.

Các repo nguồn gửi sang một **production handoff nhỏ** gồm brief, approved inputs, constraints và acceptance criteria.

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

## Shared layers

```text
shared/
├── router/
├── creative/
├── storyboard/
├── motion/
├── media/
└── qa/
```

## Registry

```text
registry/
├── blocks/
├── scenes/
├── transitions/
└── templates/
```

Registry chỉ chứa primitive đã dùng hoặc có use case rõ. Không tạo block chỉ để repo trông đầy.

## Brand frame layer

Brand/project có thể có `FRAME.md` để chuyển brand/content rules sang ngữ cảnh video:

```text
brands/
├── daisy/
├── tabhome/
├── an-anh/
├── vietnam-packing/
└── vietnam-metalwork/
```

`FRAME.md` nên ngắn và thực dụng: typography, safe area, pacing, visual density, transition grammar, do/don't. Chỉ bổ sung rule từ production thật.

## Production states

```text
IDEA
→ BRIEF_LOCKED
→ READY_FOR_PRODUCTION
→ STORYBOARD_LOCKED
→ DRAFT_RENDER
→ QA
→ FINAL_RENDER
→ DONE
```

`BLOCKED` phải ghi rõ blocker và next action tối thiểu. Không tự mở thêm việc thay thế.

## Current renderer

Renderer hiện tại từ local `chien-video-studio` sẽ được migrate dần vào `renderer/current/` khi cần. Không rewrite engine chỉ để khớp kiến trúc mới.

## Current priority

1. Dùng video `SEO vs Paid Ads` hiện có làm migration case đầu tiên.
2. Chuẩn hóa brief/storyboard/timeline/checkpoint quanh pipeline đang chạy tốt.
3. Tạo registry từ các scene/block thực sự đã dùng.
4. Sau đó mới thử Daisy / product showcase / B2B video.

Chi tiết: `docs/ARCHITECTURE.md`.
