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


## 2026-10-10 — CARD111 design work — cover image upload and brand defaults

**Implemented in `index.html`:**
- separate cover-image upload in both new-card and edit-card cover pickers;
- resize uploaded cover artwork to a maximum of 1400×900 before local storage;
- per-card `coverImage` overrides the brand default;
- optional checkbox to set the uploaded image as the brand's default cover;
- restore-to-standard action removes the individual override;
- brand defaults stored in `card_cover_defaults_v1`;
- JSON backup exports `brandCovers`, and import restores it when present;
- legacy recovery normalization retains `coverImage`.

**Commit:** `6167d0951ff2d1e50d9799e5617086cb4ba3e4c8` (cover upload/defaults); follow-up `ad8c76521c656feecca1f3c870f1ed0e6e85c233` (legacy recovery field).

**Checks:** latest `index.html` read back from branch; both inline JavaScript blocks passed syntax compilation; static checks confirm upload controls, default-map persistence, backup/restore wiring, QR/detail function, settings function and 2-column grid. Browser upload, actual image persistence after restart, backup/restore round-trip, and phone behavior remain unverified.

**Open requirement:** real local brand-cover image assets are not yet in the repository. The current catalog still contains CSS artwork/color treatments. Do not call the cover-design work complete until real images are added and tested.


## 2026-10-10 — Built-in retailer cover image sources

**Commit:** `a891b5f72c594b1bcf5a15681c8be8b720f04c0f`

Added `BUILTIN_COVER_IMAGES` URL fallbacks for:
- Pyaterochka: `https://xn----7sbavphe5ahhetd7ezf.xn--p1ai/pic/card.png`
- Magnit: `https://anapagorkogo11.ru/karta-magnit-aktivirovat.JPG`
- Perekrestok: `https://papik.pro/grafic/uploads/posts/2023-04/1681503399_papik-pro-p-logotip-perekrestok-vektor-50.jpg`
- Lenta: `https://imgproxy.kuper.ru/imgproxy/size-500-500/czM6Ly9jb250ZW50LWltYWdlcy1wcm9kL3Byb2R1Y3RzLzQ0NjkyNjU1L29yaWdpbmFsLzEvMjAyNS0wMi0wMyUyMDEyJTNBNTQlM0E1NS44MjcwNzklMkIwMCUzQTAwLzQ0NjkyNjU1XzEuanBn.jpg`

Resolution order: individual card image > user-defined brand default > built-in image URL. These are external image sources, not repository-local assets. URL reachability, rendering, licensing, offline behavior and browser/device appearance have not been verified. Do not mark image integration fully tested until those checks pass.


## 2026-10-10 — CARD111: optional second code (implementation; browser verification pending)

**Запрос:** для одной карты разрешить включить «Второй код» в настройках, добавить его сканированием и переключать код на экране предъявления, как в приложении «Пятёрочка».

**Изменение:** в `index.html` добавлены поля редактора для второго кода, кнопка запуска существующего сканера, сохранение `secondCode`/`secondFormat`, переключатель основного/второго кода на экране карты и импорт полей из JSON backup. Основной код не перезаписывается вторым. Если второй код не задан, переключатель не показывается. Коммит: `ab9e217d2d0c1edf349022711cb70942993d437d`.

**Проверено:** оба inline JavaScript-блока проходят синтаксическую проверку; статические проверки подтвердили наличие UI, сканирования, сохранения, переключения и import mapping.

**Не проверено:** запуск на реальном браузере/телефоне, фактическое считывание камерой, рендер каждого типа кода, перезапуск и полный экспорт/импорт. Поэтому задача пока не считается end-to-end проверенной.

**Риск:** текущая работа через GitHub API не предоставляет состояние локальной рабочей копии и сама по себе не доказывает визуальную корректность. Handoff-файл отдельным поиском в репозитории не обнаружен; контекст и следующий шаг зафиксированы в `docs/CARD111_DESIGN_PROGRESS.md`.


## 2026-10-10 — code display mismatch found in mobile screenshot

**Наблюдение пользователя:** in the CARD111 screenshot, the toggle labels said “Основной код / Второй код”, unlike the reference “QR-код / Штрихкод”; the displayed linear code did not prove that its format was valid/readable.

**Corrections:** labels now reflect each saved code's format (QR vs linear barcode). Unsupported formats no longer silently fall back to Code 128; the UI displays an explicit unsupported-format message instead. Commits: `113bbf8`, `9e12eec`.

**Static verification:** both inline JavaScript blocks pass syntax checks after the latest change. No browser/device scan test has been performed. Do not mark barcode readability or visual parity as verified.


## 2026-10-10 — PDF417 was incorrectly classified as Code 128

**Evidence:** user screenshot after rescanning showed the stored format label “PDF417”, but scanner flow was falling back to Code 128 for formats it could not map. In ZXing results, `getBarcodeFormat()` can be a numeric enum; old `mapFormat` only inspected strings and returned `CODE_128` as its fallback.

**Fix:** map numeric ZXing BarcodeFormat enum values (including PDF417), return an explicit unknown format instead of Code 128 for unknown values, request PDF417/Data Matrix in native camera formats when supported, and render PDF417/Data Matrix with bwip-js. Commit: `48bbe4b18579d2ce6120b63ab0b9c27cc5774a17`.

**Verification:** both inline JavaScript blocks pass syntax checks. Real device scan/render and CDN availability are not yet verified.


## 2026-10-10 — custom cover images need framing controls

**Requirement:** user-supplied cover images must be movable and resizable inside a card-shaped frame before being compressed and saved.

**Change:** added a touch/pointer crop modal with scale slider and drag-to-position. Confirmation renders the selected area at 3× card dimensions and encodes a compressed WebP (JPEG fallback) data URL for the card draft. Commit: `dc2e7f09b69937c34a12ac2281d8ef48551cfe67`.

**Verification:** static syntax checks pass for both inline scripts. Mobile gesture behavior and persistence/backup round-trip still require browser/device testing.

## 2026-10-11 — audit of cover persistence and backup round-trip

**Reviewed:** current `index.html` on `candidate/CARD111-ui-2xN-20261006`, especially `coverImageForCard`, `bindCoverImagePicker`, `exportData`, `readImport`, and second-code fields.

**Confirmed from code:** backup export serializes `cards` and `brandCovers`; card objects include `coverImage`, `secondCode`, and `secondFormat` during import mapping.

**Risk identified (not yet modified):** import overwrites the active card array, and the code does not appear to validate before replacing it that at least one valid card remains. An empty/invalid-but-parseable `cards` array can therefore replace the current set. The import also applies `brandCovers` before the card mapping/save completes, so a later failure could leave defaults changed while card data was not restored. This needs a separate minimal defensive patch and explicit malformed/empty backup tests.

**Verification level:** source inspection only; no browser or physical-device round-trip test performed. No claim of end-to-end backup safety.
