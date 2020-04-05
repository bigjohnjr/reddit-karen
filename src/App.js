import React from 'react';
import axios from 'axios';
import {Card, Button} from 'react-bootstrap';
import './App.css';

class App extends React.Component {

    state = {
        Posts: [],
    }

    componentDidMount() {
        this.getList();
    }

    async getList() {
        const response = await axios.get('https://www.reddit.com/r/FuckYouKaren/new.json?sort=top&raw_json=1' ,{
            params: { show: 'all' }
        }).catch(err => console.log(err));
        this.setState({ Posts: response.data.data.children.map((data, idx) => ( data.data ))})
        console.log("date", this.state.Posts);

    }

    truncateText(text, limit) {
	    const shortened = text.indexOf(' ', limit);

	    if(shortened == -1) return text;
	    return text.substring(0, shortened);
    }

    render() {
        let defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTeoUqBlHWsYFpxU77nOWI7xFr7rLA4O5h5UrpTYut-2s-0MzJi&usqp=CAU';
        return (
            <>
                <div className="ui container" style={{ marginTop: '10px'}}>
                    HI REDDIT
                    {this.state.Posts.map((item,i) => (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={item.preview ? item.preview.images[0].source.url : defaultImage} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                        {this.truncateText(item.selftext, 100)}
                                    </Card.Text>
                                <Button as="a" href={item.url} target="_blank" variant="primary">READ MORE</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </>
        );
    }

}


export default App;
