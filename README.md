## **Overview**:

This project aims to create a WebSocket server for server-side testing, specifically targeting the WebSocket client in Chrome's built-in browser. The server allows testing WebSocket functionality without the complexities of a full client implementation.

#### **Built upon TCP layer (net module)**

### <span style="color: green">**Progress till now**</span>
  > Performs WebSocket handshake with Chrome's WebSocket client.

### <span style="color: red">**Issues**</span>

   - Handling Handshake and Data Separately: Currently, the server needs to handle both WebSocket handshake (for new clients) and data from the client(already established a handshake). We need to differentiate the process and write logic for these two types of requests.
    (Handle WebSocket requestes (handshake and data) logic separately.)

  -  Data Encryption Issue: The WebSocket messages received from the clients that have already established a connection from the Chrome WebSocket client appear encrypted, need to decipher them correctly to interpret the actual data sent by the client.
