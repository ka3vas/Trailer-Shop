export function customAlert (customAlertSettings) {
  
  const customAlertBody = document.createElement('div');
  customAlertBody.className = `alert alert_hide alert_${customAlertSettings.style}`;

  const customAlertInnerBody = `
                                <p class="alert__text ">${customAlertSettings.message}</p>
                                <span class="alert__button alert__button_right_remove">&#10006</span>
                              `;

  customAlertBody.innerHTML = customAlertInnerBody;
  
  // Add customAlert to the document
  document.body.insertAdjacentElement('beforeend', customAlertBody);
  
  const customAlertHeight = document.querySelector('.alert').offsetHeight;
  
  setTimeout(() => {
    document.querySelector('body').style.paddingTop = `${customAlertHeight}px`;
    document.querySelector('.alert').classList.remove('alert_hide');
  }, 2000);

  // Close button event
  document.querySelector('.alert__button_right_remove').addEventListener('click', function(e) {
    
    // Fade out the alert
    const removeThis = e.target.parentNode;
    removeThis.style.opacity = '0';

    // Remove it
    setTimeout(() => {
      removeThis.parentNode.removeChild(removeThis);
    }, 1500);
    
    // Remove the padding that was added earlier
    document.querySelector('body').style.paddingTop = 0;
  });
}
