import React, {
    Component
} from 'react';
import styles from './game-stats.module.css';
import { Grid } from 'semantic-ui-react'
import LinearProgress from '@material-ui/core/LinearProgress';
import { urlConstants } from '../../../constants/url-constants';
import { Link } from 'react-router-dom';


class GameStats extends Component {
    
    componentDidMount() {
        this.data = this.props.stats;   
    }

    render() {
        const background = { 
            background: `linear-gradient(90deg, ${this.props.team1Color}a0 25%, ${this.props.team2Color}a0 75%)`,
            // background: `linear-gradient(90deg, #a0000010 25%, #0000001a 75%)`,
            // boxShadow: `0 6px 10px rgba(0,0,0,0.19), 0 3px 5px rgba(0,0,0,0.23)`

        };
        this.currentPeriodString = null;
        this.progressBar = <LinearProgress className={styles.livebar}/>;
        this.data = this.props.stats;
        if (this.data === undefined){
            return null;
        }
        
        if (this.data.hTeam.linescore.length === 0 || this.data.vTeam.linescore.length === 0){
            this.table = null;
        } else {
            
            this.table = (
                <div className={styles.GameScoreSummary}>
                    <ul>
                        <li className={styles.header}>
                            <label className={styles.teamName}><b>Team</b></label>
                            <label><b>P1</b></label>
                            <label><b>P2</b></label>
                            <label><b>P3</b></label>
                            <label><b>P4</b></label>
                            <label><b>Total</b></label>
                        </li>
                        <li>
                           
                            <label className={styles.teamName}>
                                <Link to={'/app/leaderboards/' + this.data.hTeam.teamId}>
                                    {this.data.hTeam.fullName}
                                </Link>
                            </label>
                            
                            
                            <label>{this.data.hTeam.linescore[0].score}</label>
                            <label>{this.data.hTeam.linescore[1].score}</label>
                            <label>{this.data.hTeam.linescore[2].score}</label>
                            <label>{this.data.hTeam.linescore[3].score}</label>
                            <label>{this.data.hTeam.score}</label>
                        </li>
                        <li>
                            <label className={styles.teamName}>
                                <Link to={'/app/leaderboards/' + this.data.hTeam.teamId}>
                                {this.data.vTeam.fullName}
                                </Link>
                            </label>
                            <label>{this.data.vTeam.linescore[0].score}</label>
                            <label>{this.data.vTeam.linescore[1].score}</label>
                            <label>{this.data.vTeam.linescore[2].score}</label>
                            <label>{this.data.vTeam.linescore[3].score}</label>
                            <label>{this.data.vTeam.score}</label>
                        </li>
                    </ul>
                </div>
            );
            
            if (this.data.period.isEndOfPeriod){
                this.data.clock = 'End of period '+ this.data.period.current;
            }
            if (this.data.clock==='' || this.data.clock === undefined) {
                this.data.clock = '--';
            } else {
                this.currentPeriodString = (<p>Period: {this.data.period.current}</p>);
            }
            if (this.data.statusNum === 3){
                this.data.clock = 'Final';
                this.progressBar = null;
                this.currentPeriodString = null;
            }
            
        }
        return (
            <div className={styles.container}>
                <Grid textAlign="center">
                    <Grid.Row>
                        
                        <Grid.Column width={6} className={styles.teamName}>
                            <h1 className={styles.headerTeamName}>{this.data.hTeam.fullName}</h1>
                        </Grid.Column>
                        
                        <Grid.Column width={4} verticalAlign="middle" className={styles.middleCol}>
                            <h3>{this.data.clock}</h3>
                            {this.currentPeriodString}
                        </Grid.Column>

                        <Grid.Column width={6} className={styles.teamName}>
                            <h1 className={styles.headerTeamName}>{this.data.vTeam.fullName}</h1>
                        </Grid.Column>
                        
                    </Grid.Row>

                    <Grid.Row style={background}>
                        <Grid.Column width={4}>
                            <div>
                                <img className={styles.image} src={urlConstants.GET_TEAM_LOGO(this.data.hTeam.triCode)} alt="team"></img>
                            </div>
                            <p><b>{this.data.hTeam.win} - {this.data.hTeam.loss}</b></p>
                        </Grid.Column>
                        <Grid.Column width={2} verticalAlign="middle">
                            <h2 className={styles.score}> {this.data.hTeam.score}</h2>
                        </Grid.Column>

                        <Grid.Column width={2} verticalAlign="middle" className={styles.middleCol}>
                            <h1>-</h1>
                        </Grid.Column>

                        <Grid.Column width={2} verticalAlign="middle">
                            <h2 className={styles.score}>{this.data.vTeam.score}</h2>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <div>
                                <img className={styles.image} src={urlConstants.GET_TEAM_LOGO(this.data.vTeam.triCode)} alt="team"></img>
                            </div>
                            <p><b>{this.data.vTeam.win} - {this.data.vTeam.loss}</b></p>
                        </Grid.Column>
                    </Grid.Row>
                    {/* <Grid.Row>
                        <div>{this.data.nugget.text}</div>
                    </Grid.Row> */}

                    <Grid.Row centered>
                            {this.table}
                    </Grid.Row>                  
                </Grid>
                <div className={styles.bar}>
                    {this.progressBar}                

                </div>
            </div>
            
        );
        
    }
}

export default GameStats;