// 1. Датабанк шиг финтек компаниудад API-аар ирдэг бодит гүйлгээний өгөгдлийн загвар (Массив)
const mockTransactions = [
    { id: "TXN1001", type: "Орлого", amount: 250000, status: "SUCCESS" },
    { id: "TXN1002", type: "Зарлага", amount: 45000, status: "SUCCESS" },
    { id: "TXN1003", type: "Орлого", amount: 1200000, status: "PENDING" },
    { id: "TXN1004", type: "Зарлага", amount: 55000, status: "FAILED" },
    { id: "TXN1005", type: "Орлого", amount: 450000, status: "SUCCESS" }
];

// 2. Дэлгэц дээр гүйлгээнүүдийг уншиж харуулах функц
function renderTransactions(data) {
    const tbody = document.getElementById("transaction-rows");
    tbody.innerHTML = ""; // Хүснэгтийг цэвэрлэх

    data.forEach(tx => {
        // Танд хэрэгтэй финтек бодолт: Шимтгэл 1%-ийг тооцох
        const fee = tx.amount * 0.01;

        const row = `<tr>
            <td>${tx.id}</td>
            <td>${tx.type}</td>
            <td>${tx.amount.toLocaleString()} ₮</td>
            <td>${fee.toLocaleString()} ₮</td>
            <td class="${tx.status}">${tx.status}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// 3. Тест дээр алдсан логик: .filter() болон .reduce() ашиглан ЗӨВХӨН АМЖИЛТТАЙ орлогын нийлбэрийг олох
function calculateTotalIncome() {
    const total = mockTransactions
        .filter(tx => tx.status === "SUCCESS" && tx.type === "Орлого") // Эхлээд шүүнэ
        .reduce((sum, tx) => sum + tx.amount, 0); // Дараа нь нэмнэ

    document.getElementById("total-income").innerText = total.toLocaleString();
}

// 4. Дэлгэцийн товчлуурууд дээр дарахад шүүлтүүр хийх функц (.filter хэрэглээ)
function filterTransactions(status) {
    if (status === "ALL") {
        renderTransactions(mockTransactions);
    } else {
        const filtered = mockTransactions.filter(tx => tx.status === status);
        renderTransactions(filtered);
    }
}

// Аппликейшн анх ачаалагдахад ажиллах кодууд
renderTransactions(mockTransactions);
calculateTotalIncome();
