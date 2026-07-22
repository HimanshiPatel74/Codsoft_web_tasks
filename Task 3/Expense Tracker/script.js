let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

let editId = null;

function addTransaction(){

    let title = document.getElementById("title").value;
    let amount = document.getElementById("amount").value;
    let date = document.getElementById("date").value;
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;

    if(title=="" || amount=="" || date==""){
        alert("Fill all fields");
        return;
    }

    let transaction = {
    id: editId || Date.now(),
    title,
    amount: Number(amount),
    date,
    type,
    category
    
    };

    if (editId === null) {

        transactions.push(transaction);

    }
    else{


    transactions = transactions.map(function(item) {

        if (item.id === editId) {
            return transaction;
        }

        return item;

    });

    editId = null;

    }

    saveToLocalStorage();

    displayTransactions();

    updateSummary();

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("type").value = "income";
    document.getElementById("category").value = "Food";

    console.log(transactions);

}

function filterCategory() {

    let selectedCategory = document.getElementById("filter").value;

    let list = document.getElementById("list");

    list.innerHTML = "";

    let filteredTransactions;

    if (selectedCategory === "All") {

        filteredTransactions = transactions;

    } else {

        filteredTransactions = transactions.filter(function(transaction) {
            return transaction.category === selectedCategory;
        });

    }

    filteredTransactions.forEach(function(transaction) {

        list.innerHTML += `
        <tr>
            <td>${transaction.title}</td>
            <td>₹${transaction.amount}</td>
            <td>${transaction.date}</td>
            <td>${transaction.type}</td>
            <td>${transaction.category}</td>
            <td>
                <button class="edit-btn" onclick="editTransaction(${transaction.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
            </td>
        </tr>
        `;

    });

}

function displayTransactions() {

    let list = document.getElementById("list");

    list.innerHTML = "";

    transactions.forEach(function(transaction) {

        list.innerHTML += `
        <tr>
            <td>${transaction.title}</td>
            <td>₹${transaction.amount}</td>
            <td>${transaction.date}</td>
            <td>${transaction.type}</td>
            <td>${transaction.category}</td>
            <td>
                <button class="edit-btn" onclick="editTransaction(${transaction.id})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

}


function updateSummary() {

    let income = 0;
    let expense = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

    });

    document.getElementById("income").innerText = "₹" + income;
    document.getElementById("expense").innerText = "₹" + expense;
    document.getElementById("balance").innerText = "₹" + (income - expense);

}

function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {
        return transaction.id !== id;
    });



    saveToLocalStorage();

    filterCategory();

    updateSummary();

}

function editTransaction(id) {

    let transaction = transactions.find(function(item) {
        return item.id === id;
    });

    document.getElementById("title").value = transaction.title;
    document.getElementById("amount").value = transaction.amount;
    document.getElementById("date").value = transaction.date;
    document.getElementById("type").value = transaction.type;
    document.getElementById("category").value = transaction.category;

    editId = id;

}

function saveToLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

displayTransactions();
updateSummary();