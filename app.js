document.addEventListener("DOMContentLoaded", function () {

    const teamFilter = document.getElementById("team-filter");
    const matchTable = document.querySelector("#matches tbody");
    const bookingForm = document.querySelector("#booking form");
    const matchSelect = document.getElementById("match");
    const standSelect = document.getElementById("stand");
    const quantityInput = document.getElementById("quantity");
    const bookingRecords = document.querySelector("#my-bookings tbody");

    // Ticket prices
    const ticketPrices = {
        General: 800,
        Premium: 1800,
        VIP: 4500
    };

    // Team Filter
    if (teamFilter && matchTable) {
        teamFilter.addEventListener("change", function () {

            const selectedTeam = teamFilter.value;
            const rows = matchTable.querySelectorAll("tr");

            rows.forEach(function (row) {
                const teams = row.cells[1].textContent;

                row.hidden =
                    selectedTeam !== "all" &&
                    !teams.includes(selectedTeam);
            });
        });
    }

    // Ticket Booking Summary
    function updateSummary() {

        const match = matchSelect.value;
        const stand = standSelect.value;
        const quantity = Number(quantityInput.value) || 1;

        const price = ticketPrices[stand] || 0;
        const total = price * quantity;

        const summary = document.getElementById("booking-summary");
        const paragraphs = summary.querySelectorAll("p");

        paragraphs[0].textContent =
            "Selected Match: " + (match || "Not selected");

        paragraphs[1].textContent =
            "Stand Category: " + (stand || "Not selected");

        paragraphs[2].textContent =
            "Ticket Price: ₹" + price;

        paragraphs[3].textContent =
            "Number of Tickets: " + quantity;

        paragraphs[4].textContent =
            "Total Amount: ₹" + total;
    }

    matchSelect.addEventListener("change", updateSummary);
    standSelect.addEventListener("change", updateSummary);
    quantityInput.addEventListener("input", updateSummary);

    // Book Button from Match Schedule
    matchTable.querySelectorAll('a[href="#booking"]').forEach(function (button) {

        button.addEventListener("click", function () {

            const row = button.closest("tr");
            const teams = row.cells[1].textContent.trim();

            const option = Array.from(matchSelect.options).find(function (item) {
                return item.textContent.trim() === teams;
            });

            if (option) {
                matchSelect.value = option.value;
                updateSummary();
            }
        });
    });

    // Booking Form Submission
    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!bookingForm.checkValidity()) {
            bookingForm.reportValidity();
            return;
        }

        const name = document.getElementById("name").value;
        const match = matchSelect.value;
        const stand = standSelect.value;
        const quantity = Number(quantityInput.value);
        const total = (ticketPrices[stand] || 0) * quantity;

        // Remove empty table message
        const placeholder = bookingRecords.querySelector("td[colspan]");

        if (placeholder) {
            placeholder.closest("tr").remove();
        }

        // Create new booking row
        const row = document.createElement("tr");

        const values = [
            "IPL-" + Date.now().toString().slice(-6),
            name,
            match,
            stand,
            quantity,
            "₹" + total
        ];

        values.forEach(function (value) {

            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);

        });

        bookingRecords.appendChild(row);

        alert("Booking successful! This is a demo booking.");

        bookingForm.reset();
        updateSummary();
    });

    // Initial Summary
    updateSummary();

});
