import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

import query from '../queries/fetchSongs';


class SongCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };

        this.updateField = this.updateField.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    updateField(event) {
        this.setState({ title: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                // pass a variable into the mutation
                title: this.state.title,
            },
            // on addSong, refresh cache -> rerun the fetchSongs query
            refetchQueries: [{ query }]

        }).then(() => {
            hashHistory.push('/');
        }).catch(() => {

        })

    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create a song</h3>
                <form onSubmit={this.onSubmit}>
                    <label>Song Title:</label>
                    <input value={this.state.title} onChange={this.updateField} />
                </form>
            </div>
        )
    }
}

const mutation = gql`
mutation AddSong($title: String){
    addSong(title: $title) {
      title
    }
  }
  
`;

export default graphql(mutation)(SongCreate);