/**
 * URL constants to be used throughout the app for retreiving data
 */

export const urlConstants = {

    BASE_URL: '/api?request=',
    // BASE_URL : 'https://data.nba.net',
    GET_ALL_TEAMS: '/prod/v2/2018/teams.json',
    GET_ALL_PLAYERS: '/prod/v1/2018/players.json',
    GET_GAMES_BY_DAY: (formattedDate) => `/prod/v2/${formattedDate}/scoreboard.json`,
    FORMAT_DATE: date => date.getFullYear() + ('0' + (date.getMonth()+1)).slice(-2) + ('0' + (date.getDate())).slice(-2),
    GET_GAME_DETAILS: (formattedDate, gameId) => `/prod/v1/${formattedDate}/${gameId}_boxscore.json`,
    GET_TEAM_LOGO: (tricode) => `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${tricode.toLowerCase()}.png`,
    GET_PLAYER_STATS: (personId) => `/prod/v1/2018/players/${personId}_profile.json`,

};