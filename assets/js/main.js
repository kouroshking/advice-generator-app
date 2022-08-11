const spinner = document.getElementById("spinner");
let currentAdviceId;
window.onload = async () => {
  await changeAdvice();
  spinner.style.display = "none";
};
const apiURL = "https://api.adviceslip.com/advice";

const adviceBtn = document.getElementById("advice-btn");
const adviceText = document.getElementById("advice-text");
const adviceNumber = document.getElementById("advice-number");

const getRandomAdvice = async () => {
  try {
    const { data } = await axios.get(apiURL);

    return data?.slip;
  } catch (error) {
    console.log(error);
  }
};

const generateAdvice = async () => {
  const advice = await getRandomAdvice();

  return advice;
};

const changeAdvice = async () => {
  const { id, advice } = await generateAdvice();

  if (id && advice) {
    if (currentAdviceId !== id) {
      currentAdviceId = id;
      adviceText.innerHTML = `&ldquo;${advice}&rdquo;`;
      adviceNumber.innerText = `ADVICE #${id}`;
    } else {
      await changeAdvice();
    }
  }
};

adviceBtn.addEventListener("click", async () => {
  adviceText.innerText = "";
  adviceNumber.innerText = "";
  spinner.style.display = "block";
  await changeAdvice();
  spinner.style.display = "none";
});
