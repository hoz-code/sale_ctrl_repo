function showToastMessage(message, duration) {
    const toastcontainer = document.getElementById('toast-message');

    const toaselement = document.createElement('div');
    toaselement.classList.add('toast');
    toaselement.textContent = message;

    toastcontainer.appendChild(toaselement);

    setTimeout(() => {
        toaselement.classList.add('show');
    }, 100);

    setTimeout(() => {
        setTimeout(() => {
            toastcontainer.removeChild(toaselement);
        }, 500);
    }, duration);
}

export { showToastMessage };