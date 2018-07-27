/* @flow */

import React, { Component } from 'react';

import { View, StyleSheet, ActivityIndicator } from 'react-native';

import Block from './Block';

import PTRView from 'react-native-pull-to-refresh';
import Web3 from 'web3';
import truffleConfig from '../truffle';
const network = truffleConfig.networks.ropsten;
import { Buffer } from 'buffer'

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
		// const { web3 } = this.props;
		const TESTRPC_ADDRESS = `${network.protocol}://${network.host}/${network.key}`;
        const web3Provider = new Web3.providers.HttpProvider(TESTRPC_ADDRESS);
        this.web3 = new Web3(web3Provider);
		this.web3.eth.getBlock('latest', (err, block) => {
			this.setState({
				block,
				isLoading: false,
			});
		});
		this.web3.eth.getTransactionCount("0xeEA5C4A91E0DFa724570900027b5a3ac02EbE41a", (err, number) => {
			alert(number);
		});

		var Tx = require('ethereumjs-tx');
		// require('buffer').Buffer
		var privateKey = new Buffer('d49a0c3e2c80be691e32d0e791545d1afe1f8e690986d4c8b4676bdc97090268', 'hex')

		var rawTx = {
			nonce: '0x8A',
			gasPrice: '0x09284e72a000',
			gasLimit: '0x30010',
			to: '0x4858e6E0991C3eb852D0e3c10E9Ce1ed4aB88BFc',
			value: '0x4000000000000000'
		}

		var tx = new Tx(rawTx);
		tx.sign(privateKey);

		var serializedTx = tx.serialize();

		//console.log(serializedTx.toString('hex'));
		//f889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f

		this.web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
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
