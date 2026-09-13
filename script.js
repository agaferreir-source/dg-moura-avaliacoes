
// ======================================================
// DG MOURA CELL — PÁGINA DE AVALIAÇÕES
// ======================================================

// WhatsApp da DG Moura Cell
// Formato: 55 + DDD + número
const WHATSAPP_NUMBER = "5521987053760";

const stars = document.querySelectorAll(".star");
const ratingInput = document.getElementById("rating");
const ratingText = document.getElementById("ratingText");

const reviewForm = document.getElementById("reviewForm");
const messageInput = document.getElementById("message");
const counter = document.getElementById("counter");

const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");

const ratingLabels = {
    1: "Muito ruim",
    2: "Ruim",
    3: "Regular",
    4: "Muito bom",
    5: "Excelente!"
};


// ======================================================
// PINTAR AS ESTRELAS
// ======================================================

function paintStars(rating) {

    stars.forEach((star) => {

        const value = Number(star.dataset.rating);

        star.classList.toggle(
            "active",
            value <= rating
        );

    });

}


// ======================================================
// CLIQUE NAS ESTRELAS
// ======================================================

stars.forEach((star) => {

    star.addEventListener("click", () => {

        const rating = Number(
            star.dataset.rating
        );

        ratingInput.value = rating;

        paintStars(rating);

        ratingText.textContent =
            ratingLabels[rating];

        ratingText.style.color =
            "#f5c542";

        errorMessage.textContent = "";

    });


    star.addEventListener("mouseenter", () => {

        paintStars(
            Number(star.dataset.rating)
        );

    });

});


// ======================================================
// VOLTAR PARA A NOTA SELECIONADA
// ======================================================

document
    .getElementById("stars")
    .addEventListener("mouseleave", () => {

        paintStars(
            Number(ratingInput.value)
        );

    });


// ======================================================
// CONTADOR DE CARACTERES
// ======================================================

messageInput.addEventListener(
    "input",
    () => {

        counter.textContent =
            messageInput.value.length;

        messageInput.style.borderColor = "";

        errorMessage.textContent = "";

    }
);


// ======================================================
// ENVIO DA AVALIAÇÃO
// ======================================================

reviewForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const rating =
            Number(ratingInput.value);

        const name =
            document
                .getElementById("name")
                .value
                .trim();

        const service =
            document
                .getElementById("service")
                .value;

        const message =
            messageInput
                .value
                .trim();


        // ----------------------------------------------
        // VERIFICAR ESTRELAS
        // ----------------------------------------------

        if (rating === 0) {

            ratingText.textContent =
                "Por favor, selecione uma nota.";

            ratingText.style.color =
                "#ff7474";

            errorMessage.textContent =
                "Escolha de 1 a 5 estrelas.";

            return;

        }


        // ----------------------------------------------
        // VERIFICAR AVALIAÇÃO
        // ----------------------------------------------

        if (message.length < 3) {

            messageInput.focus();

            messageInput.style.borderColor =
                "#ff7474";

            errorMessage.textContent =
                "Escreva pelo menos algumas palavras sobre sua experiência.";

            return;

        }


        // ----------------------------------------------
        // MONTAR AS ESTRELAS
        // ----------------------------------------------

        const starsText =
            "⭐".repeat(rating) +
            "☆".repeat(5 - rating);


        // ----------------------------------------------
        // MONTAR MENSAGEM DO WHATSAPP
        // ----------------------------------------------

        const whatsappMessage =
`⭐ NOVA AVALIAÇÃO — DG MOURA CELL

Nota: ${starsText}

Cliente: ${name || "Não informado"}

Serviço: ${service || "Não informado"}

Avaliação:
${message}

Enviado pela página de avaliações da DG Moura Cell.`;


        // ----------------------------------------------
        // CRIAR LINK DO WHATSAPP
        // ----------------------------------------------

        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                whatsappMessage
            )}`;


        // ----------------------------------------------
        // MOSTRAR TELA DE SUCESSO
        // ----------------------------------------------

        reviewForm.style.display =
            "none";

        successMessage.classList.add(
            "show"
        );


        // ----------------------------------------------
        // ABRIR WHATSAPP
        // ----------------------------------------------

        setTimeout(() => {

            window.location.href =
                whatsappURL;

        }, 700);

    }
);
