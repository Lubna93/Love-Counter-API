
class LoveApi {
	constructor() {
		this.fName = "";
		this.mName = "";
		this.url = `https://love-calculator.p.rapidapi.com/getPercentage?fname=${this.fName}&sname=${this.mName}`;
		this.apiKey = "c72719a362msh3ecbe79fbaa906ap172d01jsne478890ad74c";
		this.host = "love-calculator.p.rapidapi.com";
		this.method = "GET"
	}
	get names() {
		return this.fName + " " + this.mName;
	}
	set names(names) {
		[this.fName, this.mName] = names
	}

	letsLove() {
		fetch(`https://love-calculator.p.rapidapi.com/getPercentage?fname=${this.fName}&sname=${this.mName}`, {
			"method": this.method,
			"headers": {
				"x-rapidapi-key": this.apiKey,
				"x-rapidapi-host": this.host
			}
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				else {
					throw new Error("Erreur")
				}
			})
			.then(response => {
				document.querySelector("div").id = "containerDisplay";
				let i = 0;
				let interval = setInterval(() => {
					if (i == response.percentage) {
						clearInterval(interval)
					}
					document.querySelector("text").textContent = i + " %";
					i++;

				}, 25);
				// document.querySelector("text").textContent = response.percentage + " %";
				var bar = new ProgressBar.Path('#heart-path', {
					easing: 'easeInOut',
					duration: 2000
				});

				bar.set(0);
				if (document.querySelector(".audio") != null) {
					console.log(document.querySelector(".audio"));
					document.querySelector(".audio").remove();
					// the variable is defined
				}
				if(response.percentage > 65){
					let music = document.createElement("div");
					music.className = "audio";
					music.innerHTML = "<audio autoplay><source src='destinee.mp3' type='audio/mpeg'></audio>"
					document.querySelector("body").append(music);
				}
				bar.animate(response.percentage/100);  // Number from 0.0 to 1.0
				console.log(response)
			})
			.catch(err => {
				console.error(err);
			});
	}
}

let submit = document.querySelector('#submit');
let male = document.querySelector("#male");
let female = document.querySelector("#female");
let Love = new LoveApi();
let error;

submit.addEventListener("click", (e) => {
	e.preventDefault();
	if (male.value == "" || female.value == "") {
		error = "Vous n'avez pas renseigner les deux prénoms";
		document.querySelector("small").textContent = error;
		document.querySelector("div").id = "container";
	}
	else {
		error = "";
		document.querySelector("small").textContent = error;
		Love.names = [male.value, female.value];
		Love.letsLove();
		male.value = "";
		female.value = "";
	}
})



