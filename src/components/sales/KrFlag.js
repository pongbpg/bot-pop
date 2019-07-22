import React from 'react';
class KrFlag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props.width || 36
        }
    }
    render() {
        return <img src="http://flags.fmcdn.net/data/flags/w580/kr.png" width={this.state.width} />
    }
}
export default KrFlag;