const copyBtn = document.querySelector('#copy-btn');

copyBtn.addEventListener('onClick', () => {
  console.log("clicked")
  const textToCopy = copyBtn.getAttribute('data-clipboard-text');
  console.log(textToCopy)
  navigator.clipboard.writeText(textToCopy);
});