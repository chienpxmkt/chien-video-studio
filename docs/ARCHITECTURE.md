# Chiến Video Studio Architecture v0.2

## 1. Purpose

Xây một production system đủ chuẩn để AI có thể nhận brief, dựng storyboard/timeline, tái sử dụng block, render và QA video mà không phụ thuộc chặt vào một renderer duy nhất.

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
Shared capabilities
      ↓
Storyboard / Timeline IR
      ↓
Registry blocks/scenes/templates
      ↓
Renderer adapter
      ↓
Preview / Render
      ↓
Technical QA
      ↓
Project-specific QA
```

## 3. Router

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

## 4. Workflow owns the deliverable

Workflow sở hữu luồng end-to-end, ví dụ:

```text
faceless-explainer
brief
→ message beats
→ storyboard
→ scene selection
→ timeline
→ composition
→ render
→ QA
```

Shared capability không sở hữu deliverable.

## 5. Shared capabilities

- `router` — chọn workflow/state handling;
- `creative` — visual direction, pacing, frame rules;
- `storyboard` — scene decomposition + beat mapping;
- `motion` — animation grammar, transitions;
- `media` — asset selection/placement/treatment;
- `qa` — deterministic technical checklist.

Các capability này có thể được dùng lại giữa nhiều workflow.

## 6. Intermediate representation

Workflow không nên gắn chặt trực tiếp vào implementation của renderer.

Tối thiểu nên có:

```text
Brief
  ↓
Storyboard
  ↓
Timeline / Composition IR
  ↓
Renderer adapter
```

Ví dụ timeline scene:

```json
{
  "id": "scene-03",
  "type": "comparison",
  "start": 7.5,
  "duration": 4.0,
  "layout": "split-comparison",
  "motion": "rise-in",
  "assets": []
}
```

IR chỉ được mở rộng khi renderer hiện tại cần field mới hoặc production thực tế chứng minh cần thiết.

## 7. Renderer boundary

```text
renderer/
├── current/
└── adapters/   # later, only if needed
```

Không migrate sang HyperFrames/Remotion chỉ vì kiến trúc đẹp hơn.

Chỉ cân nhắc adapter mới khi có lợi ích thực:

- workflow hiện tại không làm được;
- giảm đáng kể chi phí/tốc độ;
- hỗ trợ batch/automation tốt hơn;
- cần ecosystem/block/runtime đặc thù.

## 8. Deterministic production

Video automation nên tránh state không tái tạo được.

Ưu tiên:

- timing explicit;
- asset path/version explicit;
- seeded/random-free behavior khi render;
- finite animations;
- render cùng input → output frame logic nhất quán;
- FFprobe/render metadata được lưu khi cần QA.

Không cần ép engine hiện tại thành HyperFrames runtime; chỉ áp dụng nguyên lý deterministic phù hợp.

## 9. Registry

```text
registry/
├── blocks/
├── scenes/
├── transitions/
└── templates/
```

### Block
Primitive nhỏ: title, stat, quote, chart, CTA, product callout.

### Scene
Composition pattern: comparison, timeline, problem/solution, product reveal.

### Transition
Motion giữa scene.

### Template
Workflow-level starting composition, ví dụ `explainer-clean`.

Rule:

```text
Need
→ search registry
→ reuse if fit
→ adapt if small delta
→ create new only when necessary
```

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

Chỉ thêm rule đã được dùng/duyệt qua production.

## 11. State model

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

`BLOCKED` phải ghi:

- blocker;
- affected scope;
- owner/source cần phản hồi;
- next action tối thiểu.

Không tạo việc thay thế để lấp thời gian.

## 12. QA split

### Technical/video QA
Repo này sở hữu:

- resolution/aspect ratio;
- fps/duration;
- visual overflow/safe area;
- text clipping;
- asset missing;
- audio sync/levels cơ bản;
- timing/gap/overlap;
- render integrity.

### Project-specific QA
Repo nguồn sở hữu:

- đúng fact/claim;
- đúng character;
- đúng business message;
- đúng experiment hypothesis;
- publication/brand approval.

## 13. First migration case

Video `SEO vs Paid Ads` + template `explainer-clean` là case đầu tiên.

Mục tiêu migration:

1. Không thay đổi visual chỉ để refactor.
2. Ghi lại brief hiện có.
3. Trích storyboard/timeline từ output đang chạy.
4. Xác định block/scene thực sự reusable.
5. Thêm QA/checkpoint quanh pipeline.
6. Chỉ sau đó mới refactor engine nếu có pain thật.

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
