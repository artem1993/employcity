document.addEventListener("DOMContentLoaded", () => {
	noScrollDocumentWithOpenedBurger()
	closeBurgerWithClickedItem()
	scrollDocument()
	addDotsBetweenCircles()
	window.addEventListener('resize', addDotsBetweenCircles)
	inputNameOnlyLetters()
	checkInputMail()
	customizeSelect()
	changeRange()
	showNameAndSizeFile()
	getFullYearInCopyright() 
	settlerBetweenFooterElems()
})

/* Classes */
const noScrollClass: string = 'no-scroll'
const styckyClass: string = 'sticky'
const openClass: string = 'open'
const selectedClass: string = 'selected'
type ClassListAction = 'add' | 'remove' | 'toggle'

/* Vars */
const body: HTMLElement = document.body

/* Functions */
const moveClass = (action: ClassListAction, className: string, ...elems: HTMLElement[] ): void => {
	elems.forEach(elem => (elem.classList as any)[action](className));
}


function noScrollDocumentWithOpenedBurger(): void {
	const deleteScroll = (): void => {
		const fixBlocks = document.querySelectorAll(`.fix`) as NodeListOf<HTMLElement>
		const paddingOffset: string = window.innerWidth - body.offsetWidth + "px"
		const updatePaddingRight = (el: HTMLElement): void => { el.style.paddingRight = paddingOffset }
		moveClass("toggle", noScrollClass, body)
		if (fixBlocks.length > 0) fixBlocks.forEach(fixBlock => updatePaddingRight(fixBlock))
		fixBlocks.forEach(fixBlock => updatePaddingRight(fixBlock))
		updatePaddingRight(body)
	}

	const toggleScroll = (...btns: HTMLElement[]): void => {btns.forEach(btn => btn.addEventListener("click", deleteScroll))}

	toggleScroll(document.querySelector('.burger-btn') as HTMLElement)
}

function closeBurgerWithClickedItem(): void {
	const burgerCheckbox = document.querySelector('.burger-checkbox') as HTMLInputElement
	const navList = document.querySelector('.nav__list') as HTMLElement
	const links = navList.querySelectorAll('a') as NodeListOf<HTMLElement>
	links.forEach(link => link.addEventListener("click", () => {
		if (burgerCheckbox.checked) {
			moveClass('remove', noScrollClass, body)
			burgerCheckbox.checked = false
		}
	}))
}

function scrollDocument(): void {
	window.onscroll = (): void => {
		const header: HTMLElement = document.querySelector('.header') as HTMLElement
		const sticky: number = header.offsetTop
		window.scrollY > sticky
			? moveClass("add", styckyClass, header)
			: moveClass("remove", styckyClass, header)
	}
}

function addDotsBetweenCircles(): void {
	const circles = document.querySelectorAll('.circle') as NodeListOf<HTMLElement>
	const gapBetweenDots: number = 20

	// Сначала очищаем все существующие separators
	const existingSeparators = document.querySelectorAll('.separator') as NodeListOf<HTMLElement>
	existingSeparators.forEach(separator => separator.remove())

	for (let i = 0; i < circles.length - 1; i++) {

		// Получаем текущий круг и следующий
		const currentCircle: HTMLElement = circles[i]
		const nextCircle: HTMLElement = circles[i + 1]
		
		// Вычисляем расстояние между кругами
		const currentCircleRect: DOMRect = currentCircle.getBoundingClientRect()
		const nextCircleRect: DOMRect = nextCircle.getBoundingClientRect()
		const distance: number = nextCircleRect.left - (currentCircleRect.right + 20) // +20 это отступы

		// Определяем количество точек, которые вмещаются между кругами
		const countDots: number = Math.max(Math.floor(distance / gapBetweenDots), 0)

		// Создаем общий контейнер для точек, только если есть точки для добавления
		if (countDots > 0) {
			const separator: HTMLElement = document.createElement('div')
			separator.className = 'separator'

			// Добавляем точки в общий контейнер separator
			for (let j = 0; j < countDots; j++) {
				const dot: HTMLElement = document.createElement('div')
				dot.className = 'dot'
				separator.appendChild(dot) // Добавляем точку в контейнер
			}

			// Вставляем контейнер с точками внутрь текущего круга
			currentCircle.appendChild(separator)
		}
	}
}

