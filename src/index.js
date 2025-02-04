// players objects
characters = [
    { name: "Mario", speed: 4, handling: 3, power: 3, score: 0 },
    { name: "Luigi", speed: 3, handling: 4, power: 3, score: 0 },
    { name: "Peach", speed: 3, handling: 4, power: 2, score: 0 },
    { name: "Donkey Kong", speed: 2, handling: 2, power: 5, score: 0 },
    { name: "Toad", speed: 2, handling: 5, power: 4, score: 0 },
    { name: "Yoshi", speed: 2, handling: 4, power: 3, score: 0 },
    { name: "Bowser", speed: 5, handling: 2, power: 5, score: 0 },
    { name: "Kirby", speed: 5, handling: 3, power: 2, score: 0 },
    { name: "Samus", speed: 4, handling: 4, power: 4, score: 0 },
    { name: "Fox", speed: 3, handling: 5, power: 3, score: 0 },
];

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = 'Forward';
            break;
        case random < 0.66:
            result = 'Curve';
            break;
        default:
            result = 'Battle';
    }

    return result;
};

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolls a ${block} dice: ${diceResult} + ${attribute} = ${diceResult + attribute}`);
};

async function playRace(characterOne, characterTwo) {
    for (let i = 1; i <= 6; i++) {
        console.log(`\n 🏁 Round ${i}`);

        //random event block
        let block = await getRandomBlock();
        console.log(`Current block: ${block} \n`);

        // roll dice for both players
        let diceOne = await rollDice();
        let diceTwo = await rollDice();

        // skill points
        let totalTestSkillOne = 0;
        let totalTestSkillTwo = 0;

        // calculate skill points
        if (block === "Forward") {
            totalTestSkillOne = (characterOne.speed + diceOne);
            totalTestSkillTwo = (characterTwo.speed + diceTwo);

            await logRollResult(
                characterOne.name,
                "speed",
                diceOne,
                characterOne.speed
            );

            await logRollResult(
                characterTwo.name,
                "speed",
                diceTwo,
                characterTwo.speed
            );
        }

        if (block === "Curve") {
            totalTestSkillOne = (characterOne.handling + diceOne);
            totalTestSkillTwo = (characterTwo.handling + diceTwo);

            await logRollResult(
                characterOne.name,
                "handling",
                diceOne,
                characterOne.handling
            );

            await logRollResult(
                characterTwo.name,
                "handling",
                diceTwo,
                characterTwo.handling
            );
        }

        if (block === "Battle") {
            let powerResultOne = (characterOne.power + diceOne);
            let powerResultTwo = (characterTwo.power + diceTwo);

            let powerUps = ['Turtle Shell', 'Bomb', 'Banana Peel'];
            let powerUp = powerUps[Math.floor(Math.random() * powerUps.length)];

            console.log(`${characterOne.name} battle with ${characterTwo.name} 🥊`);

            await logRollResult(
                characterOne.name,
                "power",
                diceOne,
                characterOne.power
            );

            await logRollResult(
                characterTwo.name,
                "power",
                diceTwo,
                characterTwo.power
            );

            if (powerResultOne > powerResultTwo && characterTwo.score > 0) {
                if (powerUp === "Turtle Shell") {
                    console.log(`${characterOne.name} wins the battle! ${characterTwo.name} was hit by a ${powerUp} and losses 2 points 🐢`)
                    characterTwo.score -= 2;
                } else if (powerUp === "Bomb") {
                    console.log(`${characterOne.name} wins the battle! ${characterTwo.name} was blows away by a ${powerUp} and losses 3 points 💣`)
                    characterTwo.score -= 3;
                } else {
                    console.log(`${characterOne.name} wins the battle! ${characterTwo.name} slips in a ${powerUp} and losses 1 point 🍌`)
                    characterOne.score--;
                }
            }

            if (powerResultTwo > powerResultOne && characterOne.score > 0) {
                if (powerUp === "Turtle Shell") {
                    console.log(`${characterTwo.name} wins the battle! ${characterOne.name} was hit by a ${powerUp} and losses 2 points 🐢`)
                    characterOne.score -= 2;
                } else if (powerUp === "Bomb") {
                    console.log(`${characterTwo.name} wins the battle! ${characterOne.name} was blows away by a ${powerUp} and losses 3 points 💣`)
                    characterOne.score -= 3;
                } else {
                    console.log(`${characterTwo.name} wins the battle! ${characterOne.name} slips in a ${powerUp} and losses 1 point 🍌`)
                    characterOne.score--;
                }
            }
            /* ifs ternarios
            characterTwo.score -= powerResultOne > powerResultTwo && characterTwo.score > 0 ? 1 : 0;

            characterOne.power -= powerResultTwo > powerResultOne && characterOne.score > 0 ? 1 : 0;

            console.log(
                powerResultTwo === powerResultOne 
                ? "It's a tie! No points lost!"
                : "");
            */
        }
        let nitro = Math.floor(Math.random() * 1);

        // compare skills
        if (totalTestSkillOne > totalTestSkillTwo) {
            console.log(`${playerOne.name} wins this round! \n`);
            characterOne.score++;
        } else if (totalTestSkillOne < totalTestSkillTwo) {
            console.log(`${playerTwo.name} wins this round! \n`);
            characterTwo.score++;
        }
        console.log("----------------------------------------------------------------");
    }
};

async function declareWinner(playerOne, playerTwo) {
    console.log(`Final score \n`);
    console.log(`${playerOne.name}: ${playerOne.score} point(s) \n`);
    console.log(`${playerTwo.name}: ${playerTwo.score} point(s) \n`);

    if (playerOne.score > playerTwo.score) {
        console.log(`${playerOne.name} wins the race! 🏆`);
    } else if (playerOne.score < playerTwo.score) {
        console.log(`${playerTwo.name} wins the race! 🏆`);
    } else {
        console.log("It's a tie! No one wins the race.");
    }
}

// auto involke function
(async function main() {
    let randomNumber1 = Math.floor(Math.random() * characters.length);
    let randomNumber2 = Math.floor(Math.random() * characters.length);

    if (randomNumber1 !== randomNumber2) {

        console.log(randomNumber1, randomNumber2);
        playerOne = characters[randomNumber1];
        playerTwo = characters[randomNumber2];
        console.log(playerOne, playerTwo);
        console.log(
            `🚨 🏁 Racing between ${playerOne.name} and ${playerTwo.name} is about to begin... \n`
        );

        await playRace(playerOne, playerTwo);
        await declareWinner(playerOne, playerTwo);
    }else {
        console.log("Bad mood outside for a race! 🌧️");
    }
})();