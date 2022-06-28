import * as React from 'react';


export default function () {

    let E1 = new Ebtn()
    let E2 = new Ebtn()

    return <>
        <div>
            <h1>Experimental</h1>
            <p>This is the experimental page.</p>

            <button onClick={E1.flip()}>Click Me 1</button>
            <button onClick={E2.flip()}>Click Me 2</button>

            <E1 className='e1'>
                <p>This is the first button</p>
            </E1>
            <E2 className='e2'>
                <p>This is the second button</p>
            </E2>
        </div>
    </>
}



class Ebtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#fff',
        };
    }

    flip = function() {

        window.alert('flip')

        this.setState({
            color: '#f00',
        });

    }

    render() {
        return <div
                className={this.props.className}
                style={{
                    backgroundColor: this.state.color,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    outline: 'none',
                }}

            >
                {this.props.children}
            </div>
        
    }
}