import React, {
    Component
} from 'react';
import styles from './match-details.module.css';
// import styles from './matches-list.module.css';
import { Loader, Dimmer, Grid } from 'semantic-ui-react'
import PlayerStats from './player-stats/player-stats';
import GameStats from './game-stats/game-stats';

class MatchDetails extends Component {

    loading = (<Loader inline='centered' active content='Loading' />);
    
    
    componentDidMount() {
        this.hPlayers = this.loading;
        this.vplayers = this.loading;
    }
    

    gameStats = (stats) => {
        return (
            <GameStats stats={stats}/>
        );
    }

    render() {
        
        if (!!this.props.match.stats){
            this.basicGameData = this.props.match.basicGameData;
            this.match = this.props.match.stats;
            this.home = this.props.match.basicGameData.hTeam;
            this.away = this.props.match.basicGameData.vTeam;
            this.activePlayers = this.match.activePlayers;
            
                
            if (this.props.match !== 'loading') {
                this.hPlayers = <PlayerStats playerList={this.activePlayers} players={this.props.players} teamId={this.home.teamId}/>;
                this.vplayers = <PlayerStats playerList={this.activePlayers} players={this.props.players} teamId={this.away.teamId}/>;
            }
            
            return ( 
                <Grid centered columns={2}>
                    <Grid.Row>
                    <GameStats stats={this.basicGameData}/>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column>
                            {/* <div className = {styles.container}> */}
                            {/* <h3>{this.home.triCode}</h3> */}
                                {this.hPlayers}
                            {/* </div> */}
                        </Grid.Column>
                        <Grid.Column>
                            {/* <div className = {styles.container}> */}
                            {/* <h3>{this.away.triCode}</h3> */}
                                {this.vplayers}
                            {/* </div> */}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                
            );
        } else {
            return (
                <div className = {styles.container}>
                    <h3>Game Not Started</h3>
                </div>
            );
        }
        

        
    }
}

export default MatchDetails;