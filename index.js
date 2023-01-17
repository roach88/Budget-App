// Get references to the form inputs and the money saved paragraph
const startingAmountInput = document.getElementById('startingAmount')
const spentTodayInput = document.getElementById('spentToday')
const submitButton = document.getElementById('submitButton')
const moneySavedParagraph = document.getElementById('moneySaved')
const loginContainer = document.getElementById('loginContainer')
const appContainer = document.getElementById('appContainer')

if (!window.loggedInUser) {
	loginContainer.style.display = 'block'
} else {
	appContainer.style.display = 'block'
}

let dailyStipend
let moneySaved = 0
let days = 0

submitButton.addEventListener('click', function (event) {
	event.preventDefault()
	// Calculate the daily stipend
	if (days === 0) {
		dailyStipend = startingAmountInput.value / 30
	}
	// Compare the amount spent today to the daily stipend
	const spentToday = spentTodayInput.value
	if (spentToday < dailyStipend) {
		moneySaved += dailyStipend - spentToday
	} else {
		moneySaved -= spentToday - dailyStipend
	}
	days++
	// If 30 days have passed, display the final amount of money saved
	if (days === 30) {
		moneySavedParagraph.innerHTML = `You saved $${moneySaved} over the last 30 days.`
	}
})

loginButton.addEventListener('click', function (event) {
	event.preventDefault()
	// Get the values of the login form inputs
	const email = document.getElementById('loginEmail').value
	const password = document.getElementById('loginPassword').value
	// Check if the email and password match a user in the userData object
	if (!userData[email] || userData[email].password !== password) {
		alert('Invalid email or password')
		return
	}
	// Save the logged in user to a global variable
	window.loggedInUser = email
	alert(`Successfully logged in as ${email}`)
	// Clear the login form inputs
	document.getElementById('loginEmail').value = ''
	document.getElementById('loginPassword').value = ''
	// hide loginContainer and show appContainer
	loginContainer.style.display = 'none'
	appContainer.style.display = 'block'
})

logoutButton.addEventListener('click', function (event) {
	event.preventDefault()
	// Check if a user is logged in
	if (!window.loggedInUser) {
		alert('No user is currently logged in')
		return
	}
	// Log out the user and clear the global variable
	alert(`Successfully logged out ${window.loggedInUser}`)
	window.loggedInUser = null
	// hide appContainer and show loginContainer
	appContainer.style.display = 'none'
	loginContainer.style.display = 'block'
})
