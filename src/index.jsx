var PropTypes = require('prop-types');
var React = require('react');
var ReactDOM = require('react-dom');
var GeminiScrollbar = require('gemini-scrollbar');

class ReactGeminiScrollbar extends React.Component {
    constructor() {
        /**
         * Holds the reference to the GeminiScrollbar instance.
         * @property scrollbar <public> [Object]
         */
        this.scrollbar = null;
    }

    componentDidMount() {
        this.scrollbar = new GeminiScrollbar({
            element: ReactDOM.findDOMNode(this),
            autoshow: this.props.autoshow,
            forceGemini: this.props.forceGemini,
            createElements: false,
            onResize: this.props.onResize,
            minThumbSize: this.props.minThumbSize
        }).create();
    }

    componentDidUpdate() {
        this.scrollbar.update();
    }

    componentWillUnmount() {
        if (this.scrollbar) {
            this.scrollbar.destroy();
        }
        this.scrollbar = null;
    }

    render() {
        var {className, children, autoshow, forceGemini, onResize, minThumbSize, ...other} = this.props,
            classes = '';

        if (className) {
            classes += ' ' + className;
        }

        return (
            <div {...other} className={classes}>
                <div className='gm-scrollbar -vertical'>
                    <div className='thumb'></div>
                </div>
                <div className='gm-scrollbar -horizontal'>
                    <div className='thumb'></div>
                </div>
                <div className='gm-scroll-view'>
                    {children}
                </div>
            </div>
        );
    }
}

ReactGeminiScrollbar.propTypes = {
    autoshow: PropTypes.bool,
    forceGemini: PropTypes.bool,
    onResize: PropTypes.func,
    minThumbSize: PropTypes.number
}

ReactGeminiScrollbar.defaultProps = {
    autoshow: false,
    forceGemini: false,
    minThumbSize: 20
}

module.exports = ReactGeminiScrollbar;
