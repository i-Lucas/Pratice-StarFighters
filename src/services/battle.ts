import axios from 'axios';

export async function battle(firstUser: string, secondUser: string) {

    const firstUserRepos = await getRepos(firstUser);
    const secondUserRepos = await getRepos(secondUser);

    const firstUserStars = starsCount(firstUserRepos);
    const secondUserStars = starsCount(secondUserRepos);

    return firstUserStars > secondUserStars ? firstUser : secondUser;
}

async function getRepos(user: string) {
    const { data } = await axios.get(`https://api.github.com/users/${user}/repos`);
    return data;
}

function starsCount(repos: any[]) {
    return repos.map(repo => repo.stargazers_count).reduce((acc, curr) => acc + curr, 0);
}