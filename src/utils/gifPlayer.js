const React = require("react");
// const ReactDOM = require("react-dom");
const GifPlayer = require("react-gif-player");

class Player extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <GifPlayer gif={this.props.gif} autoplay={true} />;
    }
}

module.exports = {
    Player,
};
