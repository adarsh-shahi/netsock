// import websocket from "websocket";
// import { createServer } from "http";

// const httpServer = createServer();
// const WebSocketServer = websocket.server;
// const ws = new WebSocketServer({
// 	httpServer: httpServer,
// });
// ws.on("request", (request) => {
// 	request.accept(null, request.origin);
// });

// httpServer.listen(8000);

import net from "net";
import crypto from "crypto";

const parseHttpHeaders = (httpString: string) => {
	const headers: {
		[key: string]: string;
	} = {};
	const headersArray = httpString.split("\r\n");
	for (let i = 1; i < headersArray.length; i++) {
		const [key, value] = headersArray[i].split(": ");
		headers[key] = value;
	}
	headers.method = headersArray[0].split(" ")[0];
	headers.url = headersArray[0].split(" ")[1].charAt(0);
	return headers;
};

const generateWebSocketAcceptKey = (key: string) => {
	const combinedKey = key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
	return crypto.createHash("sha1").update(combinedKey).digest("base64");
};
const webSocketHttpResponse = (key: string, origin: string) => {
	return `HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${key}\r\nOrigin: ${origin}\r\nConnection: keep-alive\n\n\n`;
};

const tcpServer = net.createServer();
tcpServer.on("connection", (socket) => {
	console.log("Connected");
	let data = "";
	socket.on("data", (chunk) => {
		data += chunk.toString("utf-8");
		const headers = parseHttpHeaders(data);
		console.log(data);
		const acceptKey = generateWebSocketAcceptKey(headers["Sec-WebSocket-Key"]);
		const response = webSocketHttpResponse(acceptKey, headers.Origin);
		console.log(response);
		socket.write(response);
		// socket.end("");
	});
	socket.on("end", () => {
		console.log("Client Disconnected");
	});
});

tcpServer.listen(8000);
