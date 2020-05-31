
const passwordText = document.querySelector(".app__password"),
generateBtn = document.querySelector(".app__btn"),
inputField = document.querySelector(".app__input"),
loader = document.querySelector(".loader");

async function getWords() {
    try {
        const data = await fetch(
            `https://cors-anywhere.herokuapp.com/https://random-word-api.herokuapp.com/word?number=500`
        );
        const wordList = await data.json();

        const filteredList = wordList.filter((word) => word.length <= 6);

        loader.style.display = "grid";
        setTimeout(() => {
            loader.style.display = 'none';
        }, 2000);

        generatePassword(filteredList);
        console.log(filteredList);
    } catch (err) {
        console.log(err);
        alert("Something went wrong");
    }
}



generateBtn.addEventListener("click", getWords);

passwordText.addEventListener("click", function () {
    inputField.select();
    inputField.setSelectionRange(0, 999);
    document.execCommand("Copy");
    alert("Copied to clipboard 😎");
});

function generatePassword(wordList) {
    const numberSet = ["1", "2", "3", "4"]
        .sort(() => Math.random() - 0.5)
        .join("");
    const chosenWord = wordList[getRandom(wordList)] + numberSet;
    inputField.value = chosenWord;
    passwordText.textContent = chosenWord;
}

function getRandom(list) {
    return Math.floor(Math.random() * list.length);
}
