
const SUPABASE_URL = "https://xwfzfmvnqklwykkjfbkl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_2wfoAwTlLbD_l6yQWiGvCg_x5TE02Dt";
const ADMIN_USER_ID = "9563f9b3-9893-45d1-ad4c-03b929f693a4";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

// Verify the signed-in admin before showing the dashboard.
async function checkAdminSession() {
    const { data, error } = await supabaseClient.auth.getUser();

    if (error || !data.user || data.user.id !== ADMIN_USER_ID) {
        await supabaseClient.auth.signOut();
        window.location.replace("login.html");
        return false;
    }

    return true;
}

// Protect dashboard pages and initialize their features only after validation.
const isDashboardPage =
    window.location.pathname.toLowerCase().includes("dashboard");

if (isDashboardPage) {
    checkAdminSession().then(isAdmin => {
        if (isAdmin) initializeDashboard();
    });
} else {
    initializeDashboard();
}

function initializeDashboard() {
    // Sidebar
    window.toggleSidebar = function () {
        document.getElementById("sidebar")?.classList.toggle("show");
    };

    // Logout
    window.logout = async function () {
        await supabaseClient.auth.signOut();
        window.location.href = "login.html";
    };

    // Performance Chart
    const performanceCanvas = document.getElementById("performanceChart");

    if (performanceCanvas && typeof Chart !== "undefined") {
        new Chart(performanceCanvas, {
            type: "line",
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
                datasets: [{
                    label: "Average Marks",
                    data: [68, 72, 70, 76, 79, 82, 85, 88],
                    borderWidth: 3,
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: false, min: 50, max: 100 }
                }
            }
        });
    }

    // Attendance Chart
    const attendanceCanvas = document.getElementById("attendanceChart");

    if (attendanceCanvas && typeof Chart !== "undefined") {
        new Chart(attendanceCanvas, {
            type: "doughnut",
            data: {
                labels: ["Present", "Absent", "Leave"],
                datasets: [{
                    data: [92, 5, 3],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: "70%",
                plugins: { legend: { position: "bottom" } }
            }
        });
    }
}
