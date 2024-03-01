"use strict";

let habbits = [];
const HABBIT_KEY = "HABBIT_KEY";

const page = {
	menu: document.querySelector('.menu__list'),
}

function loadData() {
	const habbitString = localStorage.getItem(HABBIT_KEY);
	const habbitArray = JSON.parse(habbitString);

	if (Array.isArray(habbitArray)) {
		habbits = habbitArray;
	}
}

function saveData() {
	localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}

function rerenderMenu(activeHabbit) {
	if (!activeHabbit) {
		return;
	}
	for (const habbit of habbits) {
		const existed = document.querySelector(`[menu-habbit-id="${habbit.id}"]`);
		if (!existed) {
			const element = document.createElement('button');
			element.setAttribute('menu-habbit-id', habbit.id);
			element.classList.add('menu__item');
			element.addEventListener('click', () => {
				rerender(habbit.id);
			})
			element.innerHTML = `<img src="images/${habbit.icon}.svg" draggable="false" alt="${habbit.name}">`;
			if(activeHabbit.id === habbit.id) {
				element.classList.add("menu__item_active");
			}
			element.addEventListener('click', () => {
				rerender(habbit.id);
			});

		page.menu.append(element);

			continue;
		}

		if(activeHabbit.id === habbit.id) {
			existed.classList.add("menu__item_active");
		} else {
			existed.classList.remove("menu__item_active");
		}
	}
}

function rerender(activehabbitId) {
	const activeHabbit = habbits.find(habbit => habbit.id === activehabbitId);
	rerenderMenu(activeHabbit);
}

(() => {
	loadData();
	rerender(habbits[0].id);
})()