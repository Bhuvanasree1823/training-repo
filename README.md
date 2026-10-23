# Training Repo

Test automation practice project using Playwright and Selenium.

## Setup

```
npm install
npx playwright install
```

## Run tests

Playwright (sample and login tests):

```
npx playwright test
npx playwright show-report
```

Selenium (signup tests, needs Google Chrome):

```
npm run test:selenium
```

## Contents

- `tests/example.spec.js`: Playwright sample tests
- `tests/login.spec.js`: automated tests for a login form (3 cases)
- `selenium/signup.test.js`: Selenium tests for signup cases SU-01 and SU-07
- `app/signup.html`: sample signup page used by the signup tests
- `docs/Signup_Flow_Test_Plan.docx`: test plan for a signup flow (12 test cases)
- `.github/workflows/selenium.yml`: CI that runs the Selenium tests on every push

## Workflow

Changes are made on a branch, reviewed through a pull request, and merged into `main`.