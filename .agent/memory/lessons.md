# Уроки и улучшения

## LESSON-20261011-01: Память должна быть файловой

Date: 2026-10-11 18:20
Situation: Настройка системы памяти для ИИ-агента.
Problem: Диалог не гарантирует сохранение контекста между сессиями.
Lesson: Важные данные должны храниться в файлах проекта.
Rule: Любое важное решение, задача, контекст или изменение должны быть записаны в память или историю.
Applied to: Весь проект.
## LESSON-20261011-02: Наличие маркеров в исходнике не доказывает работоспособность

Date: 2026-10-11 18:32
Situation: В CARD111 через удалённый GitHub API добавлены элементы управления камерой, JSON merge/replace и настройка автосохранения.
Problem: Статический поиск показывает наличие кода, но не выявляет синтаксические и runtime-ошибки. Удалённый API также не раскрывает локальное состояние рабочей копии.
Lesson: После любой правки запускать доступную проверку синтаксиса, затем выполнять целевые сценарии; отдельно проверять фактический источник Pages.
Rule: Не повышать статическую проверку содержимого до E2 parser test, интеграционной проверки или проверки на устройстве без отдельного фактического теста.
Applied to: CARD111 scanner, camera controls, JSON import/merge, auto-save, GitHub Pages.


## LESSON-20261011-03: Сопоставлять CSS интегрированного макета с оригиналом

Date: 2026-10-11 19:12
Situation: Отдельный index.html из другого ИИ отображался корректно, но после интеграции в CARD111 предпросмотр карты был мал на ПК и телефоне.
Problem: Повторные CSS overrides ограничивали preview до 190–224px, перекрывая геометрию исходного макета.
Lesson: Механическое встраивание макета может быть визуально нарушено каскадом стилей существующего приложения или поздними правками.
Rule: Перед исправлением сравнить исходные и итоговые selectors; исправлять конкретную первопричину без самостоятельного редизайна.
Applied to: CARD111 editor preview; будущие интеграции макетов.


## LESSON-20261011-04: Создание commit не означает обновление ветки

Date: 2026-10-11 19:42
Situation: CSS patch сохранён как commit 87c68ac7eb71885378c31c20d225401dd8ae25dd, но после создания контрольное чтение ref показало старый HEAD f38ef76df5183c92a204374434da59bd9384887a.
Problem: GitHub Git Data API create_commit сохраняет объект коммита, но не меняет branch ref.
Lesson: После создания commit отдельно проверять branch ref и, при допустимом продвижении, использовать expected_sha lease; затем перечитывать ref и файл.
Rule: Не утверждать, что изменение находится в ветке, пока ref явно не указывает на новый commit.
Applied to: CARD111 remote GitHub edits.

Additional evidence for LESSON-20261011-04: expected_sha update_ref succeeded, and a follow-up read confirmed candidate HEAD points at the CSS commit. Both inline scripts are unchanged byte-for-byte; parser and visual tests remain pending.

**Follow-up (2026-10-11 19:48):** Попытка запустить JavaScript parser локально заблокирована сетевой недоступностью raw.githubusercontent.com из контейнера. Не объявлять синтаксис проверенным; byte-for-byte JS diff остаётся подтверждённым отдельно.


## LESSON-20261011-05: Визуальный эталон может быть другой реализацией, а не CSS-вариантом
Date: 2026-10-11
Situation: Пользователь указал HTML-файл, к которому нужно привести визуал CARD111.
Problem: Целевой файл и текущий index.html имеют разные DOM, модель карточек и storage keys; у каждой реализации есть уникальные функции.
Lesson: До замены UI сравнивать не только CSS, но и модель данных, обработчики, доступность функций и совместимость сохранённых данных.
Rule: Не заменять активный index эталоном без плана миграции/отката и списка функций, которые должны быть перенесены. Отдельно проверять, что выбор файла из галереи не запускает камеру через capture attribute.
Applied to: CARD111 MaketKart UI integration.


