
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
Current state: CSS patch commit 87c68ac7eb71885378c31c20d225401dd8ae25dd (parent f38ef76df5183c92a204374434da59bd9384887a; index blob 444ca4e92c9c558b920bfc53c912407d333d56db) создан. Удалены width/max-width preview limits 210/190/224/200px и восстановлены width:min(100%,340px), max-width:340px, aspect-ratio:1.586/1. После повторного чтения CSS подтверждён; оба inline JS-блока совпадают побайтно с parent source. Ветка candidate всё ещё указывает на parent f38ef76df5183c92a204374434da59bd9384887a; изменения пока не входят в HEAD ветки. V8 parser, browser/device render ещё не запускались. Commit chain 86266ce (scanner/JSON patch) → 22f1fd22 (Перенес полностью код из макета МакетКАРТ) → 0dea63a (Внес исправления) → 97f47a2 (последний listed update index) подтверждена по parent pointers и commit API. Точный source blob текущего последнего коммита: 2f0d203e18774463d1622543cafb8768e8079bd2. В CSS обнаружены повторные .editorPreviewWrap .editorPreview с max-width 210px/190px/224px плюс специфичное .sheet.cardEditorSheet .editorPreviewWrap .editorPreview до 224px и ограничение 200px на узких экранах. Это не даёт preview использовать исходную ширину до 340px и объясняет визуально маленькую карту на разных устройствах. Результаты внесены в memory/history/WORKLOG/PROJECT_STATE/HANDOFF/design progress; файлы перечитаны после записи.
Next action: запустить V8 syntax parser обоих inline JS блоков; проверить ref candidate и, если он по-прежнему f38ef76df5183c92a204374434da59bd9384887a, передвинуть его на 87c68ac7eb71885378c31c20d225401dd8ae25dd с expected_sha lease; затем проверить рендер на ПК и телефоне до публикации.
Blockers: Browser/device visual test и GitHub Pages deployment не выполнялись. Ветка candidate на момент последней проверки всё ещё указывала на parent; CSS commit создан, но не включён в HEAD ветки.
Related files: index.html; /mnt/data/МакетКАРТ.html; docs/CARD111_DESIGN_PROGRESS.md; docs/WORKLOG.md; docs/PROJECT_STATE.md; docs/HANDOFF.md; history/2026-10-11.md; .agent/memory/*.md.
History refs: history/2026-10-11.md; docs/WORKLOG.md; docs/CARD_ERROR_LOG_2026-10-05.md.

  - [ ] V8 parser выполнен на двух inline JS script-контентах CSS-коммита (побайтная идентичность с parent подтверждена); сам parser не запускался в этой среде.


## TASK-20261011-03 — уточнение активного объёма (2026-10-11 18:13 UTC)
Status: active — implementation not yet changed.
Target visual reference: uploaded `CARD111-_D0_9C_D0_B0_D0_BA_D0_B5_D1_82_D0_9A_D0_90_D0_A0_D0_A2-_D0_B8_D1_81_D0_BF_D1_80_D0_B0_D0_B2_D0_BB_D0_B5_D0_BD_D0_BD_D0_B0_D1_8F-_D0_B8_D0_BD_D1_82_D0_B5_D0_B3_D0_B8_D1_80_D0_B0_D1_86_D0_B8_D1_8F(1).html` (91,748 bytes; read from the uploaded file).
Goal: Make CARD111 match this exact HTML as the visual foundation while preserving working functionality and stored user data.
Verified scope conflict: target and current candidate index.html are different implementations, not just different CSS. Target has card/visit editor, shirt-based appearance, camera scanning, image decoding/crop, QR/barcode rendering and JSON backup import/export; storage key `card111.maketkart.v1`. Current candidate uses `card_wallet_v1` and `card111_business_cards_v1`, and has diagnostic log/export, custom brand-cover presets, second-code support, camera switching, torch and auto-save settings. Target scanner file input has `capture="environment"`; its Photo and Select Photo controls use the same input, so mobile may route selection to camera rather than gallery.
Risks: Replacing index.html with target verbatim would remove current-only functions and could strand existing data under incompatible storage keys. A CSS-only patch cannot reproduce target because DOM and editor model differ. Do not overwrite active app until migration and function parity are addressed.
Acceptance criteria: target layout/screens/proportions remain source of truth; camera and gallery are separate flows; QR/barcode generation and camera/photo/crop/manual scan work; backup export/import and diagnostics remain available; existing cards and visits migrate safely/reversibly; unique existing functions are ported or remain reachable; JS syntax passes; desktop/mobile visual checks are recorded honestly.
Plan: map storage schemas/features; preserve a verified recovery artifact; port migration and missing controls into target foundation; run JS syntax and static ID/handler checks; perform available desktop/mobile visual checks; update and reread memory/history/handoff.
Next step: build the feature-parity/storage migration map from both actual HTML files. No application code changed in this update. Local Git status is unavailable through the remote API.


## Уточнение от пользователя — исходный объём задачи восстановлен (2026-10-11)
Пользователь справедливо указал, что это уже было в исходном контексте и было упущено при предыдущем разборе. Обязательные требования:
1. Указанный HTML-макет является фундаментом и визуальным источником истины.
2. Из старого CARD111 переносить только функции, которых в макете действительно нет; не переосмысливать задачу как равноправное сравнение двух интерфейсов.
3. Исправить сканирование QR: «камера» запускает камеру, «галерея/выбрать фото» открывает выбор изображения и не переходит в camera flow.
4. Исправить несовместимость старых backup-файлов: импорт должен восстанавливать карты в актуальную модель и показывать их без ручного повторного добавления.
Приоритет реализации: макет-first UI, минимальные функциональные дополнения, совместимость старых backup. Не подменять это повторным обоснованием архитектурных различий. Проверять реальные форматы backup и миграцию до отметки выполнено.


## Реализация макет-first и восстановления backup — 2026-10-11
Status: active, partial implementation committed.
Commit on `candidate/CARD111-ui-2xN-20261006`: `d3d4dcd76fa8c477f77f7bdeb2ede6a2d2de8d5b`.
Completed: (1) removed `capture="environment"` from target's image file input so gallery selection is not forced toward camera; (2) backup importer accepts root arrays and objects with `cards`, no longer requires `visits`; when visits are absent it preserves existing visits; (3) maps legacy `format` and alternate code fields into target `codeFormat`/code; maps old color/gradient/background into target shirt; (4) startup migrates legacy `card_wallet_v1`, its safe backup and `card111_business_cards_v1` into target key `card111.maketkart.v1` without deleting old keys; (5) import rolls in-memory state back if persistence fails.
Checks: branch HEAD and index blob re-read; committed inline JS passed V8 compilation check via `new Function`; static markers for gallery, old backup formats and legacy storage migration passed; local Node syntax check passed; focused Node harness passed legacy storage/card/visit mapping tests.
Not yet complete: full parity audit and port of current-only features not present in target (e.g. second code, diagnostic export, custom brand-cover presets, camera switch/torch) and actual browser/device visual check. Do not mark task complete until those are assessed/ported and backup import is verified end-to-end with representative real files.
Next: implement the remaining required functions that are genuinely absent without changing the target visual layout; then test representative old backup payloads and desktop/mobile rendering.


## Продолжение интеграции — функции старого CARD111 перенесены в макет (2026-10-11)
Status: active pending real-device/end-to-end validation.
Latest candidate HEAD: `04751b1a77fad7e1067cf678af4694e9ede0d8fc`.
Further additions on target-first UI: optional second card code with separate format and presentation switch; diagnostic export panel; camera front/rear switch and torch controls; reusable shirt presets which can read legacy `card_cover_defaults_v1` and `card_custom_cover_presets_v1`; auto-save setting retained and persisted under `card_wallet_settings_v1`. These are additive controls around the target layout.
Validation: latest branch/blob re-read; exact committed inline JS passed V8 compilation; static markers for gallery separation, legacy backup import/storage migration, second code, diagnostics, camera switch, torch, shirt presets and auto-save passed. Focused Node harness passed import of a legacy version-3 backup without visits, import of a target backup with visits, and import of a root-array backup; when legacy backup omits visits, existing visits remain and cards are persisted.
Still pending: test with the user's actual old backup file, inspect full rendered layout on desktop/mobile, and check camera/gallery behavior on a real phone. Do not mark complete until those are verified.

## TASK-20261011-04: Восстановить полный набор генераторов кодов и выбор одного/двух кодов

Status: active — code changes committed; browser/device acceptance pending.
Priority: high.
Created: 2026-10-11.
Request: В текущем CARD111 вернуть настройку выбора одного или двух кодов на карте и полный набор форматов генерации, которые были в старой версии; для карты «Пятёрочка» нужен второй PDF417.
Goal: Сохранить в макет-first реализации выбор одного/двух кодов и генерацию всех форматов, подтверждённых recovery-версией.
Context: Candidate candidate/CARD111-ui-2xN-20261006. Implementation commits: eadd08e8e42a80f2051ad771c627a4d781a1a3cf, c572b675194323a237f5f28db28cc67964ad6859, and 8770bf4e2947b18cd18ad0e192919c11addcd75c. Current index.html blob SHA 8dcd66661a4260e04ca29a7855eed768ecf0014d. Source parity was verified against recovery/CARD111-before-scanner-integration-20261011, blob SHA 97cb89dc774278cf2891098172f23494a29c9f38. Confirmed formats: CODE_128, EAN_13, EAN_8, CODE_39, CODE_93, ITF, UPC_A, UPC_E, PDF417, DATA_MATRIX, QR_CODE. JsBarcode handles linear formats; bwip-js handles PDF417/Data Matrix.
Risks: Не сломать текущий макет и хранение карт; не подменять PDF417 на CODE128; старые карточки со вторым кодом должны продолжить работать.
Acceptance criteria:
  - [x] В редактор добавлен явный переключатель использования второго кода.
  - [x] Оба селектора содержат все 11 форматов из recovery-версии.
  - [x] PDF417 и Data Matrix направляются в bwip-js; CODE_93 и UPC_E — в JsBarcode.
  - [x] Выключение второго кода скрывает его и не стирает сохранённые поля.
  - [x] Старые поля format/secondFormat нормализуются; существующая карта со вторым кодом автоматически сохраняет его доступность.
  - [x] V8 syntax check, format-normalization tests и mocked render-dispatch tests пройдены; файл повторно прочитан из candidate.
  - [ ] Проверить реальное отображение и предъявление кода в браузере/на телефоне.
Plan:
  - [x] Прочитать project memory/decisions/lessons/history и сравнить текущую и recovery-версии.
  - [x] Зафиксировать точный список прежних форматов и способ их генерации.
  - [x] Минимально дополнить UI, нормализацию и генератор в candidate.
  - [x] Запустить доступные syntax/logic checks и перечитать результат из ветки.
  - [x] Обновить context, lessons, append-only history и handoff.
  - [ ] Провести browser/device acceptance.
Next step: открыть карточку «Пятёрочка», включить второй код, выбрать PDF417, ввести/восстановить исходное значение и проверить рендер/сканирование на устройстве.


## TASK-20261011-05: Исправить обрезанный предпросмотр и выбор кода при предъявлении

Status: active.
Priority: high.
Created: 2026-10-11.
Request: На телефоне предпросмотр рубашки в редакторе отображается узкой обрезанной полосой; при открытии карты пользователь сообщает о лишнем/неверном отображении кодов при выбранном одном коде.
Goal: Восстановить корректную геометрию предпросмотра и подтвердить, что экран предъявления показывает только код, выбранный активным переключателем.
Context: Candidate branch `candidate/CARD111-ui-2xN-20261006`, начальная версия для задачи: `index.html` blob `8dcd66661a4260e04ca29a7855eed768ecf0014d`. CSS задаёт `.card-preview{position:absolute;inset:0}`, но editor `#cardPreview` не вложен в элемент с заданным aspect-ratio/высотой. В screen-present есть primary/secondary selector и отдельный QR/barcode selector; secondary selector должен быть скрыт, если второй код отключён или пуст.
Risks: Не менять эталонный визуальный стиль и не затронуть размеры карточек на главном экране/визитках; не удалять сохранённые значения второго кода.
Acceptance criteria:
  - [ ] Предпросмотр редактора имеет размеры/пропорции карточки и не обрезает название.
  - [ ] Существующая геометрия карточек главного экрана и визиток не меняется.
  - [ ] Второй кодовый переключатель показывается только при включённом и заполненном втором коде.
  - [ ] Переключение primary/secondary и QR/barcode отображает один код за раз.
  - [ ] Проверены синтаксис JS и целевые логические условия; результат повторно прочитан из candidate.
  - [ ] Обновлены context, lessons и append-only history; задача остаётся active до реального browser/device acceptance.
Plan:
  - [x] Прочитать project memory и последний history-файл.
  - [x] Проверить CSS предпросмотра и код предъявления в текущем candidate.
  - [ ] Исправить только контейнер предпросмотра редактора.
  - [ ] Проверить отображение одного кода и условие видимости второго.
  - [ ] Выполнить доступные проверки и обновить память проекта.
Next step: внести минимальный CSS/markup patch в candidate и перепроверить файл из ветки.
