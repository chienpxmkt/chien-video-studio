# Video Registry

Registry lưu các primitive đã chứng minh hữu ích qua production thật.

```text
registry/
├── blocks/
├── scenes/
├── transitions/
└── templates/
```

## Reuse rule

```text
Need
→ search registry
→ reuse if fit
→ adapt if delta nhỏ
→ create new only when necessary
```

## Definitions

### Block
Một đơn vị nhỏ, ví dụ title, stat card, CTA, quote, product callout.

### Scene
Một composition pattern có ý nghĩa nội dung, ví dụ comparison, timeline, problem/solution, product reveal.

### Transition
Cách chuyển scene đã được kiểm chứng về timing/visual consistency.

### Template
Starting composition của một workflow, ví dụ `explainer-clean`.

## Entry requirements

Một registry entry mới nên có:

- name/id;
- use case;
- expected inputs;
- output behavior;
- renderer dependency nếu có;
- known constraints;
- production reference đã dùng.

Không tạo catalog hypothetical.
