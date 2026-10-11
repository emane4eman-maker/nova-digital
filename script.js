
// ========================================
// NOVA DIGITAL - Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // 1. Navbar scroll effect
    const navbar = document.querySelector(".navbar");

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavbarScroll);
    handleNavbarScroll();


    // 2. Mobile navbar closes after clicking a link
    const navbarCollapse = document.getElementById("mainNavbar");
    const navLinks = document.querySelectorAll("#mainNavbar .nav-link");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (
                window.innerWidth < 992 &&
                navbarCollapse.classList.contains("show")
            ) {
                const collapseInstance =
                    bootstrap.Collapse.getOrCreateInstance(navbarCollapse);

                collapseInstance.hide();
            }
        });
    });


    // 3. Back to top button
    const backToTop = document.getElementById("backToTop");

    function handleBackToTopVisibility() {
        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    window.addEventListener("scroll", handleBackToTopVisibility);
    handleBackToTopVisibility();

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    // 4. Automatically update copyright year
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // 5. Contact form validation
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");

    if (contactForm) {

        const fields = [
            document.getElementById("fullName"),
            document.getElementById("email"),
            document.getElementById("subject"),
            document.getElementById("message")
        ];

        function validateField(field) {
            field.value = field.value.trim();

            let valid = field.checkValidity();

            // Extra email format check
            if (field.type === "email" && field.value !== "") {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                valid = emailPattern.test(field.value);
            }

            field.classList.toggle("is-invalid", !valid);
            field.setAttribute("aria-invalid", String(!valid));

            return valid;
        }

        // Validate each field when the user leaves it
        fields.forEach(function (field) {
            field.addEventListener("blur", function () {
                validateField(field);
            });

            field.addEventListener("input", function () {
                if (field.classList.contains("is-invalid")) {
                    validateField(field);
                }
            });
        });

        // Validate all fields when submitting
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let formIsValid = true;

            fields.forEach(function (field) {
                if (!validateField(field)) {
                    formIsValid = false;
                }
            });

            formFeedback.className = "form-feedback";

            if (!formIsValid) {
                formFeedback.textContent =
                    "Please correct the highlighted fields and try again.";

                formFeedback.classList.add("error");

                const firstInvalidField =
                    contactForm.querySelector(".is-invalid");

                if (firstInvalidField) {
                    firstInvalidField.focus();
                }

                return;
            }

            formFeedback.textContent =
                "Your form is valid! This demo does not send messages yet.";

            formFeedback.classList.add("success");

            // This is a demo form, so no email is sent.
            // Reset only after successful local validation.
            contactForm.reset();

            fields.forEach(function (field) {
                field.classList.remove("is-invalid");
                field.removeAttribute("aria-invalid");
            });
        });
    }


    // 6. Update active navigation link while scrolling
    const sections = document.querySelectorAll("main section[id]");
    const allNavLinks = document.querySelectorAll(".navbar-nav .nav-link");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;

                        allNavLinks.forEach(function (link) {
                            const isActive =
                                link.getAttribute("href") === "#" + sectionId;

                            link.classList.toggle("active", isActive);
                        });
                    }
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px"
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

});
