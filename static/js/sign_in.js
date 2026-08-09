/* =========================================================
   DISASTERSAFE - SIGN IN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector(".signin-form");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const locationInput = document.getElementById("location");


    /* =====================================================
       FORM SUBMISSION
    ===================================================== */

    form.addEventListener("submit", function (event) {

        let isValid = true;

        clearErrors();


        /* -------------------------------------------------
           NAME
        ------------------------------------------------- */

        const name = nameInput.value.trim();

        if (name === "") {

            showError(
                nameInput,
                "Please enter your full name."
            );

            isValid = false;

        } else if (name.length < 2) {

            showError(
                nameInput,
                "Name must contain at least 2 characters."
            );

            isValid = false;
        }


        /* -------------------------------------------------
           EMAIL
        ------------------------------------------------- */

        const email = emailInput.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === "") {

            showError(
                emailInput,
                "Please enter your email address."
            );

            isValid = false;

        } else if (!emailPattern.test(email)) {

            showError(
                emailInput,
                "Please enter a valid email address."
            );

            isValid = false;
        }


        /* -------------------------------------------------
           PASSWORD
        ------------------------------------------------- */

        const password = passwordInput.value;

        if (password === "") {

            showError(
                passwordInput,
                "Please enter a password."
            );

            isValid = false;

        } else if (password.length < 8) {

            showError(
                passwordInput,
                "Password must contain at least 8 characters."
            );

            isValid = false;
        }


        /* -------------------------------------------------
           LOCATION
        ------------------------------------------------- */

        const location = locationInput.value.trim();

        if (location === "") {

            showError(
                locationInput,
                "Please enter your location."
            );

            isValid = false;

        } else if (location.length < 2) {

            showError(
                locationInput,
                "Please enter a valid location."
            );

            isValid = false;
        }


        /* -------------------------------------------------
           STOP FORM IF INVALID
        ------------------------------------------------- */

        if (!isValid) {

            event.preventDefault();

            return;
        }

        /*
         * If everything is valid, the form is allowed
         * to continue to Flask.
         */

    });


    /* =====================================================
       REAL-TIME PASSWORD VALIDATION
    ===================================================== */

    passwordInput.addEventListener("input", function () {

        const password = passwordInput.value;

        removeError(passwordInput);

        if (
            password.length > 0 &&
            password.length < 8
        ) {

            showError(
                passwordInput,
                "Password should contain at least 8 characters."
            );

        }

    });


    /* =====================================================
       REMOVE ERROR WHEN USER STARTS CORRECTING FIELD
    ===================================================== */

    nameInput.addEventListener("input", function () {
        removeError(nameInput);
    });

    emailInput.addEventListener("input", function () {
        removeError(emailInput);
    });

    locationInput.addEventListener("input", function () {
        removeError(locationInput);
    });


    /* =====================================================
       ERROR FUNCTIONS
    ===================================================== */

    function showError(input, message) {

        input.classList.add("input-error");

        const error = document.createElement("small");

        error.className = "form-error";

        error.textContent = message;

        input.parentElement.appendChild(error);
    }


    function removeError(input) {

        input.classList.remove("input-error");

        const oldError =
            input.parentElement.querySelector(".form-error");

        if (oldError) {
            oldError.remove();
        }
    }


    function clearErrors() {

        const errors =
            document.querySelectorAll(".form-error");

        errors.forEach(function (error) {
            error.remove();
        });

        const invalidInputs =
            document.querySelectorAll(".input-error");

        invalidInputs.forEach(function (input) {
            input.classList.remove("input-error");
        });
    }

});