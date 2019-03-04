import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import SongCreate from './SongCreate';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';
import mutation from '../queries/deleteSong';

class SongList extends Component {

    onSongDelete(id) {
        console.log("KKKK", id);
        console.log(this.props);
        this.props.mutate({ variables: { id } });
    }

    renderList() {

        if (this.props.data.loading)
            return <div>Loading....</div>;

        return this.props.data.songs.map(({ title, id }) => {
            return (
                <li className="collection-item" key={id}>
                    {title}
                   <i className="material-icons" onClick={() => this.onSongDelete(id)}>delete</i>
                </li>
            )
        })
    }


    render() {
        return (
            <div className="container">
                <ul className="collection">
                    {this.renderList()}
                </ul>
                <Link to="/songs/new" className="btn-floating btn-large right red">
                    <i className="material-icons">add</i>
                </Link>

            </div>

        )
    }
}


export default graphql(mutation)(
    graphql(query)(SongList)
);