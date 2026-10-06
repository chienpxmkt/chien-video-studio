# Chiến Video Studio Architecture v0.2

## 1. Purpose

Xây một production system đủ chuẩn để AI có thể nhận brief, dựng script/storyboard/timeline, tái sử dụng block, render và QA video mà không phụ thuộc chặt vào một renderer duy nhất.

Hệ thống ưu tiên **production thật trước framework**.

## 2. Architecture

```text
Project / Brand repo
      ↓
Production Handoff
      ↓
Video Router
      ↓
Workflow owner
      ↓
Brief / Script / Storyboard
      ↓
Registry blocks/scenes/templates
      ↓
Renderer adapter
      ↓
Local Check / Preview / Render
      ↓
Technical QA
      ↓
Project-specific QA
```

## 3. Source-of-truth model

```text
GitHub repository
= canonical production intent + implementation

Local machine
= execution environment
```

Local may install dependencies, preview, render and report QA evidence. Local must not silently become an alternate production source.

## 4. Router

Router chỉ trả lời:

> Deliverable này thuộc workflow nào?

Router không viết video và không mở rộng scope.

Initial routes:

- explain arbitrary topic/text → `faceless-explainer`;
- Daisy fashion/affiliate/lookbook → `fashion-lookbook`;
- website/product/company showcase → `product-showcase`;
- export/B2B product explainer → `b2b-product-video`;
- không khớp rõ → `general-video`.

### Route once

Khi workflow và brief đã được khóa:

- edit layout/motion không route lại;
- QA fix không viết lại concept trừ khi blocker bắt buộc;
- specific edit chỉ sửa đúng phần yêu cầu;
- task mới mới được route lại.

## 5. Workflow owns the deliverable

Workflow sở hữu luồng end-to-end, ví dụ:

```text
faceless-explainer
brief
→ script
→ storyboard
→ scene selection
→ composition
→ local preview/render
→ QA
```

Shared capability không sở hữu deliverable.

## 6. Intermediate representation

Workflow không nên gắn chặt trực tiếp vào implementation của renderer.

Tối thiểu:

```text
Brief
  ↓
Script
  ↓
Storyboard
  ↓
Project config / Timeline IR when useful
  ↓
Renderer adapter
```

IR chỉ được mở rộng khi renderer hiện tại cần field mới hoặc production thực tế chứng minh cần thiết.

## 7. Renderer boundary

V0 renderer:

```text
renderer/native/
  runtime.mjs
  check.mjs
  preview.mjs
  render.mjs
```

Current path:

```text
HTML/CSS/JS composition
      ↓
Playwright / Chromium
      ↓
frame-by-frame capture
      ↓
FFmpeg
      ↓
MP4
```

Không migrate sang HyperFrames/Remotion chỉ vì kiến trúc đẹp hơn.

Chỉ cân nhắc adapter mới khi có lợi ích thực:

- workflow hiện tại không làm được;
- giảm đáng kể chi phí/tốc độ;
- hỗ trợ batch/automation tốt hơn;
- cần ecosystem/block/runtime đặc thù.

## 8. Deterministic production

Ưu tiên:

- timing explicit;
- asset path/version explicit;
- random-free behavior khi render;
- finite animations;
- render cùng input → output frame logic nhất quán;
- frame state điều khiển bằng explicit time thay vì wall-clock;
- FFprobe/render metadata được lưu khi cần QA.

## 9. Registry

```text
registry/
├── blocks/
├── scenes/
├── transitions/
└── templates/
```

Rule:

```text
Need
→ search registry
→ reuse if fit
→ adapt if small delta
→ create new only when necessary
```

Chỉ promote component từ composition sang registry sau khi reuse thật hoặc repeated pain chứng minh cần.

## 10. FRAME.md

`FRAME.md` là lớp dịch từ brand/content direction sang camera/frame/video rules.

Không thay `BRAND.md` hoặc source-of-truth.

Có thể chứa:

- aspect ratio defaults;
- typography scale;
- caption/title style;
- safe zones;
- scene density;
- pacing;
- motion intensity;
- preferred/forbidden transitions;
- media treatment;
- CTA visual rules.

## 11. State model

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

`BLOCKED` phải ghi:

- blocker;
- affected scope;
- owner/source cần phản hồi;
- next action tối thiểu.

## 12. QA split

### Technical/video QA
Repo này sở hữu:

- resolution/aspect ratio;
- fps/duration;
- visual overflow/safe area;
- text clipping;
- asset missing;
- audio sync/levels cơ bản khi audio tồn tại;
- timing/gap/overlap;
- render integrity.

### Project-specific QA
Repo nguồn sở hữu:

- đúng fact/claim;
- đúng character;
- đúng business message;
- đúng experiment hypothesis;
- publication/brand approval.

## 13. First canonical case

`SEO vs Paid Ads` là case đầu tiên để validate architecture.

Mục tiêu:

1. Brief/script/storyboard sống trong repo.
2. Composition implementation sống trong repo.
3. Fresh local checkout có lệnh check/preview/render rõ ràng.
4. Local chỉ trả evidence/error về repo.
5. Chỉ sau render thật mới extract reusable block/scene.

## 14. Anti-overengineering rules

Không làm khi chưa có use case thật:

- full NLE editor;
- cloud render farm;
- multi-renderer abstraction hoàn chỉnh;
- 20+ workflows;
- block catalog lớn;
- autonomous self-improvement;
- plugin packaging cho nhiều agent platform.

Một abstraction mới phải trả lời được:

> Nó giảm pain/lỗi/thời gian nào trong video thật?
