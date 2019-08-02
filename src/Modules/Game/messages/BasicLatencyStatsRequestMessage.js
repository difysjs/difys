export default function BasicLatencyStatsRequestMessage(payload) {
	const { socket } = payload;

	socket.sendMessage("BasicLatencyStatsMessage", {
		latency: 262,
		max: 50,
		sampleCount: 12
	});
}
