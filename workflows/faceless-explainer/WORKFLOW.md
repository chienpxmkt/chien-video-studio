# Faceless Explainer Workflow v0.1

## Purpose

Biến một topic/script/notes thành video giải thích không cần talking head, dùng typography, diagram, comparison, chart hoặc media hỗ trợ.

First reference case: **SEO vs Paid Ads — `explainer-clean`**.

## Inputs

Tối thiểu:

- goal;
- key message / script hoặc source notes;
- target duration;
- aspect ratio;
- brand/frame context nếu có;
- must keep / must avoid;
- acceptance criteria.

## State entry

### Fresh

```text
IDEA → BRIEF_LOCKED
```

### Existing production

Nếu video đã có draft/render, reverse-map state tối thiểu sang brief/storyboard/timeline rồi tiếp tục từ state hiện tại. Không rebuild video chỉ để chuẩn hóa structure.

## Steps

### 1. Lock message beats

Chia nội dung theo các beat cần hiểu, không theo số scene cố định.

Output:

```text
hook
context/problem
core explanation
comparison/proof
takeaway/CTA
```

Chỉ dùng những beat thực sự cần.

### 2. Build storyboard

Mỗi scene phải có purpose rõ.

Ưu tiên scene type có sẵn trong registry. Nếu chưa có registry entry, dùng local composition hiện tại và chỉ promote thành registry sau khi chứng minh reusable.

### 3. Lock timeline

Ghi start/duration rõ để render có thể tái tạo.

Không micro-optimize timing trước khi preview chứng minh cần.

### 4. Compose

Ưu tiên:

```text
existing template
→ existing scene/block
→ small adaptation
→ new implementation
```

### 5. Preview + QA

Check:

- thông điệp đọc/hiểu kịp;
- hierarchy rõ;
- không overflow/safe-area issue;
- timing không có khoảng chết bất thường;
- motion không tranh sự chú ý với nội dung;
- render metadata đúng target.

### 6. Fix minimally

Sửa blocker/QA issue nhỏ nhất trước.

Không rewrite script/visual system nếu chỉ có một lỗi layout hoặc timing.

### 7. Final render

Khi acceptance criteria pass → `DONE`.

## Shared capabilities

- storyboard;
- creative/frame direction;
- motion;
- media;
- technical QA.

## Output

- brief/state;
- storyboard;
- timeline/composition data;
- rendered MP4;
- QA note nếu cần.

## Stop condition

Video đạt acceptance criteria của brief và render integrity pass.

Không tự tạo thêm template/block/workflow sau khi video done. Reusable pattern được promote riêng sau review.
