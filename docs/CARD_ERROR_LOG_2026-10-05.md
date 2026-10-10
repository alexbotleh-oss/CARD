# CARD — журнал ошибок и контрольных состояний

## 2026-10-05 — INCIDENT-CARD-001 — APK Flet API regression

**Наблюдение:** после сканирования APK падал с:
`AttributeError: module 'flet' has no attribute 'ElevatedButton'`.

**Корень:** контрольный FIX1 использовал Flet 1.0 API `ft.Button`, но при подготовке FIX2_STORAGE в `main.py` были возвращены два старых вызова `ft.ElevatedButton`. Это произошло вне заявленного storage-change и не было поймано reverse-diff до выдачи результата.

**Доказательство:** сравнение FIX1 → FIX2 показывает ровно два возврата `ElevatedButton`; сравнение FIX2 → FIX3 показывает замену этих двух вызовов на `ft.Button(content=...)`.

**Контроль из соседнего проекта B77:** INCIDENT-049 — Flet API mismatch; Flet 1.0 требует API-совместимый аудит. Также INCIDENT-055 — запрет каскада непроверенных изменений после последнего рабочего состояния.

**Корректирующий контроль:**
- Flet API compatibility audit перед каждым UI change.
- После каждого change — E2/reverse-diff до следующего change.
- Не брать новый файл/реализацию вместо WP только потому, что он новее.
- Не выдавать APK как проверенный без реального Android E3.

## APK контрольные SHA

- FIX1 main.py: `a9e808d83a89fa1d22982932baf628313b0fd8ea429efb06a24880a7b56ed01c`
- FIX2_STORAGE main.py: `b2d1fbad324537a7b03c21a5de36cc81d42312efe60dbb1358a547c9962a1c3c`
- FIX3_BUTTONFIX main.py: `47c60b53d30f5440e3ad96273ca21cf4bf30a9091a157c63793822f5f67f4a3b`
- FIX3 ZIP: `3912df9b45761f901909be70eb31d65f4ca7f3488909f2111f74ab294771c714`

FIX3 прошёл `py_compile`. Native scanner extension между FIX1/FIX2/FIX3 не изменялась.

**Статус FIX3:** UNVERIFIED — Android E3 отсутствует. Не считать WP.

## 2026-10-05 — Web/PWA regression

Последний GitHub HEAD:
`24e7174823791a84c6861c1a29d48ed703ccc72e`

Текущие blobs:
- index.html: `233862b8abae32da7d647ce601007cdabafecf1b`
- sw.js: `58371acf775379e494c3d132aab22c675188d77b` (cache v6)

Создана неизменяемая ветка анализа:
`quarantine/web-regression-20261005`

Ветка не является WP и не используется как база для исправления.

## Принцип восстановления

До следующего изменения:
1. определить последнюю E3-подтверждённую реализацию;
2. SHA-VERIFY;
3. BACKUP + PRE-CHANGE SNAPSHOT;
4. полный regression/UI contour;
5. один change;
6. E2;
7. reverse-diff;
8. regression;
9. E3;
10. только после E3 — новый WP.

## Источник опыта

Использованы материалы соседнего проекта B77, включая INCIDENT-049 и INCIDENT-055.
Материалы N99 в доступном Project/Library поиске отдельным идентифицируемым проектным
пакетом не обнаружены; не выдумывать отсутствующие записи.

## Запрет

До прохождения полного цикла проверки не выдавать пользователю новый APK/Web-релиз
как готовый или рабочий.


## 2026-10-06 — INCIDENT-CARD-002 — Web/PWA regression: карты исчезли после UI-фикса

**Наблюдение:** после изменения положения названия карты на «По центру» карты снова исчезли на ПК.

**Корень:** при подготовке коммита `c91fc8370f73aa7840e084ab5edd3f8fac9a8732` обновление `index.html` было выполнено с неполным содержимым файла: в рабочую ветку фактически попал только частичный файл. Это нарушило целостность приложения и отбросило рабочую JS-часть.

**Непосредственный сценарий:**
- предыдущий рабочий UI-фикс: `1c693a71c3f82e80740bd928b5b88f3562d58b3d`;
- затем при изменении 50% → 48% был записан неполный `index.html`;
- пользователь подтвердил регресс: карты исчезли на ПК;
- восстановление выполнено из полного рабочего коммита `1c693a71c3f82e80740bd928b5b88f3562d58b3d`;
- восстановленный файл содержит 909 строк;
- итоговый восстановительный коммит: `f6d82dd45b9137cad7b316ce7f16837a0a367dd2`.

**Нарушенный контроль:** перед записью файла не был выполнен контроль полноты файла и reverse-diff относительно предыдущего рабочего состояния.

**Обязательный контроль после INCIDENT-CARD-002:**
1. Перед каждым `update_file` получать полный текущий файл и его SHA.
2. Не использовать частичные диапазоны как источник полного файла.
3. Перед записью проверять полноту результата: строковый объём, наличие обязательных JS-блоков и контрольных функций.
4. После записи повторно читать именно записанный файл.
5. Делать reverse-diff с предыдущим рабочим SHA.
6. Проверять, что изменён только заявленный слой/участок.
7. Только после этого отдавать пользователю одну контрольную точку.
8. Любое изменение, после которого исчезают карты/ломается render/add/import/save, немедленно считать REGRESSION и восстанавливать последний E3/WP-кандидат, а не продолжать поверх него.

**Статус:** REGRESSION FIXED / E3 пользователя ещё требуется. Коммит `f6d82dd45b9137cad7b316ce7f16837a0a367dd2` считать восстановительным, а не новым WP до пользовательской проверки.


## 2026-10-10 — CARD111 design work — gradient feature was attached to the wrong layer

**Issue:** gradient controls were initially placed in the general card-color palette and implemented as the card element background. The user clarified that the gradient is intended for a card **cover/template** («рубашка»), not a separate background-color setting.

**Correction in this session:**
- moved the gradient entry point into the cover selection area for new and existing cards;
- renamed the editor to «Рубашка с градиентом»;
- choosing a gradient selects the «Свой вариант» cover, rather than a brand cover;
- retained 2/3 colors, angle control and middle-color position control;
- made editor preview preserve the gradient;
- made edit-save take the draft gradient settings from the editor state;
- isolated edit draft state from the stored card so Cancel does not mutate the saved card object in memory;
- removed the misplaced gradient button from the color palette.

**Code:** `index.html`, branch `candidate/CARD111-ui-2xN-20261006`, correction commits:
- `a0f3f5dfa692120f415ec22a91d5fd8c1e6646ae`
- `ac70d16b6fb8aba706a9154e8bcc20695c4bae4f`

**Checks:** latest `index.html` re-read from the target branch; both inline JavaScript blocks passed syntax compilation via `new Function`. Presence checks passed for the cover gradient entry point, edit-save persistence, settings function, card-detail/QR rendering function and 2-column grid. Browser interaction, reload persistence in an actual browser, and mobile-device behavior are **not verified**. The working-copy git status is unavailable because this session uses the remote GitHub API.

**Remaining:** review actual gradient behavior in browser; implement and verify real cover images, upload/replace/restore, brand defaults and backup/restore compatibility. Do not treat this correction as full design completion.
