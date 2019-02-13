import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Nav from "../../components/Nav";
import { Row, Container } from "../../components/Grid";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import Celeb from "../../Celeb.json";
 
import './Main.css'

class Main extends Component {

    state = {
        celebs: [],
        score: 0,
        topScore: 0,
        selectedCeleb: [], 
        navMessage: '',
    };

    componentDidMount() {
        this.loadDefaultScore();
    };

    loadDefaultScore = () => {
        this.setState({
            celebs: Celeb,
            score: 0,
            topScore: 0,
            selectedCeleb: [],
        });
    };


    imgClick = (id) => {

        this.setState({navMessage: ''});

        if(this.state.selectedCeleb.indexOf(id) === -1 && this.state.selectedCeleb.length === 11) {
            this.setState({score: 12, topScore:12, navMessage: 'You Win!', selectedCeleb: []
        });
            return;
        }

        if(this.state.selectedCeleb.indexOf(id) === -1) {

            let newScore = (this.state.score + 1)%12;
            this.state.selectedCeleb.push(id);
  
            if(this.state.score >= this.state.topScore && this.state.topScore !==12) {
                this.setState({score: newScore, topScore:newScore});
            } else if (this.state.score >= this.state.topScore && this.state.topScore ===12 ) {
                this.setState({score: newScore});
            } else {
                this.setState({score: newScore})
            };
            this.doShuffleCard();
        } else {
            this.setState({navMessage: 'Ooops... Wrong Answer!'})
            this.setState({score: 0, selectedCeleb: []})
        }
    };

    shuffleCards = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    doShuffleCard = () => {
        let shuffledCeleb = this.shuffleCards(Celeb);
        this.setState({
            Celebs: shuffledCeleb
        })
    };

    render() {
        return (
            <Container fluid>

                <Nav score = {this.state.score} topScore = {this.state.topScore}  
                brand = {'Know Thy Celebrity?'} navText =  {this.state.navMessage}/>

                <Jumbotron title = {'Indian Amercian Celebrity Click Game'} 
                subLine = {`Click on an image to earn points. Don't click on an image more than once.`} />

                <Container>
                <Row>
                {this.state.celebs.map(celeb => {
                    return (<Card 
                        key = {celeb.id} 
                        id = {celeb.id} 
                        url = {celeb.url}
                        imgClick = {this.imgClick}
                    name ={celeb.name} /> )
                })}
                </Row>
                </Container>

                <Footer />

            </Container>
        )
    };
}

export default Main;