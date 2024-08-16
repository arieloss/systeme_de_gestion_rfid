document.addEventListener("DOMContentLoaded", () => {
    const rfidForm = document.getElementById("rfid-form");
    const searchForm = document.getElementById("search-form");

    // Fonction de validation des données
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhoneNumber(phone) {
        const re = /^[0-9]{10}$/;
        return re.test(String(phone));
    }

    // Fonction pour ajouter un nouvel élément RFID
    rfidForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const rfidId = document.getElementById("rfid-id").value;
        const additionalInfo = document.getElementById("additional-info").value;
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const academicYear = document.getElementById("academic-year").value;
        const phoneNumber = document.getElementById("phone-number").value;
        const email = document.getElementById("email").value;

        // Validation des données
        if (!validateEmail(email)) {
            document.getElementById("form-error-message").textContent = "Veuillez entrer une adresse email valide.";
            return;
        }

        if (!validatePhoneNumber(phoneNumber)) {
            document.getElementById("form-error-message").textContent = "Veuillez entrer un numéro de téléphone valide de 10 chiffres.";
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/rfid", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    rfid_id: rfidId, 
                    additional_info: additionalInfo,
                    first_name: firstName,
                    last_name: lastName,
                    academic_year: academicYear,
                    phone_number: phoneNumber,
                    email: email
                })
            });

            if (response.ok) {
                loadRfidData();
                rfidForm.reset();
                document.getElementById("form-error-message").textContent = "";
                alert("Carte RFID ajoutée avec succès.");
            } else {
                const data = await response.json();
                document.getElementById("form-error-message").textContent = `Erreur: ${data.detail}`;
            }
        } catch (error) {
            document.getElementById("form-error-message").textContent = `Erreur de connexion: ${error.message}`;
        }
    });

    // Fonction pour rechercher un élément RFID
    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const searchRfidId = document.getElementById("search-rfid-id").value;

        try {
            const response = await fetch(`http://localhost:8000/rfid/${searchRfidId}`);
            const data = await response.json();

            const searchResults = document.getElementById("search-results");
            searchResults.innerHTML = "";

            if (response.ok) {
                const result = `
                    <div>
                        <p><strong>ID RFID :</strong> ${data.rfid_id}</p>
                        <p><strong>Informations Supplémentaires :</strong> ${data.additional_info}</p>
                        <p><strong>Prénom :</strong> ${data.first_name}</p>
                        <p><strong>Nom :</strong> ${data.last_name}</p>
                        <p><strong>Année Universitaire :</strong> ${data.academic_year}</p>
                        <p><strong>Numéro de Téléphone :</strong> ${data.phone_number}</p>
                        <p><strong>Adresse Email :</strong> ${data.email}</p>
                        <p><strong>Date d'Enregistrement :</strong> ${data.created_at}</p>
                    </div>
                `;
                searchResults.innerHTML = result;
            } else {
                searchResults.innerHTML = `<p>${data.detail}</p>`;
            }
        } catch (error) {
            searchResults.innerHTML = `<p>Erreur de connexion: ${error.message}</p>`;
        }
    });

    // Fonction pour charger les données RFID et les afficher dans le tableau
    async function loadRfidData() {
        try {
            const response = await fetch("http://localhost:8000/rfid");
            const data = await response.json();
            const tableBody = document.getElementById("rfid-table-body");

            tableBody.innerHTML = "";

            data.forEach(item => {
                const row = document.createElement("tr");

                const cellId = document.createElement("td");
                cellId.textContent = item.rfid_id;
                row.appendChild(cellId);

                const cellInfo = document.createElement("td");
                cellInfo.textContent = item.additional_info;
                row.appendChild(cellInfo);

                const cellFirstName = document.createElement("td");
                cellFirstName.textContent = item.first_name;
                row.appendChild(cellFirstName);

                const cellLastName = document.createElement("td");
                cellLastName.textContent = item.last_name;
                row.appendChild(cellLastName);

                const cellAcademicYear = document.createElement("td");
                cellAcademicYear.textContent = item.academic_year;
                row.appendChild(cellAcademicYear);

                const cellPhoneNumber = document.createElement("td");
                cellPhoneNumber.textContent = item.phone_number;
                row.appendChild(cellPhoneNumber);

                const cellEmail = document.createElement("td");
                cellEmail.textContent = item.email;
                row.appendChild(cellEmail);

                const cellDate = document.createElement("td");
                cellDate.textContent = item.created_at;
                row.appendChild(cellDate);

                tableBody.appendChild(row);
            });
        } catch (error) {
            alert(`Erreur de connexion: ${error.message}`);
        }
    }

    // Charger les données RFID lors du chargement de la page
    loadRfidData();
});
