import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface State {
    counter: number,
    start: number,
    length: number,
    pingData: null | {
        text: string,
        date: Date,
    },
}

class Hello extends React.Component<{ caption: string }, State> {
    state: State = {
        counter: 1,
        start: Date.now(),
        length: 0,
        pingData: null,
    };

    componentDidMount() {
        this.updateCounter();
        setTimeout(this.fetchPing);
    }

    updateCounter = () => {
        this.setState({
            counter: this.state.counter + 1,
            length: Date.now() - this.state.start,
        });
        setTimeout(this.updateCounter);
    };

    fetchPing = () => {
        fetch('/api/ping')
            .then(async res => {
                let text: string;
                let bad = true;
                if (res instanceof Error) text = String(res);
                else if (res.status != 200) text = `${res.status} ${res.statusText}`;
                else {
                    text = await res.text();
                    bad = false;
                }
                this.setState({ pingData: { text, date: new Date() }});
                if (bad) setTimeout(this.fetchPing, 2000);
            });
    };

    render() {
        const { pingData } = this.state;
        return (
            <>
                <h1>{this.props.caption}</h1>
                <p>
                    <b>Date:</b>
                    &nbsp;
                    {new Date().toString()}
                </p>
                <p>
                    <b>Length:</b>
                    &nbsp;
                    {(this.state.length / 60000).toFixed(4)}
                    &nbsp;
                    min.
                </p>
                <p>
                    <b>Counter:</b>
                    &nbsp;
                    {this.state.counter}
                </p>
                {
                    pingData && (
                        <div >
                            <b>Ping result:</b>
                            <br />
                            <pre>{pingData.date.toString()}</pre>
                            <pre>{pingData.text}</pre>
                        </div>
                    )
                }
            </>
        );
    }
}

ReactDOM.render(
    <Hello caption="React test page" />,
    document.getElementById('root')
);
