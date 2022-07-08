import axios from 'axios';
import * as fighterRepository from '../repositories/fighter.js';

export async function battle(firstUser: string, secondUser: string) {

    const firstUserRepos = await getRepos(firstUser);
    const secondUserRepos = await getRepos(secondUser);

    const firstFighter = await getFighter(firstUser);
    const secondFighter = await getFighter(secondUser);

    const firstUserStars = starsCount(firstUserRepos);
    const secondUserStars = starsCount(secondUserRepos);

    return battleResult(
        firstFighter,
        secondFighter,
        firstUserStars,
        secondUserStars
    );
}

async function getRepos(user: string) {
    const { data } = await axios.get(`https://api.github.com/users/${user}/repos`);
    return data;
}

async function getFighter(user: string) {

    const fighter = await fighterRepository.findByUsername(user);

    if (!fighter) {
        const createdFighter = await fighterRepository.insert(user);
        return { id: createdFighter.id, user, wins: 0, losses: 0, draws: 0 };
    }

    return fighter;
}

function starsCount(repos: any[]) {
    return repos.map(repo => repo.stargazers_count).reduce((acc, curr) => acc + curr, 0);
}

async function battleResult(firstFighter: any, secondFighter: any, firstUserStars: number, secondUserStars: number) {

    if (firstUserStars > secondUserStars) {

        console.log("first user wins");
        await updateWinnerAndLoserStats(firstFighter.id, secondFighter.id);
        return {
            winner: firstFighter,
            winnerStars: firstUserStars,
            loser: secondFighter,
            loserStars: secondUserStars,
            draw: false
        };

    } else if (firstUserStars < secondUserStars) {

        console.log("second user wins");
        await updateWinnerAndLoserStats(secondFighter.id, firstFighter.id);
        return {
            winner: secondFighter.username,
            winnerStars: secondUserStars,
            loser: firstFighter.username,
            loserStars: firstUserStars,
            draw: false,
        };
    }

    console.log('draw');
    await updateDrawStats(firstFighter.id, secondFighter.id);
    return { winner: null, loser: null, draw: true, totalStars: firstUserStars };
}

async function updateWinnerAndLoserStats(winnerId: number, loserId: number) {
    await fighterRepository.updateStats(winnerId, "wins");
    await fighterRepository.updateStats(loserId, "losses");
}

async function updateDrawStats(firstFighterId: number, secondFighterId: number) {
    await fighterRepository.updateStats(firstFighterId, "draws");
    await fighterRepository.updateStats(secondFighterId, "draws");
}