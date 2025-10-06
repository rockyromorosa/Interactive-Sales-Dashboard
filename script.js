// --- Existing Chart Code ---
const ctx = document.getElementById('myChart').getContext('2d');

let salesData = [12, 19, 3, 5, 2, 3, 7];
let labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Sales',
      data: salesData,
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
      fill: true
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } }
  }
});

// --- Modal Logic ---
const modal = document.getElementById("recordModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close");
const form = document.getElementById("recordForm");

openBtn.onclick = () => { modal.style.display = "block"; }
closeBtn.onclick = () => { modal.style.display = "none"; }
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

// --- Dark Mode Toggle ---
const toggleBtn = document.getElementById("toggleTheme");
let darkMode = false;

toggleBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark-mode", darkMode);
  toggleBtn.innerHTML = darkMode 
  ? "☀️ <span>Light Mode</span>" 
  : "🌙 <span>Dark Mode</span>";

});

// --- Sidebar Navigation ---
const menuItems = document.querySelectorAll(".menu-item");
const sections = document.querySelectorAll(".page-section");
const pageTitle = document.getElementById("pageTitle");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    // Remove active class from all items
    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    // Hide all sections
    sections.forEach(sec => sec.classList.remove("active"));

    // Show selected section
    const page = item.getAttribute("data-page");
    document.getElementById(page + "Page").classList.add("active");

    // Update title
    pageTitle.textContent = item.textContent;
  });
});



// --- Add Record Logic ---
form.addEventListener("submit", function(e) {
  e.preventDefault();
  
  let day = document.getElementById("day").value;
  let salesValue = parseInt(document.getElementById("salesInput").value);

  // Update data
  let index = labels.indexOf(day);
  if (index !== -1) {
    salesData[index] += salesValue; // add sales to existing day
  } else {
    labels.push(day);
    salesData.push(salesValue);
  }

  // Update chart
  chart.update();

  

  // Update cards
  let totalUsers = parseInt(document.getElementById("users").textContent);
  let totalSales = parseInt(document.getElementById("sales").textContent);
  let totalRevenue = parseInt(document.getElementById("revenue").textContent);

  document.getElementById("sales").textContent = totalSales + salesValue;
  document.getElementById("revenue").textContent = totalRevenue + (salesValue * 12); // assume avg $12 per sale

  // Close modal
  modal.style.display = "none";
  form.reset();
});

// --- Reports Page Chart ---
const reportsCtx = document.getElementById('reportsChart').getContext('2d');

const reportsChart = new Chart(reportsCtx, {
  type: 'bar',
  data: {
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Total Sales ($)',
        data: [4200, 5300, 4800, 6100],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'New Users',
        data: [300, 400, 350, 500],
        backgroundColor: 'rgba(255, 205, 86, 0.6)',
        borderColor: 'rgba(255, 205, 86, 1)',
        borderWidth: 1
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Quarterly Performance'
      }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

