# Workflows

Workflow sở hữu deliverable end-to-end. Shared capability chỉ hỗ trợ từng bước.

## Initial workflow map

| Workflow | Use when | First real case |
|---|---|---|
| `faceless-explainer` | Giải thích concept/topic bằng typography/diagram/media, không cần talking head | `SEO vs Paid Ads` |
| `fashion-lookbook` | Daisy/fashion/affiliate/lookbook | Daisy Batch 01 |
| `product-showcase` | Website/product/company showcase | Tabhome / An Anh |
| `b2b-product-video` | B2B/export product/capability explainer | VNP / VNMW |
| `general-video` | Không khớp rõ workflow khác | fallback |

## Workflow contract

Mỗi workflow chỉ cần tối thiểu:

```text
Purpose
Inputs
State entry
Steps
Shared capabilities used
Output
Acceptance criteria
Stop condition
```

Không tạo file workflow chi tiết trước khi có production case thật.

## Router rule

- Fresh request → chọn workflow một lần.
- Existing `BRIEF_LOCKED`/`STORYBOARD_LOCKED` → resume.
- Specific edit → giữ workflow hiện tại.
- Nếu scope thực sự đổi deliverable → tạo task/brief mới.
