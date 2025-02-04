// players objects

const playerOne = {
    name: 'Player 1',
    score: 0,
    speed: 4,
    handling: 3,
    power: 3,
};

const playerTwo = {
    name: 'Player 2',
    score: 0,
    speed: 5,
    handling: 2,
    power: 5,
};

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
    for (let i = 1; i <= 5; i++) {
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

            if(powerResultOne > powerResultTwo && characterTwo.score > 0) {
                console.log(`${characterOne.name} wins the battle! ${characterTwo.name} losses one point 🐢`)
                characterTwo.score--;
            }

            if(powerResultTwo > powerResultOne && characterOne.score > 0) {
                console.log(`${characterTwo.name} wins the battle! ${characterOne.name} losses one point 🐢`)
                characterOne.score--;
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

async function declareWinner(playerOne, PlayerTwo) {
    console.log(`Final score \n`);
    console.log(`${playerOne.name}: ${playerOne.score} point(s)`);
    console.log(`${playerTwo.name}: ${playerTwo.score} point(s)`);

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
    console.log(
        `🚨 🏁 Racing between ${playerOne.name} and ${playerTwo.name} is about to begin... \n`
    );

    await playRace(playerOne, playerTwo);
    await declareWinner(playerOne, playerTwo);
})();