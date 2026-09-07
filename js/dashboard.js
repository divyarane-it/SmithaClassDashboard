// Check login

if (
    window.location.pathname.includes("dashboard") &&
    localStorage.getItem("loggedIn") !== "true"
) {
    window.location.href = "login.html";
}


// Sidebar

function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle("show");

}


// Logout

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";

}


// Performance Chart

const performanceCanvas =
    document.getElementById("performanceChart");

if (performanceCanvas) {

    new Chart(performanceCanvas, {

        type: "line",

        data: {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug"
            ],

            datasets: [

                {
                    label: "Average Marks",

                    data: [
                        68,
                        72,
                        70,
                        76,
                        79,
                        82,
                        85,
                        88
                    ],

                    borderWidth: 3,

                    tension: .4,

                    fill: false

                }

            ]

        },

        options: {

            responsive: true,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {

                y: {
                    beginAtZero: false,
                    min: 50,
                    max: 100
                }

            }

        }

    });

}


// Attendance Chart

const attendanceCanvas =
    document.getElementById("attendanceChart");

if (attendanceCanvas) {

    new Chart(attendanceCanvas, {

        type: "doughnut",

        data: {

            labels: [
                "Present",
                "Absent",
                "Leave"
            ],

            datasets: [

                {
                    data: [
                        92,
                        5,
                        3
                    ],

                    borderWidth: 0

                }

            ]

        },

        options: {

            responsive: true,

            cutout: "70%",

            plugins: {

                legend: {
                    position: "bottom"
                }

            }

        }

    });

}