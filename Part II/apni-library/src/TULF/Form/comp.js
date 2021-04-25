import React from 'react';
class Form extends React.Component {
    constructor(props) {
        super(props);

    }
    validate = () => {
        var valid = true;
        console.log('this.fields', this.fields)
        for (var fieldn in this.fields) {
            var field = this.fields[fieldn];
            console.log(field);
            if (1) {
                if (!field.validator(field.val)) {
                    valid = false;
                    console.log(fieldn, 'is invalid');
                    field.stateSetter('invalid');
                } else {
                    field.stateSetter('valid');
                }
            }
        }
        return valid;
    }
    onClick = (e) => {
        var self = this;
        e.preventDefault();
        if (self.validate()) {
            console.log('valid');
            var inps = {};
            for (var inp in self.fields) {
                inps[inp] = self.fields[inp].val;
            }
            self.props.onSubmit(inps);
        }
        self.submittedonce = true;
    }
    render() {


        var self = this;
        return (
            <div className='mt-4'>
                <form onSubmit={(e) => { e.preventDefault(); this.onClick(e); }} autoComplete="off">
                    <input autoComplete="off" name="hidden" type="text" style={{ display: 'none' }} />
                    <div className="row">
                        {React.Children.map(this.props.children, (element, idx) => {
                            
                            //console.log(element, element.type.name,element.type.name === 'Input');
                            this.fields = this.fields || {};
                            if (element.type.name === 'Input') {

                                this.fields[element.props.name] = {};
                                this.fields[element.props.name].validator = element.props.validator || ((val) => { console.log(element.props.name, val); return !element.props.required || val !== '' });
                                this.fields[element.props.name].val = element.props.val || '';
                                return React.cloneElement(element, {
                                    key:idx+'.',
                                    onChange: (val) => {
                                        if (element.props.onChange) {
                                            console.log(element.props.name, val);
                                            element.props.onChange(val);
                                        }
                                        //console.log(element.props.name, val);
                                        this.fields[element.props.name].val = val;
                                        //console.log(this.fields);
                                        if (self.submittedonce) {
                                            self.validate();
                                        }
                                    },
                                    stateSetterReceiver: (stateSetter) => {
                                        if (element.props.stateSetterReceiver) {
                                            element.props.stateSetterReceiver(stateSetter);
                                        }
                                        this.fields[element.props.name].stateSetter = stateSetter;
                                    }
                                });

                            }

                            else if (element.type.name === 'Button') {
                                
                                return (
                                    <div className='row mt-5 m-0 p-0 ' style={{ width: '100%',display:'flex' }}>
                                    <div className="col-12 col-lg-4 d-lg-none ">
                                            {React.cloneElement(element, {
                                                onClick: this.onClick,
                                                key:idx+'.'
                                            })}
                                        </div>
                                        <div className="col-12 col-lg-7">
                                         {this.props.dispprevbut?<button onClick={(e) => { e.preventDefault(); this.props.onPrev(e) }} id={this.props.previd||''} className=" xcenter ycenter btn btn-primary my-2 JKButtonGrey ">{this.props.prevname||'Previous'}</button>:<div></div>}
                                        </div>
                                        {/* <div className="col-0 col-lg-0"></div> */}
                                        <div className="col-12 col-lg-5 d-none d-lg-flex">
                                            {React.cloneElement(element, {
                                                onClick: this.onClick,
                                                key:idx+'..'
                                            })}
                                        </div>
                                    </div>

                                );
                            }
                            
                        })}
                    </div>


                </form>
            </div>
        );
    }

};

export default Form;