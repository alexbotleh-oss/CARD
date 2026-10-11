
## TASK-20261011-03: Аудит истории интеграции МакетКАРТ и уменьшенного предпросмотра

Status: active
Priority: high
Created: 2026-10-11 19:05
Updated: 2026-10-11 19:42
Request: Проверить историю ветки candidate/CARD111-ui-2xN-20261006 после замены index.html на файл, отредактированный другим ИИ. Вне проекта макет отображался нормально, внутри проекта он сжат на ПК и телефоне. Сохранить исходный макет и встроить в него уже отлаженные функции CARD111.
Goal: Установить причину изменения масштаба по Git history и CSS; зафиксировать безопасный минимальный следующий шаг.
Context: Репозиторий https://github.com/alexbotleh-oss/CARD. Оригинал /mnt/data/МакетКАРТ.html использует .preview-wrap и .flipper шириной до 340px, aspect ratio 1.586/1. Current candidate HEAD commit по GitHub commit API: 97f47a2c593e3c5968728eda8809caa3223e4d78; index blob 2f0d203e18774463d1622543cafb8768e8079bd2.
Constraints: Пользовательский макет — источник истины; не менять визуальный дизайн от себя. Сохранить scanner, генератор QR/штрихкодов, распознавание фото из галереи, backup/restore, export/import и diagnostics. В этом шаге код приложения не менять; не публиковать без проверки/разрешения.
Acceptance criteria:
  - [x] История переноса и последующих правок восстановлена с SHA.
  - [x] Причина уменьшенного preview подтверждена конкретными CSS selectors.
  - [x] Результаты записываются в memory/history/WORKLOG/PROJECT_STATE/HANDOFF/design progress.
  - [x] Код приложения в этом шаге не изменён.
  - [x] CSS-only patch создан отдельным коммитом 87c68ac7eb71885378c31c20d225401dd8ae25dd; ширина preview восстановлена до 340px, aspect ratio 1.586/1.
  - [x] Повторное чтение commit подтвердило CSS-изменения; оба inline JS-блока побайтно идентичны исходным, старые caps отсутствуют.
  - [ ] Запустить реальную V8 syntax-проверку и провести визуальный тест на ПК и телефоне.
Plan:
  - [x] Прочитать AGENTS.md, UNIVERSAL_PROJECT_INSTRUCTIONS.md, memory, history и canonical docs.
  - [x] Получить commit chain branch candidate и commit-level index blob.
  - [x] Сопоставить original /mnt/data/МакетКАРТ.html и current integrated index CSS.
  - [x] Записать findings и следующий шаг в memory/history/WORKLOG/PROJECT_STATE/HANDOFF/design progress.
  - [x] Обновить design-progress дерево и перепроверить записи.
  - [x] Определить точный source ref/SHA перед кодовой правкой.
  - [x] Убрать конфликтующие width/max-width overrides минимальным patch.
  - [x] Выполнить reverse-diff JS: оба скрипта совпадают побайтно с parent source.
  - [ ] Проверить синтаксис V8 и фактический рендер.
Current state: CSS patch commit 87c68ac7eb71885378c31c20d225401dd8ae25dd (parent f38ef76df5183c92a204374434da59bd9384887a; index blob 444ca4e92c9c558b920bfc53c912407d333d56db) создан. Удалены width/max-width preview limits 210/190/224/200px и восстановлены width:min(100%,340px), max-width:340px, aspect-ratio:1.586/1. После повторного чтения CSS подтверждён; оба inline JS-блока совпадают побайтно с parent source. Ветка candidate всё ещё указывает на parent f38ef76df5183c92a204374434da59bd9384887a; изменения пока не входят в HEAD ветки. V8 parser и visual render ещё не запускались. Commit chain 86266ce (scanner/JSON patch) → 22f1fd22 (Перенес полностью код из макета МакетКАРТ) → 0dea63a (Внес исправления) → 97f47a2 (последний listed update index) подтверждена по parent pointers и commit API. Точный source blob текущего последнего коммита: 2f0d203e18774463d1622543cafb8768e8079bd2. В CSS обнаружены повторные .editorPreviewWrap .editorPreview с max-width 210px/190px/224px плюс специфичное .sheet.cardEditorSheet .editorPreviewWrap .editorPreview до 224px и ограничение 200px на узких экранах. Это не даёт preview использовать исходную ширину до 340px и объясняет визуально маленькую карту на разных устройствах. Результаты внесены в memory/history/WORKLOG/PROJECT_STATE/HANDOFF/design progress; файлы перечитаны после записи.
Next action: выполнить V8 syntax parser обоих inline JS блоков; проверить ref candidate и, если он по-прежнему f38ef76df5183c92a204374434da59bd9384887a, передвинуть его на 87c68ac7eb71885378c31c20d225401dd8ae25dd с expected_sha lease; затем проверить рендер на ПК и телефоне до публикации.
Blockers: Browser/device visual test и GitHub Pages deployment не выполнялись. Ветка candidate на момент последней проверки всё ещё указывала на parent; CSS commit создан, но не включён в HEAD ветки.
Related files: index.html; /mnt/data/МакетКАРТ.html; docs/CARD111_DESIGN_PROGRESS.md; docs/WORKLOG.md; docs/PROJECT_STATE.md; docs/HANDOFF.md; history/2026-10-11.md; .agent/memory/*.md.
History refs: history/2026-10-11.md; docs/WORKLOG.md; docs/CARD_ERROR_LOG_2026-10-05.md.
