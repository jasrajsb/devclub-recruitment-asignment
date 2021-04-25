import React from 'react';
import './comp.css'
class Button extends React.Component {
    constructor(props){
        super(props);
        this.displayName='Button';
    }
    onClick = (e) => {
        
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    };
    render() {
        return (
            <div jk='button' style={{width:'100%'}} className=''>
                <button className={" xcenter ycenter btn btn-primary my-2 JKButton "+this.props.className}  onClick={this.onClick}>{this.props.name}</button>
            </div>
        )
    }

}

export default Button;