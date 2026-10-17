# Принятые решения

## DEC-20261011-01: Использовать файловую память и историю изменений

Date: 2026-10-11 18:20
Status: accepted
Context: Необходимо сохранять контекст между сессиями и вести журнал изменений.
Decision: Использовать .agent/memory/ для памяти проекта и history/ для истории изменений.
Alternatives: Хранить контекст только в диалоге; использовать внешнюю базу знаний; вести только git-историю.
Consequences: Агент получает постоянную файловую память, но должен регулярно обновлять файлы.
Related task: TASK-20261011-01
## DEC-20261011-02: Держать кодовый патч отдельно от канонической памяти

Date: 2026-10-11 18:32
Status: accepted
Context: Пользователь запросил инициализацию памяти в CARD/main, тогда как недавние правки приложения сохранены в candidate.
Decision: Память, WORKLOG, PROJECT_STATE и HANDOFF вести в main. Код candidate не переносить в main до проверки и принятия; recovery-ветку не менять.
Alternatives: Смешать текущий непроверенный кодовый патч с main; вести второй конкурирующий комплект memory/docs в candidate.
Consequences: Каноническая история сохраняется отдельно от непроверенного релизного статуса; перед продвижением кода нужны syntax/runtime проверки и проверка source Pages.
Related task: TASK-20261011-02


## DEC-20261011-03: Геометрию предпросмотра определяет макет пользователя

Date: 2026-10-11 19:12
Status: accepted
Context: Интегрированный редактор показывал карту уменьшенной на ПК и телефоне; сравнение показало ограничения CSS 190–224px против исходной геометрии макета до 340px.
Decision: Удалить только конфликтующие правила ограничения preview width/max-width в отдельной минимальной правке; не переписывать дизайн и не менять функциональную логику.
Alternatives: Перестраивать редактор по собственному усмотрению; добавлять новые CSS overrides поверх существующих.
Consequences: Изменение CSS изолировано и легче откатывается; обязательны syntax/reverse-diff и визуальная проверка.
Related task: TASK-20261011-03


## DEC-20261017-01: RAW chat export precedes experience analysis

Date: 2026-10-17
Status: accepted
Context: Prior chat-history transfers risked losing conversation-specific evidence when similar facts were combined too early. The current task is to export the CARD111 chat for Agent memory.
Decision: First preserve the source transcript and provenance with its available order, roles, timestamps, message IDs, attachments, links and relationships. Keep analysis, semantic deduplication and knowledge extraction as separate later stages. Record gaps explicitly; do not reconstruct missing content from summaries.
Alternatives: Import directly into summarized memory; merge repeated events during export; infer missing messages from prior context.
Consequences: RAW remains auditable and reprocessable; the export is not considered complete until source coverage and attachment gaps are checked.
Related task: TASK-20261017-01
