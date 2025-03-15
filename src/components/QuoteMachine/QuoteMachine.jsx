import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTwitter } from "react-icons/fa";
import { FaTumblr } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
import styles from "./styles.module.css";

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

const QuoteMachine = () => {

	const [quote, setQuote] = useState("");
	const [author, setAuthor] = useState("");
	const [color, setColor] = useState(colors[0]);
	const [opacity, setOpacity] = useState(0);

	useEffect(() => {
		fetchQuote();
	}, []);

	useEffect(() => {
		const body = document.querySelector('body');
		body.style.backgroundColor = color;
	}, [color]);

	const fetchQuote = () => {
		const url = 'https://api.api-ninjas.com/v1/quotes';

		setOpacity(0);
		axios.get(url, {
			headers: {
				'X-Api-Key': 'biMC0Hp+PXn93Nf7HgiDpg==BBwqljEfc3L4TWH7',
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			const { quote, author } = response.data[0];
			setTimeout(() => {
				setQuote(quote);
				setAuthor(author);
				setOpacity(1)
				setColor(colors[Math.floor(Math.random() * colors.length)]);
			}, 500)
		})
		.catch(() => {
			console.log("Failed to request quote");
		})
	};

	return (
		<div className={styles.container}>
			<div id='quote-box' className={styles.quoteBox}>
				<div id='text'>
					<FaQuoteLeft className={styles.quoteIcon} style={{ opacity, color }}/>
					<span className={styles.text} style={{ opacity, color }}>{quote}</span>
				</div>
				<p id='author' className={styles.author} style={{ opacity, color }}>- {author}</p>
				<div className={styles.buttonsContainer}>
					<div className={styles.links}>
						<a id='tweet-quote' className={styles.button} style={{ backgroundColor: color }} href='https://twitter.com/intent/tweet/'>
							<FaTwitter className={styles.icons}/>
						</a>
						<a id='tumblr-quote' className={styles.button} style={{ backgroundColor: color }} href='#'>
							<FaTumblr className={styles.icons}/>
						</a>
					</div>
					<button id='new-quote' className={styles.button} style={{ backgroundColor: color }} type='button' onClick={fetchQuote}>New Quote</button>
				</div>
			</div>
			<p className={styles.creator}>by Felippe Santana</p>
		</div>
	)
}

export default QuoteMachine;