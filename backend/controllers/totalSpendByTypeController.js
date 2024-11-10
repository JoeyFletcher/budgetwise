const pool = require('../config/postgres_db'); // Import the PostgreSQL connection

// Function to fetch total spend by expense type for a specific user ID
const getTotalSpendByType = async (req, res) => {
  const userId = req.params.userId;
  const year = req.params.year;
  const month = req.params.month;

  try {
    const query = `
      SELECT
		u.user_id,
		u.first_name,
		u.last_name,
		ab.account_id,
        TO_CHAR(ct.transaction_date, 'YYYY') AS year,
        TO_CHAR(ct.transaction_date, 'MM') AS month,
        mcccd.expense_type,
        SUM(ct.amount) AS total_amount
      FROM client_transactions AS ct
      JOIN mcc_codes AS mcccd ON ct.mcc_code = mcccd.mcc
      JOIN users AS u ON ct.account_id = u.bank_account
      WHERE
        TO_CHAR(ct.transaction_date, 'YYYY') = $2 AND
        TO_CHAR(ct.transaction_date, 'MM') = $3 AND
        ct.db_cr = 'WITHDRAWAL' AND
        u.user_id = $1
      GROUP BY
	  	u.user_id,
		u.first_name,
		u.last_name,
		ab.account_id,
        TO_CHAR(ct.transaction_date, 'YYYY'),
        TO_CHAR(ct.transaction_date, 'MM'),
        mcccd.expense_type;
    `;
    const { rows } = await pool.query(query, [userId, year, month]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No transactions found for this user.' });
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Server error while fetching transactions' });
  }
};

// Export the getTotalSpendByType function
module.exports = {
	getTotalSpendByType
};