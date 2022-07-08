import axios from 'axios';

export async function battle(firstUser: string, secondUser: string) {

    const firstUserRepos = await axios.get(`https://api.github.com/users/${firstUser}/repos`);
    const secondUserRepos = await axios.get(`https://api.github.com/users/${secondUser}/repos`);

    const firstUserStars = firstUserRepos.data.map(repo => repo.stargazers_count).reduce((acc, curr) => acc + curr, 0);
    const secondUserStars = secondUserRepos.data.map(repo => repo.stargazers_count).reduce((acc, curr) => acc + curr, 0);

    return firstUserStars > secondUserStars ? firstUser : secondUser;
}