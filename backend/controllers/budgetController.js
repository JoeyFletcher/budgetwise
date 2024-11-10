const pool = require('../config/postgres_db'); // Import the PostgreSQL connection

// Function to fetch budgets for a specific user ID
const getBudgets = async (req, res) => {
	const userId = req.params.userId;

	try {
		const query = `
			SELECT
				u.user_id,
				u.first_name,
				u.last_name,
				ab.account_id,
				ab.budget_bucket_code,
				bb.expense_type,
				ab.budget_amt
			FROM account_budgets AS ab
			JOIN users AS u ON ab.account_id = u.bank_account
			JOIN budget_buckets AS bb ON ab.budget_bucket_code = bb.budget_bucket_code
			WHERE u.user_id = $1;
		`;
		const { rows } = await pool.query(query, [userId]);
		if (rows.length === 0) {
			return res.status(404).json({ message: 'No budgets found for this user.' });
		}
		res.status(200).json(rows);
	} catch (error) {
		console.error('Error fetching budgets:', error);
		res.status(500).json({ error: 'Server error while fetching budgets' });
	}
};

// Export the getBudgets function
module.exports = {
	getBudgets
};