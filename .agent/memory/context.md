# Контекст проекта

Updated: 2026-10-11 19:42
Project goal: CARD111 — веб-кошелёк скидочных карт и визиток. Текущий UI приоритет — реализовать присланный пользователем макет без самовольной смены дизайна и встроить в него уже отлаженные scanner, генератор QR/штрихкодов, чтение фото из галереи, backup/restore, export/import и diagnostics.
Current focus: TASK-20261011-03 — устранить причину сжатого preview, найденную в истории CSS.
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
