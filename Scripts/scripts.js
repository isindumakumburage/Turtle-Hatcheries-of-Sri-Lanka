// Calendar part
document.addEventListener("DOMContentLoaded", function() {
  const calendarGrid = document.getElementById("calendar-grid");
  const selectedDatePara = document.getElementById("selected-date");
  const currentMonthYear = document.getElementById("current-month-year");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let selectedDate = localStorage.getItem("selectedDate");
  let currentDate = new Date();

  function updateCalendar() {
      // Clear previous month's dates
      calendarGrid.innerHTML = "";

      // Get the first day of the current month
      let firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

      // Get the last day of the current month
      let lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

      // Update the current month and year in the header
      currentMonthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}`;

      // Calculate the day of the week for the first day of the month
      let firstDayOfWeek = firstDayOfMonth.getDay();

      // Create empty cells for the days of the previous month
      for (let i = 0; i < firstDayOfWeek; i++) {
          const div = document.createElement("div");
          div.classList.add("empty");
          calendarGrid.appendChild(div);
      }

      // Loop through the days of the current month
      for (let day = 1; day <= lastDayOfMonth; day++) {
          const div = document.createElement("div");
          div.textContent = day;

          if (selectedDate === String(day) && currentDate.getMonth() === new Date().getMonth()) {
              div.classList.add("selected");
          }

          div.addEventListener("click", function() {
              selectedDate = day;
              localStorage.setItem("selectedDate", selectedDate);
              updateSelectedDate();
              highlightSelectedDate();
          });

          calendarGrid.appendChild(div);
      }

      // Update selected date and highlight
      updateSelectedDate();
      highlightSelectedDate();
  }

  prevBtn.addEventListener("click", function() {
      currentDate.setMonth(currentDate.getMonth() - 1);
      updateCalendar();
  });

  nextBtn.addEventListener("click", function() {
      currentDate.setMonth(currentDate.getMonth() + 1);
      updateCalendar();
  });

  function updateSelectedDate() {
      selectedDatePara.textContent = `${selectedDate} ${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}`;
  }

  function highlightSelectedDate() {
      const calendarDivs = calendarGrid.getElementsByTagName("div");
      for (const div of calendarDivs) {
          if (div.textContent === String(selectedDate) && currentDate.getMonth() === new Date().getMonth()) {
              div.classList.add("selected");
          } else {
              div.classList.remove("selected");
          }
      }
  }

  updateCalendar();
});
//Increment Decrement part
function incrementGuest(guestType) {
    const countElement = document.getElementById(`${guestType}Count`);
    let count = parseInt(countElement.textContent);

    count++;
    countElement.textContent = count;

    // Store the updated guest count in local storage
    localStorage.setItem(guestType, count);

   
    document.getElementById(`selected${guestType.replace(/^(.)(.*)$/, (m, p1, p2) => p1.toUpperCase() + p2)}`).textContent = count;
 
  
  
  }

  // Function to decrement guest count
  function decrementGuest(guestType) {
    const countElement = document.getElementById(`${guestType}Count`);
    let count = parseInt(countElement.textContent);

    if (count > 0) {
      count--;
      countElement.textContent = count;

      // Store the updated guest count in local storage
      localStorage.setItem(guestType, count);

      document.getElementById(`selected${guestType.replace(/^(.)(.*)$/, (m, p1, p2) => p1.toUpperCase() + p2)}`).textContent = count;
   
    
    
    
    }
  }

  // Retrieve guest counts from local storage on page load
  function retrieveGuestCounts() {
    const guestTypes = ['slAdult', 'slChild', 'foreignerAdult', 'foreignerChild', 'infant'];
    guestTypes.forEach((guestType) => {
      const count = localStorage.getItem(guestType) || 0;
      document.getElementById(`${guestType}Count`).textContent = count;

      document.getElementById(`selected${guestType.replace(/^(.)(.*)$/, (m, p1, p2) => p1.toUpperCase() + p2)}`).textContent = count;
    });
  }

  // Call the retrieveGuestCounts function on page load to set initial values
  window.onload = retrieveGuestCounts;

  //Guest display part
  function updateSelectedCounts(){


    const selectedSlAdult=document.getElementById('selectedSLAdult');
    const selectedSlChild=document.getElementById('selectedSLChild');
    const selectedForeignerAdult=document.getElementById('selectedForeignerAdult');
    const selectedForeignerChild=document.getElementById('selectedForeignerChild');
    const selectedInfant=document.getElementById('selectedInfant');



    const slAdultCount = parseInt(document.getElementById('slAdultCount').innerText);
    const slChildCount = parseInt(document.getElementById('slChildCount').innerText);
    const foreignerAdultCount = parseInt(document.getElementById('foreignerAdultCount').innerText);
    const foreignerChildCount = parseInt(document.getElementById('foreignerChildCount').innerText);
    const infantCount = parseInt(document.getElementById('infantCount').innerText);



    selectedSlAdult.innerText = slAdultCount;
    selectedSlChild.innerText = slChildCount;
    selectedForeignerAdult.innerText = foreignerAdultCount;
    selectedForeignerChild.innerText = foreignerChildCount;
    selectedInfant.innerText = infantCount;
  }
  updateSelectedCounts();

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('button').forEach(function (button) {
      button.addEventListener('click', function (event) {
        const targetElement = event.target;
        const guestType = targetElement.getAttribute('onclick').match(/'(.*?)'/)[1];
        updateSelectedCounts();
      });
    });
  });

  //Displaying the output from the checkboxes
  document.addEventListener('DOMContentLoaded', function () {
    const selectedTimesElement = document.getElementById('selectedTimes');

    function updateSelectedTimes() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const selectedTimes = [];

        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                const labelElement = checkbox.closest('label');
                if (labelElement) {
                    selectedTimes.push(labelElement.textContent.trim());
                }
            }
        });

        selectedTimesElement.innerText = selectedTimes.join(', ');
    }

    // Add event listeners to checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', updateSelectedTimes);
    });
});
  let slAdultCountPeak = 0;
  let slChildCountPeak = 0;
  let foreignerAdultCountPeak = 0;
  let foreignerChildCountPeak = 0;

// display the total
function calculateTicketPrices() {
  const slAdultCount = parseInt(document.getElementById('slAdultCount').textContent);
  const slChildCount = parseInt(document.getElementById('slChildCount').textContent);
  const foreignerAdultCount = parseInt(document.getElementById('foreignerAdultCount').textContent);
  const foreignerChildCount = parseInt(document.getElementById('foreignerChildCount').textContent);

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const selectedTimes = [];
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      const labelElement = checkbox.closest('label');
      if (labelElement) {
        selectedTimes.push(labelElement.textContent.trim());
      }
    }
  });

  const slAdultNormalPrice = 4;
  const slAdultPeakPrice = 6;
  const slChildNormalPrice = 2;
  const slChildPeakPrice = 3;
  const foreignerAdultNormalPrice = 10;
  const foreignerAdultPeakPrice = 13;
  const foreignerChildNormalPrice = 5;
  const foreignerChildPeakPrice = 8;

  let slAdultTotalPrice = slAdultNormalPrice * (slAdultCount - slAdultCountPeak);
  let slChildTotalPrice = slChildNormalPrice * (slChildCount - slChildCountPeak);
  let foreignerAdultTotalPrice = foreignerAdultNormalPrice * (foreignerAdultCount - foreignerAdultCountPeak);
  let foreignerChildTotalPrice = foreignerChildNormalPrice * (foreignerChildCount - foreignerChildCountPeak);

  if (selectedTimes.some(timeSlot => timeSlot.includes("Peak"))) {
    slAdultTotalPrice += slAdultPeakPrice * slAdultCountPeak;
    slChildTotalPrice += slChildPeakPrice * slChildCountPeak;
    foreignerAdultTotalPrice += foreignerAdultPeakPrice * foreignerAdultCountPeak;
    foreignerChildTotalPrice += foreignerChildPeakPrice * foreignerChildCountPeak;
  }


  const totalTicketPrice = slAdultTotalPrice + slChildTotalPrice + foreignerAdultTotalPrice + foreignerChildTotalPrice;

  document.getElementById('slAdultTicketPrice').innerText = "$" + slAdultTotalPrice;
  document.getElementById('slChildTicketPrice').innerText = "$" + slChildTotalPrice;
  document.getElementById('foreignerAdultTicketPrice').innerText = "$" + foreignerAdultTotalPrice;
  document.getElementById('foreignerChildTicketPrice').innerText = "$" + foreignerChildTotalPrice;
  document.getElementById('totalTicketPrice').innerText = "$" + totalTicketPrice;
 
 
 
  localStorage.setItem('slAdultCount', slAdultCount);
  localStorage.setItem('slChildCount', slChildCount);
  localStorage.setItem('foreignerAdultCount', foreignerAdultCount);
  localStorage.setItem('foreignerChildCount', foreignerChildCount);
  localStorage.setItem('selectedTimes', JSON.stringify(selectedTimes));
  localStorage.setItem('slAdultTotalPrice', slAdultTotalPrice);
  localStorage.setItem('slChildTotalPrice', slChildTotalPrice);
  localStorage.setItem('foreignerAdultTotalPrice', foreignerAdultTotalPrice);
  localStorage.setItem('foreignerChildTotalPrice', foreignerChildTotalPrice);
  localStorage.setItem('totalTicketPrice', totalTicketPrice);





}

// Call the calculateTicketPrices function whenever there's a change in guests or time slots
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('button, input[type="checkbox"]').forEach(function (element) {
    element.addEventListener('click', calculateTicketPrices);
  });
});
function retrieveTicketPrices() {
  const slAdultTotalPrice = localStorage.getItem('slAdultTotalPrice') || "$0";
  const slChildTotalPrice = localStorage.getItem('slChildTotalPrice') || "$0";
  const foreignerAdultTotalPrice = localStorage.getItem('foreignerAdultTotalPrice') || "$0";
  const foreignerChildTotalPrice = localStorage.getItem('foreignerChildTotalPrice') || "$0";
  const totalTicketPrice = localStorage.getItem('totalTicketPrice') || "$0";
  const selectedDate = localStorage.getItem("selectedDate");
  document.getElementById('slAdultTicketPrice').innerText = slAdultTotalPrice;
  document.getElementById('slChildTicketPrice').innerText = slChildTotalPrice;
  document.getElementById('foreignerAdultTicketPrice').innerText = foreignerAdultTotalPrice;
  document.getElementById('foreignerChildTicketPrice').innerText = foreignerChildTotalPrice;
  document.getElementById('totalTicketPrice').innerText = totalTicketPrice;
  
}
window.onload = retrieveTicketPrices;

function displayFullName() {
    // Get the value of the full name input field
    const fullNameInput = document.getElementById("fullname");
    const telNumber=document.getElementById("phone");
    const email=document.getElementById("email");
    const gender=document.getElementById("gender");
    
    const phone=telNumber.value;
    const fullName = fullNameInput.value;
    const emailInput=email.value;
    const genderInput=gender.value;

  
    const fullNameDisplay = document.getElementById("fullNameDisplay");
    const phoneDisplay=document.getElementById("mobileNumberDisplay");
    const emailDisplay=document.getElementById("emailDisplay");
    const genderDisplay=document.getElementById("genderDisplay");


    phoneDisplay.innerText=""+phone;
    fullNameDisplay.innerText = "" + fullName;
    emailDisplay.innerText=""+emailInput;
    genderDisplay.innerText=""+genderInput;
  }


function redirectToDetails() {
  // Get the values from the first page's summary table
  const slAdultTotalPrice = document.getElementById('slAdultTicketPrice').innerText;
  const slChildTotalPrice = document.getElementById('slChildTicketPrice').innerText;
  const foreignerAdultTotalPrice = document.getElementById('foreignerAdultTicketPrice').innerText;
  const foreignerChildTotalPrice = document.getElementById('foreignerChildTicketPrice').innerText;
  const totalTicketPrice = document.getElementById('totalTicketPrice').innerText;
  const NoOfSLAdults=document.getElementById('selectedSLAdult').innerText;
  const NoOfSLChild=document.getElementById('selectedSLChild').innerText;
  const NoOfForeignAdult=document.getElementById('selectedForeignerAdult').innerText;
  const NoOfForeignChild=document.getElementById('selectedForeignerChild').innerText;
  const NoOfInfants=document.getElementById('selectedInfant').innerText;
  const calendarDate=document.getElementById('selected-date').innerText;
  const Time=document.getElementById('selectedTimes').innerText;
   

  sessionStorage.setItem('slAdultTotalPrice', slAdultTotalPrice);
  sessionStorage.setItem('slChildTotalPrice', slChildTotalPrice);
  sessionStorage.setItem('foreignerAdultTotalPrice', foreignerAdultTotalPrice);
  sessionStorage.setItem('foreignerChildTotalPrice', foreignerChildTotalPrice);
  sessionStorage.setItem('totalTicketPrice', totalTicketPrice);
  sessionStorage.setItem('NoOfSLAdults',NoOfSLAdults);
  sessionStorage.setItem('calendarDate',calendarDate);
  sessionStorage.setItem('NoOfSLChild',NoOfSLChild);
  sessionStorage.setItem('NoOfForeignAdult',NoOfForeignAdult);
  sessionStorage.setItem('NoOfForeignChild',NoOfForeignChild);
  sessionStorage.setItem('NoOfInfants',NoOfInfants);
  sessionStorage.setItem('Time',Time);
  

  // Redirect to the payment page with the data as parameters
  window.location.href = 'details.html';
}
function redirectToPayment(){
  const slAdultTotalPrice = document.getElementById('slAdultTicketPrice').innerText;
  const slChildTotalPrice = document.getElementById('slChildTicketPrice').innerText;
  const foreignerAdultTotalPrice = document.getElementById('foreignerAdultTicketPrice').innerText;
  const foreignerChildTotalPrice = document.getElementById('foreignerChildTicketPrice').innerText;
  const totalTicketPrice = document.getElementById('totalTicketPrice').innerText;
  const NoOfSLAdults=document.getElementById('selectedSLAdult').innerText;
  const NoOfSLChild=document.getElementById('selectedSLChild').innerText;
  const NoOfForeignAdult=document.getElementById('selectedForeignerAdult').innerText;
  const NoOfForeignChild=document.getElementById('selectedForeignerChild').innerText;
  const NoOfInfants=document.getElementById('selectedInfant').innerText;
  const calendarDate=document.getElementById('selected-date').innerText;
  const Time=document.getElementById('selectedTimes').innerText;
  const fullName=document.getElementById('fullNameDisplay').innerText;
  const phone=document.getElementById('mobileNumberDisplay').innerText;
  const email=document.getElementById('emailDisplay').innerText;
  const gender=document.getElementById('genderDisplay').innerText; 

  sessionStorage.setItem('slAdultTotalPrice', slAdultTotalPrice);
  sessionStorage.setItem('slChildTotalPrice', slChildTotalPrice);
  sessionStorage.setItem('foreignerAdultTotalPrice', foreignerAdultTotalPrice);
  sessionStorage.setItem('foreignerChildTotalPrice', foreignerChildTotalPrice);
  sessionStorage.setItem('totalTicketPrice', totalTicketPrice);
  sessionStorage.setItem('NoOfSLAdults',NoOfSLAdults);
  sessionStorage.setItem('calendarDate',calendarDate);
  sessionStorage.setItem('NoOfSLChild',NoOfSLChild);
  sessionStorage.setItem('NoOfForeignAdult',NoOfForeignAdult);
  sessionStorage.setItem('NoOfForeignChild',NoOfForeignChild);
  sessionStorage.setItem('NoOfInfants',NoOfInfants);
  sessionStorage.setItem('Time',Time);
  sessionStorage.setItem('fullName',fullName);
  sessionStorage.setItem('phone',phone);
  sessionStorage.setItem('email',email);
  sessionStorage.setItem('gender',gender);



  window.location.href='payment.html';
}
function redirectToConfirm(){
  const slAdultTotalPrice = document.getElementById('slAdultTicketPrice').innerText;
  const slChildTotalPrice = document.getElementById('slChildTicketPrice').innerText;
  const foreignerAdultTotalPrice = document.getElementById('foreignerAdultTicketPrice').innerText;
  const foreignerChildTotalPrice = document.getElementById('foreignerChildTicketPrice').innerText;
  const totalTicketPrice = document.getElementById('totalTicketPrice').innerText;
  const NoOfSLAdults=document.getElementById('selectedSLAdult').innerText;
  const NoOfSLChild=document.getElementById('selectedSLChild').innerText;
  const NoOfForeignAdult=document.getElementById('selectedForeignerAdult').innerText;
  const NoOfForeignChild=document.getElementById('selectedForeignerChild').innerText;
  const NoOfInfants=document.getElementById('selectedInfant').innerText;
  const calendarDate=document.getElementById('selected-date').innerText;
  const Time=document.getElementById('selectedTimes').innerText;
  const fullName=document.getElementById('fullNameDisplay').innerText;
  const phone=document.getElementById('mobileNumberDisplay').innerText;
  const email=document.getElementById('emailDisplay').innerText;
  const gender=document.getElementById('genderDisplay').innerText; 

  sessionStorage.setItem('slAdultTotalPrice', slAdultTotalPrice);
  sessionStorage.setItem('slChildTotalPrice', slChildTotalPrice);
  sessionStorage.setItem('foreignerAdultTotalPrice', foreignerAdultTotalPrice);
  sessionStorage.setItem('foreignerChildTotalPrice', foreignerChildTotalPrice);
  sessionStorage.setItem('totalTicketPrice', totalTicketPrice);
  sessionStorage.setItem('NoOfSLAdults',NoOfSLAdults);
  sessionStorage.setItem('calendarDate',calendarDate);
  sessionStorage.setItem('NoOfSLChild',NoOfSLChild);
  sessionStorage.setItem('NoOfForeignAdult',NoOfForeignAdult);
  sessionStorage.setItem('NoOfForeignChild',NoOfForeignChild);
  sessionStorage.setItem('NoOfInfants',NoOfInfants);
  sessionStorage.setItem('Time',Time);
  sessionStorage.setItem('fullName',fullName);
  sessionStorage.setItem('phone',phone);
  sessionStorage.setItem('email',email);
  sessionStorage.setItem('gender',gender);



  window.location.href='confirm.html';
}


/*function populateDisplayFromLocalStorage() {
  const fullName = localStorage.getItem("fullName");
  const email = localStorage.getItem("email");
  const gender = localStorage.getItem("gender");
  const phone = localStorage.getItem("phone");

  if (fullName) {
    document.getElementById("fullNameDisplay").innerText = fullName;
  }

  if (email) {
    document.getElementById("emailDisplay").innerText = email;
  }

  if (gender) {
    document.getElementById("genderDisplay").innerText = gender;
  }

  if (phone) {
    document.getElementById("mobileNumberDisplay").innerText = phone;
  }
}
document.addEventListener("DOMContentLoaded", populateDisplayFromLocalStorage);

// Call the function on page load
window.addEventListener("load", populateDisplayFromLocalStorage);
*/




// Validate details page
  function validateForm() {
    const name = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const fullnameError = document.getElementById("fullnameError");
    const emailError = document.getElementById("emailError");
    const fullNameDisplay = document.getElementById("fullNameDisplay");
    const emailDisplay = document.getElementById("emailDisplay");
    const mobileNumberDisplay = document.getElementById("mobileNumberDisplay");
    const genderDisplay = document.getElementById("genderDisplay");

  
    // Reset error messages
    fullnameError.innerText = "";
    emailError.innerText = "";
  
    if (name.trim() === "") {
      fullnameError.innerText = "Please enter the full name";
      return false;
    }
  
    if (email.trim() === "") {
      emailError.innerText = "Please enter the email address";
      return false;
    }
  
    // Additional email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailError.innerText = "Please enter a valid email address";
      return false;

      
    }
    displayFullName(); // Call the displayFullName() function to update the display
  redirectToPayment(); // Redirect to payment.html
  return true;
    
  

    
  
   
  }

    
    
    //button toggle
    function validateCardNumber() {
      const cardNoInput = document.getElementById('cardNo');
      const cardNoError = document.getElementById('cardNoError');
      const cardNoValue = cardNoInput.value.trim();
  
      if (cardNoValue.length === 0) {
        cardNoError.textContent = "Card Number is required.";
      } else {
        cardNoError.textContent = "";
      }
    }
  
    function validateExpiryDate() {
      const expiryInput = document.getElementById('expiry');
      const expiryError = document.getElementById('expiryError');
      const expiryValue = expiryInput.value.trim();
  
      if (expiryValue.length === 0) {
        expiryError.textContent = "Expiry Date is required.";
      } else {
        expiryError.textContent = "";
      }
    }
  
    function validateCvc() {
      const cvcInput = document.getElementById('cvc');
      const cvcError = document.getElementById('cvcError');
      const cvcValue = cvcInput.value.trim();
  
      if (cvcValue.length === 0) {
        cvcError.textContent = "CVC/CVN is required.";
      } else {
        cvcError.textContent = "";
      }
    }
  
    function validateCardName() {
      const cardNameInput = document.getElementById('cardName');
      const cardNameError = document.getElementById('cardNameError');
      const cardNameValue = cardNameInput.value.trim();
  
      if (cardNameValue.length === 0) {
        cardNameError.textContent = "Name on the Card is required.";
      } else {
        cardNameError.textContent = "";
      }
    }
  
    //payment page
    function validateForm2() {
      


      const cardNo = document.getElementById("cardNo").value;
      const expiry = document.getElementById("expiry").value;
      const cvc = document.getElementById("cvc").value;
      const cardName = document.getElementById("cardName").value;
  
      // Function to display error messages
      function showError(id, message) {
        document.getElementById(id).innerHTML = message;
      }
  
      // Reset error messages
      showError("cardNoError", "");
      showError("expiryError", "");
      showError("cvcError", "");
      showError("cardNameError", "");
  
      // Perform form validation
      let valid = true;
  
      if (cardNo.trim() === "" || isNaN(cardNo)) {
        showError("cardNoError", "Please enter a valid card number");
        valid = false;
      }
  
      if (expiry.trim() === "" || isNaN(expiry)) {
        showError("expiryError", "Please enter a valid expiry date");
        valid = false;
      }
  
      if (cvc.trim() === "" || isNaN(cvc)) {
        showError("cvcError", "Please enter a valid CVC/CVN");
        valid = false;
      }
  
      if (cardName.trim() === "") {
        showError("cardNameError", "Please enter the name on the card");
        valid = false;
      }
  
      return valid;
    }

