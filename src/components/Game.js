import React,{Component} from 'react';
import Board from './Board';

class Game extends Component{
	constructor(props){
		super(props);
		this.state={
			stop:false,
			winner:'',
			xisnext:true,
			stepno:0,
			history:[{squares:Array(9).fill(null)}]
		}
	}
	clickHandler(i)
	{
		if(this.state.stop){
			return;
		}
		const his=this.state.history.slice(0,this.state.stepno+1);
		const con=his[his.length-1];
		const sq=con.squares;
		if(sq[i]==null){
			sq[i]=this.state.xisnext?'X':'O';
			this.setState({history:his.concat({squares:sq}),
				stepno:his.length,
				xisnext:!this.state.xisnext		
			});
		}
		console.log(sq[i] , "Stepno:" , this.state.stepno , "stop" , this.state.stop);
		const win=findwinner(sq,i);
		if(this.state.stepno === 8){
			this.setState({winner:'Match draw' ,stop:true});
		}
		if(win === 'Winner'){
			this.setState({winner:sq[i]+' is the winner',stop:true});
			return;
		}
	}
	restartGame() {
		window.location.reload(false);
	}
	render(){

		const history=this.state.history;
		const current=history[this.state.stepno];
		return(
			<div className='game'>
				<div className='game-board'>
					<Board squares={current.squares} onClick={(i)=>this.clickHandler(i)} />
					<h1 className="winner">{this.state.winner}</h1>
					{this.state.winner !== '' && 
						<div 
							style={{
								justifyContent:'center',
								alignContent:'center',
								textAlign:'center'
							}}
						>
							<button 
								className= "restartGameButton"
								onClick={()=>{this.restartGame()}}
							>
								Restart Game
							</button>
						</div>
					}
				</div>
			</div>
		);
	}
}
function findwinner(sq,i)
{
	console.log(sq);
	if((sq[0]!=null) && (sq[0]===sq[1]) && (sq[1]===sq[2])){
		console.log('012');
		return 'Winner';	
	}
	if((sq[3]!=null) && (sq[3]===sq[4]) && (sq[4]===sq[5])){
		console.log('345');
		return 'Winner';
	}
	if((sq[6]!=null) && (sq[6]===sq[7]) && (sq[7]===sq[8])){
		console.log('678');
		return 'Winner';
	}
	if((sq[0]!=null) && (sq[0]===sq[3]) && (sq[3]===sq[6])){
		console.log('036');
		return 'Winner';
	}
	if((sq[1]!=null) && (sq[1]===sq[4]) && (sq[4]===sq[7])){
		console.log('147');
		return 'Winner';
	}
	if((sq[2]!=null) && (sq[2]===sq[5]) && (sq[5]===sq[8])){
		console.log('258');
		return 'Winner';
	}
	if((sq[0]!=null) && (sq[0]===sq[4]) && (sq[4]===sq[8])){
		console.log('258');
		return 'Winner';
	}
	if((sq[2]!=null) && (sq[2]===sq[4]) && (sq[4]===sq[6])){
		console.log('258');
		return 'Winner';
	}
	
	return 'false';
}

//0 1 2
//3 4 5
//6 7 8

export default Game;
