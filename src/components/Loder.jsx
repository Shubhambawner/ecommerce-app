import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default React.memo(class CircularIndeterminate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loding: false }
        this.setloding = this.setloding.bind(this);
        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
    }
    start = function () {
        this.setloding(true)
    }
    stop = function () {
        this.setloding(false)
    }
    setloding = function (loding) {
        this.setState({ loding })
    }
    openStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
    }
    closeStyle = {
        display: 'none',
    }
    render() {


        return (
            <Box sx={ this.state.loding?this.openStyle:this.closeStyle }>
                <CircularProgress />
            </Box>
        );
    }
})
