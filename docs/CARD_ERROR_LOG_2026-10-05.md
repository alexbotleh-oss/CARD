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

## 2026-10-05 — INCIDENT-CARD-002 — Web scanner syntax regression

**Наблюдение:** текущий `index.html` не проходил JavaScript parse: script3 завершался `SyntaxError: missing ) after argument list`.

**Корень:** scanner FIX добавил лишнее экранирование кавычек в строке кнопки галереи: `\\\\'scanFile\\\\'` вместо `\\'scanFile\\'` внутри JS-строки. Это делало весь основной script неисполняемым.

**Контроль:** E2 parse текущего `index.html` после исправления — все 4 script-блока PASS. Reverse-diff — ровно 1 строка. Service-worker cache поднят v6 → v7, чтобы устройство не удерживало дефектный cached index.

**Статус:** Web FIX синтаксически подтверждён E2; live/device E3 ещё отсутствует. Не считать новым WP.
