import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
const $ = window.$;

class Notes extends Component {

    constructor(props){
    super(props);
    this.state= {editing:false ,
                 inputValue: ''};
    }


    componentWillMount = () =>{
      this.style = {
          right: this.randomBetween(0,window.innerWidth-200) + 'px',
          top: this.randomBetween(0,window.innerHeight-200) + 'px',
          transform: 'rotate(' + this.randomBetween(-15,15) + 'deg)'
      };
    }

    randomBetween= (min, max)=>{
      return (min + Math.ceil(Math.random()*max));
    }

    componentDidMount = () =>{
      const node = ReactDOM.findDOMNode(this);
      $(node).draggable();
    }

    save = () =>{
      // var val= this.refs.newText.value;
      // alert ("Save Node value: " + val);
      this.props.onChange(this.refs.newText.value, this.props.index);
      this.setState({editing:false});
    }
    edit = () =>{
       this.setState({editing:true});
      }

    remove = () =>{
        // alert("Removing note");
        this.props.onRemove(this.props.index);
      }

    // updateInputValue = (evt) => {
    //     this.setState({inputValue: evt.target.value
    //     });
    //   }

    handleForm = () => {
       return(
            <div className="note" style={this.style}>
              <textarea className="form-control" defaultValue= {this.props.children}  ref= "newText"></textarea>
              <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk"/>
              </div>
          );
      }

    handleDisplay = () => {
        return(
          <div className="note" style={this.style}>
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
    this.state={value: "" ,notes: []};
  }
    nextId = ()=>{
      this.uniqueId = this.uniqueId || 0;
      return this.uniqueId++;
    }

    add = value => {
      this.setState(state => {
      const notes = state.notes.concat({ id:this.nextId(),note:state.value});
      return {
        notes,
        value: '',
      };
    });
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

    update= (newText, i) =>{
        var arr = this.state.notes;
        arr[i].note = newText;
        this.setState({ notes: arr });
    }

    remove = (i) =>{
        var arr = this.state.notes;
        arr.splice(i,1);
        this.setState({ notes:arr});
    }

    eachNote = (note, i) =>{
      return (
              <Notes key={note.id} index={i} onChange={this.update} onRemove={this.remove}>{note.note}</Notes>
          )}

    render(){
        return (<div className="board">
                   {this.state.notes.map(
                   this.eachNote)}
                   <button className="btn btn-sm btn-success glyphicon glyphicon-plus" onClick={this.add}/>
                </div>);
    }
}

export default Board;

