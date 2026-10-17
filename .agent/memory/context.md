# Контекст проекта

Updated: 2026-10-11 19:42
Project goal: CARD111 — веб-кошелёк скидочных карт и визиток. Текущий UI приоритет — реализовать присланный пользователем макет без самовольной смены дизайна и встроить в него уже отлаженные scanner, генератор QR/штрихкодов, чтение фото из галереи, backup/restore, export/import и diagnostics.
Current focus: TASK-20261011-04 — вернуть прежние форматы генерации кодов и явный выбор одного/двух кодов.
Environment: HTML/CSS/JavaScript; GitHub repository alexbotleh-oss/CARD. Commit history и исходники прочитаны через GitHub API; для сравнения используется /mnt/data/МакетКАРТ.html. Локальный Git status недоступен.
Constraints: Оригинальный макет — источник истины. Визуальные изменения только минимальные и обоснованные сравнением исходников. Сохранять работающие функции, модель данных и storage. Не публиковать непроверенный код.
Important files:
  - index.html — приложение CARD111.
  - /mnt/data/МакетКАРТ.html — оригинал; .flipper width:min(100%,340px), aspect-ratio:1.586/1.
  - docs/CARD111_DESIGN_PROGRESS.md — дерево дизайна/прогресса в candidate.
  - docs/WORKLOG.md — хронология работ.
  - docs/PROJECT_STATE.md — статус и блокеры.
  - docs/HANDOFF.md — передача контекста.
  - history/2026-10-11.md — append-only history.
  - .agent/memory/tasks.md — задачи.
Current state: Candidate commit chain: 86266ce scanner/JSON → 22f1fd22 перенёс МакетКАРТ → 0dea63a внес исправления → 97f47a2 последний listed index update. Current commit API confirms index blob 2f0d203e18774463d1622543cafb8768e8079bd2. В интегрированном index несколько повторных CSS overrides .editorPreviewWrap .editorPreview задают max-width 210px, 190px, 224px и 200px на узких экранах; более специфичное правило .sheet.cardEditorSheet .editorPreviewWrap .editorPreview удерживает preview около 224px/200px. Это объясняет сжатую карточку независимо от типа устройства.
CSS patch commit: 87c68ac7eb71885378c31c20d225401dd8ae25dd; parent f38ef76df5183c92a204374434da59bd9384887a; index blob 444ca4e92c9c558b920bfc53c912407d333d56db. Убраны пределы 210/190/224/200px, восстановлена геометрия 340px / 1.586:1. Повторное чтение commit подтверждает новые CSS правила; два inline JS-блока побайтно совпадают с исходником. Branch ref candidate на момент последней проверки всё ещё указывает на f38ef76df5183c92a204374434da59bd9384887a; commit ещё не находится на HEAD ветки. V8 parser и браузерный рендер не выполнялись. Попытка скачать исходник для локального запуска parser через raw.githubusercontent.com блокирована недоступностью DNS в текущем контейнере; выполнение parser не считать пройденным.
Next action: выполнить V8 parser; проверить актуальный ref и продвинуть candidate с expected_sha lease только если HEAD не изменился; затем визуально проверить ПК/телефон.
Open risks: Визуальный browser/device render не проверен; Pages source/live HTML не подтверждён. Перед кодовой правкой повторно сверить exact commit SHA/tree. Отдельный mockup uses storage key card111.maketkart.v1, existing wallet uses card_wallet_v1; эту совместимость не менять неявно.

Verification update: after moving ref, branch head is 87c68ac7eb71885378c31c20d225401dd8ae25dd and index blob 444ca4e92c9c558b920bfc53c912407d333d56db confirmed. The two inline JS blocks equal parent byte-for-byte (lengths 121901 and 3303); stale width caps 210/190/224/200px are absent. No V8 execution or browser render has been run.


## Update 2026-10-11 18:13 UTC — target HTML comparison
The requested file is available as an upload and was read from its actual bytes. It is not a CSS-only variant of current candidate/index.html: its DOM, card/visit editor model and storage key differ. Target storage key: `card111.maketkart.v1`; current app uses `card_wallet_v1` and `card111_business_cards_v1`. Target includes camera scanner, image scan/crop, QR/barcode rendering, and backup import/export, but current-only functionality includes diagnostic log/export, custom brand-cover presets, second-code support, camera switch/torch and auto-save settings. Replacing index verbatim without migration/parity work risks losing access to these functions and existing stored data. Target scanner file input includes `capture="environment"`, so gallery selection is not guaranteed to remain separate on mobile. Active focus remains TASK-20261011-03; implementation is still pending while the safe integration plan is prepared. No app source changed in this step. Local Git status is unavailable through the remote API.


