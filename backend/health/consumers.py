from channels.generic.websocket import AsyncWebsocketConsumer
import json

class HealthConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("✅ WebSocket Connected")
        await self.accept()

    async def disconnect(self, close_code):
        print("❌ WebSocket Disconnected")

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.send(text_data=json.dumps(data))