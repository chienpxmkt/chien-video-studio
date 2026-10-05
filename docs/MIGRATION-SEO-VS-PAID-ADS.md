# Migration Case 01 — SEO vs Paid Ads

## Goal

Dùng video local `SEO vs Paid Ads` / template `explainer-clean` làm case đầu tiên để chuẩn hóa architecture V0.2 **mà không thay đổi output đang chạy tốt chỉ để refactor**.

## Current known output

- Vertical video: 1080 × 1920.
- 30 fps.
- MP4 render đã chạy được.
- Template hiện tại: `explainer-clean`.

Các thông số khác sẽ lấy từ project local khi migrate; không suy diễn từ repo này.

## Migration sequence

### Phase A — Wrap existing production

1. Copy/move local project vào repo hoặc liên kết theo cấu trúc phù hợp.
2. Giữ renderer/code hiện tại nguyên trạng trước.
3. Tạo `BRIEF.json` theo `schemas/brief.schema.json`.
4. Reverse-map scene hiện tại thành storyboard.
5. Reverse-map timing hiện tại thành timeline IR.
6. Ghi output MP4/reference screenshot hiện tại làm baseline.

### Phase B — Identify reusable pieces

Chỉ promote những phần đã dùng thật:

- `explainer-clean` → candidate template;
- comparison scene → candidate scene;
- title/stat/CTA nếu thực sự lặp lại → candidate block;
- transition chỉ promote nếu dùng lại có lợi.

Không refactor tất cả component thành registry ngay một lượt.

### Phase C — Add QA wrapper

Check tối thiểu:

- resolution = target;
- fps = target;
- duration = expected range;
- no text overflow;
- no missing asset;
- no obvious dead gap;
- final render succeeds.

### Phase D — Review architecture value

Sau migration trả lời:

1. Brief/schema có giảm ambiguity không?
2. Storyboard/timeline IR có giúp sửa video nhanh hơn không?
3. Registry entry nào thực sự được reuse?
4. Renderer boundary có gây thêm complexity không?
5. Phần nào nên bỏ vì chỉ tạo overhead?

## Definition of done

Migration case hoàn thành khi:

- output mới không regress đáng kể so với baseline;
- production state có thể resume mà không cần đọc lại toàn bộ history;
- ít nhất workflow `faceless-explainer` chạy được trên case thật;
- registry chỉ chứa những primitive đã chứng minh hữu ích;
- không rewrite renderer nếu chưa có pain rõ.

## Not in scope

- migrate sang HyperFrames;
- migrate sang Remotion;
- cloud rendering;
- batch automation;
- full visual editor;
- xây Daisy workflow trước khi case explainer hoàn thành.
