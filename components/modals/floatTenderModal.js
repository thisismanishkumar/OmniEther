/*
	Incoming props - 
	address - Address of Fund
*/
import React, { Component } from 'react';
import { Modal, Input, Form, Button, Message, Checkbox, Table } from 'semantic-ui-react';
import Fund from '../../ethereum/fund';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class FloatTenderModal extends Component {

	state = {
		loading: false,
		errorMessage: '',
		showModal: false,
		success: false
	}

	closeModal = () => {
		this.setState({ showModal: false });
	}

	onSubmit = async event => {
		event.preventDefault();

		const { address } = this.props;

		this.setState({ loading: true, errorMessage: '' });

		try {

			const accounts = await web3.eth.getAccounts();
			const fund = Fund(address);
			await fund.methods.FloatTender().send({
					from: accounts[0],
				})

			this.setState({ 
				success: true
			});

			// this.closeModal();
			Router.replaceRoute('fundDetails', { contractAddress: this.props.address });

		} catch(err) {
			this.setState({ errorMessage: err.message });
		}
		this.setState({ loading: false });
	}

	render() {
		
		return (

			<Modal 
				onClose={this.closeModal}
				open={this.state.showModal}
				trigger={
					<Button 
						onClick={() => { this.setState({ showModal: true }) }}
						style={{ marginTop: 10}}
						content="Float Tender"
						icon="pin"
						primary
					/>
				}
			>
			<Modal.Header>Float Tender </Modal.Header>
			    <Modal.Content>
			     	<Modal.Description>
			     		<Message 
			      			info
			      			header="Pay Attention!"
			      			content="Only Manager of Last Level Fund OR Leaf Fund can float tender."
			      		/>
			      		<h3>Are you sure you want to Float Tender ?</h3>
			     		<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
							<Message error header="Oops!" content={this.state.errorMessage} />
							<Button 
								primary 
								loading={this.state.loading}
								content="Float"
								size="huge"
								style={{ marginLeft: 320 }}
							/>
						</Form>

						{ this.state.success ? (
							<Message 
								success
								header="Congrats!" 
								content={`Tender has been floated for ${this.props.address}.` }/>
						) : null }
			     		
			      	</Modal.Description>
			    </Modal.Content>
			    
			</Modal>
		);
	}
}

export default FloatTenderModal;