document.addEventListener("DOMContentLoaded", () => {

    const WHATSAPP_NUMBER = "5521987053760";

    const form = document.getElementById("reviewForm");
    const ratingInput = document.getElementById("rating");
    const ratingText = document.getElementById("ratingText");
    const serviceRatingInput = document.getElementById("serviceRatingValue");
    const recommendationInput = document.getElementById("recommendationValue");
    const messageInput = document.getElementById("message");
    const nameInput = document.getElementById("name");
    const serviceInput = document.getElementById("service");
    const counter = document.getElementById("counter");
    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");



    /* =========================================
       NOTA GERAL
    ========================================= */

    const stars = document.querySelectorAll(".star");

    const ratingLabels = {
        1: "Muito ruim",
        2: "Ruim",
        3: "Regular",
        4: "Muito bom",
        5: "Excelente"
    };


    function updateMainStars(value) {

        stars.forEach((star) => {

            const starValue = Number(star.dataset.rating);

            star.classList.toggle(
                "active",
                starValue <= value
            );

        });

        ratingText.textContent =
            value > 0
                ? `${value} de 5 — ${ratingLabels[value]}`
                : "Toque nas estrelas para avaliar";
    }


    stars.forEach((star) => {

        star.addEventListener("click", () => {

            const value = Number(star.dataset.rating);

            ratingInput.value = value;

            updateMainStars(value);

            clearError();

        });

    });



    /* =========================================
       AVALIAÇÃO DO ATENDIMENTO
    ========================================= */

    const serviceButtons =
        document.querySelectorAll(".choice-button");


    serviceButtons.forEach((button) => {

        button.addEventListener("click", () => {

            serviceButtons.forEach((item) => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            serviceRatingInput.value =
                button.dataset.value;

            clearError();

        });

    });



    /* =========================================
       CRITÉRIOS
    ========================================= */

    const criteriaNames = {
        atendimento: "Atendimento",
        qualidade: "Qualidade do serviço",
        prazo: "Prazo de entrega",
        custo: "Custo-benefício",
        organizacao: "Organização"
    };


    const criteriaValues = {
        atendimento: 0,
        qualidade: 0,
        prazo: 0,
        custo: 0,
        organizacao: 0
    };


    const criteriaLabels = {
        1: "Muito ruim",
        2: "Ruim",
        3: "Regular",
        4: "Muito bom",
        5: "Excelente"
    };


    const criteriaGroups =
        document.querySelectorAll(".mini-stars");


    criteriaGroups.forEach((group) => {

        const criteria =
            group.dataset.criteria;

        const buttons =
            group.querySelectorAll("button");

        const text =
            document.getElementById(
                `criteria-${criteria}-text`
            );


        buttons.forEach((button) => {

            button.addEventListener("click", () => {

                const value =
                    Number(button.dataset.value);

                criteriaValues[criteria] = value;


                buttons.forEach((item) => {

                    const itemValue =
                        Number(item.dataset.value);

                    item.classList.toggle(
                        "active",
                        itemValue <= value
                    );

                });


                text.textContent =
                    criteriaLabels[value];

                clearError();

            });

        });

    });



    /* =========================================
       RECOMENDAÇÃO
    ========================================= */

    const recommendationButtons =
        document.querySelectorAll(".recommend-button");


    recommendationButtons.forEach((button) => {

        button.addEventListener("click", () => {

            recommendationButtons.forEach((item) => {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            recommendationInput.value =
                button.dataset.value;

            clearError();

        });

    });



    /* =========================================
       CONTADOR DO COMENTÁRIO
    ========================================= */

    messageInput.addEventListener("input", () => {

        counter.textContent =
            messageInput.value.length;

    });



    /* =========================================
       ERRO
    ========================================= */

    function showError(message) {

        errorMessage.textContent = message;

        errorMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    function clearError() {

        errorMessage.textContent = "";

    }



    /* =========================================
       ESTRELAS EM TEXTO
    ========================================= */

    function starsText(value) {

        const number = Number(value);

        if (!number) {
            return "Não informado";
        }

        return "⭐".repeat(number) +
            "☆".repeat(5 - number);

    }



    /* =========================================
       ENVIO DA AVALIAÇÃO
    ========================================= */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        clearError();


        const rating =
            Number(ratingInput.value);

        const serviceRating =
            serviceRatingInput.value.trim();

        const service =
            serviceInput.value.trim();

        const message =
            messageInput.value.trim();

        const name =
            nameInput.value.trim();

        const recommendation =
            recommendationInput.value.trim();



        /* =====================================
           VALIDAÇÕES
        ===================================== */

        if (rating < 1 || rating > 5) {

            showError(
                "Por favor, selecione uma nota geral."
            );

            return;

        }


        if (!serviceRating) {

            showError(
                "Por favor, avalie nosso atendimento."
            );

            return;

        }


        if (!service) {

            showError(
                "Por favor, selecione o serviço realizado."
            );

            serviceInput.focus();

            return;

        }


        for (const key in criteriaValues) {

            if (criteriaValues[key] < 1) {

                showError(
                    `Por favor, avalie o critério "${criteriaNames[key]}".`
                );

                return;

            }

        }


        if (!recommendation) {

            showError(
                "Por favor, informe se você recomendaria a DG Moura Cell."
            );

            return;

        }


        if (!message) {

            showError(
                "Por favor, escreva um comentário sobre sua experiência."
            );

            messageInput.focus();

            return;

        }



        /* =====================================
           NOME
        ===================================== */

        const clientName =
            name || "Não informado";



        /* =====================================
           MENSAGEM WHATSAPP
        ===================================== */

        const whatsappMessage =

`⭐ NOVA AVALIAÇÃO — DG MOURA CELL

${starsText(rating)} ${rating}/5 — ${ratingLabels[rating].toUpperCase()}

👤 Cliente: ${clientName}
🔧 Serviço: ${service}

📊 AVALIAÇÃO DOS CRITÉRIOS

Atendimento: ${starsText(criteriaValues.atendimento)}
Qualidade: ${starsText(criteriaValues.qualidade)}
Prazo: ${starsText(criteriaValues.prazo)}
Custo-benefício: ${starsText(criteriaValues.custo)}
Organização: ${starsText(criteriaValues.organizacao)}

🤝 AVALIAÇÃO DO ATENDIMENTO

${serviceRating}

❤️ O QUE MAIS GOSTOU / O QUE PODEMOS MELHORAR

"${message}"

📢 RECOMENDARIA A DG MOURA CELL?

${recommendation.toUpperCase()}

📱 Avaliação enviada pelo QR Code da loja.`;



        /* =====================================
           ABRIR WHATSAPP
        ===================================== */

        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                whatsappMessage
            )}`;


        window.open(
            whatsappURL,
            "_blank"
        );



        /* =====================================
           TELA DE SUCESSO
        ===================================== */

        form.style.display = "none";

        successMessage.classList.add("show");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});
