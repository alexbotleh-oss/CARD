# Контекст проекта

Updated: 2026-10-11 19:12
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
Next action: На следующем шаге применить минимальный CSS patch только к конфликтующим preview limits на подтверждённом SHA, не менять DOM/JS-функции, проверить syntax/reverse-diff и визуально сравнить desktop/mobile.
Open risks: Визуальный browser/device render не проверен; Pages source/live HTML не подтверждён. Перед кодовой правкой повторно сверить exact commit SHA/tree. Отдельный mockup uses storage key card111.maketkart.v1, existing wallet uses card_wallet_v1; эту совместимость не менять неявно.
