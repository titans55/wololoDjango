from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter, ChannelNameRouter
import wololo.routing
from wololo.consumers import ChatConsumer

application = ProtocolTypeRouter(***REMOVED***
    # (http->django views is added by default)

    'websocket': AuthMiddlewareStack(
        URLRouter(
            wololo.routing.websocket_urlpatterns
        )
    ),
***REMOVED***)