## LESSON-20261011-06: Не превращать явно заданный контекст в повторное исследование
Date: 2026-10-11
Problem: Пользователь уже задал макет-first принцип, два QR scan flows и восстановление старых backup; ответ вместо реализации повторно обсуждал архитектурные риски.
Rule: Сначала выполнить конкретные указанные исправления. Сравнение использовать только для выбора минимального способа интеграции, а не для повторного согласования цели. Критерии готовности должны включать проверку старого backup на фактическом импорте, а не только наличие обработчика.


## LESSON-20261011-07 — Совместимость резервных копий
При интеграции UI наличие кнопки импорта не доказывает совместимость. Нужно учитывать старые формы данных, необязательные массивы, соответствие полей и то, что восстановленные карты действительно отображаются. Исходные ключи localStorage нельзя удалять до успешной миграции и проверки.


## LESSON-20261011-08 — Не смешивать syntax check и UI acceptance
V8 compilation and static marker checks can confirm syntax and presence of flows, but cannot prove camera permissions, gallery picker behavior, visual fidelity, or real backup restore in the browser. Keep those as separate acceptance checks and report them as pending until actually exercised.

## LESSON-20261011-09 — Формат в меню должен соответствовать реальному генератору
Situation: В старой CARD111 были 11 форматов, но перенос оставил только часть линейных форматов; PDF417 нельзя корректно сгенерировать через JsBarcode.
Lesson: Перед удалением или переносом генератора сравнивать полный список форматов, UI options, alias normalization и код, который реально создаёт символ. Не подменять неподдерживаемый формат Code 128 по умолчанию.
Rule: Для каждого формата проверять end-to-end цепочку: сохранённое значение → нормализация → выбранный генератор → формат вывода. Для второго кода проверять отдельные формат и enabled-state; выключение не должно случайно удалять сохранённые данные.
Applied to: CARD111 code format parity.

## LESSON-20261011-10: Абсолютный preview требует контейнер с геометрией
Situation: `#cardPreview` показывался как узкая полоса в редакторе, потому что `.card-preview` позиционируется через `position:absolute; inset:0`, а родитель не задавал высоту.
Rule: Если визуальный компонент использует absolute inset, его ближайший контейнер должен иметь позиционирование и определённую геометрию (например, aspect-ratio). При интеграции не добавлять произвольные размеры к самой карточке, если уже есть подходящий контейнер компонента.
Limit: Статический DOM/CSS и JS-парсер не доказывают реальный вид на телефоне; визуальный acceptance должен оставаться отдельным пунктом.


## LESSON-20261011-11: Distinguish similarly named mockup versions by identity, not substring
Failure: Treated original `МакетКАРТ.html` as the canonical visual target even though a later corrected/integrated HTML had been uploaded. The later file's filename also contains `МакетКАРТ`, which made a name-based shortcut misleading.
Rule: For visual-source decisions, compare exact upload identity, timestamp, size, and contents. Maintain separate records for original vs corrected/integrated variants. The latest user-designated artifact is canonical even when its filename resembles an older one. Before CSS/DOM edits, verify the candidate against that exact artifact; never infer geometry from the previous version or from screenshots alone if the source file is available.
Recovery: Candidate commit `c25104ca18f3d06091718c8a1d66197474aa1c30` was based on the wrong inferred baseline; leave history intact but treat the patch as unvalidated until compared to the correct target.


## LESSON-20261011-12: Verify patch applicability against the exact target before discarding it
After the reference identity was corrected, compare the exact target artifact with the candidate instead of assuming the prior patch is invalid. In this case, the CSS blocks matched exactly (17,559 characters), and the target itself defined `.flipper` sizing but omitted it around `#cardPreview`; thus the wrapper fix is consistent with the target's own layout rules. Still distinguish static compatibility from actual browser/device acceptance.
