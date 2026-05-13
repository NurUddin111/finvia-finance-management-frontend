// todo: add payment method(CASH/ONLINE)
// todo: set all products name as selective value of invoice item
// todo: if invoice is paid then add those item in products - done
// todo: race issue - If two admins trying to create invoice at the same time, then there is chance they are both going to get same invoice number which will cause a duplication error.
// issue: When new user creates business, then page is redirecting to dashboard but cannot destructure name from business, and if we refresh it is returning to onboarding page, multiple refresh but same result.And then if user logsout and login again then it is working fine.