import React, { Component } from 'react';
import Layout from '../../components/layout';
import { Card, Grid, Button, Modal, Input, Form, Message, Segment } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';
import { Link, Router } from '../../routes';
var api = require('etherscan-api').init('AR74I2J5Z4EGDEWDM11EKQYBNPJP64YGE6','rinkeby','3000');

class TokenHolders extends Component{
	constructor(){
		super();
		this.state={
			data: false
		}
	}
	componentDidMount(){
		let url = "https://api-rinkeby.etherscan.io/api?module=account&action=tokentx&contractaddress=0xf133adfeb68a195fd253b5742a5b7d16368204ba#balances&page=1&offset=20&sort=asc&apikey=AR74I2J5Z4EGDEWDM11EKQYBNPJP64YGE6";
		fetch(url,{
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		}).then((result)=>{
			result.json().then((resp) => {
				console.warn(resp);
				this.setState({data:resp})
			})
		})

	}




	render() {
	  const data = this.state.data;
	  console.warn(data);
	  const { Header, Row, HeaderCell, Body } = Table;
		return (
			<Layout>
				<h3> All GovEth Transactions:- </h3>
				<Table>
					<Header>
						<Row>
							<HeaderCell>Txn Hash</HeaderCell>
							<HeaderCell>Age</HeaderCell>
							<HeaderCell>From</HeaderCell>
							<HeaderCell>To</HeaderCell>
							<HeaderCell>GovEthTokens</HeaderCell>
						</Row>
					</Header>
					<tbody>

					</tbody>
				</Table>
			</Layout>
	  );

	};	



}

export default TokenHolders;




	
