let transactions =
  JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {
  const description =
    document.getElementById("description").value.trim();

  const amount =
    Number(document.getElementById("amount").value);

  const type =
    document.getElementById("type").value;

  if (description === "" || amount <= 0) {
    alert("Please enter a valid description and amount.");
    return;
  }

  const transaction = {
    id: Date.now(),
    description: description,
    amount: amount,
    type: type
  };

  transactions.push(transaction);

  saveTransactions();
  updateUI();

  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
}

function deleteTransaction(id) {
  transactions = transactions.filter(
    transaction => transaction.id !== id
  );

  saveTransactions();
  updateUI();
}

function saveTransactions() {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}

function updateUI() {
  const transactionList =
    document.getElementById("transactionList");

  transactionList.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach(transaction => {
    if (transaction.type === "income") {
      income += transaction.amount;
    } else {
      expense += transaction.amount;
    }

    const li = document.createElement("li");

    li.className = `transaction ${transaction.type}`;

    const sign =
      transaction.type === "income" ? "+" : "-";

    li.innerHTML = `
      <div class="transaction-info">
        <strong>${escapeHTML(transaction.description)}</strong>
        <span class="transaction-amount">
          ${sign} ₹${transaction.amount.toFixed(2)}
        </span>
      </div>

      <button
        class="delete-btn"
        onclick="deleteTransaction(${transaction.id})"
      >
        Delete
      </button>
    `;

    transactionList.appendChild(li);
  });

  const balance = income - expense;

  document.getElementById("income").textContent =
    `₹${income.toFixed(2)}`;

  document.getElementById("expense").textContent =
    `₹${expense.toFixed(2)}`;

  document.getElementById("balance").textContent =
    `₹${balance.toFixed(2)}`;
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

updateUI();
