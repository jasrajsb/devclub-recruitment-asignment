import React from 'react';
import './comp.css';
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            state: 'help',
            dispval : true
        };
        
        if (this.props.val) {
            this.props.onChange((this.props.val));
        }
        this.inputref = React.createRef();
        this.dispval = true;
    }
    stateSetter = (state) => {
        this.setState({
            state: state
        })
    }
    onKeyUp = (e) => {
        
        this.props.onChange(e.target.value);
    };
    render() {
        
        this.props.stateSetterReceiver(this.stateSetter);
        
        if(this.state.dispval){
            this.setState({
                dispval:false,
            })
        }
        return (
            <div jk='input' className={'col-12 ' + this.props.colClass}>

                <div >
                    <div className="form-group mb-3">
                        <label htmlFor={this.props.name}>{this.props.name} <span className='optional' style={{ display: !this.props.required ? 'inline' : 'none' }}>(optional)</span></label>
                        <div className={"input-group mt-1 " + (this.state.focused ? 'input_focus ' : ' ') + (this.state.state === 'invalid' ? 'jkinput-invalid ' : ' ') + (this.state.state === 'valid' ? 'jkinput-valid ' : ' ') + (this.props.disabled ? 'JKInput-disabled ' : '')}>
                            <div className={"input-group-prepend " + (this.props.pre ? '' : 'd-none')}>
                                <div className={"input-group-text "}>{this.props.pre}</div>
                            </div>
                            <input value={this.state.dispval?this.props.val:undefined} ref={this.inputref} id={this.props.id || null} onKeyUp={this.onKeyUp} disabled={this.props.disabled} autoComplete="band" type={this.props.type || 'text'} className={"form-control JKInput " + (this.props.disabled ? 'JKInput-disabled ' : '') + (this.props.className || '')} aria-describedby={this.props.name} placeholder={this.props.name} onFocus={() => { this.setState({ focused: true }) }} onBlur={() => { this.setState({ focused: false }) }} />

                            

                        </div>
                        <small id={this.props.name + '-help'} className={"form-text text-muted " + (this.state.state === 'help' ? '' : 'd-none')} >{this.props.help || ''}</small>
                        <small id={this.props.name + '-invalid'} className={"form-text text-danger " + (this.state.state === 'invalid' ? '' : 'd-none')} >{this.props.invalidmsg || (this.props.name + ' is required')}</small>
                    </div>
                </div>


            </div>

        );
        

    }
}

export default Input;