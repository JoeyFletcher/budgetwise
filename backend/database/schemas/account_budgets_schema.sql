CREATE TABLE IF NOT EXISTS account_budgets (
	budget_id integer NOT NULL PRIMARY KEY, 
	account_id varchar(10) NOT NULL,
	budget_bucket_code integer NOT NULL,
	budget_amt integer NOT NULL
);

ALTER TABLE account_budgets
	OWNER TO "main-system";