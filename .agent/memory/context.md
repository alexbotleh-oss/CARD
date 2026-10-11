# Контекст проекта

Updated: 2026-10-11 18:32
Project goal: CARD111 — веб-кошелёк скидочных карт/визиток: хранение карт, редактор рубашек, предъявление QR/штрихкодов, сканирование камеры/фото, импорт/экспорт резервных копий; дальнейшее направление — APK.
Current focus: Зафиксировать непрерывность проекта и проверить scanner/second-code/JSON changes в рабочей ветке; затем установить фактический источник GitHub Pages.
Environment: Однофайловое HTML/CSS/JS приложение в GitHub repository alexbotleh-oss/CARD. В этом сеансе операции проводились через удалённый GitHub API; локальный Git status недоступен.
Constraints: Пользователь требует точного исполнения спецификации без самовольных изменений макета. Не переносить код в main и не считать Pages опубликованным без подтверждения. Сохранять recovery.
Important files:
  - index.html — приложение CARD111.
  - .agent/memory/tasks.md — активные задачи.
  - .agent/memory/context.md — текущее состояние.
  - .agent/memory/decisions.md — решения.
  - .agent/memory/lessons.md — уроки.
  - history/YYYY-MM-DD.md — append-only хронология.
  - docs/WORKLOG.md — хронология работ.
  - docs/PROJECT_STATE.md — текущее состояние.
  - docs/HANDOFF.md — передача следующему чату.
  - docs/CARD_ERROR_LOG_2026-10-05.md — журнал инцидентов.
Current state: Файловая память существует в main, но tasks.md был пуст, а context.md оставался шаблонным. Рабочая ветка candidate/CARD111-ui-2xN-20261006 содержит коммит index.html 86266ce012de5785b0c6df5d7519f769e8d849db и blob bd20167d44c3e3e88b1c0fb49702551806e763d4. Recovery: recovery/CARD111-before-scanner-integration-20261011; прежний index blob 97cb89dc774278cf2891098172f23494a29c9f38.
Next action: Завершить запись memory/history/docs в main и проверить сохранение; затем выполнить JS syntax check для candidate.
Open risks: JS syntax после последней правки не проверен, browser/Android runtime не проверен, Pages source/deployed HTML не подтверждены. Работоспособность новых кнопок фонарика/переключения камеры, replace/merge JSON и автосохранения не доказана runtime-тестом. Локальные незакоммиченные изменения недоступны через API.