## User clarification — binding requirements (2026-10-11)
The user had already specified the intended implementation: the uploaded HTML is the foundation; transfer only existing CARD111 functions absent from that mockup. Explicit fixes: gallery QR scanning incorrectly routes to camera; old card backups no longer work, forcing manual re-entry. Previous response over-focused on differences between implementations and failed to execute the user-stated task. Correct course: implement target-first UI, separate camera vs gallery selection, restore old backup compatibility so imported cards appear in the active UI. Do not ask the user to restate these requirements. Preserve existing data and keep the task active until code and checks are actually done.


## 2026-10-11 — target-first patch
Candidate branch HEAD: `d3d4dcd76fa8c477f77f7bdeb2ede6a2d2de8d5b`. The target HTML remains the foundation. Removed `capture="environment"` from the gallery file input. Backup import now accepts root arrays and `{cards:[...]}` without requiring `visits`; missing visits are preserved. Legacy card fields are mapped into the target card schema, and old simple visits are mapped into the target visit model. Startup migration reads `card_wallet_v1`, `card_wallet_v1_safe_backup`, and `card111_business_cards_v1` and writes target storage `card111.maketkart.v1` without deleting source keys. Exact committed inline JS passed V8 compilation; static checks and focused local Node mapping tests passed. Browser/device render and end-to-end import of a real user backup are not yet verified. Full function parity remains active (second code, diagnostics export, custom brand-cover presets, camera switch/torch).


## 2026-10-11 — latest target-first feature parity patch
Candidate HEAD: `04751b1a77fad7e1067cf678af4694e9ede0d8fc`. Alongside gallery/backup compatibility, target UI now has optional second code + format selector and presentation switch, diagnostic export, camera front/rear switch and torch control, saved shirt presets reading legacy brand-cover/custom-cover localStorage, and an auto-save toggle. Existing target HTML remains the foundation; additions use its existing screen/editor/settings patterns.
Verification: exact committed inline script passes V8 compilation; static markers confirm required controls and backup migration. A focused Node harness passes legacy v3 backup without visits, target backup with visits, and root-array backup; missing visits preserve existing visits and cards are persisted. No real browser/mobile visual run or real phone camera/gallery test has been performed. User's actual backup file has not yet been imported end-to-end.

## 2026-10-11 — восстановление генераторов кодов и выбора второго кода
Candidate commits: eadd08e8e42a80f2051ad771c627a4d781a1a3cf and c572b675194323a237f5f28db28cc67964ad6859. Current index blob: 6a548f65638028a58aebdb8d8dc92e7abdd93008.
Compared the recovery version and restored all 11 confirmed formats in both code selectors: QR_CODE, CODE_128, EAN_13, EAN_8, CODE_39, CODE_93, ITF, UPC_A, UPC_E, PDF417, DATA_MATRIX. Added bwip-js for PDF417/Data Matrix and mapped CODE_93/UPC_E to JsBarcode. Added explicit second-code checkbox; turning it off hides but preserves the second-code value/format. Existing legacy secondCode/secondFormat values remain enabled and map to current secondCodeFormat.
Verification: current inline JS compiles with V8. Format normalization passed aliases CODE 93, UPC-E, PDF-417, DATA MATRIX, EAN13, CODE128 and QR. Mock render harness verified PDF417 and Data Matrix dispatch to bwip-js, CODE_93 and UPC_E to JsBarcode, and QR to QRCode. Legacy card model test confirmed secondFormat=PDF417 is retained and enables the second code. Browser/device rendering and actual scan have not been tested.
## Final verification — second-code validation (2026-10-11)
Additional candidate commit: 8770bf4e2947b18cd18ad0e192919c11addcd75c. Final index blob: 8dcd66661a4260e04ca29a7855eed768ecf0014d.
Re-fetched exact branch file and reran checks after the final patch: inline JavaScript V8 compilation passed; both format selectors contain all 11 values; legacy format normalization, secondCode/secondFormat mapping, PDF417/Data Matrix bwip-js dispatch, CODE_93/UPC_E JsBarcode dispatch and QR rendering passed. Saving is blocked if the second-code switch is enabled but the second value is empty. Real browser/mobile rendering and physical scan remain pending.

