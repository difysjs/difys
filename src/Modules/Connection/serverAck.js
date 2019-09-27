export default class ServerAck {
	constructor(eventEmitter, sequenceNumber) {
		this.eventEmitter = eventEmitter;
		this.sequenceNumber = sequenceNumber + 1;
		this.onServerAck = false;
	}

	BasicAckMessage(callback) {
		return new Promise(resolve => {
			const onSequence = async payload => {
				if (payload.data.seq == this.sequenceNumber) {
					this.eventEmitter.off("BasicAckMessage", onSequence);

					if (typeof callback === "function") {
						await callback();
					}
					resolve();
				}
			};
			this.eventEmitter.on("BasicAckMessage", onSequence);
		});
	}

	onBasicAck(callback) {
		this.onServerAck = [this.BasicAckMessage, callback];
		return this;
	}

	async onBasicNoOperation(callback) {
		if (this.onServerAck !== false) {
			await this.onServerAck[0].call(this, this.onServerAck[1]);
		}
		this.eventEmitter.once("BasicNoOperationMessage", () => callback());
	}
}
