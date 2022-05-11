#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import { createSpinner} from 'nanospinner';

//global variable for player name
let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r,ms));

//to animate the welcome text
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who am I today? \n'
    );
//delayed execution in the async function to let the rest of it play out
    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right--
    `)
}

await welcome()

async function askName(){
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Jordan';
        }
    });

    playerName = answers.player_name
}
//must be outside of async askName function
await askName();

//time for questions and how they will be handled
async function question1(){
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list', //creates an array of multiple choice answers to choose from
        message: 'I think therefore I am\n',
        choices:[
            'I am so I do',
            'A great saying',
            'Mama Keif',
        ],
        }); 
        //the correct answer from 'answers' in a new return function
        return handleAnswer(answers.question_1 == 'I am so I do');

        //make a spinner to wait and check if answer is correct
        async function handleAnswer(isCorrect) {
            const spinner = createSpinner('Lets see...').start();
            await sleep();

            if (isCorrect) {
                spinner.success({ text: `Nice work ${playerName}.`})
            } else {
                spinner.error(`get out of here`);
                process.exit(1) //terminate the script
            }
        }
    }

    function winner(){
        console.clear();
        const msg = ` LETS GO ${playerName} !\n`;

        figlet(msg, (err, data)=>{
            console.log(gradient.pastel.multiline(data))
        });
    }

    await question1();
    await winner();