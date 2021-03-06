/*
	Incoming props - 
	address - Address of Fund
	potentialChildManagers - Array of Potential Child Managers
*/
import React, { Component } from 'react';
import { Modal, Input, Form, Button, Message, Checkbox, Table } from 'semantic-ui-react';
import Fund from '../../ethereum/fund';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import ChildManagerRow from '../../components/requestRows/potentialChildManagerRow';

class ModalForm extends Component {

	state = {
		loading: false,
		errorMessage: '',
		showModal: false,
		success: false
	}

	closeModal = () => {
		this.setState({ showModal: false });
	}

	renderRows(){
		const { potentialChildManagers } = this.props;

		return potentialChildManagers.map((potentialChildManager, index) => {
			return <ChildManagerRow 
				key={index}
				id={index}
				potentialChildManager={potentialChildManager}
			/>
		});
	}

	render() {
		const { Row, Cell, Header, HeaderCell, Body } = Table;
		return (

			<Modal 
				onClose={this.close0x21A48bAa73B55CC7bbD4aD918530Dc8A1eE32A1fModal}
				open={this.state.showModal}
				trigger={
					<Button 
						onClick={() => { this.setState({ showModal: true }) }}
						style={{ marginTop: 10}}
						content="Deputy Managers"
						icon="eye"
						primary
					/>
				}
			>
			<Modal.Header>Potential Child Managers of {this.props.address }</Modal.Header>
			    <Modal.Content>
			     	<Modal.Description>
			     		<Table>
							<Header>
								<Row>
									<HeaderCell>ID</HeaderCell>
									<HeaderCell>Address</HeaderCell>
									<HeaderCell>Name</HeaderCell>
								</Row>
							</Header>
							<Body>
								{this.renderRows()}
							</Body>
						</Table>
			     		
			      	</Modal.Description>
			    </Modal.Content>
			    
			</Modal>
		);
	}
}

export default ModalForm;