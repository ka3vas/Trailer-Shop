export function customAlert (alertTheme, alertMessage) {
  // build up the alert
  
  
  const customAlertBody = document.createElement('div');
  customAlertBody.className = `alert ${alertTheme}`;

  const customAlertInnerBody = `
                                <p class="alert__text ">${alertMessage}</p>
                                <span class="alert__button alert__button_right_remove">&#10006</span>
                              `;

  customAlertBody.innerHTML = customAlertInnerBody;
  
  // Add customAlert
  document.body.insertAdjacentElement('afterbegin', customAlertBody);
  

  document.querySelector('.alert__button_right_remove').addEventListener('click', function(e) {
    // Fade out the alert
    const removeThis = e.target.parentNode;
    removeThis.style.opacity = '0';

    // Remove it from document
    setTimeout(() => {
      removeThis.parentNode.removeChild(removeThis);
    }, 2000);
  
    // when alert gets added its height should be added to the padding-top of the first element so it wont hide it
    // ninja code at work (i know)
    const test = document.querySelector('h1');
    test.style.paddingTop = "64px";
  });
}
