export default class ServerAck {
	constructor(eventEmitter, sequenceNumber) {
		this.eventEmitter = eventEmitter;
		this.sequenceNumber = sequenceNumber + 1;
		this.onServerAck = false;
		this.ackMessage = false;
	}

	BasicAckMessage() {
		return new Promise(resolve => {
			const onSequence = payload => {
				if (payload.data.seq == this.sequenceNumber) {
					resolve();
					this.eventEmitter.off("BasicAckMessage", onSequence);
				}
			};
			this.eventEmitter.on("BasicAckMessage", onSequence);
		});
	}

	async onBasicAck(callback) {
		await this.BasicAckMessage();
		this.onServerAck = true;
		process.nextTick(async () => {
			if (!this.ackMessage) {
				await callback();
			}
		});
		return this;
	}

	async onBasicNoOperation(callback) {
		if (this.onServerAck === false) {
			await this.BasicAckMessage();
			this.eventEmitter.once("BasicNoOperationMessage", () => callback());
		} else {
			this.ackMessage = true;
			const onNoOperation = () => {
				if (this.ackMessage) {
					callback();
					this.eventEmitter.off(
						"BasicNoOperationMessage",
						onNoOperation
					);
				}
			};
			this.eventEmitter.on("BasicNoOperationMessage", onNoOperation);
		}
		return this;
	}
}
