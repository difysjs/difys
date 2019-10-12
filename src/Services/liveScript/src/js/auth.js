const GAME_API_PASSWORD = document.getElementById("password");
const passwordtest = document.getElementById("passwordtest");
var Authorization;

window.addEventListener("keypress", event => {
	if (event.key == "Enter" && event.target.id === "password") {
		passwordtest.focus();
		passwordtest.click();
	}
});

passwordtest.addEventListener("click", () => {
	Authorization = "Basic " + window.btoa("admin:" + GAME_API_PASSWORD.value);

	fetch("/", {
		method: "POST",
		headers: new Headers({
			Authorization,
			"Content-Type": "application/json"
		})
	}).then(response => {
		GAME_API_PASSWORD.value = "";

		if (response.status != 401) {
			GAME_API_PASSWORD.style.borderColor = "";

			fetch("/plugins", {
				method: "GET",
				headers: new Headers({
					"Content-Type": "application/json"
				})
			})
				.then(r => r.json())
				.then(data => {
					const clientSection = document.querySelector(
						"section#client"
					);
					document.querySelector("section#authentication").remove();
					clientSection.style.display = "";
					App(data);
				});
		} else {
			GAME_API_PASSWORD.style.borderColor = "#dc3545";

			setTimeout(() => {
				GAME_API_PASSWORD.style.borderColor = "";
			}, 3000);
		}
	});
});
