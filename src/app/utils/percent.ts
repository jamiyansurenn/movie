function formatVoteAverage(vote: number) {
    const hours = Math.floor(vote / 60);
    const minutes = vote % 60;
    return `${hours}h ${minutes}min`;
   }
   export default formatVoteAverage;