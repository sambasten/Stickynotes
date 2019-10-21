import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class Notes extends Component {

    constructor(props){
    super(props);
    this.state= {editing:false ,
                 inputValue: ''};
    }

    save = () =>{
      var val= this.refs.newText.value;
      alert ("Save Node value: " + val);
      this.setState({editing:false});
    }
    edit = () =>{
       this.setState({editing:true});
      }

    remove = () =>{
        alert("Removing note");
      }

    // updateInputValue = (evt) => {
    //     this.setState({inputValue: evt.target.value
    //     });
    //   }

    handleForm = () => {
       return(
            <div className="note">
              <textarea className="form-control" defaultValue= {this.props.children}  ref= "newText"></textarea>
              <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk"/>
              </div>
          );
      }

    handleDisplay = () => {
        return(
          <div className="note">
              <p>{this.props.children}</p>
              <span>
                  <button onClick={this.edit} className ="btn btn-primary glyphicon glyphicon-pencil"/>
                  <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash"/>
              </span>  
              </div>
              );

}

    render(){
         if (this.state.editing){
             return this.handleForm();
         }
         else {
          return this.handleDisplay();
         }
    }

  }
    
class Board extends Component{
    constructor(props){
    super(props);
    this.state={
      notes: ['Call Bill',
              'Email Lisa',
              'Make Dental Appointment'
              ]
    };
  }

    proptypes = {
      count (props, propsName){
          if (typeof props[propsName] != "number"){
            return new Error ('The count property must be a number')
          }
          if (props[propsName] > 100){
            return new Error ('Creating ' + props[propsName] + " notes is ridiculous")
          }
      }
    }

    render(){
        return (<div className="board">
                   {this.state.notes.map(item => (
                    <Notes key={item}>{item}</Notes>
                    ))}
                </div>);
    }
}

export {Board, Notes};