function settlerBetweenFooterElems(): void {
	const footerRow = document.querySelector('.footer__row') as HTMLElement

	if (!footerRow || footerRow.children.length === 0) return

	const elems = Array.from(footerRow.children) as HTMLElement[]
	
	elems.forEach((elem, index) => {
		if (index < elems.length - 1) {
			const nextElem = elems[index + 1] as HTMLElement
			const elemTop: number = elem.getBoundingClientRect().top
			const nextElemTop: number = nextElem.getBoundingClientRect().top

			// Проверка, находятся ли элементы на одной строке с учетом допустимого порога
			const tolerance: number = 10 // допустимый предел в пикселях
			const isOnSameRow: boolean = Math.abs(elemTop - nextElemTop) <= tolerance

			// Добавляем разделитель, если элементов на одной строке больше двух
			if (isOnSameRow) {
				const settler = document.createElement('div') as HTMLElement
				moveClass('add', 'settler', settler)
				settler.textContent = '|'
				
				if (elem.parentNode) {
					elem.parentNode.insertBefore(settler, elem.nextSibling)
				}
			}
		}
	})
}
	
	


function inputNameOnlyLetters(): void {
	const inputs = document.querySelectorAll('input[name="name"]') as NodeListOf<HTMLInputElement>
	inputs.forEach(input => input.addEventListener('input', function(): void {
		this.value = this.value.replace(/[^A-Za-zА-Яа-яЁё]+/g, '')
	}))
}

function checkInputMail(): void {
	const inputs = document.querySelectorAll('input[type="email"]') as NodeListOf<HTMLInputElement>

	inputs.forEach(input =>
		input.addEventListener('input', (e: Event) => {
		const emailRegex: RegExp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
		const target = e.target as HTMLInputElement
		target.value && !emailRegex.test(target.value) 
			? target.setCustomValidity('Введите корректный email')
			: target.setCustomValidity('')
	}))
}

function customizeSelect(): void {
	const selects = document.querySelectorAll('.select') as NodeListOf<HTMLElement>
	
	if (selects.length > 0) {
		selects.forEach(select => {
			const selectTrigger = select.querySelector('.select__trigger') as HTMLElement
			const selectTriggerText = selectTrigger.querySelector('span') as HTMLElement
			const selectWrapper = select.querySelector('.select__wrapper') as HTMLElement
			const selectOptions = selectWrapper.querySelectorAll('li') as NodeListOf<HTMLElement>
		
			selectTrigger.addEventListener('click', function (): void {
				moveClass('toggle', openClass, this.parentElement as HTMLElement)
			})
		
			selectOptions.forEach(option => option.addEventListener('click', function (): void {
				selectTriggerText.textContent = this.textContent
				selectTrigger.setAttribute('data-value', this.getAttribute('data-value') || '')
				moveClass('remove', openClass, selectWrapper.parentElement as HTMLElement)
			}))
		
			document.addEventListener('click', (e): void => {
				if (!selectTrigger.contains(e.target as HTMLElement)
					&& !selectWrapper.contains(e.target as HTMLElement)) {
						moveClass('remove', openClass, selectWrapper.parentElement as HTMLElement)
				}
			})
		})
	}
}

function changeRange(): void {
	const ranges = document.querySelectorAll('.range') as NodeListOf<HTMLElement>
	
	if (ranges.length > 0) {
		ranges.forEach(range => {
			const inputRange = range.querySelector('input[type=range]') as HTMLInputElement
			const percentRange = range.querySelector('.range__per') as HTMLElement
			
			percentRange.textContent = inputRange.value + '%'

			inputRange.addEventListener('input', function (): void {
				percentRange.textContent = this.value + '%'
				this.setAttribute('value', this.value)
			})
		})
	}
}

function showNameAndSizeFile(): void {
	const labelUploadFile = document.querySelector('.btn-uploadFile') as HTMLLabelElement
	const labelTitle = labelUploadFile.querySelector('span') as HTMLElement
	const fileInput = labelUploadFile.querySelector('input[type=file]') as HTMLInputElement

	fileInput.addEventListener('change', (e: Event) => {
		const target = e.target as HTMLInputElement;
		
		if (target && target.files) {
			const file = target.files[0];
			const fileName: string = file.name || '';
			const fileSize: number = file.size;
			
			labelTitle.textContent = `${fileName.slice(0, 15)}... / ${Math.round(fileSize / 1000)} kB`
		}
	});
}

function getFullYearInCopyright(): void {
	const span = document.getElementById('year') as HTMLElement
	const getYear = String(new Date().getFullYear())
	span.textContent = getYear
}





