\# Test Coverage Summary: Signup Flow



\## At a glance



\- The signup test plan has 12 cases. Five are automated with Selenium (42%).

\- Five of the six High-priority cases are automated (83%).

\- CI runs the tests on every push. The latest run on `main` passed.



\## Coverage by priority



| Priority | Cases in plan | Automated | Coverage |

|---|---|---|---|

| High | 6 | 5 | 83% |

| Medium | 5 | 0 | 0% |

| Low | 1 | 0 | 0% |

| \*\*Total\*\* | \*\*12\*\* | \*\*5\*\* | \*\*42%\*\* |



\## Automated cases



| ID | Scenario | Priority | Tool |

|---|---|---|---|

| SU-01 | Valid signup creates an account | High | Selenium |

| SU-03 | Invalid email shows an error | High | Selenium |

| SU-04 | Empty form shows a required-field error | High | Selenium |

| SU-05 | Password below minimum length shows an error | High | Selenium |

| SU-07 | Mismatched passwords show an error | High | Selenium |



\## Not yet automated



\- SU-02 (High), duplicate email: needs a real backend, so it stays manual for now.

\- SU-06, SU-08, SU-09, SU-10, SU-11: possible against the sample page, planned as follow-ups.

\- SU-12 (Medium), confirmation email: needs a mailbox and a backend.



\## Other automation and CI



\- Login form: three Playwright tests, plus two Playwright sample tests.

\- CI: GitHub Actions (`selenium.yml`) runs the Selenium tests on every push and pull request. Playwright is not in CI yet.



\## Findings from the self-review



\- Test data is repeated across tests, so shared constants would be safer.

\- Only one invalid email format is covered.

\- The login and sample Playwright tests depend on outside websites.

\- A boundary test for exactly 8 characters (SU-06) is missing.



\## Next steps



1\. Move shared test data into constants.

2\. Add SU-06 and the other cases the sample page supports.

3\. Add Playwright to the CI workflow.

4\. Update the GitHub Actions versions to clear the Node.js warning.

