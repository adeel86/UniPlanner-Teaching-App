# UniPlanner Teaching Notes

UniPlanner is designed to support a visible teaching narrative:

> Problem → Design Decision → Implementation → Testing → Refactoring → Improved Design

Each milestone should leave the app runnable. The code should be discussed as a learning aid rather than presented as the only correct production architecture.

## Week 1 — Mobile fundamentals

### Demonstrate

- Create a small mobile app with Expo and TypeScript.
- Identify the four main screens: Dashboard, Modules, Assessments, and Profile.
- Trace file-based navigation in `app/(tabs)/` and the detail routes.
- Identify reusable components in `components/PlannerUI.tsx`.
- Change local state by completing a task and observe the immediate UI update.
- Close and reopen the preview to discuss why task progress is persisted locally.

### Teaching questions

- Which code belongs to presentation, and which code represents the data?
- What is easy to change in this version?
- What would become difficult if every screen fetched and edited data itself?
- Which parts would you want to test before adding more features?

### Deliberate limitations

- The sample data is local and intentionally simple.
- Screens know where their data comes from.
- There is no remote API, authentication, or database.
- The small amount of duplication is useful material for a later refactoring discussion.

## Week 2 — Architecture

- Move domain types and data access behind a repository.
- Introduce ViewModels or equivalent presentation state holders.
- Keep screens focused on rendering state and sending user events.
- Compare the original Week 1 flow with the refactored flow.
- Explain the trade-off: more files and indirection in exchange for clearer responsibilities and easier tests.

## Week 3 — Design patterns and SOLID

- Identify MVVM and Repository as patterns that solve an actual problem.
- Use observable/reactive state for loading and screen state.
- Introduce dependency injection only where it improves substitution in tests.
- Review single responsibility, dependency inversion, and interface segregation with concrete examples.
- Avoid adding patterns just to label the project as advanced.

## Week 4 — REST API and data integration

- Replace the local repository implementation with a REST-backed implementation.
- Add GET modules, GET assessments, and assessment create/update/delete flows.
- Make loading, success, empty, error, and network failure states visible.
- Keep the ViewModel unaware of HTTP details.
- Compare the API repository with the Week 1 local data source.

## Week 5 — Testing, smells, and refactoring

- Test validation and business rules first.
- Test ViewModel state transitions using fake repositories.
- Test repository success and failure paths.
- Show a deliberately large screen or long method, then refactor it.
- Discuss duplicate code, tight coupling, and inappropriate responsibility.
- Use meaningful names in tests so the expected behaviour is obvious.

## Week 6 — Professional software engineering

- Review meaningful commits and branch boundaries.
- Demonstrate a pull request with a small, reviewable change.
- Run type checking and automated tests in CI.
- Use the README as a guide for a new contributor.
- Finish with a code review that asks whether the design makes future change safer.