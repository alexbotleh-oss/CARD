# Контекст проекта

Updated: 2026-10-11 18:32
Project goal: CARD111 — веб-кошелёк скидочных карт и визиток: хранение, оформление рубашек, предъявление QR/штрихкодов, сканирование камерой и по фото, импорт/экспорт; дальнейшее направление — APK.
Current focus: Инициализация устойчивой памяти завершена; сейчас нужно устранить конфликт между commit 86266ce и содержимым текущей ветки candidate, прежде чем проверять код.
Environment: HTML/CSS/JavaScript приложение в GitHub repository alexbotleh-oss/CARD. В этой сессии использовался удалённый GitHub API; локальный Git status и незакоммиченные изменения недоступны.
Constraints: Следовать точной спецификации пользователя. Не менять макет/логику от себя. Не переносить непроверенный код в main и не объявлять публикацию без доказательств. Recovery-точку не изменять.
Important files:
  - index.html — приложение.
  - .agent/memory/tasks.md — активные задачи и критерии.
  - .agent/memory/context.md — текущий контекст.
  - .agent/memory/decisions.md — принятые решения.
  - .agent/memory/lessons.md — уроки.
  - history/YYYY-MM-DD.md — append-only история.
  - docs/WORKLOG.md — хронология.
  - docs/PROJECT_STATE.md — актуальный статус.
  - docs/HANDOFF.md — передача следующему агенту.
  - docs/CARD_ERROR_LOG_2026-10-05.md — история инцидентов.
Current state: memory/history/docs в main обновлены и повторно прочитаны. Commit 86266ce012de5785b0c6df5d7519f769e8d849db существует, его diff содержит scanner/camera controls, JSON replace/merge и auto-save (index blob bd20167d44c3e3e88b1c0fb49702551806e763d4). Но запрос текущего ref candidate/CARD111-ui-2xN-20261006 вернул index blob ca419b9f1a8e388ea09263f64104d6f3c755f1f4 (91,748 bytes) без этих маркеров. Это конфликт API-источников; HEAD ветки не установлен с достаточной определённостью. Recovery branch recovery/CARD111-before-scanner-integration-20261011 содержит pre-patch index blob 97cb89dc774278cf2891098172f23494a29c9f38.
Next action: Однозначно установить HEAD candidate и выяснить, входит ли commit 86266ce в текущую историю ветки; только затем проверять синтаксис точного файла.
Open risks: Не разрешён конфликт branch ref vs commit; JS syntax после patch не проверен; browser/Android runtime и фактический источник GitHub Pages не подтверждены. Не утверждать, что patch присутствует в текущем HEAD или опубликован.