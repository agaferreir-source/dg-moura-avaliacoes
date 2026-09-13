document.addEventListener("DOMContentLoaded", () => {

    const WHATSAPP_NUMBER = "5521987053760";

    const form = document.getElementById("reviewForm");

    const ratingInput =
        document.getElementById("rating");

    const ratingText =
        document.getElementById("ratingText");

    const serviceRatingInput =
        document.getElementById("serviceRatingValue");

    const recommendationInput =
        document.getElementById("recommendationValue");

    const messageInput =
        document.getElementById("message");

    const nameInput =
        document.getElementById("name");

    const serviceInput =
        document.getElementById("service");

    const counter =
        document.getElementById("counter");

    const errorMessage =
        document.getElementById("errorMessage");

    const successMessage =
        document.getElementById("successMessage");



    /* =========================================
       NOTA GERAL
    ========================================= */

    const stars =
        document.querySelectorAll(".star");


    const ratingLabels = {

        1: "Muito ruim",

        2: "Ruim",

        3: "Regular",

        4: "Muito bom",

        5: "Excelente"

    };



    function updateMainStars(value) {

        stars.forEach((star) => {

            const starValue =
                Number(star.dataset.rating);

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

            const value =
                Number(star.dataset.rating);

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


                criteriaValues[criteria] =
                    value;



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
        document.querySelectorAll(
            ".recommend-button"
        );


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

    messageInput.addEventListener(
        "input",
        () => {

            counter.textContent =
                messageInput.value.length;

        }
    );



    /* =========================================
       ERRO
    ========================================= */

    function showError(message) {

        errorMessage.textContent =
            message;


        errorMessage.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }



    function clearError() {

        errorMessage.textContent = "";

    }



    /* =========================================
       ESTRELAS PARA O WHATSAPP
    ========================================= */

    function starsText(value) {

        const number =
            Number(value);


        if (!number) {

            return "Nao informado";

        }


        /*
         * Unicode das estrelas.
         *
         * ⭐ = U+2B50
         * ☆ = U+2606
         */

        const filledStar =
            "\u2B50";


        const emptyStar =
            "\u2606";


        return (
            filledStar.repeat(number) +
            emptyStar.repeat(5 - number)
        );

    }



    /* =========================================
       ENVIO DA AVALIAÇÃO
    ========================================= */

    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            clearError();



            /* =================================
               PEGAR OS DADOS
            ================================= */

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



            /* =================================
               VALIDAÇÃO — NOTA GERAL
            ================================= */

            if (
                rating < 1 ||
                rating > 5
            ) {

                showError(
                    "Por favor, selecione uma nota geral."
                );

                return;

            }



            /* =================================
               VALIDAÇÃO — ATENDIMENTO
            ================================= */

            if (!serviceRating) {

                showError(
                    "Por favor, avalie nosso atendimento."
                );

                return;

            }



            /* =================================
               VALIDAÇÃO — SERVIÇO
            ================================= */

            if (!service) {

                showError(
                    "Por favor, selecione o serviço realizado."
                );


                serviceInput.focus();


                return;

            }



            /* =================================
               VALIDAÇÃO — CRITÉRIOS
            ================================= */

            for (
                const key in criteriaValues
            ) {

                if (
                    criteriaValues[key] < 1
                ) {

                    showError(
                        `Por favor, avalie o critério "${criteriaNames[key]}".`
                    );


                    return;

                }

            }



            /* =================================
               VALIDAÇÃO — RECOMENDAÇÃO
            ================================= */

            if (!recommendation) {

                showError(
                    "Por favor, informe se você recomendaria a DG Moura Cell."
                );


                return;

            }



            /* =================================
               VALIDAÇÃO — COMENTÁRIO
            ================================= */

            if (!message) {

                showError(
                    "Por favor, escreva um comentário sobre sua experiência."
                );


                messageInput.focus();


                return;

            }



            /* =================================
               NOME
            ================================= */

            const clientName =
                name || "Nao informado";



            /* =================================
               EMOJIS EM UNICODE
            ================================= */

            const emojiStar =
                "\u2B50";

            const emojiPerson =
                "\uD83D\uDC64";

            const emojiTool =
                "\uD83D\uDD27";

            const emojiChart =
                "\uD83D\uDCCA";

            const emojiHandshake =
                "\uD83E\uDD1D";

            const emojiComment =
                "\uD83D\uDCAC";

            const emojiHeart =
                "\u2764\uFE0F";

            const emojiMegaphone =
                "\uD83D\uDCE2";

            const emojiPhone =
                "\uD83D\uDCF1";



            /* =================================
               MENSAGEM WHATSAPP
            ================================= */

            const whatsappMessage =

`${emojiStar} NOVA AVALIACAO — DG MOURA CELL

${starsText(rating)} ${rating}/5 — ${ratingLabels[rating].toUpperCase()}

${emojiPerson} Cliente: ${clientName}
${emojiTool} Servico: ${service}

${emojiChart} AVALIACAO DOS CRITERIOS

Atendimento: ${starsText(criteriaValues.atendimento)}
Qualidade do servico: ${starsText(criteriaValues.qualidade)}
Prazo de entrega: ${starsText(criteriaValues.prazo)}
Custo-beneficio: ${starsText(criteriaValues.custo)}
Organizacao: ${starsText(criteriaValues.organizacao)}

${emojiHandshake} AVALIACAO DO ATENDIMENTO

${serviceRating}

${emojiComment} O QUE MAIS GOSTOU / O QUE PODEMOS MELHORAR

"${message}"

${emojiHeart} RECOMENDARIA A DG MOURA CELL?

${recommendation.toUpperCase()}

${emojiPhone} Avaliacao enviada pelo QR Code da loja.`;



            /* =================================
               LINK DO WHATSAPP
            ================================= */

            const whatsappURL =

                `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    whatsappMessage
                )}`;



            /* =================================
               ABRIR WHATSAPP
            ================================= */

            window.open(
                whatsappURL,
                "_blank"
            );



            /* =================================
               TELA DE SUCESSO
            ================================= */

            form.style.display =
                "none";


            successMessage.classList.add(
                "show"
            );


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

});
