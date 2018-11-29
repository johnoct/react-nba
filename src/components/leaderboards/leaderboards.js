import React, { Component } from 'react';
import styles from './leaderboards.module.css';
import axios from 'axios';
import { urlConstants } from '../../constants/url-constants';
import TeamProfile from './team-profile/team-profile';

// import { Loader, Grid, Button } from 'semantic-ui-react'
import { BrowserRouter, Route, NavLink, Link, Switch, Redirect } from 'react-router-dom';


class LeaderBoards extends Component {

    baseURL = urlConstants.BASE_URL;
    getTeamStandings = urlConstants.GET_TEAM_STANDINGS;

    state = {
        east: [],
        west: []
    }

    async componentDidMount() {
        await this.getTeams();
    }

    async getTeams() {
        const res = await axios.get(this.baseURL + this.getTeamStandings);
        const east = await res.data.league.standard.conference.east;
        const west = await res.data.league.standard.conference.west;
        this.setState({
        east: east,
        west: west

        });
        return this.state;
    }
    
    getTeamName(teamId) {
        return this.props.teams.find( team => team.teamId === teamId);
    }

    clickHandler = (teamId) => {
        console.log(this.props);
        this.props.history.push("/app/leaderboards/"+teamId);
    }

    makeList = (conference) => {
        return (
            <ul>
                <li className={styles.header}>
                    <label><b>Rank</b></label>
                    <label className={styles.teamName}><b>Team</b></label>
                    <label><b>Wins</b></label>
                    <label><b>Losses</b></label>
                    <label><b>Home</b></label>
                    <label><b>Away</b></label>
                    <label><b>Last 10</b></label>
                </li>
                {conference.map( (team, ind) => {
                    let background = {};
                    if ((ind%2)===0){
                        background = {
                            'background': `#00000010`
                        }
                    } 
                    
                    return (
                        <li onClick={() => this.clickHandler(team.teamId)} style={background} className={styles.playerRow}>
                            <label>{ind+1}</label>
                            <label className={styles.teamName}>{this.getTeamName(team.teamId).ttsName}</label>
                            <label>{team.win}</label>
                            <label>{team.loss}</label>
                            <label>{team.homeWin}-{team.homeLoss}</label>
                            <label>{team.awayWin}-{team.awayLoss}</label>
                            <label>{team.streak}-{team.isWinStreak ? 'W' : 'L'}</label>

                        </li>
                    );
                })}
            </ul>
        );
        
        
        
    }

    render() {

        if (!!this.state.east){
            let east = this.makeList(this.state.east);
            let west = this.makeList(this.state.west);
            let width = { width: '35%' };
            if (this.props.location.pathname==='/app/leaderboards'){
                width = { width: '100%'};
                console.log(styles.StandingsList);
            }
            return (
                <div className={styles.container}>
                    {/* <div className={styles.containerHeader}>
                        <h1>Leaderboards</h1>
                    </div>       */}
                    <div style={width} className={styles.StandingsList}>
                        <div className={[styles.listContainer, 'containerCard'].join(' ')}>
                            <div className={styles.confHeader}>
                                <h1>West</h1>
                            </div>
                            
                            {west}
                        </div>
                        <div className={[styles.listContainer, 'containerCard'].join(' ')}>
                            <div className={styles.confHeader}>
                                <h1>East</h1>
                            </div>
                            {east}
                        </div>
                    </div>
                        <Route path="/app/leaderboards/:teamId" component={ (props) => {
                            return (
                                <div className={styles.teamProfile}>
                                    <TeamProfile {...props}></TeamProfile>
                                </div>);
                        }}/>
                </div>
            );
        } else {
            return (<div className={styles.container}>
                <div>
                    <h1>Leaderboards</h1>
                </div>      
            </div>);
        }
        
    }

}

export default LeaderBoards;