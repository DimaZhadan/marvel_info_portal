import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {

    marvelService = new MarvelService();

    state = {
        charList: [],
        loading: true,
        error: false
    }

    componentDidMount() {
        this.marvelService.getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (charList) => {
        this.setState({
            charList,
            loading: false,
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false

        })
    }

    renderList(arr) {
        const items = arr.map(item => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'contain' }
            }
            return (
                <li
                    key={item.id}
                    className="char__item" 
                    onClick={() => this.props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                        <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }



    render() {
        const { charList, loading, error } = this.state;

        const items = this.renderList(charList);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;