## 2026-10-11 — исправление геометрии предпросмотра
Candidate commit `c25104ca18f3d06091718c8a1d66197474aa1c30`, index blob `9e5906dcf7bd2b0c37353cc7e9f0bb2ff98ae82e`. Причина: `#cardPreview` наследовал absolute inset 0, но не имел родителя с заданной высотой; поэтому редакторская обёртка схлопывалась по высоте. Минимальный фикс — поместить предпросмотр внутрь существующего `.flipper` с aspect-ratio 1.586:1. Синтаксис inline JS прошёл V8 compilation. Логика предъявления статически проверена: область кода очищается перед новым рендером, индекс выбирает либо primary, либо secondary, переключатель второго кода зависит от enabled + непустого значения. Реальный браузерный рендер и воспроизведение жалобы про два кода остаются открытыми.


## Critical clarification 2026-10-11 — correct visual reference is NOT the original МакетКАРТ.html
The correct reference is the later upload `CARD111-МакетКАРТ-исправленная-интеграция(1).html` (raw uploaded filename was URL/Unicode-encoded; file id `file_0000000067a081f48a4dc55780db9c27`; 91,748 bytes; library created_at 2026-10-11T18:05:58Z). It must not be confused with the original `МакетКАРТ.html` (file id `file_00000000d6d0820abd1f0e8a64a6f765`; 71,600 bytes; created_at 2026-10-11T11:20:49Z). Even if the later filename contains the substring МакетКАРТ, it is a different, later corrected/integrated HTML and is the visual source of truth per the user's clarification. Preserve its exact visual structure/proportions/colors/positions/modals/responsiveness; port only missing functions from legacy/current CARD111. The prior assistant failed to distinguish the two and made candidate commit `c25104ca18f3d06091718c8a1d66197474aa1c30` against an inferred preview geometry. Treat that patch as unvalidated against the correct reference; do not carry it forward automatically. No further UI edits until the exact later target is compared with candidate.


## Verified canonical reference comparison (2026-10-11)
The correct later target `CARD111-МакетКАРТ-исправленная-интеграция(1).html` (file id `file_0000000067a081f48a4dc55780db9c27`) was read in full. Compared with candidate `index.html` at blob `9e5906dcf7bd2b0c37353cc7e9f0bb2ff98ae82e`, the CSS blocks are exactly identical (17,559 characters each); candidate adds behavior in markup/script but shares target CSS. The editor preview target markup lacked the `.flipper` sizing container although the stylesheet defines `.flipper{width:min(100%,340px);aspect-ratio:1.586/1;position:relative...}` and `.card-preview{position:absolute;inset:0}`. Wrapping `#cardPreview` in `.flipper.editor-flipper` is therefore supported by the correct target's own CSS. Keep this small fix. Code-rendering function clears the code container before drawing and selects primary/secondary from one active index. Device verification remains pending.


## 2026-10-17 — Agent workflow and chat-export checkpoint

- Repository source checked: `alexbotleh-oss/CARD`, branch `main` HEAD before this documentation branch: `65846285a8ba6a52299681ee643e0e6ed72a6ca0`. Work is isolated in `agent/card111-chat-export-instructions-20261017`; main was not edited.
- Current work: align project instructions with explicit Agent/runtime limits and create `TASK-20261017-01` for a faithful CARD111 chat export.
- Binding export rule: RAW capture first; preserve message order, roles, timestamps, IDs where present, attachments, links, metadata and provenance. Do not merge semantically similar events or summarize during import.
- Source limitation: the full raw export of the requested chat was not present in the accessible materials read in this session. The two uploaded text excerpts are partial context, not evidence of a complete transcript. Export task is active and blocked on locating/receiving the exact source archive.
- Agent integration limitation: repository instructions do not cause automatic execution on each ChatGPT turn. Use a runner only when it is actually available and explicitly invoked; distinguish remote GitHub API access from a local working copy and never claim local execution from remote file reads.
- UI development tasks recorded earlier remain open and are not closed or superseded by this documentation task.
