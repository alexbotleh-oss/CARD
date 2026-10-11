
## TASK-20261011-03: Аудит истории интеграции МакетКАРТ и уменьшенного предпросмотра

Status: active
Priority: high
Created: 2026-10-11 19:05
Updated: 2026-10-11 19:12
Request: Проверить историю ветки candidate/CARD111-ui-2xN-20261006 после замены index.html на файл, отредактированный другим ИИ. Вне проекта макет отображался нормально, внутри проекта он сжат на ПК и телефоне. Сохранить исходный макет и встроить в него уже отлаженные функции CARD111.
Goal: Установить причину изменения масштаба по Git history и CSS; зафиксировать безопасный минимальный следующий шаг.
Context: Репозиторий https://github.com/alexbotleh-oss/CARD. Оригинал /mnt/data/МакетКАРТ.html использует .preview-wrap и .flipper шириной до 340px, aspect ratio 1.586/1. Current candidate HEAD commit по GitHub commit API: 97f47a2c593e3c5968728eda8809caa3223e4d78; index blob 2f0d203e18774463d1622543cafb8768e8079bd2.
Constraints: Пользовательский макет — источник истины; не менять визуальный дизайн от себя. Сохранить scanner, генератор QR/штрихкодов, распознавание фото из галереи, backup/restore, export/import и diagnostics. В этом шаге код приложения не менять; не публиковать без проверки/разрешения.
Acceptance criteria:
  - [x] История переноса и последующих правок восстановлена с SHA.
  - [x] Причина уменьшенного preview подтверждена конкретными CSS selectors.
  - [x] Результаты записываются в memory/history/WORKLOG/PROJECT_STATE/HANDOFF/design progress.
  - [x] Код приложения в этом шаге не изменён.
  - [ ] Отдельный CSS-патч на подтверждённом source SHA убирает только конфликтующие ограничения ширины.
  - [ ] Выполнены JS syntax/reverse-diff и визуальные проверки на ПК и телефоне.
Plan:
  - [x] Прочитать AGENTS.md, UNIVERSAL_PROJECT_INSTRUCTIONS.md, memory, history и canonical docs.
  - [x] Получить commit chain branch candidate и commit-level index blob.
  - [x] Сопоставить original /mnt/data/МакетКАРТ.html и current integrated index CSS.
  - [x] Записать findings и следующий шаг в memory/history/WORKLOG/PROJECT_STATE/HANDOFF.
  - [ ] Обновить design-progress дерево и перепроверить записи.
  - [ ] Определить точный source ref/SHA перед кодовой правкой.
  - [ ] Убрать конфликтующие width/max-width overrides минимальным patch.
  - [ ] Проверить syntax, reverse-diff и фактический render.
Current state: Commit chain: 86266ce (scanner/JSON patch) → 22f1fd22 (Перенес полностью код из макета МакетКАРТ) → 0dea63a (Внес исправления) → 97f47a2 (последний listed update index). Commit-level API confirms latest listed commit 97f47a2 and blob index 2f0d203e18774463d1622543cafb8768e8079bd2. В CSS обнаружены повторные .editorPreviewWrap .editorPreview с max-width 210px/190px/224px плюс специфичное .sheet.cardEditorSheet .editorPreviewWrap .editorPreview до 224px и ограничение 200px на узких экранах. Это не даёт preview использовать исходную ширину до 340px и объясняет визуально маленькую карту на разных устройствах.
Next action: Перед изменением кода подтвердить точный source SHA и затем удалить только конфликтующие preview width/max-width overrides, сохранив JS и интегрированные функции.
Blockers: Browser/device visual test и GitHub Pages deployment не выполнялись; точный source target следует проверять на commit SHA перед изменениями.
Related files: index.html; /mnt/data/МакетКАРТ.html; docs/CARD111_DESIGN_PROGRESS.md; docs/WORKLOG.md; docs/PROJECT_STATE.md; docs/HANDOFF.md; history/2026-10-11.md; .agent/memory/*.md.
History refs: history/2026-10-11.md; docs/WORKLOG.md; docs/CARD_ERROR_LOG_2026-10-05.md.
