/* @flow */

import React, { Component } from 'react';

import { View, StyleSheet, ActivityIndicator } from 'react-native';

import Block from './Block';

import PTRView from 'react-native-pull-to-refresh';

const styles = StyleSheet.create({
	box: { flex: 1 },
	spacer: { flex: 1 },
});

type Props = {
	web3: *,
};
type State = {
	block: ?any,
	isLoading: boolean,
};

export default class Main extends Component<Props, State> {
	state = {
		block: null,
		isLoading: true,
	};
	componentDidMount() {
		const { web3 } = this.props;
		web3.eth.getBlock('latest', (err, block) => {
			this.setState({
				block,
				isLoading: false,
			});
		});
		web3.eth.getTransactionCount("0x4858e6E0991C3eb852D0e3c10E9Ce1ed4aB88BFc", (err, number) => {
			alert(number);
		});

		var Tx = require('ethereumjs-tx');
		var privateKey = new Buffer('66e11b8ef9025f9750a964483f49e5fa1f9e030f58c5de9d329c6f5d789903ec', 'hex')

		var rawTx = {
			nonce: '0x8A',
			gasPrice: '0x09184e72a000',
			gasLimit: '0x30000',
			to: '0x636bb3512bECB60991b60446E2a0E58d540c1459',
			value: '0x4000000000000000'
		}

		var tx = new Tx(rawTx);
		tx.sign(privateKey);

		var serializedTx = tx.serialize();

		//console.log(serializedTx.toString('hex'));
		//f889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f

		web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
			if (!err)
				// console.log(hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
				alert(hash)
			else
				alert(err)
		});

	}
	reload = (): Promise<*> => {
		return new Promise((resolve: Function) => {
			const { web3 } = this.props;
			web3.eth.getBlock('latest', (err, block) => {
				this.setState({
					block,
					isLoading: false,
				});
				resolve();
			});
			web3.eth.getTransactionCount("0x4858e6E0991C3eb852D0e3c10E9Ce1ed4aB88BFc",(err, number) => {
				alert(number);
			});
		});
	};
	render() {
		return (
			<PTRView onRefresh={this.reload}>
				<View style={styles.box}>
					{this.state.isLoading && (
						<ActivityIndicator size="large" color="#000000" />
					)}
					{!this.state.isLoading && <Block block={this.state.block} />}
					<View style={styles.spacer} />
				</View>
			</PTRView>
		);
	}
}
