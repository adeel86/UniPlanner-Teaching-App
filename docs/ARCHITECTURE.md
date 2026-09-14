# UniPlanner Architecture Notes

This document describes both the intentionally simple Week 1 design and the target structure for later teaching weeks.

## Week 1 component view

```mermaid
flowchart LR
  Student[Student] --> Tabs[Expo Router tab navigation]
  Tabs --> Dashboard[Dashboard screen]
  Tabs --> Modules[Modules screen]
  Tabs --> Assessments[Assessments screen]
  Tabs --> Profile[Profile screen]
  Dashboard --> Shared[Shared UI components]
  Modules --> Shared
  Assessments --> Shared
  Profile --> Shared
  Dashboard --> LocalData[Local sample data]
  Modules --> LocalData
  Assessments --> LocalData
  Profile --> LocalData
  Dashboard --> Storage[AsyncStorage task progress]
```

## Target MVVM view for Week 2+

```mermaid
flowchart LR
  View[Compose or React Native View] --> VM[ViewModel]
  VM --> Repo[Repository interface]
  Repo --> Local[Local data source]
  Repo --> API[REST API data source]
  VM --> State[Observable UI state]
  State --> View
```

The first build does not force this structure early. That is deliberate: students first see the problem of screen-level data access, then have a concrete reason to refactor.

## Data flow

```mermaid
sequenceDiagram
  participant S as Student
  participant V as Screen
  participant C as Planner context
  participant P as AsyncStorage

  S->>V: Tap a task
  V->>C: toggleTask(taskId)
  C->>C: Create updated task list
  C->>P: Save task list
  C-->>V: Updated state
  V-->>S: Checked task and progress summary
```

## API interaction target for Week 4

```mermaid
flowchart LR
  App[Mobile app] --> Repo[AssessmentRepository]
  Repo --> Client[HTTP client]
  Client --> API[REST API]
  API --> ModulesEndpoint[GET /modules]
  API --> AssessmentsEndpoint[GET /assessments]
  API --> AssessmentWrite[POST /assessments<br/>PUT /assessments/:id<br/>DELETE /assessments/:id]
  API --> JSON[JSON responses]
```

## Suggested package structure

```text
artifacts/uniplanner/
├── app/                 # Routes and screen composition
├── components/          # Reusable visual components
├── context/             # Shared Week 1 state
├── data/                # Week 1 models and sample data
├── constants/           # Theme tokens
└── hooks/               # Theme and reusable hooks

Later architecture:
├── domain/              # Entities and business rules
├── data/                # Repository implementations and DTO mapping
├── presentation/        # ViewModels and screen state
└── tests/               # Unit and integration tests